import React, { useState, useEffect } from 'react'

import { ButtonBasic, MenuButton } from './Buttons'
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useStore } from '../routes/context/StoreContext'
import { useAuth } from '../routes/context/AuthContext';
//import { DescripcionPlatilloRouter } from '../utils/api/urlStore';


export const CardMenu = ({ id, img, title, precio, etiqueta }) => {
  const [loading, setLoading] = useState(true);
  const { InsertarCarrito } = useStore();
  const { isAuthenticade, setNumeroProductos, numeroProductos } = useAuth();
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const RedirectRoute = async () => {
    try {
      setLoading(true);
      localStorage.setItem("platillo", title);
      navigate(`/platillo/${title}`);
    } catch (error) {
      toast.error("No se pudo obtener el platillo");
    } finally {
      setLoading(false);
    }
  };

  const getEtiquetaClass = () => {
    if (etiqueta === "oferta") return "bg-red-600";
    if (etiqueta === "nuevo") return "bg-[#35bcb5]";
    return "";
  };
  
  const Agregar = async () => {
    if (isAuthenticade) {
      try {
        const prec = parseFloat(precio);
        const idUser = localStorage.getItem("id");
        
        // Verificar si hay conexión a Internet
        if (!navigator.onLine) {
          // Si no hay conexión, agregar al carrito offline
          const carritoOffline = JSON.parse(localStorage.getItem('carritoOffline')) || [];
          carritoOffline.push({ id, idUser, cantidad: 1, precio: prec });
          localStorage.setItem('carritoOffline', JSON.stringify(carritoOffline));
          // Establecer el estado de sincronización como "0" (no sincronizado)
          localStorage.setItem('syncStatus', '0')
          setNumeroProductos(numeroProductos + 1)
          // Mostrar mensaje informando que el platillo fue agregado offline
          toast.info("Se agregara cuando se conecte a Internet");
          return;
        }
  
        // Si hay conexión, agregar al carrito en línea
        const res = await InsertarCarrito(id, idUser, 1, prec);
        if (res) {
          toast.success("Platillo agregado al carrito");
          setTimeout(() => {
            navigate("/shoppingcar");
          }, 1000);
        }
      } catch (error) {
        toast.error("Error al agregar al carrito");
      }
    } else {
      navigate("/login");
    }
  };
  
  // const Agregar = async () => {
  //   if (isAuthenticade) {
  //     try {
  //       const prec = parseFloat(precio);
  //       const idUser = localStorage.getItem("id");
  //       const res = await InsertarCarrito(id, idUser, 1, prec);
  //       if (res) {
  //         toast.success("Platillo agregado al carrito");
  //         setTimeout(() => {
  //           navigate("/shoppingcar");
  //         }, 1000);
  //       }
  //     } catch (error) {
  //       toast.error("Error al agregar al carrito");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-zinc-800 relative">
      <button className="w-full" onClick={RedirectRoute}>
        <div ref={ref} className="w-full h-36 flex items-center justify-center bg-[#282828] rounded-t-xl">
          {inView && (
            <img
              className={`w-full h-36 object-cover rounded-t-xl transition-opacity duration-500 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              src={`https://labarbada.store/img/${img}`}
              alt="imagen"
              onLoad={() => setLoading(false)}
            />
          )}
          {loading && (
            <div className="w-full h-36 bg-[#282828] flex items-center justify-center rounded-t-xl">
              <span className="text-gray-400">Cargando...</span>
            </div>
          )}
        </div>
      </button>
      {(etiqueta === "oferta" || etiqueta === "nuevo") && (
        <div className={`absolute top-0 right-0 px-2 py-1 text-white text-sm font-bold rounded-l ${getEtiquetaClass()}`}>
          {etiqueta}
        </div>
      )}
      <div className="w-full flex">
        <div className="px-6 py-4 flex flex-col text-lg w-3/5">
          <h2>{title}</h2>
          <p className="text-orange-500 font-bold text-2xl">${precio}</p>
        </div>
        <div className="w-2/5 p-1 m-1 flex items-center justify-end">
          <MenuButton fun={Agregar} />
        </div>
      </div>
    </div>
  );
};


export const CardMenuLoading = () => {
  return (
    <motion.div
      className="max-w-sm rounded-xl overflow-hidden bg-zinc-800 relative animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-36 bg-[#282828] rounded-t-xl flex items-center justify-center">
        <div className="w-24 h-24 bg-gray-600 rounded-full"></div>
      </div>
      <div className="w-full flex">
        <div className="px-6 py-4 flex flex-col text-lg w-3/5">
          <div className="bg-gray-600 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-600 h-4 w-1/2"></div>
        </div>
        <div className="w-2/5 p-1 m-1 flex items-center justify-end">
          <div className="bg-gray-600 h-10 w-10 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};


export const CardCar = ({title, img, p, precio, delet, plus, less, count}) =>{
  return(
    <div className='w-[90%] sm:w-[80%] md:w-3/4 h-auto md:h-28 bg-[#282828] rounded-3xl flex flex-col md:flex-row items-center justify-around p-4 mb-4 mx-auto'>
      <img 
        src={`https://labarbada.store/img/${img}`} 
        alt={title} 
        className='w-full h-32 md:w-[10%] md:h-auto rounded-2xl object-cover mb-2 md:mb-0' 
      />
      
      <h2 className='w-full md:w-[15%] text-center md:text-left'>{title}</h2>

      <div className="hidden md:flex w-full md:w-[25%] h-16 md:h-3/4 overflow-auto justify-center items-center" style={{ scrollbarWidth: "none"}}>
        <p className='text-xs text-center md:text-left'>{p}</p>
      </div>

      <div className='w-full md:w-[14%] flex justify-center items-center space-x-2 h-16 md:h-2/5'>
        <ButtonBasic icon='material-symbols:check-indeterminate-small-rounded' color='bg-zinc-800' hovColor='hover:bg-zinc-400' border='border' width='w-1/4 sm:w-1/3 md:w-2/5' height='h-8 sm:h-full' click={less} />
        <p>{count}</p>
        <ButtonBasic icon='ic:baseline-plus' color='bg-zinc-800' hovColor='hover:bg-zinc-400' border='border' width='w-1/4 sm:w-1/3 md:w-2/5' height='h-8 sm:h-full' click={plus} />
      </div>

      <p className='w-full md:w-[7%] text-center md:text-left'>${precio}</p>

      <div className='w-full md:w-[16%] flex justify-center items-center'>
        <ButtonBasic text='Eliminar' icon='mdi:trash-outline' color='bg-red-500' hovColor='hover:bg-red-600' textHover='' width='w-full md:w-4/5' click={delet} />
      </div>
    </div>
  )
}

export const ResumenPago = ({ items }) => {
  // Calcula el total a pagar sumando los subtotales
  const totalAPagar = items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

  return (
    <div className="bg-[#151515] text-slate-100 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Resumen de Pago</h2>
      <div className="mb-4">
        <div className="hidden md:grid grid-cols-3 border-b border-gray-700 pb-2">
          <span>Producto</span>
          <span className="text-center">Cantidad</span>
          <span className="text-right">Precio</span>
        </div>
        {items.map((item, index) => (
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-700 py-2" key={index}>
            <span>{item.nombre_platillo}</span>
            <span className="md:text-center">{item.cantidad}</span>
            <span className="md:text-right">${item.subtotal}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xl font-bold">
        <span>Total a Pagar:</span>
        <span>${totalAPagar.toFixed(2)}</span>
      </div>
    </div>
  );
}

export const PwaNotice = () => {
  const [isVisible, setIsVisible] = useState(false); // Mostrar modal solo si la PWA es instalable
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Guardar el evento `beforeinstallprompt`
  const [isInstalling, setIsInstalling] = useState(false); // Estado de instalación
  const [isIos, setIsIos] = useState(false); // Detectar si es iOS

  // Detectar si es un dispositivo iOS
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);

    // Detectar si está en el navegador Safari
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);

    if (isIosDevice && isSafari && !window.navigator.standalone) {
      setIsIos(true);
      setIsVisible(true); // Mostrar el modal para dar instrucciones
    }
  }, []);

  // Escuchar el evento `beforeinstallprompt` para mostrar el botón de descarga en Android
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevenir que se muestre el prompt de instalación automáticamente
      setDeferredPrompt(e); // Guardar el evento para ser usado más tarde
      setIsVisible(true); // Mostrar el modal para ofrecer la instalación
    };

    // Agregar listener para el evento en Android o navegadores compatibles
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Función para manejar la instalación de la PWA en Android
  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      setIsInstalling(true); // Mostrar que está instalando
      deferredPrompt.prompt(); // Mostrar el prompt de instalación

      const { outcome } = await deferredPrompt.userChoice; // Esperar a que el usuario responda
      setIsInstalling(false); // Dejar de mostrar que está instalando

      if (outcome === "accepted") {
        console.log("El usuario aceptó instalar la PWA");
      } else {
        console.log("El usuario rechazó instalar la PWA");
      }

      setDeferredPrompt(null); // Limpiar el prompt para evitar que se vuelva a mostrar
      setIsVisible(false); // Ocultar el modal
      localStorage.setItem("pwaAccepted", "true"); // Guarda la aceptación en localStorage
    }
  };

  // Verifica si el usuario ya aceptó la instalación previamente
  useEffect(() => {
    const pwaAccepted = localStorage.getItem("pwaAccepted");
    if (pwaAccepted) {
      setIsVisible(false);
    }
  }, []);

  // Si no es visible, no mostrar el modal
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 p-4 rounded-lg shadow-lg border max-w-sm md:max-w-lg z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">🚀</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{isIos ? "Agregar a pantalla de inicio" : "Descarga la app"}</h2>
          <p className="text-sm text-gray-300">
            {isIos
              ? "Para agregar esta aplicación a tu pantalla de inicio en iOS, abre el menú de compartir en Safari y selecciona 'Agregar a pantalla de inicio'."
              : "Te damos la opción de descargarla en tu dispositivo móvil."}
          </p>
        </div>
        {!isIos ? ( // Mostrar botón solo si no es iOS (Android)
          <button
            onClick={handleInstallPwa}
            className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-500 ${isInstalling ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isInstalling} // Deshabilitar el botón mientras se instala
          >
            {isInstalling ? (
              <div className="flex items-center space-x-2">
                <div className="loader-spinner"></div> {/* Spinner opcional */}
                <span>Instalando...</span>
              </div>
            ) : (
              "Descargar"
            )}
          </button>
        ) : (
          <button
            onClick={() => setIsVisible(false)} // Cerrar el modal en iOS
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

// export const PwaNotice = () => {
//   const [isVisible, setIsVisible] = useState(false); // Mostrar modal solo si la PWA es instalable
//   const [deferredPrompt, setDeferredPrompt] = useState(null); // Guardar el evento `beforeinstallprompt`
//   const [isInstalling, setIsInstalling] = useState(false); // Estado de instalación

//   // Escuchar el evento `beforeinstallprompt` para mostrar el botón de descarga
//   useEffect(() => {
//     const handleBeforeInstallPrompt = (e) => {
//       console.log("beforeinstallprompt event triggered"); // Para depuración
//       e.preventDefault(); // Prevenir que se muestre el prompt de instalación automáticamente
//       setDeferredPrompt(e); // Guardar el evento para ser usado más tarde
//       setIsVisible(true); // Mostrar el modal para ofrecer la instalación
//     };

//     // Agregar listener para el evento
//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     };
//   }, []);

//   // Función para manejar la instalación de la PWA
//   const handleInstallPwa = async () => {
//     if (deferredPrompt) {
//       setIsInstalling(true); // Mostrar que está instalando
//       deferredPrompt.prompt(); // Mostrar el prompt de instalación

//       const { outcome } = await deferredPrompt.userChoice; // Esperar a que el usuario responda
//       setIsInstalling(false); // Dejar de mostrar que está instalando

//       if (outcome === "accepted") {
//         console.log("El usuario aceptó instalar la PWA");
//       } else {
//         console.log("El usuario rechazó instalar la PWA");
//       }

//       setDeferredPrompt(null); // Limpiar el prompt para evitar que se vuelva a mostrar
//       setIsVisible(false); // Ocultar el modal
//       localStorage.setItem("pwaAccepted", "true"); // Guarda la aceptación en localStorage
//     }
//   };

//   // Verifica si el usuario ya aceptó la instalación previamente
//   useEffect(() => {
//     const pwaAccepted = localStorage.getItem("pwaAccepted");
//     if (pwaAccepted) {
//       setIsVisible(false);
//     }
//   }, []);

//   // Solo mostrar el modal si el evento `beforeinstallprompt` ha sido capturado
//   if (!isVisible) return null;

//   return (
//     <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 p-4 rounded-lg shadow-lg border max-w-sm md:max-w-lg z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg">
//       <div className="flex items-start space-x-3">
//         <div className="text-2xl">🚀</div>
//         <div className="flex-1">
//           <h2 className="text-lg font-bold">Descarga la app</h2>
//           <p className="text-sm text-gray-300">
//             Te damos la opción de descargarla en tu dispositivo móvil.
//           </p>
//         </div>
//         <button
//           onClick={handleInstallPwa}
//           className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-500 ${isInstalling ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={isInstalling} // Deshabilitar el botón mientras se instala
//         >
//           {isInstalling ? (
//             <div className="flex items-center space-x-2">
//               <div className="loader-spinner"></div> {/* Spinner opcional */}
//               <span>Instalando...</span>
//             </div>
//           ) : (
//             "Descargar"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export const PwaNotice = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   // Función para manejar la aceptación de cookies
//   const handleAccept = () => {
//     setIsVisible(false);
//     localStorage.setItem("pwaAccepted", "true"); // Guarda la aceptación en localStorage
//   };

//   // Verifica si el usuario ya aceptó las cookies previamente
//   useEffect(() => {
//     const pwaAccepted = localStorage.getItem("pwaAccepted");
//     if (pwaAccepted) {
//       setIsVisible(false);
//     }
//   }, []);

//   if (!isVisible) return null;

//   return (
//   <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 p-4 rounded-lg shadow-lg border max-w-sm md:max-w-lg z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg ">
//     <div className="flex items-start space-x-3">
//       <div className="text-2xl">🚀</div>
//       <div className="flex-1">
//         <h2 className="text-lg font-bold">Descarga la app</h2>
//         <p className="text-sm text-gray-300">
//           Te damos la opción de descargar la en tu dispositivo movil.{" "}
//         </p>
//       </div>
//       <button
//         onClick={handleAccept}
//         className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
//       >
//         Descargar
//       </button>
//     </div>
//   </div>
//   );
// };

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer border-b rounded-t-lg bg-gray-200"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium text-gray-700">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
            />
          </svg>
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          style={{ overflow: 'hidden' }}
          className="p-4 bg-white rounded-b-lg"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}