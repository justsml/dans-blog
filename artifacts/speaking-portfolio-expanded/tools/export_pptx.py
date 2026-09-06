"""Native text/table PowerPoint export from the shared, source-preserving talk model."""
from pathlib import Path
import sys,json,re,math,hashlib,shutil
from pptx_package import Deck,Slide,wrap,xfrm,color

source=Path(sys.argv[1]);out=Path(sys.argv[2]);out.mkdir(exist_ok=True)
talks=json.loads(source.read_text())
def plain(s):
 # Remove presentation markup while retaining the referenced URL and literal
 # punctuation/operators from the canonical source.
 s=re.sub(r'\[([^]]+)\]\((https?://.+)\)',r'\1 — \2',s)
 s=re.sub(r'\*\*([^*]+)\*\*',r'\1',s)
 s=re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'\1',s)
 return re.sub(r'`([^`]+)`',r'\1',s)
def rect(s,x,y,w,h,c):
 s.id+=1;s.parts.append(f'<p:sp><p:nvSpPr><p:cNvPr id="{s.id}" name="Image background"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr>{xfrm(x,y,w,h)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>{color(c)}<a:ln><a:noFill/></a:ln></p:spPr></p:sp>')
def header(s,title,label):
 s.text(label,48,28,960,24,14,s.deck.accent,bold=True)
 size=34 if len(title)<95 else 30
 s.text(plain(title),48,69,960,116,size,bold=True,line=size*1.2)
def note(talk,b,minutes):
 if minutes==40:return b['raw']
 return '\n\n'.join([talk['title'],f'Source slide {b["n"]}. {b["start"]} to {b["end"]}',*b['visible'],*b['spoken'],*b['sources'],b.get('story',''),b.get('stage',''),b.get('bridge','')])
def picture(s,talk,b,x,y,w,maxh):
 m=talk['media'][b['image']['src']];ratio=m['height']/m['width'];h=min(maxh,w*ratio);pw=h/ratio
 bg='122323' if talk['slug']=='adaptive-systems' else '161D26'
 rect(s,x+(w-pw)/2,y,pw,h,bg)
 s.image(Path(m['svg']),x+(w-pw)/2,y,pw,h,b['image']['alt'])
 return h

def reading(d,title,paras,notes,label,diagram=None,talk=None):
 """Paginate whole paragraphs when possible; split only paragraphs longer than a page."""
 first=True;pending=[plain(p) for p in paras if p.strip()]
 while pending or first:
  s=d.add(notes);header(s,title+(' (continued)' if not first else ''),label)
  im=diagram if first else None
  if im:
   picture(s,talk,im,144,187,768,285);y=488;size=16;line=21;capacity=26
  else:y=207;size=20;line=26;capacity=42
  lines=[]
  while pending:
   p=pending[0];wrapped=wrap(p,457,size);gap=1 if lines else 0
   if len(lines)+gap+len(wrapped)<=capacity:
    if gap:lines.append('')
    lines+=wrapped;pending.pop(0)
   elif lines:break
   else:
    lines=wrapped[:capacity];pending[0]=' '.join(wrapped[capacity:]);break
  # Avoid a page with only an image and no prose if source contains no paragraphs.
  mid=math.ceil(len(lines)/2);h=278 if im else 558
  s.text('\n'.join(lines[:mid]),48,y,457,h,size,line=line,manual=False)
  s.text('\n'.join(lines[mid:]),550,y,458,h,size,line=line,manual=False)
  first=False

def appendix(d,item):
 # The source appendix is copied, never rewritten. Markdown structure becomes native text/tables.
 text=item['text'];parts=re.split(r'^## ',text,flags=re.M);root_title=parts[0].splitlines()[0].lstrip('# ')
 for k,part in enumerate(parts):
  if k==0:
   title=root_title;body='\n'.join(part.splitlines()[1:]).strip()
  else:title,body=part.split('\n',1);body=body.strip()
  table=re.search(r'(?:^\|.*\n?)+',body,re.M)
  code=re.search(r'```\w*\n(.*?)\n```',body,re.S)
  if table:
   rows=[[plain(c.strip()) for c in row.strip().strip('|').split('|')] for row in table[0].splitlines() if not re.match(r'^\|[\s|:\-]+$',row)]
   s=d.add(text);header(s,title,'IMPLEMENTATION HANDOUT');s.table(rows,48,188,[180,780] if len(rows[0])==2 else [960/len(rows[0])]*len(rows[0]),17)
   remaining=body.replace(table[0],'').strip()
   if remaining:reading(d,title,remaining.split('\n\n'),text,'IMPLEMENTATION HANDOUT')
  elif code:
   # The memory prompt is prose in a text fence. Preserve every word as native editable text.
   reading(d,title,[code[1]],text,'COPYABLE PROMPT')
  elif body:reading(d,title,body.split('\n\n'),text,'IMPLEMENTATION HANDOUT')

manifest=[]
for talk in talks:
 for variant in talk['variants']:
  mins=variant['minutes'];slides=variant['slides']
  for mode in ['screen','handout']:
   d=Deck(talk['slug'],mode,talk['title']);d.short=talk['title'];d.accent=('A4D2C4' if talk['slug']=='adaptive-systems' else 'EFB45F') if mode=='screen' else '246957'
   if mode=='handout':
    s=d.add('\n\n'.join(talk['front']));s.text('DAN LEVY',48,54,960,30,18,d.accent,bold=True)
    size=50 if len(talk['title'])<85 else 43
    s.text(talk['title'],48,150,960,250,size,bold=True,line=size*1.2)
    s.text(f'{mins}-minute route · Reading edition',48,470,960,60,30,d.accent)
    s.text(f'{len(slides)} source sections\nSeptember 6, 2026',48,682,950,80,21,line=29)
   for index,b in enumerate(slides,1):
    notes=note(talk,b,mins)
    if mode=='handout':
     reading(d,b['heading'],b['visible']+b['spoken'],notes,f'{index:02d} / {len(slides):02d}    SOURCE SLIDE {b["n"]}',b if b.get('image') else None,talk)
     if b.get('table'):
      s=d.add(notes);header(s,b['heading'],'SOURCE TABLE');rows=b['table'];s.table(rows,48,200,[960/len(rows[0])]*len(rows[0]),21)
     continue
    s=d.add(notes);s.text(talk['title']+' · Dan Levy' if index==1 else f'{index:02d} / {len(slides):02d}    SOURCE SLIDE {b["n"]}',72,40,1296,48,18,d.accent,bold=True)
    size=52 if len(b['heading'])<105 else 46
    s.text(plain(b['heading']),72,111,1296,145,size,bold=True,line=size*1.2)
    if b.get('image'):picture(s,talk,b,72,278,1296,485)
    elif b.get('table'):
     rows=b['table'];height=s.table(rows,72,289,[1296/len(rows[0])]*len(rows[0]),29)
     if b['visible']:s.text('\n'.join(map(plain,b['visible'])),72,310+height,1296,160,27,d.accent,line=36)
    else:
     qs=list(map(plain,b['visible']))
     for size in [42,38,34,30,27]:
      heights=[len(wrap(q,1158,size))*size*1.3 for q in qs]
      if sum(heights)+28*max(0,len(qs)-1)<=540:break
     y=291
     for j,(q,h) in enumerate(zip(qs,heights)):
      s.text(f'{j+1:02d}',72,y,95,50,25,d.accent);s.text(q,210,y,1158,h+2,size,line=size*1.3);y+=h+28
   if mode=='handout':
    if mins==40:
     for item in talk['appendices']:appendix(d,item)
    refs=list(dict.fromkeys(ref for b in slides for ref in b['sources']))
    if refs:reading(d,'References',refs,'\n\n'.join(refs),'SOURCE REFERENCES')
   name=f'{talk["slug"]}-{mins}min-{mode}.pptx';p=out/name
   item=d.write(p);item.update(slug=talk['slug'],minutes=mins,source=talk['source'],source_sha256=talk['sourceHash'],source_slides=[b['n'] for b in slides],sha256=hashlib.sha256(p.read_bytes()).hexdigest());manifest.append(item)
  print(talk['slug'],mins,'exported',flush=True)
 # Retain existing file paths as byte-identical aliases of the current corresponding editions.
 aliases=[]
 for mins in [15,30,40]:
  legacy=out/f'{talk["slug"]}-{mins}min.pptx'
  if legacy.exists():shutil.copy2(out/f'{talk["slug"]}-{mins}min-screen.pptx',legacy);aliases.append(str(legacy))
  legacy=out.parent.parent/'flagship-talks'/f'{talk["slug"]}-{mins}min.pptx'
  if legacy.exists():shutil.copy2(out/f'{talk["slug"]}-{mins}min-screen.pptx',legacy);aliases.append(str(legacy))
 if talk['slug']=='adaptive-systems':
  for mode in ['screen','handout']:shutil.copy2(out/f'adaptive-systems-40min-{mode}.pptx',out/f'adaptive-systems-{mode}.pptx')
(out/'exports.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Exported',len(manifest),'editions')
