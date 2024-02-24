import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

//Dependencias
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

//Comtext
import { useAuth } from "../../../routes/context/AuthContext"

//Components
import { ButtonBasic } from "../../../components/Buttons"
import { InputBasic } from "../../../components/Inputs"

export const Recuperar = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {changuePass,isAuthenticade ,errorAuth} = useAuth()
  
  const navigate = useNavigate()
  useEffect(() =>{
    if(isAuthenticade) navigate('/home')
  },[isAuthenticade])
  
  useEffect(() => {
    if (errorAuth) {
      errorAuth.forEach((error) => toast.error(error));
    }
  }, [errorAuth]);
  const onSubmit = handleSubmit(async (values) =>{
    try {
      await changuePass(values)
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <section className="w-full h-[93vh] flex justify-center items-center">
    <div className=" w-2/5 h-1/2 flex justify-center items-center bg-[#101010] rounded mb-10 ">
    <ToastContainer />
      <div className="flex flex-col justify-center items-center space-y-9">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
          <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-7">
          <InputBasic titulo='Telefono' nombre='tel' tipo='tel' minimo='10' maximo='11'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
          <InputBasic titulo='Contraseña' nombre='pass' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
          <div id="recaptcha"></div>
          <ButtonBasic text='Iniciar sesión' />
        </form>
        <p className="text-sm text-gray-300">¿Ya te acordaste? <Link to="/register" className="text-[#095D78] font-bold underline hover:text-[#0D7A9D]">Iniciar sesión</Link></p>
      </div>
    </div>
  </section>
  )
}
