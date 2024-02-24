// import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// //Api
// import { registerRoute, loginRoute, verifTokenRequet} from "../../utils/api/Auth";
// //Firebase
// import { GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, signOut, signInWithPopup, RecaptchaVerifier } from "firebase/auth";
// import { auth } from "../../utils/firebase/firebase";


// export const AuthContext = createContext()

// export const useAuth = () =>{
//   const context = useContext(AuthContext)
//   if(!context)  throw new Error('Error de provedor con AuthContextPublic')
//   return context
// }

// export const AuthProvider = ({children}) =>{
//   const [user, setUser] = useState(null)
//   const [isAuthenticade, setIsAuthenticade] = useState(false)
//   const [errorAuth, setErrorAuth] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [successAuth, setSuccessAuth] = useState([])
  
//   //Numero de telefono
  
//   const signin = async(user) =>{
//     try {
//       const logUser = {
//         nombre: user.nickname,
//         password: user.passLog
//       }
//       const res = await loginRoute(logUser)
      
//       setUser(res.data)
//       setIsAuthenticade(true)
//       setSuccessAuth([`¡Hola de nuevo! ${user.nickname}`])
//     } catch (error) {
//       if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
//       setErrorAuth(error.response.data)
//     }
//   }
  
//   const logout = async () =>{
//     try {
//       Cookies.remove('token')
//       signOut(auth)
//       setIsAuthenticade(false)
//       setUser(null)
//     } catch (error) {
//       if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
//       setErrorAuth(error.response.data)
//     }
//   }
  
//   useEffect(()=>{
//     if(errorAuth.length > 0 || successAuth.length > 0){
//       const timer = setTimeout(()=>{
//         setErrorAuth([])
//         setSuccessAuth([])
//       },3000)
//       return () => clearTimeout(timer)
//     }
//   },[errorAuth, successAuth])
  
//   useEffect(()=>{
//     async function chackLogin  () {
//       const cookie = Cookies.get()
      
//       if(!cookie.token) {
//         setIsAuthenticade(false)
//         setLoading(false)
//         return setUser(null)
//       }
      
//       try {
//         const res = await verifTokenRequet(cookie.token)        
//         if(!res.data) {
//           setIsAuthenticade(false)
//           setLoading(false)
//           return;
//         }
//         console.log(res.data)
//         setIsAuthenticade(true)
//         setUser(res.data)
//         console.log(user)
//         setLoading(false)
//       } catch (error) {
//         setIsAuthenticade(false)
//         setUser(null)
//         setLoading(false)
//       }
      
//     }
//     chackLogin()
//   },[])
  
//   return(
//     <AuthContext.Provider value={{
//     }} >
//       {children}
//     </AuthContext.Provider>
//   )
// }