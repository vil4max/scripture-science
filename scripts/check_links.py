#!/usr/bin/env python3
"""Check generated HTML for duplicate IDs and broken local links."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])


def check_site(root, site, base):
    root = root.resolve()
    base = "/" + base.strip("/") + "/" if base.strip("/") else "/"
    origin = urlsplit(site)
    pages = {path: Page(path.read_text()) for path in root.rglob("*.html")}
    errors = []
    for path, page in pages.items():
        relative = path.relative_to(root).as_posix()
        for anchor, count in Counter(page.ids).items():
            if count > 1:
                errors.append(f"{relative}: duplicate id {anchor!r}")
        current = site.rstrip("/") + base + relative
        for href in page.links:
            target = urlsplit(urljoin(current, href))
            if target.scheme not in ("http", "https") or target.netloc != origin.netloc:
                continue
            target_path = unquote(target.path)
            if target_path == base.rstrip("/"):
                target_path = base
            if not target_path.startswith(base):
                errors.append(f"{relative}: link outside site base: {href}")
                continue
            destination = (root / target_path[len(base):]).resolve()
            if not destination.is_relative_to(root):
                errors.append(f"{relative}: link outside output directory: {href}")
                continue
            if destination.is_dir():
                destination /= "index.html"
            if not destination.is_file():
                errors.append(f"{relative}: missing target: {href}")
            elif destination in pages and target.fragment:
                if unquote(target.fragment) not in pages[destination].ids:
                    errors.append(f"{relative}: missing anchor: {href}")
    return sorted(set(errors))


def main():
    repo = Path(__file__).resolve().parent.parent
    config = (repo / "astro.config.mjs").read_text()
    site = re.search(r"\bsite:\s*['\"]([^'\"]+)['\"]", config).group(1)
    base = re.search(r"\bbase:\s*['\"]([^'\"]+)['\"]", config).group(1)
    root = repo / "dist"
    if not (root / "index.html").is_file():
        raise SystemExit("check_links: build the site first")
    errors = check_site(root, site, base)
    if errors:
        raise SystemExit("check_links: FAILED\n" + "\n".join(errors))
    print(f"check_links: OK ({len(list(root.rglob('*.html')))} pages; local targets, anchors and IDs)")


if __name__ == "__main__":
    main()
