"""Check local page references before committing or publishing (Python standard library)."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src', 'poster'):
            if attrs.get(key):
                self.references.append(attrs[key])

page = Page()
page.feed((ROOT / 'index.html').read_text())
errors = []
for reference in page.references:
    url = urlsplit(reference)
    if url.scheme or url.netloc:
        continue
    if url.path:
        target = ROOT / unquote(url.path)
        if not target.is_file():
            errors.append(f'Missing resource: {reference}')
    elif url.fragment and unquote(url.fragment) not in page.ids:
        errors.append(f'Missing anchor: {reference}')
for css in (ROOT / 'css').glob('*.css'):
    for reference in re.findall(r'url\(\s*[\'"]?([^\)\'\"]+)', css.read_text()):
        url = urlsplit(reference)
        if not url.scheme and not url.netloc and url.path:
            if not (css.parent / unquote(url.path)).is_file():
                errors.append(f'Missing CSS resource: {reference}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {len(page.references)} page references and CSS resources.')
