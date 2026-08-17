import{f as bi,u as wi,s as ki,n as Ti,l as Si,P as U,F as ye,S as ee,M as Gt,C as Yt,R as Vt,a as qt,b as Ii,i as G,c as Y,d as c,A as Ht,w as Z,O as Ai}from"./assets/vendor-7vM_bUxM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ni={attribute:!0,type:String,converter:wi,reflect:!1,hasChanged:bi},Mi=(e=Ni,t,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),s==="accessor"){const{name:n}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,e,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,e,a),a}}}if(s==="setter"){const{name:n}=i;return function(a){const l=this[n];t.call(this,a),this.requestUpdate(n,l,e,!0,a)}}throw Error("Unsupported decorator location: "+s)};function k(e){return(t,i)=>typeof i=="object"?Mi(e,t,i):((s,o,r)=>{const n=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(o,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(e){return k({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ci=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xt(e,t){return(i,s,o)=>{const r=n=>n.renderRoot?.querySelector(e)??null;return Ci(i,s,{get(){return r(this)}})}}const le="chroma_chords_projects",$i="chord_voyager_projects";class J{static getProjects(){try{let t=localStorage.getItem(le);if(t||(t=localStorage.getItem($i),t&&localStorage.setItem(le,t)),t){const i=JSON.parse(t);let s=!1;return i.forEach(o=>{(o.genre==="Unknown"||!o.genre)&&(o.genre="Pop",s=!0)}),s&&localStorage.setItem(le,JSON.stringify(i)),i}}catch(t){console.error("Failed to load projects from localStorage:",t)}return[]}static setProjects(t){try{localStorage.setItem(le,JSON.stringify(t))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(t,i){const s=new Map;return t.forEach(o=>s.set(o.id,o)),i.forEach(o=>{const r=s.get(o.id);!r||o.lastModified>r.lastModified?s.set(o.id,o):o.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(t){const i=this.getProjects(),s=i.findIndex(o=>o.id===t.id);t.lastModified=Date.now(),s>=0?i[s]=t:i.push(t);try{localStorage.setItem(le,JSON.stringify(i))}catch(o){console.error("Failed to save project to localStorage:",o)}}static deleteProject(t){let i=this.getProjects();i=i.filter(s=>s.id!==t);try{localStorage.setItem(le,JSON.stringify(i))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(t){const i=JSON.stringify(t,null,2),s=new Blob([i],{type:"application/json"}),o=URL.createObjectURL(s),r=document.createElement("a");r.href=o,r.download=`${t.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}static importProjectFile(t){return new Promise((i,s)=>{const o=new FileReader;o.onload=r=>{try{const n=r.target?.result,a=JSON.parse(n);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),i(a)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},o.onerror=()=>s(new Error("Failed to read file")),o.readAsText(t)})}}class Ei{constructor(){this.accessToken=null,this.FILENAME="chroma_chords_projects.json",this.OLD_FILENAME="chord_voyager_projects.json"}setAccessToken(t){this.accessToken=t}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const t=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${t}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const s=await i.json();if(s.files&&s.files.length>0)return s.files[0].id;const o=encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`),r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${o}&fields=files(id)`,{method:"GET",headers:this.headers});if(r.ok){const n=await r.json();if(n.files&&n.files.length>0)return n.files[0].id}return null}catch(t){throw console.error("Failed to find project file in Google Drive:",t),t}}async loadProjects(){try{const t=await this.findProjectFileId();if(!t)return null;const i=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!i.ok)throw new Error(`Failed to download file: ${i.statusText}`);return await i.json()}catch(t){throw console.error("Failed to load projects from Google Drive:",t),t}}async saveProjects(t){try{const i=await this.findProjectFileId(),s=JSON.stringify(t);if(i){const o=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!o.ok)throw new Error(`Failed to update file: ${o.statusText}`)}else{const o=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!o.ok)throw new Error(`Failed to create file metadata: ${o.statusText}`);const n=(await o.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${n}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(i){throw console.error("Failed to save projects to Google Drive:",i),i}}async findAudioFileId(t){try{const i=`recording_${t}.webm`,s=encodeURIComponent(`name='${i}' and trashed=false`),o=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!o.ok)throw o.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${o.statusText}`);const r=await o.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(i){throw console.error(`Failed to find audio file for project ${t}:`,i),i}}async uploadAudioFile(t,i){try{const s=`recording_${t}.webm`,o=await this.findAudioFileId(t);if(o){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":i.type||"audio/webm"},body:i});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return o}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const a=(await r.json()).id,l=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":i.type||"audio/webm"},body:i});if(!l.ok)throw new Error(`Failed to upload new audio file content: ${l.statusText}`);return a}}catch(s){throw console.error(`Failed to upload audio file for project ${t}:`,s),s}}async downloadAudioFile(t){try{const i=await this.findAudioFileId(t);if(!i)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${i}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(i){throw console.error(`Failed to download audio file for project ${t}:`,i),i}}async deleteAudioFile(t){try{const i=await this.findAudioFileId(t);if(!i)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${i}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(i){throw console.error(`Failed to delete audio file for project ${t}:`,i),i}}}const Oi=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Di=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],W={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Pi=new Set(["F","Bb","Eb","Ab","Db","Gb"]),de=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Ue={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},Bi=Object.keys(Ue),Ri={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},At={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},_i={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},rt={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},Li=Object.keys(rt),Nt={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},xe=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],ji={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},Ui={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Jt={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},ie=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function be(e){return(ie.find(t=>t.name===e)||ie[0]).dot}const Fi={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function zi(e,t){return 1+e.degrees.filter(i=>t.includes(i)).length*.6}function Re(e,t){const i=e.reduce((o,r)=>o+t(r),0);let s=Math.random()*i;for(const o of e)if(s-=t(o),s<=0)return o;return e[e.length-1]}function Gi(e){if(e.length)return e[Math.floor(Math.random()*e.length)]}const nt=4,ne=1,z=8,mt=1700,Yi={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function $e(e,t,i="MAJOR",s="Pop",o="Uplifting"){if(e===t)return .05;let n=(Yi[e]||{})[t]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(e==="TONIC"&&t==="SUBMEDIANT"&&(n*=1.5),e==="SUBMEDIANT"&&t==="MEDIANT"&&(n*=1.4),e==="MEDIANT"&&t==="SUBTONIC"&&(n*=1.4),e==="SUBTONIC"&&t==="TONIC"&&(n*=1.3)),s==="Jazz-ish"||s==="Lo-fi/Chill"?(e==="SUPERTONIC"&&t==="DOMINANT"&&(n*=1.8),e==="DOMINANT"&&t==="TONIC"&&(n*=1.5),e==="TONIC"&&t==="SUPERTONIC"&&(n*=1.4)):(s==="House/Dance"||s==="Synthwave")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.5),(Jt[o]||[]).includes(t)&&(n*=1.5),Math.max(.01,n)}function Vi(e,t,i,s,o,r,n=nt){let a="TONIC";(e.type.includes("MINOR")||e.type==="DORIAN")&&(r==="Melancholy"||r==="Nostalgic")&&Math.random()<.4&&(a=i.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const l=[a];let d=a;for(let g=1;g<n;g++){const m=g===n-1;let y=i.filter(p=>e.degrees[p]);y.length||(y=i);const v=y.filter(p=>p!==d),x=v.length?v:y;if(m){const p=Re(x,h=>{const b=$e(h,l[0],e.type,o,r),T=$e(d,h,e.type,o,r);return b*T});l.push(p)}else{const p=x.filter(T=>!l.includes(T)),h=p.length?p:x,b=Re(h,T=>$e(d,T,e.type,o,r));d=b,l.push(b)}}return l}function we(e,t){const i=(e%12+12)%12;return t?Di[i]:Oi[i]}function ft(e){const t=e[0]?.toUpperCase();let i="C",s=e;t&&/[A-G]/.test(t)&&(e[1]==="B"?(i=`${t}b`,s=e.slice(2)):e[1]==="#"?(i=`${t}#`,s=e.slice(2)):(i=t,s=e.slice(1))),s=s.toLowerCase();let o="maj";return s.includes("maj7")?o="maj7":s.includes("min7")||s.includes("m7")?o="min7":s.includes("dim7")?o="dim7":s.includes("dim")?o="dim":s.includes("aug")?o="aug":s.includes("sus")?o="sus4":s==="7"?o="dom7":s.includes("min")||s==="m"?o="min":o="maj",{root:i,quality:o}}function Ee(e,t){const{root:i,quality:s}=ft(e),o=W[i]??0;return Ue[s].map(n=>we(o+n,t))}async function qi(){const e=typeof import.meta<"u"?"./":"/",t=e.endsWith("/")?e:`${e}/`,i=`${t}chroma_chords_data.json`,s=`${t}chord_voyager_data.json`;let o=await fetch(i).catch(()=>null);if((!o||!o.ok)&&(o=await fetch(s).catch(()=>null)),(!o||!o.ok)&&(o=await fetch("/chroma_chords_data.json").catch(()=>null)),(!o||!o.ok)&&(o=await fetch("/chord_voyager_data.json").catch(()=>null)),!o||!o.ok){const n=new URL("./chroma_chords_data.json",import.meta.url).href;o=await fetch(n)}if(!o.ok)throw new Error(`HTTP error: ${o.status}`);const r=await o.json();return Zi(r),r}const Hi={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Xi={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Ji={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Wi={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Ki={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Qi={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Zi(e){const t=[["MIXOLYDIAN",Hi],["DORIAN",Xi],["LYDIAN",Ji]];for(const[i,s]of t)for(const[o,r]of Object.entries(s)){const n=e.scales[`${r}_MAJOR`];if(!n)continue;const a=`${o}_${i}`,l={};for(const d of Qi[i]){const g=Ki[`${i}_${d}`],m=n.degrees[g];if(!m)continue;const y=JSON.parse(JSON.stringify(m));y.next_chord_options=(y.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${r}_MAJOR_`)){const x=v.nodeId.replace(`${r}_MAJOR_`,""),p=Wi[`${i}_${x}`];if(p)return{name:v.name,nodeId:`${o}_${i}_${p}`}}return v}),l[d]=y}e.scales[a]={root:o,type:i,degrees:l}}}const eo=[156,192,236],to=[242,115,95];function Oe(e,t,i){return e+(t-e)*i}function vt(e){const t=Math.max(0,Math.min(1,e));return"#"+eo.map((s,o)=>Math.round(Oe(s,to[o],t))).map(s=>s.toString(16).padStart(2,"0")).join("")}function ke(e){const t=Math.max(0,Math.min(1,e));return{size:Math.round(Oe(84,128,t)),radius:Math.round(Oe(40,12,t)),fontSize:Math.round(Oe(21,30,t)),color:vt(t)}}function io(e,t,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[e]||`${i} colors the progression as the ${e.toLowerCase()} of ${t}.`}function ce(e,t,i,s){const r=i.degrees[t].chord_name,n=_i[t]??.5,a=rt[i.type]||rt.MAJOR;return{name:Mt(r),tag:Ri[t]||"move",roman:a[t]||"?",color:vt(n),functionLabel:At[t]||t,notes:Ee(r,s),scaleLabel:`${i.root} ${Nt[i.type]||i.type}`,desc:io(At[t]||t,Nt[i.type]||i.type,Mt(r)),degree:t,scaleKey:e,tension:n}}function Mt(e){const{root:t,quality:i}=ft(e);return`${t}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const oo={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Wt(e,t){let i=oo[e]||92;return t==="Tense"&&(i+=6),(t==="Dreamy"||t==="Melancholy")&&(i-=6),i}function Kt(e,t,i,s){const o=Math.max(ne,Math.min(z,s?.length??nt)),r=ji[t]||"MAJOR",n=Ui[i],a=s?.scaleType||(n&&r==="MAJOR"?n:r);let l=s?.key&&de.includes(s.key)?s.key:Gi(de),d=`${l}_${a}`;e.scales[d]||(l="C",d=`${l}_${a}`);const g=e.scales[d],m=te(l,a),y=Object.keys(g.degrees),v=Jt[i]||[],x=Fi[a]||[],p=o===nt?x.filter(w=>w.degrees.every(E=>y.includes(E))):[],T=(p.length&&Math.random()<.25?Re(p,w=>zi(w,v)).degrees:Vi(g,d,y,v,t,i,o)).map(w=>ce(d,w,g,m));return{genre:t,mood:i,key:l,scaleType:a,bpm:Wt(t,i),chords:T}}function so(e,t,i,s,o,r){const n=`${t}_${i}`,a=e.scales[n];if(!a||!s.length)return null;const l=te(t,i),d=W[t]??0,g={};Object.entries(a.degrees).forEach(([y,v])=>{const{root:x}=ft(v.chord_name),p=W[x]??0;p in g||(g[p]=y)});const m=s.slice(0,z).map(({root:y,quality:v})=>{const x=W[y]??d,p=g[x];if(p)return ce(n,p,a,l);const h=(x-d+12)%12,b=Ue[v]?v:"maj";return at(t,h,b,"Borrowed","?","drift",l)});return m.length<ne?null:{genre:o,mood:r,key:t,scaleType:i,bpm:Wt(o,r),chords:m}}function Fe(e,t,i,s,o,r,n){const a=e.filter(g=>t.includes(g)),l=a.filter(g=>g!==i),d=l.length?l:a;if(d.length)return Re(d,g=>$e(s,g,o,r,n))}const ro={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function at(e,t,i,s,o,r,n){const a=(W[e]??0)+t,d=`${we(a,n)}${ro[i]}`,g=Ue[i].map(y=>we(a+y,n)),m=.3;return{name:d,tag:r,roman:o,color:vt(m),functionLabel:s,notes:g,scaleLabel:"Borrowed",desc:`${d} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:m}}function lt(e){const t=e.match(/^[A-Ga-g][#b]?/),i=t?t[0]:"C";return i[0].toUpperCase()+i.slice(1)}const Ct={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function ct(e,t,i,s){const o=W[e]??0;let r=Ct[t]||Ct.Major;return i==="6th"?r=[...r,9]:i==="7th (dom / m7)"?r=[...r,10]:i==="Major 7th (M7)"?r=[...r,11]:i==="9th"&&(r=[...r,10,14]),r.map(n=>we(o+n,s))}const no={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},ao={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function lo(e,t,i){return t==="Minor"&&i==="Major 7th (M7)"?`${e}m(maj7)`:`${e}${no[t]??""}${ao[i]??""}`}const Qt=["C","D","E","F","G","A","B"],yt=10,_e=Qt.indexOf("E")+4*7,co=_e+4*2,dt=20,Zt=dt+4*yt,ho={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},po={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},ei={};de.forEach(e=>{ei[W[e]]=e});function ti(e,t){const i=po[t]??0,o=(((W[e]??0)-i)%12+12)%12;return ei[o]??"C"}function ii(e,t){return ho[ti(e,t)]??[]}function te(e,t){const i=ti(e,t);return Pi.has(i)||i.includes("b")}function De(e,t){return we(W[e]??0,te(e,t))}const $t={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function uo(e){let t=4,i=-1;return e.map(s=>{const o=Qt.indexOf(s[0].toUpperCase());return i!==-1&&o<=i&&t++,i=o,o+t*7})}function se(e){return Zt-(e-_e)*(yt/2)}const me=10,ze=46,Et=26,Ot=14;function go(e,t,i){const s=ii(t,i),o=8,r=s.length?s.length*o+6:0,n=s.map(T=>$t[T]),a=e.map(T=>uo(T.notes)),l=a.flat(),d=Math.min(dt,...l.map(se),...n.map(se)),g=Math.max(Zt,...l.map(se),...n.map(se)),m=me+Ot-d,y=g-d+12+me+Ot,v=[0,1,2,3,4].map(T=>dt+T*yt+m),x=me+Et+r,p=s.map((T,w)=>({x:me+Et+w*o,y:se($t[T])+m,sign:T.includes("#")?"sharp":"flat"})),h=e.map((T,w)=>{const E=x+w*ze+ze/2,P=a[w],_=P.map(O=>({x:E,y:se(O)+m})),q=[];P.forEach(O=>{(O-_e)%2===0&&(O<_e||O>co)&&q.push({x:E-9,y:se(O)+m})});const f=Math.min(..._.map(O=>O.y))-10;return{cx:E,name:T.name,roman:T.roman,notes:_,ledgers:q,labelY:f}});return{width:x+e.length*ze+me,height:y,lines:v,keySignature:p,chords:h}}function mo(e,t,i){const s=lt(e.name),o=s.includes("b");return{...e,name:lo(s,t,i),notes:ct(s,t,i,o)}}function fo(e,t,i){const s=t.chords[i],o=e.scales[s.scaleKey],r=Object.keys(o.degrees),n=te(t.key,t.scaleType),a=[],l=(i-1+t.chords.length)%t.chords.length,d=t.chords[l]?.degree||"TONIC",g=t.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",m=`${t.key}_${g}`,y=e.scales[m],v=te(t.key,g),x=g==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(y){const w=Fe(x,Object.keys(y.degrees),s.degree,d,t.scaleType,t.genre,t.mood);if(w){const E=ce(m,w,y,v);a.push({label:"Darker",sub:"heavier, more shadow",chord:E,functionCaption:`Borrowed · ${E.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${g==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const w=g==="NATURAL_MINOR"?at(t.key,8,"maj","Submediant","bVI","hold",v):at(t.key,5,"maj","Subdominant","IV","lift",v);a.push({label:"Darker",sub:"heavier, more shadow",chord:w,functionCaption:`Borrowed · ${w.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let p=s.scaleKey,h=o;if(t.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const w=`${t.key}_HARMONIC_MINOR`,E=e.scales[w];E?.degrees.DOMINANT&&(p=w,h=E)}const b=Fe(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(h.degrees),s.degree,d,t.scaleType,t.genre,t.mood);if(b){const w=ce(p,b,h,n);a.push({label:"More tension",sub:"sharper pull forward",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:`Aimed at the ${w.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const T=Fe(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree,d,t.scaleType,t.genre,t.mood);if(T){const w=ce(s.scaleKey,T,o,n);a.push({label:"Dreamier",sub:"softer, more air",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const w=ce(s.scaleKey,"TONIC",o,n);a.push({label:"Resolve home",sub:"settles back to center",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const vo={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},yo={m8:43303,circuit:43302};function xo(e,t,i){let s=vo[t];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(s=`http://localhost:${yo[t]}/`);const r=(i&&i.length>0?i.map(n=>e.chords[n]).filter(n=>!!n):e.chords).map(n=>encodeURIComponent(n.name)).join("+");return`${s}?p=${r}`}const bo=ie.map(e=>e.name),wo=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function ko(e,t){const i=e.length+1,s=t.length+1,o=Array.from({length:i},()=>new Array(s).fill(0));for(let r=0;r<i;r++)o[r][0]=r;for(let r=0;r<s;r++)o[0][r]=r;for(let r=1;r<i;r++)for(let n=1;n<s;n++)o[r][n]=e[r-1]===t[n-1]?o[r-1][n-1]:1+Math.min(o[r-1][n-1],o[r-1][n],o[r][n-1]);return o[i-1][s-1]}function re(e,t){if(typeof e!="string")return null;const i=e.trim();if(!i)return null;const s=i.toLowerCase(),o=t.find(l=>l.toLowerCase()===s);if(o)return o;let r=null,n=1/0;for(const l of t){const d=ko(s,l.toLowerCase());d<n&&(n=d,r=l)}const a=Math.max(2,Math.floor(s.length*.4));return n<=a?r:null}function To(e){if(!Array.isArray(e))return;const t=[];for(const i of e){if(!i||typeof i!="object")continue;const s=i,o=re(s.root,de),r=re(s.quality,Bi);o&&r&&t.push({root:o,quality:r})}if(t.length)return t.slice(0,z)}function So(e){if(!e||typeof e!="object"||Array.isArray(e))return;const t=e,i=re(t.presetId,wo)??(typeof t.presetId=="string"&&t.presetId.trim()?t.presetId.trim():void 0);if(!i)return;const s=t.customConfig&&typeof t.customConfig=="object"&&!Array.isArray(t.customConfig)?t.customConfig:void 0;return{presetId:i,customConfig:s}}function Ge(e,t){const i=e&&typeof e=="object"?e:{},s=re(i.genre,xe)??t.genre,o=re(i.mood,bo)??t.mood,r=re(i.key,de)??void 0,n=re(i.scaleType,Li)??void 0,a=r&&n?To(i.chords):void 0;let l;typeof i.length=="number"&&Number.isFinite(i.length)&&(l=Math.max(ne,Math.min(z,Math.round(i.length))));const d=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,g=So(i.instrumentConfig),m=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:s,mood:o,key:r,scaleType:n,length:l,chords:a,rhythmStyle:d,instrumentConfig:g,_rateLimit:m}}const Io=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],ht=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],oi="chroma-chords-llm-provider",si="chroma-chords-llm-model";function ri(){const e=localStorage.getItem(oi);return e==="opencodeai"||e==="anthropic"||e==="openrouter"||e==="google"?e:"google"}function Ao(e){localStorage.setItem(oi,e)}function ni(){const e=localStorage.getItem(si);return e?e==="gemini-1.5-flash"||e==="gemini-2.0-flash"||e==="gemini-2.5-flash"||e==="gemini-3.5-flash"||e==="gemini-1.5-pro"?"gemini-3.1-flash-lite":e:ht[0].id}function Ye(e){localStorage.setItem(si,e)}const Ve={genre:xe[0],mood:ie[0].name},ai="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",No=12e3;async function Mo(){try{const e=await fetch(ai);if(e.ok)return await e.json()}catch{}return null}const li={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},ci={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Le(e,t){const i=e.toLowerCase();let s=null,o=0;return Object.keys(t).forEach(r=>{const n=t[r].reduce((a,l)=>a+(i.includes(l)?1:0),0);n>o&&(o=n,s=r)}),s}function pt(e){const t=Le(e,ci),i=Le(e,li);return!t||!i?null:{genre:t,mood:i}}let xt=null;function di(e){xt=e}function Co(){return xt}async function $o(e,t){const i=new AbortController,s=setTimeout(()=>i.abort(),No),o=xt;try{const r={"Content-Type":"application/json"};o&&(r.Authorization=`Bearer ${o}`);const n=await fetch(ai,{method:"POST",headers:r,body:JSON.stringify({text:e,provider:ri(),model:ni()}),signal:i.signal}),a=await n.json().catch(()=>null);if(!n.ok||a&&typeof a=="object"&&"error"in a){const l=a&&typeof a=="object"&&"error"in a?String(a.error):`HTTP ${n.status}`,d=new Error(`Classifier request failed: ${l}`);throw a&&typeof a=="object"&&"_rateLimit"in a&&(d._rateLimit=a._rateLimit),d}return a}finally{clearTimeout(s)}}async function hi(e,t){const i=e.trim(),s=i.toLowerCase();if(s.startsWith("mock")||s.startsWith("test")){const r=i.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=Le(r,ci)??"Synthwave",a=Le(r,li)??"Dreamy",l={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},d={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},g={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},m=g[n]||g._default,y=l[n]||"rhodes",v=d[n]||"slow_arpeggio",x={genre:n,mood:a,key:m.key,scaleType:m.scaleType,length:8,chords:m.chords,rhythmStyle:v,instrumentConfig:{presetId:y,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return Ge(x,{genre:n,mood:a})}const o=pt(e);try{const r=await $o(e,t);return Ge(r,o??Ve)}catch(r){console.warn("LLM classification failed, falling back to keyword heuristic:",r);const n=Ge(o??Ve,Ve);return r&&typeof r=="object"&&"_rateLimit"in r&&(n._rateLimit=r._rateLimit),n}}const qe=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"];function fe(e){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(e):null}function Dt(e,t){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(e,t)}function He(e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.removeItem(e)}class Eo{constructor(){this.driveService=new Ei,this.tokenClient=null,this.userEmail=null,this.authenticated=!1,this.isDriveSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.authStateCallbacks=new Set,this.userEmail=fe("chroma-chords-auth")||fe("chroma-chords-user")||fe("chord-voyager-auth"),this.initSilentAuth(),this.setupGoogleAuth()}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}subscribeAuthState(t){return this.authStateCallbacks.add(t),t(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(t)}notifyAuthState(){this.authStateCallbacks.forEach(t=>t(this.userEmail,this.authenticated))}async hashEmail(t){const s=new TextEncoder().encode(t),o=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}initSilentAuth(){const t=fe("chroma-chords-auth")||fe("chord-voyager-auth");t&&this.hashEmail(t).then(i=>{qe.includes(i)&&(this.authenticated=!0,this.userEmail=t,this.notifyAuthState())})}setupGoogleAuth(){if(typeof window>"u")return;const t=setInterval(()=>{window.google&&(clearInterval(t),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async i=>{if(!(!i||i.error||!i.access_token))try{const s=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${i.access_token}`}});if(!s.ok)return;const o=await s.json();if(!o?.email)return;const r=await this.hashEmail(o.email);if(!qe.includes(r))return;this.authenticated=!0,this.userEmail=o.email,Dt("chroma-chords-auth",o.email),this.driveService.setAccessToken(i.access_token),this.notifyAuthState(),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(s){console.error("Silent Drive auth failed",s)}}}))},200)}async requestLogin(){return typeof window>"u"?null:(window.google?.accounts?.oauth2||await new Promise(t=>{const i=document.querySelector('script[src="https://accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>t(),{once:!0}),setTimeout(t,3e3);return}const s=document.createElement("script");s.src="https://accounts.google.com/gsi/client",s.async=!0,s.onload=()=>t(),s.onerror=()=>t(),document.head.appendChild(s)}),window.google?.accounts?.oauth2?new Promise(t=>{try{this.tokenClient||(this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata",callback:async i=>{if(i?.access_token){this.driveService.setAccessToken(i.access_token),di(i.access_token);const o=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${i.access_token}`}}).catch(()=>null))?.json().catch(()=>null);if(!o?.email){t(null);return}const r=await this.hashEmail(o.email);if(!qe.includes(r)){t(null);return}const n=o.email;Dt("chroma-chords-auth",n),this.userEmail=n,this.authenticated=!0,this.notifyAuthState(),await this.syncProjectsFromCloud(),t(n);return}t(null)}})),this.tokenClient.requestAccessToken()}catch(i){console.warn("Google Identity Services request failed:",i),t(null)}}):null)}logout(){He("chroma-chords-auth"),He("chroma-chords-user"),He("chord-voyager-auth"),this.userEmail=null,this.authenticated=!1,this.notifyAuthState()}getProjects(){return J.getProjects()}isProjectSaved(t){return t?J.getProjects().some(i=>i.id===t):!1}saveProject(t){J.saveProject(t)}async deleteProject(t){J.deleteProject(t),this.scheduleCloudSync()}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const t=await this.driveService.loadProjects();if(t){t.forEach(o=>o.syncedToCloud=!0);const i=J.getProjects(),s=J.mergeProjects(i,t);J.setProjects(s)}}catch(t){console.error("Failed to sync from cloud",t)}finally{this.isDriveSyncing=!1}}}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isDriveSyncing?this.syncQueued=!0:this.syncProjectsToCloud()},2e3)}async syncProjectsToCloud(){if(!(!this.authenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const t=J.getProjects();await this.driveService.saveProjects(t),t.forEach(i=>i.syncedToCloud=!0),J.setProjects(t)}catch(t){console.error("Failed to sync to cloud",t)}finally{this.isDriveSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}}const L=new Eo;let Xe=null,Je=null,We=null,Pt=null,Ke=null,Qe=null,Ze=null,et=null,tt=null,it=null,ot=null;function pi(){return Xe||(Xe=new qt({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Xe}function Oo(){return Je||(Je=new Ii({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:e=>{console.warn("Failed to load Rhodes piano sampler:",e)}}).connect(pi())),Je}function Do(e){const t=pi();switch(e){case"organ":return We||(We=new U(ee,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(t)),We;case"pad-strings":return Ke||(Pt=new Vt({decay:4.5,wet:.35}).connect(t),Ke=new U(ee,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Pt)),Ke;case"juno-pad":if(!Ze){Qe=new Yt({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(t);try{Qe.start()}catch{}Ze=new U(ee,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Qe)}return Ze;case"stab":return et||(et=new U(Gt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(t)),et;case"epiano":return tt||(tt=new U(ye,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(t)),tt;case"guitar":return it||(it=new U(ee,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(t)),it;case"bell":return ot||(ot=new U(ye,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(t)),ot;case"rhodes":default:return Oo()}}const pe=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],ue=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],bt={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},wt={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Po={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Pe(e){const t=bt[e]??"rhodes";return Po[t]??"Piano"}function Be(e){return(wt[e]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function Bo(){return Promise.race([Si(),new Promise(e=>setTimeout(e,3e3))])}function ui(e,t){const i=t/60;switch(e){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function gi(e,t){const i=[];for(let s=0;s<t;s++)for(const o of e){const r=o.match(/^([A-G]#?)(-?\d+)$/);if(r){const n=r[1],a=parseInt(r[2],10)+s;i.push(`${n}${a}`)}else i.push(o)}return i}function mi(e,t){const i=[...e];switch(t){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Bt={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function Ro(e){if(!e)return;const t=e.toLowerCase().trim();return Bt[t]?Bt[t]:pe.find(s=>s.name.toLowerCase()===t||s.instrument.toLowerCase()===t)?.name}function _o(e){if(!e)return;const t=e.toLowerCase().trim();return t.includes("strum")?"Strum":t.includes("descend")?"Descending Arp":t.includes("half")?"Half-time":t.includes("swing")||t.includes("broken")?"Broken (swing)":t.includes("offbeat")||t.includes("ska")||t.includes("syncopat")||t.includes("groove")?"Off-beat / Ska":t.includes("triplet")||t.includes("fast")?"Fast Triplet":t.includes("arp")||t.includes("cascade")?"Arpeggio":t.includes("block")||t.includes("pad")||t.includes("sustained")?"Block chords":ue.find(s=>s.name.toLowerCase()===t)?.name??"Block chords"}function Lo(e,t=.7,i,s="rhodes",o){try{Promise.all([ki(),Bo()]).then(()=>{const r=Do(s);if(o&&typeof o=="object"&&Object.keys(o).length>0)try{typeof r.set=="function"&&r.set(o)}catch(d){console.warn("Failed to apply customConfig to Tone.js instrument:",d)}const n=e.length,a=n<=1?1:Math.max(.4,1/Math.sqrt(n)),l=Ti();if(i&&i.arpMode&&i.arpMode!=="off"){const d=i.bpm??80,g=i.arpRate??"1/16",m=i.arpRange??1,y=i.arpMode,v=ui(g,d),x=gi(e,m),p=mi(x,y),h=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*a:a,b=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,v*.9);p.forEach((T,w)=>{const E=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;r.triggerAttackRelease(T,b,l+w*v+E,h())});return}e.forEach((d,g)=>{let m=0,y=a,v=t;if(i){const{minVelocity:x,maxVelocity:p,spread:h,microTiming:b,humanVariance:T,duration:w}=i;y=(x+Math.random()*(p-x))/127*a;const P=g*h*.1,_=(Math.random()-.5)*b*.05,q=(Math.random()-.5)*T*.03;m=Math.max(0,P+_+q),v=w*(1+(Math.random()-.5)*.2*T)}r.triggerAttackRelease(d,v,l+m,y)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function Rt(e,t,i){const s=t==="Unknown"||!t?"Pop":t,o=i?.instrument?pe.find(y=>y.name===i.instrument):void 0,r=i?.playStyle?ue.find(y=>y.name===i.playStyle):void 0,n=o?.instrument??bt[s]??"rhodes",a=wt[s]||{},l=r?.patch??{},d={...a,...l,bpm:i?.bpm??a.bpm??90},g=i?.duration??a.duration??.9,m=l.durationMultiplier?g*l.durationMultiplier:g;Lo(e,m,d,n,i?.customConfig)}class jo{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set}setProgression(t,i){this.mode="single",this.progression=t,t?this.order=i||Array.from({length:t.chords.length},(s,o)=>o):this.order=[]}setSong(t){this.mode="song",this.sections=t,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((t,i)=>t+i.order.length,0):this.order.length}setOrder(t,i){this.order=t,typeof i=="number"&&(this.activeIndex=i)}setInstrument(t){this.instrument=t}setPlayStyle(t){this.playStyle=t}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(t){return this.tickCallbacks.add(t),()=>this.tickCallbacks.delete(t)}notifyTick(){const t=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,t,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,t,!1))}updateSongStepState(t){let i=0;for(let s=0;s<this.sections.length;s++){const o=this.sections[s].order.length;if(t<i+o){this.activeSectionIndex=s;const r=t-i;this.activeIndex=this.sections[s].order[r]??0,this.progressStep=r;return}i+=o}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const t=this.getTotalSteps();if(t<=0)return;this.songStep=(this.songStep+1)%t,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},mt)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}playActiveChord(){if(this.mode==="song"){const t=this.sections[this.activeSectionIndex];if(!t)return;const i=this.activeIndex,s=t.progression.chords[i];if(s){const r=(s.notes&&s.notes.length>0?s.notes:Ee(s.name,te(t.progression.key,t.progression.scaleType))).map(n=>`${n}4`);Rt(r,t.progression.genre,{bpm:t.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const t=this.order[this.activeIndex]??0,i=this.progression.chords[t];if(i){let s=Array.isArray(i.notes)?i.notes:[];if(s.length===0||!s.every(o=>typeof o=="string"&&o.trim().length>0)){const o=i.name||"CMAJ",r=this.progression.key||"C",n=this.progression.scaleType||"MAJOR";s=Ee(o,te(r,n))}this.playChordNotes(s,1.2)}}}playChordAtIndex(t,i=.8){if(!this.progression||!this.progression.chords[t])return;const s=this.progression.chords[t];let o=Array.isArray(s.notes)?s.notes:[];if(o.length===0||!o.every(r=>typeof r=="string"&&r.trim().length>0)){const r=s.name||"CMAJ",n=this.progression.key||"C",a=this.progression.scaleType||"MAJOR";o=Ee(r,te(n,a))}this.playChordNotes(o,i)}playChordNotes(t,i){if(!this.progression)return;const s=Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.trim().length>0):[];if(s.length===0)return;const r=s.map(n=>n.replace(/\d+$/,"")).map(n=>`${n}4`);Rt(r,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const I=new jo;class Uo{static setGoogleToken(t){di(t)}static getGoogleToken(){return Co()}static async resolvePrompt(t,i,s,o,r,n){let a=n||null,l=null,d=null;if(!a&&r&&r.trim().length>0)try{a=await hi(r)}catch(y){console.warn("Failed to classify prompt via LLM/local fallback:",y)}const g=!!(a&&a.chords?.length&&a.key&&a.scaleType);let m=null;return g&&a&&a.chords&&a.key&&a.scaleType&&(m=so(t,a.key,a.scaleType,a.chords,a.genre||i,a.mood||s)),m||(m=Kt(t,i,s,{length:o})),g&&a&&(a.instrumentConfig?.presetId&&(l=Ro(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(d=_o(a.rhythmStyle)??null)),m.chords.length>o&&(m={...m,chords:m.chords.slice(0,o)}),r&&(m={...m,searchTerm:r}),{progression:m,instrument:l,playStyle:d,normalizedSuggestion:a}}}const ve=[{name:"Verse",desc:"Settled, familiar.",reorder:e=>Array.from({length:e},(t,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:e=>Array.from({length:e},(t,i)=>(i+Math.ceil(e/2))%e)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:e=>Array.from({length:e},(t,i)=>(i+1)%e)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:e=>Array.from({length:e},(t,i)=>e-1-i)},{name:"Outro",desc:"Settles back down.",reorder:e=>Array.from({length:e},(t,i)=>(i-1+e)%e)}];class Me{static createInitialSong(t,i){const s=i||Array.from({length:t.chords.length},(o,r)=>r);return[{name:ve[0].name,desc:ve[0].desc,progression:t,order:s.slice()}]}static addSection(t,i){if(t.length>=ve.length)return{sections:t,activeIndex:t.length-1};const s=ve[t.length],o=s.reorder(i.chords.length),r={name:s.name,desc:s.desc,progression:i,order:o},n=[...t,r];return{sections:n,activeIndex:n.length-1}}static syncActiveSection(t,i,s,o){if(!t[i])return t;const r=[...t];return r[i]={...r[i],progression:s,order:o.slice()},r}}var Fo=Object.defineProperty,zo=Object.getOwnPropertyDescriptor,kt=(e,t,i,s)=>{for(var o=s>1?void 0:s?zo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Fo(t,i,o),o};const ut=["bean","bird","cat","note"];function he(e=.45){return{show:Math.random()<e,kind:ut[Math.floor(Math.random()*ut.length)]}}function Te(e){return e[Math.floor(Math.random()*e.length)]}class Tt{constructor(t=7,i=1800){this.threshold=t,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const t=Date.now();return t-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=t,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const Go={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Se=class extends Y{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(e){if(e.has("kind")||e.has("scale")){const{width:t,height:i}=Go[this.kind];this.style.width=`${t*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const e="#D98A54";return c`
      <div class="root" style="width:92px;">
        <div class="note-emoji" style="font-size:13px;">♪</div>
        <div class="arm-rest" style="background:transparent;">
          <div class="arm-rest-fore" style="background:${e};"></div>
          <div class="arm-rest-hand" style="background:${e};"></div>
        </div>
        <div class="arm-hang">
          <div class="arm-hang-inner" style="background:${e};"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.94;background:${e};">
          <div class="ear l" style="background:${e};"></div>
          <div class="ear r" style="background:${e};"></div>
          <div class="face"></div>
          <div class="eye l"></div>
          <div class="eye r"></div>
          <div class="cheek l"></div>
          <div class="cheek r"></div>
          <div class="smile"></div>
          <div class="foot l" style="background:${e};"></div>
          <div class="foot r" style="background:${e};"></div>
        </div>
      </div>
    `}renderBird(){const e="#7C93A8",t="#E8A24A";return c`
      <div class="root" style="width:88px;">
        <div class="note-emoji" style="font-size:12px; left:8%; top:-6%;">♪</div>
        <div style="position:absolute; left:-8%; top:22%; width:46%; height:30%; background:${e}; border-radius:50% 60% 60% 50%; transform-origin:100% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite;"></div>
        <div style="position:absolute; right:-8%; top:22%; width:46%; height:30%; background:${e}; border-radius:60% 50% 50% 60%; transform-origin:0% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite 0.2s;"></div>
        <div class="body" style="aspect-ratio:1/1; background:${e}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:50%; top:-20%; width:3px; height:26%; background:#5F7286; transform-origin:50% 100%; animation: mascot-tuft-bob 2.3s ease-in-out infinite;"></div>
          <div style="position:absolute; left:50%; top:42%; transform:translate(-50%,-50%); width:60%; height:42%; background:#F3EDE0; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:40%; background:#2B2420;"></div>
          <div class="eye r" style="top:40%; background:#2B2420;"></div>
          <div style="position:absolute; left:50%; top:54%; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:10px solid ${t};"></div>
          <div class="foot l" style="bottom:-6%; height:14%; background:${t};"></div>
          <div class="foot r" style="bottom:-6%; height:14%; background:${t};"></div>
        </div>
      </div>
    `}renderCat(){const e="#8FA888";return c`
      <div class="root" style="width:90px;">
        <div style="position:absolute; left:55%; top:30%; width:30%; height:8%; background:${e}; border-radius:30px; transform-origin:0% 50%; animation: mascot-tail-wag 2.2s ease-in-out infinite;"></div>
        <div class="body" style="aspect-ratio:1/0.98; background:${e}; border-radius:46% 46% 44% 44%;">
          <div style="position:absolute; left:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${e}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite;"></div>
          <div style="position:absolute; right:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${e}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite 0.15s reverse;"></div>
          <div style="position:absolute; left:50%; top:48%; transform:translate(-50%,-50%); width:56%; height:38%; background:#F3EEE1; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:44%; background:#2B2420;"></div>
          <div class="eye r" style="top:44%; background:#2B2420;"></div>
          <div style="position:absolute; left:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:100% 50%; animation: mascot-whisker 3s ease-in-out infinite;"></div>
          <div style="position:absolute; right:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:0% 50%; animation: mascot-whisker 3s ease-in-out infinite 0.3s;"></div>
          <div class="smile" style="top:66%; width:16%;"></div>
          <div class="foot l" style="height:16%; background:${e};"></div>
          <div class="foot r" style="height:16%; background:${e};"></div>
        </div>
      </div>
    `}renderNote(){const e="#B7A6DE",t="#8672B0";return c`
      <div class="root" style="width:74px;">
        <div style="position:absolute; right:6%; top:-46%; width:5px; height:62%; background:${t}; transform-origin:50% 100%; animation: mascot-stem-sway 2.6s ease-in-out infinite;">
          <div style="position:absolute; top:-6px; left:4px; width:16px; height:20px; background:${t}; border-radius:0 60% 40% 60%; transform-origin:0% 100%; animation: mascot-flag-flutter 2.6s ease-in-out infinite;"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.9; background:${e}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:4%; top:32%; width:22%; height:26%; transform-origin:100% 50%; animation: mascot-arm-rest 2.6s ease-in-out infinite;"><div style="width:100%; height:30%; background:${e}; border-radius:30px;"></div></div>
          <div style="position:absolute; right:4%; top:32%; width:22%; height:26%; transform-origin:0% 50%; animation: mascot-arm-hang 2.6s ease-in-out infinite 0.2s;"><div style="width:100%; height:30%; background:${e}; border-radius:30px;"></div></div>
          <div style="position:absolute; left:50%; top:40%; transform:translate(-50%,-50%); width:58%; height:40%; background:#F3EFF9; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:38%;"></div>
          <div class="eye r" style="top:38%;"></div>
          <div class="smile" style="top:54%; width:18%;"></div>
          <div class="foot l" style="height:15%; background:${t};"></div>
          <div class="foot r" style="height:15%; background:${t};"></div>
        </div>
      </div>
    `}render(){const e=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return e?c`<div style="transform:scale(${this.scale}); transform-origin:top left;">${e}</div>`:Ht}};Se.styles=G`
    :host {
      display: block;
      pointer-events: none;
      user-select: none;
      overflow: visible;
    }
    @keyframes mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
    @keyframes mascot-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes mascot-arm-rest { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(2deg); } }
    @keyframes mascot-arm-hang { 0%, 100% { transform: rotate(6deg); } 50% { transform: rotate(-6deg); } }
    @keyframes mascot-foot-l { 0%, 78%, 100% { transform: translateY(0) rotate(0deg); } 88% { transform: translateY(5px) rotate(-8deg); } }
    @keyframes mascot-foot-r { 0%, 38%, 100% { transform: translateY(0) rotate(0deg); } 48% { transform: translateY(5px) rotate(8deg); } }
    @keyframes mascot-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.12); } }
    @keyframes mascot-ear-wiggle { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
    @keyframes mascot-note-float { 0% { opacity: 0; transform: translate(0, 0) scale(0.6); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(10px, -34px) scale(1); } }
    @keyframes mascot-wing-flap { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(6deg); } }
    @keyframes mascot-tuft-bob { 0%, 100% { transform: rotate(-10deg) translateY(0); } 50% { transform: rotate(10deg) translateY(-3px); } }
    @keyframes mascot-tail-wag { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
    @keyframes mascot-whisker { 0%, 85%, 100% { transform: rotate(0deg); } 92% { transform: rotate(-4deg); } }
    @keyframes mascot-stem-sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    @keyframes mascot-flag-flutter { 0%, 100% { transform: rotate(0deg) scaleY(1); } 50% { transform: rotate(8deg) scaleY(0.9); } }

    .root {
      position: relative;
      animation: mascot-bob 2.4s ease-in-out infinite;
    }
    .note-emoji {
      position: absolute;
      left: 6%;
      top: -10%;
      color: #9C6B35;
      opacity: 0.8;
      animation: mascot-note-float 3.6s ease-out infinite;
    }
    .body {
      position: relative;
      width: 100%;
      border-radius: 48% 48% 44% 44% / 54% 54% 40% 40%;
      transform-origin: 50% 85%;
      animation: mascot-sway 2.4s ease-in-out infinite;
    }
    .ear {
      position: absolute;
      top: -6%;
      width: 22%;
      height: 26%;
      border-radius: 50%;
      transform-origin: 50% 100%;
      animation: mascot-ear-wiggle 2.4s ease-in-out infinite;
    }
    .ear.l { left: 6%; }
    .ear.r { right: 6%; animation-delay: 0.15s; animation-direction: reverse; }
    .face {
      position: absolute;
      left: 50%;
      top: 46%;
      transform: translate(-50%, -50%);
      width: 58%;
      height: 40%;
      background: #F7E9D0;
      border-radius: 50%;
      opacity: 0.9;
    }
    .eye {
      position: absolute;
      top: 42%;
      width: 11%;
      height: 11%;
      background: #3A2B20;
      border-radius: 50%;
      animation: mascot-blink 4s ease-in-out infinite;
    }
    .eye.l { left: 32%; }
    .eye.r { right: 32%; }
    .cheek {
      position: absolute;
      top: 56%;
      width: 13%;
      height: 9%;
      background: #EFB9A0;
      border-radius: 50%;
      opacity: 0.85;
    }
    .cheek.l { left: 22%; }
    .cheek.r { right: 22%; }
    .smile {
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
      width: 20%;
      height: 10%;
      border-bottom: 3px solid #3A2B20;
      border-radius: 0 0 50% 50%;
    }
    .foot {
      position: absolute;
      bottom: -8%;
      width: 20%;
      height: 18%;
      border-radius: 40%;
      transform-origin: 50% 0%;
    }
    .foot.l { left: 24%; animation: mascot-foot-l 2.6s ease-in-out infinite; }
    .foot.r { right: 24%; animation: mascot-foot-r 2.6s ease-in-out infinite 0.5s; }
    .arm-rest {
      position: relative;
      width: 62%;
      transform-origin: 50% 78%;
      animation: mascot-arm-rest 2.4s ease-in-out infinite;
    }
    .arm-rest-fore {
      position: absolute;
      right: -6%;
      top: 6%;
      width: 68%;
      height: 22%;
      border-radius: 40px;
      transform: rotate(-46deg);
      transform-origin: 100% 50%;
    }
    .arm-rest-hand {
      position: absolute;
      right: 34%;
      top: -6%;
      width: 22%;
      height: 22%;
      border-radius: 50%;
    }
    .arm-hang {
      position: absolute;
      left: 4%;
      top: 30%;
      width: 26%;
      height: 30%;
      transform-origin: 50% 10%;
      animation: mascot-arm-hang 2.6s ease-in-out infinite 0.3s;
    }
    .arm-hang-inner {
      width: 92%;
      height: 100%;
      border-radius: 30px;
    }
  `;kt([k({type:String})],Se.prototype,"kind",2);kt([k({type:Number})],Se.prototype,"scale",2);Se=kt([V("mascot-character")],Se);var Yo=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,St=(e,t,i,s)=>{for(var o=s>1?void 0:s?Vo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Yo(t,i,o),o};const gt=3200;let Ie=class extends Y{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(e){e.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},gt))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?c`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${ut.map(e=>c`<mascot-character .kind=${e} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:Ht}};Ie.styles=G`
    :host {
      display: contents;
    }
    @keyframes egg-pop {
      0% { opacity: 0; transform: translate(-50%, 24px) scale(0.7); }
      12% { opacity: 1; transform: translate(-50%, 0) scale(1.04); }
      18% { transform: translate(-50%, 0) scale(1); }
      88% { opacity: 1; transform: translate(-50%, 0) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -14px) scale(0.94); }
    }
    @keyframes egg-caption-pop {
      0%, 15% { opacity: 0; transform: translate(-50%, 6px); }
      25%, 85% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, 0); }
    }
    .overlay {
      position: fixed;
      left: 50%;
      bottom: 26px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      pointer-events: none;
      animation: egg-pop ${gt}ms ease forwards;
    }
    .caption {
      position: fixed;
      left: 50%;
      bottom: 108px;
      transform: translateX(-50%);
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, inherit);
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      padding: 8px 16px;
      border-radius: 100px;
      white-space: nowrap;
      animation: egg-caption-pop ${gt}ms ease forwards;
    }
    .row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      background: var(--cv-surface, #F1E4CC);
      border: 1.5px solid var(--cv-ink-12, rgba(46,39,31,0.12));
      border-radius: 100px;
      padding: 10px 16px 6px;
      box-shadow: 0 20px 40px -18px rgba(46, 39, 31, 0.35);
    }
  `;St([k({type:Number})],Ie.prototype,"trigger",2);St([u()],Ie.prototype,"visible",2);Ie=St([V("mascot-parade")],Ie);var qo=Object.defineProperty,Ho=Object.getOwnPropertyDescriptor,C=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ho(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&qo(t,i,o),o};const Xo=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],Jo=800,F=4,Q=45e3,_t="chroma_chords_capacity_v2",Wo=["#F2A79B","#9CC0EC","#F6D98B"],Ko=[6,3,12],Lt=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],Qo=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Zo=["Warm","Melancholy","Nostalgic","Dreamy"],jt=["Drew a total blank on that one — good thing there's a picker right below.","That one stumped us completely. The genre & mood dials still work great, though.","Our ears just short-circuited. Manual mode has never let anyone down.","No idea, honestly — but you clearly do. Pick a genre & mood below."],Ce=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let N=class extends Y{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=he(.35),this.mascotSlot=Te(Xo),this.peekMascot=he(.18),this.peekSide=Te(["left","right"]),this.isAuthenticated=!1,this.isAdmin=!1,this.currentProvider=ri(),this.currentModel=ni(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=F,this.rechargeNextSec=45,this.showCapacityNote=!1,this.lastCapacityTime=Date.now(),this.capacityTimer=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new Tt,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const e=performance.now(),t=this.getBoundingClientRect(),i=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let s=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const o=this.shadowRoot?.querySelector(".divider-row");if(o){const a=o.getBoundingClientRect();a.top>t.top&&(s=a.top-t.top)}const r=this.jellyBodies,n=r.length;for(let a=0;a<n;a++){const l=r[a];if(l.vx+=Math.sin(e*6e-4*l.driftFreqX+l.driftPhaseX)*l.driftForce,l.vy+=Math.cos(e*7e-4*l.driftFreqY+l.driftPhaseY)*l.driftForce,this.mouseX!==null&&this.mouseY!==null){const m=l.x-this.mouseX,y=l.y-this.mouseY,v=Math.hypot(m,y);if(v<140&&v>0){const x=(1-v/140)*.12;l.vx+=m/v*x,l.vy+=y/v*x}}l.vx*=l.drag,l.vy*=l.drag;const d=Math.hypot(l.vx,l.vy);d>l.maxSpeed&&(l.vx=l.vx/d*l.maxSpeed,l.vy=l.vy/d*l.maxSpeed),l.x+=l.vx,l.y+=l.vy,l.angle+=l.vRot;const g=l.radius;l.x<g?(l.x=g,l.vx=Math.abs(l.vx)*l.restitution+.02,l.squishX=.88,l.squishY=1.12):l.x>i-g&&(l.x=i-g,l.vx=-Math.abs(l.vx)*l.restitution-.02,l.squishX=.88,l.squishY=1.12),l.y<g?(l.y=g,l.vy=Math.abs(l.vy)*l.restitution+.02,l.squishX=1.12,l.squishY=.88):l.y>s-g&&(l.y=s-g,l.vy=-Math.abs(l.vy)*l.restitution-.02,l.squishX=1.12,l.squishY=.88),l.squishX+=(1-l.squishX)*.08,l.squishY+=(1-l.squishY)*.08}for(let a=0;a<n;a++)for(let l=a+1;l<n;l++){const d=r[a],g=r[l],m=g.x-d.x,y=g.y-d.y,v=Math.hypot(m,y),x=d.radius+g.radius;if(v<x&&v>0){const p=x-v,h=m/v,b=y/v;d.x-=h*p*.4,d.y-=b*p*.4,g.x+=h*p*.4,g.y+=b*p*.4;const T=d.vx-g.vx,w=d.vy-g.vy,E=(h*T+b*w)/(d.mass+g.mass),P=.35;d.vx-=E*g.mass*h*P,d.vy-=E*g.mass*b*P,g.vx+=E*d.mass*h*P,g.vy+=E*d.mass*b*P;const _=.12;d.squishX=Math.max(.85,1-_*Math.abs(h)),d.squishY=Math.max(.85,1-_*Math.abs(b)),g.squishX=Math.max(.85,1-_*Math.abs(h)),g.squishY=Math.max(.85,1-_*Math.abs(b))}}if(this.shadowRoot)for(let a=0;a<n;a++){const l=r[a],d=this.shadowRoot.getElementById(`jelly-${l.id}`);d&&(d.style.transform=`translate3d(${l.x-l.radius}px, ${l.y-l.radius}px, 0) rotate(${l.angle}deg) scale(${l.squishX}, ${l.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}initCapacity(){try{const e=localStorage.getItem(_t),t=Date.now();if(e){const i=JSON.parse(e),s=typeof i.charges=="number"?i.charges:F,o=typeof i.lastTime=="number"?i.lastTime:t;if(s<F){const r=Math.max(0,t-o),n=Math.floor(r/Q);this.capacityCharges=Math.min(F,s+n);const a=r%Q;this.rechargeNextSec=Math.max(1,Math.ceil((Q-a)/1e3)),this.lastCapacityTime=t-a}else this.capacityCharges=F,this.rechargeNextSec=45,this.lastCapacityTime=t}else this.capacityCharges=F,this.rechargeNextSec=45,this.lastCapacityTime=t}catch{this.capacityCharges=F,this.rechargeNextSec=45}this.saveCapacity(),this.startCapacityRechargeTimer()}saveCapacity(){try{localStorage.setItem(_t,JSON.stringify({charges:this.capacityCharges,lastTime:this.lastCapacityTime}))}catch{}}startCapacityRechargeTimer(){this.capacityTimer&&clearInterval(this.capacityTimer),this.capacityTimer=setInterval(()=>{if(this.capacityCharges<F){const e=Date.now(),t=Math.max(0,e-this.lastCapacityTime);if(t>=Q){const s=Math.floor(t/Q);this.capacityCharges=Math.min(F,this.capacityCharges+s),this.lastCapacityTime=e-t%Q,this.saveCapacity()}const i=(e-this.lastCapacityTime)%Q;this.rechargeNextSec=Math.max(1,Math.ceil((Q-i)/1e3))}else this.rechargeNextSec=45},1e3)}spendCapacityCharge(){return this.capacityCharges<=0?(this.showCapacityNote=!0,!1):(this.capacityCharges===F&&(this.lastCapacityTime=Date.now()),this.capacityCharges-=1,this.saveCapacity(),!0)}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*Ce.length),this.loadingTimer=setInterval(()=>{let e=Math.floor(Math.random()*Ce.length);e===this.loadingMsgIdx&&(e=(e+1)%Ce.length),this.loadingMsgIdx=e},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(e){this.currentProvider=e,Ao(e),e==="google"?(this.currentModel=ht[0].id,Ye(this.currentModel)):e==="opencodeai"&&(this.currentModel=Io[0].id,Ye(this.currentModel))}changeModel(e){this.currentModel=e,Ye(e)}initJellyBodies(){const e=this.getBoundingClientRect(),t=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let i=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const s=Math.min(i,400),o=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],r=3,n=[];for(let a=0;a<r;a++){const l=o[a%o.length],d=l.r+30,g=d+Math.random()*Math.max(100,t-d*2),m=d+Math.random()*Math.max(50,s-d*2),y=.08+Math.random()*.18,v=.35+Math.random()*.25,x=.985,p=.006+Math.random()*.008,h=.35,b=Math.random()*Math.PI*2;n.push({id:a,shapeKey:l.key,width:l.r*2,height:l.r*2,x:g,y:m,vx:Math.cos(b)*y,vy:Math.sin(b)*y,maxSpeed:v,drag:x,driftForce:p,restitution:h,radius:l.r,mass:l.r*l.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=n}onFrameMouseMove(e){const t=this.getBoundingClientRect();this.mouseX=e.clientX-t.left,this.mouseY=e.clientY-t.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){Mo().then(e=>{e&&(e.google&&(this.googleLimit=e.google.limit,this.googleRemaining=e.google.remaining,this.googleCooldownSec=e.google.cooldownSeconds),e.openrouter&&(this.orLimit=e.openrouter.limit,this.orRemaining=e.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%Lt.length},2800),this.initCapacity(),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(e){super.updated(e),e.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.capacityTimer&&clearInterval(this.capacityTimer),this.stopLoadingTimer()}selectGenre(e){this.dispatchEvent(new CustomEvent("genre-change",{detail:e,bubbles:!0,composed:!0}))}selectMood(e){this.dispatchEvent(new CustomEvent("mood-change",{detail:e,bubbles:!0,composed:!0}))}setLength(e){this.dispatchEvent(new CustomEvent("length-change",{detail:e,bubbles:!0,composed:!0}))}decLength(){this.length>ne&&this.setLength(this.length-1)}incLength(){this.length<z&&this.setLength(this.length+1)}onFreeTextChange(e){this.freeText=e.target.value,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.freeText.trim().length<=2&&(this.isClassifying=!1),this.scheduleClassify();const t=this.freeText.trim();if(t.length>2){const i=pt(t);i&&this.applyBest(i)}}scheduleClassify(){this.classifyDebounce&&clearTimeout(this.classifyDebounce);const e=this.freeText.trim(),t=e.toLowerCase();if(e.length<=2||["m","mo","moc","t","te","tes"].includes(t)){this.isClassifying=!1;return}const i=++this.classifyToken;this.classifyDebounce=setTimeout(async()=>{this.isClassifying=!0;try{const s=await hi(e);if(i!==this.classifyToken)return;s?._rateLimit?.remaining!==void 0?s._rateLimit.provider==="google"||this.currentProvider==="google"?(this.googleRemaining=s._rateLimit.remaining,s._rateLimit.limit&&(this.googleLimit=s._rateLimit.limit),s._rateLimit.cooldownSeconds&&(this.googleCooldownSec=s._rateLimit.cooldownSeconds)):(this.orRemaining=s._rateLimit.remaining,s._rateLimit.limit&&(this.orLimit=s._rateLimit.limit)):this.currentProvider==="google"?this.googleRemaining=Math.max(0,this.googleRemaining-1):this.currentProvider==="openrouter"&&(this.orRemaining=Math.max(0,this.orRemaining-1)),this.startCooldownTimer(),this.llmSuggestion=s,this.llmResolved=!0,this.classifyError=s?null:jt[Math.floor(Math.random()*jt.length)],s&&this.applyBest(s)}finally{i===this.classifyToken&&(this.isClassifying=!1)}},Jo)}applyBest(e){this.selectGenre(e.genre),this.selectMood(e.mood);const t={...e,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:t,bubbles:!0,composed:!0}))}renderJellySvg(e){switch(e){case"blob1":return c`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return c`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return c`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return c`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return c`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return c`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return c`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return c`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return c`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return c`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return c`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return c`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return c`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return c`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const e=be(this.mood);let t=Qo.filter(h=>xe.includes(h));t.includes(this.genre)||(t=t.slice(0,-1).concat(this.genre));const i=xe.filter(h=>!t.includes(h)),s=this.expandedGenre?t.concat(i):t,o=ie.map(h=>h.name);let r=Zo.filter(h=>o.includes(h));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const n=o.filter(h=>!r.includes(h)),l=(this.expandedMood?r.concat(n):r).map(h=>ie.find(b=>b.name===h)),d=this.freeText.trim();let g=null;d.length>2&&(g=this.llmResolved?this.llmSuggestion:pt(d));const m=this.capacityCharges,y=8,v=360/F,x=[];for(let h=0;h<F;h++){const b=h*v;x.push(`${h<m?"#F2A79B":"rgba(46,39,31,0.13)"} ${b}deg ${b+v-y}deg`),x.push(`transparent ${b+v-y}deg ${b+v}deg`)}const p=`conic-gradient(from -90deg, ${x.join(", ")})`;return c`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <div class="aquarium-layer">
          ${this.jellyBodies.map(h=>c`
            <div class="jelly-shape-wrapper" id="jelly-${h.id}" style="transform: translate3d(${h.x-h.radius}px, ${h.y-h.radius}px, 0) rotate(${h.angle}deg) scale(${h.squishX}, ${h.squishY})">
              ${this.renderJellySvg(h.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?c`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}
        
        ${this.isAuthenticated?c`
          <div class="your-sets-btn" @click=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        `:""}
        
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30">
            <circle cx="11" cy="11" r="9" fill="#F2A79B" />
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
          </svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <h1>Describe a vibe,<br />hear it as chords.</h1>
            <div class="subcopy">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show?c`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div
              class="capacity-ring-shell ${this.capacityCharges===0?"pulsing":""}"
              style="background: ${p};"
              @click=${()=>{this.showCapacityNote=!this.showCapacityNote}}
            >
              <div class="vibe-input-wrap">
                ${this.isClassifying?c`
                  <div class="vibe-input-icon" title="Classifying vibe...">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                `:""}
                <input
                  type="text"
                  class="vibe-input"
                  .value=${this.freeText}
                  @input=${h=>this.onFreeTextChange(h)}
                  @keydown=${h=>{h.key==="Enter"&&(h.preventDefault(),this.generate())}}
                  placeholder=${Lt[this.placeholderIdx]}
                />
                ${this.isAdmin?c`
                  <button class="vibe-admin-btn" @click=${h=>{h.stopPropagation(),this.showAdminModal=!0}} title="AI Model Configuration">
                    ⚡ ${this.currentProvider==="google"?`Google AI (${this.googleRemaining} left)`:this.currentProvider==="anthropic"?"Claude":`OpenRouter (${this.orRemaining} left)`}
                  </button>
                `:""}
                <button
                  class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0?"disabled":""}"
                  style="background: ${e}; opacity: ${this.capacityCharges>0?"1":"0.4"};"
                  @click=${h=>{h.stopPropagation(),this.generate()}}
                  aria-label="Hear this vibe as chords"
                  title="Generate progression from vibe"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            ${this.showCapacityNote?c`
              <div class="capacity-note" @click=${()=>{this.showCapacityNote=!1}}>
                ${this.capacityCharges>0?`${this.capacityCharges} of ${F} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            `:""}
          </div>
          ${this.isClassifying?c`
            <div class="suggestion-wrap">
              <div class="suggestion-note loading">✨ ${Ce[this.loadingMsgIdx]}</div>
            </div>
          `:g?c`
            <div class="suggestion-wrap">
              <div class="suggestion-note">Sounds like <span class="suggestion-highlight" style="color:${e}">${g.genre} · ${g.mood}</span> — the picks below already match.</div>
            </div>
          `:this.classifyError?c`
            <div class="suggestion-wrap">
              <div class="suggestion-note error">${this.classifyError}</div>
            </div>
          `:""}

          <div class="divider-row">
            <div class="divider-rule"></div>
            <div class="divider-label">or pick it yourself</div>
            <div class="divider-rule"></div>
          </div>

          <div class="section-label">Genre</div>
          <div class="pill-grid">
            ${s.map(h=>{const b=xe.indexOf(h);return c`
                <div class="pill ${h===this.genre?"selected":""}" style=${h===this.genre?`background:${e}`:""} @click=${()=>this.selectGenre(h)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${Ko[b%3]} fill=${Wo[b%3]} />
                    </svg>
                  </div>
                  ${h}
                </div>
              `})}
            ${i.length?c`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${i.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${l.map(h=>c`
              <div class="pill mood-pill ${h.name===this.mood?"selected":""}" style=${h.name===this.mood?`background:${h.dot}`:""} @click=${()=>this.selectMood(h.name)}>
                <div class="mood-badge" style="background:${h.name===this.mood?"rgba(46,39,31,0.1)":h.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${h.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${h.iconPath} />
                  </svg>
                </div>
                ${h.name}
              </div>
            `)}
            ${n.length?c`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${n.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=ne?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:z},(h,b)=>c`
                <div class="length-segment ${b<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=z?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button
            class="cta ${this.capacityCharges<=0?"disabled":""}"
            style="background:${e}; opacity: ${this.capacityCharges>0?"1":"0.4"};"
            @click=${this.generate}
          >
            ${g?"Let's go to your progression":"Generate loop"} <span>→</span>
          </button>
          <div class="caption">Nothing here is permanent — swap any chord after.</div>

          <div class="footer">
            <a class="footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
              GitHub
            </a>
            <span class="footer-divider">·</span>
            <span>Made with ❤️ by warmsynths</span>
            <span class="footer-divider">·</span>
            <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
            <span class="footer-divider">·</span>
            ${this.isAuthenticated?c`
              <button class="footer-login-btn" @click=${this.onLogoutClick}>Sign out</button>
            `:c`
              <button class="footer-login-btn" @click=${this.onLoginClick}>Sign in</button>
            `}
          </div>
        </div>

        ${this.showAdminModal?c`
          <div class="admin-modal-backdrop" @click=${()=>{this.showAdminModal=!1}}>
            <div class="admin-modal" @click=${h=>h.stopPropagation()}>
              <div class="admin-title">AI Provider Config</div>
              <div class="admin-desc">Select which backend model service classifies free-text prompts into chord progressions:</div>
              <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                📊 Daily OpenRouter Quota: ${this.orRemaining} / ${this.orLimit} remaining
              </div>
              <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                📊 Google AI Quota: ${this.googleRemaining} / ${this.googleLimit} (per min)
              </div>
              <div class="admin-options">
                <button class="admin-opt ${this.currentProvider==="google"?"active":""}" @click=${()=>this.changeProvider("google")}>
                  <div class="opt-name">🎯 Google AI Studio (Free)</div>
                  <div class="opt-detail">Gemini Flash models directly via free tier (No deposit required)</div>
                  ${this.currentProvider==="google"?c`
                    <div class="model-sub-list" @click=${h=>h.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${ht.map(h=>c`
                        <div class="model-sub-opt ${this.currentModel===h.id?"selected":""}" @click=${()=>this.changeModel(h.id)}>
                          <span>${h.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${h.vendor}</span>
                        </div>
                      `)}
                    </div>
                  `:""}
                </button>
                <button class="admin-opt ${this.currentProvider==="openrouter"?"active":""}" @click=${()=>this.changeProvider("openrouter")}>
                  <div class="opt-name">🌐 OpenRouter (Free Tier LLMs)</div>
                  <div class="opt-detail">Google Gemma 4, GPT-OSS, Ling 3.0 (Automatic multi-model fallback)</div>
                </button>
                <button class="admin-opt ${this.currentProvider==="anthropic"?"active":""}" @click=${()=>this.changeProvider("anthropic")}>
                  <div class="opt-name">🧠 Anthropic (Claude Haiku 4.5)</div>
                  <div class="opt-detail">Direct call to Claude Haiku via Worker (requires ANTHROPIC_API_KEY secret set on Cloudflare)</div>
                </button>
              </div>
              <button class="admin-close" @click=${()=>{this.showAdminModal=!1}}>Done</button>
              <button class="admin-logout" @click=${this.onLogoutClick}>Sign Out</button>
            </div>
          </div>
        `:""}
      </div>
    `}};N.styles=G`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 40px 80px;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 520px;
      margin-top: 20px;
    }
    .hero {
      position: relative;
      text-align: center;
      margin-bottom: 24px;
    }
    .aquarium-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .jelly-shape-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      will-change: transform;
      transform-origin: center;
    }
    .wordmark, .mascot-parade, .content, .admin-modal-backdrop {
      position: relative;
      z-index: 2;
    }
    h1 {
      margin: 0;
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .vibe-input-shell {
      position: relative;
      margin-top: 28px;
    }
    .vibe-input-wrap {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-cream);
      background-clip: padding-box;
      border: 1.5px solid transparent;
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
    }
    .capacity-ring-shell {
      position: relative;
      border-radius: 104px;
      padding: 4px;
      cursor: pointer;
      transition: background 320ms ease;
    }
    .capacity-ring-shell.pulsing {
      animation: cvfv-ring-pulse 2s ease-in-out infinite;
    }
    @keyframes cvfv-ring-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(242, 167, 155, 0.55); }
      50% { box-shadow: 0 0 0 6px rgba(242, 167, 155, 0); }
    }
    .capacity-note {
      text-align: center;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      user-select: none;
      transition: opacity 0.2s ease;
    }
    .vibe-admin-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink-70);
      background: rgba(46, 39, 31, 0.06);
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vibe-admin-btn:hover {
      background: rgba(46, 39, 31, 0.12);
      color: var(--cv-ink);
      border-color: var(--cv-ink-30);
    }
    @keyframes cv-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .vibe-input-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      color: var(--cv-label);
      animation: cv-spin 1s linear infinite;
    }
    .vibe-submit-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      color: var(--cv-ink);
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.25);
      transition: transform 160ms var(--cv-ease), opacity 200ms ease, background 200ms ease;
    }
    .vibe-submit-btn:hover {
      transform: scale(1.06);
    }
    .vibe-submit-btn:active {
      transform: scale(0.95);
    }
    .vibe-submit-btn.disabled {
      opacity: 0.45;
      cursor: default;
      pointer-events: none;
    }
    /* Peeks up from behind the pill's top edge — z-index 0 vs. the pill's 1 means the pill's
       own (opaque) background paints over the lower portion, so only the top sliver shows,
       like the character is looking out over the rim of a little window. */
    .vibe-peek {
      position: absolute;
      top: -14px;
      z-index: 0;
      pointer-events: none;
    }
    .vibe-peek.left { left: 22px; }
    .vibe-peek.right { right: 34px; }
    .vibe-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 15px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 10px 0;
      min-width: 0;
    }
    .vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.55);
      opacity: 1;
      transition: color 0.3s ease;
    }
    :focus-visible {
      outline: 2.5px solid var(--cv-ink);
      outline-offset: 2px;
    }
    .suggestion-wrap {
      text-align: center;
      margin-top: 12px;
    }
    .suggestion-note {
      display: inline-block;
      padding: 9px 18px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-55);
      opacity: 1;
      transform: translateY(0);
      transition: opacity 180ms var(--cv-ease), transform 180ms var(--cv-ease);
    }
    @starting-style {
      .suggestion-note {
        opacity: 0;
        transform: translateY(-4px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .suggestion-note {
          transform: none;
        }
      }
    }
    .suggestion-note.error {
      font-style: italic;
    }
    .suggestion-note.loading {
      color: var(--cv-ink-muted);
      font-style: italic;
      font-weight: 600;
      animation: cv-pulse-fade 1.4s ease-in-out infinite;
    }
    @keyframes cv-pulse-fade {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1.0; }
    }
    .suggestion-highlight {
      font-weight: 800;
    }
    .divider-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 32px 0 8px;
    }
    .divider-rule {
      flex: 1;
      height: 1px;
      background: var(--cv-ink-14);
    }
    .divider-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      white-space: nowrap;
    }
    .section-label {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      text-align: center;
    }
    .pill-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      justify-content: center;
    }
    .pill {
      display: flex;
      align-items: center;
      padding: 9px 18px 9px 12px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      background: var(--cv-surface-2);
      color: #5B5145;
      opacity: 1;
      transform: translateY(0);
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease), color 150ms var(--cv-ease), opacity 180ms var(--cv-ease);
    }
    @starting-style {
      .pill {
        opacity: 0;
        transform: translateY(6px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .pill {
          transform: none;
        }
      }
    }
    .pill:active {
      transform: scale(0.96);
    }
    .pill.selected {
      color: var(--cv-ink);
    }
    .genre-icon-wrap {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      background: var(--cv-ink-08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .pill.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
      padding: 9px 18px;
    }
    .mood-pill {
      padding: 8px 18px 8px 8px;
    }
    .mood-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 9px;
      flex-shrink: 0;
      transition: background 150ms var(--cv-ease);
    }
    .length-control {
      background: var(--cv-surface-2);
      border-radius: 20px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .length-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-cream);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 150ms var(--cv-ease);
    }
    .length-btn:active {
      transform: scale(0.92);
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 6px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 14px;
      border-radius: 6px;
      background: var(--cv-ink-10);
      transition: background 150ms var(--cv-ease);
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .cta {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 18px;
      border-radius: 100px;
      font-family: inherit;
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      margin-top: 36px;
      transition: transform 160ms var(--cv-ease);
    }
    .cta:active {
      transform: scale(0.97);
    }
    .caption {
      text-align: center;
      font-size: 11.5px;
      color: var(--cv-ink-45);
      margin-top: 12px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
      font-size: 12px;
      color: rgba(46, 39, 31, 0.4);
    }
    .footer-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: inherit;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .footer-link:hover {
      color: var(--cv-red-deep);
    }
    .footer-divider {
      opacity: 0.6;
    }

    @media (min-width: 640px) {
      .content { max-width: 620px; }
      .frame { padding-top: 56px; }
    }

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    /* Real gutter space beside the centered .content column only exists on wider viewports —
       and mobile's short-viewport spacing above is tuned to fit exactly, with nothing to spare. */
    @media (min-width: 980px) and (min-height: 700px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 40px; }
      .mascot-slot.right { right: 40px; }
    }

    /* Short mobile viewports (the constraint is vertical space, not width) — tighten spacing
       throughout so the whole picker, including the CTA, stays visible without scrolling. */
    @media (max-height: 920px) {
      .frame { padding: 18px 26px 16px; }
      .hero { margin-bottom: 14px; }
      h1 { font-size: clamp(24px, 6.5vw, 34px); }
      .subcopy { margin-top: 6px; font-size: 13.5px; line-height: 1.45; }
      .vibe-input-shell { margin-top: 16px; }
      .vibe-input-wrap { padding: 6px 8px 6px 16px; }
      .vibe-input { padding: 7px 0; font-size: 14px; }
      .suggestion-wrap { margin-top: 6px; }
      .divider-row { margin: 16px 0 4px; }
      .section-label { margin-top: 14px; margin-bottom: 7px; }
      .pill-grid { gap: 6px; }
      .pill { padding: 6px 14px 6px 9px; font-size: 13px; }
      .genre-icon-wrap { width: 18px; height: 18px; margin-right: 6px; }
      .mood-badge { width: 20px; height: 20px; margin-right: 6px; }
      .length-control { padding: 10px 16px; gap: 10px; }
      .length-btn { width: 26px; height: 26px; }
      .cta { margin-top: 16px; padding: 13px; font-size: 14.5px; }
      .caption { margin-top: 6px; font-size: 11px; }
      .footer { margin-top: 12px; font-size: 11px; }
    }

    .footer-admin-btn {
      background: none;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-55);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .footer-admin-btn:hover {
      border-color: var(--cv-ink-30);
      color: var(--cv-ink);
      background: rgba(255,255,255,0.4);
    }
    .admin-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(46, 39, 31, 0.4);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 1;
      transition: opacity 220ms ease, backdrop-filter 220ms ease;
    }
    .admin-modal {
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 24px;
      padding: 24px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 24px 48px -12px rgba(46, 39, 31, 0.35);
      text-align: left;
      opacity: 1;
      transform: scale(1) translateY(0);
      transition: opacity 240ms var(--cv-ease), transform 260ms var(--cv-ease);
    }
    @starting-style {
      .admin-modal-backdrop {
        opacity: 0;
      }
      .admin-modal {
        opacity: 0;
        transform: scale(0.95) translateY(8px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .admin-modal {
        transition: opacity 150ms ease;
        transform: none !important;
      }
    }
    .admin-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 6px;
    }
    .admin-desc {
      font-size: 13px;
      color: var(--cv-ink-muted);
      margin-bottom: 18px;
      line-height: 1.45;
    }
    .admin-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .admin-opt {
      text-align: left;
      background: rgba(255, 255, 255, 0.6);
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 14px;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .admin-opt.active {
      border-color: var(--cv-ink);
      background: #ffffff;
      box-shadow: 0 4px 14px rgba(46, 39, 31, 0.08);
    }
    .admin-opt:hover {
      border-color: var(--cv-ink-30);
    }
    .opt-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .opt-detail {
      font-size: 11.5px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
      line-height: 1.35;
    }
    .model-sub-list {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed var(--cv-ink-14);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .model-sub-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--cv-ink-55);
      margin-bottom: 2px;
    }
    .model-sub-opt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid var(--cv-ink-14);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--cv-ink);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .model-sub-opt:hover {
      border-color: var(--cv-ink-30);
      background: #ffffff;
    }
    .model-sub-opt.selected {
      background: var(--cv-ink);
      color: #ffffff;
      border-color: var(--cv-ink);
    }
    .model-vendor-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.08);
      color: inherit;
    }
    .model-sub-opt.selected .model-vendor-badge {
      background: rgba(255, 255, 255, 0.2);
    }
    .admin-close {
      width: 100%;
      background: var(--cv-ink);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 12px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.2s ease;
    }
    .admin-close:hover {
      opacity: 0.9;
    }
    .logged-out-box {
      margin-top: 28px;
      background: rgba(255, 255, 255, 0.65);
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 24px;
      padding: 36px 24px;
      text-align: center;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.12);
    }
    .logged-out-title {
      font-size: 20px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 8px;
    }
    .logged-out-sub {
      font-size: 14px;
      color: var(--cv-ink-muted);
      margin-bottom: 24px;
      line-height: 1.5;
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
    .cta-google {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #ffffff;
      color: var(--cv-ink);
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(46, 39, 31, 0.08);
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .cta-google:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(46, 39, 31, 0.14);
      border-color: var(--cv-ink-30);
    }
    .footer-login-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-55);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .footer-login-btn:hover {
      border-color: var(--cv-ink-30);
      color: var(--cv-ink);
      background: rgba(255, 255, 255, 0.4);
    }
    .admin-logout {
      margin-top: 12px;
      background: transparent;
      border: 1.5px solid var(--cv-ink-14);
      color: var(--cv-ink-muted);
      border-radius: 12px;
      padding: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      width: 100%;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    .admin-logout:hover {
      border-color: #e53935;
      color: #e53935;
    }
    .your-sets-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: 1.5px solid var(--cv-ink-14);
      z-index: 10;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .your-sets-btn:hover {
      background: var(--cv-ink-08);
    }
    .your-sets-btn:active {
      transform: scale(0.96);
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        top: 24px;
        right: 64px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  `;C([k({type:String})],N.prototype,"genre",2);C([k({type:String})],N.prototype,"mood",2);C([k({type:Number})],N.prototype,"length",2);C([u()],N.prototype,"freeText",2);C([u()],N.prototype,"placeholderIdx",2);C([u()],N.prototype,"llmSuggestion",2);C([u()],N.prototype,"llmResolved",2);C([u()],N.prototype,"classifyError",2);C([u()],N.prototype,"expandedGenre",2);C([u()],N.prototype,"expandedMood",2);C([u()],N.prototype,"mascot",2);C([u()],N.prototype,"mascotSlot",2);C([u()],N.prototype,"peekMascot",2);C([u()],N.prototype,"peekSide",2);C([k({type:Boolean})],N.prototype,"isAuthenticated",2);C([k({type:Boolean})],N.prototype,"isAdmin",2);C([u()],N.prototype,"currentProvider",2);C([u()],N.prototype,"currentModel",2);C([u()],N.prototype,"showAdminModal",2);C([u()],N.prototype,"isClassifying",2);C([u()],N.prototype,"loadingMsgIdx",2);C([u()],N.prototype,"googleRemaining",2);C([u()],N.prototype,"googleLimit",2);C([u()],N.prototype,"googleCooldownSec",2);C([u()],N.prototype,"orRemaining",2);C([u()],N.prototype,"orLimit",2);C([u()],N.prototype,"capacityCharges",2);C([u()],N.prototype,"rechargeNextSec",2);C([u()],N.prototype,"showCapacityNote",2);C([u()],N.prototype,"paradeTrigger",2);N=C([V("seed-screen")],N);var es=Object.defineProperty,ts=Object.getOwnPropertyDescriptor,j=(e,t,i,s)=>{for(var o=s>1?void 0:s?ts(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&es(t,i,o),o};const is=["C","D","E","F","G","A","B"],os=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],ss=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],rs=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}];let R=class extends Y{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=0,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=e=>{e.preventDefault(),this.dragStartY=e.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=e=>{this.dragging&&(this.dragY=Math.max(0,e.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const e=Math.max(1,performance.now()-this.dragStartTime),t=this.dragY/e,i=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>i*.3||t>.6;this.snapping=!0,s?(this.dragY=i+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(e){e.target===e.currentTarget&&this.close()}setQuality(e){this.quality=e,this.previewVoicing(),this.commitVoicing()}setExtension(e){this.extension=e,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const e=lt(this.chord.name),t=e.includes("b"),i=ct(e,this.quality,this.extension,t);this.emit("voicing-preview",i)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(e){e.has("resetKey")&&(this.quality="Major",this.extension="None")}render(){const e=this.chord,t=lt(e.name),i=t.includes("b"),s=this.mode==="voicing"?ct(t,this.quality,this.extension,i):e.notes,o=ke(e.tension),r=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return c`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${r} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div>
            ${this.mode==="voicing"?c`
              <div class="step-label">Chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Adjust the voicing.</div>
            `:c`
              <div class="step-label">Swap chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Choose the feeling<br />you want instead.</div>
            `}
          </div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>

        <div class="sheet-body">
        <div class="current-row">
          <div class="alt-shape" style="width:${Math.round(o.size*.5)}px;height:${Math.round(o.size*.5)}px;border-radius:${Math.round(o.radius*.5)}px;background:${o.color};"></div>
          <div>
            <div class="current-label">${this.mode==="voicing"?e.functionLabel:"Currently"}</div>
            <div class="current-name">${this.mode==="voicing"?e.name:c`${e.name} — ${e.functionLabel}`}</div>
          </div>
        </div>

        ${this.mode==="swap"?c`
          <div class="alt-list">
            ${this.alternatives.map(n=>{const a=ke(n.chord.tension),l=Math.round(a.size*.4);return c`
                <div class="alt-row" @click=${()=>this.emit("select-alternative",n)}>
                  <div class="alt-shape" style="width:${l}px;height:${l}px;border-radius:${Math.round(a.radius*(l/a.size))}px;background:${a.color};"></div>
                  <div style="flex:1;min-width:0;">
                    <div class="alt-name">${n.label}</div>
                    <div class="alt-sub">${n.sub}</div>
                    ${this.showTheory?c`
                      <div class="alt-tag">${n.functionCaption}</div>
                      <div class="alt-desc">${n.rationale}</div>
                    `:""}
                  </div>
                  <div class="alt-arrow">→</div>
                </div>
              `})}
          </div>
        `:""}

        ${this.mode==="voicing"?c`
          <div class="voicing-section">
            <div>
              <div class="bento">
                ${ss.map(n=>c`
                  <div class="bento-card" style=${n.label===this.quality?`background:${this.moodColor}`:""} @click=${()=>this.setQuality(n.label)}>
                    <div class="bento-label">${n.label}</div>
                    <div class="bento-sub">${n.sub}</div>
                  </div>
                `)}
              </div>
              <div class="bento ext">
                ${rs.map((n,a)=>c`
                  <div class="bento-card ${a===0?"span":""}" style=${n.label===this.extension?`background:${this.moodColor}`:""} @click=${()=>this.setExtension(n.label)}>
                    <div class="bento-label">${n.label}</div>
                    <div class="bento-sub">${n.sub}</div>
                  </div>
                `)}
              </div>
              <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
              <div class="keyboard">
                ${is.map(n=>c`
                  <div class="white-key ${s.includes(n)?"active":""}" style=${s.includes(n)?`background:${this.moodColor}`:""}>${n}</div>
                `)}
                ${os.map(n=>c`
                  <div class="black-key" style="left:${n.left};${s.includes(n.note)||s.includes(n.flat)?`background:${this.moodColor}`:""}"></div>
                `)}
              </div>
            </div>
          </div>
        `:""}
        </div>
      </div>
    `}};R.styles=G`
    :host {
      display: contents;
      font-family: var(--cv-font);
    }
    .scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0);
      z-index: 40;
      transition: background 0.28s ease;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.5);
    }
    .sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 640px;
      margin: 0 auto;
      max-height: 84%;
      background: var(--cv-cream);
      border-radius: 24px 24px 0 0;
      z-index: 41;
      padding: 14px 24px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px -20px rgba(46, 39, 31, 0.3);
      transform: translateY(100%);
      transition: transform 0.32s cubic-bezier(.32,.72,0,1);
    }
    .sheet-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber {
      width: 36px;
      height: 4px;
      background: var(--cv-ink-16);
      align-self: center;
      margin-bottom: 16px;
      flex-shrink: 0;
      border-radius: 2px;
      touch-action: none;
      cursor: grab;
    }
    .head-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .step-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .sheet-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink);
      line-height: 1.2;
    }
    .close-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: var(--cv-ink);
      cursor: pointer;
      border: none;
      flex-shrink: 0;
    }

    .current-row {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--cv-surface);
      border-radius: 18px;
      padding: 16px 18px;
      margin-top: 20px;
      flex-shrink: 0;
    }
    .current-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-label);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .current-name {
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-top: 2px;
    }
    .alt-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
      overflow-y: auto;
    }
    .alt-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--cv-surface);
      border-radius: 16px;
      padding: 12px 14px;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }
    .alt-row:hover {
      transform: translateY(-2px);
    }
    .alt-shape {
      flex-shrink: 0;
    }
    .alt-name {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .alt-sub {
      font-size: 12.5px;
      color: var(--cv-ink-muted);
      margin-top: 2px;
    }
    .alt-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: var(--cv-plum);
      margin-top: 7px;
    }
    .alt-desc {
      font-size: 12px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
      line-height: 1.4;
    }
    .alt-arrow {
      font-size: 15px;
      color: var(--cv-ink-35);
      flex-shrink: 0;
    }
    .voicing-section {
      border-top: 1px solid var(--cv-ink-10);
      margin-top: 16px;
      padding-top: 14px;
      flex-shrink: 0;
    }

    .bento {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 10px;
    }
    .bento.ext {
      margin-top: 6px;
    }
    .bento-card {
      padding: 10px 12px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      gap: 6px;
      background: var(--cv-surface);
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease);
    }
    .bento-card.span {
      grid-column: 1 / -1;
    }
    .bento-card:active {
      transform: scale(0.97);
    }
    .bento-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .bento-sub {
      font-size: 10.5px;
      color: var(--cv-ink-45);
    }
    .kb-caption {
      font-size: 11px;
      color: var(--cv-ink-45);
      margin-top: 10px;
    }
    .keyboard {
      position: relative;
      display: flex;
      margin-top: 6px;
      border-radius: 10px;
      overflow: hidden;
    }
    .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      border-right: 1px solid var(--cv-ink-08);
      font-size: 10px;
      font-weight: 700;
      background: var(--cv-cream);
      color: var(--cv-ink-35);
    }
    .white-key.active {
      color: var(--cv-ink);
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink);
      border-radius: 0 0 6px 6px;
      z-index: 2;
    }
  `;j([k({type:Object})],R.prototype,"chord",2);j([k({type:Array})],R.prototype,"alternatives",2);j([k({type:Boolean})],R.prototype,"showTheory",2);j([k({type:String})],R.prototype,"moodColor",2);j([k({type:Number})],R.prototype,"position",2);j([k({type:Number})],R.prototype,"total",2);j([k({type:String})],R.prototype,"mode",2);j([k({type:Boolean})],R.prototype,"visible",2);j([k({type:Number})],R.prototype,"resetKey",2);j([u()],R.prototype,"quality",2);j([u()],R.prototype,"extension",2);j([u()],R.prototype,"dragY",2);j([u()],R.prototype,"dragging",2);j([u()],R.prototype,"snapping",2);j([Xt(".sheet")],R.prototype,"sheetEl",2);R=j([V("swap-sheet")],R);var ns=Object.defineProperty,as=Object.getOwnPropertyDescriptor,fi=(e,t,i,s)=>{for(var o=s>1?void 0:s?as(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&ns(t,i,o),o};const ls=Z`
  <svg width="100" height="142" viewBox="0 0 240 340">
    <defs>
      <linearGradient id="m8-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a2d32" />
        <stop offset="100%" stop-color="#15171a" />
      </linearGradient>
      <linearGradient id="m8-key-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3c4046" />
        <stop offset="100%" stop-color="#1d2024" />
      </linearGradient>
      <linearGradient id="m8-key-top-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a2c30" />
        <stop offset="100%" stop-color="#141518" />
      </linearGradient>
      <filter id="m8-key-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
      </filter>
    </defs>
    <rect x="2" y="2" width="236" height="336" rx="14" fill="url(#m8-body-grad)" stroke="#3e434a" stroke-width="1.5" />
    <rect x="18" y="18" width="204" height="132" rx="6" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
    <rect x="24" y="24" width="192" height="120" rx="3" fill="#070c12" />
    <text x="32" y="44" fill="#ff4d6d" font-family="monospace" font-size="9" font-weight="bold">SONG</text>
    <text x="185" y="44" fill="#00e5ff" font-family="monospace" font-size="8" text-anchor="end">T▸140</text>
    <text x="56" y="44" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.6">1  2  3  4  5  6  7  8</text>
    <text x="32" y="58" fill="#00e5ff" font-family="monospace" font-size="7">00 C4 D4 E4 G4 A4 C5 D5 E5</text>
    <text x="32" y="68" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">01 -- -- -- -- -- -- -- --</text>
    <text x="32" y="78" fill="#00e5ff" font-family="monospace" font-size="7">02 E4 G4 A4 C5 D5 E5 G5 A5</text>
    <text x="32" y="88" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">03 -- -- -- -- -- -- -- --</text>
    <text x="32" y="98" fill="#00e5ff" font-family="monospace" font-size="7">04 A4 C5 D5 E5 G5 A5 C6 D6</text>
    <text x="32" y="108" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">05 -- -- -- -- -- -- -- --</text>
    <g transform="translate(24, 178)">
      <path d="M0,0 h16 v4 h-16 z M0,6 h16 v2 h-16 z" fill="#717780" />
      <text x="0" y="16" fill="#8d94a0" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">M8</text>
    </g>
    <rect x="124" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="126" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="143" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⚯ OPT</text>
    <rect x="174" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="176" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="193" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">✶ EDIT</text>
    <text x="93" y="172" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▴</text>
    <rect x="74" y="176" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="76" y="178" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="16" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">◂</text>
    <rect x="24" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="26" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="93" y="274" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▾</text>
    <rect x="74" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="76" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="170" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▸</text>
    <rect x="124" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="126" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <rect x="74" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="76" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="93" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⇪ SHIFT</text>
    <rect x="124" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
    <rect x="126" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
    <text x="143" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">▸ PLAY</text>
    <g transform="translate(24, 286)" fill="#090a0c">
      <rect x="0" y="0" width="16" height="2" rx="0.5" /><rect x="0" y="4" width="16" height="2" rx="0.5" />
      <rect x="0" y="8" width="16" height="2" rx="0.5" /><rect x="0" y="12" width="16" height="2" rx="0.5" />
      <rect x="0" y="16" width="16" height="2" rx="0.5" />
    </g>
    <g transform="translate(198, 286)" fill="#090a0c">
      <rect x="0" y="0" width="16" height="2" rx="0.5" /><rect x="0" y="4" width="16" height="2" rx="0.5" />
      <rect x="0" y="8" width="16" height="2" rx="0.5" /><rect x="0" y="12" width="16" height="2" rx="0.5" />
      <rect x="0" y="16" width="16" height="2" rx="0.5" />
    </g>
  </svg>
`,cs=Z`
  <svg width="100" height="142" viewBox="0 0 240 340">
    <defs>
      <linearGradient id="ct-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a2d32" />
        <stop offset="100%" stop-color="#15171a" />
      </linearGradient>
      <linearGradient id="ct-knob-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3c4046" />
        <stop offset="100%" stop-color="#1d2024" />
      </linearGradient>
      <linearGradient id="ct-knob-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a2c30" />
        <stop offset="100%" stop-color="#141518" />
      </linearGradient>
      <filter id="ct-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect x="2" y="52" width="236" height="236" rx="14" fill="url(#ct-body-grad)" stroke="#3e434a" stroke-width="1.5" />
    <text x="18" y="74" fill="#e2e8f0" font-family="sans-serif" font-size="10" font-weight="900" letter-spacing="1">CIRCUIT TRACKS</text>
    <g transform="translate(202, 60)">
      <rect x="0" y="0" width="18" height="18" rx="4" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
      <path d="M4 14 L14 4" stroke="#ab8b61" stroke-width="2.5" stroke-linecap="round" />
      <path d="M7 14 L14 7" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <g transform="translate(32, 104) rotate(-45)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="32" y="118" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VOLUME</text>
    <circle cx="32" cy="112" r="1.5" fill="#f59e0b" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(76, 104) rotate(30)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="76" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 2 MOD</text>
    <circle cx="76" cy="112" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(120, 104) rotate(90)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="120" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT ENV</text>
    <circle cx="120" cy="112" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(164, 104) rotate(-90)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="164" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">RESONANCE</text>
    <circle cx="164" cy="112" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(208, 104) rotate(15)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="208" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX DEPTH</text>
    <circle cx="208" cy="112" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(54, 138) rotate(-60)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="54" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 1 MOD</text>
    <circle cx="54" cy="146" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(98, 138) rotate(45)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="98" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">AMP ENV</text>
    <circle cx="98" cy="146" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(142, 138) rotate(0)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="142" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT FREQ</text>
    <circle cx="142" cy="146" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(186, 138) rotate(120)">
      <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="186" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MODULATION</text>
    <circle cx="186" cy="146" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>
    <g transform="translate(208, 138) rotate(-20)">
      <circle cx="0" cy="0" r="11" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
      <circle cx="0" cy="0" r="11" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
      <circle cx="0" cy="0" r="8" fill="url(#ct-knob-cap-grad)"/>
      <line x1="0" y1="-2" x2="0" y2="-10" stroke="#ab8b61" stroke-width="1.5" stroke-linecap="round"/>
    </g>
    <text x="208" y="153" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MST FILTER</text>
    <circle cx="208" cy="148" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>
    <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
      <rect x="22" y="168" width="16" height="8" rx="1.5" /><rect x="42" y="168" width="16" height="8" rx="1.5" />
      <rect x="62" y="168" width="16" height="8" rx="1.5" /><rect x="82" y="168" width="16" height="8" rx="1.5" />
      <rect x="102" y="168" width="16" height="8" rx="1.5" /><rect x="122" y="168" width="16" height="8" rx="1.5" />
      <rect x="142" y="168" width="16" height="8" rx="1.5" /><rect x="162" y="168" width="16" height="8" rx="1.5" />
      <rect x="182" y="168" width="16" height="8" rx="1.5" /><rect x="202" y="168" width="16" height="8" rx="1.5" />
    </g>
    <polygon points="47,171 53,171 50,174" fill="#717780" />
    <polygon points="67,173 73,173 70,170" fill="#717780" />
    <rect x="85" y="171" width="3" height="2" rx="0.5" fill="#ab8b61" />
    <rect x="105" y="171" width="10" height="2" fill="#717780" />
    <circle cx="129" cy="172" r="1.5" fill="#717780" />
    <circle cx="149" cy="172" r="1.5" fill="#717780" />
    <rect x="167" y="171" width="6" height="2" fill="#717780" />
    <rect x="187" y="171" width="6" height="2" fill="#717780" />
    <text x="210" y="174" fill="#ab8b61" font-family="sans-serif" font-size="4" text-anchor="middle" font-weight="bold">SHIFT</text>
    <g stroke="#2e3136" stroke-width="0.5">
      <rect x="22" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" /><rect x="42" y="180" width="16" height="8" rx="1.5" fill="#db2777" />
      <rect x="62" y="180" width="16" height="8" rx="1.5" fill="#9333ea" /><rect x="82" y="180" width="16" height="8" rx="1.5" fill="#2563eb" />
      <rect x="102" y="180" width="16" height="8" rx="1.5" fill="#3b82f6" /><rect x="122" y="180" width="16" height="8" rx="1.5" fill="#e11d48" />
      <rect x="142" y="180" width="16" height="8" rx="1.5" fill="#f43f5e" /><rect x="162" y="180" width="16" height="8" rx="1.5" fill="#ea580c" />
      <rect x="182" y="180" width="16" height="8" rx="1.5" fill="#d97706" /><rect x="202" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" />
    </g>
    <text x="30" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PRESET</text>
    <text x="210" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PTN</text>
    <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
      <rect x="16" y="198" width="16" height="13" rx="2" /><rect x="16" y="216" width="16" height="13" rx="2" />
      <rect x="16" y="234" width="16" height="13" rx="2" /><rect x="16" y="252" width="16" height="13" rx="2" />
    </g>
    <text x="24" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">NOTE</text>
    <text x="24" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VEL</text>
    <text x="24" y="242" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">GATE</text>
    <text x="24" y="260" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">PTN</text>
    <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
      <rect x="208" y="198" width="16" height="13" rx="2" /><rect x="208" y="216" width="16" height="13" rx="2" />
      <rect x="208" y="234" width="16" height="13" rx="2" /><rect x="208" y="252" width="16" height="13" rx="2" />
    </g>
    <text x="216" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MIX</text>
    <text x="216" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX</text>
    <circle cx="216" cy="240.5" r="3.5" fill="#ef4444" filter="url(#ct-glow-cyan)" />
    <polygon points="214,255.5 214,261.5 219,258.5" fill="#22c55e" filter="url(#ct-glow-cyan)" />
    <g stroke="#090a0c" stroke-width="0.5">
      <rect x="38" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="59" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="80" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="101" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="122" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="143" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="164" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="185" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
      <rect x="38" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="59" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="80" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="101" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="122" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="143" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="164" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="185" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
      <rect x="38" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="59" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="80" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="101" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="122" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="143" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="164" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="185" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
      <rect x="38" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="59" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="80" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="101" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="122" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="143" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="164" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
      <rect x="185" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
    </g>
  </svg>
`,ds=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:ls},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:cs}];let je=class extends Y{constructor(){super(...arguments),this.visible=!1,this.onKeyDown=e=>{e.key==="Escape"&&this.visible&&this.emit("close")}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}render(){return c`
      <div class="backdrop ${this.visible?"visible":""}" @click=${()=>this.emit("close")}></div>
      <div class="modal ${this.visible?"visible":""}">
        <div class="head-row">
          <div>
            <div class="title">Share progression</div>
            <div class="desc">Send this loop to a device — opens its companion helper with the progression loaded.</div>
          </div>
          <button class="close-btn" @click=${()=>this.emit("close")}>×</button>
        </div>
        <div class="dest-row">
          ${ds.map(e=>c`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",e)}>
              ${e.svg}
              <div class="dest-name">${e.name}</div>
              <div class="dest-desc">${e.desc}</div>
            </div>
          `)}
        </div>
        <div class="section-header">SAVE TO THIS DEVICE</div>
        <div class="save-list">
          <div class="save-card ${this.visible?"visible":""}" @click=${()=>this.emit("export-wav")}>
            <div class="save-badge">WAV</div>
            <div class="save-info">
              <div class="save-title">Save as WAV</div>
              <div class="save-desc">Rendered audio, ready to drop into any player.</div>
            </div>
          </div>
          <div class="save-card ${this.visible?"visible":""}" @click=${()=>this.emit("export-midi")}>
            <div class="save-badge">MID</div>
            <div class="save-info">
              <div class="save-title">Save as MIDI</div>
              <div class="save-desc">Just the notes — reopen it in your own instrument.</div>
            </div>
          </div>
        </div>
      </div>
    `}};je.styles=G`
    :host {
      display: block;
      font-family: var(--cv-font);
    }
    .backdrop {
      position: fixed;
      inset: -2px;
      z-index: 58;
      background: rgba(46, 39, 31, 0);
      transition: background 0.26s ease, backdrop-filter 0.26s ease;
    }
    .backdrop.visible {
      background: rgba(46, 39, 31, 0.5);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }
    .modal {
      position: absolute;
      left: 20px;
      right: 20px;
      max-width: 560px;
      margin: 0 auto;
      top: 50%;
      background: var(--cv-cream);
      border-radius: 24px;
      box-shadow: 0 30px 60px -20px rgba(46, 39, 31, 0.4);
      z-index: 59;
      padding: 26px;
      box-sizing: border-box;
      opacity: 0;
      transform: translateY(calc(-50% + 14px)) scale(0.92);
      transition: opacity 0.26s cubic-bezier(.16,1,.3,1), transform 0.3s cubic-bezier(.16,1,.3,1);
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
    .head-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink);
    }
    .desc {
      font-size: 12.5px;
      color: var(--cv-ink-muted);
      margin-top: 6px;
      line-height: 1.5;
      max-width: 260px;
    }
    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--cv-surface);
      font-size: 16px;
      color: var(--cv-ink);
      cursor: pointer;
      flex-shrink: 0;
      margin-left: 10px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dest-row {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    .dest-card {
      flex: 1;
      background: var(--cv-surface);
      border-radius: 18px;
      padding: 14px 10px 16px;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      opacity: 0;
      transform: translateY(8px);
      transition: transform 0.18s ease, opacity 0.3s ease;
    }
    .dest-card:nth-child(2) {
      transition-delay: 0.06s;
    }
    .dest-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .dest-card:hover {
      transform: translateY(-3px);
    }
    .dest-name {
      font-size: 12px;
      letter-spacing: 0.4px;
      font-weight: 700;
      color: var(--cv-ink);
      margin-top: 8px;
    }
    .dest-desc {
      font-size: 11px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
      line-height: 1.4;
    }
    .section-header {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .save-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .save-card {
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 14px 18px;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 16px;
      opacity: 0;
      transform: translateY(8px);
      transition: transform 0.18s ease, opacity 0.3s ease, background-color 0.15s ease;
    }
    .save-card:nth-child(1) {
      transition-delay: 0.08s;
    }
    .save-card:nth-child(2) {
      transition-delay: 0.14s;
    }
    .save-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .save-card:hover {
      transform: translateY(-2px);
      background: var(--cv-surface-2, #F1E4CC);
    }
    .save-badge {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-label, #8A6B3F);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .save-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      text-align: left;
    }
    .save-title {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.01em;
    }
    .save-desc {
      font-size: 12.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.4;
    }
  `;fi([k({type:Boolean})],je.prototype,"visible",2);je=fi([V("share-modal")],je);function Ut(e){const t={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=e.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const s=i[1].charAt(0).toUpperCase()+i[1].slice(1),o=t[s]??0,r=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+o))}function vi(e,t,i){const s=t&&t.length>0?t.map(v=>e.chords[v]).filter(v=>!!v):e.chords,o=e.bpm||120,r=1.7,n=i?ue.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,a=wt[e.genre]||{},l=n?.patch??{},d={...a,...l},g=a.duration??.9,m=l.durationMultiplier?g*l.durationMultiplier:g,y=[];return s.forEach((v,x)=>{const p=x*r,b=(v.notes&&v.notes.length>0?v.notes:["C","E","G"]).map(T=>`${T}4`);if(d.arpMode&&d.arpMode!=="off"){const T=d.arpRate??"1/16",w=d.arpRange??1,E=d.arpMode,P=ui(T,o),_=gi(b,w),q=mi(_,E),Ae=d.duration?d.duration:Math.max(.6,m);q.forEach((f,O)=>{const H=p+O*P;y.push({note:f,midi:Ut(f),startTime:H,duration:Ae})})}else{const T=d.spread??0;b.forEach((w,E)=>{const P=E*T*.1,_=p+P;y.push({note:w,midi:Ut(w),startTime:_,duration:m})})}}),y}function hs(e){const t=[];let i=Math.max(0,Math.floor(e));for(t.push(i&127);(i>>=7)>0;)t.unshift(i&127|128);return t}function ps(e,t,i){const s=e.bpm||120,o=480,r=vi(e,t,i),n=[];r.forEach(p=>{const h=Math.round(p.startTime/(60/s)*o),b=Math.max(1,Math.round(p.duration/(60/s)*o));n.push({tick:h,type:"on",midi:p.midi}),n.push({tick:h+b,type:"off",midi:p.midi})}),n.sort((p,h)=>p.tick!==h.tick?p.tick-h.tick:p.type!==h.type?p.type==="off"?-1:1:p.midi-h.midi);const a=[],l=Math.round(6e7/s);a.push(0),a.push(255,81,3),a.push(l>>16&255,l>>8&255,l&255);const d="Chroma Chords";a.push(0),a.push(255,3,d.length);for(let p=0;p<d.length;p++)a.push(d.charCodeAt(p));let g=0;n.forEach(p=>{const h=p.tick-g;g=p.tick,a.push(...hs(h)),p.type==="on"?a.push(144,p.midi,80):a.push(128,p.midi,0)}),a.push(0),a.push(255,47,0);const m=[77,84,104,100,0,0,0,6,0,0,0,1,o>>8&255,o&255],y=a.length,v=[77,84,114,107,y>>24&255,y>>16&255,y>>8&255,y&255],x=new Uint8Array(m.length+v.length+a.length);return x.set(m,0),x.set(v,m.length),x.set(a,m.length+v.length),x}function us(e,t,i,s){const o=ps(e,t,s),r=new Blob([o],{type:"audio/midi"}),n=(e.key||"C").toLowerCase(),a=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=e.bpm||120,d=`chroma-chords-${n}-${a}-${l}bpm.mid`;yi(r,d)}function gs(e,t){const i=new qt({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((e?pe.find(r=>r.name.toLowerCase()===e.toLowerCase()):void 0)?.instrument??(t?bt[t]:void 0)??"rhodes"){case"bell":return new U(ye,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new U(ye,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new U(ee,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new U(ee,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const r=new Vt({decay:4.5,wet:.35}).connect(i);return new U(ee,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new Yt({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new U(ee,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new U(Gt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new U(ye,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function ms(e){const t=e.numberOfChannels,i=e.sampleRate,s=16,o=s/8,r=t*o,n=e.length*t*o,a=new ArrayBuffer(44+n),l=new DataView(a),d=(y,v)=>{for(let x=0;x<v.length;x++)l.setUint8(y+x,v.charCodeAt(x))};d(0,"RIFF"),l.setUint32(4,36+n,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,t,!0),l.setUint32(24,i,!0),l.setUint32(28,i*r,!0),l.setUint16(32,r,!0),l.setUint16(34,s,!0),d(36,"data"),l.setUint32(40,n,!0);const g=[];for(let y=0;y<t;y++)g.push(e.getChannelData(y));let m=44;for(let y=0;y<e.length;y++)for(let v=0;v<t;v++){const x=Math.max(-1,Math.min(1,g[v][y])),p=x<0?x*32768:x*32767;l.setInt16(m,p,!0),m+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function fs(e,t,i,s){const o=vi(e,t,s);if(!o.length)return;const n=o.reduce((v,x)=>Math.max(v,x.startTime+x.duration),0)+1.2,a=await Ai(async()=>{const v=gs(i,e.genre);o.forEach(x=>{v.triggerAttackRelease(x.note,x.duration,x.startTime)})},n),l=ms(a.get()),d=(e.key||"C").toLowerCase(),g=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),m=e.bpm||120,y=`chroma-chords-${d}-${g}-${m}bpm.wav`;yi(l,y)}function yi(e,t){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(e);if(typeof document>"u")return;const s=document.createElement("a");s.href=i,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var vs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,ge=(e,t,i,s)=>{for(var o=s>1?void 0:s?ys(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&vs(t,i,o),o};let oe=class extends Y{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(e){e.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const e=this.name.trim();e&&(this.dispatchEvent(new CustomEvent("save",{detail:e})),this.close())}onInput(e){this.name=e.target.value}onKeyDown(e){e.key==="Escape"?this.close():e.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?c`
      <div class="scrim ${this.visible?"visible":""}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.visible?"visible":""}" role="dialog" aria-modal="true">
          <h2>Name this set</h2>
          <div class="subtitle">Give it a name so you can find it later.</div>
          
          <div class="input-wrap">
            <input
              type="text"
              class="name-input"
              .value=${this.name}
              @input=${this.onInput}
              @keydown=${this.onKeyDown}
              placeholder="e.g. 2am drive"
              maxlength="50"
            />
          </div>
          
          <div class="actions">
            <button class="btn cancel" @click=${this.close}>Cancel</button>
            <button class="btn save" @click=${this.save} ?disabled=${!this.name.trim()}>Save</button>
          </div>
        </div>
      </div>
    `:c``}};oe.styles=G`
    :host {
      display: block;
    }
    .scrim {
      position: fixed;
      inset: -2px;
      z-index: 100;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
      pointer-events: none;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.4);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      pointer-events: auto;
    }
    .modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 101;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      pointer-events: none;
    }
    .modal {
      background: var(--cv-cream);
      border-radius: 24px;
      padding: 28px 32px;
      width: 100%;
      max-width: 420px;
      box-sizing: border-box;
      box-shadow: 0 24px 44px -18px rgba(46, 39, 31, 0.35);
      opacity: 0;
      transform: translateY(8px) scale(0.96);
      transition: opacity 0.24s cubic-bezier(.16,1,.3,1), transform 0.26s cubic-bezier(.16,1,.3,1);
      pointer-events: auto;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    h2 {
      margin: 0 0 6px 0;
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink);
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 14.5px;
      color: var(--cv-ink-muted);
      margin-bottom: 24px;
    }
    .input-wrap {
      margin-bottom: 24px;
    }
    .name-input {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 12px;
      padding: 14px 16px;
      font-size: 15px;
      font-family: var(--cv-font);
      color: var(--cv-ink);
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .name-input:focus {
      border-color: var(--cv-ink);
      box-shadow: 0 0 0 4px rgba(46, 39, 31, 0.08);
    }
    .name-input::placeholder {
      color: var(--cv-ink-30);
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn {
      border: none;
      background: none;
      font-family: inherit;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      padding: 12px 24px;
      border-radius: 100px;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    .btn:active {
      transform: scale(0.96);
    }
    .btn.cancel {
      color: var(--cv-ink-muted);
    }
    .btn.cancel:hover {
      color: var(--cv-ink);
    }
    .btn.save {
      background: var(--cv-ink);
      color: var(--cv-cream);
    }
    .btn.save:hover {
      opacity: 0.9;
    }
    .btn.save:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  `;ge([k({type:Boolean})],oe.prototype,"visible",2);ge([k({type:String})],oe.prototype,"defaultName",2);ge([u()],oe.prototype,"mounted",2);ge([u()],oe.prototype,"name",2);ge([Xt(".name-input")],oe.prototype,"inputEl",2);oe=ge([V("save-set-modal")],oe);var xs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,A=(e,t,i,s)=>{for(var o=s>1?void 0:s?bs(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&xs(t,i,o),o};const ws=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],st=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],ks=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Ts=["Warm","Melancholy","Nostalgic","Dreamy"],Ss=["Piano","Rhodes","Nylon Guitar","Warm Pad"],Is=["Block chords","Arpeggio","Strum","Broken (swing)"],As=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Ft=220,Ns=280,zt={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let S=class extends Y{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.isAuthenticated=!1,this.isBookmarked=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.flashedIndex=null,this.expandedMenuGenre=!1,this.expandedMenuMood=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.saveModalVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=he(.35),this.mascotSlot=Te(ws),this.panelPeekMascot=he(.18),this.panelPeekSide=Te(["left","right"]),this.eggCounter=new Tt,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=e=>{if(this.lastPointerX=e.clientX,this.lastPointerY=e.clientY,this.pressTimer&&!this.drag){(Math.abs(e.clientY-this.pressStartY)>8||Math.abs(e.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:e.clientX-this.pressStartX,offsetY:e.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const e=this.drag.pos;this.drag=null,this.pressTapFn=null;const t=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let i=e,s=1/0;if(t.forEach((o,r)=>{if(r===e)return;const n=o.getBoundingClientRect(),a=n.left+n.width/2,l=n.top+n.height/2,d=(this.lastPointerX-a)**2+(this.lastPointerY-l)**2;d<s&&(s=d,i=r)}),i!==e){const o=[...this.order],[r]=o.splice(e,1);o.splice(i,0,r),this.emit("reorder",o)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),e.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Ns)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1},Ft)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Ft)}exportDevice(e,t){this.closeShare();const i=xo(this.progression,e,this.order);window.open(i,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=`Sent to ${t}`,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}async handleExportWav(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer),this.toast="Rendering WAV audio...";try{const e=this.progression,t=this.instrument??Pe(e.genre),i=this.playStyle??Be(e.genre);await fs(e,this.order,t,i),this.toast="Saved WAV audio file"}catch(e){console.error("WAV export error:",e),this.toast="Failed to export WAV"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}handleExportMidi(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer);try{const e=this.progression,t=this.instrument??Pe(e.genre),i=this.playStyle??Be(e.genre);us(e,this.order,t,i),this.toast="Saved MIDI file"}catch(e){console.error("MIDI export error:",e),this.toast="Failed to export MIDI"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(e,t,i){i.preventDefault(),this.pressTapFn=t,this.pressStartX=i.clientX,this.pressStartY=i.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:e,offsetX:0,offsetY:0}},150)}previewChordTile(e){this.flashedIndex=e,setTimeout(()=>{this.flashedIndex===e&&(this.flashedIndex=null)},320),this.emit("chord-preview",e)}dragStyleFor(e){const t=this.drag;return t&&t.pos===e?`transform:translate(${t.offsetX}px, ${t.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderHeaderTitle(e,t){if(e.searchTerm){const i=e.searchTerm.trim(),o=(i.endsWith(".")?i.slice(0,-1):i).split(/\s+/);if(o.length===1)return c`<h1><span style="color:${t}">${o[0]}.</span></h1>`;const r=o.slice(0,-1).join(" "),n=o[o.length-1];return c`<h1>${r} <span style="color:${t}">${n}.</span></h1>`}return c`<h1>Your progression, feeling <span style="color:${t}">${e.mood.toLowerCase()}.</span></h1>`}renderLengthControl(){const e=this.progression.chords.length;return c`
      <div class="length-control">
        <div class="length-btn ${e<=ne?"disabled":""}" @click=${()=>e>ne&&this.emit("set-length",e-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:z},(t,i)=>c`<div class="length-segment ${i<e?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${e>=z?"disabled":""}" @click=${()=>e<z&&this.emit("set-length",e+1)}>+</div>
        <div class="length-label-text">${e} ${e===1?"bar":"bars"}</div>
      </div>
    `}render(){const e=this.progression,t=be(e.mood),i=this.instrument??Pe(e.genre),s=this.playStyle??Be(e.genre),o=Math.max(1,this.order.length),r=this.playing?this.snapProgress?this.progressStep/o*100:Math.min(100,(this.progressStep+1)/o*100):0;zt[e.mood]||zt.Dreamy;const n=this.showTheory?go(this.order.map(f=>e.chords[f]),e.key,e.scaleType):null,a=ii(e.key,e.scaleType).length,l=a===0?"no sharps or flats":`${a} ${a===1?"sharp/flat":"sharps/flats"}`;let d=ks.filter(f=>st.includes(f));d.includes(e.genre)||(d=d.slice(0,-1).concat(e.genre));const g=st.filter(f=>!d.includes(f)),m=this.expandedMenuGenre?st:d,y=ie.map(f=>f.name);let v=Ts.filter(f=>y.includes(f));v.includes(e.mood)||(v=v.slice(0,-1).concat(e.mood));const x=y.filter(f=>!v.includes(f)),h=(this.expandedMenuMood?y:v).map(f=>ie.find(O=>O.name===f)),b=pe.filter(f=>f.name!==i);let T=Ss.filter(f=>b.some(O=>O.name===f));const w=b.filter(f=>!T.includes(f.name)),E=this.expandedAllInstruments?b:b.filter(f=>T.includes(f.name)),P=ue.filter(f=>f.name!==s);let _=Is.filter(f=>P.some(O=>O.name===f));const q=P.filter(f=>!_.includes(f.name)),Ae=this.expandedAllPlayStyles?P:P.filter(f=>_.includes(f.name));return c`
      <div class="frame">
        ${this.mascot.show?c`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}

        <div class="top-bar">
          <div class="icon-btn" @click=${()=>this.emit("back")}>‹</div>
          <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
            <svg width="18" height="18" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
            <div class="wordmark-text">Chroma Chords</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            ${this.isAuthenticated?c`
              <div class="your-sets-btn" @click=${()=>this.emit("view-sets")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span class="your-sets-text">Your sets</span>
              </div>
            `:""}
            <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
          </div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted?c`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${de.map(f=>c`
                <div class="menu-chip ${f===e.key?"selected":""}" style=${f===e.key?`background:${t}`:""} @click=${()=>this.emit("set-key",f)}>${De(f,e.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${As.map(f=>c`
                <div class="menu-chip ${f.value===e.scaleType?"selected":""}" style=${f.value===e.scaleType?`background:${t}`:""} @click=${()=>this.emit("set-scale",f.value)}>${f.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${m.map(f=>c`
                <div class="menu-chip ${f===e.genre?"selected":""}" style=${f===e.genre?`background:${t}`:""} @click=${()=>this.emit("set-genre",f)}>${f}</div>
              `)}
              ${g.length?c`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuGenre=!this.expandedMenuGenre}}>
                  ${this.expandedMenuGenre?"Show less ⌃":`+${g.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${h.map(f=>c`
                <div class="menu-chip ${f.name===e.mood?"selected":""}" style=${f.name===e.mood?`background:${f.dot}`:""} @click=${()=>this.emit("set-mood",f.name)}>${f.name}</div>
              `)}
              ${x.length?c`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuMood=!this.expandedMenuMood}}>
                  ${this.expandedMenuMood?"Show less ⌃":`+${x.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Length</div>
            ${this.renderLengthControl()}
            <div class="menu-nav-row" @click=${()=>this.openShare()}>
              <div class="menu-nav-label">Share progression</div>
              <div class="menu-nav-arrow">↗</div>
            </div>
          </div>
        `:""}

        <div class="content">
          ${this.renderHeaderTitle(e,t)}
          <div class="subcopy">Tap a chord to hear it.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?c`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((f,O)=>{const H=e.chords[f],Ne=ke(H.tension),It=O===this.activeIndex,xi=this.flashedIndex===f;return c`
                  <div
                    class="chord-chip ${It?"active":""} ${xi?"flashed":""}"
                    style="--chip-size:${Ne.size}px;--chip-radius:${Ne.radius}px;background:${Ne.color};${this.dragStyleFor(O)}"
                    @click=${()=>this.previewChordTile(f)}
                    @pointerdown=${X=>this.pressStart(O,()=>this.previewChordTile(f),X)}
                  >
                    ${this.showTheory?c`<div class="roman-badge">${H.roman}</div>`:""}
                    ${It?c`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="--chip-font:${Ne.fontSize}px;">${H.name}</div>
                    <div class="chord-role">${H.functionLabel}</div>
                    <button
                      class="swap-badge"
                      aria-label="Swap chord ${H.name}"
                      @pointerdown=${X=>X.stopPropagation()}
                      @click=${X=>{X.stopPropagation(),this.emit("chord-tap",f)}}
                    >
                      <div class="swap-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                      </div>
                    </button>
                    <button
                      class="voicing-badge"
                      aria-label="View voicing for ${H.name}"
                      @pointerdown=${X=>X.stopPropagation()}
                      @click=${X=>{X.stopPropagation(),this.emit("chord-voicing-tap",f)}}
                    >
                      <div class="voicing-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.2 10-6.2 10 6.2 10 6.2-3.6 6.2-10 6.2-10-6.2-10-6.2z" /><circle cx="12" cy="12" r="2.6" /></svg>
                      </div>
                    </button>
                  </div>
                `})}
            </div>
            </div>
          </div>

          <div class="theory-toggle-row" @click=${()=>this.emit("theory-toggle")}>
            <div class="theory-track ${this.showTheory?"on":""}"><div class="theory-knob ${this.showTheory?"on":""}"></div></div>
            <div class="theory-label">Show music theory</div>
          </div>
          ${n?c`
            <div class="theory-strip">
              <div class="theory-key-label">${De(e.key,e.scaleType)} ${e.scaleType.replace("_"," ")} · ${l}</div>
              <div class="theory-staff-scroll">
                ${Z`
                  <svg width="${n.width}" height="${n.height}" viewBox="0 0 ${n.width} ${n.height}">
                    ${n.lines.map(f=>Z`<rect x="6" y="${f}" width="${n.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${n.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${n.keySignature.map(f=>Z`<text x="${f.x}" y="${f.y+6}" font-size="20" fill="var(--cv-ink)">${f.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${n.chords.map(f=>Z`
                      <text x="${f.cx}" y="${f.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${f.name}</text>
                      ${f.ledgers.map(O=>Z`<rect x="${O.x}" y="${O.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${f.notes.map(O=>Z`<ellipse cx="${O.x}" cy="${O.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${f.cx}" y="${n.height-4}" font-size="12" font-weight="800" fill="${t}" text-anchor="middle">${f.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${t}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?c`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:c`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${r}%;background:${t};--progress-duration:${mt}ms"
              ></div>
            </div>
            <div class="dice-btn ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${t}" />
                <circle cx="8" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="12" cy="12" r="1.7" fill="#2E271F" />
                <circle cx="8" cy="16" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="16" r="1.7" fill="#2E271F" />
              </svg>
            </div>
            ${this.isAuthenticated?c`
              <div class="dice-btn" title="${this.isBookmarked?"Saved in sets":"Save set"}" @click=${()=>{this.saveModalVisible=!0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            `:""}
            <div class="control-icon-btn" aria-label="Instrument: ${i}" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div class="control-icon-btn" aria-label="Play style: ${s}" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
            </div>
          </div>
          <div class="transport-meta">${De(e.key,e.scaleType).toUpperCase()} ${e.scaleType.replace("_"," ")} · ${e.bpm} BPM</div>

          <div class="control-row">
            <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              ${i} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
            </div>
            <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
              ${s} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
            </div>
          </div>
          ${this.expandedInstrument?c`
            <div class="control-options">
              ${E.map(f=>c`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",f.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${f.color}"></span>${f.name}
                </div>
              `)}
              ${w.length?c`
                <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                  ${this.expandedAllInstruments?"Show less ⌃":`+${w.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}
          ${this.expandedPlayStyle?c`
            <div class="control-options">
              ${Ae.map(f=>c`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",f.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${f.color}"></span>${f.name}
                </div>
              `)}
              ${q.length?c`
                <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                  ${this.expandedAllPlayStyles?"Show less ⌃":`+${q.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}

          <button class="build-song-btn" style="background:${t}" @click=${()=>this.emit("view-song")}>
            Build the full song <span>→</span>
          </button>
          <div class="back-to-seed-row">
            <div class="back-to-seed-link" @click=${()=>this.emit("back")}>← Back to seed</div>
          </div>
        </div>

        ${this.sheetMounted&&this.swapChord?c`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
            .mode=${this.sheetMode}
            .moodColor=${t}
            .position=${(this.swapIndex??0)+1}
            .total=${this.order.length}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
          ></swap-sheet>
        `:""}

        ${this.shareMounted?c`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${f=>this.exportDevice(f.detail.device,f.detail.name)}
            @export-wav=${()=>this.handleExportWav()}
            @export-midi=${()=>this.handleExportMidi()}
          ></share-modal>
        `:""}

        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${`${e.genre} · ${e.mood}`}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${f=>{this.emit("save-set",f.detail),this.saveModalVisible=!1}}
        ></save-set-modal>

        ${this.toast?c`<div class="toast">${this.toast.startsWith("Sent to")||this.toast.startsWith("Saved")||this.toast.startsWith("Rendering")||this.toast.startsWith("Failed")?this.toast:`Sent to ${this.toast}`}</div>`:""}
      </div>
    `}};S.styles=G`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    @keyframes cv-panel-uplifting {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 44px 24px 40px 26px; transform: scale(1.008); }
    }
    @keyframes cv-panel-melancholy {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 22px 34px 46px 28px; transform: rotate(-0.4deg); }
    }
    @keyframes cv-panel-dreamy {
      0%, 100% { border-radius: 32px; }
      33% { border-radius: 44px 24px 42px 22px; }
      66% { border-radius: 22px 42px 24px 44px; }
    }
    @keyframes cv-panel-tense {
      0%, 100% { border-radius: 32px; transform: translateX(0); }
      20% { border-radius: 38px 22px 28px 34px; transform: translateX(-1px); }
      40% { border-radius: 22px 34px 38px 24px; transform: translateX(1px); }
      60% { border-radius: 34px 24px 22px 38px; transform: translateX(-1px); }
      80% { border-radius: 24px 38px 34px 22px; transform: translateX(1px); }
    }
    @keyframes cv-panel-warm {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 40px 34px 40px 34px; transform: scale(1.006); }
    }
    @keyframes cv-panel-nostalgic {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 24px 40px 26px 38px; transform: rotate(-0.3deg); }
    }
    @keyframes cv-bg-drift-a {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, -7px) rotate(1.5deg); }
    }
    @keyframes cv-bg-drift-b {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, 6px) rotate(-1.5deg); }
    }
    @keyframes cv-now-pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 24px 20px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 640px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }
    .top-bar > *:first-child {
      justify-self: start;
    }
    .top-bar > *:last-child {
      justify-self: end;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--cv-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink);
      cursor: pointer;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 14px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 640px;
      margin-top: 24px;
    }
    h1 {
      margin: 0;
      font-size: clamp(24px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.16;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 10px;
    }
    .panel-shell {
      position: relative;
      margin-top: 26px;
    }
    .panel {
      position: relative;
      z-index: 1;
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-08);
      border-radius: 28px;
      padding: 34px 22px;
      overflow: hidden;
      min-height: 180px;
      box-shadow: 0 30px 60px -30px rgba(46, 39, 31, 0.22);
      transition: border-radius 240ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    :focus-visible {
      outline: 2.5px solid var(--cv-ink);
      outline-offset: 2px;
    }
    /* Peeks up from behind the panel's top edge — z-index 0 vs. the panel's 1 means the
       panel's own (opaque) background paints over the lower portion, so only a small sliver
       shows above the rim, like the character is looking in through a little window. */
    .panel-peek {
      position: absolute;
      top: -16px;
      z-index: 0;
      pointer-events: none;
    }
    .panel-peek.left { left: 26px; }
    .panel-peek.right { right: 26px; }
    .panel-blob {
      position: absolute;
      opacity: 0.9;
      pointer-events: none;
    }
    .panel-blob.a {
      left: -40px;
      top: -40px;
      animation: cv-bg-drift-a 11s ease-in-out infinite;
    }
    .panel-blob.b {
      right: -30px;
      bottom: -30px;
      animation: cv-bg-drift-b 13s ease-in-out infinite;
    }
    .chip-row {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, auto);
      justify-content: center;
      justify-items: center;
      align-items: center;
      gap: 30px 14px; /* row-gap column-gap */
      z-index: 2;
    }
    .chord-chip {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      box-shadow: 0 14px 28px -14px rgba(46, 39, 31, 0.2);
      transition: transform 150ms var(--cv-ease), box-shadow 150ms var(--cv-ease);
      width: var(--chip-size, 80px);
      height: var(--chip-size, 80px);
      border-radius: var(--chip-radius, 24px);
    }
    .chord-chip.active {
      transform: scale(1.06);
      box-shadow: 0 18px 34px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-chip.flashed {
      transform: scale(1.08);
      filter: brightness(1.18);
      box-shadow: 0 0 0 4px var(--cv-cream), 0 0 0 8px var(--cv-plum, #9B7CA8), 0 20px 36px -12px rgba(46, 39, 31, 0.4);
    }
    .chord-name {
      font-weight: 800;
      color: var(--cv-ink);
      line-height: 1;
      font-size: var(--chip-font, 24px);
    }
    .chord-role {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.55);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .roman-badge {
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-size: 11px;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 100px;
      white-space: nowrap;
      box-shadow: 0 3px 8px -2px rgba(46, 39, 31, 0.4);
      z-index: 3;
    }
    .now-marker {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .now-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--cv-ink);
      animation: cv-now-pulse 1.6s ease-in-out infinite;
    }
    .now-text {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.55);
    }
    .swap-badge {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 4;
      touch-action: manipulation;
    }
    .swap-badge-inner {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 150ms var(--cv-ease);
    }
    .swap-badge:hover .swap-badge-inner {
      transform: scale(1.15);
    }
    .voicing-badge {
      position: absolute;
      bottom: -12px;
      left: -12px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 4;
      touch-action: manipulation;
    }
    .voicing-badge-inner {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 150ms var(--cv-ease);
    }
    .voicing-badge:hover .voicing-badge-inner {
      transform: scale(1.15);
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 26px;
    }
    .play-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .play-btn:hover {
      transform: scale(1.06);
    }
    .progress-track {
      flex: 1;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      /* Duration set inline to match AUTOPLAY_INTERVAL_MS so the fill sweeps continuously
         across each chord's actual hold time instead of jumping there quickly and sitting
         still — linear timing so the motion reads as constant, not eased/stepped. */
      transition: width var(--progress-duration, 1.7s) linear, background 0.4s ease;
    }
    .progress-fill.snap {
      transition: none;
    }
    .dice-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.3s ease, background 0.2s ease;
    }
    .dice-btn:hover {
      background: var(--cv-surface-2);
    }
    .dice-btn.spinning {
      transform: rotate(360deg);
    }
    .transport-meta {
      text-align: center;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .build-song-btn {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 16px;
      border-radius: 100px;
      font-family: inherit;
      font-weight: 800;
      font-size: 15px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      margin-top: 24px;
      transition: transform 160ms var(--cv-ease);
    }
    .build-song-btn:active {
      transform: scale(0.98);
    }
    .back-to-seed-row {
      margin-top: 24px;
      text-align: center;
    }
    .back-to-seed-link {
      display: inline-block;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 4px;
      transition: color 0.15s ease;
    }
    .back-to-seed-link:hover {
      color: var(--cv-ink);
    }
    .your-sets-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: 1.5px solid var(--cv-ink-14);
      z-index: 10;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .your-sets-btn:hover {
      background: var(--cv-ink-08);
    }
    .your-sets-btn:active {
      transform: scale(0.96);
    }
    .your-sets-text {
      display: inline;
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        padding: 6px 12px;
        font-size: 12px;
      }
    }
    @media (max-width: 380px) {
      .your-sets-text {
        display: none;
      }
    }
    .control-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }
    /* Mobile shows the compact icon-only buttons next to the dice instead of this text row —
       see .control-icon-btn below. */
    @media (max-width: 600px) {
      .control-row { display: none; }
    }
    .control-icon-btn {
      display: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }
    .control-icon-btn:active {
      transform: scale(0.92);
    }
    @media (max-width: 600px) {
      .control-icon-btn { display: flex; }
      /* Two extra fixed-width buttons join the transport row here — tighten gap/sizes so the
         progress bar keeps a comfortable width instead of getting squeezed to a sliver. */
      .transport { gap: 10px; }
      .play-btn { width: 48px; height: 48px; }
      .dice-btn { width: 44px; height: 44px; }
    }
    .control-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 9px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms var(--cv-ease);
    }
    .control-chip:active {
      transform: scale(0.96);
    }
    .control-chevron {
      opacity: 0.6;
    }
    .control-options {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .control-option {
      display: inline-flex;
      align-items: center;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .control-option:active {
      transform: scale(0.96);
    }
    .control-option.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
    }
    .control-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      flex-shrink: 0;
    }
    .theory-toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 22px;
      cursor: pointer;
    }
    .theory-track {
      width: 40px;
      height: 23px;
      border-radius: 100px;
      background: var(--cv-ink-16);
      position: relative;
      transition: background 150ms var(--cv-ease);
      flex-shrink: 0;
    }
    .theory-track.on {
      background: var(--cv-plum);
    }
    .theory-knob {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: var(--cv-cream);
      position: absolute;
      top: 3px;
      left: 3px;
      transition: left 150ms var(--cv-ease);
    }
    .theory-knob.on {
      left: 20px;
    }
    .theory-label {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-ink-muted);
    }
    .theory-strip {
      background: var(--cv-surface-2);
      border: 1.5px solid var(--cv-ink-10);
      border-radius: 18px;
      padding: 18px 22px;
      margin-top: 22px;
    }
    .theory-key-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label);
      text-transform: uppercase;
    }
    .theory-staff-scroll {
      overflow-x: auto;
      margin-top: 12px;
    }
    .menu-scrim {
      position: fixed;
      inset: -2px;
      z-index: 48;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
    }
    .menu-scrim.visible {
      background: rgba(46, 39, 31, 0.06);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    .menu {
      position: absolute;
      top: 68px;
      right: max(20px, calc(50% - 320px));
      width: 250px;
      background: var(--cv-cream);
      border-radius: 18px;
      box-shadow: 0 24px 44px -18px rgba(46, 39, 31, 0.35);
      z-index: 49;
      padding: 16px;
      box-sizing: border-box;
      transform-origin: top right;
      opacity: 0;
      transform: translateY(-6px) scale(0.94);
      transition: opacity 0.22s cubic-bezier(.16,1,.3,1), transform 0.26s cubic-bezier(.16,1,.3,1);
    }
    .menu.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .menu-label {
      font-size: 10.5px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label);
      font-weight: 800;
    }
    .menu-label.spaced {
      margin-top: 14px;
    }
    .menu-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .menu-chip {
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: var(--cv-surface-2);
      color: var(--cv-ink-muted);
      transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
    }
    .menu-chip:active {
      transform: scale(0.95);
    }
    .menu-chip.selected {
      color: var(--cv-ink);
    }
    .menu-chip.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
      padding: 5px 11px;
    }
    .menu-nav-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--cv-ink-10);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }
    .menu-nav-row.first {
      border-top: none;
      padding-top: 0;
    }
    .menu-nav-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .menu-nav-arrow {
      font-size: 13px;
      color: var(--cv-label);
    }
    .length-control {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      background: var(--cv-surface-2);
      padding: 10px 12px;
      margin-top: 8px;
    }
    .length-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      color: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 3px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: var(--cv-ink-10);
      transition: background 0.25s ease;
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .toast {
      position: fixed;
      left: 50%;
      bottom: 40px;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 999px;
      z-index: 70;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
      animation: cv-toast-in 0.3s cubic-bezier(.16,1,.3,1);
      white-space: nowrap;
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @media (min-width: 720px) {
      .content { max-width: 760px; }
      .panel { padding: 48px 40px; }
    }

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    /* Only once the frame is wide enough to leave real gutter space beside the centered
       .content column (760px content + generous margin) does the background mascot appear. */
    @media (min-width: 980px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 36px; }
      .mascot-slot.right { right: 36px; }
    }

    /* CSS grid natively forces a strict 4-column layout that evenly drops to the next row
       without centering uneven rows (e.g. 6 items = 4 on row 1, 2 on row 2 left-aligned). */
    @media (max-width: 600px) {
      .chip-row {
        grid-template-columns: repeat(2, auto);
        gap: 30px 18px;
      }
      .chord-chip {
        /* Increase chip size to fill the wider 2-col layout better */
        --chip-size-mobile: calc(var(--chip-size) * 1.15);
        --chip-radius-mobile: calc(var(--chip-radius) * 1.15);
        width: var(--chip-size-mobile);
        height: var(--chip-size-mobile);
        border-radius: var(--chip-radius-mobile);
        margin: 8px; /* breathing room for active state pop */
      }
      .chord-name {
        font-size: calc(var(--chip-font) * 1.15);
      }
    }
  `;A([k({type:Object})],S.prototype,"progression",2);A([k({type:Number})],S.prototype,"activeIndex",2);A([k({type:Number})],S.prototype,"progressStep",2);A([k({type:Array})],S.prototype,"order",2);A([k({type:Boolean})],S.prototype,"playing",2);A([k({type:Boolean})],S.prototype,"showTheory",2);A([k({type:String})],S.prototype,"instrument",2);A([k({type:String})],S.prototype,"playStyle",2);A([k({type:Boolean})],S.prototype,"sheetOpen",2);A([k({type:Boolean})],S.prototype,"isAuthenticated",2);A([k({type:Boolean})],S.prototype,"isBookmarked",2);A([k({type:String})],S.prototype,"sheetMode",2);A([k({type:Object})],S.prototype,"swapChord",2);A([k({type:Number})],S.prototype,"swapIndex",2);A([k({type:Array})],S.prototype,"alternatives",2);A([u()],S.prototype,"menuMounted",2);A([u()],S.prototype,"menuVisible",2);A([u()],S.prototype,"flashedIndex",2);A([u()],S.prototype,"expandedMenuGenre",2);A([u()],S.prototype,"expandedMenuMood",2);A([u()],S.prototype,"expandedAllInstruments",2);A([u()],S.prototype,"expandedAllPlayStyles",2);A([u()],S.prototype,"saveModalVisible",2);A([u()],S.prototype,"shareMounted",2);A([u()],S.prototype,"shareVisible",2);A([u()],S.prototype,"sheetMounted",2);A([u()],S.prototype,"sheetVisible",2);A([u()],S.prototype,"toast",2);A([u()],S.prototype,"spinning",2);A([u()],S.prototype,"drag",2);A([u()],S.prototype,"snapProgress",2);A([u()],S.prototype,"expandedInstrument",2);A([u()],S.prototype,"expandedPlayStyle",2);A([u()],S.prototype,"mascot",2);A([u()],S.prototype,"mascotSlot",2);A([u()],S.prototype,"panelPeekMascot",2);A([u()],S.prototype,"panelPeekSide",2);A([u()],S.prototype,"paradeTrigger",2);S=A([V("loop-screen")],S);var Ms=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,B=(e,t,i,s)=>{for(var o=s>1?void 0:s?Cs(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Ms(t,i,o),o};const $s=["Piano","Rhodes","Nylon Guitar","Warm Pad"],Es=["Block chords","Arpeggio","Strum","Broken (swing)"],Os=["flex-start","center","flex-end"];let D=class extends Y{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=he(.5),this.mascotAlign=Te([...Os]),this.eggCounter=new Tt,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(e){this.dispatchEvent(new CustomEvent("select-section",{detail:e,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const e=this.sections[0]?.progression.genre??"Pop",t=this.instrument??Pe(e),i=this.playStyle??Be(e),s=this.totalSteps||this.sections.reduce((p,h)=>p+h.order.length,0),o=!this.playing||s<=0?0:this.snapProgress?this.progressStep/s*100:(this.progressStep+1)/s*100,r=pe.filter(p=>p.name!==t);let n=$s.filter(p=>r.some(h=>h.name===p));const a=r.filter(p=>!n.includes(p.name)),l=this.expandedAllInstruments?r:r.filter(p=>n.includes(p.name)),d=ue.filter(p=>p.name!==i);let g=Es.filter(p=>d.some(h=>h.name===p));const m=d.filter(p=>!g.includes(p.name)),y=this.expandedAllPlayStyles?d:d.filter(p=>g.includes(p.name)),v=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],x=v?be(v.progression.mood):"#C9A9E0";return c`
      <div class="frame">
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        ${this.isAuthenticated?c`
          <div class="your-sets-btn" @click=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        `:""}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${()=>this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((p,h)=>{const b=this.playing?h===this.activePlayingSectionIdx:h===this.activeSectionIdx,T=be(p.progression.mood);return c`
                <div class="section-row ${b?"active":""}" style=${b?`--ring-color:${T}`:""} @click=${()=>this.selectSection(h)}>
                  <div>
                    <div class="section-name">${p.name.toUpperCase()}</div>
                    <div class="section-chords">${p.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${p.order.map(w=>{const E=p.progression.chords[w],P=ke(E.tension);return c`<div class="section-chip" style="background:${P.color};border-radius:${Math.round(P.radius*.35)}px;"></div>`})}
                  </div>
                </div>
              `})}
            <div class="add-section-row ${this.canAddSection?"enabled":"disabled"}" @click=${()=>this.addSection()}>
              <span class="add-icon">+</span>
              <span>${this.canAddSection?"Add a related section":"All song parts added"}</span>
            </div>
          </div>

          <div class="caption">Tap a section to open it in the Loop screen.</div>

          <hr class="divider" />

          <div class="whole-song-section">
            <div class="whole-song-label">HEAR THE WHOLE SONG</div>
            <div class="transport">
              <button class="play-btn" style="background:${x}" @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}>
                ${this.playing?c`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:c`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${o}%;background:${x};--progress-duration:${mt}ms"
                ></div>
              </div>
              ${this.isAuthenticated?c`
                <div class="save-btn" title="${this.isBookmarked?"Saved in sets":"Save set"}" @click=${()=>{this.saveModalVisible=!0}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              `:""}
              <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                ${t} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
              </div>
              <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
                ${i} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
              </div>
            </div>

            ${this.expandedInstrument?c`
              <div class="control-options">
                ${l.map(p=>c`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:p.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${p.color}"></span>${p.name}
                  </div>
                `)}
                ${a.length?c`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${a.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?c`
              <div class="control-options">
                ${y.map(p=>c`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:p.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${p.color}"></span>${p.name}
                  </div>
                `)}
                ${m.length?c`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${m.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?c`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
        
        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${e&&v?`${e} · ${v.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${p=>{this.dispatchEvent(new CustomEvent("save-set",{detail:p.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};D.styles=G`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 22px 40px;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 15.5px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 560px;
      margin-top: 20px;
    }
    .hero {
      text-align: center;
      margin-bottom: 32px;
    }
    .back-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 7px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.3px;
      color: var(--cv-label);
      cursor: pointer;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      font-size: clamp(26px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.7;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .section-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section-row {
      border-radius: 18px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      background: var(--cv-surface);
      opacity: 1;
      transform: translateY(0) scale(1);
      transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 200ms var(--cv-ease);
    }
    @starting-style {
      .section-row {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .section-row {
          transform: none;
        }
      }
    }
    .section-row:hover {
      transform: translateY(-2px);
    }
    .section-row.active {
      box-shadow: 0 0 0 2px var(--ring-color, var(--cv-plum));
    }
    .section-name {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .section-chords {
      font-size: 12.5px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
    }
    .section-chips {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    .section-chip {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .add-section-row {
      border-radius: 18px;
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-label);
      font-size: 14px;
      font-weight: 700;
      transition: transform 0.15s ease, opacity 0.2s ease;
    }
    .add-section-row.enabled {
      cursor: pointer;
    }
    .add-section-row.enabled:hover {
      transform: translateY(-2px);
    }
    .add-section-row.disabled {
      opacity: 0.5;
    }
    .add-icon {
      font-size: 18px;
      line-height: 1;
    }
    .caption {
      font-size: 12.5px;
      color: var(--cv-ink-45);
      text-align: center;
      margin-top: 20px;
    }
    .divider {
      border: none;
      border-top: 1.5px dashed var(--cv-ink-16);
      margin: 32px 0 28px;
    }
    .whole-song-section {
      width: 100%;
    }
    .whole-song-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label);
      margin-bottom: 16px;
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .your-sets-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: 1.5px solid var(--cv-ink-14);
      z-index: 10;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .your-sets-btn:hover {
      background: var(--cv-ink-08);
    }
    .your-sets-btn:active {
      transform: scale(0.96);
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        top: 24px;
        right: 64px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
    .play-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .play-btn:hover {
      transform: scale(1.06);
    }
    .save-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.3s ease, background 0.2s ease;
    }
    .save-btn:hover {
      background: var(--cv-surface-2);
    }
    .progress-track {
      flex: 1;
      min-width: 120px;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      transition: width var(--progress-duration, 1.7s) linear, background 0.4s ease;
    }
    .progress-fill.snap {
      transition: none;
    }
    .control-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 9px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms var(--cv-ease);
    }
    .control-chip:active {
      transform: scale(0.96);
    }
    .control-chevron {
      opacity: 0.6;
    }
    .control-options {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .control-option {
      display: inline-flex;
      align-items: center;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .control-option:active {
      transform: scale(0.96);
    }
    .control-option.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
    }
    .control-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      flex-shrink: 0;
    }
    .mascot-row {
      display: flex;
      margin-top: 40px;
      padding: 0 4px;
      opacity: 0.9;
    }
  `;B([k({type:Array})],D.prototype,"sections",2);B([k({type:Number})],D.prototype,"activeSectionIdx",2);B([k({type:Number})],D.prototype,"activePlayingSectionIdx",2);B([k({type:Boolean})],D.prototype,"canAddSection",2);B([k({type:Boolean})],D.prototype,"playing",2);B([k({type:Number})],D.prototype,"progressStep",2);B([k({type:Number})],D.prototype,"totalSteps",2);B([k({type:String})],D.prototype,"instrument",2);B([k({type:String})],D.prototype,"playStyle",2);B([k({type:Boolean})],D.prototype,"isAuthenticated",2);B([k({type:Boolean})],D.prototype,"isBookmarked",2);B([u()],D.prototype,"expandedInstrument",2);B([u()],D.prototype,"expandedPlayStyle",2);B([u()],D.prototype,"expandedAllInstruments",2);B([u()],D.prototype,"expandedAllPlayStyles",2);B([u()],D.prototype,"snapProgress",2);B([u()],D.prototype,"saveModalVisible",2);B([u()],D.prototype,"mascot",2);B([u()],D.prototype,"mascotAlign",2);B([u()],D.prototype,"paradeTrigger",2);D=B([V("song-screen")],D);var Ds=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,ae=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ps(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Ds(t,i,o),o};let K=class extends Y{constructor(){super(...arguments),this.projects=[],this.isSyncing=!1,this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.emptyMascot=he(.9)}onBack(){this.dispatchEvent(new CustomEvent("back"))}onLoadProject(e){this.renamingId||this.confirmDeleteId||this.dispatchEvent(new CustomEvent("load-project",{detail:e}))}onSync(){this.isSyncing||(this.isSyncing=!0,this.dispatchEvent(new CustomEvent("sync-projects")),setTimeout(()=>{this.isSyncing=!1},2e3))}startRename(e,t,i){e.stopPropagation(),this.renamingId=t,this.draftName=i,this.confirmDeleteId=null}onDraftChange(e){this.draftName=e.target.value}commitRename(e){if(this.renamingId===e){const t=this.draftName.trim();t&&this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:t},bubbles:!0,composed:!0})),this.renamingId=null}}cancelRename(){this.renamingId=null,this.draftName=""}askDelete(e,t){e.stopPropagation(),this.confirmDeleteId=t,this.renamingId=null}confirmDelete(e,t){e.stopPropagation(),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0}))}cancelDelete(e){e.stopPropagation(),this.confirmDeleteId=null}render(){return c`
      <div class="frame">
        <div class="top-bar">
          <button class="back-btn" @click=${this.onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button class="sync-btn" @click=${this.onSync} ?disabled=${this.isSyncing} title="Sync with Cloud">
            <svg class=${this.isSyncing?"spin":""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
            ${this.isSyncing?"Syncing...":"Sync"}
          </button>
        </div>
        
        <div class="content">
          <h1>Your saved sets</h1>
          <div class="subcopy">All your progressions, synced and ready to play.</div>

          ${this.projects.length===0?c`
            <div class="empty-state">
              ${this.emptyMascot.show?c`
                <div class="empty-mascot-wrap">
                  <mascot-character .kind=${this.emptyMascot.kind} .scale=${.8}></mascot-character>
                </div>
              `:""}
              <div class="empty-state-title">No saved sets yet</div>
              <div class="empty-state-desc">When you find a progression you like, tap the bookmark icon on any loop to save it here.</div>
              <button class="empty-cta-btn" @click=${this.onBack}>Start a new loop →</button>
            </div>
          `:c`
            <div class="grid">
              ${this.projects.map(e=>{const t=e.scaleType||"MAJOR",i=e.key||"C",s=e.bpm||120,o=e.name||"Untitled Set",r=e.genre||"Unknown",n=e.mood||"Neutral",a=e.lastModified?new Date(e.lastModified).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"Unknown Date",l=be(n),d=this.renamingId===e.id,g=this.confirmDeleteId===e.id;return c`
                  <div class="card" @click=${()=>this.onLoadProject(e.id)}>
                    <div class="color-accent" style="background: ${l}"></div>
                    
                    <div class="card-actions">
                      <button
                        class="action-btn"
                        title="Rename set"
                        aria-label="Rename set"
                        @click=${m=>this.startRename(m,e.id,o)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        class="action-btn delete"
                        title="Delete set"
                        aria-label="Delete set"
                        @click=${m=>this.askDelete(m,e.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>

                    ${d?c`
                      <input
                        class="rename-input"
                        .value=${this.draftName}
                        @input=${this.onDraftChange}
                        @keydown=${m=>{m.key==="Enter"?(m.preventDefault(),this.commitRename(e.id)):m.key==="Escape"&&(m.preventDefault(),this.cancelRename())}}
                        @blur=${()=>this.commitRename(e.id)}
                        @click=${m=>m.stopPropagation()}
                        autofocus
                      />
                    `:c`
                      <div class="card-title-row">
                        <div class="card-title" title="Click to rename" @click=${m=>this.startRename(m,e.id,o)}>${o}</div>
                      </div>
                    `}

                    <div class="card-meta">${r} · ${n}</div>
                    
                    <div class="section-chips">
                      ${(e.chords||[]).map(m=>{const y=ke(m.tension);return c`<div class="section-chip" style="background:${y.color};border-radius:${Math.round(y.radius*.35)}px;" title=${m.name}></div>`})}
                    </div>

                    ${g?c`
                      <div class="delete-confirm-banner" @click=${m=>m.stopPropagation()}>
                        <span>Delete this set?</span>
                        <div class="confirm-btn-group">
                          <button class="confirm-btn cancel" @click=${m=>this.cancelDelete(m)}>Cancel</button>
                          <button class="confirm-btn delete" @click=${m=>this.confirmDelete(m,e.id)}>Delete</button>
                        </div>
                      </div>
                    `:""}
                    
                    <div class="card-details">
                      <div class="detail-pill">${De(i,t)} ${t.replace("_"," ")}</div>
                      <div class="detail-pill">${s} BPM</div>
                      <div class="detail-pill">${a}</div>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </div>
      </div>
    `}};K.styles=G`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 24px 60px;
    }
    .top-bar {
      width: 100%;
      max-width: 680px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .back-btn:hover {
      background: var(--cv-ink-08);
    }
    .back-btn:active, .sync-btn:active {
      transform: scale(0.96);
    }
    .sync-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
    }
    .sync-btn:hover:not([disabled]) {
      background: var(--cv-ink-08);
    }
    .sync-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .content {
      width: 100%;
      max-width: 680px;
    }
    h1 {
      margin: 0;
      font-size: clamp(26px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      color: var(--cv-ink-muted);
      margin-top: 8px;
      margin-bottom: 32px;
    }
    .empty-state {
      text-align: center;
      padding: 56px 24px;
      background: var(--cv-surface);
      border-radius: 24px;
      border: 1.5px dashed var(--cv-ink-16);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .empty-mascot-wrap {
      margin-bottom: 4px;
    }
    .empty-state-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .empty-state-desc {
      font-size: 14px;
      color: var(--cv-ink-muted);
      max-width: 360px;
      line-height: 1.5;
    }
    .empty-cta-btn {
      margin-top: 8px;
      background: var(--cv-ink);
      color: var(--cv-cream);
      border: none;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .empty-cta-btn:hover {
      transform: scale(1.03);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-10);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 24px -10px rgba(46, 39, 31, 0.15);
      border-color: var(--cv-ink-16);
    }
    .card-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
      padding-right: 76px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .card-title:hover {
      text-decoration: underline;
      text-decoration-color: var(--cv-ink-30);
    }
    .rename-input {
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
      font-family: inherit;
      background: #ffffff;
      border: 1.5px solid var(--cv-ink);
      border-radius: 8px;
      padding: 4px 8px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 0 0 3px rgba(46, 39, 31, 0.08);
    }
    .card-meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-bottom: 12px;
    }
    .section-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex-shrink: 0;
      margin-bottom: 16px;
    }
    .section-chip {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .card-details {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .detail-pill {
      background: var(--cv-surface-2);
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-55);
    }
    .color-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
    }
    .card-actions {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 2px;
      z-index: 5;
    }
    .action-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink-35);
      transition: color 0.15s ease, background 0.15s ease;
      touch-action: manipulation;
    }
    .action-btn:hover {
      background: var(--cv-ink-08);
      color: var(--cv-ink);
    }
    .action-btn.delete:hover {
      background: rgba(229, 57, 53, 0.12);
      color: #e53935;
    }
    .delete-confirm-banner {
      background: rgba(229, 57, 53, 0.09);
      border: 1.5px solid rgba(229, 57, 53, 0.28);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-top: 10px;
      margin-bottom: 4px;
      font-size: 12.5px;
      font-weight: 700;
      color: #c62828;
      animation: cv-banner-in 0.18s ease-out;
    }
    @keyframes cv-banner-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .confirm-btn-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .confirm-btn {
      border: none;
      padding: 5px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .confirm-btn.cancel {
      background: var(--cv-surface-2);
      color: var(--cv-ink);
    }
    .confirm-btn.cancel:hover {
      background: var(--cv-ink-14);
    }
    .confirm-btn.delete {
      background: #e53935;
      color: #ffffff;
    }
    .confirm-btn.delete:hover {
      background: #c62828;
    }
  `;ae([k({type:Array})],K.prototype,"projects",2);ae([u()],K.prototype,"isSyncing",2);ae([u()],K.prototype,"renamingId",2);ae([u()],K.prototype,"draftName",2);ae([u()],K.prototype,"confirmDeleteId",2);ae([u()],K.prototype,"emptyMascot",2);K=ae([V("sets-screen")],K);var Bs=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,$=(e,t,i,s)=>{for(var o=s>1?void 0:s?Rs(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Bs(t,i,o),o};let M=class extends Y{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.toastMessage=null,this.toastUndoId=null,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=e=>{e.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=async()=>{await L.requestLogin()},this.onLogoutRequest=()=>{L.logout()},this.previousScreenBeforeSets="seed"}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const e=localStorage.getItem("chroma-chords-instrument");e&&pe.some(i=>i.name===e)&&(this.instrument=e);const t=localStorage.getItem("chroma-chords-play-style");t&&ue.some(i=>i.name===t)&&(this.playStyle=t),I.setInstrument(this.instrument),I.setPlayStyle(this.playStyle),this.unsubscribeAuth=L.subscribeAuthState((i,s)=>{this.userEmail=i,this.isAuthenticated=s}),this.unsubscribeTick=I.subscribeTick((i,s,o,r,n)=>{this.activeIndex=i,this.progressStep=s,typeof o=="number"&&(this.activePlayingSectionIdx=o),typeof r=="number"&&(this.totalSongSteps=r),this.playing=I.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),qi().then(i=>{this.chordData=i}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),I.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return L.isAdmin}syncRouteFromHash(){const e=window.location.hash.replace(/^#/,"").toLowerCase();e==="sets"||e==="11a"?(this.screen!=="sets"&&(this.previousScreenBeforeSets=this.screen),this.screen="sets",this.sheetOpen=!1):e==="song"||e==="5a"?this.progression?(this.screen="song",I.setSong(this.sections)):this.screen="seed":e==="loop"||e==="3a"||e==="8a"?this.progression?this.screen="loop":this.screen="seed":(e==="seed"||e==="2a"||!e)&&(this.screen="seed")}setScreen(e){this.screen=e;const t=`#${e}`;window.location.hash!==t&&history.pushState(null,"",t)}onGenreChange(e){this.genre=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onMoodChange(e){this.mood=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onFreetextSuggestionApplied(e){const t=e.detail;this.pendingChordSuggestion=t.chords?.length&&t.key&&t.scaleType?t:null,e.detail.promptText&&(this.activeSearchPrompt=e.detail.promptText)}async onGenerate(e){this.keyOverride=null,this.scaleOverride=null;const t=e?.detail?.promptText||this.activeSearchPrompt||void 0,i=await Uo.resolvePrompt(this.chordData,this.genre,this.mood,this.length,t,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),I.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),I.setPlayStyle(i.playStyle));const s=i.progression;this.progression=s,this.order=Array.from({length:s.chords.length},(o,r)=>r),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,I.setProgression(s,this.order),I.reset(),this.setScreen("loop"),this.sections=Me.createInitialSong(s,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onLengthChange(e){this.length=e.detail}regenerate(){const e=Kt(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=e,this.order=Array.from({length:this.length},(t,i)=>i),this.activeIndex=0,this.progressStep=0,I.setProgression(e,this.order),this.syncActiveSection(),this.playing&&(I.startAutoplay(),I.playActiveChord())}syncActiveSection(){this.progression&&(this.sections=Me.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order))}onSetKey(e){this.keyOverride=e.detail,this.regenerate()}onSetScale(e){this.scaleOverride=e.detail,this.regenerate()}onSetGenre(e){this.genre=e.detail,this.regenerate()}onSetMood(e){this.mood=e.detail,this.regenerate()}onSetLength(e){this.length=e.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(e){if(!this.progression)return;const t=this.order[this.activeIndex];this.order=e.detail;const i=this.order.indexOf(t);this.activeIndex=i>=0?i:0,I.setOrder(this.order,this.activeIndex),this.syncActiveSection()}onBack(){I.stopAutoplay(),this.playing=!1,this.setScreen("seed"),this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onViewSets(){I.stopAutoplay(),this.playing=!1,this.previousScreenBeforeSets=this.screen==="sets"?"seed":this.screen,this.setScreen("sets")}onBackFromSets(){I.stopAutoplay(),this.playing=!1,this.progression?this.setScreen(this.previousScreenBeforeSets==="song"?"song":"loop"):this.setScreen("seed")}onLoadProject(e){const t=e.detail,i=L.getProjects().find(s=>s.id===t);i&&(this.currentProjectId=i.id,this.progression={genre:i.genre||"Unknown",mood:i.mood||"Neutral",key:i.key||"C",scaleType:i.scaleType||"MAJOR",bpm:i.bpm||120,chords:i.chords},this.order=Array.from({length:this.progression.chords.length},(s,o)=>o),this.length=this.progression.chords.length,this.showTheory=i.showTheory??this.showTheory,I.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=Me.createInitialSong(this.progression,this.order),this.activeSectionIdx=0)}onDeleteProject(e){L.deleteProject(e.detail),this.currentProjectId===e.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(e){const t=L.getProjects().find(i=>i.id===e.detail.id);t&&(t.name=e.detail.name,L.saveProject(t),this.requestUpdate())}async onSyncProjects(){await L.syncProjectsFromCloud(),await L.syncProjectsToCloud(),this.requestUpdate()}onSaveSet(e){this.saveProject(e.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(e){this.instrument=e.detail,localStorage.setItem("chroma-chords-instrument",e.detail),I.setInstrument(e.detail)}onSetPlayStyle(e){this.playStyle=e.detail,localStorage.setItem("chroma-chords-play-style",e.detail),I.setPlayStyle(e.detail)}onTogglePlay(){this.playing=I.togglePlay()}onTogglePlaySong(){I.setSong(this.sections),this.playing=I.togglePlay()}onChordTap(e){this.progression&&(this.swapIndex=e.detail,this.sheetMode="swap",this.alternatives=fo(this.chordData,this.progression,e.detail),this.sheetOpen=!0,I.playChordAtIndex(e.detail,.8))}onChordVoicingTap(e){this.progression&&(this.swapIndex=e.detail,this.sheetMode="voicing",this.alternatives=[],this.sheetOpen=!0,I.playChordAtIndex(e.detail,.8))}onChordPreview(e){this.progression&&(this.playing&&(I.stopAutoplay(),this.playing=!1),I.playChordAtIndex(e.detail,.8))}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(e){if(!this.progression||this.swapIndex===null)return;const t=[...this.progression.chords];t[this.swapIndex]=e.detail.chord,this.progression={...this.progression,chords:t},I.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),I.playChordNotes(e.detail.chord.notes,.8)}onVoicingPreview(e){I.playChordNotes(e.detail,.6)}onVoicingChange(e){if(!this.progression||this.swapIndex===null)return;const t=[...this.progression.chords];t[this.swapIndex]=mo(t[this.swapIndex],e.detail.quality,e.detail.extension),this.progression={...this.progression,chords:t},I.setProgression(this.progression,this.order),this.syncActiveSection()}onBackToProgression(){I.stopAutoplay(),this.playing=!1,this.setScreen("loop"),this.progression&&I.setProgression(this.progression,this.order)}onViewSong(){I.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.setScreen("song"),I.setSong(this.sections)}onSelectSection(e){const t=this.sections[e.detail];t&&(this.activeSectionIdx=e.detail,this.progression=t.progression,this.order=t.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=t.progression.chords.length,this.keyOverride=t.progression.key,this.scaleOverride=t.progression.scaleType,this.sheetOpen=!1,this.setScreen("loop"),I.setProgression(this.progression,this.order),this.playing&&(I.startAutoplay(),I.playActiveChord()))}onAddSection(){if(!this.progression)return;const e=Me.addSection(this.sections,this.progression);this.sections=e.sections,this.activeSectionIdx=e.activeIndex,this.screen==="song"&&I.setSong(this.sections)}showToast(e,t){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=e,this.toastUndoId=t||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},4500)}onToastUndo(){this.toastUndoId&&(L.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}onToastView(){this.toastMessage=null,this.toastUndoId=null,this.onViewSets()}saveProject(e){if(!this.progression)return;const t=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=t;const i=L.getProjects().find(r=>r.id===t),s=e||(i?i.name:`${this.progression.genre} · ${this.progression.mood}`),o={id:t,name:s,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};L.saveProject(o),e&&L.scheduleCloudSync(),this.showToast(`Saved "${s}"`,t),this.requestUpdate()}render(){let e;const t=!!(this.currentProjectId&&L.isProjectSaved(this.currentProjectId));if(this.screen==="sets")e=c`
        <sets-screen
          .projects=${L.getProjects()}
          @back=${this.onBackFromSets}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
          @rename-project=${this.onRenameProject}
          @sync-projects=${this.onSyncProjects}
        ></sets-screen>
      `;else if(this.screen==="seed"||!this.progression)e=c`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .isAdmin=${this.isAdmin}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @view-sets=${this.onViewSets}
        ></seed-screen>
      `;else if(this.screen==="song")e=c`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length<ve.length}
          .playing=${this.playing}
          .progressStep=${this.progressStep}
          .totalSteps=${this.totalSongSteps}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          .isBookmarked=${t}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
          @toggle-play-song=${this.onTogglePlaySong}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></song-screen>
      `;else{const i=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;e=c`
        <loop-screen
          .progression=${this.progression}
          .activeIndex=${this.activeIndex}
          .progressStep=${this.progressStep}
          .order=${this.order}
          .playing=${this.playing}
          .showTheory=${this.showTheory}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          .isBookmarked=${t}
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${i}
          .swapIndex=${this.swapIndex}
          .alternatives=${this.alternatives}
          @back=${this.onBack}
          @theory-toggle=${this.onTheoryToggle}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @toggle-play=${this.onTogglePlay}
          @chord-tap=${this.onChordTap}
          @chord-voicing-tap=${this.onChordVoicingTap}
          @chord-preview=${this.onChordPreview}
          @close=${this.onSheetClose}
          @select-alternative=${this.onSelectAlternative}
          @voicing-preview=${this.onVoicingPreview}
          @voicing-change=${this.onVoicingChange}
          @set-key=${this.onSetKey}
          @set-scale=${this.onSetScale}
          @set-genre=${this.onSetGenre}
          @set-mood=${this.onSetMood}
          @reroll=${this.onReroll}
          @reorder=${this.onReorder}
          @set-length=${this.onSetLength}
          @view-song=${this.onViewSong}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></loop-screen>
      `}return c`
      <div class="screen-view">
        ${e}
        ${this.toastMessage?c`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              <button class="toast-btn" @click=${this.onToastView}>View</button>
              ${this.toastUndoId?c`
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:""}
            </div>
          </div>
        `:""}
      </div>
    `}};M.styles=G`
    :host {
      --cv-ease: cubic-bezier(0.23, 1, 0.32, 1);
      --cv-font: 'Plus Jakarta Sans', sans-serif;
      --cv-cream: #FBF3E6;
      --cv-surface: #F6EADB;
      --cv-surface-2: #F1E4CC;
      --cv-canvas: #EDE3D3;
      --cv-ink: #2E271F;
      --cv-ink-muted: #6B5F50;
      --cv-label: #8A6B3F;
      --cv-ink-04: rgba(46, 39, 31, 0.04);
      --cv-ink-08: rgba(46, 39, 31, 0.08);
      --cv-ink-10: rgba(46, 39, 31, 0.10);
      --cv-ink-12: rgba(46, 39, 31, 0.12);
      --cv-ink-14: rgba(46, 39, 31, 0.14);
      --cv-ink-16: rgba(46, 39, 31, 0.16);
      --cv-ink-20: rgba(46, 39, 31, 0.20);
      --cv-ink-25: rgba(46, 39, 31, 0.25);
      --cv-ink-35: rgba(46, 39, 31, 0.35);
      --cv-ink-45: rgba(46, 39, 31, 0.45);
      --cv-ink-55: rgba(46, 39, 31, 0.55);
      --cv-red: #F2A79B;
      --cv-red-deep: #F2735F;
      --cv-red-deep-hover: #E85F49;
      --cv-blue: #9CC0EC;
      --cv-yellow: #F6D98B;
      --cv-purple: #C9A9E0;
      --cv-green: #B8CC9E;
      --cv-peach: #F2C9A0;
      --cv-plum: #9B7CA8;
      --cv-plum-hover: #84698F;

      display: block;
      min-height: 100%;
      background: var(--cv-canvas);
      font-family: var(--cv-font);
      color: var(--cv-ink);
    }
    .screen-view {
      display: block;
      min-height: 100%;
      opacity: 1;
      transform: scale(1);
      transition: opacity 200ms var(--cv-ease), transform 240ms var(--cv-ease);
    }
    .save-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      background: var(--cv-ink);
      color: var(--cv-cream);
      padding: 10px 18px 10px 20px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 13.5px;
      font-weight: 700;
      box-shadow: 0 16px 36px -10px rgba(46, 39, 31, 0.45);
      z-index: 99;
      animation: cv-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(14px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .toast-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast-btn {
      background: rgba(253, 246, 235, 0.16);
      color: var(--cv-cream);
      border: none;
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .toast-btn:hover {
      background: rgba(253, 246, 235, 0.28);
    }
    .toast-btn.undo {
      color: #F2A79B;
    }
    @starting-style {
      .screen-view {
        opacity: 0;
        transform: scale(0.985);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .screen-view {
        transition: opacity 150ms ease;
        transform: none !important;
      }
      .save-toast {
        animation: none;
      }
    }
  `;$([u()],M.prototype,"chordData",2);$([u()],M.prototype,"screen",2);$([u()],M.prototype,"genre",2);$([u()],M.prototype,"mood",2);$([u()],M.prototype,"progression",2);$([u()],M.prototype,"activeIndex",2);$([u()],M.prototype,"progressStep",2);$([u()],M.prototype,"order",2);$([u()],M.prototype,"keyOverride",2);$([u()],M.prototype,"scaleOverride",2);$([u()],M.prototype,"playing",2);$([u()],M.prototype,"showTheory",2);$([u()],M.prototype,"instrument",2);$([u()],M.prototype,"playStyle",2);$([u()],M.prototype,"sheetOpen",2);$([u()],M.prototype,"sheetMode",2);$([u()],M.prototype,"swapIndex",2);$([u()],M.prototype,"alternatives",2);$([u()],M.prototype,"length",2);$([u()],M.prototype,"sections",2);$([u()],M.prototype,"activeSectionIdx",2);$([u()],M.prototype,"activePlayingSectionIdx",2);$([u()],M.prototype,"totalSongSteps",2);$([u()],M.prototype,"pendingChordSuggestion",2);$([u()],M.prototype,"userEmail",2);$([u()],M.prototype,"isAuthenticated",2);$([u()],M.prototype,"toastMessage",2);$([u()],M.prototype,"toastUndoId",2);M=$([V("chroma-chords-app")],M);
