import{p as f,f as h,k as v,j as e,I as d,L as m,B as c,v as b}from"./index-Bw8vxug1.js";const g=async s=>{try{const{data:a}=await b(s);return a}catch(a){throw console.error("Error en fetchTransactionStatus:",a),a}};function N(){const s=f(),a=new URLSearchParams(s.search),o=a.get("id"),r=a.get("method"),{crearVenta:x}=h(),{data:n,status:i,error:j}=v(["transactionStatus",o],()=>g(o),{enabled:r==="openpay"&&!!o,onSuccess:async l=>{if(l&&l.status==="completed"){const t=JSON.parse(localStorage.getItem("ventaData"));if(t)try{await x(t.userId,t.total,t.direccion,t.tipoPago,t.total,0,t.carrito,t.email,t.telefono)&&(c.success("¡Gracias por su compra!"),console.log("venta realizada"),localStorage.removeItem("ventaData"))}catch{c.error("Error al realizar la venta")}}else c.error("Error en la transacción, por favor inténtalo de nuevo."),localStorage.removeItem("ventaData")}});if(r==="openpay"&&i==="loading")return e.jsx("div",{className:"text-white",children:"Verificando transacción..."});if(r==="openpay"&&(i==="error"||n&&n.status!=="completed"))return e.jsx("div",{className:"min-h-screen bg-black flex items-center justify-center",children:e.jsxs("div",{className:"text-center flex flex-col justify-center items-center text-white",children:[e.jsx(d,{icon:"ep:close-filled",className:"text-red-500 text-6xl mb-4"}),e.jsx("h1",{className:"text-4xl font-bold mb-2",children:"Transacción Fallida"}),e.jsx("p",{className:"text-lg mb-6",children:"Hubo un problema con tu pedido. Por favor, inténtalo de nuevo."}),e.jsx(m,{to:"/",className:"bg-red-500 hover:bg-red-700 text-black py-2 px-4 rounded-md",children:"Volver al inicio"})]})});const u=r==="efectivo"?"Tu pedido ha sido recibido. Por favor, sigue las instrucciones para completar el pago en efectivo.":"Tu pedido ha sido recibido y lo estamos procesando. Pronto recibirás más información.";return e.jsx("div",{className:"min-h-screen bg-black flex items-center justify-center",children:e.jsxs("div",{className:"text-center flex flex-col justify-center items-center text-white",children:[e.jsx(d,{icon:"ep:success-filled",className:"text-green-500 text-6xl mb-4"}),e.jsx("h1",{className:"text-4xl font-bold mb-2",children:"¡Gracias por tu pedido!"}),e.jsx("p",{className:"text-lg mb-6",children:u}),e.jsx(m,{to:"/",className:"bg-red-500 hover:bg-red-700 text-black py-2 px-4 rounded-md",children:"Volver al inicio"})]})})}export{N as default};