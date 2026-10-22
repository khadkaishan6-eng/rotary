"""Normalize the archived public site. Roster names/crop boxes were checked against source scans.
OCR text is retained verbatim for review; it does not prove present-day membership or board office.
"""
from pathlib import Path
from html.parser import HTMLParser
import csv,glob,hashlib,html,json,re
ROOT=Path('.');raw=ROOT/'data/legacy/raw';media=json.loads(Path('data/legacy/media-manifest.json').read_text());byid={m['id']:m for m in media};pages=json.loads((raw/'pages-1.json').read_text());posts=json.loads((raw/'posts-1.json').read_text())
class Text(HTMLParser):
 def __init__(self):super().__init__();self.out=[];self.skip=0
 def handle_starttag(self,tag,attrs):
  if tag in ['script','style']:self.skip+=1
  if tag in ['p','div','li','h1','h2','h3','h4','br','blockquote']:self.out.append('\n')
 def handle_endtag(self,tag):
  if tag in ['script','style']:self.skip=max(0,self.skip-1)
  if tag in ['p','li','h1','h2','h3','h4','blockquote']:self.out.append('\n')
 def handle_data(self,data):
  if not self.skip:self.out.append(data)
def text(content):
 p=Text();p.feed(content);return '\n'.join(re.sub(r'\s+',' ',s).strip() for s in ''.join(p.out).splitlines() if s.strip())
def slug(s):return re.sub('[^a-z0-9]+','-',s.lower()).strip('-')
names={
99:[['Amrit Dhakal','Arjun Adhikari','Barsha Shrestha'],['Bidhata Shrestha','Bijay Karmacharya','Bimal K. Kedia'],['Binaya Raj Pandey','Binod Singh','Bruce Kenan'],['Dr. Durgesh Man Singh','Gajendra Bdr. Shrestha','Dr. Ganesh Thapa']],
100:[['Ghanshyam Poudel','Gyanendra Lal Pradhan','Himalaya Thapa'],['Hom Chhetri','Jyotsna Shrestha','Kamal Raj Rupakheti'],['Lata Rajak Shrestha','Madhav Lal Shrestha','Mahendra Kumar Shrestha'],['Prof. Dr. Manohar Lal Shrestha','Meenu Shrestha','Er. Milan Bikram Shah']],
101:[['Nabin Baskota','Nepal Bhushan Chand','Niranjan K. Bhattarai'],['Om Rajbhandary','Gen. Phatteh B. Limbu','Poonam Rana'],['Prabha Pradhan Rajbhandari','Prabhu Ram Bhandary','Pradeep Kumar Shrestha'],['Dr. Preeti Bhusal','Anjali Shrestha','Gen. Prayog Jung Bdr. Rana']],
102:[['Priti Sitoula Rajbanshi','Raj Kumar Gurung','Raju Babu Shrestha'],['Ram Krishna Bhattarai','Rohini Thapaliya','Dr. Rudra Pd. Marasini'],['Sadie Ranabhat Green','Sailesh Vaidya','Sajjan Bar Singh Thapa'],['Samridhi Rana Basnet','Sanat Kumar Basnet','Sanjay Dudhani']],
103:[['Sanjiv Rijal','Santosh Kumar Pradhan','Shreejesh Ghimire'],['Sophie Upadhya','Suberna B. Chhetri','Suman Neupane (Khanal)'],['Sushama Sharma','Uma Thapa','Umesh Shrestha'],['Upendra Poudyal','Urmila Shrestha','Yadab Pradhan']],
104:[['Dr. Zebana Ansari','Purushottam Acharya']]
}
xs={99:[182,660,1144],100:[133,614,1086],101:[182,663,1147],102:[121,604,1086],103:[182,664,1148],104:[124,853]}
ys={99:[314,794,1277,1773],100:[314,834,1300,1789],101:[315,797,1291,1806],102:[316,810,1291,1781],103:[326,792,1304,1800],104:[357]}
past_presidents={'Binod Singh','Dr. Durgesh Man Singh','Gajendra Bdr. Shrestha','Gyanendra Lal Pradhan','Kamal Raj Rupakheti','Madhav Lal Shrestha','Prof. Dr. Manohar Lal Shrestha','Er. Milan Bikram Shah','Nepal Bhushan Chand','Niranjan K. Bhattarai','Om Rajbhandary','Gen. Phatteh B. Limbu','Prabhu Ram Bhandary','Pradeep Kumar Shrestha','Rohini Thapaliya','Sajjan Bar Singh Thapa','Sanjiv Rijal','Sophie Upadhya','Sushama Sharma','Umesh Shrestha','Upendra Poudyal','Yadab Pradhan'}
board=[('Prof. Dr. Manohar Lal Shrestha','President'),('Sophie Upadhya','Immediate Past President'),('Sailesh Vaidya','President-Elect'),('Poonam Rana','Vice President'),('Sanjay Dudhani','Secretary & Editor'),('Shreejesh Ghimire','Treasurer'),('Samridhi Rana Basnet','Joint Secretary'),('Urmila Shrestha','Joint Treasurer'),('Utsav Gartaula','Sergeant at Arms'),('Sanjiv Rijal','Public Image Chair'),('Bijay Karmacharya','Membership Chair'),('Binod Singh','Club Administration Chair'),('Kamal Raj Rupakheti','Service Project Chair'),('Hom Chhetri','TRF Chair'),('Sushama Sharma','Youth Chair'),('Prabhu Ram Bhandary','Global Grant Chair'),('Pradeep Kumar Shrestha','Club Mentor'),('Nepal Bhushan Chand','Special Advisor to President'),('Om Rajbhandary','Club Trainer'),('Sajjan Bar Singh Thapa','Strategic Plan Chair'),('Gyanendra Lal Pradhan','Vocational Training Chair'),('Yadab Pradhan','Club IT Chair'),('Suberna B. Chhetri','RCK Vision 23–30')]
roles=dict(board)
def get_lines(rows,x0,y0,x1,y1):
 words=[r for r in rows if r['text'].strip() and int(r['left'])>=x0 and int(r['left'])<x1 and int(r['top'])>=y0 and int(r['top'])<y1]
 lines=[]
 for r in sorted(words,key=lambda r:(int(r['top']),int(r['left']))):
  y=int(r['top']);line=next((a for a in lines if abs(a[0]-y)<12),None)
  if line is None:line=[y,[]];lines.append(line)
  line[1].append(r)
 return [(y,' '.join(w['text'] for w in sorted(ws,key=lambda w:int(w['left'])))) for y,ws in sorted(lines)]
members=[]
for mid,grid in names.items():
 rows=list(csv.DictReader(open(glob.glob(f'data/legacy/ocr/{mid}-*.tsv')[0]),delimiter='\t'))
 for ri,row in enumerate(grid):
  for ci,name in enumerate(row):
   x,y=xs[mid][ci],ys[mid][ri];x0=max(0,x-25);x1=(xs[mid][ci+1]-15 if ci+1<len(xs[mid]) else 1660);y0=y+215;y1=(ys[mid][ri+1]-8 if ri+1<len(ys[mid]) else 2290)
   if mid==104:y1=825
   lines=get_lines(rows,x0,y0,x1,y1);entry='\n'.join(t for _,t in lines)
   fields={}
   patterns={'profession':r'Classification:\s*([^\n]+)','birthday':r"B['’]?day:\s*([^\n]+)",'anniversary':r'Wedding Ann?iversary:\s*([^\n]+)','spouse':r'(?:Ann|Spouse):\s*([^\n]+)'}
   for k,pattern in patterns.items():
    m=re.search(pattern,entry,re.I);fields[k]=m.group(1).strip() if m else ''
   emails=list(dict.fromkeys(re.findall(r'[A-Za-z0-9_.+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}',entry)))
   phones=list(dict.fromkeys(re.findall(r'(?<!\d)(?:\+?977[- ]?)?(?:98\d{8})(?!\d)',entry)))
   recognition=re.search(r'\((PHF|MPHF|PHS|MD)\)',entry)
   profession=fields['profession'];org=''
   for li,(_,line) in enumerate(lines):
    if 'Classification:' in line and li+1<len(lines):
     candidate=lines[li+1][1]
     if not re.match(r'^(C:|M:|P:|T:|Tel:|E:|B.day:|Wedding|Ann:|Spouse:)',candidate,re.I):org=candidate
     break
   if name=='Purushottam Acharya':emails=['purushottam19720417@gmail.com'];phones=['9851050272'];profession='Executive Secretary';org="Little Angels’ School, Hattiban, Lalitpur"
   if name=='Sailesh Vaidya':emails=['jasa ilesh@gmail.com'.replace(' ','')];phones=['9851029065'];profession='Financial Project Expert'
   item={'id':slug(name),'name':name,'profession':profession,'organization':org,'email':emails[0] if emails else '', 'emails':emails,'phone':phones[0] if phones else '', 'phones':phones,'recognition':recognition.group(1) if recognition else '',**{k:v for k,v in fields.items() if k!='profession'},'directoryText':entry,'directoryYear':'2024-25','legacyRole':roles.get(name,''),'isPastPresident':name in past_presidents,'isMajorDonor':name in {'Om Rajbhandary','Umesh Shrestha','Upendra Poudyal'},'portrait':{'source':byid[mid]['localUrl'],'sourceWidth':1701,'sourceHeight':2371,'x':x+2,'y':y+2,'width':190,'height':214},'sourceMediaId':mid,'sourceUrl':'https://rckasthamandap.org.np/rck-board-2024-25-members/','sourceImage':byid[mid]['localUrl'],'contactReviewRequired':True}
   members.append(item)
# One board member is absent from the family directory.
members.append({'id':'utsav-gartaula','name':'Utsav Gartaula','profession':'','organization':'','email':'','emails':[],'phone':'','phones':[],'recognition':'','directoryYear':'2024-25','directoryText':'Rtn. Utsav Gartaula · Sergeant at Arms','legacyRole':'Sergeant at Arms','isPastPresident':False,'isMajorDonor':False,'portrait':{'source':byid[96]['localUrl'],'sourceWidth':1276,'sourceHeight':1778,'x':556,'y':672,'width':138,'height':167},'sourceMediaId':96,'sourceUrl':'https://rckasthamandap.org.np/rck-board-2024-25-members/','sourceImage':byid[96]['localUrl'],'contactReviewRequired':True})
# Preserve honorary labels but do not guess which of two different portraits labelled Kazuo Arai is correct.
members.extend([
 {'id':'kazuo-arai','name':'Kazuo Arai','profession':'Honorary Member; Past District Governor, RI District 2820 Japan','organization':'RI District 2820, Japan','email':'','phone':'','directoryYear':'2024-25','directoryText':'Honorary Member; DRFC 2022–2025; District Trainer 2023–24; Past District Governor, RI District 2820 Japan. Two different portraits share this name in the source; identity of the second portrait needs confirmation.','legacyRole':'Honorary Member','isPastPresident':False,'isMajorDonor':False,'sourceUrl':'https://rckasthamandap.org.np/rck-board-2024-25-members/','sourceImage':byid[104]['localUrl']},
 {'id':'ashma-kumari-kc','name':'Ashma Kumari KC','profession':'Miss Nepal 2024; Goodwill Ambassador','organization':'','email':'','phone':'','directoryYear':'2024-25','directoryText':'Honorary Member; Miss Nepal 2024; Goodwill Ambassador.','legacyRole':'Honorary Member','isPastPresident':False,'isMajorDonor':False,'portrait':{'source':byid[104]['localUrl'],'sourceWidth':1701,'sourceHeight':2371,'x':1052,'y':1250,'width':251,'height':282},'sourceUrl':'https://rckasthamandap.org.np/rck-board-2024-25-members/','sourceImage':byid[104]['localUrl']}
])
# Event dates come from article bodies, never the WordPress upload timestamp.
events={185:('2026-01-17','Fellowship','Hotel Radisson, Lazimpat, Kathmandu'),114:('2022-08-26','Professional','Kathmandu'),112:('2023-06-27','Fellowship','Hotel Shankar, Lazimpat'),63:('2023-04-11','Youth','Namobuddha, Bhainsepati and Pulchowk'),61:('2023-03-10','Professional','Radisson Hotel, Kathmandu'),59:('2023-03-04','Service','Pithouli, Nawalparasi'),57:('2023-03-04','Service','Pithouli Health Post, Nawalparasi'),55:('2023-02-11','Service','Jhorahat and Bhakhari, Morang'),53:('2023-01-09','Service','Dharan and Kankai, Jhapa'),51:('2022-12-22','Service','Mulghat, Dhankuta'),13:('','Service','Damravitta, Itahara, Morang'),7:('2022-10-23','Fellowship','Koshi Compound, Dillibazar, Kathmandu')}
articles=[]
for row in posts:
 body=text(row['content']['rendered']);paras=[p for p in body.splitlines() if p];title=html.unescape(row['title']['rendered']);date,avenue,location=events[row['id']];year=(int(date[:4])-(int(date[5:7])<7)) if date else None
 image=byid.get(row['featured_media'],{}).get('localUrl','/images/legacy-article.svg')
 articles.append({'id':f"legacy-{row['id']}",'legacyId':row['id'],'slug':row['slug'],'title':title,'excerpt':paras[0][:280].rsplit(' ',1)[0]+'…','paragraphs':paras,'bodyText':body,'date':row['date'][:10],'eventDate':date,'dateLabel':'12 Kartik 2079 (B.S.)' if row['id']==13 else date, 'tenureYear':f'{year}-{str(year+1)[-2:]}' if year else 'undated','avenue':avenue,'location':location,'image':image,'sourceUrl':row['link'],'featured':row['id']==57})
galleryPage=next(p for p in pages if p['id']==23)
galleryIds=list(dict.fromkeys(int(n) for n in re.findall(r'id="envira-gallery-item-(\d+)"',galleryPage['content']['rendered'])))
gallery=[{'id':f'legacy-photo-{mid}','title':f'Silver Jubilee celebration · photograph {i+1}','date':'2026-01-17','avenue':'Fellowship','image':byid[mid]['localUrl'],'sourceUrl':byid[mid]['sourceUrl']} for i,mid in enumerate(galleryIds)]
documents=[]
for m in media:
 if m.get('mimeType')!='application/pdf':continue
 fname=Path(m['localUrl']).name;txtfile=Path('data/legacy/text')/(Path(fname).stem+'.txt');body=txtfile.read_text() if txtfile.exists() else '';documents.append({**m,'text':body,'kind':'Bulletin','title':re.sub(r'^\d+-','',fname).removesuffix('.pdf').replace('_',' ').replace('-',' '),'sourceUrl':m['sourceUrl']})
pageData=[{'id':p['id'],'title':html.unescape(p['title']['rendered']),'slug':p['slug'],'sourceUrl':p['link'],'text':text(p['content']['rendered']) if p['id'] not in [72,20,23] else '', 'empty':not p['content']['rendered'].strip(),'imageIds':list(dict.fromkeys(int(i) for i in re.findall(r'wp-image-(\d+)',p['content']['rendered'])))} for p in pages]
partners=[{'id':'rotaract','name':'Rotaract Club of Kasthamandap','year':'2025–26','sourceUrl':'https://rckasthamandap.org.np/rotaract-board-members/','image':byid[107]['localUrl'],'notes':'Archived partner-club team. The image says President 25/26, while the souvenir footer says 2024–25. Some small labels are low resolution; the original is retained.','people':[{'name':n,'role':r} for n,r in [('Sunisha Dhungana','President 2025–26'),('Danisha Khatiwada','Advisor / IPP'),('Rohan Das','Vice President / TRF'),('Unnati Shakya','Secretary'),('Sayana Rai','Treasurer'),('Komal Dhami','Joint Secretary'),('Tejaswi Shrestha','Sergeant at Arms'),('Abhinash Jha','Public Image / Membership'),('Kripa Singh','Service Project Chair'),('Pratiksha Khatri','Learning Facilitator'),('Ishan Phelia','Young Leaders Contact'),('Gaurab Oli','Professional Development Chair'),('Sagar Sigdel','International Relations Officer'),('Sachendra Sharma','Creative Director'),('Rhythm Shrestha','Social Media Manager')]],'transcriptionReviewRequired':True}, {'id':'interact','name':"Interact Club of Little Angels’ School",'year':'2024–25','sourceUrl':'https://rckasthamandap.org.np/interact-board-members/','image':byid[109]['localUrl'],'notes':'Archived partner-club team, not the Rotary Club board.','people':[{'name':n,'role':r} for n,r in [('Ishan Khadka','President'),('Rhythm Shrestha','Vice President'),('Unnayan Ghimire','Secretary'),('Jenish Maharjan','Treasurer'),('Juntara Maharjan','Community Service Director'),('Aman Dahal','Public Image Director'),('Hrewang Lama','International Service Director'),('Umanga Timalsina','Club Service Director'),('Aarush Gurung','Media Head'),('Ujjwal Karmacharya','IT Head'),('Aviyu Pandey','Sergeant at Arms')]],'transcriptionReviewRequired':False}]
output={'source':'https://rckasthamandap.org.np/','extractedAt':'2026-10-22','members':members,'board':[{'name':n,'role':r,'sourceYear':'2024-25'} for n,r in board],'articles':articles,'gallery':gallery,'pages':pageData,'partners':partners,'charterDate':'2001-06-27','charterSource':byid[183]['localUrl'],'presidentTenures':{'gajendra-bdr-shrestha':'2001-02','niranjan-k-bhattarai':'2011-12','gyanendra-lal-pradhan':'2008-09','sushama-sharma':'2016-17','sanjiv-rijal':'2018-19','dr-durgesh-man-singh':'2004-05','gen-phatteh-b-limbu':'2005-06','rohini-thapaliya':'2006-07','madhav-lal-shrestha':'2014-15','er-milan-bikram-shah':'2012-13','upendra-poudyal':'2013-14','yadab-pradhan':'2022-23','om-rajbhandary':'2023-24','prof-dr-manohar-lal-shrestha':'2025-26','sophie-upadhya':'2024-25','nepal-bhushan-chand':'2021-22','kamal-raj-rupakheti':'2020-21','binod-singh':'2019-20','prabhu-ram-bhandary':'2015-16','sajjan-bar-singh-thapa':'2017-18'},'presidentTenureSource':byid[182]['localUrl'],'clubNumber':'56011','meetings':{'rotary':{'day':'Friday','time':'8:00–9:00 a.m.','venue':'Hotel Radisson, Lazimpat, Kathmandu'},'rotaract':{'day':'First and third Saturday','time':'10:00–11:00 a.m.','venue':'Nepal Association for the Welfare of the Blind, Thapathali'},'interact':{'venue':"Little Angels’ School, Hattiban, Lalitpur"}},'issues':['Directory pages say Souvenir 2024–25; filenames say 2025–26. Historical roles are not promoted to current board roles.','Rotaract team image says President 25/26 but its souvenir footer says 2024–25.','Two different honorary-member portraits are both labelled Kazuo Arai. No second identity was inferred.','About-page emails are malformed; the clear directory transcription supplies the executive secretary email.','Old meeting pages disagree on Rotaract meeting time (9:30–10:30 vs 10:00–11:00); both source texts are preserved.','No confirmed member departure dates were published; archive membership is not evidence of departed status.','OCR-derived contact fields require review; scans remain available.','Current leadership names, new portraits and map coordinates supplied by the user take precedence over historical records.']}
Path('src/data/legacy-content.json').write_text(json.dumps(output,ensure_ascii=False,indent=2));Path('src/data/legacy-documents.json').write_text(json.dumps(documents,ensure_ascii=False,indent=2));Path('data/legacy/normalized-snapshot.json').write_text(json.dumps(output,ensure_ascii=False,indent=2))
print(json.dumps({'members':len(members),'board':len(board),'articles':len(articles),'gallery':len(gallery),'bulletins':len(documents),'partnerPeople':sum(len(p['people']) for p in partners)},indent=2))
