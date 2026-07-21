(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hs=globalThis,ci=Hs.ShadowRoot&&(Hs.ShadyCSS===void 0||Hs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,li=Symbol(),sr=new WeakMap;let Qr=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==li)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ci&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=sr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&sr.set(t,e))}return e}toString(){return this.cssText}};const ka=n=>new Qr(typeof n=="string"?n:n+"",void 0,li),As=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Qr(t,n,li)},Na=(n,e)=>{if(ci)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=Hs.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},nr=ci?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ka(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Sa,defineProperty:Ca,getOwnPropertyDescriptor:Ia,getOwnPropertyNames:Oa,getOwnPropertySymbols:Ea,getPrototypeOf:Ma}=Object,vn=globalThis,ir=vn.trustedTypes,Da=ir?ir.emptyScript:"",Ra=vn.reactiveElementPolyfillSupport,ms=(n,e)=>n,Qs={toAttribute(n,e){switch(e){case Boolean:n=n?Da:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},hi=(n,e)=>!Sa(n,e),rr={attribute:!0,type:String,converter:Qs,reflect:!1,useDefault:!1,hasChanged:hi};Symbol.metadata??=Symbol("metadata"),vn.litPropertyMetadata??=new WeakMap;let zt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=rr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Ca(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=Ia(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??rr}static _$Ei(){if(this.hasOwnProperty(ms("elementProperties")))return;const e=Ma(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ms("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ms("properties"))){const t=this.properties,s=[...Oa(t),...Ea(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(nr(i))}else e!==void 0&&t.push(nr(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Na(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:Qs).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Qs;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??hi)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,r]of s){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};zt.elementStyles=[],zt.shadowRootOptions={mode:"open"},zt[ms("elementProperties")]=new Map,zt[ms("finalized")]=new Map,Ra?.({ReactiveElement:zt}),(vn.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ui=globalThis,or=n=>n,Js=ui.trustedTypes,ar=Js?Js.createPolicy("lit-html",{createHTML:n=>n}):void 0,Jr="$lit$",_t=`lit$${Math.random().toFixed(9).slice(2)}$`,Kr="?"+_t,$a=`<${Kr}>`,Dt=document,_s=()=>Dt.createComment(""),ys=n=>n===null||typeof n!="object"&&typeof n!="function",di=Array.isArray,Pa=n=>di(n)||typeof n?.[Symbol.iterator]=="function",Yn=`[ 	
\f\r]`,ps=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cr=/-->/g,lr=/>/g,Nt=RegExp(`>|${Yn}(?:([^\\s"'>=/]+)(${Yn}*=${Yn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hr=/'/g,ur=/"/g,eo=/^(?:script|style|textarea|title)$/i,to=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),q=to(1),so=to(2),Qt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),dr=new WeakMap,St=Dt.createTreeWalker(Dt,129);function no(n,e){if(!di(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ar!==void 0?ar.createHTML(e):e}const Va=(n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=ps;for(let a=0;a<t;a++){const c=n[a];let l,h,u=-1,d=0;for(;d<c.length&&(o.lastIndex=d,h=o.exec(c),h!==null);)d=o.lastIndex,o===ps?h[1]==="!--"?o=cr:h[1]!==void 0?o=lr:h[2]!==void 0?(eo.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=Nt):h[3]!==void 0&&(o=Nt):o===Nt?h[0]===">"?(o=i??ps,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?Nt:h[3]==='"'?ur:hr):o===ur||o===hr?o=Nt:o===cr||o===lr?o=ps:(o=Nt,i=void 0);const p=o===Nt&&n[a+1].startsWith("/>")?" ":"";r+=o===ps?c+$a:u>=0?(s.push(l),c.slice(0,u)+Jr+c.slice(u)+_t+p):c+_t+(u===-2?a:p)}return[no(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class vs{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,h]=Va(e,t);if(this.el=vs.createElement(l,s),St.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=St.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Jr)){const d=h[o++],p=i.getAttribute(u).split(_t),f=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:f[2],strings:p,ctor:f[1]==="."?La:f[1]==="?"?Ua:f[1]==="@"?Ba:xn}),i.removeAttribute(u)}else u.startsWith(_t)&&(c.push({type:6,index:r}),i.removeAttribute(u));if(eo.test(i.tagName)){const u=i.textContent.split(_t),d=u.length-1;if(d>0){i.textContent=Js?Js.emptyScript:"";for(let p=0;p<d;p++)i.append(u[p],_s()),St.nextNode(),c.push({type:2,index:++r});i.append(u[d],_s())}}}else if(i.nodeType===8)if(i.data===Kr)c.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(_t,u+1))!==-1;)c.push({type:7,index:r}),u+=_t.length-1}r++}}static createElement(e,t){const s=Dt.createElement("template");return s.innerHTML=e,s}}function Jt(n,e,t=n,s){if(e===Qt)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl;const r=ys(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=Jt(n,i._$AS(n,e.values),i,s)),e}class Fa{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??Dt).importNode(t,!0);St.currentNode=i;let r=St.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new ks(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new ja(r,this,e)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=St.nextNode(),o++)}return St.currentNode=Dt,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ks{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Jt(this,e,t),ys(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==Qt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Pa(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&ys(this._$AH)?this._$AA.nextSibling.data=e:this.T(Dt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=vs.createElement(no(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new Fa(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=dr.get(e.strings);return t===void 0&&dr.set(e.strings,t=new vs(e)),t}k(e){di(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new ks(this.O(_s()),this.O(_s()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=or(e).nextSibling;or(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class xn{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ve}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=Jt(this,e,t,0),o=!ys(e)||e!==this._$AH&&e!==Qt,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=Jt(this,a[s+c],t,c),l===Qt&&(l=this._$AH[c]),o||=!ys(l)||l!==this._$AH[c],l===ve?e=ve:e!==ve&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class La extends xn{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}}class Ua extends xn{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}}class Ba extends xn{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=Jt(this,e,t,0)??ve)===Qt)return;const s=this._$AH,i=e===ve&&s!==ve||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==ve&&(s===ve||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ja{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Jt(this,e)}}const qa=ui.litHtmlPolyfillSupport;qa?.(vs,ks),(ui.litHtmlVersions??=[]).push("3.3.3");const Wa=(n,e,t)=>{const s=t?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const r=t?.renderBefore??null;s._$litPart$=i=new ks(e.insertBefore(_s(),r),r,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pi=globalThis;class ot extends zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Wa(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qt}}ot._$litElement$=!0,ot.finalized=!0,pi.litElementHydrateSupport?.({LitElement:ot});const za=pi.litElementPolyfillSupport;za?.({LitElement:ot});(pi.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ns=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ga={attribute:!0,type:String,converter:Qs,reflect:!1,hasChanged:hi},Ya=(n=Ga,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),s==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(s==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+s)};function ye(n){return(e,t)=>typeof t=="object"?Ya(n,e,t):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function J(n){return ye({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ha=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function fi(n,e){return(t,s,i)=>{const r=o=>o.renderRoot?.querySelector(n)??null;return Ha(t,s,{get(){return r(this)}})}}const js="chord_voyager_projects";class qt{static getProjects(){try{const e=localStorage.getItem(js);if(e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(js,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const s=new Map;return e.forEach(i=>s.set(i.id,i)),t.forEach(i=>{const r=s.get(i.id);!r||i.lastModified>r.lastModified?s.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(e){const t=this.getProjects(),s=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),s>=0?t[s]=e:t.push(e);try{localStorage.setItem(js,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(s=>s.id!==e);try{localStorage.setItem(js,JSON.stringify(t))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chord_voyager.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,s)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},i.onerror=()=>s(new Error("Failed to read file")),i.readAsText(e)})}}class Xa{constructor(){this.accessToken=null,this.FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const s=await t.json();return s.files&&s.files.length>0?s.files[0].id:null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),s=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}async findAudioFileId(e){try{const t=`recording_${e}.webm`,s=encodeURIComponent(`name='${t}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const r=await i.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(t){throw console.error(`Failed to find audio file for project ${e}:`,t),t}}async uploadAudioFile(e,t){try{const s=`recording_${e}.webm`,i=await this.findAudioFileId(e);if(i){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return i}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const a=(await r.json()).id,c=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!c.ok)throw new Error(`Failed to upload new audio file content: ${c.statusText}`);return a}}catch(s){throw console.error(`Failed to upload audio file for project ${e}:`,s),s}}async downloadAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(t){throw console.error(`Failed to download audio file for project ${e}:`,t),t}}async deleteAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(t){throw console.error(`Failed to delete audio file for project ${e}:`,t),t}}}const io="15.1.22",pr=(n,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:n}),fr=(n,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:n}),Qn=(n,e)=>({startTime:e,type:"setValue",value:n}),ro=(n,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:n}),oo=(n,e,{startTime:t,target:s,timeConstant:i})=>s+(e-s)*Math.exp((t-n)/i),Yt=n=>n.type==="exponentialRampToValue",Ks=n=>n.type==="linearRampToValue",gt=n=>Yt(n)||Ks(n),mi=n=>n.type==="setValue",rt=n=>n.type==="setValueCurve",en=(n,e,t,s)=>{const i=n[e];return i===void 0?s:gt(i)||mi(i)?i.value:rt(i)?i.values[i.values.length-1]:oo(t,en(n,e-1,i.startTime,s),i)},mr=(n,e,t,s,i)=>t===void 0?[s.insertTime,i]:gt(t)?[t.endTime,t.value]:mi(t)?[t.startTime,t.value]:rt(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,en(n,e-1,t.startTime,i)],Jn=n=>n.type==="cancelAndHold",Kn=n=>n.type==="cancelScheduledValues",mt=n=>Jn(n)||Kn(n)?n.cancelTime:Yt(n)||Ks(n)?n.endTime:n.startTime,gr=(n,e,t,{endTime:s,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((n-e)/(s-e)):n<s?t:i,_r=(n,e,t,{endTime:s,value:i})=>t+(n-e)/(s-e)*(i-t),ao=(n,e)=>{const t=Math.floor(e);if(t===e)return n[t];const s=Math.ceil(e);return(1-(e-t))*n[t]+(1-(s-e))*n[s]},Za=(n,{duration:e,startTime:t,values:s})=>{const i=(n-t)/e*(s.length-1);return ao(s,i)},Qa=(n,e,t)=>{const s=n.length,i=Math.max(1,Math.floor(t/e*s))+1,r=n instanceof Float32Array?new Float32Array(i):n.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(s-1);r[o]=ao(n,c)}return r},qs=n=>n.type==="setTarget";class Ja{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=mt(e);if(Jn(e)||Kn(e)){const s=this._automationEvents.findIndex(r=>Kn(e)&&rt(r)?r.startTime+r.duration>=t:mt(r)>=t),i=this._automationEvents[s];if(s!==-1&&(this._automationEvents=this._automationEvents.slice(0,s)),Jn(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&gt(i)){if(r!==void 0&&qs(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:rt(r)?r.startTime+r.duration:mt(r),a=r===void 0?this._defaultValue:rt(r)?r.values[r.values.length-1]:r.value,c=Yt(i)?gr(t,o,a,i):_r(t,o,a,i),l=Yt(i)?pr(c,t,this._currenTime):fr(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&qs(r)&&this._automationEvents.push(Qn(this.getValue(t),t)),r!==void 0&&rt(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=ro(Qa(r.values,r.duration,o),r.startTime,o)}}}else{const s=this._automationEvents.findIndex(o=>mt(o)>t),i=s===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[s-1];if(i!==void 0&&rt(i)&&mt(i)+i.duration>t)return!1;const r=Yt(e)?pr(e.value,e.endTime,this._currenTime):Ks(e)?fr(e.value,t,this._currenTime):e;if(s===-1)this._automationEvents.push(r);else{if(rt(e)&&t+e.duration>mt(this._automationEvents[s]))return!1;this._automationEvents.splice(s,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(s=>mt(s)>e);if(t>1){const s=this._automationEvents.slice(t-1),i=s[0];qs(i)&&s.unshift(Qn(en(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=s}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>mt(o)>e),s=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&qs(r)&&(s===void 0||!gt(s)||s.insertTime>e))return oo(e,en(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&mi(r)&&(s===void 0||!gt(s)))return r.value;if(r!==void 0&&rt(r)&&(s===void 0||!gt(s)||r.startTime+r.duration>e))return e<r.startTime+r.duration?Za(e,r):r.values[r.values.length-1];if(r!==void 0&&gt(r)&&(s===void 0||!gt(s)))return r.value;if(s!==void 0&&Yt(s)){const[o,a]=mr(this._automationEvents,i,r,s,this._defaultValue);return gr(e,o,a,s)}if(s!==void 0&&Ks(s)){const[o,a]=mr(this._automationEvents,i,r,s,this._defaultValue);return _r(e,o,a,s)}return this._defaultValue}}const Ka=n=>({cancelTime:n,type:"cancelAndHold"}),ec=n=>({cancelTime:n,type:"cancelScheduledValues"}),tc=(n,e)=>({endTime:e,type:"exponentialRampToValue",value:n}),sc=(n,e)=>({endTime:e,type:"linearRampToValue",value:n}),nc=(n,e,t)=>({startTime:e,target:n,timeConstant:t,type:"setTarget"}),ic=()=>new DOMException("","AbortError"),rc=n=>(e,t,[s,i,r],o)=>{n(e[i],[t,s,r],a=>a[0]===t&&a[1]===s,o)},oc=n=>(e,t,s)=>{const i=[];for(let r=0;r<s.numberOfInputs;r+=1)i.push(new Set);n.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},ac=n=>(e,t)=>{n.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},Kt=new WeakSet,co=new WeakMap,gi=new WeakMap,lo=new WeakMap,_i=new WeakMap,wn=new WeakMap,ho=new WeakMap,ei=new WeakMap,ti=new WeakMap,si=new WeakMap,uo={construct(){return uo}},cc=n=>{try{const e=new Proxy(n,uo);new e}catch{return!1}return!0},yr=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,vr=(n,e)=>{const t=[];let s=n.replace(/^[\s]+/,""),i=s.match(yr);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),s=s.slice(i[0].length).replace(/^[\s]+/,""),i=s.match(yr)}return[t.join(";"),s]},xr=n=>{if(n!==void 0&&!Array.isArray(n))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},wr=n=>{if(!cc(n))throw new TypeError("The given value for processorCtor should be a constructor.");if(n.prototype===null||typeof n.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},lc=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>{let p=0;return(f,g,m={credentials:"omit"})=>{const _=h.get(f);if(_!==void 0&&_.has(g))return Promise.resolve();const b=l.get(f);if(b!==void 0){const y=b.get(g);if(y!==void 0)return y}const T=r(f),k=T.audioWorklet===void 0?i(g).then(([y,x])=>{const[w,v]=vr(y,x),C=`${w};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${v}
})})(window,'_AWGS')`;return t(C)}).then(()=>{const y=d._AWGS.pop();if(y===void 0)throw new SyntaxError;s(T.currentTime,T.sampleRate,()=>y(class{},void 0,(x,w)=>{if(x.trim()==="")throw e();const v=ti.get(T);if(v!==void 0){if(v.has(x))throw e();wr(w),xr(w.parameterDescriptors),v.set(x,w)}else wr(w),xr(w.parameterDescriptors),ti.set(T,new Map([[x,w]]))},T.sampleRate,void 0,void 0))}):Promise.all([i(g),Promise.resolve(n(u,u))]).then(([[y,x],w])=>{const v=p+1;p=v;const[C,S]=vr(y,x),O=`${C};((AudioWorkletProcessor,registerProcessor)=>{${S}
})(${w?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${w?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${w?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${v}',class extends AudioWorkletProcessor{process(){return !1}})`,V=new Blob([O],{type:"application/javascript; charset=utf-8"}),M=URL.createObjectURL(V);return T.audioWorklet.addModule(M,m).then(()=>{if(a(T))return T;const $=o(T);return $.audioWorklet.addModule(M,m).then(()=>$)}).then($=>{if(c===null)throw new SyntaxError;try{new c($,`__sac${v}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(M))});return b===void 0?l.set(f,new Map([[g,k]])):b.set(g,k),k.then(()=>{const y=h.get(f);y===void 0?h.set(f,new Set([g])):y.add(g)}).finally(()=>{const y=l.get(f);y!==void 0&&y.delete(g)}),k}},Ye=(n,e)=>{const t=n.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},bn=(n,e)=>{const t=Array.from(n).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[s]=t;return n.delete(s),s},po=(n,e,t,s)=>{const i=Ye(n,e),r=bn(i,o=>o[0]===t&&o[1]===s);return i.size===0&&n.delete(e),r},Ss=n=>Ye(ho,n),es=n=>{if(Kt.has(n))throw new Error("The AudioNode is already stored.");Kt.add(n),Ss(n).forEach(e=>e(!0))},fo=n=>"port"in n,Cs=n=>{if(!Kt.has(n))throw new Error("The AudioNode is not stored.");Kt.delete(n),Ss(n).forEach(e=>e(!1))},ni=(n,e)=>{!fo(n)&&e.every(t=>t.size===0)&&Cs(n)},hc=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>{const p=new WeakMap;return(f,g,m,_,b)=>{const{activeInputs:T,passiveInputs:k}=r(g),{outputs:y}=r(f),x=a(f),w=v=>{const C=c(g),S=c(f);if(v){const N=po(k,f,m,_);n(T,f,N,!1),!b&&!u(f)&&t(S,C,m,_),d(g)&&es(g)}else{const N=s(T,f,m,_);e(k,_,N,!1),!b&&!u(f)&&i(S,C,m,_);const A=o(g);if(A===0)h(g)&&ni(g,T);else{const E=p.get(g);E!==void 0&&clearTimeout(E),p.set(g,setTimeout(()=>{h(g)&&ni(g,T)},A*1e3))}}};return l(y,[g,m,_],v=>v[0]===g&&v[1]===m&&v[2]===_,!0)?(x.add(w),h(f)?n(T,f,[m,_,w],!0):e(k,_,[f,m,w],!0),!0):!1}},uc=n=>(e,t,[s,i,r],o)=>{const a=e.get(s);a===void 0?e.set(s,new Set([[i,t,r]])):n(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},dc=n=>(e,t)=>{const s=n(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(s).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(s),s.disconnect()};t.addEventListener("ended",i)},pc=n=>(e,t)=>{n(e).add(t)},fc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},mc=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...fc,...c},u=s(l,h),d=r(l)?e():null;super(a,!1,u,d),this._nativeAnalyserNode=u}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},ke=(n,e)=>n.context===e,gc=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!ke(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},tn=n=>{try{n.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},tt=()=>new DOMException("","IndexSizeError"),yi=n=>{n.getChannelData=(e=>t=>{try{return e.call(n,t)}catch(s){throw s.code===12?tt():s}})(n.getChannelData)},_c={numberOfChannels:1},yc=(n,e,t,s,i,r,o,a)=>{let c=null;return class mo{constructor(h){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:u,numberOfChannels:d,sampleRate:p}={..._c,...h};c===null&&(c=new i(1,1,44100));const f=s!==null&&e(r,r)?new s({length:u,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,u,p);if(f.numberOfChannels===0)throw t();return typeof f.copyFromChannel!="function"?(o(f),yi(f)):e(tn,()=>tn(f))||a(f),n.add(f),f}static[Symbol.hasInstance](h){return h!==null&&typeof h=="object"&&Object.getPrototypeOf(h)===mo.prototype||n.has(h)}}},Ee=-34028234663852886e22,Se=-Ee,at=n=>Kt.has(n),vc={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},xc=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...vc,...h},p=i(u,d),f=o(u),g=f?e():null;super(l,!1,p,g),this._audioBufferSourceNodeRenderer=g,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,f,p.playbackRate,Se,Ee)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw s();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const h=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=h;const u=this._nativeAudioBufferSourceNode.onended;this._onended=u!==null&&u===h?l:u}get playbackRate(){return this._playbackRate}start(l=0,h=0,u){if(this._nativeAudioBufferSourceNode.start(l,h,u),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=u===void 0?[l,h]:[l,h,u]),this.context.state!=="closed"){es(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),at(this)&&Cs(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},wc=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=ke(u,h);if(!d){const p={buffer:u.buffer,channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,loop:u.loop,loopEnd:u.loopEnd,loopStart:u.loopStart,playbackRate:u.playbackRate.value};u=e(h,p),o!==null&&u.start(...o),a!==null&&u.stop(a)}return r.set(h,u),d?await n(h,l.playbackRate,u.playbackRate):await s(h,l.playbackRate,u.playbackRate),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},bc=n=>"playbackRate"in n,Tc=n=>"frequency"in n&&"gain"in n,Ac=n=>"offset"in n,kc=n=>!("frequency"in n)&&"gain"in n,Nc=n=>"detune"in n&&"frequency"in n&&!("gain"in n),Sc=n=>"pan"in n,Ce=n=>Ye(co,n),Is=n=>Ye(lo,n),ii=(n,e)=>{const{activeInputs:t}=Ce(n);t.forEach(i=>i.forEach(([r])=>{e.includes(n)||ii(r,[...e,n])}));const s=bc(n)?[n.playbackRate]:fo(n)?Array.from(n.parameters.values()):Tc(n)?[n.Q,n.detune,n.frequency,n.gain]:Ac(n)?[n.offset]:kc(n)?[n.gain]:Nc(n)?[n.detune,n.frequency]:Sc(n)?[n.pan]:[];for(const i of s){const r=Is(i);r!==void 0&&r.activeInputs.forEach(([o])=>ii(o,e))}at(n)&&Cs(n)},go=n=>{ii(n.destination,[])},Cc=n=>n===void 0||typeof n=="number"||typeof n=="string"&&(n==="balanced"||n==="interactive"||n==="playback"),Ic=(n,e,t,s,i,r,o,a,c)=>class extends n{constructor(h={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let u;try{u=new c(h)}catch(f){throw f.code===12&&f.message==="sampleRate is not in range"?t():f}if(u===null)throw s();if(!Cc(h.latencyHint))throw new TypeError(`The provided value '${h.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(h.sampleRate!==void 0&&u.sampleRate!==h.sampleRate)throw t();super(u,2);const{latencyHint:d}=h,{sampleRate:p}=u;if(this._baseLatency=typeof u.baseLatency=="number"?u.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=u,c.name==="webkitAudioContext"?(this._nativeGainNode=u.createGain(),this._nativeOscillatorNode=u.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(u.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,u.state==="running"){this._state="suspended";const f=()=>{this._state==="suspended"&&(this._state=null),u.removeEventListener("statechange",f)};u.addEventListener("statechange",f)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),go(this)}))}createMediaElementSource(h){return new i(this,{mediaElement:h})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(h){return new o(this,{mediaStream:h})}createMediaStreamTrackSource(h){return new a(this,{mediaStreamTrack:h})}resume(){return this._state==="suspended"?new Promise((h,u)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?h():this.resume().then(h,u)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(h=>{throw h===void 0||h.code===15?e():h})}suspend(){return this._nativeAudioContext.suspend().catch(h=>{throw h===void 0?e():h})}},Oc=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d=o(u),p=i(u,h,d),f=d?e(a):null;super(l,!1,p,f),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Ec=n=>{const e=new WeakMap,t=async(s,i)=>{const r=i.destination;return e.set(i,r),await n(s,i,r),r};return{render(s,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(s,i)}}},Mc=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=l.listener,u=()=>{const y=new Float32Array(1),x=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),w=o(l);let v=!1,C=[0,0,-1,0,1,0],S=[0,0,0];const N=()=>{if(v)return;v=!0;const V=s(l,256,9,0);V.onaudioprocess=({inputBuffer:M})=>{const $=[r(M,y,0),r(M,y,1),r(M,y,2),r(M,y,3),r(M,y,4),r(M,y,5)];$.some((F,j)=>F!==C[j])&&(h.setOrientation(...$),C=$);const W=[r(M,y,6),r(M,y,7),r(M,y,8)];W.some((F,j)=>F!==S[j])&&(h.setPosition(...W),S=W)},x.connect(V)},A=V=>M=>{M!==C[V]&&(C[V]=M,h.setOrientation(...C))},E=V=>M=>{M!==S[V]&&(S[V]=M,h.setPosition(...S))},O=(V,M,$)=>{const W=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:M});W.connect(x,0,V),W.start(),Object.defineProperty(W.offset,"defaultValue",{get(){return M}});const F=n({context:c},w,W.offset,Se,Ee);return a(F,"value",j=>()=>j.call(F),j=>B=>{try{j.call(F,B)}catch(K){if(K.code!==9)throw K}N(),w&&$(B)}),F.cancelAndHoldAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.cancelAndHoldAtTime),F.cancelScheduledValues=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.cancelScheduledValues),F.exponentialRampToValueAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.exponentialRampToValueAtTime),F.linearRampToValueAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.linearRampToValueAtTime),F.setTargetAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.setTargetAtTime),F.setValueAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.setValueAtTime),F.setValueCurveAtTime=(j=>w?()=>{throw i()}:(...B)=>{const K=j.apply(F,B);return N(),K})(F.setValueCurveAtTime),F};return{forwardX:O(0,0,A(0)),forwardY:O(1,0,A(1)),forwardZ:O(2,-1,A(2)),positionX:O(6,0,E(0)),positionY:O(7,0,E(1)),positionZ:O(8,0,E(2)),upX:O(3,0,A(3)),upY:O(4,1,A(4)),upZ:O(5,0,A(5))}},{forwardX:d,forwardY:p,forwardZ:f,positionX:g,positionY:m,positionZ:_,upX:b,upY:T,upZ:k}=h.forwardX===void 0?u():h;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return f},get positionX(){return g},get positionY(){return m},get positionZ(){return _},get upX(){return b},get upY(){return T},get upZ(){return k}}},sn=n=>"context"in n,Os=n=>sn(n[0]),Ft=(n,e,t,s)=>{for(const i of n)if(t(i)){if(s)return!1;throw Error("The set contains at least one similar element.")}return n.add(e),!0},br=(n,e,[t,s],i)=>{Ft(n,[e,t,s],r=>r[0]===e&&r[1]===t,i)},Tr=(n,[e,t,s],i)=>{const r=n.get(e);r===void 0?n.set(e,new Set([[t,s]])):Ft(r,[t,s],o=>o[0]===t,i)},is=n=>"inputs"in n,nn=(n,e,t,s)=>{if(is(e)){const i=e.inputs[s];return n.connect(i,t,0),[i,t,0]}return n.connect(e,t,s),[e,t,s]},_o=(n,e,t)=>{for(const s of n)if(s[0]===e&&s[1]===t)return n.delete(s),s;return null},Dc=(n,e,t)=>bn(n,s=>s[0]===e&&s[1]===t),yo=(n,e)=>{if(!Ss(n).delete(e))throw new Error("Missing the expected event listener.")},vo=(n,e,t)=>{const s=Ye(n,e),i=bn(s,r=>r[0]===t);return s.size===0&&n.delete(e),i},rn=(n,e,t,s)=>{is(e)?n.disconnect(e.inputs[s],t,0):n.disconnect(e,t,s)},ie=n=>Ye(gi,n),xs=n=>Ye(_i,n),Rt=n=>ei.has(n),Xs=n=>!Kt.has(n),Ar=(n,e)=>new Promise(t=>{if(e!==null)t(!0);else{const s=n.createScriptProcessor(256,1,1),i=n.createGain(),r=n.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=n.createBufferSource();a.buffer=r,a.loop=!0,a.connect(s).connect(n.destination),a.connect(i),a.disconnect(i),s.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,h=>h===1)?t(!0):t(!1),a.stop(),s.onaudioprocess=null,a.disconnect(s),s.disconnect(n.destination)},a.start()}}),Hn=(n,e)=>{const t=new Map;for(const s of n)for(const i of s){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((s,i)=>e(i,s))},on=n=>"context"in n,Rc=n=>{const e=new Map;n.connect=(t=>(s,i=0,r=0)=>{const o=on(s)?t(s,i,r):t(s,i),a=e.get(s);return a===void 0?e.set(s,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(n.connect.bind(n)),n.disconnect=(t=>(s,i,r)=>{if(t.apply(n),s===void 0)e.clear();else if(typeof s=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==s);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(s))if(i===void 0)e.delete(s);else{const o=e.get(s);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(s):e.set(s,a)}}for(const[o,a]of e)a.forEach(c=>{on(o)?n.connect(o,c.output,c.input):n.connect(o,c.output)})})(n.disconnect)},$c=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Is(e),{outputs:o}=Ce(n),a=Ss(n),c=l=>{const h=ie(n),u=xs(e);if(l){const d=vo(r,n,t);br(i,n,d,!1),!s&&!Rt(n)&&h.connect(u,t)}else{const d=Dc(i,n,t);Tr(r,d,!1),!s&&!Rt(n)&&h.disconnect(u,t)}};return Ft(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),at(n)?br(i,n,[t,c],!0):Tr(r,[n,t,c],!0),!0):!1},Pc=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Ce(e),o=_o(i[s],n,t);return o===null?[po(r,n,t,s)[2],!1]:[o[2],!0]},Vc=(n,e,t)=>{const{activeInputs:s,passiveInputs:i}=Is(e),r=_o(s,n,t);return r===null?[vo(i,n,t)[1],!1]:[r[2],!0]},vi=(n,e,t,s,i)=>{const[r,o]=Pc(n,t,s,i);if(r!==null&&(yo(n,r),o&&!e&&!Rt(n)&&rn(ie(n),ie(t),s,i)),at(t)){const{activeInputs:a}=Ce(t);ni(t,a)}},xi=(n,e,t,s)=>{const[i,r]=Vc(n,t,s);i!==null&&(yo(n,i),r&&!e&&!Rt(n)&&ie(n).disconnect(xs(t),s))},Fc=(n,e)=>{const t=Ce(n),s=[];for(const i of t.outputs)Os(i)?vi(n,e,...i):xi(n,e,...i),s.push(i[0]);return t.outputs.clear(),s},Lc=(n,e,t)=>{const s=Ce(n),i=[];for(const r of s.outputs)r[1]===t&&(Os(r)?vi(n,e,...r):xi(n,e,...r),i.push(r[0]),s.outputs.delete(r));return i},Uc=(n,e,t,s,i)=>{const r=Ce(n);return Array.from(r.outputs).filter(o=>o[0]===t&&(s===void 0||o[1]===s)&&(i===void 0||o[2]===i)).map(o=>(Os(o)?vi(n,e,...o):xi(n,e,...o),r.outputs.delete(o),o[0]))},Bc=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,g)=>class extends l{constructor(_,b,T,k){super(T),this._context=_,this._nativeAudioNode=T;const y=h(_);u(y)&&t(Ar,()=>Ar(y,g))!==!0&&Rc(T),gi.set(this,T),ho.set(this,new Set),_.state!=="closed"&&b&&es(this),n(this,k,T)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(_){this._nativeAudioNode.channelCount=_}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(_){this._nativeAudioNode.channelCountMode=_}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(_){this._nativeAudioNode.channelInterpretation=_}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(_,b=0,T=0){if(b<0||b>=this._nativeAudioNode.numberOfOutputs)throw i();const k=h(this._context),y=f(k);if(d(_)||p(_))throw r();if(sn(_)){const v=ie(_);try{const S=nn(this._nativeAudioNode,v,b,T),N=Xs(this);(y||N)&&this._nativeAudioNode.disconnect(...S),this.context.state!=="closed"&&!N&&Xs(_)&&es(_)}catch(S){throw S.code===12?r():S}if(e(this,_,b,T,y)){const S=c([this],_);Hn(S,s(y))}return _}const x=xs(_);if(x.name==="playbackRate"&&x.maxValue===1024)throw o();try{this._nativeAudioNode.connect(x,b),(y||Xs(this))&&this._nativeAudioNode.disconnect(x,b)}catch(v){throw v.code===12?r():v}if($c(this,_,b,y)){const v=c([this],_);Hn(v,s(y))}}disconnect(_,b,T){let k;const y=h(this._context),x=f(y);if(_===void 0)k=Fc(this,x);else if(typeof _=="number"){if(_<0||_>=this.numberOfOutputs)throw i();k=Lc(this,x,_)}else{if(b!==void 0&&(b<0||b>=this.numberOfOutputs)||sn(_)&&T!==void 0&&(T<0||T>=_.numberOfInputs))throw i();if(k=Uc(this,x,_,b,T),k.length===0)throw r()}for(const w of k){const v=c([this],w);Hn(v,a)}}},jc=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>(p,f,g,m=null,_=null)=>{const b=g.value,T=new Ja(b),k=f?s(T):null,y={get defaultValue(){return b},get maxValue(){return m===null?g.maxValue:m},get minValue(){return _===null?g.minValue:_},get value(){return g.value},set value(x){g.value=x,y.setValueAtTime(x,p.context.currentTime)},cancelAndHoldAtTime(x){if(typeof g.cancelAndHoldAtTime=="function")k===null&&T.flush(p.context.currentTime),T.add(i(x)),g.cancelAndHoldAtTime(x);else{const w=Array.from(T).pop();k===null&&T.flush(p.context.currentTime),T.add(i(x));const v=Array.from(T).pop();g.cancelScheduledValues(x),w!==v&&v!==void 0&&(v.type==="exponentialRampToValue"?g.exponentialRampToValueAtTime(v.value,v.endTime):v.type==="linearRampToValue"?g.linearRampToValueAtTime(v.value,v.endTime):v.type==="setValue"?g.setValueAtTime(v.value,v.startTime):v.type==="setValueCurve"&&g.setValueCurveAtTime(v.values,v.startTime,v.duration))}return y},cancelScheduledValues(x){return k===null&&T.flush(p.context.currentTime),T.add(r(x)),g.cancelScheduledValues(x),y},exponentialRampToValueAtTime(x,w){if(x===0)throw new RangeError;if(!Number.isFinite(w)||w<0)throw new RangeError;const v=p.context.currentTime;return k===null&&T.flush(v),Array.from(T).length===0&&(T.add(l(b,v)),g.setValueAtTime(b,v)),T.add(o(x,w)),g.exponentialRampToValueAtTime(x,w),y},linearRampToValueAtTime(x,w){const v=p.context.currentTime;return k===null&&T.flush(v),Array.from(T).length===0&&(T.add(l(b,v)),g.setValueAtTime(b,v)),T.add(a(x,w)),g.linearRampToValueAtTime(x,w),y},setTargetAtTime(x,w,v){return k===null&&T.flush(p.context.currentTime),T.add(c(x,w,v)),g.setTargetAtTime(x,w,v),y},setValueAtTime(x,w){return k===null&&T.flush(p.context.currentTime),T.add(l(x,w)),g.setValueAtTime(x,w),y},setValueCurveAtTime(x,w,v){const C=x instanceof Float32Array?x:new Float32Array(x);if(u!==null&&u.name==="webkitAudioContext"){const S=w+v,N=p.context.sampleRate,A=Math.ceil(w*N),E=Math.floor(S*N),O=E-A,V=new Float32Array(O);for(let $=0;$<O;$+=1){const W=(C.length-1)/v*((A+$)/N-w),F=Math.floor(W),j=Math.ceil(W);V[$]=F===j?C[F]:(1-(W-F))*C[F]+(1-(j-W))*C[j]}k===null&&T.flush(p.context.currentTime),T.add(h(V,w,v)),g.setValueCurveAtTime(V,w,v);const M=E/N;M<S&&d(y,V[V.length-1],M),d(y,C[C.length-1],S)}else k===null&&T.flush(p.context.currentTime),T.add(h(C,w,v)),g.setValueCurveAtTime(C,w,v);return y}};return t.set(y,g),e.set(y,p),n(y,k),y},qc=n=>({replay(e){for(const t of n)if(t.type==="exponentialRampToValue"){const{endTime:s,value:i}=t;e.exponentialRampToValueAtTime(i,s)}else if(t.type==="linearRampToValue"){const{endTime:s,value:i}=t;e.linearRampToValueAtTime(i,s)}else if(t.type==="setTarget"){const{startTime:s,target:i,timeConstant:r}=t;e.setTargetAtTime(i,s,r)}else if(t.type==="setValue"){const{startTime:s,value:i}=t;e.setValueAtTime(i,s)}else if(t.type==="setValueCurve"){const{duration:s,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,s)}else throw new Error("Can't apply an unknown automation.")}});class xo{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((s,i)=>e.call(t,s,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const Wc={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},zc=(n,e,t,s,i,r,o,a,c,l,h,u,d,p)=>class extends e{constructor(g,m,_){var b;const T=a(g),k=c(T),y=h({...Wc,..._});d(y);const x=ti.get(T),w=x?.get(m),v=k||T.state!=="closed"?T:(b=o(T))!==null&&b!==void 0?b:T,C=i(v,k?null:g.baseLatency,l,m,w,y),S=k?s(m,y,w):null;super(g,!0,C,S);const N=[];C.parameters.forEach((E,O)=>{const V=t(this,k,E);N.push([O,V])}),this._nativeAudioWorkletNode=C,this._onprocessorerror=null,this._parameters=new xo(N),k&&n(T,this);const{activeInputs:A}=r(this);u(C,A)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(g){const m=typeof g=="function"?p(this,g):null;this._nativeAudioWorkletNode.onprocessorerror=m;const _=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=_!==null&&_===m?g:_}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function an(n,e,t,s,i){if(typeof n.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),n.copyFromChannel(e[t],s,i);else{const r=n.getChannelData(s);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const wo=(n,e,t,s,i)=>{typeof n.copyToChannel=="function"?e[t].byteLength!==0&&n.copyToChannel(e[t],s,i):e[t].byteLength!==0&&n.getChannelData(s).set(e[t],i)},cn=(n,e)=>{const t=[];for(let s=0;s<n;s+=1){const i=[],r=typeof e=="number"?e:e[s];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},Gc=(n,e)=>{const t=Ye(si,n),s=ie(e);return Ye(t,s)},Yc=async(n,e,t,s,i,r,o)=>{const a=e===null?Math.ceil(n.context.length/128)*128:e.length,c=s.channelCount*s.numberOfInputs,l=i.reduce((m,_)=>m+_,0),h=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const u=Ce(n),d=await Gc(t,n),p=cn(s.numberOfInputs,s.channelCount),f=cn(s.numberOfOutputs,i),g=Array.from(n.parameters.keys()).reduce((m,_)=>({...m,[_]:new Float32Array(128)}),{});for(let m=0;m<a;m+=128){if(s.numberOfInputs>0&&e!==null)for(let _=0;_<s.numberOfInputs;_+=1)for(let b=0;b<s.channelCount;b+=1)an(e,p[_],b,b,m);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:_},b)=>{an(e,g,_,c+b,m)});for(let _=0;_<s.numberOfInputs;_+=1)for(let b=0;b<i[_];b+=1)f[_][b].byteLength===0&&(f[_][b]=new Float32Array(128));try{const _=p.map((T,k)=>u.activeInputs[k].size===0?[]:T),b=o(m/t.sampleRate,t.sampleRate,()=>d.process(_,f,g));if(h!==null)for(let T=0,k=0;T<s.numberOfOutputs;T+=1){for(let y=0;y<i[T];y+=1)wo(h,f[T],y,k+y,m);k+=i[T]}if(!b)break}catch(_){n.dispatchEvent(new ErrorEvent("processorerror",{colno:_.colno,filename:_.filename,lineno:_.lineno,message:_.message}));break}}return h},Hc=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,g)=>(m,_,b)=>{const T=new WeakMap;let k=null;const y=async(x,w)=>{let v=h(x),C=null;const S=ke(v,w),N=Array.isArray(_.outputChannelCount)?_.outputChannelCount:Array.from(_.outputChannelCount);if(u===null){const A=N.reduce((M,$)=>M+$,0),E=i(w,{channelCount:Math.max(1,A),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,A)}),O=[];for(let M=0;M<x.numberOfOutputs;M+=1)O.push(s(w,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:N[M]}));const V=o(w,{channelCount:_.channelCount,channelCountMode:_.channelCountMode,channelInterpretation:_.channelInterpretation,gain:1});V.connect=e.bind(null,O),V.disconnect=c.bind(null,O),C=[E,O,V]}else S||(v=new u(w,m));if(T.set(w,C===null?v:C[2]),C!==null){if(k===null){if(b===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const $=x.channelCount*x.numberOfInputs,W=b.parameterDescriptors===void 0?0:b.parameterDescriptors.length,F=$+W;k=Yc(x,F===0?null:await(async()=>{const B=new d(F,Math.ceil(x.context.length/128)*128,w.sampleRate),K=[],$e=[];for(let re=0;re<_.numberOfInputs;re+=1)K.push(o(B,{channelCount:_.channelCount,channelCountMode:_.channelCountMode,channelInterpretation:_.channelInterpretation,gain:1})),$e.push(i(B,{channelCount:_.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:_.channelCount}));const Pe=await Promise.all(Array.from(x.parameters.values()).map(async re=>{const Ne=r(B,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:re.value});return await p(B,re,Ne.offset),Ne})),G=s(B,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,$+W)});for(let re=0;re<_.numberOfInputs;re+=1){K[re].connect($e[re]);for(let Ne=0;Ne<_.channelCount;Ne+=1)$e[re].connect(G,Ne,re*_.channelCount+Ne)}for(const[re,Ne]of Pe.entries())Ne.connect(G,0,$+re),Ne.start(0);return G.connect(B.destination),await Promise.all(K.map(re=>f(x,B,re))),g(B)})(),w,_,N,b,l)}const A=await k,E=t(w,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[O,V,M]=C;A!==null&&(E.buffer=A,E.start(0)),E.connect(O);for(let $=0,W=0;$<x.numberOfOutputs;$+=1){const F=V[$];for(let j=0;j<N[$];j+=1)O.connect(F,W+j,j);W+=N[$]}return M}if(S)for(const[A,E]of x.parameters.entries())await n(w,E,v.parameters.get(A));else for(const[A,E]of x.parameters.entries())await p(w,E,v.parameters.get(A));return await f(x,w,v),v};return{render(x,w){a(w,x);const v=T.get(w);return v!==void 0?Promise.resolve(v):y(x,w)}}},Xc=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,g,m,_,b,T)=>class extends f{constructor(y,x){super(y,x),this._nativeContext=y,this._audioWorklet=n===void 0?void 0:{addModule:(w,v)=>n(this,w,v)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(y,x,w){return new t({length:x,numberOfChannels:y,sampleRate:w})}createBufferSource(){return new s(this)}createChannelMerger(y=6){return new r(this,{numberOfInputs:y})}createChannelSplitter(y=6){return new o(this,{numberOfOutputs:y})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(y=1){return new h(this,{maxDelayTime:y})}createDynamicsCompressor(){return new u(this)}createGain(){return new d(this)}createIIRFilter(y,x){return new p(this,{feedback:x,feedforward:y})}createOscillator(){return new g(this)}createPanner(){return new m(this)}createPeriodicWave(y,x,w={disableNormalization:!1}){return new _(this,{...w,imag:x,real:y})}createStereoPanner(){return new b(this)}createWaveShaper(){return new T(this)}decodeAudioData(y,x,w){return l(this._nativeContext,y).then(v=>(typeof x=="function"&&x(v),v),v=>{throw typeof w=="function"&&w(v),v})}},Zc={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},Qc=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...Zc,...h},p=i(u,d),f=o(u),g=f?t():null;super(l,!1,p,g),this._Q=e(this,f,p.Q,Se,Ee),this._detune=e(this,f,p.detune,1200*Math.log2(Se),-1200*Math.log2(Se)),this._frequency=e(this,f,p.frequency,l.sampleRate/2,0),this._gain=e(this,f,p.gain,40*Math.log10(Se),Ee),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,h,u){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,h,u)}catch(d){throw d.code===11?s():d}if(l.length!==h.length||h.length!==u.length)throw s()}},Jc=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=ke(l,c);if(!h){const u={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,u)}return r.set(c,l),h?(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)):(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Kc=(n,e)=>(t,s)=>{const i=e.get(t);if(i!==void 0)return i;const r=n.get(t);if(r!==void 0)return r;try{const o=s();return o instanceof Promise?(n.set(t,o),o.catch(()=>!1).then(a=>(n.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},el={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},tl=(n,e,t,s,i)=>class extends n{constructor(o,a){const c=s(o),l={...el,...a},h=t(c,l),u=i(c)?e():null;super(o,!1,h,u)}},sl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!ke(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},nl={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},il=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=r({...nl,...c}),u=t(l,h),d=i(l)?e():null;super(a,!1,u,d)}},rl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!ke(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},ol=n=>(e,t,s)=>n(t,e,s),al=n=>(e,t,s=0,i=0)=>{const r=e[s];if(r===void 0)throw n();return on(t)?r.connect(t,0,i):r.connect(t,0)},cl=n=>(e,t)=>{const s=n(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return s.buffer=i,s.loop=!0,s.connect(t),s.start(),()=>{s.stop(),s.disconnect(t)}},ll={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},hl=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...ll,...l},d=s(h,u),p=r(h),f=p?t():null;super(c,!1,d,f),this._constantSourceNodeRenderer=f,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Se,Ee),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const h=this._nativeConstantSourceNode.onended;this._onended=h!==null&&h===l?c:h}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){es(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),at(this)&&Cs(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},ul=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=ke(u,h);if(!d){const p={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,offset:u.offset.value};u=e(h,p),o!==null&&u.start(o),a!==null&&u.stop(a)}return r.set(h,u),d?await n(h,l.offset,u.offset):await s(h,l.offset,u.offset),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},dl=n=>e=>(n[0]=e,n[0]),pl={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},fl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h={...pl,...c},u=t(l,h),p=i(l)?e():null;super(a,!1,u,p),this._isBufferNullified=!1,this._nativeConvolverNode=u,h.buffer!==null&&r(this,h.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},ml=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!ke(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=n(o,l)}return s.set(o,a),is(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},gl=(n,e)=>(t,s,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,s,i)}catch(r){throw r.name==="SyntaxError"?n():r}},_l=()=>new DOMException("","DataCloneError"),kr=n=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(s=>{const i=()=>{t.onmessage=null,e.close(),t.close(),s()};t.onmessage=()=>i();try{e.postMessage(n,[n])}catch{}finally{i()}})},yl=(n,e,t,s,i,r,o,a,c,l,h)=>(u,d)=>{const p=o(u)?u:r(u);if(i.has(d)){const f=t();return Promise.reject(f)}try{i.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(f=>(kr(d).catch(()=>{}),e(a,()=>a(f))||h(f),n.add(f),f)):new Promise((f,g)=>{const m=async()=>{try{await kr(d)}catch{}},_=b=>{g(b),m()};try{p.decodeAudioData(d,b=>{typeof b.copyFromChannel!="function"&&(l(b),yi(b)),n.add(b),m().then(()=>f(b))},b=>{_(b===null?s():b)})}catch(b){_(b)}})},vl=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=e.get(c);if(h===void 0)throw new Error("Missing the expected cycle count.");const u=r(c.context),d=a(u);if(h===l){if(e.delete(c),!d&&o(c)){const p=s(c),{outputs:f}=t(c);for(const g of f)if(Os(g)){const m=s(g[0]);n(p,m,g[1],g[2])}else{const m=i(g[0]);p.connect(m,g[1])}}}else e.set(c,h-l)},xl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},wl=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...xl,...l},d=s(h,u),p=r(h),f=p?t(u.maxDelayTime):null;super(c,!1,d,f),this._delayTime=e(this,p,d.delayTime),o(this,u.maxDelayTime)}get delayTime(){return this._delayTime}},bl=(n,e,t,s,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let h=t(c);const u=ke(h,l);if(!u){const d={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,delayTime:h.delayTime.value,maxDelayTime:r};h=e(l,d)}return o.set(l,h),u?await n(l,c.delayTime,h.delayTime):await s(l,c.delayTime,h.delayTime),await i(c,l,h),h};return{render(c,l){const h=o.get(l);return h!==void 0?Promise.resolve(h):a(c,l)}}},Tl=n=>(e,t,s,i)=>n(e[i],r=>r[0]===t&&r[1]===s),Al=n=>(e,t)=>{n(e).delete(t)},kl=n=>"delayTime"in n,Nl=(n,e,t)=>function s(i,r){const o=sn(r)?r:t(n,r);if(kl(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>s([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},Ws=(n,e,t)=>{const s=e[t];if(s===void 0)throw n();return s},Sl=n=>(e,t=void 0,s=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Ws(n,e,t).disconnect():on(t)?s===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?Ws(n,e,s).disconnect(t,0):Ws(n,e,s).disconnect(t,0,i):s===void 0?e.forEach(r=>r.disconnect(t)):Ws(n,e,s).disconnect(t,0),Cl={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Il=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...Cl,...h},p=s(u,d),f=o(u),g=f?t():null;super(l,!1,p,g),this._attack=e(this,f,p.attack),this._knee=e(this,f,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,f,p.ratio),this._release=e(this,f,p.release),this._threshold=e(this,f,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const h=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=h,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const h=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=h,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Ol=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=ke(l,c);if(!h){const u={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,u)}return r.set(c,l),h?(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)):(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},El=()=>new DOMException("","EncodingError"),Ml=n=>e=>new Promise((t,s)=>{if(n===null){s(new SyntaxError);return}const i=n.document.head;if(i===null)s(new SyntaxError);else{const r=n.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=n.onerror,l=()=>{n.onerror=c,URL.revokeObjectURL(a)};n.onerror=(h,u,d,p,f)=>{if(u===a||u===n.location.href&&d===1&&p===1)return l(),s(f),!1;if(c!==null)return c(h,u,d,p,f)},r.onerror=()=>{l(),s(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),Dl=n=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,s,i){if(s!==null){let r=this._listeners.get(s);r===void 0&&(r=n(this,s),typeof s=="function"&&this._listeners.set(s,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,s,i){const r=s===null?void 0:this._listeners.get(s);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},Rl=n=>(e,t,s)=>{Object.defineProperties(n,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return s()}finally{n!==null&&(delete n.currentFrame,delete n.currentTime)}},$l=n=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw n()},Pl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Vl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...Pl,...c},u=s(l,h),d=r(l),p=d?t():null;super(a,!1,u,p),this._gain=e(this,d,u.gain,Se,Ee)}get gain(){return this._gain}},Fl=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=ke(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.gain,l.gain):await s(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Ll=(n,e)=>t=>e(n,t),Ul=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Bl=n=>e=>{var t;return(t=n.get(e))!==null&&t!==void 0?t:0},jl=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},ql=n=>e=>n.get(e),xe=()=>new DOMException("","InvalidStateError"),Wl=n=>e=>{const t=n.get(e);if(t===void 0)throw xe();return t},zl=(n,e)=>t=>{let s=n.get(t);if(s!==void 0)return s;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return s=new e(1,1,44100),n.set(t,s),s},Gl=n=>e=>{const t=n.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},Tn=()=>new DOMException("","InvalidAccessError"),Yl=n=>{n.getFrequencyResponse=(e=>(t,s,i)=>{if(t.length!==s.length||s.length!==i.length)throw Tn();return e.call(n,t,s,i)})(n.getFrequencyResponse)},Hl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Xl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=i(l),u={...Hl,...c},d=e(l,h?null:a.baseLatency,u),p=h?t(u.feedback,u.feedforward):null;super(a,!1,d,p),Yl(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},bo=(n,e,t,s,i,r,o,a,c,l,h)=>{const u=l.length;let d=a;for(let p=0;p<u;p+=1){let f=t[0]*l[p];for(let g=1;g<i;g+=1){const m=d-g&c-1;f+=t[g]*r[m],f-=n[g]*o[m]}for(let g=i;g<s;g+=1)f+=t[g]*r[d-g&c-1];for(let g=i;g<e;g+=1)f-=n[g]*o[d-g&c-1];r[d]=l[p],o[d]=f,d=d+1&c-1,h[p]=f}return d},Zl=(n,e,t,s)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=s instanceof Float64Array?s:new Float64Array(s),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let f=0;f<o;f+=1)r[f]/=i[0];for(let f=1;f<a;f+=1)i[f]/=i[0]}const l=32,h=new Float32Array(l),u=new Float32Array(l),d=e.createBuffer(n.numberOfChannels,n.length,n.sampleRate),p=n.numberOfChannels;for(let f=0;f<p;f+=1){const g=n.getChannelData(f),m=d.getChannelData(f);h.fill(0),u.fill(0),bo(i,o,r,a,c,h,u,0,l,g,m)}return d},Ql=(n,e,t,s,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(h,u)=>{let d=null,p=e(h);const f=ke(p,u);if(u.createIIRFilter===void 0?d=n(u,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):f||(p=u.createIIRFilter(o,r)),a.set(u,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const m=new t(h.context.destination.channelCount,h.context.length,u.sampleRate);c=(async()=>{await s(h,m,m.destination);const _=await i(m);return Zl(_,u,r,o)})()}const g=await c;return d.buffer=g,d.start(0),d}return await s(h,u,p),p};return{render(h,u){const d=a.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},Jl=(n,e,t,s,i,r)=>o=>(a,c)=>{const l=n.get(a);if(l===void 0){if(!o&&r(a)){const h=s(a),{outputs:u}=t(a);for(const d of u)if(Os(d)){const p=s(d[0]);e(h,p,d[1],d[2])}else{const p=i(d[0]);h.disconnect(p,d[1])}}n.set(a,c)}else n.set(a,l+c)},Kl=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},eh=(n,e)=>t=>n.has(t)||e(t),th=(n,e)=>t=>n.has(t)||e(t),sh=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},nh=n=>e=>n!==null&&e instanceof n,ih=n=>e=>n!==null&&typeof n.AudioNode=="function"&&e instanceof n.AudioNode,rh=n=>e=>n!==null&&typeof n.AudioParam=="function"&&e instanceof n.AudioParam,oh=(n,e)=>t=>n(t)||e(t),ah=n=>e=>n!==null&&e instanceof n,ch=n=>n!==null&&n.isSecureContext,lh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},hh={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},uh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r);if(s(a))throw new TypeError;const c={...hh,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},dh=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},ph=(n,e,t)=>class extends n{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},fh=(n,e,t,s,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,wn.set(this,a),s(a)&&i.set(a,new Set),this._destination=new n(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},ws=n=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=n.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},mh=(n,e)=>(t,s,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const h=r.size===0;if(e(a))return o.call(t,a,c,l),n(r,[a,c,l],u=>u[0]===a&&u[1]===c&&u[2]===l,!0),h&&s(),a;o.call(t,a,c),n(r,[a,c],u=>u[0]===a&&u[1]===c,!0),h&&s()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const h=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const u=r.size===0;h&&u&&i()})(t.disconnect),t},oe=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t]&&(n[t]=s)},_e=(n,e)=>{oe(n,e,"channelCount"),oe(n,e,"channelCountMode"),oe(n,e,"channelInterpretation")},Nr=n=>typeof n.getFloatTimeDomainData=="function",gh=n=>{n.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);n.getByteTimeDomainData(t);const s=Math.max(t.length,n.fftSize);for(let i=0;i<s;i+=1)e[i]=(t[i]-128)*.0078125;return e}},_h=(n,e)=>(t,s)=>{const i=t.createAnalyser();if(_e(i,s),!(s.maxDecibels>s.minDecibels))throw e();return oe(i,s,"fftSize"),oe(i,s,"maxDecibels"),oe(i,s,"minDecibels"),oe(i,s,"smoothingTimeConstant"),n(Nr,()=>Nr(i))||gh(i),i},yh=n=>n===null?null:n.hasOwnProperty("AudioBuffer")?n.AudioBuffer:null,he=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t].value&&(n[t].value=s)},vh=n=>{n.start=(e=>{let t=!1;return(s=0,i=0,r)=>{if(t)throw xe();e.call(n,s,i,r),t=!0}})(n.start)},wi=n=>{n.start=(e=>(t=0,s=0,i)=>{if(typeof i=="number"&&i<0||s<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(n,t,s,i)})(n.start)},bi=n=>{n.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(n,t)})(n.stop)},xh=(n,e,t,s,i,r,o,a,c,l,h)=>(u,d)=>{const p=u.createBufferSource();return _e(p,d),he(p,d,"playbackRate"),oe(p,d,"buffer"),oe(p,d,"loop"),oe(p,d,"loopEnd"),oe(p,d,"loopStart"),e(t,()=>t(u))||vh(p),e(s,()=>s(u))||c(p),e(i,()=>i(u))||l(p,u),e(r,()=>r(u))||wi(p),e(o,()=>o(u))||h(p,u),e(a,()=>a(u))||bi(p),n(u,p),p},wh=n=>n===null?null:n.hasOwnProperty("AudioContext")?n.AudioContext:n.hasOwnProperty("webkitAudioContext")?n.webkitAudioContext:null,bh=(n,e)=>(t,s,i)=>{const r=t.destination;if(r.channelCount!==s)try{r.channelCount=s}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:s});const o=n(t,{channelCount:s,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Th=n=>n===null?null:n.hasOwnProperty("AudioWorkletNode")?n.AudioWorkletNode:null,Ah=n=>{const{port1:e}=new MessageChannel;try{e.postMessage(n)}finally{e.close()}},kh=(n,e,t,s,i)=>(r,o,a,c,l,h)=>{if(a!==null)try{const u=new a(r,c,h),d=new Map;let p=null;if(Object.defineProperties(u,{channelCount:{get:()=>h.channelCount,set:()=>{throw n()}},channelCountMode:{get:()=>"explicit",set:()=>{throw n()}},onprocessorerror:{get:()=>p,set:f=>{typeof p=="function"&&u.removeEventListener("processorerror",p),p=typeof f=="function"?f:null,typeof p=="function"&&u.addEventListener("processorerror",p)}}}),u.addEventListener=(f=>(...g)=>{if(g[0]==="processorerror"){const m=typeof g[1]=="function"?g[1]:typeof g[1]=="object"&&g[1]!==null&&typeof g[1].handleEvent=="function"?g[1].handleEvent:null;if(m!==null){const _=d.get(g[1]);_!==void 0?g[1]=_:(g[1]=b=>{b.type==="error"?(Object.defineProperties(b,{type:{value:"processorerror"}}),m(b)):m(new ErrorEvent(g[0],{...b}))},d.set(m,g[1]))}}return f.call(u,"error",g[1],g[2]),f.call(u,...g)})(u.addEventListener),u.removeEventListener=(f=>(...g)=>{if(g[0]==="processorerror"){const m=d.get(g[1]);m!==void 0&&(d.delete(g[1]),g[1]=m)}return f.call(u,"error",g[1],g[2]),f.call(u,g[0],g[1],g[2])})(u.removeEventListener),h.numberOfOutputs!==0){const f=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return u.connect(f).connect(r.destination),i(u,()=>f.disconnect(),()=>f.connect(r.destination))}return u}catch(u){throw u.code===11?s():u}if(l===void 0)throw s();return Ah(h),e(r,o,l,h)},To=(n,e)=>n===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(n*e))))),Nh=n=>new Promise((e,t)=>{const{port1:s,port2:i}=new MessageChannel;s.onmessage=({data:r})=>{s.close(),i.close(),e(r)},s.onmessageerror=({data:r})=>{s.close(),i.close(),t(r)},i.postMessage(n)}),Sh=async(n,e)=>{const t=await Nh(e);return new n(t)},Ch=(n,e,t,s)=>{let i=si.get(n);i===void 0&&(i=new WeakMap,si.set(n,i));const r=Sh(t,s);return i.set(e,r),r},Ih=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>(p,f,g,m)=>{if(m.numberOfInputs===0&&m.numberOfOutputs===0)throw c();const _=Array.isArray(m.outputChannelCount)?m.outputChannelCount:Array.from(m.outputChannelCount);if(_.some(I=>I<1))throw c();if(_.length!==m.numberOfOutputs)throw e();if(m.channelCountMode!=="explicit")throw c();const b=m.channelCount*m.numberOfInputs,T=_.reduce((I,U)=>I+U,0),k=g.parameterDescriptors===void 0?0:g.parameterDescriptors.length;if(b+k>6||T>6)throw c();const y=new MessageChannel,x=[],w=[];for(let I=0;I<m.numberOfInputs;I+=1)x.push(o(p,{channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation,gain:1})),w.push(i(p,{channelCount:m.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:m.channelCount}));const v=[];if(g.parameterDescriptors!==void 0)for(const{defaultValue:I,maxValue:U,minValue:ge,name:ae}of g.parameterDescriptors){const X=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:m.parameterData[ae]!==void 0?m.parameterData[ae]:I===void 0?0:I});Object.defineProperties(X.offset,{defaultValue:{get:()=>I===void 0?0:I},maxValue:{get:()=>U===void 0?Se:U},minValue:{get:()=>ge===void 0?Ee:ge}}),v.push(X)}const C=s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,b+k)}),S=To(f,p.sampleRate),N=a(p,S,b+k,Math.max(1,T)),A=i(p,{channelCount:Math.max(1,T),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,T)}),E=[];for(let I=0;I<m.numberOfOutputs;I+=1)E.push(s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:_[I]}));for(let I=0;I<m.numberOfInputs;I+=1){x[I].connect(w[I]);for(let U=0;U<m.channelCount;U+=1)w[I].connect(C,U,I*m.channelCount+U)}const O=new xo(g.parameterDescriptors===void 0?[]:g.parameterDescriptors.map(({name:I},U)=>{const ge=v[U];return ge.connect(C,0,b+U),ge.start(0),[I,ge.offset]}));C.connect(N);let V=m.channelInterpretation,M=null;const $=m.numberOfOutputs===0?[N]:E,W={get bufferSize(){return S},get channelCount(){return m.channelCount},set channelCount(I){throw t()},get channelCountMode(){return m.channelCountMode},set channelCountMode(I){throw t()},get channelInterpretation(){return V},set channelInterpretation(I){for(const U of x)U.channelInterpretation=I;V=I},get context(){return N.context},get inputs(){return x},get numberOfInputs(){return m.numberOfInputs},get numberOfOutputs(){return m.numberOfOutputs},get onprocessorerror(){return M},set onprocessorerror(I){typeof M=="function"&&W.removeEventListener("processorerror",M),M=typeof I=="function"?I:null,typeof M=="function"&&W.addEventListener("processorerror",M)},get parameters(){return O},get port(){return y.port2},addEventListener(...I){return N.addEventListener(I[0],I[1],I[2])},connect:n.bind(null,$),disconnect:l.bind(null,$),dispatchEvent(...I){return N.dispatchEvent(I[0])},removeEventListener(...I){return N.removeEventListener(I[0],I[1],I[2])}},F=new Map;y.port1.addEventListener=(I=>(...U)=>{if(U[0]==="message"){const ge=typeof U[1]=="function"?U[1]:typeof U[1]=="object"&&U[1]!==null&&typeof U[1].handleEvent=="function"?U[1].handleEvent:null;if(ge!==null){const ae=F.get(U[1]);ae!==void 0?U[1]=ae:(U[1]=X=>{h(p.currentTime,p.sampleRate,()=>ge(X))},F.set(ge,U[1]))}}return I.call(y.port1,U[0],U[1],U[2])})(y.port1.addEventListener),y.port1.removeEventListener=(I=>(...U)=>{if(U[0]==="message"){const ge=F.get(U[1]);ge!==void 0&&(F.delete(U[1]),U[1]=ge)}return I.call(y.port1,U[0],U[1],U[2])})(y.port1.removeEventListener);let j=null;Object.defineProperty(y.port1,"onmessage",{get:()=>j,set:I=>{typeof j=="function"&&y.port1.removeEventListener("message",j),j=typeof I=="function"?I:null,typeof j=="function"&&(y.port1.addEventListener("message",j),y.port1.start())}}),g.prototype.port=y.port1;let B=null;Ch(p,W,g,m).then(I=>B=I);const $e=cn(m.numberOfInputs,m.channelCount),Pe=cn(m.numberOfOutputs,_),G=g.parameterDescriptors===void 0?[]:g.parameterDescriptors.reduce((I,{name:U})=>({...I,[U]:new Float32Array(128)}),{});let re=!0;const Ne=()=>{m.numberOfOutputs>0&&N.disconnect(A);for(let I=0,U=0;I<m.numberOfOutputs;I+=1){const ge=E[I];for(let ae=0;ae<_[I];ae+=1)A.disconnect(ge,U+ae,ae);U+=_[I]}},P=new Map;N.onaudioprocess=({inputBuffer:I,outputBuffer:U})=>{if(B!==null){const ge=u(W);for(let ae=0;ae<S;ae+=128){for(let X=0;X<m.numberOfInputs;X+=1)for(let le=0;le<m.channelCount;le+=1)an(I,$e[X],le,le,ae);g.parameterDescriptors!==void 0&&g.parameterDescriptors.forEach(({name:X},le)=>{an(I,G,X,b+le,ae)});for(let X=0;X<m.numberOfInputs;X+=1)for(let le=0;le<_[X];le+=1)Pe[X][le].byteLength===0&&(Pe[X][le]=new Float32Array(128));try{const X=$e.map((Be,ft)=>{if(ge[ft].size>0)return P.set(ft,S/128),Be;const Gn=P.get(ft);return Gn===void 0?[]:(Be.every(Ta=>Ta.every(Aa=>Aa===0))&&(Gn===1?P.delete(ft):P.set(ft,Gn-1)),Be)});re=h(p.currentTime+ae/p.sampleRate,p.sampleRate,()=>B.process(X,Pe,G));for(let Be=0,ft=0;Be<m.numberOfOutputs;Be+=1){for(let ds=0;ds<_[Be];ds+=1)wo(U,Pe[Be],ds,ft+ds,ae);ft+=_[Be]}}catch(X){re=!1,W.dispatchEvent(new ErrorEvent("processorerror",{colno:X.colno,filename:X.filename,lineno:X.lineno,message:X.message}))}if(!re){for(let X=0;X<m.numberOfInputs;X+=1){x[X].disconnect(w[X]);for(let le=0;le<m.channelCount;le+=1)w[ae].disconnect(C,le,X*m.channelCount+le)}if(g.parameterDescriptors!==void 0){const X=g.parameterDescriptors.length;for(let le=0;le<X;le+=1){const Be=v[le];Be.disconnect(C,0,b+le),Be.stop()}}C.disconnect(N),N.onaudioprocess=null,At?Ne():jt();break}}}};let At=!1;const kt=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),Bt=()=>N.connect(kt).connect(p.destination),jt=()=>{N.disconnect(kt),kt.disconnect()},wa=()=>{if(re){jt(),m.numberOfOutputs>0&&N.connect(A);for(let I=0,U=0;I<m.numberOfOutputs;I+=1){const ge=E[I];for(let ae=0;ae<_[I];ae+=1)A.connect(ge,U+ae,ae);U+=_[I]}}At=!0},ba=()=>{re&&(Bt(),Ne()),At=!1};return Bt(),d(W,wa,ba)},Ao=(n,e)=>{const t=n.createBiquadFilter();return _e(t,e),he(t,e,"Q"),he(t,e,"detune"),he(t,e,"frequency"),he(t,e,"gain"),oe(t,e,"type"),t},Oh=(n,e)=>(t,s)=>{const i=t.createChannelMerger(s.numberOfInputs);return n!==null&&n.name==="webkitAudioContext"&&e(t,i),_e(i,s),i},Eh=n=>{const e=n.numberOfOutputs;Object.defineProperty(n,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw xe()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw xe()}}),Object.defineProperty(n,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw xe()}})},Es=(n,e)=>{const t=n.createChannelSplitter(e.numberOfOutputs);return _e(t,e),Eh(t),t},Mh=(n,e,t,s,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return _e(a,o),he(a,o,"offset"),e(s,()=>s(r))||wi(a),e(i,()=>i(r))||bi(a),n(r,a),a},rs=(n,e)=>(n.connect=e.connect.bind(e),n.disconnect=e.disconnect.bind(e),n),Dh=(n,e,t,s)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),h=a.getChannelData(0);h[0]=1,h[1]=1,c.buffer=a,c.loop=!0;const u={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(f){l.channelCount=f},get channelCountMode(){return l.channelCountMode},set channelCountMode(f){l.channelCountMode=f},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(f){l.channelInterpretation=f},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(f){c.onended=f},addEventListener(...f){return c.addEventListener(f[0],f[1],f[2])},dispatchEvent(...f){return c.dispatchEvent(f[0])},removeEventListener(...f){return c.removeEventListener(f[0],f[1],f[2])},start(f=0){c.start.call(c,f)},stop(f=0){c.stop.call(c,f)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return n(i,c),s(rs(u,l),d,p)},Rh=(n,e)=>(t,s)=>{const i=t.createConvolver();if(_e(i,s),s.disableNormalization===i.normalize&&(i.normalize=!s.disableNormalization),oe(i,s,"buffer"),s.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw n();return r.call(i,o)}),s.channelCountMode==="max"))throw n();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw n();return r.call(i,o)}),i},ko=(n,e)=>{const t=n.createDelay(e.maxDelayTime);return _e(t,e),he(t,e,"delayTime"),t},$h=n=>(e,t)=>{const s=e.createDynamicsCompressor();if(_e(s,t),t.channelCount>2||t.channelCountMode==="max")throw n();return he(s,t,"attack"),he(s,t,"knee"),he(s,t,"ratio"),he(s,t,"release"),he(s,t,"threshold"),s},De=(n,e)=>{const t=n.createGain();return _e(t,e),he(t,e,"gain"),t},Ph=n=>(e,t,s)=>{if(e.createIIRFilter===void 0)return n(e,t,s);const i=e.createIIRFilter(s.feedforward,s.feedback);return _e(i,s),i};function Vh(n,e){const t=e[0]*e[0]+e[1]*e[1];return[(n[0]*e[0]+n[1]*e[1])/t,(n[1]*e[0]-n[0]*e[1])/t]}function Fh(n,e){return[n[0]*e[0]-n[1]*e[1],n[0]*e[1]+n[1]*e[0]]}function Sr(n,e){let t=[0,0];for(let s=n.length-1;s>=0;s-=1)t=Fh(t,e),t[0]+=n[s];return t}const Lh=(n,e,t,s)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:h})=>{const u=To(r,i.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=h instanceof Float64Array?h:new Float64Array(h),f=d.length,g=p.length,m=Math.min(f,g);if(f===0||f>20)throw s();if(d[0]===0)throw e();if(g===0||g>20)throw s();if(p[0]===0)throw e();if(d[0]!==1){for(let v=0;v<g;v+=1)p[v]/=d[0];for(let v=1;v<f;v+=1)d[v]/=d[0]}const _=t(i,u,o,o);_.channelCount=o,_.channelCountMode=a,_.channelInterpretation=c;const b=32,T=[],k=[],y=[];for(let v=0;v<o;v+=1){T.push(0);const C=new Float32Array(b),S=new Float32Array(b);C.fill(0),S.fill(0),k.push(C),y.push(S)}_.onaudioprocess=v=>{const C=v.inputBuffer,S=v.outputBuffer,N=C.numberOfChannels;for(let A=0;A<N;A+=1){const E=C.getChannelData(A),O=S.getChannelData(A);T[A]=bo(d,f,p,g,m,k[A],y[A],T[A],b,E,O)}};const x=i.sampleRate/2;return rs({get bufferSize(){return u},get channelCount(){return _.channelCount},set channelCount(v){_.channelCount=v},get channelCountMode(){return _.channelCountMode},set channelCountMode(v){_.channelCountMode=v},get channelInterpretation(){return _.channelInterpretation},set channelInterpretation(v){_.channelInterpretation=v},get context(){return _.context},get inputs(){return[_]},get numberOfInputs(){return _.numberOfInputs},get numberOfOutputs(){return _.numberOfOutputs},addEventListener(...v){return _.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return _.dispatchEvent(v[0])},getFrequencyResponse(v,C,S){if(v.length!==C.length||C.length!==S.length)throw n();const N=v.length;for(let A=0;A<N;A+=1){const E=-Math.PI*(v[A]/x),O=[Math.cos(E),Math.sin(E)],V=Sr(p,O),M=Sr(d,O),$=Vh(V,M);C[A]=Math.sqrt($[0]*$[0]+$[1]*$[1]),S[A]=Math.atan2($[1],$[0])}},removeEventListener(...v){return _.removeEventListener(v[0],v[1],v[2])}},_)},Uh=(n,e)=>n.createMediaElementSource(e.mediaElement),Bh=(n,e)=>{const t=n.createMediaStreamDestination();return _e(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},jh=(n,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const s=t.slice(0,1),i=n.createMediaStreamSource(new MediaStream(s));return Object.defineProperty(i,"mediaStream",{value:e}),i},qh=(n,e)=>(t,{mediaStreamTrack:s})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(s);const i=new MediaStream([s]),r=t.createMediaStreamSource(i);if(s.kind!=="audio")throw n();if(e(t))throw new TypeError;return r},Wh=n=>n===null?null:n.hasOwnProperty("OfflineAudioContext")?n.OfflineAudioContext:n.hasOwnProperty("webkitOfflineAudioContext")?n.webkitOfflineAudioContext:null,zh=(n,e,t,s,i,r)=>(o,a)=>{const c=o.createOscillator();return _e(c,a),he(c,a,"detune"),he(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):oe(c,a,"type"),e(t,()=>t(o))||wi(c),e(s,()=>s(o))||r(c,o),e(i,()=>i(o))||bi(c),n(o,c),c},Gh=n=>(e,t)=>{const s=e.createPanner();return s.orientationX===void 0?n(e,t):(_e(s,t),he(s,t,"orientationX"),he(s,t,"orientationY"),he(s,t,"orientationZ"),he(s,t,"positionX"),he(s,t,"positionY"),he(s,t,"positionZ"),oe(s,t,"coneInnerAngle"),oe(s,t,"coneOuterAngle"),oe(s,t,"coneOuterGain"),oe(s,t,"distanceModel"),oe(s,t,"maxDistance"),oe(s,t,"panningModel"),oe(s,t,"refDistance"),oe(s,t,"rolloffFactor"),s)},Yh=(n,e,t,s,i,r,o,a,c,l)=>(h,{coneInnerAngle:u,coneOuterAngle:d,coneOuterGain:p,distanceModel:f,maxDistance:g,orientationX:m,orientationY:_,orientationZ:b,panningModel:T,positionX:k,positionY:y,positionZ:x,refDistance:w,rolloffFactor:v,...C})=>{const S=h.createPanner();if(C.channelCount>2||C.channelCountMode==="max")throw o();_e(S,C);const N={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},A=t(h,{...N,channelInterpretation:"speakers",numberOfInputs:6}),E=s(h,{...C,gain:1}),O=s(h,{...N,gain:1}),V=s(h,{...N,gain:0}),M=s(h,{...N,gain:0}),$=s(h,{...N,gain:0}),W=s(h,{...N,gain:0}),F=s(h,{...N,gain:0}),j=i(h,256,6,1),B=r(h,{...N,curve:new Float32Array([1,1]),oversample:"none"});let K=[m,_,b],$e=[k,y,x];const Pe=new Float32Array(1);j.onaudioprocess=({inputBuffer:P})=>{const At=[c(P,Pe,0),c(P,Pe,1),c(P,Pe,2)];At.some((Bt,jt)=>Bt!==K[jt])&&(S.setOrientation(...At),K=At);const kt=[c(P,Pe,3),c(P,Pe,4),c(P,Pe,5)];kt.some((Bt,jt)=>Bt!==$e[jt])&&(S.setPosition(...kt),$e=kt)},Object.defineProperty(V.gain,"defaultValue",{get:()=>0}),Object.defineProperty(M.gain,"defaultValue",{get:()=>0}),Object.defineProperty($.gain,"defaultValue",{get:()=>0}),Object.defineProperty(W.gain,"defaultValue",{get:()=>0}),Object.defineProperty(F.gain,"defaultValue",{get:()=>0});const G={get bufferSize(){},get channelCount(){return S.channelCount},set channelCount(P){if(P>2)throw o();E.channelCount=P,S.channelCount=P},get channelCountMode(){return S.channelCountMode},set channelCountMode(P){if(P==="max")throw o();E.channelCountMode=P,S.channelCountMode=P},get channelInterpretation(){return S.channelInterpretation},set channelInterpretation(P){E.channelInterpretation=P,S.channelInterpretation=P},get coneInnerAngle(){return S.coneInnerAngle},set coneInnerAngle(P){S.coneInnerAngle=P},get coneOuterAngle(){return S.coneOuterAngle},set coneOuterAngle(P){S.coneOuterAngle=P},get coneOuterGain(){return S.coneOuterGain},set coneOuterGain(P){if(P<0||P>1)throw e();S.coneOuterGain=P},get context(){return S.context},get distanceModel(){return S.distanceModel},set distanceModel(P){S.distanceModel=P},get inputs(){return[E]},get maxDistance(){return S.maxDistance},set maxDistance(P){if(P<0)throw new RangeError;S.maxDistance=P},get numberOfInputs(){return S.numberOfInputs},get numberOfOutputs(){return S.numberOfOutputs},get orientationX(){return O.gain},get orientationY(){return V.gain},get orientationZ(){return M.gain},get panningModel(){return S.panningModel},set panningModel(P){S.panningModel=P},get positionX(){return $.gain},get positionY(){return W.gain},get positionZ(){return F.gain},get refDistance(){return S.refDistance},set refDistance(P){if(P<0)throw new RangeError;S.refDistance=P},get rolloffFactor(){return S.rolloffFactor},set rolloffFactor(P){if(P<0)throw new RangeError;S.rolloffFactor=P},addEventListener(...P){return E.addEventListener(P[0],P[1],P[2])},dispatchEvent(...P){return E.dispatchEvent(P[0])},removeEventListener(...P){return E.removeEventListener(P[0],P[1],P[2])}};u!==G.coneInnerAngle&&(G.coneInnerAngle=u),d!==G.coneOuterAngle&&(G.coneOuterAngle=d),p!==G.coneOuterGain&&(G.coneOuterGain=p),f!==G.distanceModel&&(G.distanceModel=f),g!==G.maxDistance&&(G.maxDistance=g),m!==G.orientationX.value&&(G.orientationX.value=m),_!==G.orientationY.value&&(G.orientationY.value=_),b!==G.orientationZ.value&&(G.orientationZ.value=b),T!==G.panningModel&&(G.panningModel=T),k!==G.positionX.value&&(G.positionX.value=k),y!==G.positionY.value&&(G.positionY.value=y),x!==G.positionZ.value&&(G.positionZ.value=x),w!==G.refDistance&&(G.refDistance=w),v!==G.rolloffFactor&&(G.rolloffFactor=v),(K[0]!==1||K[1]!==0||K[2]!==0)&&S.setOrientation(...K),($e[0]!==0||$e[1]!==0||$e[2]!==0)&&S.setPosition(...$e);const re=()=>{E.connect(S),n(E,B,0,0),B.connect(O).connect(A,0,0),B.connect(V).connect(A,0,1),B.connect(M).connect(A,0,2),B.connect($).connect(A,0,3),B.connect(W).connect(A,0,4),B.connect(F).connect(A,0,5),A.connect(j).connect(h.destination)},Ne=()=>{E.disconnect(S),a(E,B,0,0),B.disconnect(O),O.disconnect(A),B.disconnect(V),V.disconnect(A),B.disconnect(M),M.disconnect(A),B.disconnect($),$.disconnect(A),B.disconnect(W),W.disconnect(A),B.disconnect(F),F.disconnect(A),A.disconnect(j),j.disconnect(h.destination)};return l(rs(G,S),re,Ne)},Hh=n=>(e,{disableNormalization:t,imag:s,real:i})=>{const r=s instanceof Float32Array?s:new Float32Array(s),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(s).length<2)throw n();return a},Ms=(n,e,t,s)=>n.createScriptProcessor(e,t,s),Xh=(n,e)=>(t,s)=>{const i=s.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return n(t,s);const r=t.createStereoPanner();return _e(r,s),he(r,s,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},Zh=(n,e,t,s,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},h={...l,oversample:"none"},u=(f,g,m,_)=>{const b=new Float32Array(16385),T=new Float32Array(16385);for(let C=0;C<16385;C+=1){const S=C/16384*c;b[C]=Math.cos(S),T[C]=Math.sin(S)}const k=t(f,{...l,gain:0}),y=s(f,{...h,curve:b}),x=s(f,{...h,curve:a}),w=t(f,{...l,gain:0}),v=s(f,{...h,curve:T});return{connectGraph(){g.connect(k),g.connect(x.inputs===void 0?x:x.inputs[0]),g.connect(w),x.connect(m),m.connect(y.inputs===void 0?y:y.inputs[0]),m.connect(v.inputs===void 0?v:v.inputs[0]),y.connect(k.gain),v.connect(w.gain),k.connect(_,0,0),w.connect(_,0,1)},disconnectGraph(){g.disconnect(k),g.disconnect(x.inputs===void 0?x:x.inputs[0]),g.disconnect(w),x.disconnect(m),m.disconnect(y.inputs===void 0?y:y.inputs[0]),m.disconnect(v.inputs===void 0?v:v.inputs[0]),y.disconnect(k.gain),v.disconnect(w.gain),k.disconnect(_,0,0),w.disconnect(_,0,1)}}},d=(f,g,m,_)=>{const b=new Float32Array(16385),T=new Float32Array(16385),k=new Float32Array(16385),y=new Float32Array(16385),x=Math.floor(16385/2);for(let $=0;$<16385;$+=1)if($>x){const W=($-x)/(16384-x)*c;b[$]=Math.cos(W),T[$]=Math.sin(W),k[$]=0,y[$]=1}else{const W=$/(16384-x)*c;b[$]=1,T[$]=0,k[$]=Math.cos(W),y[$]=Math.sin(W)}const w=e(f,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),v=t(f,{...l,gain:0}),C=s(f,{...h,curve:b}),S=t(f,{...l,gain:0}),N=s(f,{...h,curve:T}),A=s(f,{...h,curve:a}),E=t(f,{...l,gain:0}),O=s(f,{...h,curve:k}),V=t(f,{...l,gain:0}),M=s(f,{...h,curve:y});return{connectGraph(){g.connect(w),g.connect(A.inputs===void 0?A:A.inputs[0]),w.connect(v,0),w.connect(S,0),w.connect(E,1),w.connect(V,1),A.connect(m),m.connect(C.inputs===void 0?C:C.inputs[0]),m.connect(N.inputs===void 0?N:N.inputs[0]),m.connect(O.inputs===void 0?O:O.inputs[0]),m.connect(M.inputs===void 0?M:M.inputs[0]),C.connect(v.gain),N.connect(S.gain),O.connect(E.gain),M.connect(V.gain),v.connect(_,0,0),E.connect(_,0,0),S.connect(_,0,1),V.connect(_,0,1)},disconnectGraph(){g.disconnect(w),g.disconnect(A.inputs===void 0?A:A.inputs[0]),w.disconnect(v,0),w.disconnect(S,0),w.disconnect(E,1),w.disconnect(V,1),A.disconnect(m),m.disconnect(C.inputs===void 0?C:C.inputs[0]),m.disconnect(N.inputs===void 0?N:N.inputs[0]),m.disconnect(O.inputs===void 0?O:O.inputs[0]),m.disconnect(M.inputs===void 0?M:M.inputs[0]),C.disconnect(v.gain),N.disconnect(S.gain),O.disconnect(E.gain),M.disconnect(V.gain),v.disconnect(_,0,0),E.disconnect(_,0,0),S.disconnect(_,0,1),V.disconnect(_,0,1)}}},p=(f,g,m,_,b)=>{if(g===1)return u(f,m,_,b);if(g===2)return d(f,m,_,b);throw i()};return(f,{channelCount:g,channelCountMode:m,pan:_,...b})=>{if(m==="max")throw i();const T=n(f,{...b,channelCount:1,channelCountMode:m,numberOfInputs:2}),k=t(f,{...b,channelCount:g,channelCountMode:m,gain:1}),y=t(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:_});let{connectGraph:x,disconnectGraph:w}=p(f,g,k,y,T);Object.defineProperty(y.gain,"defaultValue",{get:()=>0}),Object.defineProperty(y.gain,"maxValue",{get:()=>1}),Object.defineProperty(y.gain,"minValue",{get:()=>-1});const v={get bufferSize(){},get channelCount(){return k.channelCount},set channelCount(A){k.channelCount!==A&&(C&&w(),{connectGraph:x,disconnectGraph:w}=p(f,A,k,y,T),C&&x()),k.channelCount=A},get channelCountMode(){return k.channelCountMode},set channelCountMode(A){if(A==="clamped-max"||A==="max")throw i();k.channelCountMode=A},get channelInterpretation(){return k.channelInterpretation},set channelInterpretation(A){k.channelInterpretation=A},get context(){return k.context},get inputs(){return[k]},get numberOfInputs(){return k.numberOfInputs},get numberOfOutputs(){return k.numberOfOutputs},get pan(){return y.gain},addEventListener(...A){return k.addEventListener(A[0],A[1],A[2])},dispatchEvent(...A){return k.dispatchEvent(A[0])},removeEventListener(...A){return k.removeEventListener(A[0],A[1],A[2])}};let C=!1;const S=()=>{x(),C=!0},N=()=>{w(),C=!1};return r(rs(v,T),S,N)}},Qh=(n,e,t,s,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);_e(l,c);const h=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(h!==null&&h.length<2)throw e();oe(l,{curve:h},"curve"),oe(l,c,"oversample");let u=null,d=!1;return o(l,"curve",g=>()=>g.call(l),g=>m=>(g.call(l,m),d&&(s(m)&&u===null?u=n(a,l):!s(m)&&u!==null&&(u(),u=null)),m)),i(l,()=>{d=!0,s(l.curve)&&(u=n(a,l))},()=>{d=!1,u!==null&&(u(),u=null)})},Jh=(n,e,t,s,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),h=r.createWaveShaper();_e(l,c),_e(h,c);const u=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),f=t(r,{...c,gain:-1});let g=null,m=!1,_=null;const b={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(y){u.channelCount=y,d.channelCount=y,l.channelCount=y,p.channelCount=y,h.channelCount=y,f.channelCount=y},get channelCountMode(){return l.channelCountMode},set channelCountMode(y){u.channelCountMode=y,d.channelCountMode=y,l.channelCountMode=y,p.channelCountMode=y,h.channelCountMode=y,f.channelCountMode=y},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(y){u.channelInterpretation=y,d.channelInterpretation=y,l.channelInterpretation=y,p.channelInterpretation=y,h.channelInterpretation=y,f.channelInterpretation=y},get context(){return l.context},get curve(){return _},set curve(y){if(y!==null&&y.length<2)throw e();if(y===null)l.curve=y,h.curve=y;else{const x=y.length,w=new Float32Array(x+2-x%2),v=new Float32Array(x+2-x%2);w[0]=y[0],v[0]=-y[x-1];const C=Math.ceil((x+1)/2),S=(x+1)/2-1;for(let N=1;N<C;N+=1){const A=N/C*S,E=Math.floor(A),O=Math.ceil(A);w[N]=E===O?y[E]:(1-(A-E))*y[E]+(1-(O-A))*y[O],v[N]=E===O?-y[x-1-E]:-((1-(A-E))*y[x-1-E])-(1-(O-A))*y[x-1-O]}w[C]=x%2===1?y[C-1]:(y[C-2]+y[C-1])/2,l.curve=w,h.curve=v}_=y,m&&(s(_)&&g===null?g=n(r,u):g!==null&&(g(),g=null))},get inputs(){return[u]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(y){l.oversample=y,h.oversample=y},addEventListener(...y){return u.addEventListener(y[0],y[1],y[2])},dispatchEvent(...y){return u.dispatchEvent(y[0])},removeEventListener(...y){return u.removeEventListener(y[0],y[1],y[2])}};o!==null&&(b.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==b.oversample&&(b.oversample=a);const T=()=>{u.connect(l).connect(p),u.connect(d).connect(h).connect(f).connect(p),m=!0,s(_)&&(g=n(r,u))},k=()=>{u.disconnect(l),l.disconnect(p),u.disconnect(d),d.disconnect(h),h.disconnect(f),f.disconnect(p),m=!1,g!==null&&(g(),g=null)};return i(rs(b,p),T,k)},Ie=()=>new DOMException("","NotSupportedError"),Kh={numberOfChannels:1},eu=(n,e,t,s,i)=>class extends n{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:h,numberOfChannels:u,sampleRate:d}={...Kh,...l},p=s(u,h,d);e(ws,()=>ws(p))||p.addEventListener("statechange",(()=>{let f=0;const g=m=>{this._state==="running"&&(f>0?(p.removeEventListener("statechange",g),m.stopImmediatePropagation(),this._waitForThePromiseToSettle(m)):f+=1)};return g})()),super(p,u),this._length=h,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,go(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},tu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},su=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...tu,...l},d=t(h,u),p=r(h),f=p?s():null,g=c.sampleRate/2;super(c,!1,d,f),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,g,-g),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=f,this._oscillatorNodeRenderer!==null&&u.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=u.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const h=this._nativeOscillatorNode.onended;this._onended=h!==null&&h===l?c:h}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){es(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),at(this)&&Cs(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},nu=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(h,u)=>{let d=t(h);const p=ke(d,u);if(!p){const f={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(u,f),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(u,d),p?(await n(u,h.detune,d.detune),await n(u,h.frequency,d.frequency)):(await s(u,h.detune,d.detune),await s(u,h.frequency,d.frequency)),await i(h,u,d),d};return{set periodicWave(h){o=h},set start(h){a=h},set stop(h){c=h},render(h,u){const d=r.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},iu={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},ru=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...iu,...l},d=t(h,u),p=r(h),f=p?s():null;super(c,!1,d,f),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Se,Ee),this._orientationY=e(this,p,d.orientationY,Se,Ee),this._orientationZ=e(this,p,d.orientationZ,Se,Ee),this._positionX=e(this,p,d.positionX,Se,Ee),this._positionY=e(this,p,d.positionY,Se,Ee),this._positionZ=e(this,p,d.positionZ,Se,Ee),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},ou=(n,e,t,s,i,r,o,a,c,l)=>()=>{const h=new WeakMap;let u=null;const d=async(p,f)=>{let g=null,m=r(p);const _={channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation},b={..._,coneInnerAngle:m.coneInnerAngle,coneOuterAngle:m.coneOuterAngle,coneOuterGain:m.coneOuterGain,distanceModel:m.distanceModel,maxDistance:m.maxDistance,panningModel:m.panningModel,refDistance:m.refDistance,rolloffFactor:m.rolloffFactor},T=ke(m,f);if("bufferSize"in m)g=s(f,{..._,gain:1});else if(!T){const k={...b,orientationX:m.orientationX.value,orientationY:m.orientationY.value,orientationZ:m.orientationZ.value,positionX:m.positionX.value,positionY:m.positionY.value,positionZ:m.positionZ.value};m=i(f,k)}if(h.set(f,g===null?m:g),g!==null){if(u===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const N=new o(6,p.context.length,f.sampleRate),A=e(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});A.connect(N.destination),u=(async()=>{const E=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(O,V)=>{const M=t(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:V===0?1:0});return await a(N,O,M.offset),M}));for(let O=0;O<6;O+=1)E[O].connect(A,0,O),E[O].start(0);return l(N)})()}const k=await u,y=s(f,{..._,gain:1});await c(p,f,y);const x=[];for(let N=0;N<k.numberOfChannels;N+=1)x.push(k.getChannelData(N));let w=[x[0][0],x[1][0],x[2][0]],v=[x[3][0],x[4][0],x[5][0]],C=s(f,{..._,gain:1}),S=i(f,{...b,orientationX:w[0],orientationY:w[1],orientationZ:w[2],positionX:v[0],positionY:v[1],positionZ:v[2]});y.connect(C).connect(S.inputs[0]),S.connect(g);for(let N=128;N<k.length;N+=128){const A=[x[0][N],x[1][N],x[2][N]],E=[x[3][N],x[4][N],x[5][N]];if(A.some((O,V)=>O!==w[V])||E.some((O,V)=>O!==v[V])){w=A,v=E;const O=N/f.sampleRate;C.gain.setValueAtTime(0,O),C=s(f,{..._,gain:0}),S=i(f,{...b,orientationX:w[0],orientationY:w[1],orientationZ:w[2],positionX:v[0],positionY:v[1],positionZ:v[2]}),C.gain.setValueAtTime(1,O),y.connect(C).connect(S.inputs[0]),S.connect(g)}}return g}return T?(await n(f,p.orientationX,m.orientationX),await n(f,p.orientationY,m.orientationY),await n(f,p.orientationZ,m.orientationZ),await n(f,p.positionX,m.positionX),await n(f,p.positionY,m.positionY),await n(f,p.positionZ,m.positionZ)):(await a(f,p.orientationX,m.orientationX),await a(f,p.orientationY,m.orientationY),await a(f,p.orientationZ,m.orientationZ),await a(f,p.positionX,m.positionX),await a(f,p.positionY,m.positionY),await a(f,p.positionZ,m.positionZ)),is(m)?await c(p,f,m.inputs[0]):await c(p,f,m),m};return{render(p,f){const g=h.get(f);return g!==void 0?Promise.resolve(g):d(p,f)}}},au={disableNormalization:!1},cu=(n,e,t,s)=>class No{constructor(r,o){const a=e(r),c=s({...au,...o}),l=n(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===No.prototype||t.has(r)}},lu=(n,e)=>(t,s,i)=>(n(s).replay(i),e(s,t,i)),hu=(n,e,t)=>async(s,i,r)=>{const o=n(s);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,h])=>{const d=await e(l).render(l,i),p=s.context.destination;!t(l)&&(s!==p||!t(s))&&d.connect(r,h,c)})).reduce((a,c)=>[...a,...c],[]))},uu=(n,e,t)=>async(s,i,r)=>{const o=e(s);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const h=await n(a).render(a,i);t(a)||h.connect(r,c)}))},du=(n,e,t,s)=>i=>n(ws,()=>ws(i))?Promise.resolve(n(s,s)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),pu=n=>(e,t)=>{n.set(e,t)},fu=n=>(e,t)=>n.set(e,t),mu=(n,e,t,s,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(s(l)).map(h=>t(h).render(h,l)))).then(()=>i(l)).then(h=>(typeof h.copyFromChannel!="function"?(o(h),yi(h)):e(r,()=>r(h))||a(h),n.add(h),h)),gu={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},_u=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...gu,...c},u=t(l,h),d=r(l),p=d?s():null;super(a,!1,u,p),this._pan=e(this,d,u.pan)}get pan(){return this._pan}},yu=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=ke(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.pan,l.pan):await s(c,a.pan,l.pan),is(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},vu=n=>()=>{if(n===null)return!1;try{new n({length:1,sampleRate:44100})}catch{return!1}return!0},xu=(n,e)=>async()=>{if(n===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),s=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await s.audioWorklet.addModule(i);const a=new n(s,"a",{numberOfOutputs:0}),c=s.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await s.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},wu=(n,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),s=n(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{s.disconnect(),i(t.currentTime!==0)},t.startRendering()})},bu=()=>new DOMException("","UnknownError"),Tu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},Au=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...Tu,...l},d=t(h,u),f=r(h)?s():null;super(c,!0,d,f),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},ku=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!ke(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=n(o,l)}return s.set(o,a),is(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Nu=()=>typeof window>"u"?null:window,Su=(n,e)=>t=>{t.copyFromChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)s[u]=l[u+o]},t.copyToChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)l[u+o]=s[u]}},Cu=n=>e=>{e.copyFromChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyToChannel)},Iu=n=>(e,t)=>{const s=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=s),n(e,"buffer",i=>()=>{const r=i.call(e);return r===s?null:r},i=>r=>i.call(e,r===null?s:r))},Ou=(n,e)=>(t,s)=>{s.channelCount=1,s.channelCountMode="explicit",Object.defineProperty(s,"channelCount",{get:()=>1,set:()=>{throw n()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:()=>{throw n()}});const i=t.createBufferSource();e(s,()=>{const a=s.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(s,0,c)},()=>i.disconnect(s))},So=(n,e,t)=>n.copyFromChannel===void 0?n.getChannelData(t)[0]:(n.copyFromChannel(e,t),e[0]),Co=n=>{if(n===null)return!1;const e=n.length;return e%2!==0?n[Math.floor(e/2)]!==0:n[e/2-1]+n[e/2]!==0},Ds=(n,e,t,s)=>{let i=n;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(n,e,{get:t(r),set:s(o)})},Eu=n=>({...n,outputChannelCount:n.outputChannelCount!==void 0?n.outputChannelCount:n.numberOfInputs===1&&n.numberOfOutputs===1?[n.channelCount]:Array.from({length:n.numberOfOutputs},()=>1)}),Mu=n=>({...n,channelCount:n.numberOfOutputs}),Du=n=>{const{imag:e,real:t}=n;return e===void 0?t===void 0?{...n,imag:[0,0],real:[0,0]}:{...n,imag:Array.from(t,()=>0),real:t}:t===void 0?{...n,imag:e,real:Array.from(e,()=>0)}:{...n,imag:e,real:t}},Io=(n,e,t)=>{try{n.setValueAtTime(e,t)}catch(s){if(s.code!==9)throw s;Io(n,e,t+1e-7)}},Ru=n=>{const e=n.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},$u=n=>{const e=n.createBufferSource(),t=n.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Pu=n=>{const e=n.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},Ti=n=>{const e=n.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},Oo=n=>{const e=n.createBuffer(1,1,44100),t=n.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},Ai=n=>{const e=n.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},Vu=n=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(n)}finally{e.close(),t.close()}},Fu=n=>{n.start=(e=>(t=0,s=0,i)=>{const r=n.buffer,o=r===null?s:Math.min(r.duration,s);r!==null&&o>r.duration-.5/n.context.sampleRate?e.call(n,t,0,0):e.call(n,t,o,i)})(n.start)},Eo=(n,e)=>{const t=e.createGain();n.connect(t);const s=(i=>()=>{i.call(n,t),n.removeEventListener("ended",s)})(n.disconnect);n.addEventListener("ended",s),rs(n,t),n.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(n,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(n,o),r=!0}})(n.stop)},os=(n,e)=>t=>{const s={value:n};return Object.defineProperties(t,{currentTarget:s,target:s}),typeof e=="function"?e.call(n,t):e.handleEvent.call(n,t)},Lu=rc(Ft),Uu=uc(Ft),Bu=Tl(bn),Mo=new WeakMap,ju=Bl(Mo),Ze=Kc(new Map,new WeakMap),Ke=Nu(),Do=_h(Ze,tt),ki=Ul(Ce),be=hu(Ce,ki,Rt),qu=gc(Do,ie,be),ne=Wl(wn),ut=Wh(Ke),se=ah(ut),Ro=new WeakMap,$o=Dl(os),Rs=wh(Ke),Ni=nh(Rs),Si=ih(Ke),Po=rh(Ke),bs=Th(Ke),pe=Bc(oc(co),hc(Lu,Uu,nn,Bu,rn,Ce,ju,Ss,ie,Ft,at,Rt,Xs),Ze,Jl(ei,rn,Ce,ie,xs,at),tt,Tn,Ie,vl(nn,ei,Ce,ie,xs,ne,at,se),Nl(Ro,Ce,Ye),$o,ne,Ni,Si,Po,se,bs),Wu=mc(pe,qu,tt,Do,ne,se),Ci=new WeakSet,Cr=yh(Ke),Vo=dl(new Uint32Array(1)),Ii=Su(Vo,tt),Oi=Cu(Vo),Fo=yc(Ci,Ze,Ie,Cr,ut,vu(Cr),Ii,Oi),An=dc(De),Lo=uu(ki,Is,Rt),st=ol(Lo),as=xh(An,Ze,Ru,$u,Pu,Ti,Oo,Ai,Fu,Iu(Ds),Eo),nt=lu(jl(Is),Lo),zu=wc(st,as,ie,nt,be),Qe=jc(ac(lo),Ro,_i,qc,Ka,ec,tc,sc,nc,Qn,ro,Rs,Io),Gu=xc(pe,zu,Qe,xe,as,ne,se,os),Yu=Oc(pe,Ec,tt,xe,bh(De,Ds),ne,se,be),Hu=Jc(st,Ao,ie,nt,be),Lt=fu(Mo),Xu=Qc(pe,Qe,Hu,Tn,Ao,ne,se,Lt),bt=mh(Ft,Si),Zu=Ou(xe,bt),Tt=Oh(Rs,Zu),Qu=sl(Tt,ie,be),Ju=tl(pe,Qu,Tt,ne,se),Ku=rl(Es,ie,be),ed=il(pe,Ku,Es,ne,se,Mu),td=Dh(An,as,De,bt),cs=Mh(An,Ze,td,Ti,Ai),sd=ul(st,cs,ie,nt,be),nd=hl(pe,Qe,sd,cs,ne,se,os),Uo=Rh(Ie,Ds),id=ml(Uo,ie,be),rd=fl(pe,id,Uo,ne,se,Lt),od=bl(st,ko,ie,nt,be),ad=wl(pe,Qe,od,ko,ne,se,Lt),Bo=$h(Ie),cd=Ol(st,Bo,ie,nt,be),ld=Il(pe,Qe,cd,Bo,Ie,ne,se,Lt),hd=Fl(st,De,ie,nt,be),ud=Vl(pe,Qe,hd,De,ne,se),dd=Lh(Tn,xe,Ms,Ie),kn=du(Ze,De,Ms,wu(De,ut)),pd=Ql(as,ie,ut,be,kn),fd=Ph(dd),md=Xl(pe,fd,pd,ne,se,Lt),gd=Mc(Qe,Tt,cs,Ms,Ie,So,se,Ds),jo=new WeakMap,_d=fh(Yu,gd,$o,se,jo,os),qo=zh(An,Ze,Ti,Oo,Ai,Eo),yd=nu(st,qo,ie,nt,be),vd=su(pe,Qe,qo,yd,ne,se,os),Wo=cl(as),xd=Jh(Wo,xe,De,Co,bt),Nn=Qh(Wo,xe,xd,Co,bt,Rs,Ds),wd=Yh(nn,xe,Tt,De,Ms,Nn,Ie,rn,So,bt),zo=Gh(wd),bd=ou(st,Tt,cs,De,zo,ie,ut,nt,be,kn),Td=ru(pe,Qe,zo,bd,ne,se,Lt),Ad=Hh(tt),kd=cu(Ad,ne,new WeakSet,Du),Nd=Zh(Tt,Es,De,Nn,Ie,bt),Go=Xh(Nd,Ie),Sd=yu(st,Go,ie,nt,be),Cd=_u(pe,Qe,Go,Sd,ne,se),Id=ku(Nn,ie,be),Od=Au(pe,xe,Nn,Id,ne,se,Lt),Yo=ch(Ke),Ei=Rl(Ke),Ho=new WeakMap,Ed=zl(Ho,ut),Md=Yo?lc(Ze,Ie,Ml(Ke),Ei,$l(ic),ne,Ed,se,bs,new WeakMap,new WeakMap,xu(bs,ut),Ke):void 0,Dd=oh(Ni,se),Rd=yl(Ci,Ze,_l,El,new WeakSet,ne,Dd,tn,ws,Ii,Oi),Xo=Xc(Md,Wu,Fo,Gu,Xu,Ju,ed,nd,rd,Rd,ad,ld,ud,md,_d,vd,Td,kd,Cd,Od),$d=lh(pe,Uh,ne,se),Pd=uh(pe,Bh,ne,se),Vd=dh(pe,jh,ne,se),Fd=qh(xe,se),Ld=ph(pe,Fd,ne),Ud=Ic(Xo,xe,Ie,bu,$d,Pd,Vd,Ld,Rs),Mi=Gl(jo),Bd=pc(Mi),Zo=al(tt),jd=Al(Mi),Qo=Sl(tt),Jo=new WeakMap,qd=Ll(Jo,Ye),Wd=Ih(Zo,tt,xe,Tt,Es,cs,De,Ms,Ie,Qo,Ei,qd,bt),zd=kh(xe,Wd,De,Ie,bt),Gd=Hc(st,Zo,as,Tt,Es,cs,De,jd,Qo,Ei,ie,bs,ut,nt,be,kn),Yd=ql(Ho),Hd=pu(Jo),Ir=Yo?zc(Bd,pe,Qe,Gd,zd,Ce,Yd,ne,se,bs,Eu,Hd,Vu,os):void 0,Xd=gl(Ie,ut),Zd=mu(Ci,Ze,ki,Mi,kn,tn,Ii,Oi),Qd=eu(Xo,Ze,xe,Xd,Zd),Jd=Kl(wn,Ni),Kd=eh(gi,Si),ep=th(_i,Po),tp=sh(wn,se);function qe(n){return n===void 0}function Y(n){return n!==void 0}function sp(n){return typeof n=="function"}function ct(n){return typeof n=="number"}function Et(n){return Object.prototype.toString.call(n)==="[object Object]"&&n.constructor===Object}function np(n){return typeof n=="boolean"}function Ue(n){return Array.isArray(n)}function lt(n){return typeof n=="string"}function zs(n){return lt(n)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(n)}function L(n,e){if(!n)throw new Error(e)}function Fe(n,e,t=1/0){if(!(e<=n&&n<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${n}`)}function Ko(n){!n.isOffline&&n.state!=="running"&&Sn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let ea=!1,Or=!1;function Er(n){ea=n}function ip(n){qe(n)&&ea&&!Or&&(Or=!0,Sn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let ta=console;function rp(...n){ta.log(...n)}function Sn(...n){ta.warn(...n)}function op(n){return new Ud(n)}function ap(n,e,t){return new Qd(n,e,t)}const Ve=typeof self=="object"?self:null,cp=Ve&&(Ve.hasOwnProperty("AudioContext")||Ve.hasOwnProperty("webkitAudioContext"));function lp(n,e,t){return L(Y(Ir),"AudioWorkletNode only works in a secure context (https or localhost)"),new(n instanceof Ve?.BaseAudioContext?Ve?.AudioWorkletNode:Ir)(n,e,t)}function Je(n,e,t,s){var i=arguments.length,r=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,s);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function de(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(s.next(h))}catch(u){o(u)}}function c(h){try{l(s.throw(h))}catch(u){o(u)}}function l(h){h.done?r(h.value):i(h.value).then(a,c)}l((s=s.apply(n,e||[])).next())})}class hp{constructor(e,t,s,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=s,this._createClock()}_createWorker(){const e=new Blob([`
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
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),s=new Worker(t);s.onmessage=this._callback.bind(this),this._worker=s}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function $t(n){return ep(n)}function yt(n){return Kd(n)}function Zs(n){return tp(n)}function Gt(n){return Jd(n)}function up(n){return n instanceof Fo}function dp(n,e){return n==="value"||$t(e)||yt(e)||up(e)}function Mt(n,...e){if(!e.length)return n;const t=e.shift();if(Et(n)&&Et(t))for(const s in t)dp(s,t[s])?n[s]=t[s]:Et(t[s])?(n[s]||Object.assign(n,{[s]:{}}),Mt(n[s],t[s])):Object.assign(n,{[s]:t[s]});return Mt(n,...e)}function pp(n,e){return n.length===e.length&&n.every((t,s)=>e[s]===t)}function R(n,e,t=[],s){const i={},r=Array.from(e);if(Et(r[0])&&s&&!Reflect.has(r[0],s)&&(Object.keys(r[0]).some(a=>Reflect.has(n,a))||(Mt(i,{[s]:r[0]}),t.splice(t.indexOf(s),1),r.shift())),r.length===1&&Et(r[0]))Mt(i,r[0]);else for(let o=0;o<t.length;o++)Y(r[o])&&(i[t[o]]=r[o]);return Mt(n,i)}function fp(n){return n.constructor.getDefaults()}function Zt(n,e){return qe(n)?e:n}function Ct(n,e){return e.forEach(t=>{Reflect.has(n,t)&&delete n[t]}),n}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class dt{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||Ve&&this.toString()===Ve.TONE_DEBUG_CLASS)&&rp(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}dt.version=io;const Di=1e-6;function ts(n,e){return n>e+Di}function ri(n,e){return ts(n,e)||ze(n,e)}function ln(n,e){return n+Di<e}function ze(n,e){return Math.abs(n-e)<Di}function mp(n,e,t){return Math.max(Math.min(n,t),e)}class We extends dt{constructor(){super(),this.name="Timeline",this._timeline=[];const e=R(We.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(L(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];L(ri(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const s=this._search(e,t);return s!==-1?this._timeline[s]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const s=this._search(e,t);return s+1<this._timeline.length?this._timeline[s+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const s=this._search(e);return s-1>=0?this._timeline[s-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(ze(this._timeline[t].time,e)){for(let s=t;s>=0&&ze(this._timeline[s].time,e);s--)t=s;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&ri(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let s=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;s<r;){let o=Math.floor(s+(r-s)/2);const a=this._timeline[o],c=this._timeline[o+1];if(ze(a[t],e)){for(let l=o;l<this._timeline.length;l++){const h=this._timeline[l];if(ze(h[t],e))o=l;else break}return o}else{if(ln(a[t],e)&&ts(c[t],e))return o;ts(a[t],e)?r=o:s=o+1}}return-1}_iterate(e,t=0,s=this._timeline.length-1){this._timeline.slice(t,s+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const s=this._search(e);return s!==-1&&this._iterate(t,0,s),this}forEachAfter(e,t){const s=this._search(e);return this._iterate(t,s+1),this}forEachBetween(e,t,s){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(s,i,r)):i===-1&&this._iterate(s,0,r),this}forEachFrom(e,t){let s=this._search(e);for(;s>=0&&this._timeline[s].time>=e;)s--;return this._iterate(t,s+1),this}forEachAtTime(e,t){const s=this._search(e);if(s!==-1&&ze(this._timeline[s].time,e)){let i=s;for(let r=s;r>=0&&ze(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,s)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const sa=[];function Cn(n){sa.push(n)}function gp(n){sa.forEach(e=>e(n))}const na=[];function In(n){na.push(n)}function _p(n){na.forEach(e=>e(n))}class $s extends dt{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(qe(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const s=this._events[e].slice(0);for(let i=0,r=s.length;i<r;i++)s[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const s=Object.getOwnPropertyDescriptor($s.prototype,t);Object.defineProperty(e.prototype,t,s)})}dispose(){return super.dispose(),this._events=void 0,this}}class ia extends $s{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class Ps extends ia{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new We,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const s=R(Ps.getDefaults(),arguments,["context"]);s.context?(this._context=s.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=op({latencyHint:s.latencyHint}),this._latencyHint=s.latencyHint),this._ticker=new hp(this.emit.bind(this,"tick"),s.clockSource,s.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=s.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(gp(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,s){return this._context.createBuffer(e,t,s)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,s){return this._context.createPeriodicWave(e,t,s)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return L(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return L(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return L(Gt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){L(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){L(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){L(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){L(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return lp(this.rawContext,e,t)}addAudioWorkletModule(e){return de(this,void 0,void 0,function*(){L(Y(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return de(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return Gt(this._context)?this._context.resume():Promise.resolve()}close(){return de(this,void 0,void 0,function*(){Gt(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&_p(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),s=t.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const s=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:s+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const s=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:s,time:r+t})};return i(),s}}class yp extends ia{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,s){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,s){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return de(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function H(n,e){Ue(e)?e.forEach(t=>H(n,t)):Object.defineProperty(n,e,{enumerable:!0,writable:!1})}function Ri(n,e){Ue(e)?e.forEach(t=>Ri(n,t)):Object.defineProperty(n,e,{writable:!0})}const Q=()=>{};class ee extends dt{constructor(){super(),this.name="ToneAudioBuffer",this.onload=Q;const e=R(ee.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,lt(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:Q,onload:Q,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:je().sampleRate}set(e){return e instanceof ee?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return de(this,void 0,void 0,function*(){const t=ee.load(e).then(s=>{this.set(s),this.onload(this)});ee.downloads.push(t);try{yield t}finally{const s=ee.downloads.indexOf(t);ee.downloads.splice(s,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=Ue(e)&&e[0].length>0,s=t?e.length:1,i=t?e[0].length:e.length,r=je(),o=r.createBuffer(s,i,r.sampleRate),a=!t&&s===1?[e]:e;for(let c=0;c<s;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(ct(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const s=this.numberOfChannels;for(let i=0;i<s;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/s),this.fromArray(t)}return this}toArray(e){if(ct(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let s=0;s<this.numberOfChannels;s++)t[s]=this.getChannelData(s);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){L(this.loaded,"Buffer is not loaded");const s=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);L(s<i,"The start time must be less than the end time");const r=i-s,o=je().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(s,i),a);return new ee(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ee().fromArray(e)}static fromUrl(e){return de(this,void 0,void 0,function*(){return yield new ee().load(e)})}static load(e){return de(this,void 0,void 0,function*(){const t=ee.baseUrl===""||ee.baseUrl.endsWith("/")?ee.baseUrl:ee.baseUrl+"/",s=yield fetch(t+e);if(!s.ok)throw new Error(`could not load url: ${e}`);const i=yield s.arrayBuffer();return yield je().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),s=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+s)!==""}static loaded(){return de(this,void 0,void 0,function*(){for(yield Promise.resolve();ee.downloads.length;)yield ee.downloads[0]})}}ee.baseUrl="";ee.downloads=[];class On extends Ps{constructor(){super({clockSource:"offline",context:Zs(arguments[0])?arguments[0]:ap(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Zs(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Zs(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return de(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const s=Math.floor(this.sampleRate/128);e&&t%s===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return de(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ee(t)})}close(){return Promise.resolve()}}const ra=new yp;let It=ra;function je(){return It===ra&&cp&&vp(new Ps),It}function vp(n,e=!1){e&&It.dispose(),Gt(n)?It=new Ps(n):Zs(n)?It=new On(n):It=n}function xp(){return It.resume()}if(Ve&&!Ve.TONE_SILENCE_LOGGING){const e=` * Tone.js v${io} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function wp(n){return Math.pow(10,n/20)}function bp(n){return 20*(Math.log(n)/Math.LN10)}function oa(n){return Math.pow(2,n/12)}let En=440;function Tp(){return En}function Ap(n){En=n}function Ot(n){return Math.round(aa(n))}function aa(n){return 69+12*Math.log2(n/En)}function ca(n){return En*Math.pow(2,(n-69)/12)}class $i extends dt{constructor(e,t,s){super(),this.defaultUnits="s",this._val=t,this._units=s,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const s=parseInt(e,10),i=t==="."?1.5:1;return s===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/s)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,s)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i+=this._beatsToUnits(parseFloat(s)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof $i&&this.fromType(this._val),qe(this._val))return this._noArg();if(lt(this._val)&&qe(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(Et(this._val)){let e=0;for(const t in this._val)if(Y(this._val[t])){const s=this._val[t],i=new this.constructor(this.context,t).valueOf()*s;e+=i}return e}if(Y(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return lt(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class Ge extends $i{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new Ge(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const s=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/s)*s-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let s=t[0],i=new Ge(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new Ge(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(s=r,i=o)}),s}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const s=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[s,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Ot(this.toFrequency())}_now(){return this.context.now()}}class Le extends Ge{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Tp()}static set A4(e){Ap(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:Le.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=kp[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:Le.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,s){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i*=this._beatsToUnits(parseFloat(s)/4)),i}}})}transpose(e){return new Le(this.context,this.valueOf()*oa(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Ot(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/Le.A4);let s=Math.round(12*t)+57;const i=Math.floor(s/12);return i<0&&(s+=-12*i),Np[s%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return ca(e)}static ftom(e){return Ot(e)}}const kp={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},Np=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class gs extends Ge{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Me extends dt{constructor(){super();const e=R(Me.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:je()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return ip(e),new Ge(this.context,e).toSeconds()}toFrequency(e){return new Le(this.context,e).toFrequency()}toTicks(e){return new gs(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(s=>{qe(e[s])&&delete t[s]}),t}get(){const e=fp(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const s=this[t];Y(s)&&Y(s.value)&&Y(s.setValueAtTime)?e[t]=s.value:s instanceof Me?e[t]=s._getPartialProperties(e[t]):Ue(s)||ct(s)||lt(s)||np(s)?e[t]=s:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&Y(this[t])&&(this[t]&&Y(this[t].value)&&Y(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Me?this[t].set(e[t]):this[t]=e[t])}),this}}class Pi extends We{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,s){return Fe(t,0),this.add(Object.assign({},s,{state:e,time:t})),this}getLastState(e,t){const s=this._search(t);for(let i=s;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const s=this._search(t);if(s!==-1)for(let i=s;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class z extends Me{constructor(){const e=R(z.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,L(Y(e.param)&&($t(e.param)||e.param instanceof z),"param must be an AudioParam");!$t(e.param);)e.param=e.param._param;this._swappable=Y(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new We(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,Y(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Me.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return Y(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return Y(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return Y(this.maxValue)&&Y(this.minValue)&&Fe(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?wp(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?bp(e):e}setValueAtTime(e,t){const s=this.toSeconds(t),i=this._fromType(e);return L(isFinite(i)&&isFinite(s),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,s),this._events.add({time:s,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,s),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),s=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(s===null||s.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(s===null)r=i.value;else if(s.type==="linearRampToValueAtTime"||s.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}s.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,s.time,s.value,t):r=this._exponentialInterpolate(i.time,o,s.time,s.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const s=this._fromType(e),i=this.toSeconds(t);return L(isFinite(s)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this._events.add({time:i,type:"linearRampToValueAtTime",value:s}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(s,i),this}exponentialRampToValueAtTime(e,t){let s=this._fromType(e);s=ze(s,0)?this._minOutput:s,this._assertRange(s);const i=this.toSeconds(t);return L(isFinite(s)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:s}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(s,i),this}exponentialRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialRampToValueAtTime(e,s+this.toSeconds(t)),this}linearRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.linearRampToValueAtTime(e,s+this.toSeconds(t)),this}targetRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialApproachValueAtTime(e,s,t),this}exponentialApproachValueAtTime(e,t,s){t=this.toSeconds(t),s=this.toSeconds(s);const i=Math.log(s+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+s*.9),this.linearRampToValueAtTime(e,t+s),this}setTargetAtTime(e,t,s){const i=this._fromType(e);L(isFinite(s)&&s>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),L(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:s,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,s),this._param.setTargetAtTime(i,r,s),this}setValueCurveAtTime(e,t,s,i=1){s=this.toSeconds(s),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=s/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return L(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),s=this._fromType(this.getValueAtTime(t));L(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+s);const i=this._events.get(t),r=this._events.getAfter(t);return i&&ze(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(s),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(s),t)),this._events.add({time:t,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,t),this}rampTo(e,t=.1,s){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,s):this.linearRampTo(e,t,s),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const s=this._events.get(t);if(s&&s.type==="setTargetAtTime"){const i=this._events.getAfter(s.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){L(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,s,i,r){return s+(t-s)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,s,i,r){return t+(i-t)*((r-e)/(s-e))}_exponentialInterpolate(e,t,s,i,r){return t*Math.pow(i/t,(r-e)/(s-e))}}class D extends Me{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return Y(this.input)?$t(this.input)||this.input instanceof z?1:this.input.numberOfInputs:0}get numberOfOutputs(){return Y(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return Y(e)&&(e instanceof D||yt(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(s=>{s.channelCount=e.channelCount,s.channelCountMode=e.channelCountMode,s.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();L(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,s=0){return He(this,e,t,s),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return Sn("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,s=0){return la(this,e,t,s),this}chain(...e){return Pt(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),Y(this.input)&&(this.input instanceof D?this.input.dispose():yt(this.input)&&this.input.disconnect()),Y(this.output)&&(this.output instanceof D?this.output.dispose():yt(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Pt(...n){const e=n.shift();n.reduce((t,s)=>(t instanceof D?t.connect(s):yt(t)&&He(t,s),s),e)}function He(n,e,t=0,s=0){for(L(Y(n),"Cannot connect from undefined node"),L(Y(e),"Cannot connect to undefined node"),(e instanceof D||yt(e))&&L(e.numberOfInputs>0,"Cannot connect to node with no inputs"),L(n.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof D||e instanceof z;)Y(e.input)&&(e=e.input);for(;n instanceof D;)Y(n.output)&&(n=n.output);$t(e)?n.connect(e,t):n.connect(e,t,s)}function la(n,e,t=0,s=0){if(Y(e))for(;e instanceof D;)e=e.input;for(;!yt(n);)Y(n.output)&&(n=n.output);$t(e)?n.disconnect(e,t):yt(e)?n.disconnect(e,t,s):n.disconnect()}class Z extends D{constructor(){const e=R(Z.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new z({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),H(this,"gain")}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class ss extends D{constructor(e){super(e),this.onended=Q,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new Z({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const s=this.toSeconds(t);return this._startTime!==-1&&s>=this._startTime&&(this._stopTime===-1||s<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(D.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:Q})}_startGain(e,t=1){L(this._startTime===-1,"Source cannot be started more than once");const s=this.toSeconds(this._fadeIn);return this._startTime=e+s,this._startTime=Math.max(this._startTime,this.context.currentTime),s>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+s):this._gainNode.gain.exponentialApproachValueAtTime(t,e,s)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){L(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const s=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+s),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==Q&&(this.onended(this),this.onended=Q,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),L(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=Q,this}}class Vi extends ss{constructor(){const e=R(Vi.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),He(this._source,this._gainNode),this.offset=new z({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(ss.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class te extends D{constructor(){const e=R(te.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new Vi({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,s=0){return Mn(this,e,t,s),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,s){return this._param.exponentialRampTo(e,t,s),this}linearRampTo(e,t,s){return this._param.linearRampTo(e,t,s),this}targetRampTo(e,t,s){return this._param.targetRampTo(e,t,s),this}exponentialApproachValueAtTime(e,t,s){return this._param.exponentialApproachValueAtTime(e,t,s),this}setTargetAtTime(e,t,s){return this._param.setTargetAtTime(e,t,s),this}setValueCurveAtTime(e,t,s,i){return this._param.setValueCurveAtTime(e,t,s,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,s){return this._param.rampTo(e,t,s),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function Mn(n,e,t,s){(e instanceof z||$t(e)||e instanceof te&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof te&&(e.overridden=!0)),He(n,e,t,s)}class Fi extends z{constructor(){const e=R(Fi.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new We(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(z.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,s){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/s,1));for(let a=0;a<=o;a++){const c=s*a+t,l=this._exponentialApproach(r.time,r.value,i,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const s=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const s=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const s=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(qe(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const s=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(s+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),s=this._events.get(t);return Math.max(this._getTicksUntilEvent(s,t),0)}getDurationOfTicks(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-s}getTimeOfTick(e){const t=this._events.get(e,"ticks"),s=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&s&&s.type==="linearRampToValueAtTime"&&t.value!==s.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(s.time))-i)/(s.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const s=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(s);return this.getTicksAtTime(s+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class Li extends te{constructor(){const e=R(Li.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new Fi({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(te.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class Ui extends Me{constructor(){const e=R(Ui.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new Pi,this._tickOffset=new We,this._ticksAtTime=new We,this._secondsAtTime=new We,this.frequency=new Li({context:this.context,units:e.units,value:e.frequency}),H(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Me.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const s=this.toSeconds(e);return this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),Y(t)&&this.setTicksAtTime(t,s),this._ticksAtTime.cancel(s),this._secondsAtTime.cancel(s)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const s=this._state.get(t);s&&s.time>0&&(this._tickOffset.cancel(s.time),this._state.cancel(s.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),s=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||s,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let h=o.time;const u=this._tickOffset.get(l.time);u&&u.time>=o.time&&(a=u.ticks,h=u.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(h),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),s=this.frequency.timeToTicks(e,t);this.setTicksAtTime(s,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),s={state:"paused",time:e};this._state.add(s);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const h=this._tickOffset.get(c.time);h&&h.time>=r.time&&(o=h.seconds,l=h.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==s.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(s),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const s=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(s.time,i.time),o=this.frequency.getTicksAtTime(r)+e-s.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,s){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,s),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let h=Math.ceil(l)-l;h=ze(h,1)?0:h;let u=this.frequency.getTimeOfTick(a+h);for(;u<t;){try{s(u,Math.round(this.getTicksAtTime(u)))}catch(d){r=d;break}u+=this.frequency.getDurationOfTicks(1,u)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class Dn extends Me{constructor(){const e=R(Dn.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=Q,this._lastUpdate=0,this._state=new Pi("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new Ui({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,H(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Me.getDefaults(),{callback:Q,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){Ko(this.context);const s=this.toSeconds(e);return this.log("start",s),this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),this._tickSource.start(s,t),s<this._lastUpdate&&this.emit("start",s,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(s);return this._tickSource.getTimeOfTick(i+e,s)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,s=>{switch(s.state){case"started":const i=this._tickSource.getTicksAtTime(s.time);this.emit("start",s.time,i);break;case"stopped":s.time!==0&&this.emit("stop",s.time);break;case"paused":this.emit("pause",s.time);break}}),this._tickSource.forEachTickBetween(e,t,(s,i)=>{this.callback(s,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}$s.mixin(Dn);class hn extends D{constructor(){const e=R(hn.getDefaults(),arguments,["delayTime","maxDelay"]);super(e),this.name="Delay";const t=this.toSeconds(e.maxDelay);this._maxDelay=Math.max(t,this.toSeconds(e.delayTime)),this._delayNode=this.input=this.output=this.context.createDelay(t),this.delayTime=new z({context:this.context,param:this._delayNode.delayTime,units:"time",value:e.delayTime,minValue:0,maxValue:this.maxDelay}),H(this,"delayTime")}static getDefaults(){return Object.assign(D.getDefaults(),{delayTime:0,maxDelay:1})}get maxDelay(){return this._maxDelay}dispose(){return super.dispose(),this._delayNode.disconnect(),this.delayTime.dispose(),this}}class ls extends D{constructor(){const e=R(ls.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new Z({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,H(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class Bi extends D{constructor(){const e=R(Bi.getDefaults(),arguments);super(e),this.name="Destination",this.input=new ls({context:this.context}),this.output=new Z({context:this.context}),this.volume=this.input.volume,Pt(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Pt(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}Cn(n=>{n.destination=new Bi({context:n})});In(n=>{n.destination.dispose()});class Sp extends D{constructor(){super(...arguments),this.name="Listener",this.positionX=new z({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new z({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new z({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new z({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new z({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new z({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new z({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new z({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new z({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(D.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}Cn(n=>{n.listener=new Sp({context:n})});In(n=>{n.listener.dispose()});class ji extends dt{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=R(ji.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const s=e.urls[t];this.add(t,s,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:Q,onload:Q,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return L(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,s=Q,i=Q){return lt(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ee(this.baseUrl+t,s,i))):this._buffers.set(e.toString(),new ee(t,s,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class un extends Le{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return Ot(super._frequencyToUnits(e))}_ticksToUnits(e){return Ot(super._ticksToUnits(e))}_beatsToUnits(e){return Ot(super._beatsToUnits(e))}_secondsToUnits(e){return Ot(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return ca(this.toMidi())}transpose(e){return new un(this.context,this.toMidi()+e)}}class Ht extends gs{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class Cp extends Me{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new We,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}Cn(n=>{n.draw=new Cp({context:n})});In(n=>{n.draw.dispose()});class Ip extends dt{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){L(Y(e.time),"Events must have a time property"),L(Y(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Op(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const s of t)if(s.event===e){this._removeNode(s),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let s,i=null;if(t>0)if(e.left.right===null)s=e.left,s.right=e.right,i=s;else{for(s=e.left.right;s.right!==null;)s=s.right;s.parent&&(s.parent.right=s.left,i=s.parent,s.left=e.left,s.right=e.right)}else if(e.right.left===null)s=e.right,s.left=e.left,i=s;else{for(s=e.right.left;s.left!==null;)s=s.left;s.parent&&(s.parent.left=s.right,i=s.parent,s.left=e.left,s.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=s:e.parent.right=s:this._setRoot(s),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,s=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,s=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let s=t[0];for(let i=1;i<t.length;i++)t[i].low>s.low&&(s=t[i]);return s.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(s=>t.push(s)),t.forEach(s=>{s.event&&e(s.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const s=[];this._root.search(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const s=[];this._root.searchAfter(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Op{constructor(e,t,s){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=s,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Ep extends dt{constructor(e){super(),this.name="TimelineValue",this._timeline=new We({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class et extends D{constructor(){super(R(et.getDefaults(),arguments,["context"]))}connect(e,t=0,s=0){return Mn(this,e,t,s),this}}class hs extends et{constructor(){const e=R(hs.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,Ue(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):sp(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(te.getDefaults(),{length:1024})}setMap(e,t=1024){const s=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;s[i]=e(o,i)}return this.curve=s,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(s=>s.includes(e));L(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class Rn extends et{constructor(){const e=R(Rn.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new hs({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(et.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class vt{constructor(e,t){this.id=vt._eventId++,this._remainderTime=0;const s=Object.assign(vt.getDefaults(),t);this.transport=e,this.callback=s.callback,this._once=s.once,this.time=Math.floor(s.time),this._remainderTime=s.time-this.time}static getDefaults(){return{callback:Q,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}vt._eventId=0;class qi extends vt{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const s=Object.assign(qi.getDefaults(),t);this.duration=s.duration,this._interval=s.interval,this._nextTick=s.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},vt.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return ln(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new Ht(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){ln(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new Ht(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);ts(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class $n extends Me{constructor(){const e=R($n.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new Ep(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new We,this._repeatedEvents=new Ip,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new Dn({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),H(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Me.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const s=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(s*Math.PI)*this._swingAmount;e+=new Ht(this.context,this._swingTicks*2/3).toSeconds()*i}Er(!0),this._timeline.forEachAtTime(t,s=>s.invoke(e)),Er(!1)}schedule(e,t){const s=new vt(this,{callback:e,time:new gs(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}scheduleRepeat(e,t,s,i=1/0){const r=new qi(this,{callback:e,duration:new Ge(this.context,i).toTicks(),interval:new Ge(this.context,t).toTicks(),time:new gs(this.context,s).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const s=new vt(this,{callback:e,once:!0,time:new gs(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,s=>this.clear(s.id)),this._repeatedEvents.forEachFrom(t,s=>this.clear(s.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new Ht(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let s;return Y(t)&&(s=this.toTicks(t)),this._clock.start(e,s),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){Ue(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new Ge(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new Ge(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new Ht(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new Ht(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),s=this._clock.frequency.timeToTicks(e,t);this.ticks=s}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const s=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(s)-s,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),s=this.getTicksAtTime(t),i=e-s%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const s=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(s)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new Z(c),h=new Rn(-1),u=new Z(c);i.chain(l,h,u),i=u,r=1/r,o=[l,h,u]}t||(e.getValueAtTime(s)!==0?t=e.getValueAtTime(s)/r:t=0);const a=new Z(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const s=this._syncedSignals[t];s.signal===e&&(s.nodes.forEach(i=>i.dispose()),s.signal.value=s.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),Ri(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}$s.mixin($n);Cn(n=>{n.transport=new $n({context:n})});In(n=>{n.transport.dispose()});class Te extends D{constructor(e){super(e),this.input=void 0,this._state=new Pi("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=Q,this._syncedStop=Q,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new ls({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,H(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,onstop:Q,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,s){let i=qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")L(ts(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,s);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(Zt(t,0)),r.duration=s?this.toSeconds(s):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,s)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else Ko(this.context),this._start(i,t,s);return this}stop(e){let t=qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||Y(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const s=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(s)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,s){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,s)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(ts(t,0)){const s=this._state.get(t);if(s&&s.state==="started"&&s.time!==t){const i=t-this.toSeconds(s.time);let r;s.duration&&(r=this.toSeconds(s.duration)-i),this._start(e,this.toSeconds(s.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=Q,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class Vs extends ss{constructor(){const e=R(Vs.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,He(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new z({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ee(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(ss.getDefaults(),{url:new ee,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,s,i=1){L(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=Zt(t,this.loopStart):t=Zt(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;ri(o,a)&&(o=(o-c)%l+c),ze(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,ln(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),Y(s)){let a=this.toSeconds(s);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}class dn extends Te{constructor(){const e=R(dn.getDefaults(),arguments,["type"]);super(e),this.name="Noise",this._source=null,this._playbackRate=e.playbackRate,this.type=e.type,this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Te.getDefaults(),{fadeIn:0,fadeOut:0,playbackRate:1,type:"white"})}get type(){return this._type}set type(e){if(L(e in Mr,"Noise: invalid type: "+e),this._type!==e&&(this._type=e,this.state==="started")){const t=this.now();this._stop(t),this._start(t)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this._source&&(this._source.playbackRate.value=e)}_start(e){const t=Mr[this._type];this._source=new Vs({url:t,context:this.context,fadeIn:this._fadeIn,fadeOut:this._fadeOut,loop:!0,onended:()=>this.onstop(this),playbackRate:this._playbackRate}).connect(this.output),this._source.start(this.toSeconds(e),Math.random()*(t.duration-.001))}_stop(e){this._source&&(this._source.stop(this.toSeconds(e)),this._source=null)}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e,this._source&&(this._source.fadeIn=this._fadeIn)}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e,this._source&&(this._source.fadeOut=this._fadeOut)}_restart(e){this._stop(e),this._start(e)}dispose(){return super.dispose(),this._source&&this._source.disconnect(),this}}const Wt=44100*5,Xn=2,it={brown:null,pink:null,white:null},Mr={get brown(){if(!it.brown){const n=[];for(let e=0;e<Xn;e++){const t=new Float32Array(Wt);n[e]=t;let s=0;for(let i=0;i<Wt;i++){const r=Math.random()*2-1;t[i]=(s+.02*r)/1.02,s=t[i],t[i]*=3.5}}it.brown=new ee().fromArray(n)}return it.brown},get pink(){if(!it.pink){const n=[];for(let e=0;e<Xn;e++){const t=new Float32Array(Wt);n[e]=t;let s,i,r,o,a,c,l;s=i=r=o=a=c=l=0;for(let h=0;h<Wt;h++){const u=Math.random()*2-1;s=.99886*s+u*.0555179,i=.99332*i+u*.0750759,r=.969*r+u*.153852,o=.8665*o+u*.3104856,a=.55*a+u*.5329522,c=-.7616*c-u*.016898,t[h]=s+i+r+o+a+c+l+u*.5362,t[h]*=.11,l=u*.115926}}it.pink=new ee().fromArray(n)}return it.pink},get white(){if(!it.white){const n=[];for(let e=0;e<Xn;e++){const t=new Float32Array(Wt);n[e]=t;for(let s=0;s<Wt;s++)t[s]=Math.random()*2-1}it.white=new ee().fromArray(n)}return it.white}};function Ut(n,e){return de(this,void 0,void 0,function*(){const t=e/n.context.sampleRate,s=new On(1,t,n.context.sampleRate);return new n.constructor(Object.assign(n.get(),{frequency:2/t,detune:0,context:s})).toDestination().start(0),(yield s.render()).getChannelData(0)})}class Wi extends ss{constructor(){const e=R(Wi.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],He(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new z({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new z({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),H(this,["frequency","detune"])}static getDefaults(){return Object.assign(ss.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class ue extends Te{constructor(){const e=R(ue.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),H(this,"frequency"),this.detune=new te({context:this.context,units:"cents",value:e.detune}),H(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),s=new Wi({context:this.context,onended:()=>this.onstop(this)});this._oscillator=s,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return ue._periodicWaveCache.find(t=>t.phase===this._phase&&pp(t.partials,this._partials));{const e=ue._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const s=this._getCachedPeriodicWave();if(Y(s)){const{partials:i,wave:r}=s;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),ue._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),ue._periodicWaveCache.length>100&&ue._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){Fe(e,0);let t=this._type;const s=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(s&&(t=s[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let h;switch(e){case"sine":h=c<=a?1:0,this._partials[c-1]=h;break;case"square":h=c&1?2*l:0,this._partials[c-1]=h;break;case"sawtooth":h=l*(c&1?1:-1),this._partials[c-1]=h;break;case"triangle":c&1?h=2*(l*l)*(c-1>>1&1?-1:1):h=0,this._partials[c-1]=h;break;case"custom":h=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}h!==0?(r[c]=-h*Math.sin(t*c),o[c]=h*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,s){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*s)+t[o]*Math.sin(o*s);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let s=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)s=Math.max(this._inverseFFT(e,t,o/r*i),s);return mp(-this._inverseFFT(e,t,this._phase)/s,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}ue._periodicWaveCache=[];class ha extends et{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new hs({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Vt extends te{constructor(){const e=R(Vt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new Z({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class Pn extends Te{constructor(){const e=R(Pn.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new ha({context:this.context}),this._modulationNode=new Z({context:this.context}),this._carrier=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new ue({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),H(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ue.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class Vn extends Te{constructor(){const e=R(Vn.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new Z({context:this.context,gain:0}),this._carrier=new ue({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new ue({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Vt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),H(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ue.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class Fs extends Te{constructor(){const e=R(Fs.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new Z({context:this.context,gain:0}),this._thresh=new hs({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new te({context:this.context,units:"audioRange",value:e.width}),this._triangle=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),H(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class Fn extends Te{constructor(){const e=R(Fn.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,H(this,["frequency","detune"])}static getDefaults(){return Object.assign(ue.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,s=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+s*r)}}get count(){return this._oscillators.length}set count(e){if(Fe(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const s=new ue({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):Q});this.type==="custom"&&(s.partials=this._partials),this.frequency.connect(s.frequency),this.detune.connect(s.detune),s.detune.overridden=!1,s.connect(this.output),this._oscillators[t]=s}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,s)=>t.phase=this._phase+s/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class Ln extends Te{constructor(){const e=R(Ln.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Vt({context:this.context,value:2}),this._pulse=new Fs({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new ue({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),H(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Te.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const Dr={am:Pn,fat:Fn,fm:Vn,oscillator:ue,pulse:Fs,pwm:Ln};class ns extends Te{constructor(){const e=R(ns.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),H(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(ue.getDefaults(),Vn.getDefaults(),Pn.getDefaults(),Fn.getDefaults(),Fs.getDefaults(),Ln.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=Dr[e],s=this.now();if(this._oscillator){const i=this._oscillator;i.stop(s),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(s)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof Dr[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&ct(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&ct(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&lt(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return de(this,arguments,void 0,function*(e=1024){return Ut(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}class zi extends te{constructor(){super(R(zi.getDefaults(),arguments,["value"])),this.override=!1,this.name="Add",this._sum=new Z({context:this.context}),this.input=this._sum,this.output=this._sum,this.addend=this._param,Pt(this._constantSource,this._sum)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._sum.dispose(),this}}class Un extends et{constructor(){const e=R(Un.getDefaults(),arguments,["min","max"]);super(e),this.name="Scale",this._mult=this.input=new Vt({context:this.context,value:e.max-e.min}),this._add=this.output=new zi({context:this.context,value:e.min}),this._min=e.min,this._max=e.max,this.input.connect(this.output)}static getDefaults(){return Object.assign(et.getDefaults(),{max:1,min:0})}get min(){return this._min}set min(e){this._min=e,this._setRange()}get max(){return this._max}set max(e){this._max=e,this._setRange()}_setRange(){this._add.value=this._min,this._mult.value=this._max-this._min}dispose(){return super.dispose(),this._add.dispose(),this._mult.dispose(),this}}class Gi extends et{constructor(){super(R(Gi.getDefaults(),arguments)),this.name="Zero",this._gain=new Z({context:this.context}),this.output=this._gain,this.input=void 0,He(this.context.getConstant(0),this._gain)}dispose(){return super.dispose(),la(this.context.getConstant(0),this._gain),this}}class pn extends D{constructor(){const e=R(pn.getDefaults(),arguments,["frequency","min","max"]);super(e),this.name="LFO",this._stoppedValue=0,this._units="number",this.convert=!0,this._fromType=z.prototype._fromType,this._toType=z.prototype._toType,this._is=z.prototype._is,this._clampValue=z.prototype._clampValue,this._oscillator=new ue(e),this.frequency=this._oscillator.frequency,this._amplitudeGain=new Z({context:this.context,gain:e.amplitude,units:"normalRange"}),this.amplitude=this._amplitudeGain.gain,this._stoppedSignal=new te({context:this.context,units:"audioRange",value:0}),this._zeros=new Gi({context:this.context}),this._a2g=new ha({context:this.context}),this._scaler=this.output=new Un({context:this.context,max:e.max,min:e.min}),this.units=e.units,this.min=e.min,this.max=e.max,this._oscillator.chain(this._amplitudeGain,this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),H(this,["amplitude","frequency"]),this.phase=e.phase}static getDefaults(){return Object.assign(ue.getDefaults(),{amplitude:1,frequency:"4n",max:1,min:0,type:"sine",units:"number"})}start(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(0,e),this._oscillator.start(e),this}stop(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(this._stoppedValue,e),this._oscillator.stop(e),this}sync(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this}unsync(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this}_setStoppedValue(){this._stoppedValue=this._oscillator.getInitialValue(),this._stoppedSignal.value=this._stoppedValue}get min(){return this._toType(this._scaler.min)}set min(e){e=this._fromType(e),this._scaler.min=e}get max(){return this._toType(this._scaler.max)}set max(e){e=this._fromType(e),this._scaler.max=e}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e,this._setStoppedValue()}get partials(){return this._oscillator.partials}set partials(e){this._oscillator.partials=e,this._setStoppedValue()}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e,this._setStoppedValue()}get units(){return this._units}set units(e){const t=this.min,s=this.max;this._units=e,this.min=t,this.max=s}get state(){return this._oscillator.state}connect(e,t,s){return(e instanceof z||e instanceof te)&&(this.convert=e.convert,this.units=e.units),Mn(this,e,t,s),this}dispose(){return super.dispose(),this._oscillator.dispose(),this._stoppedSignal.dispose(),this._zeros.dispose(),this._scaler.dispose(),this._a2g.dispose(),this._amplitudeGain.dispose(),this.amplitude.dispose(),this}}function ua(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Fe(r,n,e),t.set(this,r)}})}}function pt(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Fe(this.toSeconds(r),n,e),t.set(this,r)}})}}class Bn extends Te{constructor(){const e=R(Bn.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ee({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Te.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1,reverse:!1})}load(e){return de(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=Q){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,s){return super.start(e,t,s),this}_start(e,t,s){this._loop?t=Zt(t,this._loopStart):t=Zt(t,0);const i=this.toSeconds(t),r=s;s=Zt(s,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(s);o=o/this._playbackRate,e=this.toSeconds(e);const a=new Vs({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&qe(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(s=>s.stop(t))}restart(e,t,s){return super.restart(e,t,s),this}_restart(e,t,s){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,s)}seek(e,t){const s=this.toSeconds(t);if(this._state.getValueAtTime(s)==="started"){const i=this.toSeconds(e);this._stop(s),this._start(s,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&Fe(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&Fe(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),s=this._state.getNextState("stopped",t);s&&s.implicitEnd&&(this._state.cancel(s.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}Je([pt(0)],Bn.prototype,"fadeIn",void 0);Je([pt(0)],Bn.prototype,"fadeOut",void 0);class Mp extends et{constructor(){super(...arguments),this.name="GainToAudio",this._norm=new hs({context:this.context,mapping:e=>Math.abs(e)*2-1}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Xe extends D{constructor(){const e=R(Xe.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new te({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(lt(e))return e;{let s;for(s in Gs)if(Gs[s][t]===e)return s;return e}}_setCurve(e,t,s){if(lt(s)&&Reflect.has(Gs,s)){const i=Gs[s];Et(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(Ue(s)&&e!=="_decayCurve")this[e]=s;else throw new Error("Envelope: invalid curve: "+s)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const s=this.toSeconds(this.release);s<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,s,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,s,e):(L(Ue(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,s,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,s=1){return t=this.toSeconds(t),this.triggerAttack(t,s),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,s=0){return Mn(this,e,t,s),this}asArray(){return de(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,s=new On(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:s}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield s.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}Je([pt(0)],Xe.prototype,"attack",void 0);Je([pt(0)],Xe.prototype,"decay",void 0);Je([ua(0,1)],Xe.prototype,"sustain",void 0);Je([pt(0)],Xe.prototype,"release",void 0);const Gs=(()=>{let e,t;const s=[];for(e=0;e<128;e++)s[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=d/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function h(d){const p=new Array(d.length);for(let f=0;f<d.length;f++)p[f]=1-d[f];return p}function u(d){return d.slice(0).reverse()}return{bounce:{In:h(l),Out:l},cosine:{In:s,Out:u(s)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:h(i)},sine:{In:c,Out:h(c)},step:{In:o,Out:h(o)}}})();class xt extends D{constructor(){const e=R(xt.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,H(this,"volume")}static getDefaults(){return Object.assign(D.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const s=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,s.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class ht extends xt{constructor(){const e=R(ht.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(xt.getDefaults(),{detune:0,onsilence:Q,portamento:0})}triggerAttack(e,t,s=1){this.log("triggerAttack",e,t,s);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,s),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const s=this.toSeconds(t),i=e instanceof Le?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(s)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,s)}else this.frequency.setValueAtTime(i,s);return this}}Je([pt(0)],ht.prototype,"portamento",void 0);class jn extends Xe{constructor(){super(R(jn.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new Z({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class wt extends ht{constructor(){const e=R(wt.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new ns(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new jn(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),H(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(ht.getDefaults(),{envelope:Object.assign(Ct(Xe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(Ct(ns.getDefaults(),[...Object.keys(Te.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class fn extends D{constructor(){const e=R(fn.getDefaults(),arguments,["frequency","type"]);super(e),this.name="BiquadFilter",this._filter=this.context.createBiquadFilter(),this.input=this.output=this._filter,this.Q=new z({context:this.context,units:"number",value:e.Q,param:this._filter.Q}),this.frequency=new z({context:this.context,units:"frequency",value:e.frequency,param:this._filter.frequency}),this.detune=new z({context:this.context,units:"cents",value:e.detune,param:this._filter.detune}),this.gain=new z({context:this.context,units:"decibels",convert:!1,value:e.gain,param:this._filter.gain}),this.type=e.type}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,type:"lowpass",frequency:350,detune:0,gain:0})}get type(){return this._filter.type}set type(e){L(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._filter.type=e}getFrequencyResponse(e=128){const t=new Float32Array(e);for(let o=0;o<e;o++){const c=Math.pow(o/e,2)*19980+20;t[o]=c}const s=new Float32Array(e),i=new Float32Array(e),r=this.context.createBiquadFilter();return r.type=this.type,r.Q.value=this.Q.value,r.frequency.value=this.frequency.value,r.gain.value=this.gain.value,r.getFrequencyResponse(t,s,i),s}dispose(){return super.dispose(),this._filter.disconnect(),this.Q.dispose(),this.frequency.dispose(),this.gain.dispose(),this.detune.dispose(),this}}class mn extends D{constructor(){const e=R(mn.getDefaults(),arguments,["frequency","type","rolloff"]);super(e),this.name="Filter",this.input=new Z({context:this.context}),this.output=new Z({context:this.context}),this._filters=[],this._filters=[],this.Q=new te({context:this.context,units:"positive",value:e.Q}),this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this.gain=new te({context:this.context,units:"decibels",convert:!1,value:e.gain}),this._type=e.type,this.rolloff=e.rolloff,H(this,["detune","frequency","gain","Q"])}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,detune:0,frequency:350,gain:0,rolloff:-12,type:"lowpass"})}get type(){return this._type}set type(e){L(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._type=e,this._filters.forEach(s=>s.type=e)}get rolloff(){return this._rolloff}set rolloff(e){const t=ct(e)?e:parseInt(e,10),s=[-12,-24,-48,-96];let i=s.indexOf(t);L(i!==-1,`rolloff can only be ${s.join(", ")}`),i+=1,this._rolloff=t,this.input.disconnect(),this._filters.forEach(r=>r.disconnect()),this._filters=new Array(i);for(let r=0;r<i;r++){const o=new fn({context:this.context});o.type=this._type,this.frequency.connect(o.frequency),this.detune.connect(o.detune),this.Q.connect(o.Q),this.gain.connect(o.gain),this._filters[r]=o}this._internalChannels=this._filters,Pt(this.input,...this._internalChannels,this.output)}getFrequencyResponse(e=128){const t=new fn({context:this.context,frequency:this.frequency.value,gain:this.gain.value,Q:this.Q.value,type:this._type,detune:this.detune.value}),s=new Float32Array(e).map(()=>1);return this._filters.forEach(()=>{t.getFrequencyResponse(e).forEach((r,o)=>s[o]*=r)}),t.dispose(),s}dispose(){return super.dispose(),this._filters.forEach(e=>{e.dispose()}),Ri(this,["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.detune.dispose(),this.gain.dispose(),this}}class gn extends Xe{constructor(){const e=R(gn.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="FrequencyEnvelope",this._octaves=e.octaves,this._baseFrequency=this.toFrequency(e.baseFrequency),this._exponent=this.input=new Rn({context:this.context,value:e.exponent}),this._scale=this.output=new Un({context:this.context,min:this._baseFrequency,max:this._baseFrequency*Math.pow(2,this._octaves)}),this._sig.chain(this._exponent,this._scale)}static getDefaults(){return Object.assign(Xe.getDefaults(),{baseFrequency:200,exponent:1,octaves:4})}get baseFrequency(){return this._baseFrequency}set baseFrequency(e){const t=this.toFrequency(e);Fe(t,0),this._baseFrequency=t,this._scale.min=this._baseFrequency,this.octaves=this._octaves}get octaves(){return this._octaves}set octaves(e){this._octaves=e,this._scale.max=this._baseFrequency*Math.pow(2,e)}get exponent(){return this._exponent.value}set exponent(e){this._exponent.value=e}dispose(){return super.dispose(),this._exponent.dispose(),this._scale.dispose(),this}}class Yi extends ht{constructor(){const e=R(Yi.getDefaults(),arguments);super(e),this.name="MonoSynth",this.oscillator=new ns(Object.assign(e.oscillator,{context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)})),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new mn(Object.assign(e.filter,{context:this.context})),this.filterEnvelope=new gn(Object.assign(e.filterEnvelope,{context:this.context})),this.envelope=new jn(Object.assign(e.envelope,{context:this.context})),this.oscillator.chain(this.filter,this.envelope,this.output),this.filterEnvelope.connect(this.filter.frequency),H(this,["oscillator","frequency","detune","filter","filterEnvelope","envelope"])}static getDefaults(){return Object.assign(ht.getDefaults(),{envelope:Object.assign(Ct(Xe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.9}),filter:Object.assign(Ct(mn.getDefaults(),Object.keys(D.getDefaults())),{Q:1,rolloff:-12,type:"lowpass"}),filterEnvelope:Object.assign(Ct(gn.getDefaults(),Object.keys(D.getDefaults())),{attack:.6,baseFrequency:200,decay:.2,exponent:2,octaves:3,release:2,sustain:.5}),oscillator:Object.assign(Ct(ns.getDefaults(),Object.keys(Te.getDefaults())),{type:"sawtooth"})})}_triggerEnvelopeAttack(e,t=1){if(this.envelope.triggerAttack(e,t),this.filterEnvelope.triggerAttack(e),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.filterEnvelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this.filterEnvelope.dispose(),this.filter.dispose(),this}}class qn extends wt{constructor(){const e=R(qn.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,H(this,["oscillator","envelope"])}static getDefaults(){return Mt(ht.getDefaults(),wt.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const s=this.toSeconds(t),i=this.toFrequency(e instanceof Le?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,s),this.oscillator.frequency.exponentialRampToValueAtTime(i,s+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}Je([ua(0)],qn.prototype,"octaves",void 0);Je([pt(0)],qn.prototype,"pitchDecay",void 0);const da=new Set;function Hi(n){da.add(n)}function pa(n,e){const t=`registerProcessor("${n}", ${e})`;da.add(t)}const Dp=`
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
`;Hi(Dp);const Rp=`
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
`;Hi(Rp);const $p=`
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
`;Hi($p);const Pp="feedback-comb-filter",Vp=`
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
`;pa(Pp,Vp);class us extends xt{constructor(){const e=R(us.getDefaults(),arguments,["voice","options"]);super(e),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=i=>this.releaseAll(i),L(!ct(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const s=this._voices.indexOf(this._dummyVoice);this._voices.splice(s,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(xt.getDefaults(),{maxPolyphony:32,options:{},voice:wt})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(s=>s.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return L(e instanceof ht,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else Sn("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,s){e.forEach(i=>{const r=new un(this.context,i).toMidi(),o=this._getNextAvailableVoice();o&&(o.triggerAttack(i,t,s),this._activeVoices.push({midi:r,voice:o,released:!1}),this.log("triggerAttack",i,t))})}_triggerRelease(e,t){e.forEach(s=>{const i=new un(this.context,s).toMidi(),r=this._activeVoices.find(({midi:o,released:a})=>o===i&&!a);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",s,t))})}_scheduleEvent(e,t,s,i){L(!this.disposed,"Synth was already disposed"),s<=this.now()?e==="attack"?this._triggerAttack(t,s,i):this._triggerRelease(t,s):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,s,i)},s-this.now())}triggerAttack(e,t,s){Array.isArray(e)||(e=[e]);const i=this.toSeconds(t);return this._scheduleEvent("attack",e,i,s),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("release",e,s),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s);if(this.triggerAttack(e,r,i),Ue(t)){L(Ue(e),"If the duration is an array, the notes must also be an array"),e=e;for(let o=0;o<e.length;o++){const a=t[Math.min(o,t.length-1)],c=this.toSeconds(a);L(c>0,"The duration must be greater than 0"),this.triggerRelease(e[o],r+c)}}else{const o=this.toSeconds(t);L(o>0,"The duration must be greater than 0"),this.triggerRelease(e,r+o)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=Ct(e,["onsilence","context"]);return this.options=Mt(this.options,t),this._voices.forEach(s=>s.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:s})=>{s.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class Ls extends xt{constructor(){const e=R(Ls.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(s=>{const i=parseInt(s,10);if(L(zs(s)||ct(i)&&isFinite(i),`url key is neither a note or midi pitch: ${s}`),zs(s)){const r=new Le(this.context,s).toMidi();t[r]=e.urls[s]}else ct(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new ji({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(xt.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:Q,onerror:Q,release:.1,urls:{}})}_findClosest(e){let s=0;for(;s<96;){if(this._buffers.has(e+s))return-s;if(this._buffers.has(e-s))return s;s++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,s=1){return this.log("triggerAttack",e,t,s),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=aa(new Le(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,h=this._buffers.get(l),u=oa(c+a),d=new Vs({url:h,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:u}).connect(this.output);d.start(t,0,h.duration/u,s),Ue(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),f=p.indexOf(d);f!==-1&&p.splice(f,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(s=>{const i=new Le(this.context,s).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(s=>{for(;s.length;)s.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,s,i=1){const r=this.toSeconds(s);return this.triggerAttack(e,r,i),Ue(t)?(L(Ue(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,s){if(L(zs(e)||isFinite(e),`note must be a pitch or midi: ${e}`),zs(e)){const i=new Le(this.context,e).toMidi();this._buffers.add(i,t,s)}else this._buffers.add(e,t,s);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}Je([pt(0)],Ls.prototype,"attack",void 0);Je([pt(0)],Ls.prototype,"release",void 0);class Wn extends D{constructor(){const e=R(Wn.getDefaults(),arguments,["fade"]);super(e),this.name="CrossFade",this._panner=this.context.createStereoPanner(),this._split=this.context.createChannelSplitter(2),this._g2a=new Mp({context:this.context}),this.a=new Z({context:this.context,gain:0}),this.b=new Z({context:this.context,gain:0}),this.output=new Z({context:this.context}),this._internalChannels=[this.a,this.b],this.fade=new te({context:this.context,units:"normalRange",value:e.fade}),H(this,"fade"),this.context.getConstant(1).connect(this._panner),this._panner.connect(this._split),this._panner.channelCount=1,this._panner.channelCountMode="explicit",He(this._split,this.a.gain,0),He(this._split,this.b.gain,1),this.fade.chain(this._g2a,this._panner.pan),this.a.connect(this.output),this.b.connect(this.output)}static getDefaults(){return Object.assign(D.getDefaults(),{fade:.5})}dispose(){return super.dispose(),this.a.dispose(),this.b.dispose(),this.output.dispose(),this.fade.dispose(),this._g2a.dispose(),this._panner.disconnect(),this._split.disconnect(),this}}class Rr extends D{constructor(e){super(e),this.name="Effect",this._dryWet=new Wn({context:this.context}),this.wet=this._dryWet.fade,this.effectSend=new Z({context:this.context}),this.effectReturn=new Z({context:this.context}),this.input=new Z({context:this.context}),this.output=this._dryWet,this.input.fan(this._dryWet.a,this.effectSend),this.effectReturn.connect(this._dryWet.b),this.wet.setValueAtTime(e.wet,0),this._internalChannels=[this.effectReturn,this.effectSend],H(this,"wet")}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}connectEffect(e){return this._internalChannels.push(e),this.effectSend.chain(e,this.effectReturn),this}dispose(){return super.dispose(),this._dryWet.dispose(),this.effectSend.dispose(),this.effectReturn.dispose(),this.wet.dispose(),this}}class Xi extends D{constructor(){const e=R(Xi.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new z({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",H(this,"pan")}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Fp="bit-crusher",Lp=`
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
`;pa(Fp,Lp);class zn extends D{constructor(){const e=R(zn.getDefaults(),arguments,["channels"]);super(e),this.name="Split",this._splitter=this.input=this.output=this.context.createChannelSplitter(e.channels),this._internalChannels=[this._splitter]}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._splitter.disconnect(),this}}class Us extends D{constructor(){const e=R(Us.getDefaults(),arguments,["channels"]);super(e),this.name="Merge",this._merger=this.output=this.input=this.context.createChannelMerger(e.channels)}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._merger.disconnect(),this}}class $r extends D{constructor(e){super(e),this.name="StereoEffect",this.input=new Z({context:this.context}),this.input.channelCount=2,this.input.channelCountMode="explicit",this._dryWet=this.output=new Wn({context:this.context,fade:e.wet}),this.wet=this._dryWet.fade,this._split=new zn({context:this.context,channels:2}),this._merge=new Us({context:this.context,channels:2}),this.input.connect(this._split),this.input.connect(this._dryWet.a),this._merge.connect(this._dryWet.b),H(this,["wet"])}connectEffectLeft(...e){this._split.connect(e[0],0,0),Pt(...e),He(e[e.length-1],this._merge,0,0)}connectEffectRight(...e){this._split.connect(e[0],1,0),Pt(...e),He(e[e.length-1],this._merge,0,1)}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}dispose(){return super.dispose(),this._dryWet.dispose(),this._split.dispose(),this._merge.dispose(),this}}class Pr extends $r{constructor(e){super(e),this.feedback=new te({context:this.context,value:e.feedback,units:"normalRange"}),this._feedbackL=new Z({context:this.context}),this._feedbackR=new Z({context:this.context}),this._feedbackSplit=new zn({context:this.context,channels:2}),this._feedbackMerge=new Us({context:this.context,channels:2}),this._merge.connect(this._feedbackSplit),this._feedbackMerge.connect(this._split),this._feedbackSplit.connect(this._feedbackL,0,0),this._feedbackL.connect(this._feedbackMerge,0,0),this._feedbackSplit.connect(this._feedbackR,1,0),this._feedbackR.connect(this._feedbackMerge,0,1),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),H(this,["feedback"])}static getDefaults(){return Object.assign($r.getDefaults(),{feedback:.5})}dispose(){return super.dispose(),this.feedback.dispose(),this._feedbackL.dispose(),this._feedbackR.dispose(),this._feedbackSplit.dispose(),this._feedbackMerge.dispose(),this}}class Zi extends Pr{constructor(){const e=R(Zi.getDefaults(),arguments,["frequency","delayTime","depth"]);super(e),this.name="Chorus",this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new pn({context:this.context,frequency:e.frequency,min:0,max:1}),this._lfoR=new pn({context:this.context,frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new hn({context:this.context}),this._delayNodeR=new hn({context:this.context}),this.frequency=this._lfoL.frequency,H(this,["frequency"]),this._lfoL.frequency.connect(this._lfoR.frequency),this.connectEffectLeft(this._delayNodeL),this.connectEffectRight(this._delayNodeR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this.depth=this._depth,this.type=e.type,this.spread=e.spread}static getDefaults(){return Object.assign(Pr.getDefaults(),{frequency:1.5,delayTime:3.5,depth:.7,type:"sine",spread:180,feedback:0,wet:.5})}get depth(){return this._depth}set depth(e){this._depth=e;const t=this._delayTime*e;this._lfoL.min=Math.max(this._delayTime-t,0),this._lfoL.max=this._delayTime+t,this._lfoR.min=Math.max(this._delayTime-t,0),this._lfoR.max=this._delayTime+t}get delayTime(){return this._delayTime*1e3}set delayTime(e){this._delayTime=e/1e3,this.depth=this._depth}get type(){return this._lfoL.type}set type(e){this._lfoL.type=e,this._lfoR.type=e}get spread(){return this._lfoR.phase-this._lfoL.phase}set spread(e){this._lfoL.phase=90-e/2,this._lfoR.phase=e/2+90}start(e){return this._lfoL.start(e),this._lfoR.start(e),this}stop(e){return this._lfoL.stop(e),this._lfoR.stop(e),this}sync(){return this._lfoL.sync(),this._lfoR.sync(),this}unsync(){return this._lfoL.unsync(),this._lfoR.unsync(),this}dispose(){return super.dispose(),this._lfoL.dispose(),this._lfoR.dispose(),this._delayNodeL.dispose(),this._delayNodeR.dispose(),this.frequency.dispose(),this}}class Qi extends Rr{constructor(){const e=R(Qi.getDefaults(),arguments,["decay"]);super(e),this.name="Reverb",this._convolver=this.context.createConvolver(),this.ready=Promise.resolve();const t=this.toSeconds(e.decay);Fe(t,.001),this._decay=t;const s=this.toSeconds(e.preDelay);Fe(s,0),this._preDelay=s,this.generate(),this.connectEffect(this._convolver)}static getDefaults(){return Object.assign(Rr.getDefaults(),{decay:1.5,preDelay:.01})}get decay(){return this._decay}set decay(e){e=this.toSeconds(e),Fe(e,.001),this._decay=e,this.generate()}get preDelay(){return this._preDelay}set preDelay(e){e=this.toSeconds(e),Fe(e,0),this._preDelay=e,this.generate()}generate(){return de(this,void 0,void 0,function*(){const e=this.ready,t=new On(2,this._decay+this._preDelay,this.context.sampleRate),s=new dn({context:t}),i=new dn({context:t}),r=new Us({context:t});s.connect(r,0,0),i.connect(r,0,1);const o=new Z({context:t}).toDestination();r.connect(o),s.start(0),i.start(0),o.gain.setValueAtTime(0,0),o.gain.setValueAtTime(1,this._preDelay),o.gain.exponentialApproachValueAtTime(0,this._preDelay,this.decay);const a=t.render();return this.ready=a.then(Q),yield e,this._convolver.buffer=(yield a).get(),this})}dispose(){return super.dispose(),this._convolver.disconnect(),this}}class me extends D{constructor(){const e=R(me.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new Z({context:this.context}),me._allSolos.has(this.context)||me._allSolos.set(this.context,new Set),me._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(D.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),me._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){me._soloed.has(this.context)||me._soloed.set(this.context,new Set),me._soloed.get(this.context).add(this)}_removeSolo(){me._soloed.has(this.context)&&me._soloed.get(this.context).delete(this)}_isSoloed(){return me._soloed.has(this.context)&&me._soloed.get(this.context).has(this)}_noSolos(){return!me._soloed.has(this.context)||me._soloed.has(this.context)&&me._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),me._allSolos.get(this.context).delete(this),this._removeSolo(),this}}me._allSolos=new Map;me._soloed=new Map;class Ji extends D{constructor(){const e=R(Ji.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new Xi({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,H(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class Xt extends D{constructor(){const e=R(Xt.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new me({solo:e.solo,context:this.context}),this._panVol=this.output=new Ji({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),H(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return Xt.buses.has(e)||Xt.buses.set(e,new Z({context:this.context})),Xt.buses.get(e)}send(e,t=0){const s=this._getBus(e),i=new Z({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(s),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}Xt.buses=new Map;class Ki extends D{constructor(){const e=R(Ki.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new z({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new z({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new z({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new z({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new z({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),H(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function Up(){return je().now()}je().transport;je().destination;je().destination;je().listener;je().draw;je();function Bp(){return ee.loaded()}const Bs=new Ki({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),jp=new Ls({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:n=>{console.warn("Failed to load Rhodes piano sampler:",n)}}).connect(Bs),qp=new us(wt,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(Bs),Wp=new Qi({decay:4.5,wet:.35}).connect(Bs),zp=new us(wt,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Wp),Gp=new Zi({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(Bs),Yp=new us(wt,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Gp),Hp=new us(Yi,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(Bs);function Xp(n){switch(n){case"organ":return qp;case"pad-strings":return zp;case"juno-pad":return Yp;case"stab":return Hp;case"rhodes":default:return jp}}const Zp={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab"},Qp={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5}};function Jp(n,e){const t=e/60;switch(n){case"1/4":return 1/t;case"1/8":return .5/t;case"1/8T":return .5/t*(2/3);case"1/16":return .25/t;default:return .25/t}}function Kp(n,e){const t=[];for(let s=0;s<e;s++)for(const i of n){const r=i.match(/^([A-G]#?)(-?\d+)$/);if(r){const o=r[1],a=parseInt(r[2],10)+s;t.push(`${o}${a}`)}else t.push(i)}return t}function ef(n,e){const t=[...n];switch(e){case"up":return t;case"down":return[...t].reverse();case"up-down":return[...t,...[...t].reverse().slice(1,-1)];case"random":return t.sort(()=>Math.random()-.5);default:return t}}function tf(n,e=.7,t,s="rhodes"){try{Promise.all([xp(),Bp()]).then(()=>{const i=Xp(s),r=n.length,o=r<=1?1:Math.max(.4,1/Math.sqrt(r)),a=Up();if(t&&t.arpMode&&t.arpMode!=="off"){const c=t.bpm??80,l=t.arpRate??"1/16",h=t.arpRange??1,u=t.arpMode,d=Jp(l,c),p=Kp(n,h),f=ef(p,u),g=()=>t.minVelocity!==void 0&&t.maxVelocity!==void 0?(t.minVelocity+Math.random()*(t.maxVelocity-t.minVelocity))/127*o:o,m=t.duration?t.duration*(1+(Math.random()-.5)*.1*(t.humanVariance??0)):Math.max(.05,d*.9);f.forEach((_,b)=>{const T=t.microTiming?(Math.random()-.5)*t.microTiming*.02:0;i.triggerAttackRelease(_,m,a+b*d+T,g())});return}n.forEach((c,l)=>{let h=0,u=o,d=e;if(t){const{minVelocity:p,maxVelocity:f,spread:g,microTiming:m,humanVariance:_,duration:b}=t;u=(p+Math.random()*(f-p))/127*o;const k=l*g*.1,y=(Math.random()-.5)*m*.05,x=(Math.random()-.5)*_*.03;h=Math.max(0,k+y+x),d=b*(1+(Math.random()-.5)*.2*_)}i.triggerAttackRelease(c,d,a+h,u)})}).catch(i=>{console.warn("Audio playback gesture failed:",i)})}catch(i){console.warn("Audio playback failed:",i)}}function Ys(n,e,t){const s=Zp[e]||"rhodes",i=Qp[e]||{},r={...i,bpm:t?.bpm??i.bpm??90};tf(n,t?.duration??i.duration??.9,r,s)}const sf=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],nf=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],er={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},fa=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Vr=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],ma={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},rf={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Fr={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},of={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},Lr={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},Ur={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},af={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN"},cf={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR"},lf={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"]},hf={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function uf(n,e){return 1+n.degrees.filter(t=>e.includes(t)).length*.6}function df(n,e){const t=n.reduce((i,r)=>i+e(r),0);let s=Math.random()*t;for(const i of n)if(s-=e(i),s<=0)return i;return n[n.length-1]}function ga(n){if(n.length)return n[Math.floor(Math.random()*n.length)]}const Br=4;function pf(n,e,t,s){const i=["TONIC"];let r="TONIC";for(let o=1;o<Br;o++){const a=(n.degrees[r]?.next_chord_options||[]).filter(d=>d.nodeId.startsWith(`${e}_`)).map(d=>d.nodeId.replace(`${e}_`,"")).filter(d=>t.includes(d)),c=a.filter(d=>!i.includes(d));let l=c.length?c:a.filter(d=>d!==r);if(!l.length){const d=t.filter(p=>p!==r&&!i.includes(p));l=d.length?d:t.filter(p=>p!==r)}l.length||(l=t);let h=l;if(o===Br-1){const d=l.filter(p=>p==="TONIC"||p==="DOMINANT");d.length&&(h=d)}else{const d=l.filter(p=>s.includes(p));d.length&&Math.random()<.6&&(h=d)}const u=h[Math.floor(Math.random()*h.length)];r=u,i.push(u)}return i}function _n(n,e){const t=(n%12+12)%12;return e?nf[t]:sf[t]}function _a(n){const e=n[0]?.toUpperCase();let t="C",s=n;e&&/[A-G]/.test(e)&&(n[1]==="B"?(t=`${e}b`,s=n.slice(2)):n[1]==="#"?(t=`${e}#`,s=n.slice(2)):(t=e,s=n.slice(1))),s=s.toLowerCase();let i="maj";return s.includes("maj7")?i="maj7":s.includes("min7")||s.includes("m7")?i="min7":s.includes("dim7")?i="dim7":s.includes("dim")?i="dim":s.includes("aug")?i="aug":s.includes("sus")?i="sus4":s==="7"?i="dom7":s.includes("min")||s==="m"?i="min":i="maj",{root:t,quality:i}}function ff(n,e){const{root:t,quality:s}=_a(n),i=er[t]??0;return ma[s].map(o=>_n(i+o,e))}async function mf(){const n=await fetch("./chord_voyager_data.json");if(!n.ok)throw new Error(`HTTP error: ${n.status}`);const e=await n.json();return bf(e),e}const gf={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},_f={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},yf={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},vf={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},xf={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},wf={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function bf(n){const e=[["MIXOLYDIAN",gf],["DORIAN",_f],["LYDIAN",yf]];for(const[t,s]of e)for(const[i,r]of Object.entries(s)){const o=n.scales[`${r}_MAJOR`];if(!o)continue;const a=`${i}_${t}`,c={};for(const l of wf[t]){const h=xf[`${t}_${l}`],u=o.degrees[h];if(!u)continue;const d=JSON.parse(JSON.stringify(u));d.next_chord_options=(d.next_chord_options||[]).map(p=>{if(p.nodeId.startsWith(`${r}_MAJOR_`)){const f=p.nodeId.replace(`${r}_MAJOR_`,""),g=vf[`${t}_${f}`];if(g)return{name:p.name,nodeId:`${i}_${t}_${g}`}}return p}),c[l]=d}n.scales[a]={root:i,type:t,degrees:c}}}function ya(n){const e=Math.max(0,Math.min(1,n)),t=(.42-e*.05).toFixed(2),s=(.11+e*.07).toFixed(2),i=Math.round(Math.max(40,187-e*140));return`oklch(${t} ${s} ${i})`}function va(n){return Math.max(.06,Math.min(.2,.08+n*.12))}function Tf(n,e,t){return{Tonic:`As the tonic, ${t} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${t} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${t} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${t} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${t} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${t} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${t} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${t} drifts just below home, a soft modal step rather than a hard pull.`}[n]||`${t} colors the progression as the ${n.toLowerCase()} of ${e}.`}function fs(n,e,t,s){const r=t.degrees[e].chord_name,o=of[e]??.5,a=Lr[t.type]||Lr.MAJOR;return{name:jr(r),tag:rf[e]||"move",roman:a[e]||"?",color:ya(o),grain:va(o),functionLabel:Fr[e]||e,notes:ff(r,s),scaleLabel:`${t.root} ${Ur[t.type]||t.type}`,desc:Tf(Fr[e]||e,Ur[t.type]||t.type,jr(r)),degree:e,scaleKey:n,tension:o}}function jr(n){const{root:e,quality:t}=_a(n);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[t]??""}`}function qr(n,e,t,s){const i=af[e]||"MAJOR",r=cf[t],o=s?.scaleType||(r&&i==="MAJOR"?r:i);let a=s?.key&&Vr.includes(s.key)?s.key:ga(Vr),c=`${a}_${o}`;n.scales[c]||(a="C",c=`${a}_${o}`);const l=n.scales[c],h=fa.has(a)||a.includes("b"),u=Object.keys(l.degrees),d=lf[t]||[],f=(hf[o]||[]).filter(T=>T.degrees.every(k=>u.includes(k))),m=(f.length?df(f,T=>uf(T,d)).degrees:pf(l,c,u,d)).map(T=>fs(c,T,l,h));let b={Pop:100,Rock:118,Gospel:84,"Indie/Folk":92,"Lo-fi/Chill":76,"Jazz-ish":96,"R&B/Soul":88,"House/Dance":124,Synthwave:108,Cinematic:72}[e]||92;return t==="Tense"&&(b+=6),(t==="Dreamy"||t==="Melancholy")&&(b-=6),{genre:e,mood:t,key:a,scaleType:o,bpm:b,chords:m}}function Zn(n,e,t){const s=n.filter(r=>e.includes(r)),i=s.filter(r=>r!==t);return ga(i.length?i:s)}const Af={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Wr(n,e,t,s,i,r,o){const a=(er[n]??0)+e,l=`${_n(a,o)}${Af[t]}`,h=ma[t].map(d=>_n(a+d,o)),u=.3;return{name:l,tag:r,roman:i,color:ya(u),grain:va(u),functionLabel:s,notes:h,scaleLabel:"Borrowed",desc:`${l} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:u}}function oi(n){const e=n.match(/^[A-Ga-g][#b]?/),t=e?e[0]:"C";return t[0].toUpperCase()+t.slice(1)}const zr={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function ai(n,e,t,s){const i=er[n]??0;let r=zr[e]||zr.Major;return t==="6th"?r=[...r,9]:t==="7th (dom / m7)"?r=[...r,10]:t==="Major 7th (M7)"?r=[...r,11]:t==="9th"&&(r=[...r,10,14]),r.map(o=>_n(i+o,s))}const kf={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Nf={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Sf(n,e,t){return e==="Minor"&&t==="Major 7th (M7)"?`${n}m(maj7)`:`${n}${kf[e]??""}${Nf[t]??""}`}function Cf(n,e,t){const s=oi(n.name),i=s.includes("b");return{...n,name:Sf(s,e,t),notes:ai(s,e,t,i)}}function If(n,e,t){const s=e.chords[t],i=n.scales[s.scaleKey],r=Object.keys(i.degrees),o=fa.has(e.key)||e.key.includes("b"),a=[],c=e.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",l=`${e.key}_${c}`,h=n.scales[l],u=c==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(h){const m=Zn(u,Object.keys(h.degrees),s.degree);if(m){const _=fs(l,m,h,o);a.push({label:"Darker",sub:"heavier, more shadow",chord:_,functionCaption:`Borrowed · ${_.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${c==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const m=c==="NATURAL_MINOR"?Wr(e.key,8,"maj","Submediant","bVI","hold",o):Wr(e.key,5,"maj","Subdominant","IV","lift",o);a.push({label:"Darker",sub:"heavier, more shadow",chord:m,functionCaption:`Borrowed · ${m.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let d=s.scaleKey,p=i;if(e.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const m=`${e.key}_HARMONIC_MINOR`,_=n.scales[m];_?.degrees.DOMINANT&&(d=m,p=_)}const f=Zn(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(p.degrees),s.degree);if(f){const m=fs(d,f,p,o);a.push({label:"More tension",sub:"sharper pull forward",chord:m,functionCaption:`${m.functionLabel} · ${m.notes.join(" · ")}`,rationale:`Aimed at the ${m.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const g=Zn(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree);if(g){const m=fs(s.scaleKey,g,i,o);a.push({label:"Dreamier",sub:"softer, more air",chord:m,functionCaption:`${m.functionLabel} · ${m.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const m=fs(s.scaleKey,"TONIC",i,o);a.push({label:"Resolve home",sub:"settles back to center",chord:m,functionCaption:`${m.functionLabel} · ${m.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const Of={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Ef={m8:43303,circuit:43302};function Mf(n,e){let t=Of[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(t=`http://localhost:${Ef[e]}/`);const s=n.chords.map(i=>encodeURIComponent(i.name)).join("+");return`${t}?p=${s}`}var Df=Object.defineProperty,Rf=Object.getOwnPropertyDescriptor,tr=(n,e,t,s)=>{for(var i=s>1?void 0:s?Rf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Df(e,t,i),i};const $f=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],Pf=[{name:"Uplifting",dot:"oklch(0.55 0.12 165)"},{name:"Melancholy",dot:"oklch(0.42 0.09 245)"},{name:"Dreamy",dot:"oklch(0.60 0.08 205)"},{name:"Tense",dot:"oklch(0.45 0.20 35)"},{name:"Warm",dot:"oklch(0.55 0.15 55)"},{name:"Nostalgic",dot:"oklch(0.50 0.11 20)"}];let Ts=class extends ot{constructor(){super(...arguments),this.genre="Pop",this.mood="Uplifting"}selectGenre(n){this.dispatchEvent(new CustomEvent("genre-change",{detail:n,bubbles:!0,composed:!0}))}selectMood(n){this.dispatchEvent(new CustomEvent("mood-change",{detail:n,bubbles:!0,composed:!0}))}generate(){this.dispatchEvent(new CustomEvent("generate",{bubbles:!0,composed:!0}))}render(){return q`
      <div class="frame">
        <div class="grain"></div>
        <div class="wordmark">
          <div class="dot"></div>
          <div class="wordmark-text">Chord Voyager</div>
        </div>

        <h1>What's the<br /><em>feeling?</em></h1>
        <div class="subcopy">Pick a genre and a mood. We'll build the progression.</div>

        <div class="label-row">
          <div class="section-label">Genre</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${$f.map(n=>q`
            <div class="chip ${n===this.genre?"selected":""}" @click=${()=>this.selectGenre(n)}>${n}</div>
          `)}
        </div>

        <div class="label-row mood">
          <div class="section-label">Mood</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${Pf.map(n=>q`
            <div class="chip mood-chip ${n.name===this.mood?"selected":""}" @click=${()=>this.selectMood(n.name)}>
              <div class="mood-dot" style="background:${n.dot}"></div>${n.name}
            </div>
          `)}
        </div>

        <div class="spacer"></div>

        <div class="cta-wrap">
          <div class="cta-shadow"></div>
          <button class="cta" @click=${this.generate}>
            <div class="cta-glyph">
              <span class="cta-glyph-chord c1">C</span>
              <span class="cta-glyph-chord c2">Am</span>
              <span class="cta-glyph-chord c3">F</span>
              <span class="cta-glyph-chord c4">G7</span>
            </div>
            <span>Generate loop →</span>
          </button>
        </div>
        <div class="caption">Nothing here is permanent — swap any chord after.</div>

        <div class="footer">
          <a class="footer-link" href="https://github.com/warmsynths/chord-voyager" target="_blank" rel="noopener">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
          <span class="footer-divider">·</span>
          <span>Made with ❤️ by warmsynths</span>
          <span class="footer-divider">·</span>
          <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
        </div>
      </div>
    `}};Ts.styles=As`
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
      background: #C25A3C;
      flex-shrink: 0;
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
      color: var(--cv-accent);
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
    .cta-glyph {
      position: relative;
      width: 24px;
      height: 22px;
      flex-shrink: 0;
    }
    .cta-glyph-chord {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 15px;
    }
    .cta-glyph-chord.c1 { color: oklch(0.65 0.11 187); animation: cv-blur1 4s ease-in-out infinite; }
    .cta-glyph-chord.c2 { color: oklch(0.68 0.13 154); animation: cv-blur2 4s ease-in-out infinite; }
    .cta-glyph-chord.c3 { color: oklch(0.65 0.14 131); animation: cv-blur3 4s ease-in-out infinite; }
    .cta-glyph-chord.c4 { color: oklch(0.65 0.16 88); animation: cv-blur4 4s ease-in-out infinite; }
    @keyframes cv-blur1 { 0%, 4% { opacity: 1; filter: blur(0px); } 18%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur2 { 0%, 24% { opacity: 0; filter: blur(3px); } 28%, 40% { opacity: 1; filter: blur(0px); } 44%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur3 { 0%, 48% { opacity: 0; filter: blur(3px); } 52%, 64% { opacity: 1; filter: blur(0px); } 68%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur4 { 0%, 72% { opacity: 0; filter: blur(3px); } 76%, 88% { opacity: 1; filter: blur(0px); } 92%, 100% { opacity: 0; filter: blur(3px); } }
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
  `;tr([ye({type:String})],Ts.prototype,"genre",2);tr([ye({type:String})],Ts.prototype,"mood",2);Ts=tr([Ns("seed-screen")],Ts);var Vf=Object.defineProperty,Ff=Object.getOwnPropertyDescriptor,Re=(n,e,t,s)=>{for(var i=s>1?void 0:s?Ff(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Vf(e,t,i),i};const Lf=["C","D","E","F","G","A","B"],Uf=[{note:"C#",left:"10%"},{note:"D#",left:"24.2857%"},{note:"F#",left:"52.857%"},{note:"G#",left:"67.1428%"},{note:"A#",left:"81.4285%"}],Bf=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],jf=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}],qf={Darker:{size:22,weight:600},"More tension":{size:27,weight:700},Dreamier:{size:21,weight:500},"Resolve home":{size:19,weight:400}};let Ae=class extends ot{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.variant="sheet",this.visible=!1,this.resetKey=null,this.voicingOpen=!1,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=n=>{this.variant==="sheet"&&(n.preventDefault(),this.dragStartY=n.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0)},this.onGrabberMove=n=>{this.dragging&&(this.dragY=Math.max(0,n.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const n=Math.max(1,performance.now()-this.dragStartTime),e=this.dragY/n,t=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>t*.3||e>.6;this.snapping=!0,s?(this.dragY=t+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(n){n.target===n.currentTarget&&this.close()}toggleVoicing(){this.voicingOpen=!this.voicingOpen}setQuality(n){this.quality=n,this.previewVoicing(),this.commitVoicing()}setExtension(n){this.extension=n,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const n=oi(this.chord.name),e=n.includes("b"),t=ai(n,this.quality,this.extension,e);this.emit("voicing-preview",t)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(n){n.has("resetKey")&&(this.voicingOpen=!1,this.quality="Major",this.extension="None")}render(){const n=this.chord,e=oi(n.name),t=e.includes("b"),s=this.voicingOpen?ai(e,this.quality,this.extension,t):n.notes,i=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return q`
      ${this.variant==="sheet"?q`<div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>`:""}
      <div class="sheet ${this.variant} ${this.visible?"visible":""}" style=${i} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div class="sheet-title">Swap ${n.name}</div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>
        <div class="helper">Choose the feeling you want instead.</div>
        <div class="alt-list">
          ${this.alternatives.map(r=>{const o=qf[r.label]||{size:20,weight:500};return q`
              <div class="alt-row" @click=${()=>this.emit("select-alternative",r)}>
                <div class="alt-label" style="font-size:${o.size}px;font-weight:${o.weight};color:${r.chord.color}">${r.label}</div>
                <div class="alt-sub">${r.sub}</div>
                ${this.showTheory?q`
                  <div class="alt-function">${r.functionCaption}</div>
                  <div class="alt-rationale">${r.rationale}</div>
                `:""}
              </div>
            `})}
        </div>

        ${this.showTheory?q`
          <div class="voicing-section">
            <div class="voicing-toggle" @click=${this.toggleVoicing}>
              <div class="voicing-chevron ${this.voicingOpen?"open":""}">›</div>
              <div class="voicing-label">Adjust voicing</div>
            </div>
            ${this.voicingOpen?q`
              <div>
                <div class="bento">
                  ${Bf.map(r=>q`
                    <div class="bento-card ${r.label===this.quality?"selected":""}" @click=${()=>this.setQuality(r.label)}>
                      <div class="bento-label">${r.label}</div>
                      <div class="bento-sub">${r.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="bento ext">
                  ${jf.map((r,o)=>q`
                    <div class="bento-card ${o===0?"span":""} ${r.label===this.extension?"selected":""}" @click=${()=>this.setExtension(r.label)}>
                      <div class="bento-label">${r.label}</div>
                      <div class="bento-sub">${r.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
                <div class="keyboard">
                  ${Lf.map(r=>q`
                    <div class="white-key ${s.includes(r)?"active":""}">${r}</div>
                  `)}
                  ${Uf.map(r=>q`
                    <div class="black-key ${s.includes(r.note)?"active":""}" style="left:${r.left}"></div>
                  `)}
                </div>
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}};Ae.styles=As`
    :host {
      display: contents;
    }
    .scrim {
      position: absolute;
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
  `;Re([ye({type:Object})],Ae.prototype,"chord",2);Re([ye({type:Array})],Ae.prototype,"alternatives",2);Re([ye({type:Boolean})],Ae.prototype,"showTheory",2);Re([ye({type:String})],Ae.prototype,"variant",2);Re([ye({type:Boolean})],Ae.prototype,"visible",2);Re([ye({type:Number})],Ae.prototype,"resetKey",2);Re([J()],Ae.prototype,"voicingOpen",2);Re([J()],Ae.prototype,"quality",2);Re([J()],Ae.prototype,"extension",2);Re([J()],Ae.prototype,"dragY",2);Re([J()],Ae.prototype,"dragging",2);Re([J()],Ae.prototype,"snapping",2);Re([fi(".sheet")],Ae.prototype,"sheetEl",2);Ae=Re([Ns("swap-sheet")],Ae);var Wf=Object.defineProperty,zf=Object.getOwnPropertyDescriptor,xa=(n,e,t,s)=>{for(var i=s>1?void 0:s?zf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Wf(e,t,i),i};const Gf=so`
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
`,Yf=so`
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
`,Hf=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Gf},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:Yf}];let yn=class extends ot{constructor(){super(...arguments),this.visible=!1}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}render(){return q`
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
          ${Hf.map(n=>q`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",n)}>
              ${n.svg}
              <div class="dest-name">${n.name}</div>
              <div class="dest-desc">${n.desc}</div>
            </div>
          `)}
        </div>
      </div>
    `}};yn.styles=As`
    :host {
      display: block;
    }
    .backdrop {
      position: absolute;
      inset: 0;
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
  `;xa([ye({type:Boolean})],yn.prototype,"visible",2);yn=xa([Ns("share-modal")],yn);var Xf=Object.defineProperty,Zf=Object.getOwnPropertyDescriptor,fe=(n,e,t,s)=>{for(var i=s>1?void 0:s?Zf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Xf(e,t,i),i};const Gr=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],Yr=["Uplifting","Melancholy","Dreamy","Tense","Warm","Nostalgic"],Hr=["C","D","E","F","G","A","B"],Xr=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Zr=220,Qf=280;let ce=class extends ot{constructor(){super(...arguments),this.activeIndex=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.sheetOpen=!1,this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.itemHeight=0,this.cellSize={w:0,h:0},this.onDragMove=n=>{if(this.pressTimer&&!this.drag){(Math.abs(n.clientY-this.pressStartY)>8||Math.abs(n.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:n.clientX-this.pressStartX,offsetY:n.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const{screen:n,pos:e,offsetX:t,offsetY:s}=this.drag;let i=e;if(n==="mobile"){const r=this.itemHeight||1;i=Math.max(0,Math.min(this.order.length-1,e+Math.round(s/r)))}else{const r=this.cellSize.w||1,o=this.cellSize.h||1,a=Math.floor(e/2),c=e%2,l=Math.max(0,Math.min(1,a+Math.round(s/o))),h=Math.max(0,Math.min(1,c+Math.round(t/r)));i=l*2+h}if(this.drag=null,this.pressTapFn=null,i!==e){const r=[...this.order],[o]=r.splice(e,1);r.splice(i,0,o),this.emit("reorder",r)}}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}updated(n){n.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Qf)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1},Zr)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Zr)}exportDevice(n,e){this.closeShare();const t=Mf(this.progression,n);window.open(t,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=e,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}chipClass(n,e){return`menu-chip ${e?"selected":""} ${this.menuVisible?"visible":""}`}chipStyle(n){return`transition-delay: ${n*.025}s`}pressStart(n,e,t,s){s.preventDefault(),this.pressTapFn=t,this.pressStartX=s.clientX,this.pressStartY=s.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,n==="mobile"?this.itemHeight=this.stackEl?this.stackEl.offsetHeight/this.order.length:60:this.cellSize={w:this.gridEl?this.gridEl.offsetWidth/2:100,h:this.gridEl?this.gridEl.offsetHeight/2:100},this.drag={screen:n,pos:e,offsetX:0,offsetY:0}},150)}dragStyleFor(n,e){let t=0,s=0,i="transform .22s cubic-bezier(.2,.8,.2,1)",r=1,o=0,a="none",c=1,l=1;const h=this.drag;if(h&&h.screen===e)if(e==="mobile"){const d=this.itemHeight||1,p=Math.max(0,Math.min(this.order.length-1,h.pos+Math.round(h.offsetY/d)));if(n===h.pos)s=h.offsetY,i="none",r=1.035,o=-.6,a="0 16px 32px rgba(0,0,0,0.35)",c=20;else{const f=h.pos;f<p&&n>f&&n<=p?s=-d:f>p&&n>=p&&n<f&&(s=d),l=.86}}else{const d=this.cellSize.w||1,p=this.cellSize.h||1,f=Math.floor(h.pos/2),g=h.pos%2,m=Math.max(0,Math.min(1,f+Math.round(h.offsetY/p))),_=Math.max(0,Math.min(1,g+Math.round(h.offsetX/d))),b=m*2+_;if(n===h.pos)t=h.offsetX,s=h.offsetY,i="none",r=1.045,o=-.8,a="0 20px 40px rgba(0,0,0,0.38)",c=20;else{const T=[0,1,2,3],[k]=T.splice(h.pos,1);T.splice(b,0,k);const y=T.indexOf(n);if(y!==n){const x=Math.floor(n/2),w=n%2,v=Math.floor(y/2);t=(y%2-w)*d,s=(v-x)*p}l=.86}}const u=h&&h.screen===e&&n===h.pos?"grabbing":"grab";return`transform:translate(${t}px, ${s}px) scale(${r}) rotate(${o}deg);transition:${i};box-shadow:${a};z-index:${c};opacity:${l};touch-action:none;user-select:none;cursor:${u};`}render(){const n=this.progression,e=this.order[this.activeIndex]??0,t=n.chords[e];return q`
      <div class="frame">
        <div class="grain"></div>
        <div class="mobile-view">
        <div class="top-bar">
          <div class="icon-btn" @click=${()=>this.emit("back")}>‹</div>
          <div class="top-label">${n.genre} · ${n.mood}</div>
          <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
        </div>

        ${this.menuMounted?q`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${Hr.map((s,i)=>q`
                <div class="${this.chipClass(i,s===n.key)}" style=${this.chipStyle(i)} @click=${()=>this.emit("set-key",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${Xr.map((s,i)=>q`
                <div class="${this.chipClass(i+7,s.value===n.scaleType)}" style=${this.chipStyle(i+7)} @click=${()=>this.emit("set-scale",s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${Gr.map((s,i)=>q`
                <div class="${this.chipClass(i+13,s===n.genre)}" style=${this.chipStyle(i+13)} @click=${()=>this.emit("set-genre",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${Yr.map((s,i)=>q`
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
          ${this.order.map((s,i)=>{const r=n.chords[s],o=i===this.activeIndex;return q`
              <div
                class="chord-block"
                style="background:${r.color};${this.dragStyleFor(i,"mobile")}"
                @pointerdown=${a=>this.pressStart("mobile",i,()=>this.emit("chord-tap",s),a)}
              >
                <div class="chord-grain" style="opacity:${r.grain}"></div>
                ${o?q`
                  <div class="now-marker">
                    <div class="now-dot"></div>
                    <div class="now-text">now</div>
                  </div>
                `:""}
                <div class="chord-name" style="--amp:${r.tension};${o?`animation: cv-breathe ${2.6-r.tension*1.1}s ease-in-out infinite;`:""}">${r.name}</div>
                <div class="chord-meta">
                  <div class="chord-tag">${r.tag}</div>
                  ${this.showTheory?q`<div class="chord-roman">${r.roman}</div>`:""}
                </div>
              </div>
            `})}
        </div>

        ${this.showTheory?q`
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
            ${this.playing?q`<div class="play-square"></div>`:q`<div class="play-triangle"></div>`}
          </button>
          <div class="transport-label">${n.key.toUpperCase()} ${n.scaleType.replace("_"," ")} · ${n.bpm} BPM</div>
          <div class="dice-icon ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>⚄</div>
        </div>

        ${this.sheetMounted&&this.swapChord?q`
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
              <div class="wordmark-text">Chord Voyager</div>
            </div>

            <div class="desktop-section-label first">Genre</div>
            <div class="menu-chips">
              ${Gr.map(s=>q`
                <div class="menu-chip visible ${s===n.genre?"selected":""}" @click=${()=>this.emit("set-genre",s)}>${s}</div>
              `)}
            </div>

            <div class="desktop-section-label">Mood</div>
            <div class="menu-chips">
              ${Yr.map(s=>q`
                <div class="menu-chip visible ${s===n.mood?"selected":""}" @click=${()=>this.emit("set-mood",s)}>${s}</div>
              `)}
            </div>

            <div class="desktop-section-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${Hr.map(s=>q`
                <div class="menu-chip visible ${s===n.key?"selected":""}" @click=${()=>this.emit("set-key",s)}>${s}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${Xr.map(s=>q`
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
              ${this.order.map((s,i)=>{const r=n.chords[s],o=i===this.activeIndex;return q`
                  <div
                    class="chord-block"
                    style="background:${r.color};${this.dragStyleFor(i,"desktop")}"
                    @pointerdown=${a=>this.pressStart("desktop",i,()=>this.emit("chord-tap",s),a)}
                  >
                    <div class="chord-grain" style="opacity:${r.grain}"></div>
                    ${o?q`
                      <div class="now-marker">
                        <div class="now-dot"></div>
                        <div class="now-text">now</div>
                      </div>
                    `:""}
                    <div class="chord-name" style="--amp:${r.tension};${o?`animation: cv-breathe ${2.6-r.tension*1.1}s ease-in-out infinite;`:""}">${r.name}</div>
                    <div class="chord-meta">
                      <div class="chord-tag">${r.tag}</div>
                      ${this.showTheory?q`<div class="chord-roman">${r.roman}</div>`:""}
                    </div>
                  </div>
                `})}
            </div>

            <div class="transport">
              <button class="play-btn" @click=${()=>this.emit("toggle-play")}>
                ${this.playing?q`<div class="play-square"></div>`:q`<div class="play-triangle"></div>`}
              </button>
              <div class="desktop-transport-hint">Click a chord to explore a swap, on the right.</div>
              <div class="dice-icon ${this.spinning?"spinning":""}" @click=${()=>this.reroll()}>⚄</div>
            </div>

            <div class="desktop-footer">
              <a class="desktop-footer-link" href="https://github.com/warmsynths/chord-voyager" target="_blank" rel="noopener">
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
            ${this.sheetOpen&&this.swapChord?q`
              <swap-sheet
                variant="panel"
                .chord=${this.swapChord}
                .alternatives=${this.alternatives}
                .showTheory=${this.showTheory}
                .resetKey=${this.swapIndex}
              ></swap-sheet>
            `:q`
              <div class="desktop-swap-empty">Click a chord to hear it differently.</div>
            `}
          </div>
        </div>

        ${this.shareMounted?q`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${s=>this.exportDevice(s.detail.device,s.detail.name)}
          ></share-modal>
        `:""}

        ${this.toast?q`<div class="toast">Sent to ${this.toast}</div>`:""}
      </div>
    `}};ce.styles=As`
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
    .theory-panel {
      padding-top: 14px;
      margin-top: 6px;
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
      margin-top: 12px;
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
      position: absolute;
      inset: 0;
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
        background: #C25A3C;
        flex-shrink: 0;
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
  `;fe([ye({type:Object})],ce.prototype,"progression",2);fe([ye({type:Number})],ce.prototype,"activeIndex",2);fe([ye({type:Array})],ce.prototype,"order",2);fe([ye({type:Boolean})],ce.prototype,"playing",2);fe([ye({type:Boolean})],ce.prototype,"showTheory",2);fe([ye({type:Boolean})],ce.prototype,"sheetOpen",2);fe([ye({type:Object})],ce.prototype,"swapChord",2);fe([ye({type:Number})],ce.prototype,"swapIndex",2);fe([ye({type:Array})],ce.prototype,"alternatives",2);fe([J()],ce.prototype,"menuMounted",2);fe([J()],ce.prototype,"menuVisible",2);fe([J()],ce.prototype,"shareMounted",2);fe([J()],ce.prototype,"shareVisible",2);fe([J()],ce.prototype,"sheetMounted",2);fe([J()],ce.prototype,"sheetVisible",2);fe([J()],ce.prototype,"toast",2);fe([J()],ce.prototype,"spinning",2);fe([J()],ce.prototype,"drag",2);fe([fi(".chord-stack")],ce.prototype,"stackEl",2);fe([fi(".desktop-chord-grid")],ce.prototype,"gridEl",2);ce=fe([Ns("loop-screen")],ce);var Jf=Object.defineProperty,Kf=Object.getOwnPropertyDescriptor,Oe=(n,e,t,s)=>{for(var i=s>1?void 0:s?Kf(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Jf(e,t,i),i};let we=class extends ot{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Uplifting",this.progression=null,this.activeIndex=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!0,this.showTheory=!1,this.sheetOpen=!1,this.swapIndex=null,this.alternatives=[],this.currentProjectId=null,this.autoplayTimer=null,this.AUTHORIZED_HASHES=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"],this.driveService=new Xa,this.tokenClient=null,this.isAuthenticated=!1,this.isDriveSyncing=!1}async firstUpdated(){this.showTheory=localStorage.getItem("chord-voyager-show-theory")==="true";try{this.chordData=await mf()}catch(n){console.error("Failed to load chord voyager data:",n)}}disconnectedCallback(){super.disconnectedCallback(),this.stopAutoplay()}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{!this.progression||!this.playing||this.sheetOpen||(this.activeIndex=(this.activeIndex+1)%this.order.length,this.playActiveChord())},1700)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}playActiveChord(){if(!this.progression)return;const n=this.order[this.activeIndex]??0,e=this.progression.chords[n];Ys(e.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm})}onGenreChange(n){this.genre=n.detail}onMoodChange(n){this.mood=n.detail}onGenerate(){this.keyOverride=null,this.scaleOverride=null;const n=qr(this.chordData,this.genre,this.mood);this.progression=n,this.order=[0,1,2,3],this.activeIndex=0,this.playing=!1,this.screen="loop",this.saveProject()}regenerate(){const n=qr(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0});this.progression=n,this.order=[0,1,2,3],this.activeIndex=0,this.saveProject(),this.playing&&(this.startAutoplay(),this.playActiveChord())}onSetKey(n){this.keyOverride=n.detail,this.regenerate()}onSetScale(n){this.scaleOverride=n.detail,this.regenerate()}onSetGenre(n){this.genre=n.detail,this.regenerate()}onSetMood(n){this.mood=n.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(n){if(!this.progression)return;const e=this.order[this.activeIndex];this.order=n.detail;const t=this.order.indexOf(e);this.activeIndex=t>=0?t:0,this.saveProject()}onBack(){this.stopAutoplay(),this.screen="seed",this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chord-voyager-show-theory",String(this.showTheory))}onTogglePlay(){this.playing?(this.playing=!1,this.activeIndex=0,this.stopAutoplay()):(this.playing=!0,this.activeIndex=0,this.startAutoplay(),this.playActiveChord())}onChordTap(n){this.progression&&(this.swapIndex=n.detail,this.alternatives=If(this.chordData,this.progression,n.detail),this.sheetOpen=!0,Ys(this.progression.chords[n.detail].notes.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8}))}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=n.detail.chord,this.progression={...this.progression,chords:e},this.sheetOpen=!1,this.swapIndex=null,this.saveProject(),Ys(n.detail.chord.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8})}onVoicingPreview(n){this.progression&&Ys(n.detail.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.6})}onVoicingChange(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=Cf(e[this.swapIndex],n.detail.quality,n.detail.extension),this.progression={...this.progression,chords:e},this.saveProject()}saveProject(){if(!this.progression)return;const n=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=n;const e={id:n,name:`${this.progression.genre} · ${this.progression.mood}`,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};qt.saveProject(e),this.syncProjectsToCloud()}initSilentAuth(){const n=localStorage.getItem("chord-voyager-auth");n&&this.hashEmail(n).then(e=>{this.AUTHORIZED_HASHES.includes(e)&&(this.isAuthenticated=!0,this.setupGoogleAuth())})}setupGoogleAuth(){const n=setInterval(()=>{if(window.google){clearInterval(n),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async e=>{if(!(!e||!e.access_token))try{const t=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${e.access_token}`}});if(!t.ok)return;const s=await t.json();if(!s?.email)return;const i=await this.hashEmail(s.email);if(!this.AUTHORIZED_HASHES.includes(i))return;this.isAuthenticated=!0,localStorage.setItem("chord-voyager-auth",s.email),this.driveService.setAccessToken(e.access_token),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(t){console.error("Silent Drive auth failed",t)}}});try{this.tokenClient.requestAccessToken({prompt:""})}catch(e){console.error("Failed to request Drive access silently",e)}}},200)}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const n=await this.driveService.loadProjects();if(n){n.forEach(s=>s.syncedToCloud=!0);const e=qt.getProjects(),t=qt.mergeProjects(e,n);qt.setProjects(t)}}catch(n){console.error("Failed to sync from cloud",n)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!(!this.isAuthenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const n=qt.getProjects();await this.driveService.saveProjects(n),n.forEach(e=>e.syncedToCloud=!0),qt.setProjects(n)}catch(n){console.error("Failed to sync to cloud",n)}finally{this.isDriveSyncing=!1}}}async hashEmail(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(s)).map(r=>r.toString(16).padStart(2,"0")).join("")}render(){if(this.screen==="seed"||!this.progression)return q`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @generate=${this.onGenerate}
        ></seed-screen>
      `;const n=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;return q`
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
    `}};we.styles=As`
    :host {
      display: block;
      min-height: 100dvh;
    }
  `;Oe([J()],we.prototype,"chordData",2);Oe([J()],we.prototype,"screen",2);Oe([J()],we.prototype,"genre",2);Oe([J()],we.prototype,"mood",2);Oe([J()],we.prototype,"progression",2);Oe([J()],we.prototype,"activeIndex",2);Oe([J()],we.prototype,"order",2);Oe([J()],we.prototype,"keyOverride",2);Oe([J()],we.prototype,"scaleOverride",2);Oe([J()],we.prototype,"playing",2);Oe([J()],we.prototype,"showTheory",2);Oe([J()],we.prototype,"sheetOpen",2);Oe([J()],we.prototype,"swapIndex",2);Oe([J()],we.prototype,"alternatives",2);we=Oe([Ns("chord-voyager-app")],we);
