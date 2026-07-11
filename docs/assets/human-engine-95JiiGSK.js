var V=globalThis,z=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),G=new WeakMap,ae=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(z&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&G.set(t,e))}return e}toString(){return this.cssText}},pe=e=>new ae(typeof e=="string"?e:e+"",void 0,D),de=(e,...t)=>new ae(e.length===1?e[0]:t.reduce((i,r,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[a+1],e[0]),e,D),ce=(e,t)=>{if(z)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of t){let r=document.createElement("style"),a=V.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}},W=z?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(let r of t.cssRules)i+=r.cssText;return pe(i)})(e):e,{is:ue,defineProperty:ge,getOwnPropertyDescriptor:me,getOwnPropertyNames:ve,getOwnPropertySymbols:be,getPrototypeOf:fe}=Object,N=globalThis,J=N.trustedTypes,ye=J?J.emptyScript:"",xe=N.reactiveElementPolyfillSupport,E=(e,t)=>e,P={toAttribute(e,t){switch(t){case Boolean:e=e?ye:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},j=(e,t)=>!ue(e,t),K={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=K){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&ge(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:a}=me(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let s=r?.call(this);a?.call(this,o),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??K}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;let e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){let t=this.properties,i=[...ve(t),...be(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(W(r))}else e!==void 0&&t.push(W(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute===void 0?P:i.converter).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let a=i.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute===void 0?P:a.converter;this._$Em=r;let s=o.fromAttribute(t,a.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(e!==void 0){let o=this.constructor;if(r===!1&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??j)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,a]of i){let{wrapped:o}=a,s=this[r];o!==!0||this._$AL.has(r)||s===void 0||this.C(r,void 0,a,s)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[E("elementProperties")]=new Map,w[E("finalized")]=new Map,xe?.({ReactiveElement:w}),(N.reactiveElementVersions??=[]).push("2.1.2");var B=globalThis,Y=e=>e,I=B.trustedTypes,Z=I?I.createPolicy("lit-html",{createHTML:e=>e}):void 0,re="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,oe="?"+f,$e=`<${oe}>`,$=document,k=()=>$.createComment(""),M=e=>e===null||typeof e!="object"&&typeof e!="function",q=Array.isArray,we=e=>q(e)||typeof e?.[Symbol.iterator]=="function",U=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,X=/>/g,y=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ee=/'/g,te=/"/g,se=/^(?:script|style|textarea|title)$/i,p=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),_=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ie=new WeakMap,x=$.createTreeWalker($,129);function ne(e,t){if(!q(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Z===void 0?t:Z.createHTML(t)}var _e=(e,t)=>{let i=e.length-1,r=[],a,o=t===2?"<svg>":t===3?"<math>":"",s=A;for(let n=0;n<i;n++){let l=e[n],R,m,h=-1,v=0;for(;v<l.length&&(s.lastIndex=v,m=s.exec(l),m!==null);)v=s.lastIndex,s===A?m[1]==="!--"?s=Q:m[1]===void 0?m[2]===void 0?m[3]!==void 0&&(s=y):(se.test(m[2])&&(a=RegExp("</"+m[2],"g")),s=y):s=X:s===y?m[0]===">"?(s=a??A,h=-1):m[1]===void 0?h=-2:(h=s.lastIndex-m[2].length,R=m[1],s=m[3]===void 0?y:m[3]==='"'?te:ee):s===te||s===ee?s=y:s===Q||s===X?s=A:(s=y,a=void 0);let b=s===y&&e[n+1].startsWith("/>")?" ":"";o+=s===A?l+$e:h>=0?(r.push(R),l.slice(0,h)+re+l.slice(h)+f+b):l+f+(h===-2?n:b)}return[ne(e,o+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},H=class le{constructor({strings:t,_$litType$:i},r){let a;this.parts=[];let o=0,s=0,n=t.length-1,l=this.parts,[R,m]=_e(t,i);if(this.el=le.createElement(R,r),x.currentNode=this.el.content,i===2||i===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=x.nextNode())!==null&&l.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(re)){let v=m[s++],b=a.getAttribute(h).split(f),T=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:T[2],strings:b,ctor:T[1]==="."?Ae:T[1]==="?"?Ee:T[1]==="@"?Ce:O}),a.removeAttribute(h)}else h.startsWith(f)&&(l.push({type:6,index:o}),a.removeAttribute(h));if(se.test(a.tagName)){let h=a.textContent.split(f),v=h.length-1;if(v>0){a.textContent=I?I.emptyScript:"";for(let b=0;b<v;b++)a.append(h[b],k()),x.nextNode(),l.push({type:2,index:++o});a.append(h[v],k())}}}else if(a.nodeType===8)if(a.data===oe)l.push({type:2,index:o});else{let h=-1;for(;(h=a.data.indexOf(f,h+1))!==-1;)l.push({type:7,index:o}),h+=f.length-1}o++}}static createElement(t,i){let r=$.createElement("template");return r.innerHTML=t,r}};function S(e,t,i=e,r){if(t===_)return t;let a=r===void 0?i._$Cl:i._$Co?.[r],o=M(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(e),a._$AT(e,i,r)),r===void 0?i._$Cl=a:(i._$Co??=[])[r]=a),a!==void 0&&(t=S(e,a._$AS(e,t.values),a,r)),t}var Se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??$).importNode(t,!0);x.currentNode=r;let a=x.nextNode(),o=0,s=0,n=i[0];for(;n!==void 0;){if(o===n.index){let l;n.type===2?l=new F(a,a.nextSibling,this,e):n.type===1?l=new n.ctor(a,n.name,n.strings,this,e):n.type===6&&(l=new ke(a,this,e)),this._$AV.push(l),n=i[++s]}o!==n?.index&&(a=x.nextNode(),o++)}return x.currentNode=$,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings===void 0?i._$AI(e[t]):(i._$AI(e,i,t),t+=i.strings.length-2)),t++}},F=class he{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,r,a){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),M(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==_&&this._(t):t._$litType$===void 0?t.nodeType===void 0?we(t)?this.k(t):this._(t):this.T(t):this.$(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:r}=t,a=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=H.createElement(ne(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(i);else{let o=new Se(a,this),s=o.u(this.options);o.p(i),this.T(s),this._$AH=o}}_$AC(t){let i=ie.get(t.strings);return i===void 0&&ie.set(t.strings,i=new H(t)),i}k(t){q(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,r,a=0;for(let o of t)a===i.length?i.push(r=new he(this.O(k()),this.O(k()),this,this.options)):r=i[a],r._$AI(o),a++;a<i.length&&(this._$AR(r&&r._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let r=Y(t).nextSibling;Y(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,r){let a=this.strings,o=!1;if(a===void 0)e=S(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==_,o&&(this._$AH=e);else{let s=e,n,l;for(e=a[0],n=0;n<a.length-1;n++)l=S(this,s[i+n],t,n),l===_&&(l=this._$AH[n]),o||=!M(l)||l!==this._$AH[n],l===g?e=g:e!==g&&(e+=(l??"")+a[n+1]),this._$AH[n]=l}o&&!r&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ae=class extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},Ee=class extends O{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},Ce=class extends O{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??g)===_)return;let i=this._$AH,r=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==g&&(i===g||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}},Me=B.litHtmlPolyfillSupport;Me?.(H,F),(B.litHtmlVersions??=[]).push("3.3.3");var Re=(e,t,i)=>{let r=i?.renderBefore??t,a=r._$litPart$;if(a===void 0){let o=i?.renderBefore??null;r._$litPart$=a=new F(t.insertBefore(k(),o),o,void 0,i??{})}return a._$AI(e),a},L=globalThis,C=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};C._$litElement$=!0,C.finalized=!0,L.litElementHydrateSupport?.({LitElement:C});var Te=L.litElementPolyfillSupport;Te?.({LitElement:C}),(L.litElementVersions??=[]).push("4.2.2");var Ve=e=>(t,i)=>{i===void 0?customElements.define(e,t):i.addInitializer(()=>{customElements.define(e,t)})},Pe={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:j},Ie=(e=Pe,t,i)=>{let{kind:r,metadata:a}=i,o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),r==="accessor"){let{name:s}=i;return{set(n){let l=t.get.call(this);t.set.call(this,n),this.requestUpdate(s,l,e,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,e,n),n}}}if(r==="setter"){let{name:s}=i;return function(n){let l=this[s];t.call(this,n),this.requestUpdate(s,l,e,!0,n)}}throw Error("Unsupported decorator location: "+r)};function u(e){return(t,i)=>typeof i=="object"?Ie(e,t,i):((r,a,o)=>{let s=a.hasOwnProperty(o);return a.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(a,o):void 0})(e,t,i)}function c(e,t,i,r){var a=arguments.length,o=a<3?t:r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(o=(a<3?s(o):a>3?s(t,i,o):s(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o}var d=class extends C{constructor(...e){super(...e),this.heading="Human Engine",this.chordSequence="Cmaj7 Dm7 G7 Cmaj",this.hideInput=!1,this.spread=.6,this.duration=1,this.minVelocity=60,this.maxVelocity=110,this.humanVariance=.6,this.microTiming=.3,this.bpm=80,this.arpMode="off",this.arpRate="1/16",this.arpRange=1,this.debugExpanded=!0,this.arpExpanded=!0,this.showInfo=!1,this.mode="advanced",this.humanSlider=.5}static get styles(){return de`
    :host {
      /* Theme Tokens - Host applications can override these CSS custom properties */
      --hp-bg: var(--human-bg, #1a1a24);
      --hp-surface: var(--human-surface, #242530);
      --hp-border: var(--human-border, #3b3c4f);
      --hp-text-primary: var(--human-text-primary, #f5f5f7);
      --hp-text-secondary: var(--human-text-secondary, #a3a6be);
      --hp-accent: var(--human-accent, #ff9f43);
      --hp-accent-hover: var(--human-accent-hover, #ffb067);
      --hp-radius: var(--human-radius, 12px);
      --hp-font-family: var(--human-font, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);

      display: block;
      width: 100%;
      min-width: 360px;
      max-width: 400px;
      background: var(--hp-bg);
      color: var(--hp-text-primary);
      font-family: var(--hp-font-family);
      border-radius: var(--hp-radius);
      border: 1px solid var(--hp-border);
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    * {
      box-sizing: border-box;
    }

    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--hp-border);
      background: var(--hp-surface);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .panel-header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .info-toggle-btn {
      background: transparent;
      border: 1px solid var(--hp-border);
      color: var(--hp-text-secondary);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.2s;
      padding: 0;
      outline: none;
    }
    .info-toggle-btn:hover {
      color: var(--hp-accent);
      border-color: var(--hp-accent);
    }
    .info-toggle-btn.active {
      background: var(--hp-accent);
      color: #ffffff;
      border-color: var(--hp-accent);
    }

    .panel-subheader {
      padding: 12px 20px;
      background: rgba(0, 0, 0, 0.15);
      border-bottom: 1px solid var(--hp-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .mode-tabs {
      display: flex;
      background: var(--hp-surface);
      padding: 2px;
      border-radius: 6px;
      border: 1px solid var(--hp-border);
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--hp-text-secondary);
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--hp-text-primary);
    }

    .tab-btn.active {
      background: var(--hp-accent);
      color: #ffffff;
    }

    .reset-btn {
      background: transparent;
      border: 1px solid var(--hp-border);
      color: var(--hp-text-secondary);
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .reset-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--hp-text-primary);
      border-color: var(--hp-text-secondary);
    }

    .panel-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .group-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-bottom: 1px solid var(--hp-border);
      padding-bottom: 8px;
      gap: 12px;
    }

    .group-header-row.collapsible {
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      margin-bottom: -4px;
      transition: background 0.15s;
    }

    .group-header-row.collapsible:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--hp-text-secondary);
      font-weight: 700;
      margin: 0;
    }

    .group-explanation {
      font-size: 0.7rem;
      color: var(--hp-text-secondary);
      opacity: 0.75;
      font-style: italic;
      font-weight: normal;
    }

    .collapse-chevron {
      margin-left: auto;
      color: var(--hp-text-secondary);
      opacity: 0.6;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
    }

    .collapse-chevron.open {
      transform: rotate(0deg);
    }

    .collapse-chevron.closed {
      transform: rotate(-90deg);
    }

    .collapsible-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: hidden;
      transition: opacity 0.2s ease;
    }

    .collapsible-body.hidden {
      display: none;
    }

    .setting-explanation {
      font-size: 0.72rem;
      color: var(--hp-text-secondary);
      opacity: 0.85;
      line-height: 1.35;
      margin-top: 4px;
      padding-left: 2px;
    }

    .control-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 0.875rem;
    }

    .control-label {
      color: var(--hp-text-primary);
      font-weight: 500;
    }

    .control-value {
      color: var(--hp-accent);
      font-variant-numeric: tabular-nums;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(59, 130, 246, 0.1); /* Subtle accent bg */
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Text Input Styling */
    input[type="text"] {
      width: 100%;
      background: var(--hp-surface);
      border: 1px solid var(--hp-border);
      color: var(--hp-text-primary);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: var(--hp-accent);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    input[type="text"]::placeholder {
      color: var(--hp-text-secondary);
      opacity: 0.6;
    }

    /* Select Dropdown Styling */
    select {
      width: 100%;
      background: var(--hp-surface);
      border: 1px solid var(--hp-border);
      color: var(--hp-text-primary);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a6be' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      cursor: pointer;
    }

    select:focus {
      outline: none;
      border-color: var(--hp-accent);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    /* Disabled State styling */
    select:disabled,
    input[type="range"]:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    input[type="range"]:disabled::-webkit-slider-thumb {
      cursor: not-allowed;
      background: var(--hp-text-secondary);
      transform: none;
    }

    input[type="range"]:disabled::-moz-range-thumb {
      cursor: not-allowed;
      background: var(--hp-text-secondary);
      transform: none;
    }

    /* Range Slider Styling */
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      padding: 8px 0; /* Increase touch target area */
      cursor: pointer;
    }

    input[type="range"]:focus {
      outline: none;
    }

    /* Webkit Slider Track */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Webkit Slider Thumb */
    input[type="range"]::-webkit-slider-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      -webkit-appearance: none;
      margin-top: -7px;
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    /* Firefox Slider Track */
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Firefox Slider Thumb */
    input[type="range"]::-moz-range-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-moz-range-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-moz-range-thumb {
      transform: scale(0.95);
    }

    .preview-btn {
      width: 100%;
      background: var(--hp-accent);
      color: #ffffff;
      border: none;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .preview-btn:hover {
      background: var(--hp-accent-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    }

    .preview-btn:active {
      transform: translateY(1px);
      box-shadow: 0 1px 5px rgba(59, 130, 246, 0.3);
    }

    .preview-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `}connectedCallback(){super.connectedCallback(),this.loadFromLocalStorage()}loadFromLocalStorage(){try{let e=localStorage.getItem("human-panel-state");if(e){let t=JSON.parse(e);t.chordSequence!==void 0&&(this.chordSequence=t.chordSequence),t.spread!==void 0&&(this.spread=t.spread),t.duration!==void 0&&(this.duration=t.duration),t.minVelocity!==void 0&&(this.minVelocity=t.minVelocity),t.maxVelocity!==void 0&&(this.maxVelocity=t.maxVelocity),t.humanVariance!==void 0&&(this.humanVariance=t.humanVariance),t.microTiming!==void 0&&(this.microTiming=t.microTiming),t.bpm!==void 0&&(this.bpm=t.bpm),t.arpMode!==void 0&&(this.arpMode=t.arpMode),t.arpRate!==void 0&&(this.arpRate=t.arpRate),t.arpRange!==void 0&&(this.arpRange=t.arpRange),t.mode!==void 0&&(this.mode=t.mode),t.humanSlider!==void 0&&(this.humanSlider=t.humanSlider),t.debugExpanded!==void 0&&(this.debugExpanded=t.debugExpanded)}}catch(e){console.error("Error loading state from localStorage:",e)}}saveToLocalStorage(){try{let e={chordSequence:this.chordSequence,spread:this.spread,duration:this.duration,minVelocity:this.minVelocity,maxVelocity:this.maxVelocity,humanVariance:this.humanVariance,microTiming:this.microTiming,bpm:this.bpm,arpMode:this.arpMode,arpRate:this.arpRate,arpRange:this.arpRange,mode:this.mode,humanSlider:this.humanSlider,debugExpanded:this.debugExpanded};localStorage.setItem("human-panel-state",JSON.stringify(e))}catch(e){console.error("Error saving state to localStorage:",e)}}emitChange(){this.saveToLocalStorage();let e={chordSequence:this.chordSequence,spread:this.spread,duration:this.duration,minVelocity:this.minVelocity,maxVelocity:this.maxVelocity,humanVariance:this.humanVariance,microTiming:this.microTiming,bpm:this.bpm,arpMode:this.arpMode,arpRate:this.arpRate,arpRange:this.arpRange};this.dispatchEvent(new CustomEvent("human-change",{detail:e,bubbles:!0,composed:!0}))}toggleInfo(){this.showInfo=!this.showInfo}handleTextChange(e){let t=e.target;this.chordSequence=t.value,this.emitChange()}handleNumberChange(e,t,i=!1){let r=t.target,a=i?parseInt(r.value,10):parseFloat(r.value);this[e]=a,e==="minVelocity"&&this.minVelocity>this.maxVelocity?this.maxVelocity=this.minVelocity:e==="maxVelocity"&&this.maxVelocity<this.minVelocity&&(this.minVelocity=this.maxVelocity),this.emitChange()}handleBasicSliderChange(e){let t=e.target,i=parseFloat(t.value);this.humanSlider=i,this.spread=parseFloat((i**1.2*1.5).toFixed(2)),this.humanVariance=parseFloat((i**1.1*1).toFixed(2)),this.microTiming=parseFloat((i**1.5*1.5).toFixed(2)),this.emitChange()}setMode(e){if(this.mode=e,e==="basic"){let t=(this.spread/1.5+this.humanVariance/1+this.microTiming/1.5)/3;this.humanSlider=Math.max(0,Math.min(1,t))}this.emitChange()}handleReset(){this.chordSequence="Cmaj7 Dm7 G7 Cmaj",this.spread=.6,this.duration=1,this.minVelocity=60,this.maxVelocity=110,this.humanVariance=.6,this.microTiming=.3,this.bpm=80,this.arpMode="off",this.arpRate="1/16",this.arpRange=1,this.mode="advanced",this.humanSlider=.5,this.debugExpanded=!0,this.emitChange()}handleBpmChange(e){let t=e.target;this.bpm=Math.max(40,Math.min(240,parseInt(t.value,10)||80)),this.emitChange()}handleArpModeChange(e){let t=e.target;this.arpMode=t.value,this.emitChange()}handleArpRateChange(e){let t=e.target;this.arpRate=t.value,this.emitChange()}handleArpRangeChange(e){let t=e.target;this.arpRange=parseInt(t.value,10),this.emitChange()}handlePreview(){let e={chordSequence:this.chordSequence,spread:this.spread,duration:this.duration,minVelocity:this.minVelocity,maxVelocity:this.maxVelocity,humanVariance:this.humanVariance,microTiming:this.microTiming,bpm:this.bpm,arpMode:this.arpMode,arpRate:this.arpRate,arpRange:this.arpRange};this.dispatchEvent(new CustomEvent("human-preview",{detail:e,bubbles:!0,composed:!0}))}toggleDebug(){this.debugExpanded=!this.debugExpanded,this.saveToLocalStorage()}render(){return p`
      <div class="panel-header">
        <h2>${this.heading}</h2>
        <button 
          class="info-toggle-btn ${this.showInfo?"active":""}" 
          @click=${this.toggleInfo} 
          title="Toggle explanations"
          aria-label="Toggle explanations"
        >
          ?
        </button>
      </div>

      <div class="panel-subheader">
        <div class="mode-tabs">
          <button 
            class="tab-btn ${this.mode==="basic"?"active":""}" 
            @click=${()=>this.setMode("basic")}
          >
            Basic
          </button>
          <button 
            class="tab-btn ${this.mode==="advanced"?"active":""}" 
            @click=${()=>this.setMode("advanced")}
          >
            Advanced
          </button>
        </div>
        <button class="reset-btn" @click=${this.handleReset} title="Reset to default settings">
          Reset
        </button>
      </div>

      <div class="panel-content">
        
        <!-- Section: Debug -->
        <div class="control-group">
          <div class="group-header-row" @click=${this.toggleDebug} style="cursor: pointer; user-select: none;">
            <h3 class="group-title" style="display: flex; align-items: center; gap: 8px;">
              <span>debug</span>
              ${this.showInfo?p`
                <span class="group-explanation" style="text-transform: none; font-weight: normal;">(test tools)</span>
              `:""}
            </h3>
            <span style="font-size: 0.65rem; color: var(--hp-text-secondary);">${this.debugExpanded?"▼":"▶"}</span>
          </div>
          
          ${this.debugExpanded?p`
            ${this.hideInput?"":p`
              <div class="control-row">
                <input 
                  type="text" 
                  .value=${this.chordSequence}
                  @input=${this.handleTextChange}
                  placeholder="e.g. Cmaj7 Dm7 G7 Cmaj"
                  aria-label="Chord Sequence"
                />
                ${this.showInfo?p`
                  <div class="setting-explanation">Type a space-separated sequence of chords to play and preview.</div>
                `:""}
              </div>
            `}
            
            <div class="control-row">
              <button class="preview-btn" @click=${this.handlePreview} aria-label="Preview Configuration">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Preview
              </button>
              ${this.showInfo?p`
                <div class="setting-explanation">Triggers immediate chord playback using your humanized settings.</div>
              `:""}
            </div>
          `:""}
        </div>

        ${this.mode==="basic"?p`
          <!-- Section: Basic Controls -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Basic Controls</h3>
              ${this.showInfo?p`
                <span class="group-explanation">(macro human feel)</span>
              `:""}
            </div>
            
            <!-- Human Feel -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Human Feel</label>
                <span class="control-value">${Math.round(this.humanSlider*100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                .value=${this.humanSlider.toString()}
                @input=${this.handleBasicSliderChange}
                aria-label="Human Feel"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">Adjusts overall human elements (spread, variance, micro-timing) simultaneously.</div>
              `:""}
            </div>
          </div>
        `:p`
          <!-- Section: Chord Gen Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Chord Gen Group</h3>
              ${this.showInfo?p`
                <span class="group-explanation">(strum & note length)</span>
              `:""}
            </div>
            
            <!-- Spread -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Spread</label>
                <span class="control-value">${this.spread.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" max="2" step="0.01" 
                .value=${this.spread.toString()}
                @input=${e=>this.handleNumberChange("spread",e)}
                aria-label="Spread"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">Staggers the start times of notes in the chord for an arpeggiated or strummed feel.</div>
              `:""}
            </div>

            <!-- Duration -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Duration</label>
                <span class="control-value">${this.duration.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0.1" max="2.0" step="0.01" 
                .value=${this.duration.toString()}
                @input=${e=>this.handleNumberChange("duration",e)}
                aria-label="Duration"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">Controls the base length of the notes during playback.</div>
              `:""}
            </div>
          </div>

          <!-- Section: Dynamics Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Dynamics Group</h3>
              ${this.showInfo?p`
                <span class="group-explanation">(velocity & randomness)</span>
              `:""}
            </div>
            
            <!-- Min Velocity -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Min Velocity</label>
                <span class="control-value">${this.minVelocity}</span>
              </div>
              <input 
                type="range" 
                min="0" max="127" step="1" 
                .value=${this.minVelocity.toString()}
                @input=${e=>this.handleNumberChange("minVelocity",e,!0)}
                aria-label="Min Velocity"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">The minimum MIDI velocity (volume) for chord notes.</div>
              `:""}
            </div>

            <!-- Max Velocity -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Max Velocity</label>
                <span class="control-value">${this.maxVelocity}</span>
              </div>
              <input 
                type="range" 
                min="0" max="127" step="1" 
                .value=${this.maxVelocity.toString()}
                @input=${e=>this.handleNumberChange("maxVelocity",e,!0)}
                aria-label="Max Velocity"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">The maximum MIDI velocity (volume) for chord notes.</div>
              `:""}
            </div>

            <!-- Human Variance -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Human Variance</label>
                <span class="control-value">${this.humanVariance.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                .value=${this.humanVariance.toString()}
                @input=${e=>this.handleNumberChange("humanVariance",e)}
                aria-label="Human Variance"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">Adds subtle random velocity and duration deviations.</div>
              `:""}
            </div>
          </div>

          <!-- Section: Timing Grid Group -->
          <div class="control-group">
            <div class="group-header-row">
              <h3 class="group-title">Timing Grid Group</h3>
              ${this.showInfo?p`
                <span class="group-explanation">(onset timing offsets)</span>
              `:""}
            </div>
            
            <!-- Micro-timing / Variation -->
            <div class="control-row">
              <div class="control-header">
                <label class="control-label">Micro-timing (Variation)</label>
                <span class="control-value">${this.microTiming.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" max="2" step="0.01" 
                .value=${this.microTiming.toString()}
                @input=${e=>this.handleNumberChange("microTiming",e)}
                aria-label="Micro-timing Variation"
              />
              ${this.showInfo?p`
                <div class="setting-explanation">Shifts note onset times slightly early or late for human feel.</div>
              `:""}
            </div>
          </div>

          <!-- Section: Arpeggiator Group -->
          <div class="control-group">
            <div
              class="group-header-row collapsible"
              @click=${()=>{this.arpExpanded=!this.arpExpanded}}
              aria-expanded=${this.arpExpanded}
              role="button"
              tabindex="0"
              @keydown=${e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.arpExpanded=!this.arpExpanded)}}
            >
              <h3 class="group-title">Arpeggiator</h3>
              ${this.showInfo?p`
                <span class="group-explanation">(arp engine & tempo)</span>
              `:""}
              <span class="collapse-chevron ${this.arpExpanded?"open":"closed"}">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>

            <div class="collapsible-body ${this.arpExpanded?"":"hidden"}">
              <!-- BPM -->
              <div class="control-row">
                <div class="control-header">
                  <label class="control-label">Tempo (BPM)</label>
                  <span class="control-value">${this.bpm} BPM</span>
                </div>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <input 
                    type="range" 
                    min="40" max="240" step="1" 
                    .value=${this.bpm.toString()}
                    @input=${this.handleBpmChange}
                    aria-label="BPM Slider"
                    style="flex: 1;"
                  />
                  <input 
                    type="number" 
                    min="40" max="240" 
                    .value=${this.bpm.toString()}
                    @input=${this.handleBpmChange}
                    aria-label="BPM Input"
                    style="width: 70px; background: var(--hp-surface); border: 1px solid var(--hp-border); color: var(--hp-text-primary); padding: 8px 10px; border-radius: 6px; font-family: inherit; font-size: 0.875rem;"
                  />
                </div>
                ${this.showInfo?p`
                  <div class="setting-explanation">Controls the global tempo of the project in Beats Per Minute.</div>
                `:""}
              </div>

              <!-- Arp Mode -->
              <div class="control-row">
                <div class="control-header">
                  <label class="control-label">Arp Mode</label>
                </div>
                <select 
                  .value=${this.arpMode}
                  @change=${this.handleArpModeChange}
                  aria-label="Arp Mode"
                >
                  <option value="off">Off</option>
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                  <option value="up-down">Up-Down</option>
                  <option value="random">Random</option>
                </select>
                ${this.showInfo?p`
                  <div class="setting-explanation">Determines the order in which the notes of the chord are played.</div>
                `:""}
              </div>

              <!-- Arp Rate / Division -->
              <div class="control-row">
                <div class="control-header">
                  <label class="control-label">Arp Rate / Division</label>
                </div>
                <select 
                  .value=${this.arpRate}
                  @change=${this.handleArpRateChange}
                  ?disabled=${this.arpMode==="off"}
                  aria-label="Arp Rate"
                >
                  <option value="1/4">1/4</option>
                  <option value="1/8">1/8</option>
                  <option value="1/16">1/16</option>
                  <option value="1/8T">1/8T (Triplet)</option>
                </select>
                ${this.showInfo?p`
                  <div class="setting-explanation">Rhythmic speed / subdivision division of the arpeggio notes.</div>
                `:""}
              </div>

              <!-- Octave Range -->
              <div class="control-row">
                <div class="control-header">
                  <label class="control-label">Octave Range</label>
                  <span class="control-value">${this.arpRange}</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="4" step="1" 
                  .value=${this.arpRange.toString()}
                  @input=${this.handleArpRangeChange}
                  ?disabled=${this.arpMode==="off"}
                  aria-label="Octave Range"
                />
                ${this.showInfo?p`
                  <div class="setting-explanation">The number of octaves the arpeggio pattern repeats across.</div>
                `:""}
              </div>
            </div>
          </div>
        `}
      </div>
    `}};c([u({type:String})],d.prototype,"heading",void 0),c([u({type:String,attribute:"chord-sequence"})],d.prototype,"chordSequence",void 0),c([u({type:Boolean})],d.prototype,"hideInput",void 0),c([u({type:Number})],d.prototype,"spread",void 0),c([u({type:Number})],d.prototype,"duration",void 0),c([u({type:Number})],d.prototype,"minVelocity",void 0),c([u({type:Number})],d.prototype,"maxVelocity",void 0),c([u({type:Number})],d.prototype,"humanVariance",void 0),c([u({type:Number})],d.prototype,"microTiming",void 0),c([u({type:Number})],d.prototype,"bpm",void 0),c([u({type:String,attribute:"arp-mode"})],d.prototype,"arpMode",void 0),c([u({type:String,attribute:"arp-rate"})],d.prototype,"arpRate",void 0),c([u({type:Number,attribute:"arp-range"})],d.prototype,"arpRange",void 0),c([u({type:Boolean})],d.prototype,"debugExpanded",void 0),c([u({type:Boolean})],d.prototype,"arpExpanded",void 0),c([u({type:Boolean})],d.prototype,"showInfo",void 0),c([u({type:String})],d.prototype,"mode",void 0),c([u({type:Number})],d.prototype,"humanSlider",void 0),d=c([Ve("human-panel")],d);export{d as HumanPanel};
