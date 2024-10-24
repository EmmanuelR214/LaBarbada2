import{r as o,j as e,I as $}from"./index-Bw8vxug1.js";import{u as L,f as B,e as O,g as D,P as K,L as V,m as C}from"./Buttons-CLO9Hq2r.js";function P(){const t=o.useRef(!1);return L(()=>(t.current=!0,()=>{t.current=!1}),[]),t}function A(){const t=P(),[s,n]=o.useState(0),r=o.useCallback(()=>{t.current&&n(s+1)},[s]);return[o.useCallback(()=>B.postRender(r),[r]),s]}class T extends o.Component{getSnapshotBeforeUpdate(s){const n=this.props.childRef.current;if(n&&s.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function U({children:t,isPresent:s}){const n=o.useId(),r=o.useRef(null),m=o.useRef({width:0,height:0,top:0,left:0}),{nonce:u}=o.useContext(O);return o.useInsertionEffect(()=>{const{width:c,height:i,top:d,left:p}=m.current;if(s||!r.current||!c||!i)return;r.current.dataset.motionPopId=n;const l=document.createElement("style");return u&&(l.nonce=u),document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${c}px !important;
            height: ${i}px !important;
            top: ${d}px !important;
            left: ${p}px !important;
          }
        `),()=>{document.head.removeChild(l)}},[s]),e.jsx(T,{isPresent:s,childRef:r,sizeRef:m,children:o.cloneElement(t,{ref:r})})}const M=({children:t,initial:s,isPresent:n,onExitComplete:r,custom:m,presenceAffectsLayout:u,mode:c})=>{const i=D(Z),d=o.useId(),p=o.useMemo(()=>({id:d,initial:s,isPresent:n,custom:m,onExitComplete:l=>{i.set(l,!0);for(const a of i.values())if(!a)return;r&&r()},register:l=>(i.set(l,!1),()=>i.delete(l))}),u?[Math.random()]:[n]);return o.useMemo(()=>{i.forEach((l,a)=>i.set(a,!1))},[n]),o.useEffect(()=>{!n&&!i.size&&r&&r()},[n]),c==="popLayout"&&(t=e.jsx(U,{isPresent:n,children:t})),e.jsx(K.Provider,{value:p,children:t})};function Z(){return new Map}function H(t){return o.useEffect(()=>()=>t(),[])}const S=t=>t.key||"";function W(t,s){t.forEach(n=>{const r=S(n);s.set(r,n)})}function X(t){const s=[];return o.Children.forEach(t,n=>{o.isValidElement(n)&&s.push(n)}),s}const z=({children:t,custom:s,initial:n=!0,onExitComplete:r,exitBeforeEnter:m,presenceAffectsLayout:u=!0,mode:c="sync"})=>{const i=o.useContext(V).forceRender||A()[0],d=P(),p=X(t);let l=p;const a=o.useRef(new Map).current,h=o.useRef(l),f=o.useRef(new Map).current,x=o.useRef(!0);if(L(()=>{x.current=!1,W(p,f),h.current=l}),H(()=>{x.current=!0,f.clear(),a.clear()}),x.current)return e.jsx(e.Fragment,{children:l.map(j=>e.jsx(M,{isPresent:!0,initial:n?void 0:!1,presenceAffectsLayout:u,mode:c,children:j},S(j)))});l=[...l];const v=h.current.map(S),g=p.map(S),y=v.length;for(let j=0;j<y;j++){const b=v[j];g.indexOf(b)===-1&&!a.has(b)&&a.set(b,void 0)}return c==="wait"&&a.size&&(l=[]),a.forEach((j,b)=>{if(g.indexOf(b)!==-1)return;const N=f.get(b);if(!N)return;const w=v.indexOf(b);let k=j;if(!k){const E=()=>{a.delete(b);const I=Array.from(f.keys()).filter(F=>!g.includes(F));if(I.forEach(F=>f.delete(F)),h.current=p.filter(F=>{const R=S(F);return R===b||I.includes(R)}),!a.size){if(d.current===!1)return;i(),r&&r()}};k=e.jsx(M,{isPresent:!1,onExitComplete:E,custom:s,presenceAffectsLayout:u,mode:c,children:N},S(N)),a.set(b,k)}l.splice(w,0,k)}),l=l.map(j=>{const b=j.key;return a.has(b)?j:e.jsx(M,{isPresent:!0,presenceAffectsLayout:u,mode:c,children:j},S(j))}),e.jsx(e.Fragment,{children:a.size?l:l.map(j=>o.cloneElement(j))})},J=({title:t,name:s,max:n,min:r,icon:m,w:u="w-full",method:c,err:i,look:d})=>{var f;const[p,l]=o.useState(!1),a=()=>{l(!0)},h=x=>{x.target.value||l(!1)};return e.jsxs("div",{className:`relative ${u}`,children:[e.jsxs("div",{className:"relative",children:[e.jsx(C.label,{className:`absolute left-3 ${p?" text-sm":"text-gray-500"} pointer-events-none`,animate:{top:p?"-20px":"20%"},onClick:()=>document.querySelector("input").focus(),transition:{type:"spring",stiffness:300,damping:20},children:e.jsx("label",{htmlFor:"",children:t})}),e.jsx("input",{type:"text",...c(s,{required:`${t} es requerido`,minLength:{value:r,message:`${t} debe ser mayor a ${r} carácteres`},maxLength:{value:n,message:`${t} debe de ser menor a ${n} carácteres`}}),className:"text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none ",onFocus:a,onBlur:h,value:d(s)||""}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center bg-transparent p-2",children:e.jsx($,{icon:m,className:"text-black text-2xl"})})]}),i[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(f=i[s])==null?void 0:f.message})]})},Q=({title:t,name:s,max:n,min:r,method:m,err:u,look:c,triger:i,val:d})=>{var b;const[p,l]=o.useState(!1),[a,h]=o.useState(!1),[f,x]=o.useState([]),v=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,g=N=>{const w=[],k=N.target.value,E=/[A-Z]/.test(k),I=/[a-z]/.test(k),F=/\d/.test(k),R=/[!@#$%^&*]/.test(k);if(s==="pass"){const q=k.replace(/[^a-zA-Z0-9!@#$%^&*]/g,"");d(s,q),E||w.push("Debe contener al menos una letra mayúscula."),I||w.push("Debe contener al menos una letra minúscula."),F||w.push("Debe contener al menos un número."),R||w.push("Debe contener al menos uno de los siguientes carácteres especiales: !, @, #, $, %, ^, &, *."),x(w)}i(s)},y=()=>{l(!0)},j=N=>{N.target.value||l(!1)};return e.jsxs("div",{className:"relative w-full ",children:[e.jsxs("div",{className:"relative",children:[e.jsx(C.label,{className:`absolute left-3 ${p?" text-sm":"text-gray-500"} pointer-events-none`,animate:{top:p?"-20px":"20%"},onClick:()=>document.querySelector("input").focus(),transition:{type:"spring",stiffness:300,damping:20},children:e.jsx("label",{htmlFor:"",children:t})}),e.jsx("input",{type:a?"text":"password",...m(s,{required:`${t} es requerido`,pattern:v,minLength:{value:r,message:`${t} debe ser mayor a ${r} carácteres`},maxLength:{value:n,message:`${t} debe de ser menor a ${n} carácteres`}}),className:"text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none ",onFocus:y,onBlur:j,onChange:g,value:c(s)||""}),e.jsx(C.button,{type:"button",onClick:()=>h(!a),className:"absolute inset-y-0 right-0 flex items-center p-2",whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsx($,{icon:a?"ph:eye":"mdi:eye-off-outline",className:"text-black text-2xl"})})]}),u[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(b=u[s])==null?void 0:b.message}),e.jsx("div",{className:"w-full",children:f.map((N,w)=>e.jsx("p",{className:"text-red-500 text-xs",children:N},w))})]})},Y=({title:t,name:s,max:n,min:r,method:m,err:u,look:c,triger:i,val:d})=>{var g;const[p,l]=o.useState(!1),[a,h]=o.useState(!1),f=y=>{const b=y.target.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g,"");d(s,b),i(s)},x=()=>{l(!0)},v=y=>{y.target.value||l(!1)};return e.jsxs("div",{className:"relative w-full ",children:[e.jsxs("div",{className:"relative",children:[e.jsx(C.label,{className:`absolute left-3 ${p?" text-sm":"text-gray-500"} pointer-events-none`,animate:{top:p?"-20px":"20%"},onClick:()=>document.querySelector("input").focus(),transition:{type:"spring",stiffness:300,damping:20},children:e.jsx("label",{htmlFor:"",children:t})}),e.jsx("input",{type:a?"text":"password",...m(s,{required:`${t} es requerido`,validate:y=>y===c("pass")||"Las contraseñas no coinciden",minLength:{value:r,message:`${t} debe ser mayor a ${r} carácteres`},maxLength:{value:n,message:`${t} debe de ser menor a ${n} carácteres`}}),className:"text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none ",onFocus:x,onBlur:v,onChange:f,value:c(s)||""}),e.jsx(C.button,{type:"button",onClick:()=>h(!a),className:"absolute inset-y-0 right-0 flex items-center p-2",whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsx($,{icon:a?"ph:eye":"mdi:eye-off-outline",className:"text-black text-2xl"})})]}),u[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(g=u[s])==null?void 0:g.message}),u.passwordRepeat&&e.jsxs("p",{className:"mt-2 text-xs text-red-600 dark:text-red-400",children:[e.jsx("span",{className:"font-medium",children:"Oh, snapp!"})," ",u.passwordRepeat.message]})]})},ee=({title:t,name:s,max:n,min:r,method:m,err:u,look:c,triger:i,val:d})=>{var j;const[p,l]=o.useState(!1),a="ph:phone-fill",[h,f]=o.useState([]),x=/^[0-9]+$/,v=b=>{const N=b.target.value.replace(/[^0-9]/g,"").slice(0,10);d(s,N);const w=[];N.length<10&&w.push("El teléfono debe ser igual a 10 caracteres"),f(w),i(s)},g=()=>{l(!0)},y=b=>{b.target.value||l(!1)};return e.jsxs("div",{className:"relative w-full",children:[e.jsxs("div",{className:"relative",children:[e.jsx(C.label,{className:`absolute left-3 ${p?" text-sm":"text-gray-500"} pointer-events-none`,animate:{top:p?"-20px":"20%"},onClick:()=>document.querySelector("input").focus(),transition:{type:"spring",stiffness:300,damping:20},children:e.jsx("label",{htmlFor:"",children:t})}),e.jsx("input",{type:"tel",...m(s,{required:`${t} es requerido`,pattern:{value:x,message:"Ingrese un teléfono válido"},minLength:{value:r,message:`${t} debe ser mayor a ${r} caracteres`},maxLength:{value:n,message:`${t} debe ser menor a ${n} caracteres`}}),className:"text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none",onFocus:g,onBlur:y,onChange:v,value:c(s)||""}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center bg-transparent p-2",children:e.jsx($,{icon:a,className:"text-black text-2xl"})})]}),u[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(j=u[s])==null?void 0:j.message}),e.jsx("div",{className:"w-full",children:h.map((b,N)=>e.jsx("p",{className:"text-red-500 text-xs",children:b},N))})]})},se=({title:t,name:s,min:n,max:r,pattern:m,method:u,err:c,val:i})=>{var f;const[d,p]=o.useState(""),l=o.useRef([]);o.useEffect(()=>{i(s,d)},[d,s,i]);const a=(x,v)=>{let{value:g}=v.target;m&&(g=g.replace(new RegExp(m),""));const y=[...d];y[x]=g,g&&x<5&&l.current[x+1].focus(),p(y.join("").slice(0,6))},h=(x,v)=>{v.key==="Backspace"&&!d[x]&&x>0&&l.current[x-1].focus()};return e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center justify-center text-black",children:Array.from({length:6}).map((x,v)=>o.createElement("input",{...u(s,{required:`${t} es requerido`,minLength:{value:n,message:`${t} debe ser mayor a ${n} caracteres`},maxLength:{value:r,message:`${t} debe ser menor a ${r} caracteres`}}),key:v,ref:g=>l.current[v]=g,type:"text",maxLength:1,value:d[v]||"",onChange:g=>a(v,g),onKeyDown:g=>h(v,g),className:"w-12 h-12 text-3xl text-center border rounded-md mx-1 focus:outline-none focus:border-blue-500"}))}),c[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(f=c[s])==null?void 0:f.message})]})},te=({title:t,name:s,max:n,min:r,method:m,err:u,look:c})=>{var f;const[i,d]=o.useState(!1),p="material-symbols:mail-outline",l=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,a=()=>{d(!0)},h=x=>{x.target.value||d(!1)};return e.jsxs("div",{className:"relative w-full",children:[e.jsxs("div",{className:"relative",children:[e.jsx(C.label,{className:`absolute left-3 ${i?" text-sm":"text-gray-500"} pointer-events-none`,animate:{top:i?"-20px":"20%"},onClick:()=>document.querySelector("input").focus(),transition:{type:"spring",stiffness:300,damping:20},children:e.jsx("label",{htmlFor:"",children:t})}),e.jsx("input",{type:"email",...m(s,{required:`${t} es requerido`,pattern:{value:l,message:"Ingrese un correo electrónico válido"},minLength:{value:r,message:`${t} debe ser mayor a ${r} caracteres`},maxLength:{value:n,message:`${t} debe ser menor a ${n} caracteres`}}),className:"text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none",onFocus:a,onBlur:h}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center bg-transparent p-2",children:e.jsx($,{icon:p,className:"text-black text-2xl"})})]}),u[s]&&e.jsx("p",{className:"text-red-500 text-xs",children:(f=u[s])==null?void 0:f.message})]})},ne=({value:t,onChange:s})=>{const n=c=>Number(c).toLocaleString("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:0}).replace("$",""),[r,m]=o.useState(n(t)),u=c=>{const i=c.target.value.replace(/,/g,"");if(!isNaN(i)){const d=n(i);m(d),s&&s(Number(i))}};return e.jsx("div",{children:e.jsx(z,{children:e.jsxs(C.div,{className:"relative ",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:e.jsx($,{icon:"mdi:dollar",className:"text-green-500"})}),e.jsx(C.input,{type:"text",className:"text-white bg-transparent p-2 border border-gray-300 shadow-sm pl-8 pr-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",value:r,onChange:u,initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:10}})]})})})},ae=({change:t})=>e.jsx("div",{className:"relative w-full ",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",className:`text-white rounded-lg p-3 pr-10 pl-12 px-3\r
              w-full focus:outline-none bg-zinc-800 text-xl`,placeholder:"Buscar",onChange:t}),e.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center p-2 ",children:e.jsx($,{icon:"material-symbols:search",className:"text-white text-3xl"})})]})}),re=({options:t,placeholder:s,onChange:n,value:r,w:m="w-full",opt:u=!1,text:c,click:i,icon:d=!1,styles:p,desc:l=!1})=>{const[a,h]=o.useState(!1),f=()=>{h(!a)};return e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:`appearance-none rounded px-3 py-4 ${m} text-white leading-tight focus:outline-none pr-10 bg-zinc-800`,onClick:f,children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{children:r?r.label:s}),e.jsx($,{icon:"material-symbols:expand-more",className:`text-3xl text-white absolute right-1 flex items-center ${a?"rotate-180":""}`})]})}),e.jsx(z,{children:a&&e.jsx(C.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},className:"absolute w-full bg-zinc-800 shadow-md mt-1 rounded text-white z-10",children:e.jsxs("ul",{className:"max-h-60 overflow-y-auto",children:[t.map((x,v)=>e.jsx("li",{className:"px-3 py-2 rounded hover:bg-gray-600",children:l?e.jsxs("div",{className:`w-full text-left ${p}`,children:[x.label,e.jsx("p",{children:x.cantidad}),d&&e.jsx($,{icon:x.icono})]}):e.jsxs("button",{className:`w-full text-left focus:outline-none ${p}`,onClick:g=>{g.preventDefault(),n(x),f()},children:[x.label,d&&e.jsx($,{icon:x.icono})]})},v)),u&&e.jsxs("button",{className:"w-full flex items-center justify-between p-3 hover:bg-gray-600 relative",onClick:i,children:[c,e.jsx($,{icon:"arcticons:mapsgeobookmarks"})]})]})})})]})},le=({options:t,placeholder:s,onChange:n,value:r})=>{const[m,u]=o.useState(!1),[c,i]=o.useState([]);o.useEffect(()=>{n(c)},[c,n]);const d=()=>{u(!m)},p=a=>{const h=c.findIndex(f=>f.value===a.value);if(h>-1){const f=[...c];f.splice(h,1),i(f)}else i([...c,a])},l=a=>c.some(h=>h.value===a.value);return e.jsxs("div",{className:"relative w-5/6",children:[e.jsx("div",{className:"appearance-none px-3 py-2 w-full leading-tight focus:outline-none pr-10 border-b-2",onClick:d,children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{children:c.length>0?c.map(a=>a.label).join(", "):s}),e.jsx($,{icon:"material-symbols:expand-more",className:`text-3xl text-white mb-2 bg-red-600 rounded-full absolute right-1 flex items-center ${m?"rotate-180":""}`})]})}),e.jsx(z,{children:m&&e.jsx(C.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},className:"absolute w-full bg-black shadow-md mt-1 border-b-2 text-white z-10 overflow-y-auto max-h-40",style:{scrollbarWidth:"none",msOverflowStyle:"auto",overflow:"-webkit-overflow-scrolling"},children:e.jsx("ul",{children:t.map((a,h)=>e.jsx("li",{className:"px-3 py-2 hover:bg-zinc-800 border-b-2",children:e.jsxs("label",{htmlFor:`option-${h}`,className:"cursor-pointer flex items-center",children:[e.jsxs("div",{children:[e.jsx("span",{children:a.label}),e.jsx("span",{className:"text-red-600 text-sm font-medium block",children:a.extraText})]}),e.jsx("input",{type:"checkbox",id:`option-${h}`,className:`ml-auto size-4 ${l(a)?"bg-black":""}`,checked:l(a),onChange:()=>p(a)})]})},h))})})})]})};export{le as C,J as I,ne as M,se as V,Q as a,ae as b,ee as c,te as d,Y as e,re as f};