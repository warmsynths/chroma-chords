import{f as Bs,u as Ps,s as bo,n as yi,F as io,l as Yo,S as Oe,P as te,G as $t,a as Fe,E as gt,C as qe,V as ft,D as He,R as _e,b as oo,M as ht,c as Wo,d as Ge,g as Rs,O as Ko,i as ce,e as de,h as g,A as Te,w as Y}from"./assets/vendor-C6HArRHJ.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const js={attribute:!0,type:String,converter:Ps,reflect:!1,hasChanged:Bs},zs=(t=js,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),o==="accessor"){const{name:r}=i;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,t,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,t,a),a}}}if(o==="setter"){const{name:r}=i;return function(a){const l=this[r];e.call(this,a),this.requestUpdate(r,l,t,!0,a)}}throw Error("Unsupported decorator location: "+o)};function x(t){return(e,i)=>typeof i=="object"?zs(t,e,i):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(t){return x({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ls=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Us(t,e){return(i,o,s)=>{const n=r=>r.renderRoot?.querySelector(t)??null;return Ls(i,o,{get(){return n(this)}})}}const at="chroma_chords_projects",_s="chord_voyager_projects";class lt{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(at);if(e||(e=localStorage.getItem(_s),e&&localStorage.setItem(at,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(at,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(at,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const n=o.get(s.id);!n||s.lastModified>n.lastModified?o.set(s.id,s):s.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem(at,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(at,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),n=document.createElement("a");n.href=s,n.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((i,o)=>{const s=new FileReader;s.onload=n=>{try{const r=n.target?.result,a=JSON.parse(r);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),i(a)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(e)})}}const Rt="chroma_chords_auth_token",Ii="chroma_chords_auth_user",Gs="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Ci(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function Vs(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Gs}}class qs{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Vs(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Rt);if(e){const i=Ci(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Rt),localStorage.removeItem(Ii),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Ci(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Ci(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Rt,e),localStorage.setItem(Ii,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const n=this.handleCredentialResponse(s.credential);i?.({success:n.success,message:n.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Rt),localStorage.removeItem(Ii)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const bt=new qs;class Hs{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const n=new AbortController,r=setTimeout(()=>n.abort(),8e3),a=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:n.signal});if(clearTimeout(r),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const l=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${l||a.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,i);const r=new AbortController,a=setTimeout(()=>r.abort(),45e3);try{const l=await fetch(`${s}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(o),signal:r.signal});if(clearTimeout(a),!l.ok){let c="";try{const d=await l.json();c=d.error||d.message||""}catch{c=await l.text().catch(()=>"")}throw new Error(`Cloud sync failed (${l.status}): ${c||l.statusText||"Unknown error"}`)}return await l.json()}catch(l){throw clearTimeout(a),l instanceof Error&&l.name==="AbortError"?new Error("Cloud sync request timed out (45s limit)"):l}}}const Js=new Hs,To="chroma_chords_deleted_projects",Eo="chroma_chords_last_sync_time",Ys="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev";function Ws(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Ys}}function Mo(t){return typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(t):null}function No(t,e){typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}class Ks{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.lastSyncError=null,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=bt.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.authenticated||(this.lastSyncError=null),this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return lt.getProjects()}isProjectSaved(e){return e?lt.getProjects().some(i=>i.id===e):!1}saveProject(e){lt.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){lt.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Mo(To);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){No(To,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(n=>n.id===e),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:e,deletedAt:s}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return Mo(Eo)}setLastSyncTime(e){No(Eo,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await bt.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||Ws();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=lt.getProjects(),n=this.getTombstones(),r=this.getLastSyncTime(),a=r?new Date(r).getTime():0,c=(r?s.filter(y=>!y.syncedToCloud||y.lastModified&&y.lastModified>a):s).map(y=>({...y,deletedAt:null})),d=await Js.sync(o,i,{sets:c,lastSyncTime:r,tombstones:n}),p=new Map;s.forEach(y=>{p.set(y.id,{...y,syncedToCloud:!0})});const u=d.tombstones||[],h=new Set(u.map(y=>y.id));(d.sets||[]).forEach(y=>{if(y.deletedAt)h.add(y.id);else{const C=p.get(y.id),S=y.lastModified||(y.updatedAt?new Date(y.updatedAt).getTime():0),I=C?.lastModified||0;(!C||S>=I)&&p.set(y.id,{id:y.id,name:y.name,lastModified:S,genre:y.genre,mood:y.mood,key:y.key,scaleType:y.scaleType,bpm:y.bpm,showTheory:y.showTheory,chords:Array.isArray(y.chords)?y.chords:[],syncedToCloud:!0})}}),h.forEach(y=>{p.delete(y)});const m=Array.from(p.values());lt.setProjects(m);const f=this.getTombstones(),b=new Set(n.map(y=>y.id)),v=f.filter(y=>!b.has(y.id));this.setTombstones(v),(d.lastSyncTime||d.syncedAt)&&this.setLastSyncTime(d.lastSyncTime||d.syncedAt),this.lastSyncError=null,this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){this.lastSyncError=s instanceof Error?s.message:String(s),console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}getLastSyncError(){return this.lastSyncError}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const R=new Ks;let $i=null,ri=null,ai=null,li=null,Tt=null,Ti=null,Ei=null,Mi=null,jt=null,Ni=null,Ai=null,Oi=null,Fi=null,zt=null,Lt=null,Ut=null,_t=null,Gt=null,Di=null,Bi=null,Pi=null,Vt=null,qt=null,Ri=null,ji=null,Ht=null,zi=null,Li=null;function vo(){return $i||($i=new Wo({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),$i}let Jt="Warm",ct=null,Ui=null,et=null,_i=null,Yt=null,tt=null,Gi=null,Vi=null,qi=null,it=null;function nt(){if(!ct){ct=new $t(1);const t=vo();Ui=new Fe({frequency:3200,type:"lowpass",rolloff:-12}),et=new $t(1),Ui.connect(et),et.connect(t),ct.connect(Ui),_i=new gt({high:3.5,mid:0,low:-.5,highFrequency:4500}),Yt=new qe({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{Yt.start()}catch{}tt=new $t(0),_i.connect(Yt),Yt.connect(tt),tt.connect(t),ct.connect(_i),Gi=new Fe({frequency:1800,type:"bandpass",Q:.8}),Vi=new ft({frequency:.5,depth:.1,wet:.4}),qi=new He({distortion:.1,wet:.15}),it=new $t(0),Gi.connect(Vi),Vi.connect(qi),qi.connect(it),it.connect(t),ct.connect(Gi)}return ct}function Et(t){nt();const e=t?t.toLowerCase().trim():"warm";Jt=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const i=.05,o=yi();try{et&&tt&&it&&(Jt==="Warm"?(et.gain.rampTo(1,i,o),tt.gain.rampTo(0,i,o),it.gain.rampTo(0,i,o)):Jt==="Glassy"?(et.gain.rampTo(0,i,o),tt.gain.rampTo(1,i,o),it.gain.rampTo(0,i,o)):Jt==="Dusty"&&(et.gain.rampTo(0,i,o),tt.gain.rampTo(0,i,o),it.gain.rampTo(1,i,o)))}catch(s){console.warn("Failed to ramp master tone:",s)}}function Xs(t="Warm",e){const i=t?t.toLowerCase().trim():"warm",o=e??Rs();if(i==="glassy"){const n=new gt({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new qe({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return n.connect(r),r.connect(o),n}if(i==="dusty"){const n=new Fe({frequency:1800,type:"bandpass",Q:.8}),r=new ft({frequency:.5,depth:.1,wet:.4}),a=new He({distortion:.1,wet:.15});return n.connect(r),r.connect(a),a.connect(o),n}const s=new Fe({frequency:3200,type:"lowpass",rolloff:-12});return s.connect(o),s}const Hi=typeof import.meta<"u"&&"./"||"./",xi=Hi.endsWith("/")?Hi:`${Hi}/`,Xo={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},Qs=`${xi}audio/samples/grand-piano/`,Qo={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},Zs=`${xi}audio/samples/stage-rhodes/`,Zo={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},en=`${xi}audio/samples/nylon-guitar/`,es={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},tn=`${xi}audio/samples/jazz-guitar/`;function on(t="piano"){let e=null,i={};if(t==="jazz-guitar"?(e=Tt,i=es):t==="guitar"?(e=li,i=Zo):t==="rhodes"||t==="epiano"?(e=ai,i=Qo):(e=ri,i=Xo),!e||!e.loaded)return null;const o=e._buffers;if(!o)return null;const s={};for(const n of Object.keys(i))try{const r=io(n).toMidi(),a=o.has(r)?o.get(r):o.has(n)?o.get(n):null;a&&typeof a.get=="function"&&a.get()&&(s[n]=a.get())}catch{}return Object.keys(s).length>0?s:null}async function sn(t="piano"){const e=rn(t);if(e.loaded)return e;try{return await Promise.race([Yo(),new Promise((i,o)=>setTimeout(()=>o(new Error("Sample load timeout")),3e3))]),e}catch(i){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,i),null}}function ts(){return ri||(ri=new Ge({urls:Xo,baseUrl:Qs,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(nt())),ri}function is(){return ai||(ai=new Ge({urls:Qo,baseUrl:Zs,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(nt())),ai}function os(){return li||(li=new Ge({urls:Zo,baseUrl:en,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(nt())),li}function ss(){if(!Tt){const t=nt();Ti=new gt({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Ei=new Fe({frequency:2800,type:"lowpass",rolloff:-12}),Mi=new _e({decay:1.8,preDelay:.02,wet:.18}),Tt=new Ge({urls:es,baseUrl:tn,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),Tt.connect(Ti),Ti.connect(Ei),Ei.connect(Mi),Mi.connect(t)}return Tt}function nn(){if(!Gt){const t=nt();Di=new ft({frequency:.45,depth:.18,wet:.65}),Bi=new He({distortion:.12,wet:.18}),Pi=new Fe({frequency:3400,type:"lowpass",rolloff:-12}),Vt=new qe({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{Vt.start()}catch{}Gt=new te(ht,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),Gt.connect(Di),Di.connect(Bi),Bi.connect(Pi),Pi.connect(Vt),Vt.connect(t)}return Gt}function rn(t){return t==="jazz-guitar"?ss():t==="guitar"?os():t==="rhodes"||t==="epiano"?is():ts()}function an(t){const e=nt();switch(t){case"organ":return jt||(Ni=new ft({frequency:5.8,depth:.12,wet:.55}),Ai=new He({distortion:.08,wet:.15}),Oi=new Fe({frequency:4500,type:"lowpass",rolloff:-12}),jt=new te(Oe,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),jt.connect(Ni),Ni.connect(Ai),Ai.connect(Oi),Oi.connect(e)),jt;case"pad-strings":if(!Lt){Fi=new _e({decay:5.5,preDelay:.03,wet:.45}),zt=new qe({frequency:.45,delayTime:4,depth:.5,wet:.4});try{zt.start()}catch{}Lt=new te(Oe,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),Lt.connect(zt),zt.connect(Fi),Fi.connect(e)}return Lt;case"juno-pad":if(!_t){Ut=new qe({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{Ut.start()}catch{}_t=new te(ht,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),_t.connect(Ut),Ut.connect(e)}return _t;case"stab":return qt||(Ri=new He({distortion:.1,wet:.12}),ji=new _e({decay:1,wet:.22}),qt=new te(ht,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),qt.connect(Ri),Ri.connect(ji),ji.connect(e)),qt;case"bell":return Ht||(zi=new gt({high:3.5,mid:-.5,low:-2,highFrequency:4800}),Li=new _e({decay:3.2,wet:.32}),Ht=new te(oo,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),Ht.connect(zi),zi.connect(Li),Li.connect(e)),Ht;case"guitar":return os();case"jazz-guitar":return ss();case"sh101":return nn();case"rhodes":case"epiano":return is();case"piano":default:return ts()}}const Pe=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],Ao={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function Ve(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(Ao[e])return Ao[e];const i=Pe.find(o=>o.name.toLowerCase()===e);return i?i.name:"Grand Piano"}const Ot=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1,isStrum:!0}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],wi={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},yo={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},ln=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function V(t){const e=Math.floor(t/12)-1,i=t%12;return`${ln[i]}${e}`}function xo(){return Promise.race([Yo(),new Promise(t=>setTimeout(t,80))])}function ns(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function rs(t,e){const i=[];for(let o=0;o<e;o++)for(const s of t){const n=s.match(/^([A-G]#?)(-?\d+)$/);if(n){const r=n[1],a=parseInt(n[2],10)+o;i.push(`${r}${a}`)}else i.push(s)}return i}function as(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Oo={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function so(t){if(!t)return;const e=t.toLowerCase().trim();return Oo[e]?Oo[e]:Pe.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function no(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Ot.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function cn(t,e=.7,i,o="piano",s){try{Promise.all([bo(),xo()]).then(()=>{const n=an(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof n.set=="function"&&n.set(s)}catch(u){console.warn("Failed to apply customConfig to Tone.js instrument:",u)}const r=t.length,a=r<=1?1:Math.max(.4,1/Math.sqrt(r)),l=yi(),c=o==="guitar"||o==="jazz-guitar",d=o==="jazz-guitar";if(i&&i.arpMode&&i.arpMode!=="off"){const u=i.bpm??80,h=i.arpRate??"1/16",m=i.arpRange??1,f=i.arpMode,b=ns(h,u),v=rs(t,m),y=as(v,f),C=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*a:a,S=(i.isStrum===!0||i.playStyle==="Strum"||h==="1/32")&&(h==="1/32"||i.isStrum===!0),I=typeof i.arpGate=="number"?Math.max(.1,Math.min(2,i.arpGate)):.85,A=1+(Math.random()-.5)*.1*(i.humanVariance??0),F=typeof i.duration=="number"&&i.duration>0?i.duration:e,$=typeof i.spread=="number"&&i.spread>0?Math.min(.045,Math.max(.02,i.spread*.04)):.028,N=S?$:b,D=Math.max(1.4,F)*(1+(Math.random()-.5)*.1*(i.humanVariance??0)),U=Math.max(.04,b*I*A);y.forEach((_,O)=>{const E=i.microTiming?(Math.random()-.5)*i.microTiming*(S?.005:.02):0,H=S?D:U;let Q=C();S&&c&&O===0&&(Q=Math.min(1,Q*(d?1.05:1.1))),n.triggerAttackRelease(_,H,l+O*N+E,Q)});return}(c?[...t].sort((u,h)=>{try{return io(u).toMidi()-io(h).toMidi()}catch{return 0}}):t).forEach((u,h)=>{let m=0,f=a,b=e;if(i){const{minVelocity:v,maxVelocity:y,spread:C,microTiming:S,humanVariance:I,duration:A}=i;f=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(v+Math.random()*(y-v))/127)*a;const $=c?h*(d?.018:.024):0,N=h*(C??.3)*.1,D=(Math.random()-.5)*(S??0)*.05,U=(Math.random()-.5)*(I??0)*.03;m=Math.max(0,$+N+D+U),b=(A||e)*(1+(Math.random()-.5)*.2*(I??0))}else c&&(m=h*(d?.018:.024));c&&h===0&&(f=Math.min(1,f*(d?1.05:1.1))),n.triggerAttackRelease(u,b,l+m,f)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function ls(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const i=[...t],s=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(s){const n=parseInt(s[2],10);i.push(`${s[1]}${n+1}`)}return i}function Fo(t,e,i){const o=e==="Unknown"||!e?"Pop":e,s=i?.instrument?Ve(i.instrument):void 0,n=s?Pe.find(v=>v.name.toLowerCase()===s.toLowerCase()):void 0,r=i?.playStyle||i?.feelSettings?.playStyle,a=r?Ot.find(v=>v.name===r):void 0,l=n?.instrument??wi[o]??"piano",c=yo[o]||{},d=a?.patch??{};i?.feelSettings?.tone&&Et(i.feelSettings.tone);const p={};if(i?.feelSettings){const{spread:v,swing:y,humanise:C,humanState:S,advOverride:I}=i.feelSettings;if(S)Object.assign(p,S);else if(typeof v=="number"&&(p.spread=parseFloat((v/100).toFixed(2))),typeof C=="number"&&(p.humanVariance=parseFloat((C/100).toFixed(2))),typeof y=="number"||typeof C=="number"){const A=typeof y=="number"?y:0,F=typeof C=="number"?C:45;p.microTiming=parseFloat((A/100*.5+F/100*.3).toFixed(2))}I&&(typeof I.spread=="number"&&(p.spread=I.spread),typeof I.duration=="number"&&(p.duration=I.duration),typeof I.humanVariance=="number"&&(p.humanVariance=I.humanVariance),typeof I.variance=="number"&&(p.humanVariance=I.variance),typeof I.microTiming=="number"&&(p.microTiming=I.microTiming),typeof I.micro=="number"&&(p.microTiming=I.micro),typeof I.arpMode=="string"&&(p.arpMode=I.arpMode),typeof I.arpRate=="string"&&(p.arpRate=I.arpRate),typeof I.arpRange=="number"&&(p.arpRange=I.arpRange),typeof I.arpGate=="number"&&(p.arpGate=I.arpGate),typeof I.minVelocity=="number"&&(p.minVelocity=I.minVelocity),typeof I.maxVelocity=="number"&&(p.maxVelocity=I.maxVelocity))}d.arpMode&&d.arpMode!=="off"&&(i?.feelSettings?.advOverride&&i.feelSettings.advOverride.arpMode!==void 0||(p.arpMode=d.arpMode,d.arpRate&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRate===void 0)&&(p.arpRate=d.arpRate),d.arpRange!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRange===void 0)&&(p.arpRange=d.arpRange))),d.isStrum!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.isStrum===void 0)&&(p.isStrum=d.isStrum);const u={...c,...d,...p,bpm:i?.bpm??c.bpm??90,playStyle:r,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},h=i?.duration??c.duration??.9,m=typeof p.duration=="number"?p.duration:d.durationMultiplier?h*d.durationMultiplier:h,f=i?.feelSettings?.density??50,b=ls(t,f);cn(b,m,u,l,i?.customConfig)}let Ji=null;function dn(){if(!Ji){const t=vo();Ji=new Oe({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return Ji}function pn(t,e=.8,i,o=.85){try{Promise.all([bo(),xo()]).then(()=>{const s=dn(),r=`${t.replace(/\d+$/,"")}1`,a=typeof i=="number"?i:yi();s.triggerAttackRelease(r,e,a,o)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function hn(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,s=(Array.isArray(t)?t:[]).filter(c=>typeof c=="string"&&c.trim().length>0).map(c=>c.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let n=o,r=i[s[0]]??0;const a=[];s.forEach((c,d)=>{const p=i[c]??0;d>0&&p<=r&&n++,a.push({name:c,oct:n}),r=p});const l=(e||"").toLowerCase();if(l.includes("octave")||l.includes("high"))return a.map(c=>`${c.name}${c.oct+1}`);if(l.includes("inversion")||l.includes("1st")){if(a.length>1){const[c,...d]=a;return[...d.map(p=>`${p.name}${p.oct}`),`${c.name}${c.oct+1}`]}return a.map(c=>`${c.name}${c.oct}`)}else return a.map(c=>`${c.name}${c.oct}`)}let Ze=null,ut=null,cs="lead-synth",ds=85,wo=!1;function un(t){cs=t,Ze&&ps(Ze,t)}function mn(t){ds=Math.max(0,Math.min(100,t)),ko()}function gn(t){wo=t,ko()}function fn(t){ko()}function ko(){ut&&(wo?ut.gain.value=0:ut.gain.value=ds/100*.9)}function ps(t,e){try{switch(e){case"warm-pluck":t.set({oscillator:{type:"triangle"},envelope:{attack:.005,decay:.2,sustain:.05,release:.3}});break;case"lofi-sine":t.set({oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.7,release:.5}});break;case"electric-lead":t.set({oscillator:{type:"sawtooth4"},envelope:{attack:.01,decay:.4,sustain:.6,release:.4}});break;case"reed-flute":t.set({oscillator:{type:"sine8"},envelope:{attack:.08,decay:.2,sustain:.8,release:.35}});break;case"lead-synth":default:t.set({oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}});break}}catch{}}function bn(){if(!Ze)try{Ze=new te(Oe,{oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}}),ut=new $t(.75);const t=vo();Ze.connect(ut),ut.connect(t),ps(Ze,cs)}catch{return null}return Ze}function ro(t,e,i,o=.85){if(!wo)try{Promise.all([bo(),xo()]).then(()=>{const s=bn();if(!s)return;const n=typeof t=="number"?V(t):t,r=typeof i=="number"?i:yi(),a=Math.max(.05,e),l=Math.max(.05,Math.min(1,o));typeof s.triggerAttackRelease=="function"&&s.triggerAttackRelease(n,a,r,l)}).catch(()=>{})}catch{}}const vn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],yn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],L={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},xn=new Set(["F","Bb","Eb","Ab","Db","Gb"]),vt=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],De={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},wn=Object.keys(De),hi={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},yt={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},xt={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},wt={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function B(t,e){const i=(t%12+12)%12;return e?yn[i]:vn[i]}function ne(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",s=e;if(i&&/[A-G]/.test(i)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(o=`${i}b`,s=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(o=`${i}#`,s=e.slice(2)):(o=i,s=e.slice(1))}s=s.toLowerCase();let n="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?n="maj9":s.includes("min9")||s.includes("m9")?n="min9":s.includes("dom9")||s.includes("9sus")||s.includes("9")?s.includes("9sus")||s.includes("sus9")?n="sus9":n="dom9":s.includes("m(maj7)")||s.includes("mmaj7")||s.includes("minmaj7")?n="mmaj7":s.includes("maj7sus")||s.includes("7sus")?n="sus7":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?n="maj7":s.includes("min7")||s.includes("m7")?n="min7":s.includes("min6")||s.includes("m6")?n="min6":s.includes("maj6")||s.includes("6")&&!s.includes("m")?n="maj6":s.includes("dim7")?n="dim7":s.includes("dim")||s.includes("°")?n="dim":s.includes("aug")||s.includes("+")?n="aug":s.includes("sus2")?n="sus2":s.includes("sus4")||s.includes("sus")?n="sus4":s.includes("7")?n="dom7":s.includes("min")||s==="m"?n="min":n="maj",{root:o,quality:n}}const kn=Object.keys(wt),Ee={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},Wt={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},dt={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},Do={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},hs=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Sn={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},In={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},So={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},Ye=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function At(t){return(Ye.find(e=>e.name===t)||Ye[0]).dot}const Cn={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function $n(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function fe(t,e){const i=t.reduce((s,n)=>s+e(n),0);let o=Math.random()*i;for(const s of t)if(o-=e(s),o<=0)return s;return t[t.length-1]}function Tn(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const ao=4,Ft=1,kt=8,En={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function us(t,e="MAJOR",i="Pop",o="Uplifting"){let n={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(n*=1.4),t==="SUBTONIC"&&(n*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(n*=1.8),t==="SUBDOMINANT"&&(n*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(n*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(n*=2),t==="SUBMEDIANT"&&(n*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(n*=2.5),t==="SUBDOMINANT"&&(n*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(n*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(n*=2.2),t==="SUBDOMINANT"&&(n*=1.8),t==="SUBMEDIANT"&&(n*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(n*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(n*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(n*=2.2),t==="SUPERTONIC"&&(n*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(n*=2),t==="SUBMEDIANT"&&(n*=1.6),t==="MEDIANT"&&(n*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(n*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.8),(So[o]||[]).includes(t)&&(n*=1.3),Math.max(.01,n)}function Je(t,e,i="MAJOR",o="Pop",s="Uplifting"){if(t===e)return .05;let r=(En[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(So[s]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function Mn(t,e,i,o,s,n,r=ao){let a=i.filter(p=>t.degrees[p]);a.length||(a=i);const l=fe(a,p=>us(p,t.type,s,n))||"TONIC",c=[l];let d=l;for(let p=1;p<r;p++){const u=p===r-1;let h=i.filter(b=>t.degrees[b]);h.length||(h=i);const m=h.filter(b=>b!==d),f=m.length?m:h;if(u){const b=fe(f,v=>{const y=Je(v,c[0],t.type,s,n),C=Je(d,v,t.type,s,n);return y*C});c.push(b)}else{const b=f.filter(C=>!c.includes(C)),v=b.length?b:f,y=fe(v,C=>Je(d,C,t.type,s,n));d=y,c.push(y)}}return c}function Dt(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function G(t,e){const{root:i,quality:o}=ne(t),s=L[i]??0,n=De[o]||De.maj,r=Dt(i,o,e);return n.map(a=>B(s+a,r))}async function Nn(){const t=typeof import.meta<"u"?"./":"/",i=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let o=await fetch(i).catch(()=>null);if((!o||!o.ok)&&(o=await fetch("/chroma_chords_data.json").catch(()=>null)),(!o||!o.ok)&&(o=await fetch("./chroma_chords_data.json").catch(()=>null)),!o||!o.ok)throw new Error(`HTTP error: ${o?o.status:"failed to fetch chroma_chords_data.json"}`);const s=await o.json();return Pn(s),s}const An={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},On={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Fn={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Dn={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Bn={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},ms={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Pn(t){const e=[["MIXOLYDIAN",An],["DORIAN",On],["LYDIAN",Fn]];for(const[i,o]of e)for(const[s,n]of Object.entries(o)){const r=t.scales[`${n}_MAJOR`];if(!r)continue;const a=`${s}_${i}`,l={};for(const c of ms[i]){const d=Bn[`${i}_${c}`],p=r.degrees[d];if(!p)continue;const u=JSON.parse(JSON.stringify(p));u.next_chord_options=(u.next_chord_options||[]).map(h=>{if(h.nodeId.startsWith(`${n}_MAJOR_`)){const m=h.nodeId.replace(`${n}_MAJOR_`,""),f=Dn[`${i}_${m}`];if(f)return{name:h.name,nodeId:`${s}_${i}_${f}`}}return h}),l[c]=u}t.scales[a]={root:s,type:i,degrees:l}}}const Rn=[156,192,236],jn=[242,115,95];function ci(t,e,i){return t+(e-t)*i}function St(t){const e=Math.max(0,Math.min(1,t));return"#"+Rn.map((o,s)=>Math.round(ci(o,jn[s],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function ie(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(ci(84,128,e)),radius:Math.round(ci(40,12,e)),fontSize:Math.round(ci(21,30,e)),color:St(e)}}function ui(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function Ue(t,e,i,o){const n=i.degrees[e].chord_name,r=xt[e]??.5,a=wt[i.type]||wt.MAJOR;return{name:lo(n),tag:hi[e]||"move",roman:a[e]||"?",color:St(r),functionLabel:yt[e]||e,notes:G(n,o),scaleLabel:`${i.root} ${Ee[i.type]||i.type}`,desc:ui(yt[e]||e,Ee[i.type]||i.type,lo(n)),degree:e,scaleKey:t,tension:r}}function lo(t){const{root:e,quality:i}=ne(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const zn={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function gs(t,e){let i=zn[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function mi(t,e,i,o){const s=Math.max(Ft,Math.min(kt,o?.length??ao)),n=Sn[e]||"MAJOR",r=In[i],a=o?.scaleType||(r&&n==="MAJOR"?r:n);let l=o?.key&&vt.includes(o.key)?o.key:Tn(vt),c=`${l}_${a}`;t.scales[c]||(l="C",c=`${l}_${a}`);let d=t.scales[c];if(!d){const C=Object.keys(t.scales).find(S=>S.endsWith(`_${a}`))||Object.keys(t.scales)[0];d=t.scales[C],l=d?d.root:"C",c=C}const p=z(l,a),u=Object.keys(d.degrees),h=So[i]||[],m=Cn[a]||[],f=s===ao?m.filter(C=>C.degrees.every(S=>u.includes(S))):[],y=(f.length&&Math.random()<.25?fe(f,C=>$n(C,h)).degrees:Mn(d,c,u,h,e,i,s)).map(C=>Ue(c,C,d,p));return{genre:e,mood:i,key:l,scaleType:a,bpm:gs(e,i),chords:y}}function Ln(t,e,i,o=[]){const s=t.chords.length,n=Math.max(Ft,Math.min(kt,e));if(n===s)return{progression:t,cachedTailChords:[...o]};if(n<s){const N=t.chords.slice(0,n),D=t.chords.slice(n);return{progression:{...t,chords:N},cachedTailChords:[...D,...o]}}const r=[...t.chords],a=[...o],l=n-s,c=[];for(;c.length<l&&a.length>0;)c.push(a.shift());const d=[...r,...c],p=n-d.length;if(p<=0)return{progression:{...t,chords:d},cachedTailChords:a};const u=t.key||"C",h=t.scaleType||"MAJOR";let m=`${u}_${h}`,f=i.scales?.[m];if(!f&&i.scales&&Object.keys(i.scales).length>0){const N=Object.keys(i.scales).find(D=>D.endsWith(`_${h}`))||Object.keys(i.scales)[0];f=i.scales[N],m=N}if(!f)return{progression:{...t,chords:d},cachedTailChords:a};const b=z(f.root||u,h),v=Object.keys(f.degrees);let y=v.filter(N=>f.degrees[N]);y.length||(y=v);const C=N=>{if(!N)return"TONIC";if(N.degree&&f.degrees[N.degree])return N.degree;for(const[D,U]of Object.entries(f.degrees))if(U.chord_name===N.name)return D;return"TONIC"},S=d[d.length-1];let I=C(S);const A=d[0],F=C(A),$=[];for(let N=0;N<p;N++){const D=N===p-1,U=y.filter(E=>E!==I),_=U.length?U:y;let O;D?O=fe(_,E=>{const H=Je(E,F,f.type,t.genre,t.mood),Q=Je(I,E,f.type,t.genre,t.mood);return H*Q})||_[0]:O=fe(_,E=>Je(I,E,f.type,t.genre,t.mood))||_[0],I=O,$.push(Ue(m,O,f,b))}return{progression:{...t,chords:[...d,...$]},cachedTailChords:a}}const Un={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},_n={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function fs(t){return De[t]?t:ne(`C${t||""}`).quality}function Io(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function gi(t,e){const i=Un[t]||{upper:"I",lower:"i"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return Io(s,e)}function ki(t,e){const i=_n[(t%12+12)%12]||{upper:"?",lower:"?"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return Io(s,e)}function Gn(t,e,i,o){const s=e==="maj"||e==="dom7"||e==="dom9",n=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&n)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=xt[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${o.root} ${Ee[o.type]||o.type} progression.`}}function Si(t,e,i,o){const s=(t%12+12)%12,n=(L[i]??0)+s,a=`${B(n,o)}${Co[e]??e}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${a} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${a} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${a} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${a} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${a} borrows its color from outside the current key.`}}function Vn(t,e,i,o,s){const n=i.degrees[e],{root:r}=ne(n.chord_name),a=L[r]??0,l=B(a,s),c=`${l}${Co[o]??o}`,d=Dt(l,o,s),p=De[o]?De[o].map(m=>B(a+m,d)):G(n.chord_name,s),u=gi(e,o),h=Gn(e,o,c,i);return{name:c,tag:h.tag,roman:u,color:St(h.tension),functionLabel:h.functionLabel,notes:p,scaleLabel:`${i.root} ${Ee[i.type]||i.type}`,desc:h.desc,degree:e,scaleKey:t,tension:h.tension}}function co(t,e,i,o,s,n){const r=`${e}_${i}`,a=t.scales[r];if(!a||!o.length)return null;const l=z(e,i),c=L[e]??0,d={};Object.entries(a.degrees).forEach(([u,h])=>{const{root:m}=ne(h.chord_name),f=L[m]??0;f in d||(d[f]=u)});const p=o.slice(0,kt).map(({root:u,quality:h})=>{const m=L[u]??c,f=d[m],b=fs(h);if(f){const S=a.degrees[f],{quality:I}=ne(S.chord_name);return b===I||!h&&I?Ue(r,f,a,l):Vn(r,f,a,b,l)}const v=(m-c+12)%12,y=Si(v,b,e,l),C=ki(v,b);return qn(e,v,b,y.functionLabel,C,y.tag,l)});return p.length<Ft?null:{genre:s,mood:n,key:e,scaleType:i,bpm:gs(s,n),chords:p}}const Co={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function qn(t,e,i,o,s,n,r){const a=(L[t]??0)+e,l=B(a,r),c=fs(i),d=`${l}${Co[c]??c}`,p=Dt(l,c,r),u=(De[c]||De.maj).map(f=>B(a+f,p)),h=s==="?"?ki(e,c):s,m=.42;return{name:d,tag:n,roman:h,color:St(m),functionLabel:o==="Borrowed"?Si(e,c,t,r).functionLabel:o,notes:u,scaleLabel:"Borrowed",desc:`${d} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:m}}function po(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}function di(t){const e=(t||"C").trim(),i=e[0]?.toUpperCase()||"C";let o=i,s=e.slice(1);if(e.length>1){const n=e[1];n==="b"||n==="B"||n==="♭"||n==="♭"?(o=`${i}b`,s=e.slice(2)):(n==="#"||n==="♯"||n==="♯")&&(o=`${i}#`,s=e.slice(2))}return{root:o,suffix:s}}function bs(t,e,i){const{root:o,suffix:s}=di(t),n=o.replace("♭","b").replace("♯","#"),a=(((L[n]??0)+e)%12+12)%12;return`${B(a,i)}${s}`}function Bo(t,e,i){if(!t||!t.chords||t.chords.length===0)return t;const o=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),s=/\bmaj\b|major/i.test(e),n=o&&!s,r=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),a=i||(n?"NATURAL_MINOR":s?"MAJOR":t.scaleType||"MAJOR"),l=r,c=(t.key||"C").replace("♭","b").replace("♯","#").trim(),d=L[c]??0,p=L[l]??0,u=((p-d)%12+12)%12,h=z(l,a),m=`${l}_${a}`,f=dt[a]||dt.MAJOR,b=t.chords.map(v=>{const y=bs(v.name,u,h),{root:C,quality:S}=ne(y),A=(((L[C]??0)-p)%12+12)%12;let F=null;for(const[E,H]of Object.entries(f))if(H===A){F=E;break}let $,N,D=v.tag||"move",U=v.tension,_=v.degree;if(F)_=F,$=gi(_,S),N=yt[_]||_,D=hi[_]||D,U=xt[_]??U;else{_="BORROWED",$=ki(A,S);const E=Si(A,S,l,h);N=E.functionLabel,D=E.tag||D,U=E.tension||.45}const O=G(y,h);return{...v,name:y,roman:$,functionLabel:N,tag:D,notes:O,degree:_,scaleKey:m,scaleLabel:`${l} ${Ee[a]||a}`,desc:ui(N,Ee[a]||a,y),tension:U}});return{...t,key:l,scaleType:a,chords:b}}function Hn(t,e,i,o){if(t==="sus4"||t==="sus2"||t==="sus7"||t==="sus9")return t;const s=t.includes("7"),n=t.includes("9"),r=t.includes("6");return e==="min"?n?"min9":s?i==="TONIC"&&(o==="HARMONIC_MINOR"||o==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":r?"min6":"min":e==="maj"?n?i==="DOMINANT"?"dom9":"maj9":s?i==="DOMINANT"?"dom7":"maj7":r?"maj6":"maj":e==="dim"?s?"dim7":"dim":e==="aug"?"aug":e}function Jn(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;default:return`${t}${e}`}}function Yn(t,e){if(!t||!t.chords||t.chords.length===0)return t;const i=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=(e||i).toUpperCase().replace(/\s+/g,"_"),s=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=L[s]??0,r=z(s,o),a=`${s}_${o}`,l=Wt[i]||Wt.MAJOR,c=dt[i]||dt.MAJOR,d=Wt[o]||Wt.MAJOR,p=dt[o]||dt.MAJOR,u=Do[o]||Do.MAJOR,h=t.chords.map(m=>{const{root:f,quality:b}=ne(m.name),y=(((L[f]??0)-n)%12+12)%12;let C=-1;if(m.degree&&m.degree!=="BORROWED"&&(C=l.indexOf(m.degree)),C===-1)for(let S=0;S<l.length;S++){const I=l[S];if(c[I]===y){C=S;break}}if(C>=0&&C<d.length){const S=d[C],I=p[S],A=(n+I)%12,F=B(A,r),$=u[S]||"maj",N=Hn(b,$,S,o),D=Jn(F,N),U=G(D,r),_=wt[o]?.[S];let O;if(_)if(N==="maj"||N==="min")O=_;else{const oe=_.replace(/[°+]/g,"");O=Io(oe,N)}else O=gi(S,N);const E=yt[S]||S,H=hi[S]||m.tag||"move",Q=xt[S]??m.tension;return{...m,name:D,roman:O,functionLabel:E,tag:H,notes:U,degree:S,scaleKey:a,scaleLabel:`${s} ${Ee[o]||o}`,desc:ui(E,Ee[o]||o,D),tension:Q}}else{let S=null;for(const[I,A]of Object.entries(p))if(A===y){S=I;break}if(S){const I=gi(S,b),A=yt[S]||S,F=hi[S]||m.tag||"move",$=xt[S]??m.tension,N=G(m.name,r);return{...m,roman:I,functionLabel:A,tag:F,notes:N,degree:S,scaleKey:a,scaleLabel:`${s} ${Ee[o]||o}`,desc:ui(A,Ee[o]||o,m.name),tension:$}}else{const I=ki(y,b),A=Si(y,b,s,r),F=G(m.name,r);return{...m,roman:I,functionLabel:A.functionLabel,tag:A.tag||m.tag,tension:A.tension||.45,notes:F,degree:"BORROWED",scaleKey:a,scaleLabel:"Borrowed",desc:`${m.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:o,chords:h}}const Po={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function vs(t,e,i,o){const s=L[t]??0;let n=Po[e]||Po.Major;return i==="6th"?n=[...n,9]:i==="7th (dom / m7)"?n=[...n,10]:i==="Major 7th (M7)"?n=[...n,11]:i==="9th"&&(n=[...n,10,14]),n.map(r=>B(s+r,o))}const Wn={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Kn={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function ys(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Wn[e]??""}${Kn[i]??""}`}const Xn={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},xs={};vt.forEach(t=>{xs[L[t]]=t});function Qn(t,e){const i=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=Xn[i]??0,n=(((L[t]??0)-o)%12+12)%12;return xs[n]??"C"}function z(t,e){const i=Qn(t,e);return xn.has(i)||i.includes("b")}function pi(t,e,i){const o=po(t.name),s=o.includes("b"),n=ys(o,e,i),r=vs(o,e,i,s);let a=t.roman||"";if(a){const d=a.match(/^([♭♯b#]*)([ivxIVX]+)/);if(d){const p=d[1],u=d[2],h=e==="Minor"||e==="Diminished",m=h?u.toLowerCase():u.toUpperCase();let f="";e==="Diminished"?f=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?f="sus4":i==="6th"?f="6":i==="7th (dom / m7)"?f="7":i==="Major 7th (M7)"?f=h?"m(maj7)":"maj7":i==="9th"&&(f=h?"m9":"maj9"),a=`${p}${m}${f}`}}const l=t.initialChord?.tension??t.tension??.1,c=t.initialChord?.color??t.color??St(l);return{...t,name:n,notes:r,roman:a,tension:l,color:c}}function q(t,e,i,o,s,n,r,a){const l=ys(t,e,i),c=vs(t,e,i,a);return{name:l,tag:o||"sub",roman:o,color:St(r),functionLabel:s,notes:c,scaleLabel:"Substitution",desc:n,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function ho(t,e,i){const o=L[e.key]??0,s=e.scaleType.includes("MINOR"),n=z(e.key,e.scaleType),r=s?[(()=>{const d=B(o+1,!0),p=q(d,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:p.name,roman:"♭II",notes:p.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:p,tension:.6}})(),(()=>{const d=B(o+5,!0),p=q(d,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — deeper minor mood",chord:p,tension:.45}})(),(()=>{const d=B(o+10,!0),p=q(d,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:p.name,roman:"v",notes:p.notes,sub:"a step further into shadow — unresolving drift",chord:p,tension:.52}})()]:[(()=>{const d=B(o+8,!0),p=q(d,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:p.name,roman:"♭VI",notes:p.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:p,tension:.5}})(),(()=>{const d=B(o+5,!0),p=q(d,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — softer, sadder",chord:p,tension:.42}})(),(()=>{const d=B(o+3,!0),p=q(d,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:p.name,roman:"♭III",notes:p.notes,sub:"a step further out — cooler, more remote",chord:p,tension:.58}})()],a=[(()=>{const d=B(o+7,n),p=B(o+2,n),u=q(p,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${d}7 — sharpens the approach`,.82,n);return{name:u.name,roman:"V7/V",notes:u.notes,sub:`aimed at ${d}7 — sharpens the approach`,chord:u,tension:.82}})(),(()=>{const d=B(o+(s?3:9),n),p=B(o+4,n),u=q(p,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${d}m7 — makes it feel arrived at`,.88,n);return{name:u.name,roman:"V7/vi",notes:u.notes,sub:`aimed at ${d}m7 — makes it feel arrived at`,chord:u,tension:.88}})(),(()=>{const d=B(o+1,!0),p=q(d,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:p.name,roman:"subV7",notes:p.notes,sub:"a tritone substitute — slides in sideways",chord:p,tension:.95}})()],l=[(()=>{const d=B(o+5,n),p=q(d,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,n);return{name:p.name,roman:"IV",notes:p.notes,sub:"floats rather than resolving",chord:p,tension:.3}})(),(()=>{const d=B(o,n),p=q(d,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,n);return{name:p.name,roman:s?"im9":"Imaj9",notes:p.notes,sub:"the same home with more air in it",chord:p,tension:.18}})(),(()=>{const d=B(o+(s?3:4),n),p=q(d,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,n);return{name:p.name,roman:s?"♭III":"iii",notes:p.notes,sub:"wistful, halfway between home and away",chord:p,tension:.35}})()],c=[(()=>{const d=B(o,n),p=q(d,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,n);return{name:p.name,roman:s?"i":"I",notes:p.notes,sub:"full resolution — the sense of arriving",chord:p,tension:.05}})(),(()=>{const d=B(o+7,n),p=q(d,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,n);return{name:p.name,roman:"V7",notes:p.notes,sub:"the pull that makes home feel earned",chord:p,tension:1}})(),(()=>{const d=B(o+(s?8:9),n),p=q(d,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,n);return{name:p.name,roman:s?"♭VI":"vi",notes:p.notes,sub:"a soft landing instead of a full stop",chord:p,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:a},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:l},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:c}]}function fi(t,e,i){const o=L[e.key]??0,s=e.scaleType.includes("MINOR"),n=z(e.key,e.scaleType),r=e.chords;if(s){const f=r[0]?.name||"chord 1",b=r[1]?.name||"chord 2",v=r[2]?.name||"chord 3",y=r[3]?.name||"chord 4",C=q(B(o,n),"Major","None","I","Major tonic","same root, turned bright",.2,n),S=q(B(o+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n),I=q(B(o+9,n),"Minor","None","vi","Submediant","melodic lift upward",.4,n),A=q(B(o+11,n),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,n);return[{name:C.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:C.notes,chord:C,tension:.2},{name:S.name,sub:`in place of ${b} · the Dorian lift, sunny and open`,roman:"IV",notes:S.notes,chord:S,tension:.35},{name:I.name,sub:`in place of ${v} · melodic lift upward`,roman:"vi",notes:I.notes,chord:I,tension:.4},{name:A.name,sub:`in place of ${y} · classical harmonic pull`,roman:"vii°",notes:A.notes,chord:A,tension:.55}]}const a=r[0]?.name||"chord 1",l=r[1]?.name||"chord 2",c=r[2]?.name||"chord 3",d=r[3]?.name||"chord 4",p=q(B(o,n),"Minor","None","i","Tonic minor","same root, turned sad",.3,n),u=q(B(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),h=q(B(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),m=q(B(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:p.name,sub:`in place of ${a} · same root, turned sad`,roman:"i",notes:p.notes,chord:p,tension:.3},{name:u.name,sub:`in place of ${l} · the lift, but heavier`,roman:"iv",notes:u.notes,chord:u,tension:.4},{name:h.name,sub:`in place of ${c} · big and cinematic`,roman:"♭VI",notes:h.notes,chord:h,tension:.45},{name:m.name,sub:`in place of ${d} · lands sideways, not home`,roman:"♭VII",notes:m.notes,chord:m,tension:.5}]}const Zn={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},er={m8:43303,circuit:43302};function tr(t,e,i){let o=Zn[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${er[e]}/`);const s=i&&i.length>0?i.map(l=>t.chords[l]).filter(l=>!!l):t.chords,n=s.map(l=>encodeURIComponent(l.name)).join("+");if(e==="circuit"){const l=u=>{const h=(u||"").toLowerCase();return h.includes("octave")||h.includes("high")||h.includes("up")?"octave":h.includes("inversion")||h.includes("1st")?"1st":"root"},c=s.map(u=>l(u.voicing)).join("+"),d=encodeURIComponent(t.key||"C"),p=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${o}?p=${n}&v=${c}&key=${d}&scale=${p}`}const r=l=>{const c=(l||"").toLowerCase();return c.includes("octave")||c.includes("high")||c.includes("up")?"octave":c.includes("inversion")||c.includes("1st")?"inv1":"root"},a=s.map(l=>r(l.voicing)).join("+");return`${o}?p=${n}&v=${a}`}function ir(t,e,i,o){const s=`${t}_${e}`;let n=i.scales[s];if(!n){const d=Object.keys(i.scales).find(p=>p.endsWith(`_${e}`))||Object.keys(i.scales)[0];n=i.scales[d]||{root:t,type:e,degrees:{}}}const r=z(t,e),a=wt[e]||wt.MAJOR,l=ms[e]||["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],c=new Set(o?.chords.map(d=>d.name.toUpperCase())||[]);return l.map(d=>{const p=n.degrees[d],u=p?p.chord_name:t,h=lo(u),m=a[d]||"?",f=yt[d]||d,b=xt[d]??.5,v=G(u,r),y=c.has(h.toUpperCase());return{degreeKey:d,roman:m,chordName:h,functionLabel:f,notes:v,tension:b,isUsedInLoop:y}})}const or={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function ws(t,e){const{root:i,quality:o}=ne(t),s=L[i]??0,n=De[o]||De.maj,r=Dt(i,o,e);return n.map(a=>{const l=B(s+a,r),c=or[a]||{symbol:`+${a}`,name:`Interval ${a}`,isGuideTone:!1};return{note:l,intervalSymbol:c.symbol,roleName:c.name,isGuideTone:c.isGuideTone}})}function ks(t){if(!t||t.length<2)return[];const e=[],i=o=>o.replace(/[^A-Za-z♭♯]/g,"");for(let o=0;o<t.length;o++){const s=o,n=(o+1)%t.length,r=t[s],a=t[n],l=i(r.roman),c=i(a.roman),d=s+1,p=n+1,u=`Bar ${d} → ${p}`,h=`${r.name} → ${a.name}`,m=`${r.roman}–${a.roman}`;(l==="V"||l==="v")&&(c==="I"||c==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name}):(l==="IV"||l==="iv")&&(c==="I"||c==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name}):(l==="V"||l==="v")&&(c==="vi"||c==="♭VI"||c==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name}):l==="♭VII"&&(c==="I"||c==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${a.name} (♭VII–${a.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name}):(c==="V"||c==="v")&&l!=="V"&&l!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${a.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,move:h,degrees:m,bars:u,fromBar:d,toBar:p,fromChord:r.name,toChord:a.name})}return e}function Ss(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const o=i,s=(i+1)%t.length,n=t[o],r=t[s],a=new Set(n.notes.map(b=>L[b]??0)),l=r.notes.filter(b=>a.has(L[b]??-1)),c=L[po(n.name)]??0,d=L[po(r.name)]??0,p=Math.min((d-c+12)%12,(c-d+12)%12);let u="Harmonic Shift";l.length>=2?u=`Strong Common Tones (${l.length} shared)`:p<=2?u="Stepwise Bass Motion":(p===5||p===7)&&(u="4th / 5th Cycle Jump");const h=`Bar ${o+1} → ${s+1}`,m=`${n.name} → ${r.name}`,f=l.length?`${l.join(" · ")} held over`:p<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:o+1,toBar:s+1,fromChord:n.name,toChord:r.name,move:h,chords:m,link:f,hasShared:l.length>0,commonNotes:l,semitoneDistance:p,motionType:u})}return e}function se(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=e[o]??0,n=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+s))}function Is(t,e,i,o=1,s){const n=e&&e.length>0?e.map(y=>t.chords[y]).filter(y=>!!y):t.chords,r=t.bpm||120,a=o*240/r,l=i?Ot.find(y=>y.name.toLowerCase()===i.toLowerCase()):void 0,c=yo[t.genre]||{},d=l?.patch??{},p={...c,...d,...s?.humanState??{}},u=c.duration??.9,h=d.durationMultiplier?u*d.durationMultiplier:u,m=s?.humanState?.strum!==void 0?s.humanState.strum/100*1.5:s?.spread!==void 0?s.spread/100*1.5:c.spread??.3,f=s?.humanState?.swing!==void 0?s.humanState.swing:s?.swing??0,b=s?.density??50,v=[];return n.forEach((y,C)=>{const S=f/100*.04*(C%2===1?1:0),I=C*a+S,A=y.notes&&y.notes.length>0?y.notes:["C","E","G"];let F=uo(A,4);if(F=ls(F,b),p.arpMode&&p.arpMode!=="off"){const $=p.arpRate??"1/16",N=p.arpRange??1,D=p.arpMode,U=ns($,r),_=rs(F,N),O=as(_,D),E=p.duration?p.duration:Math.max(.6,h);O.forEach((H,Q)=>{const oe=I+Q*U;v.push({note:H,midi:se(H),startTime:oe,duration:E})})}else{const $=s?.humanState?.instrument||void 0,N=$?Ve($):void 0,D=N?Pe.find(O=>O.name.toLowerCase()===N.toLowerCase())?.instrument??"piano":wi[t.genre]??"piano",U=D==="guitar"||D==="jazz-guitar",_=D==="jazz-guitar";F.forEach((O,E)=>{const Q=(U?E*(_?.018:.024):0)+E*m*.1,oe=I+Q;v.push({note:O,midi:se(O),startTime:oe,duration:U?Math.max(h,1.2):h})})}}),v}function sr(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function Yi(t,e,i,o,s=480){const n=[];if(o){const u=Math.round(6e7/o);n.push(0),n.push(255,81,3),n.push(u>>16&255,u>>8&255,u&255)}n.push(0),n.push(255,3,t.length);for(let u=0;u<t.length;u++)n.push(t.charCodeAt(u));const r=Math.max(0,Math.min(15,i)),a=144|r,l=128|r;let c=0;e.forEach(u=>{const h=Math.max(0,u.tick-c);c=u.tick,n.push(...sr(h)),u.type==="on"?n.push(a,u.midi,u.velocity??80):n.push(l,u.midi,0)}),n.push(0),n.push(255,47,0);const d=n.length;return[...[77,84,114,107,d>>24&255,d>>16&255,d>>8&255,d&255],...n]}function nr(t,e,i=480){const o=t.length,n=[77,84,104,100,0,0,0,6,0,e&&o>1?1:0,o>>8&255,o&255,i>>8&255,i&255],r=n.length+t.reduce((c,d)=>c+d.length,0),a=new Uint8Array(r);a.set(n,0);let l=n.length;for(const c of t)a.set(c,l),l+=c.length;return a}function rr(t,e,i=480,o){const s=[];if(!t||!t.notes||t.notes.length===0)return s;const n=t.notes.reduce((r,a)=>Math.max(r,a.barIndex),0);for(let r=0;r<=n;r++){const a=t.notes.filter(d=>d.barIndex===r);if(!a.length)continue;const l=r*o;Ce.applyHumanFeel(a,t.feelSettings,e).forEach(d=>{const p=l+d.time,u=Math.round(p/(60/e)*i),h=Math.max(1,Math.round(d.duration/(60/e)*i)),m=se(d.note);s.push({tick:u,type:"on",midi:m,velocity:d.velocity}),s.push({tick:u+h,type:"off",midi:m})})}return s.sort((r,a)=>r.tick!==a.tick?r.tick-a.tick:r.type!==a.type?r.type==="off"?-1:1:r.midi-a.midi),s}function ar(t,e,i={}){const{target:o=e&&e.notes?.length?"both":"chords",order:s,playStyleName:n,barsPerChord:r=1,feelSettings:a}=i,l=t.bpm||120,c=480,d=r*240/l,p=[],u=o==="chords"||o==="both",h=(o==="melody"||o==="both")&&e&&e.notes?.length;if(u){const m=Is(t,s,n,r,a),f=[];m.forEach(b=>{const v=Math.round(b.startTime/(60/l)*c),y=Math.max(1,Math.round(b.duration/(60/l)*c));f.push({tick:v,type:"on",midi:b.midi,velocity:80}),f.push({tick:v+y,type:"off",midi:b.midi})}),f.sort((b,v)=>b.tick!==v.tick?b.tick-v.tick:b.type!==v.type?b.type==="off"?-1:1:b.midi-v.midi),p.push(Yi("Chords",f,0,l,c))}if(h&&e){const m=rr(e,l,c,d);p.push(Yi("Melody",m,1,u?void 0:l,c))}return p.length===0&&p.push(Yi("Chroma Chords",[],0,l,c)),nr(p,o==="both")}function lr(t,e,i={}){const o=ar(t,e,i),s=new Blob([o],{type:"audio/midi"}),n=(t.key||"C").toLowerCase(),r=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),a=t.bpm||120,c=`chroma-${i.target||(e&&e.notes?.length?"both":"chords")}-${n}-${r}-${a}bpm.mid`;$o(s,c)}function cr(t,e,i="Warm",o){const s=new Wo({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),n=Xs(i,s),r=t?Ve(t):void 0;switch((r?Pe.find(c=>c.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(e?wi[e]:void 0)??"piano"){case"bell":{const c=new gt({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(n),d=new _e({decay:3.2,wet:.32}).connect(c);return new te(oo,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(d)}case"organ":{const c=new Fe({frequency:4500,type:"lowpass",rolloff:-12}).connect(n),d=new He({distortion:.08,wet:.15}).connect(c),p=new ft({frequency:5.8,depth:.12,wet:.55}).connect(d);return new te(Oe,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(p)}case"pad-strings":{const c=new _e({decay:5.5,preDelay:.03,wet:.45}).connect(n),d=new qe({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(c);return new te(Oe,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(d)}case"juno-pad":{const c=new qe({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(n);return new te(ht,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(c)}case"stab":{const c=new He({distortion:.1,wet:.12}).connect(n),d=new _e({decay:1,wet:.22}).connect(c);return new te(ht,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(d)}case"jazz-guitar":{const c=new gt({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(n),d=new Fe({frequency:2800,type:"lowpass",rolloff:-12}).connect(c),p=new _e({decay:1.8,preDelay:.02,wet:.18}).connect(d);return o&&Object.keys(o).length>0?new Ge({urls:o,volume:-8}).connect(p):new te(Oe,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(p)}case"sh101":{const c=new qe({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(n),d=new Fe({frequency:3400,type:"lowpass",rolloff:-12}).connect(c),p=new He({distortion:.12,wet:.18}).connect(d),u=new ft({frequency:.45,depth:.18,wet:.65}).connect(p);return new te(ht,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(u)}case"guitar":return o&&Object.keys(o).length>0?new Ge({urls:o,volume:-8}).connect(n):new te(Oe,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(n);case"rhodes":case"epiano":return o&&Object.keys(o).length>0?new Ge({urls:o,volume:-10}).connect(n):new te(oo,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(n);case"piano":default:return o&&Object.keys(o).length>0?new Ge({urls:o,volume:-9}).connect(n):new te(Oe,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(n)}}function Cs(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,s=o/8,n=e*s,r=t.length*e*s,a=new ArrayBuffer(44+r),l=new DataView(a),c=(u,h)=>{for(let m=0;m<h.length;m++)l.setUint8(u+m,h.charCodeAt(m))};c(0,"RIFF"),l.setUint32(4,36+r,!0),c(8,"WAVE"),c(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,e,!0),l.setUint32(24,i,!0),l.setUint32(28,i*n,!0),l.setUint16(32,n,!0),l.setUint16(34,o,!0),c(36,"data"),l.setUint32(40,r,!0);const d=[];for(let u=0;u<e;u++)d.push(t.getChannelData(u));let p=44;for(let u=0;u<t.length;u++)for(let h=0;h<e;h++){const m=Math.max(-1,Math.min(1,d[h][u])),f=m<0?m*32768:m*32767;l.setInt16(p,f,!0),p+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function dr(t,e,i,o,s=1,n){const r=Is(t,e,o,s,n);if(!r.length)return;const a=e&&e.length>0?e.map(I=>t.chords[I]).filter(I=>!!I):t.chords,l=t.bpm||120,c=s*240/l,d=Math.max(.1,a.length*c),p=i?Ve(i):void 0,h=(p?Pe.find(I=>I.name.toLowerCase()===p.toLowerCase()):void 0)?.instrument??(t.genre?wi[t.genre]:void 0)??"piano";await sn(h);const m=on(h),f=n?.tone||"Warm",b=await Ko(async()=>{const I=cr(p||i,t.genre,f,m);r.forEach(A=>{A.startTime<d&&I.triggerAttackRelease(A.note,A.duration,A.startTime)})},d),v=Cs(b.get()),y=(t.key||"C").toLowerCase(),C=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),S=`chroma-chords-${y}-${C}-${l}bpm.wav`;$o(v,S)}async function pr(t,e,i,o={}){const{order:s,instrumentName:n,playStyleName:r,barsPerChord:a=1,feelSettings:l}=o,c=e.bpm||120,d=(e.key||"C").toLowerCase(),p=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-");if((t==="chords"||t==="both")&&await dr(e,s,n,r,a,l),(t==="melody"||t==="both")&&i&&i.notes?.length){const u=s&&s.length>0?s.map(y=>e.chords[y]).filter(y=>!!y):e.chords,h=a*240/c,m=Math.max(.1,u.length*h),f=await Ko(async()=>{const y=new te(Oe,{oscillator:{type:"sine"},envelope:{attack:.01,decay:.15,sustain:.6,release:.2}}).toDestination(),C=i.notes.reduce((S,I)=>Math.max(S,I.barIndex),0);for(let S=0;S<=C;S++){const I=i.notes.filter($=>$.barIndex===S);if(!I.length)continue;const A=S*h;Ce.applyHumanFeel(I,i.feelSettings,c).forEach($=>{const N=A+$.time;N<m&&y.triggerAttackRelease($.note,$.duration,N,$.velocity/127)})}},m),b=Cs(f.get()),v=`chroma-melody-${d}-${p}-${c}bpm.wav`;$o(b,v)}}function $o(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}const Wi={Pop:{humanVariance:.15,swing:0,velocityDrift:.25,gateRatio:.85,glide:0},Rock:{humanVariance:.35,swing:10,velocityDrift:.45,gateRatio:.9,glide:.02},"Lo-Fi":{humanVariance:.65,swing:45,velocityDrift:.4,gateRatio:.75,glide:.04},"Neo-Soul":{humanVariance:.5,swing:55,velocityDrift:.35,gateRatio:.95,glide:.03},EDM:{humanVariance:.05,swing:0,velocityDrift:.1,gateRatio:.7,glide:.05},Ambient:{humanVariance:.3,swing:0,velocityDrift:.2,gateRatio:1.3,glide:.08}};function hr(t){const e=Object.keys(Wi).find(i=>i.toLowerCase()===t.toLowerCase());return Wi[e||"Pop"]||Wi.Pop}const Ro={MAJOR:[0,2,4,5,7,9,11],MINOR:[0,2,3,5,7,8,10],NATURAL_MINOR:[0,2,3,5,7,8,10],DORIAN:[0,2,3,5,7,9,10],MIXOLYDIAN:[0,2,4,5,7,9,10],LYDIAN:[0,2,4,6,7,9,11],PHRYGIAN:[0,1,3,5,7,8,10],LOCRIAN:[0,1,3,5,6,8,10],HARMONIC_MINOR:[0,2,3,5,7,8,11],MELODIC_MINOR:[0,2,3,5,7,9,11],MAJOR_PENTATONIC:[0,2,4,7,9],MINOR_PENTATONIC:[0,3,5,7,10],BLUES:[0,3,5,6,7,10]},ur={0:"P1",1:"m2",2:"M2",3:"m3",4:"M3",5:"P4",6:"d5/#11",7:"P5",8:"m6",9:"M6",10:"m7",11:"M7"};function mr(t,e){const i=se(`${t}4`)%12,o=e.toUpperCase().replace(/\s+/g,"_");return(Ro[o]||Ro.MAJOR).map(n=>(i+n)%12)}function st(t,e="C",i="MAJOR"){const{root:o,quality:s}=ne(t.name),n=se(`${o}4`)%12;let r,a=7,l,c=[2],d=[];switch(s){case"maj":case"maj7":case"maj9":case"maj6":r=4,a=7,(s==="maj7"||s==="maj9")&&(l=11),s==="maj6"&&(l=9),c=[2,6,9],d=[5];break;case"min":case"min7":case"min9":case"min6":case"mmaj7":r=3,a=7,(s==="min7"||s==="min9")&&(l=10),s==="min6"&&(l=9),s==="mmaj7"&&(l=11),c=[2,5,9],d=[8];break;case"dom7":case"dom9":r=4,a=7,l=10,c=[2,6,9,1,3],d=[11];break;case"dim":case"dim7":r=3,a=6,s==="dim7"&&(l=9),c=[2,5,8],d=[7];break;case"aug":r=4,a=8,c=[2,6],d=[7];break;case"sus4":case"sus7":case"sus9":r=5,a=7,(s==="sus7"||s==="sus9")&&(l=10),c=[10,2],d=[4];break;case"sus2":r=2,a=7,c=[10,5],d=[4];break;default:r=4,a=7;break}const u=[0,...r!==void 0?[r]:[],...a!==void 0?[a]:[],...l!==void 0?[l]:[]].map(b=>(n+b)%12),h=c.map(b=>(n+b)%12),m=d.map(b=>(n+b)%12),f=mr(e,i);return{chordName:t.name,rootPc:n,thirdPc:r!==void 0?(n+r)%12:void 0,fifthPc:a!==void 0?(n+a)%12:void 0,seventhPc:l!==void 0?(n+l)%12:void 0,chordTonePcs:u,tensionPcs:h,avoidPcs:m,scalePcs:f}}function mt(t,e,i="C",o="MAJOR"){const s=typeof t=="number"?t:se(t),n=s%12,r=st(e,i,o),a=(n-r.rootPc+12)%12,l=ur[a]||`+${a}`;let c="chromatic",d=!1,p,u;if(n===r.rootPc?c="root":n===r.thirdPc?c="3rd":n===r.fifthPc?c="5th":n===r.seventhPc?c="7th":r.tensionPcs.includes(n)?c="tension":r.scalePcs.includes(n)?c="passing":c="chromatic",r.avoidPcs.includes(n)){d=!0;const{quality:h}=ne(e.name);if((h.startsWith("maj")||h==="dom7"||h==="dom9")&&a===5){p="Natural 4th clashes with Major 3rd (minor 9th/2nd rub)";const m=s-1;u=V(m)}else if((h==="dom7"||h==="dom9")&&a===11){p="Major 7th clashes with Dominant ♭7";const m=s-1;u=V(m)}else if((h==="sus4"||h==="sus2")&&a===4){p="Major 3rd negates suspended chord feel";const m=s+1;u=V(m)}else if(h.startsWith("dim")&&a===7){p="Natural 5th clashes with Diminished 5th";const m=s-1;u=V(m)}else{p=`Harsh dissonance against ${e.name}`;const m=s-1;u=V(m)}}return{role:c,intervalFromRoot:l,isClash:d,clashReason:p,suggestion:u}}function gr(t,e,i,o){if(i==="free"||!o?.chords?.length)return t;const s=se(t),n=o.chords.length,r=Math.max(0,Math.min(n-1,Math.floor(e/4)%n)),a=o.chords[r],l=st(a,o.key,o.scaleType);let c=[];if(i==="strict-chord"?c=[...new Set([...l.chordTonePcs,...l.tensionPcs])]:i==="scale-key"&&(c=l.scalePcs),c.length===0)return t;let d=s,p=1/0;for(let u=-12;u<=12;u++){const h=s+u,m=(h%12+12)%12;if(c.includes(m)){const f=Math.abs(u);if(f<p&&(p=f,d=h,f===0))break}}return V(d)}function jo(t,e){if(!e?.chords?.length||!t?.notes?.length)return t;const i=t.notes.map(o=>{const s=Math.min(o.barIndex,e.chords.length-1),n=e.chords[s],r=st(n,e.key,e.scaleType);let a=o.midi%12;if(o.chordToneRole==="root")a=r.rootPc;else if(o.chordToneRole==="3rd")a=r.thirdPc??r.rootPc;else if(o.chordToneRole==="5th")a=r.fifthPc??r.rootPc;else if(o.chordToneRole==="7th")a=r.seventhPc??r.fifthPc??r.rootPc;else if(o.chordToneRole==="tension")a=r.tensionPcs[0]??r.rootPc;else{const u=mt(o.midi,n,e.key,e.scaleType);u.isClash&&u.suggestion?a=se(u.suggestion)%12:a=o.midi%12}let l=o.midi,c=1/0;for(let u=-12;u<=12;u++){const h=o.midi+u;(h%12+12)%12===a&&Math.abs(u)<c&&(c=Math.abs(u),l=h)}const d=V(l),p=mt(l,n,e.key,e.scaleType);return{...o,pitch:d,midi:l,chordToneRole:p.role,isClash:p.isClash}});return{...t,progressionId:e.key+"_"+e.scaleType,notes:i}}function fr(t,e,i,o){if(t<25)return e%2===0?[{step:0,duration:3,accent:!0}]:[{step:0,duration:2,accent:!0},{step:8,duration:1.5}];if(t<=60){const n=[[{step:0,duration:1,accent:!0},{step:4,duration:.5},{step:6,duration:1},{step:10,duration:1}],[{step:0,duration:.75,accent:!0},{step:3,duration:.75},{step:6,duration:1},{step:10,duration:1}],[{step:4,duration:1,accent:!0},{step:8,duration:.75},{step:11,duration:.75}],[{step:0,duration:1.5,accent:!0},{step:6,duration:.5},{step:8,duration:2}]];return e===i-1?n[3]:n[e%3]}return t>80?[0,2,4,6,8,10,12,14].map((n,r)=>({step:n,duration:.5,accent:r===0||r===4})):[{step:0,duration:.5,accent:!0},{step:2,duration:.5},{step:4,duration:.75,accent:!0},{step:7,duration:.5},{step:9,duration:.75},{step:12,duration:1}]}function br(t,e,i,o){const s=(e*16+i)/(o*16);switch(t){case"Arch":return Math.round(Math.sin(s*Math.PI)*9);case"AscendingClimax":return Math.round(-4+s*16);case"DescendingSigh":return Math.round(12-s*14);case"CallAndResponse":if(e<Math.ceil(o/2)){const r=(e*16+i)/(Math.ceil(o/2)*16);return Math.round(r*7)}else{const r=((e-Math.ceil(o/2))*16+i)/(Math.floor(o/2)*16);return Math.round(5*(1-r))}case"OstinatoRiff":{const n=i/16;return Math.round(Math.sin(n*Math.PI*2)*5)}case"AnthemHook":return Math.round(8+Math.sin(s*Math.PI*3)*3);default:return 0}}class vr{generateMelody(e,i={}){const o=i.contour||"Arch",s=i.density??50,n=i.octave??4,r=i.guideMode||"strict-chord",a={humanVariance:i.feelSettings?.humanVariance??.25,swing:i.feelSettings?.swing??0,velocityDrift:i.feelSettings?.velocityDrift??.3,gateRatio:i.feelSettings?.gateRatio??.9,glide:i.feelSettings?.glide??0},l=i.presetId||"lead-synth",c=i.bandId,d=[],p=e.chords||[],u=Math.max(1,p.length);let h=null,m=0;p.forEach((b,v)=>{const y=st(b,e.key,e.scaleType);fr(s,v,u).forEach((S,I)=>{const A=S.step,F=v*4+A/4,$=S.duration,N=br(o,v,A,u),D=12*(n+1)+y.rootPc+N;let U,_="root";const O=[...y.chordTonePcs];y.tensionPcs.length>0&&(I%2===1||s>40)&&O.push(...y.tensionPcs);const E=[];for(let oe=n-1;oe<=n+2;oe++)O.forEach(ge=>{const rt=12*(oe+1)+ge;let Ie="root";ge===y.rootPc?Ie="root":ge===y.thirdPc?Ie="3rd":ge===y.fifthPc?Ie="5th":ge===y.seventhPc?Ie="7th":y.tensionPcs.includes(ge)&&(Ie="tension"),E.push({midi:rt,pc:ge,role:Ie})});if(h===null)E.sort((oe,ge)=>{const rt=Math.abs(oe.midi-D),Ie=Math.abs(ge.midi-D),ze=oe.role==="root"||oe.role==="3rd"?-4:0,Le=ge.role==="root"||ge.role==="3rd"?-4:0;return rt+ze-(Ie+Le)}),U=E[0].midi,_=E[0].role,m=0;else{const oe=m>5,ge=m<-5;E.sort((rt,Ie)=>{const ze=rt.midi-h,Le=Ie.midi-h;let Bt=Math.abs(rt.midi-D),Pt=Math.abs(Ie.midi-D);return oe?(ze<0&&Math.abs(ze)<=4&&(Bt-=20),Le<0&&Math.abs(Le)<=4&&(Pt-=20)):ge?(ze>0&&Math.abs(ze)<=4&&(Bt-=20),Le>0&&Math.abs(Le)<=4&&(Pt-=20)):(Math.abs(ze)>=1&&Math.abs(ze)<=4&&(Bt-=12),Math.abs(Le)>=1&&Math.abs(Le)<=4&&(Pt-=12)),Bt-Pt}),U=E[0].midi,_=E[0].role,m=U-h}h=U;const H=V(U),Q=mt(U,b,e.key,e.scaleType);d.push({id:`m-note-${v}-${A}-${I}`,barIndex:v,stepInBar:A,beatOffset:F,durationBeats:$,pitch:H,midi:U,velocity:S.accent?110:92,chordToneRole:_,isClash:Q.isClash})})});let f={id:`melody-track-${Date.now()}`,progressionId:`${e.key}_${e.scaleType}`,notes:d,contour:o,density:s,octave:n,guideMode:r,feelSettings:a,presetId:l,volume:85,muted:!1,solo:!1,bandId:c};return c&&(f=this.spiceWithBandTrick(f,c,0,e)),f}regenerateBar(e,i,o){if(!o.chords[i])return e;const s={...o,chords:[o.chords[i]]},n=this.generateMelody(s,{contour:e.contour,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId}),r=e.notes.filter(l=>l.barIndex!==i),a=n.notes.map(l=>({...l,barIndex:i,beatOffset:i*4+l.stepInBar/4,id:`m-note-${i}-${l.stepInBar}`}));return{...e,notes:[...r,...a].sort((l,c)=>l.beatOffset-c.beatOffset)}}mutateMelody(e,i,o){const s=e.notes.map(n=>{if(Math.random()>i)return n;const r=o.chords[n.barIndex]||o.chords[0],a=st(r,o.key,o.scaleType),l=[...a.chordTonePcs,...a.tensionPcs],c=l[Math.floor(Math.random()*l.length)],p=(Math.floor(n.midi/12)-1+1)*12+c,u=V(p),h=mt(p,r,o.key,o.scaleType);return{...n,midi:p,pitch:u,chordToneRole:h.role,isClash:h.isClash}});return{...e,notes:s}}invertMelody(e,i){if(e.notes.length===0)return e;const o=Math.round(e.notes.reduce((n,r)=>n+r.midi,0)/e.notes.length),s=e.notes.map(n=>{const r=n.midi-o,a=Math.max(24,Math.min(108,o-r)),l=V(a);return{...n,midi:a,pitch:l}});return i?jo({...e,notes:s},i):{...e,notes:s}}spiceWithBandTrick(e,i,o,s){s.chords[o]||s.chords[0];const n=i.toLowerCase().replace(/[^a-z]/g,"");if(n.includes("oasis")){const r="G4",a=se(r),l=[{id:`oasis-drone-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:4,pitch:r,midi:a,velocity:105,chordToneRole:"drone",tag:"band-oasis-drone"}];return{...e,notes:[...e.notes.filter(c=>c.barIndex!==o),...l].sort((c,d)=>c.beatOffset-d.beatOffset),bandId:i}}if(n.includes("beatles")){const r=se("C5"),a=[0,1,2,3].map(l=>{const c=r-l;return{id:`beatles-chromatic-${o}-${l*4}`,barIndex:o,stepInBar:l*4,beatOffset:o*4+l,durationBeats:1,pitch:V(c),midi:c,velocity:96,chordToneRole:l===0?"root":"chromatic",tag:"band-beatles-chromatic"}});return{...e,notes:[...e.notes.filter(l=>l.barIndex!==o),...a].sort((l,c)=>l.beatOffset-c.beatOffset),bandId:i}}if(n.includes("radiohead")){const a=se(`${s.key||"C"}4`)+14,l=[{id:`radiohead-leap-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:2,pitch:V(a),midi:a,velocity:110,chordToneRole:"tension",tag:"band-radiohead-falsetto"},{id:`radiohead-trill-${o}-8`,barIndex:o,stepInBar:8,beatOffset:o*4+2,durationBeats:1,pitch:V(a+1),midi:a+1,velocity:90,chordToneRole:"tension",tag:"band-radiohead-trill"},{id:`radiohead-trill2-${o}-12`,barIndex:o,stepInBar:12,beatOffset:o*4+3,durationBeats:1,pitch:V(a),midi:a,velocity:85,chordToneRole:"tension",tag:"band-radiohead-trill"}];return{...e,notes:[...e.notes.filter(c=>c.barIndex!==o),...l].sort((c,d)=>c.beatOffset-d.beatOffset),bandId:i}}if(n.includes("nirvana")){const r=se(`${s.key||"C"}4`),a=[{id:`nirvana-root-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:1,pitch:V(r),midi:r,velocity:115,chordToneRole:"root",tag:"band-nirvana-grunge"},{id:`nirvana-slide-${o}-4`,barIndex:o,stepInBar:4,beatOffset:o*4+1,durationBeats:.5,pitch:V(r+2),midi:r+2,velocity:100,chordToneRole:"passing",tag:"band-nirvana-slide"},{id:`nirvana-min3-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:1.5,pitch:V(r+3),midi:r+3,velocity:110,chordToneRole:"3rd",tag:"band-nirvana-grunge"}];return{...e,notes:[...e.notes.filter(l=>l.barIndex!==o),...a].sort((l,c)=>l.beatOffset-c.beatOffset),bandId:i}}if(n.includes("steely")||n.includes("dan")){const a=se(`${s.key||"C"}4`)+14,l=[{id:`steely-enc-low-${o}-2`,barIndex:o,stepInBar:2,beatOffset:o*4+.5,durationBeats:.5,pitch:V(a-1),midi:a-1,velocity:88,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-enc-high-${o}-4`,barIndex:o,stepInBar:4,beatOffset:o*4+1,durationBeats:.5,pitch:V(a+1),midi:a+1,velocity:92,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-target-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:2.5,pitch:V(a),midi:a,velocity:108,chordToneRole:"tension",tag:"band-steely-jazz9"}];return{...e,notes:[...e.notes.filter(c=>c.barIndex!==o),...l].sort((c,d)=>c.beatOffset-d.beatOffset),bandId:i}}if(n.includes("mac")||n.includes("demarco")){const r=se(`${s.key||"C"}4`),a=[{id:`mac-7th-${o}-2`,barIndex:o,stepInBar:2,beatOffset:o*4+.5,durationBeats:1,pitch:V(r+11),midi:r+11,velocity:92,chordToneRole:"7th",tag:"band-mac-walkdown"},{id:`mac-5th-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:1,pitch:V(r+7),midi:r+7,velocity:88,chordToneRole:"5th",tag:"band-mac-walkdown"},{id:`mac-3rd-${o}-10`,barIndex:o,stepInBar:10,beatOffset:o*4+2.5,durationBeats:1.5,pitch:V(r+4),midi:r+4,velocity:95,chordToneRole:"3rd",tag:"band-mac-walkdown"}];return{...e,notes:[...e.notes.filter(l=>l.barIndex!==o),...a].sort((l,c)=>l.beatOffset-c.beatOffset),bandId:i}}return{...e,bandId:i}}shiftOctave(e,i){const o=e.notes.map(s=>{const n=Math.max(12,Math.min(127,s.midi+i*12));return{...s,midi:n,pitch:V(n)}});return{...e,octave:Math.max(1,Math.min(7,e.octave+i)),notes:o}}setContour(e,i,o){return this.generateMelody(o,{contour:i,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}setDensity(e,i,o){return this.generateMelody(o,{contour:e.contour,density:i,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}snapNoteToGuide(e,i,o,s){return gr(e,i,o,s)}analyzeMelodyNote(e,i){const o=Math.max(0,Math.min((i.chords?.length||1)-1,e.barIndex)),s=i.chords?.[o]||{name:"C"},n=mt(e.midi,s,i.key,i.scaleType);return{pitch:e.pitch,role:n.role,intervalFromRoot:n.intervalFromRoot,chordName:s.name,isClash:n.isClash,clashReason:n.clashReason,suggestion:n.suggestion}}validateMelody(e,i){return e.notes.map(o=>this.analyzeMelodyNote(o,i))}alignMelodyToChords(e,i){return jo(e,i)}applyHumanFeel(e,i,o){const s=60/o,n=[];return e.forEach(r=>{const l=r.stepInBar%2===1?i.swing/100*(s*.25*.35):0,d=Math.sin(r.stepInBar*13.37+r.barIndex*7.1)*.5*i.humanVariance*.025,p=Math.max(0,r.beatOffset*s+l+d),u=Math.max(.05,r.durationBeats*s*i.gateRatio),m=r.stepInBar===0?12:0,f=Math.cos(r.stepInBar*5.5)*(i.velocityDrift*10),b=Math.max(1,Math.min(127,Math.round(r.velocity+m+f)))/127;n.push({note:r.pitch,midi:r.midi,time:p,duration:u,velocity:b})}),n.sort((r,a)=>r.time-a.time)}getMelodyFeelForGenre(e){return hr(e)}}const Ce=new vr;function uo(t,e=4){const i=Array.isArray(t)?t.filter(p=>typeof p=="string"&&p.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(p=>p.replace(/\d+$/,"")),n=s[0],r=o[n]??0;let a=e,l=r;const c=[];return s.forEach((p,u)=>{const h=o[p]??0;u>0&&h<=l&&a++,c.push(`${p}${a}`),l=h}),[`${n}${e-1}`,...c]}class yr{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.melodyTrack=null}setMelodyTrack(e){this.melodyTrack=e,e&&(e.presetId&&un(e.presetId),typeof e.volume=="number"&&mn(e.volume),gn(e.muted),fn(e.solo))}getMelodyTrack(){return this.melodyTrack}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?(i&&i.length===e.chords.length&&i.every(o=>o<e.chords.length)?this.order=i:this.order=Array.from({length:e.chords.length},(o,s)=>s),this.order.length>0&&(this.activeIndex>=this.order.length&&(this.activeIndex=this.activeIndex%this.order.length),this.progressStep>=this.order.length&&(this.progressStep=this.progressStep%this.order.length))):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const i=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,e)),o=Math.max(1,this.barsPerChord);return Math.round(o*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(e<i+s){this.activeSectionIndex=o;const n=e-i;this.activeIndex=this.sections[o].order[n]??0,this.progressStep=n;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay();const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:G(o.name,z(e.progression.key,e.progression.scaleType)),n=uo(s,4),r=i!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[i]?{...this.feelSettings,...this.feelSettings.barFeel[i]}:this.feelSettings;Fo(n,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:r?.playStyle??this.playStyle??void 0,feelSettings:r})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",n=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";o=G(s,z(n,r))}if(i.voicing?this.playChordNotes(o,1.2,i.voicing):this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&pn(o[0],1.4),this.melodyTrack&&!this.melodyTrack.muted&&this.progression){const s=this.melodyTrack.notes.filter(n=>n.barIndex===e);if(s.length>0){const n=this.progression.bpm||84;Ce.applyHumanFeel(s,this.melodyTrack.feelSettings,n).forEach(a=>{setTimeout(()=>{this.playing&&ro(a.note,a.duration,void 0,a.velocity)},Math.round(a.time*1e3))})}}}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",n=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";o=G(s,z(n,r))}e.voicing?this.playChordNotes(o,i,e.voicing):this.playChordNotes(o,i)}playChordAtIndex(e,i=.8,o,s){if(!this.progression||!this.progression.chords[e])return;const n=this.progression.chords[e];let r=Array.isArray(n.notes)?n.notes:[];if(r.length===0||!r.every(l=>typeof l=="string"&&l.trim().length>0)){const l=n.name||"CMAJ",c=this.progression.key||"C",d=this.progression.scaleType||"MAJOR";r=G(l,z(c,d))}const a=o||n.voicing;a!==void 0?this.playChordNotes(r,i,a,s):this.playChordNotes(r,i)}playChordNotes(e,i,o,s,n){if(!this.progression)return;const r=Array.isArray(e)?e.filter(d=>typeof d=="string"&&d.trim().length>0):[];if(r.length===0)return;const a=o?hn(r,o):uo(r,4),l=n!==void 0?n:this.playing?this.order[this.activeIndex]??0:void 0,c=l!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[l]?{...this.feelSettings,...this.feelSettings.barFeel[l]}:this.feelSettings;Fo(a,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:c?.playStyle??this.playStyle??void 0,velocity:s,feelSettings:c})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const w=new yr,xr=Ye.map(t=>t.name),wr=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function kr(t,e){const i=t.length+1,o=e.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let n=0;n<i;n++)s[n][0]=n;for(let n=0;n<o;n++)s[0][n]=n;for(let n=1;n<i;n++)for(let r=1;r<o;r++)s[n][r]=t[n-1]===e[r-1]?s[n-1][r-1]:1+Math.min(s[n-1][r-1],s[n-1][r],s[n][r-1]);return s[i-1][o-1]}function ot(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),s=e.find(l=>l.toLowerCase()===o);if(s)return s;let n=null,r=1/0;for(const l of e){const c=kr(o,l.toLowerCase());c<r&&(r=c,n=l)}const a=Math.max(2,Math.floor(o.length*.4));return r<=a?n:null}function Sr(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,s=ot(o.root,vt),n=ot(o.quality,wn);s&&n&&e.push({root:s,quality:n})}if(e.length)return e.slice(0,kt)}function Ir(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=ot(e.presetId,wr)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function Ki(t,e){const i=t&&typeof t=="object"?t:{},o=ot(i.genre,hs)??e.genre,s=ot(i.mood,xr)??e.mood,n=ot(i.key,vt)??void 0,r=ot(i.scaleType,kn)??void 0,a=n&&r?Sr(i.chords):void 0;let l;typeof i.length=="number"&&Number.isFinite(i.length)&&(l=Math.max(Ft,Math.min(kt,Math.round(i.length))));const c=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,d=Ir(i.instrumentConfig),p=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:n,scaleType:r,length:l,chords:a,rhythmStyle:c,instrumentConfig:d,_rateLimit:p}}const Cr=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],$r="chroma-chords-llm-provider",Tr="chroma-chords-llm-model";function Er(){const t=localStorage.getItem($r);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Mr(){const t=localStorage.getItem(Tr);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:Cr[0].id}const Xi={genre:hs[0],mood:Ye[0].name},Nr="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Ar=12e3,$s={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Ts={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function bi(t,e){const i=t.toLowerCase();let o=null,s=0;return Object.keys(e).forEach(n=>{const r=e[n].reduce((a,l)=>a+(i.includes(l)?1:0),0);r>s&&(s=r,o=n)}),o}function Or(t){const e=bi(t,Ts),i=bi(t,$s);return!e||!i?null:{genre:e,mood:i}}async function Fr(t){const e=new AbortController,i=setTimeout(()=>e.abort(),Ar);try{const s=await fetch(Nr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Er(),model:Mr()}),signal:e.signal}),n=await s.json().catch(()=>null);if(!s.ok||n&&typeof n=="object"&&"error"in n){const r=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${s.status}`,a=new Error(`Classifier request failed: ${r}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(a._rateLimit=n._rateLimit),a}return n}finally{clearTimeout(i)}}async function Dr(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=bi(s,Ts)??"Synthwave",r=bi(s,$s)??"Dreamy",a={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},l={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},c={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},d=c[n]||c._default,p=a[n]||"rhodes",u=l[n]||"slow_arpeggio",h={genre:n,mood:r,key:d.key,scaleType:d.scaleType,length:8,chords:d.chords,rhythmStyle:u,instrumentConfig:{presetId:p,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return Ki(h,{genre:n,mood:r})}const o=Or(t);try{const s=await Fr(t);return Ki(s,o??Xi)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const n=Ki(o??Xi,Xi);return s&&typeof s=="object"&&"_rateLimit"in s&&(n._rateLimit=s._rateLimit),n}}class Br{static async resolvePrompt(e,i,o,s,n,r){let a=r||null,l=null,c=null;if(!a&&n&&n.trim().length>0)try{a=await Dr(n)}catch(u){console.warn("Failed to classify prompt via LLM/local fallback:",u)}const d=!!(a&&a.chords?.length&&a.key&&a.scaleType);let p=null;return d&&a&&a.chords&&a.key&&a.scaleType&&(p=co(e,a.key,a.scaleType,a.chords,a.genre||i,a.mood||o)),p||(p=mi(e,i,o,{length:s})),d&&a&&(a.instrumentConfig?.presetId&&(l=so(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(c=no(a.rhythmStyle)??null)),p.chords.length>s&&(p={...p,chords:p.chords.slice(0,s)}),n&&(p={...p,searchTerm:n}),{progression:p,instrument:l,playStyle:c,normalizedSuggestion:a}}}const Xe=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)}];class J{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(s,n)=>n);return[{name:Xe[0].name,desc:Xe[0].desc,progression:e,order:o.slice()}]}static generateSectionProgression(e,i,o,s){const n=e.key,r=e.scaleType||"MAJOR",a=e.genre||"Pop",l=e.mood||"Uplifting",c=e.bpm||120,d=z(n,r),p=`${n}_${r}`,u=e.chords.length||4;let h=s&&s>=2&&s<=8?s:u;i==="Pre-chorus"&&!s&&u>4&&(h=4);const m=o?.scales?o.scales[p]:void 0;let f=[];return m&&Object.keys(m.degrees).length>0?f=this.walkSectionMarkov(m,p,i,a,l,d,h,e,o):f=this.fallbackSectionChords(e,i,h,d),i==="Chorus"&&this.areChordSequencesIdentical(e.chords,f)&&(f=this.shiftChorusVariation(f,m,p,d)),{genre:a,mood:l,key:n,scaleType:r,bpm:c,chords:f}}static walkSectionMarkov(e,i,o,s,n,r,a,l,c){const d=Object.keys(e.degrees),p=this.pickSectionStartDegree(o,e,s,n),u=[p];let h=p;for(let f=1;f<a;f++){const b=f===a-1,v=d.filter(C=>e.degrees[C]&&C!==h),y=v.length?v:d;if(b){const C=fe(y,S=>{let I=Je(h,S,e.type,s,n);return o==="Outro"&&S==="TONIC"?I*=8:o==="Pre-chorus"&&(S==="DOMINANT"||S==="SUBDOMINANT")?I*=6:o==="Chorus"&&(S==="TONIC"||S==="SUBDOMINANT"||S==="DOMINANT")&&(I*=2.5),Math.max(.01,I)});u.push(C)}else{const C=y.filter(A=>!u.includes(A)),S=C.length?C:y,I=fe(S,A=>{let F=Je(h,A,e.type,s,n);return F*=this.getSectionTransitionMultiplier(o,h,A),Math.max(.01,F)});h=I,u.push(I)}}const m=u.map(f=>Ue(i,f,e,r));if(o==="Bridge"&&m.length>=3&&c)try{const f=fi(c,l,1);if(f&&f.length>0){const b=f.find(v=>v.roman.includes("VI")||v.roman.includes("VII")||v.roman==="iv")||f[0];if(b&&b.chord){const v=Math.min(m.length-2,1);m[v]={...b.chord,desc:b.sub||"Shadow chord borrowed for the bridge detour."}}}}catch{}return m}static pickSectionStartDegree(e,i,o,s){const n=Object.keys(i.degrees),r=a=>!!i.degrees[a];if(e==="Chorus"){const a={SUBDOMINANT:3.5,SUBMEDIANT:3,SUPERTONIC:1.2,TONIC:.5,MEDIANT:.8,DOMINANT:.6};return fe(n,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Bridge"){const a={SUBMEDIANT:3.5,MEDIANT:2.5,SUBDOMINANT:2.2,SUPERTONIC:1.5,TONIC:.2};return fe(n,l=>(a[l]||.5)*(r(l)?1:.01))}if(e==="Pre-chorus"){const a={SUPERTONIC:3.2,SUBDOMINANT:2.8,SUBMEDIANT:2,TONIC:.3};return fe(n,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Outro"){const a={SUBDOMINANT:2.5,SUBMEDIANT:2,TONIC:2.5};return fe(n,l=>(a[l]||.5)*(r(l)?1:.01))}return fe(n,a=>us(a,i.type,o,s))}static getSectionTransitionMultiplier(e,i,o){if(e==="Chorus"){if(i==="SUBDOMINANT"&&(o==="DOMINANT"||o==="TONIC"))return 2.2;if(i==="SUBMEDIANT"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2;if(i==="DOMINANT"&&(o==="TONIC"||o==="SUBMEDIANT")||i==="TONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 1.8}else if(e==="Pre-chorus"){if(i==="SUPERTONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2.8;if(i==="SUBMEDIANT"&&o==="SUPERTONIC")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 3.2}else if(e==="Bridge"){if(i==="SUBMEDIANT"&&o==="MEDIANT")return 2;if(i==="MEDIANT"&&o==="SUBDOMINANT")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 2}else if(e==="Outro"){if(i==="SUBDOMINANT"&&o==="TONIC")return 2.8;if(i==="SUBMEDIANT"&&o==="SUBDOMINANT")return 2}return 1}static fallbackSectionChords(e,i,o,s){const n=e.chords,r=L[e.key]??0,a=(e.scaleType||"").includes("MINOR");let l=[];if(i==="Chorus")n.length>=4?l=[n[1],n[2],n[3]||n[0],n[0]]:l=[...n].reverse();else if(i==="Bridge"){const d=a?q(B(r+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s):q(B(r+8,!0),"Major","None","♭VI","Flat submediant","cinematic shadow detour",.48,!0);n.length>=4?l=[n[3]||n[1],d,n[1]||n[2],n[2]||n[0]]:l=[d,...n]}else i==="Pre-chorus"?n.length>=4?l=[n[1],n[2],n[1],n[2]]:l=n:i==="Outro"?n.length>=4?l=[n[1],n[3]||n[1],n[1],n[0]]:l=n:l=(Xe.find(u=>u.name===i)||Xe[1]).reorder(n.length).map(u=>n[u%n.length]);const c=[];for(let d=0;d<o;d++)c.push(l[d%l.length]);return c}static areChordSequencesIdentical(e,i){return e.length!==i.length?!1:e.every((o,s)=>o.name===i[s]?.name)}static shiftChorusVariation(e,i,o,s=!0,n){const r=n||e.length;if(!i||!o)return e;const a=i.degrees.SUBDOMINANT?Ue(o,"SUBDOMINANT",i,s):null,l=i.degrees.DOMINANT?Ue(o,"DOMINANT",i,s):null,c=i.degrees.SUBMEDIANT?Ue(o,"SUBMEDIANT",i,s):null,d=i.degrees.TONIC?Ue(o,"TONIC",i,s):null;if(a&&l&&c&&d){const p=[a,l,c,d],u=[];for(let h=0;h<r;h++)u.push(p[h%p.length]);return u}return e}static addSection(e,i,o,s){if(e.length>=Xe.length)return{sections:e,activeIndex:e.length-1};const n=Xe[e.length],r=this.generateSectionProgression(i,n.name,o,s),a=Array.from({length:r.chords.length},(d,p)=>p),l={name:n.name,desc:n.desc,progression:r,order:a},c=[...e,l];return{sections:c,activeIndex:c.length-1}}static removeSection(e,i){if(e.length<=1||i<0||i>=e.length)return{sections:e,activeIndex:0};const o=e.filter((n,r)=>r!==i),s=Math.min(i,o.length-1);return{sections:o,activeIndex:Math.max(0,s)}}static syncActiveSection(e,i,o,s){if(!e[i])return e;const n=[...e];return n[i]={...n[i],progression:o,order:s.slice()},n}static createDefaultTimeline(e){return e.map((i,o)=>({id:`timeline-${o}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:o,repeats:1}))}static expandTimeline(e,i){const o=[];for(const s of i){const n=e[s.sectionIndex];if(n)for(let r=0;r<Math.max(1,s.repeats);r++)o.push(n)}return o.length>0?o:e}static reorderTimeline(e,i,o){if(i<0||i>=e.length||o<0||o>=e.length||i===o)return e;const s=[...e],[n]=s.splice(i,1);return s.splice(o,0,n),s}static updateTimelineRepeat(e,i,o){return i<0||i>=e.length?e:e.map((s,n)=>{if(n!==i)return s;const r=Math.min(8,Math.max(1,s.repeats+o));return{...s,repeats:r}})}static addTimelineItem(e,i){const o={id:`timeline-${i}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:i,repeats:1};return[...e,o]}static removeTimelineItem(e,i){return e.length<=1||i<0||i>=e.length?e:e.filter((o,s)=>s!==i)}}var Pr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,he=(t,e,i,o)=>{for(var s=o>1?void 0:o?Rr(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Pr(e,i,s),s};const jr=[{id:"loop",name:"Chords"},{id:"melody",name:"Melody"},{id:"song",name:"Song"},{id:"play",name:"Play it"}];let re=class extends de{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.syncError=null,this.title="Chroma Chords",this.activeTab="loop",this.aiTokens=4,this.aiNextIn=60,this.midiStatus="Idle",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.capacityTimer=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=R.subscribeProjects(()=>{this.savedCount=R.getProjects().length,this.requestUpdate()}),this.unsubscribeSyncStatus=R.subscribeSyncStatus(t=>{this.syncStatus=t,this.syncError=R.getLastSyncError(),this.requestUpdate()}),this.savedCount=R.getProjects().length,this.syncStatus=R.getSyncStatus(),this.syncError=R.getLastSyncError(),this.capacityTimer=setInterval(()=>{this.aiTokens<4&&(this.aiNextIn<=1?(this.aiTokens=Math.min(4,this.aiTokens+1),this.aiNextIn=60):this.aiNextIn-=1,this.requestUpdate())},1e3)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.capacityTimer&&clearInterval(this.capacityTimer)}setTab(t){this.activeTab=t,this.dispatchEvent(new CustomEvent("tab-change",{detail:t,bubbles:!0,composed:!0}))}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.showCapacityNote&&(this.accountMenuOpen=!1)}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.accountMenuOpen&&(this.showCapacityNote=!1)}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenMidi(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("open-midi",{bubbles:!0,composed:!0}))}onSyncNow(){this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}renderSyncStatusText(){return this.syncStatus==="synced"?"Synced with cloud":this.syncStatus==="syncing"?"Syncing with cloud...":this.syncStatus==="offline"?"Sync failed (offline)":"Sign in to sync"}render(){const t=this.userEmail?this.userEmail.charAt(0).toUpperCase():"U";return g`
      <div class="header-wrap ${this.compact?"compact":""}">
        <!-- Branding Logo & Title -->
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="26" height="26" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <!-- Tier-1 Navigation Tabs -->
        <nav class="nav-tabs-wrap" aria-label="Main Navigation">
          ${jr.map(e=>g`
            <button
              class="nav-tab-btn ${this.activeTab===e.id?"active":""}"
              role="tab"
              aria-selected=${this.activeTab===e.id}
              @click=${()=>this.setTab(e.id)}
            >
              ${e.name}
            </button>
          `)}
        </nav>

        <!-- Right Actions: AI Tokens, Sign in / Account -->
        <div class="right-actions">
          <button
            class="capacity-chip"
            @click=${this.toggleCapacityNote}
            aria-label="AI generates remaining"
            title="AI tokens"
          >
            <span class="capacity-pips">
              ${[0,1,2,3].map(e=>g`
                <span class="pip-dot ${e<this.aiTokens?"filled":""}"></span>
              `)}
            </span>
            <span>${this.aiTokens>=4?"AI ready":`Refill ${this.aiNextIn}s`}</span>
          </button>

          ${this.showCapacityNote?g`
            <div class="popover-panel capacity-panel" role="note">
              <span style="flex:1;">
                AI generates remaining chords & top-line melodies. Refills 1 token every 60 seconds.
              </span>
              <button class="panel-close-btn" @click=${this.toggleCapacityNote} aria-label="Dismiss">×</button>
            </div>
          `:""}

          ${this.isAuthenticated?g`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">
              ${t}
              ${this.syncStatus==="offline"?g`<span class="account-badge offline" title="Cloud sync offline"></span>`:""}
              ${this.syncStatus==="syncing"?g`<span class="account-badge syncing" title="Syncing..."></span>`:""}
            </button>
          `:g`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?g`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail||"Signed in"}</div>
                <div class="sync-status-line ${this.syncStatus}">
                  <span class="sync-dot ${this.syncStatus}"></span>
                  <span>${this.renderSyncStatusText()}</span>
                </div>
                ${this.syncStatus==="offline"&&this.syncError?g`
                  <div class="sync-error-detail">${this.syncError}</div>
                `:""}
              </div>
              <button class="menu-action-btn" role="menuitem" @click=${this.onViewSets}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A6B3F" style="flex-shrink:0;"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                <span>Your sets</span>
                <span class="saved-badge">${this.savedCount}</span>
              </button>
              <button class="menu-action-btn" role="menuitem" @click=${this.onOpenMidi}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="10" cy="15" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="12" cy="8" r="1"/></svg>
                <span>MIDI</span>
                <span class="saved-badge">${this.midiStatus}</span>
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
    `}};re.styles=ce`
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
      min-height: 58px;
      padding: 0 20px;
      background: var(--cv-cream, #FBF3E6);
      border-bottom: 1.5px solid rgba(46, 39, 31, 0.09);
      box-sizing: border-box;
      gap: 12px;
    }
    .header-wrap.compact {
      min-height: 48px;
      padding: 0 12px;
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
    }
    .brand-title {
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-wrap.compact .brand-title {
      font-size: 13.5px;
    }

    /* Tier-1 Nav Tabs */
    .nav-tabs-wrap {
      display: flex;
      align-items: center;
      gap: 2px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 3px 4px;
      box-sizing: border-box;
    }
    .nav-tab-btn {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      background: transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .nav-tab-btn:hover {
      color: var(--cv-ink, #2E271F);
    }
    .nav-tab-btn.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-weight: 800;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
    }
    .header-wrap.compact .nav-tab-btn {
      min-height: 30px;
      padding: 0 10px;
      font-size: 11.5px;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      flex-shrink: 0;
    }

    /* AI Capacity Chip */
    .capacity-chip {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 0 10px;
      min-height: 32px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      transition: background 150ms ease;
    }
    .capacity-chip:hover {
      background: rgba(46, 39, 31, 0.1);
      color: var(--cv-ink, #2E271F);
    }
    .capacity-pips {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .pip-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.18);
      transition: background 200ms ease;
    }
    .pip-dot.filled {
      background: #9E5D53;
    }

    /* Popover Panels */
    .popover-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      z-index: 100;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 18px;
      box-shadow: 0 18px 40px -10px rgba(46, 39, 31, 0.3);
      animation: cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .capacity-panel {
      width: 252px;
      padding: 14px 12px 14px 16px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      line-height: 1.55;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .panel-close-btn {
      border: none;
      background: transparent;
      font-size: 18px;
      line-height: 1;
      color: rgba(46, 39, 31, 0.5);
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .panel-close-btn:hover {
      background: rgba(46, 39, 31, 0.08);
      color: var(--cv-ink, #2E271F);
    }

    .sign-in-btn {
      border: 1.5px solid var(--cv-ink, #2E271F);
      background: transparent;
      color: var(--cv-ink, #2E271F);
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
    }
    .sign-in-btn:hover {
      background: var(--cv-ink, #2E271F);
      color: #FBF3E6;
    }

    .account-btn {
      position: relative;
      border: none;
      font-family: inherit;
      width: 34px;
      height: 34px;
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
    .account-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 0 0 0 2px var(--cv-cream, #FBF3E6);
    }
    .account-badge.offline {
      background: #E07A5F;
    }
    .account-badge.syncing {
      background: #D4A346;
      animation: cv-pulse-dot 1.2s infinite ease-in-out;
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
    .sync-status-line.syncing {
      color: #B27B2B;
    }
    .sync-status-line.offline {
      color: #C0392B;
    }
    .sync-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7FA968;
      flex-shrink: 0;
    }
    .sync-dot.syncing {
      background: #D4A346;
      animation: cv-pulse-dot 1.2s infinite ease-in-out;
    }
    .sync-dot.offline {
      background: #E07A5F;
    }
    .sync-error-detail {
      margin-top: 4px;
      font-size: 10.5px;
      font-weight: 600;
      color: #C0392B;
      line-height: 1.3;
      word-break: break-word;
    }

    @keyframes cv-pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.75); }
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
      transition: background 120ms ease;
    }
    .menu-action-btn:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .menu-action-btn.sign-out {
      color: #8C4035;
    }
    .menu-action-btn.sign-out:hover {
      background: rgba(140, 64, 53, 0.08);
    }
    .saved-badge {
      margin-left: auto;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(46, 39, 31, 0.08);
      color: var(--cv-ink, #2E271F);
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 4px 6px;
    }

    @keyframes cvfv-sheet-up {
      from { opacity: 0; transform: translateY(-4px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;he([x({type:Boolean})],re.prototype,"compact",2);he([x({type:Boolean})],re.prototype,"isAdmin",2);he([x({type:Boolean})],re.prototype,"isAuthenticated",2);he([x({type:String})],re.prototype,"userEmail",2);he([x({type:Number})],re.prototype,"savedCount",2);he([x({type:String})],re.prototype,"syncStatus",2);he([x({type:String})],re.prototype,"syncError",2);he([x({type:String})],re.prototype,"title",2);he([x({type:String})],re.prototype,"activeTab",2);he([x({type:Number})],re.prototype,"aiTokens",2);he([x({type:Number})],re.prototype,"aiNextIn",2);he([x({type:String})],re.prototype,"midiStatus",2);he([k()],re.prototype,"accountMenuOpen",2);he([k()],re.prototype,"showCapacityNote",2);re=he([pe("app-header")],re);var zr=Object.defineProperty,Lr=Object.getOwnPropertyDescriptor,X=(t,e,i,o)=>{for(var s=o>1?void 0:o?Lr(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&zr(e,i,s),s};const Es=[{name:"Grand Piano",desc:"Clear and even. Easy to hear the harmony.",color:"#9CC0EC"},{name:"Stage Rhodes",desc:"Warm electric piano with a soft bell.",color:"#F2A79B"},{name:"Nylon Guitar",desc:"Plucked and intimate.",color:"#F6D98B"},{name:"Jazz Archtop",desc:"Round, woody jazz guitar.",color:"#D89047"},{name:"Drawbar Organ",desc:"Held, breathy organ tone.",color:"#E8609A"},{name:"Cinematic Pad",desc:"Long, soft swells that hold each chord.",color:"#C9A9E0"},{name:"Celestial Bell",desc:"Glassy and bright. Rings out.",color:"#B8CC9E"},{name:"Juno Synth",desc:"Lush analog chorus synth.",color:"#7B61FF"},{name:"Vintage SH-101",desc:"Squelchy mono synth. Great for lines.",color:"#4EA598"},{name:"House Stab",desc:"Short, punchy chord hits.",color:"#FF8C42"}],Ms=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Ns=["Major","Minor","Dorian","Mixolydian","Lydian","Phrygian","Locrian","Harmonic minor","Melodic minor"];let W=class extends de{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play section",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.melodyLoop="Section",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.songTotal="",this.openMenu=null,this.feelMoreOpen=!1}toggleMenu(t){this.openMenu=this.openMenu===t?null:t}closeMenu(){this.openMenu=null}onPlayClick(){this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeMenu(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeMenu(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onLoopCycle(){this.dispatchEvent(new CustomEvent("loop-cycle",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeMenu();const e=this.activeTab==="melody";this.dispatchEvent(new CustomEvent(e?"set-melody-sound":"set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))}onSelectFeelStep(t,e,i){const o=this.activeTab==="melody";t==="Pattern"?this.dispatchEvent(new CustomEvent(o?"set-melody-feel":"set-chord-feel",{detail:{feel:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:i},bubbles:!0,composed:!0}))}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onShareClick(){this.closeMenu(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((a,l)=>(a.id||String.fromCharCode(65+l))===this.activeSectionId)||this.sections[0]||{name:"Chorus",tint:"#F1E4CC"},o=t?this.melodySound:this.chordSound,s=t?this.melodyFeel:this.chordFeel,n=this.isPlaying?"#FBF3E6":this.moodColor,r=this.isPlaying?"■":"▶";return g`
      <div class="transport-container" data-screen-label="Transport">
        ${this.openMenu?g`<div class="backdrop" @click=${this.closeMenu}></div>`:""}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${n};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          <span class="play-icon">${r}</span>
          ${this.playLabel}
        </button>

        <div class="divider"></div>

        <!-- Section Selector -->
        <button
          class="tb-btn sec-compact-btn ${this.openMenu==="section"?"active":""}"
          @click=${()=>this.toggleMenu("section")}
          aria-label="Choose section"
        >
          <span class="sec-badge" style="background: ${i.tint||"#F1E4CC"};"></span>
          <span class="highlight">${i.name}</span>
          <span class="caret">▾</span>
        </button>

        <!-- Wide viewport sections group -->
        <div class="sec-full-group">
          ${this.sections.map((a,l)=>{const c=a.id||String.fromCharCode(65+l);return g`
              <button
                class="tb-btn ${c===this.activeSectionId?"active":""}"
                @click=${()=>this.onSelectSection(c)}
              >
                <span class="sec-badge" style="background: ${a.tint||"#F1E4CC"};"></span>
                <span>${a.name}</span>
              </button>
            `})}
        </div>

        <!-- Section Dropdown Popover -->
        ${this.openMenu==="section"?g`
          <div class="popover-shell sec-popover">
            <div class="popover-title">Section</div>
            ${this.sections.map((a,l)=>{const c=a.id||String.fromCharCode(65+l);return g`
                <button
                  class="sec-item ${c===this.activeSectionId?"selected":""}"
                  @click=${()=>this.onSelectSection(c)}
                >
                  <span class="sec-badge" style="background: ${a.tint||"#F1E4CC"}; width: 12px; height: 12px;"></span>
                  <span class="sec-item-name">${a.name}</span>
                  <span class="sec-item-meta">${a.order?a.order.length:4} bars</span>
                </button>
              `})}
            <div style="height: 1px; background: rgba(46, 39, 31, 0.08); margin: 4px 6px;"></div>
            <button class="sec-item" style="color: #8A6B3F;" @click=${this.onNewSection}>
              + New section
            </button>
          </div>
        `:""}

        <div class="divider"></div>

        <!-- Melody Loop Selector (Melody Tab Only) -->
        ${t?g`
          <button
            class="tb-btn"
            @click=${this.onLoopCycle}
            aria-label="Change what loops"
          >
            <span>Loop</span>
            <span class="highlight">${this.melodyLoop}</span>
          </button>
        `:""}

        <!-- Sound Selector -->
        ${e?"":g`
          <button
            class="tb-btn ${this.openMenu==="sound"?"active":""}"
            @click=${()=>this.toggleMenu("sound")}
            aria-label="Select instrument sound"
          >
            <span>Sound</span>
            <span class="highlight">${o}</span>
            <span class="caret">▾</span>
          </button>

          <!-- Feel Selector -->
          <button
            class="tb-btn ${this.openMenu==="feel"?"active":""}"
            @click=${()=>this.toggleMenu("feel")}
            aria-label="Select rhythmic feel"
          >
            <span>Feel</span>
            <span class="highlight">${s}</span>
            <span class="caret">▾</span>
          </button>
        `}

        <!-- Sound Popover -->
        ${this.openMenu==="sound"?g`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${t?"Melody sound":"Chord sound"}</div>
            ${Es.map(a=>g`
              <button
                class="sound-item ${a.name===o?"selected":""}"
                @click=${()=>this.onSelectSound(a.name)}
              >
                <span class="sound-dot" style="background: ${a.color};"></span>
                <div class="sound-meta">
                  <span class="sound-name">${a.name}</span>
                  <span class="sound-desc">${a.desc}</span>
                </div>
              </button>
            `)}
          </div>
        `:""}

        <!-- Feel Popover -->
        ${this.openMenu==="feel"?g`
          <div class="popover-shell feel-popover">
            <div class="popover-title">${t?"Melody feel":"Chord feel"}</div>
            
            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Pattern</span>
                <span class="feel-axis-hint">Rhythmic motion</span>
              </div>
              <div class="feel-track">
                ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(a=>g`
                  <button
                    class="feel-step-btn ${a===s?"selected":""}"
                    @click=${()=>this.onSelectFeelStep("Pattern",a,a)}
                  >
                    ${a.replace(/ chords|\(swing\)/g,"")}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Swing</span>
                <span class="feel-axis-hint">Timing offset</span>
              </div>
              <div class="feel-track">
                ${[{name:"Straight",val:0},{name:"Light",val:20},{name:"Medium",val:45},{name:"Hard",val:70}].map(a=>g`
                  <button
                    class="feel-step-btn ${(this.feelSettings.swing||0)===a.val?"selected":""}"
                    @click=${()=>this.onSelectFeelStep("Swing",a.name,a.val)}
                  >
                    ${a.name}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Humanise</span>
                <span class="feel-axis-hint">Velocity & time micro-drift</span>
              </div>
              <div class="feel-track">
                ${[{name:"Off",val:0},{name:"Subtle",val:25},{name:"Natural",val:50},{name:"Loose",val:80}].map(a=>g`
                  <button
                    class="feel-step-btn ${(this.feelSettings.humanise||0)===a.val?"selected":""}"
                    @click=${()=>this.onSelectFeelStep("Humanise",a.name,a.val)}
                  >
                    ${a.name}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Tone</span>
                <span class="feel-axis-hint">Harmonic filter coloring</span>
              </div>
              <div class="feel-track">
                ${["Warm","Glassy","Dusty"].map(a=>g`
                  <button
                    class="feel-step-btn ${this.feelSettings.tone===a?"selected":""}"
                    @click=${()=>this.onSelectFeelStep("Tone",a,a)}
                  >
                    ${a}
                  </button>
                `)}
              </div>
            </div>

            <button class="more-toggle" @click=${()=>{this.feelMoreOpen=!this.feelMoreOpen}}>
              ${this.feelMoreOpen?"Less ▴":"More · Spread, Density ▾"}
            </button>

            ${this.feelMoreOpen?g`
              <div class="feel-axis" style="margin-top: 8px;">
                <div class="feel-axis-header">
                  <span class="feel-axis-label">Spread</span>
                  <span class="feel-axis-hint">Stereo width</span>
                </div>
                <div class="feel-track">
                  ${[{name:"Tight",val:20},{name:"Wide",val:50},{name:"Huge",val:90}].map(a=>g`
                    <button
                      class="feel-step-btn ${(this.feelSettings.spread||50)===a.val?"selected":""}"
                      @click=${()=>this.onSelectFeelStep("Spread",a.name,a.val)}
                    >
                      ${a.name}
                    </button>
                  `)}
                </div>
              </div>

              <div class="feel-axis">
                <div class="feel-axis-header">
                  <span class="feel-axis-label">Density</span>
                  <span class="feel-axis-hint">Rhythm subdivision</span>
                </div>
                <div class="feel-track">
                  ${[{name:"Sparse",val:25},{name:"Full",val:50},{name:"Dense",val:80}].map(a=>g`
                    <button
                      class="feel-step-btn ${(this.feelSettings.density||50)===a.val?"selected":""}"
                      @click=${()=>this.onSelectFeelStep("Density",a.name,a.val)}
                    >
                      ${a.name}
                    </button>
                  `)}
                </div>
              </div>
            `:""}
          </div>
        `:""}

        ${e&&this.songTotal?g`
          <span style="font-size: 12.5px; font-weight: 800; color: rgba(251, 243, 230, 0.72); padding: 0 8px;">
            ${this.songTotal}
          </span>
        `:""}

        <div class="spacer"></div>

        <!-- Key & Tempo Popover Trigger -->
        <button
          class="tb-btn ${this.openMenu==="tempo"?"active":""}"
          @click=${()=>this.toggleMenu("tempo")}
          aria-label="Key and tempo settings"
        >
          <span class="highlight">${this.keyRoot} ${this.scaleMode}</span>
          <span>·</span>
          <span style="font-family: 'Space Mono', monospace;">${this.bpm}</span>
          <span style="font-size: 11px;">BPM</span>
          <span class="caret">▾</span>
        </button>

        <!-- Tempo / Key / Scale Popover -->
        ${this.openMenu==="tempo"?g`
          <div class="popover-shell tempo-popover">
            <div class="tempo-row">
              <div>
                <div class="popover-title">Tempo</div>
                <div class="bpm-stepper">
                  <button @click=${()=>this.onBpmChange(-1)} aria-label="Decrease BPM">−</button>
                  <span class="bpm-val">${this.bpm}</span>
                  <button @click=${()=>this.onBpmChange(1)} aria-label="Increase BPM">+</button>
                </div>
              </div>

              <div>
                <div class="popover-title">Bars per chord</div>
                <div class="pill-group">
                  ${[1,2,4].map(a=>g`
                    <button
                      class="pill-btn ${this.barsPerChord===a?"selected":""}"
                      @click=${()=>this.onBarsChange(a)}
                    >
                      ${a} bar${a>1?"s":""}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Key root</div>
              <div class="pill-group">
                ${Ms.map(a=>g`
                  <button
                    class="pill-btn ${this.keyRoot===a?"selected":""}"
                    @click=${()=>this.onKeyRootChange(a)}
                  >
                    ${a}
                  </button>
                `)}
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Scale / Mode</div>
              <div class="pill-group">
                ${Ns.map(a=>g`
                  <button
                    class="pill-btn ${this.scaleMode===a?"selected":""}"
                    @click=${()=>this.onScaleModeChange(a)}
                  >
                    ${a}
                  </button>
                `)}
              </div>
            </div>
          </div>
        `:""}

        <!-- Share Trigger -->
        <button
          class="share-btn"
          @click=${this.onShareClick}
          aria-label="Share and export"
          title="Share and export"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"></path>
            <path d="M12 15V3"></path>
            <path d="M8 7l4-4 4 4"></path>
          </svg>
        </button>
      </div>
    `}};W.styles=ce`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .transport-container {
      position: relative;
      min-height: 60px;
      border-radius: 20px;
      background: #2E271F;
      color: #FBF3E6;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      row-gap: 6px;
      column-gap: 4px;
      padding: 9px 10px;
      box-sizing: border-box;
    }

    .play-btn {
      border: none;
      font-family: inherit;
      min-height: 42px;
      padding: 0 18px 0 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      white-space: nowrap;
      color: #2E271F;
      transition: transform 120ms ease, opacity 120ms ease;
    }

    .play-btn:hover {
      opacity: 0.95;
    }

    .play-btn:active {
      transform: scale(0.97);
    }

    .play-icon {
      font-size: 10px;
      line-height: 1;
    }

    .divider {
      width: 1px;
      height: 26px;
      background: rgba(251, 243, 230, 0.16);
      margin: 0 4px;
      flex-shrink: 0;
    }

    .tb-btn {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
      white-space: nowrap;
      background: transparent;
      color: rgba(251, 243, 230, 0.72);
      transition: background 120ms ease, color 120ms ease;
    }

    .tb-btn:hover {
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
    }

    .tb-btn.active {
      background: rgba(251, 243, 230, 0.16);
      color: #FBF3E6;
    }

    .tb-btn .highlight {
      color: #FBF3E6;
    }

    .tb-btn .caret {
      opacity: 0.7;
      font-size: 10px;
    }

    .sec-badge {
      width: 10px;
      height: 10px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .sec-full-group {
      display: flex;
      gap: 2px;
      flex-shrink: 0;
    }

    @media (max-width: 1319px) {
      .sec-full-group {
        display: none !important;
      }
    }

    @media (min-width: 1320px) {
      .sec-compact-btn {
        display: none !important;
      }
    }

    .popover-shell {
      position: absolute;
      bottom: calc(100% + 12px);
      z-index: 50;
      box-sizing: border-box;
      background: #FBF3E6;
      color: #2E271F;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 20px 48px rgba(46, 39, 31, 0.24);
      padding: 14px 16px 16px;
      animation: popover-fade-in 160ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    @keyframes popover-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .popover-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: #8A6B3F;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .sound-popover {
      left: 120px;
      width: 320px;
      max-height: min(68vh, 520px);
      overflow-y: auto;
    }

    .sound-item {
      width: 100%;
      border: none;
      font-family: inherit;
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      text-align: left;
      color: #2E271F;
      transition: background 120ms ease;
    }

    .sound-item:hover {
      background: #F1E4CC;
    }

    .sound-item.selected {
      background: #F1E4CC;
    }

    .sound-dot {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
      margin-top: 3px;
    }

    .sound-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .sound-name {
      font-size: 13px;
      font-weight: 800;
    }

    .sound-desc {
      font-size: 11.5px;
      font-weight: 600;
      color: #6B5F50;
      line-height: 1.35;
    }

    .feel-popover {
      left: 180px;
      width: 360px;
      max-height: min(72vh, 560px);
      overflow-y: auto;
    }

    .feel-axis {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }

    .feel-axis-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .feel-axis-label {
      font-size: 12.5px;
      font-weight: 800;
    }

    .feel-axis-hint {
      font-size: 11px;
      font-weight: 600;
      color: #6B5F50;
    }

    .feel-track {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      background: #F6EADB;
      border-radius: 14px;
      padding: 3px;
    }

    .feel-step-btn {
      flex: 1 1 auto;
      border: none;
      font-family: inherit;
      min-height: 34px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .feel-step-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .more-toggle {
      border: none;
      background: transparent;
      padding: 4px 0;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      color: #8A6B3F;
      cursor: pointer;
    }

    .tempo-popover {
      right: 50px;
      width: 420px;
      max-height: min(72vh, 560px);
      overflow-y: auto;
    }

    .tempo-row {
      display: flex;
      gap: 18px;
      align-items: flex-end;
      flex-wrap: wrap;
    }

    .bpm-stepper {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .bpm-stepper button {
      border: none;
      font-family: inherit;
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: #F1E4CC;
      color: #2E271F;
      font-size: 17px;
      font-weight: 800;
      cursor: pointer;
    }

    .bpm-stepper button:hover {
      background: #E8D6B8;
    }

    .bpm-val {
      font-family: 'Space Mono', monospace;
      font-size: 20px;
      font-weight: 700;
      color: #2E271F;
      min-width: 56px;
      text-align: center;
    }

    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 6px;
    }

    .pill-btn {
      border: none;
      font-family: inherit;
      min-height: 32px;
      padding: 0 10px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: #F6EADB;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .pill-btn:hover {
      background: #F1E4CC;
      color: #2E271F;
    }

    .pill-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .sec-popover {
      left: 100px;
      width: 260px;
      padding: 8px;
    }

    .sec-item {
      border: none;
      font-family: inherit;
      min-height: 42px;
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px;
      color: #2E271F;
      width: 100%;
      text-align: left;
    }

    .sec-item:hover, .sec-item.selected {
      background: #F1E4CC;
    }

    .sec-item-name {
      flex: 1;
      font-size: 13.5px;
      font-weight: 800;
    }

    .sec-item-meta {
      font-size: 11.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .share-btn {
      border: none;
      font-family: inherit;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-left: 4px;
      background: #FBF3E6;
      color: #2E271F;
      transition: transform 120ms ease;
    }

    .share-btn:hover {
      transform: scale(1.04);
    }

    .share-btn:active {
      transform: scale(0.96);
    }

    .spacer {
      flex: 1 1 0;
      min-width: 4px;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 40;
    }
  `;X([x({type:String})],W.prototype,"activeTab",2);X([x({type:Boolean})],W.prototype,"isPlaying",2);X([x({type:String})],W.prototype,"playLabel",2);X([x({type:String})],W.prototype,"moodColor",2);X([x({type:Array})],W.prototype,"sections",2);X([x({type:String})],W.prototype,"activeSectionId",2);X([x({type:String})],W.prototype,"melodyLoop",2);X([x({type:String})],W.prototype,"chordSound",2);X([x({type:String})],W.prototype,"melodySound",2);X([x({type:String})],W.prototype,"chordFeel",2);X([x({type:String})],W.prototype,"melodyFeel",2);X([x({type:Object})],W.prototype,"feelSettings",2);X([x({type:String})],W.prototype,"keyRoot",2);X([x({type:String})],W.prototype,"scaleMode",2);X([x({type:Number})],W.prototype,"bpm",2);X([x({type:Number})],W.prototype,"barsPerChord",2);X([x({type:String})],W.prototype,"songTotal",2);X([k()],W.prototype,"openMenu",2);X([k()],W.prototype,"feelMoreOpen",2);W=X([pe("transport-bar")],W);var Ur=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,ee=(t,e,i,o)=>{for(var s=o>1?void 0:o?_r(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ur(e,i,s),s};let K=class extends de{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.isSaved=!1,this.activeSheet=null,this.feelMoreOpen=!1}toggleSheet(t){this.activeSheet=this.activeSheet===t?null:t}closeSheet(){this.activeSheet=null}onPlayClick(){this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeSheet(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeSheet(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeSheet();const e=this.activeTab==="melody";this.dispatchEvent(new CustomEvent(e?"set-melody-sound":"set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))}onSelectFeelStep(t,e,i){const o=this.activeTab==="melody";t==="Pattern"?this.dispatchEvent(new CustomEvent(o?"set-melody-feel":"set-chord-feel",{detail:{feel:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:i},bubbles:!0,composed:!0}))}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onRerollProgression(){this.closeSheet(),this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onToggleSaved(){this.closeSheet(),this.dispatchEvent(new CustomEvent(this.isSaved?"unsave-set":"save-set",{bubbles:!0,composed:!0}))}onViewSavedLoops(){this.closeSheet(),this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenShare(){this.closeSheet(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((l,c)=>(l.id||String.fromCharCode(65+c))===this.activeSectionId)||this.sections[0]||{id:"A",name:"Chorus",tint:"#F1E4CC"},o=i.id||i.name.charAt(0),s=this.isPlaying?"#FBF3E6":this.moodColor,n=this.isPlaying?"■":"▶",r=t?this.melodySound:this.chordSound,a=t?this.melodyFeel:this.chordFeel;return g`
      <div class="dock-container" data-screen-label="MobileDock">
        <!-- Play / Stop -->
        <button
          class="play-btn"
          style="background: ${s};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          ${n}
        </button>

        <div class="divider"></div>

        <!-- Section Badge -->
        <button
          class="dock-btn ${this.activeSheet==="section"?"active":""}"
          @click=${()=>this.toggleSheet("section")}
          aria-label="Choose section"
        >
          <span class="sec-letter-badge" style="background: ${i.tint||"#F1E4CC"};">
            ${o}
          </span>
          <span class="caret-mini">▾</span>
        </button>

        <!-- Sound Button -->
        ${e?"":g`
          <button
            class="dock-btn ${this.activeSheet==="sound"?"active":""}"
            @click=${()=>this.toggleSheet("sound")}
            aria-label="Sound settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
              <path d="M16.5 8.5a5 5 0 0 1 0 7"></path>
              <path d="M19 6a8.5 8.5 0 0 1 0 12"></path>
            </svg>
          </button>

          <!-- Feel Button -->
          <button
            class="dock-btn ${this.activeSheet==="feel"?"active":""}"
            @click=${()=>this.toggleSheet("feel")}
            aria-label="Feel settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8"></path>
              <circle cx="16" cy="7" r="2"></circle>
              <circle cx="10" cy="17" r="2"></circle>
            </svg>
          </button>
        `}

        <!-- Key & Tempo Button -->
        <button
          class="dock-btn ${this.activeSheet==="key"?"active":""}"
          @click=${()=>this.toggleSheet("key")}
          aria-label="Key and tempo settings"
        >
          <span class="key-badge-text">${this.keyRoot} ${this.scaleMode?this.scaleMode.slice(0,3):"maj"}</span>
        </button>

        <div class="spacer"></div>

        <!-- More Actions (⋯) -->
        <button
          class="more-btn"
          @click=${()=>this.toggleSheet("more")}
          aria-label="More actions"
        >
          ⋯
        </button>

        <!-- More Popover (Upwards) -->
        ${this.activeSheet==="more"?g`
          <div class="popover-up">
            <button class="popover-menu-item" @click=${this.onRerollProgression}>
              <span class="label">Try another progression</span>
              <span class="desc">New chords for this section, with undo</span>
            </button>
            <button class="popover-menu-item" @click=${this.onToggleSaved}>
              <span class="label">${this.isSaved?"Kept":"Keep this loop"}</span>
              <span class="desc">Save it to your loops</span>
            </button>
            <button class="popover-menu-item" @click=${this.onViewSavedLoops}>
              <span class="label">Saved loops</span>
              <span class="desc">Load a loop into this section</span>
            </button>
            <button class="popover-menu-item" @click=${this.onOpenShare}>
              <span class="label">Share and export</span>
              <span class="desc">MIDI, WAV, M8, Circuit</span>
            </button>
          </div>
        `:""}

        <!-- Section Popover (Upwards) -->
        ${this.activeSheet==="section"?g`
          <div class="popover-up" style="max-height: 320px; overflow-y: auto;">
            <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8A6B3F; padding: 6px 10px 4px;">
              Section
            </div>
            ${this.sections.map((l,c)=>{const d=l.id||String.fromCharCode(65+c);return g`
                <button
                  class="popover-menu-item"
                  style="flex-direction: row; align-items: center; gap: 10px; background: ${d===this.activeSectionId?"#F1E4CC":"transparent"};"
                  @click=${()=>this.onSelectSection(d)}
                >
                  <span class="sec-letter-badge" style="background: ${l.tint||"#F1E4CC"};">${d}</span>
                  <span class="label" style="flex: 1;">${l.name}</span>
                  <span class="desc">${l.order?l.order.length:4} bars</span>
                </button>
              `})}
            <div style="height: 1px; background: rgba(46, 39, 31, 0.08); margin: 4px 6px;"></div>
            <button class="popover-menu-item" style="color: #8A6B3F;" @click=${this.onNewSection}>
              <span class="label">+ New section</span>
            </button>
          </div>
        `:""}
      </div>

      <!-- Backdrop for bottom sheets -->
      ${this.activeSheet==="key"||this.activeSheet==="feel"||this.activeSheet==="sound"?g`
        <div class="sheet-backdrop" @click=${this.closeSheet}></div>
      `:""}

      <!-- Key & Tempo Bottom Sheet -->
      ${this.activeSheet==="key"?g`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">Key & Tempo</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div class="sheet-section-title">Tempo (BPM)</div>
          <div class="bpm-stepper">
            <button @click=${()=>this.onBpmChange(-1)}>−</button>
            <span class="bpm-val">${this.bpm}</span>
            <button @click=${()=>this.onBpmChange(1)}>+</button>
          </div>

          <div class="sheet-section-title">Bars per chord</div>
          <div class="pill-group">
            ${[1,2,4].map(l=>g`
              <button
                class="pill-btn ${this.barsPerChord===l?"selected":""}"
                @click=${()=>this.onBarsChange(l)}
              >
                ${l} bar${l>1?"s":""}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Key Root</div>
          <div class="pill-group">
            ${Ms.map(l=>g`
              <button
                class="pill-btn ${this.keyRoot===l?"selected":""}"
                @click=${()=>this.onKeyRootChange(l)}
              >
                ${l}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Scale / Mode</div>
          <div class="pill-group">
            ${Ns.map(l=>g`
              <button
                class="pill-btn ${this.scaleMode===l?"selected":""}"
                @click=${()=>this.onScaleModeChange(l)}
              >
                ${l}
              </button>
            `)}
          </div>
        </div>
      `:""}

      <!-- Feel Bottom Sheet -->
      ${this.activeSheet==="feel"?g`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${t?"Melody feel":"Chord feel"}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div class="sheet-section-title">Pattern</div>
          <div class="pill-group">
            ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(l=>g`
              <button
                class="pill-btn ${l===a?"selected":""}"
                @click=${()=>this.onSelectFeelStep("Pattern",l,l)}
              >
                ${l.replace(/ chords|\(swing\)/g,"")}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Swing</div>
          <div class="pill-group">
            ${[{name:"Straight",val:0},{name:"Light",val:20},{name:"Medium",val:45},{name:"Hard",val:70}].map(l=>g`
              <button
                class="pill-btn ${(this.feelSettings.swing||0)===l.val?"selected":""}"
                @click=${()=>this.onSelectFeelStep("Swing",l.name,l.val)}
              >
                ${l.name}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Humanise</div>
          <div class="pill-group">
            ${[{name:"Off",val:0},{name:"Subtle",val:25},{name:"Natural",val:50},{name:"Loose",val:80}].map(l=>g`
              <button
                class="pill-btn ${(this.feelSettings.humanise||0)===l.val?"selected":""}"
                @click=${()=>this.onSelectFeelStep("Humanise",l.name,l.val)}
              >
                ${l.name}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Tone</div>
          <div class="pill-group">
            ${["Warm","Glassy","Dusty"].map(l=>g`
              <button
                class="pill-btn ${this.feelSettings.tone===l?"selected":""}"
                @click=${()=>this.onSelectFeelStep("Tone",l,l)}
              >
                ${l}
              </button>
            `)}
          </div>
        </div>
      `:""}

      <!-- Sound Bottom Sheet -->
      ${this.activeSheet==="sound"?g`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${t?"Melody sound":"Chord sound"}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${Es.map(l=>g`
              <button
                class="popover-menu-item"
                style="flex-direction: row; align-items: flex-start; gap: 12px; background: ${l.name===r?"#F1E4CC":"transparent"};"
                @click=${()=>this.onSelectSound(l.name)}
              >
                <span style="width: 12px; height: 12px; border-radius: 4px; background: ${l.color}; flex-shrink: 0; margin-top: 3px;"></span>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span class="label">${l.name}</span>
                  <span class="desc">${l.desc}</span>
                </div>
              </button>
            `)}
          </div>
        </div>
      `:""}
    `}};K.styles=ce`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .dock-container {
      position: relative;
      margin: 6px 10px 18px;
      border-radius: 20px;
      background: #2E271F;
      color: #FBF3E6;
      padding: 7px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-sizing: border-box;
      z-index: 30;
    }

    .play-btn {
      border: none;
      font-family: inherit;
      width: 48px;
      height: 44px;
      border-radius: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #2E271F;
      font-size: 15px;
      transition: transform 120ms ease;
    }

    .play-btn:active {
      transform: scale(0.94);
    }

    .divider {
      width: 1px;
      height: 26px;
      background: rgba(251, 243, 230, 0.14);
      flex-shrink: 0;
    }

    .dock-btn {
      border: none;
      font-family: inherit;
      min-width: 44px;
      height: 44px;
      padding: 0 10px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
      cursor: pointer;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 120ms ease, transform 120ms ease;
    }

    .dock-btn:hover {
      background: rgba(251, 243, 230, 0.16);
    }

    .dock-btn:active {
      transform: scale(0.94);
    }

    .dock-btn.active {
      background: rgba(251, 243, 230, 0.18);
    }

    .sec-letter-badge {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      color: #2E271F;
      font-size: 11px;
      font-weight: 800;
      display: grid;
      place-items: center;
    }

    .caret-mini {
      font-size: 10px;
      opacity: 0.7;
    }

    .key-badge-text {
      font-size: 12.5px;
      font-weight: 800;
      white-space: nowrap;
    }

    .spacer {
      flex: 1 1 0;
      min-width: 0;
    }

    .more-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
    }

    .more-btn:active {
      transform: scale(0.94);
    }

    /* Bottom Sheets */
    .sheet-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.45);
      z-index: 60;
      animation: sheet-fade-in 180ms ease;
    }

    @keyframes sheet-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bottom-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 62;
      max-height: calc(100% - 24px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: #F6EADB;
      border-radius: 26px 26px 0 0;
      padding: 14px 18px 26px;
      box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5);
      animation: sheet-slide-up 200ms cubic-bezier(0.23, 1, 0.32, 1);
      color: #2E271F;
    }

    @keyframes sheet-slide-up {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .sheet-handle {
      width: 38px;
      height: 4px;
      border-radius: 3px;
      background: rgba(46, 39, 31, 0.18);
      margin: 0 auto 13px;
    }

    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 12px;
    }

    .sheet-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
    }

    .sheet-close-btn {
      border: none;
      font-family: inherit;
      background: #F1E4CC;
      color: #2E271F;
      border-radius: 100px;
      width: 32px;
      height: 32px;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;
      display: grid;
      place-items: center;
    }

    .popover-up {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 8px);
      z-index: 40;
      background: #FBF3E6;
      color: #2E271F;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 18px 40px rgba(46, 39, 31, 0.24);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      animation: sheet-fade-in 140ms ease;
    }

    .popover-menu-item {
      border: none;
      font-family: inherit;
      border-radius: 14px;
      background: transparent;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 11px 12px;
      text-align: left;
      color: #2E271F;
      min-height: 44px;
    }

    .popover-menu-item:hover, .popover-menu-item:active {
      background: #F1E4CC;
    }

    .popover-menu-item .label {
      font-size: 13.5px;
      font-weight: 800;
    }

    .popover-menu-item .desc {
      font-size: 12px;
      font-weight: 600;
      color: #6B5F50;
    }

    .sheet-section-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8A6B3F;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .pill-btn {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 12px;
      border-radius: 11px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      background: #FBF3E6;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .pill-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .bpm-stepper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 6px;
    }

    .bpm-stepper button {
      border: none;
      font-family: inherit;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #FBF3E6;
      color: #2E271F;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
    }

    .bpm-val {
      font-family: 'Space Mono', monospace;
      font-size: 22px;
      font-weight: 700;
      color: #2E271F;
      min-width: 60px;
      text-align: center;
    }
  `;ee([x({type:String})],K.prototype,"activeTab",2);ee([x({type:Boolean})],K.prototype,"isPlaying",2);ee([x({type:String})],K.prototype,"playLabel",2);ee([x({type:String})],K.prototype,"moodColor",2);ee([x({type:Array})],K.prototype,"sections",2);ee([x({type:String})],K.prototype,"activeSectionId",2);ee([x({type:String})],K.prototype,"chordSound",2);ee([x({type:String})],K.prototype,"melodySound",2);ee([x({type:String})],K.prototype,"chordFeel",2);ee([x({type:String})],K.prototype,"melodyFeel",2);ee([x({type:Object})],K.prototype,"feelSettings",2);ee([x({type:String})],K.prototype,"keyRoot",2);ee([x({type:String})],K.prototype,"scaleMode",2);ee([x({type:Number})],K.prototype,"bpm",2);ee([x({type:Number})],K.prototype,"barsPerChord",2);ee([x({type:Boolean})],K.prototype,"isSaved",2);ee([k()],K.prototype,"activeSheet",2);ee([k()],K.prototype,"feelMoreOpen",2);K=ee([pe("mobile-dock")],K);const As={oasis:{id:"oasis",name:"Oasis",color:"#F6D98B",font:"Anton, sans-serif",weight:800,pillFs:13,pillTrack:"0.08em",presetId:"guitar",rhythmStyle:"driving_strum",defaultBpm:116,tagline:"Leans on a bright major chord that shouldn’t fit, then walks home",theoryTagline:"Borrowed major ♭III, plagal IV–I, Major III substitution, anchored D4/G4 guitar drone",plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",sig:[{k:"Harmony",v:"Borrows a bright chord from outside the key — ♭III or ♭VI — and treats it as if it belonged."},{k:"Cadence",v:"Lands on IV–I rather than V–I, so the ending feels wide open instead of shut."},{k:"Voicing",v:"A sus4 held over a root that never moves, strummed the whole bar."}],hoist:["E♭maj7","Fmaj7","A♭"],genre:"Rock",mood:"Uplifting",favoredKeys:["C","G","D","A","E"],favoredScales:["MAJOR","MIXOLYDIAN"],favoredMoods:["Anthemic","Uplifting"],basisArchetypes:[["C","G","Am","E7","F","G","C","C"],["C","Bb","F","C","C","Bb","F","G"],["C","G","Eb","F","C","G","F","C"]],cMajorBasisChords:["C","G","Am","E7","F","G","C","C"],signatureTricks:[{id:"oasis-major-iii",name:"Major III Lift",roman:"III7",plain:"Replaces the quiet minor iii with a soaring major chord that lifts the whole bar",theory:"Secondary dominant (V7/vi) resolving to IV or vi (e.g. E7 in C major)",semitones:4,quality:"dom7"},{id:"oasis-bvii",name:"Borrowed ♭VII",roman:"♭VII",plain:"Mixolydian borrowing that gives that anthem swagger",theory:"Flattened 7th major triad borrowed from Mixolydian (e.g. B♭ in C major)",semitones:10,quality:"maj"},{id:"oasis-biii",name:"Borrowed ♭III",roman:"♭III",plain:"Surprise bright borrowed lift before walking back to the tonic",theory:"Major chord on the flat third borrowed from parallel minor (e.g. E♭ in C major)",semitones:3,quality:"maj"},{id:"oasis-minor-iv",name:"Minor iv Walkdown",roman:"iv",plain:"Emotional chromatic slide from IV into iv before resolving home to I",theory:"Plagal cadence with borrowed minor subdominant (e.g. Fm in C major)",semitones:5,quality:"min"}]},beatles:{id:"beatles",name:"The Beatles",color:"#F4B266",font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12.5,pillTrack:"0.03em",presetId:"rhodes",rhythmStyle:"straight_8ths",defaultBpm:108,tagline:"Warm 60s melodic surprises with bittersweet minor cadences",theoryTagline:"Minor iv cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",plain:"warm 60s melodic surprises with bittersweet minor cadences",theory:"minor iv plagal cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",sig:[{k:"Harmony",v:"Bittersweet minor iv plagal cadences and unexpected chromatic shifts."},{k:"Motion",v:"Secondary dominants resolving to unexpected diatonic steps."},{k:"Melody",v:"Descending inner voice motion held together by strong vocal counterpoint."}],hoist:["Fm","D7","E7"],genre:"Pop",mood:"Warm",favoredKeys:["C","G","F","D","A","E"],favoredScales:["MAJOR","DORIAN"],favoredMoods:["Warm","Playful"],basisArchetypes:[["C","E7","Am","Fm","C","G7","C","C"],["C","D7","F","C","C","D7","G7","C"],["C","Am","Dm7","G7","F","Fm","C","G7"]],cMajorBasisChords:["C","E7","Am","Fm","C","G7","C","C"],signatureTricks:[{id:"beatles-minor-iv",name:"Minor iv Cadence",roman:"iv",plain:"The ultimate bittersweet Beatles trick: major IV dips into dark minor iv before resolving home",theory:"Minor subdominant borrowing (e.g. Fm in C major, IV -> iv -> I)",semitones:5,quality:"min"},{id:"beatles-major-ii",name:"Secondary Dominant II7",roman:"II7",plain:"Bright, forward-pushing dominant that charges straight into the V chord",theory:"Secondary dominant (V7/V, e.g. D7 in C major -> G7)",semitones:2,quality:"dom7"},{id:"beatles-major-iii",name:"Major III7 Turn",roman:"III7",plain:"Unexpected major push on the 3rd degree leading into the minor relative",theory:"V7/vi resolving to vi (e.g. E7 -> Am in C major)",semitones:4,quality:"dom7"}]},radiohead:{id:"radiohead",name:"Radiohead",color:"#C9A9E0",font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:84,tagline:"Swaps chords for their stranger neighbours a third away",theoryTagline:"Chromatic mediants (♭VI, ♭III), parallel modal mixture, haunting voice leading",plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",sig:[{k:"Harmony",v:"Chromatic mediants: the chord a third away, in the wrong quality."},{k:"Colour",v:"Major and minor of the same key sit side by side, neither one winning."},{k:"Motion",v:"Loops that circle without resolving, often in odd bar lengths."}],hoist:["A♭maj7","E♭maj7","Em7"],genre:"Rock",mood:"Melancholy",favoredKeys:["A","E","C","D","F"],favoredScales:["NATURAL_MINOR","DORIAN","MAJOR"],favoredMoods:["Melancholy","Dark"],basisArchetypes:[["C","E","F","Fm","C","E","F","Fm"],["Am","D","Em","G","Am","F","Em","G"],["C","Ab","Eb","G","C","Ab","Fm","G"]],cMajorBasisChords:["C","E","F","Fm","C","E","F","Fm"],signatureTricks:[{id:"radiohead-chromatic-mediant",name:"Chromatic Mediant",roman:"III",plain:"Jumps from I straight to major III, sharing one note while every other voice twists",theory:"Chromatic mediant with smooth half-step voice leading (e.g. C -> E in C major)",semitones:4,quality:"maj"},{id:"radiohead-bvi",name:"Parallel ♭VI Mediant",roman:"♭VI",plain:"Dark, cinematic plunge into the flat-sixth from parallel minor",theory:"Modal borrowing of ♭VI (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"radiohead-minor-iv",name:"Minor iv Fade",roman:"iv",plain:"Plunges the IV into minor iv for that haunting Thom Yorke descent",theory:"Borrowed minor iv (e.g. Fm in C major)",semitones:5,quality:"min"}]},nirvana:{id:"nirvana",name:"Nirvana",color:"#F2A79B",font:"'Rock Salt', cursive",weight:400,pillFs:10,pillTrack:"0",presetId:"stab",rhythmStyle:"heavy_strum",defaultBpm:118,tagline:"Moves the root in visceral jumps with raw parallel power chords",theoryTagline:"Minor third and tritone root jumps, parallel chromatic triads, open 5ths",plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",sig:[{k:"Motion",v:"Roots jump by minor third and tritone instead of stepping."},{k:"Voicing",v:"Power chords with no third, so major or minor stays undecided."},{k:"Space",v:"The middle register is left empty; the weight is at the bottom."}],hoist:["A♭","E♭maj7","B♭"],genre:"Rock",mood:"Dark",favoredKeys:["E","D","F","C","A"],favoredScales:["NATURAL_MINOR","DORIAN","HARMONIC_MINOR"],favoredMoods:["Dark","Tense"],basisArchetypes:[["C","Eb","Ab","F","C","Eb","Ab","F"],["C","F","Eb","Ab","C","F","Eb","Ab"],["Am","F","D","F","Am","F","D","G"]],cMajorBasisChords:["C","Eb","Ab","F","C","Eb","Ab","F"],signatureTricks:[{id:"nirvana-biii",name:"Parallel ♭III Shift",roman:"♭III",plain:"Power chord slide up a minor 3rd, breaking diatonic scale rules with raw energy",theory:"Symmetric minor 3rd jump (e.g. C -> E♭)",semitones:3,quality:"maj"},{id:"nirvana-bvi",name:"Parallel ♭VI Jump",roman:"♭VI",plain:"Visceral jump to the flat 6th before dropping down to IV",theory:"Parallel chromatic power motion (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"nirvana-bvii",name:"Subtonic ♭VII Slam",roman:"♭VII",plain:"Heavy punk rock bounce on the flat-7th",theory:"Whole-step drop from tonic (e.g. B♭ in C major)",semitones:10,quality:"maj"}]},"steely-dan":{id:"steely-dan",name:"Steely Dan",color:"#9CC0EC",font:"'Playfair Display', serif",weight:700,italic:!0,pillFs:13,pillTrack:"0.01em",presetId:"rhodes",rhythmStyle:"syncopated_16ths",defaultBpm:112,tagline:"Adds one note that makes a plain chord sound expensive",theoryTagline:"Mu-major (add9 without 7th), ii–V–I jazz chains, tritone substitutions",plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",sig:[{k:"Harmony",v:"One added 9th over a plain triad, and the 7th left out."},{k:"Motion",v:"ii–V chains that keep handing off to the next key."},{k:"Substitution",v:"A tritone sub where the dominant was expected."}],hoist:["Cmaj9","D♭7","Fm7"],genre:"Jazz-ish",mood:"Warm",favoredKeys:["C","F","G","D","Bb","Eb"],favoredScales:["MAJOR","DORIAN","MIXOLYDIAN"],favoredMoods:["Warm","Peaceful"],basisArchetypes:[["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],["Cmaj9","Dm7","Db7","Cmaj9","Em7","A7","Dm7","G7"],["Cmaj9","Am7","Dm7","Fm7","Em7","A7","Dm7","G7"]],cMajorBasisChords:["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],signatureTricks:[{id:"steely-mu-major",name:"Mu-Major (add9)",roman:"I(add9)",plain:"Major triad with the 2nd added right against the 3rd—the signature Donald Fagen sound",theory:"Major triad + 9th with no 7th, creating smooth cluster dissonance (e.g. Cmaj9 / Cadd9)",semitones:0,quality:"maj9"},{id:"steely-tritone-sub",name:"Tritone Substitution",roman:"subV7",plain:"Swaps out the dominant G7 for D♭7, sliding smoothly into C by a half-step",theory:"Dominant 7th a tritone away (e.g. D♭7 -> C in C major)",semitones:1,quality:"dom7"},{id:"steely-secondary-dominant",name:"Secondary VI7 Turn",roman:"VI7",plain:"Jazz approach chord setting up the ii-V turnaround",theory:"Secondary dominant to ii (e.g. A7 -> Dm7 in C major)",semitones:9,quality:"dom7"}]},"mac-demarco":{id:"mac-demarco",name:"Mac DeMarco",color:"#B8CC9E",font:"'Archivo Black', sans-serif",weight:400,pillFs:12,pillTrack:"-0.01em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:92,tagline:"Two lush chords looped loose, bass sliding underneath",theoryTagline:"Maj7 to min7 descending walkdowns, chromatic bass motion, unresolved floating feel",plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",sig:[{k:"Harmony",v:"Two maj7 chords vamped, no third chord needed."},{k:"Motion",v:"The bass slides chromatically underneath while the chords sit still."},{k:"Feel",v:"Nothing resolves; the loop just keeps leaning."}],hoist:["Fmaj7","Cmaj9","Em7"],genre:"Lo-fi/Chill",mood:"Warm",favoredKeys:["D","C","A","G","F"],favoredScales:["MAJOR","LYDIAN"],favoredMoods:["Dreamy","Peaceful"],basisArchetypes:[["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],["Dm7","Em7","Fmaj7","Em7","Dm7","Em7","Fmaj7","G7"],["Fmaj7","Abmaj7","Cmaj7","Em7","Fmaj7","G7","Cmaj7","Cmaj7"]],cMajorBasisChords:["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],signatureTricks:[{id:"mac-maj7-vamp",name:"Lush Maj7 Step",roman:"IVmaj7",plain:"Opens on a lazy, dreamy major 7th chord that floats without rushing to resolve",theory:"Major 7th on the subdominant (e.g. Fmaj7 in C major)",semitones:5,quality:"maj7"},{id:"mac-chromatic-approach",name:"Chromatic Approach",roman:"♭VImaj7",plain:"Dreamy modulation borrowed from parallel minor with chorus warble",theory:"Borrowed ♭VImaj7 (e.g. A♭maj7 in C major)",semitones:8,quality:"maj7"},{id:"mac-stepdown",name:"Smooth iiim7 Stepdown",roman:"iiim7",plain:"Gentle stepdown connecting the IVmaj7 to iim7",theory:"Diatonic minor 7th stepdown (e.g. Em7 in C major)",semitones:4,quality:"min7"}]}},Os=Object.values(As);function $e(t){if(!t)return;const e=t.toLowerCase().trim().replace(/\s+/g,"-");return As[e]||Os.find(i=>i.name.toLowerCase()===t.toLowerCase().trim())}function Gr(t,e,i="C",o="MAJOR"){if(!e)return null;const s=$e(e);if(!s)return null;const n=i&&vt.includes(i)?i:s.favoredKeys&&s.favoredKeys.length?s.favoredKeys[Math.floor(Math.random()*s.favoredKeys.length)]:"C",r=o&&s.favoredScales?.includes(o)?o:s.favoredScales&&s.favoredScales.length?s.favoredScales[Math.floor(Math.random()*s.favoredScales.length)]:"MAJOR",a=s.favoredMoods&&s.favoredMoods.length?s.favoredMoods[Math.floor(Math.random()*s.favoredMoods.length)]:s.mood;let l=null;if(Math.random()<.5)try{const d=mi(t,s.genre,a,{key:n,scaleType:r,length:8});if(d&&d.chords.length===8){const p=Math.random()<.5?2:3,u=Math.random()<.5?5:6,h=[p];Math.random()<.6&&h.push(u);const m=d.chords.map((f,b)=>{if(h.includes(b)&&s.signatureTricks.length>0){const S=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],I=vi(S,n,r),{root:A,suffix:F}=di(I.chordName);let $=F||"maj";return $==="m"&&($="min"),{root:A,quality:$}}const{root:v,suffix:y}=di(f.name);let C=y||"maj";return C==="m"&&(C="min"),{root:v,quality:C}});l=co(t,n,r,m,s.genre,a)}}catch{l=null}if(!l){const d=s.basisArchetypes&&s.basisArchetypes.length>0?s.basisArchetypes:[s.cMajorBasisChords],p=[...d[Math.floor(Math.random()*d.length)]];if(Math.random()<.4&&s.signatureTricks.length>0){const v=Math.floor(Math.random()*(p.length-1))+1,y=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],C=vi(y,"C","MAJOR");p[v]=C.chordName}const u=L[n]??0,h=L.C,m=((u-h)%12+12)%12,f=z(n,r),b=p.map(v=>{const y=bs(v,m,f),{root:C,suffix:S}=di(y);let I=S||"maj";return I==="m"&&(I="min"),{root:C,quality:I}});l=co(t,n,r,b,s.genre,a)}return l?{...l,genre:s.genre,mood:a,bpm:s.defaultBpm}:null}function vi(t,e,i){const o=L[e]??0,s=z(e,i),n=((o+t.semitones)%12+12)%12,r=t.roman.includes("♭")||t.roman.includes("b")||t.roman.includes("subV")||s,a=B(n,r);let l="";switch(t.quality){case"maj":l="";break;case"min":l="m";break;case"dom7":l="7";break;case"min7":l="m7";break;case"maj7":l="maj7";break;case"maj9":l="maj9";break;case"sus4":l="sus4";break;default:l=t.quality;break}return{chordName:`${a}${l}`,root:a,quality:t.quality,roman:t.roman}}function mo(t,e,i){if(!i)return[];const o=$e(i);if(!o)return[];const s=z(t,e);return o.signatureTricks.map(n=>{const r=vi(n,t,e),a=L[r.root]??0,l=n.quality==="min"?[0,3,7]:n.quality==="dom7"?[0,4,7,10]:n.quality==="min7"?[0,3,7,10]:n.quality==="maj7"?[0,4,7,11]:n.quality==="maj9"?[0,2,4,7]:[0,4,7],c=Dt(r.root,n.quality,s),d=l.map(p=>B(a+p,c));return{trick:n,chordName:r.chordName,roman:r.roman,notes:d,plain:n.plain,theory:n.theory,tension:n.quality==="dom7"?.65:n.semitones===4?.55:.4}})}const Kt={Oasis:{l1:"OA",l2:"SIS",font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},Radiohead:{l1:"RADIO",l2:"HEAD",font:"'Space Mono', monospace",pillFs:12.5,pillTrack:"0.02em",weight:700},Nirvana:{l1:"NIR",l2:"VANA",font:"'Rock Salt', cursive",pillFs:10,pillTrack:"0",weight:400},"Steely Dan":{l1:"STEELY",l2:"DAN",font:"'Playfair Display', serif",pillFs:13,pillTrack:"0.01em",weight:700,italic:!0},"Mac DeMarco":{l1:"mac",l2:"demarco",font:"'Archivo Black', sans-serif",pillFs:12,pillTrack:"-0.01em",weight:400},"The Beatles":{l1:"THE",l2:"BEATLES",font:"'Plus Jakarta Sans', sans-serif",pillFs:12.5,pillTrack:"0.03em",weight:800}},zo={Oasis:[{roman:"♭III",chord:"E♭maj7",name:"Borrowed ♭III",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"IV",chord:"Fmaj7",name:"Plagal landing",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"♭VI",chord:"A♭",name:"Borrowed ♭VI",role:"Borrowed",semitones:8,quality:"maj"}],Radiohead:[{roman:"♭VI",chord:"A♭maj7",name:"Chromatic mediant",role:"Borrowed",semitones:8,quality:"maj7"},{roman:"♭III",chord:"E♭maj7",name:"Modal mixture",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"iii",chord:"Em7",name:"A third away",role:"Mediant",semitones:4,quality:"min7"}],Nirvana:[{roman:"♭VI",chord:"A♭",name:"Minor-third jump",role:"Borrowed",semitones:8,quality:"maj"},{roman:"♭III",chord:"E♭maj7",name:"Flat-third root",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"♭VII",chord:"B♭",name:"Root drops away",role:"Borrowed",semitones:10,quality:"maj"}],"Steely Dan":[{roman:"I9",chord:"Cmaj9",name:"Added 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"♭II7",chord:"D♭7",name:"Tritone sub",role:"Borrowed",semitones:1,quality:"dom7"},{roman:"iv",chord:"Fm7",name:"Minor iv",role:"Borrowed",semitones:5,quality:"min7"}],"Mac DeMarco":[{roman:"IV",chord:"Fmaj7",name:"maj7 vamp",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"I9",chord:"Cmaj9",name:"Add the 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"iii",chord:"Em7",name:"Never resolves",role:"Mediant",semitones:4,quality:"min7"}],"The Beatles":[{roman:"iv",chord:"Fm",name:"Minor iv fade",role:"Borrowed",semitones:5,quality:"min"},{roman:"III7",chord:"E7",name:"Major III lift",role:"Dominant",semitones:4,quality:"dom7"},{roman:"II7",chord:"D7",name:"Take the II7",role:"Subdominant",semitones:2,quality:"dom7"}]};function Fs(t,e,i="C",o="MAJOR"){const s=$e(e);if(!s)return null;const n=zo[s.name]||zo[s.id];if(!n||!n.length)return null;const r=n.map(d=>{const p=vi({id:d.name,name:d.name,roman:d.roman,semitones:d.semitones,quality:d.quality},i,o);return{roman:d.roman,chord:p.chordName,name:d.name,role:d.role,semitones:d.semitones}}),a=String(t.functionLabel||"");let l=1;/^Subdominant/.test(a)?l=1:/Dominant/.test(a)?l=r.length-1:/^Tonic/.test(a)&&(l=0);const c=[l].concat(r.map((d,p)=>p).filter(d=>d!==l));for(let d=0;d<c.length;d++){const p=r[c[d]];if(p&&p.chord!==t.name)return p}return null}var Vr=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,Re=(t,e,i,o)=>{for(var s=o>1?void 0:o?qr(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Vr(e,i,s),s};function Hr(t,e,i){return Math.round(t+(e-t)*i)}function Ds(t,e,i){const o=[1,3,5].map(n=>parseInt(t.slice(n,n+2),16)),s=[1,3,5].map(n=>parseInt(e.slice(n,n+2),16));return"#"+o.map((n,r)=>Hr(n,s[r],i).toString(16).padStart(2,"0")).join("")}function Jr(t){const e=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*e[0]+.7152*e[1]+.0722*e[2]}function Lo(t){let i=t;for(let o=1;o<=20&&(i=Ds(t,"#2E271F",o*.05),!((.925+.05)/(Jr(i)+.05)>=4.7));o++);return i}let Me=class extends de{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC",this.band=null}onSelectFeel(t){this.activeFeel=t,this.dispatchEvent(new CustomEvent("swap-feel-change",{detail:{feel:t},bubbles:!0,composed:!0}))}onAudition(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onConfirm(){this.dispatchEvent(new CustomEvent("swap-confirm",{bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,i=`calc((100% - ${12*(t-1)}px) / ${t})`,o=this.chord?.tension??.3,s=ie(o).color,n=this.feelings.find(v=>v.name===this.activeFeel)||this.feelings[0],r=Math.max(0,this.feelings.findIndex(v=>v.name===n?.name)),a=Math.max(1,this.feelings.length),l=`calc((100% - ${7*(a-1)}px) / ${a})`,c=r===0,d=r===a-1;let p=`left: calc(${l} * ${r} + ${7*r}px); width: ${l};`,u="12px";c&&d?(p="left: 0; right: 0; width: 100%;",u="0 0 12px 12px"):c?(p=`left: 0; width: ${l};`,u="0 12px 12px 12px"):d&&(p=`left: auto; right: 0; width: ${l};`,u="12px 0 12px 12px");const h=n?.tension??.3,m=Lo(ie(h).color),f=`Bar ${this.swapIndex+1} · ${this.chord?.name||"Chord"} could feel…`,b=this.pickedChord?`hearing swap: ${this.pickedChord.name}`:"tap to audition in the loop";return g`
      <div class="lane-shell" data-swap-lane="1">
        <!-- Neck connecting the active chord pad down to the lane -->
        <div
          class="lane-neck"
          style="
            left: calc(${i} * ${e} + ${12*e}px);
            width: ${i};
            background: ${s};
          "
        ></div>

        <div class="lane-clip">
          <div class="lane-panel" style="background: ${s};">
            <!-- Header bar -->
            <div class="lane-header">
              <div class="lane-kicker">${f}</div>
              <div style="flex: 1; min-width: 0;"></div>
              <div class="lane-hint">${b}</div>
              <button
                class="lane-close-btn"
                @click=${this.onClose}
                aria-label="Close swap lane"
              >×</button>
            </div>

            ${this.band?g`
              <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #5B5145; background: ${this.band.color}3D; border-radius: 10px; padding: 6px 12px; margin-top: 9px; animation: cvfv-trayitem 300ms 200ms var(--cv-ease, ease) both;">
                <div style="width: 7px; height: 7px; border-radius: 2px; background: ${this.band.color}; flex-shrink: 0;"></div>
                <span>${this.band.name} mode — their moves first</span>
                <span style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted); margin-left: auto;">${this.band.plain||""}</span>
              </div>
            `:""}

            <!-- Feelings row -->
            <div class="feelings-row">
              ${this.feelings.map(v=>{const y=v.name===n?.name,C=ie(v.tension),S=y?Lo(C.color):Ds(C.color,"#FBF6EC",.5);return g`
                  <button
                    class="feel-tile"
                    data-feel-tile="1"
                    data-sel="${y?"1":"0"}"
                    style="
                      background: ${S};
                      border-radius: ${y?"12px 12px 0 0":"12px"};
                      box-shadow: ${y?"none":"inset 0 0 0 1.5px rgba(46,39,31,0.14)"};
                    "
                    @click=${()=>this.onSelectFeel(v.name)}
                  >
                    <span class="feel-tile-name" style="color: ${y?"#FBF6EC":"#2E271F"};">${v.name}</span>
                    <span class="feel-tile-sub" style="color: ${y?"#FBF6EC":"#2E271F"};">${v.sub}</span>
                  </button>
                `})}
            </div>

            <!-- Chords row extruded from active feeling -->
            <div class="chords-shell" data-lane-join="${r}">
              <div
                class="chords-neck"
                style="
                  ${p}
                  background: ${m};
                "
              ></div>

              <div class="chords-box" style="background: ${m}; border-radius: ${u};">
                ${(n?.rows||[]).map(v=>{const y=this.pickedChord?.name===v.name,C=typeof v.tension=="number"?v.tension:h,S=ie(C);return g`
                    <button
                      class="chord-pill-btn"
                      style="
                        background: ${y?"#2E271F":"rgba(251, 246, 236, 0.88)"};
                      "
                      @click=${()=>this.onAudition(v,n)}
                      aria-label="Audition ${v.name}"
                    >
                      <span
                        style="
                          width: 9px;
                          height: 9px;
                          border-radius: ${Math.round(S.radius*.25)}px;
                          background: ${S.color};
                          flex-shrink: 0;
                        "
                      ></span>
                      <span
                        class="chord-pill-name"
                        style="color: ${y?"#FBF6EC":"#2E271F"};"
                      >${v.name}</span>
                      ${v.roman?g`
                        <span
                          class="chord-pill-roman"
                          style="color: ${y?"rgba(251,246,236,0.7)":"var(--cv-label)"};"
                        >${v.roman}</span>
                      `:""}
                      ${v.bandTag?g`
                        <span
                          style="
                            font-size: 8.5px;
                            font-weight: 800;
                            letter-spacing: 0.7px;
                            text-transform: uppercase;
                            color: #2E271F;
                            background: ${v.bandColor||"#F6D98B"};
                            border-radius: 100px;
                            padding: 2px 6px;
                            margin-left: 4px;
                            white-space: nowrap;
                          "
                        >${v.bandTag}</span>
                      `:""}
                    </button>
                  `})}

                <div style="flex: 1; min-width: 0;"></div>

                ${this.pickedChord?g`
                  <button
                    class="keep-swap-btn"
                    @click=${this.onConfirm}
                    aria-label="Keep ${this.pickedChord.name}"
                  >
                    Keep ${this.pickedChord.name}
                  </button>
                `:g`
                  <div style="font-size: 11px; font-weight: 700; color: #FBF6EC; opacity: 0.85; white-space: nowrap;">
                    tap to hear it in the loop
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};Me.styles=ce`
    :host {
      display: contents;
      font-family: var(--cv-font, sans-serif);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .lane-shell {
      position: relative;
      grid-column: 1 / -1;
      min-width: 0;
      display: grid;
      grid-template-rows: 1fr;
      animation: cvfv-laneopen 480ms 60ms cubic-bezier(0.16, 1, 0.3, 1) both;
      margin-top: 6px;
      margin-bottom: 8px;
    }

    .lane-neck {
      position: absolute;
      z-index: 1;
      top: -22px;
      height: 36px;
      border-radius: 0 0 3px 3px;
      transform-origin: top center;
      animation: cvfv-laneneck 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: left 300ms var(--cv-ease, ease), width 300ms var(--cv-ease, ease), background 200ms ease;
    }

    .lane-clip {
      min-height: 0;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .lane-panel {
      border-radius: 14px;
      padding: 15px 16px 16px;
      box-shadow: 0 26px 46px -30px rgba(46, 39, 31, 0.75);
      animation: cvfv-lanepanel 420ms 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: background 250ms var(--cv-ease, ease);
    }

    .lane-header {
      display: flex;
      align-items: center;
      gap: 10px;
      animation: cvfv-trayitem 300ms 220ms var(--cv-ease, ease) both;
    }

    .lane-kicker {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
      min-width: 0;
    }

    .lane-hint {
      font-size: 11px;
      font-weight: 700;
      color: #2E271F;
      opacity: 0.7;
      white-space: nowrap;
    }

    .lane-close-btn {
      border: none;
      font-family: inherit;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.12);
      color: #2E271F;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, transform 120ms ease;
    }
    .lane-close-btn:hover {
      background: rgba(46, 39, 31, 0.2);
    }
    .lane-close-btn:active {
      transform: scale(0.92);
    }

    .feelings-row {
      display: flex;
      gap: 7px;
      margin-top: 11px;
      animation: cvfv-trayitem 340ms 280ms var(--cv-ease, ease) both;
    }

    .feel-tile {
      border: none;
      margin: 0;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      padding: 10px 11px 11px;
      flex: 1 1 0;
      min-width: 0;
      transition: box-shadow 200ms ease, border-radius 200ms ease, background 200ms ease, transform 140ms ease;
    }
    .feel-tile:not([data-sel="1"]):active {
      transform: scale(0.98);
    }

    .feel-tile-name {
      display: block;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }

    .feel-tile-sub {
      display: block;
      font-size: 10.5px;
      font-weight: 700;
      line-height: 1.3;
      opacity: 0.9;
      margin-top: 3px;
    }

    .chords-shell {
      position: relative;
      margin-top: 10px;
      animation: cvfv-trayitem 340ms 350ms var(--cv-ease, ease) both;
    }

    .chords-neck {
      position: absolute;
      z-index: 3;
      top: -11px;
      height: 15px;
      transition: left 300ms var(--cv-ease, ease), right 300ms var(--cv-ease, ease), width 300ms var(--cv-ease, ease), background 200ms ease;
    }

    .chords-box {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      border-radius: 12px;
      padding: 10px 11px;
      transition: background 200ms ease, border-radius 200ms ease;
    }

    .chord-pill-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border-radius: 100px;
      padding: 8px 14px;
      transition: background 200ms ease, box-shadow 200ms ease, transform 120ms ease;
    }
    .chord-pill-btn:hover {
      transform: translateY(-1px);
    }
    .chord-pill-btn:active {
      transform: scale(0.96);
    }

    .chord-pill-name {
      font-size: 13px;
      font-weight: 800;
      white-space: nowrap;
    }

    .chord-pill-roman {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }

    .keep-swap-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
      min-height: 34px;
      background: #FBF6EC;
      color: #2E271F;
      box-shadow: 0 10px 20px -14px rgba(46, 39, 31, 0.6);
      transition: background 180ms ease, transform 120ms ease, box-shadow 180ms ease;
    }
    .keep-swap-btn:hover {
      background: #FFFFFF;
      transform: scale(1.02);
      box-shadow: 0 12px 24px -12px rgba(46, 39, 31, 0.8);
    }
    .keep-swap-btn:active {
      transform: scale(0.97);
    }
  `;Re([x({type:Number})],Me.prototype,"swapIndex",2);Re([x({type:Object})],Me.prototype,"chord",2);Re([x({type:Array})],Me.prototype,"feelings",2);Re([x({type:String})],Me.prototype,"activeFeel",2);Re([x({type:Object})],Me.prototype,"pickedChord",2);Re([x({type:Number})],Me.prototype,"padCols",2);Re([x({type:String})],Me.prototype,"moodColor",2);Re([x({type:Object})],Me.prototype,"band",2);Me=Re([pe("chord-swap-lane")],Me);var Yr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,ve=(t,e,i,o)=>{for(var s=o>1?void 0:o?Wr(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Yr(e,i,s),s};const Kr={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},Xr=["A","S","D","F","Z","X","C","V"];let ae=class extends de{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Emotional",key:"C",scaleType:"MAJOR",bpm:84,chords:[]},this.chordData={chords:{},scales:{}},this.moodColor="#C9A9E0",this.selectedBand=null,this.isPlaying=!1,this.activeIndex=-1,this.showTheory=!1,this.swapIndex=null,this.activeSwapFamily="Darker",this.abPick=null,this.padHeld=null,this.gridFor=null}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>i+s)}handlePadClick(t,e){const i=this.progression?.chords?.[e];if(!i)return;this.padHeld=e,setTimeout(()=>{this.padHeld===e&&(this.padHeld=null),this.requestUpdate()},180);const o=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR",n=i.notes&&i.notes.length>0?i.notes:G(i.name,z(o,s));w.playChordNotes(n,.85,i.voicing||"1st inversion",90),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:i},bubbles:!0,composed:!0}))}openSwap(t){this.swapIndex===t?this.swapIndex=null:(this.swapIndex=t,this.abPick=null),this.requestUpdate()}openDetail(t){const e=this.progression?.chords?.[t];this.dispatchEvent(new CustomEvent("chord-detail-open",{detail:{index:t,chord:e},bubbles:!0,composed:!0}))}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=ho(this.chordData,this.progression),o=fi(this.chordData,this.progression),s=i.map(c=>({name:c.name,sub:c.sub||"",tension:c.tension,rows:c.rows.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))});const n=s.filter(c=>c.name!=="Borrowed").sort((c,d)=>c.tension-d.tension),r=s.filter(c=>c.name==="Borrowed"),a=[...n,...r],l=this.selectedBand?$e(this.selectedBand):null;if(l){const c=mo(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),d=new Map(c.map(p=>[p.chordName,p]));a.forEach(p=>{const u=p.rows.map(h=>{const m=d.get(h.name);return m?{...h,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?m.theory:m.plain}:h});p.rows=u})}return a}handleSwapAudition(t){this.abPick=t.chord;const e=this.progression?.key||"C",i=this.progression?.scaleType||"MAJOR",o=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:G(t.chord.name,z(e,i));w.playChordNotes(o,.8,t.chord.voicing||"1st inversion",92),this.requestUpdate()}confirmSwap(t){const e=this.swapIndex;if(e===null)return;const i=t.detail.chord,o=[...this.progression.chords];o[e]=i,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:o},bubbles:!0,composed:!0})),this.swapIndex=null,this.abPick=null,this.requestUpdate()}updateChordCount(t){const e=this.progression.chords.length,i=Math.max(4,Math.min(8,e+t));i!==e&&this.dispatchEvent(new CustomEvent("set-chord-count",{detail:{count:i},bubbles:!0,composed:!0}))}onReroll(){this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onVibeClick(){this.dispatchEvent(new CustomEvent("open-vibe-picker",{bubbles:!0,composed:!0}))}render(){const t=this.progression.chords||[],e=this.selectedBand?$e(this.selectedBand):null,i=4,o=this.showTheory?ir(this.progression.key||"C",this.progression.scaleType||"MAJOR",this.chordData,this.progression):[];return g`
      <!-- 1. Header Context Row -->
      <div class="tab-header-row">
        <button class="vibe-pill-btn" @click=${this.onVibeClick} aria-label="Select vibe and style">
          <span class="vibe-dot" style="background: ${this.moodColor};"></span>
          <span>${this.progression.mood||"Emotional"} · ${this.progression.genre||"Pop"} · ${this.progression.bpm||84} BPM</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <div class="header-actions">
          <div class="chord-count-stepper">
            <button
              class="stepper-btn"
              @click=${()=>this.updateChordCount(-1)}
              ?disabled=${t.length<=4}
              aria-label="Decrease chord count"
            >−</button>
            <span>${t.length} chords</span>
            <button
              class="stepper-btn"
              @click=${()=>this.updateChordCount(1)}
              ?disabled=${t.length>=8}
              aria-label="Increase chord count"
            >+</button>
          </div>

          <button class="try-another-btn" @click=${this.onReroll} aria-label="Generate new progression">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
            <span>Try another</span>
          </button>
        </div>
      </div>

      <!-- 2. Band DNA Legend Banner -->
      ${e?g`
        <div class="band-legend-banner">
          <div class="band-legend-info">
            <div class="band-swatch" style="background: ${e.color};"></div>
            <div>
              <div class="band-title">${e.name}</div>
              <div class="band-tagline">${e.tagline||e.plain}</div>
            </div>
          </div>
          <button
            class="band-dismiss-btn"
            @click=${()=>this.dispatchEvent(new CustomEvent("clear-band",{bubbles:!0,composed:!0}))}
            aria-label="Dismiss band archetype"
          >×</button>
        </div>
      `:""}

      <!-- 3. Chord Pads Grid -->
      <div class="pad-cells-grid" style="--mood-tint: ${this.moodColor};">
        ${t.map((s,n)=>{const r=ie(s.tension||.1),a=this.activeIndex===n&&this.isPlaying,l=this.padHeld===n,c=this.swapIndex===n,d=e?Fs(s,e.name,this.progression.key||"C",this.progression.scaleType||"MAJOR"):null,p=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/i)+1)*i-1);return g`
            <div
              class="pad-cell ${l?"pad-held":""} ${c?"selected":""} ${a?"pad-lit":""}"
              style="background: ${r.color};"
              role="button"
              tabindex="0"
              @pointerdown=${u=>this.handlePadClick(u,n)}
              aria-label="${s.name} chord"
            >
              <div class="pad-top-row">
                <div class="pad-key-badge">
                  <span>${Xr[n]||""}</span>
                </div>
                ${this.showTheory&&s.roman?g`<span class="pad-roman-badge">${s.roman}</span>`:""}
                
                <div class="pad-actions">
                  <button
                    class="pad-icon-btn"
                    @click=${u=>{u.stopPropagation(),this.openSwap(n)}}
                    aria-label="Swap chord"
                    title="Swap chord"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                  </button>
                  <button
                    class="pad-icon-btn"
                    @click=${u=>{u.stopPropagation(),this.openDetail(n)}}
                    aria-label="View voicing"
                    title="View voicing"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <div class="pad-bottom-info">
                <div class="pad-role-label">${Kr[s.functionLabel]||s.functionLabel}</div>
                <div class="pad-chord-name">${s.name}</div>
                ${this.showTheory&&s.notes&&s.notes.length?g`
                  <div class="pad-notes-theory">${s.notes.join(" · ")}</div>
                `:""}
                ${d?g`
                  <div class="band-move-pill" style="border-left: 3px solid ${e?.color||"#2E271F"};">
                    <span>${d.name}: ${d.chord}</span>
                  </div>
                `:""}
              </div>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex!==null&&n===p?g`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${t[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(t.length,4)}
                .moodColor=${this.moodColor}
                .band=${e?{name:e.name,color:e.color,plain:e.plain}:null}
                @swap-feel-change=${u=>{this.activeSwapFamily=u.detail.feel,this.requestUpdate()}}
                @swap-audition=${u=>this.handleSwapAudition(u.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${()=>{this.swapIndex=null,this.requestUpdate()}}
              ></chord-swap-lane>
            `:""}
          `})}
      </div>

      <!-- 4. Diatonic Scale Strip -->
      ${this.showTheory&&o.length?g`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header">Diatonic scale degrees (${this.progression.key} ${this.progression.scaleType})</div>
          <div class="scale-degrees-row">
            ${o.map(s=>g`
              <div
                class="scale-degree-chip"
                @click=${()=>{const n=this.progression.key||"C",r=this.progression.scaleType||"MAJOR",a=G(s.chordName,z(n,r));w.playChordNotes(a,.8,"1st inversion",88)}}
                title="Degree ${s.roman}: ${s.functionLabel}"
              >
                <span class="degree-roman">${s.roman}</span>
                <span class="degree-name">${s.chordName}</span>
              </div>
            `)}
          </div>
        </div>
      `:""}
    `}};ae.styles=ce`
    :host {
      display: block;
      width: 100%;
      font-family: var(--font-body, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: #2E271F;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* 1. Header Context Row */
    .tab-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .vibe-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 6px 14px 6px 10px;
      font-size: 13px;
      font-weight: 700;
      color: #2E271F;
      cursor: pointer;
      transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }

    .vibe-pill-btn:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.09);
    }

    .vibe-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    /* Chord Count Stepper */
    .chord-count-stepper {
      display: inline-flex;
      align-items: center;
      background: rgba(251, 243, 230, 0.85);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 3px 8px;
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
      gap: 6px;
    }

    .stepper-btn {
      background: transparent;
      border: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      transition: background 150ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* Try Another Button */
    .try-another-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
      cursor: pointer;
      transition: all 180ms ease;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }

    .try-another-btn:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.09);
    }

    /* 2. Band DNA Banner */
    .band-legend-banner {
      background: rgba(251, 243, 230, 0.88);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      backdrop-filter: blur(8px);
    }

    .band-legend-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .band-swatch {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .band-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #2E271F;
    }

    .band-tagline {
      font-size: 11.5px;
      font-weight: 500;
      color: #7A6F62;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .band-dismiss-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      font-weight: 700;
      color: #7A6F62;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 150ms ease;
    }

    .band-dismiss-btn:hover {
      color: #2E271F;
      background: rgba(46, 39, 31, 0.08);
    }

    /* 3. Chord Pads Grid */
    .pad-cells-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 768px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
    }

    /* Chord Pad Card */
    .pad-cell {
      position: relative;
      border-radius: 20px;
      padding: 14px 14px 12px;
      min-height: 142px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms ease, border-radius 160ms ease;
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      overflow: hidden;
    }

    .pad-cell:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px -4px rgba(46, 39, 31, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .pad-cell:active, .pad-cell.pad-held {
      transform: translateY(1px);
      box-shadow: 0 2px 6px -2px rgba(46, 39, 31, 0.2);
    }

    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 3px #2E271F, 0 10px 24px -6px rgba(46, 39, 31, 0.35);
      animation: pulse-lit 1.2s infinite alternate;
    }

    @keyframes pulse-lit {
      from { transform: scale(1); }
      to { transform: scale(1.015); }
    }

    .pad-cell.selected {
      border-radius: 20px 20px 4px 4px;
      box-shadow: inset 0 0 0 2.5px var(--mood-tint, #C9A9E0), 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    /* Top Row in Pad */
    .pad-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .pad-key-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: rgba(46, 39, 31, 0.14);
      box-shadow: 0 1px 0 rgba(46, 39, 31, 0.15);
      flex-shrink: 0;
    }

    .pad-key-badge span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.65);
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      color: #2E271F;
    }

    .pad-roman-badge {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.65);
      letter-spacing: 0.5px;
    }

    .pad-actions {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
    }

    .pad-icon-btn {
      background: rgba(255, 255, 255, 0.5);
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #2E271F;
      transition: all 140ms ease;
    }

    .pad-icon-btn:hover {
      background: #FFFFFF;
      transform: scale(1.08);
    }

    /* Bottom Info in Pad */
    .pad-bottom-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-top: 10px;
    }

    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.65);
    }

    .pad-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.3px;
      line-height: 1.1;
    }

    @media (max-width: 600px) {
      .pad-chord-name {
        font-size: 18px;
      }
    }

    .pad-notes-theory {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.7);
      margin-top: 2px;
    }

    /* Band Move Pill inside Pad */
    .band-move-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.75);
      border-radius: 999px;
      padding: 3px 8px;
      font-size: 9.5px;
      font-weight: 800;
      color: #2E271F;
      margin-top: 6px;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.08);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 4. Diatonic Scale Strip */
    .scale-diatonic-strip {
      background: rgba(251, 243, 230, 0.75);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 18px;
      padding: 12px 16px;
      margin-top: 18px;
      backdrop-filter: blur(6px);
    }

    .scale-strip-header {
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #8A6B3F;
      margin-bottom: 8px;
    }

    .scale-degrees-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .scale-degree-chip {
      background: #FFFFFF;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 10px;
      padding: 6px 10px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 140ms ease;
    }

    .scale-degree-chip:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.1);
    }

    .degree-roman {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 9px;
      font-weight: 700;
      color: #7A6F62;
    }

    .degree-name {
      font-size: 12.5px;
      font-weight: 800;
      color: #2E271F;
    }
  `;ve([x({type:Object})],ae.prototype,"progression",2);ve([x({type:Object})],ae.prototype,"chordData",2);ve([x({type:String})],ae.prototype,"moodColor",2);ve([x({type:String})],ae.prototype,"selectedBand",2);ve([x({type:Boolean})],ae.prototype,"isPlaying",2);ve([x({type:Number})],ae.prototype,"activeIndex",2);ve([x({type:Boolean})],ae.prototype,"showTheory",2);ve([k()],ae.prototype,"swapIndex",2);ve([k()],ae.prototype,"activeSwapFamily",2);ve([k()],ae.prototype,"abPick",2);ve([k()],ae.prototype,"padHeld",2);ve([k()],ae.prototype,"gridFor",2);ae=ve([pe("tab-chords")],ae);var Qr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,ke=(t,e,i,o)=>{for(var s=o>1?void 0:o?Zr(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Qr(e,i,s),s};const ea={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},ta=["C","D","E","F","G","A","B"],ia=[{name:"C#",offsetLeftPct:10.5},{name:"D#",offsetLeftPct:24.8},{name:"F#",offsetLeftPct:53.5},{name:"G#",offsetLeftPct:67.8},{name:"A#",offsetLeftPct:82.1}];let ue=class extends de{constructor(){super(...arguments),this.progression=null,this.melodyTrack=null,this.activeStepIndex=null,this.guideMode="strict-chord",this.contour="Arch",this.density=50,this.octave=4,this.playing=!1,this.isMobile=!1,this.selectedGlobalStep=null,this.bloomOctave=4}willUpdate(t){t.has("progression")&&this.progression&&(!this.melodyTrack||this.melodyTrack.notes.length===0)&&this.generateDefaultMelody()}generateDefaultMelody(){if(!this.progression)return;const t=Ce.generateMelody(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode});this.melodyTrack=t,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0}))}onSetGuideMode(t){if(this.guideMode=t,this.melodyTrack&&this.progression){const e={...this.melodyTrack,guideMode:t};this.melodyTrack=e,this.dispatchEvent(new CustomEvent("guide-mode-change",{detail:{mode:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:e},bubbles:!0,composed:!0}))}}onRerollMelody(){if(!this.progression)return;const t=Ce.generateMelody(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode});this.melodyTrack=t,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:"Generated fresh melody",bubbles:!0,composed:!0}))}onStepClick(t){this.selectedGlobalStep=t;const e=this.getNoteAtStep(t);if(e){const i=e.midi;this.bloomOctave=Math.floor(i/12)-1,ro(e.pitch,.4)}else this.bloomOctave=this.octave}closeBloom(){this.selectedGlobalStep=null}getNoteAtStep(t){if(!this.melodyTrack)return;const e=Math.floor(t/16),i=t%16;return this.melodyTrack.notes.find(o=>o.barIndex===e&&o.stepInBar===i)}onSelectPitch(t){if(this.selectedGlobalStep===null||!this.progression)return;const e=Math.floor(this.selectedGlobalStep/16),i=this.selectedGlobalStep%16,o=this.progression.chords[e]||this.progression.chords[0],s=`${t}${this.bloomOctave}`,n=se(s);if(this.guideMode==="strict-chord"){const d=st(o,this.progression.key,this.progression.scaleType),p=n%12;if(![...d.chordTonePcs,...d.tensionPcs].includes(p)){this.dispatchEvent(new CustomEvent("toast",{detail:"Strict mode: pick a chord tone",bubbles:!0,composed:!0}));return}}const r=mt(n,o,this.progression.key,this.progression.scaleType);ro(s,.4);const a=(this.melodyTrack?.notes||[]).filter(d=>!(d.barIndex===e&&d.stepInBar===i)),l={id:`m-note-${e}-${i}-${Date.now()}`,barIndex:e,stepInBar:i,beatOffset:e*4+i/4,durationBeats:1,pitch:s,midi:n,velocity:100,chordToneRole:r.role,isClash:r.isClash},c={...this.melodyTrack,notes:[...a,l].sort((d,p)=>d.beatOffset-p.beatOffset)};this.melodyTrack=c,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:c},bubbles:!0,composed:!0}))}onClearCurrentNote(){if(this.selectedGlobalStep===null||!this.melodyTrack)return;const t=Math.floor(this.selectedGlobalStep/16),e=this.selectedGlobalStep%16,i=this.melodyTrack.notes.filter(s=>!(s.barIndex===t&&s.stepInBar===e)),o={...this.melodyTrack,notes:i};this.melodyTrack=o,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:o},bubbles:!0,composed:!0})),this.closeBloom()}onChangeNoteDuration(t){const e=this.selectedGlobalStep!==null?this.getNoteAtStep(this.selectedGlobalStep):null;if(!e||!this.melodyTrack)return;const i=Math.max(.25,Math.min(4,e.durationBeats+t*.25)),o=this.melodyTrack.notes.map(n=>n.id===e.id?{...n,durationBeats:i}:n),s={...this.melodyTrack,notes:o};this.melodyTrack=s,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:s},bubbles:!0,composed:!0}))}onPrevStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep-1+64)%64)}onNextStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep+1)%64)}render(){const t=this.progression?.chords||[],e=At(this.progression?.mood||"Warm"),i=this.melodyTrack?.notes.length||0;return g`
      <div class="melody-container" style="--mood-color: ${e};">
        <!-- Panel Header -->
        <div class="panel-header-row">
          <div class="header-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${i} notes</span>
          </div>

          <div class="quick-actions-bar">
            <button class="quick-chip" @click=${this.onRerollMelody} aria-label="Reroll melody">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              Reroll
            </button>

            <!-- Tier-2 Segmented Control: Strict / Guide / Free -->
            <div class="segmented-control" role="radiogroup" aria-label="Melody guide mode">
              <button
                class="segment-btn ${this.guideMode==="strict-chord"?"active":""}"
                @click=${()=>this.onSetGuideMode("strict-chord")}
                role="radio"
                aria-checked="${this.guideMode==="strict-chord"}"
              >
                Strict
              </button>
              <button
                class="segment-btn ${this.guideMode==="scale-key"?"active":""}"
                @click=${()=>this.onSetGuideMode("scale-key")}
                role="radio"
                aria-checked="${this.guideMode==="scale-key"}"
              >
                Guide
              </button>
              <button
                class="segment-btn ${this.guideMode==="free"?"active":""}"
                @click=${()=>this.onSetGuideMode("free")}
                role="radio"
                aria-checked="${this.guideMode==="free"}"
              >
                Free
              </button>
            </div>
          </div>
        </div>

        <!-- 4-Bar Melody Grid Sequencer -->
        <div class="bars-grid">
          ${t.map((o,s)=>{const n=this.playing&&this.activeStepIndex!==null&&Math.floor(this.activeStepIndex/16)===s;return g`
              <div class="bar-column ${n?"playing-bar":""}">
                <div class="bar-header">
                  <span class="bar-role">${ea[o.functionLabel]||o.functionLabel}</span>
                  <div class="bar-chord-info">
                    <span class="bar-chord-name">${o.name}</span>
                    <span class="bar-chord-roman">${o.roman||""}</span>
                  </div>
                </div>

                <div class="steps-16-grid">
                  ${Array.from({length:16},(r,a)=>{const l=s*16+a,c=this.getNoteAtStep(l),d=this.playing&&this.activeStepIndex===l;let p="root";return c?.chordToneRole==="3rd"?p="third":c?.chordToneRole==="5th"?p="fifth":c?.chordToneRole==="7th"?p="seventh":c?.chordToneRole==="tension"&&(p="tension"),c?.isClash&&(p="clash"),g`
                      <div
                        class="step-cell ${c?"has-note":""} ${d?"active-step":""}"
                        @click=${()=>this.onStepClick(l)}
                        aria-label="Bar ${s+1}, Step ${a+1}: ${c?c.pitch:"empty"}"
                      >
                        <span class="step-number">${String(a+1).padStart(2,"0")}</span>
                        ${c?g`
                          <span class="note-badge">${c.pitch}</span>
                          <span class="role-dot ${p}"></span>
                          ${c.durationBeats>.5?g`<span class="tie-bar"></span>`:""}
                        `:""}
                      </div>
                    `})}
                </div>
              </div>
            `})}
        </div>

        <!-- Note Blooming Micro-Keyboard Popover -->
        ${this.selectedGlobalStep!==null?this.renderBloomPopover(e):""}
      </div>
    `}renderBloomPopover(t){if(this.selectedGlobalStep===null||!this.progression)return"";const e=Math.floor(this.selectedGlobalStep/16),i=this.selectedGlobalStep%16,o=this.progression.chords[e]||this.progression.chords[0],s=this.getNoteAtStep(this.selectedGlobalStep),n=st(o,this.progression.key,this.progression.scaleType);return g`
      <div class="bloom-overlay" @click=${this.closeBloom}>
        <div class="bloom-popover" @click=${r=>r.stopPropagation()}>
          <!-- Header -->
          <div class="bloom-header">
            <button class="bloom-nav-btn" @click=${this.onPrevStep}>‹ Prev</button>
            <div class="bloom-center-info">
              <span class="bloom-pitch-title">${s?s.pitch:"Select pitch"}</span>
              <span class="bloom-role-label">${s?s.chordToneRole:`Bar ${e+1} · Step ${i+1}`}</span>
            </div>
            ${s?g`
              <button class="bloom-clear-btn" @click=${this.onClearCurrentNote}>Clear</button>
            `:""}
            <button class="bloom-nav-btn" @click=${this.onNextStep}>Next ›</button>
          </div>

          <!-- Micro Keyboard -->
          <div class="micro-keyboard-wrapper">
            <!-- White Keys -->
            <div class="white-keys-row">
              ${ta.map(r=>{const l=se(`${r}${this.bloomOctave}`)%12,c=n.chordTonePcs.includes(l),d=s&&s.pitch===`${r}${this.bloomOctave}`,p=this.guideMode==="strict-chord"&&!c&&!n.tensionPcs.includes(l);return g`
                  <div
                    class="white-key ${d?"active":""} ${p?"disabled":""}"
                    @click=${()=>this.onSelectPitch(r)}
                  >
                    ${c?g`<span class="key-dot"></span>`:""}
                    <span class="key-text">${r}</span>
                  </div>
                `})}
            </div>

            <!-- Black Keys -->
            ${ia.map(r=>{const l=se(`${r.name}${this.bloomOctave}`)%12,c=n.chordTonePcs.includes(l),d=s&&s.pitch===`${r.name}${this.bloomOctave}`,p=this.guideMode==="strict-chord"&&!c&&!n.tensionPcs.includes(l);return g`
                <div
                  class="black-key ${d?"active":""} ${p?"disabled":""}"
                  style="left: ${r.offsetLeftPct}%;"
                  @click=${()=>this.onSelectPitch(r.name)}
                >
                  ${c?g`<span class="key-dot" style="margin-bottom: 2px;"></span>`:""}
                </div>
              `})}
          </div>

          <!-- Note Duration Stepper -->
          ${s?g`
            <div class="duration-control">
              <span style="font-size: 11px; font-weight: 700; color: var(--cv-ink-muted);">Duration: ${s.durationBeats} beats</span>
              <div class="duration-stepper">
                <button class="step-btn" @click=${()=>this.onChangeNoteDuration(-1)}>−</button>
                <button class="step-btn" @click=${()=>this.onChangeNoteDuration(1)}>+</button>
              </div>
            </div>
          `:""}
        </div>
      </div>
    `}};ue.styles=ce`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    .melody-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }

    /* Panel Header Row */
    .panel-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .small-caps-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .note-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }

    /* Tier-2 Segmented Control */
    .segmented-control {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }

    .segment-btn {
      min-height: 28px;
      padding: 0 12px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: var(--cv-ink-muted, #5B5145);
      transition: background 150ms ease, color 150ms ease, box-shadow 150ms ease;
    }

    .segment-btn:hover {
      color: var(--cv-ink, #2E271F);
    }

    .segment-btn.active {
      background: #FBF3E6;
      color: #2E271F;
      font-weight: 800;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
    }

    /* Quick Action Controls */
    .quick-actions-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .quick-chip {
      background: rgba(251, 243, 230, 0.72);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 100px;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 150ms ease, transform 120ms ease;
    }

    .quick-chip:hover {
      background: #FBF3E6;
    }

    .quick-chip:active {
      transform: scale(0.96);
    }

    /* 4-Bar Melody Grid Sequencer */
    .bars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 900px) {
      .bars-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 520px) {
      .bars-grid {
        grid-template-columns: 1fr;
      }
    }

    .bar-column {
      background: rgba(251, 243, 230, 0.72);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 20px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-sizing: border-box;
      position: relative;
    }

    .bar-column.playing-bar {
      box-shadow: inset 0 0 0 2px var(--mood-color, #F2735F);
    }

    /* Bar Header */
    .bar-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.06);
    }

    .bar-role {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .bar-chord-info {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .bar-chord-name {
      font-size: 16px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
    }

    .bar-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
    }

    /* 16-Step Grid Inside Each Bar */
    .steps-16-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 6px;
      width: 100%;
      aspect-ratio: 1;
    }

    .step-cell {
      position: relative;
      background: rgba(46, 39, 31, 0.03);
      border: 1px solid rgba(46, 39, 31, 0.06);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      transition: background 120ms ease, transform 100ms ease, border-color 120ms ease;
    }

    .step-cell:hover {
      background: rgba(46, 39, 31, 0.07);
    }

    .step-cell:active {
      transform: scale(0.94);
    }

    .step-cell.active-step {
      box-shadow: 0 0 0 2px var(--mood-color, #F2735F);
    }

    .step-cell.has-note {
      background: #FBF3E6;
      border-color: rgba(46, 39, 31, 0.15);
      box-shadow: 0 2px 5px rgba(46, 39, 31, 0.08);
    }

    .step-number {
      position: absolute;
      top: 3px;
      left: 4px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 8px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.35);
    }

    .note-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 800;
      color: #2E271F;
      line-height: 1;
    }

    .role-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-top: 3px;
    }

    .role-dot.root { background: #F2735F; }
    .role-dot.third { background: #9CC0EC; }
    .role-dot.fifth { background: #F6C85F; }
    .role-dot.seventh { background: #C38D9E; }
    .role-dot.tension { background: #41B3A3; }
    .role-dot.clash { background: #E74C3C; }

    /* Tie duration line */
    .tie-bar {
      position: absolute;
      bottom: 2px;
      left: 4px;
      right: 4px;
      height: 2.5px;
      border-radius: 2px;
      background: var(--mood-color, #F2735F);
      opacity: 0.75;
    }

    /* Note Bloom Popover */
    .bloom-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background: rgba(46, 39, 31, 0.2);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bloom-fade-in 140ms ease-out;
    }

    @keyframes bloom-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bloom-popover {
      width: 320px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 22px;
      padding: 16px;
      box-shadow: 0 20px 48px -12px rgba(46, 39, 31, 0.35);
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-sizing: border-box;
      animation: bloom-scale-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bloom-scale-in {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .bloom-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .bloom-nav-btn {
      background: transparent;
      border: none;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .bloom-nav-btn:hover {
      background: rgba(46, 39, 31, 0.08);
      color: #2E271F;
    }

    .bloom-center-info {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .bloom-pitch-title {
      font-size: 18px;
      font-weight: 800;
      color: #2E271F;
    }

    .bloom-role-label {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
    }

    .bloom-clear-btn {
      background: transparent;
      border: none;
      font-size: 11px;
      font-weight: 700;
      color: #E74C3C;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 6px;
    }

    .bloom-clear-btn:hover {
      background: rgba(231, 76, 60, 0.1);
    }

    /* Micro Keyboard */
    .micro-keyboard-wrapper {
      position: relative;
      width: 100%;
      height: 90px;
      border-radius: 8px;
      overflow: hidden;
      user-select: none;
    }

    .white-keys-row {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .white-key {
      flex: 1;
      height: 100%;
      background: #FFFFFF;
      border-right: 1px solid rgba(46, 39, 31, 0.15);
      border-radius: 0 0 6px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 6px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      transition: background 100ms ease;
    }

    .white-key:last-child {
      border-right: none;
    }

    .white-key:hover {
      background: #F4EBE0;
    }

    .white-key.active {
      background: var(--mood-color, #F2735F);
      color: #FFFFFF;
    }

    .white-key.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .black-key {
      position: absolute;
      top: 0;
      width: 12%;
      height: 58%;
      background: #2E271F;
      border-radius: 0 0 4px 4px;
      z-index: 10;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 4px;
      box-sizing: border-box;
      cursor: pointer;
      transition: background 100ms ease;
    }

    .black-key:hover {
      background: #4A3F33;
    }

    .black-key.active {
      background: var(--mood-color, #F2735F);
    }

    .black-key.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .key-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--mood-color, #F2735F);
      margin-bottom: 4px;
    }

    .white-key.active .key-dot {
      background: #FFFFFF;
    }

    .key-text {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
    }

    /* Duration Stepper */
    .duration-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 6px;
      background: rgba(46, 39, 31, 0.04);
      border-radius: 12px;
    }

    .duration-stepper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .step-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: none;
      background: rgba(46, 39, 31, 0.08);
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2E271F;
    }

    .step-btn:hover {
      background: rgba(46, 39, 31, 0.15);
    }
  `;ke([x({type:Object})],ue.prototype,"progression",2);ke([x({type:Object})],ue.prototype,"melodyTrack",2);ke([x({type:Number})],ue.prototype,"activeStepIndex",2);ke([x({type:String})],ue.prototype,"guideMode",2);ke([x({type:String})],ue.prototype,"contour",2);ke([x({type:Number})],ue.prototype,"density",2);ke([x({type:Number})],ue.prototype,"octave",2);ke([x({type:Boolean})],ue.prototype,"playing",2);ke([x({type:Boolean})],ue.prototype,"isMobile",2);ke([k()],ue.prototype,"selectedGlobalStep",2);ke([k()],ue.prototype,"bloomOctave",2);ue=ke([pe("tab-melody")],ue);var oa=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,Ae=(t,e,i,o)=>{for(var s=o>1?void 0:o?sa(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&oa(e,i,s),s};const Xt=["A","B","C","D","E","F","G","H"],Qt=["#9CC0EC","#C9A9E0","#F2A79B","#F6D98B","#B8CC9E","#D9A9C9","#A0D4D9","#E6B89C"];let be=class extends de{constructor(){super(...arguments),this.sections=[],this.timeline=[],this.activeSectionIdx=0,this.activeTimelineIdx=0,this.currentStep=0,this.playing=!1,this.mood="Dreamy",this.bpm=120,this.draggingIdx=null,this.dragOverIdx=null}getEffectiveTimeline(){return this.timeline&&this.timeline.length>0?this.timeline:this.sections&&this.sections.length>0?J.createDefaultTimeline(this.sections):[]}getTotalBars(){const t=this.getEffectiveTimeline();let e=0;for(const i of t){const s=this.sections[i.sectionIndex]?.progression?.chords?.length||4;e+=s*Math.max(1,i.repeats)}return e}getEstimatedDuration(){const e=this.getTotalBars()*4,i=Math.round(e/(this.bpm||120)*60),o=Math.floor(i/60),s=i%60;return`${o>0?`${o}m `:""}${s}s`}onSelectSectionCard(t){this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("select-section",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onEditChords(t,e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("edit-chords",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onEditMelody(t,e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("edit-melody",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onAddToSong(t,e){e.stopPropagation();const i=this.getEffectiveTimeline(),o=J.addTimelineItem(i,t);this.timeline=o,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:o},bubbles:!0,composed:!0}))}onUpdateRepeat(t,e,i){i.stopPropagation();const o=this.getEffectiveTimeline(),s=J.updateTimelineRepeat(o,t,e);this.timeline=s,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:s},bubbles:!0,composed:!0}))}onMoveTimelineItem(t,e,i){i.stopPropagation();const o=this.getEffectiveTimeline(),s=t+e;if(s<0||s>=o.length)return;const n=J.reorderTimeline(o,t,s);this.timeline=n,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:n},bubbles:!0,composed:!0}))}onRemoveTimelineItem(t,e){e.stopPropagation();const i=this.getEffectiveTimeline(),o=J.removeTimelineItem(i,t);this.timeline=o,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:o},bubbles:!0,composed:!0}))}onNewSectionFromLoop(){this.dispatchEvent(new CustomEvent("new-section-from-loop",{bubbles:!0,composed:!0}))}onTogglePlaySong(){this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}onDragStart(t,e){this.draggingIdx=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t)))}onDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this.dragOverIdx=t}onDragEnd(){this.draggingIdx=null,this.dragOverIdx=null}onDrop(t,e){if(e.preventDefault(),this.draggingIdx!==null&&this.draggingIdx!==t){const i=this.getEffectiveTimeline(),o=J.reorderTimeline(i,this.draggingIdx,t);this.timeline=o,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:o},bubbles:!0,composed:!0}))}this.draggingIdx=null,this.dragOverIdx=null}render(){const t=this.getEffectiveTimeline(),e=this.getTotalBars(),i=this.getEstimatedDuration();return g`
      <div class="song-panel">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="header-left">
            <span class="header-label">SONG</span>
            <span class="header-count">${t.length} parts · ${e} bars</span>
          </div>

          <div class="header-right">
            <button
              class="play-song-btn ${this.playing?"playing":""}"
              @click=${this.onTogglePlaySong}
              aria-label="Toggle song playback"
            >
              ${this.playing?g`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Stop song`:g`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play song · ${t.length} parts`}
            </button>
          </div>
        </div>

        <!-- 2-Column Responsive Layout -->
        <div class="song-columns">
          <!-- Left Column: Sections Library -->
          <div class="sections-library">
            <div class="col-header">
              <span class="col-title">SECTIONS</span>
              <span class="col-sub">Edit once, used everywhere</span>
            </div>

            <div class="sections-list">
              ${this.sections.map((o,s)=>{const n=Xt[s%Xt.length],r=Qt[s%Qt.length],a=o.progression?.chords||[],l=this.activeSectionIdx===s;return g`
                  <div
                    class="section-card ${l?"active":""}"
                    @click=${()=>this.onSelectSectionCard(s)}
                    role="button"
                    tabindex="0"
                  >
                    <div class="section-card-top">
                      <span class="section-badge" style="background: ${r};">
                        ${n}
                      </span>
                      <span class="section-name">${o.name}</span>
                      <span class="section-bars">${a.length} bars</span>
                    </div>

                    ${o.desc?g`<p class="section-desc">${o.desc}</p>`:Te}

                    <!-- Chord Chips Row -->
                    <div class="chord-chips-row">
                      ${a.map(c=>{const d=ie(c.tension??.2);return g`
                          <span
                            class="chord-chip"
                            style="background: color-mix(in srgb, ${d} 30%, #FBF3E6);"
                          >
                            <span>${c.name}</span>
                            ${c.roman?g`<span class="chord-chip-rn">${c.roman}</span>`:Te}
                          </span>
                        `})}
                    </div>

                    <!-- Section Actions -->
                    <div class="section-actions">
                      <button
                        class="action-btn primary"
                        @click=${c=>this.onAddToSong(s,c)}
                        title="Append instance to Song timeline"
                      >
                        + Add to song
                      </button>
                      <button
                        class="action-btn"
                        @click=${c=>this.onEditChords(s,c)}
                        title="Edit chords in Chords tab"
                      >
                        Edit chords
                      </button>
                      <button
                        class="action-btn"
                        @click=${c=>this.onEditMelody(s,c)}
                        title="Edit melody in Melody tab"
                      >
                        Edit melody
                      </button>
                    </div>
                  </div>
                `})}

              <button
                class="new-section-btn"
                @click=${this.onNewSectionFromLoop}
                title="Branch current progression into a new section"
              >
                + New section from loop
              </button>
            </div>
          </div>

          <!-- Right Column: Song Order Timeline -->
          <div class="timeline-container">
            <div class="col-header">
              <span class="col-title">SONG ORDER</span>
              <span class="col-sub">Drag to arrange, set repeats</span>
            </div>

            <div class="timeline-list">
              ${t.length===0?g`<div class="timeline-empty">No sections in timeline. Add one from the library!</div>`:t.map((o,s)=>{const n=this.sections[o.sectionIndex];if(!n)return Te;const r=Xt[o.sectionIndex%Xt.length],a=Qt[o.sectionIndex%Qt.length],l=(n.progression?.chords||[]).map(u=>u.name).join(" – "),c=this.playing&&this.activeTimelineIdx===s,d=this.draggingIdx===s,p=this.dragOverIdx===s;return g`
                      <div
                        class="timeline-card ${c?"active-playing":""} ${d?"dragging":""} ${p?"drag-over":""}"
                        draggable="true"
                        @dragstart=${u=>this.onDragStart(s,u)}
                        @dragover=${u=>this.onDragOver(s,u)}
                        @dragend=${this.onDragEnd}
                        @drop=${u=>this.onDrop(s,u)}
                      >
                        <div class="drag-handle" title="Drag to reorder">
                          ⋮⋮ <span class="step-idx">${s+1}</span>
                        </div>

                        <span class="section-badge" style="background: ${a};">
                          ${r}
                        </span>

                        <div class="timeline-card-info">
                          <div class="timeline-card-title-row">
                            <span class="timeline-card-name">${n.name}</span>
                          </div>
                          <div class="timeline-chords-summary">${l}</div>
                        </div>

                        <!-- Repeat Counter Stepper -->
                        <div class="repeat-stepper" title="Repeat count">
                          <button
                            class="stepper-btn"
                            @click=${u=>this.onUpdateRepeat(s,-1,u)}
                            ?disabled=${o.repeats<=1}
                            aria-label="Decrease repeat"
                          >
                            −
                          </button>
                          <span class="repeat-label">×${o.repeats}</span>
                          <button
                            class="stepper-btn"
                            @click=${u=>this.onUpdateRepeat(s,1,u)}
                            ?disabled=${o.repeats>=8}
                            aria-label="Increase repeat"
                          >
                            +
                          </button>
                        </div>

                        <!-- Move Up / Down Buttons -->
                        <div class="timeline-actions">
                          <button
                            class="icon-action-btn"
                            @click=${u=>this.onMoveTimelineItem(s,-1,u)}
                            ?disabled=${s===0}
                            title="Move section up"
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                          <button
                            class="icon-action-btn"
                            @click=${u=>this.onMoveTimelineItem(s,1,u)}
                            ?disabled=${s===t.length-1}
                            title="Move section down"
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                          <button
                            class="icon-action-btn delete-item-btn"
                            @click=${u=>this.onRemoveTimelineItem(s,u)}
                            ?disabled=${t.length<=1}
                            title="Remove section instance"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </div>

                        <!-- Active playback progress bar -->
                        <div class="playback-bar"></div>
                      </div>
                    `})}
            </div>

            <!-- Timeline Footer Summary -->
            <div class="timeline-footer">
              <span class="timeline-summary">
                Total: ${e} bars · ~${i} at ${this.bpm} BPM
              </span>
            </div>
          </div>
        </div>
      </div>
    `}};be.styles=ce`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .song-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 520px;
    }

    @media (max-width: 640px) {
      .song-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    /* Panel Header */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .header-count {
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.06);
      padding: 2px 10px;
      border-radius: 100px;
      font-family: 'Space Mono', monospace;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .play-song-btn {
      min-height: 34px;
      padding: 0 16px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      background: #c9a9e0;
      color: #2e271f;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.1);
      transition: transform 0.15s ease, background 0.15s ease;
    }

    .play-song-btn:hover {
      background: #bfa1d9;
      transform: translateY(-1px);
    }

    .play-song-btn.playing {
      background: #2e271f;
      color: #fbf3e6;
    }

    /* 2-Column Responsive Layout */
    .song-columns {
      display: grid;
      grid-template-columns: minmax(320px, 390px) 1fr;
      gap: 20px;
      align-items: start;
    }

    @media (max-width: 860px) {
      .song-columns {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    /* Column Headers */
    .col-header {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 10px;
    }

    .col-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .col-sub {
      font-size: 12px;
      font-weight: 600;
      color: #6b5f50;
    }

    /* Left Column: Sections Library */
    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-card {
      border-radius: 18px;
      padding: 14px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(46, 39, 31, 0.04);
      transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .section-card:hover {
      border-color: rgba(46, 39, 31, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(46, 39, 31, 0.07);
    }

    .section-card.active {
      border-color: #2e271f;
      box-shadow: 0 0 0 2px #2e271f, 0 4px 16px rgba(46, 39, 31, 0.08);
    }

    .section-card-top {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-badge {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #2e271f;
      flex-shrink: 0;
    }

    .section-name {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
    }

    .section-bars {
      font-family: 'Space Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.06);
      padding: 2px 7px;
      border-radius: 6px;
      margin-left: auto;
    }

    .section-desc {
      font-size: 12px;
      line-height: 1.4;
      color: #6b5f50;
      margin: 0;
    }

    /* Mini Chord Chips */
    .chord-chips-row {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px 0;
    }

    .chord-chip {
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
      border: 1px solid rgba(46, 39, 31, 0.08);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .chord-chip-rn {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      color: #6b5f50;
    }

    /* Section Actions */
    .section-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(46, 39, 31, 0.06);
    }

    .action-btn {
      min-height: 28px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.12);
      background: #fbf3e6;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }

    .action-btn:hover {
      background: #f1e4cc;
      border-color: rgba(46, 39, 31, 0.25);
    }

    .action-btn.primary {
      background: #2e271f;
      color: #fbf3e6;
      border-color: #2e271f;
    }

    .action-btn.primary:hover {
      background: #4a3f33;
    }

    .new-section-btn {
      width: 100%;
      min-height: 44px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      background: rgba(251, 243, 230, 0.6);
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      color: #2e271f;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.15s ease, border-color 0.15s ease;
    }

    .new-section-btn:hover {
      background: #fbf3e6;
      border-color: #2e271f;
    }

    /* Right Column: Song Order Timeline */
    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 200px;
    }

    .timeline-card {
      position: relative;
      border-radius: 16px;
      padding: 12px 14px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 4px rgba(46, 39, 31, 0.03);
      transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
      overflow: hidden;
    }

    .timeline-card:hover {
      border-color: rgba(46, 39, 31, 0.22);
    }

    .timeline-card.active-playing {
      border-color: #9b7ca8;
      box-shadow: 0 0 0 2px #9b7ca8, 0 4px 14px rgba(155, 124, 168, 0.2);
    }

    .timeline-card.dragging {
      opacity: 0.4;
      border: 1.5px dashed #2e271f;
    }

    .timeline-card.drag-over {
      border-top: 3px solid #2e271f;
    }

    /* Full-width playback highlight bar */
    .playback-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: #9b7ca8;
      width: 0%;
      transition: width 0.1s linear;
      border-radius: 0 2px 2px 0;
    }

    .timeline-card.active-playing .playback-bar {
      width: 100%;
    }

    .drag-handle {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #6b5f50;
      cursor: grab;
      font-size: 13px;
      user-select: none;
    }

    .step-idx {
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #8a6b3f;
      min-width: 18px;
    }

    .timeline-card-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .timeline-card-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .timeline-card-name {
      font-size: 14.5px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timeline-chords-summary {
      font-size: 11.5px;
      font-weight: 600;
      color: #6b5f50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Repeat Counter Stepper */
    .repeat-stepper {
      display: flex;
      align-items: center;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 2px;
      flex-shrink: 0;
    }

    .stepper-btn {
      width: 26px;
      height: 26px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #2e271f;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: #fbf3e6;
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .repeat-label {
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
      min-width: 24px;
      text-align: center;
    }

    /* Move / Remove actions */
    .timeline-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .icon-action-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
      color: #2e271f;
    }

    .icon-action-btn:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }

    .delete-item-btn {
      font-size: 16px;
      font-weight: 700;
      color: #f2735f;
    }

    .delete-item-btn:hover:not(:disabled) {
      background: rgba(242, 115, 95, 0.12);
      color: #e85f49;
    }

    /* Empty state */
    .timeline-empty {
      padding: 32px 16px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.2);
      text-align: center;
      color: #6b5f50;
      font-size: 13px;
      font-weight: 600;
    }

    /* Timeline Footer */
    .timeline-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.5);
      border: 1px solid rgba(46, 39, 31, 0.06);
    }

    .timeline-summary {
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #6b5f50;
    }
  `;Ae([x({type:Array})],be.prototype,"sections",2);Ae([x({type:Array})],be.prototype,"timeline",2);Ae([x({type:Number})],be.prototype,"activeSectionIdx",2);Ae([x({type:Number})],be.prototype,"activeTimelineIdx",2);Ae([x({type:Number})],be.prototype,"currentStep",2);Ae([x({type:Boolean})],be.prototype,"playing",2);Ae([x({type:String})],be.prototype,"mood",2);Ae([x({type:Number})],be.prototype,"bpm",2);Ae([k()],be.prototype,"draggingIdx",2);Ae([k()],be.prototype,"dragOverIdx",2);be=Ae([pe("tab-song")],be);var na=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,je=(t,e,i,o)=>{for(var s=o>1?void 0:o?ra(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&na(e,i,s),s};const Uo=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],_o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Zt={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ei={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},go={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Mt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function aa(t){const e=t===""?"maj":t;if(Mt[5][e]||Mt[6][e])return e;const i=go[e];return i&&(Mt[5][i]||Mt[6][i])?i:"maj"}function la(t){const e=aa(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Mt[o][e];if(!n)return;const r=((t.rootPc-s)%12+12)%12;i.push({rootFret:r,frets:n.map(a=>a===null?null:a+r)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function ca(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),o=r=>{const a=new Set(r);let l=null;const c=[],d=p=>{if(p===4){const u=c.map((b,v)=>(e[v]+b)%12);for(const b of a)if(u.indexOf(b)<0)return;for(const b of u)if(!a.has(b))return;const h=c.filter(b=>b>0),m=h.length?Math.max(...h)-Math.min(...h):0;if(m>3)return;const f=m*12+c.reduce((b,v)=>b+v,0);(!l||f<l.score)&&(l={frets:c.slice(),score:f});return}for(let u=0;u<=5;u++)c.push(u),d(p+1),c.pop()};return d(0),l},s=o(i);if(s)return s.frets;const n=o(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return n?n.frets:null}let Ne=class extends de{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Dreamy",key:"C",scaleType:"MAJOR",bpm:120,chords:[]},this.order=[],this.activeIndex=0,this.playing=!1,this.showTheory=!0,this.playInstrument="Piano",this.showDegrees=!1,this.mood="Dreamy"}setInstrument(t){this.playInstrument=t,this.dispatchEvent(new CustomEvent("change-instrument",{detail:{instrument:t},bubbles:!0,composed:!0}))}toggleDegrees(){this.showDegrees=!this.showDegrees}onCardClick(t,e){try{w.playChordAtIndex(e)}catch{}this.dispatchEvent(new CustomEvent("play-chord",{detail:{chord:t,index:e},bubbles:!0,composed:!0}))}renderPianoCard(t,e,i){const o=ne(t.name),s=_o[o.root]??0,n=ei[o.quality]||ei[go[o.quality]||"maj"]||[0,4,7],r=20,a=84,l=50,c=[0,2,4,5,7,9,11],d=[],p=[],u=[];for(let f=0;f<2;f++)c.forEach((b,v)=>{d.push({x:(f*7+v)*r,w:r-1.5,h:a})});for(let f=0;f<2;f++)[0,1,3,4,5].forEach(b=>{const v=f*7+b;p.push({x:v*r+r*.64,w:r*.58,h:l})});n.forEach(f=>{const b=s+f,v=Math.floor(b/12),y=b%12,C=c.indexOf(y),S=f===0,I=C<0,A=S?"#F2735F":I?"#FBF3E6":"#2E271F",F=S?"#FBF3E6":I?"#2E271F":"#FBF3E6",$=this.showDegrees?Zt[f%12]:"";if(C>=0){const N=v*7+C;u.push({cx:N*r+(r-1.5)/2,cy:a-18,r:8.5,fill:A,isRoot:S,label:$,lc:F})}else{const D=(v*7+c.indexOf(y-1))*r+r*.64,U=r*.58;u.push({cx:D+U/2,cy:l-14,r:7,fill:A,isRoot:S,label:$,lc:F})}});const h=14*r,m=n.map(f=>{const b=Uo[(s+f)%12];return this.showDegrees?`${b} (${Zt[f%12]})`:b}).join(" · ");return g`
      <div
        class="play-card ${i?"active-chord":""}"
        @click=${()=>this.onCardClick(t,e)}
        role="button"
        tabindex="0"
        aria-label="Piano chord ${t.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${t.name}</span>
            ${this.showTheory&&t.roman?g`<span class="chord-rn">${t.roman}</span>`:Te}
          </div>
        </div>

        <div class="svg-wrap">
          <svg width="${h}" height="${a}" viewBox="0 0 ${h} ${a}">
            ${d.map(f=>Y`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
            `)}
            ${p.map(f=>Y`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="2" fill="#3A3128"></rect>
            `)}
            ${u.map(f=>Y`
              <g>
                <circle cx="${f.cx}" cy="${f.cy}" r="${f.r}" fill="${f.fill}" stroke="${f.isRoot?"#2E271F":"none"}" stroke-width="${f.isRoot?1.5:0}"></circle>
                ${f.label?Y`
                  <text x="${f.cx}" y="${f.cy}" dy="3.2" font-size="8.5" font-weight="800" text-anchor="middle" fill="${f.lc}" font-family="'Plus Jakarta Sans',sans-serif">${f.label}</text>
                `:Te}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${m}</div>
      </div>
    `}renderFretCard(t,e,i,o){const s=ne(t.name),n=_o[s.root]??0,r=ei[s.quality]||ei[go[s.quality]||"maj"]||[0,4,7],a=[4,9,2,7,11,4],l=[7,0,4,9],c=i==="Ukulele",d=c?l:a,p=c?ca({root:s.root,rootPc:n,q:s.quality,intervals:r})||[null,null,null,null]:la({root:s.root,rootPc:n,q:s.quality})||[null,null,null,null,null,null],u=18,h=24,m=4,f=16,b=d.length,v=p.filter(E=>E!==null&&E>0),y=v.length&&Math.max(...v)>4?Math.min(...v)-1:0,C=[],S=[],I=[],A=[],F=[];for(let E=0;E<b;E++)C.push({x:E*u});for(let E=0;E<=m;E++)S.push({y:f+E*h,sw:E===0&&y===0?3:1.2});p.forEach((E,H)=>{const Q=H*u;if(E===null){F.push({x:Q});return}if(E===0){A.push({x:Q});return}const oe=((d[H]+E-n)%12+12)%12;I.push({cx:Q,cy:f+(E-y-.5)*h,fill:oe===0?"#F2735F":"#2E271F",label:this.showDegrees?Zt[((d[H]+E-n)%12+12)%12]:""})});const $=(b-1)*u,N=(b-1)*u+26,D=f+m*h+12,U=y>0?`${y+1}fr`:"",_=y>0,O=r.map(E=>{const H=Uo[(n+E)%12];return this.showDegrees?`${H} (${Zt[E%12]})`:H}).join(" · ");return g`
      <div
        class="play-card ${o?"active-chord":""}"
        @click=${()=>this.onCardClick(t,e)}
        role="button"
        tabindex="0"
        aria-label="${i} chord ${t.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${t.name}</span>
            ${this.showTheory&&t.roman?g`<span class="chord-rn">${t.roman}</span>`:Te}
          </div>
          ${_?g`<span class="pos-badge">${U}</span>`:Te}
        </div>

        <div class="svg-wrap">
          <svg width="${N}" height="${D}" viewBox="-13 -2 ${N} ${D}">
            ${S.map(E=>Y`
              <rect x="0" y="${E.y}" width="${$}" height="${E.sw}" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${C.map(E=>Y`
              <rect x="${E.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${A.map(E=>Y`
              <circle cx="${E.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
            `)}
            ${F.map(E=>Y`
              <text x="${E.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
            `)}
            ${I.map(E=>Y`
              <g>
                <circle cx="${E.cx}" cy="${E.cy}" r="${E.fill==="#F2735F"?7.5:7}" fill="${E.fill}"></circle>
                ${E.label?Y`
                  <text x="${E.cx}" y="${E.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${E.label}</text>
                `:Te}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${O}</div>
      </div>
    `}render(){const t=this.progression?.chords||[],e=["Piano","Guitar","Ukulele"],i=this.playInstrument==="Piano"?"One voicing per chord, root position — the red dot is the root, play left to right.":this.playInstrument==="Guitar"?"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.":"Standard G-C-E-A tuning — the red dot is the root, ○ is an open string, × is muted.";return g`
      <div class="play-panel">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="header-left">
            <span class="header-label">PLAY IT</span>
            <span class="header-sub">${this.playInstrument} Voicings</span>
          </div>

          <div class="header-right">
            <!-- Tier-2 Segmented Instrument Control -->
            <div class="tier2-control" role="tablist" aria-label="Instrument selector">
              ${e.map(o=>g`
                <button
                  class="tier2-chip ${this.playInstrument===o?"active":""}"
                  @click=${()=>this.setInstrument(o)}
                  role="tab"
                  aria-selected=${this.playInstrument===o}
                >
                  ${o}
                </button>
              `)}
            </div>

            <!-- Scale Degrees Switch -->
            <div
              class="degrees-switch"
              @click=${this.toggleDegrees}
              role="switch"
              aria-checked=${this.showDegrees}
              title="Toggle scale degree numbers vs note names"
            >
              <div class="toggle-track ${this.showDegrees?"active":""}">
                <div class="toggle-knob"></div>
              </div>
              <span>Scale degrees</span>
            </div>
          </div>
        </div>

        <!-- Subtitle Hint Banner -->
        <div class="hint-banner">${i}</div>

        <!-- Visualizer Content -->
        ${this.playInstrument==="Piano"?g`
              <div class="piano-grid">
                ${t.map((o,s)=>this.renderPianoCard(o,s,this.playing&&this.activeIndex===s))}
              </div>
            `:g`
              <div class="fret-grid">
                ${t.map((o,s)=>this.renderFretCard(o,s,this.playInstrument,this.playing&&this.activeIndex===s))}
              </div>
            `}
      </div>
    `}};Ne.styles=ce`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .play-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 520px;
    }

    @media (max-width: 640px) {
      .play-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    /* Panel Header */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .header-sub {
      font-size: 12px;
      font-weight: 600;
      color: #6b5f50;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Tier-2 Segmented Control */
    .tier2-control {
      display: flex;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }

    .tier2-chip {
      min-height: 32px;
      padding: 0 14px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
    }

    .tier2-chip.active {
      background: #fbf3e6;
      color: #2e271f;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
    }

    /* Scale degrees switch */
    .degrees-switch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.04);
      padding: 4px 10px;
      border-radius: 100px;
      border: 1px solid rgba(46, 39, 31, 0.08);
      transition: background 0.15s ease;
    }

    .degrees-switch:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .toggle-track {
      width: 28px;
      height: 16px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      padding: 2px;
      display: flex;
      align-items: center;
      transition: background 0.15s ease;
    }

    .toggle-track.active {
      background: #2e271f;
    }

    .toggle-knob {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      transform: translateX(0);
      transition: transform 0.15s ease;
    }

    .toggle-track.active .toggle-knob {
      transform: translateX(12px);
    }

    /* Subtitle Banner */
    .hint-banner {
      font-size: 12.5px;
      line-height: 1.5;
      color: #6b5f50;
      background: rgba(251, 243, 230, 0.6);
      border-radius: 12px;
      padding: 8px 14px;
      border: 1px solid rgba(46, 39, 31, 0.06);
    }

    /* Grid Layouts */
    .piano-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 16px;
    }

    .fret-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 16px;
    }

    /* Play Card */
    .play-card {
      border-radius: 20px;
      padding: 16px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(46, 39, 31, 0.04);
      transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      user-select: none;
    }

    .play-card:hover {
      border-color: rgba(46, 39, 31, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(46, 39, 31, 0.08);
    }

    .play-card.active-chord {
      border-color: #2e271f;
      box-shadow: 0 0 0 2px #2e271f, 0 6px 18px rgba(46, 39, 31, 0.12);
    }

    .card-top-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .chord-name-group {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .chord-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
    }

    .chord-rn {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #8a6b3f;
    }

    .pos-badge {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #8a6b3f;
      background: rgba(138, 107, 63, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
    }

    /* Notes Line */
    .notes-line {
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      letter-spacing: 0.2px;
    }

    /* SVG Containers */
    .svg-wrap {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 4px 0;
    }

    svg {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;je([x({type:Object})],Ne.prototype,"progression",2);je([x({type:Array})],Ne.prototype,"order",2);je([x({type:Number})],Ne.prototype,"activeIndex",2);je([x({type:Boolean})],Ne.prototype,"playing",2);je([x({type:Boolean})],Ne.prototype,"showTheory",2);je([x({type:String})],Ne.prototype,"playInstrument",2);je([x({type:Boolean})],Ne.prototype,"showDegrees",2);je([x({type:String})],Ne.prototype,"mood",2);Ne=je([pe("tab-play")],Ne);var da=Object.defineProperty,pa=Object.getOwnPropertyDescriptor,Se=(t,e,i,o)=>{for(var s=o>1?void 0:o?pa(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&da(e,i,s),s};const ha=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],ua=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],ma=[{label:"Root",id:"root"},{label:"1st Inv",id:"inv1"},{label:"2nd Inv",id:"inv2"},{label:"+1 Oct",id:"octUp"},{label:"-1 Oct",id:"octDown"}],ti={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"};let me=class extends de{constructor(){super(...arguments),this.progression=null,this.selectedChordIndex=null,this.selectedBand=null,this.showTheory=!1,this.isSaved=!1,this.savedSets=[],this.libraryOpen=!1,this.moodColor="#F2735F",this.abPick=null,this.activeSwapFamily="",this.swapIndex=null}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}onBarClick(t){this.dispatchEvent(new CustomEvent("chord-select",{detail:{index:t},bubbles:!0,composed:!0}))}onCloseDetail(){this.dispatchEvent(new CustomEvent("close-detail",{bubbles:!0,composed:!0}))}onToggleSave(){this.dispatchEvent(new CustomEvent("toggle-save",{bubbles:!0,composed:!0}))}onToggleLibrary(){this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("toggle-library",{detail:{open:this.libraryOpen},bubbles:!0,composed:!0}))}onSelectSavedSet(t){this.libraryOpen=!1,this.dispatchEvent(new CustomEvent("select-saved-set",{detail:{set:t},bubbles:!0,composed:!0}))}onDeleteSavedSet(t,e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("delete-saved-set",{detail:{id:t},bubbles:!0,composed:!0}))}onChangeQuality(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-quality",{detail:{quality:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeExtension(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-extension",{detail:{extension:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeVoicing(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-voicing",{detail:{voicing:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}render(){const t=this.progression?.chords||[],e=this.moodColor||At(this.progression?.mood||"Warm");return g`
      <aside class="chord-inspector cv-aside" style="--mood-color: ${e};">
        <div class="inspector-card">
          ${this.selectedChordIndex!==null&&t[this.selectedChordIndex]?this.renderChordDetail(t[this.selectedChordIndex],t):this.swapIndex!==null&&this.abPick?this.renderSwapAudition():this.renderIdleOverview(t,e)}
        </div>
      </aside>
    `}renderIdleOverview(t,e){const i=t.map(m=>m.tension||.1),o=Math.max(...i,.1),s=Math.min(...i,0),n=i.indexOf(o),r=i.every((m,f)=>f===0||m>=i[f-1]),a=o-s<.28?"Stays close to home":r?"A steady climb":i[i.length-1]<.25&&n<i.length-1?"Away, then home":"Drifts, then settles",l=`Opens ${ti[t[0]?.functionLabel]||"HOME"} and ${o-s<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":r?`tightens chord by chord, peaking on ${t[n]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[n]?.name||"the middle"} before easing back down home.`}`,c=ks(t),d=Ss(t),p=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR",h=Ee[u]||"Major";return g`
      <div class="header-row">
        <div>
          <div class="kicker">THIS LOOP</div>
          <div class="main-title">${a}</div>
        </div>
        <div class="header-actions">
          <button
            class="action-btn ${this.isSaved?"saved":""}"
            @click=${this.onToggleSave}
            aria-label="${this.isSaved?"Saved loop":"Save loop"}"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="${this.isSaved?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
            </svg>
            ${this.isSaved?"Saved":"Save"}
          </button>
          <button
            class="action-btn"
            @click=${this.onToggleLibrary}
            aria-label="Your saved loops"
            aria-expanded=${this.libraryOpen?"true":"false"}
          >
            Loops${this.savedSets.length?` (${this.savedSets.length})`:""}
          </button>

          ${this.libraryOpen?g`
            <div class="popover-menu">
              <div class="kicker" style="margin-bottom: 8px;">SAVED LOOPS</div>
              ${this.savedSets.length===0?g`
                <div style="font-size: 12px; color: var(--cv-ink-muted); padding: 8px 4px;">No saved loops yet. Click "Save" to store your favorite progressions.</div>
              `:this.savedSets.map(m=>g`
                <div class="popover-item" @click=${()=>this.onSelectSavedSet(m)}>
                  <span style="font-size: 12.5px; font-weight: 700; color: #2E271F;">${m.name}</span>
                  <button
                    style="border: none; background: none; color: #8A6B3F; font-size: 14px; cursor: pointer;"
                    @click=${f=>this.onDeleteSavedSet(m.id,f)}
                    aria-label="Delete ${m.name}"
                  >×</button>
                </div>
              `)}
            </div>
          `:""}
        </div>
      </div>

      <!-- Arc Bars Chart -->
      <div class="arc-bars-container">
        ${t.map((m,f)=>{const b=ie(m.tension||.1),v=Math.round(18+(m.tension||.1)*60);return g`
            <button
              class="arc-bar-col ${this.selectedChordIndex===f?"selected":""}"
              @click=${()=>this.onBarClick(f)}
              aria-label="${m.name}, ${ti[m.functionLabel]||""}"
            >
              <div class="bar-fill" style="height: ${v}px; background: ${b.color};"></div>
              <div class="bar-chord-name">${m.name}</div>
              <div class="bar-role-hint">${ti[m.functionLabel]||""}</div>
            </button>
          `})}
      </div>
      <div class="arc-hint-text">Taller means more unresolved.</div>
      <div class="arc-sentence-text">${l}</div>

      ${this.showTheory?g`
        <div class="theory-box">
          <div class="theory-row">
            <span class="theory-key">Key &amp; Scale</span>
            <span class="theory-val">${p} ${h}</span>
          </div>
          <div class="theory-row">
            <span class="theory-key">Formula</span>
            <span class="theory-val">${t.map(m=>m.roman||"").filter(Boolean).join(" – ")}</span>
          </div>

          ${c.length?g`
            <div>
              <div class="section-kicker" style="margin-top: 6px;">Detected Cadences</div>
              ${c.map(m=>g`
                <div class="cadence-card">
                  <div class="cadence-title">
                    <span>${m.name}</span>
                    <span style="font-size: 10px; color: var(--cv-label);">${m.bars}</span>
                  </div>
                  <div class="cadence-desc">${m.why}</div>
                </div>
              `)}
            </div>
          `:""}

          ${d.length?g`
            <div>
              <div class="section-kicker" style="margin-top: 6px;">Voice Leading</div>
              ${d.map(m=>g`
                <div class="voice-link-row">
                  <span style="font-weight: 700; color: #2E271F;">${m.chords}</span>
                  <span style="color: var(--cv-ink-muted);">${m.move} (${m.link})</span>
                </div>
              `)}
            </div>
          `:""}
        </div>
      `:""}
    `}renderChordDetail(t,e){const i=this.getChordQualityLabel(t.name),o=this.getChordExtensionLabel(t.name),s=z(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=ws(t.name,s),r=ie(t.tension||.1);return g`
      <div class="header-row">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <div class="badge-icon" style="background: ${r.color};"></div>
          <div>
            <div class="kicker">CHORD</div>
            <div class="main-title" style="display: flex; align-items: baseline; gap: 8px;">
              ${t.name}
              ${t.roman?g`<span style="font-size: 13px; font-weight: 700; color: var(--cv-label); font-family: var(--cv-font-mono, monospace);">${t.roman}</span>`:""}
            </div>
            <div class="sub-role">${ti[t.functionLabel]||t.functionLabel}</div>
          </div>
        </div>
        <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close chord details">×</button>
      </div>

      <!-- Notes Pills -->
      <div>
        <div class="section-kicker">Notes</div>
        <div class="notes-pill-row">
          ${(t.notes||[]).map(a=>g`
            <div class="note-pill">${a.replace(/\d+$/,"")}</div>
          `)}
        </div>
      </div>

      <!-- Interval Breakdown & Guide Tones -->
      ${n.length?g`
        <div>
          <div class="section-kicker">Intervals &amp; Guide Tones</div>
          <div class="interval-grid">
            ${n.map(a=>g`
              <div class="interval-token ${a.isGuideTone?"guide":""}">
                <div class="interval-note">${a.note}</div>
                <div class="interval-symbol">${a.intervalSymbol}</div>
                <div class="interval-role">${a.roleName}</div>
              </div>
            `)}
          </div>
        </div>
      `:""}

      <!-- Quality Selection -->
      <div>
        <div class="section-kicker">Quality</div>
        <div class="chips-grid">
          ${ha.map(a=>{const l=a.label===i;return g`
              <button
                class="option-chip ${l?"active":""}"
                @click=${()=>this.onChangeQuality(a.label)}
                aria-pressed="${l}"
              >
                <div class="chip-title">${a.label}</div>
                <div class="chip-desc">${a.sub}</div>
              </button>
            `})}
        </div>
      </div>

      <!-- Extension Selection -->
      <div>
        <div class="section-kicker">Extension</div>
        <div class="chips-grid">
          ${ua.map(a=>{const l=a.label===o;return g`
              <button
                class="option-chip ${l?"active":""}"
                @click=${()=>this.onChangeExtension(a.label)}
                aria-pressed="${l}"
              >
                <div class="chip-title">${a.label}</div>
                <div class="chip-desc">${a.sub}</div>
              </button>
            `})}
        </div>
      </div>

      <!-- Voicing / Inversion Selection -->
      <div>
        <div class="section-kicker">Voicing</div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${ma.map(a=>g`
            <button
              class="action-btn"
              @click=${()=>this.onChangeVoicing(a.id)}
            >
              ${a.label}
            </button>
          `)}
        </div>
      </div>
    `}renderSwapAudition(){return g`
      <div class="header-row">
        <div>
          <div class="kicker">BAR ${(this.swapIndex??0)+1} HARMONIC CONTEXT</div>
          <div class="main-title">Auditioning Swap</div>
        </div>
        <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close audition">×</button>
      </div>

      <div class="audition-card">
        <div class="kicker" style="color: #2E271F;">${this.activeSwapFamily||"Substitution"}</div>
        <div class="audition-title">${this.abPick.chord||this.abPick.name}</div>
        <div style="font-size: 12.5px; color: var(--cv-ink-muted); line-height: 1.5;">
          ${this.abPick.functionLabel||this.abPick.fn||"Alters the emotional color of this bar."}
        </div>
        ${this.abPick.notes?g`
          <div style="font-size: 12px; font-weight: 700; color: #2E271F;">
            Notes: ${this.abPick.notes.join(" · ")}
          </div>
        `:""}
      </div>
    `}};me.styles=ce`
    :host {
      display: block;
      width: clamp(304px, 26vw, 384px);
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    .inspector-card {
      background: var(--cv-surface-card, rgba(251, 243, 230, 0.85));
      backdrop-filter: blur(12px);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 10px 28px -12px rgba(46, 39, 31, 0.15);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Header */
    .header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 3px;
    }

    .main-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.015em;
      color: var(--cv-ink, #2E271F);
      line-height: 1.2;
    }

    .sub-role {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 2px;
    }

    .header-actions {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(46, 39, 31, 0.06);
      border: none;
      border-radius: 100px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: background 160ms ease, transform 120ms ease;
    }

    .action-btn:hover {
      background: rgba(46, 39, 31, 0.1);
    }

    .action-btn:active {
      transform: scale(0.96);
    }

    .action-btn.saved {
      background: var(--mood-color, #F2735F);
      color: #2E271F;
    }

    .close-btn {
      background: rgba(46, 39, 31, 0.08);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }

    .close-btn:hover {
      background: rgba(46, 39, 31, 0.15);
    }

    /* Popover */
    .popover-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 250px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 12px;
      box-shadow: 0 14px 32px -8px rgba(46, 39, 31, 0.25);
      z-index: 100;
      animation: popover-in 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes popover-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .popover-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 120ms ease;
    }

    .popover-item:hover {
      background: rgba(46, 39, 31, 0.06);
    }

    /* Tension Arc Chart */
    .arc-bars-container {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 110px;
      padding: 12px 10px 6px;
      background: rgba(46, 39, 31, 0.03);
      border-radius: 16px;
      box-sizing: border-box;
    }

    .arc-bar-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: transform 140ms ease;
    }

    .arc-bar-col:hover {
      transform: translateY(-2px);
    }

    .arc-bar-col.selected .bar-fill {
      box-shadow: inset 0 0 0 2px #2E271F;
    }

    .bar-fill {
      width: 100%;
      border-radius: 100px;
      transition: height 240ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease;
    }

    .bar-chord-name {
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 6px;
      white-space: nowrap;
    }

    .bar-role-hint {
      font-size: 9px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      white-space: nowrap;
    }

    .arc-hint-text {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
      margin-top: -6px;
    }

    .arc-sentence-text {
      font-size: 13px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #5B5145);
    }

    /* Chord Detail Elements */
    .badge-icon {
      width: 16px;
      height: 16px;
      border-radius: 6px;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .notes-pill-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .note-pill {
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 8px;
      padding: 4px 10px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
    }

    .section-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 6px;
    }

    /* Interval Breakdown Grid */
    .interval-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
      gap: 6px;
    }

    .interval-token {
      background: rgba(255, 255, 255, 0.6);
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      border-radius: 10px;
      padding: 6px 4px;
      text-align: center;
      transition: border-color 150ms ease, background 150ms ease;
    }

    .interval-token.guide {
      background: rgba(242, 115, 95, 0.14);
      border-color: #F2735F;
    }

    .interval-note {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
    }

    .interval-symbol {
      font-size: 10px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      margin-top: 1px;
    }

    .interval-token.guide .interval-symbol {
      color: #F2735F;
    }

    .interval-role {
      font-size: 8.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      line-height: 1.1;
      margin-top: 1px;
    }

    /* Chips & Options Grid */
    .chips-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }

    .option-chip {
      background: rgba(46, 39, 31, 0.05);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 12px;
      padding: 8px 10px;
      text-align: left;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease, transform 100ms ease;
    }

    .option-chip:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .option-chip:active {
      transform: scale(0.97);
    }

    .option-chip.active {
      background: #FBF3E6;
      border-color: #2E271F;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.15);
    }

    .chip-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .chip-desc {
      font-size: 9.5px;
      font-weight: 600;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 1px;
    }

    /* Theory Details */
    .theory-box {
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      padding-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .theory-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .theory-key {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .theory-val {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .cadence-card {
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 12px;
      padding: 10px 12px;
      margin-top: 4px;
    }

    .cadence-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      display: flex;
      justify-content: space-between;
    }

    .cadence-desc {
      font-size: 11px;
      line-height: 1.45;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 3px;
    }

    .voice-link-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-size: 11.5px;
      padding: 4px 0;
      border-bottom: 1px solid rgba(46, 39, 31, 0.05);
    }

    /* Audition State */
    .audition-card {
      background: #FBF3E6;
      border: 1.5px solid var(--mood-color, #F2735F);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .audition-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #2E271F;
    }
  `;Se([x({type:Object})],me.prototype,"progression",2);Se([x({type:Number})],me.prototype,"selectedChordIndex",2);Se([x({type:String})],me.prototype,"selectedBand",2);Se([x({type:Boolean})],me.prototype,"showTheory",2);Se([x({type:Boolean})],me.prototype,"isSaved",2);Se([x({type:Array})],me.prototype,"savedSets",2);Se([x({type:Boolean})],me.prototype,"libraryOpen",2);Se([x({type:String})],me.prototype,"moodColor",2);Se([x({type:Object})],me.prototype,"abPick",2);Se([x({type:String})],me.prototype,"activeSwapFamily",2);Se([x({type:Number})],me.prototype,"swapIndex",2);me=Se([pe("chord-inspector")],me);class pt{constructor(){this.midiAccess=null,this.selectedOutputId=null,this.selectedInputId=null,this.status="idle",this.errorMessage="",this.listeners=new Set,this.routing={chordsChannel:1,chordsInternalAudio:!0,melodyChannel:2,melodyInternalAudio:!0},this.loadSettings()}static getInstance(){return pt.instance||(pt.instance=new pt),pt.instance}loadSettings(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem("chroma-chords-midi-routing");e&&(this.routing={...this.routing,...JSON.parse(e)}),this.selectedOutputId=localStorage.getItem("chroma-chords-midi-output")||null,this.selectedInputId=localStorage.getItem("chroma-chords-midi-input")||null}catch{}}saveSettings(){if(!(typeof localStorage>"u"))try{localStorage.setItem("chroma-chords-midi-routing",JSON.stringify(this.routing)),this.selectedOutputId?localStorage.setItem("chroma-chords-midi-output",this.selectedOutputId):localStorage.removeItem("chroma-chords-midi-output"),this.selectedInputId?localStorage.setItem("chroma-chords-midi-input",this.selectedInputId):localStorage.removeItem("chroma-chords-midi-input")}catch{}}isSupported(){return typeof navigator<"u"&&typeof navigator.requestMIDIAccess=="function"}async connect(){if(!this.isSupported())return this.status="unsupported",this.errorMessage="Web MIDI is not supported in this browser.",this.notify(),!1;try{this.midiAccess=await navigator.requestMIDIAccess({sysex:!1}),this.status="connected",this.errorMessage="";const e=this.getOutputs();return!this.selectedOutputId&&e.length>0&&(this.selectedOutputId=e[0].id),this.midiAccess.onstatechange=()=>{this.notify()},this.saveSettings(),this.notify(),!0}catch(e){return this.status="error",this.errorMessage=e?.message||"Failed to access MIDI devices.",this.notify(),!1}}getStatus(){return this.status}getErrorMessage(){return this.errorMessage}getOutputs(){if(!this.midiAccess)return[];const e=[];try{const i=this.midiAccess.outputs.values();for(const o of i)e.push({id:o.id,name:o.name||`Output ${o.id}`,manufacturer:o.manufacturer})}catch{}return e}getInputs(){if(!this.midiAccess)return[];const e=[];try{const i=this.midiAccess.inputs.values();for(const o of i)e.push({id:o.id,name:o.name||`Input ${o.id}`,manufacturer:o.manufacturer})}catch{}return e}getSelectedOutput(){return this.selectedOutputId}setSelectedOutput(e){this.selectedOutputId=e,this.saveSettings(),this.notify()}getSelectedInput(){return this.selectedInputId}setSelectedInput(e){this.selectedInputId=e,this.saveSettings(),this.notify()}setRouting(e){this.routing={...this.routing,...e},this.saveSettings(),this.notify()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.status))}getActiveOutputDevice(){return!this.midiAccess||!this.selectedOutputId?null:this.midiAccess.outputs.get(this.selectedOutputId)||null}sendNoteOn(e,i=100,o=1){const s=this.getActiveOutputDevice();if(!s)return;const r=144|Math.max(0,Math.min(15,o-1));try{s.send([r,Math.max(0,Math.min(127,e)),Math.max(0,Math.min(127,i))])}catch{}}sendNoteOff(e,i=1){const o=this.getActiveOutputDevice();if(!o)return;const n=128|Math.max(0,Math.min(15,i-1));try{o.send([n,Math.max(0,Math.min(127,e)),0])}catch{}}sendTestNote(e=1){this.sendNoteOn(60,100,e),setTimeout(()=>{this.sendNoteOff(60,e)},400)}}const Z=pt.getInstance();var ga=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,ye=(t,e,i,o)=>{for(var s=o>1?void 0:o?fa(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&ga(e,i,s),s};let le=class extends de{constructor(){super(...arguments),this.isOpen=!1,this.status="idle",this.outputs=[],this.inputs=[],this.selectedOutput=null,this.selectedInput=null,this.chordsChannel=1,this.chordsInternalAudio=!0,this.melodyChannel=2,this.melodyInternalAudio=!0,this.errorMessage="",this.testNotePlaying=!1}connectedCallback(){super.connectedCallback(),this.syncFromService(),this.unsubscribe=Z.subscribe(()=>{this.syncFromService()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe&&this.unsubscribe()}syncFromService(){this.status=Z.getStatus(),this.errorMessage=Z.getErrorMessage(),this.outputs=Z.getOutputs(),this.inputs=Z.getInputs(),this.selectedOutput=Z.getSelectedOutput(),this.selectedInput=Z.getSelectedInput(),this.chordsChannel=Z.routing.chordsChannel,this.chordsInternalAudio=Z.routing.chordsInternalAudio,this.melodyChannel=Z.routing.melodyChannel,this.melodyInternalAudio=Z.routing.melodyInternalAudio}async onConnect(){await Z.connect(),this.syncFromService()}onSendTest(){this.testNotePlaying=!0,Z.sendTestNote(this.chordsChannel),setTimeout(()=>{this.testNotePlaying=!1},450)}onOutputChange(t){const e=t.target.value;Z.setSelectedOutput(e||null)}onInputChange(t){const e=t.target.value;Z.setSelectedInput(e||null)}onChordsChannelChange(t){const e=parseInt(t.target.value,10);this.chordsChannel=e,Z.setRouting({chordsChannel:e})}onMelodyChannelChange(t){const e=parseInt(t.target.value,10);this.melodyChannel=e,Z.setRouting({melodyChannel:e})}toggleChordsAudio(){this.chordsInternalAudio=!this.chordsInternalAudio,Z.setRouting({chordsInternalAudio:this.chordsInternalAudio})}toggleMelodyAudio(){this.melodyInternalAudio=!this.melodyInternalAudio,Z.setRouting({melodyInternalAudio:this.melodyInternalAudio})}onClose(){this.isOpen=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const t=Array.from({length:16},(e,i)=>i+1);return g`
      <div
        class="modal-overlay ${this.isOpen?"open":""}"
        @click=${e=>{e.target===e.currentTarget&&this.onClose()}}
      >
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="midi-title">
          <!-- Header -->
          <div class="modal-header">
            <div class="header-left">
              <span class="header-title" id="midi-title">Web MIDI Routing</span>
              <span class="status-badge">
                <span class="status-dot ${this.status}"></span>
                ${this.status==="connected"?"Connected":this.status==="error"?"Error":"Idle"}
              </span>
            </div>
            <button class="close-btn" @click=${this.onClose} aria-label="Close">×</button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            ${this.errorMessage?g`<div class="error-banner">${this.errorMessage}</div>`:Te}

            <!-- Hardware Devices -->
            <div class="form-group">
              <span class="section-label">HARDWARE OUTPUT</span>
              <select class="select-control" @change=${this.onOutputChange}>
                <option value="">No MIDI output device selected</option>
                ${this.outputs.map(e=>g`
                    <option value=${e.id} ?selected=${this.selectedOutput===e.id}>
                      ${e.name}
                    </option>
                  `)}
              </select>
            </div>

            <div class="form-group">
              <span class="section-label">HARDWARE INPUT</span>
              <select class="select-control" @change=${this.onInputChange}>
                <option value="">No MIDI input device selected</option>
                ${this.inputs.map(e=>g`
                    <option value=${e.id} ?selected=${this.selectedInput===e.id}>
                      ${e.name}
                    </option>
                  `)}
              </select>
            </div>

            <!-- Per-Part Channel Routing -->
            <div class="form-group">
              <span class="section-label">PART ROUTING</span>
              <div class="routing-card">
                <!-- Chords Part -->
                <div class="routing-row">
                  <div class="routing-info">
                    <span class="routing-title">Chords</span>
                    <span class="routing-sub">Harmonic progression</span>
                  </div>
                  <div class="routing-controls">
                    <select class="channel-select" @change=${this.onChordsChannelChange}>
                      ${t.map(e=>g`
                          <option value=${e} ?selected=${this.chordsChannel===e}>
                            Ch ${e}
                          </option>
                        `)}
                    </select>
                    <button
                      class="audio-toggle-btn ${this.chordsInternalAudio?"active":""}"
                      @click=${this.toggleChordsAudio}
                      title="Internal synth audio playback"
                    >
                      ${this.chordsInternalAudio?"Sound: ON":"Muted"}
                    </button>
                  </div>
                </div>

                <!-- Melody Part -->
                <div class="routing-row">
                  <div class="routing-info">
                    <span class="routing-title">Melody</span>
                    <span class="routing-sub">Lead voice sequencer</span>
                  </div>
                  <div class="routing-controls">
                    <select class="channel-select" @change=${this.onMelodyChannelChange}>
                      ${t.map(e=>g`
                          <option value=${e} ?selected=${this.melodyChannel===e}>
                            Ch ${e}
                          </option>
                        `)}
                    </select>
                    <button
                      class="audio-toggle-btn ${this.melodyInternalAudio?"active":""}"
                      @click=${this.toggleMelodyAudio}
                      title="Internal lead synth audio playback"
                    >
                      ${this.melodyInternalAudio?"Sound: ON":"Muted"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="actions-bar">
              <button class="btn btn-connect" @click=${this.onConnect}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="10" cy="15" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="12" cy="8" r="1"/></svg>
                ${this.status==="connected"?"Re-scan devices":"Connect MIDI"}
              </button>

              <button
                class="btn btn-test"
                @click=${this.onSendTest}
                ?disabled=${this.status!=="connected"||!this.selectedOutput}
              >
                ${this.testNotePlaying?"Playing note...":"Send test note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `}};le.styles=ce`
    :host {
      display: contents;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.45);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-card {
      width: 100%;
      max-width: 460px;
      background: #fbf3e6;
      border-radius: 24px;
      box-shadow: 0 16px 40px rgba(46, 39, 31, 0.18), 0 2px 8px rgba(46, 39, 31, 0.08);
      border: 1px solid rgba(46, 39, 31, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(12px) scale(0.98);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.open .modal-card {
      transform: translateY(0) scale(1);
    }

    /* Header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-title {
      font-size: 17px;
      font-weight: 800;
      color: #2e271f;
      letter-spacing: -0.01em;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.06);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .status-dot.connected {
      background: #6f8f5c;
      box-shadow: 0 0 0 2px rgba(111, 143, 92, 0.3);
    }

    .status-dot.idle {
      background: #f6d98b;
    }

    .status-dot.error,
    .status-dot.unsupported {
      background: #f2735f;
    }

    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(46, 39, 31, 0.06);
      color: #6b5f50;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .close-btn:hover {
      background: rgba(46, 39, 31, 0.12);
      color: #2e271f;
    }

    /* Body */
    .modal-body {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      max-height: calc(85vh - 120px);
      overflow-y: auto;
    }

    .section-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
      margin-bottom: 6px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 12.5px;
      font-weight: 700;
      color: #2e271f;
    }

    .select-control {
      width: 100%;
      height: 38px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid rgba(46, 39, 31, 0.15);
      background: #fffdf8;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: #2e271f;
      cursor: pointer;
      transition: border-color 0.15s ease;
    }

    .select-control:focus {
      outline: none;
      border-color: #9b7ca8;
    }

    /* Channel Routing Rows */
    .routing-card {
      border-radius: 14px;
      background: rgba(46, 39, 31, 0.04);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .routing-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .routing-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .routing-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #2e271f;
    }

    .routing-sub {
      font-size: 11px;
      font-weight: 600;
      color: #6b5f50;
    }

    .routing-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .channel-select {
      height: 32px;
      padding: 0 8px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.15);
      background: #fbf3e6;
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
    }

    /* Audio Toggle Pill */
    .audio-toggle-btn {
      min-height: 28px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.12);
      background: transparent;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      color: #6b5f50;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .audio-toggle-btn.active {
      background: #2e271f;
      color: #fbf3e6;
      border-color: #2e271f;
    }

    /* Actions Bar */
    .actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .btn {
      min-height: 38px;
      padding: 0 16px;
      border-radius: 10px;
      border: none;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s ease, transform 0.1s ease;
    }

    .btn:active {
      transform: scale(0.97);
    }

    .btn-connect {
      background: #2e271f;
      color: #fbf3e6;
    }

    .btn-connect:hover {
      background: #4a3f33;
    }

    .btn-test {
      background: #c9a9e0;
      color: #2e271f;
    }

    .btn-test:hover {
      background: #bfa1d9;
    }

    .btn-test:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .error-banner {
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(242, 115, 95, 0.12);
      color: #e85f49;
      font-size: 12px;
      font-weight: 600;
    }
  `;ye([x({type:Boolean})],le.prototype,"isOpen",2);ye([k()],le.prototype,"status",2);ye([k()],le.prototype,"outputs",2);ye([k()],le.prototype,"inputs",2);ye([k()],le.prototype,"selectedOutput",2);ye([k()],le.prototype,"selectedInput",2);ye([k()],le.prototype,"chordsChannel",2);ye([k()],le.prototype,"chordsInternalAudio",2);ye([k()],le.prototype,"melodyChannel",2);ye([k()],le.prototype,"melodyInternalAudio",2);ye([k()],le.prototype,"errorMessage",2);ye([k()],le.prototype,"testNotePlaying",2);le=ye([pe("midi-modal")],le);var ba=Object.defineProperty,va=Object.getOwnPropertyDescriptor,Be=(t,e,i,o)=>{for(var s=o>1?void 0:o?va(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&ba(e,i,s),s};const ya=Y`
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
`,xa=Y`
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
`,wa=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:ya},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:xa}];let we=class extends de{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.melodyTrack=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=tr(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(t="chords"){if(this.progression){this.emit("toast","Generating WAV audio...");try{const e=this.barsPerChord||w.getBarsPerChord()||1,i=this.feelSettings||w.getFeelSettings(),o=this.melodyTrack||w.getMelodyTrack();await pr(t,this.progression,o,{order:this.order,instrumentName:this.instrument,playStyleName:this.playStyle,barsPerChord:e,feelSettings:i}),this.emit("toast","WAV file downloaded")}catch(e){console.error("WAV export failed",e),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(t="both"){if(this.progression){try{const e=this.barsPerChord||w.getBarsPerChord()||1,i=this.feelSettings||w.getFeelSettings(),o=this.melodyTrack||w.getMelodyTrack();lr(this.progression,o,{target:t,order:this.order,playStyleName:this.playStyle,barsPerChord:e,feelSettings:i});const s=t==="both"?"Multi-track MIDI":`${t.toUpperCase()} MIDI`;this.emit("toast",`${s} file downloaded`)}catch(e){console.error("MIDI export failed",e),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened,e=this.melodyTrack||w.getMelodyTrack(),i=!!(e&&e.notes&&e.notes.length>0);return g`
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
            ${wa.map(o=>g`
              <div class="dest-card" @click=${()=>this.handleDeviceClick(o.device)}>
                <div class="device-svg-box">
                  ${o.svg}
                </div>
                <div class="dest-badge">${o.mono}</div>
                <div class="dest-name">${o.name}</div>
                <div class="dest-desc">${o.desc}</div>
              </div>
            `)}
          </div>

          <div class="section-label">Or export a file</div>

          <div class="export-list">
            ${i?g`
              <div class="export-row" @click=${()=>this.handleMidiClick("both")}>
                <div class="export-badge" style="background: rgba(201, 169, 224, 0.3); color: #2E271F;">MID 1+2</div>
                <div>
                  <div class="export-title">Multi-Track MIDI (Type 1)</div>
                  <div class="export-desc">Track 1 Chords + Track 2 Lead Melody for your DAW.</div>
                </div>
              </div>

              <div class="export-row" @click=${()=>this.handleMidiClick("melody")}>
                <div class="export-badge">MEL</div>
                <div>
                  <div class="export-title">Save Melody MIDI</div>
                  <div class="export-desc">Isolated lead voice melody track notes.</div>
                </div>
              </div>
            `:Te}

            <div class="export-row" @click=${()=>this.handleMidiClick("chords")}>
              <div class="export-badge">MID</div>
              <div>
                <div class="export-title">Save Chords MIDI</div>
                <div class="export-desc">Just the chord progression notes and voicings.</div>
              </div>
            </div>

            <div class="export-row" @click=${()=>this.handleWavClick("chords")}>
              <div class="export-badge">WAV</div>
              <div>
                <div class="export-title">Save as WAV</div>
                <div class="export-desc">Rendered audio loop, ready to drop into any player.</div>
              </div>
            </div>

            ${i?g`
              <div class="export-row" @click=${()=>this.handleWavClick("melody")}>
                <div class="export-badge">STEM</div>
                <div>
                  <div class="export-title">Save Lead Melody WAV</div>
                  <div class="export-desc">Isolated lead synth stem audio file.</div>
                </div>
              </div>
            `:Te}
          </div>
        </div>
      </div>
    `}};we.styles=ce`
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
      top: 50%;
      left: 50%;
      z-index: 1001;
      width: calc(100% - 40px);
      max-width: 560px;
      max-height: 85vh;
      background: var(--cv-cream, #FBF6EC);
      border-radius: 28px;
      box-shadow: 0 28px 64px -14px rgba(46, 39, 31, 0.45), 0 0 0 1px rgba(46, 39, 31, 0.08);
      display: flex;
      flex-direction: column;
      transform: translate(-50%, -46%) scale(0.96);
      opacity: 0;
      pointer-events: none;
      transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
      box-sizing: border-box;
      overflow: hidden;
    }
    .share-drawer.open {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      pointer-events: auto;
    }
    .handle-bar {
      display: none;
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
      padding: 24px 26px 28px;
    }

    @media (max-width: 900px) {
      .share-drawer {
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 100%;
        max-height: 88vh;
        border-radius: 26px 26px 0 0;
        box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.4);
        transform: translateY(100%);
        transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
      }
      .share-drawer.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .handle-bar {
        display: flex;
        padding: 11px 0 0;
        justify-content: center;
        flex-shrink: 0;
      }
      .drawer-content {
        padding: 14px 22px 28px;
      }
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
  `;Be([x({type:Boolean})],we.prototype,"open",2);Be([x({type:Boolean})],we.prototype,"visible",2);Be([x({type:Object})],we.prototype,"progression",2);Be([x({type:Array})],we.prototype,"order",2);Be([x({type:String})],we.prototype,"instrument",2);Be([x({type:String})],we.prototype,"playStyle",2);Be([x({type:Number})],we.prototype,"barsPerChord",2);Be([x({type:Object})],we.prototype,"feelSettings",2);Be([x({type:Object})],we.prototype,"melodyTrack",2);we=Be([pe("share-modal")],we);var ka=Object.defineProperty,Sa=Object.getOwnPropertyDescriptor,It=(t,e,i,o)=>{for(var s=o>1?void 0:o?Sa(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&ka(e,i,s),s};let We=class extends de{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&bt.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await bt.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?g``:g`
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

          ${this.errorMessage?g`<div class="alert-box alert-error">${this.errorMessage}</div>`:""}

          <div class="btn-container">
            <div id="google-btn-container">
              <button
                type="button"
                class="oauth-btn"
                ?disabled=${this.isOAuthLoading}
                @click=${this.handleGoogleSignIn}
              >
                ${this.isOAuthLoading?g`<span class="spinner"></span> <span>Connecting to Google...</span>`:g`
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
    `}};We.styles=ce`
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
  `;It([x({type:Boolean})],We.prototype,"open",2);It([k()],We.prototype,"mounted",2);It([k()],We.prototype,"isOAuthLoading",2);It([k()],We.prototype,"errorMessage",2);It([Us("#google-btn-container")],We.prototype,"googleBtnContainer",2);We=It([pe("auth-modal")],We);var Ia=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,Ct=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ca(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ia(e,i,s),s};let Ke=class extends de{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const i=(this.chordIndex%e.length+e.length)%e.length;return e[i]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),i=e.rows;if(!i||i.length===0)return;this.chordIndex=(this.chordIndex+1)%i.length;const o=this.getCurrentRow();o&&this.emitAudition(o,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),i=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:i.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),i=t.rows?t.rows.length:0,o=i>0?this.chordIndex%i+1:0,s=ie(t.tension);return g`
      <div class="cycler-was">was ${this.originalChord?.name||"Chord"}</div>

      <div class="cycler-feel-header">
        <div
          style="
            width: 14px;
            height: 14px;
            border-radius: ${Math.round(s.radius*.3)}px;
            background: ${s.color};
            flex-shrink: 0;
          "
        ></div>
        <div class="cycler-feel-name">${t.name}</div>
      </div>

      <div class="cycler-feel-sub">${t.sub}</div>

      <div class="cycler-nav-row">
        <button
          class="cycler-chev-btn"
          @click=${this.onPrevFeel}
          @pointerdown=${n=>n.stopPropagation()}
          aria-label="Previous feeling"
        >‹</button>

        <div class="cycler-dots-track">
          ${this.feelings.map((n,r)=>g`
            <div
              class="cycler-dot"
              style="background: ${r===this.feelIndex?"#2E271F":"rgba(46,39,31,0.22)"};"
            ></div>
          `)}
        </div>

        <button
          class="cycler-chev-btn"
          @click=${this.onNextFeel}
          @pointerdown=${n=>n.stopPropagation()}
          aria-label="Next feeling"
        >›</button>
      </div>

      ${e?g`
        <button
          class="cycler-chord-btn"
          @click=${this.onCycleChord}
          @pointerdown=${n=>n.stopPropagation()}
          aria-label="Next chord for this feeling"
        >
          <div class="chord-top-row">
            <span class="chord-main-name">${e.name}</span>
            <span class="chord-count-hint">${o} of ${i} ↻</span>
          </div>
          <div class="chord-meta-row">
            ${e.roman?g`<span class="chord-roman">${e.roman}</span>`:""}
            <span class="chord-sub-note">${e.sub}</span>
          </div>
        </button>
      `:""}

      <button
        class="keep-btn"
        @click=${this.onKeep}
        @pointerdown=${n=>n.stopPropagation()}
        aria-label="Keep ${e?.name||"chord"}"
      >
        Keep
      </button>

      <button
        class="revert-btn"
        @click=${this.onRevert}
        @pointerdown=${n=>n.stopPropagation()}
        aria-label="Revert swap"
      >
        Revert
      </button>
    `}};Ke.styles=ce`
    :host {
      display: block;
      position: relative;
      font-family: var(--cv-font, sans-serif);
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      padding: 4px 2px;
      user-select: none;
    }

    .cycler-was {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #4A4034;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cycler-feel-header {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 6px;
    }

    .cycler-feel-name {
      font-size: 15.5px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.015em;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cycler-feel-sub {
      font-size: 10.5px;
      font-weight: 700;
      line-height: 1.35;
      color: #2E271F;
      opacity: 0.72;
      margin-top: 3px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cycler-nav-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
    }

    .cycler-chev-btn {
      border: none;
      font-family: inherit;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.12);
      color: #2E271F;
      font-size: 17px;
      font-weight: 800;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease, transform 100ms ease;
    }
    .cycler-chev-btn:active {
      transform: scale(0.9);
      background: rgba(46, 39, 31, 0.22);
    }

    .cycler-dots-track {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 3px;
    }

    .cycler-dot {
      flex: 1;
      height: 3px;
      border-radius: 100px;
      transition: background 200ms ease;
    }

    .cycler-chord-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      text-align: left;
      background: rgba(251, 246, 236, 0.9);
      border-radius: 14px;
      padding: 10px 12px;
      margin-top: 10px;
      cursor: pointer;
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.15);
      transition: transform 120ms ease, background 150ms ease;
      box-sizing: border-box;
    }
    .cycler-chord-btn:hover {
      background: #FFFFFF;
    }
    .cycler-chord-btn:active {
      transform: scale(0.98);
    }

    .chord-top-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .chord-main-name {
      font-size: 19px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      flex: 1;
      min-width: 0;
    }

    .chord-count-hint {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: rgba(46, 39, 31, 0.55);
      white-space: nowrap;
    }

    .chord-meta-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-top: 4px;
    }

    .chord-roman {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #6B5F50;
    }

    .chord-sub-note {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      color: #6B5F50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .keep-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      background: #2E271F;
      color: #F4EBDB;
      border-radius: 100px;
      min-height: 44px;
      margin-top: 8px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, transform 120ms ease;
    }
    .keep-btn:active {
      transform: scale(0.97);
    }

    .revert-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      background: transparent;
      color: #2E271F;
      min-height: 38px;
      margin-top: 2px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 150ms ease;
    }
    .revert-btn:hover {
      text-decoration: underline;
    }
    .revert-btn:active {
      opacity: 0.6;
    }
  `;Ct([x({type:Object})],Ke.prototype,"originalChord",2);Ct([x({type:Number})],Ke.prototype,"barIndex",2);Ct([x({type:Array})],Ke.prototype,"feelings",2);Ct([x({type:Number})],Ke.prototype,"feelIndex",2);Ct([x({type:Number})],Ke.prototype,"chordIndex",2);Ke=Ct([pe("chord-pad-cycler")],Ke);var $a=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,M=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ta(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&$a(e,i,s),s};const Qi=Os,Go=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"];Ye.map(t=>t.name);Object.fromEntries(Ye.map(t=>[t.name,t.iconPath]));const Qe={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},Ea=Qe,Zi=["A","S","D","F","Z","X","C","V"],Ma=["Octave up","1st inversion","Low root"];function Vo(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const Na=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Aa=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],eo=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],xe={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},Oa=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],qo=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],ii=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],to={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},oi={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},Ho=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Jo={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},si={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ni={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},fo={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Nt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Fa(t){const e=t===""?"maj":t;if(Nt[5][e]||Nt[6][e])return e;const i=fo[e];return i&&(Nt[5][i]||Nt[6][i])?i:"maj"}function Da(t){const e=Fa(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Nt[o][e];if(!n)return;const r=((t.rootPc-s)%12+12)%12;i.push({rootFret:r,frets:n.map(a=>a===null?null:a+r)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function Ba(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),o=r=>{const a=new Set(r);let l=null;const c=[],d=p=>{if(p===4){const u=c.map((b,v)=>(e[v]+b)%12);for(const b of a)if(u.indexOf(b)<0)return;for(const b of u)if(!a.has(b))return;const h=c.filter(b=>b>0),m=h.length?Math.max(...h)-Math.min(...h):0;if(m>3)return;const f=m*12+c.reduce((b,v)=>b+v,0);(!l||f<l.score)&&(l={frets:c.slice(),score:f});return}for(let u=0;u<=5;u++)c.push(u),d(p+1),c.pop()};return d(0),l},s=o(i);if(s)return s.frets;const n=o(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return n?n.frets:null}let T=class extends de{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle="Block chords",this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isSaved=!1,this.currentProjectId=null,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.showSaveModal=!1,this.pendingSaveName="",this.selectedBand=null,this.bandSwaps={},this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.humanise=45,this.tone="Warm",this.feelScope="loop",this.barFeel={},this.advOverride={},this.advOpen=!1,this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{if(t.key==="Escape"&&(this.vibeOpen||this.tempoOpen||this.feelOpen)){t.preventDefault(),this.vibeOpen=!1,this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate();return}if(this.isEditableTarget(t))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.ctrlKey||t.metaKey||t.altKey)return;const e=Zi.map(o=>o.toLowerCase()).indexOf((t.key||"").toLowerCase()),i=this.progression?.chords||[];if(e>=0&&e<i.length){t.preventDefault();const o=88+e%3*6,s=i[e],n=this.getLadderHome(s),r=s.voicing||"1st inversion",a=Vo(r),l=this.progression?.key||"C",c=this.progression?.scaleType||"MAJOR",d=s.notes&&s.notes.length?s.notes:G(s.name,z(l,c));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const p=a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:r,vel:o,zone:a,reach:n,meta:p},w.playChordNotes(d,.85,r,o),this.requestUpdate()}},this.handleKeyUp=t=>{if(this.isEditableTarget(t)||t.ctrlKey||t.metaKey||t.altKey)return;Zi.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.setLibraryOpen=t=>{this.libraryOpen=t,this.dispatchEvent(new CustomEvent("library-open-change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrary=()=>{this.setLibraryOpen(!this.libraryOpen)},this.toggleSaved=()=>{this.isSaved?this.dispatchEvent(new CustomEvent("unsave-set",{detail:this.currentProjectId,bubbles:!0,composed:!0})):(this.pendingSaveName=this.getSuggestedLoopName(),this.showSaveModal=!0,this.updateComplete.then(()=>{const t=this.renderRoot?.querySelector(".save-modal-input");t?.focus(),t?.select()}))},this.cancelSaveModal=()=>{this.showSaveModal=!1,this.pendingSaveName=""},this.confirmSaveModal=()=>{const t=this.pendingSaveName.trim()||this.getSuggestedLoopName();this.dispatchEvent(new CustomEvent("save-set",{detail:t,bubbles:!0,composed:!0})),this.showSaveModal=!1,this.pendingSaveName=""},this.onSaveNameKeydown=t=>{t.key==="Enter"?this.confirmSaveModal():t.key==="Escape"&&this.cancelSaveModal()},this.startRename=(t,e)=>{this.renamingId=t,this.draftName=e,this.confirmDeleteId=null,this.requestUpdate(),this.updateComplete.then(()=>{const i=this.renderRoot?.querySelector(".library-rename-input");i?.focus(),i?.select()})},this.commitRename=t=>{const e=this.renamingId,i=this.draftName.trim();if(e&&i){const o=R.getProjects().find(s=>s.id===e);o&&(o.name=i,R.saveProject(o)),this.savedSets=this.savedSets.map(s=>s.id===e?{...s,name:i}:s),this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:i},bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName="",this.requestUpdate()},this.cancelRename=()=>{this.renamingId=null,this.draftName="",this.requestUpdate()},this.askDelete=t=>{this.confirmDeleteId=t,this.renamingId=null,this.requestUpdate()},this.cancelDelete=()=>{this.confirmDeleteId=null,this.requestUpdate()},this.confirmDelete=t=>{R.deleteProject(t),this.savedSets=this.savedSets.filter(e=>e.id!==t),this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0})),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop",bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrarySelectMode=()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelectMode||(this.librarySelected=[]),this.requestUpdate()},this.toggleSelectLoop=t=>{this.librarySelected.includes(t)?this.librarySelected=this.librarySelected.filter(e=>e!==t):this.librarySelected=[...this.librarySelected,t],this.requestUpdate()},this.toggleSelectAllVisible=()=>{const t=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(s=>!t||(s.name+" "+s.genre+" "+s.mood).toLowerCase().includes(t)).map(s=>s.id);if(i.length>0&&i.every(s=>this.librarySelected.includes(s)))this.librarySelected=this.librarySelected.filter(s=>!i.includes(s));else{const s=new Set([...this.librarySelected,...i]);this.librarySelected=Array.from(s)}this.requestUpdate()},this.deleteSelectedLoops=()=>{const t=[...this.librarySelected];if(!t.length)return;const e=t.length;for(const i of t)R.deleteProject(i),this.dispatchEvent(new CustomEvent("delete-project",{detail:i,bubbles:!0,composed:!0}));this.savedSets=R.getProjects(),this.librarySelected=[],this.savedSets.length||(this.librarySelectMode=!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Deleted ${e} loop${e>1?"s":""}`,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,w.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=z(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:G(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];w.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),w.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=z(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:G(this.abPick.chord,t),i=[...this.progression.chords],o=i[this.swapIndex],s=o.initialChord||{...o};i[this.swapIndex]={...o,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:s};const n={...this.progression,chords:i};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),w.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>Ft&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<kt&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onSetLength=t=>{(this.progression?.chords.length||4)!==t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t,bubbles:!0,composed:!0}))},this.onReroll=()=>{if(this.selectedBand){this.onGenerateBandProgression(this.selectedBand);return}this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.requestUpdate()},this.onParameterOverride=t=>{const{param:e,value:i}=t.detail;this.advOverride={...this.advOverride,[e]:i},w.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onParameterRelink=t=>{const{param:e}=t.detail,i={...this.advOverride};delete i[e],this.advOverride=i,w.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,w.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,w.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=R.getProjects(),this.unsubscribeProjects=typeof R.subscribeProjects=="function"?R.subscribeProjects(()=>{this.savedSets=R.getProjects(),this.requestUpdate()}):typeof R.subscribe=="function"?R.subscribe(()=>{this.savedSets=R.getProjects(),this.requestUpdate()}):null,w.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride}),w.setBarsPerChord(this.barsPerChord),Et(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("humanise")||t.has("playStyle")||t.has("tone")||t.has("barFeel")||t.has("advOverride")||t.has("humanEngineState"))&&(w.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:this.humanEngineState}),t.has("playStyle")&&w.setPlayStyle(this.playStyle),t.has("tone")&&Et(this.tone)),t.has("barsPerChord")&&w.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}isEditableTarget(t){const e=s=>{if(!s||typeof s!="object")return!1;const n=s,r=(n.tagName||"").toUpperCase();return r==="INPUT"||r==="TEXTAREA"||r==="SELECT"||!!n.isContentEditable},i=typeof t.composedPath=="function"?t.composedPath():[t.target];for(const s of i)if(e(s))return!0;let o=typeof document<"u"?document.activeElement:null;for(;o&&o.shadowRoot&&o.shadowRoot.activeElement;)o=o.shadowRoot.activeElement;return!!e(o)}getSuggestedLoopName(){if(this.selectedBand)return`${this.selectedBand} vibe`;const t=this.progression?.genre||"Loop",e=this.progression?.mood?this.progression.mood.toLowerCase():"";return e?`${t} ${e}`:`${t} loop`}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){if(this.bandSwaps={},this.selectedBand===t){this.selectedBand=null,this.requestUpdate();return}this.selectedBand=t;const e=$e(t);if(e){const i=so(e.presetId),o=no(e.rhythmStyle);i&&(this.instrument=i,w.setInstrument(i),this.dispatchEvent(new CustomEvent("set-instrument",{detail:i,bubbles:!0,composed:!0}))),o&&(this.playStyle=o,w.setPlayStyle(o),this.dispatchEvent(new CustomEvent("set-play-style",{detail:o,bubbles:!0,composed:!0}))),e.defaultBpm&&this.setDirectBpm(e.defaultBpm),this.dispatchEvent(new CustomEvent("toast",{detail:`Artist DNA: ${e.name} · ${i||""} · ${e.defaultBpm} BPM`,bubbles:!0,composed:!0}))}this.requestUpdate()}onWriteBandLoop(t){this.bandSwaps={},this.onGenerateBandProgression(t.name)}onGenerateBandProgression(t){if(!this.progression||!this.chordData)return;this.bandSwaps={};const e=this.progression.key||"C",i=this.progression.scaleType||"MAJOR",o=Gr(this.chordData,t,e,i);if(o){const s=$e(t);if(s){const n=so(s.presetId),r=no(s.rhythmStyle);n&&(this.instrument=n,w.setInstrument(n),this.dispatchEvent(new CustomEvent("set-instrument",{detail:n,bubbles:!0,composed:!0}))),r&&(this.playStyle=r,w.setPlayStyle(r),this.dispatchEvent(new CustomEvent("set-play-style",{detail:r,bubbles:!0,composed:!0}))),s.defaultBpm&&this.setDirectBpm(s.defaultBpm)}this.progression=o,this.order=Array.from({length:o.chords.length},(n,r)=>r),w.setProgression(o,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${t} progression in ${e} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}}applyBandMove(t,e,i){if(!this.progression)return;const o=this.progression.chords[t];if(!o)return;this.bandSwaps={...this.bandSwaps,[t]:{originalChord:{...o},move:e}};const s={...o,name:e.chord,roman:e.roman,functionLabel:`${i.name} Move`,desc:`${i.name} signature move (${e.name})`,tension:o.tension,tag:"glow",color:ie(o.tension).color},n=[...this.progression.chords];n[t]=s;const r={...this.progression,chords:n};this.progression=r,w.setProgression(r,this.order),w.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`${i.name} move: ${e.name} applied to Bar ${t+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}revertBandMove(t){if(!this.progression||!this.bandSwaps[t])return;const{originalChord:e}=this.bandSwaps[t],i={...this.bandSwaps};delete i[t],this.bandSwaps=i;const o=[...this.progression.chords];o[t]=e;const s={...this.progression,chords:o};this.progression=s,w.setProgression(s,this.order),w.auditionChord(e,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Reverted Bar ${t+1} to ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onApplyBandTrick(t,e){if(!this.progression||!this.chordData)return;const i=e!==void 0?e:this.swapIndex!==null?this.swapIndex:this.progression.chords.length>2?2:0,o=this.progression.chords[i];if(!o)return;const s={...o,name:t.chordName,roman:t.roman,notes:t.notes,functionLabel:`${this.selectedBand||"Artist"} Trick`,desc:t.plain,tension:t.tension,tag:"glow",color:ie(t.tension).color},n=[...this.progression.chords];n[i]=s;const r={...this.progression,chords:n};this.progression=r,w.setProgression(r,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),w.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Injected ${t.trick.name} (${t.chordName}) at Bar ${i+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderTopBandBar(){const t=this.selectedBand?$e(this.selectedBand):null;if(!t)return"";const e=Kt[t.name]||{font:t.font,pillFs:13,pillTrack:"0"};return g`
      <div class="band-bar band-bar-sticky" style="background: ${t.color}4D; border-bottom: 1.5px solid rgba(46,39,31,0.09);">
        <div style="display: flex; align-items: center; gap: 10px; width: 100%; min-width: 0; padding: 0 4px; box-sizing: border-box;">
          <div style="width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; background: ${t.color};"></div>
          <div style="font-family: ${e.font}; font-weight: ${e.weight||400}; font-style: ${e.italic?"italic":"normal"}; font-size: ${e.pillFs+1}px; letter-spacing: ${e.pillTrack}; line-height: 1.2; color: #2E271F; flex-shrink: 0;">
            ${t.name}
          </div>
          <div style="flex: 1; min-width: 0;"></div>
          <button
            class="band-write-loop-btn band-bar-write-btn"
            style="border: none; font-family: inherit; flex-shrink: 0; background: #2E271F; color: #F4EBDB; border-radius: 100px; min-height: 32px; padding: 0 14px; font-size: 11.5px; font-weight: 800; letter-spacing: 0.2px; cursor: pointer; transition: transform 120ms ease;"
            @click=${()=>this.onWriteBandLoop(t)}
            aria-label="Write a loop in ${t.name}'s style"
          >
            Write loop
          </button>
          <button
            class="band-bar-close band-bar-dismiss-btn"
            style="width: 30px; height: 30px; border-radius: 50%; border: none; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #2E271F; background: rgba(251,243,230,0.7); cursor: pointer;"
            @click=${()=>this.onBandClick(t.name)}
            aria-label="Stop following ${t.name}"
          >
            ×
          </button>
        </div>
      </div>
    `}renderBandLegend(){const t=this.selectedBand?$e(this.selectedBand):null;return t?g`
      <div class="band-legend-box" style="position: relative; z-index: 2; flex-shrink: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 8px; margin-bottom: 14px; animation: cvfv-sheet-up 180ms var(--cv-ease, ease-out);">
        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
          <div style="width: 9px; height: 9px; border-radius: 3px; flex-shrink: 0; background: ${t.color};"></div>
          <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex-shrink: 0;">
            ${t.name} moves
          </div>
        </div>
        <div style="flex: 1 1 220px; min-width: 0; font-size: 11px; font-weight: 700; line-height: 1.45; color: var(--cv-ink-muted); text-wrap: pretty;">
          ${this.showTheory?t.theory:t.plain} — tap a move on any chord to use it.
        </div>
      </div>
    `:""}renderBandInspectorCard(t){const e=Kt[t.name]||{font:t.font,weight:t.weight||400,italic:t.italic,pillFs:t.pillFs||13,pillTrack:t.pillTrack||"0"};return g`
      <div class="band-card" style="background: var(--cv-cream); border: 1px solid rgba(46,39,31,0.08); border-radius: 16px; padding: 13px 15px 15px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; background: ${t.color}; box-shadow: 0 0 0 2px rgba(46,39,31,0.06);"></div>
            <div style="font-family: ${e.font}; font-weight: ${e.weight||400}; font-style: ${e.italic?"italic":"normal"}; font-size: ${(e.pillFs||12)+1}px; letter-spacing: ${e.pillTrack||"0"}; line-height: 1.15; color: #2E271F;">
              ${t.name}
            </div>
          </div>
          <span style="font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--cv-label);">Band DNA</span>
        </div>
        ${t.sig&&t.sig.length?g`
          <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">
            ${t.sig.map((i,o)=>g`
              <div style="${o?"padding-top: 10px; border-top: 1px solid rgba(46,39,31,0.07);":""}">
                <div style="font-size: 9px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase; color: var(--cv-label);">${i.k}</div>
                <div style="font-size: 11.5px; font-weight: 600; line-height: 1.45; color: var(--cv-ink); margin-top: 2px; text-wrap: pretty;">${i.v}</div>
              </div>
            `)}
          </div>
        `:g`
          <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink); margin-top: 8px; line-height: 1.45;">${this.showTheory?t.theory:t.plain}</div>
        `}
      </div>
    `}renderBandDnaBar(t){return this.renderBandLegend()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:e},bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t,w.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>i+s)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const i=this.progression?.chords,o=i?i[e]:null;if(!o)return;let s=o.voicing||"1st inversion",n=Vo(s),r;const a=this.getChordLadder(o),l=this.getLadderHome(o);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const b=t.currentTarget.getBoundingClientRect(),v=Math.min(.999,Math.max(0,(t.clientX-b.left)/(b.width||1))),y=Math.min(.999,Math.max(0,(t.clientY-b.top)/(b.height||1)));y<.34?(n=0,s="up an octave"):y>.67?(n=2,s="low, root position"):(n=1,s="1st inversion"),a.length>0&&(r=Math.min(a.length-1,Math.floor(v*a.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const c=r!==void 0&&a[r]?a[r]:o.name,d=r!==void 0&&r!==l&&!!a[r],p=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR",h=G(c,z(p,u)),m=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const f=d?"→ "+c:n===0?"UP AN OCTAVE":n===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:s,vel:m,zone:n,reach:r,meta:f},w.playChordNotes(h,.85,s,m),this.pendingLatch={index:e,reach:r,voicing:s,targetChordName:c},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords,o=i?i[e]:null;if(o&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const s=t.currentTarget.getBoundingClientRect(),n=Math.min(.999,Math.max(0,(t.clientX-s.left)/(s.width||1))),r=Math.min(.999,Math.max(0,(t.clientY-s.top)/(s.height||1)));let a=1,l="1st inversion";r<.34?(a=0,l="up an octave"):r>.67&&(a=2,l="low, root position");const c=this.getChordLadder(o),d=this.getLadderHome(o),p=c.length>0?Math.min(c.length-1,Math.floor(n*c.length)):void 0,u=p!==void 0&&c[p]?c[p]:o.name,h=p!==void 0&&p!==d&&!!c[p];if(this.pendingLatch?.reach!==p||this.pendingLatch?.voicing!==l){this.pendingLatch={index:e,reach:p,voicing:l,targetChordName:u};const m=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",b=G(u,z(m,f)),v=88+e%3*6,y=h?"→ "+u:a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:l,vel:v,zone:a,reach:p,meta:y},w.playChordNotes(b,.65,l,v),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:i,voicing:o,targetChordName:s}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const n=this.progression.chords[e],r=this.getChordLadder(n),a=this.getLadderHome(n),l=n.voicing||"1st inversion",c=i!==void 0&&i!==a&&!!r[i]&&!!s;if(c||!!o&&o!==l){const p=n.initialChord||{...n};let u;if(c&&s){const f=this.getChordQualityLabel(n.name),b=this.getChordExtensionLabel(s),v=this.progression.key||"C",y=this.progression.scaleType||"MAJOR";u=pi(n,f,b),u.name=s,u.notes=G(s,z(v,y))}else u={...n};o&&(u.voicing=o),u.name===p.name&&(!p.voicing||u.voicing===p.voicing)?delete u.initialChord:u.initialChord=p;const h=[...this.progression.chords];h[e]=u;const m={...this.progression,chords:h};this.progression=m,this.dispatchEvent(new CustomEvent("progression-change",{detail:m,bubbles:!0,composed:!0})),w.setProgression(m,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",w.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=ho(this.chordData,this.progression),o=fi(this.chordData,this.progression),s=i.map(c=>({name:c.name,sub:oi[c.name]?oi[c.name][this.showTheory?1:0]:c.sub||"",tension:c.tension,rows:c.rows.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))});const n=s.filter(c=>c.name!=="Borrowed").sort((c,d)=>c.tension-d.tension),r=s.filter(c=>c.name==="Borrowed"),a=[...n,...r],l=this.selectedBand?$e(this.selectedBand):null;if(l){const c=mo(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),d=new Map(c.map(p=>[p.chordName,p]));a.forEach(p=>{const u=p.rows.map(f=>{const b=d.get(f.name);return b?{...f,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?b.theory:b.plain}:f}),h=u.filter(f=>f.bandTag),m=u.filter(f=>!f.bandTag);p.rows=[...h,...m]})}return a}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],i=z(this.progression.key,this.progression.scaleType),o=t.notes&&t.notes.length?t.notes:G(t.chordName,i)||e.notes,s=t.chord?{...t.chord,name:t.chordName,notes:o,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:o,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:o,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,w.auditionChord(s,.8),w.setABOverride({index:this.swapIndex,side:"after",chord:s}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?z(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:G(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&w.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),w.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=z(this.progression.key,this.progression.scaleType),i=G(t,e);w.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=z(this.progression.key,this.progression.scaleType);if(t==="before")w.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),w.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=G(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};w.setABOverride({index:this.swapIndex,side:"after",chord:o}),w.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=z(this.progression.key,this.progression.scaleType),o={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:G(this.abPick.chord,i)};w.auditionChord(o,.8)}else w.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordExtensionLabel(i.name),s=pi(i,t,o);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),w.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordQualityLabel(i.name),s=pi(i,o,t);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),w.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(a=>e[a.replace(/\d+$/,"")]??-1)),o=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],s=100/7,n=s*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return g`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${o.map(a=>{const l=i.has(a.pc);return g`<div class="white-key ${l?"active":""}">${a.note}</div>`})}
        </div>
        ${r.map(a=>{const l=(a.after+1)*s-n/2,c=i.has(a.pc);return g`<div class="black-key ${c?"active":""}" style="left: ${l}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.playStyle!==xe.playStyle||this.swing!==xe.swing||this.spread!==xe.spread||this.density!==xe.density||this.humanise!==xe.humanise||this.tone!==xe.tone||Object.keys(this.barFeel).length>0||Object.keys(this.advOverride).length>0}resetFeel(){this.playStyle=xe.playStyle,this.swing=xe.swing,this.spread=xe.spread,this.density=xe.density,this.humanise=xe.humanise,this.tone=xe.tone,this.barFeel={},this.advOverride={},this.humanEngineState=null,w.setPlayStyle(this.playStyle),w.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:{},advOverride:{},humanState:void 0}),Et(this.tone),this.requestUpdate()}get fScopeBar(){return typeof this.feelScope=="number"?this.feelScope:null}fget(t){const e=this.fScopeBar;return e!==null&&this.barFeel[e]&&this.barFeel[e][t]!==void 0?this.barFeel[e][t]:this[t]}fset(t,e){const i=this.fScopeBar;if(i===null)this[t]=e,t==="playStyle"?(w.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-play-style",{detail:e,bubbles:!0,composed:!0}))):t==="tone"?(w.setFeelSettings({tone:e}),Et(e)):w.setFeelSettings({[t]:e});else{const o={...this.barFeel};o[i]={...o[i]||{},[t]:e},this.barFeel=o,w.setFeelSettings({barFeel:o})}this.requestUpdate()}getPatternShortName(t){const e=t||this.fget("playStyle")||this.playStyle||"Block chords",i=eo[0].steps.find(o=>o.v===e);return i?i.name:"Block"}get feelChipLabel(){return`Feel · ${this.getPatternShortName()}`}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle")||this.playStyle||"Block chords",o=Ot.find(r=>r.name===e)?.patch??{},s=this.progression?.genre??"Pop",n=yo[s]??{};return{spread:+(t("spread")/100).toFixed(2),duration:+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),humanVariance:+(t("humanise")/100).toFixed(2),microTiming:+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2),arpMode:o.arpMode??n.arpMode??"off",arpRate:o.arpRate??n.arpRate??"1/16",arpRange:o.arpRange??n.arpRange??1,arpGate:.85,minVelocity:n.minVelocity??60,maxVelocity:n.maxVelocity??110}}get activeEngineParams(){const t=this.getDerivedParams();return{spread:this.advOverride.spread!==void 0?this.advOverride.spread:t.spread,duration:this.advOverride.duration!==void 0?this.advOverride.duration:t.duration,humanVariance:this.advOverride.humanVariance!==void 0?this.advOverride.humanVariance:t.humanVariance,microTiming:this.advOverride.microTiming!==void 0?this.advOverride.microTiming:t.microTiming,arpMode:this.advOverride.arpMode!==void 0?this.advOverride.arpMode:t.arpMode,arpRate:this.advOverride.arpRate!==void 0?this.advOverride.arpRate:t.arpRate,arpRange:this.advOverride.arpRange!==void 0?this.advOverride.arpRange:t.arpRange,arpGate:this.advOverride.arpGate!==void 0?this.advOverride.arpGate:t.arpGate,minVelocity:this.advOverride.minVelocity!==void 0?this.advOverride.minVelocity:t.minVelocity,maxVelocity:this.advOverride.maxVelocity!==void 0?this.advOverride.maxVelocity:t.maxVelocity}}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=i),w.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),w.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,w.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=ii.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=ii.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",i=Bo(this.progression,t,e);this.progression=i,w.setProgression(i),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${i.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=Yn(this.progression,t);this.progression=e,w.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=Bo(this.progression,t);this.progression=e,w.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,o){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?o+1:0;const s=z(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=G(e,s);w.auditionChord({name:e,notes:n},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=to[e]||to[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||to.MAJOR,o=this.progression?.key||"C",s=L[o.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;z(o,e);const n=o.replace("b","♭")+" "+i.name,r=t.map(f=>{const b=ne(f.name);return L[b.root]??0}),a=f=>i.steps.indexOf(((f-s)%12+12)%12),l=i.steps.map((f,b)=>{const v=(s+f)%12,C=Oa[v]+i.quals[b],S=r.indexOf(v),I=S>=0,A=this.auditionDeg===b;return{di:b,roman:i.romans[b],name:C,fn:i.fns[b],inLoop:I,on:A,barIdx:S,aria:`Hear ${C}, the ${i.fns[b].toLowerCase()} of ${n}`}}),c=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,d=t.map(f=>f.roman||i.romans[Math.max(0,a(L[ne(f.name).root]??0))]).join(" – "),p=o.replace("b","♭")+" "+i.name,u=ks(t),h=Ss(t),m=this.progression?.note||"";return{scaleName:n,scaleHint:c,scaleDegrees:l,romanFormula:d,keyModeLine:p,cadences:u,voiceLinks:h,setNote:m}}renderScaleChords(t,e,i,o){const s=At(this.progression?.mood||"Warm");return g`
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
          ${i.map(n=>g`
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
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return g`
      <div class="tempo-popover-desktop" style="background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
        <div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Tempo</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button
              @click=${()=>this.nudgeBpm(-1)}
              aria-label="Slower"
              style="border: none; font-family: inherit; width: 36px; height: 36px; border-radius: 11px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 17px; font-weight: 800; cursor: pointer;"
            >&#8722;</button>
            <input
              type="number"
              min="40"
              max="240"
              .value=${t.toString()}
              @change=${e=>this.setDirectBpm(parseInt(e.target.value,10))}
              style="border: 1px solid rgba(46,39,31,0.18); border-radius: 9px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 20px; font-weight: 800; letter-spacing: -0.02em; width: 66px; text-align: center; padding: 4px 0; font-family: inherit;"
              aria-label="Tempo BPM"
            />
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
            ${[1,2,4].map(e=>g`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===e?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(e)}
              >
                ${e===1?"1 bar":`${e} bars`}
              </button>
            `)}
          </div>
        </div>
        <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Key Root</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${qo.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=L[i]??0,s=L[e.root]??0,n=o===s;return g`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                    @click=${()=>this.selectRoot(e.root)}
                    aria-label="Root note ${e.label}"
                  >
                    ${e.label}
                  </button>
                `})}
            </div>
          </div>
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Scale / Mode</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${ii.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return g`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                    @click=${()=>this.selectScale(e.type)}
                    aria-label="Scale ${e.label}"
                  >
                    ${e.label}
                  </button>
                `})}
            </div>
          </div>
        </div>
      </div>
    `}renderFeelDrawerDesktop(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return g`
      <div class="feel-popover-desktop" style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex-shrink: 0;">Feel</div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; flex: 1; min-width: 0;">
            <button
              type="button"
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${this.fScopeBar===null?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.fScopeBar===null?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
              @click=${()=>{this.feelScope="loop"}}
              aria-label="Whole loop feel"
            >
              Whole loop
            </button>
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,s=!!this.barFeel[i];return g`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                  aria-label="${e.name}, ${o?"editing":"edit feel"}"
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${o?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${s?1:0}; transition: opacity 150ms ease;"></span>
                </button>
              `})}
          </div>
          ${this.feelChanged?g`
            <button
              type="button"
              @click=${this.resetFeel}
              style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11.5px; font-weight: 800; cursor: pointer; padding: 6px 8px; border-radius: 9px;"
            >Reset</button>
          `:""}
          <button
            type="button"
            @click=${()=>{this.feelOpen=!1}}
            aria-label="Close feel and tone"
            style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
          >×</button>
        </div>
        <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 7px; text-wrap: pretty;">
          ${t}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px 22px; margin-top: 10px;">
          ${eo.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(s=>s.v===i)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=s)}),g`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(s=>{const n=s.v===o.v;return g`
                      <button
                        type="button"
                        style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>this.fset(e.k,s.v)}
                        aria-label="${e.label}: ${s.name}"
                      >
                        ${s.name}
                      </button>
                    `})}
                </div>
              </div>
            `})}
        </div>
        <button
          type="button"
          @click=${()=>{this.advOpen=!this.advOpen}}
          style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 8px 10px; margin: 10px 0 0 -10px; border-radius: 9px;"
          aria-label="Show the engine parameters these choices set"
        >
          Engine parameters <span style="font-size: 9px;">${this.advOpen?"▲":"▼"}</span>
        </button>
        ${this.advOpen?g`
          <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; margin-top: 6px;">
            <human-panel
              layout="embedded"
              .spread=${this.activeEngineParams.spread}
              .duration=${this.activeEngineParams.duration}
              .humanVariance=${this.activeEngineParams.humanVariance}
              .microTiming=${this.activeEngineParams.microTiming}
              .arpMode=${this.activeEngineParams.arpMode}
              .arpRate=${this.activeEngineParams.arpRate}
              .arpRange=${this.activeEngineParams.arpRange}
              .arpGate=${this.activeEngineParams.arpGate}
              .minVelocity=${this.activeEngineParams.minVelocity}
              .maxVelocity=${this.activeEngineParams.maxVelocity}
              .parameterOverrides=${this.advOverride}
              .sourceLabels=${{spread:"Spread",duration:"Pattern + Density",humanVariance:"Humanise",microTiming:"Swing + Humanise",arpMode:"Pattern",arpRate:"Pattern",arpRange:"Pattern",arpGate:"Pattern",minVelocity:"Genre",maxVelocity:"Genre"}}
              style="--human-bg: transparent; --human-surface: var(--cv-surface, #F6EADB); --human-surface-2: var(--cv-surface-2, #F1E4CC); --human-border: rgba(46,39,31,0.12); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: rgba(46,39,31,0.45); --human-accent: #9E5D53; --human-accent-hover: #804A41; width: 100%; min-width: 0; box-shadow: none;"
              @parameter-override=${this.onParameterOverride}
              @parameter-relink=${this.onParameterRelink}
              @human-change=${this.onHumanChange}
            ></human-panel>
          </div>
        `:""}
      </div>
    `}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return g`
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
              <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
                <input
                  type="number"
                  min="40"
                  max="240"
                  .value=${t.toString()}
                  @change=${e=>this.setDirectBpm(parseInt(e.target.value,10))}
                  style="border: 1px solid rgba(46,39,31,0.18); border-radius: 9px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 22px; font-weight: 800; letter-spacing: -0.02em; width: 68px; text-align: center; padding: 4px 0; font-family: inherit;"
                  aria-label="Tempo BPM"
                />
                <span style="font-size: 12px; font-weight: 800; color: var(--cv-ink-muted);">bpm</span>
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
            ${[1,2,4].map(e=>g`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===e?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(e)}
              >
                ${e===1?"1 bar":`${e} bars`}
              </button>
            `)}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Key Root</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${qo.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=L[i]??0,s=L[e.root]??0,n=o===s;return g`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectRoot(e.root)}
                  aria-label="Root note ${e.label}"
                >
                  ${e.label}
                </button>
              `})}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Scale / Mode</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${ii.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return g`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectScale(e.type)}
                  aria-label="Scale ${e.label}"
                >
                  ${e.label}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}onSelectSectionCard(t){this.activeSectionIdx=t,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}renderSongSectionList(t){const e=this.sections.length<Xe.length;return g`
      <div class="song-view-wrap song-section-view">
        <div class="song-section-lead">
          Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
        </div>

        <div class="song-section-list">
          ${this.sections.map((i,o)=>{const s=this.activeSectionIdx===o;return g`
              <div
                class="song-section-row ${s?"active":""}"
                @click=${()=>this.onSelectSectionCard(o)}
                role="button"
                tabindex="0"
                aria-label="Edit section ${o+1} ${i.name}"
              >
                <div class="song-section-index">SECTION ${o+1}</div>
                <div class="song-section-info">
                  <div class="song-section-title">${i.name}</div>
                  <div class="song-section-desc">${i.desc}</div>
                </div>
                <div class="song-section-chips">
                  ${i.progression.chords.map(n=>{const r=ie(n.tension);return g`
                      <div
                        class="song-chord-chip"
                        style="background: ${r.color};"
                        title="${n.name} (${n.functionLabel||n.tag})"
                      ></div>
                    `})}
                </div>
                ${this.sections.length>1?g`
                  <button
                    class="song-section-delete-btn"
                    title="Remove ${i.name}"
                    aria-label="Remove ${i.name}"
                    @click=${n=>{n.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-section",{detail:o,bubbles:!0,composed:!0}))}}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                `:""}
              </div>
            `})}

          ${e?g`
            <button
              class="song-add-section-card"
              @click=${()=>this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}
              aria-label="Add a related section"
            >
              <span class="plus-glyph">+</span>
              <span>Add a related section</span>
            </button>
          `:g`
            <div class="song-add-section-card disabled" aria-disabled="true">
              <span>All song parts added</span>
            </div>
          `}
        </div>

        <!-- Song Play Transport Strip Below Sections -->
        <div class="loop-strip-header song-play-row" style="margin-top: 24px;">
          <button
            class="loop-play-btn song-transport-btn"
            @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}
            style="background: ${this.playing?"#2E271F":t}; color: ${this.playing?"#FBF3E6":"#2E271F"};"
            aria-label="${this.playing?"Stop song":`Play song · ${this.sections.length} sections`}"
          >
            ${this.playing?g`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              <span>Stop song</span>
            `:g`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play song · ${this.sections.length} sections</span>
            `}
          </button>
          <div class="strip-timeline-wrap">
            <div class="strip-cells-bar loop-beat-cells">
              ${this.sections.map((i,o)=>{const s=this.playing&&this.activePlayingSectionIdx===o;return g`
                  <div
                    class="strip-cell"
                    style="height: ${s?20:10}px; border-radius: 3px; background: ${s?"#F2735F":"rgba(46,39,31,0.22)"}; flex: 1;"
                  ></div>
                `})}
            </div>
            <div class="strip-labels-row">
              <div class="strip-status-label song-transport-status">
                ${this.playing?`Section ${this.activePlayingSectionIdx+1} of ${this.sections.length} · ${this.sections[this.activePlayingSectionIdx]?.name||""}`:`${this.sections.length} sections · stopped`}
              </div>
              <div class="strip-space-hint">Space plays the song</div>
            </div>
          </div>
        </div>
      </div>
    `}renderFeelSheetMobile(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return g`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; max-height: calc(100% - 24px); overflow-y: auto; overscroll-behavior: contain; background: var(--cv-surface, #F6EADB); border-radius: 26px 26px 0 0; padding: 0 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="position: sticky; top: 0; z-index: 2; background: var(--cv-surface, #F6EADB); padding: 14px 0 10px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">Feel</div>
              ${this.feelChanged?g`
                <button
                  type="button"
                  @click=${this.resetFeel}
                  style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 12px; font-weight: 800; cursor: pointer; padding: 8px 10px; border-radius: 10px;"
                >Reset</button>
              `:""}
              <button
                type="button"
                @click=${()=>{this.feelOpen=!1}}
                style="border: none; font-family: inherit; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink, #2E271F); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
              >Done</button>
            </div>
          </div>
          <div style="display: flex; gap: 5px; overflow-x: auto; margin-top: 2px; padding-bottom: 2px;">
            <button
              type="button"
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${this.fScopeBar===null?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.fScopeBar===null?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
              @click=${()=>{this.feelScope="loop"}}
            >
              Whole loop
            </button>
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,s=!!this.barFeel[i];return g`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${o?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${s?1:0};"></span>
                </button>
              `})}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${t}
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${eo.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(s=>s.v===i)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=s)}),g`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(s=>{const n=s.v===o.v;return g`
                        <button
                          type="button"
                          style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>this.fset(e.k,s.v)}
                          aria-label="${e.label}: ${s.name}"
                        >
                          ${s.name}
                        </button>
                      `})}
                  </div>
                </div>
              `})}
          </div>
          <button
            type="button"
            @click=${()=>{this.advOpen=!this.advOpen}}
            style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 8px 10px; margin: 10px 0 0 -10px; border-radius: 9px;"
            aria-label="Show the engine parameters these choices set"
          >
            Engine parameters <span style="font-size: 9px;">${this.advOpen?"▲":"▼"}</span>
          </button>
          ${this.advOpen?g`
            <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; margin-top: 6px;">
              <human-panel
                layout="embedded"
                .spread=${this.activeEngineParams.spread}
                .duration=${this.activeEngineParams.duration}
                .humanVariance=${this.activeEngineParams.humanVariance}
                .microTiming=${this.activeEngineParams.microTiming}
                .arpMode=${this.activeEngineParams.arpMode}
                .arpRate=${this.activeEngineParams.arpRate}
                .arpRange=${this.activeEngineParams.arpRange}
                .arpGate=${this.activeEngineParams.arpGate}
                .minVelocity=${this.activeEngineParams.minVelocity}
                .maxVelocity=${this.activeEngineParams.maxVelocity}
                .parameterOverrides=${this.advOverride}
                .sourceLabels=${{spread:"Spread",duration:"Pattern + Density",humanVariance:"Humanise",microTiming:"Swing + Humanise",arpMode:"Pattern",arpRate:"Pattern",arpRange:"Pattern",arpGate:"Pattern",minVelocity:"Genre",maxVelocity:"Genre"}}
                style="--human-bg: transparent; --human-surface: var(--cv-surface, #F6EADB); --human-surface-2: var(--cv-surface-2, #F1E4CC); --human-border: rgba(46,39,31,0.12); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: rgba(46,39,31,0.45); --human-accent: #9E5D53; --human-accent-hover: #804A41; width: 100%; min-width: 0; box-shadow: none;"
                @parameter-override=${this.onParameterOverride}
                @parameter-relink=${this.onParameterRelink}
                @human-change=${this.onHumanChange}
              ></human-panel>
            </div>
          `:""}
        </div>
      </div>
    `}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:o,voiceLinks:s,setNote:n}=t;return g`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${i}</div>
        </div>

        ${o.length?g`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${o.map(r=>g`
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
        ${s.map(r=>g`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${r.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${r.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${r.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${r.link}</div>
          </div>
        `)}

        ${n?g`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${n}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),o=this.getChordExtensionLabel(e?.name),s=z(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=e?ws(e.name,s):[];return g`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(r=>g`
          <div class="note-pill">${r.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&n.length?g`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${n.map(r=>g`
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
        ${Na.map(r=>{const a=r.label===i;return g`
            <button
              class="chord-mod-chip quality-chip ${a?"selected active":""}"
              @click=${()=>this.changeChordQuality(r.label)}
              aria-pressed="${a}"
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
        ${Aa.map(r=>{const a=r.label===o;return g`
            <button
              class="chord-mod-chip extension-chip ${a?"selected active":""}"
              @click=${()=>this.changeChordExtension(r.label)}
              aria-pressed="${a}"
              aria-label="Change extension to ${r.label}"
            >
              <div class="chip-title">${r.label}</div>
              <div class="chip-desc">${r.sub}</div>
            </button>
          `})}
      </div>
    `}renderPianoCard(t,e){const i=ne(t.name),o=Jo[i.root]??0,s=ni[i.quality]||ni[fo[i.quality]||"maj"]||[0,4,7],n=22,r=86,a=52,l=[0,2,4,5,7,9,11],c=[],d=[],p=[];for(let m=0;m<2;m++)l.forEach((f,b)=>{c.push({x:(m*7+b)*n,w:n-1.5,h:r})});for(let m=0;m<2;m++)[0,1,3,4,5].forEach(f=>{const b=m*7+f;d.push({x:b*n+n*.64,w:n*.58,h:a})});s.forEach(m=>{const f=o+m,b=Math.floor(f/12),v=f%12,y=l.indexOf(v),C=m===0,S=y<0,I=C?"#F2735F":S?"#FBF3E6":"#2E271F",A=C?"#FBF3E6":S?"#2E271F":"#FBF3E6",F=this.showDegrees?si[m%12]:"";if(y>=0){const $=b*7+y;p.push({cx:$*n+(n-1.5)/2,cy:r-19,r:9,fill:I,isRoot:C,label:F,lc:A})}else{const N=(b*7+l.indexOf(v-1))*n+n*.64,D=n*.58;p.push({cx:N+D/2,cy:a-14,r:7.5,fill:I,isRoot:C,label:F,lc:A})}});const u=14*n,h=s.map(m=>{const f=Ho[(o+m)%12];return this.showDegrees?`${f} (${si[m%12]})`:f}).join(" · ");return g`
      <div
        class="play-card"
        @pointerdown=${m=>this.handlePadPointerDown(m,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?g`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${u}" height="${r}" viewBox="0 0 ${u} ${r}" style="display: block; width: 100%; max-width: ${u}px; height: auto;">
          ${c.map(m=>Y`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${d.map(m=>Y`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${p.map(m=>Y`
            <g>
              <circle cx="${m.cx}" cy="${m.cy}" r="${m.r}" fill="${m.fill}" stroke="${m.isRoot?"#2E271F":"none"}" stroke-width="${m.isRoot?1.6:0}"></circle>
              ${m.label?Y`
                <text x="${m.cx}" y="${m.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${m.lc}" font-family="'Plus Jakarta Sans',sans-serif">${m.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${h}</div>
      </div>
    `}renderFretCard(t,e,i){const o=ne(t.name),s=Jo[o.root]??0,n=ni[o.quality]||ni[fo[o.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],a=[7,0,4,9],l=i==="Ukulele",c=l?a:r,d=l?Ba({root:o.root,rootPc:s,q:o.quality,intervals:n})||[null,null,null,null]:Da({root:o.root,rootPc:s,q:o.quality})||[null,null,null,null,null,null],p=18,u=24,h=4,m=16,f=c.length,b=d.filter(O=>O!==null&&O>0),v=b.length&&Math.max(...b)>4?Math.min(...b)-1:0,y=[],C=[],S=[],I=[],A=[];for(let O=0;O<f;O++)y.push({x:O*p});for(let O=0;O<=h;O++)C.push({y:m+O*u,sw:O===0&&v===0?3:1.2});d.forEach((O,E)=>{const H=E*p;if(O===null){A.push({x:H});return}if(O===0){I.push({x:H});return}const Q=((c[E]+O-s)%12+12)%12;S.push({cx:H,cy:m+(O-v-.5)*u,fill:Q===0?"#F2735F":"#2E271F",label:this.showDegrees?si[((c[E]+O-s)%12+12)%12]:""})});const F=(f-1)*p,$=(f-1)*p+26,N=m+h*u+12,D=v>0?`${v+1}fr`:"",U=v>0,_=n.map(O=>{const E=Ho[(s+O)%12];return this.showDegrees?`${E} (${si[O%12]})`:E}).join(" · ");return g`
      <div
        class="play-card"
        @pointerdown=${O=>this.handlePadPointerDown(O,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?g`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${U?g`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${D}</div>
          `:""}
        </div>
        <svg width="${$}" height="${N}" viewBox="-13 -2 ${$} ${N}" style="display: block; width: 100%; max-width: ${$*1.5}px; height: auto;">
          ${C.map(O=>Y`
            <rect x="0" y="${O.y}" width="${F}" height="${O.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${y.map(O=>Y`
            <rect x="${O.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${I.map(O=>Y`
            <circle cx="${O.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${A.map(O=>Y`
            <text x="${O.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${S.map(O=>Y`
            <g>
              <circle cx="${O.cx}" cy="${O.cy}" r="${O.fill==="#F2735F"?7.5:7}" fill="${O.fill}"></circle>
              ${O.label?Y`
                <text x="${O.cx}" y="${O.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${O.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${_}</div>
      </div>
    `}renderChordPad(t,e,i,o){const s=ie(t.tension||.1),n=this.activeIndex===e&&this.playing,r=this.padFlash===e||this.padHeld===e,a=this.swapIndex===e,l=this.selectedBand?$e(this.selectedBand):null,c=this.progression?.key||"C",d=this.progression?.scaleType||"MAJOR",p=l?Fs(t,l.name,c,d):null,u=!!this.bandSwaps[e],h=this.getChordLadder(t),m=this.getLadderHome(t),f=this.lastPad?.idx===e,b=f&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:m,v=f&&b>=0&&b!==m&&h[b],y=v?b:m,C=f?v?"→ "+h[b]:Ma[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"",S=h.map($=>String($).replace(/^[A-G][#b]?/,"")),I=S[0];let A=S.slice();I&&S.every(($,N)=>N===0||$.indexOf(I)===0)?A=S.map(($,N)=>N?$.slice(I.length):$):I&&S.every(($,N)=>N===0||$.slice(-I.length)===I)&&(A=S.map(($,N)=>N?$.slice(0,$.length-I.length):$)),A=A.map($=>($===""?"maj":$).replace(/maj/gi,"△"));const F=h.map(($,N)=>({label:A[N],wrapStyle:"flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;",labelStyle:`font-size: 8.5px; font-weight: 800; letter-spacing: 0.2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: clip; color: ${N===y?v?i:"rgba(46,39,31,0.78)":"rgba(46,39,31,0.3)"}; transition: color 180ms cubic-bezier(0.23,1,0.32,1);`,barStyle:`width: 100%; height: 4px; border-radius: 3px; background: ${N===y?v?i:"rgba(46,39,31,0.5)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;`}));return g`
      <div
        class="pad-cell ${o?"chord-item-wrap":""} ${r?"pad-held":""} ${a?"selected":""} ${n?"pad-lit":""}"
        style="
          background: ${s.color};
          border-radius: ${a&&o?"20px 20px 5px 5px":"20px"};
          ${a?`box-shadow: inset 0 0 0 2.5px ${i}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${Qe[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${$=>this.handlePadPointerDown($,e)}
        @pointermove=${$=>this.handlePadPointerMove($,e)}
        @pointerup=${$=>this.handlePadPointerUp($)}
        @pointercancel=${$=>this.handlePadPointerUp($)}
        @pointerleave=${$=>this.handlePadPointerUp($)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${h.slice(1).map(($,N)=>g`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(N+1)/h.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${$=>{$.stopPropagation(),this.openSwap(e)}}
          @pointerdown=${$=>$.stopPropagation()}
          aria-label="Swap ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${$=>{$.stopPropagation(),this.openDetail(e)}}
          @pointerdown=${$=>$.stopPropagation()}
          aria-label="View voicing for ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(Zi[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?g`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${Ea[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${f&&v&&h[b]?h[b]:t.name}</div>
          ${this.showTheory&&t.notes&&t.notes.length?g`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${t.notes.join(" · ")}
            </div>
          `:""}
          ${C?g`<div class="pad-meta-voicing">${C}</div>`:""}
          <div class="pad-rung-row" style="display: flex; gap: 4px; margin-top: 7px;">
            ${F.map($=>g`
              <div class="pad-rung-col" style="${$.wrapStyle}">
                <div class="pad-rung-label" style="${$.labelStyle}">${$.label}</div>
                <div class="pad-rung-bar" style="${$.barStyle}"></div>
              </div>
            `)}
          </div>

          ${(p||u)&&l?g`
            <div style="margin-top: 8px;">
              <button
                class="pad-band-move-chip ${u?"applied":""}"
                style="
                  border: none;
                  font-family: inherit;
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  max-width: 100%;
                  min-height: 28px;
                  padding: 0 11px;
                  border-radius: 100px;
                  background: ${u?"#2E271F":l.color};
                  box-shadow: ${u?"none":"0 0 0 1.5px rgba(251,243,230,0.9)"};
                  color: ${u?"#F4EBDB":"#2E271F"};
                  font-size: 10.5px;
                  font-weight: 800;
                  letter-spacing: 0.2px;
                  white-space: nowrap;
                  overflow: hidden;
                  cursor: pointer;
                  z-index: 3;
                  transition: transform 120ms ease, background 120ms ease;
                "
                @pointerdown=${$=>$.stopPropagation()}
                @click=${$=>{$.stopPropagation(),u?this.revertBandMove(e):p&&this.applyBandMove(e,p,l)}}
                aria-label="${u?`Undo ${this.bandSwaps[e]?.move.name} — put ${this.bandSwaps[e]?.originalChord.name} back`:`${p?.name} — change ${t.name} to ${p?.chord}`}"
              >
                ${this.showTheory&&!u&&p?.roman?g`
                  <span style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.5px; opacity: 0.7;">${p.roman}</span>
                `:""}
                <span>${u?"Revert":p?.name}</span>
              </button>
            </div>
          `:""}
        </div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(r=>!e||(r.name+" "+r.genre+" "+r.mood).toLowerCase().includes(e)),o=i.map(r=>r.id),s=o.length>0&&o.every(r=>this.librarySelected.includes(r)),n=o.some(r=>this.librarySelected.includes(r));return g`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          ${this.librarySelectMode&&this.librarySelected.length>0?`${this.librarySelected.length} of ${this.savedSets.length} selected`:`Your loops (${this.savedSets.length})`}
        </div>
        <div class="library-select-toolbar" style="display: flex; align-items: center; gap: 8px;">
          ${this.librarySelectMode&&i.length>0?g`
            <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">
              <input
                type="checkbox"
                class="library-select-all-checkbox"
                style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px;"
                .checked=${s}
                .indeterminate=${n&&!s}
                @change=${this.toggleSelectAllVisible}
                aria-label="Select all loops"
              />
              <button
                type="button"
                class="library-select-all-btn"
                style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer; padding: 0;"
                @click=${r=>{r.stopPropagation(),this.toggleSelectAllVisible()}}
              >
                ${s?"Deselect all":"Select all"}
              </button>
            </label>
          `:""}
          ${this.librarySelectMode&&this.librarySelected.length>0?g`
            <button
              class="library-delete-btn"
              style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: #C0392B; cursor: pointer; padding: 0;"
              @click=${this.deleteSelectedLoops}
              title="Delete selected loops"
            >
              Delete (${this.librarySelected.length})
            </button>
          `:""}
          <button
            class="library-select-btn"
            style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: ${this.librarySelectMode?"var(--cv-ink, #2E271F)":"var(--cv-ink-muted)"}; cursor: pointer; padding: 0;"
            @click=${this.toggleLibrarySelectMode}
            aria-label="${this.librarySelectMode?"Finish selecting loops":"Select loops"}"
          >
            ${this.librarySelectMode?"Done":"Select"}
          </button>
        </div>
      </div>

      <div style="padding: 0 4px 9px;">
        <input
          type="text"
          class="cv-vibe-input"
          style="width: 100%; border: none; background: var(--cv-surface); border-radius: 12px; padding: 9px 12px; font-size: 12.5px; outline: none; box-sizing: border-box;"
          .value=${this.librarySearch}
          @input=${r=>{this.librarySearch=r.target.value}}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${i.map(r=>{const a=this.librarySelected.includes(r.id),l=this.renamingId===r.id,c=this.confirmDeleteId===r.id;return g`
            <div
              class="library-loop-item ${this.librarySelectMode?"select-mode":""} ${a?"selected":""}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${a?"var(--cv-surface-2, #F1E4CC)":"var(--cv-surface)"}; transition: background 120ms ease;"
              @click=${()=>{this.librarySelectMode?this.toggleSelectLoop(r.id):!l&&!c&&(this.dispatchEvent(new CustomEvent("load-project",{detail:r,bubbles:!0,composed:!0})),this.setLibraryOpen(!1))}}
            >
              ${this.librarySelectMode?g`
                <input
                  type="checkbox"
                  class="loop-item-checkbox"
                  .checked=${a}
                  @click=${d=>d.stopPropagation()}
                  @change=${()=>this.toggleSelectLoop(r.id)}
                  style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px; flex-shrink: 0;"
                  aria-label="Select ${r.name}"
                />
              `:""}
              <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
                ${(r.chords||[]).map(d=>{const p=typeof d=="object"&&d!==null?d.tension??0:.2,u=ie(p);return g`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(u.radius*.25)}px;background:${u.color};flex-shrink:0;"></span>`})}
              </div>
              <div style="flex: 1; min-width: 0;">
                ${l?g`
                  <input
                    type="text"
                    class="cv-vibe-input library-rename-input"
                    .value=${this.draftName}
                    @input=${d=>{this.draftName=d.target.value}}
                    @keydown=${d=>{d.key==="Enter"&&this.commitRename(r),d.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(r)}
                    @click=${d=>d.stopPropagation()}
                    style="width: 100%; box-sizing: border-box; border: none; background: var(--cv-cream, #FBF3E6); box-shadow: inset 0 0 0 1.5px rgba(46,39,31,0.16); border-radius: 9px; outline: none; font-family: inherit; font-size: 13px; font-weight: 800; color: var(--cv-ink); padding: 5px 8px;"
                  />
                `:g`
                  <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.name}</div>
                  <div style="font-size: 11px; color: var(--cv-ink-muted);">${r.genre} · ${r.mood}</div>
                `}
              </div>

              ${this.librarySelectMode?"":g`
                ${c?g`
                  <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;" @click=${d=>d.stopPropagation()}>
                    <button
                      type="button"
                      class="library-confirm-delete-btn"
                      @click=${()=>this.confirmDelete(r.id)}
                      style="border: none; font-family: inherit; background: #D8624C; color: #FBF3E6; font-size: 11.5px; font-weight: 800; padding: 5px 10px; border-radius: 100px; cursor: pointer; flex-shrink: 0;"
                    >Delete</button>
                    <button
                      type="button"
                      class="library-cancel-delete-btn"
                      @click=${this.cancelDelete}
                      aria-label="Cancel delete"
                      style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted); font-size: 14px; font-weight: 800; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;"
                    >×</button>
                  </div>
                `:l?"":g`
                  <div class="library-item-actions" style="display: flex; gap: 2px; flex-shrink: 0;" @click=${d=>d.stopPropagation()}>
                    <button
                      type="button"
                      class="library-action-btn library-rename-btn"
                      @click=${()=>this.startRename(r.id,r.name)}
                      aria-label="Rename ${r.name}"
                      title="Rename"
                      style="border: none; font-family: inherit; background: transparent; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5B5145;"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="library-action-btn library-delete-item-btn"
                      @click=${()=>this.askDelete(r.id)}
                      aria-label="Delete ${r.name}"
                      title="Delete"
                      style="border: none; font-family: inherit; background: transparent; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5B5145;"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>
                      </svg>
                    </button>
                  </div>
                `}
              `}
            </div>
          `})}
        ${i.length?"":g`
          <div class="library-empty" style="padding: 16px 12px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted); text-align: center;">
            ${this.savedSets.length?"No loops match that.":"Nothing saved yet — tap the bookmark to keep a loop."}
          </div>
        `}
      </div>
    `}renderSaveModal(){return this.showSaveModal?g`
      <div class="save-modal-backdrop" @click=${this.cancelSaveModal}>
        <div class="save-modal-card" @click=${t=>t.stopPropagation()}>
          <div style="font-weight: 800; font-size: 16px; color: #2E271F; margin-bottom: 4px;">Name this set</div>
          <div style="font-size: 12.5px; color: var(--cv-ink-muted); margin-bottom: 14px;">Give it a name so you can find it later.</div>
          <input
            type="text"
            class="cv-vibe-input save-modal-input"
            .value=${this.pendingSaveName}
            @input=${t=>{this.pendingSaveName=t.target.value}}
            @keydown=${this.onSaveNameKeydown}
            placeholder="e.g. 2am drive"
            style="width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 10px; border: 2px solid rgba(46,39,31,0.15); font-size: 14px; font-family: inherit; background: #fff; color: #2E271F; outline: none;"
          />
          <div style="display: flex; gap: 10px; margin-top: 16px;">
            <button
              type="button"
              class="save-modal-cancel-btn"
              @click=${this.cancelSaveModal}
              style="flex: 1; border: none; background: transparent; text-align: center; padding: 11px; border-radius: 100px; font-weight: 700; font-size: 13.5px; color: var(--cv-ink-muted); cursor: pointer;"
            >Cancel</button>
            <button
              type="button"
              class="save-modal-confirm-btn"
              @click=${this.confirmSaveModal}
              style="flex: 1; border: none; text-align: center; padding: 11px; border-radius: 100px; font-weight: 700; font-size: 13.5px; background: #2E271F; color: #F4EBDB; cursor: pointer;"
            >Save</button>
          </div>
        </div>
      </div>
    `:""}renderLibrarySheetMobile(t){return this.libraryOpen?g`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div
          style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);"
          @click=${()=>this.setLibraryOpen(!1)}
        ></div>
        <div
          class="library-popover library-sheet-mobile"
          style="position: absolute; left: 0; right: 0; bottom: 0; max-height: 80vh; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; z-index: 81; background: var(--cv-cream, #FBF3E6); border-radius: 26px 26px 0 0; padding: 14px 18px max(24px, calc(14px + env(safe-area-inset-bottom, 0px))); box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); box-sizing: border-box;"
        >
          <div style="position: relative; display: flex; align-items: center; justify-content: center; min-height: 34px; margin-bottom: 8px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18);"></div>
            <button
              class="library-sheet-done"
              @click=${()=>this.setLibraryOpen(!1)}
              style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); border: none; font-family: inherit; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
              aria-label="Close your loops"
            >Done</button>
          </div>
          ${this.renderLibraryPopoverContent(t)}
        </div>
      </div>
    `:""}render(){const t=this.progression?.chords||[],e=At(this.progression?.mood||"Warm"),i=Qi.find(h=>h.name===this.selectedBand),o=this.getTheoryData(t),s=t.map(h=>h.tension||.1),n=Math.max(...s,.1),r=Math.min(...s,0),a=s.indexOf(n),l=s.every((h,m)=>m===0||h>=s[m-1]),c=n-r<.28?"Stays close to home":l?"A steady climb":s[s.length-1]<.25&&a<s.length-1?"Away, then home":"Drifts, then settles",d=`Opens ${Qe[t[0]?.functionLabel]||"home"} and ${n-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":l?`tightens chord by chord, peaking on ${t[a]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[a]?.name||"the middle"} before easing back down home.`}`;let p=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression){if(this.activeSwapFamily==="Borrowed"&&this.chordData?.scales)p=fi(this.chordData,this.progression,this.swapIndex);else if(this.chordData?.scales){const h=ho(this.chordData,this.progression,this.swapIndex);p=(h.find(f=>f.name===this.activeSwapFamily)||h[0])?.rows||[],oi[this.activeSwapFamily]&&oi[this.activeSwapFamily][this.showTheory?1:0]}if(i){const h=mo(this.progression.key||"C",this.progression.scaleType||"MAJOR",i.name),m=new Map(h.map(v=>[v.chordName,v]));p=p.map(v=>{const y=m.get(v.name);return y?{...v,sub:this.showTheory?y.theory:y.plain,bandTag:`${i.name} move`,bandColor:i.color}:v});const f=p.filter(v=>v.bandTag),b=p.filter(v=>!v.bandTag);p=[...f,...b]}}const u=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?g`
        ${this.renderTopBandBar()}
        <div class="mobile-stage-wrap" style="--mood-color: ${e};">
          <!-- Top Vibe Dropdown Button -->
          <div style="padding: 12px 18px 0;">
            <button
              class="mobile-vibe-toggle ${this.vibeOpen?"open":""}"
              @click=${this.toggleVibe}
              aria-label="Vibe, genre and mood"
              aria-expanded=${this.vibeOpen}
            >
              <div style="flex: 1; min-width: 0; text-align: left;">
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label, #8A6B3F); text-transform: uppercase;">
                  ${this.vibeOpen?"The Vibe":"The Vibe · tap to change"}
                </div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink, #2E271F); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${this.getVibeSummary()}
                </div>
              </div>
              <span class="vibe-toggle-chevron">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </button>

            ${this.vibeOpen?g`
              <div class="mobile-vibe-drawer">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${h=>{this.freeText=h.target.value}}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${Go.map(h=>g`
                    <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Ye.map(h=>{const m=h.name,f=h.dot,b=this.progression?.mood===m;return g`
                      <button
                        class="pill mood-pill ${b?"active":""}"
                        style="${b?`background: ${f}; color: #2E271F;`:""}"
                        @click=${()=>this.onMoodClick(m)}
                      >
                        <span class="mood-badge" style="background: ${b?"rgba(46, 39, 31, 0.12)":f+"33"};">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${b?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                        </span>
                        ${m}
                      </button>
                    `})}
                </div>

                <div class="popover-kicker spaced" style="display: flex; align-items: baseline; gap: 7px;">
                  <span>Band</span>
                  <span style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38); text-transform: lowercase;">optional</span>
                </div>
                <div class="pills-group">
                  ${Qi.map(h=>{const m=Kt[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return g`
                      <button
                        class="pill ${f?"active":""}"
                        style="font-family: ${m.font}; font-weight: ${m.weight||400}; font-style: ${m.italic?"italic":"normal"}; font-size: ${m.pillFs}px; letter-spacing: ${m.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
                        @click=${()=>this.onBandClick(h.name)}
                      >
                        ${h.name}
                      </button>
                    `})}
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
            ${this.activeView==="loop"?g`
              <div class="stage-card" style="padding: 18px 14px;">
                ${this.renderBandDnaBar(e)}

                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${t.map((h,m)=>{if(this.swapIndex===m){const f=ie(h.tension||.1),b=this.activeIndex===m&&this.playing;return g`
                        <div
                          class="pad-cell pad-cell-cycler ${b?"pad-lit":""}"
                          style="
                            background: ${f.color};
                            border-radius: 20px;
                            padding: 12px;
                            min-height: 220px;
                            box-shadow: inset 0 0 0 2.5px ${e}, 0 14px 26px -18px rgba(46,39,31,0.45);
                          "
                        >
                          <chord-pad-cycler
                            .originalChord=${h}
                            .barIndex=${m}
                            .feelings=${this.getSwapFeelings(m)}
                            .feelIndex=${this.mobileFeelIndex}
                            .chordIndex=${this.mobileChordIndex}
                            @cycler-audition=${v=>this.handleSwapAudition(v.detail)}
                            @cycler-keep=${v=>this.handleCyclerKeep(v.detail)}
                            @cycler-revert=${()=>this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `}return this.renderChordPad(h,m,e,!1)})}
                </div>

                ${this.showTheory?this.renderScaleChords(o.scaleName,o.scaleHint,o.scaleDegrees,!0):""}
              </div>

              <!-- Unified Mobile Quick Chips Row -->
              <div class="mobile-chips-row">
                <button
                  class="mobile-chip instrument-chip ${this.expandedInstrument?"open":""}"
                  @click=${this.toggleInstrumentExpand}
                  aria-label="Change instrument"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  <span>${Ve(this.instrument)}</span>
                </button>
                <div class="mobile-chip-divider"></div>
                <button
                  class="mobile-chip key-chip ${this.tempoOpen?"open":""}"
                  @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1)}}
                  aria-label="Key, tempo and loop length"
                >
                  ${this.progression?.key||"C"} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm||84}
                </button>
                <button
                  class="mobile-chip feel-chip ${this.feelOpen?"open":""}"
                  @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1)}}
                  aria-label="Feel"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  <span>${this.feelChipLabel}</span>
                </button>
                <button
                  class="mobile-chip mobile-share-btn"
                  @click=${()=>{this.shareOpen=!0}}
                  aria-label="Share this loop"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>
                  <span>Share</span>
                </button>
              </div>

              ${this.expandedInstrument?g`
                <div class="mobile-instrument-drawer" style="animation: cvfv-panel 200ms var(--cv-ease, ease); background: var(--cv-cream, #FBF3E6); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label, #8A6B3F);">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                    ${Pe.map(h=>g`
                      <button
                        class="pill ${Ve(this.instrument)===h.name?"active":""}"
                        @click=${()=>{this.instrument=h.name,w.setInstrument(h.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                      >
                        <span style="background:${h.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${h.name}
                      </button>
                    `)}
                  </div>
                </div>
              `:""}

              <div class="mobile-theory-toggle" @click=${this.onTheoryToggle}>
                <div class="toggle-track ${this.showTheory?"active":""}">
                  <div class="toggle-knob ${this.showTheory?"active":""}"></div>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory</div>
              </div>

              ${this.showTheory?g`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${c}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(h=>{const m=Math.round(28+(h.tension||.1)*85),f=ie(h.tension||.1);return g`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${m}px; border-radius: 100px; background: ${f.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${h.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${Qe[h.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${d}</div>
                  ${this.renderTheoryStrip(o)}
                </div>
              `:""}
            `:this.activeView==="song"?this.renderSongSectionList(e):g`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(h=>g`
                      <button
                        class="pill ${this.playInstrument===h?"active":""}"
                        style="background: ${this.playInstrument===h?e:"var(--cv-cream)"}; color: ${this.playInstrument===h?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=h}}
                      >${h}</button>
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

                ${this.playInstrument==="Piano"?g`
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${t.map((h,m)=>this.renderPianoCard(h,m))}
                  </div>
                `:g`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((h,m)=>this.renderFretCard(h,m,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>



          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen?g`
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
        </div>

        <!-- Mobile Bottom Transport Bar -->
        <div class="mobile-bottom-transport-bar">
          <button
            class="loop-play-btn"
            @click=${this.activeView==="song"?()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0})):this.togglePlay}
            style="background: ${this.playing?"#2E271F":e}; color: ${this.playing?"#FBF3E6":"#2E271F"}; flex-shrink: 0; min-height: 44px; padding: 9px 16px; border-radius: 100px; font-weight: 800; font-size: 12.5px; border: none; cursor: pointer; white-space: nowrap;"
            aria-label="${this.playing?"Stop":this.activeView==="song"?`Play song · ${this.sections.length} sections`:"Play loop"}"
          >
            ${this.playing?"Stop":this.activeView==="song"?`Play song · ${this.sections.length} sections`:"Play loop"}
          </button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}>
              <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
            </button>
            <button
              aria-label="${this.isSaved?"Saved loop":"Keep this loop"}"
              class="mobile-circle-btn save-toggle-btn ${this.isSaved?"saved":""}"
              @click=${this.toggleSaved}
              style="${this.isSaved?`background: ${e};`:""}"
            >
              ${this.isSaved?g`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#2E271F"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
              `:g`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
              `}
            </button>
            <button
              aria-label="Your loops"
              aria-expanded=${this.libraryOpen?"true":"false"}
              class="mobile-circle-btn library-toggle ${this.libraryOpen?"active":""}"
              @click=${this.toggleLibrary}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
            </button>
            <button aria-label="Share this loop" class="mobile-circle-btn" @click=${()=>this.shareOpen=!0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
            </button>
          </div>
        </div>

          ${this.renderSaveModal()}
          ${this.renderTempoSheetMobile()}
          ${this.renderFeelSheetMobile()}
          ${this.renderLibrarySheetMobile(e)}
          <share-modal
            .open=${this.shareOpen}
            .progression=${this.progression}
            .order=${this.order}
            .instrument=${this.instrument}
            .playStyle=${this.playStyle}
            .barsPerChord=${this.barsPerChord}
            .feelSettings=${{swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}}
            @close=${()=>{this.shareOpen=!1}}
            @toast=${h=>{this.dispatchEvent(new CustomEvent("toast",{detail:h.detail,bubbles:!0,composed:!0}))}}
          ></share-modal>
      `:g`
      ${this.renderTopBandBar()}
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
        </nav>

        <!-- Floating Vibe Popover (Desktop) -->
        ${this.vibeOpen?g`
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
                @input=${h=>{this.freeText=h.target.value}}
                placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
              />
              <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${Go.map(h=>g`
                <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Ye.map(h=>{const m=h.name,f=h.dot,b=this.progression?.mood===m;return g`
                  <button class="pill mood-pill ${b?"active":""}" style="${b?`background: ${f}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(m)}>
                    <span class="mood-badge" style="background: ${b?"rgba(46, 39, 31, 0.12)":f+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${b?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                    </span>
                    ${m}
                  </button>
                `})}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${Qi.map(h=>{const m=Kt[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return g`
                  <button
                    class="pill ${f?"active":""}"
                    style="font-family: ${m.font}; font-weight: ${m.weight||400}; font-style: ${m.italic?"italic":"normal"}; font-size: ${m.pillFs}px; letter-spacing: ${m.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
                    @click=${()=>this.onBandClick(h.name)}
                  >
                    ${h.name}
                  </button>
                `})}
            </div>
          </div>
        `:""}

        <!-- 2. Center Stage (<main>) -->
        <main class="stage-main">
          <!-- Row 1: View Tabs & Theory Toggle -->
          <div class="stage-top-bar" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="view-tabs-bar">
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>{this.activeView="loop"}}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>{this.activeView="song"}}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>{this.activeView="play"}}>Play it</button>
            </div>
            <button class="theory-toggle-btn" @click=${this.onTheoryToggle} aria-label="Show the music theory">
              <span style="font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">Theory</span>
              <span class="toggle-track ${this.showTheory?"active":""}">
                <span class="toggle-knob"></span>
              </span>
            </button>
          </div>

          <!-- Row 2: Scrollable Stage Canvas -->
          <div class="stage-scroll-canvas">
            ${this.activeView==="loop"?g`
              <div class="stage-card stage-panel">
                ${this.renderBandDnaBar(e)}

                <!-- Top Loop Play Button -->
                <div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
                  <button
                    class="loop-play-btn"
                    @click=${this.togglePlay}
                    style="background: ${this.playing?"#2E271F":e}; color: ${this.playing?"#FBF3E6":"#2E271F"}; min-height: 40px; padding: 0 20px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; transition: transform 120ms ease;"
                    aria-label="${this.playing?"Stop loop":"Play loop"}"
                  >
                    ${this.playing?"Stop":"Play loop"}
                  </button>
                  <div style="display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700; color: var(--cv-ink-muted); min-width: 0;">
                    <span style="display: inline-flex; align-items: flex-start; justify-content: center; width: 44px; height: 18px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;" aria-hidden="true">
                      <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12);">
                        <span style="display: block; width: 20px; height: 1.25px; background: rgba(46,39,31,0.34); border-radius: 1px;"></span>
                      </span>
                    </span>
                    Space plays the loop
                  </div>
                </div>

                <!-- Pad Cells Grid -->
                <div class="pad-cells-grid pad-cells-row cv-padgrid" data-padgrid="1" data-wide="1">
                  ${t.map((h,m)=>{const b=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/4)+1)*4-1);return g`
                      ${this.renderChordPad(h,m,e,!0)}
                      ${this.swapIndex!==null&&m===b?g`
                        <chord-swap-lane
                          .swapIndex=${this.swapIndex}
                          .chord=${t[this.swapIndex]}
                          .feelings=${this.getSwapFeelings(this.swapIndex)}
                          .activeFeel=${this.activeSwapFamily}
                          .pickedChord=${this.abPick}
                          .padCols=${Math.min(t.length,4)}
                          .moodColor=${e}
                          .band=${i?{name:i.name,color:i.color,plain:this.showTheory?i.theory:i.plain}:null}
                          @swap-feel-change=${v=>{this.activeSwapFamily=v.detail.feel,this.requestUpdate()}}
                          @swap-audition=${v=>this.handleSwapAudition(v.detail)}
                          @swap-confirm=${this.confirmSwap}
                          @swap-close=${this.clearSelection}
                        ></chord-swap-lane>
                      `:""}
                    `})}
                </div>

                ${this.showTheory?this.renderScaleChords(o.scaleName,o.scaleHint,o.scaleDegrees,!1):""}

                <!-- Quick Controls Below Pad Cards -->
                <div class="stage-quick-controls" style="display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px; row-gap: 10px; margin-top: 16px;">
                  <button
                    class="instrument-chip ${this.expandedInstrument?"open":""}"
                    @click=${this.toggleInstrumentExpand}
                    aria-label="Change instrument"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.expandedInstrument?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.expandedInstrument?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                    ${Ve(this.instrument)}
                  </button>
                  <div style="width: 1px; align-self: stretch; min-height: 28px; background: rgba(46,39,31,0.12); margin: 0 4px;"></div>
                  <button
                    class="tempo-chip ${this.tempoOpen?"open":""}"
                    @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1,this.expandedInstrument=!1)}}
                    aria-label="Key, tempo and loop length"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.tempoOpen?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.tempoOpen?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    ${this.progression?.key||"C"} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm||84}
                  </button>
                  <button
                    class="feel-chip ${this.feelOpen?"open":""}"
                    @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1,this.expandedInstrument=!1)}}
                    aria-label="Feel"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.feelOpen?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.feelOpen?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                    ${this.feelChipLabel}
                  </button>
                  <button
                    class="share-btn"
                    @click=${()=>{this.shareOpen=!0}}
                    aria-label="Share this loop"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>
                    Share
                  </button>
                </div>

                ${this.renderTempoDrawerDesktop()}
                ${this.renderFeelDrawerDesktop()}

                <!-- Instrument tray if expanded -->
                ${this.expandedInstrument?g`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Instrument</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${Pe.map(h=>g`
                        <button
                          class="pill ${Ve(this.instrument)===h.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument||"Piano")===h.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.instrument||"Piano")===h.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.instrument=h.name,w.setInstrument(h.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                        >
                          <span style="background:${h.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${h.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}
              </div>
            `:this.activeView==="song"?this.renderSongSectionList(e):g`
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
                  ${t.map((h,m)=>this.renderPianoCard(h,m))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(h=>g`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===h?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===h?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=h}}
                      >${h}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((h,m)=>this.renderFretCard(h,m,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
              <div class="length-presets">
                <button
                  class="preset-btn ${t.length===4?"active":""}"
                  @click=${()=>this.onSetLength(4)}
                  aria-label="4 chords preset"
                  aria-pressed="${t.length===4}"
                >4</button>
                <button
                  class="preset-btn ${t.length===8?"active":""}"
                  @click=${()=>this.onSetLength(8)}
                  aria-label="8 chords preset"
                  aria-pressed="${t.length===8}"
                >8</button>
              </div>
            </div>
            <button class="try-another-btn dice-reroll-btn" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
              Try another
            </button>
          </div>
        </main>

        <!-- 3. Right Inspector (<aside>) -->
        <aside class="inspector-right sidebar-right">
          ${this.detailOpen?g`
            <!-- Chord Detail View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; gap: 13px;">
                <div class="chord-shape-badge" style="background: ${ie(t[this.detailIndex]?.tension||.1).color};"></div>
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
          `:this.swapIndex!==null?g`
            <!-- Chord Swap Harmonic Context View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Bar ${this.swapIndex+1} Harmonic Context</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${u?.name||""}</span>
                    ${this.showTheory&&u?.roman?g`<span class="swap-roman">${u.roman}</span>`:""}
                    <span class="swap-role">${Qe[u?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${i?this.renderBandInspectorCard(i):""}

              ${this.abPick?g`
                <div style="animation: cvfv-pop 200ms ease-out; background: var(--cv-cream); border-radius: 16px; padding: 16px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                    Auditioning · ${this.activeSwapFamily||"Substitution"}
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                    <div style="font-size: 22px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.02em; line-height: 1.1;">${this.abPick.chord||this.abPick.name}</div>
                    ${this.abPick.roman?g`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label);">${this.abPick.roman}</div>`:""}
                  </div>
                  <div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">
                    ${this.abPick.functionLabel||this.abPick.fn||"Harmonic substitution that alters the feel of the bar."}
                  </div>
                  ${this.abPick.notes&&this.abPick.notes.length?g`
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; color: var(--cv-ink); margin-top: 10px;">
                      Notes: ${this.abPick.notes.join(" · ")}
                    </div>
                  `:""}
                  <div style="font-size: 11.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(46,39,31,0.08);">
                    Hear how this chord changes the emotional arc of the progression.
                  </div>
                </div>
              `:g`
                <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); background: var(--cv-cream); border-radius: 14px; padding: 15px;">
                  Pick a feeling in the swap lane under the loop, then tap a candidate chord to audition it. What it does, its notes, and how it voices will show up here.
                </div>
              `}

              ${this.showTheory?this.renderTheoryStrip(o):""}
            </div>
          `:g`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div style="flex: 1; min-width: 0;">
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${c}</div>
                </div>
                <div style="position: relative; display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                  <button
                    class="save-pill-btn ${this.isSaved?"saved":""}"
                    @click=${this.toggleSaved}
                    aria-label="${this.isSaved?"Saved":"Save"}"
                    style="${this.isSaved?`background: ${e};`:""}"
                  >
                    ${this.isSaved?g`
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#2E271F"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                      Saved
                    `:g`
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                      Save
                    `}
                  </button>
                  <button
                    class="loops-pill-btn library-toggle ${this.libraryOpen?"active":""}"
                    @click=${this.toggleLibrary}
                    aria-label="Your loops"
                    aria-expanded=${this.libraryOpen?"true":"false"}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
                    ${this.savedSets.length?`Loops · ${this.savedSets.length}`:"Loops"}
                  </button>
                  ${this.libraryOpen?g`
                    <div class="loops-popover-desktop library-popover">
                      ${this.renderLibraryPopoverContent(e)}
                    </div>
                  `:""}
                </div>
              </div>
            </div>

            <div class="inspector-body">
              ${i?this.renderBandInspectorCard(i):""}
              <div class="arc-bars-row">
                ${t.map((h,m)=>{const f=ie(h.tension||.1),b=Math.round(18+(h.tension||.1)*62);return g`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(m)} aria-label="${h.name}, ${Qe[h.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${b}px; background: ${f.color};"></div>
                      </div>
                      <div class="arc-bar-name">${h.name}</div>
                      <div class="arc-bar-feel">${Qe[h.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${d}</div>
              ${this.showTheory&&o.setNote?g`
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
        <share-modal
          .open=${this.shareOpen}
          .progression=${this.progression}
          .order=${this.order}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .barsPerChord=${this.barsPerChord}
          .feelSettings=${{swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}}
          @close=${()=>{this.shareOpen=!1}}
          @toast=${h=>{this.dispatchEvent(new CustomEvent("toast",{detail:h.detail,bubbles:!0,composed:!0}))}}
        ></share-modal>
        ${this.renderSaveModal()}
      </div>
    `}};T.styles=ce`
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

    /* Studio Band DNA Strip */
    .band-dna-studio-strip {
      background: var(--cv-surface-2, rgba(46, 39, 31, 0.04));
      border: 1px solid rgba(46, 39, 31, 0.07);
      border-radius: 16px;
      padding: 10px 14px;
      margin-bottom: 14px;
      transition: all 180ms ease;
    }
    .band-dna-studio-strip .pill {
      font-size: 11.5px;
      padding: 5px 11px;
      border-radius: 100px;
      background: var(--cv-surface, #FAF4EB);
      border: 1px solid rgba(46, 39, 31, 0.12);
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: all 140ms ease;
    }
    .band-dna-studio-strip .pill:hover {
      border-color: rgba(46, 39, 31, 0.3);
      transform: translateY(-1px);
    }
    .band-dna-studio-strip .pill.active {
      font-weight: 800;
      transform: translateY(-1px);
    }
    .band-gen-btn:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }
    .band-gen-btn:active {
      transform: translateY(0);
    }
    .band-trick-chip:hover {
      border-color: rgba(46, 39, 31, 0.35) !important;
      background: #FFFFFF !important;
      transform: translateY(-1px);
    }
    .band-trick-chip:active {
      transform: translateY(0);
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
      right: 0;
      top: calc(100% + 8px);
      width: 322px;
      z-index: 45;
      transform-origin: right top;
      max-height: calc(100vh - 220px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 20px;
      padding: 12px 12px 14px;
      box-shadow: 0 28px 54px -22px rgba(46, 39, 31, 0.55);
      animation: cvfv-pop 180ms ease-out;
      box-sizing: border-box;
    }
    .library-action-btn:hover {
      background: var(--cv-cream);
      color: var(--cv-ink);
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
      min-height: 124px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell:hover {
      transform: translateY(-1px);
    }
    .pad-cell.pad-held {
      transform: scale(0.96);
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .pad-cell.selected {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2.5px rgba(46, 39, 31, 0.4);
    }
    .pad-voicing-grid {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image: linear-gradient(180deg, rgba(46, 39, 31, 0.2) 1px, transparent 1px);
      background-size: 100% 33.33%;
      opacity: 0;
      transition: opacity 1100ms ease;
    }
    .pad-voicing-grid.active {
      opacity: 1 !important;
      transition: opacity 90ms ease !important;
    }
    .pad-rung-dots {
      display: flex;
      gap: 3px;
      margin-top: 7px;
      align-items: center;
    }
    .pad-rung-dot {
      height: 4px;
      border-radius: 3px;
      transition: width 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 180ms ease;
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
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.88);
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
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.88);
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
      padding-right: 76px;
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
      font-family: var(--cv-font, 'Plus Jakarta Sans', -apple-system, sans-serif);
      font-size: clamp(20px, 2.1vw, 30px);
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
      margin-top: 2px;
    }
    @keyframes cvfv-panel {
      from { transform: translateY(-8px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .pad-meta-voicing {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 4px;
      min-height: 14px;
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
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 120ms ease, box-shadow 150ms ease;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .instrument-chip:hover, .play-style-chip:hover, .tempo-chip:hover, .feel-chip:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .instrument-chip.open, .play-style-chip.open, .tempo-chip.open, .feel-chip.open {
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
    }
    .instrument-chip:active, .play-style-chip:active, .tempo-chip:active, .feel-chip:active {
      transform: scale(0.97);
    }
    .quick-divider {
      width: 1px;
      align-self: stretch;
      min-height: 28px;
      background: rgba(46, 39, 31, 0.12);
      margin: 0 4px;
    }
    .song-section-view {
      padding: 12px 0 28px;
      max-width: 660px;
    }
    .song-section-lead {
      font-size: 13px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-bottom: 20px;
    }
    .song-section-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .song-section-row,
    .song-track-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 18px 22px;
      cursor: pointer;
      box-sizing: border-box;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 150ms ease;
    }
    .song-section-row:hover,
    .song-track-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px -8px rgba(46, 39, 31, 0.28);
    }
    .song-section-row.active,
    .song-track-card.active {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.22);
    }
    .song-section-index {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      flex-shrink: 0;
      min-width: 90px;
    }
    .song-section-info {
      flex: 1;
      min-width: 0;
    }
    .song-section-title {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
      line-height: 1.2;
    }
    .song-section-desc {
      font-size: 12.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 3px;
    }
    .song-section-chips,
    .song-card-chips {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-shrink: 0;
    }
    .song-section-chips .song-chord-chip,
    .song-chord-chip {
      width: 22px;
      height: 20px;
      border-radius: 7px;
      flex-shrink: 0;
      transition: transform 120ms ease;
    }
    .song-section-row:hover .song-chord-chip {
      transform: scale(1.06);
    }
    .song-section-delete-btn {
      background: transparent;
      border: none;
      color: var(--cv-ink-muted, #6B5F50);
      opacity: 0.45;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: opacity 120ms ease, color 120ms ease, background 120ms ease;
    }
    .song-section-delete-btn:hover {
      opacity: 1;
      color: #C0392B;
      background: rgba(192, 57, 43, 0.08);
    }
    .song-add-section-card,
    .add-section-card {
      width: 100%;
      border-radius: 18px;
      border: 1.5px dashed rgba(46, 39, 31, 0.28);
      background: transparent;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-label, #8A6B3F);
      font-weight: 700;
      font-size: 14.5px;
      cursor: pointer;
      box-sizing: border-box;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 150ms ease, border-color 150ms ease;
    }
    .song-add-section-card:hover,
    .add-section-card:hover {
      background: rgba(46, 39, 31, 0.03);
      border-color: rgba(46, 39, 31, 0.45);
      transform: translateY(-1px);
    }
    .song-add-section-card:active,
    .add-section-card:active {
      transform: scale(0.99);
    }
    .song-add-section-card.disabled {
      opacity: 0.6;
      cursor: default;
      border-style: solid;
      border-color: rgba(46, 39, 31, 0.14);
      transform: none;
    }
    .song-add-section-card .plus-glyph {
      font-size: 20px;
      font-weight: 700;
      line-height: 1;
    }
    .song-play-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    .song-transport-btn {
      border: none;
      min-height: 42px;
      padding: 0 22px;
      border-radius: 100px;
      font-weight: 800;
      font-size: 13.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }
    .song-transport-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px -6px rgba(46, 39, 31, 0.3);
    }
    .song-transport-status {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }
    @media (max-width: 540px) {
      .song-section-row,
      .song-track-card {
        padding: 14px 16px;
        gap: 12px;
      }
      .song-section-index {
        min-width: 74px;
        font-size: 10px;
      }
      .song-section-title {
        font-size: 15px;
      }
      .song-section-desc {
        font-size: 11.5px;
      }
      .song-section-chips .song-chord-chip,
      .song-chord-chip {
        width: 18px;
        height: 16px;
      }
    }
    .share-btn {
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
      transition: transform 120ms ease, background 150ms var(--cv-ease);
    }
    .share-btn:active {
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
      transition: background 150ms ease, transform 100ms ease;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .stepper-btn:active {
      transform: scale(0.94);
    }
    .stepper-count {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
    }
    .length-presets {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-left: 2px;
      padding-left: 6px;
      border-left: 1px solid rgba(46, 39, 31, 0.12);
    }
    .preset-btn {
      border: 1px solid rgba(46, 39, 31, 0.1);
      font-family: inherit;
      min-width: 24px;
      height: 24px;
      padding: 0 6px;
      border-radius: 999px;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, color 150ms ease, border-color 150ms ease, transform 100ms ease;
    }
    .preset-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .preset-btn:active {
      transform: scale(0.94);
    }
    .preset-btn.active {
      background: var(--cv-ink, #2E271F);
      color: #FAF4EB;
      border-color: var(--cv-ink, #2E271F);
      font-weight: 800;
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
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      background: var(--cv-cream, #FBF3E6);
    }
    .mobile-vibe-toggle {
      width: 100%;
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.08);
      border-radius: 16px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      transition: background 180ms ease, box-shadow 180ms ease;
      box-sizing: border-box;
    }
    .mobile-vibe-toggle:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .mobile-vibe-toggle.open {
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }
    .mobile-vibe-toggle .vibe-toggle-chevron {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      transform: rotate(0deg);
    }
    .mobile-vibe-toggle.open .vibe-toggle-chevron {
      transform: rotate(180deg);
    }
    .mobile-vibe-drawer {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 16px 15px 18px;
      margin-top: 8px;
      border: 1px solid rgba(46, 39, 31, 0.08);
      box-shadow: 0 12px 28px -12px rgba(46, 39, 31, 0.22);
      animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
    }
    .mobile-vibe-drawer .popover-input-row {
      background: var(--cv-cream, #FBF3E6);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      margin-top: 0;
      margin-bottom: 4px;
    }
    .mobile-vibe-drawer .pill {
      background: var(--cv-cream, #FBF3E6);
    }
    .mobile-vibe-drawer .pill:hover {
      background: #FFFFFF;
    }
    .mobile-vibe-drawer .pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .mobile-vibe-drawer .pill.mood-pill.active {
      color: #2E271F;
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
      padding: 16px 20px max(24px, calc(16px + env(safe-area-inset-bottom, 0px)));
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
      flex-shrink: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      padding: 11px 14px max(16px, calc(10px + env(safe-area-inset-bottom, 0px)));
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 50;
      box-sizing: border-box;
      width: 100%;
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
    .mobile-circle-btn.active {
      background: var(--cv-surface-2, #F1E4CC);
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .mobile-chips-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 8px;
      row-gap: 10px;
      margin-top: 16px;
    }
    .mobile-chip {
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
      transition: background 150ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 150ms ease, transform 150ms ease;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .mobile-chip:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .mobile-chip.open, .mobile-chip.active {
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
    }
    .mobile-chip-divider {
      width: 1px;
      align-self: stretch;
      min-height: 28px;
      background: rgba(46, 39, 31, 0.12);
      margin: 0 4px;
    }
    .mobile-chip.mobile-share-btn {
      margin-left: auto;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-weight: 800;
      padding: 0 18px;
    }
    .mobile-chip.mobile-share-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
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

    /* Save & Loops Header Pills */
    .save-pill-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      color: var(--cv-ink, #2E271F);
      background: var(--cv-surface, #F6EADB);
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 120ms ease;
    }
    .save-pill-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .save-pill-btn:active {
      transform: scale(0.96);
    }
    .save-pill-btn.saved {
      background: var(--mood-color, #9CC0EC);
    }

    .loops-pill-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      color: var(--cv-ink, #2E271F);
      background: var(--cv-surface, #F6EADB);
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 120ms ease;
    }
    .loops-pill-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .loops-pill-btn:active {
      transform: scale(0.96);
    }
    .loops-pill-btn.active {
      background: var(--cv-surface-2, #F1E4CC);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.18);
    }

    /* Save Modal */
    .save-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 120;
      padding: 24px;
      box-sizing: border-box;
      animation: cvfv-fade 180ms ease-out;
    }
    .save-modal-card {
      background: #FBF6EC;
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
      animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    @keyframes cvfv-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes cvfv-pop {
      from { transform: scale(0.97); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;M([x({type:Object})],T.prototype,"chordData",2);M([x({type:Object})],T.prototype,"progression",2);M([x({type:Number})],T.prototype,"activeIndex",2);M([x({type:Number})],T.prototype,"progressStep",2);M([x({type:Array})],T.prototype,"order",2);M([x({type:Boolean})],T.prototype,"playing",2);M([x({type:Boolean})],T.prototype,"showTheory",2);M([x({type:String})],T.prototype,"instrument",2);M([x({type:String})],T.prototype,"playStyle",2);M([x({type:Boolean})],T.prototype,"isAuthenticated",2);M([x({type:String})],T.prototype,"userEmail",2);M([x({type:Array})],T.prototype,"sections",2);M([x({type:Number})],T.prototype,"activeSectionIdx",2);M([x({type:Number})],T.prototype,"activePlayingSectionIdx",2);M([x({type:Number})],T.prototype,"totalSongSteps",2);M([x({type:Boolean})],T.prototype,"isGenerating",2);M([x({type:Boolean})],T.prototype,"libraryOpen",2);M([x({type:Boolean})],T.prototype,"isSaved",2);M([x({type:String})],T.prototype,"currentProjectId",2);M([k()],T.prototype,"isMobile",2);M([k()],T.prototype,"activeView",2);M([k()],T.prototype,"vibeOpen",2);M([k()],T.prototype,"showSaveModal",2);M([k()],T.prototype,"pendingSaveName",2);M([x({type:String})],T.prototype,"selectedBand",2);M([k()],T.prototype,"bandSwaps",2);M([k()],T.prototype,"freeText",2);M([k()],T.prototype,"vibePlaceholderIdx",2);M([k()],T.prototype,"expandedGenre",2);M([k()],T.prototype,"expandedMood",2);M([k()],T.prototype,"activeSwapFamily",2);M([k()],T.prototype,"swapIndex",2);M([k()],T.prototype,"isInspectorOpen",2);M([k()],T.prototype,"detailOpen",2);M([k()],T.prototype,"detailIndex",2);M([k()],T.prototype,"abPick",2);M([k()],T.prototype,"abSide",2);M([k()],T.prototype,"abPlaying",2);M([k()],T.prototype,"mobileFeelIndex",2);M([k()],T.prototype,"mobileChordIndex",2);M([k()],T.prototype,"savedSets",2);M([k()],T.prototype,"renamingId",2);M([k()],T.prototype,"draftName",2);M([k()],T.prototype,"confirmDeleteId",2);M([k()],T.prototype,"librarySearch",2);M([k()],T.prototype,"librarySelectMode",2);M([k()],T.prototype,"librarySelected",2);M([k()],T.prototype,"playInstrument",2);M([k()],T.prototype,"showDegrees",2);M([k()],T.prototype,"mobileSheetOpen",2);M([k()],T.prototype,"mobileDetailSheetOpen",2);M([k()],T.prototype,"padFlash",2);M([k()],T.prototype,"padHeld",2);M([k()],T.prototype,"gridFor",2);M([k()],T.prototype,"lastPad",2);M([k()],T.prototype,"tempoOpen",2);M([k()],T.prototype,"feelOpen",2);M([k()],T.prototype,"shareOpen",2);M([k()],T.prototype,"expandedInstrument",2);M([k()],T.prototype,"barsPerChord",2);M([k()],T.prototype,"swing",2);M([k()],T.prototype,"spread",2);M([k()],T.prototype,"density",2);M([k()],T.prototype,"humanise",2);M([k()],T.prototype,"tone",2);M([k()],T.prototype,"feelScope",2);M([k()],T.prototype,"barFeel",2);M([k()],T.prototype,"advOverride",2);M([k()],T.prototype,"advOpen",2);M([k()],T.prototype,"showAdvancedFeel",2);M([k()],T.prototype,"humanEngineState",2);M([k()],T.prototype,"auditionDeg",2);M([k()],T.prototype,"auditionName",2);M([k()],T.prototype,"auditionBar",2);T=M([pe("loop-screen")],T);var Pa=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,j=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ra(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Pa(e,i,s),s};function ja(t){const e=t.replace("#",""),i=parseInt(e.substring(0,2),16)||201,o=parseInt(e.substring(2,4),16)||169,s=parseInt(e.substring(4,6),16)||224;return`rgba(${i}, ${o}, ${s}, 0.18)`}let P=class extends de{constructor(){super(...arguments),this.activeTab="loop",this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.length=4,this.sections=[],this.songTimeline=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.syncError=null,this.authModalOpen=!1,this.midiModalOpen=!1,this.shareModalOpen=!1,this.selectedChordIndex=null,this.selectedBand=null,this.melodyTrack=null,this.playInstrument="Piano",this.showDegrees=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.chordLengthCache=[],this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await bt.signOut(),R.logout()},this.toastUndoAction="delete",this.toastUndoProject=null}connectedCallback(){super.connectedCallback();const t=o=>{try{return typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(o):null}catch{return null}};this.showTheory=(t("chroma-chords-show-theory")||t("chord-voyager-show-theory"))==="true";const e=t("chroma-chords-instrument");e&&Pe.some(o=>o.name===e)&&(this.instrument=e);const i=t("chroma-chords-play-style");i&&Ot.some(o=>o.name===i)&&(this.playStyle=i),w.setInstrument(this.instrument),w.setPlayStyle(this.playStyle),this.unsubscribeAuth=bt.subscribe(o=>{this.userEmail=o.user?.email||null,this.isAuthenticated=o.isAuthenticated}),this.unsubscribeProjects=R.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=R.subscribeSyncStatus(o=>{const s=this.syncStatus;if(this.syncStatus=o,this.syncError=R.getLastSyncError(),o==="offline"&&s!=="offline"){const n=this.syncError||"Cloud sync failed";this.showToast(`Sync failed: ${n}`)}this.requestUpdate()}),this.unsubscribeTick=w.subscribeTick((o,s,n,r,a)=>{this.activeIndex=o,this.progressStep=s,typeof n=="number"&&(this.activePlayingSectionIdx=n),typeof r=="number"&&(this.totalSongSteps=r),this.playing=w.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),Nn().then(o=>{this.chordData=o,this.progression||(this.progression=mi(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(s,n)=>n),w.setProgression(this.progression,this.order),this.sections=J.createInitialSong(this.progression,this.order),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack=Ce.generateMelody(this.progression),w.setMelodyTrack(this.melodyTrack))}).catch(o=>{console.error("Failed to load chord data:",o)})}disconnectedCallback(){super.disconnectedCallback(),w.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return R.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?this.libraryOpen=!0:t==="melody"?this.activeTab="melody":t==="song"?this.activeTab="song":t==="play"?this.activeTab="play":(t==="chords"||t==="loop")&&(this.activeTab="loop")}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const i=(typeof t?.detail=="string"?t.detail:t?.detail?.promptText)||this.activeSearchPrompt||void 0;i&&this.showToast("Composing chords with AI...");const o=await Br.resolvePrompt(this.chordData,this.genre,this.mood,this.length,i);o.instrument&&(this.instrument=o.instrument,localStorage.setItem("chroma-chords-instrument",o.instrument),w.setInstrument(o.instrument)),o.playStyle&&(this.playStyle=o.playStyle,localStorage.setItem("chroma-chords-play-style",o.playStyle),w.setPlayStyle(o.playStyle));const s=o.progression;this.progression=s,s.genre&&(this.genre=s.genre),s.mood&&(this.mood=s.mood),this.order=Array.from({length:s.chords.length},(n,r)=>r),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.chordLengthCache=[],w.setProgression(s,this.order),w.reset(),this.sections=J.createInitialSong(s,this.order),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack=Ce.generateMelody(s),w.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.activeSearchPrompt=null,i&&this.showToast(`Composed from "${i}"`)}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){const e=t.detail;if(!this.progression||e===this.length)return;const i=Ln(this.progression,e,this.chordData,this.chordLengthCache);this.progression=i.progression,this.chordLengthCache=i.cachedTailChords,this.length=this.progression.chords.length,this.order=Array.from({length:this.length},(o,s)=>s),w.setProgression(this.progression,this.order),this.sections.length>0?this.sections=J.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order):this.sections=J.createInitialSong(this.progression,this.order),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=Ce.alignMelodyToChords(this.melodyTrack,this.progression),w.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;this.chordLengthCache=[];const t=mi(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,w.setProgression(t,this.order),this.sections=J.createInitialSong(this.progression,this.order),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack=Ce.generateMelody(this.progression),w.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.playing&&(w.startAutoplay(),w.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let s=o.notes;(!s||s.length===0)&&(s=G(o.name,z(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.chordLengthCache=[],this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&w.setBarsPerChord(e.barsPerChord),e.feel&&w.setFeelSettings(e.feel),w.setProgression(this.progression,this.order),this.sections=J.createInitialSong(this.progression,this.order),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack=Ce.generateMelody(this.progression),w.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){R.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=R.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,R.saveProject(e),this.requestUpdate())}async onSyncProjects(){await R.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onUnsaveSet(t){const e=t.detail||this.currentProjectId;if(e){const i=R.getProjects().find(s=>s.id===e),o=i?.name||"Loop";i&&(this.toastUndoProject={...i}),R.deleteProject(e),this.currentProjectId===e&&(this.currentProjectId=null),this.showToast(`Removed "${o}"`,e,"restore"),this.requestUpdate()}}safeSet(t,e){try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}catch{}}onTheoryToggle(){this.showTheory=!this.showTheory,this.safeSet("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,this.safeSet("chroma-chords-instrument",t.detail),w.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,this.safeSet("chroma-chords-play-style",t.detail),w.setPlayStyle(t.detail)}onTogglePlay(){this.playing=w.togglePlay()}onTogglePlaySong(){w.setSong(this.sections),this.playing=w.togglePlay()}onProgressionChange(t){this.progression=t.detail,this.progression&&(this.length=this.progression.chords.length,(this.order.length!==this.length||this.order.some(e=>e>=this.length))&&(this.order=Array.from({length:this.length},(e,i)=>i))),w.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=J.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.songTimeline=J.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=Ce.alignMelodyToChords(this.melodyTrack,this.progression),w.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=J.addSection(this.sections,this.progression,this.chordData);this.sections=t.sections,this.songTimeline=J.createDefaultTimeline(this.sections),this.activeSectionIdx=t.activeIndex;const e=this.sections[this.activeSectionIdx];e&&(this.progression=e.progression,this.order=e.order.slice(),w.setProgression(this.progression,this.order)),w.setSong(this.sections),this.requestUpdate()}onRemoveSection(t){const e=t.detail,i=J.removeSection(this.sections,e);this.sections=i.sections,this.songTimeline=J.createDefaultTimeline(this.sections),this.activeSectionIdx=i.activeIndex;const o=this.sections[this.activeSectionIdx];o&&(this.progression=o.progression,this.order=o.order.slice(),w.setProgression(this.progression,this.order)),w.setSong(this.sections),this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.progression=e.progression,this.order=e.order.slice(),w.setProgression(this.progression,this.order)),this.requestUpdate()}showToast(t,e,i="delete"){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastUndoAction=i,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null},3200)}onToastUndo(){this.toastUndoId&&(this.toastUndoAction==="restore"&&this.toastUndoProject?(R.saveProject(this.toastUndoProject),this.currentProjectId=this.toastUndoProject.id):this.toastUndoAction==="delete"&&(R.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null)),this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=R.getProjects().find(a=>a.id===e),o=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s=w.getFeelSettings(),n=w.getBarsPerChord(),r={id:e,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:n,feel:{swing:s.swing??0,spread:s.spread??50,density:s.density??50,tone:s.tone??"Warm",humanState:s.humanState}};R.saveProject(r),t&&R.scheduleCloudSync(),this.showToast(`Saved "${o}"`,e,"delete"),this.requestUpdate()}render(){const t=!!(this.currentProjectId&&R.isProjectSaved(this.currentProjectId)),e=At(this.progression?.mood||this.mood),i=ja(e),o=this.sections[this.activeSectionIdx],s=o?o.id||String.fromCharCode(65+this.activeSectionIdx):"A",n=this.sections.reduce((a,l)=>a+(l.order?.length||4)*(w.getBarsPerChord()||1),0),r=`${this.sections.length} sections · ${n} bars`;return g`
      <div class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${R.getProjects().length}
          .syncStatus=${this.syncStatus}
          .syncError=${this.syncError}
          @tab-change=${a=>{this.activeTab=a.detail}}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.activeTab="loop"}}
          @open-midi=${()=>{this.midiModalOpen=!0}}
        ></app-header>
      </div>

      <main class="screen-view" style="--panel-tint-bg: ${i};">
        ${this.progression?g`
          <div class="tab-content-wrapper">
            ${this.activeTab==="loop"?g`
              <div class="chords-tab-layout">
                <div class="main-tinted-panel">
                  <tab-chords
                    .progression=${this.progression}
                    .chordData=${this.chordData}
                    .moodColor=${e}
                    .selectedBand=${this.selectedBand}
                    .isPlaying=${this.playing}
                    .activeIndex=${this.activeIndex}
                    .showTheory=${this.showTheory}
                    @chord-detail-open=${a=>{this.selectedChordIndex=a.detail.index}}
                    @progression-update=${a=>{this.progression&&this.onProgressionChange(new CustomEvent("progression-change",{detail:{...this.progression,chords:a.detail.chords}}))}}
                    @set-chord-count=${a=>{this.onLengthChange(new CustomEvent("set-length",{detail:a.detail.count}))}}
                    @reroll=${this.onReroll}
                    @clear-band=${()=>{this.selectedBand=null}}
                    @open-vibe-picker=${()=>{this.onReroll()}}
                  ></tab-chords>
                </div>
                <aside class="desktop-aside">
                  <chord-inspector
                    .progression=${this.progression}
                    .selectedChordIndex=${this.selectedChordIndex}
                    .selectedBand=${this.selectedBand}
                    .showTheory=${this.showTheory}
                    .moodColor=${e}
                    .isSaved=${t}
                    @close-detail=${()=>{this.selectedChordIndex=null}}
                    @change-voicing=${a=>{if(this.progression&&this.selectedChordIndex!==null){const l=[...this.progression.chords],c=l[this.selectedChordIndex];c&&(l[this.selectedChordIndex]=pi(c,a.detail.voicing||"Major","None"),this.onProgressionChange(new CustomEvent("progression-change",{detail:{...this.progression,chords:l}})))}}}
                  ></chord-inspector>
                </aside>
              </div>
            `:this.activeTab==="melody"?g`
              <div class="main-tinted-panel">
                <tab-melody
                  .progression=${this.progression}
                  .melodyTrack=${this.melodyTrack}
                  .activeStepIndex=${this.progressStep}
                  .playing=${this.playing}
                  @melody-change=${a=>{this.melodyTrack=a.detail.track,w.setMelodyTrack(this.melodyTrack)}}
                  @toast=${a=>this.showToast(a.detail)}
                ></tab-melody>
              </div>
            `:this.activeTab==="song"?g`
              <tab-song
                .sections=${this.sections}
                .timeline=${this.songTimeline}
                .activeSectionIdx=${this.activeSectionIdx}
                .activeTimelineIdx=${this.activePlayingSectionIdx}
                .currentStep=${this.progressStep}
                .playing=${this.playing}
                .mood=${this.mood}
                .bpm=${this.progression?.bpm||120}
                @section-select=${a=>this.onSelectSection(a)}
                @add-section=${()=>this.onAddSection()}
                @remove-section=${a=>this.onRemoveSection(a)}
                @timeline-change=${a=>{this.songTimeline=a.detail.timeline}}
              ></tab-song>
            `:g`
              <tab-play
                .progression=${this.progression}
                .activeIndex=${this.activeIndex}
                .playing=${this.playing}
                .showTheory=${this.showTheory}
                .playInstrument=${this.playInstrument}
                .showDegrees=${this.showDegrees}
                .mood=${this.mood}
                @instrument-change=${a=>{this.playInstrument=a.detail.instrument}}
                @degrees-toggle=${a=>{this.showDegrees=a.detail.showDegrees}}
                @play-chord=${a=>{a.detail.chord?.notes&&w.playChordNotes(a.detail.chord.notes,.85)}}
              ></tab-play>
            `}
          </div>
        `:g`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}
      </main>

      <div class="transport-container desktop-only">
        <transport-bar
          .activeTab=${this.activeTab}
          .isPlaying=${this.playing}
          .playLabel=${this.activeTab==="song"?"Play song":"Play section"}
          .moodColor=${e}
          .sections=${this.sections}
          .activeSectionId=${s}
          .chordSound=${this.instrument||"Stage Rhodes"}
          .melodySound=${"Lead Synth"}
          .chordFeel=${this.playStyle||"Block chords"}
          .keyRoot=${this.progression?.key||"C"}
          .scaleMode=${this.progression?.scaleType==="MINOR"?"Minor":"Major"}
          .bpm=${this.progression?.bpm||84}
          .barsPerChord=${w.getBarsPerChord()}
          .songTotal=${r}
          @toggle-play=${()=>{this.activeTab==="song"?this.onTogglePlaySong():this.onTogglePlay()}}
          @share-click=${()=>{this.shareModalOpen=!0}}
          @bpm-change=${a=>{this.progression&&(this.progression={...this.progression,bpm:a.detail.bpm},w.setBpm(a.detail.bpm),this.requestUpdate())}}
          @bars-change=${a=>{w.setBarsPerChord(a.detail.bars),this.requestUpdate()}}
          @key-change=${a=>{this.progression&&(this.progression={...this.progression,key:a.detail.root},w.setProgression(this.progression,this.order),this.requestUpdate())}}
          @scale-change=${a=>{if(this.progression){const l=a.detail.mode.toUpperCase();this.progression={...this.progression,scaleType:l},w.setProgression(this.progression,this.order),this.requestUpdate()}}}
          @sound-change=${a=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:a.detail.sound}))}}
          @feel-change=${a=>{this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:a.detail.feel}))}}
        ></transport-bar>
      </div>

      <div class="dock-container mobile-only">
        <mobile-dock
          .activeTab=${this.activeTab}
          .isPlaying=${this.playing}
          .playLabel=${this.activeTab==="song"?"Play song":"Play section"}
          .moodColor=${e}
          .sections=${this.sections}
          .activeSectionId=${s}
          .chordSound=${this.instrument||"Stage Rhodes"}
          .melodySound=${"Lead Synth"}
          .chordFeel=${this.playStyle||"Block chords"}
          .keyRoot=${this.progression?.key||"C"}
          .scaleMode=${this.progression?.scaleType==="MINOR"?"Minor":"Major"}
          .bpm=${this.progression?.bpm||84}
          .barsPerChord=${w.getBarsPerChord()}
          .isSaved=${t}
          @toggle-play=${()=>{this.activeTab==="song"?this.onTogglePlaySong():this.onTogglePlay()}}
          @open-share=${()=>{this.shareModalOpen=!0}}
          @reroll=${this.onReroll}
          @save-set=${()=>{this.saveProject()}}
          @unsave-set=${()=>{this.currentProjectId&&this.onUnsaveSet(new CustomEvent("unsave-set",{detail:this.currentProjectId}))}}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @set-bpm=${a=>{this.progression&&(this.progression={...this.progression,bpm:a.detail.bpm},w.setBpm(a.detail.bpm),this.requestUpdate())}}
          @set-bars-per-chord=${a=>{w.setBarsPerChord(a.detail.bars),this.requestUpdate()}}
          @set-key=${a=>{if(this.progression){const l=a.detail.root,c=a.detail.mode?.toUpperCase()==="MINOR"?"MINOR":"MAJOR";this.progression={...this.progression,key:l,scaleType:c},w.setProgression(this.progression,this.order),this.requestUpdate()}}}
          @set-sound=${a=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:a.detail.sound}))}}
          @set-feel=${a=>{this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:a.detail.feel}))}}
        ></mobile-dock>
      </div>

      <midi-modal
        .isOpen=${this.midiModalOpen}
        @close-modal=${()=>{this.midiModalOpen=!1}}
      ></midi-modal>

      <share-modal
        .open=${this.shareModalOpen}
        .progression=${this.progression}
        .order=${this.order}
        .instrument=${this.instrument}
        .playStyle=${this.playStyle}
        .barsPerChord=${w.getBarsPerChord()}
        .feelSettings=${w.getFeelSettings()}
        .melodyTrack=${this.melodyTrack}
        @close=${()=>{this.shareModalOpen=!1}}
        @toast=${a=>this.showToast(a.detail)}
      ></share-modal>

      <auth-modal
        .open=${this.authModalOpen}
        @close-modal=${()=>{this.authModalOpen=!1}}
      ></auth-modal>

      ${this.toastMessage?g`
        <div class="save-toast">
          <span>${this.toastMessage}</span>
          <div class="toast-actions">
            ${this.toastUndoId?g`
              <button class="toast-btn" @click=${()=>{this.libraryOpen=!0,this.toastMessage=null}}>View</button>
              <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
            `:g`
              <button class="toast-btn" @click=${()=>{this.toastMessage=null}} aria-label="Dismiss">✕</button>
            `}
          </div>
        </div>
      `:""}
    `}};P.styles=ce`
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
      height: 100%;
      height: 100vh;
      height: 100dvh;
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
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding: 20px 24px 28px;
      box-sizing: border-box;
    }

    @media (max-width: 899px) {
      .screen-view {
        padding: var(--cv-mob-panel-padding, 14px 18px 26px);
        padding-bottom: 96px;
        box-sizing: border-box;
      }
    }

    .tab-content-wrapper {
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }

    /* Chords tab desktop aside split */
    .chords-tab-layout {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      width: 100%;
    }

    .chords-tab-layout .main-tinted-panel {
      flex: 1;
      min-width: 0;
    }

    .desktop-aside {
      flex-shrink: 0;
      width: clamp(304px, 26vw, 384px);
    }

    @media (max-width: 1024px) {
      .chords-tab-layout {
        flex-direction: column;
      }
      .desktop-aside {
        width: 100%;
      }
    }

    /* ONE Main Panel (Mood-Tinted 18% alpha, Radius 26px / 22px mobile) */
    .main-tinted-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 899px) {
      .main-tinted-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    .transport-container {
      flex-shrink: 0;
      z-index: 45;
    }

    .dock-container {
      flex-shrink: 0;
      z-index: 45;
    }

    .desktop-only {
      display: block;
    }
    .mobile-only {
      display: none;
    }

    @media (max-width: 899px) {
      .desktop-only {
        display: none !important;
      }
      .mobile-only {
        display: block !important;
      }
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
  `;j([k()],P.prototype,"activeTab",2);j([k()],P.prototype,"chordData",2);j([k()],P.prototype,"libraryOpen",2);j([k()],P.prototype,"genre",2);j([k()],P.prototype,"mood",2);j([k()],P.prototype,"progression",2);j([k()],P.prototype,"activeIndex",2);j([k()],P.prototype,"progressStep",2);j([k()],P.prototype,"order",2);j([k()],P.prototype,"playing",2);j([k()],P.prototype,"showTheory",2);j([k()],P.prototype,"instrument",2);j([k()],P.prototype,"playStyle",2);j([k()],P.prototype,"length",2);j([k()],P.prototype,"sections",2);j([k()],P.prototype,"songTimeline",2);j([k()],P.prototype,"activeSectionIdx",2);j([k()],P.prototype,"activePlayingSectionIdx",2);j([k()],P.prototype,"totalSongSteps",2);j([k()],P.prototype,"userEmail",2);j([k()],P.prototype,"isAuthenticated",2);j([k()],P.prototype,"syncStatus",2);j([k()],P.prototype,"syncError",2);j([k()],P.prototype,"authModalOpen",2);j([k()],P.prototype,"midiModalOpen",2);j([k()],P.prototype,"shareModalOpen",2);j([k()],P.prototype,"selectedChordIndex",2);j([k()],P.prototype,"selectedBand",2);j([k()],P.prototype,"melodyTrack",2);j([k()],P.prototype,"playInstrument",2);j([k()],P.prototype,"showDegrees",2);j([k()],P.prototype,"toastMessage",2);j([k()],P.prototype,"toastUndoId",2);j([k()],P.prototype,"isGenerating",2);j([k()],P.prototype,"chordLengthCache",2);P=j([pe("chroma-chords-app")],P);
