from playwright.sync_api import sync_playwright
import json, os, re, hashlib, urllib.request, urllib.error

CHROMIUM_PATH = "/home/runner/workspace/.cache/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell"
TARGET_URL = "https://www.floema.com/en"
OUT_DIR = "clone-data"

os.makedirs(f"{OUT_DIR}/screenshots", exist_ok=True)
os.makedirs(f"{OUT_DIR}/components", exist_ok=True)
os.makedirs("public/images", exist_ok=True)
os.makedirs("public/videos", exist_ok=True)
os.makedirs("public/fonts", exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path=CHROMIUM_PATH,
        args=["--no-sandbox", "--disable-setuid-sandbox"]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(5000)

    # Scroll to trigger lazy loading
    for _ in range(20):
        page.evaluate("window.scrollBy(0, 500)")
        page.wait_for_timeout(300)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(2000)

    # Save raw HTML
    raw_html = page.content()
    with open(f"{OUT_DIR}/raw.html", "w", encoding="utf-8") as f:
        f.write(raw_html)
    print(f"Saved raw.html ({len(raw_html)} chars)")

    # Desktop screenshot
    page.screenshot(path=f"{OUT_DIR}/screenshots/desktop-full.png", full_page=True)
    print("Screenshot saved")

    # Header only screenshot
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)
    page.screenshot(path=f"{OUT_DIR}/screenshots/header-only.png", clip={"x": 0, "y": 0, "width": 1440, "height": 200})
    print("Header screenshot saved")

    # Extract locale/language detection
    locale_info = page.evaluate("""
    () => ({
        bannerText: document.querySelector('[class*="banner"], [class*="announcement"]')?.innerText?.trim(),
        navLinks: [...document.querySelectorAll('nav a, .main-nav a')].map(a => a.innerText.trim()).filter(t => t).slice(0, 8),
        htmlLang: document.documentElement.lang,
        url: window.location.href,
        title: document.title
    })
    """)
    with open(f"{OUT_DIR}/locale.json", "w") as f:
        json.dump(locale_info, f, indent=2)
    print("Locale:", json.dumps(locale_info, indent=2))

    # Header deep extraction
    header_info = page.evaluate("""
    () => {
        const header = document.querySelector('header');
        if (!header) return null;
        const banner = document.querySelector('[class*="banner"], [class*="announcement"], [class*="promo-bar"], [class*="topbar"], [class*="top-bar"]');
        const bannerBg = banner ? getComputedStyle(banner.querySelector('[class*="col"], div') || banner).backgroundColor : null;
        const logo = header.querySelector('svg, [class*="logo"] img, [class*="logo"] svg');
        const logoRect = logo?.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const navLinks = [...header.querySelectorAll('nav a, [class*="nav"] a')].map(a => a.innerText.trim()).filter(t => t && t.length < 30);
        return {
            bannerText: banner?.innerText?.trim(),
            bannerBgColor: bannerBg,
            bannerTextColor: banner ? getComputedStyle(banner).color : null,
            logoPosition: logoRect ? (logoRect.left < headerRect.width / 3 ? 'left' : logoRect.left < headerRect.width * 2/3 ? 'center' : 'right') : 'unknown',
            navLinks: navLinks.slice(0, 10),
            headerHTML: header.innerHTML.slice(0, 5000),
            headerText: header.innerText.trim().slice(0, 500),
            headerBg: getComputedStyle(header).backgroundColor,
            headerHeight: Math.round(header.getBoundingClientRect().height)
        };
    }
    """)
    with open(f"{OUT_DIR}/header.json", "w") as f:
        json.dump(header_info, f, indent=2)
    print("Header extracted")

    # Footer extraction
    footer_data = page.evaluate("""
    () => {
        const footer = document.querySelector('footer');
        if (!footer) return null;
        return {
            text: footer.innerText,
            bgColor: getComputedStyle(footer).backgroundColor,
            color: getComputedStyle(footer).color,
            html: footer.innerHTML.slice(0, 8000),
            links: [...footer.querySelectorAll('a')].map(a => ({
                text: a.innerText.trim(), href: a.getAttribute('href')
            })).filter(l => l.text)
        };
    }
    """)
    with open(f"{OUT_DIR}/footer.json", "w") as f:
        json.dump(footer_data, f, indent=2)
    print("Footer extracted")

    # Section inventory
    inventory = page.evaluate("""
    () => {
        const main = document.querySelector('main') || document.body;
        const allSections = [];
        const header = document.querySelector('header');
        if (header) {
            allSections.push({
                index: 0, selector: 'header', type: 'header',
                tag: header.tagName.toLowerCase(),
                classes: header.className?.toString().slice(0, 200) || '',
                headings: [],
                buttons: [...header.querySelectorAll('button, a[class*="btn"]')].map(b => b.innerText.trim()).filter(t => t).slice(0, 5),
                imageCount: header.querySelectorAll('img').length,
                textPreview: header.innerText.trim().slice(0, 200),
                layout: getComputedStyle(header).display,
                height: Math.round(header.getBoundingClientRect().height)
            });
        }
        const children = main === document.body
            ? [...main.children].filter(c => !['HEADER','FOOTER','NAV','SCRIPT','STYLE','NOSCRIPT'].includes(c.tagName))
            : [...main.children];
        children.forEach((child, idx) => {
            const rect = child.getBoundingClientRect();
            if (rect.height < 20) return;
            const cs = getComputedStyle(child);
            if (cs.display === 'none' || cs.visibility === 'hidden') return;
            const headings = [...child.querySelectorAll('h1, h2, h3, h4, h5')].slice(0, 10).map(h => h.innerText.trim()).filter(t => t);
            const buttons = [...child.querySelectorAll('button, [role="button"], a[class*="btn"], a[class*="button"]')].slice(0, 10).map(b => b.innerText.trim()).filter(t => t);
            const images = child.querySelectorAll('img');
            const hasCarousel = child.querySelector('[class*="carousel"], [class*="slider"], [class*="swiper"], [class*="scroll"]') !== null;
            const hasGrid = cs.display === 'grid' || child.querySelector('[style*="grid"], [class*="grid"]') !== null;
            const hasFlex = cs.display === 'flex';
            const hasMarquee = child.querySelector('[class*="marquee"], [class*="ticker"]') !== null;
            let sectionType = 'content';
            if (idx === 0 && (child.querySelector('h1') || rect.height > 400)) sectionType = 'hero';
            else if (hasCarousel) sectionType = 'carousel';
            else if (hasMarquee) sectionType = 'marquee';
            else if (hasGrid && images.length > 3) sectionType = 'grid';
            else if (hasFlex && images.length === 1 && headings.length > 0) sectionType = 'split-layout';
            else if (images.length > 3) sectionType = 'gallery';
            allSections.push({
                index: idx + 1,
                selector: child.id ? '#' + child.id : child.tagName.toLowerCase() + (child.className ? '.' + child.className.toString().split(' ')[0] : ''),
                type: sectionType,
                tag: child.tagName.toLowerCase(),
                classes: child.className?.toString().slice(0, 200) || '',
                headings: headings,
                buttons: buttons,
                imageCount: images.length,
                textPreview: child.innerText?.slice(0, 300) || '',
                layout: cs.display + (hasFlex ? ' ' + cs.flexDirection : '') + (hasGrid ? ' grid' : ''),
                height: Math.round(rect.height),
                innerHTML: child.innerHTML?.slice(0, 3000) || ''
            });
        });
        const footer = document.querySelector('footer');
        if (footer) {
            allSections.push({
                index: 999, selector: 'footer', type: 'footer', tag: 'footer',
                classes: footer.className?.toString().slice(0, 200) || '',
                headings: [...footer.querySelectorAll('h3, h4, h5, strong')].map(h => h.innerText.trim()).filter(t => t).slice(0, 10),
                buttons: [],
                imageCount: footer.querySelectorAll('img').length,
                textPreview: footer.innerText.trim().slice(0, 300),
                layout: getComputedStyle(footer).display,
                height: Math.round(footer.getBoundingClientRect().height)
            });
        }
        return allSections;
    }
    """)
    with open(f"{OUT_DIR}/section-inventory.json", "w") as f:
        json.dump(inventory, f, indent=2)
    print(f"Inventory: {len(inventory)} sections")

    # Design tokens
    tokens = page.evaluate("""
    () => {
        const body = document.body;
        const cs = getComputedStyle(body);
        const cssVars = [];
        try {
            for (const sheet of document.styleSheets) {
                try {
                    for (const rule of sheet.cssRules) {
                        if (rule.selectorText === ':root' || rule.selectorText === ':root, :host') {
                            for (const prop of rule.style) {
                                if (prop.startsWith('--')) {
                                    cssVars.push([prop, rule.style.getPropertyValue(prop).trim()]);
                                }
                            }
                        }
                    }
                } catch(e) {}
            }
        } catch(e) {}
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        const btn = document.querySelector('button, [class*="btn"], a[class*="button"]');
        function getStyles(el) {
            if (!el) return null;
            const s = getComputedStyle(el);
            return { fontSize: s.fontSize, fontWeight: s.fontWeight, fontFamily: s.fontFamily,
                lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color,
                textTransform: s.textTransform, textAlign: s.textAlign, backgroundColor: s.backgroundColor,
                padding: s.padding, borderRadius: s.borderRadius, border: s.border };
        }
        return {
            body: { bgColor: cs.backgroundColor, textColor: cs.color, fontFamily: cs.fontFamily, fontSize: cs.fontSize, lineHeight: cs.lineHeight },
            h1: getStyles(h1), h2: getStyles(h2), button: getStyles(btn),
            cssVars: cssVars,
            fonts: [...document.querySelectorAll('link[href*="fonts.googleapis"], link[href*="fonts.gstatic"]')].map(l => l.href),
            selfHostedFonts: (() => {
                const fonts = [];
                try {
                    for (const sheet of document.styleSheets) {
                        try {
                            for (const rule of sheet.cssRules) {
                                if (rule instanceof CSSFontFaceRule) {
                                    fonts.push({ family: rule.style.getPropertyValue('font-family').replace(/['"]/g, ''), src: rule.style.getPropertyValue('src'), weight: rule.style.getPropertyValue('font-weight') || '400', style: rule.style.getPropertyValue('font-style') || 'normal' });
                                }
                            }
                        } catch(e) {}
                    }
                } catch(e) {}
                return fonts;
            })(),
            title: document.title,
            metaDescription: document.querySelector('meta[name="description"]')?.content || ''
        };
    }
    """)
    with open(f"{OUT_DIR}/tokens.json", "w") as f:
        json.dump(tokens, f, indent=2)
    print("Tokens extracted, fonts:", len(tokens.get('selfHostedFonts', [])))

    # SVG logo extraction
    logo_svg = page.evaluate("""
    () => {
        const header = document.querySelector('header');
        if (!header) return null;
        const svgs = header.querySelectorAll('svg');
        return [...svgs].map(svg => ({
            viewBox: svg.getAttribute('viewBox'),
            html: svg.outerHTML.slice(0, 8000),
            width: svg.getAttribute('width'),
            height: svg.getAttribute('height'),
            parentClass: svg.parentElement?.className?.toString()
        }));
    }
    """)
    with open(f"{OUT_DIR}/logo-svgs.json", "w") as f:
        json.dump(logo_svg, f, indent=2)
    print(f"Logo SVGs: {len(logo_svg) if logo_svg else 0}")

    # Asset download
    assets = page.evaluate("""
    () => ({
        images: [...document.querySelectorAll('img')]
            .filter(img => img.offsetWidth > 30 && img.src)
            .map(img => ({ src: img.src, srcset: img.srcset || '', alt: img.alt, w: img.offsetWidth, h: img.offsetHeight })),
        videos: [...document.querySelectorAll('video')].map(v => ({
            src: v.src || v.querySelector('source')?.src, poster: v.poster, autoplay: v.autoplay
        })).filter(v => v.src),
        backgroundImages: [...document.querySelectorAll('*')].filter(el => {
            const bg = getComputedStyle(el).backgroundImage;
            return bg && bg !== 'none' && bg.includes('url(');
        }).slice(0, 50).map(el => ({ url: getComputedStyle(el).backgroundImage, element: el.tagName }))
    })
    """)
    with open(f"{OUT_DIR}/assets.json", "w") as f:
        json.dump(assets, f, indent=2)
    print(f"Assets found: {len(assets.get('images', []))} images, {len(assets.get('videos', []))} videos")

    downloaded = {}

    def upscale_cdn_url(url):
        if 'cdn.shopify.com' in url or 'floema' in url:
            url = re.sub(r'_small\.', '_1200x.', url)
            url = re.sub(r'width=\d+', 'width=1200', url)
        elif 'cdn.sanity.io' in url:
            url = re.sub(r'w=\d+', 'w=1200', url)
        elif 'res.cloudinary.com' in url:
            url = re.sub(r'w_\d+', 'w_1200', url)
        elif 'images.ctfassets.net' in url:
            url = re.sub(r'w=\d+', 'w=1200', url)
        return url

    def download_with_retry(url, filepath, max_retries=3):
        user_agents = [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        ]
        for attempt in range(max_retries):
            try:
                ua = user_agents[attempt % len(user_agents)]
                req = urllib.request.Request(url, headers={"User-Agent": ua, "Accept": "image/*,*/*"})
                with urllib.request.urlopen(req, timeout=15) as resp:
                    data = resp.read()
                    if len(data) < 100:
                        continue
                    with open(filepath, "wb") as f:
                        f.write(data)
                    return True
            except Exception as e:
                print(f"  Attempt {attempt+1} failed: {e}")
        return False

    for img in assets.get("images", []):
        url = img["src"]
        if not url or url.startswith("data:"):
            continue
        url = upscale_cdn_url(url)
        ext_match = re.search(r'\.(png|jpg|jpeg|webp|gif|svg|avif)', url.lower())
        ext = "." + ext_match.group(1) if ext_match else ".webp"
        name_hash = hashlib.md5(url.encode()).hexdigest()[:10]
        alt_slug = re.sub(r'[^a-z0-9]', '-', (img.get("alt") or "img").lower())[:30].strip('-')
        filename = f"{alt_slug}-{name_hash}{ext}"
        filepath = f"public/images/{filename}"
        if download_with_retry(url, filepath):
            downloaded[img["src"]] = f"/images/{filename}"
            print(f"OK: {filename}")
        else:
            print(f"FAIL: {url}")

    for vid in assets.get("videos", []):
        url = vid["src"]
        if not url: continue
        ext_match = re.search(r'\.(mp4|webm|mov)', url.lower())
        ext = "." + ext_match.group(1) if ext_match else ".mp4"
        name_hash = hashlib.md5(url.encode()).hexdigest()[:10]
        filename = f"video-{name_hash}{ext}"
        filepath = f"public/videos/{filename}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                with open(filepath, "wb") as f:
                    f.write(resp.read())
            downloaded[url] = f"/videos/{filename}"
            print(f"OK VIDEO: {filename}")
        except Exception as e:
            print(f"FAIL VIDEO: {url} -> {e}")

    with open(f"{OUT_DIR}/downloaded-assets.json", "w") as f:
        json.dump(downloaded, f, indent=2)
    print(f"\nDownloaded {len(downloaded)} assets total")

    # Download self-hosted fonts
    for font in tokens.get("selfHostedFonts", []):
        src = font.get("src", "")
        urls = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', src)
        for url in urls:
            if not url.startswith("http"):
                continue
            ext_match = re.search(r'\.(woff2?|ttf|otf)', url.lower())
            ext = "." + ext_match.group(1) if ext_match else ".woff2"
            name_hash = hashlib.md5(url.encode()).hexdigest()[:10]
            family_slug = re.sub(r'[^a-z0-9]', '-', font.get('family', 'font').lower())[:30]
            filename = f"{family_slug}-{font.get('weight','400')}-{name_hash}{ext}"
            filepath = f"public/fonts/{filename}"
            if download_with_retry(url, filepath):
                print(f"OK FONT: {filename}")
            else:
                print(f"FAIL FONT: {url}")

    # Take section screenshots for reference
    sections_el = page.query_selector_all('section, [class*="section"], main > div, main > section')
    for i, section in enumerate(sections_el[:15]):
        try:
            section.scroll_into_view_if_needed()
            page.wait_for_timeout(300)
            section.screenshot(path=f"{OUT_DIR}/screenshots/section-{i:02d}.png")
        except Exception as e:
            print(f"Skip section {i}: {e}")

    browser.close()
    print("\nExtraction complete!")
