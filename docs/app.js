import{f as Uo,u as Lo,s as to,n as Mi,l as io,F as yi,S as ye,G as rt,a as pe,E as _e,C as ke,V as Ve,D as Ie,R as we,P as K,b as xi,M as ze,c as oo,d as Se,g as zo,i as ue,e as me,h as m,O as _o,w as re}from"./assets/vendor-DZ9oKBXX.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vo={attribute:!0,type:String,converter:Lo,reflect:!1,hasChanged:Uo},Go=(t=Vo,e,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),o==="accessor"){const{name:r}=i;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,t,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,t,a),a}}}if(o==="setter"){const{name:r}=i;return function(a){const l=this[r];e.call(this,a),this.requestUpdate(r,l,t,!0,a)}}throw Error("Unsupported decorator location: "+o)};function w(t){return(e,i)=>typeof i=="object"?Go(t,e,i):((o,n,s)=>{const r=n.hasOwnProperty(s);return n.constructor.createProperty(s,o),r?Object.getOwnPropertyDescriptor(n,s):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(t){return w({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qo=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ho(t,e){return(i,o,n)=>{const s=r=>r.renderRoot?.querySelector(t)??null;return qo(i,o,{get(){return s(this)}})}}const Pe="chroma_chords_projects",Jo="chord_voyager_projects";class Re{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(Pe);if(e||(e=localStorage.getItem(Jo),e&&localStorage.setItem(Pe,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(n=>{(n.genre==="Unknown"||!n.genre)&&(n.genre="Pop",o=!0),Array.isArray(n.chords)||(n.chords=[],o=!0)}),o&&localStorage.setItem(Pe,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(Pe,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(n=>o.set(n.id,n)),i.forEach(n=>{const s=o.get(n.id);!s||n.lastModified>s.lastModified?o.set(n.id,n):n.lastModified===s.lastModified&&(s.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(n=>n.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem(Pe,JSON.stringify(i))}catch(n){console.error("Failed to save project to localStorage:",n)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(Pe,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),n=URL.createObjectURL(o),s=document.createElement("a");s.href=n,s.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(n)}static importProjectFile(e){return new Promise((i,o)=>{const n=new FileReader;n.onload=s=>{try{const r=s.target?.result,a=JSON.parse(r);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),i(a)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},n.onerror=()=>o(new Error("Failed to read file")),n.readAsText(e)})}}const at="chroma_chords_auth_token",_t="chroma_chords_auth_user",Yo="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Vt(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const n=decodeURIComponent(o.split("").map(s=>"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(n)}catch{return null}}function Wo(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Yo}}class Ko{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Wo(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(at);if(e){const i=Vt(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(at),localStorage.removeItem(_t),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Vt(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Vt(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(at,e),localStorage.setItem(_t,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:n=>{if(n.credential){const s=this.handleCredentialResponse(n.credential);i?.({success:s.success,message:s.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(n){console.warn("Failed to render Google button:",n)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const n=this.handleCredentialResponse(o.credential);i({success:n.success,message:n.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const n=o instanceof Error?o.message:String(o);i({success:!1,message:n})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(at),localStorage.removeItem(_t)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const Ge=new Ko;class Xo{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const n={};this.applyAuthHeaders(n,i);const s=new AbortController,r=setTimeout(()=>s.abort(),8e3),a=await fetch(`${o}/api/health`,{method:"GET",headers:n,signal:s.signal});if(clearTimeout(r),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const l=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${l||a.statusText}`}}catch(n){return n instanceof Error&&n.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const n=this.formatUrl(e);if(!n)throw new Error("Worker URL is not configured");const s={"Content-Type":"application/json"};this.applyAuthHeaders(s,i);const r=new AbortController,a=setTimeout(()=>r.abort(),45e3);try{const l=await fetch(`${n}/api/sync`,{method:"POST",headers:s,body:JSON.stringify(o),signal:r.signal});if(clearTimeout(a),!l.ok){let d="";try{const p=await l.json();d=p.error||p.message||""}catch{d=await l.text().catch(()=>"")}throw new Error(`Cloud sync failed (${l.status}): ${d||l.statusText||"Unknown error"}`)}return await l.json()}catch(l){throw clearTimeout(a),l instanceof Error&&l.name==="AbortError"?new Error("Cloud sync request timed out (45s limit)"):l}}}const Qo=new Xo,Pi="chroma_chords_deleted_projects",Ri="chroma_chords_last_sync_time",Zo="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev";function en(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Zo}}function ji(t){return typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(t):null}function Ui(t,e){typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}class tn{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.lastSyncError=null,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=Ge.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.authenticated||(this.lastSyncError=null),this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return Re.getProjects()}isProjectSaved(e){return e?Re.getProjects().some(i=>i.id===e):!1}saveProject(e){Re.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){Re.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=ji(Pi);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Ui(Pi,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(s=>s.id===e),n=new Date().toISOString();o>=0?i[o].deletedAt=n:i.push({id:e,deletedAt:n}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return ji(Ri)}setLastSyncTime(e){Ui(Ri,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await Ge.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||en();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const n=Re.getProjects(),s=this.getTombstones(),r=this.getLastSyncTime(),a=r?new Date(r).getTime():0,d=(r?n.filter(v=>!v.syncedToCloud||v.lastModified&&v.lastModified>a):n).map(v=>({...v,deletedAt:null})),p=await Qo.sync(o,i,{sets:d,lastSyncTime:r,tombstones:s}),c=new Map;n.forEach(v=>{c.set(v.id,{...v,syncedToCloud:!0})});const g=p.tombstones||[],h=new Set(g.map(v=>v.id));(p.sets||[]).forEach(v=>{if(v.deletedAt)h.add(v.id);else{const C=c.get(v.id),I=v.lastModified||(v.updatedAt?new Date(v.updatedAt).getTime():0),x=C?.lastModified||0;(!C||I>=x)&&c.set(v.id,{id:v.id,name:v.name,lastModified:I,genre:v.genre,mood:v.mood,key:v.key,scaleType:v.scaleType,bpm:v.bpm,showTheory:v.showTheory,chords:Array.isArray(v.chords)?v.chords:[],syncedToCloud:!0})}}),h.forEach(v=>{c.delete(v)});const u=Array.from(c.values());Re.setProjects(u);const f=this.getTombstones(),y=new Set(s.map(v=>v.id)),b=f.filter(v=>!y.has(v.id));this.setTombstones(b),(p.lastSyncTime||p.syncedAt)&&this.setLastSyncTime(p.lastSyncTime||p.syncedAt),this.lastSyncError=null,this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(n){this.lastSyncError=n instanceof Error?n.message:String(n),console.warn("Cloud sync encountered an error, transitioning to offline status:",n),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}getLastSyncError(){return this.lastSyncError}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const D=new tn;let Gt=null,Ct=null,Et=null,Nt=null,et=null,qt=null,Ht=null,Jt=null,lt=null,Yt=null,Wt=null,Kt=null,Xt=null,ct=null,dt=null,pt=null,ht=null,ut=null,Qt=null,Zt=null,ei=null,mt=null,gt=null,ti=null,ii=null,ft=null,oi=null,ni=null;function no(){return Gt||(Gt=new oo({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Gt}let bt="Warm",je=null,si=null,Ae=null,ri=null,vt=null,Me=null,ai=null,li=null,ci=null,Oe=null;function Fe(){if(!je){je=new rt(1);const t=no();si=new pe({frequency:3200,type:"lowpass",rolloff:-12}),Ae=new rt(1),si.connect(Ae),Ae.connect(t),je.connect(si),ri=new _e({high:3.5,mid:0,low:-.5,highFrequency:4500}),vt=new ke({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{vt.start()}catch{}Me=new rt(0),ri.connect(vt),vt.connect(Me),Me.connect(t),je.connect(ri),ai=new pe({frequency:1800,type:"bandpass",Q:.8}),li=new Ve({frequency:.5,depth:.1,wet:.4}),ci=new Ie({distortion:.1,wet:.15}),Oe=new rt(0),ai.connect(li),li.connect(ci),ci.connect(Oe),Oe.connect(t),je.connect(ai)}return je}function tt(t){Fe();const e=t?t.toLowerCase().trim():"warm";bt=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const i=.05,o=Mi();try{Ae&&Me&&Oe&&(bt==="Warm"?(Ae.gain.rampTo(1,i,o),Me.gain.rampTo(0,i,o),Oe.gain.rampTo(0,i,o)):bt==="Glassy"?(Ae.gain.rampTo(0,i,o),Me.gain.rampTo(1,i,o),Oe.gain.rampTo(0,i,o)):bt==="Dusty"&&(Ae.gain.rampTo(0,i,o),Me.gain.rampTo(0,i,o),Oe.gain.rampTo(1,i,o)))}catch(n){console.warn("Failed to ramp master tone:",n)}}function on(t="Warm",e){const i=t?t.toLowerCase().trim():"warm",o=e??zo();if(i==="glassy"){const s=new _e({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new ke({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return s.connect(r),r.connect(o),s}if(i==="dusty"){const s=new pe({frequency:1800,type:"bandpass",Q:.8}),r=new Ve({frequency:.5,depth:.1,wet:.4}),a=new Ie({distortion:.1,wet:.15});return s.connect(r),r.connect(a),a.connect(o),s}const n=new pe({frequency:3200,type:"lowpass",rolloff:-12});return n.connect(o),n}const di=typeof import.meta<"u"&&"./"||"./",Rt=di.endsWith("/")?di:`${di}/`,so={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},nn=`${Rt}audio/samples/grand-piano/`,ro={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},sn=`${Rt}audio/samples/stage-rhodes/`,ao={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},rn=`${Rt}audio/samples/nylon-guitar/`,lo={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},an=`${Rt}audio/samples/jazz-guitar/`;function ln(t="piano"){let e=null,i={};if(t==="jazz-guitar"?(e=et,i=lo):t==="guitar"?(e=Nt,i=ao):t==="rhodes"||t==="epiano"?(e=Et,i=ro):(e=Ct,i=so),!e||!e.loaded)return null;const o=e._buffers;if(!o)return null;const n={};for(const s of Object.keys(i))try{const r=yi(s).toMidi(),a=o.has(r)?o.get(r):o.has(s)?o.get(s):null;a&&typeof a.get=="function"&&a.get()&&(n[s]=a.get())}catch{}return Object.keys(n).length>0?n:null}async function cn(t="piano"){const e=pn(t);if(e.loaded)return e;try{return await Promise.race([io(),new Promise((i,o)=>setTimeout(()=>o(new Error("Sample load timeout")),3e3))]),e}catch(i){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,i),null}}function co(){return Ct||(Ct=new Se({urls:so,baseUrl:nn,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(Fe())),Ct}function po(){return Et||(Et=new Se({urls:ro,baseUrl:sn,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(Fe())),Et}function ho(){return Nt||(Nt=new Se({urls:ao,baseUrl:rn,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(Fe())),Nt}function uo(){if(!et){const t=Fe();qt=new _e({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Ht=new pe({frequency:2800,type:"lowpass",rolloff:-12}),Jt=new we({decay:1.8,preDelay:.02,wet:.18}),et=new Se({urls:lo,baseUrl:an,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),et.connect(qt),qt.connect(Ht),Ht.connect(Jt),Jt.connect(t)}return et}function dn(){if(!ut){const t=Fe();Qt=new Ve({frequency:.45,depth:.18,wet:.65}),Zt=new Ie({distortion:.12,wet:.18}),ei=new pe({frequency:3400,type:"lowpass",rolloff:-12}),mt=new ke({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{mt.start()}catch{}ut=new K(ze,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),ut.connect(Qt),Qt.connect(Zt),Zt.connect(ei),ei.connect(mt),mt.connect(t)}return ut}function pn(t){return t==="jazz-guitar"?uo():t==="guitar"?ho():t==="rhodes"||t==="epiano"?po():co()}function hn(t){const e=Fe();switch(t){case"organ":return lt||(Yt=new Ve({frequency:5.8,depth:.12,wet:.55}),Wt=new Ie({distortion:.08,wet:.15}),Kt=new pe({frequency:4500,type:"lowpass",rolloff:-12}),lt=new K(ye,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),lt.connect(Yt),Yt.connect(Wt),Wt.connect(Kt),Kt.connect(e)),lt;case"pad-strings":if(!dt){Xt=new we({decay:5.5,preDelay:.03,wet:.45}),ct=new ke({frequency:.45,delayTime:4,depth:.5,wet:.4});try{ct.start()}catch{}dt=new K(ye,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),dt.connect(ct),ct.connect(Xt),Xt.connect(e)}return dt;case"juno-pad":if(!ht){pt=new ke({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{pt.start()}catch{}ht=new K(ze,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),ht.connect(pt),pt.connect(e)}return ht;case"stab":return gt||(ti=new Ie({distortion:.1,wet:.12}),ii=new we({decay:1,wet:.22}),gt=new K(ze,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),gt.connect(ti),ti.connect(ii),ii.connect(e)),gt;case"bell":return ft||(oi=new _e({high:3.5,mid:-.5,low:-2,highFrequency:4800}),ni=new we({decay:3.2,wet:.32}),ft=new K(xi,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),ft.connect(oi),oi.connect(ni),ni.connect(e)),ft;case"guitar":return ho();case"jazz-guitar":return uo();case"sh101":return dn();case"rhodes":case"epiano":return po();case"piano":default:return co()}}const Be=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],Li={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function jt(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(Li[e])return Li[e];const i=Be.find(o=>o.name.toLowerCase()===e);return i?i.name:"Grand Piano"}const ot=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1,isStrum:!0}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],Ut={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},Oi={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}};function mo(){return Promise.race([io(),new Promise(t=>setTimeout(t,80))])}function go(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function fo(t,e){const i=[];for(let o=0;o<e;o++)for(const n of t){const s=n.match(/^([A-G]#?)(-?\d+)$/);if(s){const r=s[1],a=parseInt(s[2],10)+o;i.push(`${r}${a}`)}else i.push(n)}return i}function bo(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const zi={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function wi(t){if(!t)return;const e=t.toLowerCase().trim();return zi[e]?zi[e]:Be.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function Si(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":ot.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function un(t,e=.7,i,o="piano",n){try{Promise.all([to(),mo()]).then(()=>{const s=hn(o);if(n&&typeof n=="object"&&Object.keys(n).length>0)try{typeof s.set=="function"&&s.set(n)}catch(g){console.warn("Failed to apply customConfig to Tone.js instrument:",g)}const r=t.length,a=r<=1?1:Math.max(.4,1/Math.sqrt(r)),l=Mi(),d=o==="guitar"||o==="jazz-guitar",p=o==="jazz-guitar";if(i&&i.arpMode&&i.arpMode!=="off"){const g=i.bpm??80,h=i.arpRate??"1/16",u=i.arpRange??1,f=i.arpMode,y=go(h,g),b=fo(t,u),v=bo(b,f),C=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*a:a,I=(i.isStrum===!0||i.playStyle==="Strum"||h==="1/32")&&(h==="1/32"||i.isStrum===!0),x=typeof i.arpGate=="number"?Math.max(.1,Math.min(2,i.arpGate)):.85,M=1+(Math.random()-.5)*.1*(i.humanVariance??0),P=typeof i.duration=="number"&&i.duration>0?i.duration:e,N=typeof i.spread=="number"&&i.spread>0?Math.min(.045,Math.max(.02,i.spread*.04)):.028,A=I?N:y,R=Math.max(1.4,P)*(1+(Math.random()-.5)*.1*(i.humanVariance??0)),G=Math.max(.04,y*x*M);v.forEach((_,$)=>{const U=i.microTiming?(Math.random()-.5)*i.microTiming*(I?.005:.02):0,X=I?R:G;let ee=C();I&&d&&$===0&&(ee=Math.min(1,ee*(p?1.05:1.1))),s.triggerAttackRelease(_,X,l+$*A+U,ee)});return}(d?[...t].sort((g,h)=>{try{return yi(g).toMidi()-yi(h).toMidi()}catch{return 0}}):t).forEach((g,h)=>{let u=0,f=a,y=e;if(i){const{minVelocity:b,maxVelocity:v,spread:C,microTiming:I,humanVariance:x,duration:M}=i;f=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(b+Math.random()*(v-b))/127)*a;const N=d?h*(p?.018:.024):0,A=h*(C??.3)*.1,R=(Math.random()-.5)*(I??0)*.05,G=(Math.random()-.5)*(x??0)*.03;u=Math.max(0,N+A+R+G),y=(M||e)*(1+(Math.random()-.5)*.2*(x??0))}else d&&(u=h*(p?.018:.024));d&&h===0&&(f=Math.min(1,f*(p?1.05:1.1))),s.triggerAttackRelease(g,y,l+u,f)})}).catch(s=>{console.warn("Audio playback gesture failed:",s)})}catch(s){console.warn("Audio playback failed:",s)}}function vo(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const i=[...t],n=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(n){const s=parseInt(n[2],10);i.push(`${n[1]}${s+1}`)}return i}function _i(t,e,i){const o=e==="Unknown"||!e?"Pop":e,n=i?.instrument?jt(i.instrument):void 0,s=n?Be.find(b=>b.name.toLowerCase()===n.toLowerCase()):void 0,r=i?.playStyle||i?.feelSettings?.playStyle,a=r?ot.find(b=>b.name===r):void 0,l=s?.instrument??Ut[o]??"piano",d=Oi[o]||{},p=a?.patch??{};i?.feelSettings?.tone&&tt(i.feelSettings.tone);const c={};if(i?.feelSettings){const{spread:b,swing:v,humanise:C,humanState:I,advOverride:x}=i.feelSettings;if(I)Object.assign(c,I);else if(typeof b=="number"&&(c.spread=parseFloat((b/100).toFixed(2))),typeof C=="number"&&(c.humanVariance=parseFloat((C/100).toFixed(2))),typeof v=="number"||typeof C=="number"){const M=typeof v=="number"?v:0,P=typeof C=="number"?C:45;c.microTiming=parseFloat((M/100*.5+P/100*.3).toFixed(2))}x&&(typeof x.spread=="number"&&(c.spread=x.spread),typeof x.duration=="number"&&(c.duration=x.duration),typeof x.humanVariance=="number"&&(c.humanVariance=x.humanVariance),typeof x.variance=="number"&&(c.humanVariance=x.variance),typeof x.microTiming=="number"&&(c.microTiming=x.microTiming),typeof x.micro=="number"&&(c.microTiming=x.micro),typeof x.arpMode=="string"&&(c.arpMode=x.arpMode),typeof x.arpRate=="string"&&(c.arpRate=x.arpRate),typeof x.arpRange=="number"&&(c.arpRange=x.arpRange),typeof x.arpGate=="number"&&(c.arpGate=x.arpGate),typeof x.minVelocity=="number"&&(c.minVelocity=x.minVelocity),typeof x.maxVelocity=="number"&&(c.maxVelocity=x.maxVelocity))}p.arpMode&&p.arpMode!=="off"&&(i?.feelSettings?.advOverride&&i.feelSettings.advOverride.arpMode!==void 0||(c.arpMode=p.arpMode,p.arpRate&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRate===void 0)&&(c.arpRate=p.arpRate),p.arpRange!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRange===void 0)&&(c.arpRange=p.arpRange))),p.isStrum!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.isStrum===void 0)&&(c.isStrum=p.isStrum);const g={...d,...p,...c,bpm:i?.bpm??d.bpm??90,playStyle:r,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},h=i?.duration??d.duration??.9,u=typeof c.duration=="number"?c.duration:p.durationMultiplier?h*p.durationMultiplier:h,f=i?.feelSettings?.density??50,y=vo(t,f);un(y,u,g,l,i?.customConfig)}let pi=null;function mn(){if(!pi){const t=no();pi=new ye({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return pi}function gn(t,e=.8,i,o=.85){try{Promise.all([to(),mo()]).then(()=>{const n=mn(),r=`${t.replace(/\d+$/,"")}1`,a=typeof i=="number"?i:Mi();n.triggerAttackRelease(r,e,a,o)}).catch(n=>console.warn("Sub bass audio failed:",n))}catch(n){console.warn("Sub bass audio failed:",n)}}function fn(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,n=(Array.isArray(t)?t:[]).filter(d=>typeof d=="string"&&d.trim().length>0).map(d=>d.replace(/\d+$/,""));if(n.length===0)return["C4","E4","G4"];let s=o,r=i[n[0]]??0;const a=[];n.forEach((d,p)=>{const c=i[d]??0;p>0&&c<=r&&s++,a.push({name:d,oct:s}),r=c});const l=(e||"").toLowerCase();if(l.includes("octave")||l.includes("high"))return a.map(d=>`${d.name}${d.oct+1}`);if(l.includes("inversion")||l.includes("1st")){if(a.length>1){const[d,...p]=a;return[...p.map(c=>`${c.name}${c.oct}`),`${d.name}${d.oct+1}`]}return a.map(d=>`${d.name}${d.oct}`)}else return a.map(d=>`${d.name}${d.oct}`)}const bn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],vn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],F={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},yn=new Set(["F","Bb","Eb","Ab","Db","Gb"]),qe=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],he={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},xn=Object.keys(he),At={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},He={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},Je={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},Ye={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function O(t,e){const i=(t%12+12)%12;return e?vn[i]:bn[i]}function oe(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",n=e;if(i&&/[A-G]/.test(i)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(o=`${i}b`,n=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(o=`${i}#`,n=e.slice(2)):(o=i,n=e.slice(1))}n=n.toLowerCase();let s="maj";return n.includes("maj9")||n.includes("m9")&&n.includes("maj")?s="maj9":n.includes("min9")||n.includes("m9")?s="min9":n.includes("dom9")||n.includes("9sus")||n.includes("9")?n.includes("9sus")||n.includes("sus9")?s="sus9":s="dom9":n.includes("m(maj7)")||n.includes("mmaj7")||n.includes("minmaj7")?s="mmaj7":n.includes("maj7sus")||n.includes("7sus")?s="sus7":n.includes("maj7")||n.includes("m7")&&n.includes("maj")?s="maj7":n.includes("min7")||n.includes("m7")?s="min7":n.includes("min6")||n.includes("m6")?s="min6":n.includes("maj6")||n.includes("6")&&!n.includes("m")?s="maj6":n.includes("dim7")?s="dim7":n.includes("dim")||n.includes("°")?s="dim":n.includes("aug")||n.includes("+")?s="aug":n.includes("sus2")?s="sus2":n.includes("sus4")||n.includes("sus")?s="sus4":n.includes("7")?s="dom7":n.includes("min")||n==="m"?s="min":s="maj",{root:o,quality:s}}const wn=Object.keys(Ye),de={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},yt={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},Le={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},Vi={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},yo=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Sn={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},kn={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Di={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},Ee=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Gi(t){return(Ee.find(e=>e.name===t)||Ee[0]).dot}const In={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function Cn(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function te(t,e){const i=t.reduce((n,s)=>n+e(s),0);let o=Math.random()*i;for(const n of t)if(o-=e(n),o<=0)return n;return t[t.length-1]}function En(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const ki=4,nt=1,We=8,Nn={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function xo(t,e="MAJOR",i="Pop",o="Uplifting"){let s={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(s*=1.4),t==="SUBTONIC"&&(s*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(s*=1.8),t==="SUBDOMINANT"&&(s*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(s*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(s*=2),t==="SUBMEDIANT"&&(s*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(s*=2.5),t==="SUBDOMINANT"&&(s*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(s*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(s*=2.2),t==="SUBDOMINANT"&&(s*=1.8),t==="SUBMEDIANT"&&(s*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(s*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(s*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(s*=2.2),t==="SUPERTONIC"&&(s*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(s*=2),t==="SUBMEDIANT"&&(s*=1.6),t==="MEDIANT"&&(s*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(s*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(s*=1.8),(Di[o]||[]).includes(t)&&(s*=1.3),Math.max(.01,s)}function Ce(t,e,i="MAJOR",o="Pop",n="Uplifting"){if(t===e)return .05;let r=(Nn[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(Di[n]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function Tn(t,e,i,o,n,s,r=ki){let a=i.filter(c=>t.degrees[c]);a.length||(a=i);const l=te(a,c=>xo(c,t.type,n,s))||"TONIC",d=[l];let p=l;for(let c=1;c<r;c++){const g=c===r-1;let h=i.filter(y=>t.degrees[y]);h.length||(h=i);const u=h.filter(y=>y!==p),f=u.length?u:h;if(g){const y=te(f,b=>{const v=Ce(b,d[0],t.type,n,s),C=Ce(p,b,t.type,n,s);return v*C});d.push(y)}else{const y=f.filter(C=>!d.includes(C)),b=y.length?y:f,v=te(b,C=>Ce(p,C,t.type,n,s));p=v,d.push(v)}}return d}function st(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function z(t,e){const{root:i,quality:o}=oe(t),n=F[i]??0,s=he[o]||he.maj,r=st(i,o,e);return s.map(a=>O(n+a,r))}async function $n(){const t=typeof import.meta<"u"?"./":"/",i=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let o=await fetch(i).catch(()=>null);if((!o||!o.ok)&&(o=await fetch("/chroma_chords_data.json").catch(()=>null)),(!o||!o.ok)&&(o=await fetch("./chroma_chords_data.json").catch(()=>null)),!o||!o.ok)throw new Error(`HTTP error: ${o?o.status:"failed to fetch chroma_chords_data.json"}`);const n=await o.json();return Bn(n),n}const An={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Mn={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},On={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Dn={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Fn={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},wo={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Bn(t){const e=[["MIXOLYDIAN",An],["DORIAN",Mn],["LYDIAN",On]];for(const[i,o]of e)for(const[n,s]of Object.entries(o)){const r=t.scales[`${s}_MAJOR`];if(!r)continue;const a=`${n}_${i}`,l={};for(const d of wo[i]){const p=Fn[`${i}_${d}`],c=r.degrees[p];if(!c)continue;const g=JSON.parse(JSON.stringify(c));g.next_chord_options=(g.next_chord_options||[]).map(h=>{if(h.nodeId.startsWith(`${s}_MAJOR_`)){const u=h.nodeId.replace(`${s}_MAJOR_`,""),f=Dn[`${i}_${u}`];if(f)return{name:h.name,nodeId:`${n}_${i}_${f}`}}return h}),l[d]=g}t.scales[a]={root:n,type:i,degrees:l}}}const Pn=[156,192,236],Rn=[242,115,95];function Tt(t,e,i){return t+(e-t)*i}function Ke(t){const e=Math.max(0,Math.min(1,t));return"#"+Pn.map((o,n)=>Math.round(Tt(o,Rn[n],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function ie(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(Tt(84,128,e)),radius:Math.round(Tt(40,12,e)),fontSize:Math.round(Tt(21,30,e)),color:Ke(e)}}function Mt(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function xe(t,e,i,o){const s=i.degrees[e].chord_name,r=Je[e]??.5,a=Ye[i.type]||Ye.MAJOR;return{name:Ii(s),tag:At[e]||"move",roman:a[e]||"?",color:Ke(r),functionLabel:He[e]||e,notes:z(s,o),scaleLabel:`${i.root} ${de[i.type]||i.type}`,desc:Mt(He[e]||e,de[i.type]||i.type,Ii(s)),degree:e,scaleKey:t,tension:r}}function Ii(t){const{root:e,quality:i}=oe(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const jn={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function So(t,e){let i=jn[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function Ot(t,e,i,o){const n=Math.max(nt,Math.min(We,o?.length??ki)),s=Sn[e]||"MAJOR",r=kn[i],a=o?.scaleType||(r&&s==="MAJOR"?r:s);let l=o?.key&&qe.includes(o.key)?o.key:En(qe),d=`${l}_${a}`;t.scales[d]||(l="C",d=`${l}_${a}`);let p=t.scales[d];if(!p){const C=Object.keys(t.scales).find(I=>I.endsWith(`_${a}`))||Object.keys(t.scales)[0];p=t.scales[C],l=p?p.root:"C",d=C}const c=B(l,a),g=Object.keys(p.degrees),h=Di[i]||[],u=In[a]||[],f=n===ki?u.filter(C=>C.degrees.every(I=>g.includes(I))):[],v=(f.length&&Math.random()<.25?te(f,C=>Cn(C,h)).degrees:Tn(p,d,g,h,e,i,n)).map(C=>xe(d,C,p,c));return{genre:e,mood:i,key:l,scaleType:a,bpm:So(e,i),chords:v}}function Un(t,e,i,o=[]){const n=t.chords.length,s=Math.max(nt,Math.min(We,e));if(s===n)return{progression:t,cachedTailChords:[...o]};if(s<n){const A=t.chords.slice(0,s),R=t.chords.slice(s);return{progression:{...t,chords:A},cachedTailChords:[...R,...o]}}const r=[...t.chords],a=[...o],l=s-n,d=[];for(;d.length<l&&a.length>0;)d.push(a.shift());const p=[...r,...d],c=s-p.length;if(c<=0)return{progression:{...t,chords:p},cachedTailChords:a};const g=t.key||"C",h=t.scaleType||"MAJOR";let u=`${g}_${h}`,f=i.scales?.[u];if(!f&&i.scales&&Object.keys(i.scales).length>0){const A=Object.keys(i.scales).find(R=>R.endsWith(`_${h}`))||Object.keys(i.scales)[0];f=i.scales[A],u=A}if(!f)return{progression:{...t,chords:p},cachedTailChords:a};const y=B(f.root||g,h),b=Object.keys(f.degrees);let v=b.filter(A=>f.degrees[A]);v.length||(v=b);const C=A=>{if(!A)return"TONIC";if(A.degree&&f.degrees[A.degree])return A.degree;for(const[R,G]of Object.entries(f.degrees))if(G.chord_name===A.name)return R;return"TONIC"},I=p[p.length-1];let x=C(I);const M=p[0],P=C(M),N=[];for(let A=0;A<c;A++){const R=A===c-1,G=v.filter(U=>U!==x),_=G.length?G:v;let $;R?$=te(_,U=>{const X=Ce(U,P,f.type,t.genre,t.mood),ee=Ce(x,U,f.type,t.genre,t.mood);return X*ee})||_[0]:$=te(_,U=>Ce(x,U,f.type,t.genre,t.mood))||_[0],x=$,N.push(xe(u,$,f,y))}return{progression:{...t,chords:[...p,...N]},cachedTailChords:a}}const Ln={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},zn={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function ko(t){return he[t]?t:oe(`C${t||""}`).quality}function Fi(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function Dt(t,e){const i=Ln[t]||{upper:"I",lower:"i"},n=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return Fi(n,e)}function Lt(t,e){const i=zn[(t%12+12)%12]||{upper:"?",lower:"?"},n=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return Fi(n,e)}function _n(t,e,i,o){const n=e==="maj"||e==="dom7"||e==="dom9",s=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&n)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&n)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&n)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&s)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=Je[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${o.root} ${de[o.type]||o.type} progression.`}}function zt(t,e,i,o){const n=(t%12+12)%12,s=(F[i]??0)+n,a=`${O(s,o)}${Bi[e]??e}`;return n===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${a} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:n===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${a} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:n===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${a} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:n===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${a} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${a} borrows its color from outside the current key.`}}function Vn(t,e,i,o,n){const s=i.degrees[e],{root:r}=oe(s.chord_name),a=F[r]??0,l=O(a,n),d=`${l}${Bi[o]??o}`,p=st(l,o,n),c=he[o]?he[o].map(u=>O(a+u,p)):z(s.chord_name,n),g=Dt(e,o),h=_n(e,o,d,i);return{name:d,tag:h.tag,roman:g,color:Ke(h.tension),functionLabel:h.functionLabel,notes:c,scaleLabel:`${i.root} ${de[i.type]||i.type}`,desc:h.desc,degree:e,scaleKey:t,tension:h.tension}}function Ci(t,e,i,o,n,s){const r=`${e}_${i}`,a=t.scales[r];if(!a||!o.length)return null;const l=B(e,i),d=F[e]??0,p={};Object.entries(a.degrees).forEach(([g,h])=>{const{root:u}=oe(h.chord_name),f=F[u]??0;f in p||(p[f]=g)});const c=o.slice(0,We).map(({root:g,quality:h})=>{const u=F[g]??d,f=p[u],y=ko(h);if(f){const I=a.degrees[f],{quality:x}=oe(I.chord_name);return y===x||!h&&x?xe(r,f,a,l):Vn(r,f,a,y,l)}const b=(u-d+12)%12,v=zt(b,y,e,l),C=Lt(b,y);return Gn(e,b,y,v.functionLabel,C,v.tag,l)});return c.length<nt?null:{genre:n,mood:s,key:e,scaleType:i,bpm:So(n,s),chords:c}}const Bi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Gn(t,e,i,o,n,s,r){const a=(F[t]??0)+e,l=O(a,r),d=ko(i),p=`${l}${Bi[d]??d}`,c=st(l,d,r),g=(he[d]||he.maj).map(f=>O(a+f,c)),h=n==="?"?Lt(e,d):n,u=.42;return{name:p,tag:s,roman:h,color:Ke(u),functionLabel:o==="Borrowed"?zt(e,d,t,r).functionLabel:o,notes:g,scaleLabel:"Borrowed",desc:`${p} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:u}}function Ei(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}function $t(t){const e=(t||"C").trim(),i=e[0]?.toUpperCase()||"C";let o=i,n=e.slice(1);if(e.length>1){const s=e[1];s==="b"||s==="B"||s==="♭"||s==="♭"?(o=`${i}b`,n=e.slice(2)):(s==="#"||s==="♯"||s==="♯")&&(o=`${i}#`,n=e.slice(2))}return{root:o,suffix:n}}function Io(t,e,i){const{root:o,suffix:n}=$t(t),s=o.replace("♭","b").replace("♯","#"),a=(((F[s]??0)+e)%12+12)%12;return`${O(a,i)}${n}`}function qi(t,e,i){if(!t||!t.chords||t.chords.length===0)return t;const o=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),n=/\bmaj\b|major/i.test(e),s=o&&!n,r=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),a=i||(s?"NATURAL_MINOR":n?"MAJOR":t.scaleType||"MAJOR"),l=r,d=(t.key||"C").replace("♭","b").replace("♯","#").trim(),p=F[d]??0,c=F[l]??0,g=((c-p)%12+12)%12,h=B(l,a),u=`${l}_${a}`,f=Le[a]||Le.MAJOR,y=t.chords.map(b=>{const v=Io(b.name,g,h),{root:C,quality:I}=oe(v),M=(((F[C]??0)-c)%12+12)%12;let P=null;for(const[U,X]of Object.entries(f))if(X===M){P=U;break}let N,A,R=b.tag||"move",G=b.tension,_=b.degree;if(P)_=P,N=Dt(_,I),A=He[_]||_,R=At[_]||R,G=Je[_]??G;else{_="BORROWED",N=Lt(M,I);const U=zt(M,I,l,h);A=U.functionLabel,R=U.tag||R,G=U.tension||.45}const $=z(v,h);return{...b,name:v,roman:N,functionLabel:A,tag:R,notes:$,degree:_,scaleKey:u,scaleLabel:`${l} ${de[a]||a}`,desc:Mt(A,de[a]||a,v),tension:G}});return{...t,key:l,scaleType:a,chords:y}}function qn(t,e,i,o){if(t==="sus4"||t==="sus2"||t==="sus7"||t==="sus9")return t;const n=t.includes("7"),s=t.includes("9"),r=t.includes("6");return e==="min"?s?"min9":n?i==="TONIC"&&(o==="HARMONIC_MINOR"||o==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":r?"min6":"min":e==="maj"?s?i==="DOMINANT"?"dom9":"maj9":n?i==="DOMINANT"?"dom7":"maj7":r?"maj6":"maj":e==="dim"?n?"dim7":"dim":e==="aug"?"aug":e}function Hn(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;default:return`${t}${e}`}}function Jn(t,e){if(!t||!t.chords||t.chords.length===0)return t;const i=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=(e||i).toUpperCase().replace(/\s+/g,"_"),n=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),s=F[n]??0,r=B(n,o),a=`${n}_${o}`,l=yt[i]||yt.MAJOR,d=Le[i]||Le.MAJOR,p=yt[o]||yt.MAJOR,c=Le[o]||Le.MAJOR,g=Vi[o]||Vi.MAJOR,h=t.chords.map(u=>{const{root:f,quality:y}=oe(u.name),v=(((F[f]??0)-s)%12+12)%12;let C=-1;if(u.degree&&u.degree!=="BORROWED"&&(C=l.indexOf(u.degree)),C===-1)for(let I=0;I<l.length;I++){const x=l[I];if(d[x]===v){C=I;break}}if(C>=0&&C<p.length){const I=p[C],x=c[I],M=(s+x)%12,P=O(M,r),N=g[I]||"maj",A=qn(y,N,I,o),R=Hn(P,A),G=z(R,r),_=Ye[o]?.[I];let $;if(_)if(A==="maj"||A==="min")$=_;else{const Ze=_.replace(/[°+]/g,"");$=Fi(Ze,A)}else $=Dt(I,A);const U=He[I]||I,X=At[I]||u.tag||"move",ee=Je[I]??u.tension;return{...u,name:R,roman:$,functionLabel:U,tag:X,notes:G,degree:I,scaleKey:a,scaleLabel:`${n} ${de[o]||o}`,desc:Mt(U,de[o]||o,R),tension:ee}}else{let I=null;for(const[x,M]of Object.entries(c))if(M===v){I=x;break}if(I){const x=Dt(I,y),M=He[I]||I,P=At[I]||u.tag||"move",N=Je[I]??u.tension,A=z(u.name,r);return{...u,roman:x,functionLabel:M,tag:P,notes:A,degree:I,scaleKey:a,scaleLabel:`${n} ${de[o]||o}`,desc:Mt(M,de[o]||o,u.name),tension:N}}else{const x=Lt(v,y),M=zt(v,y,n,r),P=z(u.name,r);return{...u,roman:x,functionLabel:M.functionLabel,tag:M.tag||u.tag,tension:M.tension||.45,notes:P,degree:"BORROWED",scaleKey:a,scaleLabel:"Borrowed",desc:`${u.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:o,chords:h}}const Hi={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Co(t,e,i,o){const n=F[t]??0;let s=Hi[e]||Hi.Major;return i==="6th"?s=[...s,9]:i==="7th (dom / m7)"?s=[...s,10]:i==="Major 7th (M7)"?s=[...s,11]:i==="9th"&&(s=[...s,10,14]),s.map(r=>O(n+r,o))}const Yn={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Wn={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Eo(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Yn[e]??""}${Wn[i]??""}`}const Kn={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},No={};qe.forEach(t=>{No[F[t]]=t});function Xn(t,e){const i=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=Kn[i]??0,s=(((F[t]??0)-o)%12+12)%12;return No[s]??"C"}function B(t,e){const i=Xn(t,e);return yn.has(i)||i.includes("b")}function hi(t,e,i){const o=Ei(t.name),n=o.includes("b"),s=Eo(o,e,i),r=Co(o,e,i,n);let a=t.roman||"";if(a){const p=a.match(/^([♭♯b#]*)([ivxIVX]+)/);if(p){const c=p[1],g=p[2],h=e==="Minor"||e==="Diminished",u=h?g.toLowerCase():g.toUpperCase();let f="";e==="Diminished"?f=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?f="sus4":i==="6th"?f="6":i==="7th (dom / m7)"?f="7":i==="Major 7th (M7)"?f=h?"m(maj7)":"maj7":i==="9th"&&(f=h?"m9":"maj9"),a=`${c}${u}${f}`}}const l=t.initialChord?.tension??t.tension??.1,d=t.initialChord?.color??t.color??Ke(l);return{...t,name:s,notes:r,roman:a,tension:l,color:d}}function V(t,e,i,o,n,s,r,a){const l=Eo(t,e,i),d=Co(t,e,i,a);return{name:l,tag:o||"sub",roman:o,color:Ke(r),functionLabel:n,notes:d,scaleLabel:"Substitution",desc:s,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function Ni(t,e,i){const o=F[e.key]??0,n=e.scaleType.includes("MINOR"),s=B(e.key,e.scaleType),r=n?[(()=>{const p=O(o+1,!0),c=V(p,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:c.name,roman:"♭II",notes:c.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:c,tension:.6}})(),(()=>{const p=O(o+5,!0),c=V(p,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — deeper minor mood",chord:c,tension:.45}})(),(()=>{const p=O(o+10,!0),c=V(p,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:c.name,roman:"v",notes:c.notes,sub:"a step further into shadow — unresolving drift",chord:c,tension:.52}})()]:[(()=>{const p=O(o+8,!0),c=V(p,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:c.name,roman:"♭VI",notes:c.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:c,tension:.5}})(),(()=>{const p=O(o+5,!0),c=V(p,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — softer, sadder",chord:c,tension:.42}})(),(()=>{const p=O(o+3,!0),c=V(p,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:c.name,roman:"♭III",notes:c.notes,sub:"a step further out — cooler, more remote",chord:c,tension:.58}})()],a=[(()=>{const p=O(o+7,s),c=O(o+2,s),g=V(c,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${p}7 — sharpens the approach`,.82,s);return{name:g.name,roman:"V7/V",notes:g.notes,sub:`aimed at ${p}7 — sharpens the approach`,chord:g,tension:.82}})(),(()=>{const p=O(o+(n?3:9),s),c=O(o+4,s),g=V(c,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${p}m7 — makes it feel arrived at`,.88,s);return{name:g.name,roman:"V7/vi",notes:g.notes,sub:`aimed at ${p}m7 — makes it feel arrived at`,chord:g,tension:.88}})(),(()=>{const p=O(o+1,!0),c=V(p,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:c.name,roman:"subV7",notes:c.notes,sub:"a tritone substitute — slides in sideways",chord:c,tension:.95}})()],l=[(()=>{const p=O(o+5,s),c=V(p,"Major","Major 7th (M7)",n?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,s);return{name:c.name,roman:"IV",notes:c.notes,sub:"floats rather than resolving",chord:c,tension:.3}})(),(()=>{const p=O(o,s),c=V(p,n?"Minor":"Major","9th",n?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,s);return{name:c.name,roman:n?"im9":"Imaj9",notes:c.notes,sub:"the same home with more air in it",chord:c,tension:.18}})(),(()=>{const p=O(o+(n?3:4),s),c=V(p,n?"Major":"Minor","7th (dom / m7)",n?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,s);return{name:c.name,roman:n?"♭III":"iii",notes:c.notes,sub:"wistful, halfway between home and away",chord:c,tension:.35}})()],d=[(()=>{const p=O(o,s),c=V(p,n?"Minor":"Major",n?"None":"Major 7th (M7)",n?"i":"I","Tonic","full resolution — the sense of arriving",.05,s);return{name:c.name,roman:n?"i":"I",notes:c.notes,sub:"full resolution — the sense of arriving",chord:c,tension:.05}})(),(()=>{const p=O(o+7,s),c=V(p,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,s);return{name:c.name,roman:"V7",notes:c.notes,sub:"the pull that makes home feel earned",chord:c,tension:1}})(),(()=>{const p=O(o+(n?8:9),s),c=V(p,n?"Major":"Minor","7th (dom / m7)",n?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,s);return{name:c.name,roman:n?"♭VI":"vi",notes:c.notes,sub:"a soft landing instead of a full stop",chord:c,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:a},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:l},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:d}]}function Ft(t,e,i){const o=F[e.key]??0,n=e.scaleType.includes("MINOR"),s=B(e.key,e.scaleType),r=e.chords;if(n){const f=r[0]?.name||"chord 1",y=r[1]?.name||"chord 2",b=r[2]?.name||"chord 3",v=r[3]?.name||"chord 4",C=V(O(o,s),"Major","None","I","Major tonic","same root, turned bright",.2,s),I=V(O(o+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s),x=V(O(o+9,s),"Minor","None","vi","Submediant","melodic lift upward",.4,s),M=V(O(o+11,s),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,s);return[{name:C.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:C.notes,chord:C,tension:.2},{name:I.name,sub:`in place of ${y} · the Dorian lift, sunny and open`,roman:"IV",notes:I.notes,chord:I,tension:.35},{name:x.name,sub:`in place of ${b} · melodic lift upward`,roman:"vi",notes:x.notes,chord:x,tension:.4},{name:M.name,sub:`in place of ${v} · classical harmonic pull`,roman:"vii°",notes:M.notes,chord:M,tension:.55}]}const a=r[0]?.name||"chord 1",l=r[1]?.name||"chord 2",d=r[2]?.name||"chord 3",p=r[3]?.name||"chord 4",c=V(O(o,s),"Minor","None","i","Tonic minor","same root, turned sad",.3,s),g=V(O(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),h=V(O(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),u=V(O(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:c.name,sub:`in place of ${a} · same root, turned sad`,roman:"i",notes:c.notes,chord:c,tension:.3},{name:g.name,sub:`in place of ${l} · the lift, but heavier`,roman:"iv",notes:g.notes,chord:g,tension:.4},{name:h.name,sub:`in place of ${d} · big and cinematic`,roman:"♭VI",notes:h.notes,chord:h,tension:.45},{name:u.name,sub:`in place of ${p} · lands sideways, not home`,roman:"♭VII",notes:u.notes,chord:u,tension:.5}]}const Qn={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Zn={m8:43303,circuit:43302};function es(t,e,i){let o=Qn[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${Zn[e]}/`);const n=i&&i.length>0?i.map(l=>t.chords[l]).filter(l=>!!l):t.chords,s=n.map(l=>encodeURIComponent(l.name)).join("+");if(e==="circuit"){const l=g=>{const h=(g||"").toLowerCase();return h.includes("octave")||h.includes("high")||h.includes("up")?"octave":h.includes("inversion")||h.includes("1st")?"1st":"root"},d=n.map(g=>l(g.voicing)).join("+"),p=encodeURIComponent(t.key||"C"),c=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${o}?p=${s}&v=${d}&key=${p}&scale=${c}`}const r=l=>{const d=(l||"").toLowerCase();return d.includes("octave")||d.includes("high")||d.includes("up")?"octave":d.includes("inversion")||d.includes("1st")?"inv1":"root"},a=n.map(l=>r(l.voicing)).join("+");return`${o}?p=${s}&v=${a}`}function ts(t,e,i,o){const n=`${t}_${e}`;let s=i.scales[n];if(!s){const p=Object.keys(i.scales).find(c=>c.endsWith(`_${e}`))||Object.keys(i.scales)[0];s=i.scales[p]||{root:t,type:e,degrees:{}}}const r=B(t,e),a=Ye[e]||Ye.MAJOR,l=wo[e]||["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],d=new Set(o?.chords.map(p=>p.name.toUpperCase())||[]);return l.map(p=>{const c=s.degrees[p],g=c?c.chord_name:t,h=Ii(g),u=a[p]||"?",f=He[p]||p,y=Je[p]??.5,b=z(g,r),v=d.has(h.toUpperCase());return{degreeKey:p,roman:u,chordName:h,functionLabel:f,notes:b,tension:y,isUsedInLoop:v}})}const is={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function os(t,e){const{root:i,quality:o}=oe(t),n=F[i]??0,s=he[o]||he.maj,r=st(i,o,e);return s.map(a=>{const l=O(n+a,r),d=is[a]||{symbol:`+${a}`,name:`Interval ${a}`,isGuideTone:!1};return{note:l,intervalSymbol:d.symbol,roleName:d.name,isGuideTone:d.isGuideTone}})}function ns(t){if(!t||t.length<2)return[];const e=[],i=o=>o.replace(/[^A-Za-z♭♯]/g,"");for(let o=0;o<t.length;o++){const n=o,s=(o+1)%t.length,r=t[n],a=t[s],l=i(r.roman),d=i(a.roman),p=n+1,c=s+1,g=`Bar ${p} → ${c}`,h=`${r.name} → ${a.name}`,u=`${r.roman}–${a.roman}`;(l==="V"||l==="v")&&(d==="I"||d==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name}):(l==="IV"||l==="iv")&&(d==="I"||d==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name}):(l==="V"||l==="v")&&(d==="vi"||d==="♭VI"||d==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name}):l==="♭VII"&&(d==="I"||d==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${a.name} (♭VII–${a.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name}):(d==="V"||d==="v")&&l!=="V"&&l!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${a.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,move:h,degrees:u,bars:g,fromBar:p,toBar:c,fromChord:r.name,toChord:a.name})}return e}function ss(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const o=i,n=(i+1)%t.length,s=t[o],r=t[n],a=new Set(s.notes.map(y=>F[y]??0)),l=r.notes.filter(y=>a.has(F[y]??-1)),d=F[Ei(s.name)]??0,p=F[Ei(r.name)]??0,c=Math.min((p-d+12)%12,(d-p+12)%12);let g="Harmonic Shift";l.length>=2?g=`Strong Common Tones (${l.length} shared)`:c<=2?g="Stepwise Bass Motion":(c===5||c===7)&&(g="4th / 5th Cycle Jump");const h=`Bar ${o+1} → ${n+1}`,u=`${s.name} → ${r.name}`,f=l.length?`${l.join(" · ")} held over`:c<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:o+1,toBar:n+1,fromChord:s.name,toChord:r.name,move:h,chords:u,link:f,hasShared:l.length>0,commonNotes:l,semitoneDistance:c,motionType:g})}return e}function Ti(t,e=4){const i=Array.isArray(t)?t.filter(c=>typeof c=="string"&&c.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},n=i.map(c=>c.replace(/\d+$/,"")),s=n[0],r=o[s]??0;let a=e,l=r;const d=[];return n.forEach((c,g)=>{const h=o[c]??0;g>0&&h<=l&&a++,d.push(`${c}${a}`),l=h}),[`${s}${e-1}`,...d]}class rs{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?(i&&i.length===e.chords.length&&i.every(o=>o<e.chords.length)?this.order=i:this.order=Array.from({length:e.chords.length},(o,n)=>n),this.order.length>0&&(this.activeIndex>=this.order.length&&(this.activeIndex=this.activeIndex%this.order.length),this.progressStep>=this.order.length&&(this.progressStep=this.progressStep%this.order.length))):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const i=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,e)),o=Math.max(1,this.barsPerChord);return Math.round(o*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const n=this.sections[o].order.length;if(e<i+n){this.activeSectionIndex=o;const s=e-i;this.activeIndex=this.sections[o].order[s]??0,this.progressStep=s;return}i+=n}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay();const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const n=o.notes&&o.notes.length>0?o.notes:z(o.name,B(e.progression.key,e.progression.scaleType)),s=Ti(n,4),r=i!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[i]?{...this.feelSettings,...this.feelSettings.barFeel[i]}:this.feelSettings;_i(s,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:r?.playStyle??this.playStyle??void 0,feelSettings:r})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(n=>typeof n=="string"&&n.trim().length>0)){const n=i.name||"CMAJ",s=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";o=z(n,B(s,r))}i.voicing?this.playChordNotes(o,1.2,i.voicing):this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&gn(o[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(n=>typeof n=="string"&&n.trim().length>0)){const n=e.name||"CMAJ",s=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";o=z(n,B(s,r))}e.voicing?this.playChordNotes(o,i,e.voicing):this.playChordNotes(o,i)}playChordAtIndex(e,i=.8,o,n){if(!this.progression||!this.progression.chords[e])return;const s=this.progression.chords[e];let r=Array.isArray(s.notes)?s.notes:[];if(r.length===0||!r.every(l=>typeof l=="string"&&l.trim().length>0)){const l=s.name||"CMAJ",d=this.progression.key||"C",p=this.progression.scaleType||"MAJOR";r=z(l,B(d,p))}const a=o||s.voicing;a!==void 0?this.playChordNotes(r,i,a,n):this.playChordNotes(r,i)}playChordNotes(e,i,o,n,s){if(!this.progression)return;const r=Array.isArray(e)?e.filter(p=>typeof p=="string"&&p.trim().length>0):[];if(r.length===0)return;const a=o?fn(r,o):Ti(r,4),l=s!==void 0?s:this.playing?this.order[this.activeIndex]??0:void 0,d=l!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[l]?{...this.feelSettings,...this.feelSettings.barFeel[l]}:this.feelSettings;_i(a,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:d?.playStyle??this.playStyle??void 0,velocity:n,feelSettings:d})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const S=new rs,as=Ee.map(t=>t.name),ls=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function cs(t,e){const i=t.length+1,o=e.length+1,n=Array.from({length:i},()=>new Array(o).fill(0));for(let s=0;s<i;s++)n[s][0]=s;for(let s=0;s<o;s++)n[0][s]=s;for(let s=1;s<i;s++)for(let r=1;r<o;r++)n[s][r]=t[s-1]===e[r-1]?n[s-1][r-1]:1+Math.min(n[s-1][r-1],n[s-1][r],n[s][r-1]);return n[i-1][o-1]}function De(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),n=e.find(l=>l.toLowerCase()===o);if(n)return n;let s=null,r=1/0;for(const l of e){const d=cs(o,l.toLowerCase());d<r&&(r=d,s=l)}const a=Math.max(2,Math.floor(o.length*.4));return r<=a?s:null}function ds(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,n=De(o.root,qe),s=De(o.quality,xn);n&&s&&e.push({root:n,quality:s})}if(e.length)return e.slice(0,We)}function ps(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=De(e.presetId,ls)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function ui(t,e){const i=t&&typeof t=="object"?t:{},o=De(i.genre,yo)??e.genre,n=De(i.mood,as)??e.mood,s=De(i.key,qe)??void 0,r=De(i.scaleType,wn)??void 0,a=s&&r?ds(i.chords):void 0;let l;typeof i.length=="number"&&Number.isFinite(i.length)&&(l=Math.max(nt,Math.min(We,Math.round(i.length))));const d=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,p=ps(i.instrumentConfig),c=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:n,key:s,scaleType:r,length:l,chords:a,rhythmStyle:d,instrumentConfig:p,_rateLimit:c}}const hs=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],us="chroma-chords-llm-provider",ms="chroma-chords-llm-model";function gs(){const t=localStorage.getItem(us);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function fs(){const t=localStorage.getItem(ms);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:hs[0].id}const mi={genre:yo[0],mood:Ee[0].name},bs="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",vs=12e3,To={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},$o={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Bt(t,e){const i=t.toLowerCase();let o=null,n=0;return Object.keys(e).forEach(s=>{const r=e[s].reduce((a,l)=>a+(i.includes(l)?1:0),0);r>n&&(n=r,o=s)}),o}function ys(t){const e=Bt(t,$o),i=Bt(t,To);return!e||!i?null:{genre:e,mood:i}}async function xs(t){const e=new AbortController,i=setTimeout(()=>e.abort(),vs);try{const n=await fetch(bs,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:gs(),model:fs()}),signal:e.signal}),s=await n.json().catch(()=>null);if(!n.ok||s&&typeof s=="object"&&"error"in s){const r=s&&typeof s=="object"&&"error"in s?String(s.error):`HTTP ${n.status}`,a=new Error(`Classifier request failed: ${r}`);throw s&&typeof s=="object"&&"_rateLimit"in s&&(a._rateLimit=s._rateLimit),a}return s}finally{clearTimeout(i)}}async function ws(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const n=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),s=Bt(n,$o)??"Synthwave",r=Bt(n,To)??"Dreamy",a={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},l={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},d={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},p=d[s]||d._default,c=a[s]||"rhodes",g=l[s]||"slow_arpeggio",h={genre:s,mood:r,key:p.key,scaleType:p.scaleType,length:8,chords:p.chords,rhythmStyle:g,instrumentConfig:{presetId:c,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ui(h,{genre:s,mood:r})}const o=ys(t);try{const n=await xs(t);return ui(n,o??mi)}catch(n){console.warn("LLM classification failed, falling back to keyword heuristic:",n);const s=ui(o??mi,mi);return n&&typeof n=="object"&&"_rateLimit"in n&&(s._rateLimit=n._rateLimit),s}}class Ss{static async resolvePrompt(e,i,o,n,s,r){let a=r||null,l=null,d=null;if(!a&&s&&s.trim().length>0)try{a=await ws(s)}catch(g){console.warn("Failed to classify prompt via LLM/local fallback:",g)}const p=!!(a&&a.chords?.length&&a.key&&a.scaleType);let c=null;return p&&a&&a.chords&&a.key&&a.scaleType&&(c=Ci(e,a.key,a.scaleType,a.chords,a.genre||i,a.mood||o)),c||(c=Ot(e,i,o,{length:n})),p&&a&&(a.instrumentConfig?.presetId&&(l=wi(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(d=Si(a.rhythmStyle)??null)),c.chords.length>n&&(c={...c,chords:c.chords.slice(0,n)}),s&&(c={...c,searchTerm:s}),{progression:c,instrument:l,playStyle:d,normalizedSuggestion:a}}}const $e=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)}];class fe{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(n,s)=>s);return[{name:$e[0].name,desc:$e[0].desc,progression:e,order:o.slice()}]}static generateSectionProgression(e,i,o,n){const s=e.key,r=e.scaleType||"MAJOR",a=e.genre||"Pop",l=e.mood||"Uplifting",d=e.bpm||120,p=B(s,r),c=`${s}_${r}`,g=e.chords.length||4;let h=n&&n>=2&&n<=8?n:g;i==="Pre-chorus"&&!n&&g>4&&(h=4);const u=o?.scales?o.scales[c]:void 0;let f=[];return u&&Object.keys(u.degrees).length>0?f=this.walkSectionMarkov(u,c,i,a,l,p,h,e,o):f=this.fallbackSectionChords(e,i,h,p),i==="Chorus"&&this.areChordSequencesIdentical(e.chords,f)&&(f=this.shiftChorusVariation(f,u,c,p)),{genre:a,mood:l,key:s,scaleType:r,bpm:d,chords:f}}static walkSectionMarkov(e,i,o,n,s,r,a,l,d){const p=Object.keys(e.degrees),c=this.pickSectionStartDegree(o,e,n,s),g=[c];let h=c;for(let f=1;f<a;f++){const y=f===a-1,b=p.filter(C=>e.degrees[C]&&C!==h),v=b.length?b:p;if(y){const C=te(v,I=>{let x=Ce(h,I,e.type,n,s);return o==="Outro"&&I==="TONIC"?x*=8:o==="Pre-chorus"&&(I==="DOMINANT"||I==="SUBDOMINANT")?x*=6:o==="Chorus"&&(I==="TONIC"||I==="SUBDOMINANT"||I==="DOMINANT")&&(x*=2.5),Math.max(.01,x)});g.push(C)}else{const C=v.filter(M=>!g.includes(M)),I=C.length?C:v,x=te(I,M=>{let P=Ce(h,M,e.type,n,s);return P*=this.getSectionTransitionMultiplier(o,h,M),Math.max(.01,P)});h=x,g.push(x)}}const u=g.map(f=>xe(i,f,e,r));if(o==="Bridge"&&u.length>=3&&d)try{const f=Ft(d,l,1);if(f&&f.length>0){const y=f.find(b=>b.roman.includes("VI")||b.roman.includes("VII")||b.roman==="iv")||f[0];if(y&&y.chord){const b=Math.min(u.length-2,1);u[b]={...y.chord,desc:y.sub||"Shadow chord borrowed for the bridge detour."}}}}catch{}return u}static pickSectionStartDegree(e,i,o,n){const s=Object.keys(i.degrees),r=a=>!!i.degrees[a];if(e==="Chorus"){const a={SUBDOMINANT:3.5,SUBMEDIANT:3,SUPERTONIC:1.2,TONIC:.5,MEDIANT:.8,DOMINANT:.6};return te(s,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Bridge"){const a={SUBMEDIANT:3.5,MEDIANT:2.5,SUBDOMINANT:2.2,SUPERTONIC:1.5,TONIC:.2};return te(s,l=>(a[l]||.5)*(r(l)?1:.01))}if(e==="Pre-chorus"){const a={SUPERTONIC:3.2,SUBDOMINANT:2.8,SUBMEDIANT:2,TONIC:.3};return te(s,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Outro"){const a={SUBDOMINANT:2.5,SUBMEDIANT:2,TONIC:2.5};return te(s,l=>(a[l]||.5)*(r(l)?1:.01))}return te(s,a=>xo(a,i.type,o,n))}static getSectionTransitionMultiplier(e,i,o){if(e==="Chorus"){if(i==="SUBDOMINANT"&&(o==="DOMINANT"||o==="TONIC"))return 2.2;if(i==="SUBMEDIANT"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2;if(i==="DOMINANT"&&(o==="TONIC"||o==="SUBMEDIANT")||i==="TONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 1.8}else if(e==="Pre-chorus"){if(i==="SUPERTONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2.8;if(i==="SUBMEDIANT"&&o==="SUPERTONIC")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 3.2}else if(e==="Bridge"){if(i==="SUBMEDIANT"&&o==="MEDIANT")return 2;if(i==="MEDIANT"&&o==="SUBDOMINANT")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 2}else if(e==="Outro"){if(i==="SUBDOMINANT"&&o==="TONIC")return 2.8;if(i==="SUBMEDIANT"&&o==="SUBDOMINANT")return 2}return 1}static fallbackSectionChords(e,i,o,n){const s=e.chords,r=F[e.key]??0,a=(e.scaleType||"").includes("MINOR");let l=[];if(i==="Chorus")s.length>=4?l=[s[1],s[2],s[3]||s[0],s[0]]:l=[...s].reverse();else if(i==="Bridge"){const p=a?V(O(r+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n):V(O(r+8,!0),"Major","None","♭VI","Flat submediant","cinematic shadow detour",.48,!0);s.length>=4?l=[s[3]||s[1],p,s[1]||s[2],s[2]||s[0]]:l=[p,...s]}else i==="Pre-chorus"?s.length>=4?l=[s[1],s[2],s[1],s[2]]:l=s:i==="Outro"?s.length>=4?l=[s[1],s[3]||s[1],s[1],s[0]]:l=s:l=($e.find(g=>g.name===i)||$e[1]).reorder(s.length).map(g=>s[g%s.length]);const d=[];for(let p=0;p<o;p++)d.push(l[p%l.length]);return d}static areChordSequencesIdentical(e,i){return e.length!==i.length?!1:e.every((o,n)=>o.name===i[n]?.name)}static shiftChorusVariation(e,i,o,n=!0,s){const r=s||e.length;if(!i||!o)return e;const a=i.degrees.SUBDOMINANT?xe(o,"SUBDOMINANT",i,n):null,l=i.degrees.DOMINANT?xe(o,"DOMINANT",i,n):null,d=i.degrees.SUBMEDIANT?xe(o,"SUBMEDIANT",i,n):null,p=i.degrees.TONIC?xe(o,"TONIC",i,n):null;if(a&&l&&d&&p){const c=[a,l,d,p],g=[];for(let h=0;h<r;h++)g.push(c[h%c.length]);return g}return e}static addSection(e,i,o,n){if(e.length>=$e.length)return{sections:e,activeIndex:e.length-1};const s=$e[e.length],r=this.generateSectionProgression(i,s.name,o,n),a=Array.from({length:r.chords.length},(p,c)=>c),l={name:s.name,desc:s.desc,progression:r,order:a},d=[...e,l];return{sections:d,activeIndex:d.length-1}}static removeSection(e,i){if(e.length<=1||i<0||i>=e.length)return{sections:e,activeIndex:0};const o=e.filter((s,r)=>r!==i),n=Math.min(i,o.length-1);return{sections:o,activeIndex:Math.max(0,n)}}static syncActiveSection(e,i,o,n){if(!e[i])return e;const s=[...e];return s[i]={...s[i],progression:o,order:n.slice()},s}}var ks=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,Z=(t,e,i,o)=>{for(var n=o>1?void 0:o?Is(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&ks(e,i,n),n};const Cs=[{id:"loop",name:"Chords"},{id:"melody",name:"Melody"},{id:"song",name:"Song"},{id:"play",name:"Play it"}];let W=class extends me{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.syncError=null,this.title="Chroma Chords",this.activeTab="loop",this.aiTokens=4,this.aiNextIn=60,this.midiStatus="Idle",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.capacityTimer=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=D.subscribeProjects(()=>{this.savedCount=D.getProjects().length,this.requestUpdate()}),this.unsubscribeSyncStatus=D.subscribeSyncStatus(t=>{this.syncStatus=t,this.syncError=D.getLastSyncError(),this.requestUpdate()}),this.savedCount=D.getProjects().length,this.syncStatus=D.getSyncStatus(),this.syncError=D.getLastSyncError(),this.capacityTimer=setInterval(()=>{this.aiTokens<4&&(this.aiNextIn<=1?(this.aiTokens=Math.min(4,this.aiTokens+1),this.aiNextIn=60):this.aiNextIn-=1,this.requestUpdate())},1e3)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.capacityTimer&&clearInterval(this.capacityTimer)}setTab(t){this.activeTab=t,this.dispatchEvent(new CustomEvent("tab-change",{detail:t,bubbles:!0,composed:!0}))}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.showCapacityNote&&(this.accountMenuOpen=!1)}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.accountMenuOpen&&(this.showCapacityNote=!1)}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenMidi(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("open-midi",{bubbles:!0,composed:!0}))}onSyncNow(){this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}renderSyncStatusText(){return this.syncStatus==="synced"?"Synced with cloud":this.syncStatus==="syncing"?"Syncing with cloud...":this.syncStatus==="offline"?"Sync failed (offline)":"Sign in to sync"}render(){const t=this.userEmail?this.userEmail.charAt(0).toUpperCase():"U";return m`
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
          ${Cs.map(e=>m`
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
              ${[0,1,2,3].map(e=>m`
                <span class="pip-dot ${e<this.aiTokens?"filled":""}"></span>
              `)}
            </span>
            <span>${this.aiTokens>=4?"AI ready":`Refill ${this.aiNextIn}s`}</span>
          </button>

          ${this.showCapacityNote?m`
            <div class="popover-panel capacity-panel" role="note">
              <span style="flex:1;">
                AI generates remaining chords & top-line melodies. Refills 1 token every 60 seconds.
              </span>
              <button class="panel-close-btn" @click=${this.toggleCapacityNote} aria-label="Dismiss">×</button>
            </div>
          `:""}

          ${this.isAuthenticated?m`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">
              ${t}
              ${this.syncStatus==="offline"?m`<span class="account-badge offline" title="Cloud sync offline"></span>`:""}
              ${this.syncStatus==="syncing"?m`<span class="account-badge syncing" title="Syncing..."></span>`:""}
            </button>
          `:m`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?m`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail||"Signed in"}</div>
                <div class="sync-status-line ${this.syncStatus}">
                  <span class="sync-dot ${this.syncStatus}"></span>
                  <span>${this.renderSyncStatusText()}</span>
                </div>
                ${this.syncStatus==="offline"&&this.syncError?m`
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
    `}};W.styles=ue`
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
  `;Z([w({type:Boolean})],W.prototype,"compact",2);Z([w({type:Boolean})],W.prototype,"isAdmin",2);Z([w({type:Boolean})],W.prototype,"isAuthenticated",2);Z([w({type:String})],W.prototype,"userEmail",2);Z([w({type:Number})],W.prototype,"savedCount",2);Z([w({type:String})],W.prototype,"syncStatus",2);Z([w({type:String})],W.prototype,"syncError",2);Z([w({type:String})],W.prototype,"title",2);Z([w({type:String})],W.prototype,"activeTab",2);Z([w({type:Number})],W.prototype,"aiTokens",2);Z([w({type:Number})],W.prototype,"aiNextIn",2);Z([w({type:String})],W.prototype,"midiStatus",2);Z([k()],W.prototype,"accountMenuOpen",2);Z([k()],W.prototype,"showCapacityNote",2);W=Z([ge("app-header")],W);const Ao={oasis:{id:"oasis",name:"Oasis",color:"#F6D98B",font:"Anton, sans-serif",weight:800,pillFs:13,pillTrack:"0.08em",presetId:"guitar",rhythmStyle:"driving_strum",defaultBpm:116,tagline:"Leans on a bright major chord that shouldn’t fit, then walks home",theoryTagline:"Borrowed major ♭III, plagal IV–I, Major III substitution, anchored D4/G4 guitar drone",plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",sig:[{k:"Harmony",v:"Borrows a bright chord from outside the key — ♭III or ♭VI — and treats it as if it belonged."},{k:"Cadence",v:"Lands on IV–I rather than V–I, so the ending feels wide open instead of shut."},{k:"Voicing",v:"A sus4 held over a root that never moves, strummed the whole bar."}],hoist:["E♭maj7","Fmaj7","A♭"],genre:"Rock",mood:"Uplifting",favoredKeys:["C","G","D","A","E"],favoredScales:["MAJOR","MIXOLYDIAN"],favoredMoods:["Anthemic","Uplifting"],basisArchetypes:[["C","G","Am","E7","F","G","C","C"],["C","Bb","F","C","C","Bb","F","G"],["C","G","Eb","F","C","G","F","C"]],cMajorBasisChords:["C","G","Am","E7","F","G","C","C"],signatureTricks:[{id:"oasis-major-iii",name:"Major III Lift",roman:"III7",plain:"Replaces the quiet minor iii with a soaring major chord that lifts the whole bar",theory:"Secondary dominant (V7/vi) resolving to IV or vi (e.g. E7 in C major)",semitones:4,quality:"dom7"},{id:"oasis-bvii",name:"Borrowed ♭VII",roman:"♭VII",plain:"Mixolydian borrowing that gives that anthem swagger",theory:"Flattened 7th major triad borrowed from Mixolydian (e.g. B♭ in C major)",semitones:10,quality:"maj"},{id:"oasis-biii",name:"Borrowed ♭III",roman:"♭III",plain:"Surprise bright borrowed lift before walking back to the tonic",theory:"Major chord on the flat third borrowed from parallel minor (e.g. E♭ in C major)",semitones:3,quality:"maj"},{id:"oasis-minor-iv",name:"Minor iv Walkdown",roman:"iv",plain:"Emotional chromatic slide from IV into iv before resolving home to I",theory:"Plagal cadence with borrowed minor subdominant (e.g. Fm in C major)",semitones:5,quality:"min"}]},beatles:{id:"beatles",name:"The Beatles",color:"#F4B266",font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12.5,pillTrack:"0.03em",presetId:"rhodes",rhythmStyle:"straight_8ths",defaultBpm:108,tagline:"Warm 60s melodic surprises with bittersweet minor cadences",theoryTagline:"Minor iv cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",plain:"warm 60s melodic surprises with bittersweet minor cadences",theory:"minor iv plagal cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",sig:[{k:"Harmony",v:"Bittersweet minor iv plagal cadences and unexpected chromatic shifts."},{k:"Motion",v:"Secondary dominants resolving to unexpected diatonic steps."},{k:"Melody",v:"Descending inner voice motion held together by strong vocal counterpoint."}],hoist:["Fm","D7","E7"],genre:"Pop",mood:"Warm",favoredKeys:["C","G","F","D","A","E"],favoredScales:["MAJOR","DORIAN"],favoredMoods:["Warm","Playful"],basisArchetypes:[["C","E7","Am","Fm","C","G7","C","C"],["C","D7","F","C","C","D7","G7","C"],["C","Am","Dm7","G7","F","Fm","C","G7"]],cMajorBasisChords:["C","E7","Am","Fm","C","G7","C","C"],signatureTricks:[{id:"beatles-minor-iv",name:"Minor iv Cadence",roman:"iv",plain:"The ultimate bittersweet Beatles trick: major IV dips into dark minor iv before resolving home",theory:"Minor subdominant borrowing (e.g. Fm in C major, IV -> iv -> I)",semitones:5,quality:"min"},{id:"beatles-major-ii",name:"Secondary Dominant II7",roman:"II7",plain:"Bright, forward-pushing dominant that charges straight into the V chord",theory:"Secondary dominant (V7/V, e.g. D7 in C major -> G7)",semitones:2,quality:"dom7"},{id:"beatles-major-iii",name:"Major III7 Turn",roman:"III7",plain:"Unexpected major push on the 3rd degree leading into the minor relative",theory:"V7/vi resolving to vi (e.g. E7 -> Am in C major)",semitones:4,quality:"dom7"}]},radiohead:{id:"radiohead",name:"Radiohead",color:"#C9A9E0",font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:84,tagline:"Swaps chords for their stranger neighbours a third away",theoryTagline:"Chromatic mediants (♭VI, ♭III), parallel modal mixture, haunting voice leading",plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",sig:[{k:"Harmony",v:"Chromatic mediants: the chord a third away, in the wrong quality."},{k:"Colour",v:"Major and minor of the same key sit side by side, neither one winning."},{k:"Motion",v:"Loops that circle without resolving, often in odd bar lengths."}],hoist:["A♭maj7","E♭maj7","Em7"],genre:"Rock",mood:"Melancholy",favoredKeys:["A","E","C","D","F"],favoredScales:["NATURAL_MINOR","DORIAN","MAJOR"],favoredMoods:["Melancholy","Dark"],basisArchetypes:[["C","E","F","Fm","C","E","F","Fm"],["Am","D","Em","G","Am","F","Em","G"],["C","Ab","Eb","G","C","Ab","Fm","G"]],cMajorBasisChords:["C","E","F","Fm","C","E","F","Fm"],signatureTricks:[{id:"radiohead-chromatic-mediant",name:"Chromatic Mediant",roman:"III",plain:"Jumps from I straight to major III, sharing one note while every other voice twists",theory:"Chromatic mediant with smooth half-step voice leading (e.g. C -> E in C major)",semitones:4,quality:"maj"},{id:"radiohead-bvi",name:"Parallel ♭VI Mediant",roman:"♭VI",plain:"Dark, cinematic plunge into the flat-sixth from parallel minor",theory:"Modal borrowing of ♭VI (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"radiohead-minor-iv",name:"Minor iv Fade",roman:"iv",plain:"Plunges the IV into minor iv for that haunting Thom Yorke descent",theory:"Borrowed minor iv (e.g. Fm in C major)",semitones:5,quality:"min"}]},nirvana:{id:"nirvana",name:"Nirvana",color:"#F2A79B",font:"'Rock Salt', cursive",weight:400,pillFs:10,pillTrack:"0",presetId:"stab",rhythmStyle:"heavy_strum",defaultBpm:118,tagline:"Moves the root in visceral jumps with raw parallel power chords",theoryTagline:"Minor third and tritone root jumps, parallel chromatic triads, open 5ths",plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",sig:[{k:"Motion",v:"Roots jump by minor third and tritone instead of stepping."},{k:"Voicing",v:"Power chords with no third, so major or minor stays undecided."},{k:"Space",v:"The middle register is left empty; the weight is at the bottom."}],hoist:["A♭","E♭maj7","B♭"],genre:"Rock",mood:"Dark",favoredKeys:["E","D","F","C","A"],favoredScales:["NATURAL_MINOR","DORIAN","HARMONIC_MINOR"],favoredMoods:["Dark","Tense"],basisArchetypes:[["C","Eb","Ab","F","C","Eb","Ab","F"],["C","F","Eb","Ab","C","F","Eb","Ab"],["Am","F","D","F","Am","F","D","G"]],cMajorBasisChords:["C","Eb","Ab","F","C","Eb","Ab","F"],signatureTricks:[{id:"nirvana-biii",name:"Parallel ♭III Shift",roman:"♭III",plain:"Power chord slide up a minor 3rd, breaking diatonic scale rules with raw energy",theory:"Symmetric minor 3rd jump (e.g. C -> E♭)",semitones:3,quality:"maj"},{id:"nirvana-bvi",name:"Parallel ♭VI Jump",roman:"♭VI",plain:"Visceral jump to the flat 6th before dropping down to IV",theory:"Parallel chromatic power motion (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"nirvana-bvii",name:"Subtonic ♭VII Slam",roman:"♭VII",plain:"Heavy punk rock bounce on the flat-7th",theory:"Whole-step drop from tonic (e.g. B♭ in C major)",semitones:10,quality:"maj"}]},"steely-dan":{id:"steely-dan",name:"Steely Dan",color:"#9CC0EC",font:"'Playfair Display', serif",weight:700,italic:!0,pillFs:13,pillTrack:"0.01em",presetId:"rhodes",rhythmStyle:"syncopated_16ths",defaultBpm:112,tagline:"Adds one note that makes a plain chord sound expensive",theoryTagline:"Mu-major (add9 without 7th), ii–V–I jazz chains, tritone substitutions",plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",sig:[{k:"Harmony",v:"One added 9th over a plain triad, and the 7th left out."},{k:"Motion",v:"ii–V chains that keep handing off to the next key."},{k:"Substitution",v:"A tritone sub where the dominant was expected."}],hoist:["Cmaj9","D♭7","Fm7"],genre:"Jazz-ish",mood:"Warm",favoredKeys:["C","F","G","D","Bb","Eb"],favoredScales:["MAJOR","DORIAN","MIXOLYDIAN"],favoredMoods:["Warm","Peaceful"],basisArchetypes:[["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],["Cmaj9","Dm7","Db7","Cmaj9","Em7","A7","Dm7","G7"],["Cmaj9","Am7","Dm7","Fm7","Em7","A7","Dm7","G7"]],cMajorBasisChords:["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],signatureTricks:[{id:"steely-mu-major",name:"Mu-Major (add9)",roman:"I(add9)",plain:"Major triad with the 2nd added right against the 3rd—the signature Donald Fagen sound",theory:"Major triad + 9th with no 7th, creating smooth cluster dissonance (e.g. Cmaj9 / Cadd9)",semitones:0,quality:"maj9"},{id:"steely-tritone-sub",name:"Tritone Substitution",roman:"subV7",plain:"Swaps out the dominant G7 for D♭7, sliding smoothly into C by a half-step",theory:"Dominant 7th a tritone away (e.g. D♭7 -> C in C major)",semitones:1,quality:"dom7"},{id:"steely-secondary-dominant",name:"Secondary VI7 Turn",roman:"VI7",plain:"Jazz approach chord setting up the ii-V turnaround",theory:"Secondary dominant to ii (e.g. A7 -> Dm7 in C major)",semitones:9,quality:"dom7"}]},"mac-demarco":{id:"mac-demarco",name:"Mac DeMarco",color:"#B8CC9E",font:"'Archivo Black', sans-serif",weight:400,pillFs:12,pillTrack:"-0.01em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:92,tagline:"Two lush chords looped loose, bass sliding underneath",theoryTagline:"Maj7 to min7 descending walkdowns, chromatic bass motion, unresolved floating feel",plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",sig:[{k:"Harmony",v:"Two maj7 chords vamped, no third chord needed."},{k:"Motion",v:"The bass slides chromatically underneath while the chords sit still."},{k:"Feel",v:"Nothing resolves; the loop just keeps leaning."}],hoist:["Fmaj7","Cmaj9","Em7"],genre:"Lo-fi/Chill",mood:"Warm",favoredKeys:["D","C","A","G","F"],favoredScales:["MAJOR","LYDIAN"],favoredMoods:["Dreamy","Peaceful"],basisArchetypes:[["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],["Dm7","Em7","Fmaj7","Em7","Dm7","Em7","Fmaj7","G7"],["Fmaj7","Abmaj7","Cmaj7","Em7","Fmaj7","G7","Cmaj7","Cmaj7"]],cMajorBasisChords:["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],signatureTricks:[{id:"mac-maj7-vamp",name:"Lush Maj7 Step",roman:"IVmaj7",plain:"Opens on a lazy, dreamy major 7th chord that floats without rushing to resolve",theory:"Major 7th on the subdominant (e.g. Fmaj7 in C major)",semitones:5,quality:"maj7"},{id:"mac-chromatic-approach",name:"Chromatic Approach",roman:"♭VImaj7",plain:"Dreamy modulation borrowed from parallel minor with chorus warble",theory:"Borrowed ♭VImaj7 (e.g. A♭maj7 in C major)",semitones:8,quality:"maj7"},{id:"mac-stepdown",name:"Smooth iiim7 Stepdown",roman:"iiim7",plain:"Gentle stepdown connecting the IVmaj7 to iim7",theory:"Diatonic minor 7th stepdown (e.g. Em7 in C major)",semitones:4,quality:"min7"}]}},Mo=Object.values(Ao);function ae(t){if(!t)return;const e=t.toLowerCase().trim().replace(/\s+/g,"-");return Ao[e]||Mo.find(i=>i.name.toLowerCase()===t.toLowerCase().trim())}function Es(t,e,i="C",o="MAJOR"){if(!e)return null;const n=ae(e);if(!n)return null;const s=i&&qe.includes(i)?i:n.favoredKeys&&n.favoredKeys.length?n.favoredKeys[Math.floor(Math.random()*n.favoredKeys.length)]:"C",r=o&&n.favoredScales?.includes(o)?o:n.favoredScales&&n.favoredScales.length?n.favoredScales[Math.floor(Math.random()*n.favoredScales.length)]:"MAJOR",a=n.favoredMoods&&n.favoredMoods.length?n.favoredMoods[Math.floor(Math.random()*n.favoredMoods.length)]:n.mood;let l=null;if(Math.random()<.5)try{const p=Ot(t,n.genre,a,{key:s,scaleType:r,length:8});if(p&&p.chords.length===8){const c=Math.random()<.5?2:3,g=Math.random()<.5?5:6,h=[c];Math.random()<.6&&h.push(g);const u=p.chords.map((f,y)=>{if(h.includes(y)&&n.signatureTricks.length>0){const I=n.signatureTricks[Math.floor(Math.random()*n.signatureTricks.length)],x=Pt(I,s,r),{root:M,suffix:P}=$t(x.chordName);let N=P||"maj";return N==="m"&&(N="min"),{root:M,quality:N}}const{root:b,suffix:v}=$t(f.name);let C=v||"maj";return C==="m"&&(C="min"),{root:b,quality:C}});l=Ci(t,s,r,u,n.genre,a)}}catch{l=null}if(!l){const p=n.basisArchetypes&&n.basisArchetypes.length>0?n.basisArchetypes:[n.cMajorBasisChords],c=[...p[Math.floor(Math.random()*p.length)]];if(Math.random()<.4&&n.signatureTricks.length>0){const b=Math.floor(Math.random()*(c.length-1))+1,v=n.signatureTricks[Math.floor(Math.random()*n.signatureTricks.length)],C=Pt(v,"C","MAJOR");c[b]=C.chordName}const g=F[s]??0,h=F.C,u=((g-h)%12+12)%12,f=B(s,r),y=c.map(b=>{const v=Io(b,u,f),{root:C,suffix:I}=$t(v);let x=I||"maj";return x==="m"&&(x="min"),{root:C,quality:x}});l=Ci(t,s,r,y,n.genre,a)}return l?{...l,genre:n.genre,mood:a,bpm:n.defaultBpm}:null}function Pt(t,e,i){const o=F[e]??0,n=B(e,i),s=((o+t.semitones)%12+12)%12,r=t.roman.includes("♭")||t.roman.includes("b")||t.roman.includes("subV")||n,a=O(s,r);let l="";switch(t.quality){case"maj":l="";break;case"min":l="m";break;case"dom7":l="7";break;case"min7":l="m7";break;case"maj7":l="maj7";break;case"maj9":l="maj9";break;case"sus4":l="sus4";break;default:l=t.quality;break}return{chordName:`${a}${l}`,root:a,quality:t.quality,roman:t.roman}}function $i(t,e,i){if(!i)return[];const o=ae(i);if(!o)return[];const n=B(t,e);return o.signatureTricks.map(s=>{const r=Pt(s,t,e),a=F[r.root]??0,l=s.quality==="min"?[0,3,7]:s.quality==="dom7"?[0,4,7,10]:s.quality==="min7"?[0,3,7,10]:s.quality==="maj7"?[0,4,7,11]:s.quality==="maj9"?[0,2,4,7]:[0,4,7],d=st(r.root,s.quality,n),p=l.map(c=>O(a+c,d));return{trick:s,chordName:r.chordName,roman:r.roman,notes:p,plain:s.plain,theory:s.theory,tension:s.quality==="dom7"?.65:s.semitones===4?.55:.4}})}const xt={Oasis:{l1:"OA",l2:"SIS",font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},Radiohead:{l1:"RADIO",l2:"HEAD",font:"'Space Mono', monospace",pillFs:12.5,pillTrack:"0.02em",weight:700},Nirvana:{l1:"NIR",l2:"VANA",font:"'Rock Salt', cursive",pillFs:10,pillTrack:"0",weight:400},"Steely Dan":{l1:"STEELY",l2:"DAN",font:"'Playfair Display', serif",pillFs:13,pillTrack:"0.01em",weight:700,italic:!0},"Mac DeMarco":{l1:"mac",l2:"demarco",font:"'Archivo Black', sans-serif",pillFs:12,pillTrack:"-0.01em",weight:400},"The Beatles":{l1:"THE",l2:"BEATLES",font:"'Plus Jakarta Sans', sans-serif",pillFs:12.5,pillTrack:"0.03em",weight:800}},Ji={Oasis:[{roman:"♭III",chord:"E♭maj7",name:"Borrowed ♭III",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"IV",chord:"Fmaj7",name:"Plagal landing",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"♭VI",chord:"A♭",name:"Borrowed ♭VI",role:"Borrowed",semitones:8,quality:"maj"}],Radiohead:[{roman:"♭VI",chord:"A♭maj7",name:"Chromatic mediant",role:"Borrowed",semitones:8,quality:"maj7"},{roman:"♭III",chord:"E♭maj7",name:"Modal mixture",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"iii",chord:"Em7",name:"A third away",role:"Mediant",semitones:4,quality:"min7"}],Nirvana:[{roman:"♭VI",chord:"A♭",name:"Minor-third jump",role:"Borrowed",semitones:8,quality:"maj"},{roman:"♭III",chord:"E♭maj7",name:"Flat-third root",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"♭VII",chord:"B♭",name:"Root drops away",role:"Borrowed",semitones:10,quality:"maj"}],"Steely Dan":[{roman:"I9",chord:"Cmaj9",name:"Added 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"♭II7",chord:"D♭7",name:"Tritone sub",role:"Borrowed",semitones:1,quality:"dom7"},{roman:"iv",chord:"Fm7",name:"Minor iv",role:"Borrowed",semitones:5,quality:"min7"}],"Mac DeMarco":[{roman:"IV",chord:"Fmaj7",name:"maj7 vamp",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"I9",chord:"Cmaj9",name:"Add the 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"iii",chord:"Em7",name:"Never resolves",role:"Mediant",semitones:4,quality:"min7"}],"The Beatles":[{roman:"iv",chord:"Fm",name:"Minor iv fade",role:"Borrowed",semitones:5,quality:"min"},{roman:"III7",chord:"E7",name:"Major III lift",role:"Dominant",semitones:4,quality:"dom7"},{roman:"II7",chord:"D7",name:"Take the II7",role:"Subdominant",semitones:2,quality:"dom7"}]};function Oo(t,e,i="C",o="MAJOR"){const n=ae(e);if(!n)return null;const s=Ji[n.name]||Ji[n.id];if(!s||!s.length)return null;const r=s.map(p=>{const c=Pt({id:p.name,name:p.name,roman:p.roman,semitones:p.semitones,quality:p.quality},i,o);return{roman:p.roman,chord:c.chordName,name:p.name,role:p.role,semitones:p.semitones}}),a=String(t.functionLabel||"");let l=1;/^Subdominant/.test(a)?l=1:/Dominant/.test(a)?l=r.length-1:/^Tonic/.test(a)&&(l=0);const d=[l].concat(r.map((p,c)=>c).filter(p=>p!==l));for(let p=0;p<d.length;p++){const c=r[d[p]];if(c&&c.chord!==t.name)return c}return null}function Yi(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),n=e[o]??0,s=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(s+1)*12+n))}function Do(t,e,i,o=1,n){const s=e&&e.length>0?e.map(v=>t.chords[v]).filter(v=>!!v):t.chords,r=t.bpm||120,a=o*240/r,l=i?ot.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,d=Oi[t.genre]||{},p=l?.patch??{},c={...d,...p,...n?.humanState??{}},g=d.duration??.9,h=p.durationMultiplier?g*p.durationMultiplier:g,u=n?.humanState?.strum!==void 0?n.humanState.strum/100*1.5:n?.spread!==void 0?n.spread/100*1.5:d.spread??.3,f=n?.humanState?.swing!==void 0?n.humanState.swing:n?.swing??0,y=n?.density??50,b=[];return s.forEach((v,C)=>{const I=f/100*.04*(C%2===1?1:0),x=C*a+I,M=v.notes&&v.notes.length>0?v.notes:["C","E","G"];let P=Ti(M,4);if(P=vo(P,y),c.arpMode&&c.arpMode!=="off"){const N=c.arpRate??"1/16",A=c.arpRange??1,R=c.arpMode,G=go(N,r),_=fo(P,A),$=bo(_,R),U=c.duration?c.duration:Math.max(.6,h);$.forEach((X,ee)=>{const Ze=x+ee*G;b.push({note:X,midi:Yi(X),startTime:Ze,duration:U})})}else{const N=n?.humanState?.instrument||void 0,A=N?jt(N):void 0,R=A?Be.find($=>$.name.toLowerCase()===A.toLowerCase())?.instrument??"piano":Ut[t.genre]??"piano",G=R==="guitar"||R==="jazz-guitar",_=R==="jazz-guitar";P.forEach(($,U)=>{const ee=(G?U*(_?.018:.024):0)+U*u*.1,Ze=x+ee;b.push({note:$,midi:Yi($),startTime:Ze,duration:G?Math.max(h,1.2):h})})}}),b}function Ns(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function Ts(t,e,i,o=1,n){const s=t.bpm||120,r=480,a=Do(t,e,i,o,n),l=[];a.forEach(b=>{const v=Math.round(b.startTime/(60/s)*r),C=Math.max(1,Math.round(b.duration/(60/s)*r));l.push({tick:v,type:"on",midi:b.midi}),l.push({tick:v+C,type:"off",midi:b.midi})}),l.sort((b,v)=>b.tick!==v.tick?b.tick-v.tick:b.type!==v.type?b.type==="off"?-1:1:b.midi-v.midi);const d=[],p=Math.round(6e7/s);d.push(0),d.push(255,81,3),d.push(p>>16&255,p>>8&255,p&255);const c="Chroma Chords";d.push(0),d.push(255,3,c.length);for(let b=0;b<c.length;b++)d.push(c.charCodeAt(b));let g=0;l.forEach(b=>{const v=b.tick-g;g=b.tick,d.push(...Ns(v)),b.type==="on"?d.push(144,b.midi,80):d.push(128,b.midi,0)}),d.push(0),d.push(255,47,0);const h=[77,84,104,100,0,0,0,6,0,0,0,1,r>>8&255,r&255],u=d.length,f=[77,84,114,107,u>>24&255,u>>16&255,u>>8&255,u&255],y=new Uint8Array(h.length+f.length+d.length);return y.set(h,0),y.set(f,h.length),y.set(d,h.length+f.length),y}function $s(t,e,i,o,n=1,s){const r=Ts(t,e,o,n,s),a=new Blob([r],{type:"audio/midi"}),l=(t.key||"C").toLowerCase(),d=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),p=t.bpm||120,c=`chroma-chords-${l}-${d}-${p}bpm.mid`;Fo(a,c)}function As(t,e,i="Warm",o){const n=new oo({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),s=on(i,n),r=t?jt(t):void 0;switch((r?Be.find(d=>d.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(e?Ut[e]:void 0)??"piano"){case"bell":{const d=new _e({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(s),p=new we({decay:3.2,wet:.32}).connect(d);return new K(xi,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(p)}case"organ":{const d=new pe({frequency:4500,type:"lowpass",rolloff:-12}).connect(s),p=new Ie({distortion:.08,wet:.15}).connect(d),c=new Ve({frequency:5.8,depth:.12,wet:.55}).connect(p);return new K(ye,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(c)}case"pad-strings":{const d=new we({decay:5.5,preDelay:.03,wet:.45}).connect(s),p=new ke({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(d);return new K(ye,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(p)}case"juno-pad":{const d=new ke({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(s);return new K(ze,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(d)}case"stab":{const d=new Ie({distortion:.1,wet:.12}).connect(s),p=new we({decay:1,wet:.22}).connect(d);return new K(ze,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(p)}case"jazz-guitar":{const d=new _e({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(s),p=new pe({frequency:2800,type:"lowpass",rolloff:-12}).connect(d),c=new we({decay:1.8,preDelay:.02,wet:.18}).connect(p);return o&&Object.keys(o).length>0?new Se({urls:o,volume:-8}).connect(c):new K(ye,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(c)}case"sh101":{const d=new ke({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(s),p=new pe({frequency:3400,type:"lowpass",rolloff:-12}).connect(d),c=new Ie({distortion:.12,wet:.18}).connect(p),g=new Ve({frequency:.45,depth:.18,wet:.65}).connect(c);return new K(ze,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(g)}case"guitar":return o&&Object.keys(o).length>0?new Se({urls:o,volume:-8}).connect(s):new K(ye,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(s);case"rhodes":case"epiano":return o&&Object.keys(o).length>0?new Se({urls:o,volume:-10}).connect(s):new K(xi,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(s);case"piano":default:return o&&Object.keys(o).length>0?new Se({urls:o,volume:-9}).connect(s):new K(ye,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(s)}}function Ms(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,n=o/8,s=e*n,r=t.length*e*n,a=new ArrayBuffer(44+r),l=new DataView(a),d=(g,h)=>{for(let u=0;u<h.length;u++)l.setUint8(g+u,h.charCodeAt(u))};d(0,"RIFF"),l.setUint32(4,36+r,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,e,!0),l.setUint32(24,i,!0),l.setUint32(28,i*s,!0),l.setUint16(32,s,!0),l.setUint16(34,o,!0),d(36,"data"),l.setUint32(40,r,!0);const p=[];for(let g=0;g<e;g++)p.push(t.getChannelData(g));let c=44;for(let g=0;g<t.length;g++)for(let h=0;h<e;h++){const u=Math.max(-1,Math.min(1,p[h][g])),f=u<0?u*32768:u*32767;l.setInt16(c,f,!0),c+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function Os(t,e,i,o,n=1,s){const r=Do(t,e,o,n,s);if(!r.length)return;const a=e&&e.length>0?e.map(x=>t.chords[x]).filter(x=>!!x):t.chords,l=t.bpm||120,d=n*240/l,p=Math.max(.1,a.length*d),c=i?jt(i):void 0,h=(c?Be.find(x=>x.name.toLowerCase()===c.toLowerCase()):void 0)?.instrument??(t.genre?Ut[t.genre]:void 0)??"piano";await cn(h);const u=ln(h),f=s?.tone||"Warm",y=await _o(async()=>{const x=As(c||i,t.genre,f,u);r.forEach(M=>{M.startTime<p&&x.triggerAttackRelease(M.note,M.duration,M.startTime)})},p),b=Ms(y.get()),v=(t.key||"C").toLowerCase(),C=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),I=`chroma-chords-${v}-${C}-${l}bpm.wav`;Fo(b,I)}function Fo(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var Ds=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,be=(t,e,i,o)=>{for(var n=o>1?void 0:o?Fs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Ds(e,i,n),n};const Bs=re`
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
`,Ps=re`
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
`,Rs=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Bs},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:Ps}];let le=class extends me{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=es(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{const t=this.barsPerChord||S.getBarsPerChord()||1,e=this.feelSettings||S.getFeelSettings();await Os(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","WAV file downloaded")}catch(t){console.error("WAV export failed",t),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{const t=this.barsPerChord||S.getBarsPerChord()||1,e=this.feelSettings||S.getFeelSettings();$s(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","MIDI file downloaded")}catch(t){console.error("MIDI export failed",t),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return m`
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
            ${Rs.map(e=>m`
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
    `}};le.styles=ue`
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
  `;be([w({type:Boolean})],le.prototype,"open",2);be([w({type:Boolean})],le.prototype,"visible",2);be([w({type:Object})],le.prototype,"progression",2);be([w({type:Array})],le.prototype,"order",2);be([w({type:String})],le.prototype,"instrument",2);be([w({type:String})],le.prototype,"playStyle",2);be([w({type:Number})],le.prototype,"barsPerChord",2);be([w({type:Object})],le.prototype,"feelSettings",2);le=be([ge("share-modal")],le);var js=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,ve=(t,e,i,o)=>{for(var n=o>1?void 0:o?Us(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&js(e,i,n),n};function Ls(t,e,i){return Math.round(t+(e-t)*i)}function Bo(t,e,i){const o=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)),n=[1,3,5].map(s=>parseInt(e.slice(s,s+2),16));return"#"+o.map((s,r)=>Ls(s,n[r],i).toString(16).padStart(2,"0")).join("")}function zs(t){const e=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*e[0]+.7152*e[1]+.0722*e[2]}function Wi(t){let i=t;for(let o=1;o<=20&&(i=Bo(t,"#2E271F",o*.05),!((.925+.05)/(zs(i)+.05)>=4.7));o++);return i}let ce=class extends me{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC",this.band=null}onSelectFeel(t){this.activeFeel=t,this.dispatchEvent(new CustomEvent("swap-feel-change",{detail:{feel:t},bubbles:!0,composed:!0}))}onAudition(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onConfirm(){this.dispatchEvent(new CustomEvent("swap-confirm",{bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,i=`calc((100% - ${12*(t-1)}px) / ${t})`,o=this.chord?.tension??.3,n=ie(o).color,s=this.feelings.find(b=>b.name===this.activeFeel)||this.feelings[0],r=Math.max(0,this.feelings.findIndex(b=>b.name===s?.name)),a=Math.max(1,this.feelings.length),l=`calc((100% - ${7*(a-1)}px) / ${a})`,d=r===0,p=r===a-1;let c=`left: calc(${l} * ${r} + ${7*r}px); width: ${l};`,g="12px";d&&p?(c="left: 0; right: 0; width: 100%;",g="0 0 12px 12px"):d?(c=`left: 0; width: ${l};`,g="0 12px 12px 12px"):p&&(c=`left: auto; right: 0; width: ${l};`,g="12px 0 12px 12px");const h=s?.tension??.3,u=Wi(ie(h).color),f=`Bar ${this.swapIndex+1} · ${this.chord?.name||"Chord"} could feel…`,y=this.pickedChord?`hearing swap: ${this.pickedChord.name}`:"tap to audition in the loop";return m`
      <div class="lane-shell" data-swap-lane="1">
        <!-- Neck connecting the active chord pad down to the lane -->
        <div
          class="lane-neck"
          style="
            left: calc(${i} * ${e} + ${12*e}px);
            width: ${i};
            background: ${n};
          "
        ></div>

        <div class="lane-clip">
          <div class="lane-panel" style="background: ${n};">
            <!-- Header bar -->
            <div class="lane-header">
              <div class="lane-kicker">${f}</div>
              <div style="flex: 1; min-width: 0;"></div>
              <div class="lane-hint">${y}</div>
              <button
                class="lane-close-btn"
                @click=${this.onClose}
                aria-label="Close swap lane"
              >×</button>
            </div>

            ${this.band?m`
              <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #5B5145; background: ${this.band.color}3D; border-radius: 10px; padding: 6px 12px; margin-top: 9px; animation: cvfv-trayitem 300ms 200ms var(--cv-ease, ease) both;">
                <div style="width: 7px; height: 7px; border-radius: 2px; background: ${this.band.color}; flex-shrink: 0;"></div>
                <span>${this.band.name} mode — their moves first</span>
                <span style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted); margin-left: auto;">${this.band.plain||""}</span>
              </div>
            `:""}

            <!-- Feelings row -->
            <div class="feelings-row">
              ${this.feelings.map(b=>{const v=b.name===s?.name,C=ie(b.tension),I=v?Wi(C.color):Bo(C.color,"#FBF6EC",.5);return m`
                  <button
                    class="feel-tile"
                    data-feel-tile="1"
                    data-sel="${v?"1":"0"}"
                    style="
                      background: ${I};
                      border-radius: ${v?"12px 12px 0 0":"12px"};
                      box-shadow: ${v?"none":"inset 0 0 0 1.5px rgba(46,39,31,0.14)"};
                    "
                    @click=${()=>this.onSelectFeel(b.name)}
                  >
                    <span class="feel-tile-name" style="color: ${v?"#FBF6EC":"#2E271F"};">${b.name}</span>
                    <span class="feel-tile-sub" style="color: ${v?"#FBF6EC":"#2E271F"};">${b.sub}</span>
                  </button>
                `})}
            </div>

            <!-- Chords row extruded from active feeling -->
            <div class="chords-shell" data-lane-join="${r}">
              <div
                class="chords-neck"
                style="
                  ${c}
                  background: ${u};
                "
              ></div>

              <div class="chords-box" style="background: ${u}; border-radius: ${g};">
                ${(s?.rows||[]).map(b=>{const v=this.pickedChord?.name===b.name,C=typeof b.tension=="number"?b.tension:h,I=ie(C);return m`
                    <button
                      class="chord-pill-btn"
                      style="
                        background: ${v?"#2E271F":"rgba(251, 246, 236, 0.88)"};
                      "
                      @click=${()=>this.onAudition(b,s)}
                      aria-label="Audition ${b.name}"
                    >
                      <span
                        style="
                          width: 9px;
                          height: 9px;
                          border-radius: ${Math.round(I.radius*.25)}px;
                          background: ${I.color};
                          flex-shrink: 0;
                        "
                      ></span>
                      <span
                        class="chord-pill-name"
                        style="color: ${v?"#FBF6EC":"#2E271F"};"
                      >${b.name}</span>
                      ${b.roman?m`
                        <span
                          class="chord-pill-roman"
                          style="color: ${v?"rgba(251,246,236,0.7)":"var(--cv-label)"};"
                        >${b.roman}</span>
                      `:""}
                      ${b.bandTag?m`
                        <span
                          style="
                            font-size: 8.5px;
                            font-weight: 800;
                            letter-spacing: 0.7px;
                            text-transform: uppercase;
                            color: #2E271F;
                            background: ${b.bandColor||"#F6D98B"};
                            border-radius: 100px;
                            padding: 2px 6px;
                            margin-left: 4px;
                            white-space: nowrap;
                          "
                        >${b.bandTag}</span>
                      `:""}
                    </button>
                  `})}

                <div style="flex: 1; min-width: 0;"></div>

                ${this.pickedChord?m`
                  <button
                    class="keep-swap-btn"
                    @click=${this.onConfirm}
                    aria-label="Keep ${this.pickedChord.name}"
                  >
                    Keep ${this.pickedChord.name}
                  </button>
                `:m`
                  <div style="font-size: 11px; font-weight: 700; color: #FBF6EC; opacity: 0.85; white-space: nowrap;">
                    tap to hear it in the loop
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};ce.styles=ue`
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
  `;ve([w({type:Number})],ce.prototype,"swapIndex",2);ve([w({type:Object})],ce.prototype,"chord",2);ve([w({type:Array})],ce.prototype,"feelings",2);ve([w({type:String})],ce.prototype,"activeFeel",2);ve([w({type:Object})],ce.prototype,"pickedChord",2);ve([w({type:Number})],ce.prototype,"padCols",2);ve([w({type:String})],ce.prototype,"moodColor",2);ve([w({type:Object})],ce.prototype,"band",2);ce=ve([ge("chord-swap-lane")],ce);var _s=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Xe=(t,e,i,o)=>{for(var n=o>1?void 0:o?Vs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&_s(e,i,n),n};let Ne=class extends me{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const i=(this.chordIndex%e.length+e.length)%e.length;return e[i]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),i=e.rows;if(!i||i.length===0)return;this.chordIndex=(this.chordIndex+1)%i.length;const o=this.getCurrentRow();o&&this.emitAudition(o,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),i=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:i.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),i=t.rows?t.rows.length:0,o=i>0?this.chordIndex%i+1:0,n=ie(t.tension);return m`
      <div class="cycler-was">was ${this.originalChord?.name||"Chord"}</div>

      <div class="cycler-feel-header">
        <div
          style="
            width: 14px;
            height: 14px;
            border-radius: ${Math.round(n.radius*.3)}px;
            background: ${n.color};
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
          @pointerdown=${s=>s.stopPropagation()}
          aria-label="Previous feeling"
        >‹</button>

        <div class="cycler-dots-track">
          ${this.feelings.map((s,r)=>m`
            <div
              class="cycler-dot"
              style="background: ${r===this.feelIndex?"#2E271F":"rgba(46,39,31,0.22)"};"
            ></div>
          `)}
        </div>

        <button
          class="cycler-chev-btn"
          @click=${this.onNextFeel}
          @pointerdown=${s=>s.stopPropagation()}
          aria-label="Next feeling"
        >›</button>
      </div>

      ${e?m`
        <button
          class="cycler-chord-btn"
          @click=${this.onCycleChord}
          @pointerdown=${s=>s.stopPropagation()}
          aria-label="Next chord for this feeling"
        >
          <div class="chord-top-row">
            <span class="chord-main-name">${e.name}</span>
            <span class="chord-count-hint">${o} of ${i} ↻</span>
          </div>
          <div class="chord-meta-row">
            ${e.roman?m`<span class="chord-roman">${e.roman}</span>`:""}
            <span class="chord-sub-note">${e.sub}</span>
          </div>
        </button>
      `:""}

      <button
        class="keep-btn"
        @click=${this.onKeep}
        @pointerdown=${s=>s.stopPropagation()}
        aria-label="Keep ${e?.name||"chord"}"
      >
        Keep
      </button>

      <button
        class="revert-btn"
        @click=${this.onRevert}
        @pointerdown=${s=>s.stopPropagation()}
        aria-label="Revert swap"
      >
        Revert
      </button>
    `}};Ne.styles=ue`
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
  `;Xe([w({type:Object})],Ne.prototype,"originalChord",2);Xe([w({type:Number})],Ne.prototype,"barIndex",2);Xe([w({type:Array})],Ne.prototype,"feelings",2);Xe([w({type:Number})],Ne.prototype,"feelIndex",2);Xe([w({type:Number})],Ne.prototype,"chordIndex",2);Ne=Xe([ge("chord-pad-cycler")],Ne);var Gs=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,J=(t,e,i,o)=>{for(var n=o>1?void 0:o?qs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Gs(e,i,n),n};const Po=[{name:"Grand Piano",desc:"Clear and even. Easy to hear the harmony.",color:"#9CC0EC"},{name:"Stage Rhodes",desc:"Warm electric piano with a soft bell.",color:"#F2A79B"},{name:"Nylon Guitar",desc:"Plucked and intimate.",color:"#F6D98B"},{name:"Jazz Archtop",desc:"Round, woody jazz guitar.",color:"#D89047"},{name:"Drawbar Organ",desc:"Held, breathy organ tone.",color:"#E8609A"},{name:"Cinematic Pad",desc:"Long, soft swells that hold each chord.",color:"#C9A9E0"},{name:"Celestial Bell",desc:"Glassy and bright. Rings out.",color:"#B8CC9E"},{name:"Juno Synth",desc:"Lush analog chorus synth.",color:"#7B61FF"},{name:"Vintage SH-101",desc:"Squelchy mono synth. Great for lines.",color:"#4EA598"},{name:"House Stab",desc:"Short, punchy chord hits.",color:"#FF8C42"}],Ro=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],jo=["Major","Minor","Dorian","Mixolydian","Lydian","Phrygian","Locrian","Harmonic minor","Melodic minor"];let q=class extends me{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play section",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.melodyLoop="Section",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.songTotal="",this.openMenu=null,this.feelMoreOpen=!1}toggleMenu(t){this.openMenu=this.openMenu===t?null:t}closeMenu(){this.openMenu=null}onPlayClick(){this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeMenu(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeMenu(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onLoopCycle(){this.dispatchEvent(new CustomEvent("loop-cycle",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeMenu();const e=this.activeTab==="melody";this.dispatchEvent(new CustomEvent(e?"set-melody-sound":"set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))}onSelectFeelStep(t,e,i){const o=this.activeTab==="melody";t==="Pattern"?this.dispatchEvent(new CustomEvent(o?"set-melody-feel":"set-chord-feel",{detail:{feel:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:i},bubbles:!0,composed:!0}))}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onShareClick(){this.closeMenu(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((a,l)=>(a.id||String.fromCharCode(65+l))===this.activeSectionId)||this.sections[0]||{name:"Chorus",tint:"#F1E4CC"},o=t?this.melodySound:this.chordSound,n=t?this.melodyFeel:this.chordFeel,s=this.isPlaying?"#FBF3E6":this.moodColor,r=this.isPlaying?"■":"▶";return m`
      <div class="transport-container" data-screen-label="Transport">
        ${this.openMenu?m`<div class="backdrop" @click=${this.closeMenu}></div>`:""}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${s};"
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
          ${this.sections.map((a,l)=>{const d=a.id||String.fromCharCode(65+l);return m`
              <button
                class="tb-btn ${d===this.activeSectionId?"active":""}"
                @click=${()=>this.onSelectSection(d)}
              >
                <span class="sec-badge" style="background: ${a.tint||"#F1E4CC"};"></span>
                <span>${a.name}</span>
              </button>
            `})}
        </div>

        <!-- Section Dropdown Popover -->
        ${this.openMenu==="section"?m`
          <div class="popover-shell sec-popover">
            <div class="popover-title">Section</div>
            ${this.sections.map((a,l)=>{const d=a.id||String.fromCharCode(65+l);return m`
                <button
                  class="sec-item ${d===this.activeSectionId?"selected":""}"
                  @click=${()=>this.onSelectSection(d)}
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
        ${t?m`
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
        ${e?"":m`
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
            <span class="highlight">${n}</span>
            <span class="caret">▾</span>
          </button>
        `}

        <!-- Sound Popover -->
        ${this.openMenu==="sound"?m`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${t?"Melody sound":"Chord sound"}</div>
            ${Po.map(a=>m`
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
        ${this.openMenu==="feel"?m`
          <div class="popover-shell feel-popover">
            <div class="popover-title">${t?"Melody feel":"Chord feel"}</div>
            
            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Pattern</span>
                <span class="feel-axis-hint">Rhythmic motion</span>
              </div>
              <div class="feel-track">
                ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(a=>m`
                  <button
                    class="feel-step-btn ${a===n?"selected":""}"
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
                ${[{name:"Straight",val:0},{name:"Light",val:20},{name:"Medium",val:45},{name:"Hard",val:70}].map(a=>m`
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
                ${[{name:"Off",val:0},{name:"Subtle",val:25},{name:"Natural",val:50},{name:"Loose",val:80}].map(a=>m`
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
                ${["Warm","Glassy","Dusty"].map(a=>m`
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

            ${this.feelMoreOpen?m`
              <div class="feel-axis" style="margin-top: 8px;">
                <div class="feel-axis-header">
                  <span class="feel-axis-label">Spread</span>
                  <span class="feel-axis-hint">Stereo width</span>
                </div>
                <div class="feel-track">
                  ${[{name:"Tight",val:20},{name:"Wide",val:50},{name:"Huge",val:90}].map(a=>m`
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
                  ${[{name:"Sparse",val:25},{name:"Full",val:50},{name:"Dense",val:80}].map(a=>m`
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

        ${e&&this.songTotal?m`
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
        ${this.openMenu==="tempo"?m`
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
                  ${[1,2,4].map(a=>m`
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
                ${Ro.map(a=>m`
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
                ${jo.map(a=>m`
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
    `}};q.styles=ue`
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
  `;J([w({type:String})],q.prototype,"activeTab",2);J([w({type:Boolean})],q.prototype,"isPlaying",2);J([w({type:String})],q.prototype,"playLabel",2);J([w({type:String})],q.prototype,"moodColor",2);J([w({type:Array})],q.prototype,"sections",2);J([w({type:String})],q.prototype,"activeSectionId",2);J([w({type:String})],q.prototype,"melodyLoop",2);J([w({type:String})],q.prototype,"chordSound",2);J([w({type:String})],q.prototype,"melodySound",2);J([w({type:String})],q.prototype,"chordFeel",2);J([w({type:String})],q.prototype,"melodyFeel",2);J([w({type:Object})],q.prototype,"feelSettings",2);J([w({type:String})],q.prototype,"keyRoot",2);J([w({type:String})],q.prototype,"scaleMode",2);J([w({type:Number})],q.prototype,"bpm",2);J([w({type:Number})],q.prototype,"barsPerChord",2);J([w({type:String})],q.prototype,"songTotal",2);J([k()],q.prototype,"openMenu",2);J([k()],q.prototype,"feelMoreOpen",2);q=J([ge("transport-bar")],q);var Hs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Y=(t,e,i,o)=>{for(var n=o>1?void 0:o?Js(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Hs(e,i,n),n};let H=class extends me{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.isSaved=!1,this.activeSheet=null,this.feelMoreOpen=!1}toggleSheet(t){this.activeSheet=this.activeSheet===t?null:t}closeSheet(){this.activeSheet=null}onPlayClick(){this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeSheet(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeSheet(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeSheet();const e=this.activeTab==="melody";this.dispatchEvent(new CustomEvent(e?"set-melody-sound":"set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))}onSelectFeelStep(t,e,i){const o=this.activeTab==="melody";t==="Pattern"?this.dispatchEvent(new CustomEvent(o?"set-melody-feel":"set-chord-feel",{detail:{feel:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:i},bubbles:!0,composed:!0}))}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onRerollProgression(){this.closeSheet(),this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onToggleSaved(){this.closeSheet(),this.dispatchEvent(new CustomEvent(this.isSaved?"unsave-set":"save-set",{bubbles:!0,composed:!0}))}onViewSavedLoops(){this.closeSheet(),this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenShare(){this.closeSheet(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((l,d)=>(l.id||String.fromCharCode(65+d))===this.activeSectionId)||this.sections[0]||{id:"A",name:"Chorus",tint:"#F1E4CC"},o=i.id||i.name.charAt(0),n=this.isPlaying?"#FBF3E6":this.moodColor,s=this.isPlaying?"■":"▶",r=t?this.melodySound:this.chordSound,a=t?this.melodyFeel:this.chordFeel;return m`
      <div class="dock-container" data-screen-label="MobileDock">
        <!-- Play / Stop -->
        <button
          class="play-btn"
          style="background: ${n};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          ${s}
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
        ${e?"":m`
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
        ${this.activeSheet==="more"?m`
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
        ${this.activeSheet==="section"?m`
          <div class="popover-up" style="max-height: 320px; overflow-y: auto;">
            <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8A6B3F; padding: 6px 10px 4px;">
              Section
            </div>
            ${this.sections.map((l,d)=>{const p=l.id||String.fromCharCode(65+d);return m`
                <button
                  class="popover-menu-item"
                  style="flex-direction: row; align-items: center; gap: 10px; background: ${p===this.activeSectionId?"#F1E4CC":"transparent"};"
                  @click=${()=>this.onSelectSection(p)}
                >
                  <span class="sec-letter-badge" style="background: ${l.tint||"#F1E4CC"};">${p}</span>
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
      ${this.activeSheet==="key"||this.activeSheet==="feel"||this.activeSheet==="sound"?m`
        <div class="sheet-backdrop" @click=${this.closeSheet}></div>
      `:""}

      <!-- Key & Tempo Bottom Sheet -->
      ${this.activeSheet==="key"?m`
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
            ${[1,2,4].map(l=>m`
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
            ${Ro.map(l=>m`
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
            ${jo.map(l=>m`
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
      ${this.activeSheet==="feel"?m`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${t?"Melody feel":"Chord feel"}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div class="sheet-section-title">Pattern</div>
          <div class="pill-group">
            ${["Block chords","Arpeggio","Strum","Broken (swing)","Half-time"].map(l=>m`
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
            ${[{name:"Straight",val:0},{name:"Light",val:20},{name:"Medium",val:45},{name:"Hard",val:70}].map(l=>m`
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
            ${[{name:"Off",val:0},{name:"Subtle",val:25},{name:"Natural",val:50},{name:"Loose",val:80}].map(l=>m`
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
            ${["Warm","Glassy","Dusty"].map(l=>m`
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
      ${this.activeSheet==="sound"?m`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${t?"Melody sound":"Chord sound"}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${Po.map(l=>m`
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
    `}};H.styles=ue`
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
  `;Y([w({type:String})],H.prototype,"activeTab",2);Y([w({type:Boolean})],H.prototype,"isPlaying",2);Y([w({type:String})],H.prototype,"playLabel",2);Y([w({type:String})],H.prototype,"moodColor",2);Y([w({type:Array})],H.prototype,"sections",2);Y([w({type:String})],H.prototype,"activeSectionId",2);Y([w({type:String})],H.prototype,"chordSound",2);Y([w({type:String})],H.prototype,"melodySound",2);Y([w({type:String})],H.prototype,"chordFeel",2);Y([w({type:String})],H.prototype,"melodyFeel",2);Y([w({type:Object})],H.prototype,"feelSettings",2);Y([w({type:String})],H.prototype,"keyRoot",2);Y([w({type:String})],H.prototype,"scaleMode",2);Y([w({type:Number})],H.prototype,"bpm",2);Y([w({type:Number})],H.prototype,"barsPerChord",2);Y([w({type:Boolean})],H.prototype,"isSaved",2);Y([k()],H.prototype,"activeSheet",2);Y([k()],H.prototype,"feelMoreOpen",2);H=Y([ge("mobile-dock")],H);var Ys=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,ne=(t,e,i,o)=>{for(var n=o>1?void 0:o?Ws(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Ys(e,i,n),n};const Ks={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},Xs=["A","S","D","F","Z","X","C","V"];let Q=class extends me{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Emotional",key:"C",scaleType:"MAJOR",bpm:84,chords:[]},this.chordData={chords:{},scales:{}},this.moodColor="#C9A9E0",this.selectedBand=null,this.isPlaying=!1,this.activeIndex=-1,this.showTheory=!1,this.swapIndex=null,this.activeSwapFamily="Darker",this.abPick=null,this.padHeld=null,this.gridFor=null}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(n=>i+n)}handlePadClick(t,e){const i=this.progression?.chords?.[e];if(!i)return;this.padHeld=e,setTimeout(()=>{this.padHeld===e&&(this.padHeld=null),this.requestUpdate()},180);const o=this.progression?.key||"C",n=this.progression?.scaleType||"MAJOR",s=i.notes&&i.notes.length>0?i.notes:z(i.name,B(o,n));S.playChordNotes(s,.85,i.voicing||"1st inversion",90),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:i},bubbles:!0,composed:!0}))}openSwap(t){this.swapIndex===t?this.swapIndex=null:(this.swapIndex=t,this.abPick=null),this.requestUpdate()}openDetail(t){const e=this.progression?.chords?.[t];this.dispatchEvent(new CustomEvent("chord-detail-open",{detail:{index:t,chord:e},bubbles:!0,composed:!0}))}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=Ni(this.chordData,this.progression),o=Ft(this.chordData,this.progression),n=i.map(d=>({name:d.name,sub:d.sub||"",tension:d.tension,rows:d.rows.map(p=>({name:p.name,roman:p.roman||"",notes:p.notes||p.chord?.notes,sub:p.sub,tension:p.tension,chord:p.chord}))}));n.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))});const s=n.filter(d=>d.name!=="Borrowed").sort((d,p)=>d.tension-p.tension),r=n.filter(d=>d.name==="Borrowed"),a=[...s,...r],l=this.selectedBand?ae(this.selectedBand):null;if(l){const d=$i(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),p=new Map(d.map(c=>[c.chordName,c]));a.forEach(c=>{const g=c.rows.map(h=>{const u=p.get(h.name);return u?{...h,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?u.theory:u.plain}:h});c.rows=g})}return a}handleSwapAudition(t){this.abPick=t.chord;const e=this.progression?.key||"C",i=this.progression?.scaleType||"MAJOR",o=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:z(t.chord.name,B(e,i));S.playChordNotes(o,.8,t.chord.voicing||"1st inversion",92),this.requestUpdate()}confirmSwap(t){const e=this.swapIndex;if(e===null)return;const i=t.detail.chord,o=[...this.progression.chords];o[e]=i,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:o},bubbles:!0,composed:!0})),this.swapIndex=null,this.abPick=null,this.requestUpdate()}updateChordCount(t){const e=this.progression.chords.length,i=Math.max(4,Math.min(8,e+t));i!==e&&this.dispatchEvent(new CustomEvent("set-chord-count",{detail:{count:i},bubbles:!0,composed:!0}))}onReroll(){this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onVibeClick(){this.dispatchEvent(new CustomEvent("open-vibe-picker",{bubbles:!0,composed:!0}))}render(){const t=this.progression.chords||[],e=this.selectedBand?ae(this.selectedBand):null,i=4,o=this.showTheory?ts(this.progression.key||"C",this.progression.scaleType||"MAJOR",this.chordData,this.progression):[];return m`
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
      ${e?m`
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
        ${t.map((n,s)=>{const r=ie(n.tension||.1),a=this.activeIndex===s&&this.isPlaying,l=this.padHeld===s,d=this.swapIndex===s,p=e?Oo(n,e.name,this.progression.key||"C",this.progression.scaleType||"MAJOR"):null,c=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/i)+1)*i-1);return m`
            <div
              class="pad-cell ${l?"pad-held":""} ${d?"selected":""} ${a?"pad-lit":""}"
              style="background: ${r.color};"
              role="button"
              tabindex="0"
              @pointerdown=${g=>this.handlePadClick(g,s)}
              aria-label="${n.name} chord"
            >
              <div class="pad-top-row">
                <div class="pad-key-badge">
                  <span>${Xs[s]||""}</span>
                </div>
                ${this.showTheory&&n.roman?m`<span class="pad-roman-badge">${n.roman}</span>`:""}
                
                <div class="pad-actions">
                  <button
                    class="pad-icon-btn"
                    @click=${g=>{g.stopPropagation(),this.openSwap(s)}}
                    aria-label="Swap chord"
                    title="Swap chord"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                  </button>
                  <button
                    class="pad-icon-btn"
                    @click=${g=>{g.stopPropagation(),this.openDetail(s)}}
                    aria-label="View voicing"
                    title="View voicing"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <div class="pad-bottom-info">
                <div class="pad-role-label">${Ks[n.functionLabel]||n.functionLabel}</div>
                <div class="pad-chord-name">${n.name}</div>
                ${this.showTheory&&n.notes&&n.notes.length?m`
                  <div class="pad-notes-theory">${n.notes.join(" · ")}</div>
                `:""}
                ${p?m`
                  <div class="band-move-pill" style="border-left: 3px solid ${e?.color||"#2E271F"};">
                    <span>${p.name}: ${p.chord}</span>
                  </div>
                `:""}
              </div>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex!==null&&s===c?m`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${t[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(t.length,4)}
                .moodColor=${this.moodColor}
                .band=${e?{name:e.name,color:e.color,plain:e.plain}:null}
                @swap-feel-change=${g=>{this.activeSwapFamily=g.detail.feel,this.requestUpdate()}}
                @swap-audition=${g=>this.handleSwapAudition(g.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${()=>{this.swapIndex=null,this.requestUpdate()}}
              ></chord-swap-lane>
            `:""}
          `})}
      </div>

      <!-- 4. Diatonic Scale Strip -->
      ${this.showTheory&&o.length?m`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header">Diatonic scale degrees (${this.progression.key} ${this.progression.scaleType})</div>
          <div class="scale-degrees-row">
            ${o.map(n=>m`
              <div
                class="scale-degree-chip"
                @click=${()=>{const s=this.progression.key||"C",r=this.progression.scaleType||"MAJOR",a=z(n.chordName,B(s,r));S.playChordNotes(a,.8,"1st inversion",88)}}
                title="Degree ${n.roman}: ${n.functionLabel}"
              >
                <span class="degree-roman">${n.roman}</span>
                <span class="degree-name">${n.chordName}</span>
              </div>
            `)}
          </div>
        </div>
      `:""}
    `}};Q.styles=ue`
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
  `;ne([w({type:Object})],Q.prototype,"progression",2);ne([w({type:Object})],Q.prototype,"chordData",2);ne([w({type:String})],Q.prototype,"moodColor",2);ne([w({type:String})],Q.prototype,"selectedBand",2);ne([w({type:Boolean})],Q.prototype,"isPlaying",2);ne([w({type:Number})],Q.prototype,"activeIndex",2);ne([w({type:Boolean})],Q.prototype,"showTheory",2);ne([k()],Q.prototype,"swapIndex",2);ne([k()],Q.prototype,"activeSwapFamily",2);ne([k()],Q.prototype,"abPick",2);ne([k()],Q.prototype,"padHeld",2);ne([k()],Q.prototype,"gridFor",2);Q=ne([ge("tab-chords")],Q);var Qs=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,T=(t,e,i,o)=>{for(var n=o>1?void 0:o?Zs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Qs(e,i,n),n};const gi=Mo,Ki=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"];Ee.map(t=>t.name);Object.fromEntries(Ee.map(t=>[t.name,t.iconPath]));const Ue={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},er=Ue,fi=["A","S","D","F","Z","X","C","V"],tr=["Octave up","1st inversion","Low root"];function Xi(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const ir=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],or=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],bi=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],se={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},nr=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Qi=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],wt=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],vi={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},St={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},Zi=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],eo={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},kt={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},It={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},Ai={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},it={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function sr(t){const e=t===""?"maj":t;if(it[5][e]||it[6][e])return e;const i=Ai[e];return i&&(it[5][i]||it[6][i])?i:"maj"}function rr(t){const e=sr(t.q),i=[];return[[6,4],[5,9]].forEach(([o,n])=>{const s=it[o][e];if(!s)return;const r=((t.rootPc-n)%12+12)%12;i.push({rootFret:r,frets:s.map(a=>a===null?null:a+r)})}),i.length?(i.sort((o,n)=>o.rootFret-n.rootFret),i[0].frets):null}function ar(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),o=r=>{const a=new Set(r);let l=null;const d=[],p=c=>{if(c===4){const g=d.map((y,b)=>(e[b]+y)%12);for(const y of a)if(g.indexOf(y)<0)return;for(const y of g)if(!a.has(y))return;const h=d.filter(y=>y>0),u=h.length?Math.max(...h)-Math.min(...h):0;if(u>3)return;const f=u*12+d.reduce((y,b)=>y+b,0);(!l||f<l.score)&&(l={frets:d.slice(),score:f});return}for(let g=0;g<=5;g++)d.push(g),p(c+1),d.pop()};return p(0),l},n=o(i);if(n)return n.frets;const s=o(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return s?s.frets:null}let E=class extends me{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle="Block chords",this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isSaved=!1,this.currentProjectId=null,this.activeView="loop",this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.vibeOpen=!1,this.showSaveModal=!1,this.pendingSaveName="",this.selectedBand=null,this.bandSwaps={},this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.humanise=45,this.tone="Warm",this.feelScope="loop",this.barFeel={},this.advOverride={},this.advOpen=!1,this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{if(t.key==="Escape"&&(this.vibeOpen||this.tempoOpen||this.feelOpen)){t.preventDefault(),this.vibeOpen=!1,this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate();return}if(this.isEditableTarget(t))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.ctrlKey||t.metaKey||t.altKey)return;const e=fi.map(o=>o.toLowerCase()).indexOf((t.key||"").toLowerCase()),i=this.progression?.chords||[];if(e>=0&&e<i.length){t.preventDefault();const o=88+e%3*6,n=i[e],s=this.getLadderHome(n),r=n.voicing||"1st inversion",a=Xi(r),l=this.progression?.key||"C",d=this.progression?.scaleType||"MAJOR",p=n.notes&&n.notes.length?n.notes:z(n.name,B(l,d));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const c=a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:r,vel:o,zone:a,reach:s,meta:c},S.playChordNotes(p,.85,r,o),this.requestUpdate()}},this.handleKeyUp=t=>{if(this.isEditableTarget(t)||t.ctrlKey||t.metaKey||t.altKey)return;fi.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.setLibraryOpen=t=>{this.libraryOpen=t,this.dispatchEvent(new CustomEvent("library-open-change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrary=()=>{this.setLibraryOpen(!this.libraryOpen)},this.toggleSaved=()=>{this.isSaved?this.dispatchEvent(new CustomEvent("unsave-set",{detail:this.currentProjectId,bubbles:!0,composed:!0})):(this.pendingSaveName=this.getSuggestedLoopName(),this.showSaveModal=!0,this.updateComplete.then(()=>{const t=this.renderRoot?.querySelector(".save-modal-input");t?.focus(),t?.select()}))},this.cancelSaveModal=()=>{this.showSaveModal=!1,this.pendingSaveName=""},this.confirmSaveModal=()=>{const t=this.pendingSaveName.trim()||this.getSuggestedLoopName();this.dispatchEvent(new CustomEvent("save-set",{detail:t,bubbles:!0,composed:!0})),this.showSaveModal=!1,this.pendingSaveName=""},this.onSaveNameKeydown=t=>{t.key==="Enter"?this.confirmSaveModal():t.key==="Escape"&&this.cancelSaveModal()},this.startRename=(t,e)=>{this.renamingId=t,this.draftName=e,this.confirmDeleteId=null,this.requestUpdate(),this.updateComplete.then(()=>{const i=this.renderRoot?.querySelector(".library-rename-input");i?.focus(),i?.select()})},this.commitRename=t=>{const e=this.renamingId,i=this.draftName.trim();if(e&&i){const o=D.getProjects().find(n=>n.id===e);o&&(o.name=i,D.saveProject(o)),this.savedSets=this.savedSets.map(n=>n.id===e?{...n,name:i}:n),this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:i},bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName="",this.requestUpdate()},this.cancelRename=()=>{this.renamingId=null,this.draftName="",this.requestUpdate()},this.askDelete=t=>{this.confirmDeleteId=t,this.renamingId=null,this.requestUpdate()},this.cancelDelete=()=>{this.confirmDeleteId=null,this.requestUpdate()},this.confirmDelete=t=>{D.deleteProject(t),this.savedSets=this.savedSets.filter(e=>e.id!==t),this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0})),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop",bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrarySelectMode=()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelectMode||(this.librarySelected=[]),this.requestUpdate()},this.toggleSelectLoop=t=>{this.librarySelected.includes(t)?this.librarySelected=this.librarySelected.filter(e=>e!==t):this.librarySelected=[...this.librarySelected,t],this.requestUpdate()},this.toggleSelectAllVisible=()=>{const t=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(n=>!t||(n.name+" "+n.genre+" "+n.mood).toLowerCase().includes(t)).map(n=>n.id);if(i.length>0&&i.every(n=>this.librarySelected.includes(n)))this.librarySelected=this.librarySelected.filter(n=>!i.includes(n));else{const n=new Set([...this.librarySelected,...i]);this.librarySelected=Array.from(n)}this.requestUpdate()},this.deleteSelectedLoops=()=>{const t=[...this.librarySelected];if(!t.length)return;const e=t.length;for(const i of t)D.deleteProject(i),this.dispatchEvent(new CustomEvent("delete-project",{detail:i,bubbles:!0,composed:!0}));this.savedSets=D.getProjects(),this.librarySelected=[],this.savedSets.length||(this.librarySelectMode=!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Deleted ${e} loop${e>1?"s":""}`,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,S.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=B(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:z(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];S.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),S.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=B(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:z(this.abPick.chord,t),i=[...this.progression.chords],o=i[this.swapIndex],n=o.initialChord||{...o};i[this.swapIndex]={...o,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:n};const s={...this.progression,chords:i};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),S.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>nt&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<We&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onSetLength=t=>{(this.progression?.chords.length||4)!==t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t,bubbles:!0,composed:!0}))},this.onReroll=()=>{if(this.selectedBand){this.onGenerateBandProgression(this.selectedBand);return}this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.requestUpdate()},this.onParameterOverride=t=>{const{param:e,value:i}=t.detail;this.advOverride={...this.advOverride,[e]:i},S.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onParameterRelink=t=>{const{param:e}=t.detail,i={...this.advOverride};delete i[e],this.advOverride=i,S.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,S.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,S.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=D.getProjects(),this.unsubscribeProjects=typeof D.subscribeProjects=="function"?D.subscribeProjects(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):typeof D.subscribe=="function"?D.subscribe(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):null,S.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride}),S.setBarsPerChord(this.barsPerChord),tt(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("humanise")||t.has("playStyle")||t.has("tone")||t.has("barFeel")||t.has("advOverride")||t.has("humanEngineState"))&&(S.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:this.humanEngineState}),t.has("playStyle")&&S.setPlayStyle(this.playStyle),t.has("tone")&&tt(this.tone)),t.has("barsPerChord")&&S.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}isEditableTarget(t){const e=n=>{if(!n||typeof n!="object")return!1;const s=n,r=(s.tagName||"").toUpperCase();return r==="INPUT"||r==="TEXTAREA"||r==="SELECT"||!!s.isContentEditable},i=typeof t.composedPath=="function"?t.composedPath():[t.target];for(const n of i)if(e(n))return!0;let o=typeof document<"u"?document.activeElement:null;for(;o&&o.shadowRoot&&o.shadowRoot.activeElement;)o=o.shadowRoot.activeElement;return!!e(o)}getSuggestedLoopName(){if(this.selectedBand)return`${this.selectedBand} vibe`;const t=this.progression?.genre||"Loop",e=this.progression?.mood?this.progression.mood.toLowerCase():"";return e?`${t} ${e}`:`${t} loop`}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){if(this.bandSwaps={},this.selectedBand===t){this.selectedBand=null,this.requestUpdate();return}this.selectedBand=t;const e=ae(t);if(e){const i=wi(e.presetId),o=Si(e.rhythmStyle);i&&(this.instrument=i,S.setInstrument(i),this.dispatchEvent(new CustomEvent("set-instrument",{detail:i,bubbles:!0,composed:!0}))),o&&(this.playStyle=o,S.setPlayStyle(o),this.dispatchEvent(new CustomEvent("set-play-style",{detail:o,bubbles:!0,composed:!0}))),e.defaultBpm&&this.setDirectBpm(e.defaultBpm),this.dispatchEvent(new CustomEvent("toast",{detail:`Artist DNA: ${e.name} · ${i||""} · ${e.defaultBpm} BPM`,bubbles:!0,composed:!0}))}this.requestUpdate()}onWriteBandLoop(t){this.bandSwaps={},this.onGenerateBandProgression(t.name)}onGenerateBandProgression(t){if(!this.progression||!this.chordData)return;this.bandSwaps={};const e=this.progression.key||"C",i=this.progression.scaleType||"MAJOR",o=Es(this.chordData,t,e,i);if(o){const n=ae(t);if(n){const s=wi(n.presetId),r=Si(n.rhythmStyle);s&&(this.instrument=s,S.setInstrument(s),this.dispatchEvent(new CustomEvent("set-instrument",{detail:s,bubbles:!0,composed:!0}))),r&&(this.playStyle=r,S.setPlayStyle(r),this.dispatchEvent(new CustomEvent("set-play-style",{detail:r,bubbles:!0,composed:!0}))),n.defaultBpm&&this.setDirectBpm(n.defaultBpm)}this.progression=o,this.order=Array.from({length:o.chords.length},(s,r)=>r),S.setProgression(o,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${t} progression in ${e} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}}applyBandMove(t,e,i){if(!this.progression)return;const o=this.progression.chords[t];if(!o)return;this.bandSwaps={...this.bandSwaps,[t]:{originalChord:{...o},move:e}};const n={...o,name:e.chord,roman:e.roman,functionLabel:`${i.name} Move`,desc:`${i.name} signature move (${e.name})`,tension:o.tension,tag:"glow",color:ie(o.tension).color},s=[...this.progression.chords];s[t]=n;const r={...this.progression,chords:s};this.progression=r,S.setProgression(r,this.order),S.auditionChord(n,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`${i.name} move: ${e.name} applied to Bar ${t+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}revertBandMove(t){if(!this.progression||!this.bandSwaps[t])return;const{originalChord:e}=this.bandSwaps[t],i={...this.bandSwaps};delete i[t],this.bandSwaps=i;const o=[...this.progression.chords];o[t]=e;const n={...this.progression,chords:o};this.progression=n,S.setProgression(n,this.order),S.auditionChord(e,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Reverted Bar ${t+1} to ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onApplyBandTrick(t,e){if(!this.progression||!this.chordData)return;const i=e!==void 0?e:this.swapIndex!==null?this.swapIndex:this.progression.chords.length>2?2:0,o=this.progression.chords[i];if(!o)return;const n={...o,name:t.chordName,roman:t.roman,notes:t.notes,functionLabel:`${this.selectedBand||"Artist"} Trick`,desc:t.plain,tension:t.tension,tag:"glow",color:ie(t.tension).color},s=[...this.progression.chords];s[i]=n;const r={...this.progression,chords:s};this.progression=r,S.setProgression(r,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),S.auditionChord(n,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Injected ${t.trick.name} (${t.chordName}) at Bar ${i+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderTopBandBar(){const t=this.selectedBand?ae(this.selectedBand):null;if(!t)return"";const e=xt[t.name]||{font:t.font,pillFs:13,pillTrack:"0"};return m`
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
    `}renderBandLegend(){const t=this.selectedBand?ae(this.selectedBand):null;return t?m`
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
    `:""}renderBandInspectorCard(t){const e=xt[t.name]||{font:t.font,weight:t.weight||400,italic:t.italic,pillFs:t.pillFs||13,pillTrack:t.pillTrack||"0"};return m`
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
        ${t.sig&&t.sig.length?m`
          <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">
            ${t.sig.map((i,o)=>m`
              <div style="${o?"padding-top: 10px; border-top: 1px solid rgba(46,39,31,0.07);":""}">
                <div style="font-size: 9px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase; color: var(--cv-label);">${i.k}</div>
                <div style="font-size: 11.5px; font-weight: 600; line-height: 1.45; color: var(--cv-ink); margin-top: 2px; text-wrap: pretty;">${i.v}</div>
              </div>
            `)}
          </div>
        `:m`
          <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink); margin-top: 8px; line-height: 1.45;">${this.showTheory?t.theory:t.plain}</div>
        `}
      </div>
    `}renderBandDnaBar(t){return this.renderBandLegend()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:e},bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t,S.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(n=>i+n)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const i=this.progression?.chords,o=i?i[e]:null;if(!o)return;let n=o.voicing||"1st inversion",s=Xi(n),r;const a=this.getChordLadder(o),l=this.getLadderHome(o);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const y=t.currentTarget.getBoundingClientRect(),b=Math.min(.999,Math.max(0,(t.clientX-y.left)/(y.width||1))),v=Math.min(.999,Math.max(0,(t.clientY-y.top)/(y.height||1)));v<.34?(s=0,n="up an octave"):v>.67?(s=2,n="low, root position"):(s=1,n="1st inversion"),a.length>0&&(r=Math.min(a.length-1,Math.floor(b*a.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const d=r!==void 0&&a[r]?a[r]:o.name,p=r!==void 0&&r!==l&&!!a[r],c=this.progression?.key||"C",g=this.progression?.scaleType||"MAJOR",h=z(d,B(c,g)),u=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const f=p?"→ "+d:s===0?"UP AN OCTAVE":s===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:n,vel:u,zone:s,reach:r,meta:f},S.playChordNotes(h,.85,n,u),this.pendingLatch={index:e,reach:r,voicing:n,targetChordName:d},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords,o=i?i[e]:null;if(o&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const n=t.currentTarget.getBoundingClientRect(),s=Math.min(.999,Math.max(0,(t.clientX-n.left)/(n.width||1))),r=Math.min(.999,Math.max(0,(t.clientY-n.top)/(n.height||1)));let a=1,l="1st inversion";r<.34?(a=0,l="up an octave"):r>.67&&(a=2,l="low, root position");const d=this.getChordLadder(o),p=this.getLadderHome(o),c=d.length>0?Math.min(d.length-1,Math.floor(s*d.length)):void 0,g=c!==void 0&&d[c]?d[c]:o.name,h=c!==void 0&&c!==p&&!!d[c];if(this.pendingLatch?.reach!==c||this.pendingLatch?.voicing!==l){this.pendingLatch={index:e,reach:c,voicing:l,targetChordName:g};const u=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",y=z(g,B(u,f)),b=88+e%3*6,v=h?"→ "+g:a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:l,vel:b,zone:a,reach:c,meta:v},S.playChordNotes(y,.65,l,b),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:i,voicing:o,targetChordName:n}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const s=this.progression.chords[e],r=this.getChordLadder(s),a=this.getLadderHome(s),l=s.voicing||"1st inversion",d=i!==void 0&&i!==a&&!!r[i]&&!!n;if(d||!!o&&o!==l){const c=s.initialChord||{...s};let g;if(d&&n){const f=this.getChordQualityLabel(s.name),y=this.getChordExtensionLabel(n),b=this.progression.key||"C",v=this.progression.scaleType||"MAJOR";g=hi(s,f,y),g.name=n,g.notes=z(n,B(b,v))}else g={...s};o&&(g.voicing=o),g.name===c.name&&(!c.voicing||g.voicing===c.voicing)?delete g.initialChord:g.initialChord=c;const h=[...this.progression.chords];h[e]=g;const u={...this.progression,chords:h};this.progression=u,this.dispatchEvent(new CustomEvent("progression-change",{detail:u,bubbles:!0,composed:!0})),S.setProgression(u,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",S.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=Ni(this.chordData,this.progression),o=Ft(this.chordData,this.progression),n=i.map(d=>({name:d.name,sub:St[d.name]?St[d.name][this.showTheory?1:0]:d.sub||"",tension:d.tension,rows:d.rows.map(p=>({name:p.name,roman:p.roman||"",notes:p.notes||p.chord?.notes,sub:p.sub,tension:p.tension,chord:p.chord}))}));n.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))});const s=n.filter(d=>d.name!=="Borrowed").sort((d,p)=>d.tension-p.tension),r=n.filter(d=>d.name==="Borrowed"),a=[...s,...r],l=this.selectedBand?ae(this.selectedBand):null;if(l){const d=$i(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),p=new Map(d.map(c=>[c.chordName,c]));a.forEach(c=>{const g=c.rows.map(f=>{const y=p.get(f.name);return y?{...f,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?y.theory:y.plain}:f}),h=g.filter(f=>f.bandTag),u=g.filter(f=>!f.bandTag);c.rows=[...h,...u]})}return a}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],i=B(this.progression.key,this.progression.scaleType),o=t.notes&&t.notes.length?t.notes:z(t.chordName,i)||e.notes,n=t.chord?{...t.chord,name:t.chordName,notes:o,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:o,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:o,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,S.auditionChord(n,.8),S.setABOverride({index:this.swapIndex,side:"after",chord:n}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?B(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:z(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&S.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),S.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=B(this.progression.key,this.progression.scaleType),i=z(t,e);S.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=B(this.progression.key,this.progression.scaleType);if(t==="before")S.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),S.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=z(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};S.setABOverride({index:this.swapIndex,side:"after",chord:o}),S.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=B(this.progression.key,this.progression.scaleType),o={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:z(this.abPick.chord,i)};S.auditionChord(o,.8)}else S.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordExtensionLabel(i.name),n=hi(i,t,o);e[this.detailIndex]=n;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),S.auditionChord(n,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${n.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordQualityLabel(i.name),n=hi(i,o,t);e[this.detailIndex]=n;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),S.auditionChord(n,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${n.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(a=>e[a.replace(/\d+$/,"")]??-1)),o=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],n=100/7,s=n*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return m`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${o.map(a=>{const l=i.has(a.pc);return m`<div class="white-key ${l?"active":""}">${a.note}</div>`})}
        </div>
        ${r.map(a=>{const l=(a.after+1)*n-s/2,d=i.has(a.pc);return m`<div class="black-key ${d?"active":""}" style="left: ${l}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.playStyle!==se.playStyle||this.swing!==se.swing||this.spread!==se.spread||this.density!==se.density||this.humanise!==se.humanise||this.tone!==se.tone||Object.keys(this.barFeel).length>0||Object.keys(this.advOverride).length>0}resetFeel(){this.playStyle=se.playStyle,this.swing=se.swing,this.spread=se.spread,this.density=se.density,this.humanise=se.humanise,this.tone=se.tone,this.barFeel={},this.advOverride={},this.humanEngineState=null,S.setPlayStyle(this.playStyle),S.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:{},advOverride:{},humanState:void 0}),tt(this.tone),this.requestUpdate()}get fScopeBar(){return typeof this.feelScope=="number"?this.feelScope:null}fget(t){const e=this.fScopeBar;return e!==null&&this.barFeel[e]&&this.barFeel[e][t]!==void 0?this.barFeel[e][t]:this[t]}fset(t,e){const i=this.fScopeBar;if(i===null)this[t]=e,t==="playStyle"?(S.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-play-style",{detail:e,bubbles:!0,composed:!0}))):t==="tone"?(S.setFeelSettings({tone:e}),tt(e)):S.setFeelSettings({[t]:e});else{const o={...this.barFeel};o[i]={...o[i]||{},[t]:e},this.barFeel=o,S.setFeelSettings({barFeel:o})}this.requestUpdate()}getPatternShortName(t){const e=t||this.fget("playStyle")||this.playStyle||"Block chords",i=bi[0].steps.find(o=>o.v===e);return i?i.name:"Block"}get feelChipLabel(){return`Feel · ${this.getPatternShortName()}`}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle")||this.playStyle||"Block chords",o=ot.find(r=>r.name===e)?.patch??{},n=this.progression?.genre??"Pop",s=Oi[n]??{};return{spread:+(t("spread")/100).toFixed(2),duration:+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),humanVariance:+(t("humanise")/100).toFixed(2),microTiming:+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2),arpMode:o.arpMode??s.arpMode??"off",arpRate:o.arpRate??s.arpRate??"1/16",arpRange:o.arpRange??s.arpRange??1,arpGate:.85,minVelocity:s.minVelocity??60,maxVelocity:s.maxVelocity??110}}get activeEngineParams(){const t=this.getDerivedParams();return{spread:this.advOverride.spread!==void 0?this.advOverride.spread:t.spread,duration:this.advOverride.duration!==void 0?this.advOverride.duration:t.duration,humanVariance:this.advOverride.humanVariance!==void 0?this.advOverride.humanVariance:t.humanVariance,microTiming:this.advOverride.microTiming!==void 0?this.advOverride.microTiming:t.microTiming,arpMode:this.advOverride.arpMode!==void 0?this.advOverride.arpMode:t.arpMode,arpRate:this.advOverride.arpRate!==void 0?this.advOverride.arpRate:t.arpRate,arpRange:this.advOverride.arpRange!==void 0?this.advOverride.arpRange:t.arpRange,arpGate:this.advOverride.arpGate!==void 0?this.advOverride.arpGate:t.arpGate,minVelocity:this.advOverride.minVelocity!==void 0?this.advOverride.minVelocity:t.minVelocity,maxVelocity:this.advOverride.maxVelocity!==void 0?this.advOverride.maxVelocity:t.maxVelocity}}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=i),S.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),S.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,S.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=wt.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=wt.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",i=qi(this.progression,t,e);this.progression=i,S.setProgression(i),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${i.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=Jn(this.progression,t);this.progression=e,S.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=qi(this.progression,t);this.progression=e,S.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,o){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?o+1:0;const n=B(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=z(e,n);S.auditionChord({name:e,notes:s},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=vi[e]||vi[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||vi.MAJOR,o=this.progression?.key||"C",n=F[o.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;B(o,e);const s=o.replace("b","♭")+" "+i.name,r=t.map(f=>{const y=oe(f.name);return F[y.root]??0}),a=f=>i.steps.indexOf(((f-n)%12+12)%12),l=i.steps.map((f,y)=>{const b=(n+f)%12,C=nr[b]+i.quals[y],I=r.indexOf(b),x=I>=0,M=this.auditionDeg===y;return{di:y,roman:i.romans[y],name:C,fn:i.fns[y],inLoop:x,on:M,barIdx:I,aria:`Hear ${C}, the ${i.fns[y].toLowerCase()} of ${s}`}}),d=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,p=t.map(f=>f.roman||i.romans[Math.max(0,a(F[oe(f.name).root]??0))]).join(" – "),c=o.replace("b","♭")+" "+i.name,g=ns(t),h=ss(t),u=this.progression?.note||"";return{scaleName:s,scaleHint:d,scaleDegrees:l,romanFormula:p,keyModeLine:c,cadences:g,voiceLinks:h,setNote:u}}renderScaleChords(t,e,i,o){const n=Gi(this.progression?.mood||"Warm");return m`
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
          ${i.map(s=>m`
            <button
              class="scale-degree-btn ${s.on?"active":""} ${s.inLoop?"in-loop":""}"
              style="border: none; font-family: inherit; text-align: left; cursor: pointer; min-width: 0; min-height: 46px; padding: 7px 10px 8px; border-radius: 13px; transition: background 160ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 160ms ease, transform 160ms ease; background: ${s.on?n:s.inLoop?"var(--cv-surface-2, #F1E4CC)":"transparent"}; box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, ${s.on?.22:s.inLoop?.14:.13}); outline: none;"
              @click=${()=>this.onScaleDegreeClick(s.di,s.name,s.inLoop,s.barIdx)}
              aria-label="${s.aria}"
            >
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 0.9px; color: var(--cv-label);">${s.roman}</div>
                <div style="width: 5px; height: 5px; border-radius: 50%; background: ${s.inLoop?"rgba(46, 39, 31, 0.42)":"transparent"}; flex-shrink: 0;"></div>
              </div>
              <div style="font-size: 14.5px; font-weight: 800; letter-spacing: -0.015em; line-height: 1.1; color: var(--cv-ink); margin-top: 1px;">${s.name}</div>
              <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; margin-top: 1px; color: var(--cv-ink-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.fn}</div>
            </button>
          `)}
        </div>
      </div>
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return m`
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
            ${[1,2,4].map(e=>m`
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
              ${Qi.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=F[i]??0,n=F[e.root]??0,s=o===n;return m`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
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
              ${wt.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return m`
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
    `}renderFeelDrawerDesktop(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return m`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,n=!!this.barFeel[i];return m`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                  aria-label="${e.name}, ${o?"editing":"edit feel"}"
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${o?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${n?1:0}; transition: opacity 150ms ease;"></span>
                </button>
              `})}
          </div>
          ${this.feelChanged?m`
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
          ${bi.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(n=>n.v===i)||e.steps[0]:e.steps.forEach(n=>{Math.abs(Number(n.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=n)}),m`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(n=>{const s=n.v===o.v;return m`
                      <button
                        type="button"
                        style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>this.fset(e.k,n.v)}
                        aria-label="${e.label}: ${n.name}"
                      >
                        ${n.name}
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
        ${this.advOpen?m`
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
    `}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return m`
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
            ${[1,2,4].map(e=>m`
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
            ${Qi.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=F[i]??0,n=F[e.root]??0,s=o===n;return m`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectRoot(e.root)}
                  aria-label="Root note ${e.label}"
                >
                  ${e.label}
                </button>
              `})}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Scale / Mode</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${wt.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return m`
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
    `}setView(t){this.activeView=t,this.dispatchEvent(new CustomEvent("view-change",{detail:t,bubbles:!0,composed:!0}))}onSelectSectionCard(t){this.activeSectionIdx=t,this.setView("loop"),this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}renderMelodyPlaceholder(t){return m`
      <div class="melody-view-wrap" style="padding: 24px 20px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: baseline; gap: 10px;">
            <span style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cv-label, #8A6B3F);">Melody</span>
            <span style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted, #6B5F50);">64 steps · 4 bars</span>
          </div>
          <div style="display: flex; gap: 2px; background: rgba(46,39,31,.06); border-radius: 100px; padding: 3px;">
            <button style="min-height: 30px; padding: 0 12px; border: none; border-radius: 100px; font-family: inherit; font-size: 12px; font-weight: 800; background: transparent; color: #6B5F50; cursor: pointer;">Strict</button>
            <button style="min-height: 30px; padding: 0 12px; border: none; border-radius: 100px; font-family: inherit; font-size: 12px; font-weight: 800; background: #FBF3E6; color: #2E271F; box-shadow: inset 0 0 0 1px rgba(46,39,31,.10), 0 1px 2px rgba(46,39,31,.12); cursor: pointer;">Guide</button>
            <button style="min-height: 30px; padding: 0 12px; border: none; border-radius: 100px; font-family: inherit; font-size: 12px; font-weight: 800; background: transparent; color: #6B5F50; cursor: pointer;">Free</button>
          </div>
        </div>
        <div style="border-radius: 20px; background: rgba(251,243,230,0.65); padding: 32px 20px; text-align: center; border: 1.5px dashed rgba(46,39,31,0.18);">
          <div style="font-size: 17px; font-weight: 800; color: var(--cv-ink, #2E271F); letter-spacing: -0.01em;">MelodyGrid Sequencer</div>
          <div style="font-size: 12.5px; font-weight: 600; color: var(--cv-ink-muted, #6B5F50); margin-top: 8px; max-width: 440px; margin-left: auto; margin-right: auto; line-height: 1.5;">
            Harmonic chord-scale matrix, 16th-note step sequencer, and note bloom micro-keyboard initialized.
          </div>
        </div>
      </div>
    `}renderSongSectionList(t){const e=this.sections.length<$e.length;return m`
      <div class="song-view-wrap song-section-view">
        <div class="song-section-lead">
          Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
        </div>

        <div class="song-section-list">
          ${this.sections.map((i,o)=>{const n=this.activeSectionIdx===o;return m`
              <div
                class="song-section-row ${n?"active":""}"
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
                  ${i.progression.chords.map(s=>{const r=ie(s.tension);return m`
                      <div
                        class="song-chord-chip"
                        style="background: ${r.color};"
                        title="${s.name} (${s.functionLabel||s.tag})"
                      ></div>
                    `})}
                </div>
                ${this.sections.length>1?m`
                  <button
                    class="song-section-delete-btn"
                    title="Remove ${i.name}"
                    aria-label="Remove ${i.name}"
                    @click=${s=>{s.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-section",{detail:o,bubbles:!0,composed:!0}))}}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                `:""}
              </div>
            `})}

          ${e?m`
            <button
              class="song-add-section-card"
              @click=${()=>this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}
              aria-label="Add a related section"
            >
              <span class="plus-glyph">+</span>
              <span>Add a related section</span>
            </button>
          `:m`
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
            ${this.playing?m`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              <span>Stop song</span>
            `:m`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play song · ${this.sections.length} sections</span>
            `}
          </button>
          <div class="strip-timeline-wrap">
            <div class="strip-cells-bar loop-beat-cells">
              ${this.sections.map((i,o)=>{const n=this.playing&&this.activePlayingSectionIdx===o;return m`
                  <div
                    class="strip-cell"
                    style="height: ${n?20:10}px; border-radius: 3px; background: ${n?"#F2735F":"rgba(46,39,31,0.22)"}; flex: 1;"
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
    `}renderFeelSheetMobile(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return m`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; max-height: calc(100% - 24px); overflow-y: auto; overscroll-behavior: contain; background: var(--cv-surface, #F6EADB); border-radius: 26px 26px 0 0; padding: 0 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="position: sticky; top: 0; z-index: 2; background: var(--cv-surface, #F6EADB); padding: 14px 0 10px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">Feel</div>
              ${this.feelChanged?m`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,n=!!this.barFeel[i];return m`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${o?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${n?1:0};"></span>
                </button>
              `})}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${t}
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${bi.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(n=>n.v===i)||e.steps[0]:e.steps.forEach(n=>{Math.abs(Number(n.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=n)}),m`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(n=>{const s=n.v===o.v;return m`
                        <button
                          type="button"
                          style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>this.fset(e.k,n.v)}
                          aria-label="${e.label}: ${n.name}"
                        >
                          ${n.name}
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
          ${this.advOpen?m`
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
    `}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:o,voiceLinks:n,setNote:s}=t;return m`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${i}</div>
        </div>

        ${o.length?m`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${o.map(r=>m`
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
        ${n.map(r=>m`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${r.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${r.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${r.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${r.link}</div>
          </div>
        `)}

        ${s?m`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${s}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),o=this.getChordExtensionLabel(e?.name),n=B(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=e?os(e.name,n):[];return m`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(r=>m`
          <div class="note-pill">${r.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&s.length?m`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${s.map(r=>m`
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
        ${ir.map(r=>{const a=r.label===i;return m`
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
        ${or.map(r=>{const a=r.label===o;return m`
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
    `}renderPianoCard(t,e){const i=oe(t.name),o=eo[i.root]??0,n=It[i.quality]||It[Ai[i.quality]||"maj"]||[0,4,7],s=22,r=86,a=52,l=[0,2,4,5,7,9,11],d=[],p=[],c=[];for(let u=0;u<2;u++)l.forEach((f,y)=>{d.push({x:(u*7+y)*s,w:s-1.5,h:r})});for(let u=0;u<2;u++)[0,1,3,4,5].forEach(f=>{const y=u*7+f;p.push({x:y*s+s*.64,w:s*.58,h:a})});n.forEach(u=>{const f=o+u,y=Math.floor(f/12),b=f%12,v=l.indexOf(b),C=u===0,I=v<0,x=C?"#F2735F":I?"#FBF3E6":"#2E271F",M=C?"#FBF3E6":I?"#2E271F":"#FBF3E6",P=this.showDegrees?kt[u%12]:"";if(v>=0){const N=y*7+v;c.push({cx:N*s+(s-1.5)/2,cy:r-19,r:9,fill:x,isRoot:C,label:P,lc:M})}else{const A=(y*7+l.indexOf(b-1))*s+s*.64,R=s*.58;c.push({cx:A+R/2,cy:a-14,r:7.5,fill:x,isRoot:C,label:P,lc:M})}});const g=14*s,h=n.map(u=>{const f=Zi[(o+u)%12];return this.showDegrees?`${f} (${kt[u%12]})`:f}).join(" · ");return m`
      <div
        class="play-card"
        @pointerdown=${u=>this.handlePadPointerDown(u,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?m`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${g}" height="${r}" viewBox="0 0 ${g} ${r}" style="display: block; width: 100%; max-width: ${g}px; height: auto;">
          ${d.map(u=>re`
            <rect x="${u.x}" y="0" width="${u.w}" height="${u.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${p.map(u=>re`
            <rect x="${u.x}" y="0" width="${u.w}" height="${u.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${c.map(u=>re`
            <g>
              <circle cx="${u.cx}" cy="${u.cy}" r="${u.r}" fill="${u.fill}" stroke="${u.isRoot?"#2E271F":"none"}" stroke-width="${u.isRoot?1.6:0}"></circle>
              ${u.label?re`
                <text x="${u.cx}" y="${u.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${u.lc}" font-family="'Plus Jakarta Sans',sans-serif">${u.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${h}</div>
      </div>
    `}renderFretCard(t,e,i){const o=oe(t.name),n=eo[o.root]??0,s=It[o.quality]||It[Ai[o.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],a=[7,0,4,9],l=i==="Ukulele",d=l?a:r,p=l?ar({root:o.root,rootPc:n,q:o.quality,intervals:s})||[null,null,null,null]:rr({root:o.root,rootPc:n,q:o.quality})||[null,null,null,null,null,null],c=18,g=24,h=4,u=16,f=d.length,y=p.filter($=>$!==null&&$>0),b=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,v=[],C=[],I=[],x=[],M=[];for(let $=0;$<f;$++)v.push({x:$*c});for(let $=0;$<=h;$++)C.push({y:u+$*g,sw:$===0&&b===0?3:1.2});p.forEach(($,U)=>{const X=U*c;if($===null){M.push({x:X});return}if($===0){x.push({x:X});return}const ee=((d[U]+$-n)%12+12)%12;I.push({cx:X,cy:u+($-b-.5)*g,fill:ee===0?"#F2735F":"#2E271F",label:this.showDegrees?kt[((d[U]+$-n)%12+12)%12]:""})});const P=(f-1)*c,N=(f-1)*c+26,A=u+h*g+12,R=b>0?`${b+1}fr`:"",G=b>0,_=s.map($=>{const U=Zi[(n+$)%12];return this.showDegrees?`${U} (${kt[$%12]})`:U}).join(" · ");return m`
      <div
        class="play-card"
        @pointerdown=${$=>this.handlePadPointerDown($,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?m`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${G?m`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${R}</div>
          `:""}
        </div>
        <svg width="${N}" height="${A}" viewBox="-13 -2 ${N} ${A}" style="display: block; width: 100%; max-width: ${N*1.5}px; height: auto;">
          ${C.map($=>re`
            <rect x="0" y="${$.y}" width="${P}" height="${$.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${v.map($=>re`
            <rect x="${$.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${x.map($=>re`
            <circle cx="${$.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${M.map($=>re`
            <text x="${$.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${I.map($=>re`
            <g>
              <circle cx="${$.cx}" cy="${$.cy}" r="${$.fill==="#F2735F"?7.5:7}" fill="${$.fill}"></circle>
              ${$.label?re`
                <text x="${$.cx}" y="${$.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${$.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${_}</div>
      </div>
    `}renderChordPad(t,e,i,o){const n=ie(t.tension||.1),s=this.activeIndex===e&&this.playing,r=this.padFlash===e||this.padHeld===e,a=this.swapIndex===e,l=this.selectedBand?ae(this.selectedBand):null,d=this.progression?.key||"C",p=this.progression?.scaleType||"MAJOR",c=l?Oo(t,l.name,d,p):null,g=!!this.bandSwaps[e],h=this.getChordLadder(t),u=this.getLadderHome(t),f=this.lastPad?.idx===e,y=f&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:u,b=f&&y>=0&&y!==u&&h[y],v=b?y:u,C=f?b?"→ "+h[y]:tr[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"",I=h.map(N=>String(N).replace(/^[A-G][#b]?/,"")),x=I[0];let M=I.slice();x&&I.every((N,A)=>A===0||N.indexOf(x)===0)?M=I.map((N,A)=>A?N.slice(x.length):N):x&&I.every((N,A)=>A===0||N.slice(-x.length)===x)&&(M=I.map((N,A)=>A?N.slice(0,N.length-x.length):N)),M=M.map(N=>(N===""?"maj":N).replace(/maj/gi,"△"));const P=h.map((N,A)=>({label:M[A],wrapStyle:"flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;",labelStyle:`font-size: 8.5px; font-weight: 800; letter-spacing: 0.2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: clip; color: ${A===v?b?i:"rgba(46,39,31,0.78)":"rgba(46,39,31,0.3)"}; transition: color 180ms cubic-bezier(0.23,1,0.32,1);`,barStyle:`width: 100%; height: 4px; border-radius: 3px; background: ${A===v?b?i:"rgba(46,39,31,0.5)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;`}));return m`
      <div
        class="pad-cell ${o?"chord-item-wrap":""} ${r?"pad-held":""} ${a?"selected":""} ${s?"pad-lit":""}"
        style="
          background: ${n.color};
          border-radius: ${a&&o?"20px 20px 5px 5px":"20px"};
          ${a?`box-shadow: inset 0 0 0 2.5px ${i}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${Ue[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${N=>this.handlePadPointerDown(N,e)}
        @pointermove=${N=>this.handlePadPointerMove(N,e)}
        @pointerup=${N=>this.handlePadPointerUp(N)}
        @pointercancel=${N=>this.handlePadPointerUp(N)}
        @pointerleave=${N=>this.handlePadPointerUp(N)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${h.slice(1).map((N,A)=>m`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(A+1)/h.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${N=>{N.stopPropagation(),this.openSwap(e)}}
          @pointerdown=${N=>N.stopPropagation()}
          aria-label="Swap ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${N=>{N.stopPropagation(),this.openDetail(e)}}
          @pointerdown=${N=>N.stopPropagation()}
          aria-label="View voicing for ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(fi[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?m`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${er[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${f&&b&&h[y]?h[y]:t.name}</div>
          ${this.showTheory&&t.notes&&t.notes.length?m`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${t.notes.join(" · ")}
            </div>
          `:""}
          ${C?m`<div class="pad-meta-voicing">${C}</div>`:""}
          <div class="pad-rung-row" style="display: flex; gap: 4px; margin-top: 7px;">
            ${P.map(N=>m`
              <div class="pad-rung-col" style="${N.wrapStyle}">
                <div class="pad-rung-label" style="${N.labelStyle}">${N.label}</div>
                <div class="pad-rung-bar" style="${N.barStyle}"></div>
              </div>
            `)}
          </div>

          ${(c||g)&&l?m`
            <div style="margin-top: 8px;">
              <button
                class="pad-band-move-chip ${g?"applied":""}"
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
                  background: ${g?"#2E271F":l.color};
                  box-shadow: ${g?"none":"0 0 0 1.5px rgba(251,243,230,0.9)"};
                  color: ${g?"#F4EBDB":"#2E271F"};
                  font-size: 10.5px;
                  font-weight: 800;
                  letter-spacing: 0.2px;
                  white-space: nowrap;
                  overflow: hidden;
                  cursor: pointer;
                  z-index: 3;
                  transition: transform 120ms ease, background 120ms ease;
                "
                @pointerdown=${N=>N.stopPropagation()}
                @click=${N=>{N.stopPropagation(),g?this.revertBandMove(e):c&&this.applyBandMove(e,c,l)}}
                aria-label="${g?`Undo ${this.bandSwaps[e]?.move.name} — put ${this.bandSwaps[e]?.originalChord.name} back`:`${c?.name} — change ${t.name} to ${c?.chord}`}"
              >
                ${this.showTheory&&!g&&c?.roman?m`
                  <span style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.5px; opacity: 0.7;">${c.roman}</span>
                `:""}
                <span>${g?"Revert":c?.name}</span>
              </button>
            </div>
          `:""}
        </div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(r=>!e||(r.name+" "+r.genre+" "+r.mood).toLowerCase().includes(e)),o=i.map(r=>r.id),n=o.length>0&&o.every(r=>this.librarySelected.includes(r)),s=o.some(r=>this.librarySelected.includes(r));return m`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          ${this.librarySelectMode&&this.librarySelected.length>0?`${this.librarySelected.length} of ${this.savedSets.length} selected`:`Your loops (${this.savedSets.length})`}
        </div>
        <div class="library-select-toolbar" style="display: flex; align-items: center; gap: 8px;">
          ${this.librarySelectMode&&i.length>0?m`
            <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">
              <input
                type="checkbox"
                class="library-select-all-checkbox"
                style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px;"
                .checked=${n}
                .indeterminate=${s&&!n}
                @change=${this.toggleSelectAllVisible}
                aria-label="Select all loops"
              />
              <button
                type="button"
                class="library-select-all-btn"
                style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer; padding: 0;"
                @click=${r=>{r.stopPropagation(),this.toggleSelectAllVisible()}}
              >
                ${n?"Deselect all":"Select all"}
              </button>
            </label>
          `:""}
          ${this.librarySelectMode&&this.librarySelected.length>0?m`
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
        ${i.map(r=>{const a=this.librarySelected.includes(r.id),l=this.renamingId===r.id,d=this.confirmDeleteId===r.id;return m`
            <div
              class="library-loop-item ${this.librarySelectMode?"select-mode":""} ${a?"selected":""}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${a?"var(--cv-surface-2, #F1E4CC)":"var(--cv-surface)"}; transition: background 120ms ease;"
              @click=${()=>{this.librarySelectMode?this.toggleSelectLoop(r.id):!l&&!d&&(this.dispatchEvent(new CustomEvent("load-project",{detail:r,bubbles:!0,composed:!0})),this.setLibraryOpen(!1))}}
            >
              ${this.librarySelectMode?m`
                <input
                  type="checkbox"
                  class="loop-item-checkbox"
                  .checked=${a}
                  @click=${p=>p.stopPropagation()}
                  @change=${()=>this.toggleSelectLoop(r.id)}
                  style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px; flex-shrink: 0;"
                  aria-label="Select ${r.name}"
                />
              `:""}
              <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
                ${(r.chords||[]).map(p=>{const c=typeof p=="object"&&p!==null?p.tension??0:.2,g=ie(c);return m`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(g.radius*.25)}px;background:${g.color};flex-shrink:0;"></span>`})}
              </div>
              <div style="flex: 1; min-width: 0;">
                ${l?m`
                  <input
                    type="text"
                    class="cv-vibe-input library-rename-input"
                    .value=${this.draftName}
                    @input=${p=>{this.draftName=p.target.value}}
                    @keydown=${p=>{p.key==="Enter"&&this.commitRename(r),p.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(r)}
                    @click=${p=>p.stopPropagation()}
                    style="width: 100%; box-sizing: border-box; border: none; background: var(--cv-cream, #FBF3E6); box-shadow: inset 0 0 0 1.5px rgba(46,39,31,0.16); border-radius: 9px; outline: none; font-family: inherit; font-size: 13px; font-weight: 800; color: var(--cv-ink); padding: 5px 8px;"
                  />
                `:m`
                  <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.name}</div>
                  <div style="font-size: 11px; color: var(--cv-ink-muted);">${r.genre} · ${r.mood}</div>
                `}
              </div>

              ${this.librarySelectMode?"":m`
                ${d?m`
                  <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;" @click=${p=>p.stopPropagation()}>
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
                `:l?"":m`
                  <div class="library-item-actions" style="display: flex; gap: 2px; flex-shrink: 0;" @click=${p=>p.stopPropagation()}>
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
        ${i.length?"":m`
          <div class="library-empty" style="padding: 16px 12px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted); text-align: center;">
            ${this.savedSets.length?"No loops match that.":"Nothing saved yet — tap the bookmark to keep a loop."}
          </div>
        `}
      </div>
    `}renderSaveModal(){return this.showSaveModal?m`
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
    `:""}renderLibrarySheetMobile(t){return this.libraryOpen?m`
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
    `:""}render(){const t=this.progression?.chords||[],e=Gi(this.progression?.mood||"Warm"),i=gi.find(h=>h.name===this.selectedBand),o=this.getTheoryData(t),n=t.map(h=>h.tension||.1),s=Math.max(...n,.1),r=Math.min(...n,0),a=n.indexOf(s),l=n.every((h,u)=>u===0||h>=n[u-1]),d=s-r<.28?"Stays close to home":l?"A steady climb":n[n.length-1]<.25&&a<n.length-1?"Away, then home":"Drifts, then settles",p=`Opens ${Ue[t[0]?.functionLabel]||"home"} and ${s-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":l?`tightens chord by chord, peaking on ${t[a]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[a]?.name||"the middle"} before easing back down home.`}`;let c=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression){if(this.activeSwapFamily==="Borrowed"&&this.chordData?.scales)c=Ft(this.chordData,this.progression,this.swapIndex);else if(this.chordData?.scales){const h=Ni(this.chordData,this.progression,this.swapIndex);c=(h.find(f=>f.name===this.activeSwapFamily)||h[0])?.rows||[],St[this.activeSwapFamily]&&St[this.activeSwapFamily][this.showTheory?1:0]}if(i){const h=$i(this.progression.key||"C",this.progression.scaleType||"MAJOR",i.name),u=new Map(h.map(b=>[b.chordName,b]));c=c.map(b=>{const v=u.get(b.name);return v?{...b,sub:this.showTheory?v.theory:v.plain,bandTag:`${i.name} move`,bandColor:i.color}:b});const f=c.filter(b=>b.bandTag),y=c.filter(b=>!b.bandTag);c=[...f,...y]}}const g=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?m`
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

            ${this.vibeOpen?m`
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
                  ${Ki.map(h=>m`
                    <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Ee.map(h=>{const u=h.name,f=h.dot,y=this.progression?.mood===u;return m`
                      <button
                        class="pill mood-pill ${y?"active":""}"
                        style="${y?`background: ${f}; color: #2E271F;`:""}"
                        @click=${()=>this.onMoodClick(u)}
                      >
                        <span class="mood-badge" style="background: ${y?"rgba(46, 39, 31, 0.12)":f+"33"};">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${y?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                        </span>
                        ${u}
                      </button>
                    `})}
                </div>

                <div class="popover-kicker spaced" style="display: flex; align-items: baseline; gap: 7px;">
                  <span>Band</span>
                  <span style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38); text-transform: lowercase;">optional</span>
                </div>
                <div class="pills-group">
                  ${gi.map(h=>{const u=xt[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return m`
                      <button
                        class="pill ${f?"active":""}"
                        style="font-family: ${u.font}; font-weight: ${u.weight||400}; font-style: ${u.italic?"italic":"normal"}; font-size: ${u.pillFs}px; letter-spacing: ${u.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
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
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>this.setView("loop")}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>this.setView("song")}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>this.setView("play")}>Play it</button>
            </div>
          </div>

          <!-- Main Mobile Canvas -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView==="loop"?m`
              <tab-chords
                .progression=${this.progression}
                .chordData=${this.chordData}
                .moodColor=${e}
                .selectedBand=${this.selectedBand}
                .isPlaying=${this.playing}
                .activeIndex=${this.activeIndex}
                .showTheory=${this.showTheory}
                @chord-detail-open=${h=>this.openDetail(h.detail.index)}
                @progression-update=${h=>{this.progression&&(this.progression={...this.progression,chords:h.detail.chords},this.dispatchEvent(new CustomEvent("update-progression",{detail:this.progression,bubbles:!0,composed:!0})),this.requestUpdate())}}
                @set-chord-count=${h=>this.onSetLength(h.detail.count)}
                @reroll=${this.onReroll}
                @open-vibe-picker=${this.toggleVibe}
                @clear-band=${()=>{this.selectedBand=null,this.requestUpdate()}}
              ></tab-chords>
            `:this.activeView==="song"?this.renderSongSectionList(e):m`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(h=>m`
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

                ${this.playInstrument==="Piano"?m`
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${t.map((h,u)=>this.renderPianoCard(h,u))}
                  </div>
                `:m`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((h,u)=>this.renderFretCard(h,u,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>



          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen?m`
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

        <!-- Mobile Bottom Dock -->
        <mobile-dock
          .activeTab=${this.activeView}
          .isPlaying=${this.playing}
          .playLabel=${this.playing?"Stop":this.activeView==="song"?"Play song":"Play"}
          .moodColor=${e}
          .sections=${this.sections}
          .activeSectionId=${this.sections[this.activeSectionIdx]?.id||"A"}
          .chordSound=${this.instrument||"Stage Rhodes"}
          .melodySound=${"Stage Rhodes"}
          .chordFeel=${this.playStyle||"Block chords"}
          .melodyFeel=${"Smooth"}
          .feelSettings=${{swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}}
          .keyRoot=${this.progression?.key||"C"}
          .scaleMode=${this.getCurrentScaleLabel()}
          .bpm=${this.progression?.bpm||84}
          .barsPerChord=${this.barsPerChord}
          .isSaved=${this.isSaved}
          @toggle-play=${this.activeView==="song"?()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0})):this.togglePlay}
          @select-section=${h=>{const u=this.sections.findIndex(f=>f.id===h.detail.id);u!==-1&&this.dispatchEvent(new CustomEvent("select-section",{detail:u,bubbles:!0,composed:!0}))}}
          @new-section=${()=>this.dispatchEvent(new CustomEvent("add-section",{detail:{name:`Section ${String.fromCharCode(65+this.sections.length)}`},bubbles:!0,composed:!0}))}
          @set-chord-sound=${h=>{this.instrument=h.detail.sound,S.setInstrument(h.detail.sound),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.detail.sound,bubbles:!0,composed:!0})),this.requestUpdate()}}
          @set-chord-feel=${h=>{this.fset("playStyle",h.detail.feel)}}
          @set-feel-settings=${h=>{Object.entries(h.detail).forEach(([u,f])=>{f!==void 0&&this.fset(u,f)})}}
          @set-bpm=${h=>this.setDirectBpm(h.detail.bpm)}
          @set-bars-per-chord=${h=>this.setBarsPerChord(h.detail.bars)}
          @set-key=${h=>{this.selectRoot(h.detail.root),h.detail.mode&&this.selectScale(h.detail.mode.toUpperCase())}}
          @reroll=${this.onReroll}
          @save-set=${this.toggleSaved}
          @unsave-set=${this.toggleSaved}
          @view-sets=${this.toggleLibrary}
          @open-share=${()=>{this.shareOpen=!0}}
        ></mobile-dock>

        <div class="mobile-bottom-transport-bar" style="display: none;">
          <button
            class="loop-play-btn"
            @click=${this.activeView==="song"?()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0})):this.togglePlay}
          >
            ${this.playing?"Stop":"Play loop"}
          </button>
          <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}></button>
          <button
            aria-label="${this.isSaved?"Saved loop":"Keep this loop"}"
            class="mobile-circle-btn save-toggle-btn ${this.isSaved?"saved":""}"
            @click=${this.toggleSaved}
          ></button>
          <button
            aria-label="Your loops"
            aria-expanded=${this.libraryOpen?"true":"false"}
            class="mobile-circle-btn library-toggle ${this.libraryOpen?"active":""}"
            @click=${this.toggleLibrary}
          ></button>
          <button aria-label="Share this loop" class="mobile-circle-btn" @click=${()=>this.shareOpen=!0}></button>
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
      `:m`
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
        ${this.vibeOpen?m`
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
              ${Ki.map(h=>m`
                <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Ee.map(h=>{const u=h.name,f=h.dot,y=this.progression?.mood===u;return m`
                  <button class="pill mood-pill ${y?"active":""}" style="${y?`background: ${f}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(u)}>
                    <span class="mood-badge" style="background: ${y?"rgba(46, 39, 31, 0.12)":f+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${y?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                    </span>
                    ${u}
                  </button>
                `})}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${gi.map(h=>{const u=xt[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return m`
                  <button
                    class="pill ${f?"active":""}"
                    style="font-family: ${u.font}; font-weight: ${u.weight||400}; font-style: ${u.italic?"italic":"normal"}; font-size: ${u.pillFs}px; letter-spacing: ${u.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
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
              <button class="view-tab ${this.activeView==="loop"?"active":""}" @click=${()=>this.setView("loop")}>Chords</button>
              <button class="view-tab ${this.activeView==="song"?"active":""}" @click=${()=>this.setView("song")}>Song</button>
              <button class="view-tab ${this.activeView==="play"?"active":""}" @click=${()=>this.setView("play")}>Play it</button>
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
            ${this.activeView==="loop"?m`
              <tab-chords
                .progression=${this.progression}
                .chordData=${this.chordData}
                .moodColor=${e}
                .selectedBand=${this.selectedBand}
                .isPlaying=${this.playing}
                .activeIndex=${this.activeIndex}
                .showTheory=${this.showTheory}
                @chord-detail-open=${h=>this.openDetail(h.detail.index)}
                @progression-update=${h=>{this.progression&&(this.progression={...this.progression,chords:h.detail.chords},this.dispatchEvent(new CustomEvent("update-progression",{detail:this.progression,bubbles:!0,composed:!0})),this.requestUpdate())}}
                @set-chord-count=${h=>this.onSetLength(h.detail.count)}
                @reroll=${this.onReroll}
                @open-vibe-picker=${this.toggleVibe}
                @clear-band=${()=>{this.selectedBand=null,this.requestUpdate()}}
              ></tab-chords>
            `:this.activeView==="song"?this.renderSongSectionList(e):this.activeView==="melody"?this.renderMelodyPlaceholder(e):m`
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
                  ${t.map((h,u)=>this.renderPianoCard(h,u))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(h=>m`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===h?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===h?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=h}}
                      >${h}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((h,u)=>this.renderFretCard(h,u,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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

          <div style="min-width: 0; background: var(--cv-cream); padding: 2px 22px 16px; display: flex; flex-direction: column; gap: 10px;">
            <transport-bar
              .activeTab=${this.activeView}
              .isPlaying=${this.playing}
              .playLabel=${this.playing?"Stop":this.activeView==="song"?"Play song":"Play section"}
              .moodColor=${e}
              .sections=${this.sections}
              .activeSectionId=${this.sections[this.activeSectionIdx]?.id||"A"}
              .chordSound=${this.instrument||"Stage Rhodes"}
              .melodySound=${"Stage Rhodes"}
              .chordFeel=${this.playStyle||"Block chords"}
              .melodyFeel=${"Smooth"}
              .feelSettings=${{swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}}
              .keyRoot=${this.progression?.key||"C"}
              .scaleMode=${this.getCurrentScaleLabel()}
              .bpm=${this.progression?.bpm||84}
              .barsPerChord=${this.barsPerChord}
              .songTotal=${this.sections.length?`${this.sections.length} sections · ${this.sections.reduce((h,u)=>h+(u.order?u.order.length:4),0)} bars`:""}
              @toggle-play=${this.activeView==="song"?()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0})):this.togglePlay}
              @select-section=${h=>{const u=this.sections.findIndex(f=>f.id===h.detail.id);u!==-1&&this.dispatchEvent(new CustomEvent("select-section",{detail:u,bubbles:!0,composed:!0}))}}
              @new-section=${()=>this.dispatchEvent(new CustomEvent("add-section",{detail:{name:`Section ${String.fromCharCode(65+this.sections.length)}`},bubbles:!0,composed:!0}))}
              @set-chord-sound=${h=>{this.instrument=h.detail.sound,S.setInstrument(h.detail.sound),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.detail.sound,bubbles:!0,composed:!0})),this.requestUpdate()}}
              @set-chord-feel=${h=>{this.fset("playStyle",h.detail.feel)}}
              @set-feel-settings=${h=>{Object.entries(h.detail).forEach(([u,f])=>{f!==void 0&&this.fset(u,f)})}}
              @set-bpm=${h=>this.setDirectBpm(h.detail.bpm)}
              @set-bars-per-chord=${h=>this.setBarsPerChord(h.detail.bars)}
              @set-key=${h=>{this.selectRoot(h.detail.root),h.detail.mode&&this.selectScale(h.detail.mode.toUpperCase())}}
              @open-share=${()=>{this.shareOpen=!0}}
            ></transport-bar>
          </div>
        </main>

        <!-- 3. Right Inspector (<aside>) -->
        <aside class="inspector-right sidebar-right">
          ${this.detailOpen?m`
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
          `:this.swapIndex!==null?m`
            <!-- Chord Swap Harmonic Context View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Bar ${this.swapIndex+1} Harmonic Context</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${g?.name||""}</span>
                    ${this.showTheory&&g?.roman?m`<span class="swap-roman">${g.roman}</span>`:""}
                    <span class="swap-role">${Ue[g?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${i?this.renderBandInspectorCard(i):""}

              ${this.abPick?m`
                <div style="animation: cvfv-pop 200ms ease-out; background: var(--cv-cream); border-radius: 16px; padding: 16px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                    Auditioning · ${this.activeSwapFamily||"Substitution"}
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                    <div style="font-size: 22px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.02em; line-height: 1.1;">${this.abPick.chord||this.abPick.name}</div>
                    ${this.abPick.roman?m`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label);">${this.abPick.roman}</div>`:""}
                  </div>
                  <div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">
                    ${this.abPick.functionLabel||this.abPick.fn||"Harmonic substitution that alters the feel of the bar."}
                  </div>
                  ${this.abPick.notes&&this.abPick.notes.length?m`
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; color: var(--cv-ink); margin-top: 10px;">
                      Notes: ${this.abPick.notes.join(" · ")}
                    </div>
                  `:""}
                  <div style="font-size: 11.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(46,39,31,0.08);">
                    Hear how this chord changes the emotional arc of the progression.
                  </div>
                </div>
              `:m`
                <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); background: var(--cv-cream); border-radius: 14px; padding: 15px;">
                  Pick a feeling in the swap lane under the loop, then tap a candidate chord to audition it. What it does, its notes, and how it voices will show up here.
                </div>
              `}

              ${this.showTheory?this.renderTheoryStrip(o):""}
            </div>
          `:m`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div style="flex: 1; min-width: 0;">
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${d}</div>
                </div>
                <div style="position: relative; display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                  <button
                    class="save-pill-btn ${this.isSaved?"saved":""}"
                    @click=${this.toggleSaved}
                    aria-label="${this.isSaved?"Saved":"Save"}"
                    style="${this.isSaved?`background: ${e};`:""}"
                  >
                    ${this.isSaved?m`
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#2E271F"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                      Saved
                    `:m`
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
                  ${this.libraryOpen?m`
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
                ${t.map((h,u)=>{const f=ie(h.tension||.1),y=Math.round(18+(h.tension||.1)*62);return m`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(u)} aria-label="${h.name}, ${Ue[h.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${y}px; background: ${f.color};"></div>
                      </div>
                      <div class="arc-bar-name">${h.name}</div>
                      <div class="arc-bar-feel">${Ue[h.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${p}</div>
              ${this.showTheory&&o.setNote?m`
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
    `}};E.styles=ue`
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
  `;T([w({type:Object})],E.prototype,"chordData",2);T([w({type:Object})],E.prototype,"progression",2);T([w({type:Number})],E.prototype,"activeIndex",2);T([w({type:Number})],E.prototype,"progressStep",2);T([w({type:Array})],E.prototype,"order",2);T([w({type:Boolean})],E.prototype,"playing",2);T([w({type:Boolean})],E.prototype,"showTheory",2);T([w({type:String})],E.prototype,"instrument",2);T([w({type:String})],E.prototype,"playStyle",2);T([w({type:Boolean})],E.prototype,"isAuthenticated",2);T([w({type:String})],E.prototype,"userEmail",2);T([w({type:Array})],E.prototype,"sections",2);T([w({type:Number})],E.prototype,"activeSectionIdx",2);T([w({type:Number})],E.prototype,"activePlayingSectionIdx",2);T([w({type:Number})],E.prototype,"totalSongSteps",2);T([w({type:Boolean})],E.prototype,"isGenerating",2);T([w({type:Boolean})],E.prototype,"libraryOpen",2);T([w({type:Boolean})],E.prototype,"isSaved",2);T([w({type:String})],E.prototype,"currentProjectId",2);T([w({type:String})],E.prototype,"activeView",2);T([k()],E.prototype,"isMobile",2);T([k()],E.prototype,"vibeOpen",2);T([k()],E.prototype,"showSaveModal",2);T([k()],E.prototype,"pendingSaveName",2);T([w({type:String})],E.prototype,"selectedBand",2);T([k()],E.prototype,"bandSwaps",2);T([k()],E.prototype,"freeText",2);T([k()],E.prototype,"vibePlaceholderIdx",2);T([k()],E.prototype,"expandedGenre",2);T([k()],E.prototype,"expandedMood",2);T([k()],E.prototype,"activeSwapFamily",2);T([k()],E.prototype,"swapIndex",2);T([k()],E.prototype,"isInspectorOpen",2);T([k()],E.prototype,"detailOpen",2);T([k()],E.prototype,"detailIndex",2);T([k()],E.prototype,"abPick",2);T([k()],E.prototype,"abSide",2);T([k()],E.prototype,"abPlaying",2);T([k()],E.prototype,"mobileFeelIndex",2);T([k()],E.prototype,"mobileChordIndex",2);T([k()],E.prototype,"savedSets",2);T([k()],E.prototype,"renamingId",2);T([k()],E.prototype,"draftName",2);T([k()],E.prototype,"confirmDeleteId",2);T([k()],E.prototype,"librarySearch",2);T([k()],E.prototype,"librarySelectMode",2);T([k()],E.prototype,"librarySelected",2);T([k()],E.prototype,"playInstrument",2);T([k()],E.prototype,"showDegrees",2);T([k()],E.prototype,"mobileSheetOpen",2);T([k()],E.prototype,"mobileDetailSheetOpen",2);T([k()],E.prototype,"padFlash",2);T([k()],E.prototype,"padHeld",2);T([k()],E.prototype,"gridFor",2);T([k()],E.prototype,"lastPad",2);T([k()],E.prototype,"tempoOpen",2);T([k()],E.prototype,"feelOpen",2);T([k()],E.prototype,"shareOpen",2);T([k()],E.prototype,"expandedInstrument",2);T([k()],E.prototype,"barsPerChord",2);T([k()],E.prototype,"swing",2);T([k()],E.prototype,"spread",2);T([k()],E.prototype,"density",2);T([k()],E.prototype,"humanise",2);T([k()],E.prototype,"tone",2);T([k()],E.prototype,"feelScope",2);T([k()],E.prototype,"barFeel",2);T([k()],E.prototype,"advOverride",2);T([k()],E.prototype,"advOpen",2);T([k()],E.prototype,"showAdvancedFeel",2);T([k()],E.prototype,"humanEngineState",2);T([k()],E.prototype,"auditionDeg",2);T([k()],E.prototype,"auditionName",2);T([k()],E.prototype,"auditionBar",2);E=T([ge("loop-screen")],E);var lr=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,Qe=(t,e,i,o)=>{for(var n=o>1?void 0:o?cr(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&lr(e,i,n),n};let Te=class extends me{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&Ge.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await Ge.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?m``:m`
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

          ${this.errorMessage?m`<div class="alert-box alert-error">${this.errorMessage}</div>`:""}

          <div class="btn-container">
            <div id="google-btn-container">
              <button
                type="button"
                class="oauth-btn"
                ?disabled=${this.isOAuthLoading}
                @click=${this.handleGoogleSignIn}
              >
                ${this.isOAuthLoading?m`<span class="spinner"></span> <span>Connecting to Google...</span>`:m`
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
    `}};Te.styles=ue`
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
  `;Qe([w({type:Boolean})],Te.prototype,"open",2);Qe([k()],Te.prototype,"mounted",2);Qe([k()],Te.prototype,"isOAuthLoading",2);Qe([k()],Te.prototype,"errorMessage",2);Qe([Ho("#google-btn-container")],Te.prototype,"googleBtnContainer",2);Te=Qe([ge("auth-modal")],Te);var dr=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,L=(t,e,i,o)=>{for(var n=o>1?void 0:o?pr(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&dr(e,i,n),n};let j=class extends me{constructor(){super(...arguments),this.activeTab="loop",this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.syncError=null,this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.chordLengthCache=[],this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Ge.signOut(),D.logout()},this.toastUndoAction="delete",this.toastUndoProject=null}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&Be.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&ot.some(i=>i.name===e)&&(this.playStyle=e),S.setInstrument(this.instrument),S.setPlayStyle(this.playStyle),this.unsubscribeAuth=Ge.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=D.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=D.subscribeSyncStatus(i=>{const o=this.syncStatus;if(this.syncStatus=i,this.syncError=D.getLastSyncError(),i==="offline"&&o!=="offline"){const n=this.syncError||"Cloud sync failed";this.showToast(`Sync failed: ${n}`)}this.requestUpdate()}),this.unsubscribeTick=S.subscribeTick((i,o,n,s,r)=>{this.activeIndex=i,this.progressStep=o,typeof n=="number"&&(this.activePlayingSectionIdx=n),typeof s=="number"&&(this.totalSongSteps=s),this.playing=S.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),$n().then(i=>{this.chordData=i,this.progression||(this.progression=Ot(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(o,n)=>n),S.setProgression(this.progression,this.order),this.sections=fe.createInitialSong(this.progression,this.order))}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),S.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return D.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();(t==="sets"||t==="11a")&&(this.libraryOpen=!0)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const i=(typeof t?.detail=="string"?t.detail:t?.detail?.promptText)||this.activeSearchPrompt||void 0;i&&this.showToast("Composing chords with AI...");const o=await Ss.resolvePrompt(this.chordData,this.genre,this.mood,this.length,i);o.instrument&&(this.instrument=o.instrument,localStorage.setItem("chroma-chords-instrument",o.instrument),S.setInstrument(o.instrument)),o.playStyle&&(this.playStyle=o.playStyle,localStorage.setItem("chroma-chords-play-style",o.playStyle),S.setPlayStyle(o.playStyle));const n=o.progression;this.progression=n,n.genre&&(this.genre=n.genre),n.mood&&(this.mood=n.mood),this.order=Array.from({length:n.chords.length},(s,r)=>r),this.length=n.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.chordLengthCache=[],S.setProgression(n,this.order),S.reset(),this.sections=fe.createInitialSong(n,this.order),this.activeSectionIdx=0,this.activeSearchPrompt=null,i&&this.showToast(`Composed from "${i}"`)}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){const e=t.detail;if(!this.progression||e===this.length)return;const i=Un(this.progression,e,this.chordData,this.chordLengthCache);this.progression=i.progression,this.chordLengthCache=i.cachedTailChords,this.length=this.progression.chords.length,this.order=Array.from({length:this.length},(o,n)=>n),S.setProgression(this.progression,this.order),this.sections.length>0?this.sections=fe.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order):this.sections=fe.createInitialSong(this.progression,this.order),this.requestUpdate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;this.chordLengthCache=[];const t=Ot(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,S.setProgression(t,this.order),this.sections=fe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(S.startAutoplay(),S.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let n=o.notes;(!n||n.length===0)&&(n=z(o.name,B(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:n,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,n)=>n),this.length=this.progression.chords.length,this.chordLengthCache=[],this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&S.setBarsPerChord(e.barsPerChord),e.feel&&S.setFeelSettings(e.feel),S.setProgression(this.progression,this.order),this.sections=fe.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){D.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=D.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,D.saveProject(e),this.requestUpdate())}async onSyncProjects(){await D.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onUnsaveSet(t){const e=t.detail||this.currentProjectId;if(e){const i=D.getProjects().find(n=>n.id===e),o=i?.name||"Loop";i&&(this.toastUndoProject={...i}),D.deleteProject(e),this.currentProjectId===e&&(this.currentProjectId=null),this.showToast(`Removed "${o}"`,e,"restore"),this.requestUpdate()}}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),S.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),S.setPlayStyle(t.detail)}onTogglePlay(){this.playing=S.togglePlay()}onTogglePlaySong(){S.setSong(this.sections),this.playing=S.togglePlay()}onProgressionChange(t){this.progression=t.detail,this.progression&&(this.length=this.progression.chords.length,(this.order.length!==this.length||this.order.some(e=>e>=this.length))&&(this.order=Array.from({length:this.length},(e,i)=>i))),S.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=fe.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=fe.addSection(this.sections,this.progression,this.chordData);this.sections=t.sections,this.activeSectionIdx=t.activeIndex;const e=this.sections[this.activeSectionIdx];e&&(this.progression=e.progression,this.order=e.order.slice(),S.setProgression(this.progression,this.order)),S.setSong(this.sections),this.requestUpdate()}onRemoveSection(t){const e=t.detail,i=fe.removeSection(this.sections,e);this.sections=i.sections,this.activeSectionIdx=i.activeIndex;const o=this.sections[this.activeSectionIdx];o&&(this.progression=o.progression,this.order=o.order.slice(),S.setProgression(this.progression,this.order)),S.setSong(this.sections),this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.progression=e.progression,this.order=e.order.slice(),S.setProgression(this.progression,this.order)),this.requestUpdate()}showToast(t,e,i="delete"){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastUndoAction=i,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null},3200)}onToastUndo(){this.toastUndoId&&(this.toastUndoAction==="restore"&&this.toastUndoProject?(D.saveProject(this.toastUndoProject),this.currentProjectId=this.toastUndoProject.id):this.toastUndoAction==="delete"&&(D.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null)),this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=D.getProjects().find(a=>a.id===e),o=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,n=S.getFeelSettings(),s=S.getBarsPerChord(),r={id:e,name:o,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:s,feel:{swing:n.swing??0,spread:n.spread??50,density:n.density??50,tone:n.tone??"Warm",humanState:n.humanState}};D.saveProject(r),t&&D.scheduleCloudSync(),this.showToast(`Saved "${o}"`,e,"delete"),this.requestUpdate()}render(){const t=!!(this.currentProjectId&&D.isProjectSaved(this.currentProjectId));return m`
      <div class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${D.getProjects().length}
          .syncStatus=${this.syncStatus}
          .syncError=${this.syncError}
          @tab-change=${e=>{this.activeTab=e.detail}}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.libraryOpen=!1}}
        ></app-header>
      </div>

      <div class="screen-view">
        ${this.progression?m`
          <loop-screen
            .activeView=${this.activeTab}
            @view-change=${e=>{this.activeTab=e.detail}}
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
            .isSaved=${t}
            .currentProjectId=${this.currentProjectId}
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
            @remove-section=${this.onRemoveSection}
            @save-set=${this.onSaveSet}
            @unsave-set=${this.onUnsaveSet}
            @load-project=${this.onLoadProject}
            @delete-project=${this.onDeleteProject}
            @rename-project=${this.onRenameProject}
            @view-sets=${()=>{this.libraryOpen=!0}}
            @request-login=${this.onLoginRequest}
            @request-logout=${this.onLogoutRequest}
            @toast=${e=>this.showToast(e.detail)}
          ></loop-screen>
        `:m`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

        ${this.toastMessage?m`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              ${this.toastUndoId?m`
                <button class="toast-btn" @click=${()=>{this.libraryOpen=!0,this.toastMessage=null}}>View</button>
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:m`
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
    `}};j.styles=ue`
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
      overflow: hidden;
      position: relative;
    }

    @media (max-width: 899px) {
      .screen-view {
        padding: var(--cv-mob-panel-padding, 14px 18px 26px);
        box-sizing: border-box;
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
  `;L([k()],j.prototype,"activeTab",2);L([k()],j.prototype,"chordData",2);L([k()],j.prototype,"libraryOpen",2);L([k()],j.prototype,"genre",2);L([k()],j.prototype,"mood",2);L([k()],j.prototype,"progression",2);L([k()],j.prototype,"activeIndex",2);L([k()],j.prototype,"progressStep",2);L([k()],j.prototype,"order",2);L([k()],j.prototype,"playing",2);L([k()],j.prototype,"showTheory",2);L([k()],j.prototype,"instrument",2);L([k()],j.prototype,"playStyle",2);L([k()],j.prototype,"length",2);L([k()],j.prototype,"sections",2);L([k()],j.prototype,"activeSectionIdx",2);L([k()],j.prototype,"activePlayingSectionIdx",2);L([k()],j.prototype,"totalSongSteps",2);L([k()],j.prototype,"userEmail",2);L([k()],j.prototype,"isAuthenticated",2);L([k()],j.prototype,"syncStatus",2);L([k()],j.prototype,"syncError",2);L([k()],j.prototype,"authModalOpen",2);L([k()],j.prototype,"toastMessage",2);L([k()],j.prototype,"toastUndoId",2);L([k()],j.prototype,"isGenerating",2);L([k()],j.prototype,"chordLengthCache",2);j=L([ge("chroma-chords-app")],j);
