(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ln=globalThis,Vs=Ln.ShadowRoot&&(Ln.ShadyCSS===void 0||Ln.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ls=Symbol(),Ii=new WeakMap;let lr=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Ls)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Vs&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Ii.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ii.set(t,e))}return e}toString(){return this.cssText}};const Ao=s=>new lr(typeof s=="string"?s:s+"",void 0,Ls),vn=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((n,i,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new lr(t,s,Ls)},No=(s,e)=>{if(Vs)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),i=Ln.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,s.appendChild(n)}},Mi=Vs?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Ao(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Io,defineProperty:Mo,getOwnPropertyDescriptor:Eo,getOwnPropertyNames:Oo,getOwnPropertySymbols:Do,getPrototypeOf:Po}=Object,ns=globalThis,Ei=ns.trustedTypes,$o=Ei?Ei.emptyScript:"",Ro=ns.reactiveElementPolyfillSupport,cn=(s,e)=>s,Wn={toAttribute(s,e){switch(e){case Boolean:s=s?$o:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},js=(s,e)=>!Io(s,e),Oi={attribute:!0,type:String,converter:Wn,reflect:!1,useDefault:!1,hasChanged:js};Symbol.metadata??=Symbol("metadata"),ns.litPropertyMetadata??=new WeakMap;let $t=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Oi){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Mo(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=Eo(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Oi}static _$Ei(){if(this.hasOwnProperty(cn("elementProperties")))return;const e=Po(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(cn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(cn("properties"))){const t=this.properties,n=[...Oo(t),...Do(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(Mi(i))}else e!==void 0&&t.push(Mi(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return No(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:Wn).toAttribute(t,n.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=n.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Wn;this._$Em=i;const a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??js)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,r]of n){const{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$t.elementStyles=[],$t.shadowRootOptions={mode:"open"},$t[cn("elementProperties")]=new Map,$t[cn("finalized")]=new Map,Ro?.({ReactiveElement:$t}),(ns.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bs=globalThis,Di=s=>s,zn=Bs.trustedTypes,Pi=zn?zn.createPolicy("lit-html",{createHTML:s=>s}):void 0,hr="$lit$",ut=`lit$${Math.random().toFixed(9).slice(2)}$`,ur="?"+ut,Fo=`<${ur}>`,kt=document,hn=()=>kt.createComment(""),un=s=>s===null||typeof s!="object"&&typeof s!="function",Ws=Array.isArray,Vo=s=>Ws(s)||typeof s?.[Symbol.iterator]=="function",Ts=`[ 	
\f\r]`,an=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$i=/-->/g,Ri=/>/g,bt=RegExp(`>|${Ts}(?:([^\\s"'>=/]+)(${Ts}*=${Ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fi=/'/g,Vi=/"/g,dr=/^(?:script|style|textarea|title)$/i,pr=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),D=pr(1),dt=pr(2),Wt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),Li=new WeakMap,wt=kt.createTreeWalker(kt,129);function fr(s,e){if(!Ws(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pi!==void 0?Pi.createHTML(e):e}const Lo=(s,e)=>{const t=s.length-1,n=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=an;for(let a=0;a<t;a++){const c=s[a];let l,h,u=-1,d=0;for(;d<c.length&&(o.lastIndex=d,h=o.exec(c),h!==null);)d=o.lastIndex,o===an?h[1]==="!--"?o=$i:h[1]!==void 0?o=Ri:h[2]!==void 0?(dr.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=bt):h[3]!==void 0&&(o=bt):o===bt?h[0]===">"?(o=i??an,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?bt:h[3]==='"'?Vi:Fi):o===Vi||o===Fi?o=bt:o===$i||o===Ri?o=an:(o=bt,i=void 0);const p=o===bt&&s[a+1].startsWith("/>")?" ":"";r+=o===an?c+Fo:u>=0?(n.push(l),c.slice(0,u)+hr+c.slice(u)+ut+p):c+ut+(u===-2?a:p)}return[fr(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class dn{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[l,h]=Lo(e,t);if(this.el=dn.createElement(l,n),wt.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=wt.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(hr)){const d=h[o++],p=i.getAttribute(u).split(ut),f=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:f[2],strings:p,ctor:f[1]==="."?Bo:f[1]==="?"?Wo:f[1]==="@"?zo:ss}),i.removeAttribute(u)}else u.startsWith(ut)&&(c.push({type:6,index:r}),i.removeAttribute(u));if(dr.test(i.tagName)){const u=i.textContent.split(ut),d=u.length-1;if(d>0){i.textContent=zn?zn.emptyScript:"";for(let p=0;p<d;p++)i.append(u[p],hn()),wt.nextNode(),c.push({type:2,index:++r});i.append(u[d],hn())}}}else if(i.nodeType===8)if(i.data===ur)c.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(ut,u+1))!==-1;)c.push({type:7,index:r}),u+=ut.length-1}r++}}static createElement(e,t){const n=kt.createElement("template");return n.innerHTML=e,n}}function zt(s,e,t=s,n){if(e===Wt)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl;const r=un(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=zt(s,i._$AS(s,e.values),i,n)),e}class jo{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??kt).importNode(t,!0);wt.currentNode=i;let r=wt.nextNode(),o=0,a=0,c=n[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new yn(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new Uo(r,this,e)),this._$AV.push(l),c=n[++a]}o!==c?.index&&(r=wt.nextNode(),o++)}return wt.currentNode=kt,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class yn{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=zt(this,e,t),un(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==Wt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Vo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&un(this._$AH)?this._$AA.nextSibling.data=e:this.T(kt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=dn.createElement(fr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new jo(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=Li.get(e.strings);return t===void 0&&Li.set(e.strings,t=new dn(e)),t}k(e){Ws(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new yn(this.O(hn()),this.O(hn()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=Di(e).nextSibling;Di(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ss{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(r===void 0)e=zt(this,e,t,0),o=!un(e)||e!==this._$AH&&e!==Wt,o&&(this._$AH=e);else{const a=e;let c,l;for(e=r[0],c=0;c<r.length-1;c++)l=zt(this,a[n+c],t,c),l===Wt&&(l=this._$AH[c]),o||=!un(l)||l!==this._$AH[c],l===ve?e=ve:e!==ve&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Bo extends ss{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}}class Wo extends ss{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}}class zo extends ss{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=zt(this,e,t,0)??ve)===Wt)return;const n=this._$AH,i=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==ve&&(n===ve||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Uo{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}}const qo=Bs.litHtmlPolyfillSupport;qo?.(dn,yn),(Bs.litHtmlVersions??=[]).push("3.3.3");const Go=(s,e,t)=>{const n=t?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const r=t?.renderBefore??null;n._$litPart$=i=new yn(e.insertBefore(hn(),r),r,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zs=globalThis;class nt extends $t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Go(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Wt}}nt._$litElement$=!0,nt.finalized=!0,zs.litElementHydrateSupport?.({LitElement:nt});const Ho=zs.litElementPolyfillSupport;Ho?.({LitElement:nt});(zs.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _n=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xo={attribute:!0,type:String,converter:Wn,reflect:!1,hasChanged:js},Yo=(s=Xo,e,t)=>{const{kind:n,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(t.name,s),n==="accessor"){const{name:o}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(n==="setter"){const{name:o}=t;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,s,!0,a)}}throw Error("Unsupported decorator location: "+n)};function oe(s){return(e,t)=>typeof t=="object"?Yo(s,e,t):((n,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(i,r):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(s){return oe({...s,state:!0,attribute:!1})}const Pn="chord_voyager_projects";class ke{static getProjects(){try{const e=localStorage.getItem(Pn);if(e)return JSON.parse(e)}catch(e){console.error("Failed to load projects from localStorage:",e)}return[]}static setProjects(e){try{localStorage.setItem(Pn,JSON.stringify(e))}catch(t){console.error("Failed to set projects to localStorage:",t)}}static mergeProjects(e,t){const n=new Map;return e.forEach(i=>n.set(i.id,i)),t.forEach(i=>{const r=n.get(i.id);!r||i.lastModified>r.lastModified?n.set(i.id,i):i.lastModified===r.lastModified&&(r.syncedToCloud=!0)}),Array.from(n.values())}static saveProject(e){const t=this.getProjects(),n=t.findIndex(i=>i.id===e.id);e.lastModified=Date.now(),n>=0?t[n]=e:t.push(e);try{localStorage.setItem(Pn,JSON.stringify(t))}catch(i){console.error("Failed to save project to localStorage:",i)}}static deleteProject(e){let t=this.getProjects();t=t.filter(n=>n.id!==e);try{localStorage.setItem(Pn,JSON.stringify(t))}catch(n){console.error("Failed to delete project from localStorage:",n)}}static exportProjectFile(e){const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`${e.name.replace(/[^a-z0-9]/gi,"_").toLowerCase()}_chord_voyager.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}static importProjectFile(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=r=>{try{const o=r.target?.result,a=JSON.parse(o);a&&typeof a=="object"&&Array.isArray(a.sections)?(a.id=Math.random().toString(36).substr(2,9),a.lastModified=Date.now(),t(a)):n(new Error("Invalid project file format"))}catch{n(new Error("Failed to parse JSON file"))}},i.onerror=()=>n(new Error("Failed to read file")),i.readAsText(e)})}}class Zo{constructor(){this.accessToken=null,this.FILENAME="chord_voyager_projects.json"}setAccessToken(e){this.accessToken=e}hasAccessToken(){return this.accessToken!==null}get headers(){if(!this.accessToken)throw new Error("Not authorized. Missing access token.");return{Authorization:`Bearer ${this.accessToken}`}}async findProjectFileId(){try{const e=encodeURIComponent(`name='${this.FILENAME}' and trashed=false`),t=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${e}&fields=files(id)`,{method:"GET",headers:this.headers});if(!t.ok)throw t.status===401?new Error("Unauthorized"):new Error(`Drive API error: ${t.statusText}`);const n=await t.json();return n.files&&n.files.length>0?n.files[0].id:null}catch(e){throw console.error("Failed to find project file in Google Drive:",e),e}}async loadProjects(){try{const e=await this.findProjectFileId();if(!e)return null;const t=await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,{method:"GET",headers:this.headers});if(!t.ok)throw new Error(`Failed to download file: ${t.statusText}`);return await t.json()}catch(e){throw console.error("Failed to load projects from Google Drive:",e),e}}async saveProjects(e){try{const t=await this.findProjectFileId(),n=JSON.stringify(e);if(t){const i=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${t}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:n});if(!i.ok)throw new Error(`Failed to update file: ${i.statusText}`)}else{const i=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:this.FILENAME,parents:["appDataFolder"]})});if(!i.ok)throw new Error(`Failed to create file metadata: ${i.statusText}`);const o=(await i.json()).id,a=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${o}?uploadType=media`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:n});if(!a.ok)throw new Error(`Failed to upload new file content: ${a.statusText}`)}}catch(t){throw console.error("Failed to save projects to Google Drive:",t),t}}}const mr="15.1.22",ji=(s,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:s}),Bi=(s,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:s}),As=(s,e)=>({startTime:e,type:"setValue",value:s}),gr=(s,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:s}),vr=(s,e,{startTime:t,target:n,timeConstant:i})=>n+(e-n)*Math.exp((t-s)/i),Ft=s=>s.type==="exponentialRampToValue",Un=s=>s.type==="linearRampToValue",ht=s=>Ft(s)||Un(s),Us=s=>s.type==="setValue",tt=s=>s.type==="setValueCurve",qn=(s,e,t,n)=>{const i=s[e];return i===void 0?n:ht(i)||Us(i)?i.value:tt(i)?i.values[i.values.length-1]:vr(t,qn(s,e-1,i.startTime,n),i)},Wi=(s,e,t,n,i)=>t===void 0?[n.insertTime,i]:ht(t)?[t.endTime,t.value]:Us(t)?[t.startTime,t.value]:tt(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,qn(s,e-1,t.startTime,i)],Ns=s=>s.type==="cancelAndHold",Is=s=>s.type==="cancelScheduledValues",lt=s=>Ns(s)||Is(s)?s.cancelTime:Ft(s)||Un(s)?s.endTime:s.startTime,zi=(s,e,t,{endTime:n,value:i})=>t===i?i:0<t&&0<i||t<0&&i<0?t*(i/t)**((s-e)/(n-e)):s<n?t:i,Ui=(s,e,t,{endTime:n,value:i})=>t+(s-e)/(n-e)*(i-t),yr=(s,e)=>{const t=Math.floor(e);if(t===e)return s[t];const n=Math.ceil(e);return(1-(e-t))*s[t]+(1-(n-e))*s[n]},Ko=(s,{duration:e,startTime:t,values:n})=>{const i=(s-t)/e*(n.length-1);return yr(n,i)},Jo=(s,e,t)=>{const n=s.length,i=Math.max(1,Math.floor(t/e*n))+1,r=s instanceof Float32Array?new Float32Array(i):s.slice(0,i);for(let o=0;o<i;o+=1){const c=o/(i-1)*t/e*(n-1);r[o]=yr(s,c)}return r},$n=s=>s.type==="setTarget";class Qo{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=lt(e);if(Ns(e)||Is(e)){const n=this._automationEvents.findIndex(r=>Is(e)&&tt(r)?r.startTime+r.duration>=t:lt(r)>=t),i=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),Ns(e)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&ht(i)){if(r!==void 0&&$n(r))throw new Error("The internal list is malformed.");const o=r===void 0?i.insertTime:tt(r)?r.startTime+r.duration:lt(r),a=r===void 0?this._defaultValue:tt(r)?r.values[r.values.length-1]:r.value,c=Ft(i)?zi(t,o,a,i):Ui(t,o,a,i),l=Ft(i)?ji(c,t,this._currenTime):Bi(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&$n(r)&&this._automationEvents.push(As(this.getValue(t),t)),r!==void 0&&tt(r)&&r.startTime+r.duration>t){const o=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=gr(Jo(r.values,r.duration,o),r.startTime,o)}}}else{const n=this._automationEvents.findIndex(o=>lt(o)>t),i=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(i!==void 0&&tt(i)&&lt(i)+i.duration>t)return!1;const r=Ft(e)?ji(e.value,e.endTime,this._currenTime):Un(e)?Bi(e.value,t,this._currenTime):e;if(n===-1)this._automationEvents.push(r);else{if(tt(e)&&t+e.duration>lt(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(n=>lt(n)>e);if(t>1){const n=this._automationEvents.slice(t-1),i=n[0];$n(i)&&n.unshift(As(qn(this._automationEvents,t-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=n}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>lt(o)>e),n=this._automationEvents[t],i=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[i];if(r!==void 0&&$n(r)&&(n===void 0||!ht(n)||n.insertTime>e))return vr(e,qn(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&Us(r)&&(n===void 0||!ht(n)))return r.value;if(r!==void 0&&tt(r)&&(n===void 0||!ht(n)||r.startTime+r.duration>e))return e<r.startTime+r.duration?Ko(e,r):r.values[r.values.length-1];if(r!==void 0&&ht(r)&&(n===void 0||!ht(n)))return r.value;if(n!==void 0&&Ft(n)){const[o,a]=Wi(this._automationEvents,i,r,n,this._defaultValue);return zi(e,o,a,n)}if(n!==void 0&&Un(n)){const[o,a]=Wi(this._automationEvents,i,r,n,this._defaultValue);return Ui(e,o,a,n)}return this._defaultValue}}const ea=s=>({cancelTime:s,type:"cancelAndHold"}),ta=s=>({cancelTime:s,type:"cancelScheduledValues"}),na=(s,e)=>({endTime:e,type:"exponentialRampToValue",value:s}),sa=(s,e)=>({endTime:e,type:"linearRampToValue",value:s}),ia=(s,e,t)=>({startTime:e,target:s,timeConstant:t,type:"setTarget"}),ra=()=>new DOMException("","AbortError"),oa=s=>(e,t,[n,i,r],o)=>{s(e[i],[t,n,r],a=>a[0]===t&&a[1]===n,o)},aa=s=>(e,t,n)=>{const i=[];for(let r=0;r<n.numberOfInputs;r+=1)i.push(new Set);s.set(e,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},ca=s=>(e,t)=>{s.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},Ut=new WeakSet,_r=new WeakMap,qs=new WeakMap,xr=new WeakMap,Gs=new WeakMap,is=new WeakMap,br=new WeakMap,Ms=new WeakMap,Es=new WeakMap,Os=new WeakMap,wr={construct(){return wr}},la=s=>{try{const e=new Proxy(s,wr);new e}catch{return!1}return!0},qi=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Gi=(s,e)=>{const t=[];let n=s.replace(/^[\s]+/,""),i=n.match(qi);for(;i!==null;){const r=i[1].slice(1,-1),o=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),n=n.slice(i[0].length).replace(/^[\s]+/,""),i=n.match(qi)}return[t.join(";"),n]},Hi=s=>{if(s!==void 0&&!Array.isArray(s))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Xi=s=>{if(!la(s))throw new TypeError("The given value for processorCtor should be a constructor.");if(s.prototype===null||typeof s.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},ha=(s,e,t,n,i,r,o,a,c,l,h,u,d)=>{let p=0;return(f,m,g={credentials:"omit"})=>{const y=h.get(f);if(y!==void 0&&y.has(m))return Promise.resolve();const w=l.get(f);if(w!==void 0){const v=w.get(m);if(v!==void 0)return v}const T=r(f),S=T.audioWorklet===void 0?i(m).then(([v,x])=>{const[b,_]=Gi(v,x),N=`${b};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${_}
})})(window,'_AWGS')`;return t(N)}).then(()=>{const v=d._AWGS.pop();if(v===void 0)throw new SyntaxError;n(T.currentTime,T.sampleRate,()=>v(class{},void 0,(x,b)=>{if(x.trim()==="")throw e();const _=Es.get(T);if(_!==void 0){if(_.has(x))throw e();Xi(b),Hi(b.parameterDescriptors),_.set(x,b)}else Xi(b),Hi(b.parameterDescriptors),Es.set(T,new Map([[x,b]]))},T.sampleRate,void 0,void 0))}):Promise.all([i(m),Promise.resolve(s(u,u))]).then(([[v,x],b])=>{const _=p+1;p=_;const[N,A]=Gi(v,x),M=`${N};((AudioWorkletProcessor,registerProcessor)=>{${A}
})(${b?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${b?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${b?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${_}',class extends AudioWorkletProcessor{process(){return !1}})`,R=new Blob([M],{type:"application/javascript; charset=utf-8"}),O=URL.createObjectURL(R);return T.audioWorklet.addModule(O,g).then(()=>{if(a(T))return T;const P=o(T);return P.audioWorklet.addModule(O,g).then(()=>P)}).then(P=>{if(c===null)throw new SyntaxError;try{new c(P,`__sac${_}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(O))});return w===void 0?l.set(f,new Map([[m,S]])):w.set(m,S),S.then(()=>{const v=h.get(f);v===void 0?h.set(f,new Set([m])):v.add(m)}).finally(()=>{const v=l.get(f);v!==void 0&&v.delete(m)}),S}},Ge=(s,e)=>{const t=s.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},rs=(s,e)=>{const t=Array.from(s).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[n]=t;return s.delete(n),n},Tr=(s,e,t,n)=>{const i=Ge(s,e),r=rs(i,o=>o[0]===t&&o[1]===n);return i.size===0&&s.delete(e),r},xn=s=>Ge(br,s),qt=s=>{if(Ut.has(s))throw new Error("The AudioNode is already stored.");Ut.add(s),xn(s).forEach(e=>e(!0))},Sr=s=>"port"in s,bn=s=>{if(!Ut.has(s))throw new Error("The AudioNode is not stored.");Ut.delete(s),xn(s).forEach(e=>e(!1))},Ds=(s,e)=>{!Sr(s)&&e.every(t=>t.size===0)&&bn(s)},ua=(s,e,t,n,i,r,o,a,c,l,h,u,d)=>{const p=new WeakMap;return(f,m,g,y,w)=>{const{activeInputs:T,passiveInputs:S}=r(m),{outputs:v}=r(f),x=a(f),b=_=>{const N=c(m),A=c(f);if(_){const C=Tr(S,f,g,y);s(T,f,C,!1),!w&&!u(f)&&t(A,N,g,y),d(m)&&qt(m)}else{const C=n(T,f,g,y);e(S,y,C,!1),!w&&!u(f)&&i(A,N,g,y);const k=o(m);if(k===0)h(m)&&Ds(m,T);else{const E=p.get(m);E!==void 0&&clearTimeout(E),p.set(m,setTimeout(()=>{h(m)&&Ds(m,T)},k*1e3))}}};return l(v,[m,g,y],_=>_[0]===m&&_[1]===g&&_[2]===y,!0)?(x.add(b),h(f)?s(T,f,[g,y,b],!0):e(S,y,[f,g,b],!0),!0):!1}},da=s=>(e,t,[n,i,r],o)=>{const a=e.get(n);a===void 0?e.set(n,new Set([[i,t,r]])):s(a,[i,t,r],c=>c[0]===i&&c[1]===t,o)},pa=s=>(e,t)=>{const n=s(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(n).connect(e.destination);const i=()=>{t.removeEventListener("ended",i),t.disconnect(n),n.disconnect()};t.addEventListener("ended",i)},fa=s=>(e,t)=>{s(e).add(t)},ma={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},ga=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={...ma,...c},u=n(l,h),d=r(l)?e():null;super(a,!1,u,d),this._nativeAnalyserNode=u}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Te=(s,e)=>s.context===e,va=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Gn=s=>{try{s.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},Ke=()=>new DOMException("","IndexSizeError"),Hs=s=>{s.getChannelData=(e=>t=>{try{return e.call(s,t)}catch(n){throw n.code===12?Ke():n}})(s.getChannelData)},ya={numberOfChannels:1},_a=(s,e,t,n,i,r,o,a)=>{let c=null;return class kr{constructor(h){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:u,numberOfChannels:d,sampleRate:p}={...ya,...h};c===null&&(c=new i(1,1,44100));const f=n!==null&&e(r,r)?new n({length:u,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,u,p);if(f.numberOfChannels===0)throw t();return typeof f.copyFromChannel!="function"?(o(f),Hs(f)):e(Gn,()=>Gn(f))||a(f),s.add(f),f}static[Symbol.hasInstance](h){return h!==null&&typeof h=="object"&&Object.getPrototypeOf(h)===kr.prototype||s.has(h)}}},Ie=-34028234663852886e22,Ce=-Ie,st=s=>Ut.has(s),xa={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},ba=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const u=r(l),d={...xa,...h},p=i(u,d),f=o(u),m=f?e():null;super(l,!1,p,m),this._audioBufferSourceNodeRenderer=m,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,f,p.playbackRate,Ce,Ie)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const h=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=h;const u=this._nativeAudioBufferSourceNode.onended;this._onended=u!==null&&u===h?l:u}get playbackRate(){return this._playbackRate}start(l=0,h=0,u){if(this._nativeAudioBufferSourceNode.start(l,h,u),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=u===void 0?[l,h]:[l,h,u]),this.context.state!=="closed"){qt(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),st(this)&&bn(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},wa=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=Te(u,h);if(!d){const p={buffer:u.buffer,channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,loop:u.loop,loopEnd:u.loopEnd,loopStart:u.loopStart,playbackRate:u.playbackRate.value};u=e(h,p),o!==null&&u.start(...o),a!==null&&u.stop(a)}return r.set(h,u),d?await s(h,l.playbackRate,u.playbackRate):await n(h,l.playbackRate,u.playbackRate),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},Ta=s=>"playbackRate"in s,Sa=s=>"frequency"in s&&"gain"in s,ka=s=>"offset"in s,Ca=s=>!("frequency"in s)&&"gain"in s,Aa=s=>"detune"in s&&"frequency"in s&&!("gain"in s),Na=s=>"pan"in s,Ae=s=>Ge(_r,s),wn=s=>Ge(xr,s),Ps=(s,e)=>{const{activeInputs:t}=Ae(s);t.forEach(i=>i.forEach(([r])=>{e.includes(s)||Ps(r,[...e,s])}));const n=Ta(s)?[s.playbackRate]:Sr(s)?Array.from(s.parameters.values()):Sa(s)?[s.Q,s.detune,s.frequency,s.gain]:ka(s)?[s.offset]:Ca(s)?[s.gain]:Aa(s)?[s.detune,s.frequency]:Na(s)?[s.pan]:[];for(const i of n){const r=wn(i);r!==void 0&&r.activeInputs.forEach(([o])=>Ps(o,e))}st(s)&&bn(s)},Cr=s=>{Ps(s.destination,[])},Ia=s=>s===void 0||typeof s=="number"||typeof s=="string"&&(s==="balanced"||s==="interactive"||s==="playback"),Ma=(s,e,t,n,i,r,o,a,c)=>class extends s{constructor(h={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let u;try{u=new c(h)}catch(f){throw f.code===12&&f.message==="sampleRate is not in range"?t():f}if(u===null)throw n();if(!Ia(h.latencyHint))throw new TypeError(`The provided value '${h.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(h.sampleRate!==void 0&&u.sampleRate!==h.sampleRate)throw t();super(u,2);const{latencyHint:d}=h,{sampleRate:p}=u;if(this._baseLatency=typeof u.baseLatency=="number"?u.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=u,c.name==="webkitAudioContext"?(this._nativeGainNode=u.createGain(),this._nativeOscillatorNode=u.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(u.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,u.state==="running"){this._state="suspended";const f=()=>{this._state==="suspended"&&(this._state=null),u.removeEventListener("statechange",f)};u.addEventListener("statechange",f)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),Cr(this)}))}createMediaElementSource(h){return new i(this,{mediaElement:h})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(h){return new o(this,{mediaStream:h})}createMediaStreamTrackSource(h){return new a(this,{mediaStreamTrack:h})}resume(){return this._state==="suspended"?new Promise((h,u)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?h():this.resume().then(h,u)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(h=>{throw h===void 0||h.code===15?e():h})}suspend(){return this._nativeAudioContext.suspend().catch(h=>{throw h===void 0?e():h})}},Ea=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const u=r(l),d=o(u),p=i(u,h,d),f=d?e(a):null;super(l,!1,p,f),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Oa=s=>{const e=new WeakMap,t=async(n,i)=>{const r=i.destination;return e.set(i,r),await s(n,i,r),r};return{render(n,i){const r=e.get(i);return r!==void 0?Promise.resolve(r):t(n,i)}}},Da=(s,e,t,n,i,r,o,a)=>(c,l)=>{const h=l.listener,u=()=>{const v=new Float32Array(1),x=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),b=o(l);let _=!1,N=[0,0,-1,0,1,0],A=[0,0,0];const C=()=>{if(_)return;_=!0;const R=n(l,256,9,0);R.onaudioprocess=({inputBuffer:O})=>{const P=[r(O,v,0),r(O,v,1),r(O,v,2),r(O,v,3),r(O,v,4),r(O,v,5)];P.some((F,j)=>F!==N[j])&&(h.setOrientation(...P),N=P);const U=[r(O,v,6),r(O,v,7),r(O,v,8)];U.some((F,j)=>F!==A[j])&&(h.setPosition(...U),A=U)},x.connect(R)},k=R=>O=>{O!==N[R]&&(N[R]=O,h.setOrientation(...N))},E=R=>O=>{O!==A[R]&&(A[R]=O,h.setPosition(...A))},M=(R,O,P)=>{const U=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:O});U.connect(x,0,R),U.start(),Object.defineProperty(U.offset,"defaultValue",{get(){return O}});const F=s({context:c},b,U.offset,Ce,Ie);return a(F,"value",j=>()=>j.call(F),j=>L=>{try{j.call(F,L)}catch(Y){if(Y.code!==9)throw Y}C(),b&&P(L)}),F.cancelAndHoldAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.cancelAndHoldAtTime),F.cancelScheduledValues=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.cancelScheduledValues),F.exponentialRampToValueAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.exponentialRampToValueAtTime),F.linearRampToValueAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.linearRampToValueAtTime),F.setTargetAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.setTargetAtTime),F.setValueAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.setValueAtTime),F.setValueCurveAtTime=(j=>b?()=>{throw i()}:(...L)=>{const Y=j.apply(F,L);return C(),Y})(F.setValueCurveAtTime),F};return{forwardX:M(0,0,k(0)),forwardY:M(1,0,k(1)),forwardZ:M(2,-1,k(2)),positionX:M(6,0,E(0)),positionY:M(7,0,E(1)),positionZ:M(8,0,E(2)),upX:M(3,0,k(3)),upY:M(4,1,k(4)),upZ:M(5,0,k(5))}},{forwardX:d,forwardY:p,forwardZ:f,positionX:m,positionY:g,positionZ:y,upX:w,upY:T,upZ:S}=h.forwardX===void 0?u():h;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return f},get positionX(){return m},get positionY(){return g},get positionZ(){return y},get upX(){return w},get upY(){return T},get upZ(){return S}}},Hn=s=>"context"in s,Tn=s=>Hn(s[0]),Mt=(s,e,t,n)=>{for(const i of s)if(t(i)){if(n)return!1;throw Error("The set contains at least one similar element.")}return s.add(e),!0},Yi=(s,e,[t,n],i)=>{Mt(s,[e,t,n],r=>r[0]===e&&r[1]===t,i)},Zi=(s,[e,t,n],i)=>{const r=s.get(e);r===void 0?s.set(e,new Set([[t,n]])):Mt(r,[t,n],o=>o[0]===t,i)},Jt=s=>"inputs"in s,Xn=(s,e,t,n)=>{if(Jt(e)){const i=e.inputs[n];return s.connect(i,t,0),[i,t,0]}return s.connect(e,t,n),[e,t,n]},Ar=(s,e,t)=>{for(const n of s)if(n[0]===e&&n[1]===t)return s.delete(n),n;return null},Pa=(s,e,t)=>rs(s,n=>n[0]===e&&n[1]===t),Nr=(s,e)=>{if(!xn(s).delete(e))throw new Error("Missing the expected event listener.")},Ir=(s,e,t)=>{const n=Ge(s,e),i=rs(n,r=>r[0]===t);return n.size===0&&s.delete(e),i},Yn=(s,e,t,n)=>{Jt(e)?s.disconnect(e.inputs[n],t,0):s.disconnect(e,t,n)},ne=s=>Ge(qs,s),pn=s=>Ge(Gs,s),Ct=s=>Ms.has(s),jn=s=>!Ut.has(s),Ki=(s,e)=>new Promise(t=>{if(e!==null)t(!0);else{const n=s.createScriptProcessor(256,1,1),i=s.createGain(),r=s.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=s.createBufferSource();a.buffer=r,a.loop=!0,a.connect(n).connect(s.destination),a.connect(i),a.disconnect(i),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,h=>h===1)?t(!0):t(!1),a.stop(),n.onaudioprocess=null,a.disconnect(n),n.disconnect(s.destination)},a.start()}}),Ss=(s,e)=>{const t=new Map;for(const n of s)for(const i of n){const r=t.get(i);t.set(i,r===void 0?1:r+1)}t.forEach((n,i)=>e(i,n))},Zn=s=>"context"in s,$a=s=>{const e=new Map;s.connect=(t=>(n,i=0,r=0)=>{const o=Zn(n)?t(n,i,r):t(n,i),a=e.get(n);return a===void 0?e.set(n,[{input:r,output:i}]):a.every(c=>c.input!==r||c.output!==i)&&a.push({input:r,output:i}),o})(s.connect.bind(s)),s.disconnect=(t=>(n,i,r)=>{if(t.apply(s),n===void 0)e.clear();else if(typeof n=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==n);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(n))if(i===void 0)e.delete(n);else{const o=e.get(n);if(o!==void 0){const a=o.filter(c=>c.output!==i&&(c.input!==r||r===void 0));a.length===0?e.delete(n):e.set(n,a)}}for(const[o,a]of e)a.forEach(c=>{Zn(o)?s.connect(o,c.output,c.input):s.connect(o,c.output)})})(s.disconnect)},Ra=(s,e,t,n)=>{const{activeInputs:i,passiveInputs:r}=wn(e),{outputs:o}=Ae(s),a=xn(s),c=l=>{const h=ne(s),u=pn(e);if(l){const d=Ir(r,s,t);Yi(i,s,d,!1),!n&&!Ct(s)&&h.connect(u,t)}else{const d=Pa(i,s,t);Zi(r,d,!1),!n&&!Ct(s)&&h.disconnect(u,t)}};return Mt(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),st(s)?Yi(i,s,[t,c],!0):Zi(r,[s,t,c],!0),!0):!1},Fa=(s,e,t,n)=>{const{activeInputs:i,passiveInputs:r}=Ae(e),o=Ar(i[n],s,t);return o===null?[Tr(r,s,t,n)[2],!1]:[o[2],!0]},Va=(s,e,t)=>{const{activeInputs:n,passiveInputs:i}=wn(e),r=Ar(n,s,t);return r===null?[Ir(i,s,t)[1],!1]:[r[2],!0]},Xs=(s,e,t,n,i)=>{const[r,o]=Fa(s,t,n,i);if(r!==null&&(Nr(s,r),o&&!e&&!Ct(s)&&Yn(ne(s),ne(t),n,i)),st(t)){const{activeInputs:a}=Ae(t);Ds(t,a)}},Ys=(s,e,t,n)=>{const[i,r]=Va(s,t,n);i!==null&&(Nr(s,i),r&&!e&&!Ct(s)&&ne(s).disconnect(pn(t),n))},La=(s,e)=>{const t=Ae(s),n=[];for(const i of t.outputs)Tn(i)?Xs(s,e,...i):Ys(s,e,...i),n.push(i[0]);return t.outputs.clear(),n},ja=(s,e,t)=>{const n=Ae(s),i=[];for(const r of n.outputs)r[1]===t&&(Tn(r)?Xs(s,e,...r):Ys(s,e,...r),i.push(r[0]),n.outputs.delete(r));return i},Ba=(s,e,t,n,i)=>{const r=Ae(s);return Array.from(r.outputs).filter(o=>o[0]===t&&(n===void 0||o[1]===n)&&(i===void 0||o[2]===i)).map(o=>(Tn(o)?Xs(s,e,...o):Ys(s,e,...o),r.outputs.delete(o),o[0]))},Wa=(s,e,t,n,i,r,o,a,c,l,h,u,d,p,f,m)=>class extends l{constructor(y,w,T,S){super(T),this._context=y,this._nativeAudioNode=T;const v=h(y);u(v)&&t(Ki,()=>Ki(v,m))!==!0&&$a(T),qs.set(this,T),br.set(this,new Set),y.state!=="closed"&&w&&qt(this),s(this,S,T)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(y){this._nativeAudioNode.channelCount=y}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(y){this._nativeAudioNode.channelCountMode=y}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(y){this._nativeAudioNode.channelInterpretation=y}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(y,w=0,T=0){if(w<0||w>=this._nativeAudioNode.numberOfOutputs)throw i();const S=h(this._context),v=f(S);if(d(y)||p(y))throw r();if(Hn(y)){const _=ne(y);try{const A=Xn(this._nativeAudioNode,_,w,T),C=jn(this);(v||C)&&this._nativeAudioNode.disconnect(...A),this.context.state!=="closed"&&!C&&jn(y)&&qt(y)}catch(A){throw A.code===12?r():A}if(e(this,y,w,T,v)){const A=c([this],y);Ss(A,n(v))}return y}const x=pn(y);if(x.name==="playbackRate"&&x.maxValue===1024)throw o();try{this._nativeAudioNode.connect(x,w),(v||jn(this))&&this._nativeAudioNode.disconnect(x,w)}catch(_){throw _.code===12?r():_}if(Ra(this,y,w,v)){const _=c([this],y);Ss(_,n(v))}}disconnect(y,w,T){let S;const v=h(this._context),x=f(v);if(y===void 0)S=La(this,x);else if(typeof y=="number"){if(y<0||y>=this.numberOfOutputs)throw i();S=ja(this,x,y)}else{if(w!==void 0&&(w<0||w>=this.numberOfOutputs)||Hn(y)&&T!==void 0&&(T<0||T>=y.numberOfInputs))throw i();if(S=Ba(this,x,y,w,T),S.length===0)throw r()}for(const b of S){const _=c([this],b);Ss(_,a)}}},za=(s,e,t,n,i,r,o,a,c,l,h,u,d)=>(p,f,m,g=null,y=null)=>{const w=m.value,T=new Qo(w),S=f?n(T):null,v={get defaultValue(){return w},get maxValue(){return g===null?m.maxValue:g},get minValue(){return y===null?m.minValue:y},get value(){return m.value},set value(x){m.value=x,v.setValueAtTime(x,p.context.currentTime)},cancelAndHoldAtTime(x){if(typeof m.cancelAndHoldAtTime=="function")S===null&&T.flush(p.context.currentTime),T.add(i(x)),m.cancelAndHoldAtTime(x);else{const b=Array.from(T).pop();S===null&&T.flush(p.context.currentTime),T.add(i(x));const _=Array.from(T).pop();m.cancelScheduledValues(x),b!==_&&_!==void 0&&(_.type==="exponentialRampToValue"?m.exponentialRampToValueAtTime(_.value,_.endTime):_.type==="linearRampToValue"?m.linearRampToValueAtTime(_.value,_.endTime):_.type==="setValue"?m.setValueAtTime(_.value,_.startTime):_.type==="setValueCurve"&&m.setValueCurveAtTime(_.values,_.startTime,_.duration))}return v},cancelScheduledValues(x){return S===null&&T.flush(p.context.currentTime),T.add(r(x)),m.cancelScheduledValues(x),v},exponentialRampToValueAtTime(x,b){if(x===0)throw new RangeError;if(!Number.isFinite(b)||b<0)throw new RangeError;const _=p.context.currentTime;return S===null&&T.flush(_),Array.from(T).length===0&&(T.add(l(w,_)),m.setValueAtTime(w,_)),T.add(o(x,b)),m.exponentialRampToValueAtTime(x,b),v},linearRampToValueAtTime(x,b){const _=p.context.currentTime;return S===null&&T.flush(_),Array.from(T).length===0&&(T.add(l(w,_)),m.setValueAtTime(w,_)),T.add(a(x,b)),m.linearRampToValueAtTime(x,b),v},setTargetAtTime(x,b,_){return S===null&&T.flush(p.context.currentTime),T.add(c(x,b,_)),m.setTargetAtTime(x,b,_),v},setValueAtTime(x,b){return S===null&&T.flush(p.context.currentTime),T.add(l(x,b)),m.setValueAtTime(x,b),v},setValueCurveAtTime(x,b,_){const N=x instanceof Float32Array?x:new Float32Array(x);if(u!==null&&u.name==="webkitAudioContext"){const A=b+_,C=p.context.sampleRate,k=Math.ceil(b*C),E=Math.floor(A*C),M=E-k,R=new Float32Array(M);for(let P=0;P<M;P+=1){const U=(N.length-1)/_*((k+P)/C-b),F=Math.floor(U),j=Math.ceil(U);R[P]=F===j?N[F]:(1-(U-F))*N[F]+(1-(j-U))*N[j]}S===null&&T.flush(p.context.currentTime),T.add(h(R,b,_)),m.setValueCurveAtTime(R,b,_);const O=E/C;O<A&&d(v,R[R.length-1],O),d(v,N[N.length-1],A)}else S===null&&T.flush(p.context.currentTime),T.add(h(N,b,_)),m.setValueCurveAtTime(N,b,_);return v}};return t.set(v,m),e.set(v,p),s(v,S),v},Ua=s=>({replay(e){for(const t of s)if(t.type==="exponentialRampToValue"){const{endTime:n,value:i}=t;e.exponentialRampToValueAtTime(i,n)}else if(t.type==="linearRampToValue"){const{endTime:n,value:i}=t;e.linearRampToValueAtTime(i,n)}else if(t.type==="setTarget"){const{startTime:n,target:i,timeConstant:r}=t;e.setTargetAtTime(i,n,r)}else if(t.type==="setValue"){const{startTime:n,value:i}=t;e.setValueAtTime(i,n)}else if(t.type==="setValueCurve"){const{duration:n,startTime:i,values:r}=t;e.setValueCurveAtTime(r,i,n)}else throw new Error("Can't apply an unknown automation.")}});class Mr{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((n,i)=>e.call(t,n,i,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const qa={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},Ga=(s,e,t,n,i,r,o,a,c,l,h,u,d,p)=>class extends e{constructor(m,g,y){var w;const T=a(m),S=c(T),v=h({...qa,...y});d(v);const x=Es.get(T),b=x?.get(g),_=S||T.state!=="closed"?T:(w=o(T))!==null&&w!==void 0?w:T,N=i(_,S?null:m.baseLatency,l,g,b,v),A=S?n(g,v,b):null;super(m,!0,N,A);const C=[];N.parameters.forEach((E,M)=>{const R=t(this,S,E);C.push([M,R])}),this._nativeAudioWorkletNode=N,this._onprocessorerror=null,this._parameters=new Mr(C),S&&s(T,this);const{activeInputs:k}=r(this);u(N,k)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(m){const g=typeof m=="function"?p(this,m):null;this._nativeAudioWorkletNode.onprocessorerror=g;const y=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=y!==null&&y===g?m:y}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function Kn(s,e,t,n,i){if(typeof s.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),s.copyFromChannel(e[t],n,i);else{const r=s.getChannelData(n);if(e[t].byteLength===0)e[t]=r.slice(i,i+128);else{const o=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const Er=(s,e,t,n,i)=>{typeof s.copyToChannel=="function"?e[t].byteLength!==0&&s.copyToChannel(e[t],n,i):e[t].byteLength!==0&&s.getChannelData(n).set(e[t],i)},Jn=(s,e)=>{const t=[];for(let n=0;n<s;n+=1){const i=[],r=typeof e=="number"?e:e[n];for(let o=0;o<r;o+=1)i.push(new Float32Array(128));t.push(i)}return t},Ha=(s,e)=>{const t=Ge(Os,s),n=ne(e);return Ge(t,n)},Xa=async(s,e,t,n,i,r,o)=>{const a=e===null?Math.ceil(s.context.length/128)*128:e.length,c=n.channelCount*n.numberOfInputs,l=i.reduce((g,y)=>g+y,0),h=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const u=Ae(s),d=await Ha(t,s),p=Jn(n.numberOfInputs,n.channelCount),f=Jn(n.numberOfOutputs,i),m=Array.from(s.parameters.keys()).reduce((g,y)=>({...g,[y]:new Float32Array(128)}),{});for(let g=0;g<a;g+=128){if(n.numberOfInputs>0&&e!==null)for(let y=0;y<n.numberOfInputs;y+=1)for(let w=0;w<n.channelCount;w+=1)Kn(e,p[y],w,w,g);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:y},w)=>{Kn(e,m,y,c+w,g)});for(let y=0;y<n.numberOfInputs;y+=1)for(let w=0;w<i[y];w+=1)f[y][w].byteLength===0&&(f[y][w]=new Float32Array(128));try{const y=p.map((T,S)=>u.activeInputs[S].size===0?[]:T),w=o(g/t.sampleRate,t.sampleRate,()=>d.process(y,f,m));if(h!==null)for(let T=0,S=0;T<n.numberOfOutputs;T+=1){for(let v=0;v<i[T];v+=1)Er(h,f[T],v,S+v,g);S+=i[T]}if(!w)break}catch(y){s.dispatchEvent(new ErrorEvent("processorerror",{colno:y.colno,filename:y.filename,lineno:y.lineno,message:y.message}));break}}return h},Ya=(s,e,t,n,i,r,o,a,c,l,h,u,d,p,f,m)=>(g,y,w)=>{const T=new WeakMap;let S=null;const v=async(x,b)=>{let _=h(x),N=null;const A=Te(_,b),C=Array.isArray(y.outputChannelCount)?y.outputChannelCount:Array.from(y.outputChannelCount);if(u===null){const k=C.reduce((O,P)=>O+P,0),E=i(b,{channelCount:Math.max(1,k),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,k)}),M=[];for(let O=0;O<x.numberOfOutputs;O+=1)M.push(n(b,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:C[O]}));const R=o(b,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1});R.connect=e.bind(null,M),R.disconnect=c.bind(null,M),N=[E,M,R]}else A||(_=new u(b,g));if(T.set(b,N===null?_:N[2]),N!==null){if(S===null){if(w===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const P=x.channelCount*x.numberOfInputs,U=w.parameterDescriptors===void 0?0:w.parameterDescriptors.length,F=P+U;S=Xa(x,F===0?null:await(async()=>{const L=new d(F,Math.ceil(x.context.length/128)*128,b.sampleRate),Y=[],De=[];for(let se=0;se<y.numberOfInputs;se+=1)Y.push(o(L,{channelCount:y.channelCount,channelCountMode:y.channelCountMode,channelInterpretation:y.channelInterpretation,gain:1})),De.push(i(L,{channelCount:y.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:y.channelCount}));const Pe=await Promise.all(Array.from(x.parameters.values()).map(async se=>{const Se=r(L,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:se.value});return await p(L,se,Se.offset),Se})),q=n(L,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,P+U)});for(let se=0;se<y.numberOfInputs;se+=1){Y[se].connect(De[se]);for(let Se=0;Se<y.channelCount;Se+=1)De[se].connect(q,Se,se*y.channelCount+Se)}for(const[se,Se]of Pe.entries())Se.connect(q,0,P+se),Se.start(0);return q.connect(L.destination),await Promise.all(Y.map(se=>f(x,L,se))),m(L)})(),b,y,C,w,l)}const k=await S,E=t(b,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[M,R,O]=N;k!==null&&(E.buffer=k,E.start(0)),E.connect(M);for(let P=0,U=0;P<x.numberOfOutputs;P+=1){const F=R[P];for(let j=0;j<C[P];j+=1)M.connect(F,U+j,j);U+=C[P]}return O}if(A)for(const[k,E]of x.parameters.entries())await s(b,E,_.parameters.get(k));else for(const[k,E]of x.parameters.entries())await p(b,E,_.parameters.get(k));return await f(x,b,_),_};return{render(x,b){a(b,x);const _=T.get(b);return _!==void 0?Promise.resolve(_):v(x,b)}}},Za=(s,e,t,n,i,r,o,a,c,l,h,u,d,p,f,m,g,y,w,T)=>class extends f{constructor(v,x){super(v,x),this._nativeContext=v,this._audioWorklet=s===void 0?void 0:{addModule:(b,_)=>s(this,b,_)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new i(this)}createBuffer(v,x,b){return new t({length:x,numberOfChannels:v,sampleRate:b})}createBufferSource(){return new n(this)}createChannelMerger(v=6){return new r(this,{numberOfInputs:v})}createChannelSplitter(v=6){return new o(this,{numberOfOutputs:v})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(v=1){return new h(this,{maxDelayTime:v})}createDynamicsCompressor(){return new u(this)}createGain(){return new d(this)}createIIRFilter(v,x){return new p(this,{feedback:x,feedforward:v})}createOscillator(){return new m(this)}createPanner(){return new g(this)}createPeriodicWave(v,x,b={disableNormalization:!1}){return new y(this,{...b,imag:x,real:v})}createStereoPanner(){return new w(this)}createWaveShaper(){return new T(this)}decodeAudioData(v,x,b){return l(this._nativeContext,v).then(_=>(typeof x=="function"&&x(_),_),_=>{throw typeof b=="function"&&b(_),_})}},Ka={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},Ja=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const u=r(l),d={...Ka,...h},p=i(u,d),f=o(u),m=f?t():null;super(l,!1,p,m),this._Q=e(this,f,p.Q,Ce,Ie),this._detune=e(this,f,p.detune,1200*Math.log2(Ce),-1200*Math.log2(Ce)),this._frequency=e(this,f,p.frequency,l.sampleRate/2,0),this._gain=e(this,f,p.gain,40*Math.log10(Ce),Ie),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,h,u){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,h,u)}catch(d){throw d.code===11?n():d}if(l.length!==h.length||h.length!==u.length)throw n()}},Qa=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const u={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,u)}return r.set(c,l),h?(await s(c,a.Q,l.Q),await s(c,a.detune,l.detune),await s(c,a.frequency,l.frequency),await s(c,a.gain,l.gain)):(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},ec=(s,e)=>(t,n)=>{const i=e.get(t);if(i!==void 0)return i;const r=s.get(t);if(r!==void 0)return r;try{const o=n();return o instanceof Promise?(s.set(t,o),o.catch(()=>!1).then(a=>(s.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},tc={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},nc=(s,e,t,n,i)=>class extends s{constructor(o,a){const c=n(o),l={...tc,...a},h=t(c,l),u=i(c)?e():null;super(o,!1,h,u)}},sc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},ic={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},rc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h=r({...ic,...c}),u=t(l,h),d=i(l)?e():null;super(a,!1,u,d)}},oc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=s(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},ac=s=>(e,t,n)=>s(t,e,n),cc=s=>(e,t,n=0,i=0)=>{const r=e[n];if(r===void 0)throw s();return Zn(t)?r.connect(t,0,i):r.connect(t,0)},lc=s=>(e,t)=>{const n=s(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=e.createBuffer(1,2,44100);return n.buffer=i,n.loop=!0,n.connect(t),n.start(),()=>{n.stop(),n.disconnect(t)}},hc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},uc=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),u={...hc,...l},d=n(h,u),p=r(h),f=p?t():null;super(c,!1,d,f),this._constantSourceNodeRenderer=f,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Ce,Ie),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const h=this._nativeConstantSourceNode.onended;this._onended=h!==null&&h===l?c:h}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){qt(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),st(this)&&bn(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},dc=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,h)=>{let u=t(l);const d=Te(u,h);if(!d){const p={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,offset:u.offset.value};u=e(h,p),o!==null&&u.start(o),a!==null&&u.stop(a)}return r.set(h,u),d?await s(h,l.offset,u.offset):await n(h,l.offset,u.offset),await i(l,h,u),u};return{set start(l){o=l},set stop(l){a=l},render(l,h){const u=r.get(h);return u!==void 0?Promise.resolve(u):c(l,h)}}},pc=s=>e=>(s[0]=e,s[0]),fc={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},mc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h={...fc,...c},u=t(l,h),p=i(l)?e():null;super(a,!1,u,p),this._isBufferNullified=!1,this._nativeConvolverNode=u,h.buffer!==null&&r(this,h.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},gc=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=s(o,l)}return n.set(o,a),Jt(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},vc=(s,e)=>(t,n,i)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,n,i)}catch(r){throw r.name==="SyntaxError"?s():r}},yc=()=>new DOMException("","DataCloneError"),Ji=s=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(n=>{const i=()=>{t.onmessage=null,e.close(),t.close(),n()};t.onmessage=()=>i();try{e.postMessage(s,[s])}catch{}finally{i()}})},_c=(s,e,t,n,i,r,o,a,c,l,h)=>(u,d)=>{const p=o(u)?u:r(u);if(i.has(d)){const f=t();return Promise.reject(f)}try{i.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(f=>(Ji(d).catch(()=>{}),e(a,()=>a(f))||h(f),s.add(f),f)):new Promise((f,m)=>{const g=async()=>{try{await Ji(d)}catch{}},y=w=>{m(w),g()};try{p.decodeAudioData(d,w=>{typeof w.copyFromChannel!="function"&&(l(w),Hs(w)),s.add(w),g().then(()=>f(w))},w=>{y(w===null?n():w)})}catch(w){y(w)}})},xc=(s,e,t,n,i,r,o,a)=>(c,l)=>{const h=e.get(c);if(h===void 0)throw new Error("Missing the expected cycle count.");const u=r(c.context),d=a(u);if(h===l){if(e.delete(c),!d&&o(c)){const p=n(c),{outputs:f}=t(c);for(const m of f)if(Tn(m)){const g=n(m[0]);s(p,g,m[1],m[2])}else{const g=i(m[0]);p.connect(g,m[1])}}}else e.set(c,h-l)},bc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},wc=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),u={...bc,...l},d=n(h,u),p=r(h),f=p?t(u.maxDelayTime):null;super(c,!1,d,f),this._delayTime=e(this,p,d.delayTime),o(this,u.maxDelayTime)}get delayTime(){return this._delayTime}},Tc=(s,e,t,n,i)=>r=>{const o=new WeakMap,a=async(c,l)=>{let h=t(c);const u=Te(h,l);if(!u){const d={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,delayTime:h.delayTime.value,maxDelayTime:r};h=e(l,d)}return o.set(l,h),u?await s(l,c.delayTime,h.delayTime):await n(l,c.delayTime,h.delayTime),await i(c,l,h),h};return{render(c,l){const h=o.get(l);return h!==void 0?Promise.resolve(h):a(c,l)}}},Sc=s=>(e,t,n,i)=>s(e[i],r=>r[0]===t&&r[1]===n),kc=s=>(e,t)=>{s(e).delete(t)},Cc=s=>"delayTime"in s,Ac=(s,e,t)=>function n(i,r){const o=Hn(r)?r:t(s,r);if(Cc(o))return[];if(i[0]===o)return[i];if(i.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>n([...i,o],c[0])).reduce((c,l)=>c.concat(l),[])},Rn=(s,e,t)=>{const n=e[t];if(n===void 0)throw s();return n},Nc=s=>(e,t=void 0,n=void 0,i=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Rn(s,e,t).disconnect():Zn(t)?n===void 0?e.forEach(r=>r.disconnect(t)):i===void 0?Rn(s,e,n).disconnect(t,0):Rn(s,e,n).disconnect(t,0,i):n===void 0?e.forEach(r=>r.disconnect(t)):Rn(s,e,n).disconnect(t,0),Ic={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Mc=(s,e,t,n,i,r,o,a)=>class extends s{constructor(l,h){const u=r(l),d={...Ic,...h},p=n(u,d),f=o(u),m=f?t():null;super(l,!1,p,m),this._attack=e(this,f,p.attack),this._knee=e(this,f,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,f,p.ratio),this._release=e(this,f,p.release),this._threshold=e(this,f,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const h=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=h,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const h=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=h,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Ec=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const u={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,u)}return r.set(c,l),h?(await s(c,a.attack,l.attack),await s(c,a.knee,l.knee),await s(c,a.ratio,l.ratio),await s(c,a.release,l.release),await s(c,a.threshold,l.threshold)):(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Oc=()=>new DOMException("","EncodingError"),Dc=s=>e=>new Promise((t,n)=>{if(s===null){n(new SyntaxError);return}const i=s.document.head;if(i===null)n(new SyntaxError);else{const r=s.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=s.onerror,l=()=>{s.onerror=c,URL.revokeObjectURL(a)};s.onerror=(h,u,d,p,f)=>{if(u===a||u===s.location.href&&d===1&&p===1)return l(),n(f),!1;if(c!==null)return c(h,u,d,p,f)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",i.appendChild(r)}}),Pc=s=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,n,i){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=s(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(t,r,i)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,n,i){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,i)}},$c=s=>(e,t,n)=>{Object.defineProperties(s,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return n()}finally{s!==null&&(delete s.currentFrame,delete s.currentTime)}},Rc=s=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw s()},Fc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Vc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={...Fc,...c},u=n(l,h),d=r(l),p=d?t():null;super(a,!1,u,p),this._gain=e(this,d,u.gain,Ce,Ie)}get gain(){return this._gain}},Lc=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,u)}return r.set(c,l),h?await s(c,a.gain,l.gain):await n(c,a.gain,l.gain),await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},jc=(s,e)=>t=>e(s,t),Bc=s=>e=>{const t=s(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Wc=s=>e=>{var t;return(t=s.get(e))!==null&&t!==void 0?t:0},zc=s=>e=>{const t=s(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},Uc=s=>e=>s.get(e),ye=()=>new DOMException("","InvalidStateError"),qc=s=>e=>{const t=s.get(e);if(t===void 0)throw ye();return t},Gc=(s,e)=>t=>{let n=s.get(t);if(n!==void 0)return n;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new e(1,1,44100),s.set(t,n),n},Hc=s=>e=>{const t=s.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},os=()=>new DOMException("","InvalidAccessError"),Xc=s=>{s.getFrequencyResponse=(e=>(t,n,i)=>{if(t.length!==n.length||n.length!==i.length)throw os();return e.call(s,t,n,i)})(s.getFrequencyResponse)},Yc={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Zc=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=n(a),h=i(l),u={...Yc,...c},d=e(l,h?null:a.baseLatency,u),p=h?t(u.feedback,u.feedforward):null;super(a,!1,d,p),Xc(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},Or=(s,e,t,n,i,r,o,a,c,l,h)=>{const u=l.length;let d=a;for(let p=0;p<u;p+=1){let f=t[0]*l[p];for(let m=1;m<i;m+=1){const g=d-m&c-1;f+=t[m]*r[g],f-=s[m]*o[g]}for(let m=i;m<n;m+=1)f+=t[m]*r[d-m&c-1];for(let m=i;m<e;m+=1)f-=s[m]*o[d-m&c-1];r[d]=l[p],o[d]=f,d=d+1&c-1,h[p]=f}return d},Kc=(s,e,t,n)=>{const i=t instanceof Float64Array?t:new Float64Array(t),r=n instanceof Float64Array?n:new Float64Array(n),o=i.length,a=r.length,c=Math.min(o,a);if(i[0]!==1){for(let f=0;f<o;f+=1)r[f]/=i[0];for(let f=1;f<a;f+=1)i[f]/=i[0]}const l=32,h=new Float32Array(l),u=new Float32Array(l),d=e.createBuffer(s.numberOfChannels,s.length,s.sampleRate),p=s.numberOfChannels;for(let f=0;f<p;f+=1){const m=s.getChannelData(f),g=d.getChannelData(f);h.fill(0),u.fill(0),Or(i,o,r,a,c,h,u,0,l,m,g)}return d},Jc=(s,e,t,n,i)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(h,u)=>{let d=null,p=e(h);const f=Te(p,u);if(u.createIIRFilter===void 0?d=s(u,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):f||(p=u.createIIRFilter(o,r)),a.set(u,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const g=new t(h.context.destination.channelCount,h.context.length,u.sampleRate);c=(async()=>{await n(h,g,g.destination);const y=await i(g);return Kc(y,u,r,o)})()}const m=await c;return d.buffer=m,d.start(0),d}return await n(h,u,p),p};return{render(h,u){const d=a.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},Qc=(s,e,t,n,i,r)=>o=>(a,c)=>{const l=s.get(a);if(l===void 0){if(!o&&r(a)){const h=n(a),{outputs:u}=t(a);for(const d of u)if(Tn(d)){const p=n(d[0]);e(h,p,d[1],d[2])}else{const p=i(d[0]);h.disconnect(p,d[1])}}s.set(a,c)}else s.set(a,l+c)},el=(s,e)=>t=>{const n=s.get(t);return e(n)||e(t)},tl=(s,e)=>t=>s.has(t)||e(t),nl=(s,e)=>t=>s.has(t)||e(t),sl=(s,e)=>t=>{const n=s.get(t);return e(n)||e(t)},il=s=>e=>s!==null&&e instanceof s,rl=s=>e=>s!==null&&typeof s.AudioNode=="function"&&e instanceof s.AudioNode,ol=s=>e=>s!==null&&typeof s.AudioParam=="function"&&e instanceof s.AudioParam,al=(s,e)=>t=>s(t)||e(t),cl=s=>e=>s!==null&&e instanceof s,ll=s=>s!==null&&s.isSecureContext,hl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},ul={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},dl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r);if(n(a))throw new TypeError;const c={...ul,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},pl=(s,e,t,n)=>class extends s{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},fl=(s,e,t)=>class extends s{constructor(i,r){const o=t(i),a=e(o,r);super(i,!0,a,null)}},ml=(s,e,t,n,i,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,is.set(this,a),n(a)&&i.set(a,new Set),this._destination=new s(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},fn=s=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=s.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},gl=(s,e)=>(t,n,i)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const h=r.size===0;if(e(a))return o.call(t,a,c,l),s(r,[a,c,l],u=>u[0]===a&&u[1]===c&&u[2]===l,!0),h&&n(),a;o.call(t,a,c),s(r,[a,c],u=>u[0]===a&&u[1]===c,!0),h&&n()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const h=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const u=r.size===0;h&&u&&i()})(t.disconnect),t},re=(s,e,t)=>{const n=e[t];n!==void 0&&n!==s[t]&&(s[t]=n)},ge=(s,e)=>{re(s,e,"channelCount"),re(s,e,"channelCountMode"),re(s,e,"channelInterpretation")},Qi=s=>typeof s.getFloatTimeDomainData=="function",vl=s=>{s.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);s.getByteTimeDomainData(t);const n=Math.max(t.length,s.fftSize);for(let i=0;i<n;i+=1)e[i]=(t[i]-128)*.0078125;return e}},yl=(s,e)=>(t,n)=>{const i=t.createAnalyser();if(ge(i,n),!(n.maxDecibels>n.minDecibels))throw e();return re(i,n,"fftSize"),re(i,n,"maxDecibels"),re(i,n,"minDecibels"),re(i,n,"smoothingTimeConstant"),s(Qi,()=>Qi(i))||vl(i),i},_l=s=>s===null?null:s.hasOwnProperty("AudioBuffer")?s.AudioBuffer:null,he=(s,e,t)=>{const n=e[t];n!==void 0&&n!==s[t].value&&(s[t].value=n)},xl=s=>{s.start=(e=>{let t=!1;return(n=0,i=0,r)=>{if(t)throw ye();e.call(s,n,i,r),t=!0}})(s.start)},Zs=s=>{s.start=(e=>(t=0,n=0,i)=>{if(typeof i=="number"&&i<0||n<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(s,t,n,i)})(s.start)},Ks=s=>{s.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(s,t)})(s.stop)},bl=(s,e,t,n,i,r,o,a,c,l,h)=>(u,d)=>{const p=u.createBufferSource();return ge(p,d),he(p,d,"playbackRate"),re(p,d,"buffer"),re(p,d,"loop"),re(p,d,"loopEnd"),re(p,d,"loopStart"),e(t,()=>t(u))||xl(p),e(n,()=>n(u))||c(p),e(i,()=>i(u))||l(p,u),e(r,()=>r(u))||Zs(p),e(o,()=>o(u))||h(p,u),e(a,()=>a(u))||Ks(p),s(u,p),p},wl=s=>s===null?null:s.hasOwnProperty("AudioContext")?s.AudioContext:s.hasOwnProperty("webkitAudioContext")?s.webkitAudioContext:null,Tl=(s,e)=>(t,n,i)=>{const r=t.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const o=s(t,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Sl=s=>s===null?null:s.hasOwnProperty("AudioWorkletNode")?s.AudioWorkletNode:null,kl=s=>{const{port1:e}=new MessageChannel;try{e.postMessage(s)}finally{e.close()}},Cl=(s,e,t,n,i)=>(r,o,a,c,l,h)=>{if(a!==null)try{const u=new a(r,c,h),d=new Map;let p=null;if(Object.defineProperties(u,{channelCount:{get:()=>h.channelCount,set:()=>{throw s()}},channelCountMode:{get:()=>"explicit",set:()=>{throw s()}},onprocessorerror:{get:()=>p,set:f=>{typeof p=="function"&&u.removeEventListener("processorerror",p),p=typeof f=="function"?f:null,typeof p=="function"&&u.addEventListener("processorerror",p)}}}),u.addEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=typeof m[1]=="function"?m[1]:typeof m[1]=="object"&&m[1]!==null&&typeof m[1].handleEvent=="function"?m[1].handleEvent:null;if(g!==null){const y=d.get(m[1]);y!==void 0?m[1]=y:(m[1]=w=>{w.type==="error"?(Object.defineProperties(w,{type:{value:"processorerror"}}),g(w)):g(new ErrorEvent(m[0],{...w}))},d.set(g,m[1]))}}return f.call(u,"error",m[1],m[2]),f.call(u,...m)})(u.addEventListener),u.removeEventListener=(f=>(...m)=>{if(m[0]==="processorerror"){const g=d.get(m[1]);g!==void 0&&(d.delete(m[1]),m[1]=g)}return f.call(u,"error",m[1],m[2]),f.call(u,m[0],m[1],m[2])})(u.removeEventListener),h.numberOfOutputs!==0){const f=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return u.connect(f).connect(r.destination),i(u,()=>f.disconnect(),()=>f.connect(r.destination))}return u}catch(u){throw u.code===11?n():u}if(l===void 0)throw n();return kl(h),e(r,o,l,h)},Dr=(s,e)=>s===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(s*e))))),Al=s=>new Promise((e,t)=>{const{port1:n,port2:i}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),i.close(),e(r)},n.onmessageerror=({data:r})=>{n.close(),i.close(),t(r)},i.postMessage(s)}),Nl=async(s,e)=>{const t=await Al(e);return new s(t)},Il=(s,e,t,n)=>{let i=Os.get(s);i===void 0&&(i=new WeakMap,Os.set(s,i));const r=Nl(t,n);return i.set(e,r),r},Ml=(s,e,t,n,i,r,o,a,c,l,h,u,d)=>(p,f,m,g)=>{if(g.numberOfInputs===0&&g.numberOfOutputs===0)throw c();const y=Array.isArray(g.outputChannelCount)?g.outputChannelCount:Array.from(g.outputChannelCount);if(y.some(I=>I<1))throw c();if(y.length!==g.numberOfOutputs)throw e();if(g.channelCountMode!=="explicit")throw c();const w=g.channelCount*g.numberOfInputs,T=y.reduce((I,V)=>I+V,0),S=m.parameterDescriptors===void 0?0:m.parameterDescriptors.length;if(w+S>6||T>6)throw c();const v=new MessageChannel,x=[],b=[];for(let I=0;I<g.numberOfInputs;I+=1)x.push(o(p,{channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation,gain:1})),b.push(i(p,{channelCount:g.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:g.channelCount}));const _=[];if(m.parameterDescriptors!==void 0)for(const{defaultValue:I,maxValue:V,minValue:me,name:ae}of m.parameterDescriptors){const H=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:g.parameterData[ae]!==void 0?g.parameterData[ae]:I===void 0?0:I});Object.defineProperties(H.offset,{defaultValue:{get:()=>I===void 0?0:I},maxValue:{get:()=>V===void 0?Ce:V},minValue:{get:()=>me===void 0?Ie:me}}),_.push(H)}const N=n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,w+S)}),A=Dr(f,p.sampleRate),C=a(p,A,w+S,Math.max(1,T)),k=i(p,{channelCount:Math.max(1,T),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,T)}),E=[];for(let I=0;I<g.numberOfOutputs;I+=1)E.push(n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:y[I]}));for(let I=0;I<g.numberOfInputs;I+=1){x[I].connect(b[I]);for(let V=0;V<g.channelCount;V+=1)b[I].connect(N,V,I*g.channelCount+V)}const M=new Mr(m.parameterDescriptors===void 0?[]:m.parameterDescriptors.map(({name:I},V)=>{const me=_[V];return me.connect(N,0,w+V),me.start(0),[I,me.offset]}));N.connect(C);let R=g.channelInterpretation,O=null;const P=g.numberOfOutputs===0?[C]:E,U={get bufferSize(){return A},get channelCount(){return g.channelCount},set channelCount(I){throw t()},get channelCountMode(){return g.channelCountMode},set channelCountMode(I){throw t()},get channelInterpretation(){return R},set channelInterpretation(I){for(const V of x)V.channelInterpretation=I;R=I},get context(){return C.context},get inputs(){return x},get numberOfInputs(){return g.numberOfInputs},get numberOfOutputs(){return g.numberOfOutputs},get onprocessorerror(){return O},set onprocessorerror(I){typeof O=="function"&&U.removeEventListener("processorerror",O),O=typeof I=="function"?I:null,typeof O=="function"&&U.addEventListener("processorerror",O)},get parameters(){return M},get port(){return v.port2},addEventListener(...I){return C.addEventListener(I[0],I[1],I[2])},connect:s.bind(null,P),disconnect:l.bind(null,P),dispatchEvent(...I){return C.dispatchEvent(I[0])},removeEventListener(...I){return C.removeEventListener(I[0],I[1],I[2])}},F=new Map;v.port1.addEventListener=(I=>(...V)=>{if(V[0]==="message"){const me=typeof V[1]=="function"?V[1]:typeof V[1]=="object"&&V[1]!==null&&typeof V[1].handleEvent=="function"?V[1].handleEvent:null;if(me!==null){const ae=F.get(V[1]);ae!==void 0?V[1]=ae:(V[1]=H=>{h(p.currentTime,p.sampleRate,()=>me(H))},F.set(me,V[1]))}}return I.call(v.port1,V[0],V[1],V[2])})(v.port1.addEventListener),v.port1.removeEventListener=(I=>(...V)=>{if(V[0]==="message"){const me=F.get(V[1]);me!==void 0&&(F.delete(V[1]),V[1]=me)}return I.call(v.port1,V[0],V[1],V[2])})(v.port1.removeEventListener);let j=null;Object.defineProperty(v.port1,"onmessage",{get:()=>j,set:I=>{typeof j=="function"&&v.port1.removeEventListener("message",j),j=typeof I=="function"?I:null,typeof j=="function"&&(v.port1.addEventListener("message",j),v.port1.start())}}),m.prototype.port=v.port1;let L=null;Il(p,U,m,g).then(I=>L=I);const De=Jn(g.numberOfInputs,g.channelCount),Pe=Jn(g.numberOfOutputs,y),q=m.parameterDescriptors===void 0?[]:m.parameterDescriptors.reduce((I,{name:V})=>({...I,[V]:new Float32Array(128)}),{});let se=!0;const Se=()=>{g.numberOfOutputs>0&&C.disconnect(k);for(let I=0,V=0;I<g.numberOfOutputs;I+=1){const me=E[I];for(let ae=0;ae<y[I];ae+=1)k.disconnect(me,V+ae,ae);V+=y[I]}},$=new Map;C.onaudioprocess=({inputBuffer:I,outputBuffer:V})=>{if(L!==null){const me=u(U);for(let ae=0;ae<A;ae+=128){for(let H=0;H<g.numberOfInputs;H+=1)for(let le=0;le<g.channelCount;le+=1)Kn(I,De[H],le,le,ae);m.parameterDescriptors!==void 0&&m.parameterDescriptors.forEach(({name:H},le)=>{Kn(I,q,H,w+le,ae)});for(let H=0;H<g.numberOfInputs;H+=1)for(let le=0;le<y[H];le+=1)Pe[H][le].byteLength===0&&(Pe[H][le]=new Float32Array(128));try{const H=De.map((Fe,ct)=>{if(me[ct].size>0)return $.set(ct,A/128),Fe;const ws=$.get(ct);return ws===void 0?[]:(Fe.every(ko=>ko.every(Co=>Co===0))&&(ws===1?$.delete(ct):$.set(ct,ws-1)),Fe)});se=h(p.currentTime+ae/p.sampleRate,p.sampleRate,()=>L.process(H,Pe,q));for(let Fe=0,ct=0;Fe<g.numberOfOutputs;Fe+=1){for(let on=0;on<y[Fe];on+=1)Er(V,Pe[Fe],on,ct+on,ae);ct+=y[Fe]}}catch(H){se=!1,U.dispatchEvent(new ErrorEvent("processorerror",{colno:H.colno,filename:H.filename,lineno:H.lineno,message:H.message}))}if(!se){for(let H=0;H<g.numberOfInputs;H+=1){x[H].disconnect(b[H]);for(let le=0;le<g.channelCount;le+=1)b[ae].disconnect(N,le,H*g.channelCount+le)}if(m.parameterDescriptors!==void 0){const H=m.parameterDescriptors.length;for(let le=0;le<H;le+=1){const Fe=_[le];Fe.disconnect(N,0,w+le),Fe.stop()}}N.disconnect(C),C.onaudioprocess=null,_t?Se():Pt();break}}}};let _t=!1;const xt=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),Dt=()=>C.connect(xt).connect(p.destination),Pt=()=>{C.disconnect(xt),xt.disconnect()},To=()=>{if(se){Pt(),g.numberOfOutputs>0&&C.connect(k);for(let I=0,V=0;I<g.numberOfOutputs;I+=1){const me=E[I];for(let ae=0;ae<y[I];ae+=1)k.connect(me,V+ae,ae);V+=y[I]}}_t=!0},So=()=>{se&&(Dt(),Se()),_t=!1};return Dt(),d(U,To,So)},Pr=(s,e)=>{const t=s.createBiquadFilter();return ge(t,e),he(t,e,"Q"),he(t,e,"detune"),he(t,e,"frequency"),he(t,e,"gain"),re(t,e,"type"),t},El=(s,e)=>(t,n)=>{const i=t.createChannelMerger(n.numberOfInputs);return s!==null&&s.name==="webkitAudioContext"&&e(t,i),ge(i,n),i},Ol=s=>{const e=s.numberOfOutputs;Object.defineProperty(s,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw ye()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw ye()}}),Object.defineProperty(s,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw ye()}})},Sn=(s,e)=>{const t=s.createChannelSplitter(e.numberOfOutputs);return ge(t,e),Ol(t),t},Dl=(s,e,t,n,i)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return ge(a,o),he(a,o,"offset"),e(n,()=>n(r))||Zs(a),e(i,()=>i(r))||Ks(a),s(r,a),a},Qt=(s,e)=>(s.connect=e.connect.bind(e),s.disconnect=e.disconnect.bind(e),s),Pl=(s,e,t,n)=>(i,{offset:r,...o})=>{const a=i.createBuffer(1,2,44100),c=e(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(i,{...o,gain:r}),h=a.getChannelData(0);h[0]=1,h[1]=1,c.buffer=a,c.loop=!0;const u={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(f){l.channelCount=f},get channelCountMode(){return l.channelCountMode},set channelCountMode(f){l.channelCountMode=f},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(f){l.channelInterpretation=f},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(f){c.onended=f},addEventListener(...f){return c.addEventListener(f[0],f[1],f[2])},dispatchEvent(...f){return c.dispatchEvent(f[0])},removeEventListener(...f){return c.removeEventListener(f[0],f[1],f[2])},start(f=0){c.start.call(c,f)},stop(f=0){c.stop.call(c,f)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return s(i,c),n(Qt(u,l),d,p)},$l=(s,e)=>(t,n)=>{const i=t.createConvolver();if(ge(i,n),n.disableNormalization===i.normalize&&(i.normalize=!n.disableNormalization),re(i,n,"buffer"),n.channelCount>2||(e(i,"channelCount",r=>()=>r.call(i),r=>o=>{if(o>2)throw s();return r.call(i,o)}),n.channelCountMode==="max"))throw s();return e(i,"channelCountMode",r=>()=>r.call(i),r=>o=>{if(o==="max")throw s();return r.call(i,o)}),i},$r=(s,e)=>{const t=s.createDelay(e.maxDelayTime);return ge(t,e),he(t,e,"delayTime"),t},Rl=s=>(e,t)=>{const n=e.createDynamicsCompressor();if(ge(n,t),t.channelCount>2||t.channelCountMode==="max")throw s();return he(n,t,"attack"),he(n,t,"knee"),he(n,t,"ratio"),he(n,t,"release"),he(n,t,"threshold"),n},Ee=(s,e)=>{const t=s.createGain();return ge(t,e),he(t,e,"gain"),t},Fl=s=>(e,t,n)=>{if(e.createIIRFilter===void 0)return s(e,t,n);const i=e.createIIRFilter(n.feedforward,n.feedback);return ge(i,n),i};function Vl(s,e){const t=e[0]*e[0]+e[1]*e[1];return[(s[0]*e[0]+s[1]*e[1])/t,(s[1]*e[0]-s[0]*e[1])/t]}function Ll(s,e){return[s[0]*e[0]-s[1]*e[1],s[0]*e[1]+s[1]*e[0]]}function er(s,e){let t=[0,0];for(let n=s.length-1;n>=0;n-=1)t=Ll(t,e),t[0]+=s[n];return t}const jl=(s,e,t,n)=>(i,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:h})=>{const u=Dr(r,i.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=h instanceof Float64Array?h:new Float64Array(h),f=d.length,m=p.length,g=Math.min(f,m);if(f===0||f>20)throw n();if(d[0]===0)throw e();if(m===0||m>20)throw n();if(p[0]===0)throw e();if(d[0]!==1){for(let _=0;_<m;_+=1)p[_]/=d[0];for(let _=1;_<f;_+=1)d[_]/=d[0]}const y=t(i,u,o,o);y.channelCount=o,y.channelCountMode=a,y.channelInterpretation=c;const w=32,T=[],S=[],v=[];for(let _=0;_<o;_+=1){T.push(0);const N=new Float32Array(w),A=new Float32Array(w);N.fill(0),A.fill(0),S.push(N),v.push(A)}y.onaudioprocess=_=>{const N=_.inputBuffer,A=_.outputBuffer,C=N.numberOfChannels;for(let k=0;k<C;k+=1){const E=N.getChannelData(k),M=A.getChannelData(k);T[k]=Or(d,f,p,m,g,S[k],v[k],T[k],w,E,M)}};const x=i.sampleRate/2;return Qt({get bufferSize(){return u},get channelCount(){return y.channelCount},set channelCount(_){y.channelCount=_},get channelCountMode(){return y.channelCountMode},set channelCountMode(_){y.channelCountMode=_},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(_){y.channelInterpretation=_},get context(){return y.context},get inputs(){return[y]},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},addEventListener(..._){return y.addEventListener(_[0],_[1],_[2])},dispatchEvent(..._){return y.dispatchEvent(_[0])},getFrequencyResponse(_,N,A){if(_.length!==N.length||N.length!==A.length)throw s();const C=_.length;for(let k=0;k<C;k+=1){const E=-Math.PI*(_[k]/x),M=[Math.cos(E),Math.sin(E)],R=er(p,M),O=er(d,M),P=Vl(R,O);N[k]=Math.sqrt(P[0]*P[0]+P[1]*P[1]),A[k]=Math.atan2(P[1],P[0])}},removeEventListener(..._){return y.removeEventListener(_[0],_[1],_[2])}},y)},Bl=(s,e)=>s.createMediaElementSource(e.mediaElement),Wl=(s,e)=>{const t=s.createMediaStreamDestination();return ge(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},zl=(s,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const n=t.slice(0,1),i=s.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(i,"mediaStream",{value:e}),i},Ul=(s,e)=>(t,{mediaStreamTrack:n})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(n);const i=new MediaStream([n]),r=t.createMediaStreamSource(i);if(n.kind!=="audio")throw s();if(e(t))throw new TypeError;return r},ql=s=>s===null?null:s.hasOwnProperty("OfflineAudioContext")?s.OfflineAudioContext:s.hasOwnProperty("webkitOfflineAudioContext")?s.webkitOfflineAudioContext:null,Gl=(s,e,t,n,i,r)=>(o,a)=>{const c=o.createOscillator();return ge(c,a),he(c,a,"detune"),he(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):re(c,a,"type"),e(t,()=>t(o))||Zs(c),e(n,()=>n(o))||r(c,o),e(i,()=>i(o))||Ks(c),s(o,c),c},Hl=s=>(e,t)=>{const n=e.createPanner();return n.orientationX===void 0?s(e,t):(ge(n,t),he(n,t,"orientationX"),he(n,t,"orientationY"),he(n,t,"orientationZ"),he(n,t,"positionX"),he(n,t,"positionY"),he(n,t,"positionZ"),re(n,t,"coneInnerAngle"),re(n,t,"coneOuterAngle"),re(n,t,"coneOuterGain"),re(n,t,"distanceModel"),re(n,t,"maxDistance"),re(n,t,"panningModel"),re(n,t,"refDistance"),re(n,t,"rolloffFactor"),n)},Xl=(s,e,t,n,i,r,o,a,c,l)=>(h,{coneInnerAngle:u,coneOuterAngle:d,coneOuterGain:p,distanceModel:f,maxDistance:m,orientationX:g,orientationY:y,orientationZ:w,panningModel:T,positionX:S,positionY:v,positionZ:x,refDistance:b,rolloffFactor:_,...N})=>{const A=h.createPanner();if(N.channelCount>2||N.channelCountMode==="max")throw o();ge(A,N);const C={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},k=t(h,{...C,channelInterpretation:"speakers",numberOfInputs:6}),E=n(h,{...N,gain:1}),M=n(h,{...C,gain:1}),R=n(h,{...C,gain:0}),O=n(h,{...C,gain:0}),P=n(h,{...C,gain:0}),U=n(h,{...C,gain:0}),F=n(h,{...C,gain:0}),j=i(h,256,6,1),L=r(h,{...C,curve:new Float32Array([1,1]),oversample:"none"});let Y=[g,y,w],De=[S,v,x];const Pe=new Float32Array(1);j.onaudioprocess=({inputBuffer:$})=>{const _t=[c($,Pe,0),c($,Pe,1),c($,Pe,2)];_t.some((Dt,Pt)=>Dt!==Y[Pt])&&(A.setOrientation(..._t),Y=_t);const xt=[c($,Pe,3),c($,Pe,4),c($,Pe,5)];xt.some((Dt,Pt)=>Dt!==De[Pt])&&(A.setPosition(...xt),De=xt)},Object.defineProperty(R.gain,"defaultValue",{get:()=>0}),Object.defineProperty(O.gain,"defaultValue",{get:()=>0}),Object.defineProperty(P.gain,"defaultValue",{get:()=>0}),Object.defineProperty(U.gain,"defaultValue",{get:()=>0}),Object.defineProperty(F.gain,"defaultValue",{get:()=>0});const q={get bufferSize(){},get channelCount(){return A.channelCount},set channelCount($){if($>2)throw o();E.channelCount=$,A.channelCount=$},get channelCountMode(){return A.channelCountMode},set channelCountMode($){if($==="max")throw o();E.channelCountMode=$,A.channelCountMode=$},get channelInterpretation(){return A.channelInterpretation},set channelInterpretation($){E.channelInterpretation=$,A.channelInterpretation=$},get coneInnerAngle(){return A.coneInnerAngle},set coneInnerAngle($){A.coneInnerAngle=$},get coneOuterAngle(){return A.coneOuterAngle},set coneOuterAngle($){A.coneOuterAngle=$},get coneOuterGain(){return A.coneOuterGain},set coneOuterGain($){if($<0||$>1)throw e();A.coneOuterGain=$},get context(){return A.context},get distanceModel(){return A.distanceModel},set distanceModel($){A.distanceModel=$},get inputs(){return[E]},get maxDistance(){return A.maxDistance},set maxDistance($){if($<0)throw new RangeError;A.maxDistance=$},get numberOfInputs(){return A.numberOfInputs},get numberOfOutputs(){return A.numberOfOutputs},get orientationX(){return M.gain},get orientationY(){return R.gain},get orientationZ(){return O.gain},get panningModel(){return A.panningModel},set panningModel($){A.panningModel=$},get positionX(){return P.gain},get positionY(){return U.gain},get positionZ(){return F.gain},get refDistance(){return A.refDistance},set refDistance($){if($<0)throw new RangeError;A.refDistance=$},get rolloffFactor(){return A.rolloffFactor},set rolloffFactor($){if($<0)throw new RangeError;A.rolloffFactor=$},addEventListener(...$){return E.addEventListener($[0],$[1],$[2])},dispatchEvent(...$){return E.dispatchEvent($[0])},removeEventListener(...$){return E.removeEventListener($[0],$[1],$[2])}};u!==q.coneInnerAngle&&(q.coneInnerAngle=u),d!==q.coneOuterAngle&&(q.coneOuterAngle=d),p!==q.coneOuterGain&&(q.coneOuterGain=p),f!==q.distanceModel&&(q.distanceModel=f),m!==q.maxDistance&&(q.maxDistance=m),g!==q.orientationX.value&&(q.orientationX.value=g),y!==q.orientationY.value&&(q.orientationY.value=y),w!==q.orientationZ.value&&(q.orientationZ.value=w),T!==q.panningModel&&(q.panningModel=T),S!==q.positionX.value&&(q.positionX.value=S),v!==q.positionY.value&&(q.positionY.value=v),x!==q.positionZ.value&&(q.positionZ.value=x),b!==q.refDistance&&(q.refDistance=b),_!==q.rolloffFactor&&(q.rolloffFactor=_),(Y[0]!==1||Y[1]!==0||Y[2]!==0)&&A.setOrientation(...Y),(De[0]!==0||De[1]!==0||De[2]!==0)&&A.setPosition(...De);const se=()=>{E.connect(A),s(E,L,0,0),L.connect(M).connect(k,0,0),L.connect(R).connect(k,0,1),L.connect(O).connect(k,0,2),L.connect(P).connect(k,0,3),L.connect(U).connect(k,0,4),L.connect(F).connect(k,0,5),k.connect(j).connect(h.destination)},Se=()=>{E.disconnect(A),a(E,L,0,0),L.disconnect(M),M.disconnect(k),L.disconnect(R),R.disconnect(k),L.disconnect(O),O.disconnect(k),L.disconnect(P),P.disconnect(k),L.disconnect(U),U.disconnect(k),L.disconnect(F),F.disconnect(k),k.disconnect(j),j.disconnect(h.destination)};return l(Qt(q,A),se,Se)},Yl=s=>(e,{disableNormalization:t,imag:n,real:i})=>{const r=n instanceof Float32Array?n:new Float32Array(n),o=i instanceof Float32Array?i:new Float32Array(i),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(n).length<2)throw s();return a},kn=(s,e,t,n)=>s.createScriptProcessor(e,t,n),Zl=(s,e)=>(t,n)=>{const i=n.channelCountMode;if(i==="clamped-max")throw e();if(t.createStereoPanner===void 0)return s(t,n);const r=t.createStereoPanner();return ge(r,n),he(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:o=>{if(o!==i)throw e()}}),r},Kl=(s,e,t,n,i,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},h={...l,oversample:"none"},u=(f,m,g,y)=>{const w=new Float32Array(16385),T=new Float32Array(16385);for(let N=0;N<16385;N+=1){const A=N/16384*c;w[N]=Math.cos(A),T[N]=Math.sin(A)}const S=t(f,{...l,gain:0}),v=n(f,{...h,curve:w}),x=n(f,{...h,curve:a}),b=t(f,{...l,gain:0}),_=n(f,{...h,curve:T});return{connectGraph(){m.connect(S),m.connect(x.inputs===void 0?x:x.inputs[0]),m.connect(b),x.connect(g),g.connect(v.inputs===void 0?v:v.inputs[0]),g.connect(_.inputs===void 0?_:_.inputs[0]),v.connect(S.gain),_.connect(b.gain),S.connect(y,0,0),b.connect(y,0,1)},disconnectGraph(){m.disconnect(S),m.disconnect(x.inputs===void 0?x:x.inputs[0]),m.disconnect(b),x.disconnect(g),g.disconnect(v.inputs===void 0?v:v.inputs[0]),g.disconnect(_.inputs===void 0?_:_.inputs[0]),v.disconnect(S.gain),_.disconnect(b.gain),S.disconnect(y,0,0),b.disconnect(y,0,1)}}},d=(f,m,g,y)=>{const w=new Float32Array(16385),T=new Float32Array(16385),S=new Float32Array(16385),v=new Float32Array(16385),x=Math.floor(16385/2);for(let P=0;P<16385;P+=1)if(P>x){const U=(P-x)/(16384-x)*c;w[P]=Math.cos(U),T[P]=Math.sin(U),S[P]=0,v[P]=1}else{const U=P/(16384-x)*c;w[P]=1,T[P]=0,S[P]=Math.cos(U),v[P]=Math.sin(U)}const b=e(f,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),_=t(f,{...l,gain:0}),N=n(f,{...h,curve:w}),A=t(f,{...l,gain:0}),C=n(f,{...h,curve:T}),k=n(f,{...h,curve:a}),E=t(f,{...l,gain:0}),M=n(f,{...h,curve:S}),R=t(f,{...l,gain:0}),O=n(f,{...h,curve:v});return{connectGraph(){m.connect(b),m.connect(k.inputs===void 0?k:k.inputs[0]),b.connect(_,0),b.connect(A,0),b.connect(E,1),b.connect(R,1),k.connect(g),g.connect(N.inputs===void 0?N:N.inputs[0]),g.connect(C.inputs===void 0?C:C.inputs[0]),g.connect(M.inputs===void 0?M:M.inputs[0]),g.connect(O.inputs===void 0?O:O.inputs[0]),N.connect(_.gain),C.connect(A.gain),M.connect(E.gain),O.connect(R.gain),_.connect(y,0,0),E.connect(y,0,0),A.connect(y,0,1),R.connect(y,0,1)},disconnectGraph(){m.disconnect(b),m.disconnect(k.inputs===void 0?k:k.inputs[0]),b.disconnect(_,0),b.disconnect(A,0),b.disconnect(E,1),b.disconnect(R,1),k.disconnect(g),g.disconnect(N.inputs===void 0?N:N.inputs[0]),g.disconnect(C.inputs===void 0?C:C.inputs[0]),g.disconnect(M.inputs===void 0?M:M.inputs[0]),g.disconnect(O.inputs===void 0?O:O.inputs[0]),N.disconnect(_.gain),C.disconnect(A.gain),M.disconnect(E.gain),O.disconnect(R.gain),_.disconnect(y,0,0),E.disconnect(y,0,0),A.disconnect(y,0,1),R.disconnect(y,0,1)}}},p=(f,m,g,y,w)=>{if(m===1)return u(f,g,y,w);if(m===2)return d(f,g,y,w);throw i()};return(f,{channelCount:m,channelCountMode:g,pan:y,...w})=>{if(g==="max")throw i();const T=s(f,{...w,channelCount:1,channelCountMode:g,numberOfInputs:2}),S=t(f,{...w,channelCount:m,channelCountMode:g,gain:1}),v=t(f,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:y});let{connectGraph:x,disconnectGraph:b}=p(f,m,S,v,T);Object.defineProperty(v.gain,"defaultValue",{get:()=>0}),Object.defineProperty(v.gain,"maxValue",{get:()=>1}),Object.defineProperty(v.gain,"minValue",{get:()=>-1});const _={get bufferSize(){},get channelCount(){return S.channelCount},set channelCount(k){S.channelCount!==k&&(N&&b(),{connectGraph:x,disconnectGraph:b}=p(f,k,S,v,T),N&&x()),S.channelCount=k},get channelCountMode(){return S.channelCountMode},set channelCountMode(k){if(k==="clamped-max"||k==="max")throw i();S.channelCountMode=k},get channelInterpretation(){return S.channelInterpretation},set channelInterpretation(k){S.channelInterpretation=k},get context(){return S.context},get inputs(){return[S]},get numberOfInputs(){return S.numberOfInputs},get numberOfOutputs(){return S.numberOfOutputs},get pan(){return v.gain},addEventListener(...k){return S.addEventListener(k[0],k[1],k[2])},dispatchEvent(...k){return S.dispatchEvent(k[0])},removeEventListener(...k){return S.removeEventListener(k[0],k[1],k[2])}};let N=!1;const A=()=>{x(),N=!0},C=()=>{b(),N=!1};return r(Qt(_,T),A,C)}},Jl=(s,e,t,n,i,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);ge(l,c);const h=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(h!==null&&h.length<2)throw e();re(l,{curve:h},"curve"),re(l,c,"oversample");let u=null,d=!1;return o(l,"curve",m=>()=>m.call(l),m=>g=>(m.call(l,g),d&&(n(g)&&u===null?u=s(a,l):!n(g)&&u!==null&&(u(),u=null)),g)),i(l,()=>{d=!0,n(l.curve)&&(u=s(a,l))},()=>{d=!1,u!==null&&(u(),u=null)})},Ql=(s,e,t,n,i)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),h=r.createWaveShaper();ge(l,c),ge(h,c);const u=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),f=t(r,{...c,gain:-1});let m=null,g=!1,y=null;const w={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(v){u.channelCount=v,d.channelCount=v,l.channelCount=v,p.channelCount=v,h.channelCount=v,f.channelCount=v},get channelCountMode(){return l.channelCountMode},set channelCountMode(v){u.channelCountMode=v,d.channelCountMode=v,l.channelCountMode=v,p.channelCountMode=v,h.channelCountMode=v,f.channelCountMode=v},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(v){u.channelInterpretation=v,d.channelInterpretation=v,l.channelInterpretation=v,p.channelInterpretation=v,h.channelInterpretation=v,f.channelInterpretation=v},get context(){return l.context},get curve(){return y},set curve(v){if(v!==null&&v.length<2)throw e();if(v===null)l.curve=v,h.curve=v;else{const x=v.length,b=new Float32Array(x+2-x%2),_=new Float32Array(x+2-x%2);b[0]=v[0],_[0]=-v[x-1];const N=Math.ceil((x+1)/2),A=(x+1)/2-1;for(let C=1;C<N;C+=1){const k=C/N*A,E=Math.floor(k),M=Math.ceil(k);b[C]=E===M?v[E]:(1-(k-E))*v[E]+(1-(M-k))*v[M],_[C]=E===M?-v[x-1-E]:-((1-(k-E))*v[x-1-E])-(1-(M-k))*v[x-1-M]}b[N]=x%2===1?v[N-1]:(v[N-2]+v[N-1])/2,l.curve=b,h.curve=_}y=v,g&&(n(y)&&m===null?m=s(r,u):m!==null&&(m(),m=null))},get inputs(){return[u]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(v){l.oversample=v,h.oversample=v},addEventListener(...v){return u.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return u.dispatchEvent(v[0])},removeEventListener(...v){return u.removeEventListener(v[0],v[1],v[2])}};o!==null&&(w.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==w.oversample&&(w.oversample=a);const T=()=>{u.connect(l).connect(p),u.connect(d).connect(h).connect(f).connect(p),g=!0,n(y)&&(m=s(r,u))},S=()=>{u.disconnect(l),l.disconnect(p),u.disconnect(d),d.disconnect(h),h.disconnect(f),f.disconnect(p),g=!1,m!==null&&(m(),m=null)};return i(Qt(w,p),T,S)},Ne=()=>new DOMException("","NotSupportedError"),eh={numberOfChannels:1},th=(s,e,t,n,i)=>class extends s{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:h,numberOfChannels:u,sampleRate:d}={...eh,...l},p=n(u,h,d);e(fn,()=>fn(p))||p.addEventListener("statechange",(()=>{let f=0;const m=g=>{this._state==="running"&&(f>0?(p.removeEventListener("statechange",m),g.stopImmediatePropagation(),this._waitForThePromiseToSettle(g)):f+=1)};return m})()),super(p,u),this._length=h,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,Cr(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},nh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},sh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),u={...nh,...l},d=t(h,u),p=r(h),f=p?n():null,m=c.sampleRate/2;super(c,!1,d,f),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,m,-m),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=f,this._oscillatorNodeRenderer!==null&&u.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=u.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const h=this._nativeOscillatorNode.onended;this._onended=h!==null&&h===l?c:h}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){qt(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),st(this)&&bn(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},ih=(s,e,t,n,i)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(h,u)=>{let d=t(h);const p=Te(d,u);if(!p){const f={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(u,f),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(u,d),p?(await s(u,h.detune,d.detune),await s(u,h.frequency,d.frequency)):(await n(u,h.detune,d.detune),await n(u,h.frequency,d.frequency)),await i(h,u,d),d};return{set periodicWave(h){o=h},set start(h){a=h},set stop(h){c=h},render(h,u){const d=r.get(u);return d!==void 0?Promise.resolve(d):l(h,u)}}},rh={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},oh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),u={...rh,...l},d=t(h,u),p=r(h),f=p?n():null;super(c,!1,d,f),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Ce,Ie),this._orientationY=e(this,p,d.orientationY,Ce,Ie),this._orientationZ=e(this,p,d.orientationZ,Ce,Ie),this._positionX=e(this,p,d.positionX,Ce,Ie),this._positionY=e(this,p,d.positionY,Ce,Ie),this._positionZ=e(this,p,d.positionZ,Ce,Ie),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},ah=(s,e,t,n,i,r,o,a,c,l)=>()=>{const h=new WeakMap;let u=null;const d=async(p,f)=>{let m=null,g=r(p);const y={channelCount:g.channelCount,channelCountMode:g.channelCountMode,channelInterpretation:g.channelInterpretation},w={...y,coneInnerAngle:g.coneInnerAngle,coneOuterAngle:g.coneOuterAngle,coneOuterGain:g.coneOuterGain,distanceModel:g.distanceModel,maxDistance:g.maxDistance,panningModel:g.panningModel,refDistance:g.refDistance,rolloffFactor:g.rolloffFactor},T=Te(g,f);if("bufferSize"in g)m=n(f,{...y,gain:1});else if(!T){const S={...w,orientationX:g.orientationX.value,orientationY:g.orientationY.value,orientationZ:g.orientationZ.value,positionX:g.positionX.value,positionY:g.positionY.value,positionZ:g.positionZ.value};g=i(f,S)}if(h.set(f,m===null?g:m),m!==null){if(u===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const C=new o(6,p.context.length,f.sampleRate),k=e(C,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});k.connect(C.destination),u=(async()=>{const E=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(M,R)=>{const O=t(C,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:R===0?1:0});return await a(C,M,O.offset),O}));for(let M=0;M<6;M+=1)E[M].connect(k,0,M),E[M].start(0);return l(C)})()}const S=await u,v=n(f,{...y,gain:1});await c(p,f,v);const x=[];for(let C=0;C<S.numberOfChannels;C+=1)x.push(S.getChannelData(C));let b=[x[0][0],x[1][0],x[2][0]],_=[x[3][0],x[4][0],x[5][0]],N=n(f,{...y,gain:1}),A=i(f,{...w,orientationX:b[0],orientationY:b[1],orientationZ:b[2],positionX:_[0],positionY:_[1],positionZ:_[2]});v.connect(N).connect(A.inputs[0]),A.connect(m);for(let C=128;C<S.length;C+=128){const k=[x[0][C],x[1][C],x[2][C]],E=[x[3][C],x[4][C],x[5][C]];if(k.some((M,R)=>M!==b[R])||E.some((M,R)=>M!==_[R])){b=k,_=E;const M=C/f.sampleRate;N.gain.setValueAtTime(0,M),N=n(f,{...y,gain:0}),A=i(f,{...w,orientationX:b[0],orientationY:b[1],orientationZ:b[2],positionX:_[0],positionY:_[1],positionZ:_[2]}),N.gain.setValueAtTime(1,M),v.connect(N).connect(A.inputs[0]),A.connect(m)}}return m}return T?(await s(f,p.orientationX,g.orientationX),await s(f,p.orientationY,g.orientationY),await s(f,p.orientationZ,g.orientationZ),await s(f,p.positionX,g.positionX),await s(f,p.positionY,g.positionY),await s(f,p.positionZ,g.positionZ)):(await a(f,p.orientationX,g.orientationX),await a(f,p.orientationY,g.orientationY),await a(f,p.orientationZ,g.orientationZ),await a(f,p.positionX,g.positionX),await a(f,p.positionY,g.positionY),await a(f,p.positionZ,g.positionZ)),Jt(g)?await c(p,f,g.inputs[0]):await c(p,f,g),g};return{render(p,f){const m=h.get(f);return m!==void 0?Promise.resolve(m):d(p,f)}}},ch={disableNormalization:!1},lh=(s,e,t,n)=>class Rr{constructor(r,o){const a=e(r),c=n({...ch,...o}),l=s(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Rr.prototype||t.has(r)}},hh=(s,e)=>(t,n,i)=>(s(n).replay(i),e(n,t,i)),uh=(s,e,t)=>async(n,i,r)=>{const o=s(n);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,h])=>{const d=await e(l).render(l,i),p=n.context.destination;!t(l)&&(n!==p||!t(n))&&d.connect(r,h,c)})).reduce((a,c)=>[...a,...c],[]))},dh=(s,e,t)=>async(n,i,r)=>{const o=e(n);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const h=await s(a).render(a,i);t(a)||h.connect(r,c)}))},ph=(s,e,t,n)=>i=>s(fn,()=>fn(i))?Promise.resolve(s(n,n)).then(r=>{if(!r){const o=t(i,512,0,1);i.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>i.currentTime,o.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const o=e(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(i.destination),i.startRendering()}),fh=s=>(e,t)=>{s.set(e,t)},mh=s=>(e,t)=>s.set(e,t),gh=(s,e,t,n,i,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(h=>t(h).render(h,l)))).then(()=>i(l)).then(h=>(typeof h.copyFromChannel!="function"?(o(h),Hs(h)):e(r,()=>r(h))||a(h),s.add(h),h)),vh={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},yh=(s,e,t,n,i,r)=>class extends s{constructor(a,c){const l=i(a),h={...vh,...c},u=t(l,h),d=r(l),p=d?n():null;super(a,!1,u,p),this._pan=e(this,d,u.pan)}get pan(){return this._pan}},_h=(s,e,t,n,i)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const h=Te(l,c);if(!h){const u={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,u)}return r.set(c,l),h?await s(c,a.pan,l.pan):await n(c,a.pan,l.pan),Jt(l)?await i(a,c,l.inputs[0]):await i(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},xh=s=>()=>{if(s===null)return!1;try{new s({length:1,sampleRate:44100})}catch{return!1}return!0},bh=(s,e)=>async()=>{if(s===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new e(1,128,44100),i=URL.createObjectURL(t);let r=!1,o=!1;try{await n.audioWorklet.addModule(i);const a=new s(n,"a",{numberOfOutputs:0}),c=n.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!o},wh=(s,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),n=s(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{t.oncomplete=()=>{n.disconnect(),i(t.currentTime!==0)},t.startRendering()})},Th=()=>new DOMException("","UnknownError"),Sh={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},kh=(s,e,t,n,i,r,o)=>class extends s{constructor(c,l){const h=i(c),u={...Sh,...l},d=t(h,u),f=r(h)?n():null;super(c,!0,d,f),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},Ch=(s,e,t)=>()=>{const n=new WeakMap,i=async(r,o)=>{let a=e(r);if(!Te(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=s(o,l)}return n.set(o,a),Jt(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):i(r,o)}}},Ah=()=>typeof window>"u"?null:window,Nh=(s,e)=>t=>{t.copyFromChannel=(n,i,r=0)=>{const o=s(r),a=s(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=n.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)n[u]=l[u+o]},t.copyToChannel=(n,i,r=0)=>{const o=s(r),a=s(i);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),h=n.length;for(let u=o<0?-o:0;u+o<c&&u<h;u+=1)l[u+o]=n[u]}},Ih=s=>e=>{e.copyFromChannel=(t=>(n,i,r=0)=>{const o=s(r),a=s(i);if(o<e.length)return t.call(e,n,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(n,i,r=0)=>{const o=s(r),a=s(i);if(o<e.length)return t.call(e,n,a,o)})(e.copyToChannel)},Mh=s=>(e,t)=>{const n=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=n),s(e,"buffer",i=>()=>{const r=i.call(e);return r===n?null:r},i=>r=>i.call(e,r===null?n:r))},Eh=(s,e)=>(t,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw s()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw s()}});const i=t.createBufferSource();e(n,()=>{const a=n.numberOfInputs;for(let c=0;c<a;c+=1)i.connect(n,0,c)},()=>i.disconnect(n))},Fr=(s,e,t)=>s.copyFromChannel===void 0?s.getChannelData(t)[0]:(s.copyFromChannel(e,t),e[0]),Vr=s=>{if(s===null)return!1;const e=s.length;return e%2!==0?s[Math.floor(e/2)]!==0:s[e/2-1]+s[e/2]!==0},Cn=(s,e,t,n)=>{let i=s;for(;!i.hasOwnProperty(e);)i=Object.getPrototypeOf(i);const{get:r,set:o}=Object.getOwnPropertyDescriptor(i,e);Object.defineProperty(s,e,{get:t(r),set:n(o)})},Oh=s=>({...s,outputChannelCount:s.outputChannelCount!==void 0?s.outputChannelCount:s.numberOfInputs===1&&s.numberOfOutputs===1?[s.channelCount]:Array.from({length:s.numberOfOutputs},()=>1)}),Dh=s=>({...s,channelCount:s.numberOfOutputs}),Ph=s=>{const{imag:e,real:t}=s;return e===void 0?t===void 0?{...s,imag:[0,0],real:[0,0]}:{...s,imag:Array.from(t,()=>0),real:t}:t===void 0?{...s,imag:e,real:Array.from(e,()=>0)}:{...s,imag:e,real:t}},Lr=(s,e,t)=>{try{s.setValueAtTime(e,t)}catch(n){if(n.code!==9)throw n;Lr(s,e,t+1e-7)}},$h=s=>{const e=s.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},Rh=s=>{const e=s.createBufferSource(),t=s.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Fh=s=>{const e=s.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},Js=s=>{const e=s.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},jr=s=>{const e=s.createBuffer(1,1,44100),t=s.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},Qs=s=>{const e=s.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},Vh=s=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(s)}finally{e.close(),t.close()}},Lh=s=>{s.start=(e=>(t=0,n=0,i)=>{const r=s.buffer,o=r===null?n:Math.min(r.duration,n);r!==null&&o>r.duration-.5/s.context.sampleRate?e.call(s,t,0,0):e.call(s,t,o,i)})(s.start)},Br=(s,e)=>{const t=e.createGain();s.connect(t);const n=(i=>()=>{i.call(s,t),s.removeEventListener("ended",n)})(s.disconnect);s.addEventListener("ended",n),Qt(s,t),s.stop=(i=>{let r=!1;return(o=0)=>{if(r)try{i.call(s,o)}catch{t.gain.setValueAtTime(0,o)}else i.call(s,o),r=!0}})(s.stop)},en=(s,e)=>t=>{const n={value:s};return Object.defineProperties(t,{currentTarget:n,target:n}),typeof e=="function"?e.call(s,t):e.handleEvent.call(s,t)},jh=oa(Mt),Bh=da(Mt),Wh=Sc(rs),Wr=new WeakMap,zh=Wc(Wr),He=ec(new Map,new WeakMap),Ze=Ah(),zr=yl(He,Ke),ei=Bc(Ae),xe=uh(Ae,ei,Ct),Uh=va(zr,ne,xe),ee=qc(is),rt=ql(Ze),J=cl(rt),Ur=new WeakMap,qr=Pc(en),An=wl(Ze),ti=il(An),ni=rl(Ze),Gr=ol(Ze),mn=Sl(Ze),ue=Wa(aa(_r),ua(jh,Bh,Xn,Wh,Yn,Ae,zh,xn,ne,Mt,st,Ct,jn),He,Qc(Ms,Yn,Ae,ne,pn,st),Ke,os,Ne,xc(Xn,Ms,Ae,ne,pn,ee,st,J),Ac(Ur,Ae,Ge),qr,ee,ti,ni,Gr,J,mn),qh=ga(ue,Uh,Ke,zr,ee,J),si=new WeakSet,tr=_l(Ze),Hr=pc(new Uint32Array(1)),ii=Nh(Hr,Ke),ri=Ih(Hr),Xr=_a(si,He,Ne,tr,rt,xh(tr),ii,ri),as=pa(Ee),Yr=dh(ei,wn,Ct),Je=ac(Yr),tn=bl(as,He,$h,Rh,Fh,Js,jr,Qs,Lh,Mh(Cn),Br),Qe=hh(zc(wn),Yr),Gh=wa(Je,tn,ne,Qe,xe),Xe=za(ca(xr),Ur,Gs,Ua,ea,ta,na,sa,ia,As,gr,An,Lr),Hh=ba(ue,Gh,Xe,ye,tn,ee,J,en),Xh=Ea(ue,Oa,Ke,ye,Tl(Ee,Cn),ee,J,xe),Yh=Qa(Je,Pr,ne,Qe,xe),Et=mh(Wr),Zh=Ja(ue,Xe,Yh,os,Pr,ee,J,Et),gt=gl(Mt,ni),Kh=Eh(ye,gt),vt=El(An,Kh),Jh=sc(vt,ne,xe),Qh=nc(ue,Jh,vt,ee,J),eu=oc(Sn,ne,xe),tu=rc(ue,eu,Sn,ee,J,Dh),nu=Pl(as,tn,Ee,gt),nn=Dl(as,He,nu,Js,Qs),su=dc(Je,nn,ne,Qe,xe),iu=uc(ue,Xe,su,nn,ee,J,en),Zr=$l(Ne,Cn),ru=gc(Zr,ne,xe),ou=mc(ue,ru,Zr,ee,J,Et),au=Tc(Je,$r,ne,Qe,xe),cu=wc(ue,Xe,au,$r,ee,J,Et),Kr=Rl(Ne),lu=Ec(Je,Kr,ne,Qe,xe),hu=Mc(ue,Xe,lu,Kr,Ne,ee,J,Et),uu=Lc(Je,Ee,ne,Qe,xe),du=Vc(ue,Xe,uu,Ee,ee,J),pu=jl(os,ye,kn,Ne),cs=ph(He,Ee,kn,wh(Ee,rt)),fu=Jc(tn,ne,rt,xe,cs),mu=Fl(pu),gu=Zc(ue,mu,fu,ee,J,Et),vu=Da(Xe,vt,nn,kn,Ne,Fr,J,Cn),Jr=new WeakMap,yu=ml(Xh,vu,qr,J,Jr,en),Qr=Gl(as,He,Js,jr,Qs,Br),_u=ih(Je,Qr,ne,Qe,xe),xu=sh(ue,Xe,Qr,_u,ee,J,en),eo=lc(tn),bu=Ql(eo,ye,Ee,Vr,gt),ls=Jl(eo,ye,bu,Vr,gt,An,Cn),wu=Xl(Xn,ye,vt,Ee,kn,ls,Ne,Yn,Fr,gt),to=Hl(wu),Tu=ah(Je,vt,nn,Ee,to,ne,rt,Qe,xe,cs),Su=oh(ue,Xe,to,Tu,ee,J,Et),ku=Yl(Ke),Cu=lh(ku,ee,new WeakSet,Ph),Au=Kl(vt,Sn,Ee,ls,Ne,gt),no=Zl(Au,Ne),Nu=_h(Je,no,ne,Qe,xe),Iu=yh(ue,Xe,no,Nu,ee,J),Mu=Ch(ls,ne,xe),Eu=kh(ue,ye,ls,Mu,ee,J,Et),so=ll(Ze),oi=$c(Ze),io=new WeakMap,Ou=Gc(io,rt),Du=so?ha(He,Ne,Dc(Ze),oi,Rc(ra),ee,Ou,J,mn,new WeakMap,new WeakMap,bh(mn,rt),Ze):void 0,Pu=al(ti,J),$u=_c(si,He,yc,Oc,new WeakSet,ee,Pu,Gn,fn,ii,ri),ro=Za(Du,qh,Xr,Hh,Zh,Qh,tu,iu,ou,$u,cu,hu,du,gu,yu,xu,Su,Cu,Iu,Eu),Ru=hl(ue,Bl,ee,J),Fu=dl(ue,Wl,ee,J),Vu=pl(ue,zl,ee,J),Lu=Ul(ye,J),ju=fl(ue,Lu,ee),Bu=Ma(ro,ye,Ne,Th,Ru,Fu,Vu,ju,An),ai=Hc(Jr),Wu=fa(ai),oo=cc(Ke),zu=kc(ai),ao=Nc(Ke),co=new WeakMap,Uu=jc(co,Ge),qu=Ml(oo,Ke,ye,vt,Sn,nn,Ee,kn,Ne,ao,oi,Uu,gt),Gu=Cl(ye,qu,Ee,Ne,gt),Hu=Ya(Je,oo,tn,vt,Sn,nn,Ee,zu,ao,oi,ne,mn,rt,Qe,xe,cs),Xu=Uc(io),Yu=fh(co),nr=so?Ga(Wu,ue,Xe,Hu,Gu,Ae,Xu,ee,J,mn,Oh,Yu,Vh,en):void 0,Zu=vc(Ne,rt),Ku=gh(si,He,ei,ai,cs,Gn,ii,ri),Ju=th(ro,He,ye,Zu,Ku),Qu=el(is,ti),ed=tl(qs,ni),td=nl(Gs,Gr),nd=sl(is,J);function je(s){return s===void 0}function G(s){return s!==void 0}function sd(s){return typeof s=="function"}function At(s){return typeof s=="number"}function St(s){return Object.prototype.toString.call(s)==="[object Object]"&&s.constructor===Object}function id(s){return typeof s=="boolean"}function qe(s){return Array.isArray(s)}function it(s){return typeof s=="string"}function Fn(s){return it(s)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(s)}function W(s,e){if(!s)throw new Error(e)}function ft(s,e,t=1/0){if(!(e<=s&&s<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${s}`)}function lo(s){!s.isOffline&&s.state!=="running"&&ci('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let ho=!1,sr=!1;function ir(s){ho=s}function rd(s){je(s)&&ho&&!sr&&(sr=!0,ci("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let uo=console;function od(...s){uo.log(...s)}function ci(...s){uo.warn(...s)}function ad(s){return new Bu(s)}function cd(s,e,t){return new Ju(s,e,t)}const $e=typeof self=="object"?self:null,ld=$e&&($e.hasOwnProperty("AudioContext")||$e.hasOwnProperty("webkitAudioContext"));function hd(s,e,t){return W(G(nr),"AudioWorkletNode only works in a secure context (https or localhost)"),new(s instanceof $e?.BaseAudioContext?$e?.AudioWorkletNode:nr)(s,e,t)}function Ye(s,e,t,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(r=(i<3?o(r):i>3?o(e,t,r):o(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r}function fe(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(u){o(u)}}function c(h){try{l(n.throw(h))}catch(u){o(u)}}function l(h){h.done?r(h.value):i(h.value).then(a,c)}l((n=n.apply(s,e||[])).next())})}class ud{constructor(e,t,n,i){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(i||44100),.001),this.updateInterval=n,this._createClock()}_createWorker(){const e=new Blob([`
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
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),n=new Worker(t);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function Nt(s){return td(s)}function pt(s){return ed(s)}function Bn(s){return nd(s)}function Rt(s){return Qu(s)}function dd(s){return s instanceof Xr}function pd(s,e){return s==="value"||Nt(e)||pt(e)||dd(e)}function jt(s,...e){if(!e.length)return s;const t=e.shift();if(St(s)&&St(t))for(const n in t)pd(n,t[n])?s[n]=t[n]:St(t[n])?(s[n]||Object.assign(s,{[n]:{}}),jt(s[n],t[n])):Object.assign(s,{[n]:t[n]});return jt(s,...e)}function fd(s,e){return s.length===e.length&&s.every((t,n)=>e[n]===t)}function B(s,e,t=[],n){const i={},r=Array.from(e);if(St(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(a=>Reflect.has(s,a))||(jt(i,{[n]:r[0]}),t.splice(t.indexOf(n),1),r.shift())),r.length===1&&St(r[0]))jt(i,r[0]);else for(let o=0;o<t.length;o++)G(r[o])&&(i[t[o]]=r[o]);return jt(s,i)}function md(s){return s.constructor.getDefaults()}function Bt(s,e){return je(s)?e:s}function rr(s,e){return e.forEach(t=>{Reflect.has(s,t)&&delete s[t]}),s}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class ot{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||$e&&this.toString()===$e.TONE_DEBUG_CLASS)&&od(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}ot.version=mr;const li=1e-6;function Gt(s,e){return s>e+li}function $s(s,e){return Gt(s,e)||ze(s,e)}function Qn(s,e){return s+li<e}function ze(s,e){return Math.abs(s-e)<li}function gd(s,e,t){return Math.max(Math.min(s,t),e)}class Be extends ot{constructor(){super(),this.name="Timeline",this._timeline=[];const e=B(Be.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(W(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];W($s(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const n=this._search(e,t);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const n=this._search(e,t);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const n=this._search(e);return n-1>=0?this._timeline[n-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(ze(this._timeline[t].time,e)){for(let n=t;n>=0&&ze(this._timeline[n].time,e);n--)t=n;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&$s(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let n=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][t]<=e)return i-1;for(;n<r;){let o=Math.floor(n+(r-n)/2);const a=this._timeline[o],c=this._timeline[o+1];if(ze(a[t],e)){for(let l=o;l<this._timeline.length;l++){const h=this._timeline[l];if(ze(h[t],e))o=l;else break}return o}else{if(Qn(a[t],e)&&Gt(c[t],e))return o;Gt(a[t],e)?r=o:n=o+1}}return-1}_iterate(e,t=0,n=this._timeline.length-1){this._timeline.slice(t,n+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const n=this._search(e);return n!==-1&&this._iterate(t,0,n),this}forEachAfter(e,t){const n=this._search(e);return this._iterate(t,n+1),this}forEachBetween(e,t,n){let i=this._search(e),r=this._search(t);return i!==-1&&r!==-1?(this._timeline[i].time!==e&&(i+=1),this._timeline[r].time===t&&(r-=1),this._iterate(n,i,r)):i===-1&&this._iterate(n,0,r),this}forEachFrom(e,t){let n=this._search(e);for(;n>=0&&this._timeline[n].time>=e;)n--;return this._iterate(t,n+1),this}forEachAtTime(e,t){const n=this._search(e);if(n!==-1&&ze(this._timeline[n].time,e)){let i=n;for(let r=n;r>=0&&ze(this._timeline[r].time,e);r--)i=r;this._iterate(r=>{t(r)},i,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const po=[];function hs(s){po.push(s)}function vd(s){po.forEach(e=>e(s))}const fo=[];function us(s){fo.push(s)}function yd(s){fo.forEach(e=>e(s))}class Nn extends ot{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(i=>{je(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(t)}),this}once(e,t){const n=(...i)=>{t(...i),this.off(e,n)};return this.on(e,n),this}off(e,t){return e.split(/\W+/).forEach(i=>{if(je(this._events)&&(this._events={}),this._events.hasOwnProperty(i))if(je(t))this._events[i]=[];else{const r=this._events[i];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const n=this._events[e].slice(0);for(let i=0,r=n.length;i<r;i++)n[i].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const n=Object.getOwnPropertyDescriptor(Nn.prototype,t);Object.defineProperty(e.prototype,t,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class mo extends Nn{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class In extends mo{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new Be,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const n=B(In.getDefaults(),arguments,["context"]);n.context?(this._context=n.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=ad({latencyHint:n.latencyHint}),this._latencyHint=n.latencyHint),this._ticker=new ud(this.emit.bind(this,"tick"),n.clockSource,n.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=n.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(vd(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,n){return this._context.createBuffer(e,t,n)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,n){return this._context.createPeriodicWave(e,t,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return W(Rt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return W(Rt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return W(Rt(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){W(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){W(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){W(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){W(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return hd(this.rawContext,e,t)}addAudioWorkletModule(e){return fe(this,void 0,void 0,function*(){W(G(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return fe(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return Rt(this._context)?this._context.resume():Promise.resolve()}close(){return fe(this,void 0,void 0,function*(){Rt(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&yd(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),n=t.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=e;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=t,i.loop=!0,i.start(0),this._constants.set(e,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:n+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const n=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),i()},id:n,time:r+t})};return i(),n}}class _d extends mo{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,n){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return fe(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function ce(s,e){qe(e)?e.forEach(t=>ce(s,t)):Object.defineProperty(s,e,{enumerable:!0,writable:!1})}function go(s,e){qe(e)?e.forEach(t=>go(s,t)):Object.defineProperty(s,e,{writable:!0})}const K=()=>{};class ie extends ot{constructor(){super(),this.name="ToneAudioBuffer",this.onload=K;const e=B(ie.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,it(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:K,onload:K,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:Ve().sampleRate}set(e){return e instanceof ie?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return fe(this,void 0,void 0,function*(){const t=ie.load(e).then(n=>{this.set(n),this.onload(this)});ie.downloads.push(t);try{yield t}finally{const n=ie.downloads.indexOf(t);ie.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=qe(e)&&e[0].length>0,n=t?e.length:1,i=t?e[0].length:e.length,r=Ve(),o=r.createBuffer(n,i,r.sampleRate),a=!t&&n===1?[e]:e;for(let c=0;c<n;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(At(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const n=this.numberOfChannels;for(let i=0;i<n;i++){const r=this.toArray(i);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(i=>i/n),this.fromArray(t)}return this}toArray(e){if(At(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let n=0;n<this.numberOfChannels;n++)t[n]=this.getChannelData(n);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){W(this.loaded,"Buffer is not loaded");const n=Math.floor(e*this.sampleRate),i=Math.floor(t*this.sampleRate);W(n<i,"The start time must be less than the end time");const r=i-n,o=Ve().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(n,i),a);return new ie(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ie().fromArray(e)}static fromUrl(e){return fe(this,void 0,void 0,function*(){return yield new ie().load(e)})}static load(e){return fe(this,void 0,void 0,function*(){const t=ie.baseUrl===""||ie.baseUrl.endsWith("/")?ie.baseUrl:ie.baseUrl+"/",n=yield fetch(t+e);if(!n.ok)throw new Error(`could not load url: ${e}`);const i=yield n.arrayBuffer();return yield Ve().decodeAudioData(i)})}static supportsType(e){const t=e.split("."),n=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return fe(this,void 0,void 0,function*(){for(yield Promise.resolve();ie.downloads.length;)yield ie.downloads[0]})}}ie.baseUrl="";ie.downloads=[];class hi extends In{constructor(){super({clockSource:"offline",context:Bn(arguments[0])?arguments[0]:cd(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Bn(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Bn(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return fe(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const n=Math.floor(this.sampleRate/128);e&&t%n===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(){return fe(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ie(t)})}close(){return Promise.resolve()}}const vo=new _d;let Tt=vo;function Ve(){return Tt===vo&&ld&&xd(new In),Tt}function xd(s,e=!1){e&&Tt.dispose(),Rt(s)?Tt=new In(s):Bn(s)?Tt=new hi(s):Tt=s}function bd(){return Tt.resume()}if($e&&!$e.TONE_SILENCE_LOGGING){const e=` * Tone.js v${mr} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function wd(s){return Math.pow(10,s/20)}function Td(s){return 20*(Math.log(s)/Math.LN10)}function yo(s){return Math.pow(2,s/12)}let ds=440;function Sd(){return ds}function kd(s){ds=s}function Rs(s){return Math.round(_o(s))}function _o(s){return 69+12*Math.log2(s/ds)}function Cd(s){return ds*Math.pow(2,(s-69)/12)}class ui extends ot{constructor(e,t,n){super(),this.defaultUnits="s",this._val=t,this._units=n,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const n=parseInt(e,10),i=t==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/n)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,n)=>{let i=0;return e&&e!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i+=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(i+=this._beatsToUnits(parseFloat(n)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof ui&&this.fromType(this._val),je(this._val))return this._noArg();if(it(this._val)&&je(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(St(this._val)){let e=0;for(const t in this._val)if(G(this._val[t])){const n=this._val[t],i=new this.constructor(this.context,t).valueOf()*n;e+=i}return e}if(G(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return it(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class Ue extends ui{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new Ue(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const n=new this.constructor(this.context,e).valueOf(),i=this.valueOf(),a=Math.round(i/n)*n-i;return i+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let n=t[0],i=new Ue(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new Ue(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(i-e)&&(n=r,i=o)}),n}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const n=Math.floor(t/this._getTimeSignature());let i=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[n,t,i].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Rs(this.toFrequency())}_now(){return this.context.now()}}class Le extends Ue{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Sd()}static set A4(e){kd(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:Le.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const i=Ad[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?i:Le.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,n){let i=1;return e&&e!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(i*=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(i*=this._beatsToUnits(parseFloat(n)/4)),i}}})}transpose(e){return new Le(this.context,this.valueOf()*yo(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Rs(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/Le.A4);let n=Math.round(12*t)+57;const i=Math.floor(n/12);return i<0&&(n+=-12*i),Nd[n%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return Cd(e)}static ftom(e){return Rs(e)}}const Ad={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},Nd=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class ln extends Ue{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Me extends ot{constructor(){super();const e=B(Me.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:Ve()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return rd(e),new Ue(this.context,e).toSeconds()}toFrequency(e){return new Le(this.context,e).toFrequency()}toTicks(e){return new ln(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(n=>{je(e[n])&&delete t[n]}),t}get(){const e=md(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const n=this[t];G(n)&&G(n.value)&&G(n.setValueAtTime)?e[t]=n.value:n instanceof Me?e[t]=n._getPartialProperties(e[t]):qe(n)||At(n)||it(n)||id(n)?e[t]=n:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&G(this[t])&&(this[t]&&G(this[t].value)&&G(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Me?this[t].set(e[t]):this[t]=e[t])}),this}}class di extends Be{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,n){return ft(t,0),this.add(Object.assign({},n,{state:e,time:t})),this}getLastState(e,t){const n=this._search(t);for(let i=n;i>=0;i--){const r=this._timeline[i];if(r.state===e)return r}}getNextState(e,t){const n=this._search(t);if(n!==-1)for(let i=n;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===e)return r}}}class Z extends Me{constructor(){const e=B(Z.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,W(G(e.param)&&(Nt(e.param)||e.param instanceof Z),"param must be an AudioParam");!Nt(e.param);)e.param=e.param._param;this._swappable=G(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new Be(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,G(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Me.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return G(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return G(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return G(this.maxValue)&&G(this.minValue)&&ft(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?wd(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?Td(e):e}setValueAtTime(e,t){const n=this.toSeconds(t),i=this._fromType(e);return W(isFinite(i)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",e,n),this._events.add({time:n,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,n),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),n=this._events.getAfter(t),i=this._events.get(t);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const o=this._events.getBefore(i.time);let a;o===null?a=this._initialValue:a=o.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,a,i.value,i.constant,t))}else if(n===null)r=i.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let o=i.value;if(i.type==="setTargetAtTime"){const a=this._events.getBefore(i.time);a===null?o=this._initialValue:o=a.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,o,n.time,n.value,t):r=this._exponentialInterpolate(i.time,o,n.time,n.value,t)}else r=i.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const n=this._fromType(e),i=this.toSeconds(t);return W(isFinite(n)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(n),this._events.add({time:i,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",e,i),this._param.linearRampToValueAtTime(n,i),this}exponentialRampToValueAtTime(e,t){let n=this._fromType(e);n=ze(n,0)?this._minOutput:n,this._assertRange(n);const i=this.toSeconds(t);return W(isFinite(n)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",e,i),this._param.exponentialRampToValueAtTime(n,i),this}exponentialRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(e,n+this.toSeconds(t)),this}linearRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(e,n+this.toSeconds(t)),this}targetRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(e,n,t),this}exponentialApproachValueAtTime(e,t,n){t=this.toSeconds(t),n=this.toSeconds(n);const i=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(e,t,i),this.cancelAndHoldAtTime(t+n*.9),this.linearRampToValueAtTime(e,t+n),this}setTargetAtTime(e,t,n){const i=this._fromType(e);W(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(i),W(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",e,r,n),this._param.setTargetAtTime(i,r,n),this}setValueCurveAtTime(e,t,n,i=1){n=this.toSeconds(n),t=this.toSeconds(t);const r=this._fromType(e[0])*i;this.setValueAtTime(this._toType(r),t);const o=n/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*i;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return W(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),n=this._fromType(this.getValueAtTime(t));W(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+n);const i=this._events.get(t),r=this._events.getAfter(t);return i&&ze(i.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),t)),this._events.add({time:t,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,t),this}rampTo(e,t=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,n):this.linearRampTo(e,t,n),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const n=this._events.get(t);if(n&&n.type==="setTargetAtTime"){const i=this._events.getAfter(n.time),r=i?i.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?e.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?e.setTargetAtTime(i.value,i.time,i.constant):e[i.type](i.value,i.time)}),this}setParam(e){W(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,n,i,r){return n+(t-n)*Math.exp(-(r-e)/i)}_linearInterpolate(e,t,n,i,r){return t+(i-t)*((r-e)/(n-e))}_exponentialInterpolate(e,t,n,i,r){return t*Math.pow(i/t,(r-e)/(n-e))}}class z extends Me{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return G(this.input)?Nt(this.input)||this.input instanceof Z?1:this.input.numberOfInputs:0}get numberOfOutputs(){return G(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return G(e)&&(e instanceof z||pt(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(n=>{n.channelCount=e.channelCount,n.channelCountMode=e.channelCountMode,n.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();W(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,n=0){return sn(this,e,t,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return ci("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,n=0){return Id(this,e,t,n),this}chain(...e){return Fs(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),G(this.input)&&(this.input instanceof z?this.input.dispose():pt(this.input)&&this.input.disconnect()),G(this.output)&&(this.output instanceof z?this.output.dispose():pt(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Fs(...s){const e=s.shift();s.reduce((t,n)=>(t instanceof z?t.connect(n):pt(t)&&sn(t,n),n),e)}function sn(s,e,t=0,n=0){for(W(G(s),"Cannot connect from undefined node"),W(G(e),"Cannot connect to undefined node"),(e instanceof z||pt(e))&&W(e.numberOfInputs>0,"Cannot connect to node with no inputs"),W(s.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof z||e instanceof Z;)G(e.input)&&(e=e.input);for(;s instanceof z;)G(s.output)&&(s=s.output);Nt(e)?s.connect(e,t):s.connect(e,t,n)}function Id(s,e,t=0,n=0){if(G(e))for(;e instanceof z;)e=e.input;for(;!pt(s);)G(s.output)&&(s=s.output);Nt(e)?s.disconnect(e,t):pt(e)?s.disconnect(e,t,n):s.disconnect()}class be extends z{constructor(){const e=B(be.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new Z({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),ce(this,"gain")}static getDefaults(){return Object.assign(z.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class Ht extends z{constructor(e){super(e),this.onended=K,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new be({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const n=this.toSeconds(t);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(z.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:K})}_startGain(e,t=1){W(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=e+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+n):this._gainNode.gain.exponentialApproachValueAtTime(t,e,n)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){W(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==K&&(this.onended(this),this.onended=K,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),W(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=K,this}}class pi extends Ht{constructor(){const e=B(pi.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),sn(this._source,this._gainNode),this.offset=new Z({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(Ht.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class _e extends z{constructor(){const e=B(_e.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new pi({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(z.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,n=0){return fi(this,e,t,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,n){return this._param.exponentialRampTo(e,t,n),this}linearRampTo(e,t,n){return this._param.linearRampTo(e,t,n),this}targetRampTo(e,t,n){return this._param.targetRampTo(e,t,n),this}exponentialApproachValueAtTime(e,t,n){return this._param.exponentialApproachValueAtTime(e,t,n),this}setTargetAtTime(e,t,n){return this._param.setTargetAtTime(e,t,n),this}setValueCurveAtTime(e,t,n,i){return this._param.setValueCurveAtTime(e,t,n,i),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,n){return this._param.rampTo(e,t,n),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function fi(s,e,t,n){(e instanceof Z||Nt(e)||e instanceof _e&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof _e&&(e.overridden=!0)),sn(s,e,t,n)}class mi extends Z{constructor(){const e=B(mi.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new Be(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Z.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,n){t=this.toSeconds(t),this.setRampPoint(t);const i=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/n,1));for(let a=0;a<=o;a++){const c=n*a+t,l=this._exponentialApproach(r.time,r.value,i,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const n=this.toSeconds(t);super.setValueAtTime(e,t);const i=this._events.get(n),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const n=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const i=this._events.get(n),r=this._events.previousEvent(i),o=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const n=this._fromType(e),i=this._events.get(t),r=Math.round(Math.max((t-i.time)*10,1)),o=(t-i.time)/r;for(let a=0;a<=r;a++){const c=o*a+i.time,l=this._exponentialInterpolate(i.time,i.value,t,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(je(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const n=this._fromType(this.getValueAtTime(e.time));let i=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(n+i)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),n=this._events.get(t);return Math.max(this._getTicksUntilEvent(n,t),0)}getDurationOfTicks(e,t){const n=this.toSeconds(t),i=this.getTicksAtTime(t);return this.getTimeOfTick(i+e)-n}getTimeOfTick(e){const t=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&n&&n.type==="linearRampToValueAtTime"&&t.value!==n.value){const i=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(n.time))-i)/(n.time-t.time),a=Math.sqrt(Math.pow(i,2)-2*o*(t.ticks-e)),c=(-i+a)/o,l=(-i-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const n=this.toSeconds(t),i=this.toSeconds(e),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+i)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class gi extends _e{constructor(){const e=B(gi.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new mi({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(_e.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class vi extends Me{constructor(){const e=B(vi.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new di,this._tickOffset=new Be,this._ticksAtTime=new Be,this._secondsAtTime=new Be,this.frequency=new gi({context:this.context,units:e.units,value:e.frequency}),ce(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Me.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const n=this.toSeconds(e);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),G(t)&&this.setTicksAtTime(t,n),this._ticksAtTime.cancel(n),this._secondsAtTime.cancel(n)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const n=this._state.get(t);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),n=this._state.getLastState("stopped",t),i=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=i||n,a=i?i.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let h=o.time;const u=this._tickOffset.get(l.time);u&&u.time>=o.time&&(a=u.ticks,h=u.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(h),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),n=this.frequency.timeToTicks(e,t);this.setTicksAtTime(n,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),n={state:"paused",time:e};this._state.add(n);const i=this._secondsAtTime.get(e);let r=i||t,o=i?i.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const h=this._tickOffset.get(c.time);h&&h.time>=r.time&&(o=h.seconds,l=h.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==n.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(n),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const n=this._tickOffset.get(t),i=this._state.get(t),r=Math.max(n.time,i.time),o=this.frequency.getTicksAtTime(r)+e-n.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,n){let i=this._state.get(e);this._state.forEachBetween(e,t,o=>{i&&i.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(i.time,e),o.time-this.sampleTime,n),i=o});let r=null;if(i&&i.state==="started"){const o=Math.max(i.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(i.time),l=a-c;let h=Math.ceil(l)-l;h=ze(h,1)?0:h;let u=this.frequency.getTimeOfTick(a+h);for(;u<t;){try{n(u,Math.round(this.getTicksAtTime(u)))}catch(d){r=d;break}u+=this.frequency.getDurationOfTicks(1,u)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class ps extends Me{constructor(){const e=B(ps.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=K,this._lastUpdate=0,this._state=new di("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new vi({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,ce(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Me.getDefaults(),{callback:K,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){lo(this.context);const n=this.toSeconds(e);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,t),n<this._lastUpdate&&this.emit("start",n,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const n=this.toSeconds(t),i=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(i+e,n)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,n=>{switch(n.state){case"started":const i=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,i);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(e,t,(n,i)=>{this.callback(n,i)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}Nn.mixin(ps);class rn extends z{constructor(){const e=B(rn.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new be({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,ce(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(z.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class yi extends z{constructor(){const e=B(yi.getDefaults(),arguments);super(e),this.name="Destination",this.input=new rn({context:this.context}),this.output=new be({context:this.context}),this.volume=this.input.volume,Fs(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(z.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Fs(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}hs(s=>{s.destination=new yi({context:s})});us(s=>{s.destination.dispose()});class Md extends z{constructor(){super(...arguments),this.name="Listener",this.positionX=new Z({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new Z({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new Z({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new Z({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new Z({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new Z({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new Z({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new Z({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new Z({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(z.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}hs(s=>{s.listener=new Md({context:s})});us(s=>{s.listener.dispose()});class _i extends ot{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=B(_i.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const n=e.urls[t];this.add(t,n,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:K,onload:K,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return W(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,n=K,i=K){return it(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ie(this.baseUrl+t,n,i))):this._buffers.set(e.toString(),new ie(t,n,i)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class Vt extends ln{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class Ed extends Me{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new Be,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}hs(s=>{s.draw=new Ed({context:s})});us(s=>{s.draw.dispose()});class Od extends ot{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){W(G(e.time),"Events must have a time property"),W(G(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Dd(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const n of t)if(n.event===e){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let n,i=null;if(t>0)if(e.left.right===null)n=e.left,n.right=e.right,i=n;else{for(n=e.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,i=n.parent,n.left=e.left,n.right=e.right)}else if(e.right.left===null)n=e.right,n.left=e.left,i=n;else{for(n=e.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,i=n.parent,n.left=e.left,n.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=n:e.parent.right=n:this._setRoot(n),i&&this._rebalance(i)}e.dispose()}_rotateLeft(e){const t=e.parent,n=e.isLeftChild(),i=e.right;i&&(e.right=i.left,i.left=e),t!==null?n?t.left=i:t.right=i:this._setRoot(i)}_rotateRight(e){const t=e.parent,n=e.isLeftChild(),i=e.left;i&&(e.left=i.right,i.right=e),t!==null?n?t.left=i:t.right=i:this._setRoot(i)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let n=t[0];for(let i=1;i<t.length;i++)t[i].low>n.low&&(n=t[i]);return n.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(n=>t.push(n)),t.forEach(n=>{n.event&&e(n.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const n=[];this._root.search(e,n),n.forEach(i=>{i.event&&t(i.event)})}return this}forEachFrom(e,t){if(this._root!==null){const n=[];this._root.searchAfter(e,n),n.forEach(i=>{i.event&&t(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Dd{constructor(e,t,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Pd extends ot{constructor(e){super(),this.name="TimelineValue",this._timeline=new Be({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class Xt extends z{constructor(){super(B(Xt.getDefaults(),arguments,["context"]))}connect(e,t=0,n=0){return fi(this,e,t,n),this}}class Mn extends Xt{constructor(){const e=B(Mn.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,qe(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):sd(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(_e.getDefaults(),{length:1024})}setMap(e,t=1024){const n=new Float32Array(t);for(let i=0,r=t;i<r;i++){const o=i/(r-1)*2-1;n[i]=e(o,i)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(n=>n.includes(e));W(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class xi extends Xt{constructor(){const e=B(xi.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new Mn({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(Xt.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class mt{constructor(e,t){this.id=mt._eventId++,this._remainderTime=0;const n=Object.assign(mt.getDefaults(),t);this.transport=e,this.callback=n.callback,this._once=n.once,this.time=Math.floor(n.time),this._remainderTime=n.time-this.time}static getDefaults(){return{callback:K,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}mt._eventId=0;class bi extends mt{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(bi.getDefaults(),t);this.duration=n.duration,this._interval=n.interval,this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},mt.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return Qn(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new Vt(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){Qn(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new Vt(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);Gt(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class fs extends Me{constructor(){const e=B(fs.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new Pd(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new Be,this._repeatedEvents=new Od,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new ps({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),ce(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Me.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const n=t%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(n*Math.PI)*this._swingAmount;e+=new Vt(this.context,this._swingTicks*2/3).toSeconds()*i}ir(!0),this._timeline.forEachAtTime(t,n=>n.invoke(e)),ir(!1)}schedule(e,t){const n=new mt(this,{callback:e,time:new ln(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(e,t,n,i=1/0){const r=new bi(this,{callback:e,duration:new Ue(this.context,i).toTicks(),interval:new Ue(this.context,t).toTicks(),time:new ln(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const n=new mt(this,{callback:e,once:!0,time:new ln(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(t,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new Vt(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let n;return G(t)&&(n=this.toTicks(t)),this._clock.start(e,n),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){qe(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new Ue(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new Ue(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new Vt(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new Vt(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),n=this._clock.frequency.timeToTicks(e,t);this.ticks=n}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(t),i=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,t),r=t+i;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),n=this.getTicksAtTime(t),i=e-n%e;return this._clock.nextTickTime(i,t)}}syncSignal(e,t){const n=this.now();let i=this.bpm,r=1/(60/i.getValueAtTime(n)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new be(c),h=new xi(-1),u=new be(c);i.chain(l,h,u),i=u,r=1/r,o=[l,h,u]}t||(e.getValueAtTime(n)!==0?t=e.getValueAtTime(n)/r:t=0);const a=new be(t);return i.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const n=this._syncedSignals[t];n.signal===e&&(n.nodes.forEach(i=>i.dispose()),n.signal.value=n.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),go(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}Nn.mixin(fs);hs(s=>{s.transport=new fs({context:s})});us(s=>{s.transport.dispose()});class Re extends z{constructor(e){super(e),this.input=void 0,this._state=new di("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=K,this._syncedStop=K,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new rn({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,ce(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(z.getDefaults(),{mute:!1,onstop:K,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,n){let i=je(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")W(Gt(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,t,n);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(Bt(t,0)),r.duration=n?this.toSeconds(n):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,n)},i);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else lo(this.context),this._start(i,t,n);return this}stop(e){let t=je(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||G(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const n=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(n)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,n){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(Gt(t,0)){const n=this._state.get(t);if(n&&n.state==="started"&&n.time!==t){const i=t-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-i),this._start(e,this.toSeconds(n.offset)+i,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=K,this.unsync(),this._volume.dispose(),this._state.dispose(),this}}class ms extends Ht{constructor(){const e=B(ms.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,sn(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new Z({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ie(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(Ht.getDefaults(),{url:new ie,loop:!1,loopEnd:0,loopStart:0,onload:K,onerror:K,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,n,i=1){W(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,i),this.loop?t=Bt(t,this.loopStart):t=Bt(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;$s(o,a)&&(o=(o-c)%l+c),ze(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,Qn(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),G(n)){let a=this.toSeconds(n);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}function Ot(s,e){return fe(this,void 0,void 0,function*(){const t=e/s.context.sampleRate,n=new hi(1,t,s.context.sampleRate);return new s.constructor(Object.assign(s.get(),{frequency:2/t,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class wi extends Ht{constructor(){const e=B(wi.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],sn(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new Z({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new Z({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),ce(this,["frequency","detune"])}static getDefaults(){return Object.assign(Ht.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class pe extends Re{constructor(){const e=B(pe.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new _e({context:this.context,units:"frequency",value:e.frequency}),ce(this,"frequency"),this.detune=new _e({context:this.context,units:"cents",value:e.detune}),ce(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),n=new wi({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return pe._periodicWaveCache.find(t=>t.phase===this._phase&&fd(t.partials,this._partials));{const e=pe._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const n=this._getCachedPeriodicWave();if(G(n)){const{partials:i,wave:r}=n;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(i,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),pe._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),pe._periodicWaveCache.length>100&&pe._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){ft(e,0);let t=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(t=n[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const i=new Float32Array(e);this._partials.forEach((r,o)=>i[o]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(e,t){let i=2048;const r=new Float32Array(i),o=new Float32Array(i);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,i=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),i=a):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let h;switch(e){case"sine":h=c<=a?1:0,this._partials[c-1]=h;break;case"square":h=c&1?2*l:0,this._partials[c-1]=h;break;case"sawtooth":h=l*(c&1?1:-1),this._partials[c-1]=h;break;case"triangle":c&1?h=2*(l*l)*(c-1>>1&1?-1:1):h=0,this._partials[c-1]=h;break;case"custom":h=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}h!==0?(r[c]=-h*Math.sin(t*c),o[c]=h*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,n){let i=0;const r=e.length;for(let o=0;o<r;o++)i+=e[o]*Math.cos(o*n)+t[o]*Math.sin(o*n);return i}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let n=0;const i=Math.PI*2,r=32;for(let o=0;o<r;o++)n=Math.max(this._inverseFFT(e,t,o/r*i),n);return gd(-this._inverseFFT(e,t,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}pe._periodicWaveCache=[];class $d extends Xt{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new Mn({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Yt extends _e{constructor(){const e=B(Yt.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new be({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(_e.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class gs extends Re{constructor(){const e=B(gs.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new $d({context:this.context}),this._modulationNode=new be({context:this.context}),this._carrier=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new pe({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Yt({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),ce(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pe.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class vs extends Re{constructor(){const e=B(vs.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new be({context:this.context,gain:0}),this._carrier=new pe({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new _e({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new pe({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Yt({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Yt({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),ce(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pe.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class En extends Re{constructor(){const e=B(En.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new be({context:this.context,gain:0}),this._thresh=new Mn({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new _e({context:this.context,units:"audioRange",value:e.width}),this._triangle=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),ce(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class ys extends Re{constructor(){const e=B(ys.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new _e({context:this.context,units:"frequency",value:e.frequency}),this.detune=new _e({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,ce(this,["frequency","detune"])}static getDefaults(){return Object.assign(pe.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,n=e/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=t+n*r)}}get count(){return this._oscillators.length}set count(e){if(ft(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const n=new pe({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):K});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[t]=n}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,n)=>t.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class _s extends Re{constructor(){const e=B(_s.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Yt({context:this.context,value:2}),this._pulse=new En({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new pe({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),ce(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Re.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const or={am:gs,fat:ys,fm:vs,oscillator:pe,pulse:En,pwm:_s};class es extends Re{constructor(){const e=B(es.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new _e({context:this.context,units:"frequency",value:e.frequency}),this.detune=new _e({context:this.context,units:"cents",value:e.detune}),ce(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(pe.getDefaults(),vs.getDefaults(),gs.getDefaults(),ys.getDefaults(),En.getDefaults(),_s.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=or[e],n=this.now();if(this._oscillator){const i=this._oscillator;i.stop(n),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof or[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&At(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&At(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&it(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return fe(this,arguments,void 0,function*(e=1024){return Ot(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function xo(s,e=1/0){const t=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){ft(r,s,e),t.set(this,r)}})}}function at(s,e=1/0){const t=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){ft(this.toSeconds(r),s,e),t.set(this,r)}})}}class xs extends Re{constructor(){const e=B(xs.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ie({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Re.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:K,onerror:K,playbackRate:1,reverse:!1})}load(e){return fe(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=K){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,n){return super.start(e,t,n),this}_start(e,t,n){this._loop?t=Bt(t,this._loopStart):t=Bt(t,0);const i=this.toSeconds(t),r=n;n=Bt(n,Math.max(this._buffer.duration-i,0));let o=this.toSeconds(n);o=o/this._playbackRate,e=this.toSeconds(e);const a=new ms({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&je(r)?a.start(e,i):a.start(e,i,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(n=>n.stop(t))}restart(e,t,n){return super.restart(e,t,n),this}_restart(e,t,n){var i;(i=[...this._activeSources].pop())===null||i===void 0||i.stop(e),this._start(e,t,n)}seek(e,t){const n=this.toSeconds(t);if(this._state.getValueAtTime(n)==="started"){const i=this.toSeconds(e);this._stop(n),this._start(n,i)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&ft(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&ft(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),n=this._state.getNextState("stopped",t);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}Ye([at(0)],xs.prototype,"fadeIn",void 0);Ye([at(0)],xs.prototype,"fadeOut",void 0);class yt extends z{constructor(){const e=B(yt.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new _e({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(z.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(it(e))return e;{let n;for(n in Vn)if(Vn[n][t]===e)return n;return e}}_setCurve(e,t,n){if(it(n)&&Reflect.has(Vn,n)){const i=Vn[n];St(i)?e!=="_decayCurve"&&(this[e]=i[t]):this[e]=i}else if(qe(n)&&e!=="_decayCurve")this[e]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/i;i=(1-o)/a}if(i<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,i,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,i,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,i,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,e):(W(qe(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,n,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,n=1){return t=this.toSeconds(t),this.triggerAttack(t,n),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,n=0){return fi(this,e,t,n),this}asArray(){return fe(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,n=new hi(1,t,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(t*(i+o)/a,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}Ye([at(0)],yt.prototype,"attack",void 0);Ye([at(0)],yt.prototype,"decay",void 0);Ye([xo(0,1)],yt.prototype,"sustain",void 0);Ye([at(0)],yt.prototype,"release",void 0);const Vn=(()=>{let e,t;const n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));const i=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;i[e]=d/10+t*.83}i[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function h(d){const p=new Array(d.length);for(let f=0;f<d.length;f++)p[f]=1-d[f];return p}function u(d){return d.slice(0).reverse()}return{bounce:{In:h(l),Out:l},cosine:{In:n,Out:u(n)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:h(i)},sine:{In:c,Out:h(c)},step:{In:o,Out:h(o)}}})();class Zt extends z{constructor(){const e=B(Zt.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new rn({context:this.context,volume:e.volume}),this.volume=this._volume.volume,ce(this,"volume")}static getDefaults(){return Object.assign(z.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const n=this["_original_"+e]=this[e];this[e]=(...i)=>{const r=i[t],o=this.context.transport.schedule(a=>{i[t]=a,n.apply(this,i)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,n,i){const r=this.toSeconds(n),o=this.toSeconds(t);return this.triggerAttack(e,r,i),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class Kt extends Zt{constructor(){const e=B(Kt.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Zt.getDefaults(),{detune:0,onsilence:K,portamento:0})}triggerAttack(e,t,n=1){this.log("triggerAttack",e,t,n);const i=this.toSeconds(t);return this._triggerEnvelopeAttack(i,n),this.setNote(e,i),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const n=this.toSeconds(t),i=e instanceof Le?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,n)}else this.frequency.setValueAtTime(i,n);return this}}Ye([at(0)],Kt.prototype,"portamento",void 0);class Ti extends yt{constructor(){super(B(Ti.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new be({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class ts extends Kt{constructor(){const e=B(ts.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new es(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new Ti(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),ce(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(Kt.getDefaults(),{envelope:Object.assign(rr(yt.getDefaults(),Object.keys(z.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(rr(es.getDefaults(),[...Object.keys(Re.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+n+i)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class bs extends ts{constructor(){const e=B(bs.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,ce(this,["oscillator","envelope"])}static getDefaults(){return jt(Kt.getDefaults(),ts.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const n=this.toSeconds(t),i=this.toFrequency(e instanceof Le?e.toFrequency():e),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(i,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}Ye([xo(0)],bs.prototype,"octaves",void 0);Ye([at(0)],bs.prototype,"pitchDecay",void 0);const bo=new Set;function Si(s){bo.add(s)}function wo(s,e){const t=`registerProcessor("${s}", ${e})`;bo.add(t)}const Rd=`
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
`;Si(Rd);const Fd=`
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
`;Si(Fd);const Vd=`
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
`;Si(Vd);const Ld="feedback-comb-filter",jd=`
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
`;wo(Ld,jd);class On extends Zt{constructor(){const e=B(On.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(n=>{const i=parseInt(n,10);if(W(Fn(n)||At(i)&&isFinite(i),`url key is neither a note or midi pitch: ${n}`),Fn(n)){const r=new Le(this.context,n).toMidi();t[r]=e.urls[n]}else At(i)&&isFinite(i)&&(t[i]=e.urls[i])}),this._buffers=new _i({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Zt.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:K,onerror:K,release:.1,urls:{}})}_findClosest(e){let n=0;for(;n<96;){if(this._buffers.has(e+n))return-n;if(this._buffers.has(e-n))return n;n++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,n=1){return this.log("triggerAttack",e,t,n),Array.isArray(e)||(e=[e]),e.forEach(i=>{const r=_o(new Le(this.context,i).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,h=this._buffers.get(l),u=yo(c+a),d=new ms({url:h,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:u}).connect(this.output);d.start(t,0,h.duration/u,n),qe(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),f=p.indexOf(d);f!==-1&&p.splice(f,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(n=>{const i=new Le(this.context,n).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(i,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,n,i=1){const r=this.toSeconds(n);return this.triggerAttack(e,r,i),qe(t)?(W(qe(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,n){if(W(Fn(e)||isFinite(e),`note must be a pitch or midi: ${e}`),Fn(e)){const i=new Le(this.context,e).toMidi();this._buffers.add(i,t,n)}else this._buffers.add(e,t,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}Ye([at(0)],On.prototype,"attack",void 0);Ye([at(0)],On.prototype,"release",void 0);class ki extends z{constructor(){const e=B(ki.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new Z({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",ce(this,"pan")}static getDefaults(){return Object.assign(z.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Bd="bit-crusher",Wd=`
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
`;wo(Bd,Wd);class de extends z{constructor(){const e=B(de.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new be({context:this.context}),de._allSolos.has(this.context)||de._allSolos.set(this.context,new Set),de._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(z.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),de._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){de._soloed.has(this.context)||de._soloed.set(this.context,new Set),de._soloed.get(this.context).add(this)}_removeSolo(){de._soloed.has(this.context)&&de._soloed.get(this.context).delete(this)}_isSoloed(){return de._soloed.has(this.context)&&de._soloed.get(this.context).has(this)}_noSolos(){return!de._soloed.has(this.context)||de._soloed.has(this.context)&&de._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),de._allSolos.get(this.context).delete(this),this._removeSolo(),this}}de._allSolos=new Map;de._soloed=new Map;class Ci extends z{constructor(){const e=B(Ci.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new ki({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new rn({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,ce(this,["pan","volume"])}static getDefaults(){return Object.assign(z.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class Lt extends z{constructor(){const e=B(Lt.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new de({solo:e.solo,context:this.context}),this._panVol=this.output=new Ci({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),ce(this,["pan","volume"])}static getDefaults(){return Object.assign(z.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return Lt.buses.has(e)||Lt.buses.set(e,new be({context:this.context})),Lt.buses.get(e)}send(e,t=0){const n=this._getBus(e),i=new be({context:this.context,units:"decibels",gain:t});return this.connect(i),i.connect(n),i}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}Lt.buses=new Map;class Ai extends z{constructor(){const e=B(Ai.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new Z({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new Z({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new Z({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new Z({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new Z({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),ce(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(z.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}function zd(){return Ve().now()}Ve().transport;Ve().destination;Ve().destination;Ve().listener;Ve().draw;Ve();const Ud=new Ai({threshold:-6,ratio:20,attack:.002,release:.1,knee:3}).toDestination(),qd=new On({urls:{F1:"A_029__F1_5.m4a",B1:"A_035__B1_5.m4a",E2:"A_040__E2_5.m4a",A2:"A_045__A2_5.m4a",D3:"A_050__D3_5.m4a",G3:"A_055__G3_5.m4a",B3:"A_059__B3_5.m4a",D4:"A_062__D4_5.m4a",F4:"A_065__F4_5.m4a",B4:"A_071__B4_5.m4a",E5:"A_076__E5_5.m4a",A5:"A_081__A5_5.m4a",D6:"A_086__D6_5.m4a",G6:"A_091__G6_5.m4a"},baseUrl:"https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",volume:-12,onload:()=>{console.log("Rhodes piano sampler loaded successfully!")},onerror:s=>{console.warn("Failed to load Rhodes piano sampler:",s)}}).connect(Ud),Gd=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function ar(s){const e=Math.floor(s/12)-1,t=s%12;return`${Gd[t]}${e}`}function Hd(s,e=.7,t){try{bd().then(()=>{const n=s.length,i=n<=1?1:Math.max(.4,1/Math.sqrt(n)),r=zd();s.forEach((o,a)=>{let c=0,l=i,h=e;if(t){const{minVelocity:u,maxVelocity:d,spread:p,microTiming:f,humanVariance:m,duration:g}=t;l=(u+Math.random()*(d-u))/127*i;const w=a*p*.1,T=(Math.random()-.5)*f*.05,S=(Math.random()-.5)*m*.03;c=Math.max(0,w+T+S),h=g*(1+(Math.random()-.5)*.2*m)}qd.triggerAttackRelease(o,h,r+c,l)})}).catch(n=>{console.warn("Audio playback gesture failed:",n)})}catch(n){console.warn("Audio playback failed:",n)}}function Xd(s,e,t){const n=[];if(typeof s=="string"){const i=s.split(" ").map(a=>a.trim()).filter(Boolean);if(!i.length)return;const r=i[0],o=e[r]||60;i.forEach((a,c)=>{let l=e[a]||60;c===0?l-=12:l<o&&(l+=12),n.push(ar(l))})}else s.forEach(i=>{n.push(ar(i))});Hd(n,.7,t)}var Yd=Object.defineProperty,Zd=Object.getOwnPropertyDescriptor,et=(s,e,t,n)=>{for(var i=n>1?void 0:n?Zd(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&Yd(e,t,i),i};const cr={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72};let We=class extends nt{constructor(){super(...arguments),this.header="",this.chordName="",this.chordNotes="",this.scale="",this.functionText="",this.voicingsListed=[],this.compactMode=!1,this.extension="7th",this.windowStartMidi=60,this.orchidWindowSize=13}updated(s){}normalizeNote(s){return{Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#",Bb:"A#",db:"C#",eb:"D#",gb:"F#",ab:"G#",bb:"A#"}[s]||s}getNoteNameFromMidi(s){return["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][s%12]}getVoicedMidiNotes(){const s=this.chordNotes?this.chordNotes.split(" "):[];if(!s.length)return[];const e=cr[s[0]]||60,t=e%12;let n=s.map(u=>((cr[u]||60)-e+24)%12);const i=n.some(u=>u>=9),r=n.includes(3)&&n.includes(6),o=n.includes(4)&&n.includes(8),a=n.includes(3)&&!r,c=n.includes(4)&&!o;let l=[];this.extension==="triad"?l=n.filter(u=>u<9):this.extension==="7th"?(l=[...n],i||(r?l.push(9):a?l.push(10):c?l.push(11):l.push(10))):this.extension==="9th"?(l=[...n],i||(r?l.push(9):a?l.push(10):c?l.push(11):l.push(10)),l.includes(2)||l.push(2)):this.extension==="6th"&&(l=n.filter(u=>u<9),l.includes(9)||l.push(9));const h=[];for(const u of l){let p=(t+u)%12;for(;p<this.windowStartMidi;)p+=12;for(;p<this.windowStartMidi+this.orchidWindowSize;)h.includes(p)||h.push(p),p+=12}return h.sort((u,d)=>u-d)}getHeaderClass(){const s=this.header.toUpperCase();return s.includes("TONIC")?"header-tonic":s.includes("DOMINANT")?"header-dominant":s.includes("SUBDOMINANT")||s.includes("SUPERTONIC")||s.includes("LEADING")?"header-subdominant":""}handlePlayClick(){this.dispatchEvent(new CustomEvent("play-chord",{detail:{notes:this.getVoicedMidiNotes()},bubbles:!0,composed:!0}))}render(){(this.chordNotes?this.chordNotes.split(" "):[])[0];const t=this.getVoicedMidiNotes().map(n=>this.getNoteNameFromMidi(n)).join(" ");return D`
      <div class="profile-card ${this.compactMode?"compact":""}">
        <!-- Card Header with title, pill tag and Notes Set inline -->
        <div class="card-header">
          <div class="title-area">
            <div class="chord-title-row">
              <div class="chord-name-group">
                <div class="chord-title">${this.chordName||"..."}</div>
                <span class="header-pill ${this.getHeaderClass()}">${this.header||"Chord Profile"}</span>
              </div>
              <div class="chord-notes-badge">
                <span class="chord-notes-label">Notes Set</span>
                <span class="chord-notes-value">${t||"-"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Scale context (hidden in compactMode) -->
        ${this.compactMode?"":D`
          <div class="chord-info" style="margin-top: -10px;">
            <div class="scale-text">${this.scale||"Chord Scale Context"}</div>
          </div>
        `}
        
        <!-- Functional description (hidden in compactMode) -->
        ${this.compactMode?"":D`
          <div class="function-box">
            ${this.functionText?this.functionText.replace("FUNCTION:","").trim():"Select a starting key to load chord descriptions."}
          </div>
        `}
      </div>
    `}};We.styles=vn`
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
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `;et([oe({type:String})],We.prototype,"header",2);et([oe({type:String})],We.prototype,"chordName",2);et([oe({type:String})],We.prototype,"chordNotes",2);et([oe({type:String})],We.prototype,"scale",2);et([oe({type:String})],We.prototype,"functionText",2);et([oe({type:Array})],We.prototype,"voicingsListed",2);et([oe({type:Boolean})],We.prototype,"compactMode",2);et([oe({type:String})],We.prototype,"extension",2);et([oe({type:Number})],We.prototype,"windowStartMidi",2);We=et([_n("chord-profile-card")],We);var Kd=Object.defineProperty,Jd=Object.getOwnPropertyDescriptor,Ni=(s,e,t,n)=>{for(var i=n>1?void 0:n?Jd(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&Kd(e,t,i),i};const Qd={"tonic-major":{label:"Home / Sanctuary",emoji:"☀️",class:"vibe-tonic-major"},"tonic-minor":{label:"Shadow / Solitude",emoji:"🌌",class:"vibe-tonic-minor"},subdominant:{label:"Horizon / Lift",emoji:"🌅",class:"vibe-subdominant"},dominant:{label:"Gravity / Friction",emoji:"⛈️",class:"vibe-dominant"},"modal-interchange":{label:"Nostalgia / Echo",emoji:"🌬️",class:"vibe-modal-interchange"}};let gn=class extends nt{constructor(){super(...arguments),this.options=[],this.compactMode=!1}getVibeConfig(s){return Qd[s]||{label:"Unknown Vibe",emoji:"❓",class:"vibe-tonic-major"}}handleOptionSelect(s){this.dispatchEvent(new CustomEvent("select-next-chord",{detail:{option:s},bubbles:!0,composed:!0}))}handlePreviewClick(s,e){s.stopPropagation(),this.dispatchEvent(new CustomEvent("preview-chord-name",{detail:{name:e.name},bubbles:!0,composed:!0}))}render(){return D`
      <div class="options-container">
        <div class="options-header">
          <span>Next Transition Options</span>
          <span style="font-size: 0.7rem; font-weight: 400; text-transform: none;">Click card to transition</span>
        </div>
        
        ${this.options.map(s=>{const e=this.getVibeConfig(s.vibe),t=parseInt(s.tension)||50,n=Math.min(4,Math.max(1,Math.ceil(t/25))),i=[];for(let r=1;r<=4;r++){const o=r<=n;i.push(D`
              <span class="dot ${o?`t${n}-fill`:""}"></span>
            `)}return D`
            <div class="option-card ${e.class}" @click="${()=>this.handleOptionSelect(s)}">
              <!-- Chord pill & audio preview trigger -->
              <div class="chord-pill-container">
                <div class="chord-pill">${s.name}</div>
                <button class="btn-preview" @click="${r=>this.handlePreviewClick(r,s)}" title="Preview Sound">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </button>
              </div>
              
              <!-- Transition description -->
              <div class="desc-section">
                ${this.compactMode?"":D`<div class="desc-text">${s.description}</div>`}
                <div class="meta-row">
                  <span class="mood-badge ${e.class} ${this.compactMode?"large-mode":""}">
                    <span class="emoji-icon">${e.emoji}</span> 
                    <span class="mood-text">${e.label}</span>
                  </span>
                </div>
              </div>
              
              <!-- Tension dots rating -->
              <div class="tag-section">
                <div class="tension-dots">
                  ${i}
                </div>
                <span class="tension-lbl">${s.tension}</span>
              </div>
            </div>
          `})}
      </div>
    `}};gn.styles=vn`
    :host {
      display: flex;
      flex-direction: column;
    }
    
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      box-sizing: border-box;
      padding-bottom: 40px;
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
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
      background: var(--bg-card);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: var(--neu-flat);
      transition: all 0.25s ease;
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
    .option-card.vibe-tonic-major:hover .chord-pill { 
      background: linear-gradient(180deg, #c2a173 0%, #ab8b61 100%); 
      color: #171513; 
      border-color: #d9b88c;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(171, 139, 97, 0.6);
    }

    .option-card.vibe-tonic-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #e3dac9 0%, #c4baa7 100%); 
      color: #171513; 
      border-color: #eadecc;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px rgba(213, 205, 186, 0.6);
    }

    .option-card.vibe-subdominant:hover .chord-pill { 
      background: linear-gradient(180deg, #db6646 0%, #c25233 100%); 
      color: #ffffff; 
      border-color: #ec7f61;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(194, 82, 51, 0.6);
    }

    .option-card.vibe-dominant:hover .chord-pill { 
      background: linear-gradient(180deg, #a83d2e 0%, #87291c 100%); 
      color: #ffffff; 
      border-color: #c25244;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(135, 41, 28, 0.6);
    }

    .option-card.vibe-modal-interchange:hover .chord-pill { 
      background: linear-gradient(180deg, #8a8170 0%, #6e6556 100%); 
      color: #ffffff; 
      border-color: #a39987;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 8px rgba(115, 107, 92, 0.6);
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
    
    .vibe-tonic-major { background: var(--bg-card); color: var(--accent-gold); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-tonic-minor { background: var(--bg-card); color: var(--text-secondary); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-subdominant { background: var(--bg-card); color: var(--accent-terracotta); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-dominant { background: var(--bg-card); color: #87291c; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-modal-interchange { background: var(--bg-card); color: var(--text-muted); border: none; box-shadow: var(--neu-pressed-sm); }
    
    .tension-lbl {
      font-size: 0.65rem;
      color: var(--text-muted);
      font-weight: 700;
    }

    @media (max-width: 600px) {
      .option-card {
        padding: 10px 12px;
        gap: 8px;
        grid-template-columns: auto 1fr;
      }
      .tag-section {
        display: none;
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
  `;Ni([oe({type:Array})],gn.prototype,"options",2);Ni([oe({type:Boolean})],gn.prototype,"compactMode",2);gn=Ni([_n("next-options-table")],gn);var ep=Object.defineProperty,tp=Object.getOwnPropertyDescriptor,Dn=(s,e,t,n)=>{for(var i=n>1?void 0:n?tp(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&ep(e,t,i),i};const np=["C","D","E","F","G","A","B"],sp=[{name:"C#",offset:1},{name:"D#",offset:2},{name:"F#",offset:4},{name:"G#",offset:5},{name:"A#",offset:6}],ip={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72};let It=class extends nt{constructor(){super(...arguments),this.activeNotes=[],this.rootNoteName="",this.windowStart=-1,this.windowSize=0}normalizeNoteName(s){return{Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#",Bb:"A#",db:"C#",eb:"D#",gb:"F#",ab:"G#",bb:"A#"}[s]||s}getNoteNameFromMidi(s){return["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][s%12]}getActiveMidiNumbers(){return!this.activeNotes||!this.activeNotes.length?[]:this.activeNotes.map(s=>typeof s=="number"?s:ip[s.trim()]||60)}isMidiActive(s){return this.getActiveMidiNumbers().includes(s)}isMidiRoot(s){if(!this.rootNoteName)return!1;const e=this.getNoteNameFromMidi(s),t=this.normalizeNoteName(e),n=this.normalizeNoteName(this.rootNoteName);return t===n}render(){const e=3.5714285714285716,t=[],n=[];let i=100,r=0;for(let o=0;o<28;o++){const a=Math.floor(o/7),c=np[o%7],l=[0,2,4,5,7,9,11],h=36+a*12+l[o%7],u=this.isMidiActive(h),d=u&&this.isMidiRoot(h),p=o*e,f=e-.3;this.windowStart!==-1&&h>=this.windowStart&&h<this.windowStart+this.windowSize&&(i=Math.min(i,p),r=Math.max(r,p+e)),t.push(dt`
        <g>
          <rect
            class="white-key ${u?"active":""} ${d?"root-key":""}"
            x="${p}%"
            y="0"
            width="${f}%"
            height="100%"
          />
          <text
            x="${(o+.5)*e}%"
            y="90%"
            text-anchor="middle"
            fill="${d?"#c25233":u?"#ab8b61":"#736b5c"}"
            font-size="7px"
            font-weight="700"
            font-family="var(--font-mono)"
            style="pointer-events: none; user-select: none;"
          >
            ${c}${d?"R":""}
          </text>
        </g>
      `)}for(let o=0;o<4;o++){const a=o*7;for(const c of sp){const l=a+c.offset,h={"C#":1,"D#":3,"F#":6,"G#":8,"A#":10},u=36+o*12+h[c.name],d=this.isMidiActive(u),p=d&&this.isMidiRoot(u),f=l*e-e*.3,m=e*.6;this.windowStart!==-1&&u>=this.windowStart&&u<this.windowStart+this.windowSize&&(i=Math.min(i,f),r=Math.max(r,f+m)),n.push(dt`
          <g>
            <rect
               class="black-key ${d?"active":""} ${p?"root-key":""}"
              x="${f}%"
              y="0"
              width="${m}%"
              height="60%"
            />
            ${d?dt`
              <text
                x="${f+m*.5}%"
                y="45%"
                text-anchor="middle"
                fill="${p?"#fbf4f0":"#d5cdba"}"
                font-size="6px"
                font-weight="700"
                font-family="var(--font-mono)"
                style="pointer-events: none; user-select: none;"
              >
                ${c.name.replace("#","♯")}${p?"R":""}
              </text>
            `:""}
          </g>
        `)}}return D`
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
          ${this.windowStart!==-1&&r>i?dt`
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
    `}};It.styles=vn`
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
  `;Dn([oe({type:Array})],It.prototype,"activeNotes",2);Dn([oe({type:String})],It.prototype,"rootNoteName",2);Dn([oe({type:Number})],It.prototype,"windowStart",2);Dn([oe({type:Number})],It.prototype,"windowSize",2);It=Dn([_n("chord-keyboard")],It);var rp=Object.defineProperty,op=Object.getOwnPropertyDescriptor,Oe=(s,e,t,n)=>{for(var i=n>1?void 0:n?op(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&rp(e,t,i),i};let we=class extends nt{constructor(){super(...arguments),this.sections=[],this.activeLocation=null,this.isPlaying=!1,this.isLooping=!1,this.collapsed=!1,this.activeNotes=[],this.rootNoteName="",this.windowStartMidi=60,this.viewedSectionId=null,this.humanLoaded=!1,this.showHuman=!1,this.isEditing=!1,this.showHumanInsideEditor=!1,this.dragStartX=0,this.dragStartWin=0,this.isDraggingVoicing=!1}connectedCallback(){super.connectedCallback(),import("https://warmsynths.github.io/human-midi/human-engine.js").then(()=>{this.humanLoaded=!0}).catch(t=>{console.warn("Could not load human panel:",t)})}handlePlayToggle(){this.dispatchEvent(new CustomEvent("toggle-play",{bubbles:!0,composed:!0}))}handleLoopToggle(){this.dispatchEvent(new CustomEvent("toggle-loop",{bubbles:!0,composed:!0}))}handleClear(){this.dispatchEvent(new CustomEvent("clear-timeline",{bubbles:!0,composed:!0}))}handleHumanChange(s){this.dispatchEvent(new CustomEvent("human-state-change",{detail:s.detail,bubbles:!0,composed:!0}))}handleHumanPreview(s){this.dispatchEvent(new CustomEvent("human-preview",{detail:s.detail,bubbles:!0,composed:!0}))}handleStepClick(s,e){this.dispatchEvent(new CustomEvent("select-step",{detail:{sectionId:s,index:e},bubbles:!0,composed:!0}))}handleStepDblClick(s,e){this.isEditing=!0,this.dispatchEvent(new CustomEvent("select-step",{detail:{sectionId:s,index:e},bubbles:!0,composed:!0}))}exitEditMode(){this.isEditing=!1,this.dispatchEvent(new CustomEvent("select-step",{detail:null,bubbles:!0,composed:!0}))}navigateStep(s){if(!this.activeLocation)return;const e=this.sections.findIndex(r=>r.id===this.activeLocation.sectionId);if(e===-1)return;let t=e,n=this.activeLocation.stepIndex+s;if(n<0)if(t>0)t--,n=this.sections[t].steps.length-1;else return;else if(n>=this.sections[t].steps.length)if(t<this.sections.length-1)t++,n=0;else return;const i=this.sections[t];this.handleStepClick(i.id,n)}handleRemoveStep(s,e,t){s.stopPropagation(),this.dispatchEvent(new CustomEvent("remove-step",{detail:{sectionId:e,index:t},bubbles:!0,composed:!0}))}handleToggleCollapse(){this.dispatchEvent(new CustomEvent("toggle-collapse",{bubbles:!0,composed:!0}))}handleDuplicateSection(s){this.dispatchEvent(new CustomEvent("duplicate-section",{detail:{sectionId:s},bubbles:!0,composed:!0}))}handleDeleteSection(s){this.dispatchEvent(new CustomEvent("delete-section",{detail:{sectionId:s},bubbles:!0,composed:!0}))}handleRenameSection(s,e){const t=s.target;this.dispatchEvent(new CustomEvent("rename-section",{detail:{sectionId:e,name:t.value},bubbles:!0,composed:!0}))}handleAddSection(){this.dispatchEvent(new CustomEvent("add-section",{bubbles:!0,composed:!0}))}handleKeyboardPointerDown(s){const e=s.currentTarget;this.dragStartX=s.clientX,this.dragStartWin=this.windowStartMidi,this.isDraggingVoicing=!0,e.setPointerCapture(s.pointerId)}getNextWhiteKey(s,e){const t=[0,2,4,5,7,9,11];let n=s;for(let i=0;i<12;i++)if(n+=e,t.includes(n%12))return n;return s+e}handleKeyboardPointerMove(s){if(!this.isDraggingVoicing)return;const e=s.clientX-this.dragStartX,t=Math.round(e/15);let n=this.dragStartWin;if(t>0)for(let i=0;i<t;i++)n=this.getNextWhiteKey(n,1);else if(t<0)for(let i=0;i<Math.abs(t);i++)n=this.getNextWhiteKey(n,-1);n=Math.max(36,Math.min(71,n)),n!==this.windowStartMidi&&this.dispatchEvent(new CustomEvent("change-voicing-window",{detail:{windowStartMidi:n},bubbles:!0,composed:!0}))}handleKeyboardPointerUp(){this.isDraggingVoicing&&(this.isDraggingVoicing=!1,this.dispatchEvent(new CustomEvent("play-active-chord",{bubbles:!0,composed:!0})))}handleExtensionChange(s){this.dispatchEvent(new CustomEvent("change-extension",{detail:{extension:s},bubbles:!0,composed:!0}))}handleKeyboardWheel(s){s.preventDefault();const t=(Math.abs(s.deltaX)>Math.abs(s.deltaY)?s.deltaX:s.deltaY)>0?1:-1;let n=this.getNextWhiteKey(this.windowStartMidi,t);n=Math.max(36,Math.min(71,n)),n!==this.windowStartMidi&&this.dispatchEvent(new CustomEvent("change-voicing-window",{detail:{windowStartMidi:n},bubbles:!0,composed:!0}))}willUpdate(s){s.has("activeLocation")&&(this.activeLocation?this.viewedSectionId=this.activeLocation.sectionId:this.isEditing=!1),s.has("sections")&&(this.sections.length>0?(!this.viewedSectionId||!this.sections.find(e=>e.id===this.viewedSectionId))&&(this.viewedSectionId=this.sections[0].id):this.viewedSectionId=null)}updated(s){super.updated(s),s.has("activeLocation")&&this.activeLocation&&setTimeout(()=>this.scrollActiveStepIntoView(),50)}scrollActiveStepIntoView(){const s=this.renderRoot.querySelector(".chord-chip.active");s&&s.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}getTensionClass(s){if(!s)return"1";if(s.includes("%")){const e=parseInt(s,10);return isNaN(e)||e<=25?"1":e<=50?"2":e<=75?"3":"4"}if(s.startsWith("T")){const e=s.charAt(1);if(["1","2","3","4"].includes(e))return e}return"1"}render(){const s=this.sections.length>0,e=this.sections.reduce((n,i)=>n+i.steps.length,0);if(this.collapsed)return D`
        <div class="collapsed-container" @click="${this.handleToggleCollapse}">
          <div class="collapsed-left">
            <span class="collapsed-title">
              Progression <span style="color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono);">(${e} Chords, ${this.sections.length} Sections)</span>
            </span>
            ${s?D`
              <span class="collapsed-preview">
                ${this.sections[0].steps.slice(0,4).map((n,i)=>D`
                  <span class="collapsed-chip">${n?n.name:"Empty"}</span>
                  ${i<Math.min(3,this.sections[0].steps.length-1)?D`
                    <span style="opacity: 0.4;">➔</span>
                  `:""}
                `)}
                ${e>4?"...":""}
              </span>
            `:D`
              <span class="empty-msg" style="margin-left: 10px; color: var(--text-muted); font-size: 0.8rem;">Empty progression. Expand to configure.</span>
            `}
          </div>
          <button class="btn-icon" title="Reveal Deck">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      `;const t=this.sections.find(n=>n.id===this.viewedSectionId)||this.sections[0];return D`
      <!-- Global Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn-primary" ?disabled="${!s}" @click="${this.handlePlayToggle}">
            ${this.isPlaying?D`
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg> <span class="btn-text">Pause</span>
            `:D`
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
      ${s?D`
        <div class="section-tabs-row">
          <div class="tabs-list">
            ${this.sections.map(n=>D`
              <div class="section-tab ${this.viewedSectionId===n.id?"active":""}" @click="${()=>this.viewedSectionId=n.id}">
                ${this.viewedSectionId===n.id?D`
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
                `:D`
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
            ${(()=>{if(!t)return"";const n=this.sections.length<=1;return D`
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
          ${s?this.renderSection(t):D`
            <div class="empty-timeline-box">
              No chords added yet. Explore options in the next options panel to begin building your progression.
            </div>
          `}
        </div>
        
        <!-- Inline Chord Editor Drawer -->
        ${s&&this.activeLocation?D`
          <div class="chord-editor-drawer">
            ${this.renderChordEditor()}
          </div>
        `:""}
      </div>
    `}renderChordEditor(){if(!this.activeLocation)return"";const s=this.sections.find(c=>c.id===this.activeLocation.sectionId);if(!s)return"";const e=s.steps[this.activeLocation.stepIndex],t=this.sections.reduce((c,l)=>c+l.steps.length,0);let n=0;for(const c of this.sections){if(c.id===this.activeLocation.sectionId){n+=this.activeLocation.stepIndex;break}n+=c.steps.length}const i=n===0,r=n===t-1,o=e?e.name:"Empty Slot",a=e?.extension||"7th";return D`
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
        ${this.activeNotes.length>0?D`
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
              ${["triad","7th","9th","6th"].map(c=>D`
                <button 
                  class="btn-extension ${a===c?"active":""}" 
                  @click=${()=>this.handleExtensionChange(c)}
                >
                  ${c.toUpperCase()}
                </button>
              `)}
            </div>

            <!-- Humanize Toggle -->
            ${this.humanLoaded?D`
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
          ${this.humanLoaded&&this.showHumanInsideEditor?D`
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
        `:D`
          <div class="empty-timeline-box" style="height: 100px; padding: 20px;">
            Voicing configuration is loaded when a valid chord is selected.
          </div>
        `}
      </div>
    `}renderSection(s){return s?D`
      <div class="timeline-scroll-container">
        <div class="timeline-track">
          ${s.steps.map((e,t)=>{const n=this.activeLocation?.sectionId===s.id&&this.activeLocation?.stepIndex===t,i=this.sections[0]?.id===s.id&&t===0;return D`
              <div class="step-wrapper">
                <div class="chord-chip ${n?"active":""} ${e?"":"empty-slot"}" 
                     @click="${()=>this.handleStepClick(s.id,t)}"
                     @dblclick="${()=>this.handleStepDblClick(s.id,t)}">
                  
                  <div class="chip-led ${n?"led-active":""}"></div>
                  <div class="chip-index">${String(t+1).padStart(2,"0")}</div>
                  
                  ${e?D`
                    <div class="chip-name">${e.name}</div>
                    <div class="chip-tension-row">
                      <span class="chip-tension-badge tension-${this.getTensionClass(e.tension)}">${e.tension}</span>
                      ${e.extension&&e.extension!=="7th"?D`
                        <span class="chip-ext-badge">${e.extension.toUpperCase()}</span>
                      `:""}
                    </div>
                    
                    <button class="btn-remove-step" @click="${r=>this.handleRemoveStep(r,s.id,t)}" title="Remove step">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  `:D`
                    <div class="chip-name empty-text">Empty</div>
                    ${i?"":D`
                      <button class="btn-remove-step" @click="${r=>this.handleRemoveStep(r,s.id,t)}" title="Remove empty slot">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    `}
                  `}
                </div>

                ${t<s.steps.length-1?D`
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
    `:""}};we.styles=vn`
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
  `;Oe([oe({type:Array})],we.prototype,"sections",2);Oe([oe({type:Object})],we.prototype,"activeLocation",2);Oe([oe({type:Boolean})],we.prototype,"isPlaying",2);Oe([oe({type:Boolean})],we.prototype,"isLooping",2);Oe([oe({type:Boolean})],we.prototype,"collapsed",2);Oe([oe({type:Array})],we.prototype,"activeNotes",2);Oe([oe({type:String})],we.prototype,"rootNoteName",2);Oe([oe({type:Number})],we.prototype,"windowStartMidi",2);Oe([X()],we.prototype,"viewedSectionId",2);Oe([X()],we.prototype,"humanLoaded",2);Oe([X()],we.prototype,"showHuman",2);Oe([X()],we.prototype,"isEditing",2);Oe([X()],we.prototype,"showHumanInsideEditor",2);we=Oe([_n("chord-timeline")],we);var ap=Object.defineProperty,cp=Object.getOwnPropertyDescriptor,te=(s,e,t,n)=>{for(var i=n>1?void 0:n?cp(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&ap(e,t,i),i};const ks={C:60,"C#":61,Db:61,Cx:62,D:62,"D#":63,Eb:63,Dx:64,E:64,"E#":65,F:65,"F#":66,Gb:66,Fx:67,G:67,"G#":68,Ab:68,Gx:69,A:69,"A#":70,Bb:70,Ax:71,B:71,"B#":72},Cs=[{id:"MAJOR",emoji:"☀️",title:"Sunlit Harbor",subtitle:"Major / Ionian",desc:"A clear, optimistic vibe of home and sanctuary. Excellent for open, joyous landscapes and peaceful resolution.",phase:1},{id:"MIXOLYDIAN",emoji:"🌊",title:"The Warm Current",subtitle:"Mixolydian Mode",desc:"A sun-drenched, fluid breeze. Shifting away from standard major keys, Mixolydian introduces a mellow, flattened 7th degree, delivering classic neo-soul warmth and smooth electronic movement.",phase:1},{id:"DORIAN",emoji:"🌆",title:"The Twilight Hour",subtitle:"Dorian Mode",desc:"A smooth, cinematic dusk. The Dorian Mode blends a minor foundation with a bright major twist, perfect for sophisticated, driving lofi tracks and jazzy, late-night cruising vibes.",phase:2},{id:"NATURAL MINOR",emoji:"🌌",title:"Clear Night",subtitle:"Natural Minor / Aeolian",desc:"A midnight journey into shadow and solitude. Charts introspective, melancholic vibes, capturing deep emotional groundings and quiet nostalgia.",phase:3},{id:"HARMONIC MINOR",emoji:"⛈️",title:"The Storm",subtitle:"Harmonic Minor",desc:"A dramatic crossing filled with gravitational friction. The Harmonic Minor Scale introduces exotic mystery and heightened tension, providing powerful resolution paths.",phase:3}],lp=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],hp=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];let Q=class extends nt{constructor(){super(...arguments),this.chordData={chords:{},scales:{}},this.activeProfile=null,this.sections=[],this.activeLocation=null,this.isPlaying=!1,this.isLooping=!1,this.timelineCollapsed=!0,this.compactMode=!1,this.lightMode=!1,this.projects=[],this.currentProjectId=null,this.currentProjectName="Untitled Project",this.showProjectModal=!1,this.showShareModal=!1,this.shareModalToast="",this.selectedShareDevice="m8",this.isAuthenticated=!1,this.authUserEmail="",this.authError="",this.activeOptionsTab="diatonic",this.humanState=null,this.AUTHORIZED_HASHES=["cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2","99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac"],this.previewVoicing="middle",this.driveService=new Zo,this.tokenClient=null,this.isDriveSyncing=!1,this.setupStep="scale",this.selectedScaleType=null,this.playTimeoutId=null}connectedCallback(){super.connectedCallback(),this.projects=ke.getProjects()}async firstUpdated(){const s=localStorage.getItem("chord-voyager-compact-mode");s&&(this.compactMode=s==="true"),localStorage.getItem("chord-voyager-light-mode")==="true"&&(this.lightMode=!0,document.documentElement.classList.add("light-theme"));try{console.log("Fetching chord_voyager_data.json...");const n=await fetch("./chord_voyager_data.json");if(!n.ok)throw new Error(`HTTP error: ${n.status}`);if(this.chordData=await n.json(),this.chordData&&this.chordData.scales){const o={C:"F",Db:"Gb",D:"G",Eb:"Ab",E:"A",F:"Bb","F#":"B",G:"C",Ab:"Db",A:"D",Bb:"Eb",B:"E"},a={C:"Bb","C#":"B",D:"C","D#":"Db",E:"D",F:"Eb","F#":"E",G:"F","G#":"F#",A:"G","A#":"Ab",B:"A"},c={DORIAN_SUPERTONIC:"TONIC",DORIAN_MEDIANT:"SUPERTONIC",DORIAN_SUBDOMINANT:"MEDIANT",DORIAN_DOMINANT:"SUBDOMINANT",DORIAN_SUBMEDIANT:"DOMINANT","DORIAN_LEADING-TONE":"SUBMEDIANT",DORIAN_TONIC:"SUBTONIC",MIXOLYDIAN_DOMINANT:"TONIC",MIXOLYDIAN_SUBMEDIANT:"SUPERTONIC","MIXOLYDIAN_LEADING-TONE":"MEDIANT",MIXOLYDIAN_TONIC:"SUBDOMINANT",MIXOLYDIAN_SUPERTONIC:"DOMINANT",MIXOLYDIAN_MEDIANT:"SUBMEDIANT",MIXOLYDIAN_SUBDOMINANT:"SUBTONIC"},l={DORIAN_TONIC:"SUPERTONIC",DORIAN_SUPERTONIC:"MEDIANT",DORIAN_MEDIANT:"SUBDOMINANT",DORIAN_SUBDOMINANT:"DOMINANT",DORIAN_DOMINANT:"SUBMEDIANT",DORIAN_SUBMEDIANT:"LEADING-TONE",DORIAN_SUBTONIC:"TONIC",MIXOLYDIAN_TONIC:"DOMINANT",MIXOLYDIAN_SUPERTONIC:"SUBMEDIANT",MIXOLYDIAN_MEDIANT:"LEADING-TONE",MIXOLYDIAN_SUBDOMINANT:"TONIC",MIXOLYDIAN_DOMINANT:"SUPERTONIC",MIXOLYDIAN_SUBMEDIANT:"MEDIANT",MIXOLYDIAN_SUBTONIC:"SUBDOMINANT"};for(const[h,u]of Object.entries(o)){const d=`${u}_MAJOR`,p=this.chordData.scales[d];if(!p)continue;const f=`${h}_MIXOLYDIAN`,m={};for(const g of["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"]){const y=l[`MIXOLYDIAN_${g}`],w=p.degrees[y];if(!w)continue;const T=JSON.parse(JSON.stringify(w));T.next_chord_options=(T.next_chord_options||[]).map(S=>{if(S.nodeId.startsWith(`${u}_MAJOR_`)){const v=S.nodeId.replace(`${u}_MAJOR_`,""),x=c[`MIXOLYDIAN_${v}`];if(x)return{name:S.name,nodeId:`${h}_MIXOLYDIAN_${x}`}}return S}),m[g]=T}this.chordData.scales[f]={root:h,type:"MIXOLYDIAN",degrees:m}}for(const[h,u]of Object.entries(a)){const d=`${u}_MAJOR`,p=this.chordData.scales[d];if(!p)continue;const f=`${h}_DORIAN`,m={};for(const g of["TONIC","SUPERTONIC","MEDIANT","SUBDOMINANT","DOMINANT","SUBMEDIANT","SUBTONIC"]){const y=l[`DORIAN_${g}`],w=p.degrees[y];if(!w)continue;const T=JSON.parse(JSON.stringify(w));T.next_chord_options=(T.next_chord_options||[]).map(S=>{if(S.nodeId.startsWith(`${u}_MAJOR_`)){const v=S.nodeId.replace(`${u}_MAJOR_`,""),x=c[`DORIAN_${v}`];if(x)return{name:S.name,nodeId:`${h}_DORIAN_${x}`}}return S}),m[g]=T}this.chordData.scales[f]={root:h,type:"DORIAN",degrees:m}}}const i=this.chordData.scales?Object.keys(this.chordData.scales).length:0,r=this.chordData.chords?Object.keys(this.chordData.chords).length:0;console.log(`Loaded ${i} scales and ${r} unique chords.`)}catch(n){console.error("Failed to load chord voyager data:",n)}localStorage.getItem("chord_voyager_auth_token"),localStorage.getItem("chord_voyager_auth_email");const t=localStorage.getItem("chord-voyager-auth");if(window.location.search.includes("bypass=true"))this.isAuthenticated=!0,this.authUserEmail="developer@local.test";else if(t){const n=await this.hashEmail(t);this.AUTHORIZED_HASHES.includes(n)?(this.isAuthenticated=!0,this.authUserEmail=t):this.initGoogleAuth()}else this.initGoogleAuth()}initGoogleAuth(){const s=setInterval(()=>{window.google&&(clearInterval(s),this.tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:"184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email",callback:async e=>{if(e&&e.access_token)try{const t=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${e.access_token}`}});if(!t.ok)throw new Error("Failed to fetch user info");const n=await t.json();if(n&&n.email){const i=await this.hashEmail(n.email);if(this.AUTHORIZED_HASHES.includes(i)){this.isAuthenticated=!0,this.authUserEmail=n.email,this.authError="",localStorage.setItem("chord-voyager-auth",n.email),this.driveService.setAccessToken(e.access_token),await this.syncProjectsFromCloud();return}}this.isAuthenticated=!1,this.authUserEmail="",this.authError="Access Denied: Email not authorized."}catch(t){this.authError="Login failed. Please try again.",console.error(t)}}}))},200)}requestDriveAccess(){this.tokenClient&&this.tokenClient.requestAccessToken()}async syncProjectsFromCloud(){if(!(this.isDriveSyncing||!this.driveService.hasAccessToken())){this.isDriveSyncing=!0;try{const s=await this.driveService.loadProjects();if(s){s.forEach(n=>n.syncedToCloud=!0);const e=ke.getProjects(),t=ke.mergeProjects(e,s);ke.setProjects(t),this.projects=t}}catch(s){console.error("Failed to sync from cloud",s)}finally{this.isDriveSyncing=!1}}}async syncProjectsToCloud(){if(!this.isDriveSyncing){if(!this.driveService.hasAccessToken()){this.requestDriveAccess();return}this.isDriveSyncing=!0;try{const s=ke.getProjects();await this.driveService.saveProjects(s),s.forEach(e=>e.syncedToCloud=!0),ke.setProjects(s),this.projects=s}catch(s){console.error("Failed to sync to cloud",s),s instanceof Error&&s.message.includes("Unauthorized")&&this.requestDriveAccess()}finally{this.isDriveSyncing=!1}}}async hashEmail(s){const t=new TextEncoder().encode(s),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}handleLogout(){this.isAuthenticated=!1,this.authUserEmail="",localStorage.removeItem("chord-voyager-auth"),this.initGoogleAuth()}playChordNotes(s){Xd(s,ks,this.humanState)}normalizeChordName(s){const e=s.toUpperCase(),t=e.match(/^([A-G](?:#|B|X)?)(.*)$/);if(!t)return e;const n=t[1],i=t[2];let r="MAJ";return!i||i==="7"||i.startsWith("MAJ")||i==="M7"?r="MAJ":i.startsWith("MIN")?r="MIN":i.startsWith("DIM")?r="DIM":i.startsWith("AUG")?r="AUG":i.startsWith("XDIM")&&(r="XDIM"),n+r}resolveProfile(s){if(!this.chordData||!this.chordData.scales)return null;const e=s.split("_");if(e.length<3)return null;const t=e[0],n=e[e.length-1];e.slice(1,e.length-1).join(" ");const i=`${t}_${e.slice(1,e.length-1).join("_")}`,r=this.chordData.scales[i];if(!r)return null;const o=r.degrees[n];if(!o)return null;const a=this.chordData.chords[o.chord_name];if(!a)return null;const c=`${r.root} ${r.type} SCALE`,l=this.generateActiveChordDescription(o.chord_name,n,c),h=this.getCurrentProgressionHistory(),u=(o.next_chord_options||[]).map(d=>{const f=d.nodeId,m=this.getVibeKeyForOption(f,!1),g=this.calculateDynamicTension(d.name,h),y=this.generateDynamicDescription(o.chord_name,d.name,m,f.split("_").pop()||"");return{name:d.name,nodeId:f,targetChordId:f,tension:`${g}%`,vibe:m,description:y}});return{header:n,chord_name:o.chord_name,chord_notes:a.notes,hex_values:a.hex_values,scale:c,function_text:l,voicings_listed:a.voicings_listed,next_chord_options:u}}calculateDynamicTension(s,e){if(!this.activeProfile)return 50;const t=this.activeProfile.scale.split(" ")[0]||"C",n=s.match(/^[A-G][#b]?/)?.[0]||"C",i=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],r=i.indexOf(t.replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#")),o=i.indexOf(n.replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#"));if(r===-1||o===-1)return 50;switch((o-r+12)%12){case 0:return 10;case 7:return 80;case 5:return 45;case 2:return 40;case 9:return 30;case 4:return 20;case 11:return 90;case 1:case 8:case 3:case 10:case 6:return 95;default:return 50}}generateActiveChordDescription(s,e,t){const n=t.toUpperCase().includes("MAJOR"),i=e.toUpperCase();return i==="TONIC"?n?`The ${s} chord is the stable Tonic of the key, serving as the home foundation. It provides a complete sense of resolution, clarity, and peace.`:`The ${s} chord is the minor Tonic of the key, creating a reflective, introspective home. It feels deeply grounded yet carries a shaded, thoughtful mood.`:i==="DOMINANT"||i==="LEADING-TONE"?`Operating as a dominant force, ${s} creates significant tension and gravity. It establishes a strong harmonic pull that naturally directs the ear back to the tonic home.`:i==="SUBDOMINANT"||i==="SUPERTONIC"?`Functioning as a subdominant, ${s} introduces a pleasant sense of departure and lift. It expands the musical horizon and sets up the transition toward dominant tension.`:i==="MEDIANT"||i==="SUBMEDIANT"?`As a tonic substitute, ${s} offers a soft, introspective variation of the key's center. It blends feelings of stability with subtle emotional color.`:`The ${s} chord functions within the ${t}, contributing unique color and voice leading to the overall progression.`}generateDynamicDescription(s,e,t,n,i){const r={"tonic-major":[`Transitioning to ${e} brings a profound sense of resolution and stability. It feels like returning to a safe haven, anchoring the progression.`,`Moving to the bright tonic ${e} establishes a clear point of rest and clarity, offering a warm and welcoming release.`],"tonic-minor":[`Shifting to ${e} introduces a quiet, introspective calm. It feels like retreating into a peaceful, shadowed space of solitude.`,`The minor tonic ${e} grounds the harmony in a reflective, gentle mood, inviting emotional depth and quiet focus.`],subdominant:[`Stepping into ${e} opens up the sound, creating a pleasant lift and a feeling of looking out toward new horizons.`,`Moving to ${e} acts as a bridge, expanding the harmonic space and building gentle forward momentum.`],dominant:[`Progressing to ${e} introduces a powerful sense of friction and gravity. It creates a strong magnetic pull that demands resolution.`,`The dominant force of ${e} injects harmonic tension and energy, actively leading the ear toward the next stable destination.`],"modal-interchange":[`Borrowing ${e} from a parallel scale adds a touch of bittersweet nostalgia. It brings an unexpected shade of color to the narrative.`,`The borrowed quality of ${e} ${i?`from the parallel ${i} scale`:""} offers a dreamy, reflective detour, echoing familiar tones in an unfamiliar context.`]},o=r[t]||r["tonic-major"],a=(s.charCodeAt(0)+e.charCodeAt(0))%o.length;return o[a]}getVibeKeyForOption(s,e){if(e)return"modal-interchange";const t=s.split("_"),n=t[t.length-1],i=t.length>2?t[1]:"MAJOR";return n==="TONIC"||n==="MEDIANT"||n==="SUBMEDIANT"?i.toUpperCase().includes("MAJOR")?"tonic-major":"tonic-minor":n==="DOMINANT"||n==="LEADING-TONE"?"dominant":n==="SUBDOMINANT"||n==="SUPERTONIC"?"subdominant":i.toUpperCase().includes("MAJOR")?"tonic-major":"tonic-minor"}getCurrentProgressionHistory(){const s=[];for(const e of this.sections)for(const t of e.steps)t&&s.push(t.name);return s}getTargetIdByChordName(s){if(!this.chordData||!this.chordData.scales)return null;for(const[e,t]of Object.entries(this.chordData.scales))for(const[n,i]of Object.entries(t.degrees))if(i.chord_name===s)return`${t.root}_${t.type.replace(/ /g,"_")}_${n}`;return null}get borrowedChordOptions(){if(!this.activeProfile||!this.chordData||!this.chordData.scales)return[];const s=this.activeProfile.scale.split(" ")[0],e=this.activeProfile.scale,t=this.getCurrentProgressionHistory(),n=[],i=new Set;for(const[r,o]of Object.entries(this.chordData.scales))if(o.root===s&&`${o.root} ${o.type} SCALE`!==e)for(const[a,c]of Object.entries(o.degrees)){const l=c.chord_name;if(!i.has(l)){i.add(l);const h=`${o.root}_${o.type.replace(/ /g,"_")}_${a}`,u="modal-interchange",d=this.calculateDynamicTension(l,t),p=this.generateDynamicDescription(this.activeProfile.chord_name,l,u,a,`${o.root} ${o.type}`);n.push({name:l,description:p,tension:`${d}%`,vibe:u,nodeId:h,targetChordId:h})}}return n}handlePlayChordEvent(s){this.playChordNotes(s.detail.notes)}handlePreviewChordNameEvent(s){const e=this.normalizeChordName(s.detail.name),t=this.chordData.chords[e];if(t){const n={name:e,tension:"T1",mood:"0",extension:this.getActiveStepExtension(),windowStartMidi:this.getActiveStepVoicing()},i={chord_name:e,chord_notes:t.notes,voicings_listed:t.voicings_listed},r=this.getVoicedMidiNotesForStep(n,i);this.playChordNotes(r)}}getVoicedMidiNotesForStep(s,e){const t=e.chord_notes?e.chord_notes.split(" "):[];if(!t.length)return[];const n=ks[t[0]]||60,i=n%12;let r=t.map(g=>((ks[g]||60)-n+24)%12);const o=r.some(g=>g>=9),a=r.includes(3)&&r.includes(6),c=r.includes(4)&&r.includes(8),l=r.includes(3)&&!a,h=r.includes(4)&&!c,u=s&&s.extension?s.extension:"7th";let d=[];u==="triad"?d=r.filter(g=>g<9):u==="7th"?(d=[...r],o||(a?d.push(9):l?d.push(10):h?d.push(11):d.push(10))):u==="9th"?(d=[...r],o||(a?d.push(9):l?d.push(10):h?d.push(11):d.push(10)),d.includes(2)||d.push(2)):u==="6th"&&(d=r.filter(g=>g<9),d.includes(9)||d.push(9));const p=s&&s.windowStartMidi!==void 0?s.windowStartMidi:60,f=13,m=[];for(const g of d){let w=(i+g)%12;for(;w<p;)w+=12;for(;w<p+f;)m.includes(w)||m.push(w),w+=12}return m.sort((g,y)=>g-y)}getActiveStep(){if(!this.activeLocation)return null;const s=this.sections.find(e=>e.id===this.activeLocation.sectionId);return s&&s.steps[this.activeLocation.stepIndex]||null}updateActiveStep(s){if(!this.activeLocation)return;const e=this.sections.findIndex(n=>n.id===this.activeLocation.sectionId);if(e===-1)return;const t=this.sections[e].steps[this.activeLocation.stepIndex];t&&(s(t),this.sections=[...this.sections])}getActiveStepExtension(){const s=this.getActiveStep();return s&&s.extension?s.extension:"7th"}async handleChangeExtensionEvent(s){this.updateActiveStep(e=>e.extension=s.detail.extension),await this.updateComplete,this.handlePlayActiveChord()}getActiveStepVoicing(){const s=this.getActiveStep();return s&&s.windowStartMidi!==void 0?s.windowStartMidi:60}handleChangeVoicingWindowEvent(s){this.updateActiveStep(e=>e.windowStartMidi=s.detail.windowStartMidi)}handlePlayActiveChord(){const s=this.getActiveStep();if(s&&this.activeProfile){const e=this.getVoicedMidiNotesForStep(s,this.activeProfile);this.playChordNotes(e)}}handleSelectNextChord(s){const e=s.detail.option;let t=null,n=e.nodeId;if(n&&(t=this.resolveProfile(n)),t||(n=this.getTargetIdByChordName(this.normalizeChordName(e.name))||"",n&&(t=this.resolveProfile(n))),t){this.activeProfile=t;const i={name:t.chord_name,tension:e.tension,mood:e.vibe,extension:"7th",windowStartMidi:60,targetChordId:n,nodeId:n},r=this.activeLocation?this.sections.findIndex(a=>a.id===this.activeLocation.sectionId):-1;if(r!==-1){const a=this.sections[r],c=this.activeLocation.stepIndex+1;c<a.steps.length?(a.steps[c]===null?a.steps[c]=i:a.steps.splice(c,0,i),this.activeLocation={sectionId:a.id,stepIndex:c}):(a.steps.push(i),this.activeLocation={sectionId:a.id,stepIndex:a.steps.length-1}),this.sections=[...this.sections]}else if(this.sections.length>0){const a=this.sections[this.sections.length-1];a.steps.push(i),this.activeLocation={sectionId:a.id,stepIndex:a.steps.length-1},this.sections=[...this.sections]}const o=this.getVoicedMidiNotesForStep(i,t);this.playChordNotes(o),this.requestUpdate()}}handleSelectStep(s){const e=s.detail;if(!e){this.activeLocation=null;return}const t=this.sections.find(i=>i.id===e.sectionId);if(!t)return;const n=t.steps[e.index];if(n){let i=null,r=n.nodeId||n.targetChordId||n.target_id;if(r&&(i=this.resolveProfile(r)),i||(r=this.getTargetIdByChordName(n.name)||"",r&&(i=this.resolveProfile(r),n.nodeId=r,n.targetChordId=r)),i){this.activeProfile=i,this.activeLocation={sectionId:t.id,stepIndex:e.index};const o=this.getVoicedMidiNotesForStep(n,i);this.playChordNotes(o)}}else this.activeLocation={sectionId:t.id,stepIndex:e.index}}handleHumanPreview(s){this.humanState=s.detail;const e=this.getActiveStep();if(e&&this.activeProfile){const t=this.getVoicedMidiNotesForStep(e,this.activeProfile);this.playChordNotes(t)}}handleRemoveStep(s){if(this.sections.length>0&&this.sections[0].id===s.detail.sectionId&&s.detail.index===0)return;const e=this.sections.findIndex(o=>o.id===s.detail.sectionId);if(e===-1)return;const t=this.sections[e],n=[...t.steps],i=s.detail.index;if(n[i]===null||i===n.length-1)for(n.splice(i,1);n.length>0&&n[n.length-1]===null;)n.pop();else n[i]=null;if(t.steps=n,this.sections=[...this.sections],this.sections.every(o=>o.steps.every(a=>a===null))){this.activeProfile=null,this.activeLocation=null,this.stopProgressionPlayback();return}let r=-1;for(let o=Math.min(i-1,t.steps.length-1);o>=0;o--)if(t.steps[o]!==null){r=o;break}if(r===-1){for(let o=i+1;o<t.steps.length;o++)if(t.steps[o]!==null){r=o;break}}if(r!==-1){const o=t.steps[r];let a=null,c=o.nodeId||o.targetChordId||o.target_id;c&&(a=this.resolveProfile(c)),a||(c=this.getTargetIdByChordName(o.name)||"",c&&(a=this.resolveProfile(c),o.nodeId=c,o.targetChordId=c)),this.activeProfile=a||null,this.activeLocation={sectionId:t.id,stepIndex:r}}else this.activeProfile=null,this.activeLocation=null}handleClearTimeline(){this.sections=[],this.activeProfile=null,this.activeLocation=null,this.stopProgressionPlayback()}handleAddSection(){const s={id:Math.random().toString(36).substr(2,9),name:`Section ${this.sections.length+1}`,steps:[null]};this.sections=[...this.sections,s],this.activeLocation={sectionId:s.id,stepIndex:0}}handleDuplicateSection(s){const e=this.sections.findIndex(r=>r.id===s.detail.sectionId);if(e===-1)return;const t=this.sections[e],n=t.steps.map(r=>r?{...r}:null),i={id:Math.random().toString(36).substr(2,9),name:`${t.name} (Copy)`,steps:n};this.sections.splice(e+1,0,i),this.sections=[...this.sections],this.activeLocation={sectionId:i.id,stepIndex:0}}handleDeleteSection(s){this.sections=this.sections.filter(e=>e.id!==s.detail.sectionId),this.sections.length===0?this.handleClearTimeline():this.activeLocation?.sectionId===s.detail.sectionId&&(this.activeLocation={sectionId:this.sections[0].id,stepIndex:0})}handleRenameSection(s){const e=this.sections.find(t=>t.id===s.detail.sectionId);e&&(e.name=s.detail.name,this.sections=[...this.sections])}handleOpenProjectModal(){this.projects=ke.getProjects(),this.showProjectModal=!0}handleCloseProjectModal(){this.showProjectModal=!1}handleSaveProject(){if(this.sections.length===0)return;let s=this.currentProjectId;const e=this.projects.find(n=>n.name.toLowerCase()===this.currentProjectName.toLowerCase()&&n.id!==s);if(e){if(!confirm(`A project named "${this.currentProjectName}" already exists. Overwrite it?`))return;s=e.id}else if(s){const n=this.projects.find(i=>i.id===s);if(n&&!confirm(`Overwrite loaded project "${n.name}"?`))return}s||(s=Math.random().toString(36).substr(2,9)),this.currentProjectId=s;const t={id:s,name:this.currentProjectName,lastModified:Date.now(),sections:this.sections,setupStep:this.setupStep,selectedScaleType:this.selectedScaleType};ke.saveProject(t),this.projects=ke.getProjects(),this.syncProjectsToCloud()}handleLoadProject(s){if(this.stopProgressionPlayback(),this.currentProjectId=s.id,this.currentProjectName=s.name,this.setupStep=s.setupStep,this.selectedScaleType=s.selectedScaleType,this.sections=s.sections,this.sections.length>0){this.activeLocation={sectionId:this.sections[0].id,stepIndex:0};const e=this.sections[0].steps.find(t=>t!==null);if(e){let t=null,n=e.nodeId||e.targetChordId||e.target_id;n&&(t=this.resolveProfile(n)),t||(n=this.getTargetIdByChordName(e.name)||"",n&&(t=this.resolveProfile(n),e.nodeId=n,e.targetChordId=n)),t&&(this.activeProfile=t)}}else this.activeLocation=null,this.activeProfile=null;this.showProjectModal=!1}handleDeleteProject(s){ke.deleteProject(s),this.projects=ke.getProjects(),this.syncProjectsToCloud(),this.currentProjectId===s&&(this.currentProjectId=null)}handleExportProject(s){ke.exportProjectFile(s)}handleImportProject(s){const e=s.target;e.files&&e.files.length>0&&ke.importProjectFile(e.files[0]).then(t=>{ke.saveProject(t),this.projects=ke.getProjects(),this.syncProjectsToCloud()}).catch(t=>alert(t.message)),e.value=""}togglePlayProgression(){this.isPlaying?this.stopProgressionPlayback():this.startProgressionPlayback()}startProgressionPlayback(){if(this.sections.length===0)return;this.isPlaying=!0;let s=0,e=0;this.activeLocation&&(s=this.sections.findIndex(n=>n.id===this.activeLocation.sectionId),s!==-1?e=this.activeLocation.stepIndex:s=0);const t=()=>{if(!this.isPlaying)return;let n=this.sections[s],i=n?n.steps[e]:null;for(;!i&&s<this.sections.length;)e++,e>=n.steps.length?(s++,e=0,s<this.sections.length?(n=this.sections[s],i=n.steps[e]):i=null):i=n.steps[e];if(!i){this.isLooping&&this.sections.some(a=>a.steps.some(c=>c!==null))?(s=0,e=0,this.playTimeoutId=setTimeout(t,100)):this.isPlaying=!1;return}let r=null,o=i.nodeId||i.targetChordId||i.target_id;if(o&&(r=this.resolveProfile(o)),r||(o=this.getTargetIdByChordName(i.name)||"",o&&(r=this.resolveProfile(o),i.nodeId=o,i.targetChordId=o)),r){this.activeProfile=r,this.activeLocation={sectionId:n.id,stepIndex:e};const a=this.getVoicedMidiNotesForStep(i,r);this.playChordNotes(a)}if(e++,e>=n.steps.length&&(s++,e=0),s>=this.sections.length){this.isLooping&&this.sections.some(a=>a.steps.some(c=>c!==null))?(s=0,e=0,this.playTimeoutId=setTimeout(t,1500)):this.playTimeoutId=setTimeout(()=>{this.stopProgressionPlayback()},1500);return}this.playTimeoutId=setTimeout(t,1500)};t()}stopProgressionPlayback(){this.isPlaying=!1,this.playTimeoutId&&(clearTimeout(this.playTimeoutId),this.playTimeoutId=null)}handleToggleLoop(){this.isLooping=!this.isLooping}toggleCompactMode(){this.compactMode=!this.compactMode,localStorage.setItem("chord-voyager-compact-mode",this.compactMode.toString())}toggleLightMode(){this.lightMode=!this.lightMode,localStorage.setItem("chord-voyager-light-mode",this.lightMode.toString()),document.documentElement.classList.toggle("light-theme",this.lightMode)}handleScaleTypeSelect(s){this.selectedScaleType=s,this.setupStep="tonic"}renderScaleCard(s){return D`
      <div class="scale-card" @click="${()=>this.handleScaleTypeSelect(s.id)}">
        <div class="scale-card-header">
          <div class="scale-emoji">${s.emoji}</div>
          <div class="scale-header-text">
            <div class="scale-name">${s.title}</div>
            <div class="scale-subtitle">${s.subtitle}</div>
          </div>
        </div>
        ${this.compactMode?"":D`<div class="scale-desc">${s.desc}</div>`}
      </div>
    `}handleKeySelect(s){if(!this.selectedScaleType)return;const e=`${s}_${this.selectedScaleType.replace(/ /g,"_")}`,t=`${e}_TONIC`,n=this.resolveProfile(t);if(n){this.activeProfile=n;const i=this.selectedScaleType==="MAJOR"||this.selectedScaleType==="MIXOLYDIAN"?"tonic-major":"tonic-minor",r={name:n.chord_name,tension:"10%",mood:i,extension:"7th",windowStartMidi:60,targetChordId:t,nodeId:t},o={id:Math.random().toString(36).substr(2,9),name:"Verse 1",steps:[r]};this.sections=[o],this.activeLocation={sectionId:o.id,stepIndex:0},this.setupStep="scale"}else console.warn(`Could not find profile for scale: ${e}`)}render(){return this.isAuthenticated?D`
      <div class="app-layout">
        
        <!-- Header Branding Section -->
        <header class="glass-panel" style="padding: 16px 24px;">
          <div class="branding">
            <div class="brand-title">CHORD VOYAGER</div>
            <div class="brand-sub">DYNAMIC CHORD STUDIO</div>
          </div>
          
          <!-- Header Controls -->
          <div class="header-controls">
            <div class="auth-container">
              <div class="auth-info">
                <span class="email-text">${this.authUserEmail}</span>
                <span style="color: var(--accent-terracotta); cursor: pointer; text-decoration: underline; margin-top: 2px;" @click=${this.handleLogout}>Sign Out</span>
              </div>
              <div class="user-avatar">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
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
                  ${this.lightMode?dt`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`:dt`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`}
                </svg>
              </button>
              <button 
                class="btn-compact-toggle ${this.compactMode?"active":""}" 
                @click=${this.toggleCompactMode}
                title="Toggle Compact Mode (Hide verbose text)"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${this.compactMode?dt`
                        <polyline points="4 7 4 4 20 4 20 7" opacity="0.4"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20" opacity="0.4"></line>
                        <line x1="12" y1="4" x2="12" y2="20" opacity="0.4"></line>
                        <line x1="3" y1="3" x2="21" y2="21"></line>
                      `:dt`
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
        
        ${this.activeProfile===null?D`
          <div class="setup-view glass-panel">
            
            ${this.setupStep==="scale"?D`
              <div class="setup-title">Start your journey</div>
              ${this.compactMode?"":D`
                <div class="setup-desc">
                  Select an emotional scale landscape to begin writing. These define the general moods of transitions and determine your composition's starting pitch contexts.
                </div>
              `}
              
              <div class="phases-container">
                <!-- Row 1 / Phase 1 (Bright / Day Navigation) -->
                <div class="phase-section">
                  <div class="phase-header">Phase 1: Bright / Day Navigation</div>
                  <div class="scale-grid row-1">
                    ${Cs.filter(s=>s.phase===1).map(s=>this.renderScaleCard(s))}
                  </div>
                </div>

                <!-- Row 2 / Phase 2 (Deepening Waters / Transition) -->
                <div class="phase-section">
                  <div class="phase-header">Phase 2: Deepening Waters / Transition</div>
                  <div class="scale-grid row-2">
                    ${Cs.filter(s=>s.phase===2).map(s=>this.renderScaleCard(s))}
                  </div>
                </div>

                <!-- Row 3 / Phase 3 (Dark / Night Exploration & Turbulence) -->
                <div class="phase-section">
                  <div class="phase-header">Phase 3: Dark / Night Exploration & Turbulence</div>
                  <div class="scale-grid row-3">
                    ${Cs.filter(s=>s.phase===3).map(s=>this.renderScaleCard(s))}
                  </div>
                </div>
              </div>
            `:D`
              <!-- Step 2: Choose Tonic Chord Key -->
              <button class="btn-back" @click="${()=>this.setupStep="scale"}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg> Back to Scales
              </button>
              
              <div class="setup-title" style="margin-top: 10px;">Choose A ${this.selectedScaleType} Tonic Key</div>
              ${this.compactMode?"":D`
                <div class="setup-desc">
                  Select the starting tonic minor or major key root. These set the target registers and vocals limits for your piece.
                </div>
              `}
              
              <div class="key-selector-container">
                <div class="key-grid">
                  ${(this.selectedScaleType==="MAJOR"||this.selectedScaleType==="MIXOLYDIAN"?lp:hp).map(s=>D`
                    <button class="btn-key" @click="${()=>this.handleKeySelect(s)}">
                      ${s} ${this.selectedScaleType==="MAJOR"||this.selectedScaleType==="MIXOLYDIAN"?"Maj":"Min"}
                    </button>
                  `)}
                </div>
              </div>
            `}
            
          </div>
        `:D`
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
            <div class="workspace-grid glass-panel" style="padding: 0; display: flex; flex-direction: column;">
              
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
                ></chord-profile-card>
              </div>
              
              <!-- Bottom portion: Chord Voyager options list -->
              <div class="options-pane">
                <div class="options-tabs">
                  <button 
                    class="tab-btn ${this.activeOptionsTab==="diatonic"?"active":""}" 
                    @click=${()=>this.activeOptionsTab="diatonic"}
                  >
                    Charted Waters
                  </button>
                  <button 
                    class="tab-btn ${this.activeOptionsTab==="borrowed"?"active":""}" 
                    @click=${()=>this.activeOptionsTab="borrowed"}
                  >
                    Uncharted Waters
                  </button>
                </div>
                
                ${this.activeOptionsTab==="diatonic"?D`
                  <next-options-table
                    .options=${this.activeProfile.next_chord_options}
                    .compactMode=${this.compactMode}
                    @select-next-chord=${this.handleSelectNextChord}
                    @preview-chord-name="${this.handlePreviewChordNameEvent}"
                  ></next-options-table>
                `:D`
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
      </div>
    `:D`
        <div class="app-layout" style="display: flex; align-items: center; justify-content: center; min-height: 100vh;">
          <div class="glass-panel" style="padding: 40px; max-width: 400px; text-align: center;">
            <div class="branding" style="margin-bottom: 30px;">
              <div class="brand-title" style="font-size: 2rem;">CHORD VOYAGER</div>
              <div class="brand-sub">Modular Chord Studio</div>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem;">
              Please sign in to access your Chord Voyager workspace.
            </p>
            
            <button 
              @click=${this.requestDriveAccess} 
              style="background: var(--accent-blue); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; width: 100%; max-width: 280px;"
            >
              Sign in with Google
            </button>
            
            ${this.authError?D`
              <div style="color: var(--accent-terracotta); font-size: 0.85rem; margin-top: 16px; font-weight: 600;">
                ${this.authError}
              </div>
            `:""}
          </div>
        </div>
      `}renderProjectModal(){return D`
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

            ${this.driveService.hasAccessToken()?"":D`
              <div style="background: rgba(43, 107, 187, 0.15); border: 1px solid rgba(43, 107, 187, 0.3); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--accent-blue); font-size: 0.85rem;">Connect Google Drive to load your cloud projects on this device.</span>
                <button @click=${this.requestDriveAccess} style="background: var(--accent-blue); color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">Connect</button>
              </div>
            `}

            ${this.projects.length===0?D`
              <div style="text-align: center; padding: 30px; color: var(--text-muted); font-style: italic; background: rgba(0,0,0,0.1); border-radius: 8px;">
                No saved projects found.
              </div>
            `:D`
              <div style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto;">
                ${this.projects.sort((s,e)=>e.lastModified-s.lastModified).map(s=>D`
                  <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px 16px; border-radius: 8px; border: 1px solid ${this.currentProjectId===s.id?"var(--accent-gold)":"transparent"};">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-weight: bold; font-family: var(--font-heading); color: var(--text-primary);">
                        ${s.name}
                        ${s.syncedToCloud?D`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(43, 107, 187, 0.2); color: var(--accent-blue); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">CLOUD</span>`:D`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(255, 255, 255, 0.1); color: var(--text-muted); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">LOCAL</span>`}
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
    `}handleOpenShareModal(){this.showShareModal=!0,this.shareModalToast=""}handleCloseShareModal(){this.showShareModal=!1}getShareableChordName(s){if(!s)return"";const e=s.name.match(/^([A-G](?:#|b|x)?)(MAJ|MIN|DIM|AUG|XDIM)$/i);if(!e)return s.name;let t=e[1],n=e[2].toUpperCase();n==="XDIM"&&(t=t+"x",n="DIM"),t={Cx:"D",CX:"D",Dx:"E",DX:"E",Fx:"G",FX:"G",Gx:"A",GX:"A",Ax:"B",AX:"B","B#":"C","E#":"F"}[t]||t;const r=s.extension||"7th";if(n==="MAJ"){if(r==="triad")return t;if(r==="7th")return t+"maj7";if(r==="9th")return t+"maj9";if(r==="6th")return t+"6"}if(n==="MIN"){if(r==="triad")return t+"m";if(r==="7th")return t+"m7";if(r==="9th")return t+"m9";if(r==="6th")return t+"m6"}if(n==="DIM"){if(r==="triad")return t+"dim";if(r==="7th")return t+"m7b5";if(r==="9th")return t+"m9b5";if(r==="6th")return t+"dim6"}if(n==="AUG"){if(r==="triad")return t+"aug";if(r==="7th")return t+"7#5";if(r==="9th")return t+"9#5";if(r==="6th")return t+"aug6"}return s.name}copyShareLink(s){let e=this.selectedShareDevice;s&&typeof s=="string"&&(e=s,this.selectedShareDevice=s);const t=this.sections.flatMap(r=>r.steps).filter(r=>r!==null).map(r=>this.getShareableChordName(r)).filter(Boolean);if(t.length===0){this.shareModalToast="Error: Add at least one chord to your progression first!";return}const i=`${e==="m8"?"https://warmsynths.github.io/hypersyn-chord-helper/":"https://warmsynths.github.io/circuit-chords/"}?p=${t.join("+")}`;try{navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(i).then(()=>{this.shareModalToast="Success: Shareable link copied to clipboard!",setTimeout(()=>{this.shareModalToast.startsWith("Success")&&(this.shareModalToast="")},3e3)}).catch(r=>{console.warn("navigator.clipboard.writeText rejected, trying fallback:",r),this.fallbackCopy(i)}):this.fallbackCopy(i)}catch(r){console.warn("navigator.clipboard error, trying fallback:",r),this.fallbackCopy(i)}}fallbackCopy(s){try{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.focus(),e.select();const t=document.execCommand("copy");document.body.removeChild(e),t?(this.shareModalToast="Success: Shareable link copied to clipboard!",setTimeout(()=>{this.shareModalToast.startsWith("Success")&&(this.shareModalToast="")},3e3)):this.shareModalToast="Failed to copy link automatically. Please select and copy below."}catch(e){this.shareModalToast="Failed to copy link automatically. Please select and copy below.",console.error("Fallback copy failed:",e)}}renderShareModal(){const s=this.sections.flatMap(n=>n.steps).filter(n=>n!==null).map(n=>this.getShareableChordName(n)).filter(Boolean),e=this.selectedShareDevice==="m8"?"https://warmsynths.github.io/hypersyn-chord-helper/":"https://warmsynths.github.io/circuit-chords/",t=s.length>0?`${e}?p=${s.join("+")}`:"";return D`
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

          ${this.shareModalToast?D`
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
    `}};Q.styles=vn`
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
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
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
  `;te([X()],Q.prototype,"chordData",2);te([X()],Q.prototype,"activeProfile",2);te([X()],Q.prototype,"sections",2);te([X()],Q.prototype,"activeLocation",2);te([X()],Q.prototype,"isPlaying",2);te([X()],Q.prototype,"isLooping",2);te([X()],Q.prototype,"timelineCollapsed",2);te([X()],Q.prototype,"compactMode",2);te([X()],Q.prototype,"lightMode",2);te([X()],Q.prototype,"projects",2);te([X()],Q.prototype,"currentProjectId",2);te([X()],Q.prototype,"currentProjectName",2);te([X()],Q.prototype,"showProjectModal",2);te([X()],Q.prototype,"showShareModal",2);te([X()],Q.prototype,"shareModalToast",2);te([X()],Q.prototype,"selectedShareDevice",2);te([X()],Q.prototype,"isAuthenticated",2);te([X()],Q.prototype,"authUserEmail",2);te([X()],Q.prototype,"authError",2);te([X()],Q.prototype,"activeOptionsTab",2);te([X()],Q.prototype,"humanState",2);te([X()],Q.prototype,"previewVoicing",2);te([X()],Q.prototype,"isDriveSyncing",2);te([X()],Q.prototype,"setupStep",2);te([X()],Q.prototype,"selectedScaleType",2);Q=te([_n("chord-voyager-app")],Q);
