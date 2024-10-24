import{r as s,u as I,j as e}from"./index-Bw8vxug1.js";import{m as a,B as f}from"./Buttons-CLO9Hq2r.js";import{R as O}from"./Modal-Cm8uXV9W.js";import{P as R}from"./Cards-BKGAikPv.js";import"./Inputs-BnIsm3X-.js";import"./index.esm-v9O0ghl2.js";function S(t,i,o){return typeof t=="string"?t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const V={some:0,all:1};function M(t,i,{root:o,margin:d,amount:c="some"}={}){const m=S(t),l=new WeakMap,p=u=>{u.forEach(n=>{const x=l.get(n.target);if(n.isIntersecting!==!!x)if(n.isIntersecting){const y=i(n);typeof y=="function"?l.set(n.target,y):r.unobserve(n.target)}else x&&(x(n),l.delete(n.target))})},r=new IntersectionObserver(p,{root:o,rootMargin:d,threshold:typeof c=="number"?c:V[c]});return m.forEach(u=>r.observe(u)),()=>r.disconnect()}function g(t,{root:i,margin:o,amount:d,once:c=!1}={}){const[m,l]=s.useState(!1);return s.useEffect(()=>{if(!t.current||c&&m)return;const p=()=>(l(!0),c?void 0:()=>l(!1)),r={root:i&&i.current||void 0,margin:o,amount:d};return M(t.current,p,r)},[i,t,o,c,d]),m}const q=()=>{const{publicidad:t,user:i}=I(),[o,d]=s.useState({imagen:"",posicion:""}),[c,m]=s.useState(0),[l,p]=s.useState(!1),r=s.useRef(null),u=g(r,{triggerOnce:!1}),n=s.useRef(null),x=g(n,{triggerOnce:!1}),y=s.useRef(null),h=g(y,{triggerOnce:!1}),b=s.useRef(null),j=g(b,{triggerOnce:!1}),w=s.useRef(null);return s.useEffect(()=>{i&&!i.telefono&&w.current!==i.telefono&&p(!0),w.current=i?i.telefono:null},[i]),s.useEffect(()=>{if(t.length>0){const N=()=>{const E=Math.floor(Math.random()*t.length);d(t[E]),m(0),setTimeout(()=>m(1),100)};N();const v=setInterval(N,1e4);return()=>clearInterval(v)}},[t]),e.jsxs("main",{children:[e.jsx(R,{}),e.jsxs("section",{className:"relative w-full h-screen",children:[e.jsx(a.img,{src:`https://labarbada.store/img/${o.imagen}`,alt:"imagen home",className:"w-full h-full object-cover",initial:{opacity:0},animate:{opacity:c},transition:{duration:1},loading:"lazy"},o.imagen),e.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-gray-900",children:[e.jsx(a.h1,{className:"lg:w-2/5 md:w-3/4 text-center text-4xl lg:text-6xl text-white font-bold mb-4 italic sombra-letras",initial:{y:-50,opacity:0},animate:{y:0,opacity:1},transition:{duration:1,delay:.5},children:o.posicion},o.posicion),e.jsx(f,{icon:"mdi:delivery-dining",text:"PIDELOS A DOMICILIO",to:"/menu"})]})]}),e.jsxs(a.section,{ref:r,className:"flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto",initial:{opacity:0,y:50},animate:u?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut"},children:[e.jsxs(a.div,{className:"w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1",initial:{opacity:0,x:-100},animate:u?{opacity:1,x:0}:{opacity:0,x:-100},transition:{duration:.8,delay:.2},children:[e.jsx("h2",{className:"text-md lg:text-4xl font-bold mb-4",children:"Mariscos, cortes y enchiladas huastecas en La Barbada Restaurante"}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"Donde se sirven los mariscos más frescos, los cortes de carne más tiernos y el bar más abastecido."}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"¡Vengan a hacerse piratas de la buena comida!"}),e.jsx(f,{icon:"material-symbols:restaurant-menu",text:"EXPLORAR MENÚ",to:"/menu"})]}),e.jsx(a.div,{className:"w-full md:w-1/2 order-2 md:order-2",initial:{opacity:0,x:100},animate:u?{opacity:1,x:0}:{opacity:0,x:100},transition:{duration:.8,delay:.2},children:e.jsx("img",{src:"/img/vista1.jpg",alt:"",className:"w-full h-auto",loading:"lazy"})})]}),e.jsxs(a.section,{ref:n,className:"flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto",initial:{opacity:0,y:50},animate:x?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut"},children:[e.jsxs(a.div,{className:"w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-2",initial:{opacity:0,x:100},animate:x?{opacity:1,x:0}:{opacity:0,x:-100},transition:{duration:.8,delay:.2},children:[e.jsx("h2",{className:"text-md lg:text-4xl font-bold mb-4",children:"Reservaciones en linea"}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"Reserva tu mesa ahora en La Barbada Restaurante y prepárate para una experiencia culinaria inolvidable."}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"¡No pierdas la oportunidad de convertirte en un capitán de la buena comida!"}),e.jsx(f,{icon:"ion:calendar-number",text:"RESERVA AHORA",to:"https://api.whatsapp.com/send?phone=7712451795"})]}),e.jsx(a.div,{className:"w-full md:w-1/2 order-2 md:order-1",initial:{opacity:0,x:-100},animate:x?{opacity:1,x:0}:{opacity:0,x:100},transition:{duration:.8,delay:.2},children:e.jsx("img",{src:"/img/vista2.jpg",alt:"Vista reservaciones",className:"w-full h-auto",loading:"lazy"})})]}),e.jsxs(a.section,{ref:y,className:"flex flex-col bg-[#E20714] md:flex-row justify-center items-center min-h-[63vh] w-full px-4 md:px-0",initial:{opacity:0,y:50},animate:h?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut"},children:[e.jsxs(a.div,{className:"w-full md:w-1/3 p-4 flex flex-col items-center",initial:{opacity:0,y:50},animate:h?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut",delay:.1},children:[e.jsx("h2",{className:"font-bold",children:"UBICACIÓN"}),e.jsx("img",{src:"/img/timon.svg",alt:"",className:" w-56 h-56",loading:"lazy"}),e.jsx("p",{className:"text-center",children:"Estamos ubicados en Huejutla de Reyes, Hidalgo, Carretera México - Pachuca KM 214, a 100 metros de la clínica ISSSTE."}),e.jsx(f,{icon:"simple-icons:googlemaps",text:"VER MAPA",to:"/nosotros#ubicacion"})]}),e.jsxs(a.div,{className:"w-full md:w-1/3 p-4 flex flex-col items-center lg:border-l lg:border-r border-black",initial:{opacity:0,y:50},animate:h?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut",delay:.2},children:[e.jsx("h2",{className:"font-bold",children:"EQUIPO"}),e.jsx("img",{src:"/img/pulpo.png",alt:"",className:"w-56 h-56",loading:"lazy"}),e.jsx("p",{className:"text-center",children:"En La Barbada queremos ofrecerte la mejor experiencia, en un lugar cómodo, platillos exquisitos, y una atención digna de un capitán."}),e.jsx(f,{icon:"",text:"CONOCENOS",to:"/nosotros"})]}),e.jsxs(a.div,{className:"w-full md:w-1/3 p-4 flex flex-col items-center",initial:{opacity:0,y:50},animate:h?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut",delay:.3},children:[e.jsx("h2",{className:"font-bold",children:"HISTORIA"}),e.jsx("img",{src:"/img/barco.png",alt:"",className:"w-56 h-56",loading:"lazy"}),e.jsx("p",{className:"text-center",children:"20 años de un exquisito viaje, cuando todo comenzó como un pequeño botanero familiar, hoy tenemos el gusto de celebrar contigo la rica cocina que hemos perfeccionado a través de los años."}),e.jsx(f,{icon:"",text:"LEER MÁS...",to:"/nosotros"})]})]}),e.jsxs(a.section,{ref:b,className:"flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto",initial:{opacity:0,y:50},animate:j?{opacity:1,y:0}:{opacity:0,y:50},transition:{duration:.8,ease:"easeOut"},children:[e.jsxs(a.div,{className:"w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1",initial:{opacity:0,x:-100},animate:j?{opacity:1,x:0}:{opacity:0,x:-100},transition:{duration:.8,ease:"easeOut",delay:.2},children:[e.jsx("h2",{className:"text-md lg:text-4xl font-bold mb-4",children:"Instalaciones"}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"Ponemos a tus ordenes un área climatizada, con capacidad de 100 personas, terraza con un paisaje fotográfico, y un salón con capacidad de 300 personas."}),e.jsx("p",{className:"text-[0.678rem] md:text-base mb-4",children:"¡Dale un vistazo al tour digital de las instalaciones!"}),e.jsx(f,{icon:"fluent-mdl2:video-360-generic",text:"VER 360"})]}),e.jsx(a.div,{className:"w-full md:w-1/2 order-2 md:order-2",initial:{opacity:0,x:100},animate:j?{opacity:1,x:0}:{opacity:0,x:100},transition:{duration:.8,ease:"easeOut",delay:.2},children:e.jsx("img",{src:"/img/vista1.jpg",alt:"Vista de las instalaciones",className:"w-full h-auto",loading:"lazy"})})]}),l&&e.jsx(O,{isOpen:l,onClose:p})]})};export{q as default};
