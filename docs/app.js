import{f as Qs,u as Zs,s as Si,n as Eo,l as as,S as De,E as xt,R as Je,P as ae,F as di,D as We,M as vt,C as Ke,V as wt,a as Le,G as Pt,b as pi,c as ls,d as Ye,g as en,O as cs,i as ge,e as fe,h as g,A as Pe,w as Q}from"./assets/vendor-Br4N67jR.js";import"https://warmsynths.github.io/human-midi/human-engine.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const be=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const tn={attribute:!0,type:String,converter:Zs,reflect:!1,hasChanged:Qs},on=(t=tn,e,o)=>{const{kind:i,metadata:s}=o;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(o.name,t),i==="accessor"){const{name:r}=o;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,t,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,t,a),a}}}if(i==="setter"){const{name:r}=o;return function(a){const l=this[r];e.call(this,a),this.requestUpdate(r,l,t,!0,a)}}throw Error("Unsupported decorator location: "+i)};function w(t){return(e,o)=>typeof o=="object"?on(t,e,o):((i,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,o)}function k(t){return w({...t,state:!0,attribute:!1})}const sn=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function nn(t,e){return(o,i,s)=>{const n=r=>r.renderRoot?.querySelector(t)??null;return sn(o,i,{get(){return n(this)}})}}const ut="chroma_chords_projects",rn="chord_voyager_projects";class mt{static getProjects(){if(typeof localStorage>"u"||typeof localStorage.getItem!="function")return[];try{let e=localStorage.getItem(ut);if(e||(e=localStorage.getItem(rn),e&&localStorage.setItem(ut,e)),e){const o=JSON.parse(e);let i=!1;return o.forEach(s=>{(s.genre==="Unknown"||!s.genre)&&(s.genre="Pop",i=!0),Array.isArray(s.chords)||(s.chords=[],i=!0)}),i&&localStorage.setItem(ut,JSON.stringify(o)),o}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){if(!(typeof localStorage>"u"||typeof localStorage.setItem!="function"))try{localStorage.setItem(ut,JSON.stringify(e))}catch(o){console.error("Failed to set projects to localStorage:",o)}}static mergeProjects(e,o){const i=new Map;return e.forEach(s=>i.set(s.id,s)),o.forEach(s=>{const n=i.get(s.id);!n||s.lastModified>n.lastModified?i.set(s.id,s):s.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(i.values())}static saveProject(e){const o=this.getProjects(),i=o.findIndex(s=>s.id===e.id);e.lastModified=Date.now(),i>=0?o[i]=e:o.push(e);try{localStorage.setItem(ut,JSON.stringify(o))}catch(s){console.error("Failed to save project to localStorage:",s)}}static deleteProject(e){let o=this.getProjects();o=o.filter(i=>i.id!==e);try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(ut,JSON.stringify(o))}catch(i){console.error("Failed to delete project from localStorage:",i)}}static exportProjectFile(e){const o=JSON.stringify(e,null,2),i=new Blob([o],{type:"application/json"}),s=URL.createObjectURL(i),n=document.createElement("a");n.href=s,n.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}static importProjectFile(e){return new Promise((o,i)=>{const s=new FileReader;s.onload=n=>{try{const r=n.target?.result,a=JSON.parse(r);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),o(a)):i(new Error("Invalid project file format"))}catch{i(new Error("Failed to parse JSON file"))}},s.onerror=()=>i(new Error("Failed to read file")),s.readAsText(e)})}}const Vt="chroma_chords_auth_token",Oo="chroma_chords_auth_user",an="184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com";function Fo(t){try{const e=t.split(".");if(e.length!==3)return null;let o=e[1].replace(/-/g,"+").replace(/_/g,"/");for(;o.length%4!==0;)o+="=";let i="";if(typeof atob=="function")i=atob(o);else if(typeof Buffer<"u")i=Buffer.from(o,"base64").toString("binary");else return null;const s=decodeURIComponent(i.split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch{return null}}function ln(){try{return"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com"}catch{return an}}class cn{constructor(e){this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,this.gisLoaded=!1,this.clientId=e!==void 0?e:ln(),this.initSession()}initSession(){if(typeof window>"u"||typeof localStorage>"u"||typeof localStorage.getItem!="function"){this.isLoading=!1;return}try{const e=localStorage.getItem(Vt);if(e){const o=Fo(e);o&&o.exp&&o.exp*1e3>Date.now()?(this.currentAccessToken=e,this.currentUser={id:o.sub,email:o.email,name:o.name,picture:o.picture}):(localStorage.removeItem(Vt),localStorage.removeItem(Oo),this.currentAccessToken=null,this.currentUser=null)}}catch(e){console.warn("Failed to restore auth session from localStorage:",e)}finally{this.isLoading=!1}}isConfigured(){return!!this.clientId}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(this.currentAccessToken){const e=Fo(this.currentAccessToken);if(e&&e.exp&&e.exp*1e3<=Date.now())return await this.signOut(),null}return this.currentAccessToken}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}notify(){const e=this.getAuthState();this.listeners.forEach(o=>{try{o(e)}catch(i){console.error("Error in AuthState listener:",i)}})}handleCredentialResponse(e){if(!e||typeof e!="string")return{success:!1,message:"Invalid credential provided."};const o=Fo(e);if(!o||!o.sub)return{success:!1,message:"Failed to decode Google user token."};if(o.exp&&o.exp*1e3<=Date.now())return{success:!1,message:"Google session token has expired."};this.currentAccessToken=e,this.currentUser={id:o.sub,email:o.email,name:o.name,picture:o.picture};try{typeof localStorage<"u"&&(localStorage.setItem(Vt,e),localStorage.setItem(Oo,JSON.stringify(this.currentUser)))}catch(i){console.warn("Failed to persist auth session to localStorage:",i)}return this.notify(),{success:!0,user:this.currentUser}}async loadGisScript(){return typeof window>"u"?!1:window.google?.accounts?.id?(this.gisLoaded=!0,!0):new Promise(e=>{const o=document.querySelector('script[src*="accounts.google.com/gsi/client"]');if(o){o.addEventListener("load",()=>{this.gisLoaded=!0,e(!0)}),o.addEventListener("error",()=>e(!1));return}const i=document.createElement("script");i.src="https://accounts.google.com/gsi/client",i.async=!0,i.defer=!0,i.onload=()=>{this.gisLoaded=!0,e(!0)},i.onerror=()=>e(!1),document.head.appendChild(i)})}async renderGoogleButton(e,o){if(!this.clientId||typeof window>"u"||!e)return;await this.loadGisScript();const i=window.google;if(i?.accounts?.id)try{i.accounts.id.initialize({client_id:this.clientId,callback:s=>{if(s.credential){const n=this.handleCredentialResponse(s.credential);o?.({success:n.success,message:n.message})}else o?.({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.innerHTML="",i.accounts.id.renderButton(e,{theme:"outline",size:"large",type:"standard",shape:"pill",text:"continue_with",logo_alignment:"left",width:320})}catch(s){console.warn("Failed to render Google button:",s)}}async signInWithGoogle(){if(!this.clientId)return{success:!1,message:"Google Client ID is not configured."};if(typeof window>"u")return{success:!1,message:"Window is not available in current environment."};await this.loadGisScript();const e=window.google;return e?.accounts?.id?new Promise(o=>{try{e.accounts.id.initialize({client_id:this.clientId,callback:i=>{if(i.credential){const s=this.handleCredentialResponse(i.credential);o({success:s.success,message:s.message})}else o({success:!1,message:"No credential returned from Google."})},auto_select:!1,cancel_on_tap_outside:!0}),e.accounts.id.prompt(i=>{(i.isNotDisplayed?.()||i.isSkippedMoment?.())&&console.info("Google prompt skipped or not displayed.")})}catch(i){const s=i instanceof Error?i.message:String(i);o({success:!1,message:s})}}):{success:!1,message:"Google Sign-In script failed to load."}}async signInWithOAuth(e="google"){return e!=="google"?{success:!1,message:`Unsupported auth provider: ${e}. Only Google is supported.`}:this.signInWithGoogle()}async signOut(){this.currentUser=null,this.currentAccessToken=null;try{typeof localStorage<"u"&&(localStorage.removeItem(Vt),localStorage.removeItem(Oo)),typeof window<"u"&&window.google?.accounts?.id&&window.google.accounts.id.disableAutoSelect?.()}catch(e){console.warn("Error during sign out storage cleanup:",e)}return this.notify(),{success:!0}}}const kt=new cn;class dn{formatUrl(e){let o=e.trim().replace(/\/+$/,"");return o&&!o.startsWith("http://")&&!o.startsWith("https://")&&(o="https://"+o),o}applyAuthHeaders(e,o){if(!o)return;const i=o.trim();i.toLowerCase().startsWith("bearer ")?e.Authorization=i:e.Authorization=`Bearer ${i}`}async testConnection(e,o){const i=this.formatUrl(e);if(!i)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const s={};this.applyAuthHeaders(s,o);const n=new AbortController,r=setTimeout(()=>n.abort(),8e3),a=await fetch(`${i}/api/health`,{method:"GET",headers:s,signal:n.signal});if(clearTimeout(r),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const l=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${l||a.statusText}`}}catch(s){return s instanceof Error&&s.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,o,i){const s=this.formatUrl(e);if(!s)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,o);const r=new AbortController,a=setTimeout(()=>r.abort(),45e3);try{const l=await fetch(`${s}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(i),signal:r.signal});if(clearTimeout(a),!l.ok){let d="";try{const c=await l.json();d=c.error||c.message||""}catch{d=await l.text().catch(()=>"")}throw new Error(`Cloud sync failed (${l.status}): ${d||l.statusText||"Unknown error"}`)}return await l.json()}catch(l){throw clearTimeout(a),l instanceof Error&&l.name==="AbortError"?new Error("Cloud sync request timed out (45s limit)"):l}}}const pn=new dn,Di="chroma_chords_deleted_projects",Pi="chroma_chords_last_sync_time",hn="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev";function un(){try{return"https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev"}catch{return hn}}function Ri(t){return typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(t):null}function Li(t,e){typeof window<"u"&&typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}class mn{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.syncStatus="sign-in",this.lastSyncError=null,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.syncStatusCallbacks=new Set,this.unsubscribeAuth=null,this.onlineHandler=null,this.offlineHandler=null,this.setupAuthSubscription(),this.setupOnlineListener()}setupAuthSubscription(){this.unsubscribeAuth=kt.subscribe(e=>{const o=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.syncStatus=this.authenticated?"synced":"sign-in",this.authenticated||(this.lastSyncError=null),this.notifyAuthState(),this.notifySyncStatus(),!o&&this.authenticated&&this.syncWithCloud().catch(i=>{console.warn("Auto cloud sync on sign-in encountered an error:",i)})})}setupOnlineListener(){typeof window<"u"&&typeof window.addEventListener=="function"&&(this.onlineHandler=()=>{this.isAuthenticated()&&this.scheduleCloudSync()},this.offlineHandler=()=>{this.isAuthenticated()&&(this.syncStatus="offline",this.notifySyncStatus())},window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler))}destroy(){this.unsubscribeAuth&&(this.unsubscribeAuth(),this.unsubscribeAuth=null),typeof window<"u"&&typeof window.removeEventListener=="function"&&(this.onlineHandler&&(window.removeEventListener("online",this.onlineHandler),this.onlineHandler=null),this.offlineHandler&&(window.removeEventListener("offline",this.offlineHandler),this.offlineHandler=null)),this.syncTimeout&&(clearTimeout(this.syncTimeout),this.syncTimeout=null)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}getSyncStatus(){return this.syncStatus}subscribeSyncStatus(e){return this.syncStatusCallbacks.add(e),e(this.syncStatus),()=>this.syncStatusCallbacks.delete(e)}notifySyncStatus(){this.syncStatusCallbacks.forEach(e=>{try{e(this.syncStatus)}catch(o){console.error("Error in SyncStatus callback:",o)}})}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(o){console.error("Error in AuthState callback:",o)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}subscribe(e){return this.subscribeProjects(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(o=>{try{o(e)}catch(i){console.error("Error in ProjectsChange callback:",i)}})}logout(){this.userEmail=null,this.authenticated=!1,this.syncStatus="sign-in",this.notifyAuthState(),this.notifySyncStatus()}getProjects(){return mt.getProjects()}isProjectSaved(e){return e?mt.getProjects().some(o=>o.id===e):!1}saveProject(e){mt.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){mt.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=Ri(Di);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){Li(Di,JSON.stringify(e))}addTombstone(e){const o=this.getTombstones(),i=o.findIndex(n=>n.id===e),s=new Date().toISOString();i>=0?o[i].deletedAt=s:o.push({id:e,deletedAt:s}),this.setTombstones(o)}removeTombstone(e){const o=this.getTombstones().filter(i=>i.id!==e);this.setTombstones(o)}getLastSyncTime(){return Ri(Pi)}setLastSyncTime(e){Li(Pi,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const o=await kt.getAccessToken();if(!this.isAuthenticated()||!o)return;const i=e||un();if(i){this.isCloudSyncing=!0,this.syncStatus="syncing",this.notifySyncStatus();try{const s=mt.getProjects(),n=this.getTombstones(),r=this.getLastSyncTime(),a=r?new Date(r).getTime():0,d=(r?s.filter(x=>!x.syncedToCloud||x.lastModified&&x.lastModified>a):s).map(x=>({...x,deletedAt:null})),c=await pn.sync(i,o,{sets:d,lastSyncTime:r,tombstones:n}),p=new Map;s.forEach(x=>{p.set(x.id,{...x,syncedToCloud:!0})});const u=c.tombstones||[],h=new Set(u.map(x=>x.id));(c.sets||[]).forEach(x=>{if(x.deletedAt)h.add(x.id);else{const C=p.get(x.id),I=x.lastModified||(x.updatedAt?new Date(x.updatedAt).getTime():0),S=C?.lastModified||0;(!C||I>=S)&&p.set(x.id,{id:x.id,name:x.name,lastModified:I,genre:x.genre,mood:x.mood,key:x.key,scaleType:x.scaleType,bpm:x.bpm,showTheory:x.showTheory,chords:Array.isArray(x.chords)?x.chords:[],syncedToCloud:!0})}}),h.forEach(x=>{p.delete(x)});const m=Array.from(p.values());mt.setProjects(m);const f=this.getTombstones(),b=new Set(n.map(x=>x.id)),y=f.filter(x=>!b.has(x.id));this.setTombstones(y),(c.lastSyncTime||c.syncedAt)&&this.setLastSyncTime(c.lastSyncTime||c.syncedAt),this.lastSyncError=null,this.syncStatus="synced",this.notifySyncStatus(),this.notifyProjectsChanged()}catch(s){this.lastSyncError=s instanceof Error?s.message:String(s),console.warn("Cloud sync encountered an error, transitioning to offline status:",s),this.syncStatus="offline",this.notifySyncStatus()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}getLastSyncError(){return this.lastSyncError}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const L=new mn;let Bo=null,uo=null,mo=null,go=null,Rt=null,Do=null,Po=null,Ro=null,qt=null,Lo=null,zo=null,jo=null,Uo=null,Ht=null,Jt=null,Yt=null,Wt=null,Kt=null,_o=null,Go=null,Vo=null,Xt=null,Qt=null,qo=null,Ho=null,Zt=null,Jo=null,Yo=null;function Ci(){return Bo||(Bo=new ls({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Bo}let eo="Warm",gt=null,Wo=null,rt=null,Ko=null,to=null,at=null,Xo=null,Qo=null,Zo=null,lt=null;function pt(){if(!gt){gt=new Pt(1);const t=Ci();Wo=new Le({frequency:3200,type:"lowpass",rolloff:-12}),rt=new Pt(1),Wo.connect(rt),rt.connect(t),gt.connect(Wo),Ko=new xt({high:3.5,mid:0,low:-.5,highFrequency:4500}),to=new Ke({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{to.start()}catch{}at=new Pt(0),Ko.connect(to),to.connect(at),at.connect(t),gt.connect(Ko),Xo=new Le({frequency:1800,type:"bandpass",Q:.8}),Qo=new wt({frequency:.5,depth:.1,wet:.4}),Zo=new We({distortion:.1,wet:.15}),lt=new Pt(0),Xo.connect(Qo),Qo.connect(Zo),Zo.connect(lt),lt.connect(t),gt.connect(Xo)}return gt}function ke(t){pt();const e=t?t.toLowerCase().trim():"warm";eo=e==="glassy"?"Glassy":e==="dusty"?"Dusty":"Warm";const o=.05,i=Eo();try{rt&&at&&lt&&(eo==="Warm"?(rt.gain.rampTo(1,o,i),at.gain.rampTo(0,o,i),lt.gain.rampTo(0,o,i)):eo==="Glassy"?(rt.gain.rampTo(0,o,i),at.gain.rampTo(1,o,i),lt.gain.rampTo(0,o,i)):eo==="Dusty"&&(rt.gain.rampTo(0,o,i),at.gain.rampTo(0,o,i),lt.gain.rampTo(1,o,i)))}catch(s){console.warn("Failed to ramp master tone:",s)}}function gn(t="Warm",e){const o=t?t.toLowerCase().trim():"warm",i=e??en();if(o==="glassy"){const n=new xt({high:3.5,mid:0,low:-.5,highFrequency:4500}),r=new Ke({frequency:1.5,delayTime:3,depth:.35,wet:.3});try{r.start(0)}catch{}return n.connect(r),r.connect(i),n}if(o==="dusty"){const n=new Le({frequency:1800,type:"bandpass",Q:.8}),r=new wt({frequency:.5,depth:.1,wet:.4}),a=new We({distortion:.1,wet:.15});return n.connect(r),r.connect(a),a.connect(i),n}const s=new Le({frequency:3200,type:"lowpass",rolloff:-12});return s.connect(i),s}const ei=typeof import.meta<"u"&&"./"||"./",To=ei.endsWith("/")?ei:`${ei}/`,ds={A1:"A1.mp3",C2:"C2.mp3","F#2":"Fs2.mp3",C3:"C3.mp3","F#3":"Fs3.mp3",C4:"C4.mp3","F#4":"Fs4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",C6:"C6.mp3","F#6":"Fs6.mp3",C7:"C7.mp3"},fn=`${To}audio/samples/grand-piano/`,ps={F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},bn=`${To}audio/samples/stage-rhodes/`,hs={B1:"B1.mp3",E2:"E2.mp3",A2:"A2.mp3",D3:"D3.mp3",G3:"G3.mp3",B3:"B3.mp3",E4:"E4.mp3",A4:"A4.mp3",E5:"E5.mp3",A5:"A5.mp3"},vn=`${To}audio/samples/nylon-guitar/`,us={E2:"E2.mp3",A2:"A2.mp3",C3:"C3.mp3","D#3":"Ds3.mp3","F#3":"Fs3.mp3",A3:"A3.mp3",C4:"C4.mp3","D#4":"Ds4.mp3","F#4":"Fs4.mp3",A4:"A4.mp3",C5:"C5.mp3","F#5":"Fs5.mp3",A5:"A5.mp3"},yn=`${To}audio/samples/jazz-guitar/`;function xn(t="piano"){let e=null,o={};if(t==="jazz-guitar"?(e=Rt,o=us):t==="guitar"?(e=go,o=hs):t==="rhodes"||t==="epiano"?(e=mo,o=ps):(e=uo,o=ds),!e||!e.loaded)return null;const i=e._buffers;if(!i)return null;const s={};for(const n of Object.keys(o))try{const r=pi(n).toMidi(),a=i.has(r)?i.get(r):i.has(n)?i.get(n):null;a&&typeof a.get=="function"&&a.get()&&(s[n]=a.get())}catch{}return Object.keys(s).length>0?s:null}async function wn(t="piano"){const e=Sn(t);if(e.loaded)return e;try{return await Promise.race([as(),new Promise((o,i)=>setTimeout(()=>i(new Error("Sample load timeout")),3e3))]),e}catch(o){return console.warn(`ensureSamplerLoaded(${t}) timed out or failed:`,o),null}}function ms(){return uo||(uo=new Ye({urls:ds,baseUrl:fn,volume:-9,onload:()=>console.log("Grand Piano sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Grand Piano sampler:",t)}).connect(pt())),uo}function gs(){return mo||(mo=new Ye({urls:ps,baseUrl:bn,volume:-10,onload:()=>console.log("Stage Rhodes sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Stage Rhodes sampler:",t)}).connect(pt())),mo}function fs(){return go||(go=new Ye({urls:hs,baseUrl:vn,volume:-8,onload:()=>console.log("Nylon Guitar sampler loaded successfully!"),onerror:t=>console.warn("Failed to load Nylon Guitar sampler:",t)}).connect(pt())),go}function bs(){if(!Rt){const t=pt();Do=new xt({low:1.5,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}),Po=new Le({frequency:2800,type:"lowpass",rolloff:-12}),Ro=new Je({decay:1.8,preDelay:.02,wet:.18}),Rt=new Ye({urls:us,baseUrl:yn,volume:-8,onload:()=>console.log("Jazz Archtop sampler loaded successfully!"),onerror:e=>console.warn("Failed to load Jazz Archtop sampler:",e)}),Rt.connect(Do),Do.connect(Po),Po.connect(Ro),Ro.connect(t)}return Rt}function kn(){if(!Kt){const t=pt();_o=new wt({frequency:.45,depth:.18,wet:.65}),Go=new We({distortion:.12,wet:.18}),Vo=new Le({frequency:3400,type:"lowpass",rolloff:-12}),Xt=new Ke({frequency:.25,delayTime:4.2,depth:.6,wet:.35});try{Xt.start()}catch{}Kt=new ae(vt,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}),Kt.connect(_o),_o.connect(Go),Go.connect(Vo),Vo.connect(Xt),Xt.connect(t)}return Kt}function Sn(t){return t==="jazz-guitar"?bs():t==="guitar"?fs():t==="rhodes"||t==="epiano"?gs():ms()}function vs(t){const e=pt();switch(t){case"organ":return qt||(Lo=new wt({frequency:5.8,depth:.12,wet:.55}),zo=new We({distortion:.08,wet:.15}),jo=new Le({frequency:4500,type:"lowpass",rolloff:-12}),qt=new ae(De,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}),qt.connect(Lo),Lo.connect(zo),zo.connect(jo),jo.connect(e)),qt;case"pad-strings":if(!Jt){Uo=new Je({decay:5.5,preDelay:.03,wet:.45}),Ht=new Ke({frequency:.45,delayTime:4,depth:.5,wet:.4});try{Ht.start()}catch{}Jt=new ae(De,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}),Jt.connect(Ht),Ht.connect(Uo),Uo.connect(e)}return Jt;case"juno-pad":if(!Wt){Yt=new Ke({frequency:.85,delayTime:3.5,depth:.72,wet:.55});try{Yt.start()}catch{}Wt=new ae(vt,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}),Wt.connect(Yt),Yt.connect(e)}return Wt;case"stab":return Qt||(qo=new We({distortion:.1,wet:.12}),Ho=new Je({decay:1,wet:.22}),Qt=new ae(vt,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}),Qt.connect(qo),qo.connect(Ho),Ho.connect(e)),Qt;case"bell":return Zt||(Jo=new xt({high:3.5,mid:-.5,low:-2,highFrequency:4800}),Yo=new Je({decay:3.2,wet:.32}),Zt=new ae(di,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}),Zt.connect(Jo),Jo.connect(Yo),Yo.connect(e)),Zt;case"guitar":return fs();case"jazz-guitar":return bs();case"sh101":return kn();case"rhodes":case"epiano":return gs();default:return ms()}}const Oe=[{name:"Grand Piano",instrument:"piano",color:"#9CC0EC"},{name:"Stage Rhodes",instrument:"rhodes",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Jazz Archtop",instrument:"jazz-guitar",color:"#D89047"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Cinematic Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Celestial Bell",instrument:"bell",color:"#B8CC9E"},{name:"Juno Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Vintage SH-101",instrument:"sh101",color:"#4EA598"},{name:"House Stab",instrument:"stab",color:"#FF8C42"}],zi={piano:"Grand Piano","grand piano":"Grand Piano",rhodes:"Stage Rhodes","stage rhodes":"Stage Rhodes",epiano:"Stage Rhodes","nylon guitar":"Nylon Guitar",guitar:"Nylon Guitar","jazz archtop":"Jazz Archtop","jazz guitar":"Jazz Archtop",archtop:"Jazz Archtop",hollowbody:"Jazz Archtop","jazz-guitar":"Jazz Archtop","vintage sh-101":"Vintage SH-101","sh-101":"Vintage SH-101",sh101:"Vintage SH-101","boc synth":"Vintage SH-101","warm pad":"Cinematic Pad","cinematic pad":"Cinematic Pad","pad-strings":"Cinematic Pad","synth bell":"Celestial Bell","celestial bell":"Celestial Bell",bell:"Celestial Bell","drawbar organ":"Drawbar Organ",organ:"Drawbar Organ","analog synth":"Juno Synth","juno synth":"Juno Synth","juno-pad":"Juno Synth","synth stab":"House Stab","house stab":"House Stab",stab:"House Stab"};function _e(t){if(!t)return"Grand Piano";const e=t.trim().toLowerCase();if(zi[e])return zi[e];const o=Oe.find(i=>i.name.toLowerCase()===e);return o?o.name:"Grand Piano"}const Ut=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1,isStrum:!0}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],Mo={Pop:"piano",Rock:"piano","Indie/Folk":"guitar","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"rhodes","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"bell","Bossa Nova/Latin":"guitar","Classical/Orchestral":"piano","EDM/Trance":"juno-pad",Afrobeats:"guitar",Shoegaze:"pad-strings"},Ii={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Cn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function H(t){const e=Math.floor(t/12)-1,o=t%12;return`${Cn[o]}${e}`}function $i(){return Promise.race([as(),new Promise(t=>setTimeout(t,80))])}function ys(t,e){const o=e/60;switch(t){case"1/4":return 1/o;case"1/8":return .5/o;case"1/8T":return .5/o*(2/3);case"1/16":return .25/o;case"1/32":return .125/o;default:return .25/o}}function xs(t,e){const o=[];for(let i=0;i<e;i++)for(const s of t){const n=s.match(/^([A-G]#?)(-?\d+)$/);if(n){const r=n[1],a=parseInt(n[2],10)+i;o.push(`${r}${a}`)}else o.push(s)}return o}function ws(t,e){const o=[...t];switch(e){case"up":return o;case"down":return[...o].reverse();case"up-down":return[...o,...[...o].reverse().slice(1,-1)];case"random":return o.sort(()=>Math.random()-.5);default:return o}}const ji={piano:"Grand Piano",rhodes:"Stage Rhodes",epiano:"Stage Rhodes",guitar:"Nylon Guitar","pad-strings":"Cinematic Pad","juno-pad":"Juno Synth",bell:"Celestial Bell",organ:"Drawbar Organ",stab:"House Stab"};function hi(t){if(!t)return;const e=t.toLowerCase().trim();return ji[e]?ji[e]:Oe.find(i=>i.name.toLowerCase()===e||i.instrument.toLowerCase()===e)?.name}function ui(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Ut.find(i=>i.name.toLowerCase()===e)?.name??"Block chords"}function In(t,e=.7,o,i="piano",s){try{Promise.all([Si(),$i()]).then(()=>{const n=vs(i);if(s&&typeof s=="object"&&Object.keys(s).length>0)try{typeof n.set=="function"&&n.set(s)}catch(u){console.warn("Failed to apply customConfig to Tone.js instrument:",u)}const r=t.length,a=r<=1?1:Math.max(.4,1/Math.sqrt(r)),l=Eo(),d=i==="guitar"||i==="jazz-guitar",c=i==="jazz-guitar";if(o&&o.arpMode&&o.arpMode!=="off"){const u=o.bpm??80,h=o.arpRate??"1/16",m=o.arpRange??1,f=o.arpMode,b=ys(h,u),y=xs(t,m),x=ws(y,f),C=()=>o.minVelocity!==void 0&&o.maxVelocity!==void 0?(o.minVelocity+Math.random()*(o.maxVelocity-o.minVelocity))/127*a:a,I=(o.isStrum===!0||o.playStyle==="Strum"||h==="1/32")&&(h==="1/32"||o.isStrum===!0),S=typeof o.arpGate=="number"?Math.max(.1,Math.min(2,o.arpGate)):.85,A=1+(Math.random()-.5)*.1*(o.humanVariance??0),F=typeof o.duration=="number"&&o.duration>0?o.duration:e,$=typeof o.spread=="number"&&o.spread>0?Math.min(.045,Math.max(.02,o.spread*.04)):.028,T=I?$:b,P=Math.max(1.4,F)*(1+(Math.random()-.5)*.1*(o.humanVariance??0)),_=Math.max(.04,b*S*A);x.forEach((R,O)=>{const E=o.microTiming?(Math.random()-.5)*o.microTiming*(I?.005:.02):0,G=I?P:_;let oe=C();I&&d&&O===0&&(oe=Math.min(1,oe*(c?1.05:1.1))),n.triggerAttackRelease(R,G,l+O*T+E,oe)});return}(d?[...t].sort((u,h)=>{try{return pi(u).toMidi()-pi(h).toMidi()}catch{return 0}}):t).forEach((u,h)=>{let m=0,f=a,b=e;if(o){const{minVelocity:y,maxVelocity:x,spread:C,microTiming:I,humanVariance:S,duration:A}=o;f=(typeof o.velocity=="number"?Math.min(1,Math.max(.1,o.velocity/127)):(y+Math.random()*(x-y))/127)*a;const $=d?h*(c?.018:.024):0,T=h*(C??.3)*.1,P=(Math.random()-.5)*(I??0)*.05,_=(Math.random()-.5)*(S??0)*.03;m=Math.max(0,$+T+P+_),b=(A||e)*(1+(Math.random()-.5)*.2*(S??0))}else d&&(m=h*(c?.018:.024));d&&h===0&&(f=Math.min(1,f*(c?1.05:1.1))),n.triggerAttackRelease(u,b,l+m,f)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function ks(t,e){if(!Array.isArray(t)||t.length===0)return[];if(t.length<=1)return t;if(e<=25)return t.length<=2?t:[t[0],t[t.length-1]];if(e<=55)return t.length<=4?t:t.slice(0,4);if(e<=80)return t;const o=[...t],s=t[t.length-1].match(/^([A-G]#?)(-?\d+)$/);if(s){const n=parseInt(s[2],10);o.push(`${s[1]}${n+1}`)}return o}function Ui(t,e,o){const i=e==="Unknown"||!e?"Pop":e,s=o?.instrument?_e(o.instrument):void 0,n=s?Oe.find(y=>y.name.toLowerCase()===s.toLowerCase()):void 0,r=o?.playStyle||o?.feelSettings?.playStyle,a=r?Ut.find(y=>y.name===r):void 0,l=n?.instrument??Mo[i]??"piano",d=Ii[i]||{},c=a?.patch??{};o?.feelSettings?.tone&&ke(o.feelSettings.tone);const p={};if(o?.feelSettings){const{spread:y,swing:x,humanise:C,humanState:I,advOverride:S}=o.feelSettings;if(I)Object.assign(p,I);else if(typeof y=="number"&&(p.spread=parseFloat((y/100).toFixed(2))),typeof C=="number"&&(p.humanVariance=parseFloat((C/100).toFixed(2))),typeof x=="number"||typeof C=="number"){const A=typeof x=="number"?x:0,F=typeof C=="number"?C:45;p.microTiming=parseFloat((A/100*.5+F/100*.3).toFixed(2))}S&&(typeof S.spread=="number"&&(p.spread=S.spread),typeof S.duration=="number"&&(p.duration=S.duration),typeof S.humanVariance=="number"&&(p.humanVariance=S.humanVariance),typeof S.variance=="number"&&(p.humanVariance=S.variance),typeof S.microTiming=="number"&&(p.microTiming=S.microTiming),typeof S.micro=="number"&&(p.microTiming=S.micro),typeof S.arpMode=="string"&&(p.arpMode=S.arpMode),typeof S.arpRate=="string"&&(p.arpRate=S.arpRate),typeof S.arpRange=="number"&&(p.arpRange=S.arpRange),typeof S.arpGate=="number"&&(p.arpGate=S.arpGate),typeof S.minVelocity=="number"&&(p.minVelocity=S.minVelocity),typeof S.maxVelocity=="number"&&(p.maxVelocity=S.maxVelocity))}c.arpMode&&c.arpMode!=="off"&&(o?.feelSettings?.advOverride&&o.feelSettings.advOverride.arpMode!==void 0||(p.arpMode=c.arpMode,c.arpRate&&(!o?.feelSettings?.advOverride||o.feelSettings.advOverride.arpRate===void 0)&&(p.arpRate=c.arpRate),c.arpRange!==void 0&&(!o?.feelSettings?.advOverride||o.feelSettings.advOverride.arpRange===void 0)&&(p.arpRange=c.arpRange))),c.isStrum!==void 0&&(!o?.feelSettings?.advOverride||o.feelSettings.advOverride.isStrum===void 0)&&(p.isStrum=c.isStrum);const u={...d,...c,...p,bpm:o?.bpm??d.bpm??90,playStyle:r,...typeof o?.velocity=="number"?{velocity:o.velocity}:{}},h=o?.duration??d.duration??.9,m=typeof p.duration=="number"?p.duration:c.durationMultiplier?h*c.durationMultiplier:h,f=o?.feelSettings?.density??50,b=ks(t,f);In(b,m,u,l,o?.customConfig)}let ti=null;function $n(){if(!ti){const t=Ci();ti=new De({oscillator:{type:"sine"},envelope:{attack:.02,decay:.25,sustain:.85,release:.4},volume:-7}).connect(t)}return ti}function _i(t,e=.8,o,i=.85){try{Promise.all([Si(),$i()]).then(()=>{const s=$n(),r=`${t.replace(/\d+$/,"")}1`,a=typeof o=="number"?o:Eo();s.triggerAttackRelease(r,e,a,i)}).catch(s=>console.warn("Sub bass audio failed:",s))}catch(s){console.warn("Sub bass audio failed:",s)}}function En(t,e="root position"){const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},i=4,s=(Array.isArray(t)?t:[]).filter(d=>typeof d=="string"&&d.trim().length>0).map(d=>d.replace(/\d+$/,""));if(s.length===0)return["C4","E4","G4"];let n=i,r=o[s[0]]??0;const a=[];s.forEach((d,c)=>{const p=o[d]??0;c>0&&p<=r&&n++,a.push({name:d,oct:n}),r=p});const l=(e||"").toLowerCase();if(l.includes("octave")||l.includes("high"))return a.map(d=>`${d.name}${d.oct+1}`);if(l.includes("inversion")||l.includes("1st")){if(a.length>1){const[d,...c]=a;return[...c.map(p=>`${p.name}${p.oct}`),`${d.name}${d.oct+1}`]}return a.map(d=>`${d.name}${d.oct}`)}else return a.map(d=>`${d.name}${d.oct}`)}let st=null,yt=null,Ss="lead-synth",Cs="Stage Rhodes",Ei=85,Ti=!1;function Tn(t){t&&(Cs=t)}function Mn(t){Ss=t,st&&Is(st,t)}function Nn(t){Ei=Math.max(0,Math.min(100,t)),Mi()}function An(t){Ti=t,Mi()}function On(t){Mi()}function Mi(){yt&&(Ti?yt.gain.value=0:yt.gain.value=Ei/100*.9)}function Is(t,e){try{switch(e){case"warm-pluck":t.set({oscillator:{type:"triangle"},envelope:{attack:.005,decay:.2,sustain:.05,release:.3}});break;case"lofi-sine":t.set({oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.7,release:.5}});break;case"electric-lead":t.set({oscillator:{type:"sawtooth4"},envelope:{attack:.01,decay:.4,sustain:.6,release:.4}});break;case"reed-flute":t.set({oscillator:{type:"sine8"},envelope:{attack:.08,decay:.2,sustain:.8,release:.35}});break;default:t.set({oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}});break}}catch{}}function Fn(){if(!st)try{st=new ae(De,{oscillator:{type:"sawtooth"},envelope:{attack:.02,decay:.3,sustain:.7,release:.4}}),yt=new Pt(.75);const t=Ci();st.connect(yt),yt.connect(t),Is(st,Ss)}catch{return null}return st}function nt(t,e,o,i=.85,s){if(!Ti)try{Promise.all([Si(),$i()]).then(()=>{const n=typeof t=="number"?H(t):t,r=typeof o=="number"?o:Eo(),a=Math.max(.05,e),d=Math.max(.05,Math.min(1,i))*(Ei/100),p=_e(s||Cs),u=Oe.find(m=>m.name.toLowerCase()===p.toLowerCase());if(u){const m=vs(u.instrument);if(m&&typeof m.triggerAttackRelease=="function"){m.triggerAttackRelease(n,a,r,d);return}}const h=Fn();h&&typeof h.triggerAttackRelease=="function"&&h.triggerAttackRelease(n,a,r,d)}).catch(()=>{})}catch{}}const Bn=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Dn=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],U={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Pn=new Set(["F","Bb","Eb","Ab","Db","Gb"]),St=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ze={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7],sus2:[0,2,7],dom9:[0,4,7,10,14],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],maj6:[0,4,7,9],min6:[0,3,7,9],mmaj7:[0,3,7,11],sus7:[0,5,7,10],sus9:[0,5,7,10,14]},Rn=Object.keys(ze),xo={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Ct={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},It={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},$t={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"♭III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"♭VI","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"♭III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi","LEADING-TONE":"vii°",SUBTONIC:"♭VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii",SUBTONIC:"♭VII"},PHRYGIAN:{TONIC:"i",SUPERTONIC:"♭II",MEDIANT:"♭III",SUBDOMINANT:"iv",DOMINANT:"v°",SUBMEDIANT:"♭VI","LEADING-TONE":"vii",SUBTONIC:"♭vii"},LOCRIAN:{TONIC:"i°",SUPERTONIC:"♭II",MEDIANT:"♭iii",SUBDOMINANT:"iv",DOMINANT:"♭V",SUBMEDIANT:"♭VI","LEADING-TONE":"♭vii",SUBTONIC:"♭vii"}};function z(t,e){const o=(t%12+12)%12;return e?Dn[o]:Bn[o]}function ce(t){if(!t)return{root:"C",quality:"maj"};const e=t.trim(),o=e[0]?.toUpperCase();let i="C",s=e;if(o&&/[A-G]/.test(o)){const r=e[1];r==="b"||r==="B"||r==="♭"||r==="♭"?(i=`${o}b`,s=e.slice(2)):r==="#"||r==="♯"||r==="♯"?(i=`${o}#`,s=e.slice(2)):(i=o,s=e.slice(1))}s=s.toLowerCase();let n="maj";return s.includes("maj9")||s.includes("m9")&&s.includes("maj")?n="maj9":s.includes("min9")||s.includes("m9")?n="min9":s.includes("dom9")||s.includes("9sus")||s.includes("9")?s.includes("9sus")||s.includes("sus9")?n="sus9":n="dom9":s.includes("m(maj7)")||s.includes("mmaj7")||s.includes("minmaj7")?n="mmaj7":s.includes("maj7sus")||s.includes("7sus")?n="sus7":s.includes("maj7")||s.includes("m7")&&s.includes("maj")?n="maj7":s.includes("min7")||s.includes("m7")?n="min7":s.includes("min6")||s.includes("m6")?n="min6":s.includes("maj6")||s.includes("6")&&!s.includes("m")?n="maj6":s.includes("dim7")?n="dim7":s.includes("dim")||s.includes("°")?n="dim":s.includes("aug")||s.includes("+")?n="aug":s.includes("sus2")?n="sus2":s.includes("sus4")||s.includes("sus")?n="sus4":s.includes("7")?n="dom7":s.includes("min")||s==="m"?n="min":n="maj",{root:i,quality:n}}const Ln=Object.keys($t),Re={MAJOR:"Major",NATURAL_MINOR:"Minor",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian",PHRYGIAN:"Phrygian",LOCRIAN:"Locrian"},oo={MAJOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],NATURAL_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],PHRYGIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LOCRIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],HARMONIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],MELODIC_MINOR:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]},ft={MAJOR:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},NATURAL_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},DORIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},PHRYGIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,SUBTONIC:10},LYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:6,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11},MIXOLYDIAN:{TONIC:0,SUPERTONIC:2,MEDIANT:4,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,SUBTONIC:10},LOCRIAN:{TONIC:0,SUPERTONIC:1,MEDIANT:3,SUBDOMINANT:5,DOMINANT:6,SUBMEDIANT:8,SUBTONIC:10},HARMONIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:8,"LEADING-TONE":11},MELODIC_MINOR:{TONIC:0,SUPERTONIC:2,MEDIANT:3,SUBDOMINANT:5,DOMINANT:7,SUBMEDIANT:9,"LEADING-TONE":11}},Gi={MAJOR:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"min",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"dim"},NATURAL_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"min",SUBMEDIANT:"maj",SUBTONIC:"maj"},DORIAN:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"maj",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"dim",SUBTONIC:"maj"},PHRYGIAN:{TONIC:"min",SUPERTONIC:"maj",MEDIANT:"maj",SUBDOMINANT:"min",DOMINANT:"dim",SUBMEDIANT:"maj",SUBTONIC:"min"},LYDIAN:{TONIC:"maj",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"dim",DOMINANT:"maj",SUBMEDIANT:"min","LEADING-TONE":"min"},MIXOLYDIAN:{TONIC:"maj",SUPERTONIC:"min",MEDIANT:"dim",SUBDOMINANT:"maj",DOMINANT:"min",SUBMEDIANT:"min",SUBTONIC:"maj"},LOCRIAN:{TONIC:"dim",SUPERTONIC:"maj",MEDIANT:"min",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj",SUBTONIC:"min"},HARMONIC_MINOR:{TONIC:"min",SUPERTONIC:"dim",MEDIANT:"aug",SUBDOMINANT:"min",DOMINANT:"maj",SUBMEDIANT:"maj","LEADING-TONE":"dim"},MELODIC_MINOR:{TONIC:"min",SUPERTONIC:"min",MEDIANT:"aug",SUBDOMINANT:"maj",DOMINANT:"maj",SUBMEDIANT:"dim","LEADING-TONE":"dim"}},$s=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],zn={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},jn={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},Ni={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},Ze=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function jt(t){return(Ze.find(e=>e.name===t)||Ze[0]).dot}const Un={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","MEDIANT","SUBMEDIANT"]},{degrees:["SUBDOMINANT","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","DOMINANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","SUBMEDIANT","TONIC"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]},{degrees:["SUBMEDIANT","SUBTONIC","TONIC","DOMINANT"]},{degrees:["SUBMEDIANT","SUBTONIC","MEDIANT","TONIC"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","SUBMEDIANT","SUBDOMINANT","TONIC"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]},{degrees:["SUBMEDIANT","DOMINANT","TONIC","SUBDOMINANT"]},{degrees:["SUBDOMINANT","DOMINANT","TONIC","SUBMEDIANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]},{degrees:["SUBDOMINANT","TONIC","SUBTONIC","SUPERTONIC"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUPERTONIC","SUBDOMINANT","SUBTONIC","TONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]},{degrees:["SUBTONIC","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["SUBDOMINANT","SUBTONIC","TONIC","SUBMEDIANT"]},{degrees:["SUBTONIC","TONIC","SUBDOMINANT","SUPERTONIC"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","TONIC","DOMINANT","SUBMEDIANT"]},{degrees:["SUPERTONIC","DOMINANT","TONIC","SUBMEDIANT"]}]};function _n(t,e){return 1+t.degrees.filter(o=>e.includes(o)).length*.6}function we(t,e){const o=t.reduce((s,n)=>s+e(n),0);let i=Math.random()*o;for(const s of t)if(i-=e(s),i<=0)return s;return t[t.length-1]}function Gn(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const mi=4,_t=1,Et=8,Vn={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Es(t,e="MAJOR",o="Pop",i="Uplifting"){let n={TONIC:1,SUBDOMINANT:.45,SUBMEDIANT:.4,SUPERTONIC:.3,SUBTONIC:.3,MEDIANT:.15,DOMINANT:.15,"LEADING-TONE":.02}[t]??.1;return e.includes("MINOR")||e==="DORIAN"?(t==="SUBMEDIANT"&&(n*=1.4),t==="SUBTONIC"&&(n*=1.3)):e==="MIXOLYDIAN"?(t==="SUBTONIC"&&(n*=1.8),t==="SUBDOMINANT"&&(n*=1.5)):e==="LYDIAN"&&t==="SUPERTONIC"&&(n*=1.8),o==="Lo-fi/Chill"||o==="R&B/Soul"?((t==="SUBDOMINANT"||t==="SUPERTONIC")&&(n*=2),t==="SUBMEDIANT"&&(n*=1.5)):o==="Jazz-ish"||o==="Bossa Nova/Latin"?(t==="SUPERTONIC"&&(n*=2.5),t==="SUBDOMINANT"&&(n*=1.8)):o==="Pop"||o==="Indie/Folk"||o==="Shoegaze"?(t==="SUBDOMINANT"||t==="SUBMEDIANT")&&(n*=1.8):o==="Synthwave"||o==="House/Dance"||o==="Rock"||o==="Punk"||o==="Funk/Disco"||o==="Reggae/Dub"?(t==="SUBTONIC"&&(n*=2.2),t==="SUBDOMINANT"&&(n*=1.8),t==="SUBMEDIANT"&&(n*=1.6)):(o==="Classical/Orchestral"||o==="Gospel")&&t==="TONIC"&&(n*=2.5),i==="Uplifting"||i==="Epic"||i==="Peaceful"?t==="TONIC"&&(n*=2.5):i==="Melancholy"||i==="Dark"?(t==="SUBMEDIANT"&&(n*=2.2),t==="SUPERTONIC"&&(n*=1.5)):i==="Dreamy"||i==="Nostalgic"||i==="Warm"?(t==="SUBDOMINANT"&&(n*=2),t==="SUBMEDIANT"&&(n*=1.6),t==="MEDIANT"&&(n*=1.4)):i==="Tense"?(t==="SUPERTONIC"||t==="SUBDOMINANT")&&(n*=1.8):(i==="Groovy"||i==="Energetic")&&(t==="SUBTONIC"||t==="SUBDOMINANT")&&(n*=1.8),(Ni[i]||[]).includes(t)&&(n*=1.3),Math.max(.01,n)}function Xe(t,e,o="MAJOR",i="Pop",s="Uplifting"){if(t===e)return .05;let r=(Vn[t]||{})[e]??.1;return(o.includes("MINOR")||o==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(r*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(r*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(r*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(r*=1.3)),i==="Jazz-ish"||i==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(r*=1.8),t==="DOMINANT"&&e==="TONIC"&&(r*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(r*=1.4)):(i==="House/Dance"||i==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(r*=1.5),(Ni[s]||[]).includes(e)&&(r*=1.5),Math.max(.01,r)}function qn(t,e,o,i,s,n,r=mi){let a=o.filter(p=>t.degrees[p]);a.length||(a=o);const l=we(a,p=>Es(p,t.type,s,n))||"TONIC",d=[l];let c=l;for(let p=1;p<r;p++){const u=p===r-1;let h=o.filter(b=>t.degrees[b]);h.length||(h=o);const m=h.filter(b=>b!==c),f=m.length?m:h;if(u){const b=we(f,y=>{const x=Xe(y,d[0],t.type,s,n),C=Xe(c,y,t.type,s,n);return x*C});d.push(b)}else{const b=f.filter(C=>!d.includes(C)),y=b.length?b:f,x=we(y,C=>Xe(c,C,t.type,s,n));c=x,d.push(x)}}return d}function Gt(t,e,o){return t.includes("b")||t==="F"||t==="Bb"||t==="Eb"||t==="Ab"||t==="Db"||t==="Gb"?!0:t.includes("#")?!1:o}function V(t,e){const{root:o,quality:i}=ce(t),s=U[o]??0,n=ze[i]||ze.maj,r=Gt(o,i,e);return n.map(a=>z(s+a,r))}async function Hn(){const t=typeof import.meta<"u"?"./":"/",o=`${t.endsWith("/")?t:`${t}/`}chroma_chords_data.json`;let i=await fetch(o).catch(()=>null);if((!i||!i.ok)&&(i=await fetch("/chroma_chords_data.json").catch(()=>null)),(!i||!i.ok)&&(i=await fetch("./chroma_chords_data.json").catch(()=>null)),!i||!i.ok)throw new Error(`HTTP error: ${i?i.status:"failed to fetch chroma_chords_data.json"}`);const s=await i.json();return Qn(s),s}const Jn={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Yn={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Wn={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Kn={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Xn={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Ts={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Qn(t){const e=[["MIXOLYDIAN",Jn],["DORIAN",Yn],["LYDIAN",Wn]];for(const[o,i]of e)for(const[s,n]of Object.entries(i)){const r=t.scales[`${n}_MAJOR`];if(!r)continue;const a=`${s}_${o}`,l={};for(const d of Ts[o]){const c=Xn[`${o}_${d}`],p=r.degrees[c];if(!p)continue;const u=JSON.parse(JSON.stringify(p));u.next_chord_options=(u.next_chord_options||[]).map(h=>{if(h.nodeId.startsWith(`${n}_MAJOR_`)){const m=h.nodeId.replace(`${n}_MAJOR_`,""),f=Kn[`${o}_${m}`];if(f)return{name:h.name,nodeId:`${s}_${o}_${f}`}}return h}),l[d]=u}t.scales[a]={root:s,type:o,degrees:l}}}const Zn=[156,192,236],er=[242,115,95];function fo(t,e,o){return t+(e-t)*o}function Tt(t){const e=Math.max(0,Math.min(1,t));return"#"+Zn.map((i,s)=>Math.round(fo(i,er[s],e))).map(i=>i.toString(16).padStart(2,"0")).join("")}function ne(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(fo(84,128,e)),radius:Math.round(fo(40,12,e)),fontSize:Math.round(fo(21,30,e)),color:Tt(e)}}function wo(t,e,o){return{Tonic:`As the tonic, ${o} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${o} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${o} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${o} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${o} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${o} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${o} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${o} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${o} colors the progression as the ${t.toLowerCase()} of ${e}.`}function He(t,e,o,i){const n=o.degrees[e].chord_name,r=It[e]??.5,a=$t[o.type]||$t.MAJOR;return{name:gi(n),tag:xo[e]||"move",roman:a[e]||"?",color:Tt(r),functionLabel:Ct[e]||e,notes:V(n,i),scaleLabel:`${o.root} ${Re[o.type]||o.type}`,desc:wo(Ct[e]||e,Re[o.type]||o.type,gi(n)),degree:e,scaleKey:t,tension:r}}function gi(t){const{root:e,quality:o}=ce(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[o]??""}`}const tr={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Ms(t,e){let o=tr[t]||92;return e==="Tense"&&(o+=6),(e==="Dreamy"||e==="Melancholy")&&(o-=6),o}function ko(t,e,o,i){const s=Math.max(_t,Math.min(Et,i?.length??mi)),n=zn[e]||"MAJOR",r=jn[o],a=i?.scaleType||(r&&n==="MAJOR"?r:n);let l=i?.key&&St.includes(i.key)?i.key:Gn(St),d=`${l}_${a}`;t.scales[d]||(l="C",d=`${l}_${a}`);let c=t.scales[d];if(!c){const C=Object.keys(t.scales).find(I=>I.endsWith(`_${a}`))||Object.keys(t.scales)[0];c=t.scales[C],l=c?c.root:"C",d=C}const p=j(l,a),u=Object.keys(c.degrees),h=Ni[o]||[],m=Un[a]||[],f=s===mi?m.filter(C=>C.degrees.every(I=>u.includes(I))):[],x=(f.length&&Math.random()<.25?we(f,C=>_n(C,h)).degrees:qn(c,d,u,h,e,o,s)).map(C=>He(d,C,c,p));return{genre:e,mood:o,key:l,scaleType:a,bpm:Ms(e,o),chords:x}}function or(t,e,o,i=[]){const s=t.chords.length,n=Math.max(_t,Math.min(Et,e));if(n===s)return{progression:t,cachedTailChords:[...i]};if(n<s){const T=t.chords.slice(0,n),P=t.chords.slice(n);return{progression:{...t,chords:T},cachedTailChords:[...P,...i]}}const r=[...t.chords],a=[...i],l=n-s,d=[];for(;d.length<l&&a.length>0;)d.push(a.shift());const c=[...r,...d],p=n-c.length;if(p<=0)return{progression:{...t,chords:c},cachedTailChords:a};const u=t.key||"C",h=t.scaleType||"MAJOR";let m=`${u}_${h}`,f=o.scales?.[m];if(!f&&o.scales&&Object.keys(o.scales).length>0){const T=Object.keys(o.scales).find(P=>P.endsWith(`_${h}`))||Object.keys(o.scales)[0];f=o.scales[T],m=T}if(!f)return{progression:{...t,chords:c},cachedTailChords:a};const b=j(f.root||u,h),y=Object.keys(f.degrees);let x=y.filter(T=>f.degrees[T]);x.length||(x=y);const C=T=>{if(!T)return"TONIC";if(T.degree&&f.degrees[T.degree])return T.degree;for(const[P,_]of Object.entries(f.degrees))if(_.chord_name===T.name)return P;return"TONIC"},I=c[c.length-1];let S=C(I);const A=c[0],F=C(A),$=[];for(let T=0;T<p;T++){const P=T===p-1,_=x.filter(E=>E!==S),R=_.length?_:x;let O;P?O=we(R,E=>{const G=Xe(E,F,f.type,t.genre,t.mood),oe=Xe(S,E,f.type,t.genre,t.mood);return G*oe})||R[0]:O=we(R,E=>Xe(S,E,f.type,t.genre,t.mood))||R[0],S=O,$.push(He(m,O,f,b))}return{progression:{...t,chords:[...c,...$]},cachedTailChords:a}}const ir={TONIC:{upper:"I",lower:"i"},SUPERTONIC:{upper:"II",lower:"ii"},MEDIANT:{upper:"III",lower:"iii"},SUBDOMINANT:{upper:"IV",lower:"iv"},DOMINANT:{upper:"V",lower:"v"},SUBMEDIANT:{upper:"VI",lower:"vi"},"LEADING-TONE":{upper:"VII",lower:"vii"},SUBTONIC:{upper:"♭VII",lower:"♭vii"}},sr={0:{upper:"I",lower:"i"},1:{upper:"♭II",lower:"♭ii"},2:{upper:"II",lower:"ii"},3:{upper:"♭III",lower:"♭iii"},4:{upper:"III",lower:"iii"},5:{upper:"IV",lower:"iv"},6:{upper:"♯IV",lower:"♯iv"},7:{upper:"V",lower:"v"},8:{upper:"♭VI",lower:"♭vi"},9:{upper:"VI",lower:"vi"},10:{upper:"♭VII",lower:"♭vii"},11:{upper:"VII",lower:"vii"}};function Ns(t){return ze[t]?t:ce(`C${t||""}`).quality}function Ai(t,e){return e==="dom7"?`${t}7`:e==="maj7"?`${t}maj7`:e==="min7"?`${t}7`:e==="dim"?`${t}°`:e==="dim7"?`${t}°7`:e==="aug"?`${t}+`:e==="sus4"?`${t}sus4`:e==="sus2"?`${t}sus2`:e==="dom9"?`${t}9`:e==="maj9"?`${t}maj9`:e==="min9"?`${t}m9`:t}function So(t,e){const o=ir[t]||{upper:"I",lower:"i"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?o.lower:o.upper;return Ai(s,e)}function No(t,e){const o=sr[(t%12+12)%12]||{upper:"?",lower:"?"},s=e==="min"||e==="min7"||e==="dim"||e==="dim7"||e==="min9"?o.lower:o.upper;return Ai(s,e)}function nr(t,e,o,i){const s=e==="maj"||e==="dom7"||e==="dom9",n=e==="min"||e==="min7"||e==="min9";if(t==="MEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"glow",tension:.58,desc:`${o} acts as a secondary dominant (III) adding bright chromatic tension and pull.`};if(t==="SUPERTONIC"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.62,desc:`${o} acts as a secondary dominant (II), driving momentum toward the dominant.`};if(t==="SUBMEDIANT"&&s)return{functionLabel:"Secondary Dominant",tag:"lift",tension:.55,desc:`${o} acts as a secondary dominant (VI), energizing the progression.`};if(t==="TONIC"&&e==="dom7")return{functionLabel:"Secondary Dominant",tag:"reach",tension:.52,desc:`${o} acts as a secondary dominant (I7), pulling strongly toward the subdominant.`};if(t==="SUBDOMINANT"&&n)return{functionLabel:"Borrowed (Minor iv)",tag:"drift",tension:.48,desc:`${o} borrows the poignant minor iv cadence from the parallel minor mode.`};const r=It[t]??.4;return{functionLabel:"Chromatic Alteration",tag:"color",tension:Math.min(.85,r+.15),desc:`${o} adds chromatic color to the ${i.root} ${Re[i.type]||i.type} progression.`}}function Ao(t,e,o,i){const s=(t%12+12)%12,n=(U[o]??0)+s,a=`${z(n,i)}${Oi[e]??e}`;return s===10?{functionLabel:"Borrowed (Subtonic ♭VII)",tag:"drift",tension:.45,desc:`${a} is the borrowed Mixolydian ♭VII chord, adding a classic rock/pop lift.`}:s===8?{functionLabel:"Borrowed (Submediant ♭VI)",tag:"glow",tension:.5,desc:`${a} is the borrowed Aeolian ♭VI chord, introducing epic modal depth.`}:s===3?{functionLabel:"Borrowed (Mediant ♭III)",tag:"glow",tension:.52,desc:`${a} is the borrowed ♭III chord, providing chromatic punch and modal color.`}:s===1?{functionLabel:"Neapolitan (♭II)",tag:"edge",tension:.65,desc:`${a} is the Neapolitan ♭II chord, providing dramatic half-step motion.`}:{functionLabel:"Borrowed",tag:"drift",tension:.42,desc:`${a} borrows its color from outside the current key.`}}function rr(t,e,o,i,s){const n=o.degrees[e],{root:r}=ce(n.chord_name),a=U[r]??0,l=z(a,s),d=`${l}${Oi[i]??i}`,c=Gt(l,i,s),p=ze[i]?ze[i].map(m=>z(a+m,c)):V(n.chord_name,s),u=So(e,i),h=nr(e,i,d,o);return{name:d,tag:h.tag,roman:u,color:Tt(h.tension),functionLabel:h.functionLabel,notes:p,scaleLabel:`${o.root} ${Re[o.type]||o.type}`,desc:h.desc,degree:e,scaleKey:t,tension:h.tension}}function fi(t,e,o,i,s,n){const r=`${e}_${o}`,a=t.scales[r];if(!a||!i.length)return null;const l=j(e,o),d=U[e]??0,c={};Object.entries(a.degrees).forEach(([u,h])=>{const{root:m}=ce(h.chord_name),f=U[m]??0;f in c||(c[f]=u)});const p=i.slice(0,Et).map(({root:u,quality:h})=>{const m=U[u]??d,f=c[m],b=Ns(h);if(f){const I=a.degrees[f],{quality:S}=ce(I.chord_name);return b===S||!h&&S?He(r,f,a,l):rr(r,f,a,b,l)}const y=(m-d+12)%12,x=Ao(y,b,e,l),C=No(y,b);return ar(e,y,b,x.functionLabel,C,x.tag,l)});return p.length<_t?null:{genre:s,mood:n,key:e,scaleType:o,bpm:Ms(s,n),chords:p}}const Oi={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function ar(t,e,o,i,s,n,r){const a=(U[t]??0)+e,l=z(a,r),d=Ns(o),c=`${l}${Oi[d]??d}`,p=Gt(l,d,r),u=(ze[d]||ze.maj).map(f=>z(a+f,p)),h=s==="?"?No(e,d):s,m=.42;return{name:c,tag:n,roman:h,color:Tt(m),functionLabel:i==="Borrowed"?Ao(e,d,t,r).functionLabel:i,notes:u,scaleLabel:"Borrowed",desc:`${c} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:m}}function bi(t){const e=t.match(/^[A-Ga-g][#b]?/),o=e?e[0]:"C";return o[0].toUpperCase()+o.slice(1)}function bo(t){const e=(t||"C").trim(),o=e[0]?.toUpperCase()||"C";let i=o,s=e.slice(1);if(e.length>1){const n=e[1];n==="b"||n==="B"||n==="♭"||n==="♭"?(i=`${o}b`,s=e.slice(2)):(n==="#"||n==="♯"||n==="♯")&&(i=`${o}#`,s=e.slice(2))}return{root:i,suffix:s}}function As(t,e,o){const{root:i,suffix:s}=bo(t),n=i.replace("♭","b").replace("♯","#"),a=(((U[n]??0)+e)%12+12)%12;return`${z(a,o)}${s}`}function Vi(t,e,o){if(!t||!t.chords||t.chords.length===0)return t;const i=/\bmin\b|minor/i.test(e)||/\b[A-G][#b]?m\b/.test(e),s=/\bmaj\b|major/i.test(e),n=i&&!s,r=e.replace(/\s*(maj|min|major|minor)\s*/gi,"").replace(/♭/g,"b").replace(/♯/g,"#").trim(),a=o||(n?"NATURAL_MINOR":s?"MAJOR":t.scaleType||"MAJOR"),l=r,d=(t.key||"C").replace("♭","b").replace("♯","#").trim(),c=U[d]??0,p=U[l]??0,u=((p-c)%12+12)%12,h=j(l,a),m=`${l}_${a}`,f=ft[a]||ft.MAJOR,b=t.chords.map(y=>{const x=As(y.name,u,h),{root:C,quality:I}=ce(x),A=(((U[C]??0)-p)%12+12)%12;let F=null;for(const[E,G]of Object.entries(f))if(G===A){F=E;break}let $,T,P=y.tag||"move",_=y.tension,R=y.degree;if(F)R=F,$=So(R,I),T=Ct[R]||R,P=xo[R]||P,_=It[R]??_;else{R="BORROWED",$=No(A,I);const E=Ao(A,I,l,h);T=E.functionLabel,P=E.tag||P,_=E.tension||.45}const O=V(x,h);return{...y,name:x,roman:$,functionLabel:T,tag:P,notes:O,degree:R,scaleKey:m,scaleLabel:`${l} ${Re[a]||a}`,desc:wo(T,Re[a]||a,x),tension:_}});return{...t,key:l,scaleType:a,chords:b}}function lr(t,e,o,i){if(t==="sus4"||t==="sus2"||t==="sus7"||t==="sus9")return t;const s=t.includes("7"),n=t.includes("9"),r=t.includes("6");return e==="min"?n?"min9":s?o==="TONIC"&&(i==="HARMONIC_MINOR"||i==="MELODIC_MINOR")&&(t==="maj7"||t==="mmaj7")?"mmaj7":"min7":r?"min6":"min":e==="maj"?n?o==="DOMINANT"?"dom9":"maj9":s?o==="DOMINANT"?"dom7":"maj7":r?"maj6":"maj":e==="dim"?s?"dim7":"dim":e==="aug"?"aug":e}function cr(t,e){switch(e){case"maj":return t;case"min":return`${t}m`;case"dim":return`${t}dim`;case"aug":return`${t}aug`;case"dom7":return`${t}7`;case"min7":return`${t}m7`;case"maj7":return`${t}maj7`;case"dim7":return`${t}dim7`;case"sus4":return`${t}sus4`;case"sus2":return`${t}sus2`;case"dom9":return`${t}9`;case"maj9":return`${t}maj9`;case"min9":return`${t}m9`;case"maj6":return`${t}6`;case"min6":return`${t}m6`;case"mmaj7":return`${t}m(maj7)`;case"sus7":return`${t}7sus4`;case"sus9":return`${t}9sus4`;default:return`${t}${e}`}}function dr(t,e){if(!t||!t.chords||t.chords.length===0)return t;const o=(t.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=(e||o).toUpperCase().replace(/\s+/g,"_"),s=(t.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),n=U[s]??0,r=j(s,i),a=`${s}_${i}`,l=oo[o]||oo.MAJOR,d=ft[o]||ft.MAJOR,c=oo[i]||oo.MAJOR,p=ft[i]||ft.MAJOR,u=Gi[i]||Gi.MAJOR,h=t.chords.map(m=>{const{root:f,quality:b}=ce(m.name),x=(((U[f]??0)-n)%12+12)%12;let C=-1;if(m.degree&&m.degree!=="BORROWED"&&(C=l.indexOf(m.degree)),C===-1)for(let I=0;I<l.length;I++){const S=l[I];if(d[S]===x){C=I;break}}if(C>=0&&C<c.length){const I=c[C],S=p[I],A=(n+S)%12,F=z(A,r),$=u[I]||"maj",T=lr(b,$,I,i),P=cr(F,T),_=V(P,r),R=$t[i]?.[I];let O;if(R)if(T==="maj"||T==="min")O=R;else{const Ie=R.replace(/[°+]/g,"");O=Ai(Ie,T)}else O=So(I,T);const E=Ct[I]||I,G=xo[I]||m.tag||"move",oe=It[I]??m.tension;return{...m,name:P,roman:O,functionLabel:E,tag:G,notes:_,degree:I,scaleKey:a,scaleLabel:`${s} ${Re[i]||i}`,desc:wo(E,Re[i]||i,P),tension:oe}}else{let I=null;for(const[S,A]of Object.entries(p))if(A===x){I=S;break}if(I){const S=So(I,b),A=Ct[I]||I,F=xo[I]||m.tag||"move",$=It[I]??m.tension,T=V(m.name,r);return{...m,roman:S,functionLabel:A,tag:F,notes:T,degree:I,scaleKey:a,scaleLabel:`${s} ${Re[i]||i}`,desc:wo(A,Re[i]||i,m.name),tension:$}}else{const S=No(x,b),A=Ao(x,b,s,r),F=V(m.name,r);return{...m,roman:S,functionLabel:A.functionLabel,tag:A.tag||m.tag,tension:A.tension||.45,notes:F,degree:"BORROWED",scaleKey:a,scaleLabel:"Borrowed",desc:`${m.name} borrows its color from outside the current key.`}}}});return{...t,scaleType:i,chords:h}}const qi={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Os(t,e,o,i){const s=U[t]??0;let n=qi[e]||qi.Major;return o==="6th"?n=[...n,9]:o==="7th (dom / m7)"?n=[...n,10]:o==="Major 7th (M7)"?n=[...n,11]:o==="9th"&&(n=[...n,10,14]),n.map(r=>z(s+r,i))}const pr={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},hr={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Fs(t,e,o){return e==="Minor"&&o==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${pr[e]??""}${hr[o]??""}`}const ur={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9,PHRYGIAN:4,LOCRIAN:11,MELODIC_MINOR:9},Bs={};St.forEach(t=>{Bs[U[t]]=t});function mr(t,e){const o=(e||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=ur[o]??0,n=(((U[t]??0)-i)%12+12)%12;return Bs[n]??"C"}function j(t,e){const o=mr(t,e);return Pn.has(o)||o.includes("b")}function vo(t,e,o){const i=bi(t.name),s=i.includes("b"),n=Fs(i,e,o),r=Os(i,e,o,s);let a=t.roman||"";if(a){const c=a.match(/^([♭♯b#]*)([ivxIVX]+)/);if(c){const p=c[1],u=c[2],h=e==="Minor"||e==="Diminished",m=h?u.toLowerCase():u.toUpperCase();let f="";e==="Diminished"?f=o==="7th (dom / m7)"?"°7":"°":e==="Suspended (sus)"?f="sus4":o==="6th"?f="6":o==="7th (dom / m7)"?f="7":o==="Major 7th (M7)"?f=h?"m(maj7)":"maj7":o==="9th"&&(f=h?"m9":"maj9"),a=`${p}${m}${f}`}}const l=t.initialChord?.tension??t.tension??.1,d=t.initialChord?.color??t.color??Tt(l);return{...t,name:n,notes:r,roman:a,tension:l,color:d}}function J(t,e,o,i,s,n,r,a){const l=Fs(t,e,o),d=Os(t,e,o,a);return{name:l,tag:i||"sub",roman:i,color:Tt(r),functionLabel:s,notes:d,scaleLabel:"Substitution",desc:n,degree:"SUBSTITUTION",scaleKey:"",tension:r}}function vi(t,e,o){const i=U[e.key]??0,s=e.scaleType.includes("MINOR"),n=j(e.key,e.scaleType),r=s?[(()=>{const c=z(i+1,!0),p=J(c,"Major","Major 7th (M7)","♭II","Neapolitan","a dark, dramatic slide in from a half-step above",.6,!0);return{name:p.name,roman:"♭II",notes:p.notes,sub:"Neapolitan chord — a dramatic slide in from a half-step above",chord:p,tension:.6}})(),(()=>{const c=z(i+5,!0),p=J(c,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.45,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — deeper minor mood",chord:p,tension:.45}})(),(()=>{const c=z(i+10,!0),p=J(c,"Minor","7th (dom / m7)","v","Minor dominant","unresolved minor drift",.52,!0);return{name:p.name,roman:"v",notes:p.notes,sub:"a step further into shadow — unresolving drift",chord:p,tension:.52}})()]:[(()=>{const c=z(i+8,!0),p=J(c,"Major","Major 7th (M7)","♭VI","Flat submediant",`borrowed from ${e.key} minor — the cinematic shadow`,.5,!0);return{name:p.name,roman:"♭VI",notes:p.notes,sub:`borrowed from ${e.key} minor — the cinematic shadow`,chord:p,tension:.5}})(),(()=>{const c=z(i+5,!0),p=J(c,"Minor","7th (dom / m7)","iv","Minor subdominant","the minor subdominant — softer, sadder",.42,!0);return{name:p.name,roman:"iv",notes:p.notes,sub:"the minor subdominant — softer, sadder",chord:p,tension:.42}})(),(()=>{const c=z(i+3,!0),p=J(c,"Major","Major 7th (M7)","♭III","Flat mediant","a step further out — cooler, more remote",.58,!0);return{name:p.name,roman:"♭III",notes:p.notes,sub:"a step further out — cooler, more remote",chord:p,tension:.58}})()],a=[(()=>{const c=z(i+7,n),p=z(i+2,n),u=J(p,"Major","7th (dom / m7)","V7/V","Secondary dominant",`aimed at ${c}7 — sharpens the approach`,.82,n);return{name:u.name,roman:"V7/V",notes:u.notes,sub:`aimed at ${c}7 — sharpens the approach`,chord:u,tension:.82}})(),(()=>{const c=z(i+(s?3:9),n),p=z(i+4,n),u=J(p,"Major","7th (dom / m7)","V7/vi","Secondary dominant",`aimed at ${c}m7 — makes it feel arrived at`,.88,n);return{name:u.name,roman:"V7/vi",notes:u.notes,sub:`aimed at ${c}m7 — makes it feel arrived at`,chord:u,tension:.88}})(),(()=>{const c=z(i+1,!0),p=J(c,"Major","7th (dom / m7)","subV7","Tritone substitute","a tritone substitute — slides in sideways",.95,!0);return{name:p.name,roman:"subV7",notes:p.notes,sub:"a tritone substitute — slides in sideways",chord:p,tension:.95}})()],l=[(()=>{const c=z(i+5,n),p=J(c,"Major","Major 7th (M7)",s?"IV":"IVmaj7","Subdominant","floats rather than resolving",.3,n);return{name:p.name,roman:"IV",notes:p.notes,sub:"floats rather than resolving",chord:p,tension:.3}})(),(()=>{const c=z(i,n),p=J(c,s?"Minor":"Major","9th",s?"im9":"Imaj9","Tonic extension","the same home with more air in it",.18,n);return{name:p.name,roman:s?"im9":"Imaj9",notes:p.notes,sub:"the same home with more air in it",chord:p,tension:.18}})(),(()=>{const c=z(i+(s?3:4),n),p=J(c,s?"Major":"Minor","7th (dom / m7)",s?"♭III":"iii","Mediant","wistful, halfway between home and away",.35,n);return{name:p.name,roman:s?"♭III":"iii",notes:p.notes,sub:"wistful, halfway between home and away",chord:p,tension:.35}})()],d=[(()=>{const c=z(i,n),p=J(c,s?"Minor":"Major",s?"None":"Major 7th (M7)",s?"i":"I","Tonic","full resolution — the sense of arriving",.05,n);return{name:p.name,roman:s?"i":"I",notes:p.notes,sub:"full resolution — the sense of arriving",chord:p,tension:.05}})(),(()=>{const c=z(i+7,n),p=J(c,"Major","7th (dom / m7)","V7","Dominant","the pull that makes home feel earned",1,n);return{name:p.name,roman:"V7",notes:p.notes,sub:"the pull that makes home feel earned",chord:p,tension:1}})(),(()=>{const c=z(i+(s?8:9),n),p=J(c,s?"Major":"Minor","7th (dom / m7)",s?"♭VI":"vi","Submediant","a soft landing instead of a full stop",.28,n);return{name:p.name,roman:s?"♭VI":"vi",notes:p.notes,sub:"a soft landing instead of a full stop",chord:p,tension:.28}})()];return[{name:"Darker",sub:"heavier, more shadow",tension:.55,rows:r},{name:"More tension",sub:"sharper pull forward",tension:.85,rows:a},{name:"Dreamier",sub:"softer, more air",tension:.3,rows:l},{name:"Resolve home",sub:"settles back to center",tension:.05,rows:d}]}function Co(t,e,o){const i=U[e.key]??0,s=e.scaleType.includes("MINOR"),n=j(e.key,e.scaleType),r=e.chords;if(s){const f=r[0]?.name||"chord 1",b=r[1]?.name||"chord 2",y=r[2]?.name||"chord 3",x=r[3]?.name||"chord 4",C=J(z(i,n),"Major","None","I","Major tonic","same root, turned bright",.2,n),I=J(z(i+5,n),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,n),S=J(z(i+9,n),"Minor","None","vi","Submediant","melodic lift upward",.4,n),A=J(z(i+11,n),"Diminished","None","vii°","Leading tone","classical harmonic pull",.55,n);return[{name:C.name,sub:`in place of ${f} · same root, turned bright`,roman:"I",notes:C.notes,chord:C,tension:.2},{name:I.name,sub:`in place of ${b} · the Dorian lift, sunny and open`,roman:"IV",notes:I.notes,chord:I,tension:.35},{name:S.name,sub:`in place of ${y} · melodic lift upward`,roman:"vi",notes:S.notes,chord:S,tension:.4},{name:A.name,sub:`in place of ${x} · classical harmonic pull`,roman:"vii°",notes:A.notes,chord:A,tension:.55}]}const a=r[0]?.name||"chord 1",l=r[1]?.name||"chord 2",d=r[2]?.name||"chord 3",c=r[3]?.name||"chord 4",p=J(z(i,n),"Minor","None","i","Tonic minor","same root, turned sad",.3,n),u=J(z(i+5,!0),"Minor","None","iv","Minor subdominant","the lift, but heavier",.4,!0),h=J(z(i+8,!0),"Major","None","♭VI","Flat submediant","big and cinematic",.45,!0),m=J(z(i+10,!0),"Major","None","♭VII","Flat subtonic","lands sideways, not home",.5,!0);return[{name:p.name,sub:`in place of ${a} · same root, turned sad`,roman:"i",notes:p.notes,chord:p,tension:.3},{name:u.name,sub:`in place of ${l} · the lift, but heavier`,roman:"iv",notes:u.notes,chord:u,tension:.4},{name:h.name,sub:`in place of ${d} · big and cinematic`,roman:"♭VI",notes:h.notes,chord:h,tension:.45},{name:m.name,sub:`in place of ${c} · lands sideways, not home`,roman:"♭VII",notes:m.notes,chord:m,tension:.5}]}const gr={m8:"https://warmsynths.github.io/m8hyper/",circuit:"https://warmsynths.github.io/circuit-chords/"},fr={m8:43303,circuit:43302};function br(t,e,o){let i=gr[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(i=`http://localhost:${fr[e]}/`);const s=o&&o.length>0?o.map(l=>t.chords[l]).filter(l=>!!l):t.chords,n=s.map(l=>encodeURIComponent(l.name)).join("+");if(e==="circuit"){const l=u=>{const h=(u||"").toLowerCase();return h.includes("octave")||h.includes("high")||h.includes("up")?"octave":h.includes("inversion")||h.includes("1st")?"1st":"root"},d=s.map(u=>l(u.voicing)).join("+"),c=encodeURIComponent(t.key||"C"),p=encodeURIComponent((t.scaleType||"major").toLowerCase());return`${i}?p=${n}&v=${d}&key=${c}&scale=${p}`}const r=l=>{const d=(l||"").toLowerCase();return d.includes("octave")||d.includes("high")||d.includes("up")?"octave":d.includes("inversion")||d.includes("1st")?"inv1":"root"},a=s.map(l=>r(l.voicing)).join("+");return`${i}?p=${n}&v=${a}`}function vr(t,e,o,i){const s=`${t}_${e}`;let n=o.scales[s];if(!n){const c=Object.keys(o.scales).find(p=>p.endsWith(`_${e}`))||Object.keys(o.scales)[0];n=o.scales[c]||{root:t,type:e,degrees:{}}}const r=j(t,e),a=$t[e]||$t.MAJOR,l=Ts[e]||["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"],d=new Set(i?.chords.map(c=>c.name.toUpperCase())||[]);return l.map(c=>{const p=n.degrees[c],u=p?p.chord_name:t,h=gi(u),m=a[c]||"?",f=Ct[c]||c,b=It[c]??.5,y=V(u,r),x=d.has(h.toUpperCase());return{degreeKey:c,roman:m,chordName:h,functionLabel:f,notes:y,tension:b,isUsedInLoop:x}})}const yr={0:{symbol:"1",name:"Root",isGuideTone:!1},1:{symbol:"♭9",name:"Minor 9th",isGuideTone:!1},2:{symbol:"9",name:"Major 2nd / 9th",isGuideTone:!1},3:{symbol:"♭3",name:"Minor 3rd",isGuideTone:!0},4:{symbol:"3",name:"Major 3rd",isGuideTone:!0},5:{symbol:"4",name:"Perfect 4th",isGuideTone:!1},6:{symbol:"♭5",name:"Diminished 5th",isGuideTone:!1},7:{symbol:"5",name:"Perfect 5th",isGuideTone:!1},8:{symbol:"♯5 / ♭6",name:"Augmented 5th",isGuideTone:!1},9:{symbol:"6",name:"Major 6th",isGuideTone:!1},10:{symbol:"♭7",name:"Minor 7th",isGuideTone:!0},11:{symbol:"7",name:"Major 7th",isGuideTone:!0},14:{symbol:"9",name:"Major 9th",isGuideTone:!1}};function Ds(t,e){const{root:o,quality:i}=ce(t),s=U[o]??0,n=ze[i]||ze.maj,r=Gt(o,i,e);return n.map(a=>{const l=z(s+a,r),d=yr[a]||{symbol:`+${a}`,name:`Interval ${a}`,isGuideTone:!1};return{note:l,intervalSymbol:d.symbol,roleName:d.name,isGuideTone:d.isGuideTone}})}function Ps(t){if(!t||t.length<2)return[];const e=[],o=i=>i.replace(/[^A-Za-z♭♯]/g,"");for(let i=0;i<t.length;i++){const s=i,n=(i+1)%t.length,r=t[s],a=t[n],l=o(r.roman),d=o(a.roman),c=s+1,p=n+1,u=`Bar ${c} → ${p}`,h=`${r.name} → ${a.name}`,m=`${r.roman}–${a.roman}`;(l==="V"||l==="v")&&(d==="I"||d==="i")?e.push({name:"Perfect cadence",type:"Authentic Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"The dominant resolves home — the strongest full stop.",why:"The dominant resolves home — the strongest full stop.",move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name}):(l==="IV"||l==="iv")&&(d==="I"||d==="i")?e.push({name:"Plagal cadence",type:"Plagal Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"A softer landing home, no dominant pull.",why:"A softer landing home, no dominant pull.",move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name}):(l==="V"||l==="v")&&(d==="vi"||d==="♭VI"||d==="VI")?e.push({name:"Interrupted cadence",type:"Deceptive Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Sidesteps home at the last moment.",why:"Sidesteps home at the last moment.",move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name}):l==="♭VII"&&(d==="I"||d==="i")?e.push({name:"Backdoor cadence",type:"Backdoor Cadence",shortName:`${r.name} → ${a.name} (♭VII–${a.roman})`,description:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",why:"Borrowed subtonic resolving up a whole step into the tonic with smooth jazz/pop flavor.",move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name}):(d==="V"||d==="v")&&l!=="V"&&l!=="v"?e.push({name:"Half cadence",type:"Half Cadence",shortName:`${r.name} → ${a.name} (${r.roman}–${a.roman})`,description:"Pauses on the dominant, left hanging.",why:"Pauses on the dominant, left hanging.",move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name}):r.functionLabel==="Secondary Dominant"&&e.push({name:"Secondary Dominant pull",type:"Secondary Dominant Pull",shortName:`${r.name} → ${a.name}`,description:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,why:`${r.name} acts as a temporary dominant, pulling strongly into ${a.name}.`,move:h,degrees:m,bars:u,fromBar:c,toBar:p,fromChord:r.name,toChord:a.name})}return e}function Rs(t){if(!t||t.length<2)return[];const e=[];for(let o=0;o<t.length;o++){const i=o,s=(o+1)%t.length,n=t[i],r=t[s],a=new Set(n.notes.map(b=>U[b]??0)),l=r.notes.filter(b=>a.has(U[b]??-1)),d=U[bi(n.name)]??0,c=U[bi(r.name)]??0,p=Math.min((c-d+12)%12,(d-c+12)%12);let u="Harmonic Shift";l.length>=2?u=`Strong Common Tones (${l.length} shared)`:p<=2?u="Stepwise Bass Motion":(p===5||p===7)&&(u="4th / 5th Cycle Jump");const h=`Bar ${i+1} → ${s+1}`,m=`${n.name} → ${r.name}`,f=l.length?`${l.join(" · ")} held over`:p<=2?"Bass steps by a tone":"No shared notes";e.push({fromBar:i+1,toBar:s+1,fromChord:n.name,toChord:r.name,move:h,chords:m,link:f,hasShared:l.length>0,commonNotes:l,semitoneDistance:p,motionType:u})}return e}function yi(t,e=4){const o=Array.isArray(t)?t.filter(p=>typeof p=="string"&&p.trim().length>0):[];if(o.length===0)return[];const i={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},s=o.map(p=>p.replace(/\d+$/,"")),n=s[0],r=i[n]??0;let a=e,l=r;const d=[];return s.forEach((p,u)=>{const h=i[p]??0;u>0&&h<=l&&a++,d.push(`${p}${a}`),l=h}),[`${n}${e-1}`,...d]}class xr{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set,this.abOverride=null,this.subBassEnabled=!1,this.barsPerChord=1,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.melodyTrack=null,this.stepLoop=null,this.stepPos=-1,this.playTarget="chords",this.melodyBackingEnabled=!0,this.melodySound="Stage Rhodes",this.melodyFeel=null,this.melodyFeelSettings={swing:0,spread:50,density:50,tone:"Warm"}}setPlayTarget(e){this.playTarget=e}getPlayTarget(){return this.playTarget}isChordPlaying(){return this.playing&&this.playTarget==="chords"}isMelodyPlaying(){return this.playing&&this.playTarget==="melody"}isSongPlaying(){return this.playing&&(this.playTarget==="song"||this.mode==="song")}setMelodyBackingEnabled(e){this.melodyBackingEnabled=e}isMelodyBackingEnabled(){return this.melodyBackingEnabled}setMelodySound(e){this.melodySound=e||"Stage Rhodes",this.melodySound&&Tn(this.melodySound)}getMelodySound(){return this.melodySound}setMelodyFeel(e){this.melodyFeel=e}getMelodyFeel(){return this.melodyFeel}setMelodyFeelSettings(e){this.melodyFeelSettings={...this.melodyFeelSettings,...e}}getMelodyFeelSettings(){return{...this.melodyFeelSettings}}setStepLoop(e){const o=e&&e[1]>e[0]?[e[0],e[1]]:null;o===this.stepLoop||o&&this.stepLoop&&o[0]===this.stepLoop[0]&&o[1]===this.stepLoop[1]||(this.stepLoop=o,o||(this.stepPos=-1),this.playing&&this.playTarget==="melody"&&this.startAutoplay())}getStepLoop(){return this.stepLoop?[this.stepLoop[0],this.stepLoop[1]]:null}getStepPos(){return this.stepPos}isStepLooping(){return this.playTarget==="melody"&&!!this.progression}getSixteenthMs(){return 6e4/Math.max(40,Math.min(240,this.progression?.bpm||84))/4}stepTick(){if(!this.progression)return;const e=this.progression.chords.length||4,[o,i]=this.stepLoop&&this.stepLoop[1]>this.stepLoop[0]?this.stepLoop:[0,e*16];let s=this.stepPos+1;(s<o||s>=i)&&(s=o),this.stepPos=s;const n=this.getSixteenthMs()/1e3,r=Math.floor(s/16),a=this.progression.chords.length;if(a>0){const l=r%a,d=this.order.indexOf(l);if(this.activeIndex=d>=0?d:l,this.progressStep=this.activeIndex,this.melodyBackingEnabled&&(s%16===0||s===o)){const c=this.progression.chords[l];if(c){let p=Array.isArray(c.notes)?c.notes:[];(p.length===0||!p.every(h=>typeof h=="string"&&h.trim().length>0))&&(p=V(c.name||"CMAJ",j(this.progression.key||"C",this.progression.scaleType||"MAJOR")));const u=Math.max(.05,(Math.min(i,(r+1)*16)-s)*n);this.playChordNotes(p,u,c.voicing,void 0,l),this.subBassEnabled&&p.length>0&&_i(p[0],u)}}if(this.melodyTrack&&!this.melodyTrack.muted){const c=s%16,p=this.melodyTrack.notes.find(u=>u.barIndex===r&&u.stepInBar===c);if(p){const u=Math.max(1,Math.round((p.durationBeats||.25)*4)),h=typeof p.velocity=="number"?Math.max(.05,Math.min(1,p.velocity/127)):.85;nt(p.pitch,u*n*.92,void 0,h,this.melodySound||void 0)}}}this.notifyTick()}setMelodyTrack(e){this.melodyTrack=e,e&&(e.presetId&&Mn(e.presetId),typeof e.volume=="number"&&Nn(e.volume),An(e.muted),On(e.solo))}getMelodyTrack(){return this.melodyTrack}setSubBassEnabled(e){this.subBassEnabled=e}isSubBassEnabled(){return this.subBassEnabled}setProgression(e,o){this.mode="single",this.progression=e,e?(o&&o.length===e.chords.length&&o.every(i=>i<e.chords.length)?this.order=o:this.order=Array.from({length:e.chords.length},(i,s)=>s),this.order.length>0&&(this.activeIndex>=this.order.length&&(this.activeIndex=this.activeIndex%this.order.length),this.progressStep>=this.order.length&&(this.progressStep=this.progressStep%this.order.length))):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,o)=>e+o.order.length,0):this.order.length}setOrder(e,o){this.order=e,typeof o=="number"&&(this.activeIndex=o)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}setBpm(e){const o=Math.max(40,Math.min(240,e));this.progression&&(this.progression.bpm=o),this.playing&&this.startAutoplay()}setBarsPerChord(e){this.barsPerChord=Math.max(1,e),this.playing&&this.startAutoplay()}getBarsPerChord(){return this.barsPerChord}setFeelSettings(e){this.feelSettings={...this.feelSettings,...e}}getFeelSettings(){return{...this.feelSettings}}getStepIntervalMs(){const e=this.mode==="song"?this.sections[this.activeSectionIndex]?.progression.bpm||this.progression?.bpm||84:this.progression?.bpm||84,o=Math.max(40,Math.min(240,e)),i=Math.max(1,this.barsPerChord);return Math.round(i*(24e4/o))}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"||this.playTarget==="song"?this.tickCallbacks.forEach(o=>o(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.playTarget==="melody"?this.tickCallbacks.forEach(o=>o(this.activeIndex,this.progressStep,0,e,!1,this.stepPos)):this.tickCallbacks.forEach(o=>o(this.activeIndex,this.progressStep,0,e,!1,-1))}updateSongStepState(e){let o=0;for(let i=0;i<this.sections.length;i++){const s=this.sections[i].order.length;if(e<o+s){this.activeSectionIndex=i;const n=e-o;this.activeIndex=this.sections[i].order[n]??0,this.progressStep=n;return}o+=s}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){if(this.stopAutoplay(),this.playTarget==="melody"){this.autoplayTimer=setInterval(()=>{this.playing&&this.playTarget==="melody"&&this.stepTick()},this.getSixteenthMs());return}const e=this.getStepIntervalMs();this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"||this.playTarget==="song"){const o=this.getTotalSteps();if(o<=0)return;this.songStep=(this.songStep+1)%o,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},e)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(e){const o=e||(this.mode==="song"?"song":this.playTarget);if(this.playing){if(o===this.playTarget)return this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1,this.stopAutoplay(),this.notifyTick(),!1;this.stopAutoplay(),this.playTarget=o,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1}else this.playing=!0,this.playTarget=o,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stepPos=-1;if(this.playTarget==="song")this.mode="song",this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick();else if(this.playTarget==="melody"){this.mode="single";const[i]=this.stepLoop&&this.stepLoop[1]>this.stepLoop[0]?this.stepLoop:[0,(this.progression?.chords.length||4)*16];this.stepPos=i-1,this.startAutoplay(),this.stepTick()}else this.mode="single",this.startAutoplay(),this.playActiveChord(),this.notifyTick();return this.playing}setABOverride(e,o,i="before"){e==null?this.abOverride=null:typeof e=="object"?this.abOverride=e:this.abOverride={index:e,chord:o||null,side:i}}clearABOverride(){this.abOverride=null}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const o=this.activeIndex,i=e.progression.chords[o];if(i){const s=i.notes&&i.notes.length>0?i.notes:V(i.name,j(e.progression.key,e.progression.scaleType)),n=yi(s,4),r=o!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[o]?{...this.feelSettings,...this.feelSettings.barFeel[o]}:this.feelSettings;if(Ui(n,e.progression.genre,{bpm:e.progression.bpm,duration:this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:r?.playStyle??this.playStyle??void 0,feelSettings:r}),this.melodyTrack&&!this.melodyTrack.muted&&e.progression){const a=this.melodyTrack.notes.filter(l=>l.barIndex===o);if(a.length>0){const d=60/(e.progression.bpm||84);a.forEach(c=>{const p=c.stepInBar/4*d,u=(c.durationBeats||.25)*d,h=typeof c.velocity=="number"?Math.max(.05,Math.min(1,c.velocity/127)):.85;setTimeout(()=>{this.playing&&this.mode==="song"&&nt(c.pitch,u,void 0,h,this.melodySound||void 0)},Math.round(p*1e3))})}}}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0;let o=this.progression.chords[e];if(this.abOverride&&this.abOverride.index===e&&this.abOverride.side==="after"&&this.abOverride.chord&&(o=this.abOverride.chord),o){let i=Array.isArray(o.notes)?o.notes:[];if(i.length===0||!i.every(s=>typeof s=="string"&&s.trim().length>0)){const s=o.name||"CMAJ",n=this.progression.key||"C",r=this.progression.scaleType||"MAJOR";i=V(s,j(n,r))}o.voicing?this.playChordNotes(i,1.2,o.voicing):this.playChordNotes(i,1.2),this.subBassEnabled&&i.length>0&&_i(i[0],1.4)}}}auditionChord(e,o=.8){if(!e)return;let i=Array.isArray(e.notes)?e.notes:[];if(i.length===0||!i.every(s=>typeof s=="string"&&s.trim().length>0)){const s=e.name||"CMAJ",n=this.progression?.key||"C",r=this.progression?.scaleType||"MAJOR";i=V(s,j(n,r))}e.voicing?this.playChordNotes(i,o,e.voicing):this.playChordNotes(i,o)}playChordAtIndex(e,o=.8,i,s){if(!this.progression||!this.progression.chords[e])return;const n=this.progression.chords[e];let r=Array.isArray(n.notes)?n.notes:[];if(r.length===0||!r.every(l=>typeof l=="string"&&l.trim().length>0)){const l=n.name||"CMAJ",d=this.progression.key||"C",c=this.progression.scaleType||"MAJOR";r=V(l,j(d,c))}const a=i||n.voicing;a!==void 0?this.playChordNotes(r,o,a,s):this.playChordNotes(r,o)}playChordNotes(e,o,i,s,n){if(!this.progression)return;const r=Array.isArray(e)?e.filter(c=>typeof c=="string"&&c.trim().length>0):[];if(r.length===0)return;const a=i?En(r,i):yi(r,4),l=n!==void 0?n:this.playing?this.order[this.activeIndex]??0:void 0,d=l!==void 0&&this.feelSettings?.barFeel&&this.feelSettings.barFeel[l]?{...this.feelSettings,...this.feelSettings.barFeel[l]}:this.feelSettings;Ui(a,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:o||this.getStepIntervalMs()/1e3*.85,instrument:this.instrument??void 0,playStyle:d?.playStyle??this.playStyle??void 0,velocity:s,feelSettings:d})}jumpToStep(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playActiveChord(),this.notifyTick())}playFromBar(e){!this.progression||this.order.length<=0||(this.activeIndex=e%this.order.length,this.progressStep=e%this.order.length,this.playing=!0,this.startAutoplay(),this.playActiveChord(),this.notifyTick())}reset(){this.stopAutoplay(),this.playing=!1,this.stepPos=-1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const v=new xr,wr=Ze.map(t=>t.name),kr=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function Sr(t,e){const o=t.length+1,i=e.length+1,s=Array.from({length:o},()=>new Array(i).fill(0));for(let n=0;n<o;n++)s[n][0]=n;for(let n=0;n<i;n++)s[0][n]=n;for(let n=1;n<o;n++)for(let r=1;r<i;r++)s[n][r]=t[n-1]===e[r-1]?s[n-1][r-1]:1+Math.min(s[n-1][r-1],s[n-1][r],s[n][r-1]);return s[o-1][i-1]}function ct(t,e){if(typeof t!="string")return null;const o=t.trim();if(!o)return null;const i=o.toLowerCase(),s=e.find(l=>l.toLowerCase()===i);if(s)return s;let n=null,r=1/0;for(const l of e){const d=Sr(i,l.toLowerCase());d<r&&(r=d,n=l)}const a=Math.max(2,Math.floor(i.length*.4));return r<=a?n:null}function Cr(t){if(!Array.isArray(t))return;const e=[];for(const o of t){if(!o||typeof o!="object")continue;const i=o,s=ct(i.root,St),n=ct(i.quality,Rn);s&&n&&e.push({root:s,quality:n})}if(e.length)return e.slice(0,Et)}function Ir(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,o=ct(e.presetId,kr)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!o)return;const i=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:o,customConfig:i}}function oi(t,e){const o=t&&typeof t=="object"?t:{},i=ct(o.genre,$s)??e.genre,s=ct(o.mood,wr)??e.mood,n=ct(o.key,St)??void 0,r=ct(o.scaleType,Ln)??void 0,a=n&&r?Cr(o.chords):void 0;let l;typeof o.length=="number"&&Number.isFinite(o.length)&&(l=Math.max(_t,Math.min(Et,Math.round(o.length))));const d=typeof o.rhythmStyle=="string"&&o.rhythmStyle.trim()?o.rhythmStyle.trim():void 0,c=Ir(o.instrumentConfig),p=o._rateLimit&&typeof o._rateLimit=="object"?o._rateLimit:void 0;return{genre:i,mood:s,key:n,scaleType:r,length:l,chords:a,rhythmStyle:d,instrumentConfig:c,_rateLimit:p}}const $r=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],Er="chroma-chords-llm-provider",Tr="chroma-chords-llm-model";function Mr(){const t=localStorage.getItem(Er);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function Nr(){const t=localStorage.getItem(Tr);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:$r[0].id}const ii={genre:$s[0],mood:Ze[0].name},Ar="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Or=12e3,Ls={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},zs={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Io(t,e){const o=t.toLowerCase();let i=null,s=0;return Object.keys(e).forEach(n=>{const r=e[n].reduce((a,l)=>a+(o.includes(l)?1:0),0);r>s&&(s=r,i=n)}),i}function Fr(t){const e=Io(t,zs),o=Io(t,Ls);return!e||!o?null:{genre:e,mood:o}}async function Br(t){const e=new AbortController,o=setTimeout(()=>e.abort(),Or);try{const s=await fetch(Ar,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,provider:Mr(),model:Nr()}),signal:e.signal}),n=await s.json().catch(()=>null);if(!s.ok||n&&typeof n=="object"&&"error"in n){const r=n&&typeof n=="object"&&"error"in n?String(n.error):`HTTP ${s.status}`,a=new Error(`Classifier request failed: ${r}`);throw n&&typeof n=="object"&&"_rateLimit"in n&&(a._rateLimit=n._rateLimit),a}return n}finally{clearTimeout(o)}}async function Dr(t){const e=t.trim(),o=e.toLowerCase();if(o.startsWith("mock")||o.startsWith("test")){const s=e.replace(/^(mock|test)\s*:?\s*/i,"").trim(),n=Io(s,zs)??"Synthwave",r=Io(s,Ls)??"Dreamy",a={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},l={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},d={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},c=d[n]||d._default,p=a[n]||"rhodes",u=l[n]||"slow_arpeggio",h={genre:n,mood:r,key:c.key,scaleType:c.scaleType,length:8,chords:c.chords,rhythmStyle:u,instrumentConfig:{presetId:p,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return oi(h,{genre:n,mood:r})}const i=Fr(t);try{const s=await Br(t);return oi(s,i??ii)}catch(s){console.warn("LLM classification failed, falling back to keyword heuristic:",s);const n=oi(i??ii,ii);return s&&typeof s=="object"&&"_rateLimit"in s&&(n._rateLimit=s._rateLimit),n}}class Pr{static async resolvePrompt(e,o,i,s,n,r){let a=r||null,l=null,d=null;if(!a&&n&&n.trim().length>0)try{a=await Dr(n)}catch(u){console.warn("Failed to classify prompt via LLM/local fallback:",u)}const c=!!(a&&a.chords?.length&&a.key&&a.scaleType);let p=null;return c&&a&&a.chords&&a.key&&a.scaleType&&(p=fi(e,a.key,a.scaleType,a.chords,a.genre||o,a.mood||i)),p||(p=ko(e,o,i,{length:s})),c&&a&&(a.instrumentConfig?.presetId&&(l=hi(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(d=ui(a.rhythmStyle)??null)),p.chords.length>s&&(p={...p,chords:p.chords.slice(0,s)}),n&&(p={...p,searchTerm:n}),{progression:p,instrument:l,playStyle:d,normalizedSuggestion:a}}}const ot=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,o)=>o)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,o)=>(o+Math.ceil(t/2))%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,o)=>t-1-o)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,o)=>(o-1+t)%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,o)=>(o+1)%t)}];class se{static createInitialSong(e,o){const i=o||Array.from({length:e.chords.length},(s,n)=>n);return[{name:ot[0].name,desc:ot[0].desc,progression:e,order:i.slice()}]}static generateSectionProgression(e,o,i,s){const n=e.key,r=e.scaleType||"MAJOR",a=e.genre||"Pop",l=e.mood||"Uplifting",d=e.bpm||120,c=j(n,r),p=`${n}_${r}`,u=e.chords.length||4;let h=s&&s>=2&&s<=8?s:u;o==="Pre-chorus"&&!s&&u>4&&(h=4);const m=i?.scales?i.scales[p]:void 0;let f=[];return m&&Object.keys(m.degrees).length>0?f=this.walkSectionMarkov(m,p,o,a,l,c,h,e,i):f=this.fallbackSectionChords(e,o,h,c),o==="Chorus"&&this.areChordSequencesIdentical(e.chords,f)&&(f=this.shiftChorusVariation(f,m,p,c)),{genre:a,mood:l,key:n,scaleType:r,bpm:d,chords:f}}static walkSectionMarkov(e,o,i,s,n,r,a,l,d){const c=Object.keys(e.degrees),p=this.pickSectionStartDegree(i,e,s,n),u=[p];let h=p;for(let f=1;f<a;f++){const b=f===a-1,y=c.filter(C=>e.degrees[C]&&C!==h),x=y.length?y:c;if(b){const C=we(x,I=>{let S=Xe(h,I,e.type,s,n);return i==="Outro"&&I==="TONIC"?S*=8:i==="Pre-chorus"&&(I==="DOMINANT"||I==="SUBDOMINANT")?S*=6:i==="Chorus"&&(I==="TONIC"||I==="SUBDOMINANT"||I==="DOMINANT")&&(S*=2.5),Math.max(.01,S)});u.push(C)}else{const C=x.filter(A=>!u.includes(A)),I=C.length?C:x,S=we(I,A=>{let F=Xe(h,A,e.type,s,n);return F*=this.getSectionTransitionMultiplier(i,h,A),Math.max(.01,F)});h=S,u.push(S)}}const m=u.map(f=>He(o,f,e,r));if(i==="Bridge"&&m.length>=3&&d)try{const f=Co(d,l,1);if(f&&f.length>0){const b=f.find(y=>y.roman.includes("VI")||y.roman.includes("VII")||y.roman==="iv")||f[0];if(b&&b.chord){const y=Math.min(m.length-2,1);m[y]={...b.chord,desc:b.sub||"Shadow chord borrowed for the bridge detour."}}}}catch{}return m}static pickSectionStartDegree(e,o,i,s){const n=Object.keys(o.degrees),r=a=>!!o.degrees[a];if(e==="Chorus"){const a={SUBDOMINANT:3.5,SUBMEDIANT:3,SUPERTONIC:1.2,TONIC:.5,MEDIANT:.8,DOMINANT:.6};return we(n,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Bridge"){const a={SUBMEDIANT:3.5,MEDIANT:2.5,SUBDOMINANT:2.2,SUPERTONIC:1.5,TONIC:.2};return we(n,l=>(a[l]||.5)*(r(l)?1:.01))}if(e==="Pre-chorus"){const a={SUPERTONIC:3.2,SUBDOMINANT:2.8,SUBMEDIANT:2,TONIC:.3};return we(n,l=>(a[l]||.4)*(r(l)?1:.01))}if(e==="Outro"){const a={SUBDOMINANT:2.5,SUBMEDIANT:2,TONIC:2.5};return we(n,l=>(a[l]||.5)*(r(l)?1:.01))}return we(n,a=>Es(a,o.type,i,s))}static getSectionTransitionMultiplier(e,o,i){if(e==="Chorus"){if(o==="SUBDOMINANT"&&(i==="DOMINANT"||i==="TONIC"))return 2.2;if(o==="SUBMEDIANT"&&(i==="SUBDOMINANT"||i==="DOMINANT"))return 2;if(o==="DOMINANT"&&(i==="TONIC"||i==="SUBMEDIANT")||o==="TONIC"&&(i==="SUBDOMINANT"||i==="DOMINANT"))return 1.8}else if(e==="Pre-chorus"){if(o==="SUPERTONIC"&&(i==="SUBDOMINANT"||i==="DOMINANT"))return 2.8;if(o==="SUBMEDIANT"&&i==="SUPERTONIC")return 2.2;if(o==="SUBDOMINANT"&&i==="DOMINANT")return 3.2}else if(e==="Bridge"){if(o==="SUBMEDIANT"&&i==="MEDIANT")return 2;if(o==="MEDIANT"&&i==="SUBDOMINANT")return 2.2;if(o==="SUBDOMINANT"&&i==="DOMINANT")return 2}else if(e==="Outro"){if(o==="SUBDOMINANT"&&i==="TONIC")return 2.8;if(o==="SUBMEDIANT"&&i==="SUBDOMINANT")return 2}return 1}static fallbackSectionChords(e,o,i,s){const n=e.chords,r=U[e.key]??0,a=(e.scaleType||"").includes("MINOR");let l=[];if(o==="Chorus")n.length>=4?l=[n[1],n[2],n[3]||n[0],n[0]]:l=[...n].reverse();else if(o==="Bridge"){const c=a?J(z(r+5,s),"Major","None","IV","Major subdominant","the Dorian lift, sunny and open",.35,s):J(z(r+8,!0),"Major","None","♭VI","Flat submediant","cinematic shadow detour",.48,!0);n.length>=4?l=[n[3]||n[1],c,n[1]||n[2],n[2]||n[0]]:l=[c,...n]}else o==="Pre-chorus"?n.length>=4?l=[n[1],n[2],n[1],n[2]]:l=n:o==="Outro"?n.length>=4?l=[n[1],n[3]||n[1],n[1],n[0]]:l=n:l=(ot.find(u=>u.name===o)||ot[1]).reorder(n.length).map(u=>n[u%n.length]);const d=[];for(let c=0;c<i;c++)d.push(l[c%l.length]);return d}static areChordSequencesIdentical(e,o){return e.length!==o.length?!1:e.every((i,s)=>i.name===o[s]?.name)}static shiftChorusVariation(e,o,i,s=!0,n){const r=n||e.length;if(!o||!i)return e;const a=o.degrees.SUBDOMINANT?He(i,"SUBDOMINANT",o,s):null,l=o.degrees.DOMINANT?He(i,"DOMINANT",o,s):null,d=o.degrees.SUBMEDIANT?He(i,"SUBMEDIANT",o,s):null,c=o.degrees.TONIC?He(i,"TONIC",o,s):null;if(a&&l&&d&&c){const p=[a,l,d,c],u=[];for(let h=0;h<r;h++)u.push(p[h%p.length]);return u}return e}static addSection(e,o,i,s){if(e.length>=ot.length)return{sections:e,activeIndex:e.length-1};const n=ot[e.length],r=this.generateSectionProgression(o,n.name,i,s),a=Array.from({length:r.chords.length},(c,p)=>p),l={name:n.name,desc:n.desc,progression:r,order:a},d=[...e,l];return{sections:d,activeIndex:d.length-1}}static removeSection(e,o){if(e.length<=1||o<0||o>=e.length)return{sections:e,activeIndex:0};const i=e.filter((n,r)=>r!==o),s=Math.min(o,i.length-1);return{sections:i,activeIndex:Math.max(0,s)}}static syncActiveSection(e,o,i,s){if(!e[o])return e;const n=[...e];return n[o]={...n[o],progression:i,order:s.slice()},n}static createDefaultTimeline(e){return e.map((o,i)=>({id:`timeline-${i}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:i,repeats:1}))}static expandTimeline(e,o){const i=[];for(const s of o){const n=e[s.sectionIndex];if(n)for(let r=0;r<Math.max(1,s.repeats);r++)i.push(n)}return i.length>0?i:e}static reorderTimeline(e,o,i){if(o<0||o>=e.length||i<0||i>=e.length||o===i)return e;const s=[...e],[n]=s.splice(o,1);return s.splice(i,0,n),s}static updateTimelineRepeat(e,o,i){return o<0||o>=e.length?e:e.map((s,n)=>{if(n!==o)return s;const r=Math.min(8,Math.max(1,s.repeats+i));return{...s,repeats:r}})}static addTimelineItem(e,o){const i={id:`timeline-${o}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,sectionIndex:o,repeats:1};return[...e,i]}static removeTimelineItem(e,o){return e.length<=1||o<0||o>=e.length?e:e.filter((i,s)=>s!==o)}}function ue(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},o=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!o)return 60;const i=o[1].charAt(0).toUpperCase()+o[1].slice(1),s=e[i]??0,n=o[2]!==void 0?parseInt(o[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+s))}function js(t,e,o,i=1,s){const n=e&&e.length>0?e.map(x=>t.chords[x]).filter(x=>!!x):t.chords,r=t.bpm||120,a=i*240/r,l=o?Ut.find(x=>x.name.toLowerCase()===o.toLowerCase()):void 0,d=Ii[t.genre]||{},c=l?.patch??{},p={...d,...c,...s?.humanState??{}},u=d.duration??.9,h=c.durationMultiplier?u*c.durationMultiplier:u,m=s?.humanState?.strum!==void 0?s.humanState.strum/100*1.5:s?.spread!==void 0?s.spread/100*1.5:d.spread??.3,f=s?.humanState?.swing!==void 0?s.humanState.swing:s?.swing??0,b=s?.density??50,y=[];return n.forEach((x,C)=>{const I=f/100*.04*(C%2===1?1:0),S=C*a+I,A=x.notes&&x.notes.length>0?x.notes:["C","E","G"];let F=yi(A,4);if(F=ks(F,b),p.arpMode&&p.arpMode!=="off"){const $=p.arpRate??"1/16",T=p.arpRange??1,P=p.arpMode,_=ys($,r),R=xs(F,T),O=ws(R,P),E=p.duration?p.duration:Math.max(.6,h);O.forEach((G,oe)=>{const Ie=S+oe*_;y.push({note:G,midi:ue(G),startTime:Ie,duration:E})})}else{const $=s?.humanState?.instrument||void 0,T=$?_e($):void 0,P=T?Oe.find(O=>O.name.toLowerCase()===T.toLowerCase())?.instrument??"piano":Mo[t.genre]??"piano",_=P==="guitar"||P==="jazz-guitar",R=P==="jazz-guitar";F.forEach((O,E)=>{const oe=(_?E*(R?.018:.024):0)+E*m*.1,Ie=S+oe;y.push({note:O,midi:ue(O),startTime:Ie,duration:_?Math.max(h,1.2):h})})}}),y}function Rr(t){const e=[];let o=Math.max(0,Math.floor(t));for(e.push(o&127);(o>>=7)>0;)e.unshift(o&127|128);return e}function si(t,e,o,i,s=480){const n=[];if(i){const u=Math.round(6e7/i);n.push(0),n.push(255,81,3),n.push(u>>16&255,u>>8&255,u&255)}n.push(0),n.push(255,3,t.length);for(let u=0;u<t.length;u++)n.push(t.charCodeAt(u));const r=Math.max(0,Math.min(15,o)),a=144|r,l=128|r;let d=0;e.forEach(u=>{const h=Math.max(0,u.tick-d);d=u.tick,n.push(...Rr(h)),u.type==="on"?n.push(a,u.midi,u.velocity??80):n.push(l,u.midi,0)}),n.push(0),n.push(255,47,0);const c=n.length;return[...[77,84,114,107,c>>24&255,c>>16&255,c>>8&255,c&255],...n]}function Lr(t,e,o=480){const i=t.length,n=[77,84,104,100,0,0,0,6,0,e&&i>1?1:0,i>>8&255,i&255,o>>8&255,o&255],r=n.length+t.reduce((d,c)=>d+c.length,0),a=new Uint8Array(r);a.set(n,0);let l=n.length;for(const d of t)a.set(d,l),l+=d.length;return a}function zr(t,e,o=480,i){const s=[];if(!t||!t.notes||t.notes.length===0)return s;const n=t.notes.reduce((r,a)=>Math.max(r,a.barIndex),0);for(let r=0;r<=n;r++){const a=t.notes.filter(c=>c.barIndex===r);if(!a.length)continue;const l=r*i;ve.applyHumanFeel(a,t.feelSettings,e).forEach(c=>{const p=l+c.time,u=Math.round(p/(60/e)*o),h=Math.max(1,Math.round(c.duration/(60/e)*o)),m=ue(c.note);s.push({tick:u,type:"on",midi:m,velocity:c.velocity}),s.push({tick:u+h,type:"off",midi:m})})}return s.sort((r,a)=>r.tick!==a.tick?r.tick-a.tick:r.type!==a.type?r.type==="off"?-1:1:r.midi-a.midi),s}function jr(t,e,o={}){const{target:i=e&&e.notes?.length?"both":"chords",order:s,playStyleName:n,barsPerChord:r=1,feelSettings:a}=o,l=t.bpm||120,d=480,c=r*240/l,p=[],u=i==="chords"||i==="both",h=(i==="melody"||i==="both")&&e&&e.notes?.length;if(u){const m=js(t,s,n,r,a),f=[];m.forEach(b=>{const y=Math.round(b.startTime/(60/l)*d),x=Math.max(1,Math.round(b.duration/(60/l)*d));f.push({tick:y,type:"on",midi:b.midi,velocity:80}),f.push({tick:y+x,type:"off",midi:b.midi})}),f.sort((b,y)=>b.tick!==y.tick?b.tick-y.tick:b.type!==y.type?b.type==="off"?-1:1:b.midi-y.midi),p.push(si("Chords",f,0,l,d))}if(h&&e){const m=zr(e,l,d,c);p.push(si("Melody",m,1,u?void 0:l,d))}return p.length===0&&p.push(si("Chroma Chords",[],0,l,d)),Lr(p,i==="both")}function Ur(t,e,o={}){const i=jr(t,e,o),s=new Blob([i],{type:"audio/midi"}),n=(t.key||"C").toLowerCase(),r=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),a=t.bpm||120,d=`chroma-${o.target||(e&&e.notes?.length?"both":"chords")}-${n}-${r}-${a}bpm.mid`;Fi(s,d)}function _r(t,e,o="Warm",i){const s=new ls({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),n=gn(o,s),r=t?_e(t):void 0;switch((r?Oe.find(d=>d.name.toLowerCase()===r.toLowerCase()):void 0)?.instrument??(e?Mo[e]:void 0)??"piano"){case"bell":{const d=new xt({high:3.5,mid:-.5,low:-2,highFrequency:4800}).connect(n),c=new Je({decay:3.2,wet:.32}).connect(d);return new ae(di,{harmonicity:3.5,modulationIndex:12,envelope:{attack:.002,decay:1.2,sustain:.04,release:1.4},modulationEnvelope:{attack:.002,decay:.6,sustain:.01,release:.5},volume:-12}).connect(c)}case"organ":{const d=new Le({frequency:4500,type:"lowpass",rolloff:-12}).connect(n),c=new We({distortion:.08,wet:.15}).connect(d),p=new wt({frequency:5.8,depth:.12,wet:.55}).connect(c);return new ae(De,{oscillator:{type:"fatsine",count:3,spread:15},envelope:{attack:.008,decay:.15,sustain:.9,release:.25},volume:-12}).connect(p)}case"pad-strings":{const d=new Je({decay:5.5,preDelay:.03,wet:.45}).connect(n),c=new Ke({frequency:.45,delayTime:4,depth:.5,wet:.4}).start(0).connect(d);return new ae(De,{oscillator:{type:"fatsawtooth",count:3,spread:22},envelope:{attack:.65,decay:.8,sustain:.85,release:2.5},volume:-13}).connect(c)}case"juno-pad":{const d=new Ke({frequency:.85,delayTime:3.5,depth:.72,wet:.55}).start(0).connect(n);return new ae(vt,{oscillator:{type:"fatsawtooth",count:3,spread:20},envelope:{attack:.02,decay:.45,sustain:.65,release:.85},filterEnvelope:{attack:.02,decay:.5,sustain:.35,release:.8,baseFrequency:750,octaves:3.2,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.5},volume:-12}).connect(d)}case"stab":{const d=new We({distortion:.1,wet:.12}).connect(n),c=new Je({decay:1,wet:.22}).connect(d);return new ae(vt,{oscillator:{type:"fatsawtooth",count:2,spread:12},envelope:{attack:.003,decay:.16,sustain:.08,release:.18},filterEnvelope:{attack:.003,decay:.14,sustain:.05,release:.16,baseFrequency:420,octaves:3.5,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2},volume:-10}).connect(c)}case"jazz-guitar":{const d=new xt({low:-1,mid:2,high:-3.5,lowFrequency:480,highFrequency:2800}).connect(n),c=new Le({frequency:2800,type:"lowpass",rolloff:-12}).connect(d),p=new Je({decay:1.8,preDelay:.02,wet:.18}).connect(c);return i&&Object.keys(i).length>0?new Ye({urls:i,volume:-8}).connect(p):new ae(De,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.7,sustain:.08,release:.9},volume:-8}).connect(p)}case"sh101":{const d=new Ke({frequency:.25,delayTime:4.2,depth:.6,wet:.35}).start(0).connect(n),c=new Le({frequency:3400,type:"lowpass",rolloff:-12}).connect(d),p=new We({distortion:.12,wet:.18}).connect(c),u=new wt({frequency:.45,depth:.18,wet:.65}).connect(p);return new ae(vt,{oscillator:{type:"fatsawtooth",count:2,spread:14},envelope:{attack:.03,decay:.6,sustain:.75,release:1.4},filterEnvelope:{attack:.04,decay:.8,sustain:.4,release:1.2,baseFrequency:450,octaves:2.6,exponent:2},filter:{type:"lowpass",rolloff:-24,Q:2.8},volume:-11}).connect(u)}case"guitar":return i&&Object.keys(i).length>0?new Ye({urls:i,volume:-8}).connect(n):new ae(De,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.6,sustain:.05,release:.8},volume:-8}).connect(n);case"rhodes":case"epiano":return i&&Object.keys(i).length>0?new Ye({urls:i,volume:-10}).connect(n):new ae(di,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-10}).connect(n);default:return i&&Object.keys(i).length>0?new Ye({urls:i,volume:-9}).connect(n):new ae(De,{oscillator:{type:"triangle"},envelope:{attack:.005,decay:.8,sustain:.15,release:1},volume:-9}).connect(n)}}function Us(t){const e=t.numberOfChannels,o=t.sampleRate,i=16,s=i/8,n=e*s,r=t.length*e*s,a=new ArrayBuffer(44+r),l=new DataView(a),d=(u,h)=>{for(let m=0;m<h.length;m++)l.setUint8(u+m,h.charCodeAt(m))};d(0,"RIFF"),l.setUint32(4,36+r,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,e,!0),l.setUint32(24,o,!0),l.setUint32(28,o*n,!0),l.setUint16(32,n,!0),l.setUint16(34,i,!0),d(36,"data"),l.setUint32(40,r,!0);const c=[];for(let u=0;u<e;u++)c.push(t.getChannelData(u));let p=44;for(let u=0;u<t.length;u++)for(let h=0;h<e;h++){const m=Math.max(-1,Math.min(1,c[h][u])),f=m<0?m*32768:m*32767;l.setInt16(p,f,!0),p+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function Gr(t,e,o,i,s=1,n){const r=js(t,e,i,s,n);if(!r.length)return;const a=e&&e.length>0?e.map(S=>t.chords[S]).filter(S=>!!S):t.chords,l=t.bpm||120,d=s*240/l,c=Math.max(.1,a.length*d),p=o?_e(o):void 0,h=(p?Oe.find(S=>S.name.toLowerCase()===p.toLowerCase()):void 0)?.instrument??(t.genre?Mo[t.genre]:void 0)??"piano";await wn(h);const m=xn(h),f=n?.tone||"Warm",b=await cs(async()=>{const S=_r(p||o,t.genre,f,m);r.forEach(A=>{A.startTime<c&&S.triggerAttackRelease(A.note,A.duration,A.startTime)})},c),y=Us(b.get()),x=(t.key||"C").toLowerCase(),C=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),I=`chroma-chords-${x}-${C}-${l}bpm.wav`;Fi(y,I)}async function Vr(t,e,o,i={}){const{order:s,instrumentName:n,playStyleName:r,barsPerChord:a=1,feelSettings:l}=i,d=e.bpm||120,c=(e.key||"C").toLowerCase(),p=(e.mood||"progression").toLowerCase().replace(/\s+/g,"-");if((t==="chords"||t==="both")&&await Gr(e,s,n,r,a,l),(t==="melody"||t==="both")&&o&&o.notes?.length){const u=s&&s.length>0?s.map(x=>e.chords[x]).filter(x=>!!x):e.chords,h=a*240/d,m=Math.max(.1,u.length*h),f=await cs(async()=>{const x=new ae(De,{oscillator:{type:"sine"},envelope:{attack:.01,decay:.15,sustain:.6,release:.2}}).toDestination(),C=o.notes.reduce((I,S)=>Math.max(I,S.barIndex),0);for(let I=0;I<=C;I++){const S=o.notes.filter($=>$.barIndex===I);if(!S.length)continue;const A=I*h;ve.applyHumanFeel(S,o.feelSettings,d).forEach($=>{const T=A+$.time;T<m&&x.triggerAttackRelease($.note,$.duration,T,$.velocity/127)})}},m),b=Us(f.get()),y=`chroma-melody-${c}-${p}-${d}bpm.wav`;Fi(b,y)}}function Fi(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const o=URL.createObjectURL(t);if(typeof document>"u")return;const i=document.createElement("a");i.href=o,i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(o),1e3)}const ni={Pop:{humanVariance:.15,swing:0,velocityDrift:.25,gateRatio:.85,glide:0},Rock:{humanVariance:.35,swing:10,velocityDrift:.45,gateRatio:.9,glide:.02},"Lo-Fi":{humanVariance:.65,swing:45,velocityDrift:.4,gateRatio:.75,glide:.04},"Neo-Soul":{humanVariance:.5,swing:55,velocityDrift:.35,gateRatio:.95,glide:.03},EDM:{humanVariance:.05,swing:0,velocityDrift:.1,gateRatio:.7,glide:.05},Ambient:{humanVariance:.3,swing:0,velocityDrift:.2,gateRatio:1.3,glide:.08}};function qr(t){const e=Object.keys(ni).find(o=>o.toLowerCase()===t.toLowerCase());return ni[e||"Pop"]||ni.Pop}const Hi={MAJOR:[0,2,4,5,7,9,11],MINOR:[0,2,3,5,7,8,10],NATURAL_MINOR:[0,2,3,5,7,8,10],DORIAN:[0,2,3,5,7,9,10],MIXOLYDIAN:[0,2,4,5,7,9,10],LYDIAN:[0,2,4,6,7,9,11],PHRYGIAN:[0,1,3,5,7,8,10],LOCRIAN:[0,1,3,5,6,8,10],HARMONIC_MINOR:[0,2,3,5,7,8,11],MELODIC_MINOR:[0,2,3,5,7,9,11],MAJOR_PENTATONIC:[0,2,4,7,9],MINOR_PENTATONIC:[0,3,5,7,10],BLUES:[0,3,5,6,7,10]},Hr={0:"P1",1:"m2",2:"M2",3:"m3",4:"M3",5:"P4",6:"d5/#11",7:"P5",8:"m6",9:"M6",10:"m7",11:"M7"};function Jr(t,e){const o=ue(`${t}4`)%12,i=e.toUpperCase().replace(/\s+/g,"_");return(Hi[i]||Hi.MAJOR).map(n=>(o+n)%12)}function Qe(t,e="C",o="MAJOR"){const{root:i,quality:s}=ce(t.name),n=ue(`${i}4`)%12;let r,a=7,l,d=[2],c=[];switch(s){case"maj":case"maj7":case"maj9":case"maj6":r=4,a=7,(s==="maj7"||s==="maj9")&&(l=11),s==="maj6"&&(l=9),d=[2,6,9],c=[5];break;case"min":case"min7":case"min9":case"min6":case"mmaj7":r=3,a=7,(s==="min7"||s==="min9")&&(l=10),s==="min6"&&(l=9),s==="mmaj7"&&(l=11),d=[2,5,9],c=[8];break;case"dom7":case"dom9":r=4,a=7,l=10,d=[2,6,9,1,3],c=[11];break;case"dim":case"dim7":r=3,a=6,s==="dim7"&&(l=9),d=[2,5,8],c=[7];break;case"aug":r=4,a=8,d=[2,6],c=[7];break;case"sus4":case"sus7":case"sus9":r=5,a=7,(s==="sus7"||s==="sus9")&&(l=10),d=[10,2],c=[4];break;case"sus2":r=2,a=7,d=[10,5],c=[4];break;default:r=4,a=7;break}const u=[0,...r!==void 0?[r]:[],...a!==void 0?[a]:[],...l!==void 0?[l]:[]].map(b=>(n+b)%12),h=Jr(e,o),m=d.map(b=>(n+b)%12).filter(b=>h.includes(b)&&!u.includes(b)),f=c.map(b=>(n+b)%12);return{chordName:t.name,rootPc:n,thirdPc:r!==void 0?(n+r)%12:void 0,fifthPc:a!==void 0?(n+a)%12:void 0,seventhPc:l!==void 0?(n+l)%12:void 0,chordTonePcs:u,tensionPcs:m,avoidPcs:f,scalePcs:h}}function dt(t,e,o="C",i="MAJOR"){const s=typeof t=="number"?t:ue(t),n=s%12,r=Qe(e,o,i),a=(n-r.rootPc+12)%12,l=Hr[a]||`+${a}`;let d="chromatic",c=!1,p,u;if(n===r.rootPc?d="root":n===r.thirdPc?d="3rd":n===r.fifthPc?d="5th":n===r.seventhPc?d="7th":r.tensionPcs.includes(n)?d="tension":r.scalePcs.includes(n)?d="passing":d="chromatic",r.avoidPcs.includes(n)){c=!0;const{quality:h}=ce(e.name);if((h.startsWith("maj")||h==="dom7"||h==="dom9")&&a===5){p="Natural 4th clashes with Major 3rd (minor 9th/2nd rub)";const m=s-1;u=H(m)}else if((h==="dom7"||h==="dom9")&&a===11){p="Major 7th clashes with Dominant ♭7";const m=s-1;u=H(m)}else if((h==="sus4"||h==="sus2")&&a===4){p="Major 3rd negates suspended chord feel";const m=s+1;u=H(m)}else if(h.startsWith("dim")&&a===7){p="Natural 5th clashes with Diminished 5th";const m=s-1;u=H(m)}else{p=`Harsh dissonance against ${e.name}`;const m=s-1;u=H(m)}}return{role:d,intervalFromRoot:l,isClash:c,clashReason:p,suggestion:u}}function Yr(t,e,o,i){if(o==="free"||!i?.chords?.length)return t;const s=ue(t),n=i.chords.length,r=Math.max(0,Math.min(n-1,Math.floor(e/4)%n)),a=i.chords[r],l=Qe(a,i.key,i.scaleType);let d=[];if(o==="strict-chord"?d=[...new Set([...l.chordTonePcs,...l.tensionPcs])]:o==="scale-key"&&(d=l.scalePcs),d.length===0)return t;let c=s,p=1/0;for(let u=-12;u<=12;u++){const h=s+u,m=(h%12+12)%12;if(d.includes(m)){const f=Math.abs(u);if(f<p&&(p=f,c=h,f===0))break}}return H(c)}function Ji(t,e){if(!e?.chords?.length||!t?.notes?.length)return t;const o=t.notes.map(i=>{const s=Math.min(i.barIndex,e.chords.length-1),n=e.chords[s],r=Qe(n,e.key,e.scaleType);let a=i.midi%12;if(i.chordToneRole==="root")a=r.rootPc;else if(i.chordToneRole==="3rd")a=r.thirdPc??r.rootPc;else if(i.chordToneRole==="5th")a=r.fifthPc??r.rootPc;else if(i.chordToneRole==="7th")a=r.seventhPc??r.fifthPc??r.rootPc;else if(i.chordToneRole==="tension")a=r.tensionPcs[0]??r.rootPc;else{const u=dt(i.midi,n,e.key,e.scaleType);u.isClash&&u.suggestion?a=ue(u.suggestion)%12:a=i.midi%12}let l=i.midi,d=1/0;for(let u=-12;u<=12;u++){const h=i.midi+u;(h%12+12)%12===a&&Math.abs(u)<d&&(d=Math.abs(u),l=h)}const c=H(l),p=dt(l,n,e.key,e.scaleType);return{...i,pitch:c,midi:l,chordToneRole:p.role,isClash:p.isClash}});return{...t,progressionId:e.key+"_"+e.scaleType,notes:o}}function Wr(t,e,o,i,s=0){if(t<25){const r=[[{step:0,duration:3,accent:!0}],[{step:4,duration:2.5,accent:!0}],[{step:0,duration:2,accent:!0},{step:8,duration:1.5}],[{step:2,duration:2,accent:!0},{step:10,duration:1.5}]];if(s===0)return e%2===0?r[0]:r[2];const a=Math.abs(s)%r.length;return r[(e+a)%r.length]}if(t<=60){const r=[[{step:0,duration:1,accent:!0},{step:4,duration:.5},{step:6,duration:1},{step:10,duration:1}],[{step:0,duration:.75,accent:!0},{step:3,duration:.75},{step:6,duration:1},{step:10,duration:1}],[{step:4,duration:1,accent:!0},{step:8,duration:.75},{step:11,duration:.75}],[{step:0,duration:1.5,accent:!0},{step:6,duration:.5},{step:8,duration:2}],[{step:2,duration:1,accent:!0},{step:6,duration:.5},{step:8,duration:1},{step:12,duration:1}],[{step:0,duration:1.5,accent:!0},{step:6,duration:1},{step:10,duration:1.5}],[{step:0,duration:.5,accent:!0},{step:2,duration:.5},{step:6,duration:1},{step:10,duration:1}]];if(e===o-1)return r[3];if(s===0)return r[e%3];const a=Math.abs(s)%(r.length-1);return r[(e+a)%(r.length-1)]}return t>80?[0,2,4,6,8,10,12,14].map((r,a)=>({step:r,duration:.5,accent:a===0||a===4})):s&&s%2===1?[{step:0,duration:.5,accent:!0},{step:3,duration:.5},{step:6,duration:.5,accent:!0},{step:8,duration:.5},{step:10,duration:.75},{step:13,duration:.75}]:[{step:0,duration:.5,accent:!0},{step:2,duration:.5},{step:4,duration:.75,accent:!0},{step:7,duration:.5},{step:9,duration:.75},{step:12,duration:1}]}function Kr(t,e,o,i){const s=(e*16+o)/(i*16);switch(t){case"Arch":return Math.round(Math.sin(s*Math.PI)*9);case"AscendingClimax":return Math.round(-4+s*16);case"DescendingSigh":return Math.round(12-s*14);case"CallAndResponse":if(e<Math.ceil(i/2)){const r=(e*16+o)/(Math.ceil(i/2)*16);return Math.round(r*7)}else{const r=((e-Math.ceil(i/2))*16+o)/(Math.floor(i/2)*16);return Math.round(5*(1-r))}case"OstinatoRiff":{const n=o/16;return Math.round(Math.sin(n*Math.PI*2)*5)}case"AnthemHook":return Math.round(8+Math.sin(s*Math.PI*3)*3);default:return 0}}class Xr{createEmptyTrack(e,o={}){const i=e?.genre||"Pop";return{id:`melody-track-${Date.now()}`,progressionId:e?`${e.key}_${e.scaleType}`:void 0,notes:[],contour:"Arch",density:50,octave:4,guideMode:"strict-chord",feelSettings:this.getMelodyFeelForGenre(i),presetId:"lead-synth",volume:80,muted:!1,solo:!1,...o}}generateMelody(e,o={}){const i=o.contour||"Arch",s=o.density??50,n=o.octave??4,r=o.guideMode||"strict-chord",a={humanVariance:o.feelSettings?.humanVariance??.25,swing:o.feelSettings?.swing??0,velocityDrift:o.feelSettings?.velocityDrift??.3,gateRatio:o.feelSettings?.gateRatio??.9,glide:o.feelSettings?.glide??0},l=o.presetId||"lead-synth",d=o.bandId,c=o.seed??0,p=[],u=e.chords||[],h=Math.max(1,u.length);let m=null,f=0;u.forEach((y,x)=>{const C=Qe(y,e.key,e.scaleType);Wr(s,x,h,i,c).forEach((S,A)=>{const F=S.step,$=x*4+F/4,T=S.duration,P=Kr(i,x,F,h),_=12*(n+1)+C.rootPc+P;let R,O="root";const E=r==="strict-chord"&&o.strictBy==="chord",G=r==="strict-chord"&&o.strictBy!=="chord",oe=r==="scale-key";let Ie;if(E)Ie=[...C.chordTonePcs];else if(G||oe){const de=C.scalePcs.filter(pe=>!C.avoidPcs.includes(pe));Ie=de.length>0?de:C.chordTonePcs}else Ie=C.scalePcs;const Ue=[];for(let de=n-1;de<=n+2;de++)Ie.forEach(pe=>{const Ve=12*(de+1)+pe;let Ne="passing";pe===C.rootPc?Ne="root":pe===C.thirdPc?Ne="3rd":pe===C.fifthPc?Ne="5th":pe===C.seventhPc?Ne="7th":C.tensionPcs.includes(pe)&&(Ne="tension"),Ue.push({midi:Ve,pc:pe,role:Ne})});const Ws=S.accent||F===0||F===8,Bi=de=>de==="root"||de==="3rd"||de==="5th"||de==="7th";if(m===null){Ue.sort((pe,Ve)=>{const Ne=Math.abs(pe.midi-_),At=Math.abs(Ve.midi-_),Ot=pe.role==="root"||pe.role==="3rd"||pe.role==="5th"?-6:0,qe=Ve.role==="root"||Ve.role==="3rd"||Ve.role==="5th"?-6:0;return Ne+Ot-(At+qe)});const de=c?Math.abs(c+x)%Math.min(3,Ue.length):0;R=Ue[de].midi,O=Ue[de].role,f=0}else{const de=f>5,pe=f<-5;Ue.sort((At,Ot)=>{const qe=At.midi-m,ht=Ot.midi-m;let Ft=Math.abs(At.midi-_),Bt=Math.abs(Ot.midi-_);return Ws&&(Bi(At.role)&&(Ft-=14),Bi(Ot.role)&&(Bt-=14)),de?(qe<0&&Math.abs(qe)<=4&&(Ft-=20),ht<0&&Math.abs(ht)<=4&&(Bt-=20)):pe?(qe>0&&Math.abs(qe)<=4&&(Ft-=20),ht>0&&Math.abs(ht)<=4&&(Bt-=20)):(Math.abs(qe)>=1&&Math.abs(qe)<=4&&(Ft-=12),Math.abs(ht)>=1&&Math.abs(ht)<=4&&(Bt-=12)),Ft-Bt});const Ve=Math.min(2,Ue.length),Ne=c&&Ve>1&&(c*31+x*17+F*7)%7<3?1:0;R=Ue[Ne].midi,O=Ue[Ne].role,f=R-m}m=R;const Ks=H(R),Xs=dt(R,y,e.key,e.scaleType);p.push({id:`m-note-${x}-${F}-${A}`,barIndex:x,stepInBar:F,beatOffset:$,durationBeats:T,pitch:Ks,midi:R,velocity:S.accent?110:92,chordToneRole:O,isClash:Xs.isClash})})});let b={id:`melody-track-${Date.now()}`,progressionId:`${e.key}_${e.scaleType}`,notes:p,contour:i,density:s,octave:n,guideMode:r,feelSettings:a,presetId:l,volume:85,muted:!1,solo:!1,bandId:d};return d&&(b=this.spiceWithBandTrick(b,d,0,e)),b}regenerateBar(e,o,i){if(!i.chords[o])return e;const s={...i,chords:[i.chords[o]]},n=this.generateMelody(s,{contour:e.contour,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId}),r=e.notes.filter(l=>l.barIndex!==o),a=n.notes.map(l=>({...l,barIndex:o,beatOffset:o*4+l.stepInBar/4,id:`m-note-${o}-${l.stepInBar}`}));return{...e,notes:[...r,...a].sort((l,d)=>l.beatOffset-d.beatOffset)}}mutateMelody(e,o,i){const s=e.notes.map(n=>{if(Math.random()>o)return n;const r=i.chords[n.barIndex]||i.chords[0],a=Qe(r,i.key,i.scaleType),l=[...a.chordTonePcs,...a.tensionPcs],d=l[Math.floor(Math.random()*l.length)],p=(Math.floor(n.midi/12)-1+1)*12+d,u=H(p),h=dt(p,r,i.key,i.scaleType);return{...n,midi:p,pitch:u,chordToneRole:h.role,isClash:h.isClash}});return{...e,notes:s}}invertMelody(e,o){if(e.notes.length===0)return e;const i=Math.round(e.notes.reduce((n,r)=>n+r.midi,0)/e.notes.length),s=e.notes.map(n=>{const r=n.midi-i,a=Math.max(24,Math.min(108,i-r)),l=H(a);return{...n,midi:a,pitch:l}});return o?Ji({...e,notes:s},o):{...e,notes:s}}spiceWithBandTrick(e,o,i,s){s.chords[i]||s.chords[0];const n=o.toLowerCase().replace(/[^a-z]/g,"");if(n.includes("oasis")){const a=ue("G4"),l=[{id:`oasis-drone-${i}-0`,barIndex:i,stepInBar:0,beatOffset:i*4,durationBeats:4,pitch:"G4",midi:a,velocity:105,chordToneRole:"drone",tag:"band-oasis-drone"}];return{...e,notes:[...e.notes.filter(d=>d.barIndex!==i),...l].sort((d,c)=>d.beatOffset-c.beatOffset),bandId:o}}if(n.includes("beatles")){const r=ue("C5"),a=[0,1,2,3].map(l=>{const d=r-l;return{id:`beatles-chromatic-${i}-${l*4}`,barIndex:i,stepInBar:l*4,beatOffset:i*4+l,durationBeats:1,pitch:H(d),midi:d,velocity:96,chordToneRole:l===0?"root":"chromatic",tag:"band-beatles-chromatic"}});return{...e,notes:[...e.notes.filter(l=>l.barIndex!==i),...a].sort((l,d)=>l.beatOffset-d.beatOffset),bandId:o}}if(n.includes("radiohead")){const a=ue(`${s.key||"C"}4`)+14,l=[{id:`radiohead-leap-${i}-0`,barIndex:i,stepInBar:0,beatOffset:i*4,durationBeats:2,pitch:H(a),midi:a,velocity:110,chordToneRole:"tension",tag:"band-radiohead-falsetto"},{id:`radiohead-trill-${i}-8`,barIndex:i,stepInBar:8,beatOffset:i*4+2,durationBeats:1,pitch:H(a+1),midi:a+1,velocity:90,chordToneRole:"tension",tag:"band-radiohead-trill"},{id:`radiohead-trill2-${i}-12`,barIndex:i,stepInBar:12,beatOffset:i*4+3,durationBeats:1,pitch:H(a),midi:a,velocity:85,chordToneRole:"tension",tag:"band-radiohead-trill"}];return{...e,notes:[...e.notes.filter(d=>d.barIndex!==i),...l].sort((d,c)=>d.beatOffset-c.beatOffset),bandId:o}}if(n.includes("nirvana")){const r=ue(`${s.key||"C"}4`),a=[{id:`nirvana-root-${i}-0`,barIndex:i,stepInBar:0,beatOffset:i*4,durationBeats:1,pitch:H(r),midi:r,velocity:115,chordToneRole:"root",tag:"band-nirvana-grunge"},{id:`nirvana-slide-${i}-4`,barIndex:i,stepInBar:4,beatOffset:i*4+1,durationBeats:.5,pitch:H(r+2),midi:r+2,velocity:100,chordToneRole:"passing",tag:"band-nirvana-slide"},{id:`nirvana-min3-${i}-6`,barIndex:i,stepInBar:6,beatOffset:i*4+1.5,durationBeats:1.5,pitch:H(r+3),midi:r+3,velocity:110,chordToneRole:"3rd",tag:"band-nirvana-grunge"}];return{...e,notes:[...e.notes.filter(l=>l.barIndex!==i),...a].sort((l,d)=>l.beatOffset-d.beatOffset),bandId:o}}if(n.includes("steely")||n.includes("dan")){const a=ue(`${s.key||"C"}4`)+14,l=[{id:`steely-enc-low-${i}-2`,barIndex:i,stepInBar:2,beatOffset:i*4+.5,durationBeats:.5,pitch:H(a-1),midi:a-1,velocity:88,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-enc-high-${i}-4`,barIndex:i,stepInBar:4,beatOffset:i*4+1,durationBeats:.5,pitch:H(a+1),midi:a+1,velocity:92,chordToneRole:"chromatic",tag:"band-steely-enclosure"},{id:`steely-target-${i}-6`,barIndex:i,stepInBar:6,beatOffset:i*4+1.5,durationBeats:2.5,pitch:H(a),midi:a,velocity:108,chordToneRole:"tension",tag:"band-steely-jazz9"}];return{...e,notes:[...e.notes.filter(d=>d.barIndex!==i),...l].sort((d,c)=>d.beatOffset-c.beatOffset),bandId:o}}if(n.includes("mac")||n.includes("demarco")){const r=ue(`${s.key||"C"}4`),a=[{id:`mac-7th-${i}-2`,barIndex:i,stepInBar:2,beatOffset:i*4+.5,durationBeats:1,pitch:H(r+11),midi:r+11,velocity:92,chordToneRole:"7th",tag:"band-mac-walkdown"},{id:`mac-5th-${i}-6`,barIndex:i,stepInBar:6,beatOffset:i*4+1.5,durationBeats:1,pitch:H(r+7),midi:r+7,velocity:88,chordToneRole:"5th",tag:"band-mac-walkdown"},{id:`mac-3rd-${i}-10`,barIndex:i,stepInBar:10,beatOffset:i*4+2.5,durationBeats:1.5,pitch:H(r+4),midi:r+4,velocity:95,chordToneRole:"3rd",tag:"band-mac-walkdown"}];return{...e,notes:[...e.notes.filter(l=>l.barIndex!==i),...a].sort((l,d)=>l.beatOffset-d.beatOffset),bandId:o}}return{...e,bandId:o}}shiftOctave(e,o){const i=e.notes.map(s=>{const n=Math.max(12,Math.min(127,s.midi+o*12));return{...s,midi:n,pitch:H(n)}});return{...e,octave:Math.max(1,Math.min(7,e.octave+o)),notes:i}}setContour(e,o,i){return this.generateMelody(i,{contour:o,density:e.density,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}setDensity(e,o,i){return this.generateMelody(i,{contour:e.contour,density:o,octave:e.octave,guideMode:e.guideMode,feelSettings:e.feelSettings,presetId:e.presetId,bandId:e.bandId})}snapNoteToGuide(e,o,i,s){return Yr(e,o,i,s)}analyzeMelodyNote(e,o){const i=Math.max(0,Math.min((o.chords?.length||1)-1,e.barIndex)),s=o.chords?.[i]||{name:"C"},n=dt(e.midi,s,o.key,o.scaleType);return{pitch:e.pitch,role:n.role,intervalFromRoot:n.intervalFromRoot,chordName:s.name,isClash:n.isClash,clashReason:n.clashReason,suggestion:n.suggestion}}validateMelody(e,o){return e.notes.map(i=>this.analyzeMelodyNote(i,o))}alignMelodyToChords(e,o){return Ji(e,o)}applyHumanFeel(e,o,i){const s=60/i,n=[];return e.forEach(r=>{const l=r.stepInBar%2===1?o.swing/100*(s*.25*.35):0,c=Math.sin(r.stepInBar*13.37+r.barIndex*7.1)*.5*o.humanVariance*.025,p=Math.max(0,r.beatOffset*s+l+c),u=Math.max(.05,r.durationBeats*s*o.gateRatio),m=r.stepInBar===0?12:0,f=Math.cos(r.stepInBar*5.5)*(o.velocityDrift*10),b=Math.max(1,Math.min(127,Math.round(r.velocity+m+f)))/127;n.push({note:r.pitch,midi:r.midi,time:p,duration:u,velocity:b})}),n.sort((r,a)=>r.time-a.time)}getMelodyFeelForGenre(e){return qr(e)}}const ve=new Xr;var Qr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,he=(t,e,o,i)=>{for(var s=i>1?void 0:i?Zr(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Qr(e,o,s),s};const ea=[{id:"loop",name:"Chords"},{id:"melody",name:"Melody"},{id:"song",name:"Song"},{id:"play",name:"Play it"}];let le=class extends fe{constructor(){super(...arguments),this.compact=!1,this.isAdmin=!1,this.isAuthenticated=!1,this.userEmail=null,this.savedCount=0,this.syncStatus="synced",this.syncError=null,this.title="Chroma Chords",this.activeTab="loop",this.showNav=!0,this.aiTokens=4,this.aiNextIn=60,this.midiStatus="Idle",this.accountMenuOpen=!1,this.showCapacityNote=!1,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.capacityTimer=null}connectedCallback(){super.connectedCallback(),this.unsubscribeProjects=L.subscribeProjects(()=>{this.savedCount=L.getProjects().length,this.requestUpdate()}),this.unsubscribeSyncStatus=L.subscribeSyncStatus(t=>{this.syncStatus=t,this.syncError=L.getLastSyncError(),this.requestUpdate()}),this.savedCount=L.getProjects().length,this.syncStatus=L.getSyncStatus(),this.syncError=L.getLastSyncError(),this.capacityTimer=setInterval(()=>{this.aiTokens<4&&(this.aiNextIn<=1?(this.aiTokens=Math.min(4,this.aiTokens+1),this.aiNextIn=60):this.aiNextIn-=1,this.requestUpdate())},1e3)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.capacityTimer&&clearInterval(this.capacityTimer)}setTab(t){this.activeTab=t,this.dispatchEvent(new CustomEvent("tab-change",{detail:t,bubbles:!0,composed:!0}))}toggleCapacityNote(t){t.stopPropagation(),this.showCapacityNote=!this.showCapacityNote,this.showCapacityNote&&(this.accountMenuOpen=!1)}toggleAccountMenu(t){t.stopPropagation(),this.accountMenuOpen=!this.accountMenuOpen,this.accountMenuOpen&&(this.showCapacityNote=!1)}onSignIn(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onSignOut(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}onViewSets(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenMidi(){this.accountMenuOpen=!1,this.dispatchEvent(new CustomEvent("open-midi",{bubbles:!0,composed:!0}))}onSyncNow(){this.dispatchEvent(new CustomEvent("sync-projects",{bubbles:!0,composed:!0}))}renderSyncStatusText(){return this.syncStatus==="synced"?"Synced with cloud":this.syncStatus==="syncing"?"Syncing with cloud...":this.syncStatus==="offline"?"Sync failed (offline)":"Sign in to sync"}render(){const t=this.userEmail?this.userEmail.charAt(0).toUpperCase():"U";return g`
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
        ${this.showNav?g`
          <nav class="nav-tabs-wrap" aria-label="Main Navigation">
            ${ea.map(e=>g`
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
    `}};le.styles=ge`
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
  `;he([w({type:Boolean})],le.prototype,"compact",2);he([w({type:Boolean})],le.prototype,"isAdmin",2);he([w({type:Boolean})],le.prototype,"isAuthenticated",2);he([w({type:String})],le.prototype,"userEmail",2);he([w({type:Number})],le.prototype,"savedCount",2);he([w({type:String})],le.prototype,"syncStatus",2);he([w({type:String})],le.prototype,"syncError",2);he([w({type:String})],le.prototype,"title",2);he([w({type:String})],le.prototype,"activeTab",2);he([w({type:Boolean})],le.prototype,"showNav",2);he([w({type:Number})],le.prototype,"aiTokens",2);he([w({type:Number})],le.prototype,"aiNextIn",2);he([w({type:String})],le.prototype,"midiStatus",2);he([k()],le.prototype,"accountMenuOpen",2);he([k()],le.prototype,"showCapacityNote",2);le=he([be("app-header")],le);var ta=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,X=(t,e,o,i)=>{for(var s=i>1?void 0:i?oa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ta(e,o,s),s};const _s=[{name:"Grand Piano",desc:"Clear and even. Easy to hear the harmony.",color:"#9CC0EC"},{name:"Stage Rhodes",desc:"Warm electric piano with a soft bell.",color:"#F2A79B"},{name:"Nylon Guitar",desc:"Plucked and intimate.",color:"#F6D98B"},{name:"Jazz Archtop",desc:"Round, woody jazz guitar.",color:"#D89047"},{name:"Drawbar Organ",desc:"Held, breathy organ tone.",color:"#E8609A"},{name:"Cinematic Pad",desc:"Long, soft swells that hold each chord.",color:"#C9A9E0"},{name:"Celestial Bell",desc:"Glassy and bright. Rings out.",color:"#B8CC9E"},{name:"Juno Synth",desc:"Lush analog chorus synth.",color:"#7B61FF"},{name:"Vintage SH-101",desc:"Squelchy mono synth. Great for lines.",color:"#4EA598"},{name:"House Stab",desc:"Short, punchy chord hits.",color:"#FF8C42"}],Gs=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Vs=["Major","Minor","Dorian","Mixolydian","Lydian","Phrygian","Locrian","Harmonic minor","Melodic minor"],yo=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],q={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},qs=[{k:"spread",label:"Spread",from:"Spread",max:1,step:.01},{k:"duration",label:"Duration",from:"Pattern + Density",max:2,step:.01},{k:"variance",label:"Human variance",from:"Humanise",max:1,step:.01},{k:"micro",label:"Micro-timing",from:"Swing + Humanise",max:1,step:.01}];let Y=class extends fe{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play section",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.melodyLoop="Section",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.backingEnabled=!0,this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.songTotal="",this.chords=[],this.openMenu=null,this.feelScope=null,this.advOpen=!1}toggleMenu(t){this.openMenu=this.openMenu===t?null:t}closeMenu(){this.openMenu=null}onPlayClick(){const t=this.activeTab==="melody",e=this.activeTab==="song";this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying,target:t?"melody":e?"song":"chords"},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeMenu(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeMenu(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onLoopCycle(){const t=["Section","Chord","Span"],e=t[(t.indexOf(this.melodyLoop)+1)%3];this.melodyLoop=e,this.dispatchEvent(new CustomEvent("loop-cycle",{detail:{melodyLoop:e},bubbles:!0,composed:!0}))}onSelectSound(t){this.closeMenu(),this.activeTab==="melody"?(this.melodySound=t,v.setMelodySound(t),this.dispatchEvent(new CustomEvent("set-melody-sound",{detail:{sound:t},bubbles:!0,composed:!0}))):(this.chordSound=t,this.dispatchEvent(new CustomEvent("set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))),this.requestUpdate()}get feelChanged(){const t=this.feelSettings||{},e=t.barFeel||{},o=t.advOverride||{};return t.playStyle&&t.playStyle!==q.playStyle||t.swing!==void 0&&t.swing!==q.swing||t.spread!==void 0&&t.spread!==q.spread||t.density!==void 0&&t.density!==q.density||t.humanise!==void 0&&t.humanise!==q.humanise||t.tone&&t.tone!==q.tone||Object.keys(e).length>0||Object.keys(o).length>0}resetFeel(){const t=this.activeTab==="melody";this.feelSettings={...q,barFeel:{},advOverride:{}},this.feelScope=null,t?(this.melodyFeel="Smooth",v.setMelodyFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:"Smooth"},bubbles:!0,composed:!0}))):(this.chordFeel=q.playStyle,v.setPlayStyle(q.playStyle),v.setFeelSettings(this.feelSettings),ke(q.tone),this.dispatchEvent(new CustomEvent("feel-change",{detail:{feel:q.playStyle,playStyle:q.playStyle},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:q.playStyle},bubbles:!0,composed:!0}))),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings}},bubbles:!0,composed:!0})),this.requestUpdate()}fget(t){const e=this.feelSettings||{},o=this.feelScope;return o!==null&&e.barFeel&&e.barFeel[o]&&e.barFeel[o][t]!==void 0?e.barFeel[o][t]:t==="playStyle"?e.playStyle||this.chordFeel||"Block chords":e[t]??q[t]}getNearestStep(t){const e=this.fget(t.k);if(typeof e!="number")return t.steps.find(i=>i.v===e)||t.steps[0];let o=t.steps[0];return t.steps.forEach(i=>{Math.abs(Number(i.v)-Number(e))<Math.abs(Number(o.v)-Number(e))&&(o=i)}),o}onSelectFeelStep(t,e){const o=this.activeTab==="melody",i={...this.feelSettings};if(this.feelScope===null)i[t]=e,t==="playStyle"?o?(this.melodyFeel=e,v.setMelodyFeel(e),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):(this.chordFeel=e,v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("feel-change",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):t==="tone"&&ke(e);else{const s=this.feelScope,n={...i.barFeel||{}};n[s]={...n[s]||{},[t]:e},i.barFeel=n}this.feelSettings=i,o?v.setMelodyFeelSettings(this.feelSettings):v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent(o?"melody-feel-settings-change":"feel-settings-change",{detail:{feelSettings:{...this.feelSettings},key:t,value:e,chordIndex:this.feelScope},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:e,isMelody:o},bubbles:!0,composed:!0})),this.requestUpdate()}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle"),o=+(t("spread")/100).toFixed(2),i=+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),s=+(t("humanise")/100).toFixed(2),n=+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2);return{spread:o,duration:i,variance:s,micro:n}}onAdvInput(t,e){const o={...this.feelSettings};o.advOverride={...o.advOverride||{},[t]:e},this.feelSettings=o,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:o.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onAdvRelink(t){const e={...this.feelSettings};if(e.advOverride){const o={...e.advOverride};delete o[t],e.advOverride=o}this.feelSettings=e,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:e.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onShareClick(){this.closeMenu(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",o=this.sections.find((c,p)=>(c.id||String.fromCharCode(65+p))===this.activeSectionId)||this.sections[0]||{name:"Chorus",tint:"#F1E4CC",progression:null},i=t?this.melodySound:this.chordSound;t?this.melodyFeel:this.chordFeel;const s=this.fget("playStyle"),r=(yo[0].steps.find(c=>c.v===s)||yo[0].steps[0]).name,a=this.chords&&this.chords.length>0?this.chords:o?.progression?.chords?.length?o.progression.chords:[{name:"Chord 1"},{name:"Chord 2"},{name:"Chord 3"},{name:"Chord 4"}],l=this.isPlaying?"#FBF3E6":this.moodColor,d=this.isPlaying?"■":"▶";return g`
      <div class="transport-container" data-screen-label="Transport">
        ${this.openMenu?g`<div class="backdrop" @click=${this.closeMenu}></div>`:""}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${l};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          <span class="play-icon">${d}</span>
          ${this.playLabel}
        </button>

        <div class="divider"></div>

        <!-- Section Selector -->
        <button
          class="tb-btn sec-compact-btn ${this.openMenu==="section"?"active":""}"
          @click=${()=>this.toggleMenu("section")}
          aria-label="Choose section"
        >
          <span class="sec-badge" style="background: ${o.tint||"#F1E4CC"};"></span>
          <span class="highlight">${o.name}</span>
          <span class="caret">▾</span>
        </button>

        <!-- Wide viewport sections group -->
        <div class="sec-full-group">
          ${this.sections.map((c,p)=>{const u=c.id||String.fromCharCode(65+p);return g`
              <button
                class="tb-btn ${u===this.activeSectionId?"active":""}"
                @click=${()=>this.onSelectSection(u)}
              >
                <span class="sec-badge" style="background: ${c.tint||"#F1E4CC"};"></span>
                <span>${c.name}</span>
              </button>
            `})}
        </div>

        <!-- Section Dropdown Popover -->
        ${this.openMenu==="section"?g`
          <div class="popover-shell sec-popover">
            <div class="popover-title">Section</div>
            ${this.sections.map((c,p)=>{const u=c.id||String.fromCharCode(65+p);return g`
                <button
                  class="sec-item ${u===this.activeSectionId?"selected":""}"
                  @click=${()=>this.onSelectSection(u)}
                >
                  <span class="sec-badge" style="background: ${c.tint||"#F1E4CC"}; width: 12px; height: 12px;"></span>
                  <span class="sec-item-name">${c.name}</span>
                  <span class="sec-item-meta">${c.order?c.order.length:4} bars</span>
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
        ${e?"":g`
          <button
            class="tb-btn ${this.openMenu==="sound"?"active":""}"
            @click=${()=>this.toggleMenu("sound")}
            aria-label="Select instrument sound"
          >
            <span>Sound</span>
            <span class="highlight">${i}</span>
            <span class="caret">▾</span>
          </button>

          <!-- Feel Selector -->
          <button
            class="tb-btn ${this.openMenu==="feel"?"active":""}"
            @click=${()=>this.toggleMenu("feel")}
            aria-label="Select rhythmic feel"
          >
            <span>Feel</span>
            <span class="highlight">${r}</span>
            <span class="caret">▾</span>
          </button>
        `}

        <!-- Sound Popover -->
        ${this.openMenu==="sound"?g`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${t?"Melody sound":"Chord sound"}</div>
            <div class="sound-grid">
              ${_s.map(c=>g`
                <button
                  class="sound-item ${c.name===i?"selected":""}"
                  @click=${()=>this.onSelectSound(c.name)}
                >
                  <span class="sound-dot" style="background: ${c.color};"></span>
                  <div class="sound-meta">
                    <span class="sound-name">${c.name}</span>
                    <span class="sound-desc">${c.desc}</span>
                  </div>
                </button>
              `)}
            </div>
          </div>
        `:""}

        <!-- Feel Docked Panel -->
        ${this.openMenu==="feel"?g`
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
                ${a.map((c,p)=>{const u=this.feelScope===p,h=!!(this.feelSettings?.barFeel&&this.feelSettings.barFeel[p]&&Object.keys(this.feelSettings.barFeel[p]).length>0),m=c.name||"Chord "+(p+1);return g`
                    <button
                      type="button"
                      style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${u?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${u?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                      @click=${()=>{this.feelScope=p}}
                      aria-label="${m}, ${u?"editing":"edit feel"}"
                    >
                      ${m}
                      <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${u?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${h?1:0}; transition: opacity 150ms ease;"></span>
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
                @click=${()=>this.closeMenu()}
                aria-label="Close feel and tone"
                style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
              >×</button>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 7px; text-wrap: pretty;">
              ${this.feelScope===null?"Everything below applies to every chord in this section.":`Only ${a[this.feelScope]?.name||"Chord "+(this.feelScope+1)} plays this way. The rest keep the section feel.`}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px 22px; margin-top: 10px;">
              ${yo.map(c=>{const p=this.getNearestStep(c);return g`
                  <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                    <div style="width: 104px; flex-shrink: 0;">
                      <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F);">${c.label}</div>
                      <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${c.hint}</div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                      ${c.steps.map(u=>{const h=u.v===p.v;return g`
                          <button
                            type="button"
                            class="feel-step-btn ${h?"selected":""}"
                            @click=${()=>this.onSelectFeelStep(c.k,u.v)}
                            aria-label="${c.label}: ${u.name}"
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
            ${this.advOpen?g`
              <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px 26px;">
                ${qs.map(c=>{const p=this.feelSettings?.advOverride||{},u=this.getDerivedParams(),h=p[c.k]!==void 0,m=h?p[c.k]:u[c.k];return g`
                    <div style="min-width: 0;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="font-size: 12px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${c.label}</div>
                        <button
                          type="button"
                          @click=${()=>this.onAdvRelink(c.k)}
                          style="border: none; font-family: inherit; background: transparent; color: #9E5D53; font-size: 10.5px; font-weight: 800; cursor: pointer; padding: 4px 6px; border-radius: 7px; ${h?"":"opacity: 0; pointer-events: none;"}"
                          aria-label="Re-link to the feel axis"
                        >Re-link</button>
                        <div style="font-size: 11.5px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--cv-ink, #2E271F); background: var(--cv-surface-2, #F1E4CC); border-radius: 6px; padding: 2px 7px;">
                          ${typeof m=="number"?m.toFixed(2):m}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="${c.max}"
                        step="${c.step}"
                        .value="${String(m)}"
                        @input=${f=>this.onAdvInput(c.k,+f.target.value)}
                        aria-label="${c.label}"
                        style="width: 100%; margin-top: 7px; accent-color: #9E5D53; cursor: pointer;"
                      />
                      <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: ${h?"#9E5D53":"rgba(46,39,31,0.36)"}; margin-top: 3px;">
                        ${h?"Set by hand":"From "+c.from}
                      </div>
                    </div>
                  `})}
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
                  ${[1,2,4].map(c=>g`
                    <button
                      class="pill-btn ${this.barsPerChord===c?"selected":""}"
                      @click=${()=>this.onBarsChange(c)}
                    >
                      ${c} bar${c>1?"s":""}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Key root</div>
              <div class="pill-group">
                ${Gs.map(c=>g`
                  <button
                    class="pill-btn ${this.keyRoot===c?"selected":""}"
                    @click=${()=>this.onKeyRootChange(c)}
                  >
                    ${c}
                  </button>
                `)}
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Scale / Mode</div>
              <div class="pill-group">
                ${Vs.map(c=>g`
                  <button
                    class="pill-btn ${this.scaleMode===c?"selected":""}"
                    @click=${()=>this.onScaleModeChange(c)}
                  >
                    ${c}
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
    `}};Y.styles=ge`
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
  `;X([w({type:String})],Y.prototype,"activeTab",2);X([w({type:Boolean})],Y.prototype,"isPlaying",2);X([w({type:String})],Y.prototype,"playLabel",2);X([w({type:String})],Y.prototype,"moodColor",2);X([w({type:Array})],Y.prototype,"sections",2);X([w({type:String})],Y.prototype,"activeSectionId",2);X([w({type:String})],Y.prototype,"melodyLoop",2);X([w({type:String})],Y.prototype,"chordSound",2);X([w({type:String})],Y.prototype,"melodySound",2);X([w({type:String})],Y.prototype,"chordFeel",2);X([w({type:String})],Y.prototype,"melodyFeel",2);X([w({type:Boolean})],Y.prototype,"backingEnabled",2);X([w({type:Object})],Y.prototype,"feelSettings",2);X([w({type:String})],Y.prototype,"keyRoot",2);X([w({type:String})],Y.prototype,"scaleMode",2);X([w({type:Number})],Y.prototype,"bpm",2);X([w({type:Number})],Y.prototype,"barsPerChord",2);X([w({type:String})],Y.prototype,"songTotal",2);X([w({type:Array})],Y.prototype,"chords",2);X([k()],Y.prototype,"openMenu",2);X([k()],Y.prototype,"feelScope",2);X([k()],Y.prototype,"advOpen",2);Y=X([be("transport-bar")],Y);var ia=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,Z=(t,e,o,i)=>{for(var s=i>1?void 0:i?sa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ia(e,o,s),s};let W=class extends fe{constructor(){super(...arguments),this.activeTab="loop",this.isPlaying=!1,this.playLabel="Play",this.moodColor="#C9A9E0",this.sections=[],this.activeSectionId="A",this.chordSound="Stage Rhodes",this.melodySound="Stage Rhodes",this.chordFeel="Block chords",this.melodyFeel="Smooth",this.melodyLoop="Section",this.feelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.keyRoot="C",this.scaleMode="Major",this.bpm=84,this.barsPerChord=1,this.isSaved=!1,this.chords=[],this.activeSheet=null,this.feelScope=null,this.advOpen=!1}toggleSheet(t){this.activeSheet=this.activeSheet===t?null:t}closeSheet(){this.activeSheet=null}onPlayClick(){const t=this.activeTab==="melody",e=this.activeTab==="song";this.dispatchEvent(new CustomEvent("toggle-play",{detail:{isPlaying:!this.isPlaying,target:t?"melody":e?"song":"chords"},bubbles:!0,composed:!0}))}onSelectSection(t){this.closeSheet(),this.dispatchEvent(new CustomEvent("select-section",{detail:{id:t},bubbles:!0,composed:!0}))}onNewSection(){this.closeSheet(),this.dispatchEvent(new CustomEvent("new-section",{bubbles:!0,composed:!0}))}onSelectSound(t){this.closeSheet(),this.activeTab==="melody"?(this.melodySound=t,v.setMelodySound(t),this.dispatchEvent(new CustomEvent("set-melody-sound",{detail:{sound:t},bubbles:!0,composed:!0}))):(this.chordSound=t,this.dispatchEvent(new CustomEvent("set-chord-sound",{detail:{sound:t},bubbles:!0,composed:!0}))),this.requestUpdate()}get feelChanged(){const t=this.feelSettings||{},e=t.barFeel||{},o=t.advOverride||{};return t.playStyle&&t.playStyle!==q.playStyle||t.swing!==void 0&&t.swing!==q.swing||t.spread!==void 0&&t.spread!==q.spread||t.density!==void 0&&t.density!==q.density||t.humanise!==void 0&&t.humanise!==q.humanise||t.tone&&t.tone!==q.tone||Object.keys(e).length>0||Object.keys(o).length>0}resetFeel(){const t=this.activeTab==="melody";this.feelSettings={...q,barFeel:{},advOverride:{}},this.feelScope=null,t?(this.melodyFeel="Smooth",v.setMelodyFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:"Smooth"},bubbles:!0,composed:!0}))):(this.chordFeel=q.playStyle,v.setPlayStyle(q.playStyle),v.setFeelSettings(this.feelSettings),ke(q.tone),this.dispatchEvent(new CustomEvent("set-feel",{detail:{feel:q.playStyle},bubbles:!0,composed:!0}))),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings}},bubbles:!0,composed:!0})),this.requestUpdate()}fget(t){const e=this.feelSettings||{},o=this.feelScope;return o!==null&&e.barFeel&&e.barFeel[o]&&e.barFeel[o][t]!==void 0?e.barFeel[o][t]:t==="playStyle"?e.playStyle||this.chordFeel||"Block chords":e[t]??q[t]}getNearestStep(t){const e=this.fget(t.k);if(typeof e!="number")return t.steps.find(i=>i.v===e)||t.steps[0];let o=t.steps[0];return t.steps.forEach(i=>{Math.abs(Number(i.v)-Number(e))<Math.abs(Number(o.v)-Number(e))&&(o=i)}),o}onSelectFeelStep(t,e){const o=this.activeTab==="melody",i={...this.feelSettings};if(this.feelScope===null)i[t]=e,t==="playStyle"?o?(this.melodyFeel=e,v.setMelodyFeel(e),this.dispatchEvent(new CustomEvent("set-melody-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):(this.chordFeel=e,v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-chord-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel",{detail:{feel:e,playStyle:e},bubbles:!0,composed:!0}))):t==="tone"&&ke(e);else{const s=this.feelScope,n={...i.barFeel||{}};n[s]={...n[s]||{},[t]:e},i.barFeel=n}this.feelSettings=i,o?v.setMelodyFeelSettings(this.feelSettings):v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},key:t,value:e,chordIndex:this.feelScope},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("set-feel-settings",{detail:{[t.toLowerCase()]:e},bubbles:!0,composed:!0})),this.requestUpdate()}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle"),o=+(t("spread")/100).toFixed(2),i=+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),s=+(t("humanise")/100).toFixed(2),n=+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2);return{spread:o,duration:i,variance:s,micro:n}}onAdvInput(t,e){const o={...this.feelSettings};o.advOverride={...o.advOverride||{},[t]:e},this.feelSettings=o,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:o.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onAdvRelink(t){const e={...this.feelSettings};if(e.advOverride){const o={...e.advOverride};delete o[t],e.advOverride=o}this.feelSettings=e,v.setFeelSettings(this.feelSettings),this.dispatchEvent(new CustomEvent("feel-settings-change",{detail:{feelSettings:{...this.feelSettings},advOverride:e.advOverride},bubbles:!0,composed:!0})),this.requestUpdate()}onBpmChange(t){const e=Math.max(40,Math.min(240,this.bpm+t));this.dispatchEvent(new CustomEvent("set-bpm",{detail:{bpm:e},bubbles:!0,composed:!0}))}onBarsChange(t){this.dispatchEvent(new CustomEvent("set-bars-per-chord",{detail:{bars:t},bubbles:!0,composed:!0}))}onKeyRootChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:t,mode:this.scaleMode},bubbles:!0,composed:!0}))}onScaleModeChange(t){this.dispatchEvent(new CustomEvent("set-key",{detail:{root:this.keyRoot,mode:t},bubbles:!0,composed:!0}))}onRerollProgression(){this.closeSheet(),this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onToggleSaved(){this.closeSheet(),this.dispatchEvent(new CustomEvent(this.isSaved?"unsave-set":"save-set",{bubbles:!0,composed:!0}))}onViewSavedLoops(){this.closeSheet(),this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}onOpenShare(){this.closeSheet(),this.dispatchEvent(new CustomEvent("open-share",{bubbles:!0,composed:!0}))}onLoopCycle(){const t=["Section","Chord","Span"],e=t[(t.indexOf(this.melodyLoop)+1)%3];this.melodyLoop=e,this.dispatchEvent(new CustomEvent("loop-cycle",{detail:{melodyLoop:e},bubbles:!0,composed:!0}))}render(){const t=this.activeTab==="melody",e=this.activeTab==="song",o=this.sections.find((l,d)=>(l.id||String.fromCharCode(65+d))===this.activeSectionId)||this.sections[0]||{id:"A",name:"Chorus",tint:"#F1E4CC",progression:null},i=o.id||o.name.charAt(0),s=this.isPlaying?"#FBF3E6":this.moodColor,n=this.isPlaying?"■":"▶",r=t?this.melodySound:this.chordSound;t?this.melodyFeel:this.chordFeel;const a=this.chords&&this.chords.length>0?this.chords:o?.progression?.chords?.length?o.progression.chords:[{name:"Chord 1"},{name:"Chord 2"},{name:"Chord 3"},{name:"Chord 4"}];return g`
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
          <span class="sec-letter-badge" style="background: ${o.tint||"#F1E4CC"};">
            ${i}
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

          ${t?g`
            <button
              class="dock-btn"
              @click=${this.onLoopCycle}
              aria-label="Change what loops"
              style="font-size: 11px; font-weight: 800; padding: 0 8px;"
            >
              Loop ${this.melodyLoop}
            </button>
          `:""}
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
            ${this.sections.map((l,d)=>{const c=l.id||String.fromCharCode(65+d);return g`
                <button
                  class="popover-menu-item"
                  style="flex-direction: row; align-items: center; gap: 10px; background: ${c===this.activeSectionId?"#F1E4CC":"transparent"};"
                  @click=${()=>this.onSelectSection(c)}
                >
                  <span class="sec-letter-badge" style="background: ${l.tint||"#F1E4CC"};">${c}</span>
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
            ${Gs.map(l=>g`
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
            ${Vs.map(l=>g`
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
        <div class="bottom-sheet" style="max-height: calc(100% - 24px); overflow-y: auto;">
          <div class="sheet-handle"></div>
          <div style="display: flex; align-items: center; gap: 10px; padding: 2px 0 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">
              ${t?"Melody feel":"Chord feel"}
            </div>
            ${this.feelChanged?g`
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
            ${a.map((l,d)=>{const c=this.feelScope===d,p=!!(this.feelSettings?.barFeel&&this.feelSettings.barFeel[d]&&Object.keys(this.feelSettings.barFeel[d]).length>0),u=l.name||"Chord "+(d+1);return g`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${c?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${c?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"}; flex-shrink: 0;"
                  @click=${()=>{this.feelScope=d}}
                  aria-label="${u}, ${c?"editing":"edit feel"}"
                >
                  ${u}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${c?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${p?1:0}; transition: opacity 150ms ease;"></span>
                </button>
              `})}
          </div>

          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${this.feelScope===null?"Everything below applies to every chord in this section.":`Only ${a[this.feelScope]?.name||"Chord "+(this.feelScope+1)} plays this way. The rest keep the section feel.`}
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
            ${yo.map(l=>{const d=this.getNearestStep(l);return g`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F);">${l.label}</span>
                    <span style="font-size: 11px; font-weight: 600; color: #6B5F50;">${l.hint}</span>
                  </div>
                  <div class="pill-group">
                    ${l.steps.map(c=>{const p=c.v===d.v;return g`
                        <button
                          type="button"
                          class="pill-btn ${p?"selected":""}"
                          @click=${()=>this.onSelectFeelStep(l.k,c.v)}
                          aria-label="${l.label}: ${c.name}"
                        >
                          ${c.name}
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

          ${this.advOpen?g`
            <div style="border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; display: flex; flex-direction: column; gap: 14px;">
              ${qs.map(l=>{const d=this.feelSettings?.advOverride||{},c=this.getDerivedParams(),p=d[l.k]!==void 0,u=p?d[l.k]:c[l.k];return g`
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="font-size: 12px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${l.label}</div>
                      <button
                        type="button"
                        @click=${()=>this.onAdvRelink(l.k)}
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
                      max="${l.max}"
                      step="${l.step}"
                      .value="${String(u)}"
                      @input=${h=>this.onAdvInput(l.k,+h.target.value)}
                      aria-label="${l.label}"
                      style="width: 100%; margin-top: 7px; accent-color: #9E5D53; cursor: pointer;"
                    />
                    <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: ${p?"#9E5D53":"rgba(46,39,31,0.36)"}; margin-top: 3px;">
                      ${p?"Set by hand":"From "+l.from}
                    </div>
                  </div>
                `})}
            </div>
          `:""}
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
            ${_s.map(l=>g`
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
    `}};W.styles=ge`
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
  `;Z([w({type:String})],W.prototype,"activeTab",2);Z([w({type:Boolean})],W.prototype,"isPlaying",2);Z([w({type:String})],W.prototype,"playLabel",2);Z([w({type:String})],W.prototype,"moodColor",2);Z([w({type:Array})],W.prototype,"sections",2);Z([w({type:String})],W.prototype,"activeSectionId",2);Z([w({type:String})],W.prototype,"chordSound",2);Z([w({type:String})],W.prototype,"melodySound",2);Z([w({type:String})],W.prototype,"chordFeel",2);Z([w({type:String})],W.prototype,"melodyFeel",2);Z([w({type:String})],W.prototype,"melodyLoop",2);Z([w({type:Object})],W.prototype,"feelSettings",2);Z([w({type:String})],W.prototype,"keyRoot",2);Z([w({type:String})],W.prototype,"scaleMode",2);Z([w({type:Number})],W.prototype,"bpm",2);Z([w({type:Number})],W.prototype,"barsPerChord",2);Z([w({type:Boolean})],W.prototype,"isSaved",2);Z([w({type:Array})],W.prototype,"chords",2);Z([k()],W.prototype,"activeSheet",2);Z([k()],W.prototype,"feelScope",2);Z([k()],W.prototype,"advOpen",2);W=Z([be("mobile-dock")],W);const Hs={oasis:{id:"oasis",name:"Oasis",color:"#F6D98B",font:"Anton, sans-serif",weight:800,pillFs:13,pillTrack:"0.08em",presetId:"guitar",rhythmStyle:"driving_strum",defaultBpm:116,tagline:"Leans on a bright major chord that shouldn’t fit, then walks home",theoryTagline:"Borrowed major ♭III, plagal IV–I, Major III substitution, anchored D4/G4 guitar drone",plain:"leans on a bright chord that shouldn’t fit, then walks home",theory:"borrowed major ♭III, plagal IV–I, sus4 held over a static root",sig:[{k:"Harmony",v:"Borrows a bright chord from outside the key — ♭III or ♭VI — and treats it as if it belonged."},{k:"Cadence",v:"Lands on IV–I rather than V–I, so the ending feels wide open instead of shut."},{k:"Voicing",v:"A sus4 held over a root that never moves, strummed the whole bar."}],hoist:["E♭maj7","Fmaj7","A♭"],genre:"Rock",mood:"Uplifting",favoredKeys:["C","G","D","A","E"],favoredScales:["MAJOR","MIXOLYDIAN"],favoredMoods:["Anthemic","Uplifting"],basisArchetypes:[["C","G","Am","E7","F","G","C","C"],["C","Bb","F","C","C","Bb","F","G"],["C","G","Eb","F","C","G","F","C"]],cMajorBasisChords:["C","G","Am","E7","F","G","C","C"],signatureTricks:[{id:"oasis-major-iii",name:"Major III Lift",roman:"III7",plain:"Replaces the quiet minor iii with a soaring major chord that lifts the whole bar",theory:"Secondary dominant (V7/vi) resolving to IV or vi (e.g. E7 in C major)",semitones:4,quality:"dom7"},{id:"oasis-bvii",name:"Borrowed ♭VII",roman:"♭VII",plain:"Mixolydian borrowing that gives that anthem swagger",theory:"Flattened 7th major triad borrowed from Mixolydian (e.g. B♭ in C major)",semitones:10,quality:"maj"},{id:"oasis-biii",name:"Borrowed ♭III",roman:"♭III",plain:"Surprise bright borrowed lift before walking back to the tonic",theory:"Major chord on the flat third borrowed from parallel minor (e.g. E♭ in C major)",semitones:3,quality:"maj"},{id:"oasis-minor-iv",name:"Minor iv Walkdown",roman:"iv",plain:"Emotional chromatic slide from IV into iv before resolving home to I",theory:"Plagal cadence with borrowed minor subdominant (e.g. Fm in C major)",semitones:5,quality:"min"}]},beatles:{id:"beatles",name:"The Beatles",color:"#F4B266",font:"'Plus Jakarta Sans', sans-serif",weight:800,pillFs:12.5,pillTrack:"0.03em",presetId:"rhodes",rhythmStyle:"straight_8ths",defaultBpm:108,tagline:"Warm 60s melodic surprises with bittersweet minor cadences",theoryTagline:"Minor iv cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",plain:"warm 60s melodic surprises with bittersweet minor cadences",theory:"minor iv plagal cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines",sig:[{k:"Harmony",v:"Bittersweet minor iv plagal cadences and unexpected chromatic shifts."},{k:"Motion",v:"Secondary dominants resolving to unexpected diatonic steps."},{k:"Melody",v:"Descending inner voice motion held together by strong vocal counterpoint."}],hoist:["Fm","D7","E7"],genre:"Pop",mood:"Warm",favoredKeys:["C","G","F","D","A","E"],favoredScales:["MAJOR","DORIAN"],favoredMoods:["Warm","Playful"],basisArchetypes:[["C","E7","Am","Fm","C","G7","C","C"],["C","D7","F","C","C","D7","G7","C"],["C","Am","Dm7","G7","F","Fm","C","G7"]],cMajorBasisChords:["C","E7","Am","Fm","C","G7","C","C"],signatureTricks:[{id:"beatles-minor-iv",name:"Minor iv Cadence",roman:"iv",plain:"The ultimate bittersweet Beatles trick: major IV dips into dark minor iv before resolving home",theory:"Minor subdominant borrowing (e.g. Fm in C major, IV -> iv -> I)",semitones:5,quality:"min"},{id:"beatles-major-ii",name:"Secondary Dominant II7",roman:"II7",plain:"Bright, forward-pushing dominant that charges straight into the V chord",theory:"Secondary dominant (V7/V, e.g. D7 in C major -> G7)",semitones:2,quality:"dom7"},{id:"beatles-major-iii",name:"Major III7 Turn",roman:"III7",plain:"Unexpected major push on the 3rd degree leading into the minor relative",theory:"V7/vi resolving to vi (e.g. E7 -> Am in C major)",semitones:4,quality:"dom7"}]},radiohead:{id:"radiohead",name:"Radiohead",color:"#C9A9E0",font:"'Space Mono', monospace",weight:700,pillFs:12.5,pillTrack:"0.02em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:84,tagline:"Swaps chords for their stranger neighbours a third away",theoryTagline:"Chromatic mediants (♭VI, ♭III), parallel modal mixture, haunting voice leading",plain:"swaps a chord for its stranger neighbour a third away",theory:"chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic",sig:[{k:"Harmony",v:"Chromatic mediants: the chord a third away, in the wrong quality."},{k:"Colour",v:"Major and minor of the same key sit side by side, neither one winning."},{k:"Motion",v:"Loops that circle without resolving, often in odd bar lengths."}],hoist:["A♭maj7","E♭maj7","Em7"],genre:"Rock",mood:"Melancholy",favoredKeys:["A","E","C","D","F"],favoredScales:["NATURAL_MINOR","DORIAN","MAJOR"],favoredMoods:["Melancholy","Dark"],basisArchetypes:[["C","E","F","Fm","C","E","F","Fm"],["Am","D","Em","G","Am","F","Em","G"],["C","Ab","Eb","G","C","Ab","Fm","G"]],cMajorBasisChords:["C","E","F","Fm","C","E","F","Fm"],signatureTricks:[{id:"radiohead-chromatic-mediant",name:"Chromatic Mediant",roman:"III",plain:"Jumps from I straight to major III, sharing one note while every other voice twists",theory:"Chromatic mediant with smooth half-step voice leading (e.g. C -> E in C major)",semitones:4,quality:"maj"},{id:"radiohead-bvi",name:"Parallel ♭VI Mediant",roman:"♭VI",plain:"Dark, cinematic plunge into the flat-sixth from parallel minor",theory:"Modal borrowing of ♭VI (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"radiohead-minor-iv",name:"Minor iv Fade",roman:"iv",plain:"Plunges the IV into minor iv for that haunting Thom Yorke descent",theory:"Borrowed minor iv (e.g. Fm in C major)",semitones:5,quality:"min"}]},nirvana:{id:"nirvana",name:"Nirvana",color:"#F2A79B",font:"'Rock Salt', cursive",weight:400,pillFs:10,pillTrack:"0",presetId:"stab",rhythmStyle:"heavy_strum",defaultBpm:118,tagline:"Moves the root in visceral jumps with raw parallel power chords",theoryTagline:"Minor third and tritone root jumps, parallel chromatic triads, open 5ths",plain:"moves the root in big jumps and leaves the middle empty",theory:"power-chord roots by minor third and tritone — no thirds, so major or minor stays open",sig:[{k:"Motion",v:"Roots jump by minor third and tritone instead of stepping."},{k:"Voicing",v:"Power chords with no third, so major or minor stays undecided."},{k:"Space",v:"The middle register is left empty; the weight is at the bottom."}],hoist:["A♭","E♭maj7","B♭"],genre:"Rock",mood:"Dark",favoredKeys:["E","D","F","C","A"],favoredScales:["NATURAL_MINOR","DORIAN","HARMONIC_MINOR"],favoredMoods:["Dark","Tense"],basisArchetypes:[["C","Eb","Ab","F","C","Eb","Ab","F"],["C","F","Eb","Ab","C","F","Eb","Ab"],["Am","F","D","F","Am","F","D","G"]],cMajorBasisChords:["C","Eb","Ab","F","C","Eb","Ab","F"],signatureTricks:[{id:"nirvana-biii",name:"Parallel ♭III Shift",roman:"♭III",plain:"Power chord slide up a minor 3rd, breaking diatonic scale rules with raw energy",theory:"Symmetric minor 3rd jump (e.g. C -> E♭)",semitones:3,quality:"maj"},{id:"nirvana-bvi",name:"Parallel ♭VI Jump",roman:"♭VI",plain:"Visceral jump to the flat 6th before dropping down to IV",theory:"Parallel chromatic power motion (e.g. A♭ in C major)",semitones:8,quality:"maj"},{id:"nirvana-bvii",name:"Subtonic ♭VII Slam",roman:"♭VII",plain:"Heavy punk rock bounce on the flat-7th",theory:"Whole-step drop from tonic (e.g. B♭ in C major)",semitones:10,quality:"maj"}]},"steely-dan":{id:"steely-dan",name:"Steely Dan",color:"#9CC0EC",font:"'Playfair Display', serif",weight:700,italic:!0,pillFs:13,pillTrack:"0.01em",presetId:"rhodes",rhythmStyle:"syncopated_16ths",defaultBpm:112,tagline:"Adds one note that makes a plain chord sound expensive",theoryTagline:"Mu-major (add9 without 7th), ii–V–I jazz chains, tritone substitutions",plain:"adds one note that makes a plain chord sound expensive",theory:"major triad plus 9th with no 7th, ii–V chains, tritone substitution",sig:[{k:"Harmony",v:"One added 9th over a plain triad, and the 7th left out."},{k:"Motion",v:"ii–V chains that keep handing off to the next key."},{k:"Substitution",v:"A tritone sub where the dominant was expected."}],hoist:["Cmaj9","D♭7","Fm7"],genre:"Jazz-ish",mood:"Warm",favoredKeys:["C","F","G","D","Bb","Eb"],favoredScales:["MAJOR","DORIAN","MIXOLYDIAN"],favoredMoods:["Warm","Peaceful"],basisArchetypes:[["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],["Cmaj9","Dm7","Db7","Cmaj9","Em7","A7","Dm7","G7"],["Cmaj9","Am7","Dm7","Fm7","Em7","A7","Dm7","G7"]],cMajorBasisChords:["Cmaj9","F","Em7","A7","Dm7","G7","Cmaj9","Cmaj9"],signatureTricks:[{id:"steely-mu-major",name:"Mu-Major (add9)",roman:"I(add9)",plain:"Major triad with the 2nd added right against the 3rd—the signature Donald Fagen sound",theory:"Major triad + 9th with no 7th, creating smooth cluster dissonance (e.g. Cmaj9 / Cadd9)",semitones:0,quality:"maj9"},{id:"steely-tritone-sub",name:"Tritone Substitution",roman:"subV7",plain:"Swaps out the dominant G7 for D♭7, sliding smoothly into C by a half-step",theory:"Dominant 7th a tritone away (e.g. D♭7 -> C in C major)",semitones:1,quality:"dom7"},{id:"steely-secondary-dominant",name:"Secondary VI7 Turn",roman:"VI7",plain:"Jazz approach chord setting up the ii-V turnaround",theory:"Secondary dominant to ii (e.g. A7 -> Dm7 in C major)",semitones:9,quality:"dom7"}]},"mac-demarco":{id:"mac-demarco",name:"Mac DeMarco",color:"#B8CC9E",font:"'Archivo Black', sans-serif",weight:400,pillFs:12,pillTrack:"-0.01em",presetId:"juno-pad",rhythmStyle:"slow_arpeggio",defaultBpm:92,tagline:"Two lush chords looped loose, bass sliding underneath",theoryTagline:"Maj7 to min7 descending walkdowns, chromatic bass motion, unresolved floating feel",plain:"two lush chords looped loose, bass sliding underneath",theory:"maj7 vamp with chromatic bass motion, no real resolution",sig:[{k:"Harmony",v:"Two maj7 chords vamped, no third chord needed."},{k:"Motion",v:"The bass slides chromatically underneath while the chords sit still."},{k:"Feel",v:"Nothing resolves; the loop just keeps leaning."}],hoist:["Fmaj7","Cmaj9","Em7"],genre:"Lo-fi/Chill",mood:"Warm",favoredKeys:["D","C","A","G","F"],favoredScales:["MAJOR","LYDIAN"],favoredMoods:["Dreamy","Peaceful"],basisArchetypes:[["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],["Dm7","Em7","Fmaj7","Em7","Dm7","Em7","Fmaj7","G7"],["Fmaj7","Abmaj7","Cmaj7","Em7","Fmaj7","G7","Cmaj7","Cmaj7"]],cMajorBasisChords:["Fmaj7","Em7","Dm7","Cmaj7","Fmaj7","G7","Cmaj7","Cmaj7"],signatureTricks:[{id:"mac-maj7-vamp",name:"Lush Maj7 Step",roman:"IVmaj7",plain:"Opens on a lazy, dreamy major 7th chord that floats without rushing to resolve",theory:"Major 7th on the subdominant (e.g. Fmaj7 in C major)",semitones:5,quality:"maj7"},{id:"mac-chromatic-approach",name:"Chromatic Approach",roman:"♭VImaj7",plain:"Dreamy modulation borrowed from parallel minor with chorus warble",theory:"Borrowed ♭VImaj7 (e.g. A♭maj7 in C major)",semitones:8,quality:"maj7"},{id:"mac-stepdown",name:"Smooth iiim7 Stepdown",roman:"iiim7",plain:"Gentle stepdown connecting the IVmaj7 to iim7",theory:"Diatonic minor 7th stepdown (e.g. Em7 in C major)",semitones:4,quality:"min7"}]}},Js=Object.values(Hs);function Ae(t){if(!t)return;const e=t.toLowerCase().trim().replace(/\s+/g,"-");return Hs[e]||Js.find(o=>o.name.toLowerCase()===t.toLowerCase().trim())}function na(t,e,o="C",i="MAJOR"){if(!e)return null;const s=Ae(e);if(!s)return null;const n=o&&St.includes(o)?o:s.favoredKeys&&s.favoredKeys.length?s.favoredKeys[Math.floor(Math.random()*s.favoredKeys.length)]:"C",r=i&&s.favoredScales?.includes(i)?i:s.favoredScales&&s.favoredScales.length?s.favoredScales[Math.floor(Math.random()*s.favoredScales.length)]:"MAJOR",a=s.favoredMoods&&s.favoredMoods.length?s.favoredMoods[Math.floor(Math.random()*s.favoredMoods.length)]:s.mood;let l=null;if(Math.random()<.5)try{const c=ko(t,s.genre,a,{key:n,scaleType:r,length:8});if(c&&c.chords.length===8){const p=Math.random()<.5?2:3,u=Math.random()<.5?5:6,h=[p];Math.random()<.6&&h.push(u);const m=c.chords.map((f,b)=>{if(h.includes(b)&&s.signatureTricks.length>0){const I=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],S=$o(I,n,r),{root:A,suffix:F}=bo(S.chordName);let $=F||"maj";return $==="m"&&($="min"),{root:A,quality:$}}const{root:y,suffix:x}=bo(f.name);let C=x||"maj";return C==="m"&&(C="min"),{root:y,quality:C}});l=fi(t,n,r,m,s.genre,a)}}catch{l=null}if(!l){const c=s.basisArchetypes&&s.basisArchetypes.length>0?s.basisArchetypes:[s.cMajorBasisChords],p=[...c[Math.floor(Math.random()*c.length)]];if(Math.random()<.4&&s.signatureTricks.length>0){const y=Math.floor(Math.random()*(p.length-1))+1,x=s.signatureTricks[Math.floor(Math.random()*s.signatureTricks.length)],C=$o(x,"C","MAJOR");p[y]=C.chordName}const u=U[n]??0,h=U.C,m=((u-h)%12+12)%12,f=j(n,r),b=p.map(y=>{const x=As(y,m,f),{root:C,suffix:I}=bo(x);let S=I||"maj";return S==="m"&&(S="min"),{root:C,quality:S}});l=fi(t,n,r,b,s.genre,a)}return l?{...l,genre:s.genre,mood:a,bpm:s.defaultBpm}:null}function $o(t,e,o){const i=U[e]??0,s=j(e,o),n=((i+t.semitones)%12+12)%12,r=t.roman.includes("♭")||t.roman.includes("b")||t.roman.includes("subV")||s,a=z(n,r);let l="";switch(t.quality){case"maj":l="";break;case"min":l="m";break;case"dom7":l="7";break;case"min7":l="m7";break;case"maj7":l="maj7";break;case"maj9":l="maj9";break;case"sus4":l="sus4";break;default:l=t.quality;break}return{chordName:`${a}${l}`,root:a,quality:t.quality,roman:t.roman}}function xi(t,e,o){if(!o)return[];const i=Ae(o);if(!i)return[];const s=j(t,e);return i.signatureTricks.map(n=>{const r=$o(n,t,e),a=U[r.root]??0,l=n.quality==="min"?[0,3,7]:n.quality==="dom7"?[0,4,7,10]:n.quality==="min7"?[0,3,7,10]:n.quality==="maj7"?[0,4,7,11]:n.quality==="maj9"?[0,2,4,7]:[0,4,7],d=Gt(r.root,n.quality,s),c=l.map(p=>z(a+p,d));return{trick:n,chordName:r.chordName,roman:r.roman,notes:c,plain:n.plain,theory:n.theory,tension:n.quality==="dom7"?.65:n.semitones===4?.55:.4}})}const io={Oasis:{l1:"OA",l2:"SIS",font:"Anton, sans-serif",pillFs:13,pillTrack:"0.08em"},Radiohead:{l1:"RADIO",l2:"HEAD",font:"'Space Mono', monospace",pillFs:12.5,pillTrack:"0.02em",weight:700},Nirvana:{l1:"NIR",l2:"VANA",font:"'Rock Salt', cursive",pillFs:10,pillTrack:"0",weight:400},"Steely Dan":{l1:"STEELY",l2:"DAN",font:"'Playfair Display', serif",pillFs:13,pillTrack:"0.01em",weight:700,italic:!0},"Mac DeMarco":{l1:"mac",l2:"demarco",font:"'Archivo Black', sans-serif",pillFs:12,pillTrack:"-0.01em",weight:400},"The Beatles":{l1:"THE",l2:"BEATLES",font:"'Plus Jakarta Sans', sans-serif",pillFs:12.5,pillTrack:"0.03em",weight:800}},Yi={Oasis:[{roman:"♭III",chord:"E♭maj7",name:"Borrowed ♭III",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"IV",chord:"Fmaj7",name:"Plagal landing",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"♭VI",chord:"A♭",name:"Borrowed ♭VI",role:"Borrowed",semitones:8,quality:"maj"}],Radiohead:[{roman:"♭VI",chord:"A♭maj7",name:"Chromatic mediant",role:"Borrowed",semitones:8,quality:"maj7"},{roman:"♭III",chord:"E♭maj7",name:"Modal mixture",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"iii",chord:"Em7",name:"A third away",role:"Mediant",semitones:4,quality:"min7"}],Nirvana:[{roman:"♭VI",chord:"A♭",name:"Minor-third jump",role:"Borrowed",semitones:8,quality:"maj"},{roman:"♭III",chord:"E♭maj7",name:"Flat-third root",role:"Borrowed",semitones:3,quality:"maj7"},{roman:"♭VII",chord:"B♭",name:"Root drops away",role:"Borrowed",semitones:10,quality:"maj"}],"Steely Dan":[{roman:"I9",chord:"Cmaj9",name:"Added 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"♭II7",chord:"D♭7",name:"Tritone sub",role:"Borrowed",semitones:1,quality:"dom7"},{roman:"iv",chord:"Fm7",name:"Minor iv",role:"Borrowed",semitones:5,quality:"min7"}],"Mac DeMarco":[{roman:"IV",chord:"Fmaj7",name:"maj7 vamp",role:"Subdominant",semitones:5,quality:"maj7"},{roman:"I9",chord:"Cmaj9",name:"Add the 9th",role:"Tonic",semitones:0,quality:"maj9"},{roman:"iii",chord:"Em7",name:"Never resolves",role:"Mediant",semitones:4,quality:"min7"}],"The Beatles":[{roman:"iv",chord:"Fm",name:"Minor iv fade",role:"Borrowed",semitones:5,quality:"min"},{roman:"III7",chord:"E7",name:"Major III lift",role:"Dominant",semitones:4,quality:"dom7"},{roman:"II7",chord:"D7",name:"Take the II7",role:"Subdominant",semitones:2,quality:"dom7"}]};function Ys(t,e,o="C",i="MAJOR"){const s=Ae(e);if(!s)return null;const n=Yi[s.name]||Yi[s.id];if(!n||!n.length)return null;const r=n.map(c=>{const p=$o({id:c.name,name:c.name,roman:c.roman,semitones:c.semitones,quality:c.quality},o,i);return{roman:c.roman,chord:p.chordName,name:c.name,role:c.role,semitones:c.semitones}}),a=String(t.functionLabel||"");let l=1;/^Subdominant/.test(a)?l=1:/Dominant/.test(a)?l=r.length-1:/^Tonic/.test(a)&&(l=0);const d=[l].concat(r.map((c,p)=>p).filter(c=>c!==l));for(let c=0;c<d.length;c++){const p=r[d[c]];if(p&&p.chord!==t.name)return p}return null}var ra=Object.defineProperty,aa=Object.getOwnPropertyDescriptor,je=(t,e,o,i)=>{for(var s=i>1?void 0:i?aa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ra(e,o,s),s};const la=[52,76,100];let Ee=class extends fe{constructor(){super(...arguments),this.swapIndex=0,this.feelings=[],this.activeFeel="Darker",this.pickedChord=null,this.padCols=4,this.moodColor="#9CC0EC",this.band=null}onPick(t,e){this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onRevert(){this.baseChord&&this.dispatchEvent(new CustomEvent("swap-audition",{detail:{chordName:this.baseChord.name,roman:this.baseChord.roman||"",notes:this.baseChord.notes||[],sub:this.baseChord.functionLabel||"",tension:this.baseChord.tension||.3,feel:"Original",chord:this.baseChord},bubbles:!0,composed:!0}))}onClose(){this.dispatchEvent(new CustomEvent("swap-close",{bubbles:!0,composed:!0}))}render(){const t=Math.max(1,this.padCols||4),e=this.swapIndex%t,o=100/t,i=`calc(${e*o}% + ${o/2}% - 8px)`,s=this.chord,n=s?.name||"",r=s?.tension??.3,a=ne(r).color,l=this.baseChord?.name||n,d=ne(this.baseChord?.tension??r).color,c=!!(this.baseChord&&this.baseChord.name!==n),p=c?`Bar ${this.swapIndex+1} is now ${n}`:`Bar ${this.swapIndex+1} · swap ${n} for…`,u=c?`Was ${l}.`:"Tap one to hear it in place. Undo puts it back.";return g`
      <div class="tray-wrapper" data-swap-lane="1">
        <div class="tray-pointer" style="left: ${i};"></div>
        <div class="tray-card">
          <!-- Tray Header Row -->
          <div class="tray-header">
            <span class="tray-swatch" style="background: ${a};"></span>
            <span class="tray-title">${p}</span>
            <span class="tray-sub">${u}</span>
            <div class="tray-spacer"></div>

            ${c?g`
              <button
                class="tray-revert-btn"
                style="background: ${d};"
                @click=${this.onRevert}
                aria-label="Revert to ${l}"
              >
                Back to ${l}
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
            ${this.feelings.map(h=>{const m=ne(h.tension).color,f=(h.rows||[]).slice(0,3);return g`
                <div class="tray-group-col">
                  <div class="tray-group-header">
                    <span class="tray-group-name">${h.name}</span>
                    <span class="tray-group-sub">${h.sub}</span>
                  </div>

                  <div class="tray-chips-row">
                    ${f.map((b,y)=>{const x=b.name===n,C=la[y]||100,I=`color-mix(in srgb, ${m} ${C}%, #FBF3E6)`;return g`
                        <button
                          class="tray-chip ${x?"selected":""}"
                          style="${x?`box-shadow: 0 0 0 2px ${m};`:`background: ${I}; color: #2E271F;`}"
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
    `}};Ee.styles=ge`
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
  `;je([w({type:Number})],Ee.prototype,"swapIndex",2);je([w({type:Object})],Ee.prototype,"chord",2);je([w({type:Object})],Ee.prototype,"baseChord",2);je([w({type:Array})],Ee.prototype,"feelings",2);je([w({type:String})],Ee.prototype,"activeFeel",2);je([w({type:Object})],Ee.prototype,"pickedChord",2);je([w({type:Number})],Ee.prototype,"padCols",2);je([w({type:String})],Ee.prototype,"moodColor",2);je([w({type:Object})],Ee.prototype,"band",2);Ee=je([be("chord-swap-lane")],Ee);var ca=Object.defineProperty,da=Object.getOwnPropertyDescriptor,re=(t,e,o,i)=>{for(var s=i>1?void 0:i?da(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ca(e,o,s),s};const Wi={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},Ki=["A","S","D","F","Z","X","C","V"],pa=["OCTAVE UP","1ST INVERSION","LOW ROOT"];function Xi(t){if(!t)return-1;const e=t.toLowerCase();return e.includes("octave")||e.includes("high")?0:e.includes("inversion")||e.includes("1st")?1:e.includes("root")||e.includes("low")?2:-1}let ee=class extends fe{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Emotional",key:"C",scaleType:"MAJOR",bpm:84,chords:[]},this.chordData={chords:{},scales:{}},this.moodColor="#C9A9E0",this.selectedBand=null,this.isPlaying=!1,this.activeIndex=-1,this.showTheory=!1,this.swapIndex=null,this.activeSwapFamily="Darker",this.abPick=null,this.padHeld=null,this.gridFor=null,this.baseChords=[],this.lastPad=null,this.padVoice={},this.auditionDeg=null,this.auditionName=null,this.auditionBar=null,this.padTimer=null,this.gridTimer=null,this.handleWindowKeyDown=t=>{const e=document.activeElement;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||t.ctrlKey||t.metaKey||t.altKey)return;const o=t.key.toUpperCase(),i=Ki.indexOf(o);i>=0&&this.progression?.chords?.[i]&&(t.preventDefault(),this.handlePadKey(t,i))}}getChordLadder(t){if(!t)return[];const e=String(t.name),o=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4","13sus4"]:/dim/.test(e)?["dim","dim7","dim9","m7b5","alt"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>o+s)}ladderHome(t){const o=this.getChordLadder(t).indexOf(t?t.name:"");return o>=0?o:0}getRungLabels(t){const e=t.map(s=>String(s).replace(/^[A-G][#b]?/,"")),o=e[0];let i=e.slice();return o&&e.every((s,n)=>n===0||s.indexOf(o)===0)?i=e.map((s,n)=>n?s.slice(o.length):s):o&&e.every((s,n)=>n===0||s.slice(-o.length)===o)&&(i=e.map((s,n)=>n?s.slice(0,s.length-o.length):s)),i.map(s=>(s===""?"maj":s).replace(/maj/gi,"△"))}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleWindowKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleWindowKeyDown),this.padTimer&&clearTimeout(this.padTimer),this.gridTimer&&clearTimeout(this.gridTimer)}updated(t){if(super.updated(t),t.has("progression")&&this.progression?.chords){let e=!1;const o={...this.padVoice};this.progression.chords.forEach((i,s)=>{if(i.voicing&&typeof o[`${s}`]!="number"){const n=Xi(i.voicing);n>=0&&(o[`${s}`]=n,e=!0)}}),e&&(this.padVoice=o)}}handlePadDown(t,e){const o=this.progression?.chords?.[e];if(!o)return;let i="low, root position",s=2,n=null;const r=t.currentTarget;if(r){try{r.setPointerCapture(t.pointerId)}catch{}if(r.getBoundingClientRect&&typeof t.clientY=="number"){const h=r.getBoundingClientRect(),m=Math.min(.999,Math.max(0,(t.clientY-h.top)/(h.height||1)));s=m<.34?0:m<.67?1:2,i=s===0?"up an octave":s===1?"1st inversion":"low, root position";const f=this.getChordLadder(o),b=parseFloat(getComputedStyle(r).paddingLeft)||14,y=Math.min(.999,Math.max(0,(t.clientX-h.left-b)/(h.width-2*b||1)));n=Math.min(f.length-1,Math.max(0,Math.floor(y*f.length)))}}const a=88+e%3*6;clearTimeout(this.padTimer),clearTimeout(this.gridTimer),this.padHeld=e,this.gridFor=e,this.lastPad={idx:e,voicing:i,vel:a,zone:s,reach:n};const l=this.getChordLadder(o),d=n!==null&&l[n]?l[n]:o.name,c=this.progression?.key||"C",p=this.progression?.scaleType||"MAJOR",u=V(d,j(c,p));v.playChordNotes(u,.85,i,a),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:o,voicing:i,activeChordName:d},bubbles:!0,composed:!0})),this.requestUpdate()}handlePadMove(t,e){if(this.padHeld!==e)return;const o=this.progression?.chords?.[e];if(!o)return;const i=t.currentTarget;if(i&&i.getBoundingClientRect&&typeof t.clientY=="number"){const s=i.getBoundingClientRect(),n=Math.min(.999,Math.max(0,(t.clientY-s.top)/(s.height||1))),r=n<.34?0:n<.67?1:2,a=r===0?"up an octave":r===1?"1st inversion":"low, root position",l=this.getChordLadder(o),d=parseFloat(getComputedStyle(i).paddingLeft)||14,c=Math.min(.999,Math.max(0,(t.clientX-s.left-d)/(s.width-2*d||1))),p=Math.min(l.length-1,Math.max(0,Math.floor(c*l.length)));if(this.lastPad?.zone!==r||this.lastPad?.reach!==p){this.lastPad={idx:e,voicing:a,vel:this.lastPad?.vel||90,zone:r,reach:p};const u=p!==null&&l[p]?l[p]:o.name,h=this.progression?.key||"C",m=this.progression?.scaleType||"MAJOR",f=V(u,j(h,m));v.playChordNotes(f,.5,a,85),this.requestUpdate()}}}handlePadUp(t,e){const o=t?.currentTarget;if(o&&t?.pointerId!==void 0)try{o.releasePointerCapture(t.pointerId)}catch{}if(this.padHeld===null)return;const i=this.padHeld,s=this.lastPad;if(this.padHeld=null,clearTimeout(this.gridTimer),this.gridTimer=setTimeout(()=>{this.padHeld===null&&(this.gridFor=null,this.requestUpdate())},600),s&&s.idx===i&&this.progression&&this.progression.chords[i]){const n=this.progression.chords[i];this.padVoice={...this.padVoice,[`${i}`]:s.zone};let r={...n,voicing:s.voicing};if(typeof s.reach=="number"){const d=this.getChordLadder(n)[s.reach];if(d){const c=this.progression.key||"C",p=this.progression.scaleType||"MAJOR",u=V(d,j(c,p));r={...r,name:d,notes:u}}}const a=[...this.progression.chords];a[i]=r,this.progression={...this.progression,chords:a},this.lastPad={...s,reach:null},v.setProgression(this.progression),this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:a},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("progression-change",{detail:this.progression,bubbles:!0,composed:!0}))}this.requestUpdate()}handlePadKey(t,e){if(t.key==="Enter"||t.key===" "){t.preventDefault();const o=this.progression?.chords?.[e];if(!o)return;this.padHeld=e,setTimeout(()=>{this.padHeld===e&&(this.padHeld=null),this.requestUpdate()},200);const i=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR",n=o.notes&&o.notes.length>0?o.notes:V(o.name,j(i,s));v.playChordNotes(n,.85,o.voicing||"1st inversion",90),this.dispatchEvent(new CustomEvent("chord-play",{detail:{index:e,chord:o},bubbles:!0,composed:!0}))}}openSwap(t){this.swapIndex===t?this.swapIndex=null:(this.swapIndex=t,this.abPick=null),this.requestUpdate()}openDetail(t){const e=this.progression?.chords?.[t];this.dispatchEvent(new CustomEvent("chord-detail-open",{detail:{index:t,chord:e},bubbles:!0,composed:!0}))}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,o=vi(this.chordData,this.progression),i=Co(this.chordData,this.progression),s=o.map(d=>({name:d.name,sub:d.sub||"",tension:d.tension,rows:d.rows.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:i.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))});const n=s.filter(d=>d.name!=="Borrowed").sort((d,c)=>d.tension-c.tension),r=s.filter(d=>d.name==="Borrowed"),a=[...n,...r],l=this.selectedBand?Ae(this.selectedBand):null;if(l){const d=xi(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),c=new Map(d.map(p=>[p.chordName,p]));a.forEach(p=>{const u=p.rows.map(h=>{const m=c.get(h.name);return m?{...h,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?m.theory:m.plain}:h});p.rows=u})}return a}willUpdate(t){if(t.has("progression")){const e=this.progression?.chords||[];(!this.baseChords.length||this.baseChords.length!==e.length)&&(this.baseChords=[...e])}}handleSwapAudition(t){if(this.swapIndex===null)return;const e=this.swapIndex,o=this.progression.chords[e],i=this.progression?.key||"C",s=this.progression?.scaleType||"MAJOR",n=t.chordName||t.chord?.name||o?.name||"C",r=t.notes&&t.notes.length>0?t.notes:t.chord?.notes&&t.chord.notes.length>0?t.chord.notes:V(n,j(i,s)),a=t.chord||{...o,name:n,roman:t.roman||o?.roman||"",functionLabel:t.sub||o?.functionLabel||"LIFTING",tension:t.tension??o?.tension??.3,voicing:o?.voicing||"1st inversion",notes:r};this.abPick=a;const l=[...this.progression.chords];l[e]=a,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:l},bubbles:!0,composed:!0})),v.playChordNotes(r,.85,a.voicing||"1st inversion",92),this.requestUpdate()}confirmSwap(t){const e=this.swapIndex;if(e===null)return;const o=t.detail.chord,i=[...this.progression.chords];i[e]=o,this.dispatchEvent(new CustomEvent("progression-update",{detail:{chords:i},bubbles:!0,composed:!0})),this.swapIndex=null,this.abPick=null,this.requestUpdate()}updateChordCount(t){const e=this.progression.chords.length,o=Math.max(4,Math.min(8,e+t));o!==e&&this.dispatchEvent(new CustomEvent("set-chord-count",{detail:{count:o},bubbles:!0,composed:!0}))}onReroll(){this.baseChords=[],this.swapIndex=null,this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))}onVibeClick(){this.baseChords=[],this.swapIndex=null,this.dispatchEvent(new CustomEvent("open-vibe-picker",{bubbles:!0,composed:!0}))}render(){const t=this.progression.chords||[],e=this.selectedBand?Ae(this.selectedBand):null,o=4,i=this.showTheory?vr(this.progression.key||"C",this.progression.scaleType||"MAJOR",this.chordData,this.progression):[];return g`
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
        ${t.map((s,n)=>{const r=ne(s.tension||.1),a=this.activeIndex===n&&this.isPlaying,l=this.padHeld===n,d=this.swapIndex===n,c=e?Ys(s,e.name,this.progression.key||"C",this.progression.scaleType||"MAJOR"):null,p=Math.min(t.length-1,(Math.floor((this.swapIndex??0)/o)+1)*o-1),u=this.getChordLadder(s),h=this.ladderHome(s),m=this.lastPad,f=m!==null&&m.idx===n,b=f&&m?m.zone:-1,y=f&&m&&typeof m.reach=="number"?m.reach:h,x=!!(f&&y>=0&&y!==h&&u[y]),C=this.gridFor===n&&u.length>1,I=Xi(s.voicing),S=typeof this.padVoice[`${n}`]=="number"?this.padVoice[`${n}`]:I>=0?I:-1,A=l&&b>=0?b:S,F=l&&f&&m&&typeof m.reach=="number"?m.reach:A>=0?h:-1,$=Math.max(1,u.length),T=`calc((100% - 28px - ${4*($-1)}px) / ${$})`,P=E=>`calc(14px + ${E} * (((100% - 28px - ${4*($-1)}px) / ${$}) + 4px))`,_=this.getRungLabels(u),R=x?y:h,O=l&&x?`→ ${u[y]}`:A>=0?pa[A]:s.voicing?s.voicing.toUpperCase():"";return g`
            <div class="pad-cell-column">
              <div
                class="pad-cell ${l?"pad-held":""} ${d?"selected":""} ${a?"pad-lit":""}"
                style="background: ${r.color};"
                role="button"
                tabindex="0"
                @pointerdown=${E=>this.handlePadDown(E,n)}
                @pointermove=${E=>this.handlePadMove(E,n)}
                @pointerup=${E=>this.handlePadUp(E,n)}
                @pointerleave=${E=>this.handlePadUp(E,n)}
                @pointercancel=${E=>this.handlePadUp(E,n)}
                @keydown=${E=>this.handlePadKey(E,n)}
                aria-label="${s.name}, ${Wi[s.functionLabel]||"in this loop"} — press to play; press nearer the top for a higher voicing"
              >
                <!-- 2D Voicing & Extension Grid Visualizer -->
                <div class="pad-grid-visualizer">
                  ${u.map((E,G)=>g`
                    <div
                      class="grid-col ${G===F?"active-col":""} ${C?"visible":""}"
                      style="left: ${P(G)}; width: ${T};"
                    ></div>
                  `)}
                  ${F>=0&&A>=0?g`
                    <div
                      class="grid-hit-pill"
                      style="
                        left: ${P(F)};
                        width: ${T};
                        top: calc(6px + ${A} * ((100% - 12px) / 3));
                        height: calc((100% - 12px) / 3 - 3px);
                      "
                    ></div>
                  `:""}
                </div>

                <div class="pad-top-row">
                  <div class="pad-key-badge">
                    <span class="pad-key-cap">${Ki[n]||""}</span>
                  </div>
                  ${this.showTheory&&s.roman?g`<span class="pad-roman-badge">${s.roman}</span>`:""}
                </div>

                <div class="pad-bottom-info">
                  <div class="pad-role-label">${Wi[s.functionLabel]||s.functionLabel}</div>
                  <div class="pad-chord-name">${s.name}</div>
                  <div class="pad-meta-label ${x?"reach-active":""}">${O}</div>

                  <div class="rung-dots">
                    ${u.map((E,G)=>g`
                      <div class="rung-step-col">
                        <div
                          class="rung-step-label ${G===R?"active":""}"
                          style="${G===R&&x?`color: ${this.moodColor};`:""}"
                        >
                          ${_[G]}
                        </div>
                        <div
                          class="rung-dot rung-step-bar ${G===R?"filled active":""}"
                          style="${G===R&&x?`background: ${this.moodColor};`:""}"
                        ></div>
                      </div>
                    `)}
                  </div>

                  ${c?g`
                    <div class="band-move-pill" style="border-left: 3px solid ${e?.color||"#2E271F"};">
                      <span>${c.name}: ${c.chord}</span>
                    </div>
                  `:""}
                </div>
              </div>

              <button
                class="pad-tray-btn pad-swap-btn ${d?"active":""}"
                @click=${E=>{E.stopPropagation(),this.openSwap(n)}}
                aria-label="${d?"Close":"Swap"} swaps for ${s.name}"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>
                </svg>
                <span>${d?"Close":"Swap"}</span>
              </button>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex!==null&&n===p?g`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${t[this.swapIndex]}
                .baseChord=${this.baseChords[this.swapIndex]||t[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(t.length,4)}
                .moodColor=${this.moodColor}
                .band=${e?{name:e.name,color:e.color,plain:e.plain}:null}
                @swap-feel-change=${E=>{this.activeSwapFamily=E.detail.feel,this.requestUpdate()}}
                @swap-audition=${E=>this.handleSwapAudition(E.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${()=>{this.swapIndex=null,this.requestUpdate()}}
              ></chord-swap-lane>
            `:""}
          `})}
      </div>

      <!-- 4. Diatonic Scale Strip (Theory Mode) -->
      ${this.showTheory&&i.length?g`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header-row">
            <div class="scale-strip-kicker">Scale · ${(this.progression.key||"C").replace("b","♭")} ${(this.progression.scaleType||"MAJOR").toLowerCase()==="minor"?"natural minor":"major"}</div>
            <div class="scale-strip-hint">
              ${this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`}
            </div>
          </div>
          <div class="scale-degrees-grid">
            ${i.map((s,n)=>{const a=(this.progression.chords||[]).map(c=>c.name.toUpperCase()).indexOf(s.chordName.toUpperCase()),l=a>=0,d=this.auditionDeg===n;return g`
                <button
                  class="scale-degree-btn scale-degree-chip ${l?"in-loop":""} ${d?"active":""}"
                  style="${d?`background: ${this.moodColor};`:""}"
                  @click=${()=>{this.auditionDeg=n,this.auditionName=s.chordName,this.auditionBar=l?a+1:0;const c=this.progression.key||"C",p=this.progression.scaleType||"MAJOR",u=s.notes&&s.notes.length?s.notes:V(s.chordName,j(c,p));v.playChordNotes(u,.8,"1st inversion",88),this.dispatchEvent(new CustomEvent("chord-play",{detail:{chord:{name:s.chordName,notes:u},index:l?a:0},bubbles:!0,composed:!0}))}}
                  aria-label="Hear ${s.chordName}, the ${s.functionLabel.toLowerCase()}"
                >
                  <div class="degree-head-row">
                    <span class="degree-roman">${s.roman}</span>
                    ${l?g`<div class="degree-in-loop-dot"></div>`:""}
                  </div>
                  <div class="degree-name">${s.chordName}</div>
                  <div class="degree-fn">${s.functionLabel}</div>
                </button>
              `})}
          </div>
        </div>
      `:""}
    `}};ee.styles=ge`
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

    @media (max-width: 768px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
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
  `;re([w({type:Object})],ee.prototype,"progression",2);re([w({type:Object})],ee.prototype,"chordData",2);re([w({type:String})],ee.prototype,"moodColor",2);re([w({type:String})],ee.prototype,"selectedBand",2);re([w({type:Boolean})],ee.prototype,"isPlaying",2);re([w({type:Number})],ee.prototype,"activeIndex",2);re([w({type:Boolean})],ee.prototype,"showTheory",2);re([k()],ee.prototype,"swapIndex",2);re([k()],ee.prototype,"activeSwapFamily",2);re([k()],ee.prototype,"abPick",2);re([k()],ee.prototype,"padHeld",2);re([k()],ee.prototype,"gridFor",2);re([k()],ee.prototype,"baseChords",2);re([k()],ee.prototype,"lastPad",2);re([k()],ee.prototype,"padVoice",2);re([k()],ee.prototype,"auditionDeg",2);re([k()],ee.prototype,"auditionName",2);re([k()],ee.prototype,"auditionBar",2);ee=re([be("tab-chords")],ee);var ha=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,te=(t,e,o,i)=>{for(var s=i>1?void 0:i?ua(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ha(e,o,s),s};const ma={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"},Qi=[{name:"C",pc:0,left:12},{name:"D",pc:2,left:53},{name:"E",pc:4,left:94},{name:"F",pc:5,left:135},{name:"G",pc:7,left:176},{name:"A",pc:9,left:217},{name:"B",pc:11,left:258}],Zi=[{name:"C#",pc:1,left:38},{name:"D#",pc:3,left:79},{name:"F#",pc:6,left:161},{name:"G#",pc:8,left:202},{name:"A#",pc:10,left:243}];let K=class extends fe{constructor(){super(),this.progression=null,this.melodyTrack=null,this.activeStepIndex=null,this.guideMode="scale-key",this.contour="Arch",this.density=50,this.octave=4,this.playing=!1,this.backingEnabled=!0,this.isMobile=!1,this.melodyLoop="Section",this.melodySound="Stage Rhodes",this.span=[0,16],this.isDraggingTail=!1,this.selectedGlobalStep=null,this.bloomOctave=4,this.hoverPitchClass=null,this.popoverPos={left:12,top:80,isAbove:!1,stemL:154,stemT:75},this.strictBy="scale",this.dragStartStep=null,this._didDrag=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.selectedGlobalStep!==null&&this.closeBloom()},this.onToggleBacking=()=>{this.backingEnabled=!this.backingEnabled,this.dispatchEvent(new CustomEvent("toggle-backing",{detail:{backingEnabled:this.backingEnabled},bubbles:!0,composed:!0})),this.requestUpdate()},this.onRerollMelody=()=>{if(!this.progression)return;const t=["Arch","AscendingClimax","DescendingSigh","CallAndResponse","OstinatoRiff","AnthemHook"],o=(t.indexOf(this.contour)+1+Math.floor(Math.random()*(t.length-1)))%t.length;this.contour=t[o];const i=Math.floor(Math.random()*1e5)+1,s=ve.generateMelody(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode,strictBy:this.strictBy,seed:i});this.melodyTrack=s,this.requestUpdate(),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:s},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${this.contour} melody`,bubbles:!0,composed:!0}))},this.onClearMelody=()=>{if(!this.progression&&!this.melodyTrack)return;const t=ve.createEmptyTrack(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode});this.melodyTrack=t,this.requestUpdate(),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:"Cleared melody notes",bubbles:!0,composed:!0}))},this.onBloomWheel=t=>{t.stopPropagation(),Math.abs(t.deltaY)>40&&(t.deltaY<0&&this.bloomOctave<7?this.bloomOctave+=1:t.deltaY>0&&this.bloomOctave>2&&(this.bloomOctave-=1))},this._boundPointerMove=this.onTailPointerMove.bind(this),this._boundPointerUp=this.onTailPointerUp.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("pointermove",this._boundPointerMove),window.removeEventListener("pointerup",this._boundPointerUp),window.removeEventListener("pointercancel",this._boundPointerUp),document.body.style.cursor=""}willUpdate(t){t.has("progression")&&this.progression&&(this.melodyTrack||(this.melodyTrack=ve.createEmptyTrack(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode})))}generateDefaultMelody(){if(!this.progression)return;const t=ve.generateMelody(this.progression,{contour:this.contour,density:this.density,octave:this.octave,guideMode:this.guideMode,strictBy:this.strictBy});this.melodyTrack=t,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:t},bubbles:!0,composed:!0}))}onSetStrictBy(t){this.strictBy=t,this.requestUpdate()}onSetGuideMode(t){if(this.guideMode=t,this.melodyTrack&&this.progression){const e={...this.melodyTrack,guideMode:t};this.melodyTrack=e,this.dispatchEvent(new CustomEvent("guide-mode-change",{detail:{mode:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:e},bubbles:!0,composed:!0}))}}getHarmonicClass(t,e){if(t.isClash)return"out";const o=t.chordToneRole;if(o==="root"||o==="3rd"||o==="5th"||o==="7th")return"chord";if(o==="tension"||o==="passing")return"scale";if(o==="chromatic")return"out";if(this.progression){const i=dt(t.midi,e,this.progression.key,this.progression.scaleType);return i.isClash||i.role==="chromatic"?"out":i.role==="root"||i.role==="3rd"||i.role==="5th"||i.role==="7th"?"chord":"scale"}return"chord"}getStepCoverMap(t){const e=new Map;if(!this.melodyTrack?.notes)return e;for(const o of this.melodyTrack.notes){const i=o.barIndex*16+o.stepInBar,s=Math.max(1,Math.round((o.durationBeats||.25)*4)),n=(o.barIndex+1)*16,r=Math.min(s,n-i),a=t[o.barIndex]||t[0],l=this.getHarmonicClass(o,a);for(let d=0;d<r;d++){const c=i+d;e.set(c,{note:o,isStart:d===0,isEnd:d===r-1,lengthInSteps:r,harmonicClass:l})}}return e}onStartLen(t,e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.isDraggingTail=!0,this.dragStartStep=t,this._didDrag=!1,this.closeBloom(),document.body.style.cursor="grabbing",window.addEventListener("pointermove",this._boundPointerMove),window.addEventListener("pointerup",this._boundPointerUp),window.addEventListener("pointercancel",this._boundPointerUp),this.onTailPointerMove(e))}onTailPointerMove(t){if(!this.isDraggingTail||this.dragStartStep===null||!this.melodyTrack)return;const e=this.dragStartStep,o=Math.floor(e/16),i=e%16,s=this.melodyTrack.notes.find(b=>b.barIndex===o&&b.stepInBar===i);if(!s)return;const n=16,r=this.melodyTrack.notes.filter(b=>b.barIndex===o&&b.stepInBar>i),l=(r.length>0?Math.min(...r.map(b=>b.stepInBar)):n)-i;let d=null,c=null;const p=this.shadowRoot;p&&typeof p.elementFromPoint=="function"?c=p.elementFromPoint(t.clientX,t.clientY):typeof document.elementFromPoint=="function"&&(c=document.elementFromPoint(t.clientX,t.clientY));const u=c?.closest(".step-cell");if(u&&u.dataset.step!==void 0){const b=parseInt(u.dataset.step,10);Math.floor(b/16)===o&&(d=b%16)}if(d===null){const b=this.shadowRoot?.querySelector(`.chord-lane[data-bar="${o}"] .steps-16-grid`);if(b){const y=b.getBoundingClientRect();if(y.width>0){const x=t.clientX-y.left,C=y.width/16;d=Math.floor(x/C),d=Math.max(0,Math.min(15,d))}}}if(d===null)return;const h=Math.max(1,Math.min(l,d-i+1)),m=h*.25,f=Math.max(1,Math.round((s.durationBeats||.25)*4));if(h!==f){this._didDrag=!0;const b=this.melodyTrack.notes.map(y=>y.id===s.id?{...y,durationBeats:m}:y);this.melodyTrack={...this.melodyTrack,notes:b},this.requestUpdate(),nt(s.pitch,.15)}}onTailPointerUp(t){this.isDraggingTail&&(this.isDraggingTail=!1,this.dragStartStep=null,document.body.style.cursor="",window.removeEventListener("pointermove",this._boundPointerMove),window.removeEventListener("pointerup",this._boundPointerUp),window.removeEventListener("pointercancel",this._boundPointerUp),this._didDrag&&setTimeout(()=>{this._didDrag=!1},80),this.melodyTrack&&this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:this.melodyTrack},bubbles:!0,composed:!0})))}getLoopRange(){if(this.melodyLoop==="Chord"){const t=this.selectedGlobalStep??0,e=Math.floor(t/16)*16;return[e,e+16]}return this.melodyLoop==="Span"?this.span&&this.span[1]>this.span[0]?this.span:[0,16]:[0,(this.progression?.chords.length||4)*16]}onStepClick(t,e){if(this._didDrag)return;if(e&&e.shiftKey){const u=this.selectedGlobalStep!==null?this.selectedGlobalStep:0,h=Math.min(u,t),m=Math.max(u,t)+1;this.span=[h,m],this.melodyLoop="Span",this.dispatchEvent(new CustomEvent("span-change",{detail:{span:this.span},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("melody-loop-change",{detail:{melodyLoop:"Span",loop:"Span"},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Loop span: steps ${h+1}–${m}`,bubbles:!0,composed:!0})),this.requestUpdate();return}const o=this.progression?.chords||[],s=this.getStepCoverMap(o).get(t);if(s&&!s.isStart)return;const n=this.shadowRoot?.querySelector(".melody-grid-stage"),r=this.shadowRoot?.querySelector(`.step-cell[data-step="${t}"]`),a=Math.floor(t/16),l=t%16,d=308,c=144;if(n&&r){const u=n.getBoundingClientRect(),h=r.getBoundingClientRect(),m=h.left-u.left+h.width/2+12,f=h.top-u.top+h.height/2+12,b=u.width+24;u.height+24;const y=a>=2,x=y?Math.max(4,f-22-c):f+22,C=Math.max(8,Math.min(b-d-8,m-d/2)),I=m-6,S=y?x+c-7:x-5;this.popoverPos={left:C,top:x,isAbove:y,stemL:I,stemT:S}}else{const u=a>=2,h=u?Math.max(8,a*74-150):a*74+70,m=Math.max(8,Math.min(600,140+l*36-154)),f=m+154;this.popoverPos={left:m,top:h,isAbove:u,stemL:f-6,stemT:u?h+c-7:h-5}}this.hoverPitchClass=null;const p=this.getNoteAtStep(t);if(p){this.selectedGlobalStep=p.barIndex*16+p.stepInBar;const u=p.midi;this.bloomOctave=Math.floor(u/12)-1,nt(p.pitch,.4)}else this.selectedGlobalStep=t,this.bloomOctave=this.octave}closeBloom(){this.selectedGlobalStep=null,this.hoverPitchClass=null}getNoteAtStep(t){if(!this.melodyTrack)return;const e=Math.floor(t/16),o=t%16,i=this.melodyTrack.notes.find(s=>s.barIndex===e&&s.stepInBar===o);return i||this.melodyTrack.notes.find(s=>{const n=s.barIndex*16+s.stepInBar,r=Math.max(1,Math.round((s.durationBeats||.25)*4));return t>=n&&t<n+r})}onSelectPitch(t){if(this.selectedGlobalStep===null||!this.progression)return;const e=Math.floor(this.selectedGlobalStep/16),o=this.selectedGlobalStep%16,i=this.progression.chords[e]||this.progression.chords[0],s=`${t}${this.bloomOctave}`,n=ue(s);if(this.guideMode==="strict-chord"){const m=Qe(i,this.progression.key,this.progression.scaleType),f=n%12;if(!(this.strictBy==="chord"?m.chordTonePcs:m.scalePcs.filter(y=>!m.avoidPcs.includes(y))).includes(f)){this.dispatchEvent(new CustomEvent("toast",{detail:`Strict ${this.strictBy} mode: pick an allowed tone`,bubbles:!0,composed:!0}));return}}const r=dt(n,i,this.progression.key,this.progression.scaleType);nt(s,.4,void 0,.85,this.melodySound);const a=(this.melodyTrack?.notes||[]).filter(m=>!(m.barIndex===e&&m.stepInBar===o)),l=a.filter(m=>m.barIndex===e&&m.stepInBar>o),c=(l.length>0?Math.min(...l.map(m=>m.stepInBar)):16)-o,p=Math.max(1,Math.min(2,c)),u={id:`m-note-${e}-${o}-${Date.now()}`,barIndex:e,stepInBar:o,beatOffset:e*4+o/4,durationBeats:p*.25,pitch:s,midi:n,velocity:100,chordToneRole:r.role,isClash:r.isClash},h={...this.melodyTrack,notes:[...a,u].sort((m,f)=>m.beatOffset-f.beatOffset)};this.melodyTrack=h,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:h},bubbles:!0,composed:!0})),this.closeBloom()}onClearCurrentNote(){if(this.selectedGlobalStep===null||!this.melodyTrack)return;const t=this.getNoteAtStep(this.selectedGlobalStep);if(!t)return;const e=this.melodyTrack.notes.filter(i=>i.id!==t.id),o={...this.melodyTrack,notes:e};this.melodyTrack=o,this.dispatchEvent(new CustomEvent("melody-change",{detail:{track:o},bubbles:!0,composed:!0})),this.closeBloom()}onPrevStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep-1+64)%64)}onNextStep(){this.selectedGlobalStep!==null&&(this.selectedGlobalStep=(this.selectedGlobalStep+1)%64)}onOctaveDown(){this.bloomOctave>2&&(this.bloomOctave-=1)}onOctaveUp(){this.bloomOctave<7&&(this.bloomOctave+=1)}getRoleString(t,e){const o={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},i=e.name.match(/^[A-G][b#]?/)?.[0]||"C",s=o[i]??0,n=(t-s+12)%12,r={0:"root",1:"♭9",2:"9",3:"♭3",4:"3",5:"11",6:"♯11",7:"5",8:"♭13",9:"13",10:"♭7",11:"maj7"},a=Qe(e,this.progression?.key||"C",this.progression?.scaleType||"MAJOR");return a.chordTonePcs.includes(t)?`${r[n]||n} of ${i}`:a.tensionPcs.includes(t)||a.scalePcs.includes(t)?"passing":"chromatic"}render(){const t=this.progression?.chords||[],e=jt(this.progression?.mood||"Warm"),o=this.melodyTrack?.notes.length||0,i=this.playing&&this.activeStepIndex!==null?this.activeStepIndex%16:null;return g`
      <div class="melody-container" style="--mood-color: ${e};">
        <!-- Panel Header -->
        <div class="panel-header-row">
          <div class="header-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${o} notes</span>

            <button class="try-another-btn quick-chip random-melody-btn" @click=${this.onRerollMelody} aria-label="Randomize melody">
              <svg width="15" height="15" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${e}"/>
                <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
                <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
              </svg>
              <span>${o===0?"Randomize":"Try another"}</span>
            </button>
            <button class="clear-text-btn clear-melody-btn" @click=${this.onClearMelody} aria-label="Clear melody" title="Clear all notes">
              Clear
            </button>
          </div>

          <div class="quick-actions-bar">
            ${this.guideMode==="strict-chord"?g`
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
                ${Array.from({length:16},(s,n)=>g`
                  <span class="step-num-col ${i===n?"active":""}">
                    ${n+1}
                  </span>
                `)}
              </div>
            </div>

            <!-- 4-Bar Chord Lanes (bar-column for test & layout) -->
            <div class="bars-grid">
              ${(()=>{const s=this.getStepCoverMap(t);return t.map((n,r)=>{const a=this.playing&&this.activeStepIndex!==null&&Math.floor(this.activeStepIndex/16)===r,d=ne(n.tension??.1).color;return g`
                    <div
                      class="chord-lane bar-column ${a?"playing-bar":""}"
                      data-bar="${r}"
                      style="--chord-bg: ${d};"
                    >
                      <!-- Chord Badge on Left -->
                      <div class="lane-chord-badge">
                        <span class="bar-role">${ma[n.functionLabel]||n.functionLabel}</span>
                        <div class="bar-chord-info">
                          <span class="bar-chord-name">${n.name}</span>
                          <span class="bar-chord-roman">${n.roman||""}</span>
                        </div>
                      </div>

                      <!-- 16 Steps Row Across the Lane (Clean ties, no vertical divider pipes) -->
                      <div class="steps-16-grid">
                        ${Array.from({length:16},(c,p)=>{const u=r*16+p,h=s.get(u),m=this.playing&&this.activeStepIndex===u,f=this.selectedGlobalStep===u,b=!!(h&&!h.isStart),y=!!(h&&h.isStart),x=!!(h&&h.isEnd),C=h?h.note.barIndex*16+h.note.stepInBar:u,[I,S]=this.getLoopRange(),A=this.melodyLoop!=="Section"&&u>=I&&u<S,F=A&&u===I,$=A&&u===S-1;return g`
                            <div
                              class="step-cell ${h?"has-note":""} ${b?"is-tail-step":""} ${y?"is-note-start":""} ${x?"is-note-end":""} ${m?"active-step":""} ${f?"is-bloomed":""}"
                              data-step="${u}"
                              @click=${T=>this.onStepClick(u,T)}
                              @pointerdown=${T=>{b&&this.onStartLen(C,T)}}
                              aria-label="Bar ${r+1}, Step ${p+1}: ${h?`${h.note.pitch} (${h.lengthInSteps} steps)`:"empty"}"
                            >
                              <span class="step-number">${String(p+1).padStart(2,"0")}</span>
                              ${h?y?g`
                                ${h.lengthInSteps>1?g`<span class="tie-bar tie-start"></span>`:""}
                                <div class="note-pad">
                                  <span class="note-badge">${h.note.pitch.replace(/\d+$/,"")}</span>
                                </div>
                                ${x?g`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${T=>this.onStartLen(C,T)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                `:""}
                              `:g`
                                <span class="tie-bar ${x?"tie-end":"tie-mid"}"></span>
                                <div class="note-pad tied-step"></div>
                                ${x?g`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${T=>this.onStartLen(C,T)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                `:""}
                              `:g`
                                <span class="empty-dot ${f?"bloomed-empty-ring":""}"></span>
                              `}
                              ${A?g`
                                <div
                                  class="loop-span-bar ${F?"span-start":""} ${$?"span-end":""}"
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
      </div>
    `}renderBloomPopover(t){if(this.selectedGlobalStep===null||!this.progression)return"";const e=Math.floor(this.selectedGlobalStep/16),o=this.progression.chords[e]||this.progression.chords[0],s=ne(o.tension??.1).color,n=this.getNoteAtStep(this.selectedGlobalStep),r=Qe(o,this.progression.key,this.progression.scaleType),a=this.hoverPitchClass!==null?this.hoverPitchClass:n?n.midi%12:null,l=a!==null?Qi.find(p=>p.pc===a)?.name||Zi.find(p=>p.pc===a)?.name||"":null,d=l!==null?`${l}${this.bloomOctave}`:"—",c=a!==null?this.getRoleString(a,o):`empty · ${o.name}`;return g`
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
              <span class="bloom-pitch-title">${d}</span>
              <span class="bloom-role-label">${c}</span>
            </div>
            ${n?g`
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
          ${Qi.map(p=>{const u=r.chordTonePcs.includes(p.pc),h=a===p.pc,m=this.hoverPitchClass===p.pc,f=this.guideMode==="strict-chord"&&!u&&(this.strictBy==="chord"||!r.scalePcs.includes(p.pc));return g`
              <div
                class="white-key ${u?"chord-tone-key":""} ${f?"disabled":""} ${m?"hovered":""}"
                style="left: ${p.left}px; ${u&&!m?`background: ${s};`:""}"
                @click=${()=>{f||this.onSelectPitch(p.name)}}
                @pointerenter=${()=>{f||(this.hoverPitchClass=p.pc,nt(`${p.name}${this.bloomOctave}`,.18))}}
                @pointerleave=${()=>{this.hoverPitchClass===p.pc&&(this.hoverPitchClass=null)}}
              >
                <span class="key-mark ${h?"visible":""}"></span>
                <span class="key-text">${p.name}</span>
              </div>
            `})}

          <!-- 5 Black Keys (Positions: 38, 79, 161, 202, 243) -->
          ${Zi.map(p=>{const u=r.chordTonePcs.includes(p.pc),h=a===p.pc,m=this.hoverPitchClass===p.pc,f=this.guideMode==="strict-chord"&&!u&&(this.strictBy==="chord"||!r.scalePcs.includes(p.pc));return g`
              <div
                class="black-key ${u?"chord-tone-key":""} ${f?"disabled":""} ${m?"hovered":""}"
                style="left: ${p.left}px; ${u&&!m?`background: ${s};`:""}"
                @click=${()=>{f||this.onSelectPitch(p.name)}}
                @pointerenter=${()=>{f||(this.hoverPitchClass=p.pc,nt(`${p.name}${this.bloomOctave}`,.18))}}
                @pointerleave=${()=>{this.hoverPitchClass===p.pc&&(this.hoverPitchClass=null)}}
              >
                <span class="key-mark ${h?"visible":""}"></span>
              </div>
            `})}
        </div>
      </div>
    `}};K.styles=ge`
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
  `;te([w({type:Object})],K.prototype,"progression",2);te([w({type:Object})],K.prototype,"melodyTrack",2);te([w({type:Number})],K.prototype,"activeStepIndex",2);te([w({type:String})],K.prototype,"guideMode",2);te([w({type:String})],K.prototype,"contour",2);te([w({type:Number})],K.prototype,"density",2);te([w({type:Number})],K.prototype,"octave",2);te([w({type:Boolean})],K.prototype,"playing",2);te([w({type:Boolean})],K.prototype,"backingEnabled",2);te([w({type:Boolean})],K.prototype,"isMobile",2);te([w({type:String})],K.prototype,"melodyLoop",2);te([w({type:String})],K.prototype,"melodySound",2);te([w({type:Array})],K.prototype,"span",2);te([w({type:Boolean,reflect:!0,attribute:"dragging-tail"})],K.prototype,"isDraggingTail",2);te([k()],K.prototype,"selectedGlobalStep",2);te([k()],K.prototype,"bloomOctave",2);te([k()],K.prototype,"hoverPitchClass",2);te([k()],K.prototype,"popoverPos",2);te([k()],K.prototype,"strictBy",2);te([k()],K.prototype,"dragStartStep",2);K=te([be("tab-melody")],K);var ga=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,Be=(t,e,o,i)=>{for(var s=i>1?void 0:i?fa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ga(e,o,s),s};const so=["A","B","C","D","E","F","G","H"],no=["#DFEAF8","#F4E2DE","#E6EDDA","#FAF0D7","#ECE3F2","#F7DFE7","#DCF0F2","#F5E8DC"];let Se=class extends fe{constructor(){super(...arguments),this.sections=[],this.timeline=[],this.activeSectionIdx=0,this.activeTimelineIdx=0,this.currentStep=0,this.playing=!1,this.mood="Dreamy",this.bpm=120,this.draggingIdx=null,this.dragOverIdx=null}getEffectiveTimeline(){return this.timeline&&this.timeline.length>0?this.timeline:this.sections.map((t,e)=>({id:`timeline-item-${e}`,sectionIndex:e,repeats:1}))}getTotalBars(){return this.getEffectiveTimeline().reduce((e,o)=>{const s=this.sections[o.sectionIndex]?.progression?.chords?.length||4;return e+s*o.repeats},0)}getEstimatedDuration(){const e=this.getTotalBars()*4,o=Math.round(e/this.bpm*60),i=Math.floor(o/60),s=o%60;return`${i}:${String(s).padStart(2,"0")}`}onSelectSectionCard(t){this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("select-section",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onAddToSong(t,e){e.stopPropagation();const o=this.getEffectiveTimeline(),i={id:`timeline-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,sectionIndex:t,repeats:1},s=[...o,i];this.timeline=s,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:s},bubbles:!0,composed:!0}))}onEditChords(t,e){e.stopPropagation(),this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("edit-chords",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onEditMelody(t,e){e.stopPropagation(),this.activeSectionIdx=t,this.dispatchEvent(new CustomEvent("edit-melody",{detail:{sectionIndex:t},bubbles:!0,composed:!0}))}onUpdateRepeat(t,e,o){o.stopPropagation();const i=this.getEffectiveTimeline(),s=i[t];if(!s)return;const n=Math.max(1,Math.min(8,s.repeats+e));if(n===s.repeats)return;const r=i.map((a,l)=>l===t?{...a,repeats:n}:a);this.timeline=r,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:r},bubbles:!0,composed:!0}))}onMoveTimelineItem(t,e,o){o.stopPropagation();const i=this.getEffectiveTimeline(),s=t+e;if(s<0||s>=i.length)return;const n=se.reorderTimeline(i,t,s);this.timeline=n,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:n},bubbles:!0,composed:!0}))}onRemoveTimelineItem(t,e){e.stopPropagation();const o=this.getEffectiveTimeline();if(o.length<=1)return;const i=o.filter((s,n)=>n!==t);this.timeline=i,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:i},bubbles:!0,composed:!0}))}onNewSectionFromLoop(){this.dispatchEvent(new CustomEvent("new-section-from-loop",{bubbles:!0,composed:!0}))}onTogglePlaySong(){this.dispatchEvent(new CustomEvent("toggle-play-song",{bubbles:!0,composed:!0}))}onDragStart(t,e){this.draggingIdx=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t)))}onDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this.dragOverIdx=t}onDragEnd(){this.draggingIdx=null,this.dragOverIdx=null}onDrop(t,e){if(e.preventDefault(),this.draggingIdx!==null&&this.draggingIdx!==t){const o=this.getEffectiveTimeline(),i=se.reorderTimeline(o,this.draggingIdx,t);this.timeline=i,this.dispatchEvent(new CustomEvent("reorder-timeline",{detail:{timeline:i},bubbles:!0,composed:!0}))}this.draggingIdx=null,this.dragOverIdx=null}render(){const t=this.getEffectiveTimeline(),e=this.getTotalBars(),o=this.getEstimatedDuration();return g`
      <!-- 2-Column Responsive Layout (Song order on left, Sections on right per Chroma Melody design) -->
      <div class="song-columns" data-screen-label="Song">
        <!-- Left Column: Song Order Timeline (Sticky) -->
        <div class="timeline-container">
            <div class="timeline-header-row">
              <span class="col-title">SONG ORDER</span>
              <span class="col-sub">${e} bars · ${o}</span>
            </div>

            <div class="timeline-list">
              ${t.length===0?g`<div class="timeline-empty">Add a section to start the song.</div>`:t.map((i,s)=>{const n=this.sections[i.sectionIndex];if(!n)return Pe;const r=so[i.sectionIndex%so.length],a=no[i.sectionIndex%no.length],l=(n.progression?.chords||[]).map(h=>h.name).join(" – "),d=this.playing&&this.activeTimelineIdx===s,c=i.sectionIndex===this.activeSectionIdx,p=this.draggingIdx===s,u=this.dragOverIdx===s;return g`
                      <div
                        class="timeline-card ${d?"active-playing":""} ${c?"selected":""} ${p?"dragging":""} ${u?"drag-over":""}"
                        draggable="true"
                        @click=${()=>this.onSelectSectionCard(i.sectionIndex)}
                        @dragstart=${h=>this.onDragStart(s,h)}
                        @dragover=${h=>this.onDragOver(s,h)}
                        @dragend=${this.onDragEnd}
                        @drop=${h=>this.onDrop(s,h)}
                      >
                        <!-- Active playback progress bar -->
                        <div class="playback-bar"></div>

                        <span class="drag-handle" title="Drag to reorder">⋮⋮</span>
                        <span class="step-idx">${String(s+1).padStart(2,"0")}</span>

                        <span class="timeline-badge" style="background: ${a};">
                          ${r}
                        </span>

                        <div class="timeline-card-info">
                          <span class="timeline-card-name">${n.name}</span>
                          <span class="timeline-chords-summary">${l}</span>
                        </div>

                        <!-- Repeat Counter Stepper -->
                        <div class="repeat-stepper" title="Repeat count">
                          <button
                            class="stepper-btn"
                            @click=${h=>this.onUpdateRepeat(s,-1,h)}
                            ?disabled=${i.repeats<=1}
                            aria-label="Fewer repeats"
                          >
                            −
                          </button>
                          <span class="repeat-label">×${i.repeats}</span>
                          <button
                            class="stepper-btn"
                            @click=${h=>this.onUpdateRepeat(s,1,h)}
                            ?disabled=${i.repeats>=8}
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
              ${this.sections.map((i,s)=>{const n=so[s%so.length],r=no[s%no.length],a=i.progression?.chords||[],l=this.activeSectionIdx===s;return g`
                  <div
                    class="section-card ${l?"active":""}"
                    style="--section-tint: ${r};"
                    @click=${()=>this.onSelectSectionCard(s)}
                    role="button"
                    tabindex="0"
                  >
                    <div class="section-card-top">
                      <span class="section-badge">
                        ${n}
                      </span>
                      <span class="section-name">${i.name}</span>
                      <span class="section-bars">${a.length} bars · ${this.bpm} BPM</span>
                      <button
                        class="action-btn primary"
                        @click=${d=>this.onAddToSong(s,d)}
                        title="Append instance to Song timeline"
                      >
                        + Add to song
                      </button>
                    </div>

                    ${i.desc?g`<p class="section-desc">${i.desc}</p>`:Pe}

                    <!-- Chord Chips Row with 8-dot Rhythm Matrices (Chroma Melody.dc.html:422) -->
                    <div class="chord-chips-row">
                      ${a.map((d,c)=>{const p=ne(d.tension??.2);return g`
                          <div
                            class="chord-chip"
                            style="--chord-col: ${p.color};"
                          >
                            <div class="chord-chip-text">
                              <span class="chord-chip-role">${d.functionLabel||"CHORD"}</span>
                              <div style="display: flex; align-items: baseline; gap: 4px;">
                                <span class="chord-chip-name">${d.name}</span>
                                ${d.roman?g`<span class="chord-chip-rn">${d.roman}</span>`:Pe}
                              </div>
                            </div>
                            <!-- 8-dot rhythm matrix per Chroma Melody design -->
                            <div class="rhythm-dots-matrix">
                              ${Array.from({length:8},(u,h)=>g`
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
                        @click=${d=>this.onEditChords(s,d)}
                        title="Edit chords in Chords tab"
                      >
                        Edit chords
                      </button>
                      <button
                        class="action-btn section-edit-btn"
                        @click=${d=>this.onEditMelody(s,d)}
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
    `}};Se.styles=ge`
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
  `;Be([w({type:Array})],Se.prototype,"sections",2);Be([w({type:Array})],Se.prototype,"timeline",2);Be([w({type:Number})],Se.prototype,"activeSectionIdx",2);Be([w({type:Number})],Se.prototype,"activeTimelineIdx",2);Be([w({type:Number})],Se.prototype,"currentStep",2);Be([w({type:Boolean})],Se.prototype,"playing",2);Be([w({type:String})],Se.prototype,"mood",2);Be([w({type:Number})],Se.prototype,"bpm",2);Be([k()],Se.prototype,"draggingIdx",2);Be([k()],Se.prototype,"dragOverIdx",2);Se=Be([be("tab-song")],Se);var ba=Object.defineProperty,va=Object.getOwnPropertyDescriptor,Ge=(t,e,o,i)=>{for(var s=i>1?void 0:i?va(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ba(e,o,s),s};const es=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ts={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},ro={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ao={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},wi={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},Lt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function ya(t){const e=t===""?"maj":t;if(Lt[5][e]||Lt[6][e])return e;const o=wi[e];return o&&(Lt[5][o]||Lt[6][o])?o:"maj"}function xa(t){const e=ya(t.q),o=[];return[[6,4],[5,9]].forEach(([i,s])=>{const n=Lt[i][e];if(!n)return;const r=((t.rootPc-s)%12+12)%12;o.push({rootFret:r,frets:n.map(a=>a===null?null:a+r)})}),o.length?(o.sort((i,s)=>i.rootFret-s.rootFret),o[0].frets):null}function wa(t){const e=[7,0,4,9],o=t.intervals.map(r=>(t.rootPc+r)%12),i=r=>{const a=new Set(r);let l=null;const d=[],c=p=>{if(p===4){const u=d.map((b,y)=>(e[y]+b)%12);for(const b of a)if(u.indexOf(b)<0)return;for(const b of u)if(!a.has(b))return;const h=d.filter(b=>b>0),m=h.length?Math.max(...h)-Math.min(...h):0;if(m>3)return;const f=m*12+d.reduce((b,y)=>b+y,0);(!l||f<l.score)&&(l={frets:d.slice(),score:f});return}for(let u=0;u<=5;u++)d.push(u),c(p+1),d.pop()};return c(0),l},s=i(o);if(s)return s.frets;const n=i(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return n?n.frets:null}let Fe=class extends fe{constructor(){super(...arguments),this.progression={genre:"Pop",mood:"Dreamy",key:"C",scaleType:"MAJOR",bpm:120,chords:[]},this.order=[],this.activeIndex=0,this.playing=!1,this.showTheory=!0,this.playInstrument="Piano",this.showDegrees=!1,this.mood="Dreamy"}setInstrument(t){this.playInstrument=t,this.dispatchEvent(new CustomEvent("change-instrument",{detail:{instrument:t},bubbles:!0,composed:!0}))}toggleDegrees(){this.showDegrees=!this.showDegrees}onCardClick(t,e){try{v.playChordAtIndex(e)}catch{}this.dispatchEvent(new CustomEvent("play-chord",{detail:{chord:t,index:e},bubbles:!0,composed:!0}))}renderPianoCard(t,e,o){const i=ce(t.name),s=ts[i.root]??0,n=ao[i.quality]||ao[wi[i.quality]||"maj"]||[0,4,7],r=20,a=84,l=50,d=[0,2,4,5,7,9,11],c=[],p=[],u=[];for(let f=0;f<2;f++)d.forEach((b,y)=>{c.push({x:(f*7+y)*r,w:r-1.5,h:a})});for(let f=0;f<2;f++)[0,1,3,4,5].forEach(b=>{const y=f*7+b;p.push({x:y*r+r*.64,w:r*.58,h:l})});n.forEach(f=>{const b=s+f,y=Math.floor(b/12),x=b%12,C=d.indexOf(x),I=f===0,S=C<0,A=I?"#F2735F":S?"#FBF3E6":"#2E271F",F=I?"#FBF3E6":S?"#2E271F":"#FBF3E6",$=this.showDegrees?ro[f%12]:"";if(C>=0){const T=y*7+C;u.push({cx:T*r+(r-1.5)/2,cy:a-18,r:8.5,fill:A,isRoot:I,label:$,lc:F})}else{const P=(y*7+d.indexOf(x-1))*r+r*.64,_=r*.58;u.push({cx:P+_/2,cy:l-14,r:7,fill:A,isRoot:I,label:$,lc:F})}});const h=14*r,m=n.map(f=>{const b=es[(s+f)%12];return this.showDegrees?`${b} (${ro[f%12]})`:b}).join(" · ");return g`
      <div
        class="play-card ${o?"active-chord":""}"
        @click=${()=>this.onCardClick(t,e)}
        role="button"
        tabindex="0"
        aria-label="Piano chord ${t.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${t.name}</span>
            ${this.showTheory&&t.roman?g`<span class="chord-rn">${t.roman}</span>`:Pe}
          </div>
        </div>

        <div class="svg-wrap">
          <svg width="${h}" height="${a}" viewBox="0 0 ${h} ${a}">
            ${c.map(f=>Q`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
            `)}
            ${p.map(f=>Q`
              <rect x="${f.x}" y="0" width="${f.w}" height="${f.h}" rx="2" fill="#3A3128"></rect>
            `)}
            ${u.map(f=>Q`
              <g>
                <circle cx="${f.cx}" cy="${f.cy}" r="${f.r}" fill="${f.fill}" stroke="${f.isRoot?"#2E271F":"none"}" stroke-width="${f.isRoot?1.5:0}"></circle>
                ${f.label?Q`
                  <text x="${f.cx}" y="${f.cy}" dy="3.2" font-size="8.5" font-weight="800" text-anchor="middle" fill="${f.lc}" font-family="'Plus Jakarta Sans',sans-serif">${f.label}</text>
                `:Pe}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${m}</div>
      </div>
    `}renderFretCard(t,e,o,i){const s=ce(t.name),n=ts[s.root]??0,r=ao[s.quality]||ao[wi[s.quality]||"maj"]||[0,4,7],a=[4,9,2,7,11,4],l=[7,0,4,9],d=o==="Ukulele",c=d?l:a,p=d?wa({root:s.root,rootPc:n,q:s.quality,intervals:r})||[null,null,null,null]:xa({root:s.root,rootPc:n,q:s.quality})||[null,null,null,null,null,null],u=18,h=24,m=4,f=16,b=c.length,y=p.filter(E=>E!==null&&E>0),x=y.length&&Math.max(...y)>4?Math.min(...y)-1:0,C=[],I=[],S=[],A=[],F=[];for(let E=0;E<b;E++)C.push({x:E*u});for(let E=0;E<=m;E++)I.push({y:f+E*h,sw:E===0&&x===0?3:1.2});p.forEach((E,G)=>{const oe=G*u;if(E===null){F.push({x:oe});return}if(E===0){A.push({x:oe});return}const Ie=((c[G]+E-n)%12+12)%12;S.push({cx:oe,cy:f+(E-x-.5)*h,fill:Ie===0?"#F2735F":"#2E271F",label:this.showDegrees?ro[((c[G]+E-n)%12+12)%12]:""})});const $=(b-1)*u,T=(b-1)*u+26,P=f+m*h+12,_=x>0?`${x+1}fr`:"",R=x>0,O=r.map(E=>{const G=es[(n+E)%12];return this.showDegrees?`${G} (${ro[E%12]})`:G}).join(" · ");return g`
      <div
        class="play-card ${i?"active-chord":""}"
        @click=${()=>this.onCardClick(t,e)}
        role="button"
        tabindex="0"
        aria-label="${o} chord ${t.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${t.name}</span>
            ${this.showTheory&&t.roman?g`<span class="chord-rn">${t.roman}</span>`:Pe}
          </div>
          ${R?g`<span class="pos-badge">${_}</span>`:Pe}
        </div>

        <div class="svg-wrap">
          <svg width="${T}" height="${P}" viewBox="-13 -2 ${T} ${P}">
            ${I.map(E=>Q`
              <rect x="0" y="${E.y}" width="${$}" height="${E.sw}" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${C.map(E=>Q`
              <rect x="${E.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${A.map(E=>Q`
              <circle cx="${E.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
            `)}
            ${F.map(E=>Q`
              <text x="${E.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
            `)}
            ${S.map(E=>Q`
              <g>
                <circle cx="${E.cx}" cy="${E.cy}" r="${E.fill==="#F2735F"?7.5:7}" fill="${E.fill}"></circle>
                ${E.label?Q`
                  <text x="${E.cx}" y="${E.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${E.label}</text>
                `:Pe}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${O}</div>
      </div>
    `}render(){const t=this.progression?.chords||[],e=["Piano","Guitar","Ukulele"],o=this.playInstrument==="Piano"?"One voicing per chord, root position — the red dot is the root, play left to right.":this.playInstrument==="Guitar"?"Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.":"Standard G-C-E-A tuning — the red dot is the root, ○ is an open string, × is muted.";return g`
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
              ${e.map(i=>g`
                <button
                  class="tier2-chip ${this.playInstrument===i?"active":""}"
                  @click=${()=>this.setInstrument(i)}
                  role="tab"
                  aria-selected=${this.playInstrument===i}
                >
                  ${i}
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
        <div class="hint-banner">${o}</div>

        <!-- Visualizer Content -->
        ${this.playInstrument==="Piano"?g`
              <div class="piano-grid">
                ${t.map((i,s)=>this.renderPianoCard(i,s,this.playing&&this.activeIndex===s))}
              </div>
            `:g`
              <div class="fret-grid">
                ${t.map((i,s)=>this.renderFretCard(i,s,this.playInstrument,this.playing&&this.activeIndex===s))}
              </div>
            `}
      </div>
    `}};Fe.styles=ge`
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
  `;Ge([w({type:Object})],Fe.prototype,"progression",2);Ge([w({type:Array})],Fe.prototype,"order",2);Ge([w({type:Number})],Fe.prototype,"activeIndex",2);Ge([w({type:Boolean})],Fe.prototype,"playing",2);Ge([w({type:Boolean})],Fe.prototype,"showTheory",2);Ge([w({type:String})],Fe.prototype,"playInstrument",2);Ge([w({type:Boolean})],Fe.prototype,"showDegrees",2);Ge([w({type:String})],Fe.prototype,"mood",2);Fe=Ge([be("tab-play")],Fe);var ka=Object.defineProperty,Sa=Object.getOwnPropertyDescriptor,Te=(t,e,o,i)=>{for(var s=i>1?void 0:i?Sa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&ka(e,o,s),s};const Ca=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Ia=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],$a=[{label:"Root",id:"root"},{label:"1st Inv",id:"inv1"},{label:"2nd Inv",id:"inv2"},{label:"+1 Oct",id:"octUp"},{label:"-1 Oct",id:"octDown"}],Dt={Tonic:"HOME",Submediant:"DRIFTING",Subdominant:"LIFTING",Supertonic:"STEPPING UP",Mediant:"WISTFUL",Dominant:"PULLING HOME","Dominant 7th":"PULLING HOME"};let ye=class extends fe{constructor(){super(...arguments),this.progression=null,this.selectedChordIndex=null,this.selectedBand=null,this.showTheory=!1,this.isSaved=!1,this.savedSets=[],this.libraryOpen=!1,this.moodColor="#F2735F",this.abPick=null,this.activeSwapFamily="",this.swapIndex=null}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}onBarClick(t){this.dispatchEvent(new CustomEvent("chord-select",{detail:{index:t},bubbles:!0,composed:!0}))}onCloseDetail(){this.dispatchEvent(new CustomEvent("close-detail",{bubbles:!0,composed:!0}))}onToggleSave(){this.dispatchEvent(new CustomEvent("toggle-save",{bubbles:!0,composed:!0}))}onToggleLibrary(){this.libraryOpen=!this.libraryOpen,this.dispatchEvent(new CustomEvent("toggle-library",{detail:{open:this.libraryOpen},bubbles:!0,composed:!0}))}onSelectSavedSet(t){this.libraryOpen=!1,this.dispatchEvent(new CustomEvent("select-saved-set",{detail:{set:t},bubbles:!0,composed:!0}))}onDeleteSavedSet(t,e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("delete-saved-set",{detail:{id:t},bubbles:!0,composed:!0}))}onChangeQuality(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-quality",{detail:{quality:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeExtension(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-extension",{detail:{extension:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}onChangeVoicing(t){this.selectedChordIndex!==null&&this.dispatchEvent(new CustomEvent("change-chord-voicing",{detail:{voicing:t,index:this.selectedChordIndex},bubbles:!0,composed:!0}))}render(){const t=this.progression?.chords||[],e=this.moodColor||jt(this.progression?.mood||"Warm");return g`
      <div class="inspector-panel" style="--mood-color: ${e};">
        ${this.selectedChordIndex!==null&&t[this.selectedChordIndex]?this.renderChordDetail(t[this.selectedChordIndex],t):this.swapIndex!==null&&this.abPick?this.renderSwapAudition():this.renderIdleOverview(t,e)}
      </div>
    `}renderIdleOverview(t,e){const o=t.map(h=>h.tension||.1),i=Math.max(...o,.1),s=Math.min(...o,0),n=o.indexOf(i),r=o.every((h,m)=>m===0||h>=o[m-1]),a=i-s<.28?"Stays close to home":r?"A steady climb":o[o.length-1]<.25&&n<o.length-1?"Away, then home":"Drifts, then settles",l=`Opens ${Dt[t[0]?.functionLabel]||"HOME"} and ${i-s<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":r?`tightens chord by chord, peaking on ${t[n]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[n]?.name||"the middle"} before easing back down home.`}`,d=Ps(t),c=Rs(t),p=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR";return g`
      <div class="inspector-top-row">
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

            ${this.libraryOpen?g`
              <div class="popover-menu">
                <div class="kicker" style="margin-bottom: 8px;">SAVED LOOPS</div>
                ${this.savedSets.length===0?g`
                  <div style="font-size: 12px; color: var(--cv-ink-muted); padding: 8px 4px;">No saved loops yet. Click "Save" to store your favorite progressions.</div>
                `:this.savedSets.map(h=>g`
                  <div class="popover-item saved-set-item" @click=${()=>this.onSelectSavedSet(h)}>
                    <span style="font-size: 12.5px; font-weight: 700; color: #2E271F;">${h.name}</span>
                    <button
                      style="border: none; background: none; color: #8A6B3F; font-size: 14px; cursor: pointer;"
                      @click=${m=>this.onDeleteSavedSet(h.id,m)}
                      aria-label="Delete ${h.name}"
                    >×</button>
                  </div>
                `)}
              </div>
            `:""}
          </div>
        </div>
      </div>

      <div class="inspector-body">
        <!-- Arc Bars Chart (Height: 152px) -->
        <div class="arc-bars-container">
          ${t.map((h,m)=>{const f=ne(h.tension??.1),b=Math.max(18,Math.round(18+(h.tension??.1)*62));return g`
              <button
                class="arc-bar-col ${this.selectedChordIndex===m?"selected":""}"
                @click=${()=>this.onBarClick(m)}
                aria-label="${h.name}, ${Dt[h.functionLabel]||""}"
              >
                <div class="bar-pod">
                  <div class="bar-fill" style="height: ${b}px; background: ${f.color};"></div>
                </div>
                <div class="bar-meta">
                  <div class="bar-chord-name">${h.name}</div>
                  <div class="bar-role-hint">${Dt[h.functionLabel]||""}</div>
                </div>
              </button>
            `})}
        </div>
        <div class="arc-hint-text">Taller means more unresolved.</div>
        <div class="arc-sentence-text">${l}</div>

        ${this.showTheory?g`
          <div class="theory-box">
            <div class="theory-row">
              <span class="theory-key">Key<span style="display: none;"> &amp; Scale</span></span>
              <span class="theory-val">${p.replace("b","♭")} ${u.toLowerCase()==="minor"?"Minor":"Major"}</span>
            </div>
            <div class="theory-row formula-row">
              <span class="theory-key">Formula</span>
              <span class="theory-val formula-val">${t.map(h=>h.roman||"").filter(Boolean).join(" – ")}</span>
            </div>

            ${d.length?g`
              <div class="cadences-section">
                <div class="theory-section-kicker">Cadences</div>
                <div class="cadences-list">
                  ${d.map(h=>g`
                    <div class="cadence-card">
                      <div class="cadence-head">
                        <span class="cadence-name">${h.name}</span>
                        <span class="cadence-bars">${h.bars}</span>
                      </div>
                      ${h.move?g`
                        <div class="cadence-move-row">
                          <span class="cadence-move">${h.move}</span>
                          ${h.degrees?g`<span class="cadence-degrees">${h.degrees}</span>`:""}
                        </div>
                      `:""}
                      <div class="cadence-desc">${h.why}</div>
                    </div>
                  `)}
                </div>
              </div>
            `:""}

            ${c.length?g`
              <div class="voice-leading-section">
                <div class="theory-section-kicker">Voice leading</div>
                <div class="voice-links-list">
                  ${c.map(h=>g`
                    <div class="voice-link-row">
                      <div class="voice-link-left">
                        <div class="voice-link-chords">${h.chords}</div>
                        <div class="voice-link-move">${h.move}</div>
                      </div>
                      <div class="voice-link-right ${h.hasShared?"shared":""}">${h.link}</div>
                    </div>
                  `)}
                </div>
              </div>
            `:""}

            ${this.progression?.note?g`
              <div class="theory-note-text">${this.progression.note}</div>
            `:""}
          </div>
        `:""}
      </div>
    `}renderChordDetail(t,e){const o=this.getChordQualityLabel(t.name),i=this.getChordExtensionLabel(t.name),s=j(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=Ds(t.name,s),r=ne(t.tension||.1);return g`
      <div class="inspector-top-row">
        <div class="header-row">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div class="badge-icon" style="background: ${r.color};"></div>
            <div>
              <div class="kicker">CHORD · ${Dt[t.functionLabel]||"HOME"}</div>
              <div class="main-title" style="display: flex; align-items: baseline; gap: 8px;">
                ${t.name}
                ${t.roman?g`<span style="font-size: 13px; font-weight: 700; color: var(--cv-label); font-family: var(--cv-font-mono, monospace);">${t.roman}</span>`:""}
              </div>
              <div class="sub-role">${Dt[t.functionLabel]||t.functionLabel}</div>
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
          ${Ca.map(a=>{const l=a.label===o;return g`
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
          ${Ia.map(a=>{const l=a.label===i;return g`
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
          ${$a.map(a=>g`
            <button
              class="action-btn"
              @click=${()=>this.onChangeVoicing(a.id)}
            >
              ${a.label}
            </button>
          `)}
        </div>
      </div>
    </div>
    `}renderSwapAudition(){return g`
      <div class="inspector-top-row">
        <div class="header-row">
          <div>
            <div class="kicker">BAR ${(this.swapIndex??0)+1} HARMONIC CONTEXT</div>
            <div class="main-title">Auditioning Swap</div>
          </div>
          <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close audition">×</button>
        </div>
      </div>

      <div class="inspector-body">
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
      </div>
    `}};ye.styles=ge`
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
      position: relative;
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
      top: calc(100% + 8px);
      right: 0;
      width: 280px;
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
  `;Te([w({type:Object})],ye.prototype,"progression",2);Te([w({type:Number})],ye.prototype,"selectedChordIndex",2);Te([w({type:String})],ye.prototype,"selectedBand",2);Te([w({type:Boolean})],ye.prototype,"showTheory",2);Te([w({type:Boolean})],ye.prototype,"isSaved",2);Te([w({type:Array})],ye.prototype,"savedSets",2);Te([w({type:Boolean})],ye.prototype,"libraryOpen",2);Te([w({type:String})],ye.prototype,"moodColor",2);Te([w({type:Object})],ye.prototype,"abPick",2);Te([w({type:String})],ye.prototype,"activeSwapFamily",2);Te([w({type:Number})],ye.prototype,"swapIndex",2);ye=Te([be("chord-inspector")],ye);class bt{constructor(){this.midiAccess=null,this.selectedOutputId=null,this.selectedInputId=null,this.status="idle",this.errorMessage="",this.listeners=new Set,this.routing={chordsChannel:1,chordsInternalAudio:!0,melodyChannel:2,melodyInternalAudio:!0},this.loadSettings()}static getInstance(){return bt.instance||(bt.instance=new bt),bt.instance}loadSettings(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem("chroma-chords-midi-routing");e&&(this.routing={...this.routing,...JSON.parse(e)}),this.selectedOutputId=localStorage.getItem("chroma-chords-midi-output")||null,this.selectedInputId=localStorage.getItem("chroma-chords-midi-input")||null}catch{}}saveSettings(){if(!(typeof localStorage>"u"))try{localStorage.setItem("chroma-chords-midi-routing",JSON.stringify(this.routing)),this.selectedOutputId?localStorage.setItem("chroma-chords-midi-output",this.selectedOutputId):localStorage.removeItem("chroma-chords-midi-output"),this.selectedInputId?localStorage.setItem("chroma-chords-midi-input",this.selectedInputId):localStorage.removeItem("chroma-chords-midi-input")}catch{}}isSupported(){return typeof navigator<"u"&&typeof navigator.requestMIDIAccess=="function"}async connect(){if(!this.isSupported())return this.status="unsupported",this.errorMessage="Web MIDI is not supported in this browser.",this.notify(),!1;try{this.midiAccess=await navigator.requestMIDIAccess({sysex:!1}),this.status="connected",this.errorMessage="";const e=this.getOutputs();return!this.selectedOutputId&&e.length>0&&(this.selectedOutputId=e[0].id),this.midiAccess.onstatechange=()=>{this.notify()},this.saveSettings(),this.notify(),!0}catch(e){return this.status="error",this.errorMessage=e?.message||"Failed to access MIDI devices.",this.notify(),!1}}getStatus(){return this.status}getErrorMessage(){return this.errorMessage}getOutputs(){if(!this.midiAccess)return[];const e=[];try{const o=this.midiAccess.outputs.values();for(const i of o)e.push({id:i.id,name:i.name||`Output ${i.id}`,manufacturer:i.manufacturer})}catch{}return e}getInputs(){if(!this.midiAccess)return[];const e=[];try{const o=this.midiAccess.inputs.values();for(const i of o)e.push({id:i.id,name:i.name||`Input ${i.id}`,manufacturer:i.manufacturer})}catch{}return e}getSelectedOutput(){return this.selectedOutputId}setSelectedOutput(e){this.selectedOutputId=e,this.saveSettings(),this.notify()}getSelectedInput(){return this.selectedInputId}setSelectedInput(e){this.selectedInputId=e,this.saveSettings(),this.notify()}setRouting(e){this.routing={...this.routing,...e},this.saveSettings(),this.notify()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.status))}getActiveOutputDevice(){return!this.midiAccess||!this.selectedOutputId?null:this.midiAccess.outputs.get(this.selectedOutputId)||null}sendNoteOn(e,o=100,i=1){const s=this.getActiveOutputDevice();if(!s)return;const r=144|Math.max(0,Math.min(15,i-1));try{s.send([r,Math.max(0,Math.min(127,e)),Math.max(0,Math.min(127,o))])}catch{}}sendNoteOff(e,o=1){const i=this.getActiveOutputDevice();if(!i)return;const n=128|Math.max(0,Math.min(15,o-1));try{i.send([n,Math.max(0,Math.min(127,e)),0])}catch{}}sendTestNote(e=1){this.sendNoteOn(60,100,e),setTimeout(()=>{this.sendNoteOff(60,e)},400)}}const ie=bt.getInstance();var Ea=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,Ce=(t,e,o,i)=>{for(var s=i>1?void 0:i?Ta(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Ea(e,o,s),s};let me=class extends fe{constructor(){super(...arguments),this.isOpen=!1,this.status="idle",this.outputs=[],this.inputs=[],this.selectedOutput=null,this.selectedInput=null,this.chordsChannel=1,this.chordsInternalAudio=!0,this.melodyChannel=2,this.melodyInternalAudio=!0,this.errorMessage="",this.testNotePlaying=!1}connectedCallback(){super.connectedCallback(),this.syncFromService(),this.unsubscribe=ie.subscribe(()=>{this.syncFromService()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe&&this.unsubscribe()}syncFromService(){this.status=ie.getStatus(),this.errorMessage=ie.getErrorMessage(),this.outputs=ie.getOutputs(),this.inputs=ie.getInputs(),this.selectedOutput=ie.getSelectedOutput(),this.selectedInput=ie.getSelectedInput(),this.chordsChannel=ie.routing.chordsChannel,this.chordsInternalAudio=ie.routing.chordsInternalAudio,this.melodyChannel=ie.routing.melodyChannel,this.melodyInternalAudio=ie.routing.melodyInternalAudio}async onConnect(){await ie.connect(),this.syncFromService()}onSendTest(){this.testNotePlaying=!0,ie.sendTestNote(this.chordsChannel),setTimeout(()=>{this.testNotePlaying=!1},450)}onOutputChange(t){const e=t.target.value;ie.setSelectedOutput(e||null)}onInputChange(t){const e=t.target.value;ie.setSelectedInput(e||null)}onChordsChannelChange(t){const e=parseInt(t.target.value,10);this.chordsChannel=e,ie.setRouting({chordsChannel:e})}onMelodyChannelChange(t){const e=parseInt(t.target.value,10);this.melodyChannel=e,ie.setRouting({melodyChannel:e})}toggleChordsAudio(){this.chordsInternalAudio=!this.chordsInternalAudio,ie.setRouting({chordsInternalAudio:this.chordsInternalAudio})}toggleMelodyAudio(){this.melodyInternalAudio=!this.melodyInternalAudio,ie.setRouting({melodyInternalAudio:this.melodyInternalAudio})}onClose(){this.isOpen=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const t=Array.from({length:16},(e,o)=>o+1);return g`
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
            ${this.errorMessage?g`<div class="error-banner">${this.errorMessage}</div>`:Pe}

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
    `}};me.styles=ge`
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
  `;Ce([w({type:Boolean})],me.prototype,"isOpen",2);Ce([k()],me.prototype,"status",2);Ce([k()],me.prototype,"outputs",2);Ce([k()],me.prototype,"inputs",2);Ce([k()],me.prototype,"selectedOutput",2);Ce([k()],me.prototype,"selectedInput",2);Ce([k()],me.prototype,"chordsChannel",2);Ce([k()],me.prototype,"chordsInternalAudio",2);Ce([k()],me.prototype,"melodyChannel",2);Ce([k()],me.prototype,"melodyInternalAudio",2);Ce([k()],me.prototype,"errorMessage",2);Ce([k()],me.prototype,"testNotePlaying",2);me=Ce([be("midi-modal")],me);var Ma=Object.defineProperty,Na=Object.getOwnPropertyDescriptor,Me=(t,e,o,i)=>{for(var s=i>1?void 0:i?Na(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Ma(e,o,s),s};const Aa=Q`
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
`,Oa=Q`
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
`;let xe=class extends fe{constructor(){super(...arguments),this.open=!1,this.visible=!1,this.progression=null,this.order=[],this.instrument=null,this.playStyle=null,this.barsPerChord=1,this.feelSettings=null,this.melodyTrack=null,this.exportPart="chords",this.exportMsg=null,this.onKeyDown=t=>{t.key==="Escape"&&this.isOpened&&this.close()}}get isOpened(){return this.open||this.visible}willUpdate(t){if((t.has("open")||t.has("visible"))&&this.isOpened){const e=this.melodyTrack||v.getMelodyTrack();!!(e&&e.notes&&e.notes.length>0)?this.exportPart="both":this.exportPart="chords",this.exportMsg=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}setExportPart(t){this.exportPart=t,this.exportMsg=null}byPart(t,e,o){return this.exportPart==="chords"?t:this.exportPart==="melody"?e:o}handleDeviceClick(t){if(!this.progression)return;const e=br(this.progression,t,this.order);window.open(e,"_blank");const o=t==="m8"?"M8 Tracker":"Circuit Tracks";this.emit("toast",`Opening ${o} helper...`),this.exportMsg=`Opening ${o}…`,this.close()}async handleWavClick(t="chords"){if(this.progression){this.emit("toast","Generating WAV audio...");try{const e=this.barsPerChord||v.getBarsPerChord()||1,o=this.feelSettings||v.getFeelSettings(),i=this.melodyTrack||v.getMelodyTrack();await Vr(t,this.progression,i,{order:this.order,instrumentName:this.instrument,playStyleName:this.playStyle,barsPerChord:e,feelSettings:o});const n=`${`${(this.progression.key||"c").toLowerCase()}_${(this.progression.mood||"loop").toLowerCase().replace(/[^a-z0-9]+/g,"_")}`}${t==="chords"?"":"_"+t}.wav`;this.emit("toast",`WAV file downloaded (${n})`),this.exportMsg=`Saved ${n}`}catch(e){console.error("WAV export failed",e),this.emit("toast","Failed to generate WAV file")}this.close()}}handleMidiClick(t="both"){if(this.progression){try{const e=this.barsPerChord||v.getBarsPerChord()||1,o=this.feelSettings||v.getFeelSettings(),i=this.melodyTrack||v.getMelodyTrack();Ur(this.progression,i,{target:t,order:this.order,playStyleName:this.playStyle,barsPerChord:e,feelSettings:o});const n=`${`${(this.progression.key||"c").toLowerCase()}_${(this.progression.mood||"loop").toLowerCase().replace(/[^a-z0-9]+/g,"_")}`}${t==="chords"?"":"_"+t}.mid`,r=t==="both"?"Multi-track MIDI":`${t.toUpperCase()} MIDI`;this.emit("toast",`${r} file downloaded (${n})`),this.exportMsg=`Saved ${n}`}catch(e){console.error("MIDI export failed",e),this.emit("toast","Failed to generate MIDI file")}this.close()}}render(){const t=this.isOpened;return g`
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
                  ${Aa}
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
                  ${Oa}
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

          ${this.exportMsg?g`
            <div class="export-msg">
              <span class="msg-dot"></span>
              <span>${this.exportMsg}</span>
            </div>
          `:Pe}
        </div>
      </div>
    `}};xe.styles=ge`
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
  `;Me([w({type:Boolean})],xe.prototype,"open",2);Me([w({type:Boolean})],xe.prototype,"visible",2);Me([w({type:Object})],xe.prototype,"progression",2);Me([w({type:Array})],xe.prototype,"order",2);Me([w({type:String})],xe.prototype,"instrument",2);Me([w({type:String})],xe.prototype,"playStyle",2);Me([w({type:Number})],xe.prototype,"barsPerChord",2);Me([w({type:Object})],xe.prototype,"feelSettings",2);Me([w({type:Object})],xe.prototype,"melodyTrack",2);Me([k()],xe.prototype,"exportPart",2);Me([k()],xe.prototype,"exportMsg",2);xe=Me([be("share-modal")],xe);var Fa=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,Mt=(t,e,o,i)=>{for(var s=i>1?void 0:i?Ba(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Fa(e,o,s),s};let et=class extends fe{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&this.open&&(this.mounted=!0)}updated(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,setTimeout(()=>{this.googleBtnContainer&&kt.renderGoogleButton(this.googleBtnContainer,e=>{e.success?this.close():e.message&&(this.errorMessage=e.message)})},50)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}async handleGoogleSignIn(){this.errorMessage=null,this.isOAuthLoading=!0;try{const t=await kt.signInWithGoogle();t.success?this.close():t.message&&(this.errorMessage=t.message)}catch(t){const e=t instanceof Error?t.message:String(t);this.errorMessage=e||"Google sign-in failed. Please try again."}finally{this.isOAuthLoading=!1}}render(){return!this.open&&!this.mounted?g``:g`
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
    `}};et.styles=ge`
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
  `;Mt([w({type:Boolean})],et.prototype,"open",2);Mt([k()],et.prototype,"mounted",2);Mt([k()],et.prototype,"isOAuthLoading",2);Mt([k()],et.prototype,"errorMessage",2);Mt([nn("#google-btn-container")],et.prototype,"googleBtnContainer",2);et=Mt([be("auth-modal")],et);var Da=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Nt=(t,e,o,i)=>{for(var s=i>1?void 0:i?Pa(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Da(e,o,s),s};let tt=class extends fe{constructor(){super(...arguments),this.barIndex=0,this.feelings=[],this.feelIndex=0,this.chordIndex=0}getCurrentFeel(){const t=this.feelings.length;if(!t)return{name:"Darker",sub:"",tension:.5,rows:[]};const e=(this.feelIndex%t+t)%t;return this.feelings[e]}getCurrentRow(){const e=this.getCurrentFeel().rows;if(!e||e.length===0)return null;const o=(this.chordIndex%e.length+e.length)%e.length;return e[o]}emitAudition(t,e){this.dispatchEvent(new CustomEvent("cycler-audition",{detail:{chordName:t.name,roman:t.roman||"",notes:t.notes||(t.chord?.notes??[]),sub:t.sub,tension:t.tension,feel:e.name,chord:t.chord},bubbles:!0,composed:!0}))}onPrevFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex-1+e)%e,this.chordIndex=0;const o=this.getCurrentFeel(),i=this.getCurrentRow();i&&this.emitAudition(i,o),this.requestUpdate()}onNextFeel(t){t.stopPropagation();const e=this.feelings.length;if(!e)return;this.feelIndex=(this.feelIndex+1)%e,this.chordIndex=0;const o=this.getCurrentFeel(),i=this.getCurrentRow();i&&this.emitAudition(i,o),this.requestUpdate()}onCycleChord(t){t.stopPropagation();const e=this.getCurrentFeel(),o=e.rows;if(!o||o.length===0)return;this.chordIndex=(this.chordIndex+1)%o.length;const i=this.getCurrentRow();i&&this.emitAudition(i,e),this.requestUpdate()}onKeep(t){t.stopPropagation();const e=this.getCurrentRow(),o=this.getCurrentFeel();e&&this.dispatchEvent(new CustomEvent("cycler-keep",{detail:{chordName:e.name,chord:e.chord,feel:o.name,roman:e.roman||"",tension:e.tension,sub:e.sub},bubbles:!0,composed:!0}))}onRevert(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("cycler-revert",{bubbles:!0,composed:!0}))}render(){const t=this.getCurrentFeel(),e=this.getCurrentRow(),o=t.rows?t.rows.length:0,i=o>0?this.chordIndex%o+1:0,s=ne(t.tension);return g`
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
            <span class="chord-count-hint">${i} of ${o} ↻</span>
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
    `}};tt.styles=ge`
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
  `;Nt([w({type:Object})],tt.prototype,"originalChord",2);Nt([w({type:Number})],tt.prototype,"barIndex",2);Nt([w({type:Array})],tt.prototype,"feelings",2);Nt([w({type:Number})],tt.prototype,"feelIndex",2);Nt([w({type:Number})],tt.prototype,"chordIndex",2);tt=Nt([be("chord-pad-cycler")],tt);var Ra=Object.defineProperty,La=Object.getOwnPropertyDescriptor,N=(t,e,o,i)=>{for(var s=i>1?void 0:i?La(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Ra(e,o,s),s};const ri=Js,os=["Pop","Lo-fi/Chill","R&B/Soul","Synthwave","Indie/Folk","Rock","Jazz-ish","Cinematic"];Ze.map(t=>t.name);Object.fromEntries(Ze.map(t=>[t.name,t.iconPath]));const it={Tonic:"home",Submediant:"drifting",Subdominant:"lifting",Supertonic:"stepping up",Mediant:"wistful",Dominant:"pulling home","Dominant 7th":"pulling home"},za=it,ai=["A","S","D","F","Z","X","C","V"],ja=["Octave up","1st inversion","Low root"];function is(t){if(!t)return 1;const e=t.toLowerCase();return e.includes("octave")||e.includes("up")?0:e.includes("low")||e.includes("root")?2:1}const Ua=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],_a=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],li=[{k:"playStyle",label:"Pattern",hint:"How the notes are laid out in time",steps:[{v:"Block chords",name:"Block"},{v:"Arpeggio",name:"Arp"},{v:"Strum",name:"Strum"},{v:"Broken (swing)",name:"Broken"},{v:"Half-time",name:"Half-time"}]},{k:"swing",label:"Swing",hint:"How far behind the beat the notes land",steps:[{v:0,name:"Straight"},{v:25,name:"Light"},{v:55,name:"Loose"},{v:85,name:"Heavy"}]},{k:"spread",label:"Spread",hint:"How far apart the notes sit",steps:[{v:15,name:"Tight"},{v:50,name:"Close"},{v:75,name:"Open"},{v:95,name:"Wide"}]},{k:"density",label:"Density",hint:"How many notes per chord",steps:[{v:20,name:"Sparse"},{v:50,name:"Simple"},{v:75,name:"Full"},{v:95,name:"Busy"}]},{k:"humanise",label:"Humanise",hint:"How loose the timing and touch are",steps:[{v:0,name:"Machine"},{v:45,name:"Natural"},{v:80,name:"Loose"}]},{k:"tone",label:"Tone",hint:"The colour of the instrument",steps:[{v:"Warm",name:"Warm"},{v:"Glassy",name:"Glassy"},{v:"Dusty",name:"Dusty"}]}],$e={playStyle:"Block chords",swing:0,spread:50,density:50,humanise:45,tone:"Warm"},Ga=["C","D♭","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],ss=[{root:"C",label:"C"},{root:"Db",label:"C♯ / D♭"},{root:"D",label:"D"},{root:"Eb",label:"D♯ / E♭"},{root:"E",label:"E"},{root:"F",label:"F"},{root:"F#",label:"F♯ / G♭"},{root:"G",label:"G"},{root:"Ab",label:"G♯ / A♭"},{root:"A",label:"A"},{root:"Bb",label:"A♯ / B♭"},{root:"B",label:"B"}],lo=[{type:"MAJOR",label:"Major",abbrev:"Maj"},{type:"NATURAL_MINOR",label:"Minor",abbrev:"Min"},{type:"DORIAN",label:"Dorian",abbrev:"Dor"},{type:"MIXOLYDIAN",label:"Mixolydian",abbrev:"Mix"},{type:"LYDIAN",label:"Lydian",abbrev:"Lyd"},{type:"PHRYGIAN",label:"Phrygian",abbrev:"Phr"},{type:"HARMONIC_MINOR",label:"Harmonic Min",abbrev:"Harm"},{type:"MELODIC_MINOR",label:"Melodic Min",abbrev:"Mel"},{type:"LOCRIAN",label:"Locrian",abbrev:"Loc"}],ci={MAJOR:{steps:[0,2,4,5,7,9,11],romans:["I","ii","iii","IV","V","vi","vii°"],quals:["","m","m","","","m","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"major"},NATURAL_MINOR:{steps:[0,2,3,5,7,8,10],romans:["i","ii°","♭III","iv","v","♭VI","♭VII"],quals:["m","dim","","m","m","",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"natural minor"},DORIAN:{steps:[0,2,3,5,7,9,10],romans:["i","ii","♭III","IV","v","vi°","♭VII"],quals:["m","m","","","m","dim",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Dorian"},PHRYGIAN:{steps:[0,1,3,5,7,8,10],romans:["i","♭II","♭III","iv","v°","♭VI","♭vii"],quals:["m","","","m","dim","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Phrygian"},LYDIAN:{steps:[0,2,4,6,7,9,11],romans:["I","II","iii","iv°","V","vi","vii"],quals:["","","m","dim","","m","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Lydian"},MIXOLYDIAN:{steps:[0,2,4,5,7,9,10],romans:["I","ii","iii°","IV","v","vi","♭VII"],quals:["","m","dim","","m","m",""],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Mixolydian"},LOCRIAN:{steps:[0,1,3,5,6,8,10],romans:["i°","♭II","♭iii","iv","♭V","♭VI","♭vii"],quals:["dim","","m","m","","","m"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],name:"Locrian"},HARMONIC_MINOR:{steps:[0,2,3,5,7,8,11],romans:["i","ii°","♭III+","iv","V","♭VI","vii°"],quals:["m","dim","aug","m","","","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Harmonic minor"},MELODIC_MINOR:{steps:[0,2,3,5,7,9,11],romans:["i","ii","♭III+","IV","V","vi°","vii°"],quals:["m","m","aug","","","dim","dim"],fns:["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading tone"],name:"Melodic minor"}},co={Darker:["Three chords that add weight without changing the key.","All three pull from the parallel minor or its subdominant — same key, more shadow."],"More tension":["Three chords that lean harder into the next bar.","Dominant approaches — each one aims at a chord later in the loop."],Dreamier:["Three chords that open the bar up and let it float.","Extensions and softer degrees — less pull toward home."],"Resolve home":["Three chords that settle the bar back to center.","Tonic and its neighbours — the sense of arriving."],Borrowed:["Four chords from the minor version of this key. Each one swaps in for a chord you already have.","Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for."]},ns=["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"],rs={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},po={0:"1",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"},ho={"":[0,4,7],maj:[0,4,7],m:[0,3,7],min:[0,3,7],maj7:[0,4,7,11],m7:[0,3,7,10],7:[0,4,7,10],6:[0,4,7,9],m6:[0,3,7,9],dim:[0,3,6],m7b5:[0,3,6,10],sus4:[0,5,7],sus2:[0,2,7],9:[0,4,7,10],maj9:[0,4,7,11],m9:[0,3,7,10],add9:[0,4,7]},ki={9:"7",maj9:"maj7",m9:"m7",add9:"maj",sus2:"sus4",min:"m","":"maj"},zt={6:{maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],7:[0,2,0,1,0,0],maj7:[0,2,1,1,0,0],m7:[0,2,0,0,0,0],6:[0,2,2,1,2,0],m6:[0,2,2,0,2,0],sus4:[0,2,2,2,0,0]},5:{maj:[null,0,2,2,2,0],m:[null,0,2,2,1,0],7:[null,0,2,0,2,0],maj7:[null,0,2,1,2,0],m7:[null,0,2,0,1,0],6:[null,0,2,2,2,2],m6:[null,0,2,2,1,2],sus4:[null,0,2,2,3,0],dim:[null,0,1,2,1,null],m7b5:[null,0,1,0,1,null]}};function Va(t){const e=t===""?"maj":t;if(zt[5][e]||zt[6][e])return e;const o=ki[e];return o&&(zt[5][o]||zt[6][o])?o:"maj"}function qa(t){const e=Va(t.q),o=[];return[[6,4],[5,9]].forEach(([i,s])=>{const n=zt[i][e];if(!n)return;const r=((t.rootPc-s)%12+12)%12;o.push({rootFret:r,frets:n.map(a=>a===null?null:a+r)})}),o.length?(o.sort((i,s)=>i.rootFret-s.rootFret),o[0].frets):null}function Ha(t){const e=[7,0,4,9],o=t.intervals.map(r=>(t.rootPc+r)%12),i=r=>{const a=new Set(r);let l=null;const d=[],c=p=>{if(p===4){const u=d.map((b,y)=>(e[y]+b)%12);for(const b of a)if(u.indexOf(b)<0)return;for(const b of u)if(!a.has(b))return;const h=d.filter(b=>b>0),m=h.length?Math.max(...h)-Math.min(...h):0;if(m>3)return;const f=m*12+d.reduce((b,y)=>b+y,0);(!l||f<l.score)&&(l={frets:d.slice(),score:f});return}for(let u=0;u<=5;u++)d.push(u),c(p+1),d.pop()};return c(0),l},s=i(o);if(s)return s.frets;const n=i(t.intervals.filter(r=>r!==7).map(r=>(t.rootPc+r)%12));return n?n.frets:null}let M=class extends fe{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle="Block chords",this.isAuthenticated=!1,this.userEmail=null,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.isGenerating=!1,this.libraryOpen=!1,this.isSaved=!1,this.currentProjectId=null,this.isMobile=typeof window<"u"?window.innerWidth<900:!1,this.activeView="loop",this.vibeOpen=!1,this.showSaveModal=!1,this.pendingSaveName="",this.selectedBand=null,this.bandSwaps={},this.freeText="",this.vibePlaceholderIdx=0,this.expandedGenre=!1,this.expandedMood=!1,this.activeSwapFamily="Darker",this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.detailIndex=0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.savedSets=[],this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.librarySearch="",this.librarySelectMode=!1,this.librarySelected=[],this.playInstrument="Piano",this.showDegrees=!1,this.mobileSheetOpen=!1,this.mobileDetailSheetOpen=!1,this.padFlash=-1,this.padHeld=-1,this.gridFor=-1,this.lastPad=null,this.tempoOpen=!1,this.feelOpen=!1,this.shareOpen=!1,this.expandedInstrument=!1,this.barsPerChord=1,this.swing=0,this.spread=50,this.density=50,this.humanise=45,this.tone="Warm",this.feelScope="loop",this.barFeel={},this.advOverride={},this.advOpen=!1,this.showAdvancedFeel=!1,this.humanEngineState=null,this.auditionDeg=null,this.auditionName=null,this.auditionBar=0,this.gridTimer=null,this.pendingLatch=null,this.vibeExamples=["Rainy drive at 2am, first day of summer...","Portishead trip-hop","Bohemian Rhapsody","Tame Impala neo-psychedelia","Warm acoustic fireplace"],this.placeholderTimer=null,this.unsubscribeProjects=null,this.onResizeHandler=()=>{this.isMobile=window.innerWidth<900},this.handleKeyDown=t=>{if(t.key==="Escape"&&(this.vibeOpen||this.tempoOpen||this.feelOpen)){t.preventDefault(),this.vibeOpen=!1,this.tempoOpen=!1,this.feelOpen=!1,this.requestUpdate();return}if(this.isEditableTarget(t))return;if(t.key===" "||t.code==="Space"){t.preventDefault(),this.togglePlay();return}if(t.ctrlKey||t.metaKey||t.altKey)return;const e=ai.map(i=>i.toLowerCase()).indexOf((t.key||"").toLowerCase()),o=this.progression?.chords||[];if(e>=0&&e<o.length){t.preventDefault();const i=88+e%3*6,s=o[e],n=this.getLadderHome(s),r=s.voicing||"1st inversion",a=is(r),l=this.progression?.key||"C",d=this.progression?.scaleType||"MAJOR",c=s.notes&&s.notes.length?s.notes:V(s.name,j(l,d));this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const p=a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:r,vel:i,zone:a,reach:n,meta:p},v.playChordNotes(c,.85,r,i),this.requestUpdate()}},this.handleKeyUp=t=>{if(this.isEditableTarget(t)||t.ctrlKey||t.metaKey||t.altKey)return;ai.map(o=>o.toLowerCase()).indexOf((t.key||"").toLowerCase())>=0&&(this.padFlash=-1,this.requestUpdate())},this.toggleVibe=()=>{this.vibeOpen=!this.vibeOpen,this.requestUpdate()},this.setLibraryOpen=t=>{this.libraryOpen=t,this.dispatchEvent(new CustomEvent("library-open-change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrary=()=>{this.setLibraryOpen(!this.libraryOpen)},this.toggleSaved=()=>{this.isSaved?this.dispatchEvent(new CustomEvent("unsave-set",{detail:this.currentProjectId,bubbles:!0,composed:!0})):(this.pendingSaveName=this.getSuggestedLoopName(),this.showSaveModal=!0,this.updateComplete.then(()=>{const t=this.renderRoot?.querySelector(".save-modal-input");t?.focus(),t?.select()}))},this.cancelSaveModal=()=>{this.showSaveModal=!1,this.pendingSaveName=""},this.confirmSaveModal=()=>{const t=this.pendingSaveName.trim()||this.getSuggestedLoopName();this.dispatchEvent(new CustomEvent("save-set",{detail:t,bubbles:!0,composed:!0})),this.showSaveModal=!1,this.pendingSaveName=""},this.onSaveNameKeydown=t=>{t.key==="Enter"?this.confirmSaveModal():t.key==="Escape"&&this.cancelSaveModal()},this.startRename=(t,e)=>{this.renamingId=t,this.draftName=e,this.confirmDeleteId=null,this.requestUpdate(),this.updateComplete.then(()=>{const o=this.renderRoot?.querySelector(".library-rename-input");o?.focus(),o?.select()})},this.commitRename=t=>{const e=this.renamingId,o=this.draftName.trim();if(e&&o){const i=L.getProjects().find(s=>s.id===e);i&&(i.name=o,L.saveProject(i)),this.savedSets=this.savedSets.map(s=>s.id===e?{...s,name:o}:s),this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:e,name:o},bubbles:!0,composed:!0}))}this.renamingId=null,this.draftName="",this.requestUpdate()},this.cancelRename=()=>{this.renamingId=null,this.draftName="",this.requestUpdate()},this.askDelete=t=>{this.confirmDeleteId=t,this.renamingId=null,this.requestUpdate()},this.cancelDelete=()=>{this.confirmDeleteId=null,this.requestUpdate()},this.confirmDelete=t=>{L.deleteProject(t),this.savedSets=this.savedSets.filter(e=>e.id!==t),this.dispatchEvent(new CustomEvent("delete-project",{detail:t,bubbles:!0,composed:!0})),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("toast",{detail:"Deleted loop",bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleLibrarySelectMode=()=>{this.librarySelectMode=!this.librarySelectMode,this.librarySelectMode||(this.librarySelected=[]),this.requestUpdate()},this.toggleSelectLoop=t=>{this.librarySelected.includes(t)?this.librarySelected=this.librarySelected.filter(e=>e!==t):this.librarySelected=[...this.librarySelected,t],this.requestUpdate()},this.toggleSelectAllVisible=()=>{const t=this.librarySearch.trim().toLowerCase(),o=this.savedSets.filter(s=>!t||(s.name+" "+s.genre+" "+s.mood).toLowerCase().includes(t)).map(s=>s.id);if(o.length>0&&o.every(s=>this.librarySelected.includes(s)))this.librarySelected=this.librarySelected.filter(s=>!o.includes(s));else{const s=new Set([...this.librarySelected,...o]);this.librarySelected=Array.from(s)}this.requestUpdate()},this.deleteSelectedLoops=()=>{const t=[...this.librarySelected];if(!t.length)return;const e=t.length;for(const o of t)L.deleteProject(o),this.dispatchEvent(new CustomEvent("delete-project",{detail:o,bubbles:!0,composed:!0}));this.savedSets=L.getProjects(),this.librarySelected=[],this.savedSets.length||(this.librarySelectMode=!1),this.dispatchEvent(new CustomEvent("toast",{detail:`Deleted ${e} loop${e>1?"s":""}`,bubbles:!0,composed:!0})),this.requestUpdate()},this.togglePlay=()=>{this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))},this.clearSelection=()=>{this.swapIndex=null,this.isInspectorOpen=!1,this.detailOpen=!1,this.abPick=null,this.abPlaying=!1,v.setABOverride(null),this.requestUpdate()},this.toggleABPlayback=()=>{if(!(!this.progression||this.swapIndex===null)){if(this.abPlaying=!this.abPlaying,this.abPlaying){const t=j(this.progression.key,this.progression.scaleType),e=this.abSide==="after"&&this.abPick?{...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:V(this.abPick.chord,t)}:this.progression.chords[this.swapIndex];v.setABOverride({index:this.swapIndex,side:this.abSide,chord:e}),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}else this.playing&&this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),v.setABOverride(null);this.requestUpdate()}},this.confirmSwap=()=>{if(this.swapIndex===null||!this.abPick||!this.progression)return;const t=j(this.progression.key,this.progression.scaleType),e=this.abPick.notes&&this.abPick.notes.length?this.abPick.notes:V(this.abPick.chord,t),o=[...this.progression.chords],i=o[this.swapIndex],s=i.initialChord||{...i};o[this.swapIndex]={...i,name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:e,initialChord:s};const n={...this.progression,chords:o};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Swapped in ${this.abPick.chord}`,bubbles:!0,composed:!0})),v.setABOverride(null),this.abPlaying=!1,this.swapIndex=null,this.isInspectorOpen=!1,this.mobileSheetOpen=!1,this.abPick=null,this.requestUpdate()},this.handleCyclerKeep=t=>{t&&t.chordName&&(!this.abPick||this.abPick.chord!==t.chordName)&&this.handleSwapAudition({chordName:t.chordName,roman:t.roman||"",tension:t.tension??.3,sub:t.sub||"",feel:t.feel||"Resolve home",chord:t.chord}),this.confirmSwap()},this.onDecLength=()=>{const t=this.progression?.chords.length||4;t>_t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t-1,bubbles:!0,composed:!0}))},this.onIncLength=()=>{const t=this.progression?.chords.length||4;t<Et&&this.dispatchEvent(new CustomEvent("set-length",{detail:t+1,bubbles:!0,composed:!0}))},this.onSetLength=t=>{(this.progression?.chords.length||4)!==t&&this.dispatchEvent(new CustomEvent("set-length",{detail:t,bubbles:!0,composed:!0}))},this.onReroll=()=>{if(this.selectedBand){this.onGenerateBandProgression(this.selectedBand);return}this.dispatchEvent(new CustomEvent("reroll",{bubbles:!0,composed:!0}))},this.onTheoryToggle=()=>{this.showTheory=!this.showTheory,this.dispatchEvent(new CustomEvent("theory-toggle",{detail:this.showTheory,bubbles:!0,composed:!0})),this.requestUpdate()},this.toggleInstrumentExpand=()=>{this.expandedInstrument=!this.expandedInstrument,this.requestUpdate()},this.onParameterOverride=t=>{const{param:e,value:o}=t.detail;this.advOverride={...this.advOverride,[e]:o},v.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onParameterRelink=t=>{const{param:e}=t.detail,o={...this.advOverride};delete o[e],this.advOverride=o,v.setFeelSettings({advOverride:this.advOverride}),this.requestUpdate()},this.onHumanChange=t=>{t.detail&&(this.humanEngineState=t.detail,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))},this.onHumanPreview=t=>{t.detail&&(this.humanEngineState=t.detail,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:t.detail}))}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onResizeHandler),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.placeholderTimer=setInterval(()=>{this.vibePlaceholderIdx=(this.vibePlaceholderIdx+1)%this.vibeExamples.length},2800),this.savedSets=L.getProjects(),this.unsubscribeProjects=typeof L.subscribeProjects=="function"?L.subscribeProjects(()=>{this.savedSets=L.getProjects(),this.requestUpdate()}):typeof L.subscribe=="function"?L.subscribe(()=>{this.savedSets=L.getProjects(),this.requestUpdate()}):null,v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride}),v.setBarsPerChord(this.barsPerChord),ke(this.tone)}updated(t){super.updated(t),(t.has("swing")||t.has("spread")||t.has("density")||t.has("humanise")||t.has("playStyle")||t.has("tone")||t.has("barFeel")||t.has("advOverride")||t.has("humanEngineState"))&&(v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:this.barFeel,advOverride:this.advOverride,humanState:this.humanEngineState}),t.has("playStyle")&&v.setPlayStyle(this.playStyle),t.has("tone")&&ke(this.tone)),t.has("barsPerChord")&&v.setBarsPerChord(this.barsPerChord)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.onResizeHandler),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.unsubscribeProjects&&this.unsubscribeProjects()}isEditableTarget(t){const e=s=>{if(!s||typeof s!="object")return!1;const n=s,r=(n.tagName||"").toUpperCase();return r==="INPUT"||r==="TEXTAREA"||r==="SELECT"||!!n.isContentEditable},o=typeof t.composedPath=="function"?t.composedPath():[t.target];for(const s of o)if(e(s))return!0;let i=typeof document<"u"?document.activeElement:null;for(;i&&i.shadowRoot&&i.shadowRoot.activeElement;)i=i.shadowRoot.activeElement;return!!e(i)}getSuggestedLoopName(){if(this.selectedBand)return`${this.selectedBand} vibe`;const t=this.progression?.genre||"Loop",e=this.progression?.mood?this.progression.mood.toLowerCase():"";return e?`${t} ${e}`:`${t} loop`}getVibeSummary(){const t=[this.progression?.genre||"Pop",(this.progression?.mood||"Warm").toLowerCase()];return this.selectedBand&&t.push(this.selectedBand),t.join(" · ")}onGenreClick(t){this.dispatchEvent(new CustomEvent("set-genre",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onMoodClick(t){this.dispatchEvent(new CustomEvent("set-mood",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}onBandClick(t){if(this.bandSwaps={},this.selectedBand===t){this.selectedBand=null,this.requestUpdate();return}this.selectedBand=t;const e=Ae(t);if(e){const o=hi(e.presetId),i=ui(e.rhythmStyle);o&&(this.instrument=o,v.setInstrument(o),this.dispatchEvent(new CustomEvent("set-instrument",{detail:o,bubbles:!0,composed:!0}))),i&&(this.playStyle=i,v.setPlayStyle(i),this.dispatchEvent(new CustomEvent("set-play-style",{detail:i,bubbles:!0,composed:!0}))),e.defaultBpm&&this.setDirectBpm(e.defaultBpm),this.dispatchEvent(new CustomEvent("toast",{detail:`Artist DNA: ${e.name} · ${o||""} · ${e.defaultBpm} BPM`,bubbles:!0,composed:!0}))}this.requestUpdate()}onWriteBandLoop(t){this.bandSwaps={},this.onGenerateBandProgression(t.name)}onGenerateBandProgression(t){if(!this.progression||!this.chordData)return;this.bandSwaps={};const e=this.progression.key||"C",o=this.progression.scaleType||"MAJOR",i=na(this.chordData,t,e,o);if(i){const s=Ae(t);if(s){const n=hi(s.presetId),r=ui(s.rhythmStyle);n&&(this.instrument=n,v.setInstrument(n),this.dispatchEvent(new CustomEvent("set-instrument",{detail:n,bubbles:!0,composed:!0}))),r&&(this.playStyle=r,v.setPlayStyle(r),this.dispatchEvent(new CustomEvent("set-play-style",{detail:r,bubbles:!0,composed:!0}))),s.defaultBpm&&this.setDirectBpm(s.defaultBpm)}this.progression=i,this.order=Array.from({length:i.chords.length},(n,r)=>r),v.setProgression(i,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:i,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Generated ${t} progression in ${e} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}}applyBandMove(t,e,o){if(!this.progression)return;const i=this.progression.chords[t];if(!i)return;this.bandSwaps={...this.bandSwaps,[t]:{originalChord:{...i},move:e}};const s={...i,name:e.chord,roman:e.roman,functionLabel:`${o.name} Move`,desc:`${o.name} signature move (${e.name})`,tension:i.tension,tag:"glow",color:ne(i.tension).color},n=[...this.progression.chords];n[t]=s;const r={...this.progression,chords:n};this.progression=r,v.setProgression(r,this.order),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`${o.name} move: ${e.name} applied to Bar ${t+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}revertBandMove(t){if(!this.progression||!this.bandSwaps[t])return;const{originalChord:e}=this.bandSwaps[t],o={...this.bandSwaps};delete o[t],this.bandSwaps=o;const i=[...this.progression.chords];i[t]=e;const s={...this.progression,chords:i};this.progression=s,v.setProgression(s,this.order),v.auditionChord(e,.8),this.dispatchEvent(new CustomEvent("progression-change",{detail:s,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Reverted Bar ${t+1} to ${e.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}onApplyBandTrick(t,e){if(!this.progression||!this.chordData)return;const o=e!==void 0?e:this.swapIndex!==null?this.swapIndex:this.progression.chords.length>2?2:0,i=this.progression.chords[o];if(!i)return;const s={...i,name:t.chordName,roman:t.roman,notes:t.notes,functionLabel:`${this.selectedBand||"Artist"} Trick`,desc:t.plain,tension:t.tension,tag:"glow",color:ne(t.tension).color},n=[...this.progression.chords];n[o]=s;const r={...this.progression,chords:n};this.progression=r,v.setProgression(r,this.order),this.dispatchEvent(new CustomEvent("progression-change",{detail:r,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Injected ${t.trick.name} (${t.chordName}) at Bar ${o+1}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderTopBandBar(){const t=this.selectedBand?Ae(this.selectedBand):null;if(!t)return"";const e=io[t.name]||{font:t.font,pillFs:13,pillTrack:"0"};return g`
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
    `}renderBandLegend(){const t=this.selectedBand?Ae(this.selectedBand):null;return t?g`
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
    `:""}renderBandInspectorCard(t){const e=io[t.name]||{font:t.font,weight:t.weight||400,italic:t.italic,pillFs:t.pillFs||13,pillTrack:t.pillTrack||"0"};return g`
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
            ${t.sig.map((o,i)=>g`
              <div style="${i?"padding-top: 10px; border-top: 1px solid rgba(46,39,31,0.07);":""}">
                <div style="font-size: 9px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase; color: var(--cv-label);">${o.k}</div>
                <div style="font-size: 11.5px; font-weight: 600; line-height: 1.45; color: var(--cv-ink); margin-top: 2px; text-wrap: pretty;">${o.v}</div>
              </div>
            `)}
          </div>
        `:g`
          <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink); margin-top: 8px; line-height: 1.45;">${this.showTheory?t.theory:t.plain}</div>
        `}
      </div>
    `}renderBandDnaBar(t){return this.renderBandLegend()}onVibeSubmit(t){t.preventDefault();const e=this.freeText.trim();e&&(this.dispatchEvent(new CustomEvent("freetext-generate",{detail:{promptText:e},bubbles:!0,composed:!0})),this.vibeOpen=!1,this.requestUpdate())}onJumpBar(t){this.progressStep=t,v.playFromBar(t),this.playing||this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0})),this.requestUpdate()}getChordLadder(t){if(!t)return[];const e=String(t.name),o=(e.match(/^[A-G][#b]?/)||["C"])[0];return(/sus/.test(e)?["sus4","7sus4","9sus4","maj7sus4"]:/dim/.test(e)?["dim","dim7","dim9"]:/^[A-G][#b]?m(?!aj)/.test(e)?["m","m6","m7","m9","mMaj7"]:["","6","7","maj7","maj9"]).map(s=>o+s)}getLadderHome(t){return this.getChordLadder(t).indexOf(t&&t.name)}handlePadPointerDown(t,e){const o=this.progression?.chords,i=o?o[e]:null;if(!i)return;let s=i.voicing||"1st inversion",n=is(s),r;const a=this.getChordLadder(i),l=this.getLadderHome(i);if(t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const b=t.currentTarget.getBoundingClientRect(),y=Math.min(.999,Math.max(0,(t.clientX-b.left)/(b.width||1))),x=Math.min(.999,Math.max(0,(t.clientY-b.top)/(b.height||1)));x<.34?(n=0,s="up an octave"):x>.67?(n=2,s="low, root position"):(n=1,s="1st inversion"),a.length>0&&(r=Math.min(a.length-1,Math.floor(y*a.length)));try{t.currentTarget.setPointerCapture?.(t.pointerId)}catch{}}const d=r!==void 0&&a[r]?a[r]:i.name,c=r!==void 0&&r!==l&&!!a[r],p=this.progression?.key||"C",u=this.progression?.scaleType||"MAJOR",h=V(d,j(p,u)),m=88+e%3*6;this.gridTimer&&(clearTimeout(this.gridTimer),this.gridTimer=null),this.padFlash=e,this.padHeld=e,this.gridFor=e;const f=c?"→ "+d:n===0?"UP AN OCTAVE":n===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:s,vel:m,zone:n,reach:r,meta:f},v.playChordNotes(h,.85,s,m),this.pendingLatch={index:e,reach:r,voicing:s,targetChordName:d},this.requestUpdate()}handlePadPointerMove(t,e){if(this.padHeld!==e)return;const o=this.progression?.chords,i=o?o[e]:null;if(i&&t.currentTarget&&typeof t.currentTarget.getBoundingClientRect=="function"){const s=t.currentTarget.getBoundingClientRect(),n=Math.min(.999,Math.max(0,(t.clientX-s.left)/(s.width||1))),r=Math.min(.999,Math.max(0,(t.clientY-s.top)/(s.height||1)));let a=1,l="1st inversion";r<.34?(a=0,l="up an octave"):r>.67&&(a=2,l="low, root position");const d=this.getChordLadder(i),c=this.getLadderHome(i),p=d.length>0?Math.min(d.length-1,Math.floor(n*d.length)):void 0,u=p!==void 0&&d[p]?d[p]:i.name,h=p!==void 0&&p!==c&&!!d[p];if(this.pendingLatch?.reach!==p||this.pendingLatch?.voicing!==l){this.pendingLatch={index:e,reach:p,voicing:l,targetChordName:u};const m=this.progression?.key||"C",f=this.progression?.scaleType||"MAJOR",b=V(u,j(m,f)),y=88+e%3*6,x=h?"→ "+u:a===0?"UP AN OCTAVE":a===1?"1ST INVERSION":"ROOT POSITION";this.lastPad={idx:e,voicing:l,vel:y,zone:a,reach:p,meta:x},v.playChordNotes(b,.65,l,y),this.requestUpdate()}}}handlePadPointerUp(t){if(t&&t.currentTarget)try{t.currentTarget.releasePointerCapture?.(t.pointerId)}catch{}if(this.padFlash=-1,this.padHeld=-1,this.gridTimer&&clearTimeout(this.gridTimer),this.gridTimer=window.setTimeout(()=>{this.gridFor=-1,this.requestUpdate()},1100),this.pendingLatch){const{index:e,reach:o,voicing:i,targetChordName:s}=this.pendingLatch;if(this.pendingLatch=null,this.progression&&this.progression.chords[e]){const n=this.progression.chords[e],r=this.getChordLadder(n),a=this.getLadderHome(n),l=n.voicing||"1st inversion",d=o!==void 0&&o!==a&&!!r[o]&&!!s;if(d||!!i&&i!==l){const p=n.initialChord||{...n};let u;if(d&&s){const f=this.getChordQualityLabel(n.name),b=this.getChordExtensionLabel(s),y=this.progression.key||"C",x=this.progression.scaleType||"MAJOR";u=vo(n,f,b),u.name=s,u.notes=V(s,j(y,x))}else u={...n};i&&(u.voicing=i),u.name===p.name&&(!p.voicing||u.voicing===p.voicing)?delete u.initialChord:u.initialChord=p;const h=[...this.progression.chords];h[e]=u;const m={...this.progression,chords:h};this.progression=m,this.dispatchEvent(new CustomEvent("progression-change",{detail:m,bubbles:!0,composed:!0})),v.setProgression(m,this.order)}}}this.requestUpdate()}openSwap(t){this.swapIndex=t,this.detailOpen=!1,this.isInspectorOpen=!0,this.abPick=null,this.abSide="before",this.abPlaying=!1,this.mobileFeelIndex=0,this.mobileChordIndex=0,this.activeSwapFamily="Darker",v.setABOverride(null),this.requestUpdate()}getSwapFeelings(t){if(!this.progression||!this.chordData.scales)return[];const e=this.progression.scaleType?.includes("MINOR")??!1,o=vi(this.chordData,this.progression),i=Co(this.chordData,this.progression),s=o.map(d=>({name:d.name,sub:co[d.name]?co[d.name][this.showTheory?1:0]:d.sub||"",tension:d.tension,rows:d.rows.map(c=>({name:c.name,roman:c.roman||"",notes:c.notes||c.chord?.notes,sub:c.sub,tension:c.tension,chord:c.chord}))}));s.push({name:"Borrowed",sub:`Four chords from the ${e?"major":"minor"} version of this key`,tension:.45,rows:i.map(d=>({name:d.name,roman:d.roman||"",notes:d.notes||d.chord?.notes,sub:d.sub,tension:d.tension,chord:d.chord}))});const n=s.filter(d=>d.name!=="Borrowed").sort((d,c)=>d.tension-c.tension),r=s.filter(d=>d.name==="Borrowed"),a=[...n,...r],l=this.selectedBand?Ae(this.selectedBand):null;if(l){const d=xi(this.progression.key||"C",this.progression.scaleType||"MAJOR",l.name),c=new Map(d.map(p=>[p.chordName,p]));a.forEach(p=>{const u=p.rows.map(f=>{const b=c.get(f.name);return b?{...f,bandTag:`${l.name} move`,bandColor:l.color,sub:this.showTheory?b.theory:b.plain}:f}),h=u.filter(f=>f.bandTag),m=u.filter(f=>!f.bandTag);p.rows=[...h,...m]})}return a}handleSwapAudition(t){if(this.swapIndex===null||!this.progression)return;const e=this.progression.chords[this.swapIndex],o=j(this.progression.key,this.progression.scaleType),i=t.notes&&t.notes.length?t.notes:V(t.chordName,o)||e.notes,s=t.chord?{...t.chord,name:t.chordName,notes:i,roman:t.roman||t.chord.roman||"",tension:t.tension,functionLabel:t.sub||t.chord.functionLabel||"Swapped in"}:{...e,name:t.chordName,notes:i,roman:t.roman||"",tension:t.tension,functionLabel:t.sub||"Swapped in"};this.abPick={chord:t.chordName,name:t.chordName,roman:t.roman||"",notes:i,tension:t.tension,fn:t.sub,functionLabel:t.sub,label:t.chordName},this.abSide="after",this.activeSwapFamily=t.feel,v.auditionChord(s,.8),v.setABOverride({index:this.swapIndex,side:"after",chord:s}),this.requestUpdate()}openDetail(t){this.detailIndex=t,this.detailOpen=!0,this.swapIndex=null,this.isInspectorOpen=!1,this.isMobile&&(this.mobileDetailSheetOpen=!0),this.requestUpdate()}selectAlternative(t){const e=this.progression?j(this.progression.key,this.progression.scaleType):!1,o=t.chord.notes&&t.chord.notes.length>0?t.chord.notes:V(t.chord.name,e);this.abPick={chord:t.name,tension:t.tension,roman:t.roman||"",fn:t.sub,label:t.name},this.abSide="after",this.swapIndex!==null&&this.progression&&v.setABOverride({index:this.swapIndex,side:"after",chord:{...this.progression.chords[this.swapIndex],name:t.name,roman:t.roman||"",tension:t.tension,notes:o}}),v.auditionChord({...t.chord,notes:o},.8),this.requestUpdate()}previewAlternative(t){if(!this.progression)return;const e=j(this.progression.key,this.progression.scaleType),o=V(t,e);v.auditionChord({name:t,notes:o,tag:"",color:"#F2A79B",functionLabel:"",desc:"",degree:"",scaleKey:this.progression.key,roman:"",scaleLabel:"",tension:.2},.8)}setABSide(t){if(this.abSide=t,this.swapIndex!==null&&this.progression){const e=j(this.progression.key,this.progression.scaleType);if(t==="before")v.setABOverride({index:this.swapIndex,side:"before",chord:this.progression.chords[this.swapIndex]}),v.auditionChord(this.progression.chords[this.swapIndex],.8);else if(this.abPick){const o=V(this.abPick.chord,e),i={...this.progression.chords[this.swapIndex],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:o};v.setABOverride({index:this.swapIndex,side:"after",chord:i}),v.auditionChord(i,.8)}}this.requestUpdate()}onAbCellClick(t){if(!this.progression)return;if(t===this.swapIndex&&this.abSide==="after"&&this.abPick){const o=j(this.progression.key,this.progression.scaleType),i={...this.progression.chords[t],name:this.abPick.chord,roman:this.abPick.roman,tension:this.abPick.tension,notes:V(this.abPick.chord,o)};v.auditionChord(i,.8)}else v.playChordAtIndex(t,.8)}getChordQualityLabel(t){if(!t)return"Major";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/sus/i.test(e)?"Suspended (sus)":/(dim|°)/i.test(e)?"Diminished":/^(m|min)(?!aj)/.test(e)?"Minor":"Major"}getChordQualitySub(t){switch(this.getChordQualityLabel(t)){case"Minor":return"warm";case"Suspended (sus)":return"floating";case"Diminished":return"unstable";default:return"bright"}}getChordExtensionLabel(t){if(!t)return"None";const e=t.trim().replace(/^[A-G][#b♭♯]?/i,"");return/9/.test(e)?"9th":/(maj7|\(maj7\)|Δ)/i.test(e)||/M7/.test(e)?"Major 7th (M7)":/6/.test(e)?"6th":/(7|11|13)/.test(e)?"7th (dom / m7)":"None"}getChordExtensionSub(t){switch(this.getChordExtensionLabel(t)){case"6th":return"soft lift";case"7th (dom / m7)":return"classic tension";case"Major 7th (M7)":return"lush, jazzy";case"9th":return"wide, colorful";default:return"triad only"}}changeChordQuality(t){if(!this.progression)return;const e=[...this.progression.chords],o=e[this.detailIndex];if(!o)return;const i=this.getChordExtensionLabel(o.name),s=vo(o,t,i);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}changeChordExtension(t){if(!this.progression)return;const e=[...this.progression.chords],o=e[this.detailIndex];if(!o)return;const i=this.getChordQualityLabel(o.name),s=vo(o,i,t);e[this.detailIndex]=s;const n={...this.progression,chords:e};this.progression=n,this.dispatchEvent(new CustomEvent("progression-change",{detail:n,bubbles:!0,composed:!0})),v.auditionChord(s,.8),this.dispatchEvent(new CustomEvent("toast",{detail:`Changed chord to ${s.name}`,bubbles:!0,composed:!0})),this.requestUpdate()}renderDetailKeyboard(t=[]){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,F:5,"E#":5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},o=new Set(t.map(a=>e[a.replace(/\d+$/,"")]??-1)),i=[{note:"C",pc:0},{note:"D",pc:2},{note:"E",pc:4},{note:"F",pc:5},{note:"G",pc:7},{note:"A",pc:9},{note:"B",pc:11}],s=100/7,n=s*.58,r=[{note:"C#",pc:1,after:0},{note:"D#",pc:3,after:1},{note:"F#",pc:6,after:3},{note:"G#",pc:8,after:4},{note:"A#",pc:10,after:5}];return g`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${i.map(a=>{const l=o.has(a.pc);return g`<div class="white-key ${l?"active":""}">${a.note}</div>`})}
        </div>
        ${r.map(a=>{const l=(a.after+1)*s-n/2,d=o.has(a.pc);return g`<div class="black-key ${d?"active":""}" style="left: ${l}%;"></div>`})}
      </div>
    `}get feelChanged(){return this.playStyle!==$e.playStyle||this.swing!==$e.swing||this.spread!==$e.spread||this.density!==$e.density||this.humanise!==$e.humanise||this.tone!==$e.tone||Object.keys(this.barFeel).length>0||Object.keys(this.advOverride).length>0}resetFeel(){this.playStyle=$e.playStyle,this.swing=$e.swing,this.spread=$e.spread,this.density=$e.density,this.humanise=$e.humanise,this.tone=$e.tone,this.barFeel={},this.advOverride={},this.humanEngineState=null,v.setPlayStyle(this.playStyle),v.setFeelSettings({playStyle:this.playStyle,swing:this.swing,spread:this.spread,density:this.density,humanise:this.humanise,tone:this.tone,barFeel:{},advOverride:{},humanState:void 0}),ke(this.tone),this.requestUpdate()}get fScopeBar(){return typeof this.feelScope=="number"?this.feelScope:null}fget(t){const e=this.fScopeBar;return e!==null&&this.barFeel[e]&&this.barFeel[e][t]!==void 0?this.barFeel[e][t]:this[t]}fset(t,e){const o=this.fScopeBar;if(o===null)this[t]=e,t==="playStyle"?(v.setPlayStyle(e),this.dispatchEvent(new CustomEvent("set-play-style",{detail:e,bubbles:!0,composed:!0}))):t==="tone"?(v.setFeelSettings({tone:e}),ke(e)):v.setFeelSettings({[t]:e});else{const i={...this.barFeel};i[o]={...i[o]||{},[t]:e},this.barFeel=i,v.setFeelSettings({barFeel:i})}this.requestUpdate()}getPatternShortName(t){const e=t||this.fget("playStyle")||this.playStyle||"Block chords",o=li[0].steps.find(i=>i.v===e);return o?o.name:"Block"}get feelChipLabel(){return`Feel · ${this.getPatternShortName()}`}getDerivedParams(){const t=r=>{const a=this.fget(r);return typeof a=="number"?a:0},e=this.fget("playStyle")||this.playStyle||"Block chords",i=Ut.find(r=>r.name===e)?.patch??{},s=this.progression?.genre??"Pop",n=Ii[s]??{};return{spread:+(t("spread")/100).toFixed(2),duration:+(e==="Half-time"?1.6:t("density")>70?.65:1).toFixed(2),humanVariance:+(t("humanise")/100).toFixed(2),microTiming:+(t("swing")/100*.5+t("humanise")/100*.3).toFixed(2),arpMode:i.arpMode??n.arpMode??"off",arpRate:i.arpRate??n.arpRate??"1/16",arpRange:i.arpRange??n.arpRange??1,arpGate:.85,minVelocity:n.minVelocity??60,maxVelocity:n.maxVelocity??110}}get activeEngineParams(){const t=this.getDerivedParams();return{spread:this.advOverride.spread!==void 0?this.advOverride.spread:t.spread,duration:this.advOverride.duration!==void 0?this.advOverride.duration:t.duration,humanVariance:this.advOverride.humanVariance!==void 0?this.advOverride.humanVariance:t.humanVariance,microTiming:this.advOverride.microTiming!==void 0?this.advOverride.microTiming:t.microTiming,arpMode:this.advOverride.arpMode!==void 0?this.advOverride.arpMode:t.arpMode,arpRate:this.advOverride.arpRate!==void 0?this.advOverride.arpRate:t.arpRate,arpRange:this.advOverride.arpRange!==void 0?this.advOverride.arpRange:t.arpRange,arpGate:this.advOverride.arpGate!==void 0?this.advOverride.arpGate:t.arpGate,minVelocity:this.advOverride.minVelocity!==void 0?this.advOverride.minVelocity:t.minVelocity,maxVelocity:this.advOverride.maxVelocity!==void 0?this.advOverride.maxVelocity:t.maxVelocity}}nudgeBpm(t){const e=this.progression?.bpm||84,o=Math.max(40,Math.min(240,e+t));this.progression&&(this.progression.bpm=o),v.setBpm(o),this.dispatchEvent(new CustomEvent("set-bpm",{detail:o,bubbles:!0,composed:!0})),this.requestUpdate()}setDirectBpm(t){if(isNaN(t))return;const e=Math.max(40,Math.min(240,t));this.progression&&(this.progression.bpm=e),v.setBpm(e),this.dispatchEvent(new CustomEvent("set-bpm",{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}setBarsPerChord(t){this.barsPerChord=t,v.setBarsPerChord(t),this.requestUpdate()}getCurrentScaleAbbrev(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=lo.find(o=>o.type===t||o.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.abbrev:"Maj"}getCurrentScaleLabel(){const t=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),e=lo.find(o=>o.type===t||o.type==="NATURAL_MINOR"&&t==="MINOR");return e?e.label:"Major"}selectRoot(t){if(!this.progression)return;const e=this.progression.scaleType||"MAJOR",o=Vi(this.progression,t,e);this.progression=o,v.setProgression(o),this.dispatchEvent(new CustomEvent("progression-change",{detail:o,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${o.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectScale(t){if(!this.progression)return;const e=dr(this.progression,t);this.progression=e,v.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Scale shifted to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}selectKey(t){if(!this.progression)return;const e=Vi(this.progression,t);this.progression=e,v.setProgression(e),this.dispatchEvent(new CustomEvent("progression-change",{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("toast",{detail:`Transposed to ${e.key} ${this.getCurrentScaleLabel()}`,bubbles:!0,composed:!0})),this.requestUpdate()}onScaleDegreeClick(t,e,o,i){this.auditionDeg=t,this.auditionName=e,this.auditionBar=o?i+1:0;const s=j(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=V(e,s);v.auditionChord({name:e,notes:n},.8),this.requestUpdate()}getTheoryData(t){const e=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),o=ci[e]||ci[e.includes("MINOR")?"NATURAL_MINOR":"MAJOR"]||ci.MAJOR,i=this.progression?.key||"C",s=U[i.replace(/♭/g,"b").replace(/♯/g,"#").trim()]??0;j(i,e);const n=i.replace("b","♭")+" "+o.name,r=t.map(f=>{const b=ce(f.name);return U[b.root]??0}),a=f=>o.steps.indexOf(((f-s)%12+12)%12),l=o.steps.map((f,b)=>{const y=(s+f)%12,C=Ga[y]+o.quals[b],I=r.indexOf(y),S=I>=0,A=this.auditionDeg===b;return{di:b,roman:o.romans[b],name:C,fn:o.fns[b],inLoop:S,on:A,barIdx:I,aria:`Hear ${C}, the ${o.fns[b].toLowerCase()} of ${n}`}}),d=this.auditionDeg===null||this.auditionDeg<0?"Tap a degree to hear it":this.auditionBar?`${this.auditionName} · bar ${this.auditionBar} of the loop`:`${this.auditionName} · not in this loop`,c=t.map(f=>f.roman||o.romans[Math.max(0,a(U[ce(f.name).root]??0))]).join(" – "),p=i.replace("b","♭")+" "+o.name,u=Ps(t),h=Rs(t),m=this.progression?.note||"";return{scaleName:n,scaleHint:d,scaleDegrees:l,romanFormula:c,keyModeLine:p,cadences:u,voiceLinks:h,setNote:m}}renderScaleChords(t,e,o,i){const s=jt(this.progression?.mood||"Warm");return g`
      <div
        class="scale-chords-panel"
        style="position: relative; z-index: 2; background: var(--cv-cream); border-radius: ${i?"18px":"20px"}; padding: ${i?"11px 12px 13px":"13px 15px 15px"}; margin-top: ${i?"12px":"0"}; margin-bottom: ${i?"0":"12px"}; flex-shrink: 0;"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${i?"8px":"12px"}; flex-wrap: wrap;">
          <div style="font-size: ${i?"9.5px":"10px"}; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
            Scale · ${t}
          </div>
          <div style="font-size: ${i?"10.5px":"11px"}; font-weight: 700; color: rgba(46, 39, 31, 0.45);">
            ${e}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${i?"76px":"92px"}, 1fr)); gap: ${i?"5px":"6px"}; margin-top: ${i?"9px":"10px"}; min-width: 0;">
          ${o.map(n=>g`
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
              ${ss.map(e=>{const o=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),i=U[o]??0,s=U[e.root]??0,n=i===s;return g`
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
              ${lo.map(e=>{const o=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=o===e.type||e.type==="NATURAL_MINOR"&&o==="MINOR";return g`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${i?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${i?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
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
            ${(this.progression?.chords||[]).map((e,o)=>{const i=this.fScopeBar===o,s=!!this.barFeel[o];return g`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${i?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${i?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=o}}
                  aria-label="${e.name}, ${i?"editing":"edit feel"}"
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${i?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${s?1:0}; transition: opacity 150ms ease;"></span>
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
          ${li.map(e=>{const o=this.fget(e.k);let i=e.steps[0];return typeof o!="number"?i=e.steps.find(s=>s.v===o)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(o))<Math.abs(Number(i.v)-Number(o))&&(i=s)}),g`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${e.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${e.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${e.steps.map(s=>{const n=s.v===i.v;return g`
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
            ${ss.map(e=>{const o=(this.progression?.key||"C").replace(/♭/g,"b").replace(/♯/g,"#").trim(),i=U[o]??0,s=U[e.root]??0,n=i===s;return g`
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
            ${lo.map(e=>{const o=(this.progression?.scaleType||"MAJOR").toUpperCase().replace(/\s+/g,"_"),i=o===e.type||e.type==="NATURAL_MINOR"&&o==="MINOR";return g`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${i?"var(--cv-ink, #2E271F)":"var(--cv-cream, #FBF3E6)"}; color: ${i?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>this.selectScale(e.type)}
                  aria-label="Scale ${e.label}"
                >
                  ${e.label}
                </button>
              `})}
          </div>
        </div>
      </div>
    `}onSelectSectionCard(t){this.activeSectionIdx=t,this.activeView="loop",this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}renderSongSectionList(t){const e=this.sections.length<ot.length;return g`
      <div class="song-view-wrap song-section-view">
        <div class="song-section-lead">
          Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
        </div>

        <div class="song-section-list">
          ${this.sections.map((o,i)=>{const s=this.activeSectionIdx===i;return g`
              <div
                class="song-section-row ${s?"active":""}"
                @click=${()=>this.onSelectSectionCard(i)}
                role="button"
                tabindex="0"
                aria-label="Edit section ${i+1} ${o.name}"
              >
                <div class="song-section-index">SECTION ${i+1}</div>
                <div class="song-section-info">
                  <div class="song-section-title">${o.name}</div>
                  <div class="song-section-desc">${o.desc}</div>
                </div>
                <div class="song-section-chips">
                  ${o.progression.chords.map(n=>{const r=ne(n.tension);return g`
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
                    title="Remove ${o.name}"
                    aria-label="Remove ${o.name}"
                    @click=${n=>{n.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-section",{detail:i,bubbles:!0,composed:!0}))}}
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
              ${this.sections.map((o,i)=>{const s=this.playing&&this.activePlayingSectionIdx===i;return g`
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
            ${(this.progression?.chords||[]).map((e,o)=>{const i=this.fScopeBar===o,s=!!this.barFeel[o];return g`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${i?"var(--cv-ink, #2E271F)":"var(--cv-surface-2, #F1E4CC)"}; color: ${i?"var(--cv-cream, #FBF3E6)":"var(--cv-ink-muted, #6B5F50)"};"
                  @click=${()=>{this.feelScope=o}}
                >
                  ${e.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${i?"var(--cv-cream, #FBF3E6)":"#9E5D53"}; opacity: ${s?1:0};"></span>
                </button>
              `})}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${t}
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${li.map(e=>{const o=this.fget(e.k);let i=e.steps[0];return typeof o!="number"?i=e.steps.find(s=>s.v===o)||e.steps[0]:e.steps.forEach(s=>{Math.abs(Number(s.v)-Number(o))<Math.abs(Number(i.v)-Number(o))&&(i=s)}),g`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${e.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${e.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${e.steps.map(s=>{const n=s.v===i.v;return g`
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
    `}renderTheoryStrip(t){const{keyModeLine:e,romanFormula:o,cadences:i,voiceLinks:s,setNote:n}=t;return g`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${e}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${o}</div>
        </div>

        ${i.length?g`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${i.map(r=>g`
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
    `}renderChordDetailContent(t){const e=t[this.detailIndex],o=this.getChordQualityLabel(e?.name),i=this.getChordExtensionLabel(e?.name),s=j(this.progression?.key||"C",this.progression?.scaleType||"MAJOR"),n=e?Ds(e.name,s):[];return g`
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
        <div class="quality-label">${o}</div>
        <div class="quality-sub">${this.getChordQualitySub(e?.name)}</div>
      </div>
      <div class="quality-chips-grid">
        ${Ua.map(r=>{const a=r.label===o;return g`
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
        <div class="quality-label">${i}</div>
        <div class="quality-sub">${this.getChordExtensionSub(e?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${_a.map(r=>{const a=r.label===i;return g`
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
    `}renderPianoCard(t,e){const o=ce(t.name),i=rs[o.root]??0,s=ho[o.quality]||ho[ki[o.quality]||"maj"]||[0,4,7],n=22,r=86,a=52,l=[0,2,4,5,7,9,11],d=[],c=[],p=[];for(let m=0;m<2;m++)l.forEach((f,b)=>{d.push({x:(m*7+b)*n,w:n-1.5,h:r})});for(let m=0;m<2;m++)[0,1,3,4,5].forEach(f=>{const b=m*7+f;c.push({x:b*n+n*.64,w:n*.58,h:a})});s.forEach(m=>{const f=i+m,b=Math.floor(f/12),y=f%12,x=l.indexOf(y),C=m===0,I=x<0,S=C?"#F2735F":I?"#FBF3E6":"#2E271F",A=C?"#FBF3E6":I?"#2E271F":"#FBF3E6",F=this.showDegrees?po[m%12]:"";if(x>=0){const $=b*7+x;p.push({cx:$*n+(n-1.5)/2,cy:r-19,r:9,fill:S,isRoot:C,label:F,lc:A})}else{const T=(b*7+l.indexOf(y-1))*n+n*.64,P=n*.58;p.push({cx:T+P/2,cy:a-14,r:7.5,fill:S,isRoot:C,label:F,lc:A})}});const u=14*n,h=s.map(m=>{const f=ns[(i+m)%12];return this.showDegrees?`${f} (${po[m%12]})`:f}).join(" · ");return g`
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
          ${d.map(m=>Q`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${c.map(m=>Q`
            <rect x="${m.x}" y="0" width="${m.w}" height="${m.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${p.map(m=>Q`
            <g>
              <circle cx="${m.cx}" cy="${m.cy}" r="${m.r}" fill="${m.fill}" stroke="${m.isRoot?"#2E271F":"none"}" stroke-width="${m.isRoot?1.6:0}"></circle>
              ${m.label?Q`
                <text x="${m.cx}" y="${m.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${m.lc}" font-family="'Plus Jakarta Sans',sans-serif">${m.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${h}</div>
      </div>
    `}renderFretCard(t,e,o){const i=ce(t.name),s=rs[i.root]??0,n=ho[i.quality]||ho[ki[i.quality]||"maj"]||[0,4,7],r=[4,9,2,7,11,4],a=[7,0,4,9],l=o==="Ukulele",d=l?a:r,c=l?Ha({root:i.root,rootPc:s,q:i.quality,intervals:n})||[null,null,null,null]:qa({root:i.root,rootPc:s,q:i.quality})||[null,null,null,null,null,null],p=18,u=24,h=4,m=16,f=d.length,b=c.filter(O=>O!==null&&O>0),y=b.length&&Math.max(...b)>4?Math.min(...b)-1:0,x=[],C=[],I=[],S=[],A=[];for(let O=0;O<f;O++)x.push({x:O*p});for(let O=0;O<=h;O++)C.push({y:m+O*u,sw:O===0&&y===0?3:1.2});c.forEach((O,E)=>{const G=E*p;if(O===null){A.push({x:G});return}if(O===0){S.push({x:G});return}const oe=((d[E]+O-s)%12+12)%12;I.push({cx:G,cy:m+(O-y-.5)*u,fill:oe===0?"#F2735F":"#2E271F",label:this.showDegrees?po[((d[E]+O-s)%12+12)%12]:""})});const F=(f-1)*p,$=(f-1)*p+26,T=m+h*u+12,P=y>0?`${y+1}fr`:"",_=y>0,R=n.map(O=>{const E=ns[(s+O)%12];return this.showDegrees?`${E} (${po[O%12]})`:E}).join(" · ");return g`
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
          ${_?g`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${P}</div>
          `:""}
        </div>
        <svg width="${$}" height="${T}" viewBox="-13 -2 ${$} ${T}" style="display: block; width: 100%; max-width: ${$*1.5}px; height: auto;">
          ${C.map(O=>Q`
            <rect x="0" y="${O.y}" width="${F}" height="${O.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${x.map(O=>Q`
            <rect x="${O.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${S.map(O=>Q`
            <circle cx="${O.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${A.map(O=>Q`
            <text x="${O.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${I.map(O=>Q`
            <g>
              <circle cx="${O.cx}" cy="${O.cy}" r="${O.fill==="#F2735F"?7.5:7}" fill="${O.fill}"></circle>
              ${O.label?Q`
                <text x="${O.cx}" y="${O.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${O.label}</text>
              `:""}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${R}</div>
      </div>
    `}renderChordPad(t,e,o,i){const s=ne(t.tension||.1),n=this.activeIndex===e&&this.playing,r=this.padFlash===e||this.padHeld===e,a=this.swapIndex===e,l=this.selectedBand?Ae(this.selectedBand):null,d=this.progression?.key||"C",c=this.progression?.scaleType||"MAJOR",p=l?Ys(t,l.name,d,c):null,u=!!this.bandSwaps[e],h=this.getChordLadder(t),m=this.getLadderHome(t),f=this.lastPad?.idx===e,b=f&&typeof this.lastPad?.reach=="number"?this.lastPad.reach:m,y=f&&b>=0&&b!==m&&h[b],x=y?b:m,C=f?y?"→ "+h[b]:ja[this.lastPad?.zone??1]||this.lastPad?.voicing||"":t.voicing&&t.voicing!=="1st inversion"?t.voicing.toUpperCase():"",I=h.map($=>String($).replace(/^[A-G][#b]?/,"")),S=I[0];let A=I.slice();S&&I.every(($,T)=>T===0||$.indexOf(S)===0)?A=I.map(($,T)=>T?$.slice(S.length):$):S&&I.every(($,T)=>T===0||$.slice(-S.length)===S)&&(A=I.map(($,T)=>T?$.slice(0,$.length-S.length):$)),A=A.map($=>($===""?"maj":$).replace(/maj/gi,"△"));const F=h.map(($,T)=>({label:A[T],wrapStyle:"flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;",labelStyle:`font-size: 8.5px; font-weight: 800; letter-spacing: 0.2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: clip; color: ${T===x?y?o:"rgba(46,39,31,0.78)":"rgba(46,39,31,0.3)"}; transition: color 180ms cubic-bezier(0.23,1,0.32,1);`,barStyle:`width: 100%; height: 4px; border-radius: 3px; background: ${T===x?y?o:"rgba(46,39,31,0.5)":"rgba(46,39,31,0.16)"}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;`}));return g`
      <div
        class="pad-cell ${i?"chord-item-wrap":""} ${r?"pad-held":""} ${a?"selected":""} ${n?"pad-lit":""}"
        style="
          background: ${s.color};
          border-radius: ${a&&i?"20px 20px 5px 5px":"20px"};
          ${a?`box-shadow: inset 0 0 0 2.5px ${o}, 0 14px 26px -18px rgba(46,39,31,0.45);`:""}
        "
        tabindex="0"
        role="button"
        aria-label="${t.name}, ${it[t.functionLabel]||t.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${$=>this.handlePadPointerDown($,e)}
        @pointermove=${$=>this.handlePadPointerMove($,e)}
        @pointerup=${$=>this.handlePadPointerUp($)}
        @pointercancel=${$=>this.handlePadPointerUp($)}
        @pointerleave=${$=>this.handlePadPointerUp($)}
      >
        <div class="pad-voicing-grid ${this.gridFor===e?"active":""}">
          ${h.slice(1).map(($,T)=>g`
            <div style="position: absolute; top: 0; bottom: 0; left: ${(T+1)/h.length*100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
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
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(ai[e]||"").toUpperCase()}</span>
          </div>
          ${this.showTheory&&t.roman?g`<span class="pad-roman-badge">${t.roman}</span>`:""}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${za[t.functionLabel]||t.functionLabel}</div>
          <div class="pad-chord-name">${f&&y&&h[b]?h[b]:t.name}</div>
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
    `}renderLibraryPopoverContent(t){const e=this.librarySearch.trim().toLowerCase(),o=this.savedSets.filter(r=>!e||(r.name+" "+r.genre+" "+r.mood).toLowerCase().includes(e)),i=o.map(r=>r.id),s=i.length>0&&i.every(r=>this.librarySelected.includes(r)),n=i.some(r=>this.librarySelected.includes(r));return g`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          ${this.librarySelectMode&&this.librarySelected.length>0?`${this.librarySelected.length} of ${this.savedSets.length} selected`:`Your loops (${this.savedSets.length})`}
        </div>
        <div class="library-select-toolbar" style="display: flex; align-items: center; gap: 8px;">
          ${this.librarySelectMode&&o.length>0?g`
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
        ${o.map(r=>{const a=this.librarySelected.includes(r.id),l=this.renamingId===r.id,d=this.confirmDeleteId===r.id;return g`
            <div
              class="library-loop-item ${this.librarySelectMode?"select-mode":""} ${a?"selected":""}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${a?"var(--cv-surface-2, #F1E4CC)":"var(--cv-surface)"}; transition: background 120ms ease;"
              @click=${()=>{this.librarySelectMode?this.toggleSelectLoop(r.id):!l&&!d&&(this.dispatchEvent(new CustomEvent("load-project",{detail:r,bubbles:!0,composed:!0})),this.setLibraryOpen(!1))}}
            >
              ${this.librarySelectMode?g`
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
                ${(r.chords||[]).map(c=>{const p=typeof c=="object"&&c!==null?c.tension??0:.2,u=ne(p);return g`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(u.radius*.25)}px;background:${u.color};flex-shrink:0;"></span>`})}
              </div>
              <div style="flex: 1; min-width: 0;">
                ${l?g`
                  <input
                    type="text"
                    class="cv-vibe-input library-rename-input"
                    .value=${this.draftName}
                    @input=${c=>{this.draftName=c.target.value}}
                    @keydown=${c=>{c.key==="Enter"&&this.commitRename(r),c.key==="Escape"&&this.cancelRename()}}
                    @blur=${()=>this.commitRename(r)}
                    @click=${c=>c.stopPropagation()}
                    style="width: 100%; box-sizing: border-box; border: none; background: var(--cv-cream, #FBF3E6); box-shadow: inset 0 0 0 1.5px rgba(46,39,31,0.16); border-radius: 9px; outline: none; font-family: inherit; font-size: 13px; font-weight: 800; color: var(--cv-ink); padding: 5px 8px;"
                  />
                `:g`
                  <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.name}</div>
                  <div style="font-size: 11px; color: var(--cv-ink-muted);">${r.genre} · ${r.mood}</div>
                `}
              </div>

              ${this.librarySelectMode?"":g`
                ${d?g`
                  <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;" @click=${c=>c.stopPropagation()}>
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
                  <div class="library-item-actions" style="display: flex; gap: 2px; flex-shrink: 0;" @click=${c=>c.stopPropagation()}>
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
        ${o.length?"":g`
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
    `:""}render(){const t=this.progression?.chords||[],e=jt(this.progression?.mood||"Warm"),o=ri.find(h=>h.name===this.selectedBand),i=this.getTheoryData(t),s=t.map(h=>h.tension||.1),n=Math.max(...s,.1),r=Math.min(...s,0),a=s.indexOf(n),l=s.every((h,m)=>m===0||h>=s[m-1]),d=n-r<.28?"Stays close to home":l?"A steady climb":s[s.length-1]<.25&&a<s.length-1?"Away, then home":"Drifts, then settles",c=`Opens ${it[t[0]?.functionLabel]||"home"} and ${n-r<.28?"never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.":l?`tightens chord by chord, peaking on ${t[a]?.name||"the peak"}. Looping back does the resolving.`:`explores tension up to ${t[a]?.name||"the middle"} before easing back down home.`}`;let p=[];if(this.progression?.scaleType?.includes("MINOR"),this.swapIndex!==null&&this.progression){if(this.activeSwapFamily==="Borrowed"&&this.chordData?.scales)p=Co(this.chordData,this.progression,this.swapIndex);else if(this.chordData?.scales){const h=vi(this.chordData,this.progression,this.swapIndex);p=(h.find(f=>f.name===this.activeSwapFamily)||h[0])?.rows||[],co[this.activeSwapFamily]&&co[this.activeSwapFamily][this.showTheory?1:0]}if(o){const h=xi(this.progression.key||"C",this.progression.scaleType||"MAJOR",o.name),m=new Map(h.map(y=>[y.chordName,y]));p=p.map(y=>{const x=m.get(y.name);return x?{...y,sub:this.showTheory?x.theory:x.plain,bandTag:`${o.name} move`,bandColor:o.color}:y});const f=p.filter(y=>y.bandTag),b=p.filter(y=>!y.bandTag);p=[...f,...b]}}const u=this.swapIndex!==null?t[this.swapIndex]:null;return this.isMobile?g`
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
                  ${os.map(h=>g`
                    <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${Ze.map(h=>{const m=h.name,f=h.dot,b=this.progression?.mood===m;return g`
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
                  ${ri.map(h=>{const m=io[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return g`
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
                  ${t.map((h,m)=>{if(this.swapIndex===m){const f=ne(h.tension||.1),b=this.activeIndex===m&&this.playing;return g`
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
                            @cycler-audition=${y=>this.handleSwapAudition(y.detail)}
                            @cycler-keep=${y=>this.handleCyclerKeep(y.detail)}
                            @cycler-revert=${()=>this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `}return this.renderChordPad(h,m,e,!1)})}
                </div>

                ${this.showTheory?this.renderScaleChords(i.scaleName,i.scaleHint,i.scaleDegrees,!0):""}
              </div>

              <!-- Unified Mobile Quick Chips Row -->
              <div class="mobile-chips-row">
                <button
                  class="mobile-chip instrument-chip ${this.expandedInstrument?"open":""}"
                  @click=${this.toggleInstrumentExpand}
                  aria-label="Change instrument"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  <span>${_e(this.instrument)}</span>
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
                    ${Oe.map(h=>g`
                      <button
                        class="pill ${_e(this.instrument)===h.name?"active":""}"
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

              ${this.showTheory?g`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${d}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${t.map(h=>{const m=Math.round(28+(h.tension||.1)*85),f=ne(h.tension||.1);return g`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; max-width: 34px; height: ${m}px; border-radius: 100px; background: ${f.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${h.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${it[h.functionLabel]||""}</div>
                        </div>
                      `})}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${c}</div>
                  ${this.renderTheoryStrip(i)}
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
              ${os.map(h=>g`
                <button class="pill ${this.progression?.genre===h?"active":""}" @click=${()=>this.onGenreClick(h)}>${h}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${Ze.map(h=>{const m=h.name,f=h.dot,b=this.progression?.mood===m;return g`
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
              ${ri.map(h=>{const m=io[h.name]||{font:h.font,pillFs:12.5,pillTrack:"0"},f=this.selectedBand===h.name;return g`
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
                          .band=${o?{name:o.name,color:o.color,plain:this.showTheory?o.theory:o.plain}:null}
                          @swap-feel-change=${y=>{this.activeSwapFamily=y.detail.feel,this.requestUpdate()}}
                          @swap-audition=${y=>this.handleSwapAudition(y.detail)}
                          @swap-confirm=${this.confirmSwap}
                          @swap-close=${this.clearSelection}
                        ></chord-swap-lane>
                      `:""}
                    `})}
                </div>

                ${this.showTheory?this.renderScaleChords(i.scaleName,i.scaleHint,i.scaleDegrees,!1):""}

                <!-- Quick Controls Below Pad Cards -->
                <div class="stage-quick-controls" style="display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px; row-gap: 10px; margin-top: 16px;">
                  <button
                    class="instrument-chip ${this.expandedInstrument?"open":""}"
                    @click=${this.toggleInstrumentExpand}
                    aria-label="Change instrument"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.expandedInstrument?"var(--cv-surface)":"var(--cv-surface-2)"}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.expandedInstrument?"inset 0 0 0 1.5px rgba(46,39,31,0.16)":"none"};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                    ${_e(this.instrument)}
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
                      ${Oe.map(h=>g`
                        <button
                          class="pill ${_e(this.instrument)===h.name?"active":""}"
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
                <div class="chord-shape-badge" style="background: ${ne(t[this.detailIndex]?.tension||.1).color};"></div>
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
                    <span class="swap-role">${it[u?.functionLabel||""]||""}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${o?this.renderBandInspectorCard(o):""}

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

              ${this.showTheory?this.renderTheoryStrip(i):""}
            </div>
          `:g`
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
              ${o?this.renderBandInspectorCard(o):""}
              <div class="arc-bars-row">
                ${t.map((h,m)=>{const f=ne(h.tension||.1),b=Math.round(18+(h.tension||.1)*62);return g`
                    <button class="arc-bar-col" @click=${()=>this.openSwap(m)} aria-label="${h.name}, ${it[h.functionLabel]||""}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${b}px; background: ${f.color};"></div>
                      </div>
                      <div class="arc-bar-name">${h.name}</div>
                      <div class="arc-bar-feel">${it[h.functionLabel]||""}</div>
                    </button>
                  `})}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${c}</div>
              ${this.showTheory&&i.setNote?g`
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(46,39,31,0.08); text-wrap: pretty;">
                  ${i.setNote}
                </div>
              `:""}

              <div class="inspector-tip-box" style="margin-top: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${e}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
              </div>
              ${this.showTheory?this.renderTheoryStrip(i):""}
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
    `}};M.styles=ge`
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
  `;N([w({type:Object})],M.prototype,"chordData",2);N([w({type:Object})],M.prototype,"progression",2);N([w({type:Number})],M.prototype,"activeIndex",2);N([w({type:Number})],M.prototype,"progressStep",2);N([w({type:Array})],M.prototype,"order",2);N([w({type:Boolean})],M.prototype,"playing",2);N([w({type:Boolean})],M.prototype,"showTheory",2);N([w({type:String})],M.prototype,"instrument",2);N([w({type:String})],M.prototype,"playStyle",2);N([w({type:Boolean})],M.prototype,"isAuthenticated",2);N([w({type:String})],M.prototype,"userEmail",2);N([w({type:Array})],M.prototype,"sections",2);N([w({type:Number})],M.prototype,"activeSectionIdx",2);N([w({type:Number})],M.prototype,"activePlayingSectionIdx",2);N([w({type:Number})],M.prototype,"totalSongSteps",2);N([w({type:Boolean})],M.prototype,"isGenerating",2);N([w({type:Boolean})],M.prototype,"libraryOpen",2);N([w({type:Boolean})],M.prototype,"isSaved",2);N([w({type:String})],M.prototype,"currentProjectId",2);N([k()],M.prototype,"isMobile",2);N([k()],M.prototype,"activeView",2);N([k()],M.prototype,"vibeOpen",2);N([k()],M.prototype,"showSaveModal",2);N([k()],M.prototype,"pendingSaveName",2);N([w({type:String})],M.prototype,"selectedBand",2);N([k()],M.prototype,"bandSwaps",2);N([k()],M.prototype,"freeText",2);N([k()],M.prototype,"vibePlaceholderIdx",2);N([k()],M.prototype,"expandedGenre",2);N([k()],M.prototype,"expandedMood",2);N([k()],M.prototype,"activeSwapFamily",2);N([k()],M.prototype,"swapIndex",2);N([k()],M.prototype,"isInspectorOpen",2);N([k()],M.prototype,"detailOpen",2);N([k()],M.prototype,"detailIndex",2);N([k()],M.prototype,"abPick",2);N([k()],M.prototype,"abSide",2);N([k()],M.prototype,"abPlaying",2);N([k()],M.prototype,"mobileFeelIndex",2);N([k()],M.prototype,"mobileChordIndex",2);N([k()],M.prototype,"savedSets",2);N([k()],M.prototype,"renamingId",2);N([k()],M.prototype,"draftName",2);N([k()],M.prototype,"confirmDeleteId",2);N([k()],M.prototype,"librarySearch",2);N([k()],M.prototype,"librarySelectMode",2);N([k()],M.prototype,"librarySelected",2);N([k()],M.prototype,"playInstrument",2);N([k()],M.prototype,"showDegrees",2);N([k()],M.prototype,"mobileSheetOpen",2);N([k()],M.prototype,"mobileDetailSheetOpen",2);N([k()],M.prototype,"padFlash",2);N([k()],M.prototype,"padHeld",2);N([k()],M.prototype,"gridFor",2);N([k()],M.prototype,"lastPad",2);N([k()],M.prototype,"tempoOpen",2);N([k()],M.prototype,"feelOpen",2);N([k()],M.prototype,"shareOpen",2);N([k()],M.prototype,"expandedInstrument",2);N([k()],M.prototype,"barsPerChord",2);N([k()],M.prototype,"swing",2);N([k()],M.prototype,"spread",2);N([k()],M.prototype,"density",2);N([k()],M.prototype,"humanise",2);N([k()],M.prototype,"tone",2);N([k()],M.prototype,"feelScope",2);N([k()],M.prototype,"barFeel",2);N([k()],M.prototype,"advOverride",2);N([k()],M.prototype,"advOpen",2);N([k()],M.prototype,"showAdvancedFeel",2);N([k()],M.prototype,"humanEngineState",2);N([k()],M.prototype,"auditionDeg",2);N([k()],M.prototype,"auditionName",2);N([k()],M.prototype,"auditionBar",2);M=N([be("loop-screen")],M);var Ja=Object.defineProperty,Ya=Object.getOwnPropertyDescriptor,D=(t,e,o,i)=>{for(var s=i>1?void 0:i?Ya(e,o):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(i?r(e,o,s):r(s))||s);return i&&s&&Ja(e,o,s),s};function Wa(t){const e=t.replace("#",""),o=parseInt(e.substring(0,2),16)||201,i=parseInt(e.substring(2,4),16)||169,s=parseInt(e.substring(4,6),16)||224;return`rgba(${o}, ${i}, ${s}, 0.18)`}let B=class extends fe{constructor(){super(...arguments),this.activeTab="loop",this.chordData={chords:{},scales:{}},this.libraryOpen=!1,this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!1,this.chordPlaying=!1,this.melodyPlaying=!1,this.songPlaying=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.melodySound="Stage Rhodes",this.melodyFeel="Smooth",this.melodyFeelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.chordFeelSettings={swing:0,spread:50,density:50,tone:"Warm"},this.melodyBackingEnabled=!0,this.length=4,this.sections=[],this.songTimeline=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.userEmail=null,this.isAuthenticated=!1,this.syncStatus="sign-in",this.syncError=null,this.authModalOpen=!1,this.midiModalOpen=!1,this.shareModalOpen=!1,this.selectedChordIndex=null,this.selectedBand=null,this.melodyTrack=null,this.melodyLoop="Section",this.melodySpan=[0,16],this.playInstrument="Piano",this.showDegrees=!1,this.toastMessage=null,this.toastUndoId=null,this.isGenerating=!1,this.chordLengthCache=[],this.vibeOpen=!1,this.vibeSearchText="",this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeSyncStatus=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.libraryOpen&&(this.libraryOpen=!1,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await kt.signOut(),L.logout()},this.toastUndoAction="delete",this.toastUndoProject=null}connectedCallback(){super.connectedCallback();const t=n=>{try{return typeof localStorage<"u"&&typeof localStorage.getItem=="function"?localStorage.getItem(n):null}catch{return null}};this.showTheory=(t("chroma-chords-show-theory")||t("chord-voyager-show-theory"))==="true";const e=t("chroma-chords-instrument");e&&Oe.some(n=>n.name===e)&&(this.instrument=e);const o=t("chroma-chords-play-style");o&&Ut.some(n=>n.name===o)&&(this.playStyle=o);const i=t("chroma-melody-sound");i&&Oe.some(n=>n.name.toLowerCase()===i.toLowerCase())?this.melodySound=i:this.melodySound="Stage Rhodes";const s=t("chroma-melody-feel");s&&(this.melodyFeel=s),v.setInstrument(this.instrument),v.setPlayStyle(this.playStyle),v.setMelodySound(this.melodySound),v.setMelodyFeel(this.melodyFeel),v.setMelodyFeelSettings(this.melodyFeelSettings),v.setMelodyBackingEnabled(this.melodyBackingEnabled),this.unsubscribeAuth=kt.subscribe(n=>{this.userEmail=n.user?.email||null,this.isAuthenticated=n.isAuthenticated}),this.unsubscribeProjects=L.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeSyncStatus=L.subscribeSyncStatus(n=>{const r=this.syncStatus;if(this.syncStatus=n,this.syncError=L.getLastSyncError(),n==="offline"&&r!=="offline"){const a=this.syncError||"Cloud sync failed";this.showToast(`Sync failed: ${a}`)}this.requestUpdate()}),this.unsubscribeTick=v.subscribeTick((n,r,a,l,d,c)=>{this.activeIndex=n,this.progressStep=typeof c=="number"&&c>=0?c:r,typeof a=="number"&&(this.activePlayingSectionIdx=a),typeof l=="number"&&(this.totalSongSteps=l),this.playing=v.isPlaying(),this.chordPlaying=v.isChordPlaying(),this.melodyPlaying=v.isMelodyPlaying(),this.songPlaying=v.isSongPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),Hn().then(n=>{this.chordData=n,this.progression||(this.progression=ko(this.chordData,this.genre,this.mood,{length:this.length}),this.order=Array.from({length:this.length},(r,a)=>a),v.setProgression(this.progression,this.order),this.sections=se.createInitialSong(this.progression,this.order),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack=ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack))}).catch(n=>{console.error("Failed to load chord data:",n)})}disconnectedCallback(){super.disconnectedCallback(),v.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeSyncStatus&&this.unsubscribeSyncStatus(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return L.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?this.libraryOpen=!0:t==="melody"?this.activeTab="melody":t==="song"?this.activeTab="song":t==="play"?this.activeTab="play":(t==="chords"||t==="loop")&&(this.activeTab="loop")}onGenreChange(t){this.genre=t.detail,this.regenerate()}onMoodChange(t){this.mood=t.detail,this.regenerate()}async onGenerate(t){if(!this.isGenerating){this.isGenerating=!0;try{const o=(typeof t?.detail=="string"?t.detail:t?.detail?.promptText)||this.activeSearchPrompt||void 0;o&&this.showToast("Composing chords with AI...");const i=await Pr.resolvePrompt(this.chordData,this.genre,this.mood,this.length,o);i.instrument&&(this.instrument=i.instrument,localStorage.setItem("chroma-chords-instrument",i.instrument),v.setInstrument(i.instrument)),i.playStyle&&(this.playStyle=i.playStyle,localStorage.setItem("chroma-chords-play-style",i.playStyle),v.setPlayStyle(i.playStyle));const s=i.progression;this.progression=s,s.genre&&(this.genre=s.genre),s.mood&&(this.mood=s.mood),this.order=Array.from({length:s.chords.length},(n,r)=>r),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.chordLengthCache=[],v.setProgression(s,this.order),v.reset(),this.sections=se.createInitialSong(s,this.order),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack&&this.melodyTrack.notes.length>0?this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,s):this.melodyTrack=ve.createEmptyTrack(s),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.activeSearchPrompt=null,o&&this.showToast(`Composed from "${o}"`)}catch(e){console.error("Failed to generate progression:",e),this.showToast("Failed to generate progression. Please try again.")}finally{this.isGenerating=!1}}}onLengthChange(t){const e=t.detail;if(!this.progression||e===this.length)return;const o=or(this.progression,e,this.chordData,this.chordLengthCache);this.progression=o.progression,this.chordLengthCache=o.cachedTailChords,this.length=this.progression.chords.length,this.order=Array.from({length:this.length},(i,s)=>s),v.setProgression(this.progression,this.order),this.sections.length>0?this.sections=se.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order):this.sections=se.createInitialSong(this.progression,this.order),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression),v.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}regenerate(){if(!this.chordData.scales||Object.keys(this.chordData.scales).length===0)return;this.chordLengthCache=[];const t=ko(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,o)=>o),this.activeIndex=0,this.progressStep=0,v.setProgression(t,this.order),this.sections=se.createInitialSong(this.progression,this.order),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack&&this.melodyTrack.notes.length>0?this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression):this.melodyTrack=ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.playing&&(v.startAutoplay(),v.playActiveChord()),this.requestUpdate()}onReroll(){this.regenerate()}toggleTheory(){this.showTheory=!this.showTheory;try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}catch{}}toggleVibe(){this.vibeOpen=!this.vibeOpen}applyPromptSearch(){this.vibeSearchText.trim()&&(this.onGenerate(new CustomEvent("generate",{detail:this.vibeSearchText.trim()})),this.vibeOpen=!1,this.vibeSearchText="")}onLoadProject(t){const e=t.detail,o=[];for(const i of e.chords){let s=i.notes;(!s||s.length===0)&&(s=V(i.name,j(e.key||"C",e.scaleType||"MAJOR"))),o.push({name:i.name,tag:i.tag||"diatonic",roman:i.roman||"",color:i.color||"#9CC0EC",functionLabel:i.functionLabel||"",notes:s,scaleLabel:i.scaleLabel||"",desc:i.desc||"",degree:i.degree||"",scaleKey:i.scaleKey||"",tension:i.tension||.1})}this.currentProjectId=e.id,this.genre=e.genre||"Pop",this.mood=e.mood||"Dreamy",this.progression={genre:e.genre||"Unknown",mood:e.mood||"Neutral",key:e.key||"C",scaleType:e.scaleType||"MAJOR",bpm:e.bpm||120,chords:o},this.order=Array.from({length:this.progression.chords.length},(i,s)=>s),this.length=this.progression.chords.length,this.chordLengthCache=[],this.showTheory=e.showTheory??this.showTheory,e.barsPerChord&&v.setBarsPerChord(e.barsPerChord),e.feel&&v.setFeelSettings(e.feel),v.setProgression(this.progression,this.order),this.sections=se.createInitialSong(this.progression,this.order),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack=e.melodyTrack||ve.createEmptyTrack(this.progression),v.setMelodyTrack(this.melodyTrack),this.activeSectionIdx=0,this.showToast(`Loaded "${e.name}"`)}onDeleteProject(t){L.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=L.getProjects().find(o=>o.id===t.detail.id);e&&(e.name=t.detail.name,L.saveProject(e),this.requestUpdate())}async onSyncProjects(){await L.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onUnsaveSet(t){const e=t.detail||this.currentProjectId;if(e){const o=L.getProjects().find(s=>s.id===e),i=o?.name||"Loop";o&&(this.toastUndoProject={...o}),L.deleteProject(e),this.currentProjectId===e&&(this.currentProjectId=null),this.showToast(`Removed "${i}"`,e,"restore"),this.requestUpdate()}}safeSet(t,e){try{typeof localStorage<"u"&&typeof localStorage.setItem=="function"&&localStorage.setItem(t,e)}catch{}}onTheoryToggle(){this.showTheory=!this.showTheory,this.safeSet("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,this.safeSet("chroma-chords-instrument",t.detail),v.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,this.safeSet("chroma-chords-play-style",t.detail),v.setPlayStyle(t.detail)}onTogglePlay(t){const e=t||(this.activeTab==="melody"?"melody":this.activeTab==="song"?"song":"chords");e==="melody"?(this.updateEngineLoop(),this.playing=v.togglePlay("melody"),this.melodyPlaying=v.isMelodyPlaying(),this.chordPlaying=!1,this.songPlaying=!1):e==="song"?(v.setStepLoop(null),v.setSong(this.sections),this.playing=v.togglePlay("song"),this.songPlaying=v.isSongPlaying(),this.chordPlaying=!1,this.melodyPlaying=!1):(v.setStepLoop(null),v.setProgression(this.progression,this.order),this.playing=v.togglePlay("chords"),this.chordPlaying=v.isChordPlaying(),this.melodyPlaying=!1,this.songPlaying=!1)}onTogglePlaySong(){this.onTogglePlay("song")}onSetMelodySound(t){const e=typeof t.detail=="object"&&t.detail!==null?t.detail.sound:t.detail;e&&(this.melodySound=e,this.safeSet("chroma-melody-sound",e),v.setMelodySound(e),this.requestUpdate())}onSetMelodyFeel(t){const e=typeof t.detail=="object"&&t.detail!==null?t.detail.feel||t.detail.playStyle:t.detail;e&&(this.melodyFeel=e,this.safeSet("chroma-melody-feel",e),v.setMelodyFeel(e),this.requestUpdate())}onMelodyFeelSettingsChange(t){const e=t.detail?.feelSettings;e&&(this.melodyFeelSettings={...e},v.setMelodyFeelSettings(e),this.requestUpdate())}onToggleMelodyBacking(t){t&&typeof t.detail?.backingEnabled=="boolean"?this.melodyBackingEnabled=t.detail.backingEnabled:this.melodyBackingEnabled=!this.melodyBackingEnabled,v.setMelodyBackingEnabled(this.melodyBackingEnabled),this.requestUpdate()}onMelodyLoopCycle(t){const e=["Section","Chord","Span"],o=t||e[(e.indexOf(this.melodyLoop)+1)%3];this.melodyLoop=o,this.updateEngineLoop(),this.requestUpdate()}updateEngineLoop(){if(this.activeTab!=="melody"){v.setStepLoop(null);return}const t=this.progression?.chords.length||4;if(this.melodyLoop==="Section")v.setStepLoop([0,t*16]);else if(this.melodyLoop==="Chord"){const e=this.activeIndex%t;v.setStepLoop([e*16,(e+1)*16])}else this.melodyLoop==="Span"&&v.setStepLoop(this.melodySpan&&this.melodySpan[1]>this.melodySpan[0]?this.melodySpan:[0,16])}onSwitchTab(t){this.activeTab=t,this.updateEngineLoop()}onProgressionChange(t){this.progression=t.detail,this.progression&&(this.length=this.progression.chords.length,(this.order.length!==this.length||this.order.some(e=>e>=this.length))&&(this.order=Array.from({length:this.length},(e,o)=>o))),v.setProgression(this.progression,this.order),this.sections.length>0&&(this.sections=se.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order)),this.songTimeline=se.createDefaultTimeline(this.sections),this.melodyTrack&&this.progression&&(this.melodyTrack=ve.alignMelodyToChords(this.melodyTrack,this.progression),v.setMelodyTrack(this.melodyTrack)),this.requestUpdate()}onAddSection(){if(!this.progression)return;const t=se.addSection(this.sections,this.progression,this.chordData);this.sections=t.sections,this.songTimeline=se.createDefaultTimeline(this.sections),this.activeSectionIdx=t.activeIndex;const e=this.sections[this.activeSectionIdx];e&&(this.progression=e.progression,this.order=e.order.slice(),v.setProgression(this.progression,this.order)),v.setSong(this.sections),this.requestUpdate()}onRemoveSection(t){const e=t.detail,o=se.removeSection(this.sections,e);this.sections=o.sections,this.songTimeline=se.createDefaultTimeline(this.sections),this.activeSectionIdx=o.activeIndex;const i=this.sections[this.activeSectionIdx];i&&(this.progression=i.progression,this.order=i.order.slice(),v.setProgression(this.progression,this.order)),v.setSong(this.sections),this.requestUpdate()}onSelectSection(t){const e=typeof t.detail=="object"&&t.detail!==null&&"sectionIndex"in t.detail?t.detail.sectionIndex:t.detail;this.activeSectionIdx=e;const o=this.sections[e];o&&(this.progression=o.progression,this.order=o.order.slice(),v.setProgression(this.progression,this.order)),this.requestUpdate()}showToast(t,e,o="delete"){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastUndoAction=o,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null},3200)}onToastUndo(){this.toastUndoId&&(this.toastUndoAction==="restore"&&this.toastUndoProject?(L.saveProject(this.toastUndoProject),this.currentProjectId=this.toastUndoProject.id):this.toastUndoAction==="delete"&&(L.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null)),this.toastMessage=null,this.toastUndoId=null,this.toastUndoProject=null,this.requestUpdate())}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const o=L.getProjects().find(a=>a.id===e),i=t||o?.name||`Progression in ${this.progression.key} ${this.progression.scaleType}`,s=v.getFeelSettings(),n=v.getBarsPerChord(),r={id:e,name:i,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory,barsPerChord:n,feel:{swing:s.swing??0,spread:s.spread??50,density:s.density??50,tone:s.tone??"Warm",humanState:s.humanState}};L.saveProject(r),t&&L.scheduleCloudSync(),this.showToast(`Saved "${i}"`,e,"delete"),this.requestUpdate()}render(){const t=!!(this.currentProjectId&&L.isProjectSaved(this.currentProjectId)),e=jt(this.progression?.mood||this.mood),o=Wa(e),i=this.sections[this.activeSectionIdx],s=i?i.id||String.fromCharCode(65+this.activeSectionIdx):"A",n=this.sections.reduce((a,l)=>a+(l.order?.length||4)*(v.getBarsPerChord()||1),0),r=`${this.sections.length} sections · ${n} bars`;return g`
      <!-- Top Site Header -->
      <header class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .showNav=${!1}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${L.getProjects().length}
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
              style="--theory-mood-color: ${e};"
            >
              <span class="theory-nav-label">Theory</span>
              <span class="theory-nav-pip ${this.showTheory?"on":""}">
                <span class="theory-nav-knob"></span>
              </span>
            </button>
          </div>

          <!-- Scrollable Content View: ONE Main Tinted Panel -->
          <div class="scrollable-content" style="--panel-tint-bg: ${o};">
            ${this.progression?g`
              ${this.activeTab==="loop"?g`
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
                    @progression-change=${this.onProgressionChange}
                    @set-chord-count=${a=>{this.onLengthChange(new CustomEvent("set-length",{detail:a.detail.count}))}}
                    @reroll=${this.onReroll}
                    @clear-band=${()=>{this.selectedBand=null}}
                    @open-vibe-picker=${()=>{this.vibeOpen=!0}}
                  ></tab-chords>
                </div>
              `:this.activeTab==="melody"?g`
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
                    @toggle-play=${()=>{this.onTogglePlay("melody")}}
                    @toggle-backing=${a=>{this.onToggleMelodyBacking(a)}}
                    @melody-change=${a=>{this.melodyTrack=a.detail.track,v.setMelodyTrack(this.melodyTrack)}}
                    @span-change=${a=>{this.melodySpan=a.detail.span,this.updateEngineLoop()}}
                    @melody-loop-change=${a=>{this.onMelodyLoopCycle(a.detail.loop||a.detail.melodyLoop)}}
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
                  @select-section=${a=>this.onSelectSection(a)}
                  @section-select=${a=>this.onSelectSection(a)}
                  @reorder-timeline=${a=>{this.songTimeline=a.detail.timeline}}
                  @timeline-change=${a=>{this.songTimeline=a.detail.timeline}}
                  @new-section-from-loop=${()=>this.onAddSection()}
                  @add-section=${()=>this.onAddSection()}
                  @remove-section=${a=>this.onRemoveSection(a)}
                  @edit-chords=${a=>{this.activeSectionIdx=a.detail.sectionIndex,this.activeTab="loop"}}
                  @edit-melody=${a=>{this.activeSectionIdx=a.detail.sectionIndex,this.activeTab="melody"}}
                  @toggle-play-song=${()=>this.onTogglePlaySong()}
                ></tab-song>
              `:g`
                <div class="main-tinted-panel">
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
                    @play-chord=${a=>{a.detail.chord?.notes&&v.playChordNotes(a.detail.chord.notes,.85)}}
                  ></tab-play>
                </div>
              `}
            `:g`
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
                Loading studio workspace...
              </div>
            `}
          </div>

          <!-- Bottom Docked Transport Bar: Bounded within Center Column on Desktop -->
          <div class="transport-dock-wrapper desktop-only">
            ${this.activeTab==="melody"?g`
              <!-- Separate independent instance of controls for Melody -->
              <transport-bar
                id="melody-transport-bar"
                .activeTab=${"melody"}
                .isPlaying=${this.melodyPlaying}
                .playLabel=${"Play melody"}
                .moodColor=${e}
                .sections=${this.sections}
                .activeSectionId=${s}
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
                .songTotal=${r}
                @loop-cycle=${a=>{this.onMelodyLoopCycle(a.detail?.melodyLoop)}}
                @toggle-play=${a=>{this.onTogglePlay(a.detail?.target||"melody")}}
                @toggle-melody-backing=${a=>{this.onToggleMelodyBacking(a)}}
                @set-melody-sound=${a=>{this.onSetMelodySound(a)}}
                @set-melody-feel=${a=>{this.onSetMelodyFeel(a)}}
                @melody-feel-settings-change=${a=>{this.onMelodyFeelSettingsChange(a)}}
                @share-click=${()=>{this.shareModalOpen=!0}}
                @open-share=${()=>{this.shareModalOpen=!0}}
                @bpm-change=${a=>{this.progression&&(this.progression={...this.progression,bpm:a.detail.bpm},v.setBpm(a.detail.bpm),this.requestUpdate())}}
                @key-change=${a=>{this.progression&&(this.progression={...this.progression,key:a.detail.root},v.setProgression(this.progression,this.order),this.requestUpdate())}}
                @scale-change=${a=>{if(this.progression){const l=a.detail.mode.toUpperCase();this.progression={...this.progression,scaleType:l},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
              ></transport-bar>
            `:g`
              <!-- Dedicated instance of controls for Chords / Song / Play -->
              <transport-bar
                id="chord-transport-bar"
                .activeTab=${this.activeTab}
                .isPlaying=${this.activeTab==="song"?this.songPlaying:this.chordPlaying}
                .playLabel=${this.activeTab==="song"?"Play song":"Play chords"}
                .moodColor=${e}
                .sections=${this.sections}
                .activeSectionId=${s}
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
                .songTotal=${r}
                @loop-cycle=${a=>{this.onMelodyLoopCycle(a.detail?.melodyLoop)}}
                @toggle-play=${a=>{this.activeTab==="song"?this.onTogglePlaySong():this.onTogglePlay(a.detail?.target||"chords")}}
                @share-click=${()=>{this.shareModalOpen=!0}}
                @open-share=${()=>{this.shareModalOpen=!0}}
                @bpm-change=${a=>{this.progression&&(this.progression={...this.progression,bpm:a.detail.bpm},v.setBpm(a.detail.bpm),this.requestUpdate())}}
                @bars-change=${a=>{v.setBarsPerChord(a.detail.bars),this.requestUpdate()}}
                @key-change=${a=>{this.progression&&(this.progression={...this.progression,key:a.detail.root},v.setProgression(this.progression,this.order),this.requestUpdate())}}
                @scale-change=${a=>{if(this.progression){const l=a.detail.mode.toUpperCase();this.progression={...this.progression,scaleType:l},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
                @sound-change=${a=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:a.detail.sound}))}}
                @set-chord-sound=${a=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:a.detail.sound}))}}
                @feel-change=${a=>{const l=a.detail.feel||a.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:l}))}}
                @set-chord-feel=${a=>{const l=a.detail.feel||a.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:l}))}}
                @feel-settings-change=${a=>{const l=a.detail.feelSettings;l&&(this.chordFeelSettings={...l},v.setFeelSettings(l),l.playStyle&&l.playStyle!==this.playStyle&&(this.playStyle=l.playStyle,this.safeSet("chroma-chords-play-style",l.playStyle),v.setPlayStyle(l.playStyle)),l.tone&&ke(l.tone),this.requestUpdate())}}
                @set-feel-settings=${a=>{this.chordFeelSettings={...this.chordFeelSettings,...a.detail},v.setFeelSettings(this.chordFeelSettings),a.detail.tone&&ke(a.detail.tone),this.requestUpdate()}}
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
            .moodColor=${e}
            .isSaved=${t}
            .libraryOpen=${this.libraryOpen}
            .savedSets=${L.getProjects()}
            @close-detail=${()=>{this.selectedChordIndex=null}}
            @toggle-save=${()=>{this.currentProjectId&&L.isProjectSaved(this.currentProjectId)?this.onUnsaveSet(new CustomEvent("unsave-set",{detail:this.currentProjectId})):this.saveProject()}}
            @toggle-library=${()=>{this.libraryOpen=!this.libraryOpen}}
            @select-set=${a=>this.onLoadProject(a)}
            @delete-set=${a=>this.onUnsaveSet(a)}
            @change-voicing=${a=>{if(this.progression&&this.selectedChordIndex!==null){const l=[...this.progression.chords],d=l[this.selectedChordIndex];d&&(l[this.selectedChordIndex]=vo(d,a.detail.voicing||"Major","None"),this.onProgressionChange(new CustomEvent("progression-change",{detail:{...this.progression,chords:l}})))}}}
          ></chord-inspector>
        </aside>
      </div>

      <!-- Mobile Dock: Persistent at viewport bottom on mobile only -->
      <div class="dock-container mobile-only">
        <mobile-dock
          .activeTab=${this.activeTab}
          .isPlaying=${this.activeTab==="melody"?this.melodyPlaying:this.activeTab==="song"?this.songPlaying:this.chordPlaying}
          .playLabel=${this.activeTab==="melody"?"Play melody":this.activeTab==="song"?"Play song":"Play chords"}
          .moodColor=${e}
          .sections=${this.sections}
          .activeSectionId=${s}
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
          .isSaved=${t}
          @loop-cycle=${a=>{this.onMelodyLoopCycle(a.detail?.melodyLoop)}}
          @toggle-play=${a=>{this.activeTab==="song"?this.onTogglePlaySong():this.activeTab==="melody"?this.onTogglePlay("melody"):this.onTogglePlay(a.detail?.target||"chords")}}
          @toggle-melody-backing=${a=>{this.onToggleMelodyBacking(a)}}
          @set-melody-sound=${a=>{this.onSetMelodySound(a)}}
          @set-melody-feel=${a=>{this.onSetMelodyFeel(a)}}
          @melody-feel-settings-change=${a=>{this.onMelodyFeelSettingsChange(a)}}
          @open-share=${()=>{this.shareModalOpen=!0}}
          @reroll=${this.onReroll}
          @save-set=${()=>{this.saveProject()}}
          @unsave-set=${()=>{this.currentProjectId&&this.onUnsaveSet(new CustomEvent("unsave-set",{detail:this.currentProjectId}))}}
          @view-sets=${()=>{this.libraryOpen=!0}}
          @set-bpm=${a=>{this.progression&&(this.progression={...this.progression,bpm:a.detail.bpm},v.setBpm(a.detail.bpm),this.requestUpdate())}}
          @set-bars-per-chord=${a=>{v.setBarsPerChord(a.detail.bars),this.requestUpdate()}}
          @set-key=${a=>{if(this.progression){const l=a.detail.root,d=a.detail.mode?.toUpperCase()==="MINOR"?"MINOR":"MAJOR";this.progression={...this.progression,key:l,scaleType:d},v.setProgression(this.progression,this.order),this.requestUpdate()}}}
          @set-sound=${a=>{this.onSetInstrument(new CustomEvent("set-instrument",{detail:a.detail.sound}))}}
          @set-feel=${a=>{const l=a.detail.feel||a.detail.playStyle;this.onSetPlayStyle(new CustomEvent("set-play-style",{detail:l}))}}
          @feel-settings-change=${a=>{const l=a.detail.feelSettings;l&&(this.chordFeelSettings={...l},v.setFeelSettings(l),l.playStyle&&l.playStyle!==this.playStyle&&(this.playStyle=l.playStyle,this.safeSet("chroma-chords-play-style",l.playStyle),v.setPlayStyle(l.playStyle)),l.tone&&ke(l.tone),this.requestUpdate())}}
          @set-feel-settings=${a=>{this.chordFeelSettings={...this.chordFeelSettings,...a.detail},v.setFeelSettings(this.chordFeelSettings),a.detail.tone&&ke(a.detail.tone),this.requestUpdate()}}
        ></mobile-dock>
      </div>

      <!-- Vibe Popover (Desktop / Mobile) -->
      ${this.vibeOpen?g`
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
              @input=${a=>this.vibeSearchText=a.target.value}
              @keydown=${a=>{a.key==="Enter"&&this.applyPromptSearch()}}
            />
            <button class="vibe-search-submit" @click=${this.applyPromptSearch} style="background: ${e};" aria-label="Generate from prompt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <div class="vibe-section-label">Genre</div>
          <div class="vibe-pills-row">
            ${["Folk","Jazz","Lo-fi","Cinematic","Pop","R&B","Ambient","Rock"].map(a=>{const l=this.genre.toLowerCase()===a.toLowerCase();return g`
                <button
                  class="vibe-chip ${l?"active":""}"
                  style="background: ${l?e:"#F1E4CC"}; color: #2E271F;"
                  @click=${()=>{this.genre=a,this.regenerate()}}
                >
                  ${a}
                </button>
              `})}
          </div>

          <div class="vibe-section-label">Mood</div>
          <div class="vibe-pills-row">
            ${[{name:"Uplifting",color:"#F6D98B",icon:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",color:"#9CC0EC",icon:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",color:"#C9A9E0",icon:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",color:"#F2735F",icon:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",color:"#F2C9A0",icon:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",color:"#B8CC9E",icon:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"}].map(a=>{const l=this.mood.toLowerCase()===a.name.toLowerCase();return g`
                <button
                  class="vibe-mood-btn ${l?"active":""}"
                  style="background: ${l?a.color:"#F1E4CC"};"
                  @click=${()=>{this.mood=a.name,this.regenerate()}}
                >
                  <div
                    class="vibe-mood-badge"
                    style="background: ${l?"rgba(46,39,31,0.1)":a.color+"44"};"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${l?"#2E271F":a.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="${a.icon}"/>
                    </svg>
                  </div>
                  <span>${a.name}</span>
                </button>
              `})}
          </div>

          <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 20px;">
            <div class="vibe-section-label" style="margin-top: 0;">Band</div>
            <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38);">optional</div>
          </div>
          <div class="vibe-pills-row">
            ${["Steely Dan","Khruangbin","Daft Punk","Radiohead","Mac DeMarco"].map(a=>g`
              <button
                class="vibe-chip ${this.selectedBand===a?"active":""}"
                @click=${()=>{this.selectedBand=this.selectedBand===a?null:a,this.regenerate()}}
              >
                ${a}
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
    `}};B.styles=ge`
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
        padding: 14px 16px 20px;
      }
      .sub-nav-row {
        padding: 10px 14px 4px;
      }
      .scrollable-content {
        padding: 8px 12px 96px;
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
  `;D([k()],B.prototype,"activeTab",2);D([k()],B.prototype,"chordData",2);D([k()],B.prototype,"libraryOpen",2);D([k()],B.prototype,"genre",2);D([k()],B.prototype,"mood",2);D([k()],B.prototype,"progression",2);D([k()],B.prototype,"activeIndex",2);D([k()],B.prototype,"progressStep",2);D([k()],B.prototype,"order",2);D([k()],B.prototype,"playing",2);D([k()],B.prototype,"chordPlaying",2);D([k()],B.prototype,"melodyPlaying",2);D([k()],B.prototype,"songPlaying",2);D([k()],B.prototype,"showTheory",2);D([k()],B.prototype,"instrument",2);D([k()],B.prototype,"playStyle",2);D([k()],B.prototype,"melodySound",2);D([k()],B.prototype,"melodyFeel",2);D([k()],B.prototype,"melodyFeelSettings",2);D([k()],B.prototype,"chordFeelSettings",2);D([k()],B.prototype,"melodyBackingEnabled",2);D([k()],B.prototype,"length",2);D([k()],B.prototype,"sections",2);D([k()],B.prototype,"songTimeline",2);D([k()],B.prototype,"activeSectionIdx",2);D([k()],B.prototype,"activePlayingSectionIdx",2);D([k()],B.prototype,"totalSongSteps",2);D([k()],B.prototype,"userEmail",2);D([k()],B.prototype,"isAuthenticated",2);D([k()],B.prototype,"syncStatus",2);D([k()],B.prototype,"syncError",2);D([k()],B.prototype,"authModalOpen",2);D([k()],B.prototype,"midiModalOpen",2);D([k()],B.prototype,"shareModalOpen",2);D([k()],B.prototype,"selectedChordIndex",2);D([k()],B.prototype,"selectedBand",2);D([k()],B.prototype,"melodyTrack",2);D([k()],B.prototype,"melodyLoop",2);D([k()],B.prototype,"melodySpan",2);D([k()],B.prototype,"playInstrument",2);D([k()],B.prototype,"showDegrees",2);D([k()],B.prototype,"toastMessage",2);D([k()],B.prototype,"toastUndoId",2);D([k()],B.prototype,"isGenerating",2);D([k()],B.prototype,"chordLengthCache",2);D([k()],B.prototype,"vibeOpen",2);D([k()],B.prototype,"vibeSearchText",2);B=D([be("chroma-chords-app")],B);
