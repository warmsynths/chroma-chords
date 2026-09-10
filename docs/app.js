import{f as qi,u as Yi,s as li,n as ci,l as Hi,S as ie,P as V,F as Ae,M as di,C as pi,R as hi,a as ui,b as Wi,i as X,c as K,d as h,A as gi,O as Ji,w as U}from"./assets/vendor-7vM_bUxM.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xi={attribute:!0,type:String,converter:Yi,reflect:!1,hasChanged:qi},Ki=(t=Xi,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),o==="accessor"){const{name:r}=i;return{set(l){const d=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,d,t,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,t,l),l}}}if(o==="setter"){const{name:r}=i;return function(l){const d=this[r];e.call(this,l),this.requestUpdate(r,d,t,!0,l)}}throw Error("Unsupported decorator location: "+o)};function I(t){return(e,i)=>typeof i=="object"?Ki(t,e,i):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(t){return I({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qi=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mi(t,e){return(i,o,s)=>{const n=r=>r.renderRoot?.querySelector(t)??null;return Qi(i,o,{get(){return n(this)}})}}const be="chroma_chords_projects",Zi="chord_voyager_projects";class xe{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(be);if(e||(e=localStorage.getItem(Zi),e&&localStorage.setItem(be,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(be,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(be,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const n=o.get(s.id);!n||s.lastModified>n.lastModified?o.set(s.id,s):s.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem(be,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{localStorage.setItem(be,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),n=document.createElement("a");n.href=s,n.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((i,o)=>{const s=new FileReader;s.onload=n=>{try{const r=n.target?.result,l=JSON.parse(r);l&&typeof l=="object"&&Array.isArray(l.chords)?(l.id=Math.random().toString(36).substr(2,9),l.lastModified=Date.now(),i(l)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(e)})}}const Pe="chroma_chords_auth_token",He="chroma_chords_auth_user",eo="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function We(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function to(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return eo}}class io{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:to(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Pe);if(e){const i=We(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Pe),localStorage.removeItem(He),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=We(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=We(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Pe,e),localStorage.setItem(He,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const n=this.handleCredentialResponse(s.credential);i?.({success:n.success,message:n.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Pe),localStorage.removeItem(He)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const we=new io;class oo{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const n=new AbortController,r=setTimeout(()=>n.abort(),8e3),l=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:n.signal});if(clearTimeout(r),l.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await l.json().catch(()=>({}))).timestamp};if(l.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const d=await l.text().catch(()=>"");return{ok:!1,status:l.status,message:`Connection error (${l.status}): ${d||l.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,i);const r=new AbortController,l=setTimeout(()=>r.abort(),15e3),d=await fetch(`${s}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(o),signal:r.signal});if(clearTimeout(l),!d.ok){let u="";try{const g=await d.json();u=g.error||g.message||""}catch{u=await d.text().catch(()=>"")}throw new Error(`Cloud sync failed (${d.status}): ${u||d.statusText||"Unknown error"}`)}return await d.json()}}const so=new oo,Ot="chroma_chords_deleted_projects",Dt="chroma_chords_last_sync_time",no="https://chroma-chords-api.warmsynths.workers.dev";function ro(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return no}}function Bt(t){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(t):null}function Pt(t,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(t,e)}class ao{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=we.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return xe.getProjects()}isProjectSaved(e){return e?xe.getProjects().some(i=>i.id===e):!1}saveProject(e){xe.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){xe.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Bt(Ot);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Pt(Ot,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(n=>n.id===e),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:e,deletedAt:s}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return Bt(Dt)}setLastSyncTime(e){Pt(Dt,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await we.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||ro();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=xe.getProjects(),n=this.getTombstones(),r=this.getLastSyncTime(),l=s.map(p=>({...p,deletedAt:null})),d=await so.sync(o,i,{sets:l,lastSyncTime:r,tombstones:n}),u=new Map;s.forEach(p=>{u.set(p.id,{...p,syncedToCloud:!0})});const g=d.tombstones||[],c=new Set(g.map(p=>p.id));(d.sets||[]).forEach(p=>{if(p.deletedAt)c.add(p.id);else{const b=u.get(p.id),y=p.lastModified||(p.updatedAt?new Date(p.updatedAt).getTime():0),k=b?.lastModified||0;(!b||y>=k)&&u.set(p.id,{id:p.id,name:p.name,lastModified:y,genre:p.genre,mood:p.mood,key:p.key,scaleType:p.scaleType,bpm:p.bpm,showTheory:p.showTheory,chords:Array.isArray(p.chords)?p.chords:[],syncedToCloud:!0})}}),c.forEach(p=>{u.delete(p)});const f=Array.from(u.values());xe.setProjects(f);const v=this.getTombstones(),m=new Set(n.map(p=>p.id)),a=v.filter(p=>!m.has(p.id));this.setTombstones(a),(d.lastSyncTime||d.syncedAt)&&this.setLastSyncTime(d.lastSyncTime||d.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const P=new ao;let Je=null,Xe=null,Ke=null,Ft=null,Qe=null,Ze=null,et=null,tt=null,it=null,ot=null,st=null;function St(){return Je||(Je=new ui({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Je}function lo(){return Xe||(Xe=new Wi({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:t=>{console.warn("Failed to load Rhodes piano sampler:",t)}}).connect(St())),Xe}function co(t){const e=St();switch(t){case"organ":return Ke||(Ke=new V(ie,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(e)),Ke;case"pad-strings":return Qe||(Ft=new hi({decay:4.5,wet:.35}).connect(e),Qe=new V(ie,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Ft)),Qe;case"juno-pad":if(!et){Ze=new pi({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(e);try{Ze.start()}catch{}et=new V(ie,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Ze)}return et;case"stab":return tt||(tt=new V(di,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(e)),tt;case"epiano":return it||(it=new V(Ae,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(e)),it;case"guitar":return ot||(ot=new V(ie,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(e)),ot;case"bell":return st||(st=new V(Ae,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(e)),st;case"rhodes":default:return lo()}}const ge=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],me=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],$t={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},Ct={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},po={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function ho(t){const e=$t[t]??"rhodes";return po[e]??"Piano"}function uo(t){return(Ct[t]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function fi(){return Promise.race([Hi(),new Promise(t=>setTimeout(t,80))])}function vi(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function bi(t,e){const i=[];for(let o=0;o<e;o++)for(const s of t){const n=s.match(/^([A-G]#?)(-?\d+)$/);if(n){const r=n[1],l=parseInt(n[2],10)+o;i.push(`${r}${l}`)}else i.push(s)}return i}function xi(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const zt={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function go(t){if(!t)return;const e=t.toLowerCase().trim();return zt[e]?zt[e]:ge.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function mo(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":me.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function fo(t,e=.7,i,o="rhodes",s){try{Promise.all([li(),fi()]).then(()=>{const n=co(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof n.set=="function"&&n.set(s)}catch(u){console.warn("Failed to apply customConfig to Tone.js instrument:",u)}const r=t.length,l=r<=1?1:Math.max(.4,1/Math.sqrt(r)),d=ci();if(i&&i.arpMode&&i.arpMode!=="off"){const u=i.bpm??80,g=i.arpRate??"1/16",c=i.arpRange??1,f=i.arpMode,v=vi(g,u),m=bi(t,c),a=xi(m,f),p=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*l:l,b=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,v*.9);a.forEach((y,k)=>{const w=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;n.triggerAttackRelease(y,b,d+k*v+w,p())});return}t.forEach((u,g)=>{let c=0,f=l,v=e;if(i){const{minVelocity:m,maxVelocity:a,spread:p,microTiming:b,humanVariance:y,duration:k}=i;f=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(m+Math.random()*(a-m))/127)*l;const T=g*p*.1,B=(Math.random()-.5)*b*.05,Z=(Math.random()-.5)*y*.03;c=Math.max(0,T+B+Z),v=k*(1+(Math.random()-.5)*.2*y)}n.triggerAttackRelease(u,v,d+c,f)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function Ut(t,e,i){const o=e==="Unknown"||!e?"Pop":e,s=i?.instrument?ge.find(f=>f.name===i.instrument):void 0,n=i?.playStyle?me.find(f=>f.name===i.playStyle):void 0,r=s?.instrument??$t[o]??"rhodes",l=Ct[o]||{},d=n?.patch??{},u={...l,...d,bpm:i?.bpm??l.bpm??90,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},g=i?.duration??l.duration??.9,c=d.durationMultiplier?g*d.durationMultiplier:g;fo(t,c,u,r,i?.customConfig)}let nt=null;function vo(){if(!nt){const t=St();nt=new ie({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return nt}function bo(t,e=.8,i,o=.85){try{Promise.all([li(),fi()]).then(()=>{const s=vo(),r=`${t.replace(/\d+$/,"")}1`,l=typeof i=="number"?i:ci();s.triggerAttackRelease(r,e,l,o)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function xo(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,s=(Array.isArray(t)?t:[]).filter(u=>typeof u=="string"&&u.trim().length>0).map(u=>u.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let n=o,r=i[s[0]]??0;const l=[];s.forEach((u,g)=>{const c=i[u]??0;g>0&&c<=r&&n++,l.push({name:u,oct:n}),r=c});const d=(e||"").toLowerCase();if(d.includes("octave")||d.includes("high"))return l.map(u=>`${u.name}${u.oct+1}`);if(d.includes("inversion")||d.includes("1st")){if(l.length>1){const[u,...g]=l;return[...g.map(c=>`${c.name}${c.oct}`),`${u.name}${u.oct+1}`]}return l.map(u=>`${u.name}${u.oct}`)}else return l.map(u=>`${u.name}${u.oct}`)}const yo=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],wo=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],R={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},ko=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Oe=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ee={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14]},Io=Object.keys(ee),So={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Lt={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},yi={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},ut={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function O(t,e){const i=(t%12+12)%12;return e?wo[i]:yo[i]}function J(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",s=e;if(i&&/[A-G]/.test(i)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(o=`${i}b`,s=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(o=`${i}#`,s=e.slice(2)):(o=i,s=e.slice(1))}s=s.toLowerCase();let n="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?n="maj9":s.includes("min9")||s.includes("m9")?n="min9":s.includes("9")||s.includes("dom9")?n="dom9":s.includes("m(maj7)")||s.includes("mmaj7")||s.includes("minmaj7")?n="min7":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?n="maj7":s.includes("min7")||s.includes("m7")?n="min7":s.includes("dim7")?n="dim7":s.includes("dim")||s.includes("°")?n="dim":s.includes("aug")||s.includes("+")?n="aug":s.includes("sus2")?n="sus2":s.includes("sus4")||s.includes("sus")?n="sus4":s.includes("7")?n="dom7":s.includes("min")||s==="m"?n="min":n="maj",{root:o,quality:n}}const $o=Object.keys(ut),_e={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Me=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Co={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},To={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Tt={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},ke=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function ue(t){return(ke.find(e=>e.name===t)||ke[0]).dot}const Eo={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function No(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function Re(t,e){const i=t.reduce((s,n)=>s+e(n),0);let o=Math.random()*i;for(const s of t)if(o-=e(s),o<=0)return s;return t[t.length-1]}function Ao(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const gt=4,Ie=1,le=8,wi=1700,Mo={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Oo(t,e="MAJOR",i="Pop",o="Uplifting"){let n={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(n*=1.4),t==="SUBTONIC"&&(n*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(n*=1.8),t==="SUBDOMINANT"&&(n*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(n*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(n*=2),t==="SUBMEDIANT"&&(n*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(n*=2.5),t==="SUBDOMINANT"&&(n*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(n*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(n*=2.2),t==="SUBDOMINANT"&&(n*=1.8),t==="SUBMEDIANT"&&(n*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(n*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(n*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(n*=2.2),t==="SUPERTONIC"&&(n*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(n*=2),t==="SUBMEDIANT"&&(n*=1.6),t==="MEDIANT"&&(n*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(n*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.8),(Tt[o]||[]).includes(t)&&(n*=1.3),Math.max(.01,n)}function rt(t,e,i="MAJOR",o="Pop",s="Uplifting"){if(t===e)return .05;let r=(Mo[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(Tt[s]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function Do(t,e,i,o,s,n,r=gt){let l=i.filter(c=>t.degrees[c]);l.length||(l=i);const d=Re(l,c=>Oo(c,t.type,s,n))||"TONIC",u=[d];let g=d;for(let c=1;c<r;c++){const f=c===r-1;let v=i.filter(p=>t.degrees[p]);v.length||(v=i);const m=v.filter(p=>p!==g),a=m.length?m:v;if(f){const p=Re(a,b=>{const y=rt(b,u[0],t.type,s,n),k=rt(g,b,t.type,s,n);return y*k});u.push(p)}else{const p=a.filter(k=>!u.includes(k)),b=p.length?p:a,y=Re(b,k=>rt(g,k,t.type,s,n));g=y,u.push(y)}}return u}function Ve(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function q(t,e){const{root:i,quality:o}=J(t),s=R[i]??0,n=ee[o]||ee.maj,r=Ve(i,o,e);return n.map(l=>O(s+l,r))}async function Bo(){const t=typeof import.meta<"u"?"./":"/",e=t.endsWith("/")?t:`${t}/`,i=`${e}chroma_chords_data.json`,o=`${e}chord_voyager_data.json`;let s=await fetch(i).catch(()=>null);if((!s||!s.ok)&&(s=await fetch(o).catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chroma_chords_data.json").catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chord_voyager_data.json").catch(()=>null)),!s||!s.ok){const r=new URL("./chroma_chords_data.json",import.meta.url).href;s=await fetch(r)}if(!s.ok)throw new Error(`HTTP error: ${s.status}`);const n=await s.json();return jo(n),n}const Po={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Fo={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},zo={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Uo={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Lo={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Ro={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function jo(t){const e=[["MIXOLYDIAN",Po],["DORIAN",Fo],["LYDIAN",zo]];for(const[i,o]of e)for(const[s,n]of Object.entries(o)){const r=t.scales[`${n}_MAJOR`];if(!r)continue;const l=`${s}_${i}`,d={};for(const u of Ro[i]){const g=Lo[`${i}_${u}`],c=r.degrees[g];if(!c)continue;const f=JSON.parse(JSON.stringify(c));f.next_chord_options=(f.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${n}_MAJOR_`)){const m=v.nodeId.replace(`${n}_MAJOR_`,""),a=Uo[`${i}_${m}`];if(a)return{name:v.name,nodeId:`${s}_${i}_${a}`}}return v}),d[u]=f}t.scales[l]={root:s,type:i,degrees:d}}}const _o=[156,192,236],Go=[242,115,95];function je(t,e,i){return t+(e-t)*i}function Se(t){const e=Math.max(0,Math.min(1,t));return"#"+_o.map((o,s)=>Math.round(je(o,Go[s],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function H(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(je(84,128,e)),radius:Math.round(je(40,12,e)),fontSize:Math.round(je(21,30,e)),color:Se(e)}}function Vo(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function ki(t,e,i,o){const n=i.degrees[e].chord_name,r=yi[e]??.5,l=ut[i.type]||ut.MAJOR;return{name:Rt(n),tag:So[e]||"move",roman:l[e]||"?",color:Se(r),functionLabel:Lt[e]||e,notes:q(n,o),scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:Vo(Lt[e]||e,_e[i.type]||i.type,Rt(n)),degree:e,scaleKey:t,tension:r}}function Rt(t){const{root:e,quality:i}=J(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const qo={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Ii(t,e){let i=qo[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function mt(t,e,i,o){const s=Math.max(Ie,Math.min(le,o?.length??gt)),n=Co[e]||"MAJOR",r=To[i],l=o?.scaleType||(r&&n==="MAJOR"?r:n);let d=o?.key&&Oe.includes(o.key)?o.key:Ao(Oe),u=`${d}_${l}`;t.scales[u]||(d="C",u=`${d}_${l}`);let g=t.scales[u];if(!g){const k=Object.keys(t.scales).find(w=>w.endsWith(`_${l}`))||Object.keys(t.scales)[0];g=t.scales[k],d=g?g.root:"C",u=k}const c=_(d,l),f=Object.keys(g.degrees),v=Tt[i]||[],m=Eo[l]||[],a=s===gt?m.filter(k=>k.degrees.every(w=>f.includes(w))):[],y=(a.length&&Math.random()<.25?Re(a,k=>No(k,v)).degrees:Do(g,u,f,v,e,i,s)).map(k=>ki(u,k,g,c));return{genre:e,mood:i,key:d,scaleType:l,bpm:Ii(e,i),chords:y}}const Yo={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},Ho={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function Si(t){return ee[t]?t:J(`C${t||""}`).quality}function $i(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function Wo(t,e){const i=Yo[t]||{upper:"I",lower:"i"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return $i(s,e)}function Ci(t,e){const i=Ho[(t%12+12)%12]||{upper:"?",lower:"?"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return $i(s,e)}function Jo(t,e,i,o){const s=e==="maj"||e==="dom7"||e==="dom9",n=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&n)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=yi[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${o.root} ${_e[o.type]||o.type} progression.`}}function Ti(t,e,i,o){const s=(t%12+12)%12,n=(R[i]??0)+s,l=`${O(n,o)}${Et[e]??e}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${l} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${l} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${l} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${l} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${l} borrows its color from outside the current key.`}}function Xo(t,e,i,o,s){const n=i.degrees[e],{root:r}=J(n.chord_name),l=R[r]??0,d=O(l,s),u=`${d}${Et[o]??o}`,g=Ve(d,o,s),c=ee[o]?ee[o].map(m=>O(l+m,g)):q(n.chord_name,s),f=Wo(e,o),v=Jo(e,o,u,i);return{name:u,tag:v.tag,roman:f,color:Se(v.tension),functionLabel:v.functionLabel,notes:c,scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:v.desc,degree:e,scaleKey:t,tension:v.tension}}function Ko(t,e,i,o,s,n){const r=`${e}_${i}`,l=t.scales[r];if(!l||!o.length)return null;const d=_(e,i),u=R[e]??0,g={};Object.entries(l.degrees).forEach(([f,v])=>{const{root:m}=J(v.chord_name),a=R[m]??0;a in g||(g[a]=f)});const c=o.slice(0,le).map(({root:f,quality:v})=>{const m=R[f]??u,a=g[m],p=Si(v);if(a){const w=l.degrees[a],{quality:T}=J(w.chord_name);return p===T||!v&&T?ki(r,a,l,d):Xo(r,a,l,p,d)}const b=(m-u+12)%12,y=Ti(b,p,e,d),k=Ci(b,p);return Qo(e,b,p,y.functionLabel,k,y.tag,d)});return c.length<Ie?null:{genre:s,mood:n,key:e,scaleType:i,bpm:Ii(s,n),chords:c}}const Et={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Qo(t,e,i,o,s,n,r){const l=(R[t]??0)+e,d=O(l,r),u=Si(i),g=`${d}${Et[u]??u}`,c=Ve(d,u,r),f=(ee[u]||ee.maj).map(a=>O(l+a,c)),v=s==="?"?Ci(e,u):s,m=.42;return{name:g,tag:n,roman:v,color:Se(m),functionLabel:o==="Borrowed"?Ti(e,u,t,r).functionLabel:o,notes:f,scaleLabel:"Borrowed",desc:`${g} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:m}}function ft(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}const jt={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Ei(t,e,i,o){const s=R[t]??0;let n=jt[e]||jt.Major;return i==="6th"?n=[...n,9]:i==="7th (dom / m7)"?n=[...n,10]:i==="Major 7th (M7)"?n=[...n,11]:i==="9th"&&(n=[...n,10,14]),n.map(r=>O(s+r,o))}const Zo={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},es={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Ni(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Zo[e]??""}${es[i]??""}`}const ts={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},Ai={};Oe.forEach(t=>{Ai[R[t]]=t});function is(t,e){const i=ts[e]??0,s=(((R[t]??0)-i)%12+12)%12;return Ai[s]??"C"}function _(t,e){const i=is(t,e);return ko.has(i)||i.includes("b")}function _t(t,e,i){const o=ft(t.name),s=o.includes("b"),n=Ni(o,e,i),r=Ei(o,e,i,s);let l=t.roman||"";if(l){const g=l.match(/^([♭♯b#]*)([ivxIVX]+)/);if(g){const c=g[1],f=g[2],v=e==="Minor"||e==="Diminished",m=v?f.toLowerCase():f.toUpperCase();let a="";e==="Diminished"?a=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?a="sus4":i==="6th"?a="6":i==="7th (dom / m7)"?a="7":i==="Major 7th (M7)"?a=v?"m(maj7)":"maj7":i==="9th"&&(a=v?"m9":"maj9"),l=`${c}${m}${a}`}}let d=t.tension??1;e==="Diminished"?d=Math.max(d,3):e==="Suspended (sus)"?d=Math.max(d,2):i==="7th (dom / m7)"?d=Math.max(d,2.5):(i==="9th"||i==="Major 7th (M7)")&&(d=Math.max(d,2));const u=Se(d);return{...t,name:n,notes:r,roman:l,tension:d,color:u}}function z(t,e,i,o,s,n,r,l){const d=Ni(t,e,i),u=Ei(t,e,i,l);return{name:d,tag:o||"sub",roman:o,color:Se(r),functionLabel:s,notes:u,scaleLabel:"Substitution",desc:n,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function Nt(t,e,i){const o=R[e.key]??0,s=e.scaleType.includes("MINOR"),n=_(e.key,e.scaleType),r=s?[(()=>{const g=O(o+1,!0),c=z(g,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:c.name,roman:"♭II",notes:c.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:c,tension:.6}})(),(()=>{const g=O(o+5,!0),c=z(g,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — deeper minor mood",chord:c,tension:.45}})(),(()=>{const g=O(o+10,!0),c=z(g,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:c.name,roman:"v",notes:c.notes,sub:"a step further into shadow — unresolving drift",chord:c,tension:.52}})()]:[(()=>{const g=O(o+8,!0),c=z(g,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:c.name,roman:"♭VI",notes:c.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:c,tension:.5}})(),(()=>{const g=O(o+5,!0),c=z(g,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — softer, sadder",chord:c,tension:.42}})(),(()=>{const g=O(o+3,!0),c=z(g,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:c.name,roman:"♭III",notes:c.notes,sub:"a step further out — cooler, more remote",chord:c,tension:.58}})()],l=[(()=>{const g=O(o+7,n),c=O(o+2,n),f=z(c,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${g}7 — sharpens the approach`,.82,n);return{name:f.name,roman:"V7/V",notes:f.notes,sub:`aimed at ${g}7 — sharpens the approach`,chord:f,tension:.82}})(),(()=>{const g=O(o+(s?3:9),n),c=O(o+4,n),f=z(c,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${g}m7 — makes it feel arrived at`,.88,n);return{name:f.name,roman:"V7/vi",notes:f.notes,sub:`aimed at ${g}m7 — makes it feel arrived at`,chord:f,tension:.88}})(),(()=>{const g=O(o+1,!0),c=z(g,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:c.name,roman:"subV7",notes:c.notes,sub:"a tritone substitute — slides in sideways",chord:c,tension:.95}})()],d=[(()=>{const g=O(o+5,n),c=z(g,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,n);return{name:c.name,roman:"IV",notes:c.notes,sub:"floats rather than resolving",chord:c,tension:.3}})(),(()=>{const g=O(o,n),c=z(g,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,n);return{name:c.name,roman:s?"im9":"Imaj9",notes:c.notes,sub:"the same home with more air in it",chord:c,tension:.18}})(),(()=>{const g=O(o+(s?3:4),n),c=z(g,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,n);return{name:c.name,roman:s?"♭III":"iii",notes:c.notes,sub:"wistful, halfway between home and away",chord:c,tension:.35}})()],u=[(()=>{const g=O(o,n),c=z(g,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,n);return{name:c.name,roman:s?"i":"I",notes:c.notes,sub:"full resolution — the sense of arriving",chord:c,tension:.05}})(),(()=>{const g=O(o+7,n),c=z(g,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,n);return{name:c.name,roman:"V7",notes:c.notes,sub:"the pull that makes home feel earned",chord:c,tension:1}})(),(()=>{const g=O(o+(s?8:9),n),c=z(g,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,n);return{name:c.name,roman:s?"♭VI":"vi",notes:c.notes,sub:"a soft landing instead of a full stop",chord:c,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:l},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:d},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:u}]}function Mi(t,e,i){const o=R[e.key]??0,s=e.scaleType.includes("MINOR"),n=_(e.key,e.scaleType),r=e.chords;if(s){const a=r[0]?.name||"chord 1",p=r[1]?.name||"chord 2",b=r[2]?.name||"chord 3",y=r[3]?.name||"chord 4",k=z(O(o,n),"Major","None","I","Major tonic","same root, turned bright",.2,n),w=z(O(o+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n),T=z(O(o+9,n),"Minor","None","vi","Submediant","melodic lift upward",.4,n),B=z(O(o+11,n),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,n);return[{name:k.name,sub:`in place of ${a} · same root, turned bright`,roman:"I",notes:k.notes,chord:k,tension:.2},{name:w.name,sub:`in place of ${p} · the Dorian lift, sunny and open`,roman:"IV",notes:w.notes,chord:w,tension:.35},{name:T.name,sub:`in place of ${b} · melodic lift upward`,roman:"vi",notes:T.notes,chord:T,tension:.4},{name:B.name,sub:`in place of ${y} · classical harmonic pull`,roman:"vii°",notes:B.notes,chord:B,tension:.55}]}const l=r[0]?.name||"chord 1",d=r[1]?.name||"chord 2",u=r[2]?.name||"chord 3",g=r[3]?.name||"chord 4",c=z(O(o,n),"Minor","None","i","Tonic minor","same root, turned sad",.3,n),f=z(O(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),v=z(O(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),m=z(O(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:c.name,sub:`in place of ${l} · same root, turned sad`,roman:"i",notes:c.notes,chord:c,tension:.3},{name:f.name,sub:`in place of ${d} · the lift, but heavier`,roman:"iv",notes:f.notes,chord:f,tension:.4},{name:v.name,sub:`in place of ${u} · big and cinematic`,roman:"♭VI",notes:v.notes,chord:v,tension:.45},{name:m.name,sub:`in place of ${g} · lands sideways, not home`,roman:"♭VII",notes:m.notes,chord:m,tension:.5}]}function os(t,e,i){return Nt(t,e).map(s=>{const n=s.rows[0];return{label:s.name,sub:s.sub,chord:n.chord,functionCaption:`${n.roman} · ${n.notes.join(" · ")}`,rationale:n.sub}})}const ss={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},ns={m8:43303,circuit:43302};function rs(t,e,i){let o=ss[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${ns[e]}/`);const n=(i&&i.length>0?i.map(r=>t.chords[r]).filter(r=>!!r):t.chords).map(r=>encodeURIComponent(r.name)).join("+");return`${o}?p=${n}`}const as={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function ls(t,e){const{root:i,quality:o}=J(t),s=R[i]??0,n=ee[o]||ee.maj,r=Ve(i,o,e);return n.map(l=>{const d=O(s+l,r),u=as[l]||{symbol:`+${l}`,name:`Interval ${l}`,isGuideTone:!1};return{note:d,intervalSymbol:u.symbol,roleName:u.name,isGuideTone:u.isGuideTone}})}function cs(t){if(!t||t.length<2)return[];const e=[],i=o=>o.replace(/[^A-Za-z♭♯]/g,"");for(let o=0;o<t.length;o++){const s=o,n=(o+1)%t.length,r=t[s],l=t[n],d=i(r.roman),u=i(l.roman),g=s+1,c=n+1,f=`Bar ${g} → ${c}`,v=`${r.name} → ${l.name}`,m=`${r.roman}–${l.roman}`;(d==="V"||d==="v")&&(u==="I"||u==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${l.name} (${r.roman}–${l.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name}):(d==="IV"||d==="iv")&&(u==="I"||u==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${l.name} (${r.roman}–${l.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name}):(d==="V"||d==="v")&&(u==="vi"||u==="♭VI"||u==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${l.name} (${r.roman}–${l.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name}):d==="♭VII"&&(u==="I"||u==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${l.name} (♭VII–${l.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name}):(u==="V"||u==="v")&&d!=="V"&&d!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${l.name} (${r.roman}–${l.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${l.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${l.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${l.name}.`,move:v,degrees:m,bars:f,fromBar:g,toBar:c,fromChord:r.name,toChord:l.name})}return e}function ds(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const o=i,s=(i+1)%t.length,n=t[o],r=t[s],l=new Set(n.notes.map(p=>R[p]??0)),d=r.notes.filter(p=>l.has(R[p]??-1)),u=R[ft(n.name)]??0,g=R[ft(r.name)]??0,c=Math.min((g-u+12)%12,(u-g+12)%12);let f="Harmonic Shift";d.length>=2?f=`Strong Common Tones (${d.length} shared)`:c<=2?f="Stepwise Bass Motion":(c===5||c===7)&&(f="4th / 5th Cycle Jump");const v=`Bar ${o+1} → ${s+1}`,m=`${n.name} → ${r.name}`,a=d.length?`${d.join(" · ")} held over`:c<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:o+1,toBar:s+1,fromChord:n.name,toChord:r.name,move:v,chords:m,link:a,hasShared:d.length>0,commonNotes:d,semitoneDistance:c,motionType:f})}return e}function Gt(t,e=4){const i=Array.isArray(t)?t.filter(c=>typeof c=="string"&&c.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(c=>c.replace(/\d+$/,"")),n=s[0],r=o[n]??0;let l=e,d=r;const u=[];return s.forEach((c,f)=>{const v=o[c]??0;f>0&&v<=d&&l++,u.push(`${c}${l}`),d=v}),[`${n}${e-1}`,...u]}class ps{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?this.order=i||Array.from({length:e.chords.length},(o,s)=>s):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){this.progression&&(this.progression.bpm=e)}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(e<i+s){this.activeSectionIndex=o;const n=e-i;this.activeIndex=this.sections[o].order[n]??0,this.progressStep=n;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const e=this.getTotalSteps();if(e<=0)return;this.songStep=(this.songStep+1)%e,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},wi)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:q(o.name,_(e.progression.key,e.progression.scaleType)),n=Gt(s,4);Ut(n,e.progression.genre,{bpm:e.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",n=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";o=q(s,_(n,r))}this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&bo(o[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",n=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";o=q(s,_(n,r))}this.playChordNotes(o,i)}playChordAtIndex(e,i=.8,o,s){if(!this.progression||!this.progression.chords[e])return;const n=this.progression.chords[e];let r=Array.isArray(n.notes)?n.notes:[];if(r.length===0||!r.every(l=>typeof l=="string"&&l.trim().length>0)){const l=n.name||"CMAJ",d=this.progression.key||"C",u=this.progression.scaleType||"MAJOR";r=q(l,_(d,u))}this.playChordNotes(r,i,o,s)}playChordNotes(e,i,o,s){if(!this.progression)return;const n=Array.isArray(e)?e.filter(l=>typeof l=="string"&&l.trim().length>0):[];if(n.length===0)return;const r=o?xo(n,o):Gt(n,4);Ut(r,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0,velocity:s})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const C=new ps,hs=ke.map(t=>t.name),us=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function gs(t,e){const i=t.length+1,o=e.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let n=0;n<i;n++)s[n][0]=n;for(let n=0;n<o;n++)s[0][n]=n;for(let n=1;n<i;n++)for(let r=1;r<o;r++)s[n][r]=t[n-1]===e[r-1]?s[n-1][r-1]:1+Math.min(s[n-1][r-1],s[n-1][r],s[n][r-1]);return s[i-1][o-1]}function he(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),s=e.find(d=>d.toLowerCase()===o);if(s)return s;let n=null,r=1/0;for(const d of e){const u=gs(o,d.toLowerCase());u<r&&(r=u,n=d)}const l=Math.max(2,Math.floor(o.length*.4));return r<=l?n:null}function ms(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,s=he(o.root,Oe),n=he(o.quality,Io);s&&n&&e.push({root:s,quality:n})}if(e.length)return e.slice(0,le)}function fs(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=he(e.presetId,us)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function at(t,e){const i=t&&typeof t=="object"?t:{},o=he(i.genre,Me)??e.genre,s=he(i.mood,hs)??e.mood,n=he(i.key,Oe)??void 0,r=he(i.scaleType,$o)??void 0,l=n&&r?ms(i.chords):void 0;let d;typeof i.length=="number"&&Number.isFinite(i.length)&&(d=Math.max(Ie,Math.min(le,Math.round(i.length))));const u=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,g=fs(i.instrumentConfig),c=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:n,scaleType:r,length:d,chords:l,rhythmStyle:u,instrumentConfig:g,_rateLimit:c}}const vs=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],vt=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Oi="chroma-chords-llm-provider",Di="chroma-chords-llm-model";function Bi(){const t=localStorage.getItem(Oi);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function bs(t){localStorage.setItem(Oi,t)}function Pi(){const t=localStorage.getItem(Di);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:vt[0].id}function lt(t){localStorage.setItem(Di,t)}const ct={genre:Me[0],mood:ke[0].name},Fi="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",xs=12e3;async function ys(){try{const t=await fetch(Fi);if(t.ok)return await t.json()}catch{}return null}const zi={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Ui={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Ge(t,e){const i=t.toLowerCase();let o=null,s=0;return Object.keys(e).forEach(n=>{const r=e[n].reduce((l,d)=>l+(i.includes(d)?1:0),0);r>s&&(s=r,o=n)}),o}function Li(t){const e=Ge(t,Ui),i=Ge(t,zi);return!e||!i?null:{genre:e,mood:i}}async function ws(t){const e=new AbortController,i=setTimeout(()=>e.abort(),xs);try{const s=await fetch(Fi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Bi(),model:Pi()}),signal:e.signal}),n=await s.json().catch(()=>null);if(!s.ok||n&&typeof n=="object"&&"error"in n){const r=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${s.status}`,l=new Error(`Classifier request failed: ${r}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(l._rateLimit=n._rateLimit),l}return n}finally{clearTimeout(i)}}async function ks(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=Ge(s,Ui)??"Synthwave",r=Ge(s,zi)??"Dreamy",l={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},d={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},u={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},g=u[n]||u._default,c=l[n]||"rhodes",f=d[n]||"slow_arpeggio",v={genre:n,mood:r,key:g.key,scaleType:g.scaleType,length:8,chords:g.chords,rhythmStyle:f,instrumentConfig:{presetId:c,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return at(v,{genre:n,mood:r})}const o=Li(t);try{const s=await ws(t);return at(s,o??ct)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const n=at(o??ct,ct);return s&&typeof s=="object"&&"_rateLimit"in s&&(n._rateLimit=s._rateLimit),n}}class Is{static async resolvePrompt(e,i,o,s,n,r){let l=r||null,d=null,u=null;if(!l&&n&&n.trim().length>0)try{l=await ks(n)}catch(f){console.warn("Failed to classify prompt via LLM/local fallback:",f)}const g=!!(l&&l.chords?.length&&l.key&&l.scaleType);let c=null;return g&&l&&l.chords&&l.key&&l.scaleType&&(c=Ko(e,l.key,l.scaleType,l.chords,l.genre||i,l.mood||o)),c||(c=mt(e,i,o,{length:s})),g&&l&&(l.instrumentConfig?.presetId&&(d=go(l.instrumentConfig.presetId)??null),l.rhythmStyle&&(u=mo(l.rhythmStyle)??null)),c.chords.length>s&&(c={...c,chords:c.chords.slice(0,s)}),n&&(c={...c,searchTerm:n}),{progression:c,instrument:d,playStyle:u,normalizedSuggestion:l}}}const Fe=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)}];class ye{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(s,n)=>n);return[{name:Fe[0].name,desc:Fe[0].desc,progression:e,order:o.slice()}]}static addSection(e,i){if(e.length>=Fe.length)return{sections:e,activeIndex:e.length-1};const o=Fe[e.length],s=o.reorder(i.chords.length),n={name:o.name,desc:o.desc,progression:i,order:s},r=[...e,n];return{sections:r,activeIndex:r.length-1}}static syncActiveSection(e,i,o,s){if(!e[i])return e;const n=[...e];return n[i]={...n[i],progression:o,order:s.slice()},n}}const j=4,ne=45e3,Vt="chroma_chords_capacity_v2";class Ss{constructor(){this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=Date.now(),this.timer=null,this.subscribers=new Set,this.init()}init(){try{if(typeof localStorage<"u"){const e=localStorage.getItem(Vt),i=Date.now();if(e){const o=JSON.parse(e),s=typeof o.charges=="number"?o.charges:j,n=typeof o.lastTime=="number"?o.lastTime:i;if(s<j){const r=Math.max(0,i-n),l=Math.floor(r/ne);this.charges=Math.min(j,s+l);const d=r%ne;this.rechargeNextSec=Math.max(1,Math.ceil((ne-d)/1e3)),this.lastCapacityTime=i-d}else this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=i}else this.charges=j,this.rechargeNextSec=45,this.lastCapacityTime=i}}catch{this.charges=j,this.rechargeNextSec=45}this.save(),this.startTimer()}save(){try{typeof localStorage<"u"&&localStorage.setItem(Vt,JSON.stringify({charges:this.charges,lastTime:this.lastCapacityTime}))}catch{}}startTimer(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(this.charges<j){const e=Date.now(),i=Math.max(0,e-this.lastCapacityTime);if(i>=ne){const s=Math.floor(i/ne);this.charges=Math.min(j,this.charges+s),this.lastCapacityTime=e-i%ne,this.save()}const o=(e-this.lastCapacityTime)%ne;this.rechargeNextSec=Math.max(1,Math.ceil((ne-o)/1e3))}else this.rechargeNextSec=45;this.notify()},1e3)}getState(){return{charges:this.charges,max:j,rechargeNextSec:this.rechargeNextSec}}getCharges(){return this.charges}getRechargeNextSec(){return this.rechargeNextSec}getCapacityMax(){return j}spendCharge(){return this.charges<=0?(this.notify(),!1):(this.charges===j&&(this.lastCapacityTime=Date.now()),this.charges-=1,this.save(),this.notify(),!0)}subscribe(e){return this.subscribers.add(e),e(this.getState()),()=>{this.subscribers.delete(e)}}notify(){const e=this.getState();this.subscribers.forEach(i=>{try{i(e)}catch(o){console.error("Error in CapacityService subscriber callback:",o)}})}}const bt=new Ss;var $s=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,Y=(t,e,i,o)=>{for(var s=o>1?void 0:o?Cs(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&$s(e,i,s),s};let G=class extends K{constructor(){super(...arguments),this.compact=!1,this.hideCapacity=!1,this.isAdmin=!1,this.capacityCharges=4,this.capacityMax=4,this.rechargeNextSec=60,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeCapacity=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=P.subscribeProjects(()=>{this.savedCount=P.getProjects().length,this.syncStatus=P.getSyncStatus(),this.requestUpdate()}),this.unsubscribeCapacity=bt.subscribe(t=>{this.capacityCharges=t.charges,this.capacityMax=t.max,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.savedCount=P.getProjects().length}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeCapacity&&this.unsubscribeCapacity()}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.accountMenuOpen=!1}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.showCapacityNote=!1}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}render(){const t=(this.userEmail||"U")[0].toUpperCase();return h`
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
    `}};G.styles=X`
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
  `;Y([I({type:Boolean})],G.prototype,"compact",2);Y([I({type:Boolean})],G.prototype,"hideCapacity",2);Y([I({type:Boolean})],G.prototype,"isAdmin",2);Y([I({type:Number})],G.prototype,"capacityCharges",2);Y([I({type:Number})],G.prototype,"capacityMax",2);Y([I({type:Number})],G.prototype,"rechargeNextSec",2);Y([I({type:Boolean})],G.prototype,"isAuthenticated",2);Y([I({type:String})],G.prototype,"userEmail",2);Y([I({type:Number})],G.prototype,"savedCount",2);Y([I({type:String})],G.prototype,"syncStatus",2);Y([I({type:String})],G.prototype,"title",2);Y([x()],G.prototype,"accountMenuOpen",2);Y([x()],G.prototype,"showCapacityNote",2);G=Y([Q("app-header")],G);var Ts=Object.defineProperty,Es=Object.getOwnPropertyDescriptor,At=(t,e,i,o)=>{for(var s=o>1?void 0:o?Es(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ts(e,i,s),s};const xt=["bean","bird","cat","note"];function yt(t=.45){return{show:Math.random()<t,kind:xt[Math.floor(Math.random()*xt.length)]}}function wt(t){return t[Math.floor(Math.random()*t.length)]}class Ri{constructor(e=7,i=1800){this.threshold=e,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const Ns={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let De=class extends K{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(t){if(t.has("kind")||t.has("scale")){const{width:e,height:i}=Ns[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const t="#D98A54";return h`
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
    `}render(){const t=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return t?h`<div style="transform:scale(${this.scale}); transform-origin:top left;">${t}</div>`:gi}};De.styles=X`
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
  `;At([I({type:String})],De.prototype,"kind",2);At([I({type:Number})],De.prototype,"scale",2);De=At([Q("mascot-character")],De);var As=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,Mt=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ms(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&As(e,i,s),s};const kt=3200;let Be=class extends K{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(t){t.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},kt))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?h`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${xt.map(t=>h`<mascot-character .kind=${t} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:gi}};Be.styles=X`
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
      animation: egg-pop ${kt}ms ease forwards;
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
      animation: egg-caption-pop ${kt}ms ease forwards;
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
  `;Mt([I({type:Number})],Be.prototype,"trigger",2);Mt([x()],Be.prototype,"visible",2);Be=Mt([Q("mascot-parade")],Be);var Os=Object.defineProperty,Ds=Object.getOwnPropertyDescriptor,D=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ds(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Os(e,i,s),s};const Bs=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],Ps=["#F2A79B","#9CC0EC","#F6D98B"],Fs=[6,3,12],qt=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],zs=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Us=["Warm","Melancholy","Nostalgic","Dreamy"],dt=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let A=class extends K{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=yt(.35),this.mascotSlot=wt(Bs),this.peekMascot=yt(.18),this.peekSide=wt(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.isGenerating=!1,this.currentProvider=Bi(),this.currentModel=Pi(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=j,this.rechargeNextSec=45,this.showCapacityNote=!1,this.unsubscribeCapacity=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new Ri,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const t=performance.now(),e=this.getBoundingClientRect(),i=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let o=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const s=this.shadowRoot?.querySelector(".divider-row");if(s){const l=s.getBoundingClientRect();l.top>e.top&&(o=l.top-e.top)}const n=this.jellyBodies,r=n.length;for(let l=0;l<r;l++){const d=n[l];if(d.vx+=Math.sin(t*6e-4*d.driftFreqX+d.driftPhaseX)*d.driftForce,d.vy+=Math.cos(t*7e-4*d.driftFreqY+d.driftPhaseY)*d.driftForce,this.mouseX!==null&&this.mouseY!==null){const c=d.x-this.mouseX,f=d.y-this.mouseY,v=Math.hypot(c,f);if(v<140&&v>0){const m=(1-v/140)*.12;d.vx+=c/v*m,d.vy+=f/v*m}}d.vx*=d.drag,d.vy*=d.drag;const u=Math.hypot(d.vx,d.vy);u>d.maxSpeed&&(d.vx=d.vx/u*d.maxSpeed,d.vy=d.vy/u*d.maxSpeed),d.x+=d.vx,d.y+=d.vy,d.angle+=d.vRot;const g=d.radius;d.x<g?(d.x=g,d.vx=Math.abs(d.vx)*d.restitution+.02,d.squishX=.88,d.squishY=1.12):d.x>i-g&&(d.x=i-g,d.vx=-Math.abs(d.vx)*d.restitution-.02,d.squishX=.88,d.squishY=1.12),d.y<g?(d.y=g,d.vy=Math.abs(d.vy)*d.restitution+.02,d.squishX=1.12,d.squishY=.88):d.y>o-g&&(d.y=o-g,d.vy=-Math.abs(d.vy)*d.restitution-.02,d.squishX=1.12,d.squishY=.88),d.squishX+=(1-d.squishX)*.08,d.squishY+=(1-d.squishY)*.08}for(let l=0;l<r;l++)for(let d=l+1;d<r;d++){const u=n[l],g=n[d],c=g.x-u.x,f=g.y-u.y,v=Math.hypot(c,f),m=u.radius+g.radius;if(v<m&&v>0){const a=m-v,p=c/v,b=f/v;u.x-=p*a*.4,u.y-=b*a*.4,g.x+=p*a*.4,g.y+=b*a*.4;const y=u.vx-g.vx,k=u.vy-g.vy,w=(p*y+b*k)/(u.mass+g.mass),T=.35;u.vx-=w*g.mass*p*T,u.vy-=w*g.mass*b*T,g.vx+=w*u.mass*p*T,g.vy+=w*u.mass*b*T;const B=.12;u.squishX=Math.max(.85,1-B*Math.abs(p)),u.squishY=Math.max(.85,1-B*Math.abs(b)),g.squishX=Math.max(.85,1-B*Math.abs(p)),g.squishY=Math.max(.85,1-B*Math.abs(b))}}if(this.shadowRoot)for(let l=0;l<r;l++){const d=n[l],u=this.shadowRoot.getElementById(`jelly-${d.id}`);u&&(u.style.transform=`translate3d(${d.x-d.radius}px, ${d.y-d.radius}px, 0) rotate(${d.angle}deg) scale(${d.squishX}, ${d.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(!this.isGenerating){if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}}spendCapacityCharge(){const t=bt.spendCharge();return t||(this.showCapacityNote=!0),t}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*dt.length),this.loadingTimer=setInterval(()=>{let t=Math.floor(Math.random()*dt.length);t===this.loadingMsgIdx&&(t=(t+1)%dt.length),this.loadingMsgIdx=t},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(t){this.currentProvider=t,bs(t),t==="google"?(this.currentModel=vt[0].id,lt(this.currentModel)):t==="opencodeai"&&(this.currentModel=vs[0].id,lt(this.currentModel))}changeModel(t){this.currentModel=t,lt(t)}initJellyBodies(){const t=this.getBoundingClientRect(),e=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let i=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const o=Math.min(i,400),s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],n=3,r=[];for(let l=0;l<n;l++){const d=s[l%s.length],u=d.r+30,g=u+Math.random()*Math.max(100,e-u*2),c=u+Math.random()*Math.max(50,o-u*2),f=.08+Math.random()*.18,v=.35+Math.random()*.25,m=.985,a=.006+Math.random()*.008,p=.35,b=Math.random()*Math.PI*2;r.push({id:l,shapeKey:d.key,width:d.r*2,height:d.r*2,x:g,y:c,vx:Math.cos(b)*f,vy:Math.sin(b)*f,maxSpeed:v,drag:m,driftForce:a,restitution:p,radius:d.r,mass:d.r*d.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=r}onFrameMouseMove(t){const e=this.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){ys().then(t=>{t&&(t.google&&(this.googleLimit=t.google.limit,this.googleRemaining=t.google.remaining,this.googleCooldownSec=t.google.cooldownSeconds),t.openrouter&&(this.orLimit=t.openrouter.limit,this.orRemaining=t.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%qt.length},2800),this.unsubscribeCapacity=bt.subscribe(t=>{this.capacityCharges=t.charges,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(t){super.updated(t),t.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.unsubscribeCapacity&&(this.unsubscribeCapacity(),this.unsubscribeCapacity=null),this.stopLoadingTimer()}selectGenre(t){this.dispatchEvent(new CustomEvent("genre-change",{detail:t,bubbles:!0,composed:!0}))}selectMood(t){this.dispatchEvent(new CustomEvent("mood-change",{detail:t,bubbles:!0,composed:!0}))}setLength(t){this.dispatchEvent(new CustomEvent("length-change",{detail:t,bubbles:!0,composed:!0}))}decLength(){this.length>Ie&&this.setLength(this.length-1)}incLength(){this.length<le&&this.setLength(this.length+1)}onFreeTextChange(t){this.freeText=t.target.value}applyBest(t){this.selectGenre(t.genre),this.selectMood(t.mood);const e={...t,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:e,bubbles:!0,composed:!0}))}renderJellySvg(t){switch(t){case"blob1":return h`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return h`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return h`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return h`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return h`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return h`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return h`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return h`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return h`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return h`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return h`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return h`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return h`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return h`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const t=ue(this.mood);let e=zs.filter(c=>Me.includes(c));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const i=Me.filter(c=>!e.includes(c)),o=this.expandedGenre?e.concat(i):e,s=ke.map(c=>c.name);let n=Us.filter(c=>s.includes(c));n.includes(this.mood)||(n=n.slice(0,-1).concat(this.mood));const r=s.filter(c=>!n.includes(c)),d=(this.expandedMood?n.concat(r):n).map(c=>ke.find(f=>f.name===c)),u=this.freeText.trim(),g=u.length>2?Li(u):null;return h`
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
          ${this.jellyBodies.map(c=>h`
            <div class="jelly-shape-wrapper" id="jelly-${c.id}" style="transform: translate3d(${c.x-c.radius}px, ${c.y-c.radius}px, 0) rotate(${c.angle}deg) scale(${c.squishX}, ${c.squishY})">
              ${this.renderJellySvg(c.shapeKey)}
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
                @input=${c=>this.onFreeTextChange(c)}
                @keydown=${c=>{c.key==="Enter"&&!this.isGenerating&&(c.preventDefault(),this.generate())}}
                placeholder=${this.isGenerating?"Composing your chords...":qt[this.placeholderIdx]}
              />
              <button
                class="vibe-capacity-chip ${this.capacityCharges<=1?"low":""}"
                @click=${c=>{c.stopPropagation(),this.showCapacityNote=!this.showCapacityNote}}
                title=${this.capacityCharges>0?`${this.capacityCharges} of ${j} AI generates left. One comes back every ${this.rechargeNextSec>0?this.rechargeNextSec:45}s.`:`Cooling down — next one unlocks in ${Math.floor(this.rechargeNextSec/60)}:${String(this.rechargeNextSec%60).padStart(2,"0")}`}
                aria-label="AI generates remaining"
                type="button"
              >
                <span class="pips-wrap">
                  ${Array.from({length:j},(c,f)=>h`
                    <span class="pip ${f<this.capacityCharges?"filled":""} ${this.capacityCharges<=1?"low":""}"></span>
                  `)}
                </span>
                <span>${this.capacityCharges>0?`${this.capacityCharges} left`:`+1 in ${this.rechargeNextSec}s`}</span>
              </button>
              <button
                class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
                style="background: ${t}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
                @click=${c=>{c.stopPropagation(),this.generate()}}
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
          ${g?h`
            <div style="text-align:center;margin-top:10px;">
              <div style="display:inline-flex;align-items:center;gap:6px;border:1.5px solid ${t};color:#2E271F;padding:8px 16px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;background:#FBF3E6;transition:transform 150ms ease;" @click=${()=>this.applyBest(g)}>
                Try <span style="font-weight:800;">${g.genre} · ${g.mood}</span> →
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
            ${o.map(c=>{const f=Me.indexOf(c);return h`
                <div class="pill ${c===this.genre?"selected":""}" style=${c===this.genre?`background:${t}`:""} @click=${()=>this.selectGenre(c)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${Fs[f%3]} fill=${Ps[f%3]} />
                    </svg>
                  </div>
                  ${c}
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
            ${d.map(c=>h`
              <div class="pill mood-pill ${c.name===this.mood?"selected":""}" style=${c.name===this.mood?`background:${c.dot}`:""} @click=${()=>this.selectMood(c.name)}>
                <div class="mood-badge" style="background:${c.name===this.mood?"rgba(46,39,31,0.1)":c.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${c.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${c.iconPath} />
                  </svg>
                </div>
                ${c.name}
              </div>
            `)}
            ${r.length?h`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${r.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=Ie?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:le},(c,f)=>h`
                <div class="length-segment ${f<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=le?"disabled":""}" @click=${()=>this.incLength()}>+</div>
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
              ${g?"Let's go to your progression":"Generate loop"} <span>→</span>
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
            <div class="admin-modal" @click=${c=>c.stopPropagation()}>
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
                    <div class="model-sub-list" @click=${c=>c.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${vt.map(c=>h`
                        <div class="model-sub-opt ${this.currentModel===c.id?"selected":""}" @click=${()=>this.changeModel(c.id)}>
                          <span>${c.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${c.vendor}</span>
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
    `}};A.styles=X`
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
  `;D([I({type:String})],A.prototype,"genre",2);D([I({type:String})],A.prototype,"mood",2);D([I({type:Number})],A.prototype,"length",2);D([x()],A.prototype,"freeText",2);D([x()],A.prototype,"placeholderIdx",2);D([x()],A.prototype,"llmSuggestion",2);D([x()],A.prototype,"llmResolved",2);D([x()],A.prototype,"classifyError",2);D([x()],A.prototype,"expandedGenre",2);D([x()],A.prototype,"expandedMood",2);D([x()],A.prototype,"mascot",2);D([x()],A.prototype,"mascotSlot",2);D([x()],A.prototype,"peekMascot",2);D([x()],A.prototype,"peekSide",2);D([I({type:Boolean})],A.prototype,"isAuthenticated",2);D([I({type:String})],A.prototype,"userEmail",2);D([I({type:Boolean})],A.prototype,"isAdmin",2);D([I({type:Boolean})],A.prototype,"isGenerating",2);D([x()],A.prototype,"currentProvider",2);D([x()],A.prototype,"currentModel",2);D([x()],A.prototype,"showAdminModal",2);D([x()],A.prototype,"isClassifying",2);D([x()],A.prototype,"loadingMsgIdx",2);D([x()],A.prototype,"googleRemaining",2);D([x()],A.prototype,"googleLimit",2);D([x()],A.prototype,"googleCooldownSec",2);D([x()],A.prototype,"orRemaining",2);D([x()],A.prototype,"orLimit",2);D([x()],A.prototype,"capacityCharges",2);D([x()],A.prototype,"rechargeNextSec",2);D([x()],A.prototype,"showCapacityNote",2);D([x()],A.prototype,"paradeTrigger",2);A=D([Q("seed-screen")],A);function Yt(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=e[o]??0,n=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+s))}function ji(t,e,i){const o=e&&e.length>0?e.map(v=>t.chords[v]).filter(v=>!!v):t.chords,s=t.bpm||120,n=1.7,r=i?me.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,l=Ct[t.genre]||{},d=r?.patch??{},u={...l,...d},g=l.duration??.9,c=d.durationMultiplier?g*d.durationMultiplier:g,f=[];return o.forEach((v,m)=>{const a=m*n,b=(v.notes&&v.notes.length>0?v.notes:["C","E","G"]).map(y=>`${y}4`);if(u.arpMode&&u.arpMode!=="off"){const y=u.arpRate??"1/16",k=u.arpRange??1,w=u.arpMode,T=vi(y,s),B=bi(b,k),Z=xi(B,w),se=u.duration?u.duration:Math.max(.6,c);Z.forEach((pe,Te)=>{const qe=a+Te*T;f.push({note:pe,midi:Yt(pe),startTime:qe,duration:se})})}else{const y=u.spread??0;b.forEach((k,w)=>{const T=w*y*.1,B=a+T;f.push({note:k,midi:Yt(k),startTime:B,duration:c})})}}),f}function Ls(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function Rs(t,e,i){const o=t.bpm||120,s=480,n=ji(t,e,i),r=[];n.forEach(a=>{const p=Math.round(a.startTime/(60/o)*s),b=Math.max(1,Math.round(a.duration/(60/o)*s));r.push({tick:p,type:"on",midi:a.midi}),r.push({tick:p+b,type:"off",midi:a.midi})}),r.sort((a,p)=>a.tick!==p.tick?a.tick-p.tick:a.type!==p.type?a.type==="off"?-1:1:a.midi-p.midi);const l=[],d=Math.round(6e7/o);l.push(0),l.push(255,81,3),l.push(d>>16&255,d>>8&255,d&255);const u="Chroma Chords";l.push(0),l.push(255,3,u.length);for(let a=0;a<u.length;a++)l.push(u.charCodeAt(a));let g=0;r.forEach(a=>{const p=a.tick-g;g=a.tick,l.push(...Ls(p)),a.type==="on"?l.push(144,a.midi,80):l.push(128,a.midi,0)}),l.push(0),l.push(255,47,0);const c=[77,84,104,100,0,0,0,6,0,0,0,1,s>>8&255,s&255],f=l.length,v=[77,84,114,107,f>>24&255,f>>16&255,f>>8&255,f&255],m=new Uint8Array(c.length+v.length+l.length);return m.set(c,0),m.set(v,c.length),m.set(l,c.length+v.length),m}function js(t,e,i,o){const s=Rs(t,e,o),n=new Blob([s],{type:"audio/midi"}),r=(t.key||"C").toLowerCase(),l=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),d=t.bpm||120,u=`chroma-chords-${r}-${l}-${d}bpm.mid`;_i(n,u)}function _s(t,e){const i=new ui({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((t?ge.find(n=>n.name.toLowerCase()===t.toLowerCase()):void 0)?.instrument??(e?$t[e]:void 0)??"rhodes"){case"bell":return new V(Ae,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new V(Ae,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new V(ie,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new V(ie,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const n=new hi({decay:4.5,wet:.35}).connect(i);return new V(ie,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(n)}case"juno-pad":{const n=new pi({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new V(ie,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(n)}case"stab":return new V(di,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new V(Ae,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function Gs(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,s=o/8,n=e*s,r=t.length*e*s,l=new ArrayBuffer(44+r),d=new DataView(l),u=(f,v)=>{for(let m=0;m<v.length;m++)d.setUint8(f+m,v.charCodeAt(m))};u(0,"RIFF"),d.setUint32(4,36+r,!0),u(8,"WAVE"),u(12,"fmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,e,!0),d.setUint32(24,i,!0),d.setUint32(28,i*n,!0),d.setUint16(32,n,!0),d.setUint16(34,o,!0),u(36,"data"),d.setUint32(40,r,!0);const g=[];for(let f=0;f<e;f++)g.push(t.getChannelData(f));let c=44;for(let f=0;f<t.length;f++)for(let v=0;v<e;v++){const m=Math.max(-1,Math.min(1,g[v][f])),a=m<0?m*32768:m*32767;d.setInt16(c,a,!0),c+=2}return new Blob([new Uint8Array(l)],{type:"audio/wav"})}async function Vs(t,e,i,o){const s=ji(t,e,o);if(!s.length)return;const r=s.reduce((v,m)=>Math.max(v,m.startTime+m.duration),0)+1.2,l=await Ji(async()=>{const v=_s(i,t.genre);s.forEach(m=>{v.triggerAttackRelease(m.note,m.duration,m.startTime)})},r),d=Gs(l.get()),u=(t.key||"C").toLowerCase(),g=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),c=t.bpm||120,f=`chroma-chords-${u}-${g}-${c}bpm.wav`;_i(d,f)}function _i(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var qs=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,fe=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ys(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&qs(e,i,s),s};const Hs=U`
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
`,Ws=U`
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
`,Js=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Hs},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:Ws}];let oe=class extends K{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=rs(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{await Vs(this.progression,this.order,this.instrument,this.playStyle),this.emit("toast","WAV file downloaded")}catch(t){console.error("WAV export failed",t),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{js(this.progression,this.order,this.instrument,this.playStyle),this.emit("toast","MIDI file downloaded")}catch(t){console.error("MIDI export failed",t),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return h`
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
            ${Js.map(e=>h`
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
    `}};oe.styles=X`
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
  `;fe([I({type:Boolean})],oe.prototype,"open",2);fe([I({type:Boolean})],oe.prototype,"visible",2);fe([I({type:Object})],oe.prototype,"progression",2);fe([I({type:Array})],oe.prototype,"order",2);fe([I({type:String})],oe.prototype,"instrument",2);fe([I({type:String})],oe.prototype,"playStyle",2);oe=fe([Q("share-modal")],oe);var Xs=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,$=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ks(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Xs(e,i,s),s};const pt=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],Ht=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"],Wt=["Uplifting","Melancholy","Dreamy"],Qs={Uplifting:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5",Melancholy:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15",Dreamy:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0",Tense:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12",Warm:"M12 4 a6.5 6.5 0 1 0 6.5 6.5",Nostalgic:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},ae={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},Jt=ae,ze=["A","S","D","F","G","H","J","K"],Xt=["Octave up","1st inversion","Low root"],Zs=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],en=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],Kt=[{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]}],re={swing:0,spread:50,density:50,tone:"Warm"},Qt=["Warm","Glassy","Dusty"],ht=["C min","A min","F min","D min","G min","E♭ maj","C maj","G maj","F maj"],tn=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Zt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},ei=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ti={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Ue={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},Le={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},It={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Ne={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function on(t){const e=t===""?"maj":t;if(Ne[5][e]||Ne[6][e])return e;const i=It[e];return i&&(Ne[5][i]||Ne[6][i])?i:"maj"}function sn(t){const e=on(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Ne[o][e];if(!n)return;const r=((t.rootPc-s)%12+12)%12;i.push({rootFret:r,frets:n.map(l=>l===null?null:l+r)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function nn(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),o=r=>{const l=new Set(r);let d=null;const u=[],g=c=>{if(c===4){const f=u.map((p,b)=>(e[b]+p)%12);for(const p of l)if(f.indexOf(p)<0)return;for(const p of f)if(!l.has(p))return;const v=u.filter(p=>p>0),m=v.length?Math.max(...v)-Math.min(...v):0;if(m>3)return;const a=m*12+u.reduce((p,b)=>p+b,0);(!d||a<d.score)&&(d={frets:u.slice(),score:a});return}for(let f=0;f<=5;f++)u.push(f),g(c+1),u.pop()};return g(0),d},s=o(i);if(s)return s.frets;const n=o(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return n?n.frets:null}const ii=[{key:"Darker",label:"Darker",tension:.55},{key:"More tension",label:"Tense",tension:.9},{key:"Dreamier",label:"Dreamy",tension:.3},{key:"Resolve home",label:"Home",tension:.05},{key:"Borrowed",label:"Borrow",tension:.42,twoTone:!0}];let S=class extends K{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.bounceOpen=!1,this.bounceFormat="wav",this.shareOpen=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.barsPerChord=1,this.keyIdx=0,this.swing=0,this.spread=50,this.density=50,this.tone="Warm",this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.key==="Escape"){t.preventDefault(),(this.tempoOpen||this.feelOpen||this.bounceOpen)&&(this.tempoOpen=!1,this.feelOpen=!1,this.bounceOpen=!1,this.requestUpdate());return}const i=ze.map(s=>s.toLowerCase()).indexOf((t.key||"").toLowerCase()),o=this.progression?.chords||[];if(i>=0&&i<o.length){t.preventDefault();const s=88+i%3*6;this.padFlash=i,this.lastPad={idx:i,voicing:"1st inversion",vel:s,zone:1},C.playChordAtIndex(i,.85,"1st inversion",s),this.requestUpdate()}},this.handleKeyUp=t=>{ze.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.toggleLibrary=()=>{this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("library-open-change",{detail:this.libraryOpen,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,C.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=_(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:q(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];C.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),C.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=_(this.progression.key,this.progression.scaleType),e=q(this.abPick.chord,t),i=[...this.progression.chords];i[this.swapIndex]={...i[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e};const o={...this.progression,chords:i};this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),C.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>Ie&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<le&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onReroll=()=>{this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1,this.requestUpdate()},this.togglePlayStyleExpand=()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1,this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=P.getProjects(),this.unsubscribeProjects=typeof P.subscribeProjects=="function"?P.subscribeProjects(()=>{this.savedSets=P.getProjects(),this.requestUpdate()}):typeof P.subscribe=="function"?P.subscribe(()=>{this.savedSets=P.getProjects(),this.requestUpdate()}):null}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){this.selectedBand===t?this.selectedBand=null:this.selectedBand=t;const e=pt.find(i=>i.name===this.selectedBand);e&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:e,bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t*4,C.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}handlePadPointerDown(t,e){let i="1st inversion",o=1;if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const n=t.currentTarget.getBoundingClientRect(),r=(t.clientY-n.top)/(n.height||1);r<.34?(o=0,i="up an octave"):r>.67?(o=2,i="low, root position"):(o=1,i="1st inversion")}const s=88+e%3*6;this.padFlash=e,this.lastPad={idx:e,voicing:i,vel:s,zone:o},C.playChordAtIndex(e,.85,i,s),this.requestUpdate()}handlePadPointerUp(){this.padFlash=-1,this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,C.setABOverride(null),this.isMobile&&(this.mobileSheetOpen=!0),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?_(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:q(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&C.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),C.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=_(this.progression.key,this.progression.scaleType),i=q(t,e);C.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=_(this.progression.key,this.progression.scaleType);if(t==="before")C.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),C.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=q(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};C.setABOverride({index:this.swapIndex,side:"after",chord:o}),C.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=_(this.progression.key,this.progression.scaleType),o={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:q(this.abPick.chord,i)};C.auditionChord(o,.8)}else C.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordExtensionLabel(i.name),s=_t(i,t,o);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),C.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordQualityLabel(i.name),s=_t(i,o,t);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),C.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(l=>e[l.replace(/\d+$/,"")]??-1)),o=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],s=100/7,n=s*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return h`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${o.map(l=>{const d=i.has(l.pc);return h`<div class="white-key ${d?"active":""}">${l.note}</div>`})}
        </div>
        ${r.map(l=>{const d=(l.after+1)*s-n/2,u=i.has(l.pc);return h`<div class="black-key ${u?"active":""}" style="left: ${d}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.swing!==re.swing||this.spread!==re.spread||this.density!==re.density||this.tone!==re.tone}resetFeel(){this.swing=re.swing,this.spread=re.spread,this.density=re.density,this.tone=re.tone,this.requestUpdate()}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(60,Math.min(180,e+t));this.progression&&(this.progression.bpm=i),C.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,this.requestUpdate()}selectKey(t){const e=t.includes("min"),i=t.replace(" min","").replace(" maj","").replace("♭","b").replace("♯","#"),o=e?"MINOR":"MAJOR";this.keyIdx=ht.indexOf(t),this.progression&&(this.progression.key=i,this.progression.scaleType=o),this.dispatchEvent(new CustomEvent("generate-progression",{detail:{genre:this.progression?.genre||"Indie",mood:this.progression?.mood||"Warm",key:i,scaleType:o,length:this.progression?.chords?.length||4},bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,o){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?o+1:0;const s=_(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=q(e,s);C.auditionChord({name:e,notes:n},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"").toUpperCase().includes("MINOR")||(this.progression?.key||"").includes("m"),i=this.progression?.key||"C",o=R[i.replace("b","b").replace("♭","b")]??0,s=e?{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"}:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},n=i.replace("b","♭")+" "+s.name,r=t.map(a=>{const p=J(a.name);return R[p.root]??0}),l=a=>s.steps.indexOf(((a-o)%12+12)%12),d=s.steps.map((a,p)=>{const b=(o+a)%12,k=tn[b]+s.quals[p],w=r.indexOf(b),T=w>=0,B=this.auditionDeg===p;return{di:p,roman:s.romans[p],name:k,fn:s.fns[p],inLoop:T,on:B,barIdx:w,aria:`Hear ${k}, the ${s.fns[p].toLowerCase()} of ${n}`}}),u=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,g=t.map(a=>a.roman||s.romans[Math.max(0,l(R[J(a.name).root]??0))]).join(" – "),c=i.replace("b","♭")+" "+(e?"minor":"major"),f=cs(t),v=ds(t),m=this.progression?.note||"";return{scaleName:n,scaleHint:u,scaleDegrees:d,romanFormula:g,keyModeLine:c,cadences:f,voiceLinks:v,setNote:m}}renderScaleChords(t,e,i,o){const s=ue(this.progression?.mood||"Warm");return h`
      <div
        class="scale-chords-panel"
        style="position: relative; z-index: 2; background: var(--cv-cream); border-radius: ${o?"18px":"20px"}; padding: ${o?"11px 12px 13px":"13px 15px 15px"}; margin-top: ${o?"12px":"0"}; margin-bottom: ${o?"0":"12px"}; flex-shrink: 0;"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${o?"8px":"12px"}; flex-wrap: wrap;">
          <div style="font-size: ${o?"9.5px":"10px"}; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
            Scale · ${t}
          </div>
          <div style="font-size: ${o?"10.5px":"11px"}; font-weight: 700; color: rgba(46, 39, 31, 0.45);">
            ${e}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${o?"76px":"92px"}, 1fr)); gap: ${o?"5px":"6px"}; margin-top: ${o?"9px":"10px"}; min-width: 0;">
          ${i.map(n=>h`
            <button
              class="scale-degree-btn ${n.on?"active":""} ${n.inLoop?"in-loop":""}"
              style="border: none; font-family: inherit; text-align: left; cursor: pointer; min-width: 0; min-height: 46px; padding: 7px 10px 8px; border-radius: 13px; transition: background 160ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 160ms ease, transform 160ms ease; background: ${n.on?s:n.inLoop?"var(--cv-surface-2, #F1E4CC)":"transparent"}; box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, ${n.on?.22:n.inLoop?.14:.13}); outline: none;"
              @click=${()=>this.onScaleDegreeClick(n.di,n.name,n.inLoop,n.barIdx)}
              aria-label="${n.aria}"
            >
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 0.9px; color: var(--cv-label);">${n.roman}</div>
                <div style="width: 5px; height: 5px; border-radius: 50%; background: ${n.inLoop?"rgba(46, 39, 31, 0.42)":"transparent"}; flex-shrink: 0;"></div>
              </div>
              <div style="font-size: 14.5px; font-weight: 800; letter-spacing: -0.015em; line-height: 1.1; color: var(--cv-ink); margin-top: 1px;">${n.name}</div>
              <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; margin-top: 1px; color: var(--cv-ink-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n.fn}</div>
            </button>
          `)}
        </div>
      </div>
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return h`
      <div class="tempo-popover-desktop" style="background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 18px;">
        <div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Tempo</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button
              @click=${()=>this.nudgeBpm(-1)}
              aria-label="Slower"
              style="border: none; font-family: inherit; width: 36px; height: 36px; border-radius: 11px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 17px; font-weight: 800; cursor: pointer;"
            >&#8722;</button>
            <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--cv-ink); min-width: 62px; text-align: center;">${t}</div>
            <button
              @click=${()=>this.nudgeBpm(1)}
              aria-label="Faster"
              style="border: none; font-family: inherit; width: 36px; height: 36px; border-radius: 11px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 17px; font-weight: 800; cursor: pointer;"
            >+</button>
          </div>
        </div>
        <div style="min-width: 190px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Bars per chord</div>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            ${[1,2,4].map(e=>h`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===e?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(e)}
              >
                ${e===1?"1 bar":`${e} bars`}
              </button>
            `)}
          </div>
        </div>
        <div style="flex: 1; min-width: 240px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
            ${ht.map((e,i)=>{const o=this.keyIdx===i||this.progression?.key===e.replace(" min","").replace(" maj","").replace("♭","b");return h`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectKey(e)}
                >
                  ${e}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}renderFeelDrawerDesktop(){return this.feelOpen?h`
      <div class="feel-popover-desktop" style="background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex: 1; min-width: 0;">Feel &amp; tone</div>
          ${this.feelChanged?h`
            <button
              @click=${this.resetFeel}
              style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted); font-size: 11.5px; font-weight: 800; cursor: pointer; padding: 6px 8px; border-radius: 9px;"
            >Reset</button>
          `:""}
          <button
            @click=${()=>{this.feelOpen=!1}}
            aria-label="Close feel and tone"
            style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
          >×</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px 22px; margin-top: 8px;">
          ${Kt.map(t=>{const e=this[t.k];let i=t.steps[0];return t.steps.forEach(o=>{Math.abs(o.v-e)<Math.abs(i.v-e)&&(i=o)}),h`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${t.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${t.hint}</div>
                </div>
                <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
                  ${t.steps.map(o=>{const s=o===i;return h`
                      <button
                        style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>{this[t.k]=o.v,this.requestUpdate()}}
                        aria-label="${t.label}: ${o.name}"
                      >
                        ${o.name}
                      </button>
                    `})}
                </div>
              </div>
            `})}
          <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
            <div style="width: 104px; flex-shrink: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">Tone</div>
              <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px;">The colour of the instrument</div>
            </div>
            <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
              ${Qt.map(t=>h`
                <button
                  style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===t?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.tone=t,this.requestUpdate()}}
                >
                  ${t}
                </button>
              `)}
            </div>
          </div>
        </div>
      </div>
    `:""}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return h`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.tempoOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Key, tempo and length</div>
            <button
              @click=${()=>{this.tempoOpen=!1}}
              style="border: none; font-family: inherit; background: var(--cv-surface-2); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
            >Done</button>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: var(--cv-cream); border-radius: 16px; padding: 12px 14px; margin-top: 13px;">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Tempo</div>
              <div style="font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: var(--cv-ink); line-height: 1.1; margin-top: 2px;">
                ${t} <span style="font-size: 12px; font-weight: 800; color: var(--cv-ink-muted);">bpm</span>
              </div>
            </div>
            <button
              @click=${()=>this.nudgeBpm(-1)}
              aria-label="Slower"
              style="border: none; font-family: inherit; width: 44px; height: 44px; border-radius: 14px; background: var(--cv-surface-2); color: var(--cv-ink); font-size: 19px; font-weight: 800; cursor: pointer;"
            >&#8722;</button>
            <button
              @click=${()=>this.nudgeBpm(1)}
              aria-label="Faster"
              style="border: none; font-family: inherit; width: 44px; height: 44px; border-radius: 14px; background: var(--cv-surface-2); color: var(--cv-ink); font-size: 19px; font-weight: 800; cursor: pointer;"
            >+</button>
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Bars per chord</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${[1,2,4].map(e=>h`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===e?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(e)}
              >
                ${e===1?"1 bar":`${e} bars`}
              </button>
            `)}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${ht.map((e,i)=>{const o=this.keyIdx===i||this.progression?.key===e.replace(" min","").replace(" maj","").replace("♭","b");return h`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectKey(e)}
                >
                  ${e}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}renderFeelSheetMobile(){return this.feelOpen?h`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Feel &amp; tone</div>
            ${this.feelChanged?h`
              <button
                @click=${this.resetFeel}
                style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted); font-size: 12px; font-weight: 800; cursor: pointer; padding: 8px 10px; border-radius: 10px;"
              >Reset</button>
            `:""}
            <button
              @click=${()=>{this.feelOpen=!1}}
              style="border: none; font-family: inherit; background: var(--cv-surface-2); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
            >Done</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${Kt.map(t=>{const e=this[t.k];let i=t.steps[0];return t.steps.forEach(o=>{Math.abs(o.v-e)<Math.abs(i.v-e)&&(i=o)}),h`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink); flex: 1; min-width: 0;">${t.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${t.hint}</div>
                  </div>
                  <div style="display: flex; gap: 5px; margin-top: 7px;">
                    ${t.steps.map(o=>{const s=o===i;return h`
                        <button
                          style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>{this[t.k]=o.v,this.requestUpdate()}}
                          aria-label="${t.label}: ${o.name}"
                        >
                          ${o.name}
                        </button>
                      `})}
                  </div>
                </div>
              `})}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 16px;">Tone</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${Qt.map(t=>h`
              <button
                style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===t?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>{this.tone=t,this.requestUpdate()}}
              >
                ${t}
              </button>
            `)}
          </div>
        </div>
      </div>
    `:""}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:o,voiceLinks:s,setNote:n}=t;return h`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${i}</div>
        </div>

        ${o.length?h`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${o.map(r=>h`
                <div class="cadence-card-item" style="background: var(--cv-cream); border-radius: 15px; padding: 11px 13px;">
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px;">
                    <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${r.name}</div>
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.5px; color: var(--cv-label); white-space: nowrap;">${r.bars}</div>
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 5px; flex-wrap: wrap;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink-muted);">${r.move}</div>
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.4px; color: rgba(46, 39, 31, 0.45);">${r.degrees}</div>
                  </div>
                  <div style="font-size: 11.5px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 5px; text-wrap: pretty;">${r.why}</div>
                </div>
              `)}
            </div>
          </div>
        `:""}

        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 4px;">Voice leading</div>
        ${s.map(r=>h`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${r.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${r.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${r.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${r.link}</div>
          </div>
        `)}

        ${n?h`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${n}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),o=this.getChordExtensionLabel(e?.name),s=_(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=e?ls(e.name,s):[];return h`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(r=>h`
          <div class="note-pill">${r.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&n.length?h`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${n.map(r=>h`
            <div class="interval-token-badge ${r.isGuideTone?"guide-tone":""}" style="background: ${r.isGuideTone?"rgba(242, 115, 95, 0.16)":"var(--cv-surface)"}; border: 1.5px solid ${r.isGuideTone?"#F2735F":"rgba(46,39,31,0.1)"}; border-radius: 12px; padding: 7px 6px; text-align: center;">
              <div style="font-size: 14px; font-weight: 800; color: #2E271F;">${r.note}</div>
              <div style="font-size: 11px; font-weight: 800; color: ${r.isGuideTone?"#F2735F":"var(--cv-label)"}; margin-top: 2px;">${r.intervalSymbol}</div>
              <div style="font-size: 9.5px; font-weight: 700; color: var(--cv-ink-muted); margin-top: 2px; line-height: 1.1;">${r.roleName}</div>
            </div>
          `)}
        </div>
      `:""}

      <div class="detail-kicker" style="margin-top: 20px;">Quality</div>
      <div class="detail-quality-box">
        <div class="quality-label">${i}</div>
        <div class="quality-sub">${this.getChordQualitySub(e?.name)}</div>
      </div>
      <div class="quality-chips-grid">
        ${Zs.map(r=>{const l=r.label===i;return h`
            <button
              class="chord-mod-chip quality-chip ${l?"selected active":""}"
              @click=${()=>this.changeChordQuality(r.label)}
              aria-pressed="${l}"
              aria-label="Change quality to ${r.label}"
            >
              <div class="chip-title">${r.label}</div>
              <div class="chip-desc">${r.sub}</div>
            </button>
          `})}
      </div>

      <div class="detail-kicker" style="margin-top: 20px;">Extension</div>
      <div class="detail-extension-box">
        <div class="quality-label">${o}</div>
        <div class="quality-sub">${this.getChordExtensionSub(e?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${en.map(r=>{const l=r.label===o;return h`
            <button
              class="chord-mod-chip extension-chip ${l?"selected active":""}"
              @click=${()=>this.changeChordExtension(r.label)}
              aria-pressed="${l}"
              aria-label="Change extension to ${r.label}"
            >
              <div class="chip-title">${r.label}</div>
              <div class="chip-desc">${r.sub}</div>
            </button>
          `})}
      </div>
    `}renderPianoCard(t,e){const i=J(t.name),o=ti[i.root]??0,s=Le[i.quality]||Le[It[i.quality]||"maj"]||[0,4,7],n=22,r=86,l=52,d=[0,2,4,5,7,9,11],u=[],g=[],c=[];for(let m=0;m<2;m++)d.forEach((a,p)=>{u.push({x:(m*7+p)*n,w:n-1.5,h:r})});for(let m=0;m<2;m++)[0,1,3,4,5].forEach(a=>{const p=m*7+a;g.push({x:p*n+n*.64,w:n*.58,h:l})});s.forEach(m=>{const a=o+m,p=Math.floor(a/12),b=a%12,y=d.indexOf(b),k=m===0,w=y<0,T=k?"#F2735F":w?"#FBF3E6":"#2E271F",B=k?"#FBF3E6":w?"#2E271F":"#FBF3E6",Z=this.showDegrees?Ue[m%12]:"";if(y>=0){const se=p*7+y;c.push({cx:se*n+(n-1.5)/2,cy:r-19,r:9,fill:T,isRoot:k,label:Z,lc:B})}else{const pe=(p*7+d.indexOf(b-1))*n+n*.64,Te=n*.58;c.push({cx:pe+Te/2,cy:l-14,r:7.5,fill:T,isRoot:k,label:Z,lc:B})}});const f=14*n,v=s.map(m=>{const a=ei[(o+m)%12];return this.showDegrees?`${a} (${Ue[m%12]})`:a}).join(" · ");return h`
      <div
        class="play-card"
        @pointerdown=${m=>this.handlePadPointerDown(m,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div class="zone-line-a ${this.lastPad?.idx===e&&this.lastPad?.zone===0?"active":""}"></div>
        <div class="zone-line-b ${this.lastPad?.idx===e&&this.lastPad?.zone===2?"active":""}"></div>
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?h`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${f}" height="${r}" viewBox="0 0 ${f} ${r}" style="display: block; width: 100%; max-width: ${f}px; height: auto;">
          ${u.map(m=>U`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${g.map(m=>U`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${c.map(m=>U`
            <g>
              <circle cx="${m.cx}" cy="${m.cy}" r="${m.r}" fill="${m.fill}" stroke="${m.isRoot?"#2E271F":"none"}" stroke-width="${m.isRoot?1.6:0}"></circle>
              ${m.label?U`
                <text x="${m.cx}" y="${m.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${m.lc}" font-family="'Plus Jakarta Sans',sans-serif">${m.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${v}</div>
      </div>
    `}renderFretCard(t,e,i){const o=J(t.name),s=ti[o.root]??0,n=Le[o.quality]||Le[It[o.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],l=[7,0,4,9],d=i==="Ukulele",u=d?l:r,g=d?nn({root:o.root,rootPc:s,q:o.quality,intervals:n})||[null,null,null,null]:sn({root:o.root,rootPc:s,q:o.quality})||[null,null,null,null,null,null],c=18,f=24,v=4,m=16,a=u.length,p=g.filter(E=>E!==null&&E>0),b=p.length&&Math.max(...p)>4?Math.min(...p)-1:0,y=[],k=[],w=[],T=[],B=[];for(let E=0;E<a;E++)y.push({x:E*c});for(let E=0;E<=v;E++)k.push({y:m+E*f,sw:E===0&&b===0?3:1.2});g.forEach((E,ve)=>{const Ye=ve*c;if(E===null){B.push({x:Ye});return}if(E===0){T.push({x:Ye});return}const Vi=((u[ve]+E-s)%12+12)%12;w.push({cx:Ye,cy:m+(E-b-.5)*f,fill:Vi===0?"#F2735F":"#2E271F",label:this.showDegrees?Ue[((u[ve]+E-s)%12+12)%12]:""})});const Z=(a-1)*c,se=(a-1)*c+26,pe=m+v*f+12,Te=b>0?`${b+1}fr`:"",qe=b>0,Gi=n.map(E=>{const ve=ei[(s+E)%12];return this.showDegrees?`${ve} (${Ue[E%12]})`:ve}).join(" · ");return h`
      <div
        class="play-card"
        @pointerdown=${E=>this.handlePadPointerDown(E,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div class="zone-line-a ${this.lastPad?.idx===e&&this.lastPad?.zone===0?"active":""}"></div>
        <div class="zone-line-b ${this.lastPad?.idx===e&&this.lastPad?.zone===2?"active":""}"></div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?h`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${qe?h`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${Te}</div>
          `:""}
        </div>
        <svg width="${se}" height="${pe}" viewBox="-13 -2 ${se} ${pe}" style="display: block; width: 100%; max-width: ${se*1.5}px; height: auto;">
          ${k.map(E=>U`
            <rect x="0" y="${E.y}" width="${Z}" height="${E.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${y.map(E=>U`
            <rect x="${E.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${T.map(E=>U`
            <circle cx="${E.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${B.map(E=>U`
            <text x="${E.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${w.map(E=>U`
            <g>
              <circle cx="${E.cx}" cy="${E.cy}" r="${E.fill==="#F2735F"?7.5:7}" fill="${E.fill}"></circle>
              ${E.label?U`
                <text x="${E.cx}" y="${E.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${E.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${Gi}</div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(o=>!e||(o.name+" "+o.genre+" "+o.mood).toLowerCase().includes(e));return h`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          Your loops (${this.savedSets.length})
        </div>
        <button
          style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer;"
          @click=${()=>{this.librarySelectMode=!this.librarySelectMode,this.requestUpdate()}}
        >
          ${this.librarySelectMode?"Done":"Select"}
        </button>
      </div>

      <div style="padding: 0 4px 9px;">
        <input
          type="text"
          class="cv-vibe-input"
          style="width: 100%; border: none; background: var(--cv-surface); border-radius: 12px; padding: 9px 12px; font-size: 12.5px; outline: none;"
          .value=${this.librarySearch}
          @input=${o=>{this.librarySearch=o.target.value}}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${i.map(o=>h`
          <div
            style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: var(--cv-surface);"
            @click=${()=>{this.dispatchEvent(new CustomEvent("load-project",{detail:o,bubbles:!0,composed:!0})),this.libraryOpen=!1}}
          >
            <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
              ${(o.chords||[]).map(s=>{const n=H(s.tension??0);return h`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(n.radius*.25)}px;background:${n.color};flex-shrink:0;"></span>`})}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${o.name}</div>
              <div style="font-size: 11px; color: var(--cv-ink-muted);">${o.genre} · ${o.mood}</div>
            </div>
          </div>
        `)}
        ${i.length?"":h`
          <div style="padding: 12px; font-size: 12px; color: var(--cv-ink-muted); text-align: center;">No loops match that.</div>
        `}
      </div>
    `}render(){const t=this.progression?.chords||[],e=ue(this.progression?.mood||"Warm"),i=pt.find(a=>a.name===this.selectedBand),o=this.getTheoryData(t),s=t.map(a=>a.tension||.1),n=Math.max(...s,.1),r=Math.min(...s,0),l=s.indexOf(n),d=s.every((a,p)=>p===0||a>=s[p-1]),u=n-r<.28?"Stays close to home":d?"A steady climb":s[s.length-1]<.25&&l<s.length-1?"Away, then home":"Drifts, then settles",g=`Opens ${ae[t[0]?.functionLabel]||"home"} and ${n-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":d?`tightens chord by chord, peaking on ${t[l]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[l]?.name||"the middle"} before easing back down home.`}`;let c=[],f="";const v=this.progression?.scaleType?.includes("MINOR")??!1;if(this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")c=Mi(this.chordData,this.progression,this.swapIndex),f=`Four chords from the ${v?"major":"minor"} version of this key.`;else{const a=Nt(this.chordData,this.progression,this.swapIndex);c=(a.find(b=>b.name===this.activeSwapFamily)||a[0])?.rows||[],f=Zt[this.activeSwapFamily]?Zt[this.activeSwapFamily][this.showTheory?1:0]:""}if(i){const a=c.filter(b=>i.hoist.includes(b.name)),p=c.filter(b=>!i.hoist.includes(b.name));c=[...a,...p]}}const m=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?h`
        <div class="mobile-stage-wrap" style="--mood-color: ${e};">
          <!-- Top Vibe Dropdown Button -->
          <div style="padding: 12px 18px 0;">
            <button class="mobile-vibe-toggle" @click=${this.toggleVibe}>
              <div style="text-align: left;">
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">The Vibe</div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink); margin-top: 2px;">${this.getVibeSummary()}</div>
              </div>
              <span style="font-size: 16px; font-weight: 800; color: var(--cv-ink-muted);">${this.vibeOpen?"⌃":"⌄"}</span>
            </button>

            ${this.vibeOpen?h`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${a=>{this.freeText=a.target.value}}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${e};">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${Ht.map(a=>h`
                    <button class="pill ${this.progression?.genre===a?"active":""}" @click=${()=>this.onGenreClick(a)}>${a}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Wt.map(a=>h`
                    <button class="pill mood-pill ${this.progression?.mood===a?"active":""}" @click=${()=>this.onMoodClick(a)}>${a}</button>
                  `)}
                </div>
              </div>
            `:""}
          </div>

          <!-- View Switcher Tabs -->
          <div style="padding: 12px 18px 0;">
            <div class="view-tabs-bar" style="width: 100%; justify-content: center;">
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
            </div>
          </div>

          <!-- Main Mobile Canvas -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView==="loop"?h`
              <div class="stage-card" style="padding: 18px 14px;">
                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${t.map((a,p)=>{const b=H(a.tension||.1),y=this.padFlash===p,k=this.playing&&p===this.progressStep;return h`
                      <div
                        class="pad-cell ${y?"pad-held":""} ${k?"pad-lit":""}"
                        style="background: ${b.color}; min-height: 108px;"
                        tabindex="0"
                        role="button"
                        aria-label="${a.name}, ${ae[a.functionLabel]||a.functionLabel} — press to play it; press nearer the top for a higher voicing"
                        @pointerdown=${w=>this.handlePadPointerDown(w,p)}
                        @pointerup=${()=>this.handlePadPointerUp()}
                        @pointercancel=${()=>this.handlePadPointerUp()}
                        @pointerleave=${()=>this.handlePadPointerUp()}
                      >
                        <div class="zone-line-a ${this.lastPad?.idx===p&&this.lastPad?.zone===0?"active":""}"></div>
                        <div class="zone-line-b ${this.lastPad?.idx===p&&this.lastPad?.zone===2?"active":""}"></div>

                        <button
                          class="pad-swap-btn"
                          @click=${w=>{w.stopPropagation(),this.openSwap(p)}}
                          @pointerdown=${w=>w.stopPropagation()}
                          aria-label="Swap ${a.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                        </button>

                        <button
                          class="pad-detail-btn"
                          @click=${w=>{w.stopPropagation(),this.openDetail(p)}}
                          @pointerdown=${w=>w.stopPropagation()}
                          aria-label="View voicing for ${a.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>

                        <div class="pad-top-row">
                          <span class="pad-key-badge">${ze[p]||""}</span>
                          ${this.showTheory&&a.roman?h`<span class="pad-roman-badge">${a.roman}</span>`:""}
                        </div>

                        <div class="pad-bottom-info">
                          <div class="pad-role-label">${Jt[a.functionLabel]||a.functionLabel}</div>
                          <div class="pad-chord-name" style="font-size: 20px;">${a.name}</div>
                          ${this.showTheory&&a.notes&&a.notes.length?h`
                            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
                              ${a.notes.join(" · ")}
                            </div>
                          `:""}
                          <div class="pad-meta-voicing">${this.lastPad?.idx===p?Xt[this.lastPad.zone]||this.lastPad.voicing:""}</div>
                        </div>
                      </div>
                    `})}
                </div>

                ${this.showTheory?this.renderScaleChords(o.scaleName,o.scaleHint,o.scaleDegrees,!0):""}

                <div class="playing-now-row">
                  <div class="playing-now-kicker">Playing now</div>
                  <div class="playing-now-chord">${this.lastPad?t[this.lastPad.idx]?.name:"—"}</div>
                  <div class="playing-now-desc">
                    ${this.lastPad?`${this.lastPad.voicing} · velocity ${this.lastPad.vel}`:"Press a chord — nearer the top of a card plays a higher voicing. Home-row keys A S D F play them too."}
                  </div>
                </div>
              </div>

              <!-- Quick chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument||"Piano"} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"} <span style="opacity:0.6;">⌄</span>
                </button>
              </div>

              ${this.expandedInstrument?h`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${ge.map(a=>h`
                    <button
                      class="pill ${(this.instrument||"Piano")===a.name?"active":""}"
                      @click=${()=>{this.instrument=a.name,C.setInstrument(a.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:a.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                    >
                      <span style="background:${a.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${a.name}
                    </button>
                  `)}
                </div>
              `:""}

              ${this.expandedPlayStyle?h`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${me.map(a=>h`
                    <button
                      class="pill ${(this.playStyle||"Block chords")===a.name?"active":""}"
                      @click=${()=>{this.playStyle=a.name,C.setPlayStyle(a.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:a.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                    >
                      <span style="background:${a.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${a.name}
                    </button>
                  `)}
                </div>
              `:""}

              <div style="display: flex; gap: 7px; margin-top: 12px;">
                <button class="mobile-chip-btn" @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1)}} aria-label="Key, tempo and length">
                  ${this.progression?.key||"C"} · ${this.progression?.bpm||84}
                </button>
                <button class="mobile-chip-btn" @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1)}}>Feel &amp; tone</button>
                <button class="mobile-bounce-btn" @click=${()=>{this.bounceOpen=!0}}>Bounce</button>
              </div>

              <div class="mobile-theory-toggle" @click=${this.onTheoryToggle}>
                <div class="toggle-track ${this.showTheory?"active":""}">
                  <div class="toggle-knob ${this.showTheory?"active":""}"></div>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory</div>
              </div>

              ${this.showTheory?h`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${u}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(a=>{const p=Math.round(28+(a.tension||.1)*85),b=H(a.tension||.1);return h`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${p}px; border-radius: 100px; background: ${b.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${a.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${ae[a.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${g}</div>
                  ${this.renderTheoryStrip(o)}
                </div>
              `:""}
            `:this.activeView==="song"?h`
              <div class="song-track-list">
                ${this.sections.map((a,p)=>h`
                  <div class="song-card" @click=${()=>{this.activeSectionIdx=p,this.activeView="loop"}}>
                    <div style="display: flex; gap: 5px; margin-bottom: 6px;">
                      ${a.progression.chords.map(b=>{const y=H(b.tension);return h`<span style="display:inline-block;width:8px;height:8px;border-radius:${Math.round(y.radius*.3)}px;background:${y.color};flex-shrink:0;"></span>`})}
                    </div>
                    <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${a.name}</div>
                    <div style="font-size: 12px; color: var(--cv-ink-muted);">${a.desc}</div>
                  </div>
                `)}
              </div>
            `:h`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(a=>h`
                      <button
                        class="pill ${this.playInstrument===a?"active":""}"
                        style="background: ${this.playInstrument===a?e:"var(--cv-cream)"}; color: ${this.playInstrument===a?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=a}}
                      >${a}</button>
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
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${t.map((a,p)=>this.renderPianoCard(a,p))}
                  </div>
                `:h`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((a,p)=>this.renderFretCard(a,p,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>

          <!-- Mobile Swap Sheet -->
          ${this.mobileSheetOpen&&this.swapIndex!==null?h`
            <div class="sheet-scrim" @click=${()=>{this.mobileSheetOpen=!1}}></div>
            <div class="mobile-swap-sheet mobile-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div class="sheet-title" style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Chord ${this.swapIndex+1} (${m?.name})</div>
                <button class="sheet-cancel-btn" style="padding: 4px 10px;" @click=${()=>{this.mobileSheetOpen=!1}}>×</button>
              </div>

              <div class="ab-compare-box ab-box">
                <div class="ab-compare-row">
                  <button
                    class="ab-card-half ${this.abSide==="before"?"active-now":""}"
                    style="background: ${this.abSide==="before"?"#5E5142":"#F1E4D2"}; color: ${this.abSide==="before"?"#FBF3E6":"#2E271F"};"
                    @click=${()=>this.setABSide("before")}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${m?.name||""}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                    style="background: ${this.abPick?this.abSide==="after"?e:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
                    @click=${()=>this.setABSide("after")}
                    ?disabled=${!this.abPick}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick?"#2E271F":"rgba(46,39,31,0.45)"};"> ${this.abPick?.chord||"Pick one below"}</div>
                  </button>
                </div>
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying?e:"#E8D9C2"};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                  >
                    ${this.abPlaying?h`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>`:h`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${t.map((a,p)=>{const b=p===this.swapIndex,y=b&&this.abSide==="after"&&this.abPick?this.abPick.chord:a.name,k=this.abPlaying&&Math.floor(this.progressStep/4)===p;return h`
                        <button
                          class="ab-cell-item ${k?"active-step":""}"
                          style="background: ${b&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${b?1:.65};"
                          @click=${()=>this.onAbCellClick(p)}
                          aria-label="Preview ${y} in bar ${p+1}"
                        >
                          ${y}
                        </button>
                      `})}
                  </div>
                </div>
              </div>

              <div class="swap-family-tabs swap-tab-nav" style="margin-top: 14px;">
                ${ii.map(a=>{const p=this.activeSwapFamily===a.key,b=H(a.tension),y=Math.round(b.size*.34),k=Math.round(b.radius*(y/b.size));return h`
                    <button
                      class="swap-family-tab ${p?"active":""}"
                      @click=${()=>{this.activeSwapFamily=a.key,this.requestUpdate()}}
                    >
                      ${a.twoTone?h`
                        <span class="two-tone-swatch" style="box-shadow: ${p?`0 0 0 3px ${e}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:h`
                        <span
                          class="family-shape"
                          style="width: ${y}px; height: ${y}px; border-radius: ${k}px; background: ${b.color}; box-shadow: ${p?`0 0 0 3px ${e}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${p?"active":""}">${a.label}</span>
                    </button>
                  `})}
              </div>

              ${i?h`
                <div class="band-note-banner" style="background: ${i.color}22; margin-top: 10px;">
                  <span>${this.showTheory?`${i.name}: ${i.theory}`:`Sorted for ${i.name} — their moves first`}</span>
                </div>
              `:""}

              <div class="alt-candidates-list" style="margin-top: 10px;">
                ${c.map(a=>{const p=!!i&&i.hoist.includes(a.name),b=H(a.tension),y=Math.max(26,Math.min(36,Math.round(b.size*.32))),k=Math.round(b.radius*(y/b.size));return h`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord===a.name?"selected":""}" @click=${()=>this.selectAlternative(a)}>
                      <div class="alt-shape" style="width: ${y}px; height: ${y}px; border-radius: ${k}px; background: ${b.color}; box-shadow: ${this.abPick?.chord===a.name?`0 0 0 2px ${e}`:"none"}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${a.name}</span>
                          ${this.showTheory&&a.roman?h`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${a.roman}</span>`:""}
                          ${p?h`<span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>`:""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${a.sub}</div>
                        ${this.showTheory&&a.notes&&a.notes.length?h`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${a.notes.join(" · ")}
                          </div>
                        `:""}
                      </div>
                    </div>
                  `})}
              </div>

              <div style="display: flex; gap: 10px; margin-top: 18px;">
                <button class="sheet-cancel-btn" style="flex: 1;" @click=${()=>{this.mobileSheetOpen=!1}}>Cancel</button>
                <button class="accept-swap-btn" style="flex: 1; margin-top: 0;" @click=${this.confirmSwap} ?disabled=${!this.abPick}>
                  ${this.abPick?`Keep ${this.abPick.chord}`:"Pick a chord"}
                </button>
              </div>
            </div>
          `:""}

          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen?h`
            <div class="sheet-scrim" @click=${()=>{this.mobileDetailSheetOpen=!1}}></div>
            <div class="mobile-detail-sheet mobile-swap-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
                <div>
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${t[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${t[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="sheet-cancel-btn close-detail-btn" @click=${()=>{this.mobileDetailSheetOpen=!1}}>×</button>
              </div>

              ${this.renderChordDetailContent(t)}
            </div>
          `:""}

          <!-- Mobile Bottom Transport Bar -->
          <div class="mobile-bottom-transport-bar">
            <button class="loop-play-btn" @click=${this.togglePlay} style="background: ${this.playing?"#2E271F":e}; color: ${this.playing?"#FBF3E6":"#2E271F"}; flex-shrink: 0; min-height: 44px; padding: 9px 16px; border-radius: 100px; font-weight: 800; font-size: 12.5px; border: none; cursor: pointer;">
              ${this.playing?"Stop":"Play loop"}
            </button>
            <div style="flex: 1 1 30px; min-width: 24px;">
              <div style="display: flex; gap: 2px; align-items: flex-end; height: 16px;">
                ${Array.from({length:16}).map((a,p)=>{const b=Math.floor(this.progressStep%(t.length*4)),y=this.playing&&Math.floor(b/(t.length*4)*16)===p,k=p%4===0;return h`
                    <div style="flex: 1; height: ${y?16:k?11:7}px; border-radius: 2px; background: ${y?"#F2735F":k?"rgba(46,39,31,0.3)":"rgba(46,39,31,0.14)"};"></div>
                  `})}
              </div>
              <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--cv-label); margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${this.playing?`Bar ${Math.floor(this.progressStep/4)+1} · beat ${this.progressStep%4+1}`:`${t.length} bars · stopped`}
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}>
                <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
              </button>
              <button aria-label="Keep this loop" class="mobile-circle-btn" @click=${()=>this.dispatchEvent(new CustomEvent("save-set",{bubbles:!0,composed:!0}))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
              </button>
              <button aria-label="Loops library" class="mobile-circle-btn" @click=${()=>this.libraryOpen=!this.libraryOpen}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
              </button>
              <button aria-label="Share this loop" class="mobile-circle-btn" @click=${()=>this.shareOpen=!0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
              </button>
            </div>
          </div>

          ${this.renderTempoSheetMobile()}
          ${this.renderFeelSheetMobile()}
        </div>
      `:h`
      ${i?h`
        <div class="band-bar" style="background: ${i.color}33;">
          <div class="band-bar-content">
            <span class="band-bar-kicker">Following Artist DNA</span>
            <span class="band-bar-name" style="font-family: ${i.font}; font-weight: ${i.weight||800};">
              ${i.name}
            </span>
            <span class="band-bar-trick">— ${this.showTheory?i.theory:i.plain}</span>
          </div>
          <button class="band-bar-close" @click=${()=>this.onBandClick(i.name)} aria-label="Dismiss band DNA">×</button>
        </div>
      `:""}

      <div class="studio-container" style="--mood-color: ${e};">
        <!-- 1. Left Narrow Rail (62px) -->
        <nav class="rail-left" role="navigation">
          <div class="rail-top">
            <button
              class="vibe-rail-btn rail-item vibe ${this.vibeOpen?"active":""}"
              @click=${this.toggleVibe}
              aria-label="Vibe, genre and mood"
              title="Vibe, genre and mood"
              style="background: ${e};"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5"/><circle cx="12" cy="12" r="3.4"/>
              </svg>
            </button>
            <div class="rail-label">Vibe</div>
            <div class="rail-divider"></div>
            <div class="vibe-summary-vertical">${this.getVibeSummary()}</div>
          </div>

          <div class="rail-bottom">
            <button
              class="loops-rail-btn library-toggle rail-item loops ${this.libraryOpen?"active":""}"
              @click=${this.toggleLibrary}
              aria-label="Your loops"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
            </button>
            <div class="rail-label">Loops</div>

            ${this.libraryOpen?h`
              <div class="loops-popover-desktop library-popover">
                ${this.renderLibraryPopoverContent(e)}
              </div>
            `:""}
          </div>
        </nav>

        <!-- Floating Vibe Popover (Desktop) -->
        ${this.vibeOpen?h`
          <div class="vibe-popover-desktop">
            <div class="popover-header">
              <div class="popover-kicker">The Vibe</div>
              <button class="close-popover-btn" @click=${this.toggleVibe} aria-label="Close">×</button>
            </div>

            <form class="popover-input-row" @submit=${this.onVibeSubmit}>
              <input
                type="text"
                class="cv-vibe-input vibe-text-input"
                .value=${this.freeText}
                @input=${a=>{this.freeText=a.target.value}}
                placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
              />
              <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${Ht.map(a=>h`
                <button class="pill ${this.progression?.genre===a?"active":""}" @click=${()=>this.onGenreClick(a)}>${a}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Wt.map(a=>{const p=ue(a),b=this.progression?.mood===a;return h`
                  <button class="pill mood-pill ${b?"active":""}" style="${b?`background: ${p}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(a)}>
                    <span class="mood-badge" style="background: ${b?"rgba(46, 39, 31, 0.12)":p+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${b?"#2E271F":p}" stroke-width="2.2" stroke-linecap="round"><path d="${Qs[a]||"M12 4 a6.5 6.5 0 1 0 6.5 6.5"}"/></svg>
                    </span>
                    ${a}
                  </button>
                `})}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${pt.map(a=>h`
                <button class="pill ${this.selectedBand===a.name?"active":""}" style="font-family: ${a.font}; font-weight: ${a.weight||800};" @click=${()=>this.onBandClick(a.name)}>${a.name}</button>
              `)}
            </div>
          </div>
        `:""}

        <!-- 2. Center Stage (<main>) -->
        <main class="stage-main">
          <!-- Row 1: View Tabs -->
          <div class="stage-top-bar">
            <div class="view-tabs-bar">
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
            </div>
          </div>

          <!-- Row 2: Scrollable Stage Canvas -->
          <div class="stage-scroll-canvas">
            ${this.activeView==="loop"?h`
              <div class="stage-card stage-panel">
                <!-- Top Loop Play Strip -->
                <div class="loop-strip-header">
                  <button class="loop-play-btn play-circle-btn" @click=${this.togglePlay} style="background: ${this.playing?"#2E271F":e}; color: ${this.playing?"#FBF3E6":"#2E271F"};">
                    ${this.playing?"Stop":"Play loop"}
                  </button>

                  <div class="strip-timeline-wrap">
                    <div class="strip-cells-bar loop-beat-cells">
                      ${Array.from({length:16}).map((a,p)=>{const b=Math.floor(this.progressStep%(t.length*4)),y=this.playing&&Math.floor(b/(t.length*4)*16)===p,k=p%4===0;return h`
                          <div
                            class="strip-cell beat-cell"
                            style="height: ${y?20:k?13:8}px; background: ${y?"#F2735F":k?"rgba(46,39,31,0.3)":"rgba(46,39,31,0.14)"};"
                          ></div>
                        `})}
                    </div>
                    <div class="strip-labels-row">
                      <div class="strip-status-label">${this.playing?`Bar ${Math.floor(this.progressStep/4)+1} · beat ${this.progressStep%4+1} of ${t.length} bars`:`${t.length} bars · stopped`}</div>
                      <div class="strip-space-hint">Space plays the loop</div>
                    </div>
                  </div>

                  <div class="loop-bar-chips-group">
                    <div class="from-bar-label">From bar</div>
                    <div class="loop-bar-chips">
                      ${t.map((a,p)=>{const b=this.playing&&Math.floor(this.progressStep/4)===p;return h`
                          <button
                            class="strip-jump-chip"
                            style="background: ${b?e:"var(--cv-surface-2)"};"
                            @click=${()=>this.onJumpBar(p)}
                            aria-label="Play loop from bar ${p+1}"
                          >${p+1}</button>
                        `})}
                    </div>
                  </div>
                </div>

                <!-- Pad Cells Grid -->
                <div class="pad-cells-grid pad-cells-row">
                  ${t.map((a,p)=>{const b=H(a.tension||.1),y=this.activeIndex===p&&this.playing,k=this.padFlash===p,w=this.swapIndex===p;return h`
                      <div
                        class="pad-cell chord-item-wrap ${k?"pad-held":""} ${w?"selected":""} ${y?"pad-lit":""}"
                        style="background: ${b.color};"
                        @pointerdown=${T=>this.handlePadPointerDown(T,p)}
                        @pointerup=${()=>this.handlePadPointerUp()}
                        @pointercancel=${()=>this.handlePadPointerUp()}
                        @pointerleave=${()=>this.handlePadPointerUp()}
                        tabindex="0"
                        role="button"
                        aria-label="${a.name}, ${ae[a.functionLabel]||a.functionLabel} — press to play it; press nearer the top for a higher voicing"
                      >
                        <div class="zone-line-a ${this.lastPad?.idx===p&&this.lastPad?.zone===0?"active":""}"></div>
                        <div class="zone-line-b ${this.lastPad?.idx===p&&this.lastPad?.zone===2?"active":""}"></div>

                        <button
                          class="pad-swap-btn quick-action-btn swap"
                          @click=${T=>{T.stopPropagation(),this.openSwap(p)}}
                          @pointerdown=${T=>T.stopPropagation()}
                          aria-label="Swap ${a.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                        </button>

                        <button
                          class="pad-detail-btn"
                          @click=${T=>{T.stopPropagation(),this.openDetail(p)}}
                          @pointerdown=${T=>T.stopPropagation()}
                          aria-label="View voicing for ${a.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>

                        <div class="pad-top-row">
                          <div class="pad-key-badge">${ze[p]||""}</div>
                          ${this.showTheory&&a.roman?h`<div class="pad-roman-badge">${a.roman}</div>`:""}
                        </div>

                        <div class="pad-bottom-info">
                          <div class="pad-role-label">${Jt[a.functionLabel]||a.functionLabel}</div>
                          <div class="pad-chord-name">${a.name}</div>
                          ${this.showTheory&&a.notes&&a.notes.length?h`
                            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
                              ${a.notes.join(" · ")}
                            </div>
                          `:""}
                          <div class="pad-meta-voicing">${this.lastPad?.idx===p?Xt[this.lastPad.zone]||this.lastPad.voicing:""}</div>
                        </div>
                      </div>
                    `})}
                </div>

                ${this.showTheory?this.renderScaleChords(o.scaleName,o.scaleHint,o.scaleDegrees,!1):""}

                <!-- Playing Now Row -->
                <div class="playing-now-row playing-now-banner">
                  <div class="playing-now-kicker">Playing now</div>
                  <div class="playing-now-chord">${this.lastPad?t[this.lastPad.idx]?.name:"—"}</div>
                  <div class="playing-now-desc">
                    ${this.lastPad?`${this.lastPad.voicing} · velocity ${this.lastPad.vel}`:"Press a chord — nearer the top of a card plays a higher voicing. Home-row keys A S D F play them too."}
                  </div>
                </div>
              </div>

              <!-- Quick Controls Below Stage Card -->
              <div class="stage-quick-controls">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument||"Piano"} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"} <span style="opacity:0.6;">⌄</span>
                </button>
                <div class="quick-divider"></div>
                <button class="tempo-chip" @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1)}}>${this.progression?.key||"C"} · ${this.progression?.bpm||84}</button>
                <button class="feel-chip" @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1)}}>Feel &amp; tone</button>
                <button class="bounce-btn" @click=${()=>{this.bounceOpen=!0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>
                  Bounce
                </button>
              </div>

              ${this.renderTempoDrawerDesktop()}
              ${this.renderFeelDrawerDesktop()}

              <!-- Instrument tray if expanded -->
              ${this.expandedInstrument?h`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${ge.map(a=>h`
                    <button
                      class="pill ${(this.instrument||"Piano")===a.name?"active":""}"
                      @click=${()=>{this.instrument=a.name,C.setInstrument(a.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:a.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                    >
                      <span style="background:${a.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${a.name}
                    </button>
                  `)}
                </div>
              `:""}

              <!-- Play style tray if expanded -->
              ${this.expandedPlayStyle?h`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${me.map(a=>h`
                    <button
                      class="pill ${(this.playStyle||"Block chords")===a.name?"active":""}"
                      @click=${()=>{this.playStyle=a.name,C.setPlayStyle(a.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:a.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                    >
                      <span style="background:${a.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${a.name}
                    </button>
                  `)}
                </div>
              `:""}
            `:this.activeView==="song"?h`
              <div class="song-track-list">
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); max-width: 560px;">
                  Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 18px; max-width: 620px;">
                  ${this.sections.map((a,p)=>h`
                    <div
                      class="song-card"
                      style="display: flex; align-items: center; gap: 16px; background: var(--cv-surface); border-radius: 16px; padding: 14px 18px; cursor: pointer;"
                      @click=${()=>{this.activeSectionIdx=p,this.activeView="loop"}}
                    >
                      <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">Section ${p+1}</div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${a.name}</div>
                        <div style="font-size: 12px; color: var(--cv-ink-muted);">${a.desc}</div>
                      </div>
                      <div style="display: flex; gap: 4px; flex-shrink: 0;">
                        ${a.progression.chords.map(b=>{const y=H(b.tension);return h`<span style="display:inline-block;width:10px;height:10px;border-radius:${Math.round(y.radius*.35)}px;background:${y.color};flex-shrink:0;"></span>`})}
                      </div>
                    </div>
                  `)}
                </div>
              </div>
            `:h`
              <div class="play-it-wrap" style="padding: 18px 24px 32px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
                  <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: var(--cv-label); text-transform: uppercase;">Piano</div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click=${()=>{this.showDegrees=!this.showDegrees}}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees?e:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                      <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees?"translateX(16px)":"translateX(0)"}; transition: transform 150ms ease;"></div>
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((a,p)=>this.renderPianoCard(a,p))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(a=>h`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===a?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===a?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=a}}
                      >${a}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((a,p)=>this.renderFretCard(a,p,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                </div>
              </div>
            `}
          </div>

          <!-- Row 3: Bottom Bar -->
          <div class="stage-bottom-bar">
            <div class="length-stepper">
              <button class="stepper-btn" @click=${this.onDecLength} aria-label="Fewer chords">−</button>
              <span class="stepper-count">${t.length} chords</span>
              <button class="stepper-btn" @click=${this.onIncLength} aria-label="More chords">+</button>
            </div>
            <button class="try-another-btn dice-reroll-btn" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
              Try another
            </button>
          </div>
        </main>

        <!-- 3. Right Inspector (<aside>) -->
        <aside class="inspector-right sidebar-right">
          ${this.detailOpen?h`
            <!-- Chord Detail View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; gap: 13px;">
                <div class="chord-shape-badge" style="background: ${H(t[this.detailIndex]?.tension||.1).color};"></div>
                <div style="flex: 1; min-width: 0;">
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${t[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${t[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="close-detail-btn" @click=${this.clearSelection} aria-label="Close chord info">×</button>
              </div>
            </div>

            <div class="inspector-body">
              ${this.renderChordDetailContent(t)}
            </div>
          `:this.swapIndex!==null?h`
            <!-- Chord Swap View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Swapping Bar ${this.swapIndex+1}</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${m?.name||""}</span>
                    ${this.showTheory&&m?.roman?h`<span class="swap-roman">${m.roman}</span>`:""}
                    <span class="swap-role">${ae[m?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>

              <div class="ab-compare-box ab-box">
                <div class="ab-compare-row">
                  <button
                    class="ab-card-half ${this.abSide==="before"?"active-now":""}"
                    style="background: ${this.abSide==="before"?"#5E5142":"#F1E4D2"}; color: ${this.abSide==="before"?"#FBF3E6":"#2E271F"};"
                    @click=${()=>this.setABSide("before")}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${m?.name||""}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                    style="background: ${this.abPick?this.abSide==="after"?e:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
                    @click=${()=>this.setABSide("after")}
                    ?disabled=${!this.abPick}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick?"#2E271F":"rgba(46,39,31,0.45)"};"> ${this.abPick?.chord||"Pick one below"}</div>
                  </button>
                </div>
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying?e:"#E8D9C2"};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                  >
                    ${this.abPlaying?h`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>`:h`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${t.map((a,p)=>{const b=p===this.swapIndex,y=b&&this.abSide==="after"&&this.abPick?this.abPick.chord:a.name,k=this.abPlaying&&Math.floor(this.progressStep/4)===p;return h`
                        <button
                          class="ab-cell-item ${k?"active-step":""}"
                          style="background: ${b&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${b?1:.65};"
                          @click=${()=>this.onAbCellClick(p)}
                          aria-label="Preview ${y} in bar ${p+1}"
                        >
                          ${y}
                        </button>
                      `})}
                  </div>
                </div>
              </div>

              <button class="accept-swap-btn" @click=${this.confirmSwap} ?disabled=${!this.abPick}>
                ${this.abPick?`Keep ${this.abPick.chord}`:"Pick a chord below"}
              </button>
            </div>

            <div class="inspector-body">
              <div class="swap-family-tabs swap-tab-nav">
                ${ii.map(a=>{const p=this.activeSwapFamily===a.key,b=H(a.tension),y=Math.round(b.size*.34),k=Math.round(b.radius*(y/b.size));return h`
                    <button
                      class="swap-family-tab ${p?"active":""}"
                      @click=${()=>{this.activeSwapFamily=a.key,this.requestUpdate()}}
                    >
                      ${a.twoTone?h`
                        <span class="two-tone-swatch" style="box-shadow: ${p?`0 0 0 3px ${e}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:h`
                        <span
                          class="family-shape"
                          style="width: ${y}px; height: ${y}px; border-radius: ${k}px; background: ${b.color}; box-shadow: ${p?`0 0 0 3px ${e}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${p?"active":""}">${a.label}</span>
                    </button>
                  `})}
              </div>

              ${i?h`
                <div class="band-note-banner" style="background: ${i.color}22;">
                  <span>${this.showTheory?`${i.name}: ${i.theory}`:`Sorted for ${i.name} — their moves first`}</span>
                </div>
              `:""}

              ${f?h`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px;">
                  ${f}
                </div>
              `:""}

              <div class="alt-candidates-list">
                ${c.map(a=>{const p=!!i&&i.hoist.includes(a.name),b=H(a.tension),y=Math.max(28,Math.min(38,Math.round(b.size*.32))),k=Math.round(b.radius*(y/b.size));return h`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord===a.name?"selected":""}" @click=${()=>this.selectAlternative(a)}>
                      <div class="alt-shape" style="width: ${y}px; height: ${y}px; border-radius: ${k}px; background: ${b.color}; box-shadow: ${this.abPick?.chord===a.name?`0 0 0 2px ${e}`:"none"}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: #2E271F;">${a.name}</span>
                          ${this.showTheory&&a.roman?h`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${a.roman}</span>`:""}
                          ${p?h`<span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>`:""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${a.sub}</div>
                        ${this.showTheory&&a.notes&&a.notes.length?h`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${a.notes.join(" · ")}
                          </div>
                        `:""}
                      </div>
                      <button class="alt-play-chip alt-play-btn" @click=${w=>{w.stopPropagation(),this.previewAlternative(a.name)}}>Hear</button>
                    </div>
                  `})}
              </div>
              ${this.showTheory?this.renderTheoryStrip(o):""}
            </div>
          `:h`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div>
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${u}</div>
                </div>
                <button class="theory-toggle-btn" @click=${this.onTheoryToggle} aria-label="Show the music theory">
                  <span style="font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">Theory</span>
                  <span class="toggle-track ${this.showTheory?"active":""}">
                    <span class="toggle-knob"></span>
                  </span>
                </button>
              </div>
            </div>

            <div class="inspector-body">
              <div class="arc-bars-row">
                ${t.map((a,p)=>{const b=H(a.tension||.1),y=Math.round(18+(a.tension||.1)*62);return h`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(p)} aria-label="${a.name}, ${ae[a.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${y}px; background: ${b.color};"></div>
                      </div>
                      <div class="arc-bar-name">${a.name}</div>
                      <div class="arc-bar-feel">${ae[a.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${g}</div>
              ${this.showTheory&&o.setNote?h`
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(46,39,31,0.08); text-wrap: pretty;">
                  ${o.setNote}
                </div>
              `:""}

              <div class="inspector-tip-box" style="margin-top: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${e}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
              </div>
              ${this.showTheory?this.renderTheoryStrip(o):""}
            </div>
          `}
        </aside>
      </div>
    `}};S.styles=X`
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

    button {
      font-family: inherit;
    }

    @keyframes cvfv-sheet-up {
      from { transform: translateY(14px); opacity: 0.6; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Top Band DNA Banner */
    .band-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 24px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
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
      color: var(--cv-ink, #2E271F);
    }
    .band-bar-trick {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
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
      color: var(--cv-ink, #2E271F);
      transition: background 150ms ease;
    }
    .band-bar-close:hover {
      background: var(--cv-cream, #FBF3E6);
    }

    /* Studio Shell */
    .studio-container {
      display: flex;
      align-items: stretch;
      flex: 1;
      min-height: 0;
      min-width: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    /* 1. Left Narrow Rail (62px) */
    .rail-left {
      width: 62px;
      min-width: 62px;
      max-width: 62px;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      border-right: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      box-sizing: border-box;
      z-index: 10;
    }
    .rail-top {
      min-width: 0;
      overflow: hidden;
      padding: 18px 8px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .rail-bottom {
      position: relative;
      padding: 0 8px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .vibe-rail-btn {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 16px -10px rgba(46,39,31,0.6);
      transition: transform 140ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 140ms ease;
    }
    .vibe-rail-btn:hover {
      transform: scale(1.04);
    }
    .vibe-rail-btn.active {
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .loops-rail-btn {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 150ms ease;
    }
    .loops-rail-btn:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .rail-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      text-align: center;
      line-height: 1.3;
    }
    .rail-divider {
      width: 26px;
      height: 1px;
      background: rgba(46, 39, 31, 0.12);
      margin: 2px 0;
    }
    .vibe-summary-vertical {
      writing-mode: vertical-rl;
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      letter-spacing: 0.4px;
      max-height: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Floating Vibe Popover (Desktop) */
    .vibe-popover-desktop {
      position: fixed;
      left: 70px;
      top: 64px;
      width: 322px;
      z-index: 45;
      max-height: calc(100vh - 96px);
      overflow-y: auto;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 20px;
      padding: 16px 18px 20px;
      box-shadow: 0 28px 54px -22px rgba(46, 39, 31, 0.55);
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
    }
    .popover-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .popover-kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      flex: 1;
      min-width: 0;
    }
    .popover-kicker.spaced {
      margin-top: 20px;
      margin-bottom: 9px;
    }
    .close-popover-btn {
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      width: 28px;
      height: 28px;
      border-radius: 100px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
    }
    .popover-input-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface, #F6EADB);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 9px;
    }
    .cv-vibe-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
      padding: 9px 0;
    }
    .cv-vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.52);
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
      transition: transform 120ms ease;
    }
    .vibe-submit-btn:active {
      transform: scale(0.95);
    }

    /* Floating Loops Popover (Desktop) */
    .loops-popover-desktop {
      position: absolute;
      left: 8px;
      width: 300px;
      bottom: 62px;
      z-index: 30;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px;
      box-shadow: 0 22px 44px -20px rgba(46, 39, 31, 0.5);
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
    }

    /* Pills Groups */
    .pills-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      border-radius: 100px;
      padding: 7px 12px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
    }
    .pill:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .mood-pill {
      padding: 5px 12px 5px 6px;
    }
    .mood-badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 2. Center Stage (<main>) */
    .stage-main {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: var(--cv-cream, #FBF3E6);
    }
    .stage-top-bar {
      padding: 6px 22px 8px;
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }
    .view-tabs-bar {
      display: flex;
      gap: 2px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 100px;
      padding: 4px;
      width: fit-content;
      flex-shrink: 0;
    }
    .view-tab {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      white-space: nowrap;
      cursor: pointer;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      transition: background 160ms ease, color 160ms ease;
    }
    .view-tab.active {
      background: #2E271F;
      color: #FBF3E6;
    }
    .stage-scroll-canvas {
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 22px 20px;
    }
    .stage-card {
      position: relative;
      min-height: 280px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 26px;
      padding: 26px 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      box-sizing: border-box;
    }

    /* Loop Strip at top of card */
    .loop-strip-header {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      flex-shrink: 0;
    }
    .loop-play-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 44px;
      padding: 0 18px;
      border: none;
      font-family: inherit;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease, color 150ms ease;
    }
    .strip-timeline-wrap {
      flex: 1;
      min-width: 180px;
    }
    .strip-cells-bar {
      display: flex;
      gap: 2px;
      align-items: flex-end;
      height: 20px;
    }
    .strip-cell {
      flex: 1;
      min-width: 0;
      border-radius: 2px;
      transition: height 90ms linear, background 90ms linear;
    }
    .strip-labels-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 7px;
      flex-wrap: wrap;
    }
    .strip-status-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .strip-space-hint {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .loop-bar-chips-group {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .from-bar-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .loop-bar-chips {
      display: flex;
      gap: 4px;
    }
    .strip-jump-chip {
      border: none;
      font-family: inherit;
      min-width: 34px;
      min-height: 34px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      background: var(--cv-surface-2, #F1E4CC);
      color: #2E271F;
      transition: background 150ms ease;
    }

    /* Pad Cells Grid */
    .pad-cells-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      min-width: 0;
    }
    @media (max-width: 768px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .pad-cell {
      position: relative;
      overflow: hidden;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      padding: 14px;
      border-radius: 20px;
      cursor: pointer;
      min-height: 118px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell:hover {
      transform: translateY(-1px);
    }
    .pad-cell.pad-held {
      transform: scale(0.985);
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .pad-cell.selected {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.3);
    }
    .zone-line-a {
      position: absolute;
      left: 9px;
      right: 9px;
      top: 34%;
      height: 1px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.075);
      pointer-events: none;
      transition: background 180ms ease, height 180ms ease;
    }
    .zone-line-a.active {
      height: 2px;
      background: rgba(46, 39, 31, 0.34);
    }
    .zone-line-b {
      position: absolute;
      left: 9px;
      right: 9px;
      top: 67%;
      height: 1px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.075);
      pointer-events: none;
      transition: background 180ms ease, height 180ms ease;
    }
    .zone-line-b.active {
      height: 2px;
      background: rgba(46, 39, 31, 0.34);
    }
    .play-card {
      background: var(--cv-surface, #F1E4CC);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 150ms var(--cv-ease);
    }
    .play-card:active {
      transform: scale(0.99);
    }
    .pad-swap-btn {
      position: absolute;
      top: 9px;
      right: 9px;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.82);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 3;
      transition: background 150ms ease, transform 120ms ease;
    }
    .pad-swap-btn:hover {
      background: #FBF3E6;
      transform: scale(1.06);
    }
    .pad-detail-btn {
      position: absolute;
      top: 9px;
      right: 43px;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.82);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 3;
      transition: background 150ms ease, transform 120ms ease;
    }
    .pad-detail-btn:hover {
      background: #FBF3E6;
      transform: scale(1.06);
    }
    .pad-top-row {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      padding-right: 64px;
    }
    .pad-key-badge {
      font-size: 11px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.5);
    }
    .pad-roman-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: rgba(46, 39, 31, 0.55);
    }
    .pad-bottom-info {
      position: relative;
    }
    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.45);
    }
    .pad-chord-name {
      font-size: clamp(20px, 2.1vw, 30px);
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
    }
    .pad-meta-voicing {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 5px;
      height: 13px;
    }

    /* Playing now strip */
    .playing-now-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: baseline;
      gap: 11px;
      flex-wrap: wrap;
      padding-top: 15px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }
    .playing-now-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .playing-now-chord {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.01em;
    }
    .playing-now-desc {
      flex: 1 1 200px;
      min-width: 0;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
      text-wrap: pretty;
    }

    /* Quick controls below card */
    .stage-quick-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 8px;
      row-gap: 10px;
      margin-top: 16px;
    }
    .instrument-chip, .play-style-chip, .tempo-chip, .feel-chip {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2, #F1E4CC);
      color: #5B5145;
      min-height: 38px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      flex-shrink: 0;
      white-space: nowrap;
    }
    .instrument-chip:hover, .play-style-chip:hover, .tempo-chip:hover, .feel-chip:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .quick-divider {
      width: 1px;
      align-self: stretch;
      min-height: 28px;
      background: rgba(46, 39, 31, 0.12);
      margin: 0 4px;
    }
    .bounce-btn {
      margin-left: auto;
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 100px;
      min-height: 38px;
      padding: 0 18px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: transform 120ms ease;
    }
    .bounce-btn:active {
      transform: scale(0.97);
    }

    /* Bottom Bar (Row 3) */
    .stage-bottom-bar {
      min-width: 0;
      background: var(--cv-cream, #FBF3E6);
      padding: 4px 22px 14px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: 8px;
    }
    .length-stepper {
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
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .stepper-count {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
    }
    .try-another-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
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
    .try-another-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    /* 3. Right Inspector (<aside>) */
    .inspector-right {
      width: clamp(304px, 26vw, 384px);
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface, #F6EADB);
      box-sizing: border-box;
    }
    .inspector-header {
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }
    .inspector-body {
      min-width: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 22px 22px;
    }
    .inspector-kicker, .detail-kicker, .swap-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .arc-title-text {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 5px;
      letter-spacing: -0.015em;
      text-wrap: pretty;
    }
    .theory-toggle-btn {
      border: none;
      font-family: inherit;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 2px 0;
      flex-shrink: 0;
    }
    .toggle-track {
      width: 34px;
      height: 18px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      position: relative;
      transition: background 200ms ease;
    }
    .toggle-track.active {
      background: var(--mood-color, #9B7CA8);
    }
    .toggle-knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FBF3E6;
      transition: transform 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .toggle-track.active .toggle-knob {
      transform: translateX(16px);
    }
    .arc-bars-row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 152px;
      padding: 0 2px;
    }
    .arc-bar-col {
      flex: 1 1 0;
      min-width: 0;
      border: none;
      font-family: inherit;
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
      background: var(--cv-cream, #FBF3E6);
    }
    .arc-bar-fill-wrap {
      height: 80px;
      flex-shrink: 0;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .arc-bar-fill {
      width: 100%;
      max-width: 34px;
      border-radius: 4px;
      transition: height 320ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 320ms ease;
    }
    .arc-bar-name {
      font-size: 11.5px;
      font-weight: 800;
      line-height: 1.25;
      color: var(--cv-ink, #2E271F);
      flex-shrink: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      margin-top: 6px;
    }
    .arc-bar-feel {
      font-size: 9.5px;
      font-weight: 700;
      line-height: 1.2;
      color: rgba(46, 39, 31, 0.45);
      text-align: center;
      flex-shrink: 0;
      max-width: 100%;
    }
    .arc-caption {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: rgba(46, 39, 31, 0.42);
      margin-top: 8px;
    }
    .arc-sentence-text {
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 14px;
      text-wrap: pretty;
    }
    .arc-theory-note {
      font-size: 13px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      text-wrap: pretty;
    }
    .inspector-tip-box {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      margin-top: 16px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 11px 13px;
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #6B5F50);
      text-wrap: pretty;
    }

    /* Chord Detail Inspector */
    .chord-shape-badge {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .detail-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-top: 4px;
    }
    .detail-chord-function {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 3px;
    }
    .close-detail-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      margin: -8px -10px 0 0;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease;
    }
    .close-detail-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .detail-notes-pills {
      display: flex;
      gap: 7px;
      margin-top: 9px;
      flex-wrap: wrap;
    }
    .note-pill {
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
    }
    .detail-quality-box, .detail-extension-box {
      display: flex;
      align-items: baseline;
      gap: 9px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 14px;
      padding: 11px 14px;
      margin-top: 9px;
    }
    .quality-label {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .quality-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .quality-chips-grid, .ext-chips-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    .chord-mod-chip {
      padding: 10px 12px;
      border-radius: 14px;
      border: none;
      font-family: inherit;
      cursor: pointer;
      background: var(--cv-surface, #F1E4CC);
      text-align: left;
      transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
    }
    .chord-mod-chip:hover {
      transform: scale(0.99);
    }
    .chord-mod-chip.selected,
    .chord-mod-chip.active {
      background: var(--cv-mood-color, #F6D98B);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.2);
    }
    .chord-mod-chip .chip-title {
      font-size: 13px;
      font-weight: 700;
      color: #2E271F;
    }
    .chord-mod-chip .chip-desc {
      font-size: 11px;
      color: rgba(46, 39, 31, 0.6);
      margin-top: 2px;
    }
    .detail-mini-keyboard {
      position: relative;
      margin-top: 10px;
      border-radius: 14px;
      overflow: hidden;
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      background: var(--cv-cream, #FBF3E6);
    }
    .detail-mini-keyboard .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.35);
      background: #FBF3E6;
      border-right: 1px solid rgba(46, 39, 31, 0.08);
      transition: background 150ms ease, color 150ms ease;
    }
    .detail-mini-keyboard .white-key:last-child {
      border-right: none;
    }
    .detail-mini-keyboard .white-key.active {
      color: #2E271F;
      background: var(--cv-mood-color, #F6D98B);
      font-weight: 800;
    }
    .detail-mini-keyboard .black-key {
      position: absolute;
      top: 0;
      width: calc(100% / 7 * 0.58);
      height: 44px;
      background: var(--cv-plum, #2E271F);
      border-radius: 0 0 5px 5px;
      z-index: 2;
      transition: background 150ms ease;
    }
    .detail-mini-keyboard .black-key.active {
      background: #F2735F;
    }

    /* Swap Inspector */
    .swap-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.02em;
      line-height: 1;
    }
    .swap-roman {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      letter-spacing: 0.5px;
    }
    .swap-role {
      font-size: 12px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
    }
    .close-swap-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      margin: -8px -10px 0 0;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      flex-shrink: 0;
    }
    .ab-compare-box, .ab-box {
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
    }
    .ab-cell-item:active {
      transform: scale(0.94);
    }
    .ab-cell-item.active-step {
      box-shadow: inset 0 0 0 2px #2E271F;
    }
    /* legacy names kept for compat */
    .ab-now-card, .ab-swap-card {
      flex: 1;
      padding: 7px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .ab-now-card.active, .ab-swap-card.active {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .ab-side-label {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.65;
    }
    .ab-side-chord {
      font-size: 14px;
      font-weight: 800;
      margin-top: 1px;
    }
    .accept-swap-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      width: 100%;
      padding: 11px 14px;
      font-size: 13px;
      font-weight: 800;
      border-radius: 100px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      margin-top: 8px;
      transition: transform 120ms ease;
    }
    .accept-swap-btn:active {
      transform: scale(0.98);
    }
    .accept-swap-btn:disabled {
      background: var(--cv-surface-2, #F1E4CC);
      color: rgba(46, 39, 31, 0.35);
      cursor: default;
    }
    .swap-family-tabs, .swap-tab-nav {
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
      background: var(--cv-cream, #FBF3E6);
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
      max-width: 100%;
      transition: color 150ms ease;
    }
    .swap-family-tab.active .family-label {
      color: var(--cv-ink, #2E271F);
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
    }
    .alt-candidates-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .alt-chord-row {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 9px 12px;
      border-radius: 12px;
      background: var(--cv-cream, #FBF3E6);
      cursor: pointer;
      transition: background 140ms ease;
    }
    .alt-chord-row:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .alt-chord-row.selected {
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .alt-shape {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .alt-play-chip {
      border: none;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 5px 10px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
    }

    /* Mobile Dedicated Styles */
    .mobile-stage-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      background: var(--cv-cream, #FBF3E6);
    }
    .mobile-vibe-toggle {
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 16px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
    }
    .mobile-swap-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 84%;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 26px 26px 0 0;
      box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.5);
      z-index: 100;
      display: flex;
      flex-direction: column;
      animation: cvfv-sheet-up 260ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
      padding: 16px 20px 24px;
      overflow-y: auto;
    }
    .sheet-handle {
      width: 38px;
      height: 4px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      margin: 0 auto 14px;
      flex-shrink: 0;
    }
    .sheet-cancel-btn {
      border: none;
      font-family: inherit;
      text-align: center;
      border-radius: 100px;
      padding: 12px 18px;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.18);
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.44);
      z-index: 95;
    }
    .mobile-bottom-transport-bar {
      position: sticky;
      bottom: 0;
      flex-shrink: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      padding: 11px 14px 26px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 50;
    }
    .mobile-circle-btn {
      border: none;
      font-family: inherit;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--cv-surface, #F6EADB);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease, transform 120ms ease;
    }
    .mobile-circle-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .mobile-circle-btn:active {
      transform: scale(0.96);
    }
    .mobile-chip-btn {
      border: none;
      font-family: inherit;
      flex: 1;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      border-radius: 14px;
      min-height: 46px;
      padding: 0 10px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 150ms ease;
    }
    .mobile-chip-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .mobile-bounce-btn {
      border: none;
      font-family: inherit;
      flex: 0.9;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      min-height: 46px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      transition: opacity 150ms ease;
    }
    .mobile-bounce-btn:hover {
      opacity: 0.92;
    }
    .mobile-theory-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 22px;
      padding-top: 18px;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      cursor: pointer;
    }
    .mobile-theory-panel {
      margin-top: 20px;
    }
  `;$([I({type:Object})],S.prototype,"chordData",2);$([I({type:Object})],S.prototype,"progression",2);$([I({type:Number})],S.prototype,"activeIndex",2);$([I({type:Number})],S.prototype,"progressStep",2);$([I({type:Array})],S.prototype,"order",2);$([I({type:Boolean})],S.prototype,"playing",2);$([I({type:Boolean})],S.prototype,"showTheory",2);$([I({type:String})],S.prototype,"instrument",2);$([I({type:String})],S.prototype,"playStyle",2);$([I({type:Boolean})],S.prototype,"isAuthenticated",2);$([I({type:String})],S.prototype,"userEmail",2);$([I({type:Array})],S.prototype,"sections",2);$([I({type:Number})],S.prototype,"activeSectionIdx",2);$([I({type:Number})],S.prototype,"activePlayingSectionIdx",2);$([I({type:Number})],S.prototype,"totalSongSteps",2);$([I({type:Boolean})],S.prototype,"isGenerating",2);$([I({type:Boolean})],S.prototype,"libraryOpen",2);$([x()],S.prototype,"isMobile",2);$([x()],S.prototype,"activeView",2);$([x()],S.prototype,"vibeOpen",2);$([x()],S.prototype,"selectedBand",2);$([x()],S.prototype,"freeText",2);$([x()],S.prototype,"vibePlaceholderIdx",2);$([x()],S.prototype,"expandedGenre",2);$([x()],S.prototype,"expandedMood",2);$([x()],S.prototype,"activeSwapFamily",2);$([x()],S.prototype,"swapIndex",2);$([x()],S.prototype,"isInspectorOpen",2);$([x()],S.prototype,"detailOpen",2);$([x()],S.prototype,"detailIndex",2);$([x()],S.prototype,"abPick",2);$([x()],S.prototype,"abSide",2);$([x()],S.prototype,"abPlaying",2);$([x()],S.prototype,"savedSets",2);$([x()],S.prototype,"renamingId",2);$([x()],S.prototype,"draftName",2);$([x()],S.prototype,"confirmDeleteId",2);$([x()],S.prototype,"librarySearch",2);$([x()],S.prototype,"librarySelectMode",2);$([x()],S.prototype,"librarySelected",2);$([x()],S.prototype,"playInstrument",2);$([x()],S.prototype,"showDegrees",2);$([x()],S.prototype,"mobileSheetOpen",2);$([x()],S.prototype,"mobileDetailSheetOpen",2);$([x()],S.prototype,"padFlash",2);$([x()],S.prototype,"lastPad",2);$([x()],S.prototype,"tempoOpen",2);$([x()],S.prototype,"feelOpen",2);$([x()],S.prototype,"bounceOpen",2);$([x()],S.prototype,"bounceFormat",2);$([x()],S.prototype,"shareOpen",2);$([x()],S.prototype,"expandedInstrument",2);$([x()],S.prototype,"expandedPlayStyle",2);$([x()],S.prototype,"barsPerChord",2);$([x()],S.prototype,"keyIdx",2);$([x()],S.prototype,"swing",2);$([x()],S.prototype,"spread",2);$([x()],S.prototype,"density",2);$([x()],S.prototype,"tone",2);$([x()],S.prototype,"auditionDeg",2);$([x()],S.prototype,"auditionName",2);$([x()],S.prototype,"auditionBar",2);S=$([Q("loop-screen")],S);var rn=Object.defineProperty,an=Object.getOwnPropertyDescriptor,$e=(t,e,i,o)=>{for(var s=o>1?void 0:o?an(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&rn(e,i,s),s};let ce=class extends K{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(t){t.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const t=this.name.trim();t&&(this.dispatchEvent(new CustomEvent("save",{detail:t})),this.close())}onInput(t){this.name=t.target.value}onKeyDown(t){t.key==="Escape"?this.close():t.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?h`
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
    `:h``}};ce.styles=X`
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
  `;$e([I({type:Boolean})],ce.prototype,"visible",2);$e([I({type:String})],ce.prototype,"defaultName",2);$e([x()],ce.prototype,"mounted",2);$e([x()],ce.prototype,"name",2);$e([mi(".name-input")],ce.prototype,"inputEl",2);ce=$e([Q("save-set-modal")],ce);var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,L=(t,e,i,o)=>{for(var s=o>1?void 0:o?cn(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&ln(e,i,s),s};const dn=["Piano","Rhodes","Nylon Guitar","Warm Pad"],pn=["Block chords","Arpeggio","Strum","Broken (swing)"],hn=["flex-start","center","flex-end"];let F=class extends K{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.embedded=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=yt(.5),this.mascotAlign=wt([...hn]),this.eggCounter=new Ri,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(t){if(t.has("progressStep")){const e=t.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}updated(t){t.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(t){this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const t=this.sections[0]?.progression.genre??"Pop",e=this.instrument??ho(t),i=this.playStyle??uo(t),o=this.totalSteps||this.sections.reduce((a,p)=>a+p.order.length,0),s=!this.playing||o<=0?0:this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100,n=ge.filter(a=>a.name!==e);let r=dn.filter(a=>n.some(p=>p.name===a));const l=n.filter(a=>!r.includes(a.name)),d=this.expandedAllInstruments?n:n.filter(a=>r.includes(a.name)),u=me.filter(a=>a.name!==i);let g=pn.filter(a=>u.some(p=>p.name===a));const c=u.filter(a=>!g.includes(a.name)),f=this.expandedAllPlayStyles?u:u.filter(a=>g.includes(a.name)),v=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],m=v?ue(v.progression.mood):"#C9A9E0";return h`
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
            ${this.sections.map((a,p)=>{const b=this.playing?p===this.activePlayingSectionIdx:p===this.activeSectionIdx,y=ue(a.progression.mood);return h`
                <div class="section-row ${b?"active":""}" style=${b?`--ring-color:${y}`:""} @click=${()=>this.selectSection(p)}>
                  <div>
                    <div class="section-name">${a.name.toUpperCase()}</div>
                    <div class="section-chords">${a.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${a.order.map(k=>{const w=a.progression.chords[k],T=H(w.tension);return h`<div class="section-chip" style="background:${T.color};border-radius:${Math.round(T.radius*.35)}px;"></div>`})}
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
              <button class="play-btn" style="background:${m}" @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}>
                ${this.playing?h`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:h`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${s}%;background:${m};--progress-duration:${wi}ms"
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
                ${d.map(a=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:a.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${a.color}"></span>${a.name}
                  </div>
                `)}
                ${l.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${l.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?h`
              <div class="control-options">
                ${f.map(a=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:a.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${a.color}"></span>${a.name}
                  </div>
                `)}
                ${c.length?h`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${c.length} more ⌄`}
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
          .defaultName=${t&&v?`${t} · ${v.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${a=>{this.dispatchEvent(new CustomEvent("save-set",{detail:a.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};F.styles=X`
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
  `;L([I({type:Array})],F.prototype,"sections",2);L([I({type:Number})],F.prototype,"activeSectionIdx",2);L([I({type:Number})],F.prototype,"activePlayingSectionIdx",2);L([I({type:Boolean})],F.prototype,"canAddSection",2);L([I({type:Boolean})],F.prototype,"playing",2);L([I({type:Number})],F.prototype,"progressStep",2);L([I({type:Number})],F.prototype,"totalSteps",2);L([I({type:String})],F.prototype,"instrument",2);L([I({type:String})],F.prototype,"playStyle",2);L([I({type:Boolean})],F.prototype,"isAuthenticated",2);L([I({type:Boolean})],F.prototype,"isBookmarked",2);L([I({type:Boolean})],F.prototype,"embedded",2);L([x()],F.prototype,"expandedInstrument",2);L([x()],F.prototype,"expandedPlayStyle",2);L([x()],F.prototype,"expandedAllInstruments",2);L([x()],F.prototype,"expandedAllPlayStyles",2);L([x()],F.prototype,"snapProgress",2);L([x()],F.prototype,"saveModalVisible",2);L([x()],F.prototype,"mascot",2);L([x()],F.prototype,"mascotAlign",2);L([x()],F.prototype,"paradeTrigger",2);F=L([Q("song-screen")],F);var un=Object.defineProperty,gn=Object.getOwnPropertyDescriptor,te=(t,e,i,o)=>{for(var s=o>1?void 0:o?gn(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&un(e,i,s),s};const oi={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},mn=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],si={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},ni={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ri={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Ee={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}},fn=[4,9,2,7,11,4],ai=[7,0,4,9];let W=class extends K{constructor(){super(...arguments),this.order=[0,1,2,3],this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.embedded=!1,this.playInstrument="Piano",this.showDegrees=!1,this.activeChordIndex=null}parseChord(t){const e=/^([A-G][b#]?)(.*)$/.exec(t||"C"),i=e?e[1]:"C",o=e?e[2]:"",s=si[o]||si[ri[o]||"maj"]||[0,4,7];return{root:i,rootPc:oi[i]===void 0?0:oi[i],q:o,intervals:s}}shapeQual(t){const e=t===""?"maj":t;if(Ee[5][e]||Ee[6][e])return e;const i=ri[e];return i&&(Ee[5][i]||Ee[6][i])?i:"maj"}guitarVoicing(t){const e=this.parseChord(t),i=this.shapeQual(e.q),o=[];return[[6,4],[5,9]].forEach(([s,n])=>{const r=Ee[s][i];if(!r)return;const l=((e.rootPc-n)%12+12)%12;o.push({rootFret:l,frets:r.map(d=>d===null?null:d+l)})}),o.length?(o.sort((s,n)=>s.rootFret-n.rootFret),o[0].frets):null}ukeVoicing(t){const e=this.parseChord(t),i=ai,o=e.intervals.map(l=>(e.rootPc+l)%12),s=l=>{const d=new Set(l);let u=null;const g=[],c=f=>{if(f===4){const v=g.map((b,y)=>(i[y]+b)%12);for(const b of d)if(v.indexOf(b)<0)return;for(const b of v)if(!d.has(b))return;const m=g.filter(b=>b>0),a=m.length?Math.max(...m)-Math.min(...m):0;if(a>3)return;const p=a*12+g.reduce((b,y)=>b+y,0);(!u||p<u.score)&&(u={frets:g.slice(),score:p});return}for(let v=0;v<=5;v++)g.push(v),c(f+1),g.pop()};return c(0),u},n=s(o);if(n)return n.frets;const r=s(e.intervals.filter(l=>l!==7).map(l=>(e.rootPc+l)%12));return r?r.frets:null}degOf(t,e){return ni[((t-e)%12+12)%12]||"1"}notesLineFor(t){return t.intervals.map(e=>{const i=mn[(t.rootPc+e)%12];return this.showDegrees?`${i} (${this.degOf((t.rootPc+e)%12,t.rootPc)})`:i}).join(" · ")}onChordClick(t){this.activeChordIndex=t,this.dispatchEvent(new CustomEvent("chord-preview",{detail:t,bubbles:!0,composed:!0})),setTimeout(()=>{this.activeChordIndex===t&&(this.activeChordIndex=null)},450)}onBackClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}renderPianoSvg(t,e){const n=[0,2,4,5,7,9,11],r=this.parseChord(t),l=[],d=[],u=[];for(let c=0;c<2;c++)n.forEach((f,v)=>{l.push({x:(c*7+v)*22,w:22-1.5,h:86})});for(let c=0;c<2;c++)[0,1,3,4,5].forEach(f=>{const v=c*7+f;d.push({x:v*22+22*.64,w:22*.58,h:52})});r.intervals.forEach(c=>{const f=r.rootPc+c,v=Math.floor(f/12),m=f%12,a=n.indexOf(m),p=c===0,b=p?"#F2735F":e,y=this.showDegrees&&ni[c%12]||"";if(a>=0){const k=v*7+a;u.push({cx:k*22+(22-1.5)/2,cy:67,r:9,fill:b,label:y,lc:p?"#FBF3E6":"#2E271F"})}else{const w=(v*7+n.indexOf(m-1))*22+22*.64,T=22*.58;u.push({cx:w+T/2,cy:38,r:7.5,fill:b,label:y,lc:p?"#FBF3E6":"#2E271F"})}});const g=14*22;return h`
      <svg width="${g}" height="${86}" viewBox="0 0 ${g} ${86}" style="display:block;max-width:100%;height:auto;">
        ${l.map(c=>U`
          <rect x="${c.x}" y="0" width="${c.w}" height="${c.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${d.map(c=>U`
          <rect x="${c.x}" y="0" width="${c.w}" height="${c.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${u.map(c=>U`
          <circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="${c.fill}"></circle>
          ${c.label?U`
            <text x="${c.cx}" y="${c.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${c.lc}" font-family="'Plus Jakarta Sans',sans-serif">${c.label}</text>
          `:""}
        `)}
      </svg>
    `}renderFretSvg(t,e){const r=this.parseChord(t),l=e?ai:fn,d=e?this.ukeVoicing(t)||[null,null,null,null]:this.guitarVoicing(t)||[null,null,null,null,null,null],u=l.length,g=d.filter(w=>w!==null&&w>0),c=g.length&&Math.max(...g)>4?Math.min(...g)-1:0,f=[],v=[],m=[],a=[],p=[];for(let w=0;w<u;w++)f.push({x:w*18});for(let w=0;w<=4;w++)v.push({y:16+w*24,sw:w===0&&c===0?3:1.2});d.forEach((w,T)=>{const B=T*18;if(w===null){p.push({x:B});return}if(w===0){a.push({x:B});return}const Z=((l[T]+w-r.rootPc)%12+12)%12;m.push({cx:B,cy:16+(w-c-.5)*24,fill:Z===0?"#F2735F":"#2E271F",label:this.showDegrees?this.degOf((l[T]+w)%12,r.rootPc):""})});const b=(u-1)*18+26,y=16+4*24+12,k=(u-1)*18;return{posLabel:c>0?`${c+1}fr`:"",svg:h`
        <svg width="${b}" height="${y}" viewBox="-13 -2 ${b} ${y}" style="display:block;">
          ${v.map(w=>U`
            <rect x="0" y="${w.y}" width="${k}" height="${w.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${f.map(w=>U`
            <rect x="${w.x}" y="16" width="1.2" height="${4*24}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${a.map(w=>U`
            <circle cx="${w.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${p.map(w=>U`
            <text x="${w.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${m.map(w=>U`
            <circle cx="${w.cx}" cy="${w.cy}" r="7.5" fill="${w.fill}"></circle>
            ${w.label?U`
              <text x="${w.cx}" y="${w.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${w.label}</text>
            `:""}
          `)}
        </svg>
      `}}render(){if(!this.progression)return h``;const t=ue(this.progression.mood);this.style.setProperty("--active-mood-color",t);const e=this.order.map(s=>this.progression.chords[s]||this.progression.chords[0]),i=this.playInstrument==="Piano",o=i?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.";return h`
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
            ${e.map((s,n)=>{const r=this.parseChord(s.name),l=this.activeChordIndex===n;return h`
                <div
                  class="chord-card ${l?"lit":""}"
                  @click=${()=>this.onChordClick(n)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div class="chord-name">${s.name}</div>
                    <div class="chord-roman">${s.roman||""}</div>
                  </div>
                  ${this.renderPianoSvg(s.name,t)}
                  <div class="notes-line">${this.notesLineFor(r)}</div>
                </div>
              `})}
          </div>
        `:h`
          <div class="cards-grid fret-grid">
            ${e.map((s,n)=>{const r=this.parseChord(s.name),l=this.renderFretSvg(s.name,this.playInstrument==="Ukulele"),d=this.activeChordIndex===n;return h`
                <div
                  class="chord-card ${d?"lit":""}"
                  @click=${()=>this.onChordClick(n)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div style="display:flex;align-items:baseline;gap:8px;">
                      <div class="chord-name">${s.name}</div>
                      <div class="chord-roman">${s.roman||""}</div>
                    </div>
                    ${l.posLabel?h`<div class="pos-label">${l.posLabel}</div>`:""}
                  </div>
                  ${l.svg}
                  <div class="notes-line">${this.notesLineFor(r)}</div>
                </div>
              `})}
          </div>
        `}
      </div>
    `}};W.styles=X`
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
  `;te([I({type:Object})],W.prototype,"progression",2);te([I({type:Array})],W.prototype,"order",2);te([I({type:Boolean})],W.prototype,"isAuthenticated",2);te([I({type:String})],W.prototype,"userEmail",2);te([I({type:Number})],W.prototype,"savedCount",2);te([I({type:Boolean})],W.prototype,"embedded",2);te([x()],W.prototype,"playInstrument",2);te([x()],W.prototype,"showDegrees",2);te([x()],W.prototype,"activeChordIndex",2);W=te([Q("play-along-screen")],W);var vn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Ce=(t,e,i,o)=>{for(var s=o>1?void 0:o?bn(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&vn(e,i,s),s};let de=class extends K{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&we.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await we.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?h``:h`
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
    `}};de.styles=X`
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
  `;Ce([I({type:Boolean})],de.prototype,"open",2);Ce([x()],de.prototype,"mounted",2);Ce([x()],de.prototype,"isOAuthLoading",2);Ce([x()],de.prototype,"errorMessage",2);Ce([mi("#google-btn-container")],de.prototype,"googleBtnContainer",2);de=Ce([Q("auth-modal")],de);var xn=Object.defineProperty,yn=Object.getOwnPropertyDescriptor,M=(t,e,i,o)=>{for(var s=o>1?void 0:o?yn(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&xn(e,i,s),s};let N=class extends K{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="loop",this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.previousScreenBeforeSets="loop",this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await we.signOut(),P.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&ge.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&me.some(i=>i.name===e)&&(this.playStyle=e),C.setInstrument(this.instrument),C.setPlayStyle(this.playStyle),this.unsubscribeAuth=we.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=P.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=P.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=C.subscribeTick((i,o,s,n,r)=>{this.activeIndex=i,this.progressStep=o,typeof s=="number"&&(this.activePlayingSectionIdx=s),typeof n=="number"&&(this.totalSongSteps=n),this.playing=C.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),Bo().then(i=>{this.chordData=i,this.progression||(this.progression=mt(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(o,s)=>s),C.setProgression(this.progression,this.order),this.sections=ye.createInitialSong(this.progression,this.order),this.screen="loop")}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),C.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return P.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?(this.libraryOpen=!0,this.screen="loop"):t==="play-along"||t==="12a"?this.screen="play-along":t==="song"||t==="5a"?(this.screen="song",this.sections.length&&C.setSong(this.sections)):this.screen="loop"}setScreen(t){this.screen=t;const e=`#${t}`;window.location.hash!==e&&history.pushState(null,"",e)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{this.keyOverride=null,this.scaleOverride=null;const e=t?.detail?.promptText||this.activeSearchPrompt||void 0,i=await Is.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),C.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),C.setPlayStyle(i.playStyle));const o=i.progression;this.progression=o,this.order=Array.from({length:o.chords.length},(s,n)=>n),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,C.setProgression(o,this.order),C.reset(),this.setScreen("loop"),this.sections=ye.createInitialSong(o,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){this.length=t.detail,this.regenerate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;const t=mt(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,C.setProgression(t,this.order),this.sections=ye.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(C.startAutoplay(),C.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let s=o.notes;(!s||s.length===0)&&(s=q(o.name,_(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.showTheory=e.showTheory??this.showTheory,C.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=ye.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){P.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=P.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,P.saveProject(e),this.requestUpdate())}async onSyncProjects(){await P.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),C.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),C.setPlayStyle(t.detail)}onTogglePlay(){this.playing=C.togglePlay()}onTogglePlaySong(){C.setSong(this.sections),this.playing=C.togglePlay()}onChordTap(t){this.progression&&(this.playing&&(C.stopAutoplay(),this.playing=!1),C.clearABOverride(),this.swapIndex=t.detail,this.sheetMode="swap",this.alternatives=os(this.chordData,this.progression,t.detail),this.theoryGroups=Nt(this.chordData,this.progression,t.detail),this.borrowedChords=Mi(this.chordData,this.progression,t.detail),this.sheetOpen=!0,C.playChordAtIndex(t.detail,.8))}onAuditionChord(t){C.auditionChord(t.detail,.8)}onSelectAlternative(t){if(!this.progression||this.swapIndex===null)return;const e=t.detail,o=[...this.progression.chords];o[this.swapIndex]=e.chord,this.progression={...this.progression,chords:o},C.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.showToast(`Swapped in ${e.chord.name}`)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null,C.clearABOverride()}onProgressionChange(t){this.progression=t.detail,C.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=ye.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=ye.addSection(this.sections,this.progression);this.sections=t.sections,this.activeSectionIdx=t.activeIndex,this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.order=e.order.slice(),C.setOrder(this.order)),this.requestUpdate()}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(P.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=P.getProjects().find(n=>n.id===e),o=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s={id:e,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};P.saveProject(s),t&&P.scheduleCloudSync(),this.showToast(`Saved "${o}"`,e),this.requestUpdate()}render(){return this.currentProjectId&&P.isProjectSaved(this.currentProjectId),h`
      <div class="app-header-container">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${P.getProjects().length}
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
    `}};N.styles=X`
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
  `;M([x()],N.prototype,"chordData",2);M([x()],N.prototype,"screen",2);M([x()],N.prototype,"libraryOpen",2);M([x()],N.prototype,"genre",2);M([x()],N.prototype,"mood",2);M([x()],N.prototype,"progression",2);M([x()],N.prototype,"activeIndex",2);M([x()],N.prototype,"progressStep",2);M([x()],N.prototype,"order",2);M([x()],N.prototype,"keyOverride",2);M([x()],N.prototype,"scaleOverride",2);M([x()],N.prototype,"playing",2);M([x()],N.prototype,"showTheory",2);M([x()],N.prototype,"instrument",2);M([x()],N.prototype,"playStyle",2);M([x()],N.prototype,"sheetOpen",2);M([x()],N.prototype,"sheetMode",2);M([x()],N.prototype,"swapIndex",2);M([x()],N.prototype,"alternatives",2);M([x()],N.prototype,"theoryGroups",2);M([x()],N.prototype,"borrowedChords",2);M([x()],N.prototype,"length",2);M([x()],N.prototype,"sections",2);M([x()],N.prototype,"activeSectionIdx",2);M([x()],N.prototype,"activePlayingSectionIdx",2);M([x()],N.prototype,"totalSongSteps",2);M([x()],N.prototype,"pendingChordSuggestion",2);M([x()],N.prototype,"userEmail",2);M([x()],N.prototype,"isAuthenticated",2);M([x()],N.prototype,"syncStatus",2);M([x()],N.prototype,"authModalOpen",2);M([x()],N.prototype,"toastMessage",2);M([x()],N.prototype,"toastUndoId",2);M([x()],N.prototype,"isGenerating",2);N=M([Q("chroma-chords-app")],N);
