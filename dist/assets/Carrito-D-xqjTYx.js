import{f as E,u as _,r as c,b as O,j as r,i as L,B as x,O as B}from"./index-Bw8vxug1.js";import{b as P}from"./Cards-BKGAikPv.js";import{a as D}from"./Buttons-CLO9Hq2r.js";const k=()=>{const{UpdateCar:l,DeleteShoppingCar:f}=E(),{setNumeroProductos:h,numeroProductos:m}=_(),[n,i]=c.useState([]),[p,g]=c.useState(0),[y,j]=c.useState(!0),d=localStorage.getItem("id"),b=O();c.useEffect(()=>{(async()=>{try{const e=await B(d);if(e){let o=e.data[0].length;h(o),i(e.data[0]);const a=e.data[0].reduce((s,v)=>s+parseFloat(v.subtotal),0);g(a)}}catch(e){console.log(e),console.error("Error fetching cart data:",e)}finally{j(!1)}})()},[d,n]);const w=async(t,e,o)=>{try{const a=Math.max(1,e-1),s=a*o;await l(t,a,s)}catch(a){console.error("Error updating cart item:",a),x.error("Error updating cart item")}},C=async t=>{try{await f(t),i(e=>e.filter(o=>o.id_carrito!==t))}catch(e){console.error("Error deleting cart item:",e)}},N=async(t,e,o)=>{try{const a=e+1,s=a*o;await l(t,a,s)}catch(a){console.error("Error updating cart item:",a)}},u=JSON.parse(localStorage.getItem("carritoOffline"))||[],S=u.length;return y?r.jsx(L,{}):r.jsxs("main",{className:"w-full h-screen flex flex-col justify-center items-center space-y-4",children:[r.jsx("h1",{className:"text-white text-5xl font-semibold mt-14 mb-8 text-center",children:"Carrito"}),r.jsx("section",{className:"w-11/12 h-[70vh] overflow-y-auto",style:{scrollbarWidth:"none"},children:r.jsxs("div",{className:"flex flex-col items-center space-y-5",children:[!navigator.onLine&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"text-center text-neutral-400",children:["Existen ",m," en el carrito."]}),u>0&&r.jsxs("div",{className:"text-center text-neutral-400",children:["Se agregaron ",S," platillos en el carrito sin conexion a internet."]})]}),n.map((t,e)=>r.jsx(P,{img:t.imagen_platillo,title:t.nombre_platillo,p:t.descripcion_platillo,count:t.cantidad,precio:t.subtotal,less:()=>w(t.id_carrito,t.cantidad,t.precio_unitario),plus:()=>N(t.id_carrito,t.cantidad,t.precio_unitario),delet:()=>C(t.id_carrito)},e))]})}),r.jsxs("section",{className:"w-11/12 sm:w-[68%] flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-7",children:[r.jsxs("h3",{className:"text-4xl font-semibold",children:["$",p.toFixed(2)]}),r.jsx(D,{width:"w-full sm:w-[15%]",text:"Confirmar",textHover:"",hovColor:"hover:bg-[#098BD1]",click:()=>{n.length>0?b("/payment"):x.error("No hay nada en el carrito")}})]})]})};export{k as default};
