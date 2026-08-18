import{f as In,u as Cn,_ as On,a as us,s as Nn,n as $n,l as Rn,P as Y,F as gt,S as $e,M as Ar,C as Er,R as Ir,b as Cr,c as Pn,i as ce,d as he,e as v,A as Or,w as Ce,O as Mn}from"./assets/vendor-D2a8IvoM.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dn={attribute:!0,type:String,converter:Cn,reflect:!1,hasChanged:In},jn=(t=Dn,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),i==="accessor"){const{name:o}=s;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,t,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,t,a),a}}}if(i==="setter"){const{name:o}=s;return function(a){const l=this[o];e.call(this,a),this.requestUpdate(o,l,t,!0,a)}}throw Error("Unsupported decorator location: "+i)};function E(t){return(e,s)=>typeof s=="object"?jn(t,e,s):((i,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(t,e,s)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function w(t){return E({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ln=(t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,s),s);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function oi(t,e){return(s,i,r)=>{const n=o=>o.renderRoot?.querySelector(t)??null;return Ln(s,i,{get(){return n(this)}})}}const Ge="chroma_chords_projects",Bn="chord_voyager_projects";class Ve{static getProjects(){try{let e=localStorage.getItem(Ge);if(e||(e=localStorage.getItem(Bn),e&&localStorage.setItem(Ge,e)),e){const s=JSON.parse(e);let i=!1;return s.forEach(r=>{(r.genre==="Unknown"||!r.genre)&&(r.genre="Pop",i=!0)}),i&&localStorage.setItem(Ge,JSON.stringify(s)),s}}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(Ge,JSON.stringify(e))}catch(s){console.error("Failed to set projects to localStorage:",s)}}static mergeProjects(e,s){const i=new Map;return e.forEach(r=>i.set(r.id,r)),s.forEach(r=>{const n=i.get(r.id);!n||r.lastModified>n.lastModified?i.set(r.id,r):r.lastModified===n.lastModified&&(n.syncedToCloud=!0)}),Array.from(i.values())}static saveProject(e){const s=this.getProjects(),i=s.findIndex(r=>r.id===e.id);e.lastModified=Date.now(),i>=0?s[i]=e:s.push(e);try{localStorage.setItem(Ge,JSON.stringify(s))}catch(r){console.error("Failed to save project to localStorage:",r)}}static deleteProject(e){let s=this.getProjects();s=s.filter(i=>i.id!==e);try{localStorage.setItem(Ge,JSON.stringify(s))}catch(i){console.error("Failed to delete project from localStorage:",i)}}static exportProjectFile(e){const s=JSON.stringify(e,null,2),i=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}static importProjectFile(e){return new Promise((s,i)=>{const r=new FileReader;r.onload=n=>{try{const o=n.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),s(a)):i(new Error("Invalid project file format"))}catch{i(new Error("Failed to parse JSON file"))}},r.onerror=()=>i(new Error("Failed to read file")),r.readAsText(e)})}}const Un=Symbol.for("@supabase/supabase-js.traceContextExtractor");function Fn(){return globalThis[Un]}const zn=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class ai extends Error{constructor(e,s="FunctionsError",i){super(e),this.name=s,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class qn extends ai{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class wi extends ai{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class xi extends ai{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Us;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(Us||(Us={}));class Gn{constructor(e,{headers:s={},customFetch:i,region:r=Us.Any}={}){this.url=e,this.headers=s,this.region=r,this.fetch=zn(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return On(this,arguments,void 0,function*(s,i={}){var r,n;let o,a,l;try{const{headers:c,method:d,body:h,signal:p,timeout:u}=i;let m={},{region:g}=i;g||(g=this.region);const f=new URL(`${this.url}/${s}`);g&&g!=="any"&&(m["x-region"]=g,f.searchParams.set("forceFunctionRegion",g));let y;const x=!!c&&Object.keys(c).some(ue=>ue.toLowerCase()==="content-type");h&&!x?typeof Blob<"u"&&h instanceof Blob||h instanceof ArrayBuffer?(m["Content-Type"]="application/octet-stream",y=h):typeof h=="string"?(m["Content-Type"]="text/plain",y=h):typeof FormData<"u"&&h instanceof FormData?y=h:(m["Content-Type"]="application/json",y=JSON.stringify(h)):h&&typeof h!="string"&&!(typeof Blob<"u"&&h instanceof Blob)&&!(h instanceof ArrayBuffer)&&!(typeof FormData<"u"&&h instanceof FormData)?y=JSON.stringify(h):y=h;let b=p;u&&(a=new AbortController,o=setTimeout(()=>a.abort(),u),p?(b=a.signal,l=()=>a.abort(),p.addEventListener("abort",l)):b=a.signal);const T=yield this.fetch(f.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},m),this.headers),c),body:y,signal:b}).catch(ue=>{throw new qn(ue)}),$=T.headers.get("x-relay-error");if($&&$==="true")throw new wi(T);if(!T.ok)throw new xi(T);let I=((r=T.headers.get("Content-Type"))!==null&&r!==void 0?r:"text/plain").split(";")[0].trim().toLowerCase(),R;return I==="application/json"?R=yield T.json():I==="application/octet-stream"||I==="application/pdf"?R=yield T.blob():I==="text/event-stream"?R=T:I==="multipart/form-data"?R=yield T.formData():R=yield T.text(),{data:R,error:null,response:T}}catch(c){return{data:null,error:c,response:c instanceof xi||c instanceof wi?c.context:void 0}}finally{o&&clearTimeout(o),l&&((n=i.signal)===null||n===void 0||n.removeEventListener("abort",l))}})}}const Nr=3,ki=t=>Math.min(1e3*2**t,3e4),Vn=[520,503],$r=["GET","HEAD","OPTIONS"];var vs=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function yt(t){"@babel/helpers - typeof";return yt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},yt(t)}function Hn(t,e){if(yt(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var i=s.call(t,e);if(yt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Wn(t){var e=Hn(t,"string");return yt(e)=="symbol"?e:e+""}function Kn(t,e,s){return(e=Wn(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function _i(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),s.push.apply(s,i)}return s}function Qe(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?_i(Object(s),!0).forEach(function(i){Kn(t,i,s[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):_i(Object(s)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(s,i))})}return t}function Si(t,e){return new Promise(s=>{if(e?.aborted){s();return}const i=setTimeout(()=>{e?.removeEventListener("abort",r),s()},t);function r(){clearTimeout(i),s()}e?.addEventListener("abort",r)})}function Yn(t,e,s,i){return!(!i||s>=Nr||!$r.includes(t)||!Vn.includes(e))}var Jn=class{constructor(t){var e,s,i,r,n;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(s=t.isMaybeSingle)!==null&&s!==void 0?s:!1,this.shouldStripNulls=(i=t.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(r=t.urlLengthLimit)!==null&&r!==void 0?r:8e3,this.retryEnabled=(n=t.retry)!==null&&n!==void 0?n:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var s=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const o=this.headers.get("Accept");o==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!o||o==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let n=(async()=>{let o=0;for(;;){const c={};s.headers.forEach((h,p)=>{c[p]=h}),o>0&&(c["X-Retry-Count"]=String(o));let d;try{d=await i(s.url.toString(),{method:s.method,headers:c,body:JSON.stringify(s.body,(h,p)=>typeof p=="bigint"?p.toString():p),signal:s.signal})}catch(h){if(h?.name==="AbortError"||h?.code==="ABORT_ERR"||!$r.includes(s.method))throw h;if(s.retryEnabled&&o<Nr){const p=ki(o);o++,await Si(p,s.signal);continue}throw h}if(Yn(s.method,d.status,o,s.retryEnabled)){var a,l;const h=(a=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&a!==void 0?a:null,p=h!==null?Math.max(0,parseInt(h,10)||0)*1e3:ki(o);await d.text(),o++,await Si(p,s.signal);continue}return await s.processResponse(d)}})();return this.shouldThrowOnError||(n=n.catch(o=>{var a;let l="",c="",d="";const h=o?.cause;if(h){var p,u,m,g;const x=(p=h?.message)!==null&&p!==void 0?p:"",b=(u=h?.code)!==null&&u!==void 0?u:"";l=`${(m=o?.name)!==null&&m!==void 0?m:"FetchError"}: ${o?.message}`,l+=`

Caused by: ${(g=h?.name)!==null&&g!==void 0?g:"Error"}: ${x}`,b&&(l+=` (${b})`),h?.stack&&(l+=`
${h.stack}`)}else{var f;l=(f=o?.stack)!==null&&f!==void 0?f:""}const y=this.url.toString().length;return o?.name==="AbortError"||o?.code==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(h?.name==="HeadersOverflowError"||h?.code==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(c+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(a=o?.name)!==null&&a!==void 0?a:"FetchError"}: ${o?.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),n.then(t,e)}async processResponse(t){var e=this;let s=null,i=null,r=null,n=t.status,o=t.statusText;if(t.ok){var a,l;if(e.method!=="HEAD"){var c;const u=await t.text();if(u!=="")if(e.headers.get("Accept")==="text/csv")i=u;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))i=u;else try{i=JSON.parse(u)}catch{if(s={message:u},i=null,e.shouldThrowOnError)throw new vs({message:u,details:"",hint:"",code:""})}}const h=(a=e.headers.get("Prefer"))===null||a===void 0?void 0:a.match(/count=(exact|planned|estimated)/),p=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(h&&p&&p.length>1&&(r=parseInt(p[1])),e.isMaybeSingle&&Array.isArray(i))if(i.length>1){if(s={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,r=null,n=406,o="Not Acceptable",e.shouldThrowOnError){var d;throw new vs(Qe(Qe({},s),{},{hint:(d=s.hint)!==null&&d!==void 0?d:""}))}}else i.length===1?i=i[0]:i=null}else{const h=await t.text();try{s=JSON.parse(h),Array.isArray(s)&&t.status===404&&(i=[],s=null,n=200,o="OK")}catch{t.status===404&&h===""?(n=204,o="No Content"):s={message:h}}if(s&&e.shouldThrowOnError)throw new vs(s)}return{success:s===null,error:s,data:i,count:r,status:n,statusText:o}}returns(){return this}overrideTypes(){return this}},Xn=class extends Jn{throwOnError(){return super.throwOnError()}select(t){let e=!1;const s=(t??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",s),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:s,foreignTable:i,referencedTable:r=i}={}){const n=r?`${r}.order`:"order",o=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${o?`${o},`:""}${t}.${e?"asc":"desc"}${s===void 0?"":s?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:s=e}={}){const i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${t}`),this}range(t,e,{foreignTable:s,referencedTable:i=s}={}){const r=typeof i>"u"?"offset":`${i}.offset`,n=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${t}`),this.url.searchParams.set(n,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:s=!1,buffers:i=!1,wal:r=!1,format:n="text"}={}){var o;const a=[t?"analyze":null,e?"verbose":null,s?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${n}; for="${l}"; options=${a};`),n==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const Ti=new RegExp("[,()]");var Je=class extends Xn{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const s=Array.from(new Set(e)).map(i=>typeof i=="string"&&Ti.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`in.(${s})`),this}notIn(t,e){const s=Array.from(new Set(e)).map(i=>typeof i=="string"&&Ti.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`not.in.(${s})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:s,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const n=s===void 0?"":`(${s})`;return this.url.searchParams.append(t,`${r}fts${n}.${e}`),this}match(t){return Object.entries(t).filter(([e,s])=>s!==void 0).forEach(([e,s])=>{this.url.searchParams.append(e,`eq.${s}`)}),this}not(t,e,s){return this.url.searchParams.append(t,`not.${e}.${s}`),this}or(t,{foreignTable:e,referencedTable:s=e}={}){const i=s?`${s}.or`:"or";return this.url.searchParams.append(i,`(${t})`),this}filter(t,e,s){return this.url.searchParams.append(t,`${e}.${s}`),this}},Qn=class{constructor(t,{headers:e={},schema:s,fetch:i,urlLengthLimit:r=8e3,retry:n}){this.url=t,this.headers=new Headers(e),this.schema=s,this.fetch=i,this.urlLengthLimit=r,this.retry=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:s=!1,count:i}=e??{},r=s?"HEAD":"GET";let n=!1;const o=(t??"*").split("").map(c=>/\s/.test(c)&&!n?"":(c==='"'&&(n=!n),c)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",o),i&&l.append("Prefer",`count=${i}`),new Je({method:r,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:s=!0}={}){var i;const r="POST",{url:n,headers:o}=this.cloneRequestState();if(e&&o.append("Prefer",`count=${e}`),s||o.append("Prefer","missing=default"),Array.isArray(t)){const a=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(a.length>0){const l=[...new Set(a)].map(c=>`"${c}"`);n.searchParams.set("columns",l.join(","))}}return new Je({method:r,url:n,headers:o,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:s=!1,count:i,defaultToNull:r=!0}={}){var n;const o="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${s?"ignore":"merge"}-duplicates`),e!==void 0&&a.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),r||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((d,h)=>d.concat(Object.keys(h)),[]);if(c.length>0){const d=[...new Set(c)].map(h=>`"${h}"`);a.searchParams.set("columns",d.join(","))}}return new Je({method:o,url:a,headers:l,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var s;const i="PATCH",{url:r,headers:n}=this.cloneRequestState();return e&&n.append("Prefer",`count=${e}`),new Je({method:i,url:r,headers:n,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const s="DELETE",{url:i,headers:r}=this.cloneRequestState();return t&&r.append("Prefer",`count=${t}`),new Je({method:s,url:i,headers:r,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Zn=class Rr{constructor(e,{headers:s={},schema:i,fetch:r,timeout:n,urlLengthLimit:o=8e3,retry:a}={}){this.url=e,this.headers=new Headers(s),this.schemaName=i,this.urlLengthLimit=o;const l=r??globalThis.fetch;n!==void 0&&n>0?this.fetch=(c,d)=>{const h=new AbortController,p=setTimeout(()=>h.abort(),n),u=d?.signal;if(u){if(u.aborted)return clearTimeout(p),l(c,d);const m=()=>{clearTimeout(p),h.abort()};return u.addEventListener("abort",m,{once:!0}),l(c,Qe(Qe({},d),{},{signal:h.signal})).finally(()=>{clearTimeout(p),u.removeEventListener("abort",m)})}return l(c,Qe(Qe({},d),{},{signal:h.signal})).finally(()=>clearTimeout(p))}:this.fetch=l,this.retry=a}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Qn(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new Rr(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,s={},{head:i=!1,get:r=!1,count:n}={}){var o;let a;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=u=>u!==null&&typeof u=="object"&&(!Array.isArray(u)||u.some(d)),h=i&&Object.values(s).some(d);h?(a="POST",c=s):i||r?(a=i?"HEAD":"GET",Object.entries(s).filter(([u,m])=>m!==void 0).map(([u,m])=>[u,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([u,m])=>{l.searchParams.append(u,m)})):(a="POST",c=s);const p=new Headers(this.headers);return h?p.set("Prefer",n?`count=${n},return=minimal`:"return=minimal"):n&&p.set("Prefer",`count=${n}`),new Je({method:a,url:l,headers:p,schema:this.schemaName,body:c,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class eo{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const s=globalThis;if(typeof globalThis<"u"&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};const i=typeof global<"u"?global:void 0;if(i&&typeof i.WebSocket<"u")return{type:"native",wsConstructor:i.WebSocket};if(typeof globalThis<"u"&&typeof s.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&s.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const n=r.versions;if(n&&n.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let s=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(s+=`

Suggested solution: ${e.workaround}`),new Error(s)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const to="2.112.3",so=`realtime-js/${to}`,io="1.0.0",Pr="2.0.0",ro=Pr,no=1e4,oo=100,Oe={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Mr={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Fs={connecting:"connecting",closing:"closing",closed:"closed"};class ao{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,s){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return s(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return s(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var s;return this._isArrayBuffer((s=e.payload)===null||s===void 0?void 0:s.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var s,i;const r=(i=(s=e.payload)===null||s===void 0?void 0:s.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,r)}_encodeJsonUserBroadcastPush(e){var s,i;const r=(i=(s=e.payload)===null||s===void 0?void 0:s.payload)!==null&&i!==void 0?i:{},o=new TextEncoder().encode(JSON.stringify(r)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(e,s,i){var r,n;const o=new TextEncoder,a=o.encode(e.topic),l=o.encode((r=e.ref)!==null&&r!==void 0?r:""),c=o.encode((n=e.join_ref)!==null&&n!==void 0?n:""),d=o.encode(e.payload.event),h=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=o.encode(Object.keys(h).length===0?"":JSON.stringify(h));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`topic length ${a.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const u=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+a.length+d.length+p.length,m=new ArrayBuffer(this.HEADER_LENGTH+u),g=new DataView(m),f=new Uint8Array(m);let y=0;g.setUint8(y++,this.KINDS.userBroadcastPush),g.setUint8(y++,c.length),g.setUint8(y++,l.length),g.setUint8(y++,a.length),g.setUint8(y++,d.length),g.setUint8(y++,p.length),g.setUint8(y++,s),f.set(c,y),y+=c.length,f.set(l,y),y+=l.length,f.set(a,y),y+=a.length,f.set(d,y),y+=d.length,f.set(p,y),y+=p.length;var x=new Uint8Array(m.byteLength+i.byteLength);return x.set(new Uint8Array(m),0),x.set(new Uint8Array(i),m.byteLength),x.buffer}decode(e,s){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return s(i)}if(typeof e=="string"){const i=JSON.parse(e),[r,n,o,a,l]=i;return s({join_ref:r,ref:n,topic:o,event:a,payload:l})}return s({})}_binaryDecode(e){const s=new DataView(e),i=s.getUint8(0),r=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,s,r)}}_decodeUserBroadcast(e,s,i){const r=s.getUint8(1),n=s.getUint8(2),o=s.getUint8(3),a=s.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+r));l=l+r;const d=i.decode(e.slice(l,l+n));l=l+n;const h=i.decode(e.slice(l,l+o));l=l+o;const p=e.slice(l,e.byteLength),u=a===this.JSON_ENCODING?JSON.parse(i.decode(p)):p,m={type:this.BROADCAST_EVENT,event:d,payload:u};return o>0&&(m.meta=JSON.parse(h)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var s;return e instanceof ArrayBuffer||((s=e?.constructor)===null||s===void 0?void 0:s.name)==="ArrayBuffer"}_pick(e,s){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>s.includes(i)))}}var B;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(B||(B={}));const Ai=(t,e,s={})=>{var i;const r=(i=s.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((n,o)=>(n[o]=lo(o,t,e,r),n),{}):{}},lo=(t,e,s,i)=>{const r=e.find(a=>a.name===t),n=r?.type,o=s[t];return n&&!i.includes(n)?Dr(n,o):zs(o)},Dr=(t,e)=>{if(t.charAt(0)==="_"){const s=t.slice(1,t.length);return po(e,s)}switch(t){case B.bool:return co(e);case B.float4:case B.float8:case B.int2:case B.int4:case B.int8:case B.numeric:case B.oid:return ho(e);case B.json:case B.jsonb:return uo(e);case B.timestamp:return fo(e);case B.abstime:case B.date:case B.daterange:case B.int4range:case B.int8range:case B.money:case B.reltime:case B.text:case B.time:case B.timestamptz:case B.timetz:case B.tsrange:case B.tstzrange:return zs(e);default:return zs(e)}},zs=t=>t,co=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},ho=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},uo=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},po=(t,e)=>{if(typeof t!="string")return t;const s=t.length-1,i=t[s];if(t[0]==="{"&&i==="}"){let n;const o=t.slice(1,s);try{n=JSON.parse("["+o+"]")}catch{n=o?o.split(","):[]}return n.map(a=>Dr(e,a))}return t},fo=t=>typeof t=="string"?t.replace(" ","T"):t,jr=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var et=t=>typeof t=="function"?t:function(){return t},go=typeof self<"u"?self:null,Xe=typeof window<"u"?window:null,pe=go||Xe||globalThis,mo="2.0.0",vo=1e4,yo=1e3,bo=100,fe={connecting:0,open:1,closing:2,closed:3},J={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},we={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},qs={longpoll:"longpoll",websocket:"websocket"},wo={complete:4},Gs="base64url.bearer.phx.",Mt=class{constructor(t,e,s,i){this.channel=t,this.event=e,this.payload=s||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:s}){this.recHooks.filter(i=>i.status===t).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},Lr=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},xo=class{constructor(t,e,s){this.state=J.closed,this.topic=t,this.params=et(e||{}),this.socket=s,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Mt(this,we.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Lr(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=J.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=J.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=J.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=J.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Mt(this,we.leave,et({}),this.timeout).send(),this.state=J.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(we.reply,(i,r)=>{this.trigger(this.replyEventName(r),i)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=J.closed,this.bindings=[]}onClose(t){this.on(we.close,t)}onError(t){return this.on(we.error,e=>t(e))}on(t,e){let s=this.bindingRef++;return this.bindings.push({event:t,ref:s,callback:e}),s}off(t,e){this.bindings=this.bindings.filter(s=>!(s.event===t&&(typeof e>"u"||e===s.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,s=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new Mt(this,t,function(){return e},s);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=J.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(we.close,"leave")},s=new Mt(this,we.leave,et({}),t);return s.receive("ok",()=>e()).receive("timeout",()=>e()),s.send(),this.canPush()||s.trigger("ok",{}),s}onMessage(t,e,s){return e}filterBindings(t,e,s){return!0}isMember(t,e,s,i){return this.topic!==t?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:s,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=J.joining,this.joinPush.resend(t))}trigger(t,e,s,i){let r=this.onMessage(t,e,s,i);if(e&&!r)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let n=this.bindings.filter(o=>o.event===t&&this.filterBindings(o,e,s));for(let o=0;o<n.length;o++)n[o].callback(r,s,i||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===J.closed}isErrored(){return this.state===J.errored}isJoined(){return this.state===J.joined}isJoining(){return this.state===J.joining}isLeaving(){return this.state===J.leaving}},es=class{static request(t,e,s,i,r,n,o){if(pe.XDomainRequest){let a=new pe.XDomainRequest;return this.xdomainRequest(a,t,e,i,r,n,o)}else if(pe.XMLHttpRequest){let a=new pe.XMLHttpRequest;return this.xhrRequest(a,t,e,s,i,r,n,o)}else{if(pe.fetch&&pe.AbortController)return this.fetchRequest(t,e,s,i,r,n,o);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,s,i,r,n,o){let a={method:t,headers:s,body:i},l=null;return r&&(l=new AbortController,setTimeout(()=>l.abort(),r),a.signal=l.signal),pe.fetch(e,a).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>o&&o(c)).catch(c=>{c.name==="AbortError"&&n?n():o&&o(null)}),l}static xdomainRequest(t,e,s,i,r,n,o){return t.timeout=r,t.open(e,s),t.onload=()=>{let a=this.parseJSON(t.responseText);o&&o(a)},n&&(t.ontimeout=n),t.onprogress=()=>{},t.send(i),t}static xhrRequest(t,e,s,i,r,n,o,a){t.open(e,s,!0),t.timeout=n;for(let[l,c]of Object.entries(i))t.setRequestHeader(l,c);return t.onerror=()=>a&&a(null),t.onreadystatechange=()=>{if(t.readyState===wo.complete&&a){let l=this.parseJSON(t.responseText);a(l)}},o&&(t.ontimeout=o),t.send(r),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let s=[];for(var i in t){if(!Object.prototype.hasOwnProperty.call(t,i))continue;let r=e?`${e}[${i}]`:i,n=t[i];typeof n=="object"?s.push(this.serialize(n,r)):s.push(encodeURIComponent(r)+"="+encodeURIComponent(n))}return s.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let s=t.match(/\?/)?"&":"?";return`${t}${s}${this.serialize(e)}`}},ko=t=>{let e="",s=new Uint8Array(t),i=s.byteLength;for(let r=0;r<i;r++)e+=String.fromCharCode(s[r]);return btoa(e)},He=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(Gs)&&(this.authToken=atob(e[1].slice(Gs.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=fe.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+qs.websocket),"$1/"+qs.longpoll)}endpointURL(){return es.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,s){this.close(t,e,s),this.readyState=fe.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===fe.open||this.readyState===fe.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:s,token:i,messages:r}=e;if(s===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else s=0;switch(s){case 200:r.forEach(n=>{setTimeout(()=>this.onmessage({data:n}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=fe.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${s}`)}})}send(t){typeof t!="string"&&(t=ko(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const s=e+bo,i=t.slice(e,s);this.ajax("POST",{"Content-Type":"application/x-ndjson"},i.join(`
`),()=>this.onerror("timeout"),r=>{!r||r.status!==200?(this.awaitingBatchAck=!1,this.onerror(r&&r.status),this.closeAndRetry(1011,"internal server error",!1)):s<t.length?this.batchSend(t,s):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,s){for(let r of this.reqs)r.abort();this.readyState=fe.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:s});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(t,e,s,i,r){let n,o=()=>{this.reqs.delete(n),i()};n=es.request(t,this.endpointURL(),e,s,this.timeout,o,a=>{this.reqs.delete(n),this.isActive()&&r(a)}),this.reqs.add(n)}},_o=class dt{constructor(e,s={}){let i=s.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,r=>{let{onJoin:n,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel.joinRef(),this.state=dt.syncState(this.state,r,n,o),this.pendingDiffs.forEach(l=>{this.state=dt.syncDiff(this.state,l,n,o)}),this.pendingDiffs=[],a()}),this.channel.on(i.diff,r=>{let{onJoin:n,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(r):(this.state=dt.syncDiff(this.state,r,n,o),a())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return dt.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,s,i,r){let n=this.toNullProtoObj(this.clone(e));s=this.toNullProtoObj(s);let o=Object.create(null),a=Object.create(null);return this.map(n,(l,c)=>{s[l]||(a[l]=c)}),this.map(s,(l,c)=>{let d=n[l];if(d){let h=c.metas.map(g=>g.phx_ref),p=d.metas.map(g=>g.phx_ref),u=c.metas.filter(g=>p.indexOf(g.phx_ref)<0),m=d.metas.filter(g=>h.indexOf(g.phx_ref)<0);u.length>0&&(o[l]=c,o[l].metas=u),m.length>0&&(a[l]=this.clone(d),a[l].metas=m)}else o[l]=c}),this.syncDiff(n,{joins:o,leaves:a},i,r)}static syncDiff(e,s,i,r){e=this.toNullProtoObj(e);let{joins:n,leaves:o}=this.clone(s);return i||(i=function(){}),r||(r=function(){}),this.map(n,(a,l)=>{let c=e[a];if(e[a]=this.clone(l),c){let d=e[a].metas.map(p=>p.phx_ref),h=c.metas.filter(p=>d.indexOf(p.phx_ref)<0);e[a].metas.unshift(...h)}i(a,c,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;let d=l.metas.map(h=>h.phx_ref);c.metas=c.metas.filter(h=>d.indexOf(h.phx_ref)<0),r(a,c,l),c.metas.length===0&&delete e[a]}),e}static list(e,s){return s||(s=function(i,r){return r}),this.map(e,(i,r)=>s(i,r))}static map(e,s){return Object.getOwnPropertyNames(e).map(i=>s(i,e[i]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let s=Object.create(null);return Object.getOwnPropertyNames(e).forEach(i=>{s[i]=e[i]}),s}static clone(e){return JSON.parse(JSON.stringify(e))}},Dt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let s=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(s))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[s,i,r,n,o]=JSON.parse(t);return e({join_ref:s,ref:i,topic:r,event:n,payload:o})}},binaryEncode(t){let{join_ref:e,ref:s,event:i,topic:r,payload:n}=t,o=new TextEncoder,a=o.encode(e),l=o.encode(s),c=o.encode(r),d=o.encode(i);this.assertFieldSize(a.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(d.byteLength,"event");let h=this.META_LENGTH+a.byteLength+l.byteLength+c.byteLength+d.byteLength,p=new ArrayBuffer(this.HEADER_LENGTH+h),u=new Uint8Array(p),m=new DataView(p),g=0;m.setUint8(g++,this.KINDS.push),m.setUint8(g++,a.byteLength),m.setUint8(g++,l.byteLength),m.setUint8(g++,c.byteLength),m.setUint8(g++,d.byteLength),u.set(a,g),g+=a.byteLength,u.set(l,g),g+=l.byteLength,u.set(c,g),g+=c.byteLength,u.set(d,g),g+=d.byteLength;var f=new Uint8Array(p.byteLength+n.byteLength);return f.set(u,0),f.set(new Uint8Array(n),p.byteLength),f.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),s=e.getUint8(0),i=new TextDecoder;switch(s){case this.KINDS.push:return this.decodePush(t,e,i);case this.KINDS.reply:return this.decodeReply(t,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,i)}},decodePush(t,e,s){let i=e.getUint8(1),r=e.getUint8(2),n=e.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,a=s.decode(t.slice(o,o+i));o=o+i;let l=s.decode(t.slice(o,o+r));o=o+r;let c=s.decode(t.slice(o,o+n));o=o+n;let d=t.slice(o,t.byteLength);return{join_ref:a,ref:null,topic:l,event:c,payload:d}},decodeReply(t,e,s){let i=e.getUint8(1),r=e.getUint8(2),n=e.getUint8(3),o=e.getUint8(4),a=this.HEADER_LENGTH+this.META_LENGTH,l=s.decode(t.slice(a,a+i));a=a+i;let c=s.decode(t.slice(a,a+r));a=a+r;let d=s.decode(t.slice(a,a+n));a=a+n;let h=s.decode(t.slice(a,a+o));a=a+o;let p=t.slice(a,t.byteLength),u={status:h,response:p};return{join_ref:l,ref:c,topic:d,event:we.reply,payload:u}},decodeBroadcast(t,e,s){let i=e.getUint8(1),r=e.getUint8(2),n=this.HEADER_LENGTH+2,o=s.decode(t.slice(n,n+i));n=n+i;let a=s.decode(t.slice(n,n+r));n=n+r;let l=t.slice(n,t.byteLength);return{join_ref:null,ref:null,topic:o,event:a,payload:l}}},So=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||vo,this.transport=e.transport||pe.WebSocket||He,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let s=null;try{s=pe&&pe.sessionStorage}catch{}this.sessionStore=e.sessionStorage||s,this.establishedConnections=0,this.defaultEncoder=Dt.encode.bind(Dt),this.defaultDecoder=Dt.decode.bind(Dt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==He?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let i=null;Xe&&Xe.addEventListener&&(Xe.addEventListener("pagehide",r=>{this.conn&&(this.disconnect(),i=this.connectClock)}),Xe.addEventListener("pageshow",r=>{i===this.connectClock&&(i=null,this.connect())}),Xe.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=r=>e.rejoinAfterMs?e.rejoinAfterMs(r):[1e3,2e3,5e3][r-1]||1e4,this.reconnectAfterMs=r=>e.reconnectAfterMs?e.reconnectAfterMs(r):[10,50,100,150,200,250,500,1e3,2e3][r-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(r,n,o)=>{console.log(`${r}: ${n}`,o)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=et(e.params||{}),this.endPoint=`${t}/${qs.websocket}`,this.vsn=e.vsn||mo,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Lr(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&et(e.authToken)}getLongPollTransport(){return He}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=es.appendParams(es.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,s){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,s)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=et(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==He?this.connectWithFallback(He,this.longPollFallbackMs):this.transportConnect())}log(t,e,s){this.logger&&this.logger(t,e,s)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),s=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(r=>{r.ref===e&&(this.off([i]),t(Date.now()-s))});return!0}transportName(t){switch(t){case He:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${Gs}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let s=!1,i=!0,r,n,o=this.transportName(t),a=l=>{this.log("transport",`falling back to ${o}...`,l),this.off([r,n]),i=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return a("memorized");this.fallbackTimer=setTimeout(a,e),n=this.onError(l=>{this.log("transport","error",l),i&&!s&&(clearTimeout(this.fallbackTimer),a(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(s=!0,!i){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(a,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),yo,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,s){if(!this.conn)return t&&t();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,s||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,s=1){if(s===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,s+1)},150*s)}waitForSocketClosed(t,e,s=1){if(s===5||t.readyState===fe.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,s+1)},150*s)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,s=this.establishedConnections;this.triggerStateCallbacks("error",t,e,s),(e===this.transport||s>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(we.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case fe.connecting:return"connecting";case fe.open:return"open";case fe.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([s])=>t.indexOf(s)===-1)}channel(t,e={}){let s=new xo(t,e,this);return this.channels.push(s),s}push(t){if(this.hasLogger()){let{topic:e,event:s,payload:i,ref:r,join_ref:n}=t;this.log("push",`${e} ${s} (${n}, ${r})`,i)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:s,event:i,payload:r,ref:n,join_ref:o}=e;if(n&&n===this.pendingHeartbeatRef){const a=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status==="ok"?"ok":"error",a)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${r.status||""} ${s} ${i} ${n&&"("+n+")"||""}`.trim(),r);for(let a=0;a<this.channels.length;a++){const l=this.channels[a];l.isMember(s,i,r,o)&&l.trigger(i,r,n,o)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([s,i])=>{try{i(...e)}catch(r){this.log("error",`error in ${t} callback`,r)}})}catch(s){this.log("error",`error triggering ${t} callbacks`,s)}}leaveOpenTopic(t){let e=this.channels.find(s=>s.topic===t&&(s.isJoined()||s.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class mt{constructor(e,s){const i=Ao(s);this.presence=new _o(e.getChannel(),i),this.presence.onJoin((r,n,o)=>{const a=mt.onJoinPayload(r,n,o);e.getChannel().trigger("presence",a)}),this.presence.onLeave((r,n,o)=>{const a=mt.onLeavePayload(r,n,o);e.getChannel().trigger("presence",a)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return mt.transformState(this.presence.state)}static transformState(e){return e=To(e),Object.getOwnPropertyNames(e).reduce((s,i)=>{const r=e[i];return s[i]=Vt(r),s},{})}static onJoinPayload(e,s,i){const r=Ei(s),n=Vt(i);return{event:"join",key:e,currentPresences:r,newPresences:n}}static onLeavePayload(e,s,i){const r=Ei(s),n=Vt(i);return{event:"leave",key:e,currentPresences:r,leftPresences:n}}}function Vt(t){return t.metas.map(e=>{const s=Object.getOwnPropertyDescriptors(e),i=Object.defineProperties({},s);return i.presence_ref=i.phx_ref,delete i.phx_ref,delete i.phx_ref_prev,i})}function To(t){return JSON.parse(JSON.stringify(t))}function Ao(t){return t?.events&&{events:t.events}}function Ei(t){return t?.metas?Vt(t):[]}var Ii;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Ii||(Ii={}));class Eo{get state(){return this.presenceAdapter.state}constructor(e,s){this.channel=e,this.presenceAdapter=new mt(this.channel.channelAdapter,s)}}function Io(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const s=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${s}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class Co{constructor(e,s,i){const r=Oo(i);this.channel=e.getSocket().channel(s,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,s){return this.channel.on(e,s)}off(e,s){this.channel.off(e,s)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,s,i){let r;try{r=this.channel.push(e,s,i)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>oo){const n=this.channel.pushBuffer.shift();n.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${n.event}`,n.payload())}return r}updateJoinPayload(e){const s=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},s),e)}canPush(){return this.socket.isConnected()&&this.state===Oe.joined}isJoined(){return this.state===Oe.joined}isJoining(){return this.state===Oe.joining}isClosed(){return this.state===Oe.closed}isLeaving(){return this.state===Oe.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function Oo(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const No=/[,()"\\]/,$o=t=>No.test(t)||t!==t.trim(),Ro=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Ci=t=>{const e=t===null?"null":String(t);return $o(e)?Ro(e):e},Po=t=>t===null?"null":String(t),Mo=(t,e)=>{if(t==="in"){const s=Array.isArray(e)?e:[e];if(s.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(s)).map(r=>Ci(r)).join(",")})`}return t==="is"?`is.${Po(e)}`:`${t}.${Ci(e)}`};class Do{constructor(){this.filters=[]}add(e,s,i,r=!1){const n=r?"not.":"";return this.filters.push(`${e}=${n}${Mo(s,i)}`),this}eq(e,s){return this.add(e,"eq",s)}neq(e,s){return this.add(e,"neq",s)}gt(e,s){return this.add(e,"gt",s)}gte(e,s){return this.add(e,"gte",s)}lt(e,s){return this.add(e,"lt",s)}lte(e,s){return this.add(e,"lte",s)}in(e,s){return this.add(e,"in",s)}like(e,s){return this.add(e,"like",s)}ilike(e,s){return this.add(e,"ilike",s)}match(e,s){return this.add(e,"match",s)}imatch(e,s){return this.add(e,"imatch",s)}is(e,s){return this.add(e,"is",s)}isDistinct(e,s){return this.add(e,"isdistinct",s)}not(e,s,i){return this.add(e,s,i,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Oi;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Oi||(Oi={}));var Be;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(Be||(Be={}));var xe;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(xe||(xe={}));class ke{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,s={config:{}},i){var r,n;if(this.topic=e,this.params=s,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},s.config),this.channelAdapter=new Co(this.socket.socketAdapter,e,this.params),this.presence=new Eo(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=jr(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((n=(r=this.params.config)===null||r===void 0?void 0:r.broadcast)===null||n===void 0)&&n.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,s=this.timeout){var i,r,n;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:a,private:l}}=this.params,c=(r=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(u=>u.filter))!==null&&r!==void 0?r:[],d=!!this.bindings[Be.PRESENCE]&&this.bindings[Be.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,h={},p={broadcast:o,presence:Object.assign(Object.assign({},a),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(h.access_token=this.socket.accessTokenValue),this._onError(u=>{e?.(xe.CHANNEL_ERROR,Io(u))}),this._onClose(()=>e?.(xe.CLOSED)),this.updateJoinPayload(Object.assign({config:p},h)),this._updateFilterMessage(),this.channelAdapter.subscribe(s).receive("ok",async({postgres_changes:u})=>{if(this.socket._isManualToken()||this.socket.setAuth(),u===void 0){e?.(xe.SUBSCRIBED);return}this._updatePostgresBindings(u,e)}).receive("error",u=>{this.state=Oe.errored;const m=Object.values(u).join(", ")||"error";e?.(xe.CHANNEL_ERROR,new Error(m,{cause:u}))}).receive("timeout",()=>{e?.(xe.TIMED_OUT)})}return this}_updatePostgresBindings(e,s){var i;const r=this.bindings.postgres_changes,n=(i=r?.length)!==null&&i!==void 0?i:0,o=[];for(let a=0;a<n;a++){const l=r[a],{filter:{event:c,schema:d,table:h,filter:p}}=l,u=e&&e[a];if(u&&u.event===c&&ke.isFilterValueEqual(u.schema,d)&&ke.isFilterValueEqual(u.table,h)&&ke.isFilterValueEqual(u.filter,p))o.push(Object.assign(Object.assign({},l),{id:u.id}));else{this.unsubscribe(),this.state=Oe.errored,s?.(xe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=o,this.state!=Oe.errored&&s&&s(xe.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,s={}){return await this.send({type:"presence",event:"track",payload:e},s)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,s,i){const r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),n=e===Be.PRESENCE||e===Be.POSTGRES_CHANGES;if(r&&n)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,s,i)}async httpSend(e,s,i={}){var r;if(s==null)return Promise.reject(new Error("Payload is required for httpSend()"));const n=s instanceof ArrayBuffer||ArrayBuffer.isView(s),o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":n?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const a=new URL(this.broadcastEndpointURL);a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set("private","true");const l={method:"POST",headers:o,body:n?s:JSON.stringify(s)},c=await this._fetchWithTimeout(a.toString(),l,(r=i.timeout)!==null&&r!==void 0?r:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const h=await c.json();d=h.error||h.message||d}catch{}return Promise.reject(new Error(d))}async send(e,s={}){var i,r;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:o}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=s.timeout)!==null&&i!==void 0?i:this.timeout);return await((r=c.body)===null||r===void 0?void 0:r.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var o,a,l;const c=this.channelAdapter.push(e.type,e,s.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(s=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>s("ok")).receive("timeout",()=>s("timed out")).receive("error",()=>s("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,s,i){const r=new AbortController,n=setTimeout(()=>r.abort(),i),o=await this.socket.fetch(e,Object.assign(Object.assign({},s),{signal:r.signal}));return clearTimeout(n),o}_on(e,s,i){var r;const n=e.toLocaleLowerCase(),o=s?.filter;if((o instanceof Do||typeof o=="object"&&o!==null&&typeof o.build=="function")&&(s=Object.assign(Object.assign({},s),{filter:o.build()})),n===Be.POSTGRES_CHANGES&&((r=this.bindings[n])===null||r===void 0?void 0:r.find(d=>ke.isSamePostgresFilter(d.filter,s))))return this.socket.log("error",`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,s),this;const a=this.channelAdapter.on(e,i),l={type:n,filter:s,callback:i,ref:a};return this.bindings[n]?this.bindings[n].push(l):this.bindings[n]=[l],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,s,i)=>{var r,n,o,a,l,c,d;const h=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(h,i))return!1;const p=(r=this.bindings[h])===null||r===void 0?void 0:r.find(u=>u.ref===e.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(h))if("id"in p){const u=p.id,m=(n=p.filter)===null||n===void 0?void 0:n.event;return u&&((o=s.ids)===null||o===void 0?void 0:o.includes(u))&&(m==="*"||m?.toLocaleLowerCase()===((a=s.data)===null||a===void 0?void 0:a.type.toLocaleLowerCase()))}else{const u=(c=(l=p?.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return u==="*"||u===((d=s?.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===h})}_notThisChannelEvent(e,s){const{close:i,error:r,leave:n,join:o}=Mr;return s&&[i,r,n,o].includes(e)&&s!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,s,i)=>{if(typeof s=="object"&&"ids"in s){const r=s.data,{schema:n,table:o,commit_timestamp:a,type:l,errors:c}=r;return Object.assign(Object.assign({},{schema:n,table:o,commit_timestamp:a,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(r))}return s})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const s in e.bindings)for(const i of e.bindings[s])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,s){return(e??void 0)===(s??void 0)}static isSamePostgresFilter(e,s){var i,r,n,o;const a=(r=(i=e?.select)===null||i===void 0?void 0:i.join())!==null&&r!==void 0?r:void 0,l=(o=(n=s?.select)===null||n===void 0?void 0:n.join())!==null&&o!==void 0?o:void 0;return e?.event===s?.event&&ke.isFilterValueEqual(e?.schema,s?.schema)&&ke.isFilterValueEqual(e?.table,s?.table)&&ke.isFilterValueEqual(e?.filter,s?.filter)&&a===l}_getPayloadRecords(e){const s={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(s.new=Ai(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(s.old=Ai(e.columns,e.old_record)),s}}class jo{constructor(e,s){this.socket=new So(e,s)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,s,i,r=1e4){return new Promise(n=>{setTimeout(()=>n("timeout"),r),this.socket.disconnect(()=>{e(),n("ok")},s,i)})}push(e){this.socket.push(e)}log(e,s,i){this.socket.log(e,s,i)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Fs.connecting}isDisconnecting(){return this.socket.connectionState()==Fs.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Ni={HEARTBEAT_INTERVAL:25e3},Lo=[1e3,2e3,5e3,1e4],Bo=1e4;function Uo(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var s;return(s=Array.from(t.keys())[e])!==null&&s!==void 0?s:null},removeItem(e){t.delete(e)},setItem(e,s){t.set(e,String(s))}}}function Fo(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return Uo()}const zo=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class qo{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,s){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new ao,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=n=>n?(...o)=>n(...o):(...o)=>fetch(...o),!(!((i=s?.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=s.params.apikey;const r=this._initializeOptions(s);this.socketAdapter=new jo(e,r),this.httpEndpoint=jr(e),this.fetch=this._resolveFetch(s?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const s=e.message;throw new Error(`WebSocket not available: ${s}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,s){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,s)}getChannels(){return this.channels}async removeChannel(e){const s=await e.unsubscribe();return s==="ok"&&e.teardown(),s}async removeAllChannels(){const e=this.channels.map(async i=>{const r=await i.unsubscribe();return i.teardown(),r}),s=await Promise.all(e);return await this.disconnect(),s}log(e,s,i){this.socketAdapter.log(e,s,i)}connectionState(){return this.socketAdapter.connectionState()||Fs.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,s={config:{}}){const i=`realtime:${e}`,r=this.getChannels().find(n=>n.topic===i);if(r)return r;{const n=new ke(`realtime:${e}`,s,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){const s=++this._authGeneration,i=this._performAuth(e,s);s===this._authGeneration&&(this._authPromise=i);try{await i}finally{this._authPromise===i&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(s=>s.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,s){let i,r=!1;if(e)i=e,r=!0;else if(this.accessToken)try{i=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),i=this.accessTokenValue}else i=this.accessTokenValue;s===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=i&&(this.accessTokenValue=i,this.channels.forEach(n=>{const o={access_token:i,version:so};n.updateJoinPayload(o),n.joinedOnce&&n.channelAdapter.isJoined()&&n.channelAdapter.push(Mr.access_token,{access_token:i})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(s=>{this.log("error",`Error setting auth in ${e}`,s)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(s=>{this.log("error","error waiting for auth on connect",s)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(s,i)=>{s!=="disconnected"&&(s=="sent"&&this._setAuthSafely(),e&&e(s,i))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=s=>{this.log("worker","worker error",s.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=s=>{s.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let s;if(e)s=e;else{const i=new Blob([zo],{type:"application/javascript"});s=URL.createObjectURL(i)}return s}_initializeOptions(e){var s,i,r,n,o,a,l,c,d,h,p,u;this.worker=(s=e?.worker)!==null&&s!==void 0?s:!1,this.accessToken=(i=e?.accessToken)!==null&&i!==void 0?i:null;const m={};m.timeout=(r=e?.timeout)!==null&&r!==void 0?r:no,m.heartbeatIntervalMs=(n=e?.heartbeatIntervalMs)!==null&&n!==void 0?n:Ni.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(o=e?.disconnectOnEmptyChannelsAfterMs)!==null&&o!==void 0?o:2*((a=e?.heartbeatIntervalMs)!==null&&a!==void 0?a:Ni.HEARTBEAT_INTERVAL),m.transport=(l=e?.transport)!==null&&l!==void 0?l:eo.getWebSocketConstructor(),m.params=e?.params,m.logger=e?.logger,m.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),m.sessionStorage=(c=e?.sessionStorage)!==null&&c!==void 0?c:Fo(),m.reconnectAfterMs=(d=e?.reconnectAfterMs)!==null&&d!==void 0?d:x=>Lo[x-1]||Bo;let g,f;const y=(h=e?.vsn)!==null&&h!==void 0?h:ro;switch(y){case io:g=(x,b)=>b(JSON.stringify(x)),f=(x,b)=>b(JSON.parse(x));break;case Pr:g=this.serializer.encode.bind(this.serializer),f=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${m.vsn}`)}if(m.vsn=y,m.encode=(p=e?.encode)!==null&&p!==void 0?p:g,m.decode=(u=e?.decode)!==null&&u!==void 0?u:f,m.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,m.params=Object.assign(Object.assign({},m.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e?.workerUrl,m.autoSendHeartbeat=!this.worker}return m}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var bt=class extends Error{constructor(t,e){super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&e.icebergType?.includes("CommitState")===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Go(t,e,s){const i=new URL(e,t);if(s)for(const[r,n]of Object.entries(s))n!==void 0&&i.searchParams.set(r,n);return i.toString()}async function Vo(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Ho(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:s,path:i,query:r,body:n,headers:o}){const a=Go(t.baseUrl,i,r),l=await Vo(t.auth),c=await e(a,{method:s,headers:{...n?{"Content-Type":"application/json"}:{},...l,...o},body:n?JSON.stringify(n):void 0}),d=await c.text(),h=(c.headers.get("content-type")||"").includes("application/json"),p=h&&d?JSON.parse(d):d;if(!c.ok){const u=h?p:void 0,m=u?.error;throw new bt(m?.message??`Request failed with status ${c.status}`,{status:c.status,icebergType:m?.type,icebergCode:m?.code,details:u})}return{status:c.status,headers:c.headers,data:p}}}}function jt(t){return t.join("")}var Wo=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:jt(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(t,e){const s={namespace:t.namespace,properties:e?.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:s})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${jt(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${jt(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${jt(t.namespace)}`}),!0}catch(e){if(e instanceof bt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(s){if(s instanceof bt&&s.status===409)return;throw s}}};function We(t){return t.join("")}var Ko=class{constructor(t,e="",s){this.client=t,this.prefix=e,this.accessDelegation=s}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const s={};return this.accessDelegation&&(s["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables`,body:e,headers:s})).data.metadata}async updateTable(t,e){const s=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":s.data["metadata-location"],metadata:s.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String(e?.purge??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(s){if(s instanceof bt&&s.status===404)return!1;throw s}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(s){if(s instanceof bt&&s.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw s}}},Yo=class{constructor(t){let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const s=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Ho({baseUrl:s,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=t.accessDelegation?.join(","),this.namespaceOps=new Wo(this.client,e),this.tableOps=new Ko(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function wt(t){"@babel/helpers - typeof";return wt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},wt(t)}function Jo(t,e){if(wt(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var i=s.call(t,e);if(wt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Xo(t){var e=Jo(t,"string");return wt(e)=="symbol"?e:e+""}function Qo(t,e,s){return(e=Xo(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function $i(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),s.push.apply(s,i)}return s}function A(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?$i(Object(s),!0).forEach(function(i){Qo(t,i,s[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):$i(Object(s)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(s,i))})}return t}var ps=class extends Error{constructor(t,e="storage",s,i){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=s,this.statusCode=i}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function fs(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Vs=class extends ps{constructor(t,e,s,i="storage",r){super(t,i,e,s),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=s,this.code=r}toJSON(){return A(A({},super.toJSON()),{},{code:this.code})}},Br=class extends ps{constructor(t,e,s="storage"){super(t,s),this.name=s==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function ts(t,e,s){const i=A({},t),r=e.toLowerCase();for(const n of Object.keys(i))n.toLowerCase()===r&&delete i[n];return i[r]=s,i}function Zo(t){const e={};for(const[s,i]of Object.entries(t))e[s.toLowerCase()]=i;return e}const ea=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),ta=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Hs=t=>{if(Array.isArray(t))return t.map(s=>Hs(s));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([s,i])=>{const r=s.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[r]=Hs(i)}),e},sa=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),Ur=t=>t.split("/").map(encodeURIComponent).join("/"),Ri=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const s=e.error;if(typeof s.message=="string")return s.message}}return JSON.stringify(t)},ia=async(t,e,s,i)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const r=t;let n=parseInt(String(r.status),10);Number.isFinite(n)||(n=500),r.json().then(o=>{const a=o?.statusCode||o?.code||n+"";e(new Vs(Ri(o),n,a,i,o?.code))}).catch(()=>{const o=n+"";e(new Vs(r.statusText||`HTTP ${n} error`,n,o,i))})}else e(new Br(Ri(t),t,i))},ra=(t,e,s,i)=>{const r={method:t,headers:e?.headers||{}};if(t==="GET"||t==="HEAD"||!i)return A(A({},r),s);if(ta(i)){var n;const o=e?.headers||{};let a;for(const[l,c]of Object.entries(o))l.toLowerCase()==="content-type"&&(a=c);r.headers=ts(o,"Content-Type",(n=a)!==null&&n!==void 0?n:"application/json"),r.body=JSON.stringify(i)}else r.body=i;return e?.duplex&&(r.duplex=e.duplex),A(A({},r),s)};async function ct(t,e,s,i,r,n,o){return new Promise((a,l)=>{t(s,ra(e,i,r,n)).then(c=>{if(!c.ok)throw c;if(i?.noResolveJson)return c;if(o==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>a(c)).catch(c=>ia(c,l,i,o))})}function Fr(t="storage"){return{get:async(e,s,i,r)=>ct(e,"GET",s,i,r,void 0,t),post:async(e,s,i,r,n)=>ct(e,"POST",s,r,n,i,t),put:async(e,s,i,r,n)=>ct(e,"PUT",s,r,n,i,t),head:async(e,s,i,r)=>ct(e,"HEAD",s,A(A({},i),{},{noResolveJson:!0}),r,void 0,t),remove:async(e,s,i,r,n)=>ct(e,"DELETE",s,r,n,i,t)}}const na=Fr("storage"),{get:xt,post:oe,put:Ws,head:oa,remove:kt}=na,te=Fr("vectors");var nt=class{constructor(t,e={},s,i="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=Zo(e),this.fetch=ea(s),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=ts(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(fs(s))return{data:null,error:s};throw s}}};let zr;zr=Symbol.toStringTag;var aa=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[zr]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(fs(e))return{data:null,error:e};throw e}}};let qr;qr=Symbol.toStringTag;var la=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[qr]="BlobDownloadBuilder",this.promise=null}asStream(){return new aa(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(fs(e))return{data:null,error:e};throw e}}};const ys={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Pi={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var ca=class extends nt{constructor(t,e={},s,i){super(t,e,i,"storage"),this.bucketId=s}async uploadOrUpdate(t,e,s,i){var r=this;return r.handleOperation(async()=>{let n;const o=A(A({},Pi),i);let a=A(A({},r.headers),t==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;if(typeof Blob<"u"&&s instanceof Blob?(n=new FormData,n.append("cacheControl",o.cacheControl),l&&n.append("metadata",r.encodeMetadata(l)),n.append("",s)):typeof FormData<"u"&&s instanceof FormData?(n=s,n.has("cacheControl")||n.append("cacheControl",o.cacheControl),l&&!n.has("metadata")&&n.append("metadata",r.encodeMetadata(l))):(n=s,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=r.toBase64(r.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!o.duplex&&(o.duplex="half")),i?.headers)for(const[p,u]of Object.entries(i.headers))a=ts(a,p,u);const c=r._removeEmptyFolders(e),d=r._getFinalPath(c),h=await(t=="PUT"?Ws:oe)(r.fetch,`${r.url}/object/${d}`,n,A({headers:a},o?.duplex?{duplex:o.duplex}:{}));return{path:c,id:h.Id,fullPath:h.Key}})}async upload(t,e,s){return this.uploadOrUpdate("POST",t,e,s)}async uploadToSignedUrl(t,e,s,i){var r=this;const n=r._removeEmptyFolders(t),o=r._getFinalPath(n),a=new URL(r.url+`/object/upload/sign/${o}`);return a.searchParams.set("token",e),r.handleOperation(async()=>{let l;const c=A(A({},Pi),i);let d=A(A({},r.headers),{"x-upsert":String(c.upsert)});const h=c.metadata;if(typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),h&&l.append("metadata",r.encodeMetadata(h)),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),h&&!l.has("metadata")&&l.append("metadata",r.encodeMetadata(h))):(l=s,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,h&&(d["x-metadata"]=r.toBase64(r.encodeMetadata(h))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),i?.headers)for(const[p,u]of Object.entries(i.headers))d=ts(d,p,u);return{path:n,fullPath:(await Ws(r.fetch,a.toString(),l,A({headers:d},c?.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var s=this;return s.handleOperation(async()=>{let i=s._getFinalPath(t);const r=A({},s.headers);e?.upsert&&(r["x-upsert"]="true");const n=await oe(s.fetch,`${s.url}/object/upload/sign/${i}`,{},{headers:r}),o=new URL(s.url+n.url),a=o.searchParams.get("token");if(!a)throw new ps("No token returned by API");return{signedUrl:o.toString(),path:t,token:a}})}async update(t,e,s){return this.uploadOrUpdate("PUT",t,e,s)}async move(t,e,s){var i=this;return i.handleOperation(async()=>await oe(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:s?.destinationBucket},{headers:i.headers}))}async copy(t,e,s){var i=this;return i.handleOperation(async()=>({path:(await oe(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:s?.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(t,e,s){var i=this;return i.handleOperation(async()=>{let r=i._getFinalPath(t);const n=typeof s?.transform=="object"&&s.transform!==null&&Object.keys(s.transform).length>0;let o=await oe(i.fetch,`${i.url}/object/sign/${r}`,A({expiresIn:e},n?{transform:s.transform}:{}),{headers:i.headers});const a=new URLSearchParams;s?.download&&a.set("download",s.download===!0?"":s.download),s?.cacheNonce!=null&&a.set("cacheNonce",String(s.cacheNonce));const l=a.toString();return{signedUrl:encodeURI(`${i.url}${o.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,s){var i=this;return i.handleOperation(async()=>{const r=await oe(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:t},{headers:i.headers}),n=new URLSearchParams;s?.download&&n.set("download",s.download===!0?"":s.download),s?.cacheNonce!=null&&n.set("cacheNonce",String(s.cacheNonce));const o=n.toString();return r.map(a=>A(A({},a),{},{signedUrl:a.signedURL?encodeURI(`${i.url}${a.signedURL}${o?`&${o}`:""}`):null}))})}download(t,e,s){const i=typeof e?.transform=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",r=new URLSearchParams;e?.transform&&this.applyTransformOptsToQuery(r,e.transform),e?.cacheNonce!=null&&r.set("cacheNonce",String(e.cacheNonce));const n=r.toString(),o=this._getFinalPath(t),a=()=>xt(this.fetch,`${this.url}/${i}/${o}${n?`?${n}`:""}`,{headers:this.headers,noResolveJson:!0},s);return new la(a,this.shouldThrowOnError)}async info(t){var e=this;const s=e._getFinalPath(t);return e.handleOperation(async()=>Hs(await xt(e.fetch,`${e.url}/object/info/${s}`,{headers:e.headers})))}async exists(t){var e=this;const s=e._getFinalPath(t);try{return await oa(e.fetch,`${e.url}/object/${s}`,{headers:e.headers}),{data:!0,error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(fs(r)){var i;const n=r instanceof Vs?r.status:r instanceof Br?(i=r.originalError)===null||i===void 0?void 0:i.status:void 0;if(n!==void 0&&[400,404].includes(n))return{data:!1,error:r}}throw r}}getPublicUrl(t,e){const s=this._getFinalPath(t),i=new URLSearchParams;e?.download&&i.set("download",e.download===!0?"":e.download),e?.transform&&this.applyTransformOptsToQuery(i,e.transform),e?.cacheNonce!=null&&i.set("cacheNonce",String(e.cacheNonce));const r=i.toString(),n=typeof e?.transform=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${s}`)+(r?`?${r}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await kt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,s){var i=this;return i.handleOperation(async()=>{const r=Ur(i._getFinalPath(t)),n=new URLSearchParams;e?.transformations&&n.set("transformations","true");const o=n.toString();return await kt(i.fetch,`${i.url}/cdn/${r}${o?`?${o}`:""}`,{},{headers:i.headers},s)})}async list(t,e,s){var i=this;return i.handleOperation(async()=>{const r=e?.sortBy?A(A({},ys.sortBy),e.sortBy):ys.sortBy,n=A(A(A({},ys),e),{},{sortBy:r,prefix:t||""});return await oe(i.fetch,`${i.url}/object/list/${i.bucketId}`,n,{headers:i.headers},s)})}async listV2(t,e){var s=this;return s.handleOperation(async()=>{const i=A({},t);return await oe(s.fetch,`${s.url}/object/list-v2/${s.bucketId}`,i,{headers:s.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const ha="2.112.3",Rt={"X-Client-Info":`storage-js/${ha}`};var da=class extends nt{constructor(t,e={},s,i){const r=new URL(t);i?.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase."));const n=r.href.replace(/\/$/,""),o=A(A({},Rt),e);super(n,o,s,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const s=e.listBucketOptionsToQueryString(t);return await xt(e.fetch,`${e.url}/bucket${s}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await xt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var s=this;return s.handleOperation(async()=>await oe(s.fetch,`${s.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:s.headers}))}async updateBucket(t,e){var s=this;return s.handleOperation(async()=>await Ws(s.fetch,`${s.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:s.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await oe(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await kt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,s){var i=this;return i.handleOperation(async()=>{const r=new URLSearchParams;e?.transformations&&r.set("transformations","true");const n=r.toString();return await kt(i.fetch,`${i.url}/cdn/${Ur(t)}${n?`?${n}`:""}`,{},{headers:i.headers},s)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},ua=class extends nt{constructor(t,e={},s){const i=t.replace(/\/$/,""),r=A(A({},Rt),e);super(i,r,s,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await oe(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const s=new URLSearchParams;t?.limit!==void 0&&s.set("limit",t.limit.toString()),t?.offset!==void 0&&s.set("offset",t.offset.toString()),t?.sortColumn&&s.set("sortColumn",t.sortColumn),t?.sortOrder&&s.set("sortOrder",t.sortOrder),t?.search&&s.set("search",t.search);const i=s.toString(),r=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await xt(e.fetch,r,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await kt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!sa(t))throw new ps("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const s=new Yo({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(s,{get(r,n){const o=r[n];return typeof o!="function"?o:async(...a)=>{try{return{data:await o.apply(r,a),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},pa=class extends nt{constructor(t,e={},s){const i=t.replace(/\/$/,""),r=A(A({},Rt),{},{"Content-Type":"application/json"},e);super(i,r,s,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var s=this;return s.handleOperation(async()=>await te.post(s.fetch,`${s.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:s.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var s=this;return s.handleOperation(async()=>await te.post(s.fetch,`${s.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:s.headers})||{})}},fa=class extends nt{constructor(t,e={},s){const i=t.replace(/\/$/,""),r=A(A({},Rt),{},{"Content-Type":"application/json"},e);super(i,r,s,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},ga=class extends nt{constructor(t,e={},s){const i=t.replace(/\/$/,""),r=A(A({},Rt),{},{"Content-Type":"application/json"},e);super(i,r,s,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await te.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},ma=class extends ga{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new va(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,s=this;return e().call(s,t)}async getBucket(t){var e=()=>super.getBucket,s=this;return e().call(s,t)}async listBuckets(t={}){var e=()=>super.listBuckets,s=this;return e().call(s,t)}async deleteBucket(t){var e=()=>super.deleteBucket,s=this;return e().call(s,t)}},va=class extends pa{constructor(t,e,s,i){super(t,e,i),this.vectorBucketName=s}async createIndex(t){var e=()=>super.createIndex,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,s=this;return e().call(s,s.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,s=this;return e().call(s,s.vectorBucketName,t)}index(t){return new ya(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},ya=class extends fa{constructor(t,e,s,i,r){super(t,e,r),this.vectorBucketName=s,this.indexName=i}async putVectors(t){var e=()=>super.putVectors,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async getVectors(t){var e=()=>super.getVectors,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,s=this;return e().call(s,A(A({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}},ba=class extends da{constructor(t,e={},s,i){super(t,e,s,i)}from(t){return new ca(this.url,this.headers,t,this.fetch)}get vectors(){return new ma(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new ua(this.url+"/iceberg",this.headers,this.fetch)}};const Gr="2.112.3",_e=30*1e3,ut=3,bs=ut*_e,wa=2*_e,xa="http://localhost:9999",ka="supabase.auth.token",_a={"X-Client-Info":`gotrue-js/${Gr}`},Ks="X-Supabase-Api-Version",Vr={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Sa=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ue="sb_flow_id",Ta=5,Aa=10*60*1e3;class _t extends Error{constructor(e,s,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=s,this.code=i}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function _(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class Ea extends _t{constructor(e,s,i){super(e,s,i),this.name="AuthApiError",this.status=s,this.code=i}}function Mi(t){return _(t)&&t.name==="AuthApiError"}class ae extends _t{constructor(e,s){super(e),this.name="AuthUnknownError",this.originalError=s}}class me extends _t{constructor(e,s,i,r){super(e,i,r),this.name=s,this.status=i}}class G extends me{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Lt(t){return _(t)&&t.name==="AuthSessionMissingError"}class Ke extends me{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Bt extends me{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ut extends me{constructor(e,s=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function Ia(t){return _(t)&&t.name==="AuthImplicitGrantRedirectError"}class Di extends me{constructor(e,s=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class Ca extends me{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ht extends me{constructor(e,s){super(e,"AuthRetryableFetchError",s,void 0)}}function Ft(t){return _(t)&&t.name==="AuthRetryableFetchError"}class ji extends me{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function Oa(t){return _(t)&&t.name==="AuthRefreshDiscardedError"}class Li extends me{constructor(e,s,i){super(e,"AuthWeakPasswordError",s,"weak_password"),this.reasons=i}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class ss extends me{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const is="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Bi=` 	
\r=`.split(""),Na=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Bi.length;e+=1)t[Bi[e].charCodeAt(0)]=-2;for(let e=0;e<is.length;e+=1)t[is[e].charCodeAt(0)]=e;return t})();function Ui(t,e,s){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;s(is[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;s(is[i]),e.queuedBits-=6}}function Hr(t,e,s){const i=Na[t];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)s(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function Fi(t){const e=[],s=o=>{e.push(String.fromCodePoint(o))},i={utf8seq:0,codepoint:0},r={queue:0,queuedBits:0},n=o=>{Pa(o,i,s)};for(let o=0;o<t.length;o+=1)Hr(t.charCodeAt(o),r,n);return e.join("")}function $a(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function Ra(t,e){for(let s=0;s<t.length;s+=1){let i=t.charCodeAt(s);if(i>55295&&i<=56319){const r=(i-55296)*1024&65535;i=(t.charCodeAt(s+1)-56320&65535|r)+65536,s+=1}$a(i,e)}}function Pa(t,e,s){if(e.utf8seq===0){if(t<=127){s(t);return}for(let i=1;i<6;i+=1)if(!(t>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&s(e.codepoint)}}function tt(t){const e=[],s={queue:0,queuedBits:0},i=r=>{e.push(r)};for(let r=0;r<t.length;r+=1)Hr(t.charCodeAt(r),s,i);return new Uint8Array(e)}function Ma(t){const e=[];return Ra(t,s=>e.push(s)),new Uint8Array(e)}function Fe(t){const e=[],s={queue:0,queuedBits:0},i=r=>{e.push(r)};return t.forEach(r=>Ui(r,s,i)),Ui(null,s,i),e.join("")}function Da(t){return Math.round(Date.now()/1e3)+t}function ja(){return Symbol("auth-callback")}const H=()=>typeof window<"u"&&typeof document<"u",De={tested:!1,writable:!1},Wr=()=>{if(!H())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(De.tested)return De.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),De.tested=!0,De.writable=!0}catch{De.tested=!0,De.writable=!1}return De.writable};function zi(t){const e={},s=new URL(t);if(s.hash&&s.hash[0]==="#")try{new URLSearchParams(s.hash.substring(1)).forEach((r,n)=>{e[n]=r})}catch{}return s.searchParams.forEach((i,r)=>{e[r]=i}),e}const Kr=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),La=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",Se=async(t,e,s)=>{await t.setItem(e,JSON.stringify(s))},W=async(t,e)=>{const s=await t.getItem(e);if(!s)return null;try{return JSON.parse(s)}catch{return null}},Q=async(t,e)=>{await t.removeItem(e)};class gs{constructor(){this.promise=new gs.promiseConstructor((e,s)=>{this.resolve=e,this.reject=s})}}gs.promiseConstructor=Promise;function zt(t){const e=t.split(".");if(e.length!==3)throw new ss("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!Sa.test(e[i]))throw new ss("JWT not in base64url format");return{header:JSON.parse(Fi(e[0])),payload:JSON.parse(Fi(e[1])),signature:tt(e[2]),raw:{header:e[0],payload:e[1]}}}async function Ba(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function Ua(t,e){return new Promise((i,r)=>{(async()=>{for(let n=0;n<1/0;n++)try{const o=await t(n);if(!e(n,null,o)){i(o);return}}catch(o){if(!e(n,o)){r(o);return}}})()})}function Yr(t){return("0"+t.toString(16)).substr(-2)}function Fa(){const e=new Uint32Array(56);if(typeof crypto>"u"){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=s.length;let r="";for(let n=0;n<56;n++)r+=s.charAt(Math.floor(Math.random()*i));return r}return crypto.getRandomValues(e),Array.from(e,Yr).join("")}async function za(t){const s=new TextEncoder().encode(t),i=await crypto.subtle.digest("SHA-256",s),r=new Uint8Array(i);return Array.from(r).map(n=>String.fromCharCode(n)).join("")}async function qa(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const s=await za(t);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Ga=/^[a-zA-Z0-9_-]{8,64}$/;function Wt(t){return typeof t=="string"&&Ga.test(t)?t:null}function Va(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Yr).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const st=(t,e)=>`${t}-flow-${e}-code-verifier`,St=t=>`${t}-flows-code-verifier`;async function li(t,e){const s=await W(t,St(e));return Array.isArray(s)?s.filter(i=>Wt(i)!==null):[]}async function Ha(t,e,s,i,r){await Se(t,st(e,s),i);const n=(await li(t,e)).filter(o=>o!==s);for(n.push(s);n.length>Ta;){const o=n.shift();await Q(t,st(e,o)),r?.(o)}await Se(t,St(e),n),await Se(t,`${e}-code-verifier`,i)}async function Wa(t,e,s){if(s){const r=await W(t,st(e,s));return{verifier:typeof r=="string"?r:null,flowId:s}}const i=await W(t,`${e}-code-verifier`);return{verifier:typeof i=="string"?i:null,flowId:null}}async function re(t,e,s){const i=`${e}-code-verifier`;if(!s){await Q(t,i);return}const r=st(e,s),n=await W(t,r);await Q(t,r);const o=await li(t,e),a=o.filter(l=>l!==s);a.length!==o.length&&(a.length>0?await Se(t,St(e),a):await Q(t,St(e))),n!=null&&n===await W(t,i)&&await Q(t,i)}async function Ka(t,e){const s=await li(t,e);for(const i of s)await Q(t,st(e,i));await Q(t,St(e)),await Q(t,`${e}-code-verifier`)}function Ya(t,e){const s=t.indexOf("#");let i=s===-1?t:t.slice(0,s);const r=s===-1?"":t.slice(s),n=i.indexOf("?");if(n!==-1){const a=i.slice(0,n),l=i.slice(n+1).split("&").filter(c=>c!==""&&c!==Ue&&!c.startsWith(`${Ue}=`));i=l.length>0?`${a}?${l.join("&")}`:a}const o=i.includes("?")?"&":"?";return`${i}${o}${Ue}=${encodeURIComponent(e)}${r}`}async function Ja(t,e,s=!1,i){const r=Fa();let n=r;s&&(n+="/recovery");const o=Va();await Ha(t,e,o,n,i);const a=await qa(r);return[a,r===a?"plain":"s256",o]}const Xa=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Qa(t){const e=t.headers.get(Ks);if(!e||!e.match(Xa))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Za(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function el(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const tl=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function be(t){if(!tl.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function ne(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function ws(){const t={};return new Proxy(t,{get:(e,s)=>{if(s==="__isUserNotAvailableProxy")return!0;if(typeof s=="symbol"){const i=s.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${s}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,s)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${s}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,s)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${s}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function sl(t,e){return new Proxy(t,{get:(s,i,r)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const n=i.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(s,i,r)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(s,i,r)}})}function qi(t){return JSON.parse(JSON.stringify(t))}const Le=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},Gi=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Vi(t){var e;if(!La(t))throw new Ht(Le(t),0);let s;try{s=await t.json()}catch(n){throw Gi.includes(t.status)?new Ht(t.statusText||`HTTP ${t.status}`,t.status):new ae(Le(n),n)}if(Gi.includes(t.status))throw new Ht(Le(s),t.status);let i;const r=Qa(t);if(r&&r.getTime()>=Vr["2024-01-01"].timestamp&&typeof s=="object"&&s&&typeof s.code=="string"?i=s.code:typeof s=="object"&&s&&typeof s.error_code=="string"&&(i=s.error_code),i){if(i==="weak_password")throw new Li(Le(s),t.status,((e=s.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new G}else if(typeof s=="object"&&s&&typeof s.weak_password=="object"&&s.weak_password&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.reasons.reduce((n,o)=>n&&typeof o=="string",!0))throw new Li(Le(s),t.status,s.weak_password.reasons);throw new Ea(Le(s),t.status||500,i)}const il=(t,e,s,i)=>{const r={method:t,headers:e?.headers||{}};return t==="GET"?r:(r.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e?.headers),r.body=JSON.stringify(i),Object.assign(Object.assign({},r),s))};async function S(t,e,s,i){var r;const n=Object.assign({},i?.headers);n[Ks]||(n[Ks]=Vr["2024-01-01"].name),i?.jwt&&(n.Authorization=`Bearer ${i.jwt}`);const o=(r=i?.query)!==null&&r!==void 0?r:{};i?.redirectTo&&(o.redirect_to=i.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await rl(t,e,s+a,{headers:n,noResolveJson:i?.noResolveJson},{},i?.body);return i?.xform?i?.xform(l):{data:Object.assign({},l),error:null}}async function rl(t,e,s,i,r,n){const o=il(e,i,r,n);let a;try{a=await t(s,Object.assign({},o))}catch(l){throw new Ht(Le(l),0)}if(a.ok||await Vi(a),i?.noResolveJson)return a;try{return await a.json()}catch(l){await Vi(l)}}function se(t){var e;let s=null;al(t)&&(s=Object.assign({},t),t.expires_at||(s.expires_at=Da(t.expires_in)));const i=(e=t.user)!==null&&e!==void 0?e:typeof t?.id=="string"?t:null;return{data:{session:s,user:i},error:null}}function Hi(t){const e=se(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((s,i)=>s&&typeof i=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Ne(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function nl(t){return{data:t,error:null}}function ol(t){const{action_link:e,email_otp:s,hashed_token:i,redirect_to:r,verification_type:n}=t,o=us(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:s,hashed_token:i,redirect_to:r,verification_type:n},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Wi(t){return t}function al(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const xs=["global","local","others"];class ll{constructor({url:e="",headers:s={},fetch:i,experimental:r}){this.url=e,this.headers=s,this.fetch=Kr(i),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,s=xs[0]){if(xs.indexOf(s)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${xs.join(", ")}`);try{return await S(this.fetch,"POST",`${this.url}/logout?scope=${s}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(_(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,s={}){try{return await S(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:s.data},headers:this.headers,redirectTo:s.redirectTo,xform:Ne})}catch(i){if(_(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:s}=e,i=us(e,["options"]),r=Object.assign(Object.assign({},i),s);return"newEmail"in i&&(r.new_email=i?.newEmail,delete r.newEmail),await S(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:ol,redirectTo:s?.redirectTo})}catch(s){if(_(s))return{data:{properties:null,user:null},error:s};throw s}}async createUser(e){try{return await S(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ne})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async listUsers(e){var s,i,r,n,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},d=await S(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(s=e?.page)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:"",per_page:(n=(r=e?.perPage)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:""},xform:Wi});if(d.error)throw d.error;const h=await d.json(),p=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,u=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),f=JSON.parse(m.split(";")[1].split("=")[1]);c[`${f}Page`]=g}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(_(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){be(e);try{return await S(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ne})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async updateUserById(e,s){be(e);try{return await S(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:s,headers:this.headers,xform:Ne})}catch(i){if(_(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,s=!1){be(e);try{return await S(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:s},xform:Ne})}catch(i){if(_(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){be(e.userId);try{const{data:s,error:i}=await S(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:r=>({data:{factors:r},error:null})});return{data:s,error:i}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _deleteFactor(e){be(e.userId),be(e.id);try{return{data:await S(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _listOAuthClients(e){var s,i,r,n,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},d=await S(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(s=e?.page)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:"",per_page:(n=(r=e?.perPage)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:""},xform:Wi});if(d.error)throw d.error;const h=await d.json(),p=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,u=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),f=JSON.parse(m.split(";")[1].split("=")[1]);c[`${f}Page`]=g}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(_(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await S(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _getOAuthClient(e){try{return await S(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _updateOAuthClient(e,s){try{return await S(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:s,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(_(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await S(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _regenerateOAuthClientSecret(e){try{return await S(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _listCustomProviders(e){try{const s={};return e?.type&&(s.type=e.type),await S(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:s,xform:i=>{var r;return{data:{providers:(r=i?.providers)!==null&&r!==void 0?r:[]},error:null}}})}catch(s){if(_(s))return{data:{providers:[]},error:s};throw s}}async _createCustomProvider(e){try{return await S(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _getCustomProvider(e){try{return await S(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _updateCustomProvider(e,s){try{return await S(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:s,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(_(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await S(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _adminListPasskeys(e){ne(this.experimental),be(e.userId);try{return await S(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _adminDeletePasskey(e){ne(this.experimental),be(e.userId),be(e.passkeyId);try{return await S(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}}function Ki(t={}){return{getItem:e=>t[e]||null,setItem:(e,s)=>{t[e]=s},removeItem:e=>{delete t[e]}}}globalThis&&Wr()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class cl extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function hl(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Jr(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function dl(t){return parseInt(t,16)}function ul(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function pl(t){var e;const{chainId:s,domain:i,expirationTime:r,issuedAt:n=new Date,nonce:o,notBefore:a,requestId:l,resources:c,scheme:d,uri:h,version:p}=t;{if(!Number.isInteger(s))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${s}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!h)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const u=Jr(t.address),m=d?`${d}://${i}`:i,g=t.statement?`${t.statement}
`:"",f=`${m} wants you to sign in with your Ethereum account:
${u}

${g}`;let y=`URI: ${h}
Version: ${p}
Chain ID: ${s}${o?`
Nonce: ${o}`:""}
Issued At: ${n.toISOString()}`;if(r&&(y+=`
Expiration Time: ${r.toISOString()}`),a&&(y+=`
Not Before: ${a.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let x=`
Resources:`;for(const b of c){if(!b||typeof b!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);x+=`
- ${b}`}y+=x}return`${f}
${y}`}class q extends Error{constructor({message:e,code:s,cause:i,name:r}){var n;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(n=r??(i instanceof Error?i.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=s}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class rs extends q{constructor(e,s){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s,message:e}),this.name="WebAuthnUnknownError",this.originalError=s}}function fl({error:t,options:e}){var s,i,r;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((s=n.authenticatorSelection)===null||s===void 0?void 0:s.requireResidentKey)===!0)return new q({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((i=n.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new q({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((r=n.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new q({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new q({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return n.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new q({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new q({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const o=window.location.hostname;if(Xr(o)){if(n.rp.id!==o)return new q({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new q({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function gl({error:t,options:e}){const{publicKey:s}=e;if(!s)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const i=window.location.hostname;if(Xr(i)){if(s.rpId!==i)return new q({message:`The RP ID "${s.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class ml{createNewAbortSignal(){if(this.controller){const s=new Error("Cancelling existing WebAuthn API call for new one");s.name="AbortError",this.controller.abort(s)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Ys=new ml;function Yi(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:s,excludeCredentials:i}=t,r=us(t,["challenge","user","excludeCredentials"]),n=tt(e).buffer,o=Object.assign(Object.assign({},s),{id:tt(s.id).buffer}),a=Object.assign(Object.assign({},r),{challenge:n,user:o});if(i&&i.length>0){a.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];a.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:tt(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return a}function Ji(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:s}=t,i=us(t,["challenge","allowCredentials"]),r=tt(e).buffer,n=Object.assign(Object.assign({},i),{challenge:r});if(s&&s.length>0){n.allowCredentials=new Array(s.length);for(let o=0;o<s.length;o++){const a=s[o];n.allowCredentials[o]=Object.assign(Object.assign({},a),{id:tt(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return n}function Xi(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const s=t;return{id:t.id,rawId:t.id,response:{attestationObject:Fe(new Uint8Array(t.response.attestationObject)),clientDataJSON:Fe(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=s.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Qi(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const s=t,i=t.getClientExtensionResults(),r=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:Fe(new Uint8Array(r.authenticatorData)),clientDataJSON:Fe(new Uint8Array(r.clientDataJSON)),signature:Fe(new Uint8Array(r.signature)),userHandle:r.userHandle?Fe(new Uint8Array(r.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=s.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Xr(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function ns(){var t,e;return!!(H()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator?.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator?.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Qr(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new rs("Browser returned unexpected credential type",e)}:{data:null,error:new rs("Empty credential response",e)}}catch(e){return{data:null,error:fl({error:e,options:t})}}}async function Zr(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new rs("Browser returned unexpected credential type",e)}:{data:null,error:new rs("Empty credential response",e)}}catch(e){return{data:null,error:gl({error:e,options:t})}}}const vl={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},yl={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function os(...t){const e=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),s=r=>r instanceof ArrayBuffer||ArrayBuffer.isView(r),i={};for(const r of t)if(r)for(const n in r){const o=r[n];if(o!==void 0)if(Array.isArray(o))i[n]=o;else if(s(o))i[n]=o;else if(e(o)){const a=i[n];e(a)?i[n]=os(a,o):i[n]=os(o)}else i[n]=o}return i}function bl(t,e){return os(vl,t,e||{})}function wl(t,e){return os(yl,t,e||{})}class xl{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:s,friendlyName:i,signal:r},n){var o;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:s});if(!a)return{data:null,error:l};const c=r??Ys.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:d}=a.webauthn.credential_options.publicKey;if(!d.name){const h=i;if(h)d.name=`${d.id}:${h}`;else{const u=(await this.client.getUser()).data.user,m=((o=u?.user_metadata)===null||o===void 0?void 0:o.name)||u?.email||u?.id||"User";d.name=`${d.id}:${m}`}}d.displayName||(d.displayName=d.name)}switch(a.webauthn.type){case"create":{const d=bl(a.webauthn.credential_options.publicKey,n?.create),{data:h,error:p}=await Qr({publicKey:d,signal:c});return h?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:h}},error:null}:{data:null,error:p}}case"request":{const d=wl(a.webauthn.credential_options.publicKey,n?.request),{data:h,error:p}=await Zr(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:d,signal:c}));return h?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:h}},error:null}:{data:null,error:p}}}}catch(a){return _(a)?{data:null,error:a}:{data:null,error:new ae("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:s,webauthn:i}){return this.client.mfa.verify({factorId:s,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:s=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},n){if(!s)return{data:null,error:new _t("rpId is required for WebAuthn authentication")};try{if(!ns())return{data:null,error:new ae("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this.challenge({factorId:e,webauthn:{rpId:s,rpOrigins:i},signal:r},{request:n});if(!o)return{data:null,error:a};const{webauthn:l}=o;return this._verify({factorId:e,challengeId:o.challengeId,webauthn:{type:l.type,rpId:s,rpOrigins:i,credential_response:l.credential_response}})}catch(o){return _(o)?{data:null,error:o}:{data:null,error:new ae("Unexpected error in authenticate",o)}}}async _register({friendlyName:e,webauthn:{rpId:s=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},n){if(!s)return{data:null,error:new _t("rpId is required for WebAuthn registration")};try{if(!ns())return{data:null,error:new ae("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this._enroll({friendlyName:e});if(!o)return await this.client.mfa.listFactors().then(d=>{var h;return(h=d.data)===null||h===void 0?void 0:h.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===e&&p.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d?.id}):void 0),{data:null,error:a};const{data:l,error:c}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:s,rpOrigins:i},signal:r},{create:n});return l?this._verify({factorId:o.id,challengeId:l.challengeId,webauthn:{rpId:s,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(o){return _(o)?{data:null,error:o}:{data:null,error:new ae("Unexpected error in register",o)}}}}hl();const kl={url:xa,storageKey:ka,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:_a,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},Ye={};class Tt{get jwks(){var e,s;return(s=(e=Ye[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&s!==void 0?s:{keys:[]}}set jwks(e){Ye[this.storageKey]=Object.assign(Object.assign({},Ye[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,s;return(s=(e=Ye[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&s!==void 0?s:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Ye[this.storageKey]=Object.assign(Object.assign({},Ye[this.storageKey]),{cachedAt:e})}constructor(e){var s,i,r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},kl),e);if(this.storageKey=n.storageKey,this.instanceID=(s=Tt.nextInstanceID[this.storageKey])!==null&&s!==void 0?s:0,Tt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&H()){const o=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(o),this.logDebugMessages&&console.trace(o)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.experimental=(i=n.experimental)!==null&&i!==void 0?i:{},this.admin=new ll({url:n.url,headers:n.headers,fetch:n.fetch,experimental:this.experimental}),this.url=n.url,this.headers=n.headers,this.fetch=Kr(n.fetch),this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,this.lockAcquireTimeout=n.lockAcquireTimeout,n.lock!=null&&(this.lock=n.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new xl(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:Wr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Ki(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=Ki(this.memoryStorage)),H()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(o){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",o)}(r=this.broadcastChannel)===null||r===void 0||r.addEventListener("message",async o=>{this._debug("received broadcast notification from other tab or client",o),(o.data.event==="TOKEN_REFRESHED"||o.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(o.data.event,o.data.session,!1)}catch(a){this._debug("#broadcastChannel","error",a)}})}n.skipAutoInitialize||this.initialize().catch(o=>{this._debug("#initialize()","error",o)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Gr}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const s=await this.initializePromise,i=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const r of i)await this._notifyAllSubscribers(r.event,r.session,r.broadcast);return s}async _initialize(){var e;try{let s={},i="none";if(H()&&(s=zi(window.location.href),this._isImplicitGrantCallback(s)?i="implicit":await this._isPKCECallback(s)&&(i="pkce")),H()&&this.detectSessionInUrl&&i!=="none"){const{data:r,error:n}=await this._getSessionFromURL(s,i);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Ia(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return{error:n}}const{session:o,redirectType:a}=r;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(s){return _(s)?this._returnResult({error:s}):this._returnResult({error:new ae("Unexpected error during initialization",s)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var s,i,r;try{const n=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(s=e?.options)===null||s===void 0?void 0:s.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(r=e?.options)===null||r===void 0?void 0:r.captchaToken}},xform:se}),{data:o,error:a}=n;if(a||!o)return this._returnResult({data:{user:null,session:null},error:a});const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(_(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var s,i,r;let n=null;try{let o;if("email"in e){const{email:h,password:p,options:u}=e;let m=null,g=null;this.flowType==="pkce"&&([m,g,n]=await this._getCodeChallengeAndMethod()),o=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(u?.emailRedirectTo,n),body:{email:h,password:p,data:(s=u?.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:u?.captchaToken},code_challenge:m,code_challenge_method:g},xform:se})}else if("phone"in e){const{phone:h,password:p,options:u}=e;o=await S(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:p,data:(i=u?.data)!==null&&i!==void 0?i:{},channel:(r=u?.channel)!==null&&r!==void 0?r:"sms",gotrue_meta_security:{captcha_token:u?.captchaToken}},xform:se})}else throw new Bt("You must provide either an email or phone number and a password");const{data:a,error:l}=o;if(l||!a)return await re(this.storage,this.storageKey,n),this._returnResult({data:{user:null,session:null},error:l});const c=a.session,d=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(o){if(await re(this.storage,this.storageKey,n),_(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signInWithPassword(e){try{let s;if("email"in e){const{email:n,password:o,options:a}=e;s=await S(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:Hi})}else if("phone"in e){const{phone:n,password:o,options:a}=e;s=await S(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:Hi})}else throw new Bt("You must provide either an email or phone number and a password");const{data:i,error:r}=s;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!i||!i.session||!i.user){const n=new Ke;return this._returnResult({data:{user:null,session:null},error:n})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:r})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithOAuth(e){var s,i,r,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(s=e.options)===null||s===void 0?void 0:s.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(r=e.options)===null||r===void 0?void 0:r.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e,s){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,s)):this._exchangeCodeForSession(e,s)}async signInWithWeb3(e){const{chain:s}=e;switch(s){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${s}"`)}}async signInWithEthereum(e){var s,i,r,n,o,a,l,c,d,h,p;let u,m;if("message"in e)u=e.message,m=e.signature;else{const{chain:g,wallet:f,statement:y,options:x}=e;let b;if(H())if(typeof f=="object")b=f;else{const k=window;if("ethereum"in k&&typeof k.ethereum=="object"&&"request"in k.ethereum&&typeof k.ethereum.request=="function")b=k.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof f!="object"||!x?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");b=f}const T=new URL((s=x?.url)!==null&&s!==void 0?s:window.location.href),$=await b.request({method:"eth_requestAccounts"}).then(k=>k).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!$||$.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const I=Jr($[0]);let R=(i=x?.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!R){const k=await b.request({method:"eth_chainId"});R=dl(k)}const ue={domain:T.host,address:I,statement:y,uri:T.href,version:"1",chainId:R,nonce:(r=x?.signInWithEthereum)===null||r===void 0?void 0:r.nonce,issuedAt:(o=(n=x?.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(a=x?.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=x?.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=x?.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=x?.signInWithEthereum)===null||d===void 0?void 0:d.resources};u=pl(ue),m=await b.request({method:"personal_sign",params:[ul(u),I]})}try{const{data:g,error:f}=await S(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:u,signature:m},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:se});if(f)throw f;if(!g||!g.session||!g.user){const y=new Ke;return this._returnResult({data:{user:null,session:null},error:y})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:f})}catch(g){if(_(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var s,i,r,n,o,a,l,c,d,h,p,u;let m,g;if("message"in e)m=e.message,g=e.signature;else{const{chain:f,wallet:y,statement:x,options:b}=e;let T;if(H())if(typeof y=="object")T=y;else{const I=window;if("solana"in I&&typeof I.solana=="object"&&("signIn"in I.solana&&typeof I.solana.signIn=="function"||"signMessage"in I.solana&&typeof I.solana.signMessage=="function"))T=I.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!b?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");T=y}const $=new URL((s=b?.url)!==null&&s!==void 0?s:window.location.href);if("signIn"in T&&T.signIn){const I=await T.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},b?.signInWithSolana),{version:"1",domain:$.host,uri:$.href}),x?{statement:x}:null));let R;if(Array.isArray(I)&&I[0]&&typeof I[0]=="object")R=I[0];else if(I&&typeof I=="object"&&"signedMessage"in I&&"signature"in I)R=I;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in R&&"signature"in R&&(typeof R.signedMessage=="string"||R.signedMessage instanceof Uint8Array)&&R.signature instanceof Uint8Array)m=typeof R.signedMessage=="string"?R.signedMessage:new TextDecoder().decode(R.signedMessage),g=R.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in T)||typeof T.signMessage!="function"||!("publicKey"in T)||typeof T!="object"||!T.publicKey||!("toBase58"in T.publicKey)||typeof T.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${$.host} wants you to sign in with your Solana account:`,T.publicKey.toBase58(),...x?["",x,""]:[""],"Version: 1",`URI: ${$.href}`,`Issued At: ${(r=(i=b?.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&r!==void 0?r:new Date().toISOString()}`,...!((n=b?.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${b.signInWithSolana.notBefore}`]:[],...!((o=b?.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${b.signInWithSolana.expirationTime}`]:[],...!((a=b?.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${b.signInWithSolana.chainId}`]:[],...!((l=b?.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${b.signInWithSolana.nonce}`]:[],...!((c=b?.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${b.signInWithSolana.requestId}`]:[],...!((h=(d=b?.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||h===void 0)&&h.length?["Resources",...b.signInWithSolana.resources.map(R=>`- ${R}`)]:[]].join(`
`);const I=await T.signMessage(new TextEncoder().encode(m),"utf8");if(!I||!(I instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=I}}try{const{data:f,error:y}=await S(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:Fe(g)},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:se});if(y)throw y;if(!f||!f.session||!f.user){const x=new Ke;return this._returnResult({data:{user:null,session:null},error:x})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:y})}catch(f){if(_(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async _exchangeCodeForSession(e,s){const i=s?.flowId!=null,r=i?Wt(s?.flowId):H()?Wt(zi(window.location.href)[Ue]):null;i&&!r&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",s?.flowId);const{verifier:n,flowId:o}=i&&!r?{verifier:null,flowId:null}:await Wa(this.storage,this.storageKey,r),[a,l]=(n??"").split("/");try{if(!a&&this.flowType==="pkce")throw new Ca;const{data:c,error:d}=await S(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:a},xform:se});if(await re(this.storage,this.storageKey,o),d)throw d;if(!c||!c.session||!c.user){const h=new Ke;return this._returnResult({data:{user:null,session:null,redirectType:null},error:h})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:d})}catch(c){if(await re(this.storage,this.storageKey,o),_(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:s,provider:i,token:r,access_token:n,nonce:o}=e,a=await S(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:r,access_token:n,nonce:o,gotrue_meta_security:{captcha_token:s?.captchaToken}},xform:se}),{data:l,error:c}=a;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new Ke;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithOtp(e){var s,i,r,n,o;let a=null;try{if("email"in e){const{email:l,options:c}=e;let d=null,h=null;this.flowType==="pkce"&&([d,h,a]=await this._getCodeChallengeAndMethod());const{error:p}=await S(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(s=c?.data)!==null&&s!==void 0?s:{},create_user:(i=c?.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},code_challenge:d,code_challenge_method:h},redirectTo:this._maybeAppendFlowIdToRedirect(c?.emailRedirectTo,a)});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:l,options:c}=e,{data:d,error:h}=await S(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(r=c?.data)!==null&&r!==void 0?r:{},create_user:(n=c?.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},channel:(o=c?.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d?.message_id},error:h})}throw new Bt("You must provide either an email or phone number.")}catch(l){if(await re(this.storage,this.storageKey,a),_(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var s,i;try{let r,n;"options"in e&&(r=(s=e.options)===null||s===void 0?void 0:s.redirectTo,n=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:o,error:a}=await S(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:r,xform:se});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l?.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(r){if(_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithSSO(e){var s,i,r,n;let o=null;try{let a=null,l=null;this.flowType==="pkce"&&([a,l,o]=await this._getCodeChallengeAndMethod());const c=await S(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((s=e.options)===null||s===void 0?void 0:s.redirectTo,o)}),!((i=e?.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:nl});return!((r=c.data)===null||r===void 0)&&r.url&&H()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(a){if(await re(this.storage,this.storageKey,o),_(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:s},error:i}=e;if(i)throw i;if(!s)throw new G;const{error:r}=await S(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:s.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(_(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let s=null;try{const i=`${this.url}/resend`;if("email"in e){const{email:r,type:n,options:o}=e;let a=null,l=null;this.flowType==="pkce"&&([a,l,s]=await this._getCodeChallengeAndMethod());const{error:c}=await S(this.fetch,"POST",i,{headers:this.headers,body:{email:r,type:n,gotrue_meta_security:{captcha_token:o?.captchaToken},code_challenge:a,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(o?.emailRedirectTo,s)});return c&&await re(this.storage,this.storageKey,s),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:r,type:n,options:o}=e,{data:a,error:l}=await S(this.fetch,"POST",i,{headers:this.headers,body:{phone:r,type:n,gotrue_meta_security:{captcha_token:o?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:l})}throw new Bt("You must provide either an email or phone number and a type")}catch(i){if(await re(this.storage,this.storageKey,s),_(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,s){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await i,await s()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=s();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const r=[...this.pendingInLock];await Promise.all(r),this.pendingInLock.splice(0,r.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const s=await this.__loadSession();return await e(s)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const s=await W(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",s),s!==null&&(this._isValidSession(s)?e=s:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<bs:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const o=await W(this.userStorage,this.storageKey+"-user");o?.user?e.user=o.user:e.user=ws()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};e.user=sl(e.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:r,error:n}=await this._callRefreshToken(e.refresh_token);if(n){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const a=await W(this.storage,this.storageKey);if(a&&a.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:n})}return this._returnResult({data:{session:r},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let s;return this.lock!=null?s=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):s=await this._getUser(),s.data.user&&(this.suppressGetSessionWarning=!0),s}async _getUser(e){try{return e?await S(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ne}):await this._useSession(async s=>{var i,r,n;const{data:o,error:a}=s;if(a)throw a;return!(!((i=o.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new G}:await S(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(r=o.session)===null||r===void 0?void 0:r.access_token)!==null&&n!==void 0?n:void 0,xform:Ne})})}catch(s){if(_(s))return Lt(s)&&await this._removeSession(),this._returnResult({data:{user:null},error:s});throw s}}async updateUser(e,s={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,s)):await this._updateUser(e,s)}async _updateUser(e,s={}){let i=null;try{return await this._useSession(async r=>{const{data:n,error:o}=r;if(o)throw o;if(!n.session)throw new G;const a=n.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,i]=await this._getCodeChallengeAndMethod());const{data:d,error:h}=await S(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(s?.emailRedirectTo,i),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:a.access_token,xform:Ne});if(h)throw h;return a.user=d.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})})}catch(r){if(await re(this.storage,this.storageKey,i),_(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new G;const s=Date.now()/1e3;let i=s,r=!0,n=null;const{payload:o}=zt(e.access_token);if(o.exp&&(i=o.exp,r=i<=s),r){const{data:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};n=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});n={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:i-s,expires_at:i},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(s){if(_(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async s=>{var i;if(!e){const{data:o,error:a}=s;if(a)throw a;e=(i=o.session)!==null&&i!==void 0?i:void 0}if(!e?.refresh_token)throw new G;const{data:r,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async _getSessionFromURL(e,s){var i;try{if(!H())throw new Ut("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ut(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(s){case"implicit":if(this.flowType==="pkce")throw new Di("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ut("Not a valid implicit grant flow url.");break;default:}if(s==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Di("No code detected.");const{data:b,error:T}=await this._exchangeCodeForSession(e.code,{flowId:e[Ue]});if(T)throw T;const $=new URL(window.location.href);return $.searchParams.delete("code"),$.searchParams.delete(Ue),window.history.replaceState(window.history.state,"",$.toString()),{data:{session:b.session,redirectType:(i=b.redirectType)!==null&&i!==void 0?i:null},error:null}}const{provider_token:r,provider_refresh_token:n,access_token:o,refresh_token:a,expires_in:l,expires_at:c,token_type:d}=e;if(!o||!l||!a||!d)throw new Ut("No session defined in URL");const h=Math.round(Date.now()/1e3),p=parseInt(l);let u=h+p;c&&(u=parseInt(c));const m=u-h;m*1e3<=_e&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${p}s`);const g=u-p;h-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,u,h):h-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,u,h);const{data:f,error:y}=await this._getUser(o);if(y)throw y;const x={provider_token:r,provider_refresh_token:n,access_token:o,expires_in:p,expires_at:u,refresh_token:a,token_type:d,user:f.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:x,redirectType:e.type},error:null})}catch(r){if(_(r))return this._returnResult({data:{session:null,redirectType:null},error:r});throw r}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const s=Wt(e[Ue]);return s&&await W(this.storage,st(this.storageKey,s))?!0:!!await W(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async s=>{var i;const r=async()=>{await this._removeSession()},{data:n,error:o}=s;if(o&&!Lt(o))return this._returnResult({error:o});const a=(i=n.session)===null||i===void 0?void 0:i.access_token;if(a){const{error:l}=await this.admin.signOut(a,e);if(l&&!(Mi(l)&&(l.status===404||l.status===401||l.status===403)||Lt(l)))return e!=="others"&&await r(),this._returnResult({error:l})}return e!=="others"&&await r(),this._returnResult({error:null})})}onAuthStateChange(e){const s=ja(),i={id:s,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",s),this.stateChangeEmitters.delete(s)}};return this._debug("#onAuthStateChange()","registered callback with id",s),this.stateChangeEmitters.set(s,i),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(s)}):await this._emitInitialSession(s)))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async s=>{var i,r;try{const{data:{session:n},error:o}=s;if(o)throw o;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),Lt(n)||Ft(n)||Mi(n)&&(n.code==="refresh_token_not_found"||n.code==="refresh_token_already_used"||n.code==="session_expired")?console.warn(n):console.error(n)}})}async resetPasswordForEmail(e,s={}){let i=null,r=null,n=null;this.flowType==="pkce"&&([i,r,n]=await this._getCodeChallengeAndMethod(!0));try{return await S(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:r,gotrue_meta_security:{captcha_token:s.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(s.redirectTo,n)})}catch(o){if(await re(this.storage,this.storageKey,n),_(o))return this._returnResult({data:null,error:o});throw o}}async getUserIdentities(){var e;try{const{data:s,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=s.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var s;let i=null;try{const{data:r,error:n}=await this._useSession(async o=>{var a,l,c,d,h;const{data:p,error:u}=o;if(u)throw u;const{url:m,flowId:g}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return i=g,await S(this.fetch,"GET",m,{headers:this.headers,jwt:(h=(d=p.session)===null||d===void 0?void 0:d.access_token)!==null&&h!==void 0?h:void 0})});if(n)throw n;return H()&&!(!((s=e.options)===null||s===void 0)&&s.skipBrowserRedirect)&&window.location.assign(r?.url),this._returnResult({data:{provider:e.provider,url:r?.url,flowId:i},error:null})}catch(r){if(_(r))return this._returnResult({data:{provider:e.provider,url:null,flowId:i},error:r});throw r}}async linkIdentityIdToken(e){return await this._useSession(async s=>{var i;try{const{error:r,data:{session:n}}=s;if(r)throw r;const{options:o,provider:a,token:l,access_token:c,nonce:d}=e,h=await S(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=n?.access_token)!==null&&i!==void 0?i:void 0,body:{provider:a,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:se}),{data:p,error:u}=h;return u?this._returnResult({data:{user:null,session:null},error:u}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new Ke}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:u}))}catch(r){if(await re(this.storage,this.storageKey,null),_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}})}async unlinkIdentity(e){try{return await this._useSession(async s=>{var i,r;const{data:n,error:o}=s;if(o)throw o;return await S(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(r=(i=n.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _refreshAccessToken(e){const s="#_refreshAccessToken()";this._debug(s,"begin");try{const i=Date.now();return await Ua(async r=>(r>0&&await Ba(200*Math.pow(2,r-1)),this._debug(s,"refreshing attempt",r),await S(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:se})),(r,n)=>{const o=200*Math.pow(2,r);return n&&Ft(n)&&Date.now()+o-i<_e})}catch(i){if(this._debug(s,"error",i),_(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(s,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,s){const{url:i,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:s.redirectTo,scopes:s.scopes,queryParams:s.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",s,"url",i),H()&&!s.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i,flowId:r},error:null}}async _recoverAndRefresh(){var e,s;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const r=await W(this.storage,this.storageKey);if(r&&this.userStorage){let o=await W(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:r.user},await Se(this.userStorage,this.storageKey+"-user",o)),r.user=(e=o?.user)!==null&&e!==void 0?e:ws()}else if(r&&!r.user&&!r.user){const o=await W(this.storage,this.storageKey+"-user");o&&o?.user?(r.user=o.user,await Q(this.storage,this.storageKey+"-user"),await Se(this.storage,this.storageKey,r)):r.user=ws()}if(this._debug(i,"session from storage",r),!this._isValidSession(r)){this._debug(i,"session is not valid"),r!==null&&await this._removeSession();return}const n=((s=r.expires_at)!==null&&s!==void 0?s:1/0)*1e3-Date.now()<bs;if(this._debug(i,`session has${n?"":" not"} expired with margin of ${bs}s`),n){if(this.autoRefreshToken&&r.refresh_token){const{error:o}=await this._callRefreshToken(r.refresh_token);o&&(Oa(o)?this._debug(i,"refresh discarded by commit guard",o):this._debug(i,"refresh failed",o))}}else if(r.user&&r.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(r.access_token);!a&&o?.user?(r.user=o.user,await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(i,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(r){this._debug(i,"error",r),Ft(r)?console.warn(r):console.error(r);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var s,i;if(!e)throw new G;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const r="#_callRefreshToken()";this._debug(r,"begin");try{this.refreshingDeferred=new gs;const n=await W(this.storage,this.storageKey),{data:o,error:a}=await this._refreshAccessToken(e);if(a)throw a;if(!o.session)throw new G;const l=await W(this.storage,this.storageKey);if(n!==null&&(l===null||l.refresh_token!==n.refresh_token)){this._debug(r,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const p={data:null,error:new ji};return this.refreshingDeferred.resolve(p),p}const d=this._sessionRemovalEpoch;if(await this._saveSession(o.session),this._sessionRemovalEpoch!==d){this._debug(r,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await Q(this.storage,this.storageKey),this.userStorage&&await Q(this.userStorage,this.storageKey+"-user");const p={data:null,error:new ji};return this.refreshingDeferred.resolve(p),p}await this._notifyAllSubscribers("TOKEN_REFRESHED",o.session);const h={data:o.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(h),h}catch(n){if(this._debug(r,"error",n),_(n)){const o={data:null,error:n};if(!Ft(n)){const a=await W(this.storage,this.storageKey);!!(a?.expires_at&&a.expires_at*1e3>Date.now())?this._debug(r,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:o,expiresAt:Date.now()+wa},(s=this.refreshingDeferred)===null||s===void 0||s.resolve(o),o}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(n),n}finally{this.refreshingDeferred=null,this._debug(r,"end")}}async _notifyAllSubscribers(e,s,i=!0){if(this._pendingInitNotifications!==null&&i){this._pendingInitNotifications.push({event:e,session:s,broadcast:i});return}const r=`#_notifyAllSubscribers(${e})`;this._debug(r,"begin",s,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:s});const n=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,s)}catch(l){n.push(l)}});if(await Promise.all(o),n.length>0){for(let a=0;a<n.length;a+=1)console.error(n[a]);throw n[0]}}finally{this._debug(r,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const s=Object.assign({},e),i=s.user&&s.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&s.user&&await Se(this.userStorage,this.storageKey+"-user",{user:s.user});const r=Object.assign({},s);delete r.user;const n=qi(r);await Se(this.storage,this.storageKey,n)}else{const r=qi(s);await Se(this.storage,this.storageKey,r)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await Q(this.storage,this.storageKey),await Ka(this.storage,this.storageKey),await Q(this.storage,this.storageKey+"-user"),this.userStorage&&await Q(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&H()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(s){console.error("removing visibilitychange callback failed",s)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),_e);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const s=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=s,s&&typeof s=="object"&&typeof s.unref=="function"?s.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(s)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const s=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,s&&clearTimeout(s)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async s=>{const{data:{session:i}}=s;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/_e);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${_e}ms, refresh threshold is ${ut} ticks`),r<=ut&&await this._callRefreshToken(i.refresh_token)})}catch(s){console.error("Auto refresh tick failed with error. This is likely a transient error.",s)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof cl)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async s=>{const{data:{session:i}}=s;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/_e);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${_e}ms, refresh threshold is ${ut} ticks`),r<=ut&&await this._callRefreshToken(i.refresh_token)})}catch(s){console.error("Auto refresh tick failed with error. This is likely a transient error.",s)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!H()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const s=`#_onVisibilityChanged(${e})`;if(this._debug(s,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(s,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(s,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,s,i){let r=i?.redirectTo,n=null,o=null,a=null;this.flowType==="pkce"&&([n,o,a]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,a));const l=[`provider=${encodeURIComponent(s)}`];if(r&&l.push(`redirect_to=${encodeURIComponent(r)}`),i?.scopes&&l.push(`scopes=${encodeURIComponent(i.scopes)}`),n!=null&&o!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(o)}`});l.push(c.toString())}if(i?.queryParams){const c=new URLSearchParams(i.queryParams);l.push(c.toString())}return i?.skipBrowserRedirect&&l.push(`skip_http_redirect=${i.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:a}}_maybeAppendFlowIdToRedirect(e,s){return!e||!s||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:Ya(e,s)}async _getCodeChallengeAndMethod(e=!1){return Ja(this.storage,this.storageKey,e,s=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",s))}async _unenroll(e){try{return await this._useSession(async s=>{var i;const{data:r,error:n}=s;return n?this._returnResult({data:null,error:n}):await S(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=r?.session)===null||i===void 0?void 0:i.access_token})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _enroll(e){try{return await this._useSession(async s=>{var i,r;const{data:n,error:o}=s;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await S(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(i=n?.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((r=l?.totp)===null||r===void 0)&&r.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _verify(e){const s=async()=>{try{return await this._useSession(async i=>{var r;const{data:n,error:o}=i;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Xi(e.webauthn.credential_response):Qi(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await S(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:a,headers:this.headers,jwt:(r=n?.session)===null||r===void 0?void 0:r.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,s):s()}async _challenge(e){const s=async()=>{try{return await this._useSession(async i=>{var r;const{data:n,error:o}=i;if(o)return this._returnResult({data:null,error:o});const a=await S(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(r=n?.session)===null||r===void 0?void 0:r.access_token});if(a.error)return a;const{data:l}=a;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Yi(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Ji(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,s):s()}async _challengeAndVerify(e){const{data:s,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:s.id,code:e.code})}async _listFactors(){var e;const{data:{user:s},error:i}=await this.getUser();if(i)return{data:null,error:i};const r={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=s?.factors)!==null&&e!==void 0?e:[])r.all.push(n),n.status==="verified"&&r[n.factor_type].push(n);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){var s,i,r,n;if(e)try{const{payload:u}=zt(e);let m=null;u.aal&&(m=u.aal);let g=m;const{data:{user:f},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(s=f?.factors)===null||s===void 0?void 0:s.filter(T=>T.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(g="aal2");const b=u.amr||[];return{data:{currentLevel:m,nextLevel:g,currentAuthenticationMethods:b},error:null}}catch(u){if(_(u))return this._returnResult({data:null,error:u});throw u}const{data:{session:o},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=zt(o.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((n=(r=o.user.factors)===null||r===void 0?void 0:r.filter(u=>u.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(d="aal2");const p=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async s=>{const{data:{session:i},error:r}=s;return r?this._returnResult({data:null,error:r}):i?await S(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new G})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _approveAuthorization(e,s){try{return await this._useSession(async i=>{const{data:{session:r},error:n}=i;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new G});const o=await S(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&H()&&!s?.skipBrowserRedirect&&window.location.assign(o.data.redirect_url),o})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,s){try{return await this._useSession(async i=>{const{data:{session:r},error:n}=i;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new G});const o=await S(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&H()&&!s?.skipBrowserRedirect&&window.location.assign(o.data.redirect_url),o})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:s},error:i}=e;return i?this._returnResult({data:null,error:i}):s?await S(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new G})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async s=>{const{data:{session:i},error:r}=s;return r?this._returnResult({data:null,error:r}):i?(await S(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new G})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async fetchJwk(e,s={keys:[]}){let i=s.keys.find(a=>a.kid===e);if(i)return i;const r=Date.now();if(i=this.jwks.keys.find(a=>a.kid===e),i&&this.jwks_cached_at+Aa>r)return i;const{data:n,error:o}=await S(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=r,i=n.keys.find(a=>a.kid===e),!i)?null:i}async getClaims(e,s={}){try{let i=e;if(!i){const{data:u,error:m}=await this.getSession();if(m||!u.session)return this._returnResult({data:null,error:m});i=u.session.access_token}const{header:r,payload:n,signature:o,raw:{header:a,payload:l}}=zt(i);if(!s?.allowExpired)try{Za(n.exp)}catch(u){throw new ss(u instanceof Error?u.message:"JWT validation failed")}const c=!r.alg||r.alg.startsWith("HS")||!r.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(r.kid,s?.keys?{keys:s.keys}:s?.jwks);if(!c){const{error:u}=await this.getUser(i);if(u)throw u;return{data:{claims:n,header:r,signature:o},error:null}}const d=el(r.alg),h=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,h,o,Ma(`${a}.${l}`)))throw new ss("Invalid JWT signature");return{data:{claims:n,header:r,signature:o},error:null}}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}}async signInWithPasskey(e){var s,i,r;ne(this.experimental);try{if(!ns())return this._returnResult({data:null,error:new ae("Browser does not support WebAuthn",null)});const{data:n,error:o}=await this._startPasskeyAuthentication({options:{captchaToken:(s=e?.options)===null||s===void 0?void 0:s.captchaToken}});if(o||!n)return this._returnResult({data:null,error:o});const a=Ji(n.options),l=(r=(i=e?.options)===null||i===void 0?void 0:i.signal)!==null&&r!==void 0?r:Ys.createNewAbortSignal(),{data:c,error:d}=await Zr({publicKey:a,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new ae("WebAuthn ceremony failed",null)});const h=Qi(c);return this._verifyPasskeyAuthentication({challengeId:n.challenge_id,credential:h})}catch(n){if(_(n))return this._returnResult({data:null,error:n});throw n}}async registerPasskey(e){var s,i;ne(this.experimental);try{if(!ns())return this._returnResult({data:null,error:new ae("Browser does not support WebAuthn",null)});const{data:r,error:n}=await this._startPasskeyRegistration();if(n||!r)return this._returnResult({data:null,error:n});const o=Yi(r.options),a=(i=(s=e?.options)===null||s===void 0?void 0:s.signal)!==null&&i!==void 0?i:Ys.createNewAbortSignal(),{data:l,error:c}=await Qr({publicKey:o,signal:a});if(c||!l)return this._returnResult({data:null,error:c??new ae("WebAuthn ceremony failed",null)});const d=Xi(l);return this._verifyPasskeyRegistration({challengeId:r.challenge_id,credential:d})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyRegistration(){ne(this.experimental);try{return await this._useSession(async e=>{const{data:{session:s},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new G});const{data:r,error:n}=await S(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:s.access_token,body:{}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:r,error:null})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){ne(this.experimental);try{return await this._useSession(async s=>{const{data:{session:i},error:r}=s;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new G});const{data:n,error:o}=await S(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:i.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:n,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _startPasskeyAuthentication(e){var s;ne(this.experimental);try{const{data:i,error:r}=await S(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(s=e?.options)===null||s===void 0?void 0:s.captchaToken}}});return r?this._returnResult({data:null,error:r}):this._returnResult({data:i,error:null})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}}async _verifyPasskeyAuthentication(e){ne(this.experimental);try{const{data:s,error:i}=await S(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:se});return i?this._returnResult({data:null,error:i}):(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:s,error:null}))}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _listPasskeys(){ne(this.experimental);try{return await this._useSession(async e=>{const{data:{session:s},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new G});const{data:r,error:n}=await S(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:s.access_token,xform:o=>({data:o,error:null})});return n?this._returnResult({data:null,error:n}):this._returnResult({data:r,error:null})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){ne(this.experimental);try{return await this._useSession(async s=>{const{data:{session:i},error:r}=s;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new G});const{data:n,error:o}=await S(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,body:{friendly_name:e.friendlyName}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:n,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _deletePasskey(e){ne(this.experimental);try{return await this._useSession(async s=>{const{data:{session:i},error:r}=s;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new G});const{error:n}=await S(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,noResolveJson:!0});return n?this._returnResult({data:null,error:n}):this._returnResult({data:null,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}}Tt.nextInstanceID={};const _l=Tt,Sl="2.112.3";let pt="",as;if(typeof Deno<"u"){var ks;pt="deno",as=(ks=Deno.version)===null||ks===void 0?void 0:ks.deno}else if(typeof document<"u")pt="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")pt="react-native";else{var _s;pt="node";const t=globalThis.process;as=t==null||(_s=t.version)===null||_s===void 0?void 0:_s.replace(/^v/,"")}const en=[`runtime=${pt}`];as&&en.push(`runtime-version=${as}`);const Tl={"X-Client-Info":`supabase-js/${Sl}; ${en.join("; ")}`},Al={headers:Tl},El={schema:"public"},Il={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Cl={},Ol={enabled:!1,respectSamplingDecision:!0};function Nl(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[s,i,r,n]=e;if(s.length!==2||i.length!==32||r.length!==16||n.length!==2)return null;const o=/^[0-9a-f]+$/i;return!o.test(s)||!o.test(i)||!o.test(r)||!o.test(n)||i==="00000000000000000000000000000000"||r==="0000000000000000"?null:{version:s,traceId:i,parentId:r,traceFlags:n,isSampled:(parseInt(n,16)&1)===1}}function $l(t,e){if(!t||!e||e.length===0)return!1;let s;if(t instanceof URL)s=t;else try{s=new URL(t)}catch{return!1}for(const i of e)try{if(typeof i=="string"){if(Rl(s.hostname,i))return!0}else if(i instanceof RegExp){if(i.test(s.hostname))return!0}else if(typeof i=="function"&&i(s))return!0}catch{continue}return!1}function Rl(t,e){if(e===t)return!0;if(e.startsWith("*.")){const s=e.slice(2);if(t.endsWith(s)&&(t===s||t.endsWith("."+s)))return!0}return!1}function Pl(t){const e=[];try{const s=new URL(t);e.push(s.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function At(t){"@babel/helpers - typeof";return At=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},At(t)}function Ml(t,e){if(At(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var i=s.call(t,e);if(At(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Dl(t){var e=Ml(t,"string");return At(e)=="symbol"?e:e+""}function jl(t,e,s){return(e=Dl(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function Zi(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),s.push.apply(s,i)}return s}function F(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?Zi(Object(s),!0).forEach(function(i){jl(t,i,s[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):Zi(Object(s)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(s,i))})}return t}const Ll=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Bl=()=>Headers,tn=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),Ul="sb_temp_",er=new Set,Fl=t=>{var e,s;if(!t.startsWith("sb_")||tn(t)||t.startsWith(Ul))return;const i=(e=(s=t.match(/^sb_[a-zA-Z0-9]+_/))===null||s===void 0?void 0:s[0])!==null&&e!==void 0?e:"unknown";er.has(i)||(er.add(i),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},tr=(t,e,s,i,r,n)=>{const o=Ll(i),a=Bl(),l=r?.enabled===!0,c=r?.respectSamplingDecision!==!1,d=l?Pl(e):null,h=!(n?.omitApiKeyAsBearer&&tn(t));return async(p,u)=>{const m=await s();let g=new a(u?.headers);if(g.has("apikey")||g.set("apikey",t),!g.has("Authorization")){const f=m??(h?t:null);f&&g.set("Authorization",`Bearer ${f}`)}if(d){const f=zl(p,d,c);f&&(f.traceparent&&!g.has("traceparent")&&g.set("traceparent",f.traceparent),f.tracestate&&!g.has("tracestate")&&g.set("tracestate",f.tracestate),f.baggage&&!g.has("baggage")&&g.set("baggage",f.baggage))}return o(p,F(F({},u),{},{headers:g}))}};let sr=!1,ir=!1;function zl(t,e,s){const i=Fn();if(!i)return sr||(sr=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!$l(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const r=i();if(!r||!r.traceparent){var n;if(!(r==null||(n=r.carrierKeys)===null||n===void 0)&&n.length&&!ir){ir=!0;const o=r.carrierKeys.includes("sentry-trace")?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":" Configure your tracing SDK to emit W3C trace context on outgoing requests.";console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${r.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.`+o)}return null}if(s){const o=Nl(r.traceparent);if(o&&!o.isSampled)return{traceparent:r.traceparent}}return r}function rr(t){return typeof t=="boolean"?{enabled:t}:t}function ql(t){return t.endsWith("/")?t:t+"/"}function Gl(t,e){var s,i,r,n,o,a;const{db:l,auth:c,realtime:d,global:h}=t,{db:p,auth:u,realtime:m,global:g}=e,f=rr(t.tracePropagation),y=rr(e.tracePropagation),x={db:F(F({},p),l),auth:F(F({},u),c),realtime:F(F({},m),d),storage:{},global:F(F(F({},g),h),{},{headers:F(F({},(s=g?.headers)!==null&&s!==void 0?s:{}),(i=h?.headers)!==null&&i!==void 0?i:{})}),tracePropagation:{enabled:(r=(n=f?.enabled)!==null&&n!==void 0?n:y?.enabled)!==null&&r!==void 0?r:!1,respectSamplingDecision:(o=(a=f?.respectSamplingDecision)!==null&&a!==void 0?a:y?.respectSamplingDecision)!==null&&o!==void 0?o:!0},accessToken:async()=>""};return t.accessToken?x.accessToken=t.accessToken:delete x.accessToken,x}function Vl(t){const e=t?.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(ql(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Hl=class extends _l{constructor(t){super(t)}},Wl=class{constructor(t,e,s){var i,r;this.supabaseUrl=t,this.supabaseKey=e;const n=Vl(t);if(!e)throw new Error("supabaseKey is required.");Fl(e),this.realtimeUrl=new URL("realtime/v1",n),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",n),this.storageUrl=new URL("storage/v1",n),this.functionsUrl=new URL("functions/v1",n);const o=`sb-${n.hostname.split(".")[0]}-auth-token`,a={db:El,realtime:Cl,auth:F(F({},Il),{},{storageKey:o}),global:Al,tracePropagation:Ol},l=Gl(s??{},a);if(this.settings=l,this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=l.global.headers)!==null&&r!==void 0?r:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,h)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=tr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=tr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(F({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new Zn(new URL("rest/v1",n).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new ba(this.storageUrl.href,this.headers,this.fetch,s?.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Gn(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},s={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,s)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,s;if(t.accessToken)return await t.accessToken();const{data:i}=await t.auth.getSession();return(e=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:s,storage:i,userStorage:r,storageKey:n,flowType:o,lock:a,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:h,skipAutoInitialize:p},u,m){const g={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Hl({url:this.authUrl.href,headers:F(F({},g),u),storageKey:n,autoRefreshToken:t,persistSession:e,detectSessionInUrl:s,storage:i,userStorage:r,flowType:o,lock:a,debug:l,throwOnError:c,experimental:d,fetch:m,lockAcquireTimeout:h,skipAutoInitialize:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(f=>f.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new qo(this.realtimeUrl.href,F(F({},t),{},{params:F(F({},{apikey:this.supabaseKey}),t?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e?.access_token)})}_handleTokenChanged(t,e,s){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==s?(this.changedAccessToken=s,this.realtime.setAuth(s)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Kl=(t,e,s)=>new Wl(t,e,s);function Yl(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const s=e.match(/^v(\d+)\./);return s?parseInt(s[1],10)<=20:!1}Yl()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const sn={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_HUMAN_ENGINE_URL:"https://warmsynths.github.io/human-midi/human-engine.js"};function Jl(){try{return sn?.VITE_SUPABASE_URL||void 0}catch{return}}function Xl(){try{return sn?.VITE_SUPABASE_ANON_KEY||void 0}catch{return}}class Ql{constructor(e,s,i){if(this.client=null,this.currentUser=null,this.currentAccessToken=null,this.isLoading=!0,this.listeners=new Set,i){this.client=i,this.initClientSession();return}const r=e!==void 0?e:Jl(),n=s!==void 0?s:Xl();if(r&&n)try{this.client=Kl(r,n,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),this.initClientSession()}catch(o){console.error("Failed to initialize Supabase Auth client:",o),this.isLoading=!1}else this.isLoading=!1}initClientSession(){this.client&&(this.client.auth.getSession().then(({data:e})=>{this.handleSession(e.session),this.isLoading=!1,this.notify()}).catch(()=>{this.isLoading=!1,this.notify()}),this.client.auth.onAuthStateChange((e,s)=>{this.handleSession(s),this.isLoading=!1,this.notify()}))}handleSession(e){e&&e.user?(this.currentUser={id:e.user.id,email:e.user.email},this.currentAccessToken=e.access_token):(this.currentUser=null,this.currentAccessToken=null)}notify(){const e=this.getAuthState();this.listeners.forEach(s=>{try{s(e)}catch(i){console.error("Error in AuthState listener:",i)}})}subscribe(e){return this.listeners.add(e),e(this.getAuthState()),()=>{this.listeners.delete(e)}}isConfigured(){return this.client!==null}getAuthState(){return{user:this.currentUser,accessToken:this.currentAccessToken,isAuthenticated:!!this.currentUser&&!!this.currentAccessToken,isLoading:this.isLoading}}getUser(){return this.currentUser}async getAccessToken(){if(!this.client)return null;try{const{data:e}=await this.client.auth.getSession();if(e.session)return this.currentAccessToken=e.session.access_token,e.session.access_token}catch{}return this.currentAccessToken}async signUp(e,s){if(!this.client)return{success:!1,message:"Supabase credentials are not configured."};try{const{data:i,error:r}=await this.client.auth.signUp({email:e.trim(),password:s});return r?{success:!1,message:r.message}:{success:!0,user:i.user||void 0}}catch(i){return{success:!1,message:i instanceof Error?i.message:String(i)}}}async signInWithPassword(e,s){if(!this.client)return{success:!1,message:"Supabase credentials are not configured."};try{const{data:i,error:r}=await this.client.auth.signInWithPassword({email:e.trim(),password:s});return r?{success:!1,message:r.message}:(this.handleSession(i.session),this.notify(),{success:!0})}catch(i){return{success:!1,message:i instanceof Error?i.message:String(i)}}}async signInWithOAuth(e="google"){if(!this.client)return{success:!1,message:"Supabase credentials are not configured."};try{const{error:s}=await this.client.auth.signInWithOAuth({provider:e,options:{redirectTo:typeof window<"u"?window.location.origin:void 0}});return s?{success:!1,message:s.message}:{success:!0}}catch(s){return{success:!1,message:s instanceof Error?s.message:String(s)}}}async signInWithOtp(e){if(!this.client)return{success:!1,message:"Supabase credentials are not configured."};try{const{error:s}=await this.client.auth.signInWithOtp({email:e.trim(),options:{emailRedirectTo:typeof window<"u"?window.location.origin:void 0}});return s?{success:!1,message:s.message}:{success:!0,message:"Check your email for the magic login link!"}}catch(s){return{success:!1,message:s instanceof Error?s.message:String(s)}}}async signOut(){if(!this.client)return this.currentUser=null,this.currentAccessToken=null,this.notify(),{success:!0};try{const{error:e}=await this.client.auth.signOut();return e?{success:!1,message:e.message}:(this.currentUser=null,this.currentAccessToken=null,this.notify(),{success:!0})}catch(e){return{success:!1,message:e instanceof Error?e.message:String(e)}}}}const Te=new Ql;class Zl{formatUrl(e){let s=e.trim().replace(/\/+$/,"");return s&&!s.startsWith("http://")&&!s.startsWith("https://")&&(s="https://"+s),s}applyAuthHeaders(e,s){if(!s)return;const i=s.trim();i.toLowerCase().startsWith("bearer ")?e.Authorization=i:e.Authorization=`Bearer ${i}`}async testConnection(e,s){const i=this.formatUrl(e);if(!i)return{ok:!1,status:0,message:"Worker URL cannot be empty"};try{const r={};this.applyAuthHeaders(r,s);const n=new AbortController,o=setTimeout(()=>n.abort(),8e3),a=await fetch(`${i}/api/health`,{method:"GET",headers:r,signal:n.signal});if(clearTimeout(o),a.status===200)return{ok:!0,status:200,message:"Connected to Cloudflare Worker",timestamp:(await a.json().catch(()=>({}))).timestamp};if(a.status===401)return{ok:!1,status:401,message:"Unauthorized: Invalid or missing authorization token"};const l=await a.text().catch(()=>"");return{ok:!1,status:a.status,message:`Connection error (${a.status}): ${l||a.statusText}`}}catch(r){return r instanceof Error&&r.name==="AbortError"?{ok:!1,status:0,message:"Connection timed out (8s limit)"}:{ok:!1,status:0,message:"Network error: Unable to reach worker endpoint"}}}async sync(e,s,i){const r=this.formatUrl(e);if(!r)throw new Error("Worker URL is not configured");const n={"Content-Type":"application/json"};this.applyAuthHeaders(n,s);const o=new AbortController,a=setTimeout(()=>o.abort(),15e3),l=await fetch(`${r}/api/sync`,{method:"POST",headers:n,body:JSON.stringify(i),signal:o.signal});if(clearTimeout(a),!l.ok){let c="";try{const d=await l.json();c=d.error||d.message||""}catch{c=await l.text().catch(()=>"")}throw new Error(`Cloud sync failed (${l.status}): ${c||l.statusText||"Unknown error"}`)}return await l.json()}}const ec=new Zl,tc={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_HUMAN_ENGINE_URL:"https://warmsynths.github.io/human-midi/human-engine.js"},nr="chroma_chords_deleted_projects",or="chroma_chords_last_sync_time",ar="https://chroma-chords-api.warmsynths.workers.dev";function sc(){try{return tc?.VITE_WORKER_URL||ar}catch{return ar}}function lr(t){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(t):null}function cr(t,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(t,e)}class ic{constructor(){this.userEmail=null,this.authenticated=!1,this.isCloudSyncing=!1,this.syncTimeout=null,this.syncQueued=!1,this.authStateCallbacks=new Set,this.projectsChangeCallbacks=new Set,this.unsubscribeAuth=null,this.setupAuthSubscription()}setupAuthSubscription(){this.unsubscribeAuth=Te.subscribe(e=>{const s=this.authenticated;this.userEmail=e.user?.email||null,this.authenticated=e.isAuthenticated,this.notifyAuthState(),!s&&this.authenticated&&this.syncWithCloud().catch(i=>{console.warn("Auto cloud sync on sign-in encountered an error:",i)})})}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>{try{e(this.userEmail,this.authenticated)}catch(s){console.error("Error in AuthState callback:",s)}})}subscribeProjects(e){return this.projectsChangeCallbacks.add(e),e(this.getProjects()),()=>this.projectsChangeCallbacks.delete(e)}notifyProjectsChanged(){const e=this.getProjects();this.projectsChangeCallbacks.forEach(s=>{try{s(e)}catch(i){console.error("Error in ProjectsChange callback:",i)}})}logout(){this.userEmail=null,this.authenticated=!1,this.notifyAuthState()}getProjects(){return Ve.getProjects()}isProjectSaved(e){return e?Ve.getProjects().some(s=>s.id===e):!1}saveProject(e){Ve.saveProject(e),this.removeTombstone(e.id),this.notifyProjectsChanged(),this.scheduleCloudSync()}deleteProject(e){Ve.deleteProject(e),this.addTombstone(e),this.notifyProjectsChanged(),this.scheduleCloudSync()}getTombstones(){const e=lr(nr);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}setTombstones(e){cr(nr,JSON.stringify(e))}addTombstone(e){const s=this.getTombstones(),i=s.findIndex(n=>n.id===e),r=new Date().toISOString();i>=0?s[i].deletedAt=r:s.push({id:e,deletedAt:r}),this.setTombstones(s)}removeTombstone(e){const s=this.getTombstones().filter(i=>i.id!==e);this.setTombstones(s)}getLastSyncTime(){return lr(or)}setLastSyncTime(e){cr(or,e)}scheduleCloudSync(){this.syncTimeout&&clearTimeout(this.syncTimeout),this.syncTimeout=setTimeout(()=>{this.syncTimeout=null,this.isCloudSyncing?this.syncQueued=!0:this.syncWithCloud().catch(e=>{console.warn("Scheduled cloud sync failed:",e)})},2e3)}async syncWithCloud(e){if(this.isCloudSyncing){this.syncQueued=!0;return}const s=await Te.getAccessToken();if(!this.isAuthenticated()||!s)return;const i=e||sc();if(i){this.isCloudSyncing=!0;try{const r=Ve.getProjects(),n=this.getTombstones(),o=this.getLastSyncTime(),a=r.map(f=>({...f,deletedAt:null})),l=await ec.sync(i,s,{sets:a,lastSyncTime:o,tombstones:n}),c=new Map;r.forEach(f=>{c.set(f.id,{...f,syncedToCloud:!0})});const d=l.tombstones||[],h=new Set(d.map(f=>f.id));(l.sets||[]).forEach(f=>{if(f.deletedAt)h.add(f.id);else{const y=c.get(f.id),x=f.lastModified||(f.updatedAt?new Date(f.updatedAt).getTime():0),b=y?.lastModified||0;(!y||x>=b)&&c.set(f.id,{id:f.id,name:f.name,lastModified:x,genre:f.genre,mood:f.mood,key:f.key,scaleType:f.scaleType,bpm:f.bpm,showTheory:f.showTheory,chords:f.chords,syncedToCloud:!0})}}),h.forEach(f=>{c.delete(f)});const p=Array.from(c.values());Ve.setProjects(p);const u=this.getTombstones(),m=new Set(n.map(f=>f.id)),g=u.filter(f=>!m.has(f.id));this.setTombstones(g),(l.lastSyncTime||l.syncedAt)&&this.setLastSyncTime(l.lastSyncTime||l.syncedAt),this.notifyProjectsChanged()}finally{this.isCloudSyncing=!1,this.syncQueued&&(this.syncQueued=!1,this.scheduleCloudSync())}}}async syncProjectsFromCloud(){return this.syncWithCloud()}async syncProjectsToCloud(){return this.syncWithCloud()}}const X=new ic;let Ss=null,Ts=null,As=null,hr=null,Es=null,Is=null,Cs=null,Os=null,Ns=null,$s=null,Rs=null;function rn(){return Ss||(Ss=new Cr({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination()),Ss}function rc(){return Ts||(Ts=new Pn({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:t=>{console.warn("Failed to load Rhodes piano sampler:",t)}}).connect(rn())),Ts}function nc(t){const e=rn();switch(t){case"organ":return As||(As=new Y($e,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(e)),As;case"pad-strings":return Es||(hr=new Ir({decay:4.5,wet:.35}).connect(e),Es=new Y($e,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(hr)),Es;case"juno-pad":if(!Cs){Is=new Er({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).connect(e);try{Is.start()}catch{}Cs=new Y($e,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Is)}return Cs;case"stab":return Os||(Os=new Y(Ar,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(e)),Os;case"epiano":return Ns||(Ns=new Y(gt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(e)),Ns;case"guitar":return $s||($s=new Y($e,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(e)),$s;case"bell":return Rs||(Rs=new Y(gt,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(e)),Rs;case"rhodes":default:return rc()}}const ot=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],at=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],ci={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},hi={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},oc={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Kt(t){const e=ci[t]??"rhodes";return oc[e]??"Piano"}function Yt(t){return(hi[t]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function ac(){return Promise.race([Rn(),new Promise(t=>setTimeout(t,3e3))])}function nn(t,e){const s=e/60;switch(t){case"1/4":return 1/s;case"1/8":return .5/s;case"1/8T":return .5/s*(2/3);case"1/16":return .25/s;case"1/32":return .125/s;default:return .25/s}}function on(t,e){const s=[];for(let i=0;i<e;i++)for(const r of t){const n=r.match(/^([A-G]#?)(-?\d+)$/);if(n){const o=n[1],a=parseInt(n[2],10)+i;s.push(`${o}${a}`)}else s.push(r)}return s}function an(t,e){const s=[...t];switch(e){case"up":return s;case"down":return[...s].reverse();case"up-down":return[...s,...[...s].reverse().slice(1,-1)];case"random":return s.sort(()=>Math.random()-.5);default:return s}}const dr={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function lc(t){if(!t)return;const e=t.toLowerCase().trim();return dr[e]?dr[e]:ot.find(i=>i.name.toLowerCase()===e||i.instrument.toLowerCase()===e)?.name}function cc(t){if(!t)return;const e=t.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":at.find(i=>i.name.toLowerCase()===e)?.name??"Block chords"}function hc(t,e=.7,s,i="rhodes",r){try{Promise.all([Nn(),ac()]).then(()=>{const n=nc(i);if(r&&typeof r=="object"&&Object.keys(r).length>0)try{typeof n.set=="function"&&n.set(r)}catch(c){console.warn("Failed to apply customConfig to Tone.js instrument:",c)}const o=t.length,a=o<=1?1:Math.max(.4,1/Math.sqrt(o)),l=$n();if(s&&s.arpMode&&s.arpMode!=="off"){const c=s.bpm??80,d=s.arpRate??"1/16",h=s.arpRange??1,p=s.arpMode,u=nn(d,c),m=on(t,h),g=an(m,p),f=()=>s.minVelocity!==void 0&&s.maxVelocity!==void 0?(s.minVelocity+Math.random()*(s.maxVelocity-s.minVelocity))/127*a:a,y=s.duration?s.duration*(1+(Math.random()-.5)*.1*(s.humanVariance??0)):Math.max(.05,u*.9);g.forEach((x,b)=>{const T=s.microTiming?(Math.random()-.5)*s.microTiming*.02:0;n.triggerAttackRelease(x,y,l+b*u+T,f())});return}t.forEach((c,d)=>{let h=0,p=a,u=e;if(s){const{minVelocity:m,maxVelocity:g,spread:f,microTiming:y,humanVariance:x,duration:b}=s;p=(m+Math.random()*(g-m))/127*a;const $=d*f*.1,I=(Math.random()-.5)*y*.05,R=(Math.random()-.5)*x*.03;h=Math.max(0,$+I+R),u=b*(1+(Math.random()-.5)*.2*x)}n.triggerAttackRelease(c,u,l+h,p)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function ur(t,e,s){const i=e==="Unknown"||!e?"Pop":e,r=s?.instrument?ot.find(p=>p.name===s.instrument):void 0,n=s?.playStyle?at.find(p=>p.name===s.playStyle):void 0,o=r?.instrument??ci[i]??"rhodes",a=hi[i]||{},l=n?.patch??{},c={...a,...l,bpm:s?.bpm??a.bpm??90},d=s?.duration??a.duration??.9,h=l.durationMultiplier?d*l.durationMultiplier:d;hc(t,h,c,o,s?.customConfig)}const dc=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],uc=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],Ae={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},pc=new Set(["F","Bb","Eb","Ab","Db","Gb"]),it=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ms={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},fc=Object.keys(ms),gc={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},pr={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},mc={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},Js={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},vc=Object.keys(Js),fr={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},vt=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],yc={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},bc={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},ln={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},Pe=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Et(t){return(Pe.find(e=>e.name===t)||Pe[0]).dot}const wc={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function xc(t,e){return 1+t.degrees.filter(s=>e.includes(s)).length*.6}function ls(t,e){const s=t.reduce((r,n)=>r+e(n),0);let i=Math.random()*s;for(const r of t)if(i-=e(r),i<=0)return r;return t[t.length-1]}function kc(t){if(t.length)return t[Math.floor(Math.random()*t.length)]}const Xs=4,qe=1,ge=8,di=1700,_c={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Jt(t,e,s="MAJOR",i="Pop",r="Uplifting"){if(t===e)return .05;let o=(_c[t]||{})[e]??.1;return(s.includes("MINOR")||s==="DORIAN")&&(t==="TONIC"&&e==="SUBMEDIANT"&&(o*=1.5),t==="SUBMEDIANT"&&e==="MEDIANT"&&(o*=1.4),t==="MEDIANT"&&e==="SUBTONIC"&&(o*=1.4),t==="SUBTONIC"&&e==="TONIC"&&(o*=1.3)),i==="Jazz-ish"||i==="Lo-fi/Chill"?(t==="SUPERTONIC"&&e==="DOMINANT"&&(o*=1.8),t==="DOMINANT"&&e==="TONIC"&&(o*=1.5),t==="TONIC"&&e==="SUPERTONIC"&&(o*=1.4)):(i==="House/Dance"||i==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(o*=1.5),(ln[r]||[]).includes(e)&&(o*=1.5),Math.max(.01,o)}function Sc(t,e,s,i,r,n,o=Xs){let a="TONIC";(t.type.includes("MINOR")||t.type==="DORIAN")&&(n==="Melancholy"||n==="Nostalgic")&&Math.random()<.4&&(a=s.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const l=[a];let c=a;for(let d=1;d<o;d++){const h=d===o-1;let p=s.filter(g=>t.degrees[g]);p.length||(p=s);const u=p.filter(g=>g!==c),m=u.length?u:p;if(h){const g=ls(m,f=>{const y=Jt(f,l[0],t.type,r,n),x=Jt(c,f,t.type,r,n);return y*x});l.push(g)}else{const g=m.filter(x=>!l.includes(x)),f=g.length?g:m,y=ls(f,x=>Jt(c,x,t.type,r,n));c=y,l.push(y)}}return l}function It(t,e){const s=(t%12+12)%12;return e?uc[s]:dc[s]}function ui(t){const e=t[0]?.toUpperCase();let s="C",i=t;e&&/[A-G]/.test(e)&&(t[1]==="B"?(s=`${e}b`,i=t.slice(2)):t[1]==="#"?(s=`${e}#`,i=t.slice(2)):(s=e,i=t.slice(1))),i=i.toLowerCase();let r="maj";return i.includes("maj7")?r="maj7":i.includes("min7")||i.includes("m7")?r="min7":i.includes("dim7")?r="dim7":i.includes("dim")?r="dim":i.includes("aug")?r="aug":i.includes("sus")?r="sus4":i==="7"?r="dom7":i.includes("min")||i==="m"?r="min":r="maj",{root:s,quality:r}}function Xt(t,e){const{root:s,quality:i}=ui(t),r=Ae[s]??0;return ms[i].map(o=>It(r+o,e))}async function Tc(){const t=typeof import.meta<"u"?"./":"/",e=t.endsWith("/")?t:`${t}/`,s=`${e}chroma_chords_data.json`,i=`${e}chord_voyager_data.json`;let r=await fetch(s).catch(()=>null);if((!r||!r.ok)&&(r=await fetch(i).catch(()=>null)),(!r||!r.ok)&&(r=await fetch("/chroma_chords_data.json").catch(()=>null)),(!r||!r.ok)&&(r=await fetch("/chord_voyager_data.json").catch(()=>null)),!r||!r.ok){const o=new URL("./chroma_chords_data.json",import.meta.url).href;r=await fetch(o)}if(!r.ok)throw new Error(`HTTP error: ${r.status}`);const n=await r.json();return $c(n),n}const Ac={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Ec={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Ic={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Cc={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Oc={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Nc={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function $c(t){const e=[["MIXOLYDIAN",Ac],["DORIAN",Ec],["LYDIAN",Ic]];for(const[s,i]of e)for(const[r,n]of Object.entries(i)){const o=t.scales[`${n}_MAJOR`];if(!o)continue;const a=`${r}_${s}`,l={};for(const c of Nc[s]){const d=Oc[`${s}_${c}`],h=o.degrees[d];if(!h)continue;const p=JSON.parse(JSON.stringify(h));p.next_chord_options=(p.next_chord_options||[]).map(u=>{if(u.nodeId.startsWith(`${n}_MAJOR_`)){const m=u.nodeId.replace(`${n}_MAJOR_`,""),g=Cc[`${s}_${m}`];if(g)return{name:u.name,nodeId:`${r}_${s}_${g}`}}return u}),l[c]=p}t.scales[a]={root:r,type:s,degrees:l}}}const Rc=[156,192,236],Pc=[242,115,95];function Qt(t,e,s){return t+(e-t)*s}function pi(t){const e=Math.max(0,Math.min(1,t));return"#"+Rc.map((i,r)=>Math.round(Qt(i,Pc[r],e))).map(i=>i.toString(16).padStart(2,"0")).join("")}function Ct(t){const e=Math.max(0,Math.min(1,t));return{size:Math.round(Qt(84,128,e)),radius:Math.round(Qt(40,12,e)),fontSize:Math.round(Qt(21,30,e)),color:pi(e)}}function Mc(t,e,s){return{Tonic:`As the tonic, ${s} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${s} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${s} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${s} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${s} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${s} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${s} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${s} drifts just below home, a soft modal step rather than a hard pull.`}[t]||`${s} colors the progression as the ${t.toLowerCase()} of ${e}.`}function Ze(t,e,s,i){const n=s.degrees[e].chord_name,o=mc[e]??.5,a=Js[s.type]||Js.MAJOR;return{name:gr(n),tag:gc[e]||"move",roman:a[e]||"?",color:pi(o),functionLabel:pr[e]||e,notes:Xt(n,i),scaleLabel:`${s.root} ${fr[s.type]||s.type}`,desc:Mc(pr[e]||e,fr[s.type]||s.type,gr(n)),degree:e,scaleKey:t,tension:o}}function gr(t){const{root:e,quality:s}=ui(t);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[s]??""}`}const Dc={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function cn(t,e){let s=Dc[t]||92;return e==="Tense"&&(s+=6),(e==="Dreamy"||e==="Melancholy")&&(s-=6),s}function hn(t,e,s,i){const r=Math.max(qe,Math.min(ge,i?.length??Xs)),n=yc[e]||"MAJOR",o=bc[s],a=i?.scaleType||(o&&n==="MAJOR"?o:n);let l=i?.key&&it.includes(i.key)?i.key:kc(it),c=`${l}_${a}`;t.scales[c]||(l="C",c=`${l}_${a}`);const d=t.scales[c],h=Re(l,a),p=Object.keys(d.degrees),u=ln[s]||[],m=wc[a]||[],g=r===Xs?m.filter(b=>b.degrees.every(T=>p.includes(T))):[],x=(g.length&&Math.random()<.25?ls(g,b=>xc(b,u)).degrees:Sc(d,c,p,u,e,s,r)).map(b=>Ze(c,b,d,h));return{genre:e,mood:s,key:l,scaleType:a,bpm:cn(e,s),chords:x}}function jc(t,e,s,i,r,n){const o=`${e}_${s}`,a=t.scales[o];if(!a||!i.length)return null;const l=Re(e,s),c=Ae[e]??0,d={};Object.entries(a.degrees).forEach(([p,u])=>{const{root:m}=ui(u.chord_name),g=Ae[m]??0;g in d||(d[g]=p)});const h=i.slice(0,ge).map(({root:p,quality:u})=>{const m=Ae[p]??c,g=d[m];if(g)return Ze(o,g,a,l);const f=(m-c+12)%12,y=ms[u]?u:"maj";return Qs(e,f,y,"Borrowed","?","drift",l)});return h.length<qe?null:{genre:r,mood:n,key:e,scaleType:s,bpm:cn(r,n),chords:h}}function Ps(t,e,s,i,r,n,o){const a=t.filter(d=>e.includes(d)),l=a.filter(d=>d!==s),c=l.length?l:a;if(c.length)return ls(c,d=>Jt(i,d,r,n,o))}const Lc={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Qs(t,e,s,i,r,n,o){const a=(Ae[t]??0)+e,c=`${It(a,o)}${Lc[s]}`,d=ms[s].map(p=>It(a+p,o)),h=.3;return{name:c,tag:n,roman:r,color:pi(h),functionLabel:i,notes:d,scaleLabel:"Borrowed",desc:`${c} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:h}}function Zs(t){const e=t.match(/^[A-Ga-g][#b]?/),s=e?e[0]:"C";return s[0].toUpperCase()+s.slice(1)}const mr={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function ei(t,e,s,i){const r=Ae[t]??0;let n=mr[e]||mr.Major;return s==="6th"?n=[...n,9]:s==="7th (dom / m7)"?n=[...n,10]:s==="Major 7th (M7)"?n=[...n,11]:s==="9th"&&(n=[...n,10,14]),n.map(o=>It(r+o,i))}const Bc={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Uc={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Fc(t,e,s){return e==="Minor"&&s==="Major 7th (M7)"?`${t}m(maj7)`:`${t}${Bc[e]??""}${Uc[s]??""}`}const dn=["C","D","E","F","G","A","B"],fi=10,cs=dn.indexOf("E")+4*7,zc=cs+4*2,ti=20,un=ti+4*fi,qc={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},Gc={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},pn={};it.forEach(t=>{pn[Ae[t]]=t});function fn(t,e){const s=Gc[e]??0,r=(((Ae[t]??0)-s)%12+12)%12;return pn[r]??"C"}function gn(t,e){return qc[fn(t,e)]??[]}function Re(t,e){const s=fn(t,e);return pc.has(s)||s.includes("b")}function Zt(t,e){return It(Ae[t]??0,Re(t,e))}const vr={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function Vc(t){let e=4,s=-1;return t.map(i=>{const r=dn.indexOf(i[0].toUpperCase());return s!==-1&&r<=s&&e++,s=r,r+e*7})}function je(t){return un-(t-cs)*(fi/2)}const ht=10,Ms=46,yr=26,br=14;function Hc(t,e,s){const i=gn(e,s),r=8,n=i.length?i.length*r+6:0,o=i.map(x=>vr[x]),a=t.map(x=>Vc(x.notes)),l=a.flat(),c=Math.min(ti,...l.map(je),...o.map(je)),d=Math.max(un,...l.map(je),...o.map(je)),h=ht+br-c,p=d-c+12+ht+br,u=[0,1,2,3,4].map(x=>ti+x*fi+h),m=ht+yr+n,g=i.map((x,b)=>({x:ht+yr+b*r,y:je(vr[x])+h,sign:x.includes("#")?"sharp":"flat"})),f=t.map((x,b)=>{const T=m+b*Ms+Ms/2,$=a[b],I=$.map(L=>({x:T,y:je(L)+h})),R=[];$.forEach(L=>{(L-cs)%2===0&&(L<cs||L>zc)&&R.push({x:T-9,y:je(L)+h})});const k=Math.min(...I.map(L=>L.y))-10;return{cx:T,name:x.name,roman:x.roman,notes:I,ledgers:R,labelY:k}});return{width:m+t.length*Ms+ht,height:p,lines:u,keySignature:g,chords:f}}function Wc(t,e,s){const i=Zs(t.name),r=i.includes("b");return{...t,name:Fc(i,e,s),notes:ei(i,e,s,r)}}function Kc(t,e,s){const i=e.chords[s],r=t.scales[i.scaleKey],n=Object.keys(r.degrees),o=Re(e.key,e.scaleType),a=[],l=(s-1+e.chords.length)%e.chords.length,c=e.chords[l]?.degree||"TONIC",d=e.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",h=`${e.key}_${d}`,p=t.scales[h],u=Re(e.key,d),m=d==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(p){const b=Ps(m,Object.keys(p.degrees),i.degree,c,e.scaleType,e.genre,e.mood);if(b){const T=Ze(h,b,p,u);a.push({label:"Darker",sub:"heavier, more shadow",chord:T,functionCaption:`Borrowed · ${T.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${d==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const b=d==="NATURAL_MINOR"?Qs(e.key,8,"maj","Submediant","bVI","hold",u):Qs(e.key,5,"maj","Subdominant","IV","lift",u);a.push({label:"Darker",sub:"heavier, more shadow",chord:b,functionCaption:`Borrowed · ${b.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let g=i.scaleKey,f=r;if(e.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const b=`${e.key}_HARMONIC_MINOR`,T=t.scales[b];T?.degrees.DOMINANT&&(g=b,f=T)}const y=Ps(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(f.degrees),i.degree,c,e.scaleType,e.genre,e.mood);if(y){const b=Ze(g,y,f,o);a.push({label:"More tension",sub:"sharper pull forward",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:`Aimed at the ${b.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const x=Ps(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],n,i.degree,c,e.scaleType,e.genre,e.mood);if(x){const b=Ze(i.scaleKey,x,r,o);a.push({label:"Dreamier",sub:"softer, more air",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(n.includes("TONIC")){const b=Ze(i.scaleKey,"TONIC",r,o);a.push({label:"Resolve home",sub:"settles back to center",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const Yc={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Jc={m8:43303,circuit:43302};function Xc(t,e,s){let i=Yc[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(i=`http://localhost:${Jc[e]}/`);const n=(s&&s.length>0?s.map(o=>t.chords[o]).filter(o=>!!o):t.chords).map(o=>encodeURIComponent(o.name)).join("+");return`${i}?p=${n}`}class Qc{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set}setProgression(e,s){this.mode="single",this.progression=e,e?this.order=s||Array.from({length:e.chords.length},(i,r)=>r):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,s)=>e+s.order.length,0):this.order.length}setOrder(e,s){this.order=e,typeof s=="number"&&(this.activeIndex=s)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(s=>s(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(s=>s(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let s=0;for(let i=0;i<this.sections.length;i++){const r=this.sections[i].order.length;if(e<s+r){this.activeSectionIndex=i;const n=e-s;this.activeIndex=this.sections[i].order[n]??0,this.progressStep=n;return}s+=r}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const e=this.getTotalSteps();if(e<=0)return;this.songStep=(this.songStep+1)%e,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},di)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const s=this.activeIndex,i=e.progression.chords[s];if(i){const n=(i.notes&&i.notes.length>0?i.notes:Xt(i.name,Re(e.progression.key,e.progression.scaleType))).map(o=>`${o}4`);ur(n,e.progression.genre,{bpm:e.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0,s=this.progression.chords[e];if(s){let i=Array.isArray(s.notes)?s.notes:[];if(i.length===0||!i.every(r=>typeof r=="string"&&r.trim().length>0)){const r=s.name||"CMAJ",n=this.progression.key||"C",o=this.progression.scaleType||"MAJOR";i=Xt(r,Re(n,o))}this.playChordNotes(i,1.2)}}}playChordAtIndex(e,s=.8){if(!this.progression||!this.progression.chords[e])return;const i=this.progression.chords[e];let r=Array.isArray(i.notes)?i.notes:[];if(r.length===0||!r.every(n=>typeof n=="string"&&n.trim().length>0)){const n=i.name||"CMAJ",o=this.progression.key||"C",a=this.progression.scaleType||"MAJOR";r=Xt(n,Re(o,a))}this.playChordNotes(r,s)}playChordNotes(e,s){if(!this.progression)return;const i=Array.isArray(e)?e.filter(o=>typeof o=="string"&&o.trim().length>0):[];if(i.length===0)return;const n=i.map(o=>o.replace(/\d+$/,"")).map(o=>`${o}4`);ur(n,this.progression.genre||"Unknown",{bpm:this.progression.bpm||120,duration:s||.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const O=new Qc,Zc=Pe.map(t=>t.name),eh=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function th(t,e){const s=t.length+1,i=e.length+1,r=Array.from({length:s},()=>new Array(i).fill(0));for(let n=0;n<s;n++)r[n][0]=n;for(let n=0;n<i;n++)r[0][n]=n;for(let n=1;n<s;n++)for(let o=1;o<i;o++)r[n][o]=t[n-1]===e[o-1]?r[n-1][o-1]:1+Math.min(r[n-1][o-1],r[n-1][o],r[n][o-1]);return r[s-1][i-1]}function ze(t,e){if(typeof t!="string")return null;const s=t.trim();if(!s)return null;const i=s.toLowerCase(),r=e.find(l=>l.toLowerCase()===i);if(r)return r;let n=null,o=1/0;for(const l of e){const c=th(i,l.toLowerCase());c<o&&(o=c,n=l)}const a=Math.max(2,Math.floor(i.length*.4));return o<=a?n:null}function sh(t){if(!Array.isArray(t))return;const e=[];for(const s of t){if(!s||typeof s!="object")continue;const i=s,r=ze(i.root,it),n=ze(i.quality,fc);r&&n&&e.push({root:r,quality:n})}if(e.length)return e.slice(0,ge)}function ih(t){if(!t||typeof t!="object"||Array.isArray(t))return;const e=t,s=ze(e.presetId,eh)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!s)return;const i=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:s,customConfig:i}}function Ds(t,e){const s=t&&typeof t=="object"?t:{},i=ze(s.genre,vt)??e.genre,r=ze(s.mood,Zc)??e.mood,n=ze(s.key,it)??void 0,o=ze(s.scaleType,vc)??void 0,a=n&&o?sh(s.chords):void 0;let l;typeof s.length=="number"&&Number.isFinite(s.length)&&(l=Math.max(qe,Math.min(ge,Math.round(s.length))));const c=typeof s.rhythmStyle=="string"&&s.rhythmStyle.trim()?s.rhythmStyle.trim():void 0,d=ih(s.instrumentConfig),h=s._rateLimit&&typeof s._rateLimit=="object"?s._rateLimit:void 0;return{genre:i,mood:r,key:n,scaleType:o,length:l,chords:a,rhythmStyle:c,instrumentConfig:d,_rateLimit:h}}const rh=[{id:"deepseek-v4-flash-free",name:"DeepSeek V4 Flash Free",provider:"opencodeai",vendor:"DeepSeek"},{id:"mimo-v2.5-free",name:"MiMo V2.5 Free",provider:"opencodeai",vendor:"Xiaomi"},{id:"laguna-s-2.1-free",name:"Laguna S 2.1 Free",provider:"opencodeai",vendor:"Stealth"},{id:"ling-3.0-flash-free",name:"Ling-3.0-flash Free",provider:"opencodeai",vendor:"Stealth"},{id:"nemotron-3-ultra-free",name:"Nemotron 3 Ultra Free",provider:"opencodeai",vendor:"NVIDIA"},{id:"north-mini-code-free",name:"North Mini Code Free",provider:"opencodeai",vendor:"Stealth"}],si=[{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash-Lite",provider:"google",vendor:"Google"},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",provider:"google",vendor:"Google"},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash",provider:"google",vendor:"Google"}],mn="chroma-chords-llm-provider",vn="chroma-chords-llm-model";function yn(){const t=localStorage.getItem(mn);return t==="opencodeai"||t==="anthropic"||t==="openrouter"||t==="google"?t:"google"}function nh(t){localStorage.setItem(mn,t)}function bn(){const t=localStorage.getItem(vn);return t?t==="gemini-1.5-flash"||t==="gemini-2.0-flash"||t==="gemini-2.5-flash"||t==="gemini-3.5-flash"||t==="gemini-1.5-pro"?"gemini-3.1-flash-lite":t:si[0].id}function js(t){localStorage.setItem(vn,t)}const Ls={genre:vt[0],mood:Pe[0].name},wn="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",oh=12e3;async function ah(){try{const t=await fetch(wn);if(t.ok)return await t.json()}catch{}return null}const xn={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},kn={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function hs(t,e){const s=t.toLowerCase();let i=null,r=0;return Object.keys(e).forEach(n=>{const o=e[n].reduce((a,l)=>a+(s.includes(l)?1:0),0);o>r&&(r=o,i=n)}),i}function ii(t){const e=hs(t,kn),s=hs(t,xn);return!e||!s?null:{genre:e,mood:s}}let gi=null;function lh(t){gi=t}function ch(){return gi}async function hh(t,e){const s=new AbortController,i=setTimeout(()=>s.abort(),oh),r=gi;try{const n={"Content-Type":"application/json"};r&&(n.Authorization=`Bearer ${r}`);const o=await fetch(wn,{method:"POST",headers:n,body:JSON.stringify({text:t,provider:yn(),model:bn()}),signal:s.signal}),a=await o.json().catch(()=>null);if(!o.ok||a&&typeof a=="object"&&"error"in a){const l=a&&typeof a=="object"&&"error"in a?String(a.error):`HTTP ${o.status}`,c=new Error(`Classifier request failed: ${l}`);throw a&&typeof a=="object"&&"_rateLimit"in a&&(c._rateLimit=a._rateLimit),c}return a}finally{clearTimeout(i)}}async function _n(t,e){const s=t.trim(),i=s.toLowerCase();if(i.startsWith("mock")||i.startsWith("test")){const n=s.replace(/^(mock|test)\s*:?\s*/i,"").trim(),o=hs(n,kn)??"Synthwave",a=hs(n,xn)??"Dreamy",l={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},c={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},d={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},h=d[o]||d._default,p=l[o]||"rhodes",u=c[o]||"slow_arpeggio",m={genre:o,mood:a,key:h.key,scaleType:h.scaleType,length:8,chords:h.chords,rhythmStyle:u,instrumentConfig:{presetId:p,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return Ds(m,{genre:o,mood:a})}const r=ii(t);try{const n=await hh(t,e);return Ds(n,r??Ls)}catch(n){console.warn("LLM classification failed, falling back to keyword heuristic:",n);const o=Ds(r??Ls,Ls);return n&&typeof n=="object"&&"_rateLimit"in n&&(o._rateLimit=n._rateLimit),o}}class dh{static setGoogleToken(e){lh(e)}static getGoogleToken(){return ch()}static async resolvePrompt(e,s,i,r,n,o){let a=o||null,l=null,c=null;if(!a&&n&&n.trim().length>0)try{a=await _n(n)}catch(p){console.warn("Failed to classify prompt via LLM/local fallback:",p)}const d=!!(a&&a.chords?.length&&a.key&&a.scaleType);let h=null;return d&&a&&a.chords&&a.key&&a.scaleType&&(h=jc(e,a.key,a.scaleType,a.chords,a.genre||s,a.mood||i)),h||(h=hn(e,s,i,{length:r})),d&&a&&(a.instrumentConfig?.presetId&&(l=lc(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(c=cc(a.rhythmStyle)??null)),h.chords.length>r&&(h={...h,chords:h.chords.slice(0,r)}),n&&(h={...h,searchTerm:n}),{progression:h,instrument:l,playStyle:c,normalizedSuggestion:a}}}const ft=[{name:"Verse",desc:"Settled, familiar.",reorder:t=>Array.from({length:t},(e,s)=>s)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:t=>Array.from({length:t},(e,s)=>(s+Math.ceil(t/2))%t)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:t=>Array.from({length:t},(e,s)=>(s+1)%t)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:t=>Array.from({length:t},(e,s)=>t-1-s)},{name:"Outro",desc:"Settles back down.",reorder:t=>Array.from({length:t},(e,s)=>(s-1+t)%t)}];class qt{static createInitialSong(e,s){const i=s||Array.from({length:e.chords.length},(r,n)=>n);return[{name:ft[0].name,desc:ft[0].desc,progression:e,order:i.slice()}]}static addSection(e,s){if(e.length>=ft.length)return{sections:e,activeIndex:e.length-1};const i=ft[e.length],r=i.reorder(s.chords.length),n={name:i.name,desc:i.desc,progression:s,order:r},o=[...e,n];return{sections:o,activeIndex:o.length-1}}static syncActiveSection(e,s,i,r){if(!e[s])return e;const n=[...e];return n[s]={...n[s],progression:i,order:r.slice()},n}}var uh=Object.defineProperty,ph=Object.getOwnPropertyDescriptor,mi=(t,e,s,i)=>{for(var r=i>1?void 0:i?ph(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&uh(e,s,r),r};const ri=["bean","bird","cat","note"];function rt(t=.45){return{show:Math.random()<t,kind:ri[Math.floor(Math.random()*ri.length)]}}function Ot(t){return t[Math.floor(Math.random()*t.length)]}class vi{constructor(e=7,s=1800){this.threshold=e,this.windowMs=s,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const fh={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Nt=class extends he{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(t){if(t.has("kind")||t.has("scale")){const{width:e,height:s}=fh[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${s*this.scale}px`}}renderBean(){const t="#D98A54";return v`
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
    `}renderBird(){const t="#7C93A8",e="#E8A24A";return v`
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
    `}renderCat(){const t="#8FA888";return v`
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
    `}renderNote(){const t="#B7A6DE",e="#8672B0";return v`
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
    `}render(){const t=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return t?v`<div style="transform:scale(${this.scale}); transform-origin:top left;">${t}</div>`:Or}};Nt.styles=ce`
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
  `;mi([E({type:String})],Nt.prototype,"kind",2);mi([E({type:Number})],Nt.prototype,"scale",2);Nt=mi([de("mascot-character")],Nt);var gh=Object.defineProperty,mh=Object.getOwnPropertyDescriptor,yi=(t,e,s,i)=>{for(var r=i>1?void 0:i?mh(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&gh(e,s,r),r};const ni=3200;let $t=class extends he{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(t){t.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},ni))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?v`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${ri.map(t=>v`<mascot-character .kind=${t} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:Or}};$t.styles=ce`
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
      animation: egg-pop ${ni}ms ease forwards;
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
      animation: egg-caption-pop ${ni}ms ease forwards;
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
  `;yi([E({type:Number})],$t.prototype,"trigger",2);yi([w()],$t.prototype,"visible",2);$t=yi([de("mascot-parade")],$t);var vh=Object.defineProperty,yh=Object.getOwnPropertyDescriptor,D=(t,e,s,i)=>{for(var r=i>1?void 0:i?yh(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&vh(e,s,r),r};const bh=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],wh=800,ee=4,Ie=45e3,wr="chroma_chords_capacity_v2",xh=["#F2A79B","#9CC0EC","#F6D98B"],kh=[6,3,12],xr=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],_h=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Sh=["Warm","Melancholy","Nostalgic","Dreamy"],kr=["Drew a total blank on that one — good thing there's a picker right below.","That one stumped us completely. The genre & mood dials still work great, though.","Our ears just short-circuited. Manual mode has never let anyone down.","No idea, honestly — but you clearly do. Pick a genre & mood below."],Gt=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let P=class extends he{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=rt(.35),this.mascotSlot=Ot(bh),this.peekMascot=rt(.18),this.peekSide=Ot(["left","right"]),this.isAuthenticated=!1,this.userEmail=null,this.isAdmin=!1,this.currentProvider=yn(),this.currentModel=bn(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.googleRemaining=15,this.googleLimit=15,this.googleCooldownSec=4,this.orRemaining=50,this.orLimit=50,this.capacityCharges=ee,this.rechargeNextSec=45,this.showCapacityNote=!1,this.lastCapacityTime=Date.now(),this.capacityTimer=null,this.loadingTimer=null,this.cooldownTimer=null,this.eggCounter=new vi,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const t=performance.now(),e=this.getBoundingClientRect(),s=e.width>0?e.width:typeof window<"u"?window.innerWidth:800;let i=e.height>0?e.height:typeof window<"u"?window.innerHeight:600;const r=this.shadowRoot?.querySelector(".divider-row");if(r){const a=r.getBoundingClientRect();a.top>e.top&&(i=a.top-e.top)}const n=this.jellyBodies,o=n.length;for(let a=0;a<o;a++){const l=n[a];if(l.vx+=Math.sin(t*6e-4*l.driftFreqX+l.driftPhaseX)*l.driftForce,l.vy+=Math.cos(t*7e-4*l.driftFreqY+l.driftPhaseY)*l.driftForce,this.mouseX!==null&&this.mouseY!==null){const h=l.x-this.mouseX,p=l.y-this.mouseY,u=Math.hypot(h,p);if(u<140&&u>0){const m=(1-u/140)*.12;l.vx+=h/u*m,l.vy+=p/u*m}}l.vx*=l.drag,l.vy*=l.drag;const c=Math.hypot(l.vx,l.vy);c>l.maxSpeed&&(l.vx=l.vx/c*l.maxSpeed,l.vy=l.vy/c*l.maxSpeed),l.x+=l.vx,l.y+=l.vy,l.angle+=l.vRot;const d=l.radius;l.x<d?(l.x=d,l.vx=Math.abs(l.vx)*l.restitution+.02,l.squishX=.88,l.squishY=1.12):l.x>s-d&&(l.x=s-d,l.vx=-Math.abs(l.vx)*l.restitution-.02,l.squishX=.88,l.squishY=1.12),l.y<d?(l.y=d,l.vy=Math.abs(l.vy)*l.restitution+.02,l.squishX=1.12,l.squishY=.88):l.y>i-d&&(l.y=i-d,l.vy=-Math.abs(l.vy)*l.restitution-.02,l.squishX=1.12,l.squishY=.88),l.squishX+=(1-l.squishX)*.08,l.squishY+=(1-l.squishY)*.08}for(let a=0;a<o;a++)for(let l=a+1;l<o;l++){const c=n[a],d=n[l],h=d.x-c.x,p=d.y-c.y,u=Math.hypot(h,p),m=c.radius+d.radius;if(u<m&&u>0){const g=m-u,f=h/u,y=p/u;c.x-=f*g*.4,c.y-=y*g*.4,d.x+=f*g*.4,d.y+=y*g*.4;const x=c.vx-d.vx,b=c.vy-d.vy,T=(f*x+y*b)/(c.mass+d.mass),$=.35;c.vx-=T*d.mass*f*$,c.vy-=T*d.mass*y*$,d.vx+=T*c.mass*f*$,d.vy+=T*c.mass*y*$;const I=.12;c.squishX=Math.max(.85,1-I*Math.abs(f)),c.squishY=Math.max(.85,1-I*Math.abs(y)),d.squishX=Math.max(.85,1-I*Math.abs(f)),d.squishY=Math.max(.85,1-I*Math.abs(y))}}if(this.shadowRoot)for(let a=0;a<o;a++){const l=n[a],c=this.shadowRoot.getElementById(`jelly-${l.id}`);c&&(c.style.transform=`translate3d(${l.x-l.radius}px, ${l.y-l.radius}px, 0) rotate(${l.angle}deg) scale(${l.squishX}, ${l.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0,this.generate=()=>{if(this.capacityCharges<=0){this.showCapacityNote=!0;return}this.spendCapacityCharge(),this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}}initCapacity(){try{const t=localStorage.getItem(wr),e=Date.now();if(t){const s=JSON.parse(t),i=typeof s.charges=="number"?s.charges:ee,r=typeof s.lastTime=="number"?s.lastTime:e;if(i<ee){const n=Math.max(0,e-r),o=Math.floor(n/Ie);this.capacityCharges=Math.min(ee,i+o);const a=n%Ie;this.rechargeNextSec=Math.max(1,Math.ceil((Ie-a)/1e3)),this.lastCapacityTime=e-a}else this.capacityCharges=ee,this.rechargeNextSec=45,this.lastCapacityTime=e}else this.capacityCharges=ee,this.rechargeNextSec=45,this.lastCapacityTime=e}catch{this.capacityCharges=ee,this.rechargeNextSec=45}this.saveCapacity(),this.startCapacityRechargeTimer()}saveCapacity(){try{localStorage.setItem(wr,JSON.stringify({charges:this.capacityCharges,lastTime:this.lastCapacityTime}))}catch{}}startCapacityRechargeTimer(){this.capacityTimer&&clearInterval(this.capacityTimer),this.capacityTimer=setInterval(()=>{if(this.capacityCharges<ee){const t=Date.now(),e=Math.max(0,t-this.lastCapacityTime);if(e>=Ie){const i=Math.floor(e/Ie);this.capacityCharges=Math.min(ee,this.capacityCharges+i),this.lastCapacityTime=t-e%Ie,this.saveCapacity()}const s=(t-this.lastCapacityTime)%Ie;this.rechargeNextSec=Math.max(1,Math.ceil((Ie-s)/1e3))}else this.rechargeNextSec=45},1e3)}spendCapacityCharge(){return this.capacityCharges<=0?(this.showCapacityNote=!0,!1):(this.capacityCharges===ee&&(this.lastCapacityTime=Date.now()),this.capacityCharges-=1,this.saveCapacity(),!0)}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*Gt.length),this.loadingTimer=setInterval(()=>{let t=Math.floor(Math.random()*Gt.length);t===this.loadingMsgIdx&&(t=(t+1)%Gt.length),this.loadingMsgIdx=t},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(t){this.currentProvider=t,nh(t),t==="google"?(this.currentModel=si[0].id,js(this.currentModel)):t==="opencodeai"&&(this.currentModel=rh[0].id,js(this.currentModel))}changeModel(t){this.currentModel=t,js(t)}initJellyBodies(){const t=this.getBoundingClientRect(),e=t.width>0?t.width:typeof window<"u"?window.innerWidth:800;let s=t.height>0?t.height:typeof window<"u"?window.innerHeight:600;const i=Math.min(s,400),r=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"pill",r:16},{key:"arch",r:15},{key:"squircle",r:16}],n=3,o=[];for(let a=0;a<n;a++){const l=r[a%r.length],c=l.r+30,d=c+Math.random()*Math.max(100,e-c*2),h=c+Math.random()*Math.max(50,i-c*2),p=.08+Math.random()*.18,u=.35+Math.random()*.25,m=.985,g=.006+Math.random()*.008,f=.35,y=Math.random()*Math.PI*2;o.push({id:a,shapeKey:l.key,width:l.r*2,height:l.r*2,x:d,y:h,vx:Math.cos(y)*p,vy:Math.sin(y)*p,maxSpeed:u,drag:m,driftForce:g,restitution:f,radius:l.r,mass:l.r*l.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=o}onFrameMouseMove(t){const e=this.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}get currentLimit(){return this.currentProvider==="openrouter"?this.orLimit:this.googleLimit}get currentRemaining(){return this.currentProvider==="openrouter"?this.orRemaining:this.googleRemaining}loadKeyInfo(){ah().then(t=>{t&&(t.google&&(this.googleLimit=t.google.limit,this.googleRemaining=t.google.remaining,this.googleCooldownSec=t.google.cooldownSeconds),t.openrouter&&(this.orLimit=t.openrouter.limit,this.orRemaining=t.openrouter.remaining),this.startCooldownTimer())})}startCooldownTimer(){this.cooldownTimer&&clearInterval(this.cooldownTimer),this.cooldownTimer=setInterval(()=>{this.googleRemaining<this.googleLimit?this.googleRemaining+=1:this.cooldownTimer&&(clearInterval(this.cooldownTimer),this.cooldownTimer=null)},this.googleCooldownSec*1e3)}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%xr.length},2800),this.initCapacity(),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(t){super.updated(t),t.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.cooldownTimer&&clearInterval(this.cooldownTimer),this.capacityTimer&&clearInterval(this.capacityTimer),this.stopLoadingTimer()}selectGenre(t){this.dispatchEvent(new CustomEvent("genre-change",{detail:t,bubbles:!0,composed:!0}))}selectMood(t){this.dispatchEvent(new CustomEvent("mood-change",{detail:t,bubbles:!0,composed:!0}))}setLength(t){this.dispatchEvent(new CustomEvent("length-change",{detail:t,bubbles:!0,composed:!0}))}decLength(){this.length>qe&&this.setLength(this.length-1)}incLength(){this.length<ge&&this.setLength(this.length+1)}onFreeTextChange(t){this.freeText=t.target.value,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.freeText.trim().length<=2&&(this.isClassifying=!1),this.scheduleClassify();const e=this.freeText.trim();if(e.length>2){const s=ii(e);s&&this.applyBest(s)}}scheduleClassify(){this.classifyDebounce&&clearTimeout(this.classifyDebounce);const t=this.freeText.trim(),e=t.toLowerCase();if(t.length<=2||["m","mo","moc","t","te","tes"].includes(e)){this.isClassifying=!1;return}const s=++this.classifyToken;this.classifyDebounce=setTimeout(async()=>{this.isClassifying=!0;try{const i=await _n(t);if(s!==this.classifyToken)return;i?._rateLimit?.remaining!==void 0?i._rateLimit.provider==="google"||this.currentProvider==="google"?(this.googleRemaining=i._rateLimit.remaining,i._rateLimit.limit&&(this.googleLimit=i._rateLimit.limit),i._rateLimit.cooldownSeconds&&(this.googleCooldownSec=i._rateLimit.cooldownSeconds)):(this.orRemaining=i._rateLimit.remaining,i._rateLimit.limit&&(this.orLimit=i._rateLimit.limit)):this.currentProvider==="google"?this.googleRemaining=Math.max(0,this.googleRemaining-1):this.currentProvider==="openrouter"&&(this.orRemaining=Math.max(0,this.orRemaining-1)),this.startCooldownTimer(),this.llmSuggestion=i,this.llmResolved=!0,this.classifyError=i?null:kr[Math.floor(Math.random()*kr.length)],i&&this.applyBest(i)}finally{s===this.classifyToken&&(this.isClassifying=!1)}},wh)}applyBest(t){this.selectGenre(t.genre),this.selectMood(t.mood);const e={...t,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:e,bubbles:!0,composed:!0}))}renderJellySvg(t){switch(t){case"blob1":return v`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return v`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return v`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return v`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return v`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return v`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return v`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return v`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return v`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return v`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return v`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return v`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return v`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return v`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const t=Et(this.mood);let e=_h.filter(f=>vt.includes(f));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const s=vt.filter(f=>!e.includes(f)),i=this.expandedGenre?e.concat(s):e,r=Pe.map(f=>f.name);let n=Sh.filter(f=>r.includes(f));n.includes(this.mood)||(n=n.slice(0,-1).concat(this.mood));const o=r.filter(f=>!n.includes(f)),l=(this.expandedMood?n.concat(o):n).map(f=>Pe.find(y=>y.name===f)),c=this.freeText.trim();let d=null;c.length>2&&(d=this.llmResolved?this.llmSuggestion:ii(c));const h=this.capacityCharges,p=8,u=360/ee,m=[];for(let f=0;f<ee;f++){const y=f*u;m.push(`${f<h?"#F2A79B":"rgba(46,39,31,0.13)"} ${y}deg ${y+u-p}deg`),m.push(`transparent ${y+u-p}deg ${y+u}deg`)}const g=`conic-gradient(from -90deg, ${m.join(", ")})`;return v`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <div class="aquarium-layer">
          ${this.jellyBodies.map(f=>v`
            <div class="jelly-shape-wrapper" id="jelly-${f.id}" style="transform: translate3d(${f.x-f.radius}px, ${f.y-f.radius}px, 0) rotate(${f.angle}deg) scale(${f.squishX}, ${f.squishY})">
              ${this.renderJellySvg(f.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?v`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}
        
        ${this.isAuthenticated?v`
          <div class="your-sets-btn" @click=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        `:""}
        
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30">
            <circle cx="11" cy="11" r="9" fill="#F2A79B" />
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
          </svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <h1>Describe a vibe,<br />hear it as chords.</h1>
            <div class="subcopy">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show?v`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div
              class="capacity-ring-shell ${this.capacityCharges===0?"pulsing":""}"
              style="background: ${g};"
              @click=${()=>{this.showCapacityNote=!this.showCapacityNote}}
            >
              <div class="vibe-input-wrap">
                ${this.isClassifying?v`
                  <div class="vibe-input-icon" title="Classifying vibe...">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                `:""}
                <input
                  type="text"
                  class="vibe-input"
                  .value=${this.freeText}
                  @input=${f=>this.onFreeTextChange(f)}
                  @keydown=${f=>{f.key==="Enter"&&(f.preventDefault(),this.generate())}}
                  placeholder=${xr[this.placeholderIdx]}
                />
                ${this.isAdmin?v`
                  <button class="vibe-admin-btn" @click=${f=>{f.stopPropagation(),this.showAdminModal=!0}} title="AI Model Configuration">
                    ⚡ ${this.currentProvider==="google"?`Google AI (${this.googleRemaining} left)`:this.currentProvider==="anthropic"?"Claude":`OpenRouter (${this.orRemaining} left)`}
                  </button>
                `:""}
                <button
                  class="vibe-submit-btn ${!this.freeText.trim()||this.capacityCharges<=0?"disabled":""}"
                  style="background: ${t}; opacity: ${this.capacityCharges>0?"1":"0.4"};"
                  @click=${f=>{f.stopPropagation(),this.generate()}}
                  aria-label="Hear this vibe as chords"
                  title="Generate progression from vibe"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            ${this.showCapacityNote?v`
              <div class="capacity-note" @click=${()=>{this.showCapacityNote=!1}}>
                ${this.capacityCharges>0?`${this.capacityCharges} of ${ee} generates left`:`Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            `:""}
          </div>
          ${this.isClassifying?v`
            <div class="suggestion-wrap">
              <div class="suggestion-note loading">✨ ${Gt[this.loadingMsgIdx]}</div>
            </div>
          `:d?v`
            <div class="suggestion-wrap">
              <div class="suggestion-note">Sounds like <span class="suggestion-highlight" style="color:${t}">${d.genre} · ${d.mood}</span> — the picks below already match.</div>
            </div>
          `:this.classifyError?v`
            <div class="suggestion-wrap">
              <div class="suggestion-note error">${this.classifyError}</div>
            </div>
          `:""}

          <div class="divider-row">
            <div class="divider-rule"></div>
            <div class="divider-label">or pick it yourself</div>
            <div class="divider-rule"></div>
          </div>

          <div class="section-label">Genre</div>
          <div class="pill-grid">
            ${i.map(f=>{const y=vt.indexOf(f);return v`
                <div class="pill ${f===this.genre?"selected":""}" style=${f===this.genre?`background:${t}`:""} @click=${()=>this.selectGenre(f)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${kh[y%3]} fill=${xh[y%3]} />
                    </svg>
                  </div>
                  ${f}
                </div>
              `})}
            ${s.length?v`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${s.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${l.map(f=>v`
              <div class="pill mood-pill ${f.name===this.mood?"selected":""}" style=${f.name===this.mood?`background:${f.dot}`:""} @click=${()=>this.selectMood(f.name)}>
                <div class="mood-badge" style="background:${f.name===this.mood?"rgba(46,39,31,0.1)":f.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${f.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${f.iconPath} />
                  </svg>
                </div>
                ${f.name}
              </div>
            `)}
            ${o.length?v`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${o.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=qe?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:ge},(f,y)=>v`
                <div class="length-segment ${y<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=ge?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button
            class="cta ${this.capacityCharges<=0?"disabled":""}"
            style="background:${t}; opacity: ${this.capacityCharges>0?"1":"0.4"};"
            @click=${this.generate}
          >
            ${d?"Let's go to your progression":"Generate loop"} <span>→</span>
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
            <span class="footer-divider">·</span>
            ${this.isAuthenticated?v`
              <span class="footer-user-email">${this.userEmail?this.userEmail.split("@")[0]:"Signed in"}</span>
              <button class="footer-login-btn" @click=${this.onLogoutClick}>Sign out</button>
            `:v`
              <button class="footer-login-btn" @click=${this.onLoginClick}>Sign in</button>
            `}
          </div>
        </div>

        ${this.showAdminModal?v`
          <div class="admin-modal-backdrop" @click=${()=>{this.showAdminModal=!1}}>
            <div class="admin-modal" @click=${f=>f.stopPropagation()}>
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
                  ${this.currentProvider==="google"?v`
                    <div class="model-sub-list" @click=${f=>f.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${si.map(f=>v`
                        <div class="model-sub-opt ${this.currentModel===f.id?"selected":""}" @click=${()=>this.changeModel(f.id)}>
                          <span>${f.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${f.vendor}</span>
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
    `}};P.styles=ce`
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
      padding: 36px 40px 80px;
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
      margin-top: 20px;
    }
    .hero {
      position: relative;
      text-align: center;
      margin-bottom: 24px;
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
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 12px;
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
      background: var(--cv-cream);
      background-clip: padding-box;
      border: 1.5px solid transparent;
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
    }
    .capacity-ring-shell {
      position: relative;
      border-radius: 104px;
      padding: 4px;
      cursor: pointer;
      transition: background 320ms ease;
    }
    .capacity-ring-shell.pulsing {
      animation: cvfv-ring-pulse 2s ease-in-out infinite;
    }
    @keyframes cvfv-ring-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(242, 167, 155, 0.55); }
      50% { box-shadow: 0 0 0 6px rgba(242, 167, 155, 0); }
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
      width: 38px;
      height: 38px;
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
    .vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.55);
      opacity: 1;
      transition: color 0.3s ease;
    }
    :focus-visible {
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
      margin: 32px 0 8px;
    }
    .divider-rule {
      flex: 1;
      height: 1px;
      background: var(--cv-ink-14);
    }
    .divider-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      white-space: nowrap;
    }
    .section-label {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      text-align: center;
    }
    .pill-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      justify-content: center;
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
      background: var(--cv-surface-2);
      border-radius: 20px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
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
      gap: 10px;
      cursor: pointer;
      margin-top: 36px;
      transition: transform 160ms var(--cv-ease);
    }
    .cta:active {
      transform: scale(0.97);
    }
    .caption {
      text-align: center;
      font-size: 11.5px;
      color: var(--cv-ink-45);
      margin-top: 12px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
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

    @media (min-width: 640px) {
      .content { max-width: 620px; }
      .frame { padding-top: 56px; }
    }

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    /* Real gutter space beside the centered .content column only exists on wider viewports —
       and mobile's short-viewport spacing above is tuned to fit exactly, with nothing to spare. */
    @media (min-width: 980px) and (min-height: 700px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 40px; }
      .mascot-slot.right { right: 40px; }
    }

    /* Short mobile viewports (the constraint is vertical space, not width) — tighten spacing
       throughout so the whole picker, including the CTA, stays visible without scrolling. */
    @media (max-height: 920px) {
      .frame { padding: 18px 26px 16px; }
      .hero { margin-bottom: 14px; }
      h1 { font-size: clamp(24px, 6.5vw, 34px); }
      .subcopy { margin-top: 6px; font-size: 13.5px; line-height: 1.45; }
      .vibe-input-shell { margin-top: 16px; }
      .vibe-input-wrap { padding: 6px 8px 6px 16px; }
      .vibe-input { padding: 7px 0; font-size: 14px; }
      .suggestion-wrap { margin-top: 6px; }
      .divider-row { margin: 16px 0 4px; }
      .section-label { margin-top: 14px; margin-bottom: 7px; }
      .pill-grid { gap: 6px; }
      .pill { padding: 6px 14px 6px 9px; font-size: 13px; }
      .genre-icon-wrap { width: 18px; height: 18px; margin-right: 6px; }
      .mood-badge { width: 20px; height: 20px; margin-right: 6px; }
      .length-control { padding: 10px 16px; gap: 10px; }
      .length-btn { width: 26px; height: 26px; }
      .cta { margin-top: 16px; padding: 13px; font-size: 14.5px; }
      .caption { margin-top: 6px; font-size: 11px; }
      .footer { margin-top: 12px; font-size: 11px; }
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
  `;D([E({type:String})],P.prototype,"genre",2);D([E({type:String})],P.prototype,"mood",2);D([E({type:Number})],P.prototype,"length",2);D([w()],P.prototype,"freeText",2);D([w()],P.prototype,"placeholderIdx",2);D([w()],P.prototype,"llmSuggestion",2);D([w()],P.prototype,"llmResolved",2);D([w()],P.prototype,"classifyError",2);D([w()],P.prototype,"expandedGenre",2);D([w()],P.prototype,"expandedMood",2);D([w()],P.prototype,"mascot",2);D([w()],P.prototype,"mascotSlot",2);D([w()],P.prototype,"peekMascot",2);D([w()],P.prototype,"peekSide",2);D([E({type:Boolean})],P.prototype,"isAuthenticated",2);D([E({type:String})],P.prototype,"userEmail",2);D([E({type:Boolean})],P.prototype,"isAdmin",2);D([w()],P.prototype,"currentProvider",2);D([w()],P.prototype,"currentModel",2);D([w()],P.prototype,"showAdminModal",2);D([w()],P.prototype,"isClassifying",2);D([w()],P.prototype,"loadingMsgIdx",2);D([w()],P.prototype,"googleRemaining",2);D([w()],P.prototype,"googleLimit",2);D([w()],P.prototype,"googleCooldownSec",2);D([w()],P.prototype,"orRemaining",2);D([w()],P.prototype,"orLimit",2);D([w()],P.prototype,"capacityCharges",2);D([w()],P.prototype,"rechargeNextSec",2);D([w()],P.prototype,"showCapacityNote",2);D([w()],P.prototype,"paradeTrigger",2);P=D([de("seed-screen")],P);var Th=Object.defineProperty,Ah=Object.getOwnPropertyDescriptor,K=(t,e,s,i)=>{for(var r=i>1?void 0:i?Ah(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&Th(e,s,r),r};const Eh=["C","D","E","F","G","A","B"],Ih=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],Ch=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Oh=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}];let V=class extends he{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=0,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=t=>{t.preventDefault(),this.dragStartY=t.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=t=>{this.dragging&&(this.dragY=Math.max(0,t.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const t=Math.max(1,performance.now()-this.dragStartTime),e=this.dragY/t,s=this.sheetEl?.getBoundingClientRect().height||400,i=this.dragY>s*.3||e>.6;this.snapping=!0,i?(this.dragY=s+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(t){t.target===t.currentTarget&&this.close()}setQuality(t){this.quality=t,this.previewVoicing(),this.commitVoicing()}setExtension(t){this.extension=t,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const t=Zs(this.chord.name),e=t.includes("b"),s=ei(t,this.quality,this.extension,e);this.emit("voicing-preview",s)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(t){t.has("resetKey")&&(this.quality="Major",this.extension="None")}render(){const t=this.chord,e=Zs(t.name),s=e.includes("b"),i=this.mode==="voicing"?ei(e,this.quality,this.extension,s):t.notes,r=Ct(t.tension),n=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return v`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${n} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div>
            ${this.mode==="voicing"?v`
              <div class="step-label">Chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Adjust the voicing.</div>
            `:v`
              <div class="step-label">Swap chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Choose the feeling<br />you want instead.</div>
            `}
          </div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>

        <div class="sheet-body">
        <div class="current-row">
          <div class="alt-shape" style="width:${Math.round(r.size*.5)}px;height:${Math.round(r.size*.5)}px;border-radius:${Math.round(r.radius*.5)}px;background:${r.color};"></div>
          <div>
            <div class="current-label">${this.mode==="voicing"?t.functionLabel:"Currently"}</div>
            <div class="current-name">${this.mode==="voicing"?t.name:v`${t.name} — ${t.functionLabel}`}</div>
          </div>
        </div>

        ${this.mode==="swap"?v`
          <div class="alt-list">
            ${this.alternatives.map(o=>{const a=Ct(o.chord.tension),l=Math.round(a.size*.4);return v`
                <div class="alt-row" @click=${()=>this.emit("select-alternative",o)}>
                  <div class="alt-shape" style="width:${l}px;height:${l}px;border-radius:${Math.round(a.radius*(l/a.size))}px;background:${a.color};"></div>
                  <div style="flex:1;min-width:0;">
                    <div class="alt-name">${o.label}</div>
                    <div class="alt-sub">${o.sub}</div>
                    ${this.showTheory?v`
                      <div class="alt-tag">${o.functionCaption}</div>
                      <div class="alt-desc">${o.rationale}</div>
                    `:""}
                  </div>
                  <div class="alt-arrow">→</div>
                </div>
              `})}
          </div>
        `:""}

        ${this.mode==="voicing"?v`
          <div class="voicing-section">
            <div>
              <div class="bento">
                ${Ch.map(o=>v`
                  <div class="bento-card" style=${o.label===this.quality?`background:${this.moodColor}`:""} @click=${()=>this.setQuality(o.label)}>
                    <div class="bento-label">${o.label}</div>
                    <div class="bento-sub">${o.sub}</div>
                  </div>
                `)}
              </div>
              <div class="bento ext">
                ${Oh.map((o,a)=>v`
                  <div class="bento-card ${a===0?"span":""}" style=${o.label===this.extension?`background:${this.moodColor}`:""} @click=${()=>this.setExtension(o.label)}>
                    <div class="bento-label">${o.label}</div>
                    <div class="bento-sub">${o.sub}</div>
                  </div>
                `)}
              </div>
              <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
              <div class="keyboard">
                ${Eh.map(o=>v`
                  <div class="white-key ${i.includes(o)?"active":""}" style=${i.includes(o)?`background:${this.moodColor}`:""}>${o}</div>
                `)}
                ${Ih.map(o=>v`
                  <div class="black-key" style="left:${o.left};${i.includes(o.note)||i.includes(o.flat)?`background:${this.moodColor}`:""}"></div>
                `)}
              </div>
            </div>
          </div>
        `:""}
        </div>
      </div>
    `}};V.styles=ce`
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
      max-height: 84%;
      background: var(--cv-cream);
      border-radius: 24px 24px 0 0;
      z-index: 41;
      padding: 14px 24px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px -20px rgba(46, 39, 31, 0.3);
      transform: translateY(100%);
      transition: transform 0.32s cubic-bezier(.32,.72,0,1);
    }
    .sheet-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber {
      width: 36px;
      height: 4px;
      background: var(--cv-ink-16);
      align-self: center;
      margin-bottom: 16px;
      flex-shrink: 0;
      border-radius: 2px;
      touch-action: none;
      cursor: grab;
    }
    .head-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .step-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .sheet-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink);
      line-height: 1.2;
    }
    .close-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: var(--cv-ink);
      cursor: pointer;
      border: none;
      flex-shrink: 0;
    }

    .current-row {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--cv-surface);
      border-radius: 18px;
      padding: 16px 18px;
      margin-top: 20px;
      flex-shrink: 0;
    }
    .current-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-label);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .current-name {
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-top: 2px;
    }
    .alt-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
      overflow-y: auto;
    }
    .alt-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--cv-surface);
      border-radius: 16px;
      padding: 12px 14px;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }
    .alt-row:hover {
      transform: translateY(-2px);
    }
    .alt-shape {
      flex-shrink: 0;
    }
    .alt-name {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .alt-sub {
      font-size: 12.5px;
      color: var(--cv-ink-muted);
      margin-top: 2px;
    }
    .alt-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: var(--cv-plum);
      margin-top: 7px;
    }
    .alt-desc {
      font-size: 12px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
      line-height: 1.4;
    }
    .alt-arrow {
      font-size: 15px;
      color: var(--cv-ink-35);
      flex-shrink: 0;
    }
    .voicing-section {
      border-top: 1px solid var(--cv-ink-10);
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
      background: var(--cv-surface);
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
      color: var(--cv-ink);
    }
    .bento-sub {
      font-size: 10.5px;
      color: var(--cv-ink-45);
    }
    .kb-caption {
      font-size: 11px;
      color: var(--cv-ink-45);
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
      border-right: 1px solid var(--cv-ink-08);
      font-size: 10px;
      font-weight: 700;
      background: var(--cv-cream);
      color: var(--cv-ink-35);
    }
    .white-key.active {
      color: var(--cv-ink);
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink);
      border-radius: 0 0 6px 6px;
      z-index: 2;
    }
  `;K([E({type:Object})],V.prototype,"chord",2);K([E({type:Array})],V.prototype,"alternatives",2);K([E({type:Boolean})],V.prototype,"showTheory",2);K([E({type:String})],V.prototype,"moodColor",2);K([E({type:Number})],V.prototype,"position",2);K([E({type:Number})],V.prototype,"total",2);K([E({type:String})],V.prototype,"mode",2);K([E({type:Boolean})],V.prototype,"visible",2);K([E({type:Number})],V.prototype,"resetKey",2);K([w()],V.prototype,"quality",2);K([w()],V.prototype,"extension",2);K([w()],V.prototype,"dragY",2);K([w()],V.prototype,"dragging",2);K([w()],V.prototype,"snapping",2);K([oi(".sheet")],V.prototype,"sheetEl",2);V=K([de("swap-sheet")],V);var Nh=Object.defineProperty,$h=Object.getOwnPropertyDescriptor,Sn=(t,e,s,i)=>{for(var r=i>1?void 0:i?$h(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&Nh(e,s,r),r};const Rh=Ce`
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
`,Ph=Ce`
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
`,Mh=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Rh},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:Ph}];let ds=class extends he{constructor(){super(...arguments),this.visible=!1,this.onKeyDown=t=>{t.key==="Escape"&&this.visible&&this.emit("close")}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKeyDown)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}render(){return v`
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
          ${Mh.map(t=>v`
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
    `}};ds.styles=ce`
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
  `;Sn([E({type:Boolean})],ds.prototype,"visible",2);ds=Sn([de("share-modal")],ds);function _r(t){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},s=t.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!s)return 60;const i=s[1].charAt(0).toUpperCase()+s[1].slice(1),r=e[i]??0,n=s[2]!==void 0?parseInt(s[2],10):4;return Math.min(127,Math.max(0,(n+1)*12+r))}function Tn(t,e,s){const i=e&&e.length>0?e.map(u=>t.chords[u]).filter(u=>!!u):t.chords,r=t.bpm||120,n=1.7,o=s?at.find(u=>u.name.toLowerCase()===s.toLowerCase()):void 0,a=hi[t.genre]||{},l=o?.patch??{},c={...a,...l},d=a.duration??.9,h=l.durationMultiplier?d*l.durationMultiplier:d,p=[];return i.forEach((u,m)=>{const g=m*n,y=(u.notes&&u.notes.length>0?u.notes:["C","E","G"]).map(x=>`${x}4`);if(c.arpMode&&c.arpMode!=="off"){const x=c.arpRate??"1/16",b=c.arpRange??1,T=c.arpMode,$=nn(x,r),I=on(y,b),R=an(I,T),ue=c.duration?c.duration:Math.max(.6,h);R.forEach((k,L)=>{const ve=g+L*$;p.push({note:k,midi:_r(k),startTime:ve,duration:ue})})}else{const x=c.spread??0;y.forEach((b,T)=>{const $=T*x*.1,I=g+$;p.push({note:b,midi:_r(b),startTime:I,duration:h})})}}),p}function Dh(t){const e=[];let s=Math.max(0,Math.floor(t));for(e.push(s&127);(s>>=7)>0;)e.unshift(s&127|128);return e}function jh(t,e,s){const i=t.bpm||120,r=480,n=Tn(t,e,s),o=[];n.forEach(g=>{const f=Math.round(g.startTime/(60/i)*r),y=Math.max(1,Math.round(g.duration/(60/i)*r));o.push({tick:f,type:"on",midi:g.midi}),o.push({tick:f+y,type:"off",midi:g.midi})}),o.sort((g,f)=>g.tick!==f.tick?g.tick-f.tick:g.type!==f.type?g.type==="off"?-1:1:g.midi-f.midi);const a=[],l=Math.round(6e7/i);a.push(0),a.push(255,81,3),a.push(l>>16&255,l>>8&255,l&255);const c="Chroma Chords";a.push(0),a.push(255,3,c.length);for(let g=0;g<c.length;g++)a.push(c.charCodeAt(g));let d=0;o.forEach(g=>{const f=g.tick-d;d=g.tick,a.push(...Dh(f)),g.type==="on"?a.push(144,g.midi,80):a.push(128,g.midi,0)}),a.push(0),a.push(255,47,0);const h=[77,84,104,100,0,0,0,6,0,0,0,1,r>>8&255,r&255],p=a.length,u=[77,84,114,107,p>>24&255,p>>16&255,p>>8&255,p&255],m=new Uint8Array(h.length+u.length+a.length);return m.set(h,0),m.set(u,h.length),m.set(a,h.length+u.length),m}function Lh(t,e,s,i){const r=jh(t,e,i),n=new Blob([r],{type:"audio/midi"}),o=(t.key||"C").toLowerCase(),a=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),l=t.bpm||120,c=`chroma-chords-${o}-${a}-${l}bpm.mid`;An(n,c)}function Bh(t,e){const s=new Cr({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((t?ot.find(n=>n.name.toLowerCase()===t.toLowerCase()):void 0)?.instrument??(e?ci[e]:void 0)??"rhodes"){case"bell":return new Y(gt,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(s);case"epiano":return new Y(gt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(s);case"guitar":return new Y($e,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(s);case"organ":return new Y($e,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(s);case"pad-strings":{const n=new Ir({decay:4.5,wet:.35}).connect(s);return new Y($e,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(n)}case"juno-pad":{const n=new Er({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(s);return new Y($e,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(n)}case"stab":return new Y(Ar,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(s);case"rhodes":default:return new Y(gt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(s)}}function Uh(t){const e=t.numberOfChannels,s=t.sampleRate,i=16,r=i/8,n=e*r,o=t.length*e*r,a=new ArrayBuffer(44+o),l=new DataView(a),c=(p,u)=>{for(let m=0;m<u.length;m++)l.setUint8(p+m,u.charCodeAt(m))};c(0,"RIFF"),l.setUint32(4,36+o,!0),c(8,"WAVE"),c(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,e,!0),l.setUint32(24,s,!0),l.setUint32(28,s*n,!0),l.setUint16(32,n,!0),l.setUint16(34,i,!0),c(36,"data"),l.setUint32(40,o,!0);const d=[];for(let p=0;p<e;p++)d.push(t.getChannelData(p));let h=44;for(let p=0;p<t.length;p++)for(let u=0;u<e;u++){const m=Math.max(-1,Math.min(1,d[u][p])),g=m<0?m*32768:m*32767;l.setInt16(h,g,!0),h+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function Fh(t,e,s,i){const r=Tn(t,e,i);if(!r.length)return;const o=r.reduce((u,m)=>Math.max(u,m.startTime+m.duration),0)+1.2,a=await Mn(async()=>{const u=Bh(s,t.genre);r.forEach(m=>{u.triggerAttackRelease(m.note,m.duration,m.startTime)})},o),l=Uh(a.get()),c=(t.key||"C").toLowerCase(),d=(t.mood||"progression").toLowerCase().replace(/\s+/g,"-"),h=t.bpm||120,p=`chroma-chords-${c}-${d}-${h}bpm.wav`;An(l,p)}function An(t,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const s=URL.createObjectURL(t);if(typeof document>"u")return;const i=document.createElement("a");i.href=s,i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(s),1e3)}var zh=Object.defineProperty,qh=Object.getOwnPropertyDescriptor,lt=(t,e,s,i)=>{for(var r=i>1?void 0:i?qh(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&zh(e,s,r),r};let Me=class extends he{constructor(){super(...arguments),this.visible=!1,this.defaultName="",this.mounted=!1,this.name="",this.closeTimer=null}willUpdate(t){t.has("visible")&&(this.visible?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.name=this.defaultName,setTimeout(()=>{this.inputEl&&(this.inputEl.focus(),this.inputEl.select())},100)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},300)))}close(){this.dispatchEvent(new CustomEvent("close"))}save(){const t=this.name.trim();t&&(this.dispatchEvent(new CustomEvent("save",{detail:t})),this.close())}onInput(t){this.name=t.target.value}onKeyDown(t){t.key==="Escape"?this.close():t.key==="Enter"&&this.name.trim()&&this.save()}render(){return this.mounted?v`
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
    `:v``}};Me.styles=ce`
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
  `;lt([E({type:Boolean})],Me.prototype,"visible",2);lt([E({type:String})],Me.prototype,"defaultName",2);lt([w()],Me.prototype,"mounted",2);lt([w()],Me.prototype,"name",2);lt([oi(".name-input")],Me.prototype,"inputEl",2);Me=lt([de("save-set-modal")],Me);var Gh=Object.defineProperty,Vh=Object.getOwnPropertyDescriptor,N=(t,e,s,i)=>{for(var r=i>1?void 0:i?Vh(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&Gh(e,s,r),r};const Hh=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],Bs=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Wh=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],Kh=["Warm","Melancholy","Nostalgic","Dreamy"],Yh=["Piano","Rhodes","Nylon Guitar","Warm Pad"],Jh=["Block chords","Arpeggio","Strum","Broken (swing)"],Xh=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Sr=220,Qh=280,Tr={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let C=class extends he{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.isAuthenticated=!1,this.isBookmarked=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.flashedIndex=null,this.expandedMenuGenre=!1,this.expandedMenuMood=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.saveModalVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=rt(.35),this.mascotSlot=Ot(Hh),this.panelPeekMascot=rt(.18),this.panelPeekSide=Ot(["left","right"]),this.eggCounter=new vi,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=t=>{if(this.lastPointerX=t.clientX,this.lastPointerY=t.clientY,this.pressTimer&&!this.drag){(Math.abs(t.clientY-this.pressStartY)>8||Math.abs(t.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:t.clientX-this.pressStartX,offsetY:t.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const t=this.drag.pos;this.drag=null,this.pressTapFn=null;const e=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let s=t,i=1/0;if(e.forEach((r,n)=>{if(n===t)return;const o=r.getBoundingClientRect(),a=o.left+o.width/2,l=o.top+o.height/2,c=(this.lastPointerX-a)**2+(this.lastPointerY-l)**2;c<i&&(i=c,s=n)}),s!==t){const r=[...this.order],[n]=r.splice(t,1);r.splice(s,0,n),this.emit("reorder",r)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(t){if(t.has("progressStep")){const e=t.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}updated(t){t.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),t.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Qh)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1},Sr)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Sr)}exportDevice(t,e){this.closeShare();const s=Xc(this.progression,t,this.order);window.open(s,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=`Sent to ${e}`,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}async handleExportWav(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer),this.toast="Rendering WAV audio...";try{const t=this.progression,e=this.instrument??Kt(t.genre),s=this.playStyle??Yt(t.genre);await Fh(t,this.order,e,s),this.toast="Saved WAV audio file"}catch(t){console.error("WAV export error:",t),this.toast="Failed to export WAV"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}handleExportMidi(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer);try{const t=this.progression,e=this.instrument??Kt(t.genre),s=this.playStyle??Yt(t.genre);Lh(t,this.order,e,s),this.toast="Saved MIDI file"}catch(t){console.error("MIDI export error:",t),this.toast="Failed to export MIDI"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(t,e,s){s.preventDefault(),this.pressTapFn=e,this.pressStartX=s.clientX,this.pressStartY=s.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:t,offsetX:0,offsetY:0}},150)}previewChordTile(t){this.flashedIndex=t,setTimeout(()=>{this.flashedIndex===t&&(this.flashedIndex=null)},320),this.emit("chord-preview",t)}dragStyleFor(t){const e=this.drag;return e&&e.pos===t?`transform:translate(${e.offsetX}px, ${e.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderHeaderTitle(t,e){if(t.searchTerm){const s=t.searchTerm.trim(),r=(s.endsWith(".")?s.slice(0,-1):s).split(/\s+/);if(r.length===1)return v`<h1><span style="color:${e}">${r[0]}.</span></h1>`;const n=r.slice(0,-1).join(" "),o=r[r.length-1];return v`<h1>${n} <span style="color:${e}">${o}.</span></h1>`}return v`<h1>Your progression, feeling <span style="color:${e}">${t.mood.toLowerCase()}.</span></h1>`}renderLengthControl(){const t=this.progression.chords.length;return v`
      <div class="length-control">
        <div class="length-btn ${t<=qe?"disabled":""}" @click=${()=>t>qe&&this.emit("set-length",t-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:ge},(e,s)=>v`<div class="length-segment ${s<t?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${t>=ge?"disabled":""}" @click=${()=>t<ge&&this.emit("set-length",t+1)}>+</div>
        <div class="length-label-text">${t} ${t===1?"bar":"bars"}</div>
      </div>
    `}render(){const t=this.progression,e=Et(t.mood),s=this.instrument??Kt(t.genre),i=this.playStyle??Yt(t.genre),r=Math.max(1,this.order.length),n=this.playing?this.snapProgress?this.progressStep/r*100:Math.min(100,(this.progressStep+1)/r*100):0;Tr[t.mood]||Tr.Dreamy;const o=this.showTheory?Hc(this.order.map(k=>t.chords[k]),t.key,t.scaleType):null,a=gn(t.key,t.scaleType).length,l=a===0?"no sharps or flats":`${a} ${a===1?"sharp/flat":"sharps/flats"}`;let c=Wh.filter(k=>Bs.includes(k));c.includes(t.genre)||(c=c.slice(0,-1).concat(t.genre));const d=Bs.filter(k=>!c.includes(k)),h=this.expandedMenuGenre?Bs:c,p=Pe.map(k=>k.name);let u=Kh.filter(k=>p.includes(k));u.includes(t.mood)||(u=u.slice(0,-1).concat(t.mood));const m=p.filter(k=>!u.includes(k)),f=(this.expandedMenuMood?p:u).map(k=>Pe.find(L=>L.name===k)),y=ot.filter(k=>k.name!==s);let x=Yh.filter(k=>y.some(L=>L.name===k));const b=y.filter(k=>!x.includes(k.name)),T=this.expandedAllInstruments?y:y.filter(k=>x.includes(k.name)),$=at.filter(k=>k.name!==i);let I=Jh.filter(k=>$.some(L=>L.name===k));const R=$.filter(k=>!I.includes(k.name)),ue=this.expandedAllPlayStyles?$:$.filter(k=>I.includes(k.name));return v`
      <div class="frame">
        ${this.mascot.show?v`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
          </div>
        `:""}

        <div class="top-bar">
          <div class="icon-btn" @click=${()=>this.emit("back")}>‹</div>
          <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
            <svg width="18" height="18" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
            <div class="wordmark-text">Chroma Chords</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            ${this.isAuthenticated?v`
              <div class="your-sets-btn" @click=${()=>this.emit("view-sets")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span class="your-sets-text">Your sets</span>
              </div>
            `:""}
            <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
          </div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted?v`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${it.map(k=>v`
                <div class="menu-chip ${k===t.key?"selected":""}" style=${k===t.key?`background:${e}`:""} @click=${()=>this.emit("set-key",k)}>${Zt(k,t.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${Xh.map(k=>v`
                <div class="menu-chip ${k.value===t.scaleType?"selected":""}" style=${k.value===t.scaleType?`background:${e}`:""} @click=${()=>this.emit("set-scale",k.value)}>${k.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${h.map(k=>v`
                <div class="menu-chip ${k===t.genre?"selected":""}" style=${k===t.genre?`background:${e}`:""} @click=${()=>this.emit("set-genre",k)}>${k}</div>
              `)}
              ${d.length?v`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuGenre=!this.expandedMenuGenre}}>
                  ${this.expandedMenuGenre?"Show less ⌃":`+${d.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${f.map(k=>v`
                <div class="menu-chip ${k.name===t.mood?"selected":""}" style=${k.name===t.mood?`background:${k.dot}`:""} @click=${()=>this.emit("set-mood",k.name)}>${k.name}</div>
              `)}
              ${m.length?v`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuMood=!this.expandedMenuMood}}>
                  ${this.expandedMenuMood?"Show less ⌃":`+${m.length} more ⌄`}
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
          ${this.renderHeaderTitle(t,e)}
          <div class="subcopy">Tap a chord to hear it.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?v`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((k,L)=>{const ve=t.chords[k],Pt=Ct(ve.tension),bi=L===this.activeIndex,En=this.flashedIndex===k;return v`
                  <div
                    class="chord-chip ${bi?"active":""} ${En?"flashed":""}"
                    style="--chip-size:${Pt.size}px;--chip-radius:${Pt.radius}px;background:${Pt.color};${this.dragStyleFor(L)}"
                    @click=${()=>this.previewChordTile(k)}
                    @pointerdown=${ye=>this.pressStart(L,()=>this.previewChordTile(k),ye)}
                  >
                    ${this.showTheory?v`<div class="roman-badge">${ve.roman}</div>`:""}
                    ${bi?v`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="--chip-font:${Pt.fontSize}px;">${ve.name}</div>
                    <div class="chord-role">${ve.functionLabel}</div>
                    <button
                      class="swap-badge"
                      aria-label="Swap chord ${ve.name}"
                      @pointerdown=${ye=>ye.stopPropagation()}
                      @click=${ye=>{ye.stopPropagation(),this.emit("chord-tap",k)}}
                    >
                      <div class="swap-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                      </div>
                    </button>
                    <button
                      class="voicing-badge"
                      aria-label="View voicing for ${ve.name}"
                      @pointerdown=${ye=>ye.stopPropagation()}
                      @click=${ye=>{ye.stopPropagation(),this.emit("chord-voicing-tap",k)}}
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
          ${o?v`
            <div class="theory-strip">
              <div class="theory-key-label">${Zt(t.key,t.scaleType)} ${t.scaleType.replace("_"," ")} · ${l}</div>
              <div class="theory-staff-scroll">
                ${Ce`
                  <svg width="${o.width}" height="${o.height}" viewBox="0 0 ${o.width} ${o.height}">
                    ${o.lines.map(k=>Ce`<rect x="6" y="${k}" width="${o.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${o.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${o.keySignature.map(k=>Ce`<text x="${k.x}" y="${k.y+6}" font-size="20" fill="var(--cv-ink)">${k.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${o.chords.map(k=>Ce`
                      <text x="${k.cx}" y="${k.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${k.name}</text>
                      ${k.ledgers.map(L=>Ce`<rect x="${L.x}" y="${L.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${k.notes.map(L=>Ce`<ellipse cx="${L.x}" cy="${L.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${k.cx}" y="${o.height-4}" font-size="12" font-weight="800" fill="${e}" text-anchor="middle">${k.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${e}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?v`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:v`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${n}%;background:${e};--progress-duration:${di}ms"
              ></div>
            </div>
            <div class="dice-btn ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${e}" />
                <circle cx="8" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="12" cy="12" r="1.7" fill="#2E271F" />
                <circle cx="8" cy="16" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="16" r="1.7" fill="#2E271F" />
              </svg>
            </div>
            ${this.isAuthenticated?v`
              <div class="dice-btn" title="${this.isBookmarked?"Saved in sets":"Save set"}" @click=${()=>{this.saveModalVisible=!0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked?"#2E271F":"none"}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            `:""}
            <div class="control-icon-btn" aria-label="Instrument: ${s}" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div class="control-icon-btn" aria-label="Play style: ${i}" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
            </div>
          </div>
          <div class="transport-meta">${Zt(t.key,t.scaleType).toUpperCase()} ${t.scaleType.replace("_"," ")} · ${t.bpm} BPM</div>

          <div class="control-row">
            <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              ${s} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
            </div>
            <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
              ${i} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
            </div>
          </div>
          ${this.expandedInstrument?v`
            <div class="control-options">
              ${T.map(k=>v`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",k.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${k.color}"></span>${k.name}
                </div>
              `)}
              ${b.length?v`
                <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                  ${this.expandedAllInstruments?"Show less ⌃":`+${b.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}
          ${this.expandedPlayStyle?v`
            <div class="control-options">
              ${ue.map(k=>v`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",k.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${k.color}"></span>${k.name}
                </div>
              `)}
              ${R.length?v`
                <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                  ${this.expandedAllPlayStyles?"Show less ⌃":`+${R.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}

          <button class="build-song-btn" style="background:${e}" @click=${()=>this.emit("view-song")}>
            Build the full song <span>→</span>
          </button>
          <div class="back-to-seed-row">
            <div class="back-to-seed-link" @click=${()=>this.emit("back")}>← Back to seed</div>
          </div>
        </div>

        ${this.sheetMounted&&this.swapChord?v`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
            .mode=${this.sheetMode}
            .moodColor=${e}
            .position=${(this.swapIndex??0)+1}
            .total=${this.order.length}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
          ></swap-sheet>
        `:""}

        ${this.shareMounted?v`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${k=>this.exportDevice(k.detail.device,k.detail.name)}
            @export-wav=${()=>this.handleExportWav()}
            @export-midi=${()=>this.handleExportMidi()}
          ></share-modal>
        `:""}

        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${`${t.genre} · ${t.mood}`}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${k=>{this.emit("save-set",k.detail),this.saveModalVisible=!1}}
        ></save-set-modal>

        ${this.toast?v`<div class="toast">${this.toast.startsWith("Sent to")||this.toast.startsWith("Saved")||this.toast.startsWith("Rendering")||this.toast.startsWith("Failed")?this.toast:`Sent to ${this.toast}`}</div>`:""}
      </div>
    `}};C.styles=ce`
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
    .build-song-btn {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 16px;
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
      margin-top: 24px;
      transition: transform 160ms var(--cv-ease);
    }
    .build-song-btn:active {
      transform: scale(0.98);
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
  `;N([E({type:Object})],C.prototype,"progression",2);N([E({type:Number})],C.prototype,"activeIndex",2);N([E({type:Number})],C.prototype,"progressStep",2);N([E({type:Array})],C.prototype,"order",2);N([E({type:Boolean})],C.prototype,"playing",2);N([E({type:Boolean})],C.prototype,"showTheory",2);N([E({type:String})],C.prototype,"instrument",2);N([E({type:String})],C.prototype,"playStyle",2);N([E({type:Boolean})],C.prototype,"sheetOpen",2);N([E({type:Boolean})],C.prototype,"isAuthenticated",2);N([E({type:Boolean})],C.prototype,"isBookmarked",2);N([E({type:String})],C.prototype,"sheetMode",2);N([E({type:Object})],C.prototype,"swapChord",2);N([E({type:Number})],C.prototype,"swapIndex",2);N([E({type:Array})],C.prototype,"alternatives",2);N([w()],C.prototype,"menuMounted",2);N([w()],C.prototype,"menuVisible",2);N([w()],C.prototype,"flashedIndex",2);N([w()],C.prototype,"expandedMenuGenre",2);N([w()],C.prototype,"expandedMenuMood",2);N([w()],C.prototype,"expandedAllInstruments",2);N([w()],C.prototype,"expandedAllPlayStyles",2);N([w()],C.prototype,"saveModalVisible",2);N([w()],C.prototype,"shareMounted",2);N([w()],C.prototype,"shareVisible",2);N([w()],C.prototype,"sheetMounted",2);N([w()],C.prototype,"sheetVisible",2);N([w()],C.prototype,"toast",2);N([w()],C.prototype,"spinning",2);N([w()],C.prototype,"drag",2);N([w()],C.prototype,"snapProgress",2);N([w()],C.prototype,"expandedInstrument",2);N([w()],C.prototype,"expandedPlayStyle",2);N([w()],C.prototype,"mascot",2);N([w()],C.prototype,"mascotSlot",2);N([w()],C.prototype,"panelPeekMascot",2);N([w()],C.prototype,"panelPeekSide",2);N([w()],C.prototype,"paradeTrigger",2);C=N([de("loop-screen")],C);var Zh=Object.defineProperty,ed=Object.getOwnPropertyDescriptor,z=(t,e,s,i)=>{for(var r=i>1?void 0:i?ed(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&Zh(e,s,r),r};const td=["Piano","Rhodes","Nylon Guitar","Warm Pad"],sd=["Block chords","Arpeggio","Strum","Broken (swing)"],id=["flex-start","center","flex-end"];let U=class extends he{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.isAuthenticated=!1,this.isBookmarked=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.saveModalVisible=!1,this.mascot=rt(.5),this.mascotAlign=Ot([...id]),this.eggCounter=new vi,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(t){if(t.has("progressStep")){const e=t.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}updated(t){t.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(t){this.dispatchEvent(new CustomEvent("select-section",{detail:t,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const t=this.sections[0]?.progression.genre??"Pop",e=this.instrument??Kt(t),s=this.playStyle??Yt(t),i=this.totalSteps||this.sections.reduce((g,f)=>g+f.order.length,0),r=!this.playing||i<=0?0:this.snapProgress?this.progressStep/i*100:(this.progressStep+1)/i*100,n=ot.filter(g=>g.name!==e);let o=td.filter(g=>n.some(f=>f.name===g));const a=n.filter(g=>!o.includes(g.name)),l=this.expandedAllInstruments?n:n.filter(g=>o.includes(g.name)),c=at.filter(g=>g.name!==s);let d=sd.filter(g=>c.some(f=>f.name===g));const h=c.filter(g=>!d.includes(g.name)),p=this.expandedAllPlayStyles?c:c.filter(g=>d.includes(g.name)),u=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],m=u?Et(u.progression.mood):"#C9A9E0";return v`
      <div class="frame">
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        ${this.isAuthenticated?v`
          <div class="your-sets-btn" @click=${()=>this.dispatchEvent(new CustomEvent("view-sets",{bubbles:!0,composed:!0}))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        `:""}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${()=>this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((g,f)=>{const y=this.playing?f===this.activePlayingSectionIdx:f===this.activeSectionIdx,x=Et(g.progression.mood);return v`
                <div class="section-row ${y?"active":""}" style=${y?`--ring-color:${x}`:""} @click=${()=>this.selectSection(f)}>
                  <div>
                    <div class="section-name">${g.name.toUpperCase()}</div>
                    <div class="section-chords">${g.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${g.order.map(b=>{const T=g.progression.chords[b],$=Ct(T.tension);return v`<div class="section-chip" style="background:${$.color};border-radius:${Math.round($.radius*.35)}px;"></div>`})}
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
                ${this.playing?v`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:v`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${r}%;background:${m};--progress-duration:${di}ms"
                ></div>
              </div>
              ${this.isAuthenticated?v`
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
                ${s} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
              </div>
            </div>

            ${this.expandedInstrument?v`
              <div class="control-options">
                ${l.map(g=>v`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:g.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${g.color}"></span>${g.name}
                  </div>
                `)}
                ${a.length?v`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${a.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?v`
              <div class="control-options">
                ${p.map(g=>v`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:g.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${g.color}"></span>${g.name}
                  </div>
                `)}
                ${h.length?v`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${h.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?v`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
        
        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${t&&u?`${t} · ${u.progression.mood}`:"My Set"}
          @close=${()=>{this.saveModalVisible=!1}}
          @save=${g=>{this.dispatchEvent(new CustomEvent("save-set",{detail:g.detail,bubbles:!0,composed:!0})),this.saveModalVisible=!1}}
        ></save-set-modal>
      </div>
    `}};U.styles=ce`
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
  `;z([E({type:Array})],U.prototype,"sections",2);z([E({type:Number})],U.prototype,"activeSectionIdx",2);z([E({type:Number})],U.prototype,"activePlayingSectionIdx",2);z([E({type:Boolean})],U.prototype,"canAddSection",2);z([E({type:Boolean})],U.prototype,"playing",2);z([E({type:Number})],U.prototype,"progressStep",2);z([E({type:Number})],U.prototype,"totalSteps",2);z([E({type:String})],U.prototype,"instrument",2);z([E({type:String})],U.prototype,"playStyle",2);z([E({type:Boolean})],U.prototype,"isAuthenticated",2);z([E({type:Boolean})],U.prototype,"isBookmarked",2);z([w()],U.prototype,"expandedInstrument",2);z([w()],U.prototype,"expandedPlayStyle",2);z([w()],U.prototype,"expandedAllInstruments",2);z([w()],U.prototype,"expandedAllPlayStyles",2);z([w()],U.prototype,"snapProgress",2);z([w()],U.prototype,"saveModalVisible",2);z([w()],U.prototype,"mascot",2);z([w()],U.prototype,"mascotAlign",2);z([w()],U.prototype,"paradeTrigger",2);U=z([de("song-screen")],U);var rd=Object.defineProperty,nd=Object.getOwnPropertyDescriptor,Ee=(t,e,s,i)=>{for(var r=i>1?void 0:i?nd(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&rd(e,s,r),r};let le=class extends he{constructor(){super(...arguments),this.projects=[],this.isAuthenticated=!1,this.userEmail=null,this.isSyncing=!1,this.renamingId=null,this.draftName="",this.confirmDeleteId=null,this.emptyMascot=rt(.9)}onBack(){this.dispatchEvent(new CustomEvent("back"))}onLoadProject(t){this.renamingId||this.confirmDeleteId||this.dispatchEvent(new CustomEvent("load-project",{detail:t}))}onSync(){this.isSyncing||(this.isSyncing=!0,this.dispatchEvent(new CustomEvent("sync-projects")),setTimeout(()=>{this.isSyncing=!1},2e3))}startRename(t,e,s){t.stopPropagation(),this.renamingId=e,this.draftName=s,this.confirmDeleteId=null}onDraftChange(t){this.draftName=t.target.value}commitRename(t){if(this.renamingId===t){const e=this.draftName.trim();e&&this.dispatchEvent(new CustomEvent("rename-project",{detail:{id:t,name:e},bubbles:!0,composed:!0})),this.renamingId=null}}cancelRename(){this.renamingId=null,this.draftName=""}askDelete(t,e){t.stopPropagation(),this.confirmDeleteId=e,this.renamingId=null}confirmDelete(t,e){t.stopPropagation(),this.confirmDeleteId=null,this.dispatchEvent(new CustomEvent("delete-project",{detail:e,bubbles:!0,composed:!0}))}cancelDelete(t){t.stopPropagation(),this.confirmDeleteId=null}render(){return v`
      <div class="frame">
        <div class="top-bar">
          <button class="back-btn" @click=${this.onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div class="top-bar-actions">
            ${this.isAuthenticated?v`
              <span class="user-badge" title=${this.userEmail||"Account"}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                ${this.userEmail?this.userEmail.split("@")[0]:"Signed in"}
              </span>
              <button class="sign-out-btn" @click=${()=>this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0}))}>Sign out</button>
            `:v`
              <button class="auth-btn" @click=${()=>this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}>
                Sign in to sync
              </button>
            `}
            <button class="sync-btn" @click=${this.onSync} ?disabled=${this.isSyncing} title="Sync with Cloud">
              <svg class=${this.isSyncing?"spin":""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
              ${this.isSyncing?"Syncing...":"Sync"}
            </button>
          </div>
        </div>
        
        <div class="content">
          <h1>Your saved sets</h1>
          <div class="subcopy">All your progressions, synced and ready to play.</div>

          ${this.projects.length===0?v`
            <div class="empty-state">
              ${this.emptyMascot.show?v`
                <div class="empty-mascot-wrap">
                  <mascot-character .kind=${this.emptyMascot.kind} .scale=${.8}></mascot-character>
                </div>
              `:""}
              <div class="empty-state-title">No saved sets yet</div>
              <div class="empty-state-desc">When you find a progression you like, tap the bookmark icon on any loop to save it here.</div>
              <button class="empty-cta-btn" @click=${this.onBack}>Start a new loop →</button>
            </div>
          `:v`
            <div class="grid">
              ${this.projects.map(t=>{const e=t.scaleType||"MAJOR",s=t.key||"C",i=t.bpm||120,r=t.name||"Untitled Set",n=t.genre||"Unknown",o=t.mood||"Neutral",a=t.lastModified?new Date(t.lastModified).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"Unknown Date",l=Et(o),c=this.renamingId===t.id,d=this.confirmDeleteId===t.id;return v`
                  <div class="card" @click=${()=>this.onLoadProject(t.id)}>
                    <div class="color-accent" style="background: ${l}"></div>
                    
                    <div class="card-actions">
                      <button
                        class="action-btn"
                        title="Rename set"
                        aria-label="Rename set"
                        @click=${h=>this.startRename(h,t.id,r)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        class="action-btn delete"
                        title="Delete set"
                        aria-label="Delete set"
                        @click=${h=>this.askDelete(h,t.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>

                    ${c?v`
                      <input
                        class="rename-input"
                        .value=${this.draftName}
                        @input=${this.onDraftChange}
                        @keydown=${h=>{h.key==="Enter"?(h.preventDefault(),this.commitRename(t.id)):h.key==="Escape"&&(h.preventDefault(),this.cancelRename())}}
                        @blur=${()=>this.commitRename(t.id)}
                        @click=${h=>h.stopPropagation()}
                        autofocus
                      />
                    `:v`
                      <div class="card-title-row">
                        <div class="card-title" title="Click to rename" @click=${h=>this.startRename(h,t.id,r)}>${r}</div>
                      </div>
                    `}

                    <div class="card-meta">${n} · ${o}</div>
                    
                    <div class="section-chips">
                      ${(t.chords||[]).map(h=>{const p=Ct(h.tension);return v`<div class="section-chip" style="background:${p.color};border-radius:${Math.round(p.radius*.35)}px;" title=${h.name}></div>`})}
                    </div>

                    ${d?v`
                      <div class="delete-confirm-banner" @click=${h=>h.stopPropagation()}>
                        <span>Delete this set?</span>
                        <div class="confirm-btn-group">
                          <button class="confirm-btn cancel" @click=${h=>this.cancelDelete(h)}>Cancel</button>
                          <button class="confirm-btn delete" @click=${h=>this.confirmDelete(h,t.id)}>Delete</button>
                        </div>
                      </div>
                    `:""}
                    
                    <div class="card-details">
                      <div class="detail-pill">${Zt(s,e)} ${e.replace("_"," ")}</div>
                      <div class="detail-pill">${i} BPM</div>
                      <div class="detail-pill">${a}</div>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </div>
      </div>
    `}};le.styles=ce`
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
    }
    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
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
    .back-btn:active, .sync-btn:active, .auth-btn:active {
      transform: scale(0.96);
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
      max-width: 680px;
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
      color: var(--cv-ink-muted);
      margin-top: 8px;
      margin-bottom: 32px;
    }
    .empty-state {
      text-align: center;
      padding: 56px 24px;
      background: var(--cv-surface);
      border-radius: 24px;
      border: 1.5px dashed var(--cv-ink-16);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .empty-mascot-wrap {
      margin-bottom: 4px;
    }
    .empty-state-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .empty-state-desc {
      font-size: 14px;
      color: var(--cv-ink-muted);
      max-width: 360px;
      line-height: 1.5;
    }
    .empty-cta-btn {
      margin-top: 8px;
      background: var(--cv-ink);
      color: var(--cv-cream);
      border: none;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .empty-cta-btn:hover {
      transform: scale(1.03);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-10);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 24px -10px rgba(46, 39, 31, 0.15);
      border-color: var(--cv-ink-16);
    }
    .card-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
      padding-right: 76px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .card-title:hover {
      text-decoration: underline;
      text-decoration-color: var(--cv-ink-30);
    }
    .rename-input {
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
      font-family: inherit;
      background: #ffffff;
      border: 1.5px solid var(--cv-ink);
      border-radius: 8px;
      padding: 4px 8px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 0 0 3px rgba(46, 39, 31, 0.08);
    }
    .card-meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-bottom: 12px;
    }
    .section-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex-shrink: 0;
      margin-bottom: 16px;
    }
    .section-chip {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .card-details {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .detail-pill {
      background: var(--cv-surface-2);
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-55);
    }
    .color-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
    }
    .card-actions {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 2px;
      z-index: 5;
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
      color: var(--cv-ink-35);
      transition: color 0.15s ease, background 0.15s ease;
      touch-action: manipulation;
    }
    .action-btn:hover {
      background: var(--cv-ink-08);
      color: var(--cv-ink);
    }
    .action-btn.delete:hover {
      background: rgba(229, 57, 53, 0.12);
      color: #e53935;
    }
    .delete-confirm-banner {
      background: rgba(229, 57, 53, 0.09);
      border: 1.5px solid rgba(229, 57, 53, 0.28);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-top: 10px;
      margin-bottom: 4px;
      font-size: 12.5px;
      font-weight: 700;
      color: #c62828;
      animation: cv-banner-in 0.18s ease-out;
    }
    @keyframes cv-banner-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .confirm-btn-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .confirm-btn {
      border: none;
      padding: 5px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .confirm-btn.cancel {
      background: var(--cv-surface-2);
      color: var(--cv-ink);
    }
    .confirm-btn.cancel:hover {
      background: var(--cv-ink-14);
    }
    .confirm-btn.delete {
      background: #e53935;
      color: #ffffff;
    }
    .confirm-btn.delete:hover {
      background: #c62828;
    }
  `;Ee([E({type:Array})],le.prototype,"projects",2);Ee([E({type:Boolean})],le.prototype,"isAuthenticated",2);Ee([E({type:String})],le.prototype,"userEmail",2);Ee([w()],le.prototype,"isSyncing",2);Ee([w()],le.prototype,"renamingId",2);Ee([w()],le.prototype,"draftName",2);Ee([w()],le.prototype,"confirmDeleteId",2);Ee([w()],le.prototype,"emptyMascot",2);le=Ee([de("sets-screen")],le);var od=Object.defineProperty,ad=Object.getOwnPropertyDescriptor,ie=(t,e,s,i)=>{for(var r=i>1?void 0:i?ad(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&od(e,s,r),r};let Z=class extends he{constructor(){super(...arguments),this.open=!1,this.mounted=!1,this.activeTab="signin",this.email="",this.password="",this.confirmPassword="",this.isLoading=!1,this.isOAuthLoading=!1,this.errorMessage=null,this.successMessage=null,this.closeTimer=null}willUpdate(t){t.has("open")&&(this.open?(this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.mounted=!0,this.errorMessage=null,this.successMessage=null,setTimeout(()=>{this.emailInputEl&&this.emailInputEl.focus()},120)):this.mounted&&(this.closeTimer=setTimeout(()=>{this.mounted=!1},280)))}close(){this.errorMessage=null,this.successMessage=null,this.password="",this.confirmPassword="",this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}setTab(t){this.activeTab=t,this.errorMessage=null,this.successMessage=null}async handleGoogleSignIn(){this.errorMessage=null,this.successMessage=null,this.isOAuthLoading=!0;try{const t=await Te.signInWithOAuth("google");t.success||(this.errorMessage=t.message||"Google sign-in failed. Please try again.")}finally{this.isOAuthLoading=!1}}async handleSubmit(t){t.preventDefault(),this.errorMessage=null,this.successMessage=null;const e=this.email.trim();if(!e){this.errorMessage="Please enter your email address.";return}if(this.activeTab==="magic"){this.isLoading=!0;try{const s=await Te.signInWithOtp(e);s.success?this.successMessage=s.message||"Magic login link sent! Check your inbox.":this.errorMessage=s.message||"Failed to send magic link."}finally{this.isLoading=!1}return}if(!this.password){this.errorMessage="Please enter your password.";return}if(this.activeTab==="signup"){if(this.password.length<6){this.errorMessage="Password must be at least 6 characters long.";return}if(this.password!==this.confirmPassword){this.errorMessage="Passwords do not match.";return}this.isLoading=!0;try{const s=await Te.signUp(e,this.password);s.success?s.user&&!s.user.confirmed_at&&Te.getUser()===null?this.successMessage="Account created! Please check your email to confirm your account.":this.close():this.errorMessage=s.message||"Sign up failed."}finally{this.isLoading=!1}return}if(this.activeTab==="signin"){this.isLoading=!0;try{const s=await Te.signInWithPassword(e,this.password);s.success?this.close():this.errorMessage=s.message||"Invalid email or password."}finally{this.isLoading=!1}}}render(){return this.mounted?v`
      <div class="scrim ${this.open?"visible":""}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.open?"visible":""}" role="dialog" aria-modal="true" @keydown=${t=>t.key==="Escape"&&this.close()}>
          <div class="header-row">
            <h2 class="modal-title">
              <svg width="20" height="20" viewBox="0 0 30 30">
                <circle cx="11" cy="11" r="9" fill="#F2A79B" />
                <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
              </svg>
              <span>Chroma Chords</span>
            </h2>
            <button class="close-btn" @click=${this.close} aria-label="Close modal">&times;</button>
          </div>

          <div class="tabs-row">
            <button
              type="button"
              class="tab-btn ${this.activeTab==="signin"?"active":""}"
              @click=${()=>this.setTab("signin")}
            >
              Sign In
            </button>
            <button
              type="button"
              class="tab-btn ${this.activeTab==="signup"?"active":""}"
              @click=${()=>this.setTab("signup")}
            >
              Create Account
            </button>
            <button
              type="button"
              class="tab-btn ${this.activeTab==="magic"?"active":""}"
              @click=${()=>this.setTab("magic")}
            >
              Magic Link
            </button>
          </div>

          <button
            type="button"
            class="oauth-btn"
            ?disabled=${this.isOAuthLoading||this.isLoading}
            @click=${this.handleGoogleSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
            </svg>
            ${this.isOAuthLoading?"Connecting...":"Continue with Google"}
          </button>

          <div class="divider">or with email</div>

          ${this.errorMessage?v`<div class="alert-box alert-error">${this.errorMessage}</div>`:v``}
          ${this.successMessage?v`<div class="alert-box alert-success">${this.successMessage}</div>`:v``}

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input
                type="email"
                class="form-input email-input"
                required
                autocomplete="email"
                placeholder="creator@example.com"
                .value=${this.email}
                @input=${t=>this.email=t.target.value}
              />
            </div>

            ${this.activeTab==="magic"?v`
                  <div class="helper-text">
                    We'll email you a passwordless one-time login link to sign in instantly on any device.
                  </div>
                  <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                    ${this.isLoading?"Sending Link...":"Send Magic Link"}
                  </button>
                `:v`
                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-input"
                      required
                      autocomplete=${this.activeTab==="signup"?"new-password":"current-password"}
                      placeholder="••••••••"
                      .value=${this.password}
                      @input=${t=>this.password=t.target.value}
                    />
                  </div>

                  ${this.activeTab==="signup"?v`
                        <div class="form-group">
                          <label class="form-label">Confirm Password</label>
                          <input
                            type="password"
                            class="form-input"
                            required
                            autocomplete="new-password"
                            placeholder="••••••••"
                            .value=${this.confirmPassword}
                            @input=${t=>this.confirmPassword=t.target.value}
                          />
                        </div>
                        <div class="helper-text">
                          Your saved chord progressions from this browser will be safely backed up to your account.
                        </div>
                        <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                          ${this.isLoading?"Creating Account...":"Create Account"}
                        </button>
                      `:v`
                        <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                          ${this.isLoading?"Signing In...":"Sign In"}
                        </button>
                      `}
                `}
          </form>

          ${this.activeTab==="signin"?v`
                <div class="switch-hint">
                  Don't have an account?
                  <button type="button" class="link-btn" @click=${()=>this.setTab("signup")}>
                    Create one
                  </button>
                </div>
              `:this.activeTab==="signup"?v`
                <div class="switch-hint">
                  Already have an account?
                  <button type="button" class="link-btn" @click=${()=>this.setTab("signin")}>
                    Sign in
                  </button>
                </div>
              `:v`
                <div class="switch-hint">
                  Prefer password?
                  <button type="button" class="link-btn" @click=${()=>this.setTab("signin")}>
                    Sign in with password
                  </button>
                </div>
              `}
        </div>
      </div>
    `:v``}};Z.styles=ce`
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
      padding: 28px 30px;
      width: 100%;
      max-width: 420px;
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
      gap: 8px;
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
    .tabs-row {
      display: flex;
      background: var(--cv-surface-2, #EFE3D0);
      border-radius: 12px;
      padding: 3px;
      margin-bottom: 20px;
      gap: 4px;
    }
    .tab-btn {
      flex: 1;
      background: none;
      border: none;
      padding: 8px 6px;
      border-radius: 9px;
      font-size: 12.5px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      text-align: center;
    }
    .tab-btn.active {
      background: #FFFFFF;
      color: var(--cv-ink, #2E271F);
      box-shadow: 0 1.5px 4px rgba(46, 39, 31, 0.08);
    }
    .oauth-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #FFFFFF;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 100px;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      box-sizing: border-box;
      margin-bottom: 16px;
    }
    .oauth-btn:hover:not(:disabled) {
      background: #FAF8F5;
      border-color: rgba(46, 39, 31, 0.22);
    }
    .oauth-btn:active:not(:disabled) {
      transform: scale(0.97);
    }
    .oauth-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 16px 0 18px;
      color: var(--cv-ink-muted, #8A6B3F);
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid rgba(46, 39, 31, 0.12);
    }
    .divider:not(:empty)::before {
      margin-right: 12px;
    }
    .divider:not(:empty)::after {
      margin-left: 12px;
    }
    .form-group {
      margin-bottom: 14px;
    }
    .form-label {
      display: block;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      margin-bottom: 6px;
    }
    .form-input {
      width: 100%;
      box-sizing: border-box;
      background: #FFFFFF;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      border-radius: 12px;
      padding: 11px 14px;
      font-size: 14px;
      font-family: inherit;
      color: var(--cv-ink, #2E271F);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .form-input:focus {
      border-color: var(--cv-ink, #2E271F);
      box-shadow: 0 0 0 3.5px rgba(46, 39, 31, 0.08);
    }
    .form-input::placeholder {
      color: rgba(46, 39, 31, 0.35);
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
    .alert-success {
      background: #EBF3EC;
      border: 1px solid #B8DCBE;
      color: #2E6930;
    }
    .helper-text {
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.45;
      margin-top: -4px;
      margin-bottom: 16px;
    }
    .submit-btn {
      width: 100%;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border: none;
      padding: 13px 20px;
      border-radius: 100px;
      font-size: 14.5px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
      margin-top: 6px;
    }
    .submit-btn:hover:not(:disabled) {
      opacity: 0.92;
    }
    .submit-btn:active:not(:disabled) {
      transform: scale(0.97);
    }
    .submit-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      transform: none;
    }
    .switch-hint {
      font-size: 12.5px;
      color: var(--cv-ink-muted, #6B5F50);
      text-align: center;
      margin-top: 18px;
    }
    .link-btn {
      background: none;
      border: none;
      color: var(--cv-ink, #2E271F);
      font-weight: 800;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12.5px;
      font-family: inherit;
      padding: 0 0 0 4px;
    }
    .link-btn:hover {
      color: #F2735F;
    }
  `;ie([E({type:Boolean})],Z.prototype,"open",2);ie([w()],Z.prototype,"mounted",2);ie([w()],Z.prototype,"activeTab",2);ie([w()],Z.prototype,"email",2);ie([w()],Z.prototype,"password",2);ie([w()],Z.prototype,"confirmPassword",2);ie([w()],Z.prototype,"isLoading",2);ie([w()],Z.prototype,"isOAuthLoading",2);ie([w()],Z.prototype,"errorMessage",2);ie([w()],Z.prototype,"successMessage",2);ie([oi(".email-input")],Z.prototype,"emailInputEl",2);Z=ie([de("auth-modal")],Z);var ld=Object.defineProperty,cd=Object.getOwnPropertyDescriptor,j=(t,e,s,i)=>{for(var r=i>1?void 0:i?cd(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&ld(e,s,r),r};let M=class extends he{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.authModalOpen=!1,this.toastMessage=null,this.toastUndoId=null,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeProjects=null,this.unsubscribeTick=null,this.toastDismissTimeout=null,this.onHashChange=()=>{this.syncRouteFromHash()},this.onGlobalKeyDown=t=>{t.key==="Escape"&&this.sheetOpen&&(this.sheetOpen=!1,this.swapIndex=null,this.requestUpdate())},this.onLoginRequest=()=>{this.authModalOpen=!0},this.onLogoutRequest=async()=>{await Te.signOut(),X.logout()},this.previousScreenBeforeSets="seed"}connectedCallback(){super.connectedCallback(),this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const t=localStorage.getItem("chroma-chords-instrument");t&&ot.some(s=>s.name===t)&&(this.instrument=t);const e=localStorage.getItem("chroma-chords-play-style");e&&at.some(s=>s.name===e)&&(this.playStyle=e),O.setInstrument(this.instrument),O.setPlayStyle(this.playStyle),this.unsubscribeAuth=Te.subscribe(s=>{this.userEmail=s.user?.email||null,this.isAuthenticated=s.isAuthenticated}),this.unsubscribeProjects=X.subscribeProjects(()=>{this.requestUpdate()}),this.unsubscribeTick=O.subscribeTick((s,i,r,n,o)=>{this.activeIndex=s,this.progressStep=i,typeof r=="number"&&(this.activePlayingSectionIdx=r),typeof n=="number"&&(this.totalSongSteps=n),this.playing=O.isPlaying()}),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.onGlobalKeyDown),this.syncRouteFromHash(),Tc().then(s=>{this.chordData=s}).catch(s=>{console.error("Failed to load chord data:",s)})}disconnectedCallback(){super.disconnectedCallback(),O.stopAutoplay(),window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.onGlobalKeyDown),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeProjects&&this.unsubscribeProjects(),this.unsubscribeTick&&this.unsubscribeTick(),this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout)}get isAdmin(){return X.isAdmin}syncRouteFromHash(){const t=window.location.hash.replace(/^#/,"").toLowerCase();t==="sets"||t==="11a"?(this.screen!=="sets"&&(this.previousScreenBeforeSets=this.screen),this.screen="sets",this.sheetOpen=!1):t==="song"||t==="5a"?this.progression?(this.screen="song",O.setSong(this.sections)):this.screen="seed":t==="loop"||t==="3a"||t==="8a"?this.progression?this.screen="loop":this.screen="seed":(t==="seed"||t==="2a"||!t)&&(this.screen="seed")}setScreen(t){this.screen=t;const e=`#${t}`;window.location.hash!==e&&history.pushState(null,"",e)}onGenreChange(t){this.genre=t.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onMoodChange(t){this.mood=t.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onFreetextSuggestionApplied(t){const e=t.detail;this.pendingChordSuggestion=e.chords?.length&&e.key&&e.scaleType?e:null,t.detail.promptText&&(this.activeSearchPrompt=t.detail.promptText)}async onGenerate(t){this.keyOverride=null,this.scaleOverride=null;const e=t?.detail?.promptText||this.activeSearchPrompt||void 0,s=await dh.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e,this.pendingChordSuggestion);s.instrument&&(this.instrument=s.instrument,localStorage.setItem("chroma-chords-instrument",s.instrument),O.setInstrument(s.instrument)),s.playStyle&&(this.playStyle=s.playStyle,localStorage.setItem("chroma-chords-play-style",s.playStyle),O.setPlayStyle(s.playStyle));const i=s.progression;this.progression=i,this.order=Array.from({length:i.chords.length},(r,n)=>n),this.length=i.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,O.setProgression(i,this.order),O.reset(),this.setScreen("loop"),this.sections=qt.createInitialSong(i,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onLengthChange(t){this.length=t.detail}regenerate(){const t=hn(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=t,this.order=Array.from({length:this.length},(e,s)=>s),this.activeIndex=0,this.progressStep=0,O.setProgression(t,this.order),this.syncActiveSection(),this.playing&&(O.startAutoplay(),O.playActiveChord())}syncActiveSection(){this.progression&&(this.sections=qt.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order))}onSetKey(t){this.keyOverride=t.detail,this.regenerate()}onSetScale(t){this.scaleOverride=t.detail,this.regenerate()}onSetGenre(t){this.genre=t.detail,this.regenerate()}onSetMood(t){this.mood=t.detail,this.regenerate()}onSetLength(t){this.length=t.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(t){if(!this.progression)return;const e=this.order[this.activeIndex];this.order=t.detail;const s=this.order.indexOf(e);this.activeIndex=s>=0?s:0,O.setOrder(this.order,this.activeIndex),this.syncActiveSection()}onBack(){O.stopAutoplay(),this.playing=!1,this.setScreen("seed"),this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onViewSets(){O.stopAutoplay(),this.playing=!1,this.previousScreenBeforeSets=this.screen==="sets"?"seed":this.screen,this.setScreen("sets")}onBackFromSets(){O.stopAutoplay(),this.playing=!1,this.progression?this.setScreen(this.previousScreenBeforeSets==="song"?"song":"loop"):this.setScreen("seed")}onLoadProject(t){const e=t.detail,s=X.getProjects().find(i=>i.id===e);s&&(this.currentProjectId=s.id,this.progression={genre:s.genre||"Unknown",mood:s.mood||"Neutral",key:s.key||"C",scaleType:s.scaleType||"MAJOR",bpm:s.bpm||120,chords:s.chords},this.order=Array.from({length:this.progression.chords.length},(i,r)=>r),this.length=this.progression.chords.length,this.showTheory=s.showTheory??this.showTheory,O.setProgression(this.progression,this.order),this.setScreen("loop"),this.sections=qt.createInitialSong(this.progression,this.order),this.activeSectionIdx=0)}onDeleteProject(t){X.deleteProject(t.detail),this.currentProjectId===t.detail&&(this.currentProjectId=null),this.requestUpdate()}onRenameProject(t){const e=X.getProjects().find(s=>s.id===t.detail.id);e&&(e.name=t.detail.name,X.saveProject(e),this.requestUpdate())}async onSyncProjects(){await X.syncWithCloud(),this.requestUpdate()}onSaveSet(t){this.saveProject(t.detail)}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(t){this.instrument=t.detail,localStorage.setItem("chroma-chords-instrument",t.detail),O.setInstrument(t.detail)}onSetPlayStyle(t){this.playStyle=t.detail,localStorage.setItem("chroma-chords-play-style",t.detail),O.setPlayStyle(t.detail)}onTogglePlay(){this.playing=O.togglePlay()}onTogglePlaySong(){O.setSong(this.sections),this.playing=O.togglePlay()}onChordTap(t){this.progression&&(this.swapIndex=t.detail,this.sheetMode="swap",this.alternatives=Kc(this.chordData,this.progression,t.detail),this.sheetOpen=!0,O.playChordAtIndex(t.detail,.8))}onChordVoicingTap(t){this.progression&&(this.swapIndex=t.detail,this.sheetMode="voicing",this.alternatives=[],this.sheetOpen=!0,O.playChordAtIndex(t.detail,.8))}onChordPreview(t){this.progression&&(this.playing&&(O.stopAutoplay(),this.playing=!1),O.playChordAtIndex(t.detail,.8))}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(t){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=t.detail.chord,this.progression={...this.progression,chords:e},O.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),O.playChordNotes(t.detail.chord.notes,.8)}onVoicingPreview(t){O.playChordNotes(t.detail,.6)}onVoicingChange(t){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=Wc(e[this.swapIndex],t.detail.quality,t.detail.extension),this.progression={...this.progression,chords:e},O.setProgression(this.progression,this.order),this.syncActiveSection()}onBackToProgression(){O.stopAutoplay(),this.playing=!1,this.setScreen("loop"),this.progression&&O.setProgression(this.progression,this.order)}onViewSong(){O.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.setScreen("song"),O.setSong(this.sections)}onSelectSection(t){const e=this.sections[t.detail];e&&(this.activeSectionIdx=t.detail,this.progression=e.progression,this.order=e.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=e.progression.chords.length,this.keyOverride=e.progression.key,this.scaleOverride=e.progression.scaleType,this.sheetOpen=!1,this.setScreen("loop"),O.setProgression(this.progression,this.order),this.playing&&(O.startAutoplay(),O.playActiveChord()))}onAddSection(){if(!this.progression)return;const t=qt.addSection(this.sections,this.progression);this.sections=t.sections,this.activeSectionIdx=t.activeIndex,this.screen==="song"&&O.setSong(this.sections)}showToast(t,e){this.toastDismissTimeout&&clearTimeout(this.toastDismissTimeout),this.toastMessage=t,this.toastUndoId=e||null,this.toastDismissTimeout=setTimeout(()=>{this.toastMessage=null,this.toastUndoId=null},4500)}onToastUndo(){this.toastUndoId&&(X.deleteProject(this.toastUndoId),this.currentProjectId===this.toastUndoId&&(this.currentProjectId=null),this.toastMessage=null,this.toastUndoId=null,this.requestUpdate())}onToastView(){this.toastMessage=null,this.toastUndoId=null,this.onViewSets()}saveProject(t){if(!this.progression)return;const e=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=e;const s=X.getProjects().find(n=>n.id===e),i=t||(s?s.name:`${this.progression.genre} · ${this.progression.mood}`),r={id:e,name:i,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};X.saveProject(r),t&&X.scheduleCloudSync(),this.showToast(`Saved "${i}"`,e),this.requestUpdate()}render(){let t;const e=!!(this.currentProjectId&&X.isProjectSaved(this.currentProjectId));if(this.screen==="sets")t=v`
        <sets-screen
          .projects=${X.getProjects()}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          @back=${this.onBackFromSets}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
          @rename-project=${this.onRenameProject}
          @sync-projects=${this.onSyncProjects}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></sets-screen>
      `;else if(this.screen==="seed"||!this.progression)t=v`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .isAdmin=${this.isAdmin}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @view-sets=${this.onViewSets}
        ></seed-screen>
      `;else if(this.screen==="song")t=v`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length<ft.length}
          .playing=${this.playing}
          .progressStep=${this.progressStep}
          .totalSteps=${this.totalSongSteps}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          .isBookmarked=${e}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
          @toggle-play-song=${this.onTogglePlaySong}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></song-screen>
      `;else{const s=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;t=v`
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
          .isBookmarked=${e}
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${s}
          .swapIndex=${this.swapIndex}
          .alternatives=${this.alternatives}
          @back=${this.onBack}
          @theory-toggle=${this.onTheoryToggle}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @toggle-play=${this.onTogglePlay}
          @chord-tap=${this.onChordTap}
          @chord-voicing-tap=${this.onChordVoicingTap}
          @chord-preview=${this.onChordPreview}
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
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></loop-screen>
      `}return v`
      <div class="screen-view">
        ${t}
        ${this.toastMessage?v`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              <button class="toast-btn" @click=${this.onToastView}>View</button>
              ${this.toastUndoId?v`
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
    `}};M.styles=ce`
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
  `;j([w()],M.prototype,"chordData",2);j([w()],M.prototype,"screen",2);j([w()],M.prototype,"genre",2);j([w()],M.prototype,"mood",2);j([w()],M.prototype,"progression",2);j([w()],M.prototype,"activeIndex",2);j([w()],M.prototype,"progressStep",2);j([w()],M.prototype,"order",2);j([w()],M.prototype,"keyOverride",2);j([w()],M.prototype,"scaleOverride",2);j([w()],M.prototype,"playing",2);j([w()],M.prototype,"showTheory",2);j([w()],M.prototype,"instrument",2);j([w()],M.prototype,"playStyle",2);j([w()],M.prototype,"sheetOpen",2);j([w()],M.prototype,"sheetMode",2);j([w()],M.prototype,"swapIndex",2);j([w()],M.prototype,"alternatives",2);j([w()],M.prototype,"length",2);j([w()],M.prototype,"sections",2);j([w()],M.prototype,"activeSectionIdx",2);j([w()],M.prototype,"activePlayingSectionIdx",2);j([w()],M.prototype,"totalSongSteps",2);j([w()],M.prototype,"pendingChordSuggestion",2);j([w()],M.prototype,"userEmail",2);j([w()],M.prototype,"isAuthenticated",2);j([w()],M.prototype,"authModalOpen",2);j([w()],M.prototype,"toastMessage",2);j([w()],M.prototype,"toastUndoId",2);M=j([de("chroma-chords-app")],M);
