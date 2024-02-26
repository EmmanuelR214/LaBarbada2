import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
//Api
import { registerRoute, loginRoute, verifTokenRequet, loginFGRoute, CambiarPassRoute } from "../../utils/api/Auth";
//Firebase
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, signOut, signInWithPopup, RecaptchaVerifier } from "firebase/auth";
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
      
      const signedInUser = confirmationResult.codeConfirmation
      
      console.log("Usuario autenticado:", signedInUser)
      setSuccessAuth(['Codigo confirmado'])
    } catch (error) {
      console.error("Error al verificar el código:", error)
      setErrorAuth(['Error al verificar el código'])
    }
  }
  
  const changuePass = async (values) =>{
    try {
      const cambiar = {
        numero: values.tel,
        pass: values.pass
      }
      if(!codeConfirmation) return setErrorAuth(['Falta verificar el teléfono'])
      const res = await CambiarPassRoute(cambiar)
      setUser(res.data)
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Hola de nuevo! ${res.data[0].nombre}`])
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const loginGoogle = async() =>{
    try {
      const google  =  new GoogleAuthProvider()
      const g = await signInWithPopup(auth, google)
      const dataGoogle = {nombre: g.user.displayName, uid: g.user.uid }
      
      const RLGoogle = await loginFGRoute(dataGoogle)
      if(RLGoogle.data[1] === 'login'){
        setUser(RLGoogle.data[0])
        setIsAuthenticade(true)
        return setSuccessAuth([`¡Hola de nuevo! ${g.user.displayName}`])
      }
      setUser(RLGoogle.data[0])
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Bienvenido a bordo! ${g.user.displayName}`])
    } catch (error) {
      console.log(error)
      setErrorAuth(error)
    }
  }
  
  const loginFacebook = async () => {
    try {
      const facebook = new FacebookAuthProvider();
      const f = await signInWithPopup(auth, facebook);
      const dataFacebook = {nombre: f.user.displayName, uid: f.user.uid }
      
      const RLFACEBOOK = await loginFGRoute(dataFacebook)
      if(RLFACEBOOK.data[1] === 'login'){
        setUser(RLFACEBOOK.data[0])
        setIsAuthenticade(true)
        return setSuccessAuth([`¡Hola de nuevo! ${f.user.displayName}`])
      }
      console.log('entro en register')
      setUser(RLFACEBOOK.data[0])
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Bienvenido a bordo! ${f.user.displayName}`])
    } catch (error) {
      console.error(error)
      setErrorAuth(error)
    }
  }
  
  const signup = async(name, tel, pass) =>{
    try {
      const regUser = {
        uid:"",
        nombre: name,
        telefono: tel,
        password: pass
      }
      
      if(!codeConfirmation) return setErrorAuth(['Falta verificar el teléfono'])
      const res = await registerRoute(regUser)
      console.log('entro aqui')
      setUser(res.data)
      setIsAuthenticade(true)
      return setSuccessAuth([`¡Bienvenido a bordo! ${name}`])
    } catch (error) {
      console.log(error.response.data)
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const signin = async(user) =>{
    try {
      const logUser = {
        nombre: user.nickname,
        password: user.passLog
      }
      const res = await loginRoute(logUser)
      
      setUser(res.data)
      setIsAuthenticade(true)
      setSuccessAuth([`¡Hola de nuevo! ${user.nickname}`])
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
        console.log(res.data)
        setIsAuthenticade(true)
        setUser(res.data)
        console.log(user)
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
      changuePass,
      findOutNumber,
      confirmCode,
      initializeRecaptcha,
      loginGoogle,
      loginFacebook,
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