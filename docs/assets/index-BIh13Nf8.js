(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xs=globalThis,pi=Xs.ShadowRoot&&(Xs.ShadyCSS===void 0||Xs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fi=Symbol(),cr=new WeakMap;let io=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==fi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(pi&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=cr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&cr.set(t,e))}return e}toString(){return this.cssText}};const Ra=n=>new io(typeof n=="string"?n:n+"",void 0,fi),Ns=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new io(t,n,fi)},$a=(n,e)=>{if(pi)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=Xs.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},lr=pi?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Ra(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pa,defineProperty:Va,getOwnPropertyDescriptor:Fa,getOwnPropertyNames:Ua,getOwnPropertySymbols:La,getPrototypeOf:Ba}=Object,Tn=globalThis,hr=Tn.trustedTypes,ja=hr?hr.emptyScript:"",qa=Tn.reactiveElementPolyfillSupport,gs=(n,e)=>n,Ks={toAttribute(n,e){switch(e){case Boolean:n=n?ja:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},mi=(n,e)=>!Pa(n,e),ur={attribute:!0,type:String,converter:Ks,reflect:!1,useDefault:!1,hasChanged:mi};Symbol.metadata??=Symbol("metadata"),Tn.litPropertyMetadata??=new WeakMap;let zt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ur){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Va(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=Fa(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ur}static _$Ei(){if(this.hasOwnProperty(gs("elementProperties")))return;const e=Ba(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(gs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gs("properties"))){const t=this.properties,s=[...Ua(t),...La(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(lr(i))}else e!==void 0&&t.push(lr(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $a(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:Ks).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ks;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??mi)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,r]of s){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};zt.elementStyles=[],zt.shadowRootOptions={mode:"open"},zt[gs("elementProperties")]=new Map,zt[gs("finalized")]=new Map,qa?.({ReactiveElement:zt}),(Tn.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=globalThis,dr=n=>n,en=gi.trustedTypes,pr=en?en.createPolicy("lit-html",{createHTML:n=>n}):void 0,ro="$lit$",_t=`lit$${Math.random().toFixed(9).slice(2)}$`,oo="?"+_t,Wa=`<${oo}>`,Dt=document,ys=()=>Dt.createComment(""),vs=n=>n===null||typeof n!="object"&&typeof n!="function",_i=Array.isArray,za=n=>_i(n)||typeof n?.[Symbol.iterator]=="function",Qn=`[ 	
\f\r]`,ps=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fr=/-->/g,mr=/>/g,St=RegExp(`>|${Qn}(?:([^\\s"'>=/]+)(${Qn}*=${Qn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gr=/'/g,_r=/"/g,ao=/^(?:script|style|textarea|title)$/i,co=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),B=co(1),lo=co(2),Qt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),yr=new WeakMap,kt=Dt.createTreeWalker(Dt,129);function ho(n,e){if(!_i(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return pr!==void 0?pr.createHTML(e):e}const Ga=(n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=ps;for(let a=0;a<t;a++){const c=n[a];let l,h,u=-1,p=0;for(;p<c.length&&(o.lastIndex=p,h=o.exec(c),h!==null);)p=o.lastIndex,o===ps?h[1]==="!--"?o=fr:h[1]!==void 0?o=mr:h[2]!==void 0?(ao.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=St):h[3]!==void 0&&(o=St):o===St?h[0]===">"?(o=i??ps,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?St:h[3]==='"'?_r:gr):o===_r||o===gr?o=St:o===fr||o===mr?o=ps:(o=St,i=void 0);const f=o===St&&n[a+1].startsWith("/>")?" ":"";r+=o===ps?c+Wa:u>=0?(s.push(l),c.slice(0,u)+ro+c.slice(u)+_t+f):c+_t+(u===-2?a:f)}return[ho(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class xs{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,h]=Ga(e,t);if(this.el=xs.createElement(l,s),kt.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=kt.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ro)){const p=h[o++],f=i.getAttribute(u).split(_t),d=/([.?@])?(.*)/.exec(p);c.push({type:1,index:r,name:d[2],strings:f,ctor:d[1]==="."?Ha:d[1]==="?"?Xa:d[1]==="@"?Za:An}),i.removeAttribute(u)}else u.startsWith(_t)&&(c.push({type:6,index:r}),i.removeAttribute(u));if(ao.test(i.tagName)){const u=i.textContent.split(_t),p=u.length-1;if(p>0){i.textContent=en?en.emptyScript:"";for(let f=0;f<p;f++)i.append(u[f],ys()),kt.nextNode(),c.push({type:2,index:++r});i.append(u[p],ys())}}}else if(i.nodeType===8)if(i.data===oo)c.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(_t,u+1))!==-1;)c.push({type:7,index:r}),u+=_t.length-1}r++}}static createElement(e,t){const s=Dt.createElement("template");return s.innerHTML=e,s}}function Jt(n,e,t=n,s){if(e===Qt)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl;const r=vs(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=Jt(n,i._$AS(n,e.values),i,s)),e}class Ya{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??Dt).importNode(t,!0);kt.currentNode=i;let r=kt.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new Ss(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new Qa(r,this,e)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=kt.nextNode(),o++)}return kt.currentNode=Dt,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Ss{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Jt(this,e,t),vs(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==Qt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):za(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&vs(this._$AH)?this._$AA.nextSibling.data=e:this.T(Dt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=xs.createElement(ho(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new Ya(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=yr.get(e.strings);return t===void 0&&yr.set(e.strings,t=new xs(e)),t}k(e){_i(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Ss(this.O(ys()),this.O(ys()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=dr(e).nextSibling;dr(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class An{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ve}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=Jt(this,e,t,0),o=!vs(e)||e!==this._$AH&&e!==Qt,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=Jt(this,a[s+c],t,c),l===Qt&&(l=this._$AH[c]),o||=!vs(l)||l!==this._$AH[c],l===ve?e=ve:e!==ve&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ha extends An{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}}class Xa extends An{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}}class Za extends An{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=Jt(this,e,t,0)??ve)===Qt)return;const s=this._$AH,i=e===ve&&s!==ve||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==ve&&(s===ve||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Qa{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Jt(this,e)}}const Ja=gi.litHtmlPolyfillSupport;Ja?.(xs,Ss),(gi.litHtmlVersions??=[]).push("3.3.3");const Ka=(n,e,t)=>{const s=t?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const r=t?.renderBefore??null;s._$litPart$=i=new Ss(e.insertBefore(ys(),r),r,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yi=globalThis;class ot extends zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ka(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qt}}ot._$litElement$=!0,ot.finalized=!0,yi.litElementHydrateSupport?.({LitElement:ot});const ec=yi.litElementPolyfillSupport;ec?.({LitElement:ot});(yi.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ks=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tc={attribute:!0,type:String,converter:Ks,reflect:!1,hasChanged:mi},sc=(n=tc,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),s==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(s==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+s)};function ye(n){return(e,t)=>typeof t=="object"?sc(n,e,t):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function J(n){return ye({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nc=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vi(n,e){return(t,s,i)=>{const r=o=>o.renderRoot?.querySelector(n)??null;return nc(t,s,{get(){return r(this)}})}}const fs="chroma_chords_projects",ic="chord_voyager_projects";class qt{static getProjects(){try{let e=localStorage.getItem(fs);if(e||(e=localStorage.getItem(ic),e&&localStorage.setItem(fs,e)),e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(fs,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const s=new Map;return e.forEach(i=>s.set(i.id,i)),t.forEach(i=>{const r=s.get(i.id);!r||i.lastModified>r.lastModified?s.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(e){const t=this.getProjects(),s=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),s>=0?t[s]=e:t.push(e);try{localStorage.setItem(fs,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(s=>s.id!==e);try{localStorage.setItem(fs,JSON.stringify(t))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,s)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},i.onerror=()=>s(new Error("Failed to read file")),i.readAsText(e)})}}class rc{constructor(){this.accessToken=null,this.FILENAME="chroma_chords_projects.json",this.OLD_FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const s=await t.json();if(s.files&&s.files.length>0)return s.files[0].id;const i=encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`),r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${i}&fields=files(id)`,{method:"GET",headers:this.headers});if(r.ok){const o=await r.json();if(o.files&&o.files.length>0)return o.files[0].id}return null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),s=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}async findAudioFileId(e){try{const t=`recording_${e}.webm`,s=encodeURIComponent(`name='${t}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const r=await i.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(t){throw console.error(`Failed to find audio file for project ${e}:`,t),t}}async uploadAudioFile(e,t){try{const s=`recording_${e}.webm`,i=await this.findAudioFileId(e);if(i){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return i}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const a=(await r.json()).id,c=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!c.ok)throw new Error(`Failed to upload new audio file content: ${c.statusText}`);return a}}catch(s){throw console.error(`Failed to upload audio file for project ${e}:`,s),s}}async downloadAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(t){throw console.error(`Failed to download audio file for project ${e}:`,t),t}}async deleteAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(t){throw console.error(`Failed to delete audio file for project ${e}:`,t),t}}}const uo="15.1.22",vr=(n,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:n}),xr=(n,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:n}),ti=(n,e)=>({startTime:e,type:"setValue",value:n}),po=(n,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:n}),fo=(n,e,{startTime:t,target:s,timeConstant:i})=>s+(e-s)*Math.exp((t-n)/i),Yt=n=>n.type==="exponentialRampToValue",tn=n=>n.type==="linearRampToValue",gt=n=>Yt(n)||tn(n),xi=n=>n.type==="setValue",rt=n=>n.type==="setValueCurve",sn=(n,e,t,s)=>{const i=n[e];return i===void 0?s:gt(i)||xi(i)?i.value:rt(i)?i.values[i.values.length-1]:fo(t,sn(n,e-1,i.startTime,s),i)},wr=(n,e,t,s,i)=>t===void 0?[s.insertTime,i]:gt(t)?[t.endTime,t.value]:xi(t)?[t.startTime,t.value]:rt(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,sn(n,e-1,t.startTime,i)],si=n=>n.type==="cancelAndHold",ni=n=>n.type==="cancelScheduledValues",mt=n=>si(n)||ni(n)?n.cancelTime:Yt(n)||tn(n)?n.endTime:n.startTime,br=(n,e,t,{endTime:s,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((n-e)/(s-e)):n<s?t:i,Tr=(n,e,t,{endTime:s,value:i})=>t+(n-e)/(s-e)*(i-t),mo=(n,e)=>{const t=Math.floor(e);if(t===e)return n[t];const s=Math.ceil(e);return(1-(e-t))*n[t]+(1-(s-e))*n[s]},oc=(n,{duration:e,startTime:t,values:s})=>{const i=(n-t)/e*(s.length-1);return mo(s,i)},ac=(n,e,t)=>{const s=n.length,i=Math.max(1,Math.floor(t/e*s))+1,r=n instanceof Float32Array?new Float32Array(i):n.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(s-1);r[o]=mo(n,c)}return r},qs=n=>n.type==="setTarget";class cc{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=mt(e);if(si(e)||ni(e)){const s=this._automationEvents.findIndex(r=>ni(e)&&rt(r)?r.startTime+r.duration>=t:mt(r)>=t),i=this._automationEvents[s];if(s!==-1&&(this._automationEvents=this._automationEvents.slice(0,s)),si(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&gt(i)){if(r!==void 0&&qs(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:rt(r)?r.startTime+r.duration:mt(r),a=r===void 0?this._defaultValue:rt(r)?r.values[r.values.length-1]:r.value,c=Yt(i)?br(t,o,a,i):Tr(t,o,a,i),l=Yt(i)?vr(c,t,this._currenTime):xr(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&qs(r)&&this._automationEvents.push(ti(this.getValue(t),t)),r!==void 0&&rt(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=po(ac(r.values,r.duration,o),r.startTime,o)}}}else{const s=this._automationEvents.findIndex(o=>mt(o)>t),i=s===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[s-1];if(i!==void 0&&rt(i)&&mt(i)+i.duration>t)return!1;const r=Yt(e)?vr(e.value,e.endTime,this._currenTime):tn(e)?xr(e.value,t,this._currenTime):e;if(s===-1)this._automationEvents.push(r);else{if(rt(e)&&t+e.duration>mt(this._automationEvents[s]))return!1;this._automationEvents.splice(s,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(s=>mt(s)>e);if(t>1){const s=this._automationEvents.slice(t-1),i=s[0];qs(i)&&s.unshift(ti(sn(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=s}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>mt(o)>e),s=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&qs(r)&&(s===void 0||!gt(s)||s.insertTime>e))return fo(e,sn(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&xi(r)&&(s===void 0||!gt(s)))return r.value;if(r!==void 0&&rt(r)&&(s===void 0||!gt(s)||r.startTime+r.duration>e))return e<r.startTime+r.duration?oc(e,r):r.values[r.values.length-1];if(r!==void 0&&gt(r)&&(s===void 0||!gt(s)))return r.value;if(s!==void 0&&Yt(s)){const[o,a]=wr(this._automationEvents,i,r,s,this._defaultValue);return br(e,o,a,s)}if(s!==void 0&&tn(s)){const[o,a]=wr(this._automationEvents,i,r,s,this._defaultValue);return Tr(e,o,a,s)}return this._defaultValue}}const lc=n=>({cancelTime:n,type:"cancelAndHold"}),hc=n=>({cancelTime:n,type:"cancelScheduledValues"}),uc=(n,e)=>({endTime:e,type:"exponentialRampToValue",value:n}),dc=(n,e)=>({endTime:e,type:"linearRampToValue",value:n}),pc=(n,e,t)=>({startTime:e,target:n,timeConstant:t,type:"setTarget"}),fc=()=>new DOMException("","AbortError"),mc=n=>(e,t,[s,i,r],o)=>{n(e[i],[t,s,r],a=>a[0]===t&&a[1]===s,o)},gc=n=>(e,t,s)=>{const i=[];for(let r=0;r<s.numberOfInputs;r+=1)i.push(new Set);n.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},_c=n=>(e,t)=>{n.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},Kt=new WeakSet,go=new WeakMap,wi=new WeakMap,_o=new WeakMap,bi=new WeakMap,Nn=new WeakMap,yo=new WeakMap,ii=new WeakMap,ri=new WeakMap,oi=new WeakMap,vo={construct(){return vo}},yc=n=>{try{const e=new Proxy(n,vo);new e}catch{return!1}return!0},Ar=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Nr=(n,e)=>{const t=[];let s=n.replace(/^[\s]+/,""),i=s.match(Ar);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),s=s.slice(i[0].length).replace(/^[\s]+/,""),i=s.match(Ar)}return[t.join(";"),s]},Sr=n=>{if(n!==void 0&&!Array.isArray(n))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},kr=n=>{if(!yc(n))throw new TypeError("The given value for processorCtor should be a constructor.");if(n.prototype===null||typeof n.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},vc=(n,e,t,s,i,r,o,a,c,l,h,u,p)=>{let f=0;return(d,m,g={credentials:"omit"})=>{const _=h.get(d);if(_!==void 0&&_.has(m))return Promise.resolve();const w=l.get(d);if(w!==void 0){const y=w.get(m);if(y!==void 0)return y}const T=r(d),A=T.audioWorklet===void 0?i(m).then(([y,x])=>{const[b,v]=Nr(y,x),C=`${b};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${v}
})})(window,'_AWGS')`;return t(C)}).then(()=>{const y=p._AWGS.pop();if(y===void 0)throw new SyntaxError;s(T.currentTime,T.sampleRate,()=>y(class{},void 0,(x,b)=>{if(x.trim()==="")throw e();const v=ri.get(T);if(v!==void 0){if(v.has(x))throw e();kr(b),Sr(b.parameterDescriptors),v.set(x,b)}else kr(b),Sr(b.parameterDescriptors),ri.set(T,new Map([[x,b]]))},T.sampleRate,void 0,void 0))}):Promise.all([i(m),Promise.resolve(n(u,u))]).then(([[y,x],b])=>{const v=f+1;f=v;const[C,k]=Nr(y,x),O=`${C};((AudioWorkletProcessor,registerProcessor)=>{${k}
})(${b?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${b?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${b?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${v}',class extends AudioWorkletProcessor{process(){return !1}})`,V=new Blob([O],{type:"application/javascript; charset=utf-8"}),M=URL.createObjectURL(V);return T.audioWorklet.addModule(M,g).then(()=>{if(a(T))return T;const $=o(T);return $.audioWorklet.addModule(M,g).then(()=>$)}).then($=>{if(c===null)throw new SyntaxError;try{new c($,`__sac${v}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(M))});return w===void 0?l.set(d,new Map([[m,A]])):w.set(m,A),A.then(()=>{const y=h.get(d);y===void 0?h.set(d,new Set([m])):y.add(m)}).finally(()=>{const y=l.get(d);y!==void 0&&y.delete(m)}),A}},Ye=(n,e)=>{const t=n.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},Sn=(n,e)=>{const t=Array.from(n).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[s]=t;return n.delete(s),s},xo=(n,e,t,s)=>{const i=Ye(n,e),r=Sn(i,o=>o[0]===t&&o[1]===s);return i.size===0&&n.delete(e),r},Cs=n=>Ye(yo,n),es=n=>{if(Kt.has(n))throw new Error("The AudioNode is already stored.");Kt.add(n),Cs(n).forEach(e=>e(!0))},wo=n=>"port"in n,Is=n=>{if(!Kt.has(n))throw new Error("The AudioNode is not stored.");Kt.delete(n),Cs(n).forEach(e=>e(!1))},ai=(n,e)=>{!wo(n)&&e.every(t=>t.size===0)&&Is(n)},xc=(n,e,t,s,i,r,o,a,c,l,h,u,p)=>{const f=new WeakMap;return(d,m,g,_,w)=>{const{activeInputs:T,passiveInputs:A}=r(m),{outputs:y}=r(d),x=a(d),b=v=>{const C=c(m),k=c(d);if(v){const S=xo(A,d,g,_);n(T,d,S,!1),!w&&!u(d)&&t(k,C,g,_),p(m)&&es(m)}else{const S=s(T,d,g,_);e(A,_,S,!1),!w&&!u(d)&&i(k,C,g,_);const N=o(m);if(N===0)h(m)&&ai(m,T);else{const E=f.get(m);E!==void 0&&clearTimeout(E),f.set(m,setTimeout(()=>{h(m)&&ai(m,T)},N*1e3))}}};return l(y,[m,g,_],v=>v[0]===m&&v[1]===g&&v[2]===_,!0)?(x.add(b),h(d)?n(T,d,[g,_,b],!0):e(A,_,[d,g,b],!0),!0):!1}},wc=n=>(e,t,[s,i,r],o)=>{const a=e.get(s);a===void 0?e.set(s,new Set([[i,t,r]])):n(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},bc=n=>(e,t)=>{const s=n(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(s).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(s),s.disconnect()};t.addEventListener("ended",i)},Tc=n=>(e,t)=>{n(e).add(t)},Ac={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},Nc=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...Ac,...c},u=s(l,h),p=r(l)?e():null;super(a,!1,u,p),this._nativeAnalyserNode=u}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Ne=(n,e)=>n.context===e,Sc=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ne(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},nn=n=>{try{n.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},tt=()=>new DOMException("","IndexSizeError"),Ti=n=>{n.getChannelData=(e=>t=>{try{return e.call(n,t)}catch(s){throw s.code===12?tt():s}})(n.getChannelData)},kc={numberOfChannels:1},Cc=(n,e,t,s,i,r,o,a)=>{let c=null;return class bo{constructor(h){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:u,numberOfChannels:p,sampleRate:f}={...kc,...h};c===null&&(c=new i(1,1,44100));const d=s!==null&&e(r,r)?new s({length:u,numberOfChannels:p,sampleRate:f}):c.createBuffer(p,u,f);if(d.numberOfChannels===0)throw t();return typeof d.copyFromChannel!="function"?(o(d),Ti(d)):e(nn,()=>nn(d))||a(d),n.add(d),d}static[Symbol.hasInstance](h){return h!==null&&typeof h=="object"&&Object.getPrototypeOf(h)===bo.prototype||n.has(h)}}},Ee=-34028234663852886e22,ke=-Ee,at=n=>Kt.has(n),Ic={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},Oc=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),p={...Ic,...h},f=i(u,p),d=o(u),m=d?e():null;super(l,!1,f,m),this._audioBufferSourceNodeRenderer=m,this._isBufferNullified=!1,this._isBufferSet=p.buffer!==null,this._nativeAudioBufferSourceNode=f,this._onended=null,this._playbackRate=t(this,d,f.playbackRate,ke,Ee)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw s();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const h=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=h;const u=this._nativeAudioBufferSourceNode.onended;this._onended=u!==null&&u===h?l:u}get playbackRate(){return this._playbackRate}start(l=0,h=0,u){if(this._nativeAudioBufferSourceNode.start(l,h,u),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=u===void 0?[l,h]:[l,h,u]),this.context.state!=="closed"){es(this);const p=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",p),at(this)&&Is(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",p)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},Ec=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const p=Ne(u,h);if(!p){const f={buffer:u.buffer,channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,loop:u.loop,loopEnd:u.loopEnd,loopStart:u.loopStart,playbackRate:u.playbackRate.value};u=e(h,f),o!==null&&u.start(...o),a!==null&&u.stop(a)}return r.set(h,u),p?await n(h,l.playbackRate,u.playbackRate):await s(h,l.playbackRate,u.playbackRate),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},Mc=n=>"playbackRate"in n,Dc=n=>"frequency"in n&&"gain"in n,Rc=n=>"offset"in n,$c=n=>!("frequency"in n)&&"gain"in n,Pc=n=>"detune"in n&&"frequency"in n&&!("gain"in n),Vc=n=>"pan"in n,Ce=n=>Ye(go,n),Os=n=>Ye(_o,n),ci=(n,e)=>{const{activeInputs:t}=Ce(n);t.forEach(i=>i.forEach(([r])=>{e.includes(n)||ci(r,[...e,n])}));const s=Mc(n)?[n.playbackRate]:wo(n)?Array.from(n.parameters.values()):Dc(n)?[n.Q,n.detune,n.frequency,n.gain]:Rc(n)?[n.offset]:$c(n)?[n.gain]:Pc(n)?[n.detune,n.frequency]:Vc(n)?[n.pan]:[];for(const i of s){const r=Os(i);r!==void 0&&r.activeInputs.forEach(([o])=>ci(o,e))}at(n)&&Is(n)},To=n=>{ci(n.destination,[])},Fc=n=>n===void 0||typeof n=="number"||typeof n=="string"&&(n==="balanced"||n==="interactive"||n==="playback"),Uc=(n,e,t,s,i,r,o,a,c)=>class extends n{constructor(h={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let u;try{u=new c(h)}catch(d){throw d.code===12&&d.message==="sampleRate is not in range"?t():d}if(u===null)throw s();if(!Fc(h.latencyHint))throw new TypeError(`The provided value '${h.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(h.sampleRate!==void 0&&u.sampleRate!==h.sampleRate)throw t();super(u,2);const{latencyHint:p}=h,{sampleRate:f}=u;if(this._baseLatency=typeof u.baseLatency=="number"?u.baseLatency:p==="balanced"?512/f:p==="interactive"||p===void 0?256/f:p==="playback"?1024/f:Math.max(2,Math.min(128,Math.round(p*f/128)))*128/f,this._nativeAudioContext=u,c.name==="webkitAudioContext"?(this._nativeGainNode=u.createGain(),this._nativeOscillatorNode=u.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(u.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,u.state==="running"){this._state="suspended";const d=()=>{this._state==="suspended"&&(this._state=null),u.removeEventListener("statechange",d)};u.addEventListener("statechange",d)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),To(this)}))}createMediaElementSource(h){return new i(this,{mediaElement:h})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(h){return new o(this,{mediaStream:h})}createMediaStreamTrackSource(h){return new a(this,{mediaStreamTrack:h})}resume(){return this._state==="suspended"?new Promise((h,u)=>{const p=()=>{this._nativeAudioContext.removeEventListener("statechange",p),this._nativeAudioContext.state==="running"?h():this.resume().then(h,u)};this._nativeAudioContext.addEventListener("statechange",p)}):this._nativeAudioContext.resume().catch(h=>{throw h===void 0||h.code===15?e():h})}suspend(){return this._nativeAudioContext.suspend().catch(h=>{throw h===void 0?e():h})}},Lc=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),p=o(u),f=i(u,h,p),d=p?e(a):null;super(l,!1,f,d),this._isNodeOfNativeOfflineAudioContext=p,this._nativeAudioDestinationNode=f}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Bc=n=>{const e=new WeakMap,t=async(s,i)=>{const r=i.destination;return e.set(i,r),await n(s,i,r),r};return{render(s,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(s,i)}}},jc=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=l.listener,u=()=>{const y=new Float32Array(1),x=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),b=o(l);let v=!1,C=[0,0,-1,0,1,0],k=[0,0,0];const S=()=>{if(v)return;v=!0;const V=s(l,256,9,0);V.onaudioprocess=({inputBuffer:M})=>{const $=[r(M,y,0),r(M,y,1),r(M,y,2),r(M,y,3),r(M,y,4),r(M,y,5)];$.some((F,q)=>F!==C[q])&&(h.setOrientation(...$),C=$);const W=[r(M,y,6),r(M,y,7),r(M,y,8)];W.some((F,q)=>F!==k[q])&&(h.setPosition(...W),k=W)},x.connect(V)},N=V=>M=>{M!==C[V]&&(C[V]=M,h.setOrientation(...C))},E=V=>M=>{M!==k[V]&&(k[V]=M,h.setPosition(...k))},O=(V,M,$)=>{const W=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:M});W.connect(x,0,V),W.start(),Object.defineProperty(W.offset,"defaultValue",{get(){return M}});const F=n({context:c},b,W.offset,ke,Ee);return a(F,"value",q=>()=>q.call(F),q=>j=>{try{q.call(F,j)}catch(K){if(K.code!==9)throw K}S(),b&&$(j)}),F.cancelAndHoldAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.cancelAndHoldAtTime),F.cancelScheduledValues=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.cancelScheduledValues),F.exponentialRampToValueAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.exponentialRampToValueAtTime),F.linearRampToValueAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.linearRampToValueAtTime),F.setTargetAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.setTargetAtTime),F.setValueAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.setValueAtTime),F.setValueCurveAtTime=(q=>b?()=>{throw i()}:(...j)=>{const K=q.apply(F,j);return S(),K})(F.setValueCurveAtTime),F};return{forwardX:O(0,0,N(0)),forwardY:O(1,0,N(1)),forwardZ:O(2,-1,N(2)),positionX:O(6,0,E(0)),positionY:O(7,0,E(1)),positionZ:O(8,0,E(2)),upX:O(3,0,N(3)),upY:O(4,1,N(4)),upZ:O(5,0,N(5))}},{forwardX:p,forwardY:f,forwardZ:d,positionX:m,positionY:g,positionZ:_,upX:w,upY:T,upZ:A}=h.forwardX===void 0?u():h;return{get forwardX(){return p},get forwardY(){return f},get forwardZ(){return d},get positionX(){return m},get positionY(){return g},get positionZ(){return _},get upX(){return w},get upY(){return T},get upZ(){return A}}},rn=n=>"context"in n,Es=n=>rn(n[0]),Ft=(n,e,t,s)=>{for(const i of n)if(t(i)){if(s)return!1;throw Error("The set contains at least one similar element.")}return n.add(e),!0},Cr=(n,e,[t,s],i)=>{Ft(n,[e,t,s],r=>r[0]===e&&r[1]===t,i)},Ir=(n,[e,t,s],i)=>{const r=n.get(e);r===void 0?n.set(e,new Set([[t,s]])):Ft(r,[t,s],o=>o[0]===t,i)},is=n=>"inputs"in n,on=(n,e,t,s)=>{if(is(e)){const i=e.inputs[s];return n.connect(i,t,0),[i,t,0]}return n.connect(e,t,s),[e,t,s]},Ao=(n,e,t)=>{for(const s of n)if(s[0]===e&&s[1]===t)return n.delete(s),s;return null},qc=(n,e,t)=>Sn(n,s=>s[0]===e&&s[1]===t),No=(n,e)=>{if(!Cs(n).delete(e))throw new Error("Missing the expected event listener.")},So=(n,e,t)=>{const s=Ye(n,e),i=Sn(s,r=>r[0]===t);return s.size===0&&n.delete(e),i},an=(n,e,t,s)=>{is(e)?n.disconnect(e.inputs[s],t,0):n.disconnect(e,t,s)},ie=n=>Ye(wi,n),ws=n=>Ye(bi,n),Rt=n=>ii.has(n),Zs=n=>!Kt.has(n),Or=(n,e)=>new Promise(t=>{if(e!==null)t(!0);else{const s=n.createScriptProcessor(256,1,1),i=n.createGain(),r=n.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=n.createBufferSource();a.buffer=r,a.loop=!0,a.connect(s).connect(n.destination),a.connect(i),a.disconnect(i),s.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,h=>h===1)?t(!0):t(!1),a.stop(),s.onaudioprocess=null,a.disconnect(s),s.disconnect(n.destination)},a.start()}}),Jn=(n,e)=>{const t=new Map;for(const s of n)for(const i of s){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((s,i)=>e(i,s))},cn=n=>"context"in n,Wc=n=>{const e=new Map;n.connect=(t=>(s,i=0,r=0)=>{const o=cn(s)?t(s,i,r):t(s,i),a=e.get(s);return a===void 0?e.set(s,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(n.connect.bind(n)),n.disconnect=(t=>(s,i,r)=>{if(t.apply(n),s===void 0)e.clear();else if(typeof s=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==s);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(s))if(i===void 0)e.delete(s);else{const o=e.get(s);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(s):e.set(s,a)}}for(const[o,a]of e)a.forEach(c=>{cn(o)?n.connect(o,c.output,c.input):n.connect(o,c.output)})})(n.disconnect)},zc=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Os(e),{outputs:o}=Ce(n),a=Cs(n),c=l=>{const h=ie(n),u=ws(e);if(l){const p=So(r,n,t);Cr(i,n,p,!1),!s&&!Rt(n)&&h.connect(u,t)}else{const p=qc(i,n,t);Ir(r,p,!1),!s&&!Rt(n)&&h.disconnect(u,t)}};return Ft(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),at(n)?Cr(i,n,[t,c],!0):Ir(r,[n,t,c],!0),!0):!1},Gc=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Ce(e),o=Ao(i[s],n,t);return o===null?[xo(r,n,t,s)[2],!1]:[o[2],!0]},Yc=(n,e,t)=>{const{activeInputs:s,passiveInputs:i}=Os(e),r=Ao(s,n,t);return r===null?[So(i,n,t)[1],!1]:[r[2],!0]},Ai=(n,e,t,s,i)=>{const[r,o]=Gc(n,t,s,i);if(r!==null&&(No(n,r),o&&!e&&!Rt(n)&&an(ie(n),ie(t),s,i)),at(t)){const{activeInputs:a}=Ce(t);ai(t,a)}},Ni=(n,e,t,s)=>{const[i,r]=Yc(n,t,s);i!==null&&(No(n,i),r&&!e&&!Rt(n)&&ie(n).disconnect(ws(t),s))},Hc=(n,e)=>{const t=Ce(n),s=[];for(const i of t.outputs)Es(i)?Ai(n,e,...i):Ni(n,e,...i),s.push(i[0]);return t.outputs.clear(),s},Xc=(n,e,t)=>{const s=Ce(n),i=[];for(const r of s.outputs)r[1]===t&&(Es(r)?Ai(n,e,...r):Ni(n,e,...r),i.push(r[0]),s.outputs.delete(r));return i},Zc=(n,e,t,s,i)=>{const r=Ce(n);return Array.from(r.outputs).filter(o=>o[0]===t&&(s===void 0||o[1]===s)&&(i===void 0||o[2]===i)).map(o=>(Es(o)?Ai(n,e,...o):Ni(n,e,...o),r.outputs.delete(o),o[0]))},Qc=(n,e,t,s,i,r,o,a,c,l,h,u,p,f,d,m)=>class extends l{constructor(_,w,T,A){super(T),this._context=_,this._nativeAudioNode=T;const y=h(_);u(y)&&t(Or,()=>Or(y,m))!==!0&&Wc(T),wi.set(this,T),yo.set(this,new Set),_.state!=="closed"&&w&&es(this),n(this,A,T)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(_){this._nativeAudioNode.channelCount=_}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(_){this._nativeAudioNode.channelCountMode=_}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(_){this._nativeAudioNode.channelInterpretation=_}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(_,w=0,T=0){if(w<0||w>=this._nativeAudioNode.numberOfOutputs)throw i();const A=h(this._context),y=d(A);if(p(_)||f(_))throw r();if(rn(_)){const v=ie(_);try{const k=on(this._nativeAudioNode,v,w,T),S=Zs(this);(y||S)&&this._nativeAudioNode.disconnect(...k),this.context.state!=="closed"&&!S&&Zs(_)&&es(_)}catch(k){throw k.code===12?r():k}if(e(this,_,w,T,y)){const k=c([this],_);Jn(k,s(y))}return _}const x=ws(_);if(x.name==="playbackRate"&&x.maxValue===1024)throw o();try{this._nativeAudioNode.connect(x,w),(y||Zs(this))&&this._nativeAudioNode.disconnect(x,w)}catch(v){throw v.code===12?r():v}if(zc(this,_,w,y)){const v=c([this],_);Jn(v,s(y))}}disconnect(_,w,T){let A;const y=h(this._context),x=d(y);if(_===void 0)A=Hc(this,x);else if(typeof _=="number"){if(_<0||_>=this.numberOfOutputs)throw i();A=Xc(this,x,_)}else{if(w!==void 0&&(w<0||w>=this.numberOfOutputs)||rn(_)&&T!==void 0&&(T<0||T>=_.numberOfInputs))throw i();if(A=Zc(this,x,_,w,T),A.length===0)throw r()}for(const b of A){const v=c([this],b);Jn(v,a)}}},Jc=(n,e,t,s,i,r,o,a,c,l,h,u,p)=>(f,d,m,g=null,_=null)=>{const w=m.value,T=new cc(w),A=d?s(T):null,y={get defaultValue(){return w},get maxValue(){return g===null?m.maxValue:g},get minValue(){return _===null?m.minValue:_},get value(){return m.value},set value(x){m.value=x,y.setValueAtTime(x,f.context.currentTime)},cancelAndHoldAtTime(x){if(typeof m.cancelAndHoldAtTime=="function")A===null&&T.flush(f.context.currentTime),T.add(i(x)),m.cancelAndHoldAtTime(x);else{const b=Array.from(T).pop();A===null&&T.flush(f.context.currentTime),T.add(i(x));const v=Array.from(T).pop();m.cancelScheduledValues(x),b!==v&&v!==void 0&&(v.type==="exponentialRampToValue"?m.exponentialRampToValueAtTime(v.value,v.endTime):v.type==="linearRampToValue"?m.linearRampToValueAtTime(v.value,v.endTime):v.type==="setValue"?m.setValueAtTime(v.value,v.startTime):v.type==="setValueCurve"&&m.setValueCurveAtTime(v.values,v.startTime,v.duration))}return y},cancelScheduledValues(x){return A===null&&T.flush(f.context.currentTime),T.add(r(x)),m.cancelScheduledValues(x),y},exponentialRampToValueAtTime(x,b){if(x===0)throw new RangeError;if(!Number.isFinite(b)||b<0)throw new RangeError;const v=f.context.currentTime;return A===null&&T.flush(v),Array.from(T).length===0&&(T.add(l(w,v)),m.setValueAtTime(w,v)),T.add(o(x,b)),m.exponentialRampToValueAtTime(x,b),y},linearRampToValueAtTime(x,b){const v=f.context.currentTime;return A===null&&T.flush(v),Array.from(T).length===0&&(T.add(l(w,v)),m.setValueAtTime(w,v)),T.add(a(x,b)),m.linearRampToValueAtTime(x,b),y},setTargetAtTime(x,b,v){return A===null&&T.flush(f.context.currentTime),T.add(c(x,b,v)),m.setTargetAtTime(x,b,v),y},setValueAtTime(x,b){return A===null&&T.flush(f.context.currentTime),T.add(l(x,b)),m.setValueAtTime(x,b),y},setValueCurveAtTime(x,b,v){const C=x instanceof Float32Array?x:new Float32Array(x);if(u!==null&&u.name==="webkitAudioContext"){const k=b+v,S=f.context.sampleRate,N=Math.ceil(b*S),E=Math.floor(k*S),O=E-N,V=new Float32Array(O);for(let $=0;$<O;$+=1){const W=(C.length-1)/v*((N+$)/S-b),F=Math.floor(W),q=Math.ceil(W);V[$]=F===q?C[F]:(1-(W-F))*C[F]+(1-(q-W))*C[q]}A===null&&T.flush(f.context.currentTime),T.add(h(V,b,v)),m.setValueCurveAtTime(V,b,v);const M=E/S;M<k&&p(y,V[V.length-1],M),p(y,C[C.length-1],k)}else A===null&&T.flush(f.context.currentTime),T.add(h(C,b,v)),m.setValueCurveAtTime(C,b,v);return y}};return t.set(y,m),e.set(y,f),n(y,A),y},Kc=n=>({replay(e){for(const t of n)if(t.type==="exponentialRampToValue"){const{endTime:s,value:i}=t;e.exponentialRampToValueAtTime(i,s)}else if(t.type==="linearRampToValue"){const{endTime:s,value:i}=t;e.linearRampToValueAtTime(i,s)}else if(t.type==="setTarget"){const{startTime:s,target:i,timeConstant:r}=t;e.setTargetAtTime(i,s,r)}else if(t.type==="setValue"){const{startTime:s,value:i}=t;e.setValueAtTime(i,s)}else if(t.type==="setValueCurve"){const{duration:s,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,s)}else throw new Error("Can't apply an unknown automation.")}});class ko{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((s,i)=>e.call(t,s,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const el={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},tl=(n,e,t,s,i,r,o,a,c,l,h,u,p,f)=>class extends e{constructor(m,g,_){var w;const T=a(m),A=c(T),y=h({...el,..._});p(y);const x=ri.get(T),b=x?.get(g),v=A||T.state!=="closed"?T:(w=o(T))!==null&&w!==void 0?w:T,C=i(v,A?null:m.baseLatency,l,g,b,y),k=A?s(g,y,b):null;super(m,!0,C,k);const S=[];C.parameters.forEach((E,O)=>{const V=t(this,A,E);S.push([O,V])}),this._nativeAudioWorkletNode=C,this._onprocessorerror=null,this._parameters=new ko(S),A&&n(T,this);const{activeInputs:N}=r(this);u(C,N)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(m){const g=typeof m=="function"?f(this,m):null;this._nativeAudioWorkletNode.onprocessorerror=g;const _=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=_!==null&&_===g?m:_}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function ln(n,e,t,s,i){if(typeof n.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),n.copyFromChannel(e[t],s,i);else{const r=n.getChannelData(s);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const Co=(n,e,t,s,i)=>{typeof n.copyToChannel=="function"?e[t].byteLength!==0&&n.copyToChannel(e[t],s,i):e[t].byteLength!==0&&n.getChannelData(s).set(e[t],i)},hn=(n,e)=>{const t=[];for(let s=0;s<n;s+=1){const i=[],r=typeof e=="number"?e:e[s];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},sl=(n,e)=>{const t=Ye(oi,n),s=ie(e);return Ye(t,s)},nl=async(n,e,t,s,i,r,o)=>{const a=e===null?Math.ceil(n.context.length/128)*128:e.length,c=s.channelCount*s.numberOfInputs,l=i.reduce((g,_)=>g+_,0),h=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const u=Ce(n),p=await sl(t,n),f=hn(s.numberOfInputs,s.channelCount),d=hn(s.numberOfOutputs,i),m=Array.from(n.parameters.keys()).reduce((g,_)=>({...g,[_]:new Float32Array(128)}),{});for(let g=0;g<a;g+=128){if(s.numberOfInputs>0&&e!==null)for(let _=0;_<s.numberOfInputs;_+=1)for(let w=0;w<s.channelCount;w+=1)ln(e,f[_],w,w,g);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:_},w)=>{ln(e,m,_,c+w,g)});for(let _=0;_<s.numberOfInputs;_+=1)for(let w=0;w<i[_];w+=1)d[_][w].byteLength===0&&(d[_][w]=new Float32Array(128));try{const _=f.map((T,A)=>u.activeInputs[A].size===0?[]:T),w=o(g/t.sampleRate,t.sampleRate,()=>p.process(_,d,m));if(h!==null)for(let T=0,A=0;T<s.numberOfOutputs;T+=1){for(let y=0;y<i[T];y+=1)Co(h,d[T],y,A+y,g);A+=i[T]}if(!w)break}catch(_){n.dispatchEvent(new ErrorEvent("processorerror",{colno:_.colno,filename:_.filename,lineno:_.lineno,message:_.message}));break}}return h},il=(n,e,t,s,i,r,o,a,c,l,h,u,p,f,d,m)=>(g,_,w)=>{const T=new WeakMap;let A=null;const y=async(x,b)=>{let v=h(x),C=null;const k=Ne(v,b),S=Array.isArray(_.outputChannelCount)?_.outputChannelCount:Array.from(_.outputChannelCount);if(u===null){const N=S.reduce((M,$)=>M+$,0),E=i(b,{channelCount:Math.max(1,N),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,N)}),O=[];for(let M=0;M<x.numberOfOutputs;M+=1)O.push(s(b,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:S[M]}));const V=o(b,{channelCount:_.channelCount,channelCountMode:_.channelCountMode,channelInterpretation:_.channelInterpretation,gain:1});V.connect=e.bind(null,O),V.disconnect=c.bind(null,O),C=[E,O,V]}else k||(v=new u(b,g));if(T.set(b,C===null?v:C[2]),C!==null){if(A===null){if(w===void 0)throw new Error("Missing the processor constructor.");if(p===null)throw new Error("Missing the native OfflineAudioContext constructor.");const $=x.channelCount*x.numberOfInputs,W=w.parameterDescriptors===void 0?0:w.parameterDescriptors.length,F=$+W;A=nl(x,F===0?null:await(async()=>{const j=new p(F,Math.ceil(x.context.length/128)*128,b.sampleRate),K=[],$e=[];for(let re=0;re<_.numberOfInputs;re+=1)K.push(o(j,{channelCount:_.channelCount,channelCountMode:_.channelCountMode,channelInterpretation:_.channelInterpretation,gain:1})),$e.push(i(j,{channelCount:_.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:_.channelCount}));const Pe=await Promise.all(Array.from(x.parameters.values()).map(async re=>{const Se=r(j,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:re.value});return await f(j,re,Se.offset),Se})),G=s(j,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,$+W)});for(let re=0;re<_.numberOfInputs;re+=1){K[re].connect($e[re]);for(let Se=0;Se<_.channelCount;Se+=1)$e[re].connect(G,Se,re*_.channelCount+Se)}for(const[re,Se]of Pe.entries())Se.connect(G,0,$+re),Se.start(0);return G.connect(j.destination),await Promise.all(K.map(re=>d(x,j,re))),m(j)})(),b,_,S,w,l)}const N=await A,E=t(b,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[O,V,M]=C;N!==null&&(E.buffer=N,E.start(0)),E.connect(O);for(let $=0,W=0;$<x.numberOfOutputs;$+=1){const F=V[$];for(let q=0;q<S[$];q+=1)O.connect(F,W+q,q);W+=S[$]}return M}if(k)for(const[N,E]of x.parameters.entries())await n(b,E,v.parameters.get(N));else for(const[N,E]of x.parameters.entries())await f(b,E,v.parameters.get(N));return await d(x,b,v),v};return{render(x,b){a(b,x);const v=T.get(b);return v!==void 0?Promise.resolve(v):y(x,b)}}},rl=(n,e,t,s,i,r,o,a,c,l,h,u,p,f,d,m,g,_,w,T)=>class extends d{constructor(y,x){super(y,x),this._nativeContext=y,this._audioWorklet=n===void 0?void 0:{addModule:(b,v)=>n(this,b,v)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(y,x,b){return new t({length:x,numberOfChannels:y,sampleRate:b})}createBufferSource(){return new s(this)}createChannelMerger(y=6){return new r(this,{numberOfInputs:y})}createChannelSplitter(y=6){return new o(this,{numberOfOutputs:y})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(y=1){return new h(this,{maxDelayTime:y})}createDynamicsCompressor(){return new u(this)}createGain(){return new p(this)}createIIRFilter(y,x){return new f(this,{feedback:x,feedforward:y})}createOscillator(){return new m(this)}createPanner(){return new g(this)}createPeriodicWave(y,x,b={disableNormalization:!1}){return new _(this,{...b,imag:x,real:y})}createStereoPanner(){return new w(this)}createWaveShaper(){return new T(this)}decodeAudioData(y,x,b){return l(this._nativeContext,y).then(v=>(typeof x=="function"&&x(v),v),v=>{throw typeof b=="function"&&b(v),v})}},ol={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},al=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),p={...ol,...h},f=i(u,p),d=o(u),m=d?t():null;super(l,!1,f,m),this._Q=e(this,d,f.Q,ke,Ee),this._detune=e(this,d,f.detune,1200*Math.log2(ke),-1200*Math.log2(ke)),this._frequency=e(this,d,f.frequency,l.sampleRate/2,0),this._gain=e(this,d,f.gain,40*Math.log10(ke),Ee),this._nativeBiquadFilterNode=f,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,h,u){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,h,u)}catch(p){throw p.code===11?s():p}if(l.length!==h.length||h.length!==u.length)throw s()}},cl=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ne(l,c);if(!h){const u={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,u)}return r.set(c,l),h?(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)):(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},ll=(n,e)=>(t,s)=>{const i=e.get(t);if(i!==void 0)return i;const r=n.get(t);if(r!==void 0)return r;try{const o=s();return o instanceof Promise?(n.set(t,o),o.catch(()=>!1).then(a=>(n.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},hl={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},ul=(n,e,t,s,i)=>class extends n{constructor(o,a){const c=s(o),l={...hl,...a},h=t(c,l),u=i(c)?e():null;super(o,!1,h,u)}},dl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ne(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},pl={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},fl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=r({...pl,...c}),u=t(l,h),p=i(l)?e():null;super(a,!1,u,p)}},ml=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ne(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},gl=n=>(e,t,s)=>n(t,e,s),_l=n=>(e,t,s=0,i=0)=>{const r=e[s];if(r===void 0)throw n();return cn(t)?r.connect(t,0,i):r.connect(t,0)},yl=n=>(e,t)=>{const s=n(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return s.buffer=i,s.loop=!0,s.connect(t),s.start(),()=>{s.stop(),s.disconnect(t)}},vl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},xl=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...vl,...l},p=s(h,u),f=r(h),d=f?t():null;super(c,!1,p,d),this._constantSourceNodeRenderer=d,this._nativeConstantSourceNode=p,this._offset=e(this,f,p.offset,ke,Ee),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const h=this._nativeConstantSourceNode.onended;this._onended=h!==null&&h===l?c:h}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){es(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),at(this)&&Is(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},wl=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const p=Ne(u,h);if(!p){const f={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,offset:u.offset.value};u=e(h,f),o!==null&&u.start(o),a!==null&&u.stop(a)}return r.set(h,u),p?await n(h,l.offset,u.offset):await s(h,l.offset,u.offset),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},bl=n=>e=>(n[0]=e,n[0]),Tl={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},Al=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h={...Tl,...c},u=t(l,h),f=i(l)?e():null;super(a,!1,u,f),this._isBufferNullified=!1,this._nativeConvolverNode=u,h.buffer!==null&&r(this,h.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},Nl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ne(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=n(o,l)}return s.set(o,a),is(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Sl=(n,e)=>(t,s,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,s,i)}catch(r){throw r.name==="SyntaxError"?n():r}},kl=()=>new DOMException("","DataCloneError"),Er=n=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(s=>{const i=()=>{t.onmessage=null,e.close(),t.close(),s()};t.onmessage=()=>i();try{e.postMessage(n,[n])}catch{}finally{i()}})},Cl=(n,e,t,s,i,r,o,a,c,l,h)=>(u,p)=>{const f=o(u)?u:r(u);if(i.has(p)){const d=t();return Promise.reject(d)}try{i.add(p)}catch{}return e(c,()=>c(f))?f.decodeAudioData(p).then(d=>(Er(p).catch(()=>{}),e(a,()=>a(d))||h(d),n.add(d),d)):new Promise((d,m)=>{const g=async()=>{try{await Er(p)}catch{}},_=w=>{m(w),g()};try{f.decodeAudioData(p,w=>{typeof w.copyFromChannel!="function"&&(l(w),Ti(w)),n.add(w),g().then(()=>d(w))},w=>{_(w===null?s():w)})}catch(w){_(w)}})},Il=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=e.get(c);if(h===void 0)throw new Error("Missing the expected cycle count.");const u=r(c.context),p=a(u);if(h===l){if(e.delete(c),!p&&o(c)){const f=s(c),{outputs:d}=t(c);for(const m of d)if(Es(m)){const g=s(m[0]);n(f,g,m[1],m[2])}else{const g=i(m[0]);f.connect(g,m[1])}}}else e.set(c,h-l)},Ol={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},El=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...Ol,...l},p=s(h,u),f=r(h),d=f?t(u.maxDelayTime):null;super(c,!1,p,d),this._delayTime=e(this,f,p.delayTime),o(this,u.maxDelayTime)}get delayTime(){return this._delayTime}},Ml=(n,e,t,s,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let h=t(c);const u=Ne(h,l);if(!u){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,delayTime:h.delayTime.value,maxDelayTime:r};h=e(l,p)}return o.set(l,h),u?await n(l,c.delayTime,h.delayTime):await s(l,c.delayTime,h.delayTime),await i(c,l,h),h};return{render(c,l){const h=o.get(l);return h!==void 0?Promise.resolve(h):a(c,l)}}},Dl=n=>(e,t,s,i)=>n(e[i],r=>r[0]===t&&r[1]===s),Rl=n=>(e,t)=>{n(e).delete(t)},$l=n=>"delayTime"in n,Pl=(n,e,t)=>function s(i,r){const o=rn(r)?r:t(n,r);if($l(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>s([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},Ws=(n,e,t)=>{const s=e[t];if(s===void 0)throw n();return s},Vl=n=>(e,t=void 0,s=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Ws(n,e,t).disconnect():cn(t)?s===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?Ws(n,e,s).disconnect(t,0):Ws(n,e,s).disconnect(t,0,i):s===void 0?e.forEach(r=>r.disconnect(t)):Ws(n,e,s).disconnect(t,0),Fl={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Ul=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),p={...Fl,...h},f=s(u,p),d=o(u),m=d?t():null;super(l,!1,f,m),this._attack=e(this,d,f.attack),this._knee=e(this,d,f.knee),this._nativeDynamicsCompressorNode=f,this._ratio=e(this,d,f.ratio),this._release=e(this,d,f.release),this._threshold=e(this,d,f.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const h=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=h,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const h=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=h,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Ll=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ne(l,c);if(!h){const u={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,u)}return r.set(c,l),h?(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)):(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Bl=()=>new DOMException("","EncodingError"),jl=n=>e=>new Promise((t,s)=>{if(n===null){s(new SyntaxError);return}const i=n.document.head;if(i===null)s(new SyntaxError);else{const r=n.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=n.onerror,l=()=>{n.onerror=c,URL.revokeObjectURL(a)};n.onerror=(h,u,p,f,d)=>{if(u===a||u===n.location.href&&p===1&&f===1)return l(),s(d),!1;if(c!==null)return c(h,u,p,f,d)},r.onerror=()=>{l(),s(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),ql=n=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,s,i){if(s!==null){let r=this._listeners.get(s);r===void 0&&(r=n(this,s),typeof s=="function"&&this._listeners.set(s,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,s,i){const r=s===null?void 0:this._listeners.get(s);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},Wl=n=>(e,t,s)=>{Object.defineProperties(n,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return s()}finally{n!==null&&(delete n.currentFrame,delete n.currentTime)}},zl=n=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw n()},Gl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Yl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...Gl,...c},u=s(l,h),p=r(l),f=p?t():null;super(a,!1,u,f),this._gain=e(this,p,u.gain,ke,Ee)}get gain(){return this._gain}},Hl=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ne(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.gain,l.gain):await s(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Xl=(n,e)=>t=>e(n,t),Zl=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Ql=n=>e=>{var t;return(t=n.get(e))!==null&&t!==void 0?t:0},Jl=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},Kl=n=>e=>n.get(e),xe=()=>new DOMException("","InvalidStateError"),eh=n=>e=>{const t=n.get(e);if(t===void 0)throw xe();return t},th=(n,e)=>t=>{let s=n.get(t);if(s!==void 0)return s;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return s=new e(1,1,44100),n.set(t,s),s},sh=n=>e=>{const t=n.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},kn=()=>new DOMException("","InvalidAccessError"),nh=n=>{n.getFrequencyResponse=(e=>(t,s,i)=>{if(t.length!==s.length||s.length!==i.length)throw kn();return e.call(n,t,s,i)})(n.getFrequencyResponse)},ih={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},rh=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=i(l),u={...ih,...c},p=e(l,h?null:a.baseLatency,u),f=h?t(u.feedback,u.feedforward):null;super(a,!1,p,f),nh(p),this._nativeIIRFilterNode=p,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},Io=(n,e,t,s,i,r,o,a,c,l,h)=>{const u=l.length;let p=a;for(let f=0;f<u;f+=1){let d=t[0]*l[f];for(let m=1;m<i;m+=1){const g=p-m&c-1;d+=t[m]*r[g],d-=n[m]*o[g]}for(let m=i;m<s;m+=1)d+=t[m]*r[p-m&c-1];for(let m=i;m<e;m+=1)d-=n[m]*o[p-m&c-1];r[p]=l[f],o[p]=d,p=p+1&c-1,h[f]=d}return p},oh=(n,e,t,s)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=s instanceof Float64Array?s:new Float64Array(s),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let d=0;d<o;d+=1)r[d]/=i[0];for(let d=1;d<a;d+=1)i[d]/=i[0]}const l=32,h=new Float32Array(l),u=new Float32Array(l),p=e.createBuffer(n.numberOfChannels,n.length,n.sampleRate),f=n.numberOfChannels;for(let d=0;d<f;d+=1){const m=n.getChannelData(d),g=p.getChannelData(d);h.fill(0),u.fill(0),Io(i,o,r,a,c,h,u,0,l,m,g)}return p},ah=(n,e,t,s,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(h,u)=>{let p=null,f=e(h);const d=Ne(f,u);if(u.createIIRFilter===void 0?p=n(u,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):d||(f=u.createIIRFilter(o,r)),a.set(u,p===null?f:p),p!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const g=new t(h.context.destination.channelCount,h.context.length,u.sampleRate);c=(async()=>{await s(h,g,g.destination);const _=await i(g);return oh(_,u,r,o)})()}const m=await c;return p.buffer=m,p.start(0),p}return await s(h,u,f),f};return{render(h,u){const p=a.get(u);return p!==void 0?Promise.resolve(p):l(h,u)}}},ch=(n,e,t,s,i,r)=>o=>(a,c)=>{const l=n.get(a);if(l===void 0){if(!o&&r(a)){const h=s(a),{outputs:u}=t(a);for(const p of u)if(Es(p)){const f=s(p[0]);e(h,f,p[1],p[2])}else{const f=i(p[0]);h.disconnect(f,p[1])}}n.set(a,c)}else n.set(a,l+c)},lh=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},hh=(n,e)=>t=>n.has(t)||e(t),uh=(n,e)=>t=>n.has(t)||e(t),dh=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},ph=n=>e=>n!==null&&e instanceof n,fh=n=>e=>n!==null&&typeof n.AudioNode=="function"&&e instanceof n.AudioNode,mh=n=>e=>n!==null&&typeof n.AudioParam=="function"&&e instanceof n.AudioParam,gh=(n,e)=>t=>n(t)||e(t),_h=n=>e=>n!==null&&e instanceof n,yh=n=>n!==null&&n.isSecureContext,vh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},xh={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},wh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r);if(s(a))throw new TypeError;const c={...xh,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},bh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},Th=(n,e,t)=>class extends n{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},Ah=(n,e,t,s,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,Nn.set(this,a),s(a)&&i.set(a,new Set),this._destination=new n(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},bs=n=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=n.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},Nh=(n,e)=>(t,s,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const h=r.size===0;if(e(a))return o.call(t,a,c,l),n(r,[a,c,l],u=>u[0]===a&&u[1]===c&&u[2]===l,!0),h&&s(),a;o.call(t,a,c),n(r,[a,c],u=>u[0]===a&&u[1]===c,!0),h&&s()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const h=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const p of r)p[1]===a&&r.delete(p)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const p of r)p[0]===a&&(c===void 0||p[1]===c)&&(l===void 0||p[2]===l)&&r.delete(p)}const u=r.size===0;h&&u&&i()})(t.disconnect),t},oe=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t]&&(n[t]=s)},_e=(n,e)=>{oe(n,e,"channelCount"),oe(n,e,"channelCountMode"),oe(n,e,"channelInterpretation")},Mr=n=>typeof n.getFloatTimeDomainData=="function",Sh=n=>{n.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);n.getByteTimeDomainData(t);const s=Math.max(t.length,n.fftSize);for(let i=0;i<s;i+=1)e[i]=(t[i]-128)*.0078125;return e}},kh=(n,e)=>(t,s)=>{const i=t.createAnalyser();if(_e(i,s),!(s.maxDecibels>s.minDecibels))throw e();return oe(i,s,"fftSize"),oe(i,s,"maxDecibels"),oe(i,s,"minDecibels"),oe(i,s,"smoothingTimeConstant"),n(Mr,()=>Mr(i))||Sh(i),i},Ch=n=>n===null?null:n.hasOwnProperty("AudioBuffer")?n.AudioBuffer:null,he=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t].value&&(n[t].value=s)},Ih=n=>{n.start=(e=>{let t=!1;return(s=0,i=0,r)=>{if(t)throw xe();e.call(n,s,i,r),t=!0}})(n.start)},Si=n=>{n.start=(e=>(t=0,s=0,i)=>{if(typeof i=="number"&&i<0||s<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(n,t,s,i)})(n.start)},ki=n=>{n.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(n,t)})(n.stop)},Oh=(n,e,t,s,i,r,o,a,c,l,h)=>(u,p)=>{const f=u.createBufferSource();return _e(f,p),he(f,p,"playbackRate"),oe(f,p,"buffer"),oe(f,p,"loop"),oe(f,p,"loopEnd"),oe(f,p,"loopStart"),e(t,()=>t(u))||Ih(f),e(s,()=>s(u))||c(f),e(i,()=>i(u))||l(f,u),e(r,()=>r(u))||Si(f),e(o,()=>o(u))||h(f,u),e(a,()=>a(u))||ki(f),n(u,f),f},Eh=n=>n===null?null:n.hasOwnProperty("AudioContext")?n.AudioContext:n.hasOwnProperty("webkitAudioContext")?n.webkitAudioContext:null,Mh=(n,e)=>(t,s,i)=>{const r=t.destination;if(r.channelCount!==s)try{r.channelCount=s}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:s});const o=n(t,{channelCount:s,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Dh=n=>n===null?null:n.hasOwnProperty("AudioWorkletNode")?n.AudioWorkletNode:null,Rh=n=>{const{port1:e}=new MessageChannel;try{e.postMessage(n)}finally{e.close()}},$h=(n,e,t,s,i)=>(r,o,a,c,l,h)=>{if(a!==null)try{const u=new a(r,c,h),p=new Map;let f=null;if(Object.defineProperties(u,{channelCount:{get:()=>h.channelCount,set:()=>{throw n()}},channelCountMode:{get:()=>"explicit",set:()=>{throw n()}},onprocessorerror:{get:()=>f,set:d=>{typeof f=="function"&&u.removeEventListener("processorerror",f),f=typeof d=="function"?d:null,typeof f=="function"&&u.addEventListener("processorerror",f)}}}),u.addEventListener=(d=>(...m)=>{if(m[0]==="processorerror"){const g=typeof m[1]=="function"?m[1]:typeof m[1]=="object"&&m[1]!==null&&typeof m[1].handleEvent=="function"?m[1].handleEvent:null;if(g!==null){const _=p.get(m[1]);_!==void 0?m[1]=_:(m[1]=w=>{w.type==="error"?(Object.defineProperties(w,{type:{value:"processorerror"}}),g(w)):g(new ErrorEvent(m[0],{...w}))},p.set(g,m[1]))}}return d.call(u,"error",m[1],m[2]),d.call(u,...m)})(u.addEventListener),u.removeEventListener=(d=>(...m)=>{if(m[0]==="processorerror"){const g=p.get(m[1]);g!==void 0&&(p.delete(m[1]),m[1]=g)}return d.call(u,"error",m[1],m[2]),d.call(u,m[0],m[1],m[2])})(u.removeEventListener),h.numberOfOutputs!==0){const d=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return u.connect(d).connect(r.destination),i(u,()=>d.disconnect(),()=>d.connect(r.destination))}return u}catch(u){throw u.code===11?s():u}if(l===void 0)throw s();return Rh(h),e(r,o,l,h)},Oo=(n,e)=>n===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(n*e))))),Ph=n=>new Promise((e,t)=>{const{port1:s,port2:i}=new MessageChannel;s.onmessage=({data:r})=>{s.close(),i.close(),e(r)},s.onmessageerror=({data:r})=>{s.close(),i.close(),t(r)},i.postMessage(n)}),Vh=async(n,e)=>{const t=await Ph(e);return new n(t)},Fh=(n,e,t,s)=>{let i=oi.get(n);i===void 0&&(i=new WeakMap,oi.set(n,i));const r=Vh(t,s);return i.set(e,r),r},Uh=(n,e,t,s,i,r,o,a,c,l,h,u,p)=>(f,d,m,g)=>{if(g.numberOfInputs===0&&g.numberOfOutputs===0)throw c();const _=Array.isArray(g.outputChannelCount)?g.outputChannelCount:Array.from(g.outputChannelCount);if(_.some(I=>I<1))throw c();if(_.length!==g.numberOfOutputs)throw e();if(g.channelCountMode!=="explicit")throw c();const w=g.channelCount*g.numberOfInputs,T=_.reduce((I,L)=>I+L,0),A=m.parameterDescriptors===void 0?0:m.parameterDescriptors.length;if(w+A>6||T>6)throw c();const y=new MessageChannel,x=[],b=[];for(let I=0;I<g.numberOfInputs;I+=1)x.push(o(f,{channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation,gain:1})),b.push(i(f,{channelCount:g.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:g.channelCount}));const v=[];if(m.parameterDescriptors!==void 0)for(const{defaultValue:I,maxValue:L,minValue:ge,name:ae}of m.parameterDescriptors){const X=r(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:g.parameterData[ae]!==void 0?g.parameterData[ae]:I===void 0?0:I});Object.defineProperties(X.offset,{defaultValue:{get:()=>I===void 0?0:I},maxValue:{get:()=>L===void 0?ke:L},minValue:{get:()=>ge===void 0?Ee:ge}}),v.push(X)}const C=s(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,w+A)}),k=Oo(d,f.sampleRate),S=a(f,k,w+A,Math.max(1,T)),N=i(f,{channelCount:Math.max(1,T),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,T)}),E=[];for(let I=0;I<g.numberOfOutputs;I+=1)E.push(s(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:_[I]}));for(let I=0;I<g.numberOfInputs;I+=1){x[I].connect(b[I]);for(let L=0;L<g.channelCount;L+=1)b[I].connect(C,L,I*g.channelCount+L)}const O=new ko(m.parameterDescriptors===void 0?[]:m.parameterDescriptors.map(({name:I},L)=>{const ge=v[L];return ge.connect(C,0,w+L),ge.start(0),[I,ge.offset]}));C.connect(S);let V=g.channelInterpretation,M=null;const $=g.numberOfOutputs===0?[S]:E,W={get bufferSize(){return k},get channelCount(){return g.channelCount},set channelCount(I){throw t()},get channelCountMode(){return g.channelCountMode},set channelCountMode(I){throw t()},get channelInterpretation(){return V},set channelInterpretation(I){for(const L of x)L.channelInterpretation=I;V=I},get context(){return S.context},get inputs(){return x},get numberOfInputs(){return g.numberOfInputs},get numberOfOutputs(){return g.numberOfOutputs},get onprocessorerror(){return M},set onprocessorerror(I){typeof M=="function"&&W.removeEventListener("processorerror",M),M=typeof I=="function"?I:null,typeof M=="function"&&W.addEventListener("processorerror",M)},get parameters(){return O},get port(){return y.port2},addEventListener(...I){return S.addEventListener(I[0],I[1],I[2])},connect:n.bind(null,$),disconnect:l.bind(null,$),dispatchEvent(...I){return S.dispatchEvent(I[0])},removeEventListener(...I){return S.removeEventListener(I[0],I[1],I[2])}},F=new Map;y.port1.addEventListener=(I=>(...L)=>{if(L[0]==="message"){const ge=typeof L[1]=="function"?L[1]:typeof L[1]=="object"&&L[1]!==null&&typeof L[1].handleEvent=="function"?L[1].handleEvent:null;if(ge!==null){const ae=F.get(L[1]);ae!==void 0?L[1]=ae:(L[1]=X=>{h(f.currentTime,f.sampleRate,()=>ge(X))},F.set(ge,L[1]))}}return I.call(y.port1,L[0],L[1],L[2])})(y.port1.addEventListener),y.port1.removeEventListener=(I=>(...L)=>{if(L[0]==="message"){const ge=F.get(L[1]);ge!==void 0&&(F.delete(L[1]),L[1]=ge)}return I.call(y.port1,L[0],L[1],L[2])})(y.port1.removeEventListener);let q=null;Object.defineProperty(y.port1,"onmessage",{get:()=>q,set:I=>{typeof q=="function"&&y.port1.removeEventListener("message",q),q=typeof I=="function"?I:null,typeof q=="function"&&(y.port1.addEventListener("message",q),y.port1.start())}}),m.prototype.port=y.port1;let j=null;Fh(f,W,m,g).then(I=>j=I);const $e=hn(g.numberOfInputs,g.channelCount),Pe=hn(g.numberOfOutputs,_),G=m.parameterDescriptors===void 0?[]:m.parameterDescriptors.reduce((I,{name:L})=>({...I,[L]:new Float32Array(128)}),{});let re=!0;const Se=()=>{g.numberOfOutputs>0&&S.disconnect(N);for(let I=0,L=0;I<g.numberOfOutputs;I+=1){const ge=E[I];for(let ae=0;ae<_[I];ae+=1)N.disconnect(ge,L+ae,ae);L+=_[I]}},P=new Map;S.onaudioprocess=({inputBuffer:I,outputBuffer:L})=>{if(j!==null){const ge=u(W);for(let ae=0;ae<k;ae+=128){for(let X=0;X<g.numberOfInputs;X+=1)for(let le=0;le<g.channelCount;le+=1)ln(I,$e[X],le,le,ae);m.parameterDescriptors!==void 0&&m.parameterDescriptors.forEach(({name:X},le)=>{ln(I,G,X,w+le,ae)});for(let X=0;X<g.numberOfInputs;X+=1)for(let le=0;le<_[X];le+=1)Pe[X][le].byteLength===0&&(Pe[X][le]=new Float32Array(128));try{const X=$e.map((Be,ft)=>{if(ge[ft].size>0)return P.set(ft,k/128),Be;const Zn=P.get(ft);return Zn===void 0?[]:(Be.every(Ma=>Ma.every(Da=>Da===0))&&(Zn===1?P.delete(ft):P.set(ft,Zn-1)),Be)});re=h(f.currentTime+ae/f.sampleRate,f.sampleRate,()=>j.process(X,Pe,G));for(let Be=0,ft=0;Be<g.numberOfOutputs;Be+=1){for(let ds=0;ds<_[Be];ds+=1)Co(L,Pe[Be],ds,ft+ds,ae);ft+=_[Be]}}catch(X){re=!1,W.dispatchEvent(new ErrorEvent("processorerror",{colno:X.colno,filename:X.filename,lineno:X.lineno,message:X.message}))}if(!re){for(let X=0;X<g.numberOfInputs;X+=1){x[X].disconnect(b[X]);for(let le=0;le<g.channelCount;le+=1)b[ae].disconnect(C,le,X*g.channelCount+le)}if(m.parameterDescriptors!==void 0){const X=m.parameterDescriptors.length;for(let le=0;le<X;le+=1){const Be=v[le];Be.disconnect(C,0,w+le),Be.stop()}}C.disconnect(S),S.onaudioprocess=null,At?Se():jt();break}}}};let At=!1;const Nt=o(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),Bt=()=>S.connect(Nt).connect(f.destination),jt=()=>{S.disconnect(Nt),Nt.disconnect()},Oa=()=>{if(re){jt(),g.numberOfOutputs>0&&S.connect(N);for(let I=0,L=0;I<g.numberOfOutputs;I+=1){const ge=E[I];for(let ae=0;ae<_[I];ae+=1)N.connect(ge,L+ae,ae);L+=_[I]}}At=!0},Ea=()=>{re&&(Bt(),Se()),At=!1};return Bt(),p(W,Oa,Ea)},Eo=(n,e)=>{const t=n.createBiquadFilter();return _e(t,e),he(t,e,"Q"),he(t,e,"detune"),he(t,e,"frequency"),he(t,e,"gain"),oe(t,e,"type"),t},Lh=(n,e)=>(t,s)=>{const i=t.createChannelMerger(s.numberOfInputs);return n!==null&&n.name==="webkitAudioContext"&&e(t,i),_e(i,s),i},Bh=n=>{const e=n.numberOfOutputs;Object.defineProperty(n,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw xe()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw xe()}}),Object.defineProperty(n,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw xe()}})},Ms=(n,e)=>{const t=n.createChannelSplitter(e.numberOfOutputs);return _e(t,e),Bh(t),t},jh=(n,e,t,s,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return _e(a,o),he(a,o,"offset"),e(s,()=>s(r))||Si(a),e(i,()=>i(r))||ki(a),n(r,a),a},rs=(n,e)=>(n.connect=e.connect.bind(e),n.disconnect=e.disconnect.bind(e),n),qh=(n,e,t,s)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),h=a.getChannelData(0);h[0]=1,h[1]=1,c.buffer=a,c.loop=!0;const u={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(d){l.channelCount=d},get channelCountMode(){return l.channelCountMode},set channelCountMode(d){l.channelCountMode=d},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(d){l.channelInterpretation=d},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(d){c.onended=d},addEventListener(...d){return c.addEventListener(d[0],d[1],d[2])},dispatchEvent(...d){return c.dispatchEvent(d[0])},removeEventListener(...d){return c.removeEventListener(d[0],d[1],d[2])},start(d=0){c.start.call(c,d)},stop(d=0){c.stop.call(c,d)}},p=()=>c.connect(l),f=()=>c.disconnect(l);return n(i,c),s(rs(u,l),p,f)},Wh=(n,e)=>(t,s)=>{const i=t.createConvolver();if(_e(i,s),s.disableNormalization===i.normalize&&(i.normalize=!s.disableNormalization),oe(i,s,"buffer"),s.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw n();return r.call(i,o)}),s.channelCountMode==="max"))throw n();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw n();return r.call(i,o)}),i},Mo=(n,e)=>{const t=n.createDelay(e.maxDelayTime);return _e(t,e),he(t,e,"delayTime"),t},zh=n=>(e,t)=>{const s=e.createDynamicsCompressor();if(_e(s,t),t.channelCount>2||t.channelCountMode==="max")throw n();return he(s,t,"attack"),he(s,t,"knee"),he(s,t,"ratio"),he(s,t,"release"),he(s,t,"threshold"),s},De=(n,e)=>{const t=n.createGain();return _e(t,e),he(t,e,"gain"),t},Gh=n=>(e,t,s)=>{if(e.createIIRFilter===void 0)return n(e,t,s);const i=e.createIIRFilter(s.feedforward,s.feedback);return _e(i,s),i};function Yh(n,e){const t=e[0]*e[0]+e[1]*e[1];return[(n[0]*e[0]+n[1]*e[1])/t,(n[1]*e[0]-n[0]*e[1])/t]}function Hh(n,e){return[n[0]*e[0]-n[1]*e[1],n[0]*e[1]+n[1]*e[0]]}function Dr(n,e){let t=[0,0];for(let s=n.length-1;s>=0;s-=1)t=Hh(t,e),t[0]+=n[s];return t}const Xh=(n,e,t,s)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:h})=>{const u=Oo(r,i.sampleRate),p=l instanceof Float64Array?l:new Float64Array(l),f=h instanceof Float64Array?h:new Float64Array(h),d=p.length,m=f.length,g=Math.min(d,m);if(d===0||d>20)throw s();if(p[0]===0)throw e();if(m===0||m>20)throw s();if(f[0]===0)throw e();if(p[0]!==1){for(let v=0;v<m;v+=1)f[v]/=p[0];for(let v=1;v<d;v+=1)p[v]/=p[0]}const _=t(i,u,o,o);_.channelCount=o,_.channelCountMode=a,_.channelInterpretation=c;const w=32,T=[],A=[],y=[];for(let v=0;v<o;v+=1){T.push(0);const C=new Float32Array(w),k=new Float32Array(w);C.fill(0),k.fill(0),A.push(C),y.push(k)}_.onaudioprocess=v=>{const C=v.inputBuffer,k=v.outputBuffer,S=C.numberOfChannels;for(let N=0;N<S;N+=1){const E=C.getChannelData(N),O=k.getChannelData(N);T[N]=Io(p,d,f,m,g,A[N],y[N],T[N],w,E,O)}};const x=i.sampleRate/2;return rs({get bufferSize(){return u},get channelCount(){return _.channelCount},set channelCount(v){_.channelCount=v},get channelCountMode(){return _.channelCountMode},set channelCountMode(v){_.channelCountMode=v},get channelInterpretation(){return _.channelInterpretation},set channelInterpretation(v){_.channelInterpretation=v},get context(){return _.context},get inputs(){return[_]},get numberOfInputs(){return _.numberOfInputs},get numberOfOutputs(){return _.numberOfOutputs},addEventListener(...v){return _.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return _.dispatchEvent(v[0])},getFrequencyResponse(v,C,k){if(v.length!==C.length||C.length!==k.length)throw n();const S=v.length;for(let N=0;N<S;N+=1){const E=-Math.PI*(v[N]/x),O=[Math.cos(E),Math.sin(E)],V=Dr(f,O),M=Dr(p,O),$=Yh(V,M);C[N]=Math.sqrt($[0]*$[0]+$[1]*$[1]),k[N]=Math.atan2($[1],$[0])}},removeEventListener(...v){return _.removeEventListener(v[0],v[1],v[2])}},_)},Zh=(n,e)=>n.createMediaElementSource(e.mediaElement),Qh=(n,e)=>{const t=n.createMediaStreamDestination();return _e(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},Jh=(n,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const s=t.slice(0,1),i=n.createMediaStreamSource(new MediaStream(s));return Object.defineProperty(i,"mediaStream",{value:e}),i},Kh=(n,e)=>(t,{mediaStreamTrack:s})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(s);const i=new MediaStream([s]),r=t.createMediaStreamSource(i);if(s.kind!=="audio")throw n();if(e(t))throw new TypeError;return r},eu=n=>n===null?null:n.hasOwnProperty("OfflineAudioContext")?n.OfflineAudioContext:n.hasOwnProperty("webkitOfflineAudioContext")?n.webkitOfflineAudioContext:null,tu=(n,e,t,s,i,r)=>(o,a)=>{const c=o.createOscillator();return _e(c,a),he(c,a,"detune"),he(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):oe(c,a,"type"),e(t,()=>t(o))||Si(c),e(s,()=>s(o))||r(c,o),e(i,()=>i(o))||ki(c),n(o,c),c},su=n=>(e,t)=>{const s=e.createPanner();return s.orientationX===void 0?n(e,t):(_e(s,t),he(s,t,"orientationX"),he(s,t,"orientationY"),he(s,t,"orientationZ"),he(s,t,"positionX"),he(s,t,"positionY"),he(s,t,"positionZ"),oe(s,t,"coneInnerAngle"),oe(s,t,"coneOuterAngle"),oe(s,t,"coneOuterGain"),oe(s,t,"distanceModel"),oe(s,t,"maxDistance"),oe(s,t,"panningModel"),oe(s,t,"refDistance"),oe(s,t,"rolloffFactor"),s)},nu=(n,e,t,s,i,r,o,a,c,l)=>(h,{coneInnerAngle:u,coneOuterAngle:p,coneOuterGain:f,distanceModel:d,maxDistance:m,orientationX:g,orientationY:_,orientationZ:w,panningModel:T,positionX:A,positionY:y,positionZ:x,refDistance:b,rolloffFactor:v,...C})=>{const k=h.createPanner();if(C.channelCount>2||C.channelCountMode==="max")throw o();_e(k,C);const S={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},N=t(h,{...S,channelInterpretation:"speakers",numberOfInputs:6}),E=s(h,{...C,gain:1}),O=s(h,{...S,gain:1}),V=s(h,{...S,gain:0}),M=s(h,{...S,gain:0}),$=s(h,{...S,gain:0}),W=s(h,{...S,gain:0}),F=s(h,{...S,gain:0}),q=i(h,256,6,1),j=r(h,{...S,curve:new Float32Array([1,1]),oversample:"none"});let K=[g,_,w],$e=[A,y,x];const Pe=new Float32Array(1);q.onaudioprocess=({inputBuffer:P})=>{const At=[c(P,Pe,0),c(P,Pe,1),c(P,Pe,2)];At.some((Bt,jt)=>Bt!==K[jt])&&(k.setOrientation(...At),K=At);const Nt=[c(P,Pe,3),c(P,Pe,4),c(P,Pe,5)];Nt.some((Bt,jt)=>Bt!==$e[jt])&&(k.setPosition(...Nt),$e=Nt)},Object.defineProperty(V.gain,"defaultValue",{get:()=>0}),Object.defineProperty(M.gain,"defaultValue",{get:()=>0}),Object.defineProperty($.gain,"defaultValue",{get:()=>0}),Object.defineProperty(W.gain,"defaultValue",{get:()=>0}),Object.defineProperty(F.gain,"defaultValue",{get:()=>0});const G={get bufferSize(){},get channelCount(){return k.channelCount},set channelCount(P){if(P>2)throw o();E.channelCount=P,k.channelCount=P},get channelCountMode(){return k.channelCountMode},set channelCountMode(P){if(P==="max")throw o();E.channelCountMode=P,k.channelCountMode=P},get channelInterpretation(){return k.channelInterpretation},set channelInterpretation(P){E.channelInterpretation=P,k.channelInterpretation=P},get coneInnerAngle(){return k.coneInnerAngle},set coneInnerAngle(P){k.coneInnerAngle=P},get coneOuterAngle(){return k.coneOuterAngle},set coneOuterAngle(P){k.coneOuterAngle=P},get coneOuterGain(){return k.coneOuterGain},set coneOuterGain(P){if(P<0||P>1)throw e();k.coneOuterGain=P},get context(){return k.context},get distanceModel(){return k.distanceModel},set distanceModel(P){k.distanceModel=P},get inputs(){return[E]},get maxDistance(){return k.maxDistance},set maxDistance(P){if(P<0)throw new RangeError;k.maxDistance=P},get numberOfInputs(){return k.numberOfInputs},get numberOfOutputs(){return k.numberOfOutputs},get orientationX(){return O.gain},get orientationY(){return V.gain},get orientationZ(){return M.gain},get panningModel(){return k.panningModel},set panningModel(P){k.panningModel=P},get positionX(){return $.gain},get positionY(){return W.gain},get positionZ(){return F.gain},get refDistance(){return k.refDistance},set refDistance(P){if(P<0)throw new RangeError;k.refDistance=P},get rolloffFactor(){return k.rolloffFactor},set rolloffFactor(P){if(P<0)throw new RangeError;k.rolloffFactor=P},addEventListener(...P){return E.addEventListener(P[0],P[1],P[2])},dispatchEvent(...P){return E.dispatchEvent(P[0])},removeEventListener(...P){return E.removeEventListener(P[0],P[1],P[2])}};u!==G.coneInnerAngle&&(G.coneInnerAngle=u),p!==G.coneOuterAngle&&(G.coneOuterAngle=p),f!==G.coneOuterGain&&(G.coneOuterGain=f),d!==G.distanceModel&&(G.distanceModel=d),m!==G.maxDistance&&(G.maxDistance=m),g!==G.orientationX.value&&(G.orientationX.value=g),_!==G.orientationY.value&&(G.orientationY.value=_),w!==G.orientationZ.value&&(G.orientationZ.value=w),T!==G.panningModel&&(G.panningModel=T),A!==G.positionX.value&&(G.positionX.value=A),y!==G.positionY.value&&(G.positionY.value=y),x!==G.positionZ.value&&(G.positionZ.value=x),b!==G.refDistance&&(G.refDistance=b),v!==G.rolloffFactor&&(G.rolloffFactor=v),(K[0]!==1||K[1]!==0||K[2]!==0)&&k.setOrientation(...K),($e[0]!==0||$e[1]!==0||$e[2]!==0)&&k.setPosition(...$e);const re=()=>{E.connect(k),n(E,j,0,0),j.connect(O).connect(N,0,0),j.connect(V).connect(N,0,1),j.connect(M).connect(N,0,2),j.connect($).connect(N,0,3),j.connect(W).connect(N,0,4),j.connect(F).connect(N,0,5),N.connect(q).connect(h.destination)},Se=()=>{E.disconnect(k),a(E,j,0,0),j.disconnect(O),O.disconnect(N),j.disconnect(V),V.disconnect(N),j.disconnect(M),M.disconnect(N),j.disconnect($),$.disconnect(N),j.disconnect(W),W.disconnect(N),j.disconnect(F),F.disconnect(N),N.disconnect(q),q.disconnect(h.destination)};return l(rs(G,k),re,Se)},iu=n=>(e,{disableNormalization:t,imag:s,real:i})=>{const r=s instanceof Float32Array?s:new Float32Array(s),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(s).length<2)throw n();return a},Ds=(n,e,t,s)=>n.createScriptProcessor(e,t,s),ru=(n,e)=>(t,s)=>{const i=s.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return n(t,s);const r=t.createStereoPanner();return _e(r,s),he(r,s,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},ou=(n,e,t,s,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},h={...l,oversample:"none"},u=(d,m,g,_)=>{const w=new Float32Array(16385),T=new Float32Array(16385);for(let C=0;C<16385;C+=1){const k=C/16384*c;w[C]=Math.cos(k),T[C]=Math.sin(k)}const A=t(d,{...l,gain:0}),y=s(d,{...h,curve:w}),x=s(d,{...h,curve:a}),b=t(d,{...l,gain:0}),v=s(d,{...h,curve:T});return{connectGraph(){m.connect(A),m.connect(x.inputs===void 0?x:x.inputs[0]),m.connect(b),x.connect(g),g.connect(y.inputs===void 0?y:y.inputs[0]),g.connect(v.inputs===void 0?v:v.inputs[0]),y.connect(A.gain),v.connect(b.gain),A.connect(_,0,0),b.connect(_,0,1)},disconnectGraph(){m.disconnect(A),m.disconnect(x.inputs===void 0?x:x.inputs[0]),m.disconnect(b),x.disconnect(g),g.disconnect(y.inputs===void 0?y:y.inputs[0]),g.disconnect(v.inputs===void 0?v:v.inputs[0]),y.disconnect(A.gain),v.disconnect(b.gain),A.disconnect(_,0,0),b.disconnect(_,0,1)}}},p=(d,m,g,_)=>{const w=new Float32Array(16385),T=new Float32Array(16385),A=new Float32Array(16385),y=new Float32Array(16385),x=Math.floor(16385/2);for(let $=0;$<16385;$+=1)if($>x){const W=($-x)/(16384-x)*c;w[$]=Math.cos(W),T[$]=Math.sin(W),A[$]=0,y[$]=1}else{const W=$/(16384-x)*c;w[$]=1,T[$]=0,A[$]=Math.cos(W),y[$]=Math.sin(W)}const b=e(d,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),v=t(d,{...l,gain:0}),C=s(d,{...h,curve:w}),k=t(d,{...l,gain:0}),S=s(d,{...h,curve:T}),N=s(d,{...h,curve:a}),E=t(d,{...l,gain:0}),O=s(d,{...h,curve:A}),V=t(d,{...l,gain:0}),M=s(d,{...h,curve:y});return{connectGraph(){m.connect(b),m.connect(N.inputs===void 0?N:N.inputs[0]),b.connect(v,0),b.connect(k,0),b.connect(E,1),b.connect(V,1),N.connect(g),g.connect(C.inputs===void 0?C:C.inputs[0]),g.connect(S.inputs===void 0?S:S.inputs[0]),g.connect(O.inputs===void 0?O:O.inputs[0]),g.connect(M.inputs===void 0?M:M.inputs[0]),C.connect(v.gain),S.connect(k.gain),O.connect(E.gain),M.connect(V.gain),v.connect(_,0,0),E.connect(_,0,0),k.connect(_,0,1),V.connect(_,0,1)},disconnectGraph(){m.disconnect(b),m.disconnect(N.inputs===void 0?N:N.inputs[0]),b.disconnect(v,0),b.disconnect(k,0),b.disconnect(E,1),b.disconnect(V,1),N.disconnect(g),g.disconnect(C.inputs===void 0?C:C.inputs[0]),g.disconnect(S.inputs===void 0?S:S.inputs[0]),g.disconnect(O.inputs===void 0?O:O.inputs[0]),g.disconnect(M.inputs===void 0?M:M.inputs[0]),C.disconnect(v.gain),S.disconnect(k.gain),O.disconnect(E.gain),M.disconnect(V.gain),v.disconnect(_,0,0),E.disconnect(_,0,0),k.disconnect(_,0,1),V.disconnect(_,0,1)}}},f=(d,m,g,_,w)=>{if(m===1)return u(d,g,_,w);if(m===2)return p(d,g,_,w);throw i()};return(d,{channelCount:m,channelCountMode:g,pan:_,...w})=>{if(g==="max")throw i();const T=n(d,{...w,channelCount:1,channelCountMode:g,numberOfInputs:2}),A=t(d,{...w,channelCount:m,channelCountMode:g,gain:1}),y=t(d,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:_});let{connectGraph:x,disconnectGraph:b}=f(d,m,A,y,T);Object.defineProperty(y.gain,"defaultValue",{get:()=>0}),Object.defineProperty(y.gain,"maxValue",{get:()=>1}),Object.defineProperty(y.gain,"minValue",{get:()=>-1});const v={get bufferSize(){},get channelCount(){return A.channelCount},set channelCount(N){A.channelCount!==N&&(C&&b(),{connectGraph:x,disconnectGraph:b}=f(d,N,A,y,T),C&&x()),A.channelCount=N},get channelCountMode(){return A.channelCountMode},set channelCountMode(N){if(N==="clamped-max"||N==="max")throw i();A.channelCountMode=N},get channelInterpretation(){return A.channelInterpretation},set channelInterpretation(N){A.channelInterpretation=N},get context(){return A.context},get inputs(){return[A]},get numberOfInputs(){return A.numberOfInputs},get numberOfOutputs(){return A.numberOfOutputs},get pan(){return y.gain},addEventListener(...N){return A.addEventListener(N[0],N[1],N[2])},dispatchEvent(...N){return A.dispatchEvent(N[0])},removeEventListener(...N){return A.removeEventListener(N[0],N[1],N[2])}};let C=!1;const k=()=>{x(),C=!0},S=()=>{b(),C=!1};return r(rs(v,T),k,S)}},au=(n,e,t,s,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);_e(l,c);const h=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(h!==null&&h.length<2)throw e();oe(l,{curve:h},"curve"),oe(l,c,"oversample");let u=null,p=!1;return o(l,"curve",m=>()=>m.call(l),m=>g=>(m.call(l,g),p&&(s(g)&&u===null?u=n(a,l):!s(g)&&u!==null&&(u(),u=null)),g)),i(l,()=>{p=!0,s(l.curve)&&(u=n(a,l))},()=>{p=!1,u!==null&&(u(),u=null)})},cu=(n,e,t,s,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),h=r.createWaveShaper();_e(l,c),_e(h,c);const u=t(r,{...c,gain:1}),p=t(r,{...c,gain:-1}),f=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1});let m=null,g=!1,_=null;const w={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(y){u.channelCount=y,p.channelCount=y,l.channelCount=y,f.channelCount=y,h.channelCount=y,d.channelCount=y},get channelCountMode(){return l.channelCountMode},set channelCountMode(y){u.channelCountMode=y,p.channelCountMode=y,l.channelCountMode=y,f.channelCountMode=y,h.channelCountMode=y,d.channelCountMode=y},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(y){u.channelInterpretation=y,p.channelInterpretation=y,l.channelInterpretation=y,f.channelInterpretation=y,h.channelInterpretation=y,d.channelInterpretation=y},get context(){return l.context},get curve(){return _},set curve(y){if(y!==null&&y.length<2)throw e();if(y===null)l.curve=y,h.curve=y;else{const x=y.length,b=new Float32Array(x+2-x%2),v=new Float32Array(x+2-x%2);b[0]=y[0],v[0]=-y[x-1];const C=Math.ceil((x+1)/2),k=(x+1)/2-1;for(let S=1;S<C;S+=1){const N=S/C*k,E=Math.floor(N),O=Math.ceil(N);b[S]=E===O?y[E]:(1-(N-E))*y[E]+(1-(O-N))*y[O],v[S]=E===O?-y[x-1-E]:-((1-(N-E))*y[x-1-E])-(1-(O-N))*y[x-1-O]}b[C]=x%2===1?y[C-1]:(y[C-2]+y[C-1])/2,l.curve=b,h.curve=v}_=y,g&&(s(_)&&m===null?m=n(r,u):m!==null&&(m(),m=null))},get inputs(){return[u]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(y){l.oversample=y,h.oversample=y},addEventListener(...y){return u.addEventListener(y[0],y[1],y[2])},dispatchEvent(...y){return u.dispatchEvent(y[0])},removeEventListener(...y){return u.removeEventListener(y[0],y[1],y[2])}};o!==null&&(w.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==w.oversample&&(w.oversample=a);const T=()=>{u.connect(l).connect(f),u.connect(p).connect(h).connect(d).connect(f),g=!0,s(_)&&(m=n(r,u))},A=()=>{u.disconnect(l),l.disconnect(f),u.disconnect(p),p.disconnect(h),h.disconnect(d),d.disconnect(f),g=!1,m!==null&&(m(),m=null)};return i(rs(w,f),T,A)},Ie=()=>new DOMException("","NotSupportedError"),lu={numberOfChannels:1},hu=(n,e,t,s,i)=>class extends n{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:h,numberOfChannels:u,sampleRate:p}={...lu,...l},f=s(u,h,p);e(bs,()=>bs(f))||f.addEventListener("statechange",(()=>{let d=0;const m=g=>{this._state==="running"&&(d>0?(f.removeEventListener("statechange",m),g.stopImmediatePropagation(),this._waitForThePromiseToSettle(g)):d+=1)};return m})()),super(f,u),this._length=h,this._nativeOfflineAudioContext=f,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,To(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},uu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},du=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...uu,...l},p=t(h,u),f=r(h),d=f?s():null,m=c.sampleRate/2;super(c,!1,p,d),this._detune=e(this,f,p.detune,153600,-153600),this._frequency=e(this,f,p.frequency,m,-m),this._nativeOscillatorNode=p,this._onended=null,this._oscillatorNodeRenderer=d,this._oscillatorNodeRenderer!==null&&u.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=u.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const h=this._nativeOscillatorNode.onended;this._onended=h!==null&&h===l?c:h}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){es(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),at(this)&&Is(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},pu=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(h,u)=>{let p=t(h);const f=Ne(p,u);if(!f){const d={channelCount:p.channelCount,channelCountMode:p.channelCountMode,channelInterpretation:p.channelInterpretation,detune:p.detune.value,frequency:p.frequency.value,periodicWave:o===null?void 0:o,type:p.type};p=e(u,d),a!==null&&p.start(a),c!==null&&p.stop(c)}return r.set(u,p),f?(await n(u,h.detune,p.detune),await n(u,h.frequency,p.frequency)):(await s(u,h.detune,p.detune),await s(u,h.frequency,p.frequency)),await i(h,u,p),p};return{set periodicWave(h){o=h},set start(h){a=h},set stop(h){c=h},render(h,u){const p=r.get(u);return p!==void 0?Promise.resolve(p):l(h,u)}}},fu={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},mu=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...fu,...l},p=t(h,u),f=r(h),d=f?s():null;super(c,!1,p,d),this._nativePannerNode=p,this._orientationX=e(this,f,p.orientationX,ke,Ee),this._orientationY=e(this,f,p.orientationY,ke,Ee),this._orientationZ=e(this,f,p.orientationZ,ke,Ee),this._positionX=e(this,f,p.positionX,ke,Ee),this._positionY=e(this,f,p.positionY,ke,Ee),this._positionZ=e(this,f,p.positionZ,ke,Ee),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},gu=(n,e,t,s,i,r,o,a,c,l)=>()=>{const h=new WeakMap;let u=null;const p=async(f,d)=>{let m=null,g=r(f);const _={channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation},w={..._,coneInnerAngle:g.coneInnerAngle,coneOuterAngle:g.coneOuterAngle,coneOuterGain:g.coneOuterGain,distanceModel:g.distanceModel,maxDistance:g.maxDistance,panningModel:g.panningModel,refDistance:g.refDistance,rolloffFactor:g.rolloffFactor},T=Ne(g,d);if("bufferSize"in g)m=s(d,{..._,gain:1});else if(!T){const A={...w,orientationX:g.orientationX.value,orientationY:g.orientationY.value,orientationZ:g.orientationZ.value,positionX:g.positionX.value,positionY:g.positionY.value,positionZ:g.positionZ.value};g=i(d,A)}if(h.set(d,m===null?g:m),m!==null){if(u===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const S=new o(6,f.context.length,d.sampleRate),N=e(S,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});N.connect(S.destination),u=(async()=>{const E=await Promise.all([f.orientationX,f.orientationY,f.orientationZ,f.positionX,f.positionY,f.positionZ].map(async(O,V)=>{const M=t(S,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:V===0?1:0});return await a(S,O,M.offset),M}));for(let O=0;O<6;O+=1)E[O].connect(N,0,O),E[O].start(0);return l(S)})()}const A=await u,y=s(d,{..._,gain:1});await c(f,d,y);const x=[];for(let S=0;S<A.numberOfChannels;S+=1)x.push(A.getChannelData(S));let b=[x[0][0],x[1][0],x[2][0]],v=[x[3][0],x[4][0],x[5][0]],C=s(d,{..._,gain:1}),k=i(d,{...w,orientationX:b[0],orientationY:b[1],orientationZ:b[2],positionX:v[0],positionY:v[1],positionZ:v[2]});y.connect(C).connect(k.inputs[0]),k.connect(m);for(let S=128;S<A.length;S+=128){const N=[x[0][S],x[1][S],x[2][S]],E=[x[3][S],x[4][S],x[5][S]];if(N.some((O,V)=>O!==b[V])||E.some((O,V)=>O!==v[V])){b=N,v=E;const O=S/d.sampleRate;C.gain.setValueAtTime(0,O),C=s(d,{..._,gain:0}),k=i(d,{...w,orientationX:b[0],orientationY:b[1],orientationZ:b[2],positionX:v[0],positionY:v[1],positionZ:v[2]}),C.gain.setValueAtTime(1,O),y.connect(C).connect(k.inputs[0]),k.connect(m)}}return m}return T?(await n(d,f.orientationX,g.orientationX),await n(d,f.orientationY,g.orientationY),await n(d,f.orientationZ,g.orientationZ),await n(d,f.positionX,g.positionX),await n(d,f.positionY,g.positionY),await n(d,f.positionZ,g.positionZ)):(await a(d,f.orientationX,g.orientationX),await a(d,f.orientationY,g.orientationY),await a(d,f.orientationZ,g.orientationZ),await a(d,f.positionX,g.positionX),await a(d,f.positionY,g.positionY),await a(d,f.positionZ,g.positionZ)),is(g)?await c(f,d,g.inputs[0]):await c(f,d,g),g};return{render(f,d){const m=h.get(d);return m!==void 0?Promise.resolve(m):p(f,d)}}},_u={disableNormalization:!1},yu=(n,e,t,s)=>class Do{constructor(r,o){const a=e(r),c=s({..._u,...o}),l=n(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Do.prototype||t.has(r)}},vu=(n,e)=>(t,s,i)=>(n(s).replay(i),e(s,t,i)),xu=(n,e,t)=>async(s,i,r)=>{const o=n(s);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,h])=>{const p=await e(l).render(l,i),f=s.context.destination;!t(l)&&(s!==f||!t(s))&&p.connect(r,h,c)})).reduce((a,c)=>[...a,...c],[]))},wu=(n,e,t)=>async(s,i,r)=>{const o=e(s);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const h=await n(a).render(a,i);t(a)||h.connect(r,c)}))},bu=(n,e,t,s)=>i=>n(bs,()=>bs(i))?Promise.resolve(n(s,s)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),Tu=n=>(e,t)=>{n.set(e,t)},Au=n=>(e,t)=>n.set(e,t),Nu=(n,e,t,s,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(s(l)).map(h=>t(h).render(h,l)))).then(()=>i(l)).then(h=>(typeof h.copyFromChannel!="function"?(o(h),Ti(h)):e(r,()=>r(h))||a(h),n.add(h),h)),Su={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},ku=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...Su,...c},u=t(l,h),p=r(l),f=p?s():null;super(a,!1,u,f),this._pan=e(this,p,u.pan)}get pan(){return this._pan}},Cu=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ne(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.pan,l.pan):await s(c,a.pan,l.pan),is(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Iu=n=>()=>{if(n===null)return!1;try{new n({length:1,sampleRate:44100})}catch{return!1}return!0},Ou=(n,e)=>async()=>{if(n===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),s=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await s.audioWorklet.addModule(i);const a=new n(s,"a",{numberOfOutputs:0}),c=s.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await s.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},Eu=(n,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),s=n(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{s.disconnect(),i(t.currentTime!==0)},t.startRendering()})},Mu=()=>new DOMException("","UnknownError"),Du={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},Ru=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...Du,...l},p=t(h,u),d=r(h)?s():null;super(c,!0,p,d),this._isCurveNullified=!1,this._nativeWaveShaperNode=p,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},$u=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ne(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=n(o,l)}return s.set(o,a),is(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Pu=()=>typeof window>"u"?null:window,Vu=(n,e)=>t=>{t.copyFromChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)s[u]=l[u+o]},t.copyToChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)l[u+o]=s[u]}},Fu=n=>e=>{e.copyFromChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyToChannel)},Uu=n=>(e,t)=>{const s=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=s),n(e,"buffer",i=>()=>{const r=i.call(e);return r===s?null:r},i=>r=>i.call(e,r===null?s:r))},Lu=(n,e)=>(t,s)=>{s.channelCount=1,s.channelCountMode="explicit",Object.defineProperty(s,"channelCount",{get:()=>1,set:()=>{throw n()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:()=>{throw n()}});const i=t.createBufferSource();e(s,()=>{const a=s.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(s,0,c)},()=>i.disconnect(s))},Ro=(n,e,t)=>n.copyFromChannel===void 0?n.getChannelData(t)[0]:(n.copyFromChannel(e,t),e[0]),$o=n=>{if(n===null)return!1;const e=n.length;return e%2!==0?n[Math.floor(e/2)]!==0:n[e/2-1]+n[e/2]!==0},Rs=(n,e,t,s)=>{let i=n;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(n,e,{get:t(r),set:s(o)})},Bu=n=>({...n,outputChannelCount:n.outputChannelCount!==void 0?n.outputChannelCount:n.numberOfInputs===1&&n.numberOfOutputs===1?[n.channelCount]:Array.from({length:n.numberOfOutputs},()=>1)}),ju=n=>({...n,channelCount:n.numberOfOutputs}),qu=n=>{const{imag:e,real:t}=n;return e===void 0?t===void 0?{...n,imag:[0,0],real:[0,0]}:{...n,imag:Array.from(t,()=>0),real:t}:t===void 0?{...n,imag:e,real:Array.from(e,()=>0)}:{...n,imag:e,real:t}},Po=(n,e,t)=>{try{n.setValueAtTime(e,t)}catch(s){if(s.code!==9)throw s;Po(n,e,t+1e-7)}},Wu=n=>{const e=n.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},zu=n=>{const e=n.createBufferSource(),t=n.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Gu=n=>{const e=n.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},Ci=n=>{const e=n.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},Vo=n=>{const e=n.createBuffer(1,1,44100),t=n.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},Ii=n=>{const e=n.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},Yu=n=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(n)}finally{e.close(),t.close()}},Hu=n=>{n.start=(e=>(t=0,s=0,i)=>{const r=n.buffer,o=r===null?s:Math.min(r.duration,s);r!==null&&o>r.duration-.5/n.context.sampleRate?e.call(n,t,0,0):e.call(n,t,o,i)})(n.start)},Fo=(n,e)=>{const t=e.createGain();n.connect(t);const s=(i=>()=>{i.call(n,t),n.removeEventListener("ended",s)})(n.disconnect);n.addEventListener("ended",s),rs(n,t),n.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(n,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(n,o),r=!0}})(n.stop)},os=(n,e)=>t=>{const s={value:n};return Object.defineProperties(t,{currentTarget:s,target:s}),typeof e=="function"?e.call(n,t):e.handleEvent.call(n,t)},Xu=mc(Ft),Zu=wc(Ft),Qu=Dl(Sn),Uo=new WeakMap,Ju=Ql(Uo),Ze=ll(new Map,new WeakMap),Ke=Pu(),Lo=kh(Ze,tt),Oi=Zl(Ce),be=xu(Ce,Oi,Rt),Ku=Sc(Lo,ie,be),ne=eh(Nn),ut=eu(Ke),se=_h(ut),Bo=new WeakMap,jo=ql(os),$s=Eh(Ke),Ei=ph($s),Mi=fh(Ke),qo=mh(Ke),Ts=Dh(Ke),pe=Qc(gc(go),xc(Xu,Zu,on,Qu,an,Ce,Ju,Cs,ie,Ft,at,Rt,Zs),Ze,ch(ii,an,Ce,ie,ws,at),tt,kn,Ie,Il(on,ii,Ce,ie,ws,ne,at,se),Pl(Bo,Ce,Ye),jo,ne,Ei,Mi,qo,se,Ts),ed=Nc(pe,Ku,tt,Lo,ne,se),Di=new WeakSet,Rr=Ch(Ke),Wo=bl(new Uint32Array(1)),Ri=Vu(Wo,tt),$i=Fu(Wo),zo=Cc(Di,Ze,Ie,Rr,ut,Iu(Rr),Ri,$i),Cn=bc(De),Go=wu(Oi,Os,Rt),st=gl(Go),as=Oh(Cn,Ze,Wu,zu,Gu,Ci,Vo,Ii,Hu,Uu(Rs),Fo),nt=vu(Jl(Os),Go),td=Ec(st,as,ie,nt,be),Qe=Jc(_c(_o),Bo,bi,Kc,lc,hc,uc,dc,pc,ti,po,$s,Po),sd=Oc(pe,td,Qe,xe,as,ne,se,os),nd=Lc(pe,Bc,tt,xe,Mh(De,Rs),ne,se,be),id=cl(st,Eo,ie,nt,be),Ut=Au(Uo),rd=al(pe,Qe,id,kn,Eo,ne,se,Ut),bt=Nh(Ft,Mi),od=Lu(xe,bt),Tt=Lh($s,od),ad=dl(Tt,ie,be),cd=ul(pe,ad,Tt,ne,se),ld=ml(Ms,ie,be),hd=fl(pe,ld,Ms,ne,se,ju),ud=qh(Cn,as,De,bt),cs=jh(Cn,Ze,ud,Ci,Ii),dd=wl(st,cs,ie,nt,be),pd=xl(pe,Qe,dd,cs,ne,se,os),Yo=Wh(Ie,Rs),fd=Nl(Yo,ie,be),md=Al(pe,fd,Yo,ne,se,Ut),gd=Ml(st,Mo,ie,nt,be),_d=El(pe,Qe,gd,Mo,ne,se,Ut),Ho=zh(Ie),yd=Ll(st,Ho,ie,nt,be),vd=Ul(pe,Qe,yd,Ho,Ie,ne,se,Ut),xd=Hl(st,De,ie,nt,be),wd=Yl(pe,Qe,xd,De,ne,se),bd=Xh(kn,xe,Ds,Ie),In=bu(Ze,De,Ds,Eu(De,ut)),Td=ah(as,ie,ut,be,In),Ad=Gh(bd),Nd=rh(pe,Ad,Td,ne,se,Ut),Sd=jc(Qe,Tt,cs,Ds,Ie,Ro,se,Rs),Xo=new WeakMap,kd=Ah(nd,Sd,jo,se,Xo,os),Zo=tu(Cn,Ze,Ci,Vo,Ii,Fo),Cd=pu(st,Zo,ie,nt,be),Id=du(pe,Qe,Zo,Cd,ne,se,os),Qo=yl(as),Od=cu(Qo,xe,De,$o,bt),On=au(Qo,xe,Od,$o,bt,$s,Rs),Ed=nu(on,xe,Tt,De,Ds,On,Ie,an,Ro,bt),Jo=su(Ed),Md=gu(st,Tt,cs,De,Jo,ie,ut,nt,be,In),Dd=mu(pe,Qe,Jo,Md,ne,se,Ut),Rd=iu(tt),$d=yu(Rd,ne,new WeakSet,qu),Pd=ou(Tt,Ms,De,On,Ie,bt),Ko=ru(Pd,Ie),Vd=Cu(st,Ko,ie,nt,be),Fd=ku(pe,Qe,Ko,Vd,ne,se),Ud=$u(On,ie,be),Ld=Ru(pe,xe,On,Ud,ne,se,Ut),ea=yh(Ke),Pi=Wl(Ke),ta=new WeakMap,Bd=th(ta,ut),jd=ea?vc(Ze,Ie,jl(Ke),Pi,zl(fc),ne,Bd,se,Ts,new WeakMap,new WeakMap,Ou(Ts,ut),Ke):void 0,qd=gh(Ei,se),Wd=Cl(Di,Ze,kl,Bl,new WeakSet,ne,qd,nn,bs,Ri,$i),sa=rl(jd,ed,zo,sd,rd,cd,hd,pd,md,Wd,_d,vd,wd,Nd,kd,Id,Dd,$d,Fd,Ld),zd=vh(pe,Zh,ne,se),Gd=wh(pe,Qh,ne,se),Yd=bh(pe,Jh,ne,se),Hd=Kh(xe,se),Xd=Th(pe,Hd,ne),Zd=Uc(sa,xe,Ie,Mu,zd,Gd,Yd,Xd,$s),Vi=sh(Xo),Qd=Tc(Vi),na=_l(tt),Jd=Rl(Vi),ia=Vl(tt),ra=new WeakMap,Kd=Xl(ra,Ye),ep=Uh(na,tt,xe,Tt,Ms,cs,De,Ds,Ie,ia,Pi,Kd,bt),tp=$h(xe,ep,De,Ie,bt),sp=il(st,na,as,Tt,Ms,cs,De,Jd,ia,Pi,ie,Ts,ut,nt,be,In),np=Kl(ta),ip=Tu(ra),$r=ea?tl(Qd,pe,Qe,sp,tp,Ce,np,ne,se,Ts,Bu,ip,Yu,os):void 0,rp=Sl(Ie,ut),op=Nu(Di,Ze,Oi,Vi,In,nn,Ri,$i),ap=hu(sa,Ze,xe,rp,op),cp=lh(Nn,Ei),lp=hh(wi,Mi),hp=uh(bi,qo),up=dh(Nn,se);function qe(n){return n===void 0}function Y(n){return n!==void 0}function dp(n){return typeof n=="function"}function ct(n){return typeof n=="number"}function Et(n){return Object.prototype.toString.call(n)==="[object Object]"&&n.constructor===Object}function pp(n){return typeof n=="boolean"}function Le(n){return Array.isArray(n)}function lt(n){return typeof n=="string"}function zs(n){return lt(n)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(n)}function U(n,e){if(!n)throw new Error(e)}function Fe(n,e,t=1/0){if(!(e<=n&&n<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${n}`)}function oa(n){!n.isOffline&&n.state!=="running"&&En('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let aa=!1,Pr=!1;function Vr(n){aa=n}function fp(n){qe(n)&&aa&&!Pr&&(Pr=!0,En("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let ca=console;function mp(...n){ca.log(...n)}function En(...n){ca.warn(...n)}function gp(n){return new Zd(n)}function _p(n,e,t){return new ap(n,e,t)}const Ve=typeof self=="object"?self:null,yp=Ve&&(Ve.hasOwnProperty("AudioContext")||Ve.hasOwnProperty("webkitAudioContext"));function vp(n,e,t){return U(Y($r),"AudioWorkletNode only works in a secure context (https or localhost)"),new(n instanceof Ve?.BaseAudioContext?Ve?.AudioWorkletNode:$r)(n,e,t)}function Je(n,e,t,s){var i=arguments.length,r=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,s);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function de(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(s.next(h))}catch(u){o(u)}}function c(h){try{l(s.throw(h))}catch(u){o(u)}}function l(h){h.done?r(h.value):i(h.value).then(a,c)}l((s=s.apply(n,e||[])).next())})}class xp{constructor(e,t,s,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=s,this._createClock()}_createWorker(){const e=new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval*1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),s=new Worker(t);s.onmessage=this._callback.bind(this),this._worker=s}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function $t(n){return hp(n)}function yt(n){return lp(n)}function Qs(n){return up(n)}function Gt(n){return cp(n)}function wp(n){return n instanceof zo}function bp(n,e){return n==="value"||$t(e)||yt(e)||wp(e)}function Mt(n,...e){if(!e.length)return n;const t=e.shift();if(Et(n)&&Et(t))for(const s in t)bp(s,t[s])?n[s]=t[s]:Et(t[s])?(n[s]||Object.assign(n,{[s]:{}}),Mt(n[s],t[s])):Object.assign(n,{[s]:t[s]});return Mt(n,...e)}function Tp(n,e){return n.length===e.length&&n.every((t,s)=>e[s]===t)}function R(n,e,t=[],s){const i={},r=Array.from(e);if(Et(r[0])&&s&&!Reflect.has(r[0],s)&&(Object.keys(r[0]).some(a=>Reflect.has(n,a))||(Mt(i,{[s]:r[0]}),t.splice(t.indexOf(s),1),r.shift())),r.length===1&&Et(r[0]))Mt(i,r[0]);else for(let o=0;o<t.length;o++)Y(r[o])&&(i[t[o]]=r[o]);return Mt(n,i)}function Ap(n){return n.constructor.getDefaults()}function Zt(n,e){return qe(n)?e:n}function Ct(n,e){return e.forEach(t=>{Reflect.has(n,t)&&delete n[t]}),n}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class dt{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||Ve&&this.toString()===Ve.TONE_DEBUG_CLASS)&&mp(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}dt.version=uo;const Fi=1e-6;function ts(n,e){return n>e+Fi}function li(n,e){return ts(n,e)||ze(n,e)}function un(n,e){return n+Fi<e}function ze(n,e){return Math.abs(n-e)<Fi}function Np(n,e,t){return Math.max(Math.min(n,t),e)}class We extends dt{constructor(){super(),this.name="Timeline",this._timeline=[];const e=R(We.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(U(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];U(li(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const s=this._search(e,t);return s!==-1?this._timeline[s]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const s=this._search(e,t);return s+1<this._timeline.length?this._timeline[s+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const s=this._search(e);return s-1>=0?this._timeline[s-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(ze(this._timeline[t].time,e)){for(let s=t;s>=0&&ze(this._timeline[s].time,e);s--)t=s;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&li(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let s=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;s<r;){let o=Math.floor(s+(r-s)/2);const a=this._timeline[o],c=this._timeline[o+1];if(ze(a[t],e)){for(let l=o;l<this._timeline.length;l++){const h=this._timeline[l];if(ze(h[t],e))o=l;else break}return o}else{if(un(a[t],e)&&ts(c[t],e))return o;ts(a[t],e)?r=o:s=o+1}}return-1}_iterate(e,t=0,s=this._timeline.length-1){this._timeline.slice(t,s+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const s=this._search(e);return s!==-1&&this._iterate(t,0,s),this}forEachAfter(e,t){const s=this._search(e);return this._iterate(t,s+1),this}forEachBetween(e,t,s){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(s,i,r)):i===-1&&this._iterate(s,0,r),this}forEachFrom(e,t){let s=this._search(e);for(;s>=0&&this._timeline[s].time>=e;)s--;return this._iterate(t,s+1),this}forEachAtTime(e,t){const s=this._search(e);if(s!==-1&&ze(this._timeline[s].time,e)){let i=s;for(let r=s;r>=0&&ze(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,s)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const la=[];function Mn(n){la.push(n)}function Sp(n){la.forEach(e=>e(n))}const ha=[];function Dn(n){ha.push(n)}function kp(n){ha.forEach(e=>e(n))}class Ps extends dt{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(qe(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const s=this._events[e].slice(0);for(let i=0,r=s.length;i<r;i++)s[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const s=Object.getOwnPropertyDescriptor(Ps.prototype,t);Object.defineProperty(e.prototype,t,s)})}dispose(){return super.dispose(),this._events=void 0,this}}class ua extends Ps{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class Vs extends ua{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new We,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const s=R(Vs.getDefaults(),arguments,["context"]);s.context?(this._context=s.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=gp({latencyHint:s.latencyHint}),this._latencyHint=s.latencyHint),this._ticker=new xp(this.emit.bind(this,"tick"),s.clockSource,s.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=s.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(Sp(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,s){return this._context.createBuffer(e,t,s)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,s){return this._context.createPeriodicWave(e,t,s)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return U(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return U(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return U(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){U(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){U(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){U(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){U(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return vp(this.rawContext,e,t)}addAudioWorkletModule(e){return de(this,void 0,void 0,function*(){U(Y(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return de(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return Gt(this._context)?this._context.resume():Promise.resolve()}close(){return de(this,void 0,void 0,function*(){Gt(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&kp(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),s=t.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const s=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:s+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const s=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:s,time:r+t})};return i(),s}}class Cp extends ua{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,s){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,s){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return de(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function H(n,e){Le(e)?e.forEach(t=>H(n,t)):Object.defineProperty(n,e,{enumerable:!0,writable:!1})}function Ui(n,e){Le(e)?e.forEach(t=>Ui(n,t)):Object.defineProperty(n,e,{writable:!0})}const Q=()=>{};class ee extends dt{constructor(){super(),this.name="ToneAudioBuffer",this.onload=Q;const e=R(ee.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,lt(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:Q,onload:Q,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:je().sampleRate}set(e){return e instanceof ee?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return de(this,void 0,void 0,function*(){const t=ee.load(e).then(s=>{this.set(s),this.onload(this)});ee.downloads.push(t);try{yield t}finally{const s=ee.downloads.indexOf(t);ee.downloads.splice(s,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=Le(e)&&e[0].length>0,s=t?e.length:1,i=t?e[0].length:e.length,r=je(),o=r.createBuffer(s,i,r.sampleRate),a=!t&&s===1?[e]:e;for(let c=0;c<s;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(ct(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const s=this.numberOfChannels;for(let i=0;i<s;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/s),this.fromArray(t)}return this}toArray(e){if(ct(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let s=0;s<this.numberOfChannels;s++)t[s]=this.getChannelData(s);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){U(this.loaded,"Buffer is not loaded");const s=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);U(s<i,"The start time must be less than the end time");const r=i-s,o=je().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(s,i),a);return new ee(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ee().fromArray(e)}static fromUrl(e){return de(this,void 0,void 0,function*(){return yield new ee().load(e)})}static load(e){return de(this,void 0,void 0,function*(){const t=ee.baseUrl===""||ee.baseUrl.endsWith("/")?ee.baseUrl:ee.baseUrl+"/",s=yield fetch(t+e);if(!s.ok)throw new Error(`could not load url: ${e}`);const i=yield s.arrayBuffer();return yield je().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),s=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+s)!==""}static loaded(){return de(this,void 0,void 0,function*(){for(yield Promise.resolve();ee.downloads.length;)yield ee.downloads[0]})}}ee.baseUrl="";ee.downloads=[];class Rn extends Vs{constructor(){super({clockSource:"offline",context:Qs(arguments[0])?arguments[0]:_p(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Qs(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Qs(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return de(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const s=Math.floor(this.sampleRate/128);e&&t%s===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return de(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ee(t)})}close(){return Promise.resolve()}}const da=new Cp;let It=da;function je(){return It===da&&yp&&Ip(new Vs),It}function Ip(n,e=!1){e&&It.dispose(),Gt(n)?It=new Vs(n):Qs(n)?It=new Rn(n):It=n}function Op(){return It.resume()}if(Ve&&!Ve.TONE_SILENCE_LOGGING){const e=` * Tone.js v${uo} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function Ep(n){return Math.pow(10,n/20)}function Mp(n){return 20*(Math.log(n)/Math.LN10)}function pa(n){return Math.pow(2,n/12)}let $n=440;function Dp(){return $n}function Rp(n){$n=n}function Ot(n){return Math.round(fa(n))}function fa(n){return 69+12*Math.log2(n/$n)}function ma(n){return $n*Math.pow(2,(n-69)/12)}class Li extends dt{constructor(e,t,s){super(),this.defaultUnits="s",this._val=t,this._units=s,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const s=parseInt(e,10),i=t==="."?1.5:1;return s===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/s)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,s)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i+=this._beatsToUnits(parseFloat(s)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof Li&&this.fromType(this._val),qe(this._val))return this._noArg();if(lt(this._val)&&qe(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(Et(this._val)){let e=0;for(const t in this._val)if(Y(this._val[t])){const s=this._val[t],i=new this.constructor(this.context,t).valueOf()*s;e+=i}return e}if(Y(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return lt(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class Ge extends Li{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new Ge(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const s=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/s)*s-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let s=t[0],i=new Ge(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new Ge(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(s=r,i=o)}),s}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const s=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[s,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Ot(this.toFrequency())}_now(){return this.context.now()}}class Ue extends Ge{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Dp()}static set A4(e){Rp(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:Ue.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=$p[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:Ue.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,s){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i*=this._beatsToUnits(parseFloat(s)/4)),i}}})}transpose(e){return new Ue(this.context,this.valueOf()*pa(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Ot(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/Ue.A4);let s=Math.round(12*t)+57;const i=Math.floor(s/12);return i<0&&(s+=-12*i),Pp[s%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return ma(e)}static ftom(e){return Ot(e)}}const $p={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},Pp=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class _s extends Ge{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Me extends dt{constructor(){super();const e=R(Me.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:je()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return fp(e),new Ge(this.context,e).toSeconds()}toFrequency(e){return new Ue(this.context,e).toFrequency()}toTicks(e){return new _s(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(s=>{qe(e[s])&&delete t[s]}),t}get(){const e=Ap(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const s=this[t];Y(s)&&Y(s.value)&&Y(s.setValueAtTime)?e[t]=s.value:s instanceof Me?e[t]=s._getPartialProperties(e[t]):Le(s)||ct(s)||lt(s)||pp(s)?e[t]=s:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&Y(this[t])&&(this[t]&&Y(this[t].value)&&Y(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Me?this[t].set(e[t]):this[t]=e[t])}),this}}class Bi extends We{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,s){return Fe(t,0),this.add(Object.assign({},s,{state:e,time:t})),this}getLastState(e,t){const s=this._search(t);for(let i=s;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const s=this._search(t);if(s!==-1)for(let i=s;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class z extends Me{constructor(){const e=R(z.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,U(Y(e.param)&&($t(e.param)||e.param instanceof z),"param must be an AudioParam");!$t(e.param);)e.param=e.param._param;this._swappable=Y(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new We(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,Y(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Me.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return Y(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return Y(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return Y(this.maxValue)&&Y(this.minValue)&&Fe(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?Ep(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?Mp(e):e}setValueAtTime(e,t){const s=this.toSeconds(t),i=this._fromType(e);return U(isFinite(i)&&isFinite(s),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,s),this._events.add({time:s,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,s),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),s=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(s===null||s.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(s===null)r=i.value;else if(s.type==="linearRampToValueAtTime"||s.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}s.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,s.time,s.value,t):r=this._exponentialInterpolate(i.time,o,s.time,s.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const s=this._fromType(e),i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this._events.add({time:i,type:"linearRampToValueAtTime",value:s}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(s,i),this}exponentialRampToValueAtTime(e,t){let s=this._fromType(e);s=ze(s,0)?this._minOutput:s,this._assertRange(s);const i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:s}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(s,i),this}exponentialRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialRampToValueAtTime(e,s+this.toSeconds(t)),this}linearRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.linearRampToValueAtTime(e,s+this.toSeconds(t)),this}targetRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialApproachValueAtTime(e,s,t),this}exponentialApproachValueAtTime(e,t,s){t=this.toSeconds(t),s=this.toSeconds(s);const i=Math.log(s+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+s*.9),this.linearRampToValueAtTime(e,t+s),this}setTargetAtTime(e,t,s){const i=this._fromType(e);U(isFinite(s)&&s>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),U(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:s,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,s),this._param.setTargetAtTime(i,r,s),this}setValueCurveAtTime(e,t,s,i=1){s=this.toSeconds(s),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=s/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return U(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),s=this._fromType(this.getValueAtTime(t));U(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+s);const i=this._events.get(t),r=this._events.getAfter(t);return i&&ze(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(s),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(s),t)),this._events.add({time:t,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,t),this}rampTo(e,t=.1,s){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,s):this.linearRampTo(e,t,s),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const s=this._events.get(t);if(s&&s.type==="setTargetAtTime"){const i=this._events.getAfter(s.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){U(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,s,i,r){return s+(t-s)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,s,i,r){return t+(i-t)*((r-e)/(s-e))}_exponentialInterpolate(e,t,s,i,r){return t*Math.pow(i/t,(r-e)/(s-e))}}class D extends Me{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return Y(this.input)?$t(this.input)||this.input instanceof z?1:this.input.numberOfInputs:0}get numberOfOutputs(){return Y(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return Y(e)&&(e instanceof D||yt(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(s=>{s.channelCount=e.channelCount,s.channelCountMode=e.channelCountMode,s.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();U(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,s=0){return He(this,e,t,s),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return En("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,s=0){return ga(this,e,t,s),this}chain(...e){return Pt(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),Y(this.input)&&(this.input instanceof D?this.input.dispose():yt(this.input)&&this.input.disconnect()),Y(this.output)&&(this.output instanceof D?this.output.dispose():yt(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Pt(...n){const e=n.shift();n.reduce((t,s)=>(t instanceof D?t.connect(s):yt(t)&&He(t,s),s),e)}function He(n,e,t=0,s=0){for(U(Y(n),"Cannot connect from undefined node"),U(Y(e),"Cannot connect to undefined node"),(e instanceof D||yt(e))&&U(e.numberOfInputs>0,"Cannot connect to node with no inputs"),U(n.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof D||e instanceof z;)Y(e.input)&&(e=e.input);for(;n instanceof D;)Y(n.output)&&(n=n.output);$t(e)?n.connect(e,t):n.connect(e,t,s)}function ga(n,e,t=0,s=0){if(Y(e))for(;e instanceof D;)e=e.input;for(;!yt(n);)Y(n.output)&&(n=n.output);$t(e)?n.disconnect(e,t):yt(e)?n.disconnect(e,t,s):n.disconnect()}class Z extends D{constructor(){const e=R(Z.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new z({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),H(this,"gain")}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class ss extends D{constructor(e){super(e),this.onended=Q,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new Z({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const s=this.toSeconds(t);return this._startTime!==-1&&s>=this._startTime&&(this._stopTime===-1||s<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(D.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:Q})}_startGain(e,t=1){U(this._startTime===-1,"Source cannot be started more than once");const s=this.toSeconds(this._fadeIn);return this._startTime=e+s,this._startTime=Math.max(this._startTime,this.context.currentTime),s>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+s):this._gainNode.gain.exponentialApproachValueAtTime(t,e,s)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){U(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const s=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+s),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==Q&&(this.onended(this),this.onended=Q,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),U(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=Q,this}}class ji extends ss{constructor(){const e=R(ji.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),He(this._source,this._gainNode),this.offset=new z({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(ss.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class te extends D{constructor(){const e=R(te.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new ji({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,s=0){return Pn(this,e,t,s),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,s){return this._param.exponentialRampTo(e,t,s),this}linearRampTo(e,t,s){return this._param.linearRampTo(e,t,s),this}targetRampTo(e,t,s){return this._param.targetRampTo(e,t,s),this}exponentialApproachValueAtTime(e,t,s){return this._param.exponentialApproachValueAtTime(e,t,s),this}setTargetAtTime(e,t,s){return this._param.setTargetAtTime(e,t,s),this}setValueCurveAtTime(e,t,s,i){return this._param.setValueCurveAtTime(e,t,s,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,s){return this._param.rampTo(e,t,s),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function Pn(n,e,t,s){(e instanceof z||$t(e)||e instanceof te&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof te&&(e.overridden=!0)),He(n,e,t,s)}class qi extends z{constructor(){const e=R(qi.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new We(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(z.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,s){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/s,1));for(let a=0;a<=o;a++){const c=s*a+t,l=this._exponentialApproach(r.time,r.value,i,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const s=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const s=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const s=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(qe(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const s=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(s+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),s=this._events.get(t);return Math.max(this._getTicksUntilEvent(s,t),0)}getDurationOfTicks(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-s}getTimeOfTick(e){const t=this._events.get(e,"ticks"),s=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&s&&s.type==="linearRampToValueAtTime"&&t.value!==s.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(s.time))-i)/(s.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const s=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(s);return this.getTicksAtTime(s+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class Wi extends te{constructor(){const e=R(Wi.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new qi({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(te.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class zi extends Me{constructor(){const e=R(zi.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new Bi,this._tickOffset=new We,this._ticksAtTime=new We,this._secondsAtTime=new We,this.frequency=new Wi({context:this.context,units:e.units,value:e.frequency}),H(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Me.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const s=this.toSeconds(e);return this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),Y(t)&&this.setTicksAtTime(t,s),this._ticksAtTime.cancel(s),this._secondsAtTime.cancel(s)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const s=this._state.get(t);s&&s.time>0&&(this._tickOffset.cancel(s.time),this._state.cancel(s.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),s=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||s,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let h=o.time;const u=this._tickOffset.get(l.time);u&&u.time>=o.time&&(a=u.ticks,h=u.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(h),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),s=this.frequency.timeToTicks(e,t);this.setTicksAtTime(s,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),s={state:"paused",time:e};this._state.add(s);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const h=this._tickOffset.get(c.time);h&&h.time>=r.time&&(o=h.seconds,l=h.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==s.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(s),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const s=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(s.time,i.time),o=this.frequency.getTicksAtTime(r)+e-s.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,s){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,s),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let h=Math.ceil(l)-l;h=ze(h,1)?0:h;let u=this.frequency.getTimeOfTick(a+h);for(;u<t;){try{s(u,Math.round(this.getTicksAtTime(u)))}catch(p){r=p;break}u+=this.frequency.getDurationOfTicks(1,u)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class Vn extends Me{constructor(){const e=R(Vn.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=Q,this._lastUpdate=0,this._state=new Bi("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new zi({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,H(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Me.getDefaults(),{callback:Q,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){oa(this.context);const s=this.toSeconds(e);return this.log("start",s),this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),this._tickSource.start(s,t),s<this._lastUpdate&&this.emit("start",s,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(s);return this._tickSource.getTimeOfTick(i+e,s)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,s=>{switch(s.state){case"started":const i=this._tickSource.getTicksAtTime(s.time);this.emit("start",s.time,i);break;case"stopped":s.time!==0&&this.emit("stop",s.time);break;case"paused":this.emit("pause",s.time);break}}),this._tickSource.forEachTickBetween(e,t,(s,i)=>{this.callback(s,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}Ps.mixin(Vn);class dn extends D{constructor(){const e=R(dn.getDefaults(),arguments,["delayTime","maxDelay"]);super(e),this.name="Delay";const t=this.toSeconds(e.maxDelay);this._maxDelay=Math.max(t,this.toSeconds(e.delayTime)),this._delayNode=this.input=this.output=this.context.createDelay(t),this.delayTime=new z({context:this.context,param:this._delayNode.delayTime,units:"time",value:e.delayTime,minValue:0,maxValue:this.maxDelay}),H(this,"delayTime")}static getDefaults(){return Object.assign(D.getDefaults(),{delayTime:0,maxDelay:1})}get maxDelay(){return this._maxDelay}dispose(){return super.dispose(),this._delayNode.disconnect(),this.delayTime.dispose(),this}}class ls extends D{constructor(){const e=R(ls.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new Z({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,H(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class Gi extends D{constructor(){const e=R(Gi.getDefaults(),arguments);super(e),this.name="Destination",this.input=new ls({context:this.context}),this.output=new Z({context:this.context}),this.volume=this.input.volume,Pt(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Pt(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}Mn(n=>{n.destination=new Gi({context:n})});Dn(n=>{n.destination.dispose()});class Vp extends D{constructor(){super(...arguments),this.name="Listener",this.positionX=new z({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new z({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new z({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new z({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new z({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new z({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new z({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new z({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new z({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(D.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}Mn(n=>{n.listener=new Vp({context:n})});Dn(n=>{n.listener.dispose()});class Yi extends dt{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=R(Yi.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const s=e.urls[t];this.add(t,s,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:Q,onload:Q,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return U(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,s=Q,i=Q){return lt(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ee(this.baseUrl+t,s,i))):this._buffers.set(e.toString(),new ee(t,s,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class pn extends Ue{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return Ot(super._frequencyToUnits(e))}_ticksToUnits(e){return Ot(super._ticksToUnits(e))}_beatsToUnits(e){return Ot(super._beatsToUnits(e))}_secondsToUnits(e){return Ot(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return ma(this.toMidi())}transpose(e){return new pn(this.context,this.toMidi()+e)}}class Ht extends _s{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class Fp extends Me{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new We,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}Mn(n=>{n.draw=new Fp({context:n})});Dn(n=>{n.draw.dispose()});class Up extends dt{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){U(Y(e.time),"Events must have a time property"),U(Y(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Lp(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const s of t)if(s.event===e){this._removeNode(s),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let s,i=null;if(t>0)if(e.left.right===null)s=e.left,s.right=e.right,i=s;else{for(s=e.left.right;s.right!==null;)s=s.right;s.parent&&(s.parent.right=s.left,i=s.parent,s.left=e.left,s.right=e.right)}else if(e.right.left===null)s=e.right,s.left=e.left,i=s;else{for(s=e.right.left;s.left!==null;)s=s.left;s.parent&&(s.parent.left=s.right,i=s.parent,s.left=e.left,s.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=s:e.parent.right=s:this._setRoot(s),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,s=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,s=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let s=t[0];for(let i=1;i<t.length;i++)t[i].low>s.low&&(s=t[i]);return s.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(s=>t.push(s)),t.forEach(s=>{s.event&&e(s.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const s=[];this._root.search(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const s=[];this._root.searchAfter(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Lp{constructor(e,t,s){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=s,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Bp extends dt{constructor(e){super(),this.name="TimelineValue",this._timeline=new We({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class et extends D{constructor(){super(R(et.getDefaults(),arguments,["context"]))}connect(e,t=0,s=0){return Pn(this,e,t,s),this}}class hs extends et{constructor(){const e=R(hs.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,Le(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):dp(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(te.getDefaults(),{length:1024})}setMap(e,t=1024){const s=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;s[i]=e(o,i)}return this.curve=s,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(s=>s.includes(e));U(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class Fn extends et{constructor(){const e=R(Fn.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new hs({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(et.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class vt{constructor(e,t){this.id=vt._eventId++,this._remainderTime=0;const s=Object.assign(vt.getDefaults(),t);this.transport=e,this.callback=s.callback,this._once=s.once,this.time=Math.floor(s.time),this._remainderTime=s.time-this.time}static getDefaults(){return{callback:Q,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}vt._eventId=0;class Hi extends vt{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const s=Object.assign(Hi.getDefaults(),t);this.duration=s.duration,this._interval=s.interval,this._nextTick=s.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},vt.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return un(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new Ht(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){un(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new Ht(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);ts(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class Un extends Me{constructor(){const e=R(Un.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new Bp(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new We,this._repeatedEvents=new Up,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new Vn({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),H(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Me.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const s=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(s*Math.PI)*this._swingAmount;e+=new Ht(this.context,this._swingTicks*2/3).toSeconds()*i}Vr(!0),this._timeline.forEachAtTime(t,s=>s.invoke(e)),Vr(!1)}schedule(e,t){const s=new vt(this,{callback:e,time:new _s(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}scheduleRepeat(e,t,s,i=1/0){const r=new Hi(this,{callback:e,duration:new Ge(this.context,i).toTicks(),interval:new Ge(this.context,t).toTicks(),time:new _s(this.context,s).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const s=new vt(this,{callback:e,once:!0,time:new _s(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,s=>this.clear(s.id)),this._repeatedEvents.forEachFrom(t,s=>this.clear(s.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new Ht(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let s;return Y(t)&&(s=this.toTicks(t)),this._clock.start(e,s),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){Le(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new Ge(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new Ge(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new Ht(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new Ht(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),s=this._clock.frequency.timeToTicks(e,t);this.ticks=s}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const s=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(s)-s,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),s=this.getTicksAtTime(t),i=e-s%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const s=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(s)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new Z(c),h=new Fn(-1),u=new Z(c);i.chain(l,h,u),i=u,r=1/r,o=[l,h,u]}t||(e.getValueAtTime(s)!==0?t=e.getValueAtTime(s)/r:t=0);const a=new Z(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const s=this._syncedSignals[t];s.signal===e&&(s.nodes.forEach(i=>i.dispose()),s.signal.value=s.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),Ui(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}Ps.mixin(Un);Mn(n=>{n.transport=new Un({context:n})});Dn(n=>{n.transport.dispose()});class Te extends D{constructor(e){super(e),this.input=void 0,this._state=new Bi("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=Q,this._syncedStop=Q,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new ls({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,H(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,onstop:Q,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,s){let i=qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")U(ts(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,s);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(Zt(t,0)),r.duration=s?this.toSeconds(s):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,s)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else oa(this.context),this._start(i,t,s);return this}stop(e){let t=qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||Y(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const s=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(s)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,s){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,s)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(ts(t,0)){const s=this._state.get(t);if(s&&s.state==="started"&&s.time!==t){const i=t-this.toSeconds(s.time);let r;s.duration&&(r=this.toSeconds(s.duration)-i),this._start(e,this.toSeconds(s.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=Q,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class Fs extends ss{constructor(){const e=R(Fs.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,He(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new z({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ee(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(ss.getDefaults(),{url:new ee,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,s,i=1){U(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=Zt(t,this.loopStart):t=Zt(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;li(o,a)&&(o=(o-c)%l+c),ze(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,un(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),Y(s)){let a=this.toSeconds(s);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}class fn extends Te{constructor(){const e=R(fn.getDefaults(),arguments,["type"]);super(e),this.name="Noise",this._source=null,this._playbackRate=e.playbackRate,this.type=e.type,this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Te.getDefaults(),{fadeIn:0,fadeOut:0,playbackRate:1,type:"white"})}get type(){return this._type}set type(e){if(U(e in Fr,"Noise: invalid type: "+e),this._type!==e&&(this._type=e,this.state==="started")){const t=this.now();this._stop(t),this._start(t)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this._source&&(this._source.playbackRate.value=e)}_start(e){const t=Fr[this._type];this._source=new Fs({url:t,context:this.context,fadeIn:this._fadeIn,fadeOut:this._fadeOut,loop:!0,onended:()=>this.onstop(this),playbackRate:this._playbackRate}).connect(this.output),this._source.start(this.toSeconds(e),Math.random()*(t.duration-.001))}_stop(e){this._source&&(this._source.stop(this.toSeconds(e)),this._source=null)}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e,this._source&&(this._source.fadeIn=this._fadeIn)}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e,this._source&&(this._source.fadeOut=this._fadeOut)}_restart(e){this._stop(e),this._start(e)}dispose(){return super.dispose(),this._source&&this._source.disconnect(),this}}const Wt=44100*5,Kn=2,it={brown:null,pink:null,white:null},Fr={get brown(){if(!it.brown){const n=[];for(let e=0;e<Kn;e++){const t=new Float32Array(Wt);n[e]=t;let s=0;for(let i=0;i<Wt;i++){const r=Math.random()*2-1;t[i]=(s+.02*r)/1.02,s=t[i],t[i]*=3.5}}it.brown=new ee().fromArray(n)}return it.brown},get pink(){if(!it.pink){const n=[];for(let e=0;e<Kn;e++){const t=new Float32Array(Wt);n[e]=t;let s,i,r,o,a,c,l;s=i=r=o=a=c=l=0;for(let h=0;h<Wt;h++){const u=Math.random()*2-1;s=.99886*s+u*.0555179,i=.99332*i+u*.0750759,r=.969*r+u*.153852,o=.8665*o+u*.3104856,a=.55*a+u*.5329522,c=-.7616*c-u*.016898,t[h]=s+i+r+o+a+c+l+u*.5362,t[h]*=.11,l=u*.115926}}it.pink=new ee().fromArray(n)}return it.pink},get white(){if(!it.white){const n=[];for(let e=0;e<Kn;e++){const t=new Float32Array(Wt);n[e]=t;for(let s=0;s<Wt;s++)t[s]=Math.random()*2-1}it.white=new ee().fromArray(n)}return it.white}};function Lt(n,e){return de(this,void 0,void 0,function*(){const t=e/n.context.sampleRate,s=new Rn(1,t,n.context.sampleRate);return new n.constructor(Object.assign(n.get(),{frequency:2/t,detune:0,context:s})).toDestination().start(0),(yield s.render()).getChannelData(0)})}class Xi extends ss{constructor(){const e=R(Xi.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],He(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new z({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new z({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),H(this,["frequency","detune"])}static getDefaults(){return Object.assign(ss.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class ue extends Te{constructor(){const e=R(ue.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),H(this,"frequency"),this.detune=new te({context:this.context,units:"cents",value:e.detune}),H(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),s=new Xi({context:this.context,onended:()=>this.onstop(this)});this._oscillator=s,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return ue._periodicWaveCache.find(t=>t.phase===this._phase&&Tp(t.partials,this._partials));{const e=ue._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const s=this._getCachedPeriodicWave();if(Y(s)){const{partials:i,wave:r}=s;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),ue._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),ue._periodicWaveCache.length>100&&ue._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){Fe(e,0);let t=this._type;const s=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(s&&(t=s[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let h;switch(e){case"sine":h=c<=a?1:0,this._partials[c-1]=h;break;case"square":h=c&1?2*l:0,this._partials[c-1]=h;break;case"sawtooth":h=l*(c&1?1:-1),this._partials[c-1]=h;break;case"triangle":c&1?h=2*(l*l)*(c-1>>1&1?-1:1):h=0,this._partials[c-1]=h;break;case"custom":h=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}h!==0?(r[c]=-h*Math.sin(t*c),o[c]=h*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,s){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*s)+t[o]*Math.sin(o*s);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let s=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)s=Math.max(this._inverseFFT(e,t,o/r*i),s);return Np(-this._inverseFFT(e,t,this._phase)/s,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}ue._periodicWaveCache=[];class _a extends et{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new hs({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Vt extends te{constructor(){const e=R(Vt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new Z({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class Ln extends Te{constructor(){const e=R(Ln.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new _a({context:this.context}),this._modulationNode=new Z({context:this.context}),this._carrier=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new ue({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),H(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ue.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class Bn extends Te{constructor(){const e=R(Bn.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new Z({context:this.context,gain:0}),this._carrier=new ue({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new ue({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Vt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),H(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ue.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class Us extends Te{constructor(){const e=R(Us.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new Z({context:this.context,gain:0}),this._thresh=new hs({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new te({context:this.context,units:"audioRange",value:e.width}),this._triangle=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),H(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class jn extends Te{constructor(){const e=R(jn.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,H(this,["frequency","detune"])}static getDefaults(){return Object.assign(ue.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,s=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+s*r)}}get count(){return this._oscillators.length}set count(e){if(Fe(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const s=new ue({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):Q});this.type==="custom"&&(s.partials=this._partials),this.frequency.connect(s.frequency),this.detune.connect(s.detune),s.detune.overridden=!1,s.connect(this.output),this._oscillators[t]=s}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,s)=>t.phase=this._phase+s/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class qn extends Te{constructor(){const e=R(qn.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Vt({context:this.context,value:2}),this._pulse=new Us({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),H(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const Ur={am:Ln,fat:jn,fm:Bn,oscillator:ue,pulse:Us,pwm:qn};class ns extends Te{constructor(){const e=R(ns.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),H(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(ue.getDefaults(),Bn.getDefaults(),Ln.getDefaults(),jn.getDefaults(),Us.getDefaults(),qn.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=Ur[e],s=this.now();if(this._oscillator){const i=this._oscillator;i.stop(s),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(s)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof Ur[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&ct(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&ct(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&lt(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return de(this,arguments,void 0,function*(e=1024){return Lt(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}class Zi extends te{constructor(){super(R(Zi.getDefaults(),arguments,["value"])),this.override=!1,this.name="Add",this._sum=new Z({context:this.context}),this.input=this._sum,this.output=this._sum,this.addend=this._param,Pt(this._constantSource,this._sum)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._sum.dispose(),this}}class Wn extends et{constructor(){const e=R(Wn.getDefaults(),arguments,["min","max"]);super(e),this.name="Scale",this._mult=this.input=new Vt({context:this.context,value:e.max-e.min}),this._add=this.output=new Zi({context:this.context,value:e.min}),this._min=e.min,this._max=e.max,this.input.connect(this.output)}static getDefaults(){return Object.assign(et.getDefaults(),{max:1,min:0})}get min(){return this._min}set min(e){this._min=e,this._setRange()}get max(){return this._max}set max(e){this._max=e,this._setRange()}_setRange(){this._add.value=this._min,this._mult.value=this._max-this._min}dispose(){return super.dispose(),this._add.dispose(),this._mult.dispose(),this}}class Qi extends et{constructor(){super(R(Qi.getDefaults(),arguments)),this.name="Zero",this._gain=new Z({context:this.context}),this.output=this._gain,this.input=void 0,He(this.context.getConstant(0),this._gain)}dispose(){return super.dispose(),ga(this.context.getConstant(0),this._gain),this}}class mn extends D{constructor(){const e=R(mn.getDefaults(),arguments,["frequency","min","max"]);super(e),this.name="LFO",this._stoppedValue=0,this._units="number",this.convert=!0,this._fromType=z.prototype._fromType,this._toType=z.prototype._toType,this._is=z.prototype._is,this._clampValue=z.prototype._clampValue,this._oscillator=new ue(e),this.frequency=this._oscillator.frequency,this._amplitudeGain=new Z({context:this.context,gain:e.amplitude,units:"normalRange"}),this.amplitude=this._amplitudeGain.gain,this._stoppedSignal=new te({context:this.context,units:"audioRange",value:0}),this._zeros=new Qi({context:this.context}),this._a2g=new _a({context:this.context}),this._scaler=this.output=new Wn({context:this.context,max:e.max,min:e.min}),this.units=e.units,this.min=e.min,this.max=e.max,this._oscillator.chain(this._amplitudeGain,this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),H(this,["amplitude","frequency"]),this.phase=e.phase}static getDefaults(){return Object.assign(ue.getDefaults(),{amplitude:1,frequency:"4n",max:1,min:0,type:"sine",units:"number"})}start(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(0,e),this._oscillator.start(e),this}stop(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(this._stoppedValue,e),this._oscillator.stop(e),this}sync(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this}unsync(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this}_setStoppedValue(){this._stoppedValue=this._oscillator.getInitialValue(),this._stoppedSignal.value=this._stoppedValue}get min(){return this._toType(this._scaler.min)}set min(e){e=this._fromType(e),this._scaler.min=e}get max(){return this._toType(this._scaler.max)}set max(e){e=this._fromType(e),this._scaler.max=e}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e,this._setStoppedValue()}get partials(){return this._oscillator.partials}set partials(e){this._oscillator.partials=e,this._setStoppedValue()}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e,this._setStoppedValue()}get units(){return this._units}set units(e){const t=this.min,s=this.max;this._units=e,this.min=t,this.max=s}get state(){return this._oscillator.state}connect(e,t,s){return(e instanceof z||e instanceof te)&&(this.convert=e.convert,this.units=e.units),Pn(this,e,t,s),this}dispose(){return super.dispose(),this._oscillator.dispose(),this._stoppedSignal.dispose(),this._zeros.dispose(),this._scaler.dispose(),this._a2g.dispose(),this._amplitudeGain.dispose(),this.amplitude.dispose(),this}}function ya(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Fe(r,n,e),t.set(this,r)}})}}function pt(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Fe(this.toSeconds(r),n,e),t.set(this,r)}})}}class zn extends Te{constructor(){const e=R(zn.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ee({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Te.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1,reverse:!1})}load(e){return de(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=Q){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,s){return super.start(e,t,s),this}_start(e,t,s){this._loop?t=Zt(t,this._loopStart):t=Zt(t,0);const i=this.toSeconds(t),r=s;s=Zt(s,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(s);o=o/this._playbackRate,e=this.toSeconds(e);const a=new Fs({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&qe(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(s=>s.stop(t))}restart(e,t,s){return super.restart(e,t,s),this}_restart(e,t,s){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,s)}seek(e,t){const s=this.toSeconds(t);if(this._state.getValueAtTime(s)==="started"){const i=this.toSeconds(e);this._stop(s),this._start(s,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&Fe(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&Fe(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),s=this._state.getNextState("stopped",t);s&&s.implicitEnd&&(this._state.cancel(s.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}Je([pt(0)],zn.prototype,"fadeIn",void 0);Je([pt(0)],zn.prototype,"fadeOut",void 0);class jp extends et{constructor(){super(...arguments),this.name="GainToAudio",this._norm=new hs({context:this.context,mapping:e=>Math.abs(e)*2-1}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Xe extends D{constructor(){const e=R(Xe.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new te({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(lt(e))return e;{let s;for(s in Gs)if(Gs[s][t]===e)return s;return e}}_setCurve(e,t,s){if(lt(s)&&Reflect.has(Gs,s)){const i=Gs[s];Et(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(Le(s)&&e!=="_decayCurve")this[e]=s;else throw new Error("Envelope: invalid curve: "+s)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const s=this.toSeconds(this.release);s<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,s,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,s,e):(U(Le(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,s,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,s=1){return t=this.toSeconds(t),this.triggerAttack(t,s),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,s=0){return Pn(this,e,t,s),this}asArray(){return de(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,s=new Rn(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:s}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield s.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}Je([pt(0)],Xe.prototype,"attack",void 0);Je([pt(0)],Xe.prototype,"decay",void 0);Je([ya(0,1)],Xe.prototype,"sustain",void 0);Je([pt(0)],Xe.prototype,"release",void 0);const Gs=(()=>{let e,t;const s=[];for(e=0;e<128;e++)s[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const p=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=p/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const p=Math.pow(t,3)*4+.2,f=Math.cos(p*Math.PI*2*t);l[e]=Math.abs(f*(1-t))}function h(p){const f=new Array(p.length);for(let d=0;d<p.length;d++)f[d]=1-p[d];return f}function u(p){return p.slice(0).reverse()}return{bounce:{In:h(l),Out:l},cosine:{In:s,Out:u(s)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:h(i)},sine:{In:c,Out:h(c)},step:{In:o,Out:h(o)}}})();class xt extends D{constructor(){const e=R(xt.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,H(this,"volume")}static getDefaults(){return Object.assign(D.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const s=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,s.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class ht extends xt{constructor(){const e=R(ht.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(xt.getDefaults(),{detune:0,onsilence:Q,portamento:0})}triggerAttack(e,t,s=1){this.log("triggerAttack",e,t,s);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,s),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const s=this.toSeconds(t),i=e instanceof Ue?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(s)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,s)}else this.frequency.setValueAtTime(i,s);return this}}Je([pt(0)],ht.prototype,"portamento",void 0);class Gn extends Xe{constructor(){super(R(Gn.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new Z({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class wt extends ht{constructor(){const e=R(wt.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new ns(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new Gn(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),H(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(ht.getDefaults(),{envelope:Object.assign(Ct(Xe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(Ct(ns.getDefaults(),[...Object.keys(Te.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class gn extends D{constructor(){const e=R(gn.getDefaults(),arguments,["frequency","type"]);super(e),this.name="BiquadFilter",this._filter=this.context.createBiquadFilter(),this.input=this.output=this._filter,this.Q=new z({context:this.context,units:"number",value:e.Q,param:this._filter.Q}),this.frequency=new z({context:this.context,units:"frequency",value:e.frequency,param:this._filter.frequency}),this.detune=new z({context:this.context,units:"cents",value:e.detune,param:this._filter.detune}),this.gain=new z({context:this.context,units:"decibels",convert:!1,value:e.gain,param:this._filter.gain}),this.type=e.type}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,type:"lowpass",frequency:350,detune:0,gain:0})}get type(){return this._filter.type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._filter.type=e}getFrequencyResponse(e=128){const t=new Float32Array(e);for(let o=0;o<e;o++){const c=Math.pow(o/e,2)*19980+20;t[o]=c}const s=new Float32Array(e),i=new Float32Array(e),r=this.context.createBiquadFilter();return r.type=this.type,r.Q.value=this.Q.value,r.frequency.value=this.frequency.value,r.gain.value=this.gain.value,r.getFrequencyResponse(t,s,i),s}dispose(){return super.dispose(),this._filter.disconnect(),this.Q.dispose(),this.frequency.dispose(),this.gain.dispose(),this.detune.dispose(),this}}class _n extends D{constructor(){const e=R(_n.getDefaults(),arguments,["frequency","type","rolloff"]);super(e),this.name="Filter",this.input=new Z({context:this.context}),this.output=new Z({context:this.context}),this._filters=[],this._filters=[],this.Q=new te({context:this.context,units:"positive",value:e.Q}),this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this.gain=new te({context:this.context,units:"decibels",convert:!1,value:e.gain}),this._type=e.type,this.rolloff=e.rolloff,H(this,["detune","frequency","gain","Q"])}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,detune:0,frequency:350,gain:0,rolloff:-12,type:"lowpass"})}get type(){return this._type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._type=e,this._filters.forEach(s=>s.type=e)}get rolloff(){return this._rolloff}set rolloff(e){const t=ct(e)?e:parseInt(e,10),s=[-12,-24,-48,-96];let i=s.indexOf(t);U(i!==-1,`rolloff can only be ${s.join(", ")}`),i+=1,this._rolloff=t,this.input.disconnect(),this._filters.forEach(r=>r.disconnect()),this._filters=new Array(i);for(let r=0;r<i;r++){const o=new gn({context:this.context});o.type=this._type,this.frequency.connect(o.frequency),this.detune.connect(o.detune),this.Q.connect(o.Q),this.gain.connect(o.gain),this._filters[r]=o}this._internalChannels=this._filters,Pt(this.input,...this._internalChannels,this.output)}getFrequencyResponse(e=128){const t=new gn({context:this.context,frequency:this.frequency.value,gain:this.gain.value,Q:this.Q.value,type:this._type,detune:this.detune.value}),s=new Float32Array(e).map(()=>1);return this._filters.forEach(()=>{t.getFrequencyResponse(e).forEach((r,o)=>s[o]*=r)}),t.dispose(),s}dispose(){return super.dispose(),this._filters.forEach(e=>{e.dispose()}),Ui(this,["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.detune.dispose(),this.gain.dispose(),this}}class yn extends Xe{constructor(){const e=R(yn.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="FrequencyEnvelope",this._octaves=e.octaves,this._baseFrequency=this.toFrequency(e.baseFrequency),this._exponent=this.input=new Fn({context:this.context,value:e.exponent}),this._scale=this.output=new Wn({context:this.context,min:this._baseFrequency,max:this._baseFrequency*Math.pow(2,this._octaves)}),this._sig.chain(this._exponent,this._scale)}static getDefaults(){return Object.assign(Xe.getDefaults(),{baseFrequency:200,exponent:1,octaves:4})}get baseFrequency(){return this._baseFrequency}set baseFrequency(e){const t=this.toFrequency(e);Fe(t,0),this._baseFrequency=t,this._scale.min=this._baseFrequency,this.octaves=this._octaves}get octaves(){return this._octaves}set octaves(e){this._octaves=e,this._scale.max=this._baseFrequency*Math.pow(2,e)}get exponent(){return this._exponent.value}set exponent(e){this._exponent.value=e}dispose(){return super.dispose(),this._exponent.dispose(),this._scale.dispose(),this}}class Ji extends ht{constructor(){const e=R(Ji.getDefaults(),arguments);super(e),this.name="MonoSynth",this.oscillator=new ns(Object.assign(e.oscillator,{context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)})),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new _n(Object.assign(e.filter,{context:this.context})),this.filterEnvelope=new yn(Object.assign(e.filterEnvelope,{context:this.context})),this.envelope=new Gn(Object.assign(e.envelope,{context:this.context})),this.oscillator.chain(this.filter,this.envelope,this.output),this.filterEnvelope.connect(this.filter.frequency),H(this,["oscillator","frequency","detune","filter","filterEnvelope","envelope"])}static getDefaults(){return Object.assign(ht.getDefaults(),{envelope:Object.assign(Ct(Xe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.9}),filter:Object.assign(Ct(_n.getDefaults(),Object.keys(D.getDefaults())),{Q:1,rolloff:-12,type:"lowpass"}),filterEnvelope:Object.assign(Ct(yn.getDefaults(),Object.keys(D.getDefaults())),{attack:.6,baseFrequency:200,decay:.2,exponent:2,octaves:3,release:2,sustain:.5}),oscillator:Object.assign(Ct(ns.getDefaults(),Object.keys(Te.getDefaults())),{type:"sawtooth"})})}_triggerEnvelopeAttack(e,t=1){if(this.envelope.triggerAttack(e,t),this.filterEnvelope.triggerAttack(e),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.filterEnvelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this.filterEnvelope.dispose(),this.filter.dispose(),this}}class Yn extends wt{constructor(){const e=R(Yn.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,H(this,["oscillator","envelope"])}static getDefaults(){return Mt(ht.getDefaults(),wt.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const s=this.toSeconds(t),i=this.toFrequency(e instanceof Ue?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,s),this.oscillator.frequency.exponentialRampToValueAtTime(i,s+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}Je([ya(0)],Yn.prototype,"octaves",void 0);Je([pt(0)],Yn.prototype,"pitchDecay",void 0);const va=new Set;function Ki(n){va.add(n)}function xa(n,e){const t=`registerProcessor("${n}", ${e})`;va.add(t)}const qp=`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;Ki(qp);const Wp=`
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;Ki(Wp);const zp=`
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;Ki(zp);const Gp="feedback-comb-filter",Yp=`
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;xa(Gp,Yp);class us extends xt{constructor(){const e=R(us.getDefaults(),arguments,["voice","options"]);super(e),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=i=>this.releaseAll(i),U(!ct(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const s=this._voices.indexOf(this._dummyVoice);this._voices.splice(s,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(xt.getDefaults(),{maxPolyphony:32,options:{},voice:wt})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(s=>s.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return U(e instanceof ht,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else En("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,s){e.forEach(i=>{const r=new pn(this.context,i).toMidi(),o=this._getNextAvailableVoice();o&&(o.triggerAttack(i,t,s),this._activeVoices.push({midi:r,voice:o,released:!1}),this.log("triggerAttack",i,t))})}_triggerRelease(e,t){e.forEach(s=>{const i=new pn(this.context,s).toMidi(),r=this._activeVoices.find(({midi:o,released:a})=>o===i&&!a);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",s,t))})}_scheduleEvent(e,t,s,i){U(!this.disposed,"Synth was already disposed"),s<=this.now()?e==="attack"?this._triggerAttack(t,s,i):this._triggerRelease(t,s):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,s,i)},s-this.now())}triggerAttack(e,t,s){Array.isArray(e)||(e=[e]);const i=this.toSeconds(t);return this._scheduleEvent("attack",e,i,s),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("release",e,s),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s);if(this.triggerAttack(e,r,i),Le(t)){U(Le(e),"If the duration is an array, the notes must also be an array"),e=e;for(let o=0;o<e.length;o++){const a=t[Math.min(o,t.length-1)],c=this.toSeconds(a);U(c>0,"The duration must be greater than 0"),this.triggerRelease(e[o],r+c)}}else{const o=this.toSeconds(t);U(o>0,"The duration must be greater than 0"),this.triggerRelease(e,r+o)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=Ct(e,["onsilence","context"]);return this.options=Mt(this.options,t),this._voices.forEach(s=>s.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:s})=>{s.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class Ls extends xt{constructor(){const e=R(Ls.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(s=>{const i=parseInt(s,10);if(U(zs(s)||ct(i)&&isFinite(i),`url key is neither a note or midi pitch: ${s}`),zs(s)){const r=new Ue(this.context,s).toMidi();t[r]=e.urls[s]}else ct(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new Yi({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(xt.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:Q,onerror:Q,release:.1,urls:{}})}_findClosest(e){let s=0;for(;s<96;){if(this._buffers.has(e+s))return-s;if(this._buffers.has(e-s))return s;s++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,s=1){return this.log("triggerAttack",e,t,s),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=fa(new Ue(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,h=this._buffers.get(l),u=pa(c+a),p=new Fs({url:h,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:u}).connect(this.output);p.start(t,0,h.duration/u,s),Le(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(p),p.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const f=this._activeSources.get(o),d=f.indexOf(p);d!==-1&&f.splice(d,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(s=>{const i=new Ue(this.context,s).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(s=>{for(;s.length;)s.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,s,i=1){const r=this.toSeconds(s);return this.triggerAttack(e,r,i),Le(t)?(U(Le(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,s){if(U(zs(e)||isFinite(e),`note must be a pitch or midi: ${e}`),zs(e)){const i=new Ue(this.context,e).toMidi();this._buffers.add(i,t,s)}else this._buffers.add(e,t,s);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}Je([pt(0)],Ls.prototype,"attack",void 0);Je([pt(0)],Ls.prototype,"release",void 0);class Hn extends D{constructor(){const e=R(Hn.getDefaults(),arguments,["fade"]);super(e),this.name="CrossFade",this._panner=this.context.createStereoPanner(),this._split=this.context.createChannelSplitter(2),this._g2a=new jp({context:this.context}),this.a=new Z({context:this.context,gain:0}),this.b=new Z({context:this.context,gain:0}),this.output=new Z({context:this.context}),this._internalChannels=[this.a,this.b],this.fade=new te({context:this.context,units:"normalRange",value:e.fade}),H(this,"fade"),this.context.getConstant(1).connect(this._panner),this._panner.connect(this._split),this._panner.channelCount=1,this._panner.channelCountMode="explicit",He(this._split,this.a.gain,0),He(this._split,this.b.gain,1),this.fade.chain(this._g2a,this._panner.pan),this.a.connect(this.output),this.b.connect(this.output)}static getDefaults(){return Object.assign(D.getDefaults(),{fade:.5})}dispose(){return super.dispose(),this.a.dispose(),this.b.dispose(),this.output.dispose(),this.fade.dispose(),this._g2a.dispose(),this._panner.disconnect(),this._split.disconnect(),this}}class Lr extends D{constructor(e){super(e),this.name="Effect",this._dryWet=new Hn({context:this.context}),this.wet=this._dryWet.fade,this.effectSend=new Z({context:this.context}),this.effectReturn=new Z({context:this.context}),this.input=new Z({context:this.context}),this.output=this._dryWet,this.input.fan(this._dryWet.a,this.effectSend),this.effectReturn.connect(this._dryWet.b),this.wet.setValueAtTime(e.wet,0),this._internalChannels=[this.effectReturn,this.effectSend],H(this,"wet")}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}connectEffect(e){return this._internalChannels.push(e),this.effectSend.chain(e,this.effectReturn),this}dispose(){return super.dispose(),this._dryWet.dispose(),this.effectSend.dispose(),this.effectReturn.dispose(),this.wet.dispose(),this}}class er extends D{constructor(){const e=R(er.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new z({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",H(this,"pan")}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Hp="bit-crusher",Xp=`
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;xa(Hp,Xp);class Xn extends D{constructor(){const e=R(Xn.getDefaults(),arguments,["channels"]);super(e),this.name="Split",this._splitter=this.input=this.output=this.context.createChannelSplitter(e.channels),this._internalChannels=[this._splitter]}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._splitter.disconnect(),this}}class Bs extends D{constructor(){const e=R(Bs.getDefaults(),arguments,["channels"]);super(e),this.name="Merge",this._merger=this.output=this.input=this.context.createChannelMerger(e.channels)}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._merger.disconnect(),this}}class Br extends D{constructor(e){super(e),this.name="StereoEffect",this.input=new Z({context:this.context}),this.input.channelCount=2,this.input.channelCountMode="explicit",this._dryWet=this.output=new Hn({context:this.context,fade:e.wet}),this.wet=this._dryWet.fade,this._split=new Xn({context:this.context,channels:2}),this._merge=new Bs({context:this.context,channels:2}),this.input.connect(this._split),this.input.connect(this._dryWet.a),this._merge.connect(this._dryWet.b),H(this,["wet"])}connectEffectLeft(...e){this._split.connect(e[0],0,0),Pt(...e),He(e[e.length-1],this._merge,0,0)}connectEffectRight(...e){this._split.connect(e[0],1,0),Pt(...e),He(e[e.length-1],this._merge,0,1)}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}dispose(){return super.dispose(),this._dryWet.dispose(),this._split.dispose(),this._merge.dispose(),this}}class jr extends Br{constructor(e){super(e),this.feedback=new te({context:this.context,value:e.feedback,units:"normalRange"}),this._feedbackL=new Z({context:this.context}),this._feedbackR=new Z({context:this.context}),this._feedbackSplit=new Xn({context:this.context,channels:2}),this._feedbackMerge=new Bs({context:this.context,channels:2}),this._merge.connect(this._feedbackSplit),this._feedbackMerge.connect(this._split),this._feedbackSplit.connect(this._feedbackL,0,0),this._feedbackL.connect(this._feedbackMerge,0,0),this._feedbackSplit.connect(this._feedbackR,1,0),this._feedbackR.connect(this._feedbackMerge,0,1),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),H(this,["feedback"])}static getDefaults(){return Object.assign(Br.getDefaults(),{feedback:.5})}dispose(){return super.dispose(),this.feedback.dispose(),this._feedbackL.dispose(),this._feedbackR.dispose(),this._feedbackSplit.dispose(),this._feedbackMerge.dispose(),this}}class tr extends jr{constructor(){const e=R(tr.getDefaults(),arguments,["frequency","delayTime","depth"]);super(e),this.name="Chorus",this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new mn({context:this.context,frequency:e.frequency,min:0,max:1}),this._lfoR=new mn({context:this.context,frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new dn({context:this.context}),this._delayNodeR=new dn({context:this.context}),this.frequency=this._lfoL.frequency,H(this,["frequency"]),this._lfoL.frequency.connect(this._lfoR.frequency),this.connectEffectLeft(this._delayNodeL),this.connectEffectRight(this._delayNodeR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this.depth=this._depth,this.type=e.type,this.spread=e.spread}static getDefaults(){return Object.assign(jr.getDefaults(),{frequency:1.5,delayTime:3.5,depth:.7,type:"sine",spread:180,feedback:0,wet:.5})}get depth(){return this._depth}set depth(e){this._depth=e;const t=this._delayTime*e;this._lfoL.min=Math.max(this._delayTime-t,0),this._lfoL.max=this._delayTime+t,this._lfoR.min=Math.max(this._delayTime-t,0),this._lfoR.max=this._delayTime+t}get delayTime(){return this._delayTime*1e3}set delayTime(e){this._delayTime=e/1e3,this.depth=this._depth}get type(){return this._lfoL.type}set type(e){this._lfoL.type=e,this._lfoR.type=e}get spread(){return this._lfoR.phase-this._lfoL.phase}set spread(e){this._lfoL.phase=90-e/2,this._lfoR.phase=e/2+90}start(e){return this._lfoL.start(e),this._lfoR.start(e),this}stop(e){return this._lfoL.stop(e),this._lfoR.stop(e),this}sync(){return this._lfoL.sync(),this._lfoR.sync(),this}unsync(){return this._lfoL.unsync(),this._lfoR.unsync(),this}dispose(){return super.dispose(),this._lfoL.dispose(),this._lfoR.dispose(),this._delayNodeL.dispose(),this._delayNodeR.dispose(),this.frequency.dispose(),this}}class sr extends Lr{constructor(){const e=R(sr.getDefaults(),arguments,["decay"]);super(e),this.name="Reverb",this._convolver=this.context.createConvolver(),this.ready=Promise.resolve();const t=this.toSeconds(e.decay);Fe(t,.001),this._decay=t;const s=this.toSeconds(e.preDelay);Fe(s,0),this._preDelay=s,this.generate(),this.connectEffect(this._convolver)}static getDefaults(){return Object.assign(Lr.getDefaults(),{decay:1.5,preDelay:.01})}get decay(){return this._decay}set decay(e){e=this.toSeconds(e),Fe(e,.001),this._decay=e,this.generate()}get preDelay(){return this._preDelay}set preDelay(e){e=this.toSeconds(e),Fe(e,0),this._preDelay=e,this.generate()}generate(){return de(this,void 0,void 0,function*(){const e=this.ready,t=new Rn(2,this._decay+this._preDelay,this.context.sampleRate),s=new fn({context:t}),i=new fn({context:t}),r=new Bs({context:t});s.connect(r,0,0),i.connect(r,0,1);const o=new Z({context:t}).toDestination();r.connect(o),s.start(0),i.start(0),o.gain.setValueAtTime(0,0),o.gain.setValueAtTime(1,this._preDelay),o.gain.exponentialApproachValueAtTime(0,this._preDelay,this.decay);const a=t.render();return this.ready=a.then(Q),yield e,this._convolver.buffer=(yield a).get(),this})}dispose(){return super.dispose(),this._convolver.disconnect(),this}}class me extends D{constructor(){const e=R(me.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new Z({context:this.context}),me._allSolos.has(this.context)||me._allSolos.set(this.context,new Set),me._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(D.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),me._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){me._soloed.has(this.context)||me._soloed.set(this.context,new Set),me._soloed.get(this.context).add(this)}_removeSolo(){me._soloed.has(this.context)&&me._soloed.get(this.context).delete(this)}_isSoloed(){return me._soloed.has(this.context)&&me._soloed.get(this.context).has(this)}_noSolos(){return!me._soloed.has(this.context)||me._soloed.has(this.context)&&me._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),me._allSolos.get(this.context).delete(this),this._removeSolo(),this}}me._allSolos=new Map;me._soloed=new Map;class nr extends D{constructor(){const e=R(nr.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new er({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,H(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class Xt extends D{constructor(){const e=R(Xt.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new me({solo:e.solo,context:this.context}),this._panVol=this.output=new nr({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),H(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return Xt.buses.has(e)||Xt.buses.set(e,new Z({context:this.context})),Xt.buses.get(e)}send(e,t=0){const s=this._getBus(e),i=new Z({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(s),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}Xt.buses=new Map;class ir extends D{constructor(){const e=R(ir.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new z({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new z({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new z({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new z({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new z({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),H(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function Zp(){return je().now()}je().transport;je().destination;je().destination;je().listener;je().draw;je();function Qp(){return ee.loaded()}const js=new ir({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),Jp=new Ls({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:n=>{console.warn("Failed to load Rhodes piano sampler:",n)}}).connect(js),Kp=new us(wt,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(js),ef=new sr({decay:4.5,wet:.35}).connect(js),tf=new us(wt,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(ef),sf=new tr({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(js),nf=new us(wt,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(sf),rf=new us(Ji,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(js);function of(n){switch(n){case"organ":return Kp;case"pad-strings":return tf;case"juno-pad":return nf;case"stab":return rf;case"rhodes":default:return Jp}}const af={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab"},cf={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5}};function lf(){return Promise.race([Qp(),new Promise(n=>setTimeout(n,3e3))])}function hf(n,e){const t=e/60;switch(n){case"1/4":return 1/t;case"1/8":return .5/t;case"1/8T":return .5/t*(2/3);case"1/16":return .25/t;default:return .25/t}}function uf(n,e){const t=[];for(let s=0;s<e;s++)for(const i of n){const r=i.match(/^([A-G]#?)(-?\d+)$/);if(r){const o=r[1],a=parseInt(r[2],10)+s;t.push(`${o}${a}`)}else t.push(i)}return t}function df(n,e){const t=[...n];switch(e){case"up":return t;case"down":return[...t].reverse();case"up-down":return[...t,...[...t].reverse().slice(1,-1)];case"random":return t.sort(()=>Math.random()-.5);default:return t}}function pf(n,e=.7,t,s="rhodes"){try{Promise.all([Op(),lf()]).then(()=>{const i=of(s),r=n.length,o=r<=1?1:Math.max(.4,1/Math.sqrt(r)),a=Zp();if(t&&t.arpMode&&t.arpMode!=="off"){const c=t.bpm??80,l=t.arpRate??"1/16",h=t.arpRange??1,u=t.arpMode,p=hf(l,c),f=uf(n,h),d=df(f,u),m=()=>t.minVelocity!==void 0&&t.maxVelocity!==void 0?(t.minVelocity+Math.random()*(t.maxVelocity-t.minVelocity))/127*o:o,g=t.duration?t.duration*(1+(Math.random()-.5)*.1*(t.humanVariance??0)):Math.max(.05,p*.9);d.forEach((_,w)=>{const T=t.microTiming?(Math.random()-.5)*t.microTiming*.02:0;i.triggerAttackRelease(_,g,a+w*p+T,m())});return}n.forEach((c,l)=>{let h=0,u=o,p=e;if(t){const{minVelocity:f,maxVelocity:d,spread:m,microTiming:g,humanVariance:_,duration:w}=t;u=(f+Math.random()*(d-f))/127*o;const A=l*m*.1,y=(Math.random()-.5)*g*.05,x=(Math.random()-.5)*_*.03;h=Math.max(0,A+y+x),p=w*(1+(Math.random()-.5)*.2*_)}i.triggerAttackRelease(c,p,a+h,u)})}).catch(i=>{console.warn("Audio playback gesture failed:",i)})}catch(i){console.warn("Audio playback failed:",i)}}function Ys(n,e,t){const s=af[e]||"rhodes",i=cf[e]||{},r={...i,bpm:t?.bpm??i.bpm??90};pf(n,t?.duration??i.duration??.9,r,s)}const ff=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],mf=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],rr={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},wa=new Set(["F","Bb","Eb","Ab","Db","Gb"]),qr=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ba={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},gf={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Wr={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},_f={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},zr={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},Gr={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},yf={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN"},vf={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR"},Ta={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"]},xf={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function wf(n,e){return 1+n.degrees.filter(t=>e.includes(t)).length*.6}function vn(n,e){const t=n.reduce((i,r)=>i+e(r),0);let s=Math.random()*t;for(const i of n)if(s-=e(i),s<=0)return i;return n[n.length-1]}function bf(n){if(n.length)return n[Math.floor(Math.random()*n.length)]}const Yr=4,Tf={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Js(n,e,t="MAJOR",s="Pop",i="Uplifting"){if(n===e)return .05;let o=(Tf[n]||{})[e]??.1;return(t.includes("MINOR")||t==="DORIAN")&&(n==="TONIC"&&e==="SUBMEDIANT"&&(o*=1.5),n==="SUBMEDIANT"&&e==="MEDIANT"&&(o*=1.4),n==="MEDIANT"&&e==="SUBTONIC"&&(o*=1.4),n==="SUBTONIC"&&e==="TONIC"&&(o*=1.3)),s==="Jazz-ish"||s==="Lo-fi/Chill"?(n==="SUPERTONIC"&&e==="DOMINANT"&&(o*=1.8),n==="DOMINANT"&&e==="TONIC"&&(o*=1.5),n==="TONIC"&&e==="SUPERTONIC"&&(o*=1.4)):(s==="House/Dance"||s==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(o*=1.5),(Ta[i]||[]).includes(e)&&(o*=1.5),Math.max(.01,o)}function Af(n,e,t,s,i,r){let o="TONIC";(n.type.includes("MINOR")||n.type==="DORIAN")&&(r==="Melancholy"||r==="Nostalgic")&&Math.random()<.4&&(o=t.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const a=[o];let c=o;for(let l=1;l<Yr;l++){const h=l===Yr-1;let u=t.filter(d=>n.degrees[d]);u.length||(u=t);const p=u.filter(d=>d!==c),f=p.length?p:u;if(h){const d=vn(f,m=>{const g=Js(m,a[0],n.type,i,r),_=Js(c,m,n.type,i,r);return g*_});a.push(d)}else{const d=f.filter(_=>!a.includes(_)),m=d.length?d:f,g=vn(m,_=>Js(c,_,n.type,i,r));c=g,a.push(g)}}return a}function xn(n,e){const t=(n%12+12)%12;return e?mf[t]:ff[t]}function Aa(n){const e=n[0]?.toUpperCase();let t="C",s=n;e&&/[A-G]/.test(e)&&(n[1]==="B"?(t=`${e}b`,s=n.slice(2)):n[1]==="#"?(t=`${e}#`,s=n.slice(2)):(t=e,s=n.slice(1))),s=s.toLowerCase();let i="maj";return s.includes("maj7")?i="maj7":s.includes("min7")||s.includes("m7")?i="min7":s.includes("dim7")?i="dim7":s.includes("dim")?i="dim":s.includes("aug")?i="aug":s.includes("sus")?i="sus4":s==="7"?i="dom7":s.includes("min")||s==="m"?i="min":i="maj",{root:t,quality:i}}function Nf(n,e){const{root:t,quality:s}=Aa(n),i=rr[t]??0;return ba[s].map(o=>xn(i+o,e))}async function Sf(){let n=await fetch("./chroma_chords_data.json");if(n.ok||(n=await fetch("./chord_voyager_data.json")),!n.ok)throw new Error(`HTTP error: ${n.status}`);const e=await n.json();return Df(e),e}const kf={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Cf={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},If={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Of={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},Ef={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},Mf={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function Df(n){const e=[["MIXOLYDIAN",kf],["DORIAN",Cf],["LYDIAN",If]];for(const[t,s]of e)for(const[i,r]of Object.entries(s)){const o=n.scales[`${r}_MAJOR`];if(!o)continue;const a=`${i}_${t}`,c={};for(const l of Mf[t]){const h=Ef[`${t}_${l}`],u=o.degrees[h];if(!u)continue;const p=JSON.parse(JSON.stringify(u));p.next_chord_options=(p.next_chord_options||[]).map(f=>{if(f.nodeId.startsWith(`${r}_MAJOR_`)){const d=f.nodeId.replace(`${r}_MAJOR_`,""),m=Of[`${t}_${d}`];if(m)return{name:f.name,nodeId:`${i}_${t}_${m}`}}return f}),c[l]=p}n.scales[a]={root:i,type:t,degrees:c}}}function Na(n){const e=Math.max(0,Math.min(1,n)),t=(.42-e*.05).toFixed(2),s=(.11+e*.07).toFixed(2),i=Math.round(Math.max(40,187-e*140));return`oklch(${t} ${s} ${i})`}function Sa(n){return Math.max(.06,Math.min(.2,.08+n*.12))}function Rf(n,e,t){return{Tonic:`As the tonic, ${t} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${t} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${t} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${t} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${t} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${t} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${t} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${t} drifts just below home, a soft modal step rather than a hard pull.`}[n]||`${t} colors the progression as the ${n.toLowerCase()} of ${e}.`}function ms(n,e,t,s){const r=t.degrees[e].chord_name,o=_f[e]??.5,a=zr[t.type]||zr.MAJOR;return{name:Hr(r),tag:gf[e]||"move",roman:a[e]||"?",color:Na(o),grain:Sa(o),functionLabel:Wr[e]||e,notes:Nf(r,s),scaleLabel:`${t.root} ${Gr[t.type]||t.type}`,desc:Rf(Wr[e]||e,Gr[t.type]||t.type,Hr(r)),degree:e,scaleKey:n,tension:o}}function Hr(n){const{root:e,quality:t}=Aa(n);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[t]??""}`}function Xr(n,e,t,s){const i=yf[e]||"MAJOR",r=vf[t],o=s?.scaleType||(r&&i==="MAJOR"?r:i);let a=s?.key&&qr.includes(s.key)?s.key:bf(qr),c=`${a}_${o}`;n.scales[c]||(a="C",c=`${a}_${o}`);const l=n.scales[c],h=wa.has(a)||a.includes("b"),u=Object.keys(l.degrees),p=Ta[t]||[],d=(xf[o]||[]).filter(A=>A.degrees.every(y=>u.includes(y))),_=(d.length&&Math.random()<.25?vn(d,A=>wf(A,p)).degrees:Af(l,c,u,p,e,t)).map(A=>ms(c,A,l,h));let T={Pop:100,Rock:118,Gospel:84,"Indie/Folk":92,"Lo-fi/Chill":76,"Jazz-ish":96,"R&B/Soul":88,"House/Dance":124,Synthwave:108,Cinematic:72}[e]||92;return t==="Tense"&&(T+=6),(t==="Dreamy"||t==="Melancholy")&&(T-=6),{genre:e,mood:t,key:a,scaleType:o,bpm:T,chords:_}}function ei(n,e,t,s,i,r,o){const a=n.filter(h=>e.includes(h)),c=a.filter(h=>h!==t),l=c.length?c:a;if(l.length)return vn(l,h=>Js(s,h,i,r,o))}const $f={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Zr(n,e,t,s,i,r,o){const a=(rr[n]??0)+e,l=`${xn(a,o)}${$f[t]}`,h=ba[t].map(p=>xn(a+p,o)),u=.3;return{name:l,tag:r,roman:i,color:Na(u),grain:Sa(u),functionLabel:s,notes:h,scaleLabel:"Borrowed",desc:`${l} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:u}}function hi(n){const e=n.match(/^[A-Ga-g][#b]?/),t=e?e[0]:"C";return t[0].toUpperCase()+t.slice(1)}const Qr={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function ui(n,e,t,s){const i=rr[n]??0;let r=Qr[e]||Qr.Major;return t==="6th"?r=[...r,9]:t==="7th (dom / m7)"?r=[...r,10]:t==="Major 7th (M7)"?r=[...r,11]:t==="9th"&&(r=[...r,10,14]),r.map(o=>xn(i+o,s))}const Pf={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Vf={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Ff(n,e,t){return e==="Minor"&&t==="Major 7th (M7)"?`${n}m(maj7)`:`${n}${Pf[e]??""}${Vf[t]??""}`}const ka=["C","D","E","F","G","A","B"],Jr=96,or=6,wn=ka.indexOf("E")+4*7,Uf=wn+4*2,di=20,Ca=di+4*or;function Lf(n){let e=4,t=-1;return n.map(s=>{const i=ka.indexOf(s[0].toUpperCase());return t!==-1&&i<=t&&e++,t=i,i+e*7})}function Hs(n){return Ca-(n-wn)*(or/2)}function Bf(n){const e=Lf(n),t=8,s=11,i=Math.min(di,...e.map(Hs)),r=Math.max(Ca,...e.map(Hs)),o=t-i,a=r-i+s+t,c=[0,1,2,3,4].map(f=>di+f*or+o),l=Jr-t*2-s,h=f=>t+(e.length>1?f*l/(e.length-1):l/2),u=e.map((f,d)=>({x:h(d),y:Hs(f)+o-s/2})),p=[];return e.forEach((f,d)=>{(f-wn)%2===0&&(f<wn||f>Uf)&&p.push({x:h(d)-2.5,y:Hs(f)+o})}),{width:Jr,height:a,lines:c,ledgers:p,notes:u}}function jf(n,e,t){const s=hi(n.name),i=s.includes("b");return{...n,name:Ff(s,e,t),notes:ui(s,e,t,i)}}function qf(n,e,t){const s=e.chords[t],i=n.scales[s.scaleKey],r=Object.keys(i.degrees),o=wa.has(e.key)||e.key.includes("b"),a=[],c=(t-1+e.chords.length)%e.chords.length,l=e.chords[c]?.degree||"TONIC",h=e.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",u=`${e.key}_${h}`,p=n.scales[u],f=h==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(p){const w=ei(f,Object.keys(p.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(w){const T=ms(u,w,p,o);a.push({label:"Darker",sub:"heavier, more shadow",chord:T,functionCaption:`Borrowed · ${T.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${h==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const w=h==="NATURAL_MINOR"?Zr(e.key,8,"maj","Submediant","bVI","hold",o):Zr(e.key,5,"maj","Subdominant","IV","lift",o);a.push({label:"Darker",sub:"heavier, more shadow",chord:w,functionCaption:`Borrowed · ${w.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let d=s.scaleKey,m=i;if(e.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const w=`${e.key}_HARMONIC_MINOR`,T=n.scales[w];T?.degrees.DOMINANT&&(d=w,m=T)}const g=ei(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(m.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(g){const w=ms(d,g,m,o);a.push({label:"More tension",sub:"sharper pull forward",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:`Aimed at the ${w.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const _=ei(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree,l,e.scaleType,e.genre,e.mood);if(_){const w=ms(s.scaleKey,_,i,o);a.push({label:"Dreamier",sub:"softer, more air",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const w=ms(s.scaleKey,"TONIC",i,o);a.push({label:"Resolve home",sub:"settles back to center",chord:w,functionCaption:`${w.functionLabel} · ${w.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const Wf={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},zf={m8:43303,circuit:43302};function Gf(n,e){let t=Wf[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(t=`http://localhost:${zf[e]}/`);const s=n.chords.map(i=>encodeURIComponent(i.name)).join("+");return`${t}?p=${s}`}var Yf=Object.defineProperty,Hf=Object.getOwnPropertyDescriptor,ar=(n,e,t,s)=>{for(var i=s>1?void 0:s?Hf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Yf(e,t,i),i};const Xf=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],Zf=[{name:"Uplifting",dot:"oklch(0.55 0.12 165)"},{name:"Melancholy",dot:"oklch(0.42 0.09 245)"},{name:"Dreamy",dot:"oklch(0.60 0.08 205)"},{name:"Tense",dot:"oklch(0.45 0.20 35)"},{name:"Warm",dot:"oklch(0.55 0.15 55)"},{name:"Nostalgic",dot:"oklch(0.50 0.11 20)"}];let As=class extends ot{constructor(){super(...arguments),this.genre="Pop",this.mood="Uplifting"}selectGenre(n){this.dispatchEvent(new CustomEvent("genre-change",{detail:n,bubbles:!0,composed:!0}))}selectMood(n){this.dispatchEvent(new CustomEvent("mood-change",{detail:n,bubbles:!0,composed:!0}))}generate(){this.dispatchEvent(new CustomEvent("generate",{bubbles:!0,composed:!0}))}render(){return B`
      <div class="frame">
        <div class="grain"></div>
        <div class="wordmark">
          <div class="dot"></div>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        <h1>Chords,<br /><em>by feel.</em></h1>
        <div class="subcopy">Pick a genre and a mood. We'll build the progression.</div>

        <div class="label-row">
          <div class="section-label">Genre</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${Xf.map(n=>B`
            <div class="chip ${n===this.genre?"selected":""}" @click=${()=>this.selectGenre(n)}>${n}</div>
          `)}
        </div>

        <div class="label-row mood">
          <div class="section-label">Mood</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${Zf.map(n=>B`
            <div class="chip mood-chip ${n.name===this.mood?"selected":""}" @click=${()=>this.selectMood(n.name)}>
              <div class="mood-dot" style="background:${n.dot}"></div>${n.name}
            </div>
          `)}
        </div>

        <div class="spacer"></div>

        <div class="cta-wrap">
          <div class="cta-shadow"></div>
          <button class="cta" @click=${this.generate}>
            <div class="cta-dice">⚄</div>
            <span>Generate loop →</span>
          </button>
        </div>
        <div class="caption">Nothing here is permanent — swap any chord after.</div>

        <div class="footer">
          <a class="footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
          <span class="footer-divider">·</span>
          <span>Made with ❤️ by warmsynths</span>
          <span class="footer-divider">·</span>
          <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
        </div>
      </div>
    `}};As.styles=Ns`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-paper);
      overflow: hidden;
    }
    .grain {
      position: absolute;
      inset: 0;
      background-image: var(--cv-noise);
      background-size: 120px 120px;
      mix-blend-mode: multiply;
      opacity: 0.035;
      pointer-events: none;
    }
    .frame {
      position: relative;
      max-width: 402px;
      margin: 0 auto;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      padding: 60px 26px 30px;
      box-sizing: border-box;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: cv-dot-cycle 12s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes cv-dot-cycle {
      0%, 20% { background: oklch(0.42 0.11 187); }
      25%, 45% { background: oklch(0.40 0.13 154); }
      50%, 70% { background: oklch(0.40 0.14 131); }
      75%, 95% { background: oklch(0.38 0.16 88); }
      100% { background: oklch(0.42 0.11 187); }
    }
    .wordmark-text {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      letter-spacing: 2px;
      color: var(--cv-ink-55);
      text-transform: uppercase;
    }
    h1 {
      font-family: var(--cv-font-serif);
      font-weight: 600;
      font-size: 42px;
      line-height: 1.1;
      color: var(--cv-ink);
      margin: 28px 0 0;
    }
    h1 em {
      font-style: italic;
      animation: cv-text-cycle 12s ease-in-out infinite;
    }
    @keyframes cv-text-cycle {
      0%, 20% { color: oklch(0.42 0.11 187); }
      25%, 45% { color: oklch(0.40 0.13 154); }
      50%, 70% { color: oklch(0.40 0.14 131); }
      75%, 95% { color: oklch(0.38 0.16 88); }
      100% { color: oklch(0.42 0.11 187); }
    }
    .subcopy {
      font-family: var(--cv-font-body);
      font-size: 15px;
      color: var(--cv-ink-55);
      margin-top: 10px;
      line-height: 1.5;
      max-width: 280px;
    }
    .label-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 32px;
    }
    .label-row.mood {
      margin-top: 26px;
    }
    .section-label {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      letter-spacing: 1.5px;
      color: var(--cv-ink-40);
      text-transform: uppercase;
      font-weight: 700;
      white-space: nowrap;
    }
    .rule {
      flex: 1;
      height: 1px;
      background: var(--cv-ink-16);
    }
    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-top: 12px;
    }
    .chip {
      padding: 13px 20px;
      border-radius: 999px;
      font-family: var(--cv-font-body);
      font-size: 14.5px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all .15s ease;
      background: var(--cv-ink-04);
      color: var(--cv-ink-62);
      border: 1px solid var(--cv-ink-18);
    }
    .chip.selected {
      background: var(--cv-ink);
      color: var(--cv-cream);
      border-color: var(--cv-ink);
    }
    .chip.mood-chip {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 16px 9px 12px;
      border: 1px solid var(--cv-ink-16);
      background: transparent;
    }
    .chip.mood-chip.selected {
      background: var(--cv-ink);
      border-color: var(--cv-ink);
    }
    .mood-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .spacer {
      flex: 1;
    }
    .cta-wrap {
      position: relative;
      height: 60px;
      margin-top: 24px;
    }
    .cta-shadow {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 100%;
      height: 56px;
      background: rgba(32, 26, 19, 0.22);
      border-radius: 8px;
    }
    .cta {
      position: relative;
      width: 100%;
      height: 56px;
      background: var(--cv-ink);
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-family: var(--cv-font-grotesk);
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.3px;
      color: var(--cv-cream);
      cursor: pointer;
    }
    .cta-dice {
      font-size: 18px;
      flex-shrink: 0;
    }
    .caption {
      text-align: center;
      font-family: var(--cv-font-body);
      font-size: 11.5px;
      color: var(--cv-ink-40);
      margin-top: 10px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
      padding-bottom: 2px;
      font-family: var(--cv-font-body);
      font-size: 12px;
      color: rgba(32, 26, 19, 0.38);
      flex-shrink: 0;
    }
    .footer-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: inherit;
      text-decoration: none;
      transition: color .15s ease;
    }
    .footer-link:hover {
      color: var(--cv-accent);
    }
    .footer-divider {
      opacity: 0.6;
    }
  `;ar([ye({type:String})],As.prototype,"genre",2);ar([ye({type:String})],As.prototype,"mood",2);As=ar([ks("seed-screen")],As);var Qf=Object.defineProperty,Jf=Object.getOwnPropertyDescriptor,Re=(n,e,t,s)=>{for(var i=s>1?void 0:s?Jf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Qf(e,t,i),i};const Kf=["C","D","E","F","G","A","B"],em=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],tm=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],sm=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],nm={Darker:{size:22,weight:600},"More tension":{size:27,weight:700},Dreamier:{size:21,weight:500},"Resolve home":{size:19,weight:400}};let Ae=class extends ot{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.variant="sheet",this.visible=!1,this.resetKey=null,this.voicingOpen=!1,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=n=>{this.variant==="sheet"&&(n.preventDefault(),this.dragStartY=n.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0)},this.onGrabberMove=n=>{this.dragging&&(this.dragY=Math.max(0,n.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const n=Math.max(1,performance.now()-this.dragStartTime),e=this.dragY/n,t=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>t*.3||e>.6;this.snapping=!0,s?(this.dragY=t+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(n){n.target===n.currentTarget&&this.close()}toggleVoicing(){this.voicingOpen=!this.voicingOpen}setQuality(n){this.quality=n,this.previewVoicing(),this.commitVoicing()}setExtension(n){this.extension=n,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const n=hi(this.chord.name),e=n.includes("b"),t=ui(n,this.quality,this.extension,e);this.emit("voicing-preview",t)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(n){n.has("resetKey")&&(this.voicingOpen=!1,this.quality="Major",this.extension="None")}render(){const n=this.chord,e=hi(n.name),t=e.includes("b"),s=this.voicingOpen?ui(e,this.quality,this.extension,t):n.notes,i=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return B`
      ${this.variant==="sheet"?B`<div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>`:""}
      <div class="sheet ${this.variant} ${this.visible?"visible":""}" style=${i} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div class="sheet-title">Swap ${n.name}</div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>
        <div class="helper">Choose the feeling you want instead.</div>
        <div class="alt-list">
          ${this.alternatives.map(r=>{const o=nm[r.label]||{size:20,weight:500};return B`
              <div class="alt-row" @click=${()=>this.emit("select-alternative",r)}>
                <div class="alt-label" style="font-size:${o.size}px;font-weight:${o.weight};color:${r.chord.color}">${r.label}</div>
                <div class="alt-sub">${r.sub}</div>
                ${this.showTheory?B`
                  <div class="alt-function">${r.functionCaption}</div>
                  <div class="alt-rationale">${r.rationale}</div>
                `:""}
              </div>
            `})}
        </div>

        ${this.showTheory?B`
          <div class="voicing-section">
            <div class="voicing-toggle" @click=${this.toggleVoicing}>
              <div class="voicing-chevron ${this.voicingOpen?"open":""}">›</div>
              <div class="voicing-label">Adjust voicing</div>
            </div>
            ${this.voicingOpen?B`
              <div>
                <div class="bento">
                  ${tm.map(r=>B`
                    <div class="bento-card ${r.label===this.quality?"selected":""}" @click=${()=>this.setQuality(r.label)}>
                      <div class="bento-label">${r.label}</div>
                      <div class="bento-sub">${r.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="bento ext">
                  ${sm.map((r,o)=>B`
                    <div class="bento-card ${o===0?"span":""} ${r.label===this.extension?"selected":""}" @click=${()=>this.setExtension(r.label)}>
                      <div class="bento-label">${r.label}</div>
                      <div class="bento-sub">${r.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
                <div class="keyboard">
                  ${Kf.map(r=>B`
                    <div class="white-key ${s.includes(r)?"active":""}">${r}</div>
                  `)}
                  ${em.map(r=>B`
                    <div class="black-key ${s.includes(r.note)||s.includes(r.flat)?"active":""}" style="left:${r.left}"></div>
                  `)}
                </div>
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}};Ae.styles=Ns`
    :host {
      display: contents;
    }
    .scrim {
      position: fixed;
      inset: 0;
      background: rgba(32, 26, 19, 0);
      z-index: 40;
      transition: background .28s ease;
    }
    .scrim.visible {
      background: rgba(32, 26, 19, 0.55);
    }
    .sheet {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto;
      max-height: 74%;
      background: var(--cv-paper);
      border-radius: 14px 14px 0 0;
      z-index: 41;
      padding: 14px 22px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--cv-ink-20);
      box-shadow: 0 -2px 0 rgba(32, 26, 19, 0.06);
      transform: translateY(100%);
      transition: transform .32s cubic-bezier(.32,.72,0,1);
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber {
      width: 36px;
      height: 3px;
      background: rgba(32, 26, 19, 0.25);
      align-self: center;
      margin-bottom: 16px;
      flex-shrink: 0;
      border-radius: 2px;
      touch-action: none;
      cursor: grab;
    }
    .sheet.panel {
      position: static;
      height: auto;
      transform: none !important;
      transition: none !important;
      border-radius: 0;
      border: none;
      box-shadow: none;
      padding: 0;
    }
    .sheet.panel .grabber {
      display: none;
    }
    .sheet.panel .sheet-title {
      font-size: 20px;
    }
    .head-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .sheet-title {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 22px;
      color: var(--cv-ink);
    }
    .close-btn {
      font-size: 20px;
      color: var(--cv-ink-40);
      cursor: pointer;
      background: none;
      border: none;
    }
    .helper {
      font-family: var(--cv-font-body);
      font-size: 13px;
      color: var(--cv-ink-45);
      margin-top: 4px;
      margin-bottom: 18px;
      flex-shrink: 0;
    }
    .alt-list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .alt-row {
      padding: 9px 0;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform .2s ease;
    }
    .alt-row:hover {
      transform: translateX(4px);
    }
    .alt-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      letter-spacing: -0.2px;
    }
    .alt-sub {
      font-family: var(--cv-font-body);
      font-size: 12px;
      color: var(--cv-ink-45);
      margin-top: 2px;
    }
    .alt-function {
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      letter-spacing: 0.4px;
      color: var(--cv-accent);
      margin-top: 5px;
      text-transform: uppercase;
      font-weight: 700;
    }
    .alt-rationale {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      line-height: 1.4;
      color: var(--cv-ink-55);
      margin-top: 3px;
      margin-bottom: 2px;
    }
    .voicing-section {
      border-top: 1px solid var(--cv-ink-14);
      margin-top: 14px;
      padding-top: 12px;
      flex-shrink: 0;
    }
    .voicing-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .voicing-chevron {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      color: var(--cv-ink-40);
      transition: transform .2s ease;
      display: inline-block;
    }
    .voicing-chevron.open {
      transform: rotate(90deg);
    }
    .voicing-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13px;
      color: rgba(32, 26, 19, 0.6);
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
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      gap: 6px;
      background: rgba(32, 26, 19, 0.03);
      border: 1px solid var(--cv-ink-12);
    }
    .bento-card.span {
      grid-column: 1 / -1;
    }
    .bento-card.selected {
      background: var(--cv-ink);
      border-color: var(--cv-ink);
    }
    .bento-label {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .bento-card.selected .bento-label {
      color: var(--cv-cream);
    }
    .bento-sub {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 10.5px;
      color: rgba(32, 26, 19, 0.42);
    }
    .bento-card.selected .bento-sub {
      color: rgba(241, 232, 217, 0.6);
    }
    .kb-caption {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 11px;
      color: var(--cv-ink-40);
      margin-top: 10px;
    }
    .keyboard {
      position: relative;
      display: flex;
      margin-top: 6px;
      border: 1px solid var(--cv-ink-18);
      border-radius: 8px;
      overflow: hidden;
    }
    .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      border-right: 1px solid rgba(32, 26, 19, 0.15);
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      font-weight: 600;
      background: var(--cv-key-white);
      color: rgba(32, 26, 19, 0.35);
    }
    .white-key.active {
      background: var(--cv-accent);
      color: #F1E8D9;
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink);
      border-radius: 0 0 3px 3px;
      z-index: 2;
    }
    .black-key.active {
      background: var(--cv-accent);
    }
  `;Re([ye({type:Object})],Ae.prototype,"chord",2);Re([ye({type:Array})],Ae.prototype,"alternatives",2);Re([ye({type:Boolean})],Ae.prototype,"showTheory",2);Re([ye({type:String})],Ae.prototype,"variant",2);Re([ye({type:Boolean})],Ae.prototype,"visible",2);Re([ye({type:Number})],Ae.prototype,"resetKey",2);Re([J()],Ae.prototype,"voicingOpen",2);Re([J()],Ae.prototype,"quality",2);Re([J()],Ae.prototype,"extension",2);Re([J()],Ae.prototype,"dragY",2);Re([J()],Ae.prototype,"dragging",2);Re([J()],Ae.prototype,"snapping",2);Re([vi(".sheet")],Ae.prototype,"sheetEl",2);Ae=Re([ks("swap-sheet")],Ae);var im=Object.defineProperty,rm=Object.getOwnPropertyDescriptor,Ia=(n,e,t,s)=>{for(var i=s>1?void 0:s?rm(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&im(e,t,i),i};const om=lo`
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
`,am=lo`
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
`,cm=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:om},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:am}];let bn=class extends ot{constructor(){super(...arguments),this.visible=!1}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}render(){return B`
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
          ${cm.map(n=>B`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",n)}>
              ${n.svg}
              <div class="dest-name">${n.name}</div>
              <div class="dest-desc">${n.desc}</div>
            </div>
          `)}
        </div>
      </div>
    `}};bn.styles=Ns`
    :host {
      display: block;
    }
    .backdrop {
      position: fixed;
      inset: -2px;
      z-index: 58;
      background: rgba(32, 26, 19, 0);
      transition: background .26s ease, backdrop-filter .26s ease;
    }
    .backdrop.visible {
      background: rgba(32, 26, 19, 0.55);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }
    .modal {
      position: absolute;
      left: 20px;
      right: 20px;
      top: 50%;
      background: var(--cv-paper);
      border-radius: 14px;
      border: 1px solid var(--cv-ink-16);
      box-shadow: 4px 4px 0 rgba(32, 26, 19, 0.15), 0 30px 60px -20px rgba(32, 26, 19, 0.45);
      z-index: 59;
      padding: 22px;
      box-sizing: border-box;
      opacity: 0;
      transform: translateY(calc(-50% + 14px)) scale(0.92);
      transition: opacity .26s cubic-bezier(.16,1,.3,1), transform .3s cubic-bezier(.16,1,.3,1);
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
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 22px;
      color: var(--cv-ink);
    }
    .desc {
      font-family: var(--cv-font-body);
      font-size: 12.5px;
      color: var(--cv-ink-45);
      margin-top: 6px;
      line-height: 1.5;
      max-width: 230px;
    }
    .close-btn {
      font-size: 19px;
      color: var(--cv-ink-40);
      cursor: pointer;
      flex-shrink: 0;
      margin-left: 10px;
      background: transparent;
      border: none;
    }
    .dest-row {
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }
    .dest-card {
      flex: 1;
      background: var(--cv-paper-deep);
      border: 1px solid var(--cv-ink-14);
      border-radius: 12px;
      padding: 12px 10px 14px;
      box-sizing: border-box;
      cursor: pointer;
      box-shadow: 3px 3px 0 rgba(32, 26, 19, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      opacity: 0;
      transform: translateY(8px);
      transition: transform .18s ease, box-shadow .18s ease, opacity .3s ease, transform .3s ease;
    }
    .dest-card:nth-child(2) {
      transition-delay: .06s;
    }
    .dest-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .dest-card:hover {
      transform: translateY(-3px);
      box-shadow: 5px 5px 0 rgba(32, 26, 19, 0.16);
    }
    .dest-name {
      font-family: var(--cv-font-grotesk);
      font-size: 11.5px;
      letter-spacing: 0.4px;
      font-weight: 700;
      color: var(--cv-ink);
      margin-top: 8px;
    }
    .dest-desc {
      font-family: var(--cv-font-body);
      font-size: 11px;
      color: var(--cv-ink-45);
      margin-top: 3px;
      line-height: 1.4;
    }
  `;Ia([ye({type:Boolean})],bn.prototype,"visible",2);bn=Ia([ks("share-modal")],bn);var lm=Object.defineProperty,hm=Object.getOwnPropertyDescriptor,fe=(n,e,t,s)=>{for(var i=s>1?void 0:s?hm(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&lm(e,t,i),i};const Kr=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],eo=["Uplifting","Melancholy","Dreamy","Tense","Warm","Nostalgic"],to=["C","D","E","F","G","A","B"],so=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],no=220,um=280;let ce=class extends ot{constructor(){super(...arguments),this.activeIndex=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.sheetOpen=!1,this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.itemHeight=0,this.cellSize={w:0,h:0},this.onDragMove=n=>{if(this.pressTimer&&!this.drag){(Math.abs(n.clientY-this.pressStartY)>8||Math.abs(n.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:n.clientX-this.pressStartX,offsetY:n.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const{screen:n,pos:e,offsetX:t,offsetY:s}=this.drag;let i=e;if(n==="mobile"){const r=this.itemHeight||1;i=Math.max(0,Math.min(this.order.length-1,e+Math.round(s/r)))}else{const r=this.cellSize.w||1,o=this.cellSize.h||1,a=Math.floor(e/2),c=e%2,l=Math.max(0,Math.min(1,a+Math.round(s/o))),h=Math.max(0,Math.min(1,c+Math.round(t/r)));i=l*2+h}if(this.drag=null,this.pressTapFn=null,i!==e){const r=[...this.order],[o]=r.splice(e,1);r.splice(i,0,o),this.emit("reorder",r)}}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}updated(n){n.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},um)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1},no)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},no)}exportDevice(n,e){this.closeShare();const t=Gf(this.progression,n);window.open(t,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=e,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}chipClass(n,e){return`menu-chip ${e?"selected":""} ${this.menuVisible?"visible":""}`}chipStyle(n){return`transition-delay: ${n*.025}s`}pressStart(n,e,t,s){s.preventDefault(),this.pressTapFn=t,this.pressStartX=s.clientX,this.pressStartY=s.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,n==="mobile"?this.itemHeight=this.stackEl?this.stackEl.offsetHeight/this.order.length:60:this.cellSize={w:this.gridEl?this.gridEl.offsetWidth/2:100,h:this.gridEl?this.gridEl.offsetHeight/2:100},this.drag={screen:n,pos:e,offsetX:0,offsetY:0}},150)}renderChordStaff(n,e){const t=Bf(n.notes);return B`
      <div class="chord-staff" style="top:${e?40:16}px;width:${t.width}px;height:${t.height}px;">
        ${t.lines.map(s=>B`<div class="staff-line" style="top:${s}px;"></div>`)}
        ${t.ledgers.map(s=>B`<div class="staff-ledger" style="left:${s.x}px;top:${s.y}px;"></div>`)}
        ${t.notes.map(s=>B`<div class="staff-note" style="left:${s.x}px;top:${s.y}px;"></div>`)}
      </div>
    `}dragStyleFor(n,e){let t=0,s=0,i="transform .22s cubic-bezier(.2,.8,.2,1)",r=1,o=0,a="none",c=1,l=1;const h=this.drag;if(h&&h.screen===e)if(e==="mobile"){const p=this.itemHeight||1,f=Math.max(0,Math.min(this.order.length-1,h.pos+Math.round(h.offsetY/p)));if(n===h.pos)s=h.offsetY,i="none",r=1.035,o=-.6,a="0 16px 32px rgba(0,0,0,0.35)",c=20;else{const d=h.pos;d<f&&n>d&&n<=f?s=-p:d>f&&n>=f&&n<d&&(s=p),l=.86}}else{const p=this.cellSize.w||1,f=this.cellSize.h||1,d=Math.floor(h.pos/2),m=h.pos%2,g=Math.max(0,Math.min(1,d+Math.round(h.offsetY/f))),_=Math.max(0,Math.min(1,m+Math.round(h.offsetX/p))),w=g*2+_;if(n===h.pos)t=h.offsetX,s=h.offsetY,i="none",r=1.045,o=-.8,a="0 20px 40px rgba(0,0,0,0.38)",c=20;else{const T=[0,1,2,3],[A]=T.splice(h.pos,1);T.splice(w,0,A);const y=T.indexOf(n);if(y!==n){const x=Math.floor(n/2),b=n%2,v=Math.floor(y/2);t=(y%2-b)*p,s=(v-x)*f}l=.86}}const u=h&&h.screen===e&&n===h.pos?"grabbing":"grab";return`transform:translate(${t}px, ${s}px) scale(${r}) rotate(${o}deg);transition:${i};box-shadow:${a};z-index:${c};opacity:${l};touch-action:none;user-select:none;cursor:${u};`}render(){const n=this.progression,e=this.order[this.activeIndex]??0,t=n.chords[e];return B`
      <div class="frame">
        <div class="grain"></div>
        <div class="mobile-view">
        <div class="top-bar">
          <div class="icon-btn" @click=${()=>this.emit("back")}>‹</div>
          <div class="top-label">${n.genre} · ${n.mood}</div>
          <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
        </div>

        ${this.menuMounted?B`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${to.map((s,i)=>B`
                <div class="${this.chipClass(i,s===n.key)}" style=${this.chipStyle(i)} @click=${()=>this.emit("set-key",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${so.map((s,i)=>B`
                <div class="${this.chipClass(i+7,s.value===n.scaleType)}" style=${this.chipStyle(i+7)} @click=${()=>this.emit("set-scale",s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${Kr.map((s,i)=>B`
                <div class="${this.chipClass(i+13,s===n.genre)}" style=${this.chipStyle(i+13)} @click=${()=>this.emit("set-genre",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${eo.map((s,i)=>B`
                <div class="${this.chipClass(i+23,s===n.mood)}" style=${this.chipStyle(i+23)} @click=${()=>this.emit("set-mood",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-share-row" @click=${()=>this.openShare()}>
              <div class="menu-share-label">Share progression</div>
              <div class="menu-share-arrow">↗</div>
            </div>
          </div>
        `:""}

        <div class="theory-toggle">
          <div class="theory-inner" @click=${()=>this.emit("theory-toggle")}>
            <div class="theory-dot" style="background:${this.showTheory?"var(--cv-accent)":"var(--cv-ink-20)"}"></div>
            <div class="theory-text" style="color:${this.showTheory?"rgba(32,26,19,0.65)":"rgba(32,26,19,0.32)"}">show music theory</div>
          </div>
        </div>

        <div class="chord-stack">
          ${this.order.map((s,i)=>{const r=n.chords[s],o=i===this.activeIndex;return B`
              <div
                class="chord-block"
                style="background:${r.color};${this.dragStyleFor(i,"mobile")}"
                @pointerdown=${a=>this.pressStart("mobile",i,()=>this.emit("chord-tap",s),a)}
              >
                <div class="chord-grain" style="opacity:${r.grain}"></div>
                ${o?B`
                  <div class="now-marker">
                    <div class="now-dot"></div>
                    <div class="now-text">now</div>
                  </div>
                `:""}
                ${this.showTheory?this.renderChordStaff(r,o):""}
                <div class="chord-name" style="--amp:${r.tension};${o?`animation: cv-breathe ${2.6-r.tension*1.1}s ease-in-out infinite;`:""}">${r.name}</div>
                <div class="chord-meta">
                  <div class="chord-tag">${r.tag}</div>
                  ${this.showTheory?B`<div class="chord-roman">${r.roman}</div>`:""}
                </div>
              </div>
            `})}
        </div>

        ${this.showTheory?B`
          <div class="theory-panel">
            <div class="theory-row">
              <div class="theory-function">${t.functionLabel}</div>
              <div class="theory-notes">${t.notes.join(" · ")}</div>
              <div class="theory-scale">${t.scaleLabel}</div>
            </div>
            <div class="theory-desc">${t.desc}</div>
          </div>
        `:""}

        <div class="transport">
          <button class="play-btn" @click=${()=>this.emit("toggle-play")}>
            ${this.playing?B`<div class="play-square"></div>`:B`<div class="play-triangle"></div>`}
          </button>
          <div class="transport-label">${n.key.toUpperCase()} ${n.scaleType.replace("_"," ")} · ${n.bpm} BPM</div>
          <div class="dice-icon ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>⚄</div>
        </div>

        ${this.sheetMounted&&this.swapChord?B`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
          ></swap-sheet>
        `:""}
        </div>

        <div class="desktop-view">
          <div class="desktop-sidebar">
            <div class="desktop-wordmark">
              <div class="dot"></div>
              <div class="wordmark-text">Chroma Chords</div>
            </div>

            <div class="desktop-section-label first">Genre</div>
            <div class="menu-chips">
              ${Kr.map(s=>B`
                <div class="menu-chip visible ${s===n.genre?"selected":""}" @click=${()=>this.emit("set-genre",s)}>${s}</div>
              `)}
            </div>

            <div class="desktop-section-label">Mood</div>
            <div class="menu-chips">
              ${eo.map(s=>B`
                <div class="menu-chip visible ${s===n.mood?"selected":""}" @click=${()=>this.emit("set-mood",s)}>${s}</div>
              `)}
            </div>

            <div class="desktop-section-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${to.map(s=>B`
                <div class="menu-chip visible ${s===n.key?"selected":""}" @click=${()=>this.emit("set-key",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${so.map(s=>B`
                <div class="menu-chip visible ${s.value===n.scaleType?"selected":""}" @click=${()=>this.emit("set-scale",s.value)}>${s.label}</div>
              `)}
            </div>

            <div class="theory-toggle" style="justify-content:flex-start;margin-top:30px;">
              <div class="theory-inner" @click=${()=>this.emit("theory-toggle")}>
                <div class="theory-dot" style="background:${this.showTheory?"var(--cv-accent)":"var(--cv-ink-20)"}"></div>
                <div class="theory-text" style="color:${this.showTheory?"rgba(32,26,19,0.65)":"rgba(32,26,19,0.32)"}">show music theory</div>
              </div>
            </div>

            <div class="menu-share-row" style="margin-top:24px;" @click=${()=>this.openShare()}>
              <div class="menu-share-label">Share progression</div>
              <div class="menu-share-arrow">↗</div>
            </div>
          </div>

          <div class="desktop-main">
            <div class="desktop-top">
              <div class="top-label">${n.genre} · ${n.mood}</div>
              <div class="transport-label">${n.key.toUpperCase()} ${n.scaleType.replace("_"," ")} · ${n.bpm} BPM</div>
            </div>

            <div class="desktop-chord-grid">
              ${this.order.map((s,i)=>{const r=n.chords[s],o=i===this.activeIndex;return B`
                  <div
                    class="chord-block"
                    style="background:${r.color};${this.dragStyleFor(i,"desktop")}"
                    @pointerdown=${a=>this.pressStart("desktop",i,()=>this.emit("chord-tap",s),a)}
                  >
                    <div class="chord-grain" style="opacity:${r.grain}"></div>
                    ${o?B`
                      <div class="now-marker">
                        <div class="now-dot"></div>
                        <div class="now-text">now</div>
                      </div>
                    `:""}
                    ${this.showTheory?this.renderChordStaff(r,o):""}
                    <div class="chord-name" style="--amp:${r.tension};${o?`animation: cv-breathe ${2.6-r.tension*1.1}s ease-in-out infinite;`:""}">${r.name}</div>
                    <div class="chord-meta">
                      <div class="chord-tag">${r.tag}</div>
                      ${this.showTheory?B`<div class="chord-roman">${r.roman}</div>`:""}
                    </div>
                  </div>
                `})}
            </div>

            <div class="transport">
              <button class="play-btn" @click=${()=>this.emit("toggle-play")}>
                ${this.playing?B`<div class="play-square"></div>`:B`<div class="play-triangle"></div>`}
              </button>
              <div class="desktop-transport-hint">Click a chord to explore a swap, on the right.</div>
              <div class="dice-icon ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>⚄</div>
            </div>

            <div class="desktop-footer">
              <a class="desktop-footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </a>
              <span class="desktop-footer-divider">·</span>
              <span>Made with ❤️ by warmsynths</span>
              <span class="desktop-footer-divider">·</span>
              <a class="desktop-footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
            </div>
          </div>

          <div class="desktop-swap-panel">
            ${this.sheetOpen&&this.swapChord?B`
              <swap-sheet
                variant="panel"
                .chord=${this.swapChord}
                .alternatives=${this.alternatives}
                .showTheory=${this.showTheory}
                .resetKey=${this.swapIndex}
              ></swap-sheet>
            `:B`
              <div class="desktop-swap-empty">Click a chord to hear it differently.</div>
            `}
          </div>
        </div>

        ${this.shareMounted?B`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${s=>this.exportDevice(s.detail.device,s.detail.name)}
          ></share-modal>
        `:""}

        ${this.toast?B`<div class="toast">Sent to ${this.toast}</div>`:""}
      </div>
    `}};ce.styles=Ns`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-paper);
      overflow: hidden;
    }
    .grain {
      position: absolute;
      inset: 0;
      background-image: var(--cv-noise);
      background-size: 120px 120px;
      mix-blend-mode: multiply;
      opacity: 0.035;
      pointer-events: none;
    }
    .frame {
      position: relative;
      max-width: 402px;
      margin: 0 auto;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      padding: 58px 20px 26px;
      box-sizing: border-box;
    }
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1.5px solid var(--cv-ink-20);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: var(--cv-ink-55);
      cursor: pointer;
      background: transparent;
    }
    .top-label {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      letter-spacing: 1.8px;
      color: var(--cv-ink-45);
      text-transform: uppercase;
      font-weight: 700;
    }
    .theory-toggle {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .theory-inner {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .theory-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      transition: background .2s ease;
    }
    .theory-text {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 11.5px;
      transition: color .2s ease;
    }
    .chord-stack {
      display: flex;
      flex-direction: column;
      gap: 0;
      flex: 1;
      margin-top: 16px;
      min-height: 0;
      border-radius: 14px;
      overflow: hidden;
    }
    .chord-block {
      position: relative;
      overflow: hidden;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
      min-height: 0;
    }
    .chord-grain {
      position: absolute;
      inset: 0;
      background-image: var(--cv-noise);
      background-size: 80px 80px;
      mix-blend-mode: multiply;
      pointer-events: none;
      border-radius: inherit;
    }
    .now-marker {
      position: absolute;
      top: 16px;
      right: 18px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .now-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #F1E8D9;
      animation: cv-pulse 1.6s ease-in-out infinite;
    }
    @keyframes cv-pulse {
      0% { opacity: .45; }
      50% { opacity: 1; }
      100% { opacity: .45; }
    }
    .now-text {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      color: rgba(241, 232, 217, 0.75);
    }
    .chord-name {
      position: relative;
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 32px;
      color: #F1E8D9;
      display: inline-block;
      transform-origin: left center;
    }
    @keyframes cv-breathe {
      0% { transform: scale(1) skewX(0deg); letter-spacing: 0em; }
      50% { transform: scale(calc(1 + 0.05 * var(--amp))) skewX(calc(-3deg * var(--amp))); letter-spacing: calc(-0.012em * var(--amp)); }
      100% { transform: scale(1) skewX(0deg); letter-spacing: 0em; }
    }
    .chord-meta {
      position: relative;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .chord-tag {
      font-family: var(--cv-font-grotesk);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: rgba(241, 232, 217, 0.72);
    }
    .chord-roman {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12.5px;
      color: rgba(241, 232, 217, 0.55);
    }
    .chord-staff {
      position: absolute;
      right: 18px;
      pointer-events: none;
    }
    .staff-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(241, 232, 217, 0.3);
    }
    .staff-ledger {
      position: absolute;
      width: 16px;
      height: 1px;
      background: rgba(241, 232, 217, 0.35);
    }
    .staff-note {
      position: absolute;
      width: 11px;
      height: 8px;
      border-radius: 50%;
      background: #F1E8D9;
      transform: rotate(-14deg);
    }
    .theory-panel {
      padding-top: 18px;
      margin-top: 18px;
      border-top: 1px solid var(--cv-ink-14);
      flex-shrink: 0;
    }
    .theory-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
    }
    .theory-function {
      font-family: var(--cv-font-grotesk);
      font-size: 10.5px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--cv-accent);
    }
    .theory-notes {
      font-family: var(--cv-font-grotesk);
      font-size: 10.5px;
      letter-spacing: 0.4px;
      color: var(--cv-ink-40);
    }
    .theory-scale {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      color: var(--cv-ink-40);
    }
    .theory-desc {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13.5px;
      line-height: 1.5;
      color: rgba(32, 26, 19, 0.68);
      margin-top: 8px;
    }
    .transport {
      height: 62px;
      border-radius: 10px;
      background: var(--cv-paper-deep);
      border: 1px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      margin-top: 18px;
      flex-shrink: 0;
    }
    .play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
    }
    .play-square {
      width: 13px;
      height: 13px;
      background: #F1E8D9;
      border-radius: 2px;
    }
    .play-triangle {
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 11px solid #F1E8D9;
      margin-left: 2px;
    }
    .transport-label {
      font-family: var(--cv-font-grotesk);
      font-size: 12.5px;
      color: var(--cv-ink-55);
      font-weight: 600;
      letter-spacing: 0.4px;
    }
    .dice-icon {
      font-size: 16px;
      color: var(--cv-ink-40);
      cursor: pointer;
      transition: transform .3s ease;
    }
    .dice-icon.spinning {
      transform: rotate(360deg);
    }
    .menu-scrim {
      position: fixed;
      inset: -2px;
      z-index: 48;
      background: rgba(32, 26, 19, 0);
      transition: background .22s ease, backdrop-filter .22s ease;
    }
    .menu-scrim.visible {
      background: rgba(32, 26, 19, 0.06);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    .menu {
      position: absolute;
      top: 96px;
      right: 20px;
      width: 230px;
      background: var(--cv-paper);
      border: 1px solid var(--cv-ink-18);
      border-radius: 10px;
      box-shadow: 4px 4px 0 rgba(32, 26, 19, 0.15), 0 24px 44px -18px rgba(32, 26, 19, 0.4);
      z-index: 49;
      padding: 14px;
      box-sizing: border-box;
      transform-origin: top right;
      opacity: 0;
      transform: translateY(-6px) scale(0.94);
      transition: opacity .22s cubic-bezier(.16,1,.3,1), transform .26s cubic-bezier(.16,1,.3,1);
    }
    .menu.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .menu-label {
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-ink-40);
      font-weight: 700;
    }
    .menu-label.spaced {
      margin-top: 14px;
    }
    .menu-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }
    .menu-chip {
      padding: 5px 10px;
      border-radius: 999px;
      font-family: var(--cv-font-body);
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      background: var(--cv-ink-04);
      color: var(--cv-ink-62);
      border: 1px solid var(--cv-ink-18);
      opacity: 0;
      transform: translateY(5px);
      transition: opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1), background .15s ease, color .15s ease;
    }
    .menu-chip.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .menu-chip.selected {
      background: var(--cv-ink);
      color: var(--cv-cream);
      border-color: var(--cv-ink);
    }
    .menu-share-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--cv-ink-14);
      cursor: pointer;
    }
    .menu-share-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13px;
      color: rgba(32, 26, 19, 0.65);
    }
    .menu-share-arrow {
      font-size: 13px;
      color: var(--cv-ink-40);
    }
    .toast {
      position: absolute;
      left: 50%;
      bottom: 90px;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-family: var(--cv-font-body);
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 999px;
      z-index: 70;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.4);
      animation: cv-toast-in .3s cubic-bezier(.16,1,.3,1);
      white-space: nowrap;
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    .desktop-view {
      display: none;
    }

    /* Below this width the mobile single-column frame (bottom-sheet swap, popover
       settings) is used as-is; above it, a 3-column workspace layout takes over. */
    @media (min-width: 900px) {
      .frame {
        max-width: 1180px;
        min-height: 0;
        padding: 0;
      }
      .mobile-view {
        display: none;
      }
      .desktop-view {
        display: flex;
        min-height: 100dvh;
      }
      .desktop-sidebar {
        position: relative;
        width: 272px;
        flex-shrink: 0;
        border-right: 1px solid var(--cv-ink-14);
        padding: 32px 26px;
        box-sizing: border-box;
        overflow: auto;
      }
      .desktop-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
        padding-bottom: 2px;
        font-family: var(--cv-font-body);
        font-size: 12px;
        color: rgba(32, 26, 19, 0.38);
        flex-shrink: 0;
      }
      .desktop-footer-link {
        display: flex;
        align-items: center;
        gap: 5px;
        color: inherit;
        text-decoration: none;
        transition: color .15s ease;
      }
      .desktop-footer-link:hover {
        color: var(--cv-accent);
      }
      .desktop-footer-divider {
        opacity: 0.6;
      }
      .desktop-wordmark {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .desktop-wordmark .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: cv-dot-cycle 12s ease-in-out infinite;
        flex-shrink: 0;
      }
      @keyframes cv-dot-cycle {
        0%, 20% { background: oklch(0.42 0.11 187); }
        25%, 45% { background: oklch(0.40 0.13 154); }
        50%, 70% { background: oklch(0.40 0.14 131); }
        75%, 95% { background: oklch(0.38 0.16 88); }
        100% { background: oklch(0.42 0.11 187); }
      }
      .desktop-wordmark .wordmark-text {
        font-family: var(--cv-font-grotesk);
        font-size: 12px;
        letter-spacing: 2px;
        color: var(--cv-ink-55);
        text-transform: uppercase;
      }
      .desktop-section-label {
        font-family: var(--cv-font-grotesk);
        font-size: 11px;
        letter-spacing: 1.5px;
        color: var(--cv-ink-40);
        text-transform: uppercase;
        font-weight: 700;
        margin-top: 24px;
      }
      .desktop-section-label.first {
        margin-top: 30px;
      }
      .desktop-main {
        position: relative;
        flex: 1;
        padding: 36px 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .desktop-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .desktop-chord-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0;
        flex: 1;
        margin-top: 24px;
        min-height: 0;
        max-height: 420px;
        border-radius: 14px;
        overflow: hidden;
      }
      .desktop-transport-hint {
        font-family: var(--cv-font-serif);
        font-style: italic;
        font-size: 13px;
        color: rgba(32, 26, 19, 0.5);
      }
      .desktop-swap-panel {
        position: relative;
        width: 340px;
        flex-shrink: 0;
        border-left: 1px solid var(--cv-ink-14);
        padding: 32px 26px;
        box-sizing: border-box;
        overflow: auto;
      }
      .desktop-swap-empty {
        height: 100%;
        display: flex;
        align-items: center;
        font-family: var(--cv-font-serif);
        font-style: italic;
        font-size: 15px;
        line-height: 1.5;
        color: var(--cv-ink-40);
      }
    }
  `;fe([ye({type:Object})],ce.prototype,"progression",2);fe([ye({type:Number})],ce.prototype,"activeIndex",2);fe([ye({type:Array})],ce.prototype,"order",2);fe([ye({type:Boolean})],ce.prototype,"playing",2);fe([ye({type:Boolean})],ce.prototype,"showTheory",2);fe([ye({type:Boolean})],ce.prototype,"sheetOpen",2);fe([ye({type:Object})],ce.prototype,"swapChord",2);fe([ye({type:Number})],ce.prototype,"swapIndex",2);fe([ye({type:Array})],ce.prototype,"alternatives",2);fe([J()],ce.prototype,"menuMounted",2);fe([J()],ce.prototype,"menuVisible",2);fe([J()],ce.prototype,"shareMounted",2);fe([J()],ce.prototype,"shareVisible",2);fe([J()],ce.prototype,"sheetMounted",2);fe([J()],ce.prototype,"sheetVisible",2);fe([J()],ce.prototype,"toast",2);fe([J()],ce.prototype,"spinning",2);fe([J()],ce.prototype,"drag",2);fe([vi(".chord-stack")],ce.prototype,"stackEl",2);fe([vi(".desktop-chord-grid")],ce.prototype,"gridEl",2);ce=fe([ks("loop-screen")],ce);var dm=Object.defineProperty,pm=Object.getOwnPropertyDescriptor,Oe=(n,e,t,s)=>{for(var i=s>1?void 0:s?pm(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&dm(e,t,i),i};let we=class extends ot{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Uplifting",this.progression=null,this.activeIndex=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!0,this.showTheory=!1,this.sheetOpen=!1,this.swapIndex=null,this.alternatives=[],this.currentProjectId=null,this.autoplayTimer=null,this.AUTHORIZED_HASHES=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"],this.driveService=new rc,this.tokenClient=null,this.isAuthenticated=!1,this.isDriveSyncing=!1}async firstUpdated(){this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";try{this.chordData=await Sf()}catch(n){console.error("Failed to load chord data:",n)}}disconnectedCallback(){super.disconnectedCallback(),this.stopAutoplay()}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{!this.progression||!this.playing||(this.activeIndex=(this.activeIndex+1)%this.order.length,this.playActiveChord())},1700)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}playActiveChord(){if(!this.progression)return;const n=this.order[this.activeIndex]??0,e=this.progression.chords[n];Ys(e.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm})}onGenreChange(n){this.genre=n.detail}onMoodChange(n){this.mood=n.detail}onGenerate(){this.keyOverride=null,this.scaleOverride=null;const n=Xr(this.chordData,this.genre,this.mood);this.progression=n,this.order=[0,1,2,3],this.activeIndex=0,this.playing=!1,this.screen="loop",this.saveProject()}regenerate(){const n=Xr(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0});this.progression=n,this.order=[0,1,2,3],this.activeIndex=0,this.saveProject(),this.playing&&(this.startAutoplay(),this.playActiveChord())}onSetKey(n){this.keyOverride=n.detail,this.regenerate()}onSetScale(n){this.scaleOverride=n.detail,this.regenerate()}onSetGenre(n){this.genre=n.detail,this.regenerate()}onSetMood(n){this.mood=n.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(n){if(!this.progression)return;const e=this.order[this.activeIndex];this.order=n.detail;const t=this.order.indexOf(e);this.activeIndex=t>=0?t:0,this.saveProject()}onBack(){this.stopAutoplay(),this.screen="seed",this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onTogglePlay(){this.playing?(this.playing=!1,this.activeIndex=0,this.stopAutoplay()):(this.playing=!0,this.activeIndex=0,this.startAutoplay(),this.playActiveChord())}onChordTap(n){this.progression&&(this.swapIndex=n.detail,this.alternatives=qf(this.chordData,this.progression,n.detail),this.sheetOpen=!0,Ys(this.progression.chords[n.detail].notes.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8}))}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=n.detail.chord,this.progression={...this.progression,chords:e},this.sheetOpen=!1,this.swapIndex=null,this.saveProject(),Ys(n.detail.chord.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8})}onVoicingPreview(n){this.progression&&Ys(n.detail.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.6})}onVoicingChange(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=jf(e[this.swapIndex],n.detail.quality,n.detail.extension),this.progression={...this.progression,chords:e},this.saveProject()}saveProject(){if(!this.progression)return;const n=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=n;const e={id:n,name:`${this.progression.genre} · ${this.progression.mood}`,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};qt.saveProject(e),this.syncProjectsToCloud()}initSilentAuth(){const n=localStorage.getItem("chroma-chords-auth")||localStorage.getItem("chord-voyager-auth");n&&this.hashEmail(n).then(e=>{this.AUTHORIZED_HASHES.includes(e)&&(this.isAuthenticated=!0,this.setupGoogleAuth())})}setupGoogleAuth(){const n=setInterval(()=>{if(window.google){clearInterval(n),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async e=>{if(!(!e||!e.access_token))try{const t=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${e.access_token}`}});if(!t.ok)return;const s=await t.json();if(!s?.email)return;const i=await this.hashEmail(s.email);if(!this.AUTHORIZED_HASHES.includes(i))return;this.isAuthenticated=!0,localStorage.setItem("chroma-chords-auth",s.email),this.driveService.setAccessToken(e.access_token),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(t){console.error("Silent Drive auth failed",t)}}});try{this.tokenClient.requestAccessToken({prompt:""})}catch(e){console.error("Failed to request Drive access silently",e)}}},200)}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const n=await this.driveService.loadProjects();if(n){n.forEach(s=>s.syncedToCloud=!0);const e=qt.getProjects(),t=qt.mergeProjects(e,n);qt.setProjects(t)}}catch(n){console.error("Failed to sync from cloud",n)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!(!this.isAuthenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const n=qt.getProjects();await this.driveService.saveProjects(n),n.forEach(e=>e.syncedToCloud=!0),qt.setProjects(n)}catch(n){console.error("Failed to sync to cloud",n)}finally{this.isDriveSyncing=!1}}}async hashEmail(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(s)).map(r=>r.toString(16).padStart(2,"0")).join("")}render(){if(this.screen==="seed"||!this.progression)return B`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @generate=${this.onGenerate}
        ></seed-screen>
      `;const n=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;return B`
      <loop-screen
        .progression=${this.progression}
        .activeIndex=${this.activeIndex}
        .order=${this.order}
        .playing=${this.playing}
        .showTheory=${this.showTheory}
        .sheetOpen=${this.sheetOpen}
        .swapChord=${n}
        .swapIndex=${this.swapIndex}
        .alternatives=${this.alternatives}
        @back=${this.onBack}
        @theory-toggle=${this.onTheoryToggle}
        @toggle-play=${this.onTogglePlay}
        @chord-tap=${this.onChordTap}
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
      ></loop-screen>
    `}};we.styles=Ns`
    :host {
      display: block;
      min-height: 100dvh;
    }
  `;Oe([J()],we.prototype,"chordData",2);Oe([J()],we.prototype,"screen",2);Oe([J()],we.prototype,"genre",2);Oe([J()],we.prototype,"mood",2);Oe([J()],we.prototype,"progression",2);Oe([J()],we.prototype,"activeIndex",2);Oe([J()],we.prototype,"order",2);Oe([J()],we.prototype,"keyOverride",2);Oe([J()],we.prototype,"scaleOverride",2);Oe([J()],we.prototype,"playing",2);Oe([J()],we.prototype,"showTheory",2);Oe([J()],we.prototype,"sheetOpen",2);Oe([J()],we.prototype,"swapIndex",2);Oe([J()],we.prototype,"alternatives",2);we=Oe([ks("chroma-chords-app")],we);
