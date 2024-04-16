import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
//Api
import {verifTokenRequet, searchNumberPhoneRoute, registerRoute, loginRoute, loginFacegooRoute, sendCodeRoute, recoverPassRoute, alertRoute} from "../../utils/api/Auth";
//Firebase
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, signOut, signInWithPopup, RecaptchaVerifier, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";


export const AuthContext = createContext()

export const useAuth = () =>{
  const context = useContext(AuthContext)
  if(!context)  throw new Error('Error de provedor con AuthContextPublic')
  return context
}

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  const [isAuthenticade, setIsAuthenticade] = useState(false)
  const [errorAuth, setErrorAuth] = useState([])
  const [loading, setLoading] = useState(true)
  const [successAuth, setSuccessAuth] = useState([])
  
  //Numero de telefono
  const [codeConfirmation, setCodeConfirmation] = useState(null)
  const [confirmationNumberPhone, setConfirmationNumberPhone] = useState(null)
  
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
      console.log(capt)
      const confirmationNumberPhone = await signInWithPhoneNumber(auth, numTel, capt)
      setCodeConfirmation(confirmationNumberPhone)
      console.log(confirmationNumberPhone)
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
  
  const searchPhone = async(tel) =>{
    try {
      const data = {
        telefono: tel
      }
      const search = await searchNumberPhoneRoute(data)
      return search.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const alertUser = async() =>{
    try {
      await alertRoute()
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
      
      console.log('entro aqui')
      setUser(res.data)
      setIsAuthenticade(true)
      setCodeConfirmation(null)
      return setSuccessAuth([`¡Bienvenido a bordo!`])
    } catch (error) {
      console.log(error.response.data)
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const signin = async(user) =>{
    try {
      const logUser = {
        param: user.dato,
        password: user.pass
      }
      
      const res = await loginRoute(logUser)
      
      setUser(res.data)
      setIsAuthenticade(true)
      setSuccessAuth([`¡Hola de nuevo!`])
    } catch (error) {
      console.log(error)
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
      const RLGoogle = await loginFacegooRoute(dataGoogle)
      console.log(RLGoogle)
      if(RLGoogle.data[1] === 'login'){
        setUser(RLGoogle.data[0])
        setIsAuthenticade(true)
        return setSuccessAuth([`¡Hola de nuevo!`])
      }
      setUser(RLGoogle.data[0])
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Bienvenido abordo!`])
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
      console.log(dataFacebook)
      const RLFacebook = await loginFacegooRoute(dataFacebook)
      console.log(RLFacebook)
      if(RLFacebook.data[1] === 'login'){
        setUser(RLFacebook.data[0])
        setIsAuthenticade(true)
        return setSuccessAuth([`¡Hola de nuevo!`])
      }
      setUser(RLFacebook.data[0])
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Bienvenido abordo!`])
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const sendCodeEmail = async(email) =>{
    try {
      const data = {mail: email}
      const codigoEmail =  await sendCodeRoute(data)
      setCodeConfirmation(codigoEmail.data[1])
      return codigoEmail
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
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
      
      const res = await recoverPassRoute(data)
      
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
      signOut(auth)
      setIsAuthenticade(false)
      setUser(null)
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
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
      },3000)
      return () => clearTimeout(timer)
    }
  },[errorAuth, successAuth])
  
  useEffect(()=>{
    async function chackLogin  () {
      const cookie = Cookies.get()
      if(!cookie.token) {
        setIsAuthenticade(false)
        setLoading(false)
        return setUser(null)
      }
      
      try {
        const res = await verifTokenRequet(cookie.token)        
        if(!res.data) {
          setIsAuthenticade(false)
          setLoading(false)
          return;
        }
        setIsAuthenticade(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticade(false)
        setUser(null)
        setLoading(false)
      }
      
    }
    chackLogin()
  },[])
  
  return(
    <AuthContext.Provider value={{
      signup,
      signin,
      findOutNumber,
      confirmCode,
      initializeRecaptcha,
      searchPhone,
      loginGoogle,
      loginFacebook,
      sendCodeEmail,
      recoverPassword,
      alertUser,
      loading,
      user,
      isAuthenticade,
      errorAuth,
      successAuth,
      logout,
    }} >
      {children}
    </AuthContext.Provider>
  )
}