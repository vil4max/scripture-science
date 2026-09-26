#!/usr/bin/env python3
"""Migrate source/orthodoxy-jw.html into the site's content collections.

Writes src/data/sections-orthodoxy-jw.yaml (every part of <main> that isn't
one of the twelve theology topics, plus the nav chips, as verbatim HTML
fragments) and src/data/topics-orthodoxy-jw.yaml (the twelve
section#theology > details.topic blocks, decomposed into order/title/
positions/extras per docs/tasks/site-m1-migration.md W2).

Deterministic: running this script twice produces byte-identical output
(checked with `git diff --exit-code` after a second run). Standard library
only - no PyYAML: YAML's double-quoted scalar syntax is a superset of JSON
string syntax, so string values are emitted via json.dumps.
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_PATH = REPO_ROOT / "source" / "orthodoxy-jw.html"
SECTIONS_PATH = REPO_ROOT / "src" / "data" / "sections-orthodoxy-jw.yaml"
TOPICS_PATH = REPO_ROOT / "src" / "data" / "topics-orthodoxy-jw.yaml"

# Regular (non-theology) parts of <main>, in source order, plus the nav
# chips that sit just before <main>. "theology" holds only that section's
# eyebrow/heading/intro - its twelve topics are extracted separately below.
SECTION_IDS = [
    "history", "sources", "common", "theology",
    "literature", "structure", "dynamics", "summary", "glossary", "refs",
]


# --- Minimal HTML tree: html.parser lowercases tag/attribute names, which is
# fine for HTML but would corrupt a handful of camelCase SVG attributes
# (viewBox, refX, ...) if left as-is; SVG_ATTR_CASE restores them on output.

VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

SVG_ATTR_CASE = {
    "viewbox": "viewBox", "refx": "refX", "refy": "refY",
    "markerwidth": "markerWidth", "markerheight": "markerHeight",
    "markerunits": "markerUnits", "preserveaspectratio": "preserveAspectRatio",
    "gradientunits": "gradientUnits", "gradienttransform": "gradientTransform",
    "patternunits": "patternUnits", "patterncontentunits": "patternContentUnits",
    "patterntransform": "patternTransform", "spreadmethod": "spreadMethod",
    "stddeviation": "stdDeviation", "stitchtiles": "stitchTiles",
    "systemlanguage": "systemLanguage", "tablevalues": "tableValues",
    "targetx": "targetX", "targety": "targetY", "textlength": "textLength",
    "viewtarget": "viewTarget", "xchannelselector": "xChannelSelector",
    "ychannelselector": "yChannelSelector", "zoomandpan": "zoomAndPan",
    "attributename": "attributeName", "attributetype": "attributeType",
    "basefrequency": "baseFrequency", "calcmode": "calcMode",
    "clippathunits": "clipPathUnits", "diffuseconstant": "diffuseConstant",
    "edgemode": "edgeMode", "filterunits": "filterUnits", "glyphref": "glyphRef",
    "kernelmatrix": "kernelMatrix", "kernelunitlength": "kernelUnitLength",
    "keypoints": "keyPoints", "keysplines": "keySplines", "keytimes": "keyTimes",
    "lengthadjust": "lengthAdjust", "limitingconeangle": "limitingConeAngle",
    "maskcontentunits": "maskContentUnits", "maskunits": "maskUnits",
    "numoctaves": "numOctaves", "pathlength": "pathLength",
    "pointsatx": "pointsAtX", "pointsaty": "pointsAtY", "pointsatz": "pointsAtZ",
    "preservealpha": "preserveAlpha", "primitiveunits": "primitiveUnits",
    "repeatcount": "repeatCount", "repeatdur": "repeatDur",
    "requiredextensions": "requiredExtensions", "requiredfeatures": "requiredFeatures",
    "specularconstant": "specularConstant", "specularexponent": "specularExponent",
    "surfacescale": "surfaceScale",
}


class Node:
    __slots__ = ("kind", "tag", "attrs", "children", "data")

    def __init__(self, kind, tag=None, attrs=None, data=None):
        self.kind = kind  # 'element' | 'text'
        self.tag = tag
        self.attrs = attrs or []
        self.children = []
        self.data = data

    def get_attr(self, name):
        for k, v in self.attrs:
            if k == name:
                return v
        return None

    def classes(self):
        return (self.get_attr("class") or "").split()

    def has_class(self, name):
        return name in self.classes()


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("element", tag="#root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node("element", tag=tag, attrs=attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node("element", tag=tag, attrs=attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return
        # Stray close tag with no matching open element: ignore.

    def handle_data(self, data):
        if data:
            self.stack[-1].children.append(Node("text", data=data))


def parse_fragment(html_text):
    tb = TreeBuilder()
    tb.feed(html_text)
    tb.close()
    return tb.root


def escape_text(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def escape_attr(s):
    return s.replace("&", "&amp;").replace('"', "&quot;")


def fix_attr_name(name):
    return SVG_ATTR_CASE.get(name, name)


def serialize(node):
    """Serialize a node (element or text) back to an HTML string."""
    if node.kind == "text":
        return escape_text(node.data)
    attrs_s = "".join(
        f' {fix_attr_name(k)}="{escape_attr(v)}"' if v is not None else f" {fix_attr_name(k)}"
        for k, v in node.attrs
    )
    if node.tag in VOID_ELEMENTS:
        return f"<{node.tag}{attrs_s}/>"
    inner = "".join(serialize(c) for c in node.children)
    return f"<{node.tag}{attrs_s}>{inner}</{node.tag}>"


def inner_html(node):
    return "".join(serialize(c) for c in node.children)


def text_of(node):
    if node.kind == "text":
        return node.data
    return "".join(text_of(c) for c in node.children)


def find_all(node, tag=None, cls=None, direct_only=False):
    results = []
    scope = node.children if direct_only else _descendants(node)
    for c in scope:
        if c.kind == "element" and (tag is None or c.tag == tag) and (cls is None or c.has_class(cls)):
            results.append(c)
    return results


def _descendants(node):
    for c in node.children:
        if c.kind == "element":
            yield c
            yield from _descendants(c)


def find_first(node, tag=None, cls=None, direct_only=False):
    r = find_all(node, tag=tag, cls=cls, direct_only=direct_only)
    return r[0] if r else None


def direct_children_elements(node):
    return [c for c in node.children if c.kind == "element"]


# --- Slug generation: a synthetic, internal id (not sourced text), used as
# each topic's file-loader id via the `slug` field. GOST-style transliteration.

TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e",
    "ж": "zh", "з": "z", "и": "i", "й": "i", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "h", "ц": "c", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "",
    "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
}


def slugify(title):
    lowered = title.lower()
    translit = "".join(TRANSLIT.get(ch, ch) for ch in lowered)
    slug = re.sub(r"[^a-z0-9]+", "-", translit).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    return slug


# --- Minimal YAML writer: no PyYAML (not stdlib). Double-quoted scalars are
# valid YAML because YAML 1.2's double-quoted style is a superset of JSON
# string syntax, so json.dumps produces a correctly escaped scalar.

def yaml_scalar(value):
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    return json.dumps(value, ensure_ascii=False)


def dump_mapping_lines(mapping, indent):
    pad = "  " * indent
    lines = []
    for key, value in mapping.items():
        if value is None:
            continue  # omit optional/absent fields rather than emit `key: null`
        if isinstance(value, dict):
            if not value:
                lines.append(f"{pad}{key}: {{}}")
            else:
                lines.append(f"{pad}{key}:")
                lines.extend(dump_mapping_lines(value, indent + 1))
        elif isinstance(value, list):
            if not value:
                lines.append(f"{pad}{key}: []")
            else:
                lines.append(f"{pad}{key}:")
                lines.extend(dump_list_lines(value, indent))
        else:
            lines.append(f"{pad}{key}: {yaml_scalar(value)}")
    return lines


def dump_list_lines(items, indent):
    pad = "  " * indent
    lines = []
    for item in items:
        item_lines = dump_mapping_lines(item, indent + 1)
        first_content = item_lines[0][len(pad) + 2 :]
        lines.append(f"{pad}- {first_content}")
        lines.extend(item_lines[1:])
    return lines


def dump_yaml_document(items, header_comment):
    body = "\n".join(dump_list_lines(items, 0))
    return f"{header_comment}\n{body}\n"


# --- Extraction ---

def extract_sections(nav_el, main_el):
    entries = []
    chips = find_first(nav_el, tag="div", cls="chips", direct_only=True)
    entries.append({"id": "nav", "html": inner_html(chips)})

    header = find_first(main_el, tag="header", direct_only=True)
    entries.append({"id": "header", "html": inner_html(header)})

    sections_by_id = {
        s.get_attr("id"): s for s in find_all(main_el, tag="section", direct_only=True)
    }
    for section_id in SECTION_IDS:
        section = sections_by_id[section_id]
        if section_id == "theology":
            # Only the eyebrow/heading/intro before the first topic; the
            # twelve details.topic blocks are extracted into topics data.
            pre_children = []
            for child in direct_children_elements(section):
                if child.tag == "details" and child.has_class("topic"):
                    break
                pre_children.append(child)
            html = "".join(serialize(c) for c in pre_children)
        else:
            html = inner_html(section)
        entries.append({"id": section_id, "html": html})
    return entries


def extract_points(pos_el):
    ul = find_first(pos_el, tag="ul", direct_only=True)
    points = []
    for li in find_all(ul, tag="li", direct_only=True):
        children = li.children
        ref = None
        rest = children
        if (
            children
            and children[0].kind == "element"
            and children[0].tag == "span"
            and children[0].has_class("ref")
        ):
            ref = text_of(children[0]).strip()
            rest = children[1:]
        html = "".join(serialize(c) for c in rest)
        points.append({"ref": ref, "html": html})
    return points


def extract_position(pos_el):
    who = find_first(pos_el, tag="span", cls="who", direct_only=True)
    thesis = find_first(pos_el, tag="p", cls="thesis", direct_only=True)
    return {
        "label": text_of(who).strip(),
        "thesis": text_of(thesis).strip(),
        "points": extract_points(pos_el),
    }


# Tradition each source column belongs to, by its side class in the source's
# first duo (left = older tradition, right = younger - EDITORIAL.md
# principle 2). Fixed for this single-document migration; a later slice
# generalizes this mapping when more documents are migrated.
SIDE_TRADITION = {"o": "orthodoxy", "j": "jw"}


def extract_topics(theology_section):
    topics = []
    for details in find_all(theology_section, tag="details", cls="topic", direct_only=True):
        summary = find_first(details, tag="summary", direct_only=True)
        h3 = find_first(summary, tag="h3")
        h3_text = text_of(h3).strip()
        m = re.match(r"(\d+)\.\s*(.+)", h3_text)
        if not m:
            raise ValueError(f"Topic heading does not match '<n>. <title>': {h3_text!r}")
        order = int(m.group(1))
        title = m.group(2)

        body = find_first(details, tag="div", cls="body", direct_only=True)
        body_children = direct_children_elements(body)
        if not body_children or not (body_children[0].tag == "div" and body_children[0].has_class("duo")):
            raise ValueError(f"Topic {order} ({title!r}): body does not start with a div.duo")
        duo = body_children[0]
        extras_children = body_children[1:]

        position_els = find_all(duo, tag="div", cls="pos", direct_only=True)
        if len(position_els) != 2:
            raise ValueError(f"Topic {order} ({title!r}): expected 2 positions, found {len(position_els)}")
        positions = {}
        for pos_el in position_els:
            side = next((c for c in pos_el.classes() if c in SIDE_TRADITION), None)
            if side is None:
                raise ValueError(f"Topic {order} ({title!r}): position has no known side class ({pos_el.classes()})")
            positions[SIDE_TRADITION[side]] = extract_position(pos_el)

        extras = "".join(serialize(c) for c in extras_children)
        topics.append(
            {
                "order": order,
                "title": title,
                "slug": slugify(title),
                "positions": positions,
                "extras": extras,
            }
        )
    return topics


def main():
    html = SOURCE_PATH.read_text(encoding="utf-8")

    nav_start = html.index("<nav")
    nav_end = html.index("</nav>") + len("</nav>")
    nav_root = parse_fragment(html[nav_start:nav_end])
    nav_el = find_first(nav_root, tag="nav")

    main_start = html.index("<main")
    main_end = html.index("</main>") + len("</main>")
    main_root = parse_fragment(html[main_start:main_end])
    main_el = find_first(main_root, tag="main")

    sections = extract_sections(nav_el, main_el)
    theology_section = [s for s in find_all(main_el, tag="section", direct_only=True) if s.get_attr("id") == "theology"][0]
    topics = extract_topics(theology_section)
    if len(topics) != 12:
        raise ValueError(f"Expected 12 theology topics, found {len(topics)}")

    sections_yaml = dump_yaml_document(
        sections,
        "# Generated by scripts/migrate_source.py from source/orthodoxy-jw.html.\n"
        "# Do not edit by hand - re-run the script instead.\n"
        "#\n"
        "# Every part of <main> that is not one of the twelve theology topics (plus\n"
        "# the nav chips), as verbatim inner-HTML fragments, in source order. The\n"
        '# "theology" entry holds only that section\'s eyebrow/heading/intro; its\n'
        "# twelve topics are in topics-orthodoxy-jw.yaml instead.",
    )
    topics_yaml = dump_yaml_document(
        topics,
        "# Generated by scripts/migrate_source.py from source/orthodoxy-jw.html.\n"
        "# Do not edit by hand - re-run the script instead.\n"
        "#\n"
        "# The twelve section#theology > details.topic blocks, decomposed: order/title\n"
        "# from the topic's h3, positions from its first div.duo (keyed by tradition\n"
        "# id), extras verbatim for everything in the topic body after that duo.",
    )

    SECTIONS_PATH.write_text(sections_yaml, encoding="utf-8")
    TOPICS_PATH.write_text(topics_yaml, encoding="utf-8")
    print(f"Wrote {SECTIONS_PATH.relative_to(REPO_ROOT)} ({len(sections)} entries)")
    print(f"Wrote {TOPICS_PATH.relative_to(REPO_ROOT)} ({len(topics)} entries)")


if __name__ == "__main__":
    main()
