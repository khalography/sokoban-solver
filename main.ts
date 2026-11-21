import fs from"node:fs"
let w,D,E=process.env,I=E.MAKEFUN_INPUT_DIR||"/input",O=E.MAKEFUN_OUTPUT_DIR||"/output",C=(a,b)=>a-b
const F=(s,G,B,p)=>{let V={[B+","+p]:1},Q=[{b:B,p,m:""}]
for(let h=0;h<Q.length;h++){let{b,p,m}=Q[h],R={[p]:""},f=[p]
for(let u of f)for(let k=0;k<4;k++){let n=u+D[k];if(s[n]!="#"&&!b.includes(n)&&!(n in R)){R[n]=R[u]+"udlr"[k];f.push(n)}}
for(let j=0;j<b.length;j++)for(let k=0;k<4;k++){let t=b[j]+D[k],u=b[j]-D[k]
if(!(u in R)||s[t]=="#"||b.includes(t))continue
let n=b.slice();n[j]=t;n.sort(C);let K=n+","+b[j]
if(V[K])continue
V[K]=1;let M2=m+R[u]+"UDLR"[k];Q.push({b:n,p:b[j],m:M2})
if(n.every(x=>G.includes(x)))return[M2,b[j]]}}
return null}
for(let id of fs.readdirSync(I)){let t=fs.readFileSync(I+"/"+id+"/level.txt","utf8");w=t.indexOf("\n");let s=t.replace(/\n/g,""),G=[],B=[],p=-1
for(let i=0;i<s.length;i++){if(".*+".includes(s[i]))G.push(i);if("$*".includes(s[i]))B.push(i);if("@+".includes(s[i]))p=i}
D=[-w,w,-1,1];let m="",r=(p/w)|0,K=[]
while(B.length){let q=[B[0]],v={[B[0]]:1},b2=[],g2=[]
for(let x of q){G.includes(x)&&g2.push(x);B.includes(x)&&b2.push(x)
for(let d of D){let n=x+d;if(s[n]!="#"&&(n/w|0)!=r&&!v[n]){v[n]=1;q.push(n)}}}
let a=[...s];for(let b of[...B,...K])if(!b2.includes(b))a[b]="#"
let z=F(a,g2,b2.sort(C),p);if(!z){m="";break}m+=z[0];p=z[1];K.push(...g2);B=B.filter(b=>!b2.includes(b))}
let d=O+"/"+id;fs.mkdirSync(d,{recursive:true});fs.writeFileSync(d+"/solution.txt",m)}
