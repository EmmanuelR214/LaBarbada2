import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import ReCAPTCHA from "react-google-recaptcha"

import { useAuth } from "../../routes/context/AuthContext"

import { ButtonBasic, ButtonRedSocial } from "../../components/Buttons"
import { InputDesign, InputPassword } from "../../components/Inputs"
import { TextLink } from "../../components/Text"

const Captcha = ({ onCaptchaVerify }) => {
    
  const handleCaptchaChange = () => {
    onCaptchaVerify(true)
  }
  
  return (
    <div className=" bg-[#101010]">
      <ReCAPTCHA
        sitekey="6LfQ3w8qAAAAAP20ZyUHAXrZ-7ADKcOzYNsDdAfx"
        onChange={handleCaptchaChange}
        className="mb-4"
      />
    </div>
  );
}

const Login = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signin, isAuthenticade, errorAuth, alertUser, loginGoogle, loginFacebook} = useAuth()
  
  const [intentos, setIntentos] = useState(0)
  const [intentosCon, setIntentosCon] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);  
  const handleCaptchaVerify = (verified) => {
    setCaptchaVerified(verified)
    if (verified) {
      setIntentos(0);
      setIntentosCon(0);
      setBloqueado(false);
    }
  }
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/')
  },[isAuthenticade])
  
  const signinWithGoogle = async(e) =>{
    e.preventDefault()
    try {
      await loginGoogle()
    } catch (error) {
      if(error.code === 'auth/popup-closed-by-user') {
        console.error('Se cerro la ventana de inicio de google')
      }
      else{
        console.log('sucedio un error:', error)
      }
    }
  }
  
  const signinWithFacebook = async(e) =>{
    e.preventDefault()
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
  
  const signinWithApple = (e) =>{
    e.preventDefault()
    console.log('Signin with Apple')
  }
  
  const onSubmit = handleSubmit(async (values) =>{
    try {
      if (bloqueado) {
        console.log('Botón bloqueado');
        return;
      }
      await signin(values);
      if (errorAuth) {
        setIntentos(intentos + 1);
        if (intentos >= 2 && intentosCon < 7) {
          setBloqueado(true);
          toast.error("Botón bloqueado por 2 minutos");
          setTimeout(() => {
            setBloqueado(false);
            setIntentosCon(intentosCon + 3);
            setIntentos(0);
          }, 5000);
        } else if (intentosCon >= 6) {
          setBloqueado(true);
          setShowCaptcha(true);
          setIntentosCon(0);
          Cookies.set('alertUser', `${values.dato}`, { expires: 1 });
          await alertUser();
        }
      }
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <section className="flex flex-col items-center justify-center md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-8 flex flex-col space-y-2 md:space-y-4 justify-center items-center order-2 md:order-1">
        <div className="mb-2 flex flex-col justify-center items-center">
          <h2 className="text-md lg:text-4xl font-bold mb-4">Inicio de sesión</h2>
          <h1 className="text-lg">Bienvenido a <span className="text-red-700">Barbada Order</span></h1>
        </div>
        <form onSubmit={onSubmit} className="mt-4 w-full space-y-8 md:space-y-11 md:w-3/4 lg:w-1/2">
          <InputDesign title='Correo o teléfono' name='dato' min='10' max='100' icon='solar:user-bold' err={errors} method={register} look={watch}/>
          <InputPassword title='Contraseña' name='pass' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
          {showCaptcha && <Captcha onCaptchaVerify={handleCaptchaVerify} />}
          <ButtonBasic text='Iniciar sesión' disabled={bloqueado && !captchaVerified} />
        </form>
        <div className="flex md:flex-col justify-center w-full md:w-3/4 lg:w-1/2 space-x-3 md:space-x-0 lg:space-x-0 space-y-0 md:space-y-3">
          <ButtonRedSocial text='Google' click={signinWithGoogle} textColor="text-slate-800" color="bg-slate-100" hovColor="hover:bg-slate-300"  icon="devicon:google" />
          <ButtonRedSocial text='Facebook' click={signinWithFacebook} color="bg-blue-500" hovColor="hover:bg-blue-600" icon="ic:baseline-facebook" />
          <ButtonRedSocial text='Apple' click={signinWithApple} color="bg-black" hovColor="hover:bg-neutral-900" textHover="hover:text-white" border='border' icon="ic:baseline-apple" />
        </div>
        <TextLink to="/recuperar" text="¿Olvidaste tu contraseña? " linkText="Recuperar contraseña"/>
        <TextLink to="/register" text="¿Aún no tienes cuenta? " linkText="Regístrate" />
      </div>
      <div className="h-[40vh] md:h-screen md:w-3/4 order-1 md:order-2">
        <img src="/img/fondo1.webp" alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}

export default Login