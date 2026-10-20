// Stylized stroke coordinates; rune names are conventional reconstructions.
const axis=[[100,20,100,180]];
const rows=[
['F','ᚠ','Fehu','Мал, эд хөрөнгө',[[100,20,150,50],[100,65,150,95]]],
['U','ᚢ','Uruz','Зэрлэг үхэр',[[100,20,150,55],[150,55,150,180]]],
['TH','ᚦ','Thurisaz','Аварга',[[100,50,150,90],[150,90,100,125]]],
['A','ᚨ','Ansuz','Бурхан',[[100,20,150,55],[100,70,150,105]]],
['R','ᚱ','Raidho','Уналга, аялал',[[100,20,150,55],[150,55,100,95],[100,95,150,180]]],
['K','ᚲ','Kenaz','Бамбар / шарх (нэрийн тайлал маргаантай)',[[150,30,100,100],[100,100,150,170]]],
['G','ᚷ','Gebo','Бэлэг',[[60,30,140,170],[140,30,60,170]]],
['W','ᚹ','Wunjo','Баяр баясал',[[100,20,150,55],[150,55,100,95]]],
['H','ᚺ','Hagalaz','Мөндөр',[[60,20,60,180],[140,20,140,180],[60,50,140,150]]],
['N','ᚾ','Nauthiz','Хэрэгцээ, гачигдал',[[65,60,135,130]]],
['I','ᛁ','Isa','Мөс',[]],
['J','ᛃ','Jera','Жил, ургац',[[85,40,55,75],[55,75,85,110],[115,90,145,125],[145,125,115,160]]],
['EI','ᛇ','Eihwaz','Тис мод',[[100,20,140,50],[100,180,60,150]]],
['P','ᛈ','Perthro','Тодорхой бус',[[100,20,145,55],[145,55,120,80],[100,180,145,145],[145,145,120,120]]],
['Z','ᛉ','Algiz','Нэр, утга тодорхой бус',[[100,70,55,20],[100,70,145,20]]],
['S','ᛊ','Sowilo','Нар',[[140,20,65,80],[65,80,135,120],[135,120,60,180]]],
['T','ᛏ','Tiwaz','Týr бурхан',[[100,20,55,65],[100,20,145,65]]],
['B','ᛒ','Berkana','Хус',[[100,20,145,60],[145,60,100,100],[100,100,145,140],[145,140,100,180]]],
['E','ᛖ','Ehwaz','Морь',[[55,180,55,20],[55,20,100,85],[100,85,145,20],[145,20,145,180]]],
['M','ᛗ','Mannaz','Хүн',[[55,180,55,20],[145,180,145,20],[55,20,145,100],[145,20,55,100]]],
['L','ᛚ','Laguz','Ус, нуур',[[100,20,150,65]]],
['NG','ᛜ','Ingwaz','Ing бурхан',[[100,45,140,100],[140,100,100,155],[100,155,60,100],[60,100,100,45]]],
['D','ᛞ','Dagaz','Өдөр',[[55,20,55,180],[145,20,145,180],[55,20,145,180],[145,20,55,180]]],
['O','ᛟ','Othala','Өвлөгдсөн өмч',[[100,20,145,75],[145,75,100,130],[100,130,55,75],[55,75,100,20],[100,130,55,180],[100,130,145,180]]]
];
export const RUNES=Object.fromEntries(rows.map(([key,glyph,name,meaning,strokes])=>[key,{key,glyph,name,meaning,strokes}]));
const mn={А:'A',Б:'B',В:'V',Г:'G',Д:'D',Е:'YE',Ё:'YO',Ж:'J',З:'Z',И:'I',Й:'I',К:'K',Л:'L',М:'M',Н:'N',О:'O',Ө:'O',П:'P',Р:'R',С:'S',Т:'T',У:'U',Ү:'U',Ф:'F',Х:'KH',Ц:'TS',Ч:'CH',Ш:'SH',Щ:'SHCH',Ъ:'',Ы:'Y',Ь:'',Э:'E',Ю:'YU',Я:'YA'};
export function latinize(value){return [...value.toUpperCase()].map(c=>mn[c]??c).join('');}
const oghamKeys=['B','L','V','S','N','H','D','T','C','Q','M','G','NG','Z','R','A','O','U','E','I'];
export const OGHAM=Object.fromEntries(oghamKeys.map((key,i)=>[key,{key,glyph:String.fromCodePoint(0x1681+i),name:['Beith','Luis','Fearn','Sail','Nion','Uath','Dair','Tinne','Coll','Ceirt','Muin','Gort','Géadal','Straif','Ruis','Ailm','Onn','Úr','Eadhadh','Iodhadh'][i],meaning:'Ogham үсгийн уламжлалт нэр',group:Math.floor(i/5),count:i%5+1}]));
export function parse(input,mode='bind'){
 const text=input.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
 const table=mode==='ogham'?OGHAM:RUNES; const tokens=[],warnings=[];
 for(let i=0;i<text.length;i++){
 let key=text[i]; if(/[\s'-]/.test(key))continue;
 const pair=text.slice(i,i+2); if(table[pair]){key=pair;i++;}
 const alias=mode==='ogham'?{F:'V',K:'C',W:'V',J:'I',Y:'I',X:'CS'}:{C:'K',Q:'K',V:'W',Y:'I',X:'KS'};
 const mapped=alias[key]??key;
 if(mapped!==key)warnings.push(`${key} → ${mapped}: орчин үеийн ойролцоо хөрвүүлэлт`);
 if(![...mapped].every(c=>table[c])&&!table[mapped]){warnings.push(`“${key}” дэмжигдээгүй; латин галигийг засна уу.`);continue;}
 for(const k of table[mapped]?[mapped]:[...mapped]) tokens.push({...table[k],source:key});
 }
 if(tokens.length>32)warnings.push('32 хүртэл тэмдэгт зөвшөөрнө.');
 return {tokens:tokens.slice(0,32),warnings:[...new Set(warnings)]};
}
export function geometry(tokens,mode='bind'){
 if(!tokens.length)return {width:200,height:200,lines:[]};
 if(mode==='ogham'){
 const height=Math.max(240,tokens.length*76+60),lines=[[100,20,100,height-20]];
 tokens.forEach((t,i)=>{const y=height-45-i*76;for(let j=0;j<t.count;j++){const yy=y-j*10;lines.push(t.group===0?[100,yy,145,yy]:t.group===1?[55,yy,100,yy]:t.group===2?[55,yy+12,145,yy-12]:[90,yy,110,yy]);}});
 return {width:200,height,lines};
 }
 if(mode==='sequence')return {width:tokens.length*130+40,height:220,lines:tokens.flatMap((t,i)=>[...axis,...t.strokes].map(s=>s.map((v,j)=>j%2===0?(v-50)*.8+i*130+20:v+10)))};
 // Slot each occurrence along the shared stem. Repetitions remain visible.
 const height=Math.max(240,tokens.length*110+40),lines=[[100,20,100,height-20]];
 tokens.forEach((t,i)=>t.strokes.forEach(s=>lines.push(s.map((v,j)=>j%2===0?v:25+i*110+(v-20)*.6))));
 const seen=new Set();return {width:200,height,lines:lines.filter(s=>{const a=s.slice(0,2).join(','),b=s.slice(2).join(',');const k=[a,b].sort().join(':');if(seen.has(k))return false;seen.add(k);return true;})};
}
export function svgMarkup(tokens,mode='bind',color='#d4af37',stroke=3,background=false){
 const {width,height,lines}=geometry(tokens,mode);
 if(!/^#[0-9a-f]{6}$/i.test(color))color='#d4af37';
 stroke=Math.min(8,Math.max(1,Number(stroke)||3));
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${mode==='ogham'?'Ogham':'Runic'} composition"><title>RAINY ${mode} composition</title>${background?`<rect width="100%" height="100%" fill="#0d0d11"/>`:''}<g fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${lines.map(([x1,y1,x2,y2])=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join('')}</g></svg>`;
}
