import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CategoriasRoute, CrearVentaRoute, DeleteCarRoute, InsertarCarritoRoute, MenuCategoriaRoute, MenuNombreRoute, MenuRoute, ObtenerCarritoRoute, PagoTarjetaRoute, UpdateShoppingCarRoute } from "../../utils/api/urlStore";
// import { requestNotificationPermission } from "../../utils/firebase/firebase";

export const StoreContext = createContext()

export const useStore = () =>{
  const context = useContext(StoreContext)
  if(!context)  throw new Error('Error de provedor con StoreContextPublic')
  return context
}

const fetchPlatillos = async () => {
  const { data } = await MenuRoute()
  return data
};

const fetchPlatillosPorCategoria = async (categoriaId) => {
  const { data } = await MenuCategoriaRoute(categoriaId)
  return data
}

const buscarPlatillosPorNombre = async (nombre) => {
  const { data } = await MenuNombreRoute({nombre}) 
  return data
}

export const StoreProvider = ({children}) =>{
  const [listMenu, setListMenu] = useState([])
  const [category, setCategory] = useState([])
  const [succesStore, setSuccesStore] = useState([])
  const [errorStore, setErrorStore] = useState([])
  const [errorPayment, setErrorPayment] = useState([])
  const [seleccion, setSeleccion] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [noResult, setNoResult] = useState(false)
  const [ofertasPrevias, setOfertasPrevias] = useState([]);
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const id = localStorage.getItem('id')
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState(() => {
    return localStorage.getItem('syncStatus') || '0'; // "0" para no sincronizado, "1" para sincronizado
  });
  
  const errorMessages = {
    2004: "El número de tarjeta es inválido.",
    2005: "La fecha de expiración de la tarjeta es anterior a la fecha actual.",
    2006: "El código de seguridad de la tarjeta (CVV2) no fue proporcionado.",
    2007: "El número de tarjeta es de prueba, solamente puede usarse en Sandbox.",
    2008: "La tarjeta no es válida para pago con puntos.",
    2009: "El código de seguridad de la tarjeta (CVV2) es inválido.",
    2010: "Autenticación 3D Secure fallida.",
    2011: "Tipo de tarjeta no soportada.",
    3001: "La tarjeta fue declinada por el banco. Por favor, intenta con otra tarjeta o contacta a tu banco.",
    3002: "La tarjeta ha expirado.",
    3003: "La tarjeta no tiene fondos suficientes.",
    3004: "La tarjeta ha sido rechazada. Por favor, contacta a tu banco.",
    3005: "La tarjeta ha sido rechazada por el sistema antifraude.",
    3006: "La operación no está permitida para este cliente o esta transacción.",
    3009: "La tarjeta fue reportada como perdida. Por favor, contacta a tu banco.",
    3010: "El banco ha restringido la tarjeta. Por favor, contacta a tu banco.",
    3011: "El banco ha solicitado que la tarjeta sea retenida. Contacta a tu banco para más detalles.",
    3012: "Se requiere solicitar al banco autorización para realizar este pago.",
    3201: "El comercio no está autorizado para procesar pagos a meses sin intereses.",
    3203: "Promoción no válida para este tipo de tarjetas.",
    3204: "El monto de la transacción es menor al mínimo permitido para la promoción.",
    3205: "Promoción no permitida.",
  };
  
  const crearVenta = async(idUser, total, idDir, idMetodoP, montoP, cambioD, CarritoDB, email, tel) =>{
    try {
      let datos ={
        id_usuario: idUser, 
        sumaSubtotales: total, 
        id_direccion: idDir, 
        metodoPago: idMetodoP, 
        precio: montoP, 
        cambio: cambioD, 
        carrito: CarritoDB,
        email: email,
        telefono: tel
      }
      console.log(datos)
      let popo =await CrearVentaRoute(datos)
      return popo.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const PagoTarjeta = async (cardDetails, total, nombre, apellido, email) => {
    try {
      
      // OpenPay.setId('m7huax2zxfkmokoy7mog');
      // OpenPay.setApiKey('pk_c4fecd15f4464b989f4f9fa37c581e1c');
      OpenPay.setId('mkjpyawnsbcltic1j5wh');
      OpenPay.setApiKey('pk_ea97ea60cb724dfbbe4e50866f79f231');
      OpenPay.setSandboxMode(true)
      
      const createToken = () => {
        return new Promise((resolve, reject) => {
          OpenPay.token.create(cardDetails, resolve, reject);
        });
      };
      
      const response = await createToken();
      
      if (!response || !response.data) {
        throw new Error('Invalid token response from OpenPay');
        setErrorPayment(['Respuesta de token no válida de OpenPay'])
      }
      
      const token_id = response.data.id;
      const device_session_id = OpenPay.deviceData.setup();
      
      const data = {
        token_id,
        device_session_id,
        amount: total,
        description: "Prueba de pago",
        name: nombre,
        last_name: apellido,
        email: email
      };
      
      const r = await PagoTarjetaRoute(data);
      if (r.data && r.data.payment_method && r.data.payment_method.url) {
        window.location.href = r.data.payment_method.url;
      } else {
        return r.data;
      }
    } catch (error) {
      console.log('error ',error)
      const errorMessage = errorMessages[error.response?.data?.error_code] || "Error desconocido. Por favor, intenta de nuevo más tarde.";
      setErrorPayment((prevErrors) => [...prevErrors, errorMessage]);
    }
  } 
  
  const TraerCarrito = async() =>{
    try {
      const kk = await ObtenerCarritoRoute(id)
      return kk.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)  
      setErrorStore(error.response.data)
    }
  }
  
  const InsertarCarrito = async (id_platillo, id_usuario, cantidad, total) => {
    try {
      const data = {
        id_platillo: id_platillo, 
        id_usuario: id_usuario, 
        cantidad: cantidad, 
        total: total
      };
      const p = await InsertarCarritoRoute(data);
      console.log(p.data)
      setSuccesStore(p.data.message);
      return p.data.message;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorStore([error.response.data.message]);
      } else if (error.response) {
        setErrorStore([error.response.data]);
      }
      throw error;
    }
  };
  
  const UpdateCar = async(id_Car, cant, total) => {
    try {
      const data = {
        id_carrito: id_Car, 
        cantidad: cant, 
        subtotal: total
      }
      await UpdateShoppingCarRoute(data)
    } catch (error) {
      console.log(error)
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const DeleteShoppingCar = async (id_car) => {
    try {
      await DeleteCarRoute(id_car);
    } catch (error) {
      console.log(error)
      if (Array.isArray(error.response.data)) setErrorStore(error.response.data);
      setErrorStore(error.response.data);
    }
  };
  
  const { data: platillosData, error: platillosError, isLoading: platillosLoading } = useQuery(
    ['platillos', seleccion, busqueda], () => {
      if (busqueda) {
        return buscarPlatillosPorNombre(busqueda);
      } else if (seleccion) {
        return fetchPlatillosPorCategoria(seleccion);
      } else {
        return fetchPlatillos();
      }
    },
    {
      onSuccess: (data) => {
        
        const menu = data[0];
        setListMenu(menu);
        setNoResult(menu.length === 0)
      }
    }
  )
  
  // // Enviar notificación push
  // const sendPushNotification = (platillo) => {
  //   // Aquí usas la API de notificaciones o Firebase
  //   if ('Notification' in window && window.Notification.permission === 'granted') {
  //     new Notification('Nueva oferta', {
  //       body: `${platillo.nombre_platillo} está en oferta por ${platillo.precio}`,
  //       icon: `/path/to/icon/${platillo.imagen_platillo}`
  //     });
  //   } else {
  //     console.log('Las notificaciones no están permitidas por el usuario');
  //   }
  // };
  
  // useEffect(() => {
  //   // Solicitar permisos de notificación al cargar el componente
  //   requestNotificationPermission();
  // }, []);
  
  
  const { data: categoriasData, error: categoriasError, isLoading: categoriasLoading } = useQuery('categorias',CategoriasRoute,{
      onSuccess: (data) => {
        setCategory(data.data);
      }
    }
  )
  
  
  const syncOfflineCart = async () => {
    const carritoOffline = JSON.parse(localStorage.getItem('carritoOffline')) || [];
    if (carritoOffline.length === 0) return;

    const idUser = localStorage.getItem('id');
    try {
      for (const item of carritoOffline) {
        await InsertarCarrito(item.id, idUser, item.cantidad, item.precio);
      }

      // Limpiar carrito offline después de sincronizar
      localStorage.removeItem('carritoOffline');

      // Actualizar el estado de sincronización a "1"
      setSyncStatus('1');
      localStorage.setItem('syncStatus', '1');

      toast.success("Carrito sincronizado con éxito");
    } catch (error) {
      console.error('Error al sincronizar el carrito offline:', error);
      toast.error("Error al sincronizar el carrito offline");
    }
  };
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);

      // Solo intentamos sincronizar si el estado de sincronización es "0"
      if (syncStatus === '0') {
        syncOfflineCart();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      localStorage.setItem('syncStatus', '0'); // Marcar como no sincronizado
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncStatus]);
  
  useEffect(() => {
    // Este efecto se ejecuta cuando el estado de `isOnline` cambia
    if (isOnline) {
      syncOfflineCart(); // Llamamos a la sincronización cuando el usuario vuelve a estar online
    }
  }, [isOnline]);
  
  
  useEffect(()=>{
    if(errorStore.length > 0 || succesStore.length > 0 ){
      if(succesStore && Array.isArray(succesStore)){
        succesStore.forEach((succes) => toast.success(succes))
      }
      if (errorStore && Array.isArray(errorStore)) {
        errorStore.forEach((error) => toast.error(error))
      }
      
      const timer = setTimeout(()=>{
        setSuccesStore([])
        setErrorStore([])
      },5000)
      return () => clearTimeout(timer)
    }
  },[errorStore, succesStore])
  
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setErrorPayment([])
    },10000)
    return () => clearTimeout(timer)
  },[errorPayment])
  
  return(
    <StoreContext.Provider 
    value={{
      listMenu,
      category,
      busqueda,
      seleccion,
      noResult,
      lat,
      lng,
      errorPayment,
      
      setLat,
      setLng,
      setSeleccion,
      setNoResult,
      setBusqueda,
      InsertarCarrito,
      DeleteShoppingCar,
      UpdateCar,
      crearVenta,
      TraerCarrito,
      PagoTarjeta,
    }}>
      {children}
    </StoreContext.Provider>
  )
}