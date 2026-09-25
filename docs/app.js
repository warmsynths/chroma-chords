import{f as fn,u as bn,s as zi,n as gi,l as ji,F as ai,S as ce,G as Qe,a as ie,E as Pe,C as me,V as Ue,D as ge,R as pe,P as q,b as li,M as Fe,c as _i,d as he,g as vn,i as Ee,e as Ce,h as f,O as yn,w as X}from"./assets/vendor-DZ9oKBXX.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xn={attribute:!0,type:String,converter:bn,reflect:!1,hasChanged:fn},wn=(t=xn,e,i)=>{const{kind:n,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),n==="accessor"){const{name:r}=i;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,c,t,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,t,a),a}}}if(n==="setter"){const{name:r}=i;return function(a){const c=this[r];e.call(this,a),this.requestUpdate(r,c,t,!0,a)}}throw Error("Unsupported decorator location: "+n)};function C(t){return(e,i)=>typeof i=="object"?wn(t,e,i):((n,o,s)=>{const r=o.hasOwnProperty(s);return o.constructor.createProperty(s,n),r?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t){return C({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const In=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Sn(t,e){return(i,n,o)=>{const s=r=>r.renderRoot?.querySelector(t)??null;return In(i,n,{get(){return s(this)}})}}const Me="chroma_chords_projects",kn="chord_voyager_projects";class $e{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(Me);if(e||(e=localStorage.getItem(kn),e&&localStorage.setItem(Me,e)),e){const i=JSON.parse(e);let n=!1;return i.forEach(o=>{(o.genre==="Unknown"||!o.genre)&&(o.genre="Pop",n=!0),Array.isArray(o.chords)||(o.chords=[],n=!0)}),n&&localStorage.setItem(Me,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(Me,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const n=new Map;return e.forEach(o=>n.set(o.id,o)),i.forEach(o=>{const s=n.get(o.id);!s||o.lastModified>s.lastModified?n.set(o.id,o):o.lastModified===s.lastModified&&(s.syncedToCloud=!0)}),Array.from(n.values())}static saveProject(e){const i=this.getProjects(),n=i.findIndex(o=>o.id===e.id);e.lastModified=Date.now(),n>=0?i[n]=e:i.push(e);try{localStorage.setItem(Me,JSON.stringify(i))}catch(o){console.error("Failed to save project to localStorage:",o)}}static deleteProject(e){let i=this.getProjects();i=i.filter(n=>n.id!==e);try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(Me,JSON.stringify(i))}catch(n){console.error("Failed to delete project from localStorage:",n)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),n=new Blob([i],{type:"application/json"}),o=URL.createObjectURL(n),s=document.createElement("a");s.href=o,s.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)}static importProjectFile(e){return new Promise((i,n)=>{const o=new FileReader;o.onload=s=>{try{const r=s.target?.result,a=JSON.parse(r);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),i(a)):n(new Error("Invalid project file format"))}catch{n(new Error("Failed to parse JSON file"))}},o.onerror=()=>n(new Error("Failed to read file")),o.readAsText(e)})}}const Ze="chroma_chords_auth_token",Mt="chroma_chords_auth_user",Nn="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function $t(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let n="";if(typeof atob=="function")n=atob(i);else if(typeof Buffer<"u")n=Buffer.from(i,"base64").toString("binary");else return null;const o=decodeURIComponent(n.split("").map(s=>"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(o)}catch{return null}}function Tn(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Nn}}class En{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Tn(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Ze);if(e){const i=$t(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Ze),localStorage.removeItem(Mt),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=$t(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(n){console.error("Error in AuthState listener:",n)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=$t(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Ze,e),localStorage.setItem(Mt,JSON.stringify(this.currentUser)))}catch(n){console.warn("Failed to persist auth session to localStorage:",n)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const n=document.createElement("script");n.src="https://accounts.google.com/gsi/client",n.async=!0,n.defer=!0,n.onload=()=>{this.gisLoaded=!0,e(!0)},n.onerror=()=>e(!1),document.head.appendChild(n)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const n=window.google;if(n?.accounts?.id)try{n.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i?.({success:s.success,message:s.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",n.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(o){console.warn("Failed to render Google button:",o)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:n=>{if(n.credential){const o=this.handleCredentialResponse(n.credential);i({success:o.success,message:o.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(n=>{(n.isNotDisplayed?.()||n.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(n){const o=n instanceof Error?n.message:String(n);i({success:!1,message:o})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Ze),localStorage.removeItem(Mt)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const Re=new En;class Cn{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const n=i.trim();n.toLowerCase().startsWith("bearer ")?e.Authorization=n:e.Authorization=`Bearer ${n}`}async testConnection(e,i){const n=this.formatUrl(e);if(!n)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const o={};this.applyAuthHeaders(o,i);const s=new AbortController,r=setTimeout(()=>s.abort(),8e3),a=await fetch(`${n}/api/health`,{method:"GET",headers:o,signal:s.signal});if(clearTimeout(r),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const c=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${c||a.statusText}`}}catch(o){return o instanceof Error&&o.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,n){const o=this.formatUrl(e);if(!o)throw new Error("Worker URL is not configured");const s={"Content-Type":"application/json"};this.applyAuthHeaders(s,i);const r=new AbortController,a=setTimeout(()=>r.abort(),45e3);try{const c=await fetch(`${o}/api/sync`,{method:"POST",headers:s,body:JSON.stringify(n),signal:r.signal});if(clearTimeout(a),!c.ok){let p="";try{const h=await c.json();p=h.error||h.message||""}catch{p=await c.text().catch(()=>"")}throw new Error(`Cloud sync failed (${c.status}): ${p||c.statusText||"Unknown error"}`)}return await c.json()}catch(c){throw clearTimeout(a),c instanceof Error&&c.name==="AbortError"?new Error("Cloud sync request timed out (45s limit)"):c}}}const An=new Cn,xi="chroma_chords_deleted_projects",wi="chroma_chords_last_sync_time",On="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev";function Mn(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return On}}function Ii(t){return typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(t):null}function Si(t,e){typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}class $n{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.lastSyncError=null,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=Re.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.authenticated||(this.lastSyncError=null),this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(n=>{console.warn("Auto cloud sync on sign-in encountered an error:",n)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(n){console.error("Error in ProjectsChange callback:",n)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return $e.getProjects()}isProjectSaved(e){return e?$e.getProjects().some(i=>i.id===e):!1}saveProject(e){$e.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){$e.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Ii(xi);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Si(xi,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),n=i.findIndex(s=>s.id===e),o=new Date().toISOString();n>=0?i[n].deletedAt=o:i.push({id:e,deletedAt:o}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(n=>n.id!==e);this.setTombstones(i)}getLastSyncTime(){return Ii(wi)}setLastSyncTime(e){Si(wi,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await Re.getAccessToken();if(!this.isAuthenticated()||!i)return;const n=e||Mn();if(n){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const o=$e.getProjects(),s=this.getTombstones(),r=this.getLastSyncTime(),a=r?new Date(r).getTime():0,p=(r?o.filter(v=>!v.syncedToCloud||v.lastModified&&v.lastModified>a):o).map(v=>({...v,deletedAt:null})),h=await An.sync(n,i,{sets:p,lastSyncTime:r,tombstones:s}),l=new Map;o.forEach(v=>{l.set(v.id,{...v,syncedToCloud:!0})});const m=h.tombstones||[],d=new Set(m.map(v=>v.id));(h.sets||[]).forEach(v=>{if(v.deletedAt)d.add(v.id);else{const x=l.get(v.id),w=v.lastModified||(v.updatedAt?new Date(v.updatedAt).getTime():0),I=x?.lastModified||0;(!x||w>=I)&&l.set(v.id,{id:v.id,name:v.name,lastModified:w,genre:v.genre,mood:v.mood,key:v.key,scaleType:v.scaleType,bpm:v.bpm,showTheory:v.showTheory,chords:Array.isArray(v.chords)?v.chords:[],syncedToCloud:!0})}}),d.forEach(v=>{l.delete(v)});const u=Array.from(l.values());$e.setProjects(u);const g=this.getTombstones(),y=new Set(s.map(v=>v.id)),b=g.filter(v=>!y.has(v.id));this.setTombstones(b),(h.lastSyncTime||h.syncedAt)&&this.setLastSyncTime(h.lastSyncTime||h.syncedAt),this.lastSyncError=null,this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(o){this.lastSyncError=o instanceof Error?o.message:String(o),console.warn("Cloud sync encountered an error, transitioning to offline status:",o),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}getLastSyncError(){return this.lastSyncError}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const D=new $n;let Dt=null,bt=null,vt=null,yt=null,Ge=null,Bt=null,Ft=null,Pt=null,et=null,Ut=null,Rt=null,Lt=null,zt=null,tt=null,it=null,nt=null,ot=null,st=null,jt=null,_t=null,Vt=null,rt=null,at=null,Gt=null,qt=null,lt=null,Ht=null,Jt=null;function Vi(){return Dt||(Dt=new _i({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Dt}let ct="Warm",De=null,Yt=null,Se=null,Wt=null,dt=null,ke=null,Kt=null,Xt=null,Qt=null,Ne=null;function Oe(){if(!De){De=new Qe(1);const t=Vi();Yt=new ie({frequency:3200,type:"lowpass",rolloff:-12}),Se=new Qe(1),Yt.connect(Se),Se.connect(t),De.connect(Yt),Wt=new Pe({high:3.5,mid:0,low:-.5,highFrequency:4500}),dt=new me({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{dt.start()}catch{}ke=new Qe(0),Wt.connect(dt),dt.connect(ke),ke.connect(t),De.connect(Wt),Kt=new ie({frequency:1800,type:"bandpass",Q:.8}),Xt=new Ue({frequency:.5,depth:.1,wet:.4}),Qt=new ge({distortion:.1,wet:.15}),Ne=new Qe(0),Kt.connect(Xt),Xt.connect(Qt),Qt.connect(Ne),Ne.connect(t),De.connect(Kt)}return De}function qe(t){Oe();const e=t?t.toLowerCase().trim():"warm";ct=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const i=.05,n=gi();try{Se&&ke&&Ne&&(ct==="Warm"?(Se.gain.rampTo(1,i,n),ke.gain.rampTo(0,i,n),Ne.gain.rampTo(0,i,n)):ct==="Glassy"?(Se.gain.rampTo(0,i,n),ke.gain.rampTo(1,i,n),Ne.gain.rampTo(0,i,n)):ct==="Dusty"&&(Se.gain.rampTo(0,i,n),ke.gain.rampTo(0,i,n),Ne.gain.rampTo(1,i,n)))}catch(o){console.warn("Failed to ramp master tone:",o)}}function Dn(t="Warm",e){const i=t?t.toLowerCase().trim():"warm",n=e??vn();if(i==="glassy"){const s=new Pe({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new me({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return s.connect(r),r.connect(n),s}if(i==="dusty"){const s=new ie({frequency:1800,type:"bandpass",Q:.8}),r=new Ue({frequency:.5,depth:.1,wet:.4}),a=new ge({distortion:.1,wet:.15});return s.connect(r),r.connect(a),a.connect(n),s}const o=new ie({frequency:3200,type:"lowpass",rolloff:-12});return o.connect(n),o}const Zt=typeof import.meta<"u"&&"./"||"./",Tt=Zt.endsWith("/")?Zt:`${Zt}/`,Gi={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},Bn=`${Tt}audio/samples/grand-piano/`,qi={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},Fn=`${Tt}audio/samples/stage-rhodes/`,Hi={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},Pn=`${Tt}audio/samples/nylon-guitar/`,Ji={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},Un=`${Tt}audio/samples/jazz-guitar/`;function Rn(t="piano"){let e=null,i={};if(t==="jazz-guitar"?(e=Ge,i=Ji):t==="guitar"?(e=yt,i=Hi):t==="rhodes"||t==="epiano"?(e=vt,i=qi):(e=bt,i=Gi),!e||!e.loaded)return null;const n=e._buffers;if(!n)return null;const o={};for(const s of Object.keys(i))try{const r=ai(s).toMidi(),a=n.has(r)?n.get(r):n.has(s)?n.get(s):null;a&&typeof a.get=="function"&&a.get()&&(o[s]=a.get())}catch{}return Object.keys(o).length>0?o:null}async function Ln(t="piano"){const e=jn(t);if(e.loaded)return e;try{return await Promise.race([ji(),new Promise((i,n)=>setTimeout(()=>n(new Error("Sample load timeout")),3e3))]),e}catch(i){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,i),null}}function Yi(){return bt||(bt=new he({urls:Gi,baseUrl:Bn,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(Oe())),bt}function Wi(){return vt||(vt=new he({urls:qi,baseUrl:Fn,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(Oe())),vt}function Ki(){return yt||(yt=new he({urls:Hi,baseUrl:Pn,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(Oe())),yt}function Xi(){if(!Ge){const t=Oe();Bt=new Pe({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Ft=new ie({frequency:2800,type:"lowpass",rolloff:-12}),Pt=new pe({decay:1.8,preDelay:.02,wet:.18}),Ge=new he({urls:Ji,baseUrl:Un,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),Ge.connect(Bt),Bt.connect(Ft),Ft.connect(Pt),Pt.connect(t)}return Ge}function zn(){if(!st){const t=Oe();jt=new Ue({frequency:.45,depth:.18,wet:.65}),_t=new ge({distortion:.12,wet:.18}),Vt=new ie({frequency:3400,type:"lowpass",rolloff:-12}),rt=new me({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{rt.start()}catch{}st=new q(Fe,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),st.connect(jt),jt.connect(_t),_t.connect(Vt),Vt.connect(rt),rt.connect(t)}return st}function jn(t){return t==="jazz-guitar"?Xi():t==="guitar"?Ki():t==="rhodes"||t==="epiano"?Wi():Yi()}function _n(t){const e=Oe();switch(t){case"organ":return et||(Ut=new Ue({frequency:5.8,depth:.12,wet:.55}),Rt=new ge({distortion:.08,wet:.15}),Lt=new ie({frequency:4500,type:"lowpass",rolloff:-12}),et=new q(ce,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),et.connect(Ut),Ut.connect(Rt),Rt.connect(Lt),Lt.connect(e)),et;case"pad-strings":if(!it){zt=new pe({decay:5.5,preDelay:.03,wet:.45}),tt=new me({frequency:.45,delayTime:4,depth:.5,wet:.4});try{tt.start()}catch{}it=new q(ce,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),it.connect(tt),tt.connect(zt),zt.connect(e)}return it;case"juno-pad":if(!ot){nt=new me({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{nt.start()}catch{}ot=new q(Fe,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),ot.connect(nt),nt.connect(e)}return ot;case"stab":return at||(Gt=new ge({distortion:.1,wet:.12}),qt=new pe({decay:1,wet:.22}),at=new q(Fe,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),at.connect(Gt),Gt.connect(qt),qt.connect(e)),at;case"bell":return lt||(Ht=new Pe({high:3.5,mid:-.5,low:-2,highFrequency:4800}),Jt=new pe({decay:3.2,wet:.32}),lt=new q(li,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),lt.connect(Ht),Ht.connect(Jt),Jt.connect(e)),lt;case"guitar":return Ki();case"jazz-guitar":return Xi();case"sh101":return zn();case"rhodes":case"epiano":return Wi();case"piano":default:return Yi()}}const ae=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],ki={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function ue(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(ki[e])return ki[e];const i=ae.find(n=>n.name.toLowerCase()===e);return i?i.name:"Grand Piano"}const Ke=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1,isStrum:!0}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],Et={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},fi={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}};function Qi(){return Promise.race([ji(),new Promise(t=>setTimeout(t,80))])}function Zi(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function en(t,e){const i=[];for(let n=0;n<e;n++)for(const o of t){const s=o.match(/^([A-G]#?)(-?\d+)$/);if(s){const r=s[1],a=parseInt(s[2],10)+n;i.push(`${r}${a}`)}else i.push(o)}return i}function tn(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Ni={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function Vn(t){if(!t)return;const e=t.toLowerCase().trim();return Ni[e]?Ni[e]:ae.find(n=>n.name.toLowerCase()===e||n.instrument.toLowerCase()===e)?.name}function Gn(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Ke.find(n=>n.name.toLowerCase()===e)?.name??"Block chords"}function qn(t,e=.7,i,n="piano",o){try{Promise.all([zi(),Qi()]).then(()=>{const s=_n(n);if(o&&typeof o=="object"&&Object.keys(o).length>0)try{typeof s.set=="function"&&s.set(o)}catch(m){console.warn("Failed to apply customConfig to Tone.js instrument:",m)}const r=t.length,a=r<=1?1:Math.max(.4,1/Math.sqrt(r)),c=gi(),p=n==="guitar"||n==="jazz-guitar",h=n==="jazz-guitar";if(i&&i.arpMode&&i.arpMode!=="off"){const m=i.bpm??80,d=i.arpRate??"1/16",u=i.arpRange??1,g=i.arpMode,y=Zi(d,m),b=en(t,u),v=tn(b,g),x=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*a:a,w=(i.isStrum===!0||i.playStyle==="Strum"||d==="1/32")&&(d==="1/32"||i.isStrum===!0),I=typeof i.arpGate=="number"?Math.max(.1,Math.min(2,i.arpGate)):.85,A=1+(Math.random()-.5)*.1*(i.humanVariance??0),F=typeof i.duration=="number"&&i.duration>0?i.duration:e,z=typeof i.spread=="number"&&i.spread>0?Math.min(.045,Math.max(.02,i.spread*.04)):.028,O=w?z:y,$=Math.max(1.4,F)*(1+(Math.random()-.5)*.1*(i.humanVariance??0)),G=Math.max(.04,y*I*A);v.forEach((j,E)=>{const P=i.microTiming?(Math.random()-.5)*i.microTiming*(w?.005:.02):0,H=w?$:G;let J=x();w&&p&&E===0&&(J=Math.min(1,J*(h?1.05:1.1))),s.triggerAttackRelease(j,H,c+E*O+P,J)});return}(p?[...t].sort((m,d)=>{try{return ai(m).toMidi()-ai(d).toMidi()}catch{return 0}}):t).forEach((m,d)=>{let u=0,g=a,y=e;if(i){const{minVelocity:b,maxVelocity:v,spread:x,microTiming:w,humanVariance:I,duration:A}=i;g=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(b+Math.random()*(v-b))/127)*a;const z=p?d*(h?.018:.024):0,O=d*(x??.3)*.1,$=(Math.random()-.5)*(w??0)*.05,G=(Math.random()-.5)*(I??0)*.03;u=Math.max(0,z+O+$+G),y=(A||e)*(1+(Math.random()-.5)*.2*(I??0))}else p&&(u=d*(h?.018:.024));p&&d===0&&(g=Math.min(1,g*(h?1.05:1.1))),s.triggerAttackRelease(m,y,c+u,g)})}).catch(s=>{console.warn("Audio playback gesture failed:",s)})}catch(s){console.warn("Audio playback failed:",s)}}function nn(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const i=[...t],o=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(o){const s=parseInt(o[2],10);i.push(`${o[1]}${s+1}`)}return i}function Ti(t,e,i){const n=e==="Unknown"||!e?"Pop":e,o=i?.instrument?ue(i.instrument):void 0,s=o?ae.find(b=>b.name.toLowerCase()===o.toLowerCase()):void 0,r=i?.playStyle||i?.feelSettings?.playStyle,a=r?Ke.find(b=>b.name===r):void 0,c=s?.instrument??Et[n]??"piano",p=fi[n]||{},h=a?.patch??{};i?.feelSettings?.tone&&qe(i.feelSettings.tone);const l={};if(i?.feelSettings){const{spread:b,swing:v,humanise:x,humanState:w,advOverride:I}=i.feelSettings;if(w)Object.assign(l,w);else if(typeof b=="number"&&(l.spread=parseFloat((b/100).toFixed(2))),typeof x=="number"&&(l.humanVariance=parseFloat((x/100).toFixed(2))),typeof v=="number"||typeof x=="number"){const A=typeof v=="number"?v:0,F=typeof x=="number"?x:45;l.microTiming=parseFloat((A/100*.5+F/100*.3).toFixed(2))}I&&(typeof I.spread=="number"&&(l.spread=I.spread),typeof I.duration=="number"&&(l.duration=I.duration),typeof I.humanVariance=="number"&&(l.humanVariance=I.humanVariance),typeof I.variance=="number"&&(l.humanVariance=I.variance),typeof I.microTiming=="number"&&(l.microTiming=I.microTiming),typeof I.micro=="number"&&(l.microTiming=I.micro),typeof I.arpMode=="string"&&(l.arpMode=I.arpMode),typeof I.arpRate=="string"&&(l.arpRate=I.arpRate),typeof I.arpRange=="number"&&(l.arpRange=I.arpRange),typeof I.arpGate=="number"&&(l.arpGate=I.arpGate),typeof I.minVelocity=="number"&&(l.minVelocity=I.minVelocity),typeof I.maxVelocity=="number"&&(l.maxVelocity=I.maxVelocity))}h.arpMode&&h.arpMode!=="off"&&(i?.feelSettings?.advOverride&&i.feelSettings.advOverride.arpMode!==void 0||(l.arpMode=h.arpMode,h.arpRate&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRate===void 0)&&(l.arpRate=h.arpRate),h.arpRange!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRange===void 0)&&(l.arpRange=h.arpRange))),h.isStrum!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.isStrum===void 0)&&(l.isStrum=h.isStrum);const m={...p,...h,...l,bpm:i?.bpm??p.bpm??90,playStyle:r,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},d=i?.duration??p.duration??.9,u=typeof l.duration=="number"?l.duration:h.durationMultiplier?d*h.durationMultiplier:d,g=i?.feelSettings?.density??50,y=nn(t,g);qn(y,u,m,c,i?.customConfig)}let ei=null;function Hn(){if(!ei){const t=Vi();ei=new ce({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return ei}function Jn(t,e=.8,i,n=.85){try{Promise.all([zi(),Qi()]).then(()=>{const o=Hn(),r=`${t.replace(/\d+$/,"")}1`,a=typeof i=="number"?i:gi();o.triggerAttackRelease(r,e,a,n)}).catch(o=>console.warn("Sub bass audio failed:",o))}catch(o){console.warn("Sub bass audio failed:",o)}}function Yn(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},n=4,o=(Array.isArray(t)?t:[]).filter(p=>typeof p=="string"&&p.trim().length>0).map(p=>p.replace(/\d+$/,""));if(o.length===0)return["C4","E4","G4"];let s=n,r=i[o[0]]??0;const a=[];o.forEach((p,h)=>{const l=i[p]??0;h>0&&l<=r&&s++,a.push({name:p,oct:s}),r=l});const c=(e||"").toLowerCase();if(c.includes("octave")||c.includes("high"))return a.map(p=>`${p.name}${p.oct+1}`);if(c.includes("inversion")||c.includes("1st")){if(a.length>1){const[p,...h]=a;return[...h.map(l=>`${l.name}${l.oct}`),`${p.name}${p.oct+1}`]}return a.map(p=>`${p.name}${p.oct}`)}else return a.map(p=>`${p.name}${p.oct}`)}const Wn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Kn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],B={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Xn=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Je=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ne={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},Qn=Object.keys(ne),wt={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Ye={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},We={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},It={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function M(t,e){const i=(t%12+12)%12;return e?Kn[i]:Wn[i]}function W(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let n="C",o=e;if(i&&/[A-G]/.test(i)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(n=`${i}b`,o=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(n=`${i}#`,o=e.slice(2)):(n=i,o=e.slice(1))}o=o.toLowerCase();let s="maj";return o.includes("maj9")||o.includes("m9")&&o.includes("maj")?s="maj9":o.includes("min9")||o.includes("m9")?s="min9":o.includes("dom9")||o.includes("9sus")||o.includes("9")?o.includes("9sus")||o.includes("sus9")?s="sus9":s="dom9":o.includes("m(maj7)")||o.includes("mmaj7")||o.includes("minmaj7")?s="mmaj7":o.includes("maj7sus")||o.includes("7sus")?s="sus7":o.includes("maj7")||o.includes("m7")&&o.includes("maj")?s="maj7":o.includes("min7")||o.includes("m7")?s="min7":o.includes("min6")||o.includes("m6")?s="min6":o.includes("maj6")||o.includes("6")&&!o.includes("m")?s="maj6":o.includes("dim7")?s="dim7":o.includes("dim")||o.includes("°")?s="dim":o.includes("aug")||o.includes("+")?s="aug":o.includes("sus2")?s="sus2":o.includes("sus4")||o.includes("sus")?s="sus4":o.includes("7")?s="dom7":o.includes("min")||o==="m"?s="min":s="maj",{root:n,quality:s}}const Zn=Object.keys(It),te={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},pt={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},Be={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},Ei={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},on=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],eo={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},to={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},bi={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},be=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Ci(t){return(be.find(e=>e.name===t)||be[0]).dot}const io={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function no(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function Y(t,e){const i=t.reduce((o,s)=>o+e(s),0);let n=Math.random()*i;for(const o of t)if(n-=e(o),n<=0)return o;return t[t.length-1]}function oo(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const ci=4,Xe=1,Le=8,so={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function sn(t,e="MAJOR",i="Pop",n="Uplifting"){let s={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(s*=1.4),t==="SUBTONIC"&&(s*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(s*=1.8),t==="SUBDOMINANT"&&(s*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(s*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(s*=2),t==="SUBMEDIANT"&&(s*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(s*=2.5),t==="SUBDOMINANT"&&(s*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(s*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(s*=2.2),t==="SUBDOMINANT"&&(s*=1.8),t==="SUBMEDIANT"&&(s*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(s*=2.5),n==="Uplifting"||n==="Epic"||n==="Peaceful"?t==="TONIC"&&(s*=2.5):n==="Melancholy"||n==="Dark"?(t==="SUBMEDIANT"&&(s*=2.2),t==="SUPERTONIC"&&(s*=1.5)):n==="Dreamy"||n==="Nostalgic"||n==="Warm"?(t==="SUBDOMINANT"&&(s*=2),t==="SUBMEDIANT"&&(s*=1.6),t==="MEDIANT"&&(s*=1.4)):n==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(s*=1.8):(n==="Groovy"||n==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(s*=1.8),(bi[n]||[]).includes(t)&&(s*=1.3),Math.max(.01,s)}function fe(t,e,i="MAJOR",n="Pop",o="Uplifting"){if(t===e)return .05;let r=(so[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),n==="Jazz-ish"||n==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(n==="House/Dance"||n==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(bi[o]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function ro(t,e,i,n,o,s,r=ci){let a=i.filter(l=>t.degrees[l]);a.length||(a=i);const c=Y(a,l=>sn(l,t.type,o,s))||"TONIC",p=[c];let h=c;for(let l=1;l<r;l++){const m=l===r-1;let d=i.filter(y=>t.degrees[y]);d.length||(d=i);const u=d.filter(y=>y!==h),g=u.length?u:d;if(m){const y=Y(g,b=>{const v=fe(b,p[0],t.type,o,s),x=fe(h,b,t.type,o,s);return v*x});p.push(y)}else{const y=g.filter(x=>!p.includes(x)),b=y.length?y:g,v=Y(b,x=>fe(h,x,t.type,o,s));h=v,p.push(v)}}return p}function Ct(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function V(t,e){const{root:i,quality:n}=W(t),o=B[i]??0,s=ne[n]||ne.maj,r=Ct(i,n,e);return s.map(a=>M(o+a,r))}async function ao(){const t=typeof import.meta<"u"?"./":"/",i=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let n=await fetch(i).catch(()=>null);if((!n||!n.ok)&&(n=await fetch("/chroma_chords_data.json").catch(()=>null)),(!n||!n.ok)&&(n=await fetch("./chroma_chords_data.json").catch(()=>null)),!n||!n.ok)throw new Error(`HTTP error: ${n?n.status:"failed to fetch chroma_chords_data.json"}`);const o=await n.json();return go(o),o}const lo={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},co={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},po={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},ho={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},uo={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},mo={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function go(t){const e=[["MIXOLYDIAN",lo],["DORIAN",co],["LYDIAN",po]];for(const[i,n]of e)for(const[o,s]of Object.entries(n)){const r=t.scales[`${s}_MAJOR`];if(!r)continue;const a=`${o}_${i}`,c={};for(const p of mo[i]){const h=uo[`${i}_${p}`],l=r.degrees[h];if(!l)continue;const m=JSON.parse(JSON.stringify(l));m.next_chord_options=(m.next_chord_options||[]).map(d=>{if(d.nodeId.startsWith(`${s}_MAJOR_`)){const u=d.nodeId.replace(`${s}_MAJOR_`,""),g=ho[`${i}_${u}`];if(g)return{name:d.name,nodeId:`${o}_${i}_${g}`}}return d}),c[p]=m}t.scales[a]={root:o,type:i,degrees:c}}}const fo=[156,192,236],bo=[242,115,95];function xt(t,e,i){return t+(e-t)*i}function ze(t){const e=Math.max(0,Math.min(1,t));return"#"+fo.map((n,o)=>Math.round(xt(n,bo[o],e))).map(n=>n.toString(16).padStart(2,"0")).join("")}function Q(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(xt(84,128,e)),radius:Math.round(xt(40,12,e)),fontSize:Math.round(xt(21,30,e)),color:ze(e)}}function St(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function de(t,e,i,n){const s=i.degrees[e].chord_name,r=We[e]??.5,a=It[i.type]||It.MAJOR;return{name:Ai(s),tag:wt[e]||"move",roman:a[e]||"?",color:ze(r),functionLabel:Ye[e]||e,notes:V(s,n),scaleLabel:`${i.root} ${te[i.type]||i.type}`,desc:St(Ye[e]||e,te[i.type]||i.type,Ai(s)),degree:e,scaleKey:t,tension:r}}function Ai(t){const{root:e,quality:i}=W(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const vo={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function rn(t,e){let i=vo[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function di(t,e,i,n){const o=Math.max(Xe,Math.min(Le,n?.length??ci)),s=eo[e]||"MAJOR",r=to[i],a=n?.scaleType||(r&&s==="MAJOR"?r:s);let c=n?.key&&Je.includes(n.key)?n.key:oo(Je),p=`${c}_${a}`;t.scales[p]||(c="C",p=`${c}_${a}`);let h=t.scales[p];if(!h){const x=Object.keys(t.scales).find(w=>w.endsWith(`_${a}`))||Object.keys(t.scales)[0];h=t.scales[x],c=h?h.root:"C",p=x}const l=R(c,a),m=Object.keys(h.degrees),d=bi[i]||[],u=io[a]||[],g=o===ci?u.filter(x=>x.degrees.every(w=>m.includes(w))):[],v=(g.length&&Math.random()<.25?Y(g,x=>no(x,d)).degrees:ro(h,p,m,d,e,i,o)).map(x=>de(p,x,h,l));return{genre:e,mood:i,key:c,scaleType:a,bpm:rn(e,i),chords:v}}function yo(t,e,i,n=[]){const o=t.chords.length,s=Math.max(Xe,Math.min(Le,e));if(s===o)return{progression:t,cachedTailChords:[...n]};if(s<o){const O=t.chords.slice(0,s),$=t.chords.slice(s);return{progression:{...t,chords:O},cachedTailChords:[...$,...n]}}const r=[...t.chords],a=[...n],c=s-o,p=[];for(;p.length<c&&a.length>0;)p.push(a.shift());const h=[...r,...p],l=s-h.length;if(l<=0)return{progression:{...t,chords:h},cachedTailChords:a};const m=t.key||"C",d=t.scaleType||"MAJOR";let u=`${m}_${d}`,g=i.scales?.[u];if(!g&&i.scales&&Object.keys(i.scales).length>0){const O=Object.keys(i.scales).find($=>$.endsWith(`_${d}`))||Object.keys(i.scales)[0];g=i.scales[O],u=O}if(!g)return{progression:{...t,chords:h},cachedTailChords:a};const y=R(g.root||m,d),b=Object.keys(g.degrees);let v=b.filter(O=>g.degrees[O]);v.length||(v=b);const x=O=>{if(!O)return"TONIC";if(O.degree&&g.degrees[O.degree])return O.degree;for(const[$,G]of Object.entries(g.degrees))if(G.chord_name===O.name)return $;return"TONIC"},w=h[h.length-1];let I=x(w);const A=h[0],F=x(A),z=[];for(let O=0;O<l;O++){const $=O===l-1,G=v.filter(P=>P!==I),j=G.length?G:v;let E;$?E=Y(j,P=>{const H=fe(P,F,g.type,t.genre,t.mood),J=fe(I,P,g.type,t.genre,t.mood);return H*J})||j[0]:E=Y(j,P=>fe(I,P,g.type,t.genre,t.mood))||j[0],I=E,z.push(de(u,E,g,y))}return{progression:{...t,chords:[...h,...z]},cachedTailChords:a}}const xo={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},wo={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function an(t){return ne[t]?t:W(`C${t||""}`).quality}function vi(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function kt(t,e){const i=xo[t]||{upper:"I",lower:"i"},o=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return vi(o,e)}function At(t,e){const i=wo[(t%12+12)%12]||{upper:"?",lower:"?"},o=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return vi(o,e)}function Io(t,e,i,n){const o=e==="maj"||e==="dom7"||e==="dom9",s=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&o)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&o)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&o)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&s)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=We[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${n.root} ${te[n.type]||n.type} progression.`}}function Ot(t,e,i,n){const o=(t%12+12)%12,s=(B[i]??0)+o,a=`${M(s,n)}${yi[e]??e}`;return o===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${a} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:o===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${a} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:o===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${a} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:o===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${a} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${a} borrows its color from outside the current key.`}}function So(t,e,i,n,o){const s=i.degrees[e],{root:r}=W(s.chord_name),a=B[r]??0,c=M(a,o),p=`${c}${yi[n]??n}`,h=Ct(c,n,o),l=ne[n]?ne[n].map(u=>M(a+u,h)):V(s.chord_name,o),m=kt(e,n),d=Io(e,n,p,i);return{name:p,tag:d.tag,roman:m,color:ze(d.tension),functionLabel:d.functionLabel,notes:l,scaleLabel:`${i.root} ${te[i.type]||i.type}`,desc:d.desc,degree:e,scaleKey:t,tension:d.tension}}function ko(t,e,i,n,o,s){const r=`${e}_${i}`,a=t.scales[r];if(!a||!n.length)return null;const c=R(e,i),p=B[e]??0,h={};Object.entries(a.degrees).forEach(([m,d])=>{const{root:u}=W(d.chord_name),g=B[u]??0;g in h||(h[g]=m)});const l=n.slice(0,Le).map(({root:m,quality:d})=>{const u=B[m]??p,g=h[u],y=an(d);if(g){const w=a.degrees[g],{quality:I}=W(w.chord_name);return y===I||!d&&I?de(r,g,a,c):So(r,g,a,y,c)}const b=(u-p+12)%12,v=Ot(b,y,e,c),x=At(b,y);return No(e,b,y,v.functionLabel,x,v.tag,c)});return l.length<Xe?null:{genre:o,mood:s,key:e,scaleType:i,bpm:rn(o,s),chords:l}}const yi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function No(t,e,i,n,o,s,r){const a=(B[t]??0)+e,c=M(a,r),p=an(i),h=`${c}${yi[p]??p}`,l=Ct(c,p,r),m=(ne[p]||ne.maj).map(g=>M(a+g,l)),d=o==="?"?At(e,p):o,u=.42;return{name:h,tag:s,roman:d,color:ze(u),functionLabel:n==="Borrowed"?Ot(e,p,t,r).functionLabel:n,notes:m,scaleLabel:"Borrowed",desc:`${h} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:u}}function pi(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}function To(t){const e=(t||"C").trim(),i=e[0]?.toUpperCase()||"C";let n=i,o=e.slice(1);if(e.length>1){const s=e[1];s==="b"||s==="B"||s==="♭"||s==="♭"?(n=`${i}b`,o=e.slice(2)):(s==="#"||s==="♯"||s==="♯")&&(n=`${i}#`,o=e.slice(2))}return{root:n,suffix:o}}function Eo(t,e,i){const{root:n,suffix:o}=To(t),s=n.replace("♭","b").replace("♯","#"),a=(((B[s]??0)+e)%12+12)%12;return`${M(a,i)}${o}`}function Oi(t,e,i){if(!t||!t.chords||t.chords.length===0)return t;const n=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),o=/\bmaj\b|major/i.test(e),s=n&&!o,r=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),a=i||(s?"NATURAL_MINOR":o?"MAJOR":t.scaleType||"MAJOR"),c=r,p=(t.key||"C").replace("♭","b").replace("♯","#").trim(),h=B[p]??0,l=B[c]??0,m=((l-h)%12+12)%12,d=R(c,a),u=`${c}_${a}`,g=Be[a]||Be.MAJOR,y=t.chords.map(b=>{const v=Eo(b.name,m,d),{root:x,quality:w}=W(v),A=(((B[x]??0)-l)%12+12)%12;let F=null;for(const[P,H]of Object.entries(g))if(H===A){F=P;break}let z,O,$=b.tag||"move",G=b.tension,j=b.degree;if(F)j=F,z=kt(j,w),O=Ye[j]||j,$=wt[j]||$,G=We[j]??G;else{j="BORROWED",z=At(A,w);const P=Ot(A,w,c,d);O=P.functionLabel,$=P.tag||$,G=P.tension||.45}const E=V(v,d);return{...b,name:v,roman:z,functionLabel:O,tag:$,notes:E,degree:j,scaleKey:u,scaleLabel:`${c} ${te[a]||a}`,desc:St(O,te[a]||a,v),tension:G}});return{...t,key:c,scaleType:a,chords:y}}function Co(t,e,i,n){if(t==="sus4"||t==="sus2"||t==="sus7"||t==="sus9")return t;const o=t.includes("7"),s=t.includes("9"),r=t.includes("6");return e==="min"?s?"min9":o?i==="TONIC"&&(n==="HARMONIC_MINOR"||n==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":r?"min6":"min":e==="maj"?s?i==="DOMINANT"?"dom9":"maj9":o?i==="DOMINANT"?"dom7":"maj7":r?"maj6":"maj":e==="dim"?o?"dim7":"dim":e==="aug"?"aug":e}function Ao(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;default:return`${t}${e}`}}function Oo(t,e){if(!t||!t.chords||t.chords.length===0)return t;const i=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=(e||i).toUpperCase().replace(/\s+/g,"_"),o=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),s=B[o]??0,r=R(o,n),a=`${o}_${n}`,c=pt[i]||pt.MAJOR,p=Be[i]||Be.MAJOR,h=pt[n]||pt.MAJOR,l=Be[n]||Be.MAJOR,m=Ei[n]||Ei.MAJOR,d=t.chords.map(u=>{const{root:g,quality:y}=W(u.name),v=(((B[g]??0)-s)%12+12)%12;let x=-1;if(u.degree&&u.degree!=="BORROWED"&&(x=c.indexOf(u.degree)),x===-1)for(let w=0;w<c.length;w++){const I=c[w];if(p[I]===v){x=w;break}}if(x>=0&&x<h.length){const w=h[x],I=l[w],A=(s+I)%12,F=M(A,r),z=m[w]||"maj",O=Co(y,z,w,n),$=Ao(F,O),G=V($,r),j=It[n]?.[w];let E;if(j)if(O==="maj"||O==="min")E=j;else{const Ve=j.replace(/[°+]/g,"");E=vi(Ve,O)}else E=kt(w,O);const P=Ye[w]||w,H=wt[w]||u.tag||"move",J=We[w]??u.tension;return{...u,name:$,roman:E,functionLabel:P,tag:H,notes:G,degree:w,scaleKey:a,scaleLabel:`${o} ${te[n]||n}`,desc:St(P,te[n]||n,$),tension:J}}else{let w=null;for(const[I,A]of Object.entries(l))if(A===v){w=I;break}if(w){const I=kt(w,y),A=Ye[w]||w,F=wt[w]||u.tag||"move",z=We[w]??u.tension,O=V(u.name,r);return{...u,roman:I,functionLabel:A,tag:F,notes:O,degree:w,scaleKey:a,scaleLabel:`${o} ${te[n]||n}`,desc:St(A,te[n]||n,u.name),tension:z}}else{const I=At(v,y),A=Ot(v,y,o,r),F=V(u.name,r);return{...u,roman:I,functionLabel:A.functionLabel,tag:A.tag||u.tag,tension:A.tension||.45,notes:F,degree:"BORROWED",scaleKey:a,scaleLabel:"Borrowed",desc:`${u.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:n,chords:d}}const Mi={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function ln(t,e,i,n){const o=B[t]??0;let s=Mi[e]||Mi.Major;return i==="6th"?s=[...s,9]:i==="7th (dom / m7)"?s=[...s,10]:i==="Major 7th (M7)"?s=[...s,11]:i==="9th"&&(s=[...s,10,14]),s.map(r=>M(o+r,n))}const Mo={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},$o={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function cn(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Mo[e]??""}${$o[i]??""}`}const Do={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},dn={};Je.forEach(t=>{dn[B[t]]=t});function Bo(t,e){const i=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=Do[i]??0,s=(((B[t]??0)-n)%12+12)%12;return dn[s]??"C"}function R(t,e){const i=Bo(t,e);return Xn.has(i)||i.includes("b")}function ti(t,e,i){const n=pi(t.name),o=n.includes("b"),s=cn(n,e,i),r=ln(n,e,i,o);let a=t.roman||"";if(a){const h=a.match(/^([♭♯b#]*)([ivxIVX]+)/);if(h){const l=h[1],m=h[2],d=e==="Minor"||e==="Diminished",u=d?m.toLowerCase():m.toUpperCase();let g="";e==="Diminished"?g=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?g="sus4":i==="6th"?g="6":i==="7th (dom / m7)"?g="7":i==="Major 7th (M7)"?g=d?"m(maj7)":"maj7":i==="9th"&&(g=d?"m9":"maj9"),a=`${l}${u}${g}`}}const c=t.initialChord?.tension??t.tension??.1,p=t.initialChord?.color??t.color??ze(c);return{...t,name:s,notes:r,roman:a,tension:c,color:p}}function _(t,e,i,n,o,s,r,a){const c=cn(t,e,i),p=ln(t,e,i,a);return{name:c,tag:n||"sub",roman:n,color:ze(r),functionLabel:o,notes:p,scaleLabel:"Substitution",desc:s,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function $i(t,e,i){const n=B[e.key]??0,o=e.scaleType.includes("MINOR"),s=R(e.key,e.scaleType),r=o?[(()=>{const h=M(n+1,!0),l=_(h,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:l.name,roman:"♭II",notes:l.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:l,tension:.6}})(),(()=>{const h=M(n+5,!0),l=_(h,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — deeper minor mood",chord:l,tension:.45}})(),(()=>{const h=M(n+10,!0),l=_(h,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:l.name,roman:"v",notes:l.notes,sub:"a step further into shadow — unresolving drift",chord:l,tension:.52}})()]:[(()=>{const h=M(n+8,!0),l=_(h,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:l.name,roman:"♭VI",notes:l.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:l,tension:.5}})(),(()=>{const h=M(n+5,!0),l=_(h,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:l.name,roman:"iv",notes:l.notes,sub:"the minor subdominant — softer, sadder",chord:l,tension:.42}})(),(()=>{const h=M(n+3,!0),l=_(h,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:l.name,roman:"♭III",notes:l.notes,sub:"a step further out — cooler, more remote",chord:l,tension:.58}})()],a=[(()=>{const h=M(n+7,s),l=M(n+2,s),m=_(l,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${h}7 — sharpens the approach`,.82,s);return{name:m.name,roman:"V7/V",notes:m.notes,sub:`aimed at ${h}7 — sharpens the approach`,chord:m,tension:.82}})(),(()=>{const h=M(n+(o?3:9),s),l=M(n+4,s),m=_(l,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${h}m7 — makes it feel arrived at`,.88,s);return{name:m.name,roman:"V7/vi",notes:m.notes,sub:`aimed at ${h}m7 — makes it feel arrived at`,chord:m,tension:.88}})(),(()=>{const h=M(n+1,!0),l=_(h,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:l.name,roman:"subV7",notes:l.notes,sub:"a tritone substitute — slides in sideways",chord:l,tension:.95}})()],c=[(()=>{const h=M(n+5,s),l=_(h,"Major","Major 7th (M7)",o?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,s);return{name:l.name,roman:"IV",notes:l.notes,sub:"floats rather than resolving",chord:l,tension:.3}})(),(()=>{const h=M(n,s),l=_(h,o?"Minor":"Major","9th",o?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,s);return{name:l.name,roman:o?"im9":"Imaj9",notes:l.notes,sub:"the same home with more air in it",chord:l,tension:.18}})(),(()=>{const h=M(n+(o?3:4),s),l=_(h,o?"Major":"Minor","7th (dom / m7)",o?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,s);return{name:l.name,roman:o?"♭III":"iii",notes:l.notes,sub:"wistful, halfway between home and away",chord:l,tension:.35}})()],p=[(()=>{const h=M(n,s),l=_(h,o?"Minor":"Major",o?"None":"Major 7th (M7)",o?"i":"I","Tonic","full resolution — the sense of arriving",.05,s);return{name:l.name,roman:o?"i":"I",notes:l.notes,sub:"full resolution — the sense of arriving",chord:l,tension:.05}})(),(()=>{const h=M(n+7,s),l=_(h,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,s);return{name:l.name,roman:"V7",notes:l.notes,sub:"the pull that makes home feel earned",chord:l,tension:1}})(),(()=>{const h=M(n+(o?8:9),s),l=_(h,o?"Major":"Minor","7th (dom / m7)",o?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,s);return{name:l.name,roman:o?"♭VI":"vi",notes:l.notes,sub:"a soft landing instead of a full stop",chord:l,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:a},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:c},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:p}]}function hi(t,e,i){const n=B[e.key]??0,o=e.scaleType.includes("MINOR"),s=R(e.key,e.scaleType),r=e.chords;if(o){const g=r[0]?.name||"chord 1",y=r[1]?.name||"chord 2",b=r[2]?.name||"chord 3",v=r[3]?.name||"chord 4",x=_(M(n,s),"Major","None","I","Major tonic","same root, turned bright",.2,s),w=_(M(n+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s),I=_(M(n+9,s),"Minor","None","vi","Submediant","melodic lift upward",.4,s),A=_(M(n+11,s),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,s);return[{name:x.name,sub:`in place of ${g} · same root, turned bright`,roman:"I",notes:x.notes,chord:x,tension:.2},{name:w.name,sub:`in place of ${y} · the Dorian lift, sunny and open`,roman:"IV",notes:w.notes,chord:w,tension:.35},{name:I.name,sub:`in place of ${b} · melodic lift upward`,roman:"vi",notes:I.notes,chord:I,tension:.4},{name:A.name,sub:`in place of ${v} · classical harmonic pull`,roman:"vii°",notes:A.notes,chord:A,tension:.55}]}const a=r[0]?.name||"chord 1",c=r[1]?.name||"chord 2",p=r[2]?.name||"chord 3",h=r[3]?.name||"chord 4",l=_(M(n,s),"Minor","None","i","Tonic minor","same root, turned sad",.3,s),m=_(M(n+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),d=_(M(n+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),u=_(M(n+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:l.name,sub:`in place of ${a} · same root, turned sad`,roman:"i",notes:l.notes,chord:l,tension:.3},{name:m.name,sub:`in place of ${c} · the lift, but heavier`,roman:"iv",notes:m.notes,chord:m,tension:.4},{name:d.name,sub:`in place of ${p} · big and cinematic`,roman:"♭VI",notes:d.notes,chord:d,tension:.45},{name:u.name,sub:`in place of ${h} · lands sideways, not home`,roman:"♭VII",notes:u.notes,chord:u,tension:.5}]}const Fo={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Po={m8:43303,circuit:43302};function Uo(t,e,i){let n=Fo[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(n=`http://localhost:${Po[e]}/`);const o=i&&i.length>0?i.map(r=>t.chords[r]).filter(r=>!!r):t.chords,s=o.map(r=>encodeURIComponent(r.name)).join("+");if(e==="circuit"){const r=h=>{const l=(h||"").toLowerCase();return l.includes("octave")||l.includes("high")||l.includes("up")?"octave":l.includes("inversion")||l.includes("1st")?"1st":"root"},a=o.map(h=>r(h.voicing)).join("+"),c=encodeURIComponent(t.key||"C"),p=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${n}?p=${s}&v=${a}&key=${c}&scale=${p}`}return`${n}?p=${s}`}const Ro={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function Lo(t,e){const{root:i,quality:n}=W(t),o=B[i]??0,s=ne[n]||ne.maj,r=Ct(i,n,e);return s.map(a=>{const c=M(o+a,r),p=Ro[a]||{symbol:`+${a}`,name:`Interval ${a}`,isGuideTone:!1};return{note:c,intervalSymbol:p.symbol,roleName:p.name,isGuideTone:p.isGuideTone}})}function zo(t){if(!t||t.length<2)return[];const e=[],i=n=>n.replace(/[^A-Za-z♭♯]/g,"");for(let n=0;n<t.length;n++){const o=n,s=(n+1)%t.length,r=t[o],a=t[s],c=i(r.roman),p=i(a.roman),h=o+1,l=s+1,m=`Bar ${h} → ${l}`,d=`${r.name} → ${a.name}`,u=`${r.roman}–${a.roman}`;(c==="V"||c==="v")&&(p==="I"||p==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name}):(c==="IV"||c==="iv")&&(p==="I"||p==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name}):(c==="V"||c==="v")&&(p==="vi"||p==="♭VI"||p==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name}):c==="♭VII"&&(p==="I"||p==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${a.name} (♭VII–${a.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name}):(p==="V"||p==="v")&&c!=="V"&&c!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${a.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,move:d,degrees:u,bars:m,fromBar:h,toBar:l,fromChord:r.name,toChord:a.name})}return e}function jo(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const n=i,o=(i+1)%t.length,s=t[n],r=t[o],a=new Set(s.notes.map(y=>B[y]??0)),c=r.notes.filter(y=>a.has(B[y]??-1)),p=B[pi(s.name)]??0,h=B[pi(r.name)]??0,l=Math.min((h-p+12)%12,(p-h+12)%12);let m="Harmonic Shift";c.length>=2?m=`Strong Common Tones (${c.length} shared)`:l<=2?m="Stepwise Bass Motion":(l===5||l===7)&&(m="4th / 5th Cycle Jump");const d=`Bar ${n+1} → ${o+1}`,u=`${s.name} → ${r.name}`,g=c.length?`${c.join(" · ")} held over`:l<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:n+1,toBar:o+1,fromChord:s.name,toChord:r.name,move:d,chords:u,link:g,hasShared:c.length>0,commonNotes:c,semitoneDistance:l,motionType:m})}return e}function ui(t,e=4){const i=Array.isArray(t)?t.filter(l=>typeof l=="string"&&l.trim().length>0):[];if(i.length===0)return[];const n={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=i.map(l=>l.replace(/\d+$/,"")),s=o[0],r=n[s]??0;let a=e,c=r;const p=[];return o.forEach((l,m)=>{const d=n[l]??0;m>0&&d<=c&&a++,p.push(`${l}${a}`),c=d}),[`${s}${e-1}`,...p]}class _o{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?(this.order=i||Array.from({length:e.chords.length},(n,o)=>o),this.order.length>0&&(this.activeIndex>=this.order.length&&(this.activeIndex=this.activeIndex%this.order.length),this.progressStep>=this.order.length&&(this.progressStep=this.progressStep%this.order.length))):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const i=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,e)),n=Math.max(1,this.barsPerChord);return Math.round(n*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let n=0;n<this.sections.length;n++){const o=this.sections[n].order.length;if(e<i+o){this.activeSectionIndex=n;const s=e-i;this.activeIndex=this.sections[n].order[s]??0,this.progressStep=s;return}i+=o}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay();const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,n="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:n}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,n=e.progression.chords[i];if(n){const o=n.notes&&n.notes.length>0?n.notes:V(n.name,R(e.progression.key,e.progression.scaleType)),s=ui(o,4),r=i!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[i]?{...this.feelSettings,...this.feelSettings.barFeel[i]}:this.feelSettings;Ti(s,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:r?.playStyle??this.playStyle??void 0,feelSettings:r})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let n=Array.isArray(i.notes)?i.notes:[];if(n.length===0||!n.every(o=>typeof o=="string"&&o.trim().length>0)){const o=i.name||"CMAJ",s=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";n=V(o,R(s,r))}i.voicing?this.playChordNotes(n,1.2,i.voicing):this.playChordNotes(n,1.2),this.subBassEnabled&&n.length>0&&Jn(n[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let n=Array.isArray(e.notes)?e.notes:[];if(n.length===0||!n.every(o=>typeof o=="string"&&o.trim().length>0)){const o=e.name||"CMAJ",s=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";n=V(o,R(s,r))}e.voicing?this.playChordNotes(n,i,e.voicing):this.playChordNotes(n,i)}playChordAtIndex(e,i=.8,n,o){if(!this.progression||!this.progression.chords[e])return;const s=this.progression.chords[e];let r=Array.isArray(s.notes)?s.notes:[];if(r.length===0||!r.every(c=>typeof c=="string"&&c.trim().length>0)){const c=s.name||"CMAJ",p=this.progression.key||"C",h=this.progression.scaleType||"MAJOR";r=V(c,R(p,h))}const a=n||s.voicing;a!==void 0?this.playChordNotes(r,i,a,o):this.playChordNotes(r,i)}playChordNotes(e,i,n,o,s){if(!this.progression)return;const r=Array.isArray(e)?e.filter(h=>typeof h=="string"&&h.trim().length>0):[];if(r.length===0)return;const a=n?Yn(r,n):ui(r,4),c=s!==void 0?s:this.playing?this.order[this.activeIndex]??0:void 0,p=c!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[c]?{...this.feelSettings,...this.feelSettings.barFeel[c]}:this.feelSettings;Ti(a,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:p?.playStyle??this.playStyle??void 0,velocity:o,feelSettings:p})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const k=new _o,Vo=be.map(t=>t.name),Go=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function qo(t,e){const i=t.length+1,n=e.length+1,o=Array.from({length:i},()=>new Array(n).fill(0));for(let s=0;s<i;s++)o[s][0]=s;for(let s=0;s<n;s++)o[0][s]=s;for(let s=1;s<i;s++)for(let r=1;r<n;r++)o[s][r]=t[s-1]===e[r-1]?o[s-1][r-1]:1+Math.min(o[s-1][r-1],o[s-1][r],o[s][r-1]);return o[i-1][n-1]}function Te(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const n=i.toLowerCase(),o=e.find(c=>c.toLowerCase()===n);if(o)return o;let s=null,r=1/0;for(const c of e){const p=qo(n,c.toLowerCase());p<r&&(r=p,s=c)}const a=Math.max(2,Math.floor(n.length*.4));return r<=a?s:null}function Ho(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const n=i,o=Te(n.root,Je),s=Te(n.quality,Qn);o&&s&&e.push({root:o,quality:s})}if(e.length)return e.slice(0,Le)}function Jo(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=Te(e.presetId,Go)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const n=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:n}}function ii(t,e){const i=t&&typeof t=="object"?t:{},n=Te(i.genre,on)??e.genre,o=Te(i.mood,Vo)??e.mood,s=Te(i.key,Je)??void 0,r=Te(i.scaleType,Zn)??void 0,a=s&&r?Ho(i.chords):void 0;let c;typeof i.length=="number"&&Number.isFinite(i.length)&&(c=Math.max(Xe,Math.min(Le,Math.round(i.length))));const p=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,h=Jo(i.instrumentConfig),l=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:n,mood:o,key:s,scaleType:r,length:c,chords:a,rhythmStyle:p,instrumentConfig:h,_rateLimit:l}}const Yo=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Wo="chroma-chords-llm-provider",Ko="chroma-chords-llm-model";function Xo(){const t=localStorage.getItem(Wo);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Qo(){const t=localStorage.getItem(Ko);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:Yo[0].id}const ni={genre:on[0],mood:be[0].name},Zo="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",es=12e3,pn={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},hn={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Nt(t,e){const i=t.toLowerCase();let n=null,o=0;return Object.keys(e).forEach(s=>{const r=e[s].reduce((a,c)=>a+(i.includes(c)?1:0),0);r>o&&(o=r,n=s)}),n}function ts(t){const e=Nt(t,hn),i=Nt(t,pn);return!e||!i?null:{genre:e,mood:i}}async function is(t){const e=new AbortController,i=setTimeout(()=>e.abort(),es);try{const o=await fetch(Zo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Xo(),model:Qo()}),signal:e.signal}),s=await o.json().catch(()=>null);if(!o.ok||s&&typeof s=="object"&&"error"in s){const r=s&&typeof s=="object"&&"error"in s?String(s.error):`HTTP ${o.status}`,a=new Error(`Classifier request failed: ${r}`);throw s&&typeof s=="object"&&"_rateLimit"in s&&(a._rateLimit=s._rateLimit),a}return s}finally{clearTimeout(i)}}async function ns(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const o=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),s=Nt(o,hn)??"Synthwave",r=Nt(o,pn)??"Dreamy",a={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},c={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},p={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},h=p[s]||p._default,l=a[s]||"rhodes",m=c[s]||"slow_arpeggio",d={genre:s,mood:r,key:h.key,scaleType:h.scaleType,length:8,chords:h.chords,rhythmStyle:m,instrumentConfig:{presetId:l,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ii(d,{genre:s,mood:r})}const n=ts(t);try{const o=await is(t);return ii(o,n??ni)}catch(o){console.warn("LLM classification failed, falling back to keyword heuristic:",o);const s=ii(n??ni,ni);return o&&typeof o=="object"&&"_rateLimit"in o&&(s._rateLimit=o._rateLimit),s}}class os{static async resolvePrompt(e,i,n,o,s,r){let a=r||null,c=null,p=null;if(!a&&s&&s.trim().length>0)try{a=await ns(s)}catch(m){console.warn("Failed to classify prompt via LLM/local fallback:",m)}const h=!!(a&&a.chords?.length&&a.key&&a.scaleType);let l=null;return h&&a&&a.chords&&a.key&&a.scaleType&&(l=ko(e,a.key,a.scaleType,a.chords,a.genre||i,a.mood||n)),l||(l=di(e,i,n,{length:o})),h&&a&&(a.instrumentConfig?.presetId&&(c=Vn(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(p=Gn(a.rhythmStyle)??null)),l.chords.length>o&&(l={...l,chords:l.chords.slice(0,o)}),s&&(l={...l,searchTerm:s}),{progression:l,instrument:c,playStyle:p,normalizedSuggestion:a}}}const we=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)}];class re{static createInitialSong(e,i){const n=i||Array.from({length:e.chords.length},(o,s)=>s);return[{name:we[0].name,desc:we[0].desc,progression:e,order:n.slice()}]}static generateSectionProgression(e,i,n,o){const s=e.key,r=e.scaleType||"MAJOR",a=e.genre||"Pop",c=e.mood||"Uplifting",p=e.bpm||120,h=R(s,r),l=`${s}_${r}`,m=e.chords.length||4;let d=o&&o>=2&&o<=8?o:m;i==="Pre-chorus"&&!o&&m>4&&(d=4);const u=n?.scales?n.scales[l]:void 0;let g=[];return u&&Object.keys(u.degrees).length>0?g=this.walkSectionMarkov(u,l,i,a,c,h,d,e,n):g=this.fallbackSectionChords(e,i,d,h),i==="Chorus"&&this.areChordSequencesIdentical(e.chords,g)&&(g=this.shiftChorusVariation(g,u,l,h)),{genre:a,mood:c,key:s,scaleType:r,bpm:p,chords:g}}static walkSectionMarkov(e,i,n,o,s,r,a,c,p){const h=Object.keys(e.degrees),l=this.pickSectionStartDegree(n,e,o,s),m=[l];let d=l;for(let g=1;g<a;g++){const y=g===a-1,b=h.filter(x=>e.degrees[x]&&x!==d),v=b.length?b:h;if(y){const x=Y(v,w=>{let I=fe(d,w,e.type,o,s);return n==="Outro"&&w==="TONIC"?I*=8:n==="Pre-chorus"&&(w==="DOMINANT"||w==="SUBDOMINANT")?I*=6:n==="Chorus"&&(w==="TONIC"||w==="SUBDOMINANT"||w==="DOMINANT")&&(I*=2.5),Math.max(.01,I)});m.push(x)}else{const x=v.filter(A=>!m.includes(A)),w=x.length?x:v,I=Y(w,A=>{let F=fe(d,A,e.type,o,s);return F*=this.getSectionTransitionMultiplier(n,d,A),Math.max(.01,F)});d=I,m.push(I)}}const u=m.map(g=>de(i,g,e,r));if(n==="Bridge"&&u.length>=3&&p)try{const g=hi(p,c,1);if(g&&g.length>0){const y=g.find(b=>b.roman.includes("VI")||b.roman.includes("VII")||b.roman==="iv")||g[0];if(y&&y.chord){const b=Math.min(u.length-2,1);u[b]={...y.chord,desc:y.sub||"Shadow chord borrowed for the bridge detour."}}}}catch{}return u}static pickSectionStartDegree(e,i,n,o){const s=Object.keys(i.degrees),r=a=>!!i.degrees[a];if(e==="Chorus"){const a={SUBDOMINANT:3.5,SUBMEDIANT:3,SUPERTONIC:1.2,TONIC:.5,MEDIANT:.8,DOMINANT:.6};return Y(s,c=>(a[c]||.4)*(r(c)?1:.01))}if(e==="Bridge"){const a={SUBMEDIANT:3.5,MEDIANT:2.5,SUBDOMINANT:2.2,SUPERTONIC:1.5,TONIC:.2};return Y(s,c=>(a[c]||.5)*(r(c)?1:.01))}if(e==="Pre-chorus"){const a={SUPERTONIC:3.2,SUBDOMINANT:2.8,SUBMEDIANT:2,TONIC:.3};return Y(s,c=>(a[c]||.4)*(r(c)?1:.01))}if(e==="Outro"){const a={SUBDOMINANT:2.5,SUBMEDIANT:2,TONIC:2.5};return Y(s,c=>(a[c]||.5)*(r(c)?1:.01))}return Y(s,a=>sn(a,i.type,n,o))}static getSectionTransitionMultiplier(e,i,n){if(e==="Chorus"){if(i==="SUBDOMINANT"&&(n==="DOMINANT"||n==="TONIC"))return 2.2;if(i==="SUBMEDIANT"&&(n==="SUBDOMINANT"||n==="DOMINANT"))return 2;if(i==="DOMINANT"&&(n==="TONIC"||n==="SUBMEDIANT")||i==="TONIC"&&(n==="SUBDOMINANT"||n==="DOMINANT"))return 1.8}else if(e==="Pre-chorus"){if(i==="SUPERTONIC"&&(n==="SUBDOMINANT"||n==="DOMINANT"))return 2.8;if(i==="SUBMEDIANT"&&n==="SUPERTONIC")return 2.2;if(i==="SUBDOMINANT"&&n==="DOMINANT")return 3.2}else if(e==="Bridge"){if(i==="SUBMEDIANT"&&n==="MEDIANT")return 2;if(i==="MEDIANT"&&n==="SUBDOMINANT")return 2.2;if(i==="SUBDOMINANT"&&n==="DOMINANT")return 2}else if(e==="Outro"){if(i==="SUBDOMINANT"&&n==="TONIC")return 2.8;if(i==="SUBMEDIANT"&&n==="SUBDOMINANT")return 2}return 1}static fallbackSectionChords(e,i,n,o){const s=e.chords,r=B[e.key]??0,a=(e.scaleType||"").includes("MINOR");let c=[];if(i==="Chorus")s.length>=4?c=[s[1],s[2],s[3]||s[0],s[0]]:c=[...s].reverse();else if(i==="Bridge"){const h=a?_(M(r+5,o),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,o):_(M(r+8,!0),"Major","None","♭VI","Flat submediant","cinematic shadow detour",.48,!0);s.length>=4?c=[s[3]||s[1],h,s[1]||s[2],s[2]||s[0]]:c=[h,...s]}else i==="Pre-chorus"?s.length>=4?c=[s[1],s[2],s[1],s[2]]:c=s:i==="Outro"?s.length>=4?c=[s[1],s[3]||s[1],s[1],s[0]]:c=s:c=(we.find(m=>m.name===i)||we[1]).reorder(s.length).map(m=>s[m%s.length]);const p=[];for(let h=0;h<n;h++)p.push(c[h%c.length]);return p}static areChordSequencesIdentical(e,i){return e.length!==i.length?!1:e.every((n,o)=>n.name===i[o]?.name)}static shiftChorusVariation(e,i,n,o=!0,s){const r=s||e.length;if(!i||!n)return e;const a=i.degrees.SUBDOMINANT?de(n,"SUBDOMINANT",i,o):null,c=i.degrees.DOMINANT?de(n,"DOMINANT",i,o):null,p=i.degrees.SUBMEDIANT?de(n,"SUBMEDIANT",i,o):null,h=i.degrees.TONIC?de(n,"TONIC",i,o):null;if(a&&c&&p&&h){const l=[a,c,p,h],m=[];for(let d=0;d<r;d++)m.push(l[d%l.length]);return m}return e}static addSection(e,i,n,o){if(e.length>=we.length)return{sections:e,activeIndex:e.length-1};const s=we[e.length],r=this.generateSectionProgression(i,s.name,n,o),a=Array.from({length:r.chords.length},(h,l)=>l),c={name:s.name,desc:s.desc,progression:r,order:a},p=[...e,c];return{sections:p,activeIndex:p.length-1}}static removeSection(e,i){if(e.length<=1||i<0||i>=e.length)return{sections:e,activeIndex:0};const n=e.filter((s,r)=>r!==i),o=Math.min(i,n.length-1);return{sections:n,activeIndex:Math.max(0,o)}}static syncActiveSection(e,i,n,o){if(!e[i])return e;const s=[...e];return s[i]={...s[i],progression:n,order:o.slice()},s}}var ss=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,se=(t,e,i,n)=>{for(var o=n>1?void 0:n?rs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&ss(e,i,o),o};let Z=class extends Ce{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.syncError=null,this.title="Chroma Chords",this.accountMenuOpen=!1,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=D.subscribeProjects(()=>{this.savedCount=D.getProjects().length,this.requestUpdate()}),this.unsubscribeSyncStatus=D.subscribeSyncStatus(t=>{this.syncStatus=t,this.syncError=D.getLastSyncError(),this.requestUpdate()}),this.savedCount=D.getProjects().length,this.syncStatus=D.getSyncStatus(),this.syncError=D.getLastSyncError()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus()}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}renderSyncStatusText(){return this.syncStatus==="synced"?"Synced with cloud":this.syncStatus==="syncing"?"Syncing with cloud...":this.syncStatus==="offline"?"Sync failed (offline)":"Sign in to sync"}render(){const t=this.userEmail?this.userEmail.charAt(0).toUpperCase():"U";return f`
      <div class="header-wrap ${this.compact?"compact":""}">
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="24" height="24" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <div class="right-actions">
          ${this.isAuthenticated?f`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">
              ${t}
              ${this.syncStatus==="offline"?f`<span class="account-badge offline" title="Cloud sync offline"></span>`:""}
              ${this.syncStatus==="syncing"?f`<span class="account-badge syncing" title="Syncing..."></span>`:""}
            </button>
          `:f`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?f`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail||"Signed in"}</div>
                <div class="sync-status-line ${this.syncStatus}">
                  <span class="sync-dot ${this.syncStatus}"></span>
                  <span>${this.renderSyncStatusText()}</span>
                </div>
                ${this.syncStatus==="offline"&&this.syncError?f`
                  <div class="sync-error-detail">${this.syncError}</div>
                `:""}
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
    `}};Z.styles=Ee`
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
      height: 52px;
      padding: 0 16px;
      background: var(--cv-cream, #FBF3E6);
      border-bottom: 1.5px solid rgba(46, 39, 31, 0.12);
      box-sizing: border-box;
      gap: 12px;
    }
    .header-wrap.compact {
      height: 46px;
      padding: 0 12px;
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .brand-title {
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink, #2E271F);
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-wrap.compact .brand-title {
      font-size: 13.5px;
    }
    .right-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
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
      width: 250px;
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
  `;se([C({type:Boolean})],Z.prototype,"compact",2);se([C({type:Boolean})],Z.prototype,"isAdmin",2);se([C({type:Boolean})],Z.prototype,"isAuthenticated",2);se([C({type:String})],Z.prototype,"userEmail",2);se([C({type:Number})],Z.prototype,"savedCount",2);se([C({type:String})],Z.prototype,"syncStatus",2);se([C({type:String})],Z.prototype,"syncError",2);se([C({type:String})],Z.prototype,"title",2);se([S()],Z.prototype,"accountMenuOpen",2);Z=se([Ae("app-header")],Z);function Di(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const n=i[1].charAt(0).toUpperCase()+i[1].slice(1),o=e[n]??0,s=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(s+1)*12+o))}function un(t,e,i,n=1,o){const s=e&&e.length>0?e.map(v=>t.chords[v]).filter(v=>!!v):t.chords,r=t.bpm||120,a=n*240/r,c=i?Ke.find(v=>v.name.toLowerCase()===i.toLowerCase()):void 0,p=fi[t.genre]||{},h=c?.patch??{},l={...p,...h,...o?.humanState??{}},m=p.duration??.9,d=h.durationMultiplier?m*h.durationMultiplier:m,u=o?.humanState?.strum!==void 0?o.humanState.strum/100*1.5:o?.spread!==void 0?o.spread/100*1.5:p.spread??.3,g=o?.humanState?.swing!==void 0?o.humanState.swing:o?.swing??0,y=o?.density??50,b=[];return s.forEach((v,x)=>{const w=g/100*.04*(x%2===1?1:0),I=x*a+w,A=v.notes&&v.notes.length>0?v.notes:["C","E","G"];let F=ui(A,4);if(F=nn(F,y),l.arpMode&&l.arpMode!=="off"){const z=l.arpRate??"1/16",O=l.arpRange??1,$=l.arpMode,G=Zi(z,r),j=en(F,O),E=tn(j,$),P=l.duration?l.duration:Math.max(.6,d);E.forEach((H,J)=>{const Ve=I+J*G;b.push({note:H,midi:Di(H),startTime:Ve,duration:P})})}else{const z=o?.humanState?.instrument||void 0,O=z?ue(z):void 0,$=O?ae.find(E=>E.name.toLowerCase()===O.toLowerCase())?.instrument??"piano":Et[t.genre]??"piano",G=$==="guitar"||$==="jazz-guitar",j=$==="jazz-guitar";F.forEach((E,P)=>{const J=(G?P*(j?.018:.024):0)+P*u*.1,Ve=I+J;b.push({note:E,midi:Di(E),startTime:Ve,duration:G?Math.max(d,1.2):d})})}}),b}function as(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function ls(t,e,i,n=1,o){const s=t.bpm||120,r=480,a=un(t,e,i,n,o),c=[];a.forEach(b=>{const v=Math.round(b.startTime/(60/s)*r),x=Math.max(1,Math.round(b.duration/(60/s)*r));c.push({tick:v,type:"on",midi:b.midi}),c.push({tick:v+x,type:"off",midi:b.midi})}),c.sort((b,v)=>b.tick!==v.tick?b.tick-v.tick:b.type!==v.type?b.type==="off"?-1:1:b.midi-v.midi);const p=[],h=Math.round(6e7/s);p.push(0),p.push(255,81,3),p.push(h>>16&255,h>>8&255,h&255);const l="Chroma Chords";p.push(0),p.push(255,3,l.length);for(let b=0;b<l.length;b++)p.push(l.charCodeAt(b));let m=0;c.forEach(b=>{const v=b.tick-m;m=b.tick,p.push(...as(v)),b.type==="on"?p.push(144,b.midi,80):p.push(128,b.midi,0)}),p.push(0),p.push(255,47,0);const d=[77,84,104,100,0,0,0,6,0,0,0,1,r>>8&255,r&255],u=p.length,g=[77,84,114,107,u>>24&255,u>>16&255,u>>8&255,u&255],y=new Uint8Array(d.length+g.length+p.length);return y.set(d,0),y.set(g,d.length),y.set(p,d.length+g.length),y}function cs(t,e,i,n,o=1,s){const r=ls(t,e,n,o,s),a=new Blob([r],{type:"audio/midi"}),c=(t.key||"C").toLowerCase(),p=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),h=t.bpm||120,l=`chroma-chords-${c}-${p}-${h}bpm.mid`;mn(a,l)}function ds(t,e,i="Warm",n){const o=new _i({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),s=Dn(i,o),r=t?ue(t):void 0;switch((r?ae.find(p=>p.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(e?Et[e]:void 0)??"piano"){case"bell":{const p=new Pe({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(s),h=new pe({decay:3.2,wet:.32}).connect(p);return new q(li,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(h)}case"organ":{const p=new ie({frequency:4500,type:"lowpass",rolloff:-12}).connect(s),h=new ge({distortion:.08,wet:.15}).connect(p),l=new Ue({frequency:5.8,depth:.12,wet:.55}).connect(h);return new q(ce,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(l)}case"pad-strings":{const p=new pe({decay:5.5,preDelay:.03,wet:.45}).connect(s),h=new me({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(p);return new q(ce,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(h)}case"juno-pad":{const p=new me({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(s);return new q(Fe,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(p)}case"stab":{const p=new ge({distortion:.1,wet:.12}).connect(s),h=new pe({decay:1,wet:.22}).connect(p);return new q(Fe,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(h)}case"jazz-guitar":{const p=new Pe({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(s),h=new ie({frequency:2800,type:"lowpass",rolloff:-12}).connect(p),l=new pe({decay:1.8,preDelay:.02,wet:.18}).connect(h);return n&&Object.keys(n).length>0?new he({urls:n,volume:-8}).connect(l):new q(ce,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(l)}case"sh101":{const p=new me({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(s),h=new ie({frequency:3400,type:"lowpass",rolloff:-12}).connect(p),l=new ge({distortion:.12,wet:.18}).connect(h),m=new Ue({frequency:.45,depth:.18,wet:.65}).connect(l);return new q(Fe,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(m)}case"guitar":return n&&Object.keys(n).length>0?new he({urls:n,volume:-8}).connect(s):new q(ce,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(s);case"rhodes":case"epiano":return n&&Object.keys(n).length>0?new he({urls:n,volume:-10}).connect(s):new q(li,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(s);case"piano":default:return n&&Object.keys(n).length>0?new he({urls:n,volume:-9}).connect(s):new q(ce,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(s)}}function ps(t){const e=t.numberOfChannels,i=t.sampleRate,n=16,o=n/8,s=e*o,r=t.length*e*o,a=new ArrayBuffer(44+r),c=new DataView(a),p=(m,d)=>{for(let u=0;u<d.length;u++)c.setUint8(m+u,d.charCodeAt(u))};p(0,"RIFF"),c.setUint32(4,36+r,!0),p(8,"WAVE"),p(12,"fmt "),c.setUint32(16,16,!0),c.setUint16(20,1,!0),c.setUint16(22,e,!0),c.setUint32(24,i,!0),c.setUint32(28,i*s,!0),c.setUint16(32,s,!0),c.setUint16(34,n,!0),p(36,"data"),c.setUint32(40,r,!0);const h=[];for(let m=0;m<e;m++)h.push(t.getChannelData(m));let l=44;for(let m=0;m<t.length;m++)for(let d=0;d<e;d++){const u=Math.max(-1,Math.min(1,h[d][m])),g=u<0?u*32768:u*32767;c.setInt16(l,g,!0),l+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function hs(t,e,i,n,o=1,s){const r=un(t,e,n,o,s);if(!r.length)return;const a=e&&e.length>0?e.map(I=>t.chords[I]).filter(I=>!!I):t.chords,c=t.bpm||120,p=o*240/c,h=Math.max(.1,a.length*p),l=i?ue(i):void 0,d=(l?ae.find(I=>I.name.toLowerCase()===l.toLowerCase()):void 0)?.instrument??(t.genre?Et[t.genre]:void 0)??"piano";await Ln(d);const u=Rn(d),g=s?.tone||"Warm",y=await yn(async()=>{const I=ds(l||i,t.genre,g,u);r.forEach(A=>{A.startTime<h&&I.triggerAttackRelease(A.note,A.duration,A.startTime)})},h),b=ps(y.get()),v=(t.key||"C").toLowerCase(),x=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),w=`chroma-chords-${v}-${x}-${c}bpm.wav`;mn(b,w)}function mn(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const n=document.createElement("a");n.href=i,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var us=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,le=(t,e,i,n)=>{for(var o=n>1?void 0:n?ms(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&us(e,i,o),o};const gs=X`
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
`,fs=X`
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
`,bs=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:gs},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:fs}];let ee=class extends Ce{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=Uo(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{const t=this.barsPerChord||k.getBarsPerChord()||1,e=this.feelSettings||k.getFeelSettings();await hs(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","WAV file downloaded")}catch(t){console.error("WAV export failed",t),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{const t=this.barsPerChord||k.getBarsPerChord()||1,e=this.feelSettings||k.getFeelSettings();cs(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","MIDI file downloaded")}catch(t){console.error("MIDI export failed",t),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return f`
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
            ${bs.map(e=>f`
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
    `}};ee.styles=Ee`
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
  `;le([C({type:Boolean})],ee.prototype,"open",2);le([C({type:Boolean})],ee.prototype,"visible",2);le([C({type:Object})],ee.prototype,"progression",2);le([C({type:Array})],ee.prototype,"order",2);le([C({type:String})],ee.prototype,"instrument",2);le([C({type:String})],ee.prototype,"playStyle",2);le([C({type:Number})],ee.prototype,"barsPerChord",2);le([C({type:Object})],ee.prototype,"feelSettings",2);ee=le([Ae("share-modal")],ee);var vs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,xe=(t,e,i,n)=>{for(var o=n>1?void 0:n?ys(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&vs(e,i,o),o};function xs(t,e,i){return Math.round(t+(e-t)*i)}function gn(t,e,i){const n=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)),o=[1,3,5].map(s=>parseInt(e.slice(s,s+2),16));return"#"+n.map((s,r)=>xs(s,o[r],i).toString(16).padStart(2,"0")).join("")}function ws(t){const e=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*e[0]+.7152*e[1]+.0722*e[2]}function Bi(t){let i=.3,n=t;for(;i<=.86&&(n=gn(t,"#2E271F",i),!((.925+.05)/(ws(n)+.05)>=4.7));i+=.03);return n}let oe=class extends Ce{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC"}onSelectFeel(t){this.activeFeel=t,this.dispatchEvent(new CustomEvent("swap-feel-change",{detail:{feel:t},bubbles:!0,composed:!0}))}onAudition(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onConfirm(){this.dispatchEvent(new CustomEvent("swap-confirm",{bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,i=`calc((100% - ${12*(t-1)}px) / ${t})`,n=this.chord?.tension??.3,o=Q(n).color,s=this.feelings.find(b=>b.name===this.activeFeel)||this.feelings[0],r=Math.max(0,this.feelings.findIndex(b=>b.name===s?.name)),a=Math.max(1,this.feelings.length),c=`calc((100% - ${7*(a-1)}px) / ${a})`,p=r===0,h=r===a-1;let l=`left: calc(${c} * ${r} + ${7*r}px); width: ${c};`,m="12px";p&&h?(l="left: 0; right: 0; width: 100%;",m="0 0 12px 12px"):p?(l=`left: 0; width: ${c};`,m="0 12px 12px 12px"):h&&(l=`left: auto; right: 0; width: ${c};`,m="12px 0 12px 12px");const d=s?.tension??.3,u=Bi(Q(d).color),g=`Bar ${this.swapIndex+1} · ${this.chord?.name||"Chord"} could feel…`,y=this.pickedChord?`hearing swap: ${this.pickedChord.name}`:"tap to audition in the loop";return f`
      <div class="lane-shell" data-swap-lane="1">
        <!-- Neck connecting the active chord pad down to the lane -->
        <div
          class="lane-neck"
          style="
            left: calc(${i} * ${e} + ${12*e}px);
            width: ${i};
            background: ${o};
          "
        ></div>

        <div class="lane-clip">
          <div class="lane-panel" style="background: ${o};">
            <!-- Header bar -->
            <div class="lane-header">
              <div class="lane-kicker">${g}</div>
              <div style="flex: 1; min-width: 0;"></div>
              <div class="lane-hint">${y}</div>
              <button
                class="lane-close-btn"
                @click=${this.onClose}
                aria-label="Close swap lane"
              >×</button>
            </div>

            <!-- Feelings row -->
            <div class="feelings-row">
              ${this.feelings.map(b=>{const v=b.name===s?.name,x=Q(b.tension),w=v?Bi(x.color):gn(x.color,"#FBF6EC",.5);return f`
                  <button
                    class="feel-tile"
                    data-feel-tile="1"
                    data-sel="${v?"1":"0"}"
                    style="
                      background: ${w};
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
                  ${l}
                  background: ${u};
                "
              ></div>

              <div class="chords-box" style="background: ${u}; border-radius: ${m};">
                ${(s?.rows||[]).map(b=>{const v=this.pickedChord?.name===b.name,x=typeof b.tension=="number"?b.tension:d,w=Q(x);return f`
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
                          border-radius: ${Math.round(w.radius*.25)}px;
                          background: ${w.color};
                          flex-shrink: 0;
                        "
                      ></span>
                      <span
                        class="chord-pill-name"
                        style="color: ${v?"#FBF6EC":"#2E271F"};"
                      >${b.name}</span>
                      ${b.roman?f`
                        <span
                          class="chord-pill-roman"
                          style="color: ${v?"rgba(251,246,236,0.7)":"var(--cv-label)"};"
                        >${b.roman}</span>
                      `:""}
                    </button>
                  `})}

                <div style="flex: 1; min-width: 0;"></div>

                ${this.pickedChord?f`
                  <button
                    class="keep-swap-btn"
                    @click=${this.onConfirm}
                    aria-label="Keep ${this.pickedChord.name}"
                  >
                    Keep ${this.pickedChord.name}
                  </button>
                `:f`
                  <div style="font-size: 11px; font-weight: 700; color: #FBF6EC; opacity: 0.85; white-space: nowrap;">
                    tap to hear it in the loop
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};oe.styles=Ee`
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
  `;xe([C({type:Number})],oe.prototype,"swapIndex",2);xe([C({type:Object})],oe.prototype,"chord",2);xe([C({type:Array})],oe.prototype,"feelings",2);xe([C({type:String})],oe.prototype,"activeFeel",2);xe([C({type:Object})],oe.prototype,"pickedChord",2);xe([C({type:Number})],oe.prototype,"padCols",2);xe([C({type:String})],oe.prototype,"moodColor",2);oe=xe([Ae("chord-swap-lane")],oe);var Is=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,je=(t,e,i,n)=>{for(var o=n>1?void 0:n?Ss(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Is(e,i,o),o};let ve=class extends Ce{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const i=(this.chordIndex%e.length+e.length)%e.length;return e[i]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const i=this.getCurrentFeel(),n=this.getCurrentRow();n&&this.emitAudition(n,i),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const i=this.getCurrentFeel(),n=this.getCurrentRow();n&&this.emitAudition(n,i),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),i=e.rows;if(!i||i.length===0)return;this.chordIndex=(this.chordIndex+1)%i.length;const n=this.getCurrentRow();n&&this.emitAudition(n,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),i=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:i.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),i=t.rows?t.rows.length:0,n=i>0?this.chordIndex%i+1:0,o=Q(t.tension);return f`
      <div class="cycler-was">was ${this.originalChord?.name||"Chord"}</div>

      <div class="cycler-feel-header">
        <div
          style="
            width: 14px;
            height: 14px;
            border-radius: ${Math.round(o.radius*.3)}px;
            background: ${o.color};
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
          ${this.feelings.map((s,r)=>f`
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

      ${e?f`
        <button
          class="cycler-chord-btn"
          @click=${this.onCycleChord}
          @pointerdown=${s=>s.stopPropagation()}
          aria-label="Next chord for this feeling"
        >
          <div class="chord-top-row">
            <span class="chord-main-name">${e.name}</span>
            <span class="chord-count-hint">${n} of ${i} ↻</span>
          </div>
          <div class="chord-meta-row">
            ${e.roman?f`<span class="chord-roman">${e.roman}</span>`:""}
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
    `}};ve.styles=Ee`
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
  `;je([C({type:Object})],ve.prototype,"originalChord",2);je([C({type:Number})],ve.prototype,"barIndex",2);je([C({type:Array})],ve.prototype,"feelings",2);je([C({type:Number})],ve.prototype,"feelIndex",2);je([C({type:Number})],ve.prototype,"chordIndex",2);ve=je([Ae("chord-pad-cycler")],ve);var ks=Object.defineProperty,Ns=Object.getOwnPropertyDescriptor,T=(t,e,i,n)=>{for(var o=n>1?void 0:n?Ns(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&ks(e,i,o),o};const ht=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],Fi=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"];be.map(t=>t.name);Object.fromEntries(be.map(t=>[t.name,t.iconPath]));const Ie={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},Ts=Ie,oi=["A","S","D","F","Z","X","C","V"],Es=["Octave up","1st inversion","Low root"];function Pi(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const Cs=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],As=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],si=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],K={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},Os=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Ui=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],ut=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],ri={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},mt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},Ri=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Li={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},gt={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ft={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},mi={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},He={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Ms(t){const e=t===""?"maj":t;if(He[5][e]||He[6][e])return e;const i=mi[e];return i&&(He[5][i]||He[6][i])?i:"maj"}function $s(t){const e=Ms(t.q),i=[];return[[6,4],[5,9]].forEach(([n,o])=>{const s=He[n][e];if(!s)return;const r=((t.rootPc-o)%12+12)%12;i.push({rootFret:r,frets:s.map(a=>a===null?null:a+r)})}),i.length?(i.sort((n,o)=>n.rootFret-o.rootFret),i[0].frets):null}function Ds(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),n=r=>{const a=new Set(r);let c=null;const p=[],h=l=>{if(l===4){const m=p.map((y,b)=>(e[b]+y)%12);for(const y of a)if(m.indexOf(y)<0)return;for(const y of m)if(!a.has(y))return;const d=p.filter(y=>y>0),u=d.length?Math.max(...d)-Math.min(...d):0;if(u>3)return;const g=u*12+p.reduce((y,b)=>y+b,0);(!c||g<c.score)&&(c={frets:p.slice(),score:g});return}for(let m=0;m<=5;m++)p.push(m),h(l+1),p.pop()};return h(0),c},o=n(i);if(o)return o.frets;const s=n(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return s?s.frets:null}let N=class extends Ce{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle="Block chords",this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.humanise=45,this.tone="Warm",this.feelScope="loop",this.barFeel={},this.advOverride={},this.advOpen=!1,this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{if(t.key==="Escape"&&(this.vibeOpen||this.tempoOpen||this.feelOpen)){t.preventDefault(),this.vibeOpen=!1,this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate();return}if(this.isEditableTarget(t))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.ctrlKey||t.metaKey||t.altKey)return;const e=oi.map(n=>n.toLowerCase()).indexOf((t.key||"").toLowerCase()),i=this.progression?.chords||[];if(e>=0&&e<i.length){t.preventDefault();const n=88+e%3*6,o=i[e],s=this.getLadderHome(o),r=o.voicing||"1st inversion",a=Pi(r),c=this.progression?.key||"C",p=this.progression?.scaleType||"MAJOR",h=o.notes&&o.notes.length?o.notes:V(o.name,R(c,p));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const l=a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:r,vel:n,zone:a,reach:s,meta:l},k.playChordNotes(h,.85,r,n),this.requestUpdate()}},this.handleKeyUp=t=>{if(this.isEditableTarget(t)||t.ctrlKey||t.metaKey||t.altKey)return;oi.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.setLibraryOpen=t=>{this.libraryOpen=t,this.dispatchEvent(new CustomEvent("library-open-change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrary=()=>{this.setLibraryOpen(!this.libraryOpen)},this.toggleLibrarySelectMode=()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelectMode||(this.librarySelected=[]),this.requestUpdate()},this.toggleSelectLoop=t=>{this.librarySelected.includes(t)?this.librarySelected=this.librarySelected.filter(e=>e!==t):this.librarySelected=[...this.librarySelected,t],this.requestUpdate()},this.toggleSelectAllVisible=()=>{const t=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(o=>!t||(o.name+" "+o.genre+" "+o.mood).toLowerCase().includes(t)).map(o=>o.id);if(i.length>0&&i.every(o=>this.librarySelected.includes(o)))this.librarySelected=this.librarySelected.filter(o=>!i.includes(o));else{const o=new Set([...this.librarySelected,...i]);this.librarySelected=Array.from(o)}this.requestUpdate()},this.deleteSelectedLoops=()=>{const t=[...this.librarySelected];if(!t.length)return;const e=t.length;for(const i of t)D.deleteProject(i),this.dispatchEvent(new CustomEvent("delete-project",{detail:i,bubbles:!0,composed:!0}));this.savedSets=D.getProjects(),this.librarySelected=[],this.savedSets.length||(this.librarySelectMode=!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Deleted ${e} loop${e>1?"s":""}`,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,k.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=R(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:V(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];k.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),k.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=R(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:V(this.abPick.chord,t),i=[...this.progression.chords],n=i[this.swapIndex],o=n.initialChord||{...n};i[this.swapIndex]={...n,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:o};const s={...this.progression,chords:i};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),k.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>Xe&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<Le&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onSetLength=t=>{(this.progression?.chords.length||4)!==t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t,bubbles:!0,composed:!0}))},this.onReroll=()=>{this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.requestUpdate()},this.onParameterOverride=t=>{const{param:e,value:i}=t.detail;this.advOverride={...this.advOverride,[e]:i},k.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onParameterRelink=t=>{const{param:e}=t.detail,i={...this.advOverride};delete i[e],this.advOverride=i,k.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,k.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,k.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=D.getProjects(),this.unsubscribeProjects=typeof D.subscribeProjects=="function"?D.subscribeProjects(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):typeof D.subscribe=="function"?D.subscribe(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):null,k.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride}),k.setBarsPerChord(this.barsPerChord),qe(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("humanise")||t.has("playStyle")||t.has("tone")||t.has("barFeel")||t.has("advOverride")||t.has("humanEngineState"))&&(k.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:this.humanEngineState}),t.has("playStyle")&&k.setPlayStyle(this.playStyle),t.has("tone")&&qe(this.tone)),t.has("barsPerChord")&&k.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}isEditableTarget(t){const e=o=>{if(!o||typeof o!="object")return!1;const s=o,r=(s.tagName||"").toUpperCase();return r==="INPUT"||r==="TEXTAREA"||r==="SELECT"||!!s.isContentEditable},i=typeof t.composedPath=="function"?t.composedPath():[t.target];for(const o of i)if(e(o))return!0;let n=typeof document<"u"?document.activeElement:null;for(;n&&n.shadowRoot&&n.shadowRoot.activeElement;)n=n.shadowRoot.activeElement;return!!e(n)}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){this.selectedBand===t?this.selectedBand=null:this.selectedBand=t;const e=ht.find(i=>i.name===this.selectedBand);e&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:e},bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t*4,k.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(o=>i+o)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const i=this.progression?.chords,n=i?i[e]:null;if(!n)return;let o=n.voicing||"1st inversion",s=Pi(o),r;const a=this.getChordLadder(n),c=this.getLadderHome(n);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const y=t.currentTarget.getBoundingClientRect(),b=Math.min(.999,Math.max(0,(t.clientX-y.left)/(y.width||1))),v=Math.min(.999,Math.max(0,(t.clientY-y.top)/(y.height||1)));v<.34?(s=0,o="up an octave"):v>.67?(s=2,o="low, root position"):(s=1,o="1st inversion"),a.length>0&&(r=Math.min(a.length-1,Math.floor(b*a.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const p=r!==void 0&&a[r]?a[r]:n.name,h=r!==void 0&&r!==c&&!!a[r],l=this.progression?.key||"C",m=this.progression?.scaleType||"MAJOR",d=V(p,R(l,m)),u=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const g=h?"→ "+p:s===0?"UP AN OCTAVE":s===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:o,vel:u,zone:s,reach:r,meta:g},k.playChordNotes(d,.85,o,u),this.pendingLatch={index:e,reach:r,voicing:o,targetChordName:p},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords,n=i?i[e]:null;if(n&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const o=t.currentTarget.getBoundingClientRect(),s=Math.min(.999,Math.max(0,(t.clientX-o.left)/(o.width||1))),r=Math.min(.999,Math.max(0,(t.clientY-o.top)/(o.height||1)));let a=1,c="1st inversion";r<.34?(a=0,c="up an octave"):r>.67&&(a=2,c="low, root position");const p=this.getChordLadder(n),h=this.getLadderHome(n),l=p.length>0?Math.min(p.length-1,Math.floor(s*p.length)):void 0,m=l!==void 0&&p[l]?p[l]:n.name,d=l!==void 0&&l!==h&&!!p[l];if(this.pendingLatch?.reach!==l||this.pendingLatch?.voicing!==c){this.pendingLatch={index:e,reach:l,voicing:c,targetChordName:m};const u=this.progression?.key||"C",g=this.progression?.scaleType||"MAJOR",y=V(m,R(u,g)),b=88+e%3*6,v=d?"→ "+m:a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:c,vel:b,zone:a,reach:l,meta:v},k.playChordNotes(y,.65,c,b),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:i,voicing:n,targetChordName:o}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const s=this.progression.chords[e],r=this.getChordLadder(s),a=this.getLadderHome(s),c=s.voicing||"1st inversion",p=i!==void 0&&i!==a&&!!r[i]&&!!o;if(p||!!n&&n!==c){const l=s.initialChord||{...s};let m;if(p&&o){const g=this.getChordQualityLabel(s.name),y=this.getChordExtensionLabel(o),b=this.progression.key||"C",v=this.progression.scaleType||"MAJOR";m=ti(s,g,y),m.name=o,m.notes=V(o,R(b,v))}else m={...s};n&&(m.voicing=n),m.name===l.name&&(!l.voicing||m.voicing===l.voicing)?delete m.initialChord:m.initialChord=l;const d=[...this.progression.chords];d[e]=m;const u={...this.progression,chords:d};this.progression=u,this.dispatchEvent(new CustomEvent("progression-change",{detail:u,bubbles:!0,composed:!0})),k.setProgression(u,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",k.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=$i(this.chordData,this.progression),n=hi(this.chordData,this.progression),o=i.map(a=>({name:a.name,sub:mt[a.name]?mt[a.name][this.showTheory?1:0]:a.sub||"",tension:a.tension,rows:a.rows.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))}));o.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:n.map(a=>({name:a.name,roman:a.roman||"",notes:a.notes||a.chord?.notes,sub:a.sub,tension:a.tension,chord:a.chord}))});const s=o.filter(a=>a.name!=="Borrowed").sort((a,c)=>a.tension-c.tension),r=o.filter(a=>a.name==="Borrowed");return[...s,...r]}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],i=R(this.progression.key,this.progression.scaleType),n=t.notes&&t.notes.length?t.notes:V(t.chordName,i)||e.notes,o=t.chord?{...t.chord,name:t.chordName,notes:n,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:n,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:n,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,k.auditionChord(o,.8),k.setABOverride({index:this.swapIndex,side:"after",chord:o}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?R(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:V(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&k.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),k.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=R(this.progression.key,this.progression.scaleType),i=V(t,e);k.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=R(this.progression.key,this.progression.scaleType);if(t==="before")k.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),k.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=V(this.abPick.chord,e),n={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};k.setABOverride({index:this.swapIndex,side:"after",chord:n}),k.auditionChord(n,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=R(this.progression.key,this.progression.scaleType),n={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:V(this.abPick.chord,i)};k.auditionChord(n,.8)}else k.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const n=this.getChordExtensionLabel(i.name),o=ti(i,t,n);e[this.detailIndex]=o;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),k.auditionChord(o,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${o.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const n=this.getChordQualityLabel(i.name),o=ti(i,n,t);e[this.detailIndex]=o;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),k.auditionChord(o,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${o.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(a=>e[a.replace(/\d+$/,"")]??-1)),n=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],o=100/7,s=o*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return f`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${n.map(a=>{const c=i.has(a.pc);return f`<div class="white-key ${c?"active":""}">${a.note}</div>`})}
        </div>
        ${r.map(a=>{const c=(a.after+1)*o-s/2,p=i.has(a.pc);return f`<div class="black-key ${p?"active":""}" style="left: ${c}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.playStyle!==K.playStyle||this.swing!==K.swing||this.spread!==K.spread||this.density!==K.density||this.humanise!==K.humanise||this.tone!==K.tone||Object.keys(this.barFeel).length>0||Object.keys(this.advOverride).length>0}resetFeel(){this.playStyle=K.playStyle,this.swing=K.swing,this.spread=K.spread,this.density=K.density,this.humanise=K.humanise,this.tone=K.tone,this.barFeel={},this.advOverride={},this.humanEngineState=null,k.setPlayStyle(this.playStyle),k.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:{},advOverride:{},humanState:void 0}),qe(this.tone),this.requestUpdate()}get fScopeBar(){return typeof this.feelScope=="number"?this.feelScope:null}fget(t){const e=this.fScopeBar;return e!==null&&this.barFeel[e]&&this.barFeel[e][t]!==void 0?this.barFeel[e][t]:this[t]}fset(t,e){const i=this.fScopeBar;if(i===null)this[t]=e,t==="playStyle"?(k.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-play-style",{detail:e,bubbles:!0,composed:!0}))):t==="tone"?(k.setFeelSettings({tone:e}),qe(e)):k.setFeelSettings({[t]:e});else{const n={...this.barFeel};n[i]={...n[i]||{},[t]:e},this.barFeel=n,k.setFeelSettings({barFeel:n})}this.requestUpdate()}getPatternShortName(t){const e=t||this.fget("playStyle")||this.playStyle||"Block chords",i=si[0].steps.find(n=>n.v===e);return i?i.name:"Block"}get feelChipLabel(){return`Feel · ${this.getPatternShortName()}`}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle")||this.playStyle||"Block chords",n=Ke.find(r=>r.name===e)?.patch??{},o=this.progression?.genre??"Pop",s=fi[o]??{};return{spread:+(t("spread")/100).toFixed(2),duration:+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),humanVariance:+(t("humanise")/100).toFixed(2),microTiming:+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2),arpMode:n.arpMode??s.arpMode??"off",arpRate:n.arpRate??s.arpRate??"1/16",arpRange:n.arpRange??s.arpRange??1,arpGate:.85,minVelocity:s.minVelocity??60,maxVelocity:s.maxVelocity??110}}get activeEngineParams(){const t=this.getDerivedParams();return{spread:this.advOverride.spread!==void 0?this.advOverride.spread:t.spread,duration:this.advOverride.duration!==void 0?this.advOverride.duration:t.duration,humanVariance:this.advOverride.humanVariance!==void 0?this.advOverride.humanVariance:t.humanVariance,microTiming:this.advOverride.microTiming!==void 0?this.advOverride.microTiming:t.microTiming,arpMode:this.advOverride.arpMode!==void 0?this.advOverride.arpMode:t.arpMode,arpRate:this.advOverride.arpRate!==void 0?this.advOverride.arpRate:t.arpRate,arpRange:this.advOverride.arpRange!==void 0?this.advOverride.arpRange:t.arpRange,arpGate:this.advOverride.arpGate!==void 0?this.advOverride.arpGate:t.arpGate,minVelocity:this.advOverride.minVelocity!==void 0?this.advOverride.minVelocity:t.minVelocity,maxVelocity:this.advOverride.maxVelocity!==void 0?this.advOverride.maxVelocity:t.maxVelocity}}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=i),k.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),k.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,k.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=ut.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=ut.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",i=Oi(this.progression,t,e);this.progression=i,k.setProgression(i),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${i.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=Oo(this.progression,t);this.progression=e,k.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=Oi(this.progression,t);this.progression=e,k.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,n){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?n+1:0;const o=R(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=V(e,o);k.auditionChord({name:e,notes:s},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=ri[e]||ri[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||ri.MAJOR,n=this.progression?.key||"C",o=B[n.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;R(n,e);const s=n.replace("b","♭")+" "+i.name,r=t.map(g=>{const y=W(g.name);return B[y.root]??0}),a=g=>i.steps.indexOf(((g-o)%12+12)%12),c=i.steps.map((g,y)=>{const b=(o+g)%12,x=Os[b]+i.quals[y],w=r.indexOf(b),I=w>=0,A=this.auditionDeg===y;return{di:y,roman:i.romans[y],name:x,fn:i.fns[y],inLoop:I,on:A,barIdx:w,aria:`Hear ${x}, the ${i.fns[y].toLowerCase()} of ${s}`}}),p=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,h=t.map(g=>g.roman||i.romans[Math.max(0,a(B[W(g.name).root]??0))]).join(" – "),l=n.replace("b","♭")+" "+i.name,m=zo(t),d=jo(t),u=this.progression?.note||"";return{scaleName:s,scaleHint:p,scaleDegrees:c,romanFormula:h,keyModeLine:l,cadences:m,voiceLinks:d,setNote:u}}renderScaleChords(t,e,i,n){const o=Ci(this.progression?.mood||"Warm");return f`
      <div
        class="scale-chords-panel"
        style="position: relative; z-index: 2; background: var(--cv-cream); border-radius: ${n?"18px":"20px"}; padding: ${n?"11px 12px 13px":"13px 15px 15px"}; margin-top: ${n?"12px":"0"}; margin-bottom: ${n?"0":"12px"}; flex-shrink: 0;"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${n?"8px":"12px"}; flex-wrap: wrap;">
          <div style="font-size: ${n?"9.5px":"10px"}; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
            Scale · ${t}
          </div>
          <div style="font-size: ${n?"10.5px":"11px"}; font-weight: 700; color: rgba(46, 39, 31, 0.45);">
            ${e}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${n?"76px":"92px"}, 1fr)); gap: ${n?"5px":"6px"}; margin-top: ${n?"9px":"10px"}; min-width: 0;">
          ${i.map(s=>f`
            <button
              class="scale-degree-btn ${s.on?"active":""} ${s.inLoop?"in-loop":""}"
              style="border: none; font-family: inherit; text-align: left; cursor: pointer; min-width: 0; min-height: 46px; padding: 7px 10px 8px; border-radius: 13px; transition: background 160ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 160ms ease, transform 160ms ease; background: ${s.on?o:s.inLoop?"var(--cv-surface-2, #F1E4CC)":"transparent"}; box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, ${s.on?.22:s.inLoop?.14:.13}); outline: none;"
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
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return f`
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
            ${[1,2,4].map(e=>f`
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
              ${Ui.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=B[i]??0,o=B[e.root]??0,s=n===o;return f`
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
              ${ut.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return f`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
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
    `}renderFeelDrawerDesktop(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return f`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const n=this.fScopeBar===i,o=!!this.barFeel[i];return f`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                  aria-label="${e.name}, ${n?"editing":"edit feel"}"
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${n?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${o?1:0}; transition: opacity 150ms ease;"></span>
                </button>
              `})}
          </div>
          ${this.feelChanged?f`
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
          ${si.map(e=>{const i=this.fget(e.k);let n=e.steps[0];return typeof i!="number"?n=e.steps.find(o=>o.v===i)||e.steps[0]:e.steps.forEach(o=>{Math.abs(Number(o.v)-Number(i))<Math.abs(Number(n.v)-Number(i))&&(n=o)}),f`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(o=>{const s=o.v===n.v;return f`
                      <button
                        type="button"
                        style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>this.fset(e.k,o.v)}
                        aria-label="${e.label}: ${o.name}"
                      >
                        ${o.name}
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
        ${this.advOpen?f`
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
    `}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return f`
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
            ${[1,2,4].map(e=>f`
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
            ${Ui.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=B[i]??0,o=B[e.root]??0,s=n===o;return f`
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
            ${ut.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return f`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectScale(e.type)}
                  aria-label="Scale ${e.label}"
                >
                  ${e.label}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}onSelectSectionCard(t){this.activeSectionIdx=t,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}renderSongSectionList(t){const e=this.sections.length<we.length;return f`
      <div class="song-view-wrap song-section-view">
        <div class="song-section-lead">
          Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
        </div>

        <div class="song-section-list">
          ${this.sections.map((i,n)=>{const o=this.activeSectionIdx===n;return f`
              <div
                class="song-section-row ${o?"active":""}"
                @click=${()=>this.onSelectSectionCard(n)}
                role="button"
                tabindex="0"
                aria-label="Edit section ${n+1} ${i.name}"
              >
                <div class="song-section-index">SECTION ${n+1}</div>
                <div class="song-section-info">
                  <div class="song-section-title">${i.name}</div>
                  <div class="song-section-desc">${i.desc}</div>
                </div>
                <div class="song-section-chips">
                  ${i.progression.chords.map(s=>{const r=Q(s.tension);return f`
                      <div
                        class="song-chord-chip"
                        style="background: ${r.color};"
                        title="${s.name} (${s.functionLabel||s.tag})"
                      ></div>
                    `})}
                </div>
                ${this.sections.length>1?f`
                  <button
                    class="song-section-delete-btn"
                    title="Remove ${i.name}"
                    aria-label="Remove ${i.name}"
                    @click=${s=>{s.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-section",{detail:n,bubbles:!0,composed:!0}))}}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                `:""}
              </div>
            `})}

          ${e?f`
            <button
              class="song-add-section-card"
              @click=${()=>this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}
              aria-label="Add a related section"
            >
              <span class="plus-glyph">+</span>
              <span>Add a related section</span>
            </button>
          `:f`
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
            ${this.playing?f`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              <span>Stop song</span>
            `:f`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play song · ${this.sections.length} sections</span>
            `}
          </button>
          <div class="strip-timeline-wrap">
            <div class="strip-cells-bar loop-beat-cells">
              ${this.sections.map((i,n)=>{const o=this.playing&&this.activePlayingSectionIdx===n;return f`
                  <div
                    class="strip-cell"
                    style="height: ${o?20:10}px; border-radius: 3px; background: ${o?"#F2735F":"rgba(46,39,31,0.22)"}; flex: 1;"
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
    `}renderFeelSheetMobile(){if(!this.feelOpen)return"";const t=this.fScopeBar===null?"Everything below applies to every chord in the loop.":`Only ${this.progression?.chords?.[this.fScopeBar]?.name||"this chord"} plays this way — the rest keep the loop feel.`;return f`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; max-height: calc(100% - 24px); overflow-y: auto; overscroll-behavior: contain; background: var(--cv-surface, #F6EADB); border-radius: 26px 26px 0 0; padding: 0 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="position: sticky; top: 0; z-index: 2; background: var(--cv-surface, #F6EADB); padding: 14px 0 10px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">Feel</div>
              ${this.feelChanged?f`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const n=this.fScopeBar===i,o=!!this.barFeel[i];return f`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${n?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${n?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=i}}
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${n?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${o?1:0};"></span>
                </button>
              `})}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${t}
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${si.map(e=>{const i=this.fget(e.k);let n=e.steps[0];return typeof i!="number"?n=e.steps.find(o=>o.v===i)||e.steps[0]:e.steps.forEach(o=>{Math.abs(Number(o.v)-Number(i))<Math.abs(Number(n.v)-Number(i))&&(n=o)}),f`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(o=>{const s=o.v===n.v;return f`
                        <button
                          type="button"
                          style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; background: ${s?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${s?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>this.fset(e.k,o.v)}
                          aria-label="${e.label}: ${o.name}"
                        >
                          ${o.name}
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
          ${this.advOpen?f`
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
    `}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:n,voiceLinks:o,setNote:s}=t;return f`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${i}</div>
        </div>

        ${n.length?f`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${n.map(r=>f`
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
        ${o.map(r=>f`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${r.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${r.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${r.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${r.link}</div>
          </div>
        `)}

        ${s?f`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${s}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),n=this.getChordExtensionLabel(e?.name),o=R(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=e?Lo(e.name,o):[];return f`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(r=>f`
          <div class="note-pill">${r.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&s.length?f`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${s.map(r=>f`
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
        ${Cs.map(r=>{const a=r.label===i;return f`
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
        <div class="quality-label">${n}</div>
        <div class="quality-sub">${this.getChordExtensionSub(e?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${As.map(r=>{const a=r.label===n;return f`
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
    `}renderPianoCard(t,e){const i=W(t.name),n=Li[i.root]??0,o=ft[i.quality]||ft[mi[i.quality]||"maj"]||[0,4,7],s=22,r=86,a=52,c=[0,2,4,5,7,9,11],p=[],h=[],l=[];for(let u=0;u<2;u++)c.forEach((g,y)=>{p.push({x:(u*7+y)*s,w:s-1.5,h:r})});for(let u=0;u<2;u++)[0,1,3,4,5].forEach(g=>{const y=u*7+g;h.push({x:y*s+s*.64,w:s*.58,h:a})});o.forEach(u=>{const g=n+u,y=Math.floor(g/12),b=g%12,v=c.indexOf(b),x=u===0,w=v<0,I=x?"#F2735F":w?"#FBF3E6":"#2E271F",A=x?"#FBF3E6":w?"#2E271F":"#FBF3E6",F=this.showDegrees?gt[u%12]:"";if(v>=0){const z=y*7+v;l.push({cx:z*s+(s-1.5)/2,cy:r-19,r:9,fill:I,isRoot:x,label:F,lc:A})}else{const O=(y*7+c.indexOf(b-1))*s+s*.64,$=s*.58;l.push({cx:O+$/2,cy:a-14,r:7.5,fill:I,isRoot:x,label:F,lc:A})}});const m=14*s,d=o.map(u=>{const g=Ri[(n+u)%12];return this.showDegrees?`${g} (${gt[u%12]})`:g}).join(" · ");return f`
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
          ${this.showTheory&&t.roman?f`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${m}" height="${r}" viewBox="0 0 ${m} ${r}" style="display: block; width: 100%; max-width: ${m}px; height: auto;">
          ${p.map(u=>X`
            <rect x="${u.x}" y="0" width="${u.w}" height="${u.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${h.map(u=>X`
            <rect x="${u.x}" y="0" width="${u.w}" height="${u.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${l.map(u=>X`
            <g>
              <circle cx="${u.cx}" cy="${u.cy}" r="${u.r}" fill="${u.fill}" stroke="${u.isRoot?"#2E271F":"none"}" stroke-width="${u.isRoot?1.6:0}"></circle>
              ${u.label?X`
                <text x="${u.cx}" y="${u.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${u.lc}" font-family="'Plus Jakarta Sans',sans-serif">${u.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${d}</div>
      </div>
    `}renderFretCard(t,e,i){const n=W(t.name),o=Li[n.root]??0,s=ft[n.quality]||ft[mi[n.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],a=[7,0,4,9],c=i==="Ukulele",p=c?a:r,h=c?Ds({root:n.root,rootPc:o,q:n.quality,intervals:s})||[null,null,null,null]:$s({root:n.root,rootPc:o,q:n.quality})||[null,null,null,null,null,null],l=18,m=24,d=4,u=16,g=p.length,y=h.filter(E=>E!==null&&E>0),b=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,v=[],x=[],w=[],I=[],A=[];for(let E=0;E<g;E++)v.push({x:E*l});for(let E=0;E<=d;E++)x.push({y:u+E*m,sw:E===0&&b===0?3:1.2});h.forEach((E,P)=>{const H=P*l;if(E===null){A.push({x:H});return}if(E===0){I.push({x:H});return}const J=((p[P]+E-o)%12+12)%12;w.push({cx:H,cy:u+(E-b-.5)*m,fill:J===0?"#F2735F":"#2E271F",label:this.showDegrees?gt[((p[P]+E-o)%12+12)%12]:""})});const F=(g-1)*l,z=(g-1)*l+26,O=u+d*m+12,$=b>0?`${b+1}fr`:"",G=b>0,j=s.map(E=>{const P=Ri[(o+E)%12];return this.showDegrees?`${P} (${gt[E%12]})`:P}).join(" · ");return f`
      <div
        class="play-card"
        @pointerdown=${E=>this.handlePadPointerDown(E,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?f`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${G?f`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${$}</div>
          `:""}
        </div>
        <svg width="${z}" height="${O}" viewBox="-13 -2 ${z} ${O}" style="display: block; width: 100%; max-width: ${z*1.5}px; height: auto;">
          ${x.map(E=>X`
            <rect x="0" y="${E.y}" width="${F}" height="${E.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${v.map(E=>X`
            <rect x="${E.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${I.map(E=>X`
            <circle cx="${E.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${A.map(E=>X`
            <text x="${E.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${w.map(E=>X`
            <g>
              <circle cx="${E.cx}" cy="${E.cy}" r="${E.fill==="#F2735F"?7.5:7}" fill="${E.fill}"></circle>
              ${E.label?X`
                <text x="${E.cx}" y="${E.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${E.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${j}</div>
      </div>
    `}renderChordPad(t,e,i,n){const o=Q(t.tension||.1),s=this.activeIndex===e&&this.playing,r=this.padFlash===e||this.padHeld===e,a=this.swapIndex===e,c=this.getChordLadder(t),p=this.getLadderHome(t),h=this.lastPad?.idx===e,l=h&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:p,m=h&&l>=0&&l!==p&&c[l],d=m?l:p,u=h?m?"→ "+c[l]:Es[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"",g=c.map(x=>String(x).replace(/^[A-G][#b]?/,"")),y=g[0];let b=g.slice();y&&g.every((x,w)=>w===0||x.indexOf(y)===0)?b=g.map((x,w)=>w?x.slice(y.length):x):y&&g.every((x,w)=>w===0||x.slice(-y.length)===y)&&(b=g.map((x,w)=>w?x.slice(0,x.length-y.length):x)),b=b.map(x=>(x===""?"maj":x).replace(/maj/gi,"△"));const v=c.map((x,w)=>({label:b[w],wrapStyle:"flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;",labelStyle:`font-size: 8.5px; font-weight: 800; letter-spacing: 0.2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: clip; color: ${w===d?m?i:"rgba(46,39,31,0.78)":"rgba(46,39,31,0.3)"}; transition: color 180ms cubic-bezier(0.23,1,0.32,1);`,barStyle:`width: 100%; height: 4px; border-radius: 3px; background: ${w===d?m?i:"rgba(46,39,31,0.5)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;`}));return f`
      <div
        class="pad-cell ${n?"chord-item-wrap":""} ${r?"pad-held":""} ${a?"selected":""} ${s?"pad-lit":""}"
        style="
          background: ${o.color};
          border-radius: ${a&&n?"20px 20px 5px 5px":"20px"};
          ${a?`box-shadow: inset 0 0 0 2.5px ${i}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${Ie[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${x=>this.handlePadPointerDown(x,e)}
        @pointermove=${x=>this.handlePadPointerMove(x,e)}
        @pointerup=${x=>this.handlePadPointerUp(x)}
        @pointercancel=${x=>this.handlePadPointerUp(x)}
        @pointerleave=${x=>this.handlePadPointerUp(x)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${c.slice(1).map((x,w)=>f`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(w+1)/c.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${x=>{x.stopPropagation(),this.openSwap(e)}}
          @pointerdown=${x=>x.stopPropagation()}
          aria-label="Swap ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${x=>{x.stopPropagation(),this.openDetail(e)}}
          @pointerdown=${x=>x.stopPropagation()}
          aria-label="View voicing for ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row" style="display: flex; align-items: center; gap: 6px;">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(oi[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?f`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${Ts[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${h&&m&&c[l]?c[l]:t.name}</div>
          ${this.showTheory&&t.notes&&t.notes.length?f`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${t.notes.join(" · ")}
            </div>
          `:""}
          ${u?f`<div class="pad-meta-voicing">${u}</div>`:""}
          <div class="pad-rung-row" style="display: flex; gap: 4px; margin-top: 7px;">
            ${v.map(x=>f`
              <div class="pad-rung-col" style="${x.wrapStyle}">
                <div class="pad-rung-label" style="${x.labelStyle}">${x.label}</div>
                <div class="pad-rung-bar" style="${x.barStyle}"></div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(r=>!e||(r.name+" "+r.genre+" "+r.mood).toLowerCase().includes(e)),n=i.map(r=>r.id),o=n.length>0&&n.every(r=>this.librarySelected.includes(r)),s=n.some(r=>this.librarySelected.includes(r));return f`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          ${this.librarySelectMode&&this.librarySelected.length>0?`${this.librarySelected.length} of ${this.savedSets.length} selected`:`Your loops (${this.savedSets.length})`}
        </div>
        <div class="library-select-toolbar" style="display: flex; align-items: center; gap: 8px;">
          ${this.librarySelectMode&&i.length>0?f`
            <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">
              <input
                type="checkbox"
                class="library-select-all-checkbox"
                style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px;"
                .checked=${o}
                .indeterminate=${s&&!o}
                @change=${this.toggleSelectAllVisible}
                aria-label="Select all loops"
              />
              <button
                type="button"
                class="library-select-all-btn"
                style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer; padding: 0;"
                @click=${r=>{r.stopPropagation(),this.toggleSelectAllVisible()}}
              >
                ${o?"Deselect all":"Select all"}
              </button>
            </label>
          `:""}
          ${this.librarySelectMode&&this.librarySelected.length>0?f`
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
        ${i.map(r=>{const a=this.librarySelected.includes(r.id);return f`
            <div
              class="library-loop-item ${this.librarySelectMode?"select-mode":""} ${a?"selected":""}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${a?"var(--cv-surface-2, #F1E4CC)":"var(--cv-surface)"}; transition: background 120ms ease;"
              @click=${()=>{this.librarySelectMode?this.toggleSelectLoop(r.id):(this.dispatchEvent(new CustomEvent("load-project",{detail:r,bubbles:!0,composed:!0})),this.setLibraryOpen(!1))}}
            >
              ${this.librarySelectMode?f`
                <input
                  type="checkbox"
                  class="loop-item-checkbox"
                  .checked=${a}
                  @click=${c=>c.stopPropagation()}
                  @change=${()=>this.toggleSelectLoop(r.id)}
                  style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px; flex-shrink: 0;"
                  aria-label="Select ${r.name}"
                />
              `:""}
              <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
                ${(r.chords||[]).map(c=>{const p=Q(c.tension??0);return f`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(p.radius*.25)}px;background:${p.color};flex-shrink:0;"></span>`})}
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.name}</div>
                <div style="font-size: 11px; color: var(--cv-ink-muted);">${r.genre} · ${r.mood}</div>
              </div>
            </div>
          `})}
        ${i.length?"":f`
          <div class="library-empty" style="padding: 16px 12px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted); text-align: center;">
            ${this.savedSets.length?"No loops match that.":"Nothing saved yet — tap the bookmark to keep a loop."}
          </div>
        `}
      </div>
    `}renderLibrarySheetMobile(t){return this.libraryOpen?f`
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
    `:""}render(){const t=this.progression?.chords||[],e=Ci(this.progression?.mood||"Warm"),i=ht.find(d=>d.name===this.selectedBand),n=this.getTheoryData(t),o=t.map(d=>d.tension||.1),s=Math.max(...o,.1),r=Math.min(...o,0),a=o.indexOf(s),c=o.every((d,u)=>u===0||d>=o[u-1]),p=s-r<.28?"Stays close to home":c?"A steady climb":o[o.length-1]<.25&&a<o.length-1?"Away, then home":"Drifts, then settles",h=`Opens ${Ie[t[0]?.functionLabel]||"home"} and ${s-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":c?`tightens chord by chord, peaking on ${t[a]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[a]?.name||"the middle"} before easing back down home.`}`;let l=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")l=hi(this.chordData,this.progression,this.swapIndex);else{const d=$i(this.chordData,this.progression,this.swapIndex);l=(d.find(g=>g.name===this.activeSwapFamily)||d[0])?.rows||[],mt[this.activeSwapFamily]&&mt[this.activeSwapFamily][this.showTheory?1:0]}if(i){const d=l.filter(g=>i.hoist.includes(g.name)),u=l.filter(g=>!i.hoist.includes(g.name));l=[...d,...u]}}const m=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?f`
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

            ${this.vibeOpen?f`
              <div class="mobile-vibe-drawer">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${d=>{this.freeText=d.target.value}}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${Fi.map(d=>f`
                    <button class="pill ${this.progression?.genre===d?"active":""}" @click=${()=>this.onGenreClick(d)}>${d}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${be.map(d=>{const u=d.name,g=d.dot,y=this.progression?.mood===u;return f`
                      <button
                        class="pill mood-pill ${y?"active":""}"
                        style="${y?`background: ${g}; color: #2E271F;`:""}"
                        @click=${()=>this.onMoodClick(u)}
                      >
                        <span class="mood-badge" style="background: ${y?"rgba(46, 39, 31, 0.12)":g+"33"};">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${y?"#2E271F":g}" stroke-width="2.2" stroke-linecap="round"><path d="${d.iconPath}"/></svg>
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
                  ${ht.map(d=>f`
                    <button class="pill ${this.selectedBand===d.name?"active":""}" style="font-family: ${d.font}; font-weight: ${d.weight||800};" @click=${()=>this.onBandClick(d.name)}>${d.name}</button>
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
            ${this.activeView==="loop"?f`
              <div class="stage-card" style="padding: 18px 14px;">
                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${t.map((d,u)=>{if(this.swapIndex===u){const g=Q(d.tension||.1),y=this.activeIndex===u&&this.playing;return f`
                        <div
                          class="pad-cell pad-cell-cycler ${y?"pad-lit":""}"
                          style="
                            background: ${g.color};
                            border-radius: 20px;
                            padding: 12px;
                            min-height: 220px;
                            box-shadow: inset 0 0 0 2.5px ${e}, 0 14px 26px -18px rgba(46,39,31,0.45);
                          "
                        >
                          <chord-pad-cycler
                            .originalChord=${d}
                            .barIndex=${u}
                            .feelings=${this.getSwapFeelings(u)}
                            .feelIndex=${this.mobileFeelIndex}
                            .chordIndex=${this.mobileChordIndex}
                            @cycler-audition=${b=>this.handleSwapAudition(b.detail)}
                            @cycler-keep=${b=>this.handleCyclerKeep(b.detail)}
                            @cycler-revert=${()=>this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `}return this.renderChordPad(d,u,e,!1)})}
                </div>

                ${this.showTheory?this.renderScaleChords(n.scaleName,n.scaleHint,n.scaleDegrees,!0):""}
              </div>

              <!-- Unified Mobile Quick Chips Row -->
              <div class="mobile-chips-row">
                <button
                  class="mobile-chip instrument-chip ${this.expandedInstrument?"open":""}"
                  @click=${this.toggleInstrumentExpand}
                  aria-label="Change instrument"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  <span>${ue(this.instrument)}</span>
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

              ${this.expandedInstrument?f`
                <div class="mobile-instrument-drawer" style="animation: cvfv-panel 200ms var(--cv-ease, ease); background: var(--cv-cream, #FBF3E6); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label, #8A6B3F);">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                    ${ae.map(d=>f`
                      <button
                        class="pill ${ue(this.instrument)===d.name?"active":""}"
                        @click=${()=>{this.instrument=d.name,k.setInstrument(d.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:d.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                      >
                        <span style="background:${d.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${d.name}
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

              ${this.showTheory?f`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${p}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(d=>{const u=Math.round(28+(d.tension||.1)*85),g=Q(d.tension||.1);return f`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${u}px; border-radius: 100px; background: ${g.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${d.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${Ie[d.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${h}</div>
                  ${this.renderTheoryStrip(n)}
                </div>
              `:""}
            `:this.activeView==="song"?this.renderSongSectionList(e):f`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(d=>f`
                      <button
                        class="pill ${this.playInstrument===d?"active":""}"
                        style="background: ${this.playInstrument===d?e:"var(--cv-cream)"}; color: ${this.playInstrument===d?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=d}}
                      >${d}</button>
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

                ${this.playInstrument==="Piano"?f`
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${t.map((d,u)=>this.renderPianoCard(d,u))}
                  </div>
                `:f`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((d,u)=>this.renderFretCard(d,u,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>



          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen?f`
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
            <button aria-label="Keep this loop" class="mobile-circle-btn" @click=${()=>this.dispatchEvent(new CustomEvent("save-set",{bubbles:!0,composed:!0}))}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
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
            @toast=${d=>{this.dispatchEvent(new CustomEvent("toast",{detail:d.detail,bubbles:!0,composed:!0}))}}
          ></share-modal>
      `:f`
      ${i?f`
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

            ${this.libraryOpen?f`
              <div class="loops-popover-desktop library-popover">
                ${this.renderLibraryPopoverContent(e)}
              </div>
            `:""}
          </div>
        </nav>

        <!-- Floating Vibe Popover (Desktop) -->
        ${this.vibeOpen?f`
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
                @input=${d=>{this.freeText=d.target.value}}
                placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
              />
              <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${Fi.map(d=>f`
                <button class="pill ${this.progression?.genre===d?"active":""}" @click=${()=>this.onGenreClick(d)}>${d}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${be.map(d=>{const u=d.name,g=d.dot,y=this.progression?.mood===u;return f`
                  <button class="pill mood-pill ${y?"active":""}" style="${y?`background: ${g}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(u)}>
                    <span class="mood-badge" style="background: ${y?"rgba(46, 39, 31, 0.12)":g+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${y?"#2E271F":g}" stroke-width="2.2" stroke-linecap="round"><path d="${d.iconPath}"/></svg>
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
              ${ht.map(d=>f`
                <button class="pill ${this.selectedBand===d.name?"active":""}" style="font-family: ${d.font}; font-weight: ${d.weight||800};" @click=${()=>this.onBandClick(d.name)}>${d.name}</button>
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
            ${this.activeView==="loop"?f`
              <div class="stage-card stage-panel">
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
                  ${t.map((d,u)=>{const y=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/4)+1)*4-1);return f`
                      ${this.renderChordPad(d,u,e,!0)}
                      ${this.swapIndex!==null&&u===y?f`
                        <chord-swap-lane
                          .swapIndex=${this.swapIndex}
                          .chord=${t[this.swapIndex]}
                          .feelings=${this.getSwapFeelings(this.swapIndex)}
                          .activeFeel=${this.activeSwapFamily}
                          .pickedChord=${this.abPick}
                          .padCols=${Math.min(t.length,4)}
                          .moodColor=${e}
                          @swap-feel-change=${b=>{this.activeSwapFamily=b.detail.feel,this.requestUpdate()}}
                          @swap-audition=${b=>this.handleSwapAudition(b.detail)}
                          @swap-confirm=${this.confirmSwap}
                          @swap-close=${this.clearSelection}
                        ></chord-swap-lane>
                      `:""}
                    `})}
                </div>

                ${this.showTheory?this.renderScaleChords(n.scaleName,n.scaleHint,n.scaleDegrees,!1):""}

                <!-- Quick Controls Below Pad Cards -->
                <div class="stage-quick-controls" style="display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px; row-gap: 10px; margin-top: 16px;">
                  <button
                    class="instrument-chip ${this.expandedInstrument?"open":""}"
                    @click=${this.toggleInstrumentExpand}
                    aria-label="Change instrument"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.expandedInstrument?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.expandedInstrument?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                    ${ue(this.instrument)}
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
                ${this.expandedInstrument?f`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Instrument</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${ae.map(d=>f`
                        <button
                          class="pill ${ue(this.instrument)===d.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument||"Piano")===d.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.instrument||"Piano")===d.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.instrument=d.name,k.setInstrument(d.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:d.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                        >
                          <span style="background:${d.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${d.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}
              </div>
            `:this.activeView==="song"?this.renderSongSectionList(e):f`
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
                  ${t.map((d,u)=>this.renderPianoCard(d,u))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(d=>f`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===d?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===d?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=d}}
                      >${d}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((d,u)=>this.renderFretCard(d,u,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
          ${this.detailOpen?f`
            <!-- Chord Detail View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; gap: 13px;">
                <div class="chord-shape-badge" style="background: ${Q(t[this.detailIndex]?.tension||.1).color};"></div>
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
          `:this.swapIndex!==null?f`
            <!-- Chord Swap Harmonic Context View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Bar ${this.swapIndex+1} Harmonic Context</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${m?.name||""}</span>
                    ${this.showTheory&&m?.roman?f`<span class="swap-roman">${m.roman}</span>`:""}
                    <span class="swap-role">${Ie[m?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${i?f`
                <div style="background: var(--cv-cream); border-radius: 14px; padding: 12px 14px; margin-bottom: 14px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cv-label);">Band DNA · ${i.name}</div>
                  <div style="font-size: 12.5px; font-weight: 700; color: var(--cv-ink); margin-top: 4px;">${this.showTheory?i.theory:i.plain}</div>
                </div>
              `:""}

              ${this.abPick?f`
                <div style="animation: cvfv-pop 200ms ease-out; background: var(--cv-cream); border-radius: 16px; padding: 16px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                    Auditioning · ${this.activeSwapFamily||"Substitution"}
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                    <div style="font-size: 22px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.02em; line-height: 1.1;">${this.abPick.chord||this.abPick.name}</div>
                    ${this.abPick.roman?f`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label);">${this.abPick.roman}</div>`:""}
                  </div>
                  <div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">
                    ${this.abPick.functionLabel||this.abPick.fn||"Harmonic substitution that alters the feel of the bar."}
                  </div>
                  ${this.abPick.notes&&this.abPick.notes.length?f`
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; color: var(--cv-ink); margin-top: 10px;">
                      Notes: ${this.abPick.notes.join(" · ")}
                    </div>
                  `:""}
                  <div style="font-size: 11.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(46,39,31,0.08);">
                    Hear how this chord changes the emotional arc of the progression.
                  </div>
                </div>
              `:f`
                <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); background: var(--cv-cream); border-radius: 14px; padding: 15px;">
                  Pick a feeling in the swap lane under the loop, then tap a candidate chord to audition it. What it does, its notes, and how it voices will show up here.
                </div>
              `}

              ${this.showTheory?this.renderTheoryStrip(n):""}
            </div>
          `:f`
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
                ${t.map((d,u)=>{const g=Q(d.tension||.1),y=Math.round(18+(d.tension||.1)*62);return f`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(u)} aria-label="${d.name}, ${Ie[d.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${y}px; background: ${g.color};"></div>
                      </div>
                      <div class="arc-bar-name">${d.name}</div>
                      <div class="arc-bar-feel">${Ie[d.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${h}</div>
              ${this.showTheory&&n.setNote?f`
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(46,39,31,0.08); text-wrap: pretty;">
                  ${n.setNote}
                </div>
              `:""}

              <div class="inspector-tip-box" style="margin-top: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${e}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
              </div>
              ${this.showTheory?this.renderTheoryStrip(n):""}
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
          @toast=${d=>{this.dispatchEvent(new CustomEvent("toast",{detail:d.detail,bubbles:!0,composed:!0}))}}
        ></share-modal>
      </div>
    `}};N.styles=Ee`
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
  `;T([C({type:Object})],N.prototype,"chordData",2);T([C({type:Object})],N.prototype,"progression",2);T([C({type:Number})],N.prototype,"activeIndex",2);T([C({type:Number})],N.prototype,"progressStep",2);T([C({type:Array})],N.prototype,"order",2);T([C({type:Boolean})],N.prototype,"playing",2);T([C({type:Boolean})],N.prototype,"showTheory",2);T([C({type:String})],N.prototype,"instrument",2);T([C({type:String})],N.prototype,"playStyle",2);T([C({type:Boolean})],N.prototype,"isAuthenticated",2);T([C({type:String})],N.prototype,"userEmail",2);T([C({type:Array})],N.prototype,"sections",2);T([C({type:Number})],N.prototype,"activeSectionIdx",2);T([C({type:Number})],N.prototype,"activePlayingSectionIdx",2);T([C({type:Number})],N.prototype,"totalSongSteps",2);T([C({type:Boolean})],N.prototype,"isGenerating",2);T([C({type:Boolean})],N.prototype,"libraryOpen",2);T([S()],N.prototype,"isMobile",2);T([S()],N.prototype,"activeView",2);T([S()],N.prototype,"vibeOpen",2);T([S()],N.prototype,"selectedBand",2);T([S()],N.prototype,"freeText",2);T([S()],N.prototype,"vibePlaceholderIdx",2);T([S()],N.prototype,"expandedGenre",2);T([S()],N.prototype,"expandedMood",2);T([S()],N.prototype,"activeSwapFamily",2);T([S()],N.prototype,"swapIndex",2);T([S()],N.prototype,"isInspectorOpen",2);T([S()],N.prototype,"detailOpen",2);T([S()],N.prototype,"detailIndex",2);T([S()],N.prototype,"abPick",2);T([S()],N.prototype,"abSide",2);T([S()],N.prototype,"abPlaying",2);T([S()],N.prototype,"mobileFeelIndex",2);T([S()],N.prototype,"mobileChordIndex",2);T([S()],N.prototype,"savedSets",2);T([S()],N.prototype,"renamingId",2);T([S()],N.prototype,"draftName",2);T([S()],N.prototype,"confirmDeleteId",2);T([S()],N.prototype,"librarySearch",2);T([S()],N.prototype,"librarySelectMode",2);T([S()],N.prototype,"librarySelected",2);T([S()],N.prototype,"playInstrument",2);T([S()],N.prototype,"showDegrees",2);T([S()],N.prototype,"mobileSheetOpen",2);T([S()],N.prototype,"mobileDetailSheetOpen",2);T([S()],N.prototype,"padFlash",2);T([S()],N.prototype,"padHeld",2);T([S()],N.prototype,"gridFor",2);T([S()],N.prototype,"lastPad",2);T([S()],N.prototype,"tempoOpen",2);T([S()],N.prototype,"feelOpen",2);T([S()],N.prototype,"shareOpen",2);T([S()],N.prototype,"expandedInstrument",2);T([S()],N.prototype,"barsPerChord",2);T([S()],N.prototype,"swing",2);T([S()],N.prototype,"spread",2);T([S()],N.prototype,"density",2);T([S()],N.prototype,"humanise",2);T([S()],N.prototype,"tone",2);T([S()],N.prototype,"feelScope",2);T([S()],N.prototype,"barFeel",2);T([S()],N.prototype,"advOverride",2);T([S()],N.prototype,"advOpen",2);T([S()],N.prototype,"showAdvancedFeel",2);T([S()],N.prototype,"humanEngineState",2);T([S()],N.prototype,"auditionDeg",2);T([S()],N.prototype,"auditionName",2);T([S()],N.prototype,"auditionBar",2);N=T([Ae("loop-screen")],N);var Bs=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,_e=(t,e,i,n)=>{for(var o=n>1?void 0:n?Fs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Bs(e,i,o),o};let ye=class extends Ce{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&Re.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await Re.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?f``:f`
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

          ${this.errorMessage?f`<div class="alert-box alert-error">${this.errorMessage}</div>`:""}

          <div class="btn-container">
            <div id="google-btn-container">
              <button
                type="button"
                class="oauth-btn"
                ?disabled=${this.isOAuthLoading}
                @click=${this.handleGoogleSignIn}
              >
                ${this.isOAuthLoading?f`<span class="spinner"></span> <span>Connecting to Google...</span>`:f`
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
    `}};ye.styles=Ee`
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
  `;_e([C({type:Boolean})],ye.prototype,"open",2);_e([S()],ye.prototype,"mounted",2);_e([S()],ye.prototype,"isOAuthLoading",2);_e([S()],ye.prototype,"errorMessage",2);_e([Sn("#google-btn-container")],ye.prototype,"googleBtnContainer",2);ye=_e([Ae("auth-modal")],ye);var Ps=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,L=(t,e,i,n)=>{for(var o=n>1?void 0:n?Us(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Ps(e,i,o),o};let U=class extends Ce{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.syncError=null,this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.chordLengthCache=[],this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Re.signOut(),D.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&ae.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&Ke.some(i=>i.name===e)&&(this.playStyle=e),k.setInstrument(this.instrument),k.setPlayStyle(this.playStyle),this.unsubscribeAuth=Re.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=D.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=D.subscribeSyncStatus(i=>{const n=this.syncStatus;if(this.syncStatus=i,this.syncError=D.getLastSyncError(),i==="offline"&&n!=="offline"){const o=this.syncError||"Cloud sync failed";this.showToast(`Sync failed: ${o}`)}this.requestUpdate()}),this.unsubscribeTick=k.subscribeTick((i,n,o,s,r)=>{this.activeIndex=i,this.progressStep=n,typeof o=="number"&&(this.activePlayingSectionIdx=o),typeof s=="number"&&(this.totalSongSteps=s),this.playing=k.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),ao().then(i=>{this.chordData=i,this.progression||(this.progression=di(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(n,o)=>o),k.setProgression(this.progression,this.order),this.sections=re.createInitialSong(this.progression,this.order))}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),k.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return D.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();(t==="sets"||t==="11a")&&(this.libraryOpen=!0)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const i=(typeof t?.detail=="string"?t.detail:t?.detail?.promptText)||this.activeSearchPrompt||void 0;i&&this.showToast("Composing chords with AI...");const n=await os.resolvePrompt(this.chordData,this.genre,this.mood,this.length,i);n.instrument&&(this.instrument=n.instrument,localStorage.setItem("chroma-chords-instrument",n.instrument),k.setInstrument(n.instrument)),n.playStyle&&(this.playStyle=n.playStyle,localStorage.setItem("chroma-chords-play-style",n.playStyle),k.setPlayStyle(n.playStyle));const o=n.progression;this.progression=o,o.genre&&(this.genre=o.genre),o.mood&&(this.mood=o.mood),this.order=Array.from({length:o.chords.length},(s,r)=>r),this.length=o.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.chordLengthCache=[],k.setProgression(o,this.order),k.reset(),this.sections=re.createInitialSong(o,this.order),this.activeSectionIdx=0,this.activeSearchPrompt=null,i&&this.showToast(`Composed from "${i}"`)}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){const e=t.detail;if(!this.progression||e===this.length)return;const i=yo(this.progression,e,this.chordData,this.chordLengthCache);this.progression=i.progression,this.chordLengthCache=i.cachedTailChords,this.length=this.progression.chords.length,this.order=Array.from({length:this.length},(n,o)=>o),k.setProgression(this.progression,this.order),this.sections.length>0?this.sections=re.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order):this.sections=re.createInitialSong(this.progression,this.order),this.requestUpdate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;this.chordLengthCache=[];const t=di(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,k.setProgression(t,this.order),this.sections=re.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(k.startAutoplay(),k.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const n of e.chords){let o=n.notes;(!o||o.length===0)&&(o=V(n.name,R(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:n.name,tag:n.tag||"diatonic",roman:n.roman||"",color:n.color||"#9CC0EC",functionLabel:n.functionLabel||"",notes:o,scaleLabel:n.scaleLabel||"",desc:n.desc||"",degree:n.degree||"",scaleKey:n.scaleKey||"",tension:n.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(n,o)=>o),this.length=this.progression.chords.length,this.chordLengthCache=[],this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&k.setBarsPerChord(e.barsPerChord),e.feel&&k.setFeelSettings(e.feel),k.setProgression(this.progression,this.order),this.sections=re.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){D.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=D.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,D.saveProject(e),this.requestUpdate())}async onSyncProjects(){await D.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),k.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),k.setPlayStyle(t.detail)}onTogglePlay(){this.playing=k.togglePlay()}onTogglePlaySong(){k.setSong(this.sections),this.playing=k.togglePlay()}onProgressionChange(t){this.progression=t.detail,k.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=re.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=re.addSection(this.sections,this.progression,this.chordData);this.sections=t.sections,this.activeSectionIdx=t.activeIndex;const e=this.sections[this.activeSectionIdx];e&&(this.progression=e.progression,this.order=e.order.slice(),k.setProgression(this.progression,this.order)),k.setSong(this.sections),this.requestUpdate()}onRemoveSection(t){const e=t.detail,i=re.removeSection(this.sections,e);this.sections=i.sections,this.activeSectionIdx=i.activeIndex;const n=this.sections[this.activeSectionIdx];n&&(this.progression=n.progression,this.order=n.order.slice(),k.setProgression(this.progression,this.order)),k.setSong(this.sections),this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.progression=e.progression,this.order=e.order.slice(),k.setProgression(this.progression,this.order)),this.requestUpdate()}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(D.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=D.getProjects().find(a=>a.id===e),n=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,o=k.getFeelSettings(),s=k.getBarsPerChord(),r={id:e,name:n,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:s,feel:{swing:o.swing??0,spread:o.spread??50,density:o.density??50,tone:o.tone??"Warm",humanState:o.humanState}};D.saveProject(r),t&&D.scheduleCloudSync(),this.showToast(`Saved "${n}"`,e),this.requestUpdate()}render(){return this.currentProjectId&&D.isProjectSaved(this.currentProjectId),f`
      <div class="app-header-container">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${D.getProjects().length}
          .syncStatus=${this.syncStatus}
          .syncError=${this.syncError}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.libraryOpen=!1}}
        ></app-header>
      </div>

      <div class="screen-view">
        ${this.progression?f`
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
            @remove-section=${this.onRemoveSection}
            @save-set=${this.onSaveSet}
            @load-project=${this.onLoadProject}
            @delete-project=${this.onDeleteProject}
            @view-sets=${()=>{this.libraryOpen=!0}}
            @request-login=${this.onLoginRequest}
            @request-logout=${this.onLogoutRequest}
            @toast=${t=>this.showToast(t.detail)}
          ></loop-screen>
        `:f`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

        ${this.toastMessage?f`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              ${this.toastUndoId?f`
                <button class="toast-btn" @click=${()=>{this.libraryOpen=!0,this.toastMessage=null}}>View</button>
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:f`
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
    `}};U.styles=Ee`
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
  `;L([S()],U.prototype,"chordData",2);L([S()],U.prototype,"libraryOpen",2);L([S()],U.prototype,"genre",2);L([S()],U.prototype,"mood",2);L([S()],U.prototype,"progression",2);L([S()],U.prototype,"activeIndex",2);L([S()],U.prototype,"progressStep",2);L([S()],U.prototype,"order",2);L([S()],U.prototype,"playing",2);L([S()],U.prototype,"showTheory",2);L([S()],U.prototype,"instrument",2);L([S()],U.prototype,"playStyle",2);L([S()],U.prototype,"length",2);L([S()],U.prototype,"sections",2);L([S()],U.prototype,"activeSectionIdx",2);L([S()],U.prototype,"activePlayingSectionIdx",2);L([S()],U.prototype,"totalSongSteps",2);L([S()],U.prototype,"userEmail",2);L([S()],U.prototype,"isAuthenticated",2);L([S()],U.prototype,"syncStatus",2);L([S()],U.prototype,"syncError",2);L([S()],U.prototype,"authModalOpen",2);L([S()],U.prototype,"toastMessage",2);L([S()],U.prototype,"toastUndoId",2);L([S()],U.prototype,"isGenerating",2);L([S()],U.prototype,"chordLengthCache",2);U=L([Ae("chroma-chords-app")],U);
