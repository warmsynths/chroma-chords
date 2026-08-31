import{f as Ci,u as Ni,s as Ai,n as Mi,l as Ei,P as V,F as Ce,S as re,M as Xt,C as Jt,R as Kt,a as Qt,b as Oi,i as Q,c as Z,d as h,A as Zt,O as Di,w as R}from"./assets/vendor-7vM_bUxM.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi={attribute:!0,type:String,converter:Ni,reflect:!1,hasChanged:Ci},Pi=(t=Bi,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),o==="accessor"){const{name:n}=i;return{set(d){const a=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,a,t,!0,d)},init(d){return d!==void 0&&this.C(n,void 0,t,d),d}}}if(o==="setter"){const{name:n}=i;return function(d){const a=this[n];e.call(this,d),this.requestUpdate(n,a,t,!0,d)}}throw Error("Unsupported decorator location: "+o)};function S(t){return(e,i)=>typeof i=="object"?Pi(t,e,i):((o,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,o),n?Object.getOwnPropertyDescriptor(s,r):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(t){return S({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fi=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ei(t,e){return(i,o,s)=>{const r=n=>n.renderRoot?.querySelector(t)??null;return Fi(i,o,{get(){return r(this)}})}}const fe="chroma_chords_projects",Li="chord_voyager_projects";class be{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(fe);if(e||(e=localStorage.getItem(Li),e&&localStorage.setItem(fe,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(fe,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(fe,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const r=o.get(s.id);!r||s.lastModified>r.lastModified?o.set(s.id,s):s.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem(fe,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{localStorage.setItem(fe,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((i,o)=>{const s=new FileReader;s.onload=r=>{try{const n=r.target?.result,d=JSON.parse(n);d&&typeof d=="object"&&Array.isArray(d.chords)?(d.id=Math.random().toString(36).substr(2,9),d.lastModified=Date.now(),i(d)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(e)})}}const De="chroma_chords_auth_token",Ve="chroma_chords_auth_user",Ui="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Ye(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function Ri(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Ui}}class _i{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Ri(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(De);if(e){const i=Ye(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(De),localStorage.removeItem(Ve),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Ye(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Ye(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(De,e),localStorage.setItem(Ve,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const r=this.handleCredentialResponse(s.credential);i?.({success:r.success,message:r.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(De),localStorage.removeItem(Ve)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const ve=new _i;class ji{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const r=new AbortController,n=setTimeout(()=>r.abort(),8e3),d=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:r.signal});if(clearTimeout(n),d.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await d.json().catch(()=>({}))).timestamp};if(d.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const a=await d.text().catch(()=>"");return{ok:!1,status:d.status,message:`Connection error (${d.status}): ${a||d.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const r={"Content-Type":"application/json"};this.applyAuthHeaders(r,i);const n=new AbortController,d=setTimeout(()=>n.abort(),15e3),a=await fetch(`${s}/api/sync`,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(clearTimeout(d),!a.ok){let p="";try{const u=await a.json();p=u.error||u.message||""}catch{p=await a.text().catch(()=>"")}throw new Error(`Cloud sync failed (${a.status}): ${p||a.statusText||"Unknown error"}`)}return await a.json()}}const zi=new ji,It="chroma_chords_deleted_projects",$t="chroma_chords_last_sync_time",Gi="https://chroma-chords-api.warmsynths.workers.dev";function Vi(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Gi}}function Tt(t){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(t):null}function Ct(t,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(t,e)}class Yi{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=ve.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return be.getProjects()}isProjectSaved(e){return e?be.getProjects().some(i=>i.id===e):!1}saveProject(e){be.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){be.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Tt(It);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Ct(It,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(r=>r.id===e),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:e,deletedAt:s}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return Tt($t)}setLastSyncTime(e){Ct($t,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await ve.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||Vi();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=be.getProjects(),r=this.getTombstones(),n=this.getLastSyncTime(),d=s.map(v=>({...v,deletedAt:null})),a=await zi.sync(o,i,{sets:d,lastSyncTime:n,tombstones:r}),p=new Map;s.forEach(v=>{p.set(v.id,{...v,syncedToCloud:!0})});const u=a.tombstones||[],l=new Set(u.map(v=>v.id));(a.sets||[]).forEach(v=>{if(v.deletedAt)l.add(v.id);else{const k=p.get(v.id),$=v.lastModified||(v.updatedAt?new Date(v.updatedAt).getTime():0),c=k?.lastModified||0;(!k||$>=c)&&p.set(v.id,{id:v.id,name:v.name,lastModified:$,genre:v.genre,mood:v.mood,key:v.key,scaleType:v.scaleType,bpm:v.bpm,showTheory:v.showTheory,chords:Array.isArray(v.chords)?v.chords:[],syncedToCloud:!0})}}),l.forEach(v=>{p.delete(v)});const g=Array.from(p.values());be.setProjects(g);const b=this.getTombstones(),y=new Set(r.map(v=>v.id)),f=b.filter(v=>!y.has(v.id));this.setTombstones(f),(a.lastSyncTime||a.syncedAt)&&this.setLastSyncTime(a.lastSyncTime||a.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const F=new Yi;let qe=null,He=null,We=null,Nt=null,Xe=null,Je=null,Ke=null,Qe=null,Ze=null,et=null,tt=null;function ti(){return qe||(qe=new Qt({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),qe}function qi(){return He||(He=new Oi({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:t=>{console.warn("Failed to load Rhodes piano sampler:",t)}}).connect(ti())),He}function Hi(t){const e=ti();switch(t){case"organ":return We||(We=new V(re,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(e)),We;case"pad-strings":return Xe||(Nt=new Kt({decay:4.5,wet:.35}).connect(e),Xe=new V(re,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Nt)),Xe;case"juno-pad":if(!Ke){Je=new Jt({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(e);try{Je.start()}catch{}Ke=new V(re,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Je)}return Ke;case"stab":return Qe||(Qe=new V(Xt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(e)),Qe;case"epiano":return Ze||(Ze=new V(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(e)),Ze;case"guitar":return et||(et=new V(re,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(e)),et;case"bell":return tt||(tt=new V(Ce,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(e)),tt;case"rhodes":default:return qi()}}const pe=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],ue=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],ft={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},bt={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Wi={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Xi(t){const e=ft[t]??"rhodes";return Wi[e]??"Piano"}function Ji(t){return(bt[t]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function Ki(){return Promise.race([Ei(),new Promise(t=>setTimeout(t,80))])}function ii(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function si(t,e){const i=[];for(let o=0;o<e;o++)for(const s of t){const r=s.match(/^([A-G]#?)(-?\d+)$/);if(r){const n=r[1],d=parseInt(r[2],10)+o;i.push(`${n}${d}`)}else i.push(s)}return i}function oi(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const At={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function Qi(t){if(!t)return;const e=t.toLowerCase().trim();return At[e]?At[e]:pe.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function Zi(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":ue.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function es(t,e=.7,i,o="rhodes",s){try{Promise.all([Ai(),Ki()]).then(()=>{const r=Hi(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof r.set=="function"&&r.set(s)}catch(p){console.warn("Failed to apply customConfig to Tone.js instrument:",p)}const n=t.length,d=n<=1?1:Math.max(.4,1/Math.sqrt(n)),a=Mi();if(i&&i.arpMode&&i.arpMode!=="off"){const p=i.bpm??80,u=i.arpRate??"1/16",l=i.arpRange??1,g=i.arpMode,b=ii(u,p),y=si(t,l),f=oi(y,g),v=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*d:d,k=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,b*.9);f.forEach(($,c)=>{const m=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;r.triggerAttackRelease($,k,a+c*b+m,v())});return}t.forEach((p,u)=>{let l=0,g=d,b=e;if(i){const{minVelocity:y,maxVelocity:f,spread:v,microTiming:k,humanVariance:$,duration:c}=i;g=(y+Math.random()*(f-y))/127*d;const w=u*v*.1,I=(Math.random()-.5)*k*.05,D=(Math.random()-.5)*$*.03;l=Math.max(0,w+I+D),b=c*(1+(Math.random()-.5)*.2*$)}r.triggerAttackRelease(p,b,a+l,g)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function Mt(t,e,i){const o=e==="Unknown"||!e?"Pop":e,s=i?.instrument?pe.find(g=>g.name===i.instrument):void 0,r=i?.playStyle?ue.find(g=>g.name===i.playStyle):void 0,n=s?.instrument??ft[o]??"rhodes",d=bt[o]||{},a=r?.patch??{},p={...d,...a,bpm:i?.bpm??d.bpm??90},u=i?.duration??d.duration??.9,l=a.durationMultiplier?u*a.durationMultiplier:u;es(t,l,p,n,i?.customConfig)}const ts=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],is=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],J={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},ss=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Ae=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ae={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14]},os=Object.keys(ae),rs={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Et={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},ri={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},at={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function P(t,e){const i=(t%12+12)%12;return e?is[i]:ts[i]}function ye(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",s=e;if(i&&/[A-G]/.test(i)){const n=e[1];n==="b"||n==="B"||n==="♭"||n==="♭"?(o=`${i}b`,s=e.slice(2)):n==="#"||n==="♯"||n==="♯"?(o=`${i}#`,s=e.slice(2)):(o=i,s=e.slice(1))}s=s.toLowerCase();let r="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?r="maj9":s.includes("min9")||s.includes("m9")?r="min9":s.includes("9")||s.includes("dom9")?r="dom9":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?r="maj7":s.includes("min7")||s.includes("m7")?r="min7":s.includes("dim7")?r="dim7":s.includes("dim")||s.includes("°")?r="dim":s.includes("aug")||s.includes("+")?r="aug":s.includes("sus2")?r="sus2":s.includes("sus4")||s.includes("sus")?r="sus4":s.includes("7")?r="dom7":s.includes("min")||s==="m"?r="min":r="maj",{root:o,quality:r}}const ns=Object.keys(at),_e={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Ne=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],as={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},ls={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},vt={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},xe=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function he(t){return(xe.find(e=>e.name===t)||xe[0]).dot}const cs={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function ds(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function Ue(t,e){const i=t.reduce((s,r)=>s+e(r),0);let o=Math.random()*i;for(const s of t)if(o-=e(s),o<=0)return s;return t[t.length-1]}function hs(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const lt=4,we=1,ne=8,je=1700,ps={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function us(t,e="MAJOR",i="Pop",o="Uplifting"){let r={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(r*=1.4),t==="SUBTONIC"&&(r*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(r*=1.8),t==="SUBDOMINANT"&&(r*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(r*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(r*=2),t==="SUBMEDIANT"&&(r*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(r*=2.5),t==="SUBDOMINANT"&&(r*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(r*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(r*=2.2),t==="SUBDOMINANT"&&(r*=1.8),t==="SUBMEDIANT"&&(r*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(r*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(r*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(r*=2.2),t==="SUPERTONIC"&&(r*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(r*=2),t==="SUBMEDIANT"&&(r*=1.6),t==="MEDIANT"&&(r*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(r*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(r*=1.8),(vt[o]||[]).includes(t)&&(r*=1.3),Math.max(.01,r)}function it(t,e,i="MAJOR",o="Pop",s="Uplifting"){if(t===e)return .05;let n=(ps[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(n*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(n*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(n*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(n*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(n*=1.8),t==="DOMINANT"&&e==="TONIC"&&(n*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(n*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(n*=1.5),(vt[s]||[]).includes(e)&&(n*=1.5),Math.max(.01,n)}function gs(t,e,i,o,s,r,n=lt){let d=i.filter(l=>t.degrees[l]);d.length||(d=i);const a=Ue(d,l=>us(l,t.type,s,r))||"TONIC",p=[a];let u=a;for(let l=1;l<n;l++){const g=l===n-1;let b=i.filter(v=>t.degrees[v]);b.length||(b=i);const y=b.filter(v=>v!==u),f=y.length?y:b;if(g){const v=Ue(f,k=>{const $=it(k,p[0],t.type,s,r),c=it(u,k,t.type,s,r);return $*c});p.push(v)}else{const v=f.filter(c=>!p.includes(c)),k=v.length?v:f,$=Ue(k,c=>it(u,c,t.type,s,r));u=$,p.push($)}}return p}function yt(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function X(t,e){const{root:i,quality:o}=ye(t),s=J[i]??0,r=ae[o]||ae.maj,n=yt(i,o,e);return r.map(d=>P(s+d,n))}async function ms(){const t=typeof import.meta<"u"?"./":"/",e=t.endsWith("/")?t:`${t}/`,i=`${e}chroma_chords_data.json`,o=`${e}chord_voyager_data.json`;let s=await fetch(i).catch(()=>null);if((!s||!s.ok)&&(s=await fetch(o).catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chroma_chords_data.json").catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chord_voyager_data.json").catch(()=>null)),!s||!s.ok){const n=new URL("./chroma_chords_data.json",import.meta.url).href;s=await fetch(n)}if(!s.ok)throw new Error(`HTTP error: ${s.status}`);const r=await s.json();return ks(r),r}const fs={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},bs={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},vs={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},ys={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},xs={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},ws={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function ks(t){const e=[["MIXOLYDIAN",fs],["DORIAN",bs],["LYDIAN",vs]];for(const[i,o]of e)for(const[s,r]of Object.entries(o)){const n=t.scales[`${r}_MAJOR`];if(!n)continue;const d=`${s}_${i}`,a={};for(const p of ws[i]){const u=xs[`${i}_${p}`],l=n.degrees[u];if(!l)continue;const g=JSON.parse(JSON.stringify(l));g.next_chord_options=(g.next_chord_options||[]).map(b=>{if(b.nodeId.startsWith(`${r}_MAJOR_`)){const y=b.nodeId.replace(`${r}_MAJOR_`,""),f=ys[`${i}_${y}`];if(f)return{name:b.name,nodeId:`${s}_${i}_${f}`}}return b}),a[p]=g}t.scales[d]={root:s,type:i,degrees:a}}}const Ss=[156,192,236],Is=[242,115,95];function Re(t,e,i){return t+(e-t)*i}function Oe(t){const e=Math.max(0,Math.min(1,t));return"#"+Ss.map((o,s)=>Math.round(Re(o,Is[s],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function W(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(Re(84,128,e)),radius:Math.round(Re(40,12,e)),fontSize:Math.round(Re(21,30,e)),color:Oe(e)}}function $s(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function ni(t,e,i,o){const r=i.degrees[e].chord_name,n=ri[e]??.5,d=at[i.type]||at.MAJOR;return{name:Ot(r),tag:rs[e]||"move",roman:d[e]||"?",color:Oe(n),functionLabel:Et[e]||e,notes:X(r,o),scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:$s(Et[e]||e,_e[i.type]||i.type,Ot(r)),degree:e,scaleKey:t,tension:n}}function Ot(t){const{root:e,quality:i}=ye(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const Ts={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function ai(t,e){let i=Ts[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function ct(t,e,i,o){const s=Math.max(we,Math.min(ne,o?.length??lt)),r=as[e]||"MAJOR",n=ls[i],d=o?.scaleType||(n&&r==="MAJOR"?n:r);let a=o?.key&&Ae.includes(o.key)?o.key:hs(Ae),p=`${a}_${d}`;t.scales[p]||(a="C",p=`${a}_${d}`);let u=t.scales[p];if(!u){const c=Object.keys(t.scales).find(m=>m.endsWith(`_${d}`))||Object.keys(t.scales)[0];u=t.scales[c],a=u?u.root:"C",p=c}const l=Y(a,d),g=Object.keys(u.degrees),b=vt[i]||[],y=cs[d]||[],f=s===lt?y.filter(c=>c.degrees.every(m=>g.includes(m))):[],$=(f.length&&Math.random()<.25?Ue(f,c=>ds(c,b)).degrees:gs(u,p,g,b,e,i,s)).map(c=>ni(p,c,u,l));return{genre:e,mood:i,key:a,scaleType:d,bpm:ai(e,i),chords:$}}const Cs={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},Ns={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function li(t){return ae[t]?t:ye(`C${t||""}`).quality}function ci(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function As(t,e){const i=Cs[t]||{upper:"I",lower:"i"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return ci(s,e)}function di(t,e){const i=Ns[(t%12+12)%12]||{upper:"?",lower:"?"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return ci(s,e)}function Ms(t,e,i,o){const s=e==="maj"||e==="dom7"||e==="dom9",r=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&r)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const n=ri[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,n+.15),desc:`${i} adds chromatic color to the ${o.root} ${_e[o.type]||o.type} progression.`}}function hi(t,e,i,o){const s=(t%12+12)%12,r=(J[i]??0)+s,d=`${P(r,o)}${xt[e]??e}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${d} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${d} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${d} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${d} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${d} borrows its color from outside the current key.`}}function Es(t,e,i,o,s){const r=i.degrees[e],{root:n}=ye(r.chord_name),d=J[n]??0,a=P(d,s),p=`${a}${xt[o]??o}`,u=yt(a,o,s),l=ae[o]?ae[o].map(y=>P(d+y,u)):X(r.chord_name,s),g=As(e,o),b=Ms(e,o,p,i);return{name:p,tag:b.tag,roman:g,color:Oe(b.tension),functionLabel:b.functionLabel,notes:l,scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:b.desc,degree:e,scaleKey:t,tension:b.tension}}function Os(t,e,i,o,s,r){const n=`${e}_${i}`,d=t.scales[n];if(!d||!o.length)return null;const a=Y(e,i),p=J[e]??0,u={};Object.entries(d.degrees).forEach(([g,b])=>{const{root:y}=ye(b.chord_name),f=J[y]??0;f in u||(u[f]=g)});const l=o.slice(0,ne).map(({root:g,quality:b})=>{const y=J[g]??p,f=u[y],v=li(b);if(f){const m=d.degrees[f],{quality:w}=ye(m.chord_name);return v===w||!b&&w?ni(n,f,d,a):Es(n,f,d,v,a)}const k=(y-p+12)%12,$=hi(k,v,e,a),c=di(k,v);return Ds(e,k,v,$.functionLabel,c,$.tag,a)});return l.length<we?null:{genre:s,mood:r,key:e,scaleType:i,bpm:ai(s,r),chords:l}}const xt={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Ds(t,e,i,o,s,r,n){const d=(J[t]??0)+e,a=P(d,n),p=li(i),u=`${a}${xt[p]??p}`,l=yt(a,p,n),g=(ae[p]||ae.maj).map(f=>P(d+f,l)),b=s==="?"?di(e,p):s,y=.42;return{name:u,tag:r,roman:b,color:Oe(y),functionLabel:o==="Borrowed"?hi(e,p,t,n).functionLabel:o,notes:g,scaleLabel:"Borrowed",desc:`${u} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:y}}const Dt={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Bs(t,e,i,o){const s=J[t]??0;let r=Dt[e]||Dt.Major;return i==="6th"?r=[...r,9]:i==="7th (dom / m7)"?r=[...r,10]:i==="Major 7th (M7)"?r=[...r,11]:i==="9th"&&(r=[...r,10,14]),r.map(n=>P(s+n,o))}const Ps={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Fs={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Ls(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Ps[e]??""}${Fs[i]??""}`}const Us={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},pi={};Ae.forEach(t=>{pi[J[t]]=t});function Rs(t,e){const i=Us[e]??0,s=(((J[t]??0)-i)%12+12)%12;return pi[s]??"C"}function Y(t,e){const i=Rs(t,e);return ss.has(i)||i.includes("b")}function U(t,e,i,o,s,r,n,d){const a=Ls(t,e,i),p=Bs(t,e,i,d);return{name:a,tag:o||"sub",roman:o,color:Oe(n),functionLabel:s,notes:p,scaleLabel:"Substitution",desc:r,degree:"SUBSTITUTION",scaleKey:"",tension:n}}function wt(t,e,i){const o=J[e.key]??0,s=e.scaleType.includes("MINOR"),r=Y(e.key,e.scaleType),n=s?[(()=>{const u=P(o+1,!0),l=U(u,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:l.name,roman:"♭II",notes:l.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:l,tension:.6}})(),(()=>{const u=P(o+5,!0),l=U(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — deeper minor mood",chord:l,tension:.45}})(),(()=>{const u=P(o+10,!0),l=U(u,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:l.name,roman:"v",notes:l.notes,sub:"a step further into shadow — unresolving drift",chord:l,tension:.52}})()]:[(()=>{const u=P(o+8,!0),l=U(u,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:l.name,roman:"♭VI",notes:l.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:l,tension:.5}})(),(()=>{const u=P(o+5,!0),l=U(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — softer, sadder",chord:l,tension:.42}})(),(()=>{const u=P(o+3,!0),l=U(u,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:l.name,roman:"♭III",notes:l.notes,sub:"a step further out — cooler, more remote",chord:l,tension:.58}})()],d=[(()=>{const u=P(o+7,r),l=P(o+2,r),g=U(l,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${u}7 — sharpens the approach`,.82,r);return{name:g.name,roman:"V7/V",notes:g.notes,sub:`aimed at ${u}7 — sharpens the approach`,chord:g,tension:.82}})(),(()=>{const u=P(o+(s?3:9),r),l=P(o+4,r),g=U(l,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${u}m7 — makes it feel arrived at`,.88,r);return{name:g.name,roman:"V7/vi",notes:g.notes,sub:`aimed at ${u}m7 — makes it feel arrived at`,chord:g,tension:.88}})(),(()=>{const u=P(o+1,!0),l=U(u,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:l.name,roman:"subV7",notes:l.notes,sub:"a tritone substitute — slides in sideways",chord:l,tension:.95}})()],a=[(()=>{const u=P(o+5,r),l=U(u,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,r);return{name:l.name,roman:"IV",notes:l.notes,sub:"floats rather than resolving",chord:l,tension:.3}})(),(()=>{const u=P(o,r),l=U(u,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,r);return{name:l.name,roman:s?"im9":"Imaj9",notes:l.notes,sub:"the same home with more air in it",chord:l,tension:.18}})(),(()=>{const u=P(o+(s?3:4),r),l=U(u,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,r);return{name:l.name,roman:s?"♭III":"iii",notes:l.notes,sub:"wistful, halfway between home and away",chord:l,tension:.35}})()],p=[(()=>{const u=P(o,r),l=U(u,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,r);return{name:l.name,roman:s?"i":"I",notes:l.notes,sub:"full resolution — the sense of arriving",chord:l,tension:.05}})(),(()=>{const u=P(o+7,r),l=U(u,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,r);return{name:l.name,roman:"V7",notes:l.notes,sub:"the pull that makes home feel earned",chord:l,tension:1}})(),(()=>{const u=P(o+(s?8:9),r),l=U(u,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,r);return{name:l.name,roman:s?"♭VI":"vi",notes:l.notes,sub:"a soft landing instead of a full stop",chord:l,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:n},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:d},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:a},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:p}]}function ui(t,e,i){const o=J[e.key]??0,s=e.scaleType.includes("MINOR"),r=Y(e.key,e.scaleType),n=e.chords;if(s){const f=n[0]?.name||"chord 1",v=n[1]?.name||"chord 2",k=n[2]?.name||"chord 3",$=n[3]?.name||"chord 4",c=U(P(o,r),"Major","None","I","Major tonic","same root, turned bright",.2,r),m=U(P(o+5,r),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,r),w=U(P(o+9,r),"Minor","None","vi","Submediant","melodic lift upward",.4,r),I=U(P(o+11,r),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,r);return[{name:c.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:c.notes,chord:c,tension:.2},{name:m.name,sub:`in place of ${v} · the Dorian lift, sunny and open`,roman:"IV",notes:m.notes,chord:m,tension:.35},{name:w.name,sub:`in place of ${k} · melodic lift upward`,roman:"vi",notes:w.notes,chord:w,tension:.4},{name:I.name,sub:`in place of ${$} · classical harmonic pull`,roman:"vii°",notes:I.notes,chord:I,tension:.55}]}const d=n[0]?.name||"chord 1",a=n[1]?.name||"chord 2",p=n[2]?.name||"chord 3",u=n[3]?.name||"chord 4",l=U(P(o,r),"Minor","None","i","Tonic minor","same root, turned sad",.3,r),g=U(P(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),b=U(P(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),y=U(P(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:l.name,sub:`in place of ${d} · same root, turned sad`,roman:"i",notes:l.notes,chord:l,tension:.3},{name:g.name,sub:`in place of ${a} · the lift, but heavier`,roman:"iv",notes:g.notes,chord:g,tension:.4},{name:b.name,sub:`in place of ${p} · big and cinematic`,roman:"♭VI",notes:b.notes,chord:b,tension:.45},{name:y.name,sub:`in place of ${u} · lands sideways, not home`,roman:"♭VII",notes:y.notes,chord:y,tension:.5}]}function _s(t,e,i){return wt(t,e).map(s=>{const r=s.rows[0];return{label:s.name,sub:s.sub,chord:r.chord,functionCaption:`${r.roman} · ${r.notes.join(" · ")}`,rationale:r.sub}})}const js={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},zs={m8:43303,circuit:43302};function Gs(t,e,i){let o=js[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${zs[e]}/`);const r=(i&&i.length>0?i.map(n=>t.chords[n]).filter(n=>!!n):t.chords).map(n=>encodeURIComponent(n.name)).join("+");return`${o}?p=${r}`}function Bt(t,e=4){const i=Array.isArray(t)?t.filter(l=>typeof l=="string"&&l.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(l=>l.replace(/\d+$/,"")),r=s[0],n=o[r]??0;let d=e,a=n;const p=[];return s.forEach((l,g)=>{const b=o[l]??0;g>0&&b<=a&&d++,p.push(`${l}${d}`),a=b}),[`${r}${e-1}`,...p]}class Vs{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null}setProgression(e,i){this.mode="single",this.progression=e,e?this.order=i||Array.from({length:e.chords.length},(o,s)=>s):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(e<i+s){this.activeSectionIndex=o;const r=e-i;this.activeIndex=this.sections[o].order[r]??0,this.progressStep=r;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const e=this.getTotalSteps();if(e<=0)return;this.songStep=(this.songStep+1)%e,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},je)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:X(o.name,Y(e.progression.key,e.progression.scaleType)),r=Bt(s,4);Mt(r,e.progression.genre,{bpm:e.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",r=this.progression.key||"C",n=this.progression.scaleType||"MAJOR";o=X(s,Y(r,n))}this.playChordNotes(o,1.2)}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",r=this.progression?.key||"C",n=this.progression?.scaleType||"MAJOR";o=X(s,Y(r,n))}this.playChordNotes(o,i)}playChordAtIndex(e,i=.8){if(!this.progression||!this.progression.chords[e])return;const o=this.progression.chords[e];let s=Array.isArray(o.notes)?o.notes:[];if(s.length===0||!s.every(r=>typeof r=="string"&&r.trim().length>0)){const r=o.name||"CMAJ",n=this.progression.key||"C",d=this.progression.scaleType||"MAJOR";s=X(r,Y(n,d))}this.playChordNotes(s,i)}playChordNotes(e,i){if(!this.progression)return;const o=Array.isArray(e)?e.filter(r=>typeof r=="string"&&r.trim().length>0):[];if(o.length===0)return;const s=Bt(o,4);Mt(s,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const T=new Vs,Ys=xe.map(t=>t.name),qs=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Hs(t,e){const i=t.length+1,o=e.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let r=0;r<i;r++)s[r][0]=r;for(let r=0;r<o;r++)s[0][r]=r;for(let r=1;r<i;r++)for(let n=1;n<o;n++)s[r][n]=t[r-1]===e[n-1]?s[r-1][n-1]:1+Math.min(s[r-1][n-1],s[r-1][n],s[r][n-1]);return s[i-1][o-1]}function de(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),s=e.find(a=>a.toLowerCase()===o);if(s)return s;let r=null,n=1/0;for(const a of e){const p=Hs(o,a.toLowerCase());p<n&&(n=p,r=a)}const d=Math.max(2,Math.floor(o.length*.4));return n<=d?r:null}function Ws(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,s=de(o.root,Ae),r=de(o.quality,os);s&&r&&e.push({root:s,quality:r})}if(e.length)return e.slice(0,ne)}function Xs(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=de(e.presetId,qs)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function st(t,e){const i=t&&typeof t=="object"?t:{},o=de(i.genre,Ne)??e.genre,s=de(i.mood,Ys)??e.mood,r=de(i.key,Ae)??void 0,n=de(i.scaleType,ns)??void 0,d=r&&n?Ws(i.chords):void 0;let a;typeof i.length=="number"&&Number.isFinite(i.length)&&(a=Math.max(we,Math.min(ne,Math.round(i.length))));const p=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,u=Xs(i.instrumentConfig),l=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:r,scaleType:n,length:a,chords:d,rhythmStyle:p,instrumentConfig:u,_rateLimit:l}}const Js=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],dt=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],gi="chroma-chords-llm-provider",mi="chroma-chords-llm-model";function fi(){const t=localStorage.getItem(gi);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Ks(t){localStorage.setItem(gi,t)}function bi(){const t=localStorage.getItem(mi);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:dt[0].id}function ot(t){localStorage.setItem(mi,t)}const rt={genre:Ne[0],mood:xe[0].name},vi="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Qs=12e3;async function Zs(){try{const t=await fetch(vi);if(t.ok)return await t.json()}catch{}return null}const yi={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},xi={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function ze(t,e){const i=t.toLowerCase();let o=null,s=0;return Object.keys(e).forEach(r=>{const n=e[r].reduce((d,a)=>d+(i.includes(a)?1:0),0);n>s&&(s=n,o=r)}),o}function wi(t){const e=ze(t,xi),i=ze(t,yi);return!e||!i?null:{genre:e,mood:i}}async function eo(t){const e=new AbortController,i=setTimeout(()=>e.abort(),Qs);try{const s=await fetch(vi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:fi(),model:bi()}),signal:e.signal}),r=await s.json().catch(()=>null);if(!s.ok||r&&typeof r=="object"&&"error"in r){const n=r&&typeof r=="object"&&"error"in r?String(r.error):`HTTP ${s.status}`,d=new Error(`Classifier request failed: ${n}`);throw r&&typeof r=="object"&&"_rateLimit"in r&&(d._rateLimit=r._rateLimit),d}return r}finally{clearTimeout(i)}}async function to(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),r=ze(s,xi)??"Synthwave",n=ze(s,yi)??"Dreamy",d={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},a={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},p={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},u=p[r]||p._default,l=d[r]||"rhodes",g=a[r]||"slow_arpeggio",b={genre:r,mood:n,key:u.key,scaleType:u.scaleType,length:8,chords:u.chords,rhythmStyle:g,instrumentConfig:{presetId:l,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return st(b,{genre:r,mood:n})}const o=wi(t);try{const s=await eo(t);return st(s,o??rt)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const r=st(o??rt,rt);return s&&typeof s=="object"&&"_rateLimit"in s&&(r._rateLimit=s._rateLimit),r}}class io{static async resolvePrompt(e,i,o,s,r,n){let d=n||null,a=null,p=null;if(!d&&r&&r.trim().length>0)try{d=await to(r)}catch(g){console.warn("Failed to classify prompt via LLM/local fallback:",g)}const u=!!(d&&d.chords?.length&&d.key&&d.scaleType);let l=null;return u&&d&&d.chords&&d.key&&d.scaleType&&(l=Os(e,d.key,d.scaleType,d.chords,d.genre||i,d.mood||o)),l||(l=ct(e,i,o,{length:s})),u&&d&&(d.instrumentConfig?.presetId&&(a=Qi(d.instrumentConfig.presetId)??null),d.rhythmStyle&&(p=Zi(d.rhythmStyle)??null)),l.chords.length>s&&(l={...l,chords:l.chords.slice(0,s)}),r&&(l={...l,searchTerm:r}),{progression:l,instrument:a,playStyle:p,normalizedSuggestion:d}}}const Be=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)}];class oe{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(s,r)=>r);return[{name:Be[0].name,desc:Be[0].desc,progression:e,order:o.slice()}]}static addSection(e,i){if(e.length>=Be.length)return{sections:e,activeIndex:e.length-1};const o=Be[e.length],s=o.reorder(i.chords.length),r={name:o.name,desc:o.desc,progression:i,order:s},n=[...e,r];return{sections:n,activeIndex:n.length-1}}static syncActiveSection(e,i,o,s){if(!e[i])return e;const r=[...e];return r[i]={...r[i],progression:o,order:s.slice()},r}}const j=4,se=45e3,Pt="chroma_chords_capacity_v2";class so{constructor(){this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=Date.now(),this.timer=null,this.subscribers=new Set,this.init()}init(){try{if(typeof localStorage<"u"){const e=localStorage.getItem(Pt),i=Date.now();if(e){const o=JSON.parse(e),s=typeof o.charges=="number"?o.charges:j,r=typeof o.lastTime=="number"?o.lastTime:i;if(s<j){const n=Math.max(0,i-r),d=Math.floor(n/se);this.charges=Math.min(j,s+d);const a=n%se;this.rechargeNextSec=Math.max(1,Math.ceil((se-a)/1e3)),this.lastCapacityTime=i-a}else this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=i}else this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=i}}catch{this.charges=j,this.rechargeNextSec=45}this.save(),this.startTimer()}save(){try{typeof localStorage<"u"&&localStorage.setItem(Pt,JSON.stringify({charges:this.charges,lastTime:this.lastCapacityTime}))}catch{}}startTimer(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(this.charges<j){const e=Date.now(),i=Math.max(0,e-this.lastCapacityTime);if(i>=se){const s=Math.floor(i/se);this.charges=Math.min(j,this.charges+s),this.lastCapacityTime=e-i%se,this.save()}const o=(e-this.lastCapacityTime)%se;this.rechargeNextSec=Math.max(1,Math.ceil((se-o)/1e3))}else this.rechargeNextSec=45;this.notify()},1e3)}getState(){return{charges:this.charges,max:j,rechargeNextSec:this.rechargeNextSec}}getCharges(){return this.charges}getRechargeNextSec(){return this.rechargeNextSec}getCapacityMax(){return j}spendCharge(){return this.charges<=0?(this.notify(),!1):(this.charges===j&&(this.lastCapacityTime=Date.now()),this.charges-=1,this.save(),this.notify(),!0)}subscribe(e){return this.subscribers.add(e),e(this.getState()),()=>{this.subscribers.delete(e)}}notify(){const e=this.getState();this.subscribers.forEach(i=>{try{i(e)}catch(o){console.error("Error in CapacityService subscriber callback:",o)}})}}const ht=new so;var oo=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,q=(t,e,i,o)=>{for(var s=o>1?void 0:o?ro(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&oo(e,i,s),s};let G=class extends Z{constructor(){super(...arguments),this.compact=!1,this.hideCapacity=!1,this.isAdmin=!1,this.capacityCharges=4,this.capacityMax=4,this.rechargeNextSec=60,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeCapacity=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=F.subscribeProjects(()=>{this.savedCount=F.getProjects().length,this.syncStatus=F.getSyncStatus(),this.requestUpdate()}),this.unsubscribeCapacity=ht.subscribe(t=>{this.capacityCharges=t.charges,this.capacityMax=t.max,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.savedCount=F.getProjects().length}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeCapacity&&this.unsubscribeCapacity()}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.accountMenuOpen=!1}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.showCapacityNote=!1}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}render(){const t=(this.userEmail||"U")[0].toUpperCase();return h`
      <div class="header-wrap">
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="24" height="24" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <div class="right-actions">
          ${this.isAuthenticated?h`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">${t}</button>
          `:h`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?h`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail||"Signed in"}</div>
                <div class="sync-status-line">
                  <span class="sync-dot"></span>
                  <span>${this.syncStatus==="synced"?"Synced with cloud":"Syncing..."}</span>
                </div>
              </div>
              <button class="menu-action-btn" role="menuitem" @click=${this.onViewSets}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A6B3F" style="flex-shrink:0;"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                <span>Your sets</span>
                <span class="saved-badge">${this.savedCount}</span>
              </button>
              <button class="menu-action-btn" role="menuitem" @click=${this.onSyncNow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M20 11a8 8 0 0 0-13.7-5.6L3 8"/><path d="M3 4v4h4"/><path d="M4 13a8 8 0 0 0 13.7 5.6L21 16"/><path d="M21 20v-4h-4"/></svg>
                <span>Sync now</span>
              </button>
              <div class="menu-divider"></div>
              <button class="menu-action-btn sign-out" role="menuitem" @click=${this.onSignOut}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
                <span>Sign out</span>
              </button>
            </div>
          `:""}
        </div>
      </div>
    `}};G.styles=Q`
    :host {
      display: block;
      width: 100%;
      position: relative;
      z-index: 50;
      box-sizing: border-box;
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
    }
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 24px;
      box-sizing: border-box;
      width: 100%;
    }
    :host([compact]) .header-wrap {
      padding: 12px 16px;
    }
    @media (max-width: 600px) {
      .header-wrap {
        padding: 12px 16px;
      }
    }

    .branding {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink, #2E271F);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      position: relative;
    }

    .sign-in-btn {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 12.5px;
      font-weight: 800;
      padding: 7px 14px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .sign-in-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .sign-in-btn:active {
      transform: scale(0.96);
    }

    .account-btn {
      border: none;
      font-family: inherit;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--cv-plum, #9B7CA8);
      color: #FBF3E6;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 150ms ease;
    }
    .account-btn:hover {
      transform: scale(1.05);
    }

    .popover-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      z-index: 100;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.35);
      animation: cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .panel-close-btn {
      border: none;
      background: transparent;
      font-size: 18px;
      line-height: 1;
      color: rgba(46, 39, 31, 0.5);
      cursor: pointer;
      padding: 0;
      margin-left: auto;
    }

    .account-menu-panel {
      width: 240px;
      padding: 8px;
    }
    .account-header-info {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      margin-bottom: 6px;
    }
    .account-email {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sync-status-line {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 5px;
      font-size: 11.5px;
      font-weight: 700;
      color: #6F8F5C;
    }
    .sync-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7FA968;
    }
    .menu-action-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      text-align: left;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .menu-action-btn:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .saved-badge {
      margin-left: auto;
      background: rgba(138, 107, 63, 0.18);
      color: var(--cv-label, #8A6B3F);
      border-radius: 100px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 6px 12px;
    }
    .menu-action-btn.sign-out {
      color: var(--cv-ink-muted, #6B5F50);
    }
  `;q([S({type:Boolean})],G.prototype,"compact",2);q([S({type:Boolean})],G.prototype,"hideCapacity",2);q([S({type:Boolean})],G.prototype,"isAdmin",2);q([S({type:Number})],G.prototype,"capacityCharges",2);q([S({type:Number})],G.prototype,"capacityMax",2);q([S({type:Number})],G.prototype,"rechargeNextSec",2);q([S({type:Boolean})],G.prototype,"isAuthenticated",2);q([S({type:String})],G.prototype,"userEmail",2);q([S({type:Number})],G.prototype,"savedCount",2);q([S({type:String})],G.prototype,"syncStatus",2);q([S({type:String})],G.prototype,"title",2);q([x()],G.prototype,"accountMenuOpen",2);q([x()],G.prototype,"showCapacityNote",2);G=q([ee("app-header")],G);var no=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,kt=(t,e,i,o)=>{for(var s=o>1?void 0:o?ao(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&no(e,i,s),s};const pt=["bean","bird","cat","note"];function ut(t=.45){return{show:Math.random()<t,kind:pt[Math.floor(Math.random()*pt.length)]}}function gt(t){return t[Math.floor(Math.random()*t.length)]}class ki{constructor(e=7,i=1800){this.threshold=e,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const lo={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Me=class extends Z{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(t){if(t.has("kind")||t.has("scale")){const{width:e,height:i}=lo[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const t="#D98A54";return h`
      <div class="root" style="width:92px;">
        <div class="note-emoji" style="font-size:13px;">♪</div>
        <div class="arm-rest" style="background:transparent;">
          <div class="arm-rest-fore" style="background:${t};"></div>
          <div class="arm-rest-hand" style="background:${t};"></div>
        </div>
        <div class="arm-hang">
          <div class="arm-hang-inner" style="background:${t};"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.94;background:${t};">
          <div class="ear l" style="background:${t};"></div>
          <div class="ear r" style="background:${t};"></div>
          <div class="face"></div>
          <div class="eye l"></div>
          <div class="eye r"></div>
          <div class="cheek l"></div>
          <div class="cheek r"></div>
          <div class="smile"></div>
          <div class="foot l" style="background:${t};"></div>
          <div class="foot r" style="background:${t};"></div>
        </div>
      </div>
    `}renderBird(){const t="#7C93A8",e="#E8A24A";return h`
      <div class="root" style="width:88px;">
        <div class="note-emoji" style="font-size:12px; left:8%; top:-6%;">♪</div>
        <div style="position:absolute; left:-8%; top:22%; width:46%; height:30%; background:${t}; border-radius:50% 60% 60% 50%; transform-origin:100% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite;"></div>
        <div style="position:absolute; right:-8%; top:22%; width:46%; height:30%; background:${t}; border-radius:60% 50% 50% 60%; transform-origin:0% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite 0.2s;"></div>
        <div class="body" style="aspect-ratio:1/1; background:${t}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:50%; top:-20%; width:3px; height:26%; background:#5F7286; transform-origin:50% 100%; animation: mascot-tuft-bob 2.3s ease-in-out infinite;"></div>
          <div style="position:absolute; left:50%; top:42%; transform:translate(-50%,-50%); width:60%; height:42%; background:#F3EDE0; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:40%; background:#2B2420;"></div>
          <div class="eye r" style="top:40%; background:#2B2420;"></div>
          <div style="position:absolute; left:50%; top:54%; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:10px solid ${e};"></div>
          <div class="foot l" style="bottom:-6%; height:14%; background:${e};"></div>
          <div class="foot r" style="bottom:-6%; height:14%; background:${e};"></div>
        </div>
      </div>
    `}renderCat(){const t="#8FA888";return h`
      <div class="root" style="width:90px;">
        <div style="position:absolute; left:55%; top:30%; width:30%; height:8%; background:${t}; border-radius:30px; transform-origin:0% 50%; animation: mascot-tail-wag 2.2s ease-in-out infinite;"></div>
        <div class="body" style="aspect-ratio:1/0.98; background:${t}; border-radius:46% 46% 44% 44%;">
          <div style="position:absolute; left:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${t}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite;"></div>
          <div style="position:absolute; right:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${t}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite 0.15s reverse;"></div>
          <div style="position:absolute; left:50%; top:48%; transform:translate(-50%,-50%); width:56%; height:38%; background:#F3EEE1; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:44%; background:#2B2420;"></div>
          <div class="eye r" style="top:44%; background:#2B2420;"></div>
          <div style="position:absolute; left:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:100% 50%; animation: mascot-whisker 3s ease-in-out infinite;"></div>
          <div style="position:absolute; right:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:0% 50%; animation: mascot-whisker 3s ease-in-out infinite 0.3s;"></div>
          <div class="smile" style="top:66%; width:16%;"></div>
          <div class="foot l" style="height:16%; background:${t};"></div>
          <div class="foot r" style="height:16%; background:${t};"></div>
        </div>
      </div>
    `}renderNote(){const t="#B7A6DE",e="#8672B0";return h`
      <div class="root" style="width:74px;">
        <div style="position:absolute; right:6%; top:-46%; width:5px; height:62%; background:${e}; transform-origin:50% 100%; animation: mascot-stem-sway 2.6s ease-in-out infinite;">
          <div style="position:absolute; top:-6px; left:4px; width:16px; height:20px; background:${e}; border-radius:0 60% 40% 60%; transform-origin:0% 100%; animation: mascot-flag-flutter 2.6s ease-in-out infinite;"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.9; background:${t}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:4%; top:32%; width:22%; height:26%; transform-origin:100% 50%; animation: mascot-arm-rest 2.6s ease-in-out infinite;"><div style="width:100%; height:30%; background:${t}; border-radius:30px;"></div></div>
          <div style="position:absolute; right:4%; top:32%; width:22%; height:26%; transform-origin:0% 50%; animation: mascot-arm-hang 2.6s ease-in-out infinite 0.2s;"><div style="width:100%; height:30%; background:${t}; border-radius:30px;"></div></div>
          <div style="position:absolute; left:50%; top:40%; transform:translate(-50%,-50%); width:58%; height:40%; background:#F3EFF9; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:38%;"></div>
          <div class="eye r" style="top:38%;"></div>
          <div class="smile" style="top:54%; width:18%;"></div>
          <div class="foot l" style="height:15%; background:${e};"></div>
          <div class="foot r" style="height:15%; background:${e};"></div>
        </div>
      </div>
    `}render(){const t=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return t?h`<div style="transform:scale(${this.scale}); transform-origin:top left;">${t}</div>`:Zt}};Me.styles=Q`
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
  `;kt([S({type:String})],Me.prototype,"kind",2);kt([S({type:Number})],Me.prototype,"scale",2);Me=kt([ee("mascot-character")],Me);var co=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,St=(t,e,i,o)=>{for(var s=o>1?void 0:o?ho(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&co(e,i,s),s};const mt=3200;let Ee=class extends Z{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(t){t.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},mt))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?h`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${pt.map(t=>h`<mascot-character .kind=${t} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:Zt}};Ee.styles=Q`
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
      animation: egg-pop ${mt}ms ease forwards;
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
      pointer-events: none;
      animation: egg-caption-pop ${mt}ms ease forwards;
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
  `;St([S({type:Number})],Ee.prototype,"trigger",2);St([x()],Ee.prototype,"visible",2);Ee=St([ee("mascot-parade")],Ee);var po=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,B=(t,e,i,o)=>{for(var s=o>1?void 0:o?uo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&po(e,i,s),s};const go=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],mo=["#F2A79B","#9CC0EC","#F6D98B"],fo=[6,3,12],Ft=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],bo=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],vo=["Warm","Melancholy","Nostalgic","Dreamy"],nt=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let E=class extends Z{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=ut(.35),this.mascotSlot=gt(go),this.peekMascot=ut(.18),this.peekSide=gt(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.isGenerating=!1,this.currentProvider=fi(),this.currentModel=bi(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=j,this.rechargeNextSec=45,this.showCapacityNote=!1,this.unsubscribeCapacity=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new ki,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const t=performance.now(),e=this.getBoundingClientRect(),i=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let o=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const s=this.shadowRoot?.querySelector(".divider-row");if(s){const d=s.getBoundingClientRect();d.top>e.top&&(o=d.top-e.top)}const r=this.jellyBodies,n=r.length;for(let d=0;d<n;d++){const a=r[d];if(a.vx+=Math.sin(t*6e-4*a.driftFreqX+a.driftPhaseX)*a.driftForce,a.vy+=Math.cos(t*7e-4*a.driftFreqY+a.driftPhaseY)*a.driftForce,this.mouseX!==null&&this.mouseY!==null){const l=a.x-this.mouseX,g=a.y-this.mouseY,b=Math.hypot(l,g);if(b<140&&b>0){const y=(1-b/140)*.12;a.vx+=l/b*y,a.vy+=g/b*y}}a.vx*=a.drag,a.vy*=a.drag;const p=Math.hypot(a.vx,a.vy);p>a.maxSpeed&&(a.vx=a.vx/p*a.maxSpeed,a.vy=a.vy/p*a.maxSpeed),a.x+=a.vx,a.y+=a.vy,a.angle+=a.vRot;const u=a.radius;a.x<u?(a.x=u,a.vx=Math.abs(a.vx)*a.restitution+.02,a.squishX=.88,a.squishY=1.12):a.x>i-u&&(a.x=i-u,a.vx=-Math.abs(a.vx)*a.restitution-.02,a.squishX=.88,a.squishY=1.12),a.y<u?(a.y=u,a.vy=Math.abs(a.vy)*a.restitution+.02,a.squishX=1.12,a.squishY=.88):a.y>o-u&&(a.y=o-u,a.vy=-Math.abs(a.vy)*a.restitution-.02,a.squishX=1.12,a.squishY=.88),a.squishX+=(1-a.squishX)*.08,a.squishY+=(1-a.squishY)*.08}for(let d=0;d<n;d++)for(let a=d+1;a<n;a++){const p=r[d],u=r[a],l=u.x-p.x,g=u.y-p.y,b=Math.hypot(l,g),y=p.radius+u.radius;if(b<y&&b>0){const f=y-b,v=l/b,k=g/b;p.x-=v*f*.4,p.y-=k*f*.4,u.x+=v*f*.4,u.y+=k*f*.4;const $=p.vx-u.vx,c=p.vy-u.vy,m=(v*$+k*c)/(p.mass+u.mass),w=.35;p.vx-=m*u.mass*v*w,p.vy-=m*u.mass*k*w,u.vx+=m*p.mass*v*w,u.vy+=m*p.mass*k*w;const I=.12;p.squishX=Math.max(.85,1-I*Math.abs(v)),p.squishY=Math.max(.85,1-I*Math.abs(k)),u.squishX=Math.max(.85,1-I*Math.abs(v)),u.squishY=Math.max(.85,1-I*Math.abs(k))}}if(this.shadowRoot)for(let d=0;d<n;d++){const a=r[d],p=this.shadowRoot.getElementById(`jelly-${a.id}`);p&&(p.style.transform=`translate3d(${a.x-a.radius}px, ${a.y-a.radius}px, 0) rotate(${a.angle}deg) scale(${a.squishX}, ${a.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(!this.isGenerating){if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}}spendCapacityCharge(){const t=ht.spendCharge();return t||(this.showCapacityNote=!0),t}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*nt.length),this.loadingTimer=setInterval(()=>{let t=Math.floor(Math.random()*nt.length);t===this.loadingMsgIdx&&(t=(t+1)%nt.length),this.loadingMsgIdx=t},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(t){this.currentProvider=t,Ks(t),t==="google"?(this.currentModel=dt[0].id,ot(this.currentModel)):t==="opencodeai"&&(this.currentModel=Js[0].id,ot(this.currentModel))}changeModel(t){this.currentModel=t,ot(t)}initJellyBodies(){const t=this.getBoundingClientRect(),e=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let i=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const o=Math.min(i,400),s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],r=3,n=[];for(let d=0;d<r;d++){const a=s[d%s.length],p=a.r+30,u=p+Math.random()*Math.max(100,e-p*2),l=p+Math.random()*Math.max(50,o-p*2),g=.08+Math.random()*.18,b=.35+Math.random()*.25,y=.985,f=.006+Math.random()*.008,v=.35,k=Math.random()*Math.PI*2;n.push({id:d,shapeKey:a.key,width:a.r*2,height:a.r*2,x:u,y:l,vx:Math.cos(k)*g,vy:Math.sin(k)*g,maxSpeed:b,drag:y,driftForce:f,restitution:v,radius:a.r,mass:a.r*a.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=n}onFrameMouseMove(t){const e=this.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){Zs().then(t=>{t&&(t.google&&(this.googleLimit=t.google.limit,this.googleRemaining=t.google.remaining,this.googleCooldownSec=t.google.cooldownSeconds),t.openrouter&&(this.orLimit=t.openrouter.limit,this.orRemaining=t.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%Ft.length},2800),this.unsubscribeCapacity=ht.subscribe(t=>{this.capacityCharges=t.charges,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(t){super.updated(t),t.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.unsubscribeCapacity&&(this.unsubscribeCapacity(),this.unsubscribeCapacity=null),this.stopLoadingTimer()}selectGenre(t){this.dispatchEvent(new CustomEvent("genre-change",{detail:t,bubbles:!0,composed:!0}))}selectMood(t){this.dispatchEvent(new CustomEvent("mood-change",{detail:t,bubbles:!0,composed:!0}))}setLength(t){this.dispatchEvent(new CustomEvent("length-change",{detail:t,bubbles:!0,composed:!0}))}decLength(){this.length>we&&this.setLength(this.length-1)}incLength(){this.length<ne&&this.setLength(this.length+1)}onFreeTextChange(t){this.freeText=t.target.value}applyBest(t){this.selectGenre(t.genre),this.selectMood(t.mood);const e={...t,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:e,bubbles:!0,composed:!0}))}renderJellySvg(t){switch(t){case"blob1":return h`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return h`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return h`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return h`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return h`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return h`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return h`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return h`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return h`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return h`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return h`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return h`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return h`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return h`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const t=he(this.mood);let e=bo.filter(l=>Ne.includes(l));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const i=Ne.filter(l=>!e.includes(l)),o=this.expandedGenre?e.concat(i):e,s=xe.map(l=>l.name);let r=vo.filter(l=>s.includes(l));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const n=s.filter(l=>!r.includes(l)),a=(this.expandedMood?r.concat(n):r).map(l=>xe.find(g=>g.name===l)),p=this.freeText.trim(),u=p.length>2?wi(p):null;return h`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <app-header
          hideCapacity
          .isAdmin=${this.isAdmin}
          .capacityCharges=${this.capacityCharges}
          .capacityMax=${j}
          .rechargeNextSec=${this.rechargeNextSec}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          @view-sets=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}
          @request-login=${()=>this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}
          @request-logout=${()=>this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}
          @open-admin-modal=${()=>{this.showAdminModal=!0}}
          @wordmark-click=${()=>this.onWordmarkClick()}
        ></app-header>

        <div class="aquarium-layer">
          ${this.jellyBodies.map(l=>h`
            <div class="jelly-shape-wrapper" id="jelly-${l.id}" style="transform: translate3d(${l.x-l.radius}px, ${l.y-l.radius}px, 0) rotate(${l.angle}deg) scale(${l.squishX}, ${l.squishY})">
              ${this.renderJellySvg(l.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?h`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div style="position:relative;text-align:center;margin-bottom:28px;">
            <svg style="position:absolute;top:-34px;left:-6px;animation:cvfv-float1 14s ease-in-out infinite;transform-origin:center;pointer-events:none;" width="46" height="46" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>
            <svg style="position:absolute;bottom:-22px;right:-30px;animation:cvfv-float2 17s ease-in-out infinite;transform-origin:center;pointer-events:none;" width="38" height="38" viewBox="0 0 30 30"><rect x="2" y="2" width="26" height="26" rx="9" fill="#9CC0EC"/></svg>
            <svg style="position:absolute;top:-16px;right:56px;animation:cvfv-float3 20s ease-in-out infinite;animation-delay:-4s;transform-origin:center;pointer-events:none;" width="54" height="54" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#F2A79B" stroke-width="6" opacity="0.6"/></svg>

            <h1 style="font-size:40px;font-weight:800;line-height:1.14;letter-spacing:-0.02em;color:#2E271F;margin:0;">Describe a vibe,<br />hear it as chords.</h1>
            <div style="font-size:15.5px;line-height:1.65;color:#6B5F50;margin-top:12px;">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show?h`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div class="vibe-input-wrap ${this.isGenerating?"generating":""}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-label, #8A6B3F)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>
              </svg>
              <input
                type="text"
                class="vibe-input"
                .value=${this.freeText}
                ?disabled=${this.isGenerating}
                @input=${l=>this.onFreeTextChange(l)}
                @keydown=${l=>{l.key==="Enter"&&!this.isGenerating&&(l.preventDefault(),this.generate())}}
                placeholder=${this.isGenerating?"Composing your chords...":Ft[this.placeholderIdx]}
              />
              <button
                class="vibe-capacity-chip ${this.capacityCharges<=1?"low":""}"
                @click=${l=>{l.stopPropagation(),this.showCapacityNote=!this.showCapacityNote}}
                title=${this.capacityCharges>0?`${this.capacityCharges} of ${j} AI generates left. One comes back every ${this.rechargeNextSec>0?this.rechargeNextSec:45}s.`:`Cooling down — next one unlocks in ${Math.floor(this.rechargeNextSec/60)}:${String(this.rechargeNextSec%60).padStart(2,"0")}`}
                aria-label="AI generates remaining"
                type="button"
              >
                <span class="pips-wrap">
                  ${Array.from({length:j},(l,g)=>h`
                    <span class="pip ${g<this.capacityCharges?"filled":""} ${this.capacityCharges<=1?"low":""}"></span>
                  `)}
                </span>
                <span>${this.capacityCharges>0?`${this.capacityCharges} left`:`+1 in ${this.rechargeNextSec}s`}</span>
              </button>
              <button
                class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
                style="background: ${t}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
                @click=${l=>{l.stopPropagation(),this.generate()}}
                aria-label=${this.isGenerating?"Composing chords":"Hear this vibe as chords"}
                title=${this.isGenerating?"Composing chords...":"Generate progression from vibe"}
                ?disabled=${this.isGenerating}
              >
                ${this.isGenerating?h`
                  <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                    <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
                  </svg>
                `:h`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                `}
              </button>
            </div>
            ${this.isGenerating?h`
              <div class="generating-status">
                <div class="generating-dot-pulse">
                  <span></span><span></span><span></span>
                </div>
                <span>Finding chords for <strong>${this.freeText.trim()?`"${this.freeText.trim()}"`:`${this.genre} · ${this.mood}`}</strong>...</span>
              </div>
            `:""}
            ${this.showCapacityNote?h`
              <div class="capacity-note" @click=${()=>{this.showCapacityNote=!1}}>
                ${this.capacityCharges>0?`${this.capacityCharges} of ${j} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            `:""}
          </div>
          ${u?h`
            <div style="text-align:center;margin-top:10px;">
              <div style="display:inline-flex;align-items:center;gap:6px;border:1.5px solid ${t};color:#2E271F;padding:8px 16px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;background:#FBF3E6;transition:transform 150ms ease;" @click=${()=>this.applyBest(u)}>
                Try <span style="font-weight:800;">${u.genre} · ${u.mood}</span> →
              </div>
            </div>
          `:""}

          <div class="divider-row">
            <div class="divider-rule"></div>
            <div class="divider-label">or pick it yourself</div>
            <div class="divider-rule"></div>
          </div>

          <div class="section-label">Genre</div>
          <div class="pill-grid">
            ${o.map(l=>{const g=Ne.indexOf(l);return h`
                <div class="pill ${l===this.genre?"selected":""}" style=${l===this.genre?`background:${t}`:""} @click=${()=>this.selectGenre(l)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${fo[g%3]} fill=${mo[g%3]} />
                    </svg>
                  </div>
                  ${l}
                </div>
              `})}
            ${i.length?h`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${i.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${a.map(l=>h`
              <div class="pill mood-pill ${l.name===this.mood?"selected":""}" style=${l.name===this.mood?`background:${l.dot}`:""} @click=${()=>this.selectMood(l.name)}>
                <div class="mood-badge" style="background:${l.name===this.mood?"rgba(46,39,31,0.1)":l.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${l.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${l.iconPath} />
                  </svg>
                </div>
                ${l.name}
              </div>
            `)}
            ${n.length?h`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${n.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=we?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:ne},(l,g)=>h`
                <div class="length-segment ${g<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=ne?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button
            class="cta ${this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
            style="background:${t}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
            @click=${this.generate}
            ?disabled=${this.isGenerating}
          >
            ${this.isGenerating?h`
              <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
              </svg>
              <span>Composing chords...</span>
            `:h`
              ${u?"Let's go to your progression":"Generate loop"} <span>→</span>
            `}
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
          </div>
        </div>

        ${this.showAdminModal?h`
          <div class="admin-modal-backdrop" @click=${()=>{this.showAdminModal=!1}}>
            <div class="admin-modal" @click=${l=>l.stopPropagation()}>
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
                  ${this.currentProvider==="google"?h`
                    <div class="model-sub-list" @click=${l=>l.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${dt.map(l=>h`
                        <div class="model-sub-opt ${this.currentModel===l.id?"selected":""}" @click=${()=>this.changeModel(l.id)}>
                          <span>${l.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${l.vendor}</span>
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
    `}};E.styles=Q`
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
      padding: 24px 32px 80px;
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
      margin-top: 10px;
    }
    .hero {
      position: relative;
      text-align: center;
      margin-bottom: 28px;
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
      font-size: clamp(30px, 5.5vw, 42px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 16px;
      line-height: 1.65;
      color: #6B5F50;
      margin-top: 14px;
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
      background: var(--cv-cream, #FBF3E6);
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
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
    .vibe-capacity-chip {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      font-family: inherit;
      color: #6B5F50;
      background: rgba(46, 39, 31, 0.05);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 100px;
      cursor: pointer;
      user-select: none;
      transition: background 200ms ease, border-color 200ms ease, transform 150ms var(--cv-ease);
    }
    .vibe-capacity-chip:hover {
      background: rgba(46, 39, 31, 0.09);
      border-color: rgba(46, 39, 31, 0.2);
    }
    .vibe-capacity-chip.low {
      border-color: rgba(224, 138, 60, 0.5);
      color: #9E5212;
    }
    .pips-wrap {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .pip {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.18);
      transition: background 200ms ease;
    }
    .pip.filled {
      background: #F2735F;
    }
    .pip.filled.low {
      background: #E08A3C;
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
      width: 44px;
      height: 44px;
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
    .vibe-submit-btn.generating {
      cursor: wait;
      pointer-events: none;
    }
    .vibe-spinner {
      animation: cv-spin 0.75s linear infinite;
    }
    .vibe-input-wrap.generating {
      border-color: rgba(46, 39, 31, 0.35);
      box-shadow: 0 0 0 3px rgba(246, 217, 139, 0.35), 0 14px 32px -16px rgba(46, 39, 31, 0.35);
      animation: cv-input-pulse 1.8s ease-in-out infinite;
    }
    @keyframes cv-input-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.008); }
    }
    .cta.generating {
      cursor: wait;
      pointer-events: none;
    }
    .generating-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      font-size: 13px;
      font-weight: 600;
      color: #5B5145;
      animation: cv-status-fade 0.25s ease-out;
    }
    @keyframes cv-status-fade {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .generating-dot-pulse {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .generating-dot-pulse span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #8A6B3F;
      animation: cv-bounce 1.2s infinite ease-in-out both;
    }
    .generating-dot-pulse span:nth-child(1) { animation-delay: -0.32s; }
    .generating-dot-pulse span:nth-child(2) { animation-delay: -0.16s; }
    .generating-dot-pulse span:nth-child(3) { animation-delay: 0s; }
    @keyframes cv-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
      40% { transform: scale(1.2); opacity: 1; }
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
    .vibe-input:focus,
    .vibe-input:focus-visible {
      outline: none;
    }
    .vibe-input-wrap:focus-within {
      border-color: rgba(46, 39, 31, 0.28);
      box-shadow: 0 14px 32px -16px rgba(46, 39, 31, 0.45);
    }
    .vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.55);
      opacity: 1;
      transition: color 0.3s ease;
    }
    button:focus-visible {
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
      margin: 36px 0 8px;
    }
    .divider-rule {
      flex: 1;
      height: 1px;
      background: rgba(46, 39, 31, 0.14);
    }
    .divider-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #8A6B3F;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .section-label {
      margin-top: 26px;
      margin-bottom: 10px;
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #8A6B3F;
      text-transform: uppercase;
      text-align: left;
    }
    .pill-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-start;
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
      background: #F1E4CC;
      border-radius: 18px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
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
      gap: 9px;
      cursor: pointer;
      margin-top: 30px;
      transition: transform 160ms var(--cv-ease);
    }
    .cta:active {
      transform: scale(0.97);
    }
    .caption {
      text-align: center;
      font-size: 13px;
      color: #8A7C6B;
      margin-top: 14px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 40px;
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

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    @media (min-width: 980px) and (min-height: 700px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 40px; }
      .mascot-slot.right { right: 40px; }
    }

    @media (max-width: 600px) {
      .frame { padding: 16px 20px 40px; }
      .content { max-width: 100%; }
      .hero { margin-bottom: 20px; }
      h1 { font-size: 26px; line-height: 1.16; }
      .subcopy { margin-top: 10px; font-size: 13px; line-height: 1.6; }
      .vibe-input-shell { margin-top: 20px; }
      .vibe-input-wrap { padding: 6px 8px 6px 14px; }
      .vibe-submit-btn { width: 38px; height: 38px; }
      .divider-row { margin: 24px 0 12px; }
      .section-label { margin-top: 22px; margin-bottom: 8px; font-size: 11px; }
      .pill-grid { gap: 7px; }
      .pill { padding: 7px 14px 7px 9px; font-size: 12.5px; }
      .genre-icon-wrap { width: 18px; height: 18px; margin-right: 6px; }
      .mood-badge { width: 20px; height: 20px; margin-right: 6px; }
      .length-control { padding: 12px 16px; border-radius: 16px; }
      .cta { margin-top: 24px; padding: 15px; font-size: 15px; }
      .caption { margin-top: 10px; font-size: 12px; }
      .footer { margin-top: 24px; font-size: 11px; }
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
  `;B([S({type:String})],E.prototype,"genre",2);B([S({type:String})],E.prototype,"mood",2);B([S({type:Number})],E.prototype,"length",2);B([x()],E.prototype,"freeText",2);B([x()],E.prototype,"placeholderIdx",2);B([x()],E.prototype,"llmSuggestion",2);B([x()],E.prototype,"llmResolved",2);B([x()],E.prototype,"classifyError",2);B([x()],E.prototype,"expandedGenre",2);B([x()],E.prototype,"expandedMood",2);B([x()],E.prototype,"mascot",2);B([x()],E.prototype,"mascotSlot",2);B([x()],E.prototype,"peekMascot",2);B([x()],E.prototype,"peekSide",2);B([S({type:Boolean})],E.prototype,"isAuthenticated",2);B([S({type:String})],E.prototype,"userEmail",2);B([S({type:Boolean})],E.prototype,"isAdmin",2);B([S({type:Boolean})],E.prototype,"isGenerating",2);B([x()],E.prototype,"currentProvider",2);B([x()],E.prototype,"currentModel",2);B([x()],E.prototype,"showAdminModal",2);B([x()],E.prototype,"isClassifying",2);B([x()],E.prototype,"loadingMsgIdx",2);B([x()],E.prototype,"googleRemaining",2);B([x()],E.prototype,"googleLimit",2);B([x()],E.prototype,"googleCooldownSec",2);B([x()],E.prototype,"orRemaining",2);B([x()],E.prototype,"orLimit",2);B([x()],E.prototype,"capacityCharges",2);B([x()],E.prototype,"rechargeNextSec",2);B([x()],E.prototype,"showCapacityNote",2);B([x()],E.prototype,"paradeTrigger",2);E=B([ee("seed-screen")],E);function Lt(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=e[o]??0,r=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+s))}function Si(t,e,i){const o=e&&e.length>0?e.map(b=>t.chords[b]).filter(b=>!!b):t.chords,s=t.bpm||120,r=1.7,n=i?ue.find(b=>b.name.toLowerCase()===i.toLowerCase()):void 0,d=bt[t.genre]||{},a=n?.patch??{},p={...d,...a},u=d.duration??.9,l=a.durationMultiplier?u*a.durationMultiplier:u,g=[];return o.forEach((b,y)=>{const f=y*r,k=(b.notes&&b.notes.length>0?b.notes:["C","E","G"]).map($=>`${$}4`);if(p.arpMode&&p.arpMode!=="off"){const $=p.arpRate??"1/16",c=p.arpRange??1,m=p.arpMode,w=ii($,s),I=si(k,c),D=oi(I,m),H=p.duration?p.duration:Math.max(.6,l);D.forEach((z,Ie)=>{const A=f+Ie*w;g.push({note:z,midi:Lt(z),startTime:A,duration:H})})}else{const $=p.spread??0;k.forEach((c,m)=>{const w=m*$*.1,I=f+w;g.push({note:c,midi:Lt(c),startTime:I,duration:l})})}}),g}function yo(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function xo(t,e,i){const o=t.bpm||120,s=480,r=Si(t,e,i),n=[];r.forEach(f=>{const v=Math.round(f.startTime/(60/o)*s),k=Math.max(1,Math.round(f.duration/(60/o)*s));n.push({tick:v,type:"on",midi:f.midi}),n.push({tick:v+k,type:"off",midi:f.midi})}),n.sort((f,v)=>f.tick!==v.tick?f.tick-v.tick:f.type!==v.type?f.type==="off"?-1:1:f.midi-v.midi);const d=[],a=Math.round(6e7/o);d.push(0),d.push(255,81,3),d.push(a>>16&255,a>>8&255,a&255);const p="Chroma Chords";d.push(0),d.push(255,3,p.length);for(let f=0;f<p.length;f++)d.push(p.charCodeAt(f));let u=0;n.forEach(f=>{const v=f.tick-u;u=f.tick,d.push(...yo(v)),f.type==="on"?d.push(144,f.midi,80):d.push(128,f.midi,0)}),d.push(0),d.push(255,47,0);const l=[77,84,104,100,0,0,0,6,0,0,0,1,s>>8&255,s&255],g=d.length,b=[77,84,114,107,g>>24&255,g>>16&255,g>>8&255,g&255],y=new Uint8Array(l.length+b.length+d.length);return y.set(l,0),y.set(b,l.length),y.set(d,l.length+b.length),y}function wo(t,e,i,o){const s=xo(t,e,o),r=new Blob([s],{type:"audio/midi"}),n=(t.key||"C").toLowerCase(),d=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),a=t.bpm||120,p=`chroma-chords-${n}-${d}-${a}bpm.mid`;Ii(r,p)}function ko(t,e){const i=new Qt({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((t?pe.find(r=>r.name.toLowerCase()===t.toLowerCase()):void 0)?.instrument??(e?ft[e]:void 0)??"rhodes"){case"bell":return new V(Ce,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new V(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new V(re,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new V(re,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const r=new Kt({decay:4.5,wet:.35}).connect(i);return new V(re,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new Jt({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new V(re,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new V(Xt,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new V(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function So(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,s=o/8,r=e*s,n=t.length*e*s,d=new ArrayBuffer(44+n),a=new DataView(d),p=(g,b)=>{for(let y=0;y<b.length;y++)a.setUint8(g+y,b.charCodeAt(y))};p(0,"RIFF"),a.setUint32(4,36+n,!0),p(8,"WAVE"),p(12,"fmt "),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,e,!0),a.setUint32(24,i,!0),a.setUint32(28,i*r,!0),a.setUint16(32,r,!0),a.setUint16(34,o,!0),p(36,"data"),a.setUint32(40,n,!0);const u=[];for(let g=0;g<e;g++)u.push(t.getChannelData(g));let l=44;for(let g=0;g<t.length;g++)for(let b=0;b<e;b++){const y=Math.max(-1,Math.min(1,u[b][g])),f=y<0?y*32768:y*32767;a.setInt16(l,f,!0),l+=2}return new Blob([new Uint8Array(d)],{type:"audio/wav"})}async function Io(t,e,i,o){const s=Si(t,e,o);if(!s.length)return;const n=s.reduce((b,y)=>Math.max(b,y.startTime+y.duration),0)+1.2,d=await Di(async()=>{const b=ko(i,t.genre);s.forEach(y=>{b.triggerAttackRelease(y.note,y.duration,y.startTime)})},n),a=So(d.get()),p=(t.key||"C").toLowerCase(),u=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=t.bpm||120,g=`chroma-chords-${p}-${u}-${l}bpm.wav`;Ii(a,g)}function Ii(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var $o=Object.defineProperty,To=Object.getOwnPropertyDescriptor,ge=(t,e,i,o)=>{for(var s=o>1?void 0:o?To(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&$o(e,i,s),s};const Co=R`
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
`,No=R`
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
`,Ao=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Co},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:No}];let ie=class extends Z{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=Gs(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{await Io(this.progression,this.order,this.instrument,this.playStyle),this.emit("toast","WAV file downloaded")}catch(t){console.error("WAV export failed",t),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{wo(this.progression,this.order,this.instrument,this.playStyle),this.emit("toast","MIDI file downloaded")}catch(t){console.error("MIDI export failed",t),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return h`
      <div class="backdrop ${t?"open":""}" @click=${this.close}></div>
      <div class="share-drawer ${t?"open":""}">
        <div class="handle-bar"><div class="handle-pill"></div></div>
        <div class="drawer-content">
          <div class="head-row">
            <div>
              <div class="title">Share progression</div>
              <div class="subtitle">Send it somewhere you can actually play it.</div>
            </div>
            <button class="close-btn" @click=${this.close} aria-label="Close">×</button>
          </div>

          <div class="dests-grid">
            ${Ao.map(e=>h`
              <div class="dest-card" @click=${()=>this.handleDeviceClick(e.device)}>
                <div class="device-svg-box">
                  ${e.svg}
                </div>
                <div class="dest-badge">${e.mono}</div>
                <div class="dest-name">${e.name}</div>
                <div class="dest-desc">${e.desc}</div>
              </div>
            `)}
          </div>

          <div class="section-label">Or export a file</div>

          <div class="export-list">
            <div class="export-row" @click=${this.handleWavClick}>
              <div class="export-badge">WAV</div>
              <div>
                <div class="export-title">Save as WAV</div>
                <div class="export-desc">Rendered audio, ready to drop into any player.</div>
              </div>
            </div>

            <div class="export-row" @click=${this.handleMidiClick}>
              <div class="export-badge">MID</div>
              <div>
                <div class="export-title">Save as MIDI</div>
                <div class="export-desc">Just the notes — reopen it in your own instrument.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};ie.styles=Q`
    :host {
      display: block;
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif);
    }
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(46, 39, 31, 0);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      pointer-events: none;
      opacity: 0;
      transition: opacity 260ms cubic-bezier(0.16, 1, 0.3, 1), background 260ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .backdrop.open {
      background: rgba(46, 39, 31, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 1;
      pointer-events: auto;
    }
    .share-drawer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1001;
      max-width: 580px;
      margin: 0 auto;
      max-height: 85vh;
      background: var(--cv-cream, #FBF6EC);
      border-radius: 26px 26px 0 0;
      box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      transform: translateY(100%);
      opacity: 0;
      pointer-events: none;
      transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
      box-sizing: border-box;
    }
    .share-drawer.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    .handle-bar {
      padding: 11px 0 0;
      display: flex;
      justify-content: center;
      flex-shrink: 0;
    }
    .handle-pill {
      width: 38px;
      height: 4px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
    }
    .drawer-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 14px 22px 28px;
    }
    .head-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .title {
      font-size: 21px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
    }
    .subtitle {
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 6px;
    }
    .close-btn {
      border: none;
      font-family: inherit;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--cv-surface, #F6EADB);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink, #2E271F);
      flex-shrink: 0;
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }
    .close-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .close-btn:active {
      transform: scale(0.94);
    }
    .dests-grid {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    .dest-card {
      flex: 1;
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 16px 14px;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background 150ms ease, box-shadow 150ms ease;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      box-sizing: border-box;
    }
    .dest-card:hover {
      background: var(--cv-surface-2, #F1E4CC);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px -8px rgba(46, 39, 31, 0.15);
    }
    .dest-card:active {
      transform: scale(0.97);
    }
    .device-svg-box {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 12px;
      padding: 6px;
      box-sizing: border-box;
    }
    .device-svg-box svg {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12));
      transition: transform 180ms ease;
    }
    .dest-card:hover .device-svg-box svg {
      transform: translateY(-2px) scale(1.03);
    }
    .dest-badge {
      padding: 3px 7px;
      border-radius: 7px;
      background: var(--cv-surface-2, #F1E4CC);
      font-size: 10.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      letter-spacing: 0.4px;
    }
    .dest-name {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 8px;
    }
    .dest-desc {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 4px;
      text-wrap: pretty;
    }
    .section-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      margin: 24px 0 11px;
    }
    .export-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .export-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 16px;
      padding: 14px 16px;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background 150ms ease;
    }
    .export-row:hover {
      background: var(--cv-surface-2, #F1E4CC);
      transform: translateY(-1px);
    }
    .export-row:active {
      transform: scale(0.99);
    }
    .export-badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--cv-surface-2, #F1E4CC);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      flex-shrink: 0;
    }
    .export-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .export-desc {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
      text-wrap: pretty;
    }
  `;ge([S({type:Boolean})],ie.prototype,"open",2);ge([S({type:Boolean})],ie.prototype,"visible",2);ge([S({type:Object})],ie.prototype,"progression",2);ge([S({type:Array})],ie.prototype,"order",2);ge([S({type:String})],ie.prototype,"instrument",2);ge([S({type:String})],ie.prototype,"playStyle",2);ie=ge([ee("share-modal")],ie);var Mo=Object.defineProperty,Eo=Object.getOwnPropertyDescriptor,N=(t,e,i,o)=>{for(var s=o>1?void 0:o?Eo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Mo(e,i,s),s};const Pe=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],Oo=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"],Do=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Rock","Cinematic","Ambient/Drone","House/Dance","Reggae/Dub","Gospel"],Ut=["Uplifting","Melancholy","Dreamy","Tense","Warm","Nostalgic"],Bo={Uplifting:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5",Melancholy:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15",Dreamy:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0",Tense:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12",Warm:"M12 4 a6.5 6.5 0 1 0 6.5 6.5",Nostalgic:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},Fe={Tonic:"home",Subdominant:"moving away",Dominant:"pulling home","Dominant 7th":"pulling hard",Supertonic:"stepping out",Mediant:"in between",Submediant:"soft home"},Rt=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],_t={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Le={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},jt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},$i={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Te={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Po(t){const e=t===""?"maj":t;if(Te[5][e]||Te[6][e])return e;const i=$i[e];return i&&(Te[5][i]||Te[6][i])?i:"maj"}function Fo(t){const e=Po(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const r=Te[o][e];if(!r)return;const n=((t.rootPc-s)%12+12)%12;i.push({rootFret:n,frets:r.map(d=>d===null?null:d+n)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function Lo(t){const e=[7,0,4,9],i=t.intervals.map(n=>(t.rootPc+n)%12),o=n=>{const d=new Set(n);let a=null;const p=[],u=l=>{if(l===4){const g=p.map((v,k)=>(e[k]+v)%12);for(const v of d)if(g.indexOf(v)<0)return;for(const v of g)if(!d.has(v))return;const b=p.filter(v=>v>0),y=b.length?Math.max(...b)-Math.min(...b):0;if(y>3)return;const f=y*12+p.reduce((v,k)=>v+k,0);(!a||f<a.score)&&(a={frets:p.slice(),score:f});return}for(let g=0;g<=5;g++)p.push(g),u(l+1),p.pop()};return u(0),a},s=o(i);if(s)return s.frets;const r=o(t.intervals.filter(n=>n!==7).map(n=>(t.rootPc+n)%12));return r?r.frets:null}const zt=[{key:"Darker",label:"Darker",tension:.55},{key:"More tension",label:"Tense",tension:.9},{key:"Dreamier",label:"Dreamy",tension:.3},{key:"Resolve home",label:"Home",tension:.05},{key:"Borrowed",label:"Borrow",tension:.42,twoTone:!0}],Gt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."]};let C=class extends Z{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=window.innerWidth<900,this.activeView="loop",this.activeSoundDrawer=null,this.shareOpen=!1,this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.abPick=null,this.abSide="before",this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.previewIndex=-1,this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.snapProgress=!1,this.abPlaying=!1,this.dragState=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.previewTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.onChordPointerDown=(t,e,i)=>{if(e.button!==0)return;const o=this.shadowRoot?.querySelector(".chords-flex-row"),r=(o?Array.from(o.querySelectorAll(".chord-item-wrap")):[]).map(n=>{const d=n.getBoundingClientRect();return{center:{x:d.left+d.width/2,y:d.top+d.height/2},width:d.width,height:d.height}});this.dragState={dragIndex:t,targetIndex:t,startX:e.clientX,startY:e.clientY,currentX:e.clientX,currentY:e.clientY,offsetX:0,offsetY:0,velocityX:0,velocityY:0,lastTime:performance.now(),lastX:e.clientX,lastY:e.clientY,isDragging:!1,itemBounds:r,pendingTapFn:i},window.addEventListener("pointermove",this.onWindowPointerMove),window.addEventListener("pointerup",this.onWindowPointerUp),window.addEventListener("pointercancel",this.onWindowPointerUp)},this.onWindowPointerMove=t=>{if(!this.dragState)return;const e=this.dragState,i=t.clientX-e.startX,o=t.clientY-e.startY,s=Math.hypot(i,o);if(!e.isDragging)if(s>6)e.isDragging=!0,document.body.style.cursor="grabbing",typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(10);else return;t.cancelable&&t.preventDefault();const r=performance.now(),n=Math.max(1,r-e.lastTime);if(e.velocityX=(t.clientX-e.lastX)/n,e.velocityY=(t.clientY-e.lastY)/n,e.lastX=t.clientX,e.lastY=t.clientY,e.lastTime=r,e.currentX=t.clientX,e.currentY=t.clientY,e.offsetX=i,e.offsetY=o,e.itemBounds.length>0){const d=e.itemBounds[e.dragIndex]?.center||{x:e.startX,y:e.startY},a=d.x+i,p=d.y+o;let u=e.dragIndex,l=1/0;e.itemBounds.forEach((g,b)=>{const y=Math.hypot(a-g.center.x,p-g.center.y);y<l&&(l=y,u=b)}),e.targetIndex=u}this.requestUpdate()},this.onWindowPointerUp=()=>{if(!this.dragState)return;window.removeEventListener("pointermove",this.onWindowPointerMove),window.removeEventListener("pointerup",this.onWindowPointerUp),window.removeEventListener("pointercancel",this.onWindowPointerUp),document.body.style.cursor="";const{dragIndex:t,targetIndex:e,isDragging:i,pendingTapFn:o}=this.dragState;if(this.dragState=null,!i){o&&o(),this.requestUpdate();return}if(e!==t&&this.progression?.chords){const s=[...this.progression.chords],[r]=s.splice(t,1);s.splice(e,0,r),this.swapIndex===t?this.swapIndex=e:this.swapIndex!==null&&(t<e&&this.swapIndex>t&&this.swapIndex<=e?this.swapIndex--:t>e&&this.swapIndex>=e&&this.swapIndex<t&&this.swapIndex++),this.progression={...this.progression,chords:s},T.setProgression(this.progression,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:"Reordered chords",bubbles:!0,composed:!0})),typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(18)}this.requestUpdate()}}willUpdate(t){if(t.has("playing")&&(this.playing?(this.snapProgress=!0,requestAnimationFrame(()=>{this.snapProgress=!1,this.requestUpdate()})):this.snapProgress=!0),t.has("progressStep")){const e=t.get("progressStep");this.progressStep===0&&e!==void 0&&e>0&&(this.snapProgress=!0,requestAnimationFrame(()=>{this.snapProgress=!1,this.requestUpdate()}))}}connectedCallback(){super.connectedCallback(),this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.refreshSavedSets(),window.addEventListener("resize",this.onResizeHandler),this.unsubscribeProjects=F.subscribeProjects(()=>{this.refreshSavedSets()}),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},3200)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("pointermove",this.onWindowPointerMove),window.removeEventListener("pointerup",this.onWindowPointerUp),window.removeEventListener("pointercancel",this.onWindowPointerUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.previewTimer&&clearTimeout(this.previewTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}getChordDragStyle(t){if(!this.dragState||!this.dragState.isDragging)return"cursor: grab; transition: transform 0.25s var(--cv-ease), box-shadow 0.25s ease;";const{dragIndex:e,targetIndex:i,offsetX:o,offsetY:s,velocityX:r,itemBounds:n}=this.dragState;if(t===e){const p=Math.max(-8,Math.min(8,o*.04+r*8));return`transform: translate3d(${o}px, ${s}px, 0) scale(1.08) rotate(${p.toFixed(2)}deg); z-index: 50; cursor: grabbing; box-shadow: 0 20px 40px -8px rgba(46, 39, 31, 0.35), 0 8px 16px -4px rgba(0, 0, 0, 0.2); transition: none; pointer-events: none; opacity: 0.96;`}let d=0;e<i&&t>e&&t<=i?d=-1:e>i&&t>=i&&t<e&&(d=1);let a=0;if(d!==0&&n.length>0){const p=n[t],u=n[t+d];p&&u?a=u.center.x-p.center.x:a=d*110}return`transform: translate3d(${a}px, 0, 0) scale(0.96); transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease; opacity: 0.84;`}onChordKeyDown(t,e){if(e.altKey&&(e.key==="ArrowLeft"||e.key==="ArrowRight")){e.preventDefault();const i=e.key==="ArrowLeft"?Math.max(0,t-1):Math.min(this.progression.chords.length-1,t+1);if(i!==t&&this.progression?.chords){const o=[...this.progression.chords],[s]=o.splice(t,1);o.splice(i,0,s),this.swapIndex===t&&(this.swapIndex=i),this.progression={...this.progression,chords:o},T.setProgression(this.progression,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:"Reordered chords",bubbles:!0,composed:!0})),this.updateComplete.then(()=>{this.shadowRoot?.querySelectorAll(".chord-item-wrap")?.[i]?.focus()})}}}refreshSavedSets(){this.savedSets=F.getProjects(),this.requestUpdate()}renderStageTitle(t){if(this.progression?.searchTerm){const e=this.progression.searchTerm.trim(),o=(e.endsWith(".")?e.slice(0,-1):e).split(/\s+/);if(o.length===1)return h`<span style="color: ${t}">${o[0]}.</span>`;const s=o.slice(0,-1).join(" "),r=o[o.length-1];return h`${s} <span style="color: ${t}">${r}.</span>`}return h`${this.progression?.genre||"Pop"}, <span style="color: ${t}">${(this.progression?.mood||"Warm").toLowerCase()}.</span>`}onVibeSubmit(t){t.preventDefault(),!(this.isGenerating||!this.freeText.trim())&&this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0}))}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0}))}onBandClick(t){this.selectedBand=this.selectedBand===t?null:t;const e=Pe.find(i=>i.name===this.selectedBand);e&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onChordPreview(t){this.previewIndex=t,this.previewTimer&&clearTimeout(this.previewTimer),this.previewTimer=setTimeout(()=>{this.previewIndex=-1},500),this.progression&&T.playChordAtIndex(t,.8),this.requestUpdate()}onChordSelect(t){this.onChordPreview(t),this.swapIndex=t,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,T.setABOverride(null),this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.isMobile&&(this.mobileSheetOpen=!0),this.requestUpdate()}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){if(t==="before")T.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),T.playChordAtIndex(this.swapIndex,.8);else if(this.abPick){const e=Y(this.progression.key,this.progression.scaleType),i=X(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};T.setABOverride({index:this.swapIndex,side:"after",chord:o}),T.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=Y(this.progression.key,this.progression.scaleType),o=X(this.abPick.chord,i),s={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:o};T.auditionChord(s,.8)}else T.playChordAtIndex(t,.8)}toggleAB(){if(this.progression){if(this.abPlaying=!this.abPlaying,this.abPlaying){if(this.swapIndex!==null){const t=Y(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?X(this.abPick.chord,t):this.progression.chords[this.swapIndex]?.notes||[],i=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e}:this.progression.chords[this.swapIndex];T.setABOverride({index:this.swapIndex,side:this.abSide,chord:i})}this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),T.setABOverride(null);this.requestUpdate()}}onAltAudition(t){const e="chord"in t?t.chord:t,i=this.progression?Y(this.progression.key,this.progression.scaleType):!1,o=e.notes&&e.notes.length>0?e.notes:X(e.name,i);this.abPick={label:"label"in t?t.label:t.name,tension:e.tension||.5,chord:e.name,roman:e.roman||"",fn:"functionCaption"in t&&t.functionCaption?t.functionCaption:"Swapped chord"},this.abSide="after",this.swapIndex!==null&&this.progression&&T.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:o}}),T.auditionChord({...e,notes:o},.8),this.requestUpdate()}onConfirmSwap(){if(!this.abPick||this.swapIndex===null||!this.progression)return;const t=this.progression.chords,e=[...t],i=t[this.swapIndex],o=Y(this.progression.key,this.progression.scaleType);e[this.swapIndex]={...i,name:this.abPick.chord,roman:this.abPick.roman||i.roman,tension:this.abPick.tension,notes:X(this.abPick.chord,o)};const s=this.abPick.chord;this.progression={...this.progression,chords:e},T.setProgression(this.progression,this.order),T.setABOverride(null),this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.swapIndex=null,this.abPick=null,this.abPlaying=!1,this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${s}`,bubbles:!0,composed:!0})),this.requestUpdate()}onStepLength(t){if(!this.progression)return;const e=Math.max(we,Math.min(ne,this.progression.chords.length+t));this.dispatchEvent(new CustomEvent("set-length",{detail:e,bubbles:!0,composed:!0}))}onReroll(){this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onBookmark(){this.progression&&this.dispatchEvent(new CustomEvent("save-set",{detail:`${this.progression.genre} · ${this.progression.mood}`,bubbles:!0,composed:!0}))}toggleLibrary(t){this.libraryOpen=t!==void 0?t:!this.libraryOpen,this.librarySelectMode=!1,this.librarySelected=[],this.renamingId=null,this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("library-open-change",{detail:this.libraryOpen,bubbles:!0,composed:!0})),this.requestUpdate()}startRename(t,e,i){t.stopPropagation(),this.renamingId=e,this.draftName=i,this.confirmDeleteId=null}onDraftChange(t){this.draftName=t.target.value}commitRename(t){const e=this.draftName.trim();if(!e){this.cancelRename();return}const o=F.getProjects().find(s=>s.id===t);if(o){const s={...o,name:e,lastModified:Date.now()};F.saveProject(s),this.refreshSavedSets(),this.dispatchEvent(new CustomEvent("toast",{detail:`Renamed to "${e}"`,bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName=""}cancelRename(){this.renamingId=null,this.draftName=""}askDelete(t,e){t.stopPropagation(),this.confirmDeleteId=e,this.renamingId=null}confirmDelete(t){F.deleteProject(t),this.confirmDeleteId=null,this.refreshSavedSets(),this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop from library",bubbles:!0,composed:!0}))}cancelDelete(){this.confirmDeleteId=null}onLoadSavedProject(t){this.dispatchEvent(new CustomEvent("load-project",{detail:t,bubbles:!0,composed:!0})),this.toggleLibrary(!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Loaded "${t.name}"`,bubbles:!0,composed:!0}))}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets,o=i.filter(a=>e?`${a.name} ${a.genre} ${a.mood} ${(a.chords||[]).map(u=>typeof u=="object"?u.name:u).join(" ")}`.toLowerCase().indexOf(e)>=0:!0),s=i.length>2,r=this.librarySelectMode,n=this.librarySelected,d=i.length?`Your loops · ${i.length}`:"Your loops";return i.length===0?h`<div class="lib-empty-text">Nothing kept yet. Use the bookmark to keep a loop here.</div>`:h`
      <div class="lib-pop-header">
        <div class="lib-pop-title">${d}</div>
        <button class="lib-pop-select-btn" style="background: ${r?t:"transparent"};" @click=${()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelected=[],this.confirmDeleteId=null,this.renamingId=null}}>${r?"Done":"Select"}</button>
      </div>
      ${s?h`
        <div style="padding: 0 4px 9px;">
          <input type="text" class="lib-pop-search" placeholder="Search loops" .value=${this.librarySearch} @input=${a=>{this.librarySearch=a.target.value}} />
        </div>
      `:""}
      <div class="lib-rows">
        ${o.map(a=>{const p=this.renamingId===a.id,u=this.confirmDeleteId===a.id,l=n.indexOf(a.id)>=0,g=a.chords||[],b=he(a.mood||"Warm");return h`
            <div class="lib-row ${l?"checked":""}" @click=${()=>r?this.toggleLibrarySelected(a.id):this.onLoadSavedProject(a)}>
              ${r?h`
                <div class="lib-check ${l?"checked":""}" style="background: ${l?t:"transparent"};" @click=${y=>{y.stopPropagation(),this.toggleLibrarySelected(a.id)}}>${l?"✓":""}</div>
              `:""}
              <div class="lib-row-info" style="cursor: pointer;">
                ${p?h`
                  <input
                    type="text"
                    class="lib-rename-input"
                    .value=${this.draftName}
                    @input=${this.onDraftChange}
                    @keydown=${y=>{y.key==="Enter"&&this.commitRename(a.id),y.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(a.id)}
                    @click=${y=>y.stopPropagation()}
                    autofocus
                  />
                `:h`
                  <div>
                    <span class="lib-row-name-line">
                      <span class="lib-row-dots">
                        ${g.map((y,f)=>{const v=typeof y=="object"&&y!==null?y.tension??.1:.1;W(v);const k=7,$=f%2?"2px":"50%";return h`<span style="width:${k}px;height:${k}px;border-radius:${$};background:${b};"></span>`})}
                      </span>
                      <span class="lib-row-name">${a.name||"Untitled Loop"}</span>
                    </span>
                    <span class="lib-row-meta">${a.genre||"Pop"} · ${a.mood||"Warm"}</span>
                  </div>
                `}
              </div>
              ${!r&&!u&&!p?h`
                <div class="lib-row-actions">
                  <button class="lib-icon-btn" @click=${y=>{y.stopPropagation(),this.startRename(y,a.id,a.name||"Untitled Loop")}} aria-label="Rename loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                  </button>
                  <button class="lib-icon-btn" @click=${y=>{y.stopPropagation(),this.askDelete(y,a.id)}} aria-label="Delete loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                  </button>
                </div>
              `:""}
              ${u?h`
                <div class="lib-confirm-actions">
                  <button class="lib-confirm-delete-btn" @click=${y=>{y.stopPropagation(),this.confirmDelete(a.id)}}>Delete</button>
                  <button class="lib-icon-btn" @click=${y=>{y.stopPropagation(),this.cancelDelete()}} aria-label="Cancel">×</button>
                </div>
              `:""}
            </div>
          `})}
      </div>
      ${i.length>0&&o.length===0?h`
        <div class="lib-no-match">No loops match that.</div>
      `:""}
      ${r?h`
        <button class="lib-batch-delete-btn" style="background: ${n.length?"#D8624C":"var(--cv-surface)"}; color: ${n.length?"#FBF3E6":"rgba(46,39,31,0.35)"}; cursor: ${n.length?"pointer":"default"};" @click=${()=>this.deleteLibrarySelected()}>Delete ${n.length} loop${n.length===1?"":"s"}</button>
      `:""}
    `}toggleLibrarySelected(t){this.librarySelected.indexOf(t)>=0?this.librarySelected=this.librarySelected.filter(i=>i!==t):this.librarySelected=[...this.librarySelected,t]}deleteLibrarySelected(){if(this.librarySelected.length===0)return;const t=new Set(this.librarySelected);for(const e of t)F.deleteProject(e);this.refreshSavedSets(),this.librarySelected=[],this.librarySelectMode=!1}renderLoopsDrawer(t){return""}parseChord(t){const e=/^([A-G][b#]?)(.*)$/.exec(t||"C"),i=e?e[1]:"C",o=e?e[2]:"",s=jt[o]||jt[$i[o]||"maj"]||[0,4,7];return{root:i,rootPc:_t[i]===void 0?0:_t[i],q:o,intervals:s}}renderPianoCard(t,e){const i=this.parseChord(t.name),o=22,s=86,r=52,n=[0,2,4,5,7,9,11],d=[],a=[],p=[];for(let g=0;g<2;g++)n.forEach((b,y)=>{d.push({x:(g*7+y)*o,w:o-1.5,h:s})});for(let g=0;g<2;g++)[0,1,3,4,5].forEach(b=>{const y=g*7+b;a.push({x:y*o+o*.64,w:o*.58,h:r})});i.intervals.forEach(g=>{const b=i.rootPc+g,y=Math.floor(b/12),f=b%12,v=n.indexOf(f),k=g===0,$=v<0,c=k?"#F2735F":$?"#FBF3E6":"#2E271F",m=k?"#FBF3E6":$?"#2E271F":"#FBF3E6",w=this.showDegrees?Le[g%12]:"";if(v>=0){const I=y*7+v;p.push({cx:I*o+(o-1.5)/2,cy:s-19,r:9,fill:c,isRoot:k,label:w,lc:m})}else{const D=(y*7+n.indexOf(f-1))*o+o*.64,H=o*.58;p.push({cx:D+H/2,cy:r-14,r:7.5,fill:c,isRoot:k,label:w,lc:m})}});const u=14*o,l=i.intervals.map(g=>{const b=Rt[(i.rootPc+g)%12];return this.showDegrees?`${b} (${Le[g%12]})`:b}).join(" · ");return h`
      <div class="play-card" @click=${()=>T.playChordAtIndex(e,.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; gap: 9px;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?h`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${u}" height="${s}" viewBox="0 0 ${u} ${s}" style="display: block; width: 100%; max-width: ${u}px; height: auto;">
          ${d.map(g=>R`
            <rect x="${g.x}" y="0" width="${g.w}" height="${g.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${a.map(g=>R`
            <rect x="${g.x}" y="0" width="${g.w}" height="${g.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${p.map(g=>R`
            <g>
              <circle cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="${g.fill}" stroke="${g.isRoot?"#2E271F":"none"}" stroke-width="${g.isRoot?1.6:0}"></circle>
              ${g.label?R`
                <text x="${g.cx}" y="${g.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${g.lc}" font-family="'Plus Jakarta Sans',sans-serif">${g.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${l}</div>
      </div>
    `}renderFretCard(t,e,i){const o=this.parseChord(t.name),s=[4,9,2,7,11,4],r=[7,0,4,9],n=i==="Ukulele",d=n?r:s,a=n?Lo(o)||[null,null,null,null]:Fo(o)||[null,null,null,null,null,null],p=18,u=24,l=4,g=16,b=d.length,y=a.filter(A=>A!==null&&A>0),f=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,v=[],k=[],$=[],c=[],m=[];for(let A=0;A<b;A++)v.push({x:A*p});for(let A=0;A<=l;A++)k.push({y:g+A*u,sw:A===0&&f===0?3:1.2});a.forEach((A,me)=>{const Ge=me*p;if(A===null){m.push({x:Ge});return}if(A===0){c.push({x:Ge});return}const Ti=((d[me]+A-o.rootPc)%12+12)%12;$.push({cx:Ge,cy:g+(A-f-.5)*u,fill:Ti===0?"#F2735F":"#2E271F",label:this.showDegrees?Le[((d[me]+A-o.rootPc)%12+12)%12]:""})});const w=(b-1)*p,I=(b-1)*p+26,D=g+l*u+12,H=f>0?`${f+1}fr`:"",z=f>0,Ie=o.intervals.map(A=>{const me=Rt[(o.rootPc+A)%12];return this.showDegrees?`${me} (${Le[A%12]})`:me}).join(" · ");return h`
      <div class="play-card" @click=${()=>T.playChordAtIndex(e,.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?h`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${z?h`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${H}</div>
          `:""}
        </div>
        <svg width="${I}" height="${D}" viewBox="-13 -2 ${I} ${D}" style="display: block; width: 100%; max-width: ${I*1.5}px; height: auto;">
          ${k.map(A=>R`
            <rect x="0" y="${A.y}" width="${w}" height="${A.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${v.map(A=>R`
            <rect x="${A.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${c.map(A=>R`
            <circle cx="${A.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${m.map(A=>R`
            <text x="${A.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${$.map(A=>R`
            <g>
              <circle cx="${A.cx}" cy="${A.cy}" r="${A.fill==="#F2735F"?7.5:7}" fill="${A.fill}"></circle>
              ${A.label?R`
                <text x="${A.cx}" y="${A.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${A.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${Ie}</div>
      </div>
    `}render(){const t=this.progression?.chords||[],e=he(this.progression?.mood||"Warm"),i=Pe.find(c=>c.name===this.selectedBand),o=this.expandedGenre?Do:Oo,s=this.progression?.mood||"Warm";let r=["Uplifting","Melancholy","Dreamy"];r.includes(s)||(r=["Uplifting","Melancholy",s]);const n=Ut.filter(c=>!r.includes(c)),d=this.expandedMood?Ut:r,a=t.map(c=>c.tension||.1),p=Math.max(...a,.1),u=Math.min(...a,0),l=a.indexOf(p),g=a.every((c,m)=>m===0||c>=a[m-1]),b=p-u<.28?"Stays close to home":g?"A steady climb":a[a.length-1]<.25&&l<a.length-1?"Away, then home":"Drifts, then settles",y=`Opens ${Fe[t[0]?.functionLabel]||"home"} and ${p-u<.28?"never strays far — every chord sits in about the same harmonic neighborhood.":g?`tightens bar by bar, reaching peak tension on ${t[l]?.name||"the peak"}.`:`explores tension up to ${t[l]?.name||"the middle"} before resolving back down.`}`;let f=[],v="";const k=this.progression?.scaleType?.includes("MINOR")??!1;if(this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")f=ui(this.chordData,this.progression,this.swapIndex),v=this.showTheory?`Modal interchange — four chords from the parallel ${k?"major":"minor"}, each matched to the chord it can stand in for.`:`Four chords from the ${k?"major":"minor"} version of this key. Each one swaps in for a chord you already have.`;else{const c=wt(this.chordData,this.progression,this.swapIndex);f=(c.find(w=>w.name===this.activeSwapFamily)||c[0])?.rows||[],v=Gt[this.activeSwapFamily]?Gt[this.activeSwapFamily][this.showTheory?1:0]:""}if(i){const c=f.filter(w=>i.hoist.includes(w.name)),m=f.filter(w=>!i.hoist.includes(w.name));f=[...c,...m]}}const $=this.swapIndex!==null?t[this.swapIndex]:null;return h`
      <!-- Top Band DNA Banner -->
      ${i?h`
        <div class="band-bar" style="background: ${i.color}33;">
          <div class="band-bar-content">
            <span class="band-bar-kicker">Following Artist DNA</span>
            <span class="band-bar-name" style="font-family: ${i.font}; font-weight: ${i.weight||800}; font-style: ${i.italic?"italic":"normal"}; letter-spacing: ${i.pillTrack};">
              ${i.name}
            </span>
            <span class="band-bar-trick">— ${this.showTheory?i.theory:i.plain}</span>
          </div>
          <button class="band-bar-close" @click=${()=>this.onBandClick(i.name)} aria-label="Dismiss band DNA">×</button>
        </div>
      `:""}

      ${this.isMobile?h`
        <!-- DEDICATED MOBILE LAYOUT -->
        <div class="mobile-stage-wrap" style="--mood-color: ${e};">
          <!-- Collapsible Vibe Selector Drawer -->
          <div style="padding: 12px 18px 0;">
            <button class="mobile-vibe-bar" @click=${()=>{this.vibeOpen=!this.vibeOpen}}>
              <div>
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">The Vibe</div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink); margin-top: 2px;">
                  ${this.progression?.searchTerm?h`
                    ${this.renderStageTitle(e)}
                  `:`${this.progression?.genre||"Pop"} · ${this.progression?.mood||"Warm"}`}
                </div>
              </div>
              <span>${this.vibeOpen?"⌃":"⌄"}</span>
            </button>

            ${this.vibeOpen?h`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="vibe-input-row ${this.isGenerating?"generating":""}" @submit=${this.onVibeSubmit} style="margin-top: 0;">
                  <input
                    type="text"
                    class="vibe-text-input"
                    .value=${this.freeText}
                    @input=${c=>{this.freeText=c.target.value}}
                    placeholder=${this.isGenerating?"Composing your chords...":this.vibeExamples[this.vibePlaceholderIdx]}
                    ?disabled=${this.isGenerating}
                  />
                  <button
                    type="submit"
                    class="vibe-submit-btn ${this.isGenerating?"generating":""}"
                    style="background: ${e};"
                    aria-label="${this.isGenerating?"Composing chords":"Generate loop from vibe"}"
                    ?disabled=${this.isGenerating||!this.freeText.trim()}
                  >
                    ${this.isGenerating?h`
                      <div class="vibe-spinner"></div>
                    `:h`
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                    `}
                  </button>
                </form>
                ${this.isGenerating?h`
                  <div class="vibe-generating-pill">
                    <span class="vibe-spinner"></span>
                    <span>Composing chords...</span>
                  </div>
                `:""}

                <div class="kicker-label spaced">Genre</div>
                <div class="pills-group">
                  ${o.map(c=>h`
                    <button class="pill ${this.progression?.genre===c?"active":""}" @click=${()=>this.onGenreClick(c)}>${c}</button>
                  `)}
                </div>

                <div class="kicker-label spaced">Mood</div>
                <div class="pills-group">
                  ${d.map(c=>h`
                    <button class="pill ${this.progression?.mood===c?"active":""}" @click=${()=>this.onMoodClick(c)}>${c}</button>
                  `)}
                  ${n.length?h`
                    <button class="pill more-toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                      ${this.expandedMood?"Show less ⌃":`+${n.length} more ⌄`}
                    </button>
                  `:""}
                </div>

                <div class="kicker-label spaced">Band</div>
                <div class="pills-group">
                  ${Pe.map(c=>h`
                    <button class="pill ${this.selectedBand===c.name?"active":""}" @click=${()=>this.onBandClick(c.name)}>${c.name}</button>
                  `)}
                </div>
              </div>
            `:""}
          </div>

          <!-- View Switcher Tabs: Chords | Song | Play it -->
          <div style="padding: 12px 18px 0;">
            <div class="view-tabs-bar" style="width: 100%; justify-content: center;">
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
            </div>
          </div>

          <!-- Mobile Center View -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView==="loop"?h`
              <div class="stage-panel" style="min-height: 200px; padding: 24px 12px;">
                <svg class="drift-shape a" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                <svg class="drift-shape b" width="90" height="90" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                <div class="chords-flex-row" style="gap: 16px;">
                  ${t.map((c,m)=>{const w=W(c.tension||.1),I=this.playing&&m===this.progressStep,D=Math.max(76,Math.min(100,w.size*.8)),H=Math.round(w.radius*(D/w.size));return h`
                      <div
                        class="chord-item-wrap ${this.dragState?.dragIndex===m?"is-dragging":""}"
                        style="${this.getChordDragStyle(m)}"
                        @pointerdown=${z=>this.onChordPointerDown(m,z,()=>this.onChordPreview(m))}
                        @keydown=${z=>this.onChordKeyDown(m,z)}
                        tabindex="0"
                        role="button"
                        aria-label="${c.name}, ${c.functionLabel||"Chord"}. Grab and drag to reorder."
                      >
                        <div
                          class="chord-block-shape ${I?"active-pulse":""}"
                          style="width: ${D}px; height: ${D}px; border-radius: ${H}px; background: ${w.color};"
                        >
                          <div class="drag-grip-indicator" title="Drag to reorder">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="4" r="1.4"/><circle cx="12" cy="4" r="1.4"/><circle cx="4" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/></svg>
                          </div>
                          ${this.showTheory&&c.roman?h`
                            <div class="roman-pill-badge">${c.roman}</div>
                          `:""}
                          <div class="chord-title-text" style="font-size: ${Math.round(w.fontSize*.76)}px;">${c.name}</div>

                          <!-- Quick Mobile Action Buttons -->
                          <button class="quick-action-btn swap" @pointerdown=${z=>z.stopPropagation()} @click=${z=>{z.stopPropagation(),this.onChordSelect(m)}} aria-label="Swap chord">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                          </button>
                        </div>
                        <div class="chord-role-label">${Fe[c.functionLabel]||""}</div>
                      </div>
                    `})}
                </div>
              </div>

              <!-- Quick Instrument & Play Style Chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="pill ${this.activeSoundDrawer==="instrument"?"active":""}" @click=${()=>{this.activeSoundDrawer=this.activeSoundDrawer==="instrument"?null:"instrument"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument||"Piano"}
                </button>
                <button class="pill ${this.activeSoundDrawer==="playstyle"?"active":""}" @click=${()=>{this.activeSoundDrawer=this.activeSoundDrawer==="playstyle"?null:"playstyle"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"}
                </button>
              </div>

              ${this.activeSoundDrawer?h`
                <div class="sound-drawer">
                  ${this.activeSoundDrawer==="instrument"?h`
                    <div class="kicker-label">Instrument</div>
                    <div class="sound-options-flex">
                      ${pe.map(c=>h`
                        <button
                          class="pill ${(this.instrument||"Piano")===c.name?"active":""}"
                          @click=${()=>{this.instrument=c.name,T.setInstrument(c.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:c.name,bubbles:!0,composed:!0})),this.activeSoundDrawer=null,this.requestUpdate()}}
                        >
                          <span class="control-dot" style="background:${c.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${c.name}
                        </button>
                      `)}
                    </div>
                  `:h`
                    <div class="kicker-label">Play Style</div>
                    <div class="sound-options-flex">
                      ${ue.map(c=>h`
                        <button
                          class="pill ${(this.playStyle||"Block chords")===c.name?"active":""}"
                          @click=${()=>{this.playStyle=c.name,T.setPlayStyle(c.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:c.name,bubbles:!0,composed:!0})),this.activeSoundDrawer=null,this.requestUpdate()}}
                        >
                          <span class="control-dot" style="background:${c.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${c.name}
                        </button>
                      `)}
                    </div>
                  `}
                </div>
              `:""}

              <!-- Music Theory & Harmonic Arc -->
              <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(46,39,31,0.09); cursor: pointer;" @click=${()=>{this.showTheory=!this.showTheory}}>
                <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showTheory?e:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showTheory?"translateX(16px)":"translateX(0)"}; transition: transform 150ms ease;"></div>
                </div>
                <span style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory & tension arc</span>
              </div>

              ${this.showTheory?h`
                <div style="margin-top: 14px; background: var(--cv-surface); border-radius: 18px; padding: 14px;">
                  <div class="arc-bars-box" style="height: 100px;">
                    ${t.map((c,m)=>{const w=W(c.tension||.1),I=Math.round(16+(c.tension||.1)*50);return h`
                        <div class="arc-bar-col" @click=${()=>this.onChordPreview(m)}>
                          <div class="arc-bar-pillar" style="height: ${I}px; background: ${w.color};"></div>
                          <div style="font-size: 10px; font-weight: 800; color: var(--cv-ink); margin-top: 4px;">${c.name}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 10px;">${y}</div>
                </div>
              `:""}
            `:this.activeView==="song"?h`
              <div class="song-track-list">
                ${this.sections.map((c,m)=>h`
                  <div
                    class="song-card ${this.activeSectionIdx===m?"active-sec":""}"
                    @click=${()=>{this.activeSectionIdx=m,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:m,bubbles:!0,composed:!0})),this.requestUpdate()}}
                  >
                    <div style="flex: 1;">
                      <div style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${c.name}</div>
                      <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${c.desc}</div>
                      <div class="section-chips" style="display: flex; gap: 5px; align-items: center; flex-wrap: wrap; margin-top: 8px;">
                        ${c.order.map(w=>{const I=c.progression.chords[w];if(!I)return"";const D=W(I.tension||.1);return h`<div class="section-chip" style="width: 10px; height: 10px; background:${D.color}; border-radius:${Math.round(D.radius*.35)}px;" title="${I.name}"></div>`})}
                      </div>
                    </div>
                  </div>
                `)}
                <div class="add-sec-card" @click=${()=>{if(this.progression){const c=oe.addSection(this.sections,this.progression);this.sections=c.sections,this.activeSectionIdx=c.activeIndex,this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0})),this.requestUpdate()}}}>
                  + Add a related section
                </div>
              </div>
            `:h`
              <div style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(c=>h`
                      <button
                        class="pill ${this.playInstrument===c?"active":""}"
                        style="background: ${this.playInstrument===c?e:"var(--cv-cream)"}; color: ${this.playInstrument===c?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=c}}
                      >${c}</button>
                    `)}
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-top: 15px; padding-top: 14px; border-top: 1px solid rgba(46,39,31,0.09);" @click=${()=>{this.showDegrees=!this.showDegrees}}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees?e:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                      <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees?"translateX(16px)":"translateX(0)"}; transition: transform 150ms ease;"></div>
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                  </div>
                  <div style="font-size: 12px; line-height: 1.6; color: #8A7C6B; margin-top: 11px;">
                    ${this.playInstrument==="Piano"?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted."}
                  </div>
                </div>

                ${this.playInstrument==="Piano"?h`
                  <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 18px;">
                    ${t.map((c,m)=>this.renderPianoCard(c,m))}
                  </div>
                `:h`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 18px;">
                    ${t.map((c,m)=>this.renderFretCard(c,m,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>

          <!-- Bottom Mobile Transport Bar -->
          <div class="transport-footer" style="padding: 10px 16px;">
            <button
              class="play-circle-btn"
              style="background: ${e}; width: 42px; height: 42px;"
              @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}
              aria-label="${this.playing?"Pause":"Play"}"
            >
              ${this.playing?h`
                <svg width="14" height="16" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
              `:h`
                <svg width="15" height="17" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
              `}
            </button>

            <div class="progress-line-track">
              <div
                class="progress-line-fill ${this.snapProgress?"snap":""}"
                style="width: 100%; transform: scaleX(${this.playing&&t.length?(this.progressStep+1)/t.length:0}); background: ${e}; --progress-duration: ${je}ms;"
              ></div>
            </div>

            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onBookmark} aria-label="Keep this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
            </button>
            <button class="round-btn mobile-loops-toggle-btn ${this.libraryOpen?"active":""}" style="width: 42px; height: 42px; flex-shrink: 0; ${this.libraryOpen?`--mood-color: ${e};`:""}" @click=${()=>this.toggleLibrary()} aria-label="Your saved loops">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${()=>{this.shareOpen=!0}} aria-label="Share this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
            </button>

            ${this.libraryOpen?h`
              <div class="sheet-scrim" style="z-index: 100; background: rgba(46, 39, 31, 0.2);" @click=${()=>this.toggleLibrary(!1)}></div>
              <div class="library-popover-mobile">
                ${this.renderLibraryPopoverContent(e)}
              </div>
            `:""}
          </div>

          <!-- Mobile Slide-Up Substitution Sheet -->
          ${this.mobileSheetOpen&&this.swapIndex!==null?h`
            <div class="sheet-scrim" @click=${()=>{this.mobileSheetOpen=!1}}></div>
            <div class="mobile-sheet">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Bar ${this.swapIndex+1} (${$?.name})</div>
                <button class="round-btn" style="width: 32px; height: 32px;" @click=${()=>{this.mobileSheetOpen=!1}}>×</button>
              </div>

              <div class="ab-box" style="margin-top: 0; margin-bottom: 14px;">
                <div class="ab-compare-row">
                  <button
                    class="ab-card-half ${this.abSide==="before"?"active-now":""}"
                    style="background: ${this.abSide==="before"?"#5E5142":"#F1E4D2"}; color: ${this.abSide==="before"?"#FBF3E6":"#2E271F"};"
                    @click=${()=>this.setABSide("before")}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${$?.name||""}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                    style="background: ${this.abPick?this.abSide==="after"?e:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
                    @click=${()=>this.setABSide("after")}
                    ?disabled=${!this.abPick}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick?"#2E271F":"rgba(46,39,31,0.45)"};">
                      ${this.abPick?.chord||"Pick one below"}
                    </div>
                  </button>
                </div>

                <!-- Loop Progression Player Strip -->
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying?e:"#E8D9C2"};"
                    @click=${this.toggleAB}
                    aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                  >
                    ${this.abPlaying?h`
                      <svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                    `:h`
                      <svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                    `}
                  </button>
                  <div class="ab-cells-track">
                    ${t.map((c,m)=>{const w=m===this.swapIndex,I=w&&this.abSide==="after"&&this.abPick?this.abPick.chord:c.name,D=this.abPlaying&&this.progressStep===m;return h`
                        <button
                          class="ab-cell-item ${D?"active-step":""}"
                          style="background: ${w&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${w?1:.65};"
                          @click=${()=>this.onAbCellClick(m)}
                          aria-label="Preview ${I} in bar ${m+1}"
                        >
                          ${I}
                        </button>
                      `})}
                  </div>
                </div>
              </div>

              <!-- Custom Geometric Substitution Family Tabs -->
              <div class="swap-tab-nav">
                ${zt.map(c=>{const m=this.activeSwapFamily===c.key,w=W(c.tension),I=Math.round(w.size*.34),D=Math.round(w.radius*(I/w.size));return h`
                    <button
                      class="swap-family-tab ${m?"active":""}"
                      @click=${()=>{this.activeSwapFamily=c.key,this.requestUpdate()}}
                    >
                      ${c.twoTone?h`
                        <span class="two-tone-swatch" style="box-shadow: ${m?`0 0 0 3px ${e}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:h`
                        <span
                          class="family-shape"
                          style="width: ${I}px; height: ${I}px; border-radius: ${D}px; background: ${w.color}; box-shadow: ${m?`0 0 0 3px ${e}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${m?"active":""}">${c.label}</span>
                    </button>
                  `})}
              </div>

              ${i?h`
                <div class="band-note-banner" style="background: ${i.color}22;">
                  <span>Sorted for ${i.name} — their moves first</span>
                </div>
              `:""}

              ${v?h`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                  ${v}
                </div>
              `:""}

              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${f.length?f.map(c=>{const m=this.abPick?.chord===c.name,w=W(c.tension),I=Math.max(28,Math.min(38,Math.round(w.size*.32))),D=Math.round(w.radius*(I/w.size)),H=!!i&&i.hoist.includes(c.name);return h`
                    <div
                      class="alt-item-row ${m?"selected":""}"
                      @click=${()=>this.onAltAudition({name:c.name,chord:c.chord,sub:c.sub,functionCaption:c.sub})}
                    >
                      <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div
                          style="width: ${I}px; height: ${I}px; border-radius: ${D}px; background: ${w.color}; box-shadow: ${m?`0 0 0 2px ${e}`:"none"};"
                        ></div>
                      </div>

                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink);">${c.name}</span>
                          ${this.showTheory&&c.roman?h`
                            <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${c.roman}</span>
                          `:""}
                          ${H?h`
                            <span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>
                          `:""}
                        </div>
                        <div style="font-size: 11px; color: var(--cv-ink-muted); margin-top: 2px;">${c.sub}</div>
                        ${this.showTheory&&c.notes&&c.notes.length?h`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${c.notes.join(" · ")}
                          </div>
                        `:""}
                      </div>

                      <button
                        class="alt-play-btn"
                        style="background: ${m&&this.abSide==="after"?e:"#DCEAF9"}; width: 30px; height: 30px;"
                        aria-label="Audition ${c.name}"
                      >
                        ${m&&this.abSide==="after"?"❚❚":"▶"}
                      </button>
                    </div>
                  `}):h`
                  <div style="padding: 12px; font-size: 12.5px; color: var(--cv-ink-muted);">Loading substitutions...</div>
                `}
              </div>

              ${this.abPick?h`
                <button class="accept-swap-btn" style="background: ${e}; margin-top: 14px;" @click=${this.onConfirmSwap}>
                  Keep ${this.abPick.chord}
                </button>
              `:""}
            </div>
          `:""}
        </div>
      `:h`
        <!-- DESKTOP 3-COLUMN STUDIO LAYOUT -->
        <div class="studio-grid" style="--mood-color: ${e};">

          <!-- 1. LEFT SIDEBAR -->
          <aside class="sidebar-left">
            <div class="sidebar-scroll">
              <div class="kicker-label">The Vibe</div>
              <form class="vibe-input-row ${this.isGenerating?"generating":""}" @submit=${this.onVibeSubmit}>
                <input
                  type="text"
                  class="vibe-text-input"
                  .value=${this.freeText}
                  @input=${c=>{this.freeText=c.target.value}}
                  placeholder=${this.isGenerating?"Composing your chords...":this.vibeExamples[this.vibePlaceholderIdx]}
                  ?disabled=${this.isGenerating}
                />
                <button
                  type="submit"
                  class="vibe-submit-btn ${this.isGenerating?"generating":""}"
                  style="background: ${e};"
                  aria-label="${this.isGenerating?"Composing chords":"Generate loop from vibe"}"
                  ?disabled=${this.isGenerating||!this.freeText.trim()}
                >
                  ${this.isGenerating?h`
                    <div class="vibe-spinner"></div>
                  `:h`
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  `}
                </button>
              </form>
              ${this.isGenerating?h`
                <div class="vibe-generating-pill">
                  <span class="vibe-spinner"></span>
                  <span>Composing chords...</span>
                </div>
              `:""}

              <div class="kicker-label spaced">Genre</div>
              <div class="pills-group">
                ${o.map(c=>h`
                  <button
                    class="pill ${this.progression?.genre===c?"active":""}"
                    @click=${()=>this.onGenreClick(c)}
                  >${c}</button>
                `)}
                <button class="pill more-toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                  ${this.expandedGenre?"Show less ⌃":"+more ⌄"}
                </button>
              </div>

              <div class="kicker-label spaced">Mood</div>
              <div class="pills-group">
                ${d.map(c=>{const m=he(c),w=this.progression?.mood===c;return h`
                    <button
                      class="pill mood-pill ${w?"active":""}"
                      style="${w?`background: ${m}; color: #2E271F;`:""}"
                      @click=${()=>this.onMoodClick(c)}
                    >
                      <span class="mood-badge" style="background: ${w?"rgba(46, 39, 31, 0.12)":m+"33"};">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${w?"#2E271F":m}" stroke-width="2.2" stroke-linecap="round">
                          <path d="${Bo[c]||"M12 4 a6.5 6.5 0 1 0 6.5 6.5"}"/>
                        </svg>
                      </span>
                      ${c}
                    </button>
                  `})}
                ${n.length?h`
                  <button class="pill more-toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                    ${this.expandedMood?"Show less ⌃":`+${n.length} more ⌄`}
                  </button>
                `:""}
              </div>

              <div class="kicker-label spaced" style="display: flex; align-items: baseline; gap: 6px;">
                <span>Band</span>
                <span style="font-size: 10px; font-weight: 700; color: rgba(46, 39, 31, 0.4); text-transform: lowercase;">optional</span>
              </div>
              <div class="pills-group">
                ${Pe.map(c=>h`
                  <button
                    class="pill ${this.selectedBand===c.name?"active":""}"
                    style="font-family: ${c.font}; font-weight: ${c.weight||800}; font-style: ${c.italic?"italic":"normal"}; letter-spacing: ${c.pillTrack};"
                    @click=${()=>this.onBandClick(c.name)}
                  >${c.name}</button>
                `)}
              </div>
              ${i?h`
                <div class="band-trick-text">
                  ${this.showTheory?i.theory:i.plain}
                </div>
              `:""}
            </div>

            <div class="sidebar-footer">
              <button class="library-toggle ${this.libraryOpen?"open":""}" @click=${()=>this.toggleLibrary()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                <span style="flex: 1; min-width: 0; text-align: left;">${this.savedSets.length?`Your loops · ${this.savedSets.length}`:"Your loops"}</span>
                <span style="opacity: 0.55;">${this.libraryOpen?"⌄":"⌃"}</span>
              </button>
              ${this.libraryOpen?h`
                <div class="library-popover">
                  ${this.renderLibraryPopoverContent(e)}
                </div>
              `:""}
            </div>
          </aside>

          <!-- 2. CENTER STAGE -->
          <main class="stage-main">
            <div class="stage-header">
              <div class="stage-title-row">
                <div class="stage-title">${this.renderStageTitle(e)}</div>
                <div class="stage-action-btns">
                  <button class="round-btn" @click=${this.onBookmark} aria-label="Bookmark loop">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                  </button>
                  <button class="round-btn" @click=${()=>{this.shareOpen=!0}} aria-label="Share loop">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
                  </button>
                </div>
              </div>

              <!-- VIEW TABS: Chords | Song | Play it -->
              <div class="view-tabs-bar">
                <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
                <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
                <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
              </div>
            </div>

            <!-- Canvas -->
            <div class="stage-canvas">
              ${this.activeView==="loop"?h`
                <div class="stage-panel">
                  <svg class="drift-shape a" width="128" height="128" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="112" height="112" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  <div class="chords-flex-row">
                    ${t.map((c,m)=>{const w=W(c.tension||.1),I=this.playing&&m===this.progressStep,D=this.isInspectorOpen&&m===this.swapIndex,H=m===this.previewIndex,z=Math.max(84,Math.min(130,w.size)),Ie=Math.round(w.radius*(z/w.size));return h`
                        <div
                          class="chord-item-wrap ${this.dragState?.dragIndex===m?"is-dragging":""}"
                          style="${this.getChordDragStyle(m)}"
                          @pointerdown=${A=>this.onChordPointerDown(m,A,()=>this.onChordSelect(m))}
                          @keydown=${A=>this.onChordKeyDown(m,A)}
                          tabindex="0"
                          role="button"
                          aria-label="${c.name}, ${c.functionLabel||"Chord"}. Grab and drag to reorder."
                        >
                          <div
                            class="chord-block-shape ${I?"active-pulse":""} ${D?"selected-inspector":""}"
                            style="width: ${z}px; height: ${z}px; border-radius: ${Ie}px; background: ${w.color}; transform: ${H?"scale(0.94)":"none"};"
                          >
                            <div class="drag-grip-indicator" title="Drag to reorder">
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="4" r="1.4"/><circle cx="12" cy="4" r="1.4"/><circle cx="4" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/></svg>
                            </div>
                            ${this.showTheory&&c.roman?h`
                              <div class="roman-pill-badge">${c.roman}</div>
                            `:""}
                            <div class="chord-title-text" style="font-size: ${Math.round(w.fontSize*.92)}px;">${c.name}</div>
                          </div>
                          <div class="chord-role-label">${Fe[c.functionLabel]||c.functionLabel||""}</div>
                        </div>
                      `})}
                  </div>
                </div>

                <!-- Quick Instrument & Play Style Chips (Desktop) -->
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 16px;">
                  <button
                    class="pill ${this.activeSoundDrawer==="instrument"?"active":""}"
                    style="${this.activeSoundDrawer==="instrument"?`background: ${e}; color: #2E271F; font-weight: 800;`:""}"
                    @click=${()=>{this.activeSoundDrawer=this.activeSoundDrawer==="instrument"?null:"instrument"}}
                    aria-label="Change instrument"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${this.activeSoundDrawer==="instrument"?"#2E271F":"#5B5145"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                    ${this.instrument||"Piano"} <span style="opacity: 0.6;">${this.activeSoundDrawer==="instrument"?"⌃":"⌄"}</span>
                  </button>
                  <button
                    class="pill ${this.activeSoundDrawer==="playstyle"?"active":""}"
                    style="${this.activeSoundDrawer==="playstyle"?`background: ${e}; color: #2E271F; font-weight: 800;`:""}"
                    @click=${()=>{this.activeSoundDrawer=this.activeSoundDrawer==="playstyle"?null:"playstyle"}}
                    aria-label="Change playing style"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${this.activeSoundDrawer==="playstyle"?"#2E271F":"#5B5145"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                    ${this.playStyle||"Block chords"} <span style="opacity: 0.6;">${this.activeSoundDrawer==="playstyle"?"⌃":"⌄"}</span>
                  </button>
                </div>

                ${this.activeSoundDrawer?h`
                  <div class="sound-drawer" style="margin-top: 12px; padding: 14px 18px; background: var(--cv-surface); border-radius: 18px;">
                    ${this.activeSoundDrawer==="instrument"?h`
                      <div class="kicker-label" style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin-bottom: 8px;">Instrument</div>
                      <div class="sound-options-flex">
                        ${pe.map(c=>h`
                          <button
                            class="pill ${(this.instrument||"Piano")===c.name?"active":""}"
                            style="${(this.instrument||"Piano")===c.name?`background: ${e}; color: #2E271F; font-weight: 800;`:"background: var(--cv-surface-2); color: #5B5145; font-weight: 700;"}"
                            @click=${()=>{this.instrument=c.name,T.setInstrument(c.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:c.name,bubbles:!0,composed:!0})),this.activeSoundDrawer=null,this.requestUpdate()}}
                          >
                            <span class="control-dot" style="background:${c.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; flex-shrink: 0;"></span>${c.name}
                          </button>
                        `)}
                      </div>
                    `:h`
                      <div class="kicker-label" style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin-bottom: 8px;">Play Style</div>
                      <div class="sound-options-flex">
                        ${ue.map(c=>h`
                          <button
                            class="pill ${(this.playStyle||"Block chords")===c.name?"active":""}"
                            style="${(this.playStyle||"Block chords")===c.name?`background: ${e}; color: #2E271F; font-weight: 800;`:"background: var(--cv-surface-2); color: #5B5145; font-weight: 700;"}"
                            @click=${()=>{this.playStyle=c.name,T.setPlayStyle(c.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:c.name,bubbles:!0,composed:!0})),this.activeSoundDrawer=null,this.requestUpdate()}}
                          >
                            <span class="control-dot" style="background:${c.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; flex-shrink: 0;"></span>${c.name}
                          </button>
                        `)}
                      </div>
                    `}
                  </div>
                `:""}
              `:this.activeView==="song"?h`
                <div class="song-track-list">
                  <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 8px;">
                    Each section reuses the loop, related but never identical. Press play in the transport bar to hear the whole thing.
                  </div>
                  ${this.sections.map((c,m)=>h`
                    <div
                      class="song-card ${this.activeSectionIdx===m?"active-sec":""}"
                      @click=${()=>{this.activeSectionIdx=m,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:m,bubbles:!0,composed:!0})),this.requestUpdate()}}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                        Section ${m+1}
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${c.name}</div>
                        <div style="font-size: 12px; color: var(--cv-ink-muted); margin-top: 2px;">${c.desc}</div>
                      </div>
                      <div style="display: flex; gap: 4px;">
                        ${c.order.map(w=>{const I=c.progression.chords[w];if(!I)return"";const D=W(I.tension||.1);return h`<span style="width: 14px; height: 14px; border-radius: 4px; background: ${D.color};" title="${I.name}"></span>`})}
                      </div>
                    </div>
                  `)}
                  <div
                    class="add-sec-card"
                    @click=${()=>{if(this.progression){const c=oe.addSection(this.sections,this.progression);this.sections=c.sections,this.activeSectionIdx=c.activeIndex,this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0})),this.requestUpdate()}}}
                  >
                    <span style="font-size: 20px; line-height: 1;">+</span>
                    <span>Add a related section</span>
                  </div>
                </div>
              `:h`
                <div class="play-it-wrap">
                  <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click=${()=>{this.showDegrees=!this.showDegrees}}>
                      <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees?e:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                        <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees?"translateX(16px)":"translateX(0)"}; transition: transform 150ms ease;"></div>
                      </div>
                      <div style="font-size: 13.5px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: baseline; gap: 14px; margin-top: 10px; flex-wrap: wrap;">
                    <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: var(--cv-label); text-transform: uppercase;">Piano</div>
                    <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">One voicing per chord, root position — the red dot is the root, play left to right.</div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 4px;">
                    ${t.map((c,m)=>this.renderPianoCard(c,m))}
                  </div>

                  <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
                    <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                      ${["Guitar","Ukulele"].map(c=>h`
                        <button
                          style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===c?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===c?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                          @click=${()=>{this.playInstrument=c}}
                        >${c}</button>
                      `)}
                    </div>
                    <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 4px;">
                    ${t.map((c,m)=>this.renderFretCard(c,m,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                </div>
              `}
            </div>

            <!-- Transport Bar -->
            <div class="transport-footer">
              <button
                class="play-circle-btn"
                style="background: ${e};"
                @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}
                aria-label="${this.playing?"Pause":"Play"}"
              >
                ${this.playing?h`
                  <svg width="15" height="17" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                `:h`
                  <svg width="17" height="19" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                `}
              </button>

              <div class="progress-line-track">
                <div
                  class="progress-line-fill ${this.snapProgress?"snap":""}"
                  style="width: 100%; transform: scaleX(${this.playing&&t.length?(this.progressStep+1)/t.length:0}); background: ${e}; --progress-duration: ${je}ms;"
                ></div>
              </div>

              <div class="stepper-wrap">
                <button class="stepper-btn" @click=${()=>this.onStepLength(-1)} aria-label="Fewer chords">−</button>
                <div class="stepper-text">${t.length} chords</div>
                <button class="stepper-btn" @click=${()=>this.onStepLength(1)} aria-label="More chords">+</button>
              </div>

              <button class="dice-reroll-btn" @click=${this.onReroll}>
                <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
                Try another
              </button>
            </div>
          </main>

          <!-- 3. RIGHT SIDEBAR -->
          <aside class="sidebar-right">
            <div class="right-header">
              ${this.isInspectorOpen?h`
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                  <div>
                    <div class="kicker-label">Swapping Bar ${(this.swapIndex||0)+1}</div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span style="font-size: 22px; font-weight: 800; color: var(--cv-ink);">${$?.name||""}</span>
                      ${this.showTheory&&$?.roman?h`
                        <span style="font-size: 12px; font-weight: 800; color: var(--cv-label);">${$.roman}</span>
                      `:""}
                    </div>
                  </div>
                  <button
                    class="round-btn"
                    style="width: 36px; height: 36px; font-size: 18px;"
                    @click=${()=>{this.isInspectorOpen=!1,this.swapIndex=null,this.abPick=null,this.requestUpdate()}}
                    aria-label="Close chord inspector"
                  >×</button>
                </div>

                <div class="ab-box">
                  <div class="ab-compare-row">
                    <button
                      class="ab-card-half ${this.abSide==="before"?"active-now":""}"
                      style="background: ${this.abSide==="before"?"#5E5142":"#F1E4D2"}; color: ${this.abSide==="before"?"#FBF3E6":"#2E271F"};"
                      @click=${()=>this.setABSide("before")}
                    >
                      <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                      <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${$?.name||""}</div>
                    </button>
                    <button
                      class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                      style="background: ${this.abPick?this.abSide==="after"?e:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
                      @click=${()=>this.setABSide("after")}
                      ?disabled=${!this.abPick}
                    >
                      <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                      <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick?"#2E271F":"rgba(46,39,31,0.45)"};">
                        ${this.abPick?.chord||"Pick one below"}
                      </div>
                    </button>
                  </div>

                  <!-- Loop Progression Player Strip -->
                  <div class="ab-loop-player-row">
                    <button
                      class="ab-play-toggle-btn"
                      style="background: ${this.abPlaying?e:"#E8D9C2"};"
                      @click=${this.toggleAB}
                      aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                    >
                      ${this.abPlaying?h`
                        <svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                      `:h`
                        <svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                      `}
                    </button>
                    <div class="ab-cells-track">
                      ${t.map((c,m)=>{const w=m===this.swapIndex,I=w&&this.abSide==="after"&&this.abPick?this.abPick.chord:c.name,D=this.abPlaying&&this.progressStep===m;return h`
                          <button
                            class="ab-cell-item ${D?"active-step":""}"
                            style="background: ${w&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${w?1:.65};"
                            @click=${()=>this.onAbCellClick(m)}
                            aria-label="Preview ${I} in bar ${m+1}"
                          >
                            ${I}
                          </button>
                        `})}
                    </div>
                  </div>
                </div>

                <button
                  class="accept-swap-btn"
                  style="background: ${this.abPick?e:"#EDE0CC"}; color: ${this.abPick?"#2E271F":"rgba(46,39,31,0.4)"}; cursor: ${this.abPick?"pointer":"default"};"
                  @click=${this.onConfirmSwap}
                  ?disabled=${!this.abPick}
                >
                  ${this.abPick?`Keep ${this.abPick.chord}`:"Pick a swap to compare"}
                </button>
              `:h`
                <div class="kicker-label">Harmonic Arc</div>
                <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.015em; margin-top: 4px;">
                  ${b}
                </div>
              `}
            </div>

            <div class="right-scroll">
              ${this.isInspectorOpen?h`
                <!-- Custom Geometric Substitution Family Tabs -->
                <div class="swap-tab-nav">
                  ${zt.map(c=>{const m=this.activeSwapFamily===c.key,w=W(c.tension),I=Math.round(w.size*.34),D=Math.round(w.radius*(I/w.size));return h`
                      <button
                        class="swap-family-tab ${m?"active":""}"
                        @click=${()=>{this.activeSwapFamily=c.key,this.requestUpdate()}}
                      >
                        ${c.twoTone?h`
                          <span class="two-tone-swatch" style="box-shadow: ${m?`0 0 0 3px ${e}`:"none"};">
                            <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                            <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                          </span>
                        `:h`
                          <span
                            class="family-shape"
                            style="width: ${I}px; height: ${I}px; border-radius: ${D}px; background: ${w.color}; box-shadow: ${m?`0 0 0 3px ${e}`:"none"};"
                          ></span>
                        `}
                        <span class="family-label ${m?"active":""}">${c.label}</span>
                      </button>
                    `})}
                </div>

                ${i?h`
                  <div class="band-note-banner" style="background: ${i.color}22;">
                    <span>Sorted for ${i.name} — their moves first</span>
                  </div>
                `:""}

                ${v?h`
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                    ${v}
                  </div>
                `:""}

                <div>
                  ${f.length?f.map(c=>{const m=this.abPick?.chord===c.name,w=W(c.tension),I=Math.max(28,Math.min(38,Math.round(w.size*.32))),D=Math.round(w.radius*(I/w.size)),H=!!i&&i.hoist.includes(c.name);return h`
                      <div
                        class="alt-item-row ${m?"selected":""}"
                        @click=${()=>this.onAltAudition({name:c.name,chord:c.chord,sub:c.sub,functionCaption:c.sub})}
                      >
                        <div style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <div
                            style="width: ${I}px; height: ${I}px; border-radius: ${D}px; background: ${w.color}; box-shadow: ${m?`0 0 0 2px ${e}`:"none"};"
                          ></div>
                        </div>

                        <div style="flex: 1; min-width: 0;">
                          <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${c.name}</span>
                            ${this.showTheory&&c.roman?h`
                              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${c.roman}</span>
                            `:""}
                            ${H?h`
                              <span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>
                            `:""}
                          </div>
                          <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${c.sub}</div>
                          ${this.showTheory&&c.notes&&c.notes.length?h`
                            <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 3px;">
                              ${c.notes.join(" · ")}
                            </div>
                          `:""}
                        </div>

                        <button
                          class="alt-play-btn"
                          style="background: ${m&&this.abSide==="after"?e:"#DCEAF9"};"
                          aria-label="Audition ${c.name}"
                        >
                          ${m&&this.abSide==="after"?"❚❚":"▶"}
                        </button>
                      </div>
                    `}):h`
                    <div style="padding: 14px 8px; font-size: 12.5px; color: var(--cv-ink-muted);">Loading substitutions...</div>
                  `}
                </div>
              `:h`
                <div class="arc-bars-box">
                  ${t.map((c,m)=>{const w=W(c.tension||.1),I=Math.round(20+(c.tension||.1)*75);return h`
                      <button class="arc-bar-col" @click=${()=>this.onChordSelect(m)}>
                        <div class="arc-bar-pillar" style="height: ${I}px; background: ${w.color};"></div>
                        <div style="font-size: 11px; font-weight: 800; color: var(--cv-ink); margin-top: 6px;">${c.name}</div>
                        <div style="font-size: 9.5px; font-weight: 700; color: rgba(46, 39, 31, 0.45);">${Fe[c.functionLabel]||""}</div>
                      </button>
                    `})}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved harmonic tension.</div>
                <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px;">${y}</div>
                <div style="display: flex; align-items: flex-start; gap: 9px; margin-top: 16px; background: var(--cv-cream); border-radius: 14px; padding: 11px 13px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${e}" stroke-width="2.4" stroke-linecap="round" style="flex-shrink: 0; margin-top: 1px;"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                  Tap any chord block to swap it or explore substitutions.
                </div>
              `}
            </div>
          </aside>

        </div>
      `}

      <!-- Share Modal -->
      <share-modal
        .open=${this.shareOpen}
        .progression=${this.progression}
        .order=${this.order}
        .instrument=${this.instrument||this.playInstrument}
        .playStyle=${this.playStyle}
        @close=${()=>{this.shareOpen=!1}}
      ></share-modal>

      <!-- Upgraded Loops Drawer (Desktop slide-over & Mobile bottom sheet) -->
      ${this.renderLoopsDrawer(e)}
    `}};C.styles=Q`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }

    * {
      box-sizing: border-box;
      scrollbar-width: none;
    }
    *::-webkit-scrollbar {
      display: none;
    }

    /* Top Band DNA Banner */
    .band-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 24px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }
    .band-bar-content {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    .band-bar-kicker {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.55);
    }
    .band-bar-name {
      font-size: 14px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .band-bar-trick {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted);
    }
    .band-bar-close {
      border: none;
      background: rgba(251, 243, 230, 0.7);
      width: 26px;
      height: 26px;
      border-radius: 50%;
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink);
      transition: background 150ms ease;
    }
    .band-bar-close:hover {
      background: var(--cv-cream);
    }

    /* Desktop 3-Column Grid */
    .studio-grid {
      flex: 1;
      min-height: 0;
      width: 100%;
      display: grid;
      grid-template-columns: clamp(238px, 19vw, 296px) minmax(0, 1fr) clamp(304px, 26vw, 384px);
    }

    /* Left Sidebar */
    .sidebar-left {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      border-right: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      min-height: 0;
      min-width: 0;
    }
    .sidebar-scroll {
      overflow-y: auto;
      padding: 20px 18px 24px;
    }
    .kicker-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      margin-bottom: 9px;
    }
    .kicker-label.spaced {
      margin-top: 22px;
    }

    .vibe-input-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-cream);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 9px;
      transition: border-color 180ms ease, box-shadow 180ms ease;
    }
    .vibe-input-row.generating {
      border-color: rgba(46, 39, 31, 0.35);
      background: rgba(251, 243, 230, 0.75);
      animation: cvfv-vibe-pulse 1.2s ease-in-out infinite alternate;
    }
    @keyframes cvfv-vibe-pulse {
      0% { box-shadow: 0 0 0 0 rgba(46, 39, 31, 0); }
      100% { box-shadow: 0 0 0 3px rgba(46, 39, 31, 0.1); }
    }
    .vibe-text-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 8px 0;
    }
    .vibe-text-input:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .vibe-submit-btn {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform 120ms ease, opacity 150ms ease;
    }
    .vibe-submit-btn:disabled {
      opacity: 0.75;
      cursor: not-allowed;
    }
    .vibe-submit-btn:active {
      transform: scale(0.94);
    }
    .vibe-generating-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      margin-top: 7px;
      padding: 4px 10px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      animation: cv-toast-in 200ms ease;
    }
    .vibe-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(46, 39, 31, 0.25);
      border-top-color: var(--cv-ink, #2E271F);
      border-radius: 50%;
      animation: cv-spin 0.7s linear infinite;
    }
    @keyframes cv-spin {
      to { transform: rotate(360deg); }
    }

    .pills-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 9px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 12.5px;
      font-weight: 700;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #5B5145);
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease, color 150ms ease;
    }
    .pill:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .pill:active {
      transform: scale(0.96);
    }
    .pill.active {
      background: var(--mood-color, #F6D98B);
      color: var(--cv-ink, #2E271F);
    }
    .pill.more-toggle {
      border: 1.5px dashed rgba(46, 39, 31, 0.3);
      background: transparent;
      color: var(--cv-label);
    }
    .pill.mood-pill {
      padding: 6px 12px 6px 6px;
      gap: 6px;
      font-size: 12.5px;
    }
    .mood-badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 150ms ease;
    }

    .band-trick-text {
      font-size: 12px;
      line-height: 1.5;
      color: var(--cv-ink-muted);
      margin-top: 10px;
      padding: 10px 12px;
      background: var(--cv-surface);
      border-radius: 12px;
      border-left: 3px solid var(--cv-plum);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    .sidebar-footer {
      position: relative;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      height: 68px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      background: var(--cv-cream);
    }
    .library-toggle {
      width: 100%;
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink);
      min-height: 44px;
      padding: 0 12px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .library-toggle.open {
      background: var(--cv-surface);
    }
    .library-toggle:hover {
      background: var(--cv-surface);
    }

    /* Library Popover Panel (Desktop) */
    .library-popover {
      position: absolute;
      left: 8px;
      width: 300px;
      bottom: calc(100% + 6px);
      z-index: 30;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px 10px 12px;
      box-shadow: 0 22px 44px -20px rgba(46, 39, 31, 0.5);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    /* Library Popover Panel (Mobile) */
    .library-popover-mobile {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 82px;
      z-index: 101;
      max-height: calc(100vh - 190px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 18px;
      padding: 12px 12px 14px;
      box-shadow: 0 22px 44px -18px rgba(46, 39, 31, 0.55);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    /* Library Popover Header */
    .lib-pop-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 6px 8px;
    }
    .lib-pop-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      flex: 1;
      min-width: 0;
    }
    .lib-pop-select-btn {
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 11.5px;
      font-weight: 800;
      padding: 6px 11px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }

    /* Library Search */
    .lib-pop-search {
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.1);
      border-radius: 12px;
      outline: none;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
      padding: 9px 12px;
    }
    .lib-pop-search::placeholder {
      color: rgba(46, 39, 31, 0.52);
    }

    /* Library Row Items */
    .lib-rows {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .lib-row {
      width: 100%;
      box-sizing: border-box;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 0 7px 6px;
      border-radius: 14px;
      min-height: 44px;
      transition: background 140ms ease;
      cursor: pointer;
    }
    .lib-row:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .lib-row.active {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .lib-row.checked {
      background: var(--cv-surface, #F6EADB);
    }
    .lib-row-info {
      flex: 1;
      min-width: 0;
    }
    .lib-row-name-line {
      display: flex;
      gap: 7px;
      align-items: center;
      min-width: 0;
    }
    .lib-row-dots {
      display: flex;
      gap: 3px;
      align-items: center;
      flex-shrink: 0;
    }
    .lib-row-name {
      flex: 1;
      min-width: 0;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lib-row-meta {
      display: block;
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.35;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lib-row-actions {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
    }
    .lib-icon-btn {
      border: none;
      font-family: inherit;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 140ms ease;
    }
    .lib-icon-btn:hover {
      background: var(--cv-cream, #FBF3E6);
    }
    .lib-confirm-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .lib-confirm-delete-btn {
      border: none;
      font-family: inherit;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 11.5px;
      font-weight: 800;
      padding: 7px 11px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .lib-rename-input {
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
      border-radius: 11px;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      padding: 9px 11px;
    }
    .lib-check {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }
    .lib-check.checked {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }
    .lib-no-match {
      font-size: 12.5px;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 10px 6px;
    }
    .lib-empty-text {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 8px 6px;
      text-wrap: pretty;
    }
    .lib-batch-delete-btn {
      border: none;
      font-family: inherit;
      width: 100%;
      font-size: 12.5px;
      font-weight: 800;
      min-height: 40px;
      border-radius: 100px;
      cursor: pointer;
      margin-top: 8px;
    }

    .mobile-loops-toggle-btn {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      border: none;
      border-radius: 50%;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .mobile-loops-toggle-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .mobile-loops-toggle-btn:active {
      transform: scale(0.96);
    }
    .mobile-loops-toggle-btn.active {
      background: var(--mood-color, #F6D98B);
    }

    /* Center Main Stage */
    .stage-main {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: var(--cv-cream);
    }
    .stage-header {
      min-width: 0;
      padding: 14px 24px 10px;
    }
    .stage-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .stage-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.015em;
      color: var(--cv-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stage-action-btns {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .round-btn {
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--cv-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .round-btn:hover {
      background: var(--cv-surface-2);
    }
    .round-btn:active {
      transform: scale(0.96);
    }
    .round-btn.active {
      background: var(--mood-color, #F6D98B);
    }

    /* View Switcher Tabs: Chords | Song | Play it */
    .view-tabs-bar {
      display: flex;
      gap: 2px;
      background: var(--cv-surface);
      border-radius: 100px;
      padding: 4px;
      margin-top: 10px;
      width: fit-content;
    }
    .view-tab {
      border: none;
      min-height: 38px;
      padding: 0 18px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      font-family: inherit;
      white-space: nowrap;
      cursor: pointer;
      background: transparent;
      color: var(--cv-ink-muted);
      transition: background 160ms ease, color 160ms ease;
    }
    .view-tab.active {
      background: #2E271F;
      color: #FBF3E6;
    }

    /* Stage Canvas Area */
    .stage-canvas {
      min-width: 0;
      overflow-y: auto;
      padding: 6px 26px 26px;
      display: flex;
      flex-direction: column;
    }
    .stage-panel {
      position: relative;
      min-height: 240px;
      background: var(--cv-surface);
      border-radius: 26px;
      padding: 24px 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
    .drift-shape {
      position: absolute;
      pointer-events: none;
      opacity: 0.45;
    }
    .drift-shape.a {
      left: -64px;
      top: -64px;
      animation: cvfv-bg-drift-a 11s ease-in-out infinite;
    }
    .drift-shape.b {
      right: -58px;
      bottom: -58px;
      animation: cvfv-bg-drift-b 13s ease-in-out infinite;
    }

    /* Geometric Chord Cards Grid */
    .chords-flex-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      width: 100%;
    }
    .chord-item-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: grab;
      transition: transform 160ms var(--cv-ease);
      outline: none;
      position: relative;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .chord-item-wrap:hover {
      transform: translateY(-3px);
    }
    .chord-item-wrap:focus-visible {
      outline: 2px solid var(--cv-plum);
      outline-offset: 4px;
      border-radius: 16px;
    }
    .drag-grip-indicator {
      position: absolute;
      top: 6px;
      right: 6px;
      opacity: 0.35;
      color: #2E271F;
      pointer-events: none;
      transition: opacity 160ms ease, transform 160ms ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chord-item-wrap:hover .drag-grip-indicator,
    .chord-item-wrap:focus-visible .drag-grip-indicator {
      opacity: 0.85;
      transform: scale(1.1);
    }
    .chord-item-wrap.is-dragging .drag-grip-indicator {
      opacity: 1;
      transform: scale(1.2);
    }
    .chord-block-shape {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 200ms ease, transform 160ms var(--cv-ease);
    }
    .chord-block-shape.active-pulse {
      box-shadow: 0 0 0 5px var(--mood-color, #F6D98B), 0 18px 32px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-block-shape.selected-inspector {
      box-shadow: 0 0 0 3.5px var(--cv-plum), 0 16px 28px -12px rgba(46, 39, 31, 0.4);
    }
    .roman-pill-badge {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      background: #2E271F;
      color: #FBF3E6;
      font-size: 10.5px;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 100px;
      white-space: nowrap;
    }
    .chord-title-text {
      font-weight: 800;
      color: #2E271F;
      line-height: 1;
      white-space: nowrap;
    }
    .chord-role-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1px;
      color: rgba(46, 39, 31, 0.55);
      text-align: center;
    }

    /* Sound Settings Drawer */
    .sound-drawer {
      margin-top: 14px;
      padding: 14px 18px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }
    .sound-options-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 9px;
    }

    /* Song View inside Stage */
    .song-track-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 640px;
      width: 100%;
    }
    .song-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--cv-surface);
      border-radius: 18px;
      padding: 18px 20px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .song-card:hover {
      transform: translateY(-1px);
    }
    .song-card.active-sec {
      box-shadow: inset 0 0 0 2px var(--mood-color, #F6D98B);
    }
    .add-sec-card {
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #8A6B3F;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .add-sec-card:hover {
      background: rgba(46, 39, 31, 0.04);
    }

    /* Play It View inside Stage */
    .play-it-wrap {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      max-width: 720px;
    }
    .play-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    @media (max-width: 640px) {
      .play-cards-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .play-card {
      background: var(--cv-surface);
      border-radius: 20px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .play-card:hover {
      transform: translateY(-2px);
    }

    /* Bottom Transport Bar */
    .transport-footer {
      min-width: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream);
      height: 68px;
      padding: 0 22px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .play-circle-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 150ms ease;
    }
    .play-circle-btn:active {
      transform: scale(0.96);
    }
    .progress-line-track {
      flex: 1;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface-2, #F1E4CC);
      overflow: hidden;
      position: relative;
    }
    .progress-line-fill {
      height: 100%;
      transform-origin: left;
      border-radius: 6px;
      transition: transform var(--progress-duration, 1700ms) linear, background 0.4s ease;
      will-change: transform;
    }
    .progress-line-fill.snap {
      transition: none !important;
    }
    .stepper-wrap {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .stepper-btn {
      border: none;
      font-family: inherit;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-surface);
      color: var(--cv-ink);
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2);
    }
    .stepper-text {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted);
      min-width: 58px;
      text-align: center;
    }
    .dice-reroll-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface);
      color: var(--cv-ink);
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease;
    }
    .dice-reroll-btn:hover {
      background: var(--cv-surface-2);
    }

    /* Right Sidebar (Desktop only) */
    .sidebar-right {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface, #F6EADB);
    }
    .right-header {
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }
    .right-scroll {
      min-width: 0;
      overflow-y: auto;
      padding: 16px 22px 22px;
    }

    /* Tension Arc */
    .arc-bars-box {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 148px;
      padding: 0 2px;
    }
    .arc-bar-col {
      flex: 1;
      border: none;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 4px 2px 5px;
      border-radius: 11px;
      cursor: pointer;
      height: 100%;
      transition: background 150ms ease;
    }
    .arc-bar-col:hover {
      background: var(--cv-cream);
    }
    .arc-bar-pillar {
      width: 100%;
      max-width: 34px;
      border-radius: 8px;
      transition: height 280ms var(--cv-ease), background 280ms ease;
    }

    /* A/B Compare Box & Loop Progression Player */
    @keyframes cvfv-abcell {
      0%, 24% {
        box-shadow: inset 0 0 0 2px #2E271F;
      }
      25%, 100% {
        box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }

    .ab-box {
      background: var(--cv-surface, #F6EADB);
      border-radius: 16px;
      padding: 12px 13px;
      margin-top: 12px;
    }
    .ab-compare-row {
      display: flex;
      gap: 7px;
    }
    .ab-card-half {
      flex: 1;
      min-width: 0;
      text-align: left;
      border-radius: 14px;
      padding: 10px 12px;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: all 150ms var(--cv-ease);
    }
    .ab-card-half:disabled {
      cursor: default;
    }
    .ab-loop-player-row {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: 10px;
    }
    .ab-play-toggle-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      color: #2E271F;
      transition: background 150ms var(--cv-ease), transform 120ms ease;
    }
    .ab-play-toggle-btn:active {
      transform: scale(0.94);
    }
    .ab-cells-track {
      display: flex;
      gap: 5px;
      flex: 1;
      min-width: 0;
    }
    .ab-cell-item {
      flex: 1;
      min-width: 0;
      height: 40px;
      border-radius: 11px;
      border: none;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10.5px;
      font-weight: 800;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 4px;
      box-sizing: border-box;
      color: #2E271F;
      cursor: pointer;
      user-select: none;
      transition: background 160ms ease, opacity 160ms ease, transform 100ms ease, box-shadow 160ms ease;
    }
    .ab-cell-item:hover {
      opacity: 1 !important;
      filter: brightness(0.96);
    }
    .ab-cell-item:active {
      transform: scale(0.94);
    }
    .ab-cell-item.active-step {
      box-shadow: inset 0 0 0 2px #2E271F;
    }

    .accept-swap-btn {
      border: none;
      cursor: pointer;
      width: 100%;
      padding: 13px 16px;
      font-size: 14px;
      font-weight: 800;
      border-radius: 100px;
      margin-top: 10px;
      transition: opacity 150ms ease, transform 100ms ease;
    }
    .accept-swap-btn:hover {
      opacity: 0.92;
    }
    .accept-swap-btn:active {
      transform: scale(0.98);
    }

    .swap-tab-nav {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      padding-bottom: 8px;
      margin-bottom: 12px;
      width: 100%;
    }
    .swap-family-tab {
      border: none;
      font-family: inherit;
      background: transparent;
      padding: 6px 3px 5px;
      border-radius: 14px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      min-height: 48px;
      flex: 1 1 0;
      min-width: 0;
      transition: background 150ms ease;
    }
    .swap-family-tab:hover {
      background: var(--cv-cream);
    }
    .swap-family-tab.active {
      background: rgba(255, 255, 255, 0.45);
    }
    .family-shape {
      display: block;
      transition: box-shadow 160ms ease, transform 150ms ease;
    }
    .two-tone-swatch {
      display: flex;
      gap: 3px;
      padding: 2px;
      border-radius: 5px;
      transition: box-shadow 160ms ease;
    }
    .family-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.45);
      white-space: normal;
      line-height: 1.1;
      text-align: center;
      max-width: 100%;
      transition: color 150ms ease;
    }
    .family-label.active {
      color: var(--cv-ink);
    }
    .band-note-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      color: #6B5F50;
      border-radius: 11px;
      padding: 8px 11px;
      margin-bottom: 12px;
    }
    .band-move-tag {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: #2E271F;
      border-radius: 100px;
      padding: 3px 8px;
      flex-shrink: 0;
    }
    .alt-item-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 14px;
      background: var(--cv-cream);
      margin-bottom: 7px;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease, background 140ms ease;
    }
    .alt-item-row:hover {
      background: #FFFBF5;
      transform: translateY(-1px);
    }
    .alt-item-row.selected {
      box-shadow: inset 0 0 0 2px var(--cv-plum);
      background: #FDF9F2;
    }
    .alt-play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #2E271F;
      transition: background 150ms var(--cv-ease), transform 120ms ease;
    }
    .alt-play-btn:active {
      transform: scale(0.92);
    }

    /* Dedicated Mobile Layout */
    .mobile-stage-wrap {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .mobile-vibe-bar {
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
    }
    .quick-action-btn {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      background: var(--cv-cream);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 100ms ease;
    }
    .quick-action-btn:active {
      transform: scale(0.92);
    }
    .quick-action-btn.swap {
      top: -10px;
      right: -10px;
    }
    .quick-action-btn.detail {
      bottom: -10px;
      left: -10px;
    }

    /* Mobile Slide-Up Sheet Modal */
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.4);
      z-index: 100;
      backdrop-filter: blur(4px);
      animation: cvfv-sheet-up 180ms ease;
    }
    .mobile-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 80vh;
      background: var(--cv-surface, #F6EADB);
      border-radius: 24px 24px 0 0;
      z-index: 101;
      display: flex;
      flex-direction: column;
      padding: 20px 20px 30px;
      box-shadow: 0 -12px 32px rgba(46, 39, 31, 0.25);
      animation: cvfv-sheet-up 220ms var(--cv-ease);
      overflow-y: auto;
    }
  `;N([S({type:Object})],C.prototype,"chordData",2);N([S({type:Object})],C.prototype,"progression",2);N([S({type:Number})],C.prototype,"activeIndex",2);N([S({type:Number})],C.prototype,"progressStep",2);N([S({type:Array})],C.prototype,"order",2);N([S({type:Boolean})],C.prototype,"playing",2);N([S({type:Boolean})],C.prototype,"showTheory",2);N([S({type:String})],C.prototype,"instrument",2);N([S({type:String})],C.prototype,"playStyle",2);N([S({type:Boolean})],C.prototype,"isAuthenticated",2);N([S({type:String})],C.prototype,"userEmail",2);N([S({type:Array})],C.prototype,"sections",2);N([S({type:Number})],C.prototype,"activeSectionIdx",2);N([S({type:Number})],C.prototype,"activePlayingSectionIdx",2);N([S({type:Number})],C.prototype,"totalSongSteps",2);N([S({type:Boolean})],C.prototype,"isGenerating",2);N([S({type:Boolean})],C.prototype,"libraryOpen",2);N([x()],C.prototype,"isMobile",2);N([x()],C.prototype,"activeView",2);N([x()],C.prototype,"activeSoundDrawer",2);N([x()],C.prototype,"shareOpen",2);N([x()],C.prototype,"vibeOpen",2);N([x()],C.prototype,"selectedBand",2);N([x()],C.prototype,"freeText",2);N([x()],C.prototype,"vibePlaceholderIdx",2);N([x()],C.prototype,"expandedGenre",2);N([x()],C.prototype,"expandedMood",2);N([x()],C.prototype,"activeSwapFamily",2);N([x()],C.prototype,"swapIndex",2);N([x()],C.prototype,"isInspectorOpen",2);N([x()],C.prototype,"abPick",2);N([x()],C.prototype,"abSide",2);N([x()],C.prototype,"savedSets",2);N([x()],C.prototype,"renamingId",2);N([x()],C.prototype,"draftName",2);N([x()],C.prototype,"confirmDeleteId",2);N([x()],C.prototype,"librarySearch",2);N([x()],C.prototype,"librarySelectMode",2);N([x()],C.prototype,"librarySelected",2);N([x()],C.prototype,"previewIndex",2);N([x()],C.prototype,"playInstrument",2);N([x()],C.prototype,"showDegrees",2);N([x()],C.prototype,"mobileSheetOpen",2);N([x()],C.prototype,"snapProgress",2);N([x()],C.prototype,"abPlaying",2);N([x()],C.prototype,"dragState",2);C=N([ee("loop-screen")],C);var Uo=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,ke=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ro(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Uo(e,i,s),s};let le=class extends Z{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(t){t.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const t=this.name.trim();t&&(this.dispatchEvent(new CustomEvent("save",{detail:t})),this.close())}onInput(t){this.name=t.target.value}onKeyDown(t){t.key==="Escape"?this.close():t.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?h`
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
    `:h``}};le.styles=Q`
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
      pointer-events: none;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
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
  `;ke([S({type:Boolean})],le.prototype,"visible",2);ke([S({type:String})],le.prototype,"defaultName",2);ke([x()],le.prototype,"mounted",2);ke([x()],le.prototype,"name",2);ke([ei(".name-input")],le.prototype,"inputEl",2);le=ke([ee("save-set-modal")],le);var _o=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,_=(t,e,i,o)=>{for(var s=o>1?void 0:o?jo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&_o(e,i,s),s};const zo=["Piano","Rhodes","Nylon Guitar","Warm Pad"],Go=["Block chords","Arpeggio","Strum","Broken (swing)"],Vo=["flex-start","center","flex-end"];let L=class extends Z{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.embedded=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=ut(.5),this.mascotAlign=gt([...Vo]),this.eggCounter=new ki,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(t){if(t.has("progressStep")){const e=t.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}updated(t){t.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(t){this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const t=this.sections[0]?.progression.genre??"Pop",e=this.instrument??Xi(t),i=this.playStyle??Ji(t),o=this.totalSteps||this.sections.reduce((f,v)=>f+v.order.length,0),s=!this.playing||o<=0?0:this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100,r=pe.filter(f=>f.name!==e);let n=zo.filter(f=>r.some(v=>v.name===f));const d=r.filter(f=>!n.includes(f.name)),a=this.expandedAllInstruments?r:r.filter(f=>n.includes(f.name)),p=ue.filter(f=>f.name!==i);let u=Go.filter(f=>p.some(v=>v.name===f));const l=p.filter(f=>!u.includes(f.name)),g=this.expandedAllPlayStyles?p:p.filter(f=>u.includes(f.name)),b=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],y=b?he(b.progression.mood):"#C9A9E0";return h`
      <div class="frame" style="${this.embedded?"padding: 10px 0 30px;":""}">
        ${this.embedded?"":h`
          <app-header
            .isAuthenticated=${this.isAuthenticated}
            @view-sets=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}
            @wordmark-click=${()=>this.onWordmarkClick()}
          ></app-header>
        `}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          ${this.embedded?h`
            <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 16px;">
              Each section reuses your loop with musical permutations (Verse, Chorus, Bridge). Press play in the transport bar to hear the full arrangement.
            </div>
          `:h`
            <div class="hero">
              <div class="back-pill" @click=${this.backToProgression}>
                ← Back to progression
              </div>
              <h1>Arrange the whole song.</h1>
              <div class="subcopy">
                Each section reuses your loop — related, but never identical.
              </div>
            </div>
          `}
          <div class="section-list">
            ${this.sections.map((f,v)=>{const k=this.playing?v===this.activePlayingSectionIdx:v===this.activeSectionIdx,$=he(f.progression.mood);return h`
                <div class="section-row ${k?"active":""}" style=${k?`--ring-color:${$}`:""} @click=${()=>this.selectSection(v)}>
                  <div>
                    <div class="section-name">${f.name.toUpperCase()}</div>
                    <div class="section-chords">${f.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${f.order.map(c=>{const m=f.progression.chords[c],w=W(m.tension);return h`<div class="section-chip" style="background:${w.color};border-radius:${Math.round(w.radius*.35)}px;"></div>`})}
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
                ${this.playing?h`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:h`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${s}%;background:${y};--progress-duration:${je}ms"
                ></div>
              </div>
              ${this.isAuthenticated?h`
                <div class="save-btn" title="${this.isBookmarked?"Saved in sets":"Save set"}" @click=${()=>{this.saveModalVisible=!0}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              `:""}
              <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                ${e} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
              </div>
              <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
                ${i} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
              </div>
            </div>

            ${this.expandedInstrument?h`
              <div class="control-options">
                ${a.map(f=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:f.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${f.color}"></span>${f.name}
                  </div>
                `)}
                ${d.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${d.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?h`
              <div class="control-options">
                ${g.map(f=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:f.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${f.color}"></span>${f.name}
                  </div>
                `)}
                ${l.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${l.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?h`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
        
        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${t&&b?`${t} · ${b.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${f=>{this.dispatchEvent(new CustomEvent("save-set",{detail:f.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};L.styles=Q`
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
  `;_([S({type:Array})],L.prototype,"sections",2);_([S({type:Number})],L.prototype,"activeSectionIdx",2);_([S({type:Number})],L.prototype,"activePlayingSectionIdx",2);_([S({type:Boolean})],L.prototype,"canAddSection",2);_([S({type:Boolean})],L.prototype,"playing",2);_([S({type:Number})],L.prototype,"progressStep",2);_([S({type:Number})],L.prototype,"totalSteps",2);_([S({type:String})],L.prototype,"instrument",2);_([S({type:String})],L.prototype,"playStyle",2);_([S({type:Boolean})],L.prototype,"isAuthenticated",2);_([S({type:Boolean})],L.prototype,"isBookmarked",2);_([S({type:Boolean})],L.prototype,"embedded",2);_([x()],L.prototype,"expandedInstrument",2);_([x()],L.prototype,"expandedPlayStyle",2);_([x()],L.prototype,"expandedAllInstruments",2);_([x()],L.prototype,"expandedAllPlayStyles",2);_([x()],L.prototype,"snapProgress",2);_([x()],L.prototype,"saveModalVisible",2);_([x()],L.prototype,"mascot",2);_([x()],L.prototype,"mascotAlign",2);_([x()],L.prototype,"paradeTrigger",2);L=_([ee("song-screen")],L);var Yo=Object.defineProperty,qo=Object.getOwnPropertyDescriptor,te=(t,e,i,o)=>{for(var s=o>1?void 0:o?qo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Yo(e,i,s),s};const Vt={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Ho=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Yt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},qt={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},Ht={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},$e={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}},Wo=[4,9,2,7,11,4],Wt=[7,0,4,9];let K=class extends Z{constructor(){super(...arguments),this.order=[0,1,2,3],this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.embedded=!1,this.playInstrument="Piano",this.showDegrees=!1,this.activeChordIndex=null}parseChord(t){const e=/^([A-G][b#]?)(.*)$/.exec(t||"C"),i=e?e[1]:"C",o=e?e[2]:"",s=Yt[o]||Yt[Ht[o]||"maj"]||[0,4,7];return{root:i,rootPc:Vt[i]===void 0?0:Vt[i],q:o,intervals:s}}shapeQual(t){const e=t===""?"maj":t;if($e[5][e]||$e[6][e])return e;const i=Ht[e];return i&&($e[5][i]||$e[6][i])?i:"maj"}guitarVoicing(t){const e=this.parseChord(t),i=this.shapeQual(e.q),o=[];return[[6,4],[5,9]].forEach(([s,r])=>{const n=$e[s][i];if(!n)return;const d=((e.rootPc-r)%12+12)%12;o.push({rootFret:d,frets:n.map(a=>a===null?null:a+d)})}),o.length?(o.sort((s,r)=>s.rootFret-r.rootFret),o[0].frets):null}ukeVoicing(t){const e=this.parseChord(t),i=Wt,o=e.intervals.map(d=>(e.rootPc+d)%12),s=d=>{const a=new Set(d);let p=null;const u=[],l=g=>{if(g===4){const b=u.map((k,$)=>(i[$]+k)%12);for(const k of a)if(b.indexOf(k)<0)return;for(const k of b)if(!a.has(k))return;const y=u.filter(k=>k>0),f=y.length?Math.max(...y)-Math.min(...y):0;if(f>3)return;const v=f*12+u.reduce((k,$)=>k+$,0);(!p||v<p.score)&&(p={frets:u.slice(),score:v});return}for(let b=0;b<=5;b++)u.push(b),l(g+1),u.pop()};return l(0),p},r=s(o);if(r)return r.frets;const n=s(e.intervals.filter(d=>d!==7).map(d=>(e.rootPc+d)%12));return n?n.frets:null}degOf(t,e){return qt[((t-e)%12+12)%12]||"1"}notesLineFor(t){return t.intervals.map(e=>{const i=Ho[(t.rootPc+e)%12];return this.showDegrees?`${i} (${this.degOf((t.rootPc+e)%12,t.rootPc)})`:i}).join(" · ")}onChordClick(t){this.activeChordIndex=t,this.dispatchEvent(new CustomEvent("chord-preview",{detail:t,bubbles:!0,composed:!0})),setTimeout(()=>{this.activeChordIndex===t&&(this.activeChordIndex=null)},450)}onBackClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}renderPianoSvg(t,e){const r=[0,2,4,5,7,9,11],n=this.parseChord(t),d=[],a=[],p=[];for(let l=0;l<2;l++)r.forEach((g,b)=>{d.push({x:(l*7+b)*22,w:22-1.5,h:86})});for(let l=0;l<2;l++)[0,1,3,4,5].forEach(g=>{const b=l*7+g;a.push({x:b*22+22*.64,w:22*.58,h:52})});n.intervals.forEach(l=>{const g=n.rootPc+l,b=Math.floor(g/12),y=g%12,f=r.indexOf(y),v=l===0,k=v?"#F2735F":e,$=this.showDegrees&&qt[l%12]||"";if(f>=0){const c=b*7+f;p.push({cx:c*22+(22-1.5)/2,cy:67,r:9,fill:k,label:$,lc:v?"#FBF3E6":"#2E271F"})}else{const m=(b*7+r.indexOf(y-1))*22+22*.64,w=22*.58;p.push({cx:m+w/2,cy:38,r:7.5,fill:k,label:$,lc:v?"#FBF3E6":"#2E271F"})}});const u=14*22;return h`
      <svg width="${u}" height="${86}" viewBox="0 0 ${u} ${86}" style="display:block;max-width:100%;height:auto;">
        ${d.map(l=>R`
          <rect x="${l.x}" y="0" width="${l.w}" height="${l.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${a.map(l=>R`
          <rect x="${l.x}" y="0" width="${l.w}" height="${l.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${p.map(l=>R`
          <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="${l.fill}"></circle>
          ${l.label?R`
            <text x="${l.cx}" y="${l.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${l.lc}" font-family="'Plus Jakarta Sans',sans-serif">${l.label}</text>
          `:""}
        `)}
      </svg>
    `}renderFretSvg(t,e){const n=this.parseChord(t),d=e?Wt:Wo,a=e?this.ukeVoicing(t)||[null,null,null,null]:this.guitarVoicing(t)||[null,null,null,null,null,null],p=d.length,u=a.filter(m=>m!==null&&m>0),l=u.length&&Math.max(...u)>4?Math.min(...u)-1:0,g=[],b=[],y=[],f=[],v=[];for(let m=0;m<p;m++)g.push({x:m*18});for(let m=0;m<=4;m++)b.push({y:16+m*24,sw:m===0&&l===0?3:1.2});a.forEach((m,w)=>{const I=w*18;if(m===null){v.push({x:I});return}if(m===0){f.push({x:I});return}const D=((d[w]+m-n.rootPc)%12+12)%12;y.push({cx:I,cy:16+(m-l-.5)*24,fill:D===0?"#F2735F":"#2E271F",label:this.showDegrees?this.degOf((d[w]+m)%12,n.rootPc):""})});const k=(p-1)*18+26,$=16+4*24+12,c=(p-1)*18;return{posLabel:l>0?`${l+1}fr`:"",svg:h`
        <svg width="${k}" height="${$}" viewBox="-13 -2 ${k} ${$}" style="display:block;">
          ${b.map(m=>R`
            <rect x="0" y="${m.y}" width="${c}" height="${m.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${g.map(m=>R`
            <rect x="${m.x}" y="16" width="1.2" height="${4*24}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${f.map(m=>R`
            <circle cx="${m.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${v.map(m=>R`
            <text x="${m.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${y.map(m=>R`
            <circle cx="${m.cx}" cy="${m.cy}" r="7.5" fill="${m.fill}"></circle>
            ${m.label?R`
              <text x="${m.cx}" y="${m.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${m.label}</text>
            `:""}
          `)}
        </svg>
      `}}render(){if(!this.progression)return h``;const t=he(this.progression.mood);this.style.setProperty("--active-mood-color",t);const e=this.order.map(s=>this.progression.chords[s]||this.progression.chords[0]),i=this.playInstrument==="Piano",o=i?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.";return h`
      ${this.embedded?"":h`
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
        ></app-header>
      `}

      <div class="container" style="${this.embedded?"padding: 10px 0 40px;":""}">
        ${this.embedded?"":h`
          <button class="back-btn" @click=${this.onBackClick}>
            ← Back to progression
          </button>
        `}

        <div class="page-header">
          <h1 class="page-title">Play it yourself.</h1>
          <div class="page-subtitle">The same loop, laid out for your hands. Tap any chord to hear it.</div>
        </div>

        <div class="controls-bar">
          <div class="instrument-tabs">
            <button
              class="tab-btn ${this.playInstrument==="Piano"?"active":""}"
              @click=${()=>{this.playInstrument="Piano"}}
            >
              Piano
            </button>
            <button
              class="tab-btn ${this.playInstrument==="Guitar"?"active":""}"
              @click=${()=>{this.playInstrument="Guitar"}}
            >
              Guitar
            </button>
            <button
              class="tab-btn ${this.playInstrument==="Ukulele"?"active":""}"
              @click=${()=>{this.playInstrument="Ukulele"}}
            >
              Ukulele
            </button>
          </div>

          <div class="toggle-wrap" @click=${()=>{this.showDegrees=!this.showDegrees}}>
            <div class="toggle-track ${this.showDegrees?"active":""}">
              <div class="toggle-knob"></div>
            </div>
            <div class="toggle-label">Scale degrees</div>
          </div>
        </div>

        <div class="hint-text">${o}</div>

        ${i?h`
          <div class="cards-grid piano-grid">
            ${e.map((s,r)=>{const n=this.parseChord(s.name),d=this.activeChordIndex===r;return h`
                <div
                  class="chord-card ${d?"lit":""}"
                  @click=${()=>this.onChordClick(r)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div class="chord-name">${s.name}</div>
                    <div class="chord-roman">${s.roman||""}</div>
                  </div>
                  ${this.renderPianoSvg(s.name,t)}
                  <div class="notes-line">${this.notesLineFor(n)}</div>
                </div>
              `})}
          </div>
        `:h`
          <div class="cards-grid fret-grid">
            ${e.map((s,r)=>{const n=this.parseChord(s.name),d=this.renderFretSvg(s.name,this.playInstrument==="Ukulele"),a=this.activeChordIndex===r;return h`
                <div
                  class="chord-card ${a?"lit":""}"
                  @click=${()=>this.onChordClick(r)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div style="display:flex;align-items:baseline;gap:8px;">
                      <div class="chord-name">${s.name}</div>
                      <div class="chord-roman">${s.roman||""}</div>
                    </div>
                    ${d.posLabel?h`<div class="pos-label">${d.posLabel}</div>`:""}
                  </div>
                  ${d.svg}
                  <div class="notes-line">${this.notesLineFor(n)}</div>
                </div>
              `})}
          </div>
        `}
      </div>
    `}};K.styles=Q`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
      box-sizing: border-box;
    }

    .container {
      max-width: 1060px;
      margin: 0 auto;
      padding: 10px 48px 90px;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .container {
        padding: 10px 20px 60px;
      }
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
      text-decoration: none;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: background 150ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .back-btn:hover {
      background: #E8DCC0;
      transform: translateX(-2px);
    }

    .page-header {
      margin-top: 22px;
    }
    .page-title {
      font-size: 38px;
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
      margin: 0;
    }
    @media (max-width: 600px) {
      .page-title {
        font-size: 28px;
      }
    }
    .page-subtitle {
      font-size: 15.5px;
      line-height: 1.7;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 10px;
      max-width: 540px;
    }

    .controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 30px;
      flex-wrap: wrap;
    }

    .instrument-tabs {
      display: flex;
      gap: 4px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 4px;
    }
    .tab-btn {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 18px;
      border-radius: 100px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: #6B5F50;
      transition: background 200ms ease, color 200ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .tab-btn.active {
      background: var(--active-mood-color, #F6D98B);
      color: #2E271F;
    }
    .tab-btn:hover:not(.active) {
      color: #2E271F;
    }

    .toggle-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .toggle-track {
      width: 42px;
      height: 24px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      position: relative;
      flex-shrink: 0;
      transition: background 220ms ease;
    }
    .toggle-track.active {
      background: var(--active-mood-color, #F6D98B);
    }
    .toggle-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #FBF3E6;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.3);
      transition: left 220ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .toggle-track.active .toggle-knob {
      left: 21px;
    }
    .toggle-label {
      font-size: 13.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .hint-text {
      font-size: 13px;
      line-height: 1.6;
      color: #8A7C6B;
      margin-top: 16px;
      max-width: 580px;
    }

    .cards-grid {
      display: grid;
      gap: 16px;
      margin-top: 24px;
    }
    .cards-grid.piano-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .cards-grid.fret-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .chord-card {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      cursor: pointer;
      box-shadow: 0 10px 24px -14px rgba(46, 39, 31, 0.2);
      border: 1.5px solid rgba(46, 39, 31, 0.06);
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease, border-color 200ms ease;
    }
    .chord-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -16px rgba(46, 39, 31, 0.3);
      border-color: rgba(46, 39, 31, 0.16);
    }
    .chord-card:active,
    .chord-card.lit {
      transform: scale(0.98);
      box-shadow: 0 0 0 4px var(--active-mood-color, #F6D98B);
    }

    .card-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 9px;
    }
    .chord-name {
      font-size: 20px;
      font-weight: 800;
      color: #2E271F;
    }
    .chord-roman {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      letter-spacing: 0.5px;
    }
    .pos-label {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
    }

    .notes-line {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
    }
  `;te([S({type:Object})],K.prototype,"progression",2);te([S({type:Array})],K.prototype,"order",2);te([S({type:Boolean})],K.prototype,"isAuthenticated",2);te([S({type:String})],K.prototype,"userEmail",2);te([S({type:Number})],K.prototype,"savedCount",2);te([S({type:Boolean})],K.prototype,"embedded",2);te([x()],K.prototype,"playInstrument",2);te([x()],K.prototype,"showDegrees",2);te([x()],K.prototype,"activeChordIndex",2);K=te([ee("play-along-screen")],K);var Xo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,Se=(t,e,i,o)=>{for(var s=o>1?void 0:o?Jo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Xo(e,i,s),s};let ce=class extends Z{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&ve.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await ve.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?h``:h`
      <div class="scrim ${this.open?"visible":""}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.open?"visible":""}" role="dialog" aria-modal="true" @keydown=${t=>t.key==="Escape"&&this.close()}>
          <div class="header-row">
            <h2 class="modal-title">
              <svg width="22" height="22" viewBox="0 0 30 30">
                <circle cx="11" cy="11" r="9" fill="#F2A79B" />
                <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
              </svg>
              <span>Chroma Chords</span>
            </h2>
            <button class="close-btn" @click=${this.close} aria-label="Close modal">&times;</button>
          </div>

          <p class="pitch-text">
            Sign in with Google to backup, sync, and access your progression sets anywhere with offline support.
          </p>

          <div class="features-list">
            <div class="feature-item">
              <span class="feature-icon">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span>Instant Cloudflare Edge Cloud Sync</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span>Full offline editing with auto-sync</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span>Unlimited progression storage</span>
            </div>
          </div>

          ${this.errorMessage?h`<div class="alert-box alert-error">${this.errorMessage}</div>`:""}

          <div class="btn-container">
            <div id="google-btn-container">
              <button
                type="button"
                class="oauth-btn"
                ?disabled=${this.isOAuthLoading}
                @click=${this.handleGoogleSignIn}
              >
                ${this.isOAuthLoading?h`<span class="spinner"></span> <span>Connecting to Google...</span>`:h`
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    `}
              </button>
            </div>
          </div>

          <div class="footer-note">
            Your progressions are encrypted and tied strictly to your Google account ID.
          </div>
        </div>
      </div>
    `}};ce.styles=Q`
    :host {
      display: block;
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
    }
    .scrim {
      position: fixed;
      inset: -2px;
      z-index: 120;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
      pointer-events: none;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.45);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      pointer-events: auto;
    }
    .modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 121;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      pointer-events: none;
      box-sizing: border-box;
    }
    .modal {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 24px;
      padding: 32px 30px;
      width: 100%;
      max-width: 400px;
      box-sizing: border-box;
      box-shadow: 0 24px 48px -12px rgba(46, 39, 31, 0.35), 0 0 0 1px rgba(46, 39, 31, 0.06);
      opacity: 0;
      transform: translateY(12px) scale(0.96);
      transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .modal-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .close-btn {
      background: rgba(46, 39, 31, 0.06);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 18px;
      line-height: 1;
      padding: 0;
      transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
    }
    .close-btn:hover {
      background: rgba(46, 39, 31, 0.12);
      color: var(--cv-ink, #2E271F);
    }
    .close-btn:active {
      transform: scale(0.92);
    }
    .pitch-text {
      font-size: 14px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin: 0 0 20px 0;
    }
    .features-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(46, 39, 31, 0.04);
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
    }
    .feature-icon {
      color: #3F704D;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      width: 100%;
    }
    .oauth-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: #FFFFFF;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      border-radius: 100px;
      padding: 12px 20px;
      font-size: 14.5px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      box-sizing: border-box;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.06);
    }
    .oauth-btn:hover:not(:disabled) {
      background: #FAF8F5;
      border-color: rgba(46, 39, 31, 0.25);
      box-shadow: 0 4px 12px rgba(46, 39, 31, 0.1);
    }
    .oauth-btn:active:not(:disabled) {
      transform: scale(0.98);
    }
    .oauth-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(46, 39, 31, 0.2);
      border-top-color: var(--cv-ink, #2E271F);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .alert-box {
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 12.5px;
      line-height: 1.45;
      margin-bottom: 16px;
    }
    .alert-error {
      background: #FBEAE8;
      border: 1px solid #F2B8B5;
      color: #B3261E;
    }
    .footer-note {
      text-align: center;
      font-size: 11.5px;
      color: var(--cv-ink-muted, #8A6B3F);
      margin-top: 18px;
      line-height: 1.4;
    }
  `;Se([S({type:Boolean})],ce.prototype,"open",2);Se([x()],ce.prototype,"mounted",2);Se([x()],ce.prototype,"isOAuthLoading",2);Se([x()],ce.prototype,"errorMessage",2);Se([ei("#google-btn-container")],ce.prototype,"googleBtnContainer",2);ce=Se([ee("auth-modal")],ce);var Ko=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,O=(t,e,i,o)=>{for(var s=o>1?void 0:o?Qo(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Ko(e,i,s),s};let M=class extends Z{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="loop",this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.previousScreenBeforeSets="loop",this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await ve.signOut(),F.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&pe.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&ue.some(i=>i.name===e)&&(this.playStyle=e),T.setInstrument(this.instrument),T.setPlayStyle(this.playStyle),this.unsubscribeAuth=ve.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=F.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=F.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=T.subscribeTick((i,o,s,r,n)=>{this.activeIndex=i,this.progressStep=o,typeof s=="number"&&(this.activePlayingSectionIdx=s),typeof r=="number"&&(this.totalSongSteps=r),this.playing=T.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),ms().then(i=>{this.chordData=i,this.progression||(this.progression=ct(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(o,s)=>s),T.setProgression(this.progression,this.order),this.sections=oe.createInitialSong(this.progression,this.order),this.screen="loop")}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),T.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return F.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?(this.libraryOpen=!0,this.screen="loop"):t==="play-along"||t==="12a"?this.screen="play-along":t==="song"||t==="5a"?(this.screen="song",this.sections.length&&T.setSong(this.sections)):this.screen="loop"}setScreen(t){this.screen=t;const e=`#${t}`;window.location.hash!==e&&history.pushState(null,"",e)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{this.keyOverride=null,this.scaleOverride=null;const e=t?.detail?.promptText||this.activeSearchPrompt||void 0,i=await io.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),T.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),T.setPlayStyle(i.playStyle));const o=i.progression;this.progression=o,this.order=Array.from({length:o.chords.length},(s,r)=>r),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,T.setProgression(o,this.order),T.reset(),this.setScreen("loop"),this.sections=oe.createInitialSong(o,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){this.length=t.detail,this.regenerate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;const t=ct(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,T.setProgression(t,this.order),this.sections=oe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(T.startAutoplay(),T.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let s=o.notes;(!s||s.length===0)&&(s=X(o.name,Y(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.showTheory=e.showTheory??this.showTheory,T.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=oe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){F.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=F.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,F.saveProject(e),this.requestUpdate())}async onSyncProjects(){await F.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),T.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),T.setPlayStyle(t.detail)}onTogglePlay(){this.playing=T.togglePlay()}onTogglePlaySong(){T.setSong(this.sections),this.playing=T.togglePlay()}onChordTap(t){this.progression&&(this.playing&&(T.stopAutoplay(),this.playing=!1),T.clearABOverride(),this.swapIndex=t.detail,this.sheetMode="swap",this.alternatives=_s(this.chordData,this.progression,t.detail),this.theoryGroups=wt(this.chordData,this.progression,t.detail),this.borrowedChords=ui(this.chordData,this.progression,t.detail),this.sheetOpen=!0,T.playChordAtIndex(t.detail,.8))}onAuditionChord(t){T.auditionChord(t.detail,.8)}onSelectAlternative(t){if(!this.progression||this.swapIndex===null)return;const e=t.detail,o=[...this.progression.chords];o[this.swapIndex]=e.chord,this.progression={...this.progression,chords:o},T.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.showToast(`Swapped in ${e.chord.name}`)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null,T.clearABOverride()}onProgressionChange(t){this.progression=t.detail,T.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=oe.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=oe.addSection(this.sections,this.progression);this.sections=t.sections,this.activeSectionIdx=t.activeIndex,this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.order=e.order.slice(),T.setOrder(this.order)),this.requestUpdate()}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(F.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=F.getProjects().find(r=>r.id===e),o=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s={id:e,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};F.saveProject(s),t&&F.scheduleCloudSync(),this.showToast(`Saved "${o}"`,e),this.requestUpdate()}render(){return this.currentProjectId&&F.isProjectSaved(this.currentProjectId),h`
      <div class="app-header-container">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${F.getProjects().length}
          .syncStatus=${this.syncStatus}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.setScreen("loop")}}
        ></app-header>
      </div>

      <div class="screen-view">
        ${this.progression?h`
          <loop-screen
            .chordData=${this.chordData}
            .progression=${this.progression}
            .activeIndex=${this.activeIndex}
            .progressStep=${this.progressStep}
            .order=${this.order}
            .playing=${this.playing}
            .showTheory=${this.showTheory}
            .instrument=${this.instrument}
            .playStyle=${this.playStyle}
            .isAuthenticated=${this.isAuthenticated}
            .userEmail=${this.userEmail}
            .sections=${this.sections}
            .activeSectionIdx=${this.activeSectionIdx}
            .activePlayingSectionIdx=${this.activePlayingSectionIdx}
            .totalSongSteps=${this.totalSongSteps}
            .isGenerating=${this.isGenerating}
            .libraryOpen=${this.libraryOpen}
            @library-open-change=${t=>{this.libraryOpen=t.detail}}
            @progression-change=${this.onProgressionChange}
            @theory-toggle=${this.onTheoryToggle}
            @set-instrument=${this.onSetInstrument}
            @set-play-style=${this.onSetPlayStyle}
            @toggle-play=${this.onTogglePlay}
            @toggle-play-song=${this.onTogglePlaySong}
            @set-genre=${this.onGenreChange}
            @set-mood=${this.onMoodChange}
            @set-length=${this.onLengthChange}
            @freetext-generate=${this.onGenerate}
            @reroll=${this.onReroll}
            @add-section=${this.onAddSection}
            @select-section=${this.onSelectSection}
            @save-set=${this.onSaveSet}
            @load-project=${this.onLoadProject}
            @view-sets=${()=>{this.libraryOpen=!0}}
            @request-login=${this.onLoginRequest}
            @request-logout=${this.onLogoutRequest}
            @toast=${t=>this.showToast(t.detail)}
          ></loop-screen>
        `:h`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

        ${this.toastMessage?h`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              ${this.toastUndoId?h`
                <button class="toast-btn" @click=${()=>{this.libraryOpen=!0,this.toastMessage=null}}>View</button>
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:h`
                <button class="toast-btn" @click=${()=>{this.toastMessage=null}} aria-label="Dismiss">✕</button>
              `}
            </div>
          </div>
        `:""}

        <auth-modal
          .open=${this.authModalOpen}
          @close-modal=${()=>{this.authModalOpen=!1}}
        ></auth-modal>
      </div>
    `}};M.styles=Q`
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
      --cv-red: #F2A79B;
      --cv-red-deep: #F2735F;
      --cv-blue: #9CC0EC;
      --cv-yellow: #F6D98B;
      --cv-purple: #C9A9E0;
      --cv-green: #B8CC9E;
      --cv-plum: #9B7CA8;

      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font);
      color: var(--cv-ink);
      overflow: hidden;
      box-sizing: border-box;
    }

    .app-header-container {
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream);
      flex-shrink: 0;
      z-index: 40;
    }

    .screen-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
      position: relative;
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

    @media (prefers-reduced-motion: reduce) {
      .screen-view {
        transition: opacity 150ms ease;
        transform: none !important;
      }
      .save-toast {
        animation: none;
      }
    }
  `;O([x()],M.prototype,"chordData",2);O([x()],M.prototype,"screen",2);O([x()],M.prototype,"libraryOpen",2);O([x()],M.prototype,"genre",2);O([x()],M.prototype,"mood",2);O([x()],M.prototype,"progression",2);O([x()],M.prototype,"activeIndex",2);O([x()],M.prototype,"progressStep",2);O([x()],M.prototype,"order",2);O([x()],M.prototype,"keyOverride",2);O([x()],M.prototype,"scaleOverride",2);O([x()],M.prototype,"playing",2);O([x()],M.prototype,"showTheory",2);O([x()],M.prototype,"instrument",2);O([x()],M.prototype,"playStyle",2);O([x()],M.prototype,"sheetOpen",2);O([x()],M.prototype,"sheetMode",2);O([x()],M.prototype,"swapIndex",2);O([x()],M.prototype,"alternatives",2);O([x()],M.prototype,"theoryGroups",2);O([x()],M.prototype,"borrowedChords",2);O([x()],M.prototype,"length",2);O([x()],M.prototype,"sections",2);O([x()],M.prototype,"activeSectionIdx",2);O([x()],M.prototype,"activePlayingSectionIdx",2);O([x()],M.prototype,"totalSongSteps",2);O([x()],M.prototype,"pendingChordSuggestion",2);O([x()],M.prototype,"userEmail",2);O([x()],M.prototype,"isAuthenticated",2);O([x()],M.prototype,"syncStatus",2);O([x()],M.prototype,"authModalOpen",2);O([x()],M.prototype,"toastMessage",2);O([x()],M.prototype,"toastUndoId",2);O([x()],M.prototype,"isGenerating",2);M=O([ee("chroma-chords-app")],M);
