import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../routes/context/AuthContext"
import { InputPhone, InputEmail, InputPassword, InputPasswordConfirm, VerificationInput } from "../../components/Inputs"
import { ButtonBasic, CheckButtton } from "../../components/Buttons"
function RegisterNum() {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {signup, findOutNumber, confirmCode, searchPhone, isAuthenticade} = useAuth()
  const navigate = useNavigate()
  const [singinNumber, setSinginNumber] = useState(false)
  const [data, setData] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [numPhone, setNumPhone] = useState(null)
  
  useEffect(() =>{
    if(isAuthenticade) navigate('/')
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
    
  },[isAuthenticade])
  
  const sendCode = handleSubmit(async(value)=>{
    try {
      // console.log(value.tel)
      const search = await searchPhone(value.tel)
      if(search){
        setNumPhone(value.tel)
        await findOutNumber(value.tel)
        setSinginNumber(true)
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  
  
  const confCode = handleSubmit(async(value)=>{
    try {
      const codigo = await confirmCode(value.code)
      if(codigo){
        setData(true)
      }
    } catch (error) {
      console.log(error)
    }
  }) 
  
  const registerData = handleSubmit(async(value)=>{
    try {
      if (!aceptaTerminos) {
        toast.info("Debes aceptar los términos y condiciones para registrarte.")
        return
      }
      // console.log(value.correo, numPhone, value.pass, value.passConf)
      await signup(value.correo, numPhone, value.pass)
    } catch (error) {
      console.log(error)
    }
  })
  
  const handleCheck = (newTerm) => {
    setAceptaTerminos(newTerm)
  }
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full md:w-96">
          <div className="bg-zinc-800 p-4 shadow-white rounded-md">
            <div className="min-h-20 flex items-center justify-center mb-6">
              <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
            </div>
            {!data ? 
              (singinNumber ? 
                (
                <>
                <div className="text-center" >
                  <h2 className=" b-1 text-magenta text-gray-200 font-bold">¡Introduce el codigo!</h2>
                  <p className="text-gray-400 mb-4">Introduce el código de verificación que ha llegado a tu teléfono.</p>
                </div>
                  <form onSubmit={confCode} className="space-y-5">
                    <VerificationInput title='Código de verificación' name='code' min='6' max='6' pattern={/\D/} err={errors} method={register} val={setValue} />
                    <ButtonBasic text="verificar código" />
                  </form>
                </>
                ) : (
                  <>
                  <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">¡Hola! Registrate ahora</h2>
                  <p className="text-gray-400 mb-4">Introduce tu número de teléfono te enviaremos un código de verificación.</p>
                  </div>
                  <form onSubmit={sendCode} className="space-y-5">
                    <InputPhone title='Teléfono' name='tel' min='10' max='10' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                    <div id="recaptcha"></div>
                    <ButtonBasic text="Enviar código" />
                  </form>
                  </>
                )): (
                <>
                <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">¡Ya casi terminamos!</h2>
                  <p className="text-gray-400 mb-4">Introduce tu correo electronico y crear una nueva contraseña para terminar el registro.</p>
                </div>
                  <form onSubmit={registerData} className="space-y-5">
                    <InputEmail title='Correo' name='correo' min='10' max='100' err={errors} method={register} look={watch} /> 
                    <InputPassword title='Contraseña' name='pass' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                    <InputPasswordConfirm title='Contraseña' name='passConf' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                    <CheckButtton register={register} onCheckboxChange={handleCheck} />
                    <ButtonBasic text="Registrarse" />
                  </form>
                </>)
                }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterNum