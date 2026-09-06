from pathlib import Path
import re,json,zipfile,textwrap,hashlib,math
from xml.sax.saxutils import escape
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[3]
A='http://schemas.openxmlformats.org/drawingml/2006/main';P='http://schemas.openxmlformats.org/presentationml/2006/main';R='http://schemas.openxmlformats.org/officeDocument/2006/relationships';REL='http://schemas.openxmlformats.org/package/2006/relationships';CT='http://schemas.openxmlformats.org/package/2006/content-types'
def esc(s):return escape(str(s),{'"':'&quot;'})
def emu(v):return str(round(v*9525))
def xml(s):return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+s
def rels(rows):return xml('<Relationships xmlns="'+REL+'">'+''.join(f'<Relationship Id="{rid}" Type="{R}/{typ}" Target="{esc(target)}"'+(' TargetMode="External"' if ext else '')+'/>' for rid,typ,target,ext in rows)+'</Relationships>')
def xfrm(x,y,w,h):return f'<a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
def color(c):return f'<a:solidFill><a:srgbClr val="{c.lstrip("#")}"/></a:solidFill>'
TREE='<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>'
def run(t,size=24,c='202b33',bold=False,font='Arial',urlid=None):
 return f'<a:r><a:rPr lang="en-US" sz="{round(size*75)}" b="{int(bold)}">{color(c)}<a:latin typeface="{font}"/><a:ea typeface="{font}"/><a:cs typeface="{font}"/>'+ (f'<a:hlinkClick r:id="{urlid}"/>' if urlid else '')+f'</a:rPr><a:t xml:space="preserve">{esc(t)}</a:t></a:r>'
def para(t,size=24,c='202b33',bold=False,font='Arial',line=None,urlid=None):
 return '<a:p><a:pPr marL="0" indent="0"><a:lnSpc><a:spcPts val="'+str(round((line or size*1.3)*75))+'"/></a:lnSpc><a:spcAft><a:spcPts val="0"/></a:spcAft><a:buNone/></a:pPr>'+run(t,size,c,bold,font,urlid)+f'<a:endParaRPr lang="en-US" sz="{round(size*75)}"/></a:p>'
def wrap(text,w,size,font='Arial'):
 factor=.61 if font=='Courier New' else .53
 length=max(10,int(w/(size*factor)))
 return [line for p in text.split('\n') for line in (textwrap.wrap(p,width=length,break_long_words=False,break_on_hyphens=False) or [''])]
class Slide:
 def __init__(self,deck,notes=''):
  self.deck=deck;self.parts=[];self.media=[];self.urls=[];self.notes=notes;self.id=1;self.boxes=[]
 def text(self,t,x,y,w,h,size=24,c=None,bold=False,font='Arial',line=None,manual=True,url=None):
  self.id+=1;c=c or self.deck.ink;lines=wrap(t,w,size,font) if manual else t.split('\n');lh=line or size*1.3
  assert len(lines)*lh<=h+3,(t[:45],len(lines)*lh,h)
  self.boxes.append((x,y,w,h,t[:70]));urlid=None
  if url:urlid='rIdLink'+str(len(self.urls)+1);self.urls.append((urlid,'hyperlink',url,True))
  body=''.join(para(q,size,c,bold,font,lh,urlid) for q in lines)
  self.parts.append(f'<p:sp><p:nvSpPr><p:cNvPr id="{self.id}" name="Text {self.id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr>{xfrm(x,y,w,h)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"><a:noAutofit/></a:bodyPr><a:lstStyle/>{body}</p:txBody></p:sp>')
 def line(self,x,y,w,c=None):
  self.id+=1;self.parts.append(f'<p:sp><p:nvSpPr><p:cNvPr id="{self.id}" name="Rule {self.id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr>{xfrm(x,y,w,1)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>{color(c or self.deck.accent)}<a:ln><a:noFill/></a:ln></p:spPr></p:sp>')
 def image(self,svg,x,y,w,h,alt):
  self.id+=1;idx=len(self.media)+1;rid=f'rIdImage{idx}';srid=f'rIdSvg{idx}';self.media.append((rid,srid,svg));self.boxes.append((x,y,w,h,'IMAGE'))
  self.parts.append(f'<p:pic><p:nvPicPr><p:cNvPr id="{self.id}" name="{esc(svg.stem)}" descr="{esc(alt)}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="{rid}"><a:extLst><a:ext uri="{{96DAC541-7B7A-43D3-8B79-37D633B846F1}}"><asvg:svgBlip xmlns:asvg="http://schemas.microsoft.com/office/drawing/2016/SVG/main" r:embed="{srid}"/></a:ext></a:extLst></a:blip><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr>{xfrm(x,y,w,h)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln><a:noFill/></a:ln></p:spPr></p:pic>')
 def table(self,rows,x,y,widths,size=17):
  self.id+=1;out=[];heights=[]
  for i,row in enumerate(rows):
   lines=[wrap(t,w-20,size) for t,w in zip(row,widths)];h=max(len(l) for l in lines)*size*1.35+20;heights.append(h)
   cells=[]
   for ls in lines:
    cells.append('<a:tc><a:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0"/><a:lstStyle/>'+''.join(para(t,size,self.deck.accent if i==0 else self.deck.ink,i==0,line=size*1.35) for t in ls)+'</a:txBody><a:tcPr marL="95250" marR="95250" marT="95250" marB="95250"><a:lnB w="6350">'+color('CBD2CF')+'</a:lnB><a:noFill/></a:tcPr></a:tc>')
   out.append(f'<a:tr h="{emu(h)}">'+''.join(cells)+'</a:tr>')
  height=sum(heights);self.boxes.append((x,y,sum(widths),height,'TABLE'))
  self.parts.append(f'<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="{self.id}" name="Editable table"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr><p:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(sum(widths))}" cy="{emu(height)}"/></p:xfrm><a:graphic><a:graphicData uri="{A}/table"><a:tbl><a:tblPr firstRow="1" bandRow="0"/><a:tblGrid>'+''.join(f'<a:gridCol w="{emu(w)}"/>' for w in widths)+'</a:tblGrid>'+''.join(out)+'</a:tbl></a:graphicData></a:graphic></p:graphicFrame>')
  return height
 def footer(self,n):
  self.text(self.deck.short,48,self.deck.height-30,self.deck.width-130,20,13,self.deck.muted)
  self.text(str(n),self.deck.width-70,self.deck.height-30,25,20,13,self.deck.muted)
class Deck:
 def __init__(self,slug,mode,title):
  self.slug=slug;self.mode=mode;self.title=title;self.short='Adaptive, agentic apps' if slug=='adaptive-systems' else 'Parallelization in the agentic era';self.slides=[]
  self.width,self.height=(1440,900) if mode=='screen' else (1056,816)
  self.bg=('122323' if slug=='adaptive-systems' else '161D26') if mode=='screen' else 'FAFAF7';self.ink='F5F1E9' if mode=='screen' else '202B33';self.muted='BEC9C6' if mode=='screen' else '48555B';self.accent=('A4D2C4' if slug=='adaptive-systems' else 'EFB45F') if mode=='screen' else ('246957' if slug=='adaptive-systems' else '925700')
 def add(self,notes=''):
  s=Slide(self,notes);self.slides.append(s);return s
 def write(self,path):
  ns=f'xmlns:a="{A}" xmlns:r="{R}" xmlns:p="{P}"';n=len(self.slides)
  files={}
  def put(k,v):files[k]=v.encode() if isinstance(v,str) else v
  over=[('ppt/presentation.xml','presentationml.presentation.main'),('ppt/slideMasters/slideMaster1.xml','presentationml.slideMaster'),('ppt/slideLayouts/slideLayout1.xml','presentationml.slideLayout'),('ppt/notesMasters/notesMaster1.xml','presentationml.notesMaster'),('ppt/theme/theme1.xml','theme')]
  for i in range(1,n+1):over +=[(f'ppt/slides/slide{i}.xml','presentationml.slide'),(f'ppt/notesSlides/notesSlide{i}.xml','presentationml.notesSlide')]
  put('[Content_Types].xml',xml(f'<Types xmlns="{CT}"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="svg" ContentType="image/svg+xml"/>'+''.join(f'<Override PartName="/{part}" ContentType="application/vnd.openxmlformats-officedocument.{typ}+xml"/>' for part,typ in over)+'<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>'))
  put('_rels/.rels',xml(f'<Relationships xmlns="{REL}"><Relationship Id="rId1" Type="{R}/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="{R}/extended-properties" Target="docProps/app.xml"/></Relationships>'))
  now=datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
  put('docProps/core.xml',xml(f'<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>{esc(self.title)}</dc:title><dc:creator>Dan Levy</dc:creator><dc:description>{self.mode} edition generated from current reviewed talk materials</dc:description><dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created></cp:coreProperties>'))
  put('docProps/app.xml',xml(f'<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Talk package exporter</Application><Slides>{n}</Slides><Notes>{n}</Notes></Properties>'))
  put('ppt/presentation.xml',xml(f'<p:presentation {ns}><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rIdMaster"/></p:sldMasterIdLst><p:notesMasterIdLst><p:notesMasterId r:id="rIdNotesMaster"/></p:notesMasterIdLst><p:sldIdLst>'+''.join(f'<p:sldId id="{255+i}" r:id="rIdSlide{i}"/>' for i in range(1,n+1))+f'</p:sldIdLst><p:sldSz cx="{emu(self.width)}" cy="{emu(self.height)}" type="custom"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle/></p:presentation>'))
  put('ppt/_rels/presentation.xml.rels',rels([('rIdMaster','slideMaster','slideMasters/slideMaster1.xml',False),('rIdNotesMaster','notesMaster','notesMasters/notesMaster1.xml',False)]+[(f'rIdSlide{i}','slide',f'slides/slide{i}.xml',False) for i in range(1,n+1)]))
  cmap='<p:clrMap accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" bg1="lt1" bg2="lt2" folHlink="folHlink" hlink="hlink" tx1="dk1" tx2="dk2"/>'
  put('ppt/slideMasters/slideMaster1.xml',xml(f'<p:sldMaster {ns}><p:cSld><p:spTree>{TREE}</p:spTree></p:cSld>{cmap}<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rIdLayout"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>'))
  put('ppt/slideMasters/_rels/slideMaster1.xml.rels',rels([('rIdLayout','slideLayout','../slideLayouts/slideLayout1.xml',False),('rIdTheme','theme','../theme/theme1.xml',False)]))
  put('ppt/slideLayouts/slideLayout1.xml',xml(f'<p:sldLayout {ns} type="blank" preserve="1"><p:cSld name="Blank"><p:spTree>{TREE}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>'))
  put('ppt/slideLayouts/_rels/slideLayout1.xml.rels',rels([('rIdMaster','slideMaster','../slideMasters/slideMaster1.xml',False)]))
  put('ppt/notesMasters/notesMaster1.xml',xml(f'<p:notesMaster {ns}><p:cSld><p:spTree>{TREE}</p:spTree></p:cSld>{cmap}<p:notesStyle/></p:notesMaster>'))
  put('ppt/notesMasters/_rels/notesMaster1.xml.rels',rels([('rIdTheme','theme','../theme/theme1.xml',False)]))
  colors={'dk1':'202B33','lt1':'FFFFFF','dk2':'48555B','lt2':'FAFAF7','accent1':self.accent,'accent2':'728482','accent3':'53616F','accent4':'9D7462','accent5':'7D86A0','accent6':'9E996B','hlink':'246957','folHlink':'925700'}
  put('ppt/theme/theme1.xml',xml(f'<a:theme xmlns:a="{A}" name="Dan Levy talks"><a:themeElements><a:clrScheme name="Talk palette">'+''.join(f'<a:{k}><a:srgbClr val="{v}"/></a:{k}>' for k,v in colors.items())+'</a:clrScheme><a:fontScheme name="Arial"><a:majorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Plain"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst>'+''.join('<a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>' for _ in range(3))+'</a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst>'+''.join('<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' for _ in range(3))+'</a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>'))
  for i,s in enumerate(self.slides,1):
   s.footer(i)
   for x,y,w,h,label in s.boxes:assert x>=0 and y>=0 and x+w<=self.width+1 and y+h<=self.height+1,(i,label,'out of bounds')
   put(f'ppt/slides/slide{i}.xml',xml(f'<p:sld {ns}><p:cSld name="Slide {i}"><p:bg><p:bgPr>{color(self.bg)}<a:effectLst/></p:bgPr></p:bg><p:spTree>{TREE}'+''.join(s.parts)+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'))
   rs=[('rIdLayout','slideLayout','../slideLayouts/slideLayout1.xml',False),('rIdNotes','notesSlide',f'../notesSlides/notesSlide{i}.xml',False)]+s.urls
   for j,(rid,srid,svg) in enumerate(s.media,1):
    name=f'slide{i}-{j}';put('ppt/media/'+name+'.svg',svg.read_bytes());put('ppt/media/'+name+'.png',svg.with_suffix('.png').read_bytes());rs +=[(rid,'image','../media/'+name+'.png',False),(srid,'image','../media/'+name+'.svg',False)]
   put(f'ppt/slides/_rels/slide{i}.xml.rels',rels(rs))
   note='<p:sp><p:nvSpPr><p:cNvPr id="2" name="Presenter notes"/><p:cNvSpPr txBox="1"/><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr>'+xfrm(48,150,600,700)+'</p:spPr><p:txBody><a:bodyPr/><a:lstStyle/>'+''.join(para(t,16) for t in s.notes.split('\n'))+'</p:txBody></p:sp>'
   put(f'ppt/notesSlides/notesSlide{i}.xml',xml(f'<p:notes {ns}><p:cSld><p:spTree>{TREE}{note}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:notes>'))
   put(f'ppt/notesSlides/_rels/notesSlide{i}.xml.rels',rels([('rIdSlide','slide',f'../slides/slide{i}.xml',False),('rIdMaster','notesMaster','../notesMasters/notesMaster1.xml',False)]))
  with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
   for key,value in files.items():z.writestr(key,value)
  return {'file':path.name,'slides':n,'mode':self.mode,'size':[self.width,self.height]}
