"""Validate the local migration without network access or extra dependencies."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[1]
read=lambda name:json.loads((root/name).read_text())
media=read('data/legacy/media-manifest.json');content=read('src/data/legacy-content.json');documents=read('src/data/legacy-documents.json')
assert len(media)==143 and len(documents)==27
for item in media:
 path=root/'public'/item['localUrl'].lstrip('/')
 assert path.exists(),path
 assert path.stat().st_size==item['bytes'],path
 assert hashlib.sha256(path.read_bytes()).hexdigest()==item['sha256'],path
for kind in ['members','articles','gallery']:
 rows=content[kind];assert len(set(row['id'] for row in rows))==len(rows),kind
assert len(content['members'])==65
assert len([m for m in content['members'] if m['name']=='Sailesh Vaidya'])==1
assert sum(m['isPastPresident'] for m in content['members'])==22
assert sum(m['isMajorDonor'] for m in content['members'])==3
assert len(content['articles'])==12 and len(content['pages'])==12 and len(content['gallery'])==83
for member in content['members']:
 crop=member.get('portrait')
 if crop:
  assert 0<=crop['x']<crop['sourceWidth'] and 0<=crop['y']<crop['sourceHeight']
  assert crop['x']+crop['width']<=crop['sourceWidth']
  assert crop['y']+crop['height']<=crop['sourceHeight']
for row in content['articles']:
 assert row['dateLabel'] and row['paragraphs'] and row['sourceUrl']
 assert (root/'public'/row['image'].lstrip('/')).exists()
assert all(doc['text'].strip() for doc in documents)
print('Validated 143 original file hashes, 65 unique people, 22 past presidents, 3 Major Donors, 12 reports, 12 pages, 83 gallery images and 27 searchable PDFs.')
