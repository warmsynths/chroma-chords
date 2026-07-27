import{f as ni,u as ai,C as Et,S as li,P as L,a as J,R as $t,b as Ot,M as Dt,F as me,s as ci,n as di,l as hi,i as z,c as G,d,A as Pt,w as W,O as pi}from"./vendor-dyN-iMiE.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ui={attribute:!0,type:String,converter:ai,reflect:!1,hasChanged:ni},gi=(e=ui,t,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),s==="accessor"){const{name:a}=i;return{set(n){const c=t.get.call(this);t.set.call(this,n),this.requestUpdate(a,c,e,!0,n)},init(n){return n!==void 0&&this.C(a,void 0,e,n),n}}}if(s==="setter"){const{name:a}=i;return function(n){const c=this[a];t.call(this,n),this.requestUpdate(a,c,e,!0,n)}}throw Error("Unsupported decorator location: "+s)};function w(e){return(t,i)=>typeof i=="object"?gi(e,t,i):((s,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),a?Object.getOwnPropertyDescriptor(o,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(e){return w({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mi=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Bt(e,t){return(i,s,o)=>{const r=a=>a.renderRoot?.querySelector(e)??null;return mi(i,s,{get(){return r(this)}})}}const he="chroma_chords_projects",fi="chord_voyager_projects";class H{static getProjects(){try{let t=localStorage.getItem(he);if(t||(t=localStorage.getItem(fi),t&&localStorage.setItem(he,t)),t)return JSON.parse(t)}catch(t){console.error("Failed to load projects from localStorage:",t)}return[]}static setProjects(t){try{localStorage.setItem(he,JSON.stringify(t))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(t,i){const s=new Map;return t.forEach(o=>s.set(o.id,o)),i.forEach(o=>{const r=s.get(o.id);!r||o.lastModified>r.lastModified?s.set(o.id,o):o.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(t){const i=this.getProjects(),s=i.findIndex(o=>o.id===t.id);t.lastModified=Date.now(),s>=0?i[s]=t:i.push(t);try{localStorage.setItem(he,JSON.stringify(i))}catch(o){console.error("Failed to save project to localStorage:",o)}}static deleteProject(t){let i=this.getProjects();i=i.filter(s=>s.id!==t);try{localStorage.setItem(he,JSON.stringify(i))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(t){const i=JSON.stringify(t,null,2),s=new Blob([i],{type:"application/json"}),o=URL.createObjectURL(s),r=document.createElement("a");r.href=o,r.download=`${t.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}static importProjectFile(t){return new Promise((i,s)=>{const o=new FileReader;o.onload=r=>{try{const a=r.target?.result,n=JSON.parse(a);n&&typeof n=="object"&&Array.isArray(n.chords)?(n.id=Math.random().toString(36).substr(2,9),n.lastModified=Date.now(),i(n)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},o.onerror=()=>s(new Error("Failed to read file")),o.readAsText(t)})}}class vi{constructor(){this.accessToken=null,this.FILENAME="chroma_chords_projects.json",this.OLD_FILENAME="chord_voyager_projects.json"}setAccessToken(t){this.accessToken=t}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const t=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${t}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const s=await i.json();if(s.files&&s.files.length>0)return s.files[0].id;const o=encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`),r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${o}&fields=files(id)`,{method:"GET",headers:this.headers});if(r.ok){const a=await r.json();if(a.files&&a.files.length>0)return a.files[0].id}return null}catch(t){throw console.error("Failed to find project file in Google Drive:",t),t}}async loadProjects(){try{const t=await this.findProjectFileId();if(!t)return null;const i=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!i.ok)throw new Error(`Failed to download file: ${i.statusText}`);return await i.json()}catch(t){throw console.error("Failed to load projects from Google Drive:",t),t}}async saveProjects(t){try{const i=await this.findProjectFileId(),s=JSON.stringify(t);if(i){const o=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!o.ok)throw new Error(`Failed to update file: ${o.statusText}`)}else{const o=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!o.ok)throw new Error(`Failed to create file metadata: ${o.statusText}`);const a=(await o.json()).id,n=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!n.ok)throw new Error(`Failed to upload new file content: ${n.statusText}`)}}catch(i){throw console.error("Failed to save projects to Google Drive:",i),i}}async findAudioFileId(t){try{const i=`recording_${t}.webm`,s=encodeURIComponent(`name='${i}' and trashed=false`),o=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!o.ok)throw o.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${o.statusText}`);const r=await o.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(i){throw console.error(`Failed to find audio file for project ${t}:`,i),i}}async uploadAudioFile(t,i){try{const s=`recording_${t}.webm`,o=await this.findAudioFileId(t);if(o){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":i.type||"audio/webm"},body:i});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return o}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const n=(await r.json()).id,c=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${n}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":i.type||"audio/webm"},body:i});if(!c.ok)throw new Error(`Failed to upload new audio file content: ${c.statusText}`);return n}}catch(s){throw console.error(`Failed to upload audio file for project ${t}:`,s),s}}async downloadAudioFile(t){try{const i=await this.findAudioFileId(t);if(!i)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${i}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(i){throw console.error(`Failed to download audio file for project ${t}:`,i),i}}async deleteAudioFile(t){try{const i=await this.findAudioFileId(t);if(!i)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${i}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(i){throw console.error(`Failed to delete audio file for project ${t}:`,i),i}}}const yi=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],xi=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],X={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},bi=new Set(["F","Bb","Eb","Ab","Db","Gb"]),re=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Ue={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},wi=Object.keys(Ue),ki={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},mt={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},Ti={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},We={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},Ii=Object.keys(We),ft={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},fe=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Si={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},Ai={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},_t={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},K=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function ve(e){return(K.find(t=>t.name===e)||K[0]).dot}const Ni={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function Mi(e,t){return 1+e.degrees.filter(i=>t.includes(i)).length*.6}function De(e,t){const i=e.reduce((o,r)=>o+t(r),0);let s=Math.random()*i;for(const o of e)if(s-=t(o),s<=0)return o;return e[e.length-1]}function Ci(e){if(e.length)return e[Math.floor(Math.random()*e.length)]}const Je=4,ie=1,F=8,st=1700,Ei={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Ne(e,t,i="MAJOR",s="Pop",o="Uplifting"){if(e===t)return .05;let a=(Ei[e]||{})[t]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(e==="TONIC"&&t==="SUBMEDIANT"&&(a*=1.5),e==="SUBMEDIANT"&&t==="MEDIANT"&&(a*=1.4),e==="MEDIANT"&&t==="SUBTONIC"&&(a*=1.4),e==="SUBTONIC"&&t==="TONIC"&&(a*=1.3)),s==="Jazz-ish"||s==="Lo-fi/Chill"?(e==="SUPERTONIC"&&t==="DOMINANT"&&(a*=1.8),e==="DOMINANT"&&t==="TONIC"&&(a*=1.5),e==="TONIC"&&t==="SUPERTONIC"&&(a*=1.4)):(s==="House/Dance"||s==="Synthwave")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(a*=1.5),(_t[o]||[]).includes(t)&&(a*=1.5),Math.max(.01,a)}function $i(e,t,i,s,o,r,a=Je){let n="TONIC";(e.type.includes("MINOR")||e.type==="DORIAN")&&(r==="Melancholy"||r==="Nostalgic")&&Math.random()<.4&&(n=i.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const c=[n];let h=n;for(let f=1;f<a;f++){const l=f===a-1;let m=i.filter(p=>e.degrees[p]);m.length||(m=i);const v=m.filter(p=>p!==h),y=v.length?v:m;if(l){const p=De(y,b=>{const M=Ne(b,c[0],e.type,o,r),k=Ne(h,b,e.type,o,r);return M*k});c.push(p)}else{const p=y.filter(k=>!c.includes(k)),b=p.length?p:y,M=De(b,k=>Ne(h,k,e.type,o,r));h=M,c.push(M)}}return c}function ye(e,t){const i=(e%12+12)%12;return t?xi[i]:yi[i]}function rt(e){const t=e[0]?.toUpperCase();let i="C",s=e;t&&/[A-G]/.test(t)&&(e[1]==="B"?(i=`${t}b`,s=e.slice(2)):e[1]==="#"?(i=`${t}#`,s=e.slice(2)):(i=t,s=e.slice(1))),s=s.toLowerCase();let o="maj";return s.includes("maj7")?o="maj7":s.includes("min7")||s.includes("m7")?o="min7":s.includes("dim7")?o="dim7":s.includes("dim")?o="dim":s.includes("aug")?o="aug":s.includes("sus")?o="sus4":s==="7"?o="dom7":s.includes("min")||s==="m"?o="min":o="maj",{root:i,quality:o}}function Oi(e,t){const{root:i,quality:s}=rt(e),o=X[i]??0;return Ue[s].map(a=>ye(o+a,t))}async function Di(){let e=await fetch("./chroma_chords_data.json");if(e.ok||(e=await fetch("./chord_voyager_data.json")),!e.ok)throw new Error(`HTTP error: ${e.status}`);const t=await e.json();return ji(t),t}const Pi={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Bi={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},_i={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Ri={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Li={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Ui={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function ji(e){const t=[["MIXOLYDIAN",Pi],["DORIAN",Bi],["LYDIAN",_i]];for(const[i,s]of t)for(const[o,r]of Object.entries(s)){const a=e.scales[`${r}_MAJOR`];if(!a)continue;const n=`${o}_${i}`,c={};for(const h of Ui[i]){const f=Li[`${i}_${h}`],l=a.degrees[f];if(!l)continue;const m=JSON.parse(JSON.stringify(l));m.next_chord_options=(m.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${r}_MAJOR_`)){const y=v.nodeId.replace(`${r}_MAJOR_`,""),p=Ri[`${i}_${y}`];if(p)return{name:v.name,nodeId:`${o}_${i}_${p}`}}return v}),c[h]=m}e.scales[n]={root:o,type:i,degrees:c}}}const Fi=[156,192,236],zi=[242,115,95];function Me(e,t,i){return e+(t-e)*i}function nt(e){const t=Math.max(0,Math.min(1,e));return"#"+Fi.map((s,o)=>Math.round(Me(s,zi[o],t))).map(s=>s.toString(16).padStart(2,"0")).join("")}function Pe(e){const t=Math.max(0,Math.min(1,e));return{size:Math.round(Me(84,128,t)),radius:Math.round(Me(40,12,t)),fontSize:Math.round(Me(21,30,t)),color:nt(t)}}function Gi(e,t,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[e]||`${i} colors the progression as the ${e.toLowerCase()} of ${t}.`}function se(e,t,i,s){const r=i.degrees[t].chord_name,a=Ti[t]??.5,n=We[i.type]||We.MAJOR;return{name:vt(r),tag:ki[t]||"move",roman:n[t]||"?",color:nt(a),functionLabel:mt[t]||t,notes:Oi(r,s),scaleLabel:`${i.root} ${ft[i.type]||i.type}`,desc:Gi(mt[t]||t,ft[i.type]||i.type,vt(r)),degree:t,scaleKey:e,tension:a}}function vt(e){const{root:t,quality:i}=rt(e);return`${t}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const Yi={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Rt(e,t){let i=Yi[e]||92;return t==="Tense"&&(i+=6),(t==="Dreamy"||t==="Melancholy")&&(i-=6),i}function Lt(e,t,i,s){const o=Math.max(ie,Math.min(F,s?.length??Je)),r=Si[t]||"MAJOR",a=Ai[i],n=s?.scaleType||(a&&r==="MAJOR"?a:r);let c=s?.key&&re.includes(s.key)?s.key:Ci(re),h=`${c}_${n}`;e.scales[h]||(c="C",h=`${c}_${n}`);const f=e.scales[h],l=xe(c,n),m=Object.keys(f.degrees),v=_t[i]||[],y=Ni[n]||[],p=o===Je?y.filter(x=>x.degrees.every(N=>m.includes(N))):[],k=(p.length&&Math.random()<.25?De(p,x=>Mi(x,v)).degrees:$i(f,h,m,v,t,i,o)).map(x=>se(h,x,f,l));return{genre:t,mood:i,key:c,scaleType:n,bpm:Rt(t,i),chords:k}}function Vi(e,t,i,s,o,r){const a=`${t}_${i}`,n=e.scales[a];if(!n||!s.length)return null;const c=xe(t,i),h=X[t]??0,f={};Object.entries(n.degrees).forEach(([m,v])=>{const{root:y}=rt(v.chord_name),p=X[y]??0;p in f||(f[p]=m)});const l=s.slice(0,F).map(({root:m,quality:v})=>{const y=X[m]??h,p=f[y];if(p)return se(a,p,n,c);const b=(y-h+12)%12,M=Ue[v]?v:"maj";return Ke(t,b,M,"Borrowed","?","drift",c)});return l.length<ie?null:{genre:o,mood:r,key:t,scaleType:i,bpm:Rt(o,r),chords:l}}function je(e,t,i,s,o,r,a){const n=e.filter(f=>t.includes(f)),c=n.filter(f=>f!==i),h=c.length?c:n;if(h.length)return De(h,f=>Ne(s,f,o,r,a))}const qi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Ke(e,t,i,s,o,r,a){const n=(X[e]??0)+t,h=`${ye(n,a)}${qi[i]}`,f=Ue[i].map(m=>ye(n+m,a)),l=.3;return{name:h,tag:r,roman:o,color:nt(l),functionLabel:s,notes:f,scaleLabel:"Borrowed",desc:`${h} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:l}}function Qe(e){const t=e.match(/^[A-Ga-g][#b]?/),i=t?t[0]:"C";return i[0].toUpperCase()+i.slice(1)}const yt={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Ze(e,t,i,s){const o=X[e]??0;let r=yt[t]||yt.Major;return i==="6th"?r=[...r,9]:i==="7th (dom / m7)"?r=[...r,10]:i==="Major 7th (M7)"?r=[...r,11]:i==="9th"&&(r=[...r,10,14]),r.map(a=>ye(o+a,s))}const Xi={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Hi={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Wi(e,t,i){return t==="Minor"&&i==="Major 7th (M7)"?`${e}m(maj7)`:`${e}${Xi[t]??""}${Hi[i]??""}`}const Ut=["C","D","E","F","G","A","B"],at=10,Be=Ut.indexOf("E")+4*7,Ji=Be+4*2,et=20,jt=et+4*at,Ki={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},Qi={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},Ft={};re.forEach(e=>{Ft[X[e]]=e});function zt(e,t){const i=Qi[t]??0,o=(((X[e]??0)-i)%12+12)%12;return Ft[o]??"C"}function Gt(e,t){return Ki[zt(e,t)]??[]}function xe(e,t){const i=zt(e,t);return bi.has(i)||i.includes("b")}function Ce(e,t){return ye(X[e]??0,xe(e,t))}const xt={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function Zi(e){let t=4,i=-1;return e.map(s=>{const o=Ut.indexOf(s[0].toUpperCase());return i!==-1&&o<=i&&t++,i=o,o+t*7})}function ee(e){return jt-(e-Be)*(at/2)}const pe=10,Fe=46,bt=26,wt=14;function eo(e,t,i){const s=Gt(t,i),o=8,r=s.length?s.length*o+6:0,a=s.map(k=>xt[k]),n=e.map(k=>Zi(k.notes)),c=n.flat(),h=Math.min(et,...c.map(ee),...a.map(ee)),f=Math.max(jt,...c.map(ee),...a.map(ee)),l=pe+wt-h,m=f-h+12+pe+wt,v=[0,1,2,3,4].map(k=>et+k*at+l),y=pe+bt+r,p=s.map((k,x)=>({x:pe+bt+x*o,y:ee(xt[k])+l,sign:k.includes("#")?"sharp":"flat"})),b=e.map((k,x)=>{const N=y+x*Fe+Fe/2,P=n[x],U=P.map(u=>({x:N,y:ee(u)+l})),V=[];P.forEach(u=>{(u-Be)%2===0&&(u<Be||u>Ji)&&V.push({x:N-9,y:ee(u)+l})});const oe=Math.min(...U.map(u=>u.y))-10;return{cx:N,name:k.name,roman:k.roman,notes:U,ledgers:V,labelY:oe}});return{width:y+e.length*Fe+pe,height:m,lines:v,keySignature:p,chords:b}}function to(e,t,i){const s=Qe(e.name),o=s.includes("b");return{...e,name:Wi(s,t,i),notes:Ze(s,t,i,o)}}function io(e,t,i){const s=t.chords[i],o=e.scales[s.scaleKey],r=Object.keys(o.degrees),a=xe(t.key,t.scaleType),n=[],c=(i-1+t.chords.length)%t.chords.length,h=t.chords[c]?.degree||"TONIC",f=t.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",l=`${t.key}_${f}`,m=e.scales[l],v=xe(t.key,f),y=f==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(m){const x=je(y,Object.keys(m.degrees),s.degree,h,t.scaleType,t.genre,t.mood);if(x){const N=se(l,x,m,v);n.push({label:"Darker",sub:"heavier, more shadow",chord:N,functionCaption:`Borrowed · ${N.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${f==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const x=f==="NATURAL_MINOR"?Ke(t.key,8,"maj","Submediant","bVI","hold",v):Ke(t.key,5,"maj","Subdominant","IV","lift",v);n.push({label:"Darker",sub:"heavier, more shadow",chord:x,functionCaption:`Borrowed · ${x.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let p=s.scaleKey,b=o;if(t.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const x=`${t.key}_HARMONIC_MINOR`,N=e.scales[x];N?.degrees.DOMINANT&&(p=x,b=N)}const M=je(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(b.degrees),s.degree,h,t.scaleType,t.genre,t.mood);if(M){const x=se(p,M,b,a);n.push({label:"More tension",sub:"sharper pull forward",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:`Aimed at the ${x.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const k=je(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree,h,t.scaleType,t.genre,t.mood);if(k){const x=se(s.scaleKey,k,o,a);n.push({label:"Dreamier",sub:"softer, more air",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const x=se(s.scaleKey,"TONIC",o,a);n.push({label:"Resolve home",sub:"settles back to center",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return n}const oo={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},so={m8:43303,circuit:43302};function ro(e,t,i){let s=oo[t];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(s=`http://localhost:${so[t]}/`);const r=(i&&i.length>0?i.map(a=>e.chords[a]).filter(a=>!!a):e.chords).map(a=>encodeURIComponent(a.name)).join("+");return`${s}?p=${r}`}const no=K.map(e=>e.name),ao=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function lo(e,t){const i=e.length+1,s=t.length+1,o=Array.from({length:i},()=>new Array(s).fill(0));for(let r=0;r<i;r++)o[r][0]=r;for(let r=0;r<s;r++)o[0][r]=r;for(let r=1;r<i;r++)for(let a=1;a<s;a++)o[r][a]=e[r-1]===t[a-1]?o[r-1][a-1]:1+Math.min(o[r-1][a-1],o[r-1][a],o[r][a-1]);return o[i-1][s-1]}function te(e,t){if(typeof e!="string")return null;const i=e.trim();if(!i)return null;const s=i.toLowerCase(),o=t.find(c=>c.toLowerCase()===s);if(o)return o;let r=null,a=1/0;for(const c of t){const h=lo(s,c.toLowerCase());h<a&&(a=h,r=c)}const n=Math.max(2,Math.floor(s.length*.4));return a<=n?r:null}function co(e){if(!Array.isArray(e))return;const t=[];for(const i of e){if(!i||typeof i!="object")continue;const s=i,o=te(s.root,re),r=te(s.quality,wi);o&&r&&t.push({root:o,quality:r})}if(t.length)return t.slice(0,F)}function ho(e){if(!e||typeof e!="object"||Array.isArray(e))return;const t=e,i=te(t.presetId,ao)??(typeof t.presetId=="string"&&t.presetId.trim()?t.presetId.trim():void 0);if(!i)return;const s=t.customConfig&&typeof t.customConfig=="object"&&!Array.isArray(t.customConfig)?t.customConfig:void 0;return{presetId:i,customConfig:s}}function ze(e,t){const i=e&&typeof e=="object"?e:{},s=te(i.genre,fe)??t.genre,o=te(i.mood,no)??t.mood,r=te(i.key,re)??void 0,a=te(i.scaleType,Ii)??void 0,n=r&&a?co(i.chords):void 0;let c;typeof i.length=="number"&&Number.isFinite(i.length)&&(c=Math.max(ie,Math.min(F,Math.round(i.length))));const h=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,f=ho(i.instrumentConfig),l=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:s,mood:o,key:r,scaleType:a,length:c,chords:n,rhythmStyle:h,instrumentConfig:f,_rateLimit:l}}const Ge=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],Ee=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Yt="chroma-chords-llm-provider",Vt="chroma-chords-llm-model";function qt(){const e=localStorage.getItem(Yt);return e==="opencodeai"||e==="anthropic"||e==="openrouter"||e==="google"?e:"google"}function po(e){localStorage.setItem(Yt,e)}function Xt(){const e=localStorage.getItem(Vt);return e?e==="gemini-1.5-flash"||e==="gemini-2.0-flash"||e==="gemini-2.5-flash"||e==="gemini-3.5-flash"||e==="gemini-1.5-pro"?"gemini-3.1-flash-lite":e:Ee[0].id}function Ye(e){localStorage.setItem(Vt,e)}const Ve={genre:fe[0],mood:K[0].name},Ht="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",uo=12e3;async function go(){try{const e=await fetch(Ht);if(e.ok){const t=await e.json();if(t&&typeof t.remaining=="number")return{remaining:t.remaining,limit:t.limit,isFreeTier:t.isFreeTier}}}catch{}return null}const Wt={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Jt={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function _e(e,t){const i=e.toLowerCase();let s=null,o=0;return Object.keys(t).forEach(r=>{const a=t[r].reduce((n,c)=>n+(i.includes(c)?1:0),0);a>o&&(o=a,s=r)}),s}function tt(e){const t=_e(e,Jt),i=_e(e,Wt);return!t||!i?null:{genre:t,mood:i}}let lt=null;function Kt(e){lt=e}function mo(){return lt}async function fo(e,t){const i=new AbortController,s=setTimeout(()=>i.abort(),uo),o=lt;try{const r={"Content-Type":"application/json"};o&&(r.Authorization=`Bearer ${o}`);const a=await fetch(Ht,{method:"POST",headers:r,body:JSON.stringify({text:e,provider:qt(),model:Xt()}),signal:i.signal}),n=await a.json().catch(()=>null);if(!a.ok||n&&typeof n=="object"&&"error"in n){const c=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${a.status}`,h=new Error(`Classifier request failed: ${c}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(h._rateLimit=n._rateLimit),h}return n}finally{clearTimeout(s)}}async function Qt(e,t){const i=e.trim(),s=i.toLowerCase();if(s.startsWith("mock")||s.startsWith("test")){const r=i.replace(/^(mock|test)\s*:?\s*/i,"").trim(),a=_e(r,Jt)??"Synthwave",n=_e(r,Wt)??"Dreamy",c={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},h={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},f={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},l=f[a]||f._default,m=c[a]||"rhodes",v=h[a]||"slow_arpeggio",y={genre:a,mood:n,key:l.key,scaleType:l.scaleType,length:8,chords:l.chords,rhythmStyle:v,instrumentConfig:{presetId:m,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ze(y,{genre:a,mood:n})}const o=tt(e);try{const r=await fo(e,t);return ze(r,o??Ve)}catch(r){console.warn("LLM classification failed, falling back to keyword heuristic:",r);const a=ze(o??Ve,Ve);return r&&typeof r=="object"&&"_rateLimit"in r&&(a._rateLimit=r._rateLimit),a}}const qe=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"];function ue(e){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(e):null}function kt(e,t){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(e,t)}function Xe(e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.removeItem(e)}class vo{constructor(){this.driveService=new vi,this.tokenClient=null,this.userEmail=null,this.authenticated=!1,this.isDriveSyncing=!1,this.authStateCallbacks=new Set,this.userEmail=ue("chroma-chords-auth")||ue("chroma-chords-user")||ue("chord-voyager-auth"),this.initSilentAuth(),this.setupGoogleAuth()}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}subscribeAuthState(t){return this.authStateCallbacks.add(t),t(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(t)}notifyAuthState(){this.authStateCallbacks.forEach(t=>t(this.userEmail,this.authenticated))}async hashEmail(t){const s=new TextEncoder().encode(t),o=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}initSilentAuth(){const t=ue("chroma-chords-auth")||ue("chord-voyager-auth");t&&this.hashEmail(t).then(i=>{qe.includes(i)&&(this.authenticated=!0,this.userEmail=t,this.notifyAuthState())})}setupGoogleAuth(){if(typeof window>"u")return;const t=setInterval(()=>{window.google&&(clearInterval(t),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async i=>{if(!(!i||i.error||!i.access_token))try{const s=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${i.access_token}`}});if(!s.ok)return;const o=await s.json();if(!o?.email)return;const r=await this.hashEmail(o.email);if(!qe.includes(r))return;this.authenticated=!0,this.userEmail=o.email,kt("chroma-chords-auth",o.email),this.driveService.setAccessToken(i.access_token),this.notifyAuthState(),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(s){console.error("Silent Drive auth failed",s)}}}))},200)}async requestLogin(){return typeof window>"u"?null:(window.google?.accounts?.oauth2||await new Promise(t=>{const i=document.querySelector('script[src="https://accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>t(),{once:!0}),setTimeout(t,3e3);return}const s=document.createElement("script");s.src="https://accounts.google.com/gsi/client",s.async=!0,s.onload=()=>t(),s.onerror=()=>t(),document.head.appendChild(s)}),window.google?.accounts?.oauth2?new Promise(t=>{try{this.tokenClient||(this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata",callback:async i=>{if(i?.access_token){this.driveService.setAccessToken(i.access_token),Kt(i.access_token);const o=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${i.access_token}`}}).catch(()=>null))?.json().catch(()=>null);if(!o?.email){t(null);return}const r=await this.hashEmail(o.email);if(!qe.includes(r)){t(null);return}const a=o.email;kt("chroma-chords-auth",a),this.userEmail=a,this.authenticated=!0,this.notifyAuthState(),await this.syncProjectsFromCloud(),t(a);return}t(null)}})),this.tokenClient.requestAccessToken()}catch(i){console.warn("Google Identity Services request failed:",i),t(null)}}):null)}logout(){Xe("chroma-chords-auth"),Xe("chroma-chords-user"),Xe("chord-voyager-auth"),this.userEmail=null,this.authenticated=!1,this.notifyAuthState()}getProjects(){return H.getProjects()}saveProject(t){H.saveProject(t)}deleteProject(t){H.deleteProject(t)}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const t=await this.driveService.loadProjects();if(t){t.forEach(o=>o.syncedToCloud=!0);const i=H.getProjects(),s=H.mergeProjects(i,t);H.setProjects(s)}}catch(t){console.error("Failed to sync from cloud",t)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!(!this.authenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const t=H.getProjects();await this.driveService.saveProjects(t),t.forEach(i=>i.syncedToCloud=!0),H.setProjects(t)}catch(t){console.error("Failed to sync to cloud",t)}finally{this.isDriveSyncing=!1}}}}const j=new vo,Z=new Et({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),yo=new li({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:e=>{console.warn("Failed to load Rhodes piano sampler:",e)}}).connect(Z),xo=new L(J,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(Z),bo=new $t({decay:4.5,wet:.35}).connect(Z),wo=new L(J,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(bo),ko=new Ot({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(Z),To=new L(J,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(ko),Io=new L(Dt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(Z),So=new L(me,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(Z),Ao=new L(J,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(Z),No=new L(me,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(Z);function Mo(e){switch(e){case"organ":return xo;case"pad-strings":return wo;case"juno-pad":return To;case"stab":return Io;case"epiano":return So;case"guitar":return Ao;case"bell":return No;case"rhodes":default:return yo}}const ne=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],ae=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],ct={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},dt={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Co={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function $e(e){const t=ct[e]??"rhodes";return Co[t]??"Piano"}function Oe(e){return(dt[e]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function Eo(){return Promise.race([hi(),new Promise(e=>setTimeout(e,3e3))])}function Zt(e,t){const i=t/60;switch(e){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function ei(e,t){const i=[];for(let s=0;s<t;s++)for(const o of e){const r=o.match(/^([A-G]#?)(-?\d+)$/);if(r){const a=r[1],n=parseInt(r[2],10)+s;i.push(`${a}${n}`)}else i.push(o)}return i}function ti(e,t){const i=[...e];switch(t){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Tt={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function $o(e){if(!e)return;const t=e.toLowerCase().trim();return Tt[t]?Tt[t]:ne.find(s=>s.name.toLowerCase()===t||s.instrument.toLowerCase()===t)?.name}function Oo(e){if(!e)return;const t=e.toLowerCase().trim();return t.includes("strum")?"Strum":t.includes("descend")?"Descending Arp":t.includes("half")?"Half-time":t.includes("swing")||t.includes("broken")?"Broken (swing)":t.includes("offbeat")||t.includes("ska")||t.includes("syncopat")||t.includes("groove")?"Off-beat / Ska":t.includes("triplet")||t.includes("fast")?"Fast Triplet":t.includes("arp")||t.includes("cascade")?"Arpeggio":t.includes("block")||t.includes("pad")||t.includes("sustained")?"Block chords":ae.find(s=>s.name.toLowerCase()===t)?.name??"Block chords"}function Do(e,t=.7,i,s="rhodes",o){try{Promise.all([ci(),Eo()]).then(()=>{const r=Mo(s);if(o&&typeof o=="object"&&Object.keys(o).length>0)try{typeof r.set=="function"&&r.set(o)}catch(h){console.warn("Failed to apply customConfig to Tone.js instrument:",h)}const a=e.length,n=a<=1?1:Math.max(.4,1/Math.sqrt(a)),c=di();if(i&&i.arpMode&&i.arpMode!=="off"){const h=i.bpm??80,f=i.arpRate??"1/16",l=i.arpRange??1,m=i.arpMode,v=Zt(f,h),y=ei(e,l),p=ti(y,m),b=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*n:n,M=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,v*.9);p.forEach((k,x)=>{const N=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;r.triggerAttackRelease(k,M,c+x*v+N,b())});return}e.forEach((h,f)=>{let l=0,m=n,v=t;if(i){const{minVelocity:y,maxVelocity:p,spread:b,microTiming:M,humanVariance:k,duration:x}=i;m=(y+Math.random()*(p-y))/127*n;const P=f*b*.1,U=(Math.random()-.5)*M*.05,V=(Math.random()-.5)*k*.03;l=Math.max(0,P+U+V),v=x*(1+(Math.random()-.5)*.2*k)}r.triggerAttackRelease(h,v,c+l,m)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function It(e,t,i){const s=i?.instrument?ne.find(l=>l.name===i.instrument):void 0,o=i?.playStyle?ae.find(l=>l.name===i.playStyle):void 0,r=s?.instrument??ct[t]??"rhodes",a=dt[t]||{},n=o?.patch??{},c={...a,...n,bpm:i?.bpm??a.bpm??90},h=i?.duration??a.duration??.9,f=n.durationMultiplier?h*n.durationMultiplier:h;Do(e,f,c,r,i?.customConfig)}class Po{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set}setProgression(t,i){this.mode="single",this.progression=t,t?this.order=i||Array.from({length:t.chords.length},(s,o)=>o):this.order=[]}setSong(t){this.mode="song",this.sections=t,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((t,i)=>t+i.order.length,0):this.order.length}setOrder(t,i){this.order=t,typeof i=="number"&&(this.activeIndex=i)}setInstrument(t){this.instrument=t}setPlayStyle(t){this.playStyle=t}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(t){return this.tickCallbacks.add(t),()=>this.tickCallbacks.delete(t)}notifyTick(){const t=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,t,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,t,!1))}updateSongStepState(t){let i=0;for(let s=0;s<this.sections.length;s++){const o=this.sections[s].order.length;if(t<i+o){this.activeSectionIndex=s;const r=t-i;this.activeIndex=this.sections[s].order[r]??0,this.progressStep=r;return}i+=o}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const t=this.getTotalSteps();if(t<=0)return;this.songStep=(this.songStep+1)%t,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},st)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}playActiveChord(){if(this.mode==="song"){const t=this.sections[this.activeSectionIndex];if(!t)return;const i=this.activeIndex,s=t.progression.chords[i];if(s){const o=s.notes.map(r=>`${r}4`);It(o,t.progression.genre,{bpm:t.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const t=this.order[this.activeIndex]??0,i=this.progression.chords[t];i&&this.playChordNotes(i.notes,1.2)}}playChordAtIndex(t,i=.8){if(!this.progression||!this.progression.chords[t])return;const s=this.progression.chords[t];this.playChordNotes(s.notes,i)}playChordNotes(t,i){if(!this.progression)return;const s=t.map(o=>`${o}4`);It(s,this.progression.genre,{bpm:this.progression.bpm,duration:i,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const S=new Po;class Bo{static setGoogleToken(t){Kt(t)}static getGoogleToken(){return mo()}static async resolvePrompt(t,i,s,o,r,a){let n=a||null,c=null,h=null;if(!n&&r&&r.trim().length>0)try{n=await Qt(r)}catch(m){console.warn("Failed to classify prompt via LLM/local fallback:",m)}const f=!!(n&&n.chords?.length&&n.key&&n.scaleType);let l=null;return f&&n&&n.chords&&n.key&&n.scaleType&&(l=Vi(t,n.key,n.scaleType,n.chords,n.genre||i,n.mood||s)),l||(l=Lt(t,i,s,{length:o})),f&&n&&(n.instrumentConfig?.presetId&&(c=$o(n.instrumentConfig.presetId)??null),n.rhythmStyle&&(h=Oo(n.rhythmStyle)??null)),l.chords.length>o&&(l={...l,chords:l.chords.slice(0,o)}),r&&(l={...l,searchTerm:r}),{progression:l,instrument:c,playStyle:h,normalizedSuggestion:n}}}const ge=[{name:"Verse",desc:"Settled, familiar.",reorder:e=>Array.from({length:e},(t,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:e=>Array.from({length:e},(t,i)=>(i+Math.ceil(e/2))%e)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:e=>Array.from({length:e},(t,i)=>(i+1)%e)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:e=>Array.from({length:e},(t,i)=>e-1-i)},{name:"Outro",desc:"Settles back down.",reorder:e=>Array.from({length:e},(t,i)=>(i-1+e)%e)}];class Se{static createInitialSong(t,i){const s=i||Array.from({length:t.chords.length},(o,r)=>r);return[{name:ge[0].name,desc:ge[0].desc,progression:t,order:s.slice()}]}static addSection(t,i){if(t.length>=ge.length)return{sections:t,activeIndex:t.length-1};const s=ge[t.length],o=s.reorder(i.chords.length),r={name:s.name,desc:s.desc,progression:i,order:o},a=[...t,r];return{sections:a,activeIndex:a.length-1}}static syncActiveSection(t,i,s,o){if(!t[i])return t;const r=[...t];return r[i]={...r[i],progression:s,order:o.slice()},r}}var _o=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,ht=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ro(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&_o(t,i,o),o};const it=["bean","bird","cat","note"];function be(e=.45){return{show:Math.random()<e,kind:it[Math.floor(Math.random()*it.length)]}}function we(e){return e[Math.floor(Math.random()*e.length)]}class pt{constructor(t=7,i=1800){this.threshold=t,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const t=Date.now();return t-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=t,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const Lo={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let ke=class extends G{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(e){if(e.has("kind")||e.has("scale")){const{width:t,height:i}=Lo[this.kind];this.style.width=`${t*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const e="#D98A54";return d`
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
    `}renderBird(){const e="#7C93A8",t="#E8A24A";return d`
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
    `}renderCat(){const e="#8FA888";return d`
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
    `}renderNote(){const e="#B7A6DE",t="#8672B0";return d`
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
    `}render(){const e=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return e?d`<div style="transform:scale(${this.scale}); transform-origin:top left;">${e}</div>`:Pt}};ke.styles=z`
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
  `;ht([w({type:String})],ke.prototype,"kind",2);ht([w({type:Number})],ke.prototype,"scale",2);ke=ht([Y("mascot-character")],ke);var Uo=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,ut=(e,t,i,s)=>{for(var o=s>1?void 0:s?jo(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Uo(t,i,o),o};const ot=3200;let Te=class extends G{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(e){e.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},ot))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?d`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${it.map(e=>d`<mascot-character .kind=${e} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:Pt}};Te.styles=z`
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
      animation: egg-pop ${ot}ms ease forwards;
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
      animation: egg-caption-pop ${ot}ms ease forwards;
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
  `;ut([w({type:Number})],Te.prototype,"trigger",2);ut([g()],Te.prototype,"visible",2);Te=ut([Y("mascot-parade")],Te);var Fo=Object.defineProperty,zo=Object.getOwnPropertyDescriptor,$=(e,t,i,s)=>{for(var o=s>1?void 0:s?zo(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Fo(t,i,o),o};const Go=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],Yo=800,Vo=["#F2A79B","#9CC0EC","#F6D98B"],qo=[6,3,12],St=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],Xo=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Ho=["Warm","Melancholy","Nostalgic","Dreamy"],At=["Drew a total blank on that one — good thing there's a picker right below.","That one stumped us completely. The genre & mood dials still work great, though.","Our ears just short-circuited. Manual mode has never let anyone down.","No idea, honestly — but you clearly do. Pick a genre & mood below."],Ae=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let E=class extends G{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=be(.35),this.mascotSlot=we(Go),this.peekMascot=be(.18),this.peekSide=we(["left","right"]),this.isAuthenticated=!1,this.isAdmin=!1,this.currentProvider=qt(),this.currentModel=Xt(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.remainingRequests=null,this.loadingTimer=null,this.eggCounter=new pt,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const e=performance.now(),t=this.getBoundingClientRect(),i=t.width>0?t.width:typeof window<"u"?window.innerWidth:800,s=t.height>0?t.height:typeof window<"u"?window.innerHeight:600,o=this.jellyBodies,r=o.length;for(let a=0;a<r;a++){const n=o[a];if(n.vx+=Math.sin(e*6e-4*n.driftFreqX+n.driftPhaseX)*n.driftForce,n.vy+=Math.cos(e*7e-4*n.driftFreqY+n.driftPhaseY)*n.driftForce,this.mouseX!==null&&this.mouseY!==null){const f=n.x-this.mouseX,l=n.y-this.mouseY,m=Math.hypot(f,l);if(m<140&&m>0){const v=(1-m/140)*.12;n.vx+=f/m*v,n.vy+=l/m*v}}n.vx*=n.drag,n.vy*=n.drag;const c=Math.hypot(n.vx,n.vy);c>n.maxSpeed&&(n.vx=n.vx/c*n.maxSpeed,n.vy=n.vy/c*n.maxSpeed),n.x+=n.vx,n.y+=n.vy,n.angle+=n.vRot;const h=n.radius;n.x<h?(n.x=h,n.vx=Math.abs(n.vx)*n.restitution+.02,n.squishX=.88,n.squishY=1.12):n.x>i-h&&(n.x=i-h,n.vx=-Math.abs(n.vx)*n.restitution-.02,n.squishX=.88,n.squishY=1.12),n.y<h?(n.y=h,n.vy=Math.abs(n.vy)*n.restitution+.02,n.squishX=1.12,n.squishY=.88):n.y>s-h&&(n.y=s-h,n.vy=-Math.abs(n.vy)*n.restitution-.02,n.squishX=1.12,n.squishY=.88),n.squishX+=(1-n.squishX)*.08,n.squishY+=(1-n.squishY)*.08}for(let a=0;a<r;a++)for(let n=a+1;n<r;n++){const c=o[a],h=o[n],f=h.x-c.x,l=h.y-c.y,m=Math.hypot(f,l),v=c.radius+h.radius;if(m<v&&m>0){const y=v-m,p=f/m,b=l/m;c.x-=p*y*.4,c.y-=b*y*.4,h.x+=p*y*.4,h.y+=b*y*.4;const M=c.vx-h.vx,k=c.vy-h.vy,x=(p*M+b*k)/(c.mass+h.mass),N=.35;c.vx-=x*h.mass*p*N,c.vy-=x*h.mass*b*N,h.vx+=x*c.mass*p*N,h.vy+=x*c.mass*b*N;const P=.12;c.squishX=Math.max(.85,1-P*Math.abs(p)),c.squishY=Math.max(.85,1-P*Math.abs(b)),h.squishX=Math.max(.85,1-P*Math.abs(p)),h.squishY=Math.max(.85,1-P*Math.abs(b))}}if(this.shadowRoot)for(let a=0;a<r;a++){const n=o[a],c=this.shadowRoot.getElementById(`jelly-${n.id}`);c&&(c.style.transform=`translate3d(${n.x-n.radius}px, ${n.y-n.radius}px, 0) rotate(${n.angle}deg) scale(${n.squishX}, ${n.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*Ae.length),this.loadingTimer=setInterval(()=>{let e=Math.floor(Math.random()*Ae.length);e===this.loadingMsgIdx&&(e=(e+1)%Ae.length),this.loadingMsgIdx=e},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(e){this.currentProvider=e,po(e),e==="google"?(this.currentModel=Ee[0].id,Ye(this.currentModel)):e==="opencodeai"&&(this.currentModel=Ge[0].id,Ye(this.currentModel))}changeModel(e){this.currentModel=e,Ye(e)}initJellyBodies(){const e=this.getBoundingClientRect(),t=e.width>0?e.width:typeof window<"u"?window.innerWidth:800,i=e.height>0?e.height:typeof window<"u"?window.innerHeight:600,s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"ring",r:22},{key:"doubleRing",r:18},{key:"pill",r:16},{key:"crescent",r:16},{key:"arch",r:15},{key:"squircle",r:16}],o=10,r=[];for(let a=0;a<o;a++){const n=s[a%s.length],c=n.r+30,h=c+Math.random()*Math.max(100,t-c*2),f=c+Math.random()*Math.max(100,i-c*2),l=.08+Math.random()*.18,m=.35+Math.random()*.25,v=.985,y=.006+Math.random()*.008,p=.35,b=Math.random()*Math.PI*2;r.push({id:a,shapeKey:n.key,width:n.r*2,height:n.r*2,x:h,y:f,vx:Math.cos(b)*l,vy:Math.sin(b)*l,maxSpeed:m,drag:v,driftForce:y,restitution:p,radius:n.r,mass:n.r*n.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=r}onFrameMouseMove(e){const t=this.getBoundingClientRect();this.mouseX=e.clientX-t.left,this.mouseY=e.clientY-t.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}loadKeyInfo(){this.isAdmin&&go().then(e=>{e&&typeof e.remaining=="number"&&(this.remainingRequests=e.remaining)})}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%St.length},2800),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(e){super.updated(e),e.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.stopLoadingTimer()}selectGenre(e){this.dispatchEvent(new CustomEvent("genre-change",{detail:e,bubbles:!0,composed:!0}))}selectMood(e){this.dispatchEvent(new CustomEvent("mood-change",{detail:e,bubbles:!0,composed:!0}))}generate(){this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}setLength(e){this.dispatchEvent(new CustomEvent("length-change",{detail:e,bubbles:!0,composed:!0}))}decLength(){this.length>ie&&this.setLength(this.length-1)}incLength(){this.length<F&&this.setLength(this.length+1)}onFreeTextChange(e){this.freeText=e.target.value,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.freeText.trim().length<=2&&(this.isClassifying=!1),this.scheduleClassify();const t=this.freeText.trim();if(t.length>2){const i=tt(t);i&&this.applyBest(i)}}scheduleClassify(){this.classifyDebounce&&clearTimeout(this.classifyDebounce);const e=this.freeText.trim(),t=e.toLowerCase();if(e.length<=2||["m","mo","moc","t","te","tes"].includes(t)){this.isClassifying=!1;return}const i=++this.classifyToken;this.classifyDebounce=setTimeout(async()=>{this.isClassifying=!0;try{const s=await Qt(e);if(i!==this.classifyToken)return;s?._rateLimit?.remaining!==void 0&&(this.remainingRequests=s._rateLimit.remaining),this.llmSuggestion=s,this.llmResolved=!0,this.classifyError=s?null:At[Math.floor(Math.random()*At.length)],s&&this.applyBest(s)}finally{i===this.classifyToken&&(this.isClassifying=!1)}},Yo)}applyBest(e){this.selectGenre(e.genre),this.selectMood(e.mood);const t={...e,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:t,bubbles:!0,composed:!0}))}renderJellySvg(e){switch(e){case"blob1":return d`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return d`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return d`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return d`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return d`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return d`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return d`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return d`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return d`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return d`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return d`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return d`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return d`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return d`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const e=ve(this.mood);let t=Xo.filter(l=>fe.includes(l));t.includes(this.genre)||(t=t.slice(0,-1).concat(this.genre));const i=fe.filter(l=>!t.includes(l)),s=this.expandedGenre?t.concat(i):t,o=K.map(l=>l.name);let r=Ho.filter(l=>o.includes(l));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const a=o.filter(l=>!r.includes(l)),c=(this.expandedMood?r.concat(a):r).map(l=>K.find(m=>m.name===l)),h=this.freeText.trim();let f=null;return h.length>2&&(f=this.llmResolved?this.llmSuggestion:tt(h)),d`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <div class="aquarium-layer">
          ${this.jellyBodies.map(l=>d`
            <div class="jelly-shape-wrapper" id="jelly-${l.id}" style="transform: translate3d(${l.x-l.radius}px, ${l.y-l.radius}px, 0) rotate(${l.angle}deg) scale(${l.squishX}, ${l.squishY})">
              ${this.renderJellySvg(l.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?d`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}
        
        ${this.isAuthenticated?d`
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
            ${this.peekMascot.show?d`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div class="vibe-input-wrap">
              ${this.isClassifying?d`
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
                @input=${l=>this.onFreeTextChange(l)}
                placeholder=${St[this.placeholderIdx]}
              />
              ${this.isAdmin?d`
                <button class="vibe-admin-btn" @click=${()=>{this.showAdminModal=!0}} title="AI Model Configuration">
                  ⚡ ${this.currentProvider==="google"?`Google AI (${Ee.find(l=>l.id===this.currentModel)?.name||"Gemini"})`:this.currentProvider==="opencodeai"?`OpenCode AI (${Ge.find(l=>l.id===this.currentModel)?.name||"DeepSeek V4"})`:this.currentProvider==="anthropic"?"Claude":this.remainingRequests!==null?`OpenRouter (${this.remainingRequests} left)`:"OpenRouter"}
                </button>
              `:""}
            </div>
          </div>
          ${this.isClassifying?d`
            <div class="suggestion-wrap">
              <div class="suggestion-note loading">✨ ${Ae[this.loadingMsgIdx]}</div>
            </div>
          `:f?d`
            <div class="suggestion-wrap">
              <div class="suggestion-note">Sounds like <span class="suggestion-highlight" style="color:${e}">${f.genre} · ${f.mood}</span> — the picks below already match.</div>
            </div>
          `:this.classifyError?d`
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
            ${s.map(l=>{const m=fe.indexOf(l);return d`
                <div class="pill ${l===this.genre?"selected":""}" style=${l===this.genre?`background:${e}`:""} @click=${()=>this.selectGenre(l)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${qo[m%3]} fill=${Vo[m%3]} />
                    </svg>
                  </div>
                  ${l}
                </div>
              `})}
            ${i.length?d`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${i.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${c.map(l=>d`
              <div class="pill mood-pill ${l.name===this.mood?"selected":""}" style=${l.name===this.mood?`background:${l.dot}`:""} @click=${()=>this.selectMood(l.name)}>
                <div class="mood-badge" style="background:${l.name===this.mood?"rgba(46,39,31,0.1)":l.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${l.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${l.iconPath} />
                  </svg>
                </div>
                ${l.name}
              </div>
            `)}
            ${a.length?d`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${a.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=ie?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:F},(l,m)=>d`
                <div class="length-segment ${m<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=F?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button class="cta" style="background:${e}" @click=${this.generate}>
            ${f?"Let's go to your progression":"Generate loop"} <span>→</span>
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
            ${this.isAuthenticated?d`
              <button class="footer-login-btn" @click=${this.onLogoutClick}>Sign out</button>
            `:d`
              <button class="footer-login-btn" @click=${this.onLoginClick}>Sign in</button>
            `}
          </div>
        </div>

        ${this.showAdminModal?d`
          <div class="admin-modal-backdrop" @click=${()=>{this.showAdminModal=!1}}>
            <div class="admin-modal" @click=${l=>l.stopPropagation()}>
              <div class="admin-title">AI Provider Config</div>
              <div class="admin-desc">Select which backend model service classifies free-text prompts into chord progressions:</div>
              ${this.remainingRequests!==null?d`
                <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                  📊 Daily OpenRouter Quota: ${this.remainingRequests} remaining requests left today.
                </div>
              `:""}
              <div class="admin-options">
                <button class="admin-opt ${this.currentProvider==="google"?"active":""}" @click=${()=>this.changeProvider("google")}>
                  <div class="opt-name">🎯 Google AI Studio (Free)</div>
                  <div class="opt-detail">Gemini Flash models directly via free tier (No deposit required)</div>
                  ${this.currentProvider==="google"?d`
                    <div class="model-sub-list" @click=${l=>l.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${Ee.map(l=>d`
                        <div class="model-sub-opt ${this.currentModel===l.id?"selected":""}" @click=${()=>this.changeModel(l.id)}>
                          <span>${l.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${l.vendor}</span>
                        </div>
                      `)}
                    </div>
                  `:""}
                </button>
                <button class="admin-opt ${this.currentProvider==="opencodeai"?"active":""}" @click=${()=>this.changeProvider("opencodeai")}>
                  <div class="opt-name">⚡ OpenCode AI</div>
                  <div class="opt-detail">Fast, free models hosted on OpenCode AI</div>
                  ${this.currentProvider==="opencodeai"?d`
                    <div class="model-sub-list" @click=${l=>l.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${Ge.map(l=>d`
                        <div class="model-sub-opt ${this.currentModel===l.id?"selected":""}" @click=${()=>this.changeModel(l.id)}>
                          <span>${l.name}</span>
                          <span class="model-vendor-badge">${l.vendor}</span>
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
    `}};E.styles=z`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
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
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
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
      color: rgba(46, 39, 31, 0.34);
      opacity: 1;
      transition: color 0.3s ease;
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
        top: 16px;
        right: 16px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  `;$([w({type:String})],E.prototype,"genre",2);$([w({type:String})],E.prototype,"mood",2);$([w({type:Number})],E.prototype,"length",2);$([g()],E.prototype,"freeText",2);$([g()],E.prototype,"placeholderIdx",2);$([g()],E.prototype,"llmSuggestion",2);$([g()],E.prototype,"llmResolved",2);$([g()],E.prototype,"classifyError",2);$([g()],E.prototype,"expandedGenre",2);$([g()],E.prototype,"expandedMood",2);$([g()],E.prototype,"mascot",2);$([g()],E.prototype,"mascotSlot",2);$([g()],E.prototype,"peekMascot",2);$([g()],E.prototype,"peekSide",2);$([w({type:Boolean})],E.prototype,"isAuthenticated",2);$([w({type:Boolean})],E.prototype,"isAdmin",2);$([g()],E.prototype,"currentProvider",2);$([g()],E.prototype,"currentModel",2);$([g()],E.prototype,"showAdminModal",2);$([g()],E.prototype,"isClassifying",2);$([g()],E.prototype,"loadingMsgIdx",2);$([g()],E.prototype,"remainingRequests",2);$([g()],E.prototype,"paradeTrigger",2);E=$([Y("seed-screen")],E);var Wo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,R=(e,t,i,s)=>{for(var o=s>1?void 0:s?Jo(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Wo(t,i,o),o};const Ko=["C","D","E","F","G","A","B"],Qo=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],Zo=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],es=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}];let _=class extends G{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=0,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=e=>{e.preventDefault(),this.dragStartY=e.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=e=>{this.dragging&&(this.dragY=Math.max(0,e.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const e=Math.max(1,performance.now()-this.dragStartTime),t=this.dragY/e,i=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>i*.3||t>.6;this.snapping=!0,s?(this.dragY=i+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(e){e.target===e.currentTarget&&this.close()}setQuality(e){this.quality=e,this.previewVoicing(),this.commitVoicing()}setExtension(e){this.extension=e,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const e=Qe(this.chord.name),t=e.includes("b"),i=Ze(e,this.quality,this.extension,t);this.emit("voicing-preview",i)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(e){e.has("resetKey")&&(this.quality="Major",this.extension="None")}render(){const e=this.chord,t=Qe(e.name),i=t.includes("b"),s=this.mode==="voicing"?Ze(t,this.quality,this.extension,i):e.notes,o=Pe(e.tension),r=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return d`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${r} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div>
            ${this.mode==="voicing"?d`
              <div class="step-label">Chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Adjust the voicing.</div>
            `:d`
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
            <div class="current-name">${this.mode==="voicing"?e.name:d`${e.name} — ${e.functionLabel}`}</div>
          </div>
        </div>

        ${this.mode==="swap"?d`
          <div class="alt-list">
            ${this.alternatives.map(a=>{const n=Pe(a.chord.tension),c=Math.round(n.size*.4);return d`
                <div class="alt-row" @click=${()=>this.emit("select-alternative",a)}>
                  <div class="alt-shape" style="width:${c}px;height:${c}px;border-radius:${Math.round(n.radius*(c/n.size))}px;background:${n.color};"></div>
                  <div style="flex:1;min-width:0;">
                    <div class="alt-name">${a.label}</div>
                    <div class="alt-sub">${a.sub}</div>
                    ${this.showTheory?d`
                      <div class="alt-tag">${a.functionCaption}</div>
                      <div class="alt-desc">${a.rationale}</div>
                    `:""}
                  </div>
                  <div class="alt-arrow">→</div>
                </div>
              `})}
          </div>
        `:""}

        ${this.mode==="voicing"?d`
          <div class="voicing-section">
            <div>
              <div class="bento">
                ${Zo.map(a=>d`
                  <div class="bento-card" style=${a.label===this.quality?`background:${this.moodColor}`:""} @click=${()=>this.setQuality(a.label)}>
                    <div class="bento-label">${a.label}</div>
                    <div class="bento-sub">${a.sub}</div>
                  </div>
                `)}
              </div>
              <div class="bento ext">
                ${es.map((a,n)=>d`
                  <div class="bento-card ${n===0?"span":""}" style=${a.label===this.extension?`background:${this.moodColor}`:""} @click=${()=>this.setExtension(a.label)}>
                    <div class="bento-label">${a.label}</div>
                    <div class="bento-sub">${a.sub}</div>
                  </div>
                `)}
              </div>
              <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
              <div class="keyboard">
                ${Ko.map(a=>d`
                  <div class="white-key ${s.includes(a)?"active":""}" style=${s.includes(a)?`background:${this.moodColor}`:""}>${a}</div>
                `)}
                ${Qo.map(a=>d`
                  <div class="black-key" style="left:${a.left};${s.includes(a.note)||s.includes(a.flat)?`background:${this.moodColor}`:""}"></div>
                `)}
              </div>
            </div>
          </div>
        `:""}
        </div>
      </div>
    `}};_.styles=z`
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
  `;R([w({type:Object})],_.prototype,"chord",2);R([w({type:Array})],_.prototype,"alternatives",2);R([w({type:Boolean})],_.prototype,"showTheory",2);R([w({type:String})],_.prototype,"moodColor",2);R([w({type:Number})],_.prototype,"position",2);R([w({type:Number})],_.prototype,"total",2);R([w({type:String})],_.prototype,"mode",2);R([w({type:Boolean})],_.prototype,"visible",2);R([w({type:Number})],_.prototype,"resetKey",2);R([g()],_.prototype,"quality",2);R([g()],_.prototype,"extension",2);R([g()],_.prototype,"dragY",2);R([g()],_.prototype,"dragging",2);R([g()],_.prototype,"snapping",2);R([Bt(".sheet")],_.prototype,"sheetEl",2);_=R([Y("swap-sheet")],_);var ts=Object.defineProperty,is=Object.getOwnPropertyDescriptor,ii=(e,t,i,s)=>{for(var o=s>1?void 0:s?is(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&ts(t,i,o),o};const os=W`
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
`,ss=W`
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
`,rs=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:os},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:ss}];let Re=class extends G{constructor(){super(...arguments),this.visible=!1}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}render(){return d`
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
          ${rs.map(e=>d`
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
    `}};Re.styles=z`
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
  `;ii([w({type:Boolean})],Re.prototype,"visible",2);Re=ii([Y("share-modal")],Re);function Nt(e){const t={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=e.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const s=i[1].charAt(0).toUpperCase()+i[1].slice(1),o=t[s]??0,r=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+o))}function oi(e,t,i){const s=t&&t.length>0?t.map(v=>e.chords[v]).filter(v=>!!v):e.chords,o=e.bpm||120,r=1.7,a=i?ae.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,n=dt[e.genre]||{},c=a?.patch??{},h={...n,...c},f=n.duration??.9,l=c.durationMultiplier?f*c.durationMultiplier:f,m=[];return s.forEach((v,y)=>{const p=y*r,M=(v.notes&&v.notes.length>0?v.notes:["C","E","G"]).map(k=>`${k}4`);if(h.arpMode&&h.arpMode!=="off"){const k=h.arpRate??"1/16",x=h.arpRange??1,N=h.arpMode,P=Zt(k,o),U=ei(M,x),V=ti(U,N),ce=h.duration?h.duration:Math.max(.6,l);V.forEach((oe,u)=>{const B=p+u*P;m.push({note:oe,midi:Nt(oe),startTime:B,duration:ce})})}else{const k=h.spread??0;M.forEach((x,N)=>{const P=N*k*.1,U=p+P;m.push({note:x,midi:Nt(x),startTime:U,duration:l})})}}),m}function ns(e){const t=[];let i=Math.max(0,Math.floor(e));for(t.push(i&127);(i>>=7)>0;)t.unshift(i&127|128);return t}function as(e,t,i){const s=e.bpm||120,o=480,r=oi(e,t,i),a=[];r.forEach(p=>{const b=Math.round(p.startTime/(60/s)*o),M=Math.max(1,Math.round(p.duration/(60/s)*o));a.push({tick:b,type:"on",midi:p.midi}),a.push({tick:b+M,type:"off",midi:p.midi})}),a.sort((p,b)=>p.tick!==b.tick?p.tick-b.tick:p.type!==b.type?p.type==="off"?-1:1:p.midi-b.midi);const n=[],c=Math.round(6e7/s);n.push(0),n.push(255,81,3),n.push(c>>16&255,c>>8&255,c&255);const h="Chroma Chords";n.push(0),n.push(255,3,h.length);for(let p=0;p<h.length;p++)n.push(h.charCodeAt(p));let f=0;a.forEach(p=>{const b=p.tick-f;f=p.tick,n.push(...ns(b)),p.type==="on"?n.push(144,p.midi,80):n.push(128,p.midi,0)}),n.push(0),n.push(255,47,0);const l=[77,84,104,100,0,0,0,6,0,0,0,1,o>>8&255,o&255],m=n.length,v=[77,84,114,107,m>>24&255,m>>16&255,m>>8&255,m&255],y=new Uint8Array(l.length+v.length+n.length);return y.set(l,0),y.set(v,l.length),y.set(n,l.length+v.length),y}function ls(e,t,i,s){const o=as(e,t,s),r=new Blob([o],{type:"audio/midi"}),a=(e.key||"C").toLowerCase(),n=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),c=e.bpm||120,h=`chroma-chords-${a}-${n}-${c}bpm.mid`;si(r,h)}function cs(e,t){const i=new Et({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((e?ne.find(r=>r.name.toLowerCase()===e.toLowerCase()):void 0)?.instrument??(t?ct[t]:void 0)??"rhodes"){case"bell":return new L(me,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new L(me,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new L(J,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new L(J,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const r=new $t({decay:4.5,wet:.35}).connect(i);return new L(J,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new Ot({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new L(J,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new L(Dt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new L(me,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function ds(e){const t=e.numberOfChannels,i=e.sampleRate,s=16,o=s/8,r=t*o,a=e.length*t*o,n=new ArrayBuffer(44+a),c=new DataView(n),h=(m,v)=>{for(let y=0;y<v.length;y++)c.setUint8(m+y,v.charCodeAt(y))};h(0,"RIFF"),c.setUint32(4,36+a,!0),h(8,"WAVE"),h(12,"fmt "),c.setUint32(16,16,!0),c.setUint16(20,1,!0),c.setUint16(22,t,!0),c.setUint32(24,i,!0),c.setUint32(28,i*r,!0),c.setUint16(32,r,!0),c.setUint16(34,s,!0),h(36,"data"),c.setUint32(40,a,!0);const f=[];for(let m=0;m<t;m++)f.push(e.getChannelData(m));let l=44;for(let m=0;m<e.length;m++)for(let v=0;v<t;v++){const y=Math.max(-1,Math.min(1,f[v][m])),p=y<0?y*32768:y*32767;c.setInt16(l,p,!0),l+=2}return new Blob([new Uint8Array(n)],{type:"audio/wav"})}async function hs(e,t,i,s){const o=oi(e,t,s);if(!o.length)return;const a=o.reduce((v,y)=>Math.max(v,y.startTime+y.duration),0)+1.2,n=await pi(async()=>{const v=cs(i,e.genre);o.forEach(y=>{v.triggerAttackRelease(y.note,y.duration,y.startTime)})},a),c=ds(n.get()),h=(e.key||"C").toLowerCase(),f=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=e.bpm||120,m=`chroma-chords-${h}-${f}-${l}bpm.wav`;si(c,m)}function si(e,t){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(e);if(typeof document>"u")return;const s=document.createElement("a");s.href=i,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var ps=Object.defineProperty,us=Object.getOwnPropertyDescriptor,le=(e,t,i,s)=>{for(var o=s>1?void 0:s?us(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&ps(t,i,o),o};let Q=class extends G{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(e){e.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const e=this.name.trim();e&&(this.dispatchEvent(new CustomEvent("save",{detail:e})),this.close())}onInput(e){this.name=e.target.value}onKeyDown(e){e.key==="Escape"?this.close():e.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?d`
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
    `:d``}};Q.styles=z`
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
  `;le([w({type:Boolean})],Q.prototype,"visible",2);le([w({type:String})],Q.prototype,"defaultName",2);le([g()],Q.prototype,"mounted",2);le([g()],Q.prototype,"name",2);le([Bt(".name-input")],Q.prototype,"inputEl",2);Q=le([Y("save-set-modal")],Q);var gs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,I=(e,t,i,s)=>{for(var o=s>1?void 0:s?ms(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&gs(t,i,o),o};const fs=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],He=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],vs=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],ys=["Warm","Melancholy","Nostalgic","Dreamy"],xs=["Piano","Rhodes","Nylon Guitar","Warm Pad"],bs=["Block chords","Arpeggio","Strum","Broken (swing)"],ws=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Mt=220,ks=280,Ct={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let T=class extends G{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.isAuthenticated=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.saveModalVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=be(.35),this.mascotSlot=we(fs),this.panelPeekMascot=be(.18),this.panelPeekSide=we(["left","right"]),this.eggCounter=new pt,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=e=>{if(this.lastPointerX=e.clientX,this.lastPointerY=e.clientY,this.pressTimer&&!this.drag){(Math.abs(e.clientY-this.pressStartY)>8||Math.abs(e.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:e.clientX-this.pressStartX,offsetY:e.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const e=this.drag.pos;this.drag=null,this.pressTapFn=null;const t=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let i=e,s=1/0;if(t.forEach((o,r)=>{if(r===e)return;const a=o.getBoundingClientRect(),n=a.left+a.width/2,c=a.top+a.height/2,h=(this.lastPointerX-n)**2+(this.lastPointerY-c)**2;h<s&&(s=h,i=r)}),i!==e){const o=[...this.order],[r]=o.splice(e,1);o.splice(i,0,r),this.emit("reorder",o)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),e.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},ks)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1},Mt)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Mt)}exportDevice(e,t){this.closeShare();const i=ro(this.progression,e,this.order);window.open(i,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=`Sent to ${t}`,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}async handleExportWav(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer),this.toast="Rendering WAV audio...";try{const e=this.progression,t=this.instrument??$e(e.genre),i=this.playStyle??Oe(e.genre);await hs(e,this.order,t,i),this.toast="Saved WAV audio file"}catch(e){console.error("WAV export error:",e),this.toast="Failed to export WAV"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}handleExportMidi(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer);try{const e=this.progression,t=this.instrument??$e(e.genre),i=this.playStyle??Oe(e.genre);ls(e,this.order,t,i),this.toast="Saved MIDI file"}catch(e){console.error("MIDI export error:",e),this.toast="Failed to export MIDI"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(e,t,i){i.preventDefault(),this.pressTapFn=t,this.pressStartX=i.clientX,this.pressStartY=i.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:e,offsetX:0,offsetY:0}},150)}dragStyleFor(e){const t=this.drag;return t&&t.pos===e?`transform:translate(${t.offsetX}px, ${t.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderHeaderTitle(e,t){if(e.searchTerm){const i=e.searchTerm.trim(),o=(i.endsWith(".")?i.slice(0,-1):i).split(/\s+/);if(o.length===1)return d`<h1><span style="color:${t}">${o[0]}.</span></h1>`;const r=o.slice(0,-1).join(" "),a=o[o.length-1];return d`<h1>${r} <span style="color:${t}">${a}.</span></h1>`}return d`<h1>Your progression, feeling <span style="color:${t}">${e.mood.toLowerCase()}.</span></h1>`}renderLengthControl(){const e=this.progression.chords.length;return d`
      <div class="length-control">
        <div class="length-btn ${e<=ie?"disabled":""}" @click=${()=>e>ie&&this.emit("set-length",e-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:F},(t,i)=>d`<div class="length-segment ${i<e?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${e>=F?"disabled":""}" @click=${()=>e<F&&this.emit("set-length",e+1)}>+</div>
        <div class="length-label-text">${e}</div>
      </div>
    `}render(){const e=this.progression,t=ve(e.mood),i=this.instrument??$e(e.genre),s=this.playStyle??Oe(e.genre),o=Math.max(1,this.order.length),r=this.playing?this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100:0,a=Ct[e.mood]||Ct.Dreamy,n=this.showTheory?eo(this.order.map(u=>e.chords[u]),e.key,e.scaleType):null,c=Gt(e.key,e.scaleType).length,h=c===0?"no sharps or flats":`${c} ${c===1?"sharp/flat":"sharps/flats"}`;let f=vs.filter(u=>He.includes(u));f.includes(e.genre)||(f=f.slice(0,-1).concat(e.genre));const l=He.filter(u=>!f.includes(u)),m=this.expandedMenuGenre?He:f,v=K.map(u=>u.name);let y=ys.filter(u=>v.includes(u));y.includes(e.mood)||(y=y.slice(0,-1).concat(e.mood));const p=v.filter(u=>!y.includes(u)),M=(this.expandedMenuMood?v:y).map(u=>K.find(B=>B.name===u)),k=ne.filter(u=>u.name!==i);let x=xs.filter(u=>k.some(B=>B.name===u));const N=k.filter(u=>!x.includes(u.name)),P=this.expandedAllInstruments?k:k.filter(u=>x.includes(u.name)),U=ae.filter(u=>u.name!==s);let V=bs.filter(u=>U.some(B=>B.name===u));const ce=U.filter(u=>!V.includes(u.name)),oe=this.expandedAllPlayStyles?U:U.filter(u=>V.includes(u.name));return d`
      <div class="frame">
        ${this.mascot.show?d`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}

        ${this.isAuthenticated?d`
          <div class="your-sets-btn" @click=${()=>this.emit("view-sets")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        `:""}

        <div class="top-bar">
          <div class="icon-btn" @click=${()=>this.emit("back")}>‹</div>
          <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
            <svg width="18" height="18" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
            <div class="wordmark-text">Chroma Chords</div>
          </div>
          <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted?d`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${re.map(u=>d`
                <div class="menu-chip ${u===e.key?"selected":""}" style=${u===e.key?`background:${t}`:""} @click=${()=>this.emit("set-key",u)}>${Ce(u,e.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${ws.map(u=>d`
                <div class="menu-chip ${u.value===e.scaleType?"selected":""}" style=${u.value===e.scaleType?`background:${t}`:""} @click=${()=>this.emit("set-scale",u.value)}>${u.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${m.map(u=>d`
                <div class="menu-chip ${u===e.genre?"selected":""}" style=${u===e.genre?`background:${t}`:""} @click=${()=>this.emit("set-genre",u)}>${u}</div>
              `)}
              ${l.length?d`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuGenre=!this.expandedMenuGenre}}>
                  ${this.expandedMenuGenre?"Show less ⌃":`+${l.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${M.map(u=>d`
                <div class="menu-chip ${u.name===e.mood?"selected":""}" style=${u.name===e.mood?`background:${u.dot}`:""} @click=${()=>this.emit("set-mood",u.name)}>${u.name}</div>
              `)}
              ${p.length?d`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuMood=!this.expandedMenuMood}}>
                  ${this.expandedMenuMood?"Show less ⌃":`+${p.length} more ⌄`}
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
          <div class="subcopy">${e.genre} · ${e.chords.length} ${e.chords.length===1?"chord":"chords"} · tap a chord to preview it — use the icons to swap it or view its voicing.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?d`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel" style="animation:${a.anim} ${a.dur}s ${a.ease} infinite;">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((u,B)=>{const Ie=e.chords[u],de=Pe(Ie.tension),gt=B===this.activeIndex;return d`
                  <div
                    class="chord-chip ${gt?"active":""}"
                    style="width:${de.size}px;height:${de.size}px;border-radius:${de.radius}px;background:${de.color};${this.dragStyleFor(B)}"
                    @pointerdown=${q=>this.pressStart(B,()=>this.emit("chord-preview",u),q)}
                  >
                    ${this.showTheory?d`<div class="roman-badge">${Ie.roman}</div>`:""}
                    ${gt?d`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="font-size:${de.fontSize}px;">${Ie.name}</div>
                    <div class="chord-role">${Ie.functionLabel}</div>
                    <div
                      class="swap-badge"
                      @pointerdown=${q=>q.stopPropagation()}
                      @click=${q=>{q.stopPropagation(),this.emit("chord-tap",u)}}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                    </div>
                    <div
                      class="voicing-badge"
                      aria-label="View voicing"
                      @pointerdown=${q=>q.stopPropagation()}
                      @click=${q=>{q.stopPropagation(),this.emit("chord-voicing-tap",u)}}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.2 10-6.2 10 6.2 10 6.2-3.6 6.2-10 6.2-10-6.2-10-6.2z" /><circle cx="12" cy="12" r="2.6" /></svg>
                    </div>
                  </div>
                `})}
            </div>
            </div>
          </div>

          <div class="theory-toggle-row" @click=${()=>this.emit("theory-toggle")}>
            <div class="theory-track ${this.showTheory?"on":""}"><div class="theory-knob ${this.showTheory?"on":""}"></div></div>
            <div class="theory-label">Show music theory</div>
          </div>
          ${n?d`
            <div class="theory-strip">
              <div class="theory-key-label">${Ce(e.key,e.scaleType)} ${e.scaleType.replace("_"," ")} · ${h}</div>
              <div class="theory-staff-scroll">
                ${W`
                  <svg width="${n.width}" height="${n.height}" viewBox="0 0 ${n.width} ${n.height}">
                    ${n.lines.map(u=>W`<rect x="6" y="${u}" width="${n.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${n.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${n.keySignature.map(u=>W`<text x="${u.x}" y="${u.y+6}" font-size="20" fill="var(--cv-ink)">${u.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${n.chords.map(u=>W`
                      <text x="${u.cx}" y="${u.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${u.name}</text>
                      ${u.ledgers.map(B=>W`<rect x="${B.x}" y="${B.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${u.notes.map(B=>W`<ellipse cx="${B.x}" cy="${B.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${u.cx}" y="${n.height-4}" font-size="12" font-weight="800" fill="${t}" text-anchor="middle">${u.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${t}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?d`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:d`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${r}%;background:${t};--progress-duration:${st}ms"
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
            ${this.isAuthenticated?d`
              <div class="dice-btn" title="Save set" @click=${()=>{this.saveModalVisible=!0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <div class="transport-meta">${Ce(e.key,e.scaleType).toUpperCase()} ${e.scaleType.replace("_"," ")} · ${e.bpm} BPM</div>

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
          ${this.expandedInstrument?d`
            <div class="control-options">
              ${P.map(u=>d`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",u.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${u.color}"></span>${u.name}
                </div>
              `)}
              ${N.length?d`
                <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                  ${this.expandedAllInstruments?"Show less ⌃":`+${N.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}
          ${this.expandedPlayStyle?d`
            <div class="control-options">
              ${oe.map(u=>d`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",u.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${u.color}"></span>${u.name}
                </div>
              `)}
              ${ce.length?d`
                <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                  ${this.expandedAllPlayStyles?"Show less ⌃":`+${ce.length} more ⌄`}
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

        ${this.sheetMounted&&this.swapChord?d`
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

        ${this.shareMounted?d`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${u=>this.exportDevice(u.detail.device,u.detail.name)}
            @export-wav=${()=>this.handleExportWav()}
            @export-midi=${()=>this.handleExportMidi()}
          ></share-modal>
        `:""}

        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${`${e.genre} · ${e.mood}`}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${u=>{this.emit("save-set",u.detail),this.saveModalVisible=!1}}
        ></save-set-modal>

        ${this.toast?d`<div class="toast">${this.toast.startsWith("Sent to")||this.toast.startsWith("Saved")||this.toast.startsWith("Rendering")||this.toast.startsWith("Failed")?this.toast:`Sent to ${this.toast}`}</div>`:""}
      </div>
    `}};T.styles=z`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
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
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 24px 20px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      padding: 34px 22px;
      overflow: hidden;
      min-height: 180px;
      box-shadow: 0 30px 60px -30px rgba(46, 39, 31, 0.22);
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
      display: flex;
      gap: 14px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
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
    }
    .chord-chip.active {
      transform: scale(1.06);
      box-shadow: 0 18px 34px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-name {
      font-weight: 800;
      color: var(--cv-ink);
      line-height: 1;
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
      top: -6px;
      right: -6px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
      touch-action: manipulation;
    }
    .swap-badge:hover {
      transform: scale(1.12);
    }
    .voicing-badge {
      position: absolute;
      bottom: -6px;
      left: -6px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
      touch-action: manipulation;
    }
    .voicing-badge:hover {
      transform: scale(1.12);
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
        top: 16px;
        right: 16px;
        padding: 6px 12px;
        font-size: 12px;
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

    /* flex-wrap greedily fits as many chips as their (tension-varying) widths allow per row,
       which on a narrow phone can wrap unevenly (e.g. 3 then 1). A strict 2-column grid forces
       an even 2-per-row layout without touching each chip's own size — grid tracks just divide
       the row width; the chip keeps its own inline width/height and centers within its cell. */
    @media (max-width: 600px) {
      .chip-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        align-items: center;
        row-gap: 30px;
        column-gap: 18px;
      }
      /* Extra breathing room for the swap-badge (which pokes 6px past the chip's own edge) and
         the "now" marker above the active chip — both can crowd a neighboring chip otherwise. */
      .chord-chip {
        margin: 8px;
      }
    }
  `;I([w({type:Object})],T.prototype,"progression",2);I([w({type:Number})],T.prototype,"activeIndex",2);I([w({type:Number})],T.prototype,"progressStep",2);I([w({type:Array})],T.prototype,"order",2);I([w({type:Boolean})],T.prototype,"playing",2);I([w({type:Boolean})],T.prototype,"showTheory",2);I([w({type:String})],T.prototype,"instrument",2);I([w({type:String})],T.prototype,"playStyle",2);I([w({type:Boolean})],T.prototype,"sheetOpen",2);I([w({type:Boolean})],T.prototype,"isAuthenticated",2);I([w({type:String})],T.prototype,"sheetMode",2);I([w({type:Object})],T.prototype,"swapChord",2);I([w({type:Number})],T.prototype,"swapIndex",2);I([w({type:Array})],T.prototype,"alternatives",2);I([g()],T.prototype,"menuMounted",2);I([g()],T.prototype,"menuVisible",2);I([g()],T.prototype,"expandedMenuGenre",2);I([g()],T.prototype,"expandedMenuMood",2);I([g()],T.prototype,"expandedAllInstruments",2);I([g()],T.prototype,"expandedAllPlayStyles",2);I([g()],T.prototype,"saveModalVisible",2);I([g()],T.prototype,"shareMounted",2);I([g()],T.prototype,"shareVisible",2);I([g()],T.prototype,"sheetMounted",2);I([g()],T.prototype,"sheetVisible",2);I([g()],T.prototype,"toast",2);I([g()],T.prototype,"spinning",2);I([g()],T.prototype,"drag",2);I([g()],T.prototype,"snapProgress",2);I([g()],T.prototype,"expandedInstrument",2);I([g()],T.prototype,"expandedPlayStyle",2);I([g()],T.prototype,"mascot",2);I([g()],T.prototype,"mascotSlot",2);I([g()],T.prototype,"panelPeekMascot",2);I([g()],T.prototype,"panelPeekSide",2);I([g()],T.prototype,"paradeTrigger",2);T=I([Y("loop-screen")],T);var Ts=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,D=(e,t,i,s)=>{for(var o=s>1?void 0:s?Is(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ts(t,i,o),o};const Ss=["Piano","Rhodes","Nylon Guitar","Warm Pad"],As=["Block chords","Arpeggio","Strum","Broken (swing)"],Ns=["flex-start","center","flex-end"];let O=class extends G{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=be(.5),this.mascotAlign=we([...Ns]),this.eggCounter=new pt,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(e){this.dispatchEvent(new CustomEvent("select-section",{detail:e,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const e=this.sections[0]?.progression.genre??"Pop",t=this.instrument??$e(e),i=this.playStyle??Oe(e),s=this.totalSteps||this.sections.reduce((p,b)=>p+b.order.length,0),o=!this.playing||s<=0?0:this.snapProgress?this.progressStep/s*100:(this.progressStep+1)/s*100,r=ne.filter(p=>p.name!==t);let a=Ss.filter(p=>r.some(b=>b.name===p));const n=r.filter(p=>!a.includes(p.name)),c=this.expandedAllInstruments?r:r.filter(p=>a.includes(p.name)),h=ae.filter(p=>p.name!==i);let f=As.filter(p=>h.some(b=>b.name===p));const l=h.filter(p=>!f.includes(p.name)),m=this.expandedAllPlayStyles?h:h.filter(p=>f.includes(p.name)),v=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],y=v?ve(v.progression.mood):"#C9A9E0";return d`
      <div class="frame">
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        ${this.isAuthenticated?d`
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
            ${this.sections.map((p,b)=>{const M=this.playing?b===this.activePlayingSectionIdx:b===this.activeSectionIdx,k=ve(p.progression.mood);return d`
                <div class="section-row ${M?"active":""}" style=${M?`--ring-color:${k}`:""} @click=${()=>this.selectSection(b)}>
                  <div>
                    <div class="section-name">${p.name.toUpperCase()}</div>
                    <div class="section-chords">${p.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${p.order.map(x=>{const N=p.progression.chords[x],P=Pe(N.tension);return d`<div class="section-chip" style="background:${P.color};border-radius:${Math.round(P.radius*.35)}px;"></div>`})}
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
              <button class="play-btn" style="background:${y}" @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}>
                ${this.playing?d`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:d`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${o}%;background:${y};--progress-duration:${st}ms"
                ></div>
              </div>
              ${this.isAuthenticated?d`
                <div class="save-btn" title="Save set" @click=${()=>{this.saveModalVisible=!0}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

            ${this.expandedInstrument?d`
              <div class="control-options">
                ${c.map(p=>d`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:p.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${p.color}"></span>${p.name}
                  </div>
                `)}
                ${n.length?d`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${n.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?d`
              <div class="control-options">
                ${m.map(p=>d`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:p.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${p.color}"></span>${p.name}
                  </div>
                `)}
                ${l.length?d`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${l.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?d`
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
    `}};O.styles=z`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
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
        top: 16px;
        right: 16px;
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
  `;D([w({type:Array})],O.prototype,"sections",2);D([w({type:Number})],O.prototype,"activeSectionIdx",2);D([w({type:Number})],O.prototype,"activePlayingSectionIdx",2);D([w({type:Boolean})],O.prototype,"canAddSection",2);D([w({type:Boolean})],O.prototype,"playing",2);D([w({type:Number})],O.prototype,"progressStep",2);D([w({type:Number})],O.prototype,"totalSteps",2);D([w({type:String})],O.prototype,"instrument",2);D([w({type:String})],O.prototype,"playStyle",2);D([w({type:Boolean})],O.prototype,"isAuthenticated",2);D([g()],O.prototype,"expandedInstrument",2);D([g()],O.prototype,"expandedPlayStyle",2);D([g()],O.prototype,"expandedAllInstruments",2);D([g()],O.prototype,"expandedAllPlayStyles",2);D([g()],O.prototype,"snapProgress",2);D([g()],O.prototype,"saveModalVisible",2);D([g()],O.prototype,"mascot",2);D([g()],O.prototype,"mascotAlign",2);D([g()],O.prototype,"paradeTrigger",2);O=D([Y("song-screen")],O);var Ms=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,ri=(e,t,i,s)=>{for(var o=s>1?void 0:s?Cs(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ms(t,i,o),o};let Le=class extends G{constructor(){super(...arguments),this.projects=[]}onBack(){this.dispatchEvent(new CustomEvent("back"))}onLoadProject(e){this.dispatchEvent(new CustomEvent("load-project",{detail:e}))}onDeleteProject(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("delete-project",{detail:t}))}render(){return d`
      <div class="frame">
        <div class="top-bar">
          <button class="back-btn" @click=${this.onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        
        <div class="content">
          <h1>Your saved sets</h1>
          <div class="subcopy">All your progressions, synced and ready to play.</div>

          ${this.projects.length===0?d`
            <div class="empty-state">
              <div class="empty-state-title">No sets saved yet</div>
              <div class="empty-state-desc">When you find a progression you like, click the bookmark icon to save it here.</div>
            </div>
          `:d`
            <div class="grid">
              ${this.projects.map(e=>{const t=e.scaleType||"MAJOR",i=e.key||"C",s=e.bpm||120,o=e.name||"Untitled Set",r=e.genre||"Unknown",a=e.mood||"Neutral",n=e.lastModified?new Date(e.lastModified).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"Unknown Date",c=ve(a);return d`
                  <div class="card" @click=${()=>this.onLoadProject(e.id)}>
                    <div class="color-accent" style="background: ${c}"></div>
                    <div class="card-title" title=${o}>${o}</div>
                    <div class="card-meta">${r} · ${a}</div>
                    
                    <button class="delete-btn" title="Delete set" @click=${h=>this.onDeleteProject(h,e.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
                    
                    <div class="card-details">
                      <div class="detail-pill">${Ce(i,t)} ${t.replace("_"," ")}</div>
                      <div class="detail-pill">${s} BPM</div>
                      <div class="detail-pill">${n}</div>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </div>
      </div>
    `}};Le.styles=z`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 24px 40px;
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
    .back-btn:active {
      transform: scale(0.96);
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
      padding: 60px 20px;
      background: var(--cv-surface);
      border-radius: 24px;
      border: 1.5px dashed var(--cv-ink-16);
    }
    .empty-state-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 8px;
    }
    .empty-state-desc {
      font-size: 14px;
      color: var(--cv-ink-muted);
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
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-bottom: 16px;
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
    .delete-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink-30);
      transition: color 0.2s ease, background 0.2s ease;
    }
    .delete-btn:hover {
      background: rgba(229, 57, 53, 0.1);
      color: #e53935;
    }
  `;ri([w({type:Array})],Le.prototype,"projects",2);Le=ri([Y("sets-screen")],Le);var Es=Object.defineProperty,$s=Object.getOwnPropertyDescriptor,C=(e,t,i,s)=>{for(var o=s>1?void 0:s?$s(t,i):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Es(t,i,o),o};let A=class extends G{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeTick=null,this.onLoginRequest=async()=>{await j.requestLogin()},this.onLogoutRequest=()=>{j.logout()}}async firstUpdated(){this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const e=localStorage.getItem("chroma-chords-instrument");e&&ne.some(i=>i.name===e)&&(this.instrument=e);const t=localStorage.getItem("chroma-chords-play-style");t&&ae.some(i=>i.name===t)&&(this.playStyle=t),S.setInstrument(this.instrument),S.setPlayStyle(this.playStyle),this.unsubscribeAuth=j.subscribeAuthState((i,s)=>{this.userEmail=i,this.isAuthenticated=s,this.requestUpdate()}),this.unsubscribeTick=S.subscribeTick((i,s,o,r,a)=>{this.activeIndex=i,this.progressStep=s,typeof o=="number"&&(this.activePlayingSectionIdx=o),typeof r=="number"&&(this.totalSongSteps=r),this.playing=S.isPlaying(),this.requestUpdate()});try{this.chordData=await Di()}catch(i){console.error("Failed to load chord data:",i)}}get isAdmin(){return j.isAdmin}disconnectedCallback(){super.disconnectedCallback(),S.stopAutoplay(),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeTick&&this.unsubscribeTick()}onGenreChange(e){this.genre=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onMoodChange(e){this.mood=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onFreetextSuggestionApplied(e){const t=e.detail;this.pendingChordSuggestion=t.chords?.length&&t.key&&t.scaleType?t:null,e.detail.promptText&&(this.activeSearchPrompt=e.detail.promptText)}async onGenerate(e){this.keyOverride=null,this.scaleOverride=null;const t=e?.detail?.promptText||this.activeSearchPrompt||void 0,i=await Bo.resolvePrompt(this.chordData,this.genre,this.mood,this.length,t,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),S.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),S.setPlayStyle(i.playStyle));const s=i.progression;this.progression=s,this.order=Array.from({length:s.chords.length},(o,r)=>r),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,S.setProgression(s,this.order),S.reset(),this.screen="loop",this.sections=Se.createInitialSong(s,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onLengthChange(e){this.length=e.detail}regenerate(){const e=Lt(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=e,this.order=Array.from({length:this.length},(t,i)=>i),this.activeIndex=0,this.progressStep=0,S.setProgression(e,this.order),this.syncActiveSection(),this.playing&&(S.startAutoplay(),S.playActiveChord())}syncActiveSection(){this.progression&&(this.sections=Se.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order))}onSetKey(e){this.keyOverride=e.detail,this.regenerate()}onSetScale(e){this.scaleOverride=e.detail,this.regenerate()}onSetGenre(e){this.genre=e.detail,this.regenerate()}onSetMood(e){this.mood=e.detail,this.regenerate()}onSetLength(e){this.length=e.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(e){if(!this.progression)return;const t=this.order[this.activeIndex];this.order=e.detail;const i=this.order.indexOf(t);this.activeIndex=i>=0?i:0,S.setOrder(this.order,this.activeIndex),this.syncActiveSection()}onBack(){S.stopAutoplay(),this.playing=!1,this.screen="seed",this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onViewSets(){S.stopAutoplay(),this.playing=!1,this.screen="sets"}onLoadProject(e){const t=e.detail,i=j.getProjects().find(s=>s.id===t);i&&(this.currentProjectId=i.id,this.progression={genre:i.genre||"Unknown",mood:i.mood||"Neutral",key:i.key||"C",scaleType:i.scaleType||"MAJOR",bpm:i.bpm||120,chords:i.chords},this.order=Array.from({length:this.progression.chords.length},(s,o)=>o),this.length=this.progression.chords.length,this.showTheory=i.showTheory??this.showTheory,S.setProgression(this.progression,this.order),this.screen="loop",this.sections=Se.createInitialSong(this.progression,this.order),this.activeSectionIdx=0)}onDeleteProject(e){j.deleteProject(e.detail),this.currentProjectId===e.detail&&(this.currentProjectId=null),this.requestUpdate()}onSaveSet(e){this.saveProject(e.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(e){this.instrument=e.detail,localStorage.setItem("chroma-chords-instrument",e.detail),S.setInstrument(e.detail)}onSetPlayStyle(e){this.playStyle=e.detail,localStorage.setItem("chroma-chords-play-style",e.detail),S.setPlayStyle(e.detail)}onTogglePlay(){this.playing=S.togglePlay()}onTogglePlaySong(){S.setSong(this.sections),this.playing=S.togglePlay()}onChordTap(e){this.progression&&(this.swapIndex=e.detail,this.sheetMode="swap",this.alternatives=io(this.chordData,this.progression,e.detail),this.sheetOpen=!0,S.playChordAtIndex(e.detail,.8))}onChordVoicingTap(e){this.progression&&(this.swapIndex=e.detail,this.sheetMode="voicing",this.alternatives=[],this.sheetOpen=!0,S.playChordAtIndex(e.detail,.8))}onChordPreview(e){this.progression&&S.playChordAtIndex(e.detail,.8)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(e){if(!this.progression||this.swapIndex===null)return;const t=[...this.progression.chords];t[this.swapIndex]=e.detail.chord,this.progression={...this.progression,chords:t},S.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),S.playChordNotes(e.detail.chord.notes,.8)}onVoicingPreview(e){S.playChordNotes(e.detail,.6)}onVoicingChange(e){if(!this.progression||this.swapIndex===null)return;const t=[...this.progression.chords];t[this.swapIndex]=to(t[this.swapIndex],e.detail.quality,e.detail.extension),this.progression={...this.progression,chords:t},S.setProgression(this.progression,this.order),this.syncActiveSection()}onBackToProgression(){S.stopAutoplay(),this.playing=!1,this.screen="loop",this.progression&&S.setProgression(this.progression,this.order)}onViewSong(){S.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.screen="song",S.setSong(this.sections)}onSelectSection(e){const t=this.sections[e.detail];t&&(this.activeSectionIdx=e.detail,this.progression=t.progression,this.order=t.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=t.progression.chords.length,this.keyOverride=t.progression.key,this.scaleOverride=t.progression.scaleType,this.sheetOpen=!1,this.screen="loop",S.setProgression(this.progression,this.order),this.playing&&(S.startAutoplay(),S.playActiveChord()))}onAddSection(){if(!this.progression)return;const e=Se.addSection(this.sections,this.progression);this.sections=e.sections,this.activeSectionIdx=e.activeIndex,this.screen==="song"&&S.setSong(this.sections)}saveProject(e){if(!this.progression)return;const t=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=t;const i=j.getProjects().find(r=>r.id===t),s=e||(i?i.name:`${this.progression.genre} · ${this.progression.mood}`),o={id:t,name:s,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};j.saveProject(o),e&&j.syncProjectsToCloud()}render(){let e;if(this.screen==="sets")e=d`
        <sets-screen
          .projects=${j.getProjects()}
          @back=${this.onBack}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
        ></sets-screen>
      `;else if(this.screen==="seed"||!this.progression)e=d`
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
      `;else if(this.screen==="song")e=d`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length<ge.length}
          .playing=${this.playing}
          .progressStep=${this.progressStep}
          .totalSteps=${this.totalSongSteps}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
          @toggle-play-song=${this.onTogglePlaySong}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></song-screen>
      `;else{const t=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;e=d`
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
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${t}
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
      `}return d`<div class="screen-view">${e}</div>`}};A.styles=z`
    :host {
      display: block;
      min-height: 100dvh;
    }
    .screen-view {
      display: block;
      min-height: 100dvh;
      opacity: 1;
      transform: scale(1);
      transition: opacity 200ms var(--cv-ease), transform 240ms var(--cv-ease);
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
    }
  `;C([g()],A.prototype,"chordData",2);C([g()],A.prototype,"screen",2);C([g()],A.prototype,"genre",2);C([g()],A.prototype,"mood",2);C([g()],A.prototype,"progression",2);C([g()],A.prototype,"activeIndex",2);C([g()],A.prototype,"progressStep",2);C([g()],A.prototype,"order",2);C([g()],A.prototype,"keyOverride",2);C([g()],A.prototype,"scaleOverride",2);C([g()],A.prototype,"playing",2);C([g()],A.prototype,"showTheory",2);C([g()],A.prototype,"instrument",2);C([g()],A.prototype,"playStyle",2);C([g()],A.prototype,"sheetOpen",2);C([g()],A.prototype,"sheetMode",2);C([g()],A.prototype,"swapIndex",2);C([g()],A.prototype,"alternatives",2);C([g()],A.prototype,"length",2);C([g()],A.prototype,"sections",2);C([g()],A.prototype,"activeSectionIdx",2);C([g()],A.prototype,"activePlayingSectionIdx",2);C([g()],A.prototype,"totalSongSteps",2);C([g()],A.prototype,"pendingChordSuggestion",2);C([g()],A.prototype,"userEmail",2);C([g()],A.prototype,"isAuthenticated",2);A=C([Y("chroma-chords-app")],A);
