import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
const C='udlr'
const S=t=>{let r=t.split('\n'),W=r[0].length,s=r.join(''),b=[],p=0,O=[-W,W,-1,1]
for(let i in s){let c=s[i];if(c=='$'||c=='*')b.push(+i);else if(c=='@'||c=='+')p=+i}
let g=c=>s[c]=='.'||s[c]=='*',F=(a,B,A)=>{let m=new Map([[a,'']]),q=[a];for(let i=0;i<q.length;i++){let c=q[i];for(let j in O){let n=c+O[j];if(!m.has(n)&&s[n]!='#'&&!B.includes(n)&&(!A||(A.has?A.has(n):(n/W|0)!=A)))m.set(n,m.get(c)+C[j]),q.push(n)}}return m},R=(A,K,bb,st,e)=>{let q=[[st,bb,'']],v=new Set([st+'|'+bb.join(',')]),h=0
while(h<q.length){let[p,b,m]=q[h++],f=F(p,b,A)
if(b.every(g)&&f.has(e))return m+f.get(e)
for(let bi=0;bi<b.length;bi++)for(let j in O){let o=O[j],nb=b[bi]+o
if(!K.has(nb)||b.includes(nb))continue
if(!g(nb)&&(s[nb-W]=='#'||s[nb+W]=='#')&&(s[nb-1]=='#'||s[nb+1]=='#'))continue
let be=b[bi]-o
if(!f.has(be))continue
let n2=b.slice();n2[bi]=nb;n2.sort((x,y)=>x-y);let k=b[bi]+'|'+n2.join(',')
if(v.has(k))continue
v.add(k),q.push([b[bi],n2,m+f.get(be)+C[j]])}}
return null},prow=p/W|0,done=new Set(),cur=p,out=''
for(let bi=0;bi<b.length;bi++){if(done.has(b[bi]))continue
let comp=new Set(F(b[bi],[],prow).keys()),rb=b.filter(x=>comp.has(x));rb.forEach(x=>done.add(x))
if(rb.length!=[...comp].filter(g).length)return''
let e=-1;for(let x=0;x<W&&e<0;x++){let m=prow*W+x;if(s[m]!='#'&&(comp.has(m-W)||comp.has(m+W)))e=m}
if(e<0)return''
let A=new Set(comp);for(let x=0;x<W;x++){let m=prow*W+x;if(s[m]!='#')A.add(m)}
let m=R(A,comp,rb,cur,e)
if(m==null)return''
out+=m;cur=e}
return out}
for(let d of readdirSync(I).sort())mkdirSync(O+'/'+d,{recursive:!0}),writeFileSync(O+'/'+d+'/solution.txt',S(readFileSync(I+'/'+d+'/level.txt','utf8'))+'\n')
