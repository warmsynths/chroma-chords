import{f as Fi,u as _i,s as Ri,n as Li,l as Ui,P as G,F as Ce,S as ae,M as ni,C as ai,R as li,a as ci,b as zi,i as Y,c as q,d as h,A as di,w as j,O as ji}from"./assets/vendor-7vM_bUxM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gi={attribute:!0,type:String,converter:_i,reflect:!1,hasChanged:Fi},Vi=(e=Gi,t,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),o==="accessor"){const{name:n}=i;return{set(c){const l=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,l,e,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,e,c),c}}}if(o==="setter"){const{name:n}=i;return function(c){const l=this[n];t.call(this,c),this.requestUpdate(n,l,e,!0,c)}}throw Error("Unsupported decorator location: "+o)};function y(e){return(t,i)=>typeof i=="object"?Vi(e,t,i):((o,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,o),n?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(e){return y({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yi=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function kt(e,t){return(i,o,s)=>{const r=n=>n.renderRoot?.querySelector(e)??null;return Yi(i,o,{get(){return r(this)}})}}const ge="chroma_chords_projects",qi="chord_voyager_projects";class me{static getProjects(){try{let t=localStorage.getItem(ge);if(t||(t=localStorage.getItem(qi),t&&localStorage.setItem(ge,t)),t){const i=JSON.parse(t);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(ge,JSON.stringify(i)),i}}catch(t){console.error("Failed to load projects from localStorage:",t)}return[]}static setProjects(t){try{localStorage.setItem(ge,JSON.stringify(t))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(t,i){const o=new Map;return t.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const r=o.get(s.id);!r||s.lastModified>r.lastModified?o.set(s.id,s):s.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(t){const i=this.getProjects(),o=i.findIndex(s=>s.id===t.id);t.lastModified=Date.now(),o>=0?i[o]=t:i.push(t);try{localStorage.setItem(ge,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(t){let i=this.getProjects();i=i.filter(o=>o.id!==t);try{localStorage.setItem(ge,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(t){const i=JSON.stringify(t,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`${t.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}static importProjectFile(t){return new Promise((i,o)=>{const s=new FileReader;s.onload=r=>{try{const n=r.target?.result,c=JSON.parse(n);c&&typeof c=="object"&&Array.isArray(c.chords)?(c.id=Math.random().toString(36).substr(2,9),c.lastModified=Date.now(),i(c)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(t)})}}const Fe="chroma_chords_auth_token",Xe="chroma_chords_auth_user",Hi="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Je(e){try{const t=e.split(".");if(t.length!==3)return null;let i=t[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function Wi(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Hi}}class Xi{constructor(t){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=t!==void 0?t:Wi(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"){this.isLoading=!1;return}try{const t=localStorage.getItem(Fe);if(t){const i=Je(t);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=t,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Fe),localStorage.removeItem(Xe),this.currentAccessToken=null,this.currentUser=null)}}catch(t){console.warn("Failed to restore auth session from localStorage:",t)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const t=Je(this.currentAccessToken);if(t&&t.exp&&t.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(t){return this.listeners.add(t),t(this.getAuthState()),()=>{this.listeners.delete(t)}}notify(){const t=this.getAuthState();this.listeners.forEach(i=>{try{i(t)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(t){if(!t||typeof t!="string")return{success:!1,message:"Invalid credential provided."};const i=Je(t);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=t,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Fe,t),localStorage.setItem(Xe,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(t=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,t(!0)}),i.addEventListener("error",()=>t(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,t(!0)},o.onerror=()=>t(!1),document.head.appendChild(o)})}async renderGoogleButton(t,i){if(!this.clientId||typeof window>"u"||!t)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const r=this.handleCredentialResponse(s.credential);i?.({success:r.success,message:r.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),t.innerHTML="",o.accounts.id.renderButton(t,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const t=window.google;return t?.accounts?.id?new Promise(i=>{try{t.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),t.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(t="google"){return t!=="google"?{success:!1,message:`Unsupported auth provider: ${t}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Fe),localStorage.removeItem(Xe)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(t){console.warn("Error during sign out storage cleanup:",t)}return this.notify(),{success:!0}}}const fe=new Xi;class Ji{formatUrl(t){let i=t.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(t,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?t.Authorization=o:t.Authorization=`Bearer ${o}`}async testConnection(t,i){const o=this.formatUrl(t);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const r=new AbortController,n=setTimeout(()=>r.abort(),8e3),c=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:r.signal});if(clearTimeout(n),c.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await c.json().catch(()=>({}))).timestamp};if(c.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const l=await c.text().catch(()=>"");return{ok:!1,status:c.status,message:`Connection error (${c.status}): ${l||c.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(t,i,o){const s=this.formatUrl(t);if(!s)throw new Error("Worker URL is not configured");const r={"Content-Type":"application/json"};this.applyAuthHeaders(r,i);const n=new AbortController,c=setTimeout(()=>n.abort(),15e3),l=await fetch(`${s}/api/sync`,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(clearTimeout(c),!l.ok){let d="";try{const p=await l.json();d=p.error||p.message||""}catch{d=await l.text().catch(()=>"")}throw new Error(`Cloud sync failed (${l.status}): ${d||l.statusText||"Unknown error"}`)}return await l.json()}}const Ki=new Ji,Dt="chroma_chords_deleted_projects",Bt="chroma_chords_last_sync_time",Qi="https://chroma-chords-api.warmsynths.workers.dev";function Zi(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Qi}}function Pt(e){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(e):null}function Ft(e,t){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(e,t)}class es{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=fe.subscribe(t=>{const i=this.authenticated;this.userEmail=t.user?.email||null,this.authenticated=t.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(t){return this.syncStatusCallbacks.add(t),t(this.syncStatus),()=>this.syncStatusCallbacks.delete(t)}notifySyncStatus(){this.syncStatusCallbacks.forEach(t=>{try{t(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(t){return this.authStateCallbacks.add(t),t(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(t)}notifyAuthState(){this.authStateCallbacks.forEach(t=>{try{t(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(t){return this.projectsChangeCallbacks.add(t),t(this.getProjects()),()=>this.projectsChangeCallbacks.delete(t)}notifyProjectsChanged(){const t=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(t)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return me.getProjects()}isProjectSaved(t){return t?me.getProjects().some(i=>i.id===t):!1}saveProject(t){me.saveProject(t),this.removeTombstone(t.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(t){me.deleteProject(t),this.addTombstone(t),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const t=Pt(Dt);if(!t)return[];try{return JSON.parse(t)}catch{return[]}}setTombstones(t){Ft(Dt,JSON.stringify(t))}addTombstone(t){const i=this.getTombstones(),o=i.findIndex(r=>r.id===t),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:t,deletedAt:s}),this.setTombstones(i)}removeTombstone(t){const i=this.getTombstones().filter(o=>o.id!==t);this.setTombstones(i)}getLastSyncTime(){return Pt(Bt)}setLastSyncTime(t){Ft(Bt,t)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(t=>{console.warn("Scheduled cloud sync failed:",t)})},2e3)}async syncWithCloud(t){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await fe.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=t||Zi();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=me.getProjects(),r=this.getTombstones(),n=this.getLastSyncTime(),c=s.map(v=>({...v,deletedAt:null})),l=await Ki.sync(o,i,{sets:c,lastSyncTime:n,tombstones:r}),d=new Map;s.forEach(v=>{d.set(v.id,{...v,syncedToCloud:!0})});const p=l.tombstones||[],a=new Set(p.map(v=>v.id));(l.sets||[]).forEach(v=>{if(v.deletedAt)a.add(v.id);else{const k=d.get(v.id),S=v.lastModified||(v.updatedAt?new Date(v.updatedAt).getTime():0),I=k?.lastModified||0;(!k||S>=I)&&d.set(v.id,{id:v.id,name:v.name,lastModified:S,genre:v.genre,mood:v.mood,key:v.key,scaleType:v.scaleType,bpm:v.bpm,showTheory:v.showTheory,chords:Array.isArray(v.chords)?v.chords:[],syncedToCloud:!0})}}),a.forEach(v=>{d.delete(v)});const f=Array.from(d.values());me.setProjects(f);const g=this.getTombstones(),x=new Set(r.map(v=>v.id)),m=g.filter(v=>!x.has(v.id));this.setTombstones(m),(l.lastSyncTime||l.syncedAt)&&this.setLastSyncTime(l.lastSyncTime||l.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const z=new es;let Ke=null,Qe=null,Ze=null,_t=null,et=null,tt=null,it=null,st=null,ot=null,rt=null,nt=null;function hi(){return Ke||(Ke=new ci({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Ke}function ts(){return Qe||(Qe=new zi({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:e=>{console.warn("Failed to load Rhodes piano sampler:",e)}}).connect(hi())),Qe}function is(e){const t=hi();switch(e){case"organ":return Ze||(Ze=new G(ae,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(t)),Ze;case"pad-strings":return et||(_t=new li({decay:4.5,wet:.35}).connect(t),et=new G(ae,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(_t)),et;case"juno-pad":if(!it){tt=new ai({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(t);try{tt.start()}catch{}it=new G(ae,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(tt)}return it;case"stab":return st||(st=new G(ni,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(t)),st;case"epiano":return ot||(ot=new G(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(t)),ot;case"guitar":return rt||(rt=new G(ae,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(t)),rt;case"bell":return nt||(nt=new G(Ce,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(t)),nt;case"rhodes":default:return ts()}}const xe=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],we=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],St={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},Tt={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},ss={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Le(e){const t=St[e]??"rhodes";return ss[t]??"Piano"}function Ue(e){return(Tt[e]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function os(){return Promise.race([Ui(),new Promise(e=>setTimeout(e,3e3))])}function pi(e,t){const i=t/60;switch(e){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function ui(e,t){const i=[];for(let o=0;o<t;o++)for(const s of e){const r=s.match(/^([A-G]#?)(-?\d+)$/);if(r){const n=r[1],c=parseInt(r[2],10)+o;i.push(`${n}${c}`)}else i.push(s)}return i}function gi(e,t){const i=[...e];switch(t){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Rt={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function rs(e){if(!e)return;const t=e.toLowerCase().trim();return Rt[t]?Rt[t]:xe.find(o=>o.name.toLowerCase()===t||o.instrument.toLowerCase()===t)?.name}function ns(e){if(!e)return;const t=e.toLowerCase().trim();return t.includes("strum")?"Strum":t.includes("descend")?"Descending Arp":t.includes("half")?"Half-time":t.includes("swing")||t.includes("broken")?"Broken (swing)":t.includes("offbeat")||t.includes("ska")||t.includes("syncopat")||t.includes("groove")?"Off-beat / Ska":t.includes("triplet")||t.includes("fast")?"Fast Triplet":t.includes("arp")||t.includes("cascade")?"Arpeggio":t.includes("block")||t.includes("pad")||t.includes("sustained")?"Block chords":we.find(o=>o.name.toLowerCase()===t)?.name??"Block chords"}function as(e,t=.7,i,o="rhodes",s){try{Promise.all([Ri(),os()]).then(()=>{const r=is(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof r.set=="function"&&r.set(s)}catch(d){console.warn("Failed to apply customConfig to Tone.js instrument:",d)}const n=e.length,c=n<=1?1:Math.max(.4,1/Math.sqrt(n)),l=Li();if(i&&i.arpMode&&i.arpMode!=="off"){const d=i.bpm??80,p=i.arpRate??"1/16",a=i.arpRange??1,f=i.arpMode,g=pi(p,d),x=ui(e,a),m=gi(x,f),v=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*c:c,k=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,g*.9);m.forEach((S,I)=>{const w=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;r.triggerAttackRelease(S,k,l+I*g+w,v())});return}e.forEach((d,p)=>{let a=0,f=c,g=t;if(i){const{minVelocity:x,maxVelocity:m,spread:v,microTiming:k,humanVariance:S,duration:I}=i;f=(x+Math.random()*(m-x))/127*c;const O=p*v*.1,_=(Math.random()-.5)*k*.05,K=(Math.random()-.5)*S*.03;a=Math.max(0,O+_+K),g=I*(1+(Math.random()-.5)*.2*S)}r.triggerAttackRelease(d,g,l+a,f)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function Lt(e,t,i){const o=t==="Unknown"||!t?"Pop":t,s=i?.instrument?xe.find(f=>f.name===i.instrument):void 0,r=i?.playStyle?we.find(f=>f.name===i.playStyle):void 0,n=s?.instrument??St[o]??"rhodes",c=Tt[o]||{},l=r?.patch??{},d={...c,...l,bpm:i?.bpm??c.bpm??90},p=i?.duration??c.duration??.9,a=l.durationMultiplier?p*l.durationMultiplier:p;as(e,a,d,n,i?.customConfig)}const ls=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],cs=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],Q={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},ds=new Set(["F","Bb","Eb","Ab","Db","Gb"]),be=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],He={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},hs=Object.keys(He),ps={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Ut={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},us={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},gt={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},gs=Object.keys(gt),zt={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Ne=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],ms={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},fs={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},It={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},le=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function ve(e){return(le.find(t=>t.name===e)||le[0]).dot}const bs={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function vs(e,t){return 1+e.degrees.filter(i=>t.includes(i)).length*.6}function ze(e,t){const i=e.reduce((s,r)=>s+t(r),0);let o=Math.random()*i;for(const s of e)if(o-=t(s),o<=0)return s;return e[e.length-1]}function ys(e){if(e.length)return e[Math.floor(Math.random()*e.length)]}const mt=4,ue=1,ee=8,At=1700,xs={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function ws(e,t="MAJOR",i="Pop",o="Uplifting"){let r={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[e]??.1;return t.includes("MINOR")||t==="DORIAN"?(e==="SUBMEDIANT"&&(r*=1.4),e==="SUBTONIC"&&(r*=1.3)):t==="MIXOLYDIAN"?(e==="SUBTONIC"&&(r*=1.8),e==="SUBDOMINANT"&&(r*=1.5)):t==="LYDIAN"&&e==="SUPERTONIC"&&(r*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((e==="SUBDOMINANT"||e==="SUPERTONIC")&&(r*=2),e==="SUBMEDIANT"&&(r*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(e==="SUPERTONIC"&&(r*=2.5),e==="SUBDOMINANT"&&(r*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(e==="SUBDOMINANT"||e==="SUBMEDIANT")&&(r*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(e==="SUBTONIC"&&(r*=2.2),e==="SUBDOMINANT"&&(r*=1.8),e==="SUBMEDIANT"&&(r*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&e==="TONIC"&&(r*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?e==="TONIC"&&(r*=2.5):o==="Melancholy"||o==="Dark"?(e==="SUBMEDIANT"&&(r*=2.2),e==="SUPERTONIC"&&(r*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(e==="SUBDOMINANT"&&(r*=2),e==="SUBMEDIANT"&&(r*=1.6),e==="MEDIANT"&&(r*=1.4)):o==="Tense"?(e==="SUPERTONIC"||e==="SUBDOMINANT")&&(r*=1.8):(o==="Groovy"||o==="Energetic")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.8),(It[o]||[]).includes(e)&&(r*=1.3),Math.max(.01,r)}function at(e,t,i="MAJOR",o="Pop",s="Uplifting"){if(e===t)return .05;let n=(xs[e]||{})[t]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(e==="TONIC"&&t==="SUBMEDIANT"&&(n*=1.5),e==="SUBMEDIANT"&&t==="MEDIANT"&&(n*=1.4),e==="MEDIANT"&&t==="SUBTONIC"&&(n*=1.4),e==="SUBTONIC"&&t==="TONIC"&&(n*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(e==="SUPERTONIC"&&t==="DOMINANT"&&(n*=1.8),e==="DOMINANT"&&t==="TONIC"&&(n*=1.5),e==="TONIC"&&t==="SUPERTONIC"&&(n*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.5),(It[s]||[]).includes(t)&&(n*=1.5),Math.max(.01,n)}function ks(e,t,i,o,s,r,n=mt){let c=i.filter(a=>e.degrees[a]);c.length||(c=i);const l=ze(c,a=>ws(a,e.type,s,r))||"TONIC",d=[l];let p=l;for(let a=1;a<n;a++){const f=a===n-1;let g=i.filter(v=>e.degrees[v]);g.length||(g=i);const x=g.filter(v=>v!==p),m=x.length?x:g;if(f){const v=ze(m,k=>{const S=at(k,d[0],e.type,s,r),I=at(p,k,e.type,s,r);return S*I});d.push(v)}else{const v=m.filter(I=>!d.includes(I)),k=v.length?v:m,S=ze(k,I=>at(p,I,e.type,s,r));p=S,d.push(S)}}return d}function D(e,t){const i=(e%12+12)%12;return t?cs[i]:ls[i]}function Ct(e){const t=e[0]?.toUpperCase();let i="C",o=e;t&&/[A-G]/.test(t)&&(e[1]==="B"?(i=`${t}b`,o=e.slice(2)):e[1]==="#"?(i=`${t}#`,o=e.slice(2)):(i=t,o=e.slice(1))),o=o.toLowerCase();let s="maj";return o.includes("maj7")?s="maj7":o.includes("min7")||o.includes("m7")?s="min7":o.includes("dim7")?s="dim7":o.includes("dim")?s="dim":o.includes("aug")?s="aug":o.includes("sus")?s="sus4":o==="7"?s="dom7":o.includes("min")||o==="m"?s="min":s="maj",{root:i,quality:s}}function Me(e,t){const{root:i,quality:o}=Ct(e),s=Q[i]??0;return He[o].map(n=>D(s+n,t))}async function jt(){const e=typeof import.meta<"u"?"./":"/",t=e.endsWith("/")?e:`${e}/`,i=`${t}chroma_chords_data.json`,o=`${t}chord_voyager_data.json`;let s=await fetch(i).catch(()=>null);if((!s||!s.ok)&&(s=await fetch(o).catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chroma_chords_data.json").catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chord_voyager_data.json").catch(()=>null)),!s||!s.ok){const n=new URL("./chroma_chords_data.json",import.meta.url).href;s=await fetch(n)}if(!s.ok)throw new Error(`HTTP error: ${s.status}`);const r=await s.json();return Ms(r),r}const Ss={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Ts={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Is={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},As={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Cs={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Ns={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Ms(e){const t=[["MIXOLYDIAN",Ss],["DORIAN",Ts],["LYDIAN",Is]];for(const[i,o]of t)for(const[s,r]of Object.entries(o)){const n=e.scales[`${r}_MAJOR`];if(!n)continue;const c=`${s}_${i}`,l={};for(const d of Ns[i]){const p=Cs[`${i}_${d}`],a=n.degrees[p];if(!a)continue;const f=JSON.parse(JSON.stringify(a));f.next_chord_options=(f.next_chord_options||[]).map(g=>{if(g.nodeId.startsWith(`${r}_MAJOR_`)){const x=g.nodeId.replace(`${r}_MAJOR_`,""),m=As[`${i}_${x}`];if(m)return{name:g.name,nodeId:`${s}_${i}_${m}`}}return g}),l[d]=f}e.scales[c]={root:s,type:i,degrees:l}}}const $s=[156,192,236],Es=[242,115,95];function je(e,t,i){return e+(t-e)*i}function We(e){const t=Math.max(0,Math.min(1,e));return"#"+$s.map((o,s)=>Math.round(je(o,Es[s],t))).map(o=>o.toString(16).padStart(2,"0")).join("")}function $e(e){const t=Math.max(0,Math.min(1,e));return{size:Math.round(je(84,128,t)),radius:Math.round(je(40,12,t)),fontSize:Math.round(je(21,30,t)),color:We(t)}}function Os(e,t,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[e]||`${i} colors the progression as the ${e.toLowerCase()} of ${t}.`}function mi(e,t,i,o){const r=i.degrees[t].chord_name,n=us[t]??.5,c=gt[i.type]||gt.MAJOR;return{name:Gt(r),tag:ps[t]||"move",roman:c[t]||"?",color:We(n),functionLabel:Ut[t]||t,notes:Me(r,o),scaleLabel:`${i.root} ${zt[i.type]||i.type}`,desc:Os(Ut[t]||t,zt[i.type]||i.type,Gt(r)),degree:t,scaleKey:e,tension:n}}function Gt(e){const{root:t,quality:i}=Ct(e);return`${t}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const Ds={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function fi(e,t){let i=Ds[e]||92;return t==="Tense"&&(i+=6),(t==="Dreamy"||t==="Melancholy")&&(i-=6),i}function ft(e,t,i,o){const s=Math.max(ue,Math.min(ee,o?.length??mt)),r=ms[t]||"MAJOR",n=fs[i],c=o?.scaleType||(n&&r==="MAJOR"?n:r);let l=o?.key&&be.includes(o.key)?o.key:ys(be),d=`${l}_${c}`;e.scales[d]||(l="C",d=`${l}_${c}`);let p=e.scales[d];if(!p){const I=Object.keys(e.scales).find(w=>w.endsWith(`_${c}`))||Object.keys(e.scales)[0];p=e.scales[I],l=p?p.root:"C",d=I}const a=oe(l,c),f=Object.keys(p.degrees),g=It[i]||[],x=bs[c]||[],m=s===mt?x.filter(I=>I.degrees.every(w=>f.includes(w))):[],S=(m.length&&Math.random()<.25?ze(m,I=>vs(I,g)).degrees:ks(p,d,f,g,t,i,s)).map(I=>mi(d,I,p,a));return{genre:t,mood:i,key:l,scaleType:c,bpm:fi(t,i),chords:S}}function Bs(e,t,i,o,s,r){const n=`${t}_${i}`,c=e.scales[n];if(!c||!o.length)return null;const l=oe(t,i),d=Q[t]??0,p={};Object.entries(c.degrees).forEach(([f,g])=>{const{root:x}=Ct(g.chord_name),m=Q[x]??0;m in p||(p[m]=f)});const a=o.slice(0,ee).map(({root:f,quality:g})=>{const x=Q[f]??d,m=p[x];if(m)return mi(n,m,c,l);const v=(x-d+12)%12,k=He[g]?g:"maj";return Fs(t,v,k,"Borrowed","?","drift",l)});return a.length<ue?null:{genre:s,mood:r,key:t,scaleType:i,bpm:fi(s,r),chords:a}}const Ps={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Fs(e,t,i,o,s,r,n){const c=(Q[e]??0)+t,d=`${D(c,n)}${Ps[i]}`,p=He[i].map(f=>D(c+f,n)),a=.3;return{name:d,tag:r,roman:s,color:We(a),functionLabel:o,notes:p,scaleLabel:"Borrowed",desc:`${d} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:a}}function bt(e){const t=e.match(/^[A-Ga-g][#b]?/),i=t?t[0]:"C";return i[0].toUpperCase()+i.slice(1)}const Vt={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Ge(e,t,i,o){const s=Q[e]??0;let r=Vt[t]||Vt.Major;return i==="6th"?r=[...r,9]:i==="7th (dom / m7)"?r=[...r,10]:i==="Major 7th (M7)"?r=[...r,11]:i==="9th"&&(r=[...r,10,14]),r.map(n=>D(s+n,o))}const _s={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Rs={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function bi(e,t,i){return t==="Minor"&&i==="Major 7th (M7)"?`${e}m(maj7)`:`${e}${_s[t]??""}${Rs[i]??""}`}const vi=["C","D","E","F","G","A","B"],Nt=10,Ve=vi.indexOf("E")+4*7,Ls=Ve+4*2,vt=20,yi=vt+4*Nt,Us={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},zs={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},xi={};be.forEach(e=>{xi[Q[e]]=e});function wi(e,t){const i=zs[t]??0,s=(((Q[e]??0)-i)%12+12)%12;return xi[s]??"C"}function ki(e,t){return Us[wi(e,t)]??[]}function oe(e,t){const i=wi(e,t);return ds.has(i)||i.includes("b")}function _e(e,t){return D(Q[e]??0,oe(e,t))}const Yt={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function js(e){let t=4,i=-1;return e.map(o=>{const s=vi.indexOf(o[0].toUpperCase());return i!==-1&&s<=i&&t++,i=s,s+t*7})}function he(e){return yi-(e-Ve)*(Nt/2)}const Te=10,lt=46,qt=26,Ht=14;function Gs(e,t,i){const o=ki(t,i),s=8,r=o.length?o.length*s+6:0,n=o.map(S=>Yt[S]),c=e.map(S=>js(S.notes)),l=c.flat(),d=Math.min(vt,...l.map(he),...n.map(he)),p=Math.max(yi,...l.map(he),...n.map(he)),a=Te+Ht-d,f=p-d+12+Te+Ht,g=[0,1,2,3,4].map(S=>vt+S*Nt+a),x=Te+qt+r,m=o.map((S,I)=>({x:Te+qt+I*s,y:he(Yt[S])+a,sign:S.includes("#")?"sharp":"flat"})),v=e.map((S,I)=>{const w=x+I*lt+lt/2,O=c[I],_=O.map(F=>({x:w,y:he(F)+a})),K=[];O.forEach(F=>{(F-Ve)%2===0&&(F<Ve||F>Ls)&&K.push({x:w-9,y:he(F)+a})});const b=Math.min(..._.map(F=>F.y))-10;return{cx:w,name:S.name,roman:S.roman,notes:_,ledgers:K,labelY:b}});return{width:x+e.length*lt+Te,height:f,lines:g,keySignature:m,chords:v}}function Vs(e,t,i){const o=bt(e.name),s=o.includes("b");return{...e,name:bi(o,t,i),notes:Ge(o,t,i,s)}}function R(e,t,i,o,s,r,n,c){const l=bi(e,t,i),d=Ge(e,t,i,c);return{name:l,tag:o||"sub",roman:o,color:We(n),functionLabel:s,notes:d,scaleLabel:"Substitution",desc:r,degree:"SUBSTITUTION",scaleKey:"",tension:n}}function Si(e,t,i){const o=Q[t.key]??0,s=t.scaleType.includes("MINOR"),r=oe(t.key,t.scaleType),n=s?[(()=>{const p=D(o+1,!0),a=R(p,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:a.name,roman:"♭II",notes:a.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:a,tension:.6}})(),(()=>{const p=D(o+5,!0),a=R(p,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:a.name,roman:"iv",notes:a.notes,sub:"the minor subdominant — deeper minor mood",chord:a,tension:.45}})(),(()=>{const p=D(o+10,!0),a=R(p,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:a.name,roman:"v",notes:a.notes,sub:"a step further into shadow — unresolving drift",chord:a,tension:.52}})()]:[(()=>{const p=D(o+8,!0),a=R(p,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${t.key} minor — the cinematic shadow`,.5,!0);return{name:a.name,roman:"♭VI",notes:a.notes,sub:`borrowed from ${t.key} minor — the cinematic shadow`,chord:a,tension:.5}})(),(()=>{const p=D(o+5,!0),a=R(p,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:a.name,roman:"iv",notes:a.notes,sub:"the minor subdominant — softer, sadder",chord:a,tension:.42}})(),(()=>{const p=D(o+3,!0),a=R(p,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:a.name,roman:"♭III",notes:a.notes,sub:"a step further out — cooler, more remote",chord:a,tension:.58}})()],c=[(()=>{const p=D(o+7,r),a=D(o+2,r),f=R(a,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${p}7 — sharpens the approach`,.82,r);return{name:f.name,roman:"V7/V",notes:f.notes,sub:`aimed at ${p}7 — sharpens the approach`,chord:f,tension:.82}})(),(()=>{const p=D(o+(s?3:9),r),a=D(o+4,r),f=R(a,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${p}m7 — makes it feel arrived at`,.88,r);return{name:f.name,roman:"V7/vi",notes:f.notes,sub:`aimed at ${p}m7 — makes it feel arrived at`,chord:f,tension:.88}})(),(()=>{const p=D(o+1,!0),a=R(p,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:a.name,roman:"subV7",notes:a.notes,sub:"a tritone substitute — slides in sideways",chord:a,tension:.95}})()],l=[(()=>{const p=D(o+5,r),a=R(p,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,r);return{name:a.name,roman:"IV",notes:a.notes,sub:"floats rather than resolving",chord:a,tension:.3}})(),(()=>{const p=D(o,r),a=R(p,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,r);return{name:a.name,roman:s?"im9":"Imaj9",notes:a.notes,sub:"the same home with more air in it",chord:a,tension:.18}})(),(()=>{const p=D(o+(s?3:4),r),a=R(p,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,r);return{name:a.name,roman:s?"♭III":"iii",notes:a.notes,sub:"wistful, halfway between home and away",chord:a,tension:.35}})()],d=[(()=>{const p=D(o,r),a=R(p,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,r);return{name:a.name,roman:s?"i":"I",notes:a.notes,sub:"full resolution — the sense of arriving",chord:a,tension:.05}})(),(()=>{const p=D(o+7,r),a=R(p,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,r);return{name:a.name,roman:"V7",notes:a.notes,sub:"the pull that makes home feel earned",chord:a,tension:1}})(),(()=>{const p=D(o+(s?8:9),r),a=R(p,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,r);return{name:a.name,roman:s?"♭VI":"vi",notes:a.notes,sub:"a soft landing instead of a full stop",chord:a,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:n},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:c},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:l},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:d}]}function Ys(e,t,i){const o=Q[t.key]??0,s=t.scaleType.includes("MINOR"),r=oe(t.key,t.scaleType),n=t.chords;if(s){const m=n[0]?.name||"chord 1",v=n[1]?.name||"chord 2",k=n[2]?.name||"chord 3",S=n[3]?.name||"chord 4",I=R(D(o,r),"Major","None","I","Major tonic","same root, turned bright",.2,r),w=R(D(o+5,r),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,r),O=R(D(o+9,r),"Minor","None","vi","Submediant","melodic lift upward",.4,r),_=R(D(o+11,r),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,r);return[{name:I.name,sub:`in place of ${m} · same root, turned bright`,roman:"I",notes:I.notes,chord:I,tension:.2},{name:w.name,sub:`in place of ${v} · the Dorian lift, sunny and open`,roman:"IV",notes:w.notes,chord:w,tension:.35},{name:O.name,sub:`in place of ${k} · melodic lift upward`,roman:"vi",notes:O.notes,chord:O,tension:.4},{name:_.name,sub:`in place of ${S} · classical harmonic pull`,roman:"vii°",notes:_.notes,chord:_,tension:.55}]}const c=n[0]?.name||"chord 1",l=n[1]?.name||"chord 2",d=n[2]?.name||"chord 3",p=n[3]?.name||"chord 4",a=R(D(o,r),"Minor","None","i","Tonic minor","same root, turned sad",.3,r),f=R(D(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),g=R(D(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),x=R(D(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:a.name,sub:`in place of ${c} · same root, turned sad`,roman:"i",notes:a.notes,chord:a,tension:.3},{name:f.name,sub:`in place of ${l} · the lift, but heavier`,roman:"iv",notes:f.notes,chord:f,tension:.4},{name:g.name,sub:`in place of ${d} · big and cinematic`,roman:"♭VI",notes:g.notes,chord:g,tension:.45},{name:x.name,sub:`in place of ${p} · lands sideways, not home`,roman:"♭VII",notes:x.notes,chord:x,tension:.5}]}function qs(e,t,i){return Si(e,t).map(s=>{const r=s.rows[0];return{label:s.name,sub:s.sub,chord:r.chord,functionCaption:`${r.roman} · ${r.notes.join(" · ")}`,rationale:r.sub}})}const Hs={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Ws={m8:43303,circuit:43302};function Xs(e,t,i){let o=Hs[t];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${Ws[t]}/`);const r=(i&&i.length>0?i.map(n=>e.chords[n]).filter(n=>!!n):e.chords).map(n=>encodeURIComponent(n.name)).join("+");return`${o}?p=${r}`}class Js{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null}setProgression(t,i){this.mode="single",this.progression=t,t?this.order=i||Array.from({length:t.chords.length},(o,s)=>s):this.order=[]}setSong(t){this.mode="song",this.sections=t,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((t,i)=>t+i.order.length,0):this.order.length}setOrder(t,i){this.order=t,typeof i=="number"&&(this.activeIndex=i)}setInstrument(t){this.instrument=t}setPlayStyle(t){this.playStyle=t}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(t){return this.tickCallbacks.add(t),()=>this.tickCallbacks.delete(t)}notifyTick(){const t=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,t,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,t,!1))}updateSongStepState(t){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(t<i+s){this.activeSectionIndex=o;const r=t-i;this.activeIndex=this.sections[o].order[r]??0,this.progressStep=r;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const t=this.getTotalSteps();if(t<=0)return;this.songStep=(this.songStep+1)%t,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},At)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(t,i,o){t===null?this.abOverride=null:this.abOverride={index:t,chord:i,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const t=this.sections[this.activeSectionIndex];if(!t)return;const i=this.activeIndex,o=t.progression.chords[i];if(o){const r=(o.notes&&o.notes.length>0?o.notes:Me(o.name,oe(t.progression.key,t.progression.scaleType))).map(n=>`${n}4`);Lt(r,t.progression.genre,{bpm:t.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const t=this.order[this.activeIndex]??0;let i=this.progression.chords[t];if(this.abOverride&&this.abOverride.index===t&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",r=this.progression.key||"C",n=this.progression.scaleType||"MAJOR";o=Me(s,oe(r,n))}this.playChordNotes(o,1.2)}}}playChordAtIndex(t,i=.8){if(!this.progression||!this.progression.chords[t])return;const o=this.progression.chords[t];let s=Array.isArray(o.notes)?o.notes:[];if(s.length===0||!s.every(r=>typeof r=="string"&&r.trim().length>0)){const r=o.name||"CMAJ",n=this.progression.key||"C",c=this.progression.scaleType||"MAJOR";s=Me(r,oe(n,c))}this.playChordNotes(s,i)}playChordNotes(t,i){if(!this.progression)return;const o=Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.trim().length>0):[];if(o.length===0)return;const r=o.map(n=>n.replace(/\d+$/,"")).map(n=>`${n}4`);Lt(r,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}jumpToStep(t){!this.progression||this.order.length<=0||(this.activeIndex=t%this.order.length,this.progressStep=t%this.order.length,this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const T=new Js,Ks=le.map(e=>e.name),Qs=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Zs(e,t){const i=e.length+1,o=t.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let r=0;r<i;r++)s[r][0]=r;for(let r=0;r<o;r++)s[0][r]=r;for(let r=1;r<i;r++)for(let n=1;n<o;n++)s[r][n]=e[r-1]===t[n-1]?s[r-1][n-1]:1+Math.min(s[r-1][n-1],s[r-1][n],s[r][n-1]);return s[i-1][o-1]}function pe(e,t){if(typeof e!="string")return null;const i=e.trim();if(!i)return null;const o=i.toLowerCase(),s=t.find(l=>l.toLowerCase()===o);if(s)return s;let r=null,n=1/0;for(const l of t){const d=Zs(o,l.toLowerCase());d<n&&(n=d,r=l)}const c=Math.max(2,Math.floor(o.length*.4));return n<=c?r:null}function eo(e){if(!Array.isArray(e))return;const t=[];for(const i of e){if(!i||typeof i!="object")continue;const o=i,s=pe(o.root,be),r=pe(o.quality,hs);s&&r&&t.push({root:s,quality:r})}if(t.length)return t.slice(0,ee)}function to(e){if(!e||typeof e!="object"||Array.isArray(e))return;const t=e,i=pe(t.presetId,Qs)??(typeof t.presetId=="string"&&t.presetId.trim()?t.presetId.trim():void 0);if(!i)return;const o=t.customConfig&&typeof t.customConfig=="object"&&!Array.isArray(t.customConfig)?t.customConfig:void 0;return{presetId:i,customConfig:o}}function ct(e,t){const i=e&&typeof e=="object"?e:{},o=pe(i.genre,Ne)??t.genre,s=pe(i.mood,Ks)??t.mood,r=pe(i.key,be)??void 0,n=pe(i.scaleType,gs)??void 0,c=r&&n?eo(i.chords):void 0;let l;typeof i.length=="number"&&Number.isFinite(i.length)&&(l=Math.max(ue,Math.min(ee,Math.round(i.length))));const d=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,p=to(i.instrumentConfig),a=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:r,scaleType:n,length:l,chords:c,rhythmStyle:d,instrumentConfig:p,_rateLimit:a}}const io=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],yt=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Ti="chroma-chords-llm-provider",Ii="chroma-chords-llm-model";function Ai(){const e=localStorage.getItem(Ti);return e==="opencodeai"||e==="anthropic"||e==="openrouter"||e==="google"?e:"google"}function so(e){localStorage.setItem(Ti,e)}function Ci(){const e=localStorage.getItem(Ii);return e?e==="gemini-1.5-flash"||e==="gemini-2.0-flash"||e==="gemini-2.5-flash"||e==="gemini-3.5-flash"||e==="gemini-1.5-pro"?"gemini-3.1-flash-lite":e:yt[0].id}function dt(e){localStorage.setItem(Ii,e)}const ht={genre:Ne[0],mood:le[0].name},Ni="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",oo=12e3;async function ro(){try{const e=await fetch(Ni);if(e.ok)return await e.json()}catch{}return null}const Mi={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},$i={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Ye(e,t){const i=e.toLowerCase();let o=null,s=0;return Object.keys(t).forEach(r=>{const n=t[r].reduce((c,l)=>c+(i.includes(l)?1:0),0);n>s&&(s=n,o=r)}),o}function Ei(e){const t=Ye(e,$i),i=Ye(e,Mi);return!t||!i?null:{genre:t,mood:i}}async function no(e){const t=new AbortController,i=setTimeout(()=>t.abort(),oo);try{const s=await fetch(Ni,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e,provider:Ai(),model:Ci()}),signal:t.signal}),r=await s.json().catch(()=>null);if(!s.ok||r&&typeof r=="object"&&"error"in r){const n=r&&typeof r=="object"&&"error"in r?String(r.error):`HTTP ${s.status}`,c=new Error(`Classifier request failed: ${n}`);throw r&&typeof r=="object"&&"_rateLimit"in r&&(c._rateLimit=r._rateLimit),c}return r}finally{clearTimeout(i)}}async function ao(e){const t=e.trim(),i=t.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=t.replace(/^(mock|test)\s*:?\s*/i,"").trim(),r=Ye(s,$i)??"Synthwave",n=Ye(s,Mi)??"Dreamy",c={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},l={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},d={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},p=d[r]||d._default,a=c[r]||"rhodes",f=l[r]||"slow_arpeggio",g={genre:r,mood:n,key:p.key,scaleType:p.scaleType,length:8,chords:p.chords,rhythmStyle:f,instrumentConfig:{presetId:a,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ct(g,{genre:r,mood:n})}const o=Ei(e);try{const s=await no(e);return ct(s,o??ht)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const r=ct(o??ht,ht);return s&&typeof s=="object"&&"_rateLimit"in s&&(r._rateLimit=s._rateLimit),r}}class lo{static async resolvePrompt(t,i,o,s,r,n){let c=n||null,l=null,d=null;if(!c&&r&&r.trim().length>0)try{c=await ao(r)}catch(f){console.warn("Failed to classify prompt via LLM/local fallback:",f)}const p=!!(c&&c.chords?.length&&c.key&&c.scaleType);let a=null;return p&&c&&c.chords&&c.key&&c.scaleType&&(a=Bs(t,c.key,c.scaleType,c.chords,c.genre||i,c.mood||o)),a||(a=ft(t,i,o,{length:s})),p&&c&&(c.instrumentConfig?.presetId&&(l=rs(c.instrumentConfig.presetId)??null),c.rhythmStyle&&(d=ns(c.rhythmStyle)??null)),a.chords.length>s&&(a={...a,chords:a.chords.slice(0,s)}),r&&(a={...a,searchTerm:r}),{progression:a,instrument:l,playStyle:d,normalizedSuggestion:c}}}const Ae=[{name:"Verse",desc:"Settled, familiar.",reorder:e=>Array.from({length:e},(t,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:e=>Array.from({length:e},(t,i)=>(i+Math.ceil(e/2))%e)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:e=>Array.from({length:e},(t,i)=>(i+1)%e)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:e=>Array.from({length:e},(t,i)=>e-1-i)},{name:"Outro",desc:"Settles back down.",reorder:e=>Array.from({length:e},(t,i)=>(i-1+e)%e)}];class Re{static createInitialSong(t,i){const o=i||Array.from({length:t.chords.length},(s,r)=>r);return[{name:Ae[0].name,desc:Ae[0].desc,progression:t,order:o.slice()}]}static addSection(t,i){if(t.length>=Ae.length)return{sections:t,activeIndex:t.length-1};const o=Ae[t.length],s=o.reorder(i.chords.length),r={name:o.name,desc:o.desc,progression:i,order:s},n=[...t,r];return{sections:n,activeIndex:n.length-1}}static syncActiveSection(t,i,o,s){if(!t[i])return t;const r=[...t];return r[i]={...r[i],progression:o,order:s.slice()},r}}var co=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,Mt=(e,t,i,o)=>{for(var s=o>1?void 0:o?ho(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&co(t,i,s),s};const xt=["bean","bird","cat","note"];function ye(e=.45){return{show:Math.random()<e,kind:xt[Math.floor(Math.random()*xt.length)]}}function Ee(e){return e[Math.floor(Math.random()*e.length)]}class $t{constructor(t=7,i=1800){this.threshold=t,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const t=Date.now();return t-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=t,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const po={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Oe=class extends q{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(e){if(e.has("kind")||e.has("scale")){const{width:t,height:i}=po[this.kind];this.style.width=`${t*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const e="#D98A54";return h`
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
    `}renderBird(){const e="#7C93A8",t="#E8A24A";return h`
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
    `}renderCat(){const e="#8FA888";return h`
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
    `}renderNote(){const e="#B7A6DE",t="#8672B0";return h`
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
    `}render(){const e=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return e?h`<div style="transform:scale(${this.scale}); transform-origin:top left;">${e}</div>`:di}};Oe.styles=Y`
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
  `;Mt([y({type:String})],Oe.prototype,"kind",2);Mt([y({type:Number})],Oe.prototype,"scale",2);Oe=Mt([H("mascot-character")],Oe);var uo=Object.defineProperty,go=Object.getOwnPropertyDescriptor,Et=(e,t,i,o)=>{for(var s=o>1?void 0:o?go(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&uo(t,i,s),s};const wt=3200;let De=class extends q{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(e){e.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},wt))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?h`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${xt.map(e=>h`<mascot-character .kind=${e} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:di}};De.styles=Y`
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
      animation: egg-pop ${wt}ms ease forwards;
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
      animation: egg-caption-pop ${wt}ms ease forwards;
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
  `;Et([y({type:Number})],De.prototype,"trigger",2);Et([u()],De.prototype,"visible",2);De=Et([H("mascot-parade")],De);var mo=Object.defineProperty,fo=Object.getOwnPropertyDescriptor,J=(e,t,i,o)=>{for(var s=o>1?void 0:o?fo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&mo(t,i,s),s};let V=class extends q{constructor(){super(...arguments),this.compact=!1,this.capacityCharges=4,this.capacityMax=4,this.rechargeNextSec=60,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.onKeyDown=e=>{e.key==="Escape"&&this.closeOverlays()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown),this.unsubscribeProjects=z.subscribeProjects(e=>{this.savedCount=e.length,this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown),this.unsubscribeProjects&&(this.unsubscribeProjects(),this.unsubscribeProjects=null)}closeOverlays(){this.accountMenuOpen=!1,this.showCapacityNote=!1}toggleCapacityNote(){this.accountMenuOpen=!1,this.showCapacityNote=!this.showCapacityNote}toggleAccountMenu(){this.showCapacityNote=!1,this.accountMenuOpen=!this.accountMenuOpen}onSignInClick(){this.closeOverlays(),this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOutClick(){this.closeOverlays(),this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSetsClick(e){e.preventDefault(),this.closeOverlays(),this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNowClick(){this.closeOverlays(),this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}onBrandingClick(){this.dispatchEvent(new CustomEvent("wordmark-click",{bubbles:!0,composed:!0}))}render(){const e=this.capacityCharges<=1,t=Math.floor(this.rechargeNextSec/60),i=String(this.rechargeNextSec%60).padStart(2,"0"),o=`${t}:${i}`,s=this.capacityCharges>0?`${this.capacityCharges} left`:`+1 in ${o}`,r=this.capacityCharges>0?`${this.capacityCharges} of ${this.capacityMax} AI generates left. One comes back every ${this.rechargeNextSec>0?this.rechargeNextSec:60}s.`:`You've used all ${this.capacityMax} AI generates. The next one unlocks in ${o}.`,n=(this.userEmail?this.userEmail.charAt(0):"U").toUpperCase(),c=this.userEmail?this.userEmail.split("@")[0]:"Signed in";return h`
      <div class="header-wrap">
        <div class="branding" @click=${this.onBrandingClick}>
          <svg width="${this.compact?20:24}" height="${this.compact?20:24}" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <div class="brand-title">${this.title}</div>
        </div>

        <div class="actions-group">
          <button
            class="capacity-chip ${e?"low":""}"
            @click=${this.toggleCapacityNote}
            aria-label="AI generates remaining"
          >
            <span class="pips-wrap">
              ${Array.from({length:this.capacityMax},(l,d)=>h`
                <span class="pip ${d<this.capacityCharges?"filled":""} ${e?"low":""}"></span>
              `)}
            </span>
            <span>${s}</span>
          </button>

          ${this.isAuthenticated?h`
            <button
              class="btn-account ${this.accountMenuOpen?"active":""}"
              @click=${this.toggleAccountMenu}
              aria-haspopup="menu"
              aria-label="Account and saved sets"
            >
              ${n}
            </button>
          `:h`
            <button class="btn-sign-in" @click=${this.onSignInClick}>Sign in</button>
          `}
        </div>

        ${this.showCapacityNote||this.accountMenuOpen?h`
          <div class="backdrop-overlay" @click=${this.closeOverlays}></div>
        `:""}

        ${this.showCapacityNote?h`
          <div class="popover-panel capacity-note-panel">
            ${r}
          </div>
        `:""}

        ${this.accountMenuOpen?h`
          <div class="popover-panel account-menu" role="menu">
            <div class="account-header">
              <div class="account-name">${c}</div>
              <div class="sync-status">
                <span class="sync-dot"></span>
                ${this.syncStatus==="syncing"?"Syncing...":"Synced just now"}
              </div>
            </div>
            <button class="menu-item" @click=${this.onViewSetsClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A6B3F" style="flex-shrink:0;">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
              <span>Your sets</span>
              <span class="menu-badge">${this.savedCount}</span>
            </button>
            <button class="menu-item" @click=${this.onSyncNowClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M20 11a8 8 0 0 0-13.7-5.6L3 8"/>
                <path d="M3 4v4h4"/>
                <path d="M4 13a8 8 0 0 0 13.7 5.6L21 16"/>
                <path d="M21 20v-4h-4"/>
              </svg>
              <span>Sync now</span>
            </button>
            <div class="menu-divider"></div>
            <button class="menu-item muted" @click=${this.onSignOutClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <path d="M16 17l5-5-5-5"/>
                <path d="M21 12H9"/>
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        `:""}
      </div>
    `}};V.styles=Y`
    :host {
      display: block;
      width: 100%;
      position: relative;
      z-index: 50;
      box-sizing: border-box;
    }
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 24px 36px 8px;
      box-sizing: border-box;
    }
    :host([compact]) .header-wrap {
      padding: 16px 16px 6px;
    }
    @media (max-width: 600px) {
      .header-wrap {
        padding: 16px 16px 6px;
      }
    }

    .branding {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }
    .brand-title {
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: #2E271F;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([compact]) .brand-title,
    @media (max-width: 600px) {
      .brand-title {
        font-size: 13.5px;
      }
    }

    .actions-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .capacity-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 34px;
      padding: 0 13px;
      border-radius: 100px;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      background: #F1E4CC;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      color: #6B5F50;
      cursor: pointer;
      white-space: nowrap;
      transition: background 300ms ease, border-color 300ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .capacity-chip:hover {
      background: #EADBBE;
    }
    .capacity-chip.low {
      border-color: rgba(224, 138, 60, 0.5);
      background: rgba(224, 138, 60, 0.14);
      color: #A0632A;
    }
    .pips-wrap {
      display: flex;
      gap: 3px;
      align-items: center;
    }
    .pip {
      width: 6px;
      height: 6px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.18);
      transition: background 300ms ease;
    }
    .pip.filled {
      background: #F2735F;
    }
    .pip.filled.low {
      background: #E08A3C;
    }

    .btn-sign-in {
      display: inline-flex;
      align-items: center;
      height: 34px;
      padding: 0 16px;
      border-radius: 100px;
      border: none;
      background: #2E271F;
      color: #F4EBDB;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), background 150ms ease;
    }
    .btn-sign-in:hover {
      background: #42382D;
    }
    .btn-sign-in:active {
      transform: scale(0.96);
    }

    .btn-account {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      background: #F2A79B;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: border-color 200ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .btn-account.active {
      border-color: rgba(46, 39, 31, 0.4);
    }
    .btn-account:hover {
      transform: scale(1.05);
    }
    .btn-account:active {
      transform: scale(0.96);
    }

    .popover-panel {
      position: absolute;
      right: 36px;
      top: 66px;
      z-index: 60;
      box-sizing: border-box;
      background: #FBF6EC;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      box-shadow: 0 22px 46px -24px rgba(46, 39, 31, 0.7);
      text-align: left;
      animation: popover-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    :host([compact]) .popover-panel,
    @media (max-width: 600px) {
      .popover-panel {
        right: 16px;
        top: 56px;
      }
    }

    @keyframes popover-in {
      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .capacity-note-panel {
      width: 256px;
      padding: 14px 16px;
      font-size: 12.5px;
      line-height: 1.55;
      font-weight: 600;
      color: #6B5F50;
    }

    .account-menu {
      width: 240px;
      padding: 8px;
    }
    .account-header {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      margin-bottom: 6px;
    }
    .account-name {
      font-size: 13.5px;
      font-weight: 800;
      color: #2E271F;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sync-status {
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
    .menu-item {
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
      color: #2E271F;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .menu-item:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .menu-item.muted {
      color: #6B5F50;
    }
    .menu-badge {
      background: rgba(138, 107, 63, 0.18);
      color: #8A6B3F;
      border-radius: 100px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      margin-left: auto;
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 6px 12px;
    }
    .backdrop-overlay {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: transparent;
    }
  `;J([y({type:Boolean})],V.prototype,"compact",2);J([y({type:Number})],V.prototype,"capacityCharges",2);J([y({type:Number})],V.prototype,"capacityMax",2);J([y({type:Number})],V.prototype,"rechargeNextSec",2);J([y({type:Boolean})],V.prototype,"isAuthenticated",2);J([y({type:String})],V.prototype,"userEmail",2);J([y({type:Number})],V.prototype,"savedCount",2);J([y({type:String})],V.prototype,"syncStatus",2);J([y({type:String})],V.prototype,"title",2);J([u()],V.prototype,"accountMenuOpen",2);J([u()],V.prototype,"showCapacityNote",2);V=J([H("app-header")],V);var bo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,E=(e,t,i,o)=>{for(var s=o>1?void 0:o?vo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&bo(t,i,s),s};const yo=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],W=4,ne=45e3,Wt="chroma_chords_capacity_v2",xo=["#F2A79B","#9CC0EC","#F6D98B"],wo=[6,3,12],Xt=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],ko=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],So=["Warm","Melancholy","Nostalgic","Dreamy"],pt=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let M=class extends q{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=ye(.35),this.mascotSlot=Ee(yo),this.peekMascot=ye(.18),this.peekSide=Ee(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.isGenerating=!1,this.currentProvider=Ai(),this.currentModel=Ci(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=W,this.rechargeNextSec=45,this.showCapacityNote=!1,this.lastCapacityTime=Date.now(),this.capacityTimer=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new $t,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const e=performance.now(),t=this.getBoundingClientRect(),i=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let o=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const s=this.shadowRoot?.querySelector(".divider-row");if(s){const c=s.getBoundingClientRect();c.top>t.top&&(o=c.top-t.top)}const r=this.jellyBodies,n=r.length;for(let c=0;c<n;c++){const l=r[c];if(l.vx+=Math.sin(e*6e-4*l.driftFreqX+l.driftPhaseX)*l.driftForce,l.vy+=Math.cos(e*7e-4*l.driftFreqY+l.driftPhaseY)*l.driftForce,this.mouseX!==null&&this.mouseY!==null){const a=l.x-this.mouseX,f=l.y-this.mouseY,g=Math.hypot(a,f);if(g<140&&g>0){const x=(1-g/140)*.12;l.vx+=a/g*x,l.vy+=f/g*x}}l.vx*=l.drag,l.vy*=l.drag;const d=Math.hypot(l.vx,l.vy);d>l.maxSpeed&&(l.vx=l.vx/d*l.maxSpeed,l.vy=l.vy/d*l.maxSpeed),l.x+=l.vx,l.y+=l.vy,l.angle+=l.vRot;const p=l.radius;l.x<p?(l.x=p,l.vx=Math.abs(l.vx)*l.restitution+.02,l.squishX=.88,l.squishY=1.12):l.x>i-p&&(l.x=i-p,l.vx=-Math.abs(l.vx)*l.restitution-.02,l.squishX=.88,l.squishY=1.12),l.y<p?(l.y=p,l.vy=Math.abs(l.vy)*l.restitution+.02,l.squishX=1.12,l.squishY=.88):l.y>o-p&&(l.y=o-p,l.vy=-Math.abs(l.vy)*l.restitution-.02,l.squishX=1.12,l.squishY=.88),l.squishX+=(1-l.squishX)*.08,l.squishY+=(1-l.squishY)*.08}for(let c=0;c<n;c++)for(let l=c+1;l<n;l++){const d=r[c],p=r[l],a=p.x-d.x,f=p.y-d.y,g=Math.hypot(a,f),x=d.radius+p.radius;if(g<x&&g>0){const m=x-g,v=a/g,k=f/g;d.x-=v*m*.4,d.y-=k*m*.4,p.x+=v*m*.4,p.y+=k*m*.4;const S=d.vx-p.vx,I=d.vy-p.vy,w=(v*S+k*I)/(d.mass+p.mass),O=.35;d.vx-=w*p.mass*v*O,d.vy-=w*p.mass*k*O,p.vx+=w*d.mass*v*O,p.vy+=w*d.mass*k*O;const _=.12;d.squishX=Math.max(.85,1-_*Math.abs(v)),d.squishY=Math.max(.85,1-_*Math.abs(k)),p.squishX=Math.max(.85,1-_*Math.abs(v)),p.squishY=Math.max(.85,1-_*Math.abs(k))}}if(this.shadowRoot)for(let c=0;c<n;c++){const l=r[c],d=this.shadowRoot.getElementById(`jelly-${l.id}`);d&&(d.style.transform=`translate3d(${l.x-l.radius}px, ${l.y-l.radius}px, 0) rotate(${l.angle}deg) scale(${l.squishX}, ${l.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(!this.isGenerating){if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}}initCapacity(){try{const e=localStorage.getItem(Wt),t=Date.now();if(e){const i=JSON.parse(e),o=typeof i.charges=="number"?i.charges:W,s=typeof i.lastTime=="number"?i.lastTime:t;if(o<W){const r=Math.max(0,t-s),n=Math.floor(r/ne);this.capacityCharges=Math.min(W,o+n);const c=r%ne;this.rechargeNextSec=Math.max(1,Math.ceil((ne-c)/1e3)),this.lastCapacityTime=t-c}else this.capacityCharges=W,this.rechargeNextSec=45,this.lastCapacityTime=t}else this.capacityCharges=W,this.rechargeNextSec=45,this.lastCapacityTime=t}catch{this.capacityCharges=W,this.rechargeNextSec=45}this.saveCapacity(),this.startCapacityRechargeTimer()}saveCapacity(){try{localStorage.setItem(Wt,JSON.stringify({charges:this.capacityCharges,lastTime:this.lastCapacityTime}))}catch{}}startCapacityRechargeTimer(){this.capacityTimer&&clearInterval(this.capacityTimer),this.capacityTimer=setInterval(()=>{if(this.capacityCharges<W){const e=Date.now(),t=Math.max(0,e-this.lastCapacityTime);if(t>=ne){const o=Math.floor(t/ne);this.capacityCharges=Math.min(W,this.capacityCharges+o),this.lastCapacityTime=e-t%ne,this.saveCapacity()}const i=(e-this.lastCapacityTime)%ne;this.rechargeNextSec=Math.max(1,Math.ceil((ne-i)/1e3))}else this.rechargeNextSec=45},1e3)}spendCapacityCharge(){return this.capacityCharges<=0?(this.showCapacityNote=!0,!1):(this.capacityCharges===W&&(this.lastCapacityTime=Date.now()),this.capacityCharges-=1,this.saveCapacity(),!0)}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*pt.length),this.loadingTimer=setInterval(()=>{let e=Math.floor(Math.random()*pt.length);e===this.loadingMsgIdx&&(e=(e+1)%pt.length),this.loadingMsgIdx=e},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(e){this.currentProvider=e,so(e),e==="google"?(this.currentModel=yt[0].id,dt(this.currentModel)):e==="opencodeai"&&(this.currentModel=io[0].id,dt(this.currentModel))}changeModel(e){this.currentModel=e,dt(e)}initJellyBodies(){const e=this.getBoundingClientRect(),t=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let i=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const o=Math.min(i,400),s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],r=3,n=[];for(let c=0;c<r;c++){const l=s[c%s.length],d=l.r+30,p=d+Math.random()*Math.max(100,t-d*2),a=d+Math.random()*Math.max(50,o-d*2),f=.08+Math.random()*.18,g=.35+Math.random()*.25,x=.985,m=.006+Math.random()*.008,v=.35,k=Math.random()*Math.PI*2;n.push({id:c,shapeKey:l.key,width:l.r*2,height:l.r*2,x:p,y:a,vx:Math.cos(k)*f,vy:Math.sin(k)*f,maxSpeed:g,drag:x,driftForce:m,restitution:v,radius:l.r,mass:l.r*l.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=n}onFrameMouseMove(e){const t=this.getBoundingClientRect();this.mouseX=e.clientX-t.left,this.mouseY=e.clientY-t.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){ro().then(e=>{e&&(e.google&&(this.googleLimit=e.google.limit,this.googleRemaining=e.google.remaining,this.googleCooldownSec=e.google.cooldownSeconds),e.openrouter&&(this.orLimit=e.openrouter.limit,this.orRemaining=e.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%Xt.length},2800),this.initCapacity(),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(e){super.updated(e),e.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.capacityTimer&&clearInterval(this.capacityTimer),this.stopLoadingTimer()}selectGenre(e){this.dispatchEvent(new CustomEvent("genre-change",{detail:e,bubbles:!0,composed:!0}))}selectMood(e){this.dispatchEvent(new CustomEvent("mood-change",{detail:e,bubbles:!0,composed:!0}))}setLength(e){this.dispatchEvent(new CustomEvent("length-change",{detail:e,bubbles:!0,composed:!0}))}decLength(){this.length>ue&&this.setLength(this.length-1)}incLength(){this.length<ee&&this.setLength(this.length+1)}onFreeTextChange(e){this.freeText=e.target.value}applyBest(e){this.selectGenre(e.genre),this.selectMood(e.mood);const t={...e,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:t,bubbles:!0,composed:!0}))}renderJellySvg(e){switch(e){case"blob1":return h`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return h`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return h`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return h`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return h`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return h`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return h`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return h`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return h`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return h`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return h`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return h`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return h`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return h`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const e=ve(this.mood);let t=ko.filter(a=>Ne.includes(a));t.includes(this.genre)||(t=t.slice(0,-1).concat(this.genre));const i=Ne.filter(a=>!t.includes(a)),o=this.expandedGenre?t.concat(i):t,s=le.map(a=>a.name);let r=So.filter(a=>s.includes(a));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const n=s.filter(a=>!r.includes(a)),l=(this.expandedMood?r.concat(n):r).map(a=>le.find(f=>f.name===a)),d=this.freeText.trim(),p=d.length>2?Ei(d):null;return h`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <app-header
          .capacityCharges=${this.capacityCharges}
          .capacityMax=${W}
          .rechargeNextSec=${this.rechargeNextSec}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          @view-sets=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}
          @request-login=${()=>this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}
          @request-logout=${()=>this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}
          @wordmark-click=${()=>this.onWordmarkClick()}
        ></app-header>

        <div class="aquarium-layer">
          ${this.jellyBodies.map(a=>h`
            <div class="jelly-shape-wrapper" id="jelly-${a.id}" style="transform: translate3d(${a.x-a.radius}px, ${a.y-a.radius}px, 0) rotate(${a.angle}deg) scale(${a.squishX}, ${a.squishY})">
              ${this.renderJellySvg(a.shapeKey)}
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
                @input=${a=>this.onFreeTextChange(a)}
                @keydown=${a=>{a.key==="Enter"&&!this.isGenerating&&(a.preventDefault(),this.generate())}}
                placeholder=${this.isGenerating?"Composing your chords...":Xt[this.placeholderIdx]}
              />
              ${this.isAdmin&&!this.isGenerating?h`
                <button class="vibe-admin-btn" @click=${a=>{a.stopPropagation(),this.showAdminModal=!0}} title="AI Model Configuration">
                  ⚡ ${this.currentProvider==="google"?`Google AI (${this.googleRemaining} left)`:this.currentProvider==="anthropic"?"Claude":`OpenRouter (${this.orRemaining} left)`}
                </button>
              `:""}
              <button
                class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
                style="background: ${e}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
                @click=${a=>{a.stopPropagation(),this.generate()}}
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
                ${this.capacityCharges>0?`${this.capacityCharges} of ${W} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            `:""}
          </div>
          ${p?h`
            <div style="text-align:center;margin-top:10px;">
              <div style="display:inline-flex;align-items:center;gap:6px;border:1.5px solid ${e};color:#2E271F;padding:8px 16px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;background:#FBF3E6;transition:transform 150ms ease;" @click=${()=>this.applyBest(p)}>
                Try <span style="font-weight:800;">${p.genre} · ${p.mood}</span> →
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
            ${o.map(a=>{const f=Ne.indexOf(a);return h`
                <div class="pill ${a===this.genre?"selected":""}" style=${a===this.genre?`background:${e}`:""} @click=${()=>this.selectGenre(a)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${wo[f%3]} fill=${xo[f%3]} />
                    </svg>
                  </div>
                  ${a}
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
            ${l.map(a=>h`
              <div class="pill mood-pill ${a.name===this.mood?"selected":""}" style=${a.name===this.mood?`background:${a.dot}`:""} @click=${()=>this.selectMood(a.name)}>
                <div class="mood-badge" style="background:${a.name===this.mood?"rgba(46,39,31,0.1)":a.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${a.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${a.iconPath} />
                  </svg>
                </div>
                ${a.name}
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
            <div class="length-btn ${this.length<=ue?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:ee},(a,f)=>h`
                <div class="length-segment ${f<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=ee?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button
            class="cta ${this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
            style="background:${e}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
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
              ${p?"Let's go to your progression":"Generate loop"} <span>→</span>
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
            <div class="admin-modal" @click=${a=>a.stopPropagation()}>
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
                    <div class="model-sub-list" @click=${a=>a.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${yt.map(a=>h`
                        <div class="model-sub-opt ${this.currentModel===a.id?"selected":""}" @click=${()=>this.changeModel(a.id)}>
                          <span>${a.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${a.vendor}</span>
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
    `}};M.styles=Y`
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
  `;E([y({type:String})],M.prototype,"genre",2);E([y({type:String})],M.prototype,"mood",2);E([y({type:Number})],M.prototype,"length",2);E([u()],M.prototype,"freeText",2);E([u()],M.prototype,"placeholderIdx",2);E([u()],M.prototype,"llmSuggestion",2);E([u()],M.prototype,"llmResolved",2);E([u()],M.prototype,"classifyError",2);E([u()],M.prototype,"expandedGenre",2);E([u()],M.prototype,"expandedMood",2);E([u()],M.prototype,"mascot",2);E([u()],M.prototype,"mascotSlot",2);E([u()],M.prototype,"peekMascot",2);E([u()],M.prototype,"peekSide",2);E([y({type:Boolean})],M.prototype,"isAuthenticated",2);E([y({type:String})],M.prototype,"userEmail",2);E([y({type:Boolean})],M.prototype,"isAdmin",2);E([y({type:Boolean})],M.prototype,"isGenerating",2);E([u()],M.prototype,"currentProvider",2);E([u()],M.prototype,"currentModel",2);E([u()],M.prototype,"showAdminModal",2);E([u()],M.prototype,"isClassifying",2);E([u()],M.prototype,"loadingMsgIdx",2);E([u()],M.prototype,"googleRemaining",2);E([u()],M.prototype,"googleLimit",2);E([u()],M.prototype,"googleCooldownSec",2);E([u()],M.prototype,"orRemaining",2);E([u()],M.prototype,"orLimit",2);E([u()],M.prototype,"capacityCharges",2);E([u()],M.prototype,"rechargeNextSec",2);E([u()],M.prototype,"showCapacityNote",2);E([u()],M.prototype,"paradeTrigger",2);M=E([H("seed-screen")],M);var To=Object.defineProperty,Io=Object.getOwnPropertyDescriptor,P=(e,t,i,o)=>{for(var s=o>1?void 0:o?Io(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&To(t,i,s),s};const Ao=["C","D","E","F","G","A","B"],Co=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],No=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Mo=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],Jt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."]};let B=class extends q{constructor(){super(...arguments),this.swapIndex=null,this.order=[0,1,2,3],this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=1,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.drillGroup=null,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.abStep=0,this.auditioningChordName=null,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=e=>{e.preventDefault(),this.dragStartY=e.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=e=>{this.dragging&&(this.dragY=Math.max(0,e.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const e=Math.max(1,performance.now()-this.dragStartTime),t=this.dragY/e,i=this.sheetEl?.getBoundingClientRect().height||400,o=this.dragY>i*.3||t>.6;this.snapping=!0,o?(this.dragY=i+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp),this.auditionTimer&&clearTimeout(this.auditionTimer),this.stopABLoop()}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}close(){this.stopABLoop(),this.drillGroup=null,this.abPick=null,this.abSide="before",this.emit("close")}onSheetBackgroundClick(e){e.target===e.currentTarget&&this.close()}stopABLoop(){this.abPlaying=!1,this.loopTimer&&(clearInterval(this.loopTimer),this.loopTimer=void 0)}startABLoop(){this.stopABLoop(),this.abPlaying=!0,this.abStep=0,this.playStepChord(0),this.loopTimer=window.setInterval(()=>{if(!this.abPlaying)return;const e=this.order.length||4;this.abStep=(this.abStep+1)%e,this.playStepChord(this.abStep)},1700)}playStepChord(e){if(!this.progression)return;const t=this.order[e]??e,i=this.swapIndex!==null?t===this.swapIndex:e===this.position-1,s=i&&this.abSide==="after"&&this.abPick&&this.abPick?this.abPick:i?this.abSide==="after"&&this.abPick?this.abPick:this.chord:this.progression.chords[t];s&&this.auditionChordSolo(s)}toggleABLoop(){this.abPlaying?this.stopABLoop():this.startABLoop()}setABSide(e){e==="after"&&!this.abPick||(this.abSide=e,e==="before"?this.auditionChordSolo(this.chord):e==="after"&&this.abPick&&this.auditionChordSolo(this.abPick))}pickCandidate(e){this.stopABLoop(),this.abPick=e,this.abSide="after",this.auditionChordSolo(e)}onCandidatePlayClick(e){this.abPick?.name===e.name&&this.abPlaying?this.stopABLoop():(this.abPick=e,this.abSide="after",this.startABLoop())}onCellClick(e,t,i){this.abStep=i,this.auditionChordSolo(t)}auditionChordSolo(e){this.auditioningChordName=e.name,this.auditionTimer&&clearTimeout(this.auditionTimer),this.auditionTimer=window.setTimeout(()=>{this.auditioningChordName=null},2600),this.emit("audition-chord",e)}commitSwap(){this.abPick&&(this.stopABLoop(),this.emit("select-alternative",{chord:this.abPick}))}setQuality(e){this.quality=e,this.previewVoicing(),this.commitVoicing()}setExtension(e){this.extension=e,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const e=bt(this.chord.name),t=e.includes("b"),i=Ge(e,this.quality,this.extension,t);this.emit("voicing-preview",i)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(e){e.has("resetKey")&&(this.drillGroup=null,this.abPick=null,this.abSide="before",this.quality="Major",this.extension="None",this.auditioningChordName=null)}render(){if(!this.chord)return h``;const t=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return h`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${t} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber-wrap" @pointerdown=${this.onGrabberDown}>
          <div class="grabber"></div>
        </div>

        ${this.mode==="voicing"?this.renderVoicingHeader():this.renderSwapHeader()}

        <div class="sheet-scroll-body">
          ${this.mode==="voicing"?this.renderVoicingBody():this.drillGroup?this.renderLevel2Body():this.renderLevel1Body()}
        </div>

        ${this.renderCommitFooter()}
      </div>
    `}renderSwapHeader(){const e=!!this.drillGroup,t=this.progression?.key||"C",i=this.progression?.scaleType?.includes("MINOR")??!1;let o="";return this.drillGroup==="Borrowed"?o=i?`Borrowed from ${t} major`:`Borrowed from ${t} minor`:this.drillGroup&&(o=`${this.drillGroup} — three chords`),h`
      <div class="header-pinned">
        <div class="head-top-row">
          ${e?h`
            <div style="display:flex;align-items:center;gap:12px;">
              <button
                class="circle-icon-btn"
                @click=${()=>{this.drillGroup=null}}
                aria-label="Back to feelings"
              >‹</button>
              <div>
                <div class="kicker">Bar ${this.position} · ${this.drillGroup}</div>
                <div class="sheet-title drill">${o}</div>
              </div>
            </div>
          `:h`
            <div>
              <div class="kicker">Bar ${this.position} of ${this.total}</div>
              <div class="sheet-title">Swap this chord</div>
            </div>
          `}
          <button class="circle-icon-btn" @click=${this.close} aria-label="Close">×</button>
        </div>

        <!-- Pinned A/B Compare Box -->
        <div class="ab-box">
          <div class="ab-toggles">
            ${(()=>{const s=this.abPlaying&&(this.swapIndex!==null?this.order[this.abStep]===this.swapIndex:this.abStep===this.position-1);return h`
                <button
                  class="ab-side-btn ${this.abSide==="before"?"active-now":""} ${s&&this.abSide==="before"?"active-step-bar":""}"
                  @click=${()=>this.setABSide("before")}
                >
                  <div class="ab-side-label">Now</div>
                  <div class="ab-side-val">${this.chord.name}</div>
                </button>

                ${this.abPick?h`
                  <button
                    class="ab-side-btn ${this.abSide==="after"?"active-swap":""} ${s&&this.abSide==="after"?"active-step-bar":""}"
                    style=${this.abSide==="after"?`background:${this.moodColor};`:""}
                    @click=${()=>this.setABSide("after")}
                  >
                    <div class="ab-side-label">Swap</div>
                    <div class="ab-side-val">${this.abPick.name}</div>
                  </button>
                `:h`
                  <div class="ab-side-btn empty-swap">
                    <div class="ab-side-label">Swap</div>
                    <div class="ab-side-val">Pick one below</div>
                  </div>
                `}
              `})()}
          </div>

          <div class="ab-control-row">
            <button
              class="ab-play-btn ${this.abPlaying?"playing":""}"
              style=${this.abPlaying?`background:${this.moodColor};`:""}
              @click=${()=>this.toggleABLoop()}
              aria-label=${this.abPlaying?"Pause loop audition":"Play loop audition"}
            >
              ${this.abPlaying?"❚❚":"▶"}
            </button>

            ${e?h`
              <div class="loop-cells">
                ${this.order.map((s,r)=>{const n=this.swapIndex!==null?s===this.swapIndex:r===this.position-1,c=n&&this.abSide==="after"&&this.abPick,l=c&&this.abPick?this.abPick:n?this.chord:this.progression?.chords[s],d=l?.name||"",p=this.abPlaying&&this.abStep===r;return h`
                    <button
                      class="loop-cell ${n?"target-bar":""} ${c?"swapped":""} ${p?"active-step":""}"
                      style=${c?`background:${this.moodColor};`:""}
                      @click=${()=>{l&&this.onCellClick(s,l,r)}}
                      title="Play ${d}"
                    >
                      ${d}
                    </button>
                  `})}
              </div>
            `:h`
              <div class="ab-hint-text">
                ${this.abPlaying?`Loop is running — tap either side to flip bar ${this.position} as it plays.`:`Tap ▶ to hear bar ${this.position} auditioned inside your loop.`}
              </div>
            `}
          </div>
        </div>
      </div>
    `}renderLevel1Body(){const e=this.progression?.scaleType?.includes("MINOR")??!1;return h`
      <div class="section-header-label">Choose a feeling</div>
      <div class="feeling-list">
        ${this.theoryGroups.map(t=>{const i=$e(t.tension);return h`
            <button class="feeling-row" @click=${()=>{this.drillGroup=t.name}}>
              <div
                style="width:30px;height:30px;border-radius:${Math.round(i.radius*.38)}px;background:${i.color};flex-shrink:0;"
              ></div>
              <div style="flex:1;min-width:0;">
                <div class="feeling-name">${t.name}</div>
                <div class="feeling-sub">${t.sub} · ${t.rows.length} chords</div>
              </div>
              <div class="chevron">›</div>
            </button>
          `})}
      </div>

      <button class="borrow-row" @click=${()=>{this.drillGroup="Borrowed"}}>
        <div class="borrow-swatch">
          <div class="borrow-bar-1"></div>
          <div class="borrow-bar-2"></div>
        </div>
        <div style="flex:1;min-width:0;">
          <div class="feeling-name">
            ${e?"Borrow a brighter chord":"Borrow a sadder chord"}
          </div>
          <div class="feeling-sub">
            4 chords from the ${e?"major":"minor"} version of this key
          </div>
        </div>
        <div class="chevron">›</div>
      </button>
    `}renderLevel2Body(){const e=this.drillGroup==="Borrowed",t=this.progression?.scaleType?.includes("MINOR")??!1;let i="";e?i=this.showTheory?`Modal interchange — four chords from the parallel ${t?"major":"minor"}, each matched to the chord it can stand in for.`:`Four chords from the ${t?"major":"minor"} version of this key. Each one swaps in for a chord you already have.`:this.drillGroup&&Jt[this.drillGroup]&&(i=Jt[this.drillGroup][this.showTheory?1:0]);const o=e?this.borrowedChords:this.theoryGroups.find(s=>s.name===this.drillGroup)?.rows||[];return h`
      <div class="l2-note">${i}</div>

      <div class="candidate-list">
        ${o.map(s=>{const r=this.abPick?.name===s.name,n=$e(s.tension),c=this.auditioningChordName===s.name;return h`
            <div
              class="candidate-card ${r?"selected":""}"
              style=${r?`box-shadow:inset 0 0 0 1.5px ${this.moodColor};`:""}
              @click=${()=>this.pickCandidate(s.chord)}
            >
              <div
                style="width:28px;height:28px;border-radius:${Math.round(n.radius*.35)}px;background:${n.color};flex-shrink:0;"
              ></div>
              <div style="flex:1;min-width:0;">
                <div class="candidate-title-row">
                  <div class="candidate-name">${s.name}</div>
                  ${this.showTheory&&s.roman?h`<div class="candidate-roman">${s.roman}</div>`:""}
                </div>
                <div class="candidate-sub">${s.sub}</div>
                ${this.showTheory&&s.notes&&s.notes.length>0?h`
                  <div class="candidate-notes">${s.notes.join(" · ")}</div>
                `:""}
              </div>

              <button
                class="card-play-btn"
                style=${r?`background:${this.moodColor};`:""}
                @click=${l=>{l.stopPropagation(),this.onCandidatePlayClick(s.chord)}}
                aria-label="Audition ${s.name}"
              >
                ${r&&this.abPlaying?"❚❚":"▶"}
              </button>

              ${c?h`
                <div class="audition-progress">
                  <div class="audition-progress-bar"></div>
                </div>
              `:""}
            </div>
          `})}
      </div>
    `}renderVoicingHeader(){return h`
      <div class="header-pinned">
        <div class="head-top-row">
          <div>
            <div class="kicker">Chord ${this.position} of ${this.total}</div>
            <div class="sheet-title">Adjust the voicing</div>
          </div>
          <button class="circle-icon-btn" @click=${this.close} aria-label="Close">×</button>
        </div>
      </div>
    `}renderVoicingBody(){const e=bt(this.chord.name),t=e.includes("b"),i=Ge(e,this.quality,this.extension,t);return h`
      <div class="voicing-section">
        <div class="bento">
          ${No.map(o=>h`
            <div
              class="bento-card"
              style=${o.label===this.quality?`background:${this.moodColor}`:""}
              @click=${()=>this.setQuality(o.label)}
            >
              <div class="bento-label">${o.label}</div>
              <div class="bento-sub">${o.sub}</div>
            </div>
          `)}
        </div>
        <div class="bento ext">
          ${Mo.map((o,s)=>h`
            <div
              class="bento-card ${s===0?"span":""}"
              style=${o.label===this.extension?`background:${this.moodColor}`:""}
              @click=${()=>this.setExtension(o.label)}
            >
              <div class="bento-label">${o.label}</div>
              <div class="bento-sub">${o.sub}</div>
            </div>
          `)}
        </div>
        <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
        <div class="keyboard">
          ${Ao.map(o=>h`
            <div
              class="white-key ${i.includes(o)?"active":""}"
              style=${i.includes(o)?`background:${this.moodColor}`:""}
            >${o}</div>
          `)}
          ${Co.map(o=>h`
            <div
              class="black-key"
              style="left:${o.left};${i.includes(o.note)||i.includes(o.flat)?`background:${this.moodColor}`:""}"
            ></div>
          `)}
        </div>
      </div>
    `}renderCommitFooter(){return this.mode==="voicing"?h`
        <div class="commit-pinned">
          <div class="commit-row">
            <button class="accept-btn active" style="background:${this.moodColor};" @click=${this.close}>
              Done
            </button>
          </div>
        </div>
      `:h`
      <div class="commit-pinned">
        <div class="commit-row">
          <button class="cancel-btn" @click=${this.close}>Cancel</button>
          ${this.abPick?h`
            <button
              class="accept-btn active"
              style="background:${this.moodColor};"
              @click=${()=>this.commitSwap()}
            >
              Keep ${this.abPick.name}
            </button>
          `:h`
            <button class="accept-btn disabled">
              Pick a chord to hear it
            </button>
          `}
        </div>
      </div>
    `}};B.styles=Y`
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
      height: 84%;
      max-height: 84%;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 26px 26px 0 0;
      z-index: 41;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.5);
      transform: translateY(100%);
      transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
      overflow: hidden;
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber-wrap {
      padding: 12px 0 0;
      display: flex;
      justify-content: center;
      flex-shrink: 0;
    }
    .grabber {
      width: 38px;
      height: 4px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      touch-action: none;
      cursor: grab;
    }
    .header-pinned {
      padding: 12px 22px 14px;
      flex-shrink: 0;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream, #FBF3E6);
    }
    .head-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .sheet-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 4px;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }
    .sheet-title.drill {
      font-size: 17px;
      margin-top: 2px;
    }
    .circle-icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #F1E4D2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink, #2E271F);
      flex-shrink: 0;
      border: none;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      text-decoration: none;
    }
    .circle-icon-btn:hover {
      transform: scale(1.06);
    }
    .circle-icon-btn:active {
      transform: scale(0.95);
    }

    /* A/B Compare Box */
    .ab-box {
      background: #F6EADB;
      border-radius: 16px;
      padding: 12px 13px;
      margin-top: 12px;
    }
    .ab-toggles {
      display: flex;
      gap: 7px;
    }
    .ab-side-btn {
      flex: 1;
      min-width: 0;
      text-align: left;
      border-radius: 14px;
      padding: 10px 12px;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: all 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      background: #F1E4D2;
      color: #2E271F;
      opacity: 0.72;
    }
    .ab-side-btn.active-now {
      background: #5E5142;
      color: #FBF3E6;
      opacity: 1;
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5);
    }
    .ab-side-btn.active-swap {
      opacity: 1;
      color: #2E271F;
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5);
    }
    .ab-side-btn.empty-swap {
      background: transparent;
      border: 1.5px dashed rgba(46, 39, 31, 0.22);
      color: rgba(46, 39, 31, 0.45);
      cursor: default;
      opacity: 1;
    }
    .ab-side-label {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.65;
    }
    .ab-side-val {
      font-size: 14.5px;
      font-weight: 800;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ab-control-row {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: 10px;
    }
    .ab-play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      border: none;
      background: #E8D9C2;
      color: #2E271F;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .ab-play-btn.playing {
      color: #2E271F;
    }
    .ab-play-btn:hover {
      transform: scale(1.05);
    }
    .ab-play-btn:active {
      transform: scale(0.95);
    }
    .ab-hint-text {
      font-size: 11px;
      color: #6B5F50;
      line-height: 1.45;
    }

    /* Loop Micro-Cells */
    .loop-cells {
      display: flex;
      gap: 5px;
      flex: 1;
      min-width: 0;
    }
    .loop-cell {
      flex: 1;
      min-width: 0;
      height: 40px;
      border-radius: 11px;
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
      background: #F1E4D2;
      color: #2E271F;
      opacity: 0.6;
      border: none;
      font-family: inherit;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease);
    }
    .loop-cell:hover {
      opacity: 0.9;
    }
    .loop-cell:active {
      transform: scale(0.96);
    }
    .loop-cell.active-step {
      opacity: 1 !important;
      transform: scale(1.06);
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
      z-index: 2;
    }
    .ab-side-btn.active-step-bar {
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5), inset 0 0 0 2.5px #2E271F !important;
      transform: scale(1.02);
    }

    /* Scrollable Body */
    .sheet-scroll-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 16px 22px 20px;
    }
    .section-header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .l2-note {
      font-size: 11.5px;
      line-height: 1.55;
      color: #6B5F50;
      margin-bottom: 12px;
    }

    /* Cards */
    .feeling-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 10px;
    }
    .feeling-row {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #F6EADB;
      border-radius: 15px;
      padding: 11px 14px;
      cursor: pointer;
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .feeling-row:hover {
      background: #F0E2D1;
      transform: translateY(-1px);
    }
    .feeling-row:active {
      transform: scale(0.985);
    }
    .feeling-name {
      font-size: 14.5px;
      font-weight: 800;
      color: #2E271F;
    }
    .feeling-sub {
      font-size: 11.5px;
      color: #6B5F50;
      margin-top: 1px;
    }
    .chevron {
      font-size: 15px;
      color: rgba(46, 39, 31, 0.35);
      flex-shrink: 0;
    }

    .borrow-row {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #EFE6D6;
      border-radius: 15px;
      padding: 11px 14px;
      margin-top: 14px;
      cursor: pointer;
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .borrow-row:hover {
      background: #E8DDCA;
      transform: translateY(-1px);
    }
    .borrow-row:active {
      transform: scale(0.985);
    }
    .borrow-swatch {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }
    .borrow-bar-1 {
      width: 9px;
      height: 22px;
      border-radius: 3px;
      background: #9CC0EC;
    }
    .borrow-bar-2 {
      width: 9px;
      height: 22px;
      border-radius: 3px;
      background: #C9A9E0;
    }

    /* Level 2 Candidate Cards */
    .candidate-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .candidate-card {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #F6EADB;
      border-radius: 16px;
      padding: 12px 14px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: background 150ms var(--cv-ease), transform 150ms var(--cv-ease);
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
    }
    .candidate-card:hover {
      background: #F1E2CE;
      transform: translateY(-1px);
    }
    .candidate-card:active {
      transform: scale(0.985);
    }
    .candidate-card.selected {
      background: #F6EDF8;
    }
    .candidate-title-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .candidate-name {
      font-size: 15px;
      font-weight: 800;
      color: #2E271F;
    }
    .candidate-roman {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #7A5C88;
    }
    .candidate-sub {
      font-size: 11.5px;
      color: #6B5F50;
      margin-top: 2px;
    }
    .candidate-notes {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: var(--cv-label, #8A6B3F);
      margin-top: 4px;
    }
    .card-play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #2E271F;
      background: #DCEAF9;
      border: none;
      cursor: pointer;
      transition: background 150ms var(--cv-ease), transform 150ms var(--cv-ease);
    }
    .card-play-btn:hover {
      transform: scale(1.1);
    }
    .card-play-btn:active {
      transform: scale(0.92);
    }

    .audition-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(155, 124, 168, 0.2);
      overflow: hidden;
    }
    .audition-progress-bar {
      height: 100%;
      width: 100%;
      background: var(--cv-plum, #9B7CA8);
      transform-origin: left;
      animation: cvfv-progress 2.6s linear infinite;
    }

    @keyframes cvfv-progress {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }

    /* Pinned Bottom Commit Bar */
    .commit-pinned {
      flex-shrink: 0;
      padding: 12px 22px 22px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream, #FBF3E6);
    }
    .commit-row {
      display: flex;
      gap: 9px;
    }
    .cancel-btn {
      text-align: center;
      border-radius: 100px;
      padding: 14px 18px;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.18);
      color: #6B5F50;
      font-size: 14px;
      font-weight: 700;
      background: transparent;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
      font-family: inherit;
      transition: background 150ms var(--cv-ease);
    }
    .cancel-btn:hover {
      background: rgba(46, 39, 31, 0.04);
    }
    .cancel-btn:active {
      transform: scale(0.98);
    }
    .accept-btn {
      flex: 1;
      text-align: center;
      border-radius: 100px;
      padding: 14px 16px;
      font-size: 14.5px;
      font-weight: 800;
      border: none;
      font-family: inherit;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease), opacity 150ms var(--cv-ease);
    }
    .accept-btn.active {
      color: #2E271F;
      box-shadow: 0 12px 24px -14px rgba(46, 39, 31, 0.55);
    }
    .accept-btn.active:hover {
      transform: translateY(-1px);
    }
    .accept-btn.active:active {
      transform: scale(0.98);
    }
    .accept-btn.disabled {
      background: #EDE0CC;
      color: rgba(46, 39, 31, 0.4);
      cursor: default;
      pointer-events: none;
    }

    /* Voicing Section */
    .voicing-section {
      border-top: 1px solid var(--cv-ink-10, rgba(46,39,31,0.1));
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
      background: var(--cv-surface, #F6EADB);
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
      color: var(--cv-ink, #2E271F);
    }
    .bento-sub {
      font-size: 10.5px;
      color: var(--cv-ink-45, rgba(46,39,31,0.45));
    }
    .kb-caption {
      font-size: 11px;
      color: var(--cv-ink-45, rgba(46,39,31,0.45));
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
      border-right: 1px solid var(--cv-ink-08, rgba(46,39,31,0.08));
      font-size: 10px;
      font-weight: 700;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink-35, rgba(46,39,31,0.35));
    }
    .white-key.active {
      color: var(--cv-ink, #2E271F);
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink, #2E271F);
      border-radius: 0 0 6px 6px;
      z-index: 2;
    }
  `;P([y({type:Object})],B.prototype,"chord",2);P([y({type:Number})],B.prototype,"swapIndex",2);P([y({type:Object})],B.prototype,"progression",2);P([y({type:Array})],B.prototype,"order",2);P([y({type:Array})],B.prototype,"alternatives",2);P([y({type:Array})],B.prototype,"theoryGroups",2);P([y({type:Array})],B.prototype,"borrowedChords",2);P([y({type:Boolean})],B.prototype,"showTheory",2);P([y({type:String})],B.prototype,"moodColor",2);P([y({type:Number})],B.prototype,"position",2);P([y({type:Number})],B.prototype,"total",2);P([y({type:String})],B.prototype,"mode",2);P([y({type:Boolean})],B.prototype,"visible",2);P([y({type:Number})],B.prototype,"resetKey",2);P([u()],B.prototype,"drillGroup",2);P([u()],B.prototype,"abPick",2);P([u()],B.prototype,"abSide",2);P([u()],B.prototype,"abPlaying",2);P([u()],B.prototype,"abStep",2);P([u()],B.prototype,"auditioningChordName",2);P([u()],B.prototype,"quality",2);P([u()],B.prototype,"extension",2);P([u()],B.prototype,"dragY",2);P([u()],B.prototype,"dragging",2);P([u()],B.prototype,"snapping",2);P([kt(".sheet")],B.prototype,"sheetEl",2);B=P([H("swap-sheet")],B);var $o=Object.defineProperty,Eo=Object.getOwnPropertyDescriptor,Oi=(e,t,i,o)=>{for(var s=o>1?void 0:o?Eo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&$o(t,i,s),s};const Oo=j`
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
`,Do=j`
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
`,Bo=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Oo},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:Do}];let qe=class extends q{constructor(){super(...arguments),this.visible=!1,this.onKeyDown=e=>{e.key==="Escape"&&this.visible&&this.emit("close")}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}render(){return h`
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
          ${Bo.map(e=>h`
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
    `}};qe.styles=Y`
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
  `;Oi([y({type:Boolean})],qe.prototype,"visible",2);qe=Oi([H("share-modal")],qe);function Kt(e){const t={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=e.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=t[o]??0,r=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+s))}function Di(e,t,i){const o=t&&t.length>0?t.map(g=>e.chords[g]).filter(g=>!!g):e.chords,s=e.bpm||120,r=1.7,n=i?we.find(g=>g.name.toLowerCase()===i.toLowerCase()):void 0,c=Tt[e.genre]||{},l=n?.patch??{},d={...c,...l},p=c.duration??.9,a=l.durationMultiplier?p*l.durationMultiplier:p,f=[];return o.forEach((g,x)=>{const m=x*r,k=(g.notes&&g.notes.length>0?g.notes:["C","E","G"]).map(S=>`${S}4`);if(d.arpMode&&d.arpMode!=="off"){const S=d.arpRate??"1/16",I=d.arpRange??1,w=d.arpMode,O=pi(S,s),_=ui(k,I),K=gi(_,w),Be=d.duration?d.duration:Math.max(.6,a);K.forEach((b,F)=>{const ie=m+F*O;f.push({note:b,midi:Kt(b),startTime:ie,duration:Be})})}else{const S=d.spread??0;k.forEach((I,w)=>{const O=w*S*.1,_=m+O;f.push({note:I,midi:Kt(I),startTime:_,duration:a})})}}),f}function Po(e){const t=[];let i=Math.max(0,Math.floor(e));for(t.push(i&127);(i>>=7)>0;)t.unshift(i&127|128);return t}function Fo(e,t,i){const o=e.bpm||120,s=480,r=Di(e,t,i),n=[];r.forEach(m=>{const v=Math.round(m.startTime/(60/o)*s),k=Math.max(1,Math.round(m.duration/(60/o)*s));n.push({tick:v,type:"on",midi:m.midi}),n.push({tick:v+k,type:"off",midi:m.midi})}),n.sort((m,v)=>m.tick!==v.tick?m.tick-v.tick:m.type!==v.type?m.type==="off"?-1:1:m.midi-v.midi);const c=[],l=Math.round(6e7/o);c.push(0),c.push(255,81,3),c.push(l>>16&255,l>>8&255,l&255);const d="Chroma Chords";c.push(0),c.push(255,3,d.length);for(let m=0;m<d.length;m++)c.push(d.charCodeAt(m));let p=0;n.forEach(m=>{const v=m.tick-p;p=m.tick,c.push(...Po(v)),m.type==="on"?c.push(144,m.midi,80):c.push(128,m.midi,0)}),c.push(0),c.push(255,47,0);const a=[77,84,104,100,0,0,0,6,0,0,0,1,s>>8&255,s&255],f=c.length,g=[77,84,114,107,f>>24&255,f>>16&255,f>>8&255,f&255],x=new Uint8Array(a.length+g.length+c.length);return x.set(a,0),x.set(g,a.length),x.set(c,a.length+g.length),x}function _o(e,t,i,o){const s=Fo(e,t,o),r=new Blob([s],{type:"audio/midi"}),n=(e.key||"C").toLowerCase(),c=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=e.bpm||120,d=`chroma-chords-${n}-${c}-${l}bpm.mid`;Bi(r,d)}function Ro(e,t){const i=new ci({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((e?xe.find(r=>r.name.toLowerCase()===e.toLowerCase()):void 0)?.instrument??(t?St[t]:void 0)??"rhodes"){case"bell":return new G(Ce,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new G(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new G(ae,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new G(ae,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const r=new li({decay:4.5,wet:.35}).connect(i);return new G(ae,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new ai({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new G(ae,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new G(ni,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new G(Ce,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function Lo(e){const t=e.numberOfChannels,i=e.sampleRate,o=16,s=o/8,r=t*s,n=e.length*t*s,c=new ArrayBuffer(44+n),l=new DataView(c),d=(f,g)=>{for(let x=0;x<g.length;x++)l.setUint8(f+x,g.charCodeAt(x))};d(0,"RIFF"),l.setUint32(4,36+n,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,t,!0),l.setUint32(24,i,!0),l.setUint32(28,i*r,!0),l.setUint16(32,r,!0),l.setUint16(34,o,!0),d(36,"data"),l.setUint32(40,n,!0);const p=[];for(let f=0;f<t;f++)p.push(e.getChannelData(f));let a=44;for(let f=0;f<e.length;f++)for(let g=0;g<t;g++){const x=Math.max(-1,Math.min(1,p[g][f])),m=x<0?x*32768:x*32767;l.setInt16(a,m,!0),a+=2}return new Blob([new Uint8Array(c)],{type:"audio/wav"})}async function Uo(e,t,i,o){const s=Di(e,t,o);if(!s.length)return;const n=s.reduce((g,x)=>Math.max(g,x.startTime+x.duration),0)+1.2,c=await ji(async()=>{const g=Ro(i,e.genre);s.forEach(x=>{g.triggerAttackRelease(x.note,x.duration,x.startTime)})},n),l=Lo(c.get()),d=(e.key||"C").toLowerCase(),p=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),a=e.bpm||120,f=`chroma-chords-${d}-${p}-${a}bpm.wav`;Bi(l,f)}function Bi(e,t){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(e);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=t,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var zo=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,ke=(e,t,i,o)=>{for(var s=o>1?void 0:o?jo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&zo(t,i,s),s};let ce=class extends q{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(e){e.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const e=this.name.trim();e&&(this.dispatchEvent(new CustomEvent("save",{detail:e})),this.close())}onInput(e){this.name=e.target.value}onKeyDown(e){e.key==="Escape"?this.close():e.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?h`
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
    `:h``}};ce.styles=Y`
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
  `;ke([y({type:Boolean})],ce.prototype,"visible",2);ke([y({type:String})],ce.prototype,"defaultName",2);ke([u()],ce.prototype,"mounted",2);ke([u()],ce.prototype,"name",2);ke([kt(".name-input")],ce.prototype,"inputEl",2);ce=ke([H("save-set-modal")],ce);var Go=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,C=(e,t,i,o)=>{for(var s=o>1?void 0:o?Vo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&Go(t,i,s),s};const Yo=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],ut=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],qo=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Ho=["Warm","Melancholy","Nostalgic","Dreamy"],Wo=["Piano","Rhodes","Nylon Guitar","Warm Pad"],Xo=["Block chords","Arpeggio","Strum","Broken (swing)"],Jo=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Qt=220,Zt=280,ei={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let A=class extends q{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.isAuthenticated=!1,this.userEmail=null,this.isBookmarked=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.menuMounted=!1,this.menuVisible=!1,this.flashedIndex=null,this.expandedMenuGenre=!1,this.expandedMenuMood=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.saveModalVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=ye(.35),this.mascotSlot=Ee(Yo),this.panelPeekMascot=ye(.18),this.panelPeekSide=Ee(["left","right"]),this.eggCounter=new $t,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=e=>{if(this.lastPointerX=e.clientX,this.lastPointerY=e.clientY,this.pressTimer&&!this.drag){(Math.abs(e.clientY-this.pressStartY)>8||Math.abs(e.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:e.clientX-this.pressStartX,offsetY:e.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const e=this.drag.pos;this.drag=null,this.pressTapFn=null;const t=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let i=e,o=1/0;if(t.forEach((s,r)=>{if(r===e)return;const n=s.getBoundingClientRect(),c=n.left+n.width/2,l=n.top+n.height/2,d=(this.lastPointerX-c)**2+(this.lastPointerY-l)**2;d<o&&(o=d,i=r)}),i!==e){const s=[...this.order],[r]=s.splice(e,1);s.splice(i,0,r),this.emit("reorder",s)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}e.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Zt)))}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),e.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Zt)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1},Qt)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Qt)}exportDevice(e,t){this.closeShare();const i=Xs(this.progression,e,this.order);window.open(i,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=`Sent to ${t}`,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}async handleExportWav(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer),this.toast="Rendering WAV audio...";try{const e=this.progression,t=this.instrument??Le(e.genre),i=this.playStyle??Ue(e.genre);await Uo(e,this.order,t,i),this.toast="Saved WAV audio file"}catch(e){console.error("WAV export error:",e),this.toast="Failed to export WAV"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}handleExportMidi(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer);try{const e=this.progression,t=this.instrument??Le(e.genre),i=this.playStyle??Ue(e.genre);_o(e,this.order,t,i),this.toast="Saved MIDI file"}catch(e){console.error("MIDI export error:",e),this.toast="Failed to export MIDI"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(e,t,i){i.preventDefault(),this.pressTapFn=t,this.pressStartX=i.clientX,this.pressStartY=i.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:e,offsetX:0,offsetY:0}},150)}previewChordTile(e){this.flashedIndex=e,setTimeout(()=>{this.flashedIndex===e&&(this.flashedIndex=null)},320),this.emit("chord-preview",e)}dragStyleFor(e){const t=this.drag;return t&&t.pos===e?`transform:translate(${t.offsetX}px, ${t.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderHeaderTitle(e,t){if(e.searchTerm){const i=e.searchTerm.trim(),s=(i.endsWith(".")?i.slice(0,-1):i).split(/\s+/);if(s.length===1)return h`<h1><span style="color:${t}">${s[0]}.</span></h1>`;const r=s.slice(0,-1).join(" "),n=s[s.length-1];return h`<h1>${r} <span style="color:${t}">${n}.</span></h1>`}return h`<h1>Your progression, feeling <span style="color:${t}">${e.mood.toLowerCase()}.</span></h1>`}renderLengthControl(){const e=this.progression.chords.length;return h`
      <div class="length-control">
        <div class="length-btn ${e<=ue?"disabled":""}" @click=${()=>e>ue&&this.emit("set-length",e-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:ee},(t,i)=>h`<div class="length-segment ${i<e?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${e>=ee?"disabled":""}" @click=${()=>e<ee&&this.emit("set-length",e+1)}>+</div>
        <div class="length-label-text">${e} ${e===1?"bar":"bars"}</div>
      </div>
    `}render(){const e=this.progression,t=ve(e.mood),i=this.instrument??Le(e.genre),o=this.playStyle??Ue(e.genre),s=Math.max(1,this.order.length),r=this.playing?this.snapProgress?this.progressStep/s*100:Math.min(100,(this.progressStep+1)/s*100):0;ei[e.mood]||ei.Dreamy;const n=this.showTheory?Gs(this.order.map(b=>e.chords[b]),e.key,e.scaleType):null,c=ki(e.key,e.scaleType).length,l=c===0?"no sharps or flats":`${c} ${c===1?"sharp/flat":"sharps/flats"}`;let d=qo.filter(b=>ut.includes(b));d.includes(e.genre)||(d=d.slice(0,-1).concat(e.genre));const p=ut.filter(b=>!d.includes(b)),a=this.expandedMenuGenre?ut:d,f=le.map(b=>b.name);let g=Ho.filter(b=>f.includes(b));g.includes(e.mood)||(g=g.slice(0,-1).concat(e.mood));const x=f.filter(b=>!g.includes(b)),v=(this.expandedMenuMood?f:g).map(b=>le.find(F=>F.name===b)),k=xe.filter(b=>b.name!==i);let S=Wo.filter(b=>k.some(F=>F.name===b));const I=k.filter(b=>!S.includes(b.name)),w=this.expandedAllInstruments?k:k.filter(b=>S.includes(b.name)),O=we.filter(b=>b.name!==o);let _=Xo.filter(b=>O.some(F=>F.name===b));const K=O.filter(b=>!_.includes(b.name)),Be=this.expandedAllPlayStyles?O:O.filter(b=>_.includes(b.name));return h`
      <div class="frame">
        ${this.mascot.show?h`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}

        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          @view-sets=${()=>this.emit("view-sets")}
          @request-login=${()=>this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}
          @request-logout=${()=>this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}
          @wordmark-click=${()=>this.onWordmarkClick()}
        ></app-header>

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted?h`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${be.map(b=>h`
                <div class="menu-chip ${b===e.key?"selected":""}" style=${b===e.key?`background:${t}`:""} @click=${()=>this.emit("set-key",b)}>${_e(b,e.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${Jo.map(b=>h`
                <div class="menu-chip ${b.value===e.scaleType?"selected":""}" style=${b.value===e.scaleType?`background:${t}`:""} @click=${()=>this.emit("set-scale",b.value)}>${b.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${a.map(b=>h`
                <div class="menu-chip ${b===e.genre?"selected":""}" style=${b===e.genre?`background:${t}`:""} @click=${()=>this.emit("set-genre",b)}>${b}</div>
              `)}
              ${p.length?h`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuGenre=!this.expandedMenuGenre}}>
                  ${this.expandedMenuGenre?"Show less ⌃":`+${p.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${v.map(b=>h`
                <div class="menu-chip ${b.name===e.mood?"selected":""}" style=${b.name===e.mood?`background:${b.dot}`:""} @click=${()=>this.emit("set-mood",b.name)}>${b.name}</div>
              `)}
              ${x.length?h`
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
          <div class="progression-nav-row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;width:100%;">
            <button class="back-pill" @click=${()=>this.emit("back")} style="display:inline-flex;align-items:center;gap:6px;background:#F1E4CC;padding:8px 16px;min-height:36px;border-radius:100px;font-size:12.5px;font-weight:700;color:#8A6B3F;border:none;cursor:pointer;font-family:inherit;transition:transform 150ms ease, background 150ms ease;">
              ← Back
            </button>
            <button class="key-scale-pill" @click=${()=>this.toggleMenu()} style="display:inline-flex;align-items:center;gap:6px;background:#F1E4CC;padding:8px 16px;min-height:36px;border-radius:100px;font-size:12.5px;font-weight:700;color:#2E271F;border:none;cursor:pointer;font-family:inherit;transition:transform 150ms ease, background 150ms ease;" title="Change key, scale, or genre">
              ${_e(e.key,e.scaleType)} ${e.scaleType.replace("_"," ")} ▾
            </button>
          </div>

          ${this.renderHeaderTitle(e,t)}
          <div class="subcopy">${e.genre} · ${e.chords.length} bars · tap a chord to hear it</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?h`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((b,F)=>{const ie=e.chords[b],Pe=$e(ie.tension),Ot=F===this.activeIndex,Pi=this.flashedIndex===b;return h`
                  <div
                    class="chord-chip ${Ot?"active":""} ${Pi?"flashed":""}"
                    style="--chip-size:${Pe.size}px;--chip-radius:${Pe.radius}px;background:${Pe.color};${this.dragStyleFor(F)}"
                    @click=${()=>this.previewChordTile(b)}
                    @pointerdown=${se=>this.pressStart(F,()=>this.previewChordTile(b),se)}
                  >
                    ${this.showTheory?h`<div class="roman-badge">${ie.roman}</div>`:""}
                    ${Ot?h`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="--chip-font:${Pe.fontSize}px;">${ie.name}</div>
                    <div class="chord-role">${ie.functionLabel}</div>
                    <button
                      class="swap-badge"
                      aria-label="Swap chord ${ie.name}"
                      @pointerdown=${se=>se.stopPropagation()}
                      @click=${se=>{se.stopPropagation(),this.emit("chord-tap",b)}}
                    >
                      <div class="swap-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                      </div>
                    </button>
                    <button
                      class="voicing-badge"
                      aria-label="View voicing for ${ie.name}"
                      @pointerdown=${se=>se.stopPropagation()}
                      @click=${se=>{se.stopPropagation(),this.emit("chord-voicing-tap",b)}}
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
          ${n?h`
            <div class="theory-strip">
              <div class="theory-key-label">${_e(e.key,e.scaleType)} ${e.scaleType.replace("_"," ")} · ${l}</div>
              <div class="theory-staff-scroll">
                ${j`
                  <svg width="${n.width}" height="${n.height}" viewBox="0 0 ${n.width} ${n.height}">
                    ${n.lines.map(b=>j`<rect x="6" y="${b}" width="${n.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${n.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${n.keySignature.map(b=>j`<text x="${b.x}" y="${b.y+6}" font-size="20" fill="var(--cv-ink)">${b.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${n.chords.map(b=>j`
                      <text x="${b.cx}" y="${b.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${b.name}</text>
                      ${b.ledgers.map(F=>j`<rect x="${F.x}" y="${F.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${b.notes.map(F=>j`<ellipse cx="${F.x}" cy="${F.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${b.cx}" y="${n.height-4}" font-size="12" font-weight="800" fill="${t}" text-anchor="middle">${b.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${t}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?h`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:h`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${r}%;background:${t};--progress-duration:${At}ms"
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
            ${this.isAuthenticated?h`
              <div class="dice-btn" title="${this.isBookmarked?"Saved in sets":"Save set"}" @click=${()=>{this.saveModalVisible=!0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            `:""}
            <div class="control-icon-btn" aria-label="Instrument: ${i}" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div class="control-icon-btn" aria-label="Play style: ${o}" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
            </div>
          </div>
          <div class="transport-meta">${_e(e.key,e.scaleType).toUpperCase()} ${e.scaleType.replace("_"," ")} · ${e.bpm} BPM</div>

          <div class="control-row">
            <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              ${i} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
            </div>
            <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
              ${o} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
            </div>
          </div>
          ${this.expandedInstrument?h`
            <div class="control-options">
              ${w.map(b=>h`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",b.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${b.color}"></span>${b.name}
                </div>
              `)}
              ${I.length?h`
                <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                  ${this.expandedAllInstruments?"Show less ⌃":`+${I.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}
          ${this.expandedPlayStyle?h`
            <div class="control-options">
              ${Be.map(b=>h`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",b.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${b.color}"></span>${b.name}
                </div>
              `)}
              ${K.length?h`
                <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                  ${this.expandedAllPlayStyles?"Show less ⌃":`+${K.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}

          <div class="cta-button-group">
            <button class="build-song-btn" style="background:${t}" @click=${()=>this.emit("view-song")}>
              Build the full song <span>→</span>
            </button>
            <button
              class="play-along-cta-btn"
              @click=${()=>this.emit("view-play-along")}
              aria-label="Practice chords with hands"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2.5" y="7" width="19" height="10" rx="2"/>
                <path d="M8 7v10M13 7v10M18 7v10"/>
              </svg>
              Play along
            </button>
          </div>
          <div class="back-to-seed-row">
            <div class="back-to-seed-link" @click=${()=>this.emit("back")}>← Back to seed</div>
          </div>
        </div>

        ${this.sheetMounted&&this.swapChord?h`
          <swap-sheet
            .chord=${this.swapChord}
            .swapIndex=${this.swapIndex}
            .progression=${this.progression}
            .order=${this.order}
            .alternatives=${this.alternatives}
            .theoryGroups=${this.theoryGroups}
            .borrowedChords=${this.borrowedChords}
            .showTheory=${this.showTheory}
            .mode=${this.sheetMode}
            .moodColor=${t}
            .position=${(this.order.indexOf(this.swapIndex??0)>=0?this.order.indexOf(this.swapIndex??0):this.swapIndex??0)+1}
            .total=${this.order.length}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
            @close=${()=>this.emit("close")}
            @select-alternative=${b=>this.emit("select-alternative",b.detail)}
            @audition-chord=${b=>this.emit("audition-chord",b.detail)}
            @voicing-preview=${b=>this.emit("voicing-preview",b.detail)}
            @voicing-change=${b=>this.emit("voicing-change",b.detail)}
          ></swap-sheet>
        `:""}

        ${this.shareMounted?h`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${b=>this.exportDevice(b.detail.device,b.detail.name)}
            @export-wav=${()=>this.handleExportWav()}
            @export-midi=${()=>this.handleExportMidi()}
          ></share-modal>
        `:""}

        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${`${e.genre} · ${e.mood}`}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${b=>{this.emit("save-set",b.detail),this.saveModalVisible=!1}}
        ></save-set-modal>

        ${this.toast?h`<div class="toast">${this.toast.startsWith("Sent to")||this.toast.startsWith("Saved")||this.toast.startsWith("Rendering")||this.toast.startsWith("Failed")?this.toast:`Sent to ${this.toast}`}</div>`:""}
      </div>
    `}};A.styles=Y`
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
    .cta-button-group {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 28px;
      flex-wrap: wrap;
    }
    .build-song-btn {
      flex: 1;
      min-width: 200px;
      border: none;
      color: var(--cv-ink);
      padding: 16px 24px;
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
      transition: transform 160ms var(--cv-ease);
    }
    .build-song-btn:active {
      transform: scale(0.98);
    }
    .play-along-cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      background: transparent;
      border: 2px solid rgba(46, 39, 31, 0.18);
      color: var(--cv-ink);
      padding: 14px 24px;
      border-radius: 100px;
      font-weight: 800;
      font-size: 15px;
      font-family: inherit;
      cursor: pointer;
      min-width: 150px;
      transition: transform 160ms var(--cv-ease), border-color 200ms ease, background 200ms ease;
    }
    .play-along-cta-btn:hover {
      border-color: rgba(46, 39, 31, 0.36);
      background: rgba(46, 39, 31, 0.04);
    }
    .play-along-cta-btn:active {
      transform: scale(0.97);
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
  `;C([y({type:Object})],A.prototype,"progression",2);C([y({type:Number})],A.prototype,"activeIndex",2);C([y({type:Number})],A.prototype,"progressStep",2);C([y({type:Array})],A.prototype,"order",2);C([y({type:Boolean})],A.prototype,"playing",2);C([y({type:Boolean})],A.prototype,"showTheory",2);C([y({type:String})],A.prototype,"instrument",2);C([y({type:String})],A.prototype,"playStyle",2);C([y({type:Boolean})],A.prototype,"sheetOpen",2);C([y({type:Boolean})],A.prototype,"isAuthenticated",2);C([y({type:String})],A.prototype,"userEmail",2);C([y({type:Boolean})],A.prototype,"isBookmarked",2);C([y({type:String})],A.prototype,"sheetMode",2);C([y({type:Object})],A.prototype,"swapChord",2);C([y({type:Number})],A.prototype,"swapIndex",2);C([y({type:Array})],A.prototype,"alternatives",2);C([y({type:Array})],A.prototype,"theoryGroups",2);C([y({type:Array})],A.prototype,"borrowedChords",2);C([u()],A.prototype,"menuMounted",2);C([u()],A.prototype,"menuVisible",2);C([u()],A.prototype,"flashedIndex",2);C([u()],A.prototype,"expandedMenuGenre",2);C([u()],A.prototype,"expandedMenuMood",2);C([u()],A.prototype,"expandedAllInstruments",2);C([u()],A.prototype,"expandedAllPlayStyles",2);C([u()],A.prototype,"saveModalVisible",2);C([u()],A.prototype,"shareMounted",2);C([u()],A.prototype,"shareVisible",2);C([u()],A.prototype,"sheetMounted",2);C([u()],A.prototype,"sheetVisible",2);C([u()],A.prototype,"toast",2);C([u()],A.prototype,"spinning",2);C([u()],A.prototype,"drag",2);C([u()],A.prototype,"snapProgress",2);C([u()],A.prototype,"expandedInstrument",2);C([u()],A.prototype,"expandedPlayStyle",2);C([u()],A.prototype,"mascot",2);C([u()],A.prototype,"mascotSlot",2);C([u()],A.prototype,"panelPeekMascot",2);C([u()],A.prototype,"panelPeekSide",2);C([u()],A.prototype,"paradeTrigger",2);A=C([H("loop-screen")],A);var Ko=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,U=(e,t,i,o)=>{for(var s=o>1?void 0:o?Qo(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&Ko(t,i,s),s};const Zo=["Piano","Rhodes","Nylon Guitar","Warm Pad"],er=["Block chords","Arpeggio","Strum","Broken (swing)"],tr=["flex-start","center","flex-end"];let L=class extends q{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=ye(.5),this.mascotAlign=Ee([...tr]),this.eggCounter=new $t,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(e){this.dispatchEvent(new CustomEvent("select-section",{detail:e,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const e=this.sections[0]?.progression.genre??"Pop",t=this.instrument??Le(e),i=this.playStyle??Ue(e),o=this.totalSteps||this.sections.reduce((m,v)=>m+v.order.length,0),s=!this.playing||o<=0?0:this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100,r=xe.filter(m=>m.name!==t);let n=Zo.filter(m=>r.some(v=>v.name===m));const c=r.filter(m=>!n.includes(m.name)),l=this.expandedAllInstruments?r:r.filter(m=>n.includes(m.name)),d=we.filter(m=>m.name!==i);let p=er.filter(m=>d.some(v=>v.name===m));const a=d.filter(m=>!p.includes(m.name)),f=this.expandedAllPlayStyles?d:d.filter(m=>p.includes(m.name)),g=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],x=g?ve(g.progression.mood):"#C9A9E0";return h`
      <div class="frame">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          @view-sets=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}
          @wordmark-click=${()=>this.onWordmarkClick()}
        ></app-header>

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${()=>this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((m,v)=>{const k=this.playing?v===this.activePlayingSectionIdx:v===this.activeSectionIdx,S=ve(m.progression.mood);return h`
                <div class="section-row ${k?"active":""}" style=${k?`--ring-color:${S}`:""} @click=${()=>this.selectSection(v)}>
                  <div>
                    <div class="section-name">${m.name.toUpperCase()}</div>
                    <div class="section-chords">${m.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${m.order.map(I=>{const w=m.progression.chords[I],O=$e(w.tension);return h`<div class="section-chip" style="background:${O.color};border-radius:${Math.round(O.radius*.35)}px;"></div>`})}
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
                ${this.playing?h`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:h`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${s}%;background:${x};--progress-duration:${At}ms"
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
                ${t} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
              </div>
              <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
                ${i} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
              </div>
            </div>

            ${this.expandedInstrument?h`
              <div class="control-options">
                ${l.map(m=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:m.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${m.color}"></span>${m.name}
                  </div>
                `)}
                ${c.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${c.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?h`
              <div class="control-options">
                ${f.map(m=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:m.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${m.color}"></span>${m.name}
                  </div>
                `)}
                ${a.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${a.length} more ⌄`}
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
          .defaultName=${e&&g?`${e} · ${g.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${m=>{this.dispatchEvent(new CustomEvent("save-set",{detail:m.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};L.styles=Y`
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
  `;U([y({type:Array})],L.prototype,"sections",2);U([y({type:Number})],L.prototype,"activeSectionIdx",2);U([y({type:Number})],L.prototype,"activePlayingSectionIdx",2);U([y({type:Boolean})],L.prototype,"canAddSection",2);U([y({type:Boolean})],L.prototype,"playing",2);U([y({type:Number})],L.prototype,"progressStep",2);U([y({type:Number})],L.prototype,"totalSteps",2);U([y({type:String})],L.prototype,"instrument",2);U([y({type:String})],L.prototype,"playStyle",2);U([y({type:Boolean})],L.prototype,"isAuthenticated",2);U([y({type:Boolean})],L.prototype,"isBookmarked",2);U([u()],L.prototype,"expandedInstrument",2);U([u()],L.prototype,"expandedPlayStyle",2);U([u()],L.prototype,"expandedAllInstruments",2);U([u()],L.prototype,"expandedAllPlayStyles",2);U([u()],L.prototype,"snapProgress",2);U([u()],L.prototype,"saveModalVisible",2);U([u()],L.prototype,"mascot",2);U([u()],L.prototype,"mascotAlign",2);U([u()],L.prototype,"paradeTrigger",2);L=U([H("song-screen")],L);var ir=Object.defineProperty,sr=Object.getOwnPropertyDescriptor,te=(e,t,i,o)=>{for(var s=o>1?void 0:o?sr(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&ir(t,i,s),s};let X=class extends q{constructor(){super(...arguments),this.projects=[],this.isAuthenticated=!1,this.userEmail=null,this.syncStatus="sign-in",this.isSyncing=!1,this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.emptyMascot=ye(.9),this.unsubscribeSyncStatus=null}connectedCallback(){super.connectedCallback(),this.unsubscribeSyncStatus=z.subscribeSyncStatus(e=>{this.syncStatus=e,this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeSyncStatus&&(this.unsubscribeSyncStatus(),this.unsubscribeSyncStatus=null)}onBack(){this.dispatchEvent(new CustomEvent("back"))}onLoadProject(e){this.renamingId||this.confirmDeleteId||this.dispatchEvent(new CustomEvent("load-project",{detail:e}))}async onSync(){if(!(this.isSyncing||this.syncStatus==="syncing")){this.isSyncing=!0,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}));try{await z.syncWithCloud()}catch(e){console.warn("Manual sync error:",e)}finally{this.isSyncing=!1}}}startRename(e,t,i){e.stopPropagation(),this.renamingId=t,this.draftName=i,this.confirmDeleteId=null}onDraftChange(e){this.draftName=e.target.value}commitRename(e){if(this.renamingId===e){const t=this.draftName.trim();t&&this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:t},bubbles:!0,composed:!0})),this.renamingId=null}}cancelRename(){this.renamingId=null,this.draftName=""}askDelete(e,t){e.stopPropagation(),this.confirmDeleteId=t,this.renamingId=null}confirmDelete(e,t){e.stopPropagation(),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0}))}cancelDelete(e){e.stopPropagation(),this.confirmDeleteId=null}render(){return h`
      <div class="frame">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${this.projects.length}
          .syncStatus=${this.syncStatus}
          @request-login=${()=>this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}
          @request-logout=${()=>this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}
          @sync-projects=${this.onSync}
        ></app-header>
        
        <div class="content" style="margin-top: 10px;">
          <button class="back-btn" @click=${this.onBack} style="margin-bottom: 20px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <h1>Your saved sets.</h1>
          <div class="subcopy">Tap one to load it back into the progression player.</div>

          ${this.projects.length===0?h`
            <div class="empty-state">
              ${this.emptyMascot.show?h`
                <div class="empty-mascot-wrap">
                  <mascot-character .kind=${this.emptyMascot.kind} .scale=${.8}></mascot-character>
                </div>
              `:""}
              <div class="empty-state-title">Nothing saved yet.</div>
              <div class="empty-state-desc">Generate a loop you like, then tap the bookmark to keep it here.</div>
              <button class="empty-cta-btn" @click=${this.onBack}>Make one <span>→</span></button>
            </div>
          `:h`
            <div class="saved-sets-list">
              ${this.projects.map(e=>{e.scaleType,e.key;const t=e.name||"Untitled Set",i=e.genre||"Unknown",o=e.mood||"Neutral",s=ve(o),r=this.renamingId===e.id,n=this.confirmDeleteId===e.id,c=e.chords&&e.chords.length?e.chords.length:4,l=`${i} · ${o} · ${c} bars`;return h`
                  <div class="card" @click=${()=>this.onLoadProject(e.id)}>
                    <div class="swatch-bar" style="background: ${s};">
                      ${(e.chords&&e.chords.length?e.chords:[{tension:0},{tension:1},{tension:2},{tension:3}]).map(d=>{const p=typeof d=="object"&&d!==null?d.tension??0:0,f=$e(p)?.color||"rgba(46, 39, 31, 0.55)",g=typeof d=="object"&&d!==null&&d.name||"";return h`<span class="chip-dot" style="background: ${f};" title=${g}></span>`})}
                    </div>

                    <div class="card-content-row">
                      <div class="card-info">
                        ${r?h`
                          <div class="rename-row">
                            <input
                              class="rename-input"
                              .value=${this.draftName}
                              @input=${this.onDraftChange}
                              @keydown=${d=>{d.key==="Enter"?(d.preventDefault(),this.commitRename(e.id)):d.key==="Escape"&&(d.preventDefault(),this.cancelRename())}}
                              @click=${d=>d.stopPropagation()}
                              autofocus
                            />
                            <button class="btn-save-rename" @click=${d=>{d.stopPropagation(),this.commitRename(e.id)}}>Save</button>
                            <button class="btn-cancel-rename" @click=${d=>{d.stopPropagation(),this.cancelRename()}}>Cancel</button>
                          </div>
                        `:h`
                          <div class="card-title">${t}</div>
                        `}
                        <div class="card-meta-line">${l}</div>
                      </div>

                      <div class="card-actions">
                        <button
                          class="action-btn"
                          title="Rename set"
                          aria-label="Rename set"
                          @click=${d=>this.startRename(d,e.id,t)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
                          </svg>
                        </button>
                        <button
                          class="action-btn delete"
                          title="Delete set"
                          aria-label="Delete set"
                          @click=${d=>this.askDelete(d,e.id)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    ${n?h`
                      <div class="delete-confirm-banner" @click=${d=>d.stopPropagation()}>
                        <div class="delete-confirm-text">Delete this set for good?</div>
                        <div class="delete-confirm-actions">
                          <button class="btn-keep" @click=${d=>this.cancelDelete(d)}>Keep</button>
                          <button class="btn-delete-confirm" @click=${d=>this.confirmDelete(d,e.id)}>Delete</button>
                        </div>
                      </div>
                    `:""}
                  </div>
                `})}
            </div>
          `}
        </div>
      </div>
    `}};X.styles=Y`
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
      gap: 12px;
      flex-wrap: wrap;
    }
    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
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
    .back-btn:active, .sync-btn:active, .auth-btn:active, .status-pill.status-signin:active {
      transform: scale(0.96);
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.01em;
      border: 1px solid transparent;
      user-select: none;
      min-height: 32px;
      box-sizing: border-box;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .status-pill.status-synced {
      background: #E8F5E9;
      color: #2E7D32;
      border-color: #C8E6C9;
    }
    .status-pill.status-synced .status-dot {
      background: #43A047;
    }
    .status-pill.status-syncing {
      background: #E3F2FD;
      color: #1565C0;
      border-color: #BBDEFB;
    }
    .status-pill.status-syncing .status-dot {
      background: #1E88E5;
      animation: pulse-dot 1.2s infinite ease-in-out;
    }
    .status-pill.status-offline {
      background: #FFF3E0;
      color: #E65100;
      border-color: #FFE0B2;
    }
    .status-pill.status-offline .status-dot {
      background: #FB8C00;
    }
    .status-pill.status-signin {
      background: var(--cv-surface-2);
      color: var(--cv-ink);
      cursor: pointer;
      border: 1px solid var(--cv-ink-10);
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .status-pill.status-signin:hover {
      background: var(--cv-ink-08);
      transform: translateY(-1px);
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    @keyframes pulse-dot {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.35;
        transform: scale(1.4);
      }
    }
    .auth-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .auth-btn:hover {
      background: var(--cv-ink-08);
    }
    .user-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(46, 39, 31, 0.06);
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
      max-width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sign-out-btn {
      background: none;
      border: none;
      color: var(--cv-ink-muted);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: underline;
      font-family: inherit;
      padding: 4px 6px;
    }
    .sign-out-btn:hover {
      color: #F2735F;
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
      max-width: 640px;
    }
    h1 {
      margin: 22px 0 0 0;
      font-size: 34px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.7;
      color: #6B5F50;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .empty-state {
      text-align: center;
      padding: 44px 30px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      border: 1.5px dashed rgba(46, 39, 31, 0.18);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .empty-mascot-wrap {
      margin-bottom: 4px;
    }
    .empty-state-title {
      font-size: 17px;
      font-weight: 800;
      color: #2E271F;
    }
    .empty-state-desc {
      font-size: 14px;
      line-height: 1.65;
      color: #6B5F50;
      max-width: 340px;
    }
    .empty-cta-btn {
      margin-top: 22px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border: none;
      padding: 14px 26px;
      border-radius: 100px;
      font-size: 14.5px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .empty-cta-btn:hover {
      transform: scale(1.02);
    }
    .saved-sets-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 30px;
      width: 100%;
    }
    .card {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      box-sizing: border-box;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.16, 1, 0.3, 1)), box-shadow 150ms ease;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -8px rgba(46, 39, 31, 0.12);
    }
    .swatch-bar {
      width: 100%;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 14px;
      box-sizing: border-box;
    }
    .chip-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.55);
      display: inline-block;
      flex-shrink: 0;
    }
    .card-content-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .card-info {
      min-width: 0;
      flex: 1;
    }
    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: #2E271F;
    }
    .card-meta-line {
      font-size: 13px;
      color: #6B5F50;
      margin-top: 4px;
    }
    .card-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
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
      color: #6B5F50;
      transition: background 150ms ease;
      touch-action: manipulation;
    }
    .action-btn:hover {
      background: rgba(46, 39, 31, 0.07);
    }
    .action-btn.delete:hover {
      background: rgba(200, 86, 75, 0.12);
      color: #C6564B;
    }
    .rename-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .rename-input {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      padding: 9px 12px;
      border-radius: 10px;
      border: 2px solid rgba(46, 39, 31, 0.15);
      font-size: 14px;
      font-family: inherit;
      background: #ffffff;
      color: #2E271F;
      outline: none;
    }
    .btn-save-rename {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      background: #2E271F;
      color: #F4EBDB;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-cancel-rename {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 12px;
      border-radius: 100px;
      background: transparent;
      color: #6B5F50;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .delete-confirm-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(200, 86, 75, 0.1);
      border-radius: 14px;
      padding: 12px 14px;
      flex-wrap: wrap;
    }
    .delete-confirm-text {
      font-size: 13px;
      font-weight: 700;
      color: #A64236;
    }
    .delete-confirm-actions {
      display: flex;
      gap: 8px;
    }
    .btn-keep {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      background: transparent;
      color: #6B5F50;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-delete-confirm {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 100px;
      background: #C6564B;
      color: #FBF3E6;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
  `;te([y({type:Array})],X.prototype,"projects",2);te([y({type:Boolean})],X.prototype,"isAuthenticated",2);te([y({type:String})],X.prototype,"userEmail",2);te([y({type:String})],X.prototype,"syncStatus",2);te([u()],X.prototype,"isSyncing",2);te([u()],X.prototype,"renamingId",2);te([u()],X.prototype,"draftName",2);te([u()],X.prototype,"confirmDeleteId",2);te([u()],X.prototype,"emptyMascot",2);X=te([H("sets-screen")],X);var or=Object.defineProperty,rr=Object.getOwnPropertyDescriptor,re=(e,t,i,o)=>{for(var s=o>1?void 0:o?rr(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&or(t,i,s),s};const ti={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},nr=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ii={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},si={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},oi={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Ie={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}},ar=[4,9,2,7,11,4],ri=[7,0,4,9];let Z=class extends q{constructor(){super(...arguments),this.order=[0,1,2,3],this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.playInstrument="Piano",this.showDegrees=!1,this.activeChordIndex=null}parseChord(e){const t=/^([A-G][b#]?)(.*)$/.exec(e||"C"),i=t?t[1]:"C",o=t?t[2]:"",s=ii[o]||ii[oi[o]||"maj"]||[0,4,7];return{root:i,rootPc:ti[i]===void 0?0:ti[i],q:o,intervals:s}}shapeQual(e){const t=e===""?"maj":e;if(Ie[5][t]||Ie[6][t])return t;const i=oi[t];return i&&(Ie[5][i]||Ie[6][i])?i:"maj"}guitarVoicing(e){const t=this.parseChord(e),i=this.shapeQual(t.q),o=[];return[[6,4],[5,9]].forEach(([s,r])=>{const n=Ie[s][i];if(!n)return;const c=((t.rootPc-r)%12+12)%12;o.push({rootFret:c,frets:n.map(l=>l===null?null:l+c)})}),o.length?(o.sort((s,r)=>s.rootFret-r.rootFret),o[0].frets):null}ukeVoicing(e){const t=this.parseChord(e),i=ri,o=t.intervals.map(c=>(t.rootPc+c)%12),s=c=>{const l=new Set(c);let d=null;const p=[],a=f=>{if(f===4){const g=p.map((k,S)=>(i[S]+k)%12);for(const k of l)if(g.indexOf(k)<0)return;for(const k of g)if(!l.has(k))return;const x=p.filter(k=>k>0),m=x.length?Math.max(...x)-Math.min(...x):0;if(m>3)return;const v=m*12+p.reduce((k,S)=>k+S,0);(!d||v<d.score)&&(d={frets:p.slice(),score:v});return}for(let g=0;g<=5;g++)p.push(g),a(f+1),p.pop()};return a(0),d},r=s(o);if(r)return r.frets;const n=s(t.intervals.filter(c=>c!==7).map(c=>(t.rootPc+c)%12));return n?n.frets:null}degOf(e,t){return si[((e-t)%12+12)%12]||"1"}notesLineFor(e){return e.intervals.map(t=>{const i=nr[(e.rootPc+t)%12];return this.showDegrees?`${i} (${this.degOf((e.rootPc+t)%12,e.rootPc)})`:i}).join(" · ")}onChordClick(e){this.activeChordIndex=e,this.dispatchEvent(new CustomEvent("chord-preview",{detail:e,bubbles:!0,composed:!0})),setTimeout(()=>{this.activeChordIndex===e&&(this.activeChordIndex=null)},450)}onBackClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}renderPianoSvg(e,t){const r=[0,2,4,5,7,9,11],n=this.parseChord(e),c=[],l=[],d=[];for(let a=0;a<2;a++)r.forEach((f,g)=>{c.push({x:(a*7+g)*22,w:22-1.5,h:86})});for(let a=0;a<2;a++)[0,1,3,4,5].forEach(f=>{const g=a*7+f;l.push({x:g*22+22*.64,w:22*.58,h:52})});n.intervals.forEach(a=>{const f=n.rootPc+a,g=Math.floor(f/12),x=f%12,m=r.indexOf(x),v=a===0,k=v?"#F2735F":t,S=this.showDegrees&&si[a%12]||"";if(m>=0){const I=g*7+m;d.push({cx:I*22+(22-1.5)/2,cy:67,r:9,fill:k,label:S,lc:v?"#FBF3E6":"#2E271F"})}else{const w=(g*7+r.indexOf(x-1))*22+22*.64,O=22*.58;d.push({cx:w+O/2,cy:38,r:7.5,fill:k,label:S,lc:v?"#FBF3E6":"#2E271F"})}});const p=14*22;return h`
      <svg width="${p}" height="${86}" viewBox="0 0 ${p} ${86}" style="display:block;max-width:100%;height:auto;">
        ${c.map(a=>j`
          <rect x="${a.x}" y="0" width="${a.w}" height="${a.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${l.map(a=>j`
          <rect x="${a.x}" y="0" width="${a.w}" height="${a.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${d.map(a=>j`
          <circle cx="${a.cx}" cy="${a.cy}" r="${a.r}" fill="${a.fill}"></circle>
          ${a.label?j`
            <text x="${a.cx}" y="${a.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${a.lc}" font-family="'Plus Jakarta Sans',sans-serif">${a.label}</text>
          `:""}
        `)}
      </svg>
    `}renderFretSvg(e,t){const n=this.parseChord(e),c=t?ri:ar,l=t?this.ukeVoicing(e)||[null,null,null,null]:this.guitarVoicing(e)||[null,null,null,null,null,null],d=c.length,p=l.filter(w=>w!==null&&w>0),a=p.length&&Math.max(...p)>4?Math.min(...p)-1:0,f=[],g=[],x=[],m=[],v=[];for(let w=0;w<d;w++)f.push({x:w*18});for(let w=0;w<=4;w++)g.push({y:16+w*24,sw:w===0&&a===0?3:1.2});l.forEach((w,O)=>{const _=O*18;if(w===null){v.push({x:_});return}if(w===0){m.push({x:_});return}const K=((c[O]+w-n.rootPc)%12+12)%12;x.push({cx:_,cy:16+(w-a-.5)*24,fill:K===0?"#F2735F":"#2E271F",label:this.showDegrees?this.degOf((c[O]+w)%12,n.rootPc):""})});const k=(d-1)*18+26,S=16+4*24+12,I=(d-1)*18;return{posLabel:a>0?`${a+1}fr`:"",svg:h`
        <svg width="${k}" height="${S}" viewBox="-13 -2 ${k} ${S}" style="display:block;">
          ${g.map(w=>j`
            <rect x="0" y="${w.y}" width="${I}" height="${w.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${f.map(w=>j`
            <rect x="${w.x}" y="16" width="1.2" height="${4*24}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${m.map(w=>j`
            <circle cx="${w.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${v.map(w=>j`
            <text x="${w.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${x.map(w=>j`
            <circle cx="${w.cx}" cy="${w.cy}" r="7.5" fill="${w.fill}"></circle>
            ${w.label?j`
              <text x="${w.cx}" y="${w.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${w.label}</text>
            `:""}
          `)}
        </svg>
      `}}render(){if(!this.progression)return h``;const e=ve(this.progression.mood);this.style.setProperty("--active-mood-color",e);const t=this.order.map(s=>this.progression.chords[s]||this.progression.chords[0]),i=this.playInstrument==="Piano",o=i?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.";return h`
      <app-header
        .isAuthenticated=${this.isAuthenticated}
        .userEmail=${this.userEmail}
      ></app-header>

      <div class="container">
        <button class="back-btn" @click=${this.onBackClick}>
          ← Back to progression
        </button>

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
            ${t.map((s,r)=>{const n=this.parseChord(s.name),c=this.activeChordIndex===r;return h`
                <div
                  class="chord-card ${c?"lit":""}"
                  @click=${()=>this.onChordClick(r)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div class="chord-name">${s.name}</div>
                    <div class="chord-roman">${s.roman||""}</div>
                  </div>
                  ${this.renderPianoSvg(s.name,e)}
                  <div class="notes-line">${this.notesLineFor(n)}</div>
                </div>
              `})}
          </div>
        `:h`
          <div class="cards-grid fret-grid">
            ${t.map((s,r)=>{const n=this.parseChord(s.name),c=this.renderFretSvg(s.name,this.playInstrument==="Ukulele"),l=this.activeChordIndex===r;return h`
                <div
                  class="chord-card ${l?"lit":""}"
                  @click=${()=>this.onChordClick(r)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div style="display:flex;align-items:baseline;gap:8px;">
                      <div class="chord-name">${s.name}</div>
                      <div class="chord-roman">${s.roman||""}</div>
                    </div>
                    ${c.posLabel?h`<div class="pos-label">${c.posLabel}</div>`:""}
                  </div>
                  ${c.svg}
                  <div class="notes-line">${this.notesLineFor(n)}</div>
                </div>
              `})}
          </div>
        `}
      </div>
    `}};Z.styles=Y`
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
  `;re([y({type:Object})],Z.prototype,"progression",2);re([y({type:Array})],Z.prototype,"order",2);re([y({type:Boolean})],Z.prototype,"isAuthenticated",2);re([y({type:String})],Z.prototype,"userEmail",2);re([y({type:Number})],Z.prototype,"savedCount",2);re([u()],Z.prototype,"playInstrument",2);re([u()],Z.prototype,"showDegrees",2);re([u()],Z.prototype,"activeChordIndex",2);Z=re([H("play-along-screen")],Z);var lr=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,Se=(e,t,i,o)=>{for(var s=o>1?void 0:o?cr(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&lr(t,i,s),s};let de=class extends q{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}updated(e){e.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&fe.renderGoogleButton(this.googleBtnContainer,t=>{t.success?this.close():t.message&&(this.errorMessage=t.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const e=await fe.signInWithGoogle();e.success?this.close():e.message&&(this.errorMessage=e.message)}catch(e){const t=e instanceof Error?e.message:String(e);this.errorMessage=t||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return this.mounted?h`
      <div class="scrim ${this.open?"visible":""}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.open?"visible":""}" role="dialog" aria-modal="true" @keydown=${e=>e.key==="Escape"&&this.close()}>
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
    `:h``}};de.styles=Y`
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
      pointer-events: auto;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
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
  `;Se([y({type:Boolean})],de.prototype,"open",2);Se([u()],de.prototype,"mounted",2);Se([u()],de.prototype,"isOAuthLoading",2);Se([u()],de.prototype,"errorMessage",2);Se([kt("#google-btn-container")],de.prototype,"googleBtnContainer",2);de=Se([H("auth-modal")],de);var dr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,$=(e,t,i,o)=>{for(var s=o>1?void 0:o?hr(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&dr(t,i,s),s};let N=class extends q{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=e=>{e.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await fe.signOut(),z.logout()},this.previousScreenBeforeSets="seed"}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const e=localStorage.getItem("chroma-chords-instrument");e&&xe.some(i=>i.name===e)&&(this.instrument=e);const t=localStorage.getItem("chroma-chords-play-style");t&&we.some(i=>i.name===t)&&(this.playStyle=t),T.setInstrument(this.instrument),T.setPlayStyle(this.playStyle),this.unsubscribeAuth=fe.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=z.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=z.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=T.subscribeTick((i,o,s,r,n)=>{this.activeIndex=i,this.progressStep=o,typeof s=="number"&&(this.activePlayingSectionIdx=s),typeof r=="number"&&(this.totalSongSteps=r),this.playing=T.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),jt().then(i=>{this.chordData=i}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),T.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return z.isAdmin}syncRouteFromHash(){const e=window.location.hash.replace(/^#/,"").toLowerCase();e==="sets"||e==="11a"?(this.screen!=="sets"&&(this.previousScreenBeforeSets=this.screen),this.screen="sets"):e==="play-along"||e==="12a"?this.progression?this.screen="play-along":this.screen="seed":e==="song"||e==="5a"?this.progression?(this.screen="song",T.setSong(this.sections)):this.screen="seed":e==="loop"||e==="3a"||e==="8a"?this.progression?this.screen="loop":this.screen="seed":(e==="seed"||e==="2a"||!e)&&(this.screen="seed")}setScreen(e){this.screen=e;const t=`#${e}`;window.location.hash!==t&&history.pushState(null,"",t)}onGenreChange(e){this.genre=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onMoodChange(e){this.mood=e.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onFreetextSuggestionApplied(e){const t=e.detail;this.pendingChordSuggestion=t.chords?.length&&t.key&&t.scaleType?t:null,e.detail.promptText&&(this.activeSearchPrompt=e.detail.promptText)}async onGenerate(e){if(!this.isGenerating){this.isGenerating=!0;try{this.keyOverride=null,this.scaleOverride=null;const t=e?.detail?.promptText||this.activeSearchPrompt||void 0,i=await lo.resolvePrompt(this.chordData,this.genre,this.mood,this.length,t,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),T.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),T.setPlayStyle(i.playStyle));const o=i.progression;this.progression=o,this.order=Array.from({length:o.chords.length},(s,r)=>r),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,T.setProgression(o,this.order),T.reset(),this.setScreen("loop"),this.sections=Re.createInitialSong(o,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}catch(t){console.error("Failed to generate progression:",t),this.toastMessage="Failed to generate progression. Please try again.",setTimeout(()=>{this.toastMessage&&(this.toastMessage=null)},3500)}finally{this.isGenerating=!1}}}onLengthChange(e){this.length=e.detail}regenerate(){const e=ft(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=e,this.order=Array.from({length:this.length},(t,i)=>i),this.activeIndex=0,this.progressStep=0,T.setProgression(e,this.order),this.syncActiveSection(),this.playing&&(T.startAutoplay(),T.playActiveChord())}syncActiveSection(){this.progression&&(this.sections=Re.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order))}onSetKey(e){this.keyOverride=e.detail,this.regenerate()}onSetScale(e){this.scaleOverride=e.detail,this.regenerate()}onSetGenre(e){this.genre=e.detail,this.regenerate()}onSetMood(e){this.mood=e.detail,this.regenerate()}onSetLength(e){this.length=e.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(e){if(!this.progression)return;const t=this.order[this.activeIndex];this.order=e.detail;const i=this.order.indexOf(t);this.activeIndex=i>=0?i:0,T.setOrder(this.order,this.activeIndex),this.syncActiveSection()}onBack(){T.stopAutoplay(),this.playing=!1,this.setScreen("seed"),this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onViewSets(){T.stopAutoplay(),this.playing=!1,this.previousScreenBeforeSets=this.screen==="sets"?"seed":this.screen,this.setScreen("sets")}onBackFromSets(){T.stopAutoplay(),this.playing=!1,this.progression?this.setScreen(this.previousScreenBeforeSets==="song"?"song":"loop"):this.setScreen("seed")}async onLoadProject(e){const t=e.detail,i=z.getProjects().find(s=>s.id===t);if(!i)return;let o=Array.isArray(i.chords)?i.chords:[];if(o.length===0)try{let s=this.chordData;(!s||!s.scales||Object.keys(s.scales).length===0)&&(s=await jt(),this.chordData=s),o=ft(s,i.genre||"Pop",i.mood||"Neutral",{key:i.key||"C",scaleType:i.scaleType||"MAJOR",length:4}).chords,i.chords=o,z.saveProject(i)}catch(s){console.error(`Failed to auto-recover chords for project "${t}":`,s),this.showToast("Unable to load set: empty chord data.");return}this.currentProjectId=i.id,this.progression={genre:i.genre||"Unknown",mood:i.mood||"Neutral",key:i.key||"C",scaleType:i.scaleType||"MAJOR",bpm:i.bpm||120,chords:o},this.order=Array.from({length:this.progression.chords.length},(s,r)=>r),this.length=this.progression.chords.length,this.showTheory=i.showTheory??this.showTheory,T.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=Re.createInitialSong(this.progression,this.order),this.activeSectionIdx=0}onDeleteProject(e){z.deleteProject(e.detail),this.currentProjectId===e.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(e){const t=z.getProjects().find(i=>i.id===e.detail.id);t&&(t.name=e.detail.name,z.saveProject(t),this.requestUpdate())}async onSyncProjects(){await z.syncWithCloud(),this.requestUpdate()}onSaveSet(e){this.saveProject(e.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(e){this.instrument=e.detail,localStorage.setItem("chroma-chords-instrument",e.detail),T.setInstrument(e.detail)}onSetPlayStyle(e){this.playStyle=e.detail,localStorage.setItem("chroma-chords-play-style",e.detail),T.setPlayStyle(e.detail)}onTogglePlay(){this.playing=T.togglePlay()}onTogglePlaySong(){T.setSong(this.sections),this.playing=T.togglePlay()}onChordTap(e){this.progression&&(this.playing&&(T.stopAutoplay(),this.playing=!1),T.clearABOverride(),this.swapIndex=e.detail,this.sheetMode="swap",this.alternatives=qs(this.chordData,this.progression,e.detail),this.theoryGroups=Si(this.chordData,this.progression,e.detail),this.borrowedChords=Ys(this.chordData,this.progression,e.detail),this.sheetOpen=!0,T.playChordAtIndex(e.detail,.8))}onChordVoicingTap(e){this.progression&&(this.playing&&(T.stopAutoplay(),this.playing=!1),T.clearABOverride(),this.swapIndex=e.detail,this.sheetMode="voicing",this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.sheetOpen=!0,T.playChordAtIndex(e.detail,.8))}onChordPreview(e){this.progression&&(this.playing&&(T.stopAutoplay(),this.playing=!1),T.playChordAtIndex(e.detail,.8))}onAuditionChord(e){const t=e.detail;let i=Array.isArray(t.notes)?t.notes:[];i.length===0&&t.name&&this.progression&&(i=Me(t.name,oe(this.progression.key,this.progression.scaleType))),T.playChordNotes(i,.8)}onSheetClose(){T.clearABOverride(),this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(e){if(!this.progression||this.swapIndex===null)return;this.playing&&(T.stopAutoplay(),this.playing=!1),T.clearABOverride();const t=e.detail.chord??e.detail,i=[...this.progression.chords];i[this.swapIndex]=t,this.progression={...this.progression,chords:i},T.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),T.playChordNotes(t.notes,.8)}onVoicingPreview(e){T.playChordNotes(e.detail,.6)}onVoicingChange(e){if(!this.progression||this.swapIndex===null)return;const t=[...this.progression.chords];t[this.swapIndex]=Vs(t[this.swapIndex],e.detail.quality,e.detail.extension),this.progression={...this.progression,chords:t},T.setProgression(this.progression,this.order),this.syncActiveSection()}onBackToProgression(){T.stopAutoplay(),this.playing=!1,this.setScreen("loop"),this.progression&&T.setProgression(this.progression,this.order)}onViewSong(){T.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.setScreen("song"),T.setSong(this.sections)}onViewPlayAlong(){T.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.setScreen("play-along")}onBackFromPlayAlong(){this.setScreen("loop")}onSelectSection(e){const t=this.sections[e.detail];t&&(this.activeSectionIdx=e.detail,this.progression=t.progression,this.order=t.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=t.progression.chords.length,this.keyOverride=t.progression.key,this.scaleOverride=t.progression.scaleType,this.sheetOpen=!1,this.setScreen("loop"),T.setProgression(this.progression,this.order),this.playing&&(T.startAutoplay(),T.playActiveChord()))}onAddSection(){if(!this.progression)return;const e=Re.addSection(this.sections,this.progression);this.sections=e.sections,this.activeSectionIdx=e.activeIndex,this.screen==="song"&&T.setSong(this.sections)}showToast(e,t){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=e,this.toastUndoId=t||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},4500)}onToastUndo(){this.toastUndoId&&(z.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}onToastView(){this.toastMessage=null,this.toastUndoId=null,this.onViewSets()}saveProject(e){if(!this.progression)return;const t=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=t;const i=z.getProjects().find(r=>r.id===t),o=e||(i?i.name:`${this.progression.genre} · ${this.progression.mood}`),s={id:t,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};z.saveProject(s),e&&z.scheduleCloudSync(),this.showToast(`Saved "${o}"`,t),this.requestUpdate()}render(){let e;const t=!!(this.currentProjectId&&z.isProjectSaved(this.currentProjectId));if(this.screen==="sets")e=h`
        <sets-screen
          .projects=${z.getProjects()}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .syncStatus=${this.syncStatus}
          @back=${this.onBackFromSets}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
          @rename-project=${this.onRenameProject}
          @sync-projects=${this.onSyncProjects}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></sets-screen>
      `;else if(this.screen==="seed"||!this.progression)e=h`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .isAdmin=${this.isAdmin}
          .isGenerating=${this.isGenerating}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @view-sets=${this.onViewSets}
        ></seed-screen>
      `;else if(this.screen==="play-along"&&this.progression)e=h`
        <play-along-screen
          .progression=${this.progression}
          .order=${this.order}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${z.getProjects().length}
          @back=${()=>this.onBackFromPlayAlong()}
          @chord-preview=${i=>this.onChordPreview(i)}
        ></play-along-screen>
      `;else if(this.screen==="song")e=h`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length<Ae.length}
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
      `;else{const i=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;e=h`
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
          .userEmail=${this.userEmail}
          .isBookmarked=${t}
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${i}
          .swapIndex=${this.swapIndex}
          .alternatives=${this.alternatives}
          .theoryGroups=${this.theoryGroups}
          .borrowedChords=${this.borrowedChords}
          @back=${this.onBack}
          @theory-toggle=${this.onTheoryToggle}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @toggle-play=${this.onTogglePlay}
          @chord-tap=${this.onChordTap}
          @chord-voicing-tap=${this.onChordVoicingTap}
          @chord-preview=${this.onChordPreview}
          @audition-chord=${this.onAuditionChord}
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
          @view-play-along=${()=>this.onViewPlayAlong()}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></loop-screen>
      `}return h`
      <div class="screen-view">
        ${e}
        ${this.toastMessage?h`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              <button class="toast-btn" @click=${this.onToastView}>View</button>
              ${this.toastUndoId?h`
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:""}
            </div>
          </div>
        `:""}
        <auth-modal
          .open=${this.authModalOpen}
          @close-modal=${()=>{this.authModalOpen=!1}}
        ></auth-modal>
      </div>
    `}};N.styles=Y`
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
  `;$([u()],N.prototype,"chordData",2);$([u()],N.prototype,"screen",2);$([u()],N.prototype,"genre",2);$([u()],N.prototype,"mood",2);$([u()],N.prototype,"progression",2);$([u()],N.prototype,"activeIndex",2);$([u()],N.prototype,"progressStep",2);$([u()],N.prototype,"order",2);$([u()],N.prototype,"keyOverride",2);$([u()],N.prototype,"scaleOverride",2);$([u()],N.prototype,"playing",2);$([u()],N.prototype,"showTheory",2);$([u()],N.prototype,"instrument",2);$([u()],N.prototype,"playStyle",2);$([u()],N.prototype,"sheetOpen",2);$([u()],N.prototype,"sheetMode",2);$([u()],N.prototype,"swapIndex",2);$([u()],N.prototype,"alternatives",2);$([u()],N.prototype,"theoryGroups",2);$([u()],N.prototype,"borrowedChords",2);$([u()],N.prototype,"length",2);$([u()],N.prototype,"sections",2);$([u()],N.prototype,"activeSectionIdx",2);$([u()],N.prototype,"activePlayingSectionIdx",2);$([u()],N.prototype,"totalSongSteps",2);$([u()],N.prototype,"pendingChordSuggestion",2);$([u()],N.prototype,"userEmail",2);$([u()],N.prototype,"isAuthenticated",2);$([u()],N.prototype,"syncStatus",2);$([u()],N.prototype,"authModalOpen",2);$([u()],N.prototype,"toastMessage",2);$([u()],N.prototype,"toastUndoId",2);$([u()],N.prototype,"isGenerating",2);N=$([H("chroma-chords-app")],N);
