#!/usr/bin/env python3
"""Verify the built pair page's visible text matches the source verbatim.

Compares source/orthodoxy-jw.html against dist/pairs/orthodoxy-jw/index.html:
extracts every non-empty, whitespace-collapsed text node under <nav> and
<main> (SVG <text> included, since it is walked like any other element) from
each, in document order, and diffs the two lists. Comparing per text node
rather than one fused string is deliberate: it is immune to incidental
inter-element whitespace differences between the source's markup and the
page's re-assembled markup, while still catching any actual wording change,
addition, removal or reordering. Exits 1 and prints a unified diff on any
difference; standard library only.

The only permitted differences are the visible corrections in
src/data/corrections-orthodoxy-jw.json (docs/tasks/site-m7-pair-corrections.md):
they are applied to the source before comparing, each must match the source
exactly once, each must be marked on the page, and the corrections list after
<main> must carry every correction's wording, reason and sources.
"""
import difflib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_PATH = REPO_ROOT / "source" / "orthodoxy-jw.html"
BUILT_PATH = REPO_ROOT / "dist" / "pairs" / "orthodoxy-jw" / "index.html"
CORRECTIONS_PATH = REPO_ROOT / "src" / "data" / "corrections-orthodoxy-jw.json"
CORRECTIONS_HEADING = "Исправления к исходному тексту"

VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class Node:
    __slots__ = ("kind", "tag", "children", "data")

    def __init__(self, kind, tag=None, data=None):
        self.kind = kind  # 'element' | 'text'
        self.tag = tag
        self.children = []
        self.data = data


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("element", tag="#root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node("element", tag=tag)
        self.stack[-1].children.append(node)
        if tag not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node("element", tag=tag))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        if data:
            self.stack[-1].children.append(Node("text", data=data))


class AttrCollector(HTMLParser):
    """Every (tag, attribute, value) triple, values already unescaped."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.attrs = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            self.attrs.add((tag, name, value))


def parse_fragment(html_text):
    tb = TreeBuilder()
    tb.feed(html_text)
    tb.close()
    return tb.root


def collect_attrs(html_text):
    collector = AttrCollector()
    collector.feed(html_text)
    collector.close()
    return collector.attrs


def text_lines(node):
    """Trimmed, whitespace-collapsed text-node contents in document order;
    nodes empty after trimming (pure markup indentation/newlines) are
    dropped rather than compared."""
    out = []

    def walk(n):
        if n.kind == "text":
            collapsed = re.sub(r"\s+", " ", n.data).strip()
            if collapsed:
                out.append(collapsed)
            return
        for c in n.children:
            walk(c)

    walk(node)
    return out


def extract_nav_main(html_text, label):
    try:
        nav_start = html_text.index("<nav")
        nav_end = html_text.index("</nav>") + len("</nav>")
    except ValueError:
        raise SystemExit(f"{label}: no <nav> element found")
    try:
        main_start = html_text.index("<main")
        main_end = html_text.index("</main>") + len("</main>")
    except ValueError:
        raise SystemExit(f"{label}: no <main> element found")
    return html_text[nav_start:nav_end] + html_text[main_start:main_end]


def apply_corrections(fragment, corrections):
    """Apply the corrections to the source fragment with the pair page's own
    rule (src/lib/corrections.ts): one left-to-right pass, finds tried in file
    order, each required to match exactly once. The new words are wrapped in
    an element, as on the page, so the surrounding text node splits at the
    same places on both sides of the per-node comparison. Returns the
    corrected fragment and a list of problems."""
    if not corrections:
        return fragment, []
    by_find = {c["find"]: c for c in corrections}
    applied = {c["id"]: 0 for c in corrections}
    pattern = re.compile("|".join(re.escape(c["find"]) for c in corrections))

    def mark(match):
        correction = by_find[match.group(0)]
        applied[correction["id"]] += 1
        return f"<ins>{correction['replace']}</ins>"

    corrected = pattern.sub(mark, fragment)
    problems = [
        f'correction "{c["id"]}": find occurs {applied[c["id"]]} times in the source, '
        f"expected exactly once: «{c['find']}»"
        for c in corrections
        if applied[c["id"]] != 1
    ]
    return corrected, problems


def check_marks(built_fragment, corrections):
    """Each correction is marked in the page text and links to its list entry."""
    attrs = collect_attrs(built_fragment)
    problems = []
    for c in corrections:
        if ("ins", "id", f"corr-{c['id']}") not in attrs:
            problems.append(f'correction "{c["id"]}": no <ins id="corr-{c["id"]}"> mark in the page text')
        if ("a", "href", f"#correction-{c['id']}") not in attrs:
            problems.append(f'correction "{c["id"]}": the mark does not link to #correction-{c["id"]}')
    return problems


def check_corrections_list(built_html, corrections):
    """The list after <main> carries each correction's original and new
    wording, reason and every proof (title, excerpt, link), and links back
    to the mark in the text."""
    match = re.search(r'<aside\b[^>]*\bid="corrections"', built_html)
    end = built_html.find("</aside>", match.start()) if match else -1
    if end == -1:
        return ['built page: no <aside id="corrections"> list']
    aside = built_html[match.start():end + len("</aside>")]
    text = " ".join(text_lines(parse_fragment(aside)))
    attrs = collect_attrs(aside)

    problems = []
    expected_text = [CORRECTIONS_HEADING]
    expected_attrs = []
    for c in corrections:
        expected_text += [c["find"], c["replace"], c["reason"]]
        expected_attrs += [("li", "id", f"correction-{c['id']}"), ("a", "href", f"#corr-{c['id']}")]
        for proof in c["proof"]:
            expected_text += [proof["title"], proof["excerpt"]]
            expected_attrs.append(("a", "href", proof["url"]))
    for snippet in expected_text:
        if re.sub(r"\s+", " ", snippet).strip() not in text:
            problems.append(f"corrections list: missing text «{snippet}»")
    for triple in expected_attrs:
        if triple not in attrs:
            tag, name, value = triple
            problems.append(f'corrections list: missing <{tag} {name}="{value}">')
    return problems


def main():
    if not SOURCE_PATH.exists():
        raise SystemExit(f"Source not found: {SOURCE_PATH}")
    if not BUILT_PATH.exists():
        raise SystemExit(f"Built page not found: {BUILT_PATH} - run `npm run build` first")

    corrections = json.loads(CORRECTIONS_PATH.read_text(encoding="utf-8"))
    built_html = BUILT_PATH.read_text(encoding="utf-8")
    source_fragment, problems = apply_corrections(
        extract_nav_main(SOURCE_PATH.read_text(encoding="utf-8"), "source"), corrections
    )
    built_fragment = extract_nav_main(built_html, "built page")
    problems += check_marks(built_fragment, corrections)
    problems += check_corrections_list(built_html, corrections)

    source_lines = text_lines(parse_fragment(source_fragment))
    built_lines = text_lines(parse_fragment(built_fragment))

    if source_lines == built_lines and not problems:
        print(
            f"check_text: OK ({len(source_lines)} text nodes match, "
            f"{len(corrections)} corrections applied, marked and listed)"
        )
        return 0

    if source_lines != built_lines:
        diff = difflib.unified_diff(
            source_lines,
            built_lines,
            fromfile=f"{SOURCE_PATH.relative_to(REPO_ROOT)} (corrections applied)",
            tofile=str(BUILT_PATH.relative_to(REPO_ROOT)),
            lineterm="",
        )
        print("\n".join(diff))
    for problem in problems:
        print(problem)
    print(
        f"\ncheck_text: FAILED - {len(source_lines)} source text nodes, "
        f"{len(built_lines)} built text nodes, {len(problems)} correction problems",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
