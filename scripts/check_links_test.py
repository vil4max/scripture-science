from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from check_links import check_site


class LinkCheckTests(unittest.TestCase):
    def test_local_links_queries_fragments_and_external_destinations(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "other").mkdir()
            (root / "index.html").write_text('''<a href="other/?t=x#%D1%82%D0%B5%D0%BC%D0%B0">Topic</a>
                <a href="https://example.org/site/other/#тема">Absolute</a>
                <a href="https://external.test/missing">External</a>
                <a href="mailto:test@example.org">Mail</a>''')
            (root / "other/index.html").write_text('<h1 id="тема">Topic</h1><a href="../">Home</a>')
            self.assertEqual(check_site(root, "https://example.org", "/site"), [])

    def test_missing_pages_anchors_duplicate_ids_and_wrong_base(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "index.html").write_text('''<p id="same"></p><p id="same"></p>
                <a href="missing/">Missing</a><a href="#absent">Anchor</a>
                <a href="/wrong/">Wrong base</a>''')
            errors = check_site(root, "https://example.org", "/site")
            self.assertEqual(len(errors), 4)
            for message in ["duplicate id", "missing target", "missing anchor", "outside site base"]:
                self.assertTrue(any(message in error for error in errors), message)
