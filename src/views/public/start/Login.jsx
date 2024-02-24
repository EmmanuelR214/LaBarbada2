import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

//Dependencias
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie';

//Comtext
import { useAuth } from "../../../routes/context/AuthContext"

//Components
import { ButtonBasic } from "../../../components/Buttons"
import { InputBasic } from "../../../components/Inputs"

export const Login = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signin, loginGoogle, loginFacebook, isAuthenticade ,errorAuth} = useAuth()
  
  const navigate = useNavigate()
  
  const [intentos, setIntentos] = useState(0)
  const [intentosCon, setIntentosCon] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/home')
    
    if (errorAuth) {
      errorAuth.forEach((error) => toast.error(error));
    }
  },[isAuthenticade, errorAuth])
  
  useEffect(() => {
    const isBotonBloqueado = Cookies.get('botonBloqueado');
    if (isBotonBloqueado === 'true') {
      setBloqueado(true);
    }
  }, []);
  
  
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
  
  const onSubmit = handleSubmit(async (values) =>{
    try {
      
      if (bloqueado) {
        console.log('Botón bloqueado')
        return;
      }
      if (errorAuth) {
        setIntentos(intentos + 1)
        if (intentos >= 2 && intentosCon < 7) {
          setBloqueado(true)
          toast.error("Botón bloqueado por 2 minutos")
          setTimeout(() => {
            setBloqueado(false)
            setIntentosCon(intentosCon + intentos)
            setIntentos(0)
          }, 5000)
        } else if (intentosCon === 6) {
          setBloqueado(true)
          setIntentosCon(0)
          Cookies.set('botonBloqueado', true, { expires: 1 })
          toast.error("Boton bloqueado por un 24h")
        }
      }
      await signin(values)
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <section className="w-full h-[93vh] flex">
      <div className=" w-2/5 flex justify-center items-center bg-[#101010] ">
      <ToastContainer />
        <div className="flex flex-col justify-center items-center space-y-9">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Inicio de sesión</h1>
            <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-7">
            <InputBasic titulo='Nombre de usuario' nombre='nickname' tipo='text' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Contraseña' nombre='passLog' tipo='password' minimo='8' maximo='16'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <ButtonBasic text='Iniciar sesión' hovColor="bg-[#0D7A9D]" disabled={bloqueado} />
          </form>
          <div className="flex flex-col space-y-6">
            <ButtonBasic text='Iniciar sesión con Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="bg-slate-300"/>
            <ButtonBasic text='Iniciar sesión con Facebook' click={handleFacebook} color="bg-blue-600" hovColor="bg-blue-700" />
            <ButtonBasic text='Iniciar sesión con Apple' click={handleApple} color="bg-black" border='border' />
          </div>
          <p className="text-sm text-gray-300 mt-2">¿Olvidaste tu contraseña? <Link to="/recuperar" className="text-[#095D78] font-bold underline hover:text-[#0D7A9D]"> Recuperara contraseña</Link></p>
          <p className="text-sm text-gray-300">¿Aún no tienes cuenta? <Link to="/register" className="text-[#095D78] font-bold underline hover:text-[#0D7A9D]">Regístrate</Link></p>
        </div>
      </div>
      
      <div className=" w-3/5">
        <img src='/src/assets/Login.jpg' alt="imagen login" className="object-cover w-full h-full" />
      </div>
    </section>
  )
}

/*
      {
        errorAuth.map((error, i) =>(
          <div className="bg-red-500 p-2 text-white" key={i} > {error} </div>
        ))
      }
*/

/*
      if (bloqueado) {
        console.log('Botón bloqueado')
        return;
      }
      if (errorAuth) {
        setIntentos(intentos + 1)
        if (intentos >= 2 && intentosCon < 7) {
          setBloqueado(true);
          console.log('Botón bloqueado por 2 minutos')
          setErr(['Boton bloqueado'])
          console.log(err)
          setTimeout(() => {
            setBloqueado(false)
            setIntentosCon(intentosCon + intentos)
            setIntentos(0)
            setErr([])
            console.log('Botón desbloqueado')
          }, 5000)
        } else if (intentosCon === 6) {
          setBloqueado(true)
          setIntentosCon(0)
          console.log('Lalo!!!!!!!! aaaaaaaaaaaaaa')
        }
      }
*/