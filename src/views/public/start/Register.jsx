import {useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

//Dependencias 
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

//Comtext
import { useAuth } from "../../../routes/context/AuthContext"

//Components
import { ButtonBasic, LinkButton } from "../../../components/Buttons"
import { TextLink } from "../../../components/Text"
import { iconGoogle } from "../../../assets/icons/Icons"

export const Register = () => {
  const {loginGoogle, loginFacebook, isAuthenticade, errorAuth, successAuth} = useAuth()
  const navigate = useNavigate()
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/register-data')
    
    if (errorAuth && Array.isArray(errorAuth)) {
      errorAuth.forEach((error) => toast.error(error));
    }
    
    if(successAuth) {
      successAuth.forEach((success) => toast.success(success))
    }
  },[isAuthenticade, errorAuth, successAuth])
  
  const handleGoogle = async() =>{
    try {
      const credentialsGoogle = await loginGoogle()
      console.log(credentialsGoogle)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.warning('Se canceló la operación.');
      } else {
        console.log('Ocurrió un error:', error); 
      }
    }
  }
  
  const handleFacebook = async() =>{
    try {
      await loginFacebook()
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.warning('Se canceló la operación.');
      } else {
        console.log('Ocurrió un error:', error);
      }
    }
  }
  
  const handleApple = () =>{
    console.log('Login apple')
  }
  return (
    <section className="flex flex-col items-center justify-center md:flex-row h-screen">
    <div className="w-full md:w-1/2 p-8 flex flex-col space-y-2 md:space-y-4 justify-center items-center order-2 md:order-1">
      <div className="mb-2 flex flex-col justify-center items-center" >
        <h2 className="text-md lg:text-4xl font-bold mb-4">Registro</h2>
        <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
      </div>
      <div className="flex flex-col md:flex-col justify-center w-full md:w-3/4 lg:w-1/2 space-y-6 md:space-y-8">
        <LinkButton text="Teléfono" to="/register-data" icon="ic:baseline-phone" width='w-full' />
        <ButtonBasic text='Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="hover:bg-slate-300"  icon="devicon:google" width='w-full' />
        <ButtonBasic text='Facebook' click={handleFacebook} color="bg-blue-500" hovColor="hover:bg-blue-600" icon="ic:baseline-facebook" width='w-full' />
        <ButtonBasic text='Apple' click={handleApple} color="bg-black" hovColor="hover:bg-neutral-900" textHover="hover:text-white" border='border' icon="ic:baseline-apple" width='w-full' />
      </div>
      <TextLink to="/login" text="¿Ya tienes cuenta? " linkText="Iniciar sesión" />
    </div>
    <div className="h-[40vh] md:h-screen md:w-3/4 order-1 md:order-2">
      <img src="/img/Login.jpg" alt="" className="w-full h-full object-cover" />
    </div>
  </section>
  )
}