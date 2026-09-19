const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);
for(const f of fs.readdirSync(root)){if(['assets','demo-data'].includes(f))fs.cpSync(path.join(root,f),path.join(out,f),{recursive:true});else if(/\.(js|css|html)$/.test(f))fs.copyFileSync(path.join(root,f),path.join(out,f))}
console.log('Built isolated demo static assets.');
