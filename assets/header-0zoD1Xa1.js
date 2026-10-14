import{$n as e,A as t,Dt as n,Fn as r,In as i,Jn as a,N as o,Nn as s,Yn as c,bn as l,cr as u,ct as d,er as ee,fr as te,ft as ne,l as re,lr as f,n as ie,p,t as ae,z as m}from"./three-IiZtSDkf.js";var h={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},g=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},_=new n(-1,1,1,-1,0,1),v=new class extends re{constructor(){super(),this.setAttribute(`position`,new o([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new o([0,2,0,0,2,0],2))}},y=class{constructor(e){this._mesh=new ne(v,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},oe=class extends g{constructor(t,n=`tDiffuse`){super(),this.textureID=n,this.uniforms=null,this.material=null,t instanceof i?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=e.clone(t.uniforms),this.material=new i({name:t.name===void 0?`unspecified`:t.name,defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new y(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},b=class extends g{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},x=class extends g{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},se=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new u);this._width=n.width,this._height=n.height,t=new te(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:m}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oe(h),this.copyPass.material.blending=0,this.timer=new c}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}b!==void 0&&(r instanceof b?n=!0:r instanceof x&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new u);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ce=class extends g{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new p}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},S=document.querySelector(`#header-viewer`),C=(()=>{let e=getComputedStyle(document.documentElement);return{background:e.getPropertyValue(`--site-bg`).trim()||`#0f1b26`,panel:e.getPropertyValue(`--site-panel`).trim()||`#334249`,paper:e.getPropertyValue(`--site-paper`).trim()||`#f5e8d1`,accent:e.getPropertyValue(`--site-accent`).trim()||`#20a5a6`,highlight:e.getPropertyValue(`--site-highlight`).trim()||`#dd5639`,ink:e.getPropertyValue(`--site-ink`).trim()||`#121c25`,glitchViolet:e.getPropertyValue(`--site-glitch-violet`).trim()||`#ff63db`,glitchBlue:e.getPropertyValue(`--site-glitch-blue`).trim()||`#00f2ff`}})();(()=>{try{let e=document.createElement(`canvas`);return!!(window.WebGLRenderingContext&&(e.getContext(`webgl`)||e.getContext(`experimental-webgl`)))}catch{return!1}})()?w():S.innerHTML=`<div class="header-fallback" aria-live="polite"><span>Joost</span><span>Van Buul</span></div>`;function w(){let e=[`J`,`O1`,`O2`,`S`,`T`,`V`,`A`,`N`,`B`,`U1`,`U2`,`L`],o=new Set([`J`,`O1`,`O2`,`S`,`T`]),c={letters:{J:{faces:[`J3d`],flats:[`JFlat`],outlines:[`JOutline`],wireframes:[`JWireframe`]},O1:{faces:[`O13d`],flats:[`O1Flat`],outlines:[`O1Outline`],wireframes:[`O1Wireframe`]},O2:{faces:[`O23d`],flats:[`O2Flat`],outlines:[`O2Outline`],wireframes:[`O2Wireframe`]},S:{faces:[`S3d`],flats:[`SFlat`],outlines:[`SOutline`],wireframes:[`SWireframe`]},T:{faces:[`T3d`],flats:[`TFlat`],outlines:[`TOutline`],wireframes:[`TWireframe`]},V:{faces:[`V3d`],flats:[`VFlat`],outlines:[`VOutline`],wireframes:[]},A:{faces:[`A3d`],flats:[`AFlat`],outlines:[`AOutline`],wireframes:[]},N:{faces:[`N3d`],flats:[`NFlat`],outlines:[`NOutline`],wireframes:[]},B:{faces:[`B3d`],flats:[`BFlat`],outlines:[`BOutline`],wireframes:[]},U1:{faces:[`U13d`],flats:[`U1Flat`],outlines:[`U1Outline`],wireframes:[]},U2:{faces:[`U23d`],flats:[`U2Flat`],outlines:[`U2Outline`],wireframes:[]},L:{faces:[`L3d`],flats:[`LFlat`],outlines:[`LOutline`],wireframes:[]}},decorative:{backplanes:[`BackPlane001`,`BackPlane002`,`BackPlane003`],smallPlanes:[`SmallPlane001`,`SmallPlane002`,`SmallPlane003`,`SmallPlane004`,`SmallPlane005`,`SmallPlane006`,`SmallPlane007`,`SmallPlane008`,`SmallPlane009`,`SmallPlane010`,`SmallPlane011`,`SmallPlane012`,`SmallPlane013`,`SmallPlane014`,`SmallPlane015`,`SmallPlane018`,`SmallPlane019`,`SmallPlane020`,`SmallPlane021`,`SmallPlane022`],bigPlanes:[`BigPlane`,`BigPlane001`,`BigPlane002`],circles:[`Circle`,`Circle001`]}},re={JOOST:{names:o,hoverOffset:new f(0,0,-.1),clickOffset:new f(0,0,-.3)},VANBUUL:{names:new Set(e.filter(e=>!o.has(e))),hoverOffset:new f(0,0,-.05),clickOffset:new f(0,0,-.15)}},m={x:d.degToRad(36),y:d.degToRad(36)},h={x:d.degToRad(-10),y:d.degToRad(-10)},g={drift:{speedRange:[1.5,3],ampRange:[.02,.05],frequencyX:1,frequencyY:.2,globalSpeed:.2},jitter:{ampRange:[.01,.02],holdSlow:.4,holdFast:.08,holdRandomness:.5},glitch:{attack:2,sustain:.1,release:2,gapRange:[5,15]},ghostBlink:{arrivalSpread:.6,departureSpread:.2,flickerCountRange:[0,3],onRange:[.03,.12],offRange:[.04,.18]},driftJitter:{soloGapRange:[5,20],soloDurationRange:[.3,1],ampRange:[.01,.02],peakFraction:.8},faceMorph:{enabled:!0,gapRange:[6,16],fadeInRange:[2,4],holdRange:[2,5],fadeOutRange:[2,4],forwardOffset:{JOOST:.054,VANBUUL:.0585},preview:!1},pixelSweep:{enabled:!0,duration:5,lead:1,trail:.3,maxLevel:3,splitHeight:.6,lowerMaxLevel:2,shiftChance:.25,shiftMax:12,shiftRate:8},groupModes:{backplanes:`driftJitter`,smallPlanes:`driftJitter`,bigPlanes:`driftJitter`,circles:`driftJitter`,chromaticFlats:`randomJitter`}},_={violetColor:C.glitchViolet,blueColor:C.glitchBlue,sideOffset:.04,depthOffsetZ:-.03,opacity:.65},v=new r,y=new f(0,0,50),b=new f(0,0,0),x=new n(-1,1,1,-1,.1,1e3);x.zoom=2.4,x.position.copy(y),x.lookAt(b),x.updateProjectionMatrix();let w=new ie({antialias:!0,alpha:!0});w.setPixelRatio(Math.min(window.devicePixelRatio,2)),w.outputColorSpace=s,w.setClearColor(new p(C.background),0),S.replaceChildren(w.domElement);let le=new f(0,5,10),ue=le.clone(),de=new t,T,E={letters:Object.fromEntries(e.map(e=>[e,[]])),flats:Object.fromEntries(e.map(e=>[e,[]])),ghosts:Object.fromEntries(e.map(e=>[e,[]])),outlines:{JOOST:[],VANBUUL:[]},wireframes:[],backplanes:[],smallPlanes:[],bigPlanes:[],circles:[],chromaticFlats:[]},D=new Map,O=[],fe=[],k=new Map,pe=new Map,A,me=new Promise(e=>{A=e}),j=new a().load(`images/HeaderTexture1.jpg`,()=>A(),void 0,e=>{console.error(`Unable to load HeaderTexture1.jpg`,e),A()});j.flipY=!1,j.colorSpace=s;function M(e,t){D.set(e,t),O.push(e)}function he(e){return O.filter(t=>D.get(t)===e)}function ge(e,t){let n;for(let r of e.get(t)??[])if(r.traverse(e=>{!n&&e.isMesh&&(n=e)}),n)break;if(!n)console.warn(`Header model mesh not found: ${t}`);else return n}function _e(e){let t=new Map;e.traverse(n=>{if(t.has(n.name)||t.set(n.name,[]),t.get(n.name).push(n),n.isMesh){let r=n.parent;for(;r&&r!==e;)t.has(r.name)||t.set(r.name,[]),t.get(r.name).push(n),r=r.parent}});let n=[{key:`faces`,role:`letter`},{key:`flats`,role:`flat`},{key:`outlines`,role:`outline`},{key:`wireframes`,role:`wireframe`}];for(let[e,r]of Object.entries(c.letters)){let i=[];for(let{key:a,role:s}of n)for(let n of r[a]){let r=ge(t,n);r&&(i.push(r),M(r,s),s===`flat`?E.flats[e].push(r):s===`outline`?E.outlines[o.has(e)?`JOOST`:`VANBUUL`].push(r):s===`wireframe`&&E.wireframes.push(r))}E.letters[e].push(...i),fe.push(...i);for(let t of i)k.set(t,e)}for(let[e,n]of Object.entries(c.decorative))for(let r of n){let n=ge(t,r);n&&(E[e].push(n),M(n,e))}}function N(e){return Array.isArray(e.material)?e.material:[e.material]}function P(e,t,n=`uBaseColor`){for(let r of e)for(let e of N(r))e?.uniforms?.[n]&&(e.uniforms[n].value.set(t),n===`uBaseColor`&&e.uniforms.uDarkColor&&e.uniforms.uDarkColor.value.copy(ye(t)))}function ve(){P(he(`letter`),C.highlight),P(he(`outline`),C.paper),P(E.wireframes,C.accent,`uColor`);for(let e of[E.backplanes,E.smallPlanes,E.bigPlanes,E.circles])for(let t of e)for(let e of N(t))e?.uniforms?.uColor&&e.uniforms.uColor.value.copy(be(t.name))}function ye(e){let t=new p(e),n={};return t.getHSL(n),t.setHSL(n.h,n.s,Math.max(0,n.l-.14)),t}function be(e){if(pe.has(e))return pe.get(e).clone();let t=new p(C.accent),n={};t.getHSL(n);let r=(Math.random()-.5)*.04,i=Math.random()*.1;return t.setHSL((n.h+r+1)%1,n.s,d.clamp(n.l+i,0,1)),pe.set(e,t),t}function F(e=C.highlight){return new i({transparent:!0,side:2,uniforms:{uTexture:{value:j},uBaseColor:{value:new p(e)},uDarkColor:{value:ye(e)},uLightPosition:{value:ue},uLightColor:{value:new p(C.paper)},uLightStrength:{value:1},uOpacity:{value:1}},vertexShader:`
            varying vec2 vUv;
            varying vec3 vWorldPosition;
            varying vec3 vWorldNormal;

            void main() {
                vUv = uv;
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                vWorldNormal = normalize(mat3(modelMatrix) * normal);
                // Extension point: displacing position here based on a
                // per-vertex random attribute plus a uGlitchStrength/uTime
                // uniform is what will drive the vertex-jitter "glitch"
                // effect. Feeding local Y into the noise phase is how that
                // can be made to run as a wave from top to bottom.
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform sampler2D uTexture;
            uniform vec3 uBaseColor;
            uniform vec3 uDarkColor;
            uniform vec3 uLightPosition;
            uniform vec3 uLightColor;
            uniform float uLightStrength;
            uniform float uOpacity;
            varying vec2 vUv;
            varying vec3 vWorldPosition;
            varying vec3 vWorldNormal;

            void main() {
                float pattern = dot(texture2D(uTexture, vUv).rgb, vec3(0.2126, 0.7152, 0.0722));
                vec3 baseColor = mix(uDarkColor, uBaseColor, pattern);
                vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
                // Some letter meshes (JOOST vs VANBUUL) have opposite authored
                // normal directions, so always orient toward the visible side
                // (as seen by the camera) rather than trusting the raw normal.
                vec3 normal = normalize(vWorldNormal);
                if (!gl_FrontFacing) {
                    normal = -normal;
                }
                float diffuse = max(dot(normal, lightDirection), 0.0);

                vec3 lighting = vec3(0.35) + uLightColor * diffuse * uLightStrength;
                gl_FragColor = vec4(baseColor * lighting, uOpacity);
            }
        `})}function xe(e){return new i({transparent:!0,side:2,depthWrite:!1,uniforms:{uTexture:{value:j},uColor:{value:be(e)},uOpacity:{value:1}},vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform sampler2D uTexture;
            uniform vec3 uColor;
            uniform float uOpacity;
            varying vec2 vUv;

            void main() {
                float alpha = dot(texture2D(uTexture, vUv).rgb, vec3(0.2126, 0.7152, 0.0722));
                if (alpha <= 0.001) {
                    discard;
                }
                gl_FragColor = vec4(uColor, alpha * uOpacity);
            }
        `})}function Se(e,t){return new i({transparent:!0,side:2,depthWrite:!1,uniforms:{uColor:{value:new p(e)},uOpacity:{value:t}},vertexShader:`
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform vec3 uColor;
            uniform float uOpacity;
            void main() {
                gl_FragColor = vec4(uColor, uOpacity);
            }
        `})}function Ce(e){let t=D.get(e);t===`flat`&&(e.position.z+=-.06),Ue(e),t===`letter`||t===`flat`?e.material=F(C.highlight):t===`outline`?e.material=F(C.panel):t===`wireframe`?e.material=F(C.accent):[`backplanes`,`smallPlanes`,`bigPlanes`,`circles`].includes(t)&&(e.material=xe(e.name)),t===`flat`&&(e.renderOrder=1)}let we=Se(_.violetColor,_.opacity),Te=Se(_.blueColor,_.opacity);function Ee(){for(let t of e)for(let e of E.flats[t])for(let{material:n,side:r}of[{material:we,side:-1},{material:Te,side:1}]){let i=new ne(e.geometry,n);i.position.copy(e.position),i.rotation.copy(e.rotation),i.scale.copy(e.scale),i.position.x+=r*_.sideOffset,i.position.y+=-r*_.sideOffset,i.position.z+=_.depthOffsetZ,e.parent.add(i),M(i,`chromaticFlats`),E.chromaticFlats.push(i),E.ghosts[t].push(i),k.set(i,t),Ue(i,{baseOpacity:_.opacity})}}function De(){new ae().load(`models/HeaderFinal.glb`,e=>{T=e.scene,T.rotation.set(h.x,h.y,0),_e(T);for(let e of O)Ce(e);Ee(),ve(),gt(),v.add(T),me.then(()=>nt())},void 0,e=>{console.error(`Unable to load HeaderFinal.glb`,e)})}let Oe=new l,I=new u,L,R={active:!1,pointerX:0,pointerY:0,moved:!1},ke,Ae=new Map;function je(e){let t=Ae.get(e);return t||(t={clicked:!1,clickTimeoutId:void 0},Ae.set(e,t)),t}function Me(e){let t=w.domElement.getBoundingClientRect();I.x=(e.clientX-t.left)/t.width*2-1,I.y=-((e.clientY-t.top)/t.height)*2+1,Oe.setFromCamera(I,x);let n=Oe.intersectObjects(fe,!1)[0];if(n)return k.get(n.object)}function Ne(e){return Object.values(re).find(t=>t.names.has(e))}function Pe(e,t){if(je(e).clicked)return;let n=Ne(e);n&&Y(e,t?n.hoverOffset:new f,100)}function Fe(e){let t=Ne(e);if(!t)return;let n=je(e);n.clicked?(n.clicked=!1,clearTimeout(n.clickTimeoutId),n.clickTimeoutId=void 0,Y(e,new f,500)):(n.clicked=!0,Y(e,t.clickOffset,500),n.clickTimeoutId=setTimeout(()=>{n.clickTimeoutId=void 0,n.clicked&&(n.clicked=!1,Y(e,new f,500))},2e3))}function Ie(e){if(R.active)return;let t=Me(e);t!==L&&(L&&Pe(L,!1),L=t,L&&Pe(L,!0))}function Le(e){if(R.moved){R.moved=!1;return}let t=Me(e);t&&Fe(t)}function Re(e){clearTimeout(ke),R.active=!0,R.moved=!1,R.pointerX=e.clientX,R.pointerY=e.clientY,w.domElement.setPointerCapture(e.pointerId)}function ze(e){if(!R.active)return;let t=e.clientX-R.pointerX,n=e.clientY-R.pointerY;R.moved||=t!==0||n!==0,R.pointerX=e.clientX,R.pointerY=e.clientY,J.targetY=d.clamp(J.targetY+t*.008,-m.y,m.y),J.targetX=d.clamp(J.targetX+n*.008,-m.x,m.x)}function Be(e){R.active&&(R.active=!1,w.domElement.hasPointerCapture(e.pointerId)&&w.domElement.releasePointerCapture(e.pointerId),ke=setTimeout(()=>{J.targetX=h.x,J.targetY=h.y},4e3))}w.domElement.style.touchAction=`none`,w.domElement.addEventListener(`pointerdown`,Re),w.domElement.addEventListener(`pointermove`,ze),w.domElement.addEventListener(`pointermove`,Ie),w.domElement.addEventListener(`pointerup`,Be),w.domElement.addEventListener(`pointercancel`,Be),w.domElement.addEventListener(`click`,Le);function z([e,t]){return Math.min(e,t)+Math.random()*Math.abs(t-e)}function Ve(){return Math.random()*2-1}function He([e,t]){let n=Math.round(Math.min(e,t));return n+Math.floor(Math.random()*(Math.round(Math.max(e,t))-n+1))}let B=new Map;function Ue(e,{baseOpacity:t=1,baseVisible:n=!0}={}){B.set(e,{rest:e.position.clone(),offset:new f,opacity:1,baseOpacity:t,visible:!0,baseVisible:n})}function We(){for(let e of B.values())e.offset.set(0,0,0),e.opacity=1,e.visible=!0}function Ge(){for(let[e,t]of B){e.position.copy(t.rest).add(t.offset),e.visible=t.baseVisible&&t.visible;let n=t.baseOpacity*t.opacity;for(let t of N(e))t?.uniforms?.uOpacity&&(t.uniforms.uOpacity.value=n)}}let V=[];function H(e){return e.key&&U(e.key),V.push(e),e}function U(e){if(!e)return;let t=V.findIndex(t=>t.key===e);if(t!==-1)return V.splice(t,1)[0]}function Ke(e,t){for(let n=V.length-1;n>=0;--n)V[n].update(e,t)&&V.splice(n,1)}function qe({attack:e,sustain:t,release:n}){let r=e+t+n;return{attack:e,sustain:t,release:n,duration:r,intensityAt(n){return n<=0||n>=r?0:n<e?d.smoothstep(n,0,e):n<e+t?1:1-d.smoothstep(n,e+t,r)}}}let W={active:!1,intensity:0,id:0,elapsed:0,envelope:void 0},Je=window.matchMedia(`(prefers-reduced-motion: reduce)`),G=0,K;function Ye(e){K=e+z(g.glitch.gapRange)}function Xe(e){W.envelope=qe(g.glitch),G=e,W.active=!0,W.elapsed=0,W.id+=1}function Ze(e){if(!W.active&&K!==void 0&&e>=K&&!Je.matches&&Xe(e),!W.active){W.intensity=0,W.elapsed=0;return}let t=e-G;t>=W.envelope.duration?(W.active=!1,W.intensity=0,W.elapsed=0,Ye(e)):(W.elapsed=t,W.intensity=W.envelope.intensityAt(t))}function Qe({force:e=!1}={}){W.active||Je.matches&&!e||Xe(Z)}let $e=`header-on-load-glitch-seen`;function et(){try{return sessionStorage.getItem($e)===`true`}catch{return!1}}function tt(){try{sessionStorage.setItem($e,`true`)}catch{}}function nt(){et()?Ye(Z):(tt(),Qe())}function rt(e=g.drift){return{speed:z(e.speedRange),phaseX:Math.random()*Math.PI*2,phaseY:Math.random()*Math.PI*2,ampX:z(e.ampRange),ampY:z(e.ampRange)}}function it(e,t,n,r=g.drift){let i=n*t.speed*r.globalSpeed;e.offset.x+=Math.sin(i*r.frequencyX+t.phaseX)*t.ampX,e.offset.y+=Math.sin(i*r.frequencyY+t.phaseY)*t.ampY}function q(){return{offset:new f,nextStepAt:0}}function at(e,t,n,r,i=g.jitter){if(t<e.nextStepAt)return;let a=z(r)*n;e.offset.set(Ve()*a,Ve()*a,0);let o=d.lerp(i.holdSlow,i.holdFast,n),s=i.holdRandomness;e.nextStepAt=t+o*(1-s+Math.random()*s*2)}function ot(e,t=g.ghostBlink){let n=()=>He(t.flickerCountRange),r=[],i=Math.random()*t.arrivalSpread*e.attack;r.push(i);for(let e=n();e>0;--e)i+=z(t.onRange),r.push(i),i+=z(t.offRange),r.push(i);let a=i,o=e.duration-Math.random()*t.departureSpread*e.release,s=[o];i=o;for(let e=n();e>0;--e)i-=z(t.onRange),s.push(i),i-=z(t.offRange),s.push(i);return i<=a?[...r,Math.max(o,a)]:[...r,...s.reverse()]}function st(e,t){let n=0;for(let r of e){if(r>t)break;n+=1}return n%2==1}function ct(e,{key:t}={}){let n=new Map(e.map(e=>[e,rt()]));return{key:t,update(t){for(let r of e){let e=B.get(r);e&&it(e,n.get(r),t)}return!1}}}function lt(e,{key:t,envelope:n,fadeWithEnvelope:r=!1,ampRange:i=g.jitter.ampRange}={}){let a=new Map(e.map(e=>[e,q()])),o;return{key:t,update(t){o??=t;let s=t-o,c=n?n.intensityAt(s):1;for(let o of e){let e=B.get(o);if(!e)continue;let s=a.get(o);at(s,t,c,i),e.offset.add(s.offset),n&&r&&(e.opacity*=c)}return n?s>=n.duration:!1}}}function ut(e,{key:t,ampRange:n=g.jitter.ampRange,blinkGroupOf:r=e=>k.get(e)??e}={}){let i=new Map(e.map(e=>[e,q()])),a=new Map,o=W.id;return{key:t,update(t){if(W.id!==o){o=W.id;for(let e of i.values())e.offset.set(0,0,0),e.nextStepAt=0;a.clear();for(let t of e){let e=r(t);a.has(e)||a.set(e,ot(W.envelope))}}for(let o of e){let e=B.get(o);if(!e)continue;if(!W.active){e.visible=!1;continue}let s=a.get(r(o));s&&!st(s,W.elapsed)&&(e.visible=!1);let c=i.get(o);at(c,t,W.intensity,n),e.offset.add(c.offset)}return!1}}}function dt(e,{key:t}={}){let n=g.driftJitter,r=new Map(e.map(e=>[e,{drift:rt(),driftTime:0,step:q(),nextSoloAt:void 0,soloEndsAt:-1/0,glitchId:W.id,inPeak:!1,peakThreshold:1}]));return{key:t,update(t,i){for(let a of e){let e=B.get(a);if(!e)continue;let o=r.get(a);o.nextSoloAt??=t+z(n.soloGapRange),t>=o.nextSoloAt&&(o.soloEndsAt=t+z(n.soloDurationRange),o.nextSoloAt=o.soloEndsAt+z(n.soloGapRange));let s=t<o.soloEndsAt;o.glitchId!==W.id&&(o.glitchId=W.id,o.inPeak=Math.random()<n.peakFraction,o.peakThreshold=Math.random());let c=W.active&&o.inPeak&&W.intensity>o.peakThreshold,l=s||c;if(l||(o.driftTime+=i),it(e,o.drift,o.driftTime),l){let r=s?1:W.intensity;at(o.step,t,r,n.ampRange),e.offset.add(o.step.offset)}else o.step.nextStepAt=0}return!1}}}function ft(e,{key:t,settings:n=g.faceMorph}={}){let r=new Map(e.map(e=>[e,{word:o.has(k.get(e))?`JOOST`:`VANBUUL`,nextMorphAt:void 0,envelope:void 0,startedAt:0}]));return{key:t,update(t){for(let i of e){let e=B.get(i);if(!e)continue;let a=r.get(i);if(n.preview){e.offset.z+=n.forwardOffset[a.word];continue}if(a.nextMorphAt??=t+z(n.gapRange),!a.envelope){if(!n.enabled||t<a.nextMorphAt)continue;a.envelope=qe({attack:z(n.fadeInRange),sustain:z(n.holdRange),release:z(n.fadeOutRange)}),a.startedAt=t}let o=t-a.startedAt;o>=a.envelope.duration?(a.envelope=void 0,a.nextMorphAt=t+z(n.gapRange)):(e.offset.z+=n.forwardOffset[a.word],e.opacity*=a.envelope.intensityAt(o))}return!1}}}function pt(e){return e<.5?2*e*e:-1+(4-2*e)*e}function mt(e,{key:t,from:n,to:r,duration:i,ease:a=pt}){let o=n.clone(),s=r.clone(),c=o.clone(),l;return{key:t,currentOffset:c,update(t){l??=t;let n=i>0?Math.min((t-l)/i,1):1;c.lerpVectors(o,s,a(n));for(let t of e)B.get(t)?.offset.add(c);return n>=1&&s.lengthSq()===0}}}function ht(e,t){let n=`group:${e}`;U(n);let r=E[e];r?.length&&t!==`off`&&(t===`drift`?H(ct(r,{key:n})):t===`driftJitter`?H(dt(r,{key:n})):t===`jitter`?H(lt(r,{key:n})):t===`randomJitter`&&H(ut(r,{key:n})))}function gt(){for(let[e,t]of Object.entries(g.groupModes))ht(e,t);H(ft(Object.values(E.flats).flat(),{key:`faceMorph`}))}let J={currentX:h.x,currentY:h.y,targetX:h.x,targetY:h.y};function Y(e,t,n){let r=[...E.letters[e]??[],...E.ghosts[e]??[]];if(!r.length)return;let i=`letter:${e}`;H(mt(r,{key:i,from:U(i)?.currentOffset??new f,to:t,duration:n/1e3}))}function _t(){J.currentX=d.lerp(J.currentX,J.targetX,.04),J.currentY=d.lerp(J.currentY,J.targetY,.04),T&&(T.rotation.x=J.currentX,T.rotation.y=J.currentY),vt()}function vt(){de.set(J.currentX,J.currentY,0),ue.copy(le).applyEuler(de)}let X,Z=0;function yt(){let e=performance.now()*.001;X??=e;let t=Math.min(e-X,.1);X=e,Z+=t,We(),Ze(Z),Ke(Z,t),Ge(),_t(),Tt(Z)}function bt(e){let t=!1,n=!1,r=!1,i=()=>{let e=t&&!n;e!==r&&(r=e,r?(X=void 0,w.setAnimationLoop(yt)):w.setAnimationLoop(null))};new IntersectionObserver(([e])=>{t=e.isIntersecting,i()}).observe(e),document.addEventListener(`site:modal`,e=>{n=e.detail.open,i()})}let Q=new se(w,new te(1,1,{type:ee,samples:4}));Q.setPixelRatio(1),Q.addPass(new ce(v,x));let xt=new oe({name:`PixelSweepShader`,uniforms:{tDiffuse:{value:null},uResolution:{value:new u(1,1)},uPixelRatio:{value:w.getPixelRatio()},uLine:{value:2},uLead:{value:g.pixelSweep.lead},uTrail:{value:g.pixelSweep.trail},uMaxLevel:{value:g.pixelSweep.maxLevel},uSplitHeight:{value:g.pixelSweep.splitHeight},uLowerMaxLevel:{value:g.pixelSweep.lowerMaxLevel},uShiftChance:{value:g.pixelSweep.shiftChance},uShiftMax:{value:g.pixelSweep.shiftMax},uShiftSeed:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;   // render target size, device pixels
        uniform float uPixelRatio;
        uniform float uLine;        // the line's height: 1 = top edge, 0 = bottom
        uniform float uLead;        // how far ahead of the line blocks start to grow
        uniform float uTrail;       // how far behind the line blocks take to revert
        uniform float uMaxLevel;    // biggest blocks are 2^uMaxLevel CSS px
        uniform float uSplitHeight; // height of the split: 1 = top edge, 0 = bottom
        uniform float uLowerMaxLevel; // uMaxLevel for the rows below the split
        uniform float uShiftChance; // share of rows knocked sideways
        uniform float uShiftMax;    // furthest sideways knock, CSS px
        uniform float uShiftSeed;   // changes a few times a second (see renderFrame)
        varying vec2 vUv;

        // Cheap per-row random number in 0..1. The inputs stay small (row
        // index, seed < 1000), which keeps sin() precise enough to look random.
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 pixel = vUv * uResolution;

            // Everything is decided per row of the *biggest* blocks, so every
            // block in a row is the same size and a row shifts as one piece.
            // Sizes are powers of two, so smaller blocks tile a row exactly.
            float rowHeight = exp2(uMaxLevel) * uPixelRatio;
            float row = floor(pixel.y / rowHeight);
            float rowCenterY = (row + 0.5) * rowHeight / uResolution.y;

            // Distance from the line, on either side, as a fraction of its lead
            // (still ahead of the line) or its trail (already passed). Strength
            // is 1 on the line and falls to 0 a full lead ahead / trail behind,
            // so blocks grow as the line approaches and shrink after it.
            float behind = rowCenterY - uLine;
            float falloff = behind >= 0.0
                ? behind / max(uTrail, 0.0001)
                : -behind / max(uLead, 0.0001);
            float strength = clamp(1.0 - falloff, 0.0, 1.0);

            // The biggest block this row may reach: smaller below the split,
            // where the letters are smaller. Decided per row rather than by
            // where the line is, because the blocks start growing a whole
            // lead ahead of the line - the lower letters are already
            // pixelating while the line is still crossing the upper ones.
            // Kept at or below uMaxLevel, so the smaller blocks still tile
            // the row grid above exactly.
            float rowMaxLevel = rowCenterY < uSplitHeight
                ? min(uLowerMaxLevel, uMaxLevel)
                : uMaxLevel;

            // Stepped to powers of two so the blocks read as chunky bands
            // rather than a smear. Level 0 is untouched (1 device pixel).
            float level = min(floor(strength * (rowMaxLevel + 1.0)), rowMaxLevel);
            float blockSize = level < 0.5 ? 1.0 : exp2(level) * uPixelRatio;

            // Glitchiness: some rows are torn sideways. Which rows, which way
            // and how far are re-rolled whenever uShiftSeed changes, so rows
            // snap and hold like the jitter. Scaled by strength, so rows near
            // the line tear furthest and untouched rows never move. Shifting
            // before the block snap moves the row's block grid with it.
            float torn = step(1.0 - uShiftChance, hash(vec2(row, uShiftSeed)));
            float direction = hash(vec2(row, uShiftSeed + 101.0)) * 2.0 - 1.0;
            float shift = floor(torn * direction * uShiftMax * uPixelRatio * strength + 0.5);
            pixel.x -= shift;

            // Every pixel in a block samples one texel, at the block's centre;
            // the +0.5 lands on a texel centre, so filtering adds no blur.
            vec2 samplePixel = floor(pixel / blockSize) * blockSize + floor(blockSize * 0.5) + 0.5;
            gl_FragColor = texture2D(tDiffuse, samplePixel / uResolution);
        }
    `});Q.addPass(xt);let $,St=0;function Ct(){let{attack:e,sustain:t}=W.envelope,{duration:n,lead:r,trail:i}=g.pixelSweep,a=G+e+t/2,o=(r+.5)/(r+1+i);$=Math.max(G,a-n*o)}function wt(e){if(W.active&&W.id!==St&&(St=W.id,Ct()),$===void 0||!g.pixelSweep.enabled)return;let{duration:t,lead:n,trail:r}=g.pixelSweep,i=(e-$)/t;if(!(i<0)){if(i>1)$=void 0;else return 1+n-i*(n+1+r)}}function Tt(e){let t=wt(e);if(t===void 0){w.render(v,x);return}let n=g.pixelSweep,r=xt.uniforms;r.uLine.value=t,r.uLead.value=n.lead,r.uTrail.value=n.trail,r.uMaxLevel.value=n.maxLevel,r.uSplitHeight.value=n.splitHeight,r.uLowerMaxLevel.value=n.lowerMaxLevel,r.uShiftChance.value=n.shiftChance,r.uShiftMax.value=n.shiftMax,r.uShiftSeed.value=Math.floor(e*n.shiftRate)%997,Q.render()}function Et(){let{width:e,height:t}=S.getBoundingClientRect();x.position.copy(y),x.lookAt(b);let n=e/Math.max(t,1);x.left=-5*n/2,x.right=5*n/2,x.top=5/2,x.bottom=-5/2,x.updateProjectionMatrix(),w.setSize(e,t,!1);let r=w.getDrawingBufferSize(new u);Q.setSize(r.x,r.y),xt.uniforms.uResolution.value.copy(r),Tt(Z)}De(),new ResizeObserver(Et).observe(S),Et(),bt(S)}