import {useNavigate } from "react-router-dom"

//Dependencias 
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

//Comtext
import { useAuth } from "../../routes/context/AuthContext"

//Components
import { ButtonBasic } from "../../components/Buttons"
import { TextLink } from "../../components/Text"

export const Register = () => {
  const {loginGoogle, loginFacebook} = useAuth()
  const navigate = useNavigate()
  
  const handleGoogle = async() =>{
    try {
      const credentialsGoogle = await loginGoogle()
      console.log(credentialsGoogle)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.warning('Se canceló la operación.');
      } else {
        console.log('Ocurrió un error:', error); 
        toast.warning('Se canceló la operación.');
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
        toast.warning('Se canceló la operación.');
      }
    }
  }
  
  const handleApple = () =>{
    console.log('Login apple')
  }
  
  const handleLink = () =>{
    navigate('/register-data')
  }
  
  return (
    <section className="flex flex-col items-center justify-center md:flex-row h-screen">
    <div className="w-full md:w-1/2 p-8 flex flex-col space-y-2 md:space-y-4 justify-center items-center order-2 md:order-1">
      <div className="mb-2 flex flex-col justify-center items-center" >
        <h2 className="text-md lg:text-4xl font-bold mb-4">Registro</h2>
        <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
      </div>
      <div className="flex flex-col md:flex-col justify-center w-full md:w-3/4 lg:w-1/2 space-y-6 md:space-y-8">
        <ButtonBasic text='Teléfono' click={handleLink} icon="ic:baseline-phone" />
        <ButtonBasic text='Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="hover:bg-slate-300"  icon="devicon:google" />
        <ButtonBasic text='Facebook' click={handleFacebook} color="bg-blue-500" hovColor="hover:bg-blue-600" icon="ic:baseline-facebook" />
        <ButtonBasic text='Apple' click={handleApple} color="bg-black" hovColor="hover:bg-neutral-900" textHover="hover:text-white" border='border' icon="ic:baseline-apple" />
      </div>
      <TextLink to="/login" text="¿Ya tienes cuenta? " linkText="Iniciar sesión" />
    </div>
    <div className="h-[40vh] md:h-screen md:w-3/4 order-1 md:order-2">
      <img src="/img/Login.jpg" alt="" className="w-full h-full object-cover" />
    </div>
  </section>
  )
}