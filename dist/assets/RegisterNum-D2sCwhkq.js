import{u as D,b as B,r as n,B as F,j as e}from"./index-Bw8vxug1.js";import{u as R}from"./index.esm-v9O0ghl2.js";import{V,c as A,d as L,a as T,e as q}from"./Inputs-BnIsm3X-.js";import{a as m,C as z}from"./Buttons-CLO9Hq2r.js";function G(){const{register:s,handleSubmit:c,formState:{errors:r},setValue:o,watch:i,trigger:l}=R(),{signup:x,findOutNumber:h,confirmCode:g,searchPhone:f,isAuthenticade:d}=D(),j=B(),[p,b]=n.useState(!1),[N,v]=n.useState(!1),[y,w]=n.useState(!1),[C,S]=n.useState(null);n.useEffect(()=>{d&&j("/");const t=a=>{a.preventDefault();const u="si";return a.returnValue=u,u};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}},[d]);const I=c(async t=>{try{await f(t.tel)&&(S(t.tel),await h(t.tel),b(!0))}catch(a){console.log(a)}}),E=c(async t=>{try{await g(t.code)&&v(!0)}catch(a){console.log(a)}}),k=c(async t=>{try{if(!y){F.info("Debes aceptar los términos y condiciones para registrarte.");return}await x(t.correo,C,t.pass)}catch(a){console.log(a)}}),P=t=>{w(t)};return e.jsx("div",{className:"min-h-screen",children:e.jsx("div",{className:"flex justify-center items-center min-h-screen",children:e.jsx("div",{className:"w-full md:w-96",children:e.jsxs("div",{className:"bg-zinc-800 p-4 shadow-white rounded-md",children:[e.jsx("div",{className:"min-h-20 flex items-center justify-center mb-6",children:e.jsx("img",{src:"/img/emblema.png",alt:"Logo de la Empresa",className:"w-full max-w-full max-h-full"})}),N?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"mb-1 text-magenta text-gray-200 font-bold",children:"¡Ya casi terminamos!"}),e.jsx("p",{className:"text-gray-400 mb-4",children:"Introduce tu correo electronico y crear una nueva contraseña para terminar el registro."})]}),e.jsxs("form",{onSubmit:k,className:"space-y-5",children:[e.jsx(L,{title:"Correo",name:"correo",min:"10",max:"100",err:r,method:s,look:i}),e.jsx(T,{title:"Contraseña",name:"pass",min:"8",max:"16",err:r,method:s,look:i,val:o,triger:l}),e.jsx(q,{title:"Contraseña",name:"passConf",min:"8",max:"16",err:r,method:s,look:i,val:o,triger:l}),e.jsx(z,{register:s,onCheckboxChange:P}),e.jsx(m,{text:"Registrarse"})]})]}):p?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:" b-1 text-magenta text-gray-200 font-bold",children:"¡Introduce el codigo!"}),e.jsx("p",{className:"text-gray-400 mb-4",children:"Introduce el código de verificación que ha llegado a tu teléfono."})]}),e.jsxs("form",{onSubmit:E,className:"space-y-5",children:[e.jsx(V,{title:"Código de verificación",name:"code",min:"6",max:"6",pattern:/\D/,err:r,method:s,val:o}),e.jsx(m,{text:"verificar código"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"mb-1 text-magenta text-gray-200 font-bold",children:"¡Hola! Registrate ahora"}),e.jsx("p",{className:"text-gray-400 mb-4",children:"Introduce tu número de teléfono te enviaremos un código de verificación."})]}),e.jsxs("form",{onSubmit:I,className:"space-y-5",children:[e.jsx(A,{title:"Teléfono",name:"tel",min:"10",max:"10",err:r,method:s,look:i,val:o,triger:l}),e.jsx("div",{id:"recaptcha"}),e.jsx(m,{text:"Enviar código"})]})]})]})})})})}export{G as default};
