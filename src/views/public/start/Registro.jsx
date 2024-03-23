import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

//Dependencias 
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css'

//Comtext
import { useAuth } from "../../../routes/context/AuthContext"

//Components
import { ButtonBasic, CheckButtton } from "../../../components/Buttons"
import { InputBasic } from "../../../components/Inputs"

export const Register2 = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signup, loginGoogle, loginFacebook, findOutNumber, isAuthenticade, errorAuth, successAuth} = useAuth()
  const navigate = useNavigate()
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/home')
    
    if (errorAuth) {
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
      if(error.code === 'auth/popup-closed-by-user') {
        console.error('Se cerro la ventana de inicio de google')
      }
      else{
        console.log('sucedio un error:', error)
      }
    }
  }
  
  const handleFacebook = async() =>{
    try {
      await loginFacebook()
    } catch (error) {
      if(error.code === 'auth/popup-closed-by-user') {
        console.error('Se cerro la ventana de inicio de Facebook')
      }
      else{
        console.log('sucedio un error:', error)
      }
    }
  }
  
  const handleApple = () =>{
    console.log('Login apple')
  }
  
  const handleCheck = (newTerm) => {
    setAceptaTerminos(newTerm)
  }
  
  
  const onSubmit = handleSubmit(async (values) =>{
    try {
      if (!aceptaTerminos) {
        toast.error("Debes aceptar los términos y condiciones para registrarte.")
        return
      }
      await signup(values.nickname, values.tel, values.pass)
    } catch (error) {
      console.log(error)
    }
  })
  
  return (
    <section className="w-full h-[93vh] flex">
      <div className=" w-2/5 flex justify-center items-center bg-[#101010] ">
      <ToastContainer />
        <div className="flex flex-col justify-center items-center space-y-9">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Registrarse</h1>
            <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-7">
            <InputBasic titulo='Nombre de usuario' nombre='nickname' tipo='text' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger}/>
            <InputBasic titulo='Contraseña' nombre='pass' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Confirmar contraseña' nombre='passConf' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            {/* <InputBasic titulo='Teléfono' nombre='tel' tipo='tel' err={errors} method={register} val={setValue} look={watch} triger={trigger} click={findOutNumber}  />
            <div id="recaptcha"></div> */}
            <CheckButtton register={register} onCheckboxChange={handleCheck} />
            <ButtonBasic text='Registrarse'disabled={!aceptaTerminos}/>
          </form>
          <div className="flex space-x-6">
            <ButtonBasic text='Google' click={handleGoogle} disabled={!aceptaTerminos} textColor="text-slate-800" color="bg-slate-100" width='w-24' hovColor="bg-slate-300"/>
            <ButtonBasic text='Facebook' click={handleFacebook} disabled={!aceptaTerminos} color="bg-blue-600" width='w-24' hovColor="bg-blue-700" />
            <ButtonBasic text='Apple' click={handleApple} disabled={!aceptaTerminos} color="bg-black" width='w-24' border='border' />
          </div>
          <p className="text-sm text-gray-300">¿ya tienes cuenta? <Link to="/login" className="text-[#095D78] font-bold underline hover:text-[#0D7A9D]">Iniciar sesión</Link></p>
        </div>
      </div>
      
      <div className=" w-3/5">
        <img src='/img/Login.jpg' alt="imagen reg" className="object-cover w-full h-full" />
      </div>
    </section>
  )
}
