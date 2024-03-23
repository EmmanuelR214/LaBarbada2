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
import { TextLink } from "../../../components/Text"

export const Login = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signin, alertUser, loginGoogle, loginFacebook, isAuthenticade ,errorAuth, successAuth} = useAuth()
  
  const navigate = useNavigate()
  
  const [intentos, setIntentos] = useState(0)
  const [intentosCon, setIntentosCon] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/home')
    
    if (errorAuth && Array.isArray(errorAuth)) {
      errorAuth.forEach((error) => toast.error(error));
    }
    
    if(successAuth) {
      successAuth.forEach((success) => toast.success(success))
    }
  },[isAuthenticade, successAuth, errorAuth])
  
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
      else if (errorAuth) {
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
          Cookies.set('alertUser', `${values.correo}`, { expires: 1})
          toast.error("Boton bloqueado por un 24h")
          await alertUser()
        }
      }
      await signin(values)
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <section className="flex flex-col items-center justify-center md:flex-row h-screen">
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <div className="w-full md:w-1/2 p-8 flex flex-col space-y-2 md:space-y-4 justify-center items-center order-2 md:order-1">
        <div className="mb-2 flex flex-col justify-center items-center" >
          <h2 className="text-md lg:text-4xl font-bold mb-4">Inicio de sesión</h2>
          <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
        </div>
        <form onSubmit={onSubmit} className="mt-4 w-full space-y-8 md:space-y-11 md:w-3/4 lg:w-1/2">
          <InputBasic titulo='Nombre de usuario' nombre='correo' tipo='text' minimo='8' maximo='100'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
          <InputBasic titulo='Contraseña' nombre='passLog' tipo='password' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
          <ButtonBasic text='Iniciar sesión' width='w-full' disabled={bloqueado}  />
        </form>
        <div className="flex md:flex-col justify-center w-full md:w-3/4 lg:w-1/2 space-x-3 md:space-x-0 lg:space-x-0 space-y-0 md:space-y-3 ">
          <ButtonBasic text='Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="hover:bg-slate-300"  icon="devicon:google" width='w-full' />
          <ButtonBasic text='Facebook' click={handleFacebook} color="bg-blue-500" hovColor="hover:bg-blue-600" icon="ic:baseline-facebook" width='w-full' />
          <ButtonBasic text='Apple' click={handleApple} color="bg-black" hovColor="hover:bg-neutral-900" textHover="hover:text-white" border='border' icon="ic:baseline-apple" width='w-full' />
        </div>
        <TextLink to="/recuperar" text="¿Olvidaste tu contraseña? " linkText="Recuperar contraseña"/>
        <TextLink to="/register" text="¿Aún no tienes cuenta? " linkText="Regístrate" />
      </div>
      <div className="h-screen md:w-3/4 order-1 md:order-2 bg-red-500">
        <img src="/img/Login.jpg" alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}


/*
<section className="w-full h-[93vh] flex">
      <div className=" w-2/5 flex justify-center items-center bg-[#101010] ">
      <ToastContainer pauseOnHover={false} autoClose={2000} />
        <div className="flex flex-col justify-center items-center space-y-9">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Registro</h1>
            <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
          </div>
          <div className="space-y-6">
            <LinkButton text="Teléfono" to="/register-data" icon="ic:baseline-phone" />
            <ButtonBasic text='Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="hover:bg-slate-300"  icon="devicon:google" />
            <ButtonBasic text='Facebook' click={handleFacebook} color="bg-blue-600" hovColor="hover:bg-blue-700" icon="ic:baseline-facebook"/>
            <ButtonBasic text='Apple' click={handleApple} color="bg-black" border='border' icon="ic:baseline-apple" />
          </div>
          <TextLink text="¿Ya tienes cuenta?" linkText="Iniciar sesión" to="/login" />
        </div>
      </div>
      
      <div className=" w-3/5">
        <img src='/img/Login.jpg' alt="imagen reg" className="object-cover w-full h-full" />
      </div>
    </section>
*/
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

/*
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
        <img src='/imagenes/Login.jpg' alt="imagen login" className="object-cover w-full h-full" />
      </div>
    </section>
*/


/*
<section className="w-full h-[93vh] flex">
      <div className=" w-2/5 flex justify-center items-center bg-[#101010] ">
      <ToastContainer pauseOnHover={false} autoClose={2000} />
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
            <ButtonBasic text='Iniciar sesión con Google' click={handleGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="bg-red-500"/>
            <ButtonBasic text='Iniciar sesión con Facebook' click={handleFacebook} color="bg-blue-600" hovColor="bg-blue-700" />
            <ButtonBasic text='Iniciar sesión con Apple' click={handleApple} color="bg-black" border='border' />
          </div>
          <TextLink to="/recuperar" text="¿Olvidaste tu contraseña? " linkText="Recuperar contraseña"/>
          <TextLink to="/register" text="¿Aún no tienes cuenta? " linkText="Regístrate" />
        </div>
      </div>
      
      <div className=" w-3/5">
        <img src='/img/Login.jpg' alt="imagen login" className="object-cover w-full h-full" />
      </div>
    </section>

*/