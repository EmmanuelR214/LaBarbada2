import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { useAuth } from "../../../routes/context/AuthContext"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

//Components
import { InputBasic } from "../../../components/Inputs"
import { ButtonBasic, CheckButtton } from "../../../components/Buttons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Data = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signup, findOutNumber, confirmCode, searchPhone, errorAuth, successAuth, isAuthenticade} = useAuth()
  const navigate = useNavigate()
  
  const [singinNumber, setSinginNumber] = useState(false)
  const [data, setData] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  
  
  const [numPhone, setNumPhone] = useState(null)
  
  
  useEffect(() =>{
    
    if(isAuthenticade) navigate('/home')
    
    if (errorAuth && errorAuth.length > 0) {
      errorAuth.forEach((error) => toast.error(error));
    }
    
    
    if(successAuth) {
      successAuth.forEach((success) => toast.success(success))
    }
    
    const handleUnload = (e) =>{
      e.preventDefault()
      const message = "si"
      e.returnValue = message
      return message
    }
    
    window.addEventListener("beforeunload", handleUnload)
    
    return () =>{
      window.removeEventListener("beforeunload", handleUnload)
    }
    
  },[isAuthenticade, errorAuth, successAuth])
  
  const sendCode = handleSubmit(async(value)=>{
    try {
      const search = await searchPhone(value.tel)
      if(search){
        setNumPhone(value.tel)
        console.log(numPhone)
        await findOutNumber(value.tel)
        setSinginNumber(true)
      }
      else{
        console.log('aaqui npo')
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  const confCode = handleSubmit(async(value)=>{
    try {
      console.log(value.code)
      const codigo = await confirmCode(value.code)
      if(codigo){
        console.log('codigo: ', codigo)
        setData(true)
      }
      else{
        console.log('Codigo no correcto')
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  const registerData = handleSubmit(async(value)=>{
    try {
      if (!aceptaTerminos) {
        toast.error("Debes aceptar los términos y condiciones para registrarte.")
        return
      }
      console.log(value.correo, numPhone, value.pass, value.passConf)
      await signup(value.correo, numPhone, value.pass)
    } catch (error) {
      console.log(error)
    }
  })
  
  const handleCheck = (newTerm) => {
    setAceptaTerminos(newTerm)
  }
  
  return (
    <section>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <div id="recaptcha" ></div>
      <div className="w-screen h-[85vh] flex flex-col justify-center items-center" >
        {!data ? (singinNumber ? (<>
          <form onSubmit={confCode}>
            <h2>Ingresa el código</h2>
            <InputBasic titulo='código' nombre='code' tipo='text' err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <div id="recaptcha"></div>
            <ButtonBasic text="Confirmar código"  />
          </form>
        </>) : (<>
        <div className="" >
          <form onSubmit={sendCode} className="flex flex-col items-center" >
            <h2>Ingresa tu número de celular</h2>
            <p>Te enviaremos un código para confirmarlo</p>
            <InputBasic titulo='Teléfono' nombre='tel' tipo='tel' err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <div id="recaptcha"></div>
            <ButtonBasic text="Enviar código" />
          </form>
        </div>
        </>)) : (<>
          <form onSubmit={registerData} className="space-y-7 "  >
            <InputBasic titulo='Correo' nombre='correo' tipo='text' minimo='9' maximo='100'  err={errors} method={register} val={setValue} look={watch} triger={trigger}/>
            <InputBasic titulo='Contraseña' nombre='pass' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Confirmar contraseña' nombre='passConf' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <CheckButtton register={register} onCheckboxChange={handleCheck} />
            <ButtonBasic text='Registrarse'disabled={!aceptaTerminos}/>
          </form>
        </>) }
      </div>
    </section>
  )
}

export default Data