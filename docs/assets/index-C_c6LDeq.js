(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mn=globalThis,zi=mn.ShadowRoot&&(mn.ShadyCSS===void 0||mn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wi=Symbol(),zr=new WeakMap;let Lo=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Wi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(zi&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=zr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&zr.set(t,e))}return e}toString(){return this.cssText}};const mc=n=>new Lo(typeof n=="string"?n:n+"",void 0,Wi),Mt=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Lo(t,n,Wi)},gc=(n,e)=>{if(zi)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=mn.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},Wr=zi?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return mc(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:yc,defineProperty:_c,getOwnPropertyDescriptor:vc,getOwnPropertyNames:xc,getOwnPropertySymbols:bc,getPrototypeOf:wc}=Object,zn=globalThis,Gr=zn.trustedTypes,Tc=Gr?Gr.emptyScript:"",Ac=zn.reactiveElementPolyfillSupport,Rs=(n,e)=>n,xn={toAttribute(n,e){switch(e){case Boolean:n=n?Tc:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Gi=(n,e)=>!yc(n,e),Yr={attribute:!0,type:String,converter:xn,reflect:!1,useDefault:!1,hasChanged:Gi};Symbol.metadata??=Symbol("metadata"),zn.litPropertyMetadata??=new WeakMap;let as=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Yr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&_c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=vc(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Yr}static _$Ei(){if(this.hasOwnProperty(Rs("elementProperties")))return;const e=wc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Rs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Rs("properties"))){const t=this.properties,s=[...xc(t),...bc(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Wr(i))}else e!==void 0&&t.push(Wr(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gc(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:xn).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xn;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??Gi)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,r]of s){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};as.elementStyles=[],as.shadowRootOptions={mode:"open"},as[Rs("elementProperties")]=new Map,as[Rs("finalized")]=new Map,Ac?.({ReactiveElement:as}),(zn.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yi=globalThis,Hr=n=>n,bn=Yi.trustedTypes,Xr=bn?bn.createPolicy("lit-html",{createHTML:n=>n}):void 0,Bo="$lit$",Nt=`lit$${Math.random().toFixed(9).slice(2)}$`,Uo="?"+Nt,Sc=`<${Uo}>`,Gt=document,Fs=()=>Gt.createComment(""),Vs=n=>n===null||typeof n!="object"&&typeof n!="function",Hi=Array.isArray,kc=n=>Hi(n)||typeof n?.[Symbol.iterator]=="function",xi=`[ 	
\f\r]`,Os=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zr=/-->/g,Qr=/>/g,Lt=RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jr=/'/g,Kr=/"/g,jo=/^(?:script|style|textarea|title)$/i,qo=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),M=qo(1),St=qo(2),ms=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),eo=new WeakMap,Ut=Gt.createTreeWalker(Gt,129);function zo(n,e){if(!Hi(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xr!==void 0?Xr.createHTML(e):e}const Nc=(n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=Os;for(let a=0;a<t;a++){const c=n[a];let l,h,u=-1,d=0;for(;d<c.length&&(o.lastIndex=d,h=o.exec(c),h!==null);)d=o.lastIndex,o===Os?h[1]==="!--"?o=Zr:h[1]!==void 0?o=Qr:h[2]!==void 0?(jo.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=Lt):h[3]!==void 0&&(o=Lt):o===Lt?h[0]===">"?(o=i??Os,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?Lt:h[3]==='"'?Kr:Jr):o===Kr||o===Jr?o=Lt:o===Zr||o===Qr?o=Os:(o=Lt,i=void 0);const p=o===Lt&&n[a+1].startsWith("/>")?" ":"";r+=o===Os?c+Sc:u>=0?(s.push(l),c.slice(0,u)+Bo+c.slice(u)+Nt+p):c+Nt+(u===-2?a:p)}return[zo(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Ls{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,h]=Nc(e,t);if(this.el=Ls.createElement(l,s),Ut.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=Ut.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Bo)){const d=h[o++],p=i.getAttribute(u).split(Nt),f=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:f[2],strings:p,ctor:f[1]==="."?Ic:f[1]==="?"?Oc:f[1]==="@"?Ec:Wn}),i.removeAttribute(u)}else u.startsWith(Nt)&&(c.push({type:6,index:r}),i.removeAttribute(u));if(jo.test(i.tagName)){const u=i.textContent.split(Nt),d=u.length-1;if(d>0){i.textContent=bn?bn.emptyScript:"";for(let p=0;p<d;p++)i.append(u[p],Fs()),Ut.nextNode(),c.push({type:2,index:++r});i.append(u[d],Fs())}}}else if(i.nodeType===8)if(i.data===Uo)c.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(Nt,u+1))!==-1;)c.push({type:7,index:r}),u+=Nt.length-1}r++}}static createElement(e,t){const s=Gt.createElement("template");return s.innerHTML=e,s}}function gs(n,e,t=n,s){if(e===ms)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl;const r=Vs(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=gs(n,i._$AS(n,e.values),i,s)),e}class Cc{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??Gt).importNode(t,!0);Ut.currentNode=i;let r=Ut.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new Xs(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new Mc(r,this,e)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=Ut.nextNode(),o++)}return Ut.currentNode=Gt,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Xs{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=gs(this,e,t),Vs(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==ms&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):kc(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&Vs(this._$AH)?this._$AA.nextSibling.data=e:this.T(Gt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ls.createElement(zo(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new Cc(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=eo.get(e.strings);return t===void 0&&eo.set(e.strings,t=new Ls(e)),t}k(e){Hi(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Xs(this.O(Fs()),this.O(Fs()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=Hr(e).nextSibling;Hr(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Wn{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ve}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=gs(this,e,t,0),o=!Vs(e)||e!==this._$AH&&e!==ms,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=gs(this,a[s+c],t,c),l===ms&&(l=this._$AH[c]),o||=!Vs(l)||l!==this._$AH[c],l===ve?e=ve:e!==ve&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ic extends Wn{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}}class Oc extends Wn{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}}class Ec extends Wn{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=gs(this,e,t,0)??ve)===ms)return;const s=this._$AH,i=e===ve&&s!==ve||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==ve&&(s===ve||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Mc{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){gs(this,e)}}const Dc=Yi.litHtmlPolyfillSupport;Dc?.(Ls,Xs),(Yi.litHtmlVersions??=[]).push("3.3.3");const Rc=(n,e,t)=>{const s=t?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const r=t?.renderBefore??null;s._$litPart$=i=new Xs(e.insertBefore(Fs(),r),r,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xi=globalThis;class Ge extends as{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Rc(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ms}}Ge._$litElement$=!0,Ge.finalized=!0,Xi.litElementHydrateSupport?.({LitElement:Ge});const $c=Xi.litElementPolyfillSupport;$c?.({LitElement:Ge});(Xi.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pc={attribute:!0,type:String,converter:xn,reflect:!1,hasChanged:Gi},Fc=(n=Pc,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),s==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(s==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+s)};function Q(n){return(e,t)=>typeof t=="object"?Fc(n,e,t):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(n){return Q({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vc=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Lc(n,e){return(t,s,i)=>{const r=o=>o.renderRoot?.querySelector(n)??null;return Vc(t,s,{get(){return r(this)}})}}const Es="chroma_chords_projects",Bc="chord_voyager_projects";class is{static getProjects(){try{let e=localStorage.getItem(Es);if(e||(e=localStorage.getItem(Bc),e&&localStorage.setItem(Es,e)),e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(Es,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const s=new Map;return e.forEach(i=>s.set(i.id,i)),t.forEach(i=>{const r=s.get(i.id);!r||i.lastModified>r.lastModified?s.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(e){const t=this.getProjects(),s=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),s>=0?t[s]=e:t.push(e);try{localStorage.setItem(Es,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(s=>s.id!==e);try{localStorage.setItem(Es,JSON.stringify(t))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,s)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},i.onerror=()=>s(new Error("Failed to read file")),i.readAsText(e)})}}class Uc{constructor(){this.accessToken=null,this.FILENAME="chroma_chords_projects.json",this.OLD_FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const s=await t.json();if(s.files&&s.files.length>0)return s.files[0].id;const i=encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`),r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${i}&fields=files(id)`,{method:"GET",headers:this.headers});if(r.ok){const o=await r.json();if(o.files&&o.files.length>0)return o.files[0].id}return null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),s=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}async findAudioFileId(e){try{const t=`recording_${e}.webm`,s=encodeURIComponent(`name='${t}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const r=await i.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(t){throw console.error(`Failed to find audio file for project ${e}:`,t),t}}async uploadAudioFile(e,t){try{const s=`recording_${e}.webm`,i=await this.findAudioFileId(e);if(i){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return i}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const a=(await r.json()).id,c=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!c.ok)throw new Error(`Failed to upload new audio file content: ${c.statusText}`);return a}}catch(s){throw console.error(`Failed to upload audio file for project ${e}:`,s),s}}async downloadAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(t){throw console.error(`Failed to download audio file for project ${e}:`,t),t}}async deleteAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(t){throw console.error(`Failed to delete audio file for project ${e}:`,t),t}}}const Wo="15.1.22",to=(n,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:n}),so=(n,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:n}),ki=(n,e)=>({startTime:e,type:"setValue",value:n}),Go=(n,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:n}),Yo=(n,e,{startTime:t,target:s,timeConstant:i})=>s+(e-s)*Math.exp((t-n)/i),ls=n=>n.type==="exponentialRampToValue",wn=n=>n.type==="linearRampToValue",kt=n=>ls(n)||wn(n),Zi=n=>n.type==="setValue",dt=n=>n.type==="setValueCurve",Tn=(n,e,t,s)=>{const i=n[e];return i===void 0?s:kt(i)||Zi(i)?i.value:dt(i)?i.values[i.values.length-1]:Yo(t,Tn(n,e-1,i.startTime,s),i)},no=(n,e,t,s,i)=>t===void 0?[s.insertTime,i]:kt(t)?[t.endTime,t.value]:Zi(t)?[t.startTime,t.value]:dt(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,Tn(n,e-1,t.startTime,i)],Ni=n=>n.type==="cancelAndHold",Ci=n=>n.type==="cancelScheduledValues",At=n=>Ni(n)||Ci(n)?n.cancelTime:ls(n)||wn(n)?n.endTime:n.startTime,io=(n,e,t,{endTime:s,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((n-e)/(s-e)):n<s?t:i,ro=(n,e,t,{endTime:s,value:i})=>t+(n-e)/(s-e)*(i-t),Ho=(n,e)=>{const t=Math.floor(e);if(t===e)return n[t];const s=Math.ceil(e);return(1-(e-t))*n[t]+(1-(s-e))*n[s]},jc=(n,{duration:e,startTime:t,values:s})=>{const i=(n-t)/e*(s.length-1);return Ho(s,i)},qc=(n,e,t)=>{const s=n.length,i=Math.max(1,Math.floor(t/e*s))+1,r=n instanceof Float32Array?new Float32Array(i):n.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(s-1);r[o]=Ho(n,c)}return r},un=n=>n.type==="setTarget";class zc{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=At(e);if(Ni(e)||Ci(e)){const s=this._automationEvents.findIndex(r=>Ci(e)&&dt(r)?r.startTime+r.duration>=t:At(r)>=t),i=this._automationEvents[s];if(s!==-1&&(this._automationEvents=this._automationEvents.slice(0,s)),Ni(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&kt(i)){if(r!==void 0&&un(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:dt(r)?r.startTime+r.duration:At(r),a=r===void 0?this._defaultValue:dt(r)?r.values[r.values.length-1]:r.value,c=ls(i)?io(t,o,a,i):ro(t,o,a,i),l=ls(i)?to(c,t,this._currenTime):so(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&un(r)&&this._automationEvents.push(ki(this.getValue(t),t)),r!==void 0&&dt(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=Go(qc(r.values,r.duration,o),r.startTime,o)}}}else{const s=this._automationEvents.findIndex(o=>At(o)>t),i=s===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[s-1];if(i!==void 0&&dt(i)&&At(i)+i.duration>t)return!1;const r=ls(e)?to(e.value,e.endTime,this._currenTime):wn(e)?so(e.value,t,this._currenTime):e;if(s===-1)this._automationEvents.push(r);else{if(dt(e)&&t+e.duration>At(this._automationEvents[s]))return!1;this._automationEvents.splice(s,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(s=>At(s)>e);if(t>1){const s=this._automationEvents.slice(t-1),i=s[0];un(i)&&s.unshift(ki(Tn(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=s}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>At(o)>e),s=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&un(r)&&(s===void 0||!kt(s)||s.insertTime>e))return Yo(e,Tn(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&Zi(r)&&(s===void 0||!kt(s)))return r.value;if(r!==void 0&&dt(r)&&(s===void 0||!kt(s)||r.startTime+r.duration>e))return e<r.startTime+r.duration?jc(e,r):r.values[r.values.length-1];if(r!==void 0&&kt(r)&&(s===void 0||!kt(s)))return r.value;if(s!==void 0&&ls(s)){const[o,a]=no(this._automationEvents,i,r,s,this._defaultValue);return io(e,o,a,s)}if(s!==void 0&&wn(s)){const[o,a]=no(this._automationEvents,i,r,s,this._defaultValue);return ro(e,o,a,s)}return this._defaultValue}}const Wc=n=>({cancelTime:n,type:"cancelAndHold"}),Gc=n=>({cancelTime:n,type:"cancelScheduledValues"}),Yc=(n,e)=>({endTime:e,type:"exponentialRampToValue",value:n}),Hc=(n,e)=>({endTime:e,type:"linearRampToValue",value:n}),Xc=(n,e,t)=>({startTime:e,target:n,timeConstant:t,type:"setTarget"}),Zc=()=>new DOMException("","AbortError"),Qc=n=>(e,t,[s,i,r],o)=>{n(e[i],[t,s,r],a=>a[0]===t&&a[1]===s,o)},Jc=n=>(e,t,s)=>{const i=[];for(let r=0;r<s.numberOfInputs;r+=1)i.push(new Set);n.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},Kc=n=>(e,t)=>{n.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},ys=new WeakSet,Xo=new WeakMap,Qi=new WeakMap,Zo=new WeakMap,Ji=new WeakMap,Gn=new WeakMap,Qo=new WeakMap,Ii=new WeakMap,Oi=new WeakMap,Ei=new WeakMap,Jo={construct(){return Jo}},el=n=>{try{const e=new Proxy(n,Jo);new e}catch{return!1}return!0},oo=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,ao=(n,e)=>{const t=[];let s=n.replace(/^[\s]+/,""),i=s.match(oo);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),s=s.slice(i[0].length).replace(/^[\s]+/,""),i=s.match(oo)}return[t.join(";"),s]},co=n=>{if(n!==void 0&&!Array.isArray(n))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},lo=n=>{if(!el(n))throw new TypeError("The given value for processorCtor should be a constructor.");if(n.prototype===null||typeof n.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},tl=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>{let p=0;return(f,m,g={credentials:"omit"})=>{const y=h.get(f);if(y!==void 0&&y.has(m))return Promise.resolve();const w=l.get(f);if(w!==void 0){const _=w.get(m);if(_!==void 0)return _}const x=r(f),A=x.audioWorklet===void 0?i(m).then(([_,b])=>{const[T,v]=ao(_,b),C=`${T};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${v}
})})(window,'_AWGS')`;return t(C)}).then(()=>{const _=d._AWGS.pop();if(_===void 0)throw new SyntaxError;s(x.currentTime,x.sampleRate,()=>_(class{},void 0,(b,T)=>{if(b.trim()==="")throw e();const v=Oi.get(x);if(v!==void 0){if(v.has(b))throw e();lo(T),co(T.parameterDescriptors),v.set(b,T)}else lo(T),co(T.parameterDescriptors),Oi.set(x,new Map([[b,T]]))},x.sampleRate,void 0,void 0))}):Promise.all([i(m),Promise.resolve(n(u,u))]).then(([[_,b],T])=>{const v=p+1;p=v;const[C,S]=ao(_,b),O=`${C};((AudioWorkletProcessor,registerProcessor)=>{${S}
})(${T?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${T?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${T?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${v}',class extends AudioWorkletProcessor{process(){return !1}})`,L=new Blob([O],{type:"application/javascript; charset=utf-8"}),$=URL.createObjectURL(L);return x.audioWorklet.addModule($,g).then(()=>{if(a(x))return x;const F=o(x);return F.audioWorklet.addModule($,g).then(()=>F)}).then(F=>{if(c===null)throw new SyntaxError;try{new c(F,`__sac${v}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL($))});return w===void 0?l.set(f,new Map([[m,A]])):w.set(m,A),A.then(()=>{const _=h.get(f);_===void 0?h.set(f,new Set([m])):_.add(m)}).finally(()=>{const _=l.get(f);_!==void 0&&_.delete(m)}),A}},Je=(n,e)=>{const t=n.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},Yn=(n,e)=>{const t=Array.from(n).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[s]=t;return n.delete(s),s},Ko=(n,e,t,s)=>{const i=Je(n,e),r=Yn(i,o=>o[0]===t&&o[1]===s);return i.size===0&&n.delete(e),r},Zs=n=>Je(Qo,n),_s=n=>{if(ys.has(n))throw new Error("The AudioNode is already stored.");ys.add(n),Zs(n).forEach(e=>e(!0))},ea=n=>"port"in n,Qs=n=>{if(!ys.has(n))throw new Error("The AudioNode is not stored.");ys.delete(n),Zs(n).forEach(e=>e(!1))},Mi=(n,e)=>{!ea(n)&&e.every(t=>t.size===0)&&Qs(n)},sl=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>{const p=new WeakMap;return(f,m,g,y,w)=>{const{activeInputs:x,passiveInputs:A}=r(m),{outputs:_}=r(f),b=a(f),T=v=>{const C=c(m),S=c(f);if(v){const N=Ko(A,f,g,y);n(x,f,N,!1),!w&&!u(f)&&t(S,C,g,y),d(m)&&_s(m)}else{const N=s(x,f,g,y);e(A,y,N,!1),!w&&!u(f)&&i(S,C,g,y);const k=o(m);if(k===0)h(m)&&Mi(m,x);else{const E=p.get(m);E!==void 0&&clearTimeout(E),p.set(m,setTimeout(()=>{h(m)&&Mi(m,x)},k*1e3))}}};return l(_,[m,g,y],v=>v[0]===m&&v[1]===g&&v[2]===y,!0)?(b.add(T),h(f)?n(x,f,[g,y,T],!0):e(A,y,[f,g,T],!0),!0):!1}},nl=n=>(e,t,[s,i,r],o)=>{const a=e.get(s);a===void 0?e.set(s,new Set([[i,t,r]])):n(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},il=n=>(e,t)=>{const s=n(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(s).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(s),s.disconnect()};t.addEventListener("ended",i)},rl=n=>(e,t)=>{n(e).add(t)},ol={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},al=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...ol,...c},u=s(l,h),d=r(l)?e():null;super(a,!1,u,d),this._nativeAnalyserNode=u}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Ce=(n,e)=>n.context===e,cl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ce(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},An=n=>{try{n.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},ct=()=>new DOMException("","IndexSizeError"),Ki=n=>{n.getChannelData=(e=>t=>{try{return e.call(n,t)}catch(s){throw s.code===12?ct():s}})(n.getChannelData)},ll={numberOfChannels:1},hl=(n,e,t,s,i,r,o,a)=>{let c=null;return class ta{constructor(h){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:u,numberOfChannels:d,sampleRate:p}={...ll,...h};c===null&&(c=new i(1,1,44100));const f=s!==null&&e(r,r)?new s({length:u,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,u,p);if(f.numberOfChannels===0)throw t();return typeof f.copyFromChannel!="function"?(o(f),Ki(f)):e(An,()=>An(f))||a(f),n.add(f),f}static[Symbol.hasInstance](h){return h!==null&&typeof h=="object"&&Object.getPrototypeOf(h)===ta.prototype||n.has(h)}}},Re=-34028234663852886e22,Ee=-Re,pt=n=>ys.has(n),ul={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},dl=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...ul,...h},p=i(u,d),f=o(u),m=f?e():null;super(l,!1,p,m),this._audioBufferSourceNodeRenderer=m,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,f,p.playbackRate,Ee,Re)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw s();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const h=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=h;const u=this._nativeAudioBufferSourceNode.onended;this._onended=u!==null&&u===h?l:u}get playbackRate(){return this._playbackRate}start(l=0,h=0,u){if(this._nativeAudioBufferSourceNode.start(l,h,u),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=u===void 0?[l,h]:[l,h,u]),this.context.state!=="closed"){_s(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),pt(this)&&Qs(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},pl=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=Ce(u,h);if(!d){const p={buffer:u.buffer,channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,loop:u.loop,loopEnd:u.loopEnd,loopStart:u.loopStart,playbackRate:u.playbackRate.value};u=e(h,p),o!==null&&u.start(...o),a!==null&&u.stop(a)}return r.set(h,u),d?await n(h,l.playbackRate,u.playbackRate):await s(h,l.playbackRate,u.playbackRate),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},fl=n=>"playbackRate"in n,ml=n=>"frequency"in n&&"gain"in n,gl=n=>"offset"in n,yl=n=>!("frequency"in n)&&"gain"in n,_l=n=>"detune"in n&&"frequency"in n&&!("gain"in n),vl=n=>"pan"in n,Me=n=>Je(Xo,n),Js=n=>Je(Zo,n),Di=(n,e)=>{const{activeInputs:t}=Me(n);t.forEach(i=>i.forEach(([r])=>{e.includes(n)||Di(r,[...e,n])}));const s=fl(n)?[n.playbackRate]:ea(n)?Array.from(n.parameters.values()):ml(n)?[n.Q,n.detune,n.frequency,n.gain]:gl(n)?[n.offset]:yl(n)?[n.gain]:_l(n)?[n.detune,n.frequency]:vl(n)?[n.pan]:[];for(const i of s){const r=Js(i);r!==void 0&&r.activeInputs.forEach(([o])=>Di(o,e))}pt(n)&&Qs(n)},sa=n=>{Di(n.destination,[])},xl=n=>n===void 0||typeof n=="number"||typeof n=="string"&&(n==="balanced"||n==="interactive"||n==="playback"),bl=(n,e,t,s,i,r,o,a,c)=>class extends n{constructor(h={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let u;try{u=new c(h)}catch(f){throw f.code===12&&f.message==="sampleRate is not in range"?t():f}if(u===null)throw s();if(!xl(h.latencyHint))throw new TypeError(`The provided value '${h.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(h.sampleRate!==void 0&&u.sampleRate!==h.sampleRate)throw t();super(u,2);const{latencyHint:d}=h,{sampleRate:p}=u;if(this._baseLatency=typeof u.baseLatency=="number"?u.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=u,c.name==="webkitAudioContext"?(this._nativeGainNode=u.createGain(),this._nativeOscillatorNode=u.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(u.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,u.state==="running"){this._state="suspended";const f=()=>{this._state==="suspended"&&(this._state=null),u.removeEventListener("statechange",f)};u.addEventListener("statechange",f)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),sa(this)}))}createMediaElementSource(h){return new i(this,{mediaElement:h})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(h){return new o(this,{mediaStream:h})}createMediaStreamTrackSource(h){return new a(this,{mediaStreamTrack:h})}resume(){return this._state==="suspended"?new Promise((h,u)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?h():this.resume().then(h,u)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(h=>{throw h===void 0||h.code===15?e():h})}suspend(){return this._nativeAudioContext.suspend().catch(h=>{throw h===void 0?e():h})}},wl=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d=o(u),p=i(u,h,d),f=d?e(a):null;super(l,!1,p,f),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Tl=n=>{const e=new WeakMap,t=async(s,i)=>{const r=i.destination;return e.set(i,r),await n(s,i,r),r};return{render(s,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(s,i)}}},Al=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=l.listener,u=()=>{const _=new Float32Array(1),b=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),T=o(l);let v=!1,C=[0,0,-1,0,1,0],S=[0,0,0];const N=()=>{if(v)return;v=!0;const L=s(l,256,9,0);L.onaudioprocess=({inputBuffer:$})=>{const F=[r($,_,0),r($,_,1),r($,_,2),r($,_,3),r($,_,4),r($,_,5)];F.some((B,z)=>B!==C[z])&&(h.setOrientation(...F),C=F);const W=[r($,_,6),r($,_,7),r($,_,8)];W.some((B,z)=>B!==S[z])&&(h.setPosition(...W),S=W)},b.connect(L)},k=L=>$=>{$!==C[L]&&(C[L]=$,h.setOrientation(...C))},E=L=>$=>{$!==S[L]&&(S[L]=$,h.setPosition(...S))},O=(L,$,F)=>{const W=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:$});W.connect(b,0,L),W.start(),Object.defineProperty(W.offset,"defaultValue",{get(){return $}});const B=n({context:c},T,W.offset,Ee,Re);return a(B,"value",z=>()=>z.call(B),z=>q=>{try{z.call(B,q)}catch(ne){if(ne.code!==9)throw ne}N(),T&&F(q)}),B.cancelAndHoldAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.cancelAndHoldAtTime),B.cancelScheduledValues=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.cancelScheduledValues),B.exponentialRampToValueAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.exponentialRampToValueAtTime),B.linearRampToValueAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.linearRampToValueAtTime),B.setTargetAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.setTargetAtTime),B.setValueAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.setValueAtTime),B.setValueCurveAtTime=(z=>T?()=>{throw i()}:(...q)=>{const ne=z.apply(B,q);return N(),ne})(B.setValueCurveAtTime),B};return{forwardX:O(0,0,k(0)),forwardY:O(1,0,k(1)),forwardZ:O(2,-1,k(2)),positionX:O(6,0,E(0)),positionY:O(7,0,E(1)),positionZ:O(8,0,E(2)),upX:O(3,0,k(3)),upY:O(4,1,k(4)),upZ:O(5,0,k(5))}},{forwardX:d,forwardY:p,forwardZ:f,positionX:m,positionY:g,positionZ:y,upX:w,upY:x,upZ:A}=h.forwardX===void 0?u():h;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return f},get positionX(){return m},get positionY(){return g},get positionZ(){return y},get upX(){return w},get upY(){return x},get upZ(){return A}}},Sn=n=>"context"in n,Ks=n=>Sn(n[0]),Jt=(n,e,t,s)=>{for(const i of n)if(t(i)){if(s)return!1;throw Error("The set contains at least one similar element.")}return n.add(e),!0},ho=(n,e,[t,s],i)=>{Jt(n,[e,t,s],r=>r[0]===e&&r[1]===t,i)},uo=(n,[e,t,s],i)=>{const r=n.get(e);r===void 0?n.set(e,new Set([[t,s]])):Jt(r,[t,s],o=>o[0]===t,i)},ws=n=>"inputs"in n,kn=(n,e,t,s)=>{if(ws(e)){const i=e.inputs[s];return n.connect(i,t,0),[i,t,0]}return n.connect(e,t,s),[e,t,s]},na=(n,e,t)=>{for(const s of n)if(s[0]===e&&s[1]===t)return n.delete(s),s;return null},Sl=(n,e,t)=>Yn(n,s=>s[0]===e&&s[1]===t),ia=(n,e)=>{if(!Zs(n).delete(e))throw new Error("Missing the expected event listener.")},ra=(n,e,t)=>{const s=Je(n,e),i=Yn(s,r=>r[0]===t);return s.size===0&&n.delete(e),i},Nn=(n,e,t,s)=>{ws(e)?n.disconnect(e.inputs[s],t,0):n.disconnect(e,t,s)},ae=n=>Je(Qi,n),Bs=n=>Je(Ji,n),Yt=n=>Ii.has(n),gn=n=>!ys.has(n),po=(n,e)=>new Promise(t=>{if(e!==null)t(!0);else{const s=n.createScriptProcessor(256,1,1),i=n.createGain(),r=n.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=n.createBufferSource();a.buffer=r,a.loop=!0,a.connect(s).connect(n.destination),a.connect(i),a.disconnect(i),s.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,h=>h===1)?t(!0):t(!1),a.stop(),s.onaudioprocess=null,a.disconnect(s),s.disconnect(n.destination)},a.start()}}),bi=(n,e)=>{const t=new Map;for(const s of n)for(const i of s){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((s,i)=>e(i,s))},Cn=n=>"context"in n,kl=n=>{const e=new Map;n.connect=(t=>(s,i=0,r=0)=>{const o=Cn(s)?t(s,i,r):t(s,i),a=e.get(s);return a===void 0?e.set(s,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(n.connect.bind(n)),n.disconnect=(t=>(s,i,r)=>{if(t.apply(n),s===void 0)e.clear();else if(typeof s=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==s);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(s))if(i===void 0)e.delete(s);else{const o=e.get(s);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(s):e.set(s,a)}}for(const[o,a]of e)a.forEach(c=>{Cn(o)?n.connect(o,c.output,c.input):n.connect(o,c.output)})})(n.disconnect)},Nl=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Js(e),{outputs:o}=Me(n),a=Zs(n),c=l=>{const h=ae(n),u=Bs(e);if(l){const d=ra(r,n,t);ho(i,n,d,!1),!s&&!Yt(n)&&h.connect(u,t)}else{const d=Sl(i,n,t);uo(r,d,!1),!s&&!Yt(n)&&h.disconnect(u,t)}};return Jt(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),pt(n)?ho(i,n,[t,c],!0):uo(r,[n,t,c],!0),!0):!1},Cl=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Me(e),o=na(i[s],n,t);return o===null?[Ko(r,n,t,s)[2],!1]:[o[2],!0]},Il=(n,e,t)=>{const{activeInputs:s,passiveInputs:i}=Js(e),r=na(s,n,t);return r===null?[ra(i,n,t)[1],!1]:[r[2],!0]},er=(n,e,t,s,i)=>{const[r,o]=Cl(n,t,s,i);if(r!==null&&(ia(n,r),o&&!e&&!Yt(n)&&Nn(ae(n),ae(t),s,i)),pt(t)){const{activeInputs:a}=Me(t);Mi(t,a)}},tr=(n,e,t,s)=>{const[i,r]=Il(n,t,s);i!==null&&(ia(n,i),r&&!e&&!Yt(n)&&ae(n).disconnect(Bs(t),s))},Ol=(n,e)=>{const t=Me(n),s=[];for(const i of t.outputs)Ks(i)?er(n,e,...i):tr(n,e,...i),s.push(i[0]);return t.outputs.clear(),s},El=(n,e,t)=>{const s=Me(n),i=[];for(const r of s.outputs)r[1]===t&&(Ks(r)?er(n,e,...r):tr(n,e,...r),i.push(r[0]),s.outputs.delete(r));return i},Ml=(n,e,t,s,i)=>{const r=Me(n);return Array.from(r.outputs).filter(o=>o[0]===t&&(s===void 0||o[1]===s)&&(i===void 0||o[2]===i)).map(o=>(Ks(o)?er(n,e,...o):tr(n,e,...o),r.outputs.delete(o),o[0]))},Dl=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,m)=>class extends l{constructor(y,w,x,A){super(x),this._context=y,this._nativeAudioNode=x;const _=h(y);u(_)&&t(po,()=>po(_,m))!==!0&&kl(x),Qi.set(this,x),Qo.set(this,new Set),y.state!=="closed"&&w&&_s(this),n(this,A,x)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(y){this._nativeAudioNode.channelCount=y}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(y){this._nativeAudioNode.channelCountMode=y}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(y){this._nativeAudioNode.channelInterpretation=y}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(y,w=0,x=0){if(w<0||w>=this._nativeAudioNode.numberOfOutputs)throw i();const A=h(this._context),_=f(A);if(d(y)||p(y))throw r();if(Sn(y)){const v=ae(y);try{const S=kn(this._nativeAudioNode,v,w,x),N=gn(this);(_||N)&&this._nativeAudioNode.disconnect(...S),this.context.state!=="closed"&&!N&&gn(y)&&_s(y)}catch(S){throw S.code===12?r():S}if(e(this,y,w,x,_)){const S=c([this],y);bi(S,s(_))}return y}const b=Bs(y);if(b.name==="playbackRate"&&b.maxValue===1024)throw o();try{this._nativeAudioNode.connect(b,w),(_||gn(this))&&this._nativeAudioNode.disconnect(b,w)}catch(v){throw v.code===12?r():v}if(Nl(this,y,w,_)){const v=c([this],y);bi(v,s(_))}}disconnect(y,w,x){let A;const _=h(this._context),b=f(_);if(y===void 0)A=Ol(this,b);else if(typeof y=="number"){if(y<0||y>=this.numberOfOutputs)throw i();A=El(this,b,y)}else{if(w!==void 0&&(w<0||w>=this.numberOfOutputs)||Sn(y)&&x!==void 0&&(x<0||x>=y.numberOfInputs))throw i();if(A=Ml(this,b,y,w,x),A.length===0)throw r()}for(const T of A){const v=c([this],T);bi(v,a)}}},Rl=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>(p,f,m,g=null,y=null)=>{const w=m.value,x=new zc(w),A=f?s(x):null,_={get defaultValue(){return w},get maxValue(){return g===null?m.maxValue:g},get minValue(){return y===null?m.minValue:y},get value(){return m.value},set value(b){m.value=b,_.setValueAtTime(b,p.context.currentTime)},cancelAndHoldAtTime(b){if(typeof m.cancelAndHoldAtTime=="function")A===null&&x.flush(p.context.currentTime),x.add(i(b)),m.cancelAndHoldAtTime(b);else{const T=Array.from(x).pop();A===null&&x.flush(p.context.currentTime),x.add(i(b));const v=Array.from(x).pop();m.cancelScheduledValues(b),T!==v&&v!==void 0&&(v.type==="exponentialRampToValue"?m.exponentialRampToValueAtTime(v.value,v.endTime):v.type==="linearRampToValue"?m.linearRampToValueAtTime(v.value,v.endTime):v.type==="setValue"?m.setValueAtTime(v.value,v.startTime):v.type==="setValueCurve"&&m.setValueCurveAtTime(v.values,v.startTime,v.duration))}return _},cancelScheduledValues(b){return A===null&&x.flush(p.context.currentTime),x.add(r(b)),m.cancelScheduledValues(b),_},exponentialRampToValueAtTime(b,T){if(b===0)throw new RangeError;if(!Number.isFinite(T)||T<0)throw new RangeError;const v=p.context.currentTime;return A===null&&x.flush(v),Array.from(x).length===0&&(x.add(l(w,v)),m.setValueAtTime(w,v)),x.add(o(b,T)),m.exponentialRampToValueAtTime(b,T),_},linearRampToValueAtTime(b,T){const v=p.context.currentTime;return A===null&&x.flush(v),Array.from(x).length===0&&(x.add(l(w,v)),m.setValueAtTime(w,v)),x.add(a(b,T)),m.linearRampToValueAtTime(b,T),_},setTargetAtTime(b,T,v){return A===null&&x.flush(p.context.currentTime),x.add(c(b,T,v)),m.setTargetAtTime(b,T,v),_},setValueAtTime(b,T){return A===null&&x.flush(p.context.currentTime),x.add(l(b,T)),m.setValueAtTime(b,T),_},setValueCurveAtTime(b,T,v){const C=b instanceof Float32Array?b:new Float32Array(b);if(u!==null&&u.name==="webkitAudioContext"){const S=T+v,N=p.context.sampleRate,k=Math.ceil(T*N),E=Math.floor(S*N),O=E-k,L=new Float32Array(O);for(let F=0;F<O;F+=1){const W=(C.length-1)/v*((k+F)/N-T),B=Math.floor(W),z=Math.ceil(W);L[F]=B===z?C[B]:(1-(W-B))*C[B]+(1-(z-W))*C[z]}A===null&&x.flush(p.context.currentTime),x.add(h(L,T,v)),m.setValueCurveAtTime(L,T,v);const $=E/N;$<S&&d(_,L[L.length-1],$),d(_,C[C.length-1],S)}else A===null&&x.flush(p.context.currentTime),x.add(h(C,T,v)),m.setValueCurveAtTime(C,T,v);return _}};return t.set(_,m),e.set(_,p),n(_,A),_},$l=n=>({replay(e){for(const t of n)if(t.type==="exponentialRampToValue"){const{endTime:s,value:i}=t;e.exponentialRampToValueAtTime(i,s)}else if(t.type==="linearRampToValue"){const{endTime:s,value:i}=t;e.linearRampToValueAtTime(i,s)}else if(t.type==="setTarget"){const{startTime:s,target:i,timeConstant:r}=t;e.setTargetAtTime(i,s,r)}else if(t.type==="setValue"){const{startTime:s,value:i}=t;e.setValueAtTime(i,s)}else if(t.type==="setValueCurve"){const{duration:s,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,s)}else throw new Error("Can't apply an unknown automation.")}});class oa{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((s,i)=>e.call(t,s,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const Pl={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},Fl=(n,e,t,s,i,r,o,a,c,l,h,u,d,p)=>class extends e{constructor(m,g,y){var w;const x=a(m),A=c(x),_=h({...Pl,...y});d(_);const b=Oi.get(x),T=b?.get(g),v=A||x.state!=="closed"?x:(w=o(x))!==null&&w!==void 0?w:x,C=i(v,A?null:m.baseLatency,l,g,T,_),S=A?s(g,_,T):null;super(m,!0,C,S);const N=[];C.parameters.forEach((E,O)=>{const L=t(this,A,E);N.push([O,L])}),this._nativeAudioWorkletNode=C,this._onprocessorerror=null,this._parameters=new oa(N),A&&n(x,this);const{activeInputs:k}=r(this);u(C,k)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(m){const g=typeof m=="function"?p(this,m):null;this._nativeAudioWorkletNode.onprocessorerror=g;const y=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=y!==null&&y===g?m:y}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function In(n,e,t,s,i){if(typeof n.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),n.copyFromChannel(e[t],s,i);else{const r=n.getChannelData(s);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const aa=(n,e,t,s,i)=>{typeof n.copyToChannel=="function"?e[t].byteLength!==0&&n.copyToChannel(e[t],s,i):e[t].byteLength!==0&&n.getChannelData(s).set(e[t],i)},On=(n,e)=>{const t=[];for(let s=0;s<n;s+=1){const i=[],r=typeof e=="number"?e:e[s];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},Vl=(n,e)=>{const t=Je(Ei,n),s=ae(e);return Je(t,s)},Ll=async(n,e,t,s,i,r,o)=>{const a=e===null?Math.ceil(n.context.length/128)*128:e.length,c=s.channelCount*s.numberOfInputs,l=i.reduce((g,y)=>g+y,0),h=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const u=Me(n),d=await Vl(t,n),p=On(s.numberOfInputs,s.channelCount),f=On(s.numberOfOutputs,i),m=Array.from(n.parameters.keys()).reduce((g,y)=>({...g,[y]:new Float32Array(128)}),{});for(let g=0;g<a;g+=128){if(s.numberOfInputs>0&&e!==null)for(let y=0;y<s.numberOfInputs;y+=1)for(let w=0;w<s.channelCount;w+=1)In(e,p[y],w,w,g);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:y},w)=>{In(e,m,y,c+w,g)});for(let y=0;y<s.numberOfInputs;y+=1)for(let w=0;w<i[y];w+=1)f[y][w].byteLength===0&&(f[y][w]=new Float32Array(128));try{const y=p.map((x,A)=>u.activeInputs[A].size===0?[]:x),w=o(g/t.sampleRate,t.sampleRate,()=>d.process(y,f,m));if(h!==null)for(let x=0,A=0;x<s.numberOfOutputs;x+=1){for(let _=0;_<i[x];_+=1)aa(h,f[x],_,A+_,g);A+=i[x]}if(!w)break}catch(y){n.dispatchEvent(new ErrorEvent("processorerror",{colno:y.colno,filename:y.filename,lineno:y.lineno,message:y.message}));break}}return h},Bl=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,m)=>(g,y,w)=>{const x=new WeakMap;let A=null;const _=async(b,T)=>{let v=h(b),C=null;const S=Ce(v,T),N=Array.isArray(y.outputChannelCount)?y.outputChannelCount:Array.from(y.outputChannelCount);if(u===null){const k=N.reduce(($,F)=>$+F,0),E=i(T,{channelCount:Math.max(1,k),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,k)}),O=[];for(let $=0;$<b.numberOfOutputs;$+=1)O.push(s(T,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:N[$]}));const L=o(T,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1});L.connect=e.bind(null,O),L.disconnect=c.bind(null,O),C=[E,O,L]}else S||(v=new u(T,g));if(x.set(T,C===null?v:C[2]),C!==null){if(A===null){if(w===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const F=b.channelCount*b.numberOfInputs,W=w.parameterDescriptors===void 0?0:w.parameterDescriptors.length,B=F+W;A=Ll(b,B===0?null:await(async()=>{const q=new d(B,Math.ceil(b.context.length/128)*128,T.sampleRate),ne=[],Fe=[];for(let le=0;le<y.numberOfInputs;le+=1)ne.push(o(q,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1})),Fe.push(i(q,{channelCount:y.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:y.channelCount}));const Ve=await Promise.all(Array.from(b.parameters.values()).map(async le=>{const Oe=r(q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:le.value});return await p(q,le,Oe.offset),Oe})),Y=s(q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,F+W)});for(let le=0;le<y.numberOfInputs;le+=1){ne[le].connect(Fe[le]);for(let Oe=0;Oe<y.channelCount;Oe+=1)Fe[le].connect(Y,Oe,le*y.channelCount+Oe)}for(const[le,Oe]of Ve.entries())Oe.connect(Y,0,F+le),Oe.start(0);return Y.connect(q.destination),await Promise.all(ne.map(le=>f(b,q,le))),m(q)})(),T,y,N,w,l)}const k=await A,E=t(T,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[O,L,$]=C;k!==null&&(E.buffer=k,E.start(0)),E.connect(O);for(let F=0,W=0;F<b.numberOfOutputs;F+=1){const B=L[F];for(let z=0;z<N[F];z+=1)O.connect(B,W+z,z);W+=N[F]}return $}if(S)for(const[k,E]of b.parameters.entries())await n(T,E,v.parameters.get(k));else for(const[k,E]of b.parameters.entries())await p(T,E,v.parameters.get(k));return await f(b,T,v),v};return{render(b,T){a(T,b);const v=x.get(T);return v!==void 0?Promise.resolve(v):_(b,T)}}},Ul=(n,e,t,s,i,r,o,a,c,l,h,u,d,p,f,m,g,y,w,x)=>class extends f{constructor(_,b){super(_,b),this._nativeContext=_,this._audioWorklet=n===void 0?void 0:{addModule:(T,v)=>n(this,T,v)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(_,b,T){return new t({length:b,numberOfChannels:_,sampleRate:T})}createBufferSource(){return new s(this)}createChannelMerger(_=6){return new r(this,{numberOfInputs:_})}createChannelSplitter(_=6){return new o(this,{numberOfOutputs:_})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(_=1){return new h(this,{maxDelayTime:_})}createDynamicsCompressor(){return new u(this)}createGain(){return new d(this)}createIIRFilter(_,b){return new p(this,{feedback:b,feedforward:_})}createOscillator(){return new m(this)}createPanner(){return new g(this)}createPeriodicWave(_,b,T={disableNormalization:!1}){return new y(this,{...T,imag:b,real:_})}createStereoPanner(){return new w(this)}createWaveShaper(){return new x(this)}decodeAudioData(_,b,T){return l(this._nativeContext,_).then(v=>(typeof b=="function"&&b(v),v),v=>{throw typeof T=="function"&&T(v),v})}},jl={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},ql=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...jl,...h},p=i(u,d),f=o(u),m=f?t():null;super(l,!1,p,m),this._Q=e(this,f,p.Q,Ee,Re),this._detune=e(this,f,p.detune,1200*Math.log2(Ee),-1200*Math.log2(Ee)),this._frequency=e(this,f,p.frequency,l.sampleRate/2,0),this._gain=e(this,f,p.gain,40*Math.log10(Ee),Re),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,h,u){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,h,u)}catch(d){throw d.code===11?s():d}if(l.length!==h.length||h.length!==u.length)throw s()}},zl=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ce(l,c);if(!h){const u={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,u)}return r.set(c,l),h?(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)):(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Wl=(n,e)=>(t,s)=>{const i=e.get(t);if(i!==void 0)return i;const r=n.get(t);if(r!==void 0)return r;try{const o=s();return o instanceof Promise?(n.set(t,o),o.catch(()=>!1).then(a=>(n.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},Gl={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},Yl=(n,e,t,s,i)=>class extends n{constructor(o,a){const c=s(o),l={...Gl,...a},h=t(c,l),u=i(c)?e():null;super(o,!1,h,u)}},Hl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ce(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Xl={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},Zl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=r({...Xl,...c}),u=t(l,h),d=i(l)?e():null;super(a,!1,u,d)}},Ql=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ce(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Jl=n=>(e,t,s)=>n(t,e,s),Kl=n=>(e,t,s=0,i=0)=>{const r=e[s];if(r===void 0)throw n();return Cn(t)?r.connect(t,0,i):r.connect(t,0)},eh=n=>(e,t)=>{const s=n(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return s.buffer=i,s.loop=!0,s.connect(t),s.start(),()=>{s.stop(),s.disconnect(t)}},th={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},sh=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...th,...l},d=s(h,u),p=r(h),f=p?t():null;super(c,!1,d,f),this._constantSourceNodeRenderer=f,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Ee,Re),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const h=this._nativeConstantSourceNode.onended;this._onended=h!==null&&h===l?c:h}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){_s(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),pt(this)&&Qs(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},nh=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=Ce(u,h);if(!d){const p={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,offset:u.offset.value};u=e(h,p),o!==null&&u.start(o),a!==null&&u.stop(a)}return r.set(h,u),d?await n(h,l.offset,u.offset):await s(h,l.offset,u.offset),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},ih=n=>e=>(n[0]=e,n[0]),rh={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},oh=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h={...rh,...c},u=t(l,h),p=i(l)?e():null;super(a,!1,u,p),this._isBufferNullified=!1,this._nativeConvolverNode=u,h.buffer!==null&&r(this,h.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},ah=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ce(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=n(o,l)}return s.set(o,a),ws(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},ch=(n,e)=>(t,s,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,s,i)}catch(r){throw r.name==="SyntaxError"?n():r}},lh=()=>new DOMException("","DataCloneError"),fo=n=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(s=>{const i=()=>{t.onmessage=null,e.close(),t.close(),s()};t.onmessage=()=>i();try{e.postMessage(n,[n])}catch{}finally{i()}})},hh=(n,e,t,s,i,r,o,a,c,l,h)=>(u,d)=>{const p=o(u)?u:r(u);if(i.has(d)){const f=t();return Promise.reject(f)}try{i.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(f=>(fo(d).catch(()=>{}),e(a,()=>a(f))||h(f),n.add(f),f)):new Promise((f,m)=>{const g=async()=>{try{await fo(d)}catch{}},y=w=>{m(w),g()};try{p.decodeAudioData(d,w=>{typeof w.copyFromChannel!="function"&&(l(w),Ki(w)),n.add(w),g().then(()=>f(w))},w=>{y(w===null?s():w)})}catch(w){y(w)}})},uh=(n,e,t,s,i,r,o,a)=>(c,l)=>{const h=e.get(c);if(h===void 0)throw new Error("Missing the expected cycle count.");const u=r(c.context),d=a(u);if(h===l){if(e.delete(c),!d&&o(c)){const p=s(c),{outputs:f}=t(c);for(const m of f)if(Ks(m)){const g=s(m[0]);n(p,g,m[1],m[2])}else{const g=i(m[0]);p.connect(g,m[1])}}}else e.set(c,h-l)},dh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},ph=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...dh,...l},d=s(h,u),p=r(h),f=p?t(u.maxDelayTime):null;super(c,!1,d,f),this._delayTime=e(this,p,d.delayTime),o(this,u.maxDelayTime)}get delayTime(){return this._delayTime}},fh=(n,e,t,s,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let h=t(c);const u=Ce(h,l);if(!u){const d={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,delayTime:h.delayTime.value,maxDelayTime:r};h=e(l,d)}return o.set(l,h),u?await n(l,c.delayTime,h.delayTime):await s(l,c.delayTime,h.delayTime),await i(c,l,h),h};return{render(c,l){const h=o.get(l);return h!==void 0?Promise.resolve(h):a(c,l)}}},mh=n=>(e,t,s,i)=>n(e[i],r=>r[0]===t&&r[1]===s),gh=n=>(e,t)=>{n(e).delete(t)},yh=n=>"delayTime"in n,_h=(n,e,t)=>function s(i,r){const o=Sn(r)?r:t(n,r);if(yh(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>s([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},dn=(n,e,t)=>{const s=e[t];if(s===void 0)throw n();return s},vh=n=>(e,t=void 0,s=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?dn(n,e,t).disconnect():Cn(t)?s===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?dn(n,e,s).disconnect(t,0):dn(n,e,s).disconnect(t,0,i):s===void 0?e.forEach(r=>r.disconnect(t)):dn(n,e,s).disconnect(t,0),xh={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},bh=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,h){const u=r(l),d={...xh,...h},p=s(u,d),f=o(u),m=f?t():null;super(l,!1,p,m),this._attack=e(this,f,p.attack),this._knee=e(this,f,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,f,p.ratio),this._release=e(this,f,p.release),this._threshold=e(this,f,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const h=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=h,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const h=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=h,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},wh=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ce(l,c);if(!h){const u={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,u)}return r.set(c,l),h?(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)):(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Th=()=>new DOMException("","EncodingError"),Ah=n=>e=>new Promise((t,s)=>{if(n===null){s(new SyntaxError);return}const i=n.document.head;if(i===null)s(new SyntaxError);else{const r=n.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=n.onerror,l=()=>{n.onerror=c,URL.revokeObjectURL(a)};n.onerror=(h,u,d,p,f)=>{if(u===a||u===n.location.href&&d===1&&p===1)return l(),s(f),!1;if(c!==null)return c(h,u,d,p,f)},r.onerror=()=>{l(),s(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),Sh=n=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,s,i){if(s!==null){let r=this._listeners.get(s);r===void 0&&(r=n(this,s),typeof s=="function"&&this._listeners.set(s,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,s,i){const r=s===null?void 0:this._listeners.get(s);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},kh=n=>(e,t,s)=>{Object.defineProperties(n,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return s()}finally{n!==null&&(delete n.currentFrame,delete n.currentTime)}},Nh=n=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw n()},Ch={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Ih=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...Ch,...c},u=s(l,h),d=r(l),p=d?t():null;super(a,!1,u,p),this._gain=e(this,d,u.gain,Ee,Re)}get gain(){return this._gain}},Oh=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ce(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.gain,l.gain):await s(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Eh=(n,e)=>t=>e(n,t),Mh=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Dh=n=>e=>{var t;return(t=n.get(e))!==null&&t!==void 0?t:0},Rh=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},$h=n=>e=>n.get(e),Te=()=>new DOMException("","InvalidStateError"),Ph=n=>e=>{const t=n.get(e);if(t===void 0)throw Te();return t},Fh=(n,e)=>t=>{let s=n.get(t);if(s!==void 0)return s;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return s=new e(1,1,44100),n.set(t,s),s},Vh=n=>e=>{const t=n.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},Hn=()=>new DOMException("","InvalidAccessError"),Lh=n=>{n.getFrequencyResponse=(e=>(t,s,i)=>{if(t.length!==s.length||s.length!==i.length)throw Hn();return e.call(n,t,s,i)})(n.getFrequencyResponse)},Bh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Uh=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),h=i(l),u={...Bh,...c},d=e(l,h?null:a.baseLatency,u),p=h?t(u.feedback,u.feedforward):null;super(a,!1,d,p),Lh(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},ca=(n,e,t,s,i,r,o,a,c,l,h)=>{const u=l.length;let d=a;for(let p=0;p<u;p+=1){let f=t[0]*l[p];for(let m=1;m<i;m+=1){const g=d-m&c-1;f+=t[m]*r[g],f-=n[m]*o[g]}for(let m=i;m<s;m+=1)f+=t[m]*r[d-m&c-1];for(let m=i;m<e;m+=1)f-=n[m]*o[d-m&c-1];r[d]=l[p],o[d]=f,d=d+1&c-1,h[p]=f}return d},jh=(n,e,t,s)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=s instanceof Float64Array?s:new Float64Array(s),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let f=0;f<o;f+=1)r[f]/=i[0];for(let f=1;f<a;f+=1)i[f]/=i[0]}const l=32,h=new Float32Array(l),u=new Float32Array(l),d=e.createBuffer(n.numberOfChannels,n.length,n.sampleRate),p=n.numberOfChannels;for(let f=0;f<p;f+=1){const m=n.getChannelData(f),g=d.getChannelData(f);h.fill(0),u.fill(0),ca(i,o,r,a,c,h,u,0,l,m,g)}return d},qh=(n,e,t,s,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(h,u)=>{let d=null,p=e(h);const f=Ce(p,u);if(u.createIIRFilter===void 0?d=n(u,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):f||(p=u.createIIRFilter(o,r)),a.set(u,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const g=new t(h.context.destination.channelCount,h.context.length,u.sampleRate);c=(async()=>{await s(h,g,g.destination);const y=await i(g);return jh(y,u,r,o)})()}const m=await c;return d.buffer=m,d.start(0),d}return await s(h,u,p),p};return{render(h,u){const d=a.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},zh=(n,e,t,s,i,r)=>o=>(a,c)=>{const l=n.get(a);if(l===void 0){if(!o&&r(a)){const h=s(a),{outputs:u}=t(a);for(const d of u)if(Ks(d)){const p=s(d[0]);e(h,p,d[1],d[2])}else{const p=i(d[0]);h.disconnect(p,d[1])}}n.set(a,c)}else n.set(a,l+c)},Wh=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},Gh=(n,e)=>t=>n.has(t)||e(t),Yh=(n,e)=>t=>n.has(t)||e(t),Hh=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},Xh=n=>e=>n!==null&&e instanceof n,Zh=n=>e=>n!==null&&typeof n.AudioNode=="function"&&e instanceof n.AudioNode,Qh=n=>e=>n!==null&&typeof n.AudioParam=="function"&&e instanceof n.AudioParam,Jh=(n,e)=>t=>n(t)||e(t),Kh=n=>e=>n!==null&&e instanceof n,eu=n=>n!==null&&n.isSecureContext,tu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},su={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},nu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r);if(s(a))throw new TypeError;const c={...su,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},iu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},ru=(n,e,t)=>class extends n{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},ou=(n,e,t,s,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,Gn.set(this,a),s(a)&&i.set(a,new Set),this._destination=new n(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},Us=n=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=n.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},au=(n,e)=>(t,s,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const h=r.size===0;if(e(a))return o.call(t,a,c,l),n(r,[a,c,l],u=>u[0]===a&&u[1]===c&&u[2]===l,!0),h&&s(),a;o.call(t,a,c),n(r,[a,c],u=>u[0]===a&&u[1]===c,!0),h&&s()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const h=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const u=r.size===0;h&&u&&i()})(t.disconnect),t},he=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t]&&(n[t]=s)},be=(n,e)=>{he(n,e,"channelCount"),he(n,e,"channelCountMode"),he(n,e,"channelInterpretation")},mo=n=>typeof n.getFloatTimeDomainData=="function",cu=n=>{n.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);n.getByteTimeDomainData(t);const s=Math.max(t.length,n.fftSize);for(let i=0;i<s;i+=1)e[i]=(t[i]-128)*.0078125;return e}},lu=(n,e)=>(t,s)=>{const i=t.createAnalyser();if(be(i,s),!(s.maxDecibels>s.minDecibels))throw e();return he(i,s,"fftSize"),he(i,s,"maxDecibels"),he(i,s,"minDecibels"),he(i,s,"smoothingTimeConstant"),n(mo,()=>mo(i))||cu(i),i},hu=n=>n===null?null:n.hasOwnProperty("AudioBuffer")?n.AudioBuffer:null,fe=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t].value&&(n[t].value=s)},uu=n=>{n.start=(e=>{let t=!1;return(s=0,i=0,r)=>{if(t)throw Te();e.call(n,s,i,r),t=!0}})(n.start)},sr=n=>{n.start=(e=>(t=0,s=0,i)=>{if(typeof i=="number"&&i<0||s<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(n,t,s,i)})(n.start)},nr=n=>{n.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(n,t)})(n.stop)},du=(n,e,t,s,i,r,o,a,c,l,h)=>(u,d)=>{const p=u.createBufferSource();return be(p,d),fe(p,d,"playbackRate"),he(p,d,"buffer"),he(p,d,"loop"),he(p,d,"loopEnd"),he(p,d,"loopStart"),e(t,()=>t(u))||uu(p),e(s,()=>s(u))||c(p),e(i,()=>i(u))||l(p,u),e(r,()=>r(u))||sr(p),e(o,()=>o(u))||h(p,u),e(a,()=>a(u))||nr(p),n(u,p),p},pu=n=>n===null?null:n.hasOwnProperty("AudioContext")?n.AudioContext:n.hasOwnProperty("webkitAudioContext")?n.webkitAudioContext:null,fu=(n,e)=>(t,s,i)=>{const r=t.destination;if(r.channelCount!==s)try{r.channelCount=s}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:s});const o=n(t,{channelCount:s,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},mu=n=>n===null?null:n.hasOwnProperty("AudioWorkletNode")?n.AudioWorkletNode:null,gu=n=>{const{port1:e}=new MessageChannel;try{e.postMessage(n)}finally{e.close()}},yu=(n,e,t,s,i)=>(r,o,a,c,l,h)=>{if(a!==null)try{const u=new a(r,c,h),d=new Map;let p=null;if(Object.defineProperties(u,{channelCount:{get:()=>h.channelCount,set:()=>{throw n()}},channelCountMode:{get:()=>"explicit",set:()=>{throw n()}},onprocessorerror:{get:()=>p,set:f=>{typeof p=="function"&&u.removeEventListener("processorerror",p),p=typeof f=="function"?f:null,typeof p=="function"&&u.addEventListener("processorerror",p)}}}),u.addEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=typeof m[1]=="function"?m[1]:typeof m[1]=="object"&&m[1]!==null&&typeof m[1].handleEvent=="function"?m[1].handleEvent:null;if(g!==null){const y=d.get(m[1]);y!==void 0?m[1]=y:(m[1]=w=>{w.type==="error"?(Object.defineProperties(w,{type:{value:"processorerror"}}),g(w)):g(new ErrorEvent(m[0],{...w}))},d.set(g,m[1]))}}return f.call(u,"error",m[1],m[2]),f.call(u,...m)})(u.addEventListener),u.removeEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=d.get(m[1]);g!==void 0&&(d.delete(m[1]),m[1]=g)}return f.call(u,"error",m[1],m[2]),f.call(u,m[0],m[1],m[2])})(u.removeEventListener),h.numberOfOutputs!==0){const f=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return u.connect(f).connect(r.destination),i(u,()=>f.disconnect(),()=>f.connect(r.destination))}return u}catch(u){throw u.code===11?s():u}if(l===void 0)throw s();return gu(h),e(r,o,l,h)},la=(n,e)=>n===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(n*e))))),_u=n=>new Promise((e,t)=>{const{port1:s,port2:i}=new MessageChannel;s.onmessage=({data:r})=>{s.close(),i.close(),e(r)},s.onmessageerror=({data:r})=>{s.close(),i.close(),t(r)},i.postMessage(n)}),vu=async(n,e)=>{const t=await _u(e);return new n(t)},xu=(n,e,t,s)=>{let i=Ei.get(n);i===void 0&&(i=new WeakMap,Ei.set(n,i));const r=vu(t,s);return i.set(e,r),r},bu=(n,e,t,s,i,r,o,a,c,l,h,u,d)=>(p,f,m,g)=>{if(g.numberOfInputs===0&&g.numberOfOutputs===0)throw c();const y=Array.isArray(g.outputChannelCount)?g.outputChannelCount:Array.from(g.outputChannelCount);if(y.some(I=>I<1))throw c();if(y.length!==g.numberOfOutputs)throw e();if(g.channelCountMode!=="explicit")throw c();const w=g.channelCount*g.numberOfInputs,x=y.reduce((I,j)=>I+j,0),A=m.parameterDescriptors===void 0?0:m.parameterDescriptors.length;if(w+A>6||x>6)throw c();const _=new MessageChannel,b=[],T=[];for(let I=0;I<g.numberOfInputs;I+=1)b.push(o(p,{channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation,gain:1})),T.push(i(p,{channelCount:g.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:g.channelCount}));const v=[];if(m.parameterDescriptors!==void 0)for(const{defaultValue:I,maxValue:j,minValue:xe,name:ue}of m.parameterDescriptors){const K=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:g.parameterData[ue]!==void 0?g.parameterData[ue]:I===void 0?0:I});Object.defineProperties(K.offset,{defaultValue:{get:()=>I===void 0?0:I},maxValue:{get:()=>j===void 0?Ee:j},minValue:{get:()=>xe===void 0?Re:xe}}),v.push(K)}const C=s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,w+A)}),S=la(f,p.sampleRate),N=a(p,S,w+A,Math.max(1,x)),k=i(p,{channelCount:Math.max(1,x),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,x)}),E=[];for(let I=0;I<g.numberOfOutputs;I+=1)E.push(s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:y[I]}));for(let I=0;I<g.numberOfInputs;I+=1){b[I].connect(T[I]);for(let j=0;j<g.channelCount;j+=1)T[I].connect(C,j,I*g.channelCount+j)}const O=new oa(m.parameterDescriptors===void 0?[]:m.parameterDescriptors.map(({name:I},j)=>{const xe=v[j];return xe.connect(C,0,w+j),xe.start(0),[I,xe.offset]}));C.connect(N);let L=g.channelInterpretation,$=null;const F=g.numberOfOutputs===0?[N]:E,W={get bufferSize(){return S},get channelCount(){return g.channelCount},set channelCount(I){throw t()},get channelCountMode(){return g.channelCountMode},set channelCountMode(I){throw t()},get channelInterpretation(){return L},set channelInterpretation(I){for(const j of b)j.channelInterpretation=I;L=I},get context(){return N.context},get inputs(){return b},get numberOfInputs(){return g.numberOfInputs},get numberOfOutputs(){return g.numberOfOutputs},get onprocessorerror(){return $},set onprocessorerror(I){typeof $=="function"&&W.removeEventListener("processorerror",$),$=typeof I=="function"?I:null,typeof $=="function"&&W.addEventListener("processorerror",$)},get parameters(){return O},get port(){return _.port2},addEventListener(...I){return N.addEventListener(I[0],I[1],I[2])},connect:n.bind(null,F),disconnect:l.bind(null,F),dispatchEvent(...I){return N.dispatchEvent(I[0])},removeEventListener(...I){return N.removeEventListener(I[0],I[1],I[2])}},B=new Map;_.port1.addEventListener=(I=>(...j)=>{if(j[0]==="message"){const xe=typeof j[1]=="function"?j[1]:typeof j[1]=="object"&&j[1]!==null&&typeof j[1].handleEvent=="function"?j[1].handleEvent:null;if(xe!==null){const ue=B.get(j[1]);ue!==void 0?j[1]=ue:(j[1]=K=>{h(p.currentTime,p.sampleRate,()=>xe(K))},B.set(xe,j[1]))}}return I.call(_.port1,j[0],j[1],j[2])})(_.port1.addEventListener),_.port1.removeEventListener=(I=>(...j)=>{if(j[0]==="message"){const xe=B.get(j[1]);xe!==void 0&&(B.delete(j[1]),j[1]=xe)}return I.call(_.port1,j[0],j[1],j[2])})(_.port1.removeEventListener);let z=null;Object.defineProperty(_.port1,"onmessage",{get:()=>z,set:I=>{typeof z=="function"&&_.port1.removeEventListener("message",z),z=typeof I=="function"?I:null,typeof z=="function"&&(_.port1.addEventListener("message",z),_.port1.start())}}),m.prototype.port=_.port1;let q=null;xu(p,W,m,g).then(I=>q=I);const Fe=On(g.numberOfInputs,g.channelCount),Ve=On(g.numberOfOutputs,y),Y=m.parameterDescriptors===void 0?[]:m.parameterDescriptors.reduce((I,{name:j})=>({...I,[j]:new Float32Array(128)}),{});let le=!0;const Oe=()=>{g.numberOfOutputs>0&&N.disconnect(k);for(let I=0,j=0;I<g.numberOfOutputs;I+=1){const xe=E[I];for(let ue=0;ue<y[I];ue+=1)k.disconnect(xe,j+ue,ue);j+=y[I]}},V=new Map;N.onaudioprocess=({inputBuffer:I,outputBuffer:j})=>{if(q!==null){const xe=u(W);for(let ue=0;ue<S;ue+=128){for(let K=0;K<g.numberOfInputs;K+=1)for(let pe=0;pe<g.channelCount;pe+=1)In(I,Fe[K],pe,pe,ue);m.parameterDescriptors!==void 0&&m.parameterDescriptors.forEach(({name:K},pe)=>{In(I,Y,K,w+pe,ue)});for(let K=0;K<g.numberOfInputs;K+=1)for(let pe=0;pe<y[K];pe+=1)Ve[K][pe].byteLength===0&&(Ve[K][pe]=new Float32Array(128));try{const K=Fe.map((ze,Tt)=>{if(xe[Tt].size>0)return V.set(Tt,S/128),ze;const vi=V.get(Tt);return vi===void 0?[]:(ze.every(pc=>pc.every(fc=>fc===0))&&(vi===1?V.delete(Tt):V.set(Tt,vi-1)),ze)});le=h(p.currentTime+ue/p.sampleRate,p.sampleRate,()=>q.process(K,Ve,Y));for(let ze=0,Tt=0;ze<g.numberOfOutputs;ze+=1){for(let Is=0;Is<y[ze];Is+=1)aa(j,Ve[ze],Is,Tt+Is,ue);Tt+=y[ze]}}catch(K){le=!1,W.dispatchEvent(new ErrorEvent("processorerror",{colno:K.colno,filename:K.filename,lineno:K.lineno,message:K.message}))}if(!le){for(let K=0;K<g.numberOfInputs;K+=1){b[K].disconnect(T[K]);for(let pe=0;pe<g.channelCount;pe+=1)T[ue].disconnect(C,pe,K*g.channelCount+pe)}if(m.parameterDescriptors!==void 0){const K=m.parameterDescriptors.length;for(let pe=0;pe<K;pe+=1){const ze=v[pe];ze.disconnect(C,0,w+pe),ze.stop()}}C.disconnect(N),N.onaudioprocess=null,Ft?Oe():ns();break}}}};let Ft=!1;const Vt=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),ss=()=>N.connect(Vt).connect(p.destination),ns=()=>{N.disconnect(Vt),Vt.disconnect()},uc=()=>{if(le){ns(),g.numberOfOutputs>0&&N.connect(k);for(let I=0,j=0;I<g.numberOfOutputs;I+=1){const xe=E[I];for(let ue=0;ue<y[I];ue+=1)k.connect(xe,j+ue,ue);j+=y[I]}}Ft=!0},dc=()=>{le&&(ss(),Oe()),Ft=!1};return ss(),d(W,uc,dc)},ha=(n,e)=>{const t=n.createBiquadFilter();return be(t,e),fe(t,e,"Q"),fe(t,e,"detune"),fe(t,e,"frequency"),fe(t,e,"gain"),he(t,e,"type"),t},wu=(n,e)=>(t,s)=>{const i=t.createChannelMerger(s.numberOfInputs);return n!==null&&n.name==="webkitAudioContext"&&e(t,i),be(i,s),i},Tu=n=>{const e=n.numberOfOutputs;Object.defineProperty(n,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw Te()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw Te()}}),Object.defineProperty(n,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw Te()}})},en=(n,e)=>{const t=n.createChannelSplitter(e.numberOfOutputs);return be(t,e),Tu(t),t},Au=(n,e,t,s,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return be(a,o),fe(a,o,"offset"),e(s,()=>s(r))||sr(a),e(i,()=>i(r))||nr(a),n(r,a),a},Ts=(n,e)=>(n.connect=e.connect.bind(e),n.disconnect=e.disconnect.bind(e),n),Su=(n,e,t,s)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),h=a.getChannelData(0);h[0]=1,h[1]=1,c.buffer=a,c.loop=!0;const u={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(f){l.channelCount=f},get channelCountMode(){return l.channelCountMode},set channelCountMode(f){l.channelCountMode=f},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(f){l.channelInterpretation=f},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(f){c.onended=f},addEventListener(...f){return c.addEventListener(f[0],f[1],f[2])},dispatchEvent(...f){return c.dispatchEvent(f[0])},removeEventListener(...f){return c.removeEventListener(f[0],f[1],f[2])},start(f=0){c.start.call(c,f)},stop(f=0){c.stop.call(c,f)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return n(i,c),s(Ts(u,l),d,p)},ku=(n,e)=>(t,s)=>{const i=t.createConvolver();if(be(i,s),s.disableNormalization===i.normalize&&(i.normalize=!s.disableNormalization),he(i,s,"buffer"),s.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw n();return r.call(i,o)}),s.channelCountMode==="max"))throw n();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw n();return r.call(i,o)}),i},ua=(n,e)=>{const t=n.createDelay(e.maxDelayTime);return be(t,e),fe(t,e,"delayTime"),t},Nu=n=>(e,t)=>{const s=e.createDynamicsCompressor();if(be(s,t),t.channelCount>2||t.channelCountMode==="max")throw n();return fe(s,t,"attack"),fe(s,t,"knee"),fe(s,t,"ratio"),fe(s,t,"release"),fe(s,t,"threshold"),s},Pe=(n,e)=>{const t=n.createGain();return be(t,e),fe(t,e,"gain"),t},Cu=n=>(e,t,s)=>{if(e.createIIRFilter===void 0)return n(e,t,s);const i=e.createIIRFilter(s.feedforward,s.feedback);return be(i,s),i};function Iu(n,e){const t=e[0]*e[0]+e[1]*e[1];return[(n[0]*e[0]+n[1]*e[1])/t,(n[1]*e[0]-n[0]*e[1])/t]}function Ou(n,e){return[n[0]*e[0]-n[1]*e[1],n[0]*e[1]+n[1]*e[0]]}function go(n,e){let t=[0,0];for(let s=n.length-1;s>=0;s-=1)t=Ou(t,e),t[0]+=n[s];return t}const Eu=(n,e,t,s)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:h})=>{const u=la(r,i.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=h instanceof Float64Array?h:new Float64Array(h),f=d.length,m=p.length,g=Math.min(f,m);if(f===0||f>20)throw s();if(d[0]===0)throw e();if(m===0||m>20)throw s();if(p[0]===0)throw e();if(d[0]!==1){for(let v=0;v<m;v+=1)p[v]/=d[0];for(let v=1;v<f;v+=1)d[v]/=d[0]}const y=t(i,u,o,o);y.channelCount=o,y.channelCountMode=a,y.channelInterpretation=c;const w=32,x=[],A=[],_=[];for(let v=0;v<o;v+=1){x.push(0);const C=new Float32Array(w),S=new Float32Array(w);C.fill(0),S.fill(0),A.push(C),_.push(S)}y.onaudioprocess=v=>{const C=v.inputBuffer,S=v.outputBuffer,N=C.numberOfChannels;for(let k=0;k<N;k+=1){const E=C.getChannelData(k),O=S.getChannelData(k);x[k]=ca(d,f,p,m,g,A[k],_[k],x[k],w,E,O)}};const b=i.sampleRate/2;return Ts({get bufferSize(){return u},get channelCount(){return y.channelCount},set channelCount(v){y.channelCount=v},get channelCountMode(){return y.channelCountMode},set channelCountMode(v){y.channelCountMode=v},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(v){y.channelInterpretation=v},get context(){return y.context},get inputs(){return[y]},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},addEventListener(...v){return y.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return y.dispatchEvent(v[0])},getFrequencyResponse(v,C,S){if(v.length!==C.length||C.length!==S.length)throw n();const N=v.length;for(let k=0;k<N;k+=1){const E=-Math.PI*(v[k]/b),O=[Math.cos(E),Math.sin(E)],L=go(p,O),$=go(d,O),F=Iu(L,$);C[k]=Math.sqrt(F[0]*F[0]+F[1]*F[1]),S[k]=Math.atan2(F[1],F[0])}},removeEventListener(...v){return y.removeEventListener(v[0],v[1],v[2])}},y)},Mu=(n,e)=>n.createMediaElementSource(e.mediaElement),Du=(n,e)=>{const t=n.createMediaStreamDestination();return be(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},Ru=(n,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const s=t.slice(0,1),i=n.createMediaStreamSource(new MediaStream(s));return Object.defineProperty(i,"mediaStream",{value:e}),i},$u=(n,e)=>(t,{mediaStreamTrack:s})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(s);const i=new MediaStream([s]),r=t.createMediaStreamSource(i);if(s.kind!=="audio")throw n();if(e(t))throw new TypeError;return r},Pu=n=>n===null?null:n.hasOwnProperty("OfflineAudioContext")?n.OfflineAudioContext:n.hasOwnProperty("webkitOfflineAudioContext")?n.webkitOfflineAudioContext:null,Fu=(n,e,t,s,i,r)=>(o,a)=>{const c=o.createOscillator();return be(c,a),fe(c,a,"detune"),fe(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):he(c,a,"type"),e(t,()=>t(o))||sr(c),e(s,()=>s(o))||r(c,o),e(i,()=>i(o))||nr(c),n(o,c),c},Vu=n=>(e,t)=>{const s=e.createPanner();return s.orientationX===void 0?n(e,t):(be(s,t),fe(s,t,"orientationX"),fe(s,t,"orientationY"),fe(s,t,"orientationZ"),fe(s,t,"positionX"),fe(s,t,"positionY"),fe(s,t,"positionZ"),he(s,t,"coneInnerAngle"),he(s,t,"coneOuterAngle"),he(s,t,"coneOuterGain"),he(s,t,"distanceModel"),he(s,t,"maxDistance"),he(s,t,"panningModel"),he(s,t,"refDistance"),he(s,t,"rolloffFactor"),s)},Lu=(n,e,t,s,i,r,o,a,c,l)=>(h,{coneInnerAngle:u,coneOuterAngle:d,coneOuterGain:p,distanceModel:f,maxDistance:m,orientationX:g,orientationY:y,orientationZ:w,panningModel:x,positionX:A,positionY:_,positionZ:b,refDistance:T,rolloffFactor:v,...C})=>{const S=h.createPanner();if(C.channelCount>2||C.channelCountMode==="max")throw o();be(S,C);const N={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},k=t(h,{...N,channelInterpretation:"speakers",numberOfInputs:6}),E=s(h,{...C,gain:1}),O=s(h,{...N,gain:1}),L=s(h,{...N,gain:0}),$=s(h,{...N,gain:0}),F=s(h,{...N,gain:0}),W=s(h,{...N,gain:0}),B=s(h,{...N,gain:0}),z=i(h,256,6,1),q=r(h,{...N,curve:new Float32Array([1,1]),oversample:"none"});let ne=[g,y,w],Fe=[A,_,b];const Ve=new Float32Array(1);z.onaudioprocess=({inputBuffer:V})=>{const Ft=[c(V,Ve,0),c(V,Ve,1),c(V,Ve,2)];Ft.some((ss,ns)=>ss!==ne[ns])&&(S.setOrientation(...Ft),ne=Ft);const Vt=[c(V,Ve,3),c(V,Ve,4),c(V,Ve,5)];Vt.some((ss,ns)=>ss!==Fe[ns])&&(S.setPosition(...Vt),Fe=Vt)},Object.defineProperty(L.gain,"defaultValue",{get:()=>0}),Object.defineProperty($.gain,"defaultValue",{get:()=>0}),Object.defineProperty(F.gain,"defaultValue",{get:()=>0}),Object.defineProperty(W.gain,"defaultValue",{get:()=>0}),Object.defineProperty(B.gain,"defaultValue",{get:()=>0});const Y={get bufferSize(){},get channelCount(){return S.channelCount},set channelCount(V){if(V>2)throw o();E.channelCount=V,S.channelCount=V},get channelCountMode(){return S.channelCountMode},set channelCountMode(V){if(V==="max")throw o();E.channelCountMode=V,S.channelCountMode=V},get channelInterpretation(){return S.channelInterpretation},set channelInterpretation(V){E.channelInterpretation=V,S.channelInterpretation=V},get coneInnerAngle(){return S.coneInnerAngle},set coneInnerAngle(V){S.coneInnerAngle=V},get coneOuterAngle(){return S.coneOuterAngle},set coneOuterAngle(V){S.coneOuterAngle=V},get coneOuterGain(){return S.coneOuterGain},set coneOuterGain(V){if(V<0||V>1)throw e();S.coneOuterGain=V},get context(){return S.context},get distanceModel(){return S.distanceModel},set distanceModel(V){S.distanceModel=V},get inputs(){return[E]},get maxDistance(){return S.maxDistance},set maxDistance(V){if(V<0)throw new RangeError;S.maxDistance=V},get numberOfInputs(){return S.numberOfInputs},get numberOfOutputs(){return S.numberOfOutputs},get orientationX(){return O.gain},get orientationY(){return L.gain},get orientationZ(){return $.gain},get panningModel(){return S.panningModel},set panningModel(V){S.panningModel=V},get positionX(){return F.gain},get positionY(){return W.gain},get positionZ(){return B.gain},get refDistance(){return S.refDistance},set refDistance(V){if(V<0)throw new RangeError;S.refDistance=V},get rolloffFactor(){return S.rolloffFactor},set rolloffFactor(V){if(V<0)throw new RangeError;S.rolloffFactor=V},addEventListener(...V){return E.addEventListener(V[0],V[1],V[2])},dispatchEvent(...V){return E.dispatchEvent(V[0])},removeEventListener(...V){return E.removeEventListener(V[0],V[1],V[2])}};u!==Y.coneInnerAngle&&(Y.coneInnerAngle=u),d!==Y.coneOuterAngle&&(Y.coneOuterAngle=d),p!==Y.coneOuterGain&&(Y.coneOuterGain=p),f!==Y.distanceModel&&(Y.distanceModel=f),m!==Y.maxDistance&&(Y.maxDistance=m),g!==Y.orientationX.value&&(Y.orientationX.value=g),y!==Y.orientationY.value&&(Y.orientationY.value=y),w!==Y.orientationZ.value&&(Y.orientationZ.value=w),x!==Y.panningModel&&(Y.panningModel=x),A!==Y.positionX.value&&(Y.positionX.value=A),_!==Y.positionY.value&&(Y.positionY.value=_),b!==Y.positionZ.value&&(Y.positionZ.value=b),T!==Y.refDistance&&(Y.refDistance=T),v!==Y.rolloffFactor&&(Y.rolloffFactor=v),(ne[0]!==1||ne[1]!==0||ne[2]!==0)&&S.setOrientation(...ne),(Fe[0]!==0||Fe[1]!==0||Fe[2]!==0)&&S.setPosition(...Fe);const le=()=>{E.connect(S),n(E,q,0,0),q.connect(O).connect(k,0,0),q.connect(L).connect(k,0,1),q.connect($).connect(k,0,2),q.connect(F).connect(k,0,3),q.connect(W).connect(k,0,4),q.connect(B).connect(k,0,5),k.connect(z).connect(h.destination)},Oe=()=>{E.disconnect(S),a(E,q,0,0),q.disconnect(O),O.disconnect(k),q.disconnect(L),L.disconnect(k),q.disconnect($),$.disconnect(k),q.disconnect(F),F.disconnect(k),q.disconnect(W),W.disconnect(k),q.disconnect(B),B.disconnect(k),k.disconnect(z),z.disconnect(h.destination)};return l(Ts(Y,S),le,Oe)},Bu=n=>(e,{disableNormalization:t,imag:s,real:i})=>{const r=s instanceof Float32Array?s:new Float32Array(s),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(s).length<2)throw n();return a},tn=(n,e,t,s)=>n.createScriptProcessor(e,t,s),Uu=(n,e)=>(t,s)=>{const i=s.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return n(t,s);const r=t.createStereoPanner();return be(r,s),fe(r,s,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},ju=(n,e,t,s,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},h={...l,oversample:"none"},u=(f,m,g,y)=>{const w=new Float32Array(16385),x=new Float32Array(16385);for(let C=0;C<16385;C+=1){const S=C/16384*c;w[C]=Math.cos(S),x[C]=Math.sin(S)}const A=t(f,{...l,gain:0}),_=s(f,{...h,curve:w}),b=s(f,{...h,curve:a}),T=t(f,{...l,gain:0}),v=s(f,{...h,curve:x});return{connectGraph(){m.connect(A),m.connect(b.inputs===void 0?b:b.inputs[0]),m.connect(T),b.connect(g),g.connect(_.inputs===void 0?_:_.inputs[0]),g.connect(v.inputs===void 0?v:v.inputs[0]),_.connect(A.gain),v.connect(T.gain),A.connect(y,0,0),T.connect(y,0,1)},disconnectGraph(){m.disconnect(A),m.disconnect(b.inputs===void 0?b:b.inputs[0]),m.disconnect(T),b.disconnect(g),g.disconnect(_.inputs===void 0?_:_.inputs[0]),g.disconnect(v.inputs===void 0?v:v.inputs[0]),_.disconnect(A.gain),v.disconnect(T.gain),A.disconnect(y,0,0),T.disconnect(y,0,1)}}},d=(f,m,g,y)=>{const w=new Float32Array(16385),x=new Float32Array(16385),A=new Float32Array(16385),_=new Float32Array(16385),b=Math.floor(16385/2);for(let F=0;F<16385;F+=1)if(F>b){const W=(F-b)/(16384-b)*c;w[F]=Math.cos(W),x[F]=Math.sin(W),A[F]=0,_[F]=1}else{const W=F/(16384-b)*c;w[F]=1,x[F]=0,A[F]=Math.cos(W),_[F]=Math.sin(W)}const T=e(f,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),v=t(f,{...l,gain:0}),C=s(f,{...h,curve:w}),S=t(f,{...l,gain:0}),N=s(f,{...h,curve:x}),k=s(f,{...h,curve:a}),E=t(f,{...l,gain:0}),O=s(f,{...h,curve:A}),L=t(f,{...l,gain:0}),$=s(f,{...h,curve:_});return{connectGraph(){m.connect(T),m.connect(k.inputs===void 0?k:k.inputs[0]),T.connect(v,0),T.connect(S,0),T.connect(E,1),T.connect(L,1),k.connect(g),g.connect(C.inputs===void 0?C:C.inputs[0]),g.connect(N.inputs===void 0?N:N.inputs[0]),g.connect(O.inputs===void 0?O:O.inputs[0]),g.connect($.inputs===void 0?$:$.inputs[0]),C.connect(v.gain),N.connect(S.gain),O.connect(E.gain),$.connect(L.gain),v.connect(y,0,0),E.connect(y,0,0),S.connect(y,0,1),L.connect(y,0,1)},disconnectGraph(){m.disconnect(T),m.disconnect(k.inputs===void 0?k:k.inputs[0]),T.disconnect(v,0),T.disconnect(S,0),T.disconnect(E,1),T.disconnect(L,1),k.disconnect(g),g.disconnect(C.inputs===void 0?C:C.inputs[0]),g.disconnect(N.inputs===void 0?N:N.inputs[0]),g.disconnect(O.inputs===void 0?O:O.inputs[0]),g.disconnect($.inputs===void 0?$:$.inputs[0]),C.disconnect(v.gain),N.disconnect(S.gain),O.disconnect(E.gain),$.disconnect(L.gain),v.disconnect(y,0,0),E.disconnect(y,0,0),S.disconnect(y,0,1),L.disconnect(y,0,1)}}},p=(f,m,g,y,w)=>{if(m===1)return u(f,g,y,w);if(m===2)return d(f,g,y,w);throw i()};return(f,{channelCount:m,channelCountMode:g,pan:y,...w})=>{if(g==="max")throw i();const x=n(f,{...w,channelCount:1,channelCountMode:g,numberOfInputs:2}),A=t(f,{...w,channelCount:m,channelCountMode:g,gain:1}),_=t(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:y});let{connectGraph:b,disconnectGraph:T}=p(f,m,A,_,x);Object.defineProperty(_.gain,"defaultValue",{get:()=>0}),Object.defineProperty(_.gain,"maxValue",{get:()=>1}),Object.defineProperty(_.gain,"minValue",{get:()=>-1});const v={get bufferSize(){},get channelCount(){return A.channelCount},set channelCount(k){A.channelCount!==k&&(C&&T(),{connectGraph:b,disconnectGraph:T}=p(f,k,A,_,x),C&&b()),A.channelCount=k},get channelCountMode(){return A.channelCountMode},set channelCountMode(k){if(k==="clamped-max"||k==="max")throw i();A.channelCountMode=k},get channelInterpretation(){return A.channelInterpretation},set channelInterpretation(k){A.channelInterpretation=k},get context(){return A.context},get inputs(){return[A]},get numberOfInputs(){return A.numberOfInputs},get numberOfOutputs(){return A.numberOfOutputs},get pan(){return _.gain},addEventListener(...k){return A.addEventListener(k[0],k[1],k[2])},dispatchEvent(...k){return A.dispatchEvent(k[0])},removeEventListener(...k){return A.removeEventListener(k[0],k[1],k[2])}};let C=!1;const S=()=>{b(),C=!0},N=()=>{T(),C=!1};return r(Ts(v,x),S,N)}},qu=(n,e,t,s,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);be(l,c);const h=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(h!==null&&h.length<2)throw e();he(l,{curve:h},"curve"),he(l,c,"oversample");let u=null,d=!1;return o(l,"curve",m=>()=>m.call(l),m=>g=>(m.call(l,g),d&&(s(g)&&u===null?u=n(a,l):!s(g)&&u!==null&&(u(),u=null)),g)),i(l,()=>{d=!0,s(l.curve)&&(u=n(a,l))},()=>{d=!1,u!==null&&(u(),u=null)})},zu=(n,e,t,s,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),h=r.createWaveShaper();be(l,c),be(h,c);const u=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),f=t(r,{...c,gain:-1});let m=null,g=!1,y=null;const w={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(_){u.channelCount=_,d.channelCount=_,l.channelCount=_,p.channelCount=_,h.channelCount=_,f.channelCount=_},get channelCountMode(){return l.channelCountMode},set channelCountMode(_){u.channelCountMode=_,d.channelCountMode=_,l.channelCountMode=_,p.channelCountMode=_,h.channelCountMode=_,f.channelCountMode=_},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(_){u.channelInterpretation=_,d.channelInterpretation=_,l.channelInterpretation=_,p.channelInterpretation=_,h.channelInterpretation=_,f.channelInterpretation=_},get context(){return l.context},get curve(){return y},set curve(_){if(_!==null&&_.length<2)throw e();if(_===null)l.curve=_,h.curve=_;else{const b=_.length,T=new Float32Array(b+2-b%2),v=new Float32Array(b+2-b%2);T[0]=_[0],v[0]=-_[b-1];const C=Math.ceil((b+1)/2),S=(b+1)/2-1;for(let N=1;N<C;N+=1){const k=N/C*S,E=Math.floor(k),O=Math.ceil(k);T[N]=E===O?_[E]:(1-(k-E))*_[E]+(1-(O-k))*_[O],v[N]=E===O?-_[b-1-E]:-((1-(k-E))*_[b-1-E])-(1-(O-k))*_[b-1-O]}T[C]=b%2===1?_[C-1]:(_[C-2]+_[C-1])/2,l.curve=T,h.curve=v}y=_,g&&(s(y)&&m===null?m=n(r,u):m!==null&&(m(),m=null))},get inputs(){return[u]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(_){l.oversample=_,h.oversample=_},addEventListener(..._){return u.addEventListener(_[0],_[1],_[2])},dispatchEvent(..._){return u.dispatchEvent(_[0])},removeEventListener(..._){return u.removeEventListener(_[0],_[1],_[2])}};o!==null&&(w.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==w.oversample&&(w.oversample=a);const x=()=>{u.connect(l).connect(p),u.connect(d).connect(h).connect(f).connect(p),g=!0,s(y)&&(m=n(r,u))},A=()=>{u.disconnect(l),l.disconnect(p),u.disconnect(d),d.disconnect(h),h.disconnect(f),f.disconnect(p),g=!1,m!==null&&(m(),m=null)};return i(Ts(w,p),x,A)},De=()=>new DOMException("","NotSupportedError"),Wu={numberOfChannels:1},Gu=(n,e,t,s,i)=>class extends n{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:h,numberOfChannels:u,sampleRate:d}={...Wu,...l},p=s(u,h,d);e(Us,()=>Us(p))||p.addEventListener("statechange",(()=>{let f=0;const m=g=>{this._state==="running"&&(f>0?(p.removeEventListener("statechange",m),g.stopImmediatePropagation(),this._waitForThePromiseToSettle(g)):f+=1)};return m})()),super(p,u),this._length=h,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,sa(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},Yu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},Hu=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...Yu,...l},d=t(h,u),p=r(h),f=p?s():null,m=c.sampleRate/2;super(c,!1,d,f),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,m,-m),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=f,this._oscillatorNodeRenderer!==null&&u.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=u.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const h=this._nativeOscillatorNode.onended;this._onended=h!==null&&h===l?c:h}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){_s(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),pt(this)&&Qs(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},Xu=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(h,u)=>{let d=t(h);const p=Ce(d,u);if(!p){const f={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(u,f),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(u,d),p?(await n(u,h.detune,d.detune),await n(u,h.frequency,d.frequency)):(await s(u,h.detune,d.detune),await s(u,h.frequency,d.frequency)),await i(h,u,d),d};return{set periodicWave(h){o=h},set start(h){a=h},set stop(h){c=h},render(h,u){const d=r.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},Zu={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},Qu=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...Zu,...l},d=t(h,u),p=r(h),f=p?s():null;super(c,!1,d,f),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Ee,Re),this._orientationY=e(this,p,d.orientationY,Ee,Re),this._orientationZ=e(this,p,d.orientationZ,Ee,Re),this._positionX=e(this,p,d.positionX,Ee,Re),this._positionY=e(this,p,d.positionY,Ee,Re),this._positionZ=e(this,p,d.positionZ,Ee,Re),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},Ju=(n,e,t,s,i,r,o,a,c,l)=>()=>{const h=new WeakMap;let u=null;const d=async(p,f)=>{let m=null,g=r(p);const y={channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation},w={...y,coneInnerAngle:g.coneInnerAngle,coneOuterAngle:g.coneOuterAngle,coneOuterGain:g.coneOuterGain,distanceModel:g.distanceModel,maxDistance:g.maxDistance,panningModel:g.panningModel,refDistance:g.refDistance,rolloffFactor:g.rolloffFactor},x=Ce(g,f);if("bufferSize"in g)m=s(f,{...y,gain:1});else if(!x){const A={...w,orientationX:g.orientationX.value,orientationY:g.orientationY.value,orientationZ:g.orientationZ.value,positionX:g.positionX.value,positionY:g.positionY.value,positionZ:g.positionZ.value};g=i(f,A)}if(h.set(f,m===null?g:m),m!==null){if(u===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const N=new o(6,p.context.length,f.sampleRate),k=e(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});k.connect(N.destination),u=(async()=>{const E=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(O,L)=>{const $=t(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:L===0?1:0});return await a(N,O,$.offset),$}));for(let O=0;O<6;O+=1)E[O].connect(k,0,O),E[O].start(0);return l(N)})()}const A=await u,_=s(f,{...y,gain:1});await c(p,f,_);const b=[];for(let N=0;N<A.numberOfChannels;N+=1)b.push(A.getChannelData(N));let T=[b[0][0],b[1][0],b[2][0]],v=[b[3][0],b[4][0],b[5][0]],C=s(f,{...y,gain:1}),S=i(f,{...w,orientationX:T[0],orientationY:T[1],orientationZ:T[2],positionX:v[0],positionY:v[1],positionZ:v[2]});_.connect(C).connect(S.inputs[0]),S.connect(m);for(let N=128;N<A.length;N+=128){const k=[b[0][N],b[1][N],b[2][N]],E=[b[3][N],b[4][N],b[5][N]];if(k.some((O,L)=>O!==T[L])||E.some((O,L)=>O!==v[L])){T=k,v=E;const O=N/f.sampleRate;C.gain.setValueAtTime(0,O),C=s(f,{...y,gain:0}),S=i(f,{...w,orientationX:T[0],orientationY:T[1],orientationZ:T[2],positionX:v[0],positionY:v[1],positionZ:v[2]}),C.gain.setValueAtTime(1,O),_.connect(C).connect(S.inputs[0]),S.connect(m)}}return m}return x?(await n(f,p.orientationX,g.orientationX),await n(f,p.orientationY,g.orientationY),await n(f,p.orientationZ,g.orientationZ),await n(f,p.positionX,g.positionX),await n(f,p.positionY,g.positionY),await n(f,p.positionZ,g.positionZ)):(await a(f,p.orientationX,g.orientationX),await a(f,p.orientationY,g.orientationY),await a(f,p.orientationZ,g.orientationZ),await a(f,p.positionX,g.positionX),await a(f,p.positionY,g.positionY),await a(f,p.positionZ,g.positionZ)),ws(g)?await c(p,f,g.inputs[0]):await c(p,f,g),g};return{render(p,f){const m=h.get(f);return m!==void 0?Promise.resolve(m):d(p,f)}}},Ku={disableNormalization:!1},ed=(n,e,t,s)=>class da{constructor(r,o){const a=e(r),c=s({...Ku,...o}),l=n(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===da.prototype||t.has(r)}},td=(n,e)=>(t,s,i)=>(n(s).replay(i),e(s,t,i)),sd=(n,e,t)=>async(s,i,r)=>{const o=n(s);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,h])=>{const d=await e(l).render(l,i),p=s.context.destination;!t(l)&&(s!==p||!t(s))&&d.connect(r,h,c)})).reduce((a,c)=>[...a,...c],[]))},nd=(n,e,t)=>async(s,i,r)=>{const o=e(s);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const h=await n(a).render(a,i);t(a)||h.connect(r,c)}))},id=(n,e,t,s)=>i=>n(Us,()=>Us(i))?Promise.resolve(n(s,s)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),rd=n=>(e,t)=>{n.set(e,t)},od=n=>(e,t)=>n.set(e,t),ad=(n,e,t,s,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(s(l)).map(h=>t(h).render(h,l)))).then(()=>i(l)).then(h=>(typeof h.copyFromChannel!="function"?(o(h),Ki(h)):e(r,()=>r(h))||a(h),n.add(h),h)),cd={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},ld=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),h={...cd,...c},u=t(l,h),d=r(l),p=d?s():null;super(a,!1,u,p),this._pan=e(this,d,u.pan)}get pan(){return this._pan}},hd=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Ce(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,u)}return r.set(c,l),h?await n(c,a.pan,l.pan):await s(c,a.pan,l.pan),ws(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},ud=n=>()=>{if(n===null)return!1;try{new n({length:1,sampleRate:44100})}catch{return!1}return!0},dd=(n,e)=>async()=>{if(n===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),s=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await s.audioWorklet.addModule(i);const a=new n(s,"a",{numberOfOutputs:0}),c=s.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await s.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},pd=(n,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),s=n(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{s.disconnect(),i(t.currentTime!==0)},t.startRendering()})},fd=()=>new DOMException("","UnknownError"),md={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},gd=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const h=i(c),u={...md,...l},d=t(h,u),f=r(h)?s():null;super(c,!0,d,f),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},yd=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ce(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=n(o,l)}return s.set(o,a),ws(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},_d=()=>typeof window>"u"?null:window,vd=(n,e)=>t=>{t.copyFromChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)s[u]=l[u+o]},t.copyToChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=s.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)l[u+o]=s[u]}},xd=n=>e=>{e.copyFromChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyToChannel)},bd=n=>(e,t)=>{const s=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=s),n(e,"buffer",i=>()=>{const r=i.call(e);return r===s?null:r},i=>r=>i.call(e,r===null?s:r))},wd=(n,e)=>(t,s)=>{s.channelCount=1,s.channelCountMode="explicit",Object.defineProperty(s,"channelCount",{get:()=>1,set:()=>{throw n()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:()=>{throw n()}});const i=t.createBufferSource();e(s,()=>{const a=s.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(s,0,c)},()=>i.disconnect(s))},pa=(n,e,t)=>n.copyFromChannel===void 0?n.getChannelData(t)[0]:(n.copyFromChannel(e,t),e[0]),fa=n=>{if(n===null)return!1;const e=n.length;return e%2!==0?n[Math.floor(e/2)]!==0:n[e/2-1]+n[e/2]!==0},sn=(n,e,t,s)=>{let i=n;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(n,e,{get:t(r),set:s(o)})},Td=n=>({...n,outputChannelCount:n.outputChannelCount!==void 0?n.outputChannelCount:n.numberOfInputs===1&&n.numberOfOutputs===1?[n.channelCount]:Array.from({length:n.numberOfOutputs},()=>1)}),Ad=n=>({...n,channelCount:n.numberOfOutputs}),Sd=n=>{const{imag:e,real:t}=n;return e===void 0?t===void 0?{...n,imag:[0,0],real:[0,0]}:{...n,imag:Array.from(t,()=>0),real:t}:t===void 0?{...n,imag:e,real:Array.from(e,()=>0)}:{...n,imag:e,real:t}},ma=(n,e,t)=>{try{n.setValueAtTime(e,t)}catch(s){if(s.code!==9)throw s;ma(n,e,t+1e-7)}},kd=n=>{const e=n.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},Nd=n=>{const e=n.createBufferSource(),t=n.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Cd=n=>{const e=n.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},ir=n=>{const e=n.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},ga=n=>{const e=n.createBuffer(1,1,44100),t=n.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},rr=n=>{const e=n.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},Id=n=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(n)}finally{e.close(),t.close()}},Od=n=>{n.start=(e=>(t=0,s=0,i)=>{const r=n.buffer,o=r===null?s:Math.min(r.duration,s);r!==null&&o>r.duration-.5/n.context.sampleRate?e.call(n,t,0,0):e.call(n,t,o,i)})(n.start)},ya=(n,e)=>{const t=e.createGain();n.connect(t);const s=(i=>()=>{i.call(n,t),n.removeEventListener("ended",s)})(n.disconnect);n.addEventListener("ended",s),Ts(n,t),n.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(n,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(n,o),r=!0}})(n.stop)},As=(n,e)=>t=>{const s={value:n};return Object.defineProperties(t,{currentTarget:s,target:s}),typeof e=="function"?e.call(n,t):e.handleEvent.call(n,t)},Ed=Qc(Jt),Md=nl(Jt),Dd=mh(Yn),_a=new WeakMap,Rd=Dh(_a),st=Wl(new Map,new WeakMap),ot=_d(),va=lu(st,ct),or=Mh(Me),ke=sd(Me,or,Yt),$d=cl(va,ae,ke),oe=Ph(Gn),vt=Pu(ot),re=Kh(vt),xa=new WeakMap,ba=Sh(As),nn=pu(ot),ar=Xh(nn),cr=Zh(ot),wa=Qh(ot),js=mu(ot),ye=Dl(Jc(Xo),sl(Ed,Md,kn,Dd,Nn,Me,Rd,Zs,ae,Jt,pt,Yt,gn),st,zh(Ii,Nn,Me,ae,Bs,pt),ct,Hn,De,uh(kn,Ii,Me,ae,Bs,oe,pt,re),_h(xa,Me,Je),ba,oe,ar,cr,wa,re,js),Pd=al(ye,$d,ct,va,oe,re),lr=new WeakSet,yo=hu(ot),Ta=ih(new Uint32Array(1)),hr=vd(Ta,ct),ur=xd(Ta),Aa=hl(lr,st,De,yo,vt,ud(yo),hr,ur),Xn=il(Pe),Sa=nd(or,Js,Yt),lt=Jl(Sa),Ss=du(Xn,st,kd,Nd,Cd,ir,ga,rr,Od,bd(sn),ya),ht=td(Rh(Js),Sa),Fd=pl(lt,Ss,ae,ht,ke),nt=Rl(Kc(Zo),xa,Ji,$l,Wc,Gc,Yc,Hc,Xc,ki,Go,nn,ma),Vd=dl(ye,Fd,nt,Te,Ss,oe,re,As),Ld=wl(ye,Tl,ct,Te,fu(Pe,sn),oe,re,ke),Bd=zl(lt,ha,ae,ht,ke),Kt=od(_a),Ud=ql(ye,nt,Bd,Hn,ha,oe,re,Kt),Rt=au(Jt,cr),jd=wd(Te,Rt),$t=wu(nn,jd),qd=Hl($t,ae,ke),zd=Yl(ye,qd,$t,oe,re),Wd=Ql(en,ae,ke),Gd=Zl(ye,Wd,en,oe,re,Ad),Yd=Su(Xn,Ss,Pe,Rt),ks=Au(Xn,st,Yd,ir,rr),Hd=nh(lt,ks,ae,ht,ke),Xd=sh(ye,nt,Hd,ks,oe,re,As),ka=ku(De,sn),Zd=ah(ka,ae,ke),Qd=oh(ye,Zd,ka,oe,re,Kt),Jd=fh(lt,ua,ae,ht,ke),Kd=ph(ye,nt,Jd,ua,oe,re,Kt),Na=Nu(De),ep=wh(lt,Na,ae,ht,ke),tp=bh(ye,nt,ep,Na,De,oe,re,Kt),sp=Oh(lt,Pe,ae,ht,ke),np=Ih(ye,nt,sp,Pe,oe,re),ip=Eu(Hn,Te,tn,De),Zn=id(st,Pe,tn,pd(Pe,vt)),rp=qh(Ss,ae,vt,ke,Zn),op=Cu(ip),ap=Uh(ye,op,rp,oe,re,Kt),cp=Al(nt,$t,ks,tn,De,pa,re,sn),Ca=new WeakMap,lp=ou(Ld,cp,ba,re,Ca,As),Ia=Fu(Xn,st,ir,ga,rr,ya),hp=Xu(lt,Ia,ae,ht,ke),up=Hu(ye,nt,Ia,hp,oe,re,As),Oa=eh(Ss),dp=zu(Oa,Te,Pe,fa,Rt),Qn=qu(Oa,Te,dp,fa,Rt,nn,sn),pp=Lu(kn,Te,$t,Pe,tn,Qn,De,Nn,pa,Rt),Ea=Vu(pp),fp=Ju(lt,$t,ks,Pe,Ea,ae,vt,ht,ke,Zn),mp=Qu(ye,nt,Ea,fp,oe,re,Kt),gp=Bu(ct),yp=ed(gp,oe,new WeakSet,Sd),_p=ju($t,en,Pe,Qn,De,Rt),Ma=Uu(_p,De),vp=hd(lt,Ma,ae,ht,ke),xp=ld(ye,nt,Ma,vp,oe,re),bp=yd(Qn,ae,ke),wp=gd(ye,Te,Qn,bp,oe,re,Kt),Da=eu(ot),dr=kh(ot),Ra=new WeakMap,Tp=Fh(Ra,vt),Ap=Da?tl(st,De,Ah(ot),dr,Nh(Zc),oe,Tp,re,js,new WeakMap,new WeakMap,dd(js,vt),ot):void 0,Sp=Jh(ar,re),kp=hh(lr,st,lh,Th,new WeakSet,oe,Sp,An,Us,hr,ur),$a=Ul(Ap,Pd,Aa,Vd,Ud,zd,Gd,Xd,Qd,kp,Kd,tp,np,ap,lp,up,mp,yp,xp,wp),Np=tu(ye,Mu,oe,re),Cp=nu(ye,Du,oe,re),Ip=iu(ye,Ru,oe,re),Op=$u(Te,re),Ep=ru(ye,Op,oe),Mp=bl($a,Te,De,fd,Np,Cp,Ip,Ep,nn),pr=Vh(Ca),Dp=rl(pr),Pa=Kl(ct),Rp=gh(pr),Fa=vh(ct),Va=new WeakMap,$p=Eh(Va,Je),Pp=bu(Pa,ct,Te,$t,en,ks,Pe,tn,De,Fa,dr,$p,Rt),Fp=yu(Te,Pp,Pe,De,Rt),Vp=Bl(lt,Pa,Ss,$t,en,ks,Pe,Rp,Fa,dr,ae,js,vt,ht,ke,Zn),Lp=$h(Ra),Bp=rd(Va),_o=Da?Fl(Dp,ye,nt,Vp,Fp,Me,Lp,oe,re,js,Td,Bp,Id,As):void 0,Up=ch(De,vt),jp=ad(lr,st,or,pr,Zn,An,hr,ur),qp=Gu($a,st,Te,Up,jp),zp=Wh(Gn,ar),Wp=Gh(Qi,cr),Gp=Yh(Ji,wa),Yp=Hh(Gn,re);function Ye(n){return n===void 0}function H(n){return n!==void 0}function Hp(n){return typeof n=="function"}function mt(n){return typeof n=="number"}function zt(n){return Object.prototype.toString.call(n)==="[object Object]"&&n.constructor===Object}function Xp(n){return typeof n=="boolean"}function je(n){return Array.isArray(n)}function gt(n){return typeof n=="string"}function pn(n){return gt(n)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(n)}function U(n,e){if(!n)throw new Error(e)}function Be(n,e,t=1/0){if(!(e<=n&&n<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${n}`)}function La(n){!n.isOffline&&n.state!=="running"&&Jn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let Ba=!1,vo=!1;function xo(n){Ba=n}function Zp(n){Ye(n)&&Ba&&!vo&&(vo=!0,Jn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let Ua=console;function Qp(...n){Ua.log(...n)}function Jn(...n){Ua.warn(...n)}function Jp(n){return new Mp(n)}function Kp(n,e,t){return new qp(n,e,t)}const Le=typeof self=="object"?self:null,ef=Le&&(Le.hasOwnProperty("AudioContext")||Le.hasOwnProperty("webkitAudioContext"));function tf(n,e,t){return U(H(_o),"AudioWorkletNode only works in a secure context (https or localhost)"),new(n instanceof Le?.BaseAudioContext?Le?.AudioWorkletNode:_o)(n,e,t)}function it(n,e,t,s){var i=arguments.length,r=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,s);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function ge(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(s.next(h))}catch(u){o(u)}}function c(h){try{l(s.throw(h))}catch(u){o(u)}}function l(h){h.done?r(h.value):i(h.value).then(a,c)}l((s=s.apply(n,e||[])).next())})}class sf{constructor(e,t,s,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=s,this._createClock()}_createWorker(){const e=new Blob([`
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
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),s=new Worker(t);s.onmessage=this._callback.bind(this),this._worker=s}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function Ht(n){return Gp(n)}function Ct(n){return Wp(n)}function yn(n){return Yp(n)}function cs(n){return zp(n)}function nf(n){return n instanceof Aa}function rf(n,e){return n==="value"||Ht(e)||Ct(e)||nf(e)}function Wt(n,...e){if(!e.length)return n;const t=e.shift();if(zt(n)&&zt(t))for(const s in t)rf(s,t[s])?n[s]=t[s]:zt(t[s])?(n[s]||Object.assign(n,{[s]:{}}),Wt(n[s],t[s])):Object.assign(n,{[s]:t[s]});return Wt(n,...e)}function of(n,e){return n.length===e.length&&n.every((t,s)=>e[s]===t)}function P(n,e,t=[],s){const i={},r=Array.from(e);if(zt(r[0])&&s&&!Reflect.has(r[0],s)&&(Object.keys(r[0]).some(a=>Reflect.has(n,a))||(Wt(i,{[s]:r[0]}),t.splice(t.indexOf(s),1),r.shift())),r.length===1&&zt(r[0]))Wt(i,r[0]);else for(let o=0;o<t.length;o++)H(r[o])&&(i[t[o]]=r[o]);return Wt(n,i)}function af(n){return n.constructor.getDefaults()}function fs(n,e){return Ye(n)?e:n}function Ze(n,e){return e.forEach(t=>{Reflect.has(n,t)&&delete n[t]}),n}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class xt{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||Le&&this.toString()===Le.TONE_DEBUG_CLASS)&&Qp(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}xt.version=Wo;const fr=1e-6;function vs(n,e){return n>e+fr}function Ri(n,e){return vs(n,e)||Xe(n,e)}function En(n,e){return n+fr<e}function Xe(n,e){return Math.abs(n-e)<fr}function cf(n,e,t){return Math.max(Math.min(n,t),e)}class He extends xt{constructor(){super(),this.name="Timeline",this._timeline=[];const e=P(He.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(U(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];U(Ri(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const s=this._search(e,t);return s!==-1?this._timeline[s]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const s=this._search(e,t);return s+1<this._timeline.length?this._timeline[s+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const s=this._search(e);return s-1>=0?this._timeline[s-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(Xe(this._timeline[t].time,e)){for(let s=t;s>=0&&Xe(this._timeline[s].time,e);s--)t=s;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&Ri(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let s=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;s<r;){let o=Math.floor(s+(r-s)/2);const a=this._timeline[o],c=this._timeline[o+1];if(Xe(a[t],e)){for(let l=o;l<this._timeline.length;l++){const h=this._timeline[l];if(Xe(h[t],e))o=l;else break}return o}else{if(En(a[t],e)&&vs(c[t],e))return o;vs(a[t],e)?r=o:s=o+1}}return-1}_iterate(e,t=0,s=this._timeline.length-1){this._timeline.slice(t,s+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const s=this._search(e);return s!==-1&&this._iterate(t,0,s),this}forEachAfter(e,t){const s=this._search(e);return this._iterate(t,s+1),this}forEachBetween(e,t,s){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(s,i,r)):i===-1&&this._iterate(s,0,r),this}forEachFrom(e,t){let s=this._search(e);for(;s>=0&&this._timeline[s].time>=e;)s--;return this._iterate(t,s+1),this}forEachAtTime(e,t){const s=this._search(e);if(s!==-1&&Xe(this._timeline[s].time,e)){let i=s;for(let r=s;r>=0&&Xe(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,s)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const ja=[];function Kn(n){ja.push(n)}function lf(n){ja.forEach(e=>e(n))}const qa=[];function ei(n){qa.push(n)}function hf(n){qa.forEach(e=>e(n))}class rn extends xt{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{Ye(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(Ye(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(Ye(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const s=this._events[e].slice(0);for(let i=0,r=s.length;i<r;i++)s[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const s=Object.getOwnPropertyDescriptor(rn.prototype,t);Object.defineProperty(e.prototype,t,s)})}dispose(){return super.dispose(),this._events=void 0,this}}class za extends rn{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class on extends za{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new He,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const s=P(on.getDefaults(),arguments,["context"]);s.context?(this._context=s.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=Jp({latencyHint:s.latencyHint}),this._latencyHint=s.latencyHint),this._ticker=new sf(this.emit.bind(this,"tick"),s.clockSource,s.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=s.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(lf(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,s){return this._context.createBuffer(e,t,s)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,s){return this._context.createPeriodicWave(e,t,s)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return U(cs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return U(cs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return U(cs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){U(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){U(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){U(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){U(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return tf(this.rawContext,e,t)}addAudioWorkletModule(e){return ge(this,void 0,void 0,function*(){U(H(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return ge(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return cs(this._context)?this._context.resume():Promise.resolve()}close(){return ge(this,void 0,void 0,function*(){cs(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&hf(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),s=t.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const s=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:s+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const s=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:s,time:r+t})};return i(),s}}class uf extends za{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,s){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,s){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return ge(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function X(n,e){je(e)?e.forEach(t=>X(n,t)):Object.defineProperty(n,e,{enumerable:!0,writable:!1})}function mr(n,e){je(e)?e.forEach(t=>mr(n,t)):Object.defineProperty(n,e,{writable:!0})}const se=()=>{};class ie extends xt{constructor(){super(),this.name="ToneAudioBuffer",this.onload=se;const e=P(ie.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,gt(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:se,onload:se,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:We().sampleRate}set(e){return e instanceof ie?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return ge(this,void 0,void 0,function*(){const t=ie.load(e).then(s=>{this.set(s),this.onload(this)});ie.downloads.push(t);try{yield t}finally{const s=ie.downloads.indexOf(t);ie.downloads.splice(s,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=je(e)&&e[0].length>0,s=t?e.length:1,i=t?e[0].length:e.length,r=We(),o=r.createBuffer(s,i,r.sampleRate),a=!t&&s===1?[e]:e;for(let c=0;c<s;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(mt(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const s=this.numberOfChannels;for(let i=0;i<s;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/s),this.fromArray(t)}return this}toArray(e){if(mt(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let s=0;s<this.numberOfChannels;s++)t[s]=this.getChannelData(s);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){U(this.loaded,"Buffer is not loaded");const s=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);U(s<i,"The start time must be less than the end time");const r=i-s,o=We().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(s,i),a);return new ie(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ie().fromArray(e)}static fromUrl(e){return ge(this,void 0,void 0,function*(){return yield new ie().load(e)})}static load(e){return ge(this,void 0,void 0,function*(){const t=ie.baseUrl===""||ie.baseUrl.endsWith("/")?ie.baseUrl:ie.baseUrl+"/",s=yield fetch(t+e);if(!s.ok)throw new Error(`could not load url: ${e}`);const i=yield s.arrayBuffer();return yield We().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),s=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+s)!==""}static loaded(){return ge(this,void 0,void 0,function*(){for(yield Promise.resolve();ie.downloads.length;)yield ie.downloads[0]})}}ie.baseUrl="";ie.downloads=[];class ti extends on{constructor(){super({clockSource:"offline",context:yn(arguments[0])?arguments[0]:Kp(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:yn(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=yn(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return ge(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const s=Math.floor(this.sampleRate/128);e&&t%s===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return ge(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ie(t)})}close(){return Promise.resolve()}}const Wa=new uf;let jt=Wa;function We(){return jt===Wa&&ef&&df(new on),jt}function df(n,e=!1){e&&jt.dispose(),cs(n)?jt=new on(n):yn(n)?jt=new ti(n):jt=n}function pf(){return jt.resume()}if(Le&&!Le.TONE_SILENCE_LOGGING){const e=` * Tone.js v${Wo} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function ff(n){return Math.pow(10,n/20)}function mf(n){return 20*(Math.log(n)/Math.LN10)}function Ga(n){return Math.pow(2,n/12)}let si=440;function gf(){return si}function yf(n){si=n}function qt(n){return Math.round(Ya(n))}function Ya(n){return 69+12*Math.log2(n/si)}function Ha(n){return si*Math.pow(2,(n-69)/12)}class gr extends xt{constructor(e,t,s){super(),this.defaultUnits="s",this._val=t,this._units=s,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const s=parseInt(e,10),i=t==="."?1.5:1;return s===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/s)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,s)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i+=this._beatsToUnits(parseFloat(s)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof gr&&this.fromType(this._val),Ye(this._val))return this._noArg();if(gt(this._val)&&Ye(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(zt(this._val)){let e=0;for(const t in this._val)if(H(this._val[t])){const s=this._val[t],i=new this.constructor(this.context,t).valueOf()*s;e+=i}return e}if(H(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return gt(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class Qe extends gr{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new Qe(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const s=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/s)*s-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let s=t[0],i=new Qe(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new Qe(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(s=r,i=o)}),s}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const s=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[s,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return qt(this.toFrequency())}_now(){return this.context.now()}}class Ue extends Qe{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return gf()}static set A4(e){yf(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:Ue.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=_f[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:Ue.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,s){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i*=this._beatsToUnits(parseFloat(s)/4)),i}}})}transpose(e){return new Ue(this.context,this.valueOf()*Ga(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return qt(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/Ue.A4);let s=Math.round(12*t)+57;const i=Math.floor(s/12);return i<0&&(s+=-12*i),vf[s%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return Ha(e)}static ftom(e){return qt(e)}}const _f={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},vf=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class $s extends Qe{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class $e extends xt{constructor(){super();const e=P($e.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:We()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return Zp(e),new Qe(this.context,e).toSeconds()}toFrequency(e){return new Ue(this.context,e).toFrequency()}toTicks(e){return new $s(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(s=>{Ye(e[s])&&delete t[s]}),t}get(){const e=af(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const s=this[t];H(s)&&H(s.value)&&H(s.setValueAtTime)?e[t]=s.value:s instanceof $e?e[t]=s._getPartialProperties(e[t]):je(s)||mt(s)||gt(s)||Xp(s)?e[t]=s:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&H(this[t])&&(this[t]&&H(this[t].value)&&H(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof $e?this[t].set(e[t]):this[t]=e[t])}),this}}class yr extends He{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,s){return Be(t,0),this.add(Object.assign({},s,{state:e,time:t})),this}getLastState(e,t){const s=this._search(t);for(let i=s;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const s=this._search(t);if(s!==-1)for(let i=s;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class G extends $e{constructor(){const e=P(G.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,U(H(e.param)&&(Ht(e.param)||e.param instanceof G),"param must be an AudioParam");!Ht(e.param);)e.param=e.param._param;this._swappable=H(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new He(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,H(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign($e.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return H(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return H(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return H(this.maxValue)&&H(this.minValue)&&Be(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?ff(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?mf(e):e}setValueAtTime(e,t){const s=this.toSeconds(t),i=this._fromType(e);return U(isFinite(i)&&isFinite(s),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,s),this._events.add({time:s,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,s),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),s=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(s===null||s.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(s===null)r=i.value;else if(s.type==="linearRampToValueAtTime"||s.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}s.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,s.time,s.value,t):r=this._exponentialInterpolate(i.time,o,s.time,s.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const s=this._fromType(e),i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this._events.add({time:i,type:"linearRampToValueAtTime",value:s}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(s,i),this}exponentialRampToValueAtTime(e,t){let s=this._fromType(e);s=Xe(s,0)?this._minOutput:s,this._assertRange(s);const i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:s}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(s,i),this}exponentialRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialRampToValueAtTime(e,s+this.toSeconds(t)),this}linearRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.linearRampToValueAtTime(e,s+this.toSeconds(t)),this}targetRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialApproachValueAtTime(e,s,t),this}exponentialApproachValueAtTime(e,t,s){t=this.toSeconds(t),s=this.toSeconds(s);const i=Math.log(s+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+s*.9),this.linearRampToValueAtTime(e,t+s),this}setTargetAtTime(e,t,s){const i=this._fromType(e);U(isFinite(s)&&s>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),U(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:s,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,s),this._param.setTargetAtTime(i,r,s),this}setValueCurveAtTime(e,t,s,i=1){s=this.toSeconds(s),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=s/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return U(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),s=this._fromType(this.getValueAtTime(t));U(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+s);const i=this._events.get(t),r=this._events.getAfter(t);return i&&Xe(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(s),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(s),t)),this._events.add({time:t,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,t),this}rampTo(e,t=.1,s){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,s):this.linearRampTo(e,t,s),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const s=this._events.get(t);if(s&&s.type==="setTargetAtTime"){const i=this._events.getAfter(s.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){U(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,s,i,r){return s+(t-s)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,s,i,r){return t+(i-t)*((r-e)/(s-e))}_exponentialInterpolate(e,t,s,i,r){return t*Math.pow(i/t,(r-e)/(s-e))}}class D extends $e{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return H(this.input)?Ht(this.input)||this.input instanceof G?1:this.input.numberOfInputs:0}get numberOfOutputs(){return H(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return H(e)&&(e instanceof D||Ct(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(s=>{s.channelCount=e.channelCount,s.channelCountMode=e.channelCountMode,s.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();U(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,s=0){return Ke(this,e,t,s),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return Jn("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,s=0){return Xa(this,e,t,s),this}chain(...e){return Xt(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),H(this.input)&&(this.input instanceof D?this.input.dispose():Ct(this.input)&&this.input.disconnect()),H(this.output)&&(this.output instanceof D?this.output.dispose():Ct(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Xt(...n){const e=n.shift();n.reduce((t,s)=>(t instanceof D?t.connect(s):Ct(t)&&Ke(t,s),s),e)}function Ke(n,e,t=0,s=0){for(U(H(n),"Cannot connect from undefined node"),U(H(e),"Cannot connect to undefined node"),(e instanceof D||Ct(e))&&U(e.numberOfInputs>0,"Cannot connect to node with no inputs"),U(n.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof D||e instanceof G;)H(e.input)&&(e=e.input);for(;n instanceof D;)H(n.output)&&(n=n.output);Ht(e)?n.connect(e,t):n.connect(e,t,s)}function Xa(n,e,t=0,s=0){if(H(e))for(;e instanceof D;)e=e.input;for(;!Ct(n);)H(n.output)&&(n=n.output);Ht(e)?n.disconnect(e,t):Ct(e)?n.disconnect(e,t,s):n.disconnect()}class J extends D{constructor(){const e=P(J.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new G({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),X(this,"gain")}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class xs extends D{constructor(e){super(e),this.onended=se,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new J({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const s=this.toSeconds(t);return this._startTime!==-1&&s>=this._startTime&&(this._stopTime===-1||s<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(D.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:se})}_startGain(e,t=1){U(this._startTime===-1,"Source cannot be started more than once");const s=this.toSeconds(this._fadeIn);return this._startTime=e+s,this._startTime=Math.max(this._startTime,this.context.currentTime),s>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+s):this._gainNode.gain.exponentialApproachValueAtTime(t,e,s)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){U(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const s=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+s),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==se&&(this.onended(this),this.onended=se,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),U(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=se,this}}class _r extends xs{constructor(){const e=P(_r.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),Ke(this._source,this._gainNode),this.offset=new G({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(xs.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class te extends D{constructor(){const e=P(te.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new _r({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(D.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,s=0){return ni(this,e,t,s),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,s){return this._param.exponentialRampTo(e,t,s),this}linearRampTo(e,t,s){return this._param.linearRampTo(e,t,s),this}targetRampTo(e,t,s){return this._param.targetRampTo(e,t,s),this}exponentialApproachValueAtTime(e,t,s){return this._param.exponentialApproachValueAtTime(e,t,s),this}setTargetAtTime(e,t,s){return this._param.setTargetAtTime(e,t,s),this}setValueCurveAtTime(e,t,s,i){return this._param.setValueCurveAtTime(e,t,s,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,s){return this._param.rampTo(e,t,s),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function ni(n,e,t,s){(e instanceof G||Ht(e)||e instanceof te&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof te&&(e.overridden=!0)),Ke(n,e,t,s)}class vr extends G{constructor(){const e=P(vr.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new He(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(G.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,s){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/s,1));for(let a=0;a<=o;a++){const c=s*a+t,l=this._exponentialApproach(r.time,r.value,i,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const s=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const s=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const s=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(Ye(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const s=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(s+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),s=this._events.get(t);return Math.max(this._getTicksUntilEvent(s,t),0)}getDurationOfTicks(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-s}getTimeOfTick(e){const t=this._events.get(e,"ticks"),s=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&s&&s.type==="linearRampToValueAtTime"&&t.value!==s.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(s.time))-i)/(s.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const s=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(s);return this.getTicksAtTime(s+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class xr extends te{constructor(){const e=P(xr.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new vr({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(te.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class br extends $e{constructor(){const e=P(br.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new yr,this._tickOffset=new He,this._ticksAtTime=new He,this._secondsAtTime=new He,this.frequency=new xr({context:this.context,units:e.units,value:e.frequency}),X(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},$e.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const s=this.toSeconds(e);return this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),H(t)&&this.setTicksAtTime(t,s),this._ticksAtTime.cancel(s),this._secondsAtTime.cancel(s)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const s=this._state.get(t);s&&s.time>0&&(this._tickOffset.cancel(s.time),this._state.cancel(s.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),s=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||s,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let h=o.time;const u=this._tickOffset.get(l.time);u&&u.time>=o.time&&(a=u.ticks,h=u.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(h),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),s=this.frequency.timeToTicks(e,t);this.setTicksAtTime(s,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),s={state:"paused",time:e};this._state.add(s);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const h=this._tickOffset.get(c.time);h&&h.time>=r.time&&(o=h.seconds,l=h.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==s.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(s),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const s=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(s.time,i.time),o=this.frequency.getTicksAtTime(r)+e-s.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,s){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,s),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let h=Math.ceil(l)-l;h=Xe(h,1)?0:h;let u=this.frequency.getTimeOfTick(a+h);for(;u<t;){try{s(u,Math.round(this.getTicksAtTime(u)))}catch(d){r=d;break}u+=this.frequency.getDurationOfTicks(1,u)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class ii extends $e{constructor(){const e=P(ii.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=se,this._lastUpdate=0,this._state=new yr("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new br({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,X(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign($e.getDefaults(),{callback:se,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){La(this.context);const s=this.toSeconds(e);return this.log("start",s),this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),this._tickSource.start(s,t),s<this._lastUpdate&&this.emit("start",s,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(s);return this._tickSource.getTimeOfTick(i+e,s)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,s=>{switch(s.state){case"started":const i=this._tickSource.getTicksAtTime(s.time);this.emit("start",s.time,i);break;case"stopped":s.time!==0&&this.emit("stop",s.time);break;case"paused":this.emit("pause",s.time);break}}),this._tickSource.forEachTickBetween(e,t,(s,i)=>{this.callback(s,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}rn.mixin(ii);class Mn extends D{constructor(){const e=P(Mn.getDefaults(),arguments,["delayTime","maxDelay"]);super(e),this.name="Delay";const t=this.toSeconds(e.maxDelay);this._maxDelay=Math.max(t,this.toSeconds(e.delayTime)),this._delayNode=this.input=this.output=this.context.createDelay(t),this.delayTime=new G({context:this.context,param:this._delayNode.delayTime,units:"time",value:e.delayTime,minValue:0,maxValue:this.maxDelay}),X(this,"delayTime")}static getDefaults(){return Object.assign(D.getDefaults(),{delayTime:0,maxDelay:1})}get maxDelay(){return this._maxDelay}dispose(){return super.dispose(),this._delayNode.disconnect(),this.delayTime.dispose(),this}}class Ns extends D{constructor(){const e=P(Ns.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new J({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,X(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class wr extends D{constructor(){const e=P(wr.getDefaults(),arguments);super(e),this.name="Destination",this.input=new Ns({context:this.context}),this.output=new J({context:this.context}),this.volume=this.input.volume,Xt(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Xt(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}Kn(n=>{n.destination=new wr({context:n})});ei(n=>{n.destination.dispose()});class xf extends D{constructor(){super(...arguments),this.name="Listener",this.positionX=new G({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new G({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new G({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new G({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new G({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new G({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new G({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new G({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new G({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(D.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}Kn(n=>{n.listener=new xf({context:n})});ei(n=>{n.listener.dispose()});class Tr extends xt{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=P(Tr.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const s=e.urls[t];this.add(t,s,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:se,onload:se,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return U(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,s=se,i=se){return gt(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ie(this.baseUrl+t,s,i))):this._buffers.set(e.toString(),new ie(t,s,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class Dn extends Ue{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return qt(super._frequencyToUnits(e))}_ticksToUnits(e){return qt(super._ticksToUnits(e))}_beatsToUnits(e){return qt(super._beatsToUnits(e))}_secondsToUnits(e){return qt(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return Ha(this.toMidi())}transpose(e){return new Dn(this.context,this.toMidi()+e)}}class hs extends $s{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class bf extends $e{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new He,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}Kn(n=>{n.draw=new bf({context:n})});ei(n=>{n.draw.dispose()});class wf extends xt{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){U(H(e.time),"Events must have a time property"),U(H(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Tf(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const s of t)if(s.event===e){this._removeNode(s),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let s,i=null;if(t>0)if(e.left.right===null)s=e.left,s.right=e.right,i=s;else{for(s=e.left.right;s.right!==null;)s=s.right;s.parent&&(s.parent.right=s.left,i=s.parent,s.left=e.left,s.right=e.right)}else if(e.right.left===null)s=e.right,s.left=e.left,i=s;else{for(s=e.right.left;s.left!==null;)s=s.left;s.parent&&(s.parent.left=s.right,i=s.parent,s.left=e.left,s.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=s:e.parent.right=s:this._setRoot(s),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,s=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,s=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let s=t[0];for(let i=1;i<t.length;i++)t[i].low>s.low&&(s=t[i]);return s.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(s=>t.push(s)),t.forEach(s=>{s.event&&e(s.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const s=[];this._root.search(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const s=[];this._root.searchAfter(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Tf{constructor(e,t,s){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=s,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Af extends xt{constructor(e){super(),this.name="TimelineValue",this._timeline=new He({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class at extends D{constructor(){super(P(at.getDefaults(),arguments,["context"]))}connect(e,t=0,s=0){return ni(this,e,t,s),this}}class Cs extends at{constructor(){const e=P(Cs.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,je(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):Hp(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(te.getDefaults(),{length:1024})}setMap(e,t=1024){const s=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;s[i]=e(o,i)}return this.curve=s,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(s=>s.includes(e));U(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class ri extends at{constructor(){const e=P(ri.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new Cs({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(at.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class It{constructor(e,t){this.id=It._eventId++,this._remainderTime=0;const s=Object.assign(It.getDefaults(),t);this.transport=e,this.callback=s.callback,this._once=s.once,this.time=Math.floor(s.time),this._remainderTime=s.time-this.time}static getDefaults(){return{callback:se,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}It._eventId=0;class Ar extends It{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const s=Object.assign(Ar.getDefaults(),t);this.duration=s.duration,this._interval=s.interval,this._nextTick=s.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},It.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return En(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new hs(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){En(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new hs(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);vs(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class oi extends $e{constructor(){const e=P(oi.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new Af(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new He,this._repeatedEvents=new wf,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new ii({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),X(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign($e.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const s=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(s*Math.PI)*this._swingAmount;e+=new hs(this.context,this._swingTicks*2/3).toSeconds()*i}xo(!0),this._timeline.forEachAtTime(t,s=>s.invoke(e)),xo(!1)}schedule(e,t){const s=new It(this,{callback:e,time:new $s(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}scheduleRepeat(e,t,s,i=1/0){const r=new Ar(this,{callback:e,duration:new Qe(this.context,i).toTicks(),interval:new Qe(this.context,t).toTicks(),time:new $s(this.context,s).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const s=new It(this,{callback:e,once:!0,time:new $s(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,s=>this.clear(s.id)),this._repeatedEvents.forEachFrom(t,s=>this.clear(s.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new hs(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let s;return H(t)&&(s=this.toTicks(t)),this._clock.start(e,s),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){je(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new Qe(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new Qe(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new hs(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new hs(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),s=this._clock.frequency.timeToTicks(e,t);this.ticks=s}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const s=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(s)-s,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),s=this.getTicksAtTime(t),i=e-s%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const s=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(s)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new J(c),h=new ri(-1),u=new J(c);i.chain(l,h,u),i=u,r=1/r,o=[l,h,u]}t||(e.getValueAtTime(s)!==0?t=e.getValueAtTime(s)/r:t=0);const a=new J(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const s=this._syncedSignals[t];s.signal===e&&(s.nodes.forEach(i=>i.dispose()),s.signal.value=s.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),mr(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}rn.mixin(oi);Kn(n=>{n.transport=new oi({context:n})});ei(n=>{n.transport.dispose()});class Ae extends D{constructor(e){super(e),this.input=void 0,this._state=new yr("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=se,this._syncedStop=se,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Ns({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,X(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,onstop:se,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,s){let i=Ye(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")U(vs(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,s);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(fs(t,0)),r.duration=s?this.toSeconds(s):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,s)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else La(this.context),this._start(i,t,s);return this}stop(e){let t=Ye(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||H(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const s=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(s)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,s){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,s)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(vs(t,0)){const s=this._state.get(t);if(s&&s.state==="started"&&s.time!==t){const i=t-this.toSeconds(s.time);let r;s.duration&&(r=this.toSeconds(s.duration)-i),this._start(e,this.toSeconds(s.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=se,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class an extends xs{constructor(){const e=P(an.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,Ke(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new G({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ie(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(xs.getDefaults(),{url:new ie,loop:!1,loopEnd:0,loopStart:0,onload:se,onerror:se,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,s,i=1){U(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=fs(t,this.loopStart):t=fs(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;Ri(o,a)&&(o=(o-c)%l+c),Xe(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,En(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),H(s)){let a=this.toSeconds(s);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}class Rn extends Ae{constructor(){const e=P(Rn.getDefaults(),arguments,["type"]);super(e),this.name="Noise",this._source=null,this._playbackRate=e.playbackRate,this.type=e.type,this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Ae.getDefaults(),{fadeIn:0,fadeOut:0,playbackRate:1,type:"white"})}get type(){return this._type}set type(e){if(U(e in bo,"Noise: invalid type: "+e),this._type!==e&&(this._type=e,this.state==="started")){const t=this.now();this._stop(t),this._start(t)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this._source&&(this._source.playbackRate.value=e)}_start(e){const t=bo[this._type];this._source=new an({url:t,context:this.context,fadeIn:this._fadeIn,fadeOut:this._fadeOut,loop:!0,onended:()=>this.onstop(this),playbackRate:this._playbackRate}).connect(this.output),this._source.start(this.toSeconds(e),Math.random()*(t.duration-.001))}_stop(e){this._source&&(this._source.stop(this.toSeconds(e)),this._source=null)}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e,this._source&&(this._source.fadeIn=this._fadeIn)}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e,this._source&&(this._source.fadeOut=this._fadeOut)}_restart(e){this._stop(e),this._start(e)}dispose(){return super.dispose(),this._source&&this._source.disconnect(),this}}const rs=44100*5,wi=2,ut={brown:null,pink:null,white:null},bo={get brown(){if(!ut.brown){const n=[];for(let e=0;e<wi;e++){const t=new Float32Array(rs);n[e]=t;let s=0;for(let i=0;i<rs;i++){const r=Math.random()*2-1;t[i]=(s+.02*r)/1.02,s=t[i],t[i]*=3.5}}ut.brown=new ie().fromArray(n)}return ut.brown},get pink(){if(!ut.pink){const n=[];for(let e=0;e<wi;e++){const t=new Float32Array(rs);n[e]=t;let s,i,r,o,a,c,l;s=i=r=o=a=c=l=0;for(let h=0;h<rs;h++){const u=Math.random()*2-1;s=.99886*s+u*.0555179,i=.99332*i+u*.0750759,r=.969*r+u*.153852,o=.8665*o+u*.3104856,a=.55*a+u*.5329522,c=-.7616*c-u*.016898,t[h]=s+i+r+o+a+c+l+u*.5362,t[h]*=.11,l=u*.115926}}ut.pink=new ie().fromArray(n)}return ut.pink},get white(){if(!ut.white){const n=[];for(let e=0;e<wi;e++){const t=new Float32Array(rs);n[e]=t;for(let s=0;s<rs;s++)t[s]=Math.random()*2-1}ut.white=new ie().fromArray(n)}return ut.white}};function es(n,e){return ge(this,void 0,void 0,function*(){const t=e/n.context.sampleRate,s=new ti(1,t,n.context.sampleRate);return new n.constructor(Object.assign(n.get(),{frequency:2/t,detune:0,context:s})).toDestination().start(0),(yield s.render()).getChannelData(0)})}class Sr extends xs{constructor(){const e=P(Sr.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],Ke(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new G({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new G({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),X(this,["frequency","detune"])}static getDefaults(){return Object.assign(xs.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class me extends Ae{constructor(){const e=P(me.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),X(this,"frequency"),this.detune=new te({context:this.context,units:"cents",value:e.detune}),X(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Ae.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),s=new Sr({context:this.context,onended:()=>this.onstop(this)});this._oscillator=s,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return me._periodicWaveCache.find(t=>t.phase===this._phase&&of(t.partials,this._partials));{const e=me._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const s=this._getCachedPeriodicWave();if(H(s)){const{partials:i,wave:r}=s;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),me._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),me._periodicWaveCache.length>100&&me._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){Be(e,0);let t=this._type;const s=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(s&&(t=s[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let h;switch(e){case"sine":h=c<=a?1:0,this._partials[c-1]=h;break;case"square":h=c&1?2*l:0,this._partials[c-1]=h;break;case"sawtooth":h=l*(c&1?1:-1),this._partials[c-1]=h;break;case"triangle":c&1?h=2*(l*l)*(c-1>>1&1?-1:1):h=0,this._partials[c-1]=h;break;case"custom":h=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}h!==0?(r[c]=-h*Math.sin(t*c),o[c]=h*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,s){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*s)+t[o]*Math.sin(o*s);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let s=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)s=Math.max(this._inverseFFT(e,t,o/r*i),s);return cf(-this._inverseFFT(e,t,this._phase)/s,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}me._periodicWaveCache=[];class Za extends at{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new Cs({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class yt extends te{constructor(){const e=P(yt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new J({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class ai extends Ae{constructor(){const e=P(ai.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new Za({context:this.context}),this._modulationNode=new J({context:this.context}),this._carrier=new me({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new me({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new yt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),X(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(me.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class ci extends Ae{constructor(){const e=P(ci.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new J({context:this.context,gain:0}),this._carrier=new me({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new me({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new yt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new yt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),X(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(me.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class cn extends Ae{constructor(){const e=P(cn.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new J({context:this.context,gain:0}),this._thresh=new Cs({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new te({context:this.context,units:"audioRange",value:e.width}),this._triangle=new me({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),X(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Ae.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class li extends Ae{constructor(){const e=P(li.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,X(this,["frequency","detune"])}static getDefaults(){return Object.assign(me.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,s=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+s*r)}}get count(){return this._oscillators.length}set count(e){if(Be(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const s=new me({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):se});this.type==="custom"&&(s.partials=this._partials),this.frequency.connect(s.frequency),this.detune.connect(s.detune),s.detune.overridden=!1,s.connect(this.output),this._oscillators[t]=s}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,s)=>t.phase=this._phase+s/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class hi extends Ae{constructor(){const e=P(hi.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new yt({context:this.context,value:2}),this._pulse=new cn({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new me({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),X(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Ae.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const wo={am:ai,fat:li,fm:ci,oscillator:me,pulse:cn,pwm:hi};class Ot extends Ae{constructor(){const e=P(Ot.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),X(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(me.getDefaults(),ci.getDefaults(),ai.getDefaults(),li.getDefaults(),cn.getDefaults(),hi.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=wo[e],s=this.now();if(this._oscillator){const i=this._oscillator;i.stop(s),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(s)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof wo[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&mt(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&mt(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&gt(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return ge(this,arguments,void 0,function*(e=1024){return es(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}class kr extends te{constructor(){super(P(kr.getDefaults(),arguments,["value"])),this.override=!1,this.name="Add",this._sum=new J({context:this.context}),this.input=this._sum,this.output=this._sum,this.addend=this._param,Xt(this._constantSource,this._sum)}static getDefaults(){return Object.assign(te.getDefaults(),{value:0})}dispose(){return super.dispose(),this._sum.dispose(),this}}class ui extends at{constructor(){const e=P(ui.getDefaults(),arguments,["min","max"]);super(e),this.name="Scale",this._mult=this.input=new yt({context:this.context,value:e.max-e.min}),this._add=this.output=new kr({context:this.context,value:e.min}),this._min=e.min,this._max=e.max,this.input.connect(this.output)}static getDefaults(){return Object.assign(at.getDefaults(),{max:1,min:0})}get min(){return this._min}set min(e){this._min=e,this._setRange()}get max(){return this._max}set max(e){this._max=e,this._setRange()}_setRange(){this._add.value=this._min,this._mult.value=this._max-this._min}dispose(){return super.dispose(),this._add.dispose(),this._mult.dispose(),this}}class Nr extends at{constructor(){super(P(Nr.getDefaults(),arguments)),this.name="Zero",this._gain=new J({context:this.context}),this.output=this._gain,this.input=void 0,Ke(this.context.getConstant(0),this._gain)}dispose(){return super.dispose(),Xa(this.context.getConstant(0),this._gain),this}}class $n extends D{constructor(){const e=P($n.getDefaults(),arguments,["frequency","min","max"]);super(e),this.name="LFO",this._stoppedValue=0,this._units="number",this.convert=!0,this._fromType=G.prototype._fromType,this._toType=G.prototype._toType,this._is=G.prototype._is,this._clampValue=G.prototype._clampValue,this._oscillator=new me(e),this.frequency=this._oscillator.frequency,this._amplitudeGain=new J({context:this.context,gain:e.amplitude,units:"normalRange"}),this.amplitude=this._amplitudeGain.gain,this._stoppedSignal=new te({context:this.context,units:"audioRange",value:0}),this._zeros=new Nr({context:this.context}),this._a2g=new Za({context:this.context}),this._scaler=this.output=new ui({context:this.context,max:e.max,min:e.min}),this.units=e.units,this.min=e.min,this.max=e.max,this._oscillator.chain(this._amplitudeGain,this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),X(this,["amplitude","frequency"]),this.phase=e.phase}static getDefaults(){return Object.assign(me.getDefaults(),{amplitude:1,frequency:"4n",max:1,min:0,type:"sine",units:"number"})}start(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(0,e),this._oscillator.start(e),this}stop(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(this._stoppedValue,e),this._oscillator.stop(e),this}sync(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this}unsync(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this}_setStoppedValue(){this._stoppedValue=this._oscillator.getInitialValue(),this._stoppedSignal.value=this._stoppedValue}get min(){return this._toType(this._scaler.min)}set min(e){e=this._fromType(e),this._scaler.min=e}get max(){return this._toType(this._scaler.max)}set max(e){e=this._fromType(e),this._scaler.max=e}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e,this._setStoppedValue()}get partials(){return this._oscillator.partials}set partials(e){this._oscillator.partials=e,this._setStoppedValue()}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e,this._setStoppedValue()}get units(){return this._units}set units(e){const t=this.min,s=this.max;this._units=e,this.min=t,this.max=s}get state(){return this._oscillator.state}connect(e,t,s){return(e instanceof G||e instanceof te)&&(this.convert=e.convert,this.units=e.units),ni(this,e,t,s),this}dispose(){return super.dispose(),this._oscillator.dispose(),this._stoppedSignal.dispose(),this._zeros.dispose(),this._scaler.dispose(),this._a2g.dispose(),this._amplitudeGain.dispose(),this.amplitude.dispose(),this}}function Qa(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Be(r,n,e),t.set(this,r)}})}}function bt(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Be(this.toSeconds(r),n,e),t.set(this,r)}})}}class di extends Ae{constructor(){const e=P(di.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ie({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Ae.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:se,onerror:se,playbackRate:1,reverse:!1})}load(e){return ge(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=se){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,s){return super.start(e,t,s),this}_start(e,t,s){this._loop?t=fs(t,this._loopStart):t=fs(t,0);const i=this.toSeconds(t),r=s;s=fs(s,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(s);o=o/this._playbackRate,e=this.toSeconds(e);const a=new an({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&Ye(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(s=>s.stop(t))}restart(e,t,s){return super.restart(e,t,s),this}_restart(e,t,s){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,s)}seek(e,t){const s=this.toSeconds(t);if(this._state.getValueAtTime(s)==="started"){const i=this.toSeconds(e);this._stop(s),this._start(s,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&Be(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&Be(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),s=this._state.getNextState("stopped",t);s&&s.implicitEnd&&(this._state.cancel(s.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}it([bt(0)],di.prototype,"fadeIn",void 0);it([bt(0)],di.prototype,"fadeOut",void 0);class Sf extends at{constructor(){super(...arguments),this.name="GainToAudio",this._norm=new Cs({context:this.context,mapping:e=>Math.abs(e)*2-1}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class qe extends D{constructor(){const e=P(qe.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new te({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(gt(e))return e;{let s;for(s in fn)if(fn[s][t]===e)return s;return e}}_setCurve(e,t,s){if(gt(s)&&Reflect.has(fn,s)){const i=fn[s];zt(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(je(s)&&e!=="_decayCurve")this[e]=s;else throw new Error("Envelope: invalid curve: "+s)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const s=this.toSeconds(this.release);s<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,s,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,s,e):(U(je(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,s,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,s=1){return t=this.toSeconds(t),this.triggerAttack(t,s),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,s=0){return ni(this,e,t,s),this}asArray(){return ge(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,s=new ti(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:s}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield s.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}it([bt(0)],qe.prototype,"attack",void 0);it([bt(0)],qe.prototype,"decay",void 0);it([Qa(0,1)],qe.prototype,"sustain",void 0);it([bt(0)],qe.prototype,"release",void 0);const fn=(()=>{let e,t;const s=[];for(e=0;e<128;e++)s[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=d/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function h(d){const p=new Array(d.length);for(let f=0;f<d.length;f++)p[f]=1-d[f];return p}function u(d){return d.slice(0).reverse()}return{bounce:{In:h(l),Out:l},cosine:{In:s,Out:u(s)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:h(i)},sine:{In:c,Out:h(c)},step:{In:o,Out:h(o)}}})();class Et extends D{constructor(){const e=P(Et.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new Ns({context:this.context,volume:e.volume}),this.volume=this._volume.volume,X(this,"volume")}static getDefaults(){return Object.assign(D.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const s=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,s.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class et extends Et{constructor(){const e=P(et.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Et.getDefaults(),{detune:0,onsilence:se,portamento:0})}triggerAttack(e,t,s=1){this.log("triggerAttack",e,t,s);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,s),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const s=this.toSeconds(t),i=e instanceof Ue?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(s)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,s)}else this.frequency.setValueAtTime(i,s);return this}}it([bt(0)],et.prototype,"portamento",void 0);class pi extends qe{constructor(){super(P(pi.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new J({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class tt extends et{constructor(){const e=P(tt.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new Ot(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new pi(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),X(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(et.getDefaults(),{envelope:Object.assign(Ze(qe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(Ze(Ot.getDefaults(),[...Object.keys(Ae.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Pn extends et{constructor(){const e=P(Pn.getDefaults(),arguments);super(e),this.name="ModulationSynth",this._carrier=new tt({context:this.context,oscillator:e.oscillator,envelope:e.envelope,onsilence:()=>this.onsilence(this),volume:-10}),this._modulator=new tt({context:this.context,oscillator:e.modulation,envelope:e.modulationEnvelope,volume:-10}),this.oscillator=this._carrier.oscillator,this.envelope=this._carrier.envelope,this.modulation=this._modulator.oscillator,this.modulationEnvelope=this._modulator.envelope,this.frequency=new te({context:this.context,units:"frequency"}),this.detune=new te({context:this.context,value:e.detune,units:"cents"}),this.harmonicity=new yt({context:this.context,value:e.harmonicity,minValue:0}),this._modulationNode=new J({context:this.context,gain:0}),X(this,["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"])}static getDefaults(){return Object.assign(et.getDefaults(),{harmonicity:3,oscillator:Object.assign(Ze(Ot.getDefaults(),[...Object.keys(Ae.getDefaults()),"frequency","detune"]),{type:"sine"}),envelope:Object.assign(Ze(qe.getDefaults(),Object.keys(D.getDefaults())),{attack:.01,decay:.01,sustain:1,release:.5}),modulation:Object.assign(Ze(Ot.getDefaults(),[...Object.keys(Ae.getDefaults()),"frequency","detune"]),{type:"square"}),modulationEnvelope:Object.assign(Ze(qe.getDefaults(),Object.keys(D.getDefaults())),{attack:.5,decay:0,sustain:1,release:.5})})}_triggerEnvelopeAttack(e,t){this._carrier._triggerEnvelopeAttack(e,t),this._modulator._triggerEnvelopeAttack(e,t)}_triggerEnvelopeRelease(e){return this._carrier._triggerEnvelopeRelease(e),this._modulator._triggerEnvelopeRelease(e),this}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this._carrier.dispose(),this._modulator.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._modulationNode.dispose(),this}}class Fn extends D{constructor(){const e=P(Fn.getDefaults(),arguments,["frequency","type"]);super(e),this.name="BiquadFilter",this._filter=this.context.createBiquadFilter(),this.input=this.output=this._filter,this.Q=new G({context:this.context,units:"number",value:e.Q,param:this._filter.Q}),this.frequency=new G({context:this.context,units:"frequency",value:e.frequency,param:this._filter.frequency}),this.detune=new G({context:this.context,units:"cents",value:e.detune,param:this._filter.detune}),this.gain=new G({context:this.context,units:"decibels",convert:!1,value:e.gain,param:this._filter.gain}),this.type=e.type}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,type:"lowpass",frequency:350,detune:0,gain:0})}get type(){return this._filter.type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._filter.type=e}getFrequencyResponse(e=128){const t=new Float32Array(e);for(let o=0;o<e;o++){const c=Math.pow(o/e,2)*19980+20;t[o]=c}const s=new Float32Array(e),i=new Float32Array(e),r=this.context.createBiquadFilter();return r.type=this.type,r.Q.value=this.Q.value,r.frequency.value=this.frequency.value,r.gain.value=this.gain.value,r.getFrequencyResponse(t,s,i),s}dispose(){return super.dispose(),this._filter.disconnect(),this.Q.dispose(),this.frequency.dispose(),this.gain.dispose(),this.detune.dispose(),this}}class Vn extends D{constructor(){const e=P(Vn.getDefaults(),arguments,["frequency","type","rolloff"]);super(e),this.name="Filter",this.input=new J({context:this.context}),this.output=new J({context:this.context}),this._filters=[],this._filters=[],this.Q=new te({context:this.context,units:"positive",value:e.Q}),this.frequency=new te({context:this.context,units:"frequency",value:e.frequency}),this.detune=new te({context:this.context,units:"cents",value:e.detune}),this.gain=new te({context:this.context,units:"decibels",convert:!1,value:e.gain}),this._type=e.type,this.rolloff=e.rolloff,X(this,["detune","frequency","gain","Q"])}static getDefaults(){return Object.assign(D.getDefaults(),{Q:1,detune:0,frequency:350,gain:0,rolloff:-12,type:"lowpass"})}get type(){return this._type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._type=e,this._filters.forEach(s=>s.type=e)}get rolloff(){return this._rolloff}set rolloff(e){const t=mt(e)?e:parseInt(e,10),s=[-12,-24,-48,-96];let i=s.indexOf(t);U(i!==-1,`rolloff can only be ${s.join(", ")}`),i+=1,this._rolloff=t,this.input.disconnect(),this._filters.forEach(r=>r.disconnect()),this._filters=new Array(i);for(let r=0;r<i;r++){const o=new Fn({context:this.context});o.type=this._type,this.frequency.connect(o.frequency),this.detune.connect(o.detune),this.Q.connect(o.Q),this.gain.connect(o.gain),this._filters[r]=o}this._internalChannels=this._filters,Xt(this.input,...this._internalChannels,this.output)}getFrequencyResponse(e=128){const t=new Fn({context:this.context,frequency:this.frequency.value,gain:this.gain.value,Q:this.Q.value,type:this._type,detune:this.detune.value}),s=new Float32Array(e).map(()=>1);return this._filters.forEach(()=>{t.getFrequencyResponse(e).forEach((r,o)=>s[o]*=r)}),t.dispose(),s}dispose(){return super.dispose(),this._filters.forEach(e=>{e.dispose()}),mr(this,["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.detune.dispose(),this.gain.dispose(),this}}class Ln extends qe{constructor(){const e=P(Ln.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="FrequencyEnvelope",this._octaves=e.octaves,this._baseFrequency=this.toFrequency(e.baseFrequency),this._exponent=this.input=new ri({context:this.context,value:e.exponent}),this._scale=this.output=new ui({context:this.context,min:this._baseFrequency,max:this._baseFrequency*Math.pow(2,this._octaves)}),this._sig.chain(this._exponent,this._scale)}static getDefaults(){return Object.assign(qe.getDefaults(),{baseFrequency:200,exponent:1,octaves:4})}get baseFrequency(){return this._baseFrequency}set baseFrequency(e){const t=this.toFrequency(e);Be(t,0),this._baseFrequency=t,this._scale.min=this._baseFrequency,this.octaves=this._octaves}get octaves(){return this._octaves}set octaves(e){this._octaves=e,this._scale.max=this._baseFrequency*Math.pow(2,e)}get exponent(){return this._exponent.value}set exponent(e){this._exponent.value=e}dispose(){return super.dispose(),this._exponent.dispose(),this._scale.dispose(),this}}class Cr extends et{constructor(){const e=P(Cr.getDefaults(),arguments);super(e),this.name="MonoSynth",this.oscillator=new Ot(Object.assign(e.oscillator,{context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)})),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new Vn(Object.assign(e.filter,{context:this.context})),this.filterEnvelope=new Ln(Object.assign(e.filterEnvelope,{context:this.context})),this.envelope=new pi(Object.assign(e.envelope,{context:this.context})),this.oscillator.chain(this.filter,this.envelope,this.output),this.filterEnvelope.connect(this.filter.frequency),X(this,["oscillator","frequency","detune","filter","filterEnvelope","envelope"])}static getDefaults(){return Object.assign(et.getDefaults(),{envelope:Object.assign(Ze(qe.getDefaults(),Object.keys(D.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.9}),filter:Object.assign(Ze(Vn.getDefaults(),Object.keys(D.getDefaults())),{Q:1,rolloff:-12,type:"lowpass"}),filterEnvelope:Object.assign(Ze(Ln.getDefaults(),Object.keys(D.getDefaults())),{attack:.6,baseFrequency:200,decay:.2,exponent:2,octaves:3,release:2,sustain:.5}),oscillator:Object.assign(Ze(Ot.getDefaults(),Object.keys(Ae.getDefaults())),{type:"sawtooth"})})}_triggerEnvelopeAttack(e,t=1){if(this.envelope.triggerAttack(e,t),this.filterEnvelope.triggerAttack(e),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.filterEnvelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this.filterEnvelope.dispose(),this.filter.dispose(),this}}class fi extends Pn{constructor(){const e=P(fi.getDefaults(),arguments);super(e),this.name="FMSynth",this.modulationIndex=new yt({context:this.context,value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output)}static getDefaults(){return Object.assign(Pn.getDefaults(),{modulationIndex:10})}dispose(){return super.dispose(),this.modulationIndex.dispose(),this}}class mi extends tt{constructor(){const e=P(mi.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,X(this,["oscillator","envelope"])}static getDefaults(){return Wt(et.getDefaults(),tt.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const s=this.toSeconds(t),i=this.toFrequency(e instanceof Ue?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,s),this.oscillator.frequency.exponentialRampToValueAtTime(i,s+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}it([Qa(0)],mi.prototype,"octaves",void 0);it([bt(0)],mi.prototype,"pitchDecay",void 0);const Ja=new Set;function Ir(n){Ja.add(n)}function Ka(n,e){const t=`registerProcessor("${n}", ${e})`;Ja.add(t)}const kf=`
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
`;Ir(kf);const Nf=`
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
`;Ir(Nf);const Cf=`
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
`;Ir(Cf);const If="feedback-comb-filter",Of=`
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
`;Ka(If,Of);class wt extends Et{constructor(){const e=P(wt.getDefaults(),arguments,["voice","options"]);super(e),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=i=>this.releaseAll(i),U(!mt(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const s=this._voices.indexOf(this._dummyVoice);this._voices.splice(s,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(Et.getDefaults(),{maxPolyphony:32,options:{},voice:tt})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(s=>s.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return U(e instanceof et,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else Jn("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,s){e.forEach(i=>{const r=new Dn(this.context,i).toMidi(),o=this._getNextAvailableVoice();o&&(o.triggerAttack(i,t,s),this._activeVoices.push({midi:r,voice:o,released:!1}),this.log("triggerAttack",i,t))})}_triggerRelease(e,t){e.forEach(s=>{const i=new Dn(this.context,s).toMidi(),r=this._activeVoices.find(({midi:o,released:a})=>o===i&&!a);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",s,t))})}_scheduleEvent(e,t,s,i){U(!this.disposed,"Synth was already disposed"),s<=this.now()?e==="attack"?this._triggerAttack(t,s,i):this._triggerRelease(t,s):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,s,i)},s-this.now())}triggerAttack(e,t,s){Array.isArray(e)||(e=[e]);const i=this.toSeconds(t);return this._scheduleEvent("attack",e,i,s),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("release",e,s),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s);if(this.triggerAttack(e,r,i),je(t)){U(je(e),"If the duration is an array, the notes must also be an array"),e=e;for(let o=0;o<e.length;o++){const a=t[Math.min(o,t.length-1)],c=this.toSeconds(a);U(c>0,"The duration must be greater than 0"),this.triggerRelease(e[o],r+c)}}else{const o=this.toSeconds(t);U(o>0,"The duration must be greater than 0"),this.triggerRelease(e,r+o)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=Ze(e,["onsilence","context"]);return this.options=Wt(this.options,t),this._voices.forEach(s=>s.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:s})=>{s.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class ln extends Et{constructor(){const e=P(ln.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(s=>{const i=parseInt(s,10);if(U(pn(s)||mt(i)&&isFinite(i),`url key is neither a note or midi pitch: ${s}`),pn(s)){const r=new Ue(this.context,s).toMidi();t[r]=e.urls[s]}else mt(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new Tr({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Et.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:se,onerror:se,release:.1,urls:{}})}_findClosest(e){let s=0;for(;s<96;){if(this._buffers.has(e+s))return-s;if(this._buffers.has(e-s))return s;s++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,s=1){return this.log("triggerAttack",e,t,s),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=Ya(new Ue(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,h=this._buffers.get(l),u=Ga(c+a),d=new an({url:h,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:u}).connect(this.output);d.start(t,0,h.duration/u,s),je(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),f=p.indexOf(d);f!==-1&&p.splice(f,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(s=>{const i=new Ue(this.context,s).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(s=>{for(;s.length;)s.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,s,i=1){const r=this.toSeconds(s);return this.triggerAttack(e,r,i),je(t)?(U(je(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,s){if(U(pn(e)||isFinite(e),`note must be a pitch or midi: ${e}`),pn(e)){const i=new Ue(this.context,e).toMidi();this._buffers.add(i,t,s)}else this._buffers.add(e,t,s);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}it([bt(0)],ln.prototype,"attack",void 0);it([bt(0)],ln.prototype,"release",void 0);class gi extends D{constructor(){const e=P(gi.getDefaults(),arguments,["fade"]);super(e),this.name="CrossFade",this._panner=this.context.createStereoPanner(),this._split=this.context.createChannelSplitter(2),this._g2a=new Sf({context:this.context}),this.a=new J({context:this.context,gain:0}),this.b=new J({context:this.context,gain:0}),this.output=new J({context:this.context}),this._internalChannels=[this.a,this.b],this.fade=new te({context:this.context,units:"normalRange",value:e.fade}),X(this,"fade"),this.context.getConstant(1).connect(this._panner),this._panner.connect(this._split),this._panner.channelCount=1,this._panner.channelCountMode="explicit",Ke(this._split,this.a.gain,0),Ke(this._split,this.b.gain,1),this.fade.chain(this._g2a,this._panner.pan),this.a.connect(this.output),this.b.connect(this.output)}static getDefaults(){return Object.assign(D.getDefaults(),{fade:.5})}dispose(){return super.dispose(),this.a.dispose(),this.b.dispose(),this.output.dispose(),this.fade.dispose(),this._g2a.dispose(),this._panner.disconnect(),this._split.disconnect(),this}}class To extends D{constructor(e){super(e),this.name="Effect",this._dryWet=new gi({context:this.context}),this.wet=this._dryWet.fade,this.effectSend=new J({context:this.context}),this.effectReturn=new J({context:this.context}),this.input=new J({context:this.context}),this.output=this._dryWet,this.input.fan(this._dryWet.a,this.effectSend),this.effectReturn.connect(this._dryWet.b),this.wet.setValueAtTime(e.wet,0),this._internalChannels=[this.effectReturn,this.effectSend],X(this,"wet")}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}connectEffect(e){return this._internalChannels.push(e),this.effectSend.chain(e,this.effectReturn),this}dispose(){return super.dispose(),this._dryWet.dispose(),this.effectSend.dispose(),this.effectReturn.dispose(),this.wet.dispose(),this}}class Or extends D{constructor(){const e=P(Or.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new G({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",X(this,"pan")}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Ef="bit-crusher",Mf=`
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
`;Ka(Ef,Mf);class yi extends D{constructor(){const e=P(yi.getDefaults(),arguments,["channels"]);super(e),this.name="Split",this._splitter=this.input=this.output=this.context.createChannelSplitter(e.channels),this._internalChannels=[this._splitter]}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._splitter.disconnect(),this}}class hn extends D{constructor(){const e=P(hn.getDefaults(),arguments,["channels"]);super(e),this.name="Merge",this._merger=this.output=this.input=this.context.createChannelMerger(e.channels)}static getDefaults(){return Object.assign(D.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._merger.disconnect(),this}}class Ao extends D{constructor(e){super(e),this.name="StereoEffect",this.input=new J({context:this.context}),this.input.channelCount=2,this.input.channelCountMode="explicit",this._dryWet=this.output=new gi({context:this.context,fade:e.wet}),this.wet=this._dryWet.fade,this._split=new yi({context:this.context,channels:2}),this._merge=new hn({context:this.context,channels:2}),this.input.connect(this._split),this.input.connect(this._dryWet.a),this._merge.connect(this._dryWet.b),X(this,["wet"])}connectEffectLeft(...e){this._split.connect(e[0],0,0),Xt(...e),Ke(e[e.length-1],this._merge,0,0)}connectEffectRight(...e){this._split.connect(e[0],1,0),Xt(...e),Ke(e[e.length-1],this._merge,0,1)}static getDefaults(){return Object.assign(D.getDefaults(),{wet:1})}dispose(){return super.dispose(),this._dryWet.dispose(),this._split.dispose(),this._merge.dispose(),this}}class So extends Ao{constructor(e){super(e),this.feedback=new te({context:this.context,value:e.feedback,units:"normalRange"}),this._feedbackL=new J({context:this.context}),this._feedbackR=new J({context:this.context}),this._feedbackSplit=new yi({context:this.context,channels:2}),this._feedbackMerge=new hn({context:this.context,channels:2}),this._merge.connect(this._feedbackSplit),this._feedbackMerge.connect(this._split),this._feedbackSplit.connect(this._feedbackL,0,0),this._feedbackL.connect(this._feedbackMerge,0,0),this._feedbackSplit.connect(this._feedbackR,1,0),this._feedbackR.connect(this._feedbackMerge,0,1),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),X(this,["feedback"])}static getDefaults(){return Object.assign(Ao.getDefaults(),{feedback:.5})}dispose(){return super.dispose(),this.feedback.dispose(),this._feedbackL.dispose(),this._feedbackR.dispose(),this._feedbackSplit.dispose(),this._feedbackMerge.dispose(),this}}class Er extends So{constructor(){const e=P(Er.getDefaults(),arguments,["frequency","delayTime","depth"]);super(e),this.name="Chorus",this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new $n({context:this.context,frequency:e.frequency,min:0,max:1}),this._lfoR=new $n({context:this.context,frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new Mn({context:this.context}),this._delayNodeR=new Mn({context:this.context}),this.frequency=this._lfoL.frequency,X(this,["frequency"]),this._lfoL.frequency.connect(this._lfoR.frequency),this.connectEffectLeft(this._delayNodeL),this.connectEffectRight(this._delayNodeR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this.depth=this._depth,this.type=e.type,this.spread=e.spread}static getDefaults(){return Object.assign(So.getDefaults(),{frequency:1.5,delayTime:3.5,depth:.7,type:"sine",spread:180,feedback:0,wet:.5})}get depth(){return this._depth}set depth(e){this._depth=e;const t=this._delayTime*e;this._lfoL.min=Math.max(this._delayTime-t,0),this._lfoL.max=this._delayTime+t,this._lfoR.min=Math.max(this._delayTime-t,0),this._lfoR.max=this._delayTime+t}get delayTime(){return this._delayTime*1e3}set delayTime(e){this._delayTime=e/1e3,this.depth=this._depth}get type(){return this._lfoL.type}set type(e){this._lfoL.type=e,this._lfoR.type=e}get spread(){return this._lfoR.phase-this._lfoL.phase}set spread(e){this._lfoL.phase=90-e/2,this._lfoR.phase=e/2+90}start(e){return this._lfoL.start(e),this._lfoR.start(e),this}stop(e){return this._lfoL.stop(e),this._lfoR.stop(e),this}sync(){return this._lfoL.sync(),this._lfoR.sync(),this}unsync(){return this._lfoL.unsync(),this._lfoR.unsync(),this}dispose(){return super.dispose(),this._lfoL.dispose(),this._lfoR.dispose(),this._delayNodeL.dispose(),this._delayNodeR.dispose(),this.frequency.dispose(),this}}class Mr extends To{constructor(){const e=P(Mr.getDefaults(),arguments,["decay"]);super(e),this.name="Reverb",this._convolver=this.context.createConvolver(),this.ready=Promise.resolve();const t=this.toSeconds(e.decay);Be(t,.001),this._decay=t;const s=this.toSeconds(e.preDelay);Be(s,0),this._preDelay=s,this.generate(),this.connectEffect(this._convolver)}static getDefaults(){return Object.assign(To.getDefaults(),{decay:1.5,preDelay:.01})}get decay(){return this._decay}set decay(e){e=this.toSeconds(e),Be(e,.001),this._decay=e,this.generate()}get preDelay(){return this._preDelay}set preDelay(e){e=this.toSeconds(e),Be(e,0),this._preDelay=e,this.generate()}generate(){return ge(this,void 0,void 0,function*(){const e=this.ready,t=new ti(2,this._decay+this._preDelay,this.context.sampleRate),s=new Rn({context:t}),i=new Rn({context:t}),r=new hn({context:t});s.connect(r,0,0),i.connect(r,0,1);const o=new J({context:t}).toDestination();r.connect(o),s.start(0),i.start(0),o.gain.setValueAtTime(0,0),o.gain.setValueAtTime(1,this._preDelay),o.gain.exponentialApproachValueAtTime(0,this._preDelay,this.decay);const a=t.render();return this.ready=a.then(se),yield e,this._convolver.buffer=(yield a).get(),this})}dispose(){return super.dispose(),this._convolver.disconnect(),this}}class _e extends D{constructor(){const e=P(_e.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new J({context:this.context}),_e._allSolos.has(this.context)||_e._allSolos.set(this.context,new Set),_e._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(D.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),_e._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){_e._soloed.has(this.context)||_e._soloed.set(this.context,new Set),_e._soloed.get(this.context).add(this)}_removeSolo(){_e._soloed.has(this.context)&&_e._soloed.get(this.context).delete(this)}_isSoloed(){return _e._soloed.has(this.context)&&_e._soloed.get(this.context).has(this)}_noSolos(){return!_e._soloed.has(this.context)||_e._soloed.has(this.context)&&_e._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),_e._allSolos.get(this.context).delete(this),this._removeSolo(),this}}_e._allSolos=new Map;_e._soloed=new Map;class Dr extends D{constructor(){const e=P(Dr.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new Or({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Ns({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,X(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class us extends D{constructor(){const e=P(us.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new _e({solo:e.solo,context:this.context}),this._panVol=this.output=new Dr({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),X(this,["pan","volume"])}static getDefaults(){return Object.assign(D.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return us.buses.has(e)||us.buses.set(e,new J({context:this.context})),us.buses.get(e)}send(e,t=0){const s=this._getBus(e),i=new J({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(s),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}us.buses=new Map;class Rr extends D{constructor(){const e=P(Rr.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new G({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new G({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new G({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new G({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new G({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),X(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(D.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function Df(){return We().now()}We().transport;We().destination;We().destination;We().listener;We().draw;We();function Rf(){return ie.loaded()}const Pt=new Rr({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),$f=new ln({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:n=>{console.warn("Failed to load Rhodes piano sampler:",n)}}).connect(Pt),Pf=new wt(tt,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(Pt),Ff=new Mr({decay:4.5,wet:.35}).connect(Pt),Vf=new wt(tt,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(Ff),Lf=new Er({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(Pt),Bf=new wt(tt,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(Lf),Uf=new wt(Cr,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(Pt),jf=new wt(fi,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(Pt),qf=new wt(tt,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(Pt),zf=new wt(fi,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(Pt);function Wf(n){switch(n){case"organ":return Pf;case"pad-strings":return Vf;case"juno-pad":return Bf;case"stab":return Uf;case"epiano":return jf;case"guitar":return qf;case"bell":return zf;case"rhodes":default:return $f}}const $r=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"}],Pr=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}}],ec={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab"},tc={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5}},Gf={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function Yf(n){const e=ec[n]??"rhodes";return Gf[e]??"Piano"}function Hf(n){return(tc[n]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function Xf(){return Promise.race([Rf(),new Promise(n=>setTimeout(n,3e3))])}function Zf(n,e){const t=e/60;switch(n){case"1/4":return 1/t;case"1/8":return .5/t;case"1/8T":return .5/t*(2/3);case"1/16":return .25/t;case"1/32":return .125/t;default:return .25/t}}function Qf(n,e){const t=[];for(let s=0;s<e;s++)for(const i of n){const r=i.match(/^([A-G]#?)(-?\d+)$/);if(r){const o=r[1],a=parseInt(r[2],10)+s;t.push(`${o}${a}`)}else t.push(i)}return t}function Jf(n,e){const t=[...n];switch(e){case"up":return t;case"down":return[...t].reverse();case"up-down":return[...t,...[...t].reverse().slice(1,-1)];case"random":return t.sort(()=>Math.random()-.5);default:return t}}function Kf(n,e=.7,t,s="rhodes"){try{Promise.all([pf(),Xf()]).then(()=>{const i=Wf(s),r=n.length,o=r<=1?1:Math.max(.4,1/Math.sqrt(r)),a=Df();if(t&&t.arpMode&&t.arpMode!=="off"){const c=t.bpm??80,l=t.arpRate??"1/16",h=t.arpRange??1,u=t.arpMode,d=Zf(l,c),p=Qf(n,h),f=Jf(p,u),m=()=>t.minVelocity!==void 0&&t.maxVelocity!==void 0?(t.minVelocity+Math.random()*(t.maxVelocity-t.minVelocity))/127*o:o,g=t.duration?t.duration*(1+(Math.random()-.5)*.1*(t.humanVariance??0)):Math.max(.05,d*.9);f.forEach((y,w)=>{const x=t.microTiming?(Math.random()-.5)*t.microTiming*.02:0;i.triggerAttackRelease(y,g,a+w*d+x,m())});return}n.forEach((c,l)=>{let h=0,u=o,d=e;if(t){const{minVelocity:p,maxVelocity:f,spread:m,microTiming:g,humanVariance:y,duration:w}=t;u=(p+Math.random()*(f-p))/127*o;const A=l*m*.1,_=(Math.random()-.5)*g*.05,b=(Math.random()-.5)*y*.03;h=Math.max(0,A+_+b),d=w*(1+(Math.random()-.5)*.2*y)}i.triggerAttackRelease(c,d,a+h,u)})}).catch(i=>{console.warn("Audio playback gesture failed:",i)})}catch(i){console.warn("Audio playback failed:",i)}}function os(n,e,t){const s=t?.instrument?$r.find(u=>u.name===t.instrument):void 0,i=t?.playStyle?Pr.find(u=>u.name===t.playStyle):void 0,r=s?.instrument??ec[e]??"rhodes",o=tc[e]||{},a=i?.patch??{},c={...o,...a,bpm:t?.bpm??o.bpm??90},l=t?.duration??o.duration??.9,h=a.durationMultiplier?l*a.durationMultiplier:l;Kf(n,h,c,r)}const em=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],tm=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],ft={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},sm=new Set(["F","Bb","Eb","Ab","Db","Gb"]),bs=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],_i={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},nm=Object.keys(_i),im={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},ko={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},rm={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},$i={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},om=Object.keys($i),No={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Ps=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],am={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN"},cm={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR"},sc={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"]},Zt=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"}];function Fr(n){return(Zt.find(e=>e.name===n)||Zt[0]).dot}const lm={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function hm(n,e){return 1+n.degrees.filter(t=>e.includes(t)).length*.6}function Bn(n,e){const t=n.reduce((i,r)=>i+e(r),0);let s=Math.random()*t;for(const i of n)if(s-=e(i),s<=0)return i;return n[n.length-1]}function um(n){if(n.length)return n[Math.floor(Math.random()*n.length)]}const Pi=4,Qt=1,rt=8,nc=1700,dm={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function _n(n,e,t="MAJOR",s="Pop",i="Uplifting"){if(n===e)return .05;let o=(dm[n]||{})[e]??.1;return(t.includes("MINOR")||t==="DORIAN")&&(n==="TONIC"&&e==="SUBMEDIANT"&&(o*=1.5),n==="SUBMEDIANT"&&e==="MEDIANT"&&(o*=1.4),n==="MEDIANT"&&e==="SUBTONIC"&&(o*=1.4),n==="SUBTONIC"&&e==="TONIC"&&(o*=1.3)),s==="Jazz-ish"||s==="Lo-fi/Chill"?(n==="SUPERTONIC"&&e==="DOMINANT"&&(o*=1.8),n==="DOMINANT"&&e==="TONIC"&&(o*=1.5),n==="TONIC"&&e==="SUPERTONIC"&&(o*=1.4)):(s==="House/Dance"||s==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(o*=1.5),(sc[i]||[]).includes(e)&&(o*=1.5),Math.max(.01,o)}function pm(n,e,t,s,i,r,o=Pi){let a="TONIC";(n.type.includes("MINOR")||n.type==="DORIAN")&&(r==="Melancholy"||r==="Nostalgic")&&Math.random()<.4&&(a=t.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const c=[a];let l=a;for(let h=1;h<o;h++){const u=h===o-1;let d=t.filter(m=>n.degrees[m]);d.length||(d=t);const p=d.filter(m=>m!==l),f=p.length?p:d;if(u){const m=Bn(f,g=>{const y=_n(g,c[0],n.type,i,r),w=_n(l,g,n.type,i,r);return y*w});c.push(m)}else{const m=f.filter(w=>!c.includes(w)),g=m.length?m:f,y=Bn(g,w=>_n(l,w,n.type,i,r));l=y,c.push(y)}}return c}function qs(n,e){const t=(n%12+12)%12;return e?tm[t]:em[t]}function Vr(n){const e=n[0]?.toUpperCase();let t="C",s=n;e&&/[A-G]/.test(e)&&(n[1]==="B"?(t=`${e}b`,s=n.slice(2)):n[1]==="#"?(t=`${e}#`,s=n.slice(2)):(t=e,s=n.slice(1))),s=s.toLowerCase();let i="maj";return s.includes("maj7")?i="maj7":s.includes("min7")||s.includes("m7")?i="min7":s.includes("dim7")?i="dim7":s.includes("dim")?i="dim":s.includes("aug")?i="aug":s.includes("sus")?i="sus4":s==="7"?i="dom7":s.includes("min")||s==="m"?i="min":i="maj",{root:t,quality:i}}function fm(n,e){const{root:t,quality:s}=Vr(n),i=ft[t]??0;return _i[s].map(o=>qs(i+o,e))}async function mm(){let n=await fetch("./chroma_chords_data.json");if(n.ok||(n=await fetch("./chord_voyager_data.json")),!n.ok)throw new Error(`HTTP error: ${n.status}`);const e=await n.json();return wm(e),e}const gm={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},ym={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},_m={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},vm={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},xm={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},bm={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function wm(n){const e=[["MIXOLYDIAN",gm],["DORIAN",ym],["LYDIAN",_m]];for(const[t,s]of e)for(const[i,r]of Object.entries(s)){const o=n.scales[`${r}_MAJOR`];if(!o)continue;const a=`${i}_${t}`,c={};for(const l of bm[t]){const h=xm[`${t}_${l}`],u=o.degrees[h];if(!u)continue;const d=JSON.parse(JSON.stringify(u));d.next_chord_options=(d.next_chord_options||[]).map(p=>{if(p.nodeId.startsWith(`${r}_MAJOR_`)){const f=p.nodeId.replace(`${r}_MAJOR_`,""),m=vm[`${t}_${f}`];if(m)return{name:p.name,nodeId:`${i}_${t}_${m}`}}return p}),c[l]=d}n.scales[a]={root:i,type:t,degrees:c}}}const Tm=[156,192,236],Am=[242,115,95];function vn(n,e,t){return n+(e-n)*t}function Lr(n){const e=Math.max(0,Math.min(1,n));return"#"+Tm.map((s,i)=>Math.round(vn(s,Am[i],e))).map(s=>s.toString(16).padStart(2,"0")).join("")}function Un(n){const e=Math.max(0,Math.min(1,n));return{size:Math.round(vn(84,128,e)),radius:Math.round(vn(40,12,e)),fontSize:Math.round(vn(21,30,e)),color:Lr(e)}}function Sm(n,e,t){return{Tonic:`As the tonic, ${t} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${t} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${t} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${t} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${t} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${t} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${t} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${t} drifts just below home, a soft modal step rather than a hard pull.`}[n]||`${t} colors the progression as the ${n.toLowerCase()} of ${e}.`}function ds(n,e,t,s){const r=t.degrees[e].chord_name,o=rm[e]??.5,a=$i[t.type]||$i.MAJOR;return{name:Co(r),tag:im[e]||"move",roman:a[e]||"?",color:Lr(o),functionLabel:ko[e]||e,notes:fm(r,s),scaleLabel:`${t.root} ${No[t.type]||t.type}`,desc:Sm(ko[e]||e,No[t.type]||t.type,Co(r)),degree:e,scaleKey:n,tension:o}}function Co(n){const{root:e,quality:t}=Vr(n);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[t]??""}`}const km={Pop:100,Rock:118,Gospel:84,"Indie/Folk":92,"Lo-fi/Chill":76,"Jazz-ish":96,"R&B/Soul":88,"House/Dance":124,Synthwave:108,Cinematic:72};function ic(n,e){let t=km[n]||92;return e==="Tense"&&(t+=6),(e==="Dreamy"||e==="Melancholy")&&(t-=6),t}function Io(n,e,t,s){const i=Math.max(Qt,Math.min(rt,s?.length??Pi)),r=am[e]||"MAJOR",o=cm[t],a=s?.scaleType||(o&&r==="MAJOR"?o:r);let c=s?.key&&bs.includes(s.key)?s.key:um(bs),l=`${c}_${a}`;n.scales[l]||(c="C",l=`${c}_${a}`);const h=n.scales[l],u=zs(c,a),d=Object.keys(h.degrees),p=sc[t]||[],f=lm[a]||[],m=i===Pi?f.filter(x=>x.degrees.every(A=>d.includes(A))):[],w=(m.length&&Math.random()<.25?Bn(m,x=>hm(x,p)).degrees:pm(h,l,d,p,e,t,i)).map(x=>ds(l,x,h,u));return{genre:e,mood:t,key:c,scaleType:a,bpm:ic(e,t),chords:w}}function Nm(n,e,t,s,i,r){const o=`${e}_${t}`,a=n.scales[o];if(!a||!s.length)return null;const c=zs(e,t),l=ft[e]??0,h={};Object.entries(a.degrees).forEach(([d,p])=>{const{root:f}=Vr(p.chord_name),m=ft[f]??0;m in h||(h[m]=d)});const u=s.slice(0,rt).map(({root:d,quality:p})=>{const f=ft[d]??l,m=h[f];if(m)return ds(o,m,a,c);const g=(f-l+12)%12,y=_i[p]?p:"maj";return Fi(e,g,y,"Borrowed","?","drift",c)});return u.length<Qt?null:{genre:i,mood:r,key:e,scaleType:t,bpm:ic(i,r),chords:u}}function Ti(n,e,t,s,i,r,o){const a=n.filter(h=>e.includes(h)),c=a.filter(h=>h!==t),l=c.length?c:a;if(l.length)return Bn(l,h=>_n(s,h,i,r,o))}const Cm={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function Fi(n,e,t,s,i,r,o){const a=(ft[n]??0)+e,l=`${qs(a,o)}${Cm[t]}`,h=_i[t].map(d=>qs(a+d,o)),u=.3;return{name:l,tag:r,roman:i,color:Lr(u),functionLabel:s,notes:h,scaleLabel:"Borrowed",desc:`${l} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:u}}function Vi(n){const e=n.match(/^[A-Ga-g][#b]?/),t=e?e[0]:"C";return t[0].toUpperCase()+t.slice(1)}const Oo={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function Li(n,e,t,s){const i=ft[n]??0;let r=Oo[e]||Oo.Major;return t==="6th"?r=[...r,9]:t==="7th (dom / m7)"?r=[...r,10]:t==="Major 7th (M7)"?r=[...r,11]:t==="9th"&&(r=[...r,10,14]),r.map(o=>qs(i+o,s))}const Im={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},Om={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function Em(n,e,t){return e==="Minor"&&t==="Major 7th (M7)"?`${n}m(maj7)`:`${n}${Im[e]??""}${Om[t]??""}`}const rc=["C","D","E","F","G","A","B"],Br=10,jn=rc.indexOf("E")+4*7,Mm=jn+4*2,Bi=20,oc=Bi+4*Br,Dm={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},Rm={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},ac={};bs.forEach(n=>{ac[ft[n]]=n});function cc(n,e){const t=Rm[e]??0,i=(((ft[n]??0)-t)%12+12)%12;return ac[i]??"C"}function lc(n,e){return Dm[cc(n,e)]??[]}function zs(n,e){const t=cc(n,e);return sm.has(t)||t.includes("b")}function Ai(n,e){return qs(ft[n]??0,zs(n,e))}const Eo={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function $m(n){let e=4,t=-1;return n.map(s=>{const i=rc.indexOf(s[0].toUpperCase());return t!==-1&&i<=t&&e++,t=i,i+e*7})}function Bt(n){return oc-(n-jn)*(Br/2)}const Ms=10,Si=46,Mo=26,Do=14;function Pm(n,e,t){const s=lc(e,t),i=8,r=s.length?s.length*i+6:0,o=s.map(w=>Eo[w]),a=n.map(w=>$m(w.notes)),c=a.flat(),l=Math.min(Bi,...c.map(Bt),...o.map(Bt)),h=Math.max(oc,...c.map(Bt),...o.map(Bt)),u=Ms+Do-l,d=h-l+12+Ms+Do,p=[0,1,2,3,4].map(w=>Bi+w*Br+u),f=Ms+Mo+r,m=s.map((w,x)=>({x:Ms+Mo+x*i,y:Bt(Eo[w])+u,sign:w.includes("#")?"sharp":"flat"})),g=n.map((w,x)=>{const A=f+x*Si+Si/2,_=a[x],b=_.map(S=>({x:A,y:Bt(S)+u})),T=[];_.forEach(S=>{(S-jn)%2===0&&(S<jn||S>Mm)&&T.push({x:A-9,y:Bt(S)+u})});const C=Math.min(...b.map(S=>S.y))-10;return{cx:A,name:w.name,roman:w.roman,notes:b,ledgers:T,labelY:C}});return{width:f+n.length*Si+Ms,height:d,lines:p,keySignature:m,chords:g}}function Fm(n,e,t){const s=Vi(n.name),i=s.includes("b");return{...n,name:Em(s,e,t),notes:Li(s,e,t,i)}}function Vm(n,e,t){const s=e.chords[t],i=n.scales[s.scaleKey],r=Object.keys(i.degrees),o=zs(e.key,e.scaleType),a=[],c=(t-1+e.chords.length)%e.chords.length,l=e.chords[c]?.degree||"TONIC",h=e.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",u=`${e.key}_${h}`,d=n.scales[u],p=zs(e.key,h),f=h==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(d){const x=Ti(f,Object.keys(d.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(x){const A=ds(u,x,d,p);a.push({label:"Darker",sub:"heavier, more shadow",chord:A,functionCaption:`Borrowed · ${A.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${h==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const x=h==="NATURAL_MINOR"?Fi(e.key,8,"maj","Submediant","bVI","hold",p):Fi(e.key,5,"maj","Subdominant","IV","lift",p);a.push({label:"Darker",sub:"heavier, more shadow",chord:x,functionCaption:`Borrowed · ${x.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let m=s.scaleKey,g=i;if(e.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const x=`${e.key}_HARMONIC_MINOR`,A=n.scales[x];A?.degrees.DOMINANT&&(m=x,g=A)}const y=Ti(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(g.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(y){const x=ds(m,y,g,o);a.push({label:"More tension",sub:"sharper pull forward",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:`Aimed at the ${x.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const w=Ti(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree,l,e.scaleType,e.genre,e.mood);if(w){const x=ds(s.scaleKey,w,i,o);a.push({label:"Dreamier",sub:"softer, more air",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const x=ds(s.scaleKey,"TONIC",i,o);a.push({label:"Resolve home",sub:"settles back to center",chord:x,functionCaption:`${x.functionLabel} · ${x.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const Lm={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},Bm={m8:43303,circuit:43302};function Um(n,e){let t=Lm[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(t=`http://localhost:${Bm[e]}/`);const s=n.chords.map(i=>encodeURIComponent(i.name)).join("+");return`${t}?p=${s}`}const jm=Zt.map(n=>n.name);function qm(n,e){const t=n.length+1,s=e.length+1,i=Array.from({length:t},()=>new Array(s).fill(0));for(let r=0;r<t;r++)i[r][0]=r;for(let r=0;r<s;r++)i[0][r]=r;for(let r=1;r<t;r++)for(let o=1;o<s;o++)i[r][o]=n[r-1]===e[o-1]?i[r-1][o-1]:1+Math.min(i[r-1][o-1],i[r-1][o],i[r][o-1]);return i[t-1][s-1]}function ps(n,e){if(typeof n!="string")return null;const t=n.trim();if(!t)return null;const s=t.toLowerCase(),i=e.find(c=>c.toLowerCase()===s);if(i)return i;let r=null,o=1/0;for(const c of e){const l=qm(s,c.toLowerCase());l<o&&(o=l,r=c)}const a=Math.max(2,Math.floor(s.length*.4));return o<=a?r:null}function zm(n){if(!Array.isArray(n))return;const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t,i=ps(s.root,bs),r=ps(s.quality,nm);i&&r&&e.push({root:i,quality:r})}if(e.length)return e.slice(0,rt)}function Wm(n,e){const t=n&&typeof n=="object"?n:{},s=ps(t.genre,Ps)??e.genre,i=ps(t.mood,jm)??e.mood,r=ps(t.key,bs)??void 0,o=ps(t.scaleType,om)??void 0,a=r&&o?zm(t.chords):void 0;let c;return typeof t.length=="number"&&Number.isFinite(t.length)&&(c=Math.max(Qt,Math.min(rt,Math.round(t.length)))),{genre:s,mood:i,key:r,scaleType:o,length:c,chords:a}}const Gm={genre:Ps[0],mood:Zt[0].name},Ym="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Hm=12e3,Xm={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"]},Zm={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"]};function Ro(n,e){const t=n.toLowerCase();let s=null,i=0;return Object.keys(e).forEach(r=>{const o=e[r].reduce((a,c)=>a+(t.includes(c)?1:0),0);o>i&&(i=o,s=r)}),s}function Ui(n){const e=Ro(n,Zm),t=Ro(n,Xm);return!e||!t?null:{genre:e,mood:t}}async function Qm(n){const e=new AbortController,t=setTimeout(()=>e.abort(),Hm);try{const s=await fetch(Ym,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:n}),signal:e.signal}),i=await s.json().catch(()=>null);if(!s.ok||i&&typeof i=="object"&&"error"in i){const r=i&&typeof i=="object"&&"error"in i?String(i.error):`HTTP ${s.status}`;throw new Error(`Classifier request failed: ${r}`)}return i}finally{clearTimeout(t)}}async function Jm(n){const e=Ui(n);try{const t=await Qm(n);return Wm(t,e??Gm)}catch(t){return console.warn("LLM classification failed, falling back to keyword heuristic:",t),e}}var Km=Object.defineProperty,eg=Object.getOwnPropertyDescriptor,Ur=(n,e,t,s)=>{for(var i=s>1?void 0:s?eg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Km(e,t,i),i};const ji=["bean","bird","cat","note"];function Ws(n=.45){return{show:Math.random()<n,kind:ji[Math.floor(Math.random()*ji.length)]}}function Gs(n){return n[Math.floor(Math.random()*n.length)]}class jr{constructor(e=7,t=1800){this.threshold=e,this.windowMs=t,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const tg={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Ys=class extends Ge{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(n){if(n.has("kind")||n.has("scale")){const{width:e,height:t}=tg[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${t*this.scale}px`}}renderBean(){const n="#D98A54";return M`
      <div class="root" style="width:92px;">
        <div class="note-emoji" style="font-size:13px;">♪</div>
        <div class="arm-rest" style="background:transparent;">
          <div class="arm-rest-fore" style="background:${n};"></div>
          <div class="arm-rest-hand" style="background:${n};"></div>
        </div>
        <div class="arm-hang">
          <div class="arm-hang-inner" style="background:${n};"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.94;background:${n};">
          <div class="ear l" style="background:${n};"></div>
          <div class="ear r" style="background:${n};"></div>
          <div class="face"></div>
          <div class="eye l"></div>
          <div class="eye r"></div>
          <div class="cheek l"></div>
          <div class="cheek r"></div>
          <div class="smile"></div>
          <div class="foot l" style="background:${n};"></div>
          <div class="foot r" style="background:${n};"></div>
        </div>
      </div>
    `}renderBird(){const n="#7C93A8",e="#E8A24A";return M`
      <div class="root" style="width:88px;">
        <div class="note-emoji" style="font-size:12px; left:8%; top:-6%;">♪</div>
        <div style="position:absolute; left:-8%; top:22%; width:46%; height:30%; background:${n}; border-radius:50% 60% 60% 50%; transform-origin:100% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite;"></div>
        <div style="position:absolute; right:-8%; top:22%; width:46%; height:30%; background:${n}; border-radius:60% 50% 50% 60%; transform-origin:0% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite 0.2s;"></div>
        <div class="body" style="aspect-ratio:1/1; background:${n}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:50%; top:-20%; width:3px; height:26%; background:#5F7286; transform-origin:50% 100%; animation: mascot-tuft-bob 2.3s ease-in-out infinite;"></div>
          <div style="position:absolute; left:50%; top:42%; transform:translate(-50%,-50%); width:60%; height:42%; background:#F3EDE0; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:40%; background:#2B2420;"></div>
          <div class="eye r" style="top:40%; background:#2B2420;"></div>
          <div style="position:absolute; left:50%; top:54%; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:10px solid ${e};"></div>
          <div class="foot l" style="bottom:-6%; height:14%; background:${e};"></div>
          <div class="foot r" style="bottom:-6%; height:14%; background:${e};"></div>
        </div>
      </div>
    `}renderCat(){const n="#8FA888";return M`
      <div class="root" style="width:90px;">
        <div style="position:absolute; left:55%; top:30%; width:30%; height:8%; background:${n}; border-radius:30px; transform-origin:0% 50%; animation: mascot-tail-wag 2.2s ease-in-out infinite;"></div>
        <div class="body" style="aspect-ratio:1/0.98; background:${n}; border-radius:46% 46% 44% 44%;">
          <div style="position:absolute; left:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${n}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite;"></div>
          <div style="position:absolute; right:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${n}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite 0.15s reverse;"></div>
          <div style="position:absolute; left:50%; top:48%; transform:translate(-50%,-50%); width:56%; height:38%; background:#F3EEE1; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:44%; background:#2B2420;"></div>
          <div class="eye r" style="top:44%; background:#2B2420;"></div>
          <div style="position:absolute; left:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:100% 50%; animation: mascot-whisker 3s ease-in-out infinite;"></div>
          <div style="position:absolute; right:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:0% 50%; animation: mascot-whisker 3s ease-in-out infinite 0.3s;"></div>
          <div class="smile" style="top:66%; width:16%;"></div>
          <div class="foot l" style="height:16%; background:${n};"></div>
          <div class="foot r" style="height:16%; background:${n};"></div>
        </div>
      </div>
    `}renderNote(){const n="#B7A6DE",e="#8672B0";return M`
      <div class="root" style="width:74px;">
        <div style="position:absolute; right:6%; top:-46%; width:5px; height:62%; background:${e}; transform-origin:50% 100%; animation: mascot-stem-sway 2.6s ease-in-out infinite;">
          <div style="position:absolute; top:-6px; left:4px; width:16px; height:20px; background:${e}; border-radius:0 60% 40% 60%; transform-origin:0% 100%; animation: mascot-flag-flutter 2.6s ease-in-out infinite;"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.9; background:${n}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:4%; top:32%; width:22%; height:26%; transform-origin:100% 50%; animation: mascot-arm-rest 2.6s ease-in-out infinite;"><div style="width:100%; height:30%; background:${n}; border-radius:30px;"></div></div>
          <div style="position:absolute; right:4%; top:32%; width:22%; height:26%; transform-origin:0% 50%; animation: mascot-arm-hang 2.6s ease-in-out infinite 0.2s;"><div style="width:100%; height:30%; background:${n}; border-radius:30px;"></div></div>
          <div style="position:absolute; left:50%; top:40%; transform:translate(-50%,-50%); width:58%; height:40%; background:#F3EFF9; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:38%;"></div>
          <div class="eye r" style="top:38%;"></div>
          <div class="smile" style="top:54%; width:18%;"></div>
          <div class="foot l" style="height:15%; background:${e};"></div>
          <div class="foot r" style="height:15%; background:${e};"></div>
        </div>
      </div>
    `}render(){const n=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return n?M`<div style="transform:scale(${this.scale}); transform-origin:top left;">${n}</div>`:ve}};Ys.styles=Mt`
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
  `;Ur([Q({type:String})],Ys.prototype,"kind",2);Ur([Q({type:Number})],Ys.prototype,"scale",2);Ys=Ur([Dt("mascot-character")],Ys);var sg=Object.defineProperty,ng=Object.getOwnPropertyDescriptor,qr=(n,e,t,s)=>{for(var i=s>1?void 0:s?ng(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&sg(e,t,i),i};const qi=3200;let Hs=class extends Ge{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(n){n.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},qi))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?M`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${ji.map(n=>M`<mascot-character .kind=${n} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:ve}};Hs.styles=Mt`
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
      animation: egg-pop ${qi}ms ease forwards;
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
      animation: egg-caption-pop ${qi}ms ease forwards;
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
  `;qr([Q({type:Number})],Hs.prototype,"trigger",2);qr([R()],Hs.prototype,"visible",2);Hs=qr([Dt("mascot-parade")],Hs);var ig=Object.defineProperty,rg=Object.getOwnPropertyDescriptor,Ie=(n,e,t,s)=>{for(var i=s>1?void 0:s?rg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&ig(e,t,i),i};const og=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],ag=500,cg=["#F2A79B","#9CC0EC","#F6D98B"],lg=[6,3,12],$o=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],hg=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],ug=["Warm","Melancholy","Nostalgic","Dreamy"],Po=["Drew a total blank on that one — good thing there's a picker right below.","That one stumped us completely. The genre & mood dials still work great, though.","Our ears just short-circuited. Manual mode has never let anyone down.","No idea, honestly — but you clearly do. Pick a genre & mood below."];let Se=class extends Ge{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=Ws(.35),this.mascotSlot=Gs(og),this.peekMascot=Ws(.18),this.peekSide=Gs(["left","right"]),this.eggCounter=new jr,this.paradeTrigger=0,this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%$o.length},2800)}disconnectedCallback(){super.disconnectedCallback(),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce)}selectGenre(n){this.dispatchEvent(new CustomEvent("genre-change",{detail:n,bubbles:!0,composed:!0}))}selectMood(n){this.dispatchEvent(new CustomEvent("mood-change",{detail:n,bubbles:!0,composed:!0}))}generate(){this.dispatchEvent(new CustomEvent("generate",{bubbles:!0,composed:!0}))}setLength(n){this.dispatchEvent(new CustomEvent("length-change",{detail:n,bubbles:!0,composed:!0}))}decLength(){this.length>Qt&&this.setLength(this.length-1)}incLength(){this.length<rt&&this.setLength(this.length+1)}onFreeTextChange(n){this.freeText=n.target.value,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.scheduleClassify();const e=this.freeText.trim();if(e.length>2){const t=Ui(e);t&&this.applyBest(t)}}scheduleClassify(){this.classifyDebounce&&clearTimeout(this.classifyDebounce);const n=this.freeText.trim();if(n.length<=2)return;const e=++this.classifyToken;this.classifyDebounce=setTimeout(async()=>{const t=await Jm(n);e===this.classifyToken&&(this.llmSuggestion=t,this.llmResolved=!0,this.classifyError=t?null:Po[Math.floor(Math.random()*Po.length)],t&&this.applyBest(t))},ag)}applyBest(n){this.selectGenre(n.genre),this.selectMood(n.mood),n.length&&this.setLength(n.length),this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:n,bubbles:!0,composed:!0}))}render(){const n=Fr(this.mood);let e=hg.filter(u=>Ps.includes(u));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const t=Ps.filter(u=>!e.includes(u)),s=this.expandedGenre?e.concat(t):e,i=Zt.map(u=>u.name);let r=ug.filter(u=>i.includes(u));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const o=i.filter(u=>!r.includes(u)),c=(this.expandedMood?r.concat(o):r).map(u=>Zt.find(d=>d.name===u)),l=this.freeText.trim();let h=null;return l.length>2&&(h=this.llmResolved?this.llmSuggestion:Ui(l)),M`
      <div class="frame">
        ${this.mascot.show?M`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${.75}></mascot-character>
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
            <svg class="float-shape a" width="34" height="34" viewBox="0 0 38 38"><circle cx="19" cy="19" r="17" fill="#F6D98B" /></svg>
            <svg class="float-shape b" width="26" height="26" viewBox="0 0 30 30"><rect x="2" y="2" width="26" height="26" rx="9" fill="#9CC0EC" /></svg>

            <h1>Describe a vibe,<br />hear it as chords.</h1>
            <div class="subcopy">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show?M`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div class="vibe-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-label)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
              </svg>
              <input
                type="text"
                class="vibe-input"
                .value=${this.freeText}
                @input=${u=>this.onFreeTextChange(u)}
                placeholder=${$o[this.placeholderIdx]}
              />
            </div>
          </div>
          ${h?M`
            <div class="suggestion-wrap">
              <div class="suggestion-note">Sounds like <span class="suggestion-highlight" style="color:${n}">${h.genre} · ${h.mood}</span> — the picks below already match.</div>
            </div>
          `:this.classifyError?M`
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
            ${s.map(u=>{const d=Ps.indexOf(u);return M`
                <div class="pill ${u===this.genre?"selected":""}" style=${u===this.genre?`background:${n}`:""} @click=${()=>this.selectGenre(u)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${lg[d%3]} fill=${cg[d%3]} />
                    </svg>
                  </div>
                  ${u}
                </div>
              `})}
            ${t.length?M`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${t.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${c.map(u=>M`
              <div class="pill mood-pill ${u.name===this.mood?"selected":""}" style=${u.name===this.mood?`background:${u.dot}`:""} @click=${()=>this.selectMood(u.name)}>
                <div class="mood-badge" style="background:${u.name===this.mood?"rgba(46,39,31,0.1)":u.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${u.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${u.iconPath} />
                  </svg>
                </div>
                ${u.name}
              </div>
            `)}
            ${o.length?M`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${o.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=Qt?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:rt},(u,d)=>M`
                <div class="length-segment ${d<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=rt?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button class="cta" style="background:${n}" @click=${this.generate}>
            ${h?"Let's go to your progression":"Generate loop"} <span>→</span>
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
      </div>
    `}};Se.styles=Mt`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
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
    .float-shape {
      position: absolute;
      pointer-events: none;
    }
    .float-shape.a {
      top: -22px;
      left: 4px;
      animation: cv-float-1 7s ease-in-out infinite;
    }
    .float-shape.b {
      bottom: -26px;
      right: -18px;
      animation: cv-float-2 6.5s ease-in-out infinite;
    }
    @keyframes cv-float-1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, -14px) rotate(4deg); }
    }
    @keyframes cv-float-2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(10px, -8px) rotate(-5deg); }
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
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
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
      color: rgba(46, 39, 31, 0.34);
      opacity: 1;
      transition: color 0.3s ease;
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
    }
    .suggestion-note.error {
      font-style: italic;
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
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease), color 150ms var(--cv-ease);
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
  `;Ie([Q({type:String})],Se.prototype,"genre",2);Ie([Q({type:String})],Se.prototype,"mood",2);Ie([Q({type:Number})],Se.prototype,"length",2);Ie([R()],Se.prototype,"freeText",2);Ie([R()],Se.prototype,"placeholderIdx",2);Ie([R()],Se.prototype,"llmSuggestion",2);Ie([R()],Se.prototype,"llmResolved",2);Ie([R()],Se.prototype,"classifyError",2);Ie([R()],Se.prototype,"expandedGenre",2);Ie([R()],Se.prototype,"expandedMood",2);Ie([R()],Se.prototype,"mascot",2);Ie([R()],Se.prototype,"mascotSlot",2);Ie([R()],Se.prototype,"peekMascot",2);Ie([R()],Se.prototype,"peekSide",2);Ie([R()],Se.prototype,"paradeTrigger",2);Se=Ie([Dt("seed-screen")],Se);var dg=Object.defineProperty,pg=Object.getOwnPropertyDescriptor,Ne=(n,e,t,s)=>{for(var i=s>1?void 0:s?pg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&dg(e,t,i),i};const fg=["C","D","E","F","G","A","B"],mg=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],gg=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],yg=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}];let we=class extends Ge{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=0,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.voicingOpen=!1,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=n=>{n.preventDefault(),this.dragStartY=n.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=n=>{this.dragging&&(this.dragY=Math.max(0,n.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const n=Math.max(1,performance.now()-this.dragStartTime),e=this.dragY/n,t=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>t*.3||e>.6;this.snapping=!0,s?(this.dragY=t+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(n){n.target===n.currentTarget&&this.close()}toggleVoicing(){this.voicingOpen=!this.voicingOpen}toggleTheory(){this.emit("theory-toggle")}setQuality(n){this.quality=n,this.previewVoicing(),this.commitVoicing()}setExtension(n){this.extension=n,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const n=Vi(this.chord.name),e=n.includes("b"),t=Li(n,this.quality,this.extension,e);this.emit("voicing-preview",t)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(n){n.has("resetKey")&&(this.voicingOpen=!1,this.quality="Major",this.extension="None")}render(){const n=this.chord,e=Vi(n.name),t=e.includes("b"),s=this.mode==="voicing"||this.voicingOpen,i=s?Li(e,this.quality,this.extension,t):n.notes,r=Un(n.tension),o=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return M`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${o} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div>
            ${this.mode==="voicing"?M`
              <div class="step-label">Chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Adjust the voicing.</div>
            `:M`
              <div class="step-label">Swap chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Choose the feeling<br />you want instead.</div>
            `}
          </div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>

        <div class="sheet-body">
        ${this.mode==="swap"?M`
          <div class="theory-toggle-row" @click=${this.toggleTheory}>
            <div class="theory-track ${this.showTheory?"on":""}"><div class="theory-knob ${this.showTheory?"on":""}"></div></div>
            <div class="theory-label">Show music theory</div>
          </div>
        `:""}

        <div class="current-row">
          <div class="alt-shape" style="width:${Math.round(r.size*.5)}px;height:${Math.round(r.size*.5)}px;border-radius:${Math.round(r.radius*.5)}px;background:${r.color};"></div>
          <div>
            <div class="current-label">${this.mode==="voicing"?n.functionLabel:"Currently"}</div>
            <div class="current-name">${this.mode==="voicing"?n.name:M`${n.name} — ${n.functionLabel}`}</div>
          </div>
        </div>

        ${this.mode==="swap"?M`
          <div class="alt-list">
            ${this.alternatives.map(a=>{const c=Un(a.chord.tension),l=Math.round(c.size*.4);return M`
                <div class="alt-row" @click=${()=>this.emit("select-alternative",a)}>
                  <div class="alt-shape" style="width:${l}px;height:${l}px;border-radius:${Math.round(c.radius*(l/c.size))}px;background:${c.color};"></div>
                  <div style="flex:1;min-width:0;">
                    <div class="alt-name">${a.label}</div>
                    <div class="alt-sub">${a.sub}</div>
                    ${this.showTheory?M`
                      <div class="alt-tag">${a.functionCaption}</div>
                      <div class="alt-desc">${a.rationale}</div>
                    `:""}
                  </div>
                  <div class="alt-arrow">→</div>
                </div>
              `})}
          </div>
        `:""}

        ${this.mode==="voicing"||this.showTheory?M`
          <div class="voicing-section">
            ${this.mode==="swap"?M`
              <div class="voicing-toggle" @click=${this.toggleVoicing}>
                <div class="voicing-chevron ${this.voicingOpen?"open":""}">›</div>
                <div class="voicing-label">Adjust voicing</div>
              </div>
            `:""}
            ${s?M`
              <div>
                <div class="bento">
                  ${gg.map(a=>M`
                    <div class="bento-card" style=${a.label===this.quality?`background:${this.moodColor}`:""} @click=${()=>this.setQuality(a.label)}>
                      <div class="bento-label">${a.label}</div>
                      <div class="bento-sub">${a.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="bento ext">
                  ${yg.map((a,c)=>M`
                    <div class="bento-card ${c===0?"span":""}" style=${a.label===this.extension?`background:${this.moodColor}`:""} @click=${()=>this.setExtension(a.label)}>
                      <div class="bento-label">${a.label}</div>
                      <div class="bento-sub">${a.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
                <div class="keyboard">
                  ${fg.map(a=>M`
                    <div class="white-key ${i.includes(a)?"active":""}" style=${i.includes(a)?`background:${this.moodColor}`:""}>${a}</div>
                  `)}
                  ${mg.map(a=>M`
                    <div class="black-key" style="left:${a.left};${i.includes(a.note)||i.includes(a.flat)?`background:${this.moodColor}`:""}"></div>
                  `)}
                </div>
              </div>
            `:""}
          </div>
        `:""}
        </div>
      </div>
    `}};we.styles=Mt`
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
    .theory-toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .theory-track {
      width: 38px;
      height: 22px;
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
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--cv-cream);
      position: absolute;
      top: 3px;
      left: 3px;
      transition: left 150ms var(--cv-ease);
    }
    .theory-knob.on {
      left: 19px;
    }
    .theory-label {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-ink-muted);
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
    .voicing-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .voicing-chevron {
      font-size: 11px;
      color: var(--cv-label);
      transition: transform 0.2s ease;
      display: inline-block;
    }
    .voicing-chevron.open {
      transform: rotate(90deg);
    }
    .voicing-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted);
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
  `;Ne([Q({type:Object})],we.prototype,"chord",2);Ne([Q({type:Array})],we.prototype,"alternatives",2);Ne([Q({type:Boolean})],we.prototype,"showTheory",2);Ne([Q({type:String})],we.prototype,"moodColor",2);Ne([Q({type:Number})],we.prototype,"position",2);Ne([Q({type:Number})],we.prototype,"total",2);Ne([Q({type:String})],we.prototype,"mode",2);Ne([Q({type:Boolean})],we.prototype,"visible",2);Ne([Q({type:Number})],we.prototype,"resetKey",2);Ne([R()],we.prototype,"voicingOpen",2);Ne([R()],we.prototype,"quality",2);Ne([R()],we.prototype,"extension",2);Ne([R()],we.prototype,"dragY",2);Ne([R()],we.prototype,"dragging",2);Ne([R()],we.prototype,"snapping",2);Ne([Lc(".sheet")],we.prototype,"sheetEl",2);we=Ne([Dt("swap-sheet")],we);var _g=Object.defineProperty,vg=Object.getOwnPropertyDescriptor,hc=(n,e,t,s)=>{for(var i=s>1?void 0:s?vg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&_g(e,t,i),i};const xg=St`
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
`,bg=St`
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
`,wg=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:xg},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:bg}];let qn=class extends Ge{constructor(){super(...arguments),this.visible=!1}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}render(){return M`
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
          ${wg.map(n=>M`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",n)}>
              ${n.svg}
              <div class="dest-name">${n.name}</div>
              <div class="dest-desc">${n.desc}</div>
            </div>
          `)}
        </div>
      </div>
    `}};qn.styles=Mt`
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
  `;hc([Q({type:Boolean})],qn.prototype,"visible",2);qn=hc([Dt("share-modal")],qn);var Tg=Object.defineProperty,Ag=Object.getOwnPropertyDescriptor,ee=(n,e,t,s)=>{for(var i=s>1?void 0:s?Ag(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Tg(e,t,i),i};const Sg=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],kg=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance"],Ng=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],Fo=220,Cg=280,Vo={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let Z=class extends Ge{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=Ws(.35),this.mascotSlot=Gs(Sg),this.panelPeekMascot=Ws(.18),this.panelPeekSide=Gs(["left","right"]),this.eggCounter=new jr,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=n=>{if(this.lastPointerX=n.clientX,this.lastPointerY=n.clientY,this.pressTimer&&!this.drag){(Math.abs(n.clientY-this.pressStartY)>8||Math.abs(n.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:n.clientX-this.pressStartX,offsetY:n.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const n=this.drag.pos;this.drag=null,this.pressTapFn=null;const e=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let t=n,s=1/0;if(e.forEach((i,r)=>{if(r===n)return;const o=i.getBoundingClientRect(),a=o.left+o.width/2,c=o.top+o.height/2,l=(this.lastPointerX-a)**2+(this.lastPointerY-c)**2;l<s&&(s=l,t=r)}),t!==n){const i=[...this.order],[r]=i.splice(n,1);i.splice(t,0,r),this.emit("reorder",i)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(n){if(n.has("progressStep")){const e=n.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}updated(n){n.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),n.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},Cg)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1},Fo)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},Fo)}exportDevice(n,e){this.closeShare();const t=Um(this.progression,n);window.open(t,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=e,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(n,e,t){t.preventDefault(),this.pressTapFn=e,this.pressStartX=t.clientX,this.pressStartY=t.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:n,offsetX:0,offsetY:0}},150)}dragStyleFor(n){const e=this.drag;return e&&e.pos===n?`transform:translate(${e.offsetX}px, ${e.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderLengthControl(){const n=this.progression.chords.length;return M`
      <div class="length-control">
        <div class="length-btn ${n<=Qt?"disabled":""}" @click=${()=>n>Qt&&this.emit("set-length",n-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:rt},(e,t)=>M`<div class="length-segment ${t<n?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${n>=rt?"disabled":""}" @click=${()=>n<rt&&this.emit("set-length",n+1)}>+</div>
        <div class="length-label-text">${n}</div>
      </div>
    `}render(){const n=this.progression,e=Fr(n.mood),t=this.instrument??Yf(n.genre),s=this.playStyle??Hf(n.genre),i=Math.max(1,this.order.length),r=this.playing?this.snapProgress?this.progressStep/i*100:(this.progressStep+1)/i*100:0,o=Vo[n.mood]||Vo.Dreamy,a=this.showTheory?Pm(this.order.map(h=>n.chords[h]),n.key,n.scaleType):null,c=lc(n.key,n.scaleType).length,l=c===0?"no sharps or flats":`${c} ${c===1?"sharp/flat":"sharps/flats"}`;return M`
      <div class="frame">
        ${this.mascot.show?M`
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
          <div class="icon-btn" @click=${()=>this.toggleMenu()}>…</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted?M`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${bs.map(h=>M`
                <div class="menu-chip ${h===n.key?"selected":""}" style=${h===n.key?`background:${e}`:""} @click=${()=>this.emit("set-key",h)}>${Ai(h,n.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${Ng.map(h=>M`
                <div class="menu-chip ${h.value===n.scaleType?"selected":""}" style=${h.value===n.scaleType?`background:${e}`:""} @click=${()=>this.emit("set-scale",h.value)}>${h.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${kg.map(h=>M`
                <div class="menu-chip ${h===n.genre?"selected":""}" style=${h===n.genre?`background:${e}`:""} @click=${()=>this.emit("set-genre",h)}>${h}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${Zt.map(h=>M`
                <div class="menu-chip ${h.name===n.mood?"selected":""}" style=${h.name===n.mood?`background:${h.dot}`:""} @click=${()=>this.emit("set-mood",h.name)}>${h.name}</div>
              `)}
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
          <h1>Your progression, feeling <span style="color:${e}">${n.mood.toLowerCase()}.</span></h1>
          <div class="subcopy">${n.genre} · ${n.chords.length} ${n.chords.length===1?"chord":"chords"} · tap a chord to preview it — use the icons to swap it or view its voicing.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?M`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel" style="animation:${o.anim} ${o.dur}s ${o.ease} infinite;">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((h,u)=>{const d=n.chords[h],p=Un(d.tension),f=u===this.activeIndex;return M`
                  <div
                    class="chord-chip ${f?"active":""}"
                    style="width:${p.size}px;height:${p.size}px;border-radius:${p.radius}px;background:${p.color};${this.dragStyleFor(u)}"
                    @pointerdown=${m=>this.pressStart(u,()=>this.emit("chord-preview",h),m)}
                  >
                    ${this.showTheory?M`<div class="roman-badge">${d.roman}</div>`:""}
                    ${f?M`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="font-size:${p.fontSize}px;">${d.name}</div>
                    <div class="chord-role">${d.functionLabel}</div>
                    <div
                      class="swap-badge"
                      @pointerdown=${m=>m.stopPropagation()}
                      @click=${m=>{m.stopPropagation(),this.emit("chord-tap",h)}}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                    </div>
                    <div
                      class="voicing-badge"
                      aria-label="View voicing"
                      @pointerdown=${m=>m.stopPropagation()}
                      @click=${m=>{m.stopPropagation(),this.emit("chord-voicing-tap",h)}}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.2 10-6.2 10 6.2 10 6.2-3.6 6.2-10 6.2-10-6.2-10-6.2z" /><circle cx="12" cy="12" r="2.6" /></svg>
                    </div>
                  </div>
                `})}
            </div>
            </div>
          </div>

          <div class="theory-toggle-row" @click=${()=>this.emit("theory-toggle")}>
            <div class="theory-track ${this.showTheory?"on":""}"><div class="theory-knob ${this.showTheory?"on":""}"></div></div>
            <div class="theory-label">Show music theory</div>
          </div>
          ${a?M`
            <div class="theory-strip">
              <div class="theory-key-label">${Ai(n.key,n.scaleType)} ${n.scaleType.replace("_"," ")} · ${l}</div>
              <div class="theory-staff-scroll">
                ${St`
                  <svg width="${a.width}" height="${a.height}" viewBox="0 0 ${a.width} ${a.height}">
                    ${a.lines.map(h=>St`<rect x="6" y="${h}" width="${a.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${a.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${a.keySignature.map(h=>St`<text x="${h.x}" y="${h.y+6}" font-size="20" fill="var(--cv-ink)">${h.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${a.chords.map(h=>St`
                      <text x="${h.cx}" y="${h.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${h.name}</text>
                      ${h.ledgers.map(u=>St`<rect x="${u.x}" y="${u.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${h.notes.map(u=>St`<ellipse cx="${u.x}" cy="${u.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${h.cx}" y="${a.height-4}" font-size="12" font-weight="800" fill="${e}" text-anchor="middle">${h.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${e}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?M`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:M`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${r}%;background:${e};--progress-duration:${nc}ms"
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
          </div>
          <div class="transport-meta">${Ai(n.key,n.scaleType).toUpperCase()} ${n.scaleType.replace("_"," ")} · ${n.bpm} BPM</div>

          <div class="control-row">
            <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              ${t} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
            </div>
            <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
              ${s} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
            </div>
          </div>
          ${this.expandedInstrument?M`
            <div class="control-options">
              ${$r.filter(h=>h.name!==t).map(h=>M`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",h.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${h.color}"></span>${h.name}
                </div>
              `)}
            </div>
          `:""}
          ${this.expandedPlayStyle?M`
            <div class="control-options">
              ${Pr.filter(h=>h.name!==s).map(h=>M`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",h.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${h.color}"></span>${h.name}
                </div>
              `)}
            </div>
          `:""}

          <button class="build-song-btn" style="background:${e}" @click=${()=>this.emit("view-song")}>
            Build the full song <span>→</span>
          </button>
          <div class="back-to-seed-row">
            <div class="back-to-seed-link" @click=${()=>this.emit("back")}>← Back to seed</div>
          </div>
        </div>

        ${this.sheetMounted&&this.swapChord?M`
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

        ${this.shareMounted?M`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${h=>this.exportDevice(h.detail.device,h.detail.name)}
          ></share-modal>
        `:""}

        ${this.toast?M`<div class="toast">Sent to ${this.toast}</div>`:""}
      </div>
    `}};Z.styles=Mt`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
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
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 24px 20px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      padding: 34px 22px;
      overflow: hidden;
      min-height: 180px;
      box-shadow: 0 30px 60px -30px rgba(46, 39, 31, 0.22);
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
      display: flex;
      gap: 14px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
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
    }
    .chord-chip.active {
      transform: scale(1.06);
      box-shadow: 0 18px 34px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-name {
      font-weight: 800;
      color: var(--cv-ink);
      line-height: 1;
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
      top: -6px;
      right: -6px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
      touch-action: manipulation;
    }
    .swap-badge:hover {
      transform: scale(1.12);
    }
    .voicing-badge {
      position: absolute;
      bottom: -6px;
      left: -6px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
      touch-action: manipulation;
    }
    .voicing-badge:hover {
      transform: scale(1.12);
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
      text-align: center;
      margin-top: 16px;
    }
    .back-to-seed-link {
      display: inline-block;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
    }
    .control-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
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

    /* flex-wrap greedily fits as many chips as their (tension-varying) widths allow per row,
       which on a narrow phone can wrap unevenly (e.g. 3 then 1). A strict 2-column grid forces
       an even 2-per-row layout without touching each chip's own size — grid tracks just divide
       the row width; the chip keeps its own inline width/height and centers within its cell. */
    @media (max-width: 600px) {
      .chip-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        align-items: center;
        row-gap: 30px;
        column-gap: 18px;
      }
      /* Extra breathing room for the swap-badge (which pokes 6px past the chip's own edge) and
         the "now" marker above the active chip — both can crowd a neighboring chip otherwise. */
      .chord-chip {
        margin: 8px;
      }
    }
  `;ee([Q({type:Object})],Z.prototype,"progression",2);ee([Q({type:Number})],Z.prototype,"activeIndex",2);ee([Q({type:Number})],Z.prototype,"progressStep",2);ee([Q({type:Array})],Z.prototype,"order",2);ee([Q({type:Boolean})],Z.prototype,"playing",2);ee([Q({type:Boolean})],Z.prototype,"showTheory",2);ee([Q({type:String})],Z.prototype,"instrument",2);ee([Q({type:String})],Z.prototype,"playStyle",2);ee([Q({type:Boolean})],Z.prototype,"sheetOpen",2);ee([Q({type:String})],Z.prototype,"sheetMode",2);ee([Q({type:Object})],Z.prototype,"swapChord",2);ee([Q({type:Number})],Z.prototype,"swapIndex",2);ee([Q({type:Array})],Z.prototype,"alternatives",2);ee([R()],Z.prototype,"menuMounted",2);ee([R()],Z.prototype,"menuVisible",2);ee([R()],Z.prototype,"shareMounted",2);ee([R()],Z.prototype,"shareVisible",2);ee([R()],Z.prototype,"sheetMounted",2);ee([R()],Z.prototype,"sheetVisible",2);ee([R()],Z.prototype,"toast",2);ee([R()],Z.prototype,"spinning",2);ee([R()],Z.prototype,"drag",2);ee([R()],Z.prototype,"snapProgress",2);ee([R()],Z.prototype,"expandedInstrument",2);ee([R()],Z.prototype,"expandedPlayStyle",2);ee([R()],Z.prototype,"mascot",2);ee([R()],Z.prototype,"mascotSlot",2);ee([R()],Z.prototype,"panelPeekMascot",2);ee([R()],Z.prototype,"panelPeekSide",2);ee([R()],Z.prototype,"paradeTrigger",2);Z=ee([Dt("loop-screen")],Z);var Ig=Object.defineProperty,Og=Object.getOwnPropertyDescriptor,ts=(n,e,t,s)=>{for(var i=s>1?void 0:s?Og(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Ig(e,t,i),i};const Eg=["flex-start","center","flex-end"];let _t=class extends Ge{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.canAddSection=!0,this.mascot=Ws(.5),this.mascotAlign=Gs([...Eg]),this.eggCounter=new jr,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}selectSection(n){this.dispatchEvent(new CustomEvent("select-section",{detail:n,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){return M`
      <div class="frame">
        <div class="wordmark" @click=${()=>this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${()=>this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((n,e)=>{const t=e===this.activeSectionIdx,s=Fr(n.progression.mood);return M`
                <div class="section-row ${t?"active":""}" style=${t?`--ring-color:${s}`:""} @click=${()=>this.selectSection(e)}>
                  <div>
                    <div class="section-name">${n.name.toUpperCase()}</div>
                    <div class="section-chords">${n.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${n.order.map(i=>{const r=n.progression.chords[i],o=Un(r.tension);return M`<div class="section-chip" style="background:${o.color};border-radius:${Math.round(o.radius*.35)}px;"></div>`})}
                  </div>
                </div>
              `})}
            <div class="add-section-row ${this.canAddSection?"enabled":"disabled"}" @click=${()=>this.addSection()}>
              <span class="add-icon">+</span>
              <span>${this.canAddSection?"Add a related section":"All song parts added"}</span>
            </div>
          </div>

          <div class="caption">Tap a section to open it in the Loop screen.</div>

          ${this.mascot.show?M`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
      </div>
    `}};_t.styles=Mt`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
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
      transition: transform 0.15s ease, box-shadow 0.2s ease;
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
      margin-top: 24px;
    }
    .mascot-row {
      display: flex;
      margin-top: 40px;
      padding: 0 4px;
      opacity: 0.9;
    }
  `;ts([Q({type:Array})],_t.prototype,"sections",2);ts([Q({type:Number})],_t.prototype,"activeSectionIdx",2);ts([Q({type:Boolean})],_t.prototype,"canAddSection",2);ts([R()],_t.prototype,"mascot",2);ts([R()],_t.prototype,"mascotAlign",2);ts([R()],_t.prototype,"paradeTrigger",2);_t=ts([Dt("song-screen")],_t);var Mg=Object.defineProperty,Dg=Object.getOwnPropertyDescriptor,de=(n,e,t,s)=>{for(var i=s>1?void 0:s?Dg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Mg(e,t,i),i};const Ds=[{name:"Verse",desc:"Settled, familiar.",reorder:n=>Array.from({length:n},(e,t)=>t)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:n=>Array.from({length:n},(e,t)=>(t+Math.ceil(n/2))%n)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:n=>Array.from({length:n},(e,t)=>(t+1)%n)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:n=>Array.from({length:n},(e,t)=>n-1-t)},{name:"Outro",desc:"Settles back down.",reorder:n=>Array.from({length:n},(e,t)=>(t-1+n)%n)}];let ce=class extends Ge{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.currentProjectId=null,this.autoplayTimer=null,this.AUTHORIZED_HASHES=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"],this.driveService=new Uc,this.tokenClient=null,this.isAuthenticated=!1,this.isDriveSyncing=!1}async firstUpdated(){this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const n=localStorage.getItem("chroma-chords-instrument");n&&$r.some(t=>t.name===n)&&(this.instrument=n);const e=localStorage.getItem("chroma-chords-play-style");e&&Pr.some(t=>t.name===e)&&(this.playStyle=e);try{this.chordData=await mm()}catch(t){console.error("Failed to load chord data:",t)}}disconnectedCallback(){super.disconnectedCallback(),this.stopAutoplay()}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{!this.progression||!this.playing||(this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length,this.playActiveChord())},nc)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}playActiveChord(){if(!this.progression)return;const n=this.order[this.activeIndex]??0,e=this.progression.chords[n];os(e.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}onGenreChange(n){this.genre=n.detail,this.pendingChordSuggestion=null}onMoodChange(n){this.mood=n.detail,this.pendingChordSuggestion=null}onFreetextSuggestionApplied(n){const e=n.detail;this.pendingChordSuggestion=e.chords?.length&&e.key&&e.scaleType?e:null}onGenerate(){this.keyOverride=null,this.scaleOverride=null;const n=this.pendingChordSuggestion,t=(n&&n.genre===this.genre&&n.mood===this.mood&&n.chords&&n.key&&n.scaleType?Nm(this.chordData,n.key,n.scaleType,n.chords,this.genre,this.mood):null)??Io(this.chordData,this.genre,this.mood,{length:this.length});this.progression=t,this.order=Array.from({length:t.chords.length},(s,i)=>i),this.length=t.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,this.screen="loop",this.sections=[{name:Ds[0].name,desc:Ds[0].desc,progression:t,order:this.order.slice()}],this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.saveProject()}onLengthChange(n){this.length=n.detail}regenerate(){const n=Io(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=n,this.order=Array.from({length:this.length},(e,t)=>t),this.activeIndex=0,this.progressStep=0,this.syncActiveSection(),this.saveProject(),this.playing&&(this.startAutoplay(),this.playActiveChord())}syncActiveSection(){if(!this.progression||!this.sections[this.activeSectionIdx])return;const n=[...this.sections];n[this.activeSectionIdx]={...n[this.activeSectionIdx],progression:this.progression,order:this.order.slice()},this.sections=n}onSetKey(n){this.keyOverride=n.detail,this.regenerate()}onSetScale(n){this.scaleOverride=n.detail,this.regenerate()}onSetGenre(n){this.genre=n.detail,this.regenerate()}onSetMood(n){this.mood=n.detail,this.regenerate()}onSetLength(n){this.length=n.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(n){if(!this.progression)return;const e=this.order[this.activeIndex];this.order=n.detail;const t=this.order.indexOf(e);this.activeIndex=t>=0?t:0,this.syncActiveSection(),this.saveProject()}onBack(){this.stopAutoplay(),this.screen="seed",this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(n){this.instrument=n.detail,localStorage.setItem("chroma-chords-instrument",n.detail)}onSetPlayStyle(n){this.playStyle=n.detail,localStorage.setItem("chroma-chords-play-style",n.detail)}onTogglePlay(){this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.stopAutoplay()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.startAutoplay(),this.playActiveChord())}onChordTap(n){this.progression&&(this.swapIndex=n.detail,this.sheetMode="swap",this.alternatives=Vm(this.chordData,this.progression,n.detail),this.sheetOpen=!0,os(this.progression.chords[n.detail].notes.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0}))}onChordVoicingTap(n){this.progression&&(this.swapIndex=n.detail,this.sheetMode="voicing",this.alternatives=[],this.sheetOpen=!0,os(this.progression.chords[n.detail].notes.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0}))}onChordPreview(n){this.progression&&os(this.progression.chords[n.detail].notes.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=n.detail.chord,this.progression={...this.progression,chords:e},this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),this.saveProject(),os(n.detail.chord.notes.map(t=>`${t}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.8,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}onVoicingPreview(n){this.progression&&os(n.detail.map(e=>`${e}4`),this.progression.genre,{bpm:this.progression.bpm,duration:.6,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}onVoicingChange(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=Fm(e[this.swapIndex],n.detail.quality,n.detail.extension),this.progression={...this.progression,chords:e},this.syncActiveSection(),this.saveProject()}onBackToProgression(){this.screen="loop"}onViewSong(){this.stopAutoplay(),this.sheetOpen=!1,this.screen="song"}onSelectSection(n){const e=this.sections[n.detail];e&&(this.activeSectionIdx=n.detail,this.progression=e.progression,this.order=e.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=e.progression.chords.length,this.keyOverride=e.progression.key,this.scaleOverride=e.progression.scaleType,this.sheetOpen=!1,this.screen="loop",this.playing&&(this.startAutoplay(),this.playActiveChord()))}onAddSection(){if(!this.progression||this.sections.length>=Ds.length)return;const n=Ds[this.sections.length],e=n.reorder(this.progression.chords.length),t={name:n.name,desc:n.desc,progression:this.progression,order:e};this.sections=[...this.sections,t],this.activeSectionIdx=this.sections.length-1}saveProject(){if(!this.progression)return;const n=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=n;const e={id:n,name:`${this.progression.genre} · ${this.progression.mood}`,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};is.saveProject(e),this.syncProjectsToCloud()}initSilentAuth(){const n=localStorage.getItem("chroma-chords-auth")||localStorage.getItem("chord-voyager-auth");n&&this.hashEmail(n).then(e=>{this.AUTHORIZED_HASHES.includes(e)&&(this.isAuthenticated=!0,this.setupGoogleAuth())})}setupGoogleAuth(){const n=setInterval(()=>{if(window.google){clearInterval(n),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async e=>{if(!(!e||!e.access_token))try{const t=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${e.access_token}`}});if(!t.ok)return;const s=await t.json();if(!s?.email)return;const i=await this.hashEmail(s.email);if(!this.AUTHORIZED_HASHES.includes(i))return;this.isAuthenticated=!0,localStorage.setItem("chroma-chords-auth",s.email),this.driveService.setAccessToken(e.access_token),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(t){console.error("Silent Drive auth failed",t)}}});try{this.tokenClient.requestAccessToken({prompt:""})}catch(e){console.error("Failed to request Drive access silently",e)}}},200)}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const n=await this.driveService.loadProjects();if(n){n.forEach(s=>s.syncedToCloud=!0);const e=is.getProjects(),t=is.mergeProjects(e,n);is.setProjects(t)}}catch(n){console.error("Failed to sync from cloud",n)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!(!this.isAuthenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const n=is.getProjects();await this.driveService.saveProjects(n),n.forEach(e=>e.syncedToCloud=!0),is.setProjects(n)}catch(n){console.error("Failed to sync to cloud",n)}finally{this.isDriveSyncing=!1}}}async hashEmail(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(s)).map(r=>r.toString(16).padStart(2,"0")).join("")}render(){if(this.screen==="seed"||!this.progression)return M`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
        ></seed-screen>
      `;if(this.screen==="song")return M`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .canAddSection=${this.sections.length<Ds.length}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
        ></song-screen>
      `;const n=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;return M`
      <loop-screen
        .progression=${this.progression}
        .activeIndex=${this.activeIndex}
        .progressStep=${this.progressStep}
        .order=${this.order}
        .playing=${this.playing}
        .showTheory=${this.showTheory}
        .instrument=${this.instrument}
        .playStyle=${this.playStyle}
        .sheetOpen=${this.sheetOpen}
        .sheetMode=${this.sheetMode}
        .swapChord=${n}
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
      ></loop-screen>
    `}};ce.styles=Mt`
    :host {
      display: block;
      min-height: 100dvh;
    }
  `;de([R()],ce.prototype,"chordData",2);de([R()],ce.prototype,"screen",2);de([R()],ce.prototype,"genre",2);de([R()],ce.prototype,"mood",2);de([R()],ce.prototype,"progression",2);de([R()],ce.prototype,"activeIndex",2);de([R()],ce.prototype,"progressStep",2);de([R()],ce.prototype,"order",2);de([R()],ce.prototype,"keyOverride",2);de([R()],ce.prototype,"scaleOverride",2);de([R()],ce.prototype,"playing",2);de([R()],ce.prototype,"showTheory",2);de([R()],ce.prototype,"instrument",2);de([R()],ce.prototype,"playStyle",2);de([R()],ce.prototype,"sheetOpen",2);de([R()],ce.prototype,"sheetMode",2);de([R()],ce.prototype,"swapIndex",2);de([R()],ce.prototype,"alternatives",2);de([R()],ce.prototype,"length",2);de([R()],ce.prototype,"sections",2);de([R()],ce.prototype,"activeSectionIdx",2);de([R()],ce.prototype,"pendingChordSuggestion",2);ce=de([Dt("chroma-chords-app")],ce);
