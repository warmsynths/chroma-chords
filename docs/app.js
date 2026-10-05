import{f as bn,u as vn,s as zo,n as ji,l as Cs,S as Ue,E as At,R as ot,P as de,F as Mo,D as nt,M as Tt,C as at,V as Ot,a as Ve,G as Vt,b as To,c as Es,d as st,g as yn,O as Ms,i as xe,e as we,h as m,A as ue,w as re}from"./assets/vendor-Br4N67jR.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const ke=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const xn={attribute:!0,type:String,converter:vn,reflect:!1,hasChanged:bn},wn=(t=xn,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),o==="accessor"){const{name:a}=i;return{set(l){const r=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,r,t,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,t,l),l}}}if(o==="setter"){const{name:a}=i;return function(l){const r=this[a];e.call(this,l),this.requestUpdate(a,r,t,!0,l)}}throw Error("Unsupported decorator location: "+o)};function k(t){return(e,i)=>typeof i=="object"?wn(t,e,i):((o,s,n)=>{const a=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),a?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,i)}function w(t){return k({...t,state:!0,attribute:!1})}const kn=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);function Sn(t,e){return(i,o,s)=>{const n=a=>a.renderRoot?.querySelector(t)??null;return kn(i,o,{get(){return n(this)}})}}const $t="chroma_chords_projects",$n="chord_voyager_projects";class It{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem($t);if(e||(e=localStorage.getItem($n),e&&localStorage.setItem($t,e)),e){const i=JSON.parse(e);let o=!1;return i.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",o=!0),Array.isArray(s.chords)||(s.chords=[],o=!0)}),o&&localStorage.setItem($t,JSON.stringify(i)),i}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem($t,JSON.stringify(e))}catch(i){console.error("Failed to set projects to localStorage:",i)}}static mergeProjects(e,i){const o=new Map;return e.forEach(s=>o.set(s.id,s)),i.forEach(s=>{const n=o.get(s.id);!n||s.lastModified>n.lastModified?o.set(s.id,s):s.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(o.values())}static saveProject(e){const i=this.getProjects(),o=i.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),o>=0?i[o]=e:i.push(e);try{localStorage.setItem($t,JSON.stringify(i))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let i=this.getProjects();i=i.filter(o=>o.id!==e);try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem($t,JSON.stringify(i))}catch(o){console.error("Failed to delete project from localStorage:",o)}}static exportProjectFile(e){const i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(o),n=document.createElement("a");n.href=s,n.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((i,o)=>{const s=new FileReader;s.onload=n=>{try{const a=n.target?.result,l=JSON.parse(a);l&&typeof l=="object"&&Array.isArray(l.chords)?(l.id=Math.random().toString(36).substr(2,9),l.lastModified=Date.now(),i(l)):o(new Error("Invalid project file format"))}catch{o(new Error("Failed to parse JSON file"))}},s.onerror=()=>o(new Error("Failed to read file")),s.readAsText(e)})}}const ei="chroma_chords_auth_token",qi="chroma_chords_auth_user",In="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Hi(t){try{const e=t.split(".");if(e.length!==3)return null;let i=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;i.length%4!==0;)i+="=";let o="";if(typeof atob=="function")o=atob(i);else if(typeof Buffer<"u")o=Buffer.from(i,"base64").toString("binary");else return null;const s=decodeURIComponent(o.split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function Cn(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return In}}class En{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:Cn(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(ei);if(e){const i=Hi(e);i&&i.exp&&i.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture}):(localStorage.removeItem(ei),localStorage.removeItem(qi),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Hi(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(i=>{try{i(e)}catch(o){console.error("Error in AuthState listener:",o)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const i=Hi(e);if(!i||!i.sub)return{success:!1,message:"Failed to decode Google user token."};if(i.exp&&i.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:i.sub,email:i.email,name:i.name,picture:i.picture};try{typeof localStorage<"u"&&(localStorage.setItem(ei,e),localStorage.setItem(qi,JSON.stringify(this.currentUser)))}catch(o){console.warn("Failed to persist auth session to localStorage:",o)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const i=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(i){i.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),i.addEventListener("error",()=>e(!1));return}const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{this.gisLoaded=!0,e(!0)},o.onerror=()=>e(!1),document.head.appendChild(o)})}async renderGoogleButton(e,i){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const o=window.google;if(o?.accounts?.id)try{o.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const n=this.handleCredentialResponse(s.credential);i?.({success:n.success,message:n.message})}else i?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",o.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(i=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:o=>{if(o.credential){const s=this.handleCredentialResponse(o.credential);i({success:s.success,message:s.message})}else i({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(o=>{(o.isNotDisplayed?.()||o.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(o){const s=o instanceof Error?o.message:String(o);i({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(ei),localStorage.removeItem(qi)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const Ft=new En;class Mn{formatUrl(e){let i=e.trim().replace(/\/+$/,"");return i&&!i.startsWith("http://")&&!i.startsWith("https://")&&(i="https://"+i),i}applyAuthHeaders(e,i){if(!i)return;const o=i.trim();o.toLowerCase().startsWith("bearer ")?e.Authorization=o:e.Authorization=`Bearer ${o}`}async testConnection(e,i){const o=this.formatUrl(e);if(!o)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,i);const n=new AbortController,a=setTimeout(()=>n.abort(),8e3),l=await fetch(`${o}/api/health`,{method:"GET",headers:s,signal:n.signal});if(clearTimeout(a),l.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await l.json().catch(()=>({}))).timestamp};if(l.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const r=await l.text().catch(()=>"");return{ok:!1,status:l.status,message:`Connection error (${l.status}): ${r||l.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,i,o){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,i);const a=new AbortController,l=setTimeout(()=>a.abort(),45e3);try{const r=await fetch(`${s}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(o),signal:a.signal});if(clearTimeout(l),!r.ok){let c="";try{const d=await r.json();c=d.error||d.message||""}catch{c=await r.text().catch(()=>"")}throw new Error(`Cloud sync failed (${r.status}): ${c||r.statusText||"Unknown error"}`)}return await r.json()}catch(r){throw clearTimeout(l),r instanceof Error&&r.name==="AbortError"?new Error("Cloud sync request timed out (45s limit)"):r}}}const Tn=new Mn,Zo="chroma_chords_deleted_projects",es="chroma_chords_last_sync_time",Nn="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev";function An(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return Nn}}function ts(t){return typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(t):null}function is(t,e){typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}class On{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.lastSyncError=null,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=Ft.subscribe(e=>{const i=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.authenticated||(this.lastSyncError=null),this.notifyAuthState(),this.notifySyncStatus(),!i&&this.authenticated&&this.syncWithCloud().catch(o=>{console.warn("Auto cloud sync on sign-in encountered an error:",o)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(i){console.error("Error in SyncStatus callback:",i)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(i){console.error("Error in AuthState callback:",i)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(i=>{try{i(e)}catch(o){console.error("Error in ProjectsChange callback:",o)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return It.getProjects()}isProjectSaved(e){return e?It.getProjects().some(i=>i.id===e):!1}saveProject(e){It.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){It.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=ts(Zo);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){is(Zo,JSON.stringify(e))}addTombstone(e){const i=this.getTombstones(),o=i.findIndex(n=>n.id===e),s=new Date().toISOString();o>=0?i[o].deletedAt=s:i.push({id:e,deletedAt:s}),this.setTombstones(i)}removeTombstone(e){const i=this.getTombstones().filter(o=>o.id!==e);this.setTombstones(i)}getLastSyncTime(){return ts(es)}setLastSyncTime(e){is(es,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const i=await Ft.getAccessToken();if(!this.isAuthenticated()||!i)return;const o=e||An();if(o){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=It.getProjects(),n=this.getTombstones(),a=this.getLastSyncTime(),l=a?new Date(a).getTime():0,c=(a?s.filter(x=>!x.syncedToCloud||x.lastModified&&x.lastModified>l):s).map(x=>({...x,deletedAt:null})),d=await Tn.sync(o,i,{sets:c,lastSyncTime:a,tombstones:n}),p=new Map;s.forEach(x=>{p.set(x.id,{...x,syncedToCloud:!0})});const u=d.tombstones||[],h=new Set(u.map(x=>x.id));(d.sets||[]).forEach(x=>{if(x.deletedAt)h.add(x.id);else{const C=p.get(x.id),I=x.lastModified||(x.updatedAt?new Date(x.updatedAt).getTime():0),$=C?.lastModified||0;(!C||I>=$)&&p.set(x.id,{id:x.id,name:x.name,lastModified:I,genre:x.genre,mood:x.mood,key:x.key,scaleType:x.scaleType,bpm:x.bpm,showTheory:x.showTheory,chords:Array.isArray(x.chords)?x.chords:[],syncedToCloud:!0})}}),h.forEach(x=>{p.delete(x)});const g=Array.from(p.values());It.setProjects(g);const f=this.getTombstones(),b=new Set(n.map(x=>x.id)),y=f.filter(x=>!b.has(x.id));this.setTombstones(y),(d.lastSyncTime||d.syncedAt)&&this.setLastSyncTime(d.lastSyncTime||d.syncedAt),this.lastSyncError=null,this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){this.lastSyncError=s instanceof Error?s.message:String(s),console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}getLastSyncError(){return this.lastSyncError}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const j=new On;let Ji=null,ki=null,Si=null,$i=null,Gt=null,Yi=null,Wi=null,Ki=null,ti=null,Xi=null,Qi=null,Zi=null,eo=null,ii=null,oi=null,si=null,ni=null,ai=null,to=null,io=null,oo=null,ri=null,li=null,so=null,no=null,ci=null,ao=null,ro=null;function Uo(){return Ji||(Ji=new Es({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Ji}let di="Warm",Ct=null,lo=null,gt=null,co=null,pi=null,ft=null,po=null,ho=null,uo=null,bt=null;function xt(){if(!Ct){Ct=new Vt(1);const t=Uo();lo=new Ve({frequency:3200,type:"lowpass",rolloff:-12}),gt=new Vt(1),lo.connect(gt),gt.connect(t),Ct.connect(lo),co=new At({high:3.5,mid:0,low:-.5,highFrequency:4500}),pi=new at({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{pi.start()}catch{}ft=new Vt(0),co.connect(pi),pi.connect(ft),ft.connect(t),Ct.connect(co),po=new Ve({frequency:1800,type:"bandpass",Q:.8}),ho=new Ot({frequency:.5,depth:.1,wet:.4}),uo=new nt({distortion:.1,wet:.15}),bt=new Vt(0),po.connect(ho),ho.connect(uo),uo.connect(bt),bt.connect(t),Ct.connect(po)}return Ct}function Me(t){xt();const e=t?t.toLowerCase().trim():"warm";di=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const i=.05,o=ji();try{gt&&ft&&bt&&(di==="Warm"?(gt.gain.rampTo(1,i,o),ft.gain.rampTo(0,i,o),bt.gain.rampTo(0,i,o)):di==="Glassy"?(gt.gain.rampTo(0,i,o),ft.gain.rampTo(1,i,o),bt.gain.rampTo(0,i,o)):di==="Dusty"&&(gt.gain.rampTo(0,i,o),ft.gain.rampTo(0,i,o),bt.gain.rampTo(1,i,o)))}catch(s){console.warn("Failed to ramp master tone:",s)}}function Fn(t="Warm",e){const i=t?t.toLowerCase().trim():"warm",o=e??yn();if(i==="glassy"){const n=new At({high:3.5,mid:0,low:-.5,highFrequency:4500}),a=new at({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{a.start(0)}catch{}return n.connect(a),a.connect(o),n}if(i==="dusty"){const n=new Ve({frequency:1800,type:"bandpass",Q:.8}),a=new Ot({frequency:.5,depth:.1,wet:.4}),l=new nt({distortion:.1,wet:.15});return n.connect(a),a.connect(l),l.connect(o),n}const s=new Ve({frequency:3200,type:"lowpass",rolloff:-12});return s.connect(o),s}const mo=typeof import.meta<"u"&&"./"||"./",zi=mo.endsWith("/")?mo:`${mo}/`,Ts={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},Bn=`${zi}audio/samples/grand-piano/`,Ns={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},Dn=`${zi}audio/samples/stage-rhodes/`,As={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},Pn=`${zi}audio/samples/nylon-guitar/`,Os={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},Rn=`${zi}audio/samples/jazz-guitar/`;function Ln(t="piano"){let e=null,i={};if(t==="jazz-guitar"?(e=Gt,i=Os):t==="guitar"?(e=$i,i=As):t==="rhodes"||t==="epiano"?(e=Si,i=Ns):(e=ki,i=Ts),!e||!e.loaded)return null;const o=e._buffers;if(!o)return null;const s={};for(const n of Object.keys(i))try{const a=To(n).toMidi(),l=o.has(a)?o.get(a):o.has(n)?o.get(n):null;l&&typeof l.get=="function"&&l.get()&&(s[n]=l.get())}catch{}return Object.keys(s).length>0?s:null}async function jn(t="piano"){const e=Un(t);if(e.loaded)return e;try{return await Promise.race([Cs(),new Promise((i,o)=>setTimeout(()=>o(new Error("Sample load timeout")),3e3))]),e}catch(i){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,i),null}}function Fs(){return ki||(ki=new st({urls:Ts,baseUrl:Bn,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(xt())),ki}function Bs(){return Si||(Si=new st({urls:Ns,baseUrl:Dn,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(xt())),Si}function Ds(){return $i||($i=new st({urls:As,baseUrl:Pn,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(xt())),$i}function Ps(){if(!Gt){const t=xt();Yi=new At({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Wi=new Ve({frequency:2800,type:"lowpass",rolloff:-12}),Ki=new ot({decay:1.8,preDelay:.02,wet:.18}),Gt=new st({urls:Os,baseUrl:Rn,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),Gt.connect(Yi),Yi.connect(Wi),Wi.connect(Ki),Ki.connect(t)}return Gt}function zn(){if(!ai){const t=xt();to=new Ot({frequency:.45,depth:.18,wet:.65}),io=new nt({distortion:.12,wet:.18}),oo=new Ve({frequency:3400,type:"lowpass",rolloff:-12}),ri=new at({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{ri.start()}catch{}ai=new de(Tt,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),ai.connect(to),to.connect(io),io.connect(oo),oo.connect(ri),ri.connect(t)}return ai}function Un(t){return t==="jazz-guitar"?Ps():t==="guitar"?Ds():t==="rhodes"||t==="epiano"?Bs():Fs()}function Rs(t){const e=xt();switch(t){case"organ":return ti||(Xi=new Ot({frequency:5.8,depth:.12,wet:.55}),Qi=new nt({distortion:.08,wet:.15}),Zi=new Ve({frequency:4500,type:"lowpass",rolloff:-12}),ti=new de(Ue,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),ti.connect(Xi),Xi.connect(Qi),Qi.connect(Zi),Zi.connect(e)),ti;case"pad-strings":if(!oi){eo=new ot({decay:5.5,preDelay:.03,wet:.45}),ii=new at({frequency:.45,delayTime:4,depth:.5,wet:.4});try{ii.start()}catch{}oi=new de(Ue,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),oi.connect(ii),ii.connect(eo),eo.connect(e)}return oi;case"juno-pad":if(!ni){si=new at({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{si.start()}catch{}ni=new de(Tt,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),ni.connect(si),si.connect(e)}return ni;case"stab":return li||(so=new nt({distortion:.1,wet:.12}),no=new ot({decay:1,wet:.22}),li=new de(Tt,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),li.connect(so),so.connect(no),no.connect(e)),li;case"bell":return ci||(ao=new At({high:3.5,mid:-.5,low:-2,highFrequency:4800}),ro=new ot({decay:3.2,wet:.32}),ci=new de(Mo,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),ci.connect(ao),ao.connect(ro),ro.connect(e)),ci;case"guitar":return Ds();case"jazz-guitar":return Ps();case"sh101":return zn();case"rhodes":case"epiano":return Bs();default:return Fs()}}const Pe=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],os={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function Je(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(os[e])return os[e];const i=Pe.find(o=>o.name.toLowerCase()===e);return i?i.name:"Grand Piano"}const Wt=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1,isStrum:!0}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],Ui={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},_o={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},_n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function K(t){const e=Math.floor(t/12)-1,i=t%12;return`${_n[i]}${e}`}function Vo(){return Promise.race([Cs(),new Promise(t=>setTimeout(t,80))])}function Ls(t,e){const i=e/60;switch(t){case"1/4":return 1/i;case"1/8":return .5/i;case"1/8T":return .5/i*(2/3);case"1/16":return .25/i;case"1/32":return .125/i;default:return .25/i}}function js(t,e){const i=[];for(let o=0;o<e;o++)for(const s of t){const n=s.match(/^([A-G]#?)(-?\d+)$/);if(n){const a=n[1],l=parseInt(n[2],10)+o;i.push(`${a}${l}`)}else i.push(s)}return i}function zs(t,e){const i=[...t];switch(e){case"up":return i;case"down":return[...i].reverse();case"up-down":return[...i,...[...i].reverse().slice(1,-1)];case"random":return i.sort(()=>Math.random()-.5);default:return i}}const ss={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function No(t){if(!t)return;const e=t.toLowerCase().trim();return ss[e]?ss[e]:Pe.find(o=>o.name.toLowerCase()===e||o.instrument.toLowerCase()===e)?.name}function Ao(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Wt.find(o=>o.name.toLowerCase()===e)?.name??"Block chords"}function Vn(t,e=.7,i,o="piano",s){try{Promise.all([zo(),Vo()]).then(()=>{const n=Rs(o);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof n.set=="function"&&n.set(s)}catch(u){console.warn("Failed to apply customConfig to Tone.js instrument:",u)}const a=t.length,l=a<=1?1:Math.max(.4,1/Math.sqrt(a)),r=ji(),c=o==="guitar"||o==="jazz-guitar",d=o==="jazz-guitar";if(i&&i.arpMode&&i.arpMode!=="off"){const u=i.bpm??80,h=i.arpRate??"1/16",g=i.arpRange??1,f=i.arpMode,b=Ls(h,u),y=js(t,g),x=zs(y,f),C=()=>i.minVelocity!==void 0&&i.maxVelocity!==void 0?(i.minVelocity+Math.random()*(i.maxVelocity-i.minVelocity))/127*l:l,I=(i.isStrum===!0||i.playStyle==="Strum"||h==="1/32")&&(h==="1/32"||i.isStrum===!0),$=typeof i.arpGate=="number"?Math.max(.1,Math.min(2,i.arpGate)):.85,N=1+(Math.random()-.5)*.1*(i.humanVariance??0),L=typeof i.duration=="number"&&i.duration>0?i.duration:e,E=typeof i.spread=="number"&&i.spread>0?Math.min(.045,Math.max(.02,i.spread*.04)):.028,T=I?E:b,R=Math.max(1.4,L)*(1+(Math.random()-.5)*.1*(i.humanVariance??0)),q=Math.max(.04,b*$*N);x.forEach((H,B)=>{const O=i.microTiming?(Math.random()-.5)*i.microTiming*(I?.005:.02):0,V=I?R:q;let oe=C();I&&c&&B===0&&(oe=Math.min(1,oe*(d?1.05:1.1))),n.triggerAttackRelease(H,V,r+B*T+O,oe)});return}(c?[...t].sort((u,h)=>{try{return To(u).toMidi()-To(h).toMidi()}catch{return 0}}):t).forEach((u,h)=>{let g=0,f=l,b=e;if(i){const{minVelocity:y,maxVelocity:x,spread:C,microTiming:I,humanVariance:$,duration:N}=i;f=(typeof i.velocity=="number"?Math.min(1,Math.max(.1,i.velocity/127)):(y+Math.random()*(x-y))/127)*l;const E=c?h*(d?.018:.024):0,T=h*(C??.3)*.1,R=(Math.random()-.5)*(I??0)*.05,q=(Math.random()-.5)*($??0)*.03;g=Math.max(0,E+T+R+q),b=(N||e)*(1+(Math.random()-.5)*.2*($??0))}else c&&(g=h*(d?.018:.024));c&&h===0&&(f=Math.min(1,f*(d?1.05:1.1))),n.triggerAttackRelease(u,b,r+g,f)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function Us(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const i=[...t],s=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(s){const n=parseInt(s[2],10);i.push(`${s[1]}${n+1}`)}return i}function ns(t,e,i){const o=e==="Unknown"||!e?"Pop":e,s=i?.instrument?Je(i.instrument):void 0,n=s?Pe.find(y=>y.name.toLowerCase()===s.toLowerCase()):void 0,a=i?.playStyle||i?.feelSettings?.playStyle,l=a?Wt.find(y=>y.name===a):void 0,r=n?.instrument??Ui[o]??"piano",c=_o[o]||{},d=l?.patch??{};i?.feelSettings?.tone&&Me(i.feelSettings.tone);const p={};if(i?.feelSettings){const{spread:y,swing:x,humanise:C,humanState:I,advOverride:$}=i.feelSettings;if(I)Object.assign(p,I);else if(typeof y=="number"&&(p.spread=parseFloat((y/100).toFixed(2))),typeof C=="number"&&(p.humanVariance=parseFloat((C/100).toFixed(2))),typeof x=="number"||typeof C=="number"){const N=typeof x=="number"?x:0,L=typeof C=="number"?C:45;p.microTiming=parseFloat((N/100*.5+L/100*.3).toFixed(2))}$&&(typeof $.spread=="number"&&(p.spread=$.spread),typeof $.duration=="number"&&(p.duration=$.duration),typeof $.humanVariance=="number"&&(p.humanVariance=$.humanVariance),typeof $.variance=="number"&&(p.humanVariance=$.variance),typeof $.microTiming=="number"&&(p.microTiming=$.microTiming),typeof $.micro=="number"&&(p.microTiming=$.micro),typeof $.arpMode=="string"&&(p.arpMode=$.arpMode),typeof $.arpRate=="string"&&(p.arpRate=$.arpRate),typeof $.arpRange=="number"&&(p.arpRange=$.arpRange),typeof $.arpGate=="number"&&(p.arpGate=$.arpGate),typeof $.minVelocity=="number"&&(p.minVelocity=$.minVelocity),typeof $.maxVelocity=="number"&&(p.maxVelocity=$.maxVelocity))}d.arpMode&&d.arpMode!=="off"&&(i?.feelSettings?.advOverride&&i.feelSettings.advOverride.arpMode!==void 0||(p.arpMode=d.arpMode,d.arpRate&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRate===void 0)&&(p.arpRate=d.arpRate),d.arpRange!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.arpRange===void 0)&&(p.arpRange=d.arpRange))),d.isStrum!==void 0&&(!i?.feelSettings?.advOverride||i.feelSettings.advOverride.isStrum===void 0)&&(p.isStrum=d.isStrum);const u={...c,...d,...p,bpm:i?.bpm??c.bpm??90,playStyle:a,...typeof i?.velocity=="number"?{velocity:i.velocity}:{}},h=i?.duration??c.duration??.9,g=typeof p.duration=="number"?p.duration:d.durationMultiplier?h*d.durationMultiplier:h,f=i?.feelSettings?.density??50,b=Us(t,f);Vn(b,g,u,r,i?.customConfig)}let go=null;function Gn(){if(!go){const t=Uo();go=new Ue({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return go}function as(t,e=.8,i,o=.85){try{Promise.all([zo(),Vo()]).then(()=>{const s=Gn(),a=`${t.replace(/\d+$/,"")}1`,l=typeof i=="number"?i:ji();s.triggerAttackRelease(a,e,l,o)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function qn(t,e="root position"){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=4,s=(Array.isArray(t)?t:[]).filter(c=>typeof c=="string"&&c.trim().length>0).map(c=>c.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let n=o,a=i[s[0]]??0;const l=[];s.forEach((c,d)=>{const p=i[c]??0;d>0&&p<=a&&n++,l.push({name:c,oct:n}),a=p});const r=(e||"").toLowerCase();if(r.includes("octave")||r.includes("high"))return l.map(c=>`${c.name}${c.oct+1}`);if(r.includes("inversion")||r.includes("1st")){if(l.length>1){const[c,...d]=l;return[...d.map(p=>`${p.name}${p.oct}`),`${c.name}${c.oct+1}`]}return l.map(c=>`${c.name}${c.oct}`)}else return l.map(c=>`${c.name}${c.oct}`)}let mt=null,Nt=null,_s="lead-synth",Vs="Stage Rhodes",Go=85,qo=!1;function Hn(t){t&&(Vs=t)}function Jn(t){_s=t,mt&&Gs(mt,t)}function Yn(t){Go=Math.max(0,Math.min(100,t)),Ho()}function Wn(t){qo=t,Ho()}function Kn(t){Ho()}function Ho(){Nt&&(qo?Nt.gain.value=0:Nt.gain.value=Go/100*.9)}function Gs(t,e){try{switch(e){case"warm-pluck":t.set({oscillator:{type:"triangle"},envelope:{attack:.005,decay:.2,sustain:.05,release:.3}});break;case"lofi-sine":t.set({oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.7,release:.5}});break;case"electric-lead":t.set({oscillator:{type:"sawtooth4"},envelope:{attack:.01,decay:.4,sustain:.6,release:.4}});break;case"reed-flute":t.set({oscillator:{type:"sine8"},envelope:{attack:.08,decay:.2,sustain:.8,release:.35}});break;default:t.set({oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}});break}}catch{}}function Xn(){if(!mt)try{mt=new de(Ue,{oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}}),Nt=new Vt(.75);const t=Uo();mt.connect(Nt),Nt.connect(t),Gs(mt,_s)}catch{return null}return mt}function et(t,e,i,o=.85,s){if(!qo)try{Promise.all([zo(),Vo()]).then(()=>{const n=typeof t=="number"?K(t):t,a=typeof i=="number"?i:ji(),l=Math.max(.05,e),c=Math.max(.05,Math.min(1,o))*(Go/100),p=Je(s||Vs),u=Pe.find(g=>g.name.toLowerCase()===p.toLowerCase());if(u){const g=Rs(u.instrument);if(g&&typeof g.triggerAttackRelease=="function"){g.triggerAttackRelease(n,l,a,c);return}}const h=Xn();h&&typeof h.triggerAttackRelease=="function"&&h.triggerAttackRelease(n,l,a,c)}).catch(()=>{})}catch{}}const Qn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Zn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],_={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},ea=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Bt=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Re={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14],pow5:[0,7],mu:[0,2,4,7],add9:[0,4,7,14],min7b5:[0,3,6,10],dom7sharp9:[0,4,7,10,15]},ta=Object.keys(Re),Ti={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Dt={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},Pt={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},Rt={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function z(t,e){const i=(t%12+12)%12;return e?Zn[i]:Qn[i]}function ge(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),i=e[0]?.toUpperCase();let o="C",s=e;if(i&&/[A-G]/.test(i)){const a=e[1];a==="b"||a==="B"||a==="♭"||a==="♭"?(o=`${i}b`,s=e.slice(2)):a==="#"||a==="♯"||a==="♯"?(o=`${i}#`,s=e.slice(2)):(o=i,s=e.slice(1))}s=s.toLowerCase();let n="maj";return s.includes("m7b5")||s.includes("min7b5")||s.includes("ø")||s.includes("m7♭5")?n="min7b5":s.includes("7#9")||s.includes("7♯9")?n="dom7sharp9":s.includes("add9")?n="add9":s.includes("add2")||s==="2"?n="mu":s==="5"?n="pow5":s.includes("maj9")||s.includes("m9")&&s.includes("maj")?n="maj9":s.includes("min9")||s.includes("m9")?n="min9":s.includes("dom9")||s.includes("9sus")||s.includes("9")?s.includes("9sus")||s.includes("sus9")?n="sus9":n="dom9":s.includes("m(maj7)")||s.includes("mmaj7")||s.includes("minmaj7")?n="mmaj7":s.includes("maj7sus")||s.includes("7sus")?n="sus7":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?n="maj7":s.includes("min7")||s.includes("m7")?n="min7":s.includes("min6")||s.includes("m6")?n="min6":s.includes("maj6")||s.includes("6")&&!s.includes("m")?n="maj6":s.includes("dim7")?n="dim7":s.includes("dim")||s.includes("°")?n="dim":s.includes("aug")||s.includes("+")?n="aug":s.includes("sus2")?n="sus2":s.includes("sus4")||s.includes("sus")?n="sus4":s.includes("7")?n="dom7":s.includes("min")||s==="m"?n="min":n="maj",{root:o,quality:n}}const ia=Object.keys(Rt),_e={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},hi={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},Et={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},rs={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},qs=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],oa={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},sa={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Jo={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},lt=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Lt(t){return(lt.find(e=>e.name===t)||lt[0]).dot}const na={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function aa(t,e){return 1+t.degrees.filter(i=>e.includes(i)).length*.6}function Ee(t,e){const i=t.reduce((s,n)=>s+e(n),0);let o=Math.random()*i;for(const s of t)if(o-=e(s),o<=0)return s;return t[t.length-1]}function ra(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const Oo=4,Kt=1,jt=8,la={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Hs(t,e="MAJOR",i="Pop",o="Uplifting"){let n={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(n*=1.4),t==="SUBTONIC"&&(n*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(n*=1.8),t==="SUBDOMINANT"&&(n*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(n*=1.8),i==="Lo-fi/Chill"||i==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(n*=2),t==="SUBMEDIANT"&&(n*=1.5)):i==="Jazz-ish"||i==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(n*=2.5),t==="SUBDOMINANT"&&(n*=1.8)):i==="Pop"||i==="Indie/Folk"||i==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(n*=1.8):i==="Synthwave"||i==="House/Dance"||i==="Rock"||i==="Punk"||i==="Funk/Disco"||i==="Reggae/Dub"?(t==="SUBTONIC"&&(n*=2.2),t==="SUBDOMINANT"&&(n*=1.8),t==="SUBMEDIANT"&&(n*=1.6)):(i==="Classical/Orchestral"||i==="Gospel")&&t==="TONIC"&&(n*=2.5),o==="Uplifting"||o==="Epic"||o==="Peaceful"?t==="TONIC"&&(n*=2.5):o==="Melancholy"||o==="Dark"?(t==="SUBMEDIANT"&&(n*=2.2),t==="SUPERTONIC"&&(n*=1.5)):o==="Dreamy"||o==="Nostalgic"||o==="Warm"?(t==="SUBDOMINANT"&&(n*=2),t==="SUBMEDIANT"&&(n*=1.6),t==="MEDIANT"&&(n*=1.4)):o==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(n*=1.8):(o==="Groovy"||o==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.8),(Jo[o]||[]).includes(t)&&(n*=1.3),Math.max(.01,n)}function rt(t,e,i="MAJOR",o="Pop",s="Uplifting"){if(t===e)return .05;let a=(la[t]||{})[e]??.1;return(i.includes("MINOR")||i==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(a*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(a*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(a*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(a*=1.3)),o==="Jazz-ish"||o==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(a*=1.8),t==="DOMINANT"&&e==="TONIC"&&(a*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(a*=1.4)):(o==="House/Dance"||o==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(a*=1.5),(Jo[s]||[]).includes(e)&&(a*=1.5),Math.max(.01,a)}function ca(t,e,i,o,s,n,a=Oo){let l=i.filter(p=>t.degrees[p]);l.length||(l=i);const r=Ee(l,p=>Hs(p,t.type,s,n))||"TONIC",c=[r];let d=r;for(let p=1;p<a;p++){const u=p===a-1;let h=i.filter(b=>t.degrees[b]);h.length||(h=i);const g=h.filter(b=>b!==d),f=g.length?g:h;if(u){const b=Ee(f,y=>{const x=rt(y,c[0],t.type,s,n),C=rt(d,y,t.type,s,n);return x*C});c.push(b)}else{const b=f.filter(C=>!c.includes(C)),y=b.length?b:f,x=Ee(y,C=>rt(d,C,t.type,s,n));d=x,c.push(x)}}return c}function Xt(t,e,i){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:i}function W(t,e){const{root:i,quality:o}=ge(t),s=_[i]??0,n=Re[o]||Re.maj,a=Xt(i,o,e);return n.map(l=>z(s+l,a))}async function da(){const t=typeof import.meta<"u"?"./":"/",i=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let o=await fetch(i).catch(()=>null);if((!o||!o.ok)&&(o=await fetch("/chroma_chords_data.json").catch(()=>null)),(!o||!o.ok)&&(o=await fetch("./chroma_chords_data.json").catch(()=>null)),!o||!o.ok)throw new Error(`HTTP error: ${o?o.status:"failed to fetch chroma_chords_data.json"}`);const s=await o.json();return fa(s),s}const pa={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},ha={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},ua={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},ma={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},ga={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Js={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function fa(t){const e=[["MIXOLYDIAN",pa],["DORIAN",ha],["LYDIAN",ua]];for(const[i,o]of e)for(const[s,n]of Object.entries(o)){const a=t.scales[`${n}_MAJOR`];if(!a)continue;const l=`${s}_${i}`,r={};for(const c of Js[i]){const d=ga[`${i}_${c}`],p=a.degrees[d];if(!p)continue;const u=JSON.parse(JSON.stringify(p));u.next_chord_options=(u.next_chord_options||[]).map(h=>{if(h.nodeId.startsWith(`${n}_MAJOR_`)){const g=h.nodeId.replace(`${n}_MAJOR_`,""),f=ma[`${i}_${g}`];if(f)return{name:h.name,nodeId:`${s}_${i}_${f}`}}return h}),r[c]=u}t.scales[l]={root:s,type:i,degrees:r}}}const ba=[156,192,236],va=[242,115,95];function Ii(t,e,i){return t+(e-t)*i}function zt(t){const e=Math.max(0,Math.min(1,t));return"#"+ba.map((o,s)=>Math.round(Ii(o,va[s],e))).map(o=>o.toString(16).padStart(2,"0")).join("")}function se(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(Ii(84,128,e)),radius:Math.round(Ii(40,12,e)),fontSize:Math.round(Ii(21,30,e)),color:zt(e)}}function Ni(t,e,i){return{Tonic:`As the tonic, ${i} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${i} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${i} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${i} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${i} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${i} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${i} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${i} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${i} colors the progression as the ${t.toLowerCase()} of ${e}.`}function tt(t,e,i,o){const n=i.degrees[e].chord_name,a=Pt[e]??.5,l=Rt[i.type]||Rt.MAJOR;return{name:Fo(n),tag:Ti[e]||"move",roman:l[e]||"?",color:zt(a),functionLabel:Dt[e]||e,notes:W(n,o),scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:Ni(Dt[e]||e,_e[i.type]||i.type,Fo(n)),degree:e,scaleKey:t,tension:a}}function Fo(t){const{root:e,quality:i}=ge(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4",pow5:"5",mu:"add2",add9:"add9",min7b5:"m7b5",dom7sharp9:"7#9"}[i]??""}`}const ya={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Ys(t,e){let i=ya[t]||92;return e==="Tense"&&(i+=6),(e==="Dreamy"||e==="Melancholy")&&(i-=6),i}function Ai(t,e,i,o){const s=Math.max(Kt,Math.min(jt,o?.length??Oo)),n=oa[e]||"MAJOR",a=sa[i],l=o?.scaleType||(a&&n==="MAJOR"?a:n);let r=o?.key&&Bt.includes(o.key)?o.key:ra(Bt),c=`${r}_${l}`;t.scales[c]||(r="C",c=`${r}_${l}`);let d=t.scales[c];if(!d){const C=Object.keys(t.scales).find(I=>I.endsWith(`_${l}`))||Object.keys(t.scales)[0];d=t.scales[C],r=d?d.root:"C",c=C}const p=U(r,l),u=Object.keys(d.degrees),h=Jo[i]||[],g=na[l]||[],f=s===Oo?g.filter(C=>C.degrees.every(I=>u.includes(I))):[],x=(f.length&&Math.random()<.25?Ee(f,C=>aa(C,h)).degrees:ca(d,c,u,h,e,i,s)).map(C=>tt(c,C,d,p));return{genre:e,mood:i,key:r,scaleType:l,bpm:Ys(e,i),chords:x}}function xa(t,e,i,o=[]){const s=t.chords.length,n=Math.max(Kt,Math.min(jt,e));if(n===s)return{progression:t,cachedTailChords:[...o]};if(n<s){const T=t.chords.slice(0,n),R=t.chords.slice(n);return{progression:{...t,chords:T},cachedTailChords:[...R,...o]}}const a=[...t.chords],l=[...o],r=n-s,c=[];for(;c.length<r&&l.length>0;)c.push(l.shift());const d=[...a,...c],p=n-d.length;if(p<=0)return{progression:{...t,chords:d},cachedTailChords:l};const u=t.key||"C",h=t.scaleType||"MAJOR";let g=`${u}_${h}`,f=i.scales?.[g];if(!f&&i.scales&&Object.keys(i.scales).length>0){const T=Object.keys(i.scales).find(R=>R.endsWith(`_${h}`))||Object.keys(i.scales)[0];f=i.scales[T],g=T}if(!f)return{progression:{...t,chords:d},cachedTailChords:l};const b=U(f.root||u,h),y=Object.keys(f.degrees);let x=y.filter(T=>f.degrees[T]);x.length||(x=y);const C=T=>{if(!T)return"TONIC";if(T.degree&&f.degrees[T.degree])return T.degree;for(const[R,q]of Object.entries(f.degrees))if(q.chord_name===T.name)return R;return"TONIC"},I=d[d.length-1];let $=C(I);const N=d[0],L=C(N),E=[];for(let T=0;T<p;T++){const R=T===p-1,q=x.filter(O=>O!==$),H=q.length?q:x;let B;R?B=Ee(H,O=>{const V=rt(O,L,f.type,t.genre,t.mood),oe=rt($,O,f.type,t.genre,t.mood);return V*oe})||H[0]:B=Ee(H,O=>rt($,O,f.type,t.genre,t.mood))||H[0],$=B,E.push(tt(g,B,f,b))}return{progression:{...t,chords:[...d,...E]},cachedTailChords:l}}const wa={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},ka={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function Ws(t){return Re[t]?t:ge(`C${t||""}`).quality}function Yo(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:e==="pow5"?`${t}5`:e==="mu"?`${t}add2`:e==="add9"?`${t}add9`:e==="min7b5"?`${t}ø7`:e==="dom7sharp9"?`${t}7♯9`:t}function Oi(t,e){const i=wa[t]||{upper:"I",lower:"i"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"||e==="min7b5"?i.lower:i.upper;return Yo(s,e)}function _i(t,e){const i=ka[(t%12+12)%12]||{upper:"?",lower:"?"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"||e==="min7b5"?i.lower:i.upper;return Yo(s,e)}function Sa(t,e,i,o){const s=e==="maj"||e==="dom7"||e==="dom9",n=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${i} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${i} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${i} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${i} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&n)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${i} borrows the poignant minor iv cadence from the parallel minor mode.`};const a=Pt[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,a+.15),desc:`${i} adds chromatic color to the ${o.root} ${_e[o.type]||o.type} progression.`}}function Vi(t,e,i,o){const s=(t%12+12)%12,n=(_[i]??0)+s,l=`${z(n,o)}${Gi[e]??e}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${l} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${l} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${l} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${l} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${l} borrows its color from outside the current key.`}}function $a(t,e,i,o,s){const n=i.degrees[e],{root:a}=ge(n.chord_name),l=_[a]??0,r=z(l,s),c=`${r}${Gi[o]??o}`,d=Xt(r,o,s),p=Re[o]?Re[o].map(g=>z(l+g,d)):W(n.chord_name,s),u=Oi(e,o),h=Sa(e,o,c,i);return{name:c,tag:h.tag,roman:u,color:zt(h.tension),functionLabel:h.functionLabel,notes:p,scaleLabel:`${i.root} ${_e[i.type]||i.type}`,desc:h.desc,degree:e,scaleKey:t,tension:h.tension}}function Fi(t,e,i,o,s,n){const a=`${e}_${i}`,l=t.scales[a];if(!l||!o.length)return null;const r=U(e,i),c=_[e]??0,d={};Object.entries(l.degrees).forEach(([u,h])=>{const{root:g}=ge(h.chord_name),f=_[g]??0;f in d||(d[f]=u)});const p=o.slice(0,jt).map(({root:u,quality:h})=>{const g=_[u]??c,f=d[g],b=Ws(h);if(f){const I=l.degrees[f],{quality:$}=ge(I.chord_name);return b===$||!h&&$?tt(a,f,l,r):$a(a,f,l,b,r)}const y=(g-c+12)%12,x=Vi(y,b,e,r),C=_i(y,b);return Ia(e,y,b,x.functionLabel,C,x.tag,r)});return p.length<Kt?null:{genre:s,mood:n,key:e,scaleType:i,bpm:Ys(s,n),chords:p}}const Gi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4",sus2:"sus2",dom9:"9",maj9:"maj9",min9:"m9",maj6:"6",min6:"m6",mmaj7:"m(maj7)",sus7:"7sus4",sus9:"9sus4",pow5:"5",mu:"add2",add9:"add9",min7b5:"m7b5",dom7sharp9:"7#9"};function Ia(t,e,i,o,s,n,a){const l=(_[t]??0)+e,r=z(l,a),c=Ws(i),d=`${r}${Gi[c]??c}`,p=Xt(r,c,a),u=(Re[c]||Re.maj).map(f=>z(l+f,p)),h=s==="?"?_i(e,c):s,g=.42;return{name:d,tag:n,roman:h,color:zt(g),functionLabel:o==="Borrowed"?Vi(e,c,t,a).functionLabel:o,notes:u,scaleLabel:"Borrowed",desc:`${d} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:g}}function Bo(t){const e=t.match(/^[A-Ga-g][#b]?/),i=e?e[0]:"C";return i[0].toUpperCase()+i.slice(1)}function Ci(t){const e=(t||"C").trim(),i=e[0]?.toUpperCase()||"C";let o=i,s=e.slice(1);if(e.length>1){const n=e[1];n==="b"||n==="B"||n==="♭"||n==="♭"?(o=`${i}b`,s=e.slice(2)):(n==="#"||n==="♯"||n==="♯")&&(o=`${i}#`,s=e.slice(2))}return{root:o,suffix:s}}function Ks(t,e,i){const{root:o,suffix:s}=Ci(t),n=o.replace("♭","b").replace("♯","#"),l=(((_[n]??0)+e)%12+12)%12;return`${z(l,i)}${s}`}function ls(t,e,i){if(!t||!t.chords||t.chords.length===0)return t;const o=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),s=/\bmaj\b|major/i.test(e),n=o&&!s,a=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),l=i||(n?"NATURAL_MINOR":s?"MAJOR":t.scaleType||"MAJOR"),r=a,c=(t.key||"C").replace("♭","b").replace("♯","#").trim(),d=_[c]??0,p=_[r]??0,u=((p-d)%12+12)%12,h=U(r,l),g=`${r}_${l}`,f=Et[l]||Et.MAJOR,b=t.chords.map(y=>{const x=Ks(y.name,u,h),{root:C,quality:I}=ge(x),N=(((_[C]??0)-p)%12+12)%12;let L=null;for(const[O,V]of Object.entries(f))if(V===N){L=O;break}let E,T,R=y.tag||"move",q=y.tension,H=y.degree;if(L)H=L,E=Oi(H,I),T=Dt[H]||H,R=Ti[H]||R,q=Pt[H]??q;else{H="BORROWED",E=_i(N,I);const O=Vi(N,I,r,h);T=O.functionLabel,R=O.tag||R,q=O.tension||.45}const B=W(x,h);return{...y,name:x,roman:E,functionLabel:T,tag:R,notes:B,degree:H,scaleKey:g,scaleLabel:`${r} ${_e[l]||l}`,desc:Ni(T,_e[l]||l,x),tension:q}});return{...t,key:r,scaleType:l,chords:b}}function Ca(t,e,i,o){if(["sus4","sus2","sus7","sus9","pow5","mu","add9","min7b5","dom7sharp9"].includes(t))return t;const s=t.includes("7"),n=t.includes("9"),a=t.includes("6");return e==="min"?n?"min9":s?i==="TONIC"&&(o==="HARMONIC_MINOR"||o==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":a?"min6":"min":e==="maj"?n?i==="DOMINANT"?"dom9":"maj9":s?i==="DOMINANT"?"dom7":"maj7":a?"maj6":"maj":e==="dim"?s?"dim7":"dim":e==="aug"?"aug":e}function Ea(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;case"pow5":return`${t}5`;case"mu":return`${t}add2`;case"add9":return`${t}add9`;case"min7b5":return`${t}m7b5`;case"dom7sharp9":return`${t}7#9`;default:return`${t}${e}`}}function Ma(t,e){if(!t||!t.chords||t.chords.length===0)return t;const i=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=(e||i).toUpperCase().replace(/\s+/g,"_"),s=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=_[s]??0,a=U(s,o),l=`${s}_${o}`,r=hi[i]||hi.MAJOR,c=Et[i]||Et.MAJOR,d=hi[o]||hi.MAJOR,p=Et[o]||Et.MAJOR,u=rs[o]||rs.MAJOR,h=t.chords.map(g=>{const{root:f,quality:b}=ge(g.name),x=(((_[f]??0)-n)%12+12)%12;let C=-1;if(g.degree&&g.degree!=="BORROWED"&&(C=r.indexOf(g.degree)),C===-1)for(let I=0;I<r.length;I++){const $=r[I];if(c[$]===x){C=I;break}}if(C>=0&&C<d.length){const I=d[C],$=p[I],N=(n+$)%12,L=z(N,a),E=u[I]||"maj",T=Ca(b,E,I,o),R=Ea(L,T),q=W(R,a),H=Rt[o]?.[I];let B;if(H)if(T==="maj"||T==="min")B=H;else{const Y=H.replace(/[°+]/g,"");B=Yo(Y,T)}else B=Oi(I,T);const O=Dt[I]||I,V=Ti[I]||g.tag||"move",oe=Pt[I]??g.tension;return{...g,name:R,roman:B,functionLabel:O,tag:V,notes:q,degree:I,scaleKey:l,scaleLabel:`${s} ${_e[o]||o}`,desc:Ni(O,_e[o]||o,R),tension:oe}}else{let I=null;for(const[$,N]of Object.entries(p))if(N===x){I=$;break}if(I){const $=Oi(I,b),N=Dt[I]||I,L=Ti[I]||g.tag||"move",E=Pt[I]??g.tension,T=W(g.name,a);return{...g,roman:$,functionLabel:N,tag:L,notes:T,degree:I,scaleKey:l,scaleLabel:`${s} ${_e[o]||o}`,desc:Ni(N,_e[o]||o,g.name),tension:E}}else{const $=_i(x,b),N=Vi(x,b,s,a),L=W(g.name,a);return{...g,roman:$,functionLabel:N.functionLabel,tag:N.tag||g.tag,tension:N.tension||.45,notes:L,degree:"BORROWED",scaleKey:l,scaleLabel:"Borrowed",desc:`${g.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:o,chords:h}}const cs={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Xs(t,e,i,o){const s=_[t]??0;let n=cs[e]||cs.Major;return i==="6th"?n=[...n,9]:i==="7th (dom / m7)"?n=[...n,10]:i==="Major 7th (M7)"?n=[...n,11]:i==="9th"&&(n=[...n,10,14]),n.map(a=>z(s+a,o))}const Ta={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Na={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Qs(t,e,i){return e==="Minor"&&i==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Ta[e]??""}${Na[i]??""}`}const Aa={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},Zs={};Bt.forEach(t=>{Zs[_[t]]=t});function Oa(t,e){const i=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=Aa[i]??0,n=(((_[t]??0)-o)%12+12)%12;return Zs[n]??"C"}function U(t,e){const i=Oa(t,e);return ea.has(i)||i.includes("b")}function Ei(t,e,i){const o=Bo(t.name),s=o.includes("b"),n=Qs(o,e,i),a=Xs(o,e,i,s);let l=t.roman||"";if(l){const d=l.match(/^([♭♯b#]*)([ivxIVX]+)/);if(d){const p=d[1],u=d[2],h=e==="Minor"||e==="Diminished",g=h?u.toLowerCase():u.toUpperCase();let f="";e==="Diminished"?f=i==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?f="sus4":i==="6th"?f="6":i==="7th (dom / m7)"?f="7":i==="Major 7th (M7)"?f=h?"m(maj7)":"maj7":i==="9th"&&(f=h?"m9":"maj9"),l=`${p}${g}${f}`}}const r=t.initialChord?.tension??t.tension??.1,c=t.initialChord?.color??t.color??zt(r);return{...t,name:n,notes:a,roman:l,tension:r,color:c}}function ee(t,e,i,o,s,n,a,l){const r=Qs(t,e,i),c=Xs(t,e,i,l);return{name:r,tag:o||"sub",roman:o,color:zt(a),functionLabel:s,notes:c,scaleLabel:"Substitution",desc:n,degree:"SUBSTITUTION",scaleKey:"",tension:a}}function Do(t,e,i){const o=_[e.key]??0,s=e.scaleType.includes("MINOR"),n=U(e.key,e.scaleType),a=s?[(()=>{const d=z(o+1,!0),p=ee(d,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:p.name,roman:"♭II",notes:p.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:p,tension:.6}})(),(()=>{const d=z(o+5,!0),p=ee(d,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — deeper minor mood",chord:p,tension:.45}})(),(()=>{const d=z(o+10,!0),p=ee(d,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:p.name,roman:"v",notes:p.notes,sub:"a step further into shadow — unresolving drift",chord:p,tension:.52}})()]:[(()=>{const d=z(o+8,!0),p=ee(d,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:p.name,roman:"♭VI",notes:p.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:p,tension:.5}})(),(()=>{const d=z(o+5,!0),p=ee(d,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — softer, sadder",chord:p,tension:.42}})(),(()=>{const d=z(o+3,!0),p=ee(d,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:p.name,roman:"♭III",notes:p.notes,sub:"a step further out — cooler, more remote",chord:p,tension:.58}})()],l=[(()=>{const d=z(o+7,n),p=z(o+2,n),u=ee(p,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${d}7 — sharpens the approach`,.82,n);return{name:u.name,roman:"V7/V",notes:u.notes,sub:`aimed at ${d}7 — sharpens the approach`,chord:u,tension:.82}})(),(()=>{const d=z(o+(s?3:9),n),p=z(o+4,n),u=ee(p,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${d}m7 — makes it feel arrived at`,.88,n);return{name:u.name,roman:"V7/vi",notes:u.notes,sub:`aimed at ${d}m7 — makes it feel arrived at`,chord:u,tension:.88}})(),(()=>{const d=z(o+1,!0),p=ee(d,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:p.name,roman:"subV7",notes:p.notes,sub:"a tritone substitute — slides in sideways",chord:p,tension:.95}})()],r=[(()=>{const d=z(o+5,n),p=ee(d,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,n);return{name:p.name,roman:"IV",notes:p.notes,sub:"floats rather than resolving",chord:p,tension:.3}})(),(()=>{const d=z(o,n),p=ee(d,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,n);return{name:p.name,roman:s?"im9":"Imaj9",notes:p.notes,sub:"the same home with more air in it",chord:p,tension:.18}})(),(()=>{const d=z(o+(s?3:4),n),p=ee(d,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,n);return{name:p.name,roman:s?"♭III":"iii",notes:p.notes,sub:"wistful, halfway between home and away",chord:p,tension:.35}})()],c=[(()=>{const d=z(o,n),p=ee(d,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,n);return{name:p.name,roman:s?"i":"I",notes:p.notes,sub:"full resolution — the sense of arriving",chord:p,tension:.05}})(),(()=>{const d=z(o+7,n),p=ee(d,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,n);return{name:p.name,roman:"V7",notes:p.notes,sub:"the pull that makes home feel earned",chord:p,tension:1}})(),(()=>{const d=z(o+(s?8:9),n),p=ee(d,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,n);return{name:p.name,roman:s?"♭VI":"vi",notes:p.notes,sub:"a soft landing instead of a full stop",chord:p,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:a},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:l},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:r},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:c}]}function Bi(t,e,i){const o=_[e.key]??0,s=e.scaleType.includes("MINOR"),n=U(e.key,e.scaleType),a=e.chords;if(s){const f=a[0]?.name||"chord 1",b=a[1]?.name||"chord 2",y=a[2]?.name||"chord 3",x=a[3]?.name||"chord 4",C=ee(z(o,n),"Major","None","I","Major tonic","same root, turned bright",.2,n),I=ee(z(o+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n),$=ee(z(o+9,n),"Minor","None","vi","Submediant","melodic lift upward",.4,n),N=ee(z(o+11,n),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,n);return[{name:C.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:C.notes,chord:C,tension:.2},{name:I.name,sub:`in place of ${b} · the Dorian lift, sunny and open`,roman:"IV",notes:I.notes,chord:I,tension:.35},{name:$.name,sub:`in place of ${y} · melodic lift upward`,roman:"vi",notes:$.notes,chord:$,tension:.4},{name:N.name,sub:`in place of ${x} · classical harmonic pull`,roman:"vii°",notes:N.notes,chord:N,tension:.55}]}const l=a[0]?.name||"chord 1",r=a[1]?.name||"chord 2",c=a[2]?.name||"chord 3",d=a[3]?.name||"chord 4",p=ee(z(o,n),"Minor","None","i","Tonic minor","same root, turned sad",.3,n),u=ee(z(o+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),h=ee(z(o+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),g=ee(z(o+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:p.name,sub:`in place of ${l} · same root, turned sad`,roman:"i",notes:p.notes,chord:p,tension:.3},{name:u.name,sub:`in place of ${r} · the lift, but heavier`,roman:"iv",notes:u.notes,chord:u,tension:.4},{name:h.name,sub:`in place of ${c} · big and cinematic`,roman:"♭VI",notes:h.notes,chord:h,tension:.45},{name:g.name,sub:`in place of ${d} · lands sideways, not home`,roman:"♭VII",notes:g.notes,chord:g,tension:.5}]}const Fa={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Ba={m8:43303,circuit:43302};function Da(t,e,i){let o=Fa[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(o=`http://localhost:${Ba[e]}/`);const s=i&&i.length>0?i.map(r=>t.chords[r]).filter(r=>!!r):t.chords,n=s.map(r=>encodeURIComponent(r.name)).join("+");if(e==="circuit"){const r=u=>{const h=(u||"").toLowerCase();return h.includes("octave")||h.includes("high")||h.includes("up")?"octave":h.includes("inversion")||h.includes("1st")?"1st":"root"},c=s.map(u=>r(u.voicing)).join("+"),d=encodeURIComponent(t.key||"C"),p=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${o}?p=${n}&v=${c}&key=${d}&scale=${p}`}const a=r=>{const c=(r||"").toLowerCase();return c.includes("octave")||c.includes("high")||c.includes("up")?"octave":c.includes("inversion")||c.includes("1st")?"inv1":"root"},l=s.map(r=>a(r.voicing)).join("+");return`${o}?p=${n}&v=${l}`}function Pa(t,e,i,o){const s=`${t}_${e}`;let n=i.scales[s];if(!n){const d=Object.keys(i.scales).find(p=>p.endsWith(`_${e}`))||Object.keys(i.scales)[0];n=i.scales[d]||{root:t,type:e,degrees:{}}}const a=U(t,e),l=Rt[e]||Rt.MAJOR,r=Js[e]||["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],c=new Set(o?.chords.map(d=>d.name.toUpperCase())||[]);return r.map(d=>{const p=n.degrees[d],u=p?p.chord_name:t,h=Fo(u),g=l[d]||"?",f=Dt[d]||d,b=Pt[d]??.5,y=W(u,a),x=c.has(h.toUpperCase());return{degreeKey:d,roman:g,chordName:h,functionLabel:f,notes:y,tension:b,isUsedInLoop:x}})}const Ra={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function en(t,e){const{root:i,quality:o}=ge(t),s=_[i]??0,n=Re[o]||Re.maj,a=Xt(i,o,e);return n.map(l=>{const r=z(s+l,a),c=Ra[l]||{symbol:`+${l}`,name:`Interval ${l}`,isGuideTone:!1};return{note:r,intervalSymbol:c.symbol,roleName:c.name,isGuideTone:c.isGuideTone}})}function tn(t){if(!t||t.length<2)return[];const e=[],i=o=>o.replace(/[^A-Za-z♭♯]/g,"");for(let o=0;o<t.length;o++){const s=o,n=(o+1)%t.length,a=t[s],l=t[n],r=i(a.roman),c=i(l.roman),d=s+1,p=n+1,u=`Bar ${d} → ${p}`,h=`${a.name} → ${l.name}`,g=`${a.roman}–${l.roman}`;(r==="V"||r==="v")&&(c==="I"||c==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${a.name} → ${l.name} (${a.roman}–${l.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name}):(r==="IV"||r==="iv")&&(c==="I"||c==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${a.name} → ${l.name} (${a.roman}–${l.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name}):(r==="V"||r==="v")&&(c==="vi"||c==="♭VI"||c==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${a.name} → ${l.name} (${a.roman}–${l.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name}):r==="♭VII"&&(c==="I"||c==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${a.name} → ${l.name} (♭VII–${l.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name}):(c==="V"||c==="v")&&r!=="V"&&r!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${a.name} → ${l.name} (${a.roman}–${l.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name}):a.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${a.name} → ${l.name}`,description:`${a.name} acts as a temporary dominant, pulling strongly into ${l.name}.`,why:`${a.name} acts as a temporary dominant, pulling strongly into ${l.name}.`,move:h,degrees:g,bars:u,fromBar:d,toBar:p,fromChord:a.name,toChord:l.name})}return e}function on(t){if(!t||t.length<2)return[];const e=[];for(let i=0;i<t.length;i++){const o=i,s=(i+1)%t.length,n=t[o],a=t[s],l=new Set(n.notes.map(b=>_[b]??0)),r=a.notes.filter(b=>l.has(_[b]??-1)),c=_[Bo(n.name)]??0,d=_[Bo(a.name)]??0,p=Math.min((d-c+12)%12,(c-d+12)%12);let u="Harmonic Shift";r.length>=2?u=`Strong Common Tones (${r.length} shared)`:p<=2?u="Stepwise Bass Motion":(p===5||p===7)&&(u="4th / 5th Cycle Jump");const h=`Bar ${o+1} → ${s+1}`,g=`${n.name} → ${a.name}`,f=r.length?`${r.join(" · ")} held over`:p<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:o+1,toBar:s+1,fromChord:n.name,toChord:a.name,move:h,chords:g,link:f,hasShared:r.length>0,commonNotes:r,semitoneDistance:p,motionType:u})}return e}function Po(t,e=4){const i=Array.isArray(t)?t.filter(p=>typeof p=="string"&&p.trim().length>0):[];if(i.length===0)return[];const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=i.map(p=>p.replace(/\d+$/,"")),n=s[0],a=o[n]??0;let l=e,r=a;const c=[];return s.forEach((p,u)=>{const h=o[p]??0;u>0&&h<=r&&l++,c.push(`${p}${l}`),r=h}),[`${n}${e-1}`,...c]}class La{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.melodyTrack=null,this.stepLoop=null,this.stepPos=-1,this.playTarget="chords",this.melodyBackingEnabled=!0,this.melodySound="Stage Rhodes",this.melodyFeel=null,this.melodyFeelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setPlayTarget(e){this.playTarget=e}getPlayTarget(){return this.playTarget}isChordPlaying(){return this.playing&&this.playTarget==="chords"}isMelodyPlaying(){return this.playing&&this.playTarget==="melody"}isSongPlaying(){return this.playing&&(this.playTarget==="song"||this.mode==="song")}setMelodyBackingEnabled(e){this.melodyBackingEnabled=e}isMelodyBackingEnabled(){return this.melodyBackingEnabled}setMelodySound(e){this.melodySound=e||"Stage Rhodes",this.melodySound&&Hn(this.melodySound)}getMelodySound(){return this.melodySound}setMelodyFeel(e){this.melodyFeel=e}getMelodyFeel(){return this.melodyFeel}setMelodyFeelSettings(e){this.melodyFeelSettings={...this.melodyFeelSettings,...e}}getMelodyFeelSettings(){return{...this.melodyFeelSettings}}setStepLoop(e){const i=e&&e[1]>e[0]?[e[0],e[1]]:null;i===this.stepLoop||i&&this.stepLoop&&i[0]===this.stepLoop[0]&&i[1]===this.stepLoop[1]||(this.stepLoop=i,i||(this.stepPos=-1),this.playing&&this.playTarget==="melody"&&this.startAutoplay())}getStepLoop(){return this.stepLoop?[this.stepLoop[0],this.stepLoop[1]]:null}getStepPos(){return this.stepPos}isStepLooping(){return this.playTarget==="melody"&&!!this.progression}getSixteenthMs(){return 6e4/Math.max(40,Math.min(240,this.progression?.bpm||84))/4}stepTick(){if(!this.progression)return;const e=this.progression.chords.length||4,[i,o]=this.stepLoop&&this.stepLoop[1]>this.stepLoop[0]?this.stepLoop:[0,e*16];let s=this.stepPos+1;(s<i||s>=o)&&(s=i),this.stepPos=s;const n=this.getSixteenthMs()/1e3,a=Math.floor(s/16),l=this.progression.chords.length;if(l>0){const r=a%l,c=this.order.indexOf(r);if(this.activeIndex=c>=0?c:r,this.progressStep=this.activeIndex,this.melodyBackingEnabled&&(s%16===0||s===i)){const d=this.progression.chords[r];if(d){let p=Array.isArray(d.notes)?d.notes:[];(p.length===0||!p.every(h=>typeof h=="string"&&h.trim().length>0))&&(p=W(d.name||"CMAJ",U(this.progression.key||"C",this.progression.scaleType||"MAJOR")));const u=Math.max(.05,(Math.min(o,(a+1)*16)-s)*n);this.playChordNotes(p,u,d.voicing,void 0,r),this.subBassEnabled&&p.length>0&&as(p[0],u)}}if(this.melodyTrack&&!this.melodyTrack.muted){const d=s%16,p=this.melodyTrack.notes.find(u=>u.barIndex===a&&u.stepInBar===d);if(p){const u=Math.max(1,Math.round((p.durationBeats||.25)*4)),h=typeof p.velocity=="number"?Math.max(.05,Math.min(1,p.velocity/127)):.85;et(p.pitch,u*n*.92,void 0,h,this.melodySound||void 0)}}}this.notifyTick()}setMelodyTrack(e){this.melodyTrack=e,e&&(e.presetId&&Jn(e.presetId),typeof e.volume=="number"&&Yn(e.volume),Wn(e.muted),Kn(e.solo))}getMelodyTrack(){return this.melodyTrack}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,i){this.mode="single",this.progression=e,e?(i&&i.length===e.chords.length&&i.every(o=>o<e.chords.length)?this.order=i:this.order=Array.from({length:e.chords.length},(o,s)=>s),this.order.length>0&&(this.activeIndex>=this.order.length&&(this.activeIndex=this.activeIndex%this.order.length),this.progressStep>=this.order.length&&(this.progressStep=this.progressStep%this.order.length))):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}updateSongSections(e){this.sections=e}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,i)=>e+i.order.length,0):this.order.length}setOrder(e,i){this.order=e,typeof i=="number"&&(this.activeIndex=i)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const i=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=i),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,i=Math.max(40,Math.min(240,e)),o=Math.max(1,this.barsPerChord);return Math.round(o*(24e4/i))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"||this.playTarget==="song"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.playTarget==="melody"?this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1,this.stepPos)):this.tickCallbacks.forEach(i=>i(this.activeIndex,this.progressStep,0,e,!1,-1))}updateSongStepState(e){let i=0;for(let o=0;o<this.sections.length;o++){const s=this.sections[o].order.length;if(e<i+s){this.activeSectionIndex=o;const n=e-i;this.activeIndex=this.sections[o].order[n]??0,this.progressStep=n;return}i+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){if(this.stopAutoplay(),this.playTarget==="melody"){this.autoplayTimer=setInterval(()=>{this.playing&&this.playTarget==="melody"&&this.stepTick()},this.getSixteenthMs());return}const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"||this.playTarget==="song"){const i=this.getTotalSteps();if(i<=0)return;this.songStep=(this.songStep+1)%i,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(e){const i=e||(this.mode==="song"?"song":this.playTarget);if(this.playing){if(i===this.playTarget)return this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1,this.stopAutoplay(),this.notifyTick(),!1;this.stopAutoplay(),this.playTarget=i,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1}else this.playing=!0,this.playTarget=i,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1;if(this.playTarget==="song")this.mode="song",this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick();else if(this.playTarget==="melody"){this.mode="single";const[o]=this.stepLoop&&this.stepLoop[1]>this.stepLoop[0]?this.stepLoop:[0,(this.progression?.chords.length||4)*16];this.stepPos=o-1,this.startAutoplay(),this.stepTick()}else this.mode="single",this.startAutoplay(),this.playActiveChord(),this.notifyTick();return this.playing}setABOverride(e,i,o="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:i||null,side:o}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const i=this.activeIndex,o=e.progression.chords[i];if(o){const s=o.notes&&o.notes.length>0?o.notes:W(o.name,U(e.progression.key,e.progression.scaleType)),n=Po(s,4),a=i!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[i]?{...this.feelSettings,...this.feelSettings.barFeel[i]}:this.feelSettings;ns(n,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:a?.playStyle??this.playStyle??void 0,feelSettings:a});const l=e.melodyTrack??null;if(l&&!l.muted&&e.progression){const r=l.notes.filter(c=>c.barIndex===i);if(r.length>0){const d=60/(e.progression.bpm||84);r.forEach(p=>{const u=p.stepInBar/4*d,h=(p.durationBeats||.25)*d,g=typeof p.velocity=="number"?Math.max(.05,Math.min(1,p.velocity/127)):.85;setTimeout(()=>{this.playing&&this.mode==="song"&&et(p.pitch,h,void 0,g,this.melodySound||void 0)},Math.round(u*1e3))})}}}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let i=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(i=this.abOverride.chord),i){let o=Array.isArray(i.notes)?i.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=i.name||"CMAJ",n=this.progression.key||"C",a=this.progression.scaleType||"MAJOR";o=W(s,U(n,a))}i.voicing?this.playChordNotes(o,1.2,i.voicing):this.playChordNotes(o,1.2),this.subBassEnabled&&o.length>0&&as(o[0],1.4)}}}auditionChord(e,i=.8){if(!e)return;let o=Array.isArray(e.notes)?e.notes:[];if(o.length===0||!o.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",n=this.progression?.key||"C",a=this.progression?.scaleType||"MAJOR";o=W(s,U(n,a))}e.voicing?this.playChordNotes(o,i,e.voicing):this.playChordNotes(o,i)}playChordAtIndex(e,i=.8,o,s){if(!this.progression||!this.progression.chords[e])return;const n=this.progression.chords[e];let a=Array.isArray(n.notes)?n.notes:[];if(a.length===0||!a.every(r=>typeof r=="string"&&r.trim().length>0)){const r=n.name||"CMAJ",c=this.progression.key||"C",d=this.progression.scaleType||"MAJOR";a=W(r,U(c,d))}const l=o||n.voicing;l!==void 0?this.playChordNotes(a,i,l,s):this.playChordNotes(a,i)}playChordNotes(e,i,o,s,n){if(!this.progression)return;const a=Array.isArray(e)?e.filter(d=>typeof d=="string"&&d.trim().length>0):[];if(a.length===0)return;const l=o?qn(a,o):Po(a,4),r=n!==void 0?n:this.playing?this.order[this.activeIndex]??0:void 0,c=r!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[r]?{...this.feelSettings,...this.feelSettings.barFeel[r]}:this.feelSettings;ns(l,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:i||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:c?.playStyle??this.playStyle??void 0,velocity:s,feelSettings:c})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.stepPos=-1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const v=new La,ja=lt.map(t=>t.name),za=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Ua(t,e){const i=t.length+1,o=e.length+1,s=Array.from({length:i},()=>new Array(o).fill(0));for(let n=0;n<i;n++)s[n][0]=n;for(let n=0;n<o;n++)s[0][n]=n;for(let n=1;n<i;n++)for(let a=1;a<o;a++)s[n][a]=t[n-1]===e[a-1]?s[n-1][a-1]:1+Math.min(s[n-1][a-1],s[n-1][a],s[n][a-1]);return s[i-1][o-1]}function vt(t,e){if(typeof t!="string")return null;const i=t.trim();if(!i)return null;const o=i.toLowerCase(),s=e.find(r=>r.toLowerCase()===o);if(s)return s;let n=null,a=1/0;for(const r of e){const c=Ua(o,r.toLowerCase());c<a&&(a=c,n=r)}const l=Math.max(2,Math.floor(o.length*.4));return a<=l?n:null}function _a(t){if(!Array.isArray(t))return;const e=[];for(const i of t){if(!i||typeof i!="object")continue;const o=i,s=vt(o.root,Bt),n=vt(o.quality,ta);s&&n&&e.push({root:s,quality:n})}if(e.length)return e.slice(0,jt)}function Va(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,i=vt(e.presetId,za)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!i)return;const o=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:i,customConfig:o}}function fo(t,e){const i=t&&typeof t=="object"?t:{},o=vt(i.genre,qs)??e.genre,s=vt(i.mood,ja)??e.mood,n=vt(i.key,Bt)??void 0,a=vt(i.scaleType,ia)??void 0,l=n&&a?_a(i.chords):void 0;let r;typeof i.length=="number"&&Number.isFinite(i.length)&&(r=Math.max(Kt,Math.min(jt,Math.round(i.length))));const c=typeof i.rhythmStyle=="string"&&i.rhythmStyle.trim()?i.rhythmStyle.trim():void 0,d=Va(i.instrumentConfig),p=i._rateLimit&&typeof i._rateLimit=="object"?i._rateLimit:void 0;return{genre:o,mood:s,key:n,scaleType:a,length:r,chords:l,rhythmStyle:c,instrumentConfig:d,_rateLimit:p}}const Ga=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],qa="chroma-chords-llm-provider",Ha="chroma-chords-llm-model";function Ja(){const t=localStorage.getItem(qa);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Ya(){const t=localStorage.getItem(Ha);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:Ga[0].id}const bo={genre:qs[0],mood:lt[0].name},Wa="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Ka=12e3,sn={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},nn={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Di(t,e){const i=t.toLowerCase();let o=null,s=0;return Object.keys(e).forEach(n=>{const a=e[n].reduce((l,r)=>l+(i.includes(r)?1:0),0);a>s&&(s=a,o=n)}),o}function Xa(t){const e=Di(t,nn),i=Di(t,sn);return!e||!i?null:{genre:e,mood:i}}async function Qa(t){const e=new AbortController,i=setTimeout(()=>e.abort(),Ka);try{const s=await fetch(Wa,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Ja(),model:Ya()}),signal:e.signal}),n=await s.json().catch(()=>null);if(!s.ok||n&&typeof n=="object"&&"error"in n){const a=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${s.status}`,l=new Error(`Classifier request failed: ${a}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(l._rateLimit=n._rateLimit),l}return n}finally{clearTimeout(i)}}async function Za(t){const e=t.trim(),i=e.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=Di(s,nn)??"Synthwave",a=Di(s,sn)??"Dreamy",l={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},r={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},c={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},d=c[n]||c._default,p=l[n]||"rhodes",u=r[n]||"slow_arpeggio",h={genre:n,mood:a,key:d.key,scaleType:d.scaleType,length:8,chords:d.chords,rhythmStyle:u,instrumentConfig:{presetId:p,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return fo(h,{genre:n,mood:a})}const o=Xa(t);try{const s=await Qa(t);return fo(s,o??bo)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const n=fo(o??bo,bo);return s&&typeof s=="object"&&"_rateLimit"in s&&(n._rateLimit=s._rateLimit),n}}class er{static async resolvePrompt(e,i,o,s,n,a){let l=a||null,r=null,c=null;if(!l&&n&&n.trim().length>0)try{l=await Za(n)}catch(u){console.warn("Failed to classify prompt via LLM/local fallback:",u)}const d=!!(l&&l.chords?.length&&l.key&&l.scaleType);let p=null;return d&&l&&l.chords&&l.key&&l.scaleType&&(p=Fi(e,l.key,l.scaleType,l.chords,l.genre||i,l.mood||o)),p||(p=Ai(e,i,o,{length:s})),d&&l&&(l.instrumentConfig?.presetId&&(r=No(l.instrumentConfig.presetId)??null),l.rhythmStyle&&(c=Ao(l.rhythmStyle)??null)),p.chords.length>s&&(p={...p,chords:p.chords.slice(0,s)}),n&&(p={...p,searchTerm:n}),{progression:p,instrument:r,playStyle:c,normalizedSuggestion:l}}}const ht=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,i)=>i)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,i)=>(i+Math.ceil(t/2))%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,i)=>t-1-i)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,i)=>(i-1+t)%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,i)=>(i+1)%t)}];class Z{static createInitialSong(e,i){const o=i||Array.from({length:e.chords.length},(s,n)=>n);return[{name:ht[0].name,desc:ht[0].desc,progression:e,order:o.slice()}]}static generateSectionProgression(e,i,o,s){const n=e.key,a=e.scaleType||"MAJOR",l=e.genre||"Pop",r=e.mood||"Uplifting",c=e.bpm||120,d=U(n,a),p=`${n}_${a}`,u=e.chords.length||4;let h=s&&s>=2&&s<=8?s:u;i==="Pre-chorus"&&!s&&u>4&&(h=4);const g=o?.scales?o.scales[p]:void 0;let f=[];return g&&Object.keys(g.degrees).length>0?f=this.walkSectionMarkov(g,p,i,l,r,d,h,e,o):f=this.fallbackSectionChords(e,i,h,d),i==="Chorus"&&this.areChordSequencesIdentical(e.chords,f)&&(f=this.shiftChorusVariation(f,g,p,d)),{genre:l,mood:r,key:n,scaleType:a,bpm:c,chords:f}}static walkSectionMarkov(e,i,o,s,n,a,l,r,c){const d=Object.keys(e.degrees),p=this.pickSectionStartDegree(o,e,s,n),u=[p];let h=p;for(let f=1;f<l;f++){const b=f===l-1,y=d.filter(C=>e.degrees[C]&&C!==h),x=y.length?y:d;if(b){const C=Ee(x,I=>{let $=rt(h,I,e.type,s,n);return o==="Outro"&&I==="TONIC"?$*=8:o==="Pre-chorus"&&(I==="DOMINANT"||I==="SUBDOMINANT")?$*=6:o==="Chorus"&&(I==="TONIC"||I==="SUBDOMINANT"||I==="DOMINANT")&&($*=2.5),Math.max(.01,$)});u.push(C)}else{const C=x.filter(N=>!u.includes(N)),I=C.length?C:x,$=Ee(I,N=>{let L=rt(h,N,e.type,s,n);return L*=this.getSectionTransitionMultiplier(o,h,N),Math.max(.01,L)});h=$,u.push($)}}const g=u.map(f=>tt(i,f,e,a));if(o==="Bridge"&&g.length>=3&&c)try{const f=Bi(c,r,1);if(f&&f.length>0){const b=f.find(y=>y.roman.includes("VI")||y.roman.includes("VII")||y.roman==="iv")||f[0];if(b&&b.chord){const y=Math.min(g.length-2,1);g[y]={...b.chord,desc:b.sub||"Shadow chord borrowed for the bridge detour."}}}}catch{}return g}static pickSectionStartDegree(e,i,o,s){const n=Object.keys(i.degrees),a=l=>!!i.degrees[l];if(e==="Chorus"){const l={SUBDOMINANT:3.5,SUBMEDIANT:3,SUPERTONIC:1.2,TONIC:.5,MEDIANT:.8,DOMINANT:.6};return Ee(n,r=>(l[r]||.4)*(a(r)?1:.01))}if(e==="Bridge"){const l={SUBMEDIANT:3.5,MEDIANT:2.5,SUBDOMINANT:2.2,SUPERTONIC:1.5,TONIC:.2};return Ee(n,r=>(l[r]||.5)*(a(r)?1:.01))}if(e==="Pre-chorus"){const l={SUPERTONIC:3.2,SUBDOMINANT:2.8,SUBMEDIANT:2,TONIC:.3};return Ee(n,r=>(l[r]||.4)*(a(r)?1:.01))}if(e==="Outro"){const l={SUBDOMINANT:2.5,SUBMEDIANT:2,TONIC:2.5};return Ee(n,r=>(l[r]||.5)*(a(r)?1:.01))}return Ee(n,l=>Hs(l,i.type,o,s))}static getSectionTransitionMultiplier(e,i,o){if(e==="Chorus"){if(i==="SUBDOMINANT"&&(o==="DOMINANT"||o==="TONIC"))return 2.2;if(i==="SUBMEDIANT"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2;if(i==="DOMINANT"&&(o==="TONIC"||o==="SUBMEDIANT")||i==="TONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 1.8}else if(e==="Pre-chorus"){if(i==="SUPERTONIC"&&(o==="SUBDOMINANT"||o==="DOMINANT"))return 2.8;if(i==="SUBMEDIANT"&&o==="SUPERTONIC")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 3.2}else if(e==="Bridge"){if(i==="SUBMEDIANT"&&o==="MEDIANT")return 2;if(i==="MEDIANT"&&o==="SUBDOMINANT")return 2.2;if(i==="SUBDOMINANT"&&o==="DOMINANT")return 2}else if(e==="Outro"){if(i==="SUBDOMINANT"&&o==="TONIC")return 2.8;if(i==="SUBMEDIANT"&&o==="SUBDOMINANT")return 2}return 1}static fallbackSectionChords(e,i,o,s){const n=e.chords,a=_[e.key]??0,l=(e.scaleType||"").includes("MINOR");let r=[];if(i==="Chorus")n.length>=4?r=[n[1],n[2],n[3]||n[0],n[0]]:r=[...n].reverse();else if(i==="Bridge"){const d=l?ee(z(a+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s):ee(z(a+8,!0),"Major","None","♭VI","Flat submediant","cinematic shadow detour",.48,!0);n.length>=4?r=[n[3]||n[1],d,n[1]||n[2],n[2]||n[0]]:r=[d,...n]}else i==="Pre-chorus"?n.length>=4?r=[n[1],n[2],n[1],n[2]]:r=n:i==="Outro"?n.length>=4?r=[n[1],n[3]||n[1],n[1],n[0]]:r=n:r=(ht.find(u=>u.name===i)||ht[1]).reorder(n.length).map(u=>n[u%n.length]);const c=[];for(let d=0;d<o;d++)c.push(r[d%r.length]);return c}static areChordSequencesIdentical(e,i){return e.length!==i.length?!1:e.every((o,s)=>o.name===i[s]?.name)}static shiftChorusVariation(e,i,o,s=!0,n){const a=n||e.length;if(!i||!o)return e;const l=i.degrees.SUBDOMINANT?tt(o,"SUBDOMINANT",i,s):null,r=i.degrees.DOMINANT?tt(o,"DOMINANT",i,s):null,c=i.degrees.SUBMEDIANT?tt(o,"SUBMEDIANT",i,s):null,d=i.degrees.TONIC?tt(o,"TONIC",i,s):null;if(l&&r&&c&&d){const p=[l,r,c,d],u=[];for(let h=0;h<a;h++)u.push(p[h%p.length]);return u}return e}static addSection(e,i,o,s){if(e.length>=ht.length)return{sections:e,activeIndex:e.length-1};const n=ht[e.length],a=this.generateSectionProgression(i,n.name,o,s),l=Array.from({length:a.chords.length},(d,p)=>p),r={name:n.name,desc:n.desc,progression:a,order:l},c=[...e,r];return{sections:c,activeIndex:c.length-1}}static removeSection(e,i){if(e.length<=1||i<0||i>=e.length)return{sections:e,activeIndex:0};const o=e.filter((n,a)=>a!==i),s=Math.min(i,o.length-1);return{sections:o,activeIndex:Math.max(0,s)}}static syncActiveSection(e,i,o,s,n){if(!e[i])return e;const a=[...e];return a[i]={...a[i],progression:o,order:s.slice(),...n!==void 0?{melodyTrack:n}:{}},a}static setSectionMelody(e,i,o){if(!e[i])return e;const s=[...e];return s[i]={...s[i],melodyTrack:o},s}static createDefaultTimeline(e){return e.map((i,o)=>({id:`timeline-${o}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:o,repeats:1}))}static expandTimeline(e,i){const o=[];for(const s of i){const n=e[s.sectionIndex];if(n)for(let a=0;a<Math.max(1,s.repeats);a++)o.push(n)}return o.length>0?o:e}static reorderTimeline(e,i,o){if(i<0||i>=e.length||o<0||o>=e.length||i===o)return e;const s=[...e],[n]=s.splice(i,1);return s.splice(o,0,n),s}static updateTimelineRepeat(e,i,o){return i<0||i>=e.length?e:e.map((s,n)=>{if(n!==i)return s;const a=Math.min(8,Math.max(1,s.repeats+o));return{...s,repeats:a}})}static addTimelineItem(e,i){const o={id:`timeline-${i}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:i,repeats:1};return[...e,o]}static removeTimelineItem(e,i){return e.length<=1||i<0||i>=e.length?e:e.filter((o,s)=>s!==i)}}function pe(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!i)return 60;const o=i[1].charAt(0).toUpperCase()+i[1].slice(1),s=e[o]??0,n=i[2]!==void 0?parseInt(i[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+s))}function an(t,e,i,o=1,s){const n=e&&e.length>0?e.map(x=>t.chords[x]).filter(x=>!!x):t.chords,a=t.bpm||120,l=o*240/a,r=i?Wt.find(x=>x.name.toLowerCase()===i.toLowerCase()):void 0,c=_o[t.genre]||{},d=r?.patch??{},p={...c,...d,...s?.humanState??{}},u=c.duration??.9,h=d.durationMultiplier?u*d.durationMultiplier:u,g=s?.humanState?.strum!==void 0?s.humanState.strum/100*1.5:s?.spread!==void 0?s.spread/100*1.5:c.spread??.3,f=s?.humanState?.swing!==void 0?s.humanState.swing:s?.swing??0,b=s?.density??50,y=[];return n.forEach((x,C)=>{const I=f/100*.04*(C%2===1?1:0),$=C*l+I,N=x.notes&&x.notes.length>0?x.notes:["C","E","G"];let L=Po(N,4);if(L=Us(L,b),p.arpMode&&p.arpMode!=="off"){const E=p.arpRate??"1/16",T=p.arpRange??1,R=p.arpMode,q=Ls(E,a),H=js(L,T),B=zs(H,R),O=p.duration?p.duration:Math.max(.6,h);B.forEach((V,oe)=>{const Y=$+oe*q;y.push({note:V,midi:pe(V),startTime:Y,duration:O})})}else{const E=s?.humanState?.instrument||void 0,T=E?Je(E):void 0,R=T?Pe.find(B=>B.name.toLowerCase()===T.toLowerCase())?.instrument??"piano":Ui[t.genre]??"piano",q=R==="guitar"||R==="jazz-guitar",H=R==="jazz-guitar";L.forEach((B,O)=>{const oe=(q?O*(H?.018:.024):0)+O*g*.1,Y=$+oe;y.push({note:B,midi:pe(B),startTime:Y,duration:q?Math.max(h,1.2):h})})}}),y}function tr(t){const e=[];let i=Math.max(0,Math.floor(t));for(e.push(i&127);(i>>=7)>0;)e.unshift(i&127|128);return e}function vo(t,e,i,o,s=480){const n=[];if(o){const u=Math.round(6e7/o);n.push(0),n.push(255,81,3),n.push(u>>16&255,u>>8&255,u&255)}n.push(0),n.push(255,3,t.length);for(let u=0;u<t.length;u++)n.push(t.charCodeAt(u));const a=Math.max(0,Math.min(15,i)),l=144|a,r=128|a;let c=0;e.forEach(u=>{const h=Math.max(0,u.tick-c);c=u.tick,n.push(...tr(h)),u.type==="on"?n.push(l,u.midi,u.velocity??80):n.push(r,u.midi,0)}),n.push(0),n.push(255,47,0);const d=n.length;return[...[77,84,114,107,d>>24&255,d>>16&255,d>>8&255,d&255],...n]}function ir(t,e,i=480){const o=t.length,n=[77,84,104,100,0,0,0,6,0,e&&o>1?1:0,o>>8&255,o&255,i>>8&255,i&255],a=n.length+t.reduce((c,d)=>c+d.length,0),l=new Uint8Array(a);l.set(n,0);let r=n.length;for(const c of t)l.set(c,r),r+=c.length;return l}function or(t,e,i=480,o){const s=[];if(!t||!t.notes||t.notes.length===0)return s;const n=t.notes.reduce((a,l)=>Math.max(a,l.barIndex),0);for(let a=0;a<=n;a++){const l=t.notes.filter(d=>d.barIndex===a);if(!l.length)continue;const r=a*o;ve.applyHumanFeel(l,t.feelSettings,e).forEach(d=>{const p=r+d.time,u=Math.round(p/(60/e)*i),h=Math.max(1,Math.round(d.duration/(60/e)*i)),g=pe(d.note);s.push({tick:u,type:"on",midi:g,velocity:d.velocity}),s.push({tick:u+h,type:"off",midi:g})})}return s.sort((a,l)=>a.tick!==l.tick?a.tick-l.tick:a.type!==l.type?a.type==="off"?-1:1:a.midi-l.midi),s}function sr(t,e,i={}){const{target:o=e&&e.notes?.length?"both":"chords",order:s,playStyleName:n,barsPerChord:a=1,feelSettings:l}=i,r=t.bpm||120,c=480,d=a*240/r,p=[],u=o==="chords"||o==="both",h=(o==="melody"||o==="both")&&e&&e.notes?.length;if(u){const g=an(t,s,n,a,l),f=[];g.forEach(b=>{const y=Math.round(b.startTime/(60/r)*c),x=Math.max(1,Math.round(b.duration/(60/r)*c));f.push({tick:y,type:"on",midi:b.midi,velocity:80}),f.push({tick:y+x,type:"off",midi:b.midi})}),f.sort((b,y)=>b.tick!==y.tick?b.tick-y.tick:b.type!==y.type?b.type==="off"?-1:1:b.midi-y.midi),p.push(vo("Chords",f,0,r,c))}if(h&&e){const g=or(e,r,c,d);p.push(vo("Melody",g,1,u?void 0:r,c))}return p.length===0&&p.push(vo("Chroma Chords",[],0,r,c)),ir(p,o==="both")}function nr(t,e,i={}){const o=sr(t,e,i),s=new Blob([o],{type:"audio/midi"}),n=(t.key||"C").toLowerCase(),a=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=t.bpm||120,c=`chroma-${i.target||(e&&e.notes?.length?"both":"chords")}-${n}-${a}-${l}bpm.mid`;Wo(s,c)}function ar(t,e,i="Warm",o){const s=new Es({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),n=Fn(i,s),a=t?Je(t):void 0;switch((a?Pe.find(c=>c.name.toLowerCase()===a.toLowerCase()):void 0)?.instrument??(e?Ui[e]:void 0)??"piano"){case"bell":{const c=new At({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(n),d=new ot({decay:3.2,wet:.32}).connect(c);return new de(Mo,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(d)}case"organ":{const c=new Ve({frequency:4500,type:"lowpass",rolloff:-12}).connect(n),d=new nt({distortion:.08,wet:.15}).connect(c),p=new Ot({frequency:5.8,depth:.12,wet:.55}).connect(d);return new de(Ue,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(p)}case"pad-strings":{const c=new ot({decay:5.5,preDelay:.03,wet:.45}).connect(n),d=new at({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(c);return new de(Ue,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(d)}case"juno-pad":{const c=new at({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(n);return new de(Tt,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(c)}case"stab":{const c=new nt({distortion:.1,wet:.12}).connect(n),d=new ot({decay:1,wet:.22}).connect(c);return new de(Tt,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(d)}case"jazz-guitar":{const c=new At({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(n),d=new Ve({frequency:2800,type:"lowpass",rolloff:-12}).connect(c),p=new ot({decay:1.8,preDelay:.02,wet:.18}).connect(d);return o&&Object.keys(o).length>0?new st({urls:o,volume:-8}).connect(p):new de(Ue,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(p)}case"sh101":{const c=new at({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(n),d=new Ve({frequency:3400,type:"lowpass",rolloff:-12}).connect(c),p=new nt({distortion:.12,wet:.18}).connect(d),u=new Ot({frequency:.45,depth:.18,wet:.65}).connect(p);return new de(Tt,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(u)}case"guitar":return o&&Object.keys(o).length>0?new st({urls:o,volume:-8}).connect(n):new de(Ue,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(n);case"rhodes":case"epiano":return o&&Object.keys(o).length>0?new st({urls:o,volume:-10}).connect(n):new de(Mo,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(n);default:return o&&Object.keys(o).length>0?new st({urls:o,volume:-9}).connect(n):new de(Ue,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(n)}}function rn(t){const e=t.numberOfChannels,i=t.sampleRate,o=16,s=o/8,n=e*s,a=t.length*e*s,l=new ArrayBuffer(44+a),r=new DataView(l),c=(u,h)=>{for(let g=0;g<h.length;g++)r.setUint8(u+g,h.charCodeAt(g))};c(0,"RIFF"),r.setUint32(4,36+a,!0),c(8,"WAVE"),c(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,1,!0),r.setUint16(22,e,!0),r.setUint32(24,i,!0),r.setUint32(28,i*n,!0),r.setUint16(32,n,!0),r.setUint16(34,o,!0),c(36,"data"),r.setUint32(40,a,!0);const d=[];for(let u=0;u<e;u++)d.push(t.getChannelData(u));let p=44;for(let u=0;u<t.length;u++)for(let h=0;h<e;h++){const g=Math.max(-1,Math.min(1,d[h][u])),f=g<0?g*32768:g*32767;r.setInt16(p,f,!0),p+=2}return new Blob([new Uint8Array(l)],{type:"audio/wav"})}async function rr(t,e,i,o,s=1,n){const a=an(t,e,o,s,n);if(!a.length)return;const l=e&&e.length>0?e.map($=>t.chords[$]).filter($=>!!$):t.chords,r=t.bpm||120,c=s*240/r,d=Math.max(.1,l.length*c),p=i?Je(i):void 0,h=(p?Pe.find($=>$.name.toLowerCase()===p.toLowerCase()):void 0)?.instrument??(t.genre?Ui[t.genre]:void 0)??"piano";await jn(h);const g=Ln(h),f=n?.tone||"Warm",b=await Ms(async()=>{const $=ar(p||i,t.genre,f,g);a.forEach(N=>{N.startTime<d&&$.triggerAttackRelease(N.note,N.duration,N.startTime)})},d),y=rn(b.get()),x=(t.key||"C").toLowerCase(),C=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),I=`chroma-chords-${x}-${C}-${r}bpm.wav`;Wo(y,I)}async function lr(t,e,i,o={}){const{order:s,instrumentName:n,playStyleName:a,barsPerChord:l=1,feelSettings:r}=o,c=e.bpm||120,d=(e.key||"C").toLowerCase(),p=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-");if((t==="chords"||t==="both")&&await rr(e,s,n,a,l,r),(t==="melody"||t==="both")&&i&&i.notes?.length){const u=s&&s.length>0?s.map(x=>e.chords[x]).filter(x=>!!x):e.chords,h=l*240/c,g=Math.max(.1,u.length*h),f=await Ms(async()=>{const x=new de(Ue,{oscillator:{type:"sine"},envelope:{attack:.01,decay:.15,sustain:.6,release:.2}}).toDestination(),C=i.notes.reduce((I,$)=>Math.max(I,$.barIndex),0);for(let I=0;I<=C;I++){const $=i.notes.filter(E=>E.barIndex===I);if(!$.length)continue;const N=I*h;ve.applyHumanFeel($,i.feelSettings,c).forEach(E=>{const T=N+E.time;T<g&&x.triggerAttackRelease(E.note,E.duration,T,E.velocity/127)})}},g),b=rn(f.get()),y=`chroma-melody-${d}-${p}-${c}bpm.wav`;Wo(b,y)}}function Wo(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const i=URL.createObjectURL(t);if(typeof document>"u")return;const o=document.createElement("a");o.href=i,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(i),1e3)}const qt={oasis:{id:"oasis",contourWeights:{AnthemHook:4,DescendingSigh:2,Arch:2,AscendingClimax:1},rhythm:"anthem",bias:{pentatonic:8,repeat:9,leap:-4,chordTone:3},ornament:"scoop",echo:!0,centerShift:0,dynamics:{accent:114,plain:96},sigLine:"Narrow, sing-along tune built on repeated notes and the pentatonic scale, hammering one pitch before it moves.",how:["Repeated notes: the tune sits on one pitch for a beat or two before stepping, like the Wonderwall chorus.","Pentatonic shape: mostly five scale notes, few chromatic surprises, so it is easy to shout back.","Phrase answered: bar 1 comes back near the middle, the way a chorus restates its hook."],songs:["Wonderwall","Don’t Look Back in Anger","Champagne Supernova"]},beatles:{id:"beatles",contourWeights:{DescendingSigh:3,Arch:3,CallAndResponse:3,AnthemHook:1},rhythm:"default",bias:{leap:-6,semitone:4,descend:3,chordTone:4},ornament:"none",echo:!1,centerShift:0,dynamics:{accent:104,plain:90},sigLine:"Singable, mostly stepwise tune that bends through a chromatic neighbour and often descends under the chords.",how:["Stepwise vocal line with the occasional wide leap, then a step back.","Chromatic passing notes: a descending line walking down under a held chord.","Question and answer phrases, like a verse that asks and a bridge that answers."],songs:["Michelle","Here, There and Everywhere","Eleanor Rigby"]},radiohead:{id:"radiohead",contourWeights:{DescendingSigh:3,CallAndResponse:2,Arch:2,OstinatoRiff:1},rhythm:"pyramid",bias:{leap:5,semitone:5,extension:4,chordTone:1},ornament:"trill",echo:!1,centerShift:3,dynamics:{accent:108,plain:82},sigLine:"Small cells of notes in odd groupings, a falsetto leap, and a nagging semitone that never quite lands.",how:["Odd-length rhythm groups (3+3+4+3+3) that float against the bar line, as in Pyramid Song.","Chromatic neighbour tones and wide falsetto leaps against a static chord.","Held notes that fall behind the beat, leaving space instead of filling it."],songs:["Pyramid Song","Creep","Karma Police"]},nirvana:{id:"nirvana",contourWeights:{OstinatoRiff:4,AnthemHook:2,DescendingSigh:2},rhythm:"riff",bias:{pentatonic:6,repeat:6,leap:2,chordTone:5},ornament:"scoop",echo:!0,centerShift:-3,dynamics:{accent:120,plain:80},sigLine:"Root-heavy minor-pentatonic riff that repeats, scoops up into notes, and hits much harder on the accents.",how:["Riff first: a short root-and-fifth hook that is simply repeated, like Teen Spirit’s opening.","Scooped notes: each accent slides up from a semitone below, the way a vocal is shouted.","Quiet-loud dynamics: accents hit hard while the notes between stay low."],songs:["Smells Like Teen Spirit","Come As You Are","In Bloom"]},"steely-dan":{id:"steely-dan",contourWeights:{CallAndResponse:3,Arch:3,AscendingClimax:2,DescendingSigh:1},rhythm:"syncopated",bias:{extension:9,semitone:5,leap:3,chordTone:2},ornament:"enclosure",echo:!1,centerShift:2,dynamics:{accent:104,plain:90},sigLine:"Jazz-flavoured line leaning on 9ths and 13ths, approached chromatically from above and below.",how:["Extension tones: 9ths and 13ths treated as chord notes, not passing colour.","Enclosures: a target note is circled from a semitone above and below before landing.","Syncopated phrasing that starts just ahead of or behind the beat."],songs:["Peg","Aja","Reelin’ In the Years"]},"mac-demarco":{id:"mac-demarco",contourWeights:{DescendingSigh:4,Arch:2,CallAndResponse:1},rhythm:"lazy",bias:{pentatonic:4,descend:5,repeat:3,leap:-5,chordTone:3},ornament:"slide",echo:!1,centerShift:-2,dynamics:{accent:96,plain:84},sigLine:"Lazy, drooping tune that lets notes sag a little flat and walks down the chord rather than leaping.",how:["Descending lines that slump down the chord and stay there.","Slides into notes, a little behind the beat.","Minimal range and few notes per bar so the loop does the talking."],songs:["Chamber of Reflection","Salad Days","Ode to Viceroy"]},khruangbin:{id:"khruangbin",contourWeights:{CallAndResponse:3,DescendingSigh:2,Arch:3,OstinatoRiff:1},rhythm:"space",bias:{pentatonic:8,repeat:4,leap:-2,chordTone:3},ornament:"slide",echo:!0,centerShift:0,dynamics:{accent:96,plain:82},sigLine:"Sparse, reverb-soaked pentatonic phrases with long slides, answered later like an echo.",how:["Space first: few notes per bar, held long so the bass and drums can breathe.","Pentatonic phrases with slides, like Mark Speer’s clean surf-and-Thai guitar tone.","Echo answer: the opening phrase returns in the second half, as if through a dub delay."],songs:["Maria También","Time (You and I)","White Gloves"]},"daft-punk":{id:"daft-punk",contourWeights:{OstinatoRiff:5,AnthemHook:2,CallAndResponse:1},rhythm:"offbeat",bias:{repeat:9,pentatonic:5,leap:-3,chordTone:4},ornament:"none",echo:!0,centerShift:0,dynamics:{accent:110,plain:94},sigLine:"A short riff on repeat, pushed off the beat, that evolves by dropping one note at a time rather than by writing a new tune.",how:["Loop-first writing: one tight riff repeated, then varied a note at a time.","Offbeat placement: notes land on the “and” of the beat to feel like a funk bass.","Strict repeat: each phrase is answered exactly, like a sampled loop."],songs:["Get Lucky","Around the World","Digital Love"]}};function Ko(t){if(!t)return;const e=t.toLowerCase().trim().replace(/[\s_]+/g,"-");if(qt[e])return qt[e];const i=e.replace(/[^a-z]/g,"");return Object.values(qt).find(o=>o.id.replace(/[^a-z]/g,"")===i)||(i.includes("beatles")?qt.beatles:void 0)}function cr(t,e=Math.random){const i=Ko(t);if(!i)return;const o=Object.entries(i.contourWeights),s=o.reduce((a,[,l])=>a+l,0);if(!s)return;let n=e()*s;for(const[a,l]of o)if(n-=l,n<=0)return a;return o[o.length-1][0]}const M=(t,e,i=!1)=>i?{step:t,duration:e,accent:!0}:{step:t,duration:e};function dr(t,e,i,o,s=0){const n=i===o-1,a=i%2===1;let l=null;const r=c=>{const d=s?Math.abs(s*31+i*17)%c.length:i%c.length;return c[d]};switch(t.rhythm){case"pyramid":l=a?[M(0,.75,!0),M(3,.75),M(6,1),M(10,1.5,!0)]:[M(0,.75,!0),M(3,.75),M(6,1,!0),M(10,.75),M(13,.75)];break;case"anthem":l=r([[M(0,1,!0),M(4,.5),M(6,.5),M(8,1,!0),M(12,1)],[M(0,.5,!0),M(2,.5),M(4,1),M(8,1,!0),M(12,1)],[M(0,1.5,!0),M(6,.5),M(8,.5,!0),M(10,.5),M(12,1)],[M(0,.5,!0),M(2,.5),M(4,.5),M(6,.5),M(8,1.5,!0)]]);break;case"riff":l=r([[M(0,.5,!0),M(2,.5),M(4,.5),M(6,.5,!0),M(8,.5),M(10,.5),M(12,1,!0)],[M(0,.75,!0),M(3,.75),M(6,.5,!0),M(8,.5),M(11,.5),M(14,.5,!0)],[M(0,.5,!0),M(2,.5,!0),M(4,1),M(8,.5,!0),M(10,.5),M(12,1)]]);break;case"syncopated":l=r([[M(0,.5),M(3,.75,!0),M(6,.5),M(10,.75),M(13,.5,!0)],[M(2,.5,!0),M(5,.5),M(8,.75),M(11,.5,!0),M(14,.5)],[M(1,.5),M(4,.75,!0),M(7,.5),M(9,.5),M(12,.75,!0)]]);break;case"lazy":l=r([[M(0,1.5,!0),M(6,1),M(10,1.5)],[M(2,2,!0),M(10,1.5)],[M(0,2,!0),M(8,1),M(12,1)]]);break;case"space":l=r([[M(0,1.5,!0),M(8,2.5)],[M(4,3,!0)],[M(2,2,!0),M(10,1.5)]]);break;case"offbeat":l=r([[M(2,.5,!0),M(6,.5),M(10,.5,!0),M(14,.5)],[M(2,.5,!0),M(6,.5),M(10,.5),M(11,.5,!0),M(14,.5)],[M(2,.5,!0),M(3,.25),M(6,.5,!0),M(10,.5),M(14,.5,!0)]]);break;default:return null}if(e<25&&l.length>2&&(l=l.filter((c,d)=>d%2===0||d===0).slice(0,3)),e>80&&t.rhythm!=="pyramid"&&t.rhythm!=="space"&&l.length<8){const c=[1,5,9,13].filter(d=>!l.some(p=>p.step===d)).slice(0,2).map(d=>M(d,.25));l=[...l,...c].sort((d,p)=>d.step-p.step)}if(n&&t.rhythm!=="riff"&&t.rhythm!=="offbeat"){const c=l.slice(0,Math.max(1,l.length-1)),d=c[c.length-1];c[c.length-1]={...d,duration:Math.max(d.duration,2)},l=c}return l}const pr=[0,2,4,7,9],hr=[0,3,5,7,10];function ds(t,e){const i=t.bias;let o=0;const s=((e.midi%12-e.tonicPc)%12+12)%12;if(i.pentatonic&&(e.isMinor?hr:pr).includes(s)&&(o-=i.pentatonic),i.extension&&e.isTension&&(o-=i.extension),i.chordTone&&e.isChordTone&&(o-=i.chordTone),e.previousMidi!==null){const n=e.midi-e.previousMidi,a=Math.abs(n);i.repeat&&n===0&&(o-=i.repeat),i.leap&&(a>=5?o-=i.leap:a>=1&&a<=2&&!(a===1&&i.semitone)&&(o+=i.leap)),i.semitone&&a===1&&(o-=i.semitone),i.descend&&n<0&&a<=5&&(o-=i.descend)}return o}const yo={Pop:{humanVariance:.15,swing:0,velocityDrift:.25,gateRatio:.85,glide:0},Rock:{humanVariance:.35,swing:10,velocityDrift:.45,gateRatio:.9,glide:.02},"Lo-Fi":{humanVariance:.65,swing:45,velocityDrift:.4,gateRatio:.75,glide:.04},"Neo-Soul":{humanVariance:.5,swing:55,velocityDrift:.35,gateRatio:.95,glide:.03},EDM:{humanVariance:.05,swing:0,velocityDrift:.1,gateRatio:.7,glide:.05},Ambient:{humanVariance:.3,swing:0,velocityDrift:.2,gateRatio:1.3,glide:.08}};function ur(t){const e=Object.keys(yo).find(i=>i.toLowerCase()===t.toLowerCase());return yo[e||"Pop"]||yo.Pop}const Pi=[{id:"Arch",name:"Arch",blurb:"Rises to a peak, then settles back home"},{id:"AscendingClimax",name:"Climb",blurb:"Builds bar by bar toward a high point"},{id:"DescendingSigh",name:"Sigh",blurb:"Starts high and falls gently"},{id:"CallAndResponse",name:"Question & answer",blurb:"Two bars ask, two bars answer"},{id:"OstinatoRiff",name:"Riff",blurb:"A short punchy motif that keeps repeating"},{id:"AnthemHook",name:"Anthem",blurb:"A soaring, syncopated hook up high"}],xo=[{label:"Sparse",value:15},{label:"Medium",value:45},{label:"Busy",value:90}],Ri={oasis:"a held drone on the fifth under the tune",beatles:"a descending chromatic line",radiohead:"a falsetto leap that lands on a trill",nirvana:"a raw root-and-slide riff","steely-dan":"a jazz enclosure that lands on the 9th","mac-demarco":"a lazy walk down the chord",khruangbin:"a long, sliding pentatonic phrase","daft-punk":"a looped offbeat riff that drops a note each time"};function ps(t){return Pi.find(e=>e.id===t)?.name||String(t||"")}const hs={MAJOR:[0,2,4,5,7,9,11],MINOR:[0,2,3,5,7,8,10],NATURAL_MINOR:[0,2,3,5,7,8,10],DORIAN:[0,2,3,5,7,9,10],MIXOLYDIAN:[0,2,4,5,7,9,10],LYDIAN:[0,2,4,6,7,9,11],PHRYGIAN:[0,1,3,5,7,8,10],LOCRIAN:[0,1,3,5,6,8,10],HARMONIC_MINOR:[0,2,3,5,7,8,11],MELODIC_MINOR:[0,2,3,5,7,9,11],MAJOR_PENTATONIC:[0,2,4,7,9],MINOR_PENTATONIC:[0,3,5,7,10],BLUES:[0,3,5,6,7,10]},mr={0:"P1",1:"m2",2:"M2",3:"m3",4:"M3",5:"P4",6:"d5/#11",7:"P5",8:"m6",9:"M6",10:"m7",11:"M7"};function gr(t,e){const i=pe(`${t}4`)%12,o=e.toUpperCase().replace(/\s+/g,"_");return(hs[o]||hs.MAJOR).map(n=>(i+n)%12)}function Ye(t,e="C",i="MAJOR"){const{root:o,quality:s}=ge(t.name),n=pe(`${o}4`)%12;let a,l=7,r,c=[2],d=[];switch(s){case"maj":case"maj7":case"maj9":case"maj6":a=4,l=7,(s==="maj7"||s==="maj9")&&(r=11),s==="maj6"&&(r=9),c=[2,6,9],d=[5];break;case"min":case"min7":case"min9":case"min6":case"mmaj7":a=3,l=7,(s==="min7"||s==="min9")&&(r=10),s==="min6"&&(r=9),s==="mmaj7"&&(r=11),c=[2,5,9],d=[8];break;case"dom7":case"dom9":a=4,l=7,r=10,c=[2,6,9,1,3],d=[11];break;case"dim":case"dim7":a=3,l=6,s==="dim7"&&(r=9),c=[2,5,8],d=[7];break;case"aug":a=4,l=8,c=[2,6],d=[7];break;case"sus4":case"sus7":case"sus9":a=5,l=7,(s==="sus7"||s==="sus9")&&(r=10),c=[10,2],d=[4];break;case"sus2":a=2,l=7,c=[10,5],d=[4];break;default:a=4,l=7;break}const u=[0,...a!==void 0?[a]:[],...l!==void 0?[l]:[],...r!==void 0?[r]:[]].map(b=>(n+b)%12),h=gr(e,i),g=c.map(b=>(n+b)%12).filter(b=>h.includes(b)&&!u.includes(b)),f=d.map(b=>(n+b)%12);return{chordName:t.name,rootPc:n,thirdPc:a!==void 0?(n+a)%12:void 0,fifthPc:l!==void 0?(n+l)%12:void 0,seventhPc:r!==void 0?(n+r)%12:void 0,chordTonePcs:u,tensionPcs:g,avoidPcs:f,scalePcs:h}}function yt(t,e,i="C",o="MAJOR"){const s=typeof t=="number"?t:pe(t),n=s%12,a=Ye(e,i,o),l=(n-a.rootPc+12)%12,r=mr[l]||`+${l}`;let c="chromatic",d=!1,p,u;if(n===a.rootPc?c="root":n===a.thirdPc?c="3rd":n===a.fifthPc?c="5th":n===a.seventhPc?c="7th":a.tensionPcs.includes(n)?c="tension":a.scalePcs.includes(n)?c="passing":c="chromatic",a.avoidPcs.includes(n)){d=!0;const{quality:h}=ge(e.name);if((h.startsWith("maj")||h==="dom7"||h==="dom9")&&l===5){p="Natural 4th clashes with Major 3rd (minor 9th/2nd rub)";const g=s-1;u=K(g)}else if((h==="dom7"||h==="dom9")&&l===11){p="Major 7th clashes with Dominant ♭7";const g=s-1;u=K(g)}else if((h==="sus4"||h==="sus2")&&l===4){p="Major 3rd negates suspended chord feel";const g=s+1;u=K(g)}else if(h.startsWith("dim")&&l===7){p="Natural 5th clashes with Diminished 5th";const g=s-1;u=K(g)}else{p=`Harsh dissonance against ${e.name}`;const g=s-1;u=K(g)}}return{role:c,intervalFromRoot:r,isClash:d,clashReason:p,suggestion:u}}function fr(t,e,i,o){if(i==="free"||!o?.chords?.length)return t;const s=pe(t),n=o.chords.length,a=Math.max(0,Math.min(n-1,Math.floor(e/4)%n)),l=o.chords[a],r=Ye(l,o.key,o.scaleType);let c=[];if(i==="strict-chord"?c=[...new Set([...r.chordTonePcs,...r.tensionPcs])]:i==="scale-key"&&(c=r.scalePcs),c.length===0)return t;let d=s,p=1/0;for(let u=-12;u<=12;u++){const h=s+u,g=(h%12+12)%12;if(c.includes(g)){const f=Math.abs(u);if(f<p&&(p=f,d=h,f===0))break}}return K(d)}function wo(t,e){if(!e?.chords?.length||!t?.notes?.length)return t;const i=t.notes.map(o=>{const s=Math.min(o.barIndex,e.chords.length-1),n=e.chords[s],a=Ye(n,e.key,e.scaleType);let l=o.midi%12;if(o.chordToneRole==="root")l=a.rootPc;else if(o.chordToneRole==="3rd")l=a.thirdPc??a.rootPc;else if(o.chordToneRole==="5th")l=a.fifthPc??a.rootPc;else if(o.chordToneRole==="7th")l=a.seventhPc??a.fifthPc??a.rootPc;else if(o.chordToneRole==="tension")l=a.tensionPcs[0]??a.rootPc;else{const u=yt(o.midi,n,e.key,e.scaleType);u.isClash&&u.suggestion?l=pe(u.suggestion)%12:l=o.midi%12}let r=o.midi,c=1/0;for(let u=-12;u<=12;u++){const h=o.midi+u;(h%12+12)%12===l&&Math.abs(u)<c&&(c=Math.abs(u),r=h)}const d=K(r),p=yt(r,n,e.key,e.scaleType);return{...o,pitch:d,midi:r,chordToneRole:p.role,isClash:p.isClash}});return{...t,progressionId:e.key+"_"+e.scaleType,notes:i}}function br(t,e,i,o,s=0){if(t<25){const a=[[{step:0,duration:3,accent:!0}],[{step:4,duration:2.5,accent:!0}],[{step:0,duration:2,accent:!0},{step:8,duration:1.5}],[{step:2,duration:2,accent:!0},{step:10,duration:1.5}]];if(s===0)return e%2===0?a[0]:a[2];const l=Math.abs(s)%a.length;return a[(e+l)%a.length]}if(t<=60){const a=[[{step:0,duration:1,accent:!0},{step:4,duration:.5},{step:6,duration:1},{step:10,duration:1}],[{step:0,duration:.75,accent:!0},{step:3,duration:.75},{step:6,duration:1},{step:10,duration:1}],[{step:4,duration:1,accent:!0},{step:8,duration:.75},{step:11,duration:.75}],[{step:0,duration:1.5,accent:!0},{step:6,duration:.5},{step:8,duration:2}],[{step:2,duration:1,accent:!0},{step:6,duration:.5},{step:8,duration:1},{step:12,duration:1}],[{step:0,duration:1.5,accent:!0},{step:6,duration:1},{step:10,duration:1.5}],[{step:0,duration:.5,accent:!0},{step:2,duration:.5},{step:6,duration:1},{step:10,duration:1}]];if(e===i-1)return a[3];if(s===0)return a[e%3];const l=Math.abs(s)%(a.length-1);return a[(e+l)%(a.length-1)]}return t>80?[0,2,4,6,8,10,12,14].map((a,l)=>({step:a,duration:.5,accent:l===0||l===4})):s&&s%2===1?[{step:0,duration:.5,accent:!0},{step:3,duration:.5},{step:6,duration:.5,accent:!0},{step:8,duration:.5},{step:10,duration:.75},{step:13,duration:.75}]:[{step:0,duration:.5,accent:!0},{step:2,duration:.5},{step:4,duration:.75,accent:!0},{step:7,duration:.5},{step:9,duration:.75},{step:12,duration:1}]}function vr(t,e,i,o){const s=(e*16+i)/(o*16);switch(t){case"Arch":return Math.round(Math.sin(s*Math.PI)*9);case"AscendingClimax":return Math.round(-4+s*16);case"DescendingSigh":return Math.round(12-s*14);case"CallAndResponse":if(e<Math.ceil(o/2)){const a=(e*16+i)/(Math.ceil(o/2)*16);return Math.round(a*7)}else{const a=((e-Math.ceil(o/2))*16+i)/(Math.floor(o/2)*16);return Math.round(5*(1-a))}case"OstinatoRiff":{const n=i/16;return Math.round(Math.sin(n*Math.PI*2)*5)}case"AnthemHook":return Math.round(8+Math.sin(s*Math.PI*3)*3);default:return 0}}class yr{createEmptyTrack(e,i={}){const o=e?.genre||"Pop";return{id:`melody-track-${Date.now()}`,progressionId:e?`${e.key}_${e.scaleType}`:void 0,notes:[],contour:"Arch",density:50,octave:4,guideMode:"strict-chord",feelSettings:this.getMelodyFeelForGenre(o),presetId:"lead-synth",volume:80,muted:!1,solo:!1,...i}}generateMelody(e,i={}){const o=i.contour||"Arch",s=i.density??50,n=i.octave??4,a=i.guideMode||"strict-chord",l={humanVariance:i.feelSettings?.humanVariance??.25,swing:i.feelSettings?.swing??0,velocityDrift:i.feelSettings?.velocityDrift??.3,gateRatio:i.feelSettings?.gateRatio??.9,glide:i.feelSettings?.glide??0},r=i.presetId||"lead-synth",c=i.bandId,d=i.seed??0,p=Ko(c),u=pe(`${e.key||"C"}4`)%12,h=/MINOR|DORIAN|PHRYGIAN|AEOLIAN|LOCRIAN|BLUES/.test(String(e.scaleType||"")),g=[],f=e.chords||[],b=Math.max(1,f.length);let y=null,x=0;f.forEach((I,$)=>{const N=Ye(I,e.key,e.scaleType);(p&&dr(p,s,$,b,d)||br(s,$,b,o,d)).forEach((E,T)=>{const R=E.step,q=$*4+R/4,H=E.duration,B=vr(o,$,R,b),O=12*(n+1)+N.rootPc+B+(p?.centerShift??0);let V,oe="root";const Y=a==="strict-chord"&&i.strictBy==="chord",ze=a==="strict-chord"&&i.strictBy!=="chord",un=a==="scale-key";let Qt;if(Y)Qt=[...N.chordTonePcs];else if(ze||un){const fe=N.scalePcs.filter(be=>!N.avoidPcs.includes(be));Qt=fe.length>0?fe:N.chordTonePcs}else Qt=N.scalePcs;const He=[];for(let fe=n-1;fe<=n+2;fe++)Qt.forEach(be=>{const Ke=12*(fe+1)+be;let De="passing";be===N.rootPc?De="root":be===N.thirdPc?De="3rd":be===N.fifthPc?De="5th":be===N.seventhPc?De="7th":N.tensionPcs.includes(be)&&(De="tension"),He.push({midi:Ke,pc:be,role:De})});const mn=E.accent||R===0||R===8,Zt=fe=>fe==="root"||fe==="3rd"||fe==="5th"||fe==="7th";if(y===null){He.sort((be,Ke)=>{const De=Math.abs(be.midi-O),Xe=Math.abs(Ke.midi-O),Qe=be.role==="root"||be.role==="3rd"||be.role==="5th"?-6:0,Ze=Ke.role==="root"||Ke.role==="3rd"||Ke.role==="5th"?-6:0;return De+Qe-(Xe+Ze)});const fe=d?Math.abs(d+$)%Math.min(3,He.length):0;V=He[fe].midi,oe=He[fe].role,x=0}else{const fe=x>5,be=x<-5;He.sort((Xe,Qe)=>{const Ze=Xe.midi-y,wt=Qe.midi-y;let kt=Math.abs(Xe.midi-O),St=Math.abs(Qe.midi-O);return mn&&(Zt(Xe.role)&&(kt-=14),Zt(Qe.role)&&(St-=14)),fe?(Ze<0&&Math.abs(Ze)<=4&&(kt-=20),wt<0&&Math.abs(wt)<=4&&(St-=20)):be?(Ze>0&&Math.abs(Ze)<=4&&(kt-=20),wt>0&&Math.abs(wt)<=4&&(St-=20)):(Math.abs(Ze)>=1&&Math.abs(Ze)<=4&&(kt-=12),Math.abs(wt)>=1&&Math.abs(wt)<=4&&(St-=12)),p&&(kt+=ds(p,{tonicPc:u,isMinor:h,previousMidi:y,midi:Xe.midi,isTension:Xe.role==="tension",isChordTone:Zt(Xe.role)}),St+=ds(p,{tonicPc:u,isMinor:h,previousMidi:y,midi:Qe.midi,isTension:Qe.role==="tension",isChordTone:Zt(Qe.role)})),kt-St});const Ke=Math.min(2,He.length),De=d&&Ke>1&&(d*31+$*17+R*7)%7<3?1:0;V=He[De].midi,oe=He[De].role,x=V-y}y=V;const gn=K(V),fn=yt(V,I,e.key,e.scaleType);g.push({id:`m-note-${$}-${R}-${T}`,barIndex:$,stepInBar:R,beatOffset:q,durationBeats:H,pitch:gn,midi:V,velocity:E.accent?p?.dynamics.accent??110:p?.dynamics.plain??92,chordToneRole:oe,isClash:fn.isClash})})});let C={id:`melody-track-${Date.now()}`,progressionId:`${e.key}_${e.scaleType}`,notes:g,contour:o,density:s,octave:n,guideMode:a,feelSettings:l,presetId:r,volume:85,muted:!1,solo:!1,bandId:c};return p&&(C=this.applyBandMelodyDna(C,p,e)),c&&(C=this.spiceWithBandTrick(C,c,0,e),b>1&&(C=this.spiceWithBandTrick(C,c,b-1,e))),C}applyBandMelodyDna(e,i,o){let s=[...e.notes];const n=Math.max(1,o.chords.length);if(i.echo&&n>=4){const a=Math.floor(n/2),l=s.filter(r=>r.barIndex===0&&!r.tag);if(l.length>=1&&a>0){const r=l.map(u=>({...u,id:`echo-${a}-${u.stepInBar}`,barIndex:a,beatOffset:a*4+u.stepInBar/4,tag:void 0})),c={...e,notes:[...s.filter(u=>u.barIndex!==a),...r].sort((u,h)=>u.beatOffset-h.beatOffset)},p=wo(c,o).notes.filter(u=>u.barIndex===a);s=[...s.filter(u=>u.barIndex!==a),...p]}}if(i.ornament!=="none"){const a=[],l=(c,d)=>s.some(p=>p.barIndex===c&&p.stepInBar===d),r=new Set;for(let c=0;c<n;c+=2)r.add(c);for(const c of s){if(c.tag||c.stepInBar<1||c.velocity<i.dynamics.accent-1||!r.has(c.barIndex)&&i.ornament!=="slide"||l(c.barIndex,c.stepInBar-1))continue;const d=c.beatOffset-.25,p=s.find(g=>g!==c&&g.barIndex===c.barIndex&&g.stepInBar<c.stepInBar&&g.beatOffset+g.durationBeats>d);if(p){if(d-p.beatOffset<.25)continue;const g=s.indexOf(p);s[g]={...p,durationBeats:d-p.beatOffset}}const u=i.ornament==="enclosure"?[1]:i.ornament==="trill"?[1]:[-1],h=c.midi+u[0];a.push({...c,id:`orn-${c.barIndex}-${c.stepInBar-1}`,stepInBar:c.stepInBar-1,beatOffset:c.beatOffset-.25,durationBeats:.25,midi:h,pitch:K(h),velocity:Math.round(c.velocity*.7),chordToneRole:"chromatic",isClash:!1,tag:`band-ornament-${i.ornament}`})}s=[...s,...a]}return s.sort((a,l)=>a.beatOffset-l.beatOffset),{...e,notes:s}}regenerateBar(e,i,o){if(!o.chords[i])return e;const s={...o,chords:[o.chords[i]]},n=this.generateMelody(s,{contour:e.contour,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId}),a=e.notes.filter(r=>r.barIndex!==i),l=n.notes.map(r=>({...r,barIndex:i,beatOffset:i*4+r.stepInBar/4,id:`m-note-${i}-${r.stepInBar}`}));return{...e,notes:[...a,...l].sort((r,c)=>r.beatOffset-c.beatOffset)}}mutateMelody(e,i,o){const s=e.notes.map(n=>{if(Math.random()>i)return n;const a=o.chords[n.barIndex]||o.chords[0],l=Ye(a,o.key,o.scaleType),r=[...l.chordTonePcs,...l.tensionPcs],c=r[Math.floor(Math.random()*r.length)],p=(Math.floor(n.midi/12)-1+1)*12+c,u=K(p),h=yt(p,a,o.key,o.scaleType);return{...n,midi:p,pitch:u,chordToneRole:h.role,isClash:h.isClash}});return{...e,notes:s}}invertMelody(e,i){if(e.notes.length===0)return e;const o=Math.round(e.notes.reduce((n,a)=>n+a.midi,0)/e.notes.length),s=e.notes.map(n=>{const a=n.midi-o,l=Math.max(24,Math.min(108,o-a)),r=K(l);return{...n,midi:l,pitch:r}});return i?wo({...e,notes:s},i):{...e,notes:s}}spiceWithBandTrick(e,i,o,s){s.chords[o]||s.chords[0];const n=i.toLowerCase().replace(/[^a-z]/g,"");if(n.includes("oasis")){const a=pe(`${s.key||"C"}4`)%12,l=60+(a+7)%12+((a+7)%12<2?12:0),r=K(l),c=[{id:`oasis-drone-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:4,pitch:r,midi:l,velocity:105,chordToneRole:"drone",tag:"band-oasis-drone"}];return{...e,notes:[...e.notes.filter(d=>d.barIndex!==o),...c].sort((d,p)=>d.beatOffset-p.beatOffset),bandId:i}}if(n.includes("beatles")){const a=pe(`${s.key||"C"}5`),l=[0,1,2,3].map(r=>{const c=a-r;return{id:`beatles-chromatic-${o}-${r*4}`,barIndex:o,stepInBar:r*4,beatOffset:o*4+r,durationBeats:1,pitch:K(c),midi:c,velocity:96,chordToneRole:r===0?"root":"chromatic",tag:"band-beatles-chromatic"}});return{...e,notes:[...e.notes.filter(r=>r.barIndex!==o),...l].sort((r,c)=>r.beatOffset-c.beatOffset),bandId:i}}if(n.includes("radiohead")){const l=pe(`${s.key||"C"}4`)+14,r=[{id:`radiohead-leap-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:2,pitch:K(l),midi:l,velocity:110,chordToneRole:"tension",tag:"band-radiohead-falsetto"},{id:`radiohead-trill-${o}-8`,barIndex:o,stepInBar:8,beatOffset:o*4+2,durationBeats:1,pitch:K(l+1),midi:l+1,velocity:90,chordToneRole:"tension",tag:"band-radiohead-trill"},{id:`radiohead-trill2-${o}-12`,barIndex:o,stepInBar:12,beatOffset:o*4+3,durationBeats:1,pitch:K(l),midi:l,velocity:85,chordToneRole:"tension",tag:"band-radiohead-trill"}];return{...e,notes:[...e.notes.filter(c=>c.barIndex!==o),...r].sort((c,d)=>c.beatOffset-d.beatOffset),bandId:i}}if(n.includes("nirvana")){const a=pe(`${s.key||"C"}4`),l=[{id:`nirvana-root-${o}-0`,barIndex:o,stepInBar:0,beatOffset:o*4,durationBeats:1,pitch:K(a),midi:a,velocity:115,chordToneRole:"root",tag:"band-nirvana-grunge"},{id:`nirvana-slide-${o}-4`,barIndex:o,stepInBar:4,beatOffset:o*4+1,durationBeats:.5,pitch:K(a+2),midi:a+2,velocity:100,chordToneRole:"passing",tag:"band-nirvana-slide"},{id:`nirvana-min3-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:1.5,pitch:K(a+3),midi:a+3,velocity:110,chordToneRole:"3rd",tag:"band-nirvana-grunge"}];return{...e,notes:[...e.notes.filter(r=>r.barIndex!==o),...l].sort((r,c)=>r.beatOffset-c.beatOffset),bandId:i}}if(n.includes("steely")||n.includes("dan")){const l=pe(`${s.key||"C"}4`)+14,r=[{id:`steely-enc-low-${o}-2`,barIndex:o,stepInBar:2,beatOffset:o*4+.5,durationBeats:.5,pitch:K(l-1),midi:l-1,velocity:88,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-enc-high-${o}-4`,barIndex:o,stepInBar:4,beatOffset:o*4+1,durationBeats:.5,pitch:K(l+1),midi:l+1,velocity:92,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-target-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:2.5,pitch:K(l),midi:l,velocity:108,chordToneRole:"tension",tag:"band-steely-jazz9"}];return{...e,notes:[...e.notes.filter(c=>c.barIndex!==o),...r].sort((c,d)=>c.beatOffset-d.beatOffset),bandId:i}}if(n.includes("mac")||n.includes("demarco")){const a=pe(`${s.key||"C"}4`),l=[{id:`mac-7th-${o}-2`,barIndex:o,stepInBar:2,beatOffset:o*4+.5,durationBeats:1,pitch:K(a+11),midi:a+11,velocity:92,chordToneRole:"7th",tag:"band-mac-walkdown"},{id:`mac-5th-${o}-6`,barIndex:o,stepInBar:6,beatOffset:o*4+1.5,durationBeats:1,pitch:K(a+7),midi:a+7,velocity:88,chordToneRole:"5th",tag:"band-mac-walkdown"},{id:`mac-3rd-${o}-10`,barIndex:o,stepInBar:10,beatOffset:o*4+2.5,durationBeats:1.5,pitch:K(a+4),midi:a+4,velocity:95,chordToneRole:"3rd",tag:"band-mac-walkdown"}];return{...e,notes:[...e.notes.filter(r=>r.barIndex!==o),...l].sort((r,c)=>r.beatOffset-c.beatOffset),bandId:i}}if(n.includes("khruangbin")){const a=pe(`${s.key||"C"}4`),l=[{pitch:a+10,step:0,beats:.5,vel:82,role:"chromatic"},{pitch:a+11,step:2,beats:.5,vel:86,role:"chromatic"},{pitch:a+12,step:4,beats:3,vel:100,role:"root"}].map(r=>({id:`khruangbin-slide-${o}-${r.step}`,barIndex:o,stepInBar:r.step,beatOffset:o*4+r.step/4,durationBeats:r.beats,pitch:K(r.pitch),midi:r.pitch,velocity:r.vel,chordToneRole:r.role,tag:"band-khruangbin-slide"}));return{...e,notes:[...e.notes.filter(r=>r.barIndex!==o),...l].sort((r,c)=>r.beatOffset-c.beatOffset),bandId:i}}if(n.includes("daft")){const a=pe(`${s.key||"C"}4`),l=[0,0,7,10].map((r,c)=>({id:`daft-riff-${o}-${2+c*4}`,barIndex:o,stepInBar:2+c*4,beatOffset:o*4+(2+c*4)/4,durationBeats:.5,pitch:K(a+r),midi:a+r,velocity:c%2===0?112:96,chordToneRole:r===0?"root":r===7?"5th":"7th",tag:"band-daft-riff"}));return{...e,notes:[...e.notes.filter(r=>r.barIndex!==o),...l].sort((r,c)=>r.beatOffset-c.beatOffset),bandId:i}}return{...e,bandId:i}}shiftOctave(e,i){const o=e.notes.map(s=>{const n=Math.max(12,Math.min(127,s.midi+i*12));return{...s,midi:n,pitch:K(n)}});return{...e,octave:Math.max(1,Math.min(7,e.octave+i)),notes:o}}setContour(e,i,o){return this.generateMelody(o,{contour:i,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}setDensity(e,i,o){return this.generateMelody(o,{contour:e.contour,density:i,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}snapNoteToGuide(e,i,o,s){return fr(e,i,o,s)}analyzeMelodyNote(e,i){const o=Math.max(0,Math.min((i.chords?.length||1)-1,e.barIndex)),s=i.chords?.[o]||{name:"C"},n=yt(e.midi,s,i.key,i.scaleType);return{pitch:e.pitch,role:n.role,intervalFromRoot:n.intervalFromRoot,chordName:s.name,isClash:n.isClash,clashReason:n.clashReason,suggestion:n.suggestion}}validateMelody(e,i){return e.notes.map(o=>this.analyzeMelodyNote(o,i))}alignMelodyToChords(e,i){return wo(e,i)}applyHumanFeel(e,i,o){const s=60/o,n=[];return e.forEach(a=>{const r=a.stepInBar%2===1?i.swing/100*(s*.25*.35):0,d=Math.sin(a.stepInBar*13.37+a.barIndex*7.1)*.5*i.humanVariance*.025,p=Math.max(0,a.beatOffset*s+r+d),u=Math.max(.05,a.durationBeats*s*i.gateRatio),g=a.stepInBar===0?12:0,f=Math.cos(a.stepInBar*5.5)*(i.velocityDrift*10),b=Math.max(1,Math.min(127,Math.round(a.velocity+g+f)))/127;n.push({note:a.pitch,midi:a.midi,time:p,duration:u,velocity:b})}),n.sort((a,l)=>a.time-l.time)}getMelodyFeelForGenre(e){return ur(e)}}const ve=new yr,Xo={oasis:{id:"oasis",name:"Oasis",color:"#F6D98B",font:"Anton, sans-serif",weight:800,pillFs:13,pillTrack:"0.08em",presetId:"guitar",rhythmStyle:"driving_strum",defaultBpm:116,tagline:"Leans on a bright major chord that shouldn’t fit, then walks home",theoryTagline:"Borrowed major ♭III, plagal IV–I, Major III substitution, anchored D4/G4 guitar drone",plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",sig:[{k:"Harmony",v:"Borrows a bright chord from outside the key — ♭III or ♭VI — and treats it as if it belonged."},{k:"Cadence",v:"Lands on IV–I rather than V–I, so the ending feels wide open instead of shut."},{k:"Voicing",v:"A sus4 held over a root that never moves, strummed the whole bar."}],hoist:["E♭maj7","Fmaj7","A♭"],genre:"Rock",mood:"Uplifting",favoredKeys:["C","G","D","A","E"],favoredScales:["MAJOR","MIXOLYDIAN"],favoredMoods:["Anthemic","Uplifting"],basisArchetypes:[["C","G","Am","E7","F","G","C","C"],["C","Bb","F","C","C","Bb","F","G"],["C","G","Eb","F","C","G","F","C"]],cMajorBasisChords:["C","G","Am","E7","F","G","C","C"],signatureTricks:[{id:"oasis-major-iii",name:"Major III Lift",roman:"III7",plain:"Replaces the quiet minor iii with a soaring major chord that lifts the whole bar",theory:"Secondary dominant (V7/vi) resolving to IV or vi (e.g. E7 in C major)",semitones:4,quality:"dom7"},{id:"oasis-bvii",name:"Borrowed ♭VII",roman:"♭VII",plain:"Mixolydian borrowing that gives that anthem swagger",theory:"Flattened 7th major triad borrowed from Mixolydian (e.g. B♭ in C major)",semitones:10,quality:"maj"},{id:"oasis-biii",name:"Borrowed ♭III",roman:"♭III",plain:"Surprise bright borrowed lift before walking back to the tonic",theory:"Major chord on the flat third borrowed from parallel minor (e.g. E♭ in C major)",semitones:3,quality:"maj"},{id:"oasis-minor-iv",name:"Minor iv Walkdown",roman:"iv",plain:"Emotional chromatic slide from IV into iv before resolving home to I",theory:"Plagal cadence with borrowed minor subdominant (e.g. Fm in C major)",semitones:5,quality:"min"}]},beatles:{id:"beatles",name:"The Beatles",color:"#F4B266",font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12.5,pillTrack:"0.03em",presetId:"rhodes",rhythmStyle:"straight_8ths",defaultBpm:108,tagline:"Warm 60s melodic surprises with bittersweet minor cadences",theoryTagline:"Minor iv cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",plain:"warm 60s melodic surprises with bittersweet minor cadences",theory:"minor iv plagal cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",sig:[{k:"Harmony",v:"Bittersweet minor iv plagal cadences and unexpected chromatic shifts."},{k:"Motion",v:"Secondary dominants resolving to unexpected diatonic steps."},{k:"Melody",v:"Descending inner voice motion held together by strong vocal counterpoint."}],hoist:["Fm","D7","E7"],genre:"Pop",mood:"Warm",favoredKeys:["C","G","F","D","A","E"],favoredScales:["MAJOR","DORIAN"],favoredMoods:["Warm","Playful"],basisArchetypes:[["C","E7","Am","Fm","C","G7","C","C"],["C","D7","F","C","C","D7","G7","C"],["C","Am","Dm7","G7","F","Fm","C","G7"]],cMajorBasisChords:["C","E7","Am","Fm","C","G7","C","C"],signatureTricks:[{id:"beatles-minor-iv",name:"Minor iv Cadence",roman:"iv",plain:"The ultimate bittersweet Beatles trick: major IV dips into dark minor iv before resolving home",theory:"Minor subdominant borrowing (e.g. Fm in C major, IV -> iv -> I)",semitones:5,quality:"min"},{id:"beatles-major-ii",name:"Secondary Dominant II7",roman:"II7",plain:"Bright, forward-pushing dominant that charges straight into the V chord",theory:"Secondary dominant (V7/V, e.g. D7 in C major -> G7)",semitones:2,quality:"dom7"},{id:"beatles-major-iii",name:"Major III7 Turn",roman:"III7",plain:"Unexpected major push on the 3rd degree leading into the minor relative",theory:"V7/vi resolving to vi (e.g. E7 -> Am in C major)",semitones:4,quality:"dom7"}]},radiohead:{id:"radiohead",name:"Radiohead",color:"#C9A9E0",font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:84,tagline:"Swaps chords for their stranger neighbours a third away",theoryTagline:"Chromatic mediants (♭VI, ♭III), parallel modal mixture, haunting voice leading",plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",sig:[{k:"Harmony",v:"Chromatic mediants: the chord a third away, in the wrong quality."},{k:"Colour",v:"Major and minor of the same key sit side by side, neither one winning."},{k:"Motion",v:"Loops that circle without resolving, often in odd bar lengths."}],hoist:["A♭maj7","E♭maj7","Em7"],genre:"Rock",mood:"Melancholy",favoredKeys:["A","E","C","D","F"],favoredScales:["NATURAL_MINOR","DORIAN","MAJOR"],favoredMoods:["Melancholy","Dark"],basisArchetypes:[["C","E","F","Fm","C","E","F","Fm"],["Am","D","Em","G","Am","F","Em","G"],["C","Ab","Eb","G","C","Ab","Fm","G"]],cMajorBasisChords:["C","E","F","Fm","C","E","F","Fm"],signatureTricks:[{id:"radiohead-chromatic-mediant",name:"Chromatic Mediant",roman:"III",plain:"Jumps from I straight to major III, sharing one note while every other voice twists",theory:"Chromatic mediant with smooth half-step voice leading (e.g. C -> E in C major)",semitones:4,quality:"maj"},{id:"radiohead-bvi",name:"Parallel ♭VI Mediant",roman:"♭VI",plain:"Dark, cinematic plunge into the flat-sixth from parallel minor",theory:"Modal borrowing of ♭VI (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"radiohead-minor-iv",name:"Minor iv Fade",roman:"iv",plain:"Plunges the IV into minor iv for that haunting Thom Yorke descent",theory:"Borrowed minor iv (e.g. Fm in C major)",semitones:5,quality:"min"}]},nirvana:{id:"nirvana",name:"Nirvana",color:"#F2A79B",font:"'Rock Salt', cursive",weight:400,pillFs:10,pillTrack:"0",presetId:"stab",rhythmStyle:"heavy_strum",defaultBpm:118,tagline:"Moves the root in visceral jumps with raw parallel power chords",theoryTagline:"Minor third and tritone root jumps, parallel chromatic triads, open 5ths",plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",sig:[{k:"Motion",v:"Roots jump by minor third and tritone instead of stepping."},{k:"Voicing",v:"Power chords with no third, so major or minor stays undecided."},{k:"Space",v:"The middle register is left empty; the weight is at the bottom."}],hoist:["A♭","E♭maj7","B♭"],genre:"Rock",mood:"Dark",favoredKeys:["E","D","F","C","A"],favoredScales:["NATURAL_MINOR","DORIAN","HARMONIC_MINOR"],favoredMoods:["Dark","Tense"],basisArchetypes:[["C","Eb","Ab","F","C","Eb","Ab","F"],["C","F","Eb","Ab","C","F","Eb","Ab"],["Am","F","D","F","Am","F","D","G"]],cMajorBasisChords:["C","Eb","Ab","F","C","Eb","Ab","F"],signatureTricks:[{id:"nirvana-biii",name:"Parallel ♭III Shift",roman:"♭III",plain:"Power chord slide up a minor 3rd, breaking diatonic scale rules with raw energy",theory:"Symmetric minor 3rd jump (e.g. C -> E♭)",semitones:3,quality:"maj"},{id:"nirvana-bvi",name:"Parallel ♭VI Jump",roman:"♭VI",plain:"Visceral jump to the flat 6th before dropping down to IV",theory:"Parallel chromatic power motion (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"nirvana-bvii",name:"Subtonic ♭VII Slam",roman:"♭VII",plain:"Heavy punk rock bounce on the flat-7th",theory:"Whole-step drop from tonic (e.g. B♭ in C major)",semitones:10,quality:"maj"}]},"steely-dan":{id:"steely-dan",name:"Steely Dan",color:"#9CC0EC",font:"'Playfair Display', serif",weight:700,italic:!0,pillFs:13,pillTrack:"0.01em",presetId:"rhodes",rhythmStyle:"syncopated_16ths",defaultBpm:112,tagline:"Adds one note that makes a plain chord sound expensive",theoryTagline:"Mu-major (add9 without 7th), ii–V–I jazz chains, tritone substitutions",plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",sig:[{k:"Harmony",v:"One added 9th over a plain triad, and the 7th left out."},{k:"Motion",v:"ii–V chains that keep handing off to the next key."},{k:"Substitution",v:"A tritone sub where the dominant was expected."}],hoist:["Cmaj9","D♭7","Fm7"],genre:"Jazz-ish",mood:"Warm",favoredKeys:["C","F","G","D","Bb","Eb"],favoredScales:["MAJOR","DORIAN","MIXOLYDIAN"],favoredMoods:["Warm","Peaceful"],basisArchetypes:[["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],["Cmaj9","Dm7","Db7","Cmaj9","Em7","A7","Dm7","G7"],["Cmaj9","Am7","Dm7","Fm7","Em7","A7","Dm7","G7"]],cMajorBasisChords:["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],signatureTricks:[{id:"steely-mu-major",name:"Mu-Major (add9)",roman:"I(add9)",plain:"Major triad with the 2nd added right against the 3rd—the signature Donald Fagen sound",theory:"Major triad + 9th with no 7th, creating smooth cluster dissonance (e.g. Cmaj9 / Cadd9)",semitones:0,quality:"maj9"},{id:"steely-tritone-sub",name:"Tritone Substitution",roman:"subV7",plain:"Swaps out the dominant G7 for D♭7, sliding smoothly into C by a half-step",theory:"Dominant 7th a tritone away (e.g. D♭7 -> C in C major)",semitones:1,quality:"dom7"},{id:"steely-secondary-dominant",name:"Secondary VI7 Turn",roman:"VI7",plain:"Jazz approach chord setting up the ii-V turnaround",theory:"Secondary dominant to ii (e.g. A7 -> Dm7 in C major)",semitones:9,quality:"dom7"}]},"mac-demarco":{id:"mac-demarco",name:"Mac DeMarco",color:"#B8CC9E",font:"'Archivo Black', sans-serif",weight:400,pillFs:12,pillTrack:"-0.01em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:92,tagline:"Two lush chords looped loose, bass sliding underneath",theoryTagline:"Maj7 to min7 descending walkdowns, chromatic bass motion, unresolved floating feel",plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",sig:[{k:"Harmony",v:"Two maj7 chords vamped, no third chord needed."},{k:"Motion",v:"The bass slides chromatically underneath while the chords sit still."},{k:"Feel",v:"Nothing resolves; the loop just keeps leaning."}],hoist:["Fmaj7","Cmaj9","Em7"],genre:"Lo-fi/Chill",mood:"Warm",favoredKeys:["D","C","A","G","F"],favoredScales:["MAJOR","LYDIAN"],favoredMoods:["Dreamy","Peaceful"],basisArchetypes:[["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],["Dm7","Em7","Fmaj7","Em7","Dm7","Em7","Fmaj7","G7"],["Fmaj7","Abmaj7","Cmaj7","Em7","Fmaj7","G7","Cmaj7","Cmaj7"]],cMajorBasisChords:["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],signatureTricks:[{id:"mac-maj7-vamp",name:"Lush Maj7 Step",roman:"IVmaj7",plain:"Opens on a lazy, dreamy major 7th chord that floats without rushing to resolve",theory:"Major 7th on the subdominant (e.g. Fmaj7 in C major)",semitones:5,quality:"maj7"},{id:"mac-chromatic-approach",name:"Chromatic Approach",roman:"♭VImaj7",plain:"Dreamy modulation borrowed from parallel minor with chorus warble",theory:"Borrowed ♭VImaj7 (e.g. A♭maj7 in C major)",semitones:8,quality:"maj7"},{id:"mac-stepdown",name:"Smooth iiim7 Stepdown",roman:"iiim7",plain:"Gentle stepdown connecting the IVmaj7 to iim7",theory:"Diatonic minor 7th stepdown (e.g. Em7 in C major)",semitones:4,quality:"min7"}]},khruangbin:{id:"khruangbin",name:"Khruangbin",color:"#E8B77A",font:"'Playfair Display', serif",weight:700,pillFs:12,pillTrack:"0.02em",presetId:"guitar",rhythmStyle:"slow_arpeggio",defaultBpm:98,tagline:"A dusty minor groove that rocks between two chords and leaves the space open",theoryTagline:"Dorian i7–IV7 vamps, Andalusian i–♭VII–♭VI–V drops, dub-spacious dominant 9ths",plain:"a dusty minor groove that rocks between two chords and leaves the space open",theory:"dorian i7–IV7 vamp, ♭VII–♭VI descent, dominant 9ths, lots of repeat",sig:[{k:"Harmony",v:"Rocks between a minor 7th and a dominant chord a fourth above, the dorian vamp, rarely going anywhere else."},{k:"Colour",v:"Dominant 9ths and major 7ths give a warm, dusty funk tint instead of plain triads."},{k:"Space",v:"Few chords, changing slowly, so the bass and drums and reverb carry the groove."}],hoist:["Am7","D9","Gmaj7"],genre:"Funk/Disco",mood:"Warm",favoredKeys:["A","D","E","G","C"],favoredScales:["DORIAN","NATURAL_MINOR"],favoredMoods:["Dreamy","Warm","Peaceful"],basisArchetypes:[["Am7","D7","Am7","D7","Am7","D9","Am7","Am7"],["Am7","Gmaj7","Fmaj7","E7","Am7","Gmaj7","Fmaj7","E7"]],cMajorBasisChords:["Am7","D7","Am7","D7","Am7","D9","Am7","Am7"],signatureTricks:[{id:"khruangbin-iv9",name:"Dorian IV9",roman:"IV9",plain:"The bright dominant chord a fourth up that makes a minor groove feel sunlit",theory:"Dominant 9th on the dorian IV (e.g. D9 in A dorian)",semitones:5,quality:"dom9"},{id:"khruangbin-bvii",name:"♭VII Slide",roman:"♭VIImaj7",plain:"A major 7th a tone below home, drifting like a slow slide guitar",theory:"Flat-seven major 7th, the Andalusian step (e.g. Gmaj7 in A)",semitones:10,quality:"maj7"},{id:"khruangbin-v7",name:"Desert Dominant",roman:"V7",plain:"A bluesy dominant chord that pulls back to the minor home",theory:"Dominant 7th on V resolving to i (e.g. E7 in A minor)",semitones:7,quality:"dom7"}]},"daft-punk":{id:"daft-punk",name:"Daft Punk",color:"#9FB8E8",font:"'Archivo Black', sans-serif",weight:400,pillFs:12,pillTrack:"0.02em",presetId:"juno-pad",rhythmStyle:"driving_strum",defaultBpm:116,tagline:"A four-chord disco loop that never builds to a cadence, just keeps grooving",theoryTagline:"Minor-seventh loop with ♭III and IV, funk-filtered extensions, no dominant resolution",plain:"a four-chord disco loop that never builds to a cadence, just keeps grooving",theory:"i7–♭III–v7–IV loop, 7th and 9th colour, no V–I cadence",sig:[{k:"Harmony",v:"A minor-seventh loop that skips through ♭III and a minor v, borrowed from the funk and disco playbook."},{k:"Colour",v:"Every chord is a 7th or 9th, filtered and pumped, never a plain triad."},{k:"Cadence",v:"No V–I at the end: the loop just starts again, so the groove never feels finished."}],hoist:["Bm7","D","F♯m7"],genre:"House/Dance",mood:"Uplifting",favoredKeys:["B","A","E","F#","D"],favoredScales:["NATURAL_MINOR","DORIAN"],favoredMoods:["Uplifting","Dreamy"],basisArchetypes:[["Am7","C","Em7","D","Am7","C","Em7","D"],["Am7","Fmaj7","C","G","Am7","Fmaj7","C","G"]],cMajorBasisChords:["Am7","C","Em7","D","Am7","C","Em7","D"],signatureTricks:[{id:"daft-biii",name:"Disco ♭III",roman:"♭III",plain:"The major chord a minor third up that makes a minor loop open out",theory:"Major ♭III in a minor key (e.g. C in A minor)",semitones:3,quality:"maj"},{id:"daft-v7",name:"Minor v Loop",roman:"v7",plain:"A minor chord on the fifth that keeps the loop going without ever resolving",theory:"Minor 7th on the fifth degree (e.g. Em7 in A minor)",semitones:7,quality:"min7"},{id:"daft-iv",name:"Filter IV",roman:"IV",plain:"A major chord on the fourth that lifts the loop for the last beat",theory:"Major IV in a minor loop (dorian colour, e.g. D in A minor)",semitones:5,quality:"maj"}]}},Qo=Object.values(Xo);function me(t){if(!t)return;const e=t.toLowerCase().trim().replace(/\s+/g,"-");return Xo[e]||Qo.find(i=>i.name.toLowerCase()===t.toLowerCase().trim())}const S=(t,e)=>({semi:t,q:e}),xr={oasis:{patterns:[{name:"Wonderwall verse",basedOn:"Wonderwall (sus chords held over a drone)",steps:[S(9,"min7"),S(0,"maj"),S(7,"sus4"),S(2,"sus7")]},{name:"Anthem walk",basedOn:"Don’t Look Back in Anger",steps:[S(0,"maj"),S(7,"maj"),S(9,"min"),S(4,"dom7"),S(5,"maj"),S(7,"maj"),S(0,"maj"),S(0,"maj")]},{name:"Mixolydian drop",basedOn:"Champagne Supernova",steps:[S(0,"maj"),S(10,"maj"),S(5,"maj"),S(0,"maj")]},{name:"Live Forever lift",basedOn:"Live Forever",steps:[S(0,"maj"),S(7,"maj"),S(2,"min7"),S(5,"maj")]}],cadence:[S(5,"maj"),S(0,"maj")],allowsRepeat:!1,how:["Open chords with the root held while the chord on top changes (sus2/sus4, add9).","Borrows ♭VII or ♭III to give a Mixolydian anthem lift.","Ends plagal, IV → I, instead of V → I."]},beatles:{patterns:[{name:"Here, There and Everywhere",basedOn:"Here, There and Everywhere (I–iii–vi–ii–V)",steps:[S(0,"maj"),S(4,"min"),S(9,"min7"),S(2,"min7"),S(7,"dom7"),S(0,"maj"),S(5,"maj"),S(0,"maj")]},{name:"Hey Jude",basedOn:"Hey Jude",steps:[S(0,"maj"),S(7,"maj"),S(7,"dom7"),S(0,"maj"),S(5,"maj"),S(0,"maj"),S(7,"maj"),S(0,"maj")]},{name:"Minor IV fade",basedOn:"In My Life / Michelle",steps:[S(0,"maj"),S(5,"maj"),S(5,"min"),S(0,"maj")]},{name:"Eleanor’s dorian rock",basedOn:"Eleanor Rigby",steps:[S(0,"min"),S(8,"maj"),S(0,"min"),S(8,"maj")]},{name:"Let It Be",basedOn:"Let It Be",steps:[S(0,"maj"),S(7,"maj"),S(9,"min"),S(5,"maj")]}],cadence:[S(7,"dom7"),S(0,"maj")],allowsRepeat:!1,how:["Mixes in the minor iv (a major key borrowing its minor sibling), the bittersweet “Beatles chord”.","Uses secondary dominants (III7, II7) to pull toward the next chord.","Cadences classically with V7 → I, then ends clean."]},radiohead:{patterns:[{name:"Creep",basedOn:"Creep (I–III–IV–iv)",steps:[S(0,"maj"),S(4,"maj"),S(5,"maj"),S(5,"min")]},{name:"Chromatic mediants",basedOn:"OK Computer era (♭VI and ♭III a third apart)",steps:[S(0,"maj7"),S(8,"maj7"),S(3,"maj7"),S(10,"maj")]},{name:"Sinking minor",basedOn:"No Surprises / Karma Police",steps:[S(0,"min7"),S(8,"maj7"),S(5,"min7"),S(7,"min7")]},{name:"Unresolved climb",basedOn:"Paranoid Android",steps:[S(0,"min"),S(10,"maj"),S(8,"maj"),S(3,"maj")]}],cadence:[S(5,"min"),S(0,"maj7")],allowsRepeat:!1,how:["Chords a major or minor third apart (chromatic mediants), so the loop slides sideways.","Major chord turning to its minor (IV → iv) for a sudden cloud.","Often ends on a borrowed chord rather than resolving home."]},nirvana:{patterns:[{name:"Teen Spirit cycle",basedOn:"Smells Like Teen Spirit (i–iv–♭III–♭VI power chords)",steps:[S(0,"pow5"),S(5,"pow5"),S(3,"pow5"),S(8,"pow5")]},{name:"Lithium lurch",basedOn:"Lithium / Come As You Are",steps:[S(0,"pow5"),S(3,"pow5"),S(10,"pow5"),S(5,"pow5")]},{name:"Bloom verse",basedOn:"In Bloom",steps:[S(0,"maj"),S(5,"maj"),S(10,"maj"),S(5,"maj")]},{name:"Heart-Shaped drop",basedOn:"Heart-Shaped Box",steps:[S(0,"min"),S(8,"maj"),S(3,"maj"),S(10,"maj")]}],cadence:[S(10,"pow5"),S(0,"pow5")],allowsRepeat:!0,how:["Power chords (root + fifth, no third) so the riff is neither major nor minor.","Roots move by thirds (♭III, ♭VI), a rock rather than classical motion.","Verses are quiet, choruses are the same chords played louder."]},"steely-dan":{patterns:[{name:"Tritone ii–V–I",basedOn:"Aja / Deacon Blues (ii–♭II7–I)",steps:[S(2,"min7"),S(1,"dom9"),S(0,"maj9"),S(0,"maj9"),S(5,"maj7"),S(5,"min7"),S(10,"dom9"),S(0,"maj9")]},{name:"Mu chord cycle",basedOn:"Peg / Reelin’ in the Years (the “Mu chord” add2)",steps:[S(0,"mu"),S(5,"mu"),S(0,"mu"),S(7,"sus7")]},{name:"Minor ii–V",basedOn:"Black Cow / Josie (minor ii°–V7♯9)",steps:[S(2,"min7b5"),S(7,"dom7sharp9"),S(0,"min7"),S(0,"min7")]},{name:"Backdoor",basedOn:"Peg (♭VII7 → I)",steps:[S(0,"maj7"),S(9,"min7"),S(10,"dom9"),S(0,"maj9")]}],cadence:[S(1,"dom9"),S(0,"maj9")],allowsRepeat:!1,how:["Mu chord: a major chord with an added 2nd, in place of a plain triad.","Replaces V7 with a tritone-substitute dominant (♭II7) so the bass slides down by a semitone.","Dominants with ♯9, 9 or 13, and minor ii–V built on half-diminished chords."]},"mac-demarco":{patterns:[{name:"Walkdown",basedOn:"Salad Days",steps:[S(5,"maj7"),S(4,"min7"),S(2,"min7"),S(0,"maj7")]},{name:"Lazy vamp",basedOn:"Chamber of Reflection",steps:[S(0,"maj9"),S(5,"maj7"),S(0,"maj9"),S(4,"min7")]},{name:"Floating ♭VI",basedOn:"Ode to Viceroy",steps:[S(0,"maj7"),S(8,"maj7"),S(5,"maj7"),S(4,"min7")]}],cadence:[S(4,"min7"),S(5,"maj7")],allowsRepeat:!0,how:["Two or three maj7 / min7 chords, chorus-warbled and left to wander.","Chromatic bass walkdowns so the root glides while the chord colour barely moves.","Never resolves: the last chord leans, it does not land."]},khruangbin:{patterns:[{name:"Dorian vamp",basedOn:"Maria También (i7–IV7 dorian rock)",steps:[S(0,"min7"),S(5,"dom7"),S(0,"min7"),S(5,"dom7")]},{name:"Andalusian drop",basedOn:"White Gloves (i–♭VII–♭VI–V)",steps:[S(0,"min7"),S(10,"maj7"),S(8,"maj7"),S(7,"dom7")]},{name:"Desert 9th",basedOn:"Time (You and I)",steps:[S(0,"min7"),S(0,"min7"),S(5,"dom9"),S(0,"min7")]}],cadence:[S(5,"dom7"),S(0,"min7")],allowsRepeat:!0,how:["A dorian vamp, i7 to IV7, that rocks between two chords for bars on end.","Dominant 9ths and major 7ths on top, a warm funk-and-surf tint.","Open space left for bass, drums and a reverb tail."]},"daft-punk":{patterns:[{name:"Get Lucky loop",basedOn:"Get Lucky (i7–♭III–v7–IV)",steps:[S(0,"min7"),S(3,"maj"),S(7,"min7"),S(5,"maj")]},{name:"Disco-house descent",basedOn:"Digital Love / Veridis Quo",steps:[S(0,"min7"),S(8,"maj7"),S(3,"maj7"),S(10,"dom7")]},{name:"Around the loop",basedOn:"Around the World",steps:[S(0,"min7"),S(0,"min7"),S(10,"maj"),S(5,"maj")]}],cadence:[S(3,"maj7"),S(0,"min7")],allowsRepeat:!0,how:["A four-chord loop, repeated exactly, with no V → I to end it.","Minor 7ths with a major ♭III and IV for a disco / funk colour.","Variation is in the filter and the sample, so the chords hardly change."]}};Object.values(Xo).forEach(t=>{const e=qt[t.id];e&&!t.sig.some(i=>i.k==="Melody")&&t.sig.push({k:"Melody",v:e.sigLine})});function wr(t,e){const i=t.steps.map(a=>({...a}));if(i.length>=8)return i.slice(0,8);const o=i.slice(),s=i.map(a=>({...a}));e.cadence.length&&s.length>=e.cadence.length&&s.splice(s.length-e.cadence.length,e.cadence.length,...e.cadence.map(a=>({...a})));const n=[...o,...s];for(;n.length<8;)n.push({...n[n.length-1]});return n.slice(0,8)}function kr(t,e,i){const s=(((_[e]??0)+t.semi)%12+12)%12,n=U(e,i)||[1,3,6,8,10].includes(t.semi%12);return{root:z(s,n),quality:t.q}}function Sr(t,e,i,o,s,n){const a=i.patterns[Math.floor(Math.random()*i.patterns.length)],l=wr(a,i);if(Math.random()<.3&&e.signatureTricks.length){const c=2+Math.floor(Math.random()*3),d=e.signatureTricks[Math.floor(Math.random()*e.signatureTricks.length)],p={semi:d.semitones,q:d.quality},u=(h,g)=>h.semi===g.semi&&h.q===g.q;!u(l[c],p)&&!u(l[c-1],p)&&!u(l[c+1],p)&&(l[c]=p)}const r=l.map(c=>kr(c,o,s));return Fi(t,o,s,r,e.genre,n)}function $r(t,e,i="C",o="MAJOR"){if(!e)return null;const s=me(e);if(!s)return null;const n=i&&Bt.includes(i)?i:s.favoredKeys&&s.favoredKeys.length?s.favoredKeys[Math.floor(Math.random()*s.favoredKeys.length)]:"C",a=o&&s.favoredScales?.includes(o)?o:s.favoredScales&&s.favoredScales.length?s.favoredScales[Math.floor(Math.random()*s.favoredScales.length)]:"MAJOR",l=s.favoredMoods&&s.favoredMoods.length?s.favoredMoods[Math.floor(Math.random()*s.favoredMoods.length)]:s.mood;let r=null;const c=xr[s.id];if(c&&c.patterns.length&&Math.random()<.7&&(r=Sr(t,s,c,n,a,l),r))return{...r,genre:s.genre,mood:l,bpm:s.defaultBpm};if(Math.random()<.5)try{const p=Ai(t,s.genre,l,{key:n,scaleType:a,length:8});if(p&&p.chords.length===8){const u=Math.random()<.5?2:3,h=Math.random()<.5?5:6,g=[u];Math.random()<.6&&g.push(h);const f=p.chords.map((b,y)=>{if(g.includes(y)&&s.signatureTricks.length>0){const $=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],N=Li($,n,a),{root:L,suffix:E}=Ci(N.chordName);let T=E||"maj";return T==="m"&&(T="min"),{root:L,quality:T}}const{root:x,suffix:C}=Ci(b.name);let I=C||"maj";return I==="m"&&(I="min"),{root:x,quality:I}});r=Fi(t,n,a,f,s.genre,l)}}catch{r=null}if(!r){const p=s.basisArchetypes&&s.basisArchetypes.length>0?s.basisArchetypes:[s.cMajorBasisChords],u=[...p[Math.floor(Math.random()*p.length)]];if(Math.random()<.4&&s.signatureTricks.length>0){const x=Math.floor(Math.random()*(u.length-1))+1,C=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],I=Li(C,"C","MAJOR");u[x]=I.chordName}const h=_[n]??0,g=_.C,f=((h-g)%12+12)%12,b=U(n,a),y=u.map(x=>{const C=Ks(x,f,b),{root:I,suffix:$}=Ci(C);let N=$||"maj";return N==="m"&&(N="min"),{root:I,quality:N}});r=Fi(t,n,a,y,s.genre,l)}return r?{...r,genre:s.genre,mood:l,bpm:s.defaultBpm}:null}function Li(t,e,i){const o=_[e]??0,s=U(e,i),n=((o+t.semitones)%12+12)%12,a=t.roman.includes("♭")||t.roman.includes("b")||t.roman.includes("subV")||s,l=z(n,a);let r="";switch(t.quality){case"maj":r="";break;case"min":r="m";break;case"dom7":r="7";break;case"min7":r="m7";break;case"maj7":r="maj7";break;case"maj9":r="maj9";break;case"sus4":r="sus4";break;default:r=Gi[t.quality]??t.quality;break}return{chordName:`${l}${r}`,root:l,quality:t.quality,roman:t.roman}}function Ro(t,e,i){if(!i)return[];const o=me(i);if(!o)return[];const s=U(t,e);return o.signatureTricks.map(n=>{const a=Li(n,t,e),l=_[a.root]??0,r=n.quality==="min"?[0,3,7]:n.quality==="dom7"?[0,4,7,10]:n.quality==="min7"?[0,3,7,10]:n.quality==="maj7"?[0,4,7,11]:n.quality==="maj9"?[0,2,4,7]:Re[n.quality]??[0,4,7],c=Xt(a.root,n.quality,s),d=r.map(p=>z(l+p,c));return{trick:n,chordName:a.chordName,roman:a.roman,notes:d,plain:n.plain,theory:n.theory,tension:n.quality==="dom7"?.65:n.semitones===4?.55:.4}})}const ui={Khruangbin:{l1:"KHRUANG",l2:"BIN",font:"'Playfair Display', serif",pillFs:11.5,pillTrack:"0.02em",weight:700},"Daft Punk":{l1:"DAFT",l2:"PUNK",font:"'Archivo Black', sans-serif",pillFs:12,pillTrack:"0.04em",weight:400},Oasis:{l1:"OA",l2:"SIS",font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},Radiohead:{l1:"RADIO",l2:"HEAD",font:"'Space Mono', monospace",pillFs:12.5,pillTrack:"0.02em",weight:700},Nirvana:{l1:"NIR",l2:"VANA",font:"'Rock Salt', cursive",pillFs:10,pillTrack:"0",weight:400},"Steely Dan":{l1:"STEELY",l2:"DAN",font:"'Playfair Display', serif",pillFs:13,pillTrack:"0.01em",weight:700,italic:!0},"Mac DeMarco":{l1:"mac",l2:"demarco",font:"'Archivo Black', sans-serif",pillFs:12,pillTrack:"-0.01em",weight:400},"The Beatles":{l1:"THE",l2:"BEATLES",font:"'Plus Jakarta Sans', sans-serif",pillFs:12.5,pillTrack:"0.03em",weight:800}},us={Oasis:[{roman:"♭III",chord:"E♭maj7",name:"Borrowed ♭III",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"IV",chord:"Fmaj7",name:"Plagal landing",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"♭VI",chord:"A♭",name:"Borrowed ♭VI",role:"Borrowed",semitones:8,quality:"maj"}],Radiohead:[{roman:"♭VI",chord:"A♭maj7",name:"Chromatic mediant",role:"Borrowed",semitones:8,quality:"maj7"},{roman:"♭III",chord:"E♭maj7",name:"Modal mixture",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"iii",chord:"Em7",name:"A third away",role:"Mediant",semitones:4,quality:"min7"}],Nirvana:[{roman:"♭VI",chord:"A♭",name:"Minor-third jump",role:"Borrowed",semitones:8,quality:"maj"},{roman:"♭III",chord:"E♭maj7",name:"Flat-third root",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"♭VII",chord:"B♭",name:"Root drops away",role:"Borrowed",semitones:10,quality:"maj"}],"Steely Dan":[{roman:"I9",chord:"Cmaj9",name:"Added 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"♭II7",chord:"D♭7",name:"Tritone sub",role:"Borrowed",semitones:1,quality:"dom7"},{roman:"iv",chord:"Fm7",name:"Minor iv",role:"Borrowed",semitones:5,quality:"min7"}],"Mac DeMarco":[{roman:"IV",chord:"Fmaj7",name:"maj7 vamp",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"I9",chord:"Cmaj9",name:"Add the 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"iii",chord:"Em7",name:"Never resolves",role:"Mediant",semitones:4,quality:"min7"}],Khruangbin:[{roman:"IV9",chord:"F9",name:"Dorian IV9",role:"Subdominant",semitones:5,quality:"dom9"},{roman:"♭VII",chord:"B♭maj7",name:"Slide ♭VII",role:"Borrowed",semitones:10,quality:"maj7"},{roman:"V7",chord:"G7",name:"Desert dominant",role:"Dominant",semitones:7,quality:"dom7"}],"Daft Punk":[{roman:"♭III",chord:"E♭",name:"Disco ♭III",role:"Borrowed",semitones:3,quality:"maj"},{roman:"v7",chord:"Gm7",name:"Minor v loop",role:"Dominant",semitones:7,quality:"min7"},{roman:"IV",chord:"F",name:"Filter IV",role:"Subdominant",semitones:5,quality:"maj"}],"The Beatles":[{roman:"iv",chord:"Fm",name:"Minor iv fade",role:"Borrowed",semitones:5,quality:"min"},{roman:"III7",chord:"E7",name:"Major III lift",role:"Dominant",semitones:4,quality:"dom7"},{roman:"II7",chord:"D7",name:"Take the II7",role:"Subdominant",semitones:2,quality:"dom7"}]};function ln(t,e,i="C",o="MAJOR"){const s=me(e);if(!s)return null;const n=us[s.name]||us[s.id];if(!n||!n.length)return null;const a=n.map(d=>{const p=Li({id:d.name,name:d.name,roman:d.roman,semitones:d.semitones,quality:d.quality},i,o);return{roman:d.roman,chord:p.chordName,name:d.name,role:d.role,semitones:d.semitones}}),l=String(t.functionLabel||"");let r=1;/^Subdominant/.test(l)?r=1:/Dominant/.test(l)?r=a.length-1:/^Tonic/.test(l)&&(r=0);const c=[r].concat(a.map((d,p)=>p).filter(d=>d!==r));for(let d=0;d<c.length;d++){const p=a[c[d]];if(p&&p.chord!==t.name)return p}return null}const Ht=4,ko=60;class Ir{constructor(){this.tokens=Ht,this.nextIn=ko,this.listeners=new Set,this.timer=null}subscribe(e){return this.listeners.add(e),this.ensureTimer(),()=>{this.listeners.delete(e),!this.listeners.size&&this.timer&&(clearInterval(this.timer),this.timer=null)}}consume(){this.tokens>0&&(this.tokens-=1,this.nextIn=ko,this.emit())}get label(){return this.tokens>=Ht?"AI ready":`Refill ${this.nextIn}s`}ensureTimer(){this.timer||(this.timer=setInterval(()=>{this.tokens>=Ht||(this.nextIn<=1?(this.tokens=Math.min(Ht,this.tokens+1),this.nextIn=ko):this.nextIn-=1,this.emit())},1e3))}emit(){this.listeners.forEach(e=>e())}}const it=new Ir;var Cr=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,Se=(t,e,i,o)=>{for(var s=o>1?void 0:o?Er(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Cr(e,i,s),s};const Mr=[{id:"loop",name:"Chords"},{id:"melody",name:"Melody"},{id:"song",name:"Song"},{id:"play",name:"Play it"}];let he=class extends we{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.syncError=null,this.title="Chroma Chords",this.activeTab="loop",this.showNav=!0,this.aiTokens=4,this.aiNextIn=60,this.midiStatus="Idle",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeCapacity=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=j.subscribeProjects(()=>{this.savedCount=j.getProjects().length,this.requestUpdate()}),this.unsubscribeSyncStatus=j.subscribeSyncStatus(t=>{this.syncStatus=t,this.syncError=j.getLastSyncError(),this.requestUpdate()}),this.savedCount=j.getProjects().length,this.syncStatus=j.getSyncStatus(),this.syncError=j.getLastSyncError(),this.aiTokens=it.tokens,this.aiNextIn=it.nextIn,this.unsubscribeCapacity=it.subscribe(()=>{this.aiTokens=it.tokens,this.aiNextIn=it.nextIn})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeCapacity&&this.unsubscribeCapacity()}setTab(t){this.activeTab=t,this.dispatchEvent(new CustomEvent("tab-change",{detail:t,bubbles:!0,composed:!0}))}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.showCapacityNote&&(this.accountMenuOpen=!1)}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.accountMenuOpen&&(this.showCapacityNote=!1)}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenMidi(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("open-midi",{bubbles:!0,composed:!0}))}onSyncNow(){this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}renderSyncStatusText(){return this.syncStatus==="synced"?"Synced with cloud":this.syncStatus==="syncing"?"Syncing with cloud...":this.syncStatus==="offline"?"Sync failed (offline)":"Sign in to sync"}render(){const t=this.userEmail?this.userEmail.charAt(0).toUpperCase():"U";return m`
      <div class="header-wrap ${this.compact?"compact":""}">
        <!-- Branding Logo & Title -->
        <div class="branding" @click=${()=>this.dispatchEvent(new CustomEvent("brand-click",{bubbles:!0,composed:!0}))}>
          <svg width="26" height="26" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <!-- Tier-1 Navigation Tabs (if showNav is enabled) -->
        ${this.showNav?m`
          <nav class="nav-tabs-wrap" aria-label="Main Navigation">
            ${Mr.map(e=>m`
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
        `:""}

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
    `}};he.styles=xe`
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

    @media (max-width: 899px) {
      /* On phones the AI capacity lives in the dock's ⋯ menu (design: avatar only in the header) */
      .capacity-chip,
      .capacity-panel {
        display: none;
      }
      .header-wrap {
        padding: 0 18px;
      }
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
  `;Se([k({type:Boolean})],he.prototype,"compact",2);Se([k({type:Boolean})],he.prototype,"isAdmin",2);Se([k({type:Boolean})],he.prototype,"isAuthenticated",2);Se([k({type:String})],he.prototype,"userEmail",2);Se([k({type:Number})],he.prototype,"savedCount",2);Se([k({type:String})],he.prototype,"syncStatus",2);Se([k({type:String})],he.prototype,"syncError",2);Se([k({type:String})],he.prototype,"title",2);Se([k({type:String})],he.prototype,"activeTab",2);Se([k({type:Boolean})],he.prototype,"showNav",2);Se([k({type:Number})],he.prototype,"aiTokens",2);Se([k({type:Number})],he.prototype,"aiNextIn",2);Se([k({type:String})],he.prototype,"midiStatus",2);Se([w()],he.prototype,"accountMenuOpen",2);Se([w()],he.prototype,"showCapacityNote",2);he=Se([ke("app-header")],he);var Tr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,ae=(t,e,i,o)=>{for(var s=o>1?void 0:o?Nr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Tr(e,i,s),s};const cn=[{name:"Grand Piano",desc:"Clear and even. Easy to hear the harmony.",color:"#9CC0EC"},{name:"Stage Rhodes",desc:"Warm electric piano with a soft bell.",color:"#F2A79B"},{name:"Nylon Guitar",desc:"Plucked and intimate.",color:"#F6D98B"},{name:"Jazz Archtop",desc:"Round, woody jazz guitar.",color:"#D89047"},{name:"Drawbar Organ",desc:"Held, breathy organ tone.",color:"#E8609A"},{name:"Cinematic Pad",desc:"Long, soft swells that hold each chord.",color:"#C9A9E0"},{name:"Celestial Bell",desc:"Glassy and bright. Rings out.",color:"#B8CC9E"},{name:"Juno Synth",desc:"Lush analog chorus synth.",color:"#7B61FF"},{name:"Vintage SH-101",desc:"Squelchy mono synth. Great for lines.",color:"#4EA598"},{name:"House Stab",desc:"Short, punchy chord hits.",color:"#FF8C42"}],dn=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],pn=["Major","Minor","Dorian","Mixolydian","Lydian","Phrygian","Locrian","Harmonic minor","Melodic minor"],Mi=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],X={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},hn=[{k:"spread",label:"Spread",from:"Spread",max:1,step:.01},{k:"duration",label:"Duration",from:"Pattern + Density",max:2,step:.01},{k:"variance",label:"Human variance",from:"Humanise",max:1,step:.01},{k:"micro",label:"Micro-timing",from:"Swing + Humanise",max:1,step:.01}];let te=class extends we{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play section",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.melodyLoop="Section",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.backingEnabled=!0,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.songTotal="",this.chords=[],this.openMenu=null,this.feelScope=null,this.advOpen=!1}toggleMenu(t){this.openMenu=this.openMenu===t?null:t}closeMenu(){this.openMenu=null}onPlayClick(){const t=this.activeTab==="melody",e=this.activeTab==="song";this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying,target:t?"melody":e?"song":"chords"},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeMenu(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeMenu(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onLoopCycle(){const t=["Section","Chord","Span"],e=t[(t.indexOf(this.melodyLoop)+1)%3];this.melodyLoop=e,this.dispatchEvent(new CustomEvent("loop-cycle",{detail:{melodyLoop:e},bubbles:!0,composed:!0}))}onSelectSound(t){this.closeMenu(),this.activeTab==="melody"?(this.melodySound=t,v.setMelodySound(t),this.dispatchEvent(new CustomEvent("set-melody-sound",{detail:{sound:t},bubbles:!0,composed:!0}))):(this.chordSound=t,this.dispatchEvent(new CustomEvent("set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))),this.requestUpdate()}get feelChanged(){const t=this.feelSettings||{},e=t.barFeel||{},i=t.advOverride||{};return t.playStyle&&t.playStyle!==X.playStyle||t.swing!==void 0&&t.swing!==X.swing||t.spread!==void 0&&t.spread!==X.spread||t.density!==void 0&&t.density!==X.density||t.humanise!==void 0&&t.humanise!==X.humanise||t.tone&&t.tone!==X.tone||Object.keys(e).length>0||Object.keys(i).length>0}resetFeel(){const t=this.activeTab==="melody";this.feelSettings={...X,barFeel:{},advOverride:{}},this.feelScope=null,t?(this.melodyFeel="Smooth",v.setMelodyFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:"Smooth"},bubbles:!0,composed:!0}))):(this.chordFeel=X.playStyle,v.setPlayStyle(X.playStyle),v.setFeelSettings(this.feelSettings),Me(X.tone),this.dispatchEvent(new CustomEvent("feel-change",{detail:{feel:X.playStyle,playStyle:X.playStyle},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:X.playStyle},bubbles:!0,composed:!0}))),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings}},bubbles:!0,composed:!0})),this.requestUpdate()}fget(t){const e=this.feelSettings||{},i=this.feelScope;return i!==null&&e.barFeel&&e.barFeel[i]&&e.barFeel[i][t]!==void 0?e.barFeel[i][t]:t==="playStyle"?e.playStyle||this.chordFeel||"Block chords":e[t]??X[t]}getNearestStep(t){const e=this.fget(t.k);if(typeof e!="number")return t.steps.find(o=>o.v===e)||t.steps[0];let i=t.steps[0];return t.steps.forEach(o=>{Math.abs(Number(o.v)-Number(e))<Math.abs(Number(i.v)-Number(e))&&(i=o)}),i}onSelectFeelStep(t,e){const i=this.activeTab==="melody",o={...this.feelSettings};if(this.feelScope===null)o[t]=e,t==="playStyle"?i?(this.melodyFeel=e,v.setMelodyFeel(e),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):(this.chordFeel=e,v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("feel-change",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):t==="tone"&&Me(e);else{const s=this.feelScope,n={...o.barFeel||{}};n[s]={...n[s]||{},[t]:e},o.barFeel=n}this.feelSettings=o,i?v.setMelodyFeelSettings(this.feelSettings):v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent(i?"melody-feel-settings-change":"feel-settings-change",{detail:{feelSettings:{...this.feelSettings},key:t,value:e,chordIndex:this.feelScope},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:e,isMelody:i},bubbles:!0,composed:!0})),this.requestUpdate()}getDerivedParams(){const t=a=>{const l=this.fget(a);return typeof l=="number"?l:0},e=this.fget("playStyle"),i=+(t("spread")/100).toFixed(2),o=+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),s=+(t("humanise")/100).toFixed(2),n=+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2);return{spread:i,duration:o,variance:s,micro:n}}onAdvInput(t,e){const i={...this.feelSettings};i.advOverride={...i.advOverride||{},[t]:e},this.feelSettings=i,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:i.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onAdvRelink(t){const e={...this.feelSettings};if(e.advOverride){const i={...e.advOverride};delete i[t],e.advOverride=i}this.feelSettings=e,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:e.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onShareClick(){this.closeMenu(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((d,p)=>(d.id||String.fromCharCode(65+p))===this.activeSectionId)||this.sections[0]||{name:"Chorus",tint:"#F1E4CC",progression:null},o=t?this.melodySound:this.chordSound;t?this.melodyFeel:this.chordFeel;const s=this.fget("playStyle"),a=(Mi[0].steps.find(d=>d.v===s)||Mi[0].steps[0]).name,l=this.chords&&this.chords.length>0?this.chords:i?.progression?.chords?.length?i.progression.chords:[{name:"Chord 1"},{name:"Chord 2"},{name:"Chord 3"},{name:"Chord 4"}],r=this.isPlaying?"#FBF3E6":this.moodColor,c=this.isPlaying?"■":"▶";return m`
      <div class="transport-container ${t?"melody":""}" data-screen-label="Transport">
        ${this.openMenu?m`<div class="backdrop" @click=${this.closeMenu}></div>`:""}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${r};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          <span class="play-icon">${c}</span>
          <span class="play-first">${this.playLabel.split(" ")[0]}</span><span class="play-rest">${this.playLabel.includes(" ")?" "+this.playLabel.split(" ").slice(1).join(" "):""}</span>
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
          ${this.sections.map((d,p)=>{const u=d.id||String.fromCharCode(65+p);return m`
              <button
                class="tb-btn ${u===this.activeSectionId?"active":""}"
                @click=${()=>this.onSelectSection(u)}
              >
                <span class="sec-badge" style="background: ${d.tint||"#F1E4CC"};"></span>
                <span>${d.name}</span>
              </button>
            `})}
        </div>

        <!-- Section Dropdown Popover -->
        ${this.openMenu==="section"?m`
          <div class="popover-shell sec-popover">
            <div class="popover-title">Section</div>
            ${this.sections.map((d,p)=>{const u=d.id||String.fromCharCode(65+p);return m`
                <button
                  class="sec-item ${u===this.activeSectionId?"selected":""}"
                  @click=${()=>this.onSelectSection(u)}
                >
                  <span class="sec-badge" style="background: ${d.tint||"#F1E4CC"}; width: 12px; height: 12px;"></span>
                  <span class="sec-item-name">${d.name}</span>
                  <span class="sec-item-meta">${d.order?d.order.length:4} bars</span>
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

          <!-- Backing Chords Toggle (Melody Tab Only) -->
          <button
            class="tb-btn ${this.backingEnabled?"":"muted"}"
            @click=${()=>{this.backingEnabled=!this.backingEnabled,v.setMelodyBackingEnabled(this.backingEnabled),this.dispatchEvent(new CustomEvent("toggle-melody-backing",{detail:{backingEnabled:this.backingEnabled},bubbles:!0,composed:!0})),this.requestUpdate()}}
            aria-label="Toggle backing chords"
            title="${this.backingEnabled?"Backing chords on. Click to hear solo melody.":"Backing chords muted. Click to hear chords with melody."}"
          >
            <span>Chords</span>
            <span class="highlight">${this.backingEnabled?"On":"Muted"}</span>
          </button>
        `:""}

        <!-- Sound Selector -->
        ${e?"":m`
          <button
            class="tb-btn ${this.openMenu==="sound"?"active":""}"
            @click=${()=>this.toggleMenu("sound")}
            aria-label="Select instrument sound"
          >
            <span class="kicker">Sound</span>
            <span class="highlight">${o}</span>
            <span class="caret">▾</span>
          </button>

          <!-- Feel Selector -->
          <button
            class="tb-btn ${this.openMenu==="feel"?"active":""}"
            @click=${()=>this.toggleMenu("feel")}
            aria-label="Select rhythmic feel"
          >
            <span class="kicker">Feel</span>
            <span class="highlight">${a}</span>
            <span class="caret">▾</span>
          </button>
        `}

        <!-- Sound Popover -->
        ${this.openMenu==="sound"?m`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${t?"Melody sound":"Chord sound"}</div>
            <div class="sound-grid">
              ${cn.map(d=>m`
                <button
                  class="sound-item ${d.name===o?"selected":""}"
                  @click=${()=>this.onSelectSound(d.name)}
                >
                  <span class="sound-dot" style="background: ${d.color};"></span>
                  <div class="sound-meta">
                    <span class="sound-name">${d.name}</span>
                    <span class="sound-desc">${d.desc}</span>
                  </div>
                </button>
              `)}
            </div>
          </div>
        `:""}

        <!-- Feel Docked Panel -->
        ${this.openMenu==="feel"?m`
          <div class="docked-panel feel-panel" style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label, #8A6B3F); flex-shrink: 0;">
                ${t?"Melody feel":"Chord feel"}
              </div>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; flex: 1; min-width: 0;">
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${this.feelScope===null?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.feelScope===null?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=null}}
                  aria-label="Whole section, editing"
                >
                  Whole section
                </button>
                ${l.map((d,p)=>{const u=this.feelScope===p,h=!!(this.feelSettings?.barFeel&&this.feelSettings.barFeel[p]&&Object.keys(this.feelSettings.barFeel[p]).length>0),g=d.name||"Chord "+(p+1);return m`
                    <button
                      type="button"
                      style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${u?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${u?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                      @click=${()=>{this.feelScope=p}}
                      aria-label="${g}, ${u?"editing":"edit feel"}"
                    >
                      ${g}
                      <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${u?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${h?1:0}; transition: opacity 150ms ease;"></span>
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
                @click=${()=>this.closeMenu()}
                aria-label="Close feel and tone"
                style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
              >×</button>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 7px; text-wrap: pretty;">
              ${this.feelScope===null?"Everything below applies to every chord in this section.":`Only ${l[this.feelScope]?.name||"Chord "+(this.feelScope+1)} plays this way. The rest keep the section feel.`}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px 22px; margin-top: 10px;">
              ${Mi.map(d=>{const p=this.getNearestStep(d);return m`
                  <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                    <div style="width: 104px; flex-shrink: 0;">
                      <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F);">${d.label}</div>
                      <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${d.hint}</div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                      ${d.steps.map(u=>{const h=u.v===p.v;return m`
                          <button
                            type="button"
                            class="feel-step-btn ${h?"selected":""}"
                            @click=${()=>this.onSelectFeelStep(d.k,u.v)}
                            aria-label="${d.label}: ${u.name}"
                          >
                            ${u.name}
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
              <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px 26px;">
                ${hn.map(d=>{const p=this.feelSettings?.advOverride||{},u=this.getDerivedParams(),h=p[d.k]!==void 0,g=h?p[d.k]:u[d.k];return m`
                    <div style="min-width: 0;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="font-size: 12px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${d.label}</div>
                        <button
                          type="button"
                          @click=${()=>this.onAdvRelink(d.k)}
                          style="border: none; font-family: inherit; background: transparent; color: #9E5D53; font-size: 10.5px; font-weight: 800; cursor: pointer; padding: 4px 6px; border-radius: 7px; ${h?"":"opacity: 0; pointer-events: none;"}"
                          aria-label="Re-link to the feel axis"
                        >Re-link</button>
                        <div style="font-size: 11.5px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--cv-ink, #2E271F); background: var(--cv-surface-2, #F1E4CC); border-radius: 6px; padding: 2px 7px;">
                          ${typeof g=="number"?g.toFixed(2):g}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="${d.max}"
                        step="${d.step}"
                        .value="${String(g)}"
                        @input=${f=>this.onAdvInput(d.k,+f.target.value)}
                        aria-label="${d.label}"
                        style="width: 100%; margin-top: 7px; accent-color: #9E5D53; cursor: pointer;"
                      />
                      <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: ${h?"#9E5D53":"rgba(46,39,31,0.36)"}; margin-top: 3px;">
                        ${h?"Set by hand":"From "+d.from}
                      </div>
                    </div>
                  `})}
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
          <span class="bpm-word" style="font-size: 11px;">BPM</span>
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
                  ${[1,2,4].map(d=>m`
                    <button
                      class="pill-btn ${this.barsPerChord===d?"selected":""}"
                      @click=${()=>this.onBarsChange(d)}
                    >
                      ${d} bar${d>1?"s":""}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Key root</div>
              <div class="pill-group">
                ${dn.map(d=>m`
                  <button
                    class="pill-btn ${this.keyRoot===d?"selected":""}"
                    @click=${()=>this.onKeyRootChange(d)}
                  >
                    ${d}
                  </button>
                `)}
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Scale / Mode</div>
              <div class="pill-group">
                ${pn.map(d=>m`
                  <button
                    class="pill-btn ${this.scaleMode===d?"selected":""}"
                    @click=${()=>this.onScaleModeChange(d)}
                  >
                    ${d}
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
    `}};te.styles=xe`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: #FBF3E6;
    }

    button, input, select {
      font-family: inherit;
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
      container-type: inline-size;
    }

    /* Compact only when the bar would otherwise wrap: drop the Sound / Feel kickers and shorten Play.
       Melody carries two extra buttons (Loop, Chords), so it needs more room. */
    @container (max-width: 760px) {
      .tb-btn .kicker,
      .play-rest {
        display: none;
      }
      .tb-btn {
        padding: 0 10px;
      }
    }

    /* Very tight (Chords with the right-hand column open at ~900px): shed carets and the BPM word */
    @container (max-width: 640px) {
      .tb-btn .caret,
      .bpm-word {
        display: none;
      }
      .tb-btn {
        padding: 0 8px;
        gap: 5px;
      }
    }

    @container (max-width: 940px) {
      .transport-container.melody .tb-btn .kicker,
      .transport-container.melody .play-rest {
        display: none;
      }
      .transport-container.melody .tb-btn {
        padding: 0 10px;
      }
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
      width: min(480px, calc(100vw - 40px));
      max-height: none;
      overflow-y: visible;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .sound-popover::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .sound-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px;
      margin-top: 4px;
    }

    .sound-item {
      width: 100%;
      border: none;
      font-family: inherit;
      border-radius: 12px;
      background: rgba(46, 39, 31, 0.05);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      text-align: left;
      color: #2E271F;
      transition: background 120ms ease, transform 120ms ease;
    }

    .sound-item:hover {
      background: #F1E4CC;
      transform: translateY(-1px);
    }

    .sound-item.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .sound-item.selected .sound-desc {
      color: rgba(251, 243, 230, 0.65);
    }

    .sound-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
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

    .docked-panel {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 10px);
      z-index: 50;
      max-height: min(72vh, 640px);
      overflow-y: auto;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 22px 48px rgba(46, 39, 31, 0.22);
      background: var(--cv-cream, #FBF3E6);
      color: #2E271F;
      box-sizing: border-box;
    }

    .feel-panel {
      padding: 16px 18px 18px;
    }

    @keyframes cvfv-panel {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .feel-step-btn {
      border: none;
      font-family: inherit;
      flex: 1 1 auto;
      min-width: fit-content;
      min-height: 44px;
      padding: 0 11px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: -0.005em;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #6B5F50);
    }

    .feel-step-btn:hover {
      background: var(--cv-surface, #F6EADB);
    }

    .feel-step-btn.selected {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }

    .feel-step-btn:active {
      transform: scale(0.97);
    }

    .tempo-popover {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 10px);
      z-index: 50;
      max-height: min(72vh, 640px);
      overflow-y: auto;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 22px 48px rgba(46, 39, 31, 0.22);
      background: var(--cv-cream, #FBF3E6);
      color: #2E271F;
      padding: 16px 18px 16px;
      box-sizing: border-box;
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
  `;ae([k({type:String})],te.prototype,"activeTab",2);ae([k({type:Boolean})],te.prototype,"isPlaying",2);ae([k({type:String})],te.prototype,"playLabel",2);ae([k({type:String})],te.prototype,"moodColor",2);ae([k({type:Array})],te.prototype,"sections",2);ae([k({type:String})],te.prototype,"activeSectionId",2);ae([k({type:String})],te.prototype,"melodyLoop",2);ae([k({type:String})],te.prototype,"chordSound",2);ae([k({type:String})],te.prototype,"melodySound",2);ae([k({type:String})],te.prototype,"chordFeel",2);ae([k({type:String})],te.prototype,"melodyFeel",2);ae([k({type:Boolean})],te.prototype,"backingEnabled",2);ae([k({type:Object})],te.prototype,"feelSettings",2);ae([k({type:String})],te.prototype,"keyRoot",2);ae([k({type:String})],te.prototype,"scaleMode",2);ae([k({type:Number})],te.prototype,"bpm",2);ae([k({type:Number})],te.prototype,"barsPerChord",2);ae([k({type:String})],te.prototype,"songTotal",2);ae([k({type:Array})],te.prototype,"chords",2);ae([w()],te.prototype,"openMenu",2);ae([w()],te.prototype,"feelScope",2);ae([w()],te.prototype,"advOpen",2);te=ae([ke("transport-bar")],te);var Ar=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,ie=(t,e,i,o)=>{for(var s=o>1?void 0:o?Or(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Ar(e,i,s),s};let Q=class extends we{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.melodyLoop="Section",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.isSaved=!1,this.backingEnabled=!0,this.saveState="new",this.chords=[],this.activeSheet=null,this.unsubscribeCapacity=null,this.feelScope=null,this.advOpen=!1}connectedCallback(){super.connectedCallback(),this.unsubscribeCapacity=it.subscribe(()=>{this.activeSheet==="more"&&this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeCapacity?.()}toggleSheet(t){this.activeSheet=this.activeSheet===t?null:t}closeSheet(){this.activeSheet=null}onPlayClick(){const t=this.activeTab==="melody",e=this.activeTab==="song";this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying,target:t?"melody":e?"song":"chords"},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeSheet(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeSheet(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeSheet(),this.activeTab==="melody"?(this.melodySound=t,v.setMelodySound(t),this.dispatchEvent(new CustomEvent("set-melody-sound",{detail:{sound:t},bubbles:!0,composed:!0}))):(this.chordSound=t,this.dispatchEvent(new CustomEvent("set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))),this.requestUpdate()}get feelChanged(){const t=this.feelSettings||{},e=t.barFeel||{},i=t.advOverride||{};return t.playStyle&&t.playStyle!==X.playStyle||t.swing!==void 0&&t.swing!==X.swing||t.spread!==void 0&&t.spread!==X.spread||t.density!==void 0&&t.density!==X.density||t.humanise!==void 0&&t.humanise!==X.humanise||t.tone&&t.tone!==X.tone||Object.keys(e).length>0||Object.keys(i).length>0}resetFeel(){const t=this.activeTab==="melody";this.feelSettings={...X,barFeel:{},advOverride:{}},this.feelScope=null,t?(this.melodyFeel="Smooth",v.setMelodyFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:"Smooth"},bubbles:!0,composed:!0}))):(this.chordFeel=X.playStyle,v.setPlayStyle(X.playStyle),v.setFeelSettings(this.feelSettings),Me(X.tone),this.dispatchEvent(new CustomEvent("set-feel",{detail:{feel:X.playStyle},bubbles:!0,composed:!0}))),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings}},bubbles:!0,composed:!0})),this.requestUpdate()}fget(t){const e=this.feelSettings||{},i=this.feelScope;return i!==null&&e.barFeel&&e.barFeel[i]&&e.barFeel[i][t]!==void 0?e.barFeel[i][t]:t==="playStyle"?e.playStyle||this.chordFeel||"Block chords":e[t]??X[t]}getNearestStep(t){const e=this.fget(t.k);if(typeof e!="number")return t.steps.find(o=>o.v===e)||t.steps[0];let i=t.steps[0];return t.steps.forEach(o=>{Math.abs(Number(o.v)-Number(e))<Math.abs(Number(i.v)-Number(e))&&(i=o)}),i}onSelectFeelStep(t,e){const i=this.activeTab==="melody",o={...this.feelSettings};if(this.feelScope===null)o[t]=e,t==="playStyle"?i?(this.melodyFeel=e,v.setMelodyFeel(e),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):(this.chordFeel=e,v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):t==="tone"&&Me(e);else{const s=this.feelScope,n={...o.barFeel||{}};n[s]={...n[s]||{},[t]:e},o.barFeel=n}this.feelSettings=o,i?v.setMelodyFeelSettings(this.feelSettings):v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},key:t,value:e,chordIndex:this.feelScope},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:e},bubbles:!0,composed:!0})),this.requestUpdate()}getDerivedParams(){const t=a=>{const l=this.fget(a);return typeof l=="number"?l:0},e=this.fget("playStyle"),i=+(t("spread")/100).toFixed(2),o=+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),s=+(t("humanise")/100).toFixed(2),n=+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2);return{spread:i,duration:o,variance:s,micro:n}}onAdvInput(t,e){const i={...this.feelSettings};i.advOverride={...i.advOverride||{},[t]:e},this.feelSettings=i,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:i.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onAdvRelink(t){const e={...this.feelSettings};if(e.advOverride){const i={...e.advOverride};delete i[t],e.advOverride=i}this.feelSettings=e,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:e.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onRerollProgression(){this.closeSheet(),this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onToggleSaved(){this.closeSheet(),this.dispatchEvent(new CustomEvent(this.isSaved?"unsave-set":"save-set",{bubbles:!0,composed:!0}))}onViewSavedLoops(){this.closeSheet(),this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenShare(){this.closeSheet(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}onSetBacking(t){this.backingEnabled=t,this.dispatchEvent(new CustomEvent("toggle-melody-backing",{detail:{backingEnabled:t},bubbles:!0,composed:!0}))}onSetLoop(t){this.melodyLoop=t,this.dispatchEvent(new CustomEvent("loop-cycle",{detail:{melodyLoop:t},bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",i=this.sections.find((r,c)=>(r.id||String.fromCharCode(65+c))===this.activeSectionId)||this.sections[0]||{id:"A",name:"Chorus",tint:"#F1E4CC",progression:null},o=i.id||i.name.charAt(0),s=this.isPlaying?"#FBF3E6":this.moodColor,n=this.isPlaying?"■":"▶",a=t?this.melodySound:this.chordSound;t?this.melodyFeel:this.chordFeel;const l=this.chords&&this.chords.length>0?this.chords:i?.progression?.chords?.length?i.progression.chords:[{name:"Chord 1"},{name:"Chord 2"},{name:"Chord 3"},{name:"Chord 4"}];return m`
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
            ${t?m`
              <div class="loop-row">
                <span class="loop-row-label">Loop</span>
                <div class="loop-seg" role="radiogroup" aria-label="What loops">
                  ${["Section","Chord","Span"].map(r=>m`
                    <button
                      class="loop-seg-btn ${this.melodyLoop===r?"active":""}"
                      role="radio"
                      aria-checked=${this.melodyLoop===r}
                      @click=${()=>this.onSetLoop(r)}
                    >${r}</button>
                  `)}
                </div>
              </div>
              <div class="loop-row">
                <span class="loop-row-label">Chords</span>
                <div class="loop-seg" role="radiogroup" aria-label="Chords playing under the melody">
                  ${[[!0,"On"],[!1,"Muted"]].map(([r,c])=>m`
                    <button
                      class="loop-seg-btn ${this.backingEnabled===r?"active":""}"
                      role="radio"
                      aria-checked=${this.backingEnabled===r}
                      @click=${()=>this.onSetBacking(r)}
                    >${c}</button>
                  `)}
                </div>
              </div>
            `:""}
            <button class="popover-menu-item" @click=${this.onRerollProgression}>
              <span class="label">Try another progression</span>
              <span class="desc">New chords for this section, with undo</span>
            </button>
            <button class="popover-menu-item" @click=${this.onToggleSaved}>
              <span class="label">${this.isSaved?"Kept":"Keep this loop"}</span>
              <span class="desc">${this.saveState==="edited"?"Changed since you saved it. Update or keep both":"Save it to your loops"}</span>
            </button>
            <button class="popover-menu-item" @click=${this.onViewSavedLoops}>
              <span class="label">Saved loops</span>
              <span class="desc">Load a loop into this section</span>
            </button>
            <button class="popover-menu-item" @click=${this.onOpenShare}>
              <span class="label">Share and export</span>
              <span class="desc">MIDI, WAV, M8, Circuit</span>
            </button>
            <div class="ai-row" role="note" aria-label="AI generates remaining">
              <span class="ai-pips">
                ${Array.from({length:Ht},(r,c)=>m`<span class="ai-pip ${c<it.tokens?"filled":""}"></span>`)}
              </span>
              <span class="ai-text">
                <span class="label">${it.label}</span>
                <span class="desc">AI generates remaining. Refills 1 every 60 seconds.</span>
              </span>
            </div>
          </div>
        `:""}

        <!-- Section Popover (Upwards) -->
        ${this.activeSheet==="section"?m`
          <div class="popover-up" style="max-height: 320px; overflow-y: auto;">
            <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8A6B3F; padding: 6px 10px 4px;">
              Section
            </div>
            ${this.sections.map((r,c)=>{const d=r.id||String.fromCharCode(65+c);return m`
                <button
                  class="popover-menu-item"
                  style="flex-direction: row; align-items: center; gap: 10px; background: ${d===this.activeSectionId?"#F1E4CC":"transparent"};"
                  @click=${()=>this.onSelectSection(d)}
                >
                  <span class="sec-letter-badge" style="background: ${r.tint||"#F1E4CC"};">${d}</span>
                  <span class="label" style="flex: 1;">${r.name}</span>
                  <span class="desc">${r.order?r.order.length:4} bars</span>
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
            ${[1,2,4].map(r=>m`
              <button
                class="pill-btn ${this.barsPerChord===r?"selected":""}"
                @click=${()=>this.onBarsChange(r)}
              >
                ${r} bar${r>1?"s":""}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Key Root</div>
          <div class="pill-group">
            ${dn.map(r=>m`
              <button
                class="pill-btn ${this.keyRoot===r?"selected":""}"
                @click=${()=>this.onKeyRootChange(r)}
              >
                ${r}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Scale / Mode</div>
          <div class="pill-group">
            ${pn.map(r=>m`
              <button
                class="pill-btn ${this.scaleMode===r?"selected":""}"
                @click=${()=>this.onScaleModeChange(r)}
              >
                ${r}
              </button>
            `)}
          </div>
        </div>
      `:""}

      <!-- Feel Bottom Sheet -->
      ${this.activeSheet==="feel"?m`
        <div class="bottom-sheet" style="max-height: calc(100% - 24px); overflow-y: auto;">
          <div class="sheet-handle"></div>
          <div style="display: flex; align-items: center; gap: 10px; padding: 2px 0 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">
              ${t?"Melody feel":"Chord feel"}
            </div>
            ${this.feelChanged?m`
              <button
                type="button"
                @click=${this.resetFeel}
                style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 12px; font-weight: 800; cursor: pointer; padding: 6px 10px; border-radius: 10px;"
              >Reset</button>
            `:""}
            <button
              type="button"
              @click=${this.closeSheet}
              style="border: none; font-family: inherit; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink, #2E271F); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
            >Done</button>
          </div>

          <div style="display: flex; gap: 5px; overflow-x: auto; padding-bottom: 4px; margin-top: 2px;">
            <button
              type="button"
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${this.feelScope===null?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${this.feelScope===null?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"}; flex-shrink: 0;"
              @click=${()=>{this.feelScope=null}}
              aria-label="Whole section feel"
            >
              Whole section
            </button>
            ${l.map((r,c)=>{const d=this.feelScope===c,p=!!(this.feelSettings?.barFeel&&this.feelSettings.barFeel[c]&&Object.keys(this.feelSettings.barFeel[c]).length>0),u=r.name||"Chord "+(c+1);return m`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${d?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${d?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"}; flex-shrink: 0;"
                  @click=${()=>{this.feelScope=c}}
                  aria-label="${u}, ${d?"editing":"edit feel"}"
                >
                  ${u}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${d?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${p?1:0}; transition: opacity 150ms ease;"></span>
                </button>
              `})}
          </div>

          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${this.feelScope===null?"Everything below applies to every chord in this section.":`Only ${l[this.feelScope]?.name||"Chord "+(this.feelScope+1)} plays this way. The rest keep the section feel.`}
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
            ${Mi.map(r=>{const c=this.getNearestStep(r);return m`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F);">${r.label}</span>
                    <span style="font-size: 11px; font-weight: 600; color: #6B5F50;">${r.hint}</span>
                  </div>
                  <div class="pill-group">
                    ${r.steps.map(d=>{const p=d.v===c.v;return m`
                        <button
                          type="button"
                          class="pill-btn ${p?"selected":""}"
                          @click=${()=>this.onSelectFeelStep(r.k,d.v)}
                          aria-label="${r.label}: ${d.name}"
                        >
                          ${d.name}
                        </button>
                      `})}
                  </div>
                </div>
              `})}
          </div>

          <button
            type="button"
            @click=${()=>{this.advOpen=!this.advOpen}}
            style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 10px 0; margin-top: 10px;"
            aria-label="Show the engine parameters these choices set"
          >
            Engine parameters <span style="font-size: 9px;">${this.advOpen?"▲":"▼"}</span>
          </button>

          ${this.advOpen?m`
            <div style="border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; display: flex; flex-direction: column; gap: 14px;">
              ${hn.map(r=>{const c=this.feelSettings?.advOverride||{},d=this.getDerivedParams(),p=c[r.k]!==void 0,u=p?c[r.k]:d[r.k];return m`
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="font-size: 12px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${r.label}</div>
                      <button
                        type="button"
                        @click=${()=>this.onAdvRelink(r.k)}
                        style="border: none; font-family: inherit; background: transparent; color: #9E5D53; font-size: 10.5px; font-weight: 800; cursor: pointer; padding: 4px 6px; border-radius: 7px; ${p?"":"opacity: 0; pointer-events: none;"}"
                        aria-label="Re-link to the feel axis"
                      >Re-link</button>
                      <div style="font-size: 11.5px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--cv-ink, #2E271F); background: var(--cv-surface-2, #F1E4CC); border-radius: 6px; padding: 2px 7px;">
                        ${typeof u=="number"?u.toFixed(2):u}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="${r.max}"
                      step="${r.step}"
                      .value="${String(u)}"
                      @input=${h=>this.onAdvInput(r.k,+h.target.value)}
                      aria-label="${r.label}"
                      style="width: 100%; margin-top: 7px; accent-color: #9E5D53; cursor: pointer;"
                    />
                    <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: ${p?"#9E5D53":"rgba(46,39,31,0.36)"}; margin-top: 3px;">
                      ${p?"Set by hand":"From "+r.from}
                    </div>
                  </div>
                `})}
            </div>
          `:""}
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
            ${cn.map(r=>m`
              <button
                class="popover-menu-item"
                style="flex-direction: row; align-items: flex-start; gap: 12px; background: ${r.name===a?"#F1E4CC":"transparent"};"
                @click=${()=>this.onSelectSound(r.name)}
              >
                <span style="width: 12px; height: 12px; border-radius: 4px; background: ${r.color}; flex-shrink: 0; margin-top: 3px;"></span>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span class="label">${r.name}</span>
                  <span class="desc">${r.desc}</span>
                </div>
              </button>
            `)}
          </div>
        </div>
      `:""}
    `}};Q.styles=xe`
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

    .ai-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 4px;
      padding: 12px 12px 8px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }
    .ai-pips {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    .ai-pip {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.18);
    }
    .ai-pip.filled {
      background: #9E5D53;
    }
    .ai-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .ai-text .label {
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
    }
    .ai-text .desc {
      font-size: 12px;
      font-weight: 600;
      color: #6B5F50;
    }
    .loop-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px 8px;
    }
    .loop-row-label {
      min-width: 52px;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8A6B3F;
    }
    .loop-seg {
      flex: 1;
      display: flex;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }
    .loop-seg-btn {
      flex: 1;
      border: none;
      font-family: inherit;
      min-height: 36px;
      border-radius: 100px;
      background: transparent;
      color: #6B5F50;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .loop-seg-btn.active {
      background: #FBF3E6;
      color: #2E271F;
      font-weight: 800;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
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
  `;ie([k({type:String})],Q.prototype,"activeTab",2);ie([k({type:Boolean})],Q.prototype,"isPlaying",2);ie([k({type:String})],Q.prototype,"playLabel",2);ie([k({type:String})],Q.prototype,"moodColor",2);ie([k({type:Array})],Q.prototype,"sections",2);ie([k({type:String})],Q.prototype,"activeSectionId",2);ie([k({type:String})],Q.prototype,"chordSound",2);ie([k({type:String})],Q.prototype,"melodySound",2);ie([k({type:String})],Q.prototype,"chordFeel",2);ie([k({type:String})],Q.prototype,"melodyFeel",2);ie([k({type:String})],Q.prototype,"melodyLoop",2);ie([k({type:Object})],Q.prototype,"feelSettings",2);ie([k({type:String})],Q.prototype,"keyRoot",2);ie([k({type:String})],Q.prototype,"scaleMode",2);ie([k({type:Number})],Q.prototype,"bpm",2);ie([k({type:Number})],Q.prototype,"barsPerChord",2);ie([k({type:Boolean})],Q.prototype,"isSaved",2);ie([k({type:Boolean})],Q.prototype,"backingEnabled",2);ie([k({type:String})],Q.prototype,"saveState",2);ie([k({type:Array})],Q.prototype,"chords",2);ie([w()],Q.prototype,"activeSheet",2);ie([w()],Q.prototype,"feelScope",2);ie([w()],Q.prototype,"advOpen",2);Q=ie([ke("mobile-dock")],Q);var Fr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Ge=(t,e,i,o)=>{for(var s=o>1?void 0:o?Br(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Fr(e,i,s),s};const Dr=[52,76,100];let Oe=class extends we{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC",this.band=null}onPick(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onRevert(){this.baseChord&&this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:this.baseChord.name,roman:this.baseChord.roman||"",notes:this.baseChord.notes||[],sub:this.baseChord.functionLabel||"",tension:this.baseChord.tension||.3,feel:"Original",chord:this.baseChord},bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,i=100/t,o=`calc(${e*i}% + ${i/2}% - 8px)`,s=this.chord,n=s?.name||"",a=s?.tension??.3,l=se(a).color,r=this.baseChord?.name||n,c=se(this.baseChord?.tension??a).color,d=!!(this.baseChord&&this.baseChord.name!==n),p=d?`Bar ${this.swapIndex+1} is now ${n}`:`Bar ${this.swapIndex+1} · swap ${n} for…`,u=d?`Was ${r}.`:"Tap one to hear it in place. Undo puts it back.";return m`
      <div class="tray-wrapper" data-swap-lane="1">
        <div class="tray-pointer" style="left: ${o};"></div>
        <div class="tray-card">
          <!-- Tray Header Row -->
          <div class="tray-header">
            <span class="tray-swatch" style="background: ${l};"></span>
            <span class="tray-title">${p}</span>
            <span class="tray-sub">${u}</span>
            <div class="tray-spacer"></div>

            ${d?m`
              <button
                class="tray-revert-btn"
                style="background: ${c};"
                @click=${this.onRevert}
                aria-label="Revert to ${r}"
              >
                Back to ${r}
              </button>
            `:""}

            <button
              class="tray-close-btn"
              @click=${this.onClose}
              aria-label="Close swaps drawer"
            >
              ×
            </button>
          </div>

          <!-- Groups Grid (Feel Families) -->
          <div class="tray-groups-grid">
            ${this.feelings.map(h=>{const g=se(h.tension).color,f=(h.rows||[]).slice(0,3);return m`
                <div class="tray-group-col">
                  <div class="tray-group-header">
                    <span class="tray-group-name">${h.name}</span>
                    <span class="tray-group-sub">${h.sub}</span>
                  </div>

                  <div class="tray-chips-row">
                    ${f.map((b,y)=>{const x=b.name===n,C=Dr[y]||100,I=`color-mix(in srgb, ${g} ${C}%, #FBF3E6)`;return m`
                        <button
                          class="tray-chip ${x?"selected":""}"
                          style="${x?`box-shadow: 0 0 0 2px ${g};`:`background: ${I}; color: #2E271F;`}"
                          @click=${()=>this.onPick(b,h)}
                          aria-label="Swap to ${b.name}"
                        >
                          ${x?`✓ ${b.name}`:b.name}
                        </button>
                      `})}
                  </div>
                </div>
              `})}
          </div>
        </div>
      </div>
    `}};Oe.styles=xe`
    :host {
      display: block;
      grid-column: 1 / -1;
      width: 100%;
      min-width: 0;
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .tray-wrapper {
      width: 100%;
      min-width: 0;
      position: relative;
      padding-top: 7px;
      margin-top: -4px;
      margin-bottom: 8px;
      animation: cvfv-tray 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
    }

    @keyframes cvfv-tray {
      0% { opacity: 0; transform: translateY(-8px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .tray-pointer {
      position: absolute;
      top: 0;
      width: 16px;
      height: 16px;
      background: var(--cv-cream, #FBF3E6);
      transform: rotate(45deg);
      border-radius: 3px;
      z-index: 1;
      transition: left 240ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .tray-card {
      position: relative;
      z-index: 2;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 18px;
      padding: 14px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.35);
      border: 1px solid rgba(46, 39, 31, 0.08);
    }

    .tray-header {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .tray-swatch {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .tray-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .tray-sub {
      font-size: 12px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .tray-spacer {
      flex: 1;
      min-width: 0;
    }

    .tray-revert-btn {
      border: none;
      font-family: inherit;
      min-height: 32px;
      padding: 0 12px;
      border-radius: 100px;
      color: #2E271F;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: transform 120ms ease, opacity 120ms ease;
    }

    .tray-revert-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .tray-close-btn {
      border: none;
      font-family: inherit;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 18px;
      font-weight: 800;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
    }

    .tray-close-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: #2E271F;
    }

    .tray-groups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }

    .tray-group-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .tray-group-header {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .tray-group-name {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .tray-group-sub {
      font-size: 11px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tray-chips-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tray-chip {
      flex: 1 1 0;
      min-width: 56px;
      border: none;
      font-family: inherit;
      min-height: 38px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease;
    }

    .tray-chip:hover {
      box-shadow: inset 0 0 0 2px #2E271F;
      transform: translateY(-1px);
    }

    .tray-chip:active {
      transform: scale(0.96);
    }

    .tray-chip.selected {
      background: #2E271F !important;
      color: #FBF3E6 !important;
    }

    /* Phones: one-line header (swatch, title, revert, close) and 44px touch chips */
    @media (max-width: 899px) {
      .tray-card {
        padding: 10px 12px 12px;
        border-radius: 16px;
        gap: 9px;
      }
      .tray-header {
        flex-wrap: nowrap;
        gap: 7px;
      }
      .tray-title {
        flex: 1;
        min-width: 0;
        font-size: 12.5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tray-sub,
      .tray-spacer {
        display: none;
      }
      .tray-revert-btn {
        min-height: 36px;
        flex: none;
      }
      .tray-close-btn {
        width: 36px;
        height: 36px;
        flex: none;
      }
      .tray-groups-grid {
        grid-template-columns: 1fr;
        gap: 9px;
      }
      .tray-chips-row {
        flex-wrap: nowrap;
        gap: 5px;
      }
      .tray-chip {
        min-width: 0;
        min-height: 44px;
        padding: 0 4px;
        border-radius: 12px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `;Ge([k({type:Number})],Oe.prototype,"swapIndex",2);Ge([k({type:Object})],Oe.prototype,"chord",2);Ge([k({type:Object})],Oe.prototype,"baseChord",2);Ge([k({type:Array})],Oe.prototype,"feelings",2);Ge([k({type:String})],Oe.prototype,"activeFeel",2);Ge([k({type:Object})],Oe.prototype,"pickedChord",2);Ge([k({type:Number})],Oe.prototype,"padCols",2);Ge([k({type:String})],Oe.prototype,"moodColor",2);Ge([k({type:Object})],Oe.prototype,"band",2);Oe=Ge([ke("chord-swap-lane")],Oe);var Pr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,le=(t,e,i,o)=>{for(var s=o>1?void 0:o?Rr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Pr(e,i,s),s};const ms={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},gs=["A","S","D","F","Z","X","C","V"],Lr=["OCTAVE UP","1ST INVERSION","LOW ROOT"];function fs(t){if(!t)return-1;const e=t.toLowerCase();return e.includes("octave")||e.includes("high")?0:e.includes("inversion")||e.includes("1st")?1:e.includes("root")||e.includes("low")?2:-1}let ne=class extends we{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Emotional",key:"C",scaleType:"MAJOR",bpm:84,chords:[]},this.chordData={chords:{},scales:{}},this.moodColor="#C9A9E0",this.selectedBand=null,this.isPlaying=!1,this.activeIndex=-1,this.showTheory=!1,this.closeSwapSignal=0,this.swapIndex=null,this.activeSwapFamily="Darker",this.abPick=null,this.padHeld=null,this.gridFor=null,this.baseChords=[],this.lastPad=null,this.padVoice={},this.auditionDeg=null,this.auditionName=null,this.auditionBar=null,this.padCols=4,this.padTimer=null,this.gridTimer=null,this._mq=null,this._onMq=()=>{this.padCols=this._mq?.matches?2:4},this.handleWindowKeyDown=t=>{const e=document.activeElement;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||t.ctrlKey||t.metaKey||t.altKey)return;const i=t.key.toUpperCase(),o=gs.indexOf(i);o>=0&&this.progression?.chords?.[o]&&(t.preventDefault(),this.handlePadKey(t,o))}}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4","13sus4"]:/dim/.test(e)?["dim","dim7","dim9","m7b5","alt"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>i+s)}ladderHome(t){const i=this.getChordLadder(t).indexOf(t?t.name:"");return i>=0?i:0}getRungLabels(t){const e=t.map(s=>String(s).replace(/^[A-G][#b]?/,"")),i=e[0];let o=e.slice();return i&&e.every((s,n)=>n===0||s.indexOf(i)===0)?o=e.map((s,n)=>n?s.slice(i.length):s):i&&e.every((s,n)=>n===0||s.slice(-i.length)===i)&&(o=e.map((s,n)=>n?s.slice(0,s.length-i.length):s)),o.map(s=>(s===""?"maj":s).replace(/maj/gi,"△"))}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleWindowKeyDown),typeof window.matchMedia=="function"&&(this._mq=window.matchMedia("(max-width: 899px)"),this._mq.addEventListener?.("change",this._onMq),this._onMq())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleWindowKeyDown),this._mq?.removeEventListener?.("change",this._onMq),this.padTimer&&clearTimeout(this.padTimer),this.gridTimer&&clearTimeout(this.gridTimer)}updated(t){if(super.updated(t),t.has("closeSwapSignal")&&t.get("closeSwapSignal")!==void 0&&(this.swapIndex=null,this.abPick=null),(t.has("swapIndex")||t.has("abPick")||t.has("activeSwapFamily"))&&this.dispatchEvent(new CustomEvent("swap-state",{detail:{swapIndex:this.swapIndex,abPick:this.abPick,feel:this.activeSwapFamily},bubbles:!0,composed:!0})),t.has("progression")&&this.progression?.chords){let e=!1;const i={...this.padVoice};this.progression.chords.forEach((o,s)=>{if(o.voicing&&typeof i[`${s}`]!="number"){const n=fs(o.voicing);n>=0&&(i[`${s}`]=n,e=!0)}}),e&&(this.padVoice=i)}}handlePadDown(t,e){const i=this.progression?.chords?.[e];if(!i)return;let o="low, root position",s=2,n=null;const a=t.currentTarget;if(a){try{a.setPointerCapture(t.pointerId)}catch{}if(a.getBoundingClientRect&&typeof t.clientY=="number"){const h=a.getBoundingClientRect(),g=Math.min(.999,Math.max(0,(t.clientY-h.top)/(h.height||1)));s=g<.34?0:g<.67?1:2,o=s===0?"up an octave":s===1?"1st inversion":"low, root position";const f=this.getChordLadder(i),b=parseFloat(getComputedStyle(a).paddingLeft)||14,y=Math.min(.999,Math.max(0,(t.clientX-h.left-b)/(h.width-2*b||1)));n=Math.min(f.length-1,Math.max(0,Math.floor(y*f.length)))}}const l=88+e%3*6;clearTimeout(this.padTimer),clearTimeout(this.gridTimer),this.padHeld=e,this.gridFor=e,this.lastPad={idx:e,voicing:o,vel:l,zone:s,reach:n};const r=this.getChordLadder(i),c=n!==null&&r[n]?r[n]:i.name,d=this.progression?.key||"C",p=this.progression?.scaleType||"MAJOR",u=W(c,U(d,p));v.playChordNotes(u,.85,o,l),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:i,voicing:o,activeChordName:c},bubbles:!0,composed:!0})),this.requestUpdate()}handlePadMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords?.[e];if(!i)return;const o=t.currentTarget;if(o&&o.getBoundingClientRect&&typeof t.clientY=="number"){const s=o.getBoundingClientRect(),n=Math.min(.999,Math.max(0,(t.clientY-s.top)/(s.height||1))),a=n<.34?0:n<.67?1:2,l=a===0?"up an octave":a===1?"1st inversion":"low, root position",r=this.getChordLadder(i),c=parseFloat(getComputedStyle(o).paddingLeft)||14,d=Math.min(.999,Math.max(0,(t.clientX-s.left-c)/(s.width-2*c||1))),p=Math.min(r.length-1,Math.max(0,Math.floor(d*r.length)));if(this.lastPad?.zone!==a||this.lastPad?.reach!==p){this.lastPad={idx:e,voicing:l,vel:this.lastPad?.vel||90,zone:a,reach:p};const u=p!==null&&r[p]?r[p]:i.name,h=this.progression?.key||"C",g=this.progression?.scaleType||"MAJOR",f=W(u,U(h,g));v.playChordNotes(f,.5,l,85),this.requestUpdate()}}}handlePadUp(t,e){const i=t?.currentTarget;if(i&&t?.pointerId!==void 0)try{i.releasePointerCapture(t.pointerId)}catch{}if(this.padHeld===null)return;const o=this.padHeld,s=this.lastPad;if(this.padHeld=null,clearTimeout(this.gridTimer),this.gridTimer=setTimeout(()=>{this.padHeld===null&&(this.gridFor=null,this.requestUpdate())},600),s&&s.idx===o&&this.progression&&this.progression.chords[o]){const n=this.progression.chords[o];this.padVoice={...this.padVoice,[`${o}`]:s.zone};let a={...n,voicing:s.voicing};if(typeof s.reach=="number"){const c=this.getChordLadder(n)[s.reach];if(c){const d=this.progression.key||"C",p=this.progression.scaleType||"MAJOR",u=W(c,U(d,p));a={...a,name:c,notes:u}}}const l=[...this.progression.chords];l[o]=a,this.progression={...this.progression,chords:l},this.lastPad={...s,reach:null},v.setProgression(this.progression),this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:l},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0}))}this.requestUpdate()}handlePadKey(t,e){if(t.key==="Enter"||t.key===" "){t.preventDefault();const i=this.progression?.chords?.[e];if(!i)return;this.padHeld=e,setTimeout(()=>{this.padHeld===e&&(this.padHeld=null),this.requestUpdate()},200);const o=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR",n=i.notes&&i.notes.length>0?i.notes:W(i.name,U(o,s));v.playChordNotes(n,.85,i.voicing||"1st inversion",90),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:i},bubbles:!0,composed:!0}))}}openSwap(t){this.swapIndex===t?this.swapIndex=null:(this.swapIndex=t,this.abPick=null),this.requestUpdate()}openDetail(t){const e=this.progression?.chords?.[t];this.dispatchEvent(new CustomEvent("chord-detail-open",{detail:{index:t,chord:e},bubbles:!0,composed:!0}))}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=Do(this.chordData,this.progression),o=Bi(this.chordData,this.progression),s=i.map(c=>({name:c.name,sub:c.sub||"",tension:c.tension,rows:c.rows.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))});const n=s.filter(c=>c.name!=="Borrowed").sort((c,d)=>c.tension-d.tension),a=s.filter(c=>c.name==="Borrowed"),l=[...n,...a],r=this.selectedBand?me(this.selectedBand):null;if(r){const c=Ro(this.progression.key||"C",this.progression.scaleType||"MAJOR",r.name),d=new Map(c.map(p=>[p.chordName,p]));l.forEach(p=>{const u=p.rows.map(h=>{const g=d.get(h.name);return g?{...h,bandTag:`${r.name} move`,bandColor:r.color,sub:this.showTheory?g.theory:g.plain}:h});p.rows=u})}return l}willUpdate(t){if(t.has("progression")){const e=this.progression?.chords||[];(!this.baseChords.length||this.baseChords.length!==e.length)&&(this.baseChords=[...e])}}handleSwapAudition(t){if(this.swapIndex===null)return;const e=this.swapIndex,i=this.progression.chords[e],o=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR",n=t.chordName||t.chord?.name||i?.name||"C",a=t.notes&&t.notes.length>0?t.notes:t.chord?.notes&&t.chord.notes.length>0?t.chord.notes:W(n,U(o,s)),l=t.chord||{...i,name:n,roman:t.roman||i?.roman||"",functionLabel:t.sub||i?.functionLabel||"LIFTING",tension:t.tension??i?.tension??.3,voicing:i?.voicing||"1st inversion",notes:a};this.abPick=l;const r=[...this.progression.chords];r[e]=l,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:r},bubbles:!0,composed:!0})),v.playChordNotes(a,.85,l.voicing||"1st inversion",92),this.requestUpdate()}confirmSwap(t){const e=this.swapIndex;if(e===null)return;const i=t.detail.chord,o=[...this.progression.chords];o[e]=i,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:o},bubbles:!0,composed:!0})),this.swapIndex=null,this.abPick=null,this.requestUpdate()}updateChordCount(t){const e=this.progression.chords.length,i=Math.max(4,Math.min(8,e+t));i!==e&&this.dispatchEvent(new CustomEvent("set-chord-count",{detail:{count:i},bubbles:!0,composed:!0}))}onReroll(){this.baseChords=[],this.swapIndex=null,this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onVibeClick(){this.baseChords=[],this.swapIndex=null,this.dispatchEvent(new CustomEvent("open-vibe-picker",{bubbles:!0,composed:!0}))}render(){const t=this.progression.chords||[],e=this.selectedBand?me(this.selectedBand):null,i=this.padCols,o=this.lastPad,s=o?t[Math.min(o.idx,t.length-1)]?.name??"—":"—",n=o?`${o.voicing} · velocity ${o.vel}`:`Press a chord. Nearer the top of a card plays a higher voicing.${i===4?" Home-row keys A S D F play them too.":""}`,a=this.showTheory?Pa(this.progression.key||"C",this.progression.scaleType||"MAJOR",this.chordData,this.progression):[];return m`
      <!-- 1. Header Context Row -->
      <div class="tab-header-row">
        <button class="vibe-pill-btn" @click=${this.onVibeClick} title="Vibe, genre and mood" aria-label="Select vibe and style">
          <span class="vibe-dot" style="background: ${this.moodColor};"></span>
          <span class="vibe-summary-text">${this.progression.genre||"Pop"} · ${(this.progression.mood||"Emotional").toLowerCase()}${e?` · ${e.name}`:""}</span>
          <span style="display: none;">${this.progression.mood} ${this.progression.genre} ${this.progression.bpm} BPM</span>
          <span class="vibe-arrow">▾</span>
        </button>

        <div class="header-actions">
          <div class="chord-count-stepper">
            <button
              class="stepper-btn"
              @click=${()=>this.updateChordCount(-1)}
              ?disabled=${t.length<=4}
              aria-label="Decrease chord count"
            >−</button>
            <span class="chord-count-label">${t.length} chords</span>
            <button
              class="stepper-btn"
              @click=${()=>this.updateChordCount(1)}
              ?disabled=${t.length>=8}
              aria-label="Increase chord count"
            >+</button>
          </div>

          <button class="try-another-btn" @click=${this.onReroll} aria-label="Try another progression">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="${this.moodColor}"/>
              <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
              <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
            </svg>
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
        ${t.map((l,r)=>{const c=se(l.tension||.1),d=this.activeIndex===r&&this.isPlaying,p=this.padHeld===r,u=this.swapIndex===r,h=e?ln(l,e.name,this.progression.key||"C",this.progression.scaleType||"MAJOR"):null,g=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/i)+1)*i-1),f=this.getChordLadder(l),b=this.ladderHome(l),y=this.lastPad,x=y!==null&&y.idx===r,C=x&&y?y.zone:-1,I=x&&y&&typeof y.reach=="number"?y.reach:b,$=!!(x&&I>=0&&I!==b&&f[I]),N=this.gridFor===r&&f.length>1,L=fs(l.voicing),E=typeof this.padVoice[`${r}`]=="number"?this.padVoice[`${r}`]:L>=0?L:-1,T=p&&C>=0?C:E,R=p&&x&&y&&typeof y.reach=="number"?y.reach:T>=0?b:-1,q=Math.max(1,f.length),H=`calc((100% - 28px - ${4*(q-1)}px) / ${q})`,B=Y=>`calc(14px + ${Y} * (((100% - 28px - ${4*(q-1)}px) / ${q}) + 4px))`,O=this.getRungLabels(f),V=$?I:b,oe=p&&$?`→ ${f[I]}`:T>=0?Lr[T]:l.voicing?l.voicing.toUpperCase():"";return m`
            <div class="pad-cell-column">
              <div
                class="pad-cell ${p?"pad-held":""} ${u?"selected":""} ${d?"pad-lit":""}"
                style="background: ${c.color};"
                role="button"
                tabindex="0"
                @pointerdown=${Y=>this.handlePadDown(Y,r)}
                @pointermove=${Y=>this.handlePadMove(Y,r)}
                @pointerup=${Y=>this.handlePadUp(Y,r)}
                @pointerleave=${Y=>this.handlePadUp(Y,r)}
                @pointercancel=${Y=>this.handlePadUp(Y,r)}
                @keydown=${Y=>this.handlePadKey(Y,r)}
                aria-label="${l.name}, ${ms[l.functionLabel]||"in this loop"} — press to play; press nearer the top for a higher voicing"
              >
                <!-- 2D Voicing & Extension Grid Visualizer -->
                <div class="pad-grid-visualizer">
                  ${f.map((Y,ze)=>m`
                    <div
                      class="grid-col ${ze===R?"active-col":""} ${N?"visible":""}"
                      style="left: ${B(ze)}; width: ${H};"
                    ></div>
                  `)}
                  ${R>=0&&T>=0?m`
                    <div
                      class="grid-hit-pill"
                      style="
                        left: ${B(R)};
                        width: ${H};
                        top: calc(6px + ${T} * ((100% - 12px) / 3));
                        height: calc((100% - 12px) / 3 - 3px);
                      "
                    ></div>
                  `:""}
                </div>

                <div class="pad-top-row">
                  <div class="pad-key-badge">
                    <span class="pad-key-cap">${gs[r]||""}</span>
                  </div>
                  ${this.showTheory&&l.roman?m`<span class="pad-roman-badge">${l.roman}</span>`:""}
                </div>

                <div class="pad-bottom-info">
                  <div class="pad-role-label">${ms[l.functionLabel]||l.functionLabel}</div>
                  <div class="pad-chord-name">${l.name}</div>
                  <div class="pad-meta-label ${$?"reach-active":""}">${oe}</div>

                  <div class="rung-dots">
                    ${f.map((Y,ze)=>m`
                      <div class="rung-step-col">
                        <div
                          class="rung-step-label ${ze===V?"active":""}"
                          style="${ze===V&&$?`color: ${this.moodColor};`:""}"
                        >
                          ${O[ze]}
                        </div>
                        <div
                          class="rung-dot rung-step-bar ${ze===V?"filled active":""}"
                          style="${ze===V&&$?`background: ${this.moodColor};`:""}"
                        ></div>
                      </div>
                    `)}
                  </div>

                  ${h?m`
                    <div class="band-move-pill" style="border-left: 3px solid ${e?.color||"#2E271F"};">
                      <span>${h.name}: ${h.chord}</span>
                    </div>
                  `:""}
                </div>
              </div>

              <button
                class="pad-tray-btn pad-swap-btn ${u?"active":""}"
                @click=${Y=>{Y.stopPropagation(),this.openSwap(r)}}
                aria-label="${u?"Close":"Swap"} swaps for ${l.name}"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>
                </svg>
                <span>${u?"Close":"Swap"}</span>
              </button>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex!==null&&r===g?m`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${t[this.swapIndex]}
                .baseChord=${this.baseChords[this.swapIndex]||t[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(t.length,i)}
                .moodColor=${this.moodColor}
                .band=${e?{name:e.name,color:e.color,plain:e.plain}:null}
                @swap-feel-change=${Y=>{this.activeSwapFamily=Y.detail.feel,this.requestUpdate()}}
                @swap-audition=${Y=>this.handleSwapAudition(Y.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${()=>{this.swapIndex=null,this.requestUpdate()}}
              ></chord-swap-lane>
            `:""}
          `})}

        <div class="add-chord-row">
          <button class="add-chord-btn" @click=${()=>this.updateChordCount(1)} ?disabled=${t.length>=8} aria-label="Add a chord to the loop">
            <span class="plus">+</span>
            <span>Add chord</span>
            <span class="count">${t.length} of 8</span>
          </button>
          ${t.length>4?m`
            <button class="remove-chord-btn" @click=${()=>this.updateChordCount(-1)} aria-label="Remove the last chord">−</button>
          `:""}
        </div>
      </div>

      <!-- 4. Diatonic Scale Strip (Theory Mode) -->
      ${this.showTheory&&a.length?m`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header-row">
            <div class="scale-strip-kicker">Scale · ${(this.progression.key||"C").replace("b","♭")} ${(this.progression.scaleType||"MAJOR").toLowerCase()==="minor"?"natural minor":"major"}</div>
            <div class="scale-strip-hint">
              ${this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`}
            </div>
          </div>
          <div class="scale-degrees-grid">
            ${a.map((l,r)=>{const d=(this.progression.chords||[]).map(h=>h.name.toUpperCase()).indexOf(l.chordName.toUpperCase()),p=d>=0,u=this.auditionDeg===r;return m`
                <button
                  class="scale-degree-btn scale-degree-chip ${p?"in-loop":""} ${u?"active":""}"
                  style="${u?`background: ${this.moodColor};`:""}"
                  @click=${()=>{this.auditionDeg=r,this.auditionName=l.chordName,this.auditionBar=p?d+1:0;const h=this.progression.key||"C",g=this.progression.scaleType||"MAJOR",f=l.notes&&l.notes.length?l.notes:W(l.chordName,U(h,g));v.playChordNotes(f,.8,"1st inversion",88),this.dispatchEvent(new CustomEvent("chord-play",{detail:{chord:{name:l.chordName,notes:f},index:p?d:0},bubbles:!0,composed:!0}))}}
                  aria-label="Hear ${l.chordName}, the ${l.functionLabel.toLowerCase()}"
                >
                  <div class="degree-head-row">
                    <span class="degree-roman">${l.roman}</span>
                    ${p?m`<div class="degree-in-loop-dot"></div>`:""}
                  </div>
                  <div class="degree-name">${l.chordName}</div>
                  <div class="degree-fn">${l.functionLabel}</div>
                </button>
              `})}
          </div>
        </div>
      `:""}

      <!-- 5. Playing now (last pad pressed) -->
      <div class="now-playing-row" aria-live="polite">
        <span class="now-kicker">Playing now</span>
        <span class="now-label">${s}</span>
        <span class="now-sub">${n}</span>
      </div>
    `}};ne.styles=xe`
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
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 40px;
      padding: 0 12px 0 10px;
      border-radius: 100px;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: none;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease;
    }

    .vibe-pill-btn:hover {
      background: #FFFAF2;
    }

    .vibe-dot {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .vibe-summary-text {
      color: var(--cv-ink, #2E271F);
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .vibe-arrow {
      opacity: 0.6;
      font-size: 10px;
      color: var(--cv-ink, #2E271F);
      margin-left: -2px;
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    /* Chord Count Stepper (Matches Chroma Melody prototype) */
    .chord-count-stepper {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: none;
      padding: 0;
    }

    .stepper-btn {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink, #2E271F);
      font-size: 15px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: #FFFAF2;
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .chord-count-label {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
    }

    /* Try Another Button (Matches Chroma Melody prototype) */
    .try-another-btn {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-cream, #FBF3E6);
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
      box-shadow: none;
    }

    .try-another-btn:hover {
      background: #FFFAF2;
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
    /* 3. Chord Pads Grid */
    .pad-cells-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 899px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      /* Phones: chord count + "try another" live in the dock / under the grid (design) */
      .header-actions {
        display: none;
      }
      .tab-header-row {
        margin: -2px 0 14px;
      }
      /* Keyboard shortcut caps mean nothing on touch */
      .pad-cell .pad-key-badge {
        display: none;
      }
      .pad-cells-grid .add-chord-row {
        display: flex;
      }
    }

    /* Playing now footer (Chroma Melody: last pad pressed) */
    .now-playing-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px 10px;
      margin-top: 16px;
      padding-top: 13px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .now-kicker {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .now-label {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
    }

    .now-sub {
      flex: 1 1 140px;
      min-width: 0;
      font-size: 11.5px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
    }

    @media (min-width: 900px) {
      .now-label { font-size: 15px; }
      .now-sub { flex-basis: 200px; font-size: 12px; }
    }

    /* Add / remove chord (phones only) */
    .add-chord-row {
      display: none;
      grid-column: 1 / -1;
      gap: 7px;
      min-width: 0;
    }

    .add-chord-btn,
    .remove-chord-btn {
      border: 1.5px dashed rgba(46, 39, 31, 0.3);
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink, #2E271F);
      border-radius: 16px;
      min-height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }

    .add-chord-btn {
      flex: 1;
      min-width: 0;
      gap: 8px;
      font-size: 12.5px;
      letter-spacing: 0.2px;
    }

    .remove-chord-btn {
      flex: 0 0 52px;
      font-size: 18px;
      line-height: 1;
    }

    .add-chord-btn:hover:not(:disabled),
    .remove-chord-btn:hover:not(:disabled) {
      background: rgba(251, 243, 230, 0.6);
    }

    .add-chord-btn:active:not(:disabled),
    .remove-chord-btn:active:not(:disabled) {
      transform: scale(0.99);
    }

    .add-chord-btn:disabled,
    .remove-chord-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .add-chord-btn .plus {
      font-size: 18px;
      line-height: 1;
    }

    .add-chord-btn .count {
      font-size: 10px;
      letter-spacing: 0.4px;
      color: var(--cv-label, #8A6B3F);
    }

    /* Chord Pad Column */
    .pad-cell-column {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      width: 100%;
    }

    /* Chord Pad Card */
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
      user-select: none;
      min-height: 124px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    .pad-cell:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 28px -16px rgba(46, 39, 31, 0.55);
    }

    .pad-cell:active, .pad-cell.pad-held {
      transform: scale(0.985) !important;
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
    }

    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    .pad-cell.selected {
      box-shadow: 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    /* Top Row in Pad */
    .pad-top-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .pad-key-badge {
      display: inline-flex;
      align-items: flex-start;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 1.5px 1.5px 3.5px;
      border-radius: 5px;
      background: rgba(46, 39, 31, 0.16);
      box-shadow: 0 1px 0 rgba(46, 39, 31, 0.18);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .pad-key-badge span, .pad-key-cap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 3.5px;
      background: rgba(255, 255, 255, 0.62);
      box-shadow: inset 0 -1px 0 rgba(46, 39, 31, 0.12);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9.5px;
      font-weight: 800;
      line-height: 1;
      color: rgba(46, 39, 31, 0.62);
    }

    .pad-roman-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: rgba(46, 39, 31, 0.55);
    }

    /* Bottom Info in Pad */
    .pad-bottom-info {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: #2E271F;
      opacity: 0.9;
      line-height: 1.2;
    }

    .pad-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
    }

    .pad-notes-theory {
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }

    /* 2D Voicing & Extension Grid Visualizer */
    .pad-grid-visualizer {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .grid-col {
      position: absolute;
      top: 6px;
      bottom: 6px;
      border-radius: 10px;
      background: transparent;
      transition: background 160ms ease;
    }

    .grid-col.visible {
      background: rgba(251, 243, 230, 0.08);
    }

    .grid-col.active-col {
      background: rgba(251, 243, 230, 0.24);
    }

    .grid-hit-pill {
      position: absolute;
      border-radius: 8px;
      background: rgba(251, 243, 230, 0.62);
      box-shadow: 0 4px 12px rgba(46, 39, 31, 0.18);
      transition: top 120ms ease, left 120ms ease;
      z-index: 1;
      pointer-events: none;
    }

    .pad-meta-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: rgba(46, 39, 31, 0.5);
      height: 12px;
      white-space: nowrap;
      margin-top: 2px;
      transition: color 140ms ease;
    }

    .pad-meta-label.reach-active {
      color: #2E271F;
      font-weight: 800;
    }

    /* Rung Dots & Extension Ladder */
    .rung-dots {
      display: flex;
      gap: 4px;
      margin-top: 7px;
      width: 100%;
    }

    .rung-step-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }

    .rung-step-label {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: rgba(46, 39, 31, 0.3);
      transition: color 180ms ease;
    }

    .rung-step-label.active {
      color: rgba(46, 39, 31, 0.78);
    }

    .rung-step-bar, .rung-dot {
      width: 100%;
      height: 4px;
      border-radius: 3px;
      background: rgba(46, 39, 31, 0.16);
      transition: width 200ms cubic-bezier(0.23, 1, 0.32, 1), background 180ms ease;
    }

    .rung-step-bar.active, .rung-dot.filled {
      background: rgba(46, 39, 31, 0.5);
    }

    .band-move-pill {
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      min-height: 26px;
      padding: 0 10px;
      border-radius: 100px;
      background: rgba(251, 243, 230, 0.85);
      color: #2E271F;
      font-size: 10.5px;
      font-weight: 800;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.1);
    }

    /* Swap Button beneath pad card */
    .pad-tray-btn {
      border: none;
      font-family: inherit;
      width: 100%;
      min-height: 34px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 120ms ease, transform 120ms ease;
      background: rgba(46, 39, 31, 0.05);
      color: #4A3F33;
      user-select: none;
    }

    .pad-tray-btn:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .pad-tray-btn:active {
      transform: scale(0.98);
    }

    .pad-tray-btn.active {
      background: #2E271F;
      color: #FBF3E6;
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

    /* 4. Diatonic Scale Strip (Theory Mode) */
    .scale-diatonic-strip {
      position: relative;
      z-index: 2;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 20px;
      padding: 13px 15px 15px;
      margin-top: 18px;
      flex-shrink: 0;
    }

    .scale-strip-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .scale-strip-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .scale-strip-hint {
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
    }

    .scale-degrees-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
      gap: 6px;
      margin-top: 10px;
      min-width: 0;
    }

    .scale-degree-btn {
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      min-width: 0;
      min-height: 46px;
      padding: 7px 10px 8px;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.13);
      transition: background 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1), transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .scale-degree-btn:hover {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .scale-degree-btn:active {
      transform: scale(0.97);
    }

    .scale-degree-btn.in-loop {
      background: var(--cv-surface-2, #F1E4CC);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }

    .scale-degree-btn.active {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .degree-head-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .degree-roman {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      color: var(--cv-label, #8A6B3F);
    }

    .degree-in-loop-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.42);
      flex-shrink: 0;
    }

    .degree-name {
      font-size: 14.5px;
      font-weight: 800;
      letter-spacing: -0.015em;
      line-height: 1.1;
      color: var(--cv-ink, #2E271F);
    }

    @media (max-width: 899px) {
      /* Phones: two columns so "Subdominant" / "Leading tone" fit whole at a readable size */
      .scale-degrees-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .degree-fn {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      margin-top: 1px;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;le([k({type:Object})],ne.prototype,"progression",2);le([k({type:Object})],ne.prototype,"chordData",2);le([k({type:String})],ne.prototype,"moodColor",2);le([k({type:String})],ne.prototype,"selectedBand",2);le([k({type:Boolean})],ne.prototype,"isPlaying",2);le([k({type:Number})],ne.prototype,"activeIndex",2);le([k({type:Boolean})],ne.prototype,"showTheory",2);le([k({type:Number})],ne.prototype,"closeSwapSignal",2);le([w()],ne.prototype,"swapIndex",2);le([w()],ne.prototype,"activeSwapFamily",2);le([w()],ne.prototype,"abPick",2);le([w()],ne.prototype,"padHeld",2);le([w()],ne.prototype,"gridFor",2);le([w()],ne.prototype,"baseChords",2);le([w()],ne.prototype,"lastPad",2);le([w()],ne.prototype,"padVoice",2);le([w()],ne.prototype,"auditionDeg",2);le([w()],ne.prototype,"auditionName",2);le([w()],ne.prototype,"auditionBar",2);le([w()],ne.prototype,"padCols",2);ne=le([ke("tab-chords")],ne);var jr=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,J=(t,e,i,o)=>{for(var s=o>1?void 0:o?zr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&jr(e,i,s),s};const bs={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},So=[{name:"C",pc:0,left:12},{name:"D",pc:2,left:53},{name:"E",pc:4,left:94},{name:"F",pc:5,left:135},{name:"G",pc:7,left:176},{name:"A",pc:9,left:217},{name:"B",pc:11,left:258}],vs=[{name:"C#",pc:1,left:38},{name:"D#",pc:3,left:79},{name:"F#",pc:6,left:161},{name:"G#",pc:8,left:202},{name:"A#",pc:10,left:243}];let G=class extends we{constructor(){super(),this.progression=null,this.melodyTrack=null,this.activeStepIndex=null,this.guideMode="scale-key",this.contour="Arch",this.density=50,this.melodyStyle="auto",this.bandId=null,this.bandOn=!0,this.octave=4,this.playing=!1,this.backingEnabled=!0,this.isMobile=!1,this.showTheory=!1,this.melodyLoop="Section",this.melodySound="Stage Rhodes",this.span=[0,16],this.isDraggingTail=!1,this.selectedGlobalStep=null,this.bloomOctave=4,this.hoverPitchClass=null,this.popoverPos={left:12,top:80,isAbove:!1,stemL:154,stemT:75},this.strictBy="scale",this.styleOpen=!1,this.dragStartStep=null,this.mobile=!1,this.mview="overview",this.mpage=0,this.spanEdit=!1,this.spanA=null,this.removedNote=null,this._removedTimer=null,this._mq=null,this._onMq=()=>this.syncMobile(),this._didDrag=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.selectedGlobalStep!==null&&this.closeBloom()},this.onToggleBacking=()=>{this.backingEnabled=!this.backingEnabled,this.dispatchEvent(new CustomEvent("toggle-backing",{detail:{backingEnabled:this.backingEnabled},bubbles:!0,composed:!0})),this.requestUpdate()},this.onRerollMelody=()=>{this.generateFromSettings()},this.onClearMelody=()=>{if(!this.progression&&!this.melodyTrack)return;const t=ve.createEmptyTrack(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode});this.melodyTrack=t,this.requestUpdate(),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:"Cleared melody notes",bubbles:!0,composed:!0}))},this.onBloomWheel=t=>{t.stopPropagation(),Math.abs(t.deltaY)>40&&(t.deltaY<0&&this.bloomOctave<7?this.bloomOctave+=1:t.deltaY>0&&this.bloomOctave>2&&(this.bloomOctave-=1))},this._boundPointerMove=this.onTailPointerMove.bind(this),this._boundPointerUp=this.onTailPointerUp.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown),typeof window.matchMedia=="function"&&(this._mq=window.matchMedia("(max-width: 899px)"),this._mq.addEventListener?.("change",this._onMq));try{const t=localStorage.getItem("chroma-melody-mview");(t==="focus"||t==="overview")&&(this.mview=t)}catch{}this.syncMobile()}syncMobile(){this.mobile=this.isMobile||!!this._mq?.matches}disconnectedCallback(){super.disconnectedCallback(),this._mq?.removeEventListener?.("change",this._onMq),this._removedTimer&&clearTimeout(this._removedTimer),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("pointermove",this._boundPointerMove),window.removeEventListener("pointerup",this._boundPointerUp),window.removeEventListener("pointercancel",this._boundPointerUp),document.body.style.cursor=""}updated(t){t.has("isMobile")&&this.syncMobile(),this.mobile&&t.has("melodyLoop")&&this.melodyLoop==="Span"&&t.get("melodyLoop")!==void 0&&t.get("melodyLoop")!=="Span"&&(this.spanEdit=!0,this.spanA=null),this.melodyLoop!=="Span"&&this.spanEdit&&(this.spanEdit=!1,this.spanA=null)}willUpdate(t){t.has("progression")&&this.progression&&(this.melodyTrack||(this.melodyTrack=ve.createEmptyTrack(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode})))}generateDefaultMelody(){if(!this.progression)return;const t=ve.generateMelody(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode,strictBy:this.strictBy});this.melodyTrack=t,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0}))}onSetStrictBy(t){this.strictBy=t,this.requestUpdate()}onSetGuideMode(t){if(this.guideMode=t,this.melodyTrack&&this.progression){const e={...this.melodyTrack,guideMode:t};this.melodyTrack=e,this.dispatchEvent(new CustomEvent("guide-mode-change",{detail:{mode:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:e},bubbles:!0,composed:!0}))}}bandWithMove(){const t=this.bandId?me(this.bandId):void 0;return t&&Ri[t.id]?t:void 0}activeBandId(){return this.bandOn?this.bandWithMove()?.id:void 0}generateFromSettings(){if(!this.progression)return;const t=Pi.map(a=>a.id);let e;const i=this.melodyStyle==="auto"?cr(this.activeBandId()):void 0;if(i)e=i;else if(this.melodyStyle==="auto"){const a=t.indexOf(this.contour);e=t[(a+1+Math.floor(Math.random()*(t.length-1)))%t.length]}else e=this.melodyStyle;this.contour=e;const o=this.activeBandId(),s=ve.generateMelody(this.progression,{contour:e,density:this.density,octave:this.octave,guideMode:this.guideMode,strictBy:this.strictBy,bandId:o,seed:Math.floor(Math.random()*1e5)+1});this.melodyTrack=s,this.requestUpdate(),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:s},bubbles:!0,composed:!0}));const n=o?me(o)?.name:"";this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${ps(e)} melody${n?` · ${n}`:""}`,bubbles:!0,composed:!0}))}emitStyleChange(){this.dispatchEvent(new CustomEvent("melody-style-change",{detail:{style:this.melodyStyle,density:this.density,bandOn:this.bandOn},bubbles:!0,composed:!0}))}onPickStyle(t){this.melodyStyle=t,this.emitStyleChange(),this.generateFromSettings()}onPickDensity(t){this.density=t,this.emitStyleChange(),this.generateFromSettings()}onToggleBand(t){this.bandOn=t,this.emitStyleChange(),this.generateFromSettings()}densityLabel(){return xo.reduce((e,i)=>Math.abs(i.value-this.density)<Math.abs(e.value-this.density)?i:e).label}styleSummary(){return this.melodyStyle==="auto"?"Auto":ps(this.melodyStyle)}renderStylePanel(){const t=this.bandWithMove(),e=t?Ko(t.id):void 0,i=!t&&this.bandId?me(this.bandId)?.name||this.bandId:void 0,o=xo.reduce((s,n)=>Math.abs(n.value-this.density)<Math.abs(s.value-this.density)?n:s);return m`
      <div class="style-backdrop" @click=${()=>{this.styleOpen=!1}}></div>
      <div class="style-panel" role="dialog" aria-label="Melody style" @click=${s=>s.stopPropagation()}>
        <div class="style-kicker">Shape</div>
        <div class="style-grid">
          <button class="style-card auto ${this.melodyStyle==="auto"?"active":""}" @click=${()=>this.onPickStyle("auto")} aria-pressed=${this.melodyStyle==="auto"}>
            <span class="style-name">Surprise me</span>
            <span class="style-blurb">A different shape each time</span>
          </button>
          ${Pi.map(s=>m`
            <button class="style-card ${this.melodyStyle===s.id?"active":""}" data-style=${s.id} @click=${()=>this.onPickStyle(s.id)} aria-pressed=${this.melodyStyle===s.id}>
              <span class="style-name">${s.name}</span>
              <span class="style-blurb">${s.blurb}</span>
            </button>
          `)}
        </div>

        <div class="style-kicker">How busy</div>
        <div class="segmented-control" role="radiogroup" aria-label="How busy the melody is" style="width: 100%;">
          ${xo.map(s=>m`
            <button class="segment-btn ${o.value===s.value?"active":""}" style="flex: 1;" role="radio" aria-checked=${o.value===s.value} @click=${()=>this.onPickDensity(s.value)}>${s.label}</button>
          `)}
        </div>

        ${t?m`
          <div class="style-kicker">In the style of</div>
          <div class="band-follow">
            <span class="band-follow-swatch" style="background: ${t.color};"></span>
            <span class="band-follow-text">
              <span class="band-follow-name">${t.name}</span>
              <span class="band-follow-move">${Ri[t.id]}, on the first and last bar</span>
            </span>
            <span class="segmented-control" role="radiogroup" aria-label="Follow the band's melody style">
              <button class="segment-btn ${this.bandOn?"active":""}" role="radio" aria-checked=${this.bandOn} @click=${()=>this.onToggleBand(!0)}>On</button>
              <button class="segment-btn ${this.bandOn?"":"active"}" role="radio" aria-checked=${!this.bandOn} @click=${()=>this.onToggleBand(!1)}>Off</button>
            </span>
          </div>
          ${this.bandOn&&e?m`
            <ul class="band-how" aria-label="How ${t.name} writes a melody">
              ${e.how.map(s=>m`<li>${s}</li>`)}
            </ul>
            <div class="band-songs">Based on ${e.songs.join(", ")}</div>
          `:ue}
        `:m`
          <div class="style-footnote">${i?`${i} doesn't have a melodic signature yet, so the melody follows the shape and busyness above.`:"Pick a band in the vibe panel to have the melody borrow its signature move."}</div>
        `}

        <button class="style-clear clear-melody-btn" @click=${()=>{this.styleOpen=!1,this.onClearMelody()}}>Clear all notes</button>
      </div>
    `}getHarmonicClass(t,e){if(t.isClash)return"out";const i=t.chordToneRole;if(i==="root"||i==="3rd"||i==="5th"||i==="7th")return"chord";if(i==="tension"||i==="passing")return"scale";if(i==="chromatic")return"out";if(this.progression){const o=yt(t.midi,e,this.progression.key,this.progression.scaleType);return o.isClash||o.role==="chromatic"?"out":o.role==="root"||o.role==="3rd"||o.role==="5th"||o.role==="7th"?"chord":"scale"}return"chord"}getStepCoverMap(t){const e=new Map;if(!this.melodyTrack?.notes)return e;for(const i of this.melodyTrack.notes){const o=i.barIndex*16+i.stepInBar,s=Math.max(1,Math.round((i.durationBeats||.25)*4)),n=(i.barIndex+1)*16,a=Math.min(s,n-o),l=t[i.barIndex]||t[0],r=this.getHarmonicClass(i,l);for(let c=0;c<a;c++){const d=o+c;e.set(d,{note:i,isStart:c===0,isEnd:c===a-1,lengthInSteps:a,harmonicClass:r})}}return e}onStartLen(t,e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.isDraggingTail=!0,this.dragStartStep=t,this._didDrag=!1,this.closeBloom(),document.body.style.cursor="grabbing",window.addEventListener("pointermove",this._boundPointerMove),window.addEventListener("pointerup",this._boundPointerUp),window.addEventListener("pointercancel",this._boundPointerUp),this.onTailPointerMove(e))}onTailPointerMove(t){if(!this.isDraggingTail||this.dragStartStep===null||!this.melodyTrack)return;const e=this.dragStartStep,i=Math.floor(e/16),o=e%16,s=this.melodyTrack.notes.find(b=>b.barIndex===i&&b.stepInBar===o);if(!s)return;const n=16,a=this.melodyTrack.notes.filter(b=>b.barIndex===i&&b.stepInBar>o),r=(a.length>0?Math.min(...a.map(b=>b.stepInBar)):n)-o;let c=null,d=null;const p=this.shadowRoot;p&&typeof p.elementFromPoint=="function"?d=p.elementFromPoint(t.clientX,t.clientY):typeof document.elementFromPoint=="function"&&(d=document.elementFromPoint(t.clientX,t.clientY));const u=d?.closest(".step-cell");if(u&&u.dataset.step!==void 0){const b=parseInt(u.dataset.step,10);Math.floor(b/16)===i&&(c=b%16)}if(c===null){const b=this.shadowRoot?.querySelector(`.chord-lane[data-bar="${i}"] .steps-16-grid`);if(b){const y=b.getBoundingClientRect();if(y.width>0){const x=t.clientX-y.left,C=y.width/16;c=Math.floor(x/C),c=Math.max(0,Math.min(15,c))}}}if(c===null)return;const h=Math.max(1,Math.min(r,c-o+1)),g=h*.25,f=Math.max(1,Math.round((s.durationBeats||.25)*4));if(h!==f){this._didDrag=!0;const b=this.melodyTrack.notes.map(y=>y.id===s.id?{...y,durationBeats:g}:y);this.melodyTrack={...this.melodyTrack,notes:b},this.requestUpdate(),et(s.pitch,.15)}}onTailPointerUp(t){this.isDraggingTail&&(this.isDraggingTail=!1,this.dragStartStep=null,document.body.style.cursor="",window.removeEventListener("pointermove",this._boundPointerMove),window.removeEventListener("pointerup",this._boundPointerUp),window.removeEventListener("pointercancel",this._boundPointerUp),this._didDrag&&setTimeout(()=>{this._didDrag=!1},80),this.melodyTrack&&this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:this.melodyTrack},bubbles:!0,composed:!0})))}getLoopRange(){if(this.melodyLoop==="Chord"){const t=this.selectedGlobalStep??0,e=Math.floor(t/16)*16;return[e,e+16]}return this.melodyLoop==="Span"?this.span&&this.span[1]>this.span[0]?this.span:[0,16]:[0,(this.progression?.chords.length||4)*16]}onStepClick(t,e){if(this._didDrag)return;if(e&&e.shiftKey){const u=this.selectedGlobalStep!==null?this.selectedGlobalStep:0,h=Math.min(u,t),g=Math.max(u,t)+1;this.span=[h,g],this.melodyLoop="Span",this.dispatchEvent(new CustomEvent("span-change",{detail:{span:this.span},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-loop-change",{detail:{melodyLoop:"Span",loop:"Span"},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Loop span: steps ${h+1}–${g}`,bubbles:!0,composed:!0})),this.requestUpdate();return}const i=this.progression?.chords||[],s=this.getStepCoverMap(i).get(t);if(s&&!s.isStart)return;const n=this.shadowRoot?.querySelector(".melody-grid-stage"),a=this.shadowRoot?.querySelector(`.step-cell[data-step="${t}"]`),l=Math.floor(t/16),r=t%16,c=308,d=144;if(n&&a){const u=n.getBoundingClientRect(),h=a.getBoundingClientRect(),g=h.left-u.left+h.width/2+12,f=h.top-u.top+h.height/2+12,b=u.width+24;u.height+24;const y=l>=2,x=y?Math.max(4,f-22-d):f+22,C=Math.max(8,Math.min(b-c-8,g-c/2)),I=g-6,$=y?x+d-7:x-5;this.popoverPos={left:C,top:x,isAbove:y,stemL:I,stemT:$}}else{const u=l>=2,h=u?Math.max(8,l*74-150):l*74+70,g=Math.max(8,Math.min(600,140+r*36-154)),f=g+154;this.popoverPos={left:g,top:h,isAbove:u,stemL:f-6,stemT:u?h+d-7:h-5}}this.hoverPitchClass=null;const p=this.getNoteAtStep(t);if(p){this.selectedGlobalStep=p.barIndex*16+p.stepInBar;const u=p.midi;this.bloomOctave=Math.floor(u/12)-1,et(p.pitch,.4)}else this.selectedGlobalStep=t,this.bloomOctave=this.octave}closeBloom(){this.selectedGlobalStep=null,this.hoverPitchClass=null}getNoteAtStep(t){if(!this.melodyTrack)return;const e=Math.floor(t/16),i=t%16,o=this.melodyTrack.notes.find(s=>s.barIndex===e&&s.stepInBar===i);return o||this.melodyTrack.notes.find(s=>{const n=s.barIndex*16+s.stepInBar,a=Math.max(1,Math.round((s.durationBeats||.25)*4));return t>=n&&t<n+a})}onSelectPitch(t){this.selectedGlobalStep!==null&&this.placeNote(this.selectedGlobalStep,t,this.bloomOctave)&&this.closeBloom()}placeNote(t,e,i){if(!this.progression)return!1;const o=Math.floor(t/16),s=t%16,n=this.progression.chords[o]||this.progression.chords[0],a=`${e}${i}`,l=pe(a);if(this.guideMode==="strict-chord"){const x=Ye(n,this.progression.key,this.progression.scaleType),C=l%12;if(!(this.strictBy==="chord"?x.chordTonePcs:x.scalePcs.filter($=>!x.avoidPcs.includes($))).includes(C))return this.dispatchEvent(new CustomEvent("toast",{detail:`Strict ${this.strictBy} mode: pick an allowed tone`,bubbles:!0,composed:!0})),!1}const r=yt(l,n,this.progression.key,this.progression.scaleType);et(a,.4,void 0,.85,this.melodySound);const c=(this.melodyTrack?.notes||[]).filter(x=>!(x.barIndex===o&&x.stepInBar===s)),d=(this.melodyTrack?.notes||[]).find(x=>x.barIndex===o&&x.stepInBar===s),p=c.filter(x=>x.barIndex===o&&x.stepInBar>s),h=(p.length>0?Math.min(...p.map(x=>x.stepInBar)):16)-s,g=d?Math.max(1,Math.round((d.durationBeats||.25)*4)):2,f=Math.max(1,Math.min(g,h)),b={id:`m-note-${o}-${s}-${Date.now()}`,barIndex:o,stepInBar:s,beatOffset:o*4+s/4,durationBeats:f*.25,pitch:a,midi:l,velocity:100,chordToneRole:r.role,isClash:r.isClash},y={...this.melodyTrack,notes:[...c,b].sort((x,C)=>x.beatOffset-C.beatOffset)};return this.melodyTrack=y,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:y},bubbles:!0,composed:!0})),!0}onClearCurrentNote(){if(this.selectedGlobalStep===null||!this.melodyTrack)return;const t=this.getNoteAtStep(this.selectedGlobalStep);if(!t)return;const e=this.melodyTrack.notes.filter(o=>o.id!==t.id),i={...this.melodyTrack,notes:e};this.melodyTrack=i,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:i},bubbles:!0,composed:!0})),this.closeBloom()}onPrevStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep-1+64)%64)}onNextStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep+1)%64)}onOctaveDown(){this.bloomOctave>2&&(this.bloomOctave-=1)}onOctaveUp(){this.bloomOctave<7&&(this.bloomOctave+=1)}getRoleString(t,e){const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},o=e.name.match(/^[A-G][b#]?/)?.[0]||"C",s=i[o]??0,n=(t-s+12)%12,a={0:"root",1:"♭9",2:"9",3:"♭3",4:"3",5:"11",6:"♯11",7:"5",8:"♭13",9:"13",10:"♭7",11:"maj7"},l=Ye(e,this.progression?.key||"C",this.progression?.scaleType||"MAJOR");return l.chordTonePcs.includes(t)?`${a[n]||n} of ${o}`:l.tensionPcs.includes(t)||l.scalePcs.includes(t)?"passing":"chromatic"}render(){if(this.mobile)return this.renderMobile();const t=this.progression?.chords||[],e=Lt(this.progression?.mood||"Warm"),i=this.melodyTrack?.notes.length||0,o=this.playing&&this.activeStepIndex!==null?this.activeStepIndex%16:null;return m`
      <div class="melody-container" style="--mood-color: ${e};">
        <!-- Panel Header -->
        <div class="panel-header-row">
          <div class="header-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${i} notes</span>

            <button class="try-another-btn quick-chip random-melody-btn" @click=${this.onRerollMelody} aria-label="Randomize melody">
              <svg width="15" height="15" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/>
                <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
                <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
              </svg>
              <span>${i===0?"Randomize":"Try another"}</span>
            </button>
            <button class="style-pill ${this.styleOpen?"open":""}" @click=${()=>{this.styleOpen=!this.styleOpen}} aria-expanded=${this.styleOpen} aria-label="Melody style">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
              <span class="style-pill-value">${this.styleSummary()}</span>
              <span class="style-pill-caret">\u25BE</span>
            </button>
            <button class="clear-text-btn clear-melody-btn" @click=${this.onClearMelody} aria-label="Clear melody" title="Clear all notes">
              Clear
            </button>
          </div>

          <div class="quick-actions-bar">
            ${this.guideMode==="strict-chord"?m`
              <div class="segmented-control" role="radiogroup" aria-label="Strict filter by">
                <button
                  class="segment-btn ${this.strictBy==="scale"?"active":""}"
                  @click=${()=>this.onSetStrictBy("scale")}
                  role="radio"
                  aria-checked="${this.strictBy==="scale"}"
                >
                  Scale
                </button>
                <button
                  class="segment-btn ${this.strictBy==="chord"?"active":""}"
                  @click=${()=>this.onSetStrictBy("chord")}
                  role="radio"
                  aria-checked="${this.strictBy==="chord"}"
                >
                  Chord
                </button>
              </div>
            `:""}

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

        <!-- Horizontal Chord-Lane Sequencer Stage (Matches MelodyGrid.dc.html & Image 1) -->
        <div class="melody-grid-stage ${this.selectedGlobalStep!==null?"has-active-bloom":""}">
          <div class="melody-grid-inner">
            <!-- Step numbers header 1..16 (Unpadded per Image 1 benchmark) -->
            <div class="step-numbers-header">
              <div class="lane-spacer"></div>
              <div class="step-numbers-track">
                ${Array.from({length:16},(s,n)=>m`
                  <span class="step-num-col ${o===n?"active":""}">
                    ${n+1}
                  </span>
                `)}
              </div>
            </div>

            <!-- 4-Bar Chord Lanes (bar-column for test & layout) -->
            <div class="bars-grid">
              ${(()=>{const s=this.getStepCoverMap(t);return t.map((n,a)=>{const l=this.playing&&this.activeStepIndex!==null&&Math.floor(this.activeStepIndex/16)===a,c=se(n.tension??.1).color;return m`
                    <div
                      class="chord-lane bar-column ${l?"playing-bar":""}"
                      data-bar="${a}"
                      style="--chord-bg: ${c};"
                    >
                      <!-- Chord Badge on Left -->
                      <div class="lane-chord-badge">
                        <span class="bar-role">${bs[n.functionLabel]||n.functionLabel}</span>
                        <div class="bar-chord-info">
                          <span class="bar-chord-name">${n.name}</span>
                          <span class="bar-chord-roman">${n.roman||""}</span>
                        </div>
                      </div>

                      <!-- 16 Steps Row Across the Lane (Clean ties, no vertical divider pipes) -->
                      <div class="steps-16-grid">
                        ${Array.from({length:16},(d,p)=>{const u=a*16+p,h=s.get(u),g=this.playing&&this.activeStepIndex===u,f=this.selectedGlobalStep===u,b=!!(h&&!h.isStart),y=!!(h&&h.isStart),x=!!(h&&h.isEnd),C=h?h.note.barIndex*16+h.note.stepInBar:u,[I,$]=this.getLoopRange(),N=this.melodyLoop!=="Section"&&u>=I&&u<$,L=N&&u===I,E=N&&u===$-1;return m`
                            <div
                              class="step-cell ${h?"has-note":""} ${b?"is-tail-step":""} ${y?"is-note-start":""} ${x?"is-note-end":""} ${g?"active-step":""} ${f?"is-bloomed":""}"
                              data-step="${u}"
                              @click=${T=>this.onStepClick(u,T)}
                              @pointerdown=${T=>{b&&this.onStartLen(C,T)}}
                              aria-label="Bar ${a+1}, Step ${p+1}: ${h?`${h.note.pitch} (${h.lengthInSteps} steps)`:"empty"}"
                            >
                              <span class="step-number">${String(p+1).padStart(2,"0")}</span>
                              ${h?y?m`
                                ${h.lengthInSteps>1?m`<span class="tie-bar tie-start"></span>`:""}
                                <div class="note-pad">
                                  <span class="note-badge">${h.note.pitch.replace(/\d+$/,"")}</span>
                                </div>
                                ${x?m`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${T=>this.onStartLen(C,T)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                `:""}
                              `:m`
                                <span class="tie-bar ${x?"tie-end":"tie-mid"}"></span>
                                <div class="note-pad tied-step"></div>
                                ${x?m`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${T=>this.onStartLen(C,T)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                `:""}
                              `:m`
                                <span class="empty-dot ${f?"bloomed-empty-ring":""}"></span>
                              `}
                              ${N?m`
                                <div
                                  class="loop-span-bar ${L?"span-start":""} ${E?"span-end":""}"
                                  style="--span-accent: #9B7CA8;"
                                ></div>
                              `:""}
                            </div>
                          `})}
                      </div>
                    </div>
                  `})})()}
            </div>
          </div>

          <!-- Note Blooming Micro-Keyboard Popover (Anchored inside grid stage) -->
          ${this.selectedGlobalStep!==null?this.renderBloomPopover(e):""}
        </div>
        ${this.styleOpen?this.renderStylePanel():""}
      </div>
    `}get msel(){return this.selectedGlobalStep??0}setMView(t,e){this.mview=t,e!==void 0?this.mpage=e:t==="focus"&&(this.mpage=Math.min(Math.floor(this.msel/16),Math.max(0,(this.progression?.chords.length||1)-1)));try{localStorage.setItem("chroma-melody-mview",t)}catch{}}mFocusRow(t){this.setMView("focus",t),Math.floor(this.msel/16)!==t&&(this.selectedGlobalStep=t*16)}noteStartOf(t){return this.getNoteAtStep(t)}mTap(t){if(this._didDrag)return;if(this.spanEdit){this.mSpanTap(t);return}const e=this.noteStartOf(t),i=e?e.barIndex*16+e.stepInBar:t;if(e&&this.msel===i){this.mRemove(e);return}this.selectedGlobalStep=i,this.bloomOctave=e?Math.floor(e.midi/12)-1:this.bloomOctave,e&&et(e.pitch,.4,void 0,.85,this.melodySound)}mRemove(t){if(!this.melodyTrack)return;const e={...this.melodyTrack,notes:this.melodyTrack.notes.filter(i=>i.id!==t.id)};this.melodyTrack=e,this.removedNote=t,this._removedTimer&&clearTimeout(this._removedTimer),this._removedTimer=setTimeout(()=>{this.removedNote=null},4e3),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:e},bubbles:!0,composed:!0}))}mUndoRemove(){const t=this.removedNote;if(!t||!this.melodyTrack)return;if(!this.melodyTrack.notes.some(i=>i.barIndex===t.barIndex&&i.stepInBar===t.stepInBar)){const i={...this.melodyTrack,notes:[...this.melodyTrack.notes,t].sort((o,s)=>o.beatOffset-s.beatOffset)};this.melodyTrack=i,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:i},bubbles:!0,composed:!0}))}this.removedNote=null,this._removedTimer&&clearTimeout(this._removedTimer)}mSpanTap(t){if(this.spanA===null){this.spanA=t;return}const e=Math.min(this.spanA,t),i=Math.max(this.spanA,t)+1;this.span=[e,i],this.spanEdit=!1,this.spanA=null,this.dispatchEvent(new CustomEvent("span-change",{detail:{span:this.span},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-loop-change",{detail:{melodyLoop:"Span",loop:"Span"},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Loop span: steps ${e+1}–${i}`,bubbles:!0,composed:!0}))}mSpanChip(){this.spanEdit?(this.spanEdit=!1,this.spanA=null):(this.spanEdit=!0,this.spanA=null)}mPlace(t){const e=this.getNoteAtStep(this.msel),i=e?e.barIndex*16+e.stepInBar:this.msel,o=e?Math.floor(e.midi/12)-1:this.bloomOctave;this.placeNote(i,t,o),this.selectedGlobalStep=i}mSetOctave(t){t=Math.max(2,Math.min(7,t));const e=this.getNoteAtStep(this.msel);if(this.bloomOctave=t,e){const i=e.pitch.replace(/\d+$/,""),o=e.barIndex*16+e.stepInBar;this.placeNote(o,i,t),this.selectedGlobalStep=o}}mLen(t){const e=this.getNoteAtStep(this.msel);if(!e||!this.melodyTrack)return;const i=e.stepInBar,o=this.melodyTrack.notes.filter(r=>r.barIndex===e.barIndex&&r.stepInBar>i),s=(o.length?Math.min(...o.map(r=>r.stepInBar)):16)-i,n=Math.max(1,Math.round((e.durationBeats||.25)*4)),a=Math.max(1,Math.min(s,n+t));if(a===n)return;const l={...this.melodyTrack,notes:this.melodyTrack.notes.map(r=>r.id===e.id?{...r,durationBeats:a*.25}:r)};this.melodyTrack=l,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:l},bubbles:!0,composed:!0}))}mClear(){const t=this.getNoteAtStep(this.msel);t&&this.mRemove(t)}pcDisabled(t,e,i){return this.guideMode==="strict-chord"&&!e.includes(t)&&(this.strictBy==="chord"||!i.includes(t))}renderMobileCell(t,e,i,o){const s=e.get(t),n=this.playing&&this.activeStepIndex===t,a=this.msel===t||!!s&&this.msel===s.note.barIndex*16+s.note.stepInBar&&s.isStart,[l,r]=this.getLoopRange(),c=this.melodyLoop!=="Section"&&t>=l&&t<r,d=this.spanEdit&&this.spanA===t,p=i?50:28,h=!!s&&!s.isStart?s.isEnd?Math.round(p*.42):0:p,g=s?s.note.barIndex*16+s.note.stepInBar:t,f=s?.isStart?s.note.pitch.replace(/\d+$/,""):"",b=["m-dot",s?s.isStart?"note":"tail":"empty",n?"playhead":"",a&&!this.spanEdit||d?"selected":""].join(" ");return m`
      <div
        class="step-cell m-cell"
        data-step=${t}
        @click=${()=>this.mTap(t)}
        @pointerdown=${y=>{!this.spanEdit&&s&&s.isEnd&&this.onStartLen(g,y)}}
        aria-label="Step ${t%16+1}: ${s?s.note.pitch:"empty"}"
      >
        ${c?m`<div class="m-span" style="left:${t===l?"8px":"0"};right:${t===r-1?"8px":"0"};${this.spanEdit&&this.spanA!==null?"height:7px;":""}"></div>`:""}
        ${s&&s.lengthInSteps>1?m`<div class="m-tie" style="left:${s.isStart?"50%":"0"};right:${s.isEnd?"50%":"0"};"></div>`:""}
        <div class="${b}" style="--dot:${h}px;${h===0?"display:none;":""}">${f}</div>
        ${o!==void 0?m`<span class="m-step-no">${o}</span>`:""}
      </div>
    `}renderMobileDock(){const t=this.progression?.chords||[];if(!this.progression||!t.length)return m`<div class="m-dock"></div>`;const e=this.msel,i=Math.min(Math.floor(e/16),t.length-1),o=t[i],s=se(o.tension??.1).color,n=`color-mix(in srgb, ${s} 78%, #2E271F)`,a=Ye(o,this.progression.key,this.progression.scaleType),l=this.getNoteAtStep(e),r=l?l.midi%12:null,c=l?Math.floor(l.midi/12)-1:this.bloomOctave,d=l?Math.max(1,Math.round((l.durationBeats||.25)*4)):0,p=l?l.pitch:"—",u=l?this.getRoleString(l.midi%12,o):`step ${e%16+1}`;return m`
      <div class="m-dock" data-testid="melody-note-dock">
        <div class="m-dock-bar">
          <button class="m-dock-nav oct-down" ?disabled=${c<=2} @click=${()=>this.mSetOctave(c-1)} aria-label="Lower octave">‹ ${c-1}</button>
          <div class="m-dock-note">
            <span class="pitch">${p}</span>
            <span class="role">${u} · ${o.name}</span>
          </div>
          ${l?m`
            <div class="m-len">
              <button @click=${()=>this.mLen(-1)} aria-label="Shorter">−</button>
              <span title="length in steps">↔${d}</span>
              <button @click=${()=>this.mLen(1)} aria-label="Longer">+</button>
            </div>
            <button class="m-dock-clear" @click=${()=>this.mClear()} aria-label="Clear note">clear</button>
          `:""}
          <button class="m-dock-nav oct-up" ?disabled=${c>=7} @click=${()=>this.mSetOctave(c+1)} aria-label="Higher octave">${c+1} ›</button>
        </div>
        <div class="m-keys">
          ${So.map((h,g)=>{const f=this.pcDisabled(h.pc,a.chordTonePcs,a.scalePcs),b=a.chordTonePcs.includes(h.pc);return m`
              <button
                class="m-wk"
                ?disabled=${f}
                style="left:${g*100/7}%;width:calc(${100/7}% - 3px);${b&&!f?`background:${s};`:""}"
                @click=${()=>this.mPlace(h.name)}
                aria-label="${h.name}"
              >
                ${r===h.pc?m`<span class="m-key-dot"></span>`:""}
                <span class="lbl">${h.name}</span>
              </button>
            `})}
          ${[[1,"C#",1],[3,"D#",2],[6,"F#",4],[8,"G#",5],[10,"A#",6]].map(([h,g,f])=>{const b=this.pcDisabled(h,a.chordTonePcs,a.scalePcs),y=a.chordTonePcs.includes(h);return m`
              <button
                class="m-bk"
                ?disabled=${b}
                style="left:calc(${f*100/7}% - 16.5px);${y&&!b?`background:${n};`:""}"
                @click=${()=>this.mPlace(g)}
                aria-label="${g}"
              >
                ${r===h?m`<span class="m-key-dot"></span>`:""}
              </button>
            `})}
        </div>
      </div>
    `}renderMobile(){const t=this.progression?.chords||[],e=Lt(this.progression?.mood||"Warm"),i=this.melodyTrack?.notes.length||0,o=this.getStepCoverMap(t),s=Math.min(Math.floor(this.msel/16),Math.max(0,t.length-1)),n=Math.min(this.mpage,Math.max(0,t.length-1)),a=this.playing&&this.activeStepIndex!==null?Math.floor(this.activeStepIndex/16):-1,[l,r]=this.getLoopRange(),c=`${l%16+1}–${(r-1)%16+1}`,d=u=>se(u.tension??.1).color,p=u=>bs[u.functionLabel]||u.functionLabel;return m`
      <div class="m-root" style="--mood-color: ${e};">
        <div class="m-head">
          <div class="m-head-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${i} notes</span>
          </div>
          <div class="segmented-control" role="radiogroup" aria-label="Melody guide mode">
            ${[["strict-chord","Strict"],["scale-key","Guide"],["free","Free"]].map(([u,h])=>m`
              <button
                class="segment-btn ${this.guideMode===u?"active":""}"
                role="radio"
                aria-checked="${this.guideMode===u}"
                @click=${()=>this.onSetGuideMode(u)}
              >${h}</button>
            `)}
          </div>
        </div>

        <div class="m-tools">
          <button class="try-another-btn quick-chip random-melody-btn" @click=${this.onRerollMelody} aria-label="Randomize melody">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/>
              <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
              <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
            </svg>
            <span>${i===0?"Randomize":"Try another"}</span>
          </button>
          <button class="style-pill ${this.styleOpen?"open":""}" @click=${()=>{this.styleOpen=!this.styleOpen}} aria-expanded=${this.styleOpen} aria-label="Melody style">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
            <span class="style-pill-caret">\u25BE</span>
          </button>
          <div class="m-tools-spacer"></div>
          ${this.melodyLoop==="Span"?m`
            <button class="m-span-chip ${this.spanEdit?"editing":""}" @click=${()=>this.mSpanChip()} aria-label="Edit loop span">
              ${this.spanEdit?m`<span class="mono">${this.spanA===null?"First step":"Last step"}</span>`:m`<span class="mono">${c}</span>`}
              <span class="act">${this.spanEdit?"Cancel":"Set"}</span>
            </button>
          `:m`
            <div class="m-view-toggle" role="group" aria-label="Melody view">
              <button class="m-view-btn ${this.mview==="overview"?"active":""}" @click=${()=>this.setMView("overview")} aria-label="Overview" aria-pressed="${this.mview==="overview"}">
                <span class="m-ov-icon"><i></i><i></i><i></i><i></i></span>
              </button>
              <button class="m-view-btn ${this.mview==="focus"?"active":""}" @click=${()=>this.setMView("focus")} aria-label="Focus" aria-pressed="${this.mview==="focus"}">
                <span class="m-fc-icon"></span>
              </button>
            </div>
          `}
        </div>

        ${this.mview==="overview"?m`
          <div class="m-overview" style="grid-template-rows: repeat(${Math.max(1,Math.ceil(t.length/2))}, minmax(0, 1fr));">
            ${t.map((u,h)=>m`
              <div
                class="m-tile bar-column ${h===s?"active":""} ${h===a?"playing-bar":""}"
                data-bar=${h}
                style="--chord-bg: ${d(u)};"
                @dblclick=${()=>this.mFocusRow(h)}
              >
                <div class="m-tile-head">
                  <div class="m-tile-name" @click=${()=>this.mFocusRow(h)}>
                    <span class="bar-role">${p(u)}</span>
                    <span class="name-line">
                      <span class="m-chord-name">${u.name}</span>
                      <span class="m-chord-roman">${this.showTheory&&u.roman||""}</span>
                    </span>
                  </div>
                  <button class="m-expand" @click=${()=>this.mFocusRow(h)} aria-label="Focus ${u.name}">⤢</button>
                </div>
                <div class="m-cells steps-16-grid">
                  ${Array.from({length:16},(g,f)=>this.renderMobileCell(h*16+f,o,!1))}
                </div>
              </div>
            `)}
          </div>
        `:m`
          <div class="m-tabs" role="tablist" aria-label="Chord">
            ${t.map((u,h)=>m`
              <button class="m-tab ${h===n?"active":""}" role="tab" aria-selected="${h===n}" @click=${()=>{this.mpage=h,Math.floor(this.msel/16)!==h&&(this.selectedGlobalStep=h*16)}}>
                <span class="t-name"><span>${u.name}</span><span class="roman">${this.showTheory&&u.roman||""}</span></span>
                <span class="m-mini">
                  ${Array.from({length:16},(g,f)=>{const b=h*16+f,y=o.get(b),x=this.playing&&this.activeStepIndex===b?"now":y?y.isStart?"head":"on":"";return m`<i class="${x}"></i>`})}
                </span>
              </button>
            `)}
          </div>
          <div class="m-focus-wrap">
            <div class="m-focus-grid bar-column steps-16-grid" data-bar=${n} style="--chord-bg: ${t[n]?d(t[n]):"#9CC0EC"};">
              ${Array.from({length:16},(u,h)=>this.renderMobileCell(n*16+h,o,!0,h+1))}
            </div>
          </div>
        `}

        ${this.renderMobileDock()}

        ${this.styleOpen?this.renderStylePanel():""}

        ${this.removedNote?m`
          <div class="m-toast" role="status">Note removed<button @click=${()=>this.mUndoRemove()}>Undo</button></div>
        `:""}
      </div>
    `}renderBloomPopover(t){if(this.selectedGlobalStep===null||!this.progression)return"";const e=Math.floor(this.selectedGlobalStep/16),i=this.progression.chords[e]||this.progression.chords[0],s=se(i.tension??.1).color,n=this.getNoteAtStep(this.selectedGlobalStep),a=Ye(i,this.progression.key,this.progression.scaleType),l=this.hoverPitchClass!==null?this.hoverPitchClass:n?n.midi%12:null,r=l!==null?So.find(p=>p.pc===l)?.name||vs.find(p=>p.pc===l)?.name||"":null,c=r!==null?`${r}${this.bloomOctave}`:"—",d=l!==null?this.getRoleString(l,i):`empty · ${i.name}`;return m`
      <div class="bloom-overlay" @click=${this.closeBloom}>
        <!-- Stem Diamond pointing directly at the cell center (MelodyGrid.dc.html:93) -->
        <div
          class="bloom-stem"
          style="left: ${this.popoverPos.stemL}px; top: ${this.popoverPos.stemT}px;"
        ></div>

        <!-- 308px × 144px Bloom Card (Exact MelodyGrid.dc.html & Image 1 parity) -->
        <div
          class="bloom-popover"
          style="left: ${this.popoverPos.left}px; top: ${this.popoverPos.top}px;"
          @click=${p=>p.stopPropagation()}
          @wheel=${this.onBloomWheel}
        >
          <!-- Header (‹ 4   E5 3 of C   clear   6 ›) -->
          <div class="bloom-header">
            <button
              class="bloom-nav-btn oct-down"
              @click=${this.onOctaveDown}
              ?disabled=${this.bloomOctave<=2}
              aria-label="Lower octave"
            >
              ‹ ${this.bloomOctave-1}
            </button>
            <div class="bloom-center-info">
              <span class="bloom-pitch-title">${c}</span>
              <span class="bloom-role-label">${d}</span>
            </div>
            ${n?m`
              <button class="bloom-clear-btn" @click=${this.onClearCurrentNote} aria-label="Clear note">clear</button>
            `:""}
            <button
              class="bloom-nav-btn oct-up"
              @click=${this.onOctaveUp}
              ?disabled=${this.bloomOctave>=7}
              aria-label="Higher octave"
            >
              ${this.bloomOctave+1} ›
            </button>
          </div>

          <!-- 7 White Keys (Positions: 12, 53, 94, 135, 176, 217, 258) -->
          ${So.map(p=>{const u=a.chordTonePcs.includes(p.pc),h=l===p.pc,g=this.hoverPitchClass===p.pc,f=this.guideMode==="strict-chord"&&!u&&(this.strictBy==="chord"||!a.scalePcs.includes(p.pc));return m`
              <div
                class="white-key ${u?"chord-tone-key":""} ${f?"disabled":""} ${g?"hovered":""}"
                style="left: ${p.left}px; ${u&&!g?`background: ${s};`:""}"
                @click=${()=>{f||this.onSelectPitch(p.name)}}
                @pointerenter=${()=>{f||(this.hoverPitchClass=p.pc,et(`${p.name}${this.bloomOctave}`,.18))}}
                @pointerleave=${()=>{this.hoverPitchClass===p.pc&&(this.hoverPitchClass=null)}}
              >
                <span class="key-mark ${h?"visible":""}"></span>
                <span class="key-text">${p.name}</span>
              </div>
            `})}

          <!-- 5 Black Keys (Positions: 38, 79, 161, 202, 243) -->
          ${vs.map(p=>{const u=a.chordTonePcs.includes(p.pc),h=l===p.pc,g=this.hoverPitchClass===p.pc,f=this.guideMode==="strict-chord"&&!u&&(this.strictBy==="chord"||!a.scalePcs.includes(p.pc));return m`
              <div
                class="black-key ${u?"chord-tone-key":""} ${f?"disabled":""} ${g?"hovered":""}"
                style="left: ${p.left}px; ${u&&!g?`background: ${s};`:""}"
                @click=${()=>{f||this.onSelectPitch(p.name)}}
                @pointerenter=${()=>{f||(this.hoverPitchClass=p.pc,et(`${p.name}${this.bloomOctave}`,.18))}}
                @pointerleave=${()=>{this.hoverPitchClass===p.pc&&(this.hoverPitchClass=null)}}
              >
                <span class="key-mark ${h?"visible":""}"></span>
              </div>
            `})}
        </div>
      </div>
    `}};G.styles=xe`
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
      position: relative;
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
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
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


    .try-another-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink, #2E271F);
      min-height: 32px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease, transform 120ms ease;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }


    .try-another-btn:hover {
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(46, 39, 31, 0.08);
    }

    .try-another-btn:active {
      transform: scale(0.97);
    }

    .clear-text-btn {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #7A6F62);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: color 150ms ease, background 150ms ease;
    }

    .clear-text-btn:hover {
      color: #A34848;
      background: rgba(163, 72, 72, 0.08);
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


    /* Loop Span Bar Underline on Step Cells */
    .loop-span-bar {
      position: absolute;
      left: -2px;
      right: -2px;
      bottom: 2px;
      height: 4px;
      background: var(--span-accent, #9B7CA8);
      pointer-events: none;
      z-index: 3;
    }

    .loop-span-bar.span-start {
      left: 6px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .loop-span-bar.span-end {
      right: 6px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    /* Melody Grid Sequencer Stage (Matches MelodyGrid.dc.html) */
    .melody-grid-stage {
      position: relative;
      background: transparent;
      border: none;
      padding: 0 0 160px;
      width: 100%;
      box-sizing: border-box;
      overflow: visible;
    }

    .melody-grid-inner {
      min-width: 680px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Step numbers header 1..16 */
    .step-numbers-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 0 16px;
    }

    .lane-spacer {
      width: 140px;
      flex-shrink: 0;
    }

    .step-numbers-track {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(16, minmax(0, 1fr));
      gap: 4px;
    }

    .step-num-col {
      text-align: center;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 700;
      color: #B3A590;
      user-select: none;
      transition: color 100ms ease;
    }

    .step-num-col.active {
      color: #9B7CA8;
      font-weight: 800;
    }

    /* 4-Bar Chord Lanes (tinted with tension color per MelodyGrid.dc.html) */
    .bars-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .chord-lane.bar-column {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 16px;
      border-radius: 22px;
      background: var(--chord-bg, #9CC0EC);
      box-shadow: 0 10px 22px -14px rgba(46, 39, 31, 0.4);
      transition: background 150ms ease, box-shadow 150ms ease, transform 120ms ease;
    }

    .chord-lane.bar-column.playing-bar {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 10px 22px -14px rgba(46, 39, 31, 0.4);
    }

    /* Chord Badge (Left column of lane) */
    .lane-chord-badge {
      width: 140px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: transparent;
      user-select: none;
    }

    .bar-role {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      line-height: 1.2;
    }

    .bar-chord-info {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .bar-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }

    .bar-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: #8A6B3F;
    }

    /* Step number (invisible or subtle for screen readers & tests) */
    .step-number {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
    }

    /* 16 Steps Row Across the Lane */
    .steps-16-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(16, minmax(0, 1fr));
      gap: 4px;
      align-items: center;
      position: relative;
    }

    /* Step Cell (circular pad) */
    .step-cell {
      position: relative;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      border-radius: 50%;
      background: transparent;
      transition: transform 120ms ease;
      touch-action: none;
    }

    .step-cell:hover {
      transform: scale(1.08);
    }

    .step-cell:active {
      transform: scale(0.95);
    }

    .step-cell.is-tail-step {
      cursor: grab;
    }

    .step-cell.is-tail-step:active {
      cursor: grabbing;
    }

    /* Empty dot placeholder (Matches MelodyGrid.dc.html:189,532 & Image 1) */
    .empty-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.35);
      transition: background 150ms ease, transform 120ms ease;
    }

    .step-cell:hover .empty-dot {
      background: rgba(251, 243, 230, 0.7);
      transform: scale(1.2);
    }

    /* Active Note Chip / Circle (Matches MelodyGrid.dc.html:530-552 & Image 1) */
    .note-pad {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 700;
      line-height: 1;
      box-sizing: border-box;
      transition: transform 120ms ease, box-shadow 120ms ease;
      background: #FFFFFF;
      color: #2E271F;
      border: none;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.15);
    }

    /* Sustained / Tied Step (Mini dot connector per MelodyGrid.dc.html:547 & Image 1) */
    .note-pad.tied-step {
      width: 14px;
      height: 14px;
      background: rgba(251, 243, 230, 0.95);
      border: none;
      box-shadow: none;
      z-index: 2;
      transition: transform 120ms ease, background 120ms ease;
    }

    .step-cell.is-tail-step:hover .note-pad.tied-step {
      transform: scale(1.2);
    }

    .note-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 700;
      line-height: 1;
      user-select: none;
      color: #2E271F;
    }

    /* Tie duration line connecting sustained steps (Matches MelodyGrid.dc.html:83, 548) */
    .tie-bar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 8px;
      border-radius: 4px;
      background: rgba(251, 243, 230, 0.95);
      z-index: 1;
      pointer-events: none;
    }

    .tie-bar.tie-start {
      left: 50%;
      width: calc(50% + 4px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .tie-bar.tie-mid {
      left: -2px;
      width: calc(100% + 4px);
      border-radius: 0;
    }

    .tie-bar.tie-end {
      left: -2px;
      width: calc(50% + 2px);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    /* Tail Grip Handle at end of note - Invisible hit area, NO vertical divider bar (Image 1 parity) */
    .tail-grip {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 18px;
      cursor: grab;
      z-index: 5;
      touch-action: none;
    }

    .tail-grip:active {
      cursor: grabbing;
    }

    /* Host dragging state */
    :host([dragging-tail]) {
      cursor: grabbing !important;
      user-select: none !important;
    }

    :host([dragging-tail]) .step-cell,
    :host([dragging-tail]) .tail-grip {
      cursor: grabbing !important;
    }

    /* Active Playhead Ring */
    .step-cell.active-step .empty-dot {
      background: #9B7CA8;
      box-shadow: 0 0 0 2.5px #9B7CA8;
      transform: scale(1.3);
    }

    .step-cell.active-step .note-pad {
      box-shadow: 0 0 0 3px #9B7CA8, 0 3px 10px rgba(155, 124, 168, 0.35);
      transform: scale(1.12);
    }

    /* Note Bloom Popover Overlay (Matches MelodyGrid.dc.html:92-105 & Image 1) */
    .bloom-overlay {
      position: absolute;
      top: -12px;
      left: -12px;
      right: -12px;
      bottom: -12px;
      z-index: 30;
      background: rgba(251, 243, 230, 0.35);
      border-radius: 28px;
      animation: bloom-fade-in 140ms ease-out;
    }

    @keyframes bloom-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bloom-popover {
      position: absolute;
      width: 308px;
      height: 144px;
      background: #FBF3E6;
      border-radius: 18px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.12), 0 24px 60px rgba(46, 39, 31, 0.24);
      z-index: 35;
      box-sizing: border-box;
      user-select: none;
      animation: bloom-scale-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bloom-scale-in {
      from { transform: scale(0.94); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .bloom-stem {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #FBF3E6;
      transform: rotate(45deg);
      border-radius: 2px;
      z-index: 34;
      pointer-events: none;
    }

    /* Bloomed step ring & elevation (Matches MelodyGrid.dc.html:538,544) */
    .step-cell.is-bloomed {
      z-index: 32;
    }

    .empty-dot.bloomed-empty-ring {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent !important;
      box-shadow: 0 0 0 2.5px #2E271F;
      transform: none !important;
    }

    .step-cell.is-bloomed .note-pad {
      box-shadow: 0 0 0 2.5px #2E271F;
    }

    /* Dim other cells when bloom is active (Matches MelodyGrid.dc.html:547) */
    .melody-grid-stage.has-active-bloom .step-cell:not(.is-bloomed) {
      opacity: 0.25;
      transition: opacity 150ms ease;
    }

    .melody-grid-stage.has-active-bloom .step-cell.is-bloomed {
      opacity: 1;
    }

    .bloom-header {
      position: absolute;
      left: 12px;
      right: 12px;
      top: 10px;
      height: 30px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .bloom-nav-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #9A8B78;
      padding: 6px 8px;
      border-radius: 8px;
      transition: color 100ms ease, background 100ms ease;
    }

    .bloom-nav-btn:hover:not(:disabled) {
      color: #2E271F;
      background: #F1E4CC;
    }

    .bloom-nav-btn:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .bloom-center-info {
      flex: 1;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      min-width: 0;
    }

    .bloom-pitch-title {
      font-size: 17px;
      font-weight: 600;
      color: #2E271F;
    }

    .bloom-role-label {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #4A3F33;
      white-space: nowrap;
    }

    .bloom-clear-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #9A8B78;
      padding: 6px 7px;
      border-radius: 8px;
      transition: color 100ms ease, background 100ms ease;
    }

    .bloom-clear-btn:hover {
      color: #9B7CA8;
      background: #F1E4CC;
    }

    /* 7 White Keys (Matches MelodyGrid.dc.html:101, 594-595 & Image 1) */
    .white-key {
      position: absolute;
      top: 48px;
      width: 38px;
      height: 84px;
      border-radius: 5px 5px 9px 9px;
      background: #FFFAF2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      padding-bottom: 7px;
      box-sizing: border-box;
      cursor: pointer;
      transition: background 100ms ease, color 100ms ease;
    }

    .white-key:hover:not(.disabled),
    .white-key.hovered:not(.disabled) {
      background: #2E271F !important;
      color: #FBF3E6 !important;
    }

    .white-key:hover:not(.disabled) .key-text,
    .white-key.hovered:not(.disabled) .key-text {
      color: #FBF3E6 !important;
    }

    .white-key.disabled {
      background: #E6DCCB !important;
      color: #A89A85 !important;
      cursor: not-allowed;
    }

    .white-key.disabled .key-text {
      color: #A89A85 !important;
    }

    /* 5 Black Keys (Matches MelodyGrid.dc.html:102, 596-597 & Image 1) */
    .black-key {
      position: absolute;
      top: 48px;
      width: 27px;
      height: 50px;
      border-radius: 3px 3px 6px 6px;
      background: #2E271F;
      box-shadow: 0 0 0 2px #FBF3E6;
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      box-sizing: border-box;
      z-index: 2;
      transition: background 100ms ease;
    }

    .black-key:hover:not(.disabled),
    .black-key.hovered:not(.disabled) {
      background: #4E4237 !important;
    }

    .black-key.disabled {
      background: #CDBFA9 !important;
      cursor: not-allowed;
    }

    /* 5px Purple Dot Indicator for Active Note (Matches MelodyGrid.dc.html:101-102 & Image 1) */
    .key-mark {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #9B7CA8;
      opacity: 0;
      transition: opacity 80ms ease;
      flex-shrink: 0;
    }

    .key-mark.visible {
      opacity: 1;
    }

    .key-text {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: #2E271F;
      line-height: 1;
    }
    /* ===== Mobile (Chroma Melody MelodyGrid device="mobile") ===== */
    :host([mobile]) {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      height: 100%;
    }

    .m-root {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .m-head {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
    }

    .m-head-left {
      display: flex;
      align-items: baseline;
      gap: 8px;
      min-width: 0;
    }

    .m-head .segment-btn {
      min-height: 32px;
      padding: 0 10px;
    }

    .m-tools {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 4px;
    }

    .m-tools .try-another-btn {
      min-height: 38px;
    }

    .m-tools .clear-text-btn {
      min-height: 38px;
      padding: 0 10px;
    }

    .m-tools-spacer {
      flex: 1;
    }

    .m-view-toggle {
      display: flex;
      gap: 2px;
      background: rgba(46, 39, 31, 0.07);
      border-radius: 22px;
      padding: 3px;
      flex: none;
    }

    .m-view-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      background: transparent;
      display: grid;
      place-items: center;
      padding: 0;
      transition: background 150ms ease, transform 120ms ease;
    }

    .m-view-btn:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .m-view-btn:active {
      transform: scale(0.94);
    }

    .m-view-btn.active {
      background: #2E271F;
    }

    .m-view-btn.active:hover {
      background: #2E271F;
    }

    .m-ov-icon {
      display: grid;
      grid-template-columns: repeat(2, 7px);
      gap: 3px;
    }

    .m-ov-icon i {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      background: #6B5F50;
    }

    .m-fc-icon {
      width: 17px;
      height: 17px;
      border-radius: 4px;
      background: #6B5F50;
    }

    .m-view-btn.active i,
    .m-view-btn.active .m-fc-icon {
      background: #FBF3E6;
    }

    .m-span-chip {
      flex: 0 1 auto;
      min-width: 0;
      height: 38px;
      padding: 0 5px 0 12px;
      border-radius: 19px;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      background: #F1E4CC;
      color: #2E271F;
    }

    .m-span-chip.editing {
      background: #9B7CA8;
      color: #FBF3E6;
    }

    .m-span-chip .mono {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
    }

    .m-span-chip .act {
      height: 28px;
      padding: 0 10px;
      border-radius: 14px;
      background: #FBF3E6;
      color: #2E271F;
      display: grid;
      place-items: center;
    }

    /* Overview: chord tiles, 2 per row, each a 4x4 dot grid */
    .m-overview {
      flex: 1 1 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 10px;
      padding: 0 4px;
    }

    .m-tile {
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      border-radius: 22px;
      padding: 6px 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--chord-bg, #9CC0EC);
    }

    .m-tile.active {
      box-shadow: 0 0 0 1px #E4D6C0;
    }

    .m-tile.playing-bar {
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }

    .m-tile-head {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .m-tile-name {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 4px 8px;
      border-radius: 12px;
    }

    .m-tile-name .bar-role {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-tile-name .name-line {
      display: flex;
      align-items: baseline;
      gap: 5px;
      min-width: 0;
    }

    .m-chord-name {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #6B5F50;
    }

    .m-expand {
      width: 34px;
      height: 30px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: rgba(46, 39, 31, 0.55);
      font-size: 15px;
      cursor: pointer;
      flex: none;
      transition: background 150ms ease, color 150ms ease;
    }

    .m-expand:hover {
      background: rgba(251, 243, 230, 0.6);
      color: #2E271F;
    }

    .m-cells {
      flex: 1 1 0;
      height: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: repeat(4, minmax(0, 1fr));
      padding: 0 4px;
    }

    .m-cell {
      position: relative;
      min-height: 0;
      min-width: 0;
      container-type: size;
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    /* .step-cell is shared with the desktop lanes for drag hit-testing; neutralise its sizing here */
    .step-cell.m-cell {
      height: 100%;
      width: 100%;
      align-self: stretch;
      border-radius: 0;
      transform: none;
    }

    .m-cell .m-tie {
      position: absolute;
      top: 50%;
      height: 8px;
      margin-top: -4px;
      background: rgba(251, 243, 230, 0.95);
      pointer-events: none;
    }

    .m-cell .m-span {
      position: absolute;
      bottom: 1px;
      height: 3px;
      border-radius: 4px;
      background: #9B7CA8;
      pointer-events: none;
    }

    .m-dot {
      position: relative;
      z-index: 1;
      height: min(var(--dot, 28px), 84cqh);
      max-width: 90cqw;
      aspect-ratio: 1;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.35);
      display: grid;
      place-items: center;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: #2E271F;
      transition: background 120ms ease, box-shadow 120ms ease;
    }

    .m-cell:hover .m-dot.empty {
      background: rgba(251, 243, 230, 0.7);
    }

    .m-dot.note {
      background: #FFFAF2;
    }

    .m-dot.tail {
      background: rgba(251, 243, 230, 0.95);
    }

    .m-dot.playhead {
      background: #9B7CA8;
      color: #FBF3E6;
    }

    .m-dot.selected {
      box-shadow: 0 0 0 3px #F6EADB, 0 0 0 5px #9B7CA8;
    }

    /* Focus: chord tabs + one big 4x4 grid */
    .m-tabs {
      flex: none;
      display: flex;
      gap: 7px;
      overflow-x: auto;
      padding: 2px 4px;
      scrollbar-width: none;
    }

    .m-tabs::-webkit-scrollbar {
      display: none;
    }

    .m-tab {
      flex: 1 0 76px;
      height: 76px;
      border-radius: 18px;
      border: none;
      font-family: inherit;
      cursor: pointer;
      background: #F6EADB;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 0;
      transition: background 150ms ease, transform 120ms ease;
    }

    .m-tab:active {
      transform: scale(0.97);
    }

    .m-tab.active {
      background: #F1E4CC;
      box-shadow: 0 0 0 1px #E4D6C0;
    }

    .m-tab .t-name {
      display: flex;
      align-items: baseline;
      gap: 4px;
      max-width: calc(100% - 8px);
      font-size: 12.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .m-tab.active .t-name {
      color: #2E271F;
    }

    .m-tab .t-name span:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-tab .t-name .roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9px;
      font-weight: 400;
      color: #8A6B3F;
    }

    .m-mini {
      display: grid;
      grid-template-columns: repeat(4, 6px);
      gap: 3px;
    }

    .m-mini i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #E4D6C0;
    }

    .m-mini i.on {
      background: #6B5F50;
    }

    .m-mini i.head {
      background: #2E271F;
    }

    .m-mini i.now {
      background: #9B7CA8;
    }

    .m-focus-wrap {
      flex: 1;
      min-height: 0;
      container-type: size;
      display: flex;
      justify-content: center;
    }

    .m-focus-grid {
      width: 100cqmin;
      height: 100cqmin;
      border-radius: 26px;
      background: var(--chord-bg, #9CC0EC);
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: repeat(4, minmax(0, 1fr));
    }

    .m-focus-grid .m-dot {
      font-size: 15px;
    }

    .m-focus-grid .m-tie {
      height: 14px;
      margin-top: -7px;
    }

    .m-focus-grid .m-span {
      bottom: 6px;
      height: 4px;
    }

    .m-step-no {
      position: absolute;
      left: 10px;
      top: 8px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9px;
      color: rgba(46, 39, 31, 0.4);
      pointer-events: none;
    }

    /* Note dock: micro keyboard (MobileDock.dc.html, embedded) */
    .m-dock {
      flex: none;
      position: relative;
      height: 124px;
      border-radius: 22px;
      background: #F6EADB;
      overflow: hidden;
    }

    .m-dock-bar {
      position: absolute;
      left: 6px;
      right: 6px;
      top: 6px;
      height: 36px;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .m-dock-nav {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 12px;
      color: #6B5F50;
      height: 36px;
      min-width: 44px;
      padding: 0 8px;
      border-radius: 10px;
    }

    .m-dock-nav:active {
      background: #F1E4CC;
    }

    .m-dock-nav:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .m-dock-note {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }

    .m-dock-note .pitch {
      font-size: 17px;
      font-weight: 600;
      color: #2E271F;
    }

    .m-dock-note .role {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #6B5F50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-len {
      display: flex;
      align-items: center;
      height: 32px;
      border-radius: 16px;
      background: #F1E4CC;
      flex: none;
    }

    .m-len button {
      border: none;
      background: transparent;
      cursor: pointer;
      width: 30px;
      height: 32px;
      color: #2E271F;
      font-size: 14px;
      font-family: inherit;
    }

    .m-len button:active {
      color: #9B7CA8;
    }

    .m-len span {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #2E271F;
      min-width: 24px;
      text-align: center;
    }

    .m-dock-clear {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #6B5F50;
      height: 36px;
      padding: 0 8px;
      border-radius: 10px;
    }

    .m-dock-clear:active {
      color: #9B7CA8;
      background: #F1E4CC;
    }

    .m-keys {
      position: absolute;
      left: 8px;
      right: 8px;
      top: 46px;
      height: 72px;
    }

    .m-wk {
      position: absolute;
      top: 0;
      height: 72px;
      border: none;
      border-radius: 6px 6px 12px 12px;
      background: #FFFAF2;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      padding: 0 0 10px;
      box-sizing: border-box;
      font-family: inherit;
      transition: filter 100ms ease, transform 100ms ease;
    }

    .m-wk:active:not(:disabled) {
      transform: scale(0.97);
      filter: brightness(0.94);
    }

    .m-wk:disabled {
      background: #E6DCCB;
      cursor: not-allowed;
    }

    .m-wk .lbl {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 600;
      color: #2E271F;
    }

    .m-wk:disabled .lbl {
      color: #A89A85;
    }

    .m-bk {
      position: absolute;
      top: 0;
      width: 30px;
      height: 42px;
      border: none;
      border-radius: 4px 4px 8px 8px;
      background: #2E271F;
      box-shadow: 0 0 0 3px #F6EADB;
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0 0 8px;
      box-sizing: border-box;
      z-index: 2;
      transition: filter 100ms ease;
    }

    .m-bk:active:not(:disabled) {
      filter: brightness(1.4);
    }

    .m-bk:disabled {
      background: #CDBFA9;
      cursor: not-allowed;
    }

    .m-key-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #9B7CA8;
    }

    .m-toast {
      position: absolute;
      left: 50%;
      bottom: 136px;
      transform: translateX(-50%);
      z-index: 30;
      height: 44px;
      padding: 0 6px 0 18px;
      border-radius: 22px;
      background: #2E271F;
      color: #FBF3E6;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 10px 28px rgba(46, 39, 31, 0.25);
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }

    .m-toast button {
      height: 32px;
      padding: 0 14px;
      border-radius: 16px;
      border: none;
      background: #9B7CA8;
      color: #FBF3E6;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }

    /* ===== Style picker (shape, busyness, band) ===== */
    .melody-container,
    .m-root {
      position: relative;
    }

    .style-pill {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      min-height: 32px;
      padding: 0 11px 0 12px;
      border-radius: 100px;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
      color: var(--cv-ink, #2E271F);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease, transform 120ms ease, box-shadow 150ms ease;
    }

    .style-pill:hover { background: #FFFFFF; box-shadow: 0 2px 4px rgba(46, 39, 31, 0.08); }
    .style-pill:active { transform: scale(0.97); }
    .style-pill.open { background: #2E271F; color: #FBF3E6; box-shadow: none; }

    .style-pill svg { flex-shrink: 0; }
    .style-pill-value { font-weight: 800; }
    .style-pill-caret { font-size: 9px; opacity: 0.55; transition: transform 150ms ease; }
    .style-pill.open .style-pill-caret { transform: rotate(180deg); opacity: 0.8; }

    .m-tools .style-pill { min-height: 38px; }

    .style-backdrop {
      position: absolute;
      inset: -16px;
      z-index: 40;
    }

    .style-panel {
      position: absolute;
      z-index: 41;
      top: 52px;
      left: 0;
      width: min(460px, 100%);
      max-height: calc(100vh - 250px);
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      box-sizing: border-box;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 20px;
      padding: 14px;
      box-shadow: 0 24px 50px -18px rgba(46, 39, 31, 0.5);
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: style-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host([mobile]) .style-panel {
      max-height: calc(100vh - 250px);
      top: 100px;
      left: 0;
      right: 0;
      width: auto;
    }

    .style-panel::-webkit-scrollbar { display: none; }

    @keyframes style-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: none; }
    }

    .style-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-top: 4px;
    }

    .style-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    :host([mobile]) .style-grid { grid-template-columns: 1fr 1fr; }

    .style-card {
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      min-height: 52px;
      padding: 8px 10px;
      border-radius: 13px;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: background 140ms ease, transform 120ms ease, box-shadow 140ms ease;
    }

    .style-card:hover { background: var(--cv-surface-2, #F1E4CC); }
    .style-card:active { transform: scale(0.98); }
    .style-card.active { background: #2E271F; color: #FBF3E6; }
    .style-card.auto { grid-column: 1 / -1; }

    .style-name { font-size: 13px; font-weight: 800; }
    .style-blurb { font-size: 11px; font-weight: 600; line-height: 1.35; opacity: 0.72; }

    .band-follow {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 14px;
      padding: 10px 11px;
    }

    .band-follow-swatch { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
    .band-follow-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .band-follow-name { font-size: 13px; font-weight: 800; }
    .band-how { margin: 8px 0 0; padding: 0 0 0 16px; display: flex; flex-direction: column; gap: 4px; font-size: 11.5px; font-weight: 600; line-height: 1.4; color: var(--cv-ink, #2E271F); }
    .band-songs { margin-top: 6px; font-size: 10.5px; font-weight: 700; color: var(--cv-ink-muted, #6B5F50); }
    .band-follow-move { font-size: 11px; font-weight: 600; line-height: 1.35; color: var(--cv-ink-muted, #6B5F50); }

    .style-footnote {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 2px 2px 0;
    }

    .style-clear {
      align-self: flex-start;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 8px 4px 2px;
      cursor: pointer;
    }

    .style-clear:hover { color: #A34848; }
  `;J([k({type:Object})],G.prototype,"progression",2);J([k({type:Object})],G.prototype,"melodyTrack",2);J([k({type:Number})],G.prototype,"activeStepIndex",2);J([k({type:String})],G.prototype,"guideMode",2);J([k({type:String})],G.prototype,"contour",2);J([k({type:Number})],G.prototype,"density",2);J([k({type:String})],G.prototype,"melodyStyle",2);J([k({type:String})],G.prototype,"bandId",2);J([k({type:Boolean})],G.prototype,"bandOn",2);J([k({type:Number})],G.prototype,"octave",2);J([k({type:Boolean})],G.prototype,"playing",2);J([k({type:Boolean})],G.prototype,"backingEnabled",2);J([k({type:Boolean})],G.prototype,"isMobile",2);J([k({type:Boolean})],G.prototype,"showTheory",2);J([k({type:String})],G.prototype,"melodyLoop",2);J([k({type:String})],G.prototype,"melodySound",2);J([k({type:Array})],G.prototype,"span",2);J([k({type:Boolean,reflect:!0,attribute:"dragging-tail"})],G.prototype,"isDraggingTail",2);J([w()],G.prototype,"selectedGlobalStep",2);J([w()],G.prototype,"bloomOctave",2);J([w()],G.prototype,"hoverPitchClass",2);J([w()],G.prototype,"popoverPos",2);J([w()],G.prototype,"strictBy",2);J([w()],G.prototype,"styleOpen",2);J([w()],G.prototype,"dragStartStep",2);J([k({type:Boolean,reflect:!0})],G.prototype,"mobile",2);J([w()],G.prototype,"mview",2);J([w()],G.prototype,"mpage",2);J([w()],G.prototype,"spanEdit",2);J([w()],G.prototype,"spanA",2);J([w()],G.prototype,"removedNote",2);G=J([ke("tab-melody")],G);var Ur=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,je=(t,e,i,o)=>{for(var s=o>1?void 0:o?_r(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Ur(e,i,s),s};const mi=["A","B","C","D","E","F","G","H"],gi=["#DFEAF8","#F4E2DE","#E6EDDA","#FAF0D7","#ECE3F2","#F7DFE7","#DCF0F2","#F5E8DC"];let Te=class extends we{constructor(){super(...arguments),this.sections=[],this.timeline=[],this.activeSectionIdx=0,this.activeTimelineIdx=0,this.currentStep=0,this.playing=!1,this.mood="Dreamy",this.bpm=120,this.draggingIdx=null,this.dragOverIdx=null}getEffectiveTimeline(){return this.timeline&&this.timeline.length>0?this.timeline:this.sections.map((t,e)=>({id:`timeline-item-${e}`,sectionIndex:e,repeats:1}))}getTotalBars(){return this.getEffectiveTimeline().reduce((e,i)=>{const s=this.sections[i.sectionIndex]?.progression?.chords?.length||4;return e+s*i.repeats},0)}getEstimatedDuration(){const e=this.getTotalBars()*4,i=Math.round(e/this.bpm*60),o=Math.floor(i/60),s=i%60;return`${o}:${String(s).padStart(2,"0")}`}onSelectSectionCard(t){this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("select-section",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onAddToSong(t,e){e.stopPropagation();const i=this.getEffectiveTimeline(),o={id:`timeline-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,sectionIndex:t,repeats:1},s=[...i,o];this.timeline=s,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:s},bubbles:!0,composed:!0}))}onEditChords(t,e){e.stopPropagation(),this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("edit-chords",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onEditMelody(t,e){e.stopPropagation(),this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("edit-melody",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onUpdateRepeat(t,e,i){i.stopPropagation();const o=this.getEffectiveTimeline(),s=o[t];if(!s)return;const n=Math.max(1,Math.min(8,s.repeats+e));if(n===s.repeats)return;const a=o.map((l,r)=>r===t?{...l,repeats:n}:l);this.timeline=a,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:a},bubbles:!0,composed:!0}))}onMoveTimelineItem(t,e,i){i.stopPropagation();const o=this.getEffectiveTimeline(),s=t+e;if(s<0||s>=o.length)return;const n=Z.reorderTimeline(o,t,s);this.timeline=n,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:n},bubbles:!0,composed:!0}))}onRemoveTimelineItem(t,e){e.stopPropagation();const i=this.getEffectiveTimeline();if(i.length<=1)return;const o=i.filter((s,n)=>n!==t);this.timeline=o,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:o},bubbles:!0,composed:!0}))}onNewSectionFromLoop(){this.dispatchEvent(new CustomEvent("new-section-from-loop",{bubbles:!0,composed:!0}))}onTogglePlaySong(){this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}onDragStart(t,e){this.draggingIdx=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t)))}onDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this.dragOverIdx=t}onDragEnd(){this.draggingIdx=null,this.dragOverIdx=null}onDrop(t,e){if(e.preventDefault(),this.draggingIdx!==null&&this.draggingIdx!==t){const i=this.getEffectiveTimeline(),o=Z.reorderTimeline(i,this.draggingIdx,t);this.timeline=o,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:o},bubbles:!0,composed:!0}))}this.draggingIdx=null,this.dragOverIdx=null}onGripPointerDown(t,e){if(e.pointerType==="mouse")return;e.preventDefault(),e.stopPropagation(),this.draggingIdx=t,this.dragOverIdx=t;const i=s=>{const a=this.shadowRoot?.elementFromPoint(s.clientX,s.clientY)?.closest(".timeline-card");a?.dataset.idx!==void 0&&(this.dragOverIdx=parseInt(a.dataset.idx,10))},o=()=>{window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",o),window.removeEventListener("pointercancel",o);const s=this.dragOverIdx;if(this.draggingIdx!==null&&s!==null&&s!==this.draggingIdx){const n=Z.reorderTimeline(this.getEffectiveTimeline(),this.draggingIdx,s);this.timeline=n,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:n},bubbles:!0,composed:!0}))}this.draggingIdx=null,this.dragOverIdx=null};window.addEventListener("pointermove",i),window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o)}render(){const t=this.getEffectiveTimeline(),e=this.getTotalBars(),i=this.getEstimatedDuration();return m`
      <!-- 2-Column Responsive Layout (Song order on left, Sections on right per Chroma Melody design) -->
      <div class="song-columns" data-screen-label="Song">
        <!-- Left Column: Song Order Timeline (Sticky) -->
        <div class="timeline-container">
            <div class="timeline-header-row">
              <span class="col-title">SONG ORDER</span>
              <span class="col-sub">${e} bars · ${i}</span>
            </div>

            <div class="timeline-list">
              ${t.length===0?m`<div class="timeline-empty">Add a section to start the song.</div>`:t.map((o,s)=>{const n=this.sections[o.sectionIndex];if(!n)return ue;const a=mi[o.sectionIndex%mi.length],l=gi[o.sectionIndex%gi.length],r=(n.progression?.chords||[]).map(h=>h.name).join(" – "),c=this.playing&&this.activeTimelineIdx===s,d=o.sectionIndex===this.activeSectionIdx,p=this.draggingIdx===s,u=this.dragOverIdx===s;return m`
                      <div
                        class="timeline-card ${c?"active-playing":""} ${d?"selected":""} ${p?"dragging":""} ${u?"drag-over":""}"
                        draggable="true"
                        data-idx=${s}
                        @click=${()=>this.onSelectSectionCard(o.sectionIndex)}
                        @dragstart=${h=>this.onDragStart(s,h)}
                        @dragover=${h=>this.onDragOver(s,h)}
                        @dragend=${this.onDragEnd}
                        @drop=${h=>this.onDrop(s,h)}
                      >
                        <!-- Active playback progress bar -->
                        <div class="playback-bar"></div>

                        <span class="drag-handle" title="Drag to reorder" aria-label="Drag to reorder" @pointerdown=${h=>this.onGripPointerDown(s,h)}>⋮⋮</span>
                        <span class="step-idx">${String(s+1).padStart(2,"0")}</span>

                        <span class="timeline-badge" style="background: ${l};">
                          ${a}
                        </span>

                        <div class="timeline-card-info">
                          <span class="timeline-card-name">${n.name}</span>
                          <span class="timeline-chords-summary">${r}</span>
                        </div>

                        <!-- Repeat Counter Stepper -->
                        <div class="repeat-stepper" title="Repeat count">
                          <button
                            class="stepper-btn"
                            @click=${h=>this.onUpdateRepeat(s,-1,h)}
                            ?disabled=${o.repeats<=1}
                            aria-label="Fewer repeats"
                          >
                            −
                          </button>
                          <span class="repeat-label">×${o.repeats}</span>
                          <button
                            class="stepper-btn"
                            @click=${h=>this.onUpdateRepeat(s,1,h)}
                            ?disabled=${o.repeats>=8}
                            aria-label="More repeats"
                          >
                            +
                          </button>
                        </div>

                        <!-- Move Up / Down Buttons & Remove -->
                        <div class="timeline-actions">
                          <button
                            class="icon-action-btn"
                            @click=${h=>this.onMoveTimelineItem(s,-1,h)}
                            ?disabled=${s===0}
                            title="Move section up"
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                          <button
                            class="icon-action-btn"
                            @click=${h=>this.onMoveTimelineItem(s,1,h)}
                            ?disabled=${s===t.length-1}
                            title="Move section down"
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                          <button
                            class="icon-action-btn delete-item-btn"
                            @click=${h=>this.onRemoveTimelineItem(s,h)}
                            ?disabled=${t.length<=1}
                            title="Remove section instance"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    `})}
            </div>
          </div>

          <!-- Right Column: Sections Library (Edit once, used everywhere) -->
          <div class="sections-library">
            <div class="col-title" style="margin-bottom: 2px;">
              SECTIONS · EDIT ONCE, USED EVERYWHERE
            </div>

            <div class="sections-list">
              ${this.sections.map((o,s)=>{const n=mi[s%mi.length],a=gi[s%gi.length],l=o.progression?.chords||[],r=this.activeSectionIdx===s;return m`
                  <div
                    class="section-card ${r?"active":""}"
                    style="--section-tint: ${a};"
                    @click=${()=>this.onSelectSectionCard(s)}
                    role="button"
                    tabindex="0"
                  >
                    <div class="section-card-top">
                      <span class="section-badge">
                        ${n}
                      </span>
                      <span class="section-name">${o.name}</span>
                      <span class="section-bars">${l.length} bars · ${this.bpm} BPM</span>
                      <button
                        class="action-btn primary"
                        @click=${c=>this.onAddToSong(s,c)}
                        title="Append instance to Song timeline"
                      >
                        + Add to song
                      </button>
                    </div>

                    ${o.desc?m`<p class="section-desc">${o.desc}</p>`:ue}

                    <!-- Chord Chips Row with 8-dot Rhythm Matrices (Chroma Melody.dc.html:422) -->
                    <div class="chord-chips-row">
                      ${l.map((c,d)=>{const p=se(c.tension??.2);return m`
                          <div
                            class="chord-chip"
                            style="--chord-col: ${p.color};"
                          >
                            <div class="chord-chip-text">
                              <span class="chord-chip-role">${c.functionLabel||"CHORD"}</span>
                              <div style="display: flex; align-items: baseline; gap: 4px;">
                                <span class="chord-chip-name">${c.name}</span>
                                ${c.roman?m`<span class="chord-chip-rn">${c.roman}</span>`:ue}
                              </div>
                            </div>
                            <!-- 8-dot rhythm matrix per Chroma Melody design -->
                            <div class="rhythm-dots-matrix">
                              ${Array.from({length:8},(u,h)=>m`
                                <span class="rhythm-dot ${h===0||h===4?"active":""}"></span>
                              `)}
                            </div>
                          </div>
                        `})}
                    </div>

                    <!-- Section Actions (Shown on active section per Chroma Melody.dc.html:424-427) -->
                    <div class="section-actions">
                      <button
                        class="action-btn section-edit-btn"
                        @click=${c=>this.onEditChords(s,c)}
                        title="Edit chords in Chords tab"
                      >
                        Edit chords
                      </button>
                      <button
                        class="action-btn section-edit-btn"
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
                + New section from the loop
              </button>
            </div>
          </div>
        </div>
    `}};Te.styles=xe`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2e271f);
    }

    * {
      box-sizing: border-box;
    }

    /* 2-Column Responsive Layout (Matches Chroma Melody.dc.html:409) */
    .song-columns {
      display: grid;
      grid-template-columns: minmax(320px, 400px) minmax(0, 1fr);
      gap: 18px;
      align-items: start;
      width: 100%;
      color: #2E271F;
    }

    @media (max-width: 860px) {
      .song-columns {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    /* Left Sticky Order Column (order: -1 per Chroma Melody.dc.html:432) */
    .timeline-container {
      order: -1;
      position: sticky;
      top: 0;
      min-width: 0;
      border-radius: 26px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timeline-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 2px 4px 6px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.06);
    }

    .col-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8a6b3f);
    }

    .col-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 120px;
    }

    /* Timeline Row Item (Matches Chroma Melody.dc.html:435) */
    .timeline-card {
      position: relative;
      min-height: 42px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.5);
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 6px 0 10px;
      cursor: pointer;
      overflow: hidden;
      transition: background 150ms ease, box-shadow 150ms ease, transform 120ms ease;
    }

    .timeline-card:hover {
      background: rgba(251, 243, 230, 0.82);
    }

    .timeline-card.selected {
      box-shadow: inset 0 0 0 2px #2e271f;
      background: var(--cv-cream, #fbf3e6);
    }

    .timeline-card.active-playing {
      box-shadow: inset 0 0 0 2px #f2735f;
    }

    .timeline-card.dragging {
      opacity: 0.4;
      border: 1.5px dashed #2e271f;
    }

    .timeline-card.drag-over {
      border-top: 3px solid #2e271f;
    }

    /* Playback Progress Highlight Bar across the row */
    .playback-bar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0%;
      background: rgba(242, 115, 95, 0.16);
      pointer-events: none;
      transition: width 0.15s linear;
    }

    .timeline-card.active-playing .playback-bar {
      width: 100%;
    }

    .drag-handle {
      position: relative;
      align-self: stretch;
      width: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      touch-action: none;
      color: #b3a590;
      font-size: 14px;
      letter-spacing: -2px;
      flex-shrink: 0;
      user-select: none;
    }

    .step-idx {
      position: relative;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      width: 20px;
      text-align: right;
    }

    .timeline-badge {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 7px;
      font-size: 11px;
      font-weight: 800;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      color: #2e271f;
    }

    .timeline-card-info {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .timeline-card-name {
      font-size: 13.5px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timeline-chords-summary {
      font-size: 10.5px;
      font-weight: 600;
      color: #6b5f50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Repeat Counter Stepper */
    .repeat-stepper {
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      border-radius: 100px;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
      flex-shrink: 0;
      background: rgba(251, 243, 230, 0.5);
    }

    .stepper-btn {
      width: 26px;
      height: 26px;
      border: none;
      background: transparent;
      border-radius: 50%;
      cursor: pointer;
      font-family: inherit;
      font-weight: 800;
      font-size: 13px;
      color: #2e271f;
      display: grid;
      place-items: center;
      transition: background 120ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
    }

    .stepper-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .repeat-label {
      font-size: 12px;
      font-weight: 800;
      min-width: 24px;
      text-align: center;
      color: #2e271f;
      user-select: none;
    }

    /* Row Action Buttons (Move & Delete) */
    .timeline-actions {
      position: relative;
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 26px;
      height: 26px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 12px;
      transition: background 120ms ease, color 120ms ease;
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
      font-size: 15px;
      color: #6b5f50;
    }

    .delete-item-btn:hover:not(:disabled) {
      background: rgba(231, 76, 60, 0.12);
      color: #e74c3c;
    }

    /* Phones (design: Song mobile): 48px rows, grip drag, repeat stepper + delete only */
    @media (max-width: 899px) {
      .timeline-container {
        position: static;
        border-radius: 22px;
        padding: 12px;
      }
      .timeline-list {
        gap: 5px;
        min-height: 0;
      }
      .timeline-card {
        min-height: 48px;
      }
      .drag-handle {
        width: 26px;
        margin-left: -6px;
        font-size: 15px;
        letter-spacing: -3px;
      }
      .timeline-chords-summary {
        display: none;
      }
      .repeat-stepper {
        height: 36px;
      }
      .repeat-stepper .stepper-btn {
        width: 34px;
        height: 34px;
      }
      .icon-action-btn {
        width: 36px;
        height: 36px;
      }
      .timeline-actions .icon-action-btn:not(.delete-item-btn) {
        display: none;
      }
      .timeline-card:not(.selected) .delete-item-btn {
        display: none;
      }
    }

    .timeline-empty {
      padding: 24px 12px;
      text-align: center;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      border-radius: 14px;
      border: 1.5px dashed rgba(46, 39, 31, 0.2);
    }

    /* Right Column: Sections Library */
    .sections-library {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Section Card (Matches Chroma Melody.dc.html:413-428) */
    .section-card {
      border-radius: 20px;
      background: var(--section-tint, rgba(156, 192, 236, 0.22));
      border: none;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      box-shadow: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .section-card:hover {
      transform: translateY(-1px);
    }

    .section-card.active {
      box-shadow: inset 0 0 0 2px #2e271f;
    }

    .section-card-top {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .section-badge {
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: #2e271f;
      color: #fbf3e6;
      font-size: 12px;
      font-weight: 800;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .section-name {
      font-size: 16px;
      font-weight: 800;
      color: #2e271f;
    }

    .section-bars {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.62);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
    }

    .section-desc {
      font-size: 12px;
      line-height: 1.4;
      color: #6b5f50;
      margin: 0;
    }

    /* Chord Chips Grid with 8-dot rhythm matrices */
    .chord-chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chord-chip {
      flex: 1 1 92px;
      min-width: 0;
      border-radius: 12px;
      padding: 9px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      border: none;
      user-select: none;
      background: var(--chord-col, #9cc0ec);
    }

    .chord-chip-text {
      display: flex;
      flex-direction: column;
    }

    .chord-chip-role {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .chord-chip-name {
      font-size: 13px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chord-chip-rn {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9.5px;
      font-weight: 700;
      color: var(--cv-label, #8a6b3f);
    }

    .rhythm-dots-matrix {
      display: grid;
      grid-template-columns: repeat(8, minmax(0, 1fr));
      row-gap: 3px;
      column-gap: 2px;
      align-items: center;
      justify-items: center;
    }

    .rhythm-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.35);
    }

    .rhythm-dot.active {
      width: 7px;
      height: 7px;
      background: #fbf3e6;
    }

    /* Section Actions (Chroma Melody.dc.html:424-427) */
    .section-actions {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }

    .section-card:not(.active) .section-actions {
      display: none;
    }

    .action-btn.section-edit-btn {
      flex: 1;
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 14px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: rgba(46, 39, 31, 0.08);
      color: #2e271f;
      transition: background 150ms ease, transform 100ms ease;
    }

    .action-btn.section-edit-btn:hover {
      background: rgba(46, 39, 31, 0.14);
    }

    .action-btn.section-edit-btn:active {
      transform: scale(0.98);
    }

    .action-btn.primary {
      margin-left: auto;
      min-height: 32px;
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: #2e271f;
      color: #fbf3e6;
    }

    .action-btn.primary:hover {
      background: #463c31;
    }

    .new-section-btn {
      width: 100%;
      min-height: 44px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      background: transparent;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      color: #8a6b3f;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease;
    }

    .new-section-btn:hover {
      background: rgba(251, 243, 230, 0.6);
      border-color: #8a6b3f;
    }
  `;je([k({type:Array})],Te.prototype,"sections",2);je([k({type:Array})],Te.prototype,"timeline",2);je([k({type:Number})],Te.prototype,"activeSectionIdx",2);je([k({type:Number})],Te.prototype,"activeTimelineIdx",2);je([k({type:Number})],Te.prototype,"currentStep",2);je([k({type:Boolean})],Te.prototype,"playing",2);je([k({type:String})],Te.prototype,"mood",2);je([k({type:Number})],Te.prototype,"bpm",2);je([w()],Te.prototype,"draggingIdx",2);je([w()],Te.prototype,"dragOverIdx",2);Te=je([ke("tab-song")],Te);var Vr=Object.defineProperty,Gr=Object.getOwnPropertyDescriptor,We=(t,e,i,o)=>{for(var s=o>1?void 0:o?Gr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Vr(e,i,s),s};const ys=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],xs={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},fi={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},bi={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},Lo={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Jt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function qr(t){const e=t===""?"maj":t;if(Jt[5][e]||Jt[6][e])return e;const i=Lo[e];return i&&(Jt[5][i]||Jt[6][i])?i:"maj"}function Hr(t){const e=qr(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Jt[o][e];if(!n)return;const a=((t.rootPc-s)%12+12)%12;i.push({rootFret:a,frets:n.map(l=>l===null?null:l+a)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function Jr(t){const e=[7,0,4,9],i=t.intervals.map(a=>(t.rootPc+a)%12),o=a=>{const l=new Set(a);let r=null;const c=[],d=p=>{if(p===4){const u=c.map((b,y)=>(e[y]+b)%12);for(const b of l)if(u.indexOf(b)<0)return;for(const b of u)if(!l.has(b))return;const h=c.filter(b=>b>0),g=h.length?Math.max(...h)-Math.min(...h):0;if(g>3)return;const f=g*12+c.reduce((b,y)=>b+y,0);(!r||f<r.score)&&(r={frets:c.slice(),score:f});return}for(let u=0;u<=5;u++)c.push(u),d(p+1),c.pop()};return d(0),r},s=o(i);if(s)return s.frets;const n=o(t.intervals.filter(a=>a!==7).map(a=>(t.rootPc+a)%12));return n?n.frets:null}let Le=class extends we{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Dreamy",key:"C",scaleType:"MAJOR",bpm:120,chords:[]},this.order=[],this.activeIndex=0,this.playing=!1,this.showTheory=!0,this.playInstrument="Piano",this.showDegrees=!1,this.mood="Dreamy"}setInstrument(t){this.playInstrument=t,this.dispatchEvent(new CustomEvent("change-instrument",{detail:{instrument:t},bubbles:!0,composed:!0}))}toggleDegrees(){this.showDegrees=!this.showDegrees}onCardClick(t,e){try{v.playChordAtIndex(e)}catch{}this.dispatchEvent(new CustomEvent("play-chord",{detail:{chord:t,index:e},bubbles:!0,composed:!0}))}renderPianoCard(t,e,i){const o=ge(t.name),s=xs[o.root]??0,n=bi[o.quality]||bi[Lo[o.quality]||"maj"]||[0,4,7],a=20,l=84,r=50,c=[0,2,4,5,7,9,11],d=[],p=[],u=[];for(let f=0;f<2;f++)c.forEach((b,y)=>{d.push({x:(f*7+y)*a,w:a-1.5,h:l})});for(let f=0;f<2;f++)[0,1,3,4,5].forEach(b=>{const y=f*7+b;p.push({x:y*a+a*.64,w:a*.58,h:r})});n.forEach(f=>{const b=s+f,y=Math.floor(b/12),x=b%12,C=c.indexOf(x),I=f===0,$=C<0,N=I?"#F2735F":$?"#FBF3E6":"#2E271F",L=I?"#FBF3E6":$?"#2E271F":"#FBF3E6",E=this.showDegrees?fi[f%12]:"";if(C>=0){const T=y*7+C;u.push({cx:T*a+(a-1.5)/2,cy:l-18,r:8.5,fill:N,isRoot:I,label:E,lc:L})}else{const R=(y*7+c.indexOf(x-1))*a+a*.64,q=a*.58;u.push({cx:R+q/2,cy:r-14,r:7,fill:N,isRoot:I,label:E,lc:L})}});const h=14*a,g=n.map(f=>{const b=ys[(s+f)%12];return this.showDegrees?`${b} (${fi[f%12]})`:b}).join(" · ");return m`
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
            ${this.showTheory&&t.roman?m`<span class="chord-rn">${t.roman}</span>`:ue}
          </div>
        </div>

        <div class="svg-wrap">
          <svg width="${h}" height="${l}" viewBox="0 0 ${h} ${l}">
            ${d.map(f=>re`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
            `)}
            ${p.map(f=>re`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="2" fill="#3A3128"></rect>
            `)}
            ${u.map(f=>re`
              <g>
                <circle cx="${f.cx}" cy="${f.cy}" r="${f.r}" fill="${f.fill}" stroke="${f.isRoot?"#2E271F":"none"}" stroke-width="${f.isRoot?1.5:0}"></circle>
                ${f.label?re`
                  <text x="${f.cx}" y="${f.cy}" dy="3.2" font-size="8.5" font-weight="800" text-anchor="middle" fill="${f.lc}" font-family="'Plus Jakarta Sans',sans-serif">${f.label}</text>
                `:ue}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${g}</div>
      </div>
    `}renderFretCard(t,e,i,o){const s=ge(t.name),n=xs[s.root]??0,a=bi[s.quality]||bi[Lo[s.quality]||"maj"]||[0,4,7],l=[4,9,2,7,11,4],r=[7,0,4,9],c=i==="Ukulele",d=c?r:l,p=c?Jr({root:s.root,rootPc:n,q:s.quality,intervals:a})||[null,null,null,null]:Hr({root:s.root,rootPc:n,q:s.quality})||[null,null,null,null,null,null],u=18,h=24,g=4,f=16,b=d.length,y=p.filter(O=>O!==null&&O>0),x=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,C=[],I=[],$=[],N=[],L=[];for(let O=0;O<b;O++)C.push({x:O*u});for(let O=0;O<=g;O++)I.push({y:f+O*h,sw:O===0&&x===0?3:1.2});p.forEach((O,V)=>{const oe=V*u;if(O===null){L.push({x:oe});return}if(O===0){N.push({x:oe});return}const Y=((d[V]+O-n)%12+12)%12;$.push({cx:oe,cy:f+(O-x-.5)*h,fill:Y===0?"#F2735F":"#2E271F",label:this.showDegrees?fi[((d[V]+O-n)%12+12)%12]:""})});const E=(b-1)*u,T=(b-1)*u+26,R=f+g*h+12,q=x>0?`${x+1}fr`:"",H=x>0,B=a.map(O=>{const V=ys[(n+O)%12];return this.showDegrees?`${V} (${fi[O%12]})`:V}).join(" · ");return m`
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
            ${this.showTheory&&t.roman?m`<span class="chord-rn">${t.roman}</span>`:ue}
          </div>
          ${H?m`<span class="pos-badge">${q}</span>`:ue}
        </div>

        <div class="svg-wrap">
          <svg width="${T}" height="${R}" viewBox="-13 -2 ${T} ${R}">
            ${I.map(O=>re`
              <rect x="0" y="${O.y}" width="${E}" height="${O.sw}" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${C.map(O=>re`
              <rect x="${O.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${N.map(O=>re`
              <circle cx="${O.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
            `)}
            ${L.map(O=>re`
              <text x="${O.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
            `)}
            ${$.map(O=>re`
              <g>
                <circle cx="${O.cx}" cy="${O.cy}" r="${O.fill==="#F2735F"?7.5:7}" fill="${O.fill}"></circle>
                ${O.label?re`
                  <text x="${O.cx}" y="${O.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${O.label}</text>
                `:ue}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${B}</div>
      </div>
    `}render(){const t=this.progression?.chords||[],e=["Piano","Guitar","Ukulele"],i=this.playInstrument==="Piano"?"One voicing per chord, root position — the red dot is the root, play left to right.":this.playInstrument==="Guitar"?"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.":"Standard G-C-E-A tuning — the red dot is the root, ○ is an open string, × is muted.";return m`
      <div class="play-panel">
        <!-- Header row: tier-2 instrument, degrees switch, hint -->
        <div class="panel-header">
          <div class="tier2-control" role="tablist" aria-label="Instrument selector">
            ${e.map(o=>m`
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

          <div class="header-right">
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

            <div class="hint-banner">${i}</div>
          </div>
        </div>

        <!-- Visualizer Content -->
        ${this.playInstrument==="Piano"?m`
              <div class="piano-grid">
                ${t.map((o,s)=>this.renderPianoCard(o,s,this.playing&&this.activeIndex===s))}
              </div>
            `:m`
              <div class="fret-grid">
                ${t.map((o,s)=>this.renderFretCard(o,s,this.playInstrument,this.playing&&this.activeIndex===s))}
              </div>
            `}
      </div>
    `}};Le.styles=xe`
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

    /* The app's ONE main tinted panel wraps this tab; no second panel here (design: one skeleton) */
    .play-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Header row (Chroma Melody Play it): tier-2 + degrees switch + hint on one wrapping row */
    .panel-header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px 16px;
    }

    .header-right {
      display: contents;
    }

    .hint-banner {
      flex: 1;
      min-width: 200px;
      font-size: 12.5px;
      line-height: 1.6;
      color: #6b5f50;
    }

    @media (max-width: 899px) {
      .panel-header {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
      }
      .tier2-control {
        align-self: flex-start;
        max-width: 100%;
        flex-wrap: wrap;
      }
      .degrees-switch {
        margin-top: 13px;
        padding-top: 13px;
        border-top: 1px solid rgba(46, 39, 31, 0.09);
      }
      .hint-banner {
        min-width: 0;
        font-size: 12px;
        margin-top: 11px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(46, 39, 31, 0.09);
      }
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
      gap: 10px;
      cursor: pointer;
      user-select: none;
      font-size: 13px;
      font-weight: 700;
      color: #6b5f50;
      min-height: 32px;
    }

    .degrees-switch:hover {
      color: #2e271f;
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
      background: var(--cv-mood-color, var(--cv-purple, #C9A9E0));
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

    /* Grid Layouts */
    .piano-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 14px;
      margin-top: 20px;
    }

    @media (max-width: 899px) {
      .piano-grid,
      .fret-grid {
        grid-template-columns: 1fr;
        gap: 12px;
        margin-top: 18px;
      }
    }

    .fret-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 14px;
      margin-top: 20px;
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
  `;We([k({type:Object})],Le.prototype,"progression",2);We([k({type:Array})],Le.prototype,"order",2);We([k({type:Number})],Le.prototype,"activeIndex",2);We([k({type:Boolean})],Le.prototype,"playing",2);We([k({type:Boolean})],Le.prototype,"showTheory",2);We([k({type:String})],Le.prototype,"playInstrument",2);We([k({type:Boolean})],Le.prototype,"showDegrees",2);We([k({type:String})],Le.prototype,"mood",2);Le=We([ke("tab-play")],Le);var Yr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,qe=(t,e,i,o)=>{for(var s=o>1?void 0:o?Wr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Yr(e,i,s),s};let Fe=class extends we{constructor(){super(...arguments),this.sets=[],this.activeId=null,this.moodColor="#C9A9E0",this.query="",this.selectMode=!1,this.selected=[],this.renamingId=null,this.draftName="",this.confirmId=null}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}get visible(){const t=this.query.trim().toLowerCase();return t?this.sets.filter(e=>`${e.name} ${e.genre} ${e.mood} ${(e.chords||[]).map(i=>i.name).join(" ")}`.toLowerCase().includes(t)):this.sets}toggleSelectMode(){this.selectMode=!this.selectMode,this.selected=[],this.confirmId=null,this.renamingId=null}toggleSelected(t){this.selected=this.selected.includes(t)?this.selected.filter(e=>e!==t):[...this.selected,t]}startRename(t,e){e.stopPropagation(),this.renamingId=t.id,this.draftName=t.name,this.confirmId=null,this.updateComplete.then(()=>this.shadowRoot?.querySelector(".rename-input")?.select())}commitRename(){const t=this.renamingId,e=this.draftName.trim();if(this.renamingId=null,t&&e){const i=this.sets.find(o=>o.id===t);i&&i.name!==e&&this.emit("rename-set",{id:t,name:e})}}deleteSelected(){this.selected.forEach(t=>this.emit("delete-set",t)),this.selected=[],this.selectMode=!1}onPrimary(t){this.selectMode?this.toggleSelected(t.id):this.emit("select-set",t)}render(){if(!this.sets.length)return m`<div class="empty">Nothing saved yet. Use Save to keep the loop you’re on.</div>`;const t=this.visible,e=`Your loops · ${this.sets.length}`;return m`
      <div style="--mood: ${this.moodColor};">
        <div class="head">
          <div class="title">${e}</div>
          <button class="select-btn" @click=${this.toggleSelectMode}>${this.selectMode?"Done":"Select"}</button>
        </div>

        ${this.sets.length>2?m`
          <div class="search">
            <input
              type="text"
              placeholder="Search loops"
              aria-label="Search loops"
              .value=${this.query}
              @input=${i=>{this.query=i.target.value}}
            />
          </div>
        `:ue}

        <div class="list">
          ${t.map(i=>{const o=this.selected.includes(i.id),s=this.renamingId===i.id,n=this.confirmId===i.id;return m`
              <div class="row ${i.id===this.activeId?"active":""} ${o?"checked":""}">
                ${this.selectMode?m`
                  <button class="check ${o?"on":""}" role="checkbox" aria-checked=${o} aria-label="Select ${i.name}" @click=${()=>this.toggleSelected(i.id)}>${o?"✓":""}</button>
                `:ue}

                ${s?m`
                  <div class="main">
                    <input
                      class="rename-input"
                      .value=${this.draftName}
                      aria-label="Rename loop"
                      @input=${a=>{this.draftName=a.target.value}}
                      @keydown=${a=>{a.key==="Enter"&&this.commitRename(),a.key==="Escape"&&(this.renamingId=null)}}
                      @blur=${()=>this.commitRename()}
                    />
                  </div>
                `:m`
                  <button class="main" @click=${()=>this.onPrimary(i)}>
                    <span class="name-line">
                      <span class="dots">
                        ${(i.chords||[]).map(a=>m`<span style="background: ${a.color||se(a.tension??.2).color};"></span>`)}
                      </span>
                      <span class="name">${i.name}</span>
                    </span>
                    <span class="meta">${i.genre} · ${i.mood}</span>
                  </button>
                `}

                ${!this.selectMode&&!n&&!s?m`
                  <div class="actions">
                    <button class="icon-btn" aria-label="Rename loop" @click=${a=>this.startRename(i,a)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                    </button>
                    <button class="icon-btn" aria-label="Delete loop" @click=${a=>{a.stopPropagation(),this.confirmId=i.id}}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                    </button>
                  </div>
                `:ue}

                ${n?m`
                  <div class="actions">
                    <button class="confirm-btn" @click=${a=>{a.stopPropagation(),this.confirmId=null,this.emit("delete-set",i.id)}}>Delete</button>
                    <button class="icon-btn" aria-label="Cancel" @click=${a=>{a.stopPropagation(),this.confirmId=null}}>×</button>
                  </div>
                `:ue}
              </div>
            `})}
        </div>

        ${t.length===0?m`<div class="empty">No loops match that.</div>`:ue}

        ${this.selectMode?m`
          <button class="bulk-delete" ?disabled=${!this.selected.length} @click=${this.deleteSelected}>
            ${this.selected.length?`Delete ${this.selected.length}`:"Pick loops to delete"}
          </button>
        `:ue}
      </div>
    `}};Fe.styles=xe`
    :host {
      display: block;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    * { box-sizing: border-box; }

    button, input { font-family: inherit; }

    .head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 6px 8px;
    }

    .title {
      flex: 1;
      min-width: 0;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .select-btn {
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 11.5px;
      font-weight: 800;
      min-height: 32px;
      padding: 0 12px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 140ms ease;
    }

    .select-btn:hover { background: var(--cv-surface-2, #F1E4CC); }

    .search {
      padding: 0 4px 9px;
    }

    .search input {
      width: 100%;
      border: none;
      outline: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
    }

    .search input:focus-visible { box-shadow: 0 0 0 2px #9B7CA8; }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 0 7px 6px;
      border-radius: 14px;
      min-height: 44px;
      transition: background 140ms ease;
    }

    .row:hover { background: var(--cv-surface, #F6EADB); }
    .row.active { background: var(--cv-surface-2, #F1E4CC); }
    .row.checked { background: var(--cv-surface, #F6EADB); }

    .check {
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 7px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .check.on {
      background: var(--mood, #C9A9E0);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }

    .main {
      flex: 1;
      min-width: 0;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      padding: 0;
      color: inherit;
    }

    .name-line {
      display: flex;
      gap: 7px;
      align-items: center;
      min-width: 0;
    }

    .dots {
      display: flex;
      gap: 3px;
      align-items: center;
      flex-shrink: 0;
    }

    .dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .dots span:nth-child(even) { border-radius: 2px; }

    .name {
      flex: 1;
      min-width: 0;
      font-size: 13.5px;
      font-weight: 800;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: block;
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.35;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rename-input {
      width: 100%;
      border: none;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
      border-radius: 11px;
      outline: none;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      padding: 9px 11px;
    }

    .actions {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
      align-items: center;
    }

    .icon-btn {
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      color: #5B5145;
      font-size: 17px;
      transition: background 140ms ease;
    }

    .icon-btn:hover { background: var(--cv-cream, #FBF3E6); }

    .confirm-btn {
      border: none;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 11.5px;
      font-weight: 800;
      padding: 9px 12px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .confirm-btn:hover { background: #C6564B; }

    .empty {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 8px 6px;
    }

    .bulk-delete {
      width: 100%;
      margin-top: 8px;
      border: none;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 12.5px;
      font-weight: 800;
      min-height: 44px;
      border-radius: 100px;
      cursor: pointer;
    }

    .bulk-delete:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `;qe([k({type:Array})],Fe.prototype,"sets",2);qe([k({type:String})],Fe.prototype,"activeId",2);qe([k({type:String})],Fe.prototype,"moodColor",2);qe([w()],Fe.prototype,"query",2);qe([w()],Fe.prototype,"selectMode",2);qe([w()],Fe.prototype,"selected",2);qe([w()],Fe.prototype,"renamingId",2);qe([w()],Fe.prototype,"draftName",2);qe([w()],Fe.prototype,"confirmId",2);Fe=qe([ke("loops-library")],Fe);var Kr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,Ce=(t,e,i,o)=>{for(var s=o>1?void 0:o?Xr(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&Kr(e,i,s),s};const Qr=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Zr=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],el=[{label:"Root",id:"root"},{label:"1st Inv",id:"inv1"},{label:"2nd Inv",id:"inv2"},{label:"+1 Oct",id:"octUp"},{label:"-1 Oct",id:"octDown"}],pt={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"};let ye=class extends we{constructor(){super(...arguments),this.progression=null,this.selectedChordIndex=null,this.selectedBand=null,this.showTheory=!1,this.isSaved=!1,this.saveState="new",this.savedSets=[],this.activeSetId=null,this.libraryOpen=!1,this.moodColor="#F2735F",this.abPick=null,this.activeSwapFamily="",this.swapIndex=null}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}onBarClick(t){this.dispatchEvent(new CustomEvent("chord-select",{detail:{index:t},bubbles:!0,composed:!0}))}onCloseSwap(){this.dispatchEvent(new CustomEvent("swap-close-request",{bubbles:!0,composed:!0}))}onCloseDetail(){this.dispatchEvent(new CustomEvent("close-detail",{bubbles:!0,composed:!0}))}onToggleSave(){this.dispatchEvent(new CustomEvent("toggle-save",{bubbles:!0,composed:!0}))}onToggleLibrary(){this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("toggle-library",{detail:{open:this.libraryOpen},bubbles:!0,composed:!0}))}onChangeQuality(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-quality",{detail:{quality:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeExtension(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-extension",{detail:{extension:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeVoicing(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-voicing",{detail:{voicing:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}render(){const t=this.progression?.chords||[],e=this.moodColor||Lt(this.progression?.mood||"Warm");return m`
      <div class="inspector-panel" style="--mood-color: ${e};">
        ${this.selectedChordIndex!==null&&t[this.selectedChordIndex]?this.renderChordDetail(t[this.selectedChordIndex],t):this.swapIndex!==null&&t[this.swapIndex]?this.renderSwapAudition(t):this.renderIdleOverview(t,e)}
      </div>
    `}renderTheory(t){if(!this.showTheory)return"";const e=tn(t),i=on(t),o=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR";return m`

          <div class="theory-box">
            <div class="theory-row">
              <span class="theory-key">Key<span style="display: none;"> &amp; Scale</span></span>
              <span class="theory-val">${o.replace("b","♭")} ${s.toLowerCase()==="minor"?"Minor":"Major"}</span>
            </div>
            <div class="theory-row formula-row">
              <span class="theory-key">Formula</span>
              <span class="theory-val formula-val">${t.map(n=>n.roman||"").filter(Boolean).join(" – ")}</span>
            </div>

            ${e.length?m`
              <div class="cadences-section">
                <div class="theory-section-kicker">Cadences</div>
                <div class="cadences-list">
                  ${e.map(n=>m`
                    <div class="cadence-card">
                      <div class="cadence-head">
                        <span class="cadence-name">${n.name}</span>
                        <span class="cadence-bars">${n.bars}</span>
                      </div>
                      ${n.move?m`
                        <div class="cadence-move-row">
                          <span class="cadence-move">${n.move}</span>
                          ${n.degrees?m`<span class="cadence-degrees">${n.degrees}</span>`:""}
                        </div>
                      `:""}
                      <div class="cadence-desc">${n.why}</div>
                    </div>
                  `)}
                </div>
              </div>
            `:""}

            ${i.length?m`
              <div class="voice-leading-section">
                <div class="theory-section-kicker">Voice leading</div>
                <div class="voice-links-list">
                  ${i.map(n=>m`
                    <div class="voice-link-row">
                      <div class="voice-link-left">
                        <div class="voice-link-chords">${n.chords}</div>
                        <div class="voice-link-move">${n.move}</div>
                      </div>
                      <div class="voice-link-right ${n.hasShared?"shared":""}">${n.link}</div>
                    </div>
                  `)}
                </div>
              </div>
            `:""}

            ${this.progression?.note?m`
              <div class="theory-note-text">${this.progression.note}</div>
            `:""}
          </div>
            `}renderIdleOverview(t,e){const i=t.map(d=>d.tension||.1),o=Math.max(...i,.1),s=Math.min(...i,0),n=i.indexOf(o),a=i.every((d,p)=>p===0||d>=i[p-1]),l=o-s<.28?"Stays close to home":a?"A steady climb":i[i.length-1]<.25&&n<i.length-1?"Away, then home":"Drifts, then settles",r=`Opens ${pt[t[0]?.functionLabel]||"HOME"} and ${o-s<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":a?`tightens chord by chord, peaking on ${t[n]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[n]?.name||"the middle"} before easing back down home.`}`,c=this.selectedBand?me(this.selectedBand):null;return m`
      <div class="inspector-top-row">
        <div class="header-row">
          <div>
            <div class="kicker">THIS LOOP</div>
            <div class="main-title">${l}</div>
          </div>
          <div class="header-actions">
            <button
              class="action-btn ${this.isSaved?"saved":""} ${this.saveState==="edited"?"edited":""}"
              @click=${this.onToggleSave}
              aria-label="${this.isSaved?"Saved loop":"Save loop"}"
              title="${this.saveState==="edited"?"Changed since you saved it":""}"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="${this.isSaved?"#2E271F":"none"}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
              ${this.isSaved?"Saved":"Save"}
            </button>
            <button
              class="action-btn ${this.libraryOpen?"open":""}"
              @click=${this.onToggleLibrary}
              aria-label="Your saved loops"
              aria-expanded=${this.libraryOpen?"true":"false"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10"/>
              </svg>
              ${this.savedSets.length?`Loops · ${this.savedSets.length}`:"Loops"}
            </button>

            ${this.libraryOpen?m`
              <div class="popover-menu">
                <loops-library
                  .sets=${this.savedSets}
                  .activeId=${this.activeSetId}
                  .moodColor=${this.moodColor}
                ></loops-library>
              </div>
            `:""}
          </div>
        </div>
      </div>

      <div class="inspector-body">
        <!-- Arc Bars Chart (Height: 152px) -->
        <div class="arc-bars-container">
          ${t.map((d,p)=>{const u=se(d.tension??.1),h=Math.max(18,Math.round(18+(d.tension??.1)*62));return m`
              <button
                class="arc-bar-col ${this.selectedChordIndex===p?"selected":""}"
                @click=${()=>this.onBarClick(p)}
                aria-label="${d.name}, ${pt[d.functionLabel]||""}"
              >
                <div class="bar-pod">
                  <div class="bar-fill" style="height: ${h}px; background: ${u.color};"></div>
                </div>
                <div class="bar-meta">
                  <div class="bar-chord-name">${d.name}</div>
                  <div class="bar-role-hint">${pt[d.functionLabel]||""}</div>
                </div>
              </button>
            `})}
        </div>
        <div class="arc-hint-text">Taller means more unresolved.</div>
        <div class="arc-sentence-text">${r}</div>

        ${this.renderTheory(t)}

        ${c?m`
          <div class="band-card">
            <div class="band-card-head">
              <div class="band-swatch" style="background: ${c.color};"></div>
              <div class="band-card-kicker">How they write</div>
              <div
                class="band-card-name"
                style="font-family: ${c.font}; font-weight: ${c.weight||400}; font-style: ${c.italic?"italic":"normal"}; font-size: ${(c.pillFs||13)+1}px; letter-spacing: ${c.pillTrack||"normal"};"
              >${c.name}</div>
            </div>
            ${c.sig.map(d=>m`
              <div class="band-sig-row">
                <div class="band-sig-k">${d.k}</div>
                <div class="band-sig-v">${d.v}</div>
              </div>
            `)}
          </div>
        `:""}

        <div class="hint-card">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${e}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
          <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
        </div>
      </div>
    `}renderChordDetail(t,e){const i=this.getChordQualityLabel(t.name),o=this.getChordExtensionLabel(t.name),s=U(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=en(t.name,s),a=se(t.tension||.1);return m`
      <div class="inspector-top-row">
        <div class="header-row">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div class="badge-icon" style="background: ${a.color};"></div>
            <div>
              <div class="kicker">CHORD · ${pt[t.functionLabel]||"HOME"}</div>
              <div class="main-title" style="display: flex; align-items: baseline; gap: 8px;">
                ${t.name}
                ${t.roman?m`<span style="font-size: 13px; font-weight: 700; color: var(--cv-label); font-family: var(--cv-font-mono, monospace);">${t.roman}</span>`:""}
              </div>
              <div class="sub-role">${pt[t.functionLabel]||t.functionLabel}</div>
            </div>
          </div>
          <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close chord details">×</button>
        </div>
      </div>

      <div class="inspector-body">
        <!-- Notes Pills -->
        <div>
          <div class="section-kicker">Notes</div>
          <div class="notes-pill-row">
            ${(t.notes||[]).map(l=>m`
              <div class="note-pill">${l.replace(/\d+$/,"")}</div>
            `)}
          </div>
        </div>

      <!-- Interval Breakdown & Guide Tones -->
      ${n.length?m`
        <div>
          <div class="section-kicker">Intervals &amp; Guide Tones</div>
          <div class="interval-grid">
            ${n.map(l=>m`
              <div class="interval-token ${l.isGuideTone?"guide":""}">
                <div class="interval-note">${l.note}</div>
                <div class="interval-symbol">${l.intervalSymbol}</div>
                <div class="interval-role">${l.roleName}</div>
              </div>
            `)}
          </div>
        </div>
      `:""}

      <!-- Quality Selection -->
      <div>
        <div class="section-kicker">Quality</div>
        <div class="chips-grid">
          ${Qr.map(l=>{const r=l.label===i;return m`
              <button
                class="option-chip ${r?"active":""}"
                @click=${()=>this.onChangeQuality(l.label)}
                aria-pressed="${r}"
              >
                <div class="chip-title">${l.label}</div>
                <div class="chip-desc">${l.sub}</div>
              </button>
            `})}
        </div>
      </div>

      <!-- Extension Selection -->
      <div>
        <div class="section-kicker">Extension</div>
        <div class="chips-grid">
          ${Zr.map(l=>{const r=l.label===o;return m`
              <button
                class="option-chip ${r?"active":""}"
                @click=${()=>this.onChangeExtension(l.label)}
                aria-pressed="${r}"
              >
                <div class="chip-title">${l.label}</div>
                <div class="chip-desc">${l.sub}</div>
              </button>
            `})}
        </div>
      </div>

      <!-- Voicing / Inversion Selection -->
      <div>
        <div class="section-kicker">Voicing</div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${el.map(l=>m`
            <button
              class="action-btn"
              @click=${()=>this.onChangeVoicing(l.id)}
            >
              ${l.label}
            </button>
          `)}
        </div>
      </div>
    </div>
    `}renderSwapAudition(t){const e=this.swapIndex??0,i=t[e],o=se(i?.tension??.1),s=this.abPick;return m`
      <div class="inspector-top-row">
        <div class="header-row">
          <div style="min-width: 0;">
            <div class="kicker" style="font-size: 10px;">Swapping Bar ${e+1}</div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
              <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1;">${i?.name||""}</div>
              ${i?.roman?m`<div style="font-family: var(--cv-font-mono, 'Space Mono', monospace); font-size: 11px; font-weight: 700; color: #8A6B3F;">${i.roman}</div>`:""}
              <div style="font-size: 12px; font-weight: 700; color: rgba(46, 39, 31, 0.45);">${pt[i?.functionLabel||""]||i?.functionLabel||""}</div>
            </div>
          </div>
          <button class="close-btn" style="width: 44px; height: 44px; margin: -8px -10px 0 0;" @click=${this.onCloseSwap} aria-label="Close swap">\u00D7</button>
        </div>
      </div>

      <div class="inspector-body">
        ${s?m`
          <div class="audition-block">
            <div class="kicker" style="font-size: 10px; margin: 0;">Auditioning \u00B7 ${this.activeSwapFamily||"Substitution"}</div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
              <div style="font-size: 21px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;">${s.name||s.chord}</div>
              ${s.roman?m`<div style="font-size: 11px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label, #8A6B3F);">${s.roman}</div>`:""}
            </div>
            ${s.desc||s.functionLabel?m`<div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">${s.desc||pt[s.functionLabel]||s.functionLabel}</div>`:""}
            ${s.notes?.length?m`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; margin-top: 10px;">${s.notes.map(n=>n.replace(/\d+$/,"")).join(" · ")}</div>`:""}
          </div>
        `:m`
          <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted);">
            Pick a feeling under the loop, then a chord inside it. What it does and how it voices shows up here.
          </div>
        `}
        <div style="height: 3px; background: ${o.color}; border-radius: 2px; opacity: 0.7;"></div>
        ${this.renderTheory(t)}
      </div>
    `}};ye.styles=xe`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
      background: var(--cv-surface, #F6EADB);
    }

    button, input, select {
      font-family: inherit;
    }

    .inspector-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }

    .inspector-top-row {
      position: relative;
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .inspector-body {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 22px 22px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      /* soft fade where the column scrolls under the edge (design) */
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 22px), transparent 100%);
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 22px), transparent 100%);
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
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 4px;
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
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .action-btn, .pill-btn {
      flex-shrink: 0;
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
      box-shadow: none;
      transition: background 150ms ease, transform 120ms ease;
    }

    .action-btn:hover, .pill-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    .action-btn:active, .pill-btn:active {
      transform: scale(0.96);
    }

    .action-btn.saved, .pill-btn.saved {
      background: var(--mood-color, #F2735F);
      color: #2E271F;
    }

    .action-btn.edited::after {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--mood-color, #F2735F);
      box-shadow: 0 0 0 1.5px #2E271F;
    }

    .action-btn.open, .pill-btn.open {
      background: var(--cv-surface-2, #F1E4CC);
    }

    .close-btn {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
      flex-shrink: 0;
    }

    .close-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    /* Popover */
    .popover-menu {
      position: absolute;
      top: calc(100% - 4px);
      left: 14px;
      right: 14px;
      z-index: 100;
      max-height: calc(100vh - 220px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 18px;
      padding: 12px;
      box-shadow: 0 20px 44px -14px rgba(46, 39, 31, 0.35);
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

    /* Tension Arc Chart (Height: 152px) */
    .arc-bars-container {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 152px;
      padding: 0 2px;
      box-sizing: border-box;
    }

    .arc-bar-col {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      border-radius: 12px;
      padding: 4px 2px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background 120ms ease;
    }

    .arc-bar-col:hover {
      background: var(--cv-cream, #FBF3E6);
    }

    .bar-pod {
      height: 80px;
      flex-shrink: 0;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .bar-fill {
      width: 100%;
      max-width: 34px;
      border-radius: 100px;
      transition: height 240ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease, box-shadow 150ms ease, transform 150ms ease;
    }

    .arc-bar-col:hover .bar-fill {
      transform: scaleY(1.03);
      transform-origin: bottom;
    }

    .arc-bar-col.selected .bar-fill {
      box-shadow: 0 0 0 2px #2E271F;
    }

    .bar-meta {
      flex-shrink: 0;
      width: 100%;
      min-height: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding-top: 6px;
    }

    .bar-chord-name {
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
      white-space: nowrap;
    }

    .bar-role-hint {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.5);
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
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #5B5145);
    }

    /* Band card: "How they write" */
    .band-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 16px;
      padding: 13px 15px 15px;
    }

    .band-card-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .band-swatch {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }

    .band-card-kicker {
      flex: 1;
      min-width: 0;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .band-card-name {
      line-height: 1.15;
      color: #2E271F;
      flex-shrink: 0;
    }

    .band-sig-row {
      margin-top: 12px;
    }

    .band-sig-row + .band-sig-row {
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .band-sig-k {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .band-sig-v {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.5;
      color: var(--cv-ink, #2E271F);
      margin-top: 3px;
    }

    /* Hint card at the bottom of the idle column */
    .hint-card {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 11px 13px;
      margin-top: 2px;
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .hint-card svg {
      flex-shrink: 0;
      margin-top: 1px;
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

    /* Theory Details (Matches Chroma Melody prototype lines 795-838) */
    .theory-box {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }

    .theory-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .theory-row.formula-row {
      margin-top: 9px;
      padding-top: 9px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .theory-key {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      flex-shrink: 0;
    }

    .theory-val {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .formula-val {
      letter-spacing: 0.3px;
      text-align: right;
    }

    .theory-section-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin: 20px 0 9px;
    }

    .voice-leading-section .theory-section-kicker {
      margin: 20px 0 4px;
    }

    .cadences-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .cadence-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 15px;
      padding: 11px 13px;
      border: none;
      box-shadow: none;
    }

    .cadence-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }

    .cadence-name {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .cadence-bars {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: var(--cv-label, #8A6B3F);
      white-space: nowrap;
    }

    .cadence-move-row {
      display: flex;
      align-items: baseline;
      gap: 7px;
      margin-top: 5px;
      flex-wrap: wrap;
    }

    .cadence-move {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .cadence-degrees {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.4px;
      color: rgba(46, 39, 31, 0.45);
    }

    .cadence-desc {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 5px;
      text-wrap: pretty;
    }

    .voice-links-list {
      display: flex;
      flex-direction: column;
    }

    .voice-link-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      padding: 9px 0;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      border-bottom: none;
    }

    .voice-link-left {
      min-width: 0;
    }

    .voice-link-chords {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .voice-link-move {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-top: 2px;
    }

    .voice-link-right {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.4);
      text-align: right;
      white-space: nowrap;
    }

    .voice-link-right.shared {
      color: var(--cv-ink-muted, #6B5F50);
    }

    .theory-note-text {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 14px;
      text-wrap: pretty;
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
  `;Ce([k({type:Object})],ye.prototype,"progression",2);Ce([k({type:Number})],ye.prototype,"selectedChordIndex",2);Ce([k({type:String})],ye.prototype,"selectedBand",2);Ce([k({type:Boolean})],ye.prototype,"showTheory",2);Ce([k({type:Boolean})],ye.prototype,"isSaved",2);Ce([k({type:String})],ye.prototype,"saveState",2);Ce([k({type:Array})],ye.prototype,"savedSets",2);Ce([k({type:String})],ye.prototype,"activeSetId",2);Ce([k({type:Boolean})],ye.prototype,"libraryOpen",2);Ce([k({type:String})],ye.prototype,"moodColor",2);Ce([k({type:Object})],ye.prototype,"abPick",2);Ce([k({type:String})],ye.prototype,"activeSwapFamily",2);Ce([k({type:Number})],ye.prototype,"swapIndex",2);ye=Ce([ke("chord-inspector")],ye);class Mt{constructor(){this.midiAccess=null,this.selectedOutputId=null,this.selectedInputId=null,this.status="idle",this.errorMessage="",this.listeners=new Set,this.routing={chordsChannel:1,chordsInternalAudio:!0,melodyChannel:2,melodyInternalAudio:!0},this.loadSettings()}static getInstance(){return Mt.instance||(Mt.instance=new Mt),Mt.instance}loadSettings(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem("chroma-chords-midi-routing");e&&(this.routing={...this.routing,...JSON.parse(e)}),this.selectedOutputId=localStorage.getItem("chroma-chords-midi-output")||null,this.selectedInputId=localStorage.getItem("chroma-chords-midi-input")||null}catch{}}saveSettings(){if(!(typeof localStorage>"u"))try{localStorage.setItem("chroma-chords-midi-routing",JSON.stringify(this.routing)),this.selectedOutputId?localStorage.setItem("chroma-chords-midi-output",this.selectedOutputId):localStorage.removeItem("chroma-chords-midi-output"),this.selectedInputId?localStorage.setItem("chroma-chords-midi-input",this.selectedInputId):localStorage.removeItem("chroma-chords-midi-input")}catch{}}isSupported(){return typeof navigator<"u"&&typeof navigator.requestMIDIAccess=="function"}async connect(){if(!this.isSupported())return this.status="unsupported",this.errorMessage="Web MIDI is not supported in this browser.",this.notify(),!1;try{this.midiAccess=await navigator.requestMIDIAccess({sysex:!1}),this.status="connected",this.errorMessage="";const e=this.getOutputs();return!this.selectedOutputId&&e.length>0&&(this.selectedOutputId=e[0].id),this.midiAccess.onstatechange=()=>{this.notify()},this.saveSettings(),this.notify(),!0}catch(e){return this.status="error",this.errorMessage=e?.message||"Failed to access MIDI devices.",this.notify(),!1}}getStatus(){return this.status}getErrorMessage(){return this.errorMessage}getOutputs(){if(!this.midiAccess)return[];const e=[];try{const i=this.midiAccess.outputs.values();for(const o of i)e.push({id:o.id,name:o.name||`Output ${o.id}`,manufacturer:o.manufacturer})}catch{}return e}getInputs(){if(!this.midiAccess)return[];const e=[];try{const i=this.midiAccess.inputs.values();for(const o of i)e.push({id:o.id,name:o.name||`Input ${o.id}`,manufacturer:o.manufacturer})}catch{}return e}getSelectedOutput(){return this.selectedOutputId}setSelectedOutput(e){this.selectedOutputId=e,this.saveSettings(),this.notify()}getSelectedInput(){return this.selectedInputId}setSelectedInput(e){this.selectedInputId=e,this.saveSettings(),this.notify()}setRouting(e){this.routing={...this.routing,...e},this.saveSettings(),this.notify()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.status))}getActiveOutputDevice(){return!this.midiAccess||!this.selectedOutputId?null:this.midiAccess.outputs.get(this.selectedOutputId)||null}sendNoteOn(e,i=100,o=1){const s=this.getActiveOutputDevice();if(!s)return;const a=144|Math.max(0,Math.min(15,o-1));try{s.send([a,Math.max(0,Math.min(127,e)),Math.max(0,Math.min(127,i))])}catch{}}sendNoteOff(e,i=1){const o=this.getActiveOutputDevice();if(!o)return;const n=128|Math.max(0,Math.min(15,i-1));try{o.send([n,Math.max(0,Math.min(127,e)),0])}catch{}}sendTestNote(e=1){this.sendNoteOn(60,100,e),setTimeout(()=>{this.sendNoteOff(60,e)},400)}}const ce=Mt.getInstance();var tl=Object.defineProperty,il=Object.getOwnPropertyDescriptor,Ne=(t,e,i,o)=>{for(var s=o>1?void 0:o?il(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&tl(e,i,s),s};let $e=class extends we{constructor(){super(...arguments),this.isOpen=!1,this.status="idle",this.outputs=[],this.inputs=[],this.selectedOutput=null,this.selectedInput=null,this.chordsChannel=1,this.chordsInternalAudio=!0,this.melodyChannel=2,this.melodyInternalAudio=!0,this.errorMessage="",this.testNotePlaying=!1}connectedCallback(){super.connectedCallback(),this.syncFromService(),this.unsubscribe=ce.subscribe(()=>{this.syncFromService()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe&&this.unsubscribe()}syncFromService(){this.status=ce.getStatus(),this.errorMessage=ce.getErrorMessage(),this.outputs=ce.getOutputs(),this.inputs=ce.getInputs(),this.selectedOutput=ce.getSelectedOutput(),this.selectedInput=ce.getSelectedInput(),this.chordsChannel=ce.routing.chordsChannel,this.chordsInternalAudio=ce.routing.chordsInternalAudio,this.melodyChannel=ce.routing.melodyChannel,this.melodyInternalAudio=ce.routing.melodyInternalAudio}async onConnect(){await ce.connect(),this.syncFromService()}onSendTest(){this.testNotePlaying=!0,ce.sendTestNote(this.chordsChannel),setTimeout(()=>{this.testNotePlaying=!1},450)}onOutputChange(t){const e=t.target.value;ce.setSelectedOutput(e||null)}onInputChange(t){const e=t.target.value;ce.setSelectedInput(e||null)}onChordsChannelChange(t){const e=parseInt(t.target.value,10);this.chordsChannel=e,ce.setRouting({chordsChannel:e})}onMelodyChannelChange(t){const e=parseInt(t.target.value,10);this.melodyChannel=e,ce.setRouting({melodyChannel:e})}toggleChordsAudio(){this.chordsInternalAudio=!this.chordsInternalAudio,ce.setRouting({chordsInternalAudio:this.chordsInternalAudio})}toggleMelodyAudio(){this.melodyInternalAudio=!this.melodyInternalAudio,ce.setRouting({melodyInternalAudio:this.melodyInternalAudio})}onClose(){this.isOpen=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const t=Array.from({length:16},(e,i)=>i+1);return m`
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
            ${this.errorMessage?m`<div class="error-banner">${this.errorMessage}</div>`:ue}

            <!-- Hardware Devices -->
            <div class="form-group">
              <span class="section-label">HARDWARE OUTPUT</span>
              <select class="select-control" @change=${this.onOutputChange}>
                <option value="">No MIDI output device selected</option>
                ${this.outputs.map(e=>m`
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
                ${this.inputs.map(e=>m`
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
                      ${t.map(e=>m`
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
                      ${t.map(e=>m`
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
    `}};$e.styles=xe`
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
  `;Ne([k({type:Boolean})],$e.prototype,"isOpen",2);Ne([w()],$e.prototype,"status",2);Ne([w()],$e.prototype,"outputs",2);Ne([w()],$e.prototype,"inputs",2);Ne([w()],$e.prototype,"selectedOutput",2);Ne([w()],$e.prototype,"selectedInput",2);Ne([w()],$e.prototype,"chordsChannel",2);Ne([w()],$e.prototype,"chordsInternalAudio",2);Ne([w()],$e.prototype,"melodyChannel",2);Ne([w()],$e.prototype,"melodyInternalAudio",2);Ne([w()],$e.prototype,"errorMessage",2);Ne([w()],$e.prototype,"testNotePlaying",2);$e=Ne([ke("midi-modal")],$e);var ol=Object.defineProperty,sl=Object.getOwnPropertyDescriptor,Be=(t,e,i,o)=>{for(var s=o>1?void 0:o?sl(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&ol(e,i,s),s};const nl=re`
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
`,al=re`
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
`;let Ie=class extends we{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.melodyTrack=null,this.exportPart="chords",this.exportMsg=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}willUpdate(t){if((t.has("open")||t.has("visible"))&&this.isOpened){const e=this.melodyTrack||v.getMelodyTrack();!!(e&&e.notes&&e.notes.length>0)?this.exportPart="both":this.exportPart="chords",this.exportMsg=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}setExportPart(t){this.exportPart=t,this.exportMsg=null}byPart(t,e,i){return this.exportPart==="chords"?t:this.exportPart==="melody"?e:i}handleDeviceClick(t){if(!this.progression)return;const e=Da(this.progression,t,this.order);window.open(e,"_blank");const i=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${i} helper...`),this.exportMsg=`Opening ${i}…`,this.close()}async handleWavClick(t="chords"){if(this.progression){this.emit("toast","Generating WAV audio...");try{const e=this.barsPerChord||v.getBarsPerChord()||1,i=this.feelSettings||v.getFeelSettings(),o=this.melodyTrack||v.getMelodyTrack();await lr(t,this.progression,o,{order:this.order,instrumentName:this.instrument,playStyleName:this.playStyle,barsPerChord:e,feelSettings:i});const n=`${`${(this.progression.key||"c").toLowerCase()}_${(this.progression.mood||"loop").toLowerCase().replace(/[^a-z0-9]+/g,"_")}`}${t==="chords"?"":"_"+t}.wav`;this.emit("toast",`WAV file downloaded (${n})`),this.exportMsg=`Saved ${n}`}catch(e){console.error("WAV export failed",e),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(t="both"){if(this.progression){try{const e=this.barsPerChord||v.getBarsPerChord()||1,i=this.feelSettings||v.getFeelSettings(),o=this.melodyTrack||v.getMelodyTrack();nr(this.progression,o,{target:t,order:this.order,playStyleName:this.playStyle,barsPerChord:e,feelSettings:i});const n=`${`${(this.progression.key||"c").toLowerCase()}_${(this.progression.mood||"loop").toLowerCase().replace(/[^a-z0-9]+/g,"_")}`}${t==="chords"?"":"_"+t}.mid`,a=t==="both"?"Multi-track MIDI":`${t.toUpperCase()} MIDI`;this.emit("toast",`${a} file downloaded (${n})`),this.exportMsg=`Saved ${n}`}catch(e){console.error("MIDI export failed",e),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return m`
      <div class="backdrop ${t?"open":""}" @click=${this.close}></div>
      <div class="share-drawer ${t?"open":""}">
        <div class="handle-bar"><div class="handle-pill"></div></div>
        <div class="drawer-content">
          <!-- Header -->
          <div class="head-row">
            <div>
              <div class="title">Share &amp; export</div>
              <div class="subtitle">Pick what goes out, then where it goes.</div>
            </div>
            <button class="close-btn" @click=${this.close} aria-label="Close">×</button>
          </div>

          <!-- What to export segmented filter -->
          <div class="what-to-export-row">
            <div class="filter-label">What to export</div>
            <div class="pill-group">
              <button
                class="pill-btn ${this.exportPart==="chords"?"active":""}"
                @click=${()=>this.setExportPart("chords")}
              >Chords</button>
              <button
                class="pill-btn ${this.exportPart==="melody"?"active":""}"
                @click=${()=>this.setExportPart("melody")}
              >Melody</button>
              <button
                class="pill-btn ${this.exportPart==="both"?"active":""}"
                @click=${()=>this.setExportPart("both")}
              >Both</button>
            </div>
          </div>

          <!-- Files Group -->
          <div class="section-title">Files</div>
          <div class="export-list">
            <div
              class="export-row"
              role="button"
              tabindex="0"
              @click=${()=>this.handleWavClick(this.exportPart)}
            >
              <div class="export-badge">WAV</div>
              <div class="export-meta">
                <div class="export-name">Audio (.wav)</div>
                <div class="export-desc">
                  ${this.byPart("The chord loop, rendered.","The melody on its own, rendered.","Chords and melody mixed to one file.")}
                </div>
              </div>
              <div class="export-action">Save</div>
            </div>

            <div
              class="export-row"
              role="button"
              tabindex="0"
              @click=${()=>this.handleMidiClick(this.exportPart)}
            >
              <div class="export-badge">MID</div>
              <div class="export-meta">
                <div class="export-name">MIDI (.mid)</div>
                <div class="export-desc">
                  ${this.byPart("One track of chords.","One track of melody.","Two tracks: chords and melody.")}
                </div>
              </div>
              <div class="export-action">Save</div>
            </div>
          </div>

          <!-- Send To Group -->
          <div class="section-title">Send to</div>
          <div class="export-list">
            <!-- M8 Tracker -->
            <div
              class="export-row dest-card"
              role="button"
              tabindex="0"
              @click=${()=>this.handleDeviceClick("m8")}
            >
              <div class="device-chip m8-chip">
                <div class="device-svg-box">
                  ${nl}
                </div>
              </div>
              <div class="export-meta">
                <div class="export-name">
                  ${this.byPart("M8 Hyper","M8 song (.m8s)","M8 Hyper + song file")}
                </div>
                <div class="export-desc">
                  ${this.byPart("Opens M8 Hyper with this progression.","Melody as phrases on track 1, ready to load on the M8.","Opens M8 Hyper with the chords and saves the melody as an .m8s song.")}
                </div>
              </div>
              <div class="export-action">
                ${this.byPart("Open ↗","Save","Open ↗")}
              </div>
            </div>

            <!-- Circuit Tracks -->
            <div
              class="export-row dest-card ${this.exportPart==="melody"?"disabled":""}"
              role="button"
              tabindex="${this.exportPart==="melody"?"-1":"0"}"
              @click=${this.exportPart==="melody"?null:()=>this.handleDeviceClick("circuit")}
            >
              <div class="device-chip ct-chip">
                <div class="device-svg-box">
                  ${al}
                </div>
              </div>
              <div class="export-meta">
                <div class="export-name">Circuit Chords</div>
                <div class="export-desc">
                  ${this.exportPart==="melody"?"Chords only. Pick Chords or Both to send.":this.exportPart==="both"?"Opens Circuit Chords with the progression. The melody stays here.":"Opens Circuit Chords with this progression."}
                </div>
              </div>
              <div class="export-action">Open ↗</div>
            </div>
          </div>

          ${this.exportMsg?m`
            <div class="export-msg">
              <span class="msg-dot"></span>
              <span>${this.exportMsg}</span>
            </div>
          `:ue}
        </div>
      </div>
    `}};Ie.styles=xe`
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
      transition: opacity 220ms ease-out, background 220ms ease-out;
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
      width: calc(100% - 48px);
      max-width: 660px;
      max-height: 86vh;
      background: var(--cv-cream, #FBF6EC);
      border-radius: 24px;
      box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      transform: translate(-50%, -47%) scale(0.97);
      opacity: 0;
      pointer-events: none;
      transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
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
      padding: 22px 26px 28px;
      box-sizing: border-box;
    }
    .drawer-content::-webkit-scrollbar {
      width: 6px;
    }
    .drawer-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .drawer-content::-webkit-scrollbar-thumb {
      background: rgba(46, 39, 31, 0.15);
      border-radius: 3px;
    }

    @media (max-width: 720px) {
      .share-drawer {
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 100%;
        max-height: 88vh;
        border-radius: 26px 26px 0 0;
        box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.5);
        transform: translateY(100%);
        transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
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
        padding: 14px 22px 26px;
      }
    }

    .head-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
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
      font-size: 17px;
      color: #2E271F;
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

    /* What to export segmented filter */
    .what-to-export-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .filter-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .pill-group {
      display: flex;
      gap: 2px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 100px;
      padding: 4px;
    }
    .pill-btn {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      background: transparent;
      color: #6B5F50;
      transition: background 150ms ease, color 150ms ease;
    }
    .pill-btn.active {
      background: #2E271F;
      color: #FBF3E6;
    }

    .section-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      margin: 22px 0 10px;
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
      background: #F6EADB;
      border-radius: 16px;
      padding: 14px 16px;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background 150ms ease;
      user-select: none;
    }
    .export-row:hover {
      background: #F1E4CC;
      transform: translateY(-1px);
    }
    .export-row:active {
      transform: scale(0.99);
    }
    .export-row.disabled {
      opacity: 0.45;
      cursor: default;
      pointer-events: none;
    }

    .export-badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: #F1E4CC;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      color: #2E271F;
      flex-shrink: 0;
    }

    /* Device chip container with SVG artwork */
    .device-chip {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      padding: 2px;
      box-sizing: border-box;
      position: relative;
    }
    .device-chip.m8-chip {
      background: #9CC0EC;
    }
    .device-chip.ct-chip {
      background: #F2A79B;
    }
    .device-svg-box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .device-svg-box svg {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      transition: transform 180ms ease;
    }
    .export-row:hover .device-svg-box svg {
      transform: scale(1.08);
    }

    .export-meta {
      min-width: 0;
      flex: 1;
    }
    .export-name {
      font-size: 13.5px;
      font-weight: 800;
      color: #2E271F;
    }
    .export-desc {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
      text-wrap: pretty;
    }
    .export-action {
      font-size: 12px;
      font-weight: 800;
      color: #2E271F;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .export-msg {
      margin-top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: #6F8F5C;
    }
    .msg-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7FA968;
      flex-shrink: 0;
    }
  `;Be([k({type:Boolean})],Ie.prototype,"open",2);Be([k({type:Boolean})],Ie.prototype,"visible",2);Be([k({type:Object})],Ie.prototype,"progression",2);Be([k({type:Array})],Ie.prototype,"order",2);Be([k({type:String})],Ie.prototype,"instrument",2);Be([k({type:String})],Ie.prototype,"playStyle",2);Be([k({type:Number})],Ie.prototype,"barsPerChord",2);Be([k({type:Object})],Ie.prototype,"feelSettings",2);Be([k({type:Object})],Ie.prototype,"melodyTrack",2);Be([w()],Ie.prototype,"exportPart",2);Be([w()],Ie.prototype,"exportMsg",2);Ie=Be([ke("share-modal")],Ie);var rl=Object.defineProperty,ll=Object.getOwnPropertyDescriptor,Ut=(t,e,i,o)=>{for(var s=o>1?void 0:o?ll(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&rl(e,i,s),s};let ct=class extends we{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&Ft.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await Ft.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?m``:m`
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
    `}};ct.styles=xe`
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
  `;Ut([k({type:Boolean})],ct.prototype,"open",2);Ut([w()],ct.prototype,"mounted",2);Ut([w()],ct.prototype,"isOAuthLoading",2);Ut([w()],ct.prototype,"errorMessage",2);Ut([Sn("#google-btn-container")],ct.prototype,"googleBtnContainer",2);ct=Ut([ke("auth-modal")],ct);var cl=Object.defineProperty,dl=Object.getOwnPropertyDescriptor,_t=(t,e,i,o)=>{for(var s=o>1?void 0:o?dl(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&cl(e,i,s),s};let dt=class extends we{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const i=(this.chordIndex%e.length+e.length)%e.length;return e[i]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const i=this.getCurrentFeel(),o=this.getCurrentRow();o&&this.emitAudition(o,i),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),i=e.rows;if(!i||i.length===0)return;this.chordIndex=(this.chordIndex+1)%i.length;const o=this.getCurrentRow();o&&this.emitAudition(o,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),i=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:i.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),i=t.rows?t.rows.length:0,o=i>0?this.chordIndex%i+1:0,s=se(t.tension);return m`
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
          ${this.feelings.map((n,a)=>m`
            <div
              class="cycler-dot"
              style="background: ${a===this.feelIndex?"#2E271F":"rgba(46,39,31,0.22)"};"
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

      ${e?m`
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
            ${e.roman?m`<span class="chord-roman">${e.roman}</span>`:""}
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
    `}};dt.styles=xe`
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
  `;_t([k({type:Object})],dt.prototype,"originalChord",2);_t([k({type:Number})],dt.prototype,"barIndex",2);_t([k({type:Array})],dt.prototype,"feelings",2);_t([k({type:Number})],dt.prototype,"feelIndex",2);_t([k({type:Number})],dt.prototype,"chordIndex",2);dt=_t([ke("chord-pad-cycler")],dt);var pl=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,F=(t,e,i,o)=>{for(var s=o>1?void 0:o?hl(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&pl(e,i,s),s};const $o=Qo,ws=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"];lt.map(t=>t.name);Object.fromEntries(lt.map(t=>[t.name,t.iconPath]));const ut={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},ul=ut,Io=["A","S","D","F","Z","X","C","V"],ml=["Octave up","1st inversion","Low root"];function ks(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const gl=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],fl=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],Co=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],Ae={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},bl=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Ss=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],vi=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],Eo={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},yi={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},$s=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Is={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},xi={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},wi={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},jo={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Yt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function vl(t){const e=t===""?"maj":t;if(Yt[5][e]||Yt[6][e])return e;const i=jo[e];return i&&(Yt[5][i]||Yt[6][i])?i:"maj"}function yl(t){const e=vl(t.q),i=[];return[[6,4],[5,9]].forEach(([o,s])=>{const n=Yt[o][e];if(!n)return;const a=((t.rootPc-s)%12+12)%12;i.push({rootFret:a,frets:n.map(l=>l===null?null:l+a)})}),i.length?(i.sort((o,s)=>o.rootFret-s.rootFret),i[0].frets):null}function xl(t){const e=[7,0,4,9],i=t.intervals.map(a=>(t.rootPc+a)%12),o=a=>{const l=new Set(a);let r=null;const c=[],d=p=>{if(p===4){const u=c.map((b,y)=>(e[y]+b)%12);for(const b of l)if(u.indexOf(b)<0)return;for(const b of u)if(!l.has(b))return;const h=c.filter(b=>b>0),g=h.length?Math.max(...h)-Math.min(...h):0;if(g>3)return;const f=g*12+c.reduce((b,y)=>b+y,0);(!r||f<r.score)&&(r={frets:c.slice(),score:f});return}for(let u=0;u<=5;u++)c.push(u),d(p+1),c.pop()};return d(0),r},s=o(i);if(s)return s.frets;const n=o(t.intervals.filter(a=>a!==7).map(a=>(t.rootPc+a)%12));return n?n.frets:null}let A=class extends we{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle="Block chords",this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isSaved=!1,this.currentProjectId=null,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.showSaveModal=!1,this.pendingSaveName="",this.selectedBand=null,this.bandSwaps={},this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.humanise=45,this.tone="Warm",this.feelScope="loop",this.barFeel={},this.advOverride={},this.advOpen=!1,this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{if(t.key==="Escape"&&(this.vibeOpen||this.tempoOpen||this.feelOpen)){t.preventDefault(),this.vibeOpen=!1,this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate();return}if(this.isEditableTarget(t))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.ctrlKey||t.metaKey||t.altKey)return;const e=Io.map(o=>o.toLowerCase()).indexOf((t.key||"").toLowerCase()),i=this.progression?.chords||[];if(e>=0&&e<i.length){t.preventDefault();const o=88+e%3*6,s=i[e],n=this.getLadderHome(s),a=s.voicing||"1st inversion",l=ks(a),r=this.progression?.key||"C",c=this.progression?.scaleType||"MAJOR",d=s.notes&&s.notes.length?s.notes:W(s.name,U(r,c));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const p=l===0?"UP AN OCTAVE":l===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:a,vel:o,zone:l,reach:n,meta:p},v.playChordNotes(d,.85,a,o),this.requestUpdate()}},this.handleKeyUp=t=>{if(this.isEditableTarget(t)||t.ctrlKey||t.metaKey||t.altKey)return;Io.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.setLibraryOpen=t=>{this.libraryOpen=t,this.dispatchEvent(new CustomEvent("library-open-change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrary=()=>{this.setLibraryOpen(!this.libraryOpen)},this.toggleSaved=()=>{this.isSaved?this.dispatchEvent(new CustomEvent("unsave-set",{detail:this.currentProjectId,bubbles:!0,composed:!0})):(this.pendingSaveName=this.getSuggestedLoopName(),this.showSaveModal=!0,this.updateComplete.then(()=>{const t=this.renderRoot?.querySelector(".save-modal-input");t?.focus(),t?.select()}))},this.cancelSaveModal=()=>{this.showSaveModal=!1,this.pendingSaveName=""},this.confirmSaveModal=()=>{const t=this.pendingSaveName.trim()||this.getSuggestedLoopName();this.dispatchEvent(new CustomEvent("save-set",{detail:t,bubbles:!0,composed:!0})),this.showSaveModal=!1,this.pendingSaveName=""},this.onSaveNameKeydown=t=>{t.key==="Enter"?this.confirmSaveModal():t.key==="Escape"&&this.cancelSaveModal()},this.startRename=(t,e)=>{this.renamingId=t,this.draftName=e,this.confirmDeleteId=null,this.requestUpdate(),this.updateComplete.then(()=>{const i=this.renderRoot?.querySelector(".library-rename-input");i?.focus(),i?.select()})},this.commitRename=t=>{const e=this.renamingId,i=this.draftName.trim();if(e&&i){const o=j.getProjects().find(s=>s.id===e);o&&(o.name=i,j.saveProject(o)),this.savedSets=this.savedSets.map(s=>s.id===e?{...s,name:i}:s),this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:i},bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName="",this.requestUpdate()},this.cancelRename=()=>{this.renamingId=null,this.draftName="",this.requestUpdate()},this.askDelete=t=>{this.confirmDeleteId=t,this.renamingId=null,this.requestUpdate()},this.cancelDelete=()=>{this.confirmDeleteId=null,this.requestUpdate()},this.confirmDelete=t=>{j.deleteProject(t),this.savedSets=this.savedSets.filter(e=>e.id!==t),this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0})),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop",bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrarySelectMode=()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelectMode||(this.librarySelected=[]),this.requestUpdate()},this.toggleSelectLoop=t=>{this.librarySelected.includes(t)?this.librarySelected=this.librarySelected.filter(e=>e!==t):this.librarySelected=[...this.librarySelected,t],this.requestUpdate()},this.toggleSelectAllVisible=()=>{const t=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(s=>!t||(s.name+" "+s.genre+" "+s.mood).toLowerCase().includes(t)).map(s=>s.id);if(i.length>0&&i.every(s=>this.librarySelected.includes(s)))this.librarySelected=this.librarySelected.filter(s=>!i.includes(s));else{const s=new Set([...this.librarySelected,...i]);this.librarySelected=Array.from(s)}this.requestUpdate()},this.deleteSelectedLoops=()=>{const t=[...this.librarySelected];if(!t.length)return;const e=t.length;for(const i of t)j.deleteProject(i),this.dispatchEvent(new CustomEvent("delete-project",{detail:i,bubbles:!0,composed:!0}));this.savedSets=j.getProjects(),this.librarySelected=[],this.savedSets.length||(this.librarySelectMode=!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Deleted ${e} loop${e>1?"s":""}`,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,v.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=U(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:W(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];v.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),v.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=U(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:W(this.abPick.chord,t),i=[...this.progression.chords],o=i[this.swapIndex],s=o.initialChord||{...o};i[this.swapIndex]={...o,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:s};const n={...this.progression,chords:i};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),v.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>Kt&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<jt&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onSetLength=t=>{(this.progression?.chords.length||4)!==t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t,bubbles:!0,composed:!0}))},this.onReroll=()=>{if(this.selectedBand){this.onGenerateBandProgression(this.selectedBand);return}this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.requestUpdate()},this.onParameterOverride=t=>{const{param:e,value:i}=t.detail;this.advOverride={...this.advOverride,[e]:i},v.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onParameterRelink=t=>{const{param:e}=t.detail,i={...this.advOverride};delete i[e],this.advOverride=i,v.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=j.getProjects(),this.unsubscribeProjects=typeof j.subscribeProjects=="function"?j.subscribeProjects(()=>{this.savedSets=j.getProjects(),this.requestUpdate()}):typeof j.subscribe=="function"?j.subscribe(()=>{this.savedSets=j.getProjects(),this.requestUpdate()}):null,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride}),v.setBarsPerChord(this.barsPerChord),Me(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("humanise")||t.has("playStyle")||t.has("tone")||t.has("barFeel")||t.has("advOverride")||t.has("humanEngineState"))&&(v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:this.humanEngineState}),t.has("playStyle")&&v.setPlayStyle(this.playStyle),t.has("tone")&&Me(this.tone)),t.has("barsPerChord")&&v.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}isEditableTarget(t){const e=s=>{if(!s||typeof s!="object")return!1;const n=s,a=(n.tagName||"").toUpperCase();return a==="INPUT"||a==="TEXTAREA"||a==="SELECT"||!!n.isContentEditable},i=typeof t.composedPath=="function"?t.composedPath():[t.target];for(const s of i)if(e(s))return!0;let o=typeof document<"u"?document.activeElement:null;for(;o&&o.shadowRoot&&o.shadowRoot.activeElement;)o=o.shadowRoot.activeElement;return!!e(o)}getSuggestedLoopName(){if(this.selectedBand)return`${this.selectedBand} vibe`;const t=this.progression?.genre||"Loop",e=this.progression?.mood?this.progression.mood.toLowerCase():"";return e?`${t} ${e}`:`${t} loop`}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){if(this.bandSwaps={},this.selectedBand===t){this.selectedBand=null,this.requestUpdate();return}this.selectedBand=t;const e=me(t);if(e){const i=No(e.presetId),o=Ao(e.rhythmStyle);i&&(this.instrument=i,v.setInstrument(i),this.dispatchEvent(new CustomEvent("set-instrument",{detail:i,bubbles:!0,composed:!0}))),o&&(this.playStyle=o,v.setPlayStyle(o),this.dispatchEvent(new CustomEvent("set-play-style",{detail:o,bubbles:!0,composed:!0}))),e.defaultBpm&&this.setDirectBpm(e.defaultBpm),this.dispatchEvent(new CustomEvent("toast",{detail:`Artist DNA: ${e.name} · ${i||""} · ${e.defaultBpm} BPM`,bubbles:!0,composed:!0}))}this.requestUpdate()}onWriteBandLoop(t){this.bandSwaps={},this.onGenerateBandProgression(t.name)}onGenerateBandProgression(t){if(!this.progression||!this.chordData)return;this.bandSwaps={};const e=this.progression.key||"C",i=this.progression.scaleType||"MAJOR",o=$r(this.chordData,t,e,i);if(o){const s=me(t);if(s){const n=No(s.presetId),a=Ao(s.rhythmStyle);n&&(this.instrument=n,v.setInstrument(n),this.dispatchEvent(new CustomEvent("set-instrument",{detail:n,bubbles:!0,composed:!0}))),a&&(this.playStyle=a,v.setPlayStyle(a),this.dispatchEvent(new CustomEvent("set-play-style",{detail:a,bubbles:!0,composed:!0}))),s.defaultBpm&&this.setDirectBpm(s.defaultBpm)}this.progression=o,this.order=Array.from({length:o.chords.length},(n,a)=>a),v.setProgression(o,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${t} progression in ${e} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}}applyBandMove(t,e,i){if(!this.progression)return;const o=this.progression.chords[t];if(!o)return;this.bandSwaps={...this.bandSwaps,[t]:{originalChord:{...o},move:e}};const s={...o,name:e.chord,roman:e.roman,functionLabel:`${i.name} Move`,desc:`${i.name} signature move (${e.name})`,tension:o.tension,tag:"glow",color:se(o.tension).color},n=[...this.progression.chords];n[t]=s;const a={...this.progression,chords:n};this.progression=a,v.setProgression(a,this.order),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:a,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`${i.name} move: ${e.name} applied to Bar ${t+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}revertBandMove(t){if(!this.progression||!this.bandSwaps[t])return;const{originalChord:e}=this.bandSwaps[t],i={...this.bandSwaps};delete i[t],this.bandSwaps=i;const o=[...this.progression.chords];o[t]=e;const s={...this.progression,chords:o};this.progression=s,v.setProgression(s,this.order),v.auditionChord(e,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Reverted Bar ${t+1} to ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onApplyBandTrick(t,e){if(!this.progression||!this.chordData)return;const i=e!==void 0?e:this.swapIndex!==null?this.swapIndex:this.progression.chords.length>2?2:0,o=this.progression.chords[i];if(!o)return;const s={...o,name:t.chordName,roman:t.roman,notes:t.notes,functionLabel:`${this.selectedBand||"Artist"} Trick`,desc:t.plain,tension:t.tension,tag:"glow",color:se(t.tension).color},n=[...this.progression.chords];n[i]=s;const a={...this.progression,chords:n};this.progression=a,v.setProgression(a,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:a,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Injected ${t.trick.name} (${t.chordName}) at Bar ${i+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderTopBandBar(){const t=this.selectedBand?me(this.selectedBand):null;if(!t)return"";const e=ui[t.name]||{font:t.font,pillFs:13,pillTrack:"0"};return m`
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
    `}renderBandLegend(){const t=this.selectedBand?me(this.selectedBand):null;return t?m`
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
    `:""}renderBandInspectorCard(t){const e=ui[t.name]||{font:t.font,weight:t.weight||400,italic:t.italic,pillFs:t.pillFs||13,pillTrack:t.pillTrack||"0"};return m`
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
    `}renderBandDnaBar(t){return this.renderBandLegend()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:e},bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t,v.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),i=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>i+s)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const i=this.progression?.chords,o=i?i[e]:null;if(!o)return;let s=o.voicing||"1st inversion",n=ks(s),a;const l=this.getChordLadder(o),r=this.getLadderHome(o);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const b=t.currentTarget.getBoundingClientRect(),y=Math.min(.999,Math.max(0,(t.clientX-b.left)/(b.width||1))),x=Math.min(.999,Math.max(0,(t.clientY-b.top)/(b.height||1)));x<.34?(n=0,s="up an octave"):x>.67?(n=2,s="low, root position"):(n=1,s="1st inversion"),l.length>0&&(a=Math.min(l.length-1,Math.floor(y*l.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const c=a!==void 0&&l[a]?l[a]:o.name,d=a!==void 0&&a!==r&&!!l[a],p=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR",h=W(c,U(p,u)),g=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const f=d?"→ "+c:n===0?"UP AN OCTAVE":n===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:s,vel:g,zone:n,reach:a,meta:f},v.playChordNotes(h,.85,s,g),this.pendingLatch={index:e,reach:a,voicing:s,targetChordName:c},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const i=this.progression?.chords,o=i?i[e]:null;if(o&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const s=t.currentTarget.getBoundingClientRect(),n=Math.min(.999,Math.max(0,(t.clientX-s.left)/(s.width||1))),a=Math.min(.999,Math.max(0,(t.clientY-s.top)/(s.height||1)));let l=1,r="1st inversion";a<.34?(l=0,r="up an octave"):a>.67&&(l=2,r="low, root position");const c=this.getChordLadder(o),d=this.getLadderHome(o),p=c.length>0?Math.min(c.length-1,Math.floor(n*c.length)):void 0,u=p!==void 0&&c[p]?c[p]:o.name,h=p!==void 0&&p!==d&&!!c[p];if(this.pendingLatch?.reach!==p||this.pendingLatch?.voicing!==r){this.pendingLatch={index:e,reach:p,voicing:r,targetChordName:u};const g=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",b=W(u,U(g,f)),y=88+e%3*6,x=h?"→ "+u:l===0?"UP AN OCTAVE":l===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:r,vel:y,zone:l,reach:p,meta:x},v.playChordNotes(b,.65,r,y),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:i,voicing:o,targetChordName:s}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const n=this.progression.chords[e],a=this.getChordLadder(n),l=this.getLadderHome(n),r=n.voicing||"1st inversion",c=i!==void 0&&i!==l&&!!a[i]&&!!s;if(c||!!o&&o!==r){const p=n.initialChord||{...n};let u;if(c&&s){const f=this.getChordQualityLabel(n.name),b=this.getChordExtensionLabel(s),y=this.progression.key||"C",x=this.progression.scaleType||"MAJOR";u=Ei(n,f,b),u.name=s,u.notes=W(s,U(y,x))}else u={...n};o&&(u.voicing=o),u.name===p.name&&(!p.voicing||u.voicing===p.voicing)?delete u.initialChord:u.initialChord=p;const h=[...this.progression.chords];h[e]=u;const g={...this.progression,chords:h};this.progression=g,this.dispatchEvent(new CustomEvent("progression-change",{detail:g,bubbles:!0,composed:!0})),v.setProgression(g,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",v.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,i=Do(this.chordData,this.progression),o=Bi(this.chordData,this.progression),s=i.map(c=>({name:c.name,sub:yi[c.name]?yi[c.name][this.showTheory?1:0]:c.sub||"",tension:c.tension,rows:c.rows.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:o.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))});const n=s.filter(c=>c.name!=="Borrowed").sort((c,d)=>c.tension-d.tension),a=s.filter(c=>c.name==="Borrowed"),l=[...n,...a],r=this.selectedBand?me(this.selectedBand):null;if(r){const c=Ro(this.progression.key||"C",this.progression.scaleType||"MAJOR",r.name),d=new Map(c.map(p=>[p.chordName,p]));l.forEach(p=>{const u=p.rows.map(f=>{const b=d.get(f.name);return b?{...f,bandTag:`${r.name} move`,bandColor:r.color,sub:this.showTheory?b.theory:b.plain}:f}),h=u.filter(f=>f.bandTag),g=u.filter(f=>!f.bandTag);p.rows=[...h,...g]})}return l}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],i=U(this.progression.key,this.progression.scaleType),o=t.notes&&t.notes.length?t.notes:W(t.chordName,i)||e.notes,s=t.chord?{...t.chord,name:t.chordName,notes:o,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:o,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:o,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,v.auditionChord(s,.8),v.setABOverride({index:this.swapIndex,side:"after",chord:s}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?U(this.progression.key,this.progression.scaleType):!1,i=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:W(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&v.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:i}}),v.auditionChord({...t.chord,notes:i},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=U(this.progression.key,this.progression.scaleType),i=W(t,e);v.auditionChord({name:t,notes:i,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=U(this.progression.key,this.progression.scaleType);if(t==="before")v.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),v.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const i=W(this.abPick.chord,e),o={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:i};v.setABOverride({index:this.swapIndex,side:"after",chord:o}),v.auditionChord(o,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const i=U(this.progression.key,this.progression.scaleType),o={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:W(this.abPick.chord,i)};v.auditionChord(o,.8)}else v.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordExtensionLabel(i.name),s=Ei(i,t,o);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],i=e[this.detailIndex];if(!i)return;const o=this.getChordQualityLabel(i.name),s=Ei(i,o,t);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},i=new Set(t.map(l=>e[l.replace(/\d+$/,"")]??-1)),o=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],s=100/7,n=s*.58,a=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return m`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${o.map(l=>{const r=i.has(l.pc);return m`<div class="white-key ${r?"active":""}">${l.note}</div>`})}
        </div>
        ${a.map(l=>{const r=(l.after+1)*s-n/2,c=i.has(l.pc);return m`<div class="black-key ${c?"active":""}" style="left: ${r}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.playStyle!==Ae.playStyle||this.swing!==Ae.swing||this.spread!==Ae.spread||this.density!==Ae.density||this.humanise!==Ae.humanise||this.tone!==Ae.tone||Object.keys(this.barFeel).length>0||Object.keys(this.advOverride).length>0}resetFeel(){this.playStyle=Ae.playStyle,this.swing=Ae.swing,this.spread=Ae.spread,this.density=Ae.density,this.humanise=Ae.humanise,this.tone=Ae.tone,this.barFeel={},this.advOverride={},this.humanEngineState=null,v.setPlayStyle(this.playStyle),v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:{},advOverride:{},humanState:void 0}),Me(this.tone),this.requestUpdate()}get fScopeBar(){return typeof this.feelScope=="number"?this.feelScope:null}fget(t){const e=this.fScopeBar;return e!==null&&this.barFeel[e]&&this.barFeel[e][t]!==void 0?this.barFeel[e][t]:this[t]}fset(t,e){const i=this.fScopeBar;if(i===null)this[t]=e,t==="playStyle"?(v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-play-style",{detail:e,bubbles:!0,composed:!0}))):t==="tone"?(v.setFeelSettings({tone:e}),Me(e)):v.setFeelSettings({[t]:e});else{const o={...this.barFeel};o[i]={...o[i]||{},[t]:e},this.barFeel=o,v.setFeelSettings({barFeel:o})}this.requestUpdate()}getPatternShortName(t){const e=t||this.fget("playStyle")||this.playStyle||"Block chords",i=Co[0].steps.find(o=>o.v===e);return i?i.name:"Block"}get feelChipLabel(){return`Feel · ${this.getPatternShortName()}`}getDerivedParams(){const t=a=>{const l=this.fget(a);return typeof l=="number"?l:0},e=this.fget("playStyle")||this.playStyle||"Block chords",o=Wt.find(a=>a.name===e)?.patch??{},s=this.progression?.genre??"Pop",n=_o[s]??{};return{spread:+(t("spread")/100).toFixed(2),duration:+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),humanVariance:+(t("humanise")/100).toFixed(2),microTiming:+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2),arpMode:o.arpMode??n.arpMode??"off",arpRate:o.arpRate??n.arpRate??"1/16",arpRange:o.arpRange??n.arpRange??1,arpGate:.85,minVelocity:n.minVelocity??60,maxVelocity:n.maxVelocity??110}}get activeEngineParams(){const t=this.getDerivedParams();return{spread:this.advOverride.spread!==void 0?this.advOverride.spread:t.spread,duration:this.advOverride.duration!==void 0?this.advOverride.duration:t.duration,humanVariance:this.advOverride.humanVariance!==void 0?this.advOverride.humanVariance:t.humanVariance,microTiming:this.advOverride.microTiming!==void 0?this.advOverride.microTiming:t.microTiming,arpMode:this.advOverride.arpMode!==void 0?this.advOverride.arpMode:t.arpMode,arpRate:this.advOverride.arpRate!==void 0?this.advOverride.arpRate:t.arpRate,arpRange:this.advOverride.arpRange!==void 0?this.advOverride.arpRange:t.arpRange,arpGate:this.advOverride.arpGate!==void 0?this.advOverride.arpGate:t.arpGate,minVelocity:this.advOverride.minVelocity!==void 0?this.advOverride.minVelocity:t.minVelocity,maxVelocity:this.advOverride.maxVelocity!==void 0?this.advOverride.maxVelocity:t.maxVelocity}}nudgeBpm(t){const e=this.progression?.bpm||84,i=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=i),v.setBpm(i),this.dispatchEvent(new CustomEvent("set-bpm",{detail:i,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),v.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,v.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=vi.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=vi.find(i=>i.type===t||i.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",i=ls(this.progression,t,e);this.progression=i,v.setProgression(i),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${i.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=Ma(this.progression,t);this.progression=e,v.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=ls(this.progression,t);this.progression=e,v.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,i,o){this.auditionDeg=t,this.auditionName=e,this.auditionBar=i?o+1:0;const s=U(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=W(e,s);v.auditionChord({name:e,notes:n},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=Eo[e]||Eo[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||Eo.MAJOR,o=this.progression?.key||"C",s=_[o.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;U(o,e);const n=o.replace("b","♭")+" "+i.name,a=t.map(f=>{const b=ge(f.name);return _[b.root]??0}),l=f=>i.steps.indexOf(((f-s)%12+12)%12),r=i.steps.map((f,b)=>{const y=(s+f)%12,C=bl[y]+i.quals[b],I=a.indexOf(y),$=I>=0,N=this.auditionDeg===b;return{di:b,roman:i.romans[b],name:C,fn:i.fns[b],inLoop:$,on:N,barIdx:I,aria:`Hear ${C}, the ${i.fns[b].toLowerCase()} of ${n}`}}),c=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,d=t.map(f=>f.roman||i.romans[Math.max(0,l(_[ge(f.name).root]??0))]).join(" – "),p=o.replace("b","♭")+" "+i.name,u=tn(t),h=on(t),g=this.progression?.note||"";return{scaleName:n,scaleHint:c,scaleDegrees:r,romanFormula:d,keyModeLine:p,cadences:u,voiceLinks:h,setNote:g}}renderScaleChords(t,e,i,o){const s=Lt(this.progression?.mood||"Warm");return m`
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
          ${i.map(n=>m`
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
              ${Ss.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=_[i]??0,s=_[e.root]??0,n=o===s;return m`
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
              ${vi.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return m`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,s=!!this.barFeel[i];return m`
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
          ${Co.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(s=>s.v===i)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=s)}),m`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(s=>{const n=s.v===o.v;return m`
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
            ${Ss.map(e=>{const i=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),o=_[i]??0,s=_[e.root]??0,n=o===s;return m`
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
            ${vi.map(e=>{const i=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=i===e.type||e.type==="NATURAL_MINOR"&&i==="MINOR";return m`
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
    `}onSelectSectionCard(t){this.activeSectionIdx=t,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}renderSongSectionList(t){const e=this.sections.length<ht.length;return m`
      <div class="song-view-wrap song-section-view">
        <div class="song-section-lead">
          Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
        </div>

        <div class="song-section-list">
          ${this.sections.map((i,o)=>{const s=this.activeSectionIdx===o;return m`
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
                  ${i.progression.chords.map(n=>{const a=se(n.tension);return m`
                      <div
                        class="song-chord-chip"
                        style="background: ${a.color};"
                        title="${n.name} (${n.functionLabel||n.tag})"
                      ></div>
                    `})}
                </div>
                ${this.sections.length>1?m`
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
              ${this.sections.map((i,o)=>{const s=this.playing&&this.activePlayingSectionIdx===o;return m`
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
            ${(this.progression?.chords||[]).map((e,i)=>{const o=this.fScopeBar===i,s=!!this.barFeel[i];return m`
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
            ${Co.map(e=>{const i=this.fget(e.k);let o=e.steps[0];return typeof i!="number"?o=e.steps.find(s=>s.v===i)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(i))<Math.abs(Number(o.v)-Number(i))&&(o=s)}),m`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(s=>{const n=s.v===o.v;return m`
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
    `}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:i,cadences:o,voiceLinks:s,setNote:n}=t;return m`
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
              ${o.map(a=>m`
                <div class="cadence-card-item" style="background: var(--cv-cream); border-radius: 15px; padding: 11px 13px;">
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px;">
                    <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${a.name}</div>
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.5px; color: var(--cv-label); white-space: nowrap;">${a.bars}</div>
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 5px; flex-wrap: wrap;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink-muted);">${a.move}</div>
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.4px; color: rgba(46, 39, 31, 0.45);">${a.degrees}</div>
                  </div>
                  <div style="font-size: 11.5px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 5px; text-wrap: pretty;">${a.why}</div>
                </div>
              `)}
            </div>
          </div>
        `:""}

        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 4px;">Voice leading</div>
        ${s.map(a=>m`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${a.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${a.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${a.hasShared?"var(--cv-ink-muted)":"rgba(46, 39, 31, 0.4)"}; text-align: right;">${a.link}</div>
          </div>
        `)}

        ${n?m`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${n}</div>
        `:""}
      </div>
    `}renderChordDetailContent(t){const e=t[this.detailIndex],i=this.getChordQualityLabel(e?.name),o=this.getChordExtensionLabel(e?.name),s=U(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=e?en(e.name,s):[];return m`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(e?.notes||[]).map(a=>m`
          <div class="note-pill">${a.replace(/\d+$/,"")}</div>
        `)}
      </div>

      ${this.showTheory&&n.length?m`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${n.map(a=>m`
            <div class="interval-token-badge ${a.isGuideTone?"guide-tone":""}" style="background: ${a.isGuideTone?"rgba(242, 115, 95, 0.16)":"var(--cv-surface)"}; border: 1.5px solid ${a.isGuideTone?"#F2735F":"rgba(46,39,31,0.1)"}; border-radius: 12px; padding: 7px 6px; text-align: center;">
              <div style="font-size: 14px; font-weight: 800; color: #2E271F;">${a.note}</div>
              <div style="font-size: 11px; font-weight: 800; color: ${a.isGuideTone?"#F2735F":"var(--cv-label)"}; margin-top: 2px;">${a.intervalSymbol}</div>
              <div style="font-size: 9.5px; font-weight: 700; color: var(--cv-ink-muted); margin-top: 2px; line-height: 1.1;">${a.roleName}</div>
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
        ${gl.map(a=>{const l=a.label===i;return m`
            <button
              class="chord-mod-chip quality-chip ${l?"selected active":""}"
              @click=${()=>this.changeChordQuality(a.label)}
              aria-pressed="${l}"
              aria-label="Change quality to ${a.label}"
            >
              <div class="chip-title">${a.label}</div>
              <div class="chip-desc">${a.sub}</div>
            </button>
          `})}
      </div>

      <div class="detail-kicker" style="margin-top: 20px;">Extension</div>
      <div class="detail-extension-box">
        <div class="quality-label">${o}</div>
        <div class="quality-sub">${this.getChordExtensionSub(e?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${fl.map(a=>{const l=a.label===o;return m`
            <button
              class="chord-mod-chip extension-chip ${l?"selected active":""}"
              @click=${()=>this.changeChordExtension(a.label)}
              aria-pressed="${l}"
              aria-label="Change extension to ${a.label}"
            >
              <div class="chip-title">${a.label}</div>
              <div class="chip-desc">${a.sub}</div>
            </button>
          `})}
      </div>
    `}renderPianoCard(t,e){const i=ge(t.name),o=Is[i.root]??0,s=wi[i.quality]||wi[jo[i.quality]||"maj"]||[0,4,7],n=22,a=86,l=52,r=[0,2,4,5,7,9,11],c=[],d=[],p=[];for(let g=0;g<2;g++)r.forEach((f,b)=>{c.push({x:(g*7+b)*n,w:n-1.5,h:a})});for(let g=0;g<2;g++)[0,1,3,4,5].forEach(f=>{const b=g*7+f;d.push({x:b*n+n*.64,w:n*.58,h:l})});s.forEach(g=>{const f=o+g,b=Math.floor(f/12),y=f%12,x=r.indexOf(y),C=g===0,I=x<0,$=C?"#F2735F":I?"#FBF3E6":"#2E271F",N=C?"#FBF3E6":I?"#2E271F":"#FBF3E6",L=this.showDegrees?xi[g%12]:"";if(x>=0){const E=b*7+x;p.push({cx:E*n+(n-1.5)/2,cy:a-19,r:9,fill:$,isRoot:C,label:L,lc:N})}else{const T=(b*7+r.indexOf(y-1))*n+n*.64,R=n*.58;p.push({cx:T+R/2,cy:l-14,r:7.5,fill:$,isRoot:C,label:L,lc:N})}});const u=14*n,h=s.map(g=>{const f=$s[(o+g)%12];return this.showDegrees?`${f} (${xi[g%12]})`:f}).join(" · ");return m`
      <div
        class="play-card"
        @pointerdown=${g=>this.handlePadPointerDown(g,e)}
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
        <svg width="${u}" height="${a}" viewBox="0 0 ${u} ${a}" style="display: block; width: 100%; max-width: ${u}px; height: auto;">
          ${c.map(g=>re`
            <rect x="${g.x}" y="0" width="${g.w}" height="${g.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${d.map(g=>re`
            <rect x="${g.x}" y="0" width="${g.w}" height="${g.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${p.map(g=>re`
            <g>
              <circle cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="${g.fill}" stroke="${g.isRoot?"#2E271F":"none"}" stroke-width="${g.isRoot?1.6:0}"></circle>
              ${g.label?re`
                <text x="${g.cx}" y="${g.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${g.lc}" font-family="'Plus Jakarta Sans',sans-serif">${g.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${h}</div>
      </div>
    `}renderFretCard(t,e,i){const o=ge(t.name),s=Is[o.root]??0,n=wi[o.quality]||wi[jo[o.quality]||"maj"]||[0,4,7],a=[4,9,2,7,11,4],l=[7,0,4,9],r=i==="Ukulele",c=r?l:a,d=r?xl({root:o.root,rootPc:s,q:o.quality,intervals:n})||[null,null,null,null]:yl({root:o.root,rootPc:s,q:o.quality})||[null,null,null,null,null,null],p=18,u=24,h=4,g=16,f=c.length,b=d.filter(B=>B!==null&&B>0),y=b.length&&Math.max(...b)>4?Math.min(...b)-1:0,x=[],C=[],I=[],$=[],N=[];for(let B=0;B<f;B++)x.push({x:B*p});for(let B=0;B<=h;B++)C.push({y:g+B*u,sw:B===0&&y===0?3:1.2});d.forEach((B,O)=>{const V=O*p;if(B===null){N.push({x:V});return}if(B===0){$.push({x:V});return}const oe=((c[O]+B-s)%12+12)%12;I.push({cx:V,cy:g+(B-y-.5)*u,fill:oe===0?"#F2735F":"#2E271F",label:this.showDegrees?xi[((c[O]+B-s)%12+12)%12]:""})});const L=(f-1)*p,E=(f-1)*p+26,T=g+h*u+12,R=y>0?`${y+1}fr`:"",q=y>0,H=n.map(B=>{const O=$s[(s+B)%12];return this.showDegrees?`${O} (${xi[B%12]})`:O}).join(" · ");return m`
      <div
        class="play-card"
        @pointerdown=${B=>this.handlePadPointerDown(B,e)}
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
          ${q?m`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${R}</div>
          `:""}
        </div>
        <svg width="${E}" height="${T}" viewBox="-13 -2 ${E} ${T}" style="display: block; width: 100%; max-width: ${E*1.5}px; height: auto;">
          ${C.map(B=>re`
            <rect x="0" y="${B.y}" width="${L}" height="${B.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${x.map(B=>re`
            <rect x="${B.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${$.map(B=>re`
            <circle cx="${B.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${N.map(B=>re`
            <text x="${B.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${I.map(B=>re`
            <g>
              <circle cx="${B.cx}" cy="${B.cy}" r="${B.fill==="#F2735F"?7.5:7}" fill="${B.fill}"></circle>
              ${B.label?re`
                <text x="${B.cx}" y="${B.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${B.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${H}</div>
      </div>
    `}renderChordPad(t,e,i,o){const s=se(t.tension||.1),n=this.activeIndex===e&&this.playing,a=this.padFlash===e||this.padHeld===e,l=this.swapIndex===e,r=this.selectedBand?me(this.selectedBand):null,c=this.progression?.key||"C",d=this.progression?.scaleType||"MAJOR",p=r?ln(t,r.name,c,d):null,u=!!this.bandSwaps[e],h=this.getChordLadder(t),g=this.getLadderHome(t),f=this.lastPad?.idx===e,b=f&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:g,y=f&&b>=0&&b!==g&&h[b],x=y?b:g,C=f?y?"→ "+h[b]:ml[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"",I=h.map(E=>String(E).replace(/^[A-G][#b]?/,"")),$=I[0];let N=I.slice();$&&I.every((E,T)=>T===0||E.indexOf($)===0)?N=I.map((E,T)=>T?E.slice($.length):E):$&&I.every((E,T)=>T===0||E.slice(-$.length)===$)&&(N=I.map((E,T)=>T?E.slice(0,E.length-$.length):E)),N=N.map(E=>(E===""?"maj":E).replace(/maj/gi,"△"));const L=h.map((E,T)=>({label:N[T],wrapStyle:"flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;",labelStyle:`font-size: 8.5px; font-weight: 800; letter-spacing: 0.2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: clip; color: ${T===x?y?i:"rgba(46,39,31,0.78)":"rgba(46,39,31,0.3)"}; transition: color 180ms cubic-bezier(0.23,1,0.32,1);`,barStyle:`width: 100%; height: 4px; border-radius: 3px; background: ${T===x?y?i:"rgba(46,39,31,0.5)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;`}));return m`
      <div
        class="pad-cell ${o?"chord-item-wrap":""} ${a?"pad-held":""} ${l?"selected":""} ${n?"pad-lit":""}"
        style="
          background: ${s.color};
          border-radius: ${l&&o?"20px 20px 5px 5px":"20px"};
          ${l?`box-shadow: inset 0 0 0 2.5px ${i}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${ut[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${E=>this.handlePadPointerDown(E,e)}
        @pointermove=${E=>this.handlePadPointerMove(E,e)}
        @pointerup=${E=>this.handlePadPointerUp(E)}
        @pointercancel=${E=>this.handlePadPointerUp(E)}
        @pointerleave=${E=>this.handlePadPointerUp(E)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${h.slice(1).map((E,T)=>m`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(T+1)/h.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${E=>{E.stopPropagation(),this.openSwap(e)}}
          @pointerdown=${E=>E.stopPropagation()}
          aria-label="Swap ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${E=>{E.stopPropagation(),this.openDetail(e)}}
          @pointerdown=${E=>E.stopPropagation()}
          aria-label="View voicing for ${t.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(Io[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?m`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${ul[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${f&&y&&h[b]?h[b]:t.name}</div>
          ${this.showTheory&&t.notes&&t.notes.length?m`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${t.notes.join(" · ")}
            </div>
          `:""}
          ${C?m`<div class="pad-meta-voicing">${C}</div>`:""}
          <div class="pad-rung-row" style="display: flex; gap: 4px; margin-top: 7px;">
            ${L.map(E=>m`
              <div class="pad-rung-col" style="${E.wrapStyle}">
                <div class="pad-rung-label" style="${E.labelStyle}">${E.label}</div>
                <div class="pad-rung-bar" style="${E.barStyle}"></div>
              </div>
            `)}
          </div>

          ${(p||u)&&r?m`
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
                  background: ${u?"#2E271F":r.color};
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
                @pointerdown=${E=>E.stopPropagation()}
                @click=${E=>{E.stopPropagation(),u?this.revertBandMove(e):p&&this.applyBandMove(e,p,r)}}
                aria-label="${u?`Undo ${this.bandSwaps[e]?.move.name} — put ${this.bandSwaps[e]?.originalChord.name} back`:`${p?.name} — change ${t.name} to ${p?.chord}`}"
              >
                ${this.showTheory&&!u&&p?.roman?m`
                  <span style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.5px; opacity: 0.7;">${p.roman}</span>
                `:""}
                <span>${u?"Revert":p?.name}</span>
              </button>
            </div>
          `:""}
        </div>
      </div>
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),i=this.savedSets.filter(a=>!e||(a.name+" "+a.genre+" "+a.mood).toLowerCase().includes(e)),o=i.map(a=>a.id),s=o.length>0&&o.every(a=>this.librarySelected.includes(a)),n=o.some(a=>this.librarySelected.includes(a));return m`
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
                .checked=${s}
                .indeterminate=${n&&!s}
                @change=${this.toggleSelectAllVisible}
                aria-label="Select all loops"
              />
              <button
                type="button"
                class="library-select-all-btn"
                style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer; padding: 0;"
                @click=${a=>{a.stopPropagation(),this.toggleSelectAllVisible()}}
              >
                ${s?"Deselect all":"Select all"}
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
          @input=${a=>{this.librarySearch=a.target.value}}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${i.map(a=>{const l=this.librarySelected.includes(a.id),r=this.renamingId===a.id,c=this.confirmDeleteId===a.id;return m`
            <div
              class="library-loop-item ${this.librarySelectMode?"select-mode":""} ${l?"selected":""}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${l?"var(--cv-surface-2, #F1E4CC)":"var(--cv-surface)"}; transition: background 120ms ease;"
              @click=${()=>{this.librarySelectMode?this.toggleSelectLoop(a.id):!r&&!c&&(this.dispatchEvent(new CustomEvent("load-project",{detail:a,bubbles:!0,composed:!0})),this.setLibraryOpen(!1))}}
            >
              ${this.librarySelectMode?m`
                <input
                  type="checkbox"
                  class="loop-item-checkbox"
                  .checked=${l}
                  @click=${d=>d.stopPropagation()}
                  @change=${()=>this.toggleSelectLoop(a.id)}
                  style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px; flex-shrink: 0;"
                  aria-label="Select ${a.name}"
                />
              `:""}
              <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
                ${(a.chords||[]).map(d=>{const p=typeof d=="object"&&d!==null?d.tension??0:.2,u=se(p);return m`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(u.radius*.25)}px;background:${u.color};flex-shrink:0;"></span>`})}
              </div>
              <div style="flex: 1; min-width: 0;">
                ${r?m`
                  <input
                    type="text"
                    class="cv-vibe-input library-rename-input"
                    .value=${this.draftName}
                    @input=${d=>{this.draftName=d.target.value}}
                    @keydown=${d=>{d.key==="Enter"&&this.commitRename(a),d.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(a)}
                    @click=${d=>d.stopPropagation()}
                    style="width: 100%; box-sizing: border-box; border: none; background: var(--cv-cream, #FBF3E6); box-shadow: inset 0 0 0 1.5px rgba(46,39,31,0.16); border-radius: 9px; outline: none; font-family: inherit; font-size: 13px; font-weight: 800; color: var(--cv-ink); padding: 5px 8px;"
                  />
                `:m`
                  <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${a.name}</div>
                  <div style="font-size: 11px; color: var(--cv-ink-muted);">${a.genre} · ${a.mood}</div>
                `}
              </div>

              ${this.librarySelectMode?"":m`
                ${c?m`
                  <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;" @click=${d=>d.stopPropagation()}>
                    <button
                      type="button"
                      class="library-confirm-delete-btn"
                      @click=${()=>this.confirmDelete(a.id)}
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
                `:r?"":m`
                  <div class="library-item-actions" style="display: flex; gap: 2px; flex-shrink: 0;" @click=${d=>d.stopPropagation()}>
                    <button
                      type="button"
                      class="library-action-btn library-rename-btn"
                      @click=${()=>this.startRename(a.id,a.name)}
                      aria-label="Rename ${a.name}"
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
                      @click=${()=>this.askDelete(a.id)}
                      aria-label="Delete ${a.name}"
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
    `:""}render(){const t=this.progression?.chords||[],e=Lt(this.progression?.mood||"Warm"),i=$o.find(h=>h.name===this.selectedBand),o=this.getTheoryData(t),s=t.map(h=>h.tension||.1),n=Math.max(...s,.1),a=Math.min(...s,0),l=s.indexOf(n),r=s.every((h,g)=>g===0||h>=s[g-1]),c=n-a<.28?"Stays close to home":r?"A steady climb":s[s.length-1]<.25&&l<s.length-1?"Away, then home":"Drifts, then settles",d=`Opens ${ut[t[0]?.functionLabel]||"home"} and ${n-a<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":r?`tightens chord by chord, peaking on ${t[l]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[l]?.name||"the middle"} before easing back down home.`}`;let p=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression){if(this.activeSwapFamily==="Borrowed"&&this.chordData?.scales)p=Bi(this.chordData,this.progression,this.swapIndex);else if(this.chordData?.scales){const h=Do(this.chordData,this.progression,this.swapIndex);p=(h.find(f=>f.name===this.activeSwapFamily)||h[0])?.rows||[],yi[this.activeSwapFamily]&&yi[this.activeSwapFamily][this.showTheory?1:0]}if(i){const h=Ro(this.progression.key||"C",this.progression.scaleType||"MAJOR",i.name),g=new Map(h.map(y=>[y.chordName,y]));p=p.map(y=>{const x=g.get(y.name);return x?{...y,sub:this.showTheory?x.theory:x.plain,bandTag:`${i.name} move`,bandColor:i.color}:y});const f=p.filter(y=>y.bandTag),b=p.filter(y=>!y.bandTag);p=[...f,...b]}}const u=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?m`
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
                  ${ws.map(h=>m`
                    <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${lt.map(h=>{const g=h.name,f=h.dot,b=this.progression?.mood===g;return m`
                      <button
                        class="pill mood-pill ${b?"active":""}"
                        style="${b?`background: ${f}; color: #2E271F;`:""}"
                        @click=${()=>this.onMoodClick(g)}
                      >
                        <span class="mood-badge" style="background: ${b?"rgba(46, 39, 31, 0.12)":f+"33"};">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${b?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                        </span>
                        ${g}
                      </button>
                    `})}
                </div>

                <div class="popover-kicker spaced" style="display: flex; align-items: baseline; gap: 7px;">
                  <span>Band</span>
                  <span style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38); text-transform: lowercase;">optional</span>
                </div>
                <div class="pills-group">
                  ${$o.map(h=>{const g=ui[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return m`
                      <button
                        class="pill ${f?"active":""}"
                        style="font-family: ${g.font}; font-weight: ${g.weight||400}; font-style: ${g.italic?"italic":"normal"}; font-size: ${g.pillFs}px; letter-spacing: ${g.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
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
            ${this.activeView==="loop"?m`
              <div class="stage-card" style="padding: 18px 14px;">
                ${this.renderBandDnaBar(e)}

                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${t.map((h,g)=>{if(this.swapIndex===g){const f=se(h.tension||.1),b=this.activeIndex===g&&this.playing;return m`
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
                            .barIndex=${g}
                            .feelings=${this.getSwapFeelings(g)}
                            .feelIndex=${this.mobileFeelIndex}
                            .chordIndex=${this.mobileChordIndex}
                            @cycler-audition=${y=>this.handleSwapAudition(y.detail)}
                            @cycler-keep=${y=>this.handleCyclerKeep(y.detail)}
                            @cycler-revert=${()=>this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `}return this.renderChordPad(h,g,e,!1)})}
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
                  <span>${Je(this.instrument)}</span>
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

              ${this.expandedInstrument?m`
                <div class="mobile-instrument-drawer" style="animation: cvfv-panel 200ms var(--cv-ease, ease); background: var(--cv-cream, #FBF3E6); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label, #8A6B3F);">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                    ${Pe.map(h=>m`
                      <button
                        class="pill ${Je(this.instrument)===h.name?"active":""}"
                        @click=${()=>{this.instrument=h.name,v.setInstrument(h.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
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

              ${this.showTheory?m`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${c}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(h=>{const g=Math.round(28+(h.tension||.1)*85),f=se(h.tension||.1);return m`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; max-width: 34px; height: ${g}px; border-radius: 100px; background: ${f.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${h.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${ut[h.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${d}</div>
                  ${this.renderTheoryStrip(o)}
                </div>
              `:""}
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
                    ${t.map((h,g)=>this.renderPianoCard(h,g))}
                  </div>
                `:m`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${t.map((h,g)=>this.renderFretCard(h,g,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
              ${this.isSaved?m`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#2E271F"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
              `:m`
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
              ${ws.map(h=>m`
                <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${lt.map(h=>{const g=h.name,f=h.dot,b=this.progression?.mood===g;return m`
                  <button class="pill mood-pill ${b?"active":""}" style="${b?`background: ${f}; color: #2E271F;`:""}" @click=${()=>this.onMoodClick(g)}>
                    <span class="mood-badge" style="background: ${b?"rgba(46, 39, 31, 0.12)":f+"33"};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${b?"#2E271F":f}" stroke-width="2.2" stroke-linecap="round"><path d="${h.iconPath}"/></svg>
                    </span>
                    ${g}
                  </button>
                `})}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${$o.map(h=>{const g=ui[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return m`
                  <button
                    class="pill ${f?"active":""}"
                    style="font-family: ${g.font}; font-weight: ${g.weight||400}; font-style: ${g.italic?"italic":"normal"}; font-size: ${g.pillFs}px; letter-spacing: ${g.pillTrack}; ${f?`background: ${h.color}; color: #2E271F; border-color: ${h.color}; box-shadow: 0 2px 8px -2px rgba(46,39,31,0.3);`:""}"
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
            ${this.activeView==="loop"?m`
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
                  ${t.map((h,g)=>{const b=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/4)+1)*4-1);return m`
                      ${this.renderChordPad(h,g,e,!0)}
                      ${this.swapIndex!==null&&g===b?m`
                        <chord-swap-lane
                          .swapIndex=${this.swapIndex}
                          .chord=${t[this.swapIndex]}
                          .feelings=${this.getSwapFeelings(this.swapIndex)}
                          .activeFeel=${this.activeSwapFamily}
                          .pickedChord=${this.abPick}
                          .padCols=${Math.min(t.length,4)}
                          .moodColor=${e}
                          .band=${i?{name:i.name,color:i.color,plain:this.showTheory?i.theory:i.plain}:null}
                          @swap-feel-change=${y=>{this.activeSwapFamily=y.detail.feel,this.requestUpdate()}}
                          @swap-audition=${y=>this.handleSwapAudition(y.detail)}
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
                    ${Je(this.instrument)}
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
                ${this.expandedInstrument?m`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Instrument</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${Pe.map(h=>m`
                        <button
                          class="pill ${Je(this.instrument)===h.name?"active":""}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument||"Piano")===h.name?"var(--cv-ink)":"var(--cv-surface)"}; color: ${(this.instrument||"Piano")===h.name?"var(--cv-cream)":"var(--cv-ink)"}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${()=>{this.instrument=h.name,v.setInstrument(h.name),this.dispatchEvent(new CustomEvent("set-instrument",{detail:h.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1,this.requestUpdate()}}
                        >
                          <span style="background:${h.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${h.name}
                        </button>
                      `)}
                    </div>
                  </div>
                `:""}
              </div>
            `:this.activeView==="song"?this.renderSongSectionList(e):m`
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
                  ${t.map((h,g)=>this.renderPianoCard(h,g))}
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
                  ${t.map((h,g)=>this.renderFretCard(h,g,this.playInstrument==="Ukulele"?"Ukulele":"Guitar"))}
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
          ${this.detailOpen?m`
            <!-- Chord Detail View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; gap: 13px;">
                <div class="chord-shape-badge" style="background: ${se(t[this.detailIndex]?.tension||.1).color};"></div>
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
                    <span class="swap-chord-name">${u?.name||""}</span>
                    ${this.showTheory&&u?.roman?m`<span class="swap-roman">${u.roman}</span>`:""}
                    <span class="swap-role">${ut[u?.functionLabel||""]||""}</span>
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
                  <div class="arc-title-text">${c}</div>
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
                ${t.map((h,g)=>{const f=se(h.tension||.1),b=Math.round(18+(h.tension||.1)*62);return m`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(g)} aria-label="${h.name}, ${ut[h.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${b}px; background: ${f.color};"></div>
                      </div>
                      <div class="arc-bar-name">${h.name}</div>
                      <div class="arc-bar-feel">${ut[h.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${d}</div>
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
    `}};A.styles=xe`
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
  `;F([k({type:Object})],A.prototype,"chordData",2);F([k({type:Object})],A.prototype,"progression",2);F([k({type:Number})],A.prototype,"activeIndex",2);F([k({type:Number})],A.prototype,"progressStep",2);F([k({type:Array})],A.prototype,"order",2);F([k({type:Boolean})],A.prototype,"playing",2);F([k({type:Boolean})],A.prototype,"showTheory",2);F([k({type:String})],A.prototype,"instrument",2);F([k({type:String})],A.prototype,"playStyle",2);F([k({type:Boolean})],A.prototype,"isAuthenticated",2);F([k({type:String})],A.prototype,"userEmail",2);F([k({type:Array})],A.prototype,"sections",2);F([k({type:Number})],A.prototype,"activeSectionIdx",2);F([k({type:Number})],A.prototype,"activePlayingSectionIdx",2);F([k({type:Number})],A.prototype,"totalSongSteps",2);F([k({type:Boolean})],A.prototype,"isGenerating",2);F([k({type:Boolean})],A.prototype,"libraryOpen",2);F([k({type:Boolean})],A.prototype,"isSaved",2);F([k({type:String})],A.prototype,"currentProjectId",2);F([w()],A.prototype,"isMobile",2);F([w()],A.prototype,"activeView",2);F([w()],A.prototype,"vibeOpen",2);F([w()],A.prototype,"showSaveModal",2);F([w()],A.prototype,"pendingSaveName",2);F([k({type:String})],A.prototype,"selectedBand",2);F([w()],A.prototype,"bandSwaps",2);F([w()],A.prototype,"freeText",2);F([w()],A.prototype,"vibePlaceholderIdx",2);F([w()],A.prototype,"expandedGenre",2);F([w()],A.prototype,"expandedMood",2);F([w()],A.prototype,"activeSwapFamily",2);F([w()],A.prototype,"swapIndex",2);F([w()],A.prototype,"isInspectorOpen",2);F([w()],A.prototype,"detailOpen",2);F([w()],A.prototype,"detailIndex",2);F([w()],A.prototype,"abPick",2);F([w()],A.prototype,"abSide",2);F([w()],A.prototype,"abPlaying",2);F([w()],A.prototype,"mobileFeelIndex",2);F([w()],A.prototype,"mobileChordIndex",2);F([w()],A.prototype,"savedSets",2);F([w()],A.prototype,"renamingId",2);F([w()],A.prototype,"draftName",2);F([w()],A.prototype,"confirmDeleteId",2);F([w()],A.prototype,"librarySearch",2);F([w()],A.prototype,"librarySelectMode",2);F([w()],A.prototype,"librarySelected",2);F([w()],A.prototype,"playInstrument",2);F([w()],A.prototype,"showDegrees",2);F([w()],A.prototype,"mobileSheetOpen",2);F([w()],A.prototype,"mobileDetailSheetOpen",2);F([w()],A.prototype,"padFlash",2);F([w()],A.prototype,"padHeld",2);F([w()],A.prototype,"gridFor",2);F([w()],A.prototype,"lastPad",2);F([w()],A.prototype,"tempoOpen",2);F([w()],A.prototype,"feelOpen",2);F([w()],A.prototype,"shareOpen",2);F([w()],A.prototype,"expandedInstrument",2);F([w()],A.prototype,"barsPerChord",2);F([w()],A.prototype,"swing",2);F([w()],A.prototype,"spread",2);F([w()],A.prototype,"density",2);F([w()],A.prototype,"humanise",2);F([w()],A.prototype,"tone",2);F([w()],A.prototype,"feelScope",2);F([w()],A.prototype,"barFeel",2);F([w()],A.prototype,"advOverride",2);F([w()],A.prototype,"advOpen",2);F([w()],A.prototype,"showAdvancedFeel",2);F([w()],A.prototype,"humanEngineState",2);F([w()],A.prototype,"auditionDeg",2);F([w()],A.prototype,"auditionName",2);F([w()],A.prototype,"auditionBar",2);A=F([ke("loop-screen")],A);var wl=Object.defineProperty,kl=Object.getOwnPropertyDescriptor,P=(t,e,i,o)=>{for(var s=o>1?void 0:o?kl(e,i):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(o?a(e,i,s):a(s))||s);return o&&s&&wl(e,i,s),s};function Sl(t){const e=t.replace("#",""),i=parseInt(e.substring(0,2),16)||201,o=parseInt(e.substring(2,4),16)||169,s=parseInt(e.substring(4,6),16)||224;return`rgba(${i}, ${o}, ${s}, 0.18)`}let D=class extends we{constructor(){super(...arguments),this.activeTab="loop",this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.melodyStyle="auto",this.melodyDensity=45,this.melodyBandOn=!0,this.saveDialog=null,this.swapState={swapIndex:null,abPick:null,feel:""},this.closeSwapSignal=0,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.chordPlaying=!1,this.melodyPlaying=!1,this.songPlaying=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.melodySound="Stage Rhodes",this.melodyFeel="Smooth",this.melodyFeelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.chordFeelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.melodyBackingEnabled=!0,this.length=4,this.sections=[],this.songTimeline=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.syncError=null,this.authModalOpen=!1,this.midiModalOpen=!1,this.shareModalOpen=!1,this.selectedChordIndex=null,this.selectedBand=null,this.melodyTrack=null,this.melodyLoop="Section",this.melodySpan=[0,16],this.playInstrument="Piano",this.showDegrees=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.chordLengthCache=[],this.vibeOpen=!1,this.vibeSearchText="",this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Ft.signOut(),j.logout()},this.toastUndoAction="delete",this.toastUndoProject=null}connectedCallback(){super.connectedCallback();const t=l=>{try{return typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(l):null}catch{return null}};this.showTheory=(t("chroma-chords-show-theory")||t("chord-voyager-show-theory"))==="true";const e=t("chroma-chords-instrument");e&&Pe.some(l=>l.name===e)&&(this.instrument=e);const i=t("chroma-chords-play-style");i&&Wt.some(l=>l.name===i)&&(this.playStyle=i);const o=t("chroma-melody-sound");o&&Pe.some(l=>l.name.toLowerCase()===o.toLowerCase())?this.melodySound=o:this.melodySound="Stage Rhodes";const s=t("chroma-melody-style");(s==="auto"||Pi.some(l=>l.id===s))&&(this.melodyStyle=s);const n=Number(t("chroma-melody-density"));n>0&&n<=100&&(this.melodyDensity=n),t("chroma-melody-band-on")==="false"&&(this.melodyBandOn=!1);const a=t("chroma-melody-feel");a&&(this.melodyFeel=a),v.setInstrument(this.instrument),v.setPlayStyle(this.playStyle),v.setMelodySound(this.melodySound),v.setMelodyFeel(this.melodyFeel),v.setMelodyFeelSettings(this.melodyFeelSettings),v.setMelodyBackingEnabled(this.melodyBackingEnabled),this.unsubscribeAuth=Ft.subscribe(l=>{this.userEmail=l.user?.email||null,this.isAuthenticated=l.isAuthenticated}),this.unsubscribeProjects=j.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=j.subscribeSyncStatus(l=>{const r=this.syncStatus;if(this.syncStatus=l,this.syncError=j.getLastSyncError(),l==="offline"&&r!=="offline"){const c=this.syncError||"Cloud sync failed";this.showToast(`Sync failed: ${c}`)}this.requestUpdate()}),this.unsubscribeTick=v.subscribeTick((l,r,c,d,p,u)=>{this.activeIndex=l,this.progressStep=typeof u=="number"&&u>=0?u:r,typeof c=="number"&&(this.activePlayingSectionIdx=c),typeof d=="number"&&(this.totalSongSteps=d),this.playing=v.isPlaying(),this.chordPlaying=v.isChordPlaying(),this.melodyPlaying=v.isMelodyPlaying(),this.songPlaying=v.isSongPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),da().then(l=>{this.chordData=l,this.progression||(this.progression=Ai(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(r,c)=>c),v.setProgression(this.progression,this.order),this.sections=Z.createInitialSong(this.progression,this.order),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack=ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack))}).catch(l=>{console.error("Failed to load chord data:",l)})}disconnectedCallback(){super.disconnectedCallback(),v.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return j.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?this.libraryOpen=!0:t==="melody"?this.activeTab="melody":t==="song"?this.activeTab="song":t==="play"?this.activeTab="play":(t==="chords"||t==="loop")&&(this.activeTab="loop")}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const i=(typeof t?.detail=="string"?t.detail:t?.detail?.promptText)||this.activeSearchPrompt||void 0;i&&this.showToast("Composing chords with AI...");const o=await er.resolvePrompt(this.chordData,this.genre,this.mood,this.length,i);o.instrument&&(this.instrument=o.instrument,localStorage.setItem("chroma-chords-instrument",o.instrument),v.setInstrument(o.instrument)),o.playStyle&&(this.playStyle=o.playStyle,localStorage.setItem("chroma-chords-play-style",o.playStyle),v.setPlayStyle(o.playStyle));const s=o.progression;this.progression=s,s.genre&&(this.genre=s.genre),s.mood&&(this.mood=s.mood),this.order=Array.from({length:s.chords.length},(n,a)=>a),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.chordLengthCache=[],v.setProgression(s,this.order),v.reset(),this.sections=Z.createInitialSong(s,this.order),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack&&this.melodyTrack.notes.length>0?this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,s):this.melodyTrack=ve.createEmptyTrack(s),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.activeSearchPrompt=null,i&&this.showToast(`Composed from "${i}"`)}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){const e=t.detail;if(!this.progression||e===this.length)return;const i=xa(this.progression,e,this.chordData,this.chordLengthCache);this.progression=i.progression,this.chordLengthCache=i.cachedTailChords,this.length=this.progression.chords.length,this.order=Array.from({length:this.length},(o,s)=>s),v.setProgression(this.progression,this.order),this.sections.length>0?this.sections=Z.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order):this.sections=Z.createInitialSong(this.progression,this.order),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression),v.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;this.chordLengthCache=[];const t=Ai(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,i)=>i),this.activeIndex=0,this.progressStep=0,v.setProgression(t,this.order),this.sections=Z.createInitialSong(this.progression,this.order),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack&&this.melodyTrack.notes.length>0?this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression):this.melodyTrack=ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.playing&&(v.startAutoplay(),v.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}toggleTheory(){this.showTheory=!this.showTheory;try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}catch{}}toggleVibe(){this.vibeOpen=!this.vibeOpen}applyPromptSearch(){this.vibeSearchText.trim()&&(this.onGenerate(new CustomEvent("generate",{detail:this.vibeSearchText.trim()})),this.vibeOpen=!1,this.vibeSearchText="")}onLoadProject(t){const e=t.detail,i=[];for(const o of e.chords){let s=o.notes;(!s||s.length===0)&&(s=W(o.name,U(e.key||"C",e.scaleType||"MAJOR"))),i.push({name:o.name,tag:o.tag||"diatonic",roman:o.roman||"",color:o.color||"#9CC0EC",functionLabel:o.functionLabel||"",notes:s,scaleLabel:o.scaleLabel||"",desc:o.desc||"",degree:o.degree||"",scaleKey:o.scaleKey||"",tension:o.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:i},this.order=Array.from({length:this.progression.chords.length},(o,s)=>s),this.length=this.progression.chords.length,this.chordLengthCache=[],this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&v.setBarsPerChord(e.barsPerChord),e.feel&&v.setFeelSettings(e.feel),v.setProgression(this.progression,this.order),this.sections=Z.createInitialSong(this.progression,this.order),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack=e.melodyTrack||ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.sections=Z.setSectionMelody(this.sections,0,this.melodyTrack),this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){j.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=j.getProjects().find(i=>i.id===t.detail.id);e&&(e.name=t.detail.name,j.saveProject(e),this.requestUpdate())}async onSyncProjects(){await j.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onUnsaveSet(t){const e=t.detail||this.currentProjectId;if(e){const i=j.getProjects().find(s=>s.id===e),o=i?.name||"Loop";i&&(this.toastUndoProject={...i}),j.deleteProject(e),this.currentProjectId===e&&(this.currentProjectId=null),this.showToast(`Removed "${o}"`,e,"restore"),this.requestUpdate()}}safeSet(t,e){try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}catch{}}onTheoryToggle(){this.showTheory=!this.showTheory,this.safeSet("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,this.safeSet("chroma-chords-instrument",t.detail),v.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,this.safeSet("chroma-chords-play-style",t.detail),v.setPlayStyle(t.detail)}onTogglePlay(t){const e=t||(this.activeTab==="melody"?"melody":this.activeTab==="song"?"song":"chords");e==="melody"?(this.updateEngineLoop(),this.playing=v.togglePlay("melody"),this.melodyPlaying=v.isMelodyPlaying(),this.chordPlaying=!1,this.songPlaying=!1):e==="song"?(v.setStepLoop(null),this.captureActiveMelody(),v.setSong(this.sections),this.playing=v.togglePlay("song"),this.songPlaying=v.isSongPlaying(),this.chordPlaying=!1,this.melodyPlaying=!1):(v.setStepLoop(null),v.setProgression(this.progression,this.order),this.playing=v.togglePlay("chords"),this.chordPlaying=v.isChordPlaying(),this.melodyPlaying=!1,this.songPlaying=!1)}onTogglePlaySong(){this.onTogglePlay("song")}onSetMelodySound(t){const e=typeof t.detail=="object"&&t.detail!==null?t.detail.sound:t.detail;e&&(this.melodySound=e,this.safeSet("chroma-melody-sound",e),v.setMelodySound(e),this.requestUpdate())}onSetMelodyFeel(t){const e=typeof t.detail=="object"&&t.detail!==null?t.detail.feel||t.detail.playStyle:t.detail;e&&(this.melodyFeel=e,this.safeSet("chroma-melody-feel",e),v.setMelodyFeel(e),this.requestUpdate())}onMelodyFeelSettingsChange(t){const e=t.detail?.feelSettings;e&&(this.melodyFeelSettings={...e},v.setMelodyFeelSettings(e),this.requestUpdate())}onToggleMelodyBacking(t){t&&typeof t.detail?.backingEnabled=="boolean"?this.melodyBackingEnabled=t.detail.backingEnabled:this.melodyBackingEnabled=!this.melodyBackingEnabled,v.setMelodyBackingEnabled(this.melodyBackingEnabled),this.requestUpdate()}onMelodyLoopCycle(t){const e=["Section","Chord","Span"],i=t||e[(e.indexOf(this.melodyLoop)+1)%3];this.melodyLoop=i,this.updateEngineLoop(),this.requestUpdate()}updateEngineLoop(){if(this.activeTab!=="melody"){v.setStepLoop(null);return}const t=this.progression?.chords.length||4;if(this.melodyLoop==="Section")v.setStepLoop([0,t*16]);else if(this.melodyLoop==="Chord"){const e=this.activeIndex%t;v.setStepLoop([e*16,(e+1)*16])}else this.melodyLoop==="Span"&&v.setStepLoop(this.melodySpan&&this.melodySpan[1]>this.melodySpan[0]?this.melodySpan:[0,16])}onSwitchTab(t){this.activeTab=t,this.updateEngineLoop()}onProgressionChange(t){this.progression=t.detail,this.progression&&(this.length=this.progression.chords.length,(this.order.length!==this.length||this.order.some(e=>e>=this.length))&&(this.order=Array.from({length:this.length},(e,i)=>i))),v.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=Z.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.songTimeline=Z.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression),v.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}generateSectionMelody(t,e){const i={Verse:"Arch",Chorus:"AnthemHook",Bridge:"CallAndResponse",Outro:"DescendingSigh","Pre-chorus":"AscendingClimax"},o=this.selectedBand?me(this.selectedBand):void 0,s=this.melodyBandOn&&o&&Ri[o.id]?o.id:void 0;return ve.generateMelody(t,{contour:this.melodyStyle==="auto"?i[e]||"Arch":this.melodyStyle,density:this.melodyDensity,octave:4,guideMode:"scale-key",bandId:s,seed:Math.floor(Math.random()*1e5)+1})}rebuildMelodyForBand(){const t=this.selectedBand?me(this.selectedBand):void 0;if(!t||!Ri[t.id]||!this.melodyBandOn||!this.progression||!this.melodyTrack||this.melodyTrack.notes.length===0)return;const e=this.sections[this.activeSectionIdx];this.melodyTrack=this.generateSectionMelody(this.progression,e?.name||"Verse"),v.setMelodyTrack(this.melodyTrack),this.sections=Z.setSectionMelody(this.sections,this.activeSectionIdx,this.melodyTrack),this.showToast(`Melody follows ${t.name}`)}captureActiveMelody(){this.sections[this.activeSectionIdx]&&(this.sections=Z.setSectionMelody(this.sections,this.activeSectionIdx,this.melodyTrack))}loadSectionMelody(t){t&&(this.melodyTrack=t.melodyTrack??ve.createEmptyTrack(t.progression),v.setMelodyTrack(this.melodyTrack))}onAddSection(){if(!this.progression)return;this.captureActiveMelody();const t=this.sections.length,e=Z.addSection(this.sections,this.progression,this.chordData);if(this.sections=e.sections,this.sections.length>t){const o=this.sections[e.activeIndex];this.sections=Z.setSectionMelody(this.sections,e.activeIndex,this.generateSectionMelody(o.progression,o.name))}this.songTimeline=Z.createDefaultTimeline(this.sections),this.activeSectionIdx=e.activeIndex;const i=this.sections[this.activeSectionIdx];i&&(this.progression=i.progression,this.order=i.order.slice(),v.setProgression(this.progression,this.order),this.loadSectionMelody(i)),v.setSong(this.sections),this.requestUpdate()}onRemoveSection(t){const e=t.detail;this.captureActiveMelody();const i=Z.removeSection(this.sections,e);this.sections=i.sections,this.songTimeline=Z.createDefaultTimeline(this.sections),this.activeSectionIdx=i.activeIndex;const o=this.sections[this.activeSectionIdx];o&&(this.progression=o.progression,this.order=o.order.slice(),v.setProgression(this.progression,this.order),this.loadSectionMelody(o)),v.setSong(this.sections),this.requestUpdate()}onSelectSection(t){const e=typeof t.detail=="object"&&t.detail!==null&&"sectionIndex"in t.detail?t.detail.sectionIndex:t.detail;e!==this.activeSectionIdx&&this.captureActiveMelody(),this.activeSectionIdx=e;const i=this.sections[e];i&&(this.progression=i.progression,this.order=i.order.slice(),v.setProgression(this.progression,this.order),this.loadSectionMelody(i)),this.requestUpdate()}onPickSection(t){const e=t.detail?.id,i=this.sections.findIndex((o,s)=>(o.id||String.fromCharCode(65+s))===e);i>=0&&this.onSelectSection(new CustomEvent("select-section",{detail:i}))}showToast(t,e,i="delete"){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastUndoAction=i,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null},3200)}onToastUndo(){this.toastUndoId&&(this.toastUndoAction==="restore"&&this.toastUndoProject?(j.saveProject(this.toastUndoProject),this.currentProjectId=this.toastUndoProject.id):this.toastUndoAction==="delete"&&(j.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null)),this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null,this.requestUpdate())}loopFingerprint(t){return t?JSON.stringify([t.genre,t.mood,t.key,t.scaleType,t.bpm,t.barsPerChord??1,(t.chords||[]).map(e=>e.name)]):""}getSaveState(){const t=this.currentProjectId?j.getProjects().find(o=>o.id===this.currentProjectId):void 0;if(!t||!this.progression)return"new";const e=this.loopFingerprint({...this.progression,barsPerChord:v.getBarsPerChord()}),i=this.loopFingerprint({...t,barsPerChord:t.barsPerChord??v.getBarsPerChord()});return e===i?"saved":"edited"}suggestLoopName(){const t=this.progression,e=t?`${t.genre||"Pop"} · ${(t.mood||"dreamy").toLowerCase()}`:"Untitled loop",i=new Set(j.getProjects().map(s=>s.name));if(!i.has(e))return e;let o=2;for(;i.has(`${e} ${o}`);)o++;return`${e} ${o}`}onSavePressed(){const t=this.getSaveState();if(t==="saved"&&this.currentProjectId){this.onUnsaveSet(new CustomEvent("unsave-set",{detail:this.currentProjectId}));return}this.saveDialog={name:this.suggestLoopName(),edited:t==="edited"}}confirmSaveDialog(t){const e=this.saveDialog;if(!e)return;const i=this.currentProjectId?j.getProjects().find(s=>s.id===this.currentProjectId):void 0,o=!t&&i?.name||e.name.trim()||this.suggestLoopName();this.saveDialog=null,this.saveProject(o,t)}saveProject(t,e=!1){if(!this.progression)return;const i=!e&&this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=i;const o=j.getProjects().find(r=>r.id===i),s=t||o?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,n=v.getFeelSettings(),a=v.getBarsPerChord(),l={id:i,name:s,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:a,feel:{swing:n.swing??0,spread:n.spread??50,density:n.density??50,tone:n.tone??"Warm",humanState:n.humanState}};j.saveProject(l),t&&j.scheduleCloudSync(),this.showToast(`Saved "${s}"`,i,"delete"),this.requestUpdate()}renderSaveDialog(){const t=this.saveDialog,e=this.currentProjectId?j.getProjects().find(i=>i.id===this.currentProjectId):void 0;return m`
      <div class="save-dialog-backdrop" @click=${()=>{this.saveDialog=null}}>
        <div class="save-dialog" role="dialog" aria-label="Save this loop" @click=${i=>i.stopPropagation()}>
          <div class="save-dialog-title">${t.edited?"Save this loop":"Name this loop"}</div>
          <div class="save-dialog-sub">
            ${t.edited?m`You changed \u201C${e?.name||"this loop"}\u201D since you saved it. Keep both, or replace the saved one.`:"Give it a name so you can find it later."}
          </div>
          <input
            class="save-dialog-input"
            aria-label="Loop name"
            .value=${t.name}
            placeholder="e.g. 2am drive"
            @input=${i=>{this.saveDialog={...t,name:i.target.value}}}
            @keydown=${i=>{i.key==="Enter"&&this.confirmSaveDialog(!0),i.key==="Escape"&&(this.saveDialog=null)}}
          />
          <div class="save-dialog-actions">
            <button class="save-dialog-btn ghost" @click=${()=>{this.saveDialog=null}}>Cancel</button>
            ${t.edited?m`
              <button class="save-dialog-btn" @click=${()=>this.confirmSaveDialog(!1)}>Update \u201C${e?.name||"saved loop"}\u201D</button>
            `:""}
            <button class="save-dialog-btn primary" @click=${()=>this.confirmSaveDialog(!0)}>${t.edited?"Save as new":"Save"}</button>
          </div>
        </div>
      </div>
    `}render(){const t=this.getSaveState(),e=t==="saved",i=Lt(this.progression?.mood||this.mood),o=Sl(i),s=this.sections[this.activeSectionIdx],n=s?s.id||String.fromCharCode(65+this.activeSectionIdx):"A",a=this.sections.reduce((r,c)=>r+(c.order?.length||4)*(v.getBarsPerChord()||1),0),l=`${this.sections.length} ${this.sections.length===1?"section":"sections"} · ${a} bars`;return m`
      <!-- Top Site Header -->
      <header class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .showNav=${!1}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${j.getProjects().length}
          .syncStatus=${this.syncStatus}
          .syncError=${this.syncError}
          @tab-change=${r=>{this.activeTab=r.detail}}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @brand-click=${()=>{this.activeTab="loop"}}
          @open-midi=${()=>{this.midiModalOpen=!0}}
        ></app-header>
      </header>

      <!-- 3-Part Desktop Stage / Mobile Flex Body -->
      <div class="stage-body">

        <!-- 2. Center Main Column (Sub-Nav Row -> Scrollable Content -> Docked Transport Bar) -->
        <main class="main-column">
          <!-- Sub-Header Nav Row: Tier-1 Navigation Tabs + Theory Switch -->
          <div class="sub-nav-row">
            <div class="nav-tabs-track" role="tablist" aria-label="Main Views">
              <button
                class="nav-tab-btn ${this.activeTab==="loop"?"active":""}"
                role="tab"
                aria-selected=${this.activeTab==="loop"}
                @click=${()=>this.onSwitchTab("loop")}
              >
                Chords
              </button>
              <button
                class="nav-tab-btn ${this.activeTab==="melody"?"active":""}"
                role="tab"
                aria-selected=${this.activeTab==="melody"}
                @click=${()=>this.onSwitchTab("melody")}
              >
                Melody
              </button>
              <button
                class="nav-tab-btn ${this.activeTab==="song"?"active":""}"
                role="tab"
                aria-selected=${this.activeTab==="song"}
                @click=${()=>this.onSwitchTab("song")}
              >
                Song
              </button>
              <button
                class="nav-tab-btn ${this.activeTab==="play"?"active":""}"
                role="tab"
                aria-selected=${this.activeTab==="play"}
                @click=${()=>this.onSwitchTab("play")}
              >
                Play it
              </button>
            </div>

            <div class="nav-spacer"></div>

            <button
              class="theory-nav-toggle ${this.showTheory?"active":""}"
              @click=${this.toggleTheory}
              aria-label="${this.showTheory?"Hide music theory":"Show music theory"}"
              aria-pressed="${this.showTheory}"
              style="--theory-mood-color: ${i};"
            >
              <span class="theory-nav-label">Theory</span>
              <span class="theory-nav-pip ${this.showTheory?"on":""}">
                <span class="theory-nav-knob"></span>
              </span>
            </button>
          </div>

          <!-- Scrollable Content View: ONE Main Tinted Panel -->
          <div class="scrollable-content ${this.activeTab==="melody"?"fill":""}" style="--panel-tint-bg: ${o};">
            ${this.progression?m`
              ${this.activeTab==="loop"?m`
                <div class="main-tinted-panel">
                  <tab-chords
                    .progression=${this.progression}
                    .chordData=${this.chordData}
                    .moodColor=${i}
                    .selectedBand=${this.selectedBand}
                    .isPlaying=${this.playing}
                    .activeIndex=${this.activeIndex}
                    .showTheory=${this.showTheory}
                    .closeSwapSignal=${this.closeSwapSignal}
                    @swap-state=${r=>{this.swapState=r.detail}}
                    @chord-detail-open=${r=>{this.selectedChordIndex=r.detail.index}}
                    @progression-update=${r=>{this.progression&&this.onProgressionChange(new CustomEvent("progression-change",{detail:{...this.progression,chords:r.detail.chords}}))}}
                    @progression-change=${this.onProgressionChange}
                    @set-chord-count=${r=>{this.onLengthChange(new CustomEvent("set-length",{detail:r.detail.count}))}}
                    @reroll=${this.onReroll}
                    @clear-band=${()=>{this.selectedBand=null}}
                    @open-vibe-picker=${()=>{this.vibeOpen=!0}}
                  ></tab-chords>
                </div>
              `:this.activeTab==="melody"?m`
                <div class="main-tinted-panel">
                  <tab-melody
                    .progression=${this.progression}
                    .melodyTrack=${this.melodyTrack}
                    .melodySound=${this.melodySound}
                    .activeStepIndex=${this.progressStep}
                    .playing=${this.melodyPlaying}
                    .backingEnabled=${this.melodyBackingEnabled}
                    .showTheory=${this.showTheory}
                    .melodyLoop=${this.melodyLoop}
                    .span=${this.melodySpan}
                    .melodyStyle=${this.melodyStyle}
                    .density=${this.melodyDensity}
                    .bandId=${this.selectedBand}
                    .bandOn=${this.melodyBandOn}
                    @melody-style-change=${r=>{this.melodyStyle=r.detail.style,this.melodyDensity=r.detail.density,this.melodyBandOn=r.detail.bandOn,this.safeSet("chroma-melody-style",this.melodyStyle),this.safeSet("chroma-melody-density",String(this.melodyDensity)),this.safeSet("chroma-melody-band-on",String(this.melodyBandOn))}}
                    @toggle-play=${()=>{this.onTogglePlay("melody")}}
                    @toggle-backing=${r=>{this.onToggleMelodyBacking(r)}}
                    @melody-change=${r=>{this.melodyTrack=r.detail.track,v.setMelodyTrack(this.melodyTrack),this.sections=Z.setSectionMelody(this.sections,this.activeSectionIdx,this.melodyTrack),v.updateSongSections(this.sections)}}
                    @span-change=${r=>{this.melodySpan=r.detail.span,this.updateEngineLoop()}}
                    @melody-loop-change=${r=>{this.onMelodyLoopCycle(r.detail.loop||r.detail.melodyLoop)}}
                    @toast=${r=>this.showToast(r.detail)}
                  ></tab-melody>
                </div>
              `:this.activeTab==="song"?m`
                <tab-song
                  .sections=${this.sections}
                  .timeline=${this.songTimeline}
                  .activeSectionIdx=${this.activeSectionIdx}
                  .activeTimelineIdx=${this.activePlayingSectionIdx}
                  .currentStep=${this.progressStep}
                  .playing=${this.playing}
                  .mood=${this.mood}
                  .bpm=${this.progression?.bpm||120}
                  @select-section=${r=>this.onSelectSection(r)}
                  @section-select=${r=>this.onSelectSection(r)}
                  @reorder-timeline=${r=>{this.songTimeline=r.detail.timeline}}
                  @timeline-change=${r=>{this.songTimeline=r.detail.timeline}}
                  @new-section-from-loop=${()=>this.onAddSection()}
                  @add-section=${()=>this.onAddSection()}
                  @remove-section=${r=>this.onRemoveSection(r)}
                  @edit-chords=${r=>{this.activeSectionIdx=r.detail.sectionIndex,this.activeTab="loop"}}
                  @edit-melody=${r=>{this.activeSectionIdx=r.detail.sectionIndex,this.activeTab="melody"}}
                  @toggle-play-song=${()=>this.onTogglePlaySong()}
                ></tab-song>
              `:m`
                <div class="main-tinted-panel">
                  <tab-play
                    .progression=${this.progression}
                    .activeIndex=${this.activeIndex}
                    .playing=${this.playing}
                    .showTheory=${this.showTheory}
                    .playInstrument=${this.playInstrument}
                    .showDegrees=${this.showDegrees}
                    .mood=${this.mood}
                    @instrument-change=${r=>{this.playInstrument=r.detail.instrument}}
                    @degrees-toggle=${r=>{this.showDegrees=r.detail.showDegrees}}
                    @play-chord=${r=>{r.detail.chord?.notes&&v.playChordNotes(r.detail.chord.notes,.85)}}
                  ></tab-play>
                </div>
              `}
            `:m`
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
                Loading studio workspace...
              </div>
            `}
          </div>

          <!-- Bottom Docked Transport Bar: Bounded within Center Column on Desktop -->
          <div class="transport-dock-wrapper desktop-only">
            ${this.activeTab==="melody"?m`
              <!-- Separate independent instance of controls for Melody -->
              <transport-bar
                id="melody-transport-bar"
                @select-section=${r=>this.onPickSection(r)}
                @new-section=${()=>this.onAddSection()}
                .activeTab=${"melody"}
                .isPlaying=${this.melodyPlaying}
                .playLabel=${"Play melody"}
                .moodColor=${i}
                .sections=${this.sections}
                .activeSectionId=${n}
                .chordSound=${this.instrument||"Stage Rhodes"}
                .melodySound=${this.melodySound||"Lead Synth"}
                .chordFeel=${this.playStyle||"Block chords"}
                .melodyFeel=${this.melodyFeel||"Smooth"}
                .feelSettings=${this.melodyFeelSettings}
                .backingEnabled=${this.melodyBackingEnabled}
                .chords=${this.progression?.chords||[]}
                .keyRoot=${this.progression?.key||"C"}
                .scaleMode=${this.progression?.scaleType==="MINOR"?"Minor":"Major"}
                .bpm=${this.progression?.bpm||84}
                .barsPerChord=${v.getBarsPerChord()}
                .melodyLoop=${this.melodyLoop}
                .songTotal=${l}
                @loop-cycle=${r=>{this.onMelodyLoopCycle(r.detail?.melodyLoop)}}
                @toggle-play=${r=>{this.onTogglePlay(r.detail?.target||"melody")}}
                @toggle-melody-backing=${r=>{this.onToggleMelodyBacking(r)}}
                @set-melody-sound=${r=>{this.onSetMelodySound(r)}}
                @set-melody-feel=${r=>{this.onSetMelodyFeel(r)}}
                @melody-feel-settings-change=${r=>{this.onMelodyFeelSettingsChange(r)}}
                @share-click=${()=>{this.shareModalOpen=!0}}
                @open-share=${()=>{this.shareModalOpen=!0}}
                @bpm-change=${r=>{this.progression&&(this.progression={...this.progression,bpm:r.detail.bpm},v.setBpm(r.detail.bpm),this.requestUpdate())}}
                @key-change=${r=>{this.progression&&(this.progression={...this.progression,key:r.detail.root},v.setProgression(this.progression,this.order),this.requestUpdate())}}
                @scale-change=${r=>{if(this.progression){const c=r.detail.mode.toUpperCase();this.progression={...this.progression,scaleType:c},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
              ></transport-bar>
            `:m`
              <!-- Dedicated instance of controls for Chords / Song / Play -->
              <transport-bar
                id="chord-transport-bar"
                @select-section=${r=>this.onPickSection(r)}
                @new-section=${()=>this.onAddSection()}
                .activeTab=${this.activeTab}
                .isPlaying=${this.activeTab==="song"?this.songPlaying:this.chordPlaying}
                .playLabel=${this.activeTab==="song"?"Play song":"Play chords"}
                .moodColor=${i}
                .sections=${this.sections}
                .activeSectionId=${n}
                .chordSound=${this.instrument||"Stage Rhodes"}
                .melodySound=${this.melodySound||"Lead Synth"}
                .chordFeel=${this.playStyle||"Block chords"}
                .melodyFeel=${this.melodyFeel||"Smooth"}
                .feelSettings=${this.chordFeelSettings}
                .chords=${this.progression?.chords||[]}
                .keyRoot=${this.progression?.key||"C"}
                .scaleMode=${this.progression?.scaleType==="MINOR"?"Minor":"Major"}
                .bpm=${this.progression?.bpm||84}
                .barsPerChord=${v.getBarsPerChord()}
                .melodyLoop=${this.melodyLoop}
                .songTotal=${l}
                @loop-cycle=${r=>{this.onMelodyLoopCycle(r.detail?.melodyLoop)}}
                @toggle-play=${r=>{this.activeTab==="song"?this.onTogglePlaySong():this.onTogglePlay(r.detail?.target||"chords")}}
                @share-click=${()=>{this.shareModalOpen=!0}}
                @open-share=${()=>{this.shareModalOpen=!0}}
                @bpm-change=${r=>{this.progression&&(this.progression={...this.progression,bpm:r.detail.bpm},v.setBpm(r.detail.bpm),this.requestUpdate())}}
                @bars-change=${r=>{v.setBarsPerChord(r.detail.bars),this.requestUpdate()}}
                @key-change=${r=>{this.progression&&(this.progression={...this.progression,key:r.detail.root},v.setProgression(this.progression,this.order),this.requestUpdate())}}
                @scale-change=${r=>{if(this.progression){const c=r.detail.mode.toUpperCase();this.progression={...this.progression,scaleType:c},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
                @sound-change=${r=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:r.detail.sound}))}}
                @set-chord-sound=${r=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:r.detail.sound}))}}
                @feel-change=${r=>{const c=r.detail.feel||r.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:c}))}}
                @set-chord-feel=${r=>{const c=r.detail.feel||r.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:c}))}}
                @feel-settings-change=${r=>{const c=r.detail.feelSettings;c&&(this.chordFeelSettings={...c},v.setFeelSettings(c),c.playStyle&&c.playStyle!==this.playStyle&&(this.playStyle=c.playStyle,this.safeSet("chroma-chords-play-style",c.playStyle),v.setPlayStyle(c.playStyle)),c.tone&&Me(c.tone),this.requestUpdate())}}
                @set-feel-settings=${r=>{this.chordFeelSettings={...this.chordFeelSettings,...r.detail},v.setFeelSettings(this.chordFeelSettings),r.detail.tone&&Me(r.detail.tone),this.requestUpdate()}}
              ></transport-bar>
            `}
          </div>
        </main>

        <!-- 3. Right Desktop Aside (Shown on Chords & Play It tabs per design) -->
        <aside class="desktop-aside desktop-only ${this.activeTab==="loop"||this.activeTab==="play"?"visible":"hidden"}">
          <chord-inspector
            .progression=${this.progression}
            .selectedChordIndex=${this.selectedChordIndex}
            .selectedBand=${this.selectedBand}
            .showTheory=${this.showTheory}
            .moodColor=${i}
            .isSaved=${e}
            .libraryOpen=${this.libraryOpen}
            .savedSets=${j.getProjects()}
            @close-detail=${()=>{this.selectedChordIndex=null}}
            .saveState=${t}
            @toggle-save=${()=>this.onSavePressed()}
            @toggle-library=${()=>{this.libraryOpen=!this.libraryOpen}}
            .swapIndex=${this.activeTab==="loop"?this.swapState.swapIndex:null}
            .abPick=${this.activeTab==="loop"?this.swapState.abPick:null}
            .activeSwapFamily=${this.swapState.feel}
            @swap-close-request=${()=>{this.closeSwapSignal+=1}}
            .activeSetId=${this.currentProjectId}
            @select-set=${r=>{this.libraryOpen=!1,this.onLoadProject(r)}}
            @delete-set=${r=>this.onUnsaveSet(r)}
            @rename-set=${r=>this.onRenameProject(r)}
            @change-voicing=${r=>{if(this.progression&&this.selectedChordIndex!==null){const c=[...this.progression.chords],d=c[this.selectedChordIndex];d&&(c[this.selectedChordIndex]=Ei(d,r.detail.voicing||"Major","None"),this.onProgressionChange(new CustomEvent("progression-change",{detail:{...this.progression,chords:c}})))}}}
          ></chord-inspector>
        </aside>
      </div>

      <!-- Saved loops (phones): popover above the dock; on desktop this lives in the right-hand column -->
      ${this.libraryOpen?m`
        <div class="m-library-backdrop mobile-only" @click=${()=>{this.libraryOpen=!1}}></div>
        <div class="m-library-pop mobile-only" role="dialog" aria-label="Your saved loops">
          <loops-library
            .sets=${j.getProjects()}
            .activeId=${this.currentProjectId}
            .moodColor=${i}
            @select-set=${r=>{this.libraryOpen=!1,this.onLoadProject(r)}}
            @delete-set=${r=>this.onUnsaveSet(r)}
            @rename-set=${r=>this.onRenameProject(r)}
          ></loops-library>
        </div>
      `:""}

      <!-- Mobile Dock: Persistent at viewport bottom on mobile only -->
      <div class="dock-container mobile-only">
        <mobile-dock
          .activeTab=${this.activeTab}
          .isPlaying=${this.activeTab==="melody"?this.melodyPlaying:this.activeTab==="song"?this.songPlaying:this.chordPlaying}
          .playLabel=${this.activeTab==="melody"?"Play melody":this.activeTab==="song"?"Play song":"Play chords"}
          .moodColor=${i}
          .sections=${this.sections}
          .activeSectionId=${n}
          .chordSound=${this.instrument||"Stage Rhodes"}
          .melodySound=${this.melodySound||"Lead Synth"}
          .chordFeel=${this.playStyle||"Block chords"}
          .melodyFeel=${this.melodyFeel||"Smooth"}
          .feelSettings=${this.activeTab==="melody"?this.melodyFeelSettings:this.chordFeelSettings}
          .backingEnabled=${this.melodyBackingEnabled}
          .chords=${this.progression?.chords||[]}
          .keyRoot=${this.progression?.key||"C"}
          .scaleMode=${this.progression?.scaleType==="MINOR"?"Minor":"Major"}
          .bpm=${this.progression?.bpm||84}
          .barsPerChord=${v.getBarsPerChord()}
          .melodyLoop=${this.melodyLoop}
          .isSaved=${e}
          @loop-cycle=${r=>{this.onMelodyLoopCycle(r.detail?.melodyLoop)}}
          @toggle-play=${r=>{this.activeTab==="song"?this.onTogglePlaySong():this.activeTab==="melody"?this.onTogglePlay("melody"):this.onTogglePlay(r.detail?.target||"chords")}}
          @toggle-melody-backing=${r=>{this.onToggleMelodyBacking(r)}}
          @set-melody-sound=${r=>{this.onSetMelodySound(r)}}
          @set-melody-feel=${r=>{this.onSetMelodyFeel(r)}}
          @melody-feel-settings-change=${r=>{this.onMelodyFeelSettingsChange(r)}}
          @open-share=${()=>{this.shareModalOpen=!0}}
          @reroll=${this.onReroll}
          .saveState=${t}
          @save-set=${()=>this.onSavePressed()}
          @unsave-set=${()=>{this.currentProjectId&&this.onUnsaveSet(new CustomEvent("unsave-set",{detail:this.currentProjectId}))}}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @set-bpm=${r=>{this.progression&&(this.progression={...this.progression,bpm:r.detail.bpm},v.setBpm(r.detail.bpm),this.requestUpdate())}}
          @set-bars-per-chord=${r=>{v.setBarsPerChord(r.detail.bars),this.requestUpdate()}}
          @set-key=${r=>{if(this.progression){const c=r.detail.root,d=r.detail.mode?.toUpperCase()==="MINOR"?"MINOR":"MAJOR";this.progression={...this.progression,key:c,scaleType:d},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
          @set-sound=${r=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:r.detail.sound}))}}
          @set-chord-sound=${r=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:r.detail.sound}))}}
          @set-chord-feel=${r=>{const c=r.detail.feel||r.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:c}))}}
          @select-section=${r=>this.onPickSection(r)}
          @new-section=${()=>this.onAddSection()}
          @set-feel=${r=>{const c=r.detail.feel||r.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:c}))}}
          @feel-settings-change=${r=>{const c=r.detail.feelSettings;c&&(this.chordFeelSettings={...c},v.setFeelSettings(c),c.playStyle&&c.playStyle!==this.playStyle&&(this.playStyle=c.playStyle,this.safeSet("chroma-chords-play-style",c.playStyle),v.setPlayStyle(c.playStyle)),c.tone&&Me(c.tone),this.requestUpdate())}}
          @set-feel-settings=${r=>{this.chordFeelSettings={...this.chordFeelSettings,...r.detail},v.setFeelSettings(this.chordFeelSettings),r.detail.tone&&Me(r.detail.tone),this.requestUpdate()}}
        ></mobile-dock>
      </div>

      <!-- Vibe Popover (Desktop / Mobile) -->
      ${this.vibeOpen?m`
        <div class="vibe-overlay" @click=${()=>this.vibeOpen=!1}></div>
        <div class="vibe-popover" role="dialog" aria-label="Vibe, genre and mood">
          <div class="vibe-popover-header">
            <div class="vibe-popover-title">The vibe</div>
            <button class="vibe-popover-close" @click=${()=>this.vibeOpen=!1} aria-label="Close vibe">×</button>
          </div>
          <div class="vibe-search-row">
            <input
              type="text"
              class="vibe-search-input"
              placeholder="e.g. Neon midnight drive, late 70s soul..."
              .value=${this.vibeSearchText}
              @input=${r=>this.vibeSearchText=r.target.value}
              @keydown=${r=>{r.key==="Enter"&&this.applyPromptSearch()}}
            />
            <button class="vibe-search-submit" @click=${this.applyPromptSearch} style="background: ${i};" aria-label="Generate from prompt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <div class="vibe-section-label">Genre</div>
          <div class="vibe-pills-row">
            ${["Folk","Jazz","Lo-fi","Cinematic","Pop","R&B","Ambient","Rock"].map(r=>{const c=this.genre.toLowerCase()===r.toLowerCase();return m`
                <button
                  class="vibe-chip ${c?"active":""}"
                  style="background: ${c?i:"#F1E4CC"}; color: #2E271F;"
                  @click=${()=>{this.genre=r,this.regenerate()}}
                >
                  ${r}
                </button>
              `})}
          </div>

          <div class="vibe-section-label">Mood</div>
          <div class="vibe-pills-row">
            ${[{name:"Uplifting",color:"#F6D98B",icon:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",color:"#9CC0EC",icon:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",color:"#C9A9E0",icon:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",color:"#F2735F",icon:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",color:"#F2C9A0",icon:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",color:"#B8CC9E",icon:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"}].map(r=>{const c=this.mood.toLowerCase()===r.name.toLowerCase();return m`
                <button
                  class="vibe-mood-btn ${c?"active":""}"
                  style="background: ${c?r.color:"#F1E4CC"};"
                  @click=${()=>{this.mood=r.name,this.regenerate()}}
                >
                  <div
                    class="vibe-mood-badge"
                    style="background: ${c?"rgba(46,39,31,0.1)":r.color+"44"};"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c?"#2E271F":r.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="${r.icon}"/>
                    </svg>
                  </div>
                  <span>${r.name}</span>
                </button>
              `})}
          </div>

          <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 20px;">
            <div class="vibe-section-label" style="margin-top: 0;">Band</div>
            <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38);">optional</div>
          </div>
          <div class="vibe-pills-row">
            ${Qo.map(r=>r.name).map(r=>m`
              <button
                class="vibe-chip ${this.selectedBand===r?"active":""}"
                @click=${()=>{this.selectedBand=this.selectedBand===r?null:r,this.regenerate(),this.rebuildMelodyForBand()}}
              >
                ${r}
              </button>
            `)}
          </div>
        </div>
      `:""}

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
        .barsPerChord=${v.getBarsPerChord()}
        .feelSettings=${v.getFeelSettings()}
        .melodyTrack=${this.melodyTrack}
        @close=${()=>{this.shareModalOpen=!1}}
        @toast=${r=>this.showToast(r.detail)}
      ></share-modal>

      <auth-modal
        .open=${this.authModalOpen}
        @close-modal=${()=>{this.authModalOpen=!1}}
      ></auth-modal>

      ${this.saveDialog?this.renderSaveDialog():""}

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
    `}};D.styles=xe`
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
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink);
      overflow: hidden;
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    .app-header-container {
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream);
      flex-shrink: 0;
      z-index: 40;
    }

    /* 3-Column Desktop Stage Body */
    .stage-body {
      flex: 1;
      min-height: 0;
      min-width: 0;
      display: flex;
      align-items: stretch;
      overflow: hidden;
      position: relative;
    }


    /* Center Main Column */
    .main-column {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Sub-Header Nav Row */
    .sub-nav-row {
      padding: 8px 22px 6px;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
      background: var(--cv-cream);
      box-sizing: border-box;
    }

    .nav-tabs-track {
      display: flex;
      gap: 2px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 100px;
      padding: 4px;
      box-sizing: border-box;
    }

    .nav-tab-btn {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 6px 16px;
      min-height: 34px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease, transform 120ms ease;
      white-space: nowrap;
    }
    .nav-tab-btn:hover {
      color: var(--cv-ink, #2E271F);
    }
    .nav-tab-btn.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-weight: 800;
    }

    .nav-spacer {
      flex: 1;
      min-width: 0;
    }

    /* Theory Toggle Switch (Matches Chroma Melody prototype lines 3555-3561) */
    .theory-nav-toggle {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 38px;
      padding: 0 6px 0 14px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      box-shadow: inset 0 0 0 1.5px transparent;
      transition: background 160ms var(--cv-ease, ease), color 160ms var(--cv-ease, ease), box-shadow 160ms var(--cv-ease, ease);
    }
    .theory-nav-toggle:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .theory-nav-toggle.active {
      color: var(--cv-ink, #2E271F);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
    }
    .theory-nav-label {
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: -0.005em;
      white-space: nowrap;
      color: inherit;
    }
    .theory-nav-pip {
      width: 34px;
      height: 20px;
      border-radius: 100px;
      position: relative;
      flex-shrink: 0;
      background: rgba(46, 39, 31, 0.14);
      transition: background 160ms var(--cv-ease, ease);
      display: inline-block;
    }
    .theory-nav-pip.on {
      background: var(--theory-mood-color, #C9A9E0);
    }
    .theory-nav-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.18);
      transition: transform 160ms var(--cv-ease, ease), background 160ms var(--cv-ease, ease);
    }
    .theory-nav-pip.on .theory-nav-knob {
      transform: translateX(14px);
      background: #FBF3E6;
    }

    /* Scrollable Content View */
    .scrollable-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 22px 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
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

    /* Bottom Docked Transport Bar (Desktop) */
    .transport-dock-wrapper {
      padding: 2px 22px 16px;
      background: var(--cv-cream);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    /* Right Desktop Aside */
    .desktop-aside {
      width: clamp(304px, 26vw, 384px);
      min-width: 304px;
      max-width: 384px;
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface);
      overflow-y: auto;
      overflow-x: hidden;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .desktop-aside.hidden {
      display: none !important;
    }

    /* Vibe Popover */
    /* Animations */
    @keyframes cvfv-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes cvfv-pop {
      from { transform: scale(0.97); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes cvfv-sheet-up {
      from { transform: translateY(14px); opacity: 0.6; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Vibe Popover Overlay Backdrop */
    .vibe-overlay {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.36);
      z-index: 110;
      animation: cvfv-fade 200ms ease-out;
      cursor: pointer;
    }
    .vibe-popover {
      position: fixed;
      left: 36px;
      top: 110px;
      width: 340px;
      max-height: calc(100vh - 128px);
      overflow-y: auto;
      background: var(--cv-cream);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 20px;
      padding: 16px 18px 20px;
      box-shadow: 0 28px 54px -22px rgba(46, 39, 31, 0.55);
      z-index: 120;
      box-sizing: border-box;
      transform-origin: left top;
      animation: cvfv-pop 180ms ease-out, cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    @media (max-width: 899px) {
      .vibe-popover {
        left: 16px;
        right: 16px;
        top: auto;
        bottom: 24px;
        width: auto;
      }
    }
    .vibe-popover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .vibe-popover-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label);
      text-transform: uppercase;
    }
    .vibe-popover-close {
      border: none;
      background: var(--cv-surface);
      color: var(--cv-ink-muted);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease;
    }
    .vibe-popover-close:hover {
      background: var(--cv-surface-2);
    }
    .vibe-search-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 10px;
    }
    .vibe-search-input {
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
    .vibe-search-submit {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 120ms ease;
    }
    .vibe-search-submit:hover {
      transform: scale(1.05);
    }
    .vibe-section-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-top: 20px;
    }
    .vibe-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 9px;
    }
    .vibe-chip {
      border: none;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      padding: 7px 14px;
      border-radius: 100px;
      background: #F1E4CC;
      color: #5B5145;
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }
    .vibe-chip:hover {
      transform: translateY(-1px);
    }
    .vibe-chip:active {
      transform: scale(0.97);
    }
    .vibe-chip.active {
      background: #2E271F;
      color: #FBF3E6;
      font-weight: 800;
    }
    .vibe-mood-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      padding: 5px 14px 5px 6px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      background: #F1E4CC;
      color: #2E271F;
      transition: background 150ms ease, transform 120ms ease;
    }
    .vibe-mood-btn:hover {
      transform: translateY(-1px);
    }
    .vibe-mood-btn:active {
      transform: scale(0.97);
    }
    .vibe-mood-btn.active {
      font-weight: 800;
    }
    .vibe-mood-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
      transition: background 150ms ease;
    }

    .dock-container {
      flex-shrink: 0;
      z-index: 45;
    }

    .save-dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 130;
      background: rgba(46, 39, 31, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
      animation: cvfv-fade 180ms ease-out;
    }
    .save-dialog {
      width: 100%;
      max-width: 380px;
      background: #FBF6EC;
      border-radius: 20px;
      padding: 22px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
      animation: cvfv-pop 180ms ease-out;
    }
    .save-dialog-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-bottom: 4px;
    }
    .save-dialog-sub {
      font-size: 12.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-bottom: 14px;
    }
    .save-dialog-input {
      width: 100%;
      box-sizing: border-box;
      padding: 11px 14px;
      border-radius: 10px;
      border: 2px solid rgba(46, 39, 31, 0.15);
      font-size: 14px;
      font-family: inherit;
      background: #fff;
      color: var(--cv-ink, #2E271F);
      outline: none;
    }
    .save-dialog-input:focus {
      border-color: #9B7CA8;
    }
    .save-dialog-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
    .save-dialog-btn {
      flex: 1 1 auto;
      min-height: 44px;
      padding: 0 16px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
      transition: transform 120ms ease, background 150ms ease;
    }
    .save-dialog-btn:hover { background: #E9D9BC; }
    .save-dialog-btn:active { transform: scale(0.97); }
    .save-dialog-btn.primary {
      background: #2E271F;
      color: #F4EBDB;
    }
    .save-dialog-btn.primary:hover { background: #463C31; }
    .save-dialog-btn.ghost {
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      flex: 0 0 auto;
    }

    .m-library-backdrop {
      position: fixed;
      inset: 0;
      z-index: 39;
      background: rgba(46, 39, 31, 0.28);
      animation: cvfv-fade 180ms ease-out;
    }
    .m-library-pop {
      position: fixed;
      left: 14px;
      right: 14px;
      bottom: 92px;
      z-index: 40;
      max-height: calc(100vh - 200px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 18px;
      padding: 10px;
      box-shadow: 0 22px 44px -18px rgba(46, 39, 31, 0.55);
      animation: cvfv-sheet-up 180ms var(--cv-ease, ease);
    }

    .desktop-only {
      display: block;
    }
    .mobile-only {
      display: none;
    }

    @media (max-width: 899px) {
      .stage-body {
        flex-direction: column;
      }
      .desktop-only {
        display: none !important;
      }
      .mobile-only {
        display: block !important;
      }
      .main-tinted-panel {
        border-radius: 22px;
        padding: 16px;
      }
      .sub-nav-row {
        padding: 10px 18px 4px;
        gap: 8px;
      }
      .nav-tabs-track {
        flex: 1 1 auto;
        min-width: 0;
        justify-content: space-between;
      }
      .nav-tab-btn {
        flex: 1 1 auto;
        padding: 6px 6px;
        font-size: 12.5px;
      }
      .nav-spacer {
        display: none;
      }
      .theory-nav-toggle {
        gap: 6px;
        padding: 0 6px 0 10px;
      }
      .theory-nav-label {
        font-size: 12px;
      }
      /* Same gap under the nav on every tab (design rule: 14px 18px 26px) */
      .scrollable-content {
        padding: 14px 18px 26px;
      }
      /* Melody fills the space between nav and dock; the grid scales to fit */
      .scrollable-content.fill {
        overflow: hidden;
      }
      .scrollable-content.fill .main-tinted-panel {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        padding: 14px 12px 12px;
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
    @media (max-width: 899px) {
      /* Keep toasts clear of the dock */
      .save-toast {
        bottom: 112px;
        max-width: calc(100vw - 32px);
      }
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
  `;P([w()],D.prototype,"activeTab",2);P([w()],D.prototype,"chordData",2);P([w()],D.prototype,"libraryOpen",2);P([w()],D.prototype,"melodyStyle",2);P([w()],D.prototype,"melodyDensity",2);P([w()],D.prototype,"melodyBandOn",2);P([w()],D.prototype,"saveDialog",2);P([w()],D.prototype,"swapState",2);P([w()],D.prototype,"closeSwapSignal",2);P([w()],D.prototype,"genre",2);P([w()],D.prototype,"mood",2);P([w()],D.prototype,"progression",2);P([w()],D.prototype,"activeIndex",2);P([w()],D.prototype,"progressStep",2);P([w()],D.prototype,"order",2);P([w()],D.prototype,"playing",2);P([w()],D.prototype,"chordPlaying",2);P([w()],D.prototype,"melodyPlaying",2);P([w()],D.prototype,"songPlaying",2);P([w()],D.prototype,"showTheory",2);P([w()],D.prototype,"instrument",2);P([w()],D.prototype,"playStyle",2);P([w()],D.prototype,"melodySound",2);P([w()],D.prototype,"melodyFeel",2);P([w()],D.prototype,"melodyFeelSettings",2);P([w()],D.prototype,"chordFeelSettings",2);P([w()],D.prototype,"melodyBackingEnabled",2);P([w()],D.prototype,"length",2);P([w()],D.prototype,"sections",2);P([w()],D.prototype,"songTimeline",2);P([w()],D.prototype,"activeSectionIdx",2);P([w()],D.prototype,"activePlayingSectionIdx",2);P([w()],D.prototype,"totalSongSteps",2);P([w()],D.prototype,"userEmail",2);P([w()],D.prototype,"isAuthenticated",2);P([w()],D.prototype,"syncStatus",2);P([w()],D.prototype,"syncError",2);P([w()],D.prototype,"authModalOpen",2);P([w()],D.prototype,"midiModalOpen",2);P([w()],D.prototype,"shareModalOpen",2);P([w()],D.prototype,"selectedChordIndex",2);P([w()],D.prototype,"selectedBand",2);P([w()],D.prototype,"melodyTrack",2);P([w()],D.prototype,"melodyLoop",2);P([w()],D.prototype,"melodySpan",2);P([w()],D.prototype,"playInstrument",2);P([w()],D.prototype,"showDegrees",2);P([w()],D.prototype,"toastMessage",2);P([w()],D.prototype,"toastUndoId",2);P([w()],D.prototype,"isGenerating",2);P([w()],D.prototype,"chordLengthCache",2);P([w()],D.prototype,"vibeOpen",2);P([w()],D.prototype,"vibeSearchText",2);D=P([ke("chroma-chords-app")],D);
