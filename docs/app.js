import{f as bn,u as yn,s as zi,n as ui,l as ji,F as ri,S as re,G as He,a as Z,E as $e,C as de,V as De,D as pe,R as ae,P as V,b as ai,M as Me,c as _i,d as le,g as xn,i as we,e as Ie,h as b,O as vn,w as Y}from"./assets/vendor-DZ9oKBXX.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ke=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn={attribute:!0,type:String,converter:yn,reflect:!1,hasChanged:bn},In=(t=wn,e,i)=>{const{kind:n,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),n==="accessor"){const{name:r}=i;return{set(a){const p=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,p,t,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,t,a),a}}}if(n==="setter"){const{name:r}=i;return function(a){const p=this[r];e.call(this,a),this.requestUpdate(r,p,t,!0,a)}}throw Error("Unsupported decorator location: "+n)};function C(t){return(e,i)=>typeof i=="object"?In(t,e,i):((n,o,s)=>{const r=o.hasOwnProperty(s);return o.constructor.createProperty(s,n),r?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(t){return C({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kn=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Nn(t,e){return(i,n,o)=>{const s=r=>r.renderRoot?.querySelector(t)??null;return kn(i,n,{get(){return s(this)}})}}const Se="chroma_chords_projects",Sn="chord_voyager_projects";class Te{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(Se);if(e||(e=localStorage.getItem(Sn),e&&localStorage.setItem(Se,e)),e){const i=JSON.parse(e);let n=!1;return i.forEach(o=>{(o.genre==="Unknown"||!o.genre)&&(o.genre="Pop",n=!0),Array.isArray(o.chords)||(o.chords=[],n=!0)}),n&&localStorage.setItem(Se,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(Se,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const n=new Map;return e.forEach(o=>n.set(o.id,o)),i.forEach(o=>{const s=n.get(o.id);!s||o.lastModified>s.lastModified?n.set(o.id,o):o.lastModified===s.lastModified&&(s.syncedToCloud=!0)}),Array.from(n.values())}static saveProject(e){const i=this.getProjects(),n=i.findIndex(o=>o.id===e.id);e.lastModified=Date.now(),n>=0?i[n]=e:i.push(e);try{localStorage.setItem(Se,JSON.stringify(i))}catch(o){console.error("Failed to save project to localStorage:",o)}}static deleteProject(e){let i=this.getProjects();i=i.filter(n=>n.id!==e);try{localStorage.setItem(Se,JSON.stringify(i))}catch(n){console.error("Failed to delete project from localStorage:",n)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),n=new Blob([i],{type:"application/json"}),o=URL.createObjectURL(n),s=document.createElement("a");s.href=o,s.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)}static importProjectFile(e){return new Promise((i,n)=>{const o=new FileReader;o.onload=s=>{try{const r=s.target?.result,a=JSON.parse(r);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),i(a)):n(new Error("Invalid project file format"))}catch{n(new Error("Failed to parse JSON file"))}},o.onerror=()=>n(new Error("Failed to read file")),o.readAsText(e)})}}const Je="chroma_chords_auth_token",At="chroma_chords_auth_user",Tn="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Et(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let n="";if(typeof atob=="function")n=atob(i);else if(typeof Buffer<"u")n=Buffer.from(i,"base64").toString("binary");else return null;const o=decodeURIComponent(n.split("").map(s=>"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(o)}catch{return null}}function Cn(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return Tn}}class An{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Cn(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Je);if(e){const i=Et(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(Je),localStorage.removeItem(At),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Et(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(n){console.error("Error in AuthState listener:",n)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Et(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Je,e),localStorage.setItem(At,JSON.stringify(this.currentUser)))}catch(n){console.warn("Failed to persist auth session to localStorage:",n)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const n=document.createElement("script");n.src="https://accounts.google.com/gsi/client",n.async=!0,n.defer=!0,n.onload=()=>{this.gisLoaded=!0,e(!0)},n.onerror=()=>e(!1),document.head.appendChild(n)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const n=window.google;if(n?.accounts?.id)try{n.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i?.({success:s.success,message:s.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",n.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(o){console.warn("Failed to render Google button:",o)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:n=>{if(n.credential){const o=this.handleCredentialResponse(n.credential);i({success:o.success,message:o.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(n=>{(n.isNotDisplayed?.()||n.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(n){const o=n instanceof Error?n.message:String(n);i({success:!1,message:o})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Je),localStorage.removeItem(At)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const Be=new An;class En{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const n=i.trim();n.toLowerCase().startsWith("bearer ")?e.Authorization=n:e.Authorization=`Bearer ${n}`}async testConnection(e,i){const n=this.formatUrl(e);if(!n)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const o={};this.applyAuthHeaders(o,i);const s=new AbortController,r=setTimeout(()=>s.abort(),8e3),a=await fetch(`${n}/api/health`,{method:"GET",headers:o,signal:s.signal});if(clearTimeout(r),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const p=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${p||a.statusText}`}}catch(o){return o instanceof Error&&o.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,n){const o=this.formatUrl(e);if(!o)throw new Error("Worker URL is not configured");const s={"Content-Type":"application/json"};this.applyAuthHeaders(s,i);const r=new AbortController,a=setTimeout(()=>r.abort(),15e3),p=await fetch(`${o}/api/sync`,{method:"POST",headers:s,body:JSON.stringify(n),signal:r.signal});if(clearTimeout(a),!p.ok){let d="";try{const u=await p.json();d=u.error||u.message||""}catch{d=await p.text().catch(()=>"")}throw new Error(`Cloud sync failed (${p.status}): ${d||p.statusText||"Unknown error"}`)}return await p.json()}}const On=new En,bi="chroma_chords_deleted_projects",yi="chroma_chords_last_sync_time",Mn="https://chroma-chords-api.warmsynths.workers.dev";function $n(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Mn}}function xi(t){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(t):null}function vi(t,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(t,e)}class Dn{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=Be.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(n=>{console.warn("Auto cloud sync on sign-in encountered an error:",n)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(n){console.error("Error in ProjectsChange callback:",n)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return Te.getProjects()}isProjectSaved(e){return e?Te.getProjects().some(i=>i.id===e):!1}saveProject(e){Te.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){Te.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=xi(bi);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){vi(bi,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),n=i.findIndex(s=>s.id===e),o=new Date().toISOString();n>=0?i[n].deletedAt=o:i.push({id:e,deletedAt:o}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(n=>n.id!==e);this.setTombstones(i)}getLastSyncTime(){return xi(yi)}setLastSyncTime(e){vi(yi,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await Be.getAccessToken();if(!this.isAuthenticated()||!i)return;const n=e||$n();if(n){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const o=Te.getProjects(),s=this.getTombstones(),r=this.getLastSyncTime(),a=o.map(m=>({...m,deletedAt:null})),p=await On.sync(n,i,{sets:a,lastSyncTime:r,tombstones:s}),d=new Map;o.forEach(m=>{d.set(m.id,{...m,syncedToCloud:!0})});const u=p.tombstones||[],c=new Set(u.map(m=>m.id));(p.sets||[]).forEach(m=>{if(m.deletedAt)c.add(m.id);else{const y=d.get(m.id),x=m.lastModified||(m.updatedAt?new Date(m.updatedAt).getTime():0),S=y?.lastModified||0;(!y||x>=S)&&d.set(m.id,{id:m.id,name:m.name,lastModified:x,genre:m.genre,mood:m.mood,key:m.key,scaleType:m.scaleType,bpm:m.bpm,showTheory:m.showTheory,chords:Array.isArray(m.chords)?m.chords:[],syncedToCloud:!0})}}),c.forEach(m=>{d.delete(m)});const g=Array.from(d.values());Te.setProjects(g);const l=this.getTombstones(),h=new Set(s.map(m=>m.id)),f=l.filter(m=>!h.has(m.id));this.setTombstones(f),(p.lastSyncTime||p.syncedAt)&&this.setLastSyncTime(p.lastSyncTime||p.syncedAt),this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(o){console.warn("Cloud sync encountered an error, transitioning to offline status:",o),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const D=new Dn;let Ot=null,pt=null,ht=null,ut=null,ze=null,Mt=null,$t=null,Dt=null,Ye=null,Bt=null,Ft=null,Pt=null,Ut=null,We=null,Ke=null,Xe=null,Qe=null,Ze=null,Rt=null,Lt=null,zt=null,et=null,tt=null,jt=null,_t=null,it=null,Gt=null,Vt=null;function Gi(){return Ot||(Ot=new _i({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Ot}let nt="Warm",Ce=null,qt=null,be=null,Ht=null,ot=null,ye=null,Jt=null,Yt=null,Wt=null,xe=null;function Ne(){if(!Ce){Ce=new He(1);const t=Gi();qt=new Z({frequency:3200,type:"lowpass",rolloff:-12}),be=new He(1),qt.connect(be),be.connect(t),Ce.connect(qt),Ht=new $e({high:3.5,mid:0,low:-.5,highFrequency:4500}),ot=new de({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{ot.start()}catch{}ye=new He(0),Ht.connect(ot),ot.connect(ye),ye.connect(t),Ce.connect(Ht),Jt=new Z({frequency:1800,type:"bandpass",Q:.8}),Yt=new De({frequency:.5,depth:.1,wet:.4}),Wt=new pe({distortion:.1,wet:.15}),xe=new He(0),Jt.connect(Yt),Yt.connect(Wt),Wt.connect(xe),xe.connect(t),Ce.connect(Jt)}return Ce}function Ee(t){Ne();const e=t?t.toLowerCase().trim():"warm";nt=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const i=.05,n=ui();try{be&&ye&&xe&&(nt==="Warm"?(be.gain.rampTo(1,i,n),ye.gain.rampTo(0,i,n),xe.gain.rampTo(0,i,n)):nt==="Glassy"?(be.gain.rampTo(0,i,n),ye.gain.rampTo(1,i,n),xe.gain.rampTo(0,i,n)):nt==="Dusty"&&(be.gain.rampTo(0,i,n),ye.gain.rampTo(0,i,n),xe.gain.rampTo(1,i,n)))}catch(o){console.warn("Failed to ramp master tone:",o)}}function Bn(t="Warm",e){const i=t?t.toLowerCase().trim():"warm",n=e??xn();if(i==="glassy"){const s=new $e({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new de({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return s.connect(r),r.connect(n),s}if(i==="dusty"){const s=new Z({frequency:1800,type:"bandpass",Q:.8}),r=new De({frequency:.5,depth:.1,wet:.4}),a=new pe({distortion:.1,wet:.15});return s.connect(r),r.connect(a),a.connect(n),s}const o=new Z({frequency:3200,type:"lowpass",rolloff:-12});return o.connect(n),o}const Kt=typeof import.meta<"u"&&"./"||"./",It=Kt.endsWith("/")?Kt:`${Kt}/`,Vi={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},Fn=`${It}audio/samples/grand-piano/`,qi={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},Pn=`${It}audio/samples/stage-rhodes/`,Hi={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},Un=`${It}audio/samples/nylon-guitar/`,Ji={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},Rn=`${It}audio/samples/jazz-guitar/`;function Ln(t="piano"){let e=null,i={};if(t==="jazz-guitar"?(e=ze,i=Ji):t==="guitar"?(e=ut,i=Hi):t==="rhodes"||t==="epiano"?(e=ht,i=qi):(e=pt,i=Vi),!e||!e.loaded)return null;const n=e._buffers;if(!n)return null;const o={};for(const s of Object.keys(i))try{const r=ri(s).toMidi(),a=n.has(r)?n.get(r):n.has(s)?n.get(s):null;a&&typeof a.get=="function"&&a.get()&&(o[s]=a.get())}catch{}return Object.keys(o).length>0?o:null}async function zn(t="piano"){const e=_n(t);if(e.loaded)return e;try{return await Promise.race([ji(),new Promise((i,n)=>setTimeout(()=>n(new Error("Sample load timeout")),3e3))]),e}catch(i){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,i),null}}function Yi(){return pt||(pt=new le({urls:Vi,baseUrl:Fn,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(Ne())),pt}function Wi(){return ht||(ht=new le({urls:qi,baseUrl:Pn,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(Ne())),ht}function Ki(){return ut||(ut=new le({urls:Hi,baseUrl:Un,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(Ne())),ut}function Xi(){if(!ze){const t=Ne();Mt=new $e({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),$t=new Z({frequency:2800,type:"lowpass",rolloff:-12}),Dt=new ae({decay:1.8,preDelay:.02,wet:.18}),ze=new le({urls:Ji,baseUrl:Rn,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),ze.connect(Mt),Mt.connect($t),$t.connect(Dt),Dt.connect(t)}return ze}function jn(){if(!Ze){const t=Ne();Rt=new De({frequency:.45,depth:.18,wet:.65}),Lt=new pe({distortion:.12,wet:.18}),zt=new Z({frequency:3400,type:"lowpass",rolloff:-12}),et=new de({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{et.start()}catch{}Ze=new V(Me,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),Ze.connect(Rt),Rt.connect(Lt),Lt.connect(zt),zt.connect(et),et.connect(t)}return Ze}function _n(t){return t==="jazz-guitar"?Xi():t==="guitar"?Ki():t==="rhodes"||t==="epiano"?Wi():Yi()}function Gn(t){const e=Ne();switch(t){case"organ":return Ye||(Bt=new De({frequency:5.8,depth:.12,wet:.55}),Ft=new pe({distortion:.08,wet:.15}),Pt=new Z({frequency:4500,type:"lowpass",rolloff:-12}),Ye=new V(re,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),Ye.connect(Bt),Bt.connect(Ft),Ft.connect(Pt),Pt.connect(e)),Ye;case"pad-strings":if(!Ke){Ut=new ae({decay:5.5,preDelay:.03,wet:.45}),We=new de({frequency:.45,delayTime:4,depth:.5,wet:.4});try{We.start()}catch{}Ke=new V(re,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),Ke.connect(We),We.connect(Ut),Ut.connect(e)}return Ke;case"juno-pad":if(!Qe){Xe=new de({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{Xe.start()}catch{}Qe=new V(Me,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),Qe.connect(Xe),Xe.connect(e)}return Qe;case"stab":return tt||(jt=new pe({distortion:.1,wet:.12}),_t=new ae({decay:1,wet:.22}),tt=new V(Me,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),tt.connect(jt),jt.connect(_t),_t.connect(e)),tt;case"bell":return it||(Gt=new $e({high:3.5,mid:-.5,low:-2,highFrequency:4800}),Vt=new ae({decay:3.2,wet:.32}),it=new V(ai,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),it.connect(Gt),Gt.connect(Vt),Vt.connect(e)),it;case"guitar":return Ki();case"jazz-guitar":return Xi();case"sh101":return jn();case"rhodes":case"epiano":return Wi();case"piano":default:return Yi()}}const ie=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],wi={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function ce(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(wi[e])return wi[e];const i=ie.find(n=>n.name.toLowerCase()===e);return i?i.name:"Grand Piano"}const Fe=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],kt={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},Qi={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}};function Zi(){return Promise.race([ji(),new Promise(t=>setTimeout(t,80))])}function en(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function tn(t,e){const i=[];for(let n=0;n<e;n++)for(const o of t){const s=o.match(/^([A-G]#?)(-?\d+)$/);if(s){const r=s[1],a=parseInt(s[2],10)+n;i.push(`${r}${a}`)}else i.push(o)}return i}function nn(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const Ii={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function Vn(t){if(!t)return;const e=t.toLowerCase().trim();return Ii[e]?Ii[e]:ie.find(n=>n.name.toLowerCase()===e||n.instrument.toLowerCase()===e)?.name}function qn(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Fe.find(n=>n.name.toLowerCase()===e)?.name??"Block chords"}function Hn(t,e=.7,i,n="piano",o){try{Promise.all([zi(),Zi()]).then(()=>{const s=Gn(n);if(o&&typeof o=="object"&&Object.keys(o).length>0)try{typeof s.set=="function"&&s.set(o)}catch(g){console.warn("Failed to apply customConfig to Tone.js instrument:",g)}const r=t.length,a=r<=1?1:Math.max(.4,1/Math.sqrt(r)),p=ui();if(i&&i.arpMode&&i.arpMode!=="off"){const g=i.bpm??80,l=i.arpRate??"1/16",h=i.arpRange??1,f=i.arpMode,m=en(l,g),y=tn(t,h),x=nn(y,f),S=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*a:a,N=i.duration?i.duration*(1+(Math.random()-.5)*.1*(i.humanVariance??0)):Math.max(.05,m*.9);x.forEach((A,E)=>{const L=i.microTiming?(Math.random()-.5)*i.microTiming*.02:0;s.triggerAttackRelease(A,N,p+E*m+L,S())});return}const d=n==="guitar"||n==="jazz-guitar",u=n==="jazz-guitar";(d?[...t].sort((g,l)=>{try{return ri(g).toMidi()-ri(l).toMidi()}catch{return 0}}):t).forEach((g,l)=>{let h=0,f=a,m=e;if(i){const{minVelocity:y,maxVelocity:x,spread:S,microTiming:N,humanVariance:A,duration:E}=i;f=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(y+Math.random()*(x-y))/127)*a;const z=d?l*(u?.018:.024):0,P=l*(S??.3)*.1,j=(Math.random()-.5)*(N??0)*.05,q=(Math.random()-.5)*(A??0)*.03;h=Math.max(0,z+P+j+q),m=(E||e)*(1+(Math.random()-.5)*.2*(A??0))}else d&&(h=l*(u?.018:.024));d&&l===0&&(f=Math.min(1,f*(u?1.05:1.1))),s.triggerAttackRelease(g,m,p+h,f)})}).catch(s=>{console.warn("Audio playback gesture failed:",s)})}catch(s){console.warn("Audio playback failed:",s)}}function on(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const i=[...t],o=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(o){const s=parseInt(o[2],10);i.push(`${o[1]}${s+1}`)}return i}function ki(t,e,i){const n=e==="Unknown"||!e?"Pop":e,o=i?.instrument?ce(i.instrument):void 0,s=o?ie.find(m=>m.name.toLowerCase()===o.toLowerCase()):void 0,r=i?.playStyle?Fe.find(m=>m.name===i.playStyle):void 0,a=s?.instrument??kt[n]??"piano",p=Qi[n]||{},d=r?.patch??{};i?.feelSettings?.tone&&Ee(i.feelSettings.tone);const u={};if(i?.feelSettings){const{spread:m,swing:y,humanState:x}=i.feelSettings;x?Object.assign(u,x):(typeof m=="number"&&(u.spread=parseFloat((m/100*1.5).toFixed(2))),typeof y=="number"&&(u.microTiming=parseFloat((y/100*.9).toFixed(2)),u.humanVariance=parseFloat((y/100*.6).toFixed(2))))}const c={...p,...d,...u,bpm:i?.bpm??p.bpm??90,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},g=i?.duration??p.duration??.9,l=d.durationMultiplier?g*d.durationMultiplier:g,h=i?.feelSettings?.density??50,f=on(t,h);Hn(f,l,c,a,i?.customConfig)}let Xt=null;function Jn(){if(!Xt){const t=Gi();Xt=new re({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return Xt}function Yn(t,e=.8,i,n=.85){try{Promise.all([zi(),Zi()]).then(()=>{const o=Jn(),r=`${t.replace(/\d+$/,"")}1`,a=typeof i=="number"?i:ui();o.triggerAttackRelease(r,e,a,n)}).catch(o=>console.warn("Sub bass audio failed:",o))}catch(o){console.warn("Sub bass audio failed:",o)}}function Wn(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},n=4,o=(Array.isArray(t)?t:[]).filter(d=>typeof d=="string"&&d.trim().length>0).map(d=>d.replace(/\d+$/,""));if(o.length===0)return["C4","E4","G4"];let s=n,r=i[o[0]]??0;const a=[];o.forEach((d,u)=>{const c=i[d]??0;u>0&&c<=r&&s++,a.push({name:d,oct:s}),r=c});const p=(e||"").toLowerCase();if(p.includes("octave")||p.includes("high"))return a.map(d=>`${d.name}${d.oct+1}`);if(p.includes("inversion")||p.includes("1st")){if(a.length>1){const[d,...u]=a;return[...u.map(c=>`${c.name}${c.oct}`),`${d.name}${d.oct+1}`]}return a.map(d=>`${d.name}${d.oct}`)}else return a.map(d=>`${d.name}${d.oct}`)}const Kn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Xn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],M={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Qn=new Set(["F","Bb","Eb","Ab","Db","Gb"]),_e=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ee={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},Zn=Object.keys(ee),ft={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Ge={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},Ve={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},bt={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function O(t,e){const i=(t%12+12)%12;return e?Xn[i]:Kn[i]}function J(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let n="C",o=e;if(i&&/[A-G]/.test(i)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(n=`${i}b`,o=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(n=`${i}#`,o=e.slice(2)):(n=i,o=e.slice(1))}o=o.toLowerCase();let s="maj";return o.includes("maj9")||o.includes("m9")&&o.includes("maj")?s="maj9":o.includes("min9")||o.includes("m9")?s="min9":o.includes("dom9")||o.includes("9sus")||o.includes("9")?o.includes("9sus")||o.includes("sus9")?s="sus9":s="dom9":o.includes("m(maj7)")||o.includes("mmaj7")||o.includes("minmaj7")?s="mmaj7":o.includes("maj7sus")||o.includes("7sus")?s="sus7":o.includes("maj7")||o.includes("m7")&&o.includes("maj")?s="maj7":o.includes("min7")||o.includes("m7")?s="min7":o.includes("min6")||o.includes("m6")?s="min6":o.includes("maj6")||o.includes("6")&&!o.includes("m")?s="maj6":o.includes("dim7")?s="dim7":o.includes("dim")||o.includes("°")?s="dim":o.includes("aug")||o.includes("+")?s="aug":o.includes("sus2")?s="sus2":o.includes("sus4")||o.includes("sus")?s="sus4":o.includes("7")?s="dom7":o.includes("min")||o==="m"?s="min":s="maj",{root:n,quality:s}}const eo=Object.keys(bt),Q={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},st={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},Oe={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},Ni={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},sn=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],to={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},io={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},mi={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},yt=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Qt(t){return(yt.find(e=>e.name===t)||yt[0]).dot}const no={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function oo(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function mt(t,e){const i=t.reduce((o,s)=>o+e(s),0);let n=Math.random()*i;for(const o of t)if(n-=e(o),n<=0)return o;return t[t.length-1]}function so(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const li=4,Nt=1,qe=8,ro={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function ao(t,e="MAJOR",i="Pop",n="Uplifting"){let s={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(s*=1.4),t==="SUBTONIC"&&(s*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(s*=1.8),t==="SUBDOMINANT"&&(s*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(s*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(s*=2),t==="SUBMEDIANT"&&(s*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(s*=2.5),t==="SUBDOMINANT"&&(s*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(s*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(s*=2.2),t==="SUBDOMINANT"&&(s*=1.8),t==="SUBMEDIANT"&&(s*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(s*=2.5),n==="Uplifting"||n==="Epic"||n==="Peaceful"?t==="TONIC"&&(s*=2.5):n==="Melancholy"||n==="Dark"?(t==="SUBMEDIANT"&&(s*=2.2),t==="SUPERTONIC"&&(s*=1.5)):n==="Dreamy"||n==="Nostalgic"||n==="Warm"?(t==="SUBDOMINANT"&&(s*=2),t==="SUBMEDIANT"&&(s*=1.6),t==="MEDIANT"&&(s*=1.4)):n==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(s*=1.8):(n==="Groovy"||n==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(s*=1.8),(mi[n]||[]).includes(t)&&(s*=1.3),Math.max(.01,s)}function Zt(t,e,i="MAJOR",n="Pop",o="Uplifting"){if(t===e)return .05;let r=(ro[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),n==="Jazz-ish"||n==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(n==="House/Dance"||n==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(mi[o]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function lo(t,e,i,n,o,s,r=li){let a=i.filter(c=>t.degrees[c]);a.length||(a=i);const p=mt(a,c=>ao(c,t.type,o,s))||"TONIC",d=[p];let u=p;for(let c=1;c<r;c++){const g=c===r-1;let l=i.filter(m=>t.degrees[m]);l.length||(l=i);const h=l.filter(m=>m!==u),f=h.length?h:l;if(g){const m=mt(f,y=>{const x=Zt(y,d[0],t.type,o,s),S=Zt(u,y,t.type,o,s);return x*S});d.push(m)}else{const m=f.filter(S=>!d.includes(S)),y=m.length?m:f,x=mt(y,S=>Zt(u,S,t.type,o,s));u=x,d.push(x)}}return d}function St(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function R(t,e){const{root:i,quality:n}=J(t),o=M[i]??0,s=ee[n]||ee.maj,r=St(i,n,e);return s.map(a=>O(o+a,r))}async function co(){const t=typeof import.meta<"u"?"./":"/",i=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let n=await fetch(i).catch(()=>null);if((!n||!n.ok)&&(n=await fetch("/chroma_chords_data.json").catch(()=>null)),(!n||!n.ok)&&(n=await fetch("./chroma_chords_data.json").catch(()=>null)),!n||!n.ok)throw new Error(`HTTP error: ${n?n.status:"failed to fetch chroma_chords_data.json"}`);const o=await n.json();return bo(o),o}const po={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},ho={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},uo={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},mo={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},go={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},fo={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function bo(t){const e=[["MIXOLYDIAN",po],["DORIAN",ho],["LYDIAN",uo]];for(const[i,n]of e)for(const[o,s]of Object.entries(n)){const r=t.scales[`${s}_MAJOR`];if(!r)continue;const a=`${o}_${i}`,p={};for(const d of fo[i]){const u=go[`${i}_${d}`],c=r.degrees[u];if(!c)continue;const g=JSON.parse(JSON.stringify(c));g.next_chord_options=(g.next_chord_options||[]).map(l=>{if(l.nodeId.startsWith(`${s}_MAJOR_`)){const h=l.nodeId.replace(`${s}_MAJOR_`,""),f=mo[`${i}_${h}`];if(f)return{name:l.name,nodeId:`${o}_${i}_${f}`}}return l}),p[d]=g}t.scales[a]={root:o,type:i,degrees:p}}}const yo=[156,192,236],xo=[242,115,95];function gt(t,e,i){return t+(e-t)*i}function Pe(t){const e=Math.max(0,Math.min(1,t));return"#"+yo.map((n,o)=>Math.round(gt(n,xo[o],e))).map(n=>n.toString(16).padStart(2,"0")).join("")}function H(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(gt(84,128,e)),radius:Math.round(gt(40,12,e)),fontSize:Math.round(gt(21,30,e)),color:Pe(e)}}function xt(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function rn(t,e,i,n){const s=i.degrees[e].chord_name,r=Ve[e]??.5,a=bt[i.type]||bt.MAJOR;return{name:Si(s),tag:ft[e]||"move",roman:a[e]||"?",color:Pe(r),functionLabel:Ge[e]||e,notes:R(s,n),scaleLabel:`${i.root} ${Q[i.type]||i.type}`,desc:xt(Ge[e]||e,Q[i.type]||i.type,Si(s)),degree:e,scaleKey:t,tension:r}}function Si(t){const{root:e,quality:i}=J(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[i]??""}`}const vo={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function an(t,e){let i=vo[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function ci(t,e,i,n){const o=Math.max(Nt,Math.min(qe,n?.length??li)),s=to[e]||"MAJOR",r=io[i],a=n?.scaleType||(r&&s==="MAJOR"?r:s);let p=n?.key&&_e.includes(n.key)?n.key:so(_e),d=`${p}_${a}`;t.scales[d]||(p="C",d=`${p}_${a}`);let u=t.scales[d];if(!u){const S=Object.keys(t.scales).find(N=>N.endsWith(`_${a}`))||Object.keys(t.scales)[0];u=t.scales[S],p=u?u.root:"C",d=S}const c=B(p,a),g=Object.keys(u.degrees),l=mi[i]||[],h=no[a]||[],f=o===li?h.filter(S=>S.degrees.every(N=>g.includes(N))):[],x=(f.length&&Math.random()<.25?mt(f,S=>oo(S,l)).degrees:lo(u,d,g,l,e,i,o)).map(S=>rn(d,S,u,c));return{genre:e,mood:i,key:p,scaleType:a,bpm:an(e,i),chords:x}}const wo={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},Io={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function ln(t){return ee[t]?t:J(`C${t||""}`).quality}function gi(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function vt(t,e){const i=wo[t]||{upper:"I",lower:"i"},o=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return gi(o,e)}function Tt(t,e){const i=Io[(t%12+12)%12]||{upper:"?",lower:"?"},o=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?i.lower:i.upper;return gi(o,e)}function ko(t,e,i,n){const o=e==="maj"||e==="dom7"||e==="dom9",s=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&o)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&o)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&o)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&s)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=Ve[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${i} adds chromatic color to the ${n.root} ${Q[n.type]||n.type} progression.`}}function Ct(t,e,i,n){const o=(t%12+12)%12,s=(M[i]??0)+o,a=`${O(s,n)}${fi[e]??e}`;return o===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${a} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:o===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${a} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:o===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${a} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:o===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${a} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${a} borrows its color from outside the current key.`}}function No(t,e,i,n,o){const s=i.degrees[e],{root:r}=J(s.chord_name),a=M[r]??0,p=O(a,o),d=`${p}${fi[n]??n}`,u=St(p,n,o),c=ee[n]?ee[n].map(h=>O(a+h,u)):R(s.chord_name,o),g=vt(e,n),l=ko(e,n,d,i);return{name:d,tag:l.tag,roman:g,color:Pe(l.tension),functionLabel:l.functionLabel,notes:c,scaleLabel:`${i.root} ${Q[i.type]||i.type}`,desc:l.desc,degree:e,scaleKey:t,tension:l.tension}}function So(t,e,i,n,o,s){const r=`${e}_${i}`,a=t.scales[r];if(!a||!n.length)return null;const p=B(e,i),d=M[e]??0,u={};Object.entries(a.degrees).forEach(([g,l])=>{const{root:h}=J(l.chord_name),f=M[h]??0;f in u||(u[f]=g)});const c=n.slice(0,qe).map(({root:g,quality:l})=>{const h=M[g]??d,f=u[h],m=ln(l);if(f){const N=a.degrees[f],{quality:A}=J(N.chord_name);return m===A||!l&&A?rn(r,f,a,p):No(r,f,a,m,p)}const y=(h-d+12)%12,x=Ct(y,m,e,p),S=Tt(y,m);return To(e,y,m,x.functionLabel,S,x.tag,p)});return c.length<Nt?null:{genre:o,mood:s,key:e,scaleType:i,bpm:an(o,s),chords:c}}const fi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function To(t,e,i,n,o,s,r){const a=(M[t]??0)+e,p=O(a,r),d=ln(i),u=`${p}${fi[d]??d}`,c=St(p,d,r),g=(ee[d]||ee.maj).map(f=>O(a+f,c)),l=o==="?"?Tt(e,d):o,h=.42;return{name:u,tag:s,roman:l,color:Pe(h),functionLabel:n==="Borrowed"?Ct(e,d,t,r).functionLabel:n,notes:g,scaleLabel:"Borrowed",desc:`${u} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:h}}function di(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}function Co(t){const e=(t||"C").trim(),i=e[0]?.toUpperCase()||"C";let n=i,o=e.slice(1);if(e.length>1){const s=e[1];s==="b"||s==="B"||s==="♭"||s==="♭"?(n=`${i}b`,o=e.slice(2)):(s==="#"||s==="♯"||s==="♯")&&(n=`${i}#`,o=e.slice(2))}return{root:n,suffix:o}}function Ao(t,e,i){const{root:n,suffix:o}=Co(t),s=n.replace("♭","b").replace("♯","#"),a=(((M[s]??0)+e)%12+12)%12;return`${O(a,i)}${o}`}function Ti(t,e,i){if(!t||!t.chords||t.chords.length===0)return t;const n=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),o=/\bmaj\b|major/i.test(e),s=n&&!o,r=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),a=i||(s?"NATURAL_MINOR":o?"MAJOR":t.scaleType||"MAJOR"),p=r,d=(t.key||"C").replace("♭","b").replace("♯","#").trim(),u=M[d]??0,c=M[p]??0,g=((c-u)%12+12)%12,l=B(p,a),h=`${p}_${a}`,f=Oe[a]||Oe.MAJOR,m=t.chords.map(y=>{const x=Ao(y.name,g,l),{root:S,quality:N}=J(x),E=(((M[S]??0)-c)%12+12)%12;let L=null;for(const[_,W]of Object.entries(f))if(W===E){L=_;break}let z,P,j=y.tag||"move",q=y.tension,G=y.degree;if(L)G=L,z=vt(G,N),P=Ge[G]||G,j=ft[G]||j,q=Ve[G]??q;else{G="BORROWED",z=Tt(E,N);const _=Ct(E,N,p,l);P=_.functionLabel,j=_.tag||j,q=_.tension||.45}const T=R(x,l);return{...y,name:x,roman:z,functionLabel:P,tag:j,notes:T,degree:G,scaleKey:h,scaleLabel:`${p} ${Q[a]||a}`,desc:xt(P,Q[a]||a,x),tension:q}});return{...t,key:p,scaleType:a,chords:m}}function Eo(t,e,i,n){if(t==="sus4"||t==="sus2"||t==="sus7"||t==="sus9")return t;const o=t.includes("7"),s=t.includes("9"),r=t.includes("6");return e==="min"?s?"min9":o?i==="TONIC"&&(n==="HARMONIC_MINOR"||n==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":r?"min6":"min":e==="maj"?s?i==="DOMINANT"?"dom9":"maj9":o?i==="DOMINANT"?"dom7":"maj7":r?"maj6":"maj":e==="dim"?o?"dim7":"dim":e==="aug"?"aug":e}function Oo(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;default:return`${t}${e}`}}function Mo(t,e){if(!t||!t.chords||t.chords.length===0)return t;const i=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=(e||i).toUpperCase().replace(/\s+/g,"_"),o=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),s=M[o]??0,r=B(o,n),a=`${o}_${n}`,p=st[i]||st.MAJOR,d=Oe[i]||Oe.MAJOR,u=st[n]||st.MAJOR,c=Oe[n]||Oe.MAJOR,g=Ni[n]||Ni.MAJOR,l=t.chords.map(h=>{const{root:f,quality:m}=J(h.name),x=(((M[f]??0)-s)%12+12)%12;let S=-1;if(h.degree&&h.degree!=="BORROWED"&&(S=p.indexOf(h.degree)),S===-1)for(let N=0;N<p.length;N++){const A=p[N];if(d[A]===x){S=N;break}}if(S>=0&&S<u.length){const N=u[S],A=c[N],E=(s+A)%12,L=O(E,r),z=g[N]||"maj",P=Eo(m,z,N,n),j=Oo(L,P),q=R(j,r),G=bt[n]?.[N];let T;if(G)if(P==="maj"||P==="min")T=G;else{const Le=G.replace(/[°+]/g,"");T=gi(Le,P)}else T=vt(N,P);const _=Ge[N]||N,W=ft[N]||h.tag||"move",ge=Ve[N]??h.tension;return{...h,name:j,roman:T,functionLabel:_,tag:W,notes:q,degree:N,scaleKey:a,scaleLabel:`${o} ${Q[n]||n}`,desc:xt(_,Q[n]||n,j),tension:ge}}else{let N=null;for(const[A,E]of Object.entries(c))if(E===x){N=A;break}if(N){const A=vt(N,m),E=Ge[N]||N,L=ft[N]||h.tag||"move",z=Ve[N]??h.tension,P=R(h.name,r);return{...h,roman:A,functionLabel:E,tag:L,notes:P,degree:N,scaleKey:a,scaleLabel:`${o} ${Q[n]||n}`,desc:xt(E,Q[n]||n,h.name),tension:z}}else{const A=Tt(x,m),E=Ct(x,m,o,r),L=R(h.name,r);return{...h,roman:A,functionLabel:E.functionLabel,tag:E.tag||h.tag,tension:E.tension||.45,notes:L,degree:"BORROWED",scaleKey:a,scaleLabel:"Borrowed",desc:`${h.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:n,chords:l}}const Ci={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function cn(t,e,i,n){const o=M[t]??0;let s=Ci[e]||Ci.Major;return i==="6th"?s=[...s,9]:i==="7th (dom / m7)"?s=[...s,10]:i==="Major 7th (M7)"?s=[...s,11]:i==="9th"&&(s=[...s,10,14]),s.map(r=>O(o+r,n))}const $o={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Do={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function dn(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${$o[e]??""}${Do[i]??""}`}const Bo={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},pn={};_e.forEach(t=>{pn[M[t]]=t});function Fo(t,e){const i=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=Bo[i]??0,s=(((M[t]??0)-n)%12+12)%12;return pn[s]??"C"}function B(t,e){const i=Fo(t,e);return Qn.has(i)||i.includes("b")}function ei(t,e,i){const n=di(t.name),o=n.includes("b"),s=dn(n,e,i),r=cn(n,e,i,o);let a=t.roman||"";if(a){const u=a.match(/^([♭♯b#]*)([ivxIVX]+)/);if(u){const c=u[1],g=u[2],l=e==="Minor"||e==="Diminished",h=l?g.toLowerCase():g.toUpperCase();let f="";e==="Diminished"?f=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?f="sus4":i==="6th"?f="6":i==="7th (dom / m7)"?f="7":i==="Major 7th (M7)"?f=l?"m(maj7)":"maj7":i==="9th"&&(f=l?"m9":"maj9"),a=`${c}${h}${f}`}}const p=t.initialChord?.tension??t.tension??.1,d=t.initialChord?.color??t.color??Pe(p);return{...t,name:s,notes:r,roman:a,tension:p,color:d}}function U(t,e,i,n,o,s,r,a){const p=dn(t,e,i),d=cn(t,e,i,a);return{name:p,tag:n||"sub",roman:n,color:Pe(r),functionLabel:o,notes:d,scaleLabel:"Substitution",desc:s,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function Ai(t,e,i){const n=M[e.key]??0,o=e.scaleType.includes("MINOR"),s=B(e.key,e.scaleType),r=o?[(()=>{const u=O(n+1,!0),c=U(u,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:c.name,roman:"♭II",notes:c.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:c,tension:.6}})(),(()=>{const u=O(n+5,!0),c=U(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — deeper minor mood",chord:c,tension:.45}})(),(()=>{const u=O(n+10,!0),c=U(u,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:c.name,roman:"v",notes:c.notes,sub:"a step further into shadow — unresolving drift",chord:c,tension:.52}})()]:[(()=>{const u=O(n+8,!0),c=U(u,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:c.name,roman:"♭VI",notes:c.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:c,tension:.5}})(),(()=>{const u=O(n+5,!0),c=U(u,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:c.name,roman:"iv",notes:c.notes,sub:"the minor subdominant — softer, sadder",chord:c,tension:.42}})(),(()=>{const u=O(n+3,!0),c=U(u,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:c.name,roman:"♭III",notes:c.notes,sub:"a step further out — cooler, more remote",chord:c,tension:.58}})()],a=[(()=>{const u=O(n+7,s),c=O(n+2,s),g=U(c,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${u}7 — sharpens the approach`,.82,s);return{name:g.name,roman:"V7/V",notes:g.notes,sub:`aimed at ${u}7 — sharpens the approach`,chord:g,tension:.82}})(),(()=>{const u=O(n+(o?3:9),s),c=O(n+4,s),g=U(c,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${u}m7 — makes it feel arrived at`,.88,s);return{name:g.name,roman:"V7/vi",notes:g.notes,sub:`aimed at ${u}m7 — makes it feel arrived at`,chord:g,tension:.88}})(),(()=>{const u=O(n+1,!0),c=U(u,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:c.name,roman:"subV7",notes:c.notes,sub:"a tritone substitute — slides in sideways",chord:c,tension:.95}})()],p=[(()=>{const u=O(n+5,s),c=U(u,"Major","Major 7th (M7)",o?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,s);return{name:c.name,roman:"IV",notes:c.notes,sub:"floats rather than resolving",chord:c,tension:.3}})(),(()=>{const u=O(n,s),c=U(u,o?"Minor":"Major","9th",o?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,s);return{name:c.name,roman:o?"im9":"Imaj9",notes:c.notes,sub:"the same home with more air in it",chord:c,tension:.18}})(),(()=>{const u=O(n+(o?3:4),s),c=U(u,o?"Major":"Minor","7th (dom / m7)",o?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,s);return{name:c.name,roman:o?"♭III":"iii",notes:c.notes,sub:"wistful, halfway between home and away",chord:c,tension:.35}})()],d=[(()=>{const u=O(n,s),c=U(u,o?"Minor":"Major",o?"None":"Major 7th (M7)",o?"i":"I","Tonic","full resolution — the sense of arriving",.05,s);return{name:c.name,roman:o?"i":"I",notes:c.notes,sub:"full resolution — the sense of arriving",chord:c,tension:.05}})(),(()=>{const u=O(n+7,s),c=U(u,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,s);return{name:c.name,roman:"V7",notes:c.notes,sub:"the pull that makes home feel earned",chord:c,tension:1}})(),(()=>{const u=O(n+(o?8:9),s),c=U(u,o?"Major":"Minor","7th (dom / m7)",o?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,s);return{name:c.name,roman:o?"♭VI":"vi",notes:c.notes,sub:"a soft landing instead of a full stop",chord:c,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:a},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:p},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:d}]}function Ei(t,e,i){const n=M[e.key]??0,o=e.scaleType.includes("MINOR"),s=B(e.key,e.scaleType),r=e.chords;if(o){const f=r[0]?.name||"chord 1",m=r[1]?.name||"chord 2",y=r[2]?.name||"chord 3",x=r[3]?.name||"chord 4",S=U(O(n,s),"Major","None","I","Major tonic","same root, turned bright",.2,s),N=U(O(n+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s),A=U(O(n+9,s),"Minor","None","vi","Submediant","melodic lift upward",.4,s),E=U(O(n+11,s),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,s);return[{name:S.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:S.notes,chord:S,tension:.2},{name:N.name,sub:`in place of ${m} · the Dorian lift, sunny and open`,roman:"IV",notes:N.notes,chord:N,tension:.35},{name:A.name,sub:`in place of ${y} · melodic lift upward`,roman:"vi",notes:A.notes,chord:A,tension:.4},{name:E.name,sub:`in place of ${x} · classical harmonic pull`,roman:"vii°",notes:E.notes,chord:E,tension:.55}]}const a=r[0]?.name||"chord 1",p=r[1]?.name||"chord 2",d=r[2]?.name||"chord 3",u=r[3]?.name||"chord 4",c=U(O(n,s),"Minor","None","i","Tonic minor","same root, turned sad",.3,s),g=U(O(n+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),l=U(O(n+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),h=U(O(n+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:c.name,sub:`in place of ${a} · same root, turned sad`,roman:"i",notes:c.notes,chord:c,tension:.3},{name:g.name,sub:`in place of ${p} · the lift, but heavier`,roman:"iv",notes:g.notes,chord:g,tension:.4},{name:l.name,sub:`in place of ${d} · big and cinematic`,roman:"♭VI",notes:l.notes,chord:l,tension:.45},{name:h.name,sub:`in place of ${u} · lands sideways, not home`,roman:"♭VII",notes:h.notes,chord:h,tension:.5}]}const Po={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Uo={m8:43303,circuit:43302};function Ro(t,e,i){let n=Po[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(n=`http://localhost:${Uo[e]}/`);const o=i&&i.length>0?i.map(r=>t.chords[r]).filter(r=>!!r):t.chords,s=o.map(r=>encodeURIComponent(r.name)).join("+");if(e==="circuit"){const r=u=>{const c=(u||"").toLowerCase();return c.includes("octave")||c.includes("high")||c.includes("up")?"octave":c.includes("inversion")||c.includes("1st")?"1st":"root"},a=o.map(u=>r(u.voicing)).join("+"),p=encodeURIComponent(t.key||"C"),d=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${n}?p=${s}&v=${a}&key=${p}&scale=${d}`}return`${n}?p=${s}`}const Lo={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function zo(t,e){const{root:i,quality:n}=J(t),o=M[i]??0,s=ee[n]||ee.maj,r=St(i,n,e);return s.map(a=>{const p=O(o+a,r),d=Lo[a]||{symbol:`+${a}`,name:`Interval ${a}`,isGuideTone:!1};return{note:p,intervalSymbol:d.symbol,roleName:d.name,isGuideTone:d.isGuideTone}})}function jo(t){if(!t||t.length<2)return[];const e=[],i=n=>n.replace(/[^A-Za-z♭♯]/g,"");for(let n=0;n<t.length;n++){const o=n,s=(n+1)%t.length,r=t[o],a=t[s],p=i(r.roman),d=i(a.roman),u=o+1,c=s+1,g=`Bar ${u} → ${c}`,l=`${r.name} → ${a.name}`,h=`${r.roman}–${a.roman}`;(p==="V"||p==="v")&&(d==="I"||d==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name}):(p==="IV"||p==="iv")&&(d==="I"||d==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name}):(p==="V"||p==="v")&&(d==="vi"||d==="♭VI"||d==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name}):p==="♭VII"&&(d==="I"||d==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${a.name} (♭VII–${a.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name}):(d==="V"||d==="v")&&p!=="V"&&p!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${a.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,move:l,degrees:h,bars:g,fromBar:u,toBar:c,fromChord:r.name,toChord:a.name})}return e}function _o(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const n=i,o=(i+1)%t.length,s=t[n],r=t[o],a=new Set(s.notes.map(m=>M[m]??0)),p=r.notes.filter(m=>a.has(M[m]??-1)),d=M[di(s.name)]??0,u=M[di(r.name)]??0,c=Math.min((u-d+12)%12,(d-u+12)%12);let g="Harmonic Shift";p.length>=2?g=`Strong Common Tones (${p.length} shared)`:c<=2?g="Stepwise Bass Motion":(c===5||c===7)&&(g="4th / 5th Cycle Jump");const l=`Bar ${n+1} → ${o+1}`,h=`${s.name} → ${r.name}`,f=p.length?`${p.join(" · ")} held over`:c<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:n+1,toBar:o+1,fromChord:s.name,toChord:r.name,move:l,chords:h,link:f,hasShared:p.length>0,commonNotes:p,semitoneDistance:c,motionType:g})}return e}function pi(t,e=4){const i=Array.isArray(t)?t.filter(c=>typeof c=="string"&&c.trim().length>0):[];if(i.length===0)return[];const n={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=i.map(c=>c.replace(/\d+$/,"")),s=o[0],r=n[s]??0;let a=e,p=r;const d=[];return o.forEach((c,g)=>{const l=n[c]??0;g>0&&l<=p&&a++,d.push(`${c}${a}`),p=l}),[`${s}${e-1}`,...d]}class Go{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?this.order=i||Array.from({length:e.chords.length},(n,o)=>o):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const i=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,e)),n=Math.max(1,this.barsPerChord);return Math.round(n*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let i=0;for(let n=0;n<this.sections.length;n++){const o=this.sections[n].order.length;if(e<i+o){this.activeSectionIndex=n;const s=e-i;this.activeIndex=this.sections[n].order[s]??0,this.progressStep=s;return}i+=o}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay();const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}setABOverride(e,i,n="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:n}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,n=e.progression.chords[i];if(n){const o=n.notes&&n.notes.length>0?n.notes:R(n.name,B(e.progression.key,e.progression.scaleType)),s=pi(o,4);ki(s,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0,feelSettings:this.feelSettings})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let n=Array.isArray(i.notes)?i.notes:[];if(n.length===0||!n.every(o=>typeof o=="string"&&o.trim().length>0)){const o=i.name||"CMAJ",s=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";n=R(o,B(s,r))}i.voicing?this.playChordNotes(n,1.2,i.voicing):this.playChordNotes(n,1.2),this.subBassEnabled&&n.length>0&&Yn(n[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let n=Array.isArray(e.notes)?e.notes:[];if(n.length===0||!n.every(o=>typeof o=="string"&&o.trim().length>0)){const o=e.name||"CMAJ",s=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";n=R(o,B(s,r))}e.voicing?this.playChordNotes(n,i,e.voicing):this.playChordNotes(n,i)}playChordAtIndex(e,i=.8,n,o){if(!this.progression||!this.progression.chords[e])return;const s=this.progression.chords[e];let r=Array.isArray(s.notes)?s.notes:[];if(r.length===0||!r.every(p=>typeof p=="string"&&p.trim().length>0)){const p=s.name||"CMAJ",d=this.progression.key||"C",u=this.progression.scaleType||"MAJOR";r=R(p,B(d,u))}const a=n||s.voicing;a!==void 0?this.playChordNotes(r,i,a,o):this.playChordNotes(r,i)}playChordNotes(e,i,n,o){if(!this.progression)return;const s=Array.isArray(e)?e.filter(a=>typeof a=="string"&&a.trim().length>0):[];if(s.length===0)return;const r=n?Wn(s,n):pi(s,4);ki(r,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0,velocity:o,feelSettings:this.feelSettings})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const w=new Go,Vo=yt.map(t=>t.name),qo=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Ho(t,e){const i=t.length+1,n=e.length+1,o=Array.from({length:i},()=>new Array(n).fill(0));for(let s=0;s<i;s++)o[s][0]=s;for(let s=0;s<n;s++)o[0][s]=s;for(let s=1;s<i;s++)for(let r=1;r<n;r++)o[s][r]=t[s-1]===e[r-1]?o[s-1][r-1]:1+Math.min(o[s-1][r-1],o[s-1][r],o[s][r-1]);return o[i-1][n-1]}function ve(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const n=i.toLowerCase(),o=e.find(p=>p.toLowerCase()===n);if(o)return o;let s=null,r=1/0;for(const p of e){const d=Ho(n,p.toLowerCase());d<r&&(r=d,s=p)}const a=Math.max(2,Math.floor(n.length*.4));return r<=a?s:null}function Jo(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const n=i,o=ve(n.root,_e),s=ve(n.quality,Zn);o&&s&&e.push({root:o,quality:s})}if(e.length)return e.slice(0,qe)}function Yo(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=ve(e.presetId,qo)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const n=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:n}}function ti(t,e){const i=t&&typeof t=="object"?t:{},n=ve(i.genre,sn)??e.genre,o=ve(i.mood,Vo)??e.mood,s=ve(i.key,_e)??void 0,r=ve(i.scaleType,eo)??void 0,a=s&&r?Jo(i.chords):void 0;let p;typeof i.length=="number"&&Number.isFinite(i.length)&&(p=Math.max(Nt,Math.min(qe,Math.round(i.length))));const d=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,u=Yo(i.instrumentConfig),c=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:n,mood:o,key:s,scaleType:r,length:p,chords:a,rhythmStyle:d,instrumentConfig:u,_rateLimit:c}}const Wo=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Ko="chroma-chords-llm-provider",Xo="chroma-chords-llm-model";function Qo(){const t=localStorage.getItem(Ko);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Zo(){const t=localStorage.getItem(Xo);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:Wo[0].id}const ii={genre:sn[0],mood:yt[0].name},es="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",ts=12e3,hn={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},un={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function wt(t,e){const i=t.toLowerCase();let n=null,o=0;return Object.keys(e).forEach(s=>{const r=e[s].reduce((a,p)=>a+(i.includes(p)?1:0),0);r>o&&(o=r,n=s)}),n}function is(t){const e=wt(t,un),i=wt(t,hn);return!e||!i?null:{genre:e,mood:i}}async function ns(t){const e=new AbortController,i=setTimeout(()=>e.abort(),ts);try{const o=await fetch(es,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Qo(),model:Zo()}),signal:e.signal}),s=await o.json().catch(()=>null);if(!o.ok||s&&typeof s=="object"&&"error"in s){const r=s&&typeof s=="object"&&"error"in s?String(s.error):`HTTP ${o.status}`,a=new Error(`Classifier request failed: ${r}`);throw s&&typeof s=="object"&&"_rateLimit"in s&&(a._rateLimit=s._rateLimit),a}return s}finally{clearTimeout(i)}}async function os(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const o=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),s=wt(o,un)??"Synthwave",r=wt(o,hn)??"Dreamy",a={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},p={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},d={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},u=d[s]||d._default,c=a[s]||"rhodes",g=p[s]||"slow_arpeggio",l={genre:s,mood:r,key:u.key,scaleType:u.scaleType,length:8,chords:u.chords,rhythmStyle:g,instrumentConfig:{presetId:c,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ti(l,{genre:s,mood:r})}const n=is(t);try{const o=await ns(t);return ti(o,n??ii)}catch(o){console.warn("LLM classification failed, falling back to keyword heuristic:",o);const s=ti(n??ii,ii);return o&&typeof o=="object"&&"_rateLimit"in o&&(s._rateLimit=o._rateLimit),s}}class ss{static async resolvePrompt(e,i,n,o,s,r){let a=r||null,p=null,d=null;if(!a&&s&&s.trim().length>0)try{a=await os(s)}catch(g){console.warn("Failed to classify prompt via LLM/local fallback:",g)}const u=!!(a&&a.chords?.length&&a.key&&a.scaleType);let c=null;return u&&a&&a.chords&&a.key&&a.scaleType&&(c=So(e,a.key,a.scaleType,a.chords,a.genre||i,a.mood||n)),c||(c=ci(e,i,n,{length:o})),u&&a&&(a.instrumentConfig?.presetId&&(p=Vn(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(d=qn(a.rhythmStyle)??null)),c.chords.length>o&&(c={...c,chords:c.chords.slice(0,o)}),s&&(c={...c,searchTerm:s}),{progression:c,instrument:p,playStyle:d,normalizedSuggestion:a}}}const rt=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)}];class Ae{static createInitialSong(e,i){const n=i||Array.from({length:e.chords.length},(o,s)=>s);return[{name:rt[0].name,desc:rt[0].desc,progression:e,order:n.slice()}]}static addSection(e,i){if(e.length>=rt.length)return{sections:e,activeIndex:e.length-1};const n=rt[e.length],o=n.reorder(i.chords.length),s={name:n.name,desc:n.desc,progression:i,order:o},r=[...e,s];return{sections:r,activeIndex:r.length-1}}static syncActiveSection(e,i,n,o){if(!e[i])return e;const s=[...e];return s[i]={...s[i],progression:n,order:o.slice()},s}}var rs=Object.defineProperty,as=Object.getOwnPropertyDescriptor,ne=(t,e,i,n)=>{for(var o=n>1?void 0:n?as(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&rs(e,i,o),o};let K=class extends Ie{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.title="Chroma Chords",this.accountMenuOpen=!1,this.unsubscribeProjects=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=D.subscribeProjects(()=>{this.savedCount=D.getProjects().length,this.syncStatus=D.getSyncStatus(),this.requestUpdate()}),this.savedCount=D.getProjects().length}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects()}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onSyncNow(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}render(){const t=(this.userEmail||"U")[0].toUpperCase();return b`
      <div class="header-wrap">
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="24" height="24" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <div class="right-actions">
          ${this.isAuthenticated?b`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">${t}</button>
          `:b`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          `}

          ${this.accountMenuOpen?b`
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
    `}};K.styles=we`
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
  `;ne([C({type:Boolean})],K.prototype,"compact",2);ne([C({type:Boolean})],K.prototype,"isAdmin",2);ne([C({type:Boolean})],K.prototype,"isAuthenticated",2);ne([C({type:String})],K.prototype,"userEmail",2);ne([C({type:Number})],K.prototype,"savedCount",2);ne([C({type:String})],K.prototype,"syncStatus",2);ne([C({type:String})],K.prototype,"title",2);ne([v()],K.prototype,"accountMenuOpen",2);K=ne([ke("app-header")],K);function Oi(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const n=i[1].charAt(0).toUpperCase()+i[1].slice(1),o=e[n]??0,s=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(s+1)*12+o))}function mn(t,e,i,n=1,o){const s=e&&e.length>0?e.map(x=>t.chords[x]).filter(x=>!!x):t.chords,r=t.bpm||120,a=n*240/r,p=i?Fe.find(x=>x.name.toLowerCase()===i.toLowerCase()):void 0,d=Qi[t.genre]||{},u=p?.patch??{},c={...d,...u,...o?.humanState??{}},g=d.duration??.9,l=u.durationMultiplier?g*u.durationMultiplier:g,h=o?.humanState?.strum!==void 0?o.humanState.strum/100*1.5:o?.spread!==void 0?o.spread/100*1.5:d.spread??.3,f=o?.humanState?.swing!==void 0?o.humanState.swing:o?.swing??0,m=o?.density??50,y=[];return s.forEach((x,S)=>{const N=f/100*.04*(S%2===1?1:0),A=S*a+N,E=x.notes&&x.notes.length>0?x.notes:["C","E","G"];let L=pi(E,4);if(L=on(L,m),c.arpMode&&c.arpMode!=="off"){const z=c.arpRate??"1/16",P=c.arpRange??1,j=c.arpMode,q=en(z,r),G=tn(L,P),T=nn(G,j),_=c.duration?c.duration:Math.max(.6,l);T.forEach((W,ge)=>{const Le=A+ge*q;y.push({note:W,midi:Oi(W),startTime:Le,duration:_})})}else{const z=o?.humanState?.instrument||void 0,P=z?ce(z):void 0,j=P?ie.find(T=>T.name.toLowerCase()===P.toLowerCase())?.instrument??"piano":kt[t.genre]??"piano",q=j==="guitar"||j==="jazz-guitar",G=j==="jazz-guitar";L.forEach((T,_)=>{const ge=(q?_*(G?.018:.024):0)+_*h*.1,Le=A+ge;y.push({note:T,midi:Oi(T),startTime:Le,duration:q?Math.max(l,1.2):l})})}}),y}function ls(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function cs(t,e,i,n=1,o){const s=t.bpm||120,r=480,a=mn(t,e,i,n,o),p=[];a.forEach(y=>{const x=Math.round(y.startTime/(60/s)*r),S=Math.max(1,Math.round(y.duration/(60/s)*r));p.push({tick:x,type:"on",midi:y.midi}),p.push({tick:x+S,type:"off",midi:y.midi})}),p.sort((y,x)=>y.tick!==x.tick?y.tick-x.tick:y.type!==x.type?y.type==="off"?-1:1:y.midi-x.midi);const d=[],u=Math.round(6e7/s);d.push(0),d.push(255,81,3),d.push(u>>16&255,u>>8&255,u&255);const c="Chroma Chords";d.push(0),d.push(255,3,c.length);for(let y=0;y<c.length;y++)d.push(c.charCodeAt(y));let g=0;p.forEach(y=>{const x=y.tick-g;g=y.tick,d.push(...ls(x)),y.type==="on"?d.push(144,y.midi,80):d.push(128,y.midi,0)}),d.push(0),d.push(255,47,0);const l=[77,84,104,100,0,0,0,6,0,0,0,1,r>>8&255,r&255],h=d.length,f=[77,84,114,107,h>>24&255,h>>16&255,h>>8&255,h&255],m=new Uint8Array(l.length+f.length+d.length);return m.set(l,0),m.set(f,l.length),m.set(d,l.length+f.length),m}function ds(t,e,i,n,o=1,s){const r=cs(t,e,n,o,s),a=new Blob([r],{type:"audio/midi"}),p=(t.key||"C").toLowerCase(),d=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),u=t.bpm||120,c=`chroma-chords-${p}-${d}-${u}bpm.mid`;gn(a,c)}function ps(t,e,i="Warm",n){const o=new _i({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),s=Bn(i,o),r=t?ce(t):void 0;switch((r?ie.find(d=>d.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(e?kt[e]:void 0)??"piano"){case"bell":{const d=new $e({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(s),u=new ae({decay:3.2,wet:.32}).connect(d);return new V(ai,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(u)}case"organ":{const d=new Z({frequency:4500,type:"lowpass",rolloff:-12}).connect(s),u=new pe({distortion:.08,wet:.15}).connect(d),c=new De({frequency:5.8,depth:.12,wet:.55}).connect(u);return new V(re,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(c)}case"pad-strings":{const d=new ae({decay:5.5,preDelay:.03,wet:.45}).connect(s),u=new de({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(d);return new V(re,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(u)}case"juno-pad":{const d=new de({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(s);return new V(Me,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(d)}case"stab":{const d=new pe({distortion:.1,wet:.12}).connect(s),u=new ae({decay:1,wet:.22}).connect(d);return new V(Me,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(u)}case"jazz-guitar":{const d=new $e({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(s),u=new Z({frequency:2800,type:"lowpass",rolloff:-12}).connect(d),c=new ae({decay:1.8,preDelay:.02,wet:.18}).connect(u);return n&&Object.keys(n).length>0?new le({urls:n,volume:-8}).connect(c):new V(re,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(c)}case"sh101":{const d=new de({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(s),u=new Z({frequency:3400,type:"lowpass",rolloff:-12}).connect(d),c=new pe({distortion:.12,wet:.18}).connect(u),g=new De({frequency:.45,depth:.18,wet:.65}).connect(c);return new V(Me,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(g)}case"guitar":return n&&Object.keys(n).length>0?new le({urls:n,volume:-8}).connect(s):new V(re,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(s);case"rhodes":case"epiano":return n&&Object.keys(n).length>0?new le({urls:n,volume:-10}).connect(s):new V(ai,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(s);case"piano":default:return n&&Object.keys(n).length>0?new le({urls:n,volume:-9}).connect(s):new V(re,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(s)}}function hs(t){const e=t.numberOfChannels,i=t.sampleRate,n=16,o=n/8,s=e*o,r=t.length*e*o,a=new ArrayBuffer(44+r),p=new DataView(a),d=(g,l)=>{for(let h=0;h<l.length;h++)p.setUint8(g+h,l.charCodeAt(h))};d(0,"RIFF"),p.setUint32(4,36+r,!0),d(8,"WAVE"),d(12,"fmt "),p.setUint32(16,16,!0),p.setUint16(20,1,!0),p.setUint16(22,e,!0),p.setUint32(24,i,!0),p.setUint32(28,i*s,!0),p.setUint16(32,s,!0),p.setUint16(34,n,!0),d(36,"data"),p.setUint32(40,r,!0);const u=[];for(let g=0;g<e;g++)u.push(t.getChannelData(g));let c=44;for(let g=0;g<t.length;g++)for(let l=0;l<e;l++){const h=Math.max(-1,Math.min(1,u[l][g])),f=h<0?h*32768:h*32767;p.setInt16(c,f,!0),c+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function us(t,e,i,n,o=1,s){const r=mn(t,e,n,o,s);if(!r.length)return;const a=e&&e.length>0?e.map(A=>t.chords[A]).filter(A=>!!A):t.chords,p=t.bpm||120,d=o*240/p,u=Math.max(.1,a.length*d),c=i?ce(i):void 0,l=(c?ie.find(A=>A.name.toLowerCase()===c.toLowerCase()):void 0)?.instrument??(t.genre?kt[t.genre]:void 0)??"piano";await zn(l);const h=Ln(l),f=s?.tone||"Warm",m=await vn(async()=>{const A=ps(c||i,t.genre,f,h);r.forEach(E=>{E.startTime<u&&A.triggerAttackRelease(E.note,E.duration,E.startTime)})},u),y=hs(m.get()),x=(t.key||"C").toLowerCase(),S=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),N=`chroma-chords-${x}-${S}-${p}bpm.wav`;gn(y,N)}function gn(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const n=document.createElement("a");n.href=i,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),setTimeout(()=>URL.revokeObjectURL(i),1e3)}var ms=Object.defineProperty,gs=Object.getOwnPropertyDescriptor,oe=(t,e,i,n)=>{for(var o=n>1?void 0:n?gs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&ms(e,i,o),o};const fs=Y`
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
`,bs=Y`
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
`,ys=[{device:"m8",mono:"M8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:fs},{device:"circuit",mono:"CT",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:bs}];let X=class extends Ie{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}handleDeviceClick(t){if(!this.progression)return;const e=Ro(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.close()}async handleWavClick(){if(this.progression){this.emit("toast","Generating WAV audio...");try{const t=this.barsPerChord||w.getBarsPerChord()||1,e=this.feelSettings||w.getFeelSettings();await us(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","WAV file downloaded")}catch(t){console.error("WAV export failed",t),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(){if(this.progression){try{const t=this.barsPerChord||w.getBarsPerChord()||1,e=this.feelSettings||w.getFeelSettings();ds(this.progression,this.order,this.instrument,this.playStyle,t,e),this.emit("toast","MIDI file downloaded")}catch(t){console.error("MIDI export failed",t),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return b`
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
            ${ys.map(e=>b`
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
    `}};X.styles=we`
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
  `;oe([C({type:Boolean})],X.prototype,"open",2);oe([C({type:Boolean})],X.prototype,"visible",2);oe([C({type:Object})],X.prototype,"progression",2);oe([C({type:Array})],X.prototype,"order",2);oe([C({type:String})],X.prototype,"instrument",2);oe([C({type:String})],X.prototype,"playStyle",2);oe([C({type:Number})],X.prototype,"barsPerChord",2);oe([C({type:Object})],X.prototype,"feelSettings",2);X=oe([ke("share-modal")],X);var xs=Object.defineProperty,vs=Object.getOwnPropertyDescriptor,me=(t,e,i,n)=>{for(var o=n>1?void 0:n?vs(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&xs(e,i,o),o};function ws(t,e,i){return Math.round(t+(e-t)*i)}function fn(t,e,i){const n=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)),o=[1,3,5].map(s=>parseInt(e.slice(s,s+2),16));return"#"+n.map((s,r)=>ws(s,o[r],i).toString(16).padStart(2,"0")).join("")}function Is(t){const e=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*e[0]+.7152*e[1]+.0722*e[2]}function Mi(t){let i=.3,n=t;for(;i<=.86&&(n=fn(t,"#2E271F",i),!((.925+.05)/(Is(n)+.05)>=4.7));i+=.03);return n}let te=class extends Ie{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC"}onSelectFeel(t){this.activeFeel=t,this.dispatchEvent(new CustomEvent("swap-feel-change",{detail:{feel:t},bubbles:!0,composed:!0}))}onAudition(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onConfirm(){this.dispatchEvent(new CustomEvent("swap-confirm",{bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,i=`calc((100% - ${12*(t-1)}px) / ${t})`,n=this.chord?.tension??.3,o=H(n).color,s=this.feelings.find(y=>y.name===this.activeFeel)||this.feelings[0],r=Math.max(0,this.feelings.findIndex(y=>y.name===s?.name)),a=Math.max(1,this.feelings.length),p=`calc((100% - ${7*(a-1)}px) / ${a})`,d=r===0,u=r===a-1;let c=`left: calc(${p} * ${r} + ${7*r}px); width: ${p};`,g="12px";d&&u?(c="left: 0; right: 0; width: 100%;",g="0 0 12px 12px"):d?(c=`left: 0; width: ${p};`,g="0 12px 12px 12px"):u&&(c=`left: auto; right: 0; width: ${p};`,g="12px 0 12px 12px");const l=s?.tension??.3,h=Mi(H(l).color),f=`Bar ${this.swapIndex+1} · ${this.chord?.name||"Chord"} could feel…`,m=this.pickedChord?`hearing swap: ${this.pickedChord.name}`:"tap to audition in the loop";return b`
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
              <div class="lane-kicker">${f}</div>
              <div style="flex: 1; min-width: 0;"></div>
              <div class="lane-hint">${m}</div>
              <button
                class="lane-close-btn"
                @click=${this.onClose}
                aria-label="Close swap lane"
              >×</button>
            </div>

            <!-- Feelings row -->
            <div class="feelings-row">
              ${this.feelings.map(y=>{const x=y.name===s?.name,S=H(y.tension),N=x?Mi(S.color):fn(S.color,"#FBF6EC",.5);return b`
                  <button
                    class="feel-tile"
                    data-feel-tile="1"
                    data-sel="${x?"1":"0"}"
                    style="
                      background: ${N};
                      border-radius: ${x?"12px 12px 0 0":"12px"};
                      box-shadow: ${x?"none":"inset 0 0 0 1.5px rgba(46,39,31,0.14)"};
                    "
                    @click=${()=>this.onSelectFeel(y.name)}
                  >
                    <span class="feel-tile-name" style="color: ${x?"#FBF6EC":"#2E271F"};">${y.name}</span>
                    <span class="feel-tile-sub" style="color: ${x?"#FBF6EC":"#2E271F"};">${y.sub}</span>
                  </button>
                `})}
            </div>

            <!-- Chords row extruded from active feeling -->
            <div class="chords-shell" data-lane-join="${r}">
              <div
                class="chords-neck"
                style="
                  ${c}
                  background: ${h};
                "
              ></div>

              <div class="chords-box" style="background: ${h}; border-radius: ${g};">
                ${(s?.rows||[]).map(y=>{const x=this.pickedChord?.name===y.name,S=typeof y.tension=="number"?y.tension:l,N=H(S);return b`
                    <button
                      class="chord-pill-btn"
                      style="
                        background: ${x?"#2E271F":"rgba(251, 246, 236, 0.88)"};
                      "
                      @click=${()=>this.onAudition(y,s)}
                      aria-label="Audition ${y.name}"
                    >
                      <span
                        style="
                          width: 9px;
                          height: 9px;
                          border-radius: ${Math.round(N.radius*.25)}px;
                          background: ${N.color};
                          flex-shrink: 0;
                        "
                      ></span>
                      <span
                        class="chord-pill-name"
                        style="color: ${x?"#FBF6EC":"#2E271F"};"
                      >${y.name}</span>
                      ${y.roman?b`
                        <span
                          class="chord-pill-roman"
                          style="color: ${x?"rgba(251,246,236,0.7)":"var(--cv-label)"};"
                        >${y.roman}</span>
                      `:""}
                    </button>
                  `})}

                <div style="flex: 1; min-width: 0;"></div>

                ${this.pickedChord?b`
                  <button
                    class="keep-swap-btn"
                    @click=${this.onConfirm}
                    aria-label="Keep ${this.pickedChord.name}"
                  >
                    Keep ${this.pickedChord.name}
                  </button>
                `:b`
                  <div style="font-size: 11px; font-weight: 700; color: #FBF6EC; opacity: 0.85; white-space: nowrap;">
                    tap to hear it in the loop
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};te.styles=we`
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
  `;me([C({type:Number})],te.prototype,"swapIndex",2);me([C({type:Object})],te.prototype,"chord",2);me([C({type:Array})],te.prototype,"feelings",2);me([C({type:String})],te.prototype,"activeFeel",2);me([C({type:Object})],te.prototype,"pickedChord",2);me([C({type:Number})],te.prototype,"padCols",2);me([C({type:String})],te.prototype,"moodColor",2);te=me([ke("chord-swap-lane")],te);var ks=Object.defineProperty,Ns=Object.getOwnPropertyDescriptor,Ue=(t,e,i,n)=>{for(var o=n>1?void 0:n?Ns(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&ks(e,i,o),o};let he=class extends Ie{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const i=(this.chordIndex%e.length+e.length)%e.length;return e[i]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const i=this.getCurrentFeel(),n=this.getCurrentRow();n&&this.emitAudition(n,i),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const i=this.getCurrentFeel(),n=this.getCurrentRow();n&&this.emitAudition(n,i),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),i=e.rows;if(!i||i.length===0)return;this.chordIndex=(this.chordIndex+1)%i.length;const n=this.getCurrentRow();n&&this.emitAudition(n,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),i=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:i.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),i=t.rows?t.rows.length:0,n=i>0?this.chordIndex%i+1:0,o=H(t.tension);return b`
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
          ${this.feelings.map((s,r)=>b`
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

      ${e?b`
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
            ${e.roman?b`<span class="chord-roman">${e.roman}</span>`:""}
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
    `}};he.styles=we`
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
  `;Ue([C({type:Object})],he.prototype,"originalChord",2);Ue([C({type:Number})],he.prototype,"barIndex",2);Ue([C({type:Array})],he.prototype,"feelings",2);Ue([C({type:Number})],he.prototype,"feelIndex",2);Ue([C({type:Number})],he.prototype,"chordIndex",2);he=Ue([ke("chord-pad-cycler")],he);var Ss=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,k=(t,e,i,n)=>{for(var o=n>1?void 0:n?Ts(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Ss(e,i,o),o};const ni=[{name:"Oasis",color:"#F6D98B",r:10,plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",hoist:["E♭maj7","Fmaj7","A♭"],font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},{name:"Radiohead",color:"#C9A9E0",r:3,plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",hoist:["A♭maj7","E♭maj7","Em7"],font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em"},{name:"Nirvana",color:"#F2A79B",r:2,plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",hoist:["A♭","E♭maj7","B♭"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"0.04em"},{name:"Steely Dan",color:"#9CC0EC",r:13,plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",hoist:["Cmaj9","D♭7","Fm7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,italic:!0,pillFs:13,pillTrack:"0.01em"},{name:"Mac DeMarco",color:"#B8CC9E",r:7,plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",hoist:["Fmaj7","Cmaj9","Em7"],font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12,pillTrack:"-0.01em"}],$i=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"],Di=["Uplifting","Melancholy","Dreamy"],Cs={Uplifting:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5",Melancholy:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15",Dreamy:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0",Tense:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12",Warm:"M12 4 a6.5 6.5 0 1 0 6.5 6.5",Nostalgic:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},fe={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},As=fe,oi=["A","S","D","F","Z","X","C","V"],Es=["Octave up","1st inversion","Low root"];function Bi(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const Os=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Ms=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],Fi=[{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]}],se={swing:0,spread:50,density:50,tone:"Warm"},Pi=["Warm","Glassy","Dusty"],$s=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Ui=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],at=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],si={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},lt={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},Ri=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Li={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},ct={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},dt={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},hi={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},je={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Ds(t){const e=t===""?"maj":t;if(je[5][e]||je[6][e])return e;const i=hi[e];return i&&(je[5][i]||je[6][i])?i:"maj"}function Bs(t){const e=Ds(t.q),i=[];return[[6,4],[5,9]].forEach(([n,o])=>{const s=je[n][e];if(!s)return;const r=((t.rootPc-o)%12+12)%12;i.push({rootFret:r,frets:s.map(a=>a===null?null:a+r)})}),i.length?(i.sort((n,o)=>n.rootFret-o.rootFret),i[0].frets):null}function Fs(t){const e=[7,0,4,9],i=t.intervals.map(r=>(t.rootPc+r)%12),n=r=>{const a=new Set(r);let p=null;const d=[],u=c=>{if(c===4){const g=d.map((m,y)=>(e[y]+m)%12);for(const m of a)if(g.indexOf(m)<0)return;for(const m of g)if(!a.has(m))return;const l=d.filter(m=>m>0),h=l.length?Math.max(...l)-Math.min(...l):0;if(h>3)return;const f=h*12+d.reduce((m,y)=>m+y,0);(!p||f<p.score)&&(p={frets:d.slice(),score:f});return}for(let g=0;g<=5;g++)d.push(g),u(c+1),d.pop()};return u(0),p},o=n(i);if(o)return o.frets;const s=n(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return s?s.frets:null}let I=class extends Ie{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.selectedBand=null,this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.tone="Warm",this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.key==="Escape"){t.preventDefault(),(this.tempoOpen||this.feelOpen)&&(this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate());return}if(t.ctrlKey||t.metaKey||t.altKey)return;const i=oi.map(o=>o.toLowerCase()).indexOf((t.key||"").toLowerCase()),n=this.progression?.chords||[];if(i>=0&&i<n.length){t.preventDefault();const o=88+i%3*6,s=n[i],r=this.getLadderHome(s),a=s.voicing||"1st inversion",p=Bi(a),d=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR",c=s.notes&&s.notes.length?s.notes:R(s.name,B(d,u));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=i,this.padHeld=i,this.gridFor=i;const g=p===0?"UP AN OCTAVE":p===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:i,voicing:a,vel:o,zone:p,reach:r,meta:g},w.playChordNotes(c,.85,a,o),this.requestUpdate()}},this.handleKeyUp=t=>{if(t.ctrlKey||t.metaKey||t.altKey)return;oi.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.toggleLibrary=()=>{this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("library-open-change",{detail:this.libraryOpen,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,w.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=B(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:R(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];w.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),w.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=B(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:R(this.abPick.chord,t),i=[...this.progression.chords],n=i[this.swapIndex],o=n.initialChord||{...n};i[this.swapIndex]={...n,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:o};const s={...this.progression,chords:i};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),w.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>Nt&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<qe&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onReroll=()=>{this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1,this.requestUpdate()},this.togglePlayStyleExpand=()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1,this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,w.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,w.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=D.getProjects(),this.unsubscribeProjects=typeof D.subscribeProjects=="function"?D.subscribeProjects(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):typeof D.subscribe=="function"?D.subscribe(()=>{this.savedSets=D.getProjects(),this.requestUpdate()}):null,w.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone}),w.setBarsPerChord(this.barsPerChord),Ee(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("tone")||t.has("humanEngineState"))&&(w.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:this.humanEngineState}),t.has("tone")&&Ee(this.tone)),t.has("barsPerChord")&&w.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){this.selectedBand===t?this.selectedBand=null:this.selectedBand=t;const e=ni.find(i=>i.name===this.selectedBand);e&&this.dispatchEvent(new CustomEvent("toast",{detail:`Active artist DNA: ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:e,bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t*4,w.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(o=>i+o)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const i=this.progression?.chords,n=i?i[e]:null;if(!n)return;let o=n.voicing||"1st inversion",s=Bi(o),r;const a=this.getChordLadder(n),p=this.getLadderHome(n);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const m=t.currentTarget.getBoundingClientRect(),y=Math.min(.999,Math.max(0,(t.clientX-m.left)/(m.width||1))),x=Math.min(.999,Math.max(0,(t.clientY-m.top)/(m.height||1)));x<.34?(s=0,o="up an octave"):x>.67?(s=2,o="low, root position"):(s=1,o="1st inversion"),a.length>0&&(r=Math.min(a.length-1,Math.floor(y*a.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const d=r!==void 0&&a[r]?a[r]:n.name,u=r!==void 0&&r!==p&&!!a[r],c=this.progression?.key||"C",g=this.progression?.scaleType||"MAJOR",l=R(d,B(c,g)),h=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const f=u?"→ "+d:s===0?"UP AN OCTAVE":s===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:o,vel:h,zone:s,reach:r,meta:f},w.playChordNotes(l,.85,o,h),this.pendingLatch={index:e,reach:r,voicing:o,targetChordName:d},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords,n=i?i[e]:null;if(n&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const o=t.currentTarget.getBoundingClientRect(),s=Math.min(.999,Math.max(0,(t.clientX-o.left)/(o.width||1))),r=Math.min(.999,Math.max(0,(t.clientY-o.top)/(o.height||1)));let a=1,p="1st inversion";r<.34?(a=0,p="up an octave"):r>.67&&(a=2,p="low, root position");const d=this.getChordLadder(n),u=this.getLadderHome(n),c=d.length>0?Math.min(d.length-1,Math.floor(s*d.length)):void 0,g=c!==void 0&&d[c]?d[c]:n.name,l=c!==void 0&&c!==u&&!!d[c];if(this.pendingLatch?.reach!==c||this.pendingLatch?.voicing!==p){this.pendingLatch={index:e,reach:c,voicing:p,targetChordName:g};const h=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",m=R(g,B(h,f)),y=88+e%3*6,x=l?"→ "+g:a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:p,vel:y,zone:a,reach:c,meta:x},w.playChordNotes(m,.65,p,y),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:i,voicing:n,targetChordName:o}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const s=this.progression.chords[e],r=this.getChordLadder(s),a=this.getLadderHome(s),p=s.voicing||"1st inversion",d=i!==void 0&&i!==a&&!!r[i]&&!!o;if(d||!!n&&n!==p){const c=s.initialChord||{...s};let g;if(d&&o){const f=this.getChordQualityLabel(s.name),m=this.getChordExtensionLabel(o),y=this.progression.key||"C",x=this.progression.scaleType||"MAJOR";g=ei(s,f,m),g.name=o,g.notes=R(o,B(y,x))}else g={...s};n&&(g.voicing=n),g.name===c.name&&(!c.voicing||g.voicing===c.voicing)?delete g.initialChord:g.initialChord=c;const l=[...this.progression.chords];l[e]=g;const h={...this.progression,chords:l};this.progression=h,this.dispatchEvent(new CustomEvent("progression-change",{detail:h,bubbles:!0,composed:!0})),w.setProgression(h,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",w.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=Ai(this.chordData,this.progression),n=Ei(this.chordData,this.progression),o=i.map(a=>({name:a.name,sub:lt[a.name]?lt[a.name][this.showTheory?1:0]:a.sub||"",tension:a.tension,rows:a.rows.map(p=>({name:p.name,roman:p.roman||"",notes:p.notes||p.chord?.notes,sub:p.sub,tension:p.tension,chord:p.chord}))}));o.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:n.map(a=>({name:a.name,roman:a.roman||"",notes:a.notes||a.chord?.notes,sub:a.sub,tension:a.tension,chord:a.chord}))});const s=o.filter(a=>a.name!=="Borrowed").sort((a,p)=>a.tension-p.tension),r=o.filter(a=>a.name==="Borrowed");return[...s,...r]}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],i=B(this.progression.key,this.progression.scaleType),n=t.notes&&t.notes.length?t.notes:R(t.chordName,i)||e.notes,o=t.chord?{...t.chord,name:t.chordName,notes:n,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:n,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:n,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,w.auditionChord(o,.8),w.setABOverride({index:this.swapIndex,side:"after",chord:o}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?B(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:R(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&w.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),w.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=B(this.progression.key,this.progression.scaleType),i=R(t,e);w.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=B(this.progression.key,this.progression.scaleType);if(t==="before")w.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),w.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=R(this.abPick.chord,e),n={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};w.setABOverride({index:this.swapIndex,side:"after",chord:n}),w.auditionChord(n,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=B(this.progression.key,this.progression.scaleType),n={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:R(this.abPick.chord,i)};w.auditionChord(n,.8)}else w.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const n=this.getChordExtensionLabel(i.name),o=ei(i,t,n);e[this.detailIndex]=o;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),w.auditionChord(o,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${o.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const n=this.getChordQualityLabel(i.name),o=ei(i,n,t);e[this.detailIndex]=o;const s={...this.progression,chords:e};this.progression=s,this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),w.auditionChord(o,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${o.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(a=>e[a.replace(/\d+$/,"")]??-1)),n=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],o=100/7,s=o*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return b`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${n.map(a=>{const p=i.has(a.pc);return b`<div class="white-key ${p?"active":""}">${a.note}</div>`})}
        </div>
        ${r.map(a=>{const p=(a.after+1)*o-s/2,d=i.has(a.pc);return b`<div class="black-key ${d?"active":""}" style="left: ${p}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.swing!==se.swing||this.spread!==se.spread||this.density!==se.density||this.tone!==se.tone}resetFeel(){this.swing=se.swing,this.spread=se.spread,this.density=se.density,this.tone=se.tone,this.humanEngineState=null,w.setFeelSettings({swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,humanState:void 0}),Ee(this.tone),this.requestUpdate()}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=i),w.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),w.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,w.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=at.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=at.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",i=Ti(this.progression,t,e);this.progression=i,w.setProgression(i),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${i.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=Mo(this.progression,t);this.progression=e,w.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=Ti(this.progression,t);this.progression=e,w.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,n){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?n+1:0;const o=B(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=R(e,o);w.auditionChord({name:e,notes:s},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=si[e]||si[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||si.MAJOR,n=this.progression?.key||"C",o=M[n.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;B(n,e);const s=n.replace("b","♭")+" "+i.name,r=t.map(f=>{const m=J(f.name);return M[m.root]??0}),a=f=>i.steps.indexOf(((f-o)%12+12)%12),p=i.steps.map((f,m)=>{const y=(o+f)%12,S=$s[y]+i.quals[m],N=r.indexOf(y),A=N>=0,E=this.auditionDeg===m;return{di:m,roman:i.romans[m],name:S,fn:i.fns[m],inLoop:A,on:E,barIdx:N,aria:`Hear ${S}, the ${i.fns[m].toLowerCase()} of ${s}`}}),d=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,u=t.map(f=>f.roman||i.romans[Math.max(0,a(M[J(f.name).root]??0))]).join(" – "),c=n.replace("b","♭")+" "+i.name,g=jo(t),l=_o(t),h=this.progression?.note||"";return{scaleName:s,scaleHint:d,scaleDegrees:p,romanFormula:u,keyModeLine:c,cadences:g,voiceLinks:l,setNote:h}}renderScaleChords(t,e,i,n){const o=Qt(this.progression?.mood||"Warm");return b`
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
          ${i.map(s=>b`
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
    `}renderTempoDrawerDesktop(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return b`
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
            ${[1,2,4].map(e=>b`
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
              ${Ui.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=M[i]??0,o=M[e.root]??0,s=n===o;return b`
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
              ${at.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return b`
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
    `}renderFeelDrawerDesktop(){return this.feelOpen?b`
      <div class="feel-popover-desktop" style="background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex: 1; min-width: 0;">Feel &amp; tone</div>
          ${this.feelChanged?b`
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
          ${Fi.map(t=>{const e=this[t.k];let i=t.steps[0];return t.steps.forEach(n=>{Math.abs(n.v-e)<Math.abs(i.v-e)&&(i=n)}),b`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${t.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${t.hint}</div>
                </div>
                <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
                  ${t.steps.map(n=>{const o=n===i;return b`
                      <button
                        style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                        @click=${()=>{this[t.k]=n.v,w.setFeelSettings({[t.k]:n.v}),this.requestUpdate()}}
                        aria-label="${t.label}: ${n.name}"
                      >
                        ${n.name}
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
              ${Pi.map(t=>b`
                <button
                  style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===t?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.tone=t,w.setFeelSettings({tone:t}),Ee(t),this.requestUpdate()}}
                >
                  ${t}
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
            ${this.showAdvancedFeel?b`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 480px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(t=>t.name).join(" ")||"Cmaj7 Dm7 G7 Cmaj"}
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
    `:""}renderTempoSheetMobile(){if(!this.tempoOpen)return"";const t=this.progression?.bpm||84;return b`
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
            ${[1,2,4].map(e=>b`
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
            ${Ui.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=M[i]??0,o=M[e.root]??0,s=n===o;return b`
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
            ${at.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),n=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return b`
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
    `}renderFeelSheetMobile(){return this.feelOpen?b`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${()=>{this.feelOpen=!1}}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Feel &amp; tone</div>
            ${this.feelChanged?b`
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
            ${Fi.map(t=>{const e=this[t.k];let i=t.steps[0];return t.steps.forEach(n=>{Math.abs(n.v-e)<Math.abs(i.v-e)&&(i=n)}),b`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink); flex: 1; min-width: 0;">${t.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${t.hint}</div>
                  </div>
                  <div style="display: flex; gap: 5px; margin-top: 7px;">
                    ${t.steps.map(n=>{const o=n===i;return b`
                        <button
                          style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${o?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${o?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                          @click=${()=>{this[t.k]=n.v,w.setFeelSettings({[t.k]:n.v}),this.requestUpdate()}}
                          aria-label="${t.label}: ${n.name}"
                        >
                          ${n.name}
                        </button>
                      `})}
                  </div>
                </div>
              `})}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 16px;">Tone</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${Pi.map(t=>b`
              <button
                style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone===t?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.tone===t?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                @click=${()=>{this.tone=t,w.setFeelSettings({tone:t}),Ee(t),this.requestUpdate()}}
              >
                ${t}
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
            ${this.showAdvancedFeel?b`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 400px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(t=>t.name).join(" ")||"Cmaj7 Dm7 G7 Cmaj"}
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
    `:""}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:n,voiceLinks:o,setNote:s}=t;return b`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${i}</div>
        </div>

        ${n.length?b`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${n.map(r=>b`
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
        ${o.map(r=>b`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${r.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${r.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${r.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${r.link}</div>
          </div>
        `)}

        ${s?b`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${s}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),n=this.getChordExtensionLabel(e?.name),o=B(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),s=e?zo(e.name,o):[];return b`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(r=>b`
          <div class="note-pill">${r.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&s.length?b`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${s.map(r=>b`
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
        ${Os.map(r=>{const a=r.label===i;return b`
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
        ${Ms.map(r=>{const a=r.label===n;return b`
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
    `}renderPianoCard(t,e){const i=J(t.name),n=Li[i.root]??0,o=dt[i.quality]||dt[hi[i.quality]||"maj"]||[0,4,7],s=22,r=86,a=52,p=[0,2,4,5,7,9,11],d=[],u=[],c=[];for(let h=0;h<2;h++)p.forEach((f,m)=>{d.push({x:(h*7+m)*s,w:s-1.5,h:r})});for(let h=0;h<2;h++)[0,1,3,4,5].forEach(f=>{const m=h*7+f;u.push({x:m*s+s*.64,w:s*.58,h:a})});o.forEach(h=>{const f=n+h,m=Math.floor(f/12),y=f%12,x=p.indexOf(y),S=h===0,N=x<0,A=S?"#F2735F":N?"#FBF3E6":"#2E271F",E=S?"#FBF3E6":N?"#2E271F":"#FBF3E6",L=this.showDegrees?ct[h%12]:"";if(x>=0){const z=m*7+x;c.push({cx:z*s+(s-1.5)/2,cy:r-19,r:9,fill:A,isRoot:S,label:L,lc:E})}else{const P=(m*7+p.indexOf(y-1))*s+s*.64,j=s*.58;c.push({cx:P+j/2,cy:a-14,r:7.5,fill:A,isRoot:S,label:L,lc:E})}});const g=14*s,l=o.map(h=>{const f=Ri[(n+h)%12];return this.showDegrees?`${f} (${ct[h%12]})`:f}).join(" · ");return b`
      <div
        class="play-card"
        @pointerdown=${h=>this.handlePadPointerDown(h,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
          ${this.showTheory&&t.roman?b`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
          `:""}
        </div>
        <svg width="${g}" height="${r}" viewBox="0 0 ${g} ${r}" style="display: block; width: 100%; max-width: ${g}px; height: auto;">
          ${d.map(h=>Y`
            <rect x="${h.x}" y="0" width="${h.w}" height="${h.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${u.map(h=>Y`
            <rect x="${h.x}" y="0" width="${h.w}" height="${h.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${c.map(h=>Y`
            <g>
              <circle cx="${h.cx}" cy="${h.cy}" r="${h.r}" fill="${h.fill}" stroke="${h.isRoot?"#2E271F":"none"}" stroke-width="${h.isRoot?1.6:0}"></circle>
              ${h.label?Y`
                <text x="${h.cx}" y="${h.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${h.lc}" font-family="'Plus Jakarta Sans',sans-serif">${h.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${l}</div>
      </div>
    `}renderFretCard(t,e,i){const n=J(t.name),o=Li[n.root]??0,s=dt[n.quality]||dt[hi[n.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],a=[7,0,4,9],p=i==="Ukulele",d=p?a:r,u=p?Fs({root:n.root,rootPc:o,q:n.quality,intervals:s})||[null,null,null,null]:Bs({root:n.root,rootPc:o,q:n.quality})||[null,null,null,null,null,null],c=18,g=24,l=4,h=16,f=d.length,m=u.filter(T=>T!==null&&T>0),y=m.length&&Math.max(...m)>4?Math.min(...m)-1:0,x=[],S=[],N=[],A=[],E=[];for(let T=0;T<f;T++)x.push({x:T*c});for(let T=0;T<=l;T++)S.push({y:h+T*g,sw:T===0&&y===0?3:1.2});u.forEach((T,_)=>{const W=_*c;if(T===null){E.push({x:W});return}if(T===0){A.push({x:W});return}const ge=((d[_]+T-o)%12+12)%12;N.push({cx:W,cy:h+(T-y-.5)*g,fill:ge===0?"#F2735F":"#2E271F",label:this.showDegrees?ct[((d[_]+T-o)%12+12)%12]:""})});const L=(f-1)*c,z=(f-1)*c+26,P=h+l*g+12,j=y>0?`${y+1}fr`:"",q=y>0,G=s.map(T=>{const _=Ri[(o+T)%12];return this.showDegrees?`${_} (${ct[T%12]})`:_}).join(" · ");return b`
      <div
        class="play-card"
        @pointerdown=${T=>this.handlePadPointerDown(T,e)}
        @pointerup=${()=>this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${t.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${t.name}</div>
            ${this.showTheory&&t.roman?b`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${t.roman}</div>
            `:""}
          </div>
          ${q?b`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${j}</div>
          `:""}
        </div>
        <svg width="${z}" height="${P}" viewBox="-13 -2 ${z} ${P}" style="display: block; width: 100%; max-width: ${z*1.5}px; height: auto;">
          ${S.map(T=>Y`
            <rect x="0" y="${T.y}" width="${L}" height="${T.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${x.map(T=>Y`
            <rect x="${T.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${A.map(T=>Y`
            <circle cx="${T.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${E.map(T=>Y`
            <text x="${T.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${N.map(T=>Y`
            <g>
              <circle cx="${T.cx}" cy="${T.cy}" r="${T.fill==="#F2735F"?7.5:7}" fill="${T.fill}"></circle>
              ${T.label?Y`
                <text x="${T.cx}" y="${T.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${T.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${G}</div>
      </div>
    `}renderChordPad(t,e,i,n){const o=H(t.tension||.1),s=this.activeIndex===e&&this.playing,r=this.padFlash===e||this.padHeld===e,a=this.swapIndex===e,p=this.getChordLadder(t),d=this.getLadderHome(t),u=this.lastPad?.idx===e,c=u&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:d,g=u&&c>=0&&c!==d&&p[c],l=g?c:d,h=u?g?"→ "+p[c]:Es[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"";return b`
      <div
        class="pad-cell ${n?"chord-item-wrap":""} ${r?"pad-held":""} ${a?"selected":""} ${s?"pad-lit":""}"
        style="
          background: ${o.color};
          border-radius: ${a&&n?"20px 20px 5px 5px":"20px"};
          ${a?`box-shadow: inset 0 0 0 2.5px ${i}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${fe[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${f=>this.handlePadPointerDown(f,e)}
        @pointermove=${f=>this.handlePadPointerMove(f,e)}
        @pointerup=${f=>this.handlePadPointerUp(f)}
        @pointercancel=${f=>this.handlePadPointerUp(f)}
        @pointerleave=${f=>this.handlePadPointerUp(f)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${p.slice(1).map((f,m)=>b`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(m+1)/p.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${f=>{f.stopPropagation(),this.openSwap(e)}}
          @pointerdown=${f=>f.stopPropagation()}
          aria-label="Swap ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${f=>{f.stopPropagation(),this.openDetail(e)}}
          @pointerdown=${f=>f.stopPropagation()}
          aria-label="View voicing for ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row" style="display: flex; align-items: center; gap: 6px;">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(oi[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?b`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${As[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${u&&g&&p[c]?p[c]:t.name}</div>
          ${this.showTheory&&t.notes&&t.notes.length?b`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${t.notes.join(" · ")}
            </div>
          `:""}
          ${h?b`<div class="pad-meta-voicing">${h}</div>`:""}
          <div style="display: flex; gap: 3px; margin-top: 7px;">
            ${p.map((f,m)=>b`
              <div style="width: ${m===l?16:6}px; height: 4px; border-radius: 3px; background: ${m===l?g?i:"rgba(46,39,31,0.55)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;"></div>
            `)}
          </div>
        </div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(n=>!e||(n.name+" "+n.genre+" "+n.mood).toLowerCase().includes(e));return b`
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
          @input=${n=>{this.librarySearch=n.target.value}}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${i.map(n=>b`
          <div
            style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: var(--cv-surface);"
            @click=${()=>{this.dispatchEvent(new CustomEvent("load-project",{detail:n,bubbles:!0,composed:!0})),this.libraryOpen=!1}}
          >
            <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
              ${(n.chords||[]).map(o=>{const s=H(o.tension??0);return b`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(s.radius*.25)}px;background:${s.color};flex-shrink:0;"></span>`})}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.name}</div>
              <div style="font-size: 11px; color: var(--cv-ink-muted);">${n.genre} · ${n.mood}</div>
            </div>
          </div>
        `)}
        ${i.length?"":b`
          <div style="padding: 12px; font-size: 12px; color: var(--cv-ink-muted); text-align: center;">No loops match that.</div>
        `}
      </div>
    `}render(){const t=this.progression?.chords||[],e=Qt(this.progression?.mood||"Warm"),i=ni.find(l=>l.name===this.selectedBand),n=this.getTheoryData(t),o=t.map(l=>l.tension||.1),s=Math.max(...o,.1),r=Math.min(...o,0),a=o.indexOf(s),p=o.every((l,h)=>h===0||l>=o[h-1]),d=s-r<.28?"Stays close to home":p?"A steady climb":o[o.length-1]<.25&&a<o.length-1?"Away, then home":"Drifts, then settles",u=`Opens ${fe[t[0]?.functionLabel]||"home"} and ${s-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":p?`tightens chord by chord, peaking on ${t[a]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[a]?.name||"the middle"} before easing back down home.`}`;let c=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression&&this.chordData.scales){if(this.activeSwapFamily==="Borrowed")c=Ei(this.chordData,this.progression,this.swapIndex);else{const l=Ai(this.chordData,this.progression,this.swapIndex);c=(l.find(f=>f.name===this.activeSwapFamily)||l[0])?.rows||[],lt[this.activeSwapFamily]&&lt[this.activeSwapFamily][this.showTheory?1:0]}if(i){const l=c.filter(f=>i.hoist.includes(f.name)),h=c.filter(f=>!i.hoist.includes(f.name));c=[...l,...h]}}const g=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?b`
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

            ${this.vibeOpen?b`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${l=>{this.freeText=l.target.value}}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${e};">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${$i.map(l=>b`
                    <button class="pill ${this.progression?.genre===l?"active":""}" @click=${()=>this.onGenreClick(l)}>${l}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Di.map(l=>b`
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
            ${this.activeView==="loop"?b`
              <div class="stage-card" style="padding: 18px 14px;">
                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${t.map((l,h)=>{if(this.swapIndex===h){const f=H(l.tension||.1),m=this.activeIndex===h&&this.playing;return b`
                        <div
                          class="pad-cell pad-cell-cycler ${m?"pad-lit":""}"
                          style="
                            background: ${f.color};
                            border-radius: 20px;
                            padding: 12px;
                            min-height: 220px;
                            box-shadow: inset 0 0 0 2.5px ${e}, 0 14px 26px -18px rgba(46,39,31,0.45);
                          "
                        >
                          <chord-pad-cycler
                            .originalChord=${l}
                            .barIndex=${h}
                            .feelings=${this.getSwapFeelings(h)}
                            .feelIndex=${this.mobileFeelIndex}
                            .chordIndex=${this.mobileChordIndex}
                            @cycler-audition=${y=>this.handleSwapAudition(y.detail)}
                            @cycler-keep=${y=>this.handleCyclerKeep(y.detail)}
                            @cycler-revert=${()=>this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `}return this.renderChordPad(l,h,e,!1)})}
                </div>

                ${this.showTheory?this.renderScaleChords(n.scaleName,n.scaleHint,n.scaleDegrees,!0):""}
              </div>

              <!-- Quick chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${ce(this.instrument)} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle||"Block chords"} <span style="opacity:0.6;">⌄</span>
                </button>
              </div>

              ${this.expandedInstrument?b`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${ie.map(l=>b`
                    <button
                      class="pill ${ce(this.instrument)===l.name?"active":""}"
                      @click=${()=>{this.instrument=l.name,w.setInstrument(l.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:l.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                    >
                      <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                    </button>
                  `)}
                </div>
              `:""}

              ${this.expandedPlayStyle?b`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${Fe.map(l=>b`
                    <button
                      class="pill ${(this.playStyle||"Block chords")===l.name?"active":""}"
                      @click=${()=>{this.playStyle=l.name,w.setPlayStyle(l.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:l.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                    >
                      <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                    </button>
                  `)}
                </div>
              `:""}

              <div style="display: flex; gap: 7px; margin-top: 12px;">
                <button class="mobile-chip-btn" @click=${()=>{this.tempoOpen=!this.tempoOpen,this.tempoOpen&&(this.feelOpen=!1)}} aria-label="Key, tempo and length">
                  ${this.progression?.key||"C"} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm||84}
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

              ${this.showTheory?b`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${d}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(l=>{const h=Math.round(28+(l.tension||.1)*85),f=H(l.tension||.1);return b`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${h}px; border-radius: 100px; background: ${f.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${l.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${fe[l.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${u}</div>
                  ${this.renderTheoryStrip(n)}
                </div>
              `:""}
            `:this.activeView==="song"?b`
              <div class="song-track-list" style="display: flex; flex-direction: column; gap: 12px; padding: 4px 0 20px;">
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 4px;">
                  Each section reuses the loop, related but never identical. Tap a section to edit its chords, or press play to hear the whole arrangement.
                </div>
                ${this.sections.map((l,h)=>{const f=this.activeSectionIdx===h;return b`
                    <div
                      class="song-track-card ${f?"active":""}"
                      style="width: 100%; box-sizing: border-box; cursor: pointer;"
                      @click=${()=>{this.activeSectionIdx=h,this.activeView="loop"}}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${h+1}</div>
                      <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); margin-top: 4px;">${l.name}</div>
                      <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 4px;">${l.desc}</div>
                      <div class="song-card-chips" style="display: flex; gap: 6px; margin-top: 12px; flex-wrap: wrap;">
                        ${l.progression.chords.map(m=>{const y=H(m.tension);return b`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(y.radius*.4)}px; background: ${y.color}; flex-shrink: 0;" title="${m.name}"></div>`})}
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
            `:b`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${["Piano","Guitar","Ukulele"].map(l=>b`
                      <button
                        class="pill ${this.playInstrument===l?"active":""}"
                        style="background: ${this.playInstrument===l?e:"var(--cv-cream)"}; color: ${this.playInstrument===l?"#2E271F":"var(--cv-ink-muted)"}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${()=>{this.playInstrument=l}}
                      >${l}</button>
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

                ${this.playInstrument==="Piano"?b`
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${t.map((l,h)=>this.renderPianoCard(l,h))}
                  </div>
                `:b`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((l,h)=>this.renderFretCard(l,h,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
                  </div>
                `}
              </div>
            `}
          </div>



          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen?b`
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
      `:b`
      ${i?b`
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

            ${this.libraryOpen?b`
              <div class="loops-popover-desktop library-popover">
                ${this.renderLibraryPopoverContent(e)}
              </div>
            `:""}
          </div>
        </nav>

        <!-- Floating Vibe Popover (Desktop) -->
        ${this.vibeOpen?b`
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
              <button type="submit" class="vibe-submit-btn" style="background: ${e};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${$i.map(l=>b`
                <button class="pill ${this.progression?.genre===l?"active":""}" @click=${()=>this.onGenreClick(l)}>${l}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Di.map(l=>{const h=Qt(l),f=this.progression?.mood===l;return b`
                  <button class="pill mood-pill ${f?"active":""}" style="${f?`background: ${h}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(l)}>
                    <span class="mood-badge" style="background: ${f?"rgba(46, 39, 31, 0.12)":h+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${f?"#2E271F":h}" stroke-width="2.2" stroke-linecap="round"><path d="${Cs[l]||"M12 4 a6.5 6.5 0 1 0 6.5 6.5"}"/></svg>
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
              ${ni.map(l=>b`
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
            ${this.activeView==="loop"?b`
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
                  ${t.map((l,h)=>{const m=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/4)+1)*4-1);return b`
                      ${this.renderChordPad(l,h,e,!0)}
                      ${this.swapIndex!==null&&h===m?b`
                        <chord-swap-lane
                          .swapIndex=${this.swapIndex}
                          .chord=${t[this.swapIndex]}
                          .feelings=${this.getSwapFeelings(this.swapIndex)}
                          .activeFeel=${this.activeSwapFamily}
                          .pickedChord=${this.abPick}
                          .padCols=${Math.min(t.length,4)}
                          .moodColor=${e}
                          @swap-feel-change=${y=>{this.activeSwapFamily=y.detail.feel,this.requestUpdate()}}
                          @swap-audition=${y=>this.handleSwapAudition(y.detail)}
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
                    ${ce(this.instrument)}
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
                    ${this.progression?.key||"C"} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm||84}
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
                ${this.expandedInstrument?b`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Instrument</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${ie.map(l=>b`
                        <button
                          class="pill ${ce(this.instrument)===l.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument||"Piano")===l.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.instrument||"Piano")===l.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.instrument=l.name,w.setInstrument(l.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:l.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                        >
                          <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}

                <!-- Play style tray if expanded -->
                ${this.expandedPlayStyle?b`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Play style</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${Fe.map(l=>b`
                        <button
                          class="pill ${(this.playStyle||"Block chords")===l.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.playStyle||"Block chords")===l.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.playStyle||"Block chords")===l.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.playStyle=l.name,w.setPlayStyle(l.name),this.dispatchEvent(new CustomEvent("set-play-style",{detail:l.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1,this.requestUpdate()}}
                        >
                          <span style="background:${l.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${l.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}
              </div>
            `:this.activeView==="song"?b`
              <div class="song-view-wrap" style="padding: 10px 4px 24px;">
                <!-- Song Play Transport Strip -->
                <div class="loop-strip-header" style="margin-bottom: 20px;">
                  <button
                    class="loop-play-btn"
                    @click=${()=>this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}
                    style="background: ${this.playing?"#2E271F":e}; color: ${this.playing?"#FBF3E6":"#2E271F"}; min-height: 42px; padding: 0 18px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; white-space: nowrap;"
                    aria-label="${this.playing?"Stop":`Play song · ${this.sections.length} sections`}"
                  >
                    ${this.playing?"Stop":`Play song · ${this.sections.length} sections`}
                  </button>
                  <div class="strip-timeline-wrap">
                    <div class="strip-cells-bar loop-beat-cells">
                      ${this.sections.map((l,h)=>{const f=this.playing&&this.activePlayingSectionIdx===h;return b`
                          <div
                            class="strip-cell"
                            style="height: ${f?20:10}px; border-radius: 3px; background: ${f?"#F2735F":"rgba(46,39,31,0.22)"}; flex: 1;"
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
                  ${this.sections.map((l,h)=>{const f=this.activeSectionIdx===h;return b`
                      <div
                        class="song-track-card ${f?"active":""}"
                        @click=${()=>{this.activeSectionIdx=h,this.activeView="loop"}}
                      >
                        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${h+1}</div>
                        <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink);">${l.name}</div>
                        <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); flex: 1;">${l.desc}</div>
                        <div class="song-card-chips">
                          ${l.progression.chords.map(m=>{const y=H(m.tension);return b`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(y.radius*.4)}px; background: ${y.color}; flex-shrink: 0;" title="${m.name}"></div>`})}
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
            `:b`
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
                  ${t.map((l,h)=>this.renderPianoCard(l,h))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${["Guitar","Ukulele"].map(l=>b`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===l?e:"transparent"}; color: ${(this.playInstrument==="Ukulele"?"Ukulele":"Guitar")===l?"#2E271F":"rgba(46,39,31,0.55)"}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${()=>{this.playInstrument=l}}
                      >${l}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${t.map((l,h)=>this.renderFretCard(l,h,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
          ${this.detailOpen?b`
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
          `:this.swapIndex!==null?b`
            <!-- Chord Swap Harmonic Context View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Bar ${this.swapIndex+1} Harmonic Context</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${g?.name||""}</span>
                    ${this.showTheory&&g?.roman?b`<span class="swap-roman">${g.roman}</span>`:""}
                    <span class="swap-role">${fe[g?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${i?b`
                <div style="background: var(--cv-cream); border-radius: 14px; padding: 12px 14px; margin-bottom: 14px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cv-label);">Band DNA · ${i.name}</div>
                  <div style="font-size: 12.5px; font-weight: 700; color: var(--cv-ink); margin-top: 4px;">${this.showTheory?i.theory:i.plain}</div>
                </div>
              `:""}

              ${this.abPick?b`
                <div style="animation: cvfv-pop 200ms ease-out; background: var(--cv-cream); border-radius: 16px; padding: 16px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                    Auditioning · ${this.activeSwapFamily||"Substitution"}
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                    <div style="font-size: 22px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.02em; line-height: 1.1;">${this.abPick.chord||this.abPick.name}</div>
                    ${this.abPick.roman?b`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label);">${this.abPick.roman}</div>`:""}
                  </div>
                  <div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">
                    ${this.abPick.functionLabel||this.abPick.fn||"Harmonic substitution that alters the feel of the bar."}
                  </div>
                  ${this.abPick.notes&&this.abPick.notes.length?b`
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; color: var(--cv-ink); margin-top: 10px;">
                      Notes: ${this.abPick.notes.join(" · ")}
                    </div>
                  `:""}
                  <div style="font-size: 11.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(46,39,31,0.08);">
                    Hear how this chord changes the emotional arc of the progression.
                  </div>
                </div>
              `:b`
                <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); background: var(--cv-cream); border-radius: 14px; padding: 15px;">
                  Pick a feeling in the swap lane under the loop, then tap a candidate chord to audition it. What it does, its notes, and how it voices will show up here.
                </div>
              `}

              ${this.showTheory?this.renderTheoryStrip(n):""}
            </div>
          `:b`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div>
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${d}</div>
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
                ${t.map((l,h)=>{const f=H(l.tension||.1),m=Math.round(18+(l.tension||.1)*62);return b`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(h)} aria-label="${l.name}, ${fe[l.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${m}px; background: ${f.color};"></div>
                      </div>
                      <div class="arc-bar-name">${l.name}</div>
                      <div class="arc-bar-feel">${fe[l.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${u}</div>
              ${this.showTheory&&n.setNote?b`
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
          @toast=${l=>{this.dispatchEvent(new CustomEvent("toast",{detail:l.detail,bubbles:!0,composed:!0}))}}
        ></share-modal>
      </div>
    `}};I.styles=we`
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
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
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
  `;k([C({type:Object})],I.prototype,"chordData",2);k([C({type:Object})],I.prototype,"progression",2);k([C({type:Number})],I.prototype,"activeIndex",2);k([C({type:Number})],I.prototype,"progressStep",2);k([C({type:Array})],I.prototype,"order",2);k([C({type:Boolean})],I.prototype,"playing",2);k([C({type:Boolean})],I.prototype,"showTheory",2);k([C({type:String})],I.prototype,"instrument",2);k([C({type:String})],I.prototype,"playStyle",2);k([C({type:Boolean})],I.prototype,"isAuthenticated",2);k([C({type:String})],I.prototype,"userEmail",2);k([C({type:Array})],I.prototype,"sections",2);k([C({type:Number})],I.prototype,"activeSectionIdx",2);k([C({type:Number})],I.prototype,"activePlayingSectionIdx",2);k([C({type:Number})],I.prototype,"totalSongSteps",2);k([C({type:Boolean})],I.prototype,"isGenerating",2);k([C({type:Boolean})],I.prototype,"libraryOpen",2);k([v()],I.prototype,"isMobile",2);k([v()],I.prototype,"activeView",2);k([v()],I.prototype,"vibeOpen",2);k([v()],I.prototype,"selectedBand",2);k([v()],I.prototype,"freeText",2);k([v()],I.prototype,"vibePlaceholderIdx",2);k([v()],I.prototype,"expandedGenre",2);k([v()],I.prototype,"expandedMood",2);k([v()],I.prototype,"activeSwapFamily",2);k([v()],I.prototype,"swapIndex",2);k([v()],I.prototype,"isInspectorOpen",2);k([v()],I.prototype,"detailOpen",2);k([v()],I.prototype,"detailIndex",2);k([v()],I.prototype,"abPick",2);k([v()],I.prototype,"abSide",2);k([v()],I.prototype,"abPlaying",2);k([v()],I.prototype,"mobileFeelIndex",2);k([v()],I.prototype,"mobileChordIndex",2);k([v()],I.prototype,"savedSets",2);k([v()],I.prototype,"renamingId",2);k([v()],I.prototype,"draftName",2);k([v()],I.prototype,"confirmDeleteId",2);k([v()],I.prototype,"librarySearch",2);k([v()],I.prototype,"librarySelectMode",2);k([v()],I.prototype,"librarySelected",2);k([v()],I.prototype,"playInstrument",2);k([v()],I.prototype,"showDegrees",2);k([v()],I.prototype,"mobileSheetOpen",2);k([v()],I.prototype,"mobileDetailSheetOpen",2);k([v()],I.prototype,"padFlash",2);k([v()],I.prototype,"padHeld",2);k([v()],I.prototype,"gridFor",2);k([v()],I.prototype,"lastPad",2);k([v()],I.prototype,"tempoOpen",2);k([v()],I.prototype,"feelOpen",2);k([v()],I.prototype,"shareOpen",2);k([v()],I.prototype,"expandedInstrument",2);k([v()],I.prototype,"expandedPlayStyle",2);k([v()],I.prototype,"barsPerChord",2);k([v()],I.prototype,"swing",2);k([v()],I.prototype,"spread",2);k([v()],I.prototype,"density",2);k([v()],I.prototype,"tone",2);k([v()],I.prototype,"showAdvancedFeel",2);k([v()],I.prototype,"humanEngineState",2);k([v()],I.prototype,"auditionDeg",2);k([v()],I.prototype,"auditionName",2);k([v()],I.prototype,"auditionBar",2);I=k([ke("loop-screen")],I);var Ps=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,Re=(t,e,i,n)=>{for(var o=n>1?void 0:n?Us(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Ps(e,i,o),o};let ue=class extends Ie{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&Be.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await Be.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?b``:b`
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

          ${this.errorMessage?b`<div class="alert-box alert-error">${this.errorMessage}</div>`:""}

          <div class="btn-container">
            <div id="google-btn-container">
              <button
                type="button"
                class="oauth-btn"
                ?disabled=${this.isOAuthLoading}
                @click=${this.handleGoogleSignIn}
              >
                ${this.isOAuthLoading?b`<span class="spinner"></span> <span>Connecting to Google...</span>`:b`
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
    `}};ue.styles=we`
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
  `;Re([C({type:Boolean})],ue.prototype,"open",2);Re([v()],ue.prototype,"mounted",2);Re([v()],ue.prototype,"isOAuthLoading",2);Re([v()],ue.prototype,"errorMessage",2);Re([Nn("#google-btn-container")],ue.prototype,"googleBtnContainer",2);ue=Re([ke("auth-modal")],ue);var Rs=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,F=(t,e,i,n)=>{for(var o=n>1?void 0:n?Ls(e,i):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(o=(n?r(e,i,o):r(o))||o);return n&&o&&Rs(e,i,o),o};let $=class extends Ie{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Be.signOut(),D.logout()}}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&ie.some(i=>i.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&Fe.some(i=>i.name===e)&&(this.playStyle=e),w.setInstrument(this.instrument),w.setPlayStyle(this.playStyle),this.unsubscribeAuth=Be.subscribe(i=>{this.userEmail=i.user?.email||null,this.isAuthenticated=i.isAuthenticated}),this.unsubscribeProjects=D.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=D.subscribeSyncStatus(i=>{this.syncStatus=i,this.requestUpdate()}),this.unsubscribeTick=w.subscribeTick((i,n,o,s,r)=>{this.activeIndex=i,this.progressStep=n,typeof o=="number"&&(this.activePlayingSectionIdx=o),typeof s=="number"&&(this.totalSongSteps=s),this.playing=w.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),co().then(i=>{this.chordData=i,this.progression||(this.progression=ci(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(n,o)=>o),w.setProgression(this.progression,this.order),this.sections=Ae.createInitialSong(this.progression,this.order))}).catch(i=>{console.error("Failed to load chord data:",i)})}disconnectedCallback(){super.disconnectedCallback(),w.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return D.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();(t==="sets"||t==="11a")&&(this.libraryOpen=!0)}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const e=t?.detail?.promptText||this.activeSearchPrompt||void 0,i=await ss.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),w.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),w.setPlayStyle(i.playStyle));const n=i.progression;this.progression=n,this.order=Array.from({length:n.chords.length},(o,s)=>s),this.length=n.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,w.setProgression(n,this.order),w.reset(),this.sections=Ae.createInitialSong(n,this.order),this.activeSectionIdx=0,this.activeSearchPrompt=null}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){this.length=t.detail,this.regenerate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;const t=ci(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,w.setProgression(t,this.order),this.sections=Ae.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.playing&&(w.startAutoplay(),w.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}onLoadProject(t){const e=t.detail,i=[];for(const n of e.chords){let o=n.notes;(!o||o.length===0)&&(o=R(n.name,B(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:n.name,tag:n.tag||"diatonic",roman:n.roman||"",color:n.color||"#9CC0EC",functionLabel:n.functionLabel||"",notes:o,scaleLabel:n.scaleLabel||"",desc:n.desc||"",degree:n.degree||"",scaleKey:n.scaleKey||"",tension:n.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(n,o)=>o),this.length=this.progression.chords.length,this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&w.setBarsPerChord(e.barsPerChord),e.feel&&w.setFeelSettings(e.feel),w.setProgression(this.progression,this.order),this.sections=Ae.createInitialSong(this.progression,this.order),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){D.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=D.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,D.saveProject(e),this.requestUpdate())}async onSyncProjects(){await D.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),w.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),w.setPlayStyle(t.detail)}onTogglePlay(){this.playing=w.togglePlay()}onTogglePlaySong(){w.setSong(this.sections),this.playing=w.togglePlay()}onProgressionChange(t){this.progression=t.detail,w.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=Ae.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=Ae.addSection(this.sections,this.progression);this.sections=t.sections,this.activeSectionIdx=t.activeIndex,this.requestUpdate()}onSelectSection(t){this.activeSectionIdx=t.detail;const e=this.sections[t.detail];e&&(this.order=e.order.slice(),w.setOrder(this.order)),this.requestUpdate()}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},3200)}onToastUndo(){this.toastUndoId&&(D.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const i=D.getProjects().find(a=>a.id===e),n=t||i?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,o=w.getFeelSettings(),s=w.getBarsPerChord(),r={id:e,name:n,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:s,feel:{swing:o.swing??0,spread:o.spread??50,density:o.density??50,tone:o.tone??"Warm",humanState:o.humanState}};D.saveProject(r),t&&D.scheduleCloudSync(),this.showToast(`Saved "${n}"`,e),this.requestUpdate()}render(){return this.currentProjectId&&D.isProjectSaved(this.currentProjectId),b`
      <div class="app-header-container">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${D.getProjects().length}
          .syncStatus=${this.syncStatus}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.libraryOpen=!1}}
        ></app-header>
      </div>

      <div class="screen-view">
        ${this.progression?b`
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
        `:b`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

        ${this.toastMessage?b`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              ${this.toastUndoId?b`
                <button class="toast-btn" @click=${()=>{this.libraryOpen=!0,this.toastMessage=null}}>View</button>
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              `:b`
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
    `}};$.styles=we`
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
  `;F([v()],$.prototype,"chordData",2);F([v()],$.prototype,"libraryOpen",2);F([v()],$.prototype,"genre",2);F([v()],$.prototype,"mood",2);F([v()],$.prototype,"progression",2);F([v()],$.prototype,"activeIndex",2);F([v()],$.prototype,"progressStep",2);F([v()],$.prototype,"order",2);F([v()],$.prototype,"playing",2);F([v()],$.prototype,"showTheory",2);F([v()],$.prototype,"instrument",2);F([v()],$.prototype,"playStyle",2);F([v()],$.prototype,"length",2);F([v()],$.prototype,"sections",2);F([v()],$.prototype,"activeSectionIdx",2);F([v()],$.prototype,"activePlayingSectionIdx",2);F([v()],$.prototype,"totalSongSteps",2);F([v()],$.prototype,"userEmail",2);F([v()],$.prototype,"isAuthenticated",2);F([v()],$.prototype,"syncStatus",2);F([v()],$.prototype,"authModalOpen",2);F([v()],$.prototype,"toastMessage",2);F([v()],$.prototype,"toastUndoId",2);F([v()],$.prototype,"isGenerating",2);$=F([ke("chroma-chords-app")],$);
