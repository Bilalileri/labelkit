const CONTACT="info@unitedeurope.group";
// Stripe Payment Links are public URLs (https://buy.stripe.com/...) – no secret keys here.
const STRIPE={agency:"[STRIPE_LINK_AGENCY]",audit:"[STRIPE_LINK_AUDIT]"};
const T={en:{full:"AI-generated content",mod:"AI-modified content"},de:{full:"KI-generierter Inhalt",mod:"Mit KI bearbeiteter Inhalt"},tr:{full:"Yapay zekâ ile üretilmiş içerik",mod:"Yapay zekâ ile düzenlenmiş içerik"}};
const $=s=>document.querySelector(s);let last="";
const NOTE=" (Not legal advice – check with counsel.)";
function verdict(f){const g=n=>f.elements[n].checked,t=f.elements.type.value;
 if(!g("ai"))return"No Art. 50(4) label needed (no AI generation/manipulation)."+NOTE;
 if(g("law"))return"Likely exempt: Art. 50(4) does not apply where use is authorised by law to detect, prevent, investigate or prosecute criminal offences."+NOTE;
 const P=" Note: machine-readable marking under Art. 50(2) is mainly a duty of the AI provider (tool vendor), not of you as deployer.";
 if(t==="text"){if(!g("public"))return"Label likely not required (text not on matters of public interest). Voluntary labelling is good practice."+P+NOTE;
  if(g("review"))return"Editorial-review exception may apply – document the review workflow and who holds editorial responsibility."+P+NOTE;
  return"Label likely required: disclose that the text is AI-generated/manipulated, clearly, at first exposure."+P+NOTE;}
 if(!g("real"))return"Probably not a deepfake → Art. 50(4) label likely not required; voluntary label recommended."+P+NOTE;
 if(g("art"))return"Label likely required (light form): for evident artistic/satirical work, disclose AI use without hampering enjoyment."+P+NOTE;
 return(t==="audio"?"Label likely required: deepfake audio – use an audible disclaimer.":"Label likely required: deepfake – visible label, perceivable at first exposure, embedded where possible.")+P+NOTE;}
$("#q").onsubmit=e=>{e.preventDefault();last=verdict(e.target);$("#verdict").textContent=last};
function upd(){const s=T[$("#lang").value][$("#kind").value];$("#ltext").textContent=s;
 $("#snip").value=`<span class="ai-label" style="font:600 12px sans-serif;background:#111;color:#fff;padding:2px 6px;border-radius:4px">⚙ ${s}</span>`;return s}
$("#lang").onchange=$("#kind").onchange=upd;upd();
$("#copy").onclick=()=>navigator.clipboard.writeText(upd());
$("#img").onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=$("#cv"),x=c.getContext("2d");c.width=im.width;c.height=im.height;x.drawImage(im,0,0);
 const s="⚙ "+upd(),fs=Math.max(14,im.width/40);x.font=`600 ${fs}px sans-serif`;const w=x.measureText(s).width+fs;x.fillStyle="rgba(0,0,0,.75)";x.fillRect(fs/2,im.height-fs*2.2,w,fs*1.7);x.fillStyle="#fff";x.fillText(s,fs,im.height-fs*0.95);
 c.hidden=false;c.style.maxWidth="100%";$("#dl").href=c.toDataURL("image/png");$("#dl").hidden=false};im.src=URL.createObjectURL(f)};
let log=JSON.parse(localStorage.getItem("lk")||"[]");
function draw(){$("#log tbody").innerHTML="";log.forEach(r=>{const tr=document.createElement("tr");r.forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.appendChild(td)});$("#log tbody").appendChild(tr)});localStorage.setItem("lk",JSON.stringify(log))}
$("#logf").onsubmit=e=>{e.preventDefault();const f=e.target.elements;log.push([new Date().toISOString().slice(0,10),f.namedItem("asset").value,f.namedItem("client").value,last||"not checked",upd(),f.namedItem("reviewer").value]);e.target.reset();draw()};
$("#csv").onclick=()=>{const h=["Date","Asset","Client","Verdict","Label","Reviewer"],c=[h,...log].map(r=>r.map(v=>{let x=String(v??"");if(/^[=+\-@\t\r]/.test(x))x="'"+x;return'"'+x.replace(/"/g,'""')+'"'}).join(",")).join("\r\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\uFEFF"+c],{type:"text/csv"}));a.download="disclosure-log.csv";a.click()};
$("#clr").onclick=()=>{if(confirm("Clear log?")){log=[];draw()}};draw();
$("#mail").href=`mailto:${CONTACT}?subject=${encodeURIComponent("LabelKit early access")}&body=${encodeURIComponent("Agency name:\nTeam size:\nMonthly AI assets:\n")}`;

document.querySelectorAll(".pay").forEach(a=>{const u=STRIPE[a.dataset.plan];if(u.startsWith("https://buy.stripe.com/"))a.href=u;else{a.removeAttribute("href");a.textContent="Payment link coming soon";}});
