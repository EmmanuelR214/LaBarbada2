import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../../utils/firebase/firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, signOut, signInWithPopup, RecaptchaVerifier, reauthenticateWithCredential } from "firebase/auth";
import { useQuery } from "react-query";

import { ActualizarDatosUserRoute, alertRoute, DireccionRoute, InsertarDireccionRoute, loginFacegooRoute, loginRoute, recoverPassRoute, registerRoute, searchNumberRouter, sendCodeRoute, TraerPublicidadRoute, verifTokenRequet } from "../../utils/api/urlUser";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const AuthContext = createContext()

// const verifyTokenRequest = async(token, errors) =>{
//   try {
//     const res = await verifTokenRequet(token)
//     localStorage.setItem('id', res.data.id)
//     return res.data
//   } catch (error) {
//     console.log(error)
//     localStorage.removeItem('id')
//     Cookies.remove('token')
//     errors(['Sesión caducada'])
//   }
// }


export const useAuth = () =>{
  const context = useContext(AuthContext)
  if(!context) throw new Error('No hay un proveedor')
    return context
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isAuthenticade, setIsAuthenticade] = useState(false)
  const [errorAuth, setErrorAuth] = useState([])
  const [loading, setLoading] = useState(true)
  const [successAuth, setSuccessAuth] = useState([])
  const [cordenadas, setCordenadas] = useState('Selecciona una dirección')
  const [publicidad, setPublicidad] = useState([])
  
  const sixMonthsFromNow = new Date(new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
  //Numero de telefono
  const [codeConfirmation, setCodeConfirmation] = useState(null)
  const [confirmationNumberPhone, setConfirmationNumberPhone] = useState(null)
  
  // const [numeroProductos, setNumeroProductos] = useState(0);
  const [numeroProductos, setNumeroProductos] = useState(() => {
    const savedNumeroProductos = localStorage.getItem('numeroProductos');
    return savedNumeroProductos ? JSON.parse(savedNumeroProductos) : 0;
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    localStorage.setItem('numeroProductos', JSON.stringify(numeroProductos));
  }, [numeroProductos]);
  
  
  
  const ActualizarRoute = async(correo, telefono, id) =>{
    try {
      const pp = {
        id_usuario: id, 
        correo: correo, 
        telefono: telefono 
      }
      const res = await ActualizarDatosUserRoute(pp)
      if(res.data){
        setSuccessAuth(res.data)
      }
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  
  const initializeRecaptcha = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {
        size: 'invisible'
      })
      return recaptcha
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  const findOutNumber = async(tel) =>{
    try {
      console.log(tel)
      const numTel = `+52${tel}`
      const capt = await initializeRecaptcha()
      const confirmationNumberPhone = await signInWithPhoneNumber(auth, numTel, capt)
      setCodeConfirmation(confirmationNumberPhone)
      setSuccessAuth(['El código ha sido enviado'])
    } catch (error) {
      console.log(error)
      setErrorAuth(['Ocurrio un problema al enviar el código'])
    }
  }
  
  const confirmCode = async(code) =>{
    try {
      console.log(code)
      if (!codeConfirmation) {
        throw new Error("No hay ID de confirmación disponible. Envía el código primero.")
      }
      const verificationCode = code
      const confirmationResult = await codeConfirmation.confirm(verificationCode)
      
      console.log('confirmacion: ',confirmationResult)
      setConfirmationNumberPhone(confirmationResult.user.uid)
      setSuccessAuth(['Codigo confirmado'])
      return confirmationResult
    } catch (error) {
      console.error("Error al verificar el código:", error)
      setErrorAuth(['El código proporcionado no es válido.'])
    }
  }
  
  const sendCodeEmail = async(email) =>{
    try {
      const data = {mail: email}
      toast.success('Código enviado')
      const codigoEmail =  await sendCodeRoute(data)
      console.log('id', codigoEmail.data[1])
      setCodeConfirmation(codigoEmail.data[1])
      return codigoEmail
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  } 
  
  const searchPhone = async(tel) =>{
    try {
      const data = {
        telefono: tel
      }
      const search = await searchNumberRouter(data)
      return search.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const signup = async(correo, tel, pass) =>{
    try {
      const regUser = {
        uid:confirmationNumberPhone,
        correo: correo,
        telefono: tel,
        password: pass
      }
      const res = await registerRoute(regUser)
      Cookies.set('token', res.data.token, {expires: sixMonthsFromNow})
      setUser(res.data.dataUser)
      setIsAuthenticade(true)
      setCodeConfirmation(null)
      return setSuccessAuth([`¡Bienvenido a bordo!`])
    } catch (error) {
      console.log(error.response.data)
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const signin = async(val) =>{
    try {
      const data = {param: val.dato, password: val.pass}
      const res = await loginRoute(data)
      Cookies.set('token', res.data.token, {expires: sixMonthsFromNow})
      setUser(res.data.user)
      setIsAuthenticade(true)
      setSuccessAuth([`¡Hola de nuevo!`])
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const loginGoogle = async() =>{
    try {
      const google  =  new GoogleAuthProvider()
      const g = await signInWithPopup(auth, google)
      const dataGoogle = {
        uid:g.user.uid,
        correo: g.user.email,
        telefono: g.phoneNumber,
        message: 'Google'
      }
      console.log(dataGoogle)
      console.log(g)
      const RLGoogle = await loginFacegooRoute(dataGoogle)
      console.log(RLGoogle)
      setUser(RLGoogle.data[0]);
      setIsAuthenticade(true);
      Cookies.set('token', RLGoogle.data[2], {expires: sixMonthsFromNow})
      if (RLGoogle.data[1] === 'login') {
        return setSuccessAuth(['¡Hola de nuevo!']);
      } else {
        return setSuccessAuth(['¡Bienvenido abordo!']);
      }      
    } catch (error) {
      console.log(error)
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const loginFacebook = async() =>{
    try {
      const facebook  =  new FacebookAuthProvider()
      const f = await signInWithPopup(auth, facebook)
      const dataFacebook = {
        uid:f.user.uid,
        correo: f.user.email,
        telefono: f.phoneNumber,
        message: 'Facebook'
      }
      const RLFacebook = await loginFacegooRoute(dataFacebook)
      setUser(RLFacebook.data[0])
      setIsAuthenticade(true)
      Cookies.set('token', RLFacebook.data[2], {expires: sixMonthsFromNow})
      if (RLFacebook.data[1] === 'login') {
        return setSuccessAuth(['¡Hola de nuevo!']);
      } else {
        return setSuccessAuth(['¡Bienvenido abordo!']);
      }  
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const recoverPassword = async(email, pass) =>{
    try {
      const data = {
        email: email,
        password:pass,
        id:codeConfirmation
      }
      console.log(data)
      const res = await recoverPassRoute(data)
      Cookies.set('token', res.data[1], {expires: sixMonthsFromNow})
      setUser(res.data[0])
      setIsAuthenticade(true)
      setSuccessAuth([`¡Bienvenido a bordo!`])
      return res.data[0]
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const logout = async () =>{
    try {
      Cookies.remove('token')
      localStorage.removeItem('id')
      signOut(auth)
      setIsAuthenticade(false)
      setUser(null)
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const alertUser = async() =>{
    try {
      const alertUser = Cookies.get('alertUser')
      const res =await alertRoute(alertUser)
      console.log(res)
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
        setErrorAuth(error.response.data)
    }
  }
  
  const TraerDireccon = async() =>{
    try {
      if(!navigator.onLine){
        return null
      }
      let idUser = user.id
      const pp = await DireccionRoute(idUser)
      return pp.data
    } catch (error) {
      console.log('error de traer direccion',error)
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const InsertarDirreccion = async(direccion, descripcion, idUser, idIcono, lat, lng) =>{
    try {
      let datos = {
        direccion: direccion, 
        descripcion: descripcion, 
        id_usuario: idUser, 
        id_apodo: idIcono,
        lat: lat,
        lng: lng
      }
      let jeje = await InsertarDireccionRoute(datos)
      setSuccessAuth(jeje.data)
      return jeje
      
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  // const { data, error, isLoading } = useQuery(
  //   'verifyToken',
  //   async () => {
  //     const cookie = Cookies.get();
  //     if (!cookie.token) {
  //       return null;
  //     }
  //     return await verifyTokenRequest(cookie.token, setErrorAuth);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       if (data) {
  //         setUser(data);
  //         setNumeroProductos(data.carrito);
  //         setIsAuthenticade(true);
  //       } else {
  //         const storedUser = localStorage.getItem('id');
  //         if (storedUser) {
  //           setUser(JSON.parse(storedUser)); // Restaurar datos de localStorage
  //           setIsAuthenticade(true);
  //         } else {
  //           setIsAuthenticade(false); // No hay datos, no hay sesión
  //         }
  //       }
  //       setLoading(false);
  //     },
  //     onError: () => {
  //       setIsAuthenticade(false);
  //       setUser(null);
  //       setLoading(false);
  //     },
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //   }
  // );
  

  
  // const { data, error, isLoading } = useQuery(
  //   'verifyToken',
  //   async () => {
  //     const cookie = Cookies.get();
  //     if (!cookie.token) {
  //       return null;
  //     }

  //     // Si no hay conexión, retorna el estado actual
  //     if (!isOnline) {
  //       console.log('No hay conexión a Internet. Manteniendo la sesión.');
  //       return null;
  //     }

  //     return await verifyTokenRequest(cookie.token, setErrorAuth);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       if (data) {
  //         setUser(data);
  //         setNumeroProductos(data.carrito);
  //         setIsAuthenticade(true);
  //       }
  //     },
  //     onError: () => {
  //       setIsAuthenticade(false);
  //       setUser(null);
  //       setLoading(false);
  //     },
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //     enabled: isOnline, // La consulta sólo se ejecutará si hay conexión a Internet
  //   }
  // );
  
  
  
  // const { data, error, isLoading } = useQuery('verifyToken', async () => {
  //     const cookie = Cookies.get()
  //     if (!cookie.token) {
  //       return null
  //     }
  //     console.log('esta entrando aqui')
  //     return await verifyTokenRequest(cookie.token, setErrorAuth)
  //   },
  //   {
  //     onSuccess: (data) => {
  //       if (data) {
  //         setUser(data);
  //         setNumeroProductos(data.carrito);
  //         setIsAuthenticade(true);
  //       }
  //     },
  //     onError: () => {
  //       setIsAuthenticade(false);
  //       setUser(null);
  //       setLoading(false);
  //     },
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //   }
  // );
  
  useEffect(() => {
    
    if (!navigator.onLine) {
      setIsAuthenticade(true); // Simular que la sesión está activa
      setLoading(false); // Desactivar la carga
    }
    
    // Actualizar estado cuando cambia la conectividad
    const handleOnline = () => {
      setIsOnline(true);
      setLoading(true)
    }
    const handleOffline = () => {
      setIsOnline(false);
      setIsAuthenticade(true)
      setLoading(false); // Evitar mostrar Loader si estamos offline
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpiar eventos cuando se desmonte el componente
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  useQuery(
    'checkLogin',
    async () => {
      const cookie = Cookies.get();
      if (!cookie?.token) {
        // Si no hay token, no hacemos la solicitud y retornamos null
        return null;
      }

      try {
        const res = await verifTokenRequet(cookie.token); // Asegúrate de que verifTokenRequest esté definido
        return res.data;
      } catch (error) {
        throw new Error('Error en la verificación del token');
      }
    },
    {
      onSuccess: (data) => {
        if (data) {
          setNumeroProductos(data.carrito);
          localStorage.setItem('id', data.id)
          setUser(data); // Asume que setUser está definido en tu contexto o componente
          setIsAuthenticade(true); // Usuario autenticado
        } else {
          setIsAuthenticade(false); // No autenticado
          setUser(null);
        }
        setLoading(false);
      },
      onError: () => {
        setIsAuthenticade(false);
        setUser(null);
        setLoading(false);
      },
      refetchOnWindowFocus: false, // No volver a hacer la consulta cuando la ventana gane foco
      retry: false, // No reintentar la consulta automáticamente
      enabled: isOnline, // Solo ejecuta la consulta si hay conexión
      initialData: () => {
        // Si estamos offline, mantener el estado previo
        if (!isOnline) {
          return { loading: false, isAuthenticated: true }; // Aquí puedes ajustar el estado inicial deseado
        }
      },
    }
  );
  
  
  
  // const { data, error, isLoading } = useQuery(
  //   'checkLogin',
  //   async () => {
  //     const cookie = Cookies.get();
  //     if (!cookie?.token) {
  //       return null;
  //     }

  //     try {
  //       const res = await verifTokenRequet(cookie.token); 
  //       return res.data;
  //     } catch (error) {
  //       throw new Error('Error en la verificación del token');
  //     }
  //   },
  //   {
  //     onSuccess: (data) => {
  //       if (data) {
  //         setUser(data); 
  //         setIsAuthenticade(true); 
  //       } else {
  //         setIsAuthenticade(false);
  //         setUser(null);
  //       }
  //       setLoading(false);
  //     },
  //     onError: () => {
  //       setIsAuthenticade(false);
  //       setUser(null);
  //       setLoading(false);
  //     },
  //     refetchOnWindowFocus: false, 
  //     retry: false, 
  //   }
  // );
  
  
  useEffect(()=>{
    async function Publicidad(){
      const pp = await TraerPublicidadRoute()
      setPublicidad(pp.data);
    }
    Publicidad()
  },[])
  
  useEffect(()=>{
    if(errorAuth.length > 0 || successAuth.length > 0){
      if (errorAuth && Array.isArray(errorAuth)) {
        errorAuth.forEach((error) => toast.error(error));
      }
      
      if(successAuth) {
        successAuth.forEach((success) => toast.success(success))
      }
      const timer = setTimeout(()=>{
        setErrorAuth([])
        setSuccessAuth([])
      },5000)
      return () => clearTimeout(timer)
    }
  },[errorAuth, successAuth])
  
  return(
    <AuthContext.Provider value={{
      user,
      isAuthenticade,
      errorAuth,
      loading,
      successAuth,
      cordenadas,
      publicidad,
      numeroProductos,
      
      setNumeroProductos,
      signin,
      signup,
      loginGoogle,
      loginFacebook,
      recoverPassword,
      logout,
      alertUser,
      findOutNumber,
      confirmCode,
      searchPhone,
      sendCodeEmail,
      TraerDireccon,
      InsertarDirreccion,
      setCordenadas,
      ActualizarRoute,
    }} >
      {children}
    </AuthContext.Provider>
  )
}
