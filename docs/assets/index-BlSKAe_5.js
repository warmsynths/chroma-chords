(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=globalThis,hr=wn.ShadowRoot&&(wn.ShadyCSS===void 0||wn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ur=Symbol(),lo=new WeakMap;let aa=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==ur)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(hr&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=lo.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&lo.set(t,e))}return e}toString(){return this.cssText}};const Hc=n=>new aa(typeof n=="string"?n:n+"",void 0,ur),Pt=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new aa(t,n,ur)},Xc=(n,e)=>{if(hr)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=wn.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},ho=hr?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Hc(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Zc,defineProperty:Jc,getOwnPropertyDescriptor:Qc,getOwnPropertyNames:Kc,getOwnPropertySymbols:el,getPrototypeOf:tl}=Object,si=globalThis,uo=si.trustedTypes,sl=uo?uo.emptyScript:"",nl=si.reactiveElementPolyfillSupport,Vs=(n,e)=>n,In={toAttribute(n,e){switch(e){case Boolean:n=n?sl:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},dr=(n,e)=>!Zc(n,e),po={attribute:!0,type:String,converter:In,reflect:!1,useDefault:!1,hasChanged:dr};Symbol.metadata??=Symbol("metadata"),si.litPropertyMetadata??=new WeakMap;let hs=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=po){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Jc(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=Qc(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??po}static _$Ei(){if(this.hasOwnProperty(Vs("elementProperties")))return;const e=tl(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Vs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Vs("properties"))){const t=this.properties,s=[...Kc(t),...el(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(ho(i))}else e!==void 0&&t.push(ho(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xc(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:In).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:In;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??dr)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,r]of s){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};hs.elementStyles=[],hs.shadowRootOptions={mode:"open"},hs[Vs("elementProperties")]=new Map,hs[Vs("finalized")]=new Map,nl?.({ReactiveElement:hs}),(si.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pr=globalThis,fo=n=>n,Mn=pr.trustedTypes,mo=Mn?Mn.createPolicy("lit-html",{createHTML:n=>n}):void 0,ca="$lit$",Mt=`lit$${Math.random().toFixed(9).slice(2)}$`,la="?"+Mt,il=`<${la}>`,Qt=document,js=()=>Qt.createComment(""),qs=n=>n===null||typeof n!="object"&&typeof n!="function",fr=Array.isArray,rl=n=>fr(n)||typeof n?.[Symbol.iterator]=="function",Ri=`[ 	
\f\r]`,Rs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,go=/-->/g,yo=/>/g,qt=RegExp(`>|${Ri}(?:([^\\s"'>=/]+)(${Ri}*=${Ri}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vo=/'/g,_o=/"/g,ha=/^(?:script|style|textarea|title)$/i,ua=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),N=ua(1),Nt=ua(2),ys=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),xo=new WeakMap,Gt=Qt.createTreeWalker(Qt,129);function da(n,e){if(!fr(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return mo!==void 0?mo.createHTML(e):e}const ol=(n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=Rs;for(let a=0;a<t;a++){const c=n[a];let l,u,h=-1,d=0;for(;d<c.length&&(o.lastIndex=d,u=o.exec(c),u!==null);)d=o.lastIndex,o===Rs?u[1]==="!--"?o=go:u[1]!==void 0?o=yo:u[2]!==void 0?(ha.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=qt):u[3]!==void 0&&(o=qt):o===qt?u[0]===">"?(o=i??Rs,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?qt:u[3]==='"'?_o:vo):o===_o||o===vo?o=qt:o===go||o===yo?o=Rs:(o=qt,i=void 0);const p=o===qt&&n[a+1].startsWith("/>")?" ":"";r+=o===Rs?c+il:h>=0?(s.push(l),c.slice(0,h)+ca+c.slice(h)+Mt+p):c+Mt+(h===-2?a:p)}return[da(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class zs{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,u]=ol(e,t);if(this.el=zs.createElement(l,s),Gt.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=Gt.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(ca)){const d=u[o++],p=i.getAttribute(h).split(Mt),f=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:f[2],strings:p,ctor:f[1]==="."?cl:f[1]==="?"?ll:f[1]==="@"?hl:ni}),i.removeAttribute(h)}else h.startsWith(Mt)&&(c.push({type:6,index:r}),i.removeAttribute(h));if(ha.test(i.tagName)){const h=i.textContent.split(Mt),d=h.length-1;if(d>0){i.textContent=Mn?Mn.emptyScript:"";for(let p=0;p<d;p++)i.append(h[p],js()),Gt.nextNode(),c.push({type:2,index:++r});i.append(h[d],js())}}}else if(i.nodeType===8)if(i.data===la)c.push({type:2,index:r});else{let h=-1;for(;(h=i.data.indexOf(Mt,h+1))!==-1;)c.push({type:7,index:r}),h+=Mt.length-1}r++}}static createElement(e,t){const s=Qt.createElement("template");return s.innerHTML=e,s}}function vs(n,e,t=n,s){if(e===ys)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl;const r=qs(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=vs(n,i._$AS(n,e.values),i,s)),e}class al{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??Qt).importNode(t,!0);Gt.currentNode=i;let r=Gt.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new en(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new ul(r,this,e)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=Gt.nextNode(),o++)}return Gt.currentNode=Qt,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class en{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=vs(this,e,t),qs(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==ys&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):rl(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&qs(this._$AH)?this._$AA.nextSibling.data=e:this.T(Qt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=zs.createElement(da(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new al(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=xo.get(e.strings);return t===void 0&&xo.set(e.strings,t=new zs(e)),t}k(e){fr(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new en(this.O(js()),this.O(js()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=fo(e).nextSibling;fo(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ni{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=we}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=vs(this,e,t,0),o=!qs(e)||e!==this._$AH&&e!==ys,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=vs(this,a[s+c],t,c),l===ys&&(l=this._$AH[c]),o||=!qs(l)||l!==this._$AH[c],l===we?e=we:e!==we&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class cl extends ni{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}}class ll extends ni{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}}class hl extends ni{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=vs(this,e,t,0)??we)===ys)return;const s=this._$AH,i=e===we&&s!==we||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==we&&(s===we||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ul{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){vs(this,e)}}const dl=pr.litHtmlPolyfillSupport;dl?.(zs,en),(pr.litHtmlVersions??=[]).push("3.3.3");const pl=(n,e,t)=>{const s=t?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const r=t?.renderBefore??null;s._$litPart$=i=new en(e.insertBefore(js(),r),r,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mr=globalThis;class Je extends hs{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=pl(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ys}}Je._$litElement$=!0,Je.finalized=!0,mr.litElementHydrateSupport?.({LitElement:Je});const fl=mr.litElementPolyfillSupport;fl?.({LitElement:Je});(mr.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ml={attribute:!0,type:String,converter:In,reflect:!1,hasChanged:dr},gl=(n=ml,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),s==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(s==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,n,!0,a)}}throw Error("Unsupported decorator location: "+s)};function G(n){return(e,t)=>typeof t=="object"?gl(n,e,t):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(n){return G({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yl=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vl(n,e){return(t,s,i)=>{const r=o=>o.renderRoot?.querySelector(n)??null;return yl(t,s,{get(){return r(this)}})}}const _l="modulepreload",xl=function(n,e){return new URL(n,e).href},bo={},bl=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(t.map(l=>{if(l=xl(l,s),l in bo)return;bo[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!s)for(let f=o.length-1;f>=0;f--){const m=o[f];if(m.href===l&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":_l,u||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((f,m)=>{p.addEventListener("load",f),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},$s="chroma_chords_projects",wl="chord_voyager_projects";class At{static getProjects(){try{let e=localStorage.getItem($s);if(e||(e=localStorage.getItem(wl),e&&localStorage.setItem($s,e)),e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem($s,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const s=new Map;return e.forEach(i=>s.set(i.id,i)),t.forEach(i=>{const r=s.get(i.id);!r||i.lastModified>r.lastModified?s.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(s.values())}static saveProject(e){const t=this.getProjects(),s=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),s>=0?t[s]=e:t.push(e);try{localStorage.setItem($s,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(s=>s.id!==e);try{localStorage.setItem($s,JSON.stringify(t))}catch(s){console.error("Failed to delete project from localStorage:",s)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chroma_chords.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,s)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.chords)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):s(new Error("Invalid project file format"))}catch{s(new Error("Failed to parse JSON file"))}},i.onerror=()=>s(new Error("Failed to read file")),i.readAsText(e)})}}class Tl{constructor(){this.accessToken=null,this.FILENAME="chroma_chords_projects.json",this.OLD_FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const s=await t.json();if(s.files&&s.files.length>0)return s.files[0].id;const i=encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`),r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${i}&fields=files(id)`,{method:"GET",headers:this.headers});if(r.ok){const o=await r.json();if(o.files&&o.files.length>0)return o.files[0].id}return null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),s=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:s});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}async findAudioFileId(e){try{const t=`recording_${e}.webm`,s=encodeURIComponent(`name='${t}' and trashed=false`),i=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${s}&fields=files(id)`,{method:"GET",headers:this.headers});if(!i.ok)throw i.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${i.statusText}`);const r=await i.json();return r.files&&r.files.length>0?r.files[0].id:null}catch(t){throw console.error(`Failed to find audio file for project ${e}:`,t),t}}async uploadAudioFile(e,t){try{const s=`recording_${e}.webm`,i=await this.findAudioFileId(e);if(i){const r=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${i}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!r.ok)throw new Error(`Failed to update audio file: ${r.statusText}`);return i}else{const r=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:s,parents:["appDataFolder"]})});if(!r.ok)throw new Error(`Failed to create audio file metadata: ${r.statusText}`);const a=(await r.json()).id,c=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${a}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":t.type||"audio/webm"},body:t});if(!c.ok)throw new Error(`Failed to upload new audio file content: ${c.statusText}`);return a}}catch(s){throw console.error(`Failed to upload audio file for project ${e}:`,s),s}}async downloadAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return null;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}?alt=media`,{method:"GET",headers:this.headers});if(!s.ok)throw new Error(`Failed to download audio file: ${s.statusText}`);return await s.blob()}catch(t){throw console.error(`Failed to download audio file for project ${e}:`,t),t}}async deleteAudioFile(e){try{const t=await this.findAudioFileId(e);if(!t)return;const s=await fetch(`https://www.googleapis.com/drive/v3/files/${t}`,{method:"DELETE",headers:this.headers});if(!s.ok&&s.status!==404)throw new Error(`Failed to delete audio file: ${s.statusText}`)}catch(t){throw console.error(`Failed to delete audio file for project ${e}:`,t),t}}}const wo=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"];function Ps(n){return typeof window<"u"&&typeof localStorage<"u"?localStorage.getItem(n):null}function $i(n,e){typeof window<"u"&&typeof localStorage<"u"&&localStorage.setItem(n,e)}function Pi(n){typeof window<"u"&&typeof localStorage<"u"&&localStorage.removeItem(n)}class Sl{constructor(){this.driveService=new Tl,this.tokenClient=null,this.userEmail=null,this.authenticated=!1,this.isDriveSyncing=!1,this.authStateCallbacks=new Set,this.userEmail=Ps("chroma-chords-auth")||Ps("chroma-chords-user")||Ps("chord-voyager-auth"),this.userEmail&&(this.authenticated=!0)}getUserEmail(){return this.userEmail}isAuthenticated(){return this.authenticated}get isAdmin(){return!!(this.userEmail&&this.userEmail.toLowerCase().trim()==="warmsynthsiloveyou@gmail.com")}subscribeAuthState(e){return this.authStateCallbacks.add(e),e(this.userEmail,this.authenticated),()=>this.authStateCallbacks.delete(e)}notifyAuthState(){this.authStateCallbacks.forEach(e=>e(this.userEmail,this.authenticated))}async hashEmail(e){const s=new TextEncoder().encode(e),i=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(i)).map(o=>o.toString(16).padStart(2,"0")).join("")}initSilentAuth(){const e=Ps("chroma-chords-auth")||Ps("chord-voyager-auth");e&&this.hashEmail(e).then(t=>{wo.includes(t)&&(this.authenticated=!0,this.notifyAuthState(),this.setupGoogleAuth())})}setupGoogleAuth(){if(typeof window>"u")return;const e=setInterval(()=>{if(window.google){clearInterval(e),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async t=>{if(!(!t||t.error||!t.access_token))try{const s=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${t.access_token}`}});if(!s.ok)return;const i=await s.json();if(!i?.email)return;const r=await this.hashEmail(i.email);if(!wo.includes(r))return;this.authenticated=!0,this.userEmail=i.email,$i("chroma-chords-auth",i.email),this.driveService.setAccessToken(t.access_token),this.notifyAuthState(),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud()}catch(s){console.error("Silent Drive auth failed",s)}}});try{this.tokenClient.requestAccessToken({prompt:"none"})}catch(t){console.error("Failed to request Drive access silently",t)}}},200)}requestLogin(){return new Promise(e=>{if(typeof window<"u"&&window.google?.accounts?.oauth2)try{this.tokenClient||(this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata",callback:async t=>{if(t?.access_token){this.driveService.setAccessToken(t.access_token);const{setGoogleToken:s}=await bl(async()=>{const{setGoogleToken:a}=await Promise.resolve().then(()=>Mg);return{setGoogleToken:a}},void 0,import.meta.url);s(t.access_token);const o=(await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${t.access_token}`}}).catch(()=>null))?.json().catch(()=>null))?.email||"google-user@chromachords.app";$i("chroma-chords-auth",o),this.userEmail=o,this.authenticated=!0,this.notifyAuthState(),await this.syncProjectsFromCloud(),e(o);return}e(null)}})),this.tokenClient.requestAccessToken();return}catch(t){console.warn("Google Identity Services request failed:",t)}if(typeof window<"u"){const t=prompt("Sign in with Google Account email:","warmsynthsiloveyou@gmail.com");t?($i("chroma-chords-auth",t),this.userEmail=t,this.authenticated=!0,this.notifyAuthState(),e(t)):e(null)}else e(null)})}logout(){Pi("chroma-chords-auth"),Pi("chroma-chords-user"),Pi("chord-voyager-auth"),this.userEmail=null,this.authenticated=!1,this.notifyAuthState()}getProjects(){return At.getProjects()}saveProject(e){At.saveProject(e),this.syncProjectsToCloud()}deleteProject(e){At.deleteProject(e),this.syncProjectsToCloud()}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const e=await this.driveService.loadProjects();if(e){e.forEach(i=>i.syncedToCloud=!0);const t=At.getProjects(),s=At.mergeProjects(t,e);At.setProjects(s)}}catch(e){console.error("Failed to sync from cloud",e)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!(!this.authenticated||!this.driveService.hasAccessToken()||this.isDriveSyncing)){this.isDriveSyncing=!0;try{const e=At.getProjects();await this.driveService.saveProjects(e),e.forEach(t=>t.syncedToCloud=!0),At.setProjects(e)}catch(e){console.error("Failed to sync to cloud",e)}finally{this.isDriveSyncing=!1}}}}const cs=new Sl,pa="15.1.22",To=(n,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:n}),So=(n,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:n}),Wi=(n,e)=>({startTime:e,type:"setValue",value:n}),fa=(n,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:n}),ma=(n,e,{startTime:t,target:s,timeConstant:i})=>s+(e-s)*Math.exp((t-n)/i),ds=n=>n.type==="exponentialRampToValue",On=n=>n.type==="linearRampToValue",It=n=>ds(n)||On(n),gr=n=>n.type==="setValue",gt=n=>n.type==="setValueCurve",En=(n,e,t,s)=>{const i=n[e];return i===void 0?s:It(i)||gr(i)?i.value:gt(i)?i.values[i.values.length-1]:ma(t,En(n,e-1,i.startTime,s),i)},ko=(n,e,t,s,i)=>t===void 0?[s.insertTime,i]:It(t)?[t.endTime,t.value]:gr(t)?[t.startTime,t.value]:gt(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,En(n,e-1,t.startTime,i)],Yi=n=>n.type==="cancelAndHold",Hi=n=>n.type==="cancelScheduledValues",Ct=n=>Yi(n)||Hi(n)?n.cancelTime:ds(n)||On(n)?n.endTime:n.startTime,Ao=(n,e,t,{endTime:s,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((n-e)/(s-e)):n<s?t:i,Co=(n,e,t,{endTime:s,value:i})=>t+(n-e)/(s-e)*(i-t),ga=(n,e)=>{const t=Math.floor(e);if(t===e)return n[t];const s=Math.ceil(e);return(1-(e-t))*n[t]+(1-(s-e))*n[s]},kl=(n,{duration:e,startTime:t,values:s})=>{const i=(n-t)/e*(s.length-1);return ga(s,i)},Al=(n,e,t)=>{const s=n.length,i=Math.max(1,Math.floor(t/e*s))+1,r=n instanceof Float32Array?new Float32Array(i):n.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(s-1);r[o]=ga(n,c)}return r},yn=n=>n.type==="setTarget";class Cl{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=Ct(e);if(Yi(e)||Hi(e)){const s=this._automationEvents.findIndex(r=>Hi(e)&&gt(r)?r.startTime+r.duration>=t:Ct(r)>=t),i=this._automationEvents[s];if(s!==-1&&(this._automationEvents=this._automationEvents.slice(0,s)),Yi(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&It(i)){if(r!==void 0&&yn(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:gt(r)?r.startTime+r.duration:Ct(r),a=r===void 0?this._defaultValue:gt(r)?r.values[r.values.length-1]:r.value,c=ds(i)?Ao(t,o,a,i):Co(t,o,a,i),l=ds(i)?To(c,t,this._currenTime):So(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&yn(r)&&this._automationEvents.push(Wi(this.getValue(t),t)),r!==void 0&&gt(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=fa(Al(r.values,r.duration,o),r.startTime,o)}}}else{const s=this._automationEvents.findIndex(o=>Ct(o)>t),i=s===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[s-1];if(i!==void 0&&gt(i)&&Ct(i)+i.duration>t)return!1;const r=ds(e)?To(e.value,e.endTime,this._currenTime):On(e)?So(e.value,t,this._currenTime):e;if(s===-1)this._automationEvents.push(r);else{if(gt(e)&&t+e.duration>Ct(this._automationEvents[s]))return!1;this._automationEvents.splice(s,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(s=>Ct(s)>e);if(t>1){const s=this._automationEvents.slice(t-1),i=s[0];yn(i)&&s.unshift(Wi(En(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=s}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>Ct(o)>e),s=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&yn(r)&&(s===void 0||!It(s)||s.insertTime>e))return ma(e,En(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&gr(r)&&(s===void 0||!It(s)))return r.value;if(r!==void 0&&gt(r)&&(s===void 0||!It(s)||r.startTime+r.duration>e))return e<r.startTime+r.duration?kl(e,r):r.values[r.values.length-1];if(r!==void 0&&It(r)&&(s===void 0||!It(s)))return r.value;if(s!==void 0&&ds(s)){const[o,a]=ko(this._automationEvents,i,r,s,this._defaultValue);return Ao(e,o,a,s)}if(s!==void 0&&On(s)){const[o,a]=ko(this._automationEvents,i,r,s,this._defaultValue);return Co(e,o,a,s)}return this._defaultValue}}const Nl=n=>({cancelTime:n,type:"cancelAndHold"}),Il=n=>({cancelTime:n,type:"cancelScheduledValues"}),Ml=(n,e)=>({endTime:e,type:"exponentialRampToValue",value:n}),Ol=(n,e)=>({endTime:e,type:"linearRampToValue",value:n}),El=(n,e,t)=>({startTime:e,target:n,timeConstant:t,type:"setTarget"}),Dl=()=>new DOMException("","AbortError"),Rl=n=>(e,t,[s,i,r],o)=>{n(e[i],[t,s,r],a=>a[0]===t&&a[1]===s,o)},$l=n=>(e,t,s)=>{const i=[];for(let r=0;r<s.numberOfInputs;r+=1)i.push(new Set);n.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},Pl=n=>(e,t)=>{n.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},_s=new WeakSet,ya=new WeakMap,yr=new WeakMap,va=new WeakMap,vr=new WeakMap,ii=new WeakMap,_a=new WeakMap,Xi=new WeakMap,Zi=new WeakMap,Ji=new WeakMap,xa={construct(){return xa}},Fl=n=>{try{const e=new Proxy(n,xa);new e}catch{return!1}return!0},No=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Io=(n,e)=>{const t=[];let s=n.replace(/^[\s]+/,""),i=s.match(No);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),s=s.slice(i[0].length).replace(/^[\s]+/,""),i=s.match(No)}return[t.join(";"),s]},Mo=n=>{if(n!==void 0&&!Array.isArray(n))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Oo=n=>{if(!Fl(n))throw new TypeError("The given value for processorCtor should be a constructor.");if(n.prototype===null||typeof n.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},Ll=(n,e,t,s,i,r,o,a,c,l,u,h,d)=>{let p=0;return(f,m,g={credentials:"omit"})=>{const y=u.get(f);if(y!==void 0&&y.has(m))return Promise.resolve();const w=l.get(f);if(w!==void 0){const v=w.get(m);if(v!==void 0)return v}const b=r(f),k=b.audioWorklet===void 0?i(m).then(([v,T])=>{const[S,x]=Io(v,T),I=`${S};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${x}
})})(window,'_AWGS')`;return t(I)}).then(()=>{const v=d._AWGS.pop();if(v===void 0)throw new SyntaxError;s(b.currentTime,b.sampleRate,()=>v(class{},void 0,(T,S)=>{if(T.trim()==="")throw e();const x=Zi.get(b);if(x!==void 0){if(x.has(T))throw e();Oo(S),Mo(S.parameterDescriptors),x.set(T,S)}else Oo(S),Mo(S.parameterDescriptors),Zi.set(b,new Map([[T,S]]))},b.sampleRate,void 0,void 0))}):Promise.all([i(m),Promise.resolve(n(h,h))]).then(([[v,T],S])=>{const x=p+1;p=x;const[I,_]=Io(v,T),E=`${I};((AudioWorkletProcessor,registerProcessor)=>{${_}
})(${S?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${S?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${S?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${x}',class extends AudioWorkletProcessor{process(){return !1}})`,$=new Blob([E],{type:"application/javascript; charset=utf-8"}),P=URL.createObjectURL($);return b.audioWorklet.addModule(P,g).then(()=>{if(a(b))return b;const L=o(b);return L.audioWorklet.addModule(P,g).then(()=>L)}).then(L=>{if(c===null)throw new SyntaxError;try{new c(L,`__sac${x}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(P))});return w===void 0?l.set(f,new Map([[m,k]])):w.set(m,k),k.then(()=>{const v=u.get(f);v===void 0?u.set(f,new Set([m])):v.add(m)}).finally(()=>{const v=l.get(f);v!==void 0&&v.delete(m)}),k}},nt=(n,e)=>{const t=n.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},ri=(n,e)=>{const t=Array.from(n).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[s]=t;return n.delete(s),s},ba=(n,e,t,s)=>{const i=nt(n,e),r=ri(i,o=>o[0]===t&&o[1]===s);return i.size===0&&n.delete(e),r},tn=n=>nt(_a,n),xs=n=>{if(_s.has(n))throw new Error("The AudioNode is already stored.");_s.add(n),tn(n).forEach(e=>e(!0))},wa=n=>"port"in n,sn=n=>{if(!_s.has(n))throw new Error("The AudioNode is not stored.");_s.delete(n),tn(n).forEach(e=>e(!1))},Qi=(n,e)=>{!wa(n)&&e.every(t=>t.size===0)&&sn(n)},Vl=(n,e,t,s,i,r,o,a,c,l,u,h,d)=>{const p=new WeakMap;return(f,m,g,y,w)=>{const{activeInputs:b,passiveInputs:k}=r(m),{outputs:v}=r(f),T=a(f),S=x=>{const I=c(m),_=c(f);if(x){const A=ba(k,f,g,y);n(b,f,A,!1),!w&&!h(f)&&t(_,I,g,y),d(m)&&xs(m)}else{const A=s(b,f,g,y);e(k,y,A,!1),!w&&!h(f)&&i(_,I,g,y);const C=o(m);if(C===0)u(m)&&Qi(m,b);else{const O=p.get(m);O!==void 0&&clearTimeout(O),p.set(m,setTimeout(()=>{u(m)&&Qi(m,b)},C*1e3))}}};return l(v,[m,g,y],x=>x[0]===m&&x[1]===g&&x[2]===y,!0)?(T.add(S),u(f)?n(b,f,[g,y,S],!0):e(k,y,[f,g,S],!0),!0):!1}},Bl=n=>(e,t,[s,i,r],o)=>{const a=e.get(s);a===void 0?e.set(s,new Set([[i,t,r]])):n(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},Ul=n=>(e,t)=>{const s=n(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(s).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(s),s.disconnect()};t.addEventListener("ended",i)},jl=n=>(e,t)=>{n(e).add(t)},ql={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},zl=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),u={...ql,...c},h=s(l,u),d=r(l)?e():null;super(a,!1,h,d),this._nativeAnalyserNode=h}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Ee=(n,e)=>n.context===e,Gl=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ee(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Dn=n=>{try{n.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},dt=()=>new DOMException("","IndexSizeError"),_r=n=>{n.getChannelData=(e=>t=>{try{return e.call(n,t)}catch(s){throw s.code===12?dt():s}})(n.getChannelData)},Wl={numberOfChannels:1},Yl=(n,e,t,s,i,r,o,a)=>{let c=null;return class Ta{constructor(u){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:h,numberOfChannels:d,sampleRate:p}={...Wl,...u};c===null&&(c=new i(1,1,44100));const f=s!==null&&e(r,r)?new s({length:h,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,h,p);if(f.numberOfChannels===0)throw t();return typeof f.copyFromChannel!="function"?(o(f),_r(f)):e(Dn,()=>Dn(f))||a(f),n.add(f),f}static[Symbol.hasInstance](u){return u!==null&&typeof u=="object"&&Object.getPrototypeOf(u)===Ta.prototype||n.has(u)}}},Ve=-34028234663852886e22,$e=-Ve,yt=n=>_s.has(n),Hl={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},Xl=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,u){const h=r(l),d={...Hl,...u},p=i(h,d),f=o(h),m=f?e():null;super(l,!1,p,m),this._audioBufferSourceNodeRenderer=m,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,f,p.playbackRate,$e,Ve)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw s();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const u=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=u;const h=this._nativeAudioBufferSourceNode.onended;this._onended=h!==null&&h===u?l:h}get playbackRate(){return this._playbackRate}start(l=0,u=0,h){if(this._nativeAudioBufferSourceNode.start(l,u,h),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=h===void 0?[l,u]:[l,u,h]),this.context.state!=="closed"){xs(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),yt(this)&&sn(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},Zl=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=Ee(h,u);if(!d){const p={buffer:h.buffer,channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,loop:h.loop,loopEnd:h.loopEnd,loopStart:h.loopStart,playbackRate:h.playbackRate.value};h=e(u,p),o!==null&&h.start(...o),a!==null&&h.stop(a)}return r.set(u,h),d?await n(u,l.playbackRate,h.playbackRate):await s(u,l.playbackRate,h.playbackRate),await i(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},Jl=n=>"playbackRate"in n,Ql=n=>"frequency"in n&&"gain"in n,Kl=n=>"offset"in n,eh=n=>!("frequency"in n)&&"gain"in n,th=n=>"detune"in n&&"frequency"in n&&!("gain"in n),sh=n=>"pan"in n,Pe=n=>nt(ya,n),nn=n=>nt(va,n),Ki=(n,e)=>{const{activeInputs:t}=Pe(n);t.forEach(i=>i.forEach(([r])=>{e.includes(n)||Ki(r,[...e,n])}));const s=Jl(n)?[n.playbackRate]:wa(n)?Array.from(n.parameters.values()):Ql(n)?[n.Q,n.detune,n.frequency,n.gain]:Kl(n)?[n.offset]:eh(n)?[n.gain]:th(n)?[n.detune,n.frequency]:sh(n)?[n.pan]:[];for(const i of s){const r=nn(i);r!==void 0&&r.activeInputs.forEach(([o])=>Ki(o,e))}yt(n)&&sn(n)},Sa=n=>{Ki(n.destination,[])},nh=n=>n===void 0||typeof n=="number"||typeof n=="string"&&(n==="balanced"||n==="interactive"||n==="playback"),ih=(n,e,t,s,i,r,o,a,c)=>class extends n{constructor(u={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let h;try{h=new c(u)}catch(f){throw f.code===12&&f.message==="sampleRate is not in range"?t():f}if(h===null)throw s();if(!nh(u.latencyHint))throw new TypeError(`The provided value '${u.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(u.sampleRate!==void 0&&h.sampleRate!==u.sampleRate)throw t();super(h,2);const{latencyHint:d}=u,{sampleRate:p}=h;if(this._baseLatency=typeof h.baseLatency=="number"?h.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=h,c.name==="webkitAudioContext"?(this._nativeGainNode=h.createGain(),this._nativeOscillatorNode=h.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,h.state==="running"){this._state="suspended";const f=()=>{this._state==="suspended"&&(this._state=null),h.removeEventListener("statechange",f)};h.addEventListener("statechange",f)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),Sa(this)}))}createMediaElementSource(u){return new i(this,{mediaElement:u})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(u){return new o(this,{mediaStream:u})}createMediaStreamTrackSource(u){return new a(this,{mediaStreamTrack:u})}resume(){return this._state==="suspended"?new Promise((u,h)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?u():this.resume().then(u,h)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(u=>{throw u===void 0||u.code===15?e():u})}suspend(){return this._nativeAudioContext.suspend().catch(u=>{throw u===void 0?e():u})}},rh=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,u){const h=r(l),d=o(h),p=i(h,u,d),f=d?e(a):null;super(l,!1,p,f),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw s();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},oh=n=>{const e=new WeakMap,t=async(s,i)=>{const r=i.destination;return e.set(i,r),await n(s,i,r),r};return{render(s,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(s,i)}}},ah=(n,e,t,s,i,r,o,a)=>(c,l)=>{const u=l.listener,h=()=>{const v=new Float32Array(1),T=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),S=o(l);let x=!1,I=[0,0,-1,0,1,0],_=[0,0,0];const A=()=>{if(x)return;x=!0;const $=s(l,256,9,0);$.onaudioprocess=({inputBuffer:P})=>{const L=[r(P,v,0),r(P,v,1),r(P,v,2),r(P,v,3),r(P,v,4),r(P,v,5)];L.some((B,z)=>B!==I[z])&&(u.setOrientation(...L),I=L);const W=[r(P,v,6),r(P,v,7),r(P,v,8)];W.some((B,z)=>B!==_[z])&&(u.setPosition(...W),_=W)},T.connect($)},C=$=>P=>{P!==I[$]&&(I[$]=P,u.setOrientation(...I))},O=$=>P=>{P!==_[$]&&(_[$]=P,u.setPosition(..._))},E=($,P,L)=>{const W=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:P});W.connect(T,0,$),W.start(),Object.defineProperty(W.offset,"defaultValue",{get(){return P}});const B=n({context:c},S,W.offset,$e,Ve);return a(B,"value",z=>()=>z.call(B),z=>q=>{try{z.call(B,q)}catch(oe){if(oe.code!==9)throw oe}A(),S&&L(q)}),B.cancelAndHoldAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.cancelAndHoldAtTime),B.cancelScheduledValues=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.cancelScheduledValues),B.exponentialRampToValueAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.exponentialRampToValueAtTime),B.linearRampToValueAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.linearRampToValueAtTime),B.setTargetAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.setTargetAtTime),B.setValueAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.setValueAtTime),B.setValueCurveAtTime=(z=>S?()=>{throw i()}:(...q)=>{const oe=z.apply(B,q);return A(),oe})(B.setValueCurveAtTime),B};return{forwardX:E(0,0,C(0)),forwardY:E(1,0,C(1)),forwardZ:E(2,-1,C(2)),positionX:E(6,0,O(0)),positionY:E(7,0,O(1)),positionZ:E(8,0,O(2)),upX:E(3,0,C(3)),upY:E(4,1,C(4)),upZ:E(5,0,C(5))}},{forwardX:d,forwardY:p,forwardZ:f,positionX:m,positionY:g,positionZ:y,upX:w,upY:b,upZ:k}=u.forwardX===void 0?h():u;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return f},get positionX(){return m},get positionY(){return g},get positionZ(){return y},get upX(){return w},get upY(){return b},get upZ(){return k}}},Rn=n=>"context"in n,rn=n=>Rn(n[0]),ns=(n,e,t,s)=>{for(const i of n)if(t(i)){if(s)return!1;throw Error("The set contains at least one similar element.")}return n.add(e),!0},Eo=(n,e,[t,s],i)=>{ns(n,[e,t,s],r=>r[0]===e&&r[1]===t,i)},Do=(n,[e,t,s],i)=>{const r=n.get(e);r===void 0?n.set(e,new Set([[t,s]])):ns(r,[t,s],o=>o[0]===t,i)},Ss=n=>"inputs"in n,$n=(n,e,t,s)=>{if(Ss(e)){const i=e.inputs[s];return n.connect(i,t,0),[i,t,0]}return n.connect(e,t,s),[e,t,s]},ka=(n,e,t)=>{for(const s of n)if(s[0]===e&&s[1]===t)return n.delete(s),s;return null},ch=(n,e,t)=>ri(n,s=>s[0]===e&&s[1]===t),Aa=(n,e)=>{if(!tn(n).delete(e))throw new Error("Missing the expected event listener.")},Ca=(n,e,t)=>{const s=nt(n,e),i=ri(s,r=>r[0]===t);return s.size===0&&n.delete(e),i},Pn=(n,e,t,s)=>{Ss(e)?n.disconnect(e.inputs[s],t,0):n.disconnect(e,t,s)},he=n=>nt(yr,n),Gs=n=>nt(vr,n),Kt=n=>Xi.has(n),Tn=n=>!_s.has(n),Ro=(n,e)=>new Promise(t=>{if(e!==null)t(!0);else{const s=n.createScriptProcessor(256,1,1),i=n.createGain(),r=n.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=n.createBufferSource();a.buffer=r,a.loop=!0,a.connect(s).connect(n.destination),a.connect(i),a.disconnect(i),s.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,u=>u===1)?t(!0):t(!1),a.stop(),s.onaudioprocess=null,a.disconnect(s),s.disconnect(n.destination)},a.start()}}),Fi=(n,e)=>{const t=new Map;for(const s of n)for(const i of s){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((s,i)=>e(i,s))},Fn=n=>"context"in n,lh=n=>{const e=new Map;n.connect=(t=>(s,i=0,r=0)=>{const o=Fn(s)?t(s,i,r):t(s,i),a=e.get(s);return a===void 0?e.set(s,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(n.connect.bind(n)),n.disconnect=(t=>(s,i,r)=>{if(t.apply(n),s===void 0)e.clear();else if(typeof s=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==s);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(s))if(i===void 0)e.delete(s);else{const o=e.get(s);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(s):e.set(s,a)}}for(const[o,a]of e)a.forEach(c=>{Fn(o)?n.connect(o,c.output,c.input):n.connect(o,c.output)})})(n.disconnect)},hh=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=nn(e),{outputs:o}=Pe(n),a=tn(n),c=l=>{const u=he(n),h=Gs(e);if(l){const d=Ca(r,n,t);Eo(i,n,d,!1),!s&&!Kt(n)&&u.connect(h,t)}else{const d=ch(i,n,t);Do(r,d,!1),!s&&!Kt(n)&&u.disconnect(h,t)}};return ns(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),yt(n)?Eo(i,n,[t,c],!0):Do(r,[n,t,c],!0),!0):!1},uh=(n,e,t,s)=>{const{activeInputs:i,passiveInputs:r}=Pe(e),o=ka(i[s],n,t);return o===null?[ba(r,n,t,s)[2],!1]:[o[2],!0]},dh=(n,e,t)=>{const{activeInputs:s,passiveInputs:i}=nn(e),r=ka(s,n,t);return r===null?[Ca(i,n,t)[1],!1]:[r[2],!0]},xr=(n,e,t,s,i)=>{const[r,o]=uh(n,t,s,i);if(r!==null&&(Aa(n,r),o&&!e&&!Kt(n)&&Pn(he(n),he(t),s,i)),yt(t)){const{activeInputs:a}=Pe(t);Qi(t,a)}},br=(n,e,t,s)=>{const[i,r]=dh(n,t,s);i!==null&&(Aa(n,i),r&&!e&&!Kt(n)&&he(n).disconnect(Gs(t),s))},ph=(n,e)=>{const t=Pe(n),s=[];for(const i of t.outputs)rn(i)?xr(n,e,...i):br(n,e,...i),s.push(i[0]);return t.outputs.clear(),s},fh=(n,e,t)=>{const s=Pe(n),i=[];for(const r of s.outputs)r[1]===t&&(rn(r)?xr(n,e,...r):br(n,e,...r),i.push(r[0]),s.outputs.delete(r));return i},mh=(n,e,t,s,i)=>{const r=Pe(n);return Array.from(r.outputs).filter(o=>o[0]===t&&(s===void 0||o[1]===s)&&(i===void 0||o[2]===i)).map(o=>(rn(o)?xr(n,e,...o):br(n,e,...o),r.outputs.delete(o),o[0]))},gh=(n,e,t,s,i,r,o,a,c,l,u,h,d,p,f,m)=>class extends l{constructor(y,w,b,k){super(b),this._context=y,this._nativeAudioNode=b;const v=u(y);h(v)&&t(Ro,()=>Ro(v,m))!==!0&&lh(b),yr.set(this,b),_a.set(this,new Set),y.state!=="closed"&&w&&xs(this),n(this,k,b)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(y){this._nativeAudioNode.channelCount=y}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(y){this._nativeAudioNode.channelCountMode=y}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(y){this._nativeAudioNode.channelInterpretation=y}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(y,w=0,b=0){if(w<0||w>=this._nativeAudioNode.numberOfOutputs)throw i();const k=u(this._context),v=f(k);if(d(y)||p(y))throw r();if(Rn(y)){const x=he(y);try{const _=$n(this._nativeAudioNode,x,w,b),A=Tn(this);(v||A)&&this._nativeAudioNode.disconnect(..._),this.context.state!=="closed"&&!A&&Tn(y)&&xs(y)}catch(_){throw _.code===12?r():_}if(e(this,y,w,b,v)){const _=c([this],y);Fi(_,s(v))}return y}const T=Gs(y);if(T.name==="playbackRate"&&T.maxValue===1024)throw o();try{this._nativeAudioNode.connect(T,w),(v||Tn(this))&&this._nativeAudioNode.disconnect(T,w)}catch(x){throw x.code===12?r():x}if(hh(this,y,w,v)){const x=c([this],y);Fi(x,s(v))}}disconnect(y,w,b){let k;const v=u(this._context),T=f(v);if(y===void 0)k=ph(this,T);else if(typeof y=="number"){if(y<0||y>=this.numberOfOutputs)throw i();k=fh(this,T,y)}else{if(w!==void 0&&(w<0||w>=this.numberOfOutputs)||Rn(y)&&b!==void 0&&(b<0||b>=y.numberOfInputs))throw i();if(k=mh(this,T,y,w,b),k.length===0)throw r()}for(const S of k){const x=c([this],S);Fi(x,a)}}},yh=(n,e,t,s,i,r,o,a,c,l,u,h,d)=>(p,f,m,g=null,y=null)=>{const w=m.value,b=new Cl(w),k=f?s(b):null,v={get defaultValue(){return w},get maxValue(){return g===null?m.maxValue:g},get minValue(){return y===null?m.minValue:y},get value(){return m.value},set value(T){m.value=T,v.setValueAtTime(T,p.context.currentTime)},cancelAndHoldAtTime(T){if(typeof m.cancelAndHoldAtTime=="function")k===null&&b.flush(p.context.currentTime),b.add(i(T)),m.cancelAndHoldAtTime(T);else{const S=Array.from(b).pop();k===null&&b.flush(p.context.currentTime),b.add(i(T));const x=Array.from(b).pop();m.cancelScheduledValues(T),S!==x&&x!==void 0&&(x.type==="exponentialRampToValue"?m.exponentialRampToValueAtTime(x.value,x.endTime):x.type==="linearRampToValue"?m.linearRampToValueAtTime(x.value,x.endTime):x.type==="setValue"?m.setValueAtTime(x.value,x.startTime):x.type==="setValueCurve"&&m.setValueCurveAtTime(x.values,x.startTime,x.duration))}return v},cancelScheduledValues(T){return k===null&&b.flush(p.context.currentTime),b.add(r(T)),m.cancelScheduledValues(T),v},exponentialRampToValueAtTime(T,S){if(T===0)throw new RangeError;if(!Number.isFinite(S)||S<0)throw new RangeError;const x=p.context.currentTime;return k===null&&b.flush(x),Array.from(b).length===0&&(b.add(l(w,x)),m.setValueAtTime(w,x)),b.add(o(T,S)),m.exponentialRampToValueAtTime(T,S),v},linearRampToValueAtTime(T,S){const x=p.context.currentTime;return k===null&&b.flush(x),Array.from(b).length===0&&(b.add(l(w,x)),m.setValueAtTime(w,x)),b.add(a(T,S)),m.linearRampToValueAtTime(T,S),v},setTargetAtTime(T,S,x){return k===null&&b.flush(p.context.currentTime),b.add(c(T,S,x)),m.setTargetAtTime(T,S,x),v},setValueAtTime(T,S){return k===null&&b.flush(p.context.currentTime),b.add(l(T,S)),m.setValueAtTime(T,S),v},setValueCurveAtTime(T,S,x){const I=T instanceof Float32Array?T:new Float32Array(T);if(h!==null&&h.name==="webkitAudioContext"){const _=S+x,A=p.context.sampleRate,C=Math.ceil(S*A),O=Math.floor(_*A),E=O-C,$=new Float32Array(E);for(let L=0;L<E;L+=1){const W=(I.length-1)/x*((C+L)/A-S),B=Math.floor(W),z=Math.ceil(W);$[L]=B===z?I[B]:(1-(W-B))*I[B]+(1-(z-W))*I[z]}k===null&&b.flush(p.context.currentTime),b.add(u($,S,x)),m.setValueCurveAtTime($,S,x);const P=O/A;P<_&&d(v,$[$.length-1],P),d(v,I[I.length-1],_)}else k===null&&b.flush(p.context.currentTime),b.add(u(I,S,x)),m.setValueCurveAtTime(I,S,x);return v}};return t.set(v,m),e.set(v,p),n(v,k),v},vh=n=>({replay(e){for(const t of n)if(t.type==="exponentialRampToValue"){const{endTime:s,value:i}=t;e.exponentialRampToValueAtTime(i,s)}else if(t.type==="linearRampToValue"){const{endTime:s,value:i}=t;e.linearRampToValueAtTime(i,s)}else if(t.type==="setTarget"){const{startTime:s,target:i,timeConstant:r}=t;e.setTargetAtTime(i,s,r)}else if(t.type==="setValue"){const{startTime:s,value:i}=t;e.setValueAtTime(i,s)}else if(t.type==="setValueCurve"){const{duration:s,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,s)}else throw new Error("Can't apply an unknown automation.")}});class Na{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((s,i)=>e.call(t,s,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const _h={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},xh=(n,e,t,s,i,r,o,a,c,l,u,h,d,p)=>class extends e{constructor(m,g,y){var w;const b=a(m),k=c(b),v=u({..._h,...y});d(v);const T=Zi.get(b),S=T?.get(g),x=k||b.state!=="closed"?b:(w=o(b))!==null&&w!==void 0?w:b,I=i(x,k?null:m.baseLatency,l,g,S,v),_=k?s(g,v,S):null;super(m,!0,I,_);const A=[];I.parameters.forEach((O,E)=>{const $=t(this,k,O);A.push([E,$])}),this._nativeAudioWorkletNode=I,this._onprocessorerror=null,this._parameters=new Na(A),k&&n(b,this);const{activeInputs:C}=r(this);h(I,C)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(m){const g=typeof m=="function"?p(this,m):null;this._nativeAudioWorkletNode.onprocessorerror=g;const y=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=y!==null&&y===g?m:y}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function Ln(n,e,t,s,i){if(typeof n.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),n.copyFromChannel(e[t],s,i);else{const r=n.getChannelData(s);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const Ia=(n,e,t,s,i)=>{typeof n.copyToChannel=="function"?e[t].byteLength!==0&&n.copyToChannel(e[t],s,i):e[t].byteLength!==0&&n.getChannelData(s).set(e[t],i)},Vn=(n,e)=>{const t=[];for(let s=0;s<n;s+=1){const i=[],r=typeof e=="number"?e:e[s];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},bh=(n,e)=>{const t=nt(Ji,n),s=he(e);return nt(t,s)},wh=async(n,e,t,s,i,r,o)=>{const a=e===null?Math.ceil(n.context.length/128)*128:e.length,c=s.channelCount*s.numberOfInputs,l=i.reduce((g,y)=>g+y,0),u=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const h=Pe(n),d=await bh(t,n),p=Vn(s.numberOfInputs,s.channelCount),f=Vn(s.numberOfOutputs,i),m=Array.from(n.parameters.keys()).reduce((g,y)=>({...g,[y]:new Float32Array(128)}),{});for(let g=0;g<a;g+=128){if(s.numberOfInputs>0&&e!==null)for(let y=0;y<s.numberOfInputs;y+=1)for(let w=0;w<s.channelCount;w+=1)Ln(e,p[y],w,w,g);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:y},w)=>{Ln(e,m,y,c+w,g)});for(let y=0;y<s.numberOfInputs;y+=1)for(let w=0;w<i[y];w+=1)f[y][w].byteLength===0&&(f[y][w]=new Float32Array(128));try{const y=p.map((b,k)=>h.activeInputs[k].size===0?[]:b),w=o(g/t.sampleRate,t.sampleRate,()=>d.process(y,f,m));if(u!==null)for(let b=0,k=0;b<s.numberOfOutputs;b+=1){for(let v=0;v<i[b];v+=1)Ia(u,f[b],v,k+v,g);k+=i[b]}if(!w)break}catch(y){n.dispatchEvent(new ErrorEvent("processorerror",{colno:y.colno,filename:y.filename,lineno:y.lineno,message:y.message}));break}}return u},Th=(n,e,t,s,i,r,o,a,c,l,u,h,d,p,f,m)=>(g,y,w)=>{const b=new WeakMap;let k=null;const v=async(T,S)=>{let x=u(T),I=null;const _=Ee(x,S),A=Array.isArray(y.outputChannelCount)?y.outputChannelCount:Array.from(y.outputChannelCount);if(h===null){const C=A.reduce((P,L)=>P+L,0),O=i(S,{channelCount:Math.max(1,C),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,C)}),E=[];for(let P=0;P<T.numberOfOutputs;P+=1)E.push(s(S,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:A[P]}));const $=o(S,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1});$.connect=e.bind(null,E),$.disconnect=c.bind(null,E),I=[O,E,$]}else _||(x=new h(S,g));if(b.set(S,I===null?x:I[2]),I!==null){if(k===null){if(w===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const L=T.channelCount*T.numberOfInputs,W=w.parameterDescriptors===void 0?0:w.parameterDescriptors.length,B=L+W;k=wh(T,B===0?null:await(async()=>{const q=new d(B,Math.ceil(T.context.length/128)*128,S.sampleRate),oe=[],qe=[];for(let de=0;de<y.numberOfInputs;de+=1)oe.push(o(q,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1})),qe.push(i(q,{channelCount:y.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:y.channelCount}));const ze=await Promise.all(Array.from(T.parameters.values()).map(async de=>{const Re=r(q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:de.value});return await p(q,de,Re.offset),Re})),X=s(q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,L+W)});for(let de=0;de<y.numberOfInputs;de+=1){oe[de].connect(qe[de]);for(let Re=0;Re<y.channelCount;Re+=1)qe[de].connect(X,Re,de*y.channelCount+Re)}for(const[de,Re]of ze.entries())Re.connect(X,0,L+de),Re.start(0);return X.connect(q.destination),await Promise.all(oe.map(de=>f(T,q,de))),m(q)})(),S,y,A,w,l)}const C=await k,O=t(S,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[E,$,P]=I;C!==null&&(O.buffer=C,O.start(0)),O.connect(E);for(let L=0,W=0;L<T.numberOfOutputs;L+=1){const B=$[L];for(let z=0;z<A[L];z+=1)E.connect(B,W+z,z);W+=A[L]}return P}if(_)for(const[C,O]of T.parameters.entries())await n(S,O,x.parameters.get(C));else for(const[C,O]of T.parameters.entries())await p(S,O,x.parameters.get(C));return await f(T,S,x),x};return{render(T,S){a(S,T);const x=b.get(S);return x!==void 0?Promise.resolve(x):v(T,S)}}},Sh=(n,e,t,s,i,r,o,a,c,l,u,h,d,p,f,m,g,y,w,b)=>class extends f{constructor(v,T){super(v,T),this._nativeContext=v,this._audioWorklet=n===void 0?void 0:{addModule:(S,x)=>n(this,S,x)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(v,T,S){return new t({length:T,numberOfChannels:v,sampleRate:S})}createBufferSource(){return new s(this)}createChannelMerger(v=6){return new r(this,{numberOfInputs:v})}createChannelSplitter(v=6){return new o(this,{numberOfOutputs:v})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(v=1){return new u(this,{maxDelayTime:v})}createDynamicsCompressor(){return new h(this)}createGain(){return new d(this)}createIIRFilter(v,T){return new p(this,{feedback:T,feedforward:v})}createOscillator(){return new m(this)}createPanner(){return new g(this)}createPeriodicWave(v,T,S={disableNormalization:!1}){return new y(this,{...S,imag:T,real:v})}createStereoPanner(){return new w(this)}createWaveShaper(){return new b(this)}decodeAudioData(v,T,S){return l(this._nativeContext,v).then(x=>(typeof T=="function"&&T(x),x),x=>{throw typeof S=="function"&&S(x),x})}},kh={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},Ah=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,u){const h=r(l),d={...kh,...u},p=i(h,d),f=o(h),m=f?t():null;super(l,!1,p,m),this._Q=e(this,f,p.Q,$e,Ve),this._detune=e(this,f,p.detune,1200*Math.log2($e),-1200*Math.log2($e)),this._frequency=e(this,f,p.frequency,l.sampleRate/2,0),this._gain=e(this,f,p.gain,40*Math.log10($e),Ve),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,u,h){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,u,h)}catch(d){throw d.code===11?s():d}if(l.length!==u.length||u.length!==h.length)throw s()}},Ch=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ee(l,c);if(!u){const h={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,h)}return r.set(c,l),u?(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)):(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Nh=(n,e)=>(t,s)=>{const i=e.get(t);if(i!==void 0)return i;const r=n.get(t);if(r!==void 0)return r;try{const o=s();return o instanceof Promise?(n.set(t,o),o.catch(()=>!1).then(a=>(n.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},Ih={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},Mh=(n,e,t,s,i)=>class extends n{constructor(o,a){const c=s(o),l={...Ih,...a},u=t(c,l),h=i(c)?e():null;super(o,!1,u,h)}},Oh=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ee(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Eh={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},Dh=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),u=r({...Eh,...c}),h=t(l,u),d=i(l)?e():null;super(a,!1,h,d)}},Rh=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ee(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=n(o,l)}return s.set(o,a),await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},$h=n=>(e,t,s)=>n(t,e,s),Ph=n=>(e,t,s=0,i=0)=>{const r=e[s];if(r===void 0)throw n();return Fn(t)?r.connect(t,0,i):r.connect(t,0)},Fh=n=>(e,t)=>{const s=n(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return s.buffer=i,s.loop=!0,s.connect(t),s.start(),()=>{s.stop(),s.disconnect(t)}},Lh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},Vh=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const u=i(c),h={...Lh,...l},d=s(u,h),p=r(u),f=p?t():null;super(c,!1,d,f),this._constantSourceNodeRenderer=f,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,$e,Ve),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const u=this._nativeConstantSourceNode.onended;this._onended=u!==null&&u===l?c:u}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){xs(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),yt(this)&&sn(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},Bh=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=Ee(h,u);if(!d){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,offset:h.offset.value};h=e(u,p),o!==null&&h.start(o),a!==null&&h.stop(a)}return r.set(u,h),d?await n(u,l.offset,h.offset):await s(u,l.offset,h.offset),await i(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},Uh=n=>e=>(n[0]=e,n[0]),jh={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},qh=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),u={...jh,...c},h=t(l,u),p=i(l)?e():null;super(a,!1,h,p),this._isBufferNullified=!1,this._nativeConvolverNode=h,u.buffer!==null&&r(this,u.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},zh=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ee(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=n(o,l)}return s.set(o,a),Ss(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Gh=(n,e)=>(t,s,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,s,i)}catch(r){throw r.name==="SyntaxError"?n():r}},Wh=()=>new DOMException("","DataCloneError"),$o=n=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(s=>{const i=()=>{t.onmessage=null,e.close(),t.close(),s()};t.onmessage=()=>i();try{e.postMessage(n,[n])}catch{}finally{i()}})},Yh=(n,e,t,s,i,r,o,a,c,l,u)=>(h,d)=>{const p=o(h)?h:r(h);if(i.has(d)){const f=t();return Promise.reject(f)}try{i.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(f=>($o(d).catch(()=>{}),e(a,()=>a(f))||u(f),n.add(f),f)):new Promise((f,m)=>{const g=async()=>{try{await $o(d)}catch{}},y=w=>{m(w),g()};try{p.decodeAudioData(d,w=>{typeof w.copyFromChannel!="function"&&(l(w),_r(w)),n.add(w),g().then(()=>f(w))},w=>{y(w===null?s():w)})}catch(w){y(w)}})},Hh=(n,e,t,s,i,r,o,a)=>(c,l)=>{const u=e.get(c);if(u===void 0)throw new Error("Missing the expected cycle count.");const h=r(c.context),d=a(h);if(u===l){if(e.delete(c),!d&&o(c)){const p=s(c),{outputs:f}=t(c);for(const m of f)if(rn(m)){const g=s(m[0]);n(p,g,m[1],m[2])}else{const g=i(m[0]);p.connect(g,m[1])}}}else e.set(c,u-l)},Xh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},Zh=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const u=i(c),h={...Xh,...l},d=s(u,h),p=r(u),f=p?t(h.maxDelayTime):null;super(c,!1,d,f),this._delayTime=e(this,p,d.delayTime),o(this,h.maxDelayTime)}get delayTime(){return this._delayTime}},Jh=(n,e,t,s,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let u=t(c);const h=Ee(u,l);if(!h){const d={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,delayTime:u.delayTime.value,maxDelayTime:r};u=e(l,d)}return o.set(l,u),h?await n(l,c.delayTime,u.delayTime):await s(l,c.delayTime,u.delayTime),await i(c,l,u),u};return{render(c,l){const u=o.get(l);return u!==void 0?Promise.resolve(u):a(c,l)}}},Qh=n=>(e,t,s,i)=>n(e[i],r=>r[0]===t&&r[1]===s),Kh=n=>(e,t)=>{n(e).delete(t)},eu=n=>"delayTime"in n,tu=(n,e,t)=>function s(i,r){const o=Rn(r)?r:t(n,r);if(eu(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>s([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},vn=(n,e,t)=>{const s=e[t];if(s===void 0)throw n();return s},su=n=>(e,t=void 0,s=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?vn(n,e,t).disconnect():Fn(t)?s===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?vn(n,e,s).disconnect(t,0):vn(n,e,s).disconnect(t,0,i):s===void 0?e.forEach(r=>r.disconnect(t)):vn(n,e,s).disconnect(t,0),nu={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},iu=(n,e,t,s,i,r,o,a)=>class extends n{constructor(l,u){const h=r(l),d={...nu,...u},p=s(h,d),f=o(h),m=f?t():null;super(l,!1,p,m),this._attack=e(this,f,p.attack),this._knee=e(this,f,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,f,p.ratio),this._release=e(this,f,p.release),this._threshold=e(this,f,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const u=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=u,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const u=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=u,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},ru=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ee(l,c);if(!u){const h={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,h)}return r.set(c,l),u?(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)):(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},ou=()=>new DOMException("","EncodingError"),au=n=>e=>new Promise((t,s)=>{if(n===null){s(new SyntaxError);return}const i=n.document.head;if(i===null)s(new SyntaxError);else{const r=n.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=n.onerror,l=()=>{n.onerror=c,URL.revokeObjectURL(a)};n.onerror=(u,h,d,p,f)=>{if(h===a||h===n.location.href&&d===1&&p===1)return l(),s(f),!1;if(c!==null)return c(u,h,d,p,f)},r.onerror=()=>{l(),s(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),cu=n=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,s,i){if(s!==null){let r=this._listeners.get(s);r===void 0&&(r=n(this,s),typeof s=="function"&&this._listeners.set(s,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,s,i){const r=s===null?void 0:this._listeners.get(s);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},lu=n=>(e,t,s)=>{Object.defineProperties(n,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return s()}finally{n!==null&&(delete n.currentFrame,delete n.currentTime)}},hu=n=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw n()},uu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},du=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),u={...uu,...c},h=s(l,u),d=r(l),p=d?t():null;super(a,!1,h,p),this._gain=e(this,d,h.gain,$e,Ve)}get gain(){return this._gain}},pu=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ee(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,h)}return r.set(c,l),u?await n(c,a.gain,l.gain):await s(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},fu=(n,e)=>t=>e(n,t),mu=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},gu=n=>e=>{var t;return(t=n.get(e))!==null&&t!==void 0?t:0},yu=n=>e=>{const t=n(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},vu=n=>e=>n.get(e),Ae=()=>new DOMException("","InvalidStateError"),_u=n=>e=>{const t=n.get(e);if(t===void 0)throw Ae();return t},xu=(n,e)=>t=>{let s=n.get(t);if(s!==void 0)return s;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return s=new e(1,1,44100),n.set(t,s),s},bu=n=>e=>{const t=n.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},oi=()=>new DOMException("","InvalidAccessError"),wu=n=>{n.getFrequencyResponse=(e=>(t,s,i)=>{if(t.length!==s.length||s.length!==i.length)throw oi();return e.call(n,t,s,i)})(n.getFrequencyResponse)},Tu={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Su=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=s(a),u=i(l),h={...Tu,...c},d=e(l,u?null:a.baseLatency,h),p=u?t(h.feedback,h.feedforward):null;super(a,!1,d,p),wu(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},Ma=(n,e,t,s,i,r,o,a,c,l,u)=>{const h=l.length;let d=a;for(let p=0;p<h;p+=1){let f=t[0]*l[p];for(let m=1;m<i;m+=1){const g=d-m&c-1;f+=t[m]*r[g],f-=n[m]*o[g]}for(let m=i;m<s;m+=1)f+=t[m]*r[d-m&c-1];for(let m=i;m<e;m+=1)f-=n[m]*o[d-m&c-1];r[d]=l[p],o[d]=f,d=d+1&c-1,u[p]=f}return d},ku=(n,e,t,s)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=s instanceof Float64Array?s:new Float64Array(s),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let f=0;f<o;f+=1)r[f]/=i[0];for(let f=1;f<a;f+=1)i[f]/=i[0]}const l=32,u=new Float32Array(l),h=new Float32Array(l),d=e.createBuffer(n.numberOfChannels,n.length,n.sampleRate),p=n.numberOfChannels;for(let f=0;f<p;f+=1){const m=n.getChannelData(f),g=d.getChannelData(f);u.fill(0),h.fill(0),Ma(i,o,r,a,c,u,h,0,l,m,g)}return d},Au=(n,e,t,s,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(u,h)=>{let d=null,p=e(u);const f=Ee(p,h);if(h.createIIRFilter===void 0?d=n(h,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):f||(p=h.createIIRFilter(o,r)),a.set(h,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const g=new t(u.context.destination.channelCount,u.context.length,h.sampleRate);c=(async()=>{await s(u,g,g.destination);const y=await i(g);return ku(y,h,r,o)})()}const m=await c;return d.buffer=m,d.start(0),d}return await s(u,h,p),p};return{render(u,h){const d=a.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},Cu=(n,e,t,s,i,r)=>o=>(a,c)=>{const l=n.get(a);if(l===void 0){if(!o&&r(a)){const u=s(a),{outputs:h}=t(a);for(const d of h)if(rn(d)){const p=s(d[0]);e(u,p,d[1],d[2])}else{const p=i(d[0]);u.disconnect(p,d[1])}}n.set(a,c)}else n.set(a,l+c)},Nu=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},Iu=(n,e)=>t=>n.has(t)||e(t),Mu=(n,e)=>t=>n.has(t)||e(t),Ou=(n,e)=>t=>{const s=n.get(t);return e(s)||e(t)},Eu=n=>e=>n!==null&&e instanceof n,Du=n=>e=>n!==null&&typeof n.AudioNode=="function"&&e instanceof n.AudioNode,Ru=n=>e=>n!==null&&typeof n.AudioParam=="function"&&e instanceof n.AudioParam,$u=(n,e)=>t=>n(t)||e(t),Pu=n=>e=>n!==null&&e instanceof n,Fu=n=>n!==null&&n.isSecureContext,Lu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},Vu={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},Bu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r);if(s(a))throw new TypeError;const c={...Vu,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},Uu=(n,e,t,s)=>class extends n{constructor(r,o){const a=t(r),c=e(a,o);if(s(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},ju=(n,e,t)=>class extends n{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},qu=(n,e,t,s,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,ii.set(this,a),s(a)&&i.set(a,new Set),this._destination=new n(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},Ws=n=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=n.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},zu=(n,e)=>(t,s,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const u=r.size===0;if(e(a))return o.call(t,a,c,l),n(r,[a,c,l],h=>h[0]===a&&h[1]===c&&h[2]===l,!0),u&&s(),a;o.call(t,a,c),n(r,[a,c],h=>h[0]===a&&h[1]===c,!0),u&&s()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const u=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const h=r.size===0;u&&h&&i()})(t.disconnect),t},pe=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t]&&(n[t]=s)},ke=(n,e)=>{pe(n,e,"channelCount"),pe(n,e,"channelCountMode"),pe(n,e,"channelInterpretation")},Po=n=>typeof n.getFloatTimeDomainData=="function",Gu=n=>{n.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);n.getByteTimeDomainData(t);const s=Math.max(t.length,n.fftSize);for(let i=0;i<s;i+=1)e[i]=(t[i]-128)*.0078125;return e}},Wu=(n,e)=>(t,s)=>{const i=t.createAnalyser();if(ke(i,s),!(s.maxDecibels>s.minDecibels))throw e();return pe(i,s,"fftSize"),pe(i,s,"maxDecibels"),pe(i,s,"minDecibels"),pe(i,s,"smoothingTimeConstant"),n(Po,()=>Po(i))||Gu(i),i},Yu=n=>n===null?null:n.hasOwnProperty("AudioBuffer")?n.AudioBuffer:null,ye=(n,e,t)=>{const s=e[t];s!==void 0&&s!==n[t].value&&(n[t].value=s)},Hu=n=>{n.start=(e=>{let t=!1;return(s=0,i=0,r)=>{if(t)throw Ae();e.call(n,s,i,r),t=!0}})(n.start)},wr=n=>{n.start=(e=>(t=0,s=0,i)=>{if(typeof i=="number"&&i<0||s<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(n,t,s,i)})(n.start)},Tr=n=>{n.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(n,t)})(n.stop)},Xu=(n,e,t,s,i,r,o,a,c,l,u)=>(h,d)=>{const p=h.createBufferSource();return ke(p,d),ye(p,d,"playbackRate"),pe(p,d,"buffer"),pe(p,d,"loop"),pe(p,d,"loopEnd"),pe(p,d,"loopStart"),e(t,()=>t(h))||Hu(p),e(s,()=>s(h))||c(p),e(i,()=>i(h))||l(p,h),e(r,()=>r(h))||wr(p),e(o,()=>o(h))||u(p,h),e(a,()=>a(h))||Tr(p),n(h,p),p},Zu=n=>n===null?null:n.hasOwnProperty("AudioContext")?n.AudioContext:n.hasOwnProperty("webkitAudioContext")?n.webkitAudioContext:null,Ju=(n,e)=>(t,s,i)=>{const r=t.destination;if(r.channelCount!==s)try{r.channelCount=s}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:s});const o=n(t,{channelCount:s,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Qu=n=>n===null?null:n.hasOwnProperty("AudioWorkletNode")?n.AudioWorkletNode:null,Ku=n=>{const{port1:e}=new MessageChannel;try{e.postMessage(n)}finally{e.close()}},ed=(n,e,t,s,i)=>(r,o,a,c,l,u)=>{if(a!==null)try{const h=new a(r,c,u),d=new Map;let p=null;if(Object.defineProperties(h,{channelCount:{get:()=>u.channelCount,set:()=>{throw n()}},channelCountMode:{get:()=>"explicit",set:()=>{throw n()}},onprocessorerror:{get:()=>p,set:f=>{typeof p=="function"&&h.removeEventListener("processorerror",p),p=typeof f=="function"?f:null,typeof p=="function"&&h.addEventListener("processorerror",p)}}}),h.addEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=typeof m[1]=="function"?m[1]:typeof m[1]=="object"&&m[1]!==null&&typeof m[1].handleEvent=="function"?m[1].handleEvent:null;if(g!==null){const y=d.get(m[1]);y!==void 0?m[1]=y:(m[1]=w=>{w.type==="error"?(Object.defineProperties(w,{type:{value:"processorerror"}}),g(w)):g(new ErrorEvent(m[0],{...w}))},d.set(g,m[1]))}}return f.call(h,"error",m[1],m[2]),f.call(h,...m)})(h.addEventListener),h.removeEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=d.get(m[1]);g!==void 0&&(d.delete(m[1]),m[1]=g)}return f.call(h,"error",m[1],m[2]),f.call(h,m[0],m[1],m[2])})(h.removeEventListener),u.numberOfOutputs!==0){const f=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return h.connect(f).connect(r.destination),i(h,()=>f.disconnect(),()=>f.connect(r.destination))}return h}catch(h){throw h.code===11?s():h}if(l===void 0)throw s();return Ku(u),e(r,o,l,u)},Oa=(n,e)=>n===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(n*e))))),td=n=>new Promise((e,t)=>{const{port1:s,port2:i}=new MessageChannel;s.onmessage=({data:r})=>{s.close(),i.close(),e(r)},s.onmessageerror=({data:r})=>{s.close(),i.close(),t(r)},i.postMessage(n)}),sd=async(n,e)=>{const t=await td(e);return new n(t)},nd=(n,e,t,s)=>{let i=Ji.get(n);i===void 0&&(i=new WeakMap,Ji.set(n,i));const r=sd(t,s);return i.set(e,r),r},id=(n,e,t,s,i,r,o,a,c,l,u,h,d)=>(p,f,m,g)=>{if(g.numberOfInputs===0&&g.numberOfOutputs===0)throw c();const y=Array.isArray(g.outputChannelCount)?g.outputChannelCount:Array.from(g.outputChannelCount);if(y.some(D=>D<1))throw c();if(y.length!==g.numberOfOutputs)throw e();if(g.channelCountMode!=="explicit")throw c();const w=g.channelCount*g.numberOfInputs,b=y.reduce((D,j)=>D+j,0),k=m.parameterDescriptors===void 0?0:m.parameterDescriptors.length;if(w+k>6||b>6)throw c();const v=new MessageChannel,T=[],S=[];for(let D=0;D<g.numberOfInputs;D+=1)T.push(o(p,{channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation,gain:1})),S.push(i(p,{channelCount:g.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:g.channelCount}));const x=[];if(m.parameterDescriptors!==void 0)for(const{defaultValue:D,maxValue:j,minValue:Se,name:fe}of m.parameterDescriptors){const te=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:g.parameterData[fe]!==void 0?g.parameterData[fe]:D===void 0?0:D});Object.defineProperties(te.offset,{defaultValue:{get:()=>D===void 0?0:D},maxValue:{get:()=>j===void 0?$e:j},minValue:{get:()=>Se===void 0?Ve:Se}}),x.push(te)}const I=s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,w+k)}),_=Oa(f,p.sampleRate),A=a(p,_,w+k,Math.max(1,b)),C=i(p,{channelCount:Math.max(1,b),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,b)}),O=[];for(let D=0;D<g.numberOfOutputs;D+=1)O.push(s(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:y[D]}));for(let D=0;D<g.numberOfInputs;D+=1){T[D].connect(S[D]);for(let j=0;j<g.channelCount;j+=1)S[D].connect(I,j,D*g.channelCount+j)}const E=new Na(m.parameterDescriptors===void 0?[]:m.parameterDescriptors.map(({name:D},j)=>{const Se=x[j];return Se.connect(I,0,w+j),Se.start(0),[D,Se.offset]}));I.connect(A);let $=g.channelInterpretation,P=null;const L=g.numberOfOutputs===0?[A]:O,W={get bufferSize(){return _},get channelCount(){return g.channelCount},set channelCount(D){throw t()},get channelCountMode(){return g.channelCountMode},set channelCountMode(D){throw t()},get channelInterpretation(){return $},set channelInterpretation(D){for(const j of T)j.channelInterpretation=D;$=D},get context(){return A.context},get inputs(){return T},get numberOfInputs(){return g.numberOfInputs},get numberOfOutputs(){return g.numberOfOutputs},get onprocessorerror(){return P},set onprocessorerror(D){typeof P=="function"&&W.removeEventListener("processorerror",P),P=typeof D=="function"?D:null,typeof P=="function"&&W.addEventListener("processorerror",P)},get parameters(){return E},get port(){return v.port2},addEventListener(...D){return A.addEventListener(D[0],D[1],D[2])},connect:n.bind(null,L),disconnect:l.bind(null,L),dispatchEvent(...D){return A.dispatchEvent(D[0])},removeEventListener(...D){return A.removeEventListener(D[0],D[1],D[2])}},B=new Map;v.port1.addEventListener=(D=>(...j)=>{if(j[0]==="message"){const Se=typeof j[1]=="function"?j[1]:typeof j[1]=="object"&&j[1]!==null&&typeof j[1].handleEvent=="function"?j[1].handleEvent:null;if(Se!==null){const fe=B.get(j[1]);fe!==void 0?j[1]=fe:(j[1]=te=>{u(p.currentTime,p.sampleRate,()=>Se(te))},B.set(Se,j[1]))}}return D.call(v.port1,j[0],j[1],j[2])})(v.port1.addEventListener),v.port1.removeEventListener=(D=>(...j)=>{if(j[0]==="message"){const Se=B.get(j[1]);Se!==void 0&&(B.delete(j[1]),j[1]=Se)}return D.call(v.port1,j[0],j[1],j[2])})(v.port1.removeEventListener);let z=null;Object.defineProperty(v.port1,"onmessage",{get:()=>z,set:D=>{typeof z=="function"&&v.port1.removeEventListener("message",z),z=typeof D=="function"?D:null,typeof z=="function"&&(v.port1.addEventListener("message",z),v.port1.start())}}),m.prototype.port=v.port1;let q=null;nd(p,W,m,g).then(D=>q=D);const qe=Vn(g.numberOfInputs,g.channelCount),ze=Vn(g.numberOfOutputs,y),X=m.parameterDescriptors===void 0?[]:m.parameterDescriptors.reduce((D,{name:j})=>({...D,[j]:new Float32Array(128)}),{});let de=!0;const Re=()=>{g.numberOfOutputs>0&&A.disconnect(C);for(let D=0,j=0;D<g.numberOfOutputs;D+=1){const Se=O[D];for(let fe=0;fe<y[D];fe+=1)C.disconnect(Se,j+fe,fe);j+=y[D]}},V=new Map;A.onaudioprocess=({inputBuffer:D,outputBuffer:j})=>{if(q!==null){const Se=h(W);for(let fe=0;fe<_;fe+=128){for(let te=0;te<g.numberOfInputs;te+=1)for(let ge=0;ge<g.channelCount;ge+=1)Ln(D,qe[te],ge,ge,fe);m.parameterDescriptors!==void 0&&m.parameterDescriptors.forEach(({name:te},ge)=>{Ln(D,X,te,w+ge,fe)});for(let te=0;te<g.numberOfInputs;te+=1)for(let ge=0;ge<y[te];ge+=1)ze[te][ge].byteLength===0&&(ze[te][ge]=new Float32Array(128));try{const te=qe.map((Ze,kt)=>{if(Se[kt].size>0)return V.set(kt,_/128),Ze;const Di=V.get(kt);return Di===void 0?[]:(Ze.every(Wc=>Wc.every(Yc=>Yc===0))&&(Di===1?V.delete(kt):V.set(kt,Di-1)),Ze)});de=u(p.currentTime+fe/p.sampleRate,p.sampleRate,()=>q.process(te,ze,X));for(let Ze=0,kt=0;Ze<g.numberOfOutputs;Ze+=1){for(let Ds=0;Ds<y[Ze];Ds+=1)Ia(j,ze[Ze],Ds,kt+Ds,fe);kt+=y[Ze]}}catch(te){de=!1,W.dispatchEvent(new ErrorEvent("processorerror",{colno:te.colno,filename:te.filename,lineno:te.lineno,message:te.message}))}if(!de){for(let te=0;te<g.numberOfInputs;te+=1){T[te].disconnect(S[te]);for(let ge=0;ge<g.channelCount;ge+=1)S[fe].disconnect(I,ge,te*g.channelCount+ge)}if(m.parameterDescriptors!==void 0){const te=m.parameterDescriptors.length;for(let ge=0;ge<te;ge+=1){const Ze=x[ge];Ze.disconnect(I,0,w+ge),Ze.stop()}}I.disconnect(A),A.onaudioprocess=null,Ut?Re():as();break}}}};let Ut=!1;const jt=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),os=()=>A.connect(jt).connect(p.destination),as=()=>{A.disconnect(jt),jt.disconnect()},zc=()=>{if(de){as(),g.numberOfOutputs>0&&A.connect(C);for(let D=0,j=0;D<g.numberOfOutputs;D+=1){const Se=O[D];for(let fe=0;fe<y[D];fe+=1)C.connect(Se,j+fe,fe);j+=y[D]}}Ut=!0},Gc=()=>{de&&(os(),Re()),Ut=!1};return os(),d(W,zc,Gc)},Ea=(n,e)=>{const t=n.createBiquadFilter();return ke(t,e),ye(t,e,"Q"),ye(t,e,"detune"),ye(t,e,"frequency"),ye(t,e,"gain"),pe(t,e,"type"),t},rd=(n,e)=>(t,s)=>{const i=t.createChannelMerger(s.numberOfInputs);return n!==null&&n.name==="webkitAudioContext"&&e(t,i),ke(i,s),i},od=n=>{const e=n.numberOfOutputs;Object.defineProperty(n,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw Ae()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw Ae()}}),Object.defineProperty(n,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw Ae()}})},on=(n,e)=>{const t=n.createChannelSplitter(e.numberOfOutputs);return ke(t,e),od(t),t},ad=(n,e,t,s,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return ke(a,o),ye(a,o,"offset"),e(s,()=>s(r))||wr(a),e(i,()=>i(r))||Tr(a),n(r,a),a},ks=(n,e)=>(n.connect=e.connect.bind(e),n.disconnect=e.disconnect.bind(e),n),cd=(n,e,t,s)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),u=a.getChannelData(0);u[0]=1,u[1]=1,c.buffer=a,c.loop=!0;const h={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(f){l.channelCount=f},get channelCountMode(){return l.channelCountMode},set channelCountMode(f){l.channelCountMode=f},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(f){l.channelInterpretation=f},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(f){c.onended=f},addEventListener(...f){return c.addEventListener(f[0],f[1],f[2])},dispatchEvent(...f){return c.dispatchEvent(f[0])},removeEventListener(...f){return c.removeEventListener(f[0],f[1],f[2])},start(f=0){c.start.call(c,f)},stop(f=0){c.stop.call(c,f)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return n(i,c),s(ks(h,l),d,p)},ld=(n,e)=>(t,s)=>{const i=t.createConvolver();if(ke(i,s),s.disableNormalization===i.normalize&&(i.normalize=!s.disableNormalization),pe(i,s,"buffer"),s.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw n();return r.call(i,o)}),s.channelCountMode==="max"))throw n();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw n();return r.call(i,o)}),i},Da=(n,e)=>{const t=n.createDelay(e.maxDelayTime);return ke(t,e),ye(t,e,"delayTime"),t},hd=n=>(e,t)=>{const s=e.createDynamicsCompressor();if(ke(s,t),t.channelCount>2||t.channelCountMode==="max")throw n();return ye(s,t,"attack"),ye(s,t,"knee"),ye(s,t,"ratio"),ye(s,t,"release"),ye(s,t,"threshold"),s},je=(n,e)=>{const t=n.createGain();return ke(t,e),ye(t,e,"gain"),t},ud=n=>(e,t,s)=>{if(e.createIIRFilter===void 0)return n(e,t,s);const i=e.createIIRFilter(s.feedforward,s.feedback);return ke(i,s),i};function dd(n,e){const t=e[0]*e[0]+e[1]*e[1];return[(n[0]*e[0]+n[1]*e[1])/t,(n[1]*e[0]-n[0]*e[1])/t]}function pd(n,e){return[n[0]*e[0]-n[1]*e[1],n[0]*e[1]+n[1]*e[0]]}function Fo(n,e){let t=[0,0];for(let s=n.length-1;s>=0;s-=1)t=pd(t,e),t[0]+=n[s];return t}const fd=(n,e,t,s)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:u})=>{const h=Oa(r,i.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=u instanceof Float64Array?u:new Float64Array(u),f=d.length,m=p.length,g=Math.min(f,m);if(f===0||f>20)throw s();if(d[0]===0)throw e();if(m===0||m>20)throw s();if(p[0]===0)throw e();if(d[0]!==1){for(let x=0;x<m;x+=1)p[x]/=d[0];for(let x=1;x<f;x+=1)d[x]/=d[0]}const y=t(i,h,o,o);y.channelCount=o,y.channelCountMode=a,y.channelInterpretation=c;const w=32,b=[],k=[],v=[];for(let x=0;x<o;x+=1){b.push(0);const I=new Float32Array(w),_=new Float32Array(w);I.fill(0),_.fill(0),k.push(I),v.push(_)}y.onaudioprocess=x=>{const I=x.inputBuffer,_=x.outputBuffer,A=I.numberOfChannels;for(let C=0;C<A;C+=1){const O=I.getChannelData(C),E=_.getChannelData(C);b[C]=Ma(d,f,p,m,g,k[C],v[C],b[C],w,O,E)}};const T=i.sampleRate/2;return ks({get bufferSize(){return h},get channelCount(){return y.channelCount},set channelCount(x){y.channelCount=x},get channelCountMode(){return y.channelCountMode},set channelCountMode(x){y.channelCountMode=x},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(x){y.channelInterpretation=x},get context(){return y.context},get inputs(){return[y]},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},addEventListener(...x){return y.addEventListener(x[0],x[1],x[2])},dispatchEvent(...x){return y.dispatchEvent(x[0])},getFrequencyResponse(x,I,_){if(x.length!==I.length||I.length!==_.length)throw n();const A=x.length;for(let C=0;C<A;C+=1){const O=-Math.PI*(x[C]/T),E=[Math.cos(O),Math.sin(O)],$=Fo(p,E),P=Fo(d,E),L=dd($,P);I[C]=Math.sqrt(L[0]*L[0]+L[1]*L[1]),_[C]=Math.atan2(L[1],L[0])}},removeEventListener(...x){return y.removeEventListener(x[0],x[1],x[2])}},y)},md=(n,e)=>n.createMediaElementSource(e.mediaElement),gd=(n,e)=>{const t=n.createMediaStreamDestination();return ke(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},yd=(n,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const s=t.slice(0,1),i=n.createMediaStreamSource(new MediaStream(s));return Object.defineProperty(i,"mediaStream",{value:e}),i},vd=(n,e)=>(t,{mediaStreamTrack:s})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(s);const i=new MediaStream([s]),r=t.createMediaStreamSource(i);if(s.kind!=="audio")throw n();if(e(t))throw new TypeError;return r},_d=n=>n===null?null:n.hasOwnProperty("OfflineAudioContext")?n.OfflineAudioContext:n.hasOwnProperty("webkitOfflineAudioContext")?n.webkitOfflineAudioContext:null,xd=(n,e,t,s,i,r)=>(o,a)=>{const c=o.createOscillator();return ke(c,a),ye(c,a,"detune"),ye(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):pe(c,a,"type"),e(t,()=>t(o))||wr(c),e(s,()=>s(o))||r(c,o),e(i,()=>i(o))||Tr(c),n(o,c),c},bd=n=>(e,t)=>{const s=e.createPanner();return s.orientationX===void 0?n(e,t):(ke(s,t),ye(s,t,"orientationX"),ye(s,t,"orientationY"),ye(s,t,"orientationZ"),ye(s,t,"positionX"),ye(s,t,"positionY"),ye(s,t,"positionZ"),pe(s,t,"coneInnerAngle"),pe(s,t,"coneOuterAngle"),pe(s,t,"coneOuterGain"),pe(s,t,"distanceModel"),pe(s,t,"maxDistance"),pe(s,t,"panningModel"),pe(s,t,"refDistance"),pe(s,t,"rolloffFactor"),s)},wd=(n,e,t,s,i,r,o,a,c,l)=>(u,{coneInnerAngle:h,coneOuterAngle:d,coneOuterGain:p,distanceModel:f,maxDistance:m,orientationX:g,orientationY:y,orientationZ:w,panningModel:b,positionX:k,positionY:v,positionZ:T,refDistance:S,rolloffFactor:x,...I})=>{const _=u.createPanner();if(I.channelCount>2||I.channelCountMode==="max")throw o();ke(_,I);const A={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},C=t(u,{...A,channelInterpretation:"speakers",numberOfInputs:6}),O=s(u,{...I,gain:1}),E=s(u,{...A,gain:1}),$=s(u,{...A,gain:0}),P=s(u,{...A,gain:0}),L=s(u,{...A,gain:0}),W=s(u,{...A,gain:0}),B=s(u,{...A,gain:0}),z=i(u,256,6,1),q=r(u,{...A,curve:new Float32Array([1,1]),oversample:"none"});let oe=[g,y,w],qe=[k,v,T];const ze=new Float32Array(1);z.onaudioprocess=({inputBuffer:V})=>{const Ut=[c(V,ze,0),c(V,ze,1),c(V,ze,2)];Ut.some((os,as)=>os!==oe[as])&&(_.setOrientation(...Ut),oe=Ut);const jt=[c(V,ze,3),c(V,ze,4),c(V,ze,5)];jt.some((os,as)=>os!==qe[as])&&(_.setPosition(...jt),qe=jt)},Object.defineProperty($.gain,"defaultValue",{get:()=>0}),Object.defineProperty(P.gain,"defaultValue",{get:()=>0}),Object.defineProperty(L.gain,"defaultValue",{get:()=>0}),Object.defineProperty(W.gain,"defaultValue",{get:()=>0}),Object.defineProperty(B.gain,"defaultValue",{get:()=>0});const X={get bufferSize(){},get channelCount(){return _.channelCount},set channelCount(V){if(V>2)throw o();O.channelCount=V,_.channelCount=V},get channelCountMode(){return _.channelCountMode},set channelCountMode(V){if(V==="max")throw o();O.channelCountMode=V,_.channelCountMode=V},get channelInterpretation(){return _.channelInterpretation},set channelInterpretation(V){O.channelInterpretation=V,_.channelInterpretation=V},get coneInnerAngle(){return _.coneInnerAngle},set coneInnerAngle(V){_.coneInnerAngle=V},get coneOuterAngle(){return _.coneOuterAngle},set coneOuterAngle(V){_.coneOuterAngle=V},get coneOuterGain(){return _.coneOuterGain},set coneOuterGain(V){if(V<0||V>1)throw e();_.coneOuterGain=V},get context(){return _.context},get distanceModel(){return _.distanceModel},set distanceModel(V){_.distanceModel=V},get inputs(){return[O]},get maxDistance(){return _.maxDistance},set maxDistance(V){if(V<0)throw new RangeError;_.maxDistance=V},get numberOfInputs(){return _.numberOfInputs},get numberOfOutputs(){return _.numberOfOutputs},get orientationX(){return E.gain},get orientationY(){return $.gain},get orientationZ(){return P.gain},get panningModel(){return _.panningModel},set panningModel(V){_.panningModel=V},get positionX(){return L.gain},get positionY(){return W.gain},get positionZ(){return B.gain},get refDistance(){return _.refDistance},set refDistance(V){if(V<0)throw new RangeError;_.refDistance=V},get rolloffFactor(){return _.rolloffFactor},set rolloffFactor(V){if(V<0)throw new RangeError;_.rolloffFactor=V},addEventListener(...V){return O.addEventListener(V[0],V[1],V[2])},dispatchEvent(...V){return O.dispatchEvent(V[0])},removeEventListener(...V){return O.removeEventListener(V[0],V[1],V[2])}};h!==X.coneInnerAngle&&(X.coneInnerAngle=h),d!==X.coneOuterAngle&&(X.coneOuterAngle=d),p!==X.coneOuterGain&&(X.coneOuterGain=p),f!==X.distanceModel&&(X.distanceModel=f),m!==X.maxDistance&&(X.maxDistance=m),g!==X.orientationX.value&&(X.orientationX.value=g),y!==X.orientationY.value&&(X.orientationY.value=y),w!==X.orientationZ.value&&(X.orientationZ.value=w),b!==X.panningModel&&(X.panningModel=b),k!==X.positionX.value&&(X.positionX.value=k),v!==X.positionY.value&&(X.positionY.value=v),T!==X.positionZ.value&&(X.positionZ.value=T),S!==X.refDistance&&(X.refDistance=S),x!==X.rolloffFactor&&(X.rolloffFactor=x),(oe[0]!==1||oe[1]!==0||oe[2]!==0)&&_.setOrientation(...oe),(qe[0]!==0||qe[1]!==0||qe[2]!==0)&&_.setPosition(...qe);const de=()=>{O.connect(_),n(O,q,0,0),q.connect(E).connect(C,0,0),q.connect($).connect(C,0,1),q.connect(P).connect(C,0,2),q.connect(L).connect(C,0,3),q.connect(W).connect(C,0,4),q.connect(B).connect(C,0,5),C.connect(z).connect(u.destination)},Re=()=>{O.disconnect(_),a(O,q,0,0),q.disconnect(E),E.disconnect(C),q.disconnect($),$.disconnect(C),q.disconnect(P),P.disconnect(C),q.disconnect(L),L.disconnect(C),q.disconnect(W),W.disconnect(C),q.disconnect(B),B.disconnect(C),C.disconnect(z),z.disconnect(u.destination)};return l(ks(X,_),de,Re)},Td=n=>(e,{disableNormalization:t,imag:s,real:i})=>{const r=s instanceof Float32Array?s:new Float32Array(s),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(s).length<2)throw n();return a},an=(n,e,t,s)=>n.createScriptProcessor(e,t,s),Sd=(n,e)=>(t,s)=>{const i=s.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return n(t,s);const r=t.createStereoPanner();return ke(r,s),ye(r,s,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},kd=(n,e,t,s,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},u={...l,oversample:"none"},h=(f,m,g,y)=>{const w=new Float32Array(16385),b=new Float32Array(16385);for(let I=0;I<16385;I+=1){const _=I/16384*c;w[I]=Math.cos(_),b[I]=Math.sin(_)}const k=t(f,{...l,gain:0}),v=s(f,{...u,curve:w}),T=s(f,{...u,curve:a}),S=t(f,{...l,gain:0}),x=s(f,{...u,curve:b});return{connectGraph(){m.connect(k),m.connect(T.inputs===void 0?T:T.inputs[0]),m.connect(S),T.connect(g),g.connect(v.inputs===void 0?v:v.inputs[0]),g.connect(x.inputs===void 0?x:x.inputs[0]),v.connect(k.gain),x.connect(S.gain),k.connect(y,0,0),S.connect(y,0,1)},disconnectGraph(){m.disconnect(k),m.disconnect(T.inputs===void 0?T:T.inputs[0]),m.disconnect(S),T.disconnect(g),g.disconnect(v.inputs===void 0?v:v.inputs[0]),g.disconnect(x.inputs===void 0?x:x.inputs[0]),v.disconnect(k.gain),x.disconnect(S.gain),k.disconnect(y,0,0),S.disconnect(y,0,1)}}},d=(f,m,g,y)=>{const w=new Float32Array(16385),b=new Float32Array(16385),k=new Float32Array(16385),v=new Float32Array(16385),T=Math.floor(16385/2);for(let L=0;L<16385;L+=1)if(L>T){const W=(L-T)/(16384-T)*c;w[L]=Math.cos(W),b[L]=Math.sin(W),k[L]=0,v[L]=1}else{const W=L/(16384-T)*c;w[L]=1,b[L]=0,k[L]=Math.cos(W),v[L]=Math.sin(W)}const S=e(f,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),x=t(f,{...l,gain:0}),I=s(f,{...u,curve:w}),_=t(f,{...l,gain:0}),A=s(f,{...u,curve:b}),C=s(f,{...u,curve:a}),O=t(f,{...l,gain:0}),E=s(f,{...u,curve:k}),$=t(f,{...l,gain:0}),P=s(f,{...u,curve:v});return{connectGraph(){m.connect(S),m.connect(C.inputs===void 0?C:C.inputs[0]),S.connect(x,0),S.connect(_,0),S.connect(O,1),S.connect($,1),C.connect(g),g.connect(I.inputs===void 0?I:I.inputs[0]),g.connect(A.inputs===void 0?A:A.inputs[0]),g.connect(E.inputs===void 0?E:E.inputs[0]),g.connect(P.inputs===void 0?P:P.inputs[0]),I.connect(x.gain),A.connect(_.gain),E.connect(O.gain),P.connect($.gain),x.connect(y,0,0),O.connect(y,0,0),_.connect(y,0,1),$.connect(y,0,1)},disconnectGraph(){m.disconnect(S),m.disconnect(C.inputs===void 0?C:C.inputs[0]),S.disconnect(x,0),S.disconnect(_,0),S.disconnect(O,1),S.disconnect($,1),C.disconnect(g),g.disconnect(I.inputs===void 0?I:I.inputs[0]),g.disconnect(A.inputs===void 0?A:A.inputs[0]),g.disconnect(E.inputs===void 0?E:E.inputs[0]),g.disconnect(P.inputs===void 0?P:P.inputs[0]),I.disconnect(x.gain),A.disconnect(_.gain),E.disconnect(O.gain),P.disconnect($.gain),x.disconnect(y,0,0),O.disconnect(y,0,0),_.disconnect(y,0,1),$.disconnect(y,0,1)}}},p=(f,m,g,y,w)=>{if(m===1)return h(f,g,y,w);if(m===2)return d(f,g,y,w);throw i()};return(f,{channelCount:m,channelCountMode:g,pan:y,...w})=>{if(g==="max")throw i();const b=n(f,{...w,channelCount:1,channelCountMode:g,numberOfInputs:2}),k=t(f,{...w,channelCount:m,channelCountMode:g,gain:1}),v=t(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:y});let{connectGraph:T,disconnectGraph:S}=p(f,m,k,v,b);Object.defineProperty(v.gain,"defaultValue",{get:()=>0}),Object.defineProperty(v.gain,"maxValue",{get:()=>1}),Object.defineProperty(v.gain,"minValue",{get:()=>-1});const x={get bufferSize(){},get channelCount(){return k.channelCount},set channelCount(C){k.channelCount!==C&&(I&&S(),{connectGraph:T,disconnectGraph:S}=p(f,C,k,v,b),I&&T()),k.channelCount=C},get channelCountMode(){return k.channelCountMode},set channelCountMode(C){if(C==="clamped-max"||C==="max")throw i();k.channelCountMode=C},get channelInterpretation(){return k.channelInterpretation},set channelInterpretation(C){k.channelInterpretation=C},get context(){return k.context},get inputs(){return[k]},get numberOfInputs(){return k.numberOfInputs},get numberOfOutputs(){return k.numberOfOutputs},get pan(){return v.gain},addEventListener(...C){return k.addEventListener(C[0],C[1],C[2])},dispatchEvent(...C){return k.dispatchEvent(C[0])},removeEventListener(...C){return k.removeEventListener(C[0],C[1],C[2])}};let I=!1;const _=()=>{T(),I=!0},A=()=>{S(),I=!1};return r(ks(x,b),_,A)}},Ad=(n,e,t,s,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);ke(l,c);const u=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(u!==null&&u.length<2)throw e();pe(l,{curve:u},"curve"),pe(l,c,"oversample");let h=null,d=!1;return o(l,"curve",m=>()=>m.call(l),m=>g=>(m.call(l,g),d&&(s(g)&&h===null?h=n(a,l):!s(g)&&h!==null&&(h(),h=null)),g)),i(l,()=>{d=!0,s(l.curve)&&(h=n(a,l))},()=>{d=!1,h!==null&&(h(),h=null)})},Cd=(n,e,t,s,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),u=r.createWaveShaper();ke(l,c),ke(u,c);const h=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),f=t(r,{...c,gain:-1});let m=null,g=!1,y=null;const w={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(v){h.channelCount=v,d.channelCount=v,l.channelCount=v,p.channelCount=v,u.channelCount=v,f.channelCount=v},get channelCountMode(){return l.channelCountMode},set channelCountMode(v){h.channelCountMode=v,d.channelCountMode=v,l.channelCountMode=v,p.channelCountMode=v,u.channelCountMode=v,f.channelCountMode=v},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(v){h.channelInterpretation=v,d.channelInterpretation=v,l.channelInterpretation=v,p.channelInterpretation=v,u.channelInterpretation=v,f.channelInterpretation=v},get context(){return l.context},get curve(){return y},set curve(v){if(v!==null&&v.length<2)throw e();if(v===null)l.curve=v,u.curve=v;else{const T=v.length,S=new Float32Array(T+2-T%2),x=new Float32Array(T+2-T%2);S[0]=v[0],x[0]=-v[T-1];const I=Math.ceil((T+1)/2),_=(T+1)/2-1;for(let A=1;A<I;A+=1){const C=A/I*_,O=Math.floor(C),E=Math.ceil(C);S[A]=O===E?v[O]:(1-(C-O))*v[O]+(1-(E-C))*v[E],x[A]=O===E?-v[T-1-O]:-((1-(C-O))*v[T-1-O])-(1-(E-C))*v[T-1-E]}S[I]=T%2===1?v[I-1]:(v[I-2]+v[I-1])/2,l.curve=S,u.curve=x}y=v,g&&(s(y)&&m===null?m=n(r,h):m!==null&&(m(),m=null))},get inputs(){return[h]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(v){l.oversample=v,u.oversample=v},addEventListener(...v){return h.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return h.dispatchEvent(v[0])},removeEventListener(...v){return h.removeEventListener(v[0],v[1],v[2])}};o!==null&&(w.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==w.oversample&&(w.oversample=a);const b=()=>{h.connect(l).connect(p),h.connect(d).connect(u).connect(f).connect(p),g=!0,s(y)&&(m=n(r,h))},k=()=>{h.disconnect(l),l.disconnect(p),h.disconnect(d),d.disconnect(u),u.disconnect(f),f.disconnect(p),g=!1,m!==null&&(m(),m=null)};return i(ks(w,p),b,k)},Le=()=>new DOMException("","NotSupportedError"),Nd={numberOfChannels:1},Id=(n,e,t,s,i)=>class extends n{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:u,numberOfChannels:h,sampleRate:d}={...Nd,...l},p=s(h,u,d);e(Ws,()=>Ws(p))||p.addEventListener("statechange",(()=>{let f=0;const m=g=>{this._state==="running"&&(f>0?(p.removeEventListener("statechange",m),g.stopImmediatePropagation(),this._waitForThePromiseToSettle(g)):f+=1)};return m})()),super(p,h),this._length=u,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,Sa(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},Md={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},Od=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const u=i(c),h={...Md,...l},d=t(u,h),p=r(u),f=p?s():null,m=c.sampleRate/2;super(c,!1,d,f),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,m,-m),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=f,this._oscillatorNodeRenderer!==null&&h.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=h.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const u=this._nativeOscillatorNode.onended;this._onended=u!==null&&u===l?c:u}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){xs(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),yt(this)&&sn(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},Ed=(n,e,t,s,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(u,h)=>{let d=t(u);const p=Ee(d,h);if(!p){const f={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(h,f),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(h,d),p?(await n(h,u.detune,d.detune),await n(h,u.frequency,d.frequency)):(await s(h,u.detune,d.detune),await s(h,u.frequency,d.frequency)),await i(u,h,d),d};return{set periodicWave(u){o=u},set start(u){a=u},set stop(u){c=u},render(u,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},Dd={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},Rd=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const u=i(c),h={...Dd,...l},d=t(u,h),p=r(u),f=p?s():null;super(c,!1,d,f),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,$e,Ve),this._orientationY=e(this,p,d.orientationY,$e,Ve),this._orientationZ=e(this,p,d.orientationZ,$e,Ve),this._positionX=e(this,p,d.positionX,$e,Ve),this._positionY=e(this,p,d.positionY,$e,Ve),this._positionZ=e(this,p,d.positionZ,$e,Ve),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},$d=(n,e,t,s,i,r,o,a,c,l)=>()=>{const u=new WeakMap;let h=null;const d=async(p,f)=>{let m=null,g=r(p);const y={channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation},w={...y,coneInnerAngle:g.coneInnerAngle,coneOuterAngle:g.coneOuterAngle,coneOuterGain:g.coneOuterGain,distanceModel:g.distanceModel,maxDistance:g.maxDistance,panningModel:g.panningModel,refDistance:g.refDistance,rolloffFactor:g.rolloffFactor},b=Ee(g,f);if("bufferSize"in g)m=s(f,{...y,gain:1});else if(!b){const k={...w,orientationX:g.orientationX.value,orientationY:g.orientationY.value,orientationZ:g.orientationZ.value,positionX:g.positionX.value,positionY:g.positionY.value,positionZ:g.positionZ.value};g=i(f,k)}if(u.set(f,m===null?g:m),m!==null){if(h===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const A=new o(6,p.context.length,f.sampleRate),C=e(A,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});C.connect(A.destination),h=(async()=>{const O=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(E,$)=>{const P=t(A,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:$===0?1:0});return await a(A,E,P.offset),P}));for(let E=0;E<6;E+=1)O[E].connect(C,0,E),O[E].start(0);return l(A)})()}const k=await h,v=s(f,{...y,gain:1});await c(p,f,v);const T=[];for(let A=0;A<k.numberOfChannels;A+=1)T.push(k.getChannelData(A));let S=[T[0][0],T[1][0],T[2][0]],x=[T[3][0],T[4][0],T[5][0]],I=s(f,{...y,gain:1}),_=i(f,{...w,orientationX:S[0],orientationY:S[1],orientationZ:S[2],positionX:x[0],positionY:x[1],positionZ:x[2]});v.connect(I).connect(_.inputs[0]),_.connect(m);for(let A=128;A<k.length;A+=128){const C=[T[0][A],T[1][A],T[2][A]],O=[T[3][A],T[4][A],T[5][A]];if(C.some((E,$)=>E!==S[$])||O.some((E,$)=>E!==x[$])){S=C,x=O;const E=A/f.sampleRate;I.gain.setValueAtTime(0,E),I=s(f,{...y,gain:0}),_=i(f,{...w,orientationX:S[0],orientationY:S[1],orientationZ:S[2],positionX:x[0],positionY:x[1],positionZ:x[2]}),I.gain.setValueAtTime(1,E),v.connect(I).connect(_.inputs[0]),_.connect(m)}}return m}return b?(await n(f,p.orientationX,g.orientationX),await n(f,p.orientationY,g.orientationY),await n(f,p.orientationZ,g.orientationZ),await n(f,p.positionX,g.positionX),await n(f,p.positionY,g.positionY),await n(f,p.positionZ,g.positionZ)):(await a(f,p.orientationX,g.orientationX),await a(f,p.orientationY,g.orientationY),await a(f,p.orientationZ,g.orientationZ),await a(f,p.positionX,g.positionX),await a(f,p.positionY,g.positionY),await a(f,p.positionZ,g.positionZ)),Ss(g)?await c(p,f,g.inputs[0]):await c(p,f,g),g};return{render(p,f){const m=u.get(f);return m!==void 0?Promise.resolve(m):d(p,f)}}},Pd={disableNormalization:!1},Fd=(n,e,t,s)=>class Ra{constructor(r,o){const a=e(r),c=s({...Pd,...o}),l=n(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Ra.prototype||t.has(r)}},Ld=(n,e)=>(t,s,i)=>(n(s).replay(i),e(s,t,i)),Vd=(n,e,t)=>async(s,i,r)=>{const o=n(s);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,u])=>{const d=await e(l).render(l,i),p=s.context.destination;!t(l)&&(s!==p||!t(s))&&d.connect(r,u,c)})).reduce((a,c)=>[...a,...c],[]))},Bd=(n,e,t)=>async(s,i,r)=>{const o=e(s);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const u=await n(a).render(a,i);t(a)||u.connect(r,c)}))},Ud=(n,e,t,s)=>i=>n(Ws,()=>Ws(i))?Promise.resolve(n(s,s)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),jd=n=>(e,t)=>{n.set(e,t)},qd=n=>(e,t)=>n.set(e,t),zd=(n,e,t,s,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(s(l)).map(u=>t(u).render(u,l)))).then(()=>i(l)).then(u=>(typeof u.copyFromChannel!="function"?(o(u),_r(u)):e(r,()=>r(u))||a(u),n.add(u),u)),Gd={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},Wd=(n,e,t,s,i,r)=>class extends n{constructor(a,c){const l=i(a),u={...Gd,...c},h=t(l,u),d=r(l),p=d?s():null;super(a,!1,h,p),this._pan=e(this,d,h.pan)}get pan(){return this._pan}},Yd=(n,e,t,s,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ee(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,h)}return r.set(c,l),u?await n(c,a.pan,l.pan):await s(c,a.pan,l.pan),Ss(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Hd=n=>()=>{if(n===null)return!1;try{new n({length:1,sampleRate:44100})}catch{return!1}return!0},Xd=(n,e)=>async()=>{if(n===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),s=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await s.audioWorklet.addModule(i);const a=new n(s,"a",{numberOfOutputs:0}),c=s.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await s.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},Zd=(n,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),s=n(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{s.disconnect(),i(t.currentTime!==0)},t.startRendering()})},Jd=()=>new DOMException("","UnknownError"),Qd={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},Kd=(n,e,t,s,i,r,o)=>class extends n{constructor(c,l){const u=i(c),h={...Qd,...l},d=t(u,h),f=r(u)?s():null;super(c,!0,d,f),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},ep=(n,e,t)=>()=>{const s=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Ee(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=n(o,l)}return s.set(o,a),Ss(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=s.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},tp=()=>typeof window>"u"?null:window,sp=(n,e)=>t=>{t.copyFromChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=s.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)s[h]=l[h+o]},t.copyToChannel=(s,i,r=0)=>{const o=n(r),a=n(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=s.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)l[h+o]=s[h]}},np=n=>e=>{e.copyFromChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(s,i,r=0)=>{const o=n(r),a=n(i);if(o<e.length)return t.call(e,s,a,o)})(e.copyToChannel)},ip=n=>(e,t)=>{const s=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=s),n(e,"buffer",i=>()=>{const r=i.call(e);return r===s?null:r},i=>r=>i.call(e,r===null?s:r))},rp=(n,e)=>(t,s)=>{s.channelCount=1,s.channelCountMode="explicit",Object.defineProperty(s,"channelCount",{get:()=>1,set:()=>{throw n()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:()=>{throw n()}});const i=t.createBufferSource();e(s,()=>{const a=s.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(s,0,c)},()=>i.disconnect(s))},$a=(n,e,t)=>n.copyFromChannel===void 0?n.getChannelData(t)[0]:(n.copyFromChannel(e,t),e[0]),Pa=n=>{if(n===null)return!1;const e=n.length;return e%2!==0?n[Math.floor(e/2)]!==0:n[e/2-1]+n[e/2]!==0},cn=(n,e,t,s)=>{let i=n;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(n,e,{get:t(r),set:s(o)})},op=n=>({...n,outputChannelCount:n.outputChannelCount!==void 0?n.outputChannelCount:n.numberOfInputs===1&&n.numberOfOutputs===1?[n.channelCount]:Array.from({length:n.numberOfOutputs},()=>1)}),ap=n=>({...n,channelCount:n.numberOfOutputs}),cp=n=>{const{imag:e,real:t}=n;return e===void 0?t===void 0?{...n,imag:[0,0],real:[0,0]}:{...n,imag:Array.from(t,()=>0),real:t}:t===void 0?{...n,imag:e,real:Array.from(e,()=>0)}:{...n,imag:e,real:t}},Fa=(n,e,t)=>{try{n.setValueAtTime(e,t)}catch(s){if(s.code!==9)throw s;Fa(n,e,t+1e-7)}},lp=n=>{const e=n.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},hp=n=>{const e=n.createBufferSource(),t=n.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},up=n=>{const e=n.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},Sr=n=>{const e=n.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},La=n=>{const e=n.createBuffer(1,1,44100),t=n.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},kr=n=>{const e=n.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},dp=n=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(n)}finally{e.close(),t.close()}},pp=n=>{n.start=(e=>(t=0,s=0,i)=>{const r=n.buffer,o=r===null?s:Math.min(r.duration,s);r!==null&&o>r.duration-.5/n.context.sampleRate?e.call(n,t,0,0):e.call(n,t,o,i)})(n.start)},Va=(n,e)=>{const t=e.createGain();n.connect(t);const s=(i=>()=>{i.call(n,t),n.removeEventListener("ended",s)})(n.disconnect);n.addEventListener("ended",s),ks(n,t),n.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(n,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(n,o),r=!0}})(n.stop)},As=(n,e)=>t=>{const s={value:n};return Object.defineProperties(t,{currentTarget:s,target:s}),typeof e=="function"?e.call(n,t):e.handleEvent.call(n,t)},fp=Rl(ns),mp=Bl(ns),gp=Qh(ri),Ba=new WeakMap,yp=gu(Ba),ot=Nh(new Map,new WeakMap),ht=tp(),Ua=Wu(ot,dt),Ar=mu(Pe),Oe=Vd(Pe,Ar,Kt),vp=Gl(Ua,he,Oe),le=_u(ii),wt=_d(ht),ae=Pu(wt),ja=new WeakMap,qa=cu(As),ln=Zu(ht),Cr=Eu(ln),Nr=Du(ht),za=Ru(ht),Ys=Qu(ht),xe=gh($l(ya),Vl(fp,mp,$n,gp,Pn,Pe,yp,tn,he,ns,yt,Kt,Tn),ot,Cu(Xi,Pn,Pe,he,Gs,yt),dt,oi,Le,Hh($n,Xi,Pe,he,Gs,le,yt,ae),tu(ja,Pe,nt),qa,le,Cr,Nr,za,ae,Ys),_p=zl(xe,vp,dt,Ua,le,ae),Ir=new WeakSet,Lo=Yu(ht),Ga=Uh(new Uint32Array(1)),Mr=sp(Ga,dt),Or=np(Ga),Wa=Yl(Ir,ot,Le,Lo,wt,Hd(Lo),Mr,Or),ai=Ul(je),Ya=Bd(Ar,nn,Kt),pt=$h(Ya),Cs=Xu(ai,ot,lp,hp,up,Sr,La,kr,pp,ip(cn),Va),ft=Ld(yu(nn),Ya),xp=Zl(pt,Cs,he,ft,Oe),at=yh(Pl(va),ja,vr,vh,Nl,Il,Ml,Ol,El,Wi,fa,ln,Fa),bp=Xl(xe,xp,at,Ae,Cs,le,ae,As),wp=rh(xe,oh,dt,Ae,Ju(je,cn),le,ae,Oe),Tp=Ch(pt,Ea,he,ft,Oe),is=qd(Ba),Sp=Ah(xe,at,Tp,oi,Ea,le,ae,is),Lt=zu(ns,Nr),kp=rp(Ae,Lt),Vt=rd(ln,kp),Ap=Oh(Vt,he,Oe),Cp=Mh(xe,Ap,Vt,le,ae),Np=Rh(on,he,Oe),Ip=Dh(xe,Np,on,le,ae,ap),Mp=cd(ai,Cs,je,Lt),Ns=ad(ai,ot,Mp,Sr,kr),Op=Bh(pt,Ns,he,ft,Oe),Ep=Vh(xe,at,Op,Ns,le,ae,As),Ha=ld(Le,cn),Dp=zh(Ha,he,Oe),Rp=qh(xe,Dp,Ha,le,ae,is),$p=Jh(pt,Da,he,ft,Oe),Pp=Zh(xe,at,$p,Da,le,ae,is),Xa=hd(Le),Fp=ru(pt,Xa,he,ft,Oe),Lp=iu(xe,at,Fp,Xa,Le,le,ae,is),Vp=pu(pt,je,he,ft,Oe),Bp=du(xe,at,Vp,je,le,ae),Up=fd(oi,Ae,an,Le),ci=Ud(ot,je,an,Zd(je,wt)),jp=Au(Cs,he,wt,Oe,ci),qp=ud(Up),zp=Su(xe,qp,jp,le,ae,is),Gp=ah(at,Vt,Ns,an,Le,$a,ae,cn),Za=new WeakMap,Wp=qu(wp,Gp,qa,ae,Za,As),Ja=xd(ai,ot,Sr,La,kr,Va),Yp=Ed(pt,Ja,he,ft,Oe),Hp=Od(xe,at,Ja,Yp,le,ae,As),Qa=Fh(Cs),Xp=Cd(Qa,Ae,je,Pa,Lt),li=Ad(Qa,Ae,Xp,Pa,Lt,ln,cn),Zp=wd($n,Ae,Vt,je,an,li,Le,Pn,$a,Lt),Ka=bd(Zp),Jp=$d(pt,Vt,Ns,je,Ka,he,wt,ft,Oe,ci),Qp=Rd(xe,at,Ka,Jp,le,ae,is),Kp=Td(dt),ef=Fd(Kp,le,new WeakSet,cp),tf=kd(Vt,on,je,li,Le,Lt),ec=Sd(tf,Le),sf=Yd(pt,ec,he,ft,Oe),nf=Wd(xe,at,ec,sf,le,ae),rf=ep(li,he,Oe),of=Kd(xe,Ae,li,rf,le,ae,is),tc=Fu(ht),Er=lu(ht),sc=new WeakMap,af=xu(sc,wt),cf=tc?Ll(ot,Le,au(ht),Er,hu(Dl),le,af,ae,Ys,new WeakMap,new WeakMap,Xd(Ys,wt),ht):void 0,lf=$u(Cr,ae),hf=Yh(Ir,ot,Wh,ou,new WeakSet,le,lf,Dn,Ws,Mr,Or),nc=Sh(cf,_p,Wa,bp,Sp,Cp,Ip,Ep,Rp,hf,Pp,Lp,Bp,zp,Wp,Hp,Qp,ef,nf,of),uf=Lu(xe,md,le,ae),df=Bu(xe,gd,le,ae),pf=Uu(xe,yd,le,ae),ff=vd(Ae,ae),mf=ju(xe,ff,le),gf=ih(nc,Ae,Le,Jd,uf,df,pf,mf,ln),Dr=bu(Za),yf=jl(Dr),ic=Ph(dt),vf=Kh(Dr),rc=su(dt),oc=new WeakMap,_f=fu(oc,nt),xf=id(ic,dt,Ae,Vt,on,Ns,je,an,Le,rc,Er,_f,Lt),bf=ed(Ae,xf,je,Le,Lt),wf=Th(pt,ic,Cs,Vt,on,Ns,je,vf,rc,Er,he,Ys,wt,ft,Oe,ci),Tf=vu(sc),Sf=jd(oc),Vo=tc?xh(yf,xe,at,wf,bf,Pe,Tf,le,ae,Ys,op,Sf,dp,As):void 0,kf=Gh(Le,wt),Af=zd(Ir,ot,Ar,Dr,ci,Dn,Mr,Or),Cf=Id(nc,ot,Ae,kf,Af),Nf=Nu(ii,Cr),If=Iu(yr,Nr),Mf=Mu(vr,za),Of=Ou(ii,ae);function Qe(n){return n===void 0}function Z(n){return n!==void 0}function Ef(n){return typeof n=="function"}function _t(n){return typeof n=="number"}function Xt(n){return Object.prototype.toString.call(n)==="[object Object]"&&n.constructor===Object}function Df(n){return typeof n=="boolean"}function He(n){return Array.isArray(n)}function xt(n){return typeof n=="string"}function _n(n){return xt(n)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(n)}function U(n,e){if(!n)throw new Error(e)}function We(n,e,t=1/0){if(!(e<=n&&n<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${n}`)}function ac(n){!n.isOffline&&n.state!=="running"&&hi('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let cc=!1,Bo=!1;function Uo(n){cc=n}function Rf(n){Qe(n)&&cc&&!Bo&&(Bo=!0,hi("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let lc=console;function $f(...n){lc.log(...n)}function hi(...n){lc.warn(...n)}function Pf(n){return new gf(n)}function Ff(n,e,t){return new Cf(n,e,t)}const Ge=typeof self=="object"?self:null,Lf=Ge&&(Ge.hasOwnProperty("AudioContext")||Ge.hasOwnProperty("webkitAudioContext"));function Vf(n,e,t){return U(Z(Vo),"AudioWorkletNode only works in a secure context (https or localhost)"),new(n instanceof Ge?.BaseAudioContext?Ge?.AudioWorkletNode:Vo)(n,e,t)}function ct(n,e,t,s){var i=arguments.length,r=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,s);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function _e(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(s.next(u))}catch(h){o(h)}}function c(u){try{l(s.throw(u))}catch(h){o(h)}}function l(u){u.done?r(u.value):i(u.value).then(a,c)}l((s=s.apply(n,e||[])).next())})}class Bf{constructor(e,t,s,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=s,this._createClock()}_createWorker(){const e=new Blob([`
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
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),s=new Worker(t);s.onmessage=this._callback.bind(this),this._worker=s}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function es(n){return Mf(n)}function Ot(n){return If(n)}function Sn(n){return Of(n)}function us(n){return Nf(n)}function Uf(n){return n instanceof Wa}function jf(n,e){return n==="value"||es(e)||Ot(e)||Uf(e)}function Zt(n,...e){if(!e.length)return n;const t=e.shift();if(Xt(n)&&Xt(t))for(const s in t)jf(s,t[s])?n[s]=t[s]:Xt(t[s])?(n[s]||Object.assign(n,{[s]:{}}),Zt(n[s],t[s])):Object.assign(n,{[s]:t[s]});return Zt(n,...e)}function qf(n,e){return n.length===e.length&&n.every((t,s)=>e[s]===t)}function F(n,e,t=[],s){const i={},r=Array.from(e);if(Xt(r[0])&&s&&!Reflect.has(r[0],s)&&(Object.keys(r[0]).some(a=>Reflect.has(n,a))||(Zt(i,{[s]:r[0]}),t.splice(t.indexOf(s),1),r.shift())),r.length===1&&Xt(r[0]))Zt(i,r[0]);else for(let o=0;o<t.length;o++)Z(r[o])&&(i[t[o]]=r[o]);return Zt(n,i)}function zf(n){return n.constructor.getDefaults()}function gs(n,e){return Qe(n)?e:n}function tt(n,e){return e.forEach(t=>{Reflect.has(n,t)&&delete n[t]}),n}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class Tt{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||Ge&&this.toString()===Ge.TONE_DEBUG_CLASS)&&$f(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}Tt.version=pa;const Rr=1e-6;function bs(n,e){return n>e+Rr}function er(n,e){return bs(n,e)||et(n,e)}function Bn(n,e){return n+Rr<e}function et(n,e){return Math.abs(n-e)<Rr}function Gf(n,e,t){return Math.max(Math.min(n,t),e)}class Ke extends Tt{constructor(){super(),this.name="Timeline",this._timeline=[];const e=F(Ke.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(U(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];U(er(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const s=this._search(e,t);return s!==-1?this._timeline[s]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const s=this._search(e,t);return s+1<this._timeline.length?this._timeline[s+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const s=this._search(e);return s-1>=0?this._timeline[s-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(et(this._timeline[t].time,e)){for(let s=t;s>=0&&et(this._timeline[s].time,e);s--)t=s;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&er(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let s=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;s<r;){let o=Math.floor(s+(r-s)/2);const a=this._timeline[o],c=this._timeline[o+1];if(et(a[t],e)){for(let l=o;l<this._timeline.length;l++){const u=this._timeline[l];if(et(u[t],e))o=l;else break}return o}else{if(Bn(a[t],e)&&bs(c[t],e))return o;bs(a[t],e)?r=o:s=o+1}}return-1}_iterate(e,t=0,s=this._timeline.length-1){this._timeline.slice(t,s+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const s=this._search(e);return s!==-1&&this._iterate(t,0,s),this}forEachAfter(e,t){const s=this._search(e);return this._iterate(t,s+1),this}forEachBetween(e,t,s){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(s,i,r)):i===-1&&this._iterate(s,0,r),this}forEachFrom(e,t){let s=this._search(e);for(;s>=0&&this._timeline[s].time>=e;)s--;return this._iterate(t,s+1),this}forEachAtTime(e,t){const s=this._search(e);if(s!==-1&&et(this._timeline[s].time,e)){let i=s;for(let r=s;r>=0&&et(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,s)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const hc=[];function ui(n){hc.push(n)}function Wf(n){hc.forEach(e=>e(n))}const uc=[];function di(n){uc.push(n)}function Yf(n){uc.forEach(e=>e(n))}class hn extends Tt{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{Qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(Qe(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(Qe(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const s=this._events[e].slice(0);for(let i=0,r=s.length;i<r;i++)s[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const s=Object.getOwnPropertyDescriptor(hn.prototype,t);Object.defineProperty(e.prototype,t,s)})}dispose(){return super.dispose(),this._events=void 0,this}}class dc extends hn{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class un extends dc{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new Ke,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const s=F(un.getDefaults(),arguments,["context"]);s.context?(this._context=s.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=Pf({latencyHint:s.latencyHint}),this._latencyHint=s.latencyHint),this._ticker=new Bf(this.emit.bind(this,"tick"),s.clockSource,s.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=s.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(Wf(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,s){return this._context.createBuffer(e,t,s)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,s){return this._context.createPeriodicWave(e,t,s)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return U(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return U(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return U(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){U(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){U(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){U(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){U(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return Vf(this.rawContext,e,t)}addAudioWorkletModule(e){return _e(this,void 0,void 0,function*(){U(Z(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return _e(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return us(this._context)?this._context.resume():Promise.resolve()}close(){return _e(this,void 0,void 0,function*(){us(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&Yf(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),s=t.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const s=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:s+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const s=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:s,time:r+t})};return i(),s}}class Hf extends dc{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,s){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,s){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return _e(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function K(n,e){He(e)?e.forEach(t=>K(n,t)):Object.defineProperty(n,e,{enumerable:!0,writable:!1})}function $r(n,e){He(e)?e.forEach(t=>$r(n,t)):Object.defineProperty(n,e,{writable:!0})}const ie=()=>{};class ne extends Tt{constructor(){super(),this.name="ToneAudioBuffer",this.onload=ie;const e=F(ne.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,xt(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:ie,onload:ie,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:Be().sampleRate}set(e){return e instanceof ne?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return _e(this,void 0,void 0,function*(){const t=ne.load(e).then(s=>{this.set(s),this.onload(this)});ne.downloads.push(t);try{yield t}finally{const s=ne.downloads.indexOf(t);ne.downloads.splice(s,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=He(e)&&e[0].length>0,s=t?e.length:1,i=t?e[0].length:e.length,r=Be(),o=r.createBuffer(s,i,r.sampleRate),a=!t&&s===1?[e]:e;for(let c=0;c<s;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(_t(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const s=this.numberOfChannels;for(let i=0;i<s;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/s),this.fromArray(t)}return this}toArray(e){if(_t(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let s=0;s<this.numberOfChannels;s++)t[s]=this.getChannelData(s);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){U(this.loaded,"Buffer is not loaded");const s=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);U(s<i,"The start time must be less than the end time");const r=i-s,o=Be().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(s,i),a);return new ne(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ne().fromArray(e)}static fromUrl(e){return _e(this,void 0,void 0,function*(){return yield new ne().load(e)})}static load(e){return _e(this,void 0,void 0,function*(){const t=ne.baseUrl===""||ne.baseUrl.endsWith("/")?ne.baseUrl:ne.baseUrl+"/",s=yield fetch(t+e);if(!s.ok)throw new Error(`could not load url: ${e}`);const i=yield s.arrayBuffer();return yield Be().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),s=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+s)!==""}static loaded(){return _e(this,void 0,void 0,function*(){for(yield Promise.resolve();ne.downloads.length;)yield ne.downloads[0]})}}ne.baseUrl="";ne.downloads=[];class dn extends un{constructor(){super({clockSource:"offline",context:Sn(arguments[0])?arguments[0]:Ff(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Sn(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Sn(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return _e(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const s=Math.floor(this.sampleRate/128);e&&t%s===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return _e(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ne(t)})}close(){return Promise.resolve()}}const pc=new Hf;let Wt=pc;function Be(){return Wt===pc&&Lf&&tr(new un),Wt}function tr(n,e=!1){e&&Wt.dispose(),us(n)?Wt=new un(n):Sn(n)?Wt=new dn(n):Wt=n}function Xf(){return Wt.resume()}if(Ge&&!Ge.TONE_SILENCE_LOGGING){const e=` * Tone.js v${pa} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function Zf(n){return Math.pow(10,n/20)}function Jf(n){return 20*(Math.log(n)/Math.LN10)}function fc(n){return Math.pow(2,n/12)}let pi=440;function Qf(){return pi}function Kf(n){pi=n}function Yt(n){return Math.round(mc(n))}function mc(n){return 69+12*Math.log2(n/pi)}function gc(n){return pi*Math.pow(2,(n-69)/12)}class Pr extends Tt{constructor(e,t,s){super(),this.defaultUnits="s",this._val=t,this._units=s,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const s=parseInt(e,10),i=t==="."?1.5:1;return s===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/s)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,s)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i+=this._beatsToUnits(parseFloat(s)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof Pr&&this.fromType(this._val),Qe(this._val))return this._noArg();if(xt(this._val)&&Qe(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(Xt(this._val)){let e=0;for(const t in this._val)if(Z(this._val[t])){const s=this._val[t],i=new this.constructor(this.context,t).valueOf()*s;e+=i}return e}if(Z(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return xt(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class st extends Pr{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new st(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const s=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/s)*s-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let s=t[0],i=new st(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new st(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(s=r,i=o)}),s}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const s=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[s,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Yt(this.toFrequency())}_now(){return this.context.now()}}class Ye extends st{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Qf()}static set A4(e){Kf(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:Ye.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=em[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:Ye.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,s){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),s&&s!=="0"&&(i*=this._beatsToUnits(parseFloat(s)/4)),i}}})}transpose(e){return new Ye(this.context,this.valueOf()*fc(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Yt(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/Ye.A4);let s=Math.round(12*t)+57;const i=Math.floor(s/12);return i<0&&(s+=-12*i),tm[s%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return gc(e)}static ftom(e){return Yt(e)}}const em={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},tm=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class Bs extends st{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Ue extends Tt{constructor(){super();const e=F(Ue.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:Be()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return Rf(e),new st(this.context,e).toSeconds()}toFrequency(e){return new Ye(this.context,e).toFrequency()}toTicks(e){return new Bs(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(s=>{Qe(e[s])&&delete t[s]}),t}get(){const e=zf(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const s=this[t];Z(s)&&Z(s.value)&&Z(s.setValueAtTime)?e[t]=s.value:s instanceof Ue?e[t]=s._getPartialProperties(e[t]):He(s)||_t(s)||xt(s)||Df(s)?e[t]=s:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&Z(this[t])&&(this[t]&&Z(this[t].value)&&Z(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Ue?this[t].set(e[t]):this[t]=e[t])}),this}}class Fr extends Ke{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,s){return We(t,0),this.add(Object.assign({},s,{state:e,time:t})),this}getLastState(e,t){const s=this._search(t);for(let i=s;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const s=this._search(t);if(s!==-1)for(let i=s;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class Y extends Ue{constructor(){const e=F(Y.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,U(Z(e.param)&&(es(e.param)||e.param instanceof Y),"param must be an AudioParam");!es(e.param);)e.param=e.param._param;this._swappable=Z(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new Ke(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,Z(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Ue.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return Z(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return Z(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return Z(this.maxValue)&&Z(this.minValue)&&We(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?Zf(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?Jf(e):e}setValueAtTime(e,t){const s=this.toSeconds(t),i=this._fromType(e);return U(isFinite(i)&&isFinite(s),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,s),this._events.add({time:s,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,s),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),s=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(s===null||s.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(s===null)r=i.value;else if(s.type==="linearRampToValueAtTime"||s.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}s.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,s.time,s.value,t):r=this._exponentialInterpolate(i.time,o,s.time,s.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const s=this._fromType(e),i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this._events.add({time:i,type:"linearRampToValueAtTime",value:s}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(s,i),this}exponentialRampToValueAtTime(e,t){let s=this._fromType(e);s=et(s,0)?this._minOutput:s,this._assertRange(s);const i=this.toSeconds(t);return U(isFinite(s)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:s}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(s,i),this}exponentialRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialRampToValueAtTime(e,s+this.toSeconds(t)),this}linearRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.linearRampToValueAtTime(e,s+this.toSeconds(t)),this}targetRampTo(e,t,s){return s=this.toSeconds(s),this.setRampPoint(s),this.exponentialApproachValueAtTime(e,s,t),this}exponentialApproachValueAtTime(e,t,s){t=this.toSeconds(t),s=this.toSeconds(s);const i=Math.log(s+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+s*.9),this.linearRampToValueAtTime(e,t+s),this}setTargetAtTime(e,t,s){const i=this._fromType(e);U(isFinite(s)&&s>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),U(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:s,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,s),this._param.setTargetAtTime(i,r,s),this}setValueCurveAtTime(e,t,s,i=1){s=this.toSeconds(s),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=s/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return U(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),s=this._fromType(this.getValueAtTime(t));U(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+s);const i=this._events.get(t),r=this._events.getAfter(t);return i&&et(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(s),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(s),t)),this._events.add({time:t,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,t),this}rampTo(e,t=.1,s){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,s):this.linearRampTo(e,t,s),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const s=this._events.get(t);if(s&&s.type==="setTargetAtTime"){const i=this._events.getAfter(s.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){U(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,s,i,r){return s+(t-s)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,s,i,r){return t+(i-t)*((r-e)/(s-e))}_exponentialInterpolate(e,t,s,i,r){return t*Math.pow(i/t,(r-e)/(s-e))}}class R extends Ue{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return Z(this.input)?es(this.input)||this.input instanceof Y?1:this.input.numberOfInputs:0}get numberOfOutputs(){return Z(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return Z(e)&&(e instanceof R||Ot(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(s=>{s.channelCount=e.channelCount,s.channelCountMode=e.channelCountMode,s.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();U(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,s=0){return it(this,e,t,s),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return hi("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,s=0){return yc(this,e,t,s),this}chain(...e){return ts(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),Z(this.input)&&(this.input instanceof R?this.input.dispose():Ot(this.input)&&this.input.disconnect()),Z(this.output)&&(this.output instanceof R?this.output.dispose():Ot(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function ts(...n){const e=n.shift();n.reduce((t,s)=>(t instanceof R?t.connect(s):Ot(t)&&it(t,s),s),e)}function it(n,e,t=0,s=0){for(U(Z(n),"Cannot connect from undefined node"),U(Z(e),"Cannot connect to undefined node"),(e instanceof R||Ot(e))&&U(e.numberOfInputs>0,"Cannot connect to node with no inputs"),U(n.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof R||e instanceof Y;)Z(e.input)&&(e=e.input);for(;n instanceof R;)Z(n.output)&&(n=n.output);es(e)?n.connect(e,t):n.connect(e,t,s)}function yc(n,e,t=0,s=0){if(Z(e))for(;e instanceof R;)e=e.input;for(;!Ot(n);)Z(n.output)&&(n=n.output);es(e)?n.disconnect(e,t):Ot(e)?n.disconnect(e,t,s):n.disconnect()}class ee extends R{constructor(){const e=F(ee.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new Y({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),K(this,"gain")}static getDefaults(){return Object.assign(R.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class ws extends R{constructor(e){super(e),this.onended=ie,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new ee({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const s=this.toSeconds(t);return this._startTime!==-1&&s>=this._startTime&&(this._stopTime===-1||s<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(R.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:ie})}_startGain(e,t=1){U(this._startTime===-1,"Source cannot be started more than once");const s=this.toSeconds(this._fadeIn);return this._startTime=e+s,this._startTime=Math.max(this._startTime,this.context.currentTime),s>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+s):this._gainNode.gain.exponentialApproachValueAtTime(t,e,s)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){U(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const s=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+s),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==ie&&(this.onended(this),this.onended=ie,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),U(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=ie,this}}class Lr extends ws{constructor(){const e=F(Lr.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),it(this._source,this._gainNode),this.offset=new Y({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(ws.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class se extends R{constructor(){const e=F(se.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new Lr({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(R.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,s=0){return fi(this,e,t,s),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,s){return this._param.exponentialRampTo(e,t,s),this}linearRampTo(e,t,s){return this._param.linearRampTo(e,t,s),this}targetRampTo(e,t,s){return this._param.targetRampTo(e,t,s),this}exponentialApproachValueAtTime(e,t,s){return this._param.exponentialApproachValueAtTime(e,t,s),this}setTargetAtTime(e,t,s){return this._param.setTargetAtTime(e,t,s),this}setValueCurveAtTime(e,t,s,i){return this._param.setValueCurveAtTime(e,t,s,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,s){return this._param.rampTo(e,t,s),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function fi(n,e,t,s){(e instanceof Y||es(e)||e instanceof se&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof se&&(e.overridden=!0)),it(n,e,t,s)}class Vr extends Y{constructor(){const e=F(Vr.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new Ke(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Y.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,s){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/s,1));for(let a=0;a<=o;a++){const c=s*a+t,l=this._exponentialApproach(r.time,r.value,i,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const s=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const s=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(s),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,s);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const s=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,s,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(Qe(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const s=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(s+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),s=this._events.get(t);return Math.max(this._getTicksUntilEvent(s,t),0)}getDurationOfTicks(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-s}getTimeOfTick(e){const t=this._events.get(e,"ticks"),s=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&s&&s.type==="linearRampToValueAtTime"&&t.value!==s.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(s.time))-i)/(s.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const s=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(s);return this.getTicksAtTime(s+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class Br extends se{constructor(){const e=F(Br.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new Vr({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(se.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class Ur extends Ue{constructor(){const e=F(Ur.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new Fr,this._tickOffset=new Ke,this._ticksAtTime=new Ke,this._secondsAtTime=new Ke,this.frequency=new Br({context:this.context,units:e.units,value:e.frequency}),K(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Ue.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const s=this.toSeconds(e);return this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),Z(t)&&this.setTicksAtTime(t,s),this._ticksAtTime.cancel(s),this._secondsAtTime.cancel(s)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const s=this._state.get(t);s&&s.time>0&&(this._tickOffset.cancel(s.time),this._state.cancel(s.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),s=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||s,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let u=o.time;const h=this._tickOffset.get(l.time);h&&h.time>=o.time&&(a=h.ticks,u=h.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(u),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),s=this.frequency.timeToTicks(e,t);this.setTicksAtTime(s,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),s={state:"paused",time:e};this._state.add(s);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const u=this._tickOffset.get(c.time);u&&u.time>=r.time&&(o=u.seconds,l=u.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==s.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(s),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const s=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(s.time,i.time),o=this.frequency.getTicksAtTime(r)+e-s.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,s){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,s),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let u=Math.ceil(l)-l;u=et(u,1)?0:u;let h=this.frequency.getTimeOfTick(a+u);for(;h<t;){try{s(h,Math.round(this.getTicksAtTime(h)))}catch(d){r=d;break}h+=this.frequency.getDurationOfTicks(1,h)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class mi extends Ue{constructor(){const e=F(mi.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=ie,this._lastUpdate=0,this._state=new Fr("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new Ur({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,K(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Ue.getDefaults(),{callback:ie,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){ac(this.context);const s=this.toSeconds(e);return this.log("start",s),this._state.getValueAtTime(s)!=="started"&&(this._state.setStateAtTime("started",s),this._tickSource.start(s,t),s<this._lastUpdate&&this.emit("start",s,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const s=this.toSeconds(t),i=this.getTicksAtTime(s);return this._tickSource.getTimeOfTick(i+e,s)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,s=>{switch(s.state){case"started":const i=this._tickSource.getTicksAtTime(s.time);this.emit("start",s.time,i);break;case"stopped":s.time!==0&&this.emit("stop",s.time);break;case"paused":this.emit("pause",s.time);break}}),this._tickSource.forEachTickBetween(e,t,(s,i)=>{this.callback(s,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}hn.mixin(mi);class Un extends R{constructor(){const e=F(Un.getDefaults(),arguments,["delayTime","maxDelay"]);super(e),this.name="Delay";const t=this.toSeconds(e.maxDelay);this._maxDelay=Math.max(t,this.toSeconds(e.delayTime)),this._delayNode=this.input=this.output=this.context.createDelay(t),this.delayTime=new Y({context:this.context,param:this._delayNode.delayTime,units:"time",value:e.delayTime,minValue:0,maxValue:this.maxDelay}),K(this,"delayTime")}static getDefaults(){return Object.assign(R.getDefaults(),{delayTime:0,maxDelay:1})}get maxDelay(){return this._maxDelay}dispose(){return super.dispose(),this._delayNode.disconnect(),this.delayTime.dispose(),this}}class Is extends R{constructor(){const e=F(Is.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new ee({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,K(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(R.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class jr extends R{constructor(){const e=F(jr.getDefaults(),arguments);super(e),this.name="Destination",this.input=new Is({context:this.context}),this.output=new ee({context:this.context}),this.volume=this.input.volume,ts(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(R.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),ts(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}ui(n=>{n.destination=new jr({context:n})});di(n=>{n.destination.dispose()});class sm extends R{constructor(){super(...arguments),this.name="Listener",this.positionX=new Y({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new Y({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new Y({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new Y({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new Y({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new Y({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new Y({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new Y({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new Y({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(R.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}ui(n=>{n.listener=new sm({context:n})});di(n=>{n.listener.dispose()});function nm(n,e){return _e(this,arguments,void 0,function*(t,s,i=2,r=Be().sampleRate){const o=Be(),a=new dn(i,s,r);tr(a),yield t(a);const c=a.render();tr(o);const l=yield c;return new ne(l)})}class qr extends Tt{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=F(qr.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const s=e.urls[t];this.add(t,s,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:ie,onload:ie,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return U(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,s=ie,i=ie){return xt(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ne(this.baseUrl+t,s,i))):this._buffers.set(e.toString(),new ne(t,s,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class jn extends Ye{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return Yt(super._frequencyToUnits(e))}_ticksToUnits(e){return Yt(super._ticksToUnits(e))}_beatsToUnits(e){return Yt(super._beatsToUnits(e))}_secondsToUnits(e){return Yt(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return gc(this.toMidi())}transpose(e){return new jn(this.context,this.toMidi()+e)}}class ps extends Bs{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class im extends Ue{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new Ke,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}ui(n=>{n.draw=new im({context:n})});di(n=>{n.draw.dispose()});class rm extends Tt{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){U(Z(e.time),"Events must have a time property"),U(Z(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new om(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const s of t)if(s.event===e){this._removeNode(s),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let s,i=null;if(t>0)if(e.left.right===null)s=e.left,s.right=e.right,i=s;else{for(s=e.left.right;s.right!==null;)s=s.right;s.parent&&(s.parent.right=s.left,i=s.parent,s.left=e.left,s.right=e.right)}else if(e.right.left===null)s=e.right,s.left=e.left,i=s;else{for(s=e.right.left;s.left!==null;)s=s.left;s.parent&&(s.parent.left=s.right,i=s.parent,s.left=e.left,s.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=s:e.parent.right=s:this._setRoot(s),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,s=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,s=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?s?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let s=t[0];for(let i=1;i<t.length;i++)t[i].low>s.low&&(s=t[i]);return s.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(s=>t.push(s)),t.forEach(s=>{s.event&&e(s.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const s=[];this._root.search(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const s=[];this._root.searchAfter(e,s),s.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class om{constructor(e,t,s){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=s,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class am extends Tt{constructor(e){super(),this.name="TimelineValue",this._timeline=new Ke({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class ut extends R{constructor(){super(F(ut.getDefaults(),arguments,["context"]))}connect(e,t=0,s=0){return fi(this,e,t,s),this}}class Ms extends ut{constructor(){const e=F(Ms.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,He(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):Ef(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(se.getDefaults(),{length:1024})}setMap(e,t=1024){const s=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;s[i]=e(o,i)}return this.curve=s,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(s=>s.includes(e));U(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class gi extends ut{constructor(){const e=F(gi.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new Ms({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(ut.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class Et{constructor(e,t){this.id=Et._eventId++,this._remainderTime=0;const s=Object.assign(Et.getDefaults(),t);this.transport=e,this.callback=s.callback,this._once=s.once,this.time=Math.floor(s.time),this._remainderTime=s.time-this.time}static getDefaults(){return{callback:ie,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}Et._eventId=0;class zr extends Et{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const s=Object.assign(zr.getDefaults(),t);this.duration=s.duration,this._interval=s.interval,this._nextTick=s.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},Et.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return Bn(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new ps(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){Bn(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new ps(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);bs(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class yi extends Ue{constructor(){const e=F(yi.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new am(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new Ke,this._repeatedEvents=new rm,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new mi({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),K(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Ue.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const s=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(s*Math.PI)*this._swingAmount;e+=new ps(this.context,this._swingTicks*2/3).toSeconds()*i}Uo(!0),this._timeline.forEachAtTime(t,s=>s.invoke(e)),Uo(!1)}schedule(e,t){const s=new Et(this,{callback:e,time:new Bs(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}scheduleRepeat(e,t,s,i=1/0){const r=new zr(this,{callback:e,duration:new st(this.context,i).toTicks(),interval:new st(this.context,t).toTicks(),time:new Bs(this.context,s).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const s=new Et(this,{callback:e,once:!0,time:new Bs(this.context,t).toTicks()});return this._addEvent(s,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,s=>this.clear(s.id)),this._repeatedEvents.forEachFrom(t,s=>this.clear(s.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new ps(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let s;return Z(t)&&(s=this.toTicks(t)),this._clock.start(e,s),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){He(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new st(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new st(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new ps(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new ps(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),s=this._clock.frequency.timeToTicks(e,t);this.ticks=s}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const s=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(s)-s,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),s=this.getTicksAtTime(t),i=e-s%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const s=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(s)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new ee(c),u=new gi(-1),h=new ee(c);i.chain(l,u,h),i=h,r=1/r,o=[l,u,h]}t||(e.getValueAtTime(s)!==0?t=e.getValueAtTime(s)/r:t=0);const a=new ee(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const s=this._syncedSignals[t];s.signal===e&&(s.nodes.forEach(i=>i.dispose()),s.signal.value=s.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),$r(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}hn.mixin(yi);ui(n=>{n.transport=new yi({context:n})});di(n=>{n.transport.dispose()});class Ce extends R{constructor(e){super(e),this.input=void 0,this._state=new Fr("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=ie,this._syncedStop=ie,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Is({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,K(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(R.getDefaults(),{mute:!1,onstop:ie,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,s){let i=Qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")U(bs(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,s);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(gs(t,0)),r.duration=s?this.toSeconds(s):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,s)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else ac(this.context),this._start(i,t,s);return this}stop(e){let t=Qe(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||Z(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const s=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(s)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,s){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,s)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(bs(t,0)){const s=this._state.get(t);if(s&&s.state==="started"&&s.time!==t){const i=t-this.toSeconds(s.time);let r;s.duration&&(r=this.toSeconds(s.duration)-i),this._start(e,this.toSeconds(s.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=ie,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class pn extends ws{constructor(){const e=F(pn.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,it(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new Y({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ne(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(ws.getDefaults(),{url:new ne,loop:!1,loopEnd:0,loopStart:0,onload:ie,onerror:ie,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,s,i=1){U(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=gs(t,this.loopStart):t=gs(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;er(o,a)&&(o=(o-c)%l+c),et(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,Bn(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),Z(s)){let a=this.toSeconds(s);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}class qn extends Ce{constructor(){const e=F(qn.getDefaults(),arguments,["type"]);super(e),this.name="Noise",this._source=null,this._playbackRate=e.playbackRate,this.type=e.type,this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Ce.getDefaults(),{fadeIn:0,fadeOut:0,playbackRate:1,type:"white"})}get type(){return this._type}set type(e){if(U(e in jo,"Noise: invalid type: "+e),this._type!==e&&(this._type=e,this.state==="started")){const t=this.now();this._stop(t),this._start(t)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this._source&&(this._source.playbackRate.value=e)}_start(e){const t=jo[this._type];this._source=new pn({url:t,context:this.context,fadeIn:this._fadeIn,fadeOut:this._fadeOut,loop:!0,onended:()=>this.onstop(this),playbackRate:this._playbackRate}).connect(this.output),this._source.start(this.toSeconds(e),Math.random()*(t.duration-.001))}_stop(e){this._source&&(this._source.stop(this.toSeconds(e)),this._source=null)}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e,this._source&&(this._source.fadeIn=this._fadeIn)}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e,this._source&&(this._source.fadeOut=this._fadeOut)}_restart(e){this._stop(e),this._start(e)}dispose(){return super.dispose(),this._source&&this._source.disconnect(),this}}const ls=44100*5,Li=2,mt={brown:null,pink:null,white:null},jo={get brown(){if(!mt.brown){const n=[];for(let e=0;e<Li;e++){const t=new Float32Array(ls);n[e]=t;let s=0;for(let i=0;i<ls;i++){const r=Math.random()*2-1;t[i]=(s+.02*r)/1.02,s=t[i],t[i]*=3.5}}mt.brown=new ne().fromArray(n)}return mt.brown},get pink(){if(!mt.pink){const n=[];for(let e=0;e<Li;e++){const t=new Float32Array(ls);n[e]=t;let s,i,r,o,a,c,l;s=i=r=o=a=c=l=0;for(let u=0;u<ls;u++){const h=Math.random()*2-1;s=.99886*s+h*.0555179,i=.99332*i+h*.0750759,r=.969*r+h*.153852,o=.8665*o+h*.3104856,a=.55*a+h*.5329522,c=-.7616*c-h*.016898,t[u]=s+i+r+o+a+c+l+h*.5362,t[u]*=.11,l=h*.115926}}mt.pink=new ne().fromArray(n)}return mt.pink},get white(){if(!mt.white){const n=[];for(let e=0;e<Li;e++){const t=new Float32Array(ls);n[e]=t;for(let s=0;s<ls;s++)t[s]=Math.random()*2-1}mt.white=new ne().fromArray(n)}return mt.white}};function rs(n,e){return _e(this,void 0,void 0,function*(){const t=e/n.context.sampleRate,s=new dn(1,t,n.context.sampleRate);return new n.constructor(Object.assign(n.get(),{frequency:2/t,detune:0,context:s})).toDestination().start(0),(yield s.render()).getChannelData(0)})}class Gr extends ws{constructor(){const e=F(Gr.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],it(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new Y({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new Y({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),K(this,["frequency","detune"])}static getDefaults(){return Object.assign(ws.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class ve extends Ce{constructor(){const e=F(ve.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new se({context:this.context,units:"frequency",value:e.frequency}),K(this,"frequency"),this.detune=new se({context:this.context,units:"cents",value:e.detune}),K(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Ce.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),s=new Gr({context:this.context,onended:()=>this.onstop(this)});this._oscillator=s,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return ve._periodicWaveCache.find(t=>t.phase===this._phase&&qf(t.partials,this._partials));{const e=ve._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const s=this._getCachedPeriodicWave();if(Z(s)){const{partials:i,wave:r}=s;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),ve._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),ve._periodicWaveCache.length>100&&ve._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){We(e,0);let t=this._type;const s=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(s&&(t=s[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let u;switch(e){case"sine":u=c<=a?1:0,this._partials[c-1]=u;break;case"square":u=c&1?2*l:0,this._partials[c-1]=u;break;case"sawtooth":u=l*(c&1?1:-1),this._partials[c-1]=u;break;case"triangle":c&1?u=2*(l*l)*(c-1>>1&1?-1:1):u=0,this._partials[c-1]=u;break;case"custom":u=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}u!==0?(r[c]=-u*Math.sin(t*c),o[c]=u*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,s){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*s)+t[o]*Math.sin(o*s);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let s=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)s=Math.max(this._inverseFFT(e,t,o/r*i),s);return Gf(-this._inverseFFT(e,t,this._phase)/s,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}ve._periodicWaveCache=[];class vc extends ut{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new Ms({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class bt extends se{constructor(){const e=F(bt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new ee({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(se.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class vi extends Ce{constructor(){const e=F(vi.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new vc({context:this.context}),this._modulationNode=new ee({context:this.context}),this._carrier=new ve({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new ve({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new bt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),K(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ve.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class _i extends Ce{constructor(){const e=F(_i.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new ee({context:this.context,gain:0}),this._carrier=new ve({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new se({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new ve({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new bt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new bt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),K(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(ve.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class fn extends Ce{constructor(){const e=F(fn.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new ee({context:this.context,gain:0}),this._thresh=new Ms({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new se({context:this.context,units:"audioRange",value:e.width}),this._triangle=new ve({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),K(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Ce.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class xi extends Ce{constructor(){const e=F(xi.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new se({context:this.context,units:"frequency",value:e.frequency}),this.detune=new se({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,K(this,["frequency","detune"])}static getDefaults(){return Object.assign(ve.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,s=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+s*r)}}get count(){return this._oscillators.length}set count(e){if(We(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const s=new ve({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):ie});this.type==="custom"&&(s.partials=this._partials),this.frequency.connect(s.frequency),this.detune.connect(s.detune),s.detune.overridden=!1,s.connect(this.output),this._oscillators[t]=s}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,s)=>t.phase=this._phase+s/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class bi extends Ce{constructor(){const e=F(bi.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new bt({context:this.context,value:2}),this._pulse=new fn({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new ve({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),K(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Ce.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const qo={am:vi,fat:xi,fm:_i,oscillator:ve,pulse:fn,pwm:bi};class Dt extends Ce{constructor(){const e=F(Dt.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new se({context:this.context,units:"frequency",value:e.frequency}),this.detune=new se({context:this.context,units:"cents",value:e.detune}),K(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(ve.getDefaults(),_i.getDefaults(),vi.getDefaults(),xi.getDefaults(),fn.getDefaults(),bi.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=qo[e],s=this.now();if(this._oscillator){const i=this._oscillator;i.stop(s),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(s)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof qo[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&_t(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&_t(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&xt(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return _e(this,arguments,void 0,function*(e=1024){return rs(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}class Wr extends se{constructor(){super(F(Wr.getDefaults(),arguments,["value"])),this.override=!1,this.name="Add",this._sum=new ee({context:this.context}),this.input=this._sum,this.output=this._sum,this.addend=this._param,ts(this._constantSource,this._sum)}static getDefaults(){return Object.assign(se.getDefaults(),{value:0})}dispose(){return super.dispose(),this._sum.dispose(),this}}class wi extends ut{constructor(){const e=F(wi.getDefaults(),arguments,["min","max"]);super(e),this.name="Scale",this._mult=this.input=new bt({context:this.context,value:e.max-e.min}),this._add=this.output=new Wr({context:this.context,value:e.min}),this._min=e.min,this._max=e.max,this.input.connect(this.output)}static getDefaults(){return Object.assign(ut.getDefaults(),{max:1,min:0})}get min(){return this._min}set min(e){this._min=e,this._setRange()}get max(){return this._max}set max(e){this._max=e,this._setRange()}_setRange(){this._add.value=this._min,this._mult.value=this._max-this._min}dispose(){return super.dispose(),this._add.dispose(),this._mult.dispose(),this}}class Yr extends ut{constructor(){super(F(Yr.getDefaults(),arguments)),this.name="Zero",this._gain=new ee({context:this.context}),this.output=this._gain,this.input=void 0,it(this.context.getConstant(0),this._gain)}dispose(){return super.dispose(),yc(this.context.getConstant(0),this._gain),this}}class zn extends R{constructor(){const e=F(zn.getDefaults(),arguments,["frequency","min","max"]);super(e),this.name="LFO",this._stoppedValue=0,this._units="number",this.convert=!0,this._fromType=Y.prototype._fromType,this._toType=Y.prototype._toType,this._is=Y.prototype._is,this._clampValue=Y.prototype._clampValue,this._oscillator=new ve(e),this.frequency=this._oscillator.frequency,this._amplitudeGain=new ee({context:this.context,gain:e.amplitude,units:"normalRange"}),this.amplitude=this._amplitudeGain.gain,this._stoppedSignal=new se({context:this.context,units:"audioRange",value:0}),this._zeros=new Yr({context:this.context}),this._a2g=new vc({context:this.context}),this._scaler=this.output=new wi({context:this.context,max:e.max,min:e.min}),this.units=e.units,this.min=e.min,this.max=e.max,this._oscillator.chain(this._amplitudeGain,this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),K(this,["amplitude","frequency"]),this.phase=e.phase}static getDefaults(){return Object.assign(ve.getDefaults(),{amplitude:1,frequency:"4n",max:1,min:0,type:"sine",units:"number"})}start(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(0,e),this._oscillator.start(e),this}stop(e){return e=this.toSeconds(e),this._stoppedSignal.setValueAtTime(this._stoppedValue,e),this._oscillator.stop(e),this}sync(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this}unsync(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this}_setStoppedValue(){this._stoppedValue=this._oscillator.getInitialValue(),this._stoppedSignal.value=this._stoppedValue}get min(){return this._toType(this._scaler.min)}set min(e){e=this._fromType(e),this._scaler.min=e}get max(){return this._toType(this._scaler.max)}set max(e){e=this._fromType(e),this._scaler.max=e}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e,this._setStoppedValue()}get partials(){return this._oscillator.partials}set partials(e){this._oscillator.partials=e,this._setStoppedValue()}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e,this._setStoppedValue()}get units(){return this._units}set units(e){const t=this.min,s=this.max;this._units=e,this.min=t,this.max=s}get state(){return this._oscillator.state}connect(e,t,s){return(e instanceof Y||e instanceof se)&&(this.convert=e.convert,this.units=e.units),fi(this,e,t,s),this}dispose(){return super.dispose(),this._oscillator.dispose(),this._stoppedSignal.dispose(),this._zeros.dispose(),this._scaler.dispose(),this._a2g.dispose(),this._amplitudeGain.dispose(),this.amplitude.dispose(),this}}function _c(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){We(r,n,e),t.set(this,r)}})}}function St(n,e=1/0){const t=new WeakMap;return function(s,i){Reflect.defineProperty(s,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){We(this.toSeconds(r),n,e),t.set(this,r)}})}}class Ti extends Ce{constructor(){const e=F(Ti.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ne({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Ce.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:ie,onerror:ie,playbackRate:1,reverse:!1})}load(e){return _e(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=ie){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,s){return super.start(e,t,s),this}_start(e,t,s){this._loop?t=gs(t,this._loopStart):t=gs(t,0);const i=this.toSeconds(t),r=s;s=gs(s,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(s);o=o/this._playbackRate,e=this.toSeconds(e);const a=new pn({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&Qe(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(s=>s.stop(t))}restart(e,t,s){return super.restart(e,t,s),this}_restart(e,t,s){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,s)}seek(e,t){const s=this.toSeconds(t);if(this._state.getValueAtTime(s)==="started"){const i=this.toSeconds(e);this._stop(s),this._start(s,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&We(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&We(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),s=this._state.getNextState("stopped",t);s&&s.implicitEnd&&(this._state.cancel(s.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}ct([St(0)],Ti.prototype,"fadeIn",void 0);ct([St(0)],Ti.prototype,"fadeOut",void 0);class cm extends ut{constructor(){super(...arguments),this.name="GainToAudio",this._norm=new Ms({context:this.context,mapping:e=>Math.abs(e)*2-1}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Xe extends R{constructor(){const e=F(Xe.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new se({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(R.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(xt(e))return e;{let s;for(s in xn)if(xn[s][t]===e)return s;return e}}_setCurve(e,t,s){if(xt(s)&&Reflect.has(xn,s)){const i=xn[s];Xt(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(He(s)&&e!=="_decayCurve")this[e]=s;else throw new Error("Envelope: invalid curve: "+s)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const s=this.toSeconds(this.release);s<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,s,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,s,e):(U(He(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,s,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,s=1){return t=this.toSeconds(t),this.triggerAttack(t,s),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,s=0){return fi(this,e,t,s),this}asArray(){return _e(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,s=new dn(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:s}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield s.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}ct([St(0)],Xe.prototype,"attack",void 0);ct([St(0)],Xe.prototype,"decay",void 0);ct([_c(0,1)],Xe.prototype,"sustain",void 0);ct([St(0)],Xe.prototype,"release",void 0);const xn=(()=>{let e,t;const s=[];for(e=0;e<128;e++)s[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=d/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function u(d){const p=new Array(d.length);for(let f=0;f<d.length;f++)p[f]=1-d[f];return p}function h(d){return d.slice(0).reverse()}return{bounce:{In:u(l),Out:l},cosine:{In:s,Out:h(s)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:u(i)},sine:{In:c,Out:u(c)},step:{In:o,Out:u(o)}}})();class Rt extends R{constructor(){const e=F(Rt.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new Is({context:this.context,volume:e.volume}),this.volume=this._volume.volume,K(this,"volume")}static getDefaults(){return Object.assign(R.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const s=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,s.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class rt extends Rt{constructor(){const e=F(rt.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Rt.getDefaults(),{detune:0,onsilence:ie,portamento:0})}triggerAttack(e,t,s=1){this.log("triggerAttack",e,t,s);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,s),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const s=this.toSeconds(t),i=e instanceof Ye?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(s)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,s)}else this.frequency.setValueAtTime(i,s);return this}}ct([St(0)],rt.prototype,"portamento",void 0);class Si extends Xe{constructor(){super(F(Si.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new ee({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class Fe extends rt{constructor(){const e=F(Fe.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new Dt(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new Si(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),K(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(rt.getDefaults(),{envelope:Object.assign(tt(Xe.getDefaults(),Object.keys(R.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(tt(Dt.getDefaults(),[...Object.keys(Ce.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Gn extends rt{constructor(){const e=F(Gn.getDefaults(),arguments);super(e),this.name="ModulationSynth",this._carrier=new Fe({context:this.context,oscillator:e.oscillator,envelope:e.envelope,onsilence:()=>this.onsilence(this),volume:-10}),this._modulator=new Fe({context:this.context,oscillator:e.modulation,envelope:e.modulationEnvelope,volume:-10}),this.oscillator=this._carrier.oscillator,this.envelope=this._carrier.envelope,this.modulation=this._modulator.oscillator,this.modulationEnvelope=this._modulator.envelope,this.frequency=new se({context:this.context,units:"frequency"}),this.detune=new se({context:this.context,value:e.detune,units:"cents"}),this.harmonicity=new bt({context:this.context,value:e.harmonicity,minValue:0}),this._modulationNode=new ee({context:this.context,gain:0}),K(this,["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"])}static getDefaults(){return Object.assign(rt.getDefaults(),{harmonicity:3,oscillator:Object.assign(tt(Dt.getDefaults(),[...Object.keys(Ce.getDefaults()),"frequency","detune"]),{type:"sine"}),envelope:Object.assign(tt(Xe.getDefaults(),Object.keys(R.getDefaults())),{attack:.01,decay:.01,sustain:1,release:.5}),modulation:Object.assign(tt(Dt.getDefaults(),[...Object.keys(Ce.getDefaults()),"frequency","detune"]),{type:"square"}),modulationEnvelope:Object.assign(tt(Xe.getDefaults(),Object.keys(R.getDefaults())),{attack:.5,decay:0,sustain:1,release:.5})})}_triggerEnvelopeAttack(e,t){this._carrier._triggerEnvelopeAttack(e,t),this._modulator._triggerEnvelopeAttack(e,t)}_triggerEnvelopeRelease(e){return this._carrier._triggerEnvelopeRelease(e),this._modulator._triggerEnvelopeRelease(e),this}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this._carrier.dispose(),this._modulator.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._modulationNode.dispose(),this}}class Wn extends R{constructor(){const e=F(Wn.getDefaults(),arguments,["frequency","type"]);super(e),this.name="BiquadFilter",this._filter=this.context.createBiquadFilter(),this.input=this.output=this._filter,this.Q=new Y({context:this.context,units:"number",value:e.Q,param:this._filter.Q}),this.frequency=new Y({context:this.context,units:"frequency",value:e.frequency,param:this._filter.frequency}),this.detune=new Y({context:this.context,units:"cents",value:e.detune,param:this._filter.detune}),this.gain=new Y({context:this.context,units:"decibels",convert:!1,value:e.gain,param:this._filter.gain}),this.type=e.type}static getDefaults(){return Object.assign(R.getDefaults(),{Q:1,type:"lowpass",frequency:350,detune:0,gain:0})}get type(){return this._filter.type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._filter.type=e}getFrequencyResponse(e=128){const t=new Float32Array(e);for(let o=0;o<e;o++){const c=Math.pow(o/e,2)*19980+20;t[o]=c}const s=new Float32Array(e),i=new Float32Array(e),r=this.context.createBiquadFilter();return r.type=this.type,r.Q.value=this.Q.value,r.frequency.value=this.frequency.value,r.gain.value=this.gain.value,r.getFrequencyResponse(t,s,i),s}dispose(){return super.dispose(),this._filter.disconnect(),this.Q.dispose(),this.frequency.dispose(),this.gain.dispose(),this.detune.dispose(),this}}class Yn extends R{constructor(){const e=F(Yn.getDefaults(),arguments,["frequency","type","rolloff"]);super(e),this.name="Filter",this.input=new ee({context:this.context}),this.output=new ee({context:this.context}),this._filters=[],this._filters=[],this.Q=new se({context:this.context,units:"positive",value:e.Q}),this.frequency=new se({context:this.context,units:"frequency",value:e.frequency}),this.detune=new se({context:this.context,units:"cents",value:e.detune}),this.gain=new se({context:this.context,units:"decibels",convert:!1,value:e.gain}),this._type=e.type,this.rolloff=e.rolloff,K(this,["detune","frequency","gain","Q"])}static getDefaults(){return Object.assign(R.getDefaults(),{Q:1,detune:0,frequency:350,gain:0,rolloff:-12,type:"lowpass"})}get type(){return this._type}set type(e){U(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._type=e,this._filters.forEach(s=>s.type=e)}get rolloff(){return this._rolloff}set rolloff(e){const t=_t(e)?e:parseInt(e,10),s=[-12,-24,-48,-96];let i=s.indexOf(t);U(i!==-1,`rolloff can only be ${s.join(", ")}`),i+=1,this._rolloff=t,this.input.disconnect(),this._filters.forEach(r=>r.disconnect()),this._filters=new Array(i);for(let r=0;r<i;r++){const o=new Wn({context:this.context});o.type=this._type,this.frequency.connect(o.frequency),this.detune.connect(o.detune),this.Q.connect(o.Q),this.gain.connect(o.gain),this._filters[r]=o}this._internalChannels=this._filters,ts(this.input,...this._internalChannels,this.output)}getFrequencyResponse(e=128){const t=new Wn({context:this.context,frequency:this.frequency.value,gain:this.gain.value,Q:this.Q.value,type:this._type,detune:this.detune.value}),s=new Float32Array(e).map(()=>1);return this._filters.forEach(()=>{t.getFrequencyResponse(e).forEach((r,o)=>s[o]*=r)}),t.dispose(),s}dispose(){return super.dispose(),this._filters.forEach(e=>{e.dispose()}),$r(this,["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.detune.dispose(),this.gain.dispose(),this}}class Hn extends Xe{constructor(){const e=F(Hn.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="FrequencyEnvelope",this._octaves=e.octaves,this._baseFrequency=this.toFrequency(e.baseFrequency),this._exponent=this.input=new gi({context:this.context,value:e.exponent}),this._scale=this.output=new wi({context:this.context,min:this._baseFrequency,max:this._baseFrequency*Math.pow(2,this._octaves)}),this._sig.chain(this._exponent,this._scale)}static getDefaults(){return Object.assign(Xe.getDefaults(),{baseFrequency:200,exponent:1,octaves:4})}get baseFrequency(){return this._baseFrequency}set baseFrequency(e){const t=this.toFrequency(e);We(t,0),this._baseFrequency=t,this._scale.min=this._baseFrequency,this.octaves=this._octaves}get octaves(){return this._octaves}set octaves(e){this._octaves=e,this._scale.max=this._baseFrequency*Math.pow(2,e)}get exponent(){return this._exponent.value}set exponent(e){this._exponent.value=e}dispose(){return super.dispose(),this._exponent.dispose(),this._scale.dispose(),this}}class ki extends rt{constructor(){const e=F(ki.getDefaults(),arguments);super(e),this.name="MonoSynth",this.oscillator=new Dt(Object.assign(e.oscillator,{context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)})),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new Yn(Object.assign(e.filter,{context:this.context})),this.filterEnvelope=new Hn(Object.assign(e.filterEnvelope,{context:this.context})),this.envelope=new Si(Object.assign(e.envelope,{context:this.context})),this.oscillator.chain(this.filter,this.envelope,this.output),this.filterEnvelope.connect(this.filter.frequency),K(this,["oscillator","frequency","detune","filter","filterEnvelope","envelope"])}static getDefaults(){return Object.assign(rt.getDefaults(),{envelope:Object.assign(tt(Xe.getDefaults(),Object.keys(R.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.9}),filter:Object.assign(tt(Yn.getDefaults(),Object.keys(R.getDefaults())),{Q:1,rolloff:-12,type:"lowpass"}),filterEnvelope:Object.assign(tt(Hn.getDefaults(),Object.keys(R.getDefaults())),{attack:.6,baseFrequency:200,decay:.2,exponent:2,octaves:3,release:2,sustain:.5}),oscillator:Object.assign(tt(Dt.getDefaults(),Object.keys(Ce.getDefaults())),{type:"sawtooth"})})}_triggerEnvelopeAttack(e,t=1){if(this.envelope.triggerAttack(e,t),this.filterEnvelope.triggerAttack(e),this.oscillator.start(e),this.envelope.sustain===0){const s=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+s+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.filterEnvelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this.filterEnvelope.dispose(),this.filter.dispose(),this}}class Jt extends Gn{constructor(){const e=F(Jt.getDefaults(),arguments);super(e),this.name="FMSynth",this.modulationIndex=new bt({context:this.context,value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output)}static getDefaults(){return Object.assign(Gn.getDefaults(),{modulationIndex:10})}dispose(){return super.dispose(),this.modulationIndex.dispose(),this}}class Ai extends Fe{constructor(){const e=F(Ai.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,K(this,["oscillator","envelope"])}static getDefaults(){return Zt(rt.getDefaults(),Fe.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const s=this.toSeconds(t),i=this.toFrequency(e instanceof Ye?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,s),this.oscillator.frequency.exponentialRampToValueAtTime(i,s+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}ct([_c(0)],Ai.prototype,"octaves",void 0);ct([St(0)],Ai.prototype,"pitchDecay",void 0);const xc=new Set;function Hr(n){xc.add(n)}function bc(n,e){const t=`registerProcessor("${n}", ${e})`;xc.add(t)}const lm=`
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
`;Hr(lm);const hm=`
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
`;Hr(hm);const um=`
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
`;Hr(um);const dm="feedback-comb-filter",pm=`
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
`;bc(dm,pm);class Me extends Rt{constructor(){const e=F(Me.getDefaults(),arguments,["voice","options"]);super(e),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=i=>this.releaseAll(i),U(!_t(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const s=this._voices.indexOf(this._dummyVoice);this._voices.splice(s,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(Rt.getDefaults(),{maxPolyphony:32,options:{},voice:Fe})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(s=>s.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return U(e instanceof rt,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else hi("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,s){e.forEach(i=>{const r=new jn(this.context,i).toMidi(),o=this._getNextAvailableVoice();o&&(o.triggerAttack(i,t,s),this._activeVoices.push({midi:r,voice:o,released:!1}),this.log("triggerAttack",i,t))})}_triggerRelease(e,t){e.forEach(s=>{const i=new jn(this.context,s).toMidi(),r=this._activeVoices.find(({midi:o,released:a})=>o===i&&!a);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",s,t))})}_scheduleEvent(e,t,s,i){U(!this.disposed,"Synth was already disposed"),s<=this.now()?e==="attack"?this._triggerAttack(t,s,i):this._triggerRelease(t,s):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,s,i)},s-this.now())}triggerAttack(e,t,s){Array.isArray(e)||(e=[e]);const i=this.toSeconds(t);return this._scheduleEvent("attack",e,i,s),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("release",e,s),this}triggerAttackRelease(e,t,s,i){const r=this.toSeconds(s);if(this.triggerAttack(e,r,i),He(t)){U(He(e),"If the duration is an array, the notes must also be an array"),e=e;for(let o=0;o<e.length;o++){const a=t[Math.min(o,t.length-1)],c=this.toSeconds(a);U(c>0,"The duration must be greater than 0"),this.triggerRelease(e[o],r+c)}}else{const o=this.toSeconds(t);U(o>0,"The duration must be greater than 0"),this.triggerRelease(e,r+o)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=tt(e,["onsilence","context"]);return this.options=Zt(this.options,t),this._voices.forEach(s=>s.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:s})=>{s.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class mn extends Rt{constructor(){const e=F(mn.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(s=>{const i=parseInt(s,10);if(U(_n(s)||_t(i)&&isFinite(i),`url key is neither a note or midi pitch: ${s}`),_n(s)){const r=new Ye(this.context,s).toMidi();t[r]=e.urls[s]}else _t(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new qr({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Rt.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:ie,onerror:ie,release:.1,urls:{}})}_findClosest(e){let s=0;for(;s<96;){if(this._buffers.has(e+s))return-s;if(this._buffers.has(e-s))return s;s++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,s=1){return this.log("triggerAttack",e,t,s),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=mc(new Ye(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,u=this._buffers.get(l),h=fc(c+a),d=new pn({url:u,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:h}).connect(this.output);d.start(t,0,u.duration/h,s),He(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),f=p.indexOf(d);f!==-1&&p.splice(f,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(s=>{const i=new Ye(this.context,s).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(s=>{for(;s.length;)s.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,s,i=1){const r=this.toSeconds(s);return this.triggerAttack(e,r,i),He(t)?(U(He(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,s){if(U(_n(e)||isFinite(e),`note must be a pitch or midi: ${e}`),_n(e)){const i=new Ye(this.context,e).toMidi();this._buffers.add(i,t,s)}else this._buffers.add(e,t,s);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}ct([St(0)],mn.prototype,"attack",void 0);ct([St(0)],mn.prototype,"release",void 0);class Ci extends R{constructor(){const e=F(Ci.getDefaults(),arguments,["fade"]);super(e),this.name="CrossFade",this._panner=this.context.createStereoPanner(),this._split=this.context.createChannelSplitter(2),this._g2a=new cm({context:this.context}),this.a=new ee({context:this.context,gain:0}),this.b=new ee({context:this.context,gain:0}),this.output=new ee({context:this.context}),this._internalChannels=[this.a,this.b],this.fade=new se({context:this.context,units:"normalRange",value:e.fade}),K(this,"fade"),this.context.getConstant(1).connect(this._panner),this._panner.connect(this._split),this._panner.channelCount=1,this._panner.channelCountMode="explicit",it(this._split,this.a.gain,0),it(this._split,this.b.gain,1),this.fade.chain(this._g2a,this._panner.pan),this.a.connect(this.output),this.b.connect(this.output)}static getDefaults(){return Object.assign(R.getDefaults(),{fade:.5})}dispose(){return super.dispose(),this.a.dispose(),this.b.dispose(),this.output.dispose(),this.fade.dispose(),this._g2a.dispose(),this._panner.disconnect(),this._split.disconnect(),this}}class zo extends R{constructor(e){super(e),this.name="Effect",this._dryWet=new Ci({context:this.context}),this.wet=this._dryWet.fade,this.effectSend=new ee({context:this.context}),this.effectReturn=new ee({context:this.context}),this.input=new ee({context:this.context}),this.output=this._dryWet,this.input.fan(this._dryWet.a,this.effectSend),this.effectReturn.connect(this._dryWet.b),this.wet.setValueAtTime(e.wet,0),this._internalChannels=[this.effectReturn,this.effectSend],K(this,"wet")}static getDefaults(){return Object.assign(R.getDefaults(),{wet:1})}connectEffect(e){return this._internalChannels.push(e),this.effectSend.chain(e,this.effectReturn),this}dispose(){return super.dispose(),this._dryWet.dispose(),this.effectSend.dispose(),this.effectReturn.dispose(),this.wet.dispose(),this}}class Xr extends R{constructor(){const e=F(Xr.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new Y({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",K(this,"pan")}static getDefaults(){return Object.assign(R.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const fm="bit-crusher",mm=`
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
`;bc(fm,mm);class Ni extends R{constructor(){const e=F(Ni.getDefaults(),arguments,["channels"]);super(e),this.name="Split",this._splitter=this.input=this.output=this.context.createChannelSplitter(e.channels),this._internalChannels=[this._splitter]}static getDefaults(){return Object.assign(R.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._splitter.disconnect(),this}}class gn extends R{constructor(){const e=F(gn.getDefaults(),arguments,["channels"]);super(e),this.name="Merge",this._merger=this.output=this.input=this.context.createChannelMerger(e.channels)}static getDefaults(){return Object.assign(R.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._merger.disconnect(),this}}class Go extends R{constructor(e){super(e),this.name="StereoEffect",this.input=new ee({context:this.context}),this.input.channelCount=2,this.input.channelCountMode="explicit",this._dryWet=this.output=new Ci({context:this.context,fade:e.wet}),this.wet=this._dryWet.fade,this._split=new Ni({context:this.context,channels:2}),this._merge=new gn({context:this.context,channels:2}),this.input.connect(this._split),this.input.connect(this._dryWet.a),this._merge.connect(this._dryWet.b),K(this,["wet"])}connectEffectLeft(...e){this._split.connect(e[0],0,0),ts(...e),it(e[e.length-1],this._merge,0,0)}connectEffectRight(...e){this._split.connect(e[0],1,0),ts(...e),it(e[e.length-1],this._merge,0,1)}static getDefaults(){return Object.assign(R.getDefaults(),{wet:1})}dispose(){return super.dispose(),this._dryWet.dispose(),this._split.dispose(),this._merge.dispose(),this}}class Wo extends Go{constructor(e){super(e),this.feedback=new se({context:this.context,value:e.feedback,units:"normalRange"}),this._feedbackL=new ee({context:this.context}),this._feedbackR=new ee({context:this.context}),this._feedbackSplit=new Ni({context:this.context,channels:2}),this._feedbackMerge=new gn({context:this.context,channels:2}),this._merge.connect(this._feedbackSplit),this._feedbackMerge.connect(this._split),this._feedbackSplit.connect(this._feedbackL,0,0),this._feedbackL.connect(this._feedbackMerge,0,0),this._feedbackSplit.connect(this._feedbackR,1,0),this._feedbackR.connect(this._feedbackMerge,0,1),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),K(this,["feedback"])}static getDefaults(){return Object.assign(Go.getDefaults(),{feedback:.5})}dispose(){return super.dispose(),this.feedback.dispose(),this._feedbackL.dispose(),this._feedbackR.dispose(),this._feedbackSplit.dispose(),this._feedbackMerge.dispose(),this}}class Ii extends Wo{constructor(){const e=F(Ii.getDefaults(),arguments,["frequency","delayTime","depth"]);super(e),this.name="Chorus",this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new zn({context:this.context,frequency:e.frequency,min:0,max:1}),this._lfoR=new zn({context:this.context,frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new Un({context:this.context}),this._delayNodeR=new Un({context:this.context}),this.frequency=this._lfoL.frequency,K(this,["frequency"]),this._lfoL.frequency.connect(this._lfoR.frequency),this.connectEffectLeft(this._delayNodeL),this.connectEffectRight(this._delayNodeR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this.depth=this._depth,this.type=e.type,this.spread=e.spread}static getDefaults(){return Object.assign(Wo.getDefaults(),{frequency:1.5,delayTime:3.5,depth:.7,type:"sine",spread:180,feedback:0,wet:.5})}get depth(){return this._depth}set depth(e){this._depth=e;const t=this._delayTime*e;this._lfoL.min=Math.max(this._delayTime-t,0),this._lfoL.max=this._delayTime+t,this._lfoR.min=Math.max(this._delayTime-t,0),this._lfoR.max=this._delayTime+t}get delayTime(){return this._delayTime*1e3}set delayTime(e){this._delayTime=e/1e3,this.depth=this._depth}get type(){return this._lfoL.type}set type(e){this._lfoL.type=e,this._lfoR.type=e}get spread(){return this._lfoR.phase-this._lfoL.phase}set spread(e){this._lfoL.phase=90-e/2,this._lfoR.phase=e/2+90}start(e){return this._lfoL.start(e),this._lfoR.start(e),this}stop(e){return this._lfoL.stop(e),this._lfoR.stop(e),this}sync(){return this._lfoL.sync(),this._lfoR.sync(),this}unsync(){return this._lfoL.unsync(),this._lfoR.unsync(),this}dispose(){return super.dispose(),this._lfoL.dispose(),this._lfoR.dispose(),this._delayNodeL.dispose(),this._delayNodeR.dispose(),this.frequency.dispose(),this}}class Mi extends zo{constructor(){const e=F(Mi.getDefaults(),arguments,["decay"]);super(e),this.name="Reverb",this._convolver=this.context.createConvolver(),this.ready=Promise.resolve();const t=this.toSeconds(e.decay);We(t,.001),this._decay=t;const s=this.toSeconds(e.preDelay);We(s,0),this._preDelay=s,this.generate(),this.connectEffect(this._convolver)}static getDefaults(){return Object.assign(zo.getDefaults(),{decay:1.5,preDelay:.01})}get decay(){return this._decay}set decay(e){e=this.toSeconds(e),We(e,.001),this._decay=e,this.generate()}get preDelay(){return this._preDelay}set preDelay(e){e=this.toSeconds(e),We(e,0),this._preDelay=e,this.generate()}generate(){return _e(this,void 0,void 0,function*(){const e=this.ready,t=new dn(2,this._decay+this._preDelay,this.context.sampleRate),s=new qn({context:t}),i=new qn({context:t}),r=new gn({context:t});s.connect(r,0,0),i.connect(r,0,1);const o=new ee({context:t}).toDestination();r.connect(o),s.start(0),i.start(0),o.gain.setValueAtTime(0,0),o.gain.setValueAtTime(1,this._preDelay),o.gain.exponentialApproachValueAtTime(0,this._preDelay,this.decay);const a=t.render();return this.ready=a.then(ie),yield e,this._convolver.buffer=(yield a).get(),this})}dispose(){return super.dispose(),this._convolver.disconnect(),this}}class be extends R{constructor(){const e=F(be.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new ee({context:this.context}),be._allSolos.has(this.context)||be._allSolos.set(this.context,new Set),be._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(R.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),be._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){be._soloed.has(this.context)||be._soloed.set(this.context,new Set),be._soloed.get(this.context).add(this)}_removeSolo(){be._soloed.has(this.context)&&be._soloed.get(this.context).delete(this)}_isSoloed(){return be._soloed.has(this.context)&&be._soloed.get(this.context).has(this)}_noSolos(){return!be._soloed.has(this.context)||be._soloed.has(this.context)&&be._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),be._allSolos.get(this.context).delete(this),this._removeSolo(),this}}be._allSolos=new Map;be._soloed=new Map;class Zr extends R{constructor(){const e=F(Zr.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new Xr({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Is({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,K(this,["pan","volume"])}static getDefaults(){return Object.assign(R.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class fs extends R{constructor(){const e=F(fs.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new be({solo:e.solo,context:this.context}),this._panVol=this.output=new Zr({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),K(this,["pan","volume"])}static getDefaults(){return Object.assign(R.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return fs.buses.has(e)||fs.buses.set(e,new ee({context:this.context})),fs.buses.get(e)}send(e,t=0){const s=this._getBus(e),i=new ee({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(s),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}fs.buses=new Map;class Oi extends R{constructor(){const e=F(Oi.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new Y({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new Y({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new Y({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new Y({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new Y({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),K(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(R.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function gm(){return Be().now()}Be().transport;Be().destination;Be().destination;Be().listener;Be().draw;Be();function ym(){return ne.loaded()}const Bt=new Oi({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),vm=new mn({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:n=>{console.warn("Failed to load Rhodes piano sampler:",n)}}).connect(Bt),_m=new Me(Fe,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(Bt),xm=new Mi({decay:4.5,wet:.35}).connect(Bt),bm=new Me(Fe,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(xm),wm=new Ii({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(Bt),Tm=new Me(Fe,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(wm),Sm=new Me(ki,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(Bt),km=new Me(Jt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(Bt),Am=new Me(Fe,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(Bt),Cm=new Me(Jt,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(Bt);function Nm(n){switch(n){case"organ":return _m;case"pad-strings":return bm;case"juno-pad":return Tm;case"stab":return Sm;case"epiano":return km;case"guitar":return Am;case"bell":return Cm;case"rhodes":default:return vm}}const Os=[{name:"Piano",instrument:"rhodes",color:"#9CC0EC"},{name:"Rhodes",instrument:"epiano",color:"#F2A79B"},{name:"Nylon Guitar",instrument:"guitar",color:"#F6D98B"},{name:"Warm Pad",instrument:"pad-strings",color:"#C9A9E0"},{name:"Synth Bell",instrument:"bell",color:"#B8CC9E"},{name:"Drawbar Organ",instrument:"organ",color:"#E8609A"},{name:"Analog Synth",instrument:"juno-pad",color:"#7B61FF"},{name:"Synth Stab",instrument:"stab",color:"#FF8C42"}],Es=[{name:"Block chords",color:"#F2A79B",patch:{arpMode:"off",spread:.3}},{name:"Arpeggio",color:"#9CC0EC",patch:{arpMode:"up",arpRate:"1/8",arpRange:1}},{name:"Strum",color:"#F6D98B",patch:{arpMode:"up",arpRate:"1/32",arpRange:1}},{name:"Broken (swing)",color:"#C9A9E0",patch:{arpMode:"up",arpRate:"1/8T",arpRange:1}},{name:"Half-time",color:"#B8CC9E",patch:{arpMode:"off",spread:.1,durationMultiplier:1.8}},{name:"Descending Arp",color:"#7B61FF",patch:{arpMode:"down",arpRate:"1/8",arpRange:1}},{name:"Off-beat / Ska",color:"#FF8C42",patch:{arpMode:"off",spread:.1,microTiming:.8}},{name:"Fast Triplet",color:"#7CD9B6",patch:{arpMode:"up",arpRate:"1/16T",arpRange:1}}],Jr={Pop:"rhodes",Rock:"rhodes","Indie/Folk":"rhodes","Lo-fi/Chill":"rhodes","Jazz-ish":"rhodes","R&B/Soul":"rhodes",Gospel:"organ",Cinematic:"pad-strings",Synthwave:"juno-pad","House/Dance":"stab",Blues:"rhodes","Funk/Disco":"epiano","Country/Bluegrass":"guitar","Reggae/Dub":"organ",Metal:"stab",Punk:"stab","Ambient/Drone":"pad-strings","Trap/Hip-Hop":"epiano","Bossa Nova/Latin":"guitar","Classical/Orchestral":"pad-strings","EDM/Trance":"juno-pad",Afrobeats:"epiano",Shoegaze:"pad-strings"},Qr={Pop:{minVelocity:90,maxVelocity:110,spread:.5,microTiming:.3,humanVariance:.3,duration:1},Rock:{minVelocity:105,maxVelocity:127,spread:.2,microTiming:.1,humanVariance:.15,duration:.9},"Indie/Folk":{minVelocity:80,maxVelocity:105,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},"Lo-fi/Chill":{minVelocity:55,maxVelocity:85,spread:2.5,microTiming:1.2,humanVariance:.8,duration:1.4,arpMode:"up",arpRate:"1/8",arpRange:1},"Jazz-ish":{minVelocity:70,maxVelocity:100,spread:1.8,microTiming:1,humanVariance:.6,duration:1.2,arpMode:"up",arpRate:"1/8T",arpRange:1},"R&B/Soul":{minVelocity:75,maxVelocity:105,spread:1.2,microTiming:.6,humanVariance:.5,duration:1.3},Gospel:{minVelocity:95,maxVelocity:120,spread:.4,microTiming:.2,humanVariance:.2,duration:1.5},Cinematic:{minVelocity:60,maxVelocity:90,spread:0,microTiming:0,humanVariance:.1,duration:2.2},Synthwave:{minVelocity:70,maxVelocity:95,spread:0,microTiming:0,humanVariance:.1,duration:1.8},"House/Dance":{minVelocity:100,maxVelocity:127,spread:0,microTiming:.1,humanVariance:.15,duration:.5},Blues:{minVelocity:80,maxVelocity:110,spread:1.4,microTiming:.7,humanVariance:.5,duration:1.2},"Funk/Disco":{minVelocity:95,maxVelocity:125,spread:.3,microTiming:.2,humanVariance:.2,duration:.8},"Country/Bluegrass":{minVelocity:85,maxVelocity:115,spread:1,microTiming:.4,humanVariance:.3,duration:1},"Reggae/Dub":{minVelocity:70,maxVelocity:100,spread:2,microTiming:1,humanVariance:.6,duration:1.3},Metal:{minVelocity:110,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:.8},Punk:{minVelocity:115,maxVelocity:127,spread:.1,microTiming:.1,humanVariance:.1,duration:.7},"Ambient/Drone":{minVelocity:45,maxVelocity:75,spread:0,microTiming:0,humanVariance:.05,duration:3},"Trap/Hip-Hop":{minVelocity:90,maxVelocity:120,spread:.2,microTiming:.2,humanVariance:.2,duration:1},"Bossa Nova/Latin":{minVelocity:75,maxVelocity:105,spread:1.5,microTiming:.8,humanVariance:.5,duration:1.1,arpMode:"up",arpRate:"1/8T",arpRange:1},"Classical/Orchestral":{minVelocity:50,maxVelocity:115,spread:.5,microTiming:.3,humanVariance:.3,duration:2},"EDM/Trance":{minVelocity:95,maxVelocity:127,spread:.1,microTiming:.05,humanVariance:.1,duration:1.2},Afrobeats:{minVelocity:85,maxVelocity:115,spread:1,microTiming:.5,humanVariance:.4,duration:1.1},Shoegaze:{minVelocity:65,maxVelocity:95,spread:.8,microTiming:.4,humanVariance:.3,duration:2.5}},Im={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Warm Pad",bell:"Synth Bell",organ:"Piano",stab:"Nylon Guitar"};function kn(n){const e=Jr[n]??"rhodes";return Im[e]??"Piano"}function An(n){return(Qr[n]?.arpMode??"off")==="off"?"Block chords":"Arpeggio"}function Mm(){return Promise.race([ym(),new Promise(n=>setTimeout(n,3e3))])}function wc(n,e){const t=e/60;switch(n){case"1/4":return 1/t;case"1/8":return .5/t;case"1/8T":return .5/t*(2/3);case"1/16":return .25/t;case"1/32":return .125/t;default:return .25/t}}function Tc(n,e){const t=[];for(let s=0;s<e;s++)for(const i of n){const r=i.match(/^([A-G]#?)(-?\d+)$/);if(r){const o=r[1],a=parseInt(r[2],10)+s;t.push(`${o}${a}`)}else t.push(i)}return t}function Sc(n,e){const t=[...n];switch(e){case"up":return t;case"down":return[...t].reverse();case"up-down":return[...t,...[...t].reverse().slice(1,-1)];case"random":return t.sort(()=>Math.random()-.5);default:return t}}const Yo={rhodes:"Piano",epiano:"Rhodes",guitar:"Nylon Guitar","pad-strings":"Warm Pad","juno-pad":"Analog Synth",bell:"Synth Bell",organ:"Drawbar Organ",stab:"Synth Stab"};function Om(n){if(!n)return;const e=n.toLowerCase().trim();return Yo[e]?Yo[e]:Os.find(s=>s.name.toLowerCase()===e||s.instrument.toLowerCase()===e)?.name}function Em(n){if(!n)return;const e=n.toLowerCase().trim();return e.includes("strum")?"Strum":e.includes("descend")?"Descending Arp":e.includes("half")?"Half-time":e.includes("swing")||e.includes("broken")?"Broken (swing)":e.includes("offbeat")||e.includes("ska")||e.includes("syncopat")||e.includes("groove")?"Off-beat / Ska":e.includes("triplet")||e.includes("fast")?"Fast Triplet":e.includes("arp")||e.includes("cascade")?"Arpeggio":e.includes("block")||e.includes("pad")||e.includes("sustained")?"Block chords":Es.find(s=>s.name.toLowerCase()===e)?.name??"Block chords"}function Dm(n,e=.7,t,s="rhodes",i){try{Promise.all([Xf(),Mm()]).then(()=>{const r=Nm(s);if(i&&typeof i=="object"&&Object.keys(i).length>0)try{typeof r.set=="function"&&r.set(i)}catch(l){console.warn("Failed to apply customConfig to Tone.js instrument:",l)}const o=n.length,a=o<=1?1:Math.max(.4,1/Math.sqrt(o)),c=gm();if(t&&t.arpMode&&t.arpMode!=="off"){const l=t.bpm??80,u=t.arpRate??"1/16",h=t.arpRange??1,d=t.arpMode,p=wc(u,l),f=Tc(n,h),m=Sc(f,d),g=()=>t.minVelocity!==void 0&&t.maxVelocity!==void 0?(t.minVelocity+Math.random()*(t.maxVelocity-t.minVelocity))/127*a:a,y=t.duration?t.duration*(1+(Math.random()-.5)*.1*(t.humanVariance??0)):Math.max(.05,p*.9);m.forEach((w,b)=>{const k=t.microTiming?(Math.random()-.5)*t.microTiming*.02:0;r.triggerAttackRelease(w,y,c+b*p+k,g())});return}n.forEach((l,u)=>{let h=0,d=a,p=e;if(t){const{minVelocity:f,maxVelocity:m,spread:g,microTiming:y,humanVariance:w,duration:b}=t;d=(f+Math.random()*(m-f))/127*a;const v=u*g*.1,T=(Math.random()-.5)*y*.05,S=(Math.random()-.5)*w*.03;h=Math.max(0,v+T+S),p=b*(1+(Math.random()-.5)*.2*w)}r.triggerAttackRelease(l,p,c+h,d)})}).catch(r=>{console.warn("Audio playback gesture failed:",r)})}catch(r){console.warn("Audio playback failed:",r)}}function Ho(n,e,t){const s=t?.instrument?Os.find(h=>h.name===t.instrument):void 0,i=t?.playStyle?Es.find(h=>h.name===t.playStyle):void 0,r=s?.instrument??Jr[e]??"rhodes",o=Qr[e]||{},a=i?.patch??{},c={...o,...a,bpm:t?.bpm??o.bpm??90},l=t?.duration??o.duration??.9,u=a.durationMultiplier?l*a.durationMultiplier:l;Dm(n,u,c,r,t?.customConfig)}const Rm=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],$m=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],vt={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},Pm=new Set(["F","Bb","Eb","Ab","Db","Gb"]),Ts=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],Ei={maj:[0,4,7],min:[0,3,7],dim:[0,3,6],aug:[0,4,8],dom7:[0,4,7,10],min7:[0,3,7,10],maj7:[0,4,7,11],dim7:[0,3,6,9],sus4:[0,5,7]},Fm=Object.keys(Ei),Lm={TONIC:"home",SUPERTONIC:"rise",MEDIANT:"glow",SUBDOMINANT:"lift",DOMINANT:"reach",SUBMEDIANT:"hold","LEADING-TONE":"edge",SUBTONIC:"drift"},Xo={TONIC:"Tonic",SUPERTONIC:"Supertonic",MEDIANT:"Mediant",SUBDOMINANT:"Subdominant",DOMINANT:"Dominant",SUBMEDIANT:"Submediant","LEADING-TONE":"Leading tone",SUBTONIC:"Subtonic"},Vm={TONIC:.04,SUBMEDIANT:.24,MEDIANT:.34,SUBDOMINANT:.42,SUPERTONIC:.52,SUBTONIC:.58,"LEADING-TONE":.78,DOMINANT:.68},sr={MAJOR:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii°"},NATURAL_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III",SUBDOMINANT:"iv",DOMINANT:"v",SUBMEDIANT:"VI",SUBTONIC:"VII"},HARMONIC_MINOR:{TONIC:"i",SUPERTONIC:"ii°",MEDIANT:"III+",SUBDOMINANT:"iv",DOMINANT:"V",SUBMEDIANT:"VI","LEADING-TONE":"vii°"},MELODIC_MINOR:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III+",SUBDOMINANT:"IV",DOMINANT:"V",SUBMEDIANT:"vi°","LEADING-TONE":"vii°"},DORIAN:{TONIC:"i",SUPERTONIC:"ii",MEDIANT:"III",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi°",SUBTONIC:"VII"},MIXOLYDIAN:{TONIC:"I",SUPERTONIC:"ii",MEDIANT:"iii°",SUBDOMINANT:"IV",DOMINANT:"v",SUBMEDIANT:"vi",SUBTONIC:"VII"},LYDIAN:{TONIC:"I",SUPERTONIC:"II",MEDIANT:"iii",SUBDOMINANT:"iv°",DOMINANT:"V",SUBMEDIANT:"vi","LEADING-TONE":"vii"}},Bm=Object.keys(sr),Zo={MAJOR:"Ionian",NATURAL_MINOR:"Aeolian",HARMONIC_MINOR:"Harmonic minor",MELODIC_MINOR:"Melodic minor",DORIAN:"Dorian",MIXOLYDIAN:"Mixolydian",LYDIAN:"Lydian"},Us=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],Um={Pop:"MAJOR",Rock:"MAJOR",Gospel:"MAJOR","Indie/Folk":"MAJOR","Lo-fi/Chill":"DORIAN","Jazz-ish":"DORIAN","R&B/Soul":"MIXOLYDIAN","House/Dance":"MIXOLYDIAN",Synthwave:"LYDIAN",Cinematic:"LYDIAN",Blues:"MIXOLYDIAN","Funk/Disco":"MIXOLYDIAN","Country/Bluegrass":"MAJOR","Reggae/Dub":"DORIAN",Metal:"HARMONIC_MINOR",Punk:"MAJOR","Ambient/Drone":"LYDIAN","Trap/Hip-Hop":"NATURAL_MINOR","Bossa Nova/Latin":"DORIAN","Classical/Orchestral":"MAJOR","EDM/Trance":"NATURAL_MINOR",Afrobeats:"MIXOLYDIAN",Shoegaze:"LYDIAN"},jm={Uplifting:null,Melancholy:"NATURAL_MINOR",Dreamy:null,Tense:"HARMONIC_MINOR",Warm:null,Nostalgic:"NATURAL_MINOR",Energetic:null,Dark:"HARMONIC_MINOR",Peaceful:null,Groovy:"MIXOLYDIAN",Epic:"MAJOR"},kc={Uplifting:["DOMINANT","SUBDOMINANT","SUBMEDIANT"],Melancholy:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Dreamy:["MEDIANT","SUBDOMINANT","SUPERTONIC"],Tense:["DOMINANT","LEADING-TONE","SUPERTONIC"],Warm:["SUBDOMINANT","MEDIANT","SUBMEDIANT"],Nostalgic:["SUBMEDIANT","MEDIANT","DOMINANT"],Energetic:["DOMINANT","SUBDOMINANT","SUPERTONIC"],Dark:["SUBMEDIANT","SUBTONIC","SUPERTONIC"],Peaceful:["TONIC","SUBDOMINANT","MEDIANT"],Groovy:["SUBDOMINANT","DOMINANT","SUBTONIC"],Epic:["TONIC","DOMINANT","SUBMEDIANT"]},$t=[{name:"Uplifting",dot:"#F6D98B",desc:"Bright, major, forward-moving",iconPath:"M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"},{name:"Melancholy",dot:"#9CC0EC",desc:"Minor-leaning, unresolved longing",iconPath:"M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"},{name:"Dreamy",dot:"#C9A9E0",desc:"Suspended, floating, reverb-soaked",iconPath:"M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"},{name:"Tense",dot:"#F2735F",desc:"Chromatic pulls, unresolved tension",iconPath:"M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"},{name:"Warm",dot:"#F2C9A0",desc:"Rich, consonant, close voicings",iconPath:"M12 4 a6.5 6.5 0 1 0 6.5 6.5"},{name:"Nostalgic",dot:"#B8CC9E",desc:"Bittersweet, borrowed chords",iconPath:"M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"},{name:"Energetic",dot:"#FF8C42",desc:"High velocity, driving rhythm",iconPath:"M13 2 L4 14 h7 l-2 8 11-12 h-7 z"},{name:"Dark",dot:"#7B61FF",desc:"Deep minor, ominous resonance",iconPath:"M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"},{name:"Peaceful",dot:"#7CD9B6",desc:"Serene, gentle acoustic space",iconPath:"M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"},{name:"Groovy",dot:"#E8609A",desc:"Syncopated, rhythmic bounce",iconPath:"M4 12 c4-4 8 4 12-4 s8 4 4 8"},{name:"Epic",dot:"#E5C158",desc:"Sweeping dynamics, triumphant power",iconPath:"M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"}];function Xn(n){return($t.find(e=>e.name===n)||$t[0]).dot}const qm={MAJOR:[{degrees:["TONIC","DOMINANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","DOMINANT"]},{degrees:["SUBMEDIANT","SUBDOMINANT","TONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","DOMINANT"]},{degrees:["TONIC","MEDIANT","SUBMEDIANT","SUBDOMINANT"]},{degrees:["TONIC","SUBDOMINANT","SUBMEDIANT","DOMINANT"]}],NATURAL_MINOR:[{degrees:["TONIC","SUBMEDIANT","MEDIANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","MEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUBTONIC","DOMINANT"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBMEDIANT"]}],HARMONIC_MINOR:[{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUBDOMINANT"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","DOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","SUPERTONIC","DOMINANT"]}],DORIAN:[{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUBDOMINANT","SUPERTONIC","SUBTONIC"]}],MIXOLYDIAN:[{degrees:["TONIC","SUBTONIC","SUBDOMINANT","SUBMEDIANT"]},{degrees:["TONIC","SUBDOMINANT","SUBTONIC","SUPERTONIC"]},{degrees:["TONIC","SUBMEDIANT","SUBDOMINANT","SUBTONIC"]},{degrees:["TONIC","SUPERTONIC","SUBTONIC","SUBDOMINANT"]}],LYDIAN:[{degrees:["TONIC","SUPERTONIC","SUBMEDIANT","DOMINANT"]},{degrees:["TONIC","DOMINANT","SUPERTONIC","SUBMEDIANT"]},{degrees:["TONIC","SUBMEDIANT","DOMINANT","SUPERTONIC"]},{degrees:["TONIC","SUPERTONIC","DOMINANT","SUBMEDIANT"]}]};function zm(n,e){return 1+n.degrees.filter(t=>e.includes(t)).length*.6}function Zn(n,e){const t=n.reduce((i,r)=>i+e(r),0);let s=Math.random()*t;for(const i of n)if(s-=e(i),s<=0)return i;return n[n.length-1]}function Gm(n){if(n.length)return n[Math.floor(Math.random()*n.length)]}const nr=4,ss=1,lt=8,Kr=1700,Wm={TONIC:{SUBDOMINANT:.35,SUBMEDIANT:.25,SUPERTONIC:.15,DOMINANT:.15,MEDIANT:.05,SUBTONIC:.05},SUPERTONIC:{DOMINANT:.5,SUBDOMINANT:.2,SUBMEDIANT:.15,TONIC:.1,"LEADING-TONE":.05},MEDIANT:{SUBMEDIANT:.4,SUBDOMINANT:.3,SUPERTONIC:.15,DOMINANT:.15},SUBDOMINANT:{DOMINANT:.45,TONIC:.25,SUPERTONIC:.15,SUBMEDIANT:.15},DOMINANT:{TONIC:.55,SUBMEDIANT:.25,SUBDOMINANT:.15,MEDIANT:.05},SUBMEDIANT:{SUBDOMINANT:.4,SUPERTONIC:.25,DOMINANT:.2,TONIC:.15},"LEADING-TONE":{TONIC:.7,SUBMEDIANT:.2,MEDIANT:.1},SUBTONIC:{TONIC:.45,SUBDOMINANT:.3,SUBMEDIANT:.15,DOMINANT:.1}};function Cn(n,e,t="MAJOR",s="Pop",i="Uplifting"){if(n===e)return .05;let o=(Wm[n]||{})[e]??.1;return(t.includes("MINOR")||t==="DORIAN")&&(n==="TONIC"&&e==="SUBMEDIANT"&&(o*=1.5),n==="SUBMEDIANT"&&e==="MEDIANT"&&(o*=1.4),n==="MEDIANT"&&e==="SUBTONIC"&&(o*=1.4),n==="SUBTONIC"&&e==="TONIC"&&(o*=1.3)),s==="Jazz-ish"||s==="Lo-fi/Chill"?(n==="SUPERTONIC"&&e==="DOMINANT"&&(o*=1.8),n==="DOMINANT"&&e==="TONIC"&&(o*=1.5),n==="TONIC"&&e==="SUPERTONIC"&&(o*=1.4)):(s==="House/Dance"||s==="Synthwave")&&(e==="SUBTONIC"||e==="SUBDOMINANT")&&(o*=1.5),(kc[i]||[]).includes(e)&&(o*=1.5),Math.max(.01,o)}function Ym(n,e,t,s,i,r,o=nr){let a="TONIC";(n.type.includes("MINOR")||n.type==="DORIAN")&&(r==="Melancholy"||r==="Nostalgic")&&Math.random()<.4&&(a=t.includes("SUBMEDIANT")?"SUBMEDIANT":"TONIC");const c=[a];let l=a;for(let u=1;u<o;u++){const h=u===o-1;let d=t.filter(m=>n.degrees[m]);d.length||(d=t);const p=d.filter(m=>m!==l),f=p.length?p:d;if(h){const m=Zn(f,g=>{const y=Cn(g,c[0],n.type,i,r),w=Cn(l,g,n.type,i,r);return y*w});c.push(m)}else{const m=f.filter(w=>!c.includes(w)),g=m.length?m:f,y=Zn(g,w=>Cn(l,w,n.type,i,r));l=y,c.push(y)}}return c}function Hs(n,e){const t=(n%12+12)%12;return e?$m[t]:Rm[t]}function eo(n){const e=n[0]?.toUpperCase();let t="C",s=n;e&&/[A-G]/.test(e)&&(n[1]==="B"?(t=`${e}b`,s=n.slice(2)):n[1]==="#"?(t=`${e}#`,s=n.slice(2)):(t=e,s=n.slice(1))),s=s.toLowerCase();let i="maj";return s.includes("maj7")?i="maj7":s.includes("min7")||s.includes("m7")?i="min7":s.includes("dim7")?i="dim7":s.includes("dim")?i="dim":s.includes("aug")?i="aug":s.includes("sus")?i="sus4":s==="7"?i="dom7":s.includes("min")||s==="m"?i="min":i="maj",{root:t,quality:i}}function Hm(n,e){const{root:t,quality:s}=eo(n),i=vt[t]??0;return Ei[s].map(o=>Hs(i+o,e))}async function Xm(){let n=await fetch("./chroma_chords_data.json");if(n.ok||(n=await fetch("./chord_voyager_data.json")),!n.ok)throw new Error(`HTTP error: ${n.status}`);const e=await n.json();return sg(e),e}const Zm={C:"F",Db:"F#",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},Jm={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},Qm={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},Km={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},eg={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"},tg={DORIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],MIXOLYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"],LYDIAN:["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]};function sg(n){const e=[["MIXOLYDIAN",Zm],["DORIAN",Jm],["LYDIAN",Qm]];for(const[t,s]of e)for(const[i,r]of Object.entries(s)){const o=n.scales[`${r}_MAJOR`];if(!o)continue;const a=`${i}_${t}`,c={};for(const l of tg[t]){const u=eg[`${t}_${l}`],h=o.degrees[u];if(!h)continue;const d=JSON.parse(JSON.stringify(h));d.next_chord_options=(d.next_chord_options||[]).map(p=>{if(p.nodeId.startsWith(`${r}_MAJOR_`)){const f=p.nodeId.replace(`${r}_MAJOR_`,""),m=Km[`${t}_${f}`];if(m)return{name:p.name,nodeId:`${i}_${t}_${m}`}}return p}),c[l]=d}n.scales[a]={root:i,type:t,degrees:c}}}const ng=[156,192,236],ig=[242,115,95];function Nn(n,e,t){return n+(e-n)*t}function to(n){const e=Math.max(0,Math.min(1,n));return"#"+ng.map((s,i)=>Math.round(Nn(s,ig[i],e))).map(s=>s.toString(16).padStart(2,"0")).join("")}function Jn(n){const e=Math.max(0,Math.min(1,n));return{size:Math.round(Nn(84,128,e)),radius:Math.round(Nn(40,12,e)),fontSize:Math.round(Nn(21,30,e)),color:to(e)}}function rg(n,e,t){return{Tonic:`As the tonic, ${t} establishes home — the point of full rest and resolution.`,Supertonic:`As the supertonic, ${t} steps just off home, a light pivot toward what comes next.`,Mediant:`As the mediant, ${t} offers a soft, glowing detour — related to home, but colored differently.`,Subdominant:`As the subdominant, ${t} lifts away from home, opening the progression outward before it turns back.`,Dominant:`As the dominant, ${t} builds the pull of the progression — tension that wants to resolve.`,Submediant:`As the submediant, ${t} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,"Leading tone":`As the leading tone, ${t} sits right on the edge, straining toward resolution.`,Subtonic:`As the subtonic, ${t} drifts just below home, a soft modal step rather than a hard pull.`}[n]||`${t} colors the progression as the ${n.toLowerCase()} of ${e}.`}function ms(n,e,t,s){const r=t.degrees[e].chord_name,o=Vm[e]??.5,a=sr[t.type]||sr.MAJOR;return{name:Jo(r),tag:Lm[e]||"move",roman:a[e]||"?",color:to(o),functionLabel:Xo[e]||e,notes:Hm(r,s),scaleLabel:`${t.root} ${Zo[t.type]||t.type}`,desc:rg(Xo[e]||e,Zo[t.type]||t.type,Jo(r)),degree:e,scaleKey:n,tension:o}}function Jo(n){const{root:e,quality:t}=eo(n);return`${e}${{maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"}[t]??""}`}const og={Pop:116,"Lo-fi/Chill":80,"R&B/Soul":90,"Indie/Folk":105,Synthwave:118,"Jazz-ish":95,Gospel:85,Cinematic:75,Rock:124,"House/Dance":126,Blues:88,"Funk/Disco":114,"Country/Bluegrass":110,"Reggae/Dub":78,Metal:140,Punk:155,"Ambient/Drone":65,"Trap/Hip-Hop":135,"Bossa Nova/Latin":120,"Classical/Orchestral":72,"EDM/Trance":132,Afrobeats:108,Shoegaze:112};function Ac(n,e){let t=og[n]||92;return e==="Tense"&&(t+=6),(e==="Dreamy"||e==="Melancholy")&&(t-=6),t}function Cc(n,e,t,s){const i=Math.max(ss,Math.min(lt,s?.length??nr)),r=Um[e]||"MAJOR",o=jm[t],a=s?.scaleType||(o&&r==="MAJOR"?o:r);let c=s?.key&&Ts.includes(s.key)?s.key:Gm(Ts),l=`${c}_${a}`;n.scales[l]||(c="C",l=`${c}_${a}`);const u=n.scales[l],h=Xs(c,a),d=Object.keys(u.degrees),p=kc[t]||[],f=qm[a]||[],m=i===nr?f.filter(b=>b.degrees.every(k=>d.includes(k))):[],w=(m.length&&Math.random()<.25?Zn(m,b=>zm(b,p)).degrees:Ym(u,l,d,p,e,t,i)).map(b=>ms(l,b,u,h));return{genre:e,mood:t,key:c,scaleType:a,bpm:Ac(e,t),chords:w}}function ag(n,e,t,s,i,r){const o=`${e}_${t}`,a=n.scales[o];if(!a||!s.length)return null;const c=Xs(e,t),l=vt[e]??0,u={};Object.entries(a.degrees).forEach(([d,p])=>{const{root:f}=eo(p.chord_name),m=vt[f]??0;m in u||(u[m]=d)});const h=s.slice(0,lt).map(({root:d,quality:p})=>{const f=vt[d]??l,m=u[f];if(m)return ms(o,m,a,c);const g=(f-l+12)%12,y=Ei[p]?p:"maj";return ir(e,g,y,"Borrowed","?","drift",c)});return h.length<ss?null:{genre:i,mood:r,key:e,scaleType:t,bpm:Ac(i,r),chords:h}}function Vi(n,e,t,s,i,r,o){const a=n.filter(u=>e.includes(u)),c=a.filter(u=>u!==t),l=c.length?c:a;if(l.length)return Zn(l,u=>Cn(s,u,i,r,o))}const cg={maj:"",min:"m",dim:"dim",aug:"aug",dom7:"7",min7:"m7",maj7:"maj7",dim7:"dim7",sus4:"sus4"};function ir(n,e,t,s,i,r,o){const a=(vt[n]??0)+e,l=`${Hs(a,o)}${cg[t]}`,u=Ei[t].map(d=>Hs(a+d,o)),h=.3;return{name:l,tag:r,roman:i,color:to(h),functionLabel:s,notes:u,scaleLabel:"Borrowed",desc:`${l} borrows its color from outside the current key.`,degree:"BORROWED",scaleKey:"",tension:h}}function rr(n){const e=n.match(/^[A-Ga-g][#b]?/),t=e?e[0]:"C";return t[0].toUpperCase()+t.slice(1)}const Qo={Major:[0,4,7],Minor:[0,3,7],"Suspended (sus)":[0,5,7],Diminished:[0,3,6]};function or(n,e,t,s){const i=vt[n]??0;let r=Qo[e]||Qo.Major;return t==="6th"?r=[...r,9]:t==="7th (dom / m7)"?r=[...r,10]:t==="Major 7th (M7)"?r=[...r,11]:t==="9th"&&(r=[...r,10,14]),r.map(o=>Hs(i+o,s))}const lg={Major:"",Minor:"m","Suspended (sus)":"sus",Diminished:"dim"},hg={None:"","6th":"6","7th (dom / m7)":"7","Major 7th (M7)":"maj7","9th":"9"};function ug(n,e,t){return e==="Minor"&&t==="Major 7th (M7)"?`${n}m(maj7)`:`${n}${lg[e]??""}${hg[t]??""}`}const Nc=["C","D","E","F","G","A","B"],so=10,Qn=Nc.indexOf("E")+4*7,dg=Qn+4*2,ar=20,Ic=ar+4*so,pg={C:[],G:["F#"],D:["F#","C#"],A:["F#","C#","G#"],E:["F#","C#","G#","D#"],B:["F#","C#","G#","D#","A#"],"F#":["F#","C#","G#","D#","A#","E#"],F:["Bb"],Bb:["Bb","Eb"],Eb:["Bb","Eb","Ab"],Ab:["Bb","Eb","Ab","Db"],Db:["Bb","Eb","Ab","Db","Gb"]},fg={MAJOR:0,LYDIAN:5,MIXOLYDIAN:7,DORIAN:2,NATURAL_MINOR:9,HARMONIC_MINOR:9},Mc={};Ts.forEach(n=>{Mc[vt[n]]=n});function Oc(n,e){const t=fg[e]??0,i=(((vt[n]??0)-t)%12+12)%12;return Mc[i]??"C"}function Ec(n,e){return pg[Oc(n,e)]??[]}function Xs(n,e){const t=Oc(n,e);return Pm.has(t)||t.includes("b")}function Bi(n,e){return Hs(vt[n]??0,Xs(n,e))}const Ko={"F#":38,"C#":35,"G#":39,"D#":36,"A#":33,"E#":37,"B#":34,Bb:34,Eb:37,Ab:33,Db:36,Gb:32,Cb:35,Fb:31};function mg(n){let e=4,t=-1;return n.map(s=>{const i=Nc.indexOf(s[0].toUpperCase());return t!==-1&&i<=t&&e++,t=i,i+e*7})}function zt(n){return Ic-(n-Qn)*(so/2)}const Fs=10,Ui=46,ea=26,ta=14;function gg(n,e,t){const s=Ec(e,t),i=8,r=s.length?s.length*i+6:0,o=s.map(w=>Ko[w]),a=n.map(w=>mg(w.notes)),c=a.flat(),l=Math.min(ar,...c.map(zt),...o.map(zt)),u=Math.max(Ic,...c.map(zt),...o.map(zt)),h=Fs+ta-l,d=u-l+12+Fs+ta,p=[0,1,2,3,4].map(w=>ar+w*so+h),f=Fs+ea+r,m=s.map((w,b)=>({x:Fs+ea+b*i,y:zt(Ko[w])+h,sign:w.includes("#")?"sharp":"flat"})),g=n.map((w,b)=>{const k=f+b*Ui+Ui/2,v=a[b],T=v.map(_=>({x:k,y:zt(_)+h})),S=[];v.forEach(_=>{(_-Qn)%2===0&&(_<Qn||_>dg)&&S.push({x:k-9,y:zt(_)+h})});const I=Math.min(...T.map(_=>_.y))-10;return{cx:k,name:w.name,roman:w.roman,notes:T,ledgers:S,labelY:I}});return{width:f+n.length*Ui+Fs,height:d,lines:p,keySignature:m,chords:g}}function yg(n,e,t){const s=rr(n.name),i=s.includes("b");return{...n,name:ug(s,e,t),notes:or(s,e,t,i)}}function vg(n,e,t){const s=e.chords[t],i=n.scales[s.scaleKey],r=Object.keys(i.degrees),o=Xs(e.key,e.scaleType),a=[],c=(t-1+e.chords.length)%e.chords.length,l=e.chords[c]?.degree||"TONIC",u=e.scaleType.includes("MINOR")?"MAJOR":"NATURAL_MINOR",h=`${e.key}_${u}`,d=n.scales[h],p=Xs(e.key,u),f=u==="NATURAL_MINOR"?["SUBMEDIANT","MEDIANT","SUBDOMINANT"]:["SUBDOMINANT","SUBMEDIANT"];if(d){const b=Vi(f,Object.keys(d.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(b){const k=ms(h,b,d,p);a.push({label:"Darker",sub:"heavier, more shadow",chord:k,functionCaption:`Borrowed · ${k.notes.join(" · ")}`,rationale:`A borrowed chord from the parallel ${u==="NATURAL_MINOR"?"minor":"major"} — it darkens the color with an unexpected shadow.`})}}else{const b=u==="NATURAL_MINOR"?ir(e.key,8,"maj","Submediant","bVI","hold",p):ir(e.key,5,"maj","Subdominant","IV","lift",p);a.push({label:"Darker",sub:"heavier, more shadow",chord:b,functionCaption:`Borrowed · ${b.notes.join(" · ")}`,rationale:"A borrowed chord — it darkens the color with a shadow pulled from outside the current key."})}let m=s.scaleKey,g=i;if(e.scaleType==="NATURAL_MINOR"&&Math.random()<.5){const b=`${e.key}_HARMONIC_MINOR`,k=n.scales[b];k?.degrees.DOMINANT&&(m=b,g=k)}const y=Vi(["DOMINANT","LEADING-TONE","SUPERTONIC"],Object.keys(g.degrees),s.degree,l,e.scaleType,e.genre,e.mood);if(y){const b=ms(m,y,g,o);a.push({label:"More tension",sub:"sharper pull forward",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:`Aimed at the ${b.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`})}const w=Vi(["SUBDOMINANT","MEDIANT","SUBMEDIANT"],r,s.degree,l,e.scaleType,e.genre,e.mood);if(w){const b=ms(s.scaleKey,w,i,o);a.push({label:"Dreamier",sub:"softer, more air",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:"Soft and airy — it floats rather than resolving."})}if(r.includes("TONIC")){const b=ms(s.scaleKey,"TONIC",i,o);a.push({label:"Resolve home",sub:"settles back to center",chord:b,functionCaption:`${b.functionLabel} · ${b.notes.join(" · ")}`,rationale:"Returns to the tonic — full resolution, the sense of arriving home."})}return a}const _g={m8:"https://warmsynths.github.io/hypersyn-chord-helper/",circuit:"https://warmsynths.github.io/circuit-chords/"},xg={m8:43303,circuit:43302};function bg(n,e){let t=_g[e];typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(t=`http://localhost:${xg[e]}/`);const s=n.chords.map(i=>encodeURIComponent(i.name)).join("+");return`${t}?p=${s}`}class wg{constructor(){this.mode="single",this.progression=null,this.order=[],this.sections=[],this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.playing=!1,this.instrument=null,this.playStyle=null,this.autoplayTimer=null,this.tickCallbacks=new Set}setProgression(e,t){this.mode="single",this.progression=e,e?this.order=t||Array.from({length:e.chords.length},(s,i)=>i):this.order=[]}setSong(e){this.mode="song",this.sections=e,this.songStep=0,this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}isSongMode(){return this.mode==="song"}getActiveSectionIndex(){return this.activeSectionIndex}getTotalSteps(){return this.mode==="song"?this.sections.reduce((e,t)=>e+t.order.length,0):this.order.length}setOrder(e,t){this.order=e,typeof t=="number"&&(this.activeIndex=t)}setInstrument(e){this.instrument=e}setPlayStyle(e){this.playStyle=e}isPlaying(){return this.playing}getActiveIndex(){return this.activeIndex}getProgressStep(){return this.mode==="song"?this.songStep:this.progressStep}subscribeTick(e){return this.tickCallbacks.add(e),()=>this.tickCallbacks.delete(e)}notifyTick(){const e=this.getTotalSteps();this.mode==="song"?this.tickCallbacks.forEach(t=>t(this.activeIndex,this.songStep,this.activeSectionIndex,e,!0)):this.tickCallbacks.forEach(t=>t(this.activeIndex,this.progressStep,0,e,!1))}updateSongStepState(e){let t=0;for(let s=0;s<this.sections.length;s++){const i=this.sections[s].order.length;if(e<t+i){this.activeSectionIndex=s;const r=e-t;this.activeIndex=this.sections[s].order[r]??0,this.progressStep=r;return}t+=i}this.activeSectionIndex=0,this.activeIndex=0,this.progressStep=0}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{if(this.playing){if(this.mode==="song"){const e=this.getTotalSteps();if(e<=0)return;this.songStep=(this.songStep+1)%e,this.updateSongStepState(this.songStep)}else{if(!this.progression||this.order.length<=0)return;this.activeIndex=(this.activeIndex+1)%this.order.length,this.progressStep=(this.progressStep+1)%this.order.length}this.playActiveChord(),this.notifyTick()}},Kr)}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}togglePlay(){return this.playing?(this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.stopAutoplay(),this.notifyTick()):(this.playing=!0,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.mode==="song"&&this.sections.length>0&&this.updateSongStepState(0),this.startAutoplay(),this.playActiveChord(),this.notifyTick()),this.playing}playActiveChord(){if(this.mode==="song"){const e=this.sections[this.activeSectionIndex];if(!e)return;const t=this.activeIndex,s=e.progression.chords[t];if(s){const i=s.notes.map(r=>`${r}4`);Ho(i,e.progression.genre,{bpm:e.progression.bpm,duration:1.2,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}}else{if(!this.progression)return;const e=this.order[this.activeIndex]??0,t=this.progression.chords[e];t&&this.playChordNotes(t.notes,1.2)}}playChordAtIndex(e,t=.8){if(!this.progression||!this.progression.chords[e])return;const s=this.progression.chords[e];this.playChordNotes(s.notes,t)}playChordNotes(e,t){if(!this.progression)return;const s=e.map(i=>`${i}4`);Ho(s,this.progression.genre,{bpm:this.progression.bpm,duration:t,instrument:this.instrument??void 0,playStyle:this.playStyle??void 0})}reset(){this.stopAutoplay(),this.playing=!1,this.activeIndex=0,this.progressStep=0,this.songStep=0,this.activeSectionIndex=0,this.notifyTick()}}const Q=new wg,Tg=$t.map(n=>n.name),Sg=["rhodes","epiano","guitar","pad-strings","bell","organ","juno-pad","stab"];function kg(n,e){const t=n.length+1,s=e.length+1,i=Array.from({length:t},()=>new Array(s).fill(0));for(let r=0;r<t;r++)i[r][0]=r;for(let r=0;r<s;r++)i[0][r]=r;for(let r=1;r<t;r++)for(let o=1;o<s;o++)i[r][o]=n[r-1]===e[o-1]?i[r-1][o-1]:1+Math.min(i[r-1][o-1],i[r-1][o],i[r][o-1]);return i[t-1][s-1]}function Ht(n,e){if(typeof n!="string")return null;const t=n.trim();if(!t)return null;const s=t.toLowerCase(),i=e.find(c=>c.toLowerCase()===s);if(i)return i;let r=null,o=1/0;for(const c of e){const l=kg(s,c.toLowerCase());l<o&&(o=l,r=c)}const a=Math.max(2,Math.floor(s.length*.4));return o<=a?r:null}function Ag(n){if(!Array.isArray(n))return;const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t,i=Ht(s.root,Ts),r=Ht(s.quality,Fm);i&&r&&e.push({root:i,quality:r})}if(e.length)return e.slice(0,lt)}function Cg(n){if(!n||typeof n!="object"||Array.isArray(n))return;const e=n,t=Ht(e.presetId,Sg)??(typeof e.presetId=="string"&&e.presetId.trim()?e.presetId.trim():void 0);if(!t)return;const s=e.customConfig&&typeof e.customConfig=="object"&&!Array.isArray(e.customConfig)?e.customConfig:void 0;return{presetId:t,customConfig:s}}function ji(n,e){const t=n&&typeof n=="object"?n:{},s=Ht(t.genre,Us)??e.genre,i=Ht(t.mood,Tg)??e.mood,r=Ht(t.key,Ts)??void 0,o=Ht(t.scaleType,Bm)??void 0,a=r&&o?Ag(t.chords):void 0;let c;typeof t.length=="number"&&Number.isFinite(t.length)&&(c=Math.max(ss,Math.min(lt,Math.round(t.length))));const l=typeof t.rhythmStyle=="string"&&t.rhythmStyle.trim()?t.rhythmStyle.trim():void 0,u=Cg(t.instrumentConfig),h=t._rateLimit&&typeof t._rateLimit=="object"?t._rateLimit:void 0;return{genre:s,mood:i,key:r,scaleType:o,length:c,chords:a,rhythmStyle:l,instrumentConfig:u,_rateLimit:h}}const Dc="chroma-chords-llm-provider";function no(){return localStorage.getItem(Dc)==="anthropic"?"anthropic":"openrouter"}function Rc(n){localStorage.setItem(Dc,n)}const qi={genre:Us[0],mood:$t[0].name},$c="https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev",Ng=12e3;async function Pc(){try{const n=await fetch($c);if(n.ok){const e=await n.json();if(e&&typeof e.remaining=="number")return{remaining:e.remaining,limit:e.limit,isFreeTier:e.isFreeTier}}}catch{}return null}const Fc={Uplifting:["happy","joy","bright","hope","celebrat","win","sun","morning","triumph"],Melancholy:["sad","rain","lonely","grief","loss","blue","tear","goodbye"],Dreamy:["dream","float","cloud","soft","sleep","hazy","ethereal","stars"],Tense:["fear","anxious","dark","storm","fight","chase","danger","thriller"],Warm:["cozy","home","fire","love","autumn","familiar","fireplace"],Nostalgic:["memory","childhood","old","faded","remember","summer","photo","yearbook"],Energetic:["energetic","pumped","hype","fast","running","workout","power","fire"],Dark:["dark","creepy","night","evil","shadow","gothic","gloomy"],Peaceful:["peaceful","calm","quiet","zen","relax","nature","gentle","still"],Groovy:["groovy","funky","danceable","rhythm","swing","bounce","jam"],Epic:["epic","heroic","grand","triumphant","majestic","legendary","glory"]},Lc={Pop:["pop","radio","dance","catchy","hit"],"Lo-fi/Chill":["lofi","lo-fi","study","bedroom","tape","chill","relax"],"R&B/Soul":["rnb","r&b","soul","smooth","slow jam","sultry"],"Indie/Folk":["folk","acoustic","campfire","porch","story","indie"],Synthwave:["synth","80s","neon","retro","synthwave","arcade"],"Jazz-ish":["jazz","smoky","bar","lounge","late night","saxophone"],Gospel:["gospel","church","choir","soulful","worship"],Cinematic:["movie","film","epic","trailer","scene","cinematic"],Rock:["rock","guitar","drive","loud","energy","highway"],"House/Dance":["house","edm","club","rave","four on the floor","dance floor"],Blues:["blues","12 bar","delta","chicago blues","harmonica"],"Funk/Disco":["funk","funky","groovy","disco","slap bass","boogie"],"Country/Bluegrass":["country","bluegrass","nashville","banjo","twang"],"Reggae/Dub":["reggae","dub","jamaica","ska","offbeat","roots"],Metal:["metal","heavy metal","thrash","riff","shred","headbang","metallica","megadeth","slayer","iron maiden"],Punk:["punk","garage","mosh","rebel","skate"],"Ambient/Drone":["ambient","drone","atmospheric","soundscape","meditation","space"],"Trap/Hip-Hop":["trap","hiphop","hip-hop","rap","808","beat"],"Bossa Nova/Latin":["bossa","bossa nova","samba","latin","rio","habanera"],"Classical/Orchestral":["classical","orchestra","symphony","concerto","violin","chamber"],"EDM/Trance":["trance","techno","buildup","drop","festival"],Afrobeats:["afrobeats","afropop","lagos","highlife","afro"],Shoegaze:["shoegaze","fuzz","wall of sound","dream pop","gazer"]};function Kn(n,e){const t=n.toLowerCase();let s=null,i=0;return Object.keys(e).forEach(r=>{const o=e[r].reduce((a,c)=>a+(t.includes(c)?1:0),0);o>i&&(i=o,s=r)}),s}function ei(n){const e=Kn(n,Lc),t=Kn(n,Fc);return!e||!t?null:{genre:e,mood:t}}let io=null;function Vc(n){io=n}function Bc(){return io}async function Ig(n,e){const t=new AbortController,s=setTimeout(()=>t.abort(),Ng),i=e??io;try{const r={"Content-Type":"application/json"};i&&(r.Authorization=`Bearer ${i}`);const o=await fetch($c,{method:"POST",headers:r,body:JSON.stringify({text:n,provider:no()}),signal:t.signal}),a=await o.json().catch(()=>null);if(!o.ok||a&&typeof a=="object"&&"error"in a){const c=a&&typeof a=="object"&&"error"in a?String(a.error):`HTTP ${o.status}`,l=new Error(`Classifier request failed: ${c}`);throw a&&typeof a=="object"&&"_rateLimit"in a&&(l._rateLimit=a._rateLimit),l}return a}finally{clearTimeout(s)}}async function ro(n,e){const t=n.trim(),s=t.toLowerCase();if(s.startsWith("mock")||s.startsWith("test")){const r=t.replace(/^(mock|test)\s*:?\s*/i,"").trim(),o=Kn(r,Lc)??"Synthwave",a=Kn(r,Fc)??"Dreamy",c={Metal:"stab",Rock:"guitar",Punk:"stab","Lo-fi/Chill":"epiano",Synthwave:"juno-pad","EDM/Trance":"juno-pad",Gospel:"organ","Reggae/Dub":"organ","Country/Bluegrass":"guitar","Bossa Nova/Latin":"guitar","Ambient/Drone":"pad-strings",Cinematic:"pad-strings","Classical/Orchestral":"pad-strings","Jazz-ish":"rhodes",Pop:"rhodes","R&B/Soul":"epiano"},l={Metal:"heavy_strum",Rock:"driving_strum",Punk:"fast_power_strum","Lo-fi/Chill":"slow_arpeggio",Synthwave:"retro_16th_arp","EDM/Trance":"fast_triplets",Gospel:"block_chords","Reggae/Dub":"offbeat_ska","Jazz-ish":"swing_feel","Bossa Nova/Latin":"syncopated_bossa","Ambient/Drone":"sustained_pad","Classical/Orchestral":"slow_arpeggio",Pop:"straight_8ths"},u={Metal:{key:"E",scaleType:"NATURAL_MINOR",chords:[{root:"E",quality:"min"},{root:"G",quality:"maj"},{root:"D",quality:"maj"},{root:"C",quality:"maj"},{root:"E",quality:"min"},{root:"A",quality:"min"},{root:"B",quality:"dom7"},{root:"E",quality:"min"}]},Rock:{key:"A",scaleType:"MAJOR",chords:[{root:"A",quality:"maj"},{root:"D",quality:"maj"},{root:"E",quality:"dom7"},{root:"F#",quality:"min"},{root:"D",quality:"maj"},{root:"A",quality:"maj"},{root:"E",quality:"dom7"},{root:"A",quality:"maj"}]},"Jazz-ish":{key:"F",scaleType:"DORIAN",chords:[{root:"F",quality:"min7"},{root:"A#",quality:"dom7"},{root:"D#",quality:"maj7"},{root:"G#",quality:"maj7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"min7"},{root:"F",quality:"dom7"}]},"Lo-fi/Chill":{key:"C",scaleType:"DORIAN",chords:[{root:"C",quality:"min7"},{root:"F",quality:"maj7"},{root:"A#",quality:"maj7"},{root:"D#",quality:"maj7"},{root:"C",quality:"min7"},{root:"D#",quality:"maj7"},{root:"F",quality:"min7"},{root:"G",quality:"min7"}]},Gospel:{key:"C",scaleType:"MAJOR",chords:[{root:"C",quality:"maj"},{root:"E",quality:"min7"},{root:"F",quality:"maj7"},{root:"G",quality:"dom7"},{root:"A",quality:"min7"},{root:"D",quality:"min7"},{root:"G",quality:"dom7"},{root:"C",quality:"maj"}]},_default:{key:"F#",scaleType:"DORIAN",chords:[{root:"F#",quality:"min7"},{root:"B",quality:"maj"},{root:"C#",quality:"min7"},{root:"E",quality:"maj"},{root:"F#",quality:"min7"},{root:"A",quality:"maj7"},{root:"B",quality:"min7"},{root:"C#",quality:"dom7"}]}},h=u[o]||u._default,d=c[o]||"rhodes",p=l[o]||"slow_arpeggio",f={genre:o,mood:a,key:h.key,scaleType:h.scaleType,length:8,chords:h.chords,rhythmStyle:p,instrumentConfig:{presetId:d,customConfig:{envelope:{attack:.05,decay:.5,sustain:.6,release:1.2}}}};return ji(f,{genre:o,mood:a})}const i=ei(n);try{const r=await Ig(n,e);return ji(r,i??qi)}catch(r){console.warn("LLM classification failed, falling back to keyword heuristic:",r);const o=ji(i??qi,qi);return r&&typeof r=="object"&&"_rateLimit"in r&&(o._rateLimit=r._rateLimit),o}}const Mg=Object.freeze(Object.defineProperty({__proto__:null,classifyFreeText:ro,fetchOpenRouterKeyInfo:Pc,getGoogleToken:Bc,getLLMProvider:no,heuristicClassify:ei,setGoogleToken:Vc,setLLMProvider:Rc},Symbol.toStringTag,{value:"Module"}));class Og{static setGoogleToken(e){Vc(e)}static getGoogleToken(){return Bc()}static async resolvePrompt(e,t,s,i,r,o){let a=o||null,c=null,l=null;if(!a&&r&&r.trim().length>0)try{a=await ro(r)}catch(d){console.warn("Failed to classify prompt via LLM/local fallback:",d)}const u=!!(a&&a.chords?.length&&a.key&&a.scaleType);let h=null;return u&&a&&a.chords&&a.key&&a.scaleType&&(h=ag(e,a.key,a.scaleType,a.chords,a.genre||t,a.mood||s)),h||(h=Cc(e,t,s,{length:i})),u&&a&&(a.instrumentConfig?.presetId&&(c=Om(a.instrumentConfig.presetId)??null),a.rhythmStyle&&(l=Em(a.rhythmStyle)??null)),h.chords.length>i&&(h={...h,chords:h.chords.slice(0,i)}),r&&(h={...h,searchTerm:r}),{progression:h,instrument:c,playStyle:l,normalizedSuggestion:a}}}const Ls=[{name:"Verse",desc:"Settled, familiar.",reorder:n=>Array.from({length:n},(e,t)=>t)},{name:"Chorus",desc:"Brighter, opens the key up.",reorder:n=>Array.from({length:n},(e,t)=>(t+Math.ceil(n/2))%n)},{name:"Pre-chorus",desc:"Leans in, sets up the turn.",reorder:n=>Array.from({length:n},(e,t)=>(t+1)%n)},{name:"Bridge",desc:"Detours, borrows a shadow chord.",reorder:n=>Array.from({length:n},(e,t)=>n-1-t)},{name:"Outro",desc:"Settles back down.",reorder:n=>Array.from({length:n},(e,t)=>(t-1+n)%n)}];class zi{static createInitialSong(e,t){const s=t||Array.from({length:e.chords.length},(i,r)=>r);return[{name:Ls[0].name,desc:Ls[0].desc,progression:e,order:s.slice()}]}static addSection(e,t){if(e.length>=Ls.length)return{sections:e,activeIndex:e.length-1};const s=Ls[e.length],i=s.reorder(t.chords.length),r={name:s.name,desc:s.desc,progression:t,order:i},o=[...e,r];return{sections:o,activeIndex:o.length-1}}static syncActiveSection(e,t,s,i){if(!e[t])return e;const r=[...e];return r[t]={...r[t],progression:s,order:i.slice()},r}}var Eg=Object.defineProperty,Dg=Object.getOwnPropertyDescriptor,oo=(n,e,t,s)=>{for(var i=s>1?void 0:s?Dg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Eg(e,t,i),i};const cr=["bean","bird","cat","note"];function Zs(n=.45){return{show:Math.random()<n,kind:cr[Math.floor(Math.random()*cr.length)]}}function Js(n){return n[Math.floor(Math.random()*n.length)]}class ao{constructor(e=7,t=1800){this.threshold=e,this.windowMs=t,this.count=0,this.lastClickAt=0}click(){const e=Date.now();return e-this.lastClickAt>this.windowMs&&(this.count=0),this.lastClickAt=e,this.count+=1,this.count>=this.threshold?(this.count=0,!0):!1}}const Rg={bean:{width:92,height:86},bird:{width:88,height:88},cat:{width:90,height:88},note:{width:74,height:67}};let Qs=class extends Je{constructor(){super(...arguments),this.kind="bean",this.scale=1}willUpdate(n){if(n.has("kind")||n.has("scale")){const{width:e,height:t}=Rg[this.kind];this.style.width=`${e*this.scale}px`,this.style.height=`${t*this.scale}px`}}renderBean(){const n="#D98A54";return N`
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
    `}renderBird(){const n="#7C93A8",e="#E8A24A";return N`
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
    `}renderCat(){const n="#8FA888";return N`
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
    `}renderNote(){const n="#B7A6DE",e="#8672B0";return N`
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
    `}render(){const n=this.kind==="bird"?this.renderBird():this.kind==="cat"?this.renderCat():this.kind==="note"?this.renderNote():this.renderBean();return n?N`<div style="transform:scale(${this.scale}); transform-origin:top left;">${n}</div>`:we}};Qs.styles=Pt`
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
  `;oo([G({type:String})],Qs.prototype,"kind",2);oo([G({type:Number})],Qs.prototype,"scale",2);Qs=oo([Ft("mascot-character")],Qs);var $g=Object.defineProperty,Pg=Object.getOwnPropertyDescriptor,co=(n,e,t,s)=>{for(var i=s>1?void 0:s?Pg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&$g(e,t,i),i};const lr=3200;let Ks=class extends Je{constructor(){super(...arguments),this.trigger=0,this.visible=!1,this.hideTimer=null}updated(n){n.has("trigger")&&this.trigger>0&&(this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout(()=>{this.visible=!1},lr))}disconnectedCallback(){super.disconnectedCallback(),this.hideTimer&&clearTimeout(this.hideTimer)}render(){return this.visible?N`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${cr.map(n=>N`<mascot-character .kind=${n} .scale=${.5}></mascot-character>`)}
        </div>
      </div>
    `:we}};Ks.styles=Pt`
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
      animation: egg-pop ${lr}ms ease forwards;
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
      animation: egg-caption-pop ${lr}ms ease forwards;
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
  `;co([G({type:Number})],Ks.prototype,"trigger",2);co([M()],Ks.prototype,"visible",2);Ks=co([Ft("mascot-parade")],Ks);var Fg=Object.defineProperty,Lg=Object.getOwnPropertyDescriptor,me=(n,e,t,s)=>{for(var i=s>1?void 0:s?Lg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Fg(e,t,i),i};const Vg=[{side:"left",top:"20%"},{side:"left",top:"62%"},{side:"right",top:"30%"},{side:"right",top:"68%"}],Bg=800,Ug=["#F2A79B","#9CC0EC","#F6D98B"],jg=[6,3,12],sa=["rainy drive at 2am, first day of summer...","Portishead","Bohemian Rhapsody"],qg=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],zg=["Warm","Melancholy","Nostalgic","Dreamy"],na=["Drew a total blank on that one — good thing there's a picker right below.","That one stumped us completely. The genre & mood dials still work great, though.","Our ears just short-circuited. Manual mode has never let anyone down.","No idea, honestly — but you clearly do. Pick a genre & mood below."],bn=["Rummaging through crates of old vinyl...","Asking the chord wizards nicely...","Warming up the analog vacuum tubes...","Dusting off the Fender Rhodes...","Consulting the musical oracle...","Polishing major 7th chords...","Tuning the vintage synthesizer...","Translating feelings into frequencies...","Listening to the cosmic frequency...","Channeling 80s synthwave energy...","Humming a secret little melody...","Strumming invisible guitar strings...","Checking the vibe meters...","Brewing a fresh cup of lo-fi beats...","Setting the tape delay to 120ms...","Counting the beats per minute...","Mixing harmonizing magic...","Summoning smooth jazz cats...","Tweaking the resonance knob...","Scanning the musical multiverse..."];let ue=class extends Je{constructor(){super(...arguments),this.genre="Pop",this.mood="Dreamy",this.length=4,this.freeText="",this.placeholderIdx=0,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.expandedGenre=!1,this.expandedMood=!1,this.mascot=Zs(.35),this.mascotSlot=Js(Vg),this.peekMascot=Zs(.18),this.peekSide=Js(["left","right"]),this.isAuthenticated=!1,this.isAdmin=!1,this.currentProvider=no(),this.showAdminModal=!1,this.isClassifying=!1,this.loadingMsgIdx=0,this.remainingRequests=null,this.loadingTimer=null,this.eggCounter=new ao,this.paradeTrigger=0,this.jellyBodies=[],this.animFrameId=null,this.mouseX=null,this.mouseY=null,this.physicsLoop=()=>{if(!this.isConnected)return;const n=performance.now(),e=this.getBoundingClientRect(),t=e.width>0?e.width:typeof window<"u"?window.innerWidth:800,s=e.height>0?e.height:typeof window<"u"?window.innerHeight:600,i=this.jellyBodies,r=i.length;for(let o=0;o<r;o++){const a=i[o];if(a.vx+=Math.sin(n*6e-4*a.driftFreqX+a.driftPhaseX)*a.driftForce,a.vy+=Math.cos(n*7e-4*a.driftFreqY+a.driftPhaseY)*a.driftForce,this.mouseX!==null&&this.mouseY!==null){const u=a.x-this.mouseX,h=a.y-this.mouseY,d=Math.hypot(u,h);if(d<140&&d>0){const p=(1-d/140)*.12;a.vx+=u/d*p,a.vy+=h/d*p}}a.vx*=a.drag,a.vy*=a.drag;const c=Math.hypot(a.vx,a.vy);c>a.maxSpeed&&(a.vx=a.vx/c*a.maxSpeed,a.vy=a.vy/c*a.maxSpeed),a.x+=a.vx,a.y+=a.vy,a.angle+=a.vRot;const l=a.radius;a.x<l?(a.x=l,a.vx=Math.abs(a.vx)*a.restitution+.02,a.squishX=.88,a.squishY=1.12):a.x>t-l&&(a.x=t-l,a.vx=-Math.abs(a.vx)*a.restitution-.02,a.squishX=.88,a.squishY=1.12),a.y<l?(a.y=l,a.vy=Math.abs(a.vy)*a.restitution+.02,a.squishX=1.12,a.squishY=.88):a.y>s-l&&(a.y=s-l,a.vy=-Math.abs(a.vy)*a.restitution-.02,a.squishX=1.12,a.squishY=.88),a.squishX+=(1-a.squishX)*.08,a.squishY+=(1-a.squishY)*.08}for(let o=0;o<r;o++)for(let a=o+1;a<r;a++){const c=i[o],l=i[a],u=l.x-c.x,h=l.y-c.y,d=Math.hypot(u,h),p=c.radius+l.radius;if(d<p&&d>0){const f=p-d,m=u/d,g=h/d;c.x-=m*f*.4,c.y-=g*f*.4,l.x+=m*f*.4,l.y+=g*f*.4;const y=c.vx-l.vx,w=c.vy-l.vy,b=(m*y+g*w)/(c.mass+l.mass),k=.35;c.vx-=b*l.mass*m*k,c.vy-=b*l.mass*g*k,l.vx+=b*c.mass*m*k,l.vy+=b*c.mass*g*k;const v=.12;c.squishX=Math.max(.85,1-v*Math.abs(m)),c.squishY=Math.max(.85,1-v*Math.abs(g)),l.squishX=Math.max(.85,1-v*Math.abs(m)),l.squishY=Math.max(.85,1-v*Math.abs(g))}}if(this.shadowRoot)for(let o=0;o<r;o++){const a=i[o],c=this.shadowRoot.getElementById(`jelly-${a.id}`);c&&(c.style.transform=`translate3d(${a.x-a.radius}px, ${a.y-a.radius}px, 0) rotate(${a.angle}deg) scale(${a.squishX}, ${a.squishY})`)}this.animFrameId=requestAnimationFrame(this.physicsLoop)},this.placeholderTimer=null,this.classifyDebounce=null,this.classifyToken=0}startLoadingTimer(){this.stopLoadingTimer(),this.loadingMsgIdx=Math.floor(Math.random()*bn.length),this.loadingTimer=setInterval(()=>{let n=Math.floor(Math.random()*bn.length);n===this.loadingMsgIdx&&(n=(n+1)%bn.length),this.loadingMsgIdx=n},800)}stopLoadingTimer(){this.loadingTimer&&(clearInterval(this.loadingTimer),this.loadingTimer=null)}onLoginClick(){this.dispatchEvent(new CustomEvent("request-login",{bubbles:!0,composed:!0}))}onLogoutClick(){this.dispatchEvent(new CustomEvent("request-logout",{bubbles:!0,composed:!0})),this.showAdminModal=!1}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}changeProvider(n){this.currentProvider=n,Rc(n)}initJellyBodies(){const n=this.getBoundingClientRect(),e=n.width>0?n.width:typeof window<"u"?window.innerWidth:800,t=n.height>0?n.height:typeof window<"u"?window.innerHeight:600,s=[{key:"blob1",r:20},{key:"blob2",r:14},{key:"blob3",r:17},{key:"circle",r:16},{key:"ring",r:22},{key:"doubleRing",r:18},{key:"pill",r:16},{key:"crescent",r:16},{key:"arch",r:15},{key:"squircle",r:16}],i=10,r=[];for(let o=0;o<i;o++){const a=s[o%s.length],c=a.r+30,l=c+Math.random()*Math.max(100,e-c*2),u=c+Math.random()*Math.max(100,t-c*2),h=.08+Math.random()*.18,d=.35+Math.random()*.25,p=.985,f=.006+Math.random()*.008,m=.35,g=Math.random()*Math.PI*2;r.push({id:o,shapeKey:a.key,width:a.r*2,height:a.r*2,x:l,y:u,vx:Math.cos(g)*h,vy:Math.sin(g)*h,maxSpeed:d,drag:p,driftForce:f,restitution:m,radius:a.r,mass:a.r*a.r,angle:Math.random()*360,vRot:(Math.random()-.5)*.05,squishX:1,squishY:1,driftPhaseX:Math.random()*Math.PI*2,driftPhaseY:Math.random()*Math.PI*2,driftFreqX:.6+Math.random()*.5,driftFreqY:.6+Math.random()*.5})}this.jellyBodies=r}onFrameMouseMove(n){const e=this.getBoundingClientRect();this.mouseX=n.clientX-e.left,this.mouseY=n.clientY-e.top}onFrameMouseLeave(){this.mouseX=null,this.mouseY=null}loadKeyInfo(){this.isAdmin&&Pc().then(n=>{n&&typeof n.remaining=="number"&&(this.remainingRequests=n.remaining)})}connectedCallback(){super.connectedCallback(),this.placeholderTimer=setInterval(()=>{this.placeholderIdx=(this.placeholderIdx+1)%sa.length},2800),this.loadKeyInfo(),this.initJellyBodies()}firstUpdated(){this.loadKeyInfo(),typeof window<"u"&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.animFrameId=requestAnimationFrame(this.physicsLoop))}updated(n){super.updated(n),n.has("isAdmin")&&this.isAdmin&&this.loadKeyInfo()}disconnectedCallback(){super.disconnectedCallback(),this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.placeholderTimer&&clearInterval(this.placeholderTimer),this.classifyDebounce&&clearTimeout(this.classifyDebounce),this.stopLoadingTimer()}selectGenre(n){this.dispatchEvent(new CustomEvent("genre-change",{detail:n,bubbles:!0,composed:!0}))}selectMood(n){this.dispatchEvent(new CustomEvent("mood-change",{detail:n,bubbles:!0,composed:!0}))}generate(){this.dispatchEvent(new CustomEvent("generate",{detail:{promptText:this.freeText.trim()},bubbles:!0,composed:!0}))}setLength(n){this.dispatchEvent(new CustomEvent("length-change",{detail:n,bubbles:!0,composed:!0}))}decLength(){this.length>ss&&this.setLength(this.length-1)}incLength(){this.length<lt&&this.setLength(this.length+1)}onFreeTextChange(n){this.freeText=n.target.value,this.llmSuggestion=null,this.llmResolved=!1,this.classifyError=null,this.freeText.trim().length<=2&&(this.isClassifying=!1),this.scheduleClassify();const e=this.freeText.trim();if(e.length>2){const t=ei(e);t&&this.applyBest(t)}}scheduleClassify(){this.classifyDebounce&&clearTimeout(this.classifyDebounce);const n=this.freeText.trim(),e=n.toLowerCase();if(n.length<=2||["m","mo","moc","t","te","tes"].includes(e)){this.isClassifying=!1;return}const t=++this.classifyToken;this.classifyDebounce=setTimeout(async()=>{this.isClassifying=!0;try{const s=await ro(n);if(t!==this.classifyToken)return;s?._rateLimit?.remaining!==void 0&&(this.remainingRequests=s._rateLimit.remaining),this.llmSuggestion=s,this.llmResolved=!0,this.classifyError=s?null:na[Math.floor(Math.random()*na.length)],s&&this.applyBest(s)}finally{t===this.classifyToken&&(this.isClassifying=!1)}},Bg)}applyBest(n){this.selectGenre(n.genre),this.selectMood(n.mood);const e={...n,promptText:this.freeText.trim()};this.dispatchEvent(new CustomEvent("freetext-suggestion-applied",{detail:e,bubbles:!0,composed:!0}))}renderJellySvg(n){switch(n){case"blob1":return N`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;case"blob2":return N`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;case"blob3":return N`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;case"circle":return N`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;case"dot":return N`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;case"ring":return N`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;case"doubleRing":return N`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;case"pill":return N`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;case"crescent":return N`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;case"arch":return N`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;case"squircle":return N`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;case"oval":return N`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;case"donut":return N`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;default:return N`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`}}render(){const n=Xn(this.mood);let e=qg.filter(h=>Us.includes(h));e.includes(this.genre)||(e=e.slice(0,-1).concat(this.genre));const t=Us.filter(h=>!e.includes(h)),s=this.expandedGenre?e.concat(t):e,i=$t.map(h=>h.name);let r=zg.filter(h=>i.includes(h));r.includes(this.mood)||(r=r.slice(0,-1).concat(this.mood));const o=i.filter(h=>!r.includes(h)),c=(this.expandedMood?r.concat(o):r).map(h=>$t.find(d=>d.name===h)),l=this.freeText.trim();let u=null;return l.length>2&&(u=this.llmResolved?this.llmSuggestion:ei(l)),N`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <div class="aquarium-layer">
          ${this.jellyBodies.map(h=>N`
            <div class="jelly-shape-wrapper" id="jelly-${h.id}" style="transform: translate3d(${h.x-h.radius}px, ${h.y-h.radius}px, 0) rotate(${h.angle}deg) scale(${h.squishX}, ${h.squishY})">
              ${this.renderJellySvg(h.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show?N`
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
            <h1>Describe a vibe,<br />hear it as chords.</h1>
            <div class="subcopy">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show?N`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${.4}></mascot-character>
              </div>
            `:""}
            <div class="vibe-input-wrap">
              ${this.isClassifying?N`
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
                @input=${h=>this.onFreeTextChange(h)}
                placeholder=${sa[this.placeholderIdx]}
              />
              ${this.isAdmin?N`
                <button class="vibe-admin-btn" @click=${()=>{this.showAdminModal=!0}} title="AI Model Configuration">
                  ⚡ ${this.currentProvider==="anthropic"?"Claude":this.remainingRequests!==null?`OpenRouter (${this.remainingRequests} left)`:"OpenRouter"}
                </button>
              `:""}
            </div>
          </div>
          ${this.isClassifying?N`
            <div class="suggestion-wrap">
              <div class="suggestion-note loading">✨ ${bn[this.loadingMsgIdx]}</div>
            </div>
          `:u?N`
            <div class="suggestion-wrap">
              <div class="suggestion-note">Sounds like <span class="suggestion-highlight" style="color:${n}">${u.genre} · ${u.mood}</span> — the picks below already match.</div>
            </div>
          `:this.classifyError?N`
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
            ${s.map(h=>{const d=Us.indexOf(h);return N`
                <div class="pill ${h===this.genre?"selected":""}" style=${h===this.genre?`background:${n}`:""} @click=${()=>this.selectGenre(h)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${jg[d%3]} fill=${Ug[d%3]} />
                    </svg>
                  </div>
                  ${h}
                </div>
              `})}
            ${t.length?N`
              <div class="pill toggle" @click=${()=>{this.expandedGenre=!this.expandedGenre}}>
                ${this.expandedGenre?"Show less ⌃":`+${t.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${c.map(h=>N`
              <div class="pill mood-pill ${h.name===this.mood?"selected":""}" style=${h.name===this.mood?`background:${h.dot}`:""} @click=${()=>this.selectMood(h.name)}>
                <div class="mood-badge" style="background:${h.name===this.mood?"rgba(46,39,31,0.1)":h.dot+"33"}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${h.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${h.iconPath} />
                  </svg>
                </div>
                ${h.name}
              </div>
            `)}
            ${o.length?N`
              <div class="pill toggle" @click=${()=>{this.expandedMood=!this.expandedMood}}>
                ${this.expandedMood?"Show less ⌃":`+${o.length} more ⌄`}
              </div>
            `:""}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length<=ss?"disabled":""}" @click=${()=>this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({length:lt},(h,d)=>N`
                <div class="length-segment ${d<this.length?"filled":""}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length>=lt?"disabled":""}" @click=${()=>this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length===1?"chord":"chords"}</div>
          </div>

          <button class="cta" style="background:${n}" @click=${this.generate}>
            ${u?"Let's go to your progression":"Generate loop"} <span>→</span>
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
            ${this.isAuthenticated?N`
              <button class="footer-login-btn" @click=${this.onLogoutClick}>Sign out</button>
            `:N`
              <button class="footer-login-btn" @click=${this.onLoginClick}>Sign in</button>
            `}
          </div>
        </div>

        ${this.showAdminModal?N`
          <div class="admin-modal-backdrop" @click=${()=>{this.showAdminModal=!1}}>
            <div class="admin-modal" @click=${h=>h.stopPropagation()}>
              <div class="admin-title">AI Provider Config</div>
              <div class="admin-desc">Select which backend model service classifies free-text prompts into chord progressions:</div>
              ${this.remainingRequests!==null?N`
                <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                  📊 Daily OpenRouter Quota: ${this.remainingRequests} remaining requests left today.
                </div>
              `:""}
              <div class="admin-options">
                <button class="admin-opt ${this.currentProvider==="openrouter"?"active":""}" @click=${()=>this.changeProvider("openrouter")}>
                  <div class="opt-name">⚡ OpenRouter (Free Tier LLMs)</div>
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
    `}};ue.styles=Pt`
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
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
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
  `;me([G({type:String})],ue.prototype,"genre",2);me([G({type:String})],ue.prototype,"mood",2);me([G({type:Number})],ue.prototype,"length",2);me([M()],ue.prototype,"freeText",2);me([M()],ue.prototype,"placeholderIdx",2);me([M()],ue.prototype,"llmSuggestion",2);me([M()],ue.prototype,"llmResolved",2);me([M()],ue.prototype,"classifyError",2);me([M()],ue.prototype,"expandedGenre",2);me([M()],ue.prototype,"expandedMood",2);me([M()],ue.prototype,"mascot",2);me([M()],ue.prototype,"mascotSlot",2);me([M()],ue.prototype,"peekMascot",2);me([M()],ue.prototype,"peekSide",2);me([G({type:Boolean})],ue.prototype,"isAuthenticated",2);me([G({type:Boolean})],ue.prototype,"isAdmin",2);me([M()],ue.prototype,"currentProvider",2);me([M()],ue.prototype,"showAdminModal",2);me([M()],ue.prototype,"isClassifying",2);me([M()],ue.prototype,"loadingMsgIdx",2);me([M()],ue.prototype,"remainingRequests",2);me([M()],ue.prototype,"paradeTrigger",2);ue=me([Ft("seed-screen")],ue);var Gg=Object.defineProperty,Wg=Object.getOwnPropertyDescriptor,De=(n,e,t,s)=>{for(var i=s>1?void 0:s?Wg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Gg(e,t,i),i};const Yg=["C","D","E","F","G","A","B"],Hg=[{note:"C#",flat:"Db",left:"10%"},{note:"D#",flat:"Eb",left:"24.2857%"},{note:"F#",flat:"Gb",left:"52.857%"},{note:"G#",flat:"Ab",left:"67.1428%"},{note:"A#",flat:"Bb",left:"81.4285%"}],Xg=[{label:"Major",sub:"bright"},{label:"Minor",sub:"warm"},{label:"Suspended (sus)",sub:"floating"},{label:"Diminished",sub:"unstable"}],Zg=[{label:"None",sub:"triad only"},{label:"6th",sub:"soft lift"},{label:"7th (dom / m7)",sub:"classic tension"},{label:"Major 7th (M7)",sub:"lush, jazzy"},{label:"9th",sub:"wide, colorful"}];let Ne=class extends Je{constructor(){super(...arguments),this.alternatives=[],this.showTheory=!1,this.moodColor="#9B7CA8",this.position=0,this.total=4,this.mode="swap",this.visible=!1,this.resetKey=null,this.quality="Major",this.extension="None",this.dragY=0,this.dragging=!1,this.snapping=!1,this.dragStartY=0,this.dragStartTime=0,this.onGrabberDown=n=>{n.preventDefault(),this.dragStartY=n.clientY,this.dragStartTime=performance.now(),this.dragging=!0,this.snapping=!1,this.dragY=0},this.onGrabberMove=n=>{this.dragging&&(this.dragY=Math.max(0,n.clientY-this.dragStartY))},this.onGrabberUp=()=>{if(!this.dragging)return;this.dragging=!1;const n=Math.max(1,performance.now()-this.dragStartTime),e=this.dragY/n,t=this.sheetEl?.getBoundingClientRect().height||400,s=this.dragY>t*.3||e>.6;this.snapping=!0,s?(this.dragY=t+80,setTimeout(()=>{this.close()},260)):(this.dragY=0,setTimeout(()=>{this.snapping=!1},260))}}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onGrabberMove),window.addEventListener("pointerup",this.onGrabberUp),window.addEventListener("pointercancel",this.onGrabberUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this.onGrabberMove),window.removeEventListener("pointerup",this.onGrabberUp),window.removeEventListener("pointercancel",this.onGrabberUp)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}close(){this.emit("close")}onSheetBackgroundClick(n){n.target===n.currentTarget&&this.close()}setQuality(n){this.quality=n,this.previewVoicing(),this.commitVoicing()}setExtension(n){this.extension=n,this.previewVoicing(),this.commitVoicing()}previewVoicing(){const n=rr(this.chord.name),e=n.includes("b"),t=or(n,this.quality,this.extension,e);this.emit("voicing-preview",t)}commitVoicing(){this.emit("voicing-change",{quality:this.quality,extension:this.extension})}willUpdate(n){n.has("resetKey")&&(this.quality="Major",this.extension="None")}render(){const n=this.chord,e=rr(n.name),t=e.includes("b"),s=this.mode==="voicing"?or(e,this.quality,this.extension,t):n.notes,i=Jn(n.tension),r=this.dragging||this.snapping?`transform: translateY(${this.dragY}px); transition: ${this.dragging?"none":"transform .26s cubic-bezier(.32,.72,0,1)"};`:"";return N`
      <div class="scrim ${this.visible?"visible":""}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible?"visible":""}" style=${r} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div>
            ${this.mode==="voicing"?N`
              <div class="step-label">Chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Adjust the voicing.</div>
            `:N`
              <div class="step-label">Swap chord ${this.position} of ${this.total}</div>
              <div class="sheet-title">Choose the feeling<br />you want instead.</div>
            `}
          </div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>

        <div class="sheet-body">
        <div class="current-row">
          <div class="alt-shape" style="width:${Math.round(i.size*.5)}px;height:${Math.round(i.size*.5)}px;border-radius:${Math.round(i.radius*.5)}px;background:${i.color};"></div>
          <div>
            <div class="current-label">${this.mode==="voicing"?n.functionLabel:"Currently"}</div>
            <div class="current-name">${this.mode==="voicing"?n.name:N`${n.name} — ${n.functionLabel}`}</div>
          </div>
        </div>

        ${this.mode==="swap"?N`
          <div class="alt-list">
            ${this.alternatives.map(o=>{const a=Jn(o.chord.tension),c=Math.round(a.size*.4);return N`
                <div class="alt-row" @click=${()=>this.emit("select-alternative",o)}>
                  <div class="alt-shape" style="width:${c}px;height:${c}px;border-radius:${Math.round(a.radius*(c/a.size))}px;background:${a.color};"></div>
                  <div style="flex:1;min-width:0;">
                    <div class="alt-name">${o.label}</div>
                    <div class="alt-sub">${o.sub}</div>
                    ${this.showTheory?N`
                      <div class="alt-tag">${o.functionCaption}</div>
                      <div class="alt-desc">${o.rationale}</div>
                    `:""}
                  </div>
                  <div class="alt-arrow">→</div>
                </div>
              `})}
          </div>
        `:""}

        ${this.mode==="voicing"?N`
          <div class="voicing-section">
            <div>
              <div class="bento">
                ${Xg.map(o=>N`
                  <div class="bento-card" style=${o.label===this.quality?`background:${this.moodColor}`:""} @click=${()=>this.setQuality(o.label)}>
                    <div class="bento-label">${o.label}</div>
                    <div class="bento-sub">${o.sub}</div>
                  </div>
                `)}
              </div>
              <div class="bento ext">
                ${Zg.map((o,a)=>N`
                  <div class="bento-card ${a===0?"span":""}" style=${o.label===this.extension?`background:${this.moodColor}`:""} @click=${()=>this.setExtension(o.label)}>
                    <div class="bento-label">${o.label}</div>
                    <div class="bento-sub">${o.sub}</div>
                  </div>
                `)}
              </div>
              <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
              <div class="keyboard">
                ${Yg.map(o=>N`
                  <div class="white-key ${s.includes(o)?"active":""}" style=${s.includes(o)?`background:${this.moodColor}`:""}>${o}</div>
                `)}
                ${Hg.map(o=>N`
                  <div class="black-key" style="left:${o.left};${s.includes(o.note)||s.includes(o.flat)?`background:${this.moodColor}`:""}"></div>
                `)}
              </div>
            </div>
          </div>
        `:""}
        </div>
      </div>
    `}};Ne.styles=Pt`
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
  `;De([G({type:Object})],Ne.prototype,"chord",2);De([G({type:Array})],Ne.prototype,"alternatives",2);De([G({type:Boolean})],Ne.prototype,"showTheory",2);De([G({type:String})],Ne.prototype,"moodColor",2);De([G({type:Number})],Ne.prototype,"position",2);De([G({type:Number})],Ne.prototype,"total",2);De([G({type:String})],Ne.prototype,"mode",2);De([G({type:Boolean})],Ne.prototype,"visible",2);De([G({type:Number})],Ne.prototype,"resetKey",2);De([M()],Ne.prototype,"quality",2);De([M()],Ne.prototype,"extension",2);De([M()],Ne.prototype,"dragY",2);De([M()],Ne.prototype,"dragging",2);De([M()],Ne.prototype,"snapping",2);De([vl(".sheet")],Ne.prototype,"sheetEl",2);Ne=De([Ft("swap-sheet")],Ne);var Jg=Object.defineProperty,Qg=Object.getOwnPropertyDescriptor,Uc=(n,e,t,s)=>{for(var i=s>1?void 0:s?Qg(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Jg(e,t,i),i};const Kg=Nt`
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
`,ey=Nt`
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
`,ty=[{device:"m8",name:"M8 Tracker",desc:"Opens the M8 helper with this progression.",svg:Kg},{device:"circuit",name:"Circuit Tracks",desc:"Opens the Circuit Tracks helper with this progression.",svg:ey}];let ti=class extends Je{constructor(){super(...arguments),this.visible=!1}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}render(){return N`
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
          ${ty.map(n=>N`
            <div class="dest-card ${this.visible?"visible":""}" @click=${()=>this.emit("export",n)}>
              ${n.svg}
              <div class="dest-name">${n.name}</div>
              <div class="dest-desc">${n.desc}</div>
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
    `}};ti.styles=Pt`
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
  `;Uc([G({type:Boolean})],ti.prototype,"visible",2);ti=Uc([Ft("share-modal")],ti);function ia(n){const e={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},t=n.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);if(!t)return 60;const s=t[1].charAt(0).toUpperCase()+t[1].slice(1),i=e[s]??0,r=t[2]!==void 0?parseInt(t[2],10):4;return Math.min(127,Math.max(0,(r+1)*12+i))}function jc(n,e,t){const s=e&&e.length>0?e.map(p=>n.chords[p]).filter(p=>!!p):n.chords,i=n.bpm||120,r=1.7,o=t?Es.find(p=>p.name.toLowerCase()===t.toLowerCase()):void 0,a=Qr[n.genre]||{},c=o?.patch??{},l={...a,...c},u=a.duration??.9,h=c.durationMultiplier?u*c.durationMultiplier:u,d=[];return s.forEach((p,f)=>{const m=f*r,y=(p.notes&&p.notes.length>0?p.notes:["C","E","G"]).map(w=>`${w}4`);if(l.arpMode&&l.arpMode!=="off"){const w=l.arpRate??"1/16",b=l.arpRange??1,k=l.arpMode,v=wc(w,i),T=Tc(y,b),S=Sc(T,k),x=l.duration?l.duration:Math.max(.6,h);S.forEach((I,_)=>{const A=m+_*v;d.push({note:I,midi:ia(I),startTime:A,duration:x})})}else{const w=l.spread??0;y.forEach((b,k)=>{const v=k*w*.1,T=m+v;d.push({note:b,midi:ia(b),startTime:T,duration:h})})}}),d}function sy(n){const e=[];let t=Math.max(0,Math.floor(n));for(e.push(t&127);(t>>=7)>0;)e.unshift(t&127|128);return e}function ny(n,e,t){const s=n.bpm||120,i=480,r=jc(n,e,t),o=[];r.forEach(m=>{const g=Math.round(m.startTime/(60/s)*i),y=Math.max(1,Math.round(m.duration/(60/s)*i));o.push({tick:g,type:"on",midi:m.midi}),o.push({tick:g+y,type:"off",midi:m.midi})}),o.sort((m,g)=>m.tick!==g.tick?m.tick-g.tick:m.type!==g.type?m.type==="off"?-1:1:m.midi-g.midi);const a=[],c=Math.round(6e7/s);a.push(0),a.push(255,81,3),a.push(c>>16&255,c>>8&255,c&255);const l="Chroma Chords";a.push(0),a.push(255,3,l.length);for(let m=0;m<l.length;m++)a.push(l.charCodeAt(m));let u=0;o.forEach(m=>{const g=m.tick-u;u=m.tick,a.push(...sy(g)),m.type==="on"?a.push(144,m.midi,80):a.push(128,m.midi,0)}),a.push(0),a.push(255,47,0);const h=[77,84,104,100,0,0,0,6,0,0,0,1,i>>8&255,i&255],d=a.length,p=[77,84,114,107,d>>24&255,d>>16&255,d>>8&255,d&255],f=new Uint8Array(h.length+p.length+a.length);return f.set(h,0),f.set(p,h.length),f.set(a,h.length+p.length),f}function iy(n,e,t,s){const i=ny(n,e,s),r=new Blob([i],{type:"audio/midi"}),o=(n.key||"C").toLowerCase(),a=(n.mood||"progression").toLowerCase().replace(/\s+/g,"-"),c=n.bpm||120,l=`chroma-chords-${o}-${a}-${c}bpm.mid`;qc(r,l)}function ry(n,e){const t=new Oi({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination();switch((n?Os.find(r=>r.name.toLowerCase()===n.toLowerCase()):void 0)?.instrument??(e?Jr[e]:void 0)??"rhodes"){case"bell":return new Me(Jt,{harmonicity:5.5,modulationIndex:12,envelope:{attack:.002,decay:1.1,sustain:.05,release:.8},modulationEnvelope:{attack:.002,decay:.5,sustain:0,release:.4},volume:-16}).connect(t);case"epiano":return new Me(Jt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-14}).connect(t);case"guitar":return new Me(Fe,{oscillator:{type:"triangle"},envelope:{attack:.004,decay:.5,sustain:.05,release:.6},volume:-13}).connect(t);case"organ":return new Me(Fe,{oscillator:{type:"fatsquare",count:3,spread:20},envelope:{attack:.015,decay:.1,sustain:.9,release:.35},volume:-16}).connect(t);case"pad-strings":{const r=new Mi({decay:4.5,wet:.35}).connect(t);return new Me(Fe,{oscillator:{type:"sine"},envelope:{attack:.9,decay:.4,sustain:.8,release:2.8},volume:-15}).connect(r)}case"juno-pad":{const r=new Ii({frequency:.8,delayTime:3.5,depth:.7,wet:.5}).start().connect(t);return new Me(Fe,{oscillator:{type:"fatsawtooth",count:3,spread:25},envelope:{attack:.35,decay:.4,sustain:.85,release:1.6},volume:-16}).connect(r)}case"stab":return new Me(ki,{oscillator:{type:"square"},envelope:{attack:.004,decay:.14,sustain:.12,release:.15},filterEnvelope:{attack:.004,decay:.15,sustain:.1,release:.2,baseFrequency:300,octaves:4},volume:-14}).connect(t);case"rhodes":default:return new Me(Jt,{harmonicity:2,modulationIndex:3.5,envelope:{attack:.008,decay:.6,sustain:.25,release:1.2},modulationEnvelope:{attack:.008,decay:.4,sustain:.1,release:.6},volume:-12}).connect(t)}}function oy(n){const e=n.numberOfChannels,t=n.sampleRate,s=16,i=s/8,r=e*i,o=n.length*e*i,a=new ArrayBuffer(44+o),c=new DataView(a),l=(d,p)=>{for(let f=0;f<p.length;f++)c.setUint8(d+f,p.charCodeAt(f))};l(0,"RIFF"),c.setUint32(4,36+o,!0),l(8,"WAVE"),l(12,"fmt "),c.setUint32(16,16,!0),c.setUint16(20,1,!0),c.setUint16(22,e,!0),c.setUint32(24,t,!0),c.setUint32(28,t*r,!0),c.setUint16(32,r,!0),c.setUint16(34,s,!0),l(36,"data"),c.setUint32(40,o,!0);const u=[];for(let d=0;d<e;d++)u.push(n.getChannelData(d));let h=44;for(let d=0;d<n.length;d++)for(let p=0;p<e;p++){const f=Math.max(-1,Math.min(1,u[p][d])),m=f<0?f*32768:f*32767;c.setInt16(h,m,!0),h+=2}return new Blob([new Uint8Array(a)],{type:"audio/wav"})}async function ay(n,e,t,s){const i=jc(n,e,s);if(!i.length)return;const o=i.reduce((p,f)=>Math.max(p,f.startTime+f.duration),0)+1.2,a=await nm(async()=>{const p=ry(t,n.genre);i.forEach(f=>{p.triggerAttackRelease(f.note,f.duration,f.startTime)})},o),c=oy(a.get()),l=(n.key||"C").toLowerCase(),u=(n.mood||"progression").toLowerCase().replace(/\s+/g,"-"),h=n.bpm||120,d=`chroma-chords-${l}-${u}-${h}bpm.wav`;qc(c,d)}function qc(n,e){if(typeof URL>"u"||typeof URL.createObjectURL!="function")return;const t=URL.createObjectURL(n);if(typeof document>"u")return;const s=document.createElement("a");s.href=t,s.download=e,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var cy=Object.defineProperty,ly=Object.getOwnPropertyDescriptor,J=(n,e,t,s)=>{for(var i=s>1?void 0:s?ly(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&cy(e,t,i),i};const hy=[{side:"left",top:"18%"},{side:"left",top:"58%"},{side:"right",top:"24%"},{side:"right",top:"64%"}],Gi=["Pop","Lo-fi/Chill","R&B/Soul","Indie/Folk","Synthwave","Jazz-ish","Gospel","Cinematic","Rock","House/Dance","Blues","Funk/Disco","Country/Bluegrass","Reggae/Dub","Metal","Punk","Ambient/Drone","Trap/Hip-Hop","Bossa Nova/Latin","Classical/Orchestral","EDM/Trance","Afrobeats","Shoegaze"],uy=["Lo-fi/Chill","R&B/Soul","Pop","Synthwave"],dy=["Warm","Melancholy","Nostalgic","Dreamy"],py=["Piano","Rhodes","Nylon Guitar","Warm Pad"],fy=["Block chords","Arpeggio","Strum","Broken (swing)"],my=[{label:"Major",value:"MAJOR"},{label:"Minor",value:"NATURAL_MINOR"},{label:"Harmonic Minor",value:"HARMONIC_MINOR"},{label:"Dorian",value:"DORIAN"},{label:"Mixolydian",value:"MIXOLYDIAN"},{label:"Lydian",value:"LYDIAN"}],ra=220,gy=280,oa={Uplifting:{anim:"cv-panel-uplifting",dur:2.4,ease:"ease-out"},Melancholy:{anim:"cv-panel-melancholy",dur:6,ease:"ease-in-out"},Dreamy:{anim:"cv-panel-dreamy",dur:7,ease:"ease-in-out"},Tense:{anim:"cv-panel-tense",dur:.9,ease:"ease-in-out"},Warm:{anim:"cv-panel-warm",dur:4.2,ease:"ease-in-out"},Nostalgic:{anim:"cv-panel-nostalgic",dur:5.4,ease:"ease-in-out"}};let H=class extends Je{constructor(){super(...arguments),this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.playing=!0,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapChord=null,this.swapIndex=null,this.alternatives=[],this.menuMounted=!1,this.menuVisible=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.shareMounted=!1,this.shareVisible=!1,this.sheetMounted=!1,this.sheetVisible=!1,this.toast=null,this.spinning=!1,this.drag=null,this.snapProgress=!1,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.mascot=Zs(.35),this.mascotSlot=Js(hy),this.panelPeekMascot=Zs(.18),this.panelPeekSide=Js(["left","right"]),this.eggCounter=new ao,this.paradeTrigger=0,this.menuCloseTimer=null,this.shareCloseTimer=null,this.sheetCloseTimer=null,this.toastTimer=null,this.pressTimer=null,this.pressTapFn=null,this.pressStartX=0,this.pressStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.onDragMove=n=>{if(this.lastPointerX=n.clientX,this.lastPointerY=n.clientY,this.pressTimer&&!this.drag){(Math.abs(n.clientY-this.pressStartY)>8||Math.abs(n.clientX-this.pressStartX)>8)&&(clearTimeout(this.pressTimer),this.pressTimer=null);return}this.drag&&(this.drag={...this.drag,offsetX:n.clientX-this.pressStartX,offsetY:n.clientY-this.pressStartY})},this.onDragEnd=()=>{if(this.pressTimer&&(clearTimeout(this.pressTimer),this.pressTimer=null),!this.drag){this.pressTapFn&&this.pressTapFn(),this.pressTapFn=null;return}const n=this.drag.pos;this.drag=null,this.pressTapFn=null;const e=Array.from(this.renderRoot.querySelectorAll(".chord-chip"));let t=n,s=1/0;if(e.forEach((i,r)=>{if(r===n)return;const o=i.getBoundingClientRect(),a=o.left+o.width/2,c=o.top+o.height/2,l=(this.lastPointerX-a)**2+(this.lastPointerY-c)**2;l<s&&(s=l,t=r)}),t!==n){const i=[...this.order],[r]=i.splice(n,1);i.splice(t,0,r),this.emit("reorder",i)}}}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}connectedCallback(){super.connectedCallback(),window.addEventListener("pointermove",this.onDragMove),window.addEventListener("pointerup",this.onDragEnd),window.addEventListener("pointercancel",this.onDragEnd)}willUpdate(n){if(n.has("progressStep")){const e=n.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}disconnectedCallback(){super.disconnectedCallback(),this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.shareCloseTimer&&clearTimeout(this.shareCloseTimer),this.sheetCloseTimer&&clearTimeout(this.sheetCloseTimer),this.toastTimer&&clearTimeout(this.toastTimer),this.pressTimer&&clearTimeout(this.pressTimer),window.removeEventListener("pointermove",this.onDragMove),window.removeEventListener("pointerup",this.onDragEnd),window.removeEventListener("pointercancel",this.onDragEnd)}emit(n,e){this.dispatchEvent(new CustomEvent(n,{detail:e,bubbles:!0,composed:!0}))}updated(n){n.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1})),n.has("sheetOpen")&&(this.sheetOpen?(this.sheetCloseTimer&&(clearTimeout(this.sheetCloseTimer),this.sheetCloseTimer=null),this.sheetMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.sheetVisible=!0}))):(this.sheetVisible=!1,this.sheetCloseTimer=setTimeout(()=>{this.sheetMounted=!1},gy)))}toggleMenu(){this.menuMounted?this.closeMenu():this.openMenu()}openMenu(){this.menuCloseTimer&&(clearTimeout(this.menuCloseTimer),this.menuCloseTimer=null),this.menuMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.menuVisible=!0}))}closeMenu(){this.menuVisible=!1,this.menuCloseTimer&&clearTimeout(this.menuCloseTimer),this.menuCloseTimer=setTimeout(()=>{this.menuMounted=!1,this.expandedMenuGenre=!1,this.expandedMenuMood=!1},ra)}openShare(){this.closeMenu(),this.shareCloseTimer&&(clearTimeout(this.shareCloseTimer),this.shareCloseTimer=null),this.shareMounted=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shareVisible=!0}))}closeShare(){this.shareVisible=!1,this.shareCloseTimer=setTimeout(()=>{this.shareMounted=!1},ra)}exportDevice(n,e){this.closeShare();const t=bg(this.progression,n);window.open(t,"_blank"),this.toastTimer&&clearTimeout(this.toastTimer),this.toast=`Sent to ${e}`,this.toastTimer=setTimeout(()=>{this.toast=null},2e3)}async handleExportWav(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer),this.toast="Rendering WAV audio...";try{const n=this.progression,e=this.instrument??kn(n.genre),t=this.playStyle??An(n.genre);await ay(n,this.order,e,t),this.toast="Saved WAV audio file"}catch(n){console.error("WAV export error:",n),this.toast="Failed to export WAV"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}handleExportMidi(){this.closeShare(),this.toastTimer&&clearTimeout(this.toastTimer);try{const n=this.progression,e=this.instrument??kn(n.genre),t=this.playStyle??An(n.genre);iy(n,this.order,e,t),this.toast="Saved MIDI file"}catch(n){console.error("MIDI export error:",n),this.toast="Failed to export MIDI"}this.toastTimer=setTimeout(()=>{this.toast=null},2500)}reroll(){this.spinning=!0,setTimeout(()=>{this.spinning=!1},400),this.emit("reroll")}pressStart(n,e,t){t.preventDefault(),this.pressTapFn=e,this.pressStartX=t.clientX,this.pressStartY=t.clientY,this.pressTimer&&clearTimeout(this.pressTimer),this.pressTimer=setTimeout(()=>{this.pressTimer=null,this.drag={pos:n,offsetX:0,offsetY:0}},150)}dragStyleFor(n){const e=this.drag;return e&&e.pos===n?`transform:translate(${e.offsetX}px, ${e.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`:"cursor:grab;"}renderHeaderTitle(n,e){if(n.searchTerm){const t=n.searchTerm.trim(),i=(t.endsWith(".")?t.slice(0,-1):t).split(/\s+/);if(i.length===1)return N`<h1><span style="color:${e}">${i[0]}.</span></h1>`;const r=i.slice(0,-1).join(" "),o=i[i.length-1];return N`<h1>${r} <span style="color:${e}">${o}.</span></h1>`}return N`<h1>Your progression, feeling <span style="color:${e}">${n.mood.toLowerCase()}.</span></h1>`}renderLengthControl(){const n=this.progression.chords.length;return N`
      <div class="length-control">
        <div class="length-btn ${n<=ss?"disabled":""}" @click=${()=>n>ss&&this.emit("set-length",n-1)}>−</div>
        <div class="length-segments">
          ${Array.from({length:lt},(e,t)=>N`<div class="length-segment ${t<n?"filled":""}"></div>`)}
        </div>
        <div class="length-btn ${n>=lt?"disabled":""}" @click=${()=>n<lt&&this.emit("set-length",n+1)}>+</div>
        <div class="length-label-text">${n}</div>
      </div>
    `}render(){const n=this.progression,e=Xn(n.mood),t=this.instrument??kn(n.genre),s=this.playStyle??An(n.genre),i=Math.max(1,this.order.length),r=this.playing?this.snapProgress?this.progressStep/i*100:(this.progressStep+1)/i*100:0,o=oa[n.mood]||oa.Dreamy,a=this.showTheory?gg(this.order.map(_=>n.chords[_]),n.key,n.scaleType):null,c=Ec(n.key,n.scaleType).length,l=c===0?"no sharps or flats":`${c} ${c===1?"sharp/flat":"sharps/flats"}`;let u=uy.filter(_=>Gi.includes(_));u.includes(n.genre)||(u=u.slice(0,-1).concat(n.genre));const h=Gi.filter(_=>!u.includes(_)),d=this.expandedMenuGenre?Gi:u,p=$t.map(_=>_.name);let f=dy.filter(_=>p.includes(_));f.includes(n.mood)||(f=f.slice(0,-1).concat(n.mood));const m=p.filter(_=>!f.includes(_)),y=(this.expandedMenuMood?p:f).map(_=>$t.find(A=>A.name===_)),w=Os.filter(_=>_.name!==t);let b=py.filter(_=>w.some(A=>A.name===_));const k=w.filter(_=>!b.includes(_.name)),v=this.expandedAllInstruments?w:w.filter(_=>b.includes(_.name)),T=Es.filter(_=>_.name!==s);let S=fy.filter(_=>T.some(A=>A.name===_));const x=T.filter(_=>!S.includes(_.name)),I=this.expandedAllPlayStyles?T:T.filter(_=>S.includes(_.name));return N`
      <div class="frame">
        ${this.mascot.show?N`
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

        ${this.menuMounted?N`
          <div class="menu-scrim ${this.menuVisible?"visible":""}" @click=${()=>this.closeMenu()}></div>
          <div class="menu ${this.menuVisible?"visible":""}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${Ts.map(_=>N`
                <div class="menu-chip ${_===n.key?"selected":""}" style=${_===n.key?`background:${e}`:""} @click=${()=>this.emit("set-key",_)}>${Bi(_,n.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${my.map(_=>N`
                <div class="menu-chip ${_.value===n.scaleType?"selected":""}" style=${_.value===n.scaleType?`background:${e}`:""} @click=${()=>this.emit("set-scale",_.value)}>${_.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${d.map(_=>N`
                <div class="menu-chip ${_===n.genre?"selected":""}" style=${_===n.genre?`background:${e}`:""} @click=${()=>this.emit("set-genre",_)}>${_}</div>
              `)}
              ${h.length?N`
                <div class="menu-chip toggle" @click=${()=>{this.expandedMenuGenre=!this.expandedMenuGenre}}>
                  ${this.expandedMenuGenre?"Show less ⌃":`+${h.length} more ⌄`}
                </div>
              `:""}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${y.map(_=>N`
                <div class="menu-chip ${_.name===n.mood?"selected":""}" style=${_.name===n.mood?`background:${_.dot}`:""} @click=${()=>this.emit("set-mood",_.name)}>${_.name}</div>
              `)}
              ${m.length?N`
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
          ${this.renderHeaderTitle(n,e)}
          <div class="subcopy">${n.genre} · ${n.chords.length} ${n.chords.length===1?"chord":"chords"} · tap a chord to preview it — use the icons to swap it or view its voicing.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show?N`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${.45}></mascot-character>
              </div>
            `:""}
            <div class="panel" style="animation:${o.anim} ${o.dur}s ${o.ease} infinite;">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((_,A)=>{const C=n.chords[_],O=Jn(C.tension),E=A===this.activeIndex;return N`
                  <div
                    class="chord-chip ${E?"active":""}"
                    style="width:${O.size}px;height:${O.size}px;border-radius:${O.radius}px;background:${O.color};${this.dragStyleFor(A)}"
                    @pointerdown=${$=>this.pressStart(A,()=>this.emit("chord-preview",_),$)}
                  >
                    ${this.showTheory?N`<div class="roman-badge">${C.roman}</div>`:""}
                    ${E?N`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>`:""}
                    <div class="chord-name" style="font-size:${O.fontSize}px;">${C.name}</div>
                    <div class="chord-role">${C.functionLabel}</div>
                    <div
                      class="swap-badge"
                      @pointerdown=${$=>$.stopPropagation()}
                      @click=${$=>{$.stopPropagation(),this.emit("chord-tap",_)}}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                    </div>
                    <div
                      class="voicing-badge"
                      aria-label="View voicing"
                      @pointerdown=${$=>$.stopPropagation()}
                      @click=${$=>{$.stopPropagation(),this.emit("chord-voicing-tap",_)}}
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
          ${a?N`
            <div class="theory-strip">
              <div class="theory-key-label">${Bi(n.key,n.scaleType)} ${n.scaleType.replace("_"," ")} · ${l}</div>
              <div class="theory-staff-scroll">
                ${Nt`
                  <svg width="${a.width}" height="${a.height}" viewBox="0 0 ${a.width} ${a.height}">
                    ${a.lines.map(_=>Nt`<rect x="6" y="${_}" width="${a.width-12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${a.lines[3]+14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${a.keySignature.map(_=>Nt`<text x="${_.x}" y="${_.y+6}" font-size="20" fill="var(--cv-ink)">${_.sign==="sharp"?"♯":"♭"}</text>`)}
                    ${a.chords.map(_=>Nt`
                      <text x="${_.cx}" y="${_.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${_.name}</text>
                      ${_.ledgers.map(A=>Nt`<rect x="${A.x}" y="${A.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${_.notes.map(A=>Nt`<ellipse cx="${A.x}" cy="${A.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${_.cx}" y="${a.height-4}" font-size="12" font-weight="800" fill="${e}" text-anchor="middle">${_.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          `:""}

          <div class="transport">
            <button class="play-btn" style="background:${e}" @click=${()=>this.emit("toggle-play")}>
              ${this.playing?N`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:N`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress?"snap":""}"
                style="width:${r}%;background:${e};--progress-duration:${Kr}ms"
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
            <div class="control-icon-btn" aria-label="Instrument: ${t}" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div class="control-icon-btn" aria-label="Play style: ${s}" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
            </div>
          </div>
          <div class="transport-meta">${Bi(n.key,n.scaleType).toUpperCase()} ${n.scaleType.replace("_"," ")} · ${n.bpm} BPM</div>

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
          ${this.expandedInstrument?N`
            <div class="control-options">
              ${v.map(_=>N`
                <div class="control-option" @click=${()=>{this.emit("set-instrument",_.name),this.expandedInstrument=!1}}>
                  <span class="control-dot" style="background:${_.color}"></span>${_.name}
                </div>
              `)}
              ${k.length?N`
                <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                  ${this.expandedAllInstruments?"Show less ⌃":`+${k.length} more ⌄`}
                </div>
              `:""}
            </div>
          `:""}
          ${this.expandedPlayStyle?N`
            <div class="control-options">
              ${I.map(_=>N`
                <div class="control-option" @click=${()=>{this.emit("set-play-style",_.name),this.expandedPlayStyle=!1}}>
                  <span class="control-dot" style="background:${_.color}"></span>${_.name}
                </div>
              `)}
              ${x.length?N`
                <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                  ${this.expandedAllPlayStyles?"Show less ⌃":`+${x.length} more ⌄`}
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

        ${this.sheetMounted&&this.swapChord?N`
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

        ${this.shareMounted?N`
          <share-modal
            .visible=${this.shareVisible}
            @close=${()=>this.closeShare()}
            @export=${_=>this.exportDevice(_.detail.device,_.detail.name)}
            @export-wav=${()=>this.handleExportWav()}
            @export-midi=${()=>this.handleExportMidi()}
          ></share-modal>
        `:""}

        ${this.toast?N`<div class="toast">${this.toast.startsWith("Sent to")||this.toast.startsWith("Saved")||this.toast.startsWith("Rendering")||this.toast.startsWith("Failed")?this.toast:`Sent to ${this.toast}`}</div>`:""}
      </div>
    `}};H.styles=Pt`
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
  `;J([G({type:Object})],H.prototype,"progression",2);J([G({type:Number})],H.prototype,"activeIndex",2);J([G({type:Number})],H.prototype,"progressStep",2);J([G({type:Array})],H.prototype,"order",2);J([G({type:Boolean})],H.prototype,"playing",2);J([G({type:Boolean})],H.prototype,"showTheory",2);J([G({type:String})],H.prototype,"instrument",2);J([G({type:String})],H.prototype,"playStyle",2);J([G({type:Boolean})],H.prototype,"sheetOpen",2);J([G({type:String})],H.prototype,"sheetMode",2);J([G({type:Object})],H.prototype,"swapChord",2);J([G({type:Number})],H.prototype,"swapIndex",2);J([G({type:Array})],H.prototype,"alternatives",2);J([M()],H.prototype,"menuMounted",2);J([M()],H.prototype,"menuVisible",2);J([M()],H.prototype,"expandedMenuGenre",2);J([M()],H.prototype,"expandedMenuMood",2);J([M()],H.prototype,"expandedAllInstruments",2);J([M()],H.prototype,"expandedAllPlayStyles",2);J([M()],H.prototype,"shareMounted",2);J([M()],H.prototype,"shareVisible",2);J([M()],H.prototype,"sheetMounted",2);J([M()],H.prototype,"sheetVisible",2);J([M()],H.prototype,"toast",2);J([M()],H.prototype,"spinning",2);J([M()],H.prototype,"drag",2);J([M()],H.prototype,"snapProgress",2);J([M()],H.prototype,"expandedInstrument",2);J([M()],H.prototype,"expandedPlayStyle",2);J([M()],H.prototype,"mascot",2);J([M()],H.prototype,"mascotSlot",2);J([M()],H.prototype,"panelPeekMascot",2);J([M()],H.prototype,"panelPeekSide",2);J([M()],H.prototype,"paradeTrigger",2);H=J([Ft("loop-screen")],H);var yy=Object.defineProperty,vy=Object.getOwnPropertyDescriptor,Ie=(n,e,t,s)=>{for(var i=s>1?void 0:s?vy(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&yy(e,t,i),i};const _y=["Piano","Rhodes","Nylon Guitar","Warm Pad"],xy=["Block chords","Arpeggio","Strum","Broken (swing)"],by=["flex-start","center","flex-end"];let Te=class extends Je{constructor(){super(...arguments),this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.canAddSection=!0,this.playing=!1,this.progressStep=0,this.totalSteps=0,this.instrument=null,this.playStyle=null,this.expandedInstrument=!1,this.expandedPlayStyle=!1,this.expandedAllInstruments=!1,this.expandedAllPlayStyles=!1,this.snapProgress=!1,this.mascot=Zs(.5),this.mascotAlign=Js([...by]),this.eggCounter=new ao,this.paradeTrigger=0}onWordmarkClick(){this.eggCounter.click()&&this.paradeTrigger++}willUpdate(n){if(n.has("progressStep")){const e=n.get("progressStep");this.snapProgress=e!==void 0&&this.progressStep<e}}updated(n){n.has("progressStep")&&this.snapProgress&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.snapProgress=!1}))}selectSection(n){this.dispatchEvent(new CustomEvent("select-section",{detail:n,bubbles:!0,composed:!0}))}addSection(){this.canAddSection&&this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}backToProgression(){this.dispatchEvent(new CustomEvent("back-to-progression",{bubbles:!0,composed:!0}))}render(){const n=this.sections[0]?.progression.genre??"Pop",e=this.instrument??kn(n),t=this.playStyle??An(n),s=this.totalSteps||this.sections.reduce((m,g)=>m+g.order.length,0),i=!this.playing||s<=0?0:this.snapProgress?this.progressStep/s*100:(this.progressStep+1)/s*100,r=Os.filter(m=>m.name!==e);let o=_y.filter(m=>r.some(g=>g.name===m));const a=r.filter(m=>!o.includes(m.name)),c=this.expandedAllInstruments?r:r.filter(m=>o.includes(m.name)),l=Es.filter(m=>m.name!==t);let u=xy.filter(m=>l.some(g=>g.name===m));const h=l.filter(m=>!u.includes(m.name)),d=this.expandedAllPlayStyles?l:l.filter(m=>u.includes(m.name)),p=this.sections[this.playing?this.activePlayingSectionIdx:0]||this.sections[0],f=p?Xn(p.progression.mood):"#C9A9E0";return N`
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
            ${this.sections.map((m,g)=>{const y=this.playing?g===this.activePlayingSectionIdx:g===this.activeSectionIdx,w=Xn(m.progression.mood);return N`
                <div class="section-row ${y?"active":""}" style=${y?`--ring-color:${w}`:""} @click=${()=>this.selectSection(g)}>
                  <div>
                    <div class="section-name">${m.name.toUpperCase()}</div>
                    <div class="section-chords">${m.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${m.order.map(b=>{const k=m.progression.chords[b],v=Jn(k.tension);return N`<div class="section-chip" style="background:${v.color};border-radius:${Math.round(v.radius*.35)}px;"></div>`})}
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
                ${this.playing?N`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`:N`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress?"snap":""}"
                  style="width:${i}%;background:${f};--progress-duration:${Kr}ms"
                ></div>
              </div>
              <div class="control-chip" @click=${()=>{this.expandedInstrument=!this.expandedInstrument,this.expandedPlayStyle=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                ${e} <span class="control-chevron">${this.expandedInstrument?"⌃":"⌄"}</span>
              </div>
              <div class="control-chip" @click=${()=>{this.expandedPlayStyle=!this.expandedPlayStyle,this.expandedInstrument=!1}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
                ${t} <span class="control-chevron">${this.expandedPlayStyle?"⌃":"⌄"}</span>
              </div>
            </div>

            ${this.expandedInstrument?N`
              <div class="control-options">
                ${c.map(m=>N`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-instrument",{detail:m.name,bubbles:!0,composed:!0})),this.expandedInstrument=!1}}>
                    <span class="control-dot" style="background:${m.color}"></span>${m.name}
                  </div>
                `)}
                ${a.length?N`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllInstruments=!this.expandedAllInstruments}}>
                    ${this.expandedAllInstruments?"Show less ⌃":`+${a.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
            ${this.expandedPlayStyle?N`
              <div class="control-options">
                ${d.map(m=>N`
                  <div class="control-option" @click=${()=>{this.dispatchEvent(new CustomEvent("set-play-style",{detail:m.name,bubbles:!0,composed:!0})),this.expandedPlayStyle=!1}}>
                    <span class="control-dot" style="background:${m.color}"></span>${m.name}
                  </div>
                `)}
                ${h.length?N`
                  <div class="control-option toggle" @click=${()=>{this.expandedAllPlayStyles=!this.expandedAllPlayStyles}}>
                    ${this.expandedAllPlayStyles?"Show less ⌃":`+${h.length} more ⌄`}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          ${this.mascot.show?N`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${.8}></mascot-character>
            </div>
          `:""}
        </div>
      </div>
    `}};Te.styles=Pt`
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
  `;Ie([G({type:Array})],Te.prototype,"sections",2);Ie([G({type:Number})],Te.prototype,"activeSectionIdx",2);Ie([G({type:Number})],Te.prototype,"activePlayingSectionIdx",2);Ie([G({type:Boolean})],Te.prototype,"canAddSection",2);Ie([G({type:Boolean})],Te.prototype,"playing",2);Ie([G({type:Number})],Te.prototype,"progressStep",2);Ie([G({type:Number})],Te.prototype,"totalSteps",2);Ie([G({type:String})],Te.prototype,"instrument",2);Ie([G({type:String})],Te.prototype,"playStyle",2);Ie([M()],Te.prototype,"expandedInstrument",2);Ie([M()],Te.prototype,"expandedPlayStyle",2);Ie([M()],Te.prototype,"expandedAllInstruments",2);Ie([M()],Te.prototype,"expandedAllPlayStyles",2);Ie([M()],Te.prototype,"snapProgress",2);Ie([M()],Te.prototype,"mascot",2);Ie([M()],Te.prototype,"mascotAlign",2);Ie([M()],Te.prototype,"paradeTrigger",2);Te=Ie([Ft("song-screen")],Te);var wy=Object.defineProperty,Ty=Object.getOwnPropertyDescriptor,ce=(n,e,t,s)=>{for(var i=s>1?void 0:s?Ty(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&wy(e,t,i),i};let re=class extends Je{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.screen="seed",this.genre="Pop",this.mood="Dreamy",this.progression=null,this.activeIndex=0,this.progressStep=0,this.order=[0,1,2,3],this.keyOverride=null,this.scaleOverride=null,this.playing=!1,this.showTheory=!1,this.instrument=null,this.playStyle=null,this.sheetOpen=!1,this.sheetMode="swap",this.swapIndex=null,this.alternatives=[],this.length=4,this.sections=[],this.activeSectionIdx=0,this.activePlayingSectionIdx=0,this.totalSongSteps=0,this.pendingChordSuggestion=null,this.userEmail=null,this.isAuthenticated=!1,this.currentProjectId=null,this.activeSearchPrompt=null,this.unsubscribeAuth=null,this.unsubscribeTick=null,this.onLoginRequest=async()=>{await cs.requestLogin()},this.onLogoutRequest=()=>{cs.logout()}}async firstUpdated(){this.showTheory=(localStorage.getItem("chroma-chords-show-theory")||localStorage.getItem("chord-voyager-show-theory"))==="true";const n=localStorage.getItem("chroma-chords-instrument");n&&Os.some(t=>t.name===n)&&(this.instrument=n);const e=localStorage.getItem("chroma-chords-play-style");e&&Es.some(t=>t.name===e)&&(this.playStyle=e),Q.setInstrument(this.instrument),Q.setPlayStyle(this.playStyle),this.unsubscribeAuth=cs.subscribeAuthState((t,s)=>{this.userEmail=t,this.isAuthenticated=s,this.requestUpdate()}),this.unsubscribeTick=Q.subscribeTick((t,s,i,r,o)=>{this.activeIndex=t,this.progressStep=s,typeof i=="number"&&(this.activePlayingSectionIdx=i),typeof r=="number"&&(this.totalSongSteps=r),this.playing=Q.isPlaying(),this.requestUpdate()}),cs.initSilentAuth();try{this.chordData=await Xm()}catch(t){console.error("Failed to load chord data:",t)}}get isAdmin(){return cs.isAdmin}disconnectedCallback(){super.disconnectedCallback(),Q.stopAutoplay(),this.unsubscribeAuth&&this.unsubscribeAuth(),this.unsubscribeTick&&this.unsubscribeTick()}onGenreChange(n){this.genre=n.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onMoodChange(n){this.mood=n.detail,this.pendingChordSuggestion=null,this.activeSearchPrompt=null}onFreetextSuggestionApplied(n){const e=n.detail;this.pendingChordSuggestion=e.chords?.length&&e.key&&e.scaleType?e:null,n.detail.promptText&&(this.activeSearchPrompt=n.detail.promptText)}async onGenerate(n){this.keyOverride=null,this.scaleOverride=null;const e=n?.detail?.promptText||this.activeSearchPrompt||void 0,t=await Og.resolvePrompt(this.chordData,this.genre,this.mood,this.length,e,this.pendingChordSuggestion);t.instrument&&(this.instrument=t.instrument,localStorage.setItem("chroma-chords-instrument",t.instrument),Q.setInstrument(t.instrument)),t.playStyle&&(this.playStyle=t.playStyle,localStorage.setItem("chroma-chords-play-style",t.playStyle),Q.setPlayStyle(t.playStyle));const s=t.progression;this.progression=s,this.order=Array.from({length:s.chords.length},(i,r)=>r),this.length=s.chords.length,this.activeIndex=0,this.progressStep=0,this.playing=!1,Q.setProgression(s,this.order),Q.reset(),this.screen="loop",this.sections=zi.createInitialSong(s,this.order),this.activeSectionIdx=0,this.pendingChordSuggestion=null,this.activeSearchPrompt=null,this.saveProject()}onLengthChange(n){this.length=n.detail}regenerate(){const n=Cc(this.chordData,this.genre,this.mood,{key:this.keyOverride??void 0,scaleType:this.scaleOverride??void 0,length:this.length});this.progression=n,this.order=Array.from({length:this.length},(e,t)=>t),this.activeIndex=0,this.progressStep=0,Q.setProgression(n,this.order),this.syncActiveSection(),this.saveProject(),this.playing&&(Q.startAutoplay(),Q.playActiveChord())}syncActiveSection(){this.progression&&(this.sections=zi.syncActiveSection(this.sections,this.activeSectionIdx,this.progression,this.order))}onSetKey(n){this.keyOverride=n.detail,this.regenerate()}onSetScale(n){this.scaleOverride=n.detail,this.regenerate()}onSetGenre(n){this.genre=n.detail,this.regenerate()}onSetMood(n){this.mood=n.detail,this.regenerate()}onSetLength(n){this.length=n.detail,this.regenerate()}onReroll(){this.progression&&this.regenerate()}onReorder(n){if(!this.progression)return;const e=this.order[this.activeIndex];this.order=n.detail;const t=this.order.indexOf(e);this.activeIndex=t>=0?t:0,Q.setOrder(this.order,this.activeIndex),this.syncActiveSection(),this.saveProject()}onBack(){Q.stopAutoplay(),this.playing=!1,this.screen="seed",this.sheetOpen=!1,this.keyOverride=null,this.scaleOverride=null}onTheoryToggle(){this.showTheory=!this.showTheory,localStorage.setItem("chroma-chords-show-theory",String(this.showTheory))}onSetInstrument(n){this.instrument=n.detail,localStorage.setItem("chroma-chords-instrument",n.detail),Q.setInstrument(n.detail)}onSetPlayStyle(n){this.playStyle=n.detail,localStorage.setItem("chroma-chords-play-style",n.detail),Q.setPlayStyle(n.detail)}onTogglePlay(){this.playing=Q.togglePlay()}onTogglePlaySong(){Q.setSong(this.sections),this.playing=Q.togglePlay()}onChordTap(n){this.progression&&(this.swapIndex=n.detail,this.sheetMode="swap",this.alternatives=vg(this.chordData,this.progression,n.detail),this.sheetOpen=!0,Q.playChordAtIndex(n.detail,.8))}onChordVoicingTap(n){this.progression&&(this.swapIndex=n.detail,this.sheetMode="voicing",this.alternatives=[],this.sheetOpen=!0,Q.playChordAtIndex(n.detail,.8))}onChordPreview(n){this.progression&&Q.playChordAtIndex(n.detail,.8)}onSheetClose(){this.sheetOpen=!1,this.swapIndex=null}onSelectAlternative(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=n.detail.chord,this.progression={...this.progression,chords:e},Q.setProgression(this.progression,this.order),this.sheetOpen=!1,this.swapIndex=null,this.syncActiveSection(),this.saveProject(),Q.playChordNotes(n.detail.chord.notes,.8)}onVoicingPreview(n){Q.playChordNotes(n.detail,.6)}onVoicingChange(n){if(!this.progression||this.swapIndex===null)return;const e=[...this.progression.chords];e[this.swapIndex]=yg(e[this.swapIndex],n.detail.quality,n.detail.extension),this.progression={...this.progression,chords:e},Q.setProgression(this.progression,this.order),this.syncActiveSection(),this.saveProject()}onBackToProgression(){Q.stopAutoplay(),this.playing=!1,this.screen="loop",this.progression&&Q.setProgression(this.progression,this.order)}onViewSong(){Q.stopAutoplay(),this.playing=!1,this.sheetOpen=!1,this.screen="song",Q.setSong(this.sections)}onSelectSection(n){const e=this.sections[n.detail];e&&(this.activeSectionIdx=n.detail,this.progression=e.progression,this.order=e.order.slice(),this.activeIndex=0,this.progressStep=0,this.length=e.progression.chords.length,this.keyOverride=e.progression.key,this.scaleOverride=e.progression.scaleType,this.sheetOpen=!1,this.screen="loop",Q.setProgression(this.progression,this.order),this.playing&&(Q.startAutoplay(),Q.playActiveChord()))}onAddSection(){if(!this.progression)return;const n=zi.addSection(this.sections,this.progression);this.sections=n.sections,this.activeSectionIdx=n.activeIndex,this.screen==="song"&&Q.setSong(this.sections)}saveProject(){if(!this.progression)return;const n=this.currentProjectId||Math.random().toString(36).slice(2,11);this.currentProjectId=n;const e={id:n,name:`${this.progression.genre} · ${this.progression.mood}`,lastModified:Date.now(),genre:this.progression.genre,mood:this.progression.mood,key:this.progression.key,scaleType:this.progression.scaleType,bpm:this.progression.bpm,chords:this.progression.chords,showTheory:this.showTheory};cs.saveProject(e)}render(){let n;if(this.screen==="seed"||!this.progression)n=N`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .isAdmin=${this.isAdmin}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></seed-screen>
      `;else if(this.screen==="song")n=N`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length<Ls.length}
          .playing=${this.playing}
          .progressStep=${this.progressStep}
          .totalSteps=${this.totalSongSteps}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
          @toggle-play-song=${this.onTogglePlaySong}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
        ></song-screen>
      `;else{const e=this.swapIndex!==null?this.progression.chords[this.swapIndex]:null;n=N`
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
          .swapChord=${e}
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
      `}return N`<div class="screen-view">${n}</div>`}};re.styles=Pt`
    :host {
      display: block;
      min-height: 100dvh;
    }
    .screen-view {
      display: block;
      min-height: 100dvh;
      opacity: 1;
      transform: scale(1);
      transition: opacity 200ms var(--cv-ease), transform 240ms var(--cv-ease);
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
    }
  `;ce([M()],re.prototype,"chordData",2);ce([M()],re.prototype,"screen",2);ce([M()],re.prototype,"genre",2);ce([M()],re.prototype,"mood",2);ce([M()],re.prototype,"progression",2);ce([M()],re.prototype,"activeIndex",2);ce([M()],re.prototype,"progressStep",2);ce([M()],re.prototype,"order",2);ce([M()],re.prototype,"keyOverride",2);ce([M()],re.prototype,"scaleOverride",2);ce([M()],re.prototype,"playing",2);ce([M()],re.prototype,"showTheory",2);ce([M()],re.prototype,"instrument",2);ce([M()],re.prototype,"playStyle",2);ce([M()],re.prototype,"sheetOpen",2);ce([M()],re.prototype,"sheetMode",2);ce([M()],re.prototype,"swapIndex",2);ce([M()],re.prototype,"alternatives",2);ce([M()],re.prototype,"length",2);ce([M()],re.prototype,"sections",2);ce([M()],re.prototype,"activeSectionIdx",2);ce([M()],re.prototype,"activePlayingSectionIdx",2);ce([M()],re.prototype,"totalSongSteps",2);ce([M()],re.prototype,"pendingChordSuggestion",2);ce([M()],re.prototype,"userEmail",2);ce([M()],re.prototype,"isAuthenticated",2);re=ce([Ft("chroma-chords-app")],re);
