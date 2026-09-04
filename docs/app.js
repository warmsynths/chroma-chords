import{f as Ei,u as Mi,s as Ue,n as ze,S as J,l as Oi,P as j,F as Se,M as si,C as oi,R as ri,a as ni,b as Di,i as X,c as K,d as h,A as ai,O as Bi,w as R}from"./assets/vendor-7vM_bUxM.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pi={attribute:!0,type:String,converter:Mi,reflect:!1,hasChanged:Ei},Fi=(t=Pi,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),o==="accessor"){const{name:a}=i;return{set(d){const c=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,c,t,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,t,d),d}}}if(o==="setter"){const{name:a}=i;return function(d){const c=this[a];e.call(this,d),this.requestUpdate(a,c,t,!0,d)}}throw Error("Unsupported decorator location: "+o)};function S(t){return(e,i)=>typeof i=="object"?Fi(t,e,i):((o,s,r)=>{const a=s.hasOwnProperty(r);return s.constructor.createProperty(r,o),a?Object.getOwnPropertyDescriptor(s,r):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(t){return S({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Li=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function li(t,e){return(i,o,s)=>{const r=a=>a.renderRoot?.querySelector(t)??null;return Li(i,o,{get(){return r(this)}})}}const he="chroma_chords_projects",Ri="chord_voyager_projects";class pe{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(he);if(e||(e=localStorage.getItem(Ri),e&&localStorage.setItem(he,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(he,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(he,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const r=o.get(s.id);!r||s.lastModified>r.lastModified?o.set(s.id,s):s.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem(he,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{localStorage.setItem(he,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((i,o)=>{const s=new FileReader;s.onload=r=>{try{const a=r.target?.result,d=JSON.parse(a);d&&typeof d=="object"&&Array.isArray(d.chords)?(d.id=Math.random().toString(36).substr(2,9),d.lastModified=Date.now(),i(d)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(e)})}}const Me="chroma_chords_auth_token",qe="chroma_chords_auth_user",Ui="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Ye(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function zi(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Ui}}class _i{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:zi(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Me);if(e){const i=Ye(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Me),localStorage.removeItem(qe),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Ye(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Ye(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Me,e),localStorage.setItem(qe,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const r=this.handleCredentialResponse(s.credential);i?.({success:r.success,message:r.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Me),localStorage.removeItem(qe)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const me=new _i;class ji{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const r=new AbortController,a=setTimeout(()=>r.abort(),8e3),d=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:r.signal});if(clearTimeout(a),d.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await d.json().catch(()=>({}))).timestamp};if(d.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const c=await d.text().catch(()=>"");return{ok:!1,status:d.status,message:`Connection error (${d.status}): ${c||d.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const r={"Content-Type":"application/json"};this.applyAuthHeaders(r,i);const a=new AbortController,d=setTimeout(()=>a.abort(),15e3),c=await fetch(`${s}/api/sync`,{method:"POST",headers:r,body:JSON.stringify(o),signal:a.signal});if(clearTimeout(d),!c.ok){let u="";try{const g=await c.json();u=g.error||g.message||""}catch{u=await c.text().catch(()=>"")}throw new Error(`Cloud sync failed (${c.status}): ${u||c.statusText||"Unknown error"}`)}return await c.json()}}const Gi=new ji,At="chroma_chords_deleted_projects",Et="chroma_chords_last_sync_time",Vi="https://chroma-chords-api.warmsynths.workers.dev";function qi(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Vi}}function Mt(t){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(t):null}function Ot(t,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(t,e)}class Yi{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=me.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return pe.getProjects()}isProjectSaved(e){return e?pe.getProjects().some(i=>i.id===e):!1}saveProject(e){pe.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){pe.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Mt(At);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Ot(At,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(r=>r.id===e),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:e,deletedAt:s}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return Mt(Et)}setLastSyncTime(e){Ot(Et,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await me.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||qi();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=pe.getProjects(),r=this.getTombstones(),a=this.getLastSyncTime(),d=s.map(p=>({...p,deletedAt:null})),c=await Gi.sync(o,i,{sets:d,lastSyncTime:a,tombstones:r}),u=new Map;s.forEach(p=>{u.set(p.id,{...p,syncedToCloud:!0})});const g=c.tombstones||[],l=new Set(g.map(p=>p.id));(c.sets||[]).forEach(p=>{if(p.deletedAt)l.add(p.id);else{const f=u.get(p.id),x=p.lastModified||(p.updatedAt?new Date(p.updatedAt).getTime():0),k=f?.lastModified||0;(!f||x>=k)&&u.set(p.id,{id:p.id,name:p.name,lastModified:x,genre:p.genre,mood:p.mood,key:p.key,scaleType:p.scaleType,bpm:p.bpm,showTheory:p.showTheory,chords:Array.isArray(p.chords)?p.chords:[],syncedToCloud:!0})}}),l.forEach(p=>{u.delete(p)});const m=Array.from(u.values());pe.setProjects(m);const v=this.getTombstones(),y=new Set(r.map(p=>p.id)),n=v.filter(p=>!y.has(p.id));this.setTombstones(n),(c.lastSyncTime||c.syncedAt)&&this.setLastSyncTime(c.lastSyncTime||c.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const P=new Yi;let He=null,We=null,Je=null,Dt=null,Xe=null,Ke=null,Qe=null,Ze=null,et=null,tt=null,it=null;function xt(){return He||(He=new ni({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),He}function Hi(){return We||(We=new Di({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:t=>{console.warn("Failed to load Rhodes piano sampler:",t)}}).connect(xt())),We}function ci(t){const e=xt();switch(t){case"organ":return Je||(Je=new j(J,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(e)),Je;case"pad-strings":return Xe||(Dt=new ri({decay:4.5,wet:.35}).connect(e),Xe=new j(J,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Dt)),Xe;case"juno-pad":if(!Qe){Ke=new oi({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(e);try{Ke.start()}catch{}Qe=new j(J,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Ke)}return Qe;case"stab":return Ze||(Ze=new j(si,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(e)),Ze;case"epiano":return et||(et=new j(Se,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(e)),et;case"guitar":return tt||(tt=new j(J,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(e)),tt;case"bell":return it||(it=new j(Se,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(e)),it;case"rhodes":default:return Hi()}}const ve=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],Ae=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],wt={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},kt={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Wi={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Ji(t){const e=wt[t]??"rhodes";return Wi[e]??"Piano"}function Xi(t){return(kt[t]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function St(){return Promise.race([Oi(),new Promise(t=>setTimeout(t,80))])}function di(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function hi(t,e){const i=[];for(let o=0;o<e;o++)for(const s of t){const r=s.match(/^([A-G]#?)(-?\d+)$/);if(r){const a=r[1],d=parseInt(r[2],10)+o;i.push(`${a}${d}`)}else i.push(s)}return i}function pi(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Bt={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function Ki(t){if(!t)return;const e=t.toLowerCase().trim();return Bt[e]?Bt[e]:ve.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function Qi(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Ae.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function Zi(t,e=.7,i,o="rhodes",s){try{Promise.all([Ue(),St()]).then(()=>{const r=ci(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof r.set=="function"&&r.set(s)}catch(u){console.warn("Failed to apply customConfig to Tone.js instrument:",u)}const a=t.length,d=a<=1?1:Math.max(.4,1/Math.sqrt(a)),c=ze();if(i&&i.arpMode&&i.arpMode!=="off"){const u=i.bpm??80,g=i.arpRate??"1/16",l=i.arpRange??1,m=i.arpMode,v=di(g,u),y=hi(t,l),n=pi(y,m),p=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*d:d,f=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,v*.9);n.forEach((x,k)=>{const w=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;r.triggerAttackRelease(x,f,c+k*v+w,p())});return}t.forEach((u,g)=>{let l=0,m=d,v=e;if(i){const{minVelocity:y,maxVelocity:n,spread:p,microTiming:f,humanVariance:x,duration:k}=i;m=(y+Math.random()*(n-y))/127*d;const C=g*p*.1,N=(Math.random()-.5)*f*.05,W=(Math.random()-.5)*x*.03;l=Math.max(0,C+N+W),v=k*(1+(Math.random()-.5)*.2*x)}r.triggerAttackRelease(u,v,c+l,m)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function Pt(t,e,i){const o=e==="Unknown"||!e?"Pop":e,s=i?.instrument?ve.find(m=>m.name===i.instrument):void 0,r=i?.playStyle?Ae.find(m=>m.name===i.playStyle):void 0,a=s?.instrument??wt[o]??"rhodes",d=kt[o]||{},c=r?.patch??{},u={...d,...c,bpm:i?.bpm??d.bpm??90},g=i?.duration??d.duration??.9,l=c.durationMultiplier?g*c.durationMultiplier:g;Zi(t,l,u,a,i?.customConfig)}let st=null,ge=[],ae=null;function es(){if(!st){const t=xt();st=new J({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return st}function ts(t,e=.8,i,o=.85){try{Promise.all([Ue(),St()]).then(()=>{const s=es(),a=`${t.replace(/\d+$/,"")}1`,d=typeof i=="number"?i:ze();s.triggerAttackRelease(a,e,d,o)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function is(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,s=(Array.isArray(t)?t:[]).filter(u=>typeof u=="string"&&u.trim().length>0).map(u=>u.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let r=o,a=i[s[0]]??0;const d=[];s.forEach((u,g)=>{const l=i[u]??0;g>0&&l<=a&&r++,d.push({name:u,oct:r}),a=l});const c=(e||"").toLowerCase();if(c.includes("octave")||c.includes("high"))return d.map(u=>`${u.name}${u.oct+1}`);if(c.includes("inversion")||c.includes("1st")){if(d.length>1){const[u,...g]=d;return[...g.map(l=>`${l.name}${l.oct}`),`${u.name}${u.oct+1}`]}return d.map(u=>`${u.name}${u.oct}`)}else return d.map(u=>`${u.name}${u.oct}`)}function ss(t,e="root position",i=96,o="rhodes"){try{Promise.all([Ue(),St()]).then(()=>{const s=ci(o);if(ae&&ge.length>0)try{ae.triggerRelease(ge)}catch{}const r=is(t,e),a=Math.min(1,Math.max(.1,i/127));typeof s?.triggerAttack=="function"&&s.triggerAttack(r,ze(),a),ge=r,ae=s}).catch(s=>console.warn("Start chord notes failed:",s))}catch(s){console.warn("Start chord notes failed:",s)}}function os(){try{ae&&ge.length>0&&(typeof ae?.triggerRelease=="function"&&ae.triggerRelease(ge),ge=[],ae=null)}catch(t){console.warn("Stop chord notes failed:",t)}}let ot=null;function rs(){return ot||(ot=new J({oscillator:{type:"sine"},envelope:{attack:.001,decay:.04,sustain:0,release:.02},volume:-4}).toDestination()),ot}function rt(t=!1){try{Ue().then(()=>{const e=rs(),i=t?1200:800;typeof e?.triggerAttackRelease=="function"&&e.triggerAttackRelease(i,.035,ze(),t?.95:.7)}).catch(()=>{})}catch{}}const ns=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],as=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],Z={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},ls=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Te=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],_e={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14]},cs=Object.keys(_e),ds={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Ft={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},hs={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},ht={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function B(t,e){const i=(t%12+12)%12;return e?as[i]:ns[i]}function It(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",s=e;if(i&&/[A-G]/.test(i)){const a=e[1];a==="b"||a==="B"||a==="♭"||a==="♭"?(o=`${i}b`,s=e.slice(2)):a==="#"||a==="♯"||a==="♯"?(o=`${i}#`,s=e.slice(2)):(o=i,s=e.slice(1))}s=s.toLowerCase();let r="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?r="maj9":s.includes("min9")||s.includes("m9")?r="min9":s.includes("9")||s.includes("dom9")?r="dom9":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?r="maj7":s.includes("min7")||s.includes("m7")?r="min7":s.includes("dim7")?r="dim7":s.includes("dim")||s.includes("°")?r="dim":s.includes("aug")||s.includes("+")?r="aug":s.includes("sus2")?r="sus2":s.includes("sus4")||s.includes("sus")?r="sus4":s.includes("7")?r="dom7":s.includes("min")||s==="m"?r="min":r="maj",{root:o,quality:r}}const ps=Object.keys(ht),Lt={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Ie=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],us={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},gs={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},$t={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},fe=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function ce(t){return(fe.find(e=>e.name===t)||fe[0]).dot}const ms={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function fs(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function Pe(t,e){const i=t.reduce((s,r)=>s+e(r),0);let o=Math.random()*i;for(const s of t)if(o-=e(s),o<=0)return s;return t[t.length-1]}function bs(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const pt=4,be=1,ie=8,$e=1700,vs={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function ys(t,e="MAJOR",i="Pop",o="Uplifting"){let r={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(r*=1.4),t==="SUBTONIC"&&(r*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(r*=1.8),t==="SUBDOMINANT"&&(r*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(r*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(r*=2),t==="SUBMEDIANT"&&(r*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(r*=2.5),t==="SUBDOMINANT"&&(r*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(r*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(r*=2.2),t==="SUBDOMINANT"&&(r*=1.8),t==="SUBMEDIANT"&&(r*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(r*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(r*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(r*=2.2),t==="SUPERTONIC"&&(r*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(r*=2),t==="SUBMEDIANT"&&(r*=1.6),t==="MEDIANT"&&(r*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(r*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(r*=1.8),($t[o]||[]).includes(t)&&(r*=1.3),Math.max(.01,r)}function nt(t,e,i="MAJOR",o="Pop",s="Uplifting"){if(t===e)return .05;let a=(vs[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(a*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(a*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(a*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(a*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(a*=1.8),t==="DOMINANT"&&e==="TONIC"&&(a*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(a*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(a*=1.5),($t[s]||[]).includes(e)&&(a*=1.5),Math.max(.01,a)}function xs(t,e,i,o,s,r,a=pt){let d=i.filter(l=>t.degrees[l]);d.length||(d=i);const c=Pe(d,l=>ys(l,t.type,s,r))||"TONIC",u=[c];let g=c;for(let l=1;l<a;l++){const m=l===a-1;let v=i.filter(p=>t.degrees[p]);v.length||(v=i);const y=v.filter(p=>p!==g),n=y.length?y:v;if(m){const p=Pe(n,f=>{const x=nt(f,u[0],t.type,s,r),k=nt(g,f,t.type,s,r);return x*k});u.push(p)}else{const p=n.filter(k=>!u.includes(k)),f=p.length?p:n,x=Pe(f,k=>nt(g,k,t.type,s,r));g=x,u.push(x)}}return u}function Y(t,e){const{root:i,quality:o}=It(t),s=Z[i]??0;return _e[o].map(a=>B(s+a,e))}async function ws(){const t=typeof import.meta<"u"?"./":"/",e=t.endsWith("/")?t:`${t}/`,i=`${e}chroma_chords_data.json`,o=`${e}chord_voyager_data.json`;let s=await fetch(i).catch(()=>null);if((!s||!s.ok)&&(s=await fetch(o).catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chroma_chords_data.json").catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chord_voyager_data.json").catch(()=>null)),!s||!s.ok){const a=new URL("./chroma_chords_data.json",import.meta.url).href;s=await fetch(a)}if(!s.ok)throw new Error(`HTTP error: ${s.status}`);const r=await s.json();return Ns(r),r}const ks={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Ss={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Is={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},$s={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Ts={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Cs={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Ns(t){const e=[["MIXOLYDIAN",ks],["DORIAN",Ss],["LYDIAN",Is]];for(const[i,o]of e)for(const[s,r]of Object.entries(o)){const a=t.scales[`${r}_MAJOR`];if(!a)continue;const d=`${s}_${i}`,c={};for(const u of Cs[i]){const g=Ts[`${i}_${u}`],l=a.degrees[g];if(!l)continue;const m=JSON.parse(JSON.stringify(l));m.next_chord_options=(m.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${r}_MAJOR_`)){const y=v.nodeId.replace(`${r}_MAJOR_`,""),n=$s[`${i}_${y}`];if(n)return{name:v.name,nodeId:`${s}_${i}_${n}`}}return v}),c[u]=m}t.scales[d]={root:s,type:i,degrees:c}}}const As=[156,192,236],Es=[242,115,95];function Fe(t,e,i){return t+(e-t)*i}function je(t){const e=Math.max(0,Math.min(1,t));return"#"+As.map((o,s)=>Math.round(Fe(o,Es[s],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function q(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(Fe(84,128,e)),radius:Math.round(Fe(40,12,e)),fontSize:Math.round(Fe(21,30,e)),color:je(e)}}function Ms(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function ui(t,e,i,o){const r=i.degrees[e].chord_name,a=hs[e]??.5,d=ht[i.type]||ht.MAJOR;return{name:Rt(r),tag:ds[e]||"move",roman:d[e]||"?",color:je(a),functionLabel:Ft[e]||e,notes:Y(r,o),scaleLabel:`${i.root} ${Lt[i.type]||i.type}`,desc:Ms(Ft[e]||e,Lt[i.type]||i.type,Rt(r)),degree:e,scaleKey:t,tension:a}}function Rt(t){const{root:e,quality:i}=It(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const Os={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function gi(t,e){let i=Os[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function ut(t,e,i,o){const s=Math.max(be,Math.min(ie,o?.length??pt)),r=us[e]||"MAJOR",a=gs[i],d=o?.scaleType||(a&&r==="MAJOR"?a:r);let c=o?.key&&Te.includes(o.key)?o.key:bs(Te),u=`${c}_${d}`;t.scales[u]||(c="C",u=`${c}_${d}`);let g=t.scales[u];if(!g){const k=Object.keys(t.scales).find(w=>w.endsWith(`_${d}`))||Object.keys(t.scales)[0];g=t.scales[k],c=g?g.root:"C",u=k}const l=G(c,d),m=Object.keys(g.degrees),v=$t[i]||[],y=ms[d]||[],n=s===pt?y.filter(k=>k.degrees.every(w=>m.includes(w))):[],x=(n.length&&Math.random()<.25?Pe(n,k=>fs(k,v)).degrees:xs(g,u,m,v,e,i,s)).map(k=>ui(u,k,g,l));return{genre:e,mood:i,key:c,scaleType:d,bpm:gi(e,i),chords:x}}function Ds(t,e,i,o,s,r){const a=`${e}_${i}`,d=t.scales[a];if(!d||!o.length)return null;const c=G(e,i),u=Z[e]??0,g={};Object.entries(d.degrees).forEach(([m,v])=>{const{root:y}=It(v.chord_name),n=Z[y]??0;n in g||(g[n]=m)});const l=o.slice(0,ie).map(({root:m,quality:v})=>{const y=Z[m]??u,n=g[y];if(n)return ui(a,n,d,c);const p=(y-u+12)%12,f=_e[v]?v:"maj";return Ps(e,p,f,"Borrowed","?","drift",c)});return l.length<be?null:{genre:s,mood:r,key:e,scaleType:i,bpm:gi(s,r),chords:l}}const Bs={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Ps(t,e,i,o,s,r,a){const d=(Z[t]??0)+e,u=`${B(d,a)}${Bs[i]}`,g=_e[i].map(m=>B(d+m,a)),l=.3;return{name:u,tag:r,roman:s,color:je(l),functionLabel:o,notes:g,scaleLabel:"Borrowed",desc:`${u} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:l}}const Ut={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Fs(t,e,i,o){const s=Z[t]??0;let r=Ut[e]||Ut.Major;return i==="6th"?r=[...r,9]:i==="7th (dom / m7)"?r=[...r,10]:i==="Major 7th (M7)"?r=[...r,11]:i==="9th"&&(r=[...r,10,14]),r.map(a=>B(s+a,o))}const Ls={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Rs={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Us(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Ls[e]??""}${Rs[i]??""}`}const zs={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},mi={};Te.forEach(t=>{mi[Z[t]]=t});function _s(t,e){const i=zs[e]??0,s=(((Z[t]??0)-i)%12+12)%12;return mi[s]??"C"}function G(t,e){const i=_s(t,e);return ls.has(i)||i.includes("b")}function L(t,e,i,o,s,r,a,d){const c=Us(t,e,i),u=Fs(t,e,i,d);return{name:c,tag:o||"sub",roman:o,color:je(a),functionLabel:s,notes:u,scaleLabel:"Substitution",desc:r,degree:"SUBSTITUTION",scaleKey:"",tension:a}}function Tt(t,e,i){const o=Z[e.key]??0,s=e.scaleType.includes("MINOR"),r=G(e.key,e.scaleType),a=s?[(()=>{const g=B(o+1,!0),l=L(g,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:l.name,roman:"♭II",notes:l.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:l,tension:.6}})(),(()=>{const g=B(o+5,!0),l=L(g,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — deeper minor mood",chord:l,tension:.45}})(),(()=>{const g=B(o+10,!0),l=L(g,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:l.name,roman:"v",notes:l.notes,sub:"a step further into shadow — unresolving drift",chord:l,tension:.52}})()]:[(()=>{const g=B(o+8,!0),l=L(g,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:l.name,roman:"♭VI",notes:l.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:l,tension:.5}})(),(()=>{const g=B(o+5,!0),l=L(g,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — softer, sadder",chord:l,tension:.42}})(),(()=>{const g=B(o+3,!0),l=L(g,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:l.name,roman:"♭III",notes:l.notes,sub:"a step further out — cooler, more remote",chord:l,tension:.58}})()],d=[(()=>{const g=B(o+7,r),l=B(o+2,r),m=L(l,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${g}7 — sharpens the approach`,.82,r);return{name:m.name,roman:"V7/V",notes:m.notes,sub:`aimed at ${g}7 — sharpens the approach`,chord:m,tension:.82}})(),(()=>{const g=B(o+(s?3:9),r),l=B(o+4,r),m=L(l,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${g}m7 — makes it feel arrived at`,.88,r);return{name:m.name,roman:"V7/vi",notes:m.notes,sub:`aimed at ${g}m7 — makes it feel arrived at`,chord:m,tension:.88}})(),(()=>{const g=B(o+1,!0),l=L(g,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:l.name,roman:"subV7",notes:l.notes,sub:"a tritone substitute — slides in sideways",chord:l,tension:.95}})()],c=[(()=>{const g=B(o+5,r),l=L(g,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,r);return{name:l.name,roman:"IV",notes:l.notes,sub:"floats rather than resolving",chord:l,tension:.3}})(),(()=>{const g=B(o,r),l=L(g,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,r);return{name:l.name,roman:s?"im9":"Imaj9",notes:l.notes,sub:"the same home with more air in it",chord:l,tension:.18}})(),(()=>{const g=B(o+(s?3:4),r),l=L(g,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,r);return{name:l.name,roman:s?"♭III":"iii",notes:l.notes,sub:"wistful, halfway between home and away",chord:l,tension:.35}})()],u=[(()=>{const g=B(o,r),l=L(g,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,r);return{name:l.name,roman:s?"i":"I",notes:l.notes,sub:"full resolution — the sense of arriving",chord:l,tension:.05}})(),(()=>{const g=B(o+7,r),l=L(g,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,r);return{name:l.name,roman:"V7",notes:l.notes,sub:"the pull that makes home feel earned",chord:l,tension:1}})(),(()=>{const g=B(o+(s?8:9),r),l=L(g,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,r);return{name:l.name,roman:s?"♭VI":"vi",notes:l.notes,sub:"a soft landing instead of a full stop",chord:l,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:a},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:d},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:c},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:u}]}function fi(t,e,i){const o=Z[e.key]??0,s=e.scaleType.includes("MINOR"),r=G(e.key,e.scaleType),a=e.chords;if(s){const n=a[0]?.name||"chord 1",p=a[1]?.name||"chord 2",f=a[2]?.name||"chord 3",x=a[3]?.name||"chord 4",k=L(B(o,r),"Major","None","I","Major tonic","same root, turned bright",.2,r),w=L(B(o+5,r),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,r),C=L(B(o+9,r),"Minor","None","vi","Submediant","melodic lift upward",.4,r),N=L(B(o+11,r),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,r);return[{name:k.name,sub:`in place of ${n} · same root, turned bright`,roman:"I",notes:k.notes,chord:k,tension:.2},{name:w.name,sub:`in place of ${p} · the Dorian lift, sunny and open`,roman:"IV",notes:w.notes,chord:w,tension:.35},{name:C.name,sub:`in place of ${f} · melodic lift upward`,roman:"vi",notes:C.notes,chord:C,tension:.4},{name:N.name,sub:`in place of ${x} · classical harmonic pull`,roman:"vii°",notes:N.notes,chord:N,tension:.55}]}const d=a[0]?.name||"chord 1",c=a[1]?.name||"chord 2",u=a[2]?.name||"chord 3",g=a[3]?.name||"chord 4",l=L(B(o,r),"Minor","None","i","Tonic minor","same root, turned sad",.3,r),m=L(B(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),v=L(B(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),y=L(B(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:l.name,sub:`in place of ${d} · same root, turned sad`,roman:"i",notes:l.notes,chord:l,tension:.3},{name:m.name,sub:`in place of ${c} · the lift, but heavier`,roman:"iv",notes:m.notes,chord:m,tension:.4},{name:v.name,sub:`in place of ${u} · big and cinematic`,roman:"♭VI",notes:v.notes,chord:v,tension:.45},{name:y.name,sub:`in place of ${g} · lands sideways, not home`,roman:"♭VII",notes:y.notes,chord:y,tension:.5}]}function js(t,e,i){return Tt(t,e).map(s=>{const r=s.rows[0];return{label:s.name,sub:s.sub,chord:r.chord,functionCaption:`${r.roman} · ${r.notes.join(" · ")}`,rationale:r.sub}})}function zt(t,e=4){const i=Array.isArray(t)?t.filter(l=>typeof l=="string"&&l.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(l=>l.replace(/\d+$/,"")),r=s[0],a=o[r]??0;let d=e,c=a;const u=[];return s.forEach((l,m)=>{const v=o[l]??0;m>0&&v<=c&&d++,u.push(`${l}${d}`),c=v}),[`${r}${e-1}`,...u]}class Gs{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?this.order=i||Array.from({length:e.chords.length},(o,s)=>s):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(e<i+s){this.activeSectionIndex=o;const r=e-i;this.activeIndex=this.sections[o].order[r]??0,this.progressStep=r;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const e=this.getTotalSteps();if(e<=0)return;this.songStep=(this.songStep+1)%e,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},$e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:Y(o.name,G(e.progression.key,e.progression.scaleType)),r=zt(s,4);Pt(r,e.progression.genre,{bpm:e.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",r=this.progression.key||"C",a=this.progression.scaleType||"MAJOR";o=Y(s,G(r,a))}this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&ts(o[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",r=this.progression?.key||"C",a=this.progression?.scaleType||"MAJOR";o=Y(s,G(r,a))}this.playChordNotes(o,i)}playChordAtIndex(e,i=.8){if(!this.progression||!this.progression.chords[e])return;const o=this.progression.chords[e];let s=Array.isArray(o.notes)?o.notes:[];if(s.length===0||!s.every(r=>typeof r=="string"&&r.trim().length>0)){const r=o.name||"CMAJ",a=this.progression.key||"C",d=this.progression.scaleType||"MAJOR";s=Y(r,G(a,d))}this.playChordNotes(s,i)}playChordNotes(e,i){if(!this.progression)return;const o=Array.isArray(e)?e.filter(r=>typeof r=="string"&&r.trim().length>0):[];if(o.length===0)return;const s=zt(o,4);Pt(s,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const T=new Gs;function _t(t,e,i=4){const o=e==="1/16"?16:e==="1/8"?8:e==="Bar"?i:0;return o?t.map(s=>({...s,pos:Math.min(.99,Math.round(s.pos*o)/o)})):t}const Vs=fe.map(t=>t.name),qs=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Ys(t,e){const i=t.length+1,o=e.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let r=0;r<i;r++)s[r][0]=r;for(let r=0;r<o;r++)s[0][r]=r;for(let r=1;r<i;r++)for(let a=1;a<o;a++)s[r][a]=t[r-1]===e[a-1]?s[r-1][a-1]:1+Math.min(s[r-1][a-1],s[r-1][a],s[r][a-1]);return s[i-1][o-1]}function le(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),s=e.find(c=>c.toLowerCase()===o);if(s)return s;let r=null,a=1/0;for(const c of e){const u=Ys(o,c.toLowerCase());u<a&&(a=u,r=c)}const d=Math.max(2,Math.floor(o.length*.4));return a<=d?r:null}function Hs(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,s=le(o.root,Te),r=le(o.quality,cs);s&&r&&e.push({root:s,quality:r})}if(e.length)return e.slice(0,ie)}function Ws(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=le(e.presetId,qs)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function at(t,e){const i=t&&typeof t=="object"?t:{},o=le(i.genre,Ie)??e.genre,s=le(i.mood,Vs)??e.mood,r=le(i.key,Te)??void 0,a=le(i.scaleType,ps)??void 0,d=r&&a?Hs(i.chords):void 0;let c;typeof i.length=="number"&&Number.isFinite(i.length)&&(c=Math.max(be,Math.min(ie,Math.round(i.length))));const u=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,g=Ws(i.instrumentConfig),l=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:r,scaleType:a,length:c,chords:d,rhythmStyle:u,instrumentConfig:g,_rateLimit:l}}const Js=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],gt=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],bi="chroma-chords-llm-provider",vi="chroma-chords-llm-model";function yi(){const t=localStorage.getItem(bi);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Xs(t){localStorage.setItem(bi,t)}function xi(){const t=localStorage.getItem(vi);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:gt[0].id}function lt(t){localStorage.setItem(vi,t)}const ct={genre:Ie[0],mood:fe[0].name},wi="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Ks=12e3;async function Qs(){try{const t=await fetch(wi);if(t.ok)return await t.json()}catch{}return null}const ki={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Si={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Le(t,e){const i=t.toLowerCase();let o=null,s=0;return Object.keys(e).forEach(r=>{const a=e[r].reduce((d,c)=>d+(i.includes(c)?1:0),0);a>s&&(s=a,o=r)}),o}function Ii(t){const e=Le(t,Si),i=Le(t,ki);return!e||!i?null:{genre:e,mood:i}}async function Zs(t){const e=new AbortController,i=setTimeout(()=>e.abort(),Ks);try{const s=await fetch(wi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:yi(),model:xi()}),signal:e.signal}),r=await s.json().catch(()=>null);if(!s.ok||r&&typeof r=="object"&&"error"in r){const a=r&&typeof r=="object"&&"error"in r?String(r.error):`HTTP ${s.status}`,d=new Error(`Classifier request failed: ${a}`);throw r&&typeof r=="object"&&"_rateLimit"in r&&(d._rateLimit=r._rateLimit),d}return r}finally{clearTimeout(i)}}async function eo(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),r=Le(s,Si)??"Synthwave",a=Le(s,ki)??"Dreamy",d={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},c={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},u={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},g=u[r]||u._default,l=d[r]||"rhodes",m=c[r]||"slow_arpeggio",v={genre:r,mood:a,key:g.key,scaleType:g.scaleType,length:8,chords:g.chords,rhythmStyle:m,instrumentConfig:{presetId:l,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return at(v,{genre:r,mood:a})}const o=Ii(t);try{const s=await Zs(t);return at(s,o??ct)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const r=at(o??ct,ct);return s&&typeof s=="object"&&"_rateLimit"in s&&(r._rateLimit=s._rateLimit),r}}class to{static async resolvePrompt(e,i,o,s,r,a){let d=a||null,c=null,u=null;if(!d&&r&&r.trim().length>0)try{d=await eo(r)}catch(m){console.warn("Failed to classify prompt via LLM/local fallback:",m)}const g=!!(d&&d.chords?.length&&d.key&&d.scaleType);let l=null;return g&&d&&d.chords&&d.key&&d.scaleType&&(l=Ds(e,d.key,d.scaleType,d.chords,d.genre||i,d.mood||o)),l||(l=ut(e,i,o,{length:s})),g&&d&&(d.instrumentConfig?.presetId&&(c=Ki(d.instrumentConfig.presetId)??null),d.rhythmStyle&&(u=Qi(d.rhythmStyle)??null)),l.chords.length>s&&(l={...l,chords:l.chords.slice(0,s)}),r&&(l={...l,searchTerm:r}),{progression:l,instrument:c,playStyle:u,normalizedSuggestion:d}}}const Oe=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)}];class ne{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(s,r)=>r);return[{name:Oe[0].name,desc:Oe[0].desc,progression:e,order:o.slice()}]}static addSection(e,i){if(e.length>=Oe.length)return{sections:e,activeIndex:e.length-1};const o=Oe[e.length],s=o.reorder(i.chords.length),r={name:o.name,desc:o.desc,progression:i,order:s},a=[...e,r];return{sections:a,activeIndex:a.length-1}}static syncActiveSection(e,i,o,s){if(!e[i])return e;const r=[...e];return r[i]={...r[i],progression:o,order:s.slice()},r}}const z=4,te=45e3,jt="chroma_chords_capacity_v2";class io{constructor(){this.charges=z,this.rechargeNextSec=45,this.lastCapacityTime=Date.now(),this.timer=null,this.subscribers=new Set,this.init()}init(){try{if(typeof localStorage<"u"){const e=localStorage.getItem(jt),i=Date.now();if(e){const o=JSON.parse(e),s=typeof o.charges=="number"?o.charges:z,r=typeof o.lastTime=="number"?o.lastTime:i;if(s<z){const a=Math.max(0,i-r),d=Math.floor(a/te);this.charges=Math.min(z,s+d);const c=a%te;this.rechargeNextSec=Math.max(1,Math.ceil((te-c)/1e3)),this.lastCapacityTime=i-c}else this.charges=z,this.rechargeNextSec=45,this.lastCapacityTime=i}else this.charges=z,this.rechargeNextSec=45,this.lastCapacityTime=i}}catch{this.charges=z,this.rechargeNextSec=45}this.save(),this.startTimer()}save(){try{typeof localStorage<"u"&&localStorage.setItem(jt,JSON.stringify({charges:this.charges,lastTime:this.lastCapacityTime}))}catch{}}startTimer(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(this.charges<z){const e=Date.now(),i=Math.max(0,e-this.lastCapacityTime);if(i>=te){const s=Math.floor(i/te);this.charges=Math.min(z,this.charges+s),this.lastCapacityTime=e-i%te,this.save()}const o=(e-this.lastCapacityTime)%te;this.rechargeNextSec=Math.max(1,Math.ceil((te-o)/1e3))}else this.rechargeNextSec=45;this.notify()},1e3)}getState(){return{charges:this.charges,max:z,rechargeNextSec:this.rechargeNextSec}}getCharges(){return this.charges}getRechargeNextSec(){return this.rechargeNextSec}getCapacityMax(){return z}spendCharge(){return this.charges<=0?(this.notify(),!1):(this.charges===z&&(this.lastCapacityTime=Date.now()),this.charges-=1,this.save(),this.notify(),!0)}subscribe(e){return this.subscribers.add(e),e(this.getState()),()=>{this.subscribers.delete(e)}}notify(){const e=this.getState();this.subscribers.forEach(i=>{try{i(e)}catch(o){console.error("Error in CapacityService subscriber callback:",o)}})}}const mt=new io;var so=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,V=(t,e,i,o)=>{for(var s=o>1?void 0:o?oo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&so(e,i,s),s};let _=class extends K{constructor(){super(...arguments),this.compact=!1,this.hideCapacity=!1,this.isAdmin=!1,this.capacityCharges=4,this.capacityMax=4,this.rechargeNextSec=60,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeCapacity=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=P.subscribeProjects(()=>{this.savedCount=P.getProjects().length,this.syncStatus=P.getSyncStatus(),this.requestUpdate()}),this.unsubscribeCapacity=mt.subscribe(t=>{this.capacityCharges=t.charges,this.capacityMax=t.max,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.savedCount=P.getProjects().length}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeCapacity&&this.unsubscribeCapacity()}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.accountMenuOpen=!1}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.showCapacityNote=!1}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}render(){const t=(this.userEmail||"U")[0].toUpperCase();return h`
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
    `}};_.styles=X`
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
  `;V([S({type:Boolean})],_.prototype,"compact",2);V([S({type:Boolean})],_.prototype,"hideCapacity",2);V([S({type:Boolean})],_.prototype,"isAdmin",2);V([S({type:Number})],_.prototype,"capacityCharges",2);V([S({type:Number})],_.prototype,"capacityMax",2);V([S({type:Number})],_.prototype,"rechargeNextSec",2);V([S({type:Boolean})],_.prototype,"isAuthenticated",2);V([S({type:String})],_.prototype,"userEmail",2);V([S({type:Number})],_.prototype,"savedCount",2);V([S({type:String})],_.prototype,"syncStatus",2);V([S({type:String})],_.prototype,"title",2);V([b()],_.prototype,"accountMenuOpen",2);V([b()],_.prototype,"showCapacityNote",2);_=V([Q("app-header")],_);var ro=Object.defineProperty,no=Object.getOwnPropertyDescriptor,Ct=(t,e,i,o)=>{for(var s=o>1?void 0:o?no(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&ro(e,i,s),s};const ft=["bean","bird","cat","note"];function bt(t=.45){return{show:Math.random()<t,kind:ft[Math.floor(Math.random()*ft.length)]}}function vt(t){return t[Math.floor(Math.random()*t.length)]}class $i{constructor(e=7,i=1800){this.threshold=e,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const ao={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Ce=class extends K{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(t){if(t.has("kind")||t.has("scale")){const{width:e,height:i}=ao[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const t="#D98A54";return h`
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
    `}render(){const t=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return t?h`<div style="transform:scale(${this.scale}); transform-origin:top left;">${t}</div>`:ai}};Ce.styles=X`
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
  `;Ct([S({type:String})],Ce.prototype,"kind",2);Ct([S({type:Number})],Ce.prototype,"scale",2);Ce=Ct([Q("mascot-character")],Ce);var lo=Object.defineProperty,co=Object.getOwnPropertyDescriptor,Nt=(t,e,i,o)=>{for(var s=o>1?void 0:o?co(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&lo(e,i,s),s};const yt=3200;let Ne=class extends K{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(t){t.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},yt))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?h`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${ft.map(t=>h`<mascot-character .kind=${t} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:ai}};Ne.styles=X`
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
      animation: egg-pop ${yt}ms ease forwards;
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
      animation: egg-caption-pop ${yt}ms ease forwards;
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
  `;Nt([S({type:Number})],Ne.prototype,"trigger",2);Nt([b()],Ne.prototype,"visible",2);Ne=Nt([Q("mascot-parade")],Ne);var ho=Object.defineProperty,po=Object.getOwnPropertyDescriptor,D=(t,e,i,o)=>{for(var s=o>1?void 0:o?po(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&ho(e,i,s),s};const uo=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],go=["#F2A79B","#9CC0EC","#F6D98B"],mo=[6,3,12],Gt=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],fo=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],bo=["Warm","Melancholy","Nostalgic","Dreamy"],dt=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let M=class extends K{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=bt(.35),this.mascotSlot=vt(uo),this.peekMascot=bt(.18),this.peekSide=vt(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.isGenerating=!1,this.currentProvider=yi(),this.currentModel=xi(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=z,this.rechargeNextSec=45,this.showCapacityNote=!1,this.unsubscribeCapacity=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new $i,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const t=performance.now(),e=this.getBoundingClientRect(),i=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let o=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const s=this.shadowRoot?.querySelector(".divider-row");if(s){const d=s.getBoundingClientRect();d.top>e.top&&(o=d.top-e.top)}const r=this.jellyBodies,a=r.length;for(let d=0;d<a;d++){const c=r[d];if(c.vx+=Math.sin(t*6e-4*c.driftFreqX+c.driftPhaseX)*c.driftForce,c.vy+=Math.cos(t*7e-4*c.driftFreqY+c.driftPhaseY)*c.driftForce,this.mouseX!==null&&this.mouseY!==null){const l=c.x-this.mouseX,m=c.y-this.mouseY,v=Math.hypot(l,m);if(v<140&&v>0){const y=(1-v/140)*.12;c.vx+=l/v*y,c.vy+=m/v*y}}c.vx*=c.drag,c.vy*=c.drag;const u=Math.hypot(c.vx,c.vy);u>c.maxSpeed&&(c.vx=c.vx/u*c.maxSpeed,c.vy=c.vy/u*c.maxSpeed),c.x+=c.vx,c.y+=c.vy,c.angle+=c.vRot;const g=c.radius;c.x<g?(c.x=g,c.vx=Math.abs(c.vx)*c.restitution+.02,c.squishX=.88,c.squishY=1.12):c.x>i-g&&(c.x=i-g,c.vx=-Math.abs(c.vx)*c.restitution-.02,c.squishX=.88,c.squishY=1.12),c.y<g?(c.y=g,c.vy=Math.abs(c.vy)*c.restitution+.02,c.squishX=1.12,c.squishY=.88):c.y>o-g&&(c.y=o-g,c.vy=-Math.abs(c.vy)*c.restitution-.02,c.squishX=1.12,c.squishY=.88),c.squishX+=(1-c.squishX)*.08,c.squishY+=(1-c.squishY)*.08}for(let d=0;d<a;d++)for(let c=d+1;c<a;c++){const u=r[d],g=r[c],l=g.x-u.x,m=g.y-u.y,v=Math.hypot(l,m),y=u.radius+g.radius;if(v<y&&v>0){const n=y-v,p=l/v,f=m/v;u.x-=p*n*.4,u.y-=f*n*.4,g.x+=p*n*.4,g.y+=f*n*.4;const x=u.vx-g.vx,k=u.vy-g.vy,w=(p*x+f*k)/(u.mass+g.mass),C=.35;u.vx-=w*g.mass*p*C,u.vy-=w*g.mass*f*C,g.vx+=w*u.mass*p*C,g.vy+=w*u.mass*f*C;const N=.12;u.squishX=Math.max(.85,1-N*Math.abs(p)),u.squishY=Math.max(.85,1-N*Math.abs(f)),g.squishX=Math.max(.85,1-N*Math.abs(p)),g.squishY=Math.max(.85,1-N*Math.abs(f))}}if(this.shadowRoot)for(let d=0;d<a;d++){const c=r[d],u=this.shadowRoot.getElementById(`jelly-${c.id}`);u&&(u.style.transform=`translate3d(${c.x-c.radius}px, ${c.y-c.radius}px, 0) rotate(${c.angle}deg) scale(${c.squishX}, ${c.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(!this.isGenerating){if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}}spendCapacityCharge(){const t=mt.spendCharge();return t||(this.showCapacityNote=!0),t}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*dt.length),this.loadingTimer=setInterval(()=>{let t=Math.floor(Math.random()*dt.length);t===this.loadingMsgIdx&&(t=(t+1)%dt.length),this.loadingMsgIdx=t},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(t){this.currentProvider=t,Xs(t),t==="google"?(this.currentModel=gt[0].id,lt(this.currentModel)):t==="opencodeai"&&(this.currentModel=Js[0].id,lt(this.currentModel))}changeModel(t){this.currentModel=t,lt(t)}initJellyBodies(){const t=this.getBoundingClientRect(),e=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let i=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const o=Math.min(i,400),s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],r=3,a=[];for(let d=0;d<r;d++){const c=s[d%s.length],u=c.r+30,g=u+Math.random()*Math.max(100,e-u*2),l=u+Math.random()*Math.max(50,o-u*2),m=.08+Math.random()*.18,v=.35+Math.random()*.25,y=.985,n=.006+Math.random()*.008,p=.35,f=Math.random()*Math.PI*2;a.push({id:d,shapeKey:c.key,width:c.r*2,height:c.r*2,x:g,y:l,vx:Math.cos(f)*m,vy:Math.sin(f)*m,maxSpeed:v,drag:y,driftForce:n,restitution:p,radius:c.r,mass:c.r*c.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=a}onFrameMouseMove(t){const e=this.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){Qs().then(t=>{t&&(t.google&&(this.googleLimit=t.google.limit,this.googleRemaining=t.google.remaining,this.googleCooldownSec=t.google.cooldownSeconds),t.openrouter&&(this.orLimit=t.openrouter.limit,this.orRemaining=t.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%Gt.length},2800),this.unsubscribeCapacity=mt.subscribe(t=>{this.capacityCharges=t.charges,this.rechargeNextSec=t.rechargeNextSec,this.requestUpdate()}),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(t){super.updated(t),t.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.unsubscribeCapacity&&(this.unsubscribeCapacity(),this.unsubscribeCapacity=null),this.stopLoadingTimer()}selectGenre(t){this.dispatchEvent(new CustomEvent("genre-change",{detail:t,bubbles:!0,composed:!0}))}selectMood(t){this.dispatchEvent(new CustomEvent("mood-change",{detail:t,bubbles:!0,composed:!0}))}setLength(t){this.dispatchEvent(new CustomEvent("length-change",{detail:t,bubbles:!0,composed:!0}))}decLength(){this.length>be&&this.setLength(this.length-1)}incLength(){this.length<ie&&this.setLength(this.length+1)}onFreeTextChange(t){this.freeText=t.target.value}applyBest(t){this.selectGenre(t.genre),this.selectMood(t.mood);const e={...t,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:e,bubbles:!0,composed:!0}))}renderJellySvg(t){switch(t){case"blob1":return h`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return h`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return h`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return h`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return h`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return h`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return h`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return h`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return h`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return h`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return h`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return h`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return h`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return h`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const t=ce(this.mood);let e=fo.filter(l=>Ie.includes(l));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const i=Ie.filter(l=>!e.includes(l)),o=this.expandedGenre?e.concat(i):e,s=fe.map(l=>l.name);let r=bo.filter(l=>s.includes(l));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const a=s.filter(l=>!r.includes(l)),c=(this.expandedMood?r.concat(a):r).map(l=>fe.find(m=>m.name===l)),u=this.freeText.trim(),g=u.length>2?Ii(u):null;return h`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <app-header
          hideCapacity
          .isAdmin=${this.isAdmin}
          .capacityCharges=${this.capacityCharges}
          .capacityMax=${z}
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
                placeholder=${this.isGenerating?"Composing your chords...":Gt[this.placeholderIdx]}
              />
              <button
                class="vibe-capacity-chip ${this.capacityCharges<=1?"low":""}"
                @click=${l=>{l.stopPropagation(),this.showCapacityNote=!this.showCapacityNote}}
                title=${this.capacityCharges>0?`${this.capacityCharges} of ${z} AI generates left. One comes back every ${this.rechargeNextSec>0?this.rechargeNextSec:45}s.`:`Cooling down — next one unlocks in ${Math.floor(this.rechargeNextSec/60)}:${String(this.rechargeNextSec%60).padStart(2,"0")}`}
                aria-label="AI generates remaining"
                type="button"
              >
                <span class="pips-wrap">
                  ${Array.from({length:z},(l,m)=>h`
                    <span class="pip ${m<this.capacityCharges?"filled":""} ${this.capacityCharges<=1?"low":""}"></span>
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
                ${this.capacityCharges>0?`${this.capacityCharges} of ${z} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
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
            ${o.map(l=>{const m=Ie.indexOf(l);return h`
                <div class="pill ${l===this.genre?"selected":""}" style=${l===this.genre?`background:${t}`:""} @click=${()=>this.selectGenre(l)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${mo[m%3]} fill=${go[m%3]} />
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
            ${c.map(l=>h`
              <div class="pill mood-pill ${l.name===this.mood?"selected":""}" style=${l.name===this.mood?`background:${l.dot}`:""} @click=${()=>this.selectMood(l.name)}>
                <div class="mood-badge" style="background:${l.name===this.mood?"rgba(46,39,31,0.1)":l.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${l.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${l.iconPath} />
                  </svg>
                </div>
                ${l.name}
              </div>
            `)}
            ${a.length?h`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${a.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=be?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:ie},(l,m)=>h`
                <div class="length-segment ${m<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=ie?"disabled":""}" @click=${()=>this.incLength()}>+</div>
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
                      ${gt.map(l=>h`
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
    `}};M.styles=X`
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
  `;D([S({type:String})],M.prototype,"genre",2);D([S({type:String})],M.prototype,"mood",2);D([S({type:Number})],M.prototype,"length",2);D([b()],M.prototype,"freeText",2);D([b()],M.prototype,"placeholderIdx",2);D([b()],M.prototype,"llmSuggestion",2);D([b()],M.prototype,"llmResolved",2);D([b()],M.prototype,"classifyError",2);D([b()],M.prototype,"expandedGenre",2);D([b()],M.prototype,"expandedMood",2);D([b()],M.prototype,"mascot",2);D([b()],M.prototype,"mascotSlot",2);D([b()],M.prototype,"peekMascot",2);D([b()],M.prototype,"peekSide",2);D([S({type:Boolean})],M.prototype,"isAuthenticated",2);D([S({type:String})],M.prototype,"userEmail",2);D([S({type:Boolean})],M.prototype,"isAdmin",2);D([S({type:Boolean})],M.prototype,"isGenerating",2);D([b()],M.prototype,"currentProvider",2);D([b()],M.prototype,"currentModel",2);D([b()],M.prototype,"showAdminModal",2);D([b()],M.prototype,"isClassifying",2);D([b()],M.prototype,"loadingMsgIdx",2);D([b()],M.prototype,"googleRemaining",2);D([b()],M.prototype,"googleLimit",2);D([b()],M.prototype,"googleCooldownSec",2);D([b()],M.prototype,"orRemaining",2);D([b()],M.prototype,"orLimit",2);D([b()],M.prototype,"capacityCharges",2);D([b()],M.prototype,"rechargeNextSec",2);D([b()],M.prototype,"showCapacityNote",2);D([b()],M.prototype,"paradeTrigger",2);M=D([Q("seed-screen")],M);function Vt(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=e[o]??0,r=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+s))}function Ti(t,e,i){const o=t.chords,s=t.bpm||120,r=1.7,a=i?Ae.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,d=kt[t.genre]||{},c=a?.patch??{},u={...d,...c},g=d.duration??.9,l=c.durationMultiplier?g*c.durationMultiplier:g,m=[];return o.forEach((v,y)=>{const n=y*r,f=(v.notes&&v.notes.length>0?v.notes:["C","E","G"]).map(x=>`${x}4`);if(u.arpMode&&u.arpMode!=="off"){const x=u.arpRate??"1/16",k=u.arpRange??1,w=u.arpMode,C=di(x,s),N=hi(f,k),W=pi(N,w),re=u.duration?u.duration:Math.max(.6,l);W.forEach((Ee,Ge)=>{const A=n+Ge*C;m.push({note:Ee,midi:Vt(Ee),startTime:A,duration:re})})}else{const x=u.spread??0;f.forEach((k,w)=>{const C=w*x*.1,N=n+C;m.push({note:k,midi:Vt(k),startTime:N,duration:l})})}}),m}function vo(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function yo(t,e,i){const o=t.bpm||120,s=480,r=Ti(t,e,i),a=[];r.forEach(n=>{const p=Math.round(n.startTime/(60/o)*s),f=Math.max(1,Math.round(n.duration/(60/o)*s));a.push({tick:p,type:"on",midi:n.midi}),a.push({tick:p+f,type:"off",midi:n.midi})}),a.sort((n,p)=>n.tick!==p.tick?n.tick-p.tick:n.type!==p.type?n.type==="off"?-1:1:n.midi-p.midi);const d=[],c=Math.round(6e7/o);d.push(0),d.push(255,81,3),d.push(c>>16&255,c>>8&255,c&255);const u="Chroma Chords";d.push(0),d.push(255,3,u.length);for(let n=0;n<u.length;n++)d.push(u.charCodeAt(n));let g=0;a.forEach(n=>{const p=n.tick-g;g=n.tick,d.push(...vo(p)),n.type==="on"?d.push(144,n.midi,80):d.push(128,n.midi,0)}),d.push(0),d.push(255,47,0);const l=[77,84,104,100,0,0,0,6,0,0,0,1,s>>8&255,s&255],m=d.length,v=[77,84,114,107,m>>24&255,m>>16&255,m>>8&255,m&255],y=new Uint8Array(l.length+v.length+d.length);return y.set(l,0),y.set(v,l.length),y.set(d,l.length+v.length),y}function xo(t,e){const i=new ni({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((t?ve.find(r=>r.name.toLowerCase()===t.toLowerCase()):void 0)?.instrument??(e?wt[e]:void 0)??"rhodes"){case"bell":return new j(Se,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(i);case"epiano":return new j(Se,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(i);case"guitar":return new j(J,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(i);case"organ":return new j(J,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(i);case"pad-strings":{const r=new ri({decay:4.5,wet:.35}).connect(i);return new j(J,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new oi({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(i);return new j(J,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new j(si,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(i);case"rhodes":default:return new j(Se,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(i)}}function wo(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,s=o/8,r=e*s,a=t.length*e*s,d=new ArrayBuffer(44+a),c=new DataView(d),u=(m,v)=>{for(let y=0;y<v.length;y++)c.setUint8(m+y,v.charCodeAt(y))};u(0,"RIFF"),c.setUint32(4,36+a,!0),u(8,"WAVE"),u(12,"fmt "),c.setUint32(16,16,!0),c.setUint16(20,1,!0),c.setUint16(22,e,!0),c.setUint32(24,i,!0),c.setUint32(28,i*r,!0),c.setUint16(32,r,!0),c.setUint16(34,o,!0),u(36,"data"),c.setUint32(40,a,!0);const g=[];for(let m=0;m<e;m++)g.push(t.getChannelData(m));let l=44;for(let m=0;m<t.length;m++)for(let v=0;v<e;v++){const y=Math.max(-1,Math.min(1,g[v][m])),n=y<0?y*32768:y*32767;c.setInt16(l,n,!0),l+=2}return new Blob([new Uint8Array(d)],{type:"audio/wav"})}function qt(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}async function ko(t){const{progression:e,setName:i,instrumentName:o,playStyleName:s,format:r="wav"}=t,a=e.bpm||84,d=e.key||"C",c=(e.scaleType||"maj").toLowerCase().includes("min")?"min":"maj",m=`${(i||e.mood||"loop").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"loop"}_${a}bpm_${d}${c}.${r==="midi"?"mid":"wav"}`;if(r==="midi"){const x=yo(e,void 0,s),k=new Blob([x],{type:"audio/midi"});qt(k,m);return}const v=Ti(e,void 0,s),y=v.reduce((x,k)=>Math.max(x,k.startTime+k.duration),0),n=Math.max(4,y+3.4),p=await Bi(async()=>{const x=xo(o,e.genre);v.forEach(C=>{x.triggerAttackRelease(C.note,C.duration,C.startTime)});const k=new J({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).toDestination(),w=1.7;e.chords.forEach((C,N)=>{const re=(C.notes&&C.notes[0]||C.name.match(/^[A-Ga-g][#b]?/)?.[0]||"C").replace(/\d+$/,"");k.triggerAttackRelease(`${re}1`,w*.9,N*w)})},n),f=wo(p.get());qt(f,m)}var So=Object.defineProperty,Io=Object.getOwnPropertyDescriptor,Ci=(t,e,i,o)=>{for(var s=o>1?void 0:o?Io(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&So(e,i,s),s};const $o=R`
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
`,To=R`
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
`,Co=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:$o},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:To}];let Re=class extends K{constructor(){super(...arguments),this.visible=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.visible&&this.emit("close")}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}render(){return this.visible?h`
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
          ${Co.map(t=>h`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",t)}>
              ${t.svg}
              <div class="dest-name">${t.name}</div>
              <div class="dest-desc">${t.desc}</div>
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
    `:h``}};Re.styles=X`
    :host {
      display: block;
      font-family: var(--cv-font);
    }
    .backdrop {
      position: fixed;
      inset: -2px;
      z-index: 58;
      background: rgba(46, 39, 31, 0);
      pointer-events: none;
      transition: background 0.26s ease, backdrop-filter 0.26s ease;
    }
    .backdrop.visible {
      background: rgba(46, 39, 31, 0.5);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      pointer-events: auto;
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
      pointer-events: none;
      transform: translateY(calc(-50% + 14px)) scale(0.92);
      transition: opacity 0.26s cubic-bezier(.16,1,.3,1), transform 0.3s cubic-bezier(.16,1,.3,1);
    }
    .modal.visible {
      opacity: 1;
      pointer-events: auto;
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
  `;Ci([S({type:Boolean})],Re.prototype,"visible",2);Re=Ci([Q("share-modal")],Re);var No=Object.defineProperty,Ao=Object.getOwnPropertyDescriptor,$=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ao(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&No(e,i,s),s};const De=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],Eo=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"],Mo=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Rock","Cinematic","Ambient/Drone","House/Dance","Reggae/Dub","Gospel"],Yt=["Warm","Melancholy","Dreamy","Uplifting","Tense","Nostalgic"],Oo={Uplifting:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5",Melancholy:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15",Dreamy:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0",Tense:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12",Warm:"M12 4 a6.5 6.5 0 1 0 6.5 6.5",Nostalgic:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},ue={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},Ht=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Wt={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Be={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},Jt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},Ni={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},ke={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Do(t){const e=t===""?"maj":t;if(ke[5][e]||ke[6][e])return e;const i=Ni[e];return i&&(ke[5][i]||ke[6][i])?i:"maj"}function Bo(t){const e=Do(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const r=ke[o][e];if(!r)return;const a=((t.rootPc-s)%12+12)%12;i.push({rootFret:a,frets:r.map(d=>d===null?null:d+a)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function Po(t){const e=[7,0,4,9],i=t.intervals.map(a=>(t.rootPc+a)%12),o=a=>{const d=new Set(a);let c=null;const u=[],g=l=>{if(l===4){const m=u.map((p,f)=>(e[f]+p)%12);for(const p of d)if(m.indexOf(p)<0)return;for(const p of m)if(!d.has(p))return;const v=u.filter(p=>p>0),y=v.length?Math.max(...v)-Math.min(...v):0;if(y>3)return;const n=y*12+u.reduce((p,f)=>p+f,0);(!c||n<c.score)&&(c={frets:u.slice(),score:n});return}for(let m=0;m<=5;m++)u.push(m),g(l+1),u.pop()};return g(0),c},s=o(i);if(s)return s.frets;const r=o(t.intervals.filter(a=>a!==7).map(a=>(t.rootPc+a)%12));return r?r.frets:null}const Xt=[{key:"Darker",label:"Darker",tension:.55},{key:"More tension",label:"Tense",tension:.9},{key:"Dreamier",label:"Dreamy",tension:.3},{key:"Resolve home",label:"Home",tension:.05},{key:"Borrowed",label:"Borrow",tension:.42,twoTone:!0}],Kt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."]};let I=class extends K{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=window.innerWidth<900,this.activeView="loop",this.soundOpen=!1,this.shareOpen=!1,this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.abPick=null,this.abSide="before",this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.previewIndex=-1,this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.snapProgress=!1,this.abPlaying=!1,this.performMode=!1,this.armedLane="l1",this.recording=!1,this.recStartStep=0,this.stepsRecorded=0,this.takeHits=[],this.takeOffered=null,this.padFlash=-1,this.lastPad=null,this.lanes=[{id:"l1",name:"Rhodes · chords",color:"#F2A79B",quantise:"Off",hits:[],kept:!1,muted:!1},{id:"l2",name:"Sub · root notes",color:"#9CC0EC",quantise:"Bar",hits:[],kept:!0,muted:!1}],this.countInSetting="1 bar",this.isCountingIn=!1,this.countInBeat=0,this.countInTotalBeats=0,this.countInInterval=null,this.lastTickAt=Date.now(),this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.previewTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.onKeyHandler=t=>{if(!this.performMode||this.activeView!=="loop")return;const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;if(t.key===" "&&!t.repeat){t.preventDefault(),T.togglePlay();return}if((t.key==="r"||t.key==="R")&&!t.repeat){t.preventDefault(),this.toggleRecord();return}const i=parseInt(t.key,10),o=this.progression?.chords?.length||4;i>=1&&i<=o&&!t.repeat&&(t.preventDefault(),this.onPadDown(i-1))},this.onKeyUpHandler=t=>{if(!this.performMode||this.activeView!=="loop")return;const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const i=parseInt(t.key,10),o=this.progression?.chords?.length||4;i>=1&&i<=o&&(t.preventDefault(),this.onPadUp(i-1))}}willUpdate(t){if(t.has("playing")&&(this.playing?(this.snapProgress=!0,requestAnimationFrame(()=>{this.snapProgress=!1,this.requestUpdate()})):this.snapProgress=!0),t.has("progressStep")){if(this.lastTickAt=Date.now(),this.recording){this.stepsRecorded++;const i=this.progression?.chords?.length||4;this.stepsRecorded>=i&&(this.recording=!1,this.takeOffered={laneId:this.armedLane,hits:[...this.takeHits]},this.dispatchEvent(new CustomEvent("toast",{detail:`Captured take with ${this.takeHits.length} chords`,bubbles:!0,composed:!0})))}const e=t.get("progressStep");this.progressStep===0&&e!==void 0&&e>0&&(this.snapProgress=!0,requestAnimationFrame(()=>{this.snapProgress=!1,this.requestUpdate()}))}(t.has("progression")||t.has("instrument"))&&this.syncSubLaneHits()}connectedCallback(){super.connectedCallback(),this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.refreshSavedSets(),this.syncSubLaneHits(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.onKeyHandler),window.addEventListener("keyup",this.onKeyUpHandler),this.unsubscribeProjects=P.subscribeProjects(()=>{this.refreshSavedSets()}),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},3200)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.onKeyHandler),window.removeEventListener("keyup",this.onKeyUpHandler),this.cancelCountIn(),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.previewTimer&&clearTimeout(this.previewTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}refreshSavedSets(){this.savedSets=P.getProjects(),this.requestUpdate()}syncSubLaneHits(){const t=this.progression?.chords||[],e=t.length||4,i=t.map((o,s)=>({pos:Math.round(s/e*100)/100,vel:104,bar:s,voicing:"sub root"}));this.lanes=this.lanes.map(o=>o.id==="l2"?{...o,hits:i}:o.id==="l1"?{...o,name:`${this.instrument||"Rhodes"} · chords`}:o)}togglePerform(t){this.performMode=t,this.isInspectorOpen=!1,this.swapIndex=null,this.cancelCountIn(),this.recording=!1,this.takeOffered=null,this.padFlash=-1;const e=this.lanes.find(i=>i.id==="l2");T.setSubBassEnabled(t&&!e?.muted),this.requestUpdate()}setCountIn(t){this.countInSetting=t,this.cancelCountIn(),this.requestUpdate()}startCountIn(){this.cancelCountIn();const e=(this.countInSetting==="2 bars"?2:1)*4;this.countInTotalBeats=e,this.countInBeat=1,this.isCountingIn=!0,this.recording=!1,this.takeOffered=null,this.takeHits=[];const i=this.progression?.bpm||84,o=Math.round(6e4/i);rt(!0),this.requestUpdate(),this.countInInterval=setInterval(()=>{if(!this.isCountingIn){this.countInInterval&&clearInterval(this.countInInterval);return}if(this.countInBeat++,this.countInBeat<=this.countInTotalBeats){const s=(this.countInBeat-1)%4===0;rt(s),this.requestUpdate()}else this.countInInterval&&clearInterval(this.countInInterval),this.countInInterval=null,this.isCountingIn=!1,rt(!0),this.startActualRecording()},o)}cancelCountIn(){this.countInInterval&&(clearInterval(this.countInInterval),this.countInInterval=null),this.isCountingIn=!1,this.countInBeat=0}startActualRecording(){this.recording=!0,this.takeHits=[],this.takeOffered=null,this.recStartStep=this.progressStep,this.stepsRecorded=0,this.playing||T.startAutoplay(),this.requestUpdate()}armLane(t){this.armedLane=t,this.requestUpdate()}setLaneQuantise(t,e){const i=this.progression?.chords?.length||4;this.lanes=this.lanes.map(o=>{if(o.id===t){const s=o.kept&&o.hits.length?_t(o.hits,e,i):o.hits;return{...o,quantise:e,hits:s}}return o}),this.requestUpdate()}toggleLaneMute(t){this.lanes=this.lanes.map(e=>{if(e.id===t){const i=!e.muted;return t==="l2"&&T.setSubBassEnabled(this.performMode&&!i),{...e,muted:i}}return e}),this.requestUpdate()}toggleRecord(){if(this.recording){this.recording=!1,this.takeHits.length>0&&(this.takeOffered={laneId:this.armedLane,hits:[...this.takeHits]}),this.requestUpdate();return}if(this.isCountingIn){this.cancelCountIn(),this.requestUpdate();return}this.countInSetting==="Off"?this.startActualRecording():this.startCountIn()}keepTake(){if(!this.takeOffered)return;const{laneId:t,hits:e}=this.takeOffered,i=this.progression?.chords?.length||4;this.lanes=this.lanes.map(s=>{if(s.id===t){const r=_t(e,s.quantise,i);return{...s,kept:!0,hits:r}}return s});const o=this.lanes.find(s=>s.id===t);this.dispatchEvent(new CustomEvent("toast",{detail:`Take saved to ${o?.name||"lane"}`,bubbles:!0,composed:!0})),this.takeOffered=null,this.takeHits=[],this.requestUpdate()}discardTake(){this.takeOffered=null,this.takeHits=[],this.requestUpdate()}getInstrumentId(){return ve.find(e=>e.name.toLowerCase()===(this.instrument||"").toLowerCase())?.instrument??"rhodes"}onPadDown(t,e){const i=this.progression?.chords||[];if(t<0||t>=i.length)return;const o=i[t];let s="low, root position";if(e&&e.currentTarget&&typeof e.currentTarget.getBoundingClientRect=="function"){const d=e.currentTarget.getBoundingClientRect(),c=e.touches&&e.touches.length>0?e.touches[0].clientY:e.clientY;if(typeof c=="number"){const u=(c-d.top)/(d.height||1);s=u<.34?"up an octave":u<.67?"1st inversion":"low, root position"}}const r=88+t%3*8;this.padFlash=t,this.lastPad={idx:t,voicing:s,vel:r};let a=Array.isArray(o.notes)?o.notes:[];if(a.length===0||!a.every(d=>typeof d=="string"&&d.trim().length>0)){const d=o.name||"CMAJ",c=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR";a=Y(d,G(c,u))}if(ss(a,s,r,this.getInstrumentId()),this.recording){const d=this.progression?.chords?.length||4,c=Math.min(.96,Math.max(0,(Date.now()-this.lastTickAt)/$e)),u=Math.min(.99,Math.max(0,(this.progressStep+c)/d));this.takeHits=[...this.takeHits,{pos:u,vel:r,bar:t,voicing:s}]}this.requestUpdate()}onPadUp(t){os(),setTimeout(()=>{this.padFlash===t&&(this.padFlash=-1,this.requestUpdate())},120)}async onBounce(t){if(this.progression)try{this.dispatchEvent(new CustomEvent("toast",{detail:`Exporting loop as ${t.toUpperCase()}...`,bubbles:!0,composed:!0})),await ko({progression:this.progression,setName:this.progression.mood,instrumentName:this.instrument,playStyleName:this.playStyle,format:t}),this.dispatchEvent(new CustomEvent("toast",{detail:`Loop exported successfully (${t.toUpperCase()})`,bubbles:!0,composed:!0}))}catch(e){console.error("Bounce export failed:",e),this.dispatchEvent(new CustomEvent("toast",{detail:"Export failed, please try again",bubbles:!0,composed:!0}))}}renderHitBars(t,e){const o=[];for(let s=0;s<16;s++){const a=(t||[]).filter(d=>d.pos>=s/16&&d.pos<(s+1)/16)[0];if(a){const d=Math.round(9+(a.vel||100)/127*15);o.push(h`<div class="deck-hit-slot" style="height: ${d}px; background: ${e};"></div>`)}else o.push(h`<div class="deck-hit-slot empty" style="height: 3px; background: rgba(46, 39, 31, 0.13);"></div>`)}return o}renderLoopDeck(t){const e=this.lanes.find(s=>s.id===this.armedLane),i=e?e.name.split(" · ")[0]:"a lane",o=this.takeOffered?this.lanes.find(s=>s.id===this.takeOffered.laneId):null;return h`
      <div class="loop-deck">
        <div class="deck-top-row">
          <button
            class="rec-btn ${this.recording?"is-recording":""} ${this.isCountingIn?"is-counting-in":""}"
            @click=${()=>this.toggleRecord()}
            aria-label="${this.recording?"Stop recording":this.isCountingIn?"Cancel count-in":`Record into ${i}`}"
          >
            ${this.isCountingIn?h`
              <div class="count-in-number">${this.countInBeat}</div>
            `:h`
              <div class="rec-glyph"></div>
            `}
          </button>
          <div class="deck-meta-col">
            <div class="deck-rec-title">
              ${this.isCountingIn?`Counting in... ${this.countInBeat}`:this.recording?`Recording into ${i}`:`Record into ${i}`}
            </div>
            <div class="deck-rec-sub">
              ${this.isCountingIn?"Get ready — recording starts on downbeat":this.recording?`Play the pads — stops itself after ${t} bars`:"Tap a lane to arm it, R to record. Other lanes keep playing."}
            </div>
          </div>
          <div class="deck-count-in-wrap">
            <span class="deck-count-in-label">Count-in</span>
            <div class="deck-count-in-pills">
              ${["Off","1 bar","2 bars"].map(s=>h`
                <button
                  class="deck-count-pill ${this.countInSetting===s?"active":""}"
                  @click=${()=>this.setCountIn(s)}
                >${s}</button>
              `)}
            </div>
          </div>
        </div>

        <div class="deck-timeline">
          ${Array.from({length:t},(s,r)=>h`
            <div class="timeline-bar-seg ${this.isCountingIn?r===0?"count-step":"":this.playing&&this.progressStep===r?"active-step":""}"></div>
          `)}
        </div>

        <div class="deck-lanes-list">
          ${this.lanes.map(s=>{const r=s.id===this.armedLane,a=r&&this.recording?this.takeHits:s.hits,d=r&&this.recording?"Writing":s.kept&&s.hits.length?"Kept":r?"Armed":"Empty";return h`
              <div
                class="deck-lane-row ${r?"is-armed":""} ${r&&this.recording?"is-recording-lane":""}"
                @click=${()=>this.armLane(s.id)}
              >
                <div class="deck-lane-dot" style="background: ${s.color};"></div>
                <div class="deck-lane-name">${s.name}</div>
                <div class="deck-hit-bars-track">
                  ${this.renderHitBars(a,s.color)}
                </div>
                <div class="deck-lane-status" style="color: ${r&&this.recording?"#F2735F":"var(--cv-ink-muted)"};">
                  ${d}
                </div>
                <div class="deck-lane-quant-pills" @click=${c=>c.stopPropagation()}>
                  ${["Off","1/16","1/8","Bar"].map(c=>h`
                    <button
                      class="deck-quant-pill ${s.quantise===c?"active":""}"
                      @click=${()=>this.setLaneQuantise(s.id,c)}
                    >${c}</button>
                  `)}
                </div>
                <button
                  class="deck-mute-btn ${s.muted?"muted":""}"
                  @click=${c=>{c.stopPropagation(),this.toggleLaneMute(s.id)}}
                  aria-label="${s.muted?"Unmute":"Mute"} lane"
                >${s.muted?"Muted":"Mute"}</button>
              </div>
            `})}
        </div>

        ${this.takeOffered?h`
          <div class="take-review-card">
            <div class="take-review-header">
              <div class="take-review-title">${this.takeOffered.hits.length} chords played — keep this take?</div>
              <div class="take-review-actions">
                <button class="take-btn-try-again" @click=${()=>this.discardTake()}>Try again</button>
                <button class="take-btn-keep" @click=${()=>this.keepTake()}>Keep take</button>
              </div>
            </div>
            <div class="deck-hit-bars-track" style="height: 28px;">
              ${this.renderHitBars(this.takeOffered.hits,"#F2735F")}
            </div>
            <div class="take-note">
              ${o&&o.quantise==="Off"?"Quantise is Off, so this is your timing exactly. The raw take is kept either way.":"Snapped to this lane’s grid. The raw timing is kept, so you can change it after."}
            </div>
          </div>
        `:""}
      </div>
    `}renderStageTitle(t){if(this.progression?.searchTerm){const e=this.progression.searchTerm.trim(),o=(e.endsWith(".")?e.slice(0,-1):e).split(/\s+/);if(o.length===1)return h`<span style="color: ${t}">${o[0]}.</span>`;const s=o.slice(0,-1).join(" "),r=o[o.length-1];return h`${s} <span style="color: ${t}">${r}.</span>`}return h`${this.progression?.genre||"Pop"}, <span style="color: ${t}">${(this.progression?.mood||"Warm").toLowerCase()}.</span>`}onVibeSubmit(t){t.preventDefault(),!(this.isGenerating||!this.freeText.trim())&&this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0}))}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0}))}onBandClick(t){this.selectedBand=this.selectedBand===t?null:t;const e=De.find(i=>i.name===this.selectedBand);e&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onChordSelect(t){this.previewIndex=t,this.previewTimer&&clearTimeout(this.previewTimer),this.previewTimer=setTimeout(()=>{this.previewIndex=-1},500),this.swapIndex=t,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,T.setABOverride(null),this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.isMobile&&(this.mobileSheetOpen=!0),this.progression&&T.playChordAtIndex(t,.8),this.requestUpdate()}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){if(t==="before")T.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),T.playChordAtIndex(this.swapIndex,.8);else if(this.abPick){const e=G(this.progression.key,this.progression.scaleType),i=Y(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};T.setABOverride({index:this.swapIndex,side:"after",chord:o}),T.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=G(this.progression.key,this.progression.scaleType),o=Y(this.abPick.chord,i),s={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:o};T.auditionChord(s,.8)}else T.playChordAtIndex(t,.8)}toggleAB(){if(this.progression){if(this.abPlaying=!this.abPlaying,this.abPlaying){if(this.swapIndex!==null){const t=G(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?Y(this.abPick.chord,t):this.progression.chords[this.swapIndex]?.notes||[],i=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e}:this.progression.chords[this.swapIndex];T.setABOverride({index:this.swapIndex,side:this.abSide,chord:i})}this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),T.setABOverride(null);this.requestUpdate()}}onAltAudition(t){const e="chord"in t?t.chord:t,i=this.progression?G(this.progression.key,this.progression.scaleType):!1,o=e.notes&&e.notes.length>0?e.notes:Y(e.name,i);this.abPick={label:"label"in t?t.label:t.name,tension:e.tension||.5,chord:e.name,roman:e.roman||"",fn:"functionCaption"in t&&t.functionCaption?t.functionCaption:"Swapped chord"},this.abSide="after",this.swapIndex!==null&&this.progression&&T.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:o}}),T.auditionChord({...e,notes:o},.8),this.requestUpdate()}onConfirmSwap(){if(!this.abPick||this.swapIndex===null||!this.progression)return;const t=this.progression.chords,e=[...t],i=t[this.swapIndex],o=G(this.progression.key,this.progression.scaleType);e[this.swapIndex]={...i,name:this.abPick.chord,roman:this.abPick.roman||i.roman,tension:this.abPick.tension,notes:Y(this.abPick.chord,o)};const s=this.abPick.chord;this.progression={...this.progression,chords:e},T.setProgression(this.progression,this.order),T.setABOverride(null),this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.swapIndex=null,this.abPick=null,this.abPlaying=!1,this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${s}`,bubbles:!0,composed:!0})),this.requestUpdate()}onStepLength(t){if(!this.progression)return;const e=Math.max(be,Math.min(ie,this.progression.chords.length+t));this.dispatchEvent(new CustomEvent("set-length",{detail:e,bubbles:!0,composed:!0}))}onReroll(){this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onBookmark(){this.progression&&this.dispatchEvent(new CustomEvent("save-set",{detail:`${this.progression.genre} · ${this.progression.mood}`,bubbles:!0,composed:!0}))}toggleLibrary(t){this.libraryOpen=t!==void 0?t:!this.libraryOpen,this.librarySelectMode=!1,this.librarySelected=[],this.renamingId=null,this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("library-open-change",{detail:this.libraryOpen,bubbles:!0,composed:!0})),this.requestUpdate()}startRename(t,e,i){t.stopPropagation(),this.renamingId=e,this.draftName=i,this.confirmDeleteId=null}onDraftChange(t){this.draftName=t.target.value}commitRename(t){const e=this.draftName.trim();if(!e){this.cancelRename();return}const o=P.getProjects().find(s=>s.id===t);if(o){const s={...o,name:e,lastModified:Date.now()};P.saveProject(s),this.refreshSavedSets(),this.dispatchEvent(new CustomEvent("toast",{detail:`Renamed to "${e}"`,bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName=""}cancelRename(){this.renamingId=null,this.draftName=""}askDelete(t,e){t.stopPropagation(),this.confirmDeleteId=e,this.renamingId=null}confirmDelete(t){P.deleteProject(t),this.confirmDeleteId=null,this.refreshSavedSets(),this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop from library",bubbles:!0,composed:!0}))}cancelDelete(){this.confirmDeleteId=null}onLoadSavedProject(t){this.dispatchEvent(new CustomEvent("load-project",{detail:t,bubbles:!0,composed:!0})),this.toggleLibrary(!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Loaded "${t.name}"`,bubbles:!0,composed:!0}))}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets,o=i.filter(c=>e?`${c.name} ${c.genre} ${c.mood} ${(c.chords||[]).map(g=>typeof g=="object"?g.name:g).join(" ")}`.toLowerCase().indexOf(e)>=0:!0),s=i.length>2,r=this.librarySelectMode,a=this.librarySelected,d=i.length?`Your loops · ${i.length}`:"Your loops";return i.length===0?h`<div class="lib-empty-text">Nothing kept yet. Use the bookmark to keep a loop here.</div>`:h`
      <div class="lib-pop-header">
        <div class="lib-pop-title">${d}</div>
        <button class="lib-pop-select-btn" style="background: ${r?t:"transparent"};" @click=${()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelected=[],this.confirmDeleteId=null,this.renamingId=null}}>${r?"Done":"Select"}</button>
      </div>
      ${s?h`
        <div style="padding: 0 4px 9px;">
          <input type="text" class="lib-pop-search" placeholder="Search loops" .value=${this.librarySearch} @input=${c=>{this.librarySearch=c.target.value}} />
        </div>
      `:""}
      <div class="lib-rows">
        ${o.map(c=>{const u=this.renamingId===c.id,g=this.confirmDeleteId===c.id,l=a.indexOf(c.id)>=0,m=c.chords||[],v=ce(c.mood||"Warm");return h`
            <div class="lib-row ${l?"checked":""}" @click=${()=>r?this.toggleLibrarySelected(c.id):this.onLoadSavedProject(c)}>
              ${r?h`
                <div class="lib-check ${l?"checked":""}" style="background: ${l?t:"transparent"};" @click=${y=>{y.stopPropagation(),this.toggleLibrarySelected(c.id)}}>${l?"✓":""}</div>
              `:""}
              <div class="lib-row-info" style="cursor: pointer;">
                ${u?h`
                  <input
                    type="text"
                    class="lib-rename-input"
                    .value=${this.draftName}
                    @input=${this.onDraftChange}
                    @keydown=${y=>{y.key==="Enter"&&this.commitRename(c.id),y.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(c.id)}
                    @click=${y=>y.stopPropagation()}
                    autofocus
                  />
                `:h`
                  <div>
                    <span class="lib-row-name-line">
                      <span class="lib-row-dots">
                        ${m.map((y,n)=>{const p=typeof y=="object"&&y!==null?y.tension??.1:.1;q(p);const f=7,x=n%2?"2px":"50%";return h`<span style="width:${f}px;height:${f}px;border-radius:${x};background:${v};"></span>`})}
                      </span>
                      <span class="lib-row-name">${c.name||"Untitled Loop"}</span>
                    </span>
                    <span class="lib-row-meta">${c.genre||"Pop"} · ${c.mood||"Warm"}</span>
                  </div>
                `}
              </div>
              ${!r&&!g&&!u?h`
                <div class="lib-row-actions">
                  <button class="lib-icon-btn" @click=${y=>{y.stopPropagation(),this.startRename(y,c.id,c.name||"Untitled Loop")}} aria-label="Rename loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                  </button>
                  <button class="lib-icon-btn" @click=${y=>{y.stopPropagation(),this.askDelete(y,c.id)}} aria-label="Delete loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                  </button>
                </div>
              `:""}
              ${g?h`
                <div class="lib-confirm-actions">
                  <button class="lib-confirm-delete-btn" @click=${y=>{y.stopPropagation(),this.confirmDelete(c.id)}}>Delete</button>
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
        <button class="lib-batch-delete-btn" style="background: ${a.length?"#D8624C":"var(--cv-surface)"}; color: ${a.length?"#FBF3E6":"rgba(46,39,31,0.35)"}; cursor: ${a.length?"pointer":"default"};" @click=${()=>this.deleteLibrarySelected()}>Delete ${a.length} loop${a.length===1?"":"s"}</button>
      `:""}
    `}toggleLibrarySelected(t){this.librarySelected.indexOf(t)>=0?this.librarySelected=this.librarySelected.filter(i=>i!==t):this.librarySelected=[...this.librarySelected,t]}deleteLibrarySelected(){if(this.librarySelected.length===0)return;const t=new Set(this.librarySelected);for(const e of t)P.deleteProject(e);this.refreshSavedSets(),this.librarySelected=[],this.librarySelectMode=!1}renderLoopsDrawer(t){return""}parseChord(t){const e=/^([A-G][b#]?)(.*)$/.exec(t||"C"),i=e?e[1]:"C",o=e?e[2]:"",s=Jt[o]||Jt[Ni[o]||"maj"]||[0,4,7];return{root:i,rootPc:Wt[i]===void 0?0:Wt[i],q:o,intervals:s}}renderPianoCard(t,e){const i=this.parseChord(t.name),o=22,s=86,r=52,a=[0,2,4,5,7,9,11],d=[],c=[],u=[];for(let m=0;m<2;m++)a.forEach((v,y)=>{d.push({x:(m*7+y)*o,w:o-1.5,h:s})});for(let m=0;m<2;m++)[0,1,3,4,5].forEach(v=>{const y=m*7+v;c.push({x:y*o+o*.64,w:o*.58,h:r})});i.intervals.forEach(m=>{const v=i.rootPc+m,y=Math.floor(v/12),n=v%12,p=a.indexOf(n),f=m===0,x=p<0,k=f?"#F2735F":x?"#FBF3E6":"#2E271F",w=f?"#FBF3E6":x?"#2E271F":"#FBF3E6",C=this.showDegrees?Be[m%12]:"";if(p>=0){const N=y*7+p;u.push({cx:N*o+(o-1.5)/2,cy:s-19,r:9,fill:k,isRoot:f,label:C,lc:w})}else{const W=(y*7+a.indexOf(n-1))*o+o*.64,re=o*.58;u.push({cx:W+re/2,cy:r-14,r:7.5,fill:k,isRoot:f,label:C,lc:w})}});const g=14*o,l=i.intervals.map(m=>{const v=Ht[(i.rootPc+m)%12];return this.showDegrees?`${v} (${Be[m%12]})`:v}).join(" · ");return h`
      <div class="play-card" @click=${()=>T.playChordAtIndex(e,.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; gap: 9px;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?h`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${g}" height="${s}" viewBox="0 0 ${g} ${s}" style="display: block; width: 100%; max-width: ${g}px; height: auto;">
          ${d.map(m=>R`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${c.map(m=>R`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${u.map(m=>R`
            <g>
              <circle cx="${m.cx}" cy="${m.cy}" r="${m.r}" fill="${m.fill}" stroke="${m.isRoot?"#2E271F":"none"}" stroke-width="${m.isRoot?1.6:0}"></circle>
              ${m.label?R`
                <text x="${m.cx}" y="${m.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${m.lc}" font-family="'Plus Jakarta Sans',sans-serif">${m.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${l}</div>
      </div>
    `}renderFretCard(t,e,i){const o=this.parseChord(t.name),s=[4,9,2,7,11,4],r=[7,0,4,9],a=i==="Ukulele",d=a?r:s,c=a?Po(o)||[null,null,null,null]:Bo(o)||[null,null,null,null,null,null],u=18,g=24,l=4,m=16,v=d.length,y=c.filter(A=>A!==null&&A>0),n=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,p=[],f=[],x=[],k=[],w=[];for(let A=0;A<v;A++)p.push({x:A*u});for(let A=0;A<=l;A++)f.push({y:m+A*g,sw:A===0&&n===0?3:1.2});c.forEach((A,de)=>{const Ve=de*u;if(A===null){w.push({x:Ve});return}if(A===0){k.push({x:Ve});return}const Ai=((d[de]+A-o.rootPc)%12+12)%12;x.push({cx:Ve,cy:m+(A-n-.5)*g,fill:Ai===0?"#F2735F":"#2E271F",label:this.showDegrees?Be[((d[de]+A-o.rootPc)%12+12)%12]:""})});const C=(v-1)*u,N=(v-1)*u+26,W=m+l*g+12,re=n>0?`${n+1}fr`:"",Ee=n>0,Ge=o.intervals.map(A=>{const de=Ht[(o.rootPc+A)%12];return this.showDegrees?`${de} (${Be[A%12]})`:de}).join(" · ");return h`
      <div class="play-card" @click=${()=>T.playChordAtIndex(e,.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?h`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${Ee?h`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${re}</div>
          `:""}
        </div>
        <svg width="${N}" height="${W}" viewBox="-13 -2 ${N} ${W}" style="display: block; width: 100%; max-width: ${N*1.5}px; height: auto;">
          ${f.map(A=>R`
            <rect x="0" y="${A.y}" width="${C}" height="${A.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${p.map(A=>R`
            <rect x="${A.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${k.map(A=>R`
            <circle cx="${A.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${w.map(A=>R`
            <text x="${A.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${x.map(A=>R`
            <g>
              <circle cx="${A.cx}" cy="${A.cy}" r="${A.fill==="#F2735F"?7.5:7}" fill="${A.fill}"></circle>
              ${A.label?R`
                <text x="${A.cx}" y="${A.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${A.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${Ge}</div>
      </div>
    `}render(){const t=this.progression?.chords||[],e=ce(this.progression?.mood||"Warm"),i=De.find(n=>n.name===this.selectedBand),o=this.expandedGenre?Mo:Eo,s=t.map(n=>n.tension||.1),r=Math.max(...s,.1),a=Math.min(...s,0),d=s.indexOf(r),c=s.every((n,p)=>p===0||n>=s[p-1]),u=r-a<.28?"Stays close to home":c?"A steady climb":s[s.length-1]<.25&&d<s.length-1?"Away, then home":"Drifts, then settles",g=`Opens ${ue[t[0]?.functionLabel]||"home"} and ${r-a<.28?"never strays far — every chord sits in about the same harmonic neighborhood.":c?`tightens bar by bar, reaching peak tension on ${t[d]?.name||"the peak"}.`:`explores tension up to ${t[d]?.name||"the middle"} before resolving back down.`}`;let l=[],m="";const v=this.progression?.scaleType?.includes("MINOR")??!1;if(this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")l=fi(this.chordData,this.progression,this.swapIndex),m=this.showTheory?`Modal interchange — four chords from the parallel ${v?"major":"minor"}, each matched to the chord it can stand in for.`:`Four chords from the ${v?"major":"minor"} version of this key. Each one swaps in for a chord you already have.`;else{const n=Tt(this.chordData,this.progression,this.swapIndex);l=(n.find(f=>f.name===this.activeSwapFamily)||n[0])?.rows||[],m=Kt[this.activeSwapFamily]?Kt[this.activeSwapFamily][this.showTheory?1:0]:""}if(i){const n=l.filter(f=>i.hoist.includes(f.name)),p=l.filter(f=>!i.hoist.includes(f.name));l=[...n,...p]}}const y=this.swapIndex!==null?t[this.swapIndex]:null;return h`
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
                    @input=${n=>{this.freeText=n.target.value}}
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
                  ${o.map(n=>h`
                    <button class="pill ${this.progression?.genre===n?"active":""}" @click=${()=>this.onGenreClick(n)}>${n}</button>
                  `)}
                </div>

                <div class="kicker-label spaced">Mood</div>
                <div class="pills-group">
                  ${Yt.map(n=>h`
                    <button class="pill ${this.progression?.mood===n?"active":""}" @click=${()=>this.onMoodClick(n)}>${n}</button>
                  `)}
                </div>

                <div class="kicker-label spaced">Band</div>
                <div class="pills-group">
                  ${De.map(n=>h`
                    <button class="pill ${this.selectedBand===n.name?"active":""}" @click=${()=>this.onBandClick(n.name)}>${n.name}</button>
                  `)}
                </div>

                <button class="mobile-loops-toggle-btn" @click=${()=>this.toggleLibrary(!0)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                  <span style="flex: 1; text-align: left;">Your saved loops (${this.savedSets.length})</span>
                  <span style="font-weight: 800;">→</span>
                </button>
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

            ${this.activeView==="loop"?h`
              <div class="mode-toggle-row" style="justify-content: center; margin: 10px 0 6px;">
                <button
                  class="perform-mode-btn ${this.performMode?"exit":""}"
                  @click=${()=>this.togglePerform(!this.performMode)}
                  aria-label="${this.performMode?"Exit perform":"Perform"}"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
                    <rect x="3" y="3" width="8" height="8" rx="2.4"/>
                    <rect x="13" y="3" width="8" height="8" rx="2.4"/>
                    <rect x="3" y="13" width="8" height="8" rx="2.4"/>
                    <rect x="13" y="13" width="8" height="8" rx="2.4"/>
                  </svg>
                  ${this.performMode?"Exit perform":"Perform"}
                </button>
              </div>
            `:""}
          </div>

          <!-- Mobile Center View -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView==="loop"?h`
              ${this.performMode?h`
                <div class="stage-panel" style="min-height: 220px; padding: 18px 12px; display: flex; flex-direction: column;">
                  <svg class="drift-shape a" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="90" height="90" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  <div class="pad-cells-grid">
                    ${t.map((n,p)=>{const f=q(n.tension||.1),x=this.padFlash===p,k=this.playing&&p===this.progressStep,w=String(p+1),C=x&&this.lastPad?this.lastPad.voicing:ue[n.functionLabel]||n.functionLabel||"";return h`
                        <div
                          class="pad-cell ${x?"pad-held":""} ${k?"pad-lit":""}"
                          style="background: ${f.color}; min-height: 108px;"
                          @mousedown=${N=>this.onPadDown(p,N)}
                          @mouseup=${()=>this.onPadUp(p)}
                          @touchstart=${N=>{N.preventDefault(),this.onPadDown(p,N)}}
                          @touchend=${N=>{N.preventDefault(),this.onPadUp(p)}}
                          tabindex="0"
                          role="button"
                          aria-label="Play ${n.name}"
                        >
                          <div class="pad-key-label">${w}</div>
                          <div>
                            <div class="pad-name" style="font-size: 18px;">${n.name}</div>
                            <div class="pad-meta">${C}</div>
                          </div>
                        </div>
                      `})}
                  </div>
                  <div class="perform-banner" style="margin-top: 10px;">
                    <span class="perform-banner-kicker">Playing now</span>
                    <span class="perform-banner-now" style="font-size: 14px;">${this.lastPad?t[Math.min(this.lastPad.idx,t.length-1)]?.name:"—"}</span>
                    <span class="perform-banner-sub" style="font-size: 11px;">${this.lastPad?`${this.lastPad.voicing} · velocity ${this.lastPad.vel}`:"Tap a pad to play"}</span>
                  </div>
                </div>
              `:h`
                <div class="stage-panel" style="min-height: 200px; padding: 24px 12px;">
                  <svg class="drift-shape a" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="90" height="90" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  <div class="chords-flex-row" style="gap: 16px;">
                    ${t.map((n,p)=>{const f=q(n.tension||.1),x=this.playing&&p===this.progressStep,k=Math.max(76,Math.min(100,f.size*.8)),w=Math.round(f.radius*(k/f.size));return h`
                        <div class="chord-item-wrap" @click=${()=>this.onChordSelect(p)}>
                          <div
                            class="chord-block-shape ${x?"active-pulse":""}"
                            style="width: ${k}px; height: ${k}px; border-radius: ${w}px; background: ${f.color};"
                          >
                            ${this.showTheory&&n.roman?h`
                              <div class="roman-pill-badge">${n.roman}</div>
                            `:""}
                            <div class="chord-title-text" style="font-size: ${Math.round(f.fontSize*.76)}px;">${n.name}</div>

                            <!-- Quick Mobile Action Buttons -->
                            <button class="quick-action-btn swap" @click=${C=>{C.stopPropagation(),this.onChordSelect(p)}} aria-label="Swap chord">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                            </button>
                          </div>
                          <div class="chord-role-label">${ue[n.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                </div>
              `}

              <!-- Quick Instrument & Play Style Chips -->
              <div class="quick-chips-row" style="margin-top: 14px;">
                <button class="quick-chip-btn" @click=${()=>{this.soundOpen=!this.soundOpen}} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument||"Nylon Guitar"} <span style="opacity:0.6;">${this.soundOpen?"▴":"▾"}</span>
                </button>
                <button class="quick-chip-btn" @click=${()=>{this.soundOpen=!this.soundOpen}} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"} <span style="opacity:0.6;">${this.soundOpen?"▴":"▾"}</span>
                </button>
              </div>

              ${this.soundOpen?h`
                <div class="sound-drawer">
                  <div class="kicker-label">Instrument</div>
                  <div class="sound-options-flex">
                    ${["Piano","Rhodes","Nylon Guitar","Warm Pad","Synth Bell"].map(n=>h`
                      <button class="pill ${(this.instrument||"Piano")===n?"active":""}" @click=${()=>{this.instrument=n,T.setInstrument(n),this.requestUpdate()}}>${n}</button>
                    `)}
                  </div>
                  <div class="kicker-label spaced">Playing Style</div>
                  <div class="sound-options-flex">
                    ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(n=>h`
                      <button class="pill ${(this.playStyle||"Block chords")===n?"active":""}" @click=${()=>{this.playStyle=n,T.setPlayStyle(n),this.requestUpdate()}}>${n}</button>
                    `)}
                  </div>
                </div>
              `:""}

              ${this.performMode?this.renderLoopDeck(t.length):""}

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
                    ${t.map((n,p)=>{const f=q(n.tension||.1),x=Math.round(16+(n.tension||.1)*50);return h`
                        <div class="arc-bar-col" @click=${()=>this.onChordSelect(p)}>
                          <div class="arc-bar-pillar" style="height: ${x}px; background: ${f.color};"></div>
                          <div style="font-size: 10px; font-weight: 800; color: var(--cv-ink); margin-top: 4px;">${n.name}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 10px;">${g}</div>
                </div>
              `:""}
            `:this.activeView==="song"?h`
              <div class="song-track-list">
                ${this.sections.map((n,p)=>h`
                  <div class="song-card ${this.activeSectionIdx===p?"active-sec":""}" @click=${()=>{this.activeSectionIdx=p,this.requestUpdate()}}>
                    <div style="flex: 1;">
                      <div style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${n.name}</div>
                      <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${n.desc}</div>
                    </div>
                  </div>
                `)}
                <div class="add-sec-card" @click=${()=>{if(this.progression){const n=ne.addSection(this.sections,this.progression);this.sections=n.sections,this.activeSectionIdx=n.activeIndex,this.requestUpdate()}}}>
                  + Add a related section
                </div>
              </div>
            `:h`
              <div style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(n=>h`
                      <button
                        class="pill ${this.playInstrument===n?"active":""}"
                        style="background: ${this.playInstrument===n?e:"var(--cv-cream)"}; color: ${this.playInstrument===n?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=n}}
                      >${n}</button>
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
                    ${t.map((n,p)=>this.renderPianoCard(n,p))}
                  </div>
                `:h`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 18px;">
                    ${t.map((n,p)=>this.renderFretCard(n,p,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
                style="width: 100%; transform: scaleX(${this.playing&&t.length?(this.progressStep+1)/t.length:0}); background: ${e}; --progress-duration: ${$e}ms;"
              ></div>
            </div>

            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onBookmark} aria-label="Keep this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
            </button>
            <button class="mobile-loops-toggle-btn" style="background: ${this.libraryOpen?e:"var(--cv-surface)"};" @click=${()=>this.toggleLibrary()} aria-label="Your saved loops">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${()=>{this.shareOpen=!0}} aria-label="Share this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
            </button>

            ${this.libraryOpen?h`
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
                <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Bar ${this.swapIndex+1} (${y?.name})</div>
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
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${y?.name||""}</div>
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
                    ${t.map((n,p)=>{const f=p===this.swapIndex,x=f&&this.abSide==="after"&&this.abPick?this.abPick.chord:n.name,k=this.abPlaying&&this.progressStep===p;return h`
                        <button
                          class="ab-cell-item ${k?"active-step":""}"
                          style="background: ${f&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${f?1:.65};"
                          @click=${()=>this.onAbCellClick(p)}
                          aria-label="Preview ${x} in bar ${p+1}"
                        >
                          ${x}
                        </button>
                      `})}
                  </div>
                </div>
              </div>

              <!-- Custom Geometric Substitution Family Tabs -->
              <div class="swap-tab-nav">
                ${Xt.map(n=>{const p=this.activeSwapFamily===n.key,f=q(n.tension),x=Math.round(f.size*.34),k=Math.round(f.radius*(x/f.size));return h`
                    <button
                      class="swap-family-tab ${p?"active":""}"
                      @click=${()=>{this.activeSwapFamily=n.key,this.requestUpdate()}}
                    >
                      ${n.twoTone?h`
                        <span class="two-tone-swatch" style="box-shadow: ${p?`0 0 0 3px ${e}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:h`
                        <span
                          class="family-shape"
                          style="width: ${x}px; height: ${x}px; border-radius: ${k}px; background: ${f.color}; box-shadow: ${p?`0 0 0 3px ${e}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${p?"active":""}">${n.label}</span>
                    </button>
                  `})}
              </div>

              ${i?h`
                <div class="band-note-banner" style="background: ${i.color}22;">
                  <span>Sorted for ${i.name} — their moves first</span>
                </div>
              `:""}

              ${m?h`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                  ${m}
                </div>
              `:""}

              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${l.length?l.map(n=>{const p=this.abPick?.chord===n.name,f=q(n.tension),x=Math.max(28,Math.min(38,Math.round(f.size*.32))),k=Math.round(f.radius*(x/f.size)),w=!!i&&i.hoist.includes(n.name);return h`
                    <div
                      class="alt-item-row ${p?"selected":""}"
                      @click=${()=>this.onAltAudition({name:n.name,chord:n.chord,sub:n.sub,functionCaption:n.sub})}
                    >
                      <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div
                          style="width: ${x}px; height: ${x}px; border-radius: ${k}px; background: ${f.color}; box-shadow: ${p?`0 0 0 2px ${e}`:"none"};"
                        ></div>
                      </div>

                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink);">${n.name}</span>
                          ${this.showTheory&&n.roman?h`
                            <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${n.roman}</span>
                          `:""}
                          ${w?h`
                            <span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>
                          `:""}
                        </div>
                        <div style="font-size: 11px; color: var(--cv-ink-muted); margin-top: 2px;">${n.sub}</div>
                        ${this.showTheory&&n.notes&&n.notes.length?h`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${n.notes.join(" · ")}
                          </div>
                        `:""}
                      </div>

                      <button
                        class="alt-play-btn"
                        style="background: ${p&&this.abSide==="after"?e:"#DCEAF9"}; width: 30px; height: 30px;"
                        aria-label="Audition ${n.name}"
                      >
                        ${p&&this.abSide==="after"?"❚❚":"▶"}
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
                  @input=${n=>{this.freeText=n.target.value}}
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
                ${o.map(n=>h`
                  <button
                    class="pill ${this.progression?.genre===n?"active":""}"
                    @click=${()=>this.onGenreClick(n)}
                  >${n}</button>
                `)}
                <button class="pill more-toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                  ${this.expandedGenre?"Show less ⌃":"+more ⌄"}
                </button>
              </div>

              <div class="kicker-label spaced">Mood</div>
              <div class="pills-group">
                ${Yt.map(n=>{const p=ce(n);return h`
                    <button
                      class="pill ${this.progression?.mood===n?"active":""}"
                      @click=${()=>this.onMoodClick(n)}
                    >
                      <span class="mood-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${p}" stroke-width="2.2" stroke-linecap="round">
                          <path d="${Oo[n]||"M12 4 a6.5 6.5 0 1 0 6.5 6.5"}"/>
                        </svg>
                      </span>
                      ${n}
                    </button>
                  `})}
              </div>

              <div class="kicker-label spaced" style="display: flex; align-items: baseline; gap: 6px;">
                <span>Band</span>
                <span style="font-size: 10px; font-weight: 700; color: rgba(46, 39, 31, 0.4); text-transform: lowercase;">optional</span>
              </div>
              <div class="pills-group">
                ${De.map(n=>h`
                  <button
                    class="pill ${this.selectedBand===n.name?"active":""}"
                    style="font-family: ${n.font}; font-weight: ${n.weight||800}; font-style: ${n.italic?"italic":"normal"}; letter-spacing: ${n.pillTrack};"
                    @click=${()=>this.onBandClick(n.name)}
                  >${n.name}</button>
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
                  <button class="round-btn ${this.soundOpen?"active":""}" @click=${()=>{this.soundOpen=!this.soundOpen}} aria-label="Sound settings">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  </button>
                  <button class="round-btn" @click=${()=>{this.shareOpen=!0}} aria-label="Share loop">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
                  </button>
                </div>
              </div>

              <!-- VIEW TABS: Chords | Song | Play it -->
              <div class="view-tabs-bar">
                <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
                <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
                <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
              </div>

              ${this.activeView==="loop"?h`
                <div class="mode-toggle-row">
                  <button
                    class="perform-mode-btn ${this.performMode?"exit":""}"
                    @click=${()=>this.togglePerform(!this.performMode)}
                    aria-label="${this.performMode?"Exit perform":"Perform"}"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
                      <rect x="3" y="3" width="8" height="8" rx="2.4"/>
                      <rect x="13" y="3" width="8" height="8" rx="2.4"/>
                      <rect x="3" y="13" width="8" height="8" rx="2.4"/>
                      <rect x="13" y="13" width="8" height="8" rx="2.4"/>
                    </svg>
                    ${this.performMode?"Exit perform":"Perform"}
                  </button>
                  <div class="perform-hint">
                    ${this.performMode?"Press a pad — higher on the pad, higher the voicing. Keys 1–4 and R to record.":"Build the progression here, then Perform plays it in."}
                  </div>
                </div>
              `:""}
            </div>

            <!-- Canvas -->
            <div class="stage-canvas">
              ${this.activeView==="loop"?h`
                <div class="stage-panel">
                  <svg class="drift-shape a" width="128" height="128" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="112" height="112" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  ${this.performMode?h`
                    <div class="pad-cells-row">
                      ${t.map((n,p)=>{const f=q(n.tension||.1),x=this.padFlash===p,k=this.playing&&p===this.progressStep,w=String(p+1),C=x&&this.lastPad?this.lastPad.voicing:ue[n.functionLabel]||n.functionLabel||"";return h`
                          <div
                            class="pad-cell ${x?"pad-held":""} ${k?"pad-lit":""}"
                            style="background: ${f.color};"
                            @mousedown=${N=>this.onPadDown(p,N)}
                            @mouseup=${()=>this.onPadUp(p)}
                            @touchstart=${N=>{N.preventDefault(),this.onPadDown(p,N)}}
                            @touchend=${N=>{N.preventDefault(),this.onPadUp(p)}}
                            tabindex="0"
                            role="button"
                            aria-label="Play ${n.name}"
                          >
                            <div class="pad-key-label">${w}</div>
                            <div>
                              <div class="pad-name">${n.name}</div>
                              <div class="pad-meta">${C}</div>
                            </div>
                          </div>
                        `})}
                    </div>
                    <div class="perform-banner">
                      <span class="perform-banner-kicker">Playing now</span>
                      <span class="perform-banner-now">${this.lastPad?t[Math.min(this.lastPad.idx,t.length-1)]?.name:"—"}</span>
                      <span class="perform-banner-sub">${this.lastPad?`${this.lastPad.voicing} · velocity ${this.lastPad.vel}`:"Press a pad, or hit 1–4"}</span>
                    </div>
                  `:h`
                    <div class="chords-flex-row">
                      ${t.map((n,p)=>{const f=q(n.tension||.1),x=this.playing&&p===this.progressStep,k=this.isInspectorOpen&&p===this.swapIndex,w=p===this.previewIndex,C=Math.max(84,Math.min(130,f.size)),N=Math.round(f.radius*(C/f.size));return h`
                          <div
                            class="chord-item-wrap"
                            @click=${()=>this.onChordSelect(p)}
                            tabindex="0"
                            role="button"
                            aria-label="${n.name}, ${n.functionLabel||"Chord"}"
                          >
                            <div
                              class="chord-block-shape ${x?"active-pulse":""} ${k?"selected-inspector":""}"
                              style="width: ${C}px; height: ${C}px; border-radius: ${N}px; background: ${f.color}; transform: ${w?"scale(0.94)":"none"};"
                            >
                              ${this.showTheory&&n.roman?h`
                                <div class="roman-pill-badge">${n.roman}</div>
                              `:""}
                              <div class="chord-title-text" style="font-size: ${Math.round(f.fontSize*.92)}px;">${n.name}</div>
                            </div>
                            <div class="chord-role-label">${ue[n.functionLabel]||n.functionLabel||""}</div>
                          </div>
                        `})}
                    </div>
                  `}
                </div>

                <div class="quick-chips-row">
                  <button
                    class="quick-chip-btn"
                    @click=${()=>{this.soundOpen=!this.soundOpen}}
                    aria-label="Change instrument"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <rect x="2.5" y="7" width="19" height="10" rx="2"/>
                      <path d="M8 7v10M13 7v10M18 7v10"/>
                    </svg>
                    ${this.instrument||"Nylon Guitar"} <span style="opacity:0.6;">${this.soundOpen?"▴":"▾"}</span>
                  </button>
                  <button
                    class="quick-chip-btn"
                    @click=${()=>{this.soundOpen=!this.soundOpen}}
                    aria-label="Change playing style"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/>
                    </svg>
                    ${this.playStyle||"Block chords"} <span style="opacity:0.6;">${this.soundOpen?"▴":"▾"}</span>
                  </button>
                </div>

                ${this.soundOpen?h`
                  <div class="sound-drawer">
                    <div class="kicker-label">Instrument</div>
                    <div class="sound-options-flex">
                      ${["Piano","Rhodes","Nylon Guitar","Warm Pad","Synth Bell"].map(n=>h`
                        <button
                          class="pill ${(this.instrument||"Piano")===n?"active":""}"
                          @click=${()=>{this.instrument=n,T.setInstrument(n),this.requestUpdate()}}
                        >${n}</button>
                      `)}
                    </div>
                    <div class="kicker-label spaced">Playing Style</div>
                    <div class="sound-options-flex">
                      ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(n=>h`
                        <button
                          class="pill ${(this.playStyle||"Block chords")===n?"active":""}"
                          @click=${()=>{this.playStyle=n,T.setPlayStyle(n),this.requestUpdate()}}
                        >${n}</button>
                      `)}
                    </div>
                  </div>
                `:""}

                ${this.performMode?this.renderLoopDeck(t.length):""}
              `:this.activeView==="song"?h`
                <div class="song-track-list">
                  <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 8px;">
                    Each section reuses the loop, related but never identical. Press play in the transport bar to hear the whole thing.
                  </div>
                  ${this.sections.map((n,p)=>h`
                    <div
                      class="song-card ${this.activeSectionIdx===p?"active-sec":""}"
                      @click=${()=>{this.activeSectionIdx=p,this.requestUpdate()}}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                        Section ${p+1}
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${n.name}</div>
                        <div style="font-size: 12px; color: var(--cv-ink-muted); margin-top: 2px;">${n.desc}</div>
                      </div>
                      <div style="display: flex; gap: 4px;">
                        ${n.progression.chords.map(f=>{const x=q(f.tension||.1);return h`<span style="width: 14px; height: 14px; border-radius: 4px; background: ${x.color};"></span>`})}
                      </div>
                    </div>
                  `)}
                  <div
                    class="add-sec-card"
                    @click=${()=>{if(this.progression){const n=ne.addSection(this.sections,this.progression);this.sections=n.sections,this.activeSectionIdx=n.activeIndex,this.requestUpdate()}}}
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
                    ${t.map((n,p)=>this.renderPianoCard(n,p))}
                  </div>

                  <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
                    <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                      ${["Guitar","Ukulele"].map(n=>h`
                        <button
                          style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===n?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===n?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                          @click=${()=>{this.playInstrument=n}}
                        >${n}</button>
                      `)}
                    </div>
                    <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 4px;">
                    ${t.map((n,p)=>this.renderFretCard(n,p,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
                  style="width: 100%; transform: scaleX(${this.playing&&t.length?(this.progressStep+1)/t.length:0}); background: ${e}; --progress-duration: ${$e}ms;"
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
                      <span style="font-size: 22px; font-weight: 800; color: var(--cv-ink);">${y?.name||""}</span>
                      ${this.showTheory&&y?.roman?h`
                        <span style="font-size: 12px; font-weight: 800; color: var(--cv-label);">${y.roman}</span>
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
                      <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${y?.name||""}</div>
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
                      ${t.map((n,p)=>{const f=p===this.swapIndex,x=f&&this.abSide==="after"&&this.abPick?this.abPick.chord:n.name,k=this.abPlaying&&this.progressStep===p;return h`
                          <button
                            class="ab-cell-item ${k?"active-step":""}"
                            style="background: ${f&&this.abSide==="after"&&this.abPick?e:"#F1E4D2"}; opacity: ${f?1:.65};"
                            @click=${()=>this.onAbCellClick(p)}
                            aria-label="Preview ${x} in bar ${p+1}"
                          >
                            ${x}
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
                  ${u}
                </div>
              `}
            </div>

            <div class="right-scroll">
              ${this.isInspectorOpen?h`
                <!-- Custom Geometric Substitution Family Tabs -->
                <div class="swap-tab-nav">
                  ${Xt.map(n=>{const p=this.activeSwapFamily===n.key,f=q(n.tension),x=Math.round(f.size*.34),k=Math.round(f.radius*(x/f.size));return h`
                      <button
                        class="swap-family-tab ${p?"active":""}"
                        @click=${()=>{this.activeSwapFamily=n.key,this.requestUpdate()}}
                      >
                        ${n.twoTone?h`
                          <span class="two-tone-swatch" style="box-shadow: ${p?`0 0 0 3px ${e}`:"none"};">
                            <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                            <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                          </span>
                        `:h`
                          <span
                            class="family-shape"
                            style="width: ${x}px; height: ${x}px; border-radius: ${k}px; background: ${f.color}; box-shadow: ${p?`0 0 0 3px ${e}`:"none"};"
                          ></span>
                        `}
                        <span class="family-label ${p?"active":""}">${n.label}</span>
                      </button>
                    `})}
                </div>

                ${i?h`
                  <div class="band-note-banner" style="background: ${i.color}22;">
                    <span>Sorted for ${i.name} — their moves first</span>
                  </div>
                `:""}

                ${m?h`
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                    ${m}
                  </div>
                `:""}

                <div>
                  ${l.length?l.map(n=>{const p=this.abPick?.chord===n.name,f=q(n.tension),x=Math.max(28,Math.min(38,Math.round(f.size*.32))),k=Math.round(f.radius*(x/f.size)),w=!!i&&i.hoist.includes(n.name);return h`
                      <div
                        class="alt-item-row ${p?"selected":""}"
                        @click=${()=>this.onAltAudition({name:n.name,chord:n.chord,sub:n.sub,functionCaption:n.sub})}
                      >
                        <div style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <div
                            style="width: ${x}px; height: ${x}px; border-radius: ${k}px; background: ${f.color}; box-shadow: ${p?`0 0 0 2px ${e}`:"none"};"
                          ></div>
                        </div>

                        <div style="flex: 1; min-width: 0;">
                          <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${n.name}</span>
                            ${this.showTheory&&n.roman?h`
                              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${n.roman}</span>
                            `:""}
                            ${w?h`
                              <span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>
                            `:""}
                          </div>
                          <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${n.sub}</div>
                          ${this.showTheory&&n.notes&&n.notes.length?h`
                            <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 3px;">
                              ${n.notes.join(" · ")}
                            </div>
                          `:""}
                        </div>

                        <button
                          class="alt-play-btn"
                          style="background: ${p&&this.abSide==="after"?e:"#DCEAF9"};"
                          aria-label="Audition ${n.name}"
                        >
                          ${p&&this.abSide==="after"?"❚❚":"▶"}
                        </button>
                      </div>
                    `}):h`
                    <div style="padding: 14px 8px; font-size: 12.5px; color: var(--cv-ink-muted);">Loading substitutions...</div>
                  `}
                </div>
              `:h`
                <div class="arc-bars-box">
                  ${t.map((n,p)=>{const f=q(n.tension||.1),x=Math.round(20+(n.tension||.1)*75);return h`
                      <button class="arc-bar-col" @click=${()=>this.onChordSelect(p)}>
                        <div class="arc-bar-pillar" style="height: ${x}px; background: ${f.color};"></div>
                        <div style="font-size: 11px; font-weight: 800; color: var(--cv-ink); margin-top: 6px;">${n.name}</div>
                        <div style="font-size: 9.5px; font-weight: 700; color: rgba(46, 39, 31, 0.45);">${ue[n.functionLabel]||""}</div>
                      </button>
                    `})}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved harmonic tension.</div>
                <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px;">${g}</div>
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
        @close=${()=>{this.shareOpen=!1}}
      ></share-modal>

      <!-- Upgraded Loops Drawer (Desktop slide-over & Mobile bottom sheet) -->
      ${this.renderLoopsDrawer(e)}
    `}};I.styles=X`
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
    .mood-badge {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
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
      padding: 10px 12px 12px;
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
      bottom: 62px;
      z-index: 30;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overscroll-behavior: contain;
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px;
      box-shadow: 0 22px 44px -20px rgba(46, 39, 31, 0.5);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    /* Library Popover Panel (Mobile) */
    .library-popover-mobile {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 82px;
      z-index: 40;
      max-height: calc(100vh - 190px);
      overflow-y: auto;
      overscroll-behavior: contain;
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 18px;
      padding: 10px;
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
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink);
      min-height: 44px;
      padding: 0 14px;
      border-radius: 14px;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      margin-top: 10px;
      transition: background 150ms ease;
    }
    .mobile-loops-toggle-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
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
      min-height: 280px;
      background: var(--cv-surface);
      border-radius: 26px;
      padding: 26px 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
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
      cursor: pointer;
      transition: transform 160ms var(--cv-ease);
      outline: none;
      position: relative;
    }
    .chord-item-wrap:hover {
      transform: translateY(-3px);
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
      padding: 11px 22px;
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

    /* ------------------------------------------------------------------ */
    /* Perform Mode Styles: Pads & Loop Deck                              */
    /* ------------------------------------------------------------------ */
    .mode-toggle-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    .perform-mode-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      padding: 10px 17px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, ease), color 150ms ease;
    }
    .perform-mode-btn:hover {
      opacity: 0.92;
    }
    .perform-mode-btn.exit {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .mode-pills-bar {
      display: inline-flex;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 3px;
      border-radius: 100px;
      gap: 2px;
    }
    .mode-pill {
      border: none;
      background: transparent;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      color: var(--cv-ink-muted, #6B5F50);
      transition: all 150ms var(--cv-ease, ease);
      font-family: inherit;
    }
    .mode-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .perform-hint {
      font-size: 11.5px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
      flex: 1;
      min-width: 0;
    }
    .perform-banner {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 4px;
      padding: 0 4px;
      position: relative;
      z-index: 2;
      width: 100%;
    }
    .perform-banner-kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .perform-banner-now {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .perform-banner-sub {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .quick-chips-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }
    .quick-chip-btn {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 9px 16px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, ease);
    }
    .quick-chip-btn:hover {
      filter: brightness(0.97);
    }

    /* Pads Container - Desktop & Mobile */
    .pad-cells-row {
      position: relative;
      z-index: 2;
      flex: 1;
      min-height: 240px;
      display: flex;
      align-items: stretch;
      gap: 12px;
      min-width: 0;
      width: 100%;
    }
    .pad-cell {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 18px 20px;
      border-radius: 20px;
      cursor: pointer;
      user-select: none;
      touch-action: none;
      min-height: 230px;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
      transform: none;
      transition: opacity 120ms ease, box-shadow 140ms ease, transform 120ms ease;
      outline-offset: 4px;
      position: relative;
      overflow: hidden;
    }
    .pad-cell:hover {
      filter: brightness(1.02);
    }
    .pad-cell.pad-held {
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
      transform: scale(0.985);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.3);
    }
    .pad-key-label {
      font-size: 11px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.5);
      font-family: inherit;
    }
    .pad-name {
      font-size: 19px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }
    .pad-meta {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.6);
      margin-top: 3px;
      line-height: 1.2;
    }
    .pad-cells-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      flex: 1;
      min-height: 0;
      position: relative;
      z-index: 2;
    }

    /* Loop Deck Container */
    .loop-deck {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 14px 16px 16px;
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border: 1px solid rgba(46, 39, 31, 0.08);
      animation: cvfv-sheet-up 200ms var(--cv-ease);
    }
    .deck-top-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .rec-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--cv-surface-2, #F1E4CC);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      border: none;
      transition: background 150ms ease, box-shadow 150ms ease;
    }
    .rec-btn.is-recording {
      background: #F2735F;
      box-shadow: 0 8px 18px -10px rgba(242, 115, 95, 0.9);
    }
    .rec-btn.is-counting-in {
      background: var(--cv-yellow, #F6D98B);
      box-shadow: 0 0 0 3px rgba(246, 217, 139, 0.5);
      animation: cvfv-count-pulse 500ms infinite alternate;
    }
    @keyframes cvfv-count-pulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.06); }
    }
    .count-in-number {
      font-size: 19px;
      font-weight: 900;
      color: #2E271F;
      font-family: inherit;
    }
    .rec-glyph {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #F2735F;
      transition: all 150ms ease;
    }
    .rec-btn.is-recording .rec-glyph {
      width: 15px;
      height: 15px;
      border-radius: 4px;
      background: #FBF3E6;
      animation: cvfv-rec-pulse 1s infinite alternate;
    }
    @keyframes cvfv-rec-pulse {
      0% { opacity: 1; }
      100% { opacity: 0.35; }
    }
    .deck-meta-col {
      flex: 1;
      min-width: 0;
    }
    .deck-rec-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .deck-rec-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
    }
    .deck-count-in-wrap {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-left: auto;
      flex-shrink: 0;
    }
    .deck-count-in-label {
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .deck-count-in-pills {
      display: inline-flex;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 2px;
      border-radius: 8px;
      gap: 2px;
    }
    .deck-count-pill {
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 10.5px;
      font-weight: 800;
      padding: 4px 9px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 120ms ease;
    }
    .deck-count-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .deck-timeline {
      display: flex;
      gap: 2px;
      height: 10px;
      align-items: stretch;
      margin-top: 13px;
    }
    .timeline-bar-seg {
      flex: 1;
      background: rgba(46, 39, 31, 0.09);
      border-radius: 3px;
      transition: background 120ms ease;
    }
    .timeline-bar-seg.active-step {
      background: var(--cv-ink, #2E271F);
    }
    .timeline-bar-seg.count-step {
      background: var(--cv-yellow, #F6D98B) !important;
    }
    .deck-lanes-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 9px;
    }
    .deck-lane-row {
      display: flex;
      align-items: center;
      gap: 11px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 12px;
      padding: 9px 12px;
      cursor: pointer;
      box-shadow: none;
      transition: box-shadow 150ms ease;
    }
    .deck-lane-row.is-armed {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.28);
    }
    .deck-lane-row.is-recording-lane {
      box-shadow: inset 0 0 0 2px #F2735F;
    }
    .deck-lane-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .deck-lane-name {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      width: 128px;
      flex-shrink: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .deck-hit-bars-track {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 2px;
      height: 24px;
      align-items: flex-end;
    }
    .deck-hit-slot {
      flex: 1;
      min-width: 0;
      border-radius: 2px;
    }
    .deck-hit-slot.empty {
      height: 3px !important;
      background: rgba(46, 39, 31, 0.13) !important;
    }
    .deck-lane-status {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      flex-shrink: 0;
      width: 50px;
      text-align: right;
    }
    .deck-lane-quant-pills {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }
    .deck-quant-pill {
      padding: 5px 8px;
      border-radius: 8px;
      font-size: 10.5px;
      font-weight: 800;
      cursor: pointer;
      border: none;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #6B5F50);
      transition: all 120ms ease;
      font-family: inherit;
    }
    .deck-quant-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .deck-mute-btn {
      display: none;
    }

    /* Take Review Drawer */
    .take-review-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 16px;
      padding: 13px 15px 14px;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }
    .take-review-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .take-review-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .take-review-actions {
      display: flex;
      gap: 7px;
    }
    .take-btn-try-again {
      border: none;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 8px 15px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .take-btn-keep {
      border: none;
      font-family: inherit;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 100px;
      padding: 8px 15px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .take-note {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
    }

    /* Bounce Bar */
    .bounce-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 10px 14px;
      margin-top: 4px;
    }
    .bounce-meta {
      flex: 1;
      min-width: 0;
    }
    .bounce-title {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-cream, #FBF3E6);
    }
    .bounce-filename {
      font-family: 'Space Mono', monospace;
      font-size: 10.5px;
      color: rgba(251, 243, 230, 0.6);
      margin-top: 2px;
    }
    .bounce-btn {
      border: none;
      font-family: inherit;
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      background: var(--cv-yellow, #F6D98B);
      color: #2E271F;
      transition: opacity 120ms ease;
    }
    .bounce-btn.sec {
      background: rgba(251, 243, 230, 0.14);
      color: rgba(251, 243, 230, 0.85);
    }
  `;$([S({type:Object})],I.prototype,"chordData",2);$([S({type:Object})],I.prototype,"progression",2);$([S({type:Number})],I.prototype,"activeIndex",2);$([S({type:Number})],I.prototype,"progressStep",2);$([S({type:Array})],I.prototype,"order",2);$([S({type:Boolean})],I.prototype,"playing",2);$([S({type:Boolean})],I.prototype,"showTheory",2);$([S({type:String})],I.prototype,"instrument",2);$([S({type:String})],I.prototype,"playStyle",2);$([S({type:Boolean})],I.prototype,"isAuthenticated",2);$([S({type:String})],I.prototype,"userEmail",2);$([S({type:Array})],I.prototype,"sections",2);$([S({type:Number})],I.prototype,"activeSectionIdx",2);$([S({type:Number})],I.prototype,"activePlayingSectionIdx",2);$([S({type:Number})],I.prototype,"totalSongSteps",2);$([S({type:Boolean})],I.prototype,"isGenerating",2);$([S({type:Boolean})],I.prototype,"libraryOpen",2);$([b()],I.prototype,"isMobile",2);$([b()],I.prototype,"activeView",2);$([b()],I.prototype,"soundOpen",2);$([b()],I.prototype,"shareOpen",2);$([b()],I.prototype,"vibeOpen",2);$([b()],I.prototype,"selectedBand",2);$([b()],I.prototype,"freeText",2);$([b()],I.prototype,"vibePlaceholderIdx",2);$([b()],I.prototype,"expandedGenre",2);$([b()],I.prototype,"activeSwapFamily",2);$([b()],I.prototype,"swapIndex",2);$([b()],I.prototype,"isInspectorOpen",2);$([b()],I.prototype,"abPick",2);$([b()],I.prototype,"abSide",2);$([b()],I.prototype,"savedSets",2);$([b()],I.prototype,"renamingId",2);$([b()],I.prototype,"draftName",2);$([b()],I.prototype,"confirmDeleteId",2);$([b()],I.prototype,"librarySearch",2);$([b()],I.prototype,"librarySelectMode",2);$([b()],I.prototype,"librarySelected",2);$([b()],I.prototype,"previewIndex",2);$([b()],I.prototype,"playInstrument",2);$([b()],I.prototype,"showDegrees",2);$([b()],I.prototype,"mobileSheetOpen",2);$([b()],I.prototype,"snapProgress",2);$([b()],I.prototype,"abPlaying",2);$([S({type:Boolean})],I.prototype,"performMode",2);$([b()],I.prototype,"armedLane",2);$([b()],I.prototype,"recording",2);$([b()],I.prototype,"recStartStep",2);$([b()],I.prototype,"stepsRecorded",2);$([b()],I.prototype,"takeHits",2);$([b()],I.prototype,"takeOffered",2);$([b()],I.prototype,"padFlash",2);$([b()],I.prototype,"lastPad",2);$([S({type:Array})],I.prototype,"lanes",2);$([S({type:String})],I.prototype,"countInSetting",2);$([b()],I.prototype,"isCountingIn",2);$([b()],I.prototype,"countInBeat",2);$([b()],I.prototype,"countInTotalBeats",2);I=$([Q("loop-screen")],I);var Fo=Object.defineProperty,Lo=Object.getOwnPropertyDescriptor,ye=(t,e,i,o)=>{for(var s=o>1?void 0:o?Lo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Fo(e,i,s),s};let se=class extends K{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(t){t.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const t=this.name.trim();t&&(this.dispatchEvent(new CustomEvent("save",{detail:t})),this.close())}onInput(t){this.name=t.target.value}onKeyDown(t){t.key==="Escape"?this.close():t.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?h`
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
    `:h``}};se.styles=X`
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
  `;ye([S({type:Boolean})],se.prototype,"visible",2);ye([S({type:String})],se.prototype,"defaultName",2);ye([b()],se.prototype,"mounted",2);ye([b()],se.prototype,"name",2);ye([li(".name-input")],se.prototype,"inputEl",2);se=ye([Q("save-set-modal")],se);var Ro=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,U=(t,e,i,o)=>{for(var s=o>1?void 0:o?Uo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Ro(e,i,s),s};const zo=["Piano","Rhodes","Nylon Guitar","Warm Pad"],_o=["Block chords","Arpeggio","Strum","Broken (swing)"],jo=["flex-start","center","flex-end"];let F=class extends K{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.embedded=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=bt(.5),this.mascotAlign=vt([...jo]),this.eggCounter=new $i,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(t){if(t.has("progressStep")){const e=t.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}updated(t){t.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(t){this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const t=this.sections[0]?.progression.genre??"Pop",e=this.instrument??Ji(t),i=this.playStyle??Xi(t),o=this.totalSteps||this.sections.reduce((n,p)=>n+p.order.length,0),s=!this.playing||o<=0?0:this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100,r=ve.filter(n=>n.name!==e);let a=zo.filter(n=>r.some(p=>p.name===n));const d=r.filter(n=>!a.includes(n.name)),c=this.expandedAllInstruments?r:r.filter(n=>a.includes(n.name)),u=Ae.filter(n=>n.name!==i);let g=_o.filter(n=>u.some(p=>p.name===n));const l=u.filter(n=>!g.includes(n.name)),m=this.expandedAllPlayStyles?u:u.filter(n=>g.includes(n.name)),v=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],y=v?ce(v.progression.mood):"#C9A9E0";return h`
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
            ${this.sections.map((n,p)=>{const f=this.playing?p===this.activePlayingSectionIdx:p===this.activeSectionIdx,x=ce(n.progression.mood);return h`
                <div class="section-row ${f?"active":""}" style=${f?`--ring-color:${x}`:""} @click=${()=>this.selectSection(p)}>
                  <div>
                    <div class="section-name">${n.name.toUpperCase()}</div>
                    <div class="section-chords">${n.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${n.order.map(k=>{const w=n.progression.chords[k],C=q(w.tension);return h`<div class="section-chip" style="background:${C.color};border-radius:${Math.round(C.radius*.35)}px;"></div>`})}
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
                  style="width:${s}%;background:${y};--progress-duration:${$e}ms"
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
                ${c.map(n=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:n.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${n.color}"></span>${n.name}
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
                ${m.map(n=>h`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:n.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${n.color}"></span>${n.name}
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
          .defaultName=${t&&v?`${t} · ${v.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${n=>{this.dispatchEvent(new CustomEvent("save-set",{detail:n.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
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
  `;U([S({type:Array})],F.prototype,"sections",2);U([S({type:Number})],F.prototype,"activeSectionIdx",2);U([S({type:Number})],F.prototype,"activePlayingSectionIdx",2);U([S({type:Boolean})],F.prototype,"canAddSection",2);U([S({type:Boolean})],F.prototype,"playing",2);U([S({type:Number})],F.prototype,"progressStep",2);U([S({type:Number})],F.prototype,"totalSteps",2);U([S({type:String})],F.prototype,"instrument",2);U([S({type:String})],F.prototype,"playStyle",2);U([S({type:Boolean})],F.prototype,"isAuthenticated",2);U([S({type:Boolean})],F.prototype,"isBookmarked",2);U([S({type:Boolean})],F.prototype,"embedded",2);U([b()],F.prototype,"expandedInstrument",2);U([b()],F.prototype,"expandedPlayStyle",2);U([b()],F.prototype,"expandedAllInstruments",2);U([b()],F.prototype,"expandedAllPlayStyles",2);U([b()],F.prototype,"snapProgress",2);U([b()],F.prototype,"saveModalVisible",2);U([b()],F.prototype,"mascot",2);U([b()],F.prototype,"mascotAlign",2);U([b()],F.prototype,"paradeTrigger",2);F=U([Q("song-screen")],F);var Go=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,ee=(t,e,i,o)=>{for(var s=o>1?void 0:o?Vo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Go(e,i,s),s};const Qt={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},qo=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Zt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},ei={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ti={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},we={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}},Yo=[4,9,2,7,11,4],ii=[7,0,4,9];let H=class extends K{constructor(){super(...arguments),this.order=[0,1,2,3],this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.embedded=!1,this.playInstrument="Piano",this.showDegrees=!1,this.activeChordIndex=null}parseChord(t){const e=/^([A-G][b#]?)(.*)$/.exec(t||"C"),i=e?e[1]:"C",o=e?e[2]:"",s=Zt[o]||Zt[ti[o]||"maj"]||[0,4,7];return{root:i,rootPc:Qt[i]===void 0?0:Qt[i],q:o,intervals:s}}shapeQual(t){const e=t===""?"maj":t;if(we[5][e]||we[6][e])return e;const i=ti[e];return i&&(we[5][i]||we[6][i])?i:"maj"}guitarVoicing(t){const e=this.parseChord(t),i=this.shapeQual(e.q),o=[];return[[6,4],[5,9]].forEach(([s,r])=>{const a=we[s][i];if(!a)return;const d=((e.rootPc-r)%12+12)%12;o.push({rootFret:d,frets:a.map(c=>c===null?null:c+d)})}),o.length?(o.sort((s,r)=>s.rootFret-r.rootFret),o[0].frets):null}ukeVoicing(t){const e=this.parseChord(t),i=ii,o=e.intervals.map(d=>(e.rootPc+d)%12),s=d=>{const c=new Set(d);let u=null;const g=[],l=m=>{if(m===4){const v=g.map((f,x)=>(i[x]+f)%12);for(const f of c)if(v.indexOf(f)<0)return;for(const f of v)if(!c.has(f))return;const y=g.filter(f=>f>0),n=y.length?Math.max(...y)-Math.min(...y):0;if(n>3)return;const p=n*12+g.reduce((f,x)=>f+x,0);(!u||p<u.score)&&(u={frets:g.slice(),score:p});return}for(let v=0;v<=5;v++)g.push(v),l(m+1),g.pop()};return l(0),u},r=s(o);if(r)return r.frets;const a=s(e.intervals.filter(d=>d!==7).map(d=>(e.rootPc+d)%12));return a?a.frets:null}degOf(t,e){return ei[((t-e)%12+12)%12]||"1"}notesLineFor(t){return t.intervals.map(e=>{const i=qo[(t.rootPc+e)%12];return this.showDegrees?`${i} (${this.degOf((t.rootPc+e)%12,t.rootPc)})`:i}).join(" · ")}onChordClick(t){this.activeChordIndex=t,this.dispatchEvent(new CustomEvent("chord-preview",{detail:t,bubbles:!0,composed:!0})),setTimeout(()=>{this.activeChordIndex===t&&(this.activeChordIndex=null)},450)}onBackClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}renderPianoSvg(t,e){const r=[0,2,4,5,7,9,11],a=this.parseChord(t),d=[],c=[],u=[];for(let l=0;l<2;l++)r.forEach((m,v)=>{d.push({x:(l*7+v)*22,w:22-1.5,h:86})});for(let l=0;l<2;l++)[0,1,3,4,5].forEach(m=>{const v=l*7+m;c.push({x:v*22+22*.64,w:22*.58,h:52})});a.intervals.forEach(l=>{const m=a.rootPc+l,v=Math.floor(m/12),y=m%12,n=r.indexOf(y),p=l===0,f=p?"#F2735F":e,x=this.showDegrees&&ei[l%12]||"";if(n>=0){const k=v*7+n;u.push({cx:k*22+(22-1.5)/2,cy:67,r:9,fill:f,label:x,lc:p?"#FBF3E6":"#2E271F"})}else{const w=(v*7+r.indexOf(y-1))*22+22*.64,C=22*.58;u.push({cx:w+C/2,cy:38,r:7.5,fill:f,label:x,lc:p?"#FBF3E6":"#2E271F"})}});const g=14*22;return h`
      <svg width="${g}" height="${86}" viewBox="0 0 ${g} ${86}" style="display:block;max-width:100%;height:auto;">
        ${d.map(l=>R`
          <rect x="${l.x}" y="0" width="${l.w}" height="${l.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${c.map(l=>R`
          <rect x="${l.x}" y="0" width="${l.w}" height="${l.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${u.map(l=>R`
          <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="${l.fill}"></circle>
          ${l.label?R`
            <text x="${l.cx}" y="${l.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${l.lc}" font-family="'Plus Jakarta Sans',sans-serif">${l.label}</text>
          `:""}
        `)}
      </svg>
    `}renderFretSvg(t,e){const a=this.parseChord(t),d=e?ii:Yo,c=e?this.ukeVoicing(t)||[null,null,null,null]:this.guitarVoicing(t)||[null,null,null,null,null,null],u=d.length,g=c.filter(w=>w!==null&&w>0),l=g.length&&Math.max(...g)>4?Math.min(...g)-1:0,m=[],v=[],y=[],n=[],p=[];for(let w=0;w<u;w++)m.push({x:w*18});for(let w=0;w<=4;w++)v.push({y:16+w*24,sw:w===0&&l===0?3:1.2});c.forEach((w,C)=>{const N=C*18;if(w===null){p.push({x:N});return}if(w===0){n.push({x:N});return}const W=((d[C]+w-a.rootPc)%12+12)%12;y.push({cx:N,cy:16+(w-l-.5)*24,fill:W===0?"#F2735F":"#2E271F",label:this.showDegrees?this.degOf((d[C]+w)%12,a.rootPc):""})});const f=(u-1)*18+26,x=16+4*24+12,k=(u-1)*18;return{posLabel:l>0?`${l+1}fr`:"",svg:h`
        <svg width="${f}" height="${x}" viewBox="-13 -2 ${f} ${x}" style="display:block;">
          ${v.map(w=>R`
            <rect x="0" y="${w.y}" width="${k}" height="${w.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${m.map(w=>R`
            <rect x="${w.x}" y="16" width="1.2" height="${4*24}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${n.map(w=>R`
            <circle cx="${w.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${p.map(w=>R`
            <text x="${w.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${y.map(w=>R`
            <circle cx="${w.cx}" cy="${w.cy}" r="7.5" fill="${w.fill}"></circle>
            ${w.label?R`
              <text x="${w.cx}" y="${w.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${w.label}</text>
            `:""}
          `)}
        </svg>
      `}}render(){if(!this.progression)return h``;const t=ce(this.progression.mood);this.style.setProperty("--active-mood-color",t);const e=this.order.map(s=>this.progression.chords[s]||this.progression.chords[0]),i=this.playInstrument==="Piano",o=i?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.";return h`
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
            ${e.map((s,r)=>{const a=this.parseChord(s.name),d=this.activeChordIndex===r;return h`
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
                  <div class="notes-line">${this.notesLineFor(a)}</div>
                </div>
              `})}
          </div>
        `:h`
          <div class="cards-grid fret-grid">
            ${e.map((s,r)=>{const a=this.parseChord(s.name),d=this.renderFretSvg(s.name,this.playInstrument==="Ukulele"),c=this.activeChordIndex===r;return h`
                <div
                  class="chord-card ${c?"lit":""}"
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
                  <div class="notes-line">${this.notesLineFor(a)}</div>
                </div>
              `})}
          </div>
        `}
      </div>
    `}};H.styles=X`
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
  `;ee([S({type:Object})],H.prototype,"progression",2);ee([S({type:Array})],H.prototype,"order",2);ee([S({type:Boolean})],H.prototype,"isAuthenticated",2);ee([S({type:String})],H.prototype,"userEmail",2);ee([S({type:Number})],H.prototype,"savedCount",2);ee([S({type:Boolean})],H.prototype,"embedded",2);ee([b()],H.prototype,"playInstrument",2);ee([b()],H.prototype,"showDegrees",2);ee([b()],H.prototype,"activeChordIndex",2);H=ee([Q("play-along-screen")],H);var Ho=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,xe=(t,e,i,o)=>{for(var s=o>1?void 0:o?Wo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Ho(e,i,s),s};let oe=class extends K{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&me.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await me.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?h``:h`
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
    `}};oe.styles=X`
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
  `;xe([S({type:Boolean})],oe.prototype,"open",2);xe([b()],oe.prototype,"mounted",2);xe([b()],oe.prototype,"isOAuthLoading",2);xe([b()],oe.prototype,"errorMessage",2);xe([li("#google-btn-container")],oe.prototype,"googleBtnContainer",2);oe=xe([Q("auth-modal")],oe);var Jo=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,O=(t,e,i,o)=>{for(var s=o>1?void 0:o?Xo(e,i):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Jo(e,i,s),s};let E=class extends K{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="loop",this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.previousScreenBeforeSets="loop",this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await me.signOut(),P.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&ve.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&Ae.some(i=>i.name===e)&&(this.playStyle=e),T.setInstrument(this.instrument),T.setPlayStyle(this.playStyle),this.unsubscribeAuth=me.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=P.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=P.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=T.subscribeTick((i,o,s,r,a)=>{this.activeIndex=i,this.progressStep=o,typeof s=="number"&&(this.activePlayingSectionIdx=s),typeof r=="number"&&(this.totalSongSteps=r),this.playing=T.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),ws().then(i=>{this.chordData=i,this.progression||(this.progression=ut(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(o,s)=>s),T.setProgression(this.progression,this.order),this.sections=ne.createInitialSong(this.progression,this.order),this.screen="loop")}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),T.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return P.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?(this.libraryOpen=!0,this.screen="loop"):t==="play-along"||t==="12a"?this.screen="play-along":t==="song"||t==="5a"?(this.screen="song",this.sections.length&&T.setSong(this.sections)):this.screen="loop"}setScreen(t){this.screen=t;const e=`#${t}`;window.location.hash!==e&&history.pushState(null,"",e)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{this.keyOverride=null,this.scaleOverride=null;const e=t?.detail?.promptText||this.activeSearchPrompt||void 0,i=await to.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),T.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),T.setPlayStyle(i.playStyle));const o=i.progression;this.progression=o,this.order=Array.from({length:o.chords.length},(s,r)=>r),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,T.setProgression(o,this.order),T.reset(),this.setScreen("loop"),this.sections=ne.createInitialSong(o,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){this.length=t.detail,this.regenerate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;const t=ut(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,T.setProgression(t,this.order),this.sections=ne.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(T.startAutoplay(),T.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let s=o.notes;(!s||s.length===0)&&(s=Y(o.name,G(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.showTheory=e.showTheory??this.showTheory,T.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=ne.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){P.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=P.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,P.saveProject(e),this.requestUpdate())}async onSyncProjects(){await P.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),T.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),T.setPlayStyle(t.detail)}onTogglePlay(){this.playing=T.togglePlay()}onTogglePlaySong(){T.setSong(this.sections),this.playing=T.togglePlay()}onChordTap(t){this.progression&&(this.playing&&(T.stopAutoplay(),this.playing=!1),T.clearABOverride(),this.swapIndex=t.detail,this.sheetMode="swap",this.alternatives=js(this.chordData,this.progression,t.detail),this.theoryGroups=Tt(this.chordData,this.progression,t.detail),this.borrowedChords=fi(this.chordData,this.progression,t.detail),this.sheetOpen=!0,T.playChordAtIndex(t.detail,.8))}onAuditionChord(t){T.auditionChord(t.detail,.8)}onSelectAlternative(t){if(!this.progression||this.swapIndex===null)return;const e=t.detail,o=[...this.progression.chords];o[this.swapIndex]=e.chord,this.progression={...this.progression,chords:o},T.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.showToast(`Swapped in ${e.chord.name}`)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null,T.clearABOverride()}onProgressionChange(t){this.progression=t.detail,T.setProgression(this.progression,this.order),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=ne.addSection(this.sections,this.progression);this.sections=t.sections,this.activeSectionIdx=t.activeIndex}onSelectSection(t){this.activeSectionIdx=t.detail}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(P.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=P.getProjects().find(r=>r.id===e),o=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s={id:e,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};P.saveProject(s),t&&P.scheduleCloudSync(),this.showToast(`Saved "${o}"`,e),this.requestUpdate()}render(){return this.currentProjectId&&P.isProjectSaved(this.currentProjectId),h`
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
    `}};E.styles=X`
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
  `;O([b()],E.prototype,"chordData",2);O([b()],E.prototype,"screen",2);O([b()],E.prototype,"libraryOpen",2);O([b()],E.prototype,"genre",2);O([b()],E.prototype,"mood",2);O([b()],E.prototype,"progression",2);O([b()],E.prototype,"activeIndex",2);O([b()],E.prototype,"progressStep",2);O([b()],E.prototype,"order",2);O([b()],E.prototype,"keyOverride",2);O([b()],E.prototype,"scaleOverride",2);O([b()],E.prototype,"playing",2);O([b()],E.prototype,"showTheory",2);O([b()],E.prototype,"instrument",2);O([b()],E.prototype,"playStyle",2);O([b()],E.prototype,"sheetOpen",2);O([b()],E.prototype,"sheetMode",2);O([b()],E.prototype,"swapIndex",2);O([b()],E.prototype,"alternatives",2);O([b()],E.prototype,"theoryGroups",2);O([b()],E.prototype,"borrowedChords",2);O([b()],E.prototype,"length",2);O([b()],E.prototype,"sections",2);O([b()],E.prototype,"activeSectionIdx",2);O([b()],E.prototype,"activePlayingSectionIdx",2);O([b()],E.prototype,"totalSongSteps",2);O([b()],E.prototype,"pendingChordSuggestion",2);O([b()],E.prototype,"userEmail",2);O([b()],E.prototype,"isAuthenticated",2);O([b()],E.prototype,"syncStatus",2);O([b()],E.prototype,"authModalOpen",2);O([b()],E.prototype,"toastMessage",2);O([b()],E.prototype,"toastUndoId",2);O([b()],E.prototype,"isGenerating",2);E=O([Q("chroma-chords-app")],E);
