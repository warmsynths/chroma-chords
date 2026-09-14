import{f as Vo,u as qo,s as io,n as yi,l as oo,F as ni,S as me,G as it,a as ae,E as Le,C as xe,V as Ue,D as ye,R as fe,P as W,b as ri,M as ze,c as so,d as ve,g as Ho,i as se,e as ne,h as g,A as no,O as Yo,w as U}from"./assets/vendor-C6HArRHJ.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jo={attribute:!0,type:String,converter:qo,reflect:!1,hasChanged:Vo},Wo=(e=Jo,t,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),o==="accessor"){const{name:r}=i;return{set(c){const d=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,d,e,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,e,c),c}}}if(o==="setter"){const{name:r}=i;return function(c){const d=this[r];t.call(this,c),this.requestUpdate(r,d,e,!0,c)}}throw Error("Unsupported decorator location: "+o)};function I(e){return(t,i)=>typeof i=="object"?Wo(e,t,i):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(e){return I({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ko=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ro(e,t){return(i,o,s)=>{const n=r=>r.renderRoot?.querySelector(e)??null;return Ko(i,o,{get(){return n(this)}})}}const Oe="chroma_chords_projects",Xo="chord_voyager_projects";class De{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let t=localStorage.getItem(Oe);if(t||(t=localStorage.getItem(Xo),t&&localStorage.setItem(Oe,t)),t){const i=JSON.parse(t);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem(Oe,JSON.stringify(i)),i}}catch(t){console.error("Failed to load projects from localStorage:",t)}return[]}static setProjects(t){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(Oe,JSON.stringify(t))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(t,i){const o=new Map;return t.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const n=o.get(s.id);!n||s.lastModified>n.lastModified?o.set(s.id,s):s.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(t){const i=this.getProjects(),o=i.findIndex(s=>s.id===t.id);t.lastModified=Date.now(),o>=0?i[o]=t:i.push(t);try{localStorage.setItem(Oe,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(t){let i=this.getProjects();i=i.filter(o=>o.id!==t);try{localStorage.setItem(Oe,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(t){const i=JSON.stringify(t,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),n=document.createElement("a");n.href=s,n.download=`${t.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}static importProjectFile(t){return new Promise((i,o)=>{const s=new FileReader;s.onload=n=>{try{const r=n.target?.result,c=JSON.parse(r);c&&typeof c=="object"&&Array.isArray(c.chords)?(c.id=Math.random().toString(36).substr(2,9),c.lastModified=Date.now(),i(c)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(t)})}}const ot="chroma_chords_auth_token",Tt="chroma_chords_auth_user",Qo="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Et(e){try{const t=e.split(".");if(t.length!==3)return null;let i=t[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function Zo(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Qo}}class es{constructor(t){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=t!==void 0?t:Zo(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const t=localStorage.getItem(ot);if(t){const i=Et(t);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=t,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(ot),localStorage.removeItem(Tt),this.currentAccessToken=null,this.currentUser=null)}}catch(t){console.warn("Failed to restore auth session from localStorage:",t)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const t=Et(this.currentAccessToken);if(t&&t.exp&&t.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(t){return this.listeners.add(t),t(this.getAuthState()),()=>{this.listeners.delete(t)}}notify(){const t=this.getAuthState();this.listeners.forEach(i=>{try{i(t)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(t){if(!t||typeof t!="string")return{success:!1,message:"Invalid credential provided."};const i=Et(t);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=t,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(ot,t),localStorage.setItem(Tt,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(t=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,t(!0)}),i.addEventListener("error",()=>t(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,t(!0)},o.onerror=()=>t(!1),document.head.appendChild(o)})}async renderGoogleButton(t,i){if(!this.clientId||typeof window>"u"||!t)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const n=this.handleCredentialResponse(s.credential);i?.({success:n.success,message:n.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),t.innerHTML="",o.accounts.id.renderButton(t,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const t=window.google;return t?.accounts?.id?new Promise(i=>{try{t.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),t.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(t="google"){return t!=="google"?{success:!1,message:`Unsupported auth provider: ${t}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(ot),localStorage.removeItem(Tt)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(t){console.warn("Error during sign out storage cleanup:",t)}return this.notify(),{success:!0}}}const Re=new es;class ts{formatUrl(t){let i=t.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(t,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?t.Authorization=o:t.Authorization=`Bearer ${o}`}async testConnection(t,i){const o=this.formatUrl(t);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const n=new AbortController,r=setTimeout(()=>n.abort(),8e3),c=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:n.signal});if(clearTimeout(r),c.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await c.json().catch(()=>({}))).timestamp};if(c.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const d=await c.text().catch(()=>"");return{ok:!1,status:c.status,message:`Connection error (${c.status}): ${d||c.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(t,i,o){const s=this.formatUrl(t);if(!s)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,i);const r=new AbortController,c=setTimeout(()=>r.abort(),15e3),d=await fetch(`${s}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(o),signal:r.signal});if(clearTimeout(c),!d.ok){let p="";try{const u=await d.json();p=u.error||u.message||""}catch{p=await d.text().catch(()=>"")}throw new Error(`Cloud sync failed (${d.status}): ${p||d.statusText||"Unknown error"}`)}return await d.json()}}const is=new ts,Ni="chroma_chords_deleted_projects",Mi="chroma_chords_last_sync_time",os="https://chroma-chords-api.warmsynths.workers.dev";function ss(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return os}}function Oi(e){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(e):null}function Di(e,t){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(e,t)}class ns{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=Re.subscribe(t=>{const i=this.authenticated;this.userEmail=t.user?.email||null,this.authenticated=t.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(t){return this.syncStatusCallbacks.add(t),t(this.syncStatus),()=>this.syncStatusCallbacks.delete(t)}notifySyncStatus(){this.syncStatusCallbacks.forEach(t=>{try{t(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(t){return this.authStateCallbacks.add(t),t(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(t)}notifyAuthState(){this.authStateCallbacks.forEach(t=>{try{t(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(t){return this.projectsChangeCallbacks.add(t),t(this.getProjects()),()=>this.projectsChangeCallbacks.delete(t)}subscribe(t){return this.subscribeProjects(t)}notifyProjectsChanged(){const t=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(t)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return De.getProjects()}isProjectSaved(t){return t?De.getProjects().some(i=>i.id===t):!1}saveProject(t){De.saveProject(t),this.removeTombstone(t.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(t){De.deleteProject(t),this.addTombstone(t),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const t=Oi(Ni);if(!t)return[];try{return JSON.parse(t)}catch{return[]}}setTombstones(t){Di(Ni,JSON.stringify(t))}addTombstone(t){const i=this.getTombstones(),o=i.findIndex(n=>n.id===t),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:t,deletedAt:s}),this.setTombstones(i)}removeTombstone(t){const i=this.getTombstones().filter(o=>o.id!==t);this.setTombstones(i)}getLastSyncTime(){return Oi(Mi)}setLastSyncTime(t){Di(Mi,t)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(t=>{console.warn("Scheduled cloud sync failed:",t)})},2e3)}async syncWithCloud(t){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await Re.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=t||ss();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=De.getProjects(),n=this.getTombstones(),r=this.getLastSyncTime(),c=s.map(h=>({...h,deletedAt:null})),d=await is.sync(o,i,{sets:c,lastSyncTime:r,tombstones:n}),p=new Map;s.forEach(h=>{p.set(h.id,{...h,syncedToCloud:!0})});const u=d.tombstones||[],a=new Set(u.map(h=>h.id));(d.sets||[]).forEach(h=>{if(h.deletedAt)a.add(h.id);else{const m=p.get(h.id),y=h.lastModified||(h.updatedAt?new Date(h.updatedAt).getTime():0),w=m?.lastModified||0;(!m||y>=w)&&p.set(h.id,{id:h.id,name:h.name,lastModified:y,genre:h.genre,mood:h.mood,key:h.key,scaleType:h.scaleType,bpm:h.bpm,showTheory:h.showTheory,chords:Array.isArray(h.chords)?h.chords:[],syncedToCloud:!0})}}),a.forEach(h=>{p.delete(h)});const v=Array.from(p.values());De.setProjects(v);const b=this.getTombstones(),f=new Set(n.map(h=>h.id)),l=b.filter(h=>!f.has(h.id));this.setTombstones(l),(d.lastSyncTime||d.syncedAt)&&this.setLastSyncTime(d.lastSyncTime||d.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const F=new ns;let At=null,bt=null,xt=null,yt=null,We=null,Nt=null,Mt=null,Ot=null,st=null,Dt=null,Bt=null,Ft=null,Pt=null,nt=null,rt=null,at=null,lt=null,ct=null,zt=null,Lt=null,Ut=null,dt=null,pt=null,Rt=null,jt=null,ht=null,_t=null,Gt=null;function ao(){return At||(At=new so({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),At}let ut="Warm",Be=null,Vt=null,$e=null,qt=null,gt=null,Ce=null,Ht=null,Yt=null,Jt=null,Te=null;function Me(){if(!Be){Be=new it(1);const e=ao();Vt=new ae({frequency:3200,type:"lowpass",rolloff:-12}),$e=new it(1),Vt.connect($e),$e.connect(e),Be.connect(Vt),qt=new Le({high:3.5,mid:0,low:-.5,highFrequency:4500}),gt=new xe({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{gt.start()}catch{}Ce=new it(0),qt.connect(gt),gt.connect(Ce),Ce.connect(e),Be.connect(qt),Ht=new ae({frequency:1800,type:"bandpass",Q:.8}),Yt=new Ue({frequency:.5,depth:.1,wet:.4}),Jt=new ye({distortion:.1,wet:.15}),Te=new it(0),Ht.connect(Yt),Yt.connect(Jt),Jt.connect(Te),Te.connect(e),Be.connect(Ht)}return Be}function Pe(e){Me();const t=e?e.toLowerCase().trim():"warm";ut=t==="glassy"?"Glassy":t==="dusty"?"Dusty":"Warm";const i=.05,o=yi();try{$e&&Ce&&Te&&(ut==="Warm"?($e.gain.rampTo(1,i,o),Ce.gain.rampTo(0,i,o),Te.gain.rampTo(0,i,o)):ut==="Glassy"?($e.gain.rampTo(0,i,o),Ce.gain.rampTo(1,i,o),Te.gain.rampTo(0,i,o)):ut==="Dusty"&&($e.gain.rampTo(0,i,o),Ce.gain.rampTo(0,i,o),Te.gain.rampTo(1,i,o)))}catch(s){console.warn("Failed to ramp master tone:",s)}}function rs(e="Warm",t){const i=e?e.toLowerCase().trim():"warm",o=t??Ho();if(i==="glassy"){const n=new Le({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new xe({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return n.connect(r),r.connect(o),n}if(i==="dusty"){const n=new ae({frequency:1800,type:"bandpass",Q:.8}),r=new Ue({frequency:.5,depth:.1,wet:.4}),c=new ye({distortion:.1,wet:.15});return n.connect(r),r.connect(c),c.connect(o),n}const s=new ae({frequency:3200,type:"lowpass",rolloff:-12});return s.connect(o),s}const Wt=typeof import.meta<"u"&&"./"||"./",It=Wt.endsWith("/")?Wt:`${Wt}/`,lo={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},as=`${It}audio/samples/grand-piano/`,co={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},ls=`${It}audio/samples/stage-rhodes/`,po={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},cs=`${It}audio/samples/nylon-guitar/`,ho={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},ds=`${It}audio/samples/jazz-guitar/`;function ps(e="piano"){let t=null,i={};if(e==="jazz-guitar"?(t=We,i=ho):e==="guitar"?(t=yt,i=po):e==="rhodes"||e==="epiano"?(t=xt,i=co):(t=bt,i=lo),!t||!t.loaded)return null;const o=t._buffers;if(!o)return null;const s={};for(const n of Object.keys(i))try{const r=ni(n).toMidi(),c=o.has(r)?o.get(r):o.has(n)?o.get(n):null;c&&typeof c.get=="function"&&c.get()&&(s[n]=c.get())}catch{}return Object.keys(s).length>0?s:null}async function hs(e="piano"){const t=gs(e);if(t.loaded)return t;try{return await Promise.race([oo(),new Promise((i,o)=>setTimeout(()=>o(new Error("Sample load timeout")),3e3))]),t}catch(i){return console.warn(`ensureSamplerLoaded(${e}) timed out or failed:`,i),null}}function uo(){return bt||(bt=new ve({urls:lo,baseUrl:as,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Grand Piano sampler:",e)}).connect(Me())),bt}function go(){return xt||(xt=new ve({urls:co,baseUrl:ls,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Stage Rhodes sampler:",e)}).connect(Me())),xt}function mo(){return yt||(yt=new ve({urls:po,baseUrl:cs,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Nylon Guitar sampler:",e)}).connect(Me())),yt}function fo(){if(!We){const e=Me();Nt=new Le({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Mt=new ae({frequency:2800,type:"lowpass",rolloff:-12}),Ot=new fe({decay:1.8,preDelay:.02,wet:.18}),We=new ve({urls:ho,baseUrl:ds,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Jazz Archtop sampler:",t)}),We.connect(Nt),Nt.connect(Mt),Mt.connect(Ot),Ot.connect(e)}return We}function us(){if(!ct){const e=Me();zt=new Ue({frequency:.45,depth:.18,wet:.65}),Lt=new ye({distortion:.12,wet:.18}),Ut=new ae({frequency:3400,type:"lowpass",rolloff:-12}),dt=new xe({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{dt.start()}catch{}ct=new W(ze,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),ct.connect(zt),zt.connect(Lt),Lt.connect(Ut),Ut.connect(dt),dt.connect(e)}return ct}function gs(e){return e==="jazz-guitar"?fo():e==="guitar"?mo():e==="rhodes"||e==="epiano"?go():uo()}function ms(e){const t=Me();switch(e){case"organ":return st||(Dt=new Ue({frequency:5.8,depth:.12,wet:.55}),Bt=new ye({distortion:.08,wet:.15}),Ft=new ae({frequency:4500,type:"lowpass",rolloff:-12}),st=new W(me,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),st.connect(Dt),Dt.connect(Bt),Bt.connect(Ft),Ft.connect(t)),st;case"pad-strings":if(!rt){Pt=new fe({decay:5.5,preDelay:.03,wet:.45}),nt=new xe({frequency:.45,delayTime:4,depth:.5,wet:.4});try{nt.start()}catch{}rt=new W(me,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),rt.connect(nt),nt.connect(Pt),Pt.connect(t)}return rt;case"juno-pad":if(!lt){at=new xe({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{at.start()}catch{}lt=new W(ze,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),lt.connect(at),at.connect(t)}return lt;case"stab":return pt||(Rt=new ye({distortion:.1,wet:.12}),jt=new fe({decay:1,wet:.22}),pt=new W(ze,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),pt.connect(Rt),Rt.connect(jt),jt.connect(t)),pt;case"bell":return ht||(_t=new Le({high:3.5,mid:-.5,low:-2,highFrequency:4800}),Gt=new fe({decay:3.2,wet:.32}),ht=new W(ri,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),ht.connect(_t),_t.connect(Gt),Gt.connect(t)),ht;case"guitar":return mo();case"jazz-guitar":return fo();case"sh101":return us();case"rhodes":case"epiano":return go();case"piano":default:return uo()}}const le=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],Bi={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function be(e){if(!e)return"Grand Piano";const t=e.trim().toLowerCase();if(Bi[t])return Bi[t];const i=le.find(o=>o.name.toLowerCase()===t);return i?i.name:"Grand Piano"}const Ne=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],tt={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},wi={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},fs={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","jazz-guitar":"Jazz Archtop","pad-strings":"Cinematic Pad",bell:"Celestial Bell",organ:"Drawbar Organ","juno-pad":"Juno Synth",sh101:"Vintage SH-101",stab:"House Stab"};function vs(e){const t=tt[e]??"piano";return fs[t]??"Grand Piano"}function bs(e){return(wi[e]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function vo(){return Promise.race([oo(),new Promise(e=>setTimeout(e,80))])}function bo(e,t){const i=t/60;switch(e){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function xo(e,t){const i=[];for(let o=0;o<t;o++)for(const s of e){const n=s.match(/^([A-G]#?)(-?\d+)$/);if(n){const r=n[1],c=parseInt(n[2],10)+o;i.push(`${r}${c}`)}else i.push(s)}return i}function yo(e,t){const i=[...e];switch(t){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Fi={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function xs(e){if(!e)return;const t=e.toLowerCase().trim();return Fi[t]?Fi[t]:le.find(o=>o.name.toLowerCase()===t||o.instrument.toLowerCase()===t)?.name}function ys(e){if(!e)return;const t=e.toLowerCase().trim();return t.includes("strum")?"Strum":t.includes("descend")?"Descending Arp":t.includes("half")?"Half-time":t.includes("swing")||t.includes("broken")?"Broken (swing)":t.includes("offbeat")||t.includes("ska")||t.includes("syncopat")||t.includes("groove")?"Off-beat / Ska":t.includes("triplet")||t.includes("fast")?"Fast Triplet":t.includes("arp")||t.includes("cascade")?"Arpeggio":t.includes("block")||t.includes("pad")||t.includes("sustained")?"Block chords":Ne.find(o=>o.name.toLowerCase()===t)?.name??"Block chords"}function ws(e,t=.7,i,o="piano",s){try{Promise.all([io(),vo()]).then(()=>{const n=ms(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof n.set=="function"&&n.set(s)}catch(v){console.warn("Failed to apply customConfig to Tone.js instrument:",v)}const r=e.length,c=r<=1?1:Math.max(.4,1/Math.sqrt(r)),d=yi();if(i&&i.arpMode&&i.arpMode!=="off"){const v=i.bpm??80,b=i.arpRate??"1/16",f=i.arpRange??1,l=i.arpMode,h=bo(b,v),m=xo(e,f),y=yo(m,l),w=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*c:c,k=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,h*.9);y.forEach((E,N)=>{const _=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;n.triggerAttackRelease(E,k,d+N*h+_,w())});return}const p=o==="guitar"||o==="jazz-guitar",u=o==="jazz-guitar";(p?[...e].sort((v,b)=>{try{return ni(v).toMidi()-ni(b).toMidi()}catch{return 0}}):e).forEach((v,b)=>{let f=0,l=c,h=t;if(i){const{minVelocity:m,maxVelocity:y,spread:w,microTiming:k,humanVariance:E,duration:N}=i;l=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(m+Math.random()*(y-m))/127)*c;const G=p?b*(u?.018:.024):0,J=b*(w??.3)*.1,V=(Math.random()-.5)*(k??0)*.05,Z=(Math.random()-.5)*(E??0)*.03;f=Math.max(0,G+J+V+Z),h=(N||t)*(1+(Math.random()-.5)*.2*(E??0))}else p&&(f=b*(u?.018:.024));p&&b===0&&(l=Math.min(1,l*(u?1.05:1.1))),n.triggerAttackRelease(v,h,d+f,l)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function wo(e,t){if(!Array.isArray(e)||e.length===0)return[];if(e.length<=1)return e;if(t<=25)return e.length<=2?e:[e[0],e[e.length-1]];if(t<=55)return e.length<=4?e:e.slice(0,4);if(t<=80)return e;const i=[...e],s=e[e.length-1].match(/^([A-G]#?)(-?\d+)$/);if(s){const n=parseInt(s[2],10);i.push(`${s[1]}${n+1}`)}return i}function Pi(e,t,i){const o=t==="Unknown"||!t?"Pop":t,s=i?.instrument?be(i.instrument):void 0,n=s?le.find(h=>h.name.toLowerCase()===s.toLowerCase()):void 0,r=i?.playStyle?Ne.find(h=>h.name===i.playStyle):void 0,c=n?.instrument??tt[o]??"piano",d=wi[o]||{},p=r?.patch??{};i?.feelSettings?.tone&&Pe(i.feelSettings.tone);const u={};if(i?.feelSettings){const{spread:h,swing:m,humanState:y}=i.feelSettings;y?Object.assign(u,y):(typeof h=="number"&&(u.spread=parseFloat((h/100*1.5).toFixed(2))),typeof m=="number"&&(u.microTiming=parseFloat((m/100*.9).toFixed(2)),u.humanVariance=parseFloat((m/100*.6).toFixed(2))))}const a={...d,...p,...u,bpm:i?.bpm??d.bpm??90,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},v=i?.duration??d.duration??.9,b=p.durationMultiplier?v*p.durationMultiplier:v,f=i?.feelSettings?.density??50,l=wo(e,f);ws(l,b,a,c,i?.customConfig)}let Kt=null;function ks(){if(!Kt){const e=ao();Kt=new me({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(e)}return Kt}function Ss(e,t=.8,i,o=.85){try{Promise.all([io(),vo()]).then(()=>{const s=ks(),r=`${e.replace(/\d+$/,"")}1`,c=typeof i=="number"?i:yi();s.triggerAttackRelease(r,t,c,o)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function Is(e,t="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,s=(Array.isArray(e)?e:[]).filter(p=>typeof p=="string"&&p.trim().length>0).map(p=>p.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let n=o,r=i[s[0]]??0;const c=[];s.forEach((p,u)=>{const a=i[p]??0;u>0&&a<=r&&n++,c.push({name:p,oct:n}),r=a});const d=(t||"").toLowerCase();if(d.includes("octave")||d.includes("high"))return c.map(p=>`${p.name}${p.oct+1}`);if(d.includes("inversion")||d.includes("1st")){if(c.length>1){const[p,...u]=c;return[...u.map(a=>`${a.name}${a.oct}`),`${p.name}${p.oct+1}`]}return c.map(p=>`${p.name}${p.oct}`)}else return c.map(p=>`${p.name}${p.oct}`)}const $s=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Cs=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],P={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Ts=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Qe=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ce={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},Es=Object.keys(ce),ko={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},ai={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},ki={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},li={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function D(e,t){const i=(e%12+12)%12;return t?Cs[i]:$s[i]}function te(e){if(!e)return{root:"C",quality:"maj"};const t=e.trim(),i=t[0]?.toUpperCase();let o="C",s=t;if(i&&/[A-G]/.test(i)){const r=t[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(o=`${i}b`,s=t.slice(2)):r==="#"||r==="♯"||r==="♯"?(o=`${i}#`,s=t.slice(2)):(o=i,s=t.slice(1))}s=s.toLowerCase();let n="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?n="maj9":s.includes("min9")||s.includes("m9")?n="min9":s.includes("dom9")||s.includes("9sus")||s.includes("9")?s.includes("9sus")||s.includes("sus9")?n="sus9":n="dom9":s.includes("m(maj7)")||s.includes("mmaj7")||s.includes("minmaj7")?n="mmaj7":s.includes("maj7sus")||s.includes("7sus")?n="sus7":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?n="maj7":s.includes("min7")||s.includes("m7")?n="min7":s.includes("min6")||s.includes("m6")?n="min6":s.includes("maj6")||s.includes("6")&&!s.includes("m")?n="maj6":s.includes("dim7")?n="dim7":s.includes("dim")||s.includes("°")?n="dim":s.includes("aug")||s.includes("+")?n="aug":s.includes("sus2")?n="sus2":s.includes("sus4")||s.includes("sus")?n="sus4":s.includes("7")?n="dom7":s.includes("min")||s==="m"?n="min":n="maj",{root:o,quality:n}}const As=Object.keys(li),je={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Xe=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Ns={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},Ms={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Si={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},_e=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Ae(e){return(_e.find(t=>t.name===e)||_e[0]).dot}const Os={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function Ds(e,t){return 1+e.degrees.filter(i=>t.includes(i)).length*.6}function wt(e,t){const i=e.reduce((s,n)=>s+t(n),0);let o=Math.random()*i;for(const s of e)if(o-=t(s),o<=0)return s;return e[e.length-1]}function Bs(e){if(e.length)return e[Math.floor(Math.random()*e.length)]}const ci=4,Ge=1,we=8,Fs=1700,Ps={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function zs(e,t="MAJOR",i="Pop",o="Uplifting"){let n={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[e]??.1;return t.includes("MINOR")||t==="DORIAN"?(e==="SUBMEDIANT"&&(n*=1.4),e==="SUBTONIC"&&(n*=1.3)):t==="MIXOLYDIAN"?(e==="SUBTONIC"&&(n*=1.8),e==="SUBDOMINANT"&&(n*=1.5)):t==="LYDIAN"&&e==="SUPERTONIC"&&(n*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((e==="SUBDOMINANT"||e==="SUPERTONIC")&&(n*=2),e==="SUBMEDIANT"&&(n*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(e==="SUPERTONIC"&&(n*=2.5),e==="SUBDOMINANT"&&(n*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(e==="SUBDOMINANT"||e==="SUBMEDIANT")&&(n*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(e==="SUBTONIC"&&(n*=2.2),e==="SUBDOMINANT"&&(n*=1.8),e==="SUBMEDIANT"&&(n*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&e==="TONIC"&&(n*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?e==="TONIC"&&(n*=2.5):o==="Melancholy"||o==="Dark"?(e==="SUBMEDIANT"&&(n*=2.2),e==="SUPERTONIC"&&(n*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(e==="SUBDOMINANT"&&(n*=2),e==="SUBMEDIANT"&&(n*=1.6),e==="MEDIANT"&&(n*=1.4)):o==="Tense"?(e==="SUPERTONIC"||e==="SUBDOMINANT")&&(n*=1.8):(o==="Groovy"||o==="Energetic")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(n*=1.8),(Si[o]||[]).includes(e)&&(n*=1.3),Math.max(.01,n)}function Xt(e,t,i="MAJOR",o="Pop",s="Uplifting"){if(e===t)return .05;let r=(Ps[e]||{})[t]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(e==="TONIC"&&t==="SUBMEDIANT"&&(r*=1.5),e==="SUBMEDIANT"&&t==="MEDIANT"&&(r*=1.4),e==="MEDIANT"&&t==="SUBTONIC"&&(r*=1.4),e==="SUBTONIC"&&t==="TONIC"&&(r*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(e==="SUPERTONIC"&&t==="DOMINANT"&&(r*=1.8),e==="DOMINANT"&&t==="TONIC"&&(r*=1.5),e==="TONIC"&&t==="SUPERTONIC"&&(r*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(r*=1.5),(Si[s]||[]).includes(t)&&(r*=1.5),Math.max(.01,r)}function Ls(e,t,i,o,s,n,r=ci){let c=i.filter(a=>e.degrees[a]);c.length||(c=i);const d=wt(c,a=>zs(a,e.type,s,n))||"TONIC",p=[d];let u=d;for(let a=1;a<r;a++){const v=a===r-1;let b=i.filter(h=>e.degrees[h]);b.length||(b=i);const f=b.filter(h=>h!==u),l=f.length?f:b;if(v){const h=wt(l,m=>{const y=Xt(m,p[0],e.type,s,n),w=Xt(u,m,e.type,s,n);return y*w});p.push(h)}else{const h=l.filter(w=>!p.includes(w)),m=h.length?h:l,y=wt(m,w=>Xt(u,w,e.type,s,n));u=y,p.push(y)}}return p}function $t(e,t,i){return e.includes("b")||e==="F"||e==="Bb"||e==="Eb"||e==="Ab"||e==="Db"||e==="Gb"?!0:e.includes("#")?!1:i}function Y(e,t){const{root:i,quality:o}=te(e),s=P[i]??0,n=ce[o]||ce.maj,r=$t(i,o,t);return n.map(c=>D(s+c,r))}async function Us(){const e=typeof import.meta<"u"?"./":"/",t=e.endsWith("/")?e:`${e}/`,i=`${t}chroma_chords_data.json`,o=`${t}chord_voyager_data.json`;let s=await fetch(i).catch(()=>null);if((!s||!s.ok)&&(s=await fetch(o).catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chroma_chords_data.json").catch(()=>null)),(!s||!s.ok)&&(s=await fetch("/chord_voyager_data.json").catch(()=>null)),!s||!s.ok){const r=new URL("./chroma_chords_data.json",import.meta.url).href;s=await fetch(r)}if(!s.ok)throw new Error(`HTTP error: ${s.status}`);const n=await s.json();return Hs(n),n}const Rs={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},js={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},_s={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Gs={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Vs={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},qs={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Hs(e){const t=[["MIXOLYDIAN",Rs],["DORIAN",js],["LYDIAN",_s]];for(const[i,o]of t)for(const[s,n]of Object.entries(o)){const r=e.scales[`${n}_MAJOR`];if(!r)continue;const c=`${s}_${i}`,d={};for(const p of qs[i]){const u=Vs[`${i}_${p}`],a=r.degrees[u];if(!a)continue;const v=JSON.parse(JSON.stringify(a));v.next_chord_options=(v.next_chord_options||[]).map(b=>{if(b.nodeId.startsWith(`${n}_MAJOR_`)){const f=b.nodeId.replace(`${n}_MAJOR_`,""),l=Gs[`${i}_${f}`];if(l)return{name:b.name,nodeId:`${s}_${i}_${l}`}}return b}),d[p]=v}e.scales[c]={root:s,type:i,degrees:d}}}const Ys=[156,192,236],Js=[242,115,95];function kt(e,t,i){return e+(t-e)*i}function Ve(e){const t=Math.max(0,Math.min(1,e));return"#"+Ys.map((o,s)=>Math.round(kt(o,Js[s],t))).map(o=>o.toString(16).padStart(2,"0")).join("")}function ee(e){const t=Math.max(0,Math.min(1,e));return{size:Math.round(kt(84,128,t)),radius:Math.round(kt(40,12,t)),fontSize:Math.round(kt(21,30,t)),color:Ve(t)}}function So(e,t,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[e]||`${i} colors the progression as the ${e.toLowerCase()} of ${t}.`}function Io(e,t,i,o){const n=i.degrees[t].chord_name,r=ki[t]??.5,c=li[i.type]||li.MAJOR;return{name:zi(n),tag:ko[t]||"move",roman:c[t]||"?",color:Ve(r),functionLabel:ai[t]||t,notes:Y(n,o),scaleLabel:`${i.root} ${je[i.type]||i.type}`,desc:So(ai[t]||t,je[i.type]||i.type,zi(n)),degree:t,scaleKey:e,tension:r}}function zi(e){const{root:t,quality:i}=te(e);return`${t}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const Ws={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function $o(e,t){let i=Ws[e]||92;return t==="Tense"&&(i+=6),(t==="Dreamy"||t==="Melancholy")&&(i-=6),i}function di(e,t,i,o){const s=Math.max(Ge,Math.min(we,o?.length??ci)),n=Ns[t]||"MAJOR",r=Ms[i],c=o?.scaleType||(r&&n==="MAJOR"?r:n);let d=o?.key&&Qe.includes(o.key)?o.key:Bs(Qe),p=`${d}_${c}`;e.scales[p]||(d="C",p=`${d}_${c}`);let u=e.scales[p];if(!u){const w=Object.keys(e.scales).find(k=>k.endsWith(`_${c}`))||Object.keys(e.scales)[0];u=e.scales[w],d=u?u.root:"C",p=w}const a=j(d,c),v=Object.keys(u.degrees),b=Si[i]||[],f=Os[c]||[],l=s===ci?f.filter(w=>w.degrees.every(k=>v.includes(k))):[],y=(l.length&&Math.random()<.25?wt(l,w=>Ds(w,b)).degrees:Ls(u,p,v,b,t,i,s)).map(w=>Io(p,w,u,a));return{genre:t,mood:i,key:d,scaleType:c,bpm:$o(t,i),chords:y}}const Ks={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},Xs={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function Co(e){return ce[e]?e:te(`C${e||""}`).quality}function To(e,t){return t==="dom7"?`${e}7`:t==="maj7"?`${e}maj7`:t==="min7"?`${e}7`:t==="dim"?`${e}°`:t==="dim7"?`${e}°7`:t==="aug"?`${e}+`:t==="sus4"?`${e}sus4`:t==="sus2"?`${e}sus2`:t==="dom9"?`${e}9`:t==="maj9"?`${e}maj9`:t==="min9"?`${e}m9`:e}function Eo(e,t){const i=Ks[e]||{upper:"I",lower:"i"},s=t==="min"||t==="min7"||t==="dim"||t==="dim7"||t==="min9"?i.lower:i.upper;return To(s,t)}function Ii(e,t){const i=Xs[(e%12+12)%12]||{upper:"?",lower:"?"},s=t==="min"||t==="min7"||t==="dim"||t==="dim7"||t==="min9"?i.lower:i.upper;return To(s,t)}function Qs(e,t,i,o){const s=t==="maj"||t==="dom7"||t==="dom9",n=t==="min"||t==="min7"||t==="min9";if(e==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(e==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(e==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(e==="TONIC"&&t==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(e==="SUBDOMINANT"&&n)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=ki[e]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${o.root} ${je[o.type]||o.type} progression.`}}function $i(e,t,i,o){const s=(e%12+12)%12,n=(P[i]??0)+s,c=`${D(n,o)}${Ci[t]??t}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${c} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${c} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${c} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${c} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${c} borrows its color from outside the current key.`}}function Zs(e,t,i,o,s){const n=i.degrees[t],{root:r}=te(n.chord_name),c=P[r]??0,d=D(c,s),p=`${d}${Ci[o]??o}`,u=$t(d,o,s),a=ce[o]?ce[o].map(f=>D(c+f,u)):Y(n.chord_name,s),v=Eo(t,o),b=Qs(t,o,p,i);return{name:p,tag:b.tag,roman:v,color:Ve(b.tension),functionLabel:b.functionLabel,notes:a,scaleLabel:`${i.root} ${je[i.type]||i.type}`,desc:b.desc,degree:t,scaleKey:e,tension:b.tension}}function en(e,t,i,o,s,n){const r=`${t}_${i}`,c=e.scales[r];if(!c||!o.length)return null;const d=j(t,i),p=P[t]??0,u={};Object.entries(c.degrees).forEach(([v,b])=>{const{root:f}=te(b.chord_name),l=P[f]??0;l in u||(u[l]=v)});const a=o.slice(0,we).map(({root:v,quality:b})=>{const f=P[v]??p,l=u[f],h=Co(b);if(l){const k=c.degrees[l],{quality:E}=te(k.chord_name);return h===E||!b&&E?Io(r,l,c,d):Zs(r,l,c,h,d)}const m=(f-p+12)%12,y=$i(m,h,t,d),w=Ii(m,h);return tn(t,m,h,y.functionLabel,w,y.tag,d)});return a.length<Ge?null:{genre:s,mood:n,key:t,scaleType:i,bpm:$o(s,n),chords:a}}const Ci={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function tn(e,t,i,o,s,n,r){const c=(P[e]??0)+t,d=D(c,r),p=Co(i),u=`${d}${Ci[p]??p}`,a=$t(d,p,r),v=(ce[p]||ce.maj).map(l=>D(c+l,a)),b=s==="?"?Ii(t,p):s,f=.42;return{name:u,tag:n,roman:b,color:Ve(f),functionLabel:o==="Borrowed"?$i(t,p,e,r).functionLabel:o,notes:v,scaleLabel:"Borrowed",desc:`${u} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:f}}function pi(e){const t=e.match(/^[A-Ga-g][#b]?/),i=t?t[0]:"C";return i[0].toUpperCase()+i.slice(1)}function on(e){const t=(e||"C").trim(),i=t[0]?.toUpperCase()||"C";let o=i,s=t.slice(1);if(t.length>1){const n=t[1];n==="b"||n==="B"||n==="♭"||n==="♭"?(o=`${i}b`,s=t.slice(2)):(n==="#"||n==="♯"||n==="♯")&&(o=`${i}#`,s=t.slice(2))}return{root:o,suffix:s}}function sn(e,t,i){const{root:o,suffix:s}=on(e),n=o.replace("♭","b").replace("♯","#"),c=(((P[n]??0)+t)%12+12)%12;return`${D(c,i)}${s}`}function nn(e,t,i){if(!e||!e.chords||e.chords.length===0)return e;const o=/\bmin\b|minor/i.test(t)||/\b[A-G][#b]?m\b/.test(t),s=/\bmaj\b|major/i.test(t),n=o&&!s,r=t.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),c=n?"NATURAL_MINOR":s?"MAJOR":e.scaleType||"MAJOR",d=r,p=(e.key||"C").replace("♭","b").replace("♯","#").trim(),u=P[p]??0,a=P[d]??0,v=((a-u)%12+12)%12,b=j(d,c),f=`${d}_${c}`,l={TONIC:0,SUPERTONIC:2,MEDIANT:c.includes("MINOR")||c==="DORIAN"?3:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:c==="MAJOR"||c==="DORIAN"?9:8,SUBTONIC:10,"LEADING-TONE":11},h=e.chords.map(m=>{const y=sn(m.name,v,b),{root:w,quality:k}=te(y),N=(((P[w]??0)-a)%12+12)%12;let _=null;for(const[q,pe]of Object.entries(l))if(pe===N){_=q;break}let G,J,V=m.tag||"move",Z=m.tension,X=m.degree;if(_)X=_,G=Eo(X,k),J=ai[X]||X,V=ko[X]||V,Z=ki[X]??Z;else{X="BORROWED",G=Ii(N,k);const q=$i(N,k,d,b);J=q.functionLabel,V=q.tag||V,Z=q.tension||.45}const T=Y(y,b);return{...m,name:y,roman:G,functionLabel:J,tag:V,notes:T,degree:X,scaleKey:f,scaleLabel:`${d} ${je[c]||c}`,desc:So(J,je[c]||c,y),tension:Z}});return{...e,key:d,scaleType:c,chords:h}}const Li={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Ao(e,t,i,o){const s=P[e]??0;let n=Li[t]||Li.Major;return i==="6th"?n=[...n,9]:i==="7th (dom / m7)"?n=[...n,10]:i==="Major 7th (M7)"?n=[...n,11]:i==="9th"&&(n=[...n,10,14]),n.map(r=>D(s+r,o))}const rn={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},an={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function No(e,t,i){return t==="Minor"&&i==="Major 7th (M7)"?`${e}m(maj7)`:`${e}${rn[t]??""}${an[i]??""}`}const ln={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},Mo={};Qe.forEach(e=>{Mo[P[e]]=e});function cn(e,t){const i=ln[t]??0,s=(((P[e]??0)-i)%12+12)%12;return Mo[s]??"C"}function j(e,t){const i=cn(e,t);return Ts.has(i)||i.includes("b")}function Ui(e,t,i){const o=pi(e.name),s=o.includes("b"),n=No(o,t,i),r=Ao(o,t,i,s);let c=e.roman||"";if(c){const u=c.match(/^([♭♯b#]*)([ivxIVX]+)/);if(u){const a=u[1],v=u[2],b=t==="Minor"||t==="Diminished",f=b?v.toLowerCase():v.toUpperCase();let l="";t==="Diminished"?l=i==="7th (dom / m7)"?"°7":"°":t==="Suspended (sus)"?l="sus4":i==="6th"?l="6":i==="7th (dom / m7)"?l="7":i==="Major 7th (M7)"?l=b?"m(maj7)":"maj7":i==="9th"&&(l=b?"m9":"maj9"),c=`${a}${f}${l}`}}let d=e.tension??1;t==="Diminished"?d=Math.max(d,3):t==="Suspended (sus)"?d=Math.max(d,2):i==="7th (dom / m7)"?d=Math.max(d,2.5):(i==="9th"||i==="Major 7th (M7)")&&(d=Math.max(d,2));const p=Ve(d);return{...e,name:n,notes:r,roman:c,tension:d,color:p}}function L(e,t,i,o,s,n,r,c){const d=No(e,t,i),p=Ao(e,t,i,c);return{name:d,tag:o||"sub",roman:o,color:Ve(r),functionLabel:s,notes:p,scaleLabel:"Substitution",desc:n,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function Ti(e,t,i){const o=P[t.key]??0,s=t.scaleType.includes("MINOR"),n=j(t.key,t.scaleType),r=s?[(()=>{const u=D(o+1,!0),a=L(u,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:a.name,roman:"♭II",notes:a.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:a,tension:.6}})(),(()=>{const u=D(o+5,!0),a=L(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:a.name,roman:"iv",notes:a.notes,sub:"the minor subdominant — deeper minor mood",chord:a,tension:.45}})(),(()=>{const u=D(o+10,!0),a=L(u,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:a.name,roman:"v",notes:a.notes,sub:"a step further into shadow — unresolving drift",chord:a,tension:.52}})()]:[(()=>{const u=D(o+8,!0),a=L(u,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${t.key} minor — the cinematic shadow`,.5,!0);return{name:a.name,roman:"♭VI",notes:a.notes,sub:`borrowed from ${t.key} minor — the cinematic shadow`,chord:a,tension:.5}})(),(()=>{const u=D(o+5,!0),a=L(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:a.name,roman:"iv",notes:a.notes,sub:"the minor subdominant — softer, sadder",chord:a,tension:.42}})(),(()=>{const u=D(o+3,!0),a=L(u,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:a.name,roman:"♭III",notes:a.notes,sub:"a step further out — cooler, more remote",chord:a,tension:.58}})()],c=[(()=>{const u=D(o+7,n),a=D(o+2,n),v=L(a,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${u}7 — sharpens the approach`,.82,n);return{name:v.name,roman:"V7/V",notes:v.notes,sub:`aimed at ${u}7 — sharpens the approach`,chord:v,tension:.82}})(),(()=>{const u=D(o+(s?3:9),n),a=D(o+4,n),v=L(a,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${u}m7 — makes it feel arrived at`,.88,n);return{name:v.name,roman:"V7/vi",notes:v.notes,sub:`aimed at ${u}m7 — makes it feel arrived at`,chord:v,tension:.88}})(),(()=>{const u=D(o+1,!0),a=L(u,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:a.name,roman:"subV7",notes:a.notes,sub:"a tritone substitute — slides in sideways",chord:a,tension:.95}})()],d=[(()=>{const u=D(o+5,n),a=L(u,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,n);return{name:a.name,roman:"IV",notes:a.notes,sub:"floats rather than resolving",chord:a,tension:.3}})(),(()=>{const u=D(o,n),a=L(u,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,n);return{name:a.name,roman:s?"im9":"Imaj9",notes:a.notes,sub:"the same home with more air in it",chord:a,tension:.18}})(),(()=>{const u=D(o+(s?3:4),n),a=L(u,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,n);return{name:a.name,roman:s?"♭III":"iii",notes:a.notes,sub:"wistful, halfway between home and away",chord:a,tension:.35}})()],p=[(()=>{const u=D(o,n),a=L(u,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,n);return{name:a.name,roman:s?"i":"I",notes:a.notes,sub:"full resolution — the sense of arriving",chord:a,tension:.05}})(),(()=>{const u=D(o+7,n),a=L(u,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,n);return{name:a.name,roman:"V7",notes:a.notes,sub:"the pull that makes home feel earned",chord:a,tension:1}})(),(()=>{const u=D(o+(s?8:9),n),a=L(u,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,n);return{name:a.name,roman:s?"♭VI":"vi",notes:a.notes,sub:"a soft landing instead of a full stop",chord:a,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:c},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:d},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:p}]}function Oo(e,t,i){const o=P[t.key]??0,s=t.scaleType.includes("MINOR"),n=j(t.key,t.scaleType),r=t.chords;if(s){const l=r[0]?.name||"chord 1",h=r[1]?.name||"chord 2",m=r[2]?.name||"chord 3",y=r[3]?.name||"chord 4",w=L(D(o,n),"Major","None","I","Major tonic","same root, turned bright",.2,n),k=L(D(o+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n),E=L(D(o+9,n),"Minor","None","vi","Submediant","melodic lift upward",.4,n),N=L(D(o+11,n),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,n);return[{name:w.name,sub:`in place of ${l} · same root, turned bright`,roman:"I",notes:w.notes,chord:w,tension:.2},{name:k.name,sub:`in place of ${h} · the Dorian lift, sunny and open`,roman:"IV",notes:k.notes,chord:k,tension:.35},{name:E.name,sub:`in place of ${m} · melodic lift upward`,roman:"vi",notes:E.notes,chord:E,tension:.4},{name:N.name,sub:`in place of ${y} · classical harmonic pull`,roman:"vii°",notes:N.notes,chord:N,tension:.55}]}const c=r[0]?.name||"chord 1",d=r[1]?.name||"chord 2",p=r[2]?.name||"chord 3",u=r[3]?.name||"chord 4",a=L(D(o,n),"Minor","None","i","Tonic minor","same root, turned sad",.3,n),v=L(D(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),b=L(D(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),f=L(D(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:a.name,sub:`in place of ${c} · same root, turned sad`,roman:"i",notes:a.notes,chord:a,tension:.3},{name:v.name,sub:`in place of ${d} · the lift, but heavier`,roman:"iv",notes:v.notes,chord:v,tension:.4},{name:b.name,sub:`in place of ${p} · big and cinematic`,roman:"♭VI",notes:b.notes,chord:b,tension:.45},{name:f.name,sub:`in place of ${u} · lands sideways, not home`,roman:"♭VII",notes:f.notes,chord:f,tension:.5}]}function dn(e,t,i){return Ti(e,t).map(s=>{const n=s.rows[0];return{label:s.name,sub:s.sub,chord:n.chord,functionCaption:`${n.roman} · ${n.notes.join(" · ")}`,rationale:n.sub}})}const pn={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},hn={m8:43303,circuit:43302};function un(e,t,i){let o=pn[t];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${hn[t]}/`);const n=(i&&i.length>0?i.map(r=>e.chords[r]).filter(r=>!!r):e.chords).map(r=>encodeURIComponent(r.name)).join("+");return`${o}?p=${n}`}const gn={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function mn(e,t){const{root:i,quality:o}=te(e),s=P[i]??0,n=ce[o]||ce.maj,r=$t(i,o,t);return n.map(c=>{const d=D(s+c,r),p=gn[c]||{symbol:`+${c}`,name:`Interval ${c}`,isGuideTone:!1};return{note:d,intervalSymbol:p.symbol,roleName:p.name,isGuideTone:p.isGuideTone}})}function fn(e){if(!e||e.length<2)return[];const t=[],i=o=>o.replace(/[^A-Za-z♭♯]/g,"");for(let o=0;o<e.length;o++){const s=o,n=(o+1)%e.length,r=e[s],c=e[n],d=i(r.roman),p=i(c.roman),u=s+1,a=n+1,v=`Bar ${u} → ${a}`,b=`${r.name} → ${c.name}`,f=`${r.roman}–${c.roman}`;(d==="V"||d==="v")&&(p==="I"||p==="i")?t.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${c.name} (${r.roman}–${c.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name}):(d==="IV"||d==="iv")&&(p==="I"||p==="i")?t.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${c.name} (${r.roman}–${c.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name}):(d==="V"||d==="v")&&(p==="vi"||p==="♭VI"||p==="VI")?t.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${c.name} (${r.roman}–${c.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name}):d==="♭VII"&&(p==="I"||p==="i")?t.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${c.name} (♭VII–${c.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name}):(p==="V"||p==="v")&&d!=="V"&&d!=="v"?t.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${c.name} (${r.roman}–${c.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name}):r.functionLabel==="Secondary Dominant"&&t.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${c.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${c.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${c.name}.`,move:b,degrees:f,bars:v,fromBar:u,toBar:a,fromChord:r.name,toChord:c.name})}return t}function vn(e){if(!e||e.length<2)return[];const t=[];for(let i=0;i<e.length;i++){const o=i,s=(i+1)%e.length,n=e[o],r=e[s],c=new Set(n.notes.map(h=>P[h]??0)),d=r.notes.filter(h=>c.has(P[h]??-1)),p=P[pi(n.name)]??0,u=P[pi(r.name)]??0,a=Math.min((u-p+12)%12,(p-u+12)%12);let v="Harmonic Shift";d.length>=2?v=`Strong Common Tones (${d.length} shared)`:a<=2?v="Stepwise Bass Motion":(a===5||a===7)&&(v="4th / 5th Cycle Jump");const b=`Bar ${o+1} → ${s+1}`,f=`${n.name} → ${r.name}`,l=d.length?`${d.join(" · ")} held over`:a<=2?"Bass steps by a tone":"No shared notes";t.push({fromBar:o+1,toBar:s+1,fromChord:n.name,toChord:r.name,move:b,chords:f,link:l,hasShared:d.length>0,commonNotes:d,semitoneDistance:a,motionType:v})}return t}function hi(e,t=4){const i=Array.isArray(e)?e.filter(a=>typeof a=="string"&&a.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(a=>a.replace(/\d+$/,"")),n=s[0],r=o[n]??0;let c=t,d=r;const p=[];return s.forEach((a,v)=>{const b=o[a]??0;v>0&&b<=d&&c++,p.push(`${a}${c}`),d=b}),[`${n}${t-1}`,...p]}class bn{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setSubBassEnabled(t){this.subBassEnabled=t}isSubBassEnabled(){return this.subBassEnabled}setProgression(t,i){this.mode="single",this.progression=t,t?this.order=i||Array.from({length:t.chords.length},(o,s)=>s):this.order=[]}setSong(t){this.mode="song",this.sections=t,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((t,i)=>t+i.order.length,0):this.order.length}setOrder(t,i){this.order=t,typeof i=="number"&&(this.activeIndex=i)}setInstrument(t){this.instrument=t}setPlayStyle(t){this.playStyle=t}setBpm(t){const i=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(t){this.barsPerChord=Math.max(1,t),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(t){this.feelSettings={...this.feelSettings,...t}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const t=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,t)),o=Math.max(1,this.barsPerChord);return Math.round(o*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(t){return this.tickCallbacks.add(t),()=>this.tickCallbacks.delete(t)}notifyTick(){const t=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,t,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,t,!1))}updateSongStepState(t){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(t<i+s){this.activeSectionIndex=o;const n=t-i;this.activeIndex=this.sections[o].order[n]??0,this.progressStep=n;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay();const t=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},t)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(t,i,o="before"){t==null?this.abOverride=null:typeof t=="object"?this.abOverride=t:this.abOverride={index:t,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const t=this.sections[this.activeSectionIndex];if(!t)return;const i=this.activeIndex,o=t.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:Y(o.name,j(t.progression.key,t.progression.scaleType)),n=hi(s,4);Pi(n,t.progression.genre,{bpm:t.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0,feelSettings:this.feelSettings})}}else{if(!this.progression)return;const t=this.order[this.activeIndex]??0;let i=this.progression.chords[t];if(this.abOverride&&this.abOverride.index===t&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",n=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";o=Y(s,j(n,r))}this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&Ss(o[0],1.4)}}}auditionChord(t,i=.8){if(!t)return;let o=Array.isArray(t.notes)?t.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=t.name||"CMAJ",n=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";o=Y(s,j(n,r))}this.playChordNotes(o,i)}playChordAtIndex(t,i=.8,o,s){if(!this.progression||!this.progression.chords[t])return;const n=this.progression.chords[t];let r=Array.isArray(n.notes)?n.notes:[];if(r.length===0||!r.every(c=>typeof c=="string"&&c.trim().length>0)){const c=n.name||"CMAJ",d=this.progression.key||"C",p=this.progression.scaleType||"MAJOR";r=Y(c,j(d,p))}this.playChordNotes(r,i,o,s)}playChordNotes(t,i,o,s){if(!this.progression)return;const n=Array.isArray(t)?t.filter(c=>typeof c=="string"&&c.trim().length>0):[];if(n.length===0)return;const r=o?Is(n,o):hi(n,4);Pi(r,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0,velocity:s,feelSettings:this.feelSettings})}jumpToStep(t){!this.progression||this.order.length<=0||(this.activeIndex=t%this.order.length,this.progressStep=t%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(t){!this.progression||this.order.length<=0||(this.activeIndex=t%this.order.length,this.progressStep=t%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const S=new bn,xn=_e.map(e=>e.name),yn=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function wn(e,t){const i=e.length+1,o=t.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let n=0;n<i;n++)s[n][0]=n;for(let n=0;n<o;n++)s[0][n]=n;for(let n=1;n<i;n++)for(let r=1;r<o;r++)s[n][r]=e[n-1]===t[r-1]?s[n-1][r-1]:1+Math.min(s[n-1][r-1],s[n-1][r],s[n][r-1]);return s[i-1][o-1]}function Ee(e,t){if(typeof e!="string")return null;const i=e.trim();if(!i)return null;const o=i.toLowerCase(),s=t.find(d=>d.toLowerCase()===o);if(s)return s;let n=null,r=1/0;for(const d of t){const p=wn(o,d.toLowerCase());p<r&&(r=p,n=d)}const c=Math.max(2,Math.floor(o.length*.4));return r<=c?n:null}function kn(e){if(!Array.isArray(e))return;const t=[];for(const i of e){if(!i||typeof i!="object")continue;const o=i,s=Ee(o.root,Qe),n=Ee(o.quality,Es);s&&n&&t.push({root:s,quality:n})}if(t.length)return t.slice(0,we)}function Sn(e){if(!e||typeof e!="object"||Array.isArray(e))return;const t=e,i=Ee(t.presetId,yn)??(typeof t.presetId=="string"&&t.presetId.trim()?t.presetId.trim():void 0);if(!i)return;const o=t.customConfig&&typeof t.customConfig=="object"&&!Array.isArray(t.customConfig)?t.customConfig:void 0;return{presetId:i,customConfig:o}}function Qt(e,t){const i=e&&typeof e=="object"?e:{},o=Ee(i.genre,Xe)??t.genre,s=Ee(i.mood,xn)??t.mood,n=Ee(i.key,Qe)??void 0,r=Ee(i.scaleType,As)??void 0,c=n&&r?kn(i.chords):void 0;let d;typeof i.length=="number"&&Number.isFinite(i.length)&&(d=Math.max(Ge,Math.min(we,Math.round(i.length))));const p=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,u=Sn(i.instrumentConfig),a=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:n,scaleType:r,length:d,chords:c,rhythmStyle:p,instrumentConfig:u,_rateLimit:a}}const In=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],ui=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Do="chroma-chords-llm-provider",Bo="chroma-chords-llm-model";function Fo(){const e=localStorage.getItem(Do);return e==="opencodeai"||e==="anthropic"||e==="openrouter"||e==="google"?e:"google"}function $n(e){localStorage.setItem(Do,e)}function Po(){const e=localStorage.getItem(Bo);return e?e==="gemini-1.5-flash"||e==="gemini-2.0-flash"||e==="gemini-2.5-flash"||e==="gemini-3.5-flash"||e==="gemini-1.5-pro"?"gemini-3.1-flash-lite":e:ui[0].id}function Zt(e){localStorage.setItem(Bo,e)}const ei={genre:Xe[0],mood:_e[0].name},zo="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Cn=12e3;async function Tn(){try{const e=await fetch(zo);if(e.ok)return await e.json()}catch{}return null}const Lo={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Uo={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function St(e,t){const i=e.toLowerCase();let o=null,s=0;return Object.keys(t).forEach(n=>{const r=t[n].reduce((c,d)=>c+(i.includes(d)?1:0),0);r>s&&(s=r,o=n)}),o}function Ro(e){const t=St(e,Uo),i=St(e,Lo);return!t||!i?null:{genre:t,mood:i}}async function En(e){const t=new AbortController,i=setTimeout(()=>t.abort(),Cn);try{const s=await fetch(zo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e,provider:Fo(),model:Po()}),signal:t.signal}),n=await s.json().catch(()=>null);if(!s.ok||n&&typeof n=="object"&&"error"in n){const r=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${s.status}`,c=new Error(`Classifier request failed: ${r}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(c._rateLimit=n._rateLimit),c}return n}finally{clearTimeout(i)}}async function An(e){const t=e.trim(),i=t.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=t.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=St(s,Uo)??"Synthwave",r=St(s,Lo)??"Dreamy",c={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},d={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},p={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},u=p[n]||p._default,a=c[n]||"rhodes",v=d[n]||"slow_arpeggio",b={genre:n,mood:r,key:u.key,scaleType:u.scaleType,length:8,chords:u.chords,rhythmStyle:v,instrumentConfig:{presetId:a,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return Qt(b,{genre:n,mood:r})}const o=Ro(e);try{const s=await En(e);return Qt(s,o??ei)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const n=Qt(o??ei,ei);return s&&typeof s=="object"&&"_rateLimit"in s&&(n._rateLimit=s._rateLimit),n}}class Nn{static async resolvePrompt(t,i,o,s,n,r){let c=r||null,d=null,p=null;if(!c&&n&&n.trim().length>0)try{c=await An(n)}catch(v){console.warn("Failed to classify prompt via LLM/local fallback:",v)}const u=!!(c&&c.chords?.length&&c.key&&c.scaleType);let a=null;return u&&c&&c.chords&&c.key&&c.scaleType&&(a=en(t,c.key,c.scaleType,c.chords,c.genre||i,c.mood||o)),a||(a=di(t,i,o,{length:s})),u&&c&&(c.instrumentConfig?.presetId&&(d=xs(c.instrumentConfig.presetId)??null),c.rhythmStyle&&(p=ys(c.rhythmStyle)??null)),a.chords.length>s&&(a={...a,chords:a.chords.slice(0,s)}),n&&(a={...a,searchTerm:n}),{progression:a,instrument:d,playStyle:p,normalizedSuggestion:c}}}const mt=[{name:"Verse",desc:"Settled, familiar.",reorder:e=>Array.from({length:e},(t,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:e=>Array.from({length:e},(t,i)=>(i+Math.ceil(e/2))%e)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:e=>Array.from({length:e},(t,i)=>(i+1)%e)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:e=>Array.from({length:e},(t,i)=>e-1-i)},{name:"Outro",desc:"Settles back down.",reorder:e=>Array.from({length:e},(t,i)=>(i-1+e)%e)}];class Fe{static createInitialSong(t,i){const o=i||Array.from({length:t.chords.length},(s,n)=>n);return[{name:mt[0].name,desc:mt[0].desc,progression:t,order:o.slice()}]}static addSection(t,i){if(t.length>=mt.length)return{sections:t,activeIndex:t.length-1};const o=mt[t.length],s=o.reorder(i.chords.length),n={name:o.name,desc:o.desc,progression:i,order:s},r=[...t,n];return{sections:r,activeIndex:r.length-1}}static syncActiveSection(t,i,o,s){if(!t[i])return t;const n=[...t];return n[i]={...n[i],progression:o,order:s.slice()},n}}const H=4,ue=45e3,Ri="chroma_chords_capacity_v2";class Mn{constructor(){this.charges=H,this.rechargeNextSec=45,this.lastCapacityTime=Date.now(),this.timer=null,this.subscribers=new Set,this.init()}init(){try{if(typeof localStorage<"u"){const t=localStorage.getItem(Ri),i=Date.now();if(t){const o=JSON.parse(t),s=typeof o.charges=="number"?o.charges:H,n=typeof o.lastTime=="number"?o.lastTime:i;if(s<H){const r=Math.max(0,i-n),c=Math.floor(r/ue);this.charges=Math.min(H,s+c);const d=r%ue;this.rechargeNextSec=Math.max(1,Math.ceil((ue-d)/1e3)),this.lastCapacityTime=i-d}else this.charges=H,this.rechargeNextSec=45,this.lastCapacityTime=i}else this.charges=H,this.rechargeNextSec=45,this.lastCapacityTime=i}}catch{this.charges=H,this.rechargeNextSec=45}this.save(),this.startTimer()}save(){try{typeof localStorage<"u"&&localStorage.setItem(Ri,JSON.stringify({charges:this.charges,lastTime:this.lastCapacityTime}))}catch{}}startTimer(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(this.charges<H){const t=Date.now(),i=Math.max(0,t-this.lastCapacityTime);if(i>=ue){const s=Math.floor(i/ue);this.charges=Math.min(H,this.charges+s),this.lastCapacityTime=t-i%ue,this.save()}const o=(t-this.lastCapacityTime)%ue;this.rechargeNextSec=Math.max(1,Math.ceil((ue-o)/1e3))}else this.rechargeNextSec=45;this.notify()},1e3)}getState(){return{charges:this.charges,max:H,rechargeNextSec:this.rechargeNextSec}}getCharges(){return this.charges}getRechargeNextSec(){return this.rechargeNextSec}getCapacityMax(){return H}spendCharge(){return this.charges<=0?(this.notify(),!1):(this.charges===H&&(this.lastCapacityTime=Date.now()),this.charges-=1,this.save(),this.notify(),!0)}subscribe(t){return this.subscribers.add(t),t(this.getState()),()=>{this.subscribers.delete(t)}}notify(){const t=this.getState();this.subscribers.forEach(i=>{try{i(t)}catch(o){console.error("Error in CapacityService subscriber callback:",o)}})}}const gi=new Mn;var On=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,Q=(e,t,i,o)=>{for(var s=o>1?void 0:o?Dn(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&On(t,i,s),s};let K=class extends ne{constructor(){super(...arguments),this.compact=!1,this.hideCapacity=!1,this.isAdmin=!1,this.capacityCharges=4,this.capacityMax=4,this.rechargeNextSec=60,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeCapacity=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=F.subscribeProjects(()=>{this.savedCount=F.getProjects().length,this.syncStatus=F.getSyncStatus(),this.requestUpdate()}),this.unsubscribeCapacity=gi.subscribe(e=>{this.capacityCharges=e.charges,this.capacityMax=e.max,this.rechargeNextSec=e.rechargeNextSec,this.requestUpdate()}),this.savedCount=F.getProjects().length}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeCapacity&&this.unsubscribeCapacity()}toggleCapacityNote(e){e.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.accountMenuOpen=!1}toggleAccountMenu(e){e.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.showCapacityNote=!1}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}render(){const e=(this.userEmail||"U")[0].toUpperCase();return g`
      <div class="header-wrap">
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="24" height="24" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <div class="right-actions">
          ${this.isAuthenticated?g`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">${e}</button>
          `:g`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?g`
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
    `}};K.styles=se`
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
  `;Q([I({type:Boolean})],K.prototype,"compact",2);Q([I({type:Boolean})],K.prototype,"hideCapacity",2);Q([I({type:Boolean})],K.prototype,"isAdmin",2);Q([I({type:Number})],K.prototype,"capacityCharges",2);Q([I({type:Number})],K.prototype,"capacityMax",2);Q([I({type:Number})],K.prototype,"rechargeNextSec",2);Q([I({type:Boolean})],K.prototype,"isAuthenticated",2);Q([I({type:String})],K.prototype,"userEmail",2);Q([I({type:Number})],K.prototype,"savedCount",2);Q([I({type:String})],K.prototype,"syncStatus",2);Q([I({type:String})],K.prototype,"title",2);Q([x()],K.prototype,"accountMenuOpen",2);Q([x()],K.prototype,"showCapacityNote",2);K=Q([re("app-header")],K);var Bn=Object.defineProperty,Fn=Object.getOwnPropertyDescriptor,Ei=(e,t,i,o)=>{for(var s=o>1?void 0:o?Fn(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Bn(t,i,s),s};const mi=["bean","bird","cat","note"];function fi(e=.45){return{show:Math.random()<e,kind:mi[Math.floor(Math.random()*mi.length)]}}function vi(e){return e[Math.floor(Math.random()*e.length)]}class jo{constructor(t=7,i=1800){this.threshold=t,this.windowMs=i,this.count=0,this.lastClickAt=0}click(){const t=Date.now();return t-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=t,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const Pn={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Ze=class extends ne{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(e){if(e.has("kind")||e.has("scale")){const{width:t,height:i}=Pn[this.kind];this.style.width=`${t*this.scale}px`,this.style.height=`${i*this.scale}px`}}renderBean(){const e="#D98A54";return g`
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
    `}renderBird(){const e="#7C93A8",t="#E8A24A";return g`
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
    `}renderCat(){const e="#8FA888";return g`
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
    `}renderNote(){const e="#B7A6DE",t="#8672B0";return g`
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
    `}render(){const e=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return e?g`<div style="transform:scale(${this.scale}); transform-origin:top left;">${e}</div>`:no}};Ze.styles=se`
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
  `;Ei([I({type:String})],Ze.prototype,"kind",2);Ei([I({type:Number})],Ze.prototype,"scale",2);Ze=Ei([re("mascot-character")],Ze);var zn=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,Ai=(e,t,i,o)=>{for(var s=o>1?void 0:o?Ln(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&zn(t,i,s),s};const bi=3200;let et=class extends ne{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(e){e.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},bi))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?g`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${mi.map(e=>g`<mascot-character .kind=${e} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:no}};et.styles=se`
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
      animation: egg-pop ${bi}ms ease forwards;
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
      animation: egg-caption-pop ${bi}ms ease forwards;
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
  `;Ai([I({type:Number})],et.prototype,"trigger",2);Ai([x()],et.prototype,"visible",2);et=Ai([re("mascot-parade")],et);var Un=Object.defineProperty,Rn=Object.getOwnPropertyDescriptor,B=(e,t,i,o)=>{for(var s=o>1?void 0:o?Rn(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Un(t,i,s),s};const jn=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],_n=["#F2A79B","#9CC0EC","#F6D98B"],Gn=[6,3,12],ji=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],Vn=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],qn=["Warm","Melancholy","Nostalgic","Dreamy"],ti=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let M=class extends ne{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=fi(.35),this.mascotSlot=vi(jn),this.peekMascot=fi(.18),this.peekSide=vi(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.isGenerating=!1,this.currentProvider=Fo(),this.currentModel=Po(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=H,this.rechargeNextSec=45,this.showCapacityNote=!1,this.unsubscribeCapacity=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new jo,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const e=performance.now(),t=this.getBoundingClientRect(),i=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let o=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const s=this.shadowRoot?.querySelector(".divider-row");if(s){const c=s.getBoundingClientRect();c.top>t.top&&(o=c.top-t.top)}const n=this.jellyBodies,r=n.length;for(let c=0;c<r;c++){const d=n[c];if(d.vx+=Math.sin(e*6e-4*d.driftFreqX+d.driftPhaseX)*d.driftForce,d.vy+=Math.cos(e*7e-4*d.driftFreqY+d.driftPhaseY)*d.driftForce,this.mouseX!==null&&this.mouseY!==null){const a=d.x-this.mouseX,v=d.y-this.mouseY,b=Math.hypot(a,v);if(b<140&&b>0){const f=(1-b/140)*.12;d.vx+=a/b*f,d.vy+=v/b*f}}d.vx*=d.drag,d.vy*=d.drag;const p=Math.hypot(d.vx,d.vy);p>d.maxSpeed&&(d.vx=d.vx/p*d.maxSpeed,d.vy=d.vy/p*d.maxSpeed),d.x+=d.vx,d.y+=d.vy,d.angle+=d.vRot;const u=d.radius;d.x<u?(d.x=u,d.vx=Math.abs(d.vx)*d.restitution+.02,d.squishX=.88,d.squishY=1.12):d.x>i-u&&(d.x=i-u,d.vx=-Math.abs(d.vx)*d.restitution-.02,d.squishX=.88,d.squishY=1.12),d.y<u?(d.y=u,d.vy=Math.abs(d.vy)*d.restitution+.02,d.squishX=1.12,d.squishY=.88):d.y>o-u&&(d.y=o-u,d.vy=-Math.abs(d.vy)*d.restitution-.02,d.squishX=1.12,d.squishY=.88),d.squishX+=(1-d.squishX)*.08,d.squishY+=(1-d.squishY)*.08}for(let c=0;c<r;c++)for(let d=c+1;d<r;d++){const p=n[c],u=n[d],a=u.x-p.x,v=u.y-p.y,b=Math.hypot(a,v),f=p.radius+u.radius;if(b<f&&b>0){const l=f-b,h=a/b,m=v/b;p.x-=h*l*.4,p.y-=m*l*.4,u.x+=h*l*.4,u.y+=m*l*.4;const y=p.vx-u.vx,w=p.vy-u.vy,k=(h*y+m*w)/(p.mass+u.mass),E=.35;p.vx-=k*u.mass*h*E,p.vy-=k*u.mass*m*E,u.vx+=k*p.mass*h*E,u.vy+=k*p.mass*m*E;const N=.12;p.squishX=Math.max(.85,1-N*Math.abs(h)),p.squishY=Math.max(.85,1-N*Math.abs(m)),u.squishX=Math.max(.85,1-N*Math.abs(h)),u.squishY=Math.max(.85,1-N*Math.abs(m))}}if(this.shadowRoot)for(let c=0;c<r;c++){const d=n[c],p=this.shadowRoot.getElementById(`jelly-${d.id}`);p&&(p.style.transform=`translate3d(${d.x-d.radius}px, ${d.y-d.radius}px, 0) rotate(${d.angle}deg) scale(${d.squishX}, ${d.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(!this.isGenerating){if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}}spendCapacityCharge(){const e=gi.spendCharge();return e||(this.showCapacityNote=!0),e}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*ti.length),this.loadingTimer=setInterval(()=>{let e=Math.floor(Math.random()*ti.length);e===this.loadingMsgIdx&&(e=(e+1)%ti.length),this.loadingMsgIdx=e},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(e){this.currentProvider=e,$n(e),e==="google"?(this.currentModel=ui[0].id,Zt(this.currentModel)):e==="opencodeai"&&(this.currentModel=In[0].id,Zt(this.currentModel))}changeModel(e){this.currentModel=e,Zt(e)}initJellyBodies(){const e=this.getBoundingClientRect(),t=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let i=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const o=Math.min(i,400),s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],n=3,r=[];for(let c=0;c<n;c++){const d=s[c%s.length],p=d.r+30,u=p+Math.random()*Math.max(100,t-p*2),a=p+Math.random()*Math.max(50,o-p*2),v=.08+Math.random()*.18,b=.35+Math.random()*.25,f=.985,l=.006+Math.random()*.008,h=.35,m=Math.random()*Math.PI*2;r.push({id:c,shapeKey:d.key,width:d.r*2,height:d.r*2,x:u,y:a,vx:Math.cos(m)*v,vy:Math.sin(m)*v,maxSpeed:b,drag:f,driftForce:l,restitution:h,radius:d.r,mass:d.r*d.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=r}onFrameMouseMove(e){const t=this.getBoundingClientRect();this.mouseX=e.clientX-t.left,this.mouseY=e.clientY-t.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){Tn().then(e=>{e&&(e.google&&(this.googleLimit=e.google.limit,this.googleRemaining=e.google.remaining,this.googleCooldownSec=e.google.cooldownSeconds),e.openrouter&&(this.orLimit=e.openrouter.limit,this.orRemaining=e.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%ji.length},2800),this.unsubscribeCapacity=gi.subscribe(e=>{this.capacityCharges=e.charges,this.rechargeNextSec=e.rechargeNextSec,this.requestUpdate()}),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(e){super.updated(e),e.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.unsubscribeCapacity&&(this.unsubscribeCapacity(),this.unsubscribeCapacity=null),this.stopLoadingTimer()}selectGenre(e){this.dispatchEvent(new CustomEvent("genre-change",{detail:e,bubbles:!0,composed:!0}))}selectMood(e){this.dispatchEvent(new CustomEvent("mood-change",{detail:e,bubbles:!0,composed:!0}))}setLength(e){this.dispatchEvent(new CustomEvent("length-change",{detail:e,bubbles:!0,composed:!0}))}decLength(){this.length>Ge&&this.setLength(this.length-1)}incLength(){this.length<we&&this.setLength(this.length+1)}onFreeTextChange(e){this.freeText=e.target.value}applyBest(e){this.selectGenre(e.genre),this.selectMood(e.mood);const t={...e,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:t,bubbles:!0,composed:!0}))}renderJellySvg(e){switch(e){case"blob1":return g`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return g`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return g`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return g`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return g`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return g`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return g`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return g`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return g`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return g`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return g`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return g`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return g`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return g`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const e=Ae(this.mood);let t=Vn.filter(a=>Xe.includes(a));t.includes(this.genre)||(t=t.slice(0,-1).concat(this.genre));const i=Xe.filter(a=>!t.includes(a)),o=this.expandedGenre?t.concat(i):t,s=_e.map(a=>a.name);let n=qn.filter(a=>s.includes(a));n.includes(this.mood)||(n=n.slice(0,-1).concat(this.mood));const r=s.filter(a=>!n.includes(a)),d=(this.expandedMood?n.concat(r):n).map(a=>_e.find(v=>v.name===a)),p=this.freeText.trim(),u=p.length>2?Ro(p):null;return g`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <app-header
          hideCapacity
          .isAdmin=${this.isAdmin}
          .capacityCharges=${this.capacityCharges}
          .capacityMax=${H}
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
          ${this.jellyBodies.map(a=>g`
            <div class="jelly-shape-wrapper" id="jelly-${a.id}" style="transform: translate3d(${a.x-a.radius}px, ${a.y-a.radius}px, 0) rotate(${a.angle}deg) scale(${a.squishX}, ${a.squishY})">
              ${this.renderJellySvg(a.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?g`
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
            ${this.peekMascot.show?g`
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
                placeholder=${this.isGenerating?"Composing your chords...":ji[this.placeholderIdx]}
              />
              <button
                class="vibe-capacity-chip ${this.capacityCharges<=1?"low":""}"
                @click=${a=>{a.stopPropagation(),this.showCapacityNote=!this.showCapacityNote}}
                title=${this.capacityCharges>0?`${this.capacityCharges} of ${H} AI generates left. One comes back every ${this.rechargeNextSec>0?this.rechargeNextSec:45}s.`:`Cooling down — next one unlocks in ${Math.floor(this.rechargeNextSec/60)}:${String(this.rechargeNextSec%60).padStart(2,"0")}`}
                aria-label="AI generates remaining"
                type="button"
              >
                <span class="pips-wrap">
                  ${Array.from({length:H},(a,v)=>g`
                    <span class="pip ${v<this.capacityCharges?"filled":""} ${this.capacityCharges<=1?"low":""}"></span>
                  `)}
                </span>
                <span>${this.capacityCharges>0?`${this.capacityCharges} left`:`+1 in ${this.rechargeNextSec}s`}</span>
              </button>
              <button
                class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
                style="background: ${e}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
                @click=${a=>{a.stopPropagation(),this.generate()}}
                aria-label=${this.isGenerating?"Composing chords":"Hear this vibe as chords"}
                title=${this.isGenerating?"Composing chords...":"Generate progression from vibe"}
                ?disabled=${this.isGenerating}
              >
                ${this.isGenerating?g`
                  <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                    <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
                  </svg>
                `:g`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                `}
              </button>
            </div>
            ${this.isGenerating?g`
              <div class="generating-status">
                <div class="generating-dot-pulse">
                  <span></span><span></span><span></span>
                </div>
                <span>Finding chords for <strong>${this.freeText.trim()?`"${this.freeText.trim()}"`:`${this.genre} · ${this.mood}`}</strong>...</span>
              </div>
            `:""}
            ${this.showCapacityNote?g`
              <div class="capacity-note" @click=${()=>{this.showCapacityNote=!1}}>
                ${this.capacityCharges>0?`${this.capacityCharges} of ${H} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            `:""}
          </div>
          ${u?g`
            <div style="text-align:center;margin-top:10px;">
              <div style="display:inline-flex;align-items:center;gap:6px;border:1.5px solid ${e};color:#2E271F;padding:8px 16px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;background:#FBF3E6;transition:transform 150ms ease;" @click=${()=>this.applyBest(u)}>
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
            ${o.map(a=>{const v=Xe.indexOf(a);return g`
                <div class="pill ${a===this.genre?"selected":""}" style=${a===this.genre?`background:${e}`:""} @click=${()=>this.selectGenre(a)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${Gn[v%3]} fill=${_n[v%3]} />
                    </svg>
                  </div>
                  ${a}
                </div>
              `})}
            ${i.length?g`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${i.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${d.map(a=>g`
              <div class="pill mood-pill ${a.name===this.mood?"selected":""}" style=${a.name===this.mood?`background:${a.dot}`:""} @click=${()=>this.selectMood(a.name)}>
                <div class="mood-badge" style="background:${a.name===this.mood?"rgba(46,39,31,0.1)":a.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${a.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${a.iconPath} />
                  </svg>
                </div>
                ${a.name}
              </div>
            `)}
            ${r.length?g`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${r.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=Ge?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:we},(a,v)=>g`
                <div class="length-segment ${v<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=we?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button
            class="cta ${this.capacityCharges<=0||this.isGenerating?"disabled":""} ${this.isGenerating?"generating":""}"
            style="background:${e}; opacity: ${this.capacityCharges>0&&!this.isGenerating?"1":"0.6"};"
            @click=${this.generate}
            ?disabled=${this.isGenerating}
          >
            ${this.isGenerating?g`
              <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
              </svg>
              <span>Composing chords...</span>
            `:g`
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

        ${this.showAdminModal?g`
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
                  ${this.currentProvider==="google"?g`
                    <div class="model-sub-list" @click=${a=>a.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${ui.map(a=>g`
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
    `}};M.styles=se`
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
  `;B([I({type:String})],M.prototype,"genre",2);B([I({type:String})],M.prototype,"mood",2);B([I({type:Number})],M.prototype,"length",2);B([x()],M.prototype,"freeText",2);B([x()],M.prototype,"placeholderIdx",2);B([x()],M.prototype,"llmSuggestion",2);B([x()],M.prototype,"llmResolved",2);B([x()],M.prototype,"classifyError",2);B([x()],M.prototype,"expandedGenre",2);B([x()],M.prototype,"expandedMood",2);B([x()],M.prototype,"mascot",2);B([x()],M.prototype,"mascotSlot",2);B([x()],M.prototype,"peekMascot",2);B([x()],M.prototype,"peekSide",2);B([I({type:Boolean})],M.prototype,"isAuthenticated",2);B([I({type:String})],M.prototype,"userEmail",2);B([I({type:Boolean})],M.prototype,"isAdmin",2);B([I({type:Boolean})],M.prototype,"isGenerating",2);B([x()],M.prototype,"currentProvider",2);B([x()],M.prototype,"currentModel",2);B([x()],M.prototype,"showAdminModal",2);B([x()],M.prototype,"isClassifying",2);B([x()],M.prototype,"loadingMsgIdx",2);B([x()],M.prototype,"googleRemaining",2);B([x()],M.prototype,"googleLimit",2);B([x()],M.prototype,"googleCooldownSec",2);B([x()],M.prototype,"orRemaining",2);B([x()],M.prototype,"orLimit",2);B([x()],M.prototype,"capacityCharges",2);B([x()],M.prototype,"rechargeNextSec",2);B([x()],M.prototype,"showCapacityNote",2);B([x()],M.prototype,"paradeTrigger",2);M=B([re("seed-screen")],M);function _i(e){const t={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=e.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=t[o]??0,n=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+s))}function _o(e,t,i,o=1,s){const n=t&&t.length>0?t.map(y=>e.chords[y]).filter(y=>!!y):e.chords,r=e.bpm||120,c=o*240/r,d=i?Ne.find(y=>y.name.toLowerCase()===i.toLowerCase()):void 0,p=wi[e.genre]||{},u=d?.patch??{},a={...p,...u,...s?.humanState??{}},v=p.duration??.9,b=u.durationMultiplier?v*u.durationMultiplier:v,f=s?.humanState?.strum!==void 0?s.humanState.strum/100*1.5:s?.spread!==void 0?s.spread/100*1.5:p.spread??.3,l=s?.humanState?.swing!==void 0?s.humanState.swing:s?.swing??0,h=s?.density??50,m=[];return n.forEach((y,w)=>{const k=l/100*.04*(w%2===1?1:0),E=w*c+k,N=y.notes&&y.notes.length>0?y.notes:["C","E","G"];let _=hi(N,4);if(_=wo(_,h),a.arpMode&&a.arpMode!=="off"){const G=a.arpRate??"1/16",J=a.arpRange??1,V=a.arpMode,Z=bo(G,r),X=xo(_,J),T=yo(X,V),q=a.duration?a.duration:Math.max(.6,b);T.forEach((pe,Ye)=>{const Ct=E+Ye*Z;m.push({note:pe,midi:_i(pe),startTime:Ct,duration:q})})}else{const G=s?.humanState?.instrument||void 0,J=G?be(G):void 0,V=J?le.find(T=>T.name.toLowerCase()===J.toLowerCase())?.instrument??"piano":tt[e.genre]??"piano",Z=V==="guitar"||V==="jazz-guitar",X=V==="jazz-guitar";_.forEach((T,q)=>{const Ye=(Z?q*(X?.018:.024):0)+q*f*.1,Ct=E+Ye;m.push({note:T,midi:_i(T),startTime:Ct,duration:Z?Math.max(b,1.2):b})})}}),m}function Hn(e){const t=[];let i=Math.max(0,Math.floor(e));for(t.push(i&127);(i>>=7)>0;)t.unshift(i&127|128);return t}function Yn(e,t,i,o=1,s){const n=e.bpm||120,r=480,c=_o(e,t,i,o,s),d=[];c.forEach(m=>{const y=Math.round(m.startTime/(60/n)*r),w=Math.max(1,Math.round(m.duration/(60/n)*r));d.push({tick:y,type:"on",midi:m.midi}),d.push({tick:y+w,type:"off",midi:m.midi})}),d.sort((m,y)=>m.tick!==y.tick?m.tick-y.tick:m.type!==y.type?m.type==="off"?-1:1:m.midi-y.midi);const p=[],u=Math.round(6e7/n);p.push(0),p.push(255,81,3),p.push(u>>16&255,u>>8&255,u&255);const a="Chroma Chords";p.push(0),p.push(255,3,a.length);for(let m=0;m<a.length;m++)p.push(a.charCodeAt(m));let v=0;d.forEach(m=>{const y=m.tick-v;v=m.tick,p.push(...Hn(y)),m.type==="on"?p.push(144,m.midi,80):p.push(128,m.midi,0)}),p.push(0),p.push(255,47,0);const b=[77,84,104,100,0,0,0,6,0,0,0,1,r>>8&255,r&255],f=p.length,l=[77,84,114,107,f>>24&255,f>>16&255,f>>8&255,f&255],h=new Uint8Array(b.length+l.length+p.length);return h.set(b,0),h.set(l,b.length),h.set(p,b.length+l.length),h}function Jn(e,t,i,o,s=1,n){const r=Yn(e,t,o,s,n),c=new Blob([r],{type:"audio/midi"}),d=(e.key||"C").toLowerCase(),p=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),u=e.bpm||120,a=`chroma-chords-${d}-${p}-${u}bpm.mid`;Go(c,a)}function Wn(e,t,i="Warm",o){const s=new so({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),n=rs(i,s),r=e?be(e):void 0;switch((r?le.find(p=>p.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(t?tt[t]:void 0)??"piano"){case"bell":{const p=new Le({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(n),u=new fe({decay:3.2,wet:.32}).connect(p);return new W(ri,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(u)}case"organ":{const p=new ae({frequency:4500,type:"lowpass",rolloff:-12}).connect(n),u=new ye({distortion:.08,wet:.15}).connect(p),a=new Ue({frequency:5.8,depth:.12,wet:.55}).connect(u);return new W(me,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(a)}case"pad-strings":{const p=new fe({decay:5.5,preDelay:.03,wet:.45}).connect(n),u=new xe({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(p);return new W(me,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(u)}case"juno-pad":{const p=new xe({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(n);return new W(ze,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(p)}case"stab":{const p=new ye({distortion:.1,wet:.12}).connect(n),u=new fe({decay:1,wet:.22}).connect(p);return new W(ze,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(u)}case"jazz-guitar":{const p=new Le({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(n),u=new ae({frequency:2800,type:"lowpass",rolloff:-12}).connect(p),a=new fe({decay:1.8,preDelay:.02,wet:.18}).connect(u);return o&&Object.keys(o).length>0?new ve({urls:o,volume:-8}).connect(a):new W(me,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(a)}case"sh101":{const p=new xe({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(n),u=new ae({frequency:3400,type:"lowpass",rolloff:-12}).connect(p),a=new ye({distortion:.12,wet:.18}).connect(u),v=new Ue({frequency:.45,depth:.18,wet:.65}).connect(a);return new W(ze,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(v)}case"guitar":return o&&Object.keys(o).length>0?new ve({urls:o,volume:-8}).connect(n):new W(me,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(n);case"rhodes":case"epiano":return o&&Object.keys(o).length>0?new ve({urls:o,volume:-10}).connect(n):new W(ri,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(n);case"piano":default:return o&&Object.keys(o).length>0?new ve({urls:o,volume:-9}).connect(n):new W(me,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(n)}}function Kn(e){const t=e.numberOfChannels,i=e.sampleRate,o=16,s=o/8,n=t*s,r=e.length*t*s,c=new ArrayBuffer(44+r),d=new DataView(c),p=(v,b)=>{for(let f=0;f<b.length;f++)d.setUint8(v+f,b.charCodeAt(f))};p(0,"RIFF"),d.setUint32(4,36+r,!0),p(8,"WAVE"),p(12,"fmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,t,!0),d.setUint32(24,i,!0),d.setUint32(28,i*n,!0),d.setUint16(32,n,!0),d.setUint16(34,o,!0),p(36,"data"),d.setUint32(40,r,!0);const u=[];for(let v=0;v<t;v++)u.push(e.getChannelData(v));let a=44;for(let v=0;v<e.length;v++)for(let b=0;b<t;b++){const f=Math.max(-1,Math.min(1,u[b][v])),l=f<0?f*32768:f*32767;d.setInt16(a,l,!0),a+=2}return new Blob([new Uint8Array(c)],{type:"audio/wav"})}async function Xn(e,t,i,o,s=1,n){const r=_o(e,t,o,s,n);if(!r.length)return;const c=t&&t.length>0?t.map(E=>e.chords[E]).filter(E=>!!E):e.chords,d=e.bpm||120,p=s*240/d,u=Math.max(.1,c.length*p),a=i?be(i):void 0,b=(a?le.find(E=>E.name.toLowerCase()===a.toLowerCase()):void 0)?.instrument??(e.genre?tt[e.genre]:void 0)??"piano";await hs(b);const f=ps(b),l=n?.tone||"Warm",h=await Yo(async()=>{const E=Wn(a||i,e.genre,l,f);r.forEach(N=>{N.startTime<u&&E.triggerAttackRelease(N.note,N.duration,N.startTime)})},u),m=Kn(h.get()),y=(e.key||"C").toLowerCase(),w=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-"),k=`chroma-chords-${y}-${w}-${d}bpm.wav`;Go(m,k)}function Go(e,t){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(e);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=t,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var Qn=Object.defineProperty,Zn=Object.getOwnPropertyDescriptor,he=(e,t,i,o)=>{for(var s=o>1?void 0:o?Zn(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Qn(t,i,s),s};const er=U`
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
`,tr=U`
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
`,ir=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:er},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:tr}];let oe=class extends ne{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.onKeyDown=e=>{e.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(e){if(!this.progression)return;const t=un(this.progression,e,this.order);window.open(t,"_blank");const i=e==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{const e=this.barsPerChord||S.getBarsPerChord()||1,t=this.feelSettings||S.getFeelSettings();await Xn(this.progression,this.order,this.instrument,this.playStyle,e,t),this.emit("toast","WAV file downloaded")}catch(e){console.error("WAV export failed",e),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{const e=this.barsPerChord||S.getBarsPerChord()||1,t=this.feelSettings||S.getFeelSettings();Jn(this.progression,this.order,this.instrument,this.playStyle,e,t),this.emit("toast","MIDI file downloaded")}catch(e){console.error("MIDI export failed",e),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const e=this.isOpened;return g`
      <div class="backdrop ${e?"open":""}" @click=${this.close}></div>
      <div class="share-drawer ${e?"open":""}">
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
            ${ir.map(t=>g`
              <div class="dest-card" @click=${()=>this.handleDeviceClick(t.device)}>
                <div class="device-svg-box">
                  ${t.svg}
                </div>
                <div class="dest-badge">${t.mono}</div>
                <div class="dest-name">${t.name}</div>
                <div class="dest-desc">${t.desc}</div>
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
    `}};oe.styles=se`
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
  `;he([I({type:Boolean})],oe.prototype,"open",2);he([I({type:Boolean})],oe.prototype,"visible",2);he([I({type:Object})],oe.prototype,"progression",2);he([I({type:Array})],oe.prototype,"order",2);he([I({type:String})],oe.prototype,"instrument",2);he([I({type:String})],oe.prototype,"playStyle",2);he([I({type:Number})],oe.prototype,"barsPerChord",2);he([I({type:Object})],oe.prototype,"feelSettings",2);oe=he([re("share-modal")],oe);var or=Object.defineProperty,sr=Object.getOwnPropertyDescriptor,C=(e,t,i,o)=>{for(var s=o>1?void 0:o?sr(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&or(t,i,s),s};const ii=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],Gi=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"],Vi=["Uplifting","Melancholy","Dreamy"],nr={Uplifting:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5",Melancholy:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15",Dreamy:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0",Tense:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12",Warm:"M12 4 a6.5 6.5 0 1 0 6.5 6.5",Nostalgic:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},Ie={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},rr=Ie,oi=["A","S","D","F","G","H","J","K"],ar=["Octave up","1st inversion","Low root"],lr=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],cr=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],qi=[{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]}],ge={swing:0,spread:50,density:50,tone:"Warm"},Hi=["Warm","Glassy","Dusty"],si=["C min","A min","F min","D min","G min","E♭ maj","C maj","G maj","F maj"],dr=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Yi={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},Ji=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Wi={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},ft={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},vt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},xi={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Ke={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function pr(e){const t=e===""?"maj":e;if(Ke[5][t]||Ke[6][t])return t;const i=xi[t];return i&&(Ke[5][i]||Ke[6][i])?i:"maj"}function hr(e){const t=pr(e.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Ke[o][t];if(!n)return;const r=((e.rootPc-s)%12+12)%12;i.push({rootFret:r,frets:n.map(c=>c===null?null:c+r)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function ur(e){const t=[7,0,4,9],i=e.intervals.map(r=>(e.rootPc+r)%12),o=r=>{const c=new Set(r);let d=null;const p=[],u=a=>{if(a===4){const v=p.map((h,m)=>(t[m]+h)%12);for(const h of c)if(v.indexOf(h)<0)return;for(const h of v)if(!c.has(h))return;const b=p.filter(h=>h>0),f=b.length?Math.max(...b)-Math.min(...b):0;if(f>3)return;const l=f*12+p.reduce((h,m)=>h+m,0);(!d||l<d.score)&&(d={frets:p.slice(),score:l});return}for(let v=0;v<=5;v++)p.push(v),u(a+1),p.pop()};return u(0),d},s=o(i);if(s)return s.frets;const n=o(e.intervals.filter(r=>r!==7).map(r=>(e.rootPc+r)%12));return n?n.frets:null}const Ki=[{key:"Darker",label:"Darker",tension:.55},{key:"More tension",label:"Tense",tension:.9},{key:"Dreamier",label:"Dreamy",tension:.3},{key:"Resolve home",label:"Home",tension:.05},{key:"Borrowed",label:"Borrow",tension:.42,twoTone:!0}];let $=class extends ne{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.barsPerChord=1,this.keyIdx=0,this.swing=0,this.spread=50,this.density=50,this.tone="Warm",this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=e=>{const t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"))return;if(e.key===" "||e.code==="Space"){e.preventDefault(),this.togglePlay();return}if(e.key==="Escape"){e.preventDefault(),(this.tempoOpen||this.feelOpen)&&(this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate());return}const i=oi.map(s=>s.toLowerCase()).indexOf((e.key||"").toLowerCase()),o=this.progression?.chords||[];if(i>=0&&i<o.length){e.preventDefault();const s=88+i%3*6,n=o[i],r=this.getChordLadder(n),c=this.getLadderHome(n);let d=c>=0?c:0,p=1,u="1st inversion";this.lastPad?.idx===i&&typeof this.lastPad.reach=="number"&&r.length>0&&(d=(this.lastPad.reach+1)%r.length),e.shiftKey&&(p=0,u="up an octave");const a=r.length>0&&r[d]?r[d]:n.name,v=d!==c&&!!r[d],b=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",l=Y(a,j(b,f));this.padFlash=i,this.padHeld=i,this.gridFor=i;const h=v?"→ "+a:p===0?"UP AN OCTAVE":p===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:i,voicing:u,vel:s,zone:p,reach:d,meta:h},S.playChordNotes(l,.85,u,s),this.requestUpdate()}},this.handleKeyUp=e=>{oi.map(i=>i.toLowerCase()).indexOf((e.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.toggleLibrary=()=>{this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("library-open-change",{detail:this.libraryOpen,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,S.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const e=j(this.progression.key,this.progression.scaleType),t=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:Y(this.abPick.chord,e)}:this.progression.chords[this.swapIndex];S.setABOverride({index:this.swapIndex,side:this.abSide,chord:t}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),S.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const e=j(this.progression.key,this.progression.scaleType),t=Y(this.abPick.chord,e),i=[...this.progression.chords];i[this.swapIndex]={...i[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:t};const o={...this.progression,chords:i};this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),S.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.onDecLength=()=>{const e=this.progression?.chords.length||4;e>Ge&&this.dispatchEvent(new CustomEvent("set-length",{detail:e-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const e=this.progression?.chords.length||4;e<we&&this.dispatchEvent(new CustomEvent("set-length",{detail:e+1,bubbles:!0,composed:!0}))},this.onReroll=()=>{this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1,this.requestUpdate()},this.togglePlayStyleExpand=()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1,this.requestUpdate()},this.onHumanChange=e=>{e.detail&&(this.humanEngineState=e.detail,S.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:e.detail}))},this.onHumanPreview=e=>{e.detail&&(this.humanEngineState=e.detail,S.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:e.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=F.getProjects(),this.unsubscribeProjects=typeof F.subscribeProjects=="function"?F.subscribeProjects(()=>{this.savedSets=F.getProjects(),this.requestUpdate()}):typeof F.subscribe=="function"?F.subscribe(()=>{this.savedSets=F.getProjects(),this.requestUpdate()}):null,S.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}),S.setBarsPerChord(this.barsPerChord),Pe(this.tone)}updated(e){super.updated(e),(e.has("swing")||e.has("spread")||e.has("density")||e.has("tone")||e.has("humanEngineState"))&&(S.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:this.humanEngineState}),e.has("tone")&&Pe(this.tone)),e.has("barsPerChord")&&S.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}getVibeSummary(){const e=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&e.push(this.selectedBand),e.join(" · ")}onGenreClick(e){this.dispatchEvent(new CustomEvent("set-genre",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(e){this.dispatchEvent(new CustomEvent("set-mood",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(e){this.selectedBand===e?this.selectedBand=null:this.selectedBand=e;const t=ii.find(i=>i.name===this.selectedBand);t&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${t.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onVibeSubmit(e){e.preventDefault();const t=this.freeText.trim();t&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:t,bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(e){this.progressStep=e*4,S.playFromBar(e),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(e){if(!e)return[];const t=String(e.name),i=(t.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(t)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(t)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(t)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>i+s)}getLadderHome(e){return this.getChordLadder(e).indexOf(e&&e.name)}handlePadPointerDown(e,t){let i="1st inversion",o=1,s;const n=this.progression?.chords;if(e.currentTarget&&typeof e.currentTarget.getBoundingClientRect=="function"){const h=e.currentTarget.getBoundingClientRect(),m=(e.clientY-h.top)/(h.height||1);if(m<.34?(o=0,i="up an octave"):m>.67?(o=2,i="low, root position"):(o=1,i="1st inversion"),typeof e.clientX=="number"&&n&&n[t]){const y=this.getChordLadder(n[t]),w=Math.min(.999,Math.max(0,(e.clientX-h.left)/(h.width||1)));s=Math.min(y.length-1,Math.floor(w*y.length))}}const r=n?n[t]:null;if(!r)return;const c=this.getChordLadder(r),d=this.getLadderHome(r),p=s!==void 0&&c[s]?c[s]:r.name,u=s!==void 0&&s!==d&&!!c[s],a=this.progression?.key||"C",v=this.progression?.scaleType||"MAJOR",b=Y(p,j(a,v)),f=88+t%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=t,this.padHeld=t,this.gridFor=t;const l=u?"→ "+p:o===0?"UP AN OCTAVE":o===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:t,voicing:i,vel:f,zone:o,reach:s,meta:l},S.playChordNotes(b,.85,i,f),this.requestUpdate()}handlePadPointerUp(){this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.requestUpdate()}openSwap(e){this.swapIndex=e,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,S.setABOverride(null),this.isMobile&&(this.mobileSheetOpen=!0),this.requestUpdate()}openDetail(e){this.detailIndex=e,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(e){const t=this.progression?j(this.progression.key,this.progression.scaleType):!1,i=e.chord.notes&&e.chord.notes.length>0?e.chord.notes:Y(e.chord.name,t);this.abPick={chord:e.name,tension:e.tension,roman:e.roman||"",fn:e.sub,label:e.name},this.abSide="after",this.swapIndex!==null&&this.progression&&S.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:e.name,roman:e.roman||"",tension:e.tension,notes:i}}),S.auditionChord({...e.chord,notes:i},.8),this.requestUpdate()}previewAlternative(e){if(!this.progression)return;const t=j(this.progression.key,this.progression.scaleType),i=Y(e,t);S.auditionChord({name:e,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(e){if(this.abSide=e,this.swapIndex!==null&&this.progression){const t=j(this.progression.key,this.progression.scaleType);if(e==="before")S.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),S.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=Y(this.abPick.chord,t),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};S.setABOverride({index:this.swapIndex,side:"after",chord:o}),S.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(e){if(!this.progression)return;if(e===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=j(this.progression.key,this.progression.scaleType),o={...this.progression.chords[e],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:Y(this.abPick.chord,i)};S.auditionChord(o,.8)}else S.playChordAtIndex(e,.8)}getChordQualityLabel(e){if(!e)return"Major";const t=e.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(t)?"Suspended (sus)":/(dim|°)/i.test(t)?"Diminished":/^(m|min)(?!aj)/.test(t)?"Minor":"Major"}getChordQualitySub(e){switch(this.getChordQualityLabel(e)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(e){if(!e)return"None";const t=e.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(t)?"9th":/(maj7|\(maj7\)|Δ)/i.test(t)||/M7/.test(t)?"Major 7th (M7)":/6/.test(t)?"6th":/(7|11|13)/.test(t)?"7th (dom / m7)":"None"}getChordExtensionSub(e){switch(this.getChordExtensionLabel(e)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(e){if(!this.progression)return;const t=[...this.progression.chords],i=t[this.detailIndex];if(!i)return;const o=this.getChordExtensionLabel(i.name),s=Ui(i,e,o);t[this.detailIndex]=s;const n={...this.progression,chords:t};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),S.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(e){if(!this.progression)return;const t=[...this.progression.chords],i=t[this.detailIndex];if(!i)return;const o=this.getChordQualityLabel(i.name),s=Ui(i,o,e);t[this.detailIndex]=s;const n={...this.progression,chords:t};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),S.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(e=[]){const t={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(e.map(c=>t[c.replace(/\d+$/,"")]??-1)),o=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],s=100/7,n=s*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return g`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${o.map(c=>{const d=i.has(c.pc);return g`<div class="white-key ${d?"active":""}">${c.note}</div>`})}
        </div>
        ${r.map(c=>{const d=(c.after+1)*s-n/2,p=i.has(c.pc);return g`<div class="black-key ${p?"active":""}" style="left: ${d}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.swing!==ge.swing||this.spread!==ge.spread||this.density!==ge.density||this.tone!==ge.tone}resetFeel(){this.swing=ge.swing,this.spread=ge.spread,this.density=ge.density,this.tone=ge.tone,this.humanEngineState=null,S.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:void 0}),Pe(this.tone),this.requestUpdate()}nudgeBpm(e){const t=this.progression?.bpm||84,i=Math.max(40,Math.min(240,t+e));this.progression&&(this.progression.bpm=i),S.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(e){if(isNaN(e))return;const t=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=t),S.setBpm(t),this.dispatchEvent(new CustomEvent("set-bpm",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(e){this.barsPerChord=e,S.setBarsPerChord(e),this.requestUpdate()}selectKey(e){if(this.keyIdx=si.indexOf(e),!this.progression)return;const t=nn(this.progression,e);this.progression=t,S.setProgression(t),this.dispatchEvent(new CustomEvent("progression-change",{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${t.key} ${t.scaleType==="NATURAL_MINOR"?"minor":"major"}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(e,t,i,o){this.auditionDeg=e,this.auditionName=t,this.auditionBar=i?o+1:0;const s=j(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=Y(t,s);S.auditionChord({name:t,notes:n},.8),this.requestUpdate()}getTheoryData(e){const t=(this.progression?.scaleType||"").toUpperCase().includes("MINOR")||(this.progression?.key||"").includes("m"),i=this.progression?.key||"C",o=P[i.replace("b","b").replace("♭","b")]??0,s=t?{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"}:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},n=i.replace("b","♭")+" "+s.name,r=e.map(l=>{const h=te(l.name);return P[h.root]??0}),c=l=>s.steps.indexOf(((l-o)%12+12)%12),d=s.steps.map((l,h)=>{const m=(o+l)%12,w=dr[m]+s.quals[h],k=r.indexOf(m),E=k>=0,N=this.auditionDeg===h;return{di:h,roman:s.romans[h],name:w,fn:s.fns[h],inLoop:E,on:N,barIdx:k,aria:`Hear ${w}, the ${s.fns[h].toLowerCase()} of ${n}`}}),p=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,u=e.map(l=>l.roman||s.romans[Math.max(0,c(P[te(l.name).root]??0))]).join(" – "),a=i.replace("b","♭")+" "+(t?"minor":"major"),v=fn(e),b=vn(e),f=this.progression?.note||"";return{scaleName:n,scaleHint:p,scaleDegrees:d,romanFormula:u,keyModeLine:a,cadences:v,voiceLinks:b,setNote:f}}renderScaleChords(e,t,i,o){const s=Ae(this.progression?.mood||"Warm");return g`
      <div
        class="scale-chords-panel"
        style="position: relative; z-index: 2; background: var(--cv-cream); border-radius: ${o?"18px":"20px"}; padding: ${o?"11px 12px 13px":"13px 15px 15px"}; margin-top: ${o?"12px":"0"}; margin-bottom: ${o?"0":"12px"}; flex-shrink: 0;"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${o?"8px":"12px"}; flex-wrap: wrap;">
          <div style="font-size: ${o?"9.5px":"10px"}; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
            Scale · ${e}
          </div>
          <div style="font-size: ${o?"10.5px":"11px"}; font-weight: 700; color: rgba(46, 39, 31, 0.45);">
            ${t}
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
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const e=this.progression?.bpm||84;return g`
      <div class="tempo-popover-desktop" style="background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 18px;">
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
              .value=${e.toString()}
              @change=${t=>this.setDirectBpm(parseInt(t.target.value,10))}
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
            ${[1,2,4].map(t=>g`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===t?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(t)}
              >
                ${t===1?"1 bar":`${t} bars`}
              </button>
            `)}
          </div>
        </div>
        <div style="flex: 1; min-width: 240px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
            ${si.map((t,i)=>{const o=this.keyIdx===i||this.progression?.key===t.replace(" min","").replace(" maj","").replace("♭","b");return g`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectKey(t)}
                >
                  ${t}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}renderFeelDrawerDesktop(){return this.feelOpen?g`
      <div class="feel-popover-desktop" style="background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex: 1; min-width: 0;">Feel &amp; tone</div>
          ${this.feelChanged?g`
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
          ${qi.map(e=>{const t=this[e.k];let i=e.steps[0];return e.steps.forEach(o=>{Math.abs(o.v-t)<Math.abs(i.v-t)&&(i=o)}),g`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(o=>{const s=o===i;return g`
                      <button
                        style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>{this[e.k]=o.v,S.setFeelSettings({[e.k]:o.v}),this.requestUpdate()}}
                        aria-label="${e.label}: ${o.name}"
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
              ${Hi.map(e=>g`
                <button
                  style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===e?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.tone=e,S.setFeelSettings({tone:e}),Pe(e),this.requestUpdate()}}
                >
                  ${e}
                </button>
              `)}
            </div>
          </div>
          <div style="grid-column: 1 / -1; margin-top: 10px; padding-top: 12px; border-top: 1px dashed rgba(46, 39, 31, 0.18);">
            <button
              @click=${()=>{this.showAdvancedFeel=!this.showAdvancedFeel}}
              style="border: 1px solid rgba(46, 39, 31, 0.18); background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-family: inherit; font-size: 11.5px; font-weight: 800; padding: 7px 14px; border-radius: 9px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 150ms ease;"
            >
              <span>${this.showAdvancedFeel?"▲ Hide Advanced Fine-Tuning":"▼ Advanced Fine-Tuning…"}</span>
            </button>
            ${this.showAdvancedFeel?g`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 480px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(e=>e.name).join(" ")||"Cmaj7 Dm7 G7 Cmaj"}
                  .bpm=${this.progression?.bpm||80}
                  ?hideInput=${!0}
                  heading="Human Expression Engine"
                  style="--human-bg: var(--cv-cream, #FBF3E6); --human-surface: var(--cv-surface, #F6EADB); --human-border: rgba(46,39,31,0.15); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: var(--cv-ink-muted, #6B5F50); --human-accent: var(--cv-action, #9B7CA8); --human-accent-hover: var(--cv-action-hover, #84698F); max-width: 100%; min-width: 0; box-shadow: none;"
                  @human-change=${this.onHumanChange}
                  @human-preview=${this.onHumanPreview}
                ></human-panel>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `:""}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const e=this.progression?.bpm||84;return g`
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
                  .value=${e.toString()}
                  @change=${t=>this.setDirectBpm(parseInt(t.target.value,10))}
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
            ${[1,2,4].map(t=>g`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord===t?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${this.barsPerChord===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>this.setBarsPerChord(t)}
              >
                ${t===1?"1 bar":`${t} bars`}
              </button>
            `)}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${si.map((t,i)=>{const o=this.keyIdx===i||this.progression?.key===t.replace(" min","").replace(" maj","").replace("♭","b");return g`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectKey(t)}
                >
                  ${t}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}renderFeelSheetMobile(){return this.feelOpen?g`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Feel &amp; tone</div>
            ${this.feelChanged?g`
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
            ${qi.map(e=>{const t=this[e.k];let i=e.steps[0];return e.steps.forEach(o=>{Math.abs(o.v-t)<Math.abs(i.v-t)&&(i=o)}),g`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(o=>{const s=o===i;return g`
                        <button
                          style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>{this[e.k]=o.v,S.setFeelSettings({[e.k]:o.v}),this.requestUpdate()}}
                          aria-label="${e.label}: ${o.name}"
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
            ${Hi.map(e=>g`
              <button
                style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===e?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===e?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>{this.tone=e,S.setFeelSettings({tone:e}),Pe(e),this.requestUpdate()}}
              >
                ${e}
              </button>
            `)}
          </div>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(46, 39, 31, 0.18);">
            <button
              @click=${()=>{this.showAdvancedFeel=!this.showAdvancedFeel}}
              style="border: 1px solid rgba(46, 39, 31, 0.18); background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-family: inherit; font-size: 11.5px; font-weight: 800; padding: 7px 14px; border-radius: 9px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 150ms ease;"
            >
              <span>${this.showAdvancedFeel?"▲ Hide Advanced Fine-Tuning":"▼ Advanced Fine-Tuning…"}</span>
            </button>
            ${this.showAdvancedFeel?g`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 400px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(e=>e.name).join(" ")||"Cmaj7 Dm7 G7 Cmaj"}
                  .bpm=${this.progression?.bpm||80}
                  ?hideInput=${!0}
                  heading="Human Expression Engine"
                  style="--human-bg: var(--cv-cream, #FBF3E6); --human-surface: var(--cv-surface, #F6EADB); --human-border: rgba(46,39,31,0.15); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: var(--cv-ink-muted, #6B5F50); --human-accent: var(--cv-action, #9B7CA8); --human-accent-hover: var(--cv-action-hover, #84698F); max-width: 100%; min-width: 0; box-shadow: none;"
                  @human-change=${this.onHumanChange}
                  @human-preview=${this.onHumanPreview}
                ></human-panel>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `:""}renderTheoryStrip(e){const{keyModeLine:t,romanFormula:i,cadences:o,voiceLinks:s,setNote:n}=e;return g`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${t}</div>
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
    `}renderChordDetailContent(e){const t=e[this.detailIndex],i=this.getChordQualityLabel(t?.name),o=this.getChordExtensionLabel(t?.name),s=j(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=t?mn(t.name,s):[];return g`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(t?.notes||[]).map(r=>g`
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
        <div class="quality-sub">${this.getChordQualitySub(t?.name)}</div>
      </div>
      <div class="quality-chips-grid">
        ${lr.map(r=>{const c=r.label===i;return g`
            <button
              class="chord-mod-chip quality-chip ${c?"selected active":""}"
              @click=${()=>this.changeChordQuality(r.label)}
              aria-pressed="${c}"
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
        <div class="quality-sub">${this.getChordExtensionSub(t?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${cr.map(r=>{const c=r.label===o;return g`
            <button
              class="chord-mod-chip extension-chip ${c?"selected active":""}"
              @click=${()=>this.changeChordExtension(r.label)}
              aria-pressed="${c}"
              aria-label="Change extension to ${r.label}"
            >
              <div class="chip-title">${r.label}</div>
              <div class="chip-desc">${r.sub}</div>
            </button>
          `})}
      </div>
    `}renderPianoCard(e,t){const i=te(e.name),o=Wi[i.root]??0,s=vt[i.quality]||vt[xi[i.quality]||"maj"]||[0,4,7],n=22,r=86,c=52,d=[0,2,4,5,7,9,11],p=[],u=[],a=[];for(let f=0;f<2;f++)d.forEach((l,h)=>{p.push({x:(f*7+h)*n,w:n-1.5,h:r})});for(let f=0;f<2;f++)[0,1,3,4,5].forEach(l=>{const h=f*7+l;u.push({x:h*n+n*.64,w:n*.58,h:c})});s.forEach(f=>{const l=o+f,h=Math.floor(l/12),m=l%12,y=d.indexOf(m),w=f===0,k=y<0,E=w?"#F2735F":k?"#FBF3E6":"#2E271F",N=w?"#FBF3E6":k?"#2E271F":"#FBF3E6",_=this.showDegrees?ft[f%12]:"";if(y>=0){const G=h*7+y;a.push({cx:G*n+(n-1.5)/2,cy:r-19,r:9,fill:E,isRoot:w,label:_,lc:N})}else{const J=(h*7+d.indexOf(m-1))*n+n*.64,V=n*.58;a.push({cx:J+V/2,cy:c-14,r:7.5,fill:E,isRoot:w,label:_,lc:N})}});const v=14*n,b=s.map(f=>{const l=Ji[(o+f)%12];return this.showDegrees?`${l} (${ft[f%12]})`:l}).join(" · ");return g`
      <div
        class="play-card"
        @pointerdown=${f=>this.handlePadPointerDown(f,t)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${e.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${e.name}</div>
          ${this.showTheory&&e.roman?g`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${e.roman}</div>
          `:""}
        </div>
        <svg width="${v}" height="${r}" viewBox="0 0 ${v} ${r}" style="display: block; width: 100%; max-width: ${v}px; height: auto;">
          ${p.map(f=>U`
            <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${u.map(f=>U`
            <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${a.map(f=>U`
            <g>
              <circle cx="${f.cx}" cy="${f.cy}" r="${f.r}" fill="${f.fill}" stroke="${f.isRoot?"#2E271F":"none"}" stroke-width="${f.isRoot?1.6:0}"></circle>
              ${f.label?U`
                <text x="${f.cx}" y="${f.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${f.lc}" font-family="'Plus Jakarta Sans',sans-serif">${f.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${b}</div>
      </div>
    `}renderFretCard(e,t,i){const o=te(e.name),s=Wi[o.root]??0,n=vt[o.quality]||vt[xi[o.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],c=[7,0,4,9],d=i==="Ukulele",p=d?c:r,u=d?ur({root:o.root,rootPc:s,q:o.quality,intervals:n})||[null,null,null,null]:hr({root:o.root,rootPc:s,q:o.quality})||[null,null,null,null,null,null],a=18,v=24,b=4,f=16,l=p.length,h=u.filter(T=>T!==null&&T>0),m=h.length&&Math.max(...h)>4?Math.min(...h)-1:0,y=[],w=[],k=[],E=[],N=[];for(let T=0;T<l;T++)y.push({x:T*a});for(let T=0;T<=b;T++)w.push({y:f+T*v,sw:T===0&&m===0?3:1.2});u.forEach((T,q)=>{const pe=q*a;if(T===null){N.push({x:pe});return}if(T===0){E.push({x:pe});return}const Ye=((p[q]+T-s)%12+12)%12;k.push({cx:pe,cy:f+(T-m-.5)*v,fill:Ye===0?"#F2735F":"#2E271F",label:this.showDegrees?ft[((p[q]+T-s)%12+12)%12]:""})});const _=(l-1)*a,G=(l-1)*a+26,J=f+b*v+12,V=m>0?`${m+1}fr`:"",Z=m>0,X=n.map(T=>{const q=Ji[(s+T)%12];return this.showDegrees?`${q} (${ft[T%12]})`:q}).join(" · ");return g`
      <div
        class="play-card"
        @pointerdown=${T=>this.handlePadPointerDown(T,t)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${e.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${e.name}</div>
            ${this.showTheory&&e.roman?g`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${e.roman}</div>
            `:""}
          </div>
          ${Z?g`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${V}</div>
          `:""}
        </div>
        <svg width="${G}" height="${J}" viewBox="-13 -2 ${G} ${J}" style="display: block; width: 100%; max-width: ${G*1.5}px; height: auto;">
          ${w.map(T=>U`
            <rect x="0" y="${T.y}" width="${_}" height="${T.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${y.map(T=>U`
            <rect x="${T.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${E.map(T=>U`
            <circle cx="${T.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${N.map(T=>U`
            <text x="${T.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${k.map(T=>U`
            <g>
              <circle cx="${T.cx}" cy="${T.cy}" r="${T.fill==="#F2735F"?7.5:7}" fill="${T.fill}"></circle>
              ${T.label?U`
                <text x="${T.cx}" y="${T.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${T.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${X}</div>
      </div>
    `}renderChordPad(e,t,i,o){const s=ee(e.tension||.1),n=this.activeIndex===t&&this.playing,r=this.padFlash===t||this.padHeld===t,c=this.swapIndex===t,d=this.getChordLadder(e),p=this.getLadderHome(e),u=this.lastPad?.idx===t,a=u&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:p,v=u&&a>=0&&a!==p&&d[a],b=u?v?"→ "+d[a]:ar[this.lastPad?.zone??1]||this.lastPad?.voicing||"":"";return g`
      <div
        class="pad-cell ${o?"chord-item-wrap":""} ${r?"pad-held":""} ${c?"selected":""} ${n?"pad-lit":""}"
        style="background: ${s.color};"
        tabindex="0"
        role="button"
        aria-label="${e.name}, ${Ie[e.functionLabel]||e.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${f=>this.handlePadPointerDown(f,t)}
        @pointerup=${()=>this.handlePadPointerUp()}
        @pointercancel=${()=>this.handlePadPointerUp()}
        @pointerleave=${()=>this.handlePadPointerUp()}
      >
        <div class="pad-voicing-grid ${this.gridFor===t?"active":""}">
          ${d.slice(1).map((f,l)=>g`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(l+1)/d.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${f=>{f.stopPropagation(),this.openSwap(t)}}
          @pointerdown=${f=>f.stopPropagation()}
          aria-label="Swap ${e.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${f=>{f.stopPropagation(),this.openDetail(t)}}
          @pointerdown=${f=>f.stopPropagation()}
          aria-label="View voicing for ${e.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row">
          <span class="pad-key-badge">${oi[t]||""}</span>
          ${this.showTheory&&e.roman?g`<span class="pad-roman-badge">${e.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${rr[e.functionLabel]||e.functionLabel}</div>
          <div class="pad-chord-name">${u&&v&&d[a]?d[a]:e.name}</div>
          ${this.showTheory&&e.notes&&e.notes.length?g`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${e.notes.join(" · ")}
            </div>
          `:""}
          ${b?g`<div class="pad-meta-voicing">${b}</div>`:""}
        </div>
      </div>
    `}renderLibraryPopoverContent(e){const t=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(o=>!t||(o.name+" "+o.genre+" "+o.mood).toLowerCase().includes(t));return g`
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
        ${i.map(o=>g`
          <div
            style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: var(--cv-surface);"
            @click=${()=>{this.dispatchEvent(new CustomEvent("load-project",{detail:o,bubbles:!0,composed:!0})),this.libraryOpen=!1}}
          >
            <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
              ${(o.chords||[]).map(s=>{const n=ee(s.tension??0);return g`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(n.radius*.25)}px;background:${n.color};flex-shrink:0;"></span>`})}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${o.name}</div>
              <div style="font-size: 11px; color: var(--cv-ink-muted);">${o.genre} · ${o.mood}</div>
            </div>
          </div>
        `)}
        ${i.length?"":g`
          <div style="padding: 12px; font-size: 12px; color: var(--cv-ink-muted); text-align: center;">No loops match that.</div>
        `}
      </div>
    `}render(){const e=this.progression?.chords||[],t=Ae(this.progression?.mood||"Warm"),i=ii.find(l=>l.name===this.selectedBand),o=this.getTheoryData(e),s=e.map(l=>l.tension||.1),n=Math.max(...s,.1),r=Math.min(...s,0),c=s.indexOf(n),d=s.every((l,h)=>h===0||l>=s[h-1]),p=n-r<.28?"Stays close to home":d?"A steady climb":s[s.length-1]<.25&&c<s.length-1?"Away, then home":"Drifts, then settles",u=`Opens ${Ie[e[0]?.functionLabel]||"home"} and ${n-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":d?`tightens chord by chord, peaking on ${e[c]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${e[c]?.name||"the middle"} before easing back down home.`}`;let a=[],v="";const b=this.progression?.scaleType?.includes("MINOR")??!1;if(this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")a=Oo(this.chordData,this.progression,this.swapIndex),v=`Four chords from the ${b?"major":"minor"} version of this key.`;else{const l=Ti(this.chordData,this.progression,this.swapIndex);a=(l.find(m=>m.name===this.activeSwapFamily)||l[0])?.rows||[],v=Yi[this.activeSwapFamily]?Yi[this.activeSwapFamily][this.showTheory?1:0]:""}if(i){const l=a.filter(m=>i.hoist.includes(m.name)),h=a.filter(m=>!i.hoist.includes(m.name));a=[...l,...h]}}const f=this.swapIndex!==null?e[this.swapIndex]:null;return this.isMobile?g`
        <div class="mobile-stage-wrap" style="--mood-color: ${t};">
          <!-- Top Vibe Dropdown Button -->
          <div style="padding: 12px 18px 0;">
            <button class="mobile-vibe-toggle" @click=${this.toggleVibe}>
              <div style="text-align: left;">
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">The Vibe</div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink); margin-top: 2px;">${this.getVibeSummary()}</div>
              </div>
              <span style="font-size: 16px; font-weight: 800; color: var(--cv-ink-muted);">${this.vibeOpen?"⌃":"⌄"}</span>
            </button>

            ${this.vibeOpen?g`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${l=>{this.freeText=l.target.value}}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${t};">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${Gi.map(l=>g`
                    <button class="pill ${this.progression?.genre===l?"active":""}" @click=${()=>this.onGenreClick(l)}>${l}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Vi.map(l=>g`
                    <button class="pill mood-pill ${this.progression?.mood===l?"active":""}" @click=${()=>this.onMoodClick(l)}>${l}</button>
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
            ${this.activeView==="loop"?g`
              <div class="stage-card" style="padding: 18px 14px;">
                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${e.map((l,h)=>this.renderChordPad(l,h,t,!1))}
                </div>

                ${this.showTheory?this.renderScaleChords(o.scaleName,o.scaleHint,o.scaleDegrees,!0):""}
              </div>

              <!-- Quick chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${be(this.instrument)} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"} <span style="opacity:0.6;">⌄</span>
                </button>
              </div>

              ${this.expandedInstrument?g`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${le.map(l=>g`
                    <button
                      class="pill ${be(this.instrument)===l.name?"active":""}"
                      @click=${()=>{this.instrument=l.name,S.setInstrument(l.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:l.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                    >
                      <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                    </button>
                  `)}
                </div>
              `:""}

              ${this.expandedPlayStyle?g`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${Ne.map(l=>g`
                    <button
                      class="pill ${(this.playStyle||"Block chords")===l.name?"active":""}"
                      @click=${()=>{this.playStyle=l.name,S.setPlayStyle(l.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:l.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                    >
                      <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                    </button>
                  `)}
                </div>
              `:""}

              <div style="display: flex; gap: 7px; margin-top: 12px;">
                <button class="mobile-chip-btn" @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1)}} aria-label="Key, tempo and length">
                  ${this.progression?.key||"C"} · ${this.progression?.bpm||84}
                </button>
                <button class="mobile-chip-btn" @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1)}}>Feel &amp; tone</button>
                <button
                  class="mobile-chip-btn mobile-share-btn"
                  @click=${()=>{this.shareOpen=!0}}
                  aria-label="Share this loop"
                  style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>
                  Share
                </button>
              </div>

              <div class="mobile-theory-toggle" @click=${this.onTheoryToggle}>
                <div class="toggle-track ${this.showTheory?"active":""}">
                  <div class="toggle-knob ${this.showTheory?"active":""}"></div>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory</div>
              </div>

              ${this.showTheory?g`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${p}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${e.map(l=>{const h=Math.round(28+(l.tension||.1)*85),m=ee(l.tension||.1);return g`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${h}px; border-radius: 100px; background: ${m.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${l.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${Ie[l.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${u}</div>
                  ${this.renderTheoryStrip(o)}
                </div>
              `:""}
            `:this.activeView==="song"?g`
              <div class="song-track-list" style="display: flex; flex-direction: column; gap: 12px; padding: 4px 0 20px;">
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 4px;">
                  Each section reuses the loop, related but never identical. Tap a section to edit its chords, or press play to hear the whole arrangement.
                </div>
                ${this.sections.map((l,h)=>{const m=this.activeSectionIdx===h;return g`
                    <div
                      class="song-track-card ${m?"active":""}"
                      style="width: 100%; box-sizing: border-box; cursor: pointer;"
                      @click=${()=>{this.activeSectionIdx=h,this.activeView="loop"}}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${h+1}</div>
                      <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); margin-top: 4px;">${l.name}</div>
                      <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 4px;">${l.desc}</div>
                      <div class="song-card-chips" style="display: flex; gap: 6px; margin-top: 12px; flex-wrap: wrap;">
                        ${l.progression.chords.map(y=>{const w=ee(y.tension);return g`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(w.radius*.4)}px; background: ${w.color}; flex-shrink: 0;" title="${y.name}"></div>`})}
                      </div>
                    </div>
                  `})}
                <button
                  class="add-section-card"
                  style="width: 100%; min-height: 60px; border: 2px dashed rgba(46,39,31,0.18); border-radius: 20px; background: transparent; color: var(--cv-ink-muted); font-size: 13.5px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color 150ms ease, color 150ms ease;"
                  @click=${()=>this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  Add a related section
                </button>
              </div>
            `:g`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(l=>g`
                      <button
                        class="pill ${this.playInstrument===l?"active":""}"
                        style="background: ${this.playInstrument===l?t:"var(--cv-cream)"}; color: ${this.playInstrument===l?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=l}}
                      >${l}</button>
                    `)}
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-top: 15px; padding-top: 14px; border-top: 1px solid rgba(46,39,31,0.09);" @click=${()=>{this.showDegrees=!this.showDegrees}}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees?t:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
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
                    ${e.map((l,h)=>this.renderPianoCard(l,h))}
                  </div>
                `:g`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${e.map((l,h)=>this.renderFretCard(l,h,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>

          <!-- Mobile Swap Sheet -->
          ${this.mobileSheetOpen&&this.swapIndex!==null?g`
            <div class="sheet-scrim" @click=${()=>{this.mobileSheetOpen=!1}}></div>
            <div class="mobile-swap-sheet mobile-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div class="sheet-title" style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Chord ${this.swapIndex+1} (${f?.name})</div>
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
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${f?.name||""}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                    style="background: ${this.abPick?this.abSide==="after"?t:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
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
                    style="background: ${this.abPlaying?t:"#E8D9C2"};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                  >
                    ${this.abPlaying?g`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>`:g`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${e.map((l,h)=>{const m=h===this.swapIndex,y=m&&this.abSide==="after"&&this.abPick?this.abPick.chord:l.name,w=this.abPlaying&&Math.floor(this.progressStep/4)===h;return g`
                        <button
                          class="ab-cell-item ${w?"active-step":""}"
                          style="background: ${m&&this.abSide==="after"&&this.abPick?t:"#F1E4D2"}; opacity: ${m?1:.65};"
                          @click=${()=>this.onAbCellClick(h)}
                          aria-label="Preview ${y} in bar ${h+1}"
                        >
                          ${y}
                        </button>
                      `})}
                  </div>
                </div>
              </div>

              <div class="swap-family-tabs swap-tab-nav" style="margin-top: 14px;">
                ${Ki.map(l=>{const h=this.activeSwapFamily===l.key,m=ee(l.tension),y=Math.round(m.size*.34),w=Math.round(m.radius*(y/m.size));return g`
                    <button
                      class="swap-family-tab ${h?"active":""}"
                      @click=${()=>{this.activeSwapFamily=l.key,this.requestUpdate()}}
                    >
                      ${l.twoTone?g`
                        <span class="two-tone-swatch" style="box-shadow: ${h?`0 0 0 3px ${t}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:g`
                        <span
                          class="family-shape"
                          style="width: ${y}px; height: ${y}px; border-radius: ${w}px; background: ${m.color}; box-shadow: ${h?`0 0 0 3px ${t}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${h?"active":""}">${l.label}</span>
                    </button>
                  `})}
              </div>

              ${i?g`
                <div class="band-note-banner" style="background: ${i.color}22; margin-top: 10px;">
                  <span>${this.showTheory?`${i.name}: ${i.theory}`:`Sorted for ${i.name} — their moves first`}</span>
                </div>
              `:""}

              <div class="alt-candidates-list" style="margin-top: 10px;">
                ${a.map(l=>{const h=!!i&&i.hoist.includes(l.name),m=ee(l.tension),y=Math.max(26,Math.min(36,Math.round(m.size*.32))),w=Math.round(m.radius*(y/m.size));return g`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord===l.name?"selected":""}" @click=${()=>this.selectAlternative(l)}>
                      <div class="alt-shape" style="width: ${y}px; height: ${y}px; border-radius: ${w}px; background: ${m.color}; box-shadow: ${this.abPick?.chord===l.name?`0 0 0 2px ${t}`:"none"}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${l.name}</span>
                          ${this.showTheory&&l.roman?g`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${l.roman}</span>`:""}
                          ${h?g`<span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>`:""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${l.sub}</div>
                        ${this.showTheory&&l.notes&&l.notes.length?g`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${l.notes.join(" · ")}
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
          ${this.mobileDetailSheetOpen?g`
            <div class="sheet-scrim" @click=${()=>{this.mobileDetailSheetOpen=!1}}></div>
            <div class="mobile-detail-sheet mobile-swap-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
                <div>
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${e[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${e[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="sheet-cancel-btn close-detail-btn" @click=${()=>{this.mobileDetailSheetOpen=!1}}>×</button>
              </div>

              ${this.renderChordDetailContent(e)}
            </div>
          `:""}

          <!-- Mobile Bottom Transport Bar -->
          <div class="mobile-bottom-transport-bar">
            <button
              class="loop-play-btn"
              @click=${this.activeView==="song"?()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0})):this.togglePlay}
              style="background: ${this.playing?"#2E271F":t}; color: ${this.playing?"#FBF3E6":"#2E271F"}; flex-shrink: 0; min-height: 44px; padding: 9px 16px; border-radius: 100px; font-weight: 800; font-size: 12.5px; border: none; cursor: pointer; white-space: nowrap;"
              aria-label="${this.playing?"Stop":this.activeView==="song"?`Play song · ${this.sections.length} sections`:"Play loop"}"
            >
              ${this.playing?"Stop":this.activeView==="song"?`Play song · ${this.sections.length} sections`:"Play loop"}
            </button>
            <div style="flex: 1 1 30px; min-width: 24px;">
              <div style="display: flex; gap: 2px; align-items: flex-end; height: 16px;">
                ${this.activeView==="song"?this.sections.map((l,h)=>{const m=this.playing&&this.activePlayingSectionIdx===h;return g`<div style="flex: 1; height: ${m?16:8}px; border-radius: 2px; background: ${m?"#F2735F":"rgba(46,39,31,0.22)"};"></div>`}):Array.from({length:16}).map((l,h)=>{const m=Math.floor(this.progressStep%(e.length*4)),y=this.playing&&Math.floor(m/(e.length*4)*16)===h,w=h%4===0;return g`
                        <div style="flex: 1; height: ${y?16:w?11:7}px; border-radius: 2px; background: ${y?"#F2735F":w?"rgba(46,39,31,0.3)":"rgba(46,39,31,0.14)"};"></div>
                      `})}
              </div>
              <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--cv-label); margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${this.playing?this.activeView==="song"?`Section ${this.activePlayingSectionIdx+1} of ${this.sections.length} · ${this.sections[this.activePlayingSectionIdx]?.name||""}`:`Bar ${Math.floor(this.progressStep/4)+1} · beat ${this.progressStep%4+1}`:this.activeView==="song"?`${this.sections.length} sections · stopped`:`${e.length} bars · stopped`}
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}>
                <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${t}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
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
          <share-modal
            .open=${this.shareOpen}
            .progression=${this.progression}
            .order=${this.order}
            .instrument=${this.instrument}
            .playStyle=${this.playStyle}
            .barsPerChord=${this.barsPerChord}
            .feelSettings=${{swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}}
            @close=${()=>{this.shareOpen=!1}}
            @toast=${l=>{this.dispatchEvent(new CustomEvent("toast",{detail:l.detail,bubbles:!0,composed:!0}))}}
          ></share-modal>
        </div>
      `:g`
      ${i?g`
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

      <div class="studio-container" style="--mood-color: ${t};">
        <!-- 1. Left Narrow Rail (62px) -->
        <nav class="rail-left" role="navigation">
          <div class="rail-top">
            <button
              class="vibe-rail-btn rail-item vibe ${this.vibeOpen?"active":""}"
              @click=${this.toggleVibe}
              aria-label="Vibe, genre and mood"
              title="Vibe, genre and mood"
              style="background: ${t};"
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

            ${this.libraryOpen?g`
              <div class="loops-popover-desktop library-popover">
                ${this.renderLibraryPopoverContent(t)}
              </div>
            `:""}
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
                @input=${l=>{this.freeText=l.target.value}}
                placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
              />
              <button type="submit" class="vibe-submit-btn" style="background: ${t};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${Gi.map(l=>g`
                <button class="pill ${this.progression?.genre===l?"active":""}" @click=${()=>this.onGenreClick(l)}>${l}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Vi.map(l=>{const h=Ae(l),m=this.progression?.mood===l;return g`
                  <button class="pill mood-pill ${m?"active":""}" style="${m?`background: ${h}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(l)}>
                    <span class="mood-badge" style="background: ${m?"rgba(46, 39, 31, 0.12)":h+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${m?"#2E271F":h}" stroke-width="2.2" stroke-linecap="round"><path d="${nr[l]||"M12 4 a6.5 6.5 0 1 0 6.5 6.5"}"/></svg>
                    </span>
                    ${l}
                  </button>
                `})}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${ii.map(l=>g`
                <button class="pill ${this.selectedBand===l.name?"active":""}" style="font-family: ${l.font}; font-weight: ${l.weight||800};" @click=${()=>this.onBandClick(l.name)}>${l.name}</button>
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
            ${this.activeView==="loop"?g`
              <div class="stage-card stage-panel">
                <!-- Top Loop Play Button -->
                <div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
                  <button
                    class="loop-play-btn"
                    @click=${this.togglePlay}
                    style="background: ${this.playing?"#2E271F":t}; color: ${this.playing?"#FBF3E6":"#2E271F"}; min-height: 40px; padding: 0 20px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; transition: transform 120ms ease;"
                    aria-label="${this.playing?"Stop loop":"Play loop"}"
                  >
                    ${this.playing?"Stop":"Play loop"}
                  </button>
                  <div style="font-size: 11px; font-weight: 700; color: var(--cv-ink-muted);">Space plays the loop</div>
                </div>

                <!-- Pad Cells Grid -->
                <div class="pad-cells-grid pad-cells-row">
                  ${e.map((l,h)=>this.renderChordPad(l,h,t,!0))}
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
                    ${be(this.instrument)}
                  </button>
                  <button
                    class="play-style-chip ${this.expandedPlayStyle?"open":""}"
                    @click=${this.togglePlayStyleExpand}
                    aria-label="Change playing style"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.expandedPlayStyle?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.expandedPlayStyle?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                    ${this.playStyle||"Block chords"}
                  </button>
                  <div style="width: 1px; align-self: stretch; min-height: 28px; background: rgba(46,39,31,0.12); margin: 0 4px;"></div>
                  <button
                    class="tempo-chip ${this.tempoOpen?"open":""}"
                    @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1)}}
                    aria-label="Key, tempo and loop length"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.tempoOpen?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.tempoOpen?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    ${this.progression?.key||"C"} · ${this.progression?.bpm||84}
                  </button>
                  <button
                    class="feel-chip ${this.feelOpen?"open":""}"
                    @click=${()=>{this.feelOpen=!this.feelOpen,this.feelOpen&&(this.tempoOpen=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1)}}
                    aria-label="Feel and tone"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.feelOpen?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.feelOpen?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    Feel &amp; tone
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
                      ${le.map(l=>g`
                        <button
                          class="pill ${be(this.instrument)===l.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument||"Piano")===l.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.instrument||"Piano")===l.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.instrument=l.name,S.setInstrument(l.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:l.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                        >
                          <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}

                <!-- Play style tray if expanded -->
                ${this.expandedPlayStyle?g`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Play style</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${Ne.map(l=>g`
                        <button
                          class="pill ${(this.playStyle||"Block chords")===l.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.playStyle||"Block chords")===l.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.playStyle||"Block chords")===l.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.playStyle=l.name,S.setPlayStyle(l.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:l.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                        >
                          <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}
              </div>
            `:this.activeView==="song"?g`
              <div class="song-view-wrap" style="padding: 10px 4px 24px;">
                <!-- Song Play Transport Strip -->
                <div class="loop-strip-header" style="margin-bottom: 20px;">
                  <button
                    class="loop-play-btn"
                    @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}
                    style="background: ${this.playing?"#2E271F":t}; color: ${this.playing?"#FBF3E6":"#2E271F"}; min-height: 42px; padding: 0 18px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; white-space: nowrap;"
                    aria-label="${this.playing?"Stop":`Play song · ${this.sections.length} sections`}"
                  >
                    ${this.playing?"Stop":`Play song · ${this.sections.length} sections`}
                  </button>
                  <div class="strip-timeline-wrap">
                    <div class="strip-cells-bar loop-beat-cells">
                      ${this.sections.map((l,h)=>{const m=this.playing&&this.activePlayingSectionIdx===h;return g`
                          <div
                            class="strip-cell"
                            style="height: ${m?20:10}px; border-radius: 3px; background: ${m?"#F2735F":"rgba(46,39,31,0.22)"}; flex: 1;"
                          ></div>
                        `})}
                    </div>
                    <div class="strip-labels-row">
                      <div class="strip-status-label">
                        ${this.playing?`Section ${this.activePlayingSectionIdx+1} of ${this.sections.length} · ${this.sections[this.activePlayingSectionIdx]?.name||""}`:`${this.sections.length} sections · stopped`}
                      </div>
                      <div class="strip-space-hint">Space plays the song</div>
                    </div>
                  </div>
                </div>

                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); max-width: 600px;">
                  Each section reuses the loop, related but never identical. Tap a section to edit its chords, or press play to hear the whole arrangement.
                </div>

                <!-- Desktop / Wide Horizontal Track -->
                <div class="song-track-container">
                  ${this.sections.map((l,h)=>{const m=this.activeSectionIdx===h;return g`
                      <div
                        class="song-track-card ${m?"active":""}"
                        @click=${()=>{this.activeSectionIdx=h,this.activeView="loop"}}
                      >
                        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${h+1}</div>
                        <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink);">${l.name}</div>
                        <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); flex: 1;">${l.desc}</div>
                        <div class="song-card-chips">
                          ${l.progression.chords.map(y=>{const w=ee(y.tension);return g`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(w.radius*.4)}px; background: ${w.color}; flex-shrink: 0;" title="${y.name}"></div>`})}
                        </div>
                      </div>
                    `})}
                  <div
                    class="add-section-card"
                    @click=${()=>this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}
                    role="button"
                    tabindex="0"
                  >
                    <span style="font-size: 24px; line-height: 1; font-weight: 700;">+</span>
                    <span>Add a related section</span>
                  </div>
                </div>
              </div>
            `:g`
              <div class="play-it-wrap" style="padding: 18px 24px 32px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
                  <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: var(--cv-label); text-transform: uppercase;">Piano</div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click=${()=>{this.showDegrees=!this.showDegrees}}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees?t:"rgba(46,39,31,0.2)"}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                      <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees?"translateX(16px)":"translateX(0)"}; transition: transform 150ms ease;"></div>
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${e.map((l,h)=>this.renderPianoCard(l,h))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(l=>g`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===l?t:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===l?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=l}}
                      >${l}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${e.map((l,h)=>this.renderFretCard(l,h,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                </div>
              </div>
            `}
          </div>

          <!-- Row 3: Bottom Bar -->
          <div class="stage-bottom-bar">
            <div class="length-stepper">
              <button class="stepper-btn" @click=${this.onDecLength} aria-label="Fewer chords">−</button>
              <span class="stepper-count">${e.length} chords</span>
              <button class="stepper-btn" @click=${this.onIncLength} aria-label="More chords">+</button>
            </div>
            <button class="try-another-btn dice-reroll-btn" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${t}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
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
                <div class="chord-shape-badge" style="background: ${ee(e[this.detailIndex]?.tension||.1).color};"></div>
                <div style="flex: 1; min-width: 0;">
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${e[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${e[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="close-detail-btn" @click=${this.clearSelection} aria-label="Close chord info">×</button>
              </div>
            </div>

            <div class="inspector-body">
              ${this.renderChordDetailContent(e)}
            </div>
          `:this.swapIndex!==null?g`
            <!-- Chord Swap View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Swapping Bar ${this.swapIndex+1}</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${f?.name||""}</span>
                    ${this.showTheory&&f?.roman?g`<span class="swap-roman">${f.roman}</span>`:""}
                    <span class="swap-role">${Ie[f?.functionLabel||""]||""}</span>
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
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${f?.name||""}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide==="after"?"active-swap":""}"
                    style="background: ${this.abPick?this.abSide==="after"?t:"#F1E4D2":"transparent"}; color: #2E271F; border: ${this.abPick?"none":"1.5px dashed rgba(46,39,31,0.22)"};"
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
                    style="background: ${this.abPlaying?t:"#E8D9C2"};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying?"Pause loop":"Play loop with swap preview"}"
                  >
                    ${this.abPlaying?g`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>`:g`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${e.map((l,h)=>{const m=h===this.swapIndex,y=m&&this.abSide==="after"&&this.abPick?this.abPick.chord:l.name,w=this.abPlaying&&Math.floor(this.progressStep/4)===h;return g`
                        <button
                          class="ab-cell-item ${w?"active-step":""}"
                          style="background: ${m&&this.abSide==="after"&&this.abPick?t:"#F1E4D2"}; opacity: ${m?1:.65};"
                          @click=${()=>this.onAbCellClick(h)}
                          aria-label="Preview ${y} in bar ${h+1}"
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
                ${Ki.map(l=>{const h=this.activeSwapFamily===l.key,m=ee(l.tension),y=Math.round(m.size*.34),w=Math.round(m.radius*(y/m.size));return g`
                    <button
                      class="swap-family-tab ${h?"active":""}"
                      @click=${()=>{this.activeSwapFamily=l.key,this.requestUpdate()}}
                    >
                      ${l.twoTone?g`
                        <span class="two-tone-swatch" style="box-shadow: ${h?`0 0 0 3px ${t}`:"none"};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      `:g`
                        <span
                          class="family-shape"
                          style="width: ${y}px; height: ${y}px; border-radius: ${w}px; background: ${m.color}; box-shadow: ${h?`0 0 0 3px ${t}`:"none"};"
                        ></span>
                      `}
                      <span class="family-label ${h?"active":""}">${l.label}</span>
                    </button>
                  `})}
              </div>

              ${i?g`
                <div class="band-note-banner" style="background: ${i.color}22;">
                  <span>${this.showTheory?`${i.name}: ${i.theory}`:`Sorted for ${i.name} — their moves first`}</span>
                </div>
              `:""}

              ${v?g`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px;">
                  ${v}
                </div>
              `:""}

              <div class="alt-candidates-list">
                ${a.map(l=>{const h=!!i&&i.hoist.includes(l.name),m=ee(l.tension),y=Math.max(28,Math.min(38,Math.round(m.size*.32))),w=Math.round(m.radius*(y/m.size));return g`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord===l.name?"selected":""}" @click=${()=>this.selectAlternative(l)}>
                      <div class="alt-shape" style="width: ${y}px; height: ${y}px; border-radius: ${w}px; background: ${m.color}; box-shadow: ${this.abPick?.chord===l.name?`0 0 0 2px ${t}`:"none"}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: #2E271F;">${l.name}</span>
                          ${this.showTheory&&l.roman?g`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${l.roman}</span>`:""}
                          ${h?g`<span class="band-move-tag" style="background: ${i.color};">${i.name} move</span>`:""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${l.sub}</div>
                        ${this.showTheory&&l.notes&&l.notes.length?g`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${l.notes.join(" · ")}
                          </div>
                        `:""}
                      </div>
                      <button class="alt-play-chip alt-play-btn" @click=${k=>{k.stopPropagation(),this.previewAlternative(l.name)}}>Hear</button>
                    </div>
                  `})}
              </div>
              ${this.showTheory?this.renderTheoryStrip(o):""}
            </div>
          `:g`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div>
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${p}</div>
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
                ${e.map((l,h)=>{const m=ee(l.tension||.1),y=Math.round(18+(l.tension||.1)*62);return g`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(h)} aria-label="${l.name}, ${Ie[l.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${y}px; background: ${m.color};"></div>
                      </div>
                      <div class="arc-bar-name">${l.name}</div>
                      <div class="arc-bar-feel">${Ie[l.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${u}</div>
              ${this.showTheory&&o.setNote?g`
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(46,39,31,0.08); text-wrap: pretty;">
                  ${o.setNote}
                </div>
              `:""}

              <div class="inspector-tip-box" style="margin-top: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
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
          @toast=${l=>{this.dispatchEvent(new CustomEvent("toast",{detail:l.detail,bubbles:!0,composed:!0}))}}
        ></share-modal>
      </div>
    `}};$.styles=se`
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
    .song-track-container {
      display: flex;
      gap: 14px;
      margin-top: 18px;
      overflow-x: auto;
      padding-bottom: 12px;
      align-items: stretch;
    }
    @media (max-width: 768px) {
      .song-track-container {
        flex-direction: column;
        overflow-x: visible;
      }
    }
    .song-track-card {
      flex: 1;
      min-width: 190px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 150ms ease;
      box-sizing: border-box;
    }
    .song-track-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -14px rgba(46, 39, 31, 0.35);
    }
    .song-track-card.active {
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .song-card-chips {
      display: flex;
      gap: 5px;
      margin-top: 6px;
      flex-wrap: wrap;
      align-items: center;
    }
    .add-section-card {
      min-width: 180px;
      border-radius: 18px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-label, #8A6B3F);
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 150ms ease;
      box-sizing: border-box;
    }
    .add-section-card:hover {
      background: rgba(46, 39, 31, 0.03);
      transform: translateY(-2px);
    }
    .add-section-card:active {
      transform: scale(0.98);
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
  `;C([I({type:Object})],$.prototype,"chordData",2);C([I({type:Object})],$.prototype,"progression",2);C([I({type:Number})],$.prototype,"activeIndex",2);C([I({type:Number})],$.prototype,"progressStep",2);C([I({type:Array})],$.prototype,"order",2);C([I({type:Boolean})],$.prototype,"playing",2);C([I({type:Boolean})],$.prototype,"showTheory",2);C([I({type:String})],$.prototype,"instrument",2);C([I({type:String})],$.prototype,"playStyle",2);C([I({type:Boolean})],$.prototype,"isAuthenticated",2);C([I({type:String})],$.prototype,"userEmail",2);C([I({type:Array})],$.prototype,"sections",2);C([I({type:Number})],$.prototype,"activeSectionIdx",2);C([I({type:Number})],$.prototype,"activePlayingSectionIdx",2);C([I({type:Number})],$.prototype,"totalSongSteps",2);C([I({type:Boolean})],$.prototype,"isGenerating",2);C([I({type:Boolean})],$.prototype,"libraryOpen",2);C([x()],$.prototype,"isMobile",2);C([x()],$.prototype,"activeView",2);C([x()],$.prototype,"vibeOpen",2);C([x()],$.prototype,"selectedBand",2);C([x()],$.prototype,"freeText",2);C([x()],$.prototype,"vibePlaceholderIdx",2);C([x()],$.prototype,"expandedGenre",2);C([x()],$.prototype,"expandedMood",2);C([x()],$.prototype,"activeSwapFamily",2);C([x()],$.prototype,"swapIndex",2);C([x()],$.prototype,"isInspectorOpen",2);C([x()],$.prototype,"detailOpen",2);C([x()],$.prototype,"detailIndex",2);C([x()],$.prototype,"abPick",2);C([x()],$.prototype,"abSide",2);C([x()],$.prototype,"abPlaying",2);C([x()],$.prototype,"savedSets",2);C([x()],$.prototype,"renamingId",2);C([x()],$.prototype,"draftName",2);C([x()],$.prototype,"confirmDeleteId",2);C([x()],$.prototype,"librarySearch",2);C([x()],$.prototype,"librarySelectMode",2);C([x()],$.prototype,"librarySelected",2);C([x()],$.prototype,"playInstrument",2);C([x()],$.prototype,"showDegrees",2);C([x()],$.prototype,"mobileSheetOpen",2);C([x()],$.prototype,"mobileDetailSheetOpen",2);C([x()],$.prototype,"padFlash",2);C([x()],$.prototype,"padHeld",2);C([x()],$.prototype,"gridFor",2);C([x()],$.prototype,"lastPad",2);C([x()],$.prototype,"tempoOpen",2);C([x()],$.prototype,"feelOpen",2);C([x()],$.prototype,"shareOpen",2);C([x()],$.prototype,"expandedInstrument",2);C([x()],$.prototype,"expandedPlayStyle",2);C([x()],$.prototype,"barsPerChord",2);C([x()],$.prototype,"keyIdx",2);C([x()],$.prototype,"swing",2);C([x()],$.prototype,"spread",2);C([x()],$.prototype,"density",2);C([x()],$.prototype,"tone",2);C([x()],$.prototype,"showAdvancedFeel",2);C([x()],$.prototype,"humanEngineState",2);C([x()],$.prototype,"auditionDeg",2);C([x()],$.prototype,"auditionName",2);C([x()],$.prototype,"auditionBar",2);$=C([re("loop-screen")],$);var gr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,qe=(e,t,i,o)=>{for(var s=o>1?void 0:o?mr(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&gr(t,i,s),s};let ke=class extends ne{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(e){e.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const e=this.name.trim();e&&(this.dispatchEvent(new CustomEvent("save",{detail:e})),this.close())}onInput(e){this.name=e.target.value}onKeyDown(e){e.key==="Escape"?this.close():e.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?g`
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
    `:g``}};ke.styles=se`
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
  `;qe([I({type:Boolean})],ke.prototype,"visible",2);qe([I({type:String})],ke.prototype,"defaultName",2);qe([x()],ke.prototype,"mounted",2);qe([x()],ke.prototype,"name",2);qe([ro(".name-input")],ke.prototype,"inputEl",2);ke=qe([re("save-set-modal")],ke);var fr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,R=(e,t,i,o)=>{for(var s=o>1?void 0:o?vr(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&fr(t,i,s),s};const br=["Grand Piano","Stage Rhodes","Nylon Guitar","Cinematic Pad"],xr=["Block chords","Arpeggio","Strum","Broken (swing)"],yr=["flex-start","center","flex-end"];let z=class extends ne{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.embedded=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=fi(.5),this.mascotAlign=vi([...yr]),this.eggCounter=new jo,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(e){if(e.has("progressStep")){const t=e.get("progressStep");this.snapProgress=t!==void 0&&this.progressStep<t}}updated(e){e.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(e){this.dispatchEvent(new CustomEvent("select-section",{detail:e,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const e=this.sections[0]?.progression.genre??"Pop",t=this.instrument??vs(e),i=this.playStyle??bs(e),o=this.totalSteps||this.sections.reduce((l,h)=>l+h.order.length,0),s=!this.playing||o<=0?0:this.snapProgress?this.progressStep/o*100:(this.progressStep+1)/o*100,n=le.filter(l=>l.name!==t);let r=br.filter(l=>n.some(h=>h.name===l));const c=n.filter(l=>!r.includes(l.name)),d=this.expandedAllInstruments?n:n.filter(l=>r.includes(l.name)),p=Ne.filter(l=>l.name!==i);let u=xr.filter(l=>p.some(h=>h.name===l));const a=p.filter(l=>!u.includes(l.name)),v=this.expandedAllPlayStyles?p:p.filter(l=>u.includes(l.name)),b=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],f=b?Ae(b.progression.mood):"#C9A9E0";return g`
      <div class="frame" style="${this.embedded?"padding: 10px 0 30px;":""}">
        ${this.embedded?"":g`
          <app-header
            .isAuthenticated=${this.isAuthenticated}
            @view-sets=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}
            @wordmark-click=${()=>this.onWordmarkClick()}
          ></app-header>
        `}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          ${this.embedded?g`
            <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 16px;">
              Each section reuses your loop with musical permutations (Verse, Chorus, Bridge). Press play in the transport bar to hear the full arrangement.
            </div>
          `:g`
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
            ${this.sections.map((l,h)=>{const m=this.playing?h===this.activePlayingSectionIdx:h===this.activeSectionIdx,y=Ae(l.progression.mood);return g`
                <div class="section-row ${m?"active":""}" style=${m?`--ring-color:${y}`:""} @click=${()=>this.selectSection(h)}>
                  <div>
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${h+1}</div>
                    <div class="section-name" style="margin-top: 2px;">${l.name}</div>
                    <div class="section-chords">${l.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${l.order.map(w=>{const k=l.progression.chords[w],E=ee(k.tension);return g`<div class="section-chip" style="background:${E.color};border-radius:${Math.round(E.radius*.4)}px;" title="${k.name}"></div>`})}
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
              <button class="play-btn" style="background:${f}" @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}>
                ${this.playing?"Stop":`Play song · ${this.sections.length} sections`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${s}%;background:${f};--progress-duration:${Fs}ms"
                ></div>
              </div>
              ${this.isAuthenticated?g`
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

            ${this.expandedInstrument?g`
              <div class="control-options">
                ${d.map(l=>g`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:l.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${l.color}"></span>${l.name}
                  </div>
                `)}
                ${c.length?g`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${c.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?g`
              <div class="control-options">
                ${v.map(l=>g`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:l.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${l.color}"></span>${l.name}
                  </div>
                `)}
                ${a.length?g`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${a.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?g`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
        
        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${e&&b?`${e} · ${b.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${l=>{this.dispatchEvent(new CustomEvent("save-set",{detail:l.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};z.styles=se`
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
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .section-chords {
      font-size: 12px;
      line-height: 1.5;
      color: var(--cv-ink-muted);
      margin-top: 3px;
    }
    .section-chips {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
      align-items: center;
    }
    .section-chip {
      width: 16px;
      height: 16px;
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
      min-height: 44px;
      padding: 0 20px;
      border-radius: 100px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      font-weight: 800;
      font-size: 13px;
      color: #2E271F;
      transition: transform 0.2s ease;
      white-space: nowrap;
    }
    .play-btn:hover {
      transform: scale(1.03);
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
  `;R([I({type:Array})],z.prototype,"sections",2);R([I({type:Number})],z.prototype,"activeSectionIdx",2);R([I({type:Number})],z.prototype,"activePlayingSectionIdx",2);R([I({type:Boolean})],z.prototype,"canAddSection",2);R([I({type:Boolean})],z.prototype,"playing",2);R([I({type:Number})],z.prototype,"progressStep",2);R([I({type:Number})],z.prototype,"totalSteps",2);R([I({type:String})],z.prototype,"instrument",2);R([I({type:String})],z.prototype,"playStyle",2);R([I({type:Boolean})],z.prototype,"isAuthenticated",2);R([I({type:Boolean})],z.prototype,"isBookmarked",2);R([I({type:Boolean})],z.prototype,"embedded",2);R([x()],z.prototype,"expandedInstrument",2);R([x()],z.prototype,"expandedPlayStyle",2);R([x()],z.prototype,"expandedAllInstruments",2);R([x()],z.prototype,"expandedAllPlayStyles",2);R([x()],z.prototype,"snapProgress",2);R([x()],z.prototype,"saveModalVisible",2);R([x()],z.prototype,"mascot",2);R([x()],z.prototype,"mascotAlign",2);R([x()],z.prototype,"paradeTrigger",2);z=R([re("song-screen")],z);var wr=Object.defineProperty,kr=Object.getOwnPropertyDescriptor,de=(e,t,i,o)=>{for(var s=o>1?void 0:o?kr(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&wr(t,i,s),s};const Xi={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},Sr=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Qi={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},Zi={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},eo={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Je={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}},Ir=[4,9,2,7,11,4],to=[7,0,4,9];let ie=class extends ne{constructor(){super(...arguments),this.order=[0,1,2,3],this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.embedded=!1,this.playInstrument="Piano",this.showDegrees=!1,this.activeChordIndex=null}parseChord(e){const t=/^([A-G][b#]?)(.*)$/.exec(e||"C"),i=t?t[1]:"C",o=t?t[2]:"",s=Qi[o]||Qi[eo[o]||"maj"]||[0,4,7];return{root:i,rootPc:Xi[i]===void 0?0:Xi[i],q:o,intervals:s}}shapeQual(e){const t=e===""?"maj":e;if(Je[5][t]||Je[6][t])return t;const i=eo[t];return i&&(Je[5][i]||Je[6][i])?i:"maj"}guitarVoicing(e){const t=this.parseChord(e),i=this.shapeQual(t.q),o=[];return[[6,4],[5,9]].forEach(([s,n])=>{const r=Je[s][i];if(!r)return;const c=((t.rootPc-n)%12+12)%12;o.push({rootFret:c,frets:r.map(d=>d===null?null:d+c)})}),o.length?(o.sort((s,n)=>s.rootFret-n.rootFret),o[0].frets):null}ukeVoicing(e){const t=this.parseChord(e),i=to,o=t.intervals.map(c=>(t.rootPc+c)%12),s=c=>{const d=new Set(c);let p=null;const u=[],a=v=>{if(v===4){const b=u.map((m,y)=>(i[y]+m)%12);for(const m of d)if(b.indexOf(m)<0)return;for(const m of b)if(!d.has(m))return;const f=u.filter(m=>m>0),l=f.length?Math.max(...f)-Math.min(...f):0;if(l>3)return;const h=l*12+u.reduce((m,y)=>m+y,0);(!p||h<p.score)&&(p={frets:u.slice(),score:h});return}for(let b=0;b<=5;b++)u.push(b),a(v+1),u.pop()};return a(0),p},n=s(o);if(n)return n.frets;const r=s(t.intervals.filter(c=>c!==7).map(c=>(t.rootPc+c)%12));return r?r.frets:null}degOf(e,t){return Zi[((e-t)%12+12)%12]||"1"}notesLineFor(e){return e.intervals.map(t=>{const i=Sr[(e.rootPc+t)%12];return this.showDegrees?`${i} (${this.degOf((e.rootPc+t)%12,e.rootPc)})`:i}).join(" · ")}onChordClick(e){this.activeChordIndex=e,this.dispatchEvent(new CustomEvent("chord-preview",{detail:e,bubbles:!0,composed:!0})),setTimeout(()=>{this.activeChordIndex===e&&(this.activeChordIndex=null)},450)}onBackClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}renderPianoSvg(e,t){const n=[0,2,4,5,7,9,11],r=this.parseChord(e),c=[],d=[],p=[];for(let a=0;a<2;a++)n.forEach((v,b)=>{c.push({x:(a*7+b)*22,w:22-1.5,h:86})});for(let a=0;a<2;a++)[0,1,3,4,5].forEach(v=>{const b=a*7+v;d.push({x:b*22+22*.64,w:22*.58,h:52})});r.intervals.forEach(a=>{const v=r.rootPc+a,b=Math.floor(v/12),f=v%12,l=n.indexOf(f),h=a===0,m=h?"#F2735F":t,y=this.showDegrees&&Zi[a%12]||"";if(l>=0){const w=b*7+l;p.push({cx:w*22+(22-1.5)/2,cy:67,r:9,fill:m,label:y,lc:h?"#FBF3E6":"#2E271F"})}else{const k=(b*7+n.indexOf(f-1))*22+22*.64,E=22*.58;p.push({cx:k+E/2,cy:38,r:7.5,fill:m,label:y,lc:h?"#FBF3E6":"#2E271F"})}});const u=14*22;return g`
      <svg width="${u}" height="${86}" viewBox="0 0 ${u} ${86}" style="display:block;max-width:100%;height:auto;">
        ${c.map(a=>U`
          <rect x="${a.x}" y="0" width="${a.w}" height="${a.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${d.map(a=>U`
          <rect x="${a.x}" y="0" width="${a.w}" height="${a.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${p.map(a=>U`
          <circle cx="${a.cx}" cy="${a.cy}" r="${a.r}" fill="${a.fill}"></circle>
          ${a.label?U`
            <text x="${a.cx}" y="${a.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${a.lc}" font-family="'Plus Jakarta Sans',sans-serif">${a.label}</text>
          `:""}
        `)}
      </svg>
    `}renderFretSvg(e,t){const r=this.parseChord(e),c=t?to:Ir,d=t?this.ukeVoicing(e)||[null,null,null,null]:this.guitarVoicing(e)||[null,null,null,null,null,null],p=c.length,u=d.filter(k=>k!==null&&k>0),a=u.length&&Math.max(...u)>4?Math.min(...u)-1:0,v=[],b=[],f=[],l=[],h=[];for(let k=0;k<p;k++)v.push({x:k*18});for(let k=0;k<=4;k++)b.push({y:16+k*24,sw:k===0&&a===0?3:1.2});d.forEach((k,E)=>{const N=E*18;if(k===null){h.push({x:N});return}if(k===0){l.push({x:N});return}const _=((c[E]+k-r.rootPc)%12+12)%12;f.push({cx:N,cy:16+(k-a-.5)*24,fill:_===0?"#F2735F":"#2E271F",label:this.showDegrees?this.degOf((c[E]+k)%12,r.rootPc):""})});const m=(p-1)*18+26,y=16+4*24+12,w=(p-1)*18;return{posLabel:a>0?`${a+1}fr`:"",svg:g`
        <svg width="${m}" height="${y}" viewBox="-13 -2 ${m} ${y}" style="display:block;">
          ${b.map(k=>U`
            <rect x="0" y="${k.y}" width="${w}" height="${k.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${v.map(k=>U`
            <rect x="${k.x}" y="16" width="1.2" height="${4*24}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${l.map(k=>U`
            <circle cx="${k.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${h.map(k=>U`
            <text x="${k.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${f.map(k=>U`
            <circle cx="${k.cx}" cy="${k.cy}" r="7.5" fill="${k.fill}"></circle>
            ${k.label?U`
              <text x="${k.cx}" y="${k.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${k.label}</text>
            `:""}
          `)}
        </svg>
      `}}render(){if(!this.progression)return g``;const e=Ae(this.progression.mood);this.style.setProperty("--active-mood-color",e);const t=this.order.map(s=>this.progression.chords[s]||this.progression.chords[0]),i=this.playInstrument==="Piano",o=i?"One voicing per chord, root position — the red dot is the root, play left to right.":"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.";return g`
      ${this.embedded?"":g`
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
        ></app-header>
      `}

      <div class="container" style="${this.embedded?"padding: 10px 0 40px;":""}">
        ${this.embedded?"":g`
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

        ${i?g`
          <div class="cards-grid piano-grid">
            ${t.map((s,n)=>{const r=this.parseChord(s.name),c=this.activeChordIndex===n;return g`
                <div
                  class="chord-card ${c?"lit":""}"
                  @click=${()=>this.onChordClick(n)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div class="chord-name">${s.name}</div>
                    <div class="chord-roman">${s.roman||""}</div>
                  </div>
                  ${this.renderPianoSvg(s.name,e)}
                  <div class="notes-line">${this.notesLineFor(r)}</div>
                </div>
              `})}
          </div>
        `:g`
          <div class="cards-grid fret-grid">
            ${t.map((s,n)=>{const r=this.parseChord(s.name),c=this.renderFretSvg(s.name,this.playInstrument==="Ukulele"),d=this.activeChordIndex===n;return g`
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
                    ${c.posLabel?g`<div class="pos-label">${c.posLabel}</div>`:""}
                  </div>
                  ${c.svg}
                  <div class="notes-line">${this.notesLineFor(r)}</div>
                </div>
              `})}
          </div>
        `}
      </div>
    `}};ie.styles=se`
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
  `;de([I({type:Object})],ie.prototype,"progression",2);de([I({type:Array})],ie.prototype,"order",2);de([I({type:Boolean})],ie.prototype,"isAuthenticated",2);de([I({type:String})],ie.prototype,"userEmail",2);de([I({type:Number})],ie.prototype,"savedCount",2);de([I({type:Boolean})],ie.prototype,"embedded",2);de([x()],ie.prototype,"playInstrument",2);de([x()],ie.prototype,"showDegrees",2);de([x()],ie.prototype,"activeChordIndex",2);ie=de([re("play-along-screen")],ie);var $r=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,He=(e,t,i,o)=>{for(var s=o>1?void 0:o?Cr(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&$r(t,i,s),s};let Se=class extends ne{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(e){e.has("open")&&this.open&&(this.mounted=!0)}updated(e){e.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&Re.renderGoogleButton(this.googleBtnContainer,t=>{t.success?this.close():t.message&&(this.errorMessage=t.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const e=await Re.signInWithGoogle();e.success?this.close():e.message&&(this.errorMessage=e.message)}catch(e){const t=e instanceof Error?e.message:String(e);this.errorMessage=t||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?g``:g`
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
    `}};Se.styles=se`
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
  `;He([I({type:Boolean})],Se.prototype,"open",2);He([x()],Se.prototype,"mounted",2);He([x()],Se.prototype,"isOAuthLoading",2);He([x()],Se.prototype,"errorMessage",2);He([ro("#google-btn-container")],Se.prototype,"googleBtnContainer",2);Se=He([re("auth-modal")],Se);var Tr=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,O=(e,t,i,o)=>{for(var s=o>1?void 0:o?Er(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Tr(t,i,s),s};let A=class extends ne{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="loop",this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.theoryGroups=[],this.borrowedChords=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.previousScreenBeforeSets="loop",this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=e=>{e.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Re.signOut(),F.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const e=localStorage.getItem("chroma-chords-instrument");e&&le.some(i=>i.name===e)&&(this.instrument=e);const t=localStorage.getItem("chroma-chords-play-style");t&&Ne.some(i=>i.name===t)&&(this.playStyle=t),S.setInstrument(this.instrument),S.setPlayStyle(this.playStyle),this.unsubscribeAuth=Re.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=F.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=F.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=S.subscribeTick((i,o,s,n,r)=>{this.activeIndex=i,this.progressStep=o,typeof s=="number"&&(this.activePlayingSectionIdx=s),typeof n=="number"&&(this.totalSongSteps=n),this.playing=S.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),Us().then(i=>{this.chordData=i,this.progression||(this.progression=di(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(o,s)=>s),S.setProgression(this.progression,this.order),this.sections=Fe.createInitialSong(this.progression,this.order),this.screen="loop")}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),S.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return F.isAdmin}syncRouteFromHash(){const e=window.location.hash.replace(/^#/,"").toLowerCase();e==="sets"||e==="11a"?(this.libraryOpen=!0,this.screen="loop"):e==="play-along"||e==="12a"?this.screen="play-along":e==="song"||e==="5a"?(this.screen="song",this.sections.length&&S.setSong(this.sections)):this.screen="loop"}setScreen(e){this.screen=e;const t=`#${e}`;window.location.hash!==t&&history.pushState(null,"",t)}onGenreChange(e){this.genre=e.detail,this.regenerate()}onMoodChange(e){this.mood=e.detail,this.regenerate()}async onGenerate(e){if(!this.isGenerating){this.isGenerating=!0;try{this.keyOverride=null,this.scaleOverride=null;const t=e?.detail?.promptText||this.activeSearchPrompt||void 0,i=await Nn.resolvePrompt(this.chordData,this.genre,this.mood,this.length,t,this.pendingChordSuggestion);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),S.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),S.setPlayStyle(i.playStyle));const o=i.progression;this.progression=o,this.order=Array.from({length:o.chords.length},(s,n)=>n),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,S.setProgression(o,this.order),S.reset(),this.setScreen("loop"),this.sections=Fe.createInitialSong(o,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}catch(t){console.error("Failed to generate progression:",t),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(e){this.length=e.detail,this.regenerate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;const e=di(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=e,this.order=Array.from({length:this.length},(t,i)=>i),this.activeIndex=0,this.progressStep=0,S.setProgression(e,this.order),this.sections=Fe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(S.startAutoplay(),S.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(e){const t=e.detail,i=[];for(const o of t.chords){let s=o.notes;(!s||s.length===0)&&(s=Y(o.name,j(t.key||"C",t.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=t.id,this.genre=t.genre||"Pop",this.mood=t.mood||"Dreamy",this.progression={genre:t.genre||"Unknown",mood:t.mood||"Neutral",key:t.key||"C",scaleType:t.scaleType||"MAJOR",bpm:t.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.showTheory=t.showTheory??this.showTheory,t.barsPerChord&&S.setBarsPerChord(t.barsPerChord),t.feel&&S.setFeelSettings(t.feel),S.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=Fe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${t.name}"`)}onDeleteProject(e){F.deleteProject(e.detail),this.currentProjectId===e.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(e){const t=F.getProjects().find(i=>i.id===e.detail.id);t&&(t.name=e.detail.name,F.saveProject(t),this.requestUpdate())}async onSyncProjects(){await F.syncWithCloud(),this.requestUpdate()}onSaveSet(e){this.saveProject(e.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(e){this.instrument=e.detail,localStorage.setItem("chroma-chords-instrument",e.detail),S.setInstrument(e.detail)}onSetPlayStyle(e){this.playStyle=e.detail,localStorage.setItem("chroma-chords-play-style",e.detail),S.setPlayStyle(e.detail)}onTogglePlay(){this.playing=S.togglePlay()}onTogglePlaySong(){S.setSong(this.sections),this.playing=S.togglePlay()}onChordTap(e){this.progression&&(this.playing&&(S.stopAutoplay(),this.playing=!1),S.clearABOverride(),this.swapIndex=e.detail,this.sheetMode="swap",this.alternatives=dn(this.chordData,this.progression,e.detail),this.theoryGroups=Ti(this.chordData,this.progression,e.detail),this.borrowedChords=Oo(this.chordData,this.progression,e.detail),this.sheetOpen=!0,S.playChordAtIndex(e.detail,.8))}onAuditionChord(e){S.auditionChord(e.detail,.8)}onSelectAlternative(e){if(!this.progression||this.swapIndex===null)return;const t=e.detail,o=[...this.progression.chords];o[this.swapIndex]=t.chord,this.progression={...this.progression,chords:o},S.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.showToast(`Swapped in ${t.chord.name}`)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null,S.clearABOverride()}onProgressionChange(e){this.progression=e.detail,S.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=Fe.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const e=Fe.addSection(this.sections,this.progression);this.sections=e.sections,this.activeSectionIdx=e.activeIndex,this.requestUpdate()}onSelectSection(e){this.activeSectionIdx=e.detail;const t=this.sections[e.detail];t&&(this.order=t.order.slice(),S.setOrder(this.order)),this.requestUpdate()}showToast(e,t){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=e,this.toastUndoId=t||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(F.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(e){if(!this.progression)return;const t=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=t;const i=F.getProjects().find(c=>c.id===t),o=e||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s=S.getFeelSettings(),n=S.getBarsPerChord(),r={id:t,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:n,feel:{swing:s.swing??0,spread:s.spread??50,density:s.density??50,tone:s.tone??"Warm",humanState:s.humanState}};F.saveProject(r),e&&F.scheduleCloudSync(),this.showToast(`Saved "${o}"`,t),this.requestUpdate()}render(){return this.currentProjectId&&F.isProjectSaved(this.currentProjectId),g`
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
        ${this.progression?g`
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
            @library-open-change=${e=>{this.libraryOpen=e.detail}}
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
            @toast=${e=>this.showToast(e.detail)}
          ></loop-screen>
        `:g`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

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

        <auth-modal
          .open=${this.authModalOpen}
          @close-modal=${()=>{this.authModalOpen=!1}}
        ></auth-modal>
      </div>
    `}};A.styles=se`
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
  `;O([x()],A.prototype,"chordData",2);O([x()],A.prototype,"screen",2);O([x()],A.prototype,"libraryOpen",2);O([x()],A.prototype,"genre",2);O([x()],A.prototype,"mood",2);O([x()],A.prototype,"progression",2);O([x()],A.prototype,"activeIndex",2);O([x()],A.prototype,"progressStep",2);O([x()],A.prototype,"order",2);O([x()],A.prototype,"keyOverride",2);O([x()],A.prototype,"scaleOverride",2);O([x()],A.prototype,"playing",2);O([x()],A.prototype,"showTheory",2);O([x()],A.prototype,"instrument",2);O([x()],A.prototype,"playStyle",2);O([x()],A.prototype,"sheetOpen",2);O([x()],A.prototype,"sheetMode",2);O([x()],A.prototype,"swapIndex",2);O([x()],A.prototype,"alternatives",2);O([x()],A.prototype,"theoryGroups",2);O([x()],A.prototype,"borrowedChords",2);O([x()],A.prototype,"length",2);O([x()],A.prototype,"sections",2);O([x()],A.prototype,"activeSectionIdx",2);O([x()],A.prototype,"activePlayingSectionIdx",2);O([x()],A.prototype,"totalSongSteps",2);O([x()],A.prototype,"pendingChordSuggestion",2);O([x()],A.prototype,"userEmail",2);O([x()],A.prototype,"isAuthenticated",2);O([x()],A.prototype,"syncStatus",2);O([x()],A.prototype,"authModalOpen",2);O([x()],A.prototype,"toastMessage",2);O([x()],A.prototype,"toastUndoId",2);O([x()],A.prototype,"isGenerating",2);A=O([re("chroma-chords-app")],A);
