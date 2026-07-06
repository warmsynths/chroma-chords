(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zn=globalThis,js=zn.ShadowRoot&&(zn.ShadyCSS===void 0||zn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,zs=Symbol(),Ei=new WeakMap;let mr=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==zs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(js&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Ei.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ei.set(t,e))}return e}toString(){return this.cssText}};const Do=s=>new mr(typeof s=="string"?s:s+"",void 0,zs),en=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((n,i,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new mr(t,s,zs)},Po=(s,e)=>{if(js)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),i=zn.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,s.appendChild(n)}},Oi=js?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Do(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$o,defineProperty:Ro,getOwnPropertyDescriptor:Lo,getOwnPropertyNames:Vo,getOwnPropertySymbols:Fo,getPrototypeOf:jo}=Object,is=globalThis,Di=is.trustedTypes,zo=Di?Di.emptyScript:"",Bo=is.reactiveElementPolyfillSupport,un=(s,e)=>s,Un={toAttribute(s,e){switch(e){case Boolean:s=s?zo:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Bs=(s,e)=>!$o(s,e),Pi={attribute:!0,type:String,converter:Un,reflect:!1,useDefault:!1,hasChanged:Bs};Symbol.metadata??=Symbol("metadata"),is.litPropertyMetadata??=new WeakMap;let Lt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Pi){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Ro(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=Lo(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pi}static _$Ei(){if(this.hasOwnProperty(un("elementProperties")))return;const e=jo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(un("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(un("properties"))){const t=this.properties,n=[...Vo(t),...Fo(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(Oi(i))}else e!==void 0&&t.push(Oi(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Po(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:Un).toAttribute(t,n.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=n.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Un;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??Bs)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,r]of n){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Lt.elementStyles=[],Lt.shadowRootOptions={mode:"open"},Lt[un("elementProperties")]=new Map,Lt[un("finalized")]=new Map,Bo?.({ReactiveElement:Lt}),(is.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ws=globalThis,$i=s=>s,qn=Ws.trustedTypes,Ri=qn?qn.createPolicy("lit-html",{createHTML:s=>s}):void 0,gr="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,vr="?"+pt,Wo=`<${vr}>`,Ct=document,fn=()=>Ct.createComment(""),mn=s=>s===null||typeof s!="object"&&typeof s!="function",Us=Array.isArray,Uo=s=>Us(s)||typeof s?.[Symbol.iterator]=="function",ks=`[ 	
\f\r]`,dn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Li=/-->/g,Vi=/>/g,Tt=RegExp(`>|${ks}(?:([^\\s"'>=/]+)(${ks}*=${ks}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fi=/'/g,ji=/"/g,yr=/^(?:script|style|textarea|title)$/i,xr=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),M=xr(1),ft=xr(2),Ut=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),zi=new WeakMap,St=Ct.createTreeWalker(Ct,129);function br(s,e){if(!Us(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ri!==void 0?Ri.createHTML(e):e}const qo=(s,e)=>{const t=s.length-1,n=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=dn;for(let a=0;a<t;a++){const c=s[a];let l,h,d=-1,u=0;for(;u<c.length&&(o.lastIndex=u,h=o.exec(c),h!==null);)u=o.lastIndex,o===dn?h[1]==="!--"?o=Li:h[1]!==void 0?o=Vi:h[2]!==void 0?(yr.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=Tt):h[3]!==void 0&&(o=Tt):o===Tt?h[0]===">"?(o=i??dn,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?Tt:h[3]==='"'?ji:Fi):o===ji||o===Fi?o=Tt:o===Li||o===Vi?o=dn:(o=Tt,i=void 0);const f=o===Tt&&s[a+1].startsWith("/>")?" ":"";r+=o===dn?c+Wo:d>=0?(n.push(l),c.slice(0,d)+gr+c.slice(d)+pt+f):c+pt+(d===-2?a:f)}return[br(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class gn{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,h]=qo(e,t);if(this.el=gn.createElement(l,n),St.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=St.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(gr)){const u=h[o++],f=i.getAttribute(d).split(pt),p=/([.?@])?(.*)/.exec(u);c.push({type:1,index:r,name:p[2],strings:f,ctor:p[1]==="."?Ho:p[1]==="?"?Yo:p[1]==="@"?Xo:rs}),i.removeAttribute(d)}else d.startsWith(pt)&&(c.push({type:6,index:r}),i.removeAttribute(d));if(yr.test(i.tagName)){const d=i.textContent.split(pt),u=d.length-1;if(u>0){i.textContent=qn?qn.emptyScript:"";for(let f=0;f<u;f++)i.append(d[f],fn()),St.nextNode(),c.push({type:2,index:++r});i.append(d[u],fn())}}}else if(i.nodeType===8)if(i.data===vr)c.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(pt,d+1))!==-1;)c.push({type:7,index:r}),d+=pt.length-1}r++}}static createElement(e,t){const n=Ct.createElement("template");return n.innerHTML=e,n}}function qt(s,e,t=s,n){if(e===Ut)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl;const r=mn(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=qt(s,i._$AS(s,e.values),i,n)),e}class Go{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??Ct).importNode(t,!0);St.currentNode=i;let r=St.nextNode(),o=0,a=0,c=n[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new _n(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new Ko(r,this,e)),this._$AV.push(l),c=n[++a]}o!==c?.index&&(r=St.nextNode(),o++)}return St.currentNode=Ct,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class _n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=qt(this,e,t),mn(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==Ut&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Uo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&mn(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ct.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=gn.createElement(br(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new Go(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=zi.get(e.strings);return t===void 0&&zi.set(e.strings,t=new gn(e)),t}k(e){Us(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new _n(this.O(fn()),this.O(fn()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=$i(e).nextSibling;$i(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class rs{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(r===void 0)e=qt(this,e,t,0),o=!mn(e)||e!==this._$AH&&e!==Ut,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=qt(this,a[n+c],t,c),l===Ut&&(l=this._$AH[c]),o||=!mn(l)||l!==this._$AH[c],l===ve?e=ve:e!==ve&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ho extends rs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}}class Yo extends rs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}}class Xo extends rs{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=qt(this,e,t,0)??ve)===Ut)return;const n=this._$AH,i=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==ve&&(n===ve||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ko{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){qt(this,e)}}const Zo=Ws.litHtmlPolyfillSupport;Zo?.(gn,_n),(Ws.litHtmlVersions??=[]).push("3.3.3");const Jo=(s,e,t)=>{const n=t?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const r=t?.renderBefore??null;n._$litPart$=i=new _n(e.insertBefore(fn(),r),r,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qs=globalThis;class Je extends Lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Jo(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ut}}Je._$litElement$=!0,Je.finalized=!0,qs.litElementHydrateSupport?.({LitElement:Je});const Qo=qs.litElementPolyfillSupport;Qo?.({LitElement:Je});(qs.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ea={attribute:!0,type:String,converter:Un,reflect:!1,hasChanged:Bs},ta=(s=ea,e,t)=>{const{kind:n,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(t.name,s),n==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(n==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,s,!0,a)}}throw Error("Unsupported decorator location: "+n)};function te(s){return(e,t)=>typeof t=="object"?ta(s,e,t):((n,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(i,r):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(s){return te({...s,state:!0,attribute:!1})}const Rn="chord_voyager_projects";class ke{static getProjects(){try{const e=localStorage.getItem(Rn);if(e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(Rn,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const n=new Map;return e.forEach(i=>n.set(i.id,i)),t.forEach(i=>{const r=n.get(i.id);!r||i.lastModified>r.lastModified?n.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(n.values())}static saveProject(e){const t=this.getProjects(),n=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),n>=0?t[n]=e:t.push(e);try{localStorage.setItem(Rn,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(n=>n.id!==e);try{localStorage.setItem(Rn,JSON.stringify(t))}catch(n){console.error("Failed to delete project from localStorage:",n)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chord_voyager.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.sections)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):n(new Error("Invalid project file format"))}catch{n(new Error("Failed to parse JSON file"))}},i.onerror=()=>n(new Error("Failed to read file")),i.readAsText(e)})}}class na{constructor(){this.accessToken=null,this.FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const n=await t.json();return n.files&&n.files.length>0?n.files[0].id:null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),n=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:n});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:n});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}}const _r="15.1.22",Bi=(s,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:s}),Wi=(s,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:s}),Ms=(s,e)=>({startTime:e,type:"setValue",value:s}),wr=(s,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:s}),Tr=(s,e,{startTime:t,target:n,timeConstant:i})=>n+(e-n)*Math.exp((t-s)/i),Ft=s=>s.type==="exponentialRampToValue",Gn=s=>s.type==="linearRampToValue",ut=s=>Ft(s)||Gn(s),Gs=s=>s.type==="setValue",it=s=>s.type==="setValueCurve",Hn=(s,e,t,n)=>{const i=s[e];return i===void 0?n:ut(i)||Gs(i)?i.value:it(i)?i.values[i.values.length-1]:Tr(t,Hn(s,e-1,i.startTime,n),i)},Ui=(s,e,t,n,i)=>t===void 0?[n.insertTime,i]:ut(t)?[t.endTime,t.value]:Gs(t)?[t.startTime,t.value]:it(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,Hn(s,e-1,t.startTime,i)],Is=s=>s.type==="cancelAndHold",Es=s=>s.type==="cancelScheduledValues",dt=s=>Is(s)||Es(s)?s.cancelTime:Ft(s)||Gn(s)?s.endTime:s.startTime,qi=(s,e,t,{endTime:n,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((s-e)/(n-e)):s<n?t:i,Gi=(s,e,t,{endTime:n,value:i})=>t+(s-e)/(n-e)*(i-t),Sr=(s,e)=>{const t=Math.floor(e);if(t===e)return s[t];const n=Math.ceil(e);return(1-(e-t))*s[t]+(1-(n-e))*s[n]},sa=(s,{duration:e,startTime:t,values:n})=>{const i=(s-t)/e*(n.length-1);return Sr(n,i)},ia=(s,e,t)=>{const n=s.length,i=Math.max(1,Math.floor(t/e*n))+1,r=s instanceof Float32Array?new Float32Array(i):s.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(n-1);r[o]=Sr(s,c)}return r},Ln=s=>s.type==="setTarget";class ra{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=dt(e);if(Is(e)||Es(e)){const n=this._automationEvents.findIndex(r=>Es(e)&&it(r)?r.startTime+r.duration>=t:dt(r)>=t),i=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),Is(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&ut(i)){if(r!==void 0&&Ln(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:it(r)?r.startTime+r.duration:dt(r),a=r===void 0?this._defaultValue:it(r)?r.values[r.values.length-1]:r.value,c=Ft(i)?qi(t,o,a,i):Gi(t,o,a,i),l=Ft(i)?Bi(c,t,this._currenTime):Wi(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&Ln(r)&&this._automationEvents.push(Ms(this.getValue(t),t)),r!==void 0&&it(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=wr(ia(r.values,r.duration,o),r.startTime,o)}}}else{const n=this._automationEvents.findIndex(o=>dt(o)>t),i=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(i!==void 0&&it(i)&&dt(i)+i.duration>t)return!1;const r=Ft(e)?Bi(e.value,e.endTime,this._currenTime):Gn(e)?Wi(e.value,t,this._currenTime):e;if(n===-1)this._automationEvents.push(r);else{if(it(e)&&t+e.duration>dt(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(n=>dt(n)>e);if(t>1){const n=this._automationEvents.slice(t-1),i=n[0];Ln(i)&&n.unshift(Ms(Hn(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=n}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>dt(o)>e),n=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&Ln(r)&&(n===void 0||!ut(n)||n.insertTime>e))return Tr(e,Hn(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&Gs(r)&&(n===void 0||!ut(n)))return r.value;if(r!==void 0&&it(r)&&(n===void 0||!ut(n)||r.startTime+r.duration>e))return e<r.startTime+r.duration?sa(e,r):r.values[r.values.length-1];if(r!==void 0&&ut(r)&&(n===void 0||!ut(n)))return r.value;if(n!==void 0&&Ft(n)){const[o,a]=Ui(this._automationEvents,i,r,n,this._defaultValue);return qi(e,o,a,n)}if(n!==void 0&&Gn(n)){const[o,a]=Ui(this._automationEvents,i,r,n,this._defaultValue);return Gi(e,o,a,n)}return this._defaultValue}}const oa=s=>({cancelTime:s,type:"cancelAndHold"}),aa=s=>({cancelTime:s,type:"cancelScheduledValues"}),ca=(s,e)=>({endTime:e,type:"exponentialRampToValue",value:s}),la=(s,e)=>({endTime:e,type:"linearRampToValue",value:s}),ha=(s,e,t)=>({startTime:e,target:s,timeConstant:t,type:"setTarget"}),da=()=>new DOMException("","AbortError"),ua=s=>(e,t,[n,i,r],o)=>{s(e[i],[t,n,r],a=>a[0]===t&&a[1]===n,o)},pa=s=>(e,t,n)=>{const i=[];for(let r=0;r<n.numberOfInputs;r+=1)i.push(new Set);s.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},fa=s=>(e,t)=>{s.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},Gt=new WeakSet,kr=new WeakMap,Hs=new WeakMap,Ar=new WeakMap,Ys=new WeakMap,os=new WeakMap,Cr=new WeakMap,Os=new WeakMap,Ds=new WeakMap,Ps=new WeakMap,Nr={construct(){return Nr}},ma=s=>{try{const e=new Proxy(s,Nr);new e}catch{return!1}return!0},Hi=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Yi=(s,e)=>{const t=[];let n=s.replace(/^[\s]+/,""),i=n.match(Hi);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),n=n.slice(i[0].length).replace(/^[\s]+/,""),i=n.match(Hi)}return[t.join(";"),n]},Xi=s=>{if(s!==void 0&&!Array.isArray(s))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Ki=s=>{if(!ma(s))throw new TypeError("The given value for processorCtor should be a constructor.");if(s.prototype===null||typeof s.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},ga=(s,e,t,n,i,r,o,a,c,l,h,d,u)=>{let f=0;return(p,m,g={credentials:"omit"})=>{const y=h.get(p);if(y!==void 0&&y.has(m))return Promise.resolve();const w=l.get(p);if(w!==void 0){const v=w.get(m);if(v!==void 0)return v}const T=r(p),S=T.audioWorklet===void 0?i(m).then(([v,b])=>{const[_,x]=Yi(v,b),N=`${_};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${x}
})})(window,'_AWGS')`;return t(N)}).then(()=>{const v=u._AWGS.pop();if(v===void 0)throw new SyntaxError;n(T.currentTime,T.sampleRate,()=>v(class{},void 0,(b,_)=>{if(b.trim()==="")throw e();const x=Ds.get(T);if(x!==void 0){if(x.has(b))throw e();Ki(_),Xi(_.parameterDescriptors),x.set(b,_)}else Ki(_),Xi(_.parameterDescriptors),Ds.set(T,new Map([[b,_]]))},T.sampleRate,void 0,void 0))}):Promise.all([i(m),Promise.resolve(s(d,d))]).then(([[v,b],_])=>{const x=f+1;f=x;const[N,C]=Yi(v,b),E=`${N};((AudioWorkletProcessor,registerProcessor)=>{${C}
})(${_?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${_?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${_?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${x}',class extends AudioWorkletProcessor{process(){return !1}})`,R=new Blob([E],{type:"application/javascript; charset=utf-8"}),D=URL.createObjectURL(R);return T.audioWorklet.addModule(D,g).then(()=>{if(a(T))return T;const P=o(T);return P.audioWorklet.addModule(D,g).then(()=>P)}).then(P=>{if(c===null)throw new SyntaxError;try{new c(P,`__sac${x}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(D))});return w===void 0?l.set(p,new Map([[m,S]])):w.set(m,S),S.then(()=>{const v=h.get(p);v===void 0?h.set(p,new Set([m])):v.add(m)}).finally(()=>{const v=l.get(p);v!==void 0&&v.delete(m)}),S}},He=(s,e)=>{const t=s.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},as=(s,e)=>{const t=Array.from(s).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[n]=t;return s.delete(n),n},Mr=(s,e,t,n)=>{const i=He(s,e),r=as(i,o=>o[0]===t&&o[1]===n);return i.size===0&&s.delete(e),r},wn=s=>He(Cr,s),Ht=s=>{if(Gt.has(s))throw new Error("The AudioNode is already stored.");Gt.add(s),wn(s).forEach(e=>e(!0))},Ir=s=>"port"in s,Tn=s=>{if(!Gt.has(s))throw new Error("The AudioNode is not stored.");Gt.delete(s),wn(s).forEach(e=>e(!1))},$s=(s,e)=>{!Ir(s)&&e.every(t=>t.size===0)&&Tn(s)},va=(s,e,t,n,i,r,o,a,c,l,h,d,u)=>{const f=new WeakMap;return(p,m,g,y,w)=>{const{activeInputs:T,passiveInputs:S}=r(m),{outputs:v}=r(p),b=a(p),_=x=>{const N=c(m),C=c(p);if(x){const A=Mr(S,p,g,y);s(T,p,A,!1),!w&&!d(p)&&t(C,N,g,y),u(m)&&Ht(m)}else{const A=n(T,p,g,y);e(S,y,A,!1),!w&&!d(p)&&i(C,N,g,y);const k=o(m);if(k===0)h(m)&&$s(m,T);else{const O=f.get(m);O!==void 0&&clearTimeout(O),f.set(m,setTimeout(()=>{h(m)&&$s(m,T)},k*1e3))}}};return l(v,[m,g,y],x=>x[0]===m&&x[1]===g&&x[2]===y,!0)?(b.add(_),h(p)?s(T,p,[g,y,_],!0):e(S,y,[p,g,_],!0),!0):!1}},ya=s=>(e,t,[n,i,r],o)=>{const a=e.get(n);a===void 0?e.set(n,new Set([[i,t,r]])):s(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},xa=s=>(e,t)=>{const n=s(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(n).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(n),n.disconnect()};t.addEventListener("ended",i)},ba=s=>(e,t)=>{s(e).add(t)},_a={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},wa=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={..._a,...c},d=n(l,h),u=r(l)?e():null;super(a,!1,d,u),this._nativeAnalyserNode=d}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Te=(s,e)=>s.context===e,Ta=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Yn=s=>{try{s.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},et=()=>new DOMException("","IndexSizeError"),Xs=s=>{s.getChannelData=(e=>t=>{try{return e.call(s,t)}catch(n){throw n.code===12?et():n}})(s.getChannelData)},Sa={numberOfChannels:1},ka=(s,e,t,n,i,r,o,a)=>{let c=null;return class Er{constructor(h){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:d,numberOfChannels:u,sampleRate:f}={...Sa,...h};c===null&&(c=new i(1,1,44100));const p=n!==null&&e(r,r)?new n({length:d,numberOfChannels:u,sampleRate:f}):c.createBuffer(u,d,f);if(p.numberOfChannels===0)throw t();return typeof p.copyFromChannel!="function"?(o(p),Xs(p)):e(Yn,()=>Yn(p))||a(p),s.add(p),p}static[Symbol.hasInstance](h){return h!==null&&typeof h=="object"&&Object.getPrototypeOf(h)===Er.prototype||s.has(h)}}},Ie=-34028234663852886e22,Ae=-Ie,rt=s=>Gt.has(s),Aa={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},Ca=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const d=r(l),u={...Aa,...h},f=i(d,u),p=o(d),m=p?e():null;super(l,!1,f,m),this._audioBufferSourceNodeRenderer=m,this._isBufferNullified=!1,this._isBufferSet=u.buffer!==null,this._nativeAudioBufferSourceNode=f,this._onended=null,this._playbackRate=t(this,p,f.playbackRate,Ae,Ie)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const h=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=h;const d=this._nativeAudioBufferSourceNode.onended;this._onended=d!==null&&d===h?l:d}get playbackRate(){return this._playbackRate}start(l=0,h=0,d){if(this._nativeAudioBufferSourceNode.start(l,h,d),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=d===void 0?[l,h]:[l,h,d]),this.context.state!=="closed"){Ht(this);const u=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",u),rt(this)&&Tn(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",u)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},Na=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let d=t(l);const u=Te(d,h);if(!u){const f={buffer:d.buffer,channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,loop:d.loop,loopEnd:d.loopEnd,loopStart:d.loopStart,playbackRate:d.playbackRate.value};d=e(h,f),o!==null&&d.start(...o),a!==null&&d.stop(a)}return r.set(h,d),u?await s(h,l.playbackRate,d.playbackRate):await n(h,l.playbackRate,d.playbackRate),await i(l,h,d),d};return{set start(l){o=l},set stop(l){a=l},render(l,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):c(l,h)}}},Ma=s=>"playbackRate"in s,Ia=s=>"frequency"in s&&"gain"in s,Ea=s=>"offset"in s,Oa=s=>!("frequency"in s)&&"gain"in s,Da=s=>"detune"in s&&"frequency"in s&&!("gain"in s),Pa=s=>"pan"in s,Ce=s=>He(kr,s),Sn=s=>He(Ar,s),Rs=(s,e)=>{const{activeInputs:t}=Ce(s);t.forEach(i=>i.forEach(([r])=>{e.includes(s)||Rs(r,[...e,s])}));const n=Ma(s)?[s.playbackRate]:Ir(s)?Array.from(s.parameters.values()):Ia(s)?[s.Q,s.detune,s.frequency,s.gain]:Ea(s)?[s.offset]:Oa(s)?[s.gain]:Da(s)?[s.detune,s.frequency]:Pa(s)?[s.pan]:[];for(const i of n){const r=Sn(i);r!==void 0&&r.activeInputs.forEach(([o])=>Rs(o,e))}rt(s)&&Tn(s)},Or=s=>{Rs(s.destination,[])},$a=s=>s===void 0||typeof s=="number"||typeof s=="string"&&(s==="balanced"||s==="interactive"||s==="playback"),Ra=(s,e,t,n,i,r,o,a,c)=>class extends s{constructor(h={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let d;try{d=new c(h)}catch(p){throw p.code===12&&p.message==="sampleRate is not in range"?t():p}if(d===null)throw n();if(!$a(h.latencyHint))throw new TypeError(`The provided value '${h.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(h.sampleRate!==void 0&&d.sampleRate!==h.sampleRate)throw t();super(d,2);const{latencyHint:u}=h,{sampleRate:f}=d;if(this._baseLatency=typeof d.baseLatency=="number"?d.baseLatency:u==="balanced"?512/f:u==="interactive"||u===void 0?256/f:u==="playback"?1024/f:Math.max(2,Math.min(128,Math.round(u*f/128)))*128/f,this._nativeAudioContext=d,c.name==="webkitAudioContext"?(this._nativeGainNode=d.createGain(),this._nativeOscillatorNode=d.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(d.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,d.state==="running"){this._state="suspended";const p=()=>{this._state==="suspended"&&(this._state=null),d.removeEventListener("statechange",p)};d.addEventListener("statechange",p)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),Or(this)}))}createMediaElementSource(h){return new i(this,{mediaElement:h})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(h){return new o(this,{mediaStream:h})}createMediaStreamTrackSource(h){return new a(this,{mediaStreamTrack:h})}resume(){return this._state==="suspended"?new Promise((h,d)=>{const u=()=>{this._nativeAudioContext.removeEventListener("statechange",u),this._nativeAudioContext.state==="running"?h():this.resume().then(h,d)};this._nativeAudioContext.addEventListener("statechange",u)}):this._nativeAudioContext.resume().catch(h=>{throw h===void 0||h.code===15?e():h})}suspend(){return this._nativeAudioContext.suspend().catch(h=>{throw h===void 0?e():h})}},La=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const d=r(l),u=o(d),f=i(d,h,u),p=u?e(a):null;super(l,!1,f,p),this._isNodeOfNativeOfflineAudioContext=u,this._nativeAudioDestinationNode=f}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Va=s=>{const e=new WeakMap,t=async(n,i)=>{const r=i.destination;return e.set(i,r),await s(n,i,r),r};return{render(n,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(n,i)}}},Fa=(s,e,t,n,i,r,o,a)=>(c,l)=>{const h=l.listener,d=()=>{const v=new Float32Array(1),b=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),_=o(l);let x=!1,N=[0,0,-1,0,1,0],C=[0,0,0];const A=()=>{if(x)return;x=!0;const R=n(l,256,9,0);R.onaudioprocess=({inputBuffer:D})=>{const P=[r(D,v,0),r(D,v,1),r(D,v,2),r(D,v,3),r(D,v,4),r(D,v,5)];P.some((L,j)=>L!==N[j])&&(h.setOrientation(...P),N=P);const q=[r(D,v,6),r(D,v,7),r(D,v,8)];q.some((L,j)=>L!==C[j])&&(h.setPosition(...q),C=q)},b.connect(R)},k=R=>D=>{D!==N[R]&&(N[R]=D,h.setOrientation(...N))},O=R=>D=>{D!==C[R]&&(C[R]=D,h.setPosition(...C))},E=(R,D,P)=>{const q=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:D});q.connect(b,0,R),q.start(),Object.defineProperty(q.offset,"defaultValue",{get(){return D}});const L=s({context:c},_,q.offset,Ae,Ie);return a(L,"value",j=>()=>j.call(L),j=>F=>{try{j.call(L,F)}catch(Z){if(Z.code!==9)throw Z}A(),_&&P(F)}),L.cancelAndHoldAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.cancelAndHoldAtTime),L.cancelScheduledValues=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.cancelScheduledValues),L.exponentialRampToValueAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.exponentialRampToValueAtTime),L.linearRampToValueAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.linearRampToValueAtTime),L.setTargetAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.setTargetAtTime),L.setValueAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.setValueAtTime),L.setValueCurveAtTime=(j=>_?()=>{throw i()}:(...F)=>{const Z=j.apply(L,F);return A(),Z})(L.setValueCurveAtTime),L};return{forwardX:E(0,0,k(0)),forwardY:E(1,0,k(1)),forwardZ:E(2,-1,k(2)),positionX:E(6,0,O(0)),positionY:E(7,0,O(1)),positionZ:E(8,0,O(2)),upX:E(3,0,k(3)),upY:E(4,1,k(4)),upZ:E(5,0,k(5))}},{forwardX:u,forwardY:f,forwardZ:p,positionX:m,positionY:g,positionZ:y,upX:w,upY:T,upZ:S}=h.forwardX===void 0?d():h;return{get forwardX(){return u},get forwardY(){return f},get forwardZ(){return p},get positionX(){return m},get positionY(){return g},get positionZ(){return y},get upX(){return w},get upY(){return T},get upZ(){return S}}},Xn=s=>"context"in s,kn=s=>Xn(s[0]),Ot=(s,e,t,n)=>{for(const i of s)if(t(i)){if(n)return!1;throw Error("The set contains at least one similar element.")}return s.add(e),!0},Zi=(s,e,[t,n],i)=>{Ot(s,[e,t,n],r=>r[0]===e&&r[1]===t,i)},Ji=(s,[e,t,n],i)=>{const r=s.get(e);r===void 0?s.set(e,new Set([[t,n]])):Ot(r,[t,n],o=>o[0]===t,i)},nn=s=>"inputs"in s,Kn=(s,e,t,n)=>{if(nn(e)){const i=e.inputs[n];return s.connect(i,t,0),[i,t,0]}return s.connect(e,t,n),[e,t,n]},Dr=(s,e,t)=>{for(const n of s)if(n[0]===e&&n[1]===t)return s.delete(n),n;return null},ja=(s,e,t)=>as(s,n=>n[0]===e&&n[1]===t),Pr=(s,e)=>{if(!wn(s).delete(e))throw new Error("Missing the expected event listener.")},$r=(s,e,t)=>{const n=He(s,e),i=as(n,r=>r[0]===t);return n.size===0&&s.delete(e),i},Zn=(s,e,t,n)=>{nn(e)?s.disconnect(e.inputs[n],t,0):s.disconnect(e,t,n)},se=s=>He(Hs,s),vn=s=>He(Ys,s),Nt=s=>Os.has(s),Bn=s=>!Gt.has(s),Qi=(s,e)=>new Promise(t=>{if(e!==null)t(!0);else{const n=s.createScriptProcessor(256,1,1),i=s.createGain(),r=s.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=s.createBufferSource();a.buffer=r,a.loop=!0,a.connect(n).connect(s.destination),a.connect(i),a.disconnect(i),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,h=>h===1)?t(!0):t(!1),a.stop(),n.onaudioprocess=null,a.disconnect(n),n.disconnect(s.destination)},a.start()}}),As=(s,e)=>{const t=new Map;for(const n of s)for(const i of n){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((n,i)=>e(i,n))},Jn=s=>"context"in s,za=s=>{const e=new Map;s.connect=(t=>(n,i=0,r=0)=>{const o=Jn(n)?t(n,i,r):t(n,i),a=e.get(n);return a===void 0?e.set(n,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(s.connect.bind(s)),s.disconnect=(t=>(n,i,r)=>{if(t.apply(s),n===void 0)e.clear();else if(typeof n=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==n);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(n))if(i===void 0)e.delete(n);else{const o=e.get(n);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(n):e.set(n,a)}}for(const[o,a]of e)a.forEach(c=>{Jn(o)?s.connect(o,c.output,c.input):s.connect(o,c.output)})})(s.disconnect)},Ba=(s,e,t,n)=>{const{activeInputs:i,passiveInputs:r}=Sn(e),{outputs:o}=Ce(s),a=wn(s),c=l=>{const h=se(s),d=vn(e);if(l){const u=$r(r,s,t);Zi(i,s,u,!1),!n&&!Nt(s)&&h.connect(d,t)}else{const u=ja(i,s,t);Ji(r,u,!1),!n&&!Nt(s)&&h.disconnect(d,t)}};return Ot(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),rt(s)?Zi(i,s,[t,c],!0):Ji(r,[s,t,c],!0),!0):!1},Wa=(s,e,t,n)=>{const{activeInputs:i,passiveInputs:r}=Ce(e),o=Dr(i[n],s,t);return o===null?[Mr(r,s,t,n)[2],!1]:[o[2],!0]},Ua=(s,e,t)=>{const{activeInputs:n,passiveInputs:i}=Sn(e),r=Dr(n,s,t);return r===null?[$r(i,s,t)[1],!1]:[r[2],!0]},Ks=(s,e,t,n,i)=>{const[r,o]=Wa(s,t,n,i);if(r!==null&&(Pr(s,r),o&&!e&&!Nt(s)&&Zn(se(s),se(t),n,i)),rt(t)){const{activeInputs:a}=Ce(t);$s(t,a)}},Zs=(s,e,t,n)=>{const[i,r]=Ua(s,t,n);i!==null&&(Pr(s,i),r&&!e&&!Nt(s)&&se(s).disconnect(vn(t),n))},qa=(s,e)=>{const t=Ce(s),n=[];for(const i of t.outputs)kn(i)?Ks(s,e,...i):Zs(s,e,...i),n.push(i[0]);return t.outputs.clear(),n},Ga=(s,e,t)=>{const n=Ce(s),i=[];for(const r of n.outputs)r[1]===t&&(kn(r)?Ks(s,e,...r):Zs(s,e,...r),i.push(r[0]),n.outputs.delete(r));return i},Ha=(s,e,t,n,i)=>{const r=Ce(s);return Array.from(r.outputs).filter(o=>o[0]===t&&(n===void 0||o[1]===n)&&(i===void 0||o[2]===i)).map(o=>(kn(o)?Ks(s,e,...o):Zs(s,e,...o),r.outputs.delete(o),o[0]))},Ya=(s,e,t,n,i,r,o,a,c,l,h,d,u,f,p,m)=>class extends l{constructor(y,w,T,S){super(T),this._context=y,this._nativeAudioNode=T;const v=h(y);d(v)&&t(Qi,()=>Qi(v,m))!==!0&&za(T),Hs.set(this,T),Cr.set(this,new Set),y.state!=="closed"&&w&&Ht(this),s(this,S,T)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(y){this._nativeAudioNode.channelCount=y}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(y){this._nativeAudioNode.channelCountMode=y}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(y){this._nativeAudioNode.channelInterpretation=y}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(y,w=0,T=0){if(w<0||w>=this._nativeAudioNode.numberOfOutputs)throw i();const S=h(this._context),v=p(S);if(u(y)||f(y))throw r();if(Xn(y)){const x=se(y);try{const C=Kn(this._nativeAudioNode,x,w,T),A=Bn(this);(v||A)&&this._nativeAudioNode.disconnect(...C),this.context.state!=="closed"&&!A&&Bn(y)&&Ht(y)}catch(C){throw C.code===12?r():C}if(e(this,y,w,T,v)){const C=c([this],y);As(C,n(v))}return y}const b=vn(y);if(b.name==="playbackRate"&&b.maxValue===1024)throw o();try{this._nativeAudioNode.connect(b,w),(v||Bn(this))&&this._nativeAudioNode.disconnect(b,w)}catch(x){throw x.code===12?r():x}if(Ba(this,y,w,v)){const x=c([this],y);As(x,n(v))}}disconnect(y,w,T){let S;const v=h(this._context),b=p(v);if(y===void 0)S=qa(this,b);else if(typeof y=="number"){if(y<0||y>=this.numberOfOutputs)throw i();S=Ga(this,b,y)}else{if(w!==void 0&&(w<0||w>=this.numberOfOutputs)||Xn(y)&&T!==void 0&&(T<0||T>=y.numberOfInputs))throw i();if(S=Ha(this,b,y,w,T),S.length===0)throw r()}for(const _ of S){const x=c([this],_);As(x,a)}}},Xa=(s,e,t,n,i,r,o,a,c,l,h,d,u)=>(f,p,m,g=null,y=null)=>{const w=m.value,T=new ra(w),S=p?n(T):null,v={get defaultValue(){return w},get maxValue(){return g===null?m.maxValue:g},get minValue(){return y===null?m.minValue:y},get value(){return m.value},set value(b){m.value=b,v.setValueAtTime(b,f.context.currentTime)},cancelAndHoldAtTime(b){if(typeof m.cancelAndHoldAtTime=="function")S===null&&T.flush(f.context.currentTime),T.add(i(b)),m.cancelAndHoldAtTime(b);else{const _=Array.from(T).pop();S===null&&T.flush(f.context.currentTime),T.add(i(b));const x=Array.from(T).pop();m.cancelScheduledValues(b),_!==x&&x!==void 0&&(x.type==="exponentialRampToValue"?m.exponentialRampToValueAtTime(x.value,x.endTime):x.type==="linearRampToValue"?m.linearRampToValueAtTime(x.value,x.endTime):x.type==="setValue"?m.setValueAtTime(x.value,x.startTime):x.type==="setValueCurve"&&m.setValueCurveAtTime(x.values,x.startTime,x.duration))}return v},cancelScheduledValues(b){return S===null&&T.flush(f.context.currentTime),T.add(r(b)),m.cancelScheduledValues(b),v},exponentialRampToValueAtTime(b,_){if(b===0)throw new RangeError;if(!Number.isFinite(_)||_<0)throw new RangeError;const x=f.context.currentTime;return S===null&&T.flush(x),Array.from(T).length===0&&(T.add(l(w,x)),m.setValueAtTime(w,x)),T.add(o(b,_)),m.exponentialRampToValueAtTime(b,_),v},linearRampToValueAtTime(b,_){const x=f.context.currentTime;return S===null&&T.flush(x),Array.from(T).length===0&&(T.add(l(w,x)),m.setValueAtTime(w,x)),T.add(a(b,_)),m.linearRampToValueAtTime(b,_),v},setTargetAtTime(b,_,x){return S===null&&T.flush(f.context.currentTime),T.add(c(b,_,x)),m.setTargetAtTime(b,_,x),v},setValueAtTime(b,_){return S===null&&T.flush(f.context.currentTime),T.add(l(b,_)),m.setValueAtTime(b,_),v},setValueCurveAtTime(b,_,x){const N=b instanceof Float32Array?b:new Float32Array(b);if(d!==null&&d.name==="webkitAudioContext"){const C=_+x,A=f.context.sampleRate,k=Math.ceil(_*A),O=Math.floor(C*A),E=O-k,R=new Float32Array(E);for(let P=0;P<E;P+=1){const q=(N.length-1)/x*((k+P)/A-_),L=Math.floor(q),j=Math.ceil(q);R[P]=L===j?N[L]:(1-(q-L))*N[L]+(1-(j-q))*N[j]}S===null&&T.flush(f.context.currentTime),T.add(h(R,_,x)),m.setValueCurveAtTime(R,_,x);const D=O/A;D<C&&u(v,R[R.length-1],D),u(v,N[N.length-1],C)}else S===null&&T.flush(f.context.currentTime),T.add(h(N,_,x)),m.setValueCurveAtTime(N,_,x);return v}};return t.set(v,m),e.set(v,f),s(v,S),v},Ka=s=>({replay(e){for(const t of s)if(t.type==="exponentialRampToValue"){const{endTime:n,value:i}=t;e.exponentialRampToValueAtTime(i,n)}else if(t.type==="linearRampToValue"){const{endTime:n,value:i}=t;e.linearRampToValueAtTime(i,n)}else if(t.type==="setTarget"){const{startTime:n,target:i,timeConstant:r}=t;e.setTargetAtTime(i,n,r)}else if(t.type==="setValue"){const{startTime:n,value:i}=t;e.setValueAtTime(i,n)}else if(t.type==="setValueCurve"){const{duration:n,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,n)}else throw new Error("Can't apply an unknown automation.")}});class Rr{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((n,i)=>e.call(t,n,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const Za={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},Ja=(s,e,t,n,i,r,o,a,c,l,h,d,u,f)=>class extends e{constructor(m,g,y){var w;const T=a(m),S=c(T),v=h({...Za,...y});u(v);const b=Ds.get(T),_=b?.get(g),x=S||T.state!=="closed"?T:(w=o(T))!==null&&w!==void 0?w:T,N=i(x,S?null:m.baseLatency,l,g,_,v),C=S?n(g,v,_):null;super(m,!0,N,C);const A=[];N.parameters.forEach((O,E)=>{const R=t(this,S,O);A.push([E,R])}),this._nativeAudioWorkletNode=N,this._onprocessorerror=null,this._parameters=new Rr(A),S&&s(T,this);const{activeInputs:k}=r(this);d(N,k)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(m){const g=typeof m=="function"?f(this,m):null;this._nativeAudioWorkletNode.onprocessorerror=g;const y=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=y!==null&&y===g?m:y}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function Qn(s,e,t,n,i){if(typeof s.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),s.copyFromChannel(e[t],n,i);else{const r=s.getChannelData(n);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const Lr=(s,e,t,n,i)=>{typeof s.copyToChannel=="function"?e[t].byteLength!==0&&s.copyToChannel(e[t],n,i):e[t].byteLength!==0&&s.getChannelData(n).set(e[t],i)},es=(s,e)=>{const t=[];for(let n=0;n<s;n+=1){const i=[],r=typeof e=="number"?e:e[n];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},Qa=(s,e)=>{const t=He(Ps,s),n=se(e);return He(t,n)},ec=async(s,e,t,n,i,r,o)=>{const a=e===null?Math.ceil(s.context.length/128)*128:e.length,c=n.channelCount*n.numberOfInputs,l=i.reduce((g,y)=>g+y,0),h=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const d=Ce(s),u=await Qa(t,s),f=es(n.numberOfInputs,n.channelCount),p=es(n.numberOfOutputs,i),m=Array.from(s.parameters.keys()).reduce((g,y)=>({...g,[y]:new Float32Array(128)}),{});for(let g=0;g<a;g+=128){if(n.numberOfInputs>0&&e!==null)for(let y=0;y<n.numberOfInputs;y+=1)for(let w=0;w<n.channelCount;w+=1)Qn(e,f[y],w,w,g);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:y},w)=>{Qn(e,m,y,c+w,g)});for(let y=0;y<n.numberOfInputs;y+=1)for(let w=0;w<i[y];w+=1)p[y][w].byteLength===0&&(p[y][w]=new Float32Array(128));try{const y=f.map((T,S)=>d.activeInputs[S].size===0?[]:T),w=o(g/t.sampleRate,t.sampleRate,()=>u.process(y,p,m));if(h!==null)for(let T=0,S=0;T<n.numberOfOutputs;T+=1){for(let v=0;v<i[T];v+=1)Lr(h,p[T],v,S+v,g);S+=i[T]}if(!w)break}catch(y){s.dispatchEvent(new ErrorEvent("processorerror",{colno:y.colno,filename:y.filename,lineno:y.lineno,message:y.message}));break}}return h},tc=(s,e,t,n,i,r,o,a,c,l,h,d,u,f,p,m)=>(g,y,w)=>{const T=new WeakMap;let S=null;const v=async(b,_)=>{let x=h(b),N=null;const C=Te(x,_),A=Array.isArray(y.outputChannelCount)?y.outputChannelCount:Array.from(y.outputChannelCount);if(d===null){const k=A.reduce((D,P)=>D+P,0),O=i(_,{channelCount:Math.max(1,k),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,k)}),E=[];for(let D=0;D<b.numberOfOutputs;D+=1)E.push(n(_,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:A[D]}));const R=o(_,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1});R.connect=e.bind(null,E),R.disconnect=c.bind(null,E),N=[O,E,R]}else C||(x=new d(_,g));if(T.set(_,N===null?x:N[2]),N!==null){if(S===null){if(w===void 0)throw new Error("Missing the processor constructor.");if(u===null)throw new Error("Missing the native OfflineAudioContext constructor.");const P=b.channelCount*b.numberOfInputs,q=w.parameterDescriptors===void 0?0:w.parameterDescriptors.length,L=P+q;S=ec(b,L===0?null:await(async()=>{const F=new u(L,Math.ceil(b.context.length/128)*128,_.sampleRate),Z=[],De=[];for(let ie=0;ie<y.numberOfInputs;ie+=1)Z.push(o(F,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1})),De.push(i(F,{channelCount:y.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:y.channelCount}));const Pe=await Promise.all(Array.from(b.parameters.values()).map(async ie=>{const Se=r(F,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:ie.value});return await f(F,ie,Se.offset),Se})),G=n(F,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,P+q)});for(let ie=0;ie<y.numberOfInputs;ie+=1){Z[ie].connect(De[ie]);for(let Se=0;Se<y.channelCount;Se+=1)De[ie].connect(G,Se,ie*y.channelCount+Se)}for(const[ie,Se]of Pe.entries())Se.connect(G,0,P+ie),Se.start(0);return G.connect(F.destination),await Promise.all(Z.map(ie=>p(b,F,ie))),m(F)})(),_,y,A,w,l)}const k=await S,O=t(_,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[E,R,D]=N;k!==null&&(O.buffer=k,O.start(0)),O.connect(E);for(let P=0,q=0;P<b.numberOfOutputs;P+=1){const L=R[P];for(let j=0;j<A[P];j+=1)E.connect(L,q+j,j);q+=A[P]}return D}if(C)for(const[k,O]of b.parameters.entries())await s(_,O,x.parameters.get(k));else for(const[k,O]of b.parameters.entries())await f(_,O,x.parameters.get(k));return await p(b,_,x),x};return{render(b,_){a(_,b);const x=T.get(_);return x!==void 0?Promise.resolve(x):v(b,_)}}},nc=(s,e,t,n,i,r,o,a,c,l,h,d,u,f,p,m,g,y,w,T)=>class extends p{constructor(v,b){super(v,b),this._nativeContext=v,this._audioWorklet=s===void 0?void 0:{addModule:(_,x)=>s(this,_,x)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(v,b,_){return new t({length:b,numberOfChannels:v,sampleRate:_})}createBufferSource(){return new n(this)}createChannelMerger(v=6){return new r(this,{numberOfInputs:v})}createChannelSplitter(v=6){return new o(this,{numberOfOutputs:v})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(v=1){return new h(this,{maxDelayTime:v})}createDynamicsCompressor(){return new d(this)}createGain(){return new u(this)}createIIRFilter(v,b){return new f(this,{feedback:b,feedforward:v})}createOscillator(){return new m(this)}createPanner(){return new g(this)}createPeriodicWave(v,b,_={disableNormalization:!1}){return new y(this,{..._,imag:b,real:v})}createStereoPanner(){return new w(this)}createWaveShaper(){return new T(this)}decodeAudioData(v,b,_){return l(this._nativeContext,v).then(x=>(typeof b=="function"&&b(x),x),x=>{throw typeof _=="function"&&_(x),x})}},sc={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},ic=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const d=r(l),u={...sc,...h},f=i(d,u),p=o(d),m=p?t():null;super(l,!1,f,m),this._Q=e(this,p,f.Q,Ae,Ie),this._detune=e(this,p,f.detune,1200*Math.log2(Ae),-1200*Math.log2(Ae)),this._frequency=e(this,p,f.frequency,l.sampleRate/2,0),this._gain=e(this,p,f.gain,40*Math.log10(Ae),Ie),this._nativeBiquadFilterNode=f,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,h,d){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,h,d)}catch(u){throw u.code===11?n():u}if(l.length!==h.length||h.length!==d.length)throw n()}},rc=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const d={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,d)}return r.set(c,l),h?(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)):(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},oc=(s,e)=>(t,n)=>{const i=e.get(t);if(i!==void 0)return i;const r=s.get(t);if(r!==void 0)return r;try{const o=n();return o instanceof Promise?(s.set(t,o),o.catch(()=>!1).then(a=>(s.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},ac={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},cc=(s,e,t,n,i)=>class extends s{constructor(o,a){const c=n(o),l={...ac,...a},h=t(c,l),d=i(c)?e():null;super(o,!1,h,d)}},lc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},hc={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},dc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h=r({...hc,...c}),d=t(l,h),u=i(l)?e():null;super(a,!1,d,u)}},uc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},pc=s=>(e,t,n)=>s(t,e,n),fc=s=>(e,t,n=0,i=0)=>{const r=e[n];if(r===void 0)throw s();return Jn(t)?r.connect(t,0,i):r.connect(t,0)},mc=s=>(e,t)=>{const n=s(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return n.buffer=i,n.loop=!0,n.connect(t),n.start(),()=>{n.stop(),n.disconnect(t)}},gc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},vc=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),d={...gc,...l},u=n(h,d),f=r(h),p=f?t():null;super(c,!1,u,p),this._constantSourceNodeRenderer=p,this._nativeConstantSourceNode=u,this._offset=e(this,f,u.offset,Ae,Ie),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const h=this._nativeConstantSourceNode.onended;this._onended=h!==null&&h===l?c:h}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){Ht(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),rt(this)&&Tn(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},yc=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let d=t(l);const u=Te(d,h);if(!u){const f={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,offset:d.offset.value};d=e(h,f),o!==null&&d.start(o),a!==null&&d.stop(a)}return r.set(h,d),u?await s(h,l.offset,d.offset):await n(h,l.offset,d.offset),await i(l,h,d),d};return{set start(l){o=l},set stop(l){a=l},render(l,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):c(l,h)}}},xc=s=>e=>(s[0]=e,s[0]),bc={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},_c=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h={...bc,...c},d=t(l,h),f=i(l)?e():null;super(a,!1,d,f),this._isBufferNullified=!1,this._nativeConvolverNode=d,h.buffer!==null&&r(this,h.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},wc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=s(o,l)}return n.set(o,a),nn(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Tc=(s,e)=>(t,n,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,n,i)}catch(r){throw r.name==="SyntaxError"?s():r}},Sc=()=>new DOMException("","DataCloneError"),er=s=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(n=>{const i=()=>{t.onmessage=null,e.close(),t.close(),n()};t.onmessage=()=>i();try{e.postMessage(s,[s])}catch{}finally{i()}})},kc=(s,e,t,n,i,r,o,a,c,l,h)=>(d,u)=>{const f=o(d)?d:r(d);if(i.has(u)){const p=t();return Promise.reject(p)}try{i.add(u)}catch{}return e(c,()=>c(f))?f.decodeAudioData(u).then(p=>(er(u).catch(()=>{}),e(a,()=>a(p))||h(p),s.add(p),p)):new Promise((p,m)=>{const g=async()=>{try{await er(u)}catch{}},y=w=>{m(w),g()};try{f.decodeAudioData(u,w=>{typeof w.copyFromChannel!="function"&&(l(w),Xs(w)),s.add(w),g().then(()=>p(w))},w=>{y(w===null?n():w)})}catch(w){y(w)}})},Ac=(s,e,t,n,i,r,o,a)=>(c,l)=>{const h=e.get(c);if(h===void 0)throw new Error("Missing the expected cycle count.");const d=r(c.context),u=a(d);if(h===l){if(e.delete(c),!u&&o(c)){const f=n(c),{outputs:p}=t(c);for(const m of p)if(kn(m)){const g=n(m[0]);s(f,g,m[1],m[2])}else{const g=i(m[0]);f.connect(g,m[1])}}}else e.set(c,h-l)},Cc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},Nc=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),d={...Cc,...l},u=n(h,d),f=r(h),p=f?t(d.maxDelayTime):null;super(c,!1,u,p),this._delayTime=e(this,f,u.delayTime),o(this,d.maxDelayTime)}get delayTime(){return this._delayTime}},Mc=(s,e,t,n,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let h=t(c);const d=Te(h,l);if(!d){const u={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,delayTime:h.delayTime.value,maxDelayTime:r};h=e(l,u)}return o.set(l,h),d?await s(l,c.delayTime,h.delayTime):await n(l,c.delayTime,h.delayTime),await i(c,l,h),h};return{render(c,l){const h=o.get(l);return h!==void 0?Promise.resolve(h):a(c,l)}}},Ic=s=>(e,t,n,i)=>s(e[i],r=>r[0]===t&&r[1]===n),Ec=s=>(e,t)=>{s(e).delete(t)},Oc=s=>"delayTime"in s,Dc=(s,e,t)=>function n(i,r){const o=Xn(r)?r:t(s,r);if(Oc(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>n([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},Vn=(s,e,t)=>{const n=e[t];if(n===void 0)throw s();return n},Pc=s=>(e,t=void 0,n=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Vn(s,e,t).disconnect():Jn(t)?n===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?Vn(s,e,n).disconnect(t,0):Vn(s,e,n).disconnect(t,0,i):n===void 0?e.forEach(r=>r.disconnect(t)):Vn(s,e,n).disconnect(t,0),$c={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Rc=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const d=r(l),u={...$c,...h},f=n(d,u),p=o(d),m=p?t():null;super(l,!1,f,m),this._attack=e(this,p,f.attack),this._knee=e(this,p,f.knee),this._nativeDynamicsCompressorNode=f,this._ratio=e(this,p,f.ratio),this._release=e(this,p,f.release),this._threshold=e(this,p,f.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const h=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=h,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const h=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=h,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Lc=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const d={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,d)}return r.set(c,l),h?(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)):(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Vc=()=>new DOMException("","EncodingError"),Fc=s=>e=>new Promise((t,n)=>{if(s===null){n(new SyntaxError);return}const i=s.document.head;if(i===null)n(new SyntaxError);else{const r=s.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=s.onerror,l=()=>{s.onerror=c,URL.revokeObjectURL(a)};s.onerror=(h,d,u,f,p)=>{if(d===a||d===s.location.href&&u===1&&f===1)return l(),n(p),!1;if(c!==null)return c(h,d,u,f,p)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),jc=s=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,n,i){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=s(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,n,i){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},zc=s=>(e,t,n)=>{Object.defineProperties(s,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return n()}finally{s!==null&&(delete s.currentFrame,delete s.currentTime)}},Bc=s=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw s()},Wc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Uc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={...Wc,...c},d=n(l,h),u=r(l),f=u?t():null;super(a,!1,d,f),this._gain=e(this,u,d.gain,Ae,Ie)}get gain(){return this._gain}},qc=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const d={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,d)}return r.set(c,l),h?await s(c,a.gain,l.gain):await n(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Gc=(s,e)=>t=>e(s,t),Hc=s=>e=>{const t=s(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Yc=s=>e=>{var t;return(t=s.get(e))!==null&&t!==void 0?t:0},Xc=s=>e=>{const t=s(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},Kc=s=>e=>s.get(e),ye=()=>new DOMException("","InvalidStateError"),Zc=s=>e=>{const t=s.get(e);if(t===void 0)throw ye();return t},Jc=(s,e)=>t=>{let n=s.get(t);if(n!==void 0)return n;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new e(1,1,44100),s.set(t,n),n},Qc=s=>e=>{const t=s.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},cs=()=>new DOMException("","InvalidAccessError"),el=s=>{s.getFrequencyResponse=(e=>(t,n,i)=>{if(t.length!==n.length||n.length!==i.length)throw cs();return e.call(s,t,n,i)})(s.getFrequencyResponse)},tl={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},nl=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h=i(l),d={...tl,...c},u=e(l,h?null:a.baseLatency,d),f=h?t(d.feedback,d.feedforward):null;super(a,!1,u,f),el(u),this._nativeIIRFilterNode=u,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},Vr=(s,e,t,n,i,r,o,a,c,l,h)=>{const d=l.length;let u=a;for(let f=0;f<d;f+=1){let p=t[0]*l[f];for(let m=1;m<i;m+=1){const g=u-m&c-1;p+=t[m]*r[g],p-=s[m]*o[g]}for(let m=i;m<n;m+=1)p+=t[m]*r[u-m&c-1];for(let m=i;m<e;m+=1)p-=s[m]*o[u-m&c-1];r[u]=l[f],o[u]=p,u=u+1&c-1,h[f]=p}return u},sl=(s,e,t,n)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=n instanceof Float64Array?n:new Float64Array(n),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let p=0;p<o;p+=1)r[p]/=i[0];for(let p=1;p<a;p+=1)i[p]/=i[0]}const l=32,h=new Float32Array(l),d=new Float32Array(l),u=e.createBuffer(s.numberOfChannels,s.length,s.sampleRate),f=s.numberOfChannels;for(let p=0;p<f;p+=1){const m=s.getChannelData(p),g=u.getChannelData(p);h.fill(0),d.fill(0),Vr(i,o,r,a,c,h,d,0,l,m,g)}return u},il=(s,e,t,n,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(h,d)=>{let u=null,f=e(h);const p=Te(f,d);if(d.createIIRFilter===void 0?u=s(d,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):p||(f=d.createIIRFilter(o,r)),a.set(d,u===null?f:u),u!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const g=new t(h.context.destination.channelCount,h.context.length,d.sampleRate);c=(async()=>{await n(h,g,g.destination);const y=await i(g);return sl(y,d,r,o)})()}const m=await c;return u.buffer=m,u.start(0),u}return await n(h,d,f),f};return{render(h,d){const u=a.get(d);return u!==void 0?Promise.resolve(u):l(h,d)}}},rl=(s,e,t,n,i,r)=>o=>(a,c)=>{const l=s.get(a);if(l===void 0){if(!o&&r(a)){const h=n(a),{outputs:d}=t(a);for(const u of d)if(kn(u)){const f=n(u[0]);e(h,f,u[1],u[2])}else{const f=i(u[0]);h.disconnect(f,u[1])}}s.set(a,c)}else s.set(a,l+c)},ol=(s,e)=>t=>{const n=s.get(t);return e(n)||e(t)},al=(s,e)=>t=>s.has(t)||e(t),cl=(s,e)=>t=>s.has(t)||e(t),ll=(s,e)=>t=>{const n=s.get(t);return e(n)||e(t)},hl=s=>e=>s!==null&&e instanceof s,dl=s=>e=>s!==null&&typeof s.AudioNode=="function"&&e instanceof s.AudioNode,ul=s=>e=>s!==null&&typeof s.AudioParam=="function"&&e instanceof s.AudioParam,pl=(s,e)=>t=>s(t)||e(t),fl=s=>e=>s!==null&&e instanceof s,ml=s=>s!==null&&s.isSecureContext,gl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},vl={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},yl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r);if(n(a))throw new TypeError;const c={...vl,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},xl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},bl=(s,e,t)=>class extends s{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},_l=(s,e,t,n,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,os.set(this,a),n(a)&&i.set(a,new Set),this._destination=new s(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},yn=s=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=s.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},wl=(s,e)=>(t,n,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const h=r.size===0;if(e(a))return o.call(t,a,c,l),s(r,[a,c,l],d=>d[0]===a&&d[1]===c&&d[2]===l,!0),h&&n(),a;o.call(t,a,c),s(r,[a,c],d=>d[0]===a&&d[1]===c,!0),h&&n()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const h=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const u of r)u[1]===a&&r.delete(u)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const u of r)u[0]===a&&(c===void 0||u[1]===c)&&(l===void 0||u[2]===l)&&r.delete(u)}const d=r.size===0;h&&d&&i()})(t.disconnect),t},oe=(s,e,t)=>{const n=e[t];n!==void 0&&n!==s[t]&&(s[t]=n)},ge=(s,e)=>{oe(s,e,"channelCount"),oe(s,e,"channelCountMode"),oe(s,e,"channelInterpretation")},tr=s=>typeof s.getFloatTimeDomainData=="function",Tl=s=>{s.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);s.getByteTimeDomainData(t);const n=Math.max(t.length,s.fftSize);for(let i=0;i<n;i+=1)e[i]=(t[i]-128)*.0078125;return e}},Sl=(s,e)=>(t,n)=>{const i=t.createAnalyser();if(ge(i,n),!(n.maxDecibels>n.minDecibels))throw e();return oe(i,n,"fftSize"),oe(i,n,"maxDecibels"),oe(i,n,"minDecibels"),oe(i,n,"smoothingTimeConstant"),s(tr,()=>tr(i))||Tl(i),i},kl=s=>s===null?null:s.hasOwnProperty("AudioBuffer")?s.AudioBuffer:null,he=(s,e,t)=>{const n=e[t];n!==void 0&&n!==s[t].value&&(s[t].value=n)},Al=s=>{s.start=(e=>{let t=!1;return(n=0,i=0,r)=>{if(t)throw ye();e.call(s,n,i,r),t=!0}})(s.start)},Js=s=>{s.start=(e=>(t=0,n=0,i)=>{if(typeof i=="number"&&i<0||n<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(s,t,n,i)})(s.start)},Qs=s=>{s.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(s,t)})(s.stop)},Cl=(s,e,t,n,i,r,o,a,c,l,h)=>(d,u)=>{const f=d.createBufferSource();return ge(f,u),he(f,u,"playbackRate"),oe(f,u,"buffer"),oe(f,u,"loop"),oe(f,u,"loopEnd"),oe(f,u,"loopStart"),e(t,()=>t(d))||Al(f),e(n,()=>n(d))||c(f),e(i,()=>i(d))||l(f,d),e(r,()=>r(d))||Js(f),e(o,()=>o(d))||h(f,d),e(a,()=>a(d))||Qs(f),s(d,f),f},Nl=s=>s===null?null:s.hasOwnProperty("AudioContext")?s.AudioContext:s.hasOwnProperty("webkitAudioContext")?s.webkitAudioContext:null,Ml=(s,e)=>(t,n,i)=>{const r=t.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const o=s(t,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Il=s=>s===null?null:s.hasOwnProperty("AudioWorkletNode")?s.AudioWorkletNode:null,El=s=>{const{port1:e}=new MessageChannel;try{e.postMessage(s)}finally{e.close()}},Ol=(s,e,t,n,i)=>(r,o,a,c,l,h)=>{if(a!==null)try{const d=new a(r,c,h),u=new Map;let f=null;if(Object.defineProperties(d,{channelCount:{get:()=>h.channelCount,set:()=>{throw s()}},channelCountMode:{get:()=>"explicit",set:()=>{throw s()}},onprocessorerror:{get:()=>f,set:p=>{typeof f=="function"&&d.removeEventListener("processorerror",f),f=typeof p=="function"?p:null,typeof f=="function"&&d.addEventListener("processorerror",f)}}}),d.addEventListener=(p=>(...m)=>{if(m[0]==="processorerror"){const g=typeof m[1]=="function"?m[1]:typeof m[1]=="object"&&m[1]!==null&&typeof m[1].handleEvent=="function"?m[1].handleEvent:null;if(g!==null){const y=u.get(m[1]);y!==void 0?m[1]=y:(m[1]=w=>{w.type==="error"?(Object.defineProperties(w,{type:{value:"processorerror"}}),g(w)):g(new ErrorEvent(m[0],{...w}))},u.set(g,m[1]))}}return p.call(d,"error",m[1],m[2]),p.call(d,...m)})(d.addEventListener),d.removeEventListener=(p=>(...m)=>{if(m[0]==="processorerror"){const g=u.get(m[1]);g!==void 0&&(u.delete(m[1]),m[1]=g)}return p.call(d,"error",m[1],m[2]),p.call(d,m[0],m[1],m[2])})(d.removeEventListener),h.numberOfOutputs!==0){const p=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return d.connect(p).connect(r.destination),i(d,()=>p.disconnect(),()=>p.connect(r.destination))}return d}catch(d){throw d.code===11?n():d}if(l===void 0)throw n();return El(h),e(r,o,l,h)},Fr=(s,e)=>s===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(s*e))))),Dl=s=>new Promise((e,t)=>{const{port1:n,port2:i}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),i.close(),e(r)},n.onmessageerror=({data:r})=>{n.close(),i.close(),t(r)},i.postMessage(s)}),Pl=async(s,e)=>{const t=await Dl(e);return new s(t)},$l=(s,e,t,n)=>{let i=Ps.get(s);i===void 0&&(i=new WeakMap,Ps.set(s,i));const r=Pl(t,n);return i.set(e,r),r},Rl=(s,e,t,n,i,r,o,a,c,l,h,d,u)=>(f,p,m,g)=>{if(g.numberOfInputs===0&&g.numberOfOutputs===0)throw c();const y=Array.isArray(g.outputChannelCount)?g.outputChannelCount:Array.from(g.outputChannelCount);if(y.some(I=>I<1))throw c();if(y.length!==g.numberOfOutputs)throw e();if(g.channelCountMode!=="explicit")throw c();const w=g.channelCount*g.numberOfInputs,T=y.reduce((I,V)=>I+V,0),S=m.parameterDescriptors===void 0?0:m.parameterDescriptors.length;if(w+S>6||T>6)throw c();const v=new MessageChannel,b=[],_=[];for(let I=0;I<g.numberOfInputs;I+=1)b.push(o(f,{channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation,gain:1})),_.push(i(f,{channelCount:g.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:g.channelCount}));const x=[];if(m.parameterDescriptors!==void 0)for(const{defaultValue:I,maxValue:V,minValue:me,name:ae}of m.parameterDescriptors){const X=r(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:g.parameterData[ae]!==void 0?g.parameterData[ae]:I===void 0?0:I});Object.defineProperties(X.offset,{defaultValue:{get:()=>I===void 0?0:I},maxValue:{get:()=>V===void 0?Ae:V},minValue:{get:()=>me===void 0?Ie:me}}),x.push(X)}const N=n(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,w+S)}),C=Fr(p,f.sampleRate),A=a(f,C,w+S,Math.max(1,T)),k=i(f,{channelCount:Math.max(1,T),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,T)}),O=[];for(let I=0;I<g.numberOfOutputs;I+=1)O.push(n(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:y[I]}));for(let I=0;I<g.numberOfInputs;I+=1){b[I].connect(_[I]);for(let V=0;V<g.channelCount;V+=1)_[I].connect(N,V,I*g.channelCount+V)}const E=new Rr(m.parameterDescriptors===void 0?[]:m.parameterDescriptors.map(({name:I},V)=>{const me=x[V];return me.connect(N,0,w+V),me.start(0),[I,me.offset]}));N.connect(A);let R=g.channelInterpretation,D=null;const P=g.numberOfOutputs===0?[A]:O,q={get bufferSize(){return C},get channelCount(){return g.channelCount},set channelCount(I){throw t()},get channelCountMode(){return g.channelCountMode},set channelCountMode(I){throw t()},get channelInterpretation(){return R},set channelInterpretation(I){for(const V of b)V.channelInterpretation=I;R=I},get context(){return A.context},get inputs(){return b},get numberOfInputs(){return g.numberOfInputs},get numberOfOutputs(){return g.numberOfOutputs},get onprocessorerror(){return D},set onprocessorerror(I){typeof D=="function"&&q.removeEventListener("processorerror",D),D=typeof I=="function"?I:null,typeof D=="function"&&q.addEventListener("processorerror",D)},get parameters(){return E},get port(){return v.port2},addEventListener(...I){return A.addEventListener(I[0],I[1],I[2])},connect:s.bind(null,P),disconnect:l.bind(null,P),dispatchEvent(...I){return A.dispatchEvent(I[0])},removeEventListener(...I){return A.removeEventListener(I[0],I[1],I[2])}},L=new Map;v.port1.addEventListener=(I=>(...V)=>{if(V[0]==="message"){const me=typeof V[1]=="function"?V[1]:typeof V[1]=="object"&&V[1]!==null&&typeof V[1].handleEvent=="function"?V[1].handleEvent:null;if(me!==null){const ae=L.get(V[1]);ae!==void 0?V[1]=ae:(V[1]=X=>{h(f.currentTime,f.sampleRate,()=>me(X))},L.set(me,V[1]))}}return I.call(v.port1,V[0],V[1],V[2])})(v.port1.addEventListener),v.port1.removeEventListener=(I=>(...V)=>{if(V[0]==="message"){const me=L.get(V[1]);me!==void 0&&(L.delete(V[1]),V[1]=me)}return I.call(v.port1,V[0],V[1],V[2])})(v.port1.removeEventListener);let j=null;Object.defineProperty(v.port1,"onmessage",{get:()=>j,set:I=>{typeof j=="function"&&v.port1.removeEventListener("message",j),j=typeof I=="function"?I:null,typeof j=="function"&&(v.port1.addEventListener("message",j),v.port1.start())}}),m.prototype.port=v.port1;let F=null;$l(f,q,m,g).then(I=>F=I);const De=es(g.numberOfInputs,g.channelCount),Pe=es(g.numberOfOutputs,y),G=m.parameterDescriptors===void 0?[]:m.parameterDescriptors.reduce((I,{name:V})=>({...I,[V]:new Float32Array(128)}),{});let ie=!0;const Se=()=>{g.numberOfOutputs>0&&A.disconnect(k);for(let I=0,V=0;I<g.numberOfOutputs;I+=1){const me=O[I];for(let ae=0;ae<y[I];ae+=1)k.disconnect(me,V+ae,ae);V+=y[I]}},$=new Map;A.onaudioprocess=({inputBuffer:I,outputBuffer:V})=>{if(F!==null){const me=d(q);for(let ae=0;ae<C;ae+=128){for(let X=0;X<g.numberOfInputs;X+=1)for(let le=0;le<g.channelCount;le+=1)Qn(I,De[X],le,le,ae);m.parameterDescriptors!==void 0&&m.parameterDescriptors.forEach(({name:X},le)=>{Qn(I,G,X,w+le,ae)});for(let X=0;X<g.numberOfInputs;X+=1)for(let le=0;le<y[X];le+=1)Pe[X][le].byteLength===0&&(Pe[X][le]=new Float32Array(128));try{const X=De.map((Ve,ht)=>{if(me[ht].size>0)return $.set(ht,C/128),Ve;const Ss=$.get(ht);return Ss===void 0?[]:(Ve.every(Eo=>Eo.every(Oo=>Oo===0))&&(Ss===1?$.delete(ht):$.set(ht,Ss-1)),Ve)});ie=h(f.currentTime+ae/f.sampleRate,f.sampleRate,()=>F.process(X,Pe,G));for(let Ve=0,ht=0;Ve<g.numberOfOutputs;Ve+=1){for(let hn=0;hn<y[Ve];hn+=1)Lr(V,Pe[Ve],hn,ht+hn,ae);ht+=y[Ve]}}catch(X){ie=!1,q.dispatchEvent(new ErrorEvent("processorerror",{colno:X.colno,filename:X.filename,lineno:X.lineno,message:X.message}))}if(!ie){for(let X=0;X<g.numberOfInputs;X+=1){b[X].disconnect(_[X]);for(let le=0;le<g.channelCount;le+=1)_[ae].disconnect(N,le,X*g.channelCount+le)}if(m.parameterDescriptors!==void 0){const X=m.parameterDescriptors.length;for(let le=0;le<X;le+=1){const Ve=x[le];Ve.disconnect(N,0,w+le),Ve.stop()}}N.disconnect(A),A.onaudioprocess=null,_t?Se():Rt();break}}}};let _t=!1;const wt=o(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),$t=()=>A.connect(wt).connect(f.destination),Rt=()=>{A.disconnect(wt),wt.disconnect()},Mo=()=>{if(ie){Rt(),g.numberOfOutputs>0&&A.connect(k);for(let I=0,V=0;I<g.numberOfOutputs;I+=1){const me=O[I];for(let ae=0;ae<y[I];ae+=1)k.connect(me,V+ae,ae);V+=y[I]}}_t=!0},Io=()=>{ie&&($t(),Se()),_t=!1};return $t(),u(q,Mo,Io)},jr=(s,e)=>{const t=s.createBiquadFilter();return ge(t,e),he(t,e,"Q"),he(t,e,"detune"),he(t,e,"frequency"),he(t,e,"gain"),oe(t,e,"type"),t},Ll=(s,e)=>(t,n)=>{const i=t.createChannelMerger(n.numberOfInputs);return s!==null&&s.name==="webkitAudioContext"&&e(t,i),ge(i,n),i},Vl=s=>{const e=s.numberOfOutputs;Object.defineProperty(s,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw ye()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw ye()}}),Object.defineProperty(s,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw ye()}})},An=(s,e)=>{const t=s.createChannelSplitter(e.numberOfOutputs);return ge(t,e),Vl(t),t},Fl=(s,e,t,n,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return ge(a,o),he(a,o,"offset"),e(n,()=>n(r))||Js(a),e(i,()=>i(r))||Qs(a),s(r,a),a},sn=(s,e)=>(s.connect=e.connect.bind(e),s.disconnect=e.disconnect.bind(e),s),jl=(s,e,t,n)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),h=a.getChannelData(0);h[0]=1,h[1]=1,c.buffer=a,c.loop=!0;const d={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(p){l.channelCount=p},get channelCountMode(){return l.channelCountMode},set channelCountMode(p){l.channelCountMode=p},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(p){l.channelInterpretation=p},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(p){c.onended=p},addEventListener(...p){return c.addEventListener(p[0],p[1],p[2])},dispatchEvent(...p){return c.dispatchEvent(p[0])},removeEventListener(...p){return c.removeEventListener(p[0],p[1],p[2])},start(p=0){c.start.call(c,p)},stop(p=0){c.stop.call(c,p)}},u=()=>c.connect(l),f=()=>c.disconnect(l);return s(i,c),n(sn(d,l),u,f)},zl=(s,e)=>(t,n)=>{const i=t.createConvolver();if(ge(i,n),n.disableNormalization===i.normalize&&(i.normalize=!n.disableNormalization),oe(i,n,"buffer"),n.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw s();return r.call(i,o)}),n.channelCountMode==="max"))throw s();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw s();return r.call(i,o)}),i},zr=(s,e)=>{const t=s.createDelay(e.maxDelayTime);return ge(t,e),he(t,e,"delayTime"),t},Bl=s=>(e,t)=>{const n=e.createDynamicsCompressor();if(ge(n,t),t.channelCount>2||t.channelCountMode==="max")throw s();return he(n,t,"attack"),he(n,t,"knee"),he(n,t,"ratio"),he(n,t,"release"),he(n,t,"threshold"),n},Oe=(s,e)=>{const t=s.createGain();return ge(t,e),he(t,e,"gain"),t},Wl=s=>(e,t,n)=>{if(e.createIIRFilter===void 0)return s(e,t,n);const i=e.createIIRFilter(n.feedforward,n.feedback);return ge(i,n),i};function Ul(s,e){const t=e[0]*e[0]+e[1]*e[1];return[(s[0]*e[0]+s[1]*e[1])/t,(s[1]*e[0]-s[0]*e[1])/t]}function ql(s,e){return[s[0]*e[0]-s[1]*e[1],s[0]*e[1]+s[1]*e[0]]}function nr(s,e){let t=[0,0];for(let n=s.length-1;n>=0;n-=1)t=ql(t,e),t[0]+=s[n];return t}const Gl=(s,e,t,n)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:h})=>{const d=Fr(r,i.sampleRate),u=l instanceof Float64Array?l:new Float64Array(l),f=h instanceof Float64Array?h:new Float64Array(h),p=u.length,m=f.length,g=Math.min(p,m);if(p===0||p>20)throw n();if(u[0]===0)throw e();if(m===0||m>20)throw n();if(f[0]===0)throw e();if(u[0]!==1){for(let x=0;x<m;x+=1)f[x]/=u[0];for(let x=1;x<p;x+=1)u[x]/=u[0]}const y=t(i,d,o,o);y.channelCount=o,y.channelCountMode=a,y.channelInterpretation=c;const w=32,T=[],S=[],v=[];for(let x=0;x<o;x+=1){T.push(0);const N=new Float32Array(w),C=new Float32Array(w);N.fill(0),C.fill(0),S.push(N),v.push(C)}y.onaudioprocess=x=>{const N=x.inputBuffer,C=x.outputBuffer,A=N.numberOfChannels;for(let k=0;k<A;k+=1){const O=N.getChannelData(k),E=C.getChannelData(k);T[k]=Vr(u,p,f,m,g,S[k],v[k],T[k],w,O,E)}};const b=i.sampleRate/2;return sn({get bufferSize(){return d},get channelCount(){return y.channelCount},set channelCount(x){y.channelCount=x},get channelCountMode(){return y.channelCountMode},set channelCountMode(x){y.channelCountMode=x},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(x){y.channelInterpretation=x},get context(){return y.context},get inputs(){return[y]},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},addEventListener(...x){return y.addEventListener(x[0],x[1],x[2])},dispatchEvent(...x){return y.dispatchEvent(x[0])},getFrequencyResponse(x,N,C){if(x.length!==N.length||N.length!==C.length)throw s();const A=x.length;for(let k=0;k<A;k+=1){const O=-Math.PI*(x[k]/b),E=[Math.cos(O),Math.sin(O)],R=nr(f,E),D=nr(u,E),P=Ul(R,D);N[k]=Math.sqrt(P[0]*P[0]+P[1]*P[1]),C[k]=Math.atan2(P[1],P[0])}},removeEventListener(...x){return y.removeEventListener(x[0],x[1],x[2])}},y)},Hl=(s,e)=>s.createMediaElementSource(e.mediaElement),Yl=(s,e)=>{const t=s.createMediaStreamDestination();return ge(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},Xl=(s,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const n=t.slice(0,1),i=s.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(i,"mediaStream",{value:e}),i},Kl=(s,e)=>(t,{mediaStreamTrack:n})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(n);const i=new MediaStream([n]),r=t.createMediaStreamSource(i);if(n.kind!=="audio")throw s();if(e(t))throw new TypeError;return r},Zl=s=>s===null?null:s.hasOwnProperty("OfflineAudioContext")?s.OfflineAudioContext:s.hasOwnProperty("webkitOfflineAudioContext")?s.webkitOfflineAudioContext:null,Jl=(s,e,t,n,i,r)=>(o,a)=>{const c=o.createOscillator();return ge(c,a),he(c,a,"detune"),he(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):oe(c,a,"type"),e(t,()=>t(o))||Js(c),e(n,()=>n(o))||r(c,o),e(i,()=>i(o))||Qs(c),s(o,c),c},Ql=s=>(e,t)=>{const n=e.createPanner();return n.orientationX===void 0?s(e,t):(ge(n,t),he(n,t,"orientationX"),he(n,t,"orientationY"),he(n,t,"orientationZ"),he(n,t,"positionX"),he(n,t,"positionY"),he(n,t,"positionZ"),oe(n,t,"coneInnerAngle"),oe(n,t,"coneOuterAngle"),oe(n,t,"coneOuterGain"),oe(n,t,"distanceModel"),oe(n,t,"maxDistance"),oe(n,t,"panningModel"),oe(n,t,"refDistance"),oe(n,t,"rolloffFactor"),n)},eh=(s,e,t,n,i,r,o,a,c,l)=>(h,{coneInnerAngle:d,coneOuterAngle:u,coneOuterGain:f,distanceModel:p,maxDistance:m,orientationX:g,orientationY:y,orientationZ:w,panningModel:T,positionX:S,positionY:v,positionZ:b,refDistance:_,rolloffFactor:x,...N})=>{const C=h.createPanner();if(N.channelCount>2||N.channelCountMode==="max")throw o();ge(C,N);const A={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},k=t(h,{...A,channelInterpretation:"speakers",numberOfInputs:6}),O=n(h,{...N,gain:1}),E=n(h,{...A,gain:1}),R=n(h,{...A,gain:0}),D=n(h,{...A,gain:0}),P=n(h,{...A,gain:0}),q=n(h,{...A,gain:0}),L=n(h,{...A,gain:0}),j=i(h,256,6,1),F=r(h,{...A,curve:new Float32Array([1,1]),oversample:"none"});let Z=[g,y,w],De=[S,v,b];const Pe=new Float32Array(1);j.onaudioprocess=({inputBuffer:$})=>{const _t=[c($,Pe,0),c($,Pe,1),c($,Pe,2)];_t.some(($t,Rt)=>$t!==Z[Rt])&&(C.setOrientation(..._t),Z=_t);const wt=[c($,Pe,3),c($,Pe,4),c($,Pe,5)];wt.some(($t,Rt)=>$t!==De[Rt])&&(C.setPosition(...wt),De=wt)},Object.defineProperty(R.gain,"defaultValue",{get:()=>0}),Object.defineProperty(D.gain,"defaultValue",{get:()=>0}),Object.defineProperty(P.gain,"defaultValue",{get:()=>0}),Object.defineProperty(q.gain,"defaultValue",{get:()=>0}),Object.defineProperty(L.gain,"defaultValue",{get:()=>0});const G={get bufferSize(){},get channelCount(){return C.channelCount},set channelCount($){if($>2)throw o();O.channelCount=$,C.channelCount=$},get channelCountMode(){return C.channelCountMode},set channelCountMode($){if($==="max")throw o();O.channelCountMode=$,C.channelCountMode=$},get channelInterpretation(){return C.channelInterpretation},set channelInterpretation($){O.channelInterpretation=$,C.channelInterpretation=$},get coneInnerAngle(){return C.coneInnerAngle},set coneInnerAngle($){C.coneInnerAngle=$},get coneOuterAngle(){return C.coneOuterAngle},set coneOuterAngle($){C.coneOuterAngle=$},get coneOuterGain(){return C.coneOuterGain},set coneOuterGain($){if($<0||$>1)throw e();C.coneOuterGain=$},get context(){return C.context},get distanceModel(){return C.distanceModel},set distanceModel($){C.distanceModel=$},get inputs(){return[O]},get maxDistance(){return C.maxDistance},set maxDistance($){if($<0)throw new RangeError;C.maxDistance=$},get numberOfInputs(){return C.numberOfInputs},get numberOfOutputs(){return C.numberOfOutputs},get orientationX(){return E.gain},get orientationY(){return R.gain},get orientationZ(){return D.gain},get panningModel(){return C.panningModel},set panningModel($){C.panningModel=$},get positionX(){return P.gain},get positionY(){return q.gain},get positionZ(){return L.gain},get refDistance(){return C.refDistance},set refDistance($){if($<0)throw new RangeError;C.refDistance=$},get rolloffFactor(){return C.rolloffFactor},set rolloffFactor($){if($<0)throw new RangeError;C.rolloffFactor=$},addEventListener(...$){return O.addEventListener($[0],$[1],$[2])},dispatchEvent(...$){return O.dispatchEvent($[0])},removeEventListener(...$){return O.removeEventListener($[0],$[1],$[2])}};d!==G.coneInnerAngle&&(G.coneInnerAngle=d),u!==G.coneOuterAngle&&(G.coneOuterAngle=u),f!==G.coneOuterGain&&(G.coneOuterGain=f),p!==G.distanceModel&&(G.distanceModel=p),m!==G.maxDistance&&(G.maxDistance=m),g!==G.orientationX.value&&(G.orientationX.value=g),y!==G.orientationY.value&&(G.orientationY.value=y),w!==G.orientationZ.value&&(G.orientationZ.value=w),T!==G.panningModel&&(G.panningModel=T),S!==G.positionX.value&&(G.positionX.value=S),v!==G.positionY.value&&(G.positionY.value=v),b!==G.positionZ.value&&(G.positionZ.value=b),_!==G.refDistance&&(G.refDistance=_),x!==G.rolloffFactor&&(G.rolloffFactor=x),(Z[0]!==1||Z[1]!==0||Z[2]!==0)&&C.setOrientation(...Z),(De[0]!==0||De[1]!==0||De[2]!==0)&&C.setPosition(...De);const ie=()=>{O.connect(C),s(O,F,0,0),F.connect(E).connect(k,0,0),F.connect(R).connect(k,0,1),F.connect(D).connect(k,0,2),F.connect(P).connect(k,0,3),F.connect(q).connect(k,0,4),F.connect(L).connect(k,0,5),k.connect(j).connect(h.destination)},Se=()=>{O.disconnect(C),a(O,F,0,0),F.disconnect(E),E.disconnect(k),F.disconnect(R),R.disconnect(k),F.disconnect(D),D.disconnect(k),F.disconnect(P),P.disconnect(k),F.disconnect(q),q.disconnect(k),F.disconnect(L),L.disconnect(k),k.disconnect(j),j.disconnect(h.destination)};return l(sn(G,C),ie,Se)},th=s=>(e,{disableNormalization:t,imag:n,real:i})=>{const r=n instanceof Float32Array?n:new Float32Array(n),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(n).length<2)throw s();return a},Cn=(s,e,t,n)=>s.createScriptProcessor(e,t,n),nh=(s,e)=>(t,n)=>{const i=n.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return s(t,n);const r=t.createStereoPanner();return ge(r,n),he(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},sh=(s,e,t,n,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},h={...l,oversample:"none"},d=(p,m,g,y)=>{const w=new Float32Array(16385),T=new Float32Array(16385);for(let N=0;N<16385;N+=1){const C=N/16384*c;w[N]=Math.cos(C),T[N]=Math.sin(C)}const S=t(p,{...l,gain:0}),v=n(p,{...h,curve:w}),b=n(p,{...h,curve:a}),_=t(p,{...l,gain:0}),x=n(p,{...h,curve:T});return{connectGraph(){m.connect(S),m.connect(b.inputs===void 0?b:b.inputs[0]),m.connect(_),b.connect(g),g.connect(v.inputs===void 0?v:v.inputs[0]),g.connect(x.inputs===void 0?x:x.inputs[0]),v.connect(S.gain),x.connect(_.gain),S.connect(y,0,0),_.connect(y,0,1)},disconnectGraph(){m.disconnect(S),m.disconnect(b.inputs===void 0?b:b.inputs[0]),m.disconnect(_),b.disconnect(g),g.disconnect(v.inputs===void 0?v:v.inputs[0]),g.disconnect(x.inputs===void 0?x:x.inputs[0]),v.disconnect(S.gain),x.disconnect(_.gain),S.disconnect(y,0,0),_.disconnect(y,0,1)}}},u=(p,m,g,y)=>{const w=new Float32Array(16385),T=new Float32Array(16385),S=new Float32Array(16385),v=new Float32Array(16385),b=Math.floor(16385/2);for(let P=0;P<16385;P+=1)if(P>b){const q=(P-b)/(16384-b)*c;w[P]=Math.cos(q),T[P]=Math.sin(q),S[P]=0,v[P]=1}else{const q=P/(16384-b)*c;w[P]=1,T[P]=0,S[P]=Math.cos(q),v[P]=Math.sin(q)}const _=e(p,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),x=t(p,{...l,gain:0}),N=n(p,{...h,curve:w}),C=t(p,{...l,gain:0}),A=n(p,{...h,curve:T}),k=n(p,{...h,curve:a}),O=t(p,{...l,gain:0}),E=n(p,{...h,curve:S}),R=t(p,{...l,gain:0}),D=n(p,{...h,curve:v});return{connectGraph(){m.connect(_),m.connect(k.inputs===void 0?k:k.inputs[0]),_.connect(x,0),_.connect(C,0),_.connect(O,1),_.connect(R,1),k.connect(g),g.connect(N.inputs===void 0?N:N.inputs[0]),g.connect(A.inputs===void 0?A:A.inputs[0]),g.connect(E.inputs===void 0?E:E.inputs[0]),g.connect(D.inputs===void 0?D:D.inputs[0]),N.connect(x.gain),A.connect(C.gain),E.connect(O.gain),D.connect(R.gain),x.connect(y,0,0),O.connect(y,0,0),C.connect(y,0,1),R.connect(y,0,1)},disconnectGraph(){m.disconnect(_),m.disconnect(k.inputs===void 0?k:k.inputs[0]),_.disconnect(x,0),_.disconnect(C,0),_.disconnect(O,1),_.disconnect(R,1),k.disconnect(g),g.disconnect(N.inputs===void 0?N:N.inputs[0]),g.disconnect(A.inputs===void 0?A:A.inputs[0]),g.disconnect(E.inputs===void 0?E:E.inputs[0]),g.disconnect(D.inputs===void 0?D:D.inputs[0]),N.disconnect(x.gain),A.disconnect(C.gain),E.disconnect(O.gain),D.disconnect(R.gain),x.disconnect(y,0,0),O.disconnect(y,0,0),C.disconnect(y,0,1),R.disconnect(y,0,1)}}},f=(p,m,g,y,w)=>{if(m===1)return d(p,g,y,w);if(m===2)return u(p,g,y,w);throw i()};return(p,{channelCount:m,channelCountMode:g,pan:y,...w})=>{if(g==="max")throw i();const T=s(p,{...w,channelCount:1,channelCountMode:g,numberOfInputs:2}),S=t(p,{...w,channelCount:m,channelCountMode:g,gain:1}),v=t(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:y});let{connectGraph:b,disconnectGraph:_}=f(p,m,S,v,T);Object.defineProperty(v.gain,"defaultValue",{get:()=>0}),Object.defineProperty(v.gain,"maxValue",{get:()=>1}),Object.defineProperty(v.gain,"minValue",{get:()=>-1});const x={get bufferSize(){},get channelCount(){return S.channelCount},set channelCount(k){S.channelCount!==k&&(N&&_(),{connectGraph:b,disconnectGraph:_}=f(p,k,S,v,T),N&&b()),S.channelCount=k},get channelCountMode(){return S.channelCountMode},set channelCountMode(k){if(k==="clamped-max"||k==="max")throw i();S.channelCountMode=k},get channelInterpretation(){return S.channelInterpretation},set channelInterpretation(k){S.channelInterpretation=k},get context(){return S.context},get inputs(){return[S]},get numberOfInputs(){return S.numberOfInputs},get numberOfOutputs(){return S.numberOfOutputs},get pan(){return v.gain},addEventListener(...k){return S.addEventListener(k[0],k[1],k[2])},dispatchEvent(...k){return S.dispatchEvent(k[0])},removeEventListener(...k){return S.removeEventListener(k[0],k[1],k[2])}};let N=!1;const C=()=>{b(),N=!0},A=()=>{_(),N=!1};return r(sn(x,T),C,A)}},ih=(s,e,t,n,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);ge(l,c);const h=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(h!==null&&h.length<2)throw e();oe(l,{curve:h},"curve"),oe(l,c,"oversample");let d=null,u=!1;return o(l,"curve",m=>()=>m.call(l),m=>g=>(m.call(l,g),u&&(n(g)&&d===null?d=s(a,l):!n(g)&&d!==null&&(d(),d=null)),g)),i(l,()=>{u=!0,n(l.curve)&&(d=s(a,l))},()=>{u=!1,d!==null&&(d(),d=null)})},rh=(s,e,t,n,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),h=r.createWaveShaper();ge(l,c),ge(h,c);const d=t(r,{...c,gain:1}),u=t(r,{...c,gain:-1}),f=t(r,{...c,gain:1}),p=t(r,{...c,gain:-1});let m=null,g=!1,y=null;const w={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(v){d.channelCount=v,u.channelCount=v,l.channelCount=v,f.channelCount=v,h.channelCount=v,p.channelCount=v},get channelCountMode(){return l.channelCountMode},set channelCountMode(v){d.channelCountMode=v,u.channelCountMode=v,l.channelCountMode=v,f.channelCountMode=v,h.channelCountMode=v,p.channelCountMode=v},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(v){d.channelInterpretation=v,u.channelInterpretation=v,l.channelInterpretation=v,f.channelInterpretation=v,h.channelInterpretation=v,p.channelInterpretation=v},get context(){return l.context},get curve(){return y},set curve(v){if(v!==null&&v.length<2)throw e();if(v===null)l.curve=v,h.curve=v;else{const b=v.length,_=new Float32Array(b+2-b%2),x=new Float32Array(b+2-b%2);_[0]=v[0],x[0]=-v[b-1];const N=Math.ceil((b+1)/2),C=(b+1)/2-1;for(let A=1;A<N;A+=1){const k=A/N*C,O=Math.floor(k),E=Math.ceil(k);_[A]=O===E?v[O]:(1-(k-O))*v[O]+(1-(E-k))*v[E],x[A]=O===E?-v[b-1-O]:-((1-(k-O))*v[b-1-O])-(1-(E-k))*v[b-1-E]}_[N]=b%2===1?v[N-1]:(v[N-2]+v[N-1])/2,l.curve=_,h.curve=x}y=v,g&&(n(y)&&m===null?m=s(r,d):m!==null&&(m(),m=null))},get inputs(){return[d]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(v){l.oversample=v,h.oversample=v},addEventListener(...v){return d.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return d.dispatchEvent(v[0])},removeEventListener(...v){return d.removeEventListener(v[0],v[1],v[2])}};o!==null&&(w.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==w.oversample&&(w.oversample=a);const T=()=>{d.connect(l).connect(f),d.connect(u).connect(h).connect(p).connect(f),g=!0,n(y)&&(m=s(r,d))},S=()=>{d.disconnect(l),l.disconnect(f),d.disconnect(u),u.disconnect(h),h.disconnect(p),p.disconnect(f),g=!1,m!==null&&(m(),m=null)};return i(sn(w,f),T,S)},Ne=()=>new DOMException("","NotSupportedError"),oh={numberOfChannels:1},ah=(s,e,t,n,i)=>class extends s{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:h,numberOfChannels:d,sampleRate:u}={...oh,...l},f=n(d,h,u);e(yn,()=>yn(f))||f.addEventListener("statechange",(()=>{let p=0;const m=g=>{this._state==="running"&&(p>0?(f.removeEventListener("statechange",m),g.stopImmediatePropagation(),this._waitForThePromiseToSettle(g)):p+=1)};return m})()),super(f,d),this._length=h,this._nativeOfflineAudioContext=f,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,Or(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},ch={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},lh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),d={...ch,...l},u=t(h,d),f=r(h),p=f?n():null,m=c.sampleRate/2;super(c,!1,u,p),this._detune=e(this,f,u.detune,153600,-153600),this._frequency=e(this,f,u.frequency,m,-m),this._nativeOscillatorNode=u,this._onended=null,this._oscillatorNodeRenderer=p,this._oscillatorNodeRenderer!==null&&d.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=d.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const h=this._nativeOscillatorNode.onended;this._onended=h!==null&&h===l?c:h}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){Ht(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),rt(this)&&Tn(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},hh=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(h,d)=>{let u=t(h);const f=Te(u,d);if(!f){const p={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,detune:u.detune.value,frequency:u.frequency.value,periodicWave:o===null?void 0:o,type:u.type};u=e(d,p),a!==null&&u.start(a),c!==null&&u.stop(c)}return r.set(d,u),f?(await s(d,h.detune,u.detune),await s(d,h.frequency,u.frequency)):(await n(d,h.detune,u.detune),await n(d,h.frequency,u.frequency)),await i(h,d,u),u};return{set periodicWave(h){o=h},set start(h){a=h},set stop(h){c=h},render(h,d){const u=r.get(d);return u!==void 0?Promise.resolve(u):l(h,d)}}},dh={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},uh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),d={...dh,...l},u=t(h,d),f=r(h),p=f?n():null;super(c,!1,u,p),this._nativePannerNode=u,this._orientationX=e(this,f,u.orientationX,Ae,Ie),this._orientationY=e(this,f,u.orientationY,Ae,Ie),this._orientationZ=e(this,f,u.orientationZ,Ae,Ie),this._positionX=e(this,f,u.positionX,Ae,Ie),this._positionY=e(this,f,u.positionY,Ae,Ie),this._positionZ=e(this,f,u.positionZ,Ae,Ie),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},ph=(s,e,t,n,i,r,o,a,c,l)=>()=>{const h=new WeakMap;let d=null;const u=async(f,p)=>{let m=null,g=r(f);const y={channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation},w={...y,coneInnerAngle:g.coneInnerAngle,coneOuterAngle:g.coneOuterAngle,coneOuterGain:g.coneOuterGain,distanceModel:g.distanceModel,maxDistance:g.maxDistance,panningModel:g.panningModel,refDistance:g.refDistance,rolloffFactor:g.rolloffFactor},T=Te(g,p);if("bufferSize"in g)m=n(p,{...y,gain:1});else if(!T){const S={...w,orientationX:g.orientationX.value,orientationY:g.orientationY.value,orientationZ:g.orientationZ.value,positionX:g.positionX.value,positionY:g.positionY.value,positionZ:g.positionZ.value};g=i(p,S)}if(h.set(p,m===null?g:m),m!==null){if(d===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const A=new o(6,f.context.length,p.sampleRate),k=e(A,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});k.connect(A.destination),d=(async()=>{const O=await Promise.all([f.orientationX,f.orientationY,f.orientationZ,f.positionX,f.positionY,f.positionZ].map(async(E,R)=>{const D=t(A,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:R===0?1:0});return await a(A,E,D.offset),D}));for(let E=0;E<6;E+=1)O[E].connect(k,0,E),O[E].start(0);return l(A)})()}const S=await d,v=n(p,{...y,gain:1});await c(f,p,v);const b=[];for(let A=0;A<S.numberOfChannels;A+=1)b.push(S.getChannelData(A));let _=[b[0][0],b[1][0],b[2][0]],x=[b[3][0],b[4][0],b[5][0]],N=n(p,{...y,gain:1}),C=i(p,{...w,orientationX:_[0],orientationY:_[1],orientationZ:_[2],positionX:x[0],positionY:x[1],positionZ:x[2]});v.connect(N).connect(C.inputs[0]),C.connect(m);for(let A=128;A<S.length;A+=128){const k=[b[0][A],b[1][A],b[2][A]],O=[b[3][A],b[4][A],b[5][A]];if(k.some((E,R)=>E!==_[R])||O.some((E,R)=>E!==x[R])){_=k,x=O;const E=A/p.sampleRate;N.gain.setValueAtTime(0,E),N=n(p,{...y,gain:0}),C=i(p,{...w,orientationX:_[0],orientationY:_[1],orientationZ:_[2],positionX:x[0],positionY:x[1],positionZ:x[2]}),N.gain.setValueAtTime(1,E),v.connect(N).connect(C.inputs[0]),C.connect(m)}}return m}return T?(await s(p,f.orientationX,g.orientationX),await s(p,f.orientationY,g.orientationY),await s(p,f.orientationZ,g.orientationZ),await s(p,f.positionX,g.positionX),await s(p,f.positionY,g.positionY),await s(p,f.positionZ,g.positionZ)):(await a(p,f.orientationX,g.orientationX),await a(p,f.orientationY,g.orientationY),await a(p,f.orientationZ,g.orientationZ),await a(p,f.positionX,g.positionX),await a(p,f.positionY,g.positionY),await a(p,f.positionZ,g.positionZ)),nn(g)?await c(f,p,g.inputs[0]):await c(f,p,g),g};return{render(f,p){const m=h.get(p);return m!==void 0?Promise.resolve(m):u(f,p)}}},fh={disableNormalization:!1},mh=(s,e,t,n)=>class Br{constructor(r,o){const a=e(r),c=n({...fh,...o}),l=s(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Br.prototype||t.has(r)}},gh=(s,e)=>(t,n,i)=>(s(n).replay(i),e(n,t,i)),vh=(s,e,t)=>async(n,i,r)=>{const o=s(n);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,h])=>{const u=await e(l).render(l,i),f=n.context.destination;!t(l)&&(n!==f||!t(n))&&u.connect(r,h,c)})).reduce((a,c)=>[...a,...c],[]))},yh=(s,e,t)=>async(n,i,r)=>{const o=e(n);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const h=await s(a).render(a,i);t(a)||h.connect(r,c)}))},xh=(s,e,t,n)=>i=>s(yn,()=>yn(i))?Promise.resolve(s(n,n)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),bh=s=>(e,t)=>{s.set(e,t)},_h=s=>(e,t)=>s.set(e,t),wh=(s,e,t,n,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(h=>t(h).render(h,l)))).then(()=>i(l)).then(h=>(typeof h.copyFromChannel!="function"?(o(h),Xs(h)):e(r,()=>r(h))||a(h),s.add(h),h)),Th={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},Sh=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={...Th,...c},d=t(l,h),u=r(l),f=u?n():null;super(a,!1,d,f),this._pan=e(this,u,d.pan)}get pan(){return this._pan}},kh=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const d={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,d)}return r.set(c,l),h?await s(c,a.pan,l.pan):await n(c,a.pan,l.pan),nn(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Ah=s=>()=>{if(s===null)return!1;try{new s({length:1,sampleRate:44100})}catch{return!1}return!0},Ch=(s,e)=>async()=>{if(s===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await n.audioWorklet.addModule(i);const a=new s(n,"a",{numberOfOutputs:0}),c=n.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},Nh=(s,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),n=s(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{n.disconnect(),i(t.currentTime!==0)},t.startRendering()})},Mh=()=>new DOMException("","UnknownError"),Ih={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},Eh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),d={...Ih,...l},u=t(h,d),p=r(h)?n():null;super(c,!0,u,p),this._isCurveNullified=!1,this._nativeWaveShaperNode=u,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},Oh=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=s(o,l)}return n.set(o,a),nn(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Dh=()=>typeof window>"u"?null:window,Ph=(s,e)=>t=>{t.copyFromChannel=(n,i,r=0)=>{const o=s(r),a=s(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=n.length;for(let d=o<0?-o:0;d+o<c&&d<h;d+=1)n[d]=l[d+o]},t.copyToChannel=(n,i,r=0)=>{const o=s(r),a=s(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=n.length;for(let d=o<0?-o:0;d+o<c&&d<h;d+=1)l[d+o]=n[d]}},$h=s=>e=>{e.copyFromChannel=(t=>(n,i,r=0)=>{const o=s(r),a=s(i);if(o<e.length)return t.call(e,n,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(n,i,r=0)=>{const o=s(r),a=s(i);if(o<e.length)return t.call(e,n,a,o)})(e.copyToChannel)},Rh=s=>(e,t)=>{const n=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=n),s(e,"buffer",i=>()=>{const r=i.call(e);return r===n?null:r},i=>r=>i.call(e,r===null?n:r))},Lh=(s,e)=>(t,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw s()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw s()}});const i=t.createBufferSource();e(n,()=>{const a=n.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(n,0,c)},()=>i.disconnect(n))},Wr=(s,e,t)=>s.copyFromChannel===void 0?s.getChannelData(t)[0]:(s.copyFromChannel(e,t),e[0]),Ur=s=>{if(s===null)return!1;const e=s.length;return e%2!==0?s[Math.floor(e/2)]!==0:s[e/2-1]+s[e/2]!==0},Nn=(s,e,t,n)=>{let i=s;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(s,e,{get:t(r),set:n(o)})},Vh=s=>({...s,outputChannelCount:s.outputChannelCount!==void 0?s.outputChannelCount:s.numberOfInputs===1&&s.numberOfOutputs===1?[s.channelCount]:Array.from({length:s.numberOfOutputs},()=>1)}),Fh=s=>({...s,channelCount:s.numberOfOutputs}),jh=s=>{const{imag:e,real:t}=s;return e===void 0?t===void 0?{...s,imag:[0,0],real:[0,0]}:{...s,imag:Array.from(t,()=>0),real:t}:t===void 0?{...s,imag:e,real:Array.from(e,()=>0)}:{...s,imag:e,real:t}},qr=(s,e,t)=>{try{s.setValueAtTime(e,t)}catch(n){if(n.code!==9)throw n;qr(s,e,t+1e-7)}},zh=s=>{const e=s.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},Bh=s=>{const e=s.createBufferSource(),t=s.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Wh=s=>{const e=s.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},ei=s=>{const e=s.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},Gr=s=>{const e=s.createBuffer(1,1,44100),t=s.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},ti=s=>{const e=s.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},Uh=s=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(s)}finally{e.close(),t.close()}},qh=s=>{s.start=(e=>(t=0,n=0,i)=>{const r=s.buffer,o=r===null?n:Math.min(r.duration,n);r!==null&&o>r.duration-.5/s.context.sampleRate?e.call(s,t,0,0):e.call(s,t,o,i)})(s.start)},Hr=(s,e)=>{const t=e.createGain();s.connect(t);const n=(i=>()=>{i.call(s,t),s.removeEventListener("ended",n)})(s.disconnect);s.addEventListener("ended",n),sn(s,t),s.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(s,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(s,o),r=!0}})(s.stop)},rn=(s,e)=>t=>{const n={value:s};return Object.defineProperties(t,{currentTarget:n,target:n}),typeof e=="function"?e.call(s,t):e.handleEvent.call(s,t)},Gh=ua(Ot),Hh=ya(Ot),Yh=Ic(as),Yr=new WeakMap,Xh=Yc(Yr),Ye=oc(new Map,new WeakMap),Qe=Dh(),Xr=Sl(Ye,et),ni=Hc(Ce),_e=vh(Ce,ni,Nt),Kh=Ta(Xr,se,_e),ne=Zc(os),at=Zl(Qe),ee=fl(at),Kr=new WeakMap,Zr=jc(rn),Mn=Nl(Qe),si=hl(Mn),ii=dl(Qe),Jr=ul(Qe),xn=Il(Qe),de=Ya(pa(kr),va(Gh,Hh,Kn,Yh,Zn,Ce,Xh,wn,se,Ot,rt,Nt,Bn),Ye,rl(Os,Zn,Ce,se,vn,rt),et,cs,Ne,Ac(Kn,Os,Ce,se,vn,ne,rt,ee),Dc(Kr,Ce,He),Zr,ne,si,ii,Jr,ee,xn),Zh=wa(de,Kh,et,Xr,ne,ee),ri=new WeakSet,sr=kl(Qe),Qr=xc(new Uint32Array(1)),oi=Ph(Qr,et),ai=$h(Qr),eo=ka(ri,Ye,Ne,sr,at,Ah(sr),oi,ai),ls=xa(Oe),to=yh(ni,Sn,Nt),tt=pc(to),on=Cl(ls,Ye,zh,Bh,Wh,ei,Gr,ti,qh,Rh(Nn),Hr),nt=gh(Xc(Sn),to),Jh=Na(tt,on,se,nt,_e),Xe=Xa(fa(Ar),Kr,Ys,Ka,oa,aa,ca,la,ha,Ms,wr,Mn,qr),Qh=Ca(de,Jh,Xe,ye,on,ne,ee,rn),ed=La(de,Va,et,ye,Ml(Oe,Nn),ne,ee,_e),td=rc(tt,jr,se,nt,_e),Dt=_h(Yr),nd=ic(de,Xe,td,cs,jr,ne,ee,Dt),yt=wl(Ot,ii),sd=Lh(ye,yt),xt=Ll(Mn,sd),id=lc(xt,se,_e),rd=cc(de,id,xt,ne,ee),od=uc(An,se,_e),ad=dc(de,od,An,ne,ee,Fh),cd=jl(ls,on,Oe,yt),an=Fl(ls,Ye,cd,ei,ti),ld=yc(tt,an,se,nt,_e),hd=vc(de,Xe,ld,an,ne,ee,rn),no=zl(Ne,Nn),dd=wc(no,se,_e),ud=_c(de,dd,no,ne,ee,Dt),pd=Mc(tt,zr,se,nt,_e),fd=Nc(de,Xe,pd,zr,ne,ee,Dt),so=Bl(Ne),md=Lc(tt,so,se,nt,_e),gd=Rc(de,Xe,md,so,Ne,ne,ee,Dt),vd=qc(tt,Oe,se,nt,_e),yd=Uc(de,Xe,vd,Oe,ne,ee),xd=Gl(cs,ye,Cn,Ne),hs=xh(Ye,Oe,Cn,Nh(Oe,at)),bd=il(on,se,at,_e,hs),_d=Wl(xd),wd=nl(de,_d,bd,ne,ee,Dt),Td=Fa(Xe,xt,an,Cn,Ne,Wr,ee,Nn),io=new WeakMap,Sd=_l(ed,Td,Zr,ee,io,rn),ro=Jl(ls,Ye,ei,Gr,ti,Hr),kd=hh(tt,ro,se,nt,_e),Ad=lh(de,Xe,ro,kd,ne,ee,rn),oo=mc(on),Cd=rh(oo,ye,Oe,Ur,yt),ds=ih(oo,ye,Cd,Ur,yt,Mn,Nn),Nd=eh(Kn,ye,xt,Oe,Cn,ds,Ne,Zn,Wr,yt),ao=Ql(Nd),Md=ph(tt,xt,an,Oe,ao,se,at,nt,_e,hs),Id=uh(de,Xe,ao,Md,ne,ee,Dt),Ed=th(et),Od=mh(Ed,ne,new WeakSet,jh),Dd=sh(xt,An,Oe,ds,Ne,yt),co=nh(Dd,Ne),Pd=kh(tt,co,se,nt,_e),$d=Sh(de,Xe,co,Pd,ne,ee),Rd=Oh(ds,se,_e),Ld=Eh(de,ye,ds,Rd,ne,ee,Dt),lo=ml(Qe),ci=zc(Qe),ho=new WeakMap,Vd=Jc(ho,at),Fd=lo?ga(Ye,Ne,Fc(Qe),ci,Bc(da),ne,Vd,ee,xn,new WeakMap,new WeakMap,Ch(xn,at),Qe):void 0,jd=pl(si,ee),zd=kc(ri,Ye,Sc,Vc,new WeakSet,ne,jd,Yn,yn,oi,ai),uo=nc(Fd,Zh,eo,Qh,nd,rd,ad,hd,ud,zd,fd,gd,yd,wd,Sd,Ad,Id,Od,$d,Ld),Bd=gl(de,Hl,ne,ee),Wd=yl(de,Yl,ne,ee),Ud=xl(de,Xl,ne,ee),qd=Kl(ye,ee),Gd=bl(de,qd,ne),Hd=Ra(uo,ye,Ne,Mh,Bd,Wd,Ud,Gd,Mn),li=Qc(io),Yd=ba(li),po=fc(et),Xd=Ec(li),fo=Pc(et),mo=new WeakMap,Kd=Gc(mo,He),Zd=Rl(po,et,ye,xt,An,an,Oe,Cn,Ne,fo,ci,Kd,yt),Jd=Ol(ye,Zd,Oe,Ne,yt),Qd=tc(tt,po,on,xt,An,an,Oe,Xd,fo,ci,se,xn,at,nt,_e,hs),eu=Kc(ho),tu=bh(mo),ir=lo?Ja(Yd,de,Xe,Qd,Jd,Ce,eu,ne,ee,xn,Vh,tu,Uh,rn):void 0,nu=Tc(Ne,at),su=wh(ri,Ye,ni,li,hs,Yn,oi,ai),iu=ah(uo,Ye,ye,nu,su),ru=ol(os,si),ou=al(Hs,ii),au=cl(Ys,Jr),cu=ll(os,ee);function ze(s){return s===void 0}function H(s){return s!==void 0}function lu(s){return typeof s=="function"}function Mt(s){return typeof s=="number"}function At(s){return Object.prototype.toString.call(s)==="[object Object]"&&s.constructor===Object}function hu(s){return typeof s=="boolean"}function Ge(s){return Array.isArray(s)}function ot(s){return typeof s=="string"}function Fn(s){return ot(s)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(s)}function W(s,e){if(!s)throw new Error(e)}function gt(s,e,t=1/0){if(!(e<=s&&s<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${s}`)}function go(s){!s.isOffline&&s.state!=="running"&&hi('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let vo=!1,rr=!1;function or(s){vo=s}function du(s){ze(s)&&vo&&!rr&&(rr=!0,hi("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let yo=console;function uu(...s){yo.log(...s)}function hi(...s){yo.warn(...s)}function pu(s){return new Hd(s)}function fu(s,e,t){return new iu(s,e,t)}const $e=typeof self=="object"?self:null,mu=$e&&($e.hasOwnProperty("AudioContext")||$e.hasOwnProperty("webkitAudioContext"));function gu(s,e,t){return W(H(ir),"AudioWorkletNode only works in a secure context (https or localhost)"),new(s instanceof $e?.BaseAudioContext?$e?.AudioWorkletNode:ir)(s,e,t)}function Ke(s,e,t,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function fe(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):i(h.value).then(a,c)}l((n=n.apply(s,e||[])).next())})}class vu{constructor(e,t,n,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=n,this._createClock()}_createWorker(){const e=new Blob([`
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
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),n=new Worker(t);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function It(s){return au(s)}function mt(s){return ou(s)}function Wn(s){return cu(s)}function Vt(s){return ru(s)}function yu(s){return s instanceof eo}function xu(s,e){return s==="value"||It(e)||mt(e)||yu(e)}function Bt(s,...e){if(!e.length)return s;const t=e.shift();if(At(s)&&At(t))for(const n in t)xu(n,t[n])?s[n]=t[n]:At(t[n])?(s[n]||Object.assign(s,{[n]:{}}),Bt(s[n],t[n])):Object.assign(s,{[n]:t[n]});return Bt(s,...e)}function bu(s,e){return s.length===e.length&&s.every((t,n)=>e[n]===t)}function B(s,e,t=[],n){const i={},r=Array.from(e);if(At(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(a=>Reflect.has(s,a))||(Bt(i,{[n]:r[0]}),t.splice(t.indexOf(n),1),r.shift())),r.length===1&&At(r[0]))Bt(i,r[0]);else for(let o=0;o<t.length;o++)H(r[o])&&(i[t[o]]=r[o]);return Bt(s,i)}function _u(s){return s.constructor.getDefaults()}function Wt(s,e){return ze(s)?e:s}function ar(s,e){return e.forEach(t=>{Reflect.has(s,t)&&delete s[t]}),s}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class ct{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||$e&&this.toString()===$e.TONE_DEBUG_CLASS)&&uu(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}ct.version=_r;const di=1e-6;function Yt(s,e){return s>e+di}function Ls(s,e){return Yt(s,e)||Ue(s,e)}function ts(s,e){return s+di<e}function Ue(s,e){return Math.abs(s-e)<di}function wu(s,e,t){return Math.max(Math.min(s,t),e)}class Be extends ct{constructor(){super(),this.name="Timeline",this._timeline=[];const e=B(Be.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(W(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];W(Ls(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const n=this._search(e,t);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const n=this._search(e,t);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const n=this._search(e);return n-1>=0?this._timeline[n-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(Ue(this._timeline[t].time,e)){for(let n=t;n>=0&&Ue(this._timeline[n].time,e);n--)t=n;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&Ls(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let n=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;n<r;){let o=Math.floor(n+(r-n)/2);const a=this._timeline[o],c=this._timeline[o+1];if(Ue(a[t],e)){for(let l=o;l<this._timeline.length;l++){const h=this._timeline[l];if(Ue(h[t],e))o=l;else break}return o}else{if(ts(a[t],e)&&Yt(c[t],e))return o;Yt(a[t],e)?r=o:n=o+1}}return-1}_iterate(e,t=0,n=this._timeline.length-1){this._timeline.slice(t,n+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const n=this._search(e);return n!==-1&&this._iterate(t,0,n),this}forEachAfter(e,t){const n=this._search(e);return this._iterate(t,n+1),this}forEachBetween(e,t,n){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(n,i,r)):i===-1&&this._iterate(n,0,r),this}forEachFrom(e,t){let n=this._search(e);for(;n>=0&&this._timeline[n].time>=e;)n--;return this._iterate(t,n+1),this}forEachAtTime(e,t){const n=this._search(e);if(n!==-1&&Ue(this._timeline[n].time,e)){let i=n;for(let r=n;r>=0&&Ue(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const xo=[];function us(s){xo.push(s)}function Tu(s){xo.forEach(e=>e(s))}const bo=[];function ps(s){bo.push(s)}function Su(s){bo.forEach(e=>e(s))}class In extends ct{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{ze(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const n=(...i)=>{t(...i),this.off(e,n)};return this.on(e,n),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(ze(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(ze(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const n=this._events[e].slice(0);for(let i=0,r=n.length;i<r;i++)n[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const n=Object.getOwnPropertyDescriptor(In.prototype,t);Object.defineProperty(e.prototype,t,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class _o extends In{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class En extends _o{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new Be,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const n=B(En.getDefaults(),arguments,["context"]);n.context?(this._context=n.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=pu({latencyHint:n.latencyHint}),this._latencyHint=n.latencyHint),this._ticker=new vu(this.emit.bind(this,"tick"),n.clockSource,n.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=n.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(Tu(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,n){return this._context.createBuffer(e,t,n)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,n){return this._context.createPeriodicWave(e,t,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return W(Vt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return W(Vt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return W(Vt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){W(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){W(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){W(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){W(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return gu(this.rawContext,e,t)}addAudioWorkletModule(e){return fe(this,void 0,void 0,function*(){W(H(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return fe(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return Vt(this._context)?this._context.resume():Promise.resolve()}close(){return fe(this,void 0,void 0,function*(){Vt(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&Su(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),n=t.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:n+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const n=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:n,time:r+t})};return i(),n}}class ku extends _o{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,n){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return fe(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function ce(s,e){Ge(e)?e.forEach(t=>ce(s,t)):Object.defineProperty(s,e,{enumerable:!0,writable:!1})}function wo(s,e){Ge(e)?e.forEach(t=>wo(s,t)):Object.defineProperty(s,e,{writable:!0})}const Q=()=>{};class re extends ct{constructor(){super(),this.name="ToneAudioBuffer",this.onload=Q;const e=B(re.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,ot(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:Q,onload:Q,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:Fe().sampleRate}set(e){return e instanceof re?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return fe(this,void 0,void 0,function*(){const t=re.load(e).then(n=>{this.set(n),this.onload(this)});re.downloads.push(t);try{yield t}finally{const n=re.downloads.indexOf(t);re.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=Ge(e)&&e[0].length>0,n=t?e.length:1,i=t?e[0].length:e.length,r=Fe(),o=r.createBuffer(n,i,r.sampleRate),a=!t&&n===1?[e]:e;for(let c=0;c<n;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(Mt(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const n=this.numberOfChannels;for(let i=0;i<n;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/n),this.fromArray(t)}return this}toArray(e){if(Mt(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let n=0;n<this.numberOfChannels;n++)t[n]=this.getChannelData(n);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){W(this.loaded,"Buffer is not loaded");const n=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);W(n<i,"The start time must be less than the end time");const r=i-n,o=Fe().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(n,i),a);return new re(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new re().fromArray(e)}static fromUrl(e){return fe(this,void 0,void 0,function*(){return yield new re().load(e)})}static load(e){return fe(this,void 0,void 0,function*(){const t=re.baseUrl===""||re.baseUrl.endsWith("/")?re.baseUrl:re.baseUrl+"/",n=yield fetch(t+e);if(!n.ok)throw new Error(`could not load url: ${e}`);const i=yield n.arrayBuffer();return yield Fe().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),n=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return fe(this,void 0,void 0,function*(){for(yield Promise.resolve();re.downloads.length;)yield re.downloads[0]})}}re.baseUrl="";re.downloads=[];class ui extends En{constructor(){super({clockSource:"offline",context:Wn(arguments[0])?arguments[0]:fu(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Wn(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Wn(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return fe(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const n=Math.floor(this.sampleRate/128);e&&t%n===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return fe(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new re(t)})}close(){return Promise.resolve()}}const To=new ku;let kt=To;function Fe(){return kt===To&&mu&&Au(new En),kt}function Au(s,e=!1){e&&kt.dispose(),Vt(s)?kt=new En(s):Wn(s)?kt=new ui(s):kt=s}function Cu(){return kt.resume()}if($e&&!$e.TONE_SILENCE_LOGGING){const e=` * Tone.js v${_r} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function Nu(s){return Math.pow(10,s/20)}function Mu(s){return 20*(Math.log(s)/Math.LN10)}function So(s){return Math.pow(2,s/12)}let fs=440;function Iu(){return fs}function Eu(s){fs=s}function Vs(s){return Math.round(ko(s))}function ko(s){return 69+12*Math.log2(s/fs)}function Ou(s){return fs*Math.pow(2,(s-69)/12)}class pi extends ct{constructor(e,t,n){super(),this.defaultUnits="s",this._val=t,this._units=n,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const n=parseInt(e,10),i=t==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/n)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,n)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(i+=this._beatsToUnits(parseFloat(n)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof pi&&this.fromType(this._val),ze(this._val))return this._noArg();if(ot(this._val)&&ze(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(At(this._val)){let e=0;for(const t in this._val)if(H(this._val[t])){const n=this._val[t],i=new this.constructor(this.context,t).valueOf()*n;e+=i}return e}if(H(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return ot(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class qe extends pi{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new qe(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const n=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/n)*n-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let n=t[0],i=new qe(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new qe(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(n=r,i=o)}),n}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const n=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[n,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Vs(this.toFrequency())}_now(){return this.context.now()}}class je extends qe{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Iu()}static set A4(e){Eu(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:je.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=Du[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:je.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,n){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(i*=this._beatsToUnits(parseFloat(n)/4)),i}}})}transpose(e){return new je(this.context,this.valueOf()*So(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Vs(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/je.A4);let n=Math.round(12*t)+57;const i=Math.floor(n/12);return i<0&&(n+=-12*i),Pu[n%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return Ou(e)}static ftom(e){return Vs(e)}}const Du={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},Pu=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class pn extends qe{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Ee extends ct{constructor(){super();const e=B(Ee.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:Fe()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return du(e),new qe(this.context,e).toSeconds()}toFrequency(e){return new je(this.context,e).toFrequency()}toTicks(e){return new pn(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(n=>{ze(e[n])&&delete t[n]}),t}get(){const e=_u(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const n=this[t];H(n)&&H(n.value)&&H(n.setValueAtTime)?e[t]=n.value:n instanceof Ee?e[t]=n._getPartialProperties(e[t]):Ge(n)||Mt(n)||ot(n)||hu(n)?e[t]=n:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&H(this[t])&&(this[t]&&H(this[t].value)&&H(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Ee?this[t].set(e[t]):this[t]=e[t])}),this}}class fi extends Be{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,n){return gt(t,0),this.add(Object.assign({},n,{state:e,time:t})),this}getLastState(e,t){const n=this._search(t);for(let i=n;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const n=this._search(t);if(n!==-1)for(let i=n;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class J extends Ee{constructor(){const e=B(J.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,W(H(e.param)&&(It(e.param)||e.param instanceof J),"param must be an AudioParam");!It(e.param);)e.param=e.param._param;this._swappable=H(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new Be(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,H(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Ee.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return H(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return H(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return H(this.maxValue)&&H(this.minValue)&&gt(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?Nu(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?Mu(e):e}setValueAtTime(e,t){const n=this.toSeconds(t),i=this._fromType(e);return W(isFinite(i)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,n),this._events.add({time:n,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,n),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),n=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(n===null)r=i.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,n.time,n.value,t):r=this._exponentialInterpolate(i.time,o,n.time,n.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const n=this._fromType(e),i=this.toSeconds(t);return W(isFinite(n)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(n),this._events.add({time:i,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(n,i),this}exponentialRampToValueAtTime(e,t){let n=this._fromType(e);n=Ue(n,0)?this._minOutput:n,this._assertRange(n);const i=this.toSeconds(t);return W(isFinite(n)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(n,i),this}exponentialRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(e,n+this.toSeconds(t)),this}linearRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(e,n+this.toSeconds(t)),this}targetRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(e,n,t),this}exponentialApproachValueAtTime(e,t,n){t=this.toSeconds(t),n=this.toSeconds(n);const i=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+n*.9),this.linearRampToValueAtTime(e,t+n),this}setTargetAtTime(e,t,n){const i=this._fromType(e);W(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),W(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,n),this._param.setTargetAtTime(i,r,n),this}setValueCurveAtTime(e,t,n,i=1){n=this.toSeconds(n),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=n/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return W(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),n=this._fromType(this.getValueAtTime(t));W(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+n);const i=this._events.get(t),r=this._events.getAfter(t);return i&&Ue(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),t)),this._events.add({time:t,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,t),this}rampTo(e,t=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,n):this.linearRampTo(e,t,n),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const n=this._events.get(t);if(n&&n.type==="setTargetAtTime"){const i=this._events.getAfter(n.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){W(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,n,i,r){return n+(t-n)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,n,i,r){return t+(i-t)*((r-e)/(n-e))}_exponentialInterpolate(e,t,n,i,r){return t*Math.pow(i/t,(r-e)/(n-e))}}class U extends Ee{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return H(this.input)?It(this.input)||this.input instanceof J?1:this.input.numberOfInputs:0}get numberOfOutputs(){return H(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return H(e)&&(e instanceof U||mt(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(n=>{n.channelCount=e.channelCount,n.channelCountMode=e.channelCountMode,n.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();W(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,n=0){return cn(this,e,t,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return hi("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,n=0){return $u(this,e,t,n),this}chain(...e){return Fs(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),H(this.input)&&(this.input instanceof U?this.input.dispose():mt(this.input)&&this.input.disconnect()),H(this.output)&&(this.output instanceof U?this.output.dispose():mt(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Fs(...s){const e=s.shift();s.reduce((t,n)=>(t instanceof U?t.connect(n):mt(t)&&cn(t,n),n),e)}function cn(s,e,t=0,n=0){for(W(H(s),"Cannot connect from undefined node"),W(H(e),"Cannot connect to undefined node"),(e instanceof U||mt(e))&&W(e.numberOfInputs>0,"Cannot connect to node with no inputs"),W(s.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof U||e instanceof J;)H(e.input)&&(e=e.input);for(;s instanceof U;)H(s.output)&&(s=s.output);It(e)?s.connect(e,t):s.connect(e,t,n)}function $u(s,e,t=0,n=0){if(H(e))for(;e instanceof U;)e=e.input;for(;!mt(s);)H(s.output)&&(s=s.output);It(e)?s.disconnect(e,t):mt(e)?s.disconnect(e,t,n):s.disconnect()}class we extends U{constructor(){const e=B(we.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new J({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),ce(this,"gain")}static getDefaults(){return Object.assign(U.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class Xt extends U{constructor(e){super(e),this.onended=Q,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new we({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const n=this.toSeconds(t);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(U.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:Q})}_startGain(e,t=1){W(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=e+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+n):this._gainNode.gain.exponentialApproachValueAtTime(t,e,n)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){W(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==Q&&(this.onended(this),this.onended=Q,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),W(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=Q,this}}class mi extends Xt{constructor(){const e=B(mi.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),cn(this._source,this._gainNode),this.offset=new J({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(Xt.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class xe extends U{constructor(){const e=B(xe.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new mi({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(U.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,n=0){return gi(this,e,t,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,n){return this._param.exponentialRampTo(e,t,n),this}linearRampTo(e,t,n){return this._param.linearRampTo(e,t,n),this}targetRampTo(e,t,n){return this._param.targetRampTo(e,t,n),this}exponentialApproachValueAtTime(e,t,n){return this._param.exponentialApproachValueAtTime(e,t,n),this}setTargetAtTime(e,t,n){return this._param.setTargetAtTime(e,t,n),this}setValueCurveAtTime(e,t,n,i){return this._param.setValueCurveAtTime(e,t,n,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,n){return this._param.rampTo(e,t,n),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function gi(s,e,t,n){(e instanceof J||It(e)||e instanceof xe&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof xe&&(e.overridden=!0)),cn(s,e,t,n)}class vi extends J{constructor(){const e=B(vi.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new Be(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(J.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,n){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/n,1));for(let a=0;a<=o;a++){const c=n*a+t,l=this._exponentialApproach(r.time,r.value,i,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const n=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(n),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const n=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(n),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const n=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(ze(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const n=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(n+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),n=this._events.get(t);return Math.max(this._getTicksUntilEvent(n,t),0)}getDurationOfTicks(e,t){const n=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-n}getTimeOfTick(e){const t=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&n&&n.type==="linearRampToValueAtTime"&&t.value!==n.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(n.time))-i)/(n.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const n=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class yi extends xe{constructor(){const e=B(yi.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new vi({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(xe.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class xi extends Ee{constructor(){const e=B(xi.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new fi,this._tickOffset=new Be,this._ticksAtTime=new Be,this._secondsAtTime=new Be,this.frequency=new yi({context:this.context,units:e.units,value:e.frequency}),ce(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Ee.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const n=this.toSeconds(e);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),H(t)&&this.setTicksAtTime(t,n),this._ticksAtTime.cancel(n),this._secondsAtTime.cancel(n)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const n=this._state.get(t);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),n=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||n,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let h=o.time;const d=this._tickOffset.get(l.time);d&&d.time>=o.time&&(a=d.ticks,h=d.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(h),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),n=this.frequency.timeToTicks(e,t);this.setTicksAtTime(n,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),n={state:"paused",time:e};this._state.add(n);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const h=this._tickOffset.get(c.time);h&&h.time>=r.time&&(o=h.seconds,l=h.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==n.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(n),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const n=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(n.time,i.time),o=this.frequency.getTicksAtTime(r)+e-n.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,n){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,n),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let h=Math.ceil(l)-l;h=Ue(h,1)?0:h;let d=this.frequency.getTimeOfTick(a+h);for(;d<t;){try{n(d,Math.round(this.getTicksAtTime(d)))}catch(u){r=u;break}d+=this.frequency.getDurationOfTicks(1,d)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class ms extends Ee{constructor(){const e=B(ms.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=Q,this._lastUpdate=0,this._state=new fi("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new xi({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,ce(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Ee.getDefaults(),{callback:Q,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){go(this.context);const n=this.toSeconds(e);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,t),n<this._lastUpdate&&this.emit("start",n,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const n=this.toSeconds(t),i=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(i+e,n)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,n=>{switch(n.state){case"started":const i=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,i);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(e,t,(n,i)=>{this.callback(n,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}In.mixin(ms);class ln extends U{constructor(){const e=B(ln.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new we({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,ce(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(U.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class bi extends U{constructor(){const e=B(bi.getDefaults(),arguments);super(e),this.name="Destination",this.input=new ln({context:this.context}),this.output=new we({context:this.context}),this.volume=this.input.volume,Fs(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(U.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Fs(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}us(s=>{s.destination=new bi({context:s})});ps(s=>{s.destination.dispose()});class Ru extends U{constructor(){super(...arguments),this.name="Listener",this.positionX=new J({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new J({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new J({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new J({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new J({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new J({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new J({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new J({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new J({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(U.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}us(s=>{s.listener=new Ru({context:s})});ps(s=>{s.listener.dispose()});class _i extends ct{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=B(_i.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const n=e.urls[t];this.add(t,n,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:Q,onload:Q,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return W(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,n=Q,i=Q){return ot(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new re(this.baseUrl+t,n,i))):this._buffers.set(e.toString(),new re(t,n,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class jt extends pn{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class Lu extends Ee{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new Be,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}us(s=>{s.draw=new Lu({context:s})});ps(s=>{s.draw.dispose()});class Vu extends ct{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){W(H(e.time),"Events must have a time property"),W(H(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Fu(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const n of t)if(n.event===e){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let n,i=null;if(t>0)if(e.left.right===null)n=e.left,n.right=e.right,i=n;else{for(n=e.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,i=n.parent,n.left=e.left,n.right=e.right)}else if(e.right.left===null)n=e.right,n.left=e.left,i=n;else{for(n=e.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,i=n.parent,n.left=e.left,n.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=n:e.parent.right=n:this._setRoot(n),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,n=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?n?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,n=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?n?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let n=t[0];for(let i=1;i<t.length;i++)t[i].low>n.low&&(n=t[i]);return n.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(n=>t.push(n)),t.forEach(n=>{n.event&&e(n.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const n=[];this._root.search(e,n),n.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const n=[];this._root.searchAfter(e,n),n.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Fu{constructor(e,t,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class ju extends ct{constructor(e){super(),this.name="TimelineValue",this._timeline=new Be({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class Kt extends U{constructor(){super(B(Kt.getDefaults(),arguments,["context"]))}connect(e,t=0,n=0){return gi(this,e,t,n),this}}class On extends Kt{constructor(){const e=B(On.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,Ge(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):lu(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(xe.getDefaults(),{length:1024})}setMap(e,t=1024){const n=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;n[i]=e(o,i)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(n=>n.includes(e));W(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class wi extends Kt{constructor(){const e=B(wi.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new On({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(Kt.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class vt{constructor(e,t){this.id=vt._eventId++,this._remainderTime=0;const n=Object.assign(vt.getDefaults(),t);this.transport=e,this.callback=n.callback,this._once=n.once,this.time=Math.floor(n.time),this._remainderTime=n.time-this.time}static getDefaults(){return{callback:Q,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}vt._eventId=0;class Ti extends vt{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(Ti.getDefaults(),t);this.duration=n.duration,this._interval=n.interval,this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},vt.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return ts(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new jt(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){ts(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new jt(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);Yt(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class gs extends Ee{constructor(){const e=B(gs.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new ju(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new Be,this._repeatedEvents=new Vu,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new ms({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),ce(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Ee.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const n=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(n*Math.PI)*this._swingAmount;e+=new jt(this.context,this._swingTicks*2/3).toSeconds()*i}or(!0),this._timeline.forEachAtTime(t,n=>n.invoke(e)),or(!1)}schedule(e,t){const n=new vt(this,{callback:e,time:new pn(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(e,t,n,i=1/0){const r=new Ti(this,{callback:e,duration:new qe(this.context,i).toTicks(),interval:new qe(this.context,t).toTicks(),time:new pn(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const n=new vt(this,{callback:e,once:!0,time:new pn(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(t,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new jt(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let n;return H(t)&&(n=this.toTicks(t)),this._clock.start(e,n),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){Ge(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new qe(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new qe(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new jt(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new jt(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),n=this._clock.frequency.timeToTicks(e,t);this.ticks=n}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),n=this.getTicksAtTime(t),i=e-n%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const n=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(n)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new we(c),h=new wi(-1),d=new we(c);i.chain(l,h,d),i=d,r=1/r,o=[l,h,d]}t||(e.getValueAtTime(n)!==0?t=e.getValueAtTime(n)/r:t=0);const a=new we(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const n=this._syncedSignals[t];n.signal===e&&(n.nodes.forEach(i=>i.dispose()),n.signal.value=n.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),wo(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}In.mixin(gs);us(s=>{s.transport=new gs({context:s})});ps(s=>{s.transport.dispose()});class Re extends U{constructor(e){super(e),this.input=void 0,this._state=new fi("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=Q,this._syncedStop=Q,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new ln({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,ce(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(U.getDefaults(),{mute:!1,onstop:Q,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,n){let i=ze(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")W(Yt(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,n);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(Wt(t,0)),r.duration=n?this.toSeconds(n):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,n)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else go(this.context),this._start(i,t,n);return this}stop(e){let t=ze(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||H(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const n=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(n)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,n){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(Yt(t,0)){const n=this._state.get(t);if(n&&n.state==="started"&&n.time!==t){const i=t-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-i),this._start(e,this.toSeconds(n.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=Q,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class vs extends Xt{constructor(){const e=B(vs.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,cn(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new J({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new re(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(Xt.getDefaults(),{url:new re,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,n,i=1){W(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=Wt(t,this.loopStart):t=Wt(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;Ls(o,a)&&(o=(o-c)%l+c),Ue(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,ts(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),H(n)){let a=this.toSeconds(n);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}function Pt(s,e){return fe(this,void 0,void 0,function*(){const t=e/s.context.sampleRate,n=new ui(1,t,s.context.sampleRate);return new s.constructor(Object.assign(s.get(),{frequency:2/t,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class Si extends Xt{constructor(){const e=B(Si.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],cn(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new J({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new J({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),ce(this,["frequency","detune"])}static getDefaults(){return Object.assign(Xt.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class pe extends Re{constructor(){const e=B(pe.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new xe({context:this.context,units:"frequency",value:e.frequency}),ce(this,"frequency"),this.detune=new xe({context:this.context,units:"cents",value:e.detune}),ce(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),n=new Si({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return pe._periodicWaveCache.find(t=>t.phase===this._phase&&bu(t.partials,this._partials));{const e=pe._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const n=this._getCachedPeriodicWave();if(H(n)){const{partials:i,wave:r}=n;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),pe._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),pe._periodicWaveCache.length>100&&pe._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){gt(e,0);let t=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(t=n[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let h;switch(e){case"sine":h=c<=a?1:0,this._partials[c-1]=h;break;case"square":h=c&1?2*l:0,this._partials[c-1]=h;break;case"sawtooth":h=l*(c&1?1:-1),this._partials[c-1]=h;break;case"triangle":c&1?h=2*(l*l)*(c-1>>1&1?-1:1):h=0,this._partials[c-1]=h;break;case"custom":h=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}h!==0?(r[c]=-h*Math.sin(t*c),o[c]=h*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,n){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*n)+t[o]*Math.sin(o*n);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let n=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)n=Math.max(this._inverseFFT(e,t,o/r*i),n);return wu(-this._inverseFFT(e,t,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}pe._periodicWaveCache=[];class zu extends Kt{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new On({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Zt extends xe{constructor(){const e=B(Zt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new we({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(xe.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class ys extends Re{constructor(){const e=B(ys.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new zu({context:this.context}),this._modulationNode=new we({context:this.context}),this._carrier=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new pe({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Zt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),ce(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pe.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class xs extends Re{constructor(){const e=B(xs.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new we({context:this.context,gain:0}),this._carrier=new pe({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new xe({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new pe({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Zt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Zt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),ce(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pe.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class Dn extends Re{constructor(){const e=B(Dn.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new we({context:this.context,gain:0}),this._thresh=new On({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new xe({context:this.context,units:"audioRange",value:e.width}),this._triangle=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),ce(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class bs extends Re{constructor(){const e=B(bs.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new xe({context:this.context,units:"frequency",value:e.frequency}),this.detune=new xe({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,ce(this,["frequency","detune"])}static getDefaults(){return Object.assign(pe.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,n=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+n*r)}}get count(){return this._oscillators.length}set count(e){if(gt(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const n=new pe({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):Q});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[t]=n}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,n)=>t.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class _s extends Re{constructor(){const e=B(_s.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Zt({context:this.context,value:2}),this._pulse=new Dn({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),ce(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const cr={am:ys,fat:bs,fm:xs,oscillator:pe,pulse:Dn,pwm:_s};class ns extends Re{constructor(){const e=B(ns.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new xe({context:this.context,units:"frequency",value:e.frequency}),this.detune=new xe({context:this.context,units:"cents",value:e.detune}),ce(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(pe.getDefaults(),xs.getDefaults(),ys.getDefaults(),bs.getDefaults(),Dn.getDefaults(),_s.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=cr[e],n=this.now();if(this._oscillator){const i=this._oscillator;i.stop(n),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof cr[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&Mt(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&Mt(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&ot(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Pt(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function Ao(s,e=1/0){const t=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){gt(r,s,e),t.set(this,r)}})}}function lt(s,e=1/0){const t=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){gt(this.toSeconds(r),s,e),t.set(this,r)}})}}class ws extends Re{constructor(){const e=B(ws.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new re({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Re.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:Q,onerror:Q,playbackRate:1,reverse:!1})}load(e){return fe(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=Q){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,n){return super.start(e,t,n),this}_start(e,t,n){this._loop?t=Wt(t,this._loopStart):t=Wt(t,0);const i=this.toSeconds(t),r=n;n=Wt(n,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(n);o=o/this._playbackRate,e=this.toSeconds(e);const a=new vs({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&ze(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(n=>n.stop(t))}restart(e,t,n){return super.restart(e,t,n),this}_restart(e,t,n){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,n)}seek(e,t){const n=this.toSeconds(t);if(this._state.getValueAtTime(n)==="started"){const i=this.toSeconds(e);this._stop(n),this._start(n,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&gt(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&gt(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),n=this._state.getNextState("stopped",t);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}Ke([lt(0)],ws.prototype,"fadeIn",void 0);Ke([lt(0)],ws.prototype,"fadeOut",void 0);class bt extends U{constructor(){const e=B(bt.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new xe({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(U.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(ot(e))return e;{let n;for(n in jn)if(jn[n][t]===e)return n;return e}}_setCurve(e,t,n){if(ot(n)&&Reflect.has(jn,n)){const i=jn[n];At(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(Ge(n)&&e!=="_decayCurve")this[e]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,e):(W(Ge(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,n,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,n=1){return t=this.toSeconds(t),this.triggerAttack(t,n),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,n=0){return gi(this,e,t,n),this}asArray(){return fe(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,n=new ui(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}Ke([lt(0)],bt.prototype,"attack",void 0);Ke([lt(0)],bt.prototype,"decay",void 0);Ke([Ao(0,1)],bt.prototype,"sustain",void 0);Ke([lt(0)],bt.prototype,"release",void 0);const jn=(()=>{let e,t;const n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const u=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=u/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const u=Math.pow(t,3)*4+.2,f=Math.cos(u*Math.PI*2*t);l[e]=Math.abs(f*(1-t))}function h(u){const f=new Array(u.length);for(let p=0;p<u.length;p++)f[p]=1-u[p];return f}function d(u){return u.slice(0).reverse()}return{bounce:{In:h(l),Out:l},cosine:{In:n,Out:d(n)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:h(i)},sine:{In:c,Out:h(c)},step:{In:o,Out:h(o)}}})();class Jt extends U{constructor(){const e=B(Jt.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new ln({context:this.context,volume:e.volume}),this.volume=this._volume.volume,ce(this,"volume")}static getDefaults(){return Object.assign(U.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const n=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,n.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,n,i){const r=this.toSeconds(n),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class Qt extends Jt{constructor(){const e=B(Qt.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Jt.getDefaults(),{detune:0,onsilence:Q,portamento:0})}triggerAttack(e,t,n=1){this.log("triggerAttack",e,t,n);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,n),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const n=this.toSeconds(t),i=e instanceof je?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,n)}else this.frequency.setValueAtTime(i,n);return this}}Ke([lt(0)],Qt.prototype,"portamento",void 0);class ki extends bt{constructor(){super(B(ki.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new we({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class ss extends Qt{constructor(){const e=B(ss.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new ns(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new ki(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),ce(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(Qt.getDefaults(),{envelope:Object.assign(ar(bt.getDefaults(),Object.keys(U.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(ar(ns.getDefaults(),[...Object.keys(Re.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+n+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Ts extends ss{constructor(){const e=B(Ts.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,ce(this,["oscillator","envelope"])}static getDefaults(){return Bt(Qt.getDefaults(),ss.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const n=this.toSeconds(t),i=this.toFrequency(e instanceof je?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(i,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}Ke([Ao(0)],Ts.prototype,"octaves",void 0);Ke([lt(0)],Ts.prototype,"pitchDecay",void 0);const Co=new Set;function Ai(s){Co.add(s)}function No(s,e){const t=`registerProcessor("${s}", ${e})`;Co.add(t)}const Bu=`
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
`;Ai(Bu);const Wu=`
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
`;Ai(Wu);const Uu=`
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
`;Ai(Uu);const qu="feedback-comb-filter",Gu=`
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
`;No(qu,Gu);class Pn extends Jt{constructor(){const e=B(Pn.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(n=>{const i=parseInt(n,10);if(W(Fn(n)||Mt(i)&&isFinite(i),`url key is neither a note or midi pitch: ${n}`),Fn(n)){const r=new je(this.context,n).toMidi();t[r]=e.urls[n]}else Mt(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new _i({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Jt.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:Q,onerror:Q,release:.1,urls:{}})}_findClosest(e){let n=0;for(;n<96;){if(this._buffers.has(e+n))return-n;if(this._buffers.has(e-n))return n;n++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,n=1){return this.log("triggerAttack",e,t,n),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=ko(new je(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,h=this._buffers.get(l),d=So(c+a),u=new vs({url:h,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:d}).connect(this.output);u.start(t,0,h.duration/d,n),Ge(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(u),u.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const f=this._activeSources.get(o),p=f.indexOf(u);p!==-1&&f.splice(p,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(n=>{const i=new je(this.context,n).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,n,i=1){const r=this.toSeconds(n);return this.triggerAttack(e,r,i),Ge(t)?(W(Ge(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,n){if(W(Fn(e)||isFinite(e),`note must be a pitch or midi: ${e}`),Fn(e)){const i=new je(this.context,e).toMidi();this._buffers.add(i,t,n)}else this._buffers.add(e,t,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}Ke([lt(0)],Pn.prototype,"attack",void 0);Ke([lt(0)],Pn.prototype,"release",void 0);class Ci extends U{constructor(){const e=B(Ci.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new J({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",ce(this,"pan")}static getDefaults(){return Object.assign(U.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Hu="bit-crusher",Yu=`
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
`;No(Hu,Yu);class ue extends U{constructor(){const e=B(ue.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new we({context:this.context}),ue._allSolos.has(this.context)||ue._allSolos.set(this.context,new Set),ue._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(U.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),ue._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){ue._soloed.has(this.context)||ue._soloed.set(this.context,new Set),ue._soloed.get(this.context).add(this)}_removeSolo(){ue._soloed.has(this.context)&&ue._soloed.get(this.context).delete(this)}_isSoloed(){return ue._soloed.has(this.context)&&ue._soloed.get(this.context).has(this)}_noSolos(){return!ue._soloed.has(this.context)||ue._soloed.has(this.context)&&ue._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),ue._allSolos.get(this.context).delete(this),this._removeSolo(),this}}ue._allSolos=new Map;ue._soloed=new Map;class Ni extends U{constructor(){const e=B(Ni.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new Ci({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new ln({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,ce(this,["pan","volume"])}static getDefaults(){return Object.assign(U.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class zt extends U{constructor(){const e=B(zt.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new ue({solo:e.solo,context:this.context}),this._panVol=this.output=new Ni({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),ce(this,["pan","volume"])}static getDefaults(){return Object.assign(U.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return zt.buses.has(e)||zt.buses.set(e,new we({context:this.context})),zt.buses.get(e)}send(e,t=0){const n=this._getBus(e),i=new we({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(n),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}zt.buses=new Map;class Mi extends U{constructor(){const e=B(Mi.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new J({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new J({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new J({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new J({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new J({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),ce(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(U.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function Xu(){return Fe().now()}Fe().transport;Fe().destination;Fe().destination;Fe().listener;Fe().draw;Fe();const Ku=new Mi({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),lr=new Pn({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:s=>{console.warn("Failed to load Rhodes piano sampler:",s)}}).connect(Ku),Zu=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function hr(s){const e=Math.floor(s/12)-1,t=s%12;return`${Zu[t]}${e}`}function Ju(s,e){const t=e/60;switch(s){case"1/4":return 1/t;case"1/8":return .5/t;case"1/8T":return .5/t*(2/3);case"1/16":return .25/t;default:return .25/t}}function Qu(s,e){const t=[];for(let n=0;n<e;n++)for(const i of s){const r=i.match(/^([A-G]#?)(-?\d+)$/);if(r){const o=r[1],a=parseInt(r[2],10)+n;t.push(`${o}${a}`)}else t.push(i)}return t}function ep(s,e){const t=[...s];switch(e){case"up":return t;case"down":return[...t].reverse();case"up-down":return[...t,...[...t].reverse().slice(1,-1)];case"random":return t.sort(()=>Math.random()-.5);default:return t}}function tp(s,e=.7,t){try{Cu().then(()=>{const n=s.length,i=n<=1?1:Math.max(.4,1/Math.sqrt(n)),r=Xu();if(t&&t.arpMode&&t.arpMode!=="off"){const o=t.bpm??80,a=t.arpRate??"1/16",c=t.arpRange??1,l=t.arpMode,h=Ju(a,o),d=Qu(s,c),u=ep(d,l),f=()=>t.minVelocity!==void 0&&t.maxVelocity!==void 0?(t.minVelocity+Math.random()*(t.maxVelocity-t.minVelocity))/127*i:i,p=t.duration?t.duration*(1+(Math.random()-.5)*.1*(t.humanVariance??0)):Math.max(.05,h*.9);u.forEach((m,g)=>{const y=t.microTiming?(Math.random()-.5)*t.microTiming*.02:0;lr.triggerAttackRelease(m,p,r+g*h+y,f())});return}s.forEach((o,a)=>{let c=0,l=i,h=e;if(t){const{minVelocity:d,maxVelocity:u,spread:f,microTiming:p,humanVariance:m,duration:g}=t;l=(d+Math.random()*(u-d))/127*i;const w=a*f*.1,T=(Math.random()-.5)*p*.05,S=(Math.random()-.5)*m*.03;c=Math.max(0,w+T+S),h=g*(1+(Math.random()-.5)*.2*m)}lr.triggerAttackRelease(o,h,r+c,l)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function np(s,e,t){const n=[];if(typeof s=="string"){const i=s.split(" ").map(a=>a.trim()).filter(Boolean);if(!i.length)return;const r=i[0],o=e[r]||60;i.forEach((a,c)=>{let l=e[a]||60;c===0?l-=12:l<o&&(l+=12),n.push(hr(l))})}else s.forEach(i=>{n.push(hr(i))});tp(n,.7,t)}var sp=Object.defineProperty,ip=Object.getOwnPropertyDescriptor,st=(s,e,t,n)=>{for(var i=n>1?void 0:n?ip(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&sp(e,t,i),i};const dr={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72};let We=class extends Je{constructor(){super(...arguments),this.header="",this.chordName="",this.chordNotes="",this.scale="",this.functionText="",this.voicingsListed=[],this.compactMode=!1,this.extension="7th",this.windowStartMidi=60,this.orchidWindowSize=13}updated(s){}normalizeNote(s){return{Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#",Bb:"A#",db:"C#",eb:"D#",gb:"F#",ab:"G#",bb:"A#"}[s]||s}getNoteNameFromMidi(s){return["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][s%12]}getVoicedMidiNotes(){const s=this.chordNotes?this.chordNotes.split(" "):[];if(!s.length)return[];const e=dr[s[0]]||60,t=e%12;let n=s.map(d=>((dr[d]||60)-e+24)%12);const i=n.some(d=>d>=9),r=n.includes(3)&&n.includes(6),o=n.includes(4)&&n.includes(8),a=n.includes(3)&&!r,c=n.includes(4)&&!o;let l=[];this.extension==="triad"?l=n.filter(d=>d<9):this.extension==="7th"?(l=[...n],i||(r?l.push(9):a?l.push(10):c?l.push(11):l.push(10))):this.extension==="9th"?(l=[...n],i||(r?l.push(9):a?l.push(10):c?l.push(11):l.push(10)),l.includes(2)||l.push(2)):this.extension==="6th"&&(l=n.filter(d=>d<9),l.includes(9)||l.push(9));const h=[];for(const d of l){let f=(t+d)%12;for(;f<this.windowStartMidi;)f+=12;for(;f<this.windowStartMidi+this.orchidWindowSize;)h.includes(f)||h.push(f),f+=12}return h.sort((d,u)=>d-u)}getHeaderClass(){const s=this.header.toUpperCase();return s.includes("TONIC")?"header-tonic":s.includes("DOMINANT")?"header-dominant":s.includes("SUBDOMINANT")||s.includes("SUPERTONIC")||s.includes("LEADING")?"header-subdominant":""}handlePlayClick(){this.dispatchEvent(new CustomEvent("play-chord",{detail:{notes:this.getVoicedMidiNotes()},bubbles:!0,composed:!0}))}render(){(this.chordNotes?this.chordNotes.split(" "):[])[0];const t=this.getVoicedMidiNotes().map(n=>this.getNoteNameFromMidi(n)).join(" ");return M`
      <div class="profile-card ${this.compactMode?"compact":""}">
        <!-- Card Header with title, pill tag and Notes Set inline -->
        <div class="card-header">
          <div class="title-area">
            <div class="chord-title-row">
              <div class="chord-name-group">
                <div class="chord-title">${this.chordName||"..."}</div>
                <span class="header-pill ${this.getHeaderClass()}">${this.header||"Chord Profile"}</span>
              </div>
              
              <slot name="tabs"></slot>
              
              <div class="chord-notes-badge">
                <span class="chord-notes-label">Notes Set</span>
                <span class="chord-notes-value">${t||"-"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Scale context (hidden in compactMode) -->
        ${this.compactMode?"":M`
          <div class="chord-info" style="margin-top: -10px;">
            <div class="scale-text">${this.scale||"Chord Scale Context"}</div>
          </div>
        `}
        
        <!-- Functional description (hidden in compactMode) -->
        ${this.compactMode?"":M`
          <div class="function-box">
            ${this.functionText?this.functionText.replace("FUNCTION:","").trim():"Select a starting key to load chord descriptions."}
          </div>
        `}
      </div>
    `}};We.styles=en`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }
    
    .profile-card {
      padding: 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .profile-card.compact {
      padding: 16px 20px;
      gap: 12px;
    }
    
    .card-header {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    
    .title-area {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
    }

    .chord-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .chord-name-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chord-notes-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-card);
      padding: 6px 12px;
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }

    .chord-notes-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .chord-notes-value {
      font-size: 0.95rem;
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }
    
    .header-pill {
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 6px 12px;
      border-radius: 6px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--bg-card);
      border: none;
      color: var(--text-secondary);
      box-shadow: var(--neu-pressed-sm);
      transition: all 0.3s ease;
    }
    
    /* Dynamically style header badges based on harmonic functions */
    .header-tonic { color: var(--accent-gold); }
    .header-dominant { color: var(--accent-terracotta); }
    .header-subdominant { color: var(--bg-card); background: var(--accent-gold); box-shadow: var(--neu-flat-sm); }
    
    .chord-info {
      margin-top: -5px;
    }
    
    .chord-title {
      font-size: 2.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      line-height: 1.1;
      letter-spacing: -0.03em;
    }
    
    .profile-card.compact .chord-title {
      font-size: 1.8rem;
    }
    
    .scale-text {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-top: 4px;
      letter-spacing: 0.02em;
    }
    
    .profile-card.compact .title-area {
      gap: 8px;
    }

    .profile-card.compact .chord-notes-badge {
      padding: 4px 8px;
      border-radius: 6px;
    }
    
    .function-box {
      background: var(--bg-card);
      border-left: 3px solid var(--accent-terracotta);
      border-top: none;
      border-right: none;
      border-bottom: none;
      padding: 14px 18px;
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-secondary);
      font-family: var(--font-body);
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .chord-title-row {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .chord-name-group {
        order: 1;
      }
      ::slotted([slot="tabs"]) {
        order: 2;
        margin-left: auto;
      }
      .chord-notes-badge {
        order: 3;
      }
      .profile-card.compact {
        padding: 12px 16px;
      }
      .profile-card.compact .chord-title {
        font-size: 1.5rem;
      }
      .profile-card.compact .chord-title-row {
        gap: 6px;
      }
    }
  `;st([te({type:String})],We.prototype,"header",2);st([te({type:String})],We.prototype,"chordName",2);st([te({type:String})],We.prototype,"chordNotes",2);st([te({type:String})],We.prototype,"scale",2);st([te({type:String})],We.prototype,"functionText",2);st([te({type:Array})],We.prototype,"voicingsListed",2);st([te({type:Boolean})],We.prototype,"compactMode",2);st([te({type:String})],We.prototype,"extension",2);st([te({type:Number})],We.prototype,"windowStartMidi",2);We=st([tn("chord-profile-card")],We);var rp=Object.defineProperty,op=Object.getOwnPropertyDescriptor,Ii=(s,e,t,n)=>{for(var i=n>1?void 0:n?op(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&rp(e,t,i),i};const ap={MAJOR:{label:"Sunlit Harbor",emoji:"☀️",class:"vibe-major"},MIXOLYDIAN:{label:"The Warm Current",emoji:"🌊",class:"vibe-mixolydian"},DORIAN:{label:"The Twilight Hour",emoji:"🌆",class:"vibe-dorian"},LYDIAN:{label:"The Floating Mist",emoji:"🌫️",class:"vibe-lydian"},"NATURAL MINOR":{label:"Clear Night",emoji:"🌌",class:"vibe-natural-minor"},"HARMONIC MINOR":{label:"The Storm",emoji:"⛈️",class:"vibe-harmonic-minor"},"MELODIC MINOR":{label:"Mystic Sea",emoji:"✨",class:"vibe-melodic-minor"}};let bn=class extends Je{constructor(){super(...arguments),this.options=[],this.compactMode=!1}getVibeConfig(s){return ap[s]||{label:"Unknown Vibe",emoji:"❓",class:"vibe-tonic-major"}}handleOptionSelect(s){this.dispatchEvent(new CustomEvent("select-next-chord",{detail:{option:s},bubbles:!0,composed:!0}))}handlePreviewClick(s,e){s.stopPropagation(),this.dispatchEvent(new CustomEvent("preview-chord-name",{detail:{name:e.name},bubbles:!0,composed:!0}))}render(){return M`
      <div class="options-container ${this.compactMode?"is-compact":""}">
        <div class="options-header">
          <span>Next Transition Options</span>
          <span style="font-size: 0.7rem; font-weight: 400; text-transform: none;">Click card to transition</span>
        </div>
        
        <div class="cards-grid">
          ${this.options.map(s=>{const e=this.getVibeConfig(s.vibe),t=parseInt(s.tension)||50,n=Math.min(4,Math.max(1,Math.ceil(t/25))),i=[];for(let r=1;r<=4;r++){const o=r<=n;i.push(M`
              <span class="dot ${o?`t${n}-fill`:""}"></span>
            `)}return M`
            <div class="option-card ${e.class}" @click="${()=>this.handleOptionSelect(s)}">
              <div class="card-header">
                <div class="chord-pill-container">
                  <div class="chord-pill">${s.name}</div>
                </div>
                <div class="tag-section">
                  <div class="tension-dots">
                    ${i}
                  </div>
                  <span class="tension-lbl">${s.tension}</span>
                </div>
              </div>
              
              <div class="desc-section">
                ${this.compactMode?"":M`<div class="desc-text">${s.description}</div>`}
              </div>
              
              <div class="card-footer">
                <div class="meta-row" style="margin-top: 0;">
                  <span class="mood-badge ${e.class} ${this.compactMode?"large-mode":""}">
                    <span class="emoji-icon">${e.emoji}</span> 
                    <span class="mood-text">${e.label}</span>
                  </span>
                </div>
                <button class="btn-preview" @click="${r=>this.handlePreviewClick(r,s)}" title="Preview Sound">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </button>
              </div>
            </div>
          `})}
        </div>
      </div>
    `}};bn.styles=en`
    :host {
      display: flex;
      flex-direction: column;
    }
    
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      box-sizing: border-box;
      padding-bottom: 40px;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .options-header {
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .option-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: var(--neu-flat);
      transition: all 0.25s ease;
      height: 100%;
      box-sizing: border-box;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      margin-top: auto;
    }
    
    .option-card:hover {
      box-shadow: var(--neu-flat-sm);
    }
    
    .chord-pill-container {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .chord-pill {
      font-size: 0.95rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 8px 14px;
      border-radius: 6px;
      background: linear-gradient(180deg, #1f1b18 0%, #12100e 100%);
      border: 1px solid #2d2621;
      color: var(--text-secondary);
      min-width: 72px;
      text-align: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.6);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    
    :host-context(.light-theme) .chord-pill {
      background: linear-gradient(180deg, #fbfaf7 0%, #dedad0 100%);
      border: 1px solid #c8c2b7;
      color: var(--text-primary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.08);
    }

    /* Class-specific vibe highlights on hover (backlit hardware switch style) */
    .option-card.vibe-major:hover .chord-pill { 
      background: linear-gradient(180deg, #c2a173 0%, #ab8b61 100%); 
      color: #171513; 
      border-color: #d9b88c;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(171, 139, 97, 0.6);
    }

    .option-card.vibe-natural-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #e3dac9 0%, #c4baa7 100%); 
      color: #171513; 
      border-color: #eadecc;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px rgba(213, 205, 186, 0.6);
    }

    .option-card.vibe-mixolydian:hover .chord-pill { 
      background: linear-gradient(180deg, #4f9da6 0%, #31707d 100%); 
      color: #ffffff; 
      border-color: #63b2bd;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(79, 157, 166, 0.6);
    }

    .option-card.vibe-dorian:hover .chord-pill { 
      background: linear-gradient(180deg, #7a66cc 0%, #5945a8 100%); 
      color: #ffffff; 
      border-color: #9884e8;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(122, 102, 204, 0.6);
    }

    .option-card.vibe-lydian:hover .chord-pill { 
      background: linear-gradient(180deg, #9bbecf 0%, #7da2b5 100%); 
      color: #171513; 
      border-color: #b4d4e6;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px rgba(155, 190, 207, 0.6);
    }

    .option-card.vibe-harmonic-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #a83d2e 0%, #87291c 100%); 
      color: #ffffff; 
      border-color: #c25244;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(135, 41, 28, 0.6);
    }

    .option-card.vibe-melodic-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #4a9b75 0%, #337254 100%); 
      color: #ffffff; 
      border-color: #60c196;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(74, 155, 117, 0.6);
    }
    
    .btn-preview {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(180deg, #1f1b18 0%, #12100e 100%);
      border: 1px solid #2d2621;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.6);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-preview:hover {
      color: var(--text-primary);
      background: linear-gradient(180deg, #2d2621 0%, #1f1b18 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4);
      transform: translateY(0.5px);
    }

    .btn-preview:active {
      background: #110f0d;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
      transform: translateY(1.5px);
    }
    
    :host-context(.light-theme) .btn-preview {
      background: linear-gradient(180deg, #fbfaf7 0%, #dedad0 100%);
      border: 1px solid #c8c2b7;
      color: var(--text-secondary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.08);
    }

    :host-context(.light-theme) .btn-preview:hover {
      color: var(--text-primary);
      background: linear-gradient(180deg, #dedad0 0%, #c8c2b7 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.1);
    }

    :host-context(.light-theme) .btn-preview:active {
      background: #dedad0;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
    }
    
    .btn-preview svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }
    
    .desc-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .desc-text {
      font-size: 0.85rem;
      line-height: 1.4;
      color: var(--text-secondary);
    }
    
    .meta-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    
    .meta-label {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .tag-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    
    /* Tension Dots rendering */
    .tension-dots {
      display: flex;
      gap: 4px;
    }
    
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border-color);
    }
    
    .dot.t1-fill { background: var(--tension-1); }
    .dot.t2-fill { background: var(--tension-2); }
    .dot.t3-fill { background: var(--tension-3); }
    .dot.t4-fill { 
      background: var(--tension-4); 
      animation: pulse-dot 1.5s infinite;
    }
    
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }
    
    .mood-badge {
      font-size: 0.7rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 4px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.25s ease;
    }

    .mood-badge.large-mode {
      font-size: 1.1rem;
      padding: 8px 16px;
      border-radius: 8px;
      margin-top: 4px;
    }

    .mood-badge.large-mode .emoji-icon {
      font-size: 1.5rem;
    }
    
    .vibe-major { background: var(--bg-card); color: var(--accent-gold); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-natural-minor { background: var(--bg-card); color: var(--text-secondary); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-mixolydian { background: var(--bg-card); color: var(--accent-cyan); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-dorian { background: var(--bg-card); color: #a892ee; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-lydian { background: var(--bg-card); color: #b3d3e6; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-harmonic-minor { background: var(--bg-card); color: #c25244; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-melodic-minor { background: var(--bg-card); color: #60bb92; border: none; box-shadow: var(--neu-pressed-sm); }
    
    .tension-lbl {
      font-size: 0.65rem;
      color: var(--text-muted);
      font-weight: 700;
    }

    @media (max-width: 600px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }
      .option-card {
        padding: 12px;
      }
      .tag-section {
        display: none;
      }
      
      /* Compact mode horizontal layout for mobile */
      .is-compact .option-card {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        height: auto;
      }
      
      .is-compact .card-header {
        width: auto;
      }
      
      .is-compact .desc-section {
        display: none;
      }
      
      .is-compact .card-footer {
        width: auto;
        margin-top: 0;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }
      
      .is-compact .mood-badge.large-mode {
        font-size: 0.75rem;
        padding: 4px 8px;
        margin-top: 0;
      }
      
      .is-compact .mood-badge.large-mode .emoji-icon {
        font-size: 1rem;
      }
      .mood-badge.large-mode {
        font-size: 0.95rem;
        padding: 6px 10px;
        gap: 4px;
        min-width: 0;
        max-width: 100%;
      }
      .mood-badge.large-mode .emoji-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      .desc-section, .meta-row {
        min-width: 0;
      }
      .mood-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `;Ii([te({type:Array})],bn.prototype,"options",2);Ii([te({type:Boolean})],bn.prototype,"compactMode",2);bn=Ii([tn("next-options-table")],bn);const cp="modulepreload",lp=function(s,e){return new URL(s,e).href},ur={},hp=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(t.map(l=>{if(l=lp(l,n),l in ur)return;ur[l]=!0;const h=l.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!n)for(let p=o.length-1;p>=0;p--){const m=o[p];if(m.href===l&&(!h||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":cp,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((p,m)=>{f.addEventListener("load",p),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};var dp=Object.defineProperty,up=Object.getOwnPropertyDescriptor,$n=(s,e,t,n)=>{for(var i=n>1?void 0:n?up(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&dp(e,t,i),i};const pp=["C","D","E","F","G","A","B"],fp=[{name:"C#",offset:1},{name:"D#",offset:2},{name:"F#",offset:4},{name:"G#",offset:5},{name:"A#",offset:6}],mp={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72};let Et=class extends Je{constructor(){super(...arguments),this.activeNotes=[],this.rootNoteName="",this.windowStart=-1,this.windowSize=0}normalizeNoteName(s){return{Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#",Bb:"A#",db:"C#",eb:"D#",gb:"F#",ab:"G#",bb:"A#"}[s]||s}getNoteNameFromMidi(s){return["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][s%12]}getActiveMidiNumbers(){return!this.activeNotes||!this.activeNotes.length?[]:this.activeNotes.map(s=>typeof s=="number"?s:mp[s.trim()]||60)}isMidiActive(s){return this.getActiveMidiNumbers().includes(s)}isMidiRoot(s){if(!this.rootNoteName)return!1;const e=this.getNoteNameFromMidi(s),t=this.normalizeNoteName(e),n=this.normalizeNoteName(this.rootNoteName);return t===n}render(){const e=3.5714285714285716,t=[],n=[];let i=100,r=0;for(let o=0;o<28;o++){const a=Math.floor(o/7),c=pp[o%7],l=[0,2,4,5,7,9,11],h=36+a*12+l[o%7],d=this.isMidiActive(h),u=d&&this.isMidiRoot(h),f=o*e,p=e-.3;this.windowStart!==-1&&h>=this.windowStart&&h<this.windowStart+this.windowSize&&(i=Math.min(i,f),r=Math.max(r,f+e)),t.push(ft`
        <g>
          <rect
            class="white-key ${d?"active":""} ${u?"root-key":""}"
            x="${f}%"
            y="0"
            width="${p}%"
            height="100%"
          />
          <text
            x="${(o+.5)*e}%"
            y="90%"
            text-anchor="middle"
            fill="${u?"#c25233":d?"#ab8b61":"#736b5c"}"
            font-size="7px"
            font-weight="700"
            font-family="var(--font-mono)"
            style="pointer-events: none; user-select: none;"
          >
            ${c}${u?"R":""}
          </text>
        </g>
      `)}for(let o=0;o<4;o++){const a=o*7;for(const c of fp){const l=a+c.offset,h={"C#":1,"D#":3,"F#":6,"G#":8,"A#":10},d=36+o*12+h[c.name],u=this.isMidiActive(d),f=u&&this.isMidiRoot(d),p=l*e-e*.3,m=e*.6;this.windowStart!==-1&&d>=this.windowStart&&d<this.windowStart+this.windowSize&&(i=Math.min(i,p),r=Math.max(r,p+m)),n.push(ft`
          <g>
            <rect
               class="black-key ${u?"active":""} ${f?"root-key":""}"
              x="${p}%"
              y="0"
              width="${m}%"
              height="60%"
            />
            ${u?ft`
              <text
                x="${p+m*.5}%"
                y="45%"
                text-anchor="middle"
                fill="${f?"#fbf4f0":"#d5cdba"}"
                font-size="6px"
                font-weight="700"
                font-family="var(--font-mono)"
                style="pointer-events: none; user-select: none;"
              >
                ${c.name.replace("#","♯")}${f?"R":""}
              </text>
            `:""}
          </g>
        `)}}return M`
      <div class="keyboard-container">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <!-- White Active Gradient (Ochre/Gold) -->
            <linearGradient id="white-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fbf4f0" />
              <stop offset="100%" stop-color="#ab8b61" />
            </linearGradient>
            
            <!-- Black Active Gradient (Terracotta Red) -->
            <linearGradient id="black-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c25233" />
              <stop offset="100%" stop-color="#87291c" />
            </linearGradient>

            <!-- Root Active Gradient (Bright Terracotta) -->
            <linearGradient id="root-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e05c35" />
              <stop offset="100%" stop-color="#c25233" />
            </linearGradient>
          </defs>
          
          <!-- White Keys -->
          <g>${t}</g>
          
          <!-- Highlight Overlay -->
          ${this.windowStart!==-1&&r>i?ft`
            <rect 
              x="${i}%" y="0" 
              width="${r-i}%" height="100%" 
              fill="rgba(171, 139, 97, 0.12)" 
              stroke="var(--accent-gold)" stroke-width="1.5" 
              rx="2px"
              style="pointer-events: none;"
            />
          `:""}
          
          <!-- Black Keys Overlay -->
          <g>${n}</g>
        </svg>
      </div>
    `}};Et.styles=en`
    :host {
      display: block;
      width: 100%;
    }
    
    .keyboard-container {
      position: relative;
      width: 100%;
      height: 140px;
      background: var(--bg-card);
      border-radius: 8px;
      border: none;
      padding: 8px;
      box-shadow: var(--neu-pressed);
      box-sizing: border-box;
    }
    
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .white-key {
      fill: #fbf4f0;
      stroke: #736b5c;
      stroke-width: 1;
      rx: 2px;
      transition: fill 0.2s ease, transform 0.1s ease;
    }
    
    .white-key:hover {
      fill: #f5ece5;
    }
    
    .white-key.active {
      fill: url(#white-active-grad);
      stroke: #ab8b61;
    }
    
    .white-key.active.root-key {
      fill: url(#root-active-grad);
      stroke: #c25233;
    }
    
    .black-key {
      fill: #1e1915;
      stroke: #0a0805;
      stroke-width: 1;
      rx: 1px;
      transition: fill 0.2s ease, transform 0.1s ease;
    }
    
    .black-key:hover {
      fill: #2d2620;
    }
    
    .black-key.active {
      fill: url(#black-active-grad);
      stroke: #ab8b61;
    }
    
    .black-key.active.root-key {
      fill: url(#root-active-grad);
      stroke: #c25233;
    }
  `;$n([te({type:Array})],Et.prototype,"activeNotes",2);$n([te({type:String})],Et.prototype,"rootNoteName",2);$n([te({type:Number})],Et.prototype,"windowStart",2);$n([te({type:Number})],Et.prototype,"windowSize",2);Et=$n([tn("chord-keyboard")],Et);var gp=Object.defineProperty,vp=Object.getOwnPropertyDescriptor,Me=(s,e,t,n)=>{for(var i=n>1?void 0:n?vp(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&gp(e,t,i),i};let be=class extends Je{constructor(){super(...arguments),this.sections=[],this.activeLocation=null,this.isPlaying=!1,this.isLooping=!1,this.collapsed=!1,this.activeNotes=[],this.rootNoteName="",this.windowStartMidi=60,this.bpm=80,this.viewedSectionId=null,this.humanLoaded=!1,this.showHuman=!1,this.isEditing=!1,this.showHumanInsideEditor=!1,this.dragStartX=0,this.dragStartWin=0,this.isDraggingVoicing=!1}connectedCallback(){super.connectedCallback(),import("https://warmsynths.github.io/human-midi/human-engine.js").then(()=>{this.humanLoaded=!0}).catch(t=>{console.warn("Could not load human panel:",t)})}handlePlayToggle(){this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}handleLoopToggle(){this.dispatchEvent(new CustomEvent("toggle-loop",{bubbles:!0,composed:!0}))}handleClear(){this.dispatchEvent(new CustomEvent("clear-timeline",{bubbles:!0,composed:!0}))}handleHumanChange(s){this.dispatchEvent(new CustomEvent("human-state-change",{detail:s.detail,bubbles:!0,composed:!0}))}handleHumanPreview(s){this.dispatchEvent(new CustomEvent("human-preview",{detail:s.detail,bubbles:!0,composed:!0}))}handleStepClick(s,e){this.dispatchEvent(new CustomEvent("select-step",{detail:{sectionId:s,index:e},bubbles:!0,composed:!0}))}handleStepDblClick(s,e){this.isEditing=!0}exitEditMode(){this.isEditing=!1,this.dispatchEvent(new CustomEvent("select-step",{detail:null,bubbles:!0,composed:!0}))}navigateStep(s){if(!this.activeLocation)return;const e=this.sections.findIndex(r=>r.id===this.activeLocation.sectionId);if(e===-1)return;let t=e,n=this.activeLocation.stepIndex+s;if(n<0)if(t>0)t--,n=this.sections[t].steps.length-1;else return;else if(n>=this.sections[t].steps.length)if(t<this.sections.length-1)t++,n=0;else return;const i=this.sections[t];this.handleStepClick(i.id,n)}handleRemoveStep(s,e,t){s.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-step",{detail:{sectionId:e,index:t},bubbles:!0,composed:!0}))}handleToggleCollapse(){this.dispatchEvent(new CustomEvent("toggle-collapse",{bubbles:!0,composed:!0}))}handleDuplicateSection(s){this.dispatchEvent(new CustomEvent("duplicate-section",{detail:{sectionId:s},bubbles:!0,composed:!0}))}handleDeleteSection(s){this.dispatchEvent(new CustomEvent("delete-section",{detail:{sectionId:s},bubbles:!0,composed:!0}))}handleRenameSection(s,e){const t=s.target;this.dispatchEvent(new CustomEvent("rename-section",{detail:{sectionId:e,name:t.value},bubbles:!0,composed:!0}))}handleAddSection(){this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}handleKeyboardPointerDown(s){const e=s.currentTarget;this.dragStartX=s.clientX,this.dragStartWin=this.windowStartMidi,this.isDraggingVoicing=!0,e.setPointerCapture(s.pointerId)}getNextWhiteKey(s,e){const t=[0,2,4,5,7,9,11];let n=s;for(let i=0;i<12;i++)if(n+=e,t.includes(n%12))return n;return s+e}handleKeyboardPointerMove(s){if(!this.isDraggingVoicing)return;const e=s.clientX-this.dragStartX,t=Math.round(e/15);let n=this.dragStartWin;if(t>0)for(let i=0;i<t;i++)n=this.getNextWhiteKey(n,1);else if(t<0)for(let i=0;i<Math.abs(t);i++)n=this.getNextWhiteKey(n,-1);n=Math.max(36,Math.min(71,n)),n!==this.windowStartMidi&&this.dispatchEvent(new CustomEvent("change-voicing-window",{detail:{windowStartMidi:n},bubbles:!0,composed:!0}))}handleKeyboardPointerUp(){this.isDraggingVoicing&&(this.isDraggingVoicing=!1,this.dispatchEvent(new CustomEvent("play-active-chord",{bubbles:!0,composed:!0})))}handleExtensionChange(s){this.dispatchEvent(new CustomEvent("change-extension",{detail:{extension:s},bubbles:!0,composed:!0}))}handleKeyboardWheel(s){s.preventDefault();const t=(Math.abs(s.deltaX)>Math.abs(s.deltaY)?s.deltaX:s.deltaY)>0?1:-1;let n=this.getNextWhiteKey(this.windowStartMidi,t);n=Math.max(36,Math.min(71,n)),n!==this.windowStartMidi&&this.dispatchEvent(new CustomEvent("change-voicing-window",{detail:{windowStartMidi:n},bubbles:!0,composed:!0}))}willUpdate(s){s.has("activeLocation")&&(this.activeLocation?this.viewedSectionId=this.activeLocation.sectionId:this.isEditing=!1),s.has("sections")&&(this.sections.length>0?(!this.viewedSectionId||!this.sections.find(e=>e.id===this.viewedSectionId))&&(this.viewedSectionId=this.sections[0].id):this.viewedSectionId=null)}updated(s){super.updated(s),s.has("activeLocation")&&this.activeLocation&&setTimeout(()=>this.scrollActiveStepIntoView(),50)}scrollActiveStepIntoView(){const s=this.renderRoot.querySelector(".chord-chip.active"),e=this.renderRoot.querySelector(".timeline-scroll-container");if(s&&e){const t=e.getBoundingClientRect(),n=s.getBoundingClientRect(),r=n.left-t.left+e.scrollLeft-t.width/2+n.width/2;e.scrollTo({left:r,behavior:"smooth"})}}getTensionClass(s){if(!s)return"1";if(s.includes("%")){const e=parseInt(s,10);return isNaN(e)||e<=25?"1":e<=50?"2":e<=75?"3":"4"}if(s.startsWith("T")){const e=s.charAt(1);if(["1","2","3","4"].includes(e))return e}return"1"}render(){const s=this.sections.length>0,e=this.sections.reduce((n,i)=>n+i.steps.length,0);if(this.collapsed)return M`
        <div class="collapsed-container" @click="${this.handleToggleCollapse}">
          <div class="collapsed-left">
            <span class="collapsed-title">
              Progression <span style="color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono);">(${e} Chords, ${this.sections.length} Sections)</span>
            </span>
            ${s?M`
              <span class="collapsed-preview">
                ${this.sections[0].steps.slice(0,4).map((n,i)=>M`
                  <span class="collapsed-chip">${n?n.name:"Empty"}</span>
                  ${i<Math.min(3,this.sections[0].steps.length-1)?M`
                    <span style="opacity: 0.4;">➔</span>
                  `:""}
                `)}
                ${e>4?"...":""}
              </span>
            `:M`
              <span class="empty-msg" style="margin-left: 10px; color: var(--text-muted); font-size: 0.8rem;">Empty progression. Expand to configure.</span>
            `}
          </div>
          <button class="btn-icon" title="Reveal Deck">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      `;const t=this.sections.find(n=>n.id===this.viewedSectionId)||this.sections[0];return M`
      <!-- Global Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn-primary" ?disabled="${!s}" @click="${this.handlePlayToggle}">
            ${this.isPlaying?M`
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg> <span class="btn-text">Pause</span>
            `:M`
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg> <span class="btn-text">Play</span>
            `}
          </button>
          
          <button class="btn-loop btn-icon ${this.isLooping?"active":""}" @click="${this.handleLoopToggle}" title="Toggle Loop">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
        </div>
        
        <div class="toolbar-center">
          <span class="toolbar-title">
            Progression Builder <span class="count">(${this.sections.length} ${this.sections.length===1?"Section":"Sections"})</span>
          </span>
        </div>
        
        <div class="toolbar-right">
          <button class="btn-danger btn-icon" ?disabled="${!s}" @click="${this.handleClear}" title="Clear All">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button class="btn-icon" @click="${this.handleToggleCollapse}" title="Hide Deck">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Section Tabs & Operations -->
      ${s?M`
        <div class="section-tabs-row">
          <div class="tabs-list">
            ${this.sections.map(n=>M`
              <div class="section-tab ${this.viewedSectionId===n.id?"active":""}" @click="${()=>this.viewedSectionId=n.id}">
                ${this.viewedSectionId===n.id?M`
                  <input 
                    class="tab-input" 
                    size="${Math.max(5,n.name.length)}"
                    .value="${n.name}" 
                    @change="${i=>this.handleRenameSection(i,n.id)}"
                    @click="${i=>i.stopPropagation()}"
                    title="Rename Section"
                    placeholder="Section Name"
                  />
                  <svg class="icon-rename" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                `:M`
                  <span>${n.name}</span>
                `}
              </div>
            `)}
            
            <button class="btn-add-section-inline" @click="${this.handleAddSection}" title="Add New Section">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div class="tab-actions">
            ${(()=>{if(!t)return"";const n=this.sections.length<=1;return M`
                <button class="btn-tab-action" @click="${()=>this.handleDuplicateSection(t.id)}" title="Duplicate Section">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span class="btn-text">Duplicate</span>
                </button>
                
                <button class="btn-tab-action btn-danger" ?disabled="${n}" @click="${()=>this.handleDeleteSection(t.id)}" title="Delete Section">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span class="btn-text">Delete</span>
                </button>
              `})()}
          </div>
        </div>
      `:""}

      <!-- Main Content Area -->
      <div class="timeline-content">
        <div class="progression-content-wrap">
          ${s?this.renderSection(t):M`
            <div class="empty-timeline-box">
              No chords added yet. Explore options in the next options panel to begin building your progression.
            </div>
          `}
        </div>
        
        <!-- Inline Chord Editor Drawer -->
        ${s&&this.activeLocation&&this.isEditing?M`
          <div class="chord-editor-drawer">
            ${this.renderChordEditor()}
          </div>
        `:""}
      </div>
    `}renderChordEditor(){if(!this.activeLocation)return"";const s=this.sections.find(c=>c.id===this.activeLocation.sectionId);if(!s)return"";const e=s.steps[this.activeLocation.stepIndex],t=this.sections.reduce((c,l)=>c+l.steps.length,0);let n=0;for(const c of this.sections){if(c.id===this.activeLocation.sectionId){n+=this.activeLocation.stepIndex;break}n+=c.steps.length}const i=n===0,r=n===t-1,o=e?e.name:"Empty Slot",a=e?.extension||"7th";return M`
      <div class="chord-editor-container">
        <!-- Editor Header -->
        <div class="editor-header">
          <div class="editor-title-wrap">
            <span class="editor-label">Chord Voice</span>
            <div class="editor-info">
              <span class="chord-name-badge">${o}</span>
              <span class="step-index-badge">Step ${n+1} of ${t}</span>
            </div>
          </div>
          
          <div class="editor-actions-wrap">
            <div class="editor-nav-group">
              <button class="btn-nav-step" ?disabled="${i}" @click="${()=>this.navigateStep(-1)}" title="Previous Step">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Prev
              </button>
              <button class="btn-nav-step" ?disabled="${r}" @click="${()=>this.navigateStep(1)}" title="Next Step">
                Next
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <button class="btn-close-editor" @click="${this.exitEditMode}" title="Close Editor">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Close
            </button>
          </div>
        </div>

        <!-- Editor Keyboard and Extension controls -->
        ${this.activeNotes.length>0?M`
          <div style="width: 100%; position: relative;">
            <div class="keyboard-drag-wrap"
                 title="Drag left/right or scroll to shift voicing octave position"
                 @pointerdown=${this.handleKeyboardPointerDown}
                 @pointermove=${this.handleKeyboardPointerMove}
                 @pointerup=${this.handleKeyboardPointerUp}
                 @pointercancel=${this.handleKeyboardPointerUp}
                 @wheel=${this.handleKeyboardWheel}>
              <chord-keyboard 
                .activeNotes=${this.activeNotes} 
                .rootNoteName=${this.rootNoteName}
                .windowStart=${this.windowStartMidi}
                .windowSize=${13}
              ></chord-keyboard>
            </div>
            <div class="keyboard-guide-text">
              ← Drag horizontally or scroll on keyboard to shift octave position →
            </div>
          </div>

          <div class="editor-controls-row">
            <!-- Extension Buttons -->
            <div class="extension-group">
              ${["triad","7th","9th","6th"].map(c=>M`
                <button 
                  class="btn-extension ${a===c?"active":""}" 
                  @click=${()=>this.handleExtensionChange(c)}
                >
                  ${c.toUpperCase()}
                </button>
              `)}
            </div>

            <!-- Humanize Toggle -->
            ${this.humanLoaded?M`
              <button 
                class="btn-humanize-toggle ${this.showHumanInsideEditor?"active":""}" 
                @click=${()=>this.showHumanInsideEditor=!this.showHumanInsideEditor}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                MIDI Humanize
              </button>
            `:null}
          </div>

          <!-- Humanize Sub-panel -->
          ${this.humanLoaded&&this.showHumanInsideEditor?M`
            <div class="human-panel-container">
              <human-panel 
                .heading=${"MIDI Humanization Settings"}
                .hideInput=${!0} 
                .debugExpanded=${!1}
                @human-change=${this.handleHumanChange}
                @human-preview=${this.handleHumanPreview}
              ></human-panel>
            </div>
          `:null}
        `:M`
          <div class="empty-timeline-box" style="height: 100px; padding: 20px;">
            Voicing configuration is loaded when a valid chord is selected.
          </div>
        `}
      </div>
    `}renderSection(s){return s?M`
      <div class="timeline-scroll-container">
        <div class="timeline-track">
          ${s.steps.map((e,t)=>{const n=this.activeLocation?.sectionId===s.id&&this.activeLocation?.stepIndex===t,i=this.sections[0]?.id===s.id&&t===0;return M`
              <div class="step-wrapper">
                <div class="chord-chip ${n?"active":""} ${e?"":"empty-slot"}" 
                     @click="${()=>this.handleStepClick(s.id,t)}"
                     @dblclick="${()=>this.handleStepDblClick(s.id,t)}">
                  
                  <div class="chip-led ${n?"led-active":""}"></div>
                  <div class="chip-index">${String(t+1).padStart(2,"0")}</div>
                  
                  ${e?M`
                    <div class="chip-name">${e.name}</div>
                    <div class="chip-tension-row">
                      <span class="chip-tension-badge tension-${this.getTensionClass(e.tension)}">${e.tension}</span>
                      ${e.extension&&e.extension!=="7th"?M`
                        <span class="chip-ext-badge">${e.extension.toUpperCase()}</span>
                      `:""}
                    </div>
                    
                    <button class="btn-remove-step" @click="${r=>this.handleRemoveStep(r,s.id,t)}" title="Remove step">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  `:M`
                    <div class="chip-name empty-text">Empty</div>
                    ${i?"":M`
                      <button class="btn-remove-step" @click="${r=>this.handleRemoveStep(r,s.id,t)}" title="Remove empty slot">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    `}
                  `}
                </div>

                ${t<s.steps.length-1?M`
                  <div class="step-connector">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                `:""}
              </div>
            `})}
        </div>
      </div>
    `:""}};be.styles=en`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      --accent-cyan: var(--accent-terracotta, #c25233);
      --accent-purple: var(--accent-gold, #ab8b61);
      --accent-blue: #87291c;
      font-family: var(--font-body, 'Space Grotesk', sans-serif);
    }
    
    /* ── Collapsed state ── */
    .collapsed-container {
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      background: var(--bg-card);
      border-radius: 16px;
    }
    
    .collapsed-container:hover {
      background: rgba(255, 255, 255, 0.02);
    }
    
    .collapsed-left {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    
    .collapsed-title {
      font-family: var(--font-heading);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .collapsed-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    
    .collapsed-chip {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 3px 8px;
      font-weight: 700;
      font-size: 0.75rem;
      color: var(--text-secondary);
      box-shadow: var(--neu-flat-sm);
    }
    
    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-color);
      background: transparent;
    }

    .toolbar-left, .toolbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toolbar-center {
      text-align: center;
    }

    .toolbar-title {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 800;
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .toolbar-title .count {
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 600;
      font-family: var(--font-mono);
      margin-left: 4px;
    }

    /* ── Hardware Buttons ── */
    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-heading);
      cursor: pointer;
      border: none;
      background: var(--bg-card);
      color: var(--text-primary);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: var(--neu-flat-sm);
      white-space: nowrap;
      user-select: none;
    }
    
    button:hover:not(:disabled) {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
      transform: translateY(-1px);
    }
    
    button:active:not(:disabled) {
      box-shadow: var(--neu-pressed);
      transform: translateY(0);
    }
    
    button:disabled {
      opacity: 0.25;
      cursor: not-allowed;
      box-shadow: none;
    }
    
    .btn-primary {
      color: var(--accent-terracotta);
    }
    
    .btn-primary:hover:not(:disabled) {
      color: var(--text-primary);
      background: var(--accent-terracotta);
      box-shadow: 0 4px 12px rgba(194, 82, 51, 0.2);
    }
    
    .btn-loop.active {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed);
      background: rgba(171, 139, 97, 0.05);
    }

    .btn-danger {
      color: var(--accent-terracotta);
    }
    
    .btn-danger:hover:not(:disabled) {
      background: #87291c;
      color: #fff;
    }

    .btn-icon {
      padding: 8px;
      width: 32px;
      height: 32px;
      justify-content: center;
      border-radius: 50%;
    }
    
    /* ── Section tabs row ── */
    .section-tabs-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    
    .tabs-list {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .section-tab {
      padding: 6px 14px;
      border-radius: 20px;
      background: var(--bg-card);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-heading);
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid transparent;
    }
    
    .section-tab:hover {
      color: var(--text-primary);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .section-tab.active {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed);
      background: var(--bg-primary);
      border-color: rgba(171, 139, 97, 0.15);
    }

    .tab-input {
      background: transparent;
      border: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      outline: none;
      padding: 0;
      margin: 0;
      cursor: text;
      border-bottom: 1px dashed var(--accent-gold);
    }
    
    .icon-rename {
      opacity: 0.5;
      flex-shrink: 0;
    }

    .btn-add-section-inline {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--neu-flat-sm);
      background: var(--bg-card);
      color: var(--text-muted);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-add-section-inline:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
      transform: scale(1.05);
    }

    .tab-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-tab-action {
      padding: 6px 12px;
      font-size: 0.72rem;
      border-radius: 6px;
      box-shadow: var(--neu-flat-sm);
    }
    
    /* ── Content area ── */
    .timeline-content {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .progression-content-wrap {
      width: 100%;
    }

    /* ── Sequencer Track ── */
    .timeline-scroll-container {
      width: 100%;
      overflow-x: auto;
      padding: 12px 4px;
      border-radius: 12px;
      background: var(--bg-card);
      box-shadow: var(--neu-pressed);
    }

    .timeline-track {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 12px;
      min-width: max-content;
    }

    .empty-timeline-box {
      width: 100%;
      padding: 30px 20px;
      text-align: center;
      background: var(--bg-card);
      border-radius: 12px;
      box-shadow: var(--neu-pressed);
      font-size: 0.85rem;
      color: var(--text-muted);
      font-style: italic;
      line-height: 1.4;
    }

    .step-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .step-connector {
      color: var(--text-muted);
      opacity: 0.35;
      font-size: 0.75rem;
      font-weight: 800;
      user-select: none;
    }
    
    /* ── Tactile Step Pad ── */
    .chord-chip {
      width: 106px;
      height: 72px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: var(--bg-card);
      box-shadow: var(--neu-flat-sm);
      cursor: pointer;
      user-select: none;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.01);
      padding: 8px 6px;
    }
    
    .chord-chip:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat);
      border-color: rgba(171, 139, 97, 0.1);
    }
    
    .chord-chip.active {
      box-shadow: var(--neu-pressed);
      transform: translateY(0);
      border-color: rgba(194, 82, 51, 0.25);
      background: rgba(194, 82, 51, 0.02);
    }

    .chord-chip.empty-slot {
      background: rgba(255, 255, 255, 0.01);
      border: 1px dashed var(--border-color);
      box-shadow: var(--neu-pressed-sm);
    }

    .chord-chip.empty-slot:hover {
      box-shadow: var(--neu-pressed);
      border-color: var(--accent-gold);
    }
    
    /* Step LED Dot */
    .chip-led {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 6px;
      left: 8px;
      transition: all 0.2s ease;
      box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5);
    }

    .chord-chip.active .chip-led {
      background: var(--accent-terracotta);
      box-shadow: 0 0 8px var(--accent-terracotta), 0 0 12px var(--accent-terracotta);
    }

    /* Step Index */
    .chip-index {
      font-size: 0.62rem;
      font-family: var(--font-mono);
      font-weight: 700;
      color: var(--text-muted);
      position: absolute;
      top: 4px;
      right: 8px;
    }

    .chord-chip.active .chip-index {
      color: var(--accent-gold);
    }
    
    .chip-name {
      font-size: 0.88rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-top: 6px;
      text-align: center;
      letter-spacing: -0.01em;
    }

    .empty-text {
      color: var(--text-muted) !important;
      font-weight: 500;
      font-size: 0.8rem;
    }
    
    .chip-tension-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 6px;
    }

    .chip-tension-badge {
      font-size: 0.6rem;
      font-weight: 700;
      font-family: var(--font-mono);
      padding: 1px 4px;
      border-radius: 3px;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
    }

    .chip-tension-badge.tension-1 { color: var(--tension-1); background: rgba(171, 139, 97, 0.08); }
    .chip-tension-badge.tension-2 { color: var(--tension-1); background: rgba(171, 139, 97, 0.08); }
    .chip-tension-badge.tension-3 { color: var(--tension-3); background: rgba(194, 82, 51, 0.08); }
    .chip-tension-badge.tension-4 { color: var(--tension-4); background: rgba(135, 41, 28, 0.12); }

    .chip-ext-badge {
      font-size: 0.58rem;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
      background: rgba(171, 139, 97, 0.1);
      color: var(--accent-gold);
    }

    /* Remove Step Hover Button */
    .btn-remove-step {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--bg-card);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.2s ease;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      z-index: 10;
      padding: 0;
    }
    
    .chord-chip:hover .btn-remove-step {
      opacity: 1;
    }
    
    .btn-remove-step:hover {
      color: var(--accent-terracotta);
      border-color: var(--accent-terracotta);
      transform: scale(1.1);
    }

    /* ── Chord Editor Drawer ── */
    .chord-editor-drawer {
      margin-top: 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--neu-pressed-sm);
      animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chord-editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    .editor-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .editor-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-info .chord-name-badge {
      color: var(--accent-terracotta);
      font-weight: 800;
      font-size: 0.95rem;
      background: rgba(194, 82, 51, 0.08);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(194, 82, 51, 0.15);
      letter-spacing: 0.02em;
    }

    .editor-info .step-index-badge {
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 600;
      background: rgba(255, 255, 255, 0.02);
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
    }

    .editor-actions-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-nav-group {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--bg-primary);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .btn-nav-step {
      padding: 5px 10px;
      font-size: 0.7rem;
      font-weight: 700;
      background: transparent;
      box-shadow: none;
      border-radius: 6px;
    }

    .btn-nav-step:hover:not(:disabled) {
      color: var(--accent-gold);
      background: rgba(255,255,255,0.03);
      box-shadow: none;
    }

    .btn-nav-step:disabled {
      opacity: 0.2;
    }

    .btn-close-editor {
      padding: 6px 10px;
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .btn-close-editor:hover {
      color: var(--accent-terracotta);
    }

    .keyboard-guide-text {
      font-size: 0.65rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 4px;
      font-family: var(--font-mono);
      letter-spacing: 0.02em;
    }

    .editor-controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 8px;
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
    }

    .extension-group {
      display: flex;
      gap: 6px;
      flex: 1;
      min-width: 260px;
    }

    .btn-extension {
      flex: 1;
      padding: 8px 10px;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 6px;
    }

    .btn-extension.active {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed);
      background: rgba(194, 82, 51, 0.05);
    }

    .btn-humanize-toggle {
      padding: 8px 14px;
      font-size: 0.75rem;
      border: 1px solid transparent;
    }

    .btn-humanize-toggle.active {
      color: var(--accent-terracotta);
      border-color: rgba(194, 82, 51, 0.15);
      background: rgba(194, 82, 51, 0.04);
      box-shadow: var(--neu-pressed);
    }

    .human-panel-container {
      margin-top: 8px;
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
      width: 100%;
      overflow-x: auto;
      box-sizing: border-box;
    }

    human-panel {
      --human-bg: transparent;
      --human-surface: var(--bg-primary);
      --human-border: var(--border-color);
      --human-text-primary: var(--text-primary);
      --human-text-secondary: var(--text-secondary);
      --human-accent: var(--accent-terracotta);
      --human-accent-hover: var(--accent-gold);
      display: block;
      width: 100%;
      min-width: 280px;
    }

    /* ── Mobile Responsive ── */
    @media (max-width: 768px) {
      .toolbar {
        padding: 10px 16px;
        gap: 8px;
      }
      .toolbar-title {
        font-size: 0.85rem;
      }
      .toolbar-title .count {
        font-size: 0.72rem;
      }
      .section-tabs-row {
        padding: 10px 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .tabs-list {
        justify-content: flex-start;
      }
      .tab-actions {
        justify-content: flex-end;
      }
      .chord-editor-container {
        gap: 12px;
      }
      .editor-header {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .editor-actions-wrap {
        justify-content: space-between;
      }
      .editor-controls-row {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .extension-group {
        min-width: 0;
      }
    }

    @media (max-width: 500px) {
      .btn-text {
        display: none;
      }
      .btn-primary {
        padding: 8px;
        min-width: 32px;
        width: 32px;
        height: 32px;
        justify-content: center;
        border-radius: 50%;
      }
      .btn-tab-action {
        padding: 8px;
        min-width: 32px;
        width: 32px;
        height: 32px;
        justify-content: center;
        border-radius: 50%;
      }
      .btn-tab-action svg {
        margin: 0 !important;
      }
      .btn-primary svg {
        margin: 0 !important;
      }
    }
  `;Me([te({type:Array})],be.prototype,"sections",2);Me([te({type:Object})],be.prototype,"activeLocation",2);Me([te({type:Boolean})],be.prototype,"isPlaying",2);Me([te({type:Boolean})],be.prototype,"isLooping",2);Me([te({type:Boolean})],be.prototype,"collapsed",2);Me([te({type:Array})],be.prototype,"activeNotes",2);Me([te({type:String})],be.prototype,"rootNoteName",2);Me([te({type:Number})],be.prototype,"windowStartMidi",2);Me([te({type:Number})],be.prototype,"bpm",2);Me([z()],be.prototype,"viewedSectionId",2);Me([z()],be.prototype,"humanLoaded",2);Me([z()],be.prototype,"showHuman",2);Me([z()],be.prototype,"isEditing",2);Me([z()],be.prototype,"showHumanInsideEditor",2);be=Me([tn("chord-timeline")],be);var yp=Object.defineProperty,xp=Object.getOwnPropertyDescriptor,Ze=(s,e,t,n)=>{for(var i=n>1?void 0:n?xp(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&yp(e,t,i),i};const bp={MAJOR:[0,2,4,5,7,9,11],MIXOLYDIAN:[0,2,4,5,7,9,10],DORIAN:[0,2,3,5,7,9,10],LYDIAN:[0,2,4,6,7,9,11],"NATURAL MINOR":[0,2,3,5,7,8,10],"HARMONIC MINOR":[0,2,3,5,7,8,11]},pr=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],fr={MAJOR:{emoji:"☀️",title:"Sunlit Harbor",subtitle:"Major / Ionian"},MIXOLYDIAN:{emoji:"🌊",title:"The Warm Current",subtitle:"Mixolydian Mode"},DORIAN:{emoji:"🌆",title:"The Twilight Hour",subtitle:"Dorian Mode"},LYDIAN:{emoji:"🌫️",title:"The Floating Mist",subtitle:"Lydian Mode"},"NATURAL MINOR":{emoji:"🌌",title:"Clear Night",subtitle:"Natural Minor / Aeolian"},"HARMONIC MINOR":{emoji:"⛈️",title:"The Storm",subtitle:"Harmonic Minor"}},Cs=[{id:"MAJOR",emoji:"☀️",title:"Sunlit Harbor",subtitle:"Major / Ionian",desc:"A clear, optimistic vibe of home and sanctuary. Excellent for open, joyous landscapes and peaceful resolution.",phase:1},{id:"MIXOLYDIAN",emoji:"🌊",title:"The Warm Current",subtitle:"Mixolydian Mode",desc:"A sun-drenched, fluid breeze. Mixolydian introduces a mellow, flattened 7th degree, delivering classic neo-soul warmth and smooth electronic movement.",phase:1},{id:"DORIAN",emoji:"🌆",title:"The Twilight Hour",subtitle:"Dorian Mode",desc:"A smooth, cinematic dusk. The Dorian Mode blends a minor foundation with a bright major twist, perfect for sophisticated, driving lofi tracks.",phase:2},{id:"LYDIAN",emoji:"🌫️",title:"The Floating Mist",subtitle:"Lydian Mode",desc:"An ethereal, weightless drift. With its raised 4th degree, Lydian creates a suspended, dreamlike atmosphere.",phase:2},{id:"NATURAL MINOR",emoji:"🌌",title:"Clear Night",subtitle:"Natural Minor / Aeolian",desc:"A midnight journey into shadow and solitude. Charts introspective, melancholic vibes, capturing deep emotional groundings and quiet nostalgia.",phase:3},{id:"HARMONIC MINOR",emoji:"⛈️",title:"The Storm",subtitle:"Harmonic Minor",desc:"A dramatic crossing filled with gravitational friction. The Harmonic Minor Scale introduces exotic mystery and heightened tension.",phase:3}],_p=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],wp=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Tp=.012;let Le=class extends Je{constructor(){super(...arguments),this.compactMode=!1,this.chordDataLoaded=!1,this.viewState="choose",this.selectedScaleType=null,this.scanProgress=0,this.scanTimeLeft=5,this.liveChroma=new Array(12).fill(0),this.scanResults=[],this.micError="",this.isScanActive=!1,this.audioContext=null,this.meydaAnalyzer=null,this.micStream=null,this.scanTimer=null,this.progressTimer=null,this.chromaAccumulator=new Array(12).fill(0),this.detectedPitches=new Set,this.frameCount=0}disconnectedCallback(){super.disconnectedCallback(),this.teardownAudio()}async startScan(){this.micError="",this.chromaAccumulator=new Array(12).fill(0),this.detectedPitches=new Set,this.liveChroma=new Array(12).fill(0),this.frameCount=0,this.scanProgress=0,this.scanTimeLeft=5,this.isScanActive=!0,this.viewState="scanning";try{this.micStream=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1})}catch(r){this.micError=r.name==="NotAllowedError"?"Microphone access was denied. Please allow mic access and try again.":"Could not access microphone. Please check your device settings.",this.isScanActive=!1,this.viewState="choose";return}let s;try{const r=await hp(()=>import("./meyda.min-CzN0FPY1.js").then(o=>o.m),[],import.meta.url);s=r.default??r}catch{this.micError="Audio analysis library failed to load. Please refresh the page.",this.teardownAudio(),this.viewState="choose";return}this.audioContext=new AudioContext;const e=this.audioContext.createMediaStreamSource(this.micStream);this.meydaAnalyzer=s.createMeydaAnalyzer({audioContext:this.audioContext,source:e,bufferSize:2048,featureExtractors:["chroma","rms"],callback:r=>{if(!r||!r.chroma||r.rms<Tp)return;this.frameCount++,r.chroma.forEach((a,c)=>{this.chromaAccumulator[c]+=a});const o=Math.max(...this.chromaAccumulator,1e-4);this.liveChroma=this.chromaAccumulator.map(a=>a/o)}}),this.meydaAnalyzer.start();const t=5e3,n=50;let i=0;this.progressTimer=setInterval(()=>{i+=n,this.scanProgress=Math.min(100,i/t*100),this.scanTimeLeft=Math.max(0,Math.ceil((t-i)/1e3))},n),this.scanTimer=setTimeout(()=>this.stopScan(),t)}stopScan(){if(this.scanTimer&&(clearTimeout(this.scanTimer),this.scanTimer=null),this.progressTimer&&(clearInterval(this.progressTimer),this.progressTimer=null),this.meydaAnalyzer)try{this.meydaAnalyzer.stop()}catch{}this.isScanActive=!1,this.scanProgress=100,this.scanTimeLeft=0;const s=this.computeScaleMatches();this.teardownAudio(),this.scanResults=s,this.viewState=s.length>0?"results":"choose",s.length===0&&(this.micError="No clear pitches detected. Try playing a riff or melody and scan again.")}teardownAudio(){if(this.meydaAnalyzer){try{this.meydaAnalyzer.stop()}catch{}this.meydaAnalyzer=null}if(this.micStream&&(this.micStream.getTracks().forEach(s=>s.stop()),this.micStream=null),this.audioContext){try{this.audioContext.close()}catch{}this.audioContext=null}}computeScaleMatches(){if(this.frameCount===0)return[];const s=this.chromaAccumulator.map(h=>h/this.frameCount),e=Math.max(...s);if(e<.01)return[];const t=.3,n=new Set(s.reduce((h,d,u)=>(d/e>=t&&h.push(u),h),[]));if(n.size===0)return[];let i=-1,r=-1;n.forEach(h=>{s[h]>r&&(r=s[h],i=h)});const o=[],a=n.size<=2?.1:.28;for(const[h,d]of Object.entries(bp))for(let u=0;u<12;u++){const f=new Set(d.map(y=>(y+u)%12));let p=0;for(const y of n)f.has(y)&&p++;const m=f.size+n.size-p;let g=m>0?p/m:0;u===i&&(g+=.25),g>=a&&o.push({scaleType:h,root:pr[u],rootIndex:u,score:Math.min(1,g)})}o.sort((h,d)=>d.score-h.score);const c=new Set,l=[];for(const h of o){const d=`${h.root}_${h.scaleType}`;if(!c.has(d)&&(c.add(d),l.push(h),l.length>=5))break}return l}dispatchScaleSelected(s,e){this.dispatchEvent(new CustomEvent("scale-selected",{detail:{key:s,scaleType:e},bubbles:!0,composed:!0}))}handleManualScaleTypeSelect(s){this.selectedScaleType=s,this.viewState="key-select"}handleKeySelect(s){this.selectedScaleType&&this.dispatchScaleSelected(s,this.selectedScaleType)}handleResultClick(s){this.selectedScaleType=s.scaleType,this.dispatchScaleSelected(s.root,s.scaleType)}renderChooseView(){return M`
      <div class="choose-view">
        <div class="hero-heading">
          <div class="hero-title">Start Your Voyage</div>
          <div class="hero-sub">Choose how you want to set sail</div>
        </div>

        ${this.micError?M`
          <div class="error-banner">${this.micError}</div>
        `:""}

        <div class="dual-pane">
          <!-- Path A: Audio Scan -->
          <div class="path-card path-a" @click="${()=>this.startScan()}" role="button" tabindex="0"
               @keydown="${s=>s.key==="Enter"&&this.startScan()}">
            <div class="path-icon">
              <div class="sonar-ring"></div>
              <div class="sonar-ring ring-2"></div>
              <span class="path-emoji">🎙️</span>
            </div>
            <div class="path-label">Record</div>
            <div class="path-desc">
              Point your microphone at your instrument. We'll analyse the pitches in your riff and suggest the perfect scale context.
            </div>
            <div class="path-cta">
              <span class="cta-dot"></span> Auto-detect my key
            </div>
          </div>

          <!-- Divider -->
          <div class="path-divider">
            <div class="divider-line"></div>
            <span class="divider-or">or</span>
            <div class="divider-line"></div>
          </div>

          <!-- Path B: Manual -->
          <div class="path-card path-b" @click="${()=>{this.viewState="manual"}}" role="button" tabindex="0"
               @keydown="${s=>s.key==="Enter"&&(this.viewState="manual")}">
            <div class="path-icon">
              <span class="path-emoji">🗺️</span>
            </div>
            <div class="path-label">Manual</div>
            <div class="path-desc">
              Browse all six weather-themed scale landscapes and hand-pick your key. Full control, zero guesswork.
            </div>
            <div class="path-cta">
              <span class="cta-dot cta-dot-b"></span> Pick my own scale
            </div>
          </div>
        </div>
      </div>
    `}renderScanningView(){return M`
      <div class="scanning-view">
        <div class="scan-header">
          <div class="scan-title">Listening…</div>
          <div class="scan-sub">Play a brief riff or melody on your instrument now</div>
        </div>

        <!-- Pulsing sonar animation -->
        <div class="sonar-container">
          <div class="sonar-outer ring-pulse ring-1"></div>
          <div class="sonar-outer ring-pulse ring-2"></div>
          <div class="sonar-outer ring-pulse ring-3"></div>
          <div class="sonar-core">
            <span class="sonar-icon">🎙️</span>
          </div>
        </div>

        <!-- 12 note indicators -->
        <div class="note-indicators" aria-label="Live pitch indicators">
          ${pr.map((s,e)=>{const t=Math.min(1,this.liveChroma[e]??0),n=t>.5,i=t>=.3;return M`
              <div
                class="note-pip ${n?"note-active":""} ${i&&!n?"note-detected":""}"
                style="--energy: ${t};"
                title="${s}"
              >
                <span class="note-label">${s}</span>
              </div>
            `})}
        </div>


        <!-- Progress bar -->
        <div class="scan-progress-bar" role="progressbar" aria-valuenow="${this.scanProgress}" aria-valuemax="100">
          <div class="scan-progress-fill" style="width: ${this.scanProgress}%"></div>
        </div>
        <div class="scan-timer">${this.scanTimeLeft}s remaining</div>

        <button class="btn-stop" @click="${()=>this.stopScan()}">
          ⬛ Stop Scanning
        </button>
      </div>
    `}renderResultsView(){const s=this.scanResults;return M`
      <div class="results-view">
        <div class="results-header">
          <div class="results-title">🌐 Weather Forecast</div>
          <div class="results-sub">Your melody best matches these harmonic climates</div>
        </div>

        <div class="results-list">
          ${s.map((e,t)=>{const n=fr[e.scaleType],i=Math.round(e.score*100),r=t===0;return M`
              <div
                class="result-card ${r?"result-best":""}"
                @click="${()=>this.handleResultClick(e)}"
                role="button"
                tabindex="0"
                @keydown="${o=>o.key==="Enter"&&this.handleResultClick(e)}"
              >
                <div class="result-rank">${r?"🏆":`#${t+1}`}</div>
                <div class="result-emoji">${n?.emoji??"🎵"}</div>
                <div class="result-body">
                  <div class="result-name">${e.root} ${n?.title??e.scaleType}</div>
                  <div class="result-subtitle">${e.root} ${n?.subtitle??e.scaleType}</div>
                </div>
                <div class="result-score-wrap">
                  <div class="result-score-bar">
                    <div class="result-score-fill ${r?"fill-best":""}" style="width: ${i}%"></div>
                  </div>
                  <div class="result-pct">${i}%</div>
                </div>
              </div>
            `})}
        </div>

        <div class="results-actions">
          <button class="btn-rescan" @click="${()=>{this.scanResults=[],this.micError="",this.viewState="choose"}}">
            ← Try Again
          </button>
          <button class="btn-rescan btn-manual-fallback" @click="${()=>{this.viewState="manual"}}">
            Browse Manually
          </button>
        </div>
      </div>
    `}renderManualView(){return M`
      <div class="manual-view">
        <button class="btn-back" @click="${()=>this.viewState="choose"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        <div class="setup-title">Start your journey</div>
        ${this.compactMode?"":M`
          <div class="setup-desc">
            Select an emotional scale landscape to begin writing. These define the general moods of transitions and determine your composition's starting pitch context.
          </div>
        `}

        <div class="phases-container">
          <div class="phase-section">
            <div class="phase-header">Phase 1: Bright / Day Navigation</div>
            <div class="scale-grid">${Cs.filter(s=>s.phase===1).map(s=>this.renderScaleCard(s))}</div>
          </div>
          <div class="phase-section">
            <div class="phase-header">Phase 2: Deepening Waters / Transition</div>
            <div class="scale-grid">${Cs.filter(s=>s.phase===2).map(s=>this.renderScaleCard(s))}</div>
          </div>
          <div class="phase-section">
            <div class="phase-header">Phase 3: Dark / Night Exploration &amp; Turbulence</div>
            <div class="scale-grid">${Cs.filter(s=>s.phase===3).map(s=>this.renderScaleCard(s))}</div>
          </div>
        </div>
      </div>
    `}renderScaleCard(s){return M`
      <div class="scale-card" @click="${()=>this.handleManualScaleTypeSelect(s.id)}" role="button" tabindex="0"
           @keydown="${e=>e.key==="Enter"&&this.handleManualScaleTypeSelect(s.id)}">
        <div class="scale-card-header">
          <div class="scale-emoji">${s.emoji}</div>
          <div class="scale-header-text">
            <div class="scale-name">${s.title}</div>
            <div class="scale-subtitle">${s.subtitle}</div>
          </div>
        </div>
        ${this.compactMode?"":M`<div class="scale-desc">${s.desc}</div>`}
      </div>
    `}renderKeySelectView(){const s=this.selectedScaleType==="NATURAL MINOR"||this.selectedScaleType==="HARMONIC MINOR"||this.selectedScaleType==="DORIAN",e=s?wp:_p,t=s?"Min":"Maj",n=this.selectedScaleType?fr[this.selectedScaleType]:null;return M`
      <div class="key-select-view">
        <button class="btn-back" @click="${()=>this.viewState=this.scanResults.length>0?"results":"manual"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        ${n?M`
          <div class="key-select-context">
            <span class="key-select-emoji">${n.emoji}</span>
            <div>
              <div class="setup-title">${n.title}</div>
              <div class="scale-subtitle">${n.subtitle}</div>
            </div>
          </div>
        `:M`<div class="setup-title">Choose a Tonic Key</div>`}

        ${this.compactMode?"":M`
          <div class="setup-desc">
            Select the starting tonic key root. This sets the pitch registers and vocal limits for your composition.
          </div>
        `}

        <div class="key-grid">
          ${e.map(i=>M`
            <button class="btn-key" @click="${()=>this.handleKeySelect(i)}">
              ${i} ${t}
            </button>
          `)}
        </div>
      </div>
    `}render(){return M`
      <div class="onboarding-root">
        ${this.viewState==="choose"?this.renderChooseView():""}
        ${this.viewState==="scanning"?this.renderScanningView():""}
        ${this.viewState==="results"?this.renderResultsView():""}
        ${this.viewState==="manual"?this.renderManualView():""}
        ${this.viewState==="key-select"?this.renderKeySelectView():""}
      </div>
    `}};Le.styles=en`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      width: 100%;
    }

    .onboarding-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 24px;
      gap: 24px;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
      min-height: 400px;
    }

    /* ── Shared typography ── */
    .setup-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .setup-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 640px;
    }

    /* ── Error banner ── */
    .error-banner {
      background: rgba(194, 82, 51, 0.15);
      border: 1px solid rgba(194, 82, 51, 0.4);
      color: var(--accent-terracotta);
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      max-width: 600px;
      text-align: center;
    }

    /* ─────────────────── CHOOSE VIEW ─────────────────── */
    .choose-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      width: 100%;
    }

    .hero-heading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .hero-title {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      font-family: var(--font-heading);
      background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent-terracotta));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-sub {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .dual-pane {
      display: flex;
      align-items: stretch;
      gap: 0;
      width: 100%;
      max-width: 780px;
    }

    .path-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 36px 28px;
      background: var(--bg-card);
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: var(--neu-flat);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .path-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .path-a::before {
      background: radial-gradient(ellipse at top, rgba(194, 82, 51, 0.06) 0%, transparent 70%);
    }

    .path-b::before {
      background: radial-gradient(ellipse at top, rgba(196, 157, 80, 0.06) 0%, transparent 70%);
    }

    .path-card:hover::before { opacity: 1; }

    .path-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--neu-flat-sm), 0 12px 40px rgba(0,0,0,0.15);
    }

    .path-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    /* Sonar rings on the icon area */
    .path-icon {
      position: relative;
      width: 88px;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sonar-ring {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid rgba(194, 82, 51, 0.25);
      animation: sonarPulse 2.4s ease-out infinite;
    }

    .sonar-ring:nth-child(1) { width: 88px; height: 88px; animation-delay: 0s; }
    .sonar-ring.ring-2       { width: 64px; height: 64px; animation-delay: 0.6s; }

    .path-a:hover .sonar-ring {
      border-color: rgba(194, 82, 51, 0.5);
    }

    @keyframes sonarPulse {
      0%   { transform: scale(0.7); opacity: 0.8; }
      100% { transform: scale(1.35); opacity: 0; }
    }

    .path-emoji {
      font-size: 2.6rem;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 0 8px rgba(194, 82, 51, 0));
      transition: filter 0.3s ease;
    }

    .path-a:hover .path-emoji { filter: drop-shadow(0 0 12px rgba(194, 82, 51, 0.4)); }
    .path-b:hover .path-emoji { filter: drop-shadow(0 0 12px rgba(196, 157, 80, 0.4)); }

    .path-label {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      font-family: var(--font-heading);
      letter-spacing: 0.01em;
    }

    .path-desc {
      font-size: 0.87rem;
      color: var(--text-secondary);
      line-height: 1.55;
      max-width: 260px;
    }

    .path-cta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--accent-terracotta);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: auto;
    }

    .path-b .path-cta { color: var(--accent-gold); }

    .cta-dot {
      width: 7px;
      height: 7px;
      background: var(--accent-terracotta);
      border-radius: 50%;
      animation: ctaBlink 1.4s ease-in-out infinite;
    }

    .cta-dot-b {
      background: var(--accent-gold);
      animation: none;
    }

    @keyframes ctaBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }

    /* Divider between two paths */
    .path-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      gap: 8px;
      flex-shrink: 0;
    }

    .divider-line {
      width: 1px;
      flex: 1;
      background: var(--border-color);
    }

    .divider-or {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    @media (max-width: 620px) {
      .dual-pane {
        flex-direction: column;
        gap: 0;
      }
      .path-divider {
        flex-direction: row;
        padding: 12px 0;
      }
      .divider-line {
        width: auto;
        height: 1px;
        flex: 1;
      }
    }

    /* ─────────────────── SCANNING VIEW ─────────────────── */
    .scanning-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .scan-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }

    .scan-title {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .scan-sub {
      font-size: 0.92rem;
      color: var(--text-secondary);
      max-width: 420px;
    }

    /* Sonar animation */
    .sonar-container {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sonar-outer {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid var(--accent-terracotta);
    }

    .ring-pulse {
      animation: ringExpand 2s ease-out infinite;
    }

    .ring-pulse.ring-1 { width: 140px; height: 140px; animation-delay: 0s; }
    .ring-pulse.ring-2 { width: 140px; height: 140px; animation-delay: 0.6s; }
    .ring-pulse.ring-3 { width: 140px; height: 140px; animation-delay: 1.2s; }

    @keyframes ringExpand {
      0%   { transform: scale(0.3); opacity: 0.9; border-color: rgba(194, 82, 51, 0.9); }
      80%  { opacity: 0.1; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .sonar-core {
      width: 70px;
      height: 70px;
      background: var(--bg-card);
      border-radius: 50%;
      box-shadow: var(--neu-flat-sm), 0 0 20px rgba(194, 82, 51, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      animation: corePulse 1.5s ease-in-out infinite;
    }

    @keyframes corePulse {
      0%, 100% { box-shadow: var(--neu-flat-sm), 0 0 15px rgba(194, 82, 51, 0.15); }
      50%       { box-shadow: var(--neu-flat-sm), 0 0 30px rgba(194, 82, 51, 0.35); }
    }

    .sonar-icon { font-size: 2rem; }

    /* 12 note indicators */
    .note-indicators {
      display: flex;
      gap: 6px;
      align-items: flex-end;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 600px;
    }

    .note-pip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.1s ease;
    }

    .note-label {
      font-size: 0.68rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--text-muted);
      transition: color 0.15s ease;
      min-width: 22px;
      text-align: center;
    }

    .note-pip::before {
      content: '';
      display: block;
      width: 28px;
      height: calc(6px + var(--energy, 0) * 50px);
      background: var(--bg-card);
      border-radius: 4px 4px 2px 2px;
      box-shadow: var(--neu-pressed-sm);
      transition: height 0.1s ease, background 0.15s ease, box-shadow 0.15s ease;
      min-height: 6px;
    }

    .note-pip.note-active .note-label { color: var(--accent-terracotta); }
    .note-pip.note-active::before {
      background: linear-gradient(180deg, var(--accent-terracotta) 0%, rgba(194,82,51,0.4) 100%);
      box-shadow: 0 0 8px rgba(194, 82, 51, 0.4);
    }

    .note-pip.note-detected .note-label { color: var(--accent-gold); }
    .note-pip.note-detected:not(.note-active)::before {
      background: rgba(196, 157, 80, 0.25);
      box-shadow: 0 0 4px rgba(196, 157, 80, 0.2);
    }

    /* Progress bar */
    .scan-progress-bar {
      width: 100%;
      max-width: 440px;
      height: 4px;
      background: var(--bg-card);
      box-shadow: var(--neu-pressed-sm);
      border-radius: 2px;
      overflow: hidden;
    }

    .scan-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-terracotta), var(--accent-gold));
      border-radius: 2px;
      transition: width 0.05s linear;
    }

    .scan-timer {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .btn-stop {
      padding: 12px 28px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      color: var(--accent-terracotta);
      font-weight: 700;
      font-size: 0.9rem;
      font-family: var(--font-heading);
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
      letter-spacing: 0.03em;
    }

    .btn-stop:hover {
      box-shadow: var(--neu-pressed-sm);
      color: var(--text-primary);
    }

    /* ─────────────────── RESULTS VIEW ─────────────────── */
    .results-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .results-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }

    .results-title {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .results-sub {
      font-size: 0.92rem;
      color: var(--text-secondary);
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 640px;
    }

    .result-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      background: var(--bg-card);
      border-radius: 12px;
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      border: 1.5px solid transparent;
      text-align: left;
    }

    .result-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent-gold);
      box-shadow: var(--neu-flat-sm), 0 6px 24px rgba(0,0,0,0.12);
    }

    .result-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    .result-best {
      border-color: var(--accent-terracotta) !important;
      box-shadow: var(--neu-flat), 0 0 18px rgba(194, 82, 51, 0.15);
    }

    .result-rank {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-muted);
      min-width: 32px;
      text-align: center;
      font-family: var(--font-mono);
    }

    .result-best .result-rank { color: var(--accent-gold); }

    .result-emoji { font-size: 1.8rem; }

    .result-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .result-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .result-subtitle {
      font-size: 0.78rem;
      color: var(--text-secondary);
      opacity: 0.75;
    }

    .result-score-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
      min-width: 80px;
    }

    .result-score-bar {
      width: 72px;
      height: 5px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .result-score-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-gold), var(--accent-terracotta));
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .result-score-fill.fill-best {
      background: linear-gradient(90deg, var(--accent-terracotta), #ff8f5e);
    }

    .result-pct {
      font-size: 0.82rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--text-secondary);
    }

    .result-best .result-pct { color: var(--accent-terracotta); }

    .results-actions {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .btn-rescan {
      padding: 10px 20px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
    }

    .btn-rescan:hover {
      box-shadow: var(--neu-pressed-sm);
      color: var(--text-primary);
    }

    .btn-manual-fallback { color: var(--text-muted); }

    /* ─────────────────── MANUAL VIEW ─────────────────── */
    .manual-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      text-align: center;
    }

    .phases-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
      margin-top: 8px;
    }

    .phase-section { display: flex; flex-direction: column; gap: 12px; }

    .phase-header {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 6px;
      text-align: left;
    }

    .scale-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }

    .scale-card {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 22px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: calc(50% - 8px);
      box-sizing: border-box;
      border: 1.5px solid transparent;
    }

    .scale-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat-sm);
      border-color: var(--accent-gold);
    }

    .scale-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    @media (max-width: 600px) { .scale-card { width: 100%; } }

    .scale-card-header { display: flex; align-items: center; gap: 12px; }

    .scale-emoji {
      font-size: 1.9rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }

    .scale-header-text { display: flex; flex-direction: column; gap: 3px; }

    .scale-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .scale-subtitle {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--text-secondary);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .scale-desc {
      font-size: 0.83rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* ─────────────────── KEY SELECT VIEW ─────────────────── */
    .key-select-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .key-select-context {
      display: flex;
      align-items: center;
      gap: 16px;
      justify-content: center;
    }

    .key-select-emoji { font-size: 2.5rem; }

    .key-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 10px;
      width: 100%;
      max-width: 560px;
    }

    .btn-key {
      padding: 16px 10px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      color: var(--text-primary);
      font-family: var(--font-heading);
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
      border: 1.5px solid transparent;
    }

    .btn-key:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
      border-color: rgba(194, 82, 51, 0.3);
    }

    /* ─────────────────── BACK BUTTON ─────────────────── */
    .btn-back {
      padding: 8px 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
      font-family: var(--font-heading);
    }

    .btn-back:hover {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
    }

    @media (max-width: 500px) {
      .key-select-context {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
      .key-select-emoji {
        font-size: 2.2rem;
      }
      .setup-title {
        font-size: 1.5rem !important;
      }
    }
  `;Ze([te({type:Boolean})],Le.prototype,"compactMode",2);Ze([te({type:Boolean})],Le.prototype,"chordDataLoaded",2);Ze([z()],Le.prototype,"viewState",2);Ze([z()],Le.prototype,"selectedScaleType",2);Ze([z()],Le.prototype,"scanProgress",2);Ze([z()],Le.prototype,"scanTimeLeft",2);Ze([z()],Le.prototype,"liveChroma",2);Ze([z()],Le.prototype,"scanResults",2);Ze([z()],Le.prototype,"micError",2);Ze([z()],Le.prototype,"isScanActive",2);Le=Ze([tn("onboarding-landing")],Le);var Sp=Object.defineProperty,kp=Object.getOwnPropertyDescriptor,K=(s,e,t,n)=>{for(var i=n>1?void 0:n?kp(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&Sp(e,t,i),i};const Ns={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72};let Y=class extends Je{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeProfile=null,this.sections=[],this.activeLocation=null,this.isPlaying=!1,this.isLooping=!1,this.timelineCollapsed=!0,this.compactMode=!1,this.lightMode=!1,this.projects=[],this.currentProjectId=null,this.currentProjectName="Untitled Project",this.showProjectModal=!1,this.showShareModal=!1,this.showCloudPromptModal=!1,this.shareModalToast="",this.selectedShareDevice="m8",this.isAuthenticated=!1,this.authUserEmail="",this.authError="",this.activeOptionsTab="diatonic",this.humanState=null,this.AUTHORIZED_HASHES=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"],this.previewVoicing="middle",this.driveService=new na,this.tokenClient=null,this.isDriveSyncing=!1,this.setupStep="scale",this.selectedScaleType=null,this.showSeaMonster=!1,this.seaMonsterSpawnSide="bottom",this.playTimeoutId=null,this.seaMonsterTimeoutId=null,this.showSun=!1,this.sunTimeoutId=null,this.showWind=!1,this.windTimeoutId=null,this.windEasterEggTriggered=!1,this.lastSelectStepTime=0}connectedCallback(){super.connectedCallback(),this.projects=ke.getProjects()}async firstUpdated(){const s=localStorage.getItem("chord-voyager-compact-mode");s&&(this.compactMode=s==="true"),localStorage.getItem("chord-voyager-light-mode")==="true"&&(this.lightMode=!0,document.documentElement.classList.add("light-theme"));try{console.log("Fetching chord_voyager_data.json...");const n=await fetch("./chord_voyager_data.json");if(!n.ok)throw new Error(`HTTP error: ${n.status}`);if(this.chordData=await n.json(),this.chordData&&this.chordData.scales){const o={C:"F",Db:"Gb",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},a={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},c={C:"G",Db:"Ab",D:"A",Eb:"Bb",E:"B",F:"C","F#":"Db",G:"D",Ab:"Eb",A:"E",Bb:"F",B:"F#"},l={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC",LYDIAN_SUBDOMINANT:"TONIC",LYDIAN_DOMINANT:"SUPERTONIC",LYDIAN_SUBMEDIANT:"MEDIANT","LYDIAN_LEADING-TONE":"SUBDOMINANT",LYDIAN_TONIC:"DOMINANT",LYDIAN_SUPERTONIC:"SUBMEDIANT",LYDIAN_MEDIANT:"LEADING-TONE"},h={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT",LYDIAN_TONIC:"SUBDOMINANT",LYDIAN_SUPERTONIC:"DOMINANT",LYDIAN_MEDIANT:"SUBMEDIANT",LYDIAN_SUBDOMINANT:"LEADING-TONE",LYDIAN_DOMINANT:"TONIC",LYDIAN_SUBMEDIANT:"SUPERTONIC","LYDIAN_LEADING-TONE":"MEDIANT"};for(const[d,u]of Object.entries(o)){const f=`${u}_MAJOR`,p=this.chordData.scales[f];if(!p)continue;const m=`${d}_MIXOLYDIAN`,g={};for(const y of["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"]){const w=h[`MIXOLYDIAN_${y}`],T=p.degrees[w];if(!T)continue;const S=JSON.parse(JSON.stringify(T));S.next_chord_options=(S.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${u}_MAJOR_`)){const b=v.nodeId.replace(`${u}_MAJOR_`,""),_=l[`MIXOLYDIAN_${b}`];if(_)return{name:v.name,nodeId:`${d}_MIXOLYDIAN_${_}`}}return v}),g[y]=S}this.chordData.scales[m]={root:d,type:"MIXOLYDIAN",degrees:g}}for(const[d,u]of Object.entries(a)){const f=`${u}_MAJOR`,p=this.chordData.scales[f];if(!p)continue;const m=`${d}_DORIAN`,g={};for(const y of["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"]){const w=h[`DORIAN_${y}`],T=p.degrees[w];if(!T)continue;const S=JSON.parse(JSON.stringify(T));S.next_chord_options=(S.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${u}_MAJOR_`)){const b=v.nodeId.replace(`${u}_MAJOR_`,""),_=l[`DORIAN_${b}`];if(_)return{name:v.name,nodeId:`${d}_DORIAN_${_}`}}return v}),g[y]=S}this.chordData.scales[m]={root:d,type:"DORIAN",degrees:g}}for(const[d,u]of Object.entries(c)){const f=`${u}_MAJOR`,p=this.chordData.scales[f];if(!p)continue;const m=`${d}_LYDIAN`,g={};for(const y of["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","LEADING-TONE"]){const w=h[`LYDIAN_${y}`],T=p.degrees[w];if(!T)continue;const S=JSON.parse(JSON.stringify(T));S.next_chord_options=(S.next_chord_options||[]).map(v=>{if(v.nodeId.startsWith(`${u}_MAJOR_`)){const b=v.nodeId.replace(`${u}_MAJOR_`,""),_=l[`LYDIAN_${b}`];if(_)return{name:v.name,nodeId:`${d}_LYDIAN_${_}`}}return v}),g[y]=S}this.chordData.scales[m]={root:d,type:"LYDIAN",degrees:g}}}const i=this.chordData.scales?Object.keys(this.chordData.scales).length:0,r=this.chordData.chords?Object.keys(this.chordData.chords).length:0;console.log(`Loaded ${i} scales and ${r} unique chords.`)}catch(n){console.error("Failed to load chord voyager data:",n)}localStorage.getItem("chord_voyager_auth_token"),localStorage.getItem("chord_voyager_auth_email");const t=localStorage.getItem("chord-voyager-auth");if(window.location.search.includes("bypass=true"))this.isAuthenticated=!0,this.authUserEmail="developer@local.test";else if(t){const n=await this.hashEmail(t);this.AUTHORIZED_HASHES.includes(n)?(this.isAuthenticated=!0,this.authUserEmail=t):this.initGoogleAuth()}else this.initGoogleAuth()}initGoogleAuth(){const s=setInterval(()=>{window.google&&(clearInterval(s),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async e=>{if(e&&e.access_token)try{const t=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${e.access_token}`}});if(!t.ok)throw new Error("Failed to fetch user info");const n=await t.json();if(n&&n.email){const i=await this.hashEmail(n.email);if(this.AUTHORIZED_HASHES.includes(i)){this.isAuthenticated=!0,this.authUserEmail=n.email,this.authError="",localStorage.setItem("chord-voyager-auth",n.email),this.driveService.setAccessToken(e.access_token),await this.syncProjectsFromCloud(),await this.syncProjectsToCloud();return}}this.isAuthenticated=!1,this.authUserEmail="",this.authError="Access Denied: Email not authorized."}catch(t){this.authError="Login failed. Please try again.",console.error(t)}}}))},200)}requestDriveAccess(){this.tokenClient&&this.tokenClient.requestAccessToken()}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const s=await this.driveService.loadProjects();if(s){s.forEach(n=>n.syncedToCloud=!0);const e=ke.getProjects(),t=ke.mergeProjects(e,s);ke.setProjects(t),this.projects=t}}catch(s){console.error("Failed to sync from cloud",s)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(this.isAuthenticated&&!this.isDriveSyncing){if(!this.driveService.hasAccessToken()){this.requestDriveAccess();return}this.isDriveSyncing=!0;try{const s=ke.getProjects();await this.driveService.saveProjects(s),s.forEach(e=>e.syncedToCloud=!0),ke.setProjects(s),this.projects=s}catch(s){console.error("Failed to sync to cloud",s),s instanceof Error&&s.message.includes("Unauthorized")&&this.requestDriveAccess()}finally{this.isDriveSyncing=!1}}}async hashEmail(s){const t=new TextEncoder().encode(s),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}handleLogout(){this.isAuthenticated=!1,this.authUserEmail="",localStorage.removeItem("chord-voyager-auth"),this.initGoogleAuth()}playChordNotes(s){np(s,Ns,this.humanState)}normalizeChordName(s){const e=s.toUpperCase(),t=e.match(/^([A-G](?:#|B|X)?)(.*)$/);if(!t)return e;const n=t[1],i=t[2];let r="MAJ";return!i||i==="7"||i.startsWith("MAJ")||i==="M7"?r="MAJ":i.startsWith("MIN")?r="MIN":i.startsWith("DIM")?r="DIM":i.startsWith("AUG")?r="AUG":i.startsWith("XDIM")&&(r="XDIM"),n+r}resolveProfile(s){if(!this.chordData||!this.chordData.scales)return null;const e=s.split("_");if(e.length<3)return null;const t=e[0],n=e[e.length-1];e.slice(1,e.length-1).join(" ");const i=`${t}_${e.slice(1,e.length-1).join("_")}`,r=this.chordData.scales[i];if(!r)return null;const o=r.degrees[n];if(!o)return null;const a=this.chordData.chords[o.chord_name];if(!a)return null;const c=`${r.root} ${r.type} SCALE`,l=this.generateActiveChordDescription(o.chord_name,n,c),h=this.getCurrentProgressionHistory(),d=(o.next_chord_options||[]).map(u=>{const p=u.nodeId,m=this.getVibeKeyForOption(p,!1),g=this.calculateDynamicTension(u.name,h),y=this.generateDynamicDescription(o.chord_name,u.name,m,p.split("_").pop()||"");return{name:u.name,nodeId:p,targetChordId:p,tension:`${g}%`,vibe:m,description:y}});return{header:n,chord_name:o.chord_name,chord_notes:a.notes,hex_values:a.hex_values,scale:c,function_text:l,voicings_listed:a.voicings_listed,next_chord_options:d}}calculateDynamicTension(s,e){if(!this.activeProfile)return 50;const t=this.activeProfile.scale.split(" ")[0]||"C",n=s.match(/^[A-G][#b]?/)?.[0]||"C",i=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],r=i.indexOf(t.replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#")),o=i.indexOf(n.replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#"));if(r===-1||o===-1)return 50;switch((o-r+12)%12){case 0:return 10;case 7:return 80;case 5:return 45;case 2:return 40;case 9:return 30;case 4:return 20;case 11:return 90;case 1:case 8:case 3:case 10:case 6:return 95;default:return 50}}generateActiveChordDescription(s,e,t){const n=t.toUpperCase().includes("MAJOR"),i=e.toUpperCase();return i==="TONIC"?n?`The ${s} chord is the stable Tonic of the key, serving as the home foundation. It provides a complete sense of resolution, clarity, and peace.`:`The ${s} chord is the minor Tonic of the key, creating a reflective, introspective home. It feels deeply grounded yet carries a shaded, thoughtful mood.`:i==="DOMINANT"||i==="LEADING-TONE"?`Operating as a dominant force, ${s} creates significant tension and gravity. It establishes a strong harmonic pull that naturally directs the ear back to the tonic home.`:i==="SUBDOMINANT"||i==="SUPERTONIC"?`Functioning as a subdominant, ${s} introduces a pleasant sense of departure and lift. It expands the musical horizon and sets up the transition toward dominant tension.`:i==="MEDIANT"||i==="SUBMEDIANT"?`As a tonic substitute, ${s} offers a soft, introspective variation of the key's center. It blends feelings of stability with subtle emotional color.`:`The ${s} chord functions within the ${t}, contributing unique color and voice leading to the overall progression.`}generateDynamicDescription(s,e,t,n,i){const r={MAJOR:[`Transitioning to ${e} brings a profound sense of resolution and stability. It feels like returning to the sunlit harbor, anchoring the progression.`,`Moving to the bright tonic ${e} establishes a clear point of rest and clarity, offering a warm and welcoming release.`],MIXOLYDIAN:[`Transitioning to ${e} brings a sun-drenched, fluid breeze. It introduces a mellow warmth and smooth movement.`,`Moving to ${e} carries the warm current of Mixolydian, delivering classic neo-soul warmth and smooth movement.`],DORIAN:[`Shifting to ${e} evokes the smooth, cinematic dusk of Dorian. It blends a minor foundation with a bright, sophisticated twist.`,`The Dorian character of ${e} grounds the harmony in a twilight mood, perfect for driving lofi vibes.`],LYDIAN:[`Stepping into ${e} feels like an ethereal, weightless drift. Lydian's raised fourth degree creates a suspended, dreamlike atmosphere.`,`Moving to ${e} carries you into a floating mist, where the boundaries of the key dissolve in a suspended glow.`],"NATURAL MINOR":[`Shifting to ${e} introduces the quiet, introspective calm of a clear night. It feels like retreating into a peaceful, shadowed space of solitude.`,`The minor chord ${e} grounds the harmony in a reflective, gentle mood, inviting deep emotional grounding.`],"HARMONIC MINOR":[`Progressing to ${e} introduces the dramatic friction of a storm. It injects heightened tension and exotic mystery.`,`The harmonic minor force of ${e} creates a powerful sense of friction and gravity, actively demanding resolution.`],"MELODIC MINOR":[`Transitioning to ${e} introduces a mysterious, fluid motion. Melodic minor offers a sophisticated path between light and shadow.`,`Moving to ${e} adds a touch of melodic mystery, shifting gracefully between major-like brightness and minor introspection.`]},o=r[t.toUpperCase()]||r.MAJOR,a=(s.charCodeAt(0)+e.charCodeAt(0))%o.length;return o[a]}getVibeKeyForOption(s,e){const t=s.split("_"),n=t[t.length-1];if(e)return t.length>2&&t.slice(1,t.length-1).join(" ").toUpperCase()||"MAJOR";const i=this.selectedScaleType||"MAJOR";return n==="DOMINANT"||n==="LEADING-TONE"?"HARMONIC MINOR":n==="TONIC"||n==="MEDIANT"||n==="SUBMEDIANT"?["MAJOR","MIXOLYDIAN","LYDIAN"].includes(i)?"MAJOR":"NATURAL MINOR":i==="LYDIAN"?"LYDIAN":["MAJOR","MIXOLYDIAN"].includes(i)?"MIXOLYDIAN":"DORIAN"}getCurrentProgressionHistory(){const s=[];for(const e of this.sections)for(const t of e.steps)t&&s.push(t.name);return s}getTargetIdByChordName(s){if(!this.chordData||!this.chordData.scales)return null;for(const[e,t]of Object.entries(this.chordData.scales))for(const[n,i]of Object.entries(t.degrees))if(i.chord_name===s)return`${t.root}_${t.type.replace(/ /g,"_")}_${n}`;return null}get borrowedChordOptions(){if(!this.activeProfile||!this.chordData||!this.chordData.scales)return[];const s=this.activeProfile.scale.split(" ")[0],e=this.activeProfile.scale,t=this.getCurrentProgressionHistory(),n=[],i=new Set;for(const[r,o]of Object.entries(this.chordData.scales))if(o.root===s&&`${o.root} ${o.type} SCALE`!==e)for(const[a,c]of Object.entries(o.degrees)){const l=c.chord_name;if(!i.has(l)){i.add(l);const h=`${o.root}_${o.type.replace(/ /g,"_")}_${a}`,d=this.getVibeKeyForOption(h,!0),u=this.calculateDynamicTension(l,t),f=this.generateDynamicDescription(this.activeProfile.chord_name,l,d,a,`${o.root} ${o.type}`);n.push({name:l,description:f,tension:`${u}%`,vibe:d,nodeId:h,targetChordId:h})}}return n}handlePlayChordEvent(s){this.playChordNotes(s.detail.notes)}handlePreviewChordNameEvent(s){const e=this.normalizeChordName(s.detail.name),t=this.chordData.chords[e];if(t){const n={name:e,tension:"T1",mood:"0",extension:this.getActiveStepExtension(),windowStartMidi:this.getActiveStepVoicing()},i={chord_name:e,chord_notes:t.notes,voicings_listed:t.voicings_listed},r=this.getVoicedMidiNotesForStep(n,i);this.playChordNotes(r)}}getVoicedMidiNotesForStep(s,e){const t=e.chord_notes?e.chord_notes.split(" "):[];if(!t.length)return[];const n=Ns[t[0]]||60,i=n%12;let r=t.map(g=>((Ns[g]||60)-n+24)%12);const o=r.some(g=>g>=9),a=r.includes(3)&&r.includes(6),c=r.includes(4)&&r.includes(8),l=r.includes(3)&&!a,h=r.includes(4)&&!c,d=s&&s.extension?s.extension:"7th";let u=[];d==="triad"?u=r.filter(g=>g<9):d==="7th"?(u=[...r],o||(a?u.push(9):l?u.push(10):h?u.push(11):u.push(10))):d==="9th"?(u=[...r],o||(a?u.push(9):l?u.push(10):h?u.push(11):u.push(10)),u.includes(2)||u.push(2)):d==="6th"&&(u=r.filter(g=>g<9),u.includes(9)||u.push(9));const f=s&&s.windowStartMidi!==void 0?s.windowStartMidi:60,p=13,m=[];for(const g of u){let w=(i+g)%12;for(;w<f;)w+=12;for(;w<f+p;)m.includes(w)||m.push(w),w+=12}return m.sort((g,y)=>g-y)}getActiveStep(){if(!this.activeLocation)return null;const s=this.sections.find(e=>e.id===this.activeLocation.sectionId);return s&&s.steps[this.activeLocation.stepIndex]||null}updateActiveStep(s){if(!this.activeLocation)return;const e=this.sections.findIndex(n=>n.id===this.activeLocation.sectionId);if(e===-1)return;const t=this.sections[e].steps[this.activeLocation.stepIndex];t&&(s(t),this.sections=[...this.sections])}getActiveStepExtension(){const s=this.getActiveStep();return s&&s.extension?s.extension:"7th"}async handleChangeExtensionEvent(s){this.updateActiveStep(e=>e.extension=s.detail.extension),await this.updateComplete,this.handlePlayActiveChord()}getActiveStepVoicing(){const s=this.getActiveStep();return s&&s.windowStartMidi!==void 0?s.windowStartMidi:60}handleChangeVoicingWindowEvent(s){this.updateActiveStep(e=>e.windowStartMidi=s.detail.windowStartMidi)}triggerSeaMonsterEasterEgg(){document.documentElement.scrollHeight>window.innerHeight?this.seaMonsterSpawnSide=Math.random()>.5?"left":"right":this.seaMonsterSpawnSide="bottom",this.showSeaMonster=!0,this.seaMonsterTimeoutId&&clearTimeout(this.seaMonsterTimeoutId),this.seaMonsterTimeoutId=setTimeout(()=>{this.showSeaMonster=!1},5500)}triggerSunEasterEgg(){this.showSun=!0,this.sunTimeoutId&&clearTimeout(this.sunTimeoutId),this.sunTimeoutId=setTimeout(()=>{this.showSun=!1},3500)}triggerWindEasterEgg(){this.windEasterEggTriggered=!0,this.showWind=!0,this.windTimeoutId&&clearTimeout(this.windTimeoutId),this.windTimeoutId=setTimeout(()=>{this.showWind=!1},4500)}checkWindEasterEgg(){if(this.windEasterEggTriggered)return;const s=this.sections.flatMap(n=>n.steps).filter(n=>n!==null);if(s.length===0)return;s.filter(n=>n.mood==="LYDIAN").length/s.length>.5&&this.triggerWindEasterEgg()}updated(s){super.updated(s),s.has("sections")&&this.checkWindEasterEgg()}handlePlayActiveChord(){const s=this.getActiveStep();if(s&&this.activeProfile){const e=this.getVoicedMidiNotesForStep(s,this.activeProfile);this.playChordNotes(e)}}handleSelectNextChord(s){const e=s.detail.option;let t=null,n=e.nodeId;if(n&&(t=this.resolveProfile(n)),t||(n=this.getTargetIdByChordName(this.normalizeChordName(e.name))||"",n&&(t=this.resolveProfile(n))),t){this.activeProfile=t;const i={name:t.chord_name,tension:e.tension,mood:e.vibe,extension:"7th",windowStartMidi:60,targetChordId:n,nodeId:n},r=this.activeLocation?this.sections.findIndex(a=>a.id===this.activeLocation.sectionId):-1;if(r!==-1){const a=this.sections[r],c=this.activeLocation.stepIndex+1,l=a.steps[this.activeLocation.stepIndex],h=u=>{if(!u||!u.nodeId)return!1;const f=u.nodeId.split("_"),p=f[f.length-1];return p==="DOMINANT"||p==="LEADING-TONE"};l&&h(l)&&h(i)&&this.triggerSeaMonsterEasterEgg(),this.sections.reduce((u,f)=>u+f.steps.filter(p=>p!==null).length,0)+1===8&&i.mood==="MAJOR"&&this.triggerSunEasterEgg(),c<a.steps.length?(a.steps[c]===null?a.steps[c]=i:a.steps.splice(c,0,i),this.activeLocation={sectionId:a.id,stepIndex:c}):(a.steps.push(i),this.activeLocation={sectionId:a.id,stepIndex:a.steps.length-1}),this.sections=[...this.sections]}else if(this.sections.length>0){const a=this.sections[this.sections.length-1];a.steps.push(i),this.activeLocation={sectionId:a.id,stepIndex:a.steps.length-1},this.sections=[...this.sections]}const o=this.getVoicedMidiNotesForStep(i,t);this.playChordNotes(o),this.requestUpdate()}}handleSelectStep(s){const e=s.detail;if(!e){this.activeLocation=null;return}const t=this.sections.find(i=>i.id===e.sectionId);if(!t)return;const n=t.steps[e.index];if(n){let i=null,r=n.nodeId||n.targetChordId||n.target_id;if(r&&(i=this.resolveProfile(r)),i||(r=this.getTargetIdByChordName(n.name)||"",r&&(i=this.resolveProfile(r),n.nodeId=r,n.targetChordId=r)),i){const o=Date.now(),c=this.activeLocation&&this.activeLocation.sectionId===e.sectionId&&this.activeLocation.stepIndex===e.index&&o-this.lastSelectStepTime<350;if(this.lastSelectStepTime=o,this.activeProfile=i,this.activeLocation={sectionId:t.id,stepIndex:e.index},!c){const l=this.getVoicedMidiNotesForStep(n,i);this.playChordNotes(l)}}}else this.activeLocation={sectionId:t.id,stepIndex:e.index}}handleHumanPreview(s){this.humanState=s.detail;const e=this.getActiveStep();if(e&&this.activeProfile){const t=this.getVoicedMidiNotesForStep(e,this.activeProfile);this.playChordNotes(t)}}handleRemoveStep(s){if(this.sections.length>0&&this.sections[0].id===s.detail.sectionId&&s.detail.index===0)return;const e=this.sections.findIndex(o=>o.id===s.detail.sectionId);if(e===-1)return;const t=this.sections[e],n=[...t.steps],i=s.detail.index;if(n[i]===null||i===n.length-1)for(n.splice(i,1);n.length>0&&n[n.length-1]===null;)n.pop();else n[i]=null;if(t.steps=n,this.sections=[...this.sections],this.sections.every(o=>o.steps.every(a=>a===null))){this.activeProfile=null,this.activeLocation=null,this.stopProgressionPlayback();return}let r=-1;for(let o=Math.min(i-1,t.steps.length-1);o>=0;o--)if(t.steps[o]!==null){r=o;break}if(r===-1){for(let o=i+1;o<t.steps.length;o++)if(t.steps[o]!==null){r=o;break}}if(r!==-1){const o=t.steps[r];let a=null,c=o.nodeId||o.targetChordId||o.target_id;c&&(a=this.resolveProfile(c)),a||(c=this.getTargetIdByChordName(o.name)||"",c&&(a=this.resolveProfile(c),o.nodeId=c,o.targetChordId=c)),this.activeProfile=a||null,this.activeLocation={sectionId:t.id,stepIndex:r}}else this.activeProfile=null,this.activeLocation=null}handleClearTimeline(){this.sections=[],this.activeProfile=null,this.activeLocation=null,this.stopProgressionPlayback(),this.windEasterEggTriggered=!1,this.showWind=!1,this.windTimeoutId&&(clearTimeout(this.windTimeoutId),this.windTimeoutId=null)}handleAddSection(){const s={id:Math.random().toString(36).substr(2,9),name:`Section ${this.sections.length+1}`,steps:[null]};this.sections=[...this.sections,s],this.activeLocation={sectionId:s.id,stepIndex:0}}handleDuplicateSection(s){const e=this.sections.findIndex(r=>r.id===s.detail.sectionId);if(e===-1)return;const t=this.sections[e],n=t.steps.map(r=>r?{...r}:null),i={id:Math.random().toString(36).substr(2,9),name:`${t.name} (Copy)`,steps:n};this.sections.splice(e+1,0,i),this.sections=[...this.sections],this.activeLocation={sectionId:i.id,stepIndex:0}}handleDeleteSection(s){this.sections=this.sections.filter(e=>e.id!==s.detail.sectionId),this.sections.length===0?this.handleClearTimeline():this.activeLocation?.sectionId===s.detail.sectionId&&(this.activeLocation={sectionId:this.sections[0].id,stepIndex:0})}handleRenameSection(s){const e=this.sections.find(t=>t.id===s.detail.sectionId);e&&(e.name=s.detail.name,this.sections=[...this.sections])}handleOpenProjectModal(){this.projects=ke.getProjects(),this.showProjectModal=!0}handleCloseProjectModal(){this.showProjectModal=!1}handleSaveProject(){if(this.sections.length===0)return;let s=this.currentProjectId;const e=this.projects.find(n=>n.name.toLowerCase()===this.currentProjectName.toLowerCase()&&n.id!==s);if(e){if(!confirm(`A project named "${this.currentProjectName}" already exists. Overwrite it?`))return;s=e.id}else if(s){const n=this.projects.find(i=>i.id===s);if(n&&!confirm(`Overwrite loaded project "${n.name}"?`))return}s||(s=Math.random().toString(36).substr(2,9)),this.currentProjectId=s;const t={id:s,name:this.currentProjectName,lastModified:Date.now(),sections:this.sections,setupStep:this.setupStep,selectedScaleType:this.selectedScaleType};ke.saveProject(t),this.projects=ke.getProjects(),this.syncProjectsToCloud()}handleLoadProject(s){if(this.stopProgressionPlayback(),this.currentProjectId=s.id,this.currentProjectName=s.name,this.setupStep=s.setupStep,this.selectedScaleType=s.selectedScaleType,this.windEasterEggTriggered=!1,this.showWind=!1,this.windTimeoutId&&(clearTimeout(this.windTimeoutId),this.windTimeoutId=null),this.sections=s.sections,this.sections.length>0){this.activeLocation={sectionId:this.sections[0].id,stepIndex:0};const e=this.sections[0].steps.find(t=>t!==null);if(e){let t=null,n=e.nodeId||e.targetChordId||e.target_id;n&&(t=this.resolveProfile(n)),t||(n=this.getTargetIdByChordName(e.name)||"",n&&(t=this.resolveProfile(n),e.nodeId=n,e.targetChordId=n)),t&&(this.activeProfile=t)}}else this.activeLocation=null,this.activeProfile=null;this.showProjectModal=!1}handleDeleteProject(s){ke.deleteProject(s),this.projects=ke.getProjects(),this.syncProjectsToCloud(),this.currentProjectId===s&&(this.currentProjectId=null)}handleExportProject(s){ke.exportProjectFile(s)}handleImportProject(s){const e=s.target;e.files&&e.files.length>0&&ke.importProjectFile(e.files[0]).then(t=>{ke.saveProject(t),this.projects=ke.getProjects(),this.syncProjectsToCloud()}).catch(t=>alert(t.message)),e.value=""}togglePlayProgression(){this.isPlaying?this.stopProgressionPlayback():this.startProgressionPlayback()}startProgressionPlayback(){if(this.sections.length===0)return;this.isPlaying=!0;const s=this.humanState?.bpm??80,e=Math.round(2*60/s*1e3);let t=0,n=0;this.activeLocation&&(t=this.sections.findIndex(r=>r.id===this.activeLocation.sectionId),t!==-1?n=this.activeLocation.stepIndex:t=0);const i=()=>{if(!this.isPlaying)return;let r=this.sections[t],o=r?r.steps[n]:null;for(;!o&&t<this.sections.length;)n++,n>=r.steps.length?(t++,n=0,t<this.sections.length?(r=this.sections[t],o=r.steps[n]):o=null):o=r.steps[n];if(!o){this.isLooping&&this.sections.some(l=>l.steps.some(h=>h!==null))?(t=0,n=0,this.playTimeoutId=setTimeout(i,100)):this.isPlaying=!1;return}let a=null,c=o.nodeId||o.targetChordId||o.target_id;if(c&&(a=this.resolveProfile(c)),a||(c=this.getTargetIdByChordName(o.name)||"",c&&(a=this.resolveProfile(c),o.nodeId=c,o.targetChordId=c)),a){this.activeProfile=a,this.activeLocation={sectionId:r.id,stepIndex:n};const l=this.getVoicedMidiNotesForStep(o,a);this.playChordNotes(l)}if(n++,n>=r.steps.length&&(t++,n=0),t>=this.sections.length){this.isLooping&&this.sections.some(l=>l.steps.some(h=>h!==null))?(t=0,n=0,this.playTimeoutId=setTimeout(i,e)):this.playTimeoutId=setTimeout(()=>{this.stopProgressionPlayback()},e);return}this.playTimeoutId=setTimeout(i,e)};i()}stopProgressionPlayback(){this.isPlaying=!1,this.playTimeoutId&&(clearTimeout(this.playTimeoutId),this.playTimeoutId=null)}handleToggleLoop(){this.isLooping=!this.isLooping}toggleCompactMode(){this.compactMode=!this.compactMode,localStorage.setItem("chord-voyager-compact-mode",this.compactMode.toString())}toggleLightMode(){this.lightMode=!this.lightMode,localStorage.setItem("chord-voyager-light-mode",this.lightMode.toString()),document.documentElement.classList.toggle("light-theme",this.lightMode)}handleScaleTypeSelect(s){this.selectedScaleType=s,this.setupStep="tonic"}handleOnboardingScaleSelected(s){const{key:e,scaleType:t}=s.detail;this.selectedScaleType=t,this.handleKeySelect(e)}renderScaleCard(s){return M`
      <div class="scale-card" @click="${()=>this.handleScaleTypeSelect(s.id)}">
        <div class="scale-card-header">
          <div class="scale-emoji">${s.emoji}</div>
          <div class="scale-header-text">
            <div class="scale-name">${s.title}</div>
            <div class="scale-subtitle">${s.subtitle}</div>
          </div>
        </div>
        ${this.compactMode?"":M`<div class="scale-desc">${s.desc}</div>`}
      </div>
    `}handleKeySelect(s){if(!this.selectedScaleType)return;const e=`${s}_${this.selectedScaleType.replace(/ /g,"_")}`,t=`${e}_TONIC`,n=this.resolveProfile(t);if(n){this.activeProfile=n;const i=this.getVibeKeyForOption(t,!1),r={name:n.chord_name,tension:"10%",mood:i,extension:"7th",windowStartMidi:60,targetChordId:t,nodeId:t},o={id:Math.random().toString(36).substr(2,9),name:"Verse 1",steps:[r]};this.sections=[o],this.activeLocation={sectionId:o.id,stepIndex:0},this.setupStep="scale"}else console.warn(`Could not find profile for scale: ${e}`)}render(){return M`
      <div class="app-layout">
        
        <!-- Header Branding Section -->
        <header class="glass-panel" style="padding: 16px 24px;">
          <div class="branding">
            <div class="brand-title">CHORD VOYAGER</div>
            <div class="brand-sub">DYNAMIC CHORD STUDIO</div>
          </div>
          
          <!-- Header Controls -->
          <div class="header-controls">
            <div class="toggle-group">
              <button 
                class="btn-compact-toggle" 
                @click=${this.handleOpenProjectModal}
                title="Manage Projects"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
              <button 
                class="btn-compact-toggle ${this.lightMode?"active":""}" 
                @click=${this.toggleLightMode}
                title="Toggle Light/Dark Theme"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${this.lightMode?ft`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`:ft`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`}
                </svg>
              </button>
              <button 
                class="btn-compact-toggle ${this.compactMode?"active":""}" 
                @click=${this.toggleCompactMode}
                title="Toggle Compact Mode (Hide verbose text)"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${this.compactMode?ft`
                        <polyline points="4 7 4 4 20 4 20 7" opacity="0.4"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20" opacity="0.4"></line>
                        <line x1="12" y1="4" x2="12" y2="20" opacity="0.4"></line>
                        <line x1="3" y1="3" x2="21" y2="21"></line>
                      `:ft`
                        <polyline points="4 7 4 4 20 4 20 7"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20"></line>
                        <line x1="12" y1="4" x2="12" y2="20"></line>
                      `}
                </svg>
              </button>
              <button 
                class="btn-compact-toggle" 
                @click=${this.handleOpenShareModal}
                title="Share Progression"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        ${this.activeProfile===null?M`
          <div class="setup-view glass-panel">
            <onboarding-landing
              .compactMode=${this.compactMode}
              .chordDataLoaded=${Object.keys(this.chordData.scales).length>0}
              @scale-selected=${this.handleOnboardingScaleSelected}
            ></onboarding-landing>
          </div>
        `:M`
          <div class="workspace-container">
            <!-- Workspace Panel: Progression deck at the top -->
            <div class="timeline-pane glass-panel">
              <chord-timeline
                .sections="${this.sections}"
                .activeLocation="${this.activeLocation}"
                .isPlaying="${this.isPlaying}"
                .isLooping="${this.isLooping}"
                .collapsed="${this.timelineCollapsed}"
                .activeNotes="${this.activeProfile&&this.getActiveStep()?this.getVoicedMidiNotesForStep(this.getActiveStep(),this.activeProfile):[]}"
                .rootNoteName="${this.activeProfile?this.activeProfile.chord_notes.split(" ")[0]:""}"
                .windowStartMidi="${this.getActiveStepVoicing()}"
                .bpm="${this.humanState?.bpm??80}"
                @toggle-play="${this.togglePlayProgression}"
                @toggle-loop="${this.handleToggleLoop}"
                @clear-timeline="${this.handleClearTimeline}"
                @select-step="${this.handleSelectStep}"
                @remove-step="${this.handleRemoveStep}"
                @toggle-collapse="${()=>this.timelineCollapsed=!this.timelineCollapsed}"
                @duplicate-section="${this.handleDuplicateSection}"
                @delete-section="${this.handleDeleteSection}"
                @rename-section="${this.handleRenameSection}"
                @add-section="${this.handleAddSection}"
                @change-voicing-window="${this.handleChangeVoicingWindowEvent}"
                @play-active-chord="${this.handlePlayActiveChord}"
                @change-extension="${this.handleChangeExtensionEvent}"
                @human-state-change="${s=>this.humanState=s.detail}"
                @human-preview="${this.handleHumanPreview}"
              ></chord-timeline>
            </div>

            <!-- Active Workspace Panel -->
            <div class="workspace-grid glass-panel ${this.compactMode?"is-compact":""}" style="padding: 0; display: flex; flex-direction: column;">
              
              <!-- Top portion: Active Chord Profile Card -->
              <div class="chord-pane" style="border-bottom: 1px solid var(--border-color);">
                <chord-profile-card
                  .header="${this.activeProfile.header}"
                  .chordName="${this.activeProfile.chord_name}"
                  .chordNotes="${this.activeProfile.chord_notes}"
                  .scale=${this.activeProfile.scale}
                  .functionText=${this.activeProfile.function_text}
                  .voicingsListed=${this.activeProfile.voicings_listed}
                  .compactMode=${this.compactMode}
                  .extension=${this.getActiveStepExtension()}
                  .windowStartMidi=${this.getActiveStepVoicing()}
                  @play-chord=${this.handlePlayChordEvent}
                  @change-extension=${this.handleChangeExtensionEvent}
                  @change-voicing-window=${this.handleChangeVoicingWindowEvent}
                >
                  <div slot="tabs" class="compact-header-tabs">
                    <div class="options-tabs header-tabs">
                      <button 
                        class="tab-btn ${this.activeOptionsTab==="diatonic"?"active":""}" 
                        @click=${()=>this.activeOptionsTab="diatonic"}
                        title="Charted Waters"
                      >
                        ⛵
                      </button>
                      <button 
                        class="tab-btn ${this.activeOptionsTab==="borrowed"?"active":""}" 
                        @click=${()=>this.activeOptionsTab="borrowed"}
                        title="Uncharted Waters"
                      >
                        🧭
                      </button>
                    </div>
                  </div>
                </chord-profile-card>
              </div>
              
              <!-- Bottom portion: Chord Voyager options list -->
              <div class="options-pane">
                <div class="desktop-pane-tabs">
                  <div class="options-tabs">
                    <button 
                      class="tab-btn ${this.activeOptionsTab==="diatonic"?"active":""}" 
                      @click=${()=>this.activeOptionsTab="diatonic"}
                      title="Charted Waters (Diatonic Chords)"
                    >
                      ${this.compactMode?"⛵":"Charted Waters"}
                    </button>
                    <button 
                      class="tab-btn ${this.activeOptionsTab==="borrowed"?"active":""}" 
                      @click=${()=>this.activeOptionsTab="borrowed"}
                      title="Uncharted Waters (Borrowed Chords)"
                    >
                      ${this.compactMode?"🧭":"Uncharted Waters"}
                    </button>
                  </div>
                </div>
                
                ${this.compactMode?"":M`
                  <div class="tab-explanation">
                    ${this.activeOptionsTab==="diatonic"?"Cruising safe, familiar routes using diatonic chords built strictly from your active scale to provide comfortable stability.":"Venturing into mysterious, unmapped territory using borrowed chords from parallel modes to introduce tension and emotional color."}
                  </div>
                `}
                
                ${this.activeOptionsTab==="diatonic"?M`
                  <next-options-table
                    .options=${this.activeProfile.next_chord_options}
                    .compactMode=${this.compactMode}
                    @select-next-chord=${this.handleSelectNextChord}
                    @preview-chord-name="${this.handlePreviewChordNameEvent}"
                  ></next-options-table>
                `:M`
                  <next-options-table
                    .options=${this.borrowedChordOptions}
                    .compactMode=${this.compactMode}
                    @select-next-chord=${this.handleSelectNextChord}
                    @preview-chord-name="${this.handlePreviewChordNameEvent}"
                  ></next-options-table>
                `}
              </div>
              
            </div>
          </div>
        `}
        
        ${this.showProjectModal?this.renderProjectModal():""}
        ${this.showShareModal?this.renderShareModal():""}
        ${this.showCloudPromptModal?this.renderCloudPromptModal():""}
        ${this.showSeaMonster?M`<img src="/sea-monster.png" class="sea-monster-easter-egg ${this.seaMonsterSpawnSide}" alt="Sea Monster" />`:""}
        ${this.showSun?M`<img src="/sun.png" class="sun-easter-egg" alt="Sun" />`:""}
        ${this.showWind?M`<img src="/wind.png" class="wind-easter-egg" alt="Wind" />`:""}
        
        <footer class="studio-footer">
          <div class="footer-content">
            <a href="https://github.com/warmsynths/chord-voyager" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display: inline-block; vertical-align: middle;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>GitHub</a>
            <span class="footer-divider">|</span>
            <span>Made with ❤️ by <a href="mailto:warmsynthsiloveyou@gmail.com" target="_blank" rel="noopener">warmsynths</a></span>
            <span class="footer-divider">|</span>
            <a href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">☕ Support the Voyage</a>
          </div>
        </footer>
      </div>
    `}renderProjectModal(){return M`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;" @click=${this.handleCloseProjectModal}>
        <div class="glass-panel" style="width: 600px; max-width: 90vw; max-height: 80vh; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px;" @click=${s=>s.stopPropagation()}>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; font-family: var(--font-heading); color: var(--accent-gold);">Project Manager</h2>
            <button class="btn-compact-toggle" @click=${this.handleCloseProjectModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 12px;">
            <h3 style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">Current Workspace</h3>
            <div style="display: flex; gap: 12px; align-items: center;">
              <input 
                type="text" 
                .value=${this.currentProjectName} 
                @input=${s=>this.currentProjectName=s.target.value}
                style="flex: 1; background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 8px 12px; border-radius: 6px; font-family: var(--font-heading);"
                placeholder="Project Name..."
              />
              <button 
                @click=${this.handleSaveProject} 
                ?disabled=${this.sections.length===0}
                style="background: var(--accent-terracotta); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; opacity: ${this.sections.length===0?.5:1};"
              >
                Save
              </button>
              ${this.isAuthenticated?M`
                <button
                  @click=${this.syncProjectsToCloud}
                  ?disabled=${this.isDriveSyncing}
                  title="Sync to Cloud Now"
                  style="background: transparent; border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                  </svg>
                  ${this.isDriveSyncing?"Syncing...":"Sync Active"}
                </button>
              `:M`
                <button
                  @click=${()=>this.showCloudPromptModal=!0}
                  title="Enable Cloud Backup"
                  style="background: transparent; border: 1px dashed var(--border-color); color: var(--text-secondary); padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                    <polyline points="12 12 12 18"></polyline>
                  </svg>
                  Sync to Cloud
                </button>
              `}
            </div>
            ${this.isAuthenticated?M`
              <div style="display: flex; align-items: center; gap: 6px; color: var(--accent-blue); font-size: 0.75rem; margin-top: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Google Cloud Sync Enabled</span>
              </div>
            `:M`
              <div style="display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; margin-top: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
                <span>Saved locally to browser storage (Guest Mode)</span>
              </div>
            `}
          </div>

          <!-- Cloud Sync Settings & Account Block -->
          <div style="background: rgba(43, 107, 187, 0.08); padding: 16px; border-radius: 8px; border: 1px dashed rgba(43, 107, 187, 0.3); display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 0.9rem; color: var(--accent-blue); font-family: var(--font-heading); display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                </svg>
                Cloud Synchronization
              </h3>
              ${this.isAuthenticated?M`
                <span style="font-size: 0.75rem; color: var(--accent-gold); background: rgba(212, 175, 55, 0.15); padding: 2px 8px; border-radius: 4px; font-weight: 600;">CONNECTED</span>
              `:M`
                <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; font-weight: 600;">LOCAL-FIRST</span>
              `}
            </div>
            
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              ${this.isAuthenticated?`You are signed in as ${this.authUserEmail}. Your projects are automatically synced and backed up to your personal Google Drive.`:"Projects are saved locally to this browser by default. Sign in with Google only if you want to sync your projects and access them from other devices."}
            </p>
            
            <div style="display: flex; justify-content: flex-end;">
              ${this.isAuthenticated?M`
                <button 
                  @click=${this.handleLogout}
                  style="background: transparent; border: 1px solid var(--accent-terracotta); color: var(--accent-terracotta); padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.8rem;"
                >
                  Sign Out
                </button>
              `:M`
                <button 
                  @click=${this.requestDriveAccess}
                  style="background: var(--accent-blue); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; box-shadow: var(--neu-flat-sm);"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.753 1 .5 6.253.5 12.75s5.253 11.75 11.74 11.75c6.776 0 11.28-4.76 11.28-11.46 0-.77-.085-1.35-.188-1.755H12.24z"/>
                  </svg>
                  Sign in with Google
                </button>
              `}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">Saved Projects</h3>
              <label style="cursor: pointer; font-size: 0.8rem; color: var(--accent-gold); display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Import JSON
                <input type="file" accept=".json" style="display: none;" @change=${this.handleImportProject} />
              </label>
            </div>

            ${this.projects.length===0?M`
              <div style="text-align: center; padding: 30px; color: var(--text-muted); font-style: italic; background: rgba(0,0,0,0.1); border-radius: 8px;">
                No saved projects found.
              </div>
            `:M`
              <div style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto;">
                ${this.projects.sort((s,e)=>e.lastModified-s.lastModified).map(s=>M`
                  <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px 16px; border-radius: 8px; border: 1px solid ${this.currentProjectId===s.id?"var(--accent-gold)":"transparent"};">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-weight: bold; font-family: var(--font-heading); color: var(--text-primary);">
                        ${s.name}
                        ${s.syncedToCloud?M`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(43, 107, 187, 0.2); color: var(--accent-blue); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">CLOUD</span>`:M`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(255, 255, 255, 0.1); color: var(--text-muted); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">LOCAL</span>`}
                      </span>
                      <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">${new Date(s.lastModified).toLocaleString()}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                      <button @click=${()=>this.handleLoadProject(s)} style="background: var(--bg-card); color: var(--text-primary); border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Load</button>
                      <button @click=${()=>this.handleExportProject(s)} style="background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Export</button>
                      <button @click=${()=>this.handleDeleteProject(s.id)} style="background: transparent; color: var(--accent-terracotta); border: 1px solid transparent; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Delete</button>
                    </div>
                  </div>
                `)}
              </div>
            `}
          </div>

        </div>
      </div>
    `}handleOpenShareModal(){this.showShareModal=!0,this.shareModalToast=""}handleCloseShareModal(){this.showShareModal=!1}getShareableChordName(s){if(!s)return"";const e=s.name.match(/^([A-G](?:#|b|x)?)(MAJ|MIN|DIM|AUG|XDIM)$/i);if(!e)return s.name;let t=e[1],n=e[2].toUpperCase();n==="XDIM"&&(t=t+"x",n="DIM"),t={Cx:"D",CX:"D",Dx:"E",DX:"E",Fx:"G",FX:"G",Gx:"A",GX:"A",Ax:"B",AX:"B","B#":"C","E#":"F"}[t]||t;const r=s.extension||"7th";if(n==="MAJ"){if(r==="triad")return t;if(r==="7th")return t+"maj7";if(r==="9th")return t+"maj9";if(r==="6th")return t+"6"}if(n==="MIN"){if(r==="triad")return t+"m";if(r==="7th")return t+"m7";if(r==="9th")return t+"m9";if(r==="6th")return t+"m6"}if(n==="DIM"){if(r==="triad")return t+"dim";if(r==="7th")return t+"m7b5";if(r==="9th")return t+"m9b5";if(r==="6th")return t+"dim6"}if(n==="AUG"){if(r==="triad")return t+"aug";if(r==="7th")return t+"7#5";if(r==="9th")return t+"9#5";if(r==="6th")return t+"aug6"}return s.name}copyShareLink(s){let e=this.selectedShareDevice;s&&typeof s=="string"&&(e=s,this.selectedShareDevice=s);const t=this.sections.flatMap(r=>r.steps).filter(r=>r!==null).map(r=>this.getShareableChordName(r)).filter(Boolean);if(t.length===0){this.shareModalToast="Error: Add at least one chord to your progression first!";return}const i=`${e==="m8"?"https://warmsynths.github.io/hypersyn-chord-helper/":"https://warmsynths.github.io/circuit-chords/"}?p=${t.join("+")}`;try{navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(i).then(()=>{this.shareModalToast="Success: Shareable link copied to clipboard!",setTimeout(()=>{this.shareModalToast.startsWith("Success")&&(this.shareModalToast="")},3e3)}).catch(r=>{console.warn("navigator.clipboard.writeText rejected, trying fallback:",r),this.fallbackCopy(i)}):this.fallbackCopy(i)}catch(r){console.warn("navigator.clipboard error, trying fallback:",r),this.fallbackCopy(i)}}fallbackCopy(s){try{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.focus(),e.select();const t=document.execCommand("copy");document.body.removeChild(e),t?(this.shareModalToast="Success: Shareable link copied to clipboard!",setTimeout(()=>{this.shareModalToast.startsWith("Success")&&(this.shareModalToast="")},3e3)):this.shareModalToast="Failed to copy link automatically. Please select and copy below."}catch(e){this.shareModalToast="Failed to copy link automatically. Please select and copy below.",console.error("Fallback copy failed:",e)}}renderCloudPromptModal(){return M`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1100; display: flex; align-items: center; justify-content: center;" @click=${()=>this.showCloudPromptModal=!1}>
        <div class="glass-panel" style="width: 420px; max-width: 90vw; padding: 32px; display: flex; flex-direction: column; gap: 20px; text-align: center;" @click=${s=>s.stopPropagation()}>
          
          <div style="display: flex; justify-content: flex-end; margin-bottom: -10px;">
            <button class="btn-compact-toggle" @click=${()=>this.showCloudPromptModal=!1} style="margin: 0; padding: 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 5px;">☁️</div>
          
          <div>
            <h2 style="margin: 0 0 8px 0; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.5rem;">Enable Cloud Sync</h2>
            <p style="color: var(--text-secondary); margin: 0; font-size: 0.95rem; line-height: 1.5;">
              Sign in with Google to safely back up your projects, custom progressions, and configuration variables to the cloud. Access your files on any device!
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
            <button 
              @click=${()=>{this.showCloudPromptModal=!1,this.requestDriveAccess()}}
              style="background: var(--accent-blue); color: #fff; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; box-shadow: var(--neu-flat-sm);"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.753 1 .5 6.253.5 12.75s5.253 11.75 11.74 11.75c6.776 0 11.28-4.76 11.28-11.46 0-.77-.085-1.35-.188-1.755H12.24z"/>
              </svg>
              Sign in with Google
            </button>
            
            <button 
              @click=${()=>this.showCloudPromptModal=!1}
              style="background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary); padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; cursor: pointer; width: 100%;"
            >
              Keep Saving Locally
            </button>
          </div>

        </div>
      </div>
    `}renderShareModal(){const s=this.sections.flatMap(n=>n.steps).filter(n=>n!==null).map(n=>this.getShareableChordName(n)).filter(Boolean),e=this.selectedShareDevice==="m8"?"https://warmsynths.github.io/hypersyn-chord-helper/":"https://warmsynths.github.io/circuit-chords/",t=s.length>0?`${e}?p=${s.join("+")}`:"";return M`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;" @click=${this.handleCloseShareModal}>
        <div class="glass-panel" style="width: 640px; max-width: 90vw; max-height: 90vh; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px;" @click=${n=>n.stopPropagation()}>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; font-family: var(--font-heading); color: var(--accent-gold);">Share Progression</h2>
            <button class="btn-compact-toggle" @click=${this.handleCloseShareModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Select a destination device to export your chord progression. Clicking the device copies the formatted URL to your clipboard.
          </p>

          <div class="share-grid">
            <!-- M8 Tracker Card -->
            <div 
              @click=${()=>this.copyShareLink("m8")}
              class="device-card ${this.selectedShareDevice==="m8"?"selected":""}"
            >
              <!-- Dirtywave M8 Tracker SVG -->
              <svg width="140" height="200" viewBox="0 0 240 340" style="filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
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
                  <filter id="m8-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
                  </filter>
                  <filter id="m8-key-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
                  </filter>
                </defs>
                
                <!-- Outer Casing -->
                <rect x="2" y="2" width="236" height="336" rx="14" fill="url(#m8-body-grad)" stroke="#3e434a" stroke-width="1.5" />
                
                <!-- Screen Bezel -->
                <rect x="18" y="18" width="204" height="132" rx="6" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
                
                <!-- Screen Display -->
                <rect x="24" y="24" width="192" height="120" rx="3" fill="#070c12" />
                
                <!-- Screen Contents -->
                <text x="32" y="44" fill="#ff4d6d" font-family="monospace" font-size="9" font-weight="bold">SONG</text>
                <text x="185" y="44" fill="#00e5ff" font-family="monospace" font-size="8" text-anchor="end">T▸140</text>
                
                <!-- Column Headers -->
                <text x="56" y="44" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.6">1  2  3  4  5  6  7  8</text>
                
                <!-- Grid Tracker Rows -->
                <text x="32" y="58" fill="#00e5ff" font-family="monospace" font-size="7">00 C4 D4 E4 G4 A4 C5 D5 E5</text>
                <text x="32" y="68" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">01 -- -- -- -- -- -- -- --</text>
                <text x="32" y="78" fill="#00e5ff" font-family="monospace" font-size="7">02 E4 G4 A4 C5 D5 E5 G5 A5</text>
                <text x="32" y="88" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">03 -- -- -- -- -- -- -- --</text>
                <text x="32" y="98" fill="#00e5ff" font-family="monospace" font-size="7">04 A4 C5 D5 E5 G5 A5 C6 D6</text>
                <text x="32" y="108" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">05 -- -- -- -- -- -- -- --</text>
                
                <!-- M8 Logo -->
                <g transform="translate(24, 178)">
                  <path d="M0,0 h16 v4 h-16 z M0,6 h16 v2 h-16 z" fill="#717780" />
                  <text x="0" y="16" fill="#8d94a0" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">M8</text>
                </g>
                
                <!-- Upper Right Edit Keys -->
                <!-- OPT Key -->
                <rect x="124" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="143" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⚯ OPT</text>
                
                <!-- EDIT Key -->
                <rect x="174" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="176" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="193" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">✶ EDIT</text>
                
                <!-- Navigation Cluster -->
                <!-- UP Caret Label -->
                <text x="93" y="172" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▴</text>
                <!-- UP Key -->
                <rect x="74" y="176" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="178" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- LEFT Caret Label -->
                <text x="16" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">◂</text>
                <!-- LEFT Key -->
                <rect x="24" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="26" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- DOWN Caret Label -->
                <text x="93" y="274" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▾</text>
                <!-- DOWN Key -->
                <rect x="74" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- RIGHT Caret Label -->
                <text x="170" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▸</text>
                <!-- RIGHT Key -->
                <rect x="124" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- Action Bottom Keys -->
                <!-- SHIFT Key -->
                <rect x="74" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="93" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⇪ SHIFT</text>
                
                <!-- PLAY Key -->
                <rect x="124" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="143" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">▸ PLAY</text>
                
                <!-- Speaker Grills -->
                <g transform="translate(24, 286)" fill="#090a0c">
                  <rect x="0" y="0" width="16" height="2" rx="0.5" />
                  <rect x="0" y="4" width="16" height="2" rx="0.5" />
                  <rect x="0" y="8" width="16" height="2" rx="0.5" />
                  <rect x="0" y="12" width="16" height="2" rx="0.5" />
                  <rect x="0" y="16" width="16" height="2" rx="0.5" />
                </g>
                <g transform="translate(198, 286)" fill="#090a0c">
                  <rect x="0" y="0" width="16" height="2" rx="0.5" />
                  <rect x="0" y="4" width="16" height="2" rx="0.5" />
                  <rect x="0" y="8" width="16" height="2" rx="0.5" />
                  <rect x="0" y="12" width="16" height="2" rx="0.5" />
                  <rect x="0" y="16" width="16" height="2" rx="0.5" />
                </g>
              </svg>

              <div style="margin-top: 16px; font-weight: bold; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">M8 Tracker</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-align: center;">Copies progression formatted for Hypersyn helper</div>
            </div>

            <!-- Circuit Tracks Card -->
            <div 
              @click=${()=>this.copyShareLink("circuit")}
              class="device-card ${this.selectedShareDevice==="circuit"?"selected":""}"
            >
              <!-- Novation Circuit Tracks SVG -->
              <svg width="140" height="200" viewBox="0 0 240 340" style="filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
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

                <!-- Outer Casing -->
                <rect x="2" y="52" width="236" height="236" rx="14" fill="url(#ct-body-grad)" stroke="#3e434a" stroke-width="1.5" />

                <!-- Logo & Text -->
                <text x="18" y="74" fill="#e2e8f0" font-family="sans-serif" font-size="10" font-weight="900" letter-spacing="1">CIRCUIT TRACKS</text>
                
                <!-- Novation Logo (Upper Right) -->
                <g transform="translate(202, 60)">
                  <rect x="0" y="0" width="18" height="18" rx="4" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
                  <path d="M4 14 L14 4" stroke="#ab8b61" stroke-width="2.5" stroke-linecap="round" />
                  <path d="M7 14 L14 7" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />
                </g>

                <!-- Knobs Row 1 -->
                <!-- Master Volume -->
                <g transform="translate(32, 104) rotate(-45)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="32" y="118" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VOLUME</text>
                <circle cx="32" cy="112" r="1.5" fill="#f59e0b" filter="url(#ct-glow-cyan)"/>

                <!-- 2 Oscillator Mod -->
                <g transform="translate(76, 104) rotate(30)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="76" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 2 MOD</text>
                <circle cx="76" cy="112" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>

                <!-- 4 Filter Envelope -->
                <g transform="translate(120, 104) rotate(90)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="120" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT ENV</text>
                <circle cx="120" cy="112" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- 6 Resonance -->
                <g transform="translate(164, 104) rotate(-90)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="164" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">RESONANCE</text>
                <circle cx="164" cy="112" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>

                <!-- 8 FX -->
                <g transform="translate(208, 104) rotate(15)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="208" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX DEPTH</text>
                <circle cx="208" cy="112" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>

                <!-- Knobs Row 2 -->
                <!-- 1 Oscillator -->
                <g transform="translate(54, 138) rotate(-60)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="54" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 1 MOD</text>
                <circle cx="54" cy="146" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>

                <!-- 3 Amp Envelope -->
                <g transform="translate(98, 138) rotate(45)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="98" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">AMP ENV</text>
                <circle cx="98" cy="146" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- 5 Filter Frequency -->
                <g transform="translate(142, 138) rotate(0)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="142" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT FREQ</text>
                <circle cx="142" cy="146" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>

                <!-- 7 Modulation -->
                <g transform="translate(186, 138) rotate(120)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="186" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MODULATION</text>
                <circle cx="186" cy="146" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>

                <!-- Master Filter -->
                <g transform="translate(208, 138) rotate(-20)">
                  <circle cx="0" cy="0" r="11" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="11" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="8" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-10" stroke="#ab8b61" stroke-width="1.5" stroke-linecap="round"/>
                </g>
                <text x="208" y="153" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MST FILTER</text>
                <circle cx="208" cy="148" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- Buttons Row 1 -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="22" y="168" width="16" height="8" rx="1.5" />
                  <rect x="42" y="168" width="16" height="8" rx="1.5" />
                  <rect x="62" y="168" width="16" height="8" rx="1.5" />
                  <rect x="82" y="168" width="16" height="8" rx="1.5" />
                  <rect x="102" y="168" width="16" height="8" rx="1.5" />
                  <rect x="122" y="168" width="16" height="8" rx="1.5" />
                  <rect x="142" y="168" width="16" height="8" rx="1.5" />
                  <rect x="162" y="168" width="16" height="8" rx="1.5" />
                  <rect x="182" y="168" width="16" height="8" rx="1.5" />
                  <rect x="202" y="168" width="16" height="8" rx="1.5" />
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

                <!-- Buttons Row 2 -->
                <g stroke="#2e3136" stroke-width="0.5">
                  <rect x="22" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" />
                  <rect x="42" y="180" width="16" height="8" rx="1.5" fill="#db2777" />
                  <rect x="62" y="180" width="16" height="8" rx="1.5" fill="#9333ea" />
                  <rect x="82" y="180" width="16" height="8" rx="1.5" fill="#2563eb" />
                  <rect x="102" y="180" width="16" height="8" rx="1.5" fill="#3b82f6" />
                  <rect x="122" y="180" width="16" height="8" rx="1.5" fill="#e11d48" />
                  <rect x="142" y="180" width="16" height="8" rx="1.5" fill="#f43f5e" />
                  <rect x="162" y="180" width="16" height="8" rx="1.5" fill="#ea580c" />
                  <rect x="182" y="180" width="16" height="8" rx="1.5" fill="#d97706" />
                  <rect x="202" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" />
                </g>
                <text x="30" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PRESET</text>
                <text x="210" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PTN</text>

                <!-- Left Vertical Buttons -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="16" y="198" width="16" height="13" rx="2" />
                  <rect x="16" y="216" width="16" height="13" rx="2" />
                  <rect x="16" y="234" width="16" height="13" rx="2" />
                  <rect x="16" y="252" width="16" height="13" rx="2" />
                </g>
                <text x="24" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">NOTE</text>
                <text x="24" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VEL</text>
                <text x="24" y="242" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">GATE</text>
                <text x="24" y="260" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">PTN</text>

                <!-- Right Vertical Buttons -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="208" y="198" width="16" height="13" rx="2" />
                  <rect x="208" y="216" width="16" height="13" rx="2" />
                  <rect x="208" y="234" width="16" height="13" rx="2" />
                  <rect x="208" y="252" width="16" height="13" rx="2" />
                </g>
                <text x="216" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MIX</text>
                <text x="216" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX</text>
                <circle cx="216" cy="240.5" r="3.5" fill="#ef4444" filter="url(#ct-glow-cyan)" />
                <polygon points="214,255.5 214,261.5 219,258.5" fill="#22c55e" filter="url(#ct-glow-cyan)" />

                <!-- 4x8 Pad Grid -->
                <g stroke="#090a0c" stroke-width="0.5">
                  <!-- Row 0 -->
                  <rect x="38" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />

                  <!-- Row 1 -->
                  <rect x="38" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />

                  <!-- Row 2 -->
                  <rect x="38" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />

                  <!-- Row 3 -->
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

              <div style="margin-top: 16px; font-weight: bold; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">Circuit Tracks</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-align: center;">Copies progression formatted for Circuit Tracks</div>
            </div>
          </div>

          ${this.shareModalToast?M`
            <div style="background: ${this.shareModalToast.startsWith("Error")?"rgba(235, 94, 85, 0.15)":"rgba(212, 163, 89, 0.15)"}; border: 1px solid ${this.shareModalToast.startsWith("Error")?"rgba(235, 94, 85, 0.3)":"rgba(212, 163, 89, 0.3)"}; border-radius: 8px; padding: 12px; font-size: 0.85rem; color: ${this.shareModalToast.startsWith("Error")?"var(--accent-terracotta)":"var(--accent-gold)"}; font-weight: 600; text-align: center;">
              ${this.shareModalToast}
            </div>
          `:""}

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em;">Shareable Link</label>
            <div style="display: flex; gap: 8px;">
              <input 
                type="text" 
                readonly
                .value=${t||"(Add chords to your progression first)"}
                style="flex: 1; background: var(--bg-primary); border: 1px solid var(--border-color); color: ${t?"var(--accent-gold)":"var(--text-muted)"}; padding: 8px 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.75rem; outline: none;"
                @click=${n=>n.target.select()}
              />
              <button 
                @click=${()=>this.copyShareLink()}
                ?disabled=${!t}
                style="background: var(--accent-terracotta); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px; opacity: ${t?1:.5}; transition: opacity 0.2s;"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </button>
            </div>
          </div>

        </div>
      </div>
    `}};Y.styles=en`
    * {
      box-sizing: border-box;
    }
    
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      color: var(--text-primary);
    }
    
    .glass-panel {
      background: var(--bg-card);
      border: none;
      border-radius: 16px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s ease;
    }
    
    .glass-panel:hover {
      box-shadow: var(--neu-flat-sm);
    }
    
    .app-layout {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-height: 100vh;
      box-sizing: border-box;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    header.glass-panel {
      background-image: linear-gradient(var(--header-overlay), var(--header-overlay)), url('/header-bg.jpg');
      background-size: cover;
      background-position: center 30%;
      border: 1px solid var(--border-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    
    .branding {
      display: flex;
      flex-direction: column;
    }
    
    .brand-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--accent-terracotta);
      font-family: var(--font-heading);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .brand-sub {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    
    .header-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    
    .auth-info {
      font-size: 0.7rem;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: var(--font-mono);
      line-height: 1.2;
    }
    
    .email-text {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .toggle-group {
      display: flex;
      gap: 8px;
    }
    
    .scenario-picker {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .select-scenario {
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.85rem;
      cursor: pointer;
      outline: none;
      box-shadow: var(--neu-pressed-sm);
      transition: all 0.2s ease;
    }
    
    .select-scenario:focus {
      color: var(--accent-gold);
    }
    
    .btn-compact-toggle {
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-compact-toggle:hover {
      color: var(--text-primary);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .btn-compact-toggle.active {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
    }

    header.glass-panel .btn-compact-toggle {
      background: var(--header-btn-bg);
      border: 1px solid var(--header-btn-border);
      color: var(--text-secondary);
      box-shadow: var(--header-btn-shadow);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    
    header.glass-panel .btn-compact-toggle:hover {
      background: var(--header-btn-bg-hover);
      border-color: var(--header-btn-border-hover);
      color: var(--text-primary);
      box-shadow: var(--header-btn-shadow);
    }
    
    header.glass-panel .btn-compact-toggle.active {
      background: var(--accent-terracotta);
      border-color: var(--accent-terracotta);
      color: #ffffff;
      box-shadow: none;
    }
    
    /* Workspace container to hold overlay timeline */
    .workspace-container {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
 
    /* Workspace split layout */
    .workspace-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 0;
      transition: margin-top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    @media (max-width: 900px) {
      .workspace-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .auth-container {
      display: flex;
      align-items: center;
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-terracotta);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-primary);
      margin-left: 10px;
      flex-shrink: 0;
      box-shadow: var(--neu-flat-sm);
    }

    @media (max-width: 600px) {
      .app-layout {
        padding: 16px 12px;
        gap: 16px;
      }
      
      header {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 16px !important;
      }
      
      .branding {
        align-items: center;
        text-align: center;
      }
      
      .header-controls {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 12px 16px;
        width: 100%;
      }
      
      .auth-container {
        flex-direction: row-reverse;
        gap: 8px;
      }
      
      .user-avatar {
        margin-left: 0;
      }
      
      .auth-info {
        align-items: flex-start;
      }
      
      .email-text {
        max-width: 140px;
      }
      
      .scenario-picker {
        flex-direction: column;
        align-items: stretch;
      }
      
      .select-scenario {
        width: 100%;
      }
      
      .brand-title {
        font-size: 1.3rem;
      }
      
      .brand-sub {
        font-size: 0.65rem;
      }
      
      .is-compact .options-tabs {
        padding: 6px 12px 0;
        justify-content: center;
        gap: 32px;
      }
      
      .is-compact .tab-btn {
        padding: 6px 16px 8px;
        font-size: 1.5rem;
      }
    }
    
    .is-compact .compact-header-tabs {
      display: block;
    }
    
    .is-compact .desktop-pane-tabs {
      display: none;
    }
    
    /* Left column panel (Active Chord) */
    .chord-pane {
    }
    
    /* Right column panel (Transitions options) */
    .options-pane {
      display: flex;
      flex-direction: column;
    }
    
    .options-tabs {
      display: flex;
      gap: 12px;
      padding: 16px 20px 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .header-tabs {
      padding: 0;
      border-bottom: none;
      gap: 16px;
    }
    
    .header-tabs .tab-btn {
      padding: 6px 12px;
      font-size: 1.4rem;
    }
    
    .compact-header-tabs {
      display: none;
    }
    
    .tab-btn {
      padding: 8px 16px 12px;
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-heading);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .tab-btn:hover {
      color: var(--text-secondary);
    }
    
    .tab-btn.active {
      color: var(--accent-gold);
      border-bottom: 2px solid var(--accent-gold);
    }
    
    .tab-explanation {
      padding: 12px 20px;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.8rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    
    next-options-table {
      flex: 1;
      min-height: 0;
    }
    
    /* Timeline panel positioning at the top of workspace overlaying content */
    .timeline-pane {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-card) !important; /* Opaque background to prevent text bleed-through when overlaying */
      border: none;
      border-radius: 12px;
      box-shadow: var(--neu-flat);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .setup-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      gap: 24px;
      width: 100%;
      max-width: 900px;
      margin: 20px auto;
      text-align: center;
    }
    
    .setup-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    
    .setup-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 650px;
    }
    
    /* Scale Choice Grid */
    /* Scale Choice Grid */
    .scale-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      margin: 15px 0;
      justify-content: center;
    }

    .phases-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 20px;
    }
    
    .phase-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .phase-header {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding-bottom: 6px;
      margin-bottom: 4px;
    }

    .light-theme .phase-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
    
    .scale-card {
      background: var(--bg-card);
      border: none;
      border-radius: 12px;
      padding: 24px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: calc(50% - 10px);
      box-sizing: border-box;
    }
    
    .scale-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat-sm);
    }

    @media (max-width: 700px) {
      .scale-card {
        width: 100%;
      }
    }
    
    .scale-card-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .scale-emoji {
      font-size: 2rem;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }
    
    .scale-header-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .scale-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }
    
    .scale-subtitle {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-secondary);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    
    .scale-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    
    /* Tonic Key selection view */
    .key-selector-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      margin: 15px 0;
    }
    
    .key-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 12px;
      width: 100%;
    }
    
    .btn-key {
      padding: 18px 12px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--text-primary);
      font-family: var(--font-heading);
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-key:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .btn-back {
      padding: 8px 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-back:hover {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
    }

    .share-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 10px 0;
    }
    
    @media (min-width: 600px) {
      .share-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .device-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: var(--neu-flat-sm);
    }
    
    .device-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-gold);
      background: rgba(255,255,255,0.04);
    }
    
    .device-card.selected {
      border-color: var(--accent-terracotta);
      background: rgba(255,255,255,0.05);
      box-shadow: 0 0 10px rgba(194, 82, 51, 0.2), var(--neu-flat-sm);
    }

    .studio-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 0 8px 0;
      margin-top: auto;
      font-size: 0.8rem;
      font-family: var(--font-body);
      color: var(--text-muted);
      opacity: 0.6;
      gap: 16px;
      flex-wrap: wrap;
      text-align: center;
      width: 100%;
    }

    .studio-footer .footer-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .studio-footer a {
      color: inherit;
      text-decoration: none;
      transition: color 0.25s ease, opacity 0.25s ease;
      font-weight: 500;
      opacity: 0.85;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .studio-footer a:hover {
      color: var(--accent-terracotta);
      opacity: 1;
    }

    .studio-footer a:active {
      color: var(--accent-terracotta);
      opacity: 1;
    }

    .footer-divider {
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .studio-footer {
        flex-direction: column;
        gap: 8px;
        padding: 16px 0 8px 0;
      }
      .studio-footer .footer-content {
        flex-direction: column;
        gap: 8px;
      }
      .footer-divider {
        display: none;
      }
    }

    @keyframes sea-monster-bottom {
      0% { transform: translateY(100%); }
      20% { transform: translateY(25%); }
      80% { transform: translateY(25%); }
      100% { transform: translateY(100%); }
    }

    @keyframes sea-monster-left {
      0% { transform: translateX(-100%) rotate(90deg) scaleX(-1); }
      20% { transform: translateX(-25%) rotate(90deg) scaleX(-1); }
      80% { transform: translateX(-25%) rotate(90deg) scaleX(-1); }
      100% { transform: translateX(-100%) rotate(90deg) scaleX(-1); }
    }

    @keyframes sea-monster-right {
      0% { transform: translateX(100%) rotate(-90deg); }
      20% { transform: translateX(25%) rotate(-90deg); }
      80% { transform: translateX(25%) rotate(-90deg); }
      100% { transform: translateX(100%) rotate(-90deg); }
    }

    .sea-monster-easter-egg {
      position: fixed;
      width: 160px;
      height: auto;
      z-index: 10000;
      pointer-events: none;
    }

    .sea-monster-easter-egg.bottom {
      bottom: -10px;
      right: 15%;
      animation: sea-monster-bottom 5s ease-in-out forwards;
      transform: translateY(100%);
    }

    .sea-monster-easter-egg.left {
      bottom: 20%;
      left: -10px;
      animation: sea-monster-left 5s ease-in-out forwards;
      transform: translateX(-100%) scaleX(-1);
    }

    .sea-monster-easter-egg.right {
      bottom: 20%;
      right: -10px;
      animation: sea-monster-right 5s ease-in-out forwards;
      transform: translateX(100%) rotate(-90deg);
    }

    @keyframes sun-drop {
      0% { transform: translateY(-100%); }
      33% { transform: translateY(0); }
      66% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }

    .sun-easter-egg {
      position: fixed;
      top: 0;
      left: 50%;
      margin-left: -150px;
      width: 300px;
      height: auto;
      z-index: 9999;
      pointer-events: none;
      animation: sun-drop 3s ease-in-out forwards;
      transform: translateY(-100%);
    }

    @keyframes wind-blow {
      0% {
        transform: translate(-100%, -50%);
        opacity: 0;
      }
      15% {
        transform: translate(20px, -50%);
        opacity: 1;
      }
      85% {
        transform: translate(20px, -50%);
        opacity: 1;
      }
      100% {
        transform: translate(-100%, -50%);
        opacity: 0;
      }
    }

    .wind-easter-egg {
      position: fixed;
      top: 50%;
      left: 0;
      width: 250px;
      height: auto;
      z-index: 10001;
      pointer-events: none;
      animation: wind-blow 4.5s ease-in-out forwards;
      transform: translate(-100%, -50%);
    }
  `;K([z()],Y.prototype,"chordData",2);K([z()],Y.prototype,"activeProfile",2);K([z()],Y.prototype,"sections",2);K([z()],Y.prototype,"activeLocation",2);K([z()],Y.prototype,"isPlaying",2);K([z()],Y.prototype,"isLooping",2);K([z()],Y.prototype,"timelineCollapsed",2);K([z()],Y.prototype,"compactMode",2);K([z()],Y.prototype,"lightMode",2);K([z()],Y.prototype,"projects",2);K([z()],Y.prototype,"currentProjectId",2);K([z()],Y.prototype,"currentProjectName",2);K([z()],Y.prototype,"showProjectModal",2);K([z()],Y.prototype,"showShareModal",2);K([z()],Y.prototype,"showCloudPromptModal",2);K([z()],Y.prototype,"shareModalToast",2);K([z()],Y.prototype,"selectedShareDevice",2);K([z()],Y.prototype,"isAuthenticated",2);K([z()],Y.prototype,"authUserEmail",2);K([z()],Y.prototype,"authError",2);K([z()],Y.prototype,"activeOptionsTab",2);K([z()],Y.prototype,"humanState",2);K([z()],Y.prototype,"previewVoicing",2);K([z()],Y.prototype,"isDriveSyncing",2);K([z()],Y.prototype,"setupStep",2);K([z()],Y.prototype,"selectedScaleType",2);K([z()],Y.prototype,"showSeaMonster",2);K([z()],Y.prototype,"seaMonsterSpawnSide",2);K([z()],Y.prototype,"showSun",2);K([z()],Y.prototype,"showWind",2);Y=K([tn("chord-voyager-app")],Y);
