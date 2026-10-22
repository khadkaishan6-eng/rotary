#!/usr/bin/env python3
"""Archive public WordPress content and media; never requires credentials.
Run from repository root. Existing downloads are reused; snapshots retain source URLs.
"""
from pathlib import Path
import concurrent.futures, hashlib, html, json, re, time, requests
from urllib.parse import urlparse, unquote
BASE='https://rckasthamandap.org.np'
RAW=Path('data/legacy/raw');DEST=Path('public/legacy/media')
RAW.mkdir(parents=True,exist_ok=True);DEST.mkdir(parents=True,exist_ok=True)
collections={}
for kind in ['posts','pages','media','categories','tags']:
 rows=[];page=1
 while True:
  f=RAW/f'{kind}-{page}.json'
  if f.exists():batch=json.loads(f.read_text())
  else:
   r=requests.get(f'{BASE}/wp-json/wp/v2/{kind}',params={'per_page':100,'page':page},timeout=40);r.raise_for_status();batch=r.json();f.write_text(json.dumps(batch,ensure_ascii=False,indent=2))
  if not isinstance(batch,list):raise RuntimeError(f'Invalid {kind} response')
  rows.extend(batch)
  if len(batch)<100:break
  page+=1
 collections[kind]=rows
manifest=[]
def fetch(m):
 url=m['source_url'];name=f"{m['id']}-"+unquote(urlparse(url).path.rsplit('/',1)[-1]);name=re.sub(r'[^\w.() -]','-',name);target=DEST/name
 error=None
 for attempt in range(3):
  try:
   if not target.exists():
    r=requests.get(url,timeout=45);r.raise_for_status();target.write_bytes(r.content)
   data=target.read_bytes()
   return {'id':m['id'],'sourceUrl':url,'localUrl':'/legacy/media/'+name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'mimeType':m['mime_type'],'title':html.unescape(m['title']['rendered']),'alt':m.get('alt_text',''),'width':m.get('media_details',{}).get('width'),'height':m.get('media_details',{}).get('height'),'parent':m.get('post',0)}
  except Exception as e:error=str(e);time.sleep(attempt+1)
 return {'id':m['id'],'sourceUrl':url,'error':error}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for index,item in enumerate(pool.map(fetch,collections['media']),1):
  manifest.append(item)
  if index%25==0:print(f'{index}/{len(collections["media"])} media archived',flush=True)
Path('data/legacy/media-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
for row in collections['pages']+collections['posts']:
 (RAW/f"content-{row['id']}.html").write_text(row['content']['rendered'])
print(json.dumps({'counts':{k:len(v) for k,v in collections.items()},'bytes':sum(m.get('bytes',0) for m in manifest),'failures':[m for m in manifest if m.get('error')]},indent=2),flush=True)
