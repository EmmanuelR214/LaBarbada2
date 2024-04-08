import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//Componentes
import { NavR } from '../../components/Nav';
import { InputBasic } from '../../components/Inputs';
import { ButtonBasic } from '../../components/Buttons';
import { useAuth } from '../../routes/context/AuthContext';

const Recuperar = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {recoverPassword,sendCodeEmail,isAuthenticade} = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const queryParams = new URLSearchParams(location.search)
  const stepFromUrl = parseInt(queryParams.get('step')) || 1
  const [step, setStep] = useState(stepFromUrl)
  const [timeLeft, setTimeLeft] = useState(180)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/home')
  },[isAuthenticade])
  
  useEffect(() => {
    const newUrl = `${location.pathname}?step=${step}`
    navigate(newUrl, { replace: true })
  }, [step, navigate, location.pathname])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem('codigo')
      console.log('Código eliminado del localStorage después de 3 minutos.')
    }, 3 * 60 * 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1, 0)
    }, 1000)
    
    return () => clearInterval(timer);
  }, []);
  
  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }
  
  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1))
  }
  
  const handleSendCode = handleSubmit(async(values) =>{
    try {
      const codigo = await sendCodeEmail(values.correo)
      if(codigo){
        localStorage.setItem('codigo', codigo.data[0])
        localStorage.setItem('correo', values.correo)
        handleNextStep()
      }
    } catch (error) {
      console.log('error',error)
    }
  })
  
  const handleCompareCode = handleSubmit(async(values) =>{
    try {
      const valor = localStorage.getItem('codigo')
      if(values.codigo === valor){
        localStorage.removeItem('codigo')
        handleNextStep()
      }
      else if(valor === null){
        toast.error('Codigo caducado')
      }
      else {
        toast.error('El código ingresado no coincide')
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  const handleResendCode = async(e) =>{
    try {
      e.preventDefault()
      const mail = localStorage.getItem('correo')
      const codigo = await sendCodeEmail(mail)
      localStorage.setItem('codigo', codigo.data)
      toast.success('código enviado nuevamente')
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleRecoverPasword = handleSubmit(async(values)=>{
    try {
      const valor = localStorage.getItem('correo')
      const yes = await recoverPassword(valor, values.pass)
      if(yes){
        localStorage.removeItem('correo')
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  
  const styleForm = 'w-1/4 flex flex-col items-center justify-center text-center space-y-4'
  
  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSendCode} className={`${styleForm}`} >
            <h2 className=' font-bold md:text-2xl' >Recuperación de contraseña</h2>
            <InputBasic titulo='Correo' nombre='correo' tipo='text' minimo='8' maximo='100'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <ButtonBasic text='Enviar código' width='w-full' />
          </form>
        )
      case 2:
        return (
          <form onSubmit={handleCompareCode} className={`${styleForm}`} >
            <h2 className=' font-bold md:text-2xl' >Ingrese código</h2>
            <InputBasic titulo='Código' nombre='codigo' tipo='text' minimo='6' maximo='11'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <ButtonBasic width='w-full' text='Verificar código'/>
            <p>Volver a enviar el codigo: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
            <ButtonBasic width='w-full' text='Enviar codigo nuevamente' click={handleResendCode} disabled={timeLeft > 0} />
          </form>
        )
      case 3:
        return (
          <form onSubmit={handleRecoverPasword} className={`${styleForm}`}  >
            <h2 className=' font-bold md:text-2xl'>Cambiar contraseña</h2>
            <InputBasic titulo='contraseña' nombre='pass' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <ButtonBasic text='Enviar código' width='w-full' />
          </form>
        )
      default:
        return null
    }
  }

  return (
    <>
      <NavR click={handlePrevStep} />
      <div className='w-full h-[85vh] flex justify-center items-center' >
        {renderStepForm()}
      </div>
    </>
  )
}

export default Recuperar;






// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"

// //Dependencias
// import { useForm } from "react-hook-form"
// import { ToastContainer, toast } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css'

// //Comtext
// import { useAuth } from "../../../routes/context/AuthContext"

// //Components
// import { ButtonBasic } from "../../../components/Buttons"
// import { InputBasic } from "../../../components/Inputs"

// export const Recuperar = () => {
//   const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
//   const {sendCodeEmail,isAuthenticade ,errorAuth} = useAuth()
//   const [] = useState(false)
//   const [formCodigo, setFormCodigo] = useState(false)
//   const [codigo, setCodigo] = useState(null)
  
//   const navigate = useNavigate()
//   useEffect(() =>{
//     if(isAuthenticade) navigate('/home')
//   },[isAuthenticade])
  
//   useEffect(() => {
//     if (errorAuth) {
//       errorAuth.forEach((error) => toast.error(error));
//     }
//   }, [errorAuth]);
  
//   const onSubmit = handleSubmit(async (values) =>{
//     try {
//       const si = await sendCodeEmail(values)
//       // console.log(si)
//       // setCodigo(si)
//       // setFormCodigo(true)
//     } catch (error) {
//       console.error(error)
//     }
//   })
  
//   return (
//     <section className="w-full h-[93vh] flex justify-center items-center">
//     <ToastContainer pauseOnHover={false} autoClose={2000} />
//     <div className=" w-2/5 h-1/2 flex justify-center items-center bg-[#101010] rounded mb-10 ">
//       {
        
//       }
//     </div>
//   </section>
//   )
// }
