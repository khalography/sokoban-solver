import fs from"node:fs"
const L="udlr",U="UDLR",C=(a,b)=>a-b,
I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
let Dl;
const P=t=>{let r=t.trim().split("\n"),w=r[0].length,
W=new Uint8Array(w*r.length),G=[],b=[],p=-1;
Dl=[-w,w,-1,1];
r.forEach((s,y)=>{for(let x=0;x<s.length;x++){let i=y*w+x,c=s[x];
if(c=="#"){W[i]=1;continue}
if(".*+".includes(c))G.push(i);if("$*".includes(c))b.push(i);if("@+".includes(c))p=i}});
return{w,W,G,B:b.sort(C),p}};
const S=l=>{let{W,G,B,p}=l,N=W.length,g=new Uint8Array(N),v=new Uint8Array(N),
a=new Int32Array(N),fq=[...G];
for(let x of G)g[x]=v[x]=1;
for(let i=0;i<fq.length;i++)for(let d of Dl){let y=fq[i]-d;
if(!W[y]&&!W[y-d]&&!v[y]){v[y]=1;fq.push(y)}}
let q=[B],P=[p],M=[""],s=new Set([B.join()+","+p]);
for(let h=0;h<q.length;h++){let B=q[h];
a.fill(-1);fq=[P[h]];a[P[h]]=P[h];
for(let i=0;i<fq.length;i++){let u=fq[i];
for(let d of Dl){let n=u+d;if(!W[n]&&!B.includes(n)&&a[n]<0){a[n]=u;fq.push(n)}}}
for(let j=0;j<B.length;j++){let Q=B[j];
for(let k=0;k<4;k++){let d=Dl[k],t=Q+d;
if(a[Q-d]<0||W[t]||B.includes(t)||!v[t])continue;
let n=B.slice();n[j]=t;n.sort(C);
let K=n.join()+","+Q;
if(s.has(K))continue;
if(q.length>=250000)return null;
let eg="";
for(let c=Q-d;c!=P[h];c=a[c])eg=L[Dl.indexOf(c-a[c])]+eg;
let m=M[h]+eg+U[k];
s.add(K);q.push(n);P.push(Q);M.push(m);
if(n.every(x=>g[x]))return{moves:m,player:Q}}}}
return null};
const R=l=>{let{w,W,G,B,p}=l,row=(p/w)|0;
let M=[],seen=new Uint8Array(W.length);
for(let b of B){if(seen[b])continue;
let q=[b];seen[b]=1;let r={B:[],G:[]};
for(let i=0;i<q.length;i++){let s=q[i];
if(G.includes(s))r.G.push(s);if(B.includes(s))r.B.push(s);
for(let d of Dl){let n=s+d;
if(!W[n]&&((n/w)|0)!=row&&!seen[n]){seen[n]=1;q.push(n)}}}
if(r.B.length!=r.G.length)return null;
M.push(r)}
return M};
const Y=l=>{let r=R(l);if(!r)return"";
let p=l.p,m="";
for(let rm of r){let W=l.W.slice();
for(let o of r)if(o!==rm)for(let b of o.done?o.G:o.B)W[b]=1;
let s=S({W,G:rm.G,B:rm.B.sort(C),p});
if(!s)return"";m+=s.moves;p=s.player;rm.done=1}
return m};
for(let id of fs.readdirSync(I)){let m=Y(P(fs.readFileSync(I+"/"+id+"/level.txt","utf8")));
fs.mkdirSync(O+"/"+id,{recursive:true});fs.writeFileSync(O+"/"+id+"/solution.txt",m)}
