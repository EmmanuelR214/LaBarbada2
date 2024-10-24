import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { InputEmail, VerificationInput, InputPassword, InputPasswordConfirm } from "../../components/Inputs"
import { ButtonBasic } from "../../components/Buttons"
import { useAuth } from "../../routes/context/AuthContext"

function Temporizador({ onTimeout, resetTrigger, setTimeLeftProp }) {
  const [timeLeft, setTimeLeft] = useState(60)
  const initialTimeLeft = useRef(60)
  useEffect(() => {
    const savedTimeLeft = localStorage.getItem('timeLeft')
    const savedTimestamp = localStorage.getItem('timestamp')

    if (savedTimeLeft !== null && savedTimestamp !== null) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000)
      const updatedTimeLeft = Math.max(parseInt(savedTimeLeft) - elapsedTime, 0)
      setTimeLeft(updatedTimeLeft)
      setTimeout(() => setTimeLeftProp(updatedTimeLeft), 0) 
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = Math.max(prevTime - 1, 0)
        localStorage.setItem('timeLeft', newTime)
        localStorage.setItem('timestamp', Date.now().toString())
        setTimeout(() => setTimeLeftProp(newTime), 0)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [setTimeLeftProp])

  useEffect(() => {
    if (resetTrigger) {
      setTimeLeft(initialTimeLeft.current)
      localStorage.setItem('timeLeft', initialTimeLeft.current)
      localStorage.setItem('timestamp', Date.now().toString())
      setTimeout(() => setTimeLeftProp(initialTimeLeft.current), 0)
    }
  }, [resetTrigger, setTimeLeftProp])

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout()
    }
  }, [timeLeft, onTimeout])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  return (
    <span>{formatTime(timeLeft)}</span>
  )
}


function Recuperar() {
  const [currentView, setCurrentView] = useState(0)
  const [resetTrigger, setResetTrigger] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {sendCodeEmail, recoverPassword} = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    const savedView = localStorage.getItem('currentView')
    if (savedView !== null) {
      setCurrentView(parseInt(savedView))
    }
  }, [])
  
  const nextView = () => {
    setCurrentView((prevView) => {
      const newView = (prevView + 1) % 3
      localStorage.setItem('currentView', newView)
      return newView
    })
  }
  const prevView = (e) => {
    e.preventDefault()
    setCurrentView((prevView) => {
      const newView = (prevView - 1 + 3) % 3
      localStorage.setItem('currentView', newView)
      return newView
    })
    localStorage.removeItem('correo')
    localStorage.removeItem('codigo')
    localStorage.removeItem('timestamp')
    localStorage.removeItem('timeLeft')
    window.location.reload()
  }

  const resetTimer = async(e) => {
    e.preventDefault()
    try {
      setResetTrigger((prev) => !prev)
      localStorage.removeItem('codigo')
      const codigo = await sendCodeEmail(localStorage.getItem('correo'))
      localStorage.setItem('codigo', codigo.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const updateTimeLeft = useCallback((newTimeLeft) => {
    setTimeLeft(newTimeLeft)
  }, [])

  const handleTimeout = () => {
    console.log('El tiempo ha terminado')
    localStorage.removeItem('codigo')
  }

  const handleView1 = handleSubmit(async(values) => {
    console.log(values)
    const codigo = await sendCodeEmail(values.correo)
    if(codigo){
      localStorage.setItem('codigo', codigo.data[0])
      localStorage.setItem('correo', values.correo)
      nextView()
    } else {
      toast.error('No se pudo enviar el correo')
    }
  })

  const handleView2 = handleSubmit((values) => {
    const valor = localStorage.getItem('codigo')
    if (values.code === valor) {
      localStorage.removeItem('codigo')
      localStorage.removeItem('timeLeft')
      localStorage.removeItem('timestamp')
      nextView()
    }
    else if (valor === null) {
      toast.error('Codigo caducado')
    }
    else {
      toast.error('El código ingresado no coincide')
    }
  })

  const handleView3 = handleSubmit(async(values) => {
    const mail = localStorage.getItem('correo');
    try {
      const recover = await recoverPassword(mail, values.pass)
      if (recover) {
        localStorage.removeItem('correo')
        localStorage.removeItem('currentView')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      {currentView === 0 && (
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-96">
              <div className="bg-zinc-800 p-4 shadow-white rounded-md">
                <div className="min-h-20 flex items-center justify-center mb-6">
                  <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
                </div>
                <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">Recuperación de contraseña</h2>
                  <p className="text-gray-400 mb-4">Introduce tu correo electrónico y te enviaremos un código de verificación.</p>
                </div>
                <form onSubmit={handleView1} className="space-y-5">
                  <InputEmail title='Correo' name='correo' min='10' max='100' onChange={(e)=>console.log(e.target.value)} err={errors} method={register} look={watch} />
                  <ButtonBasic text="Enviar código" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === 1 && (
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-96">
              <div className="bg-zinc-800 p-4 shadow-white rounded-md">
                <div className="min-h-20 flex items-center justify-center mb-6">
                  <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
                </div>
                <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">Introduce el código</h2>
                  <p className="text-gray-400 mb-4">Introduce el código de verificación que te ha llegado al correo {localStorage.getItem('correo')}</p>
                </div>
                <form onSubmit={handleView2} className="space-y-5">
                  <VerificationInput title='Código de verificación' name='code' min='6' max='6' pattern={/\D/} err={errors} method={register} val={setValue} />
                  <p className='text-center' >Volver a enviar el código: <Temporizador onTimeout={handleTimeout} resetTrigger={resetTrigger} setTimeLeftProp={updateTimeLeft} /></p>
                  <ButtonBasic width='w-full' text='Enviar código nuevamente' click={resetTimer} disabled={timeLeft > 0} />
                  <ButtonBasic text="Cambiar correo" click={prevView} />
                  <ButtonBasic text="Verificar código" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === 2 && (
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-96">
              <div className="bg-zinc-800 p-4 shadow-white rounded-md">
                <div className="min-h-20 flex items-center justify-center mb-6">
                  <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
                </div>
                <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">Cambia tu contraseña</h2>
                  <p className="text-gray-400 mb-4">No compartas tu contraseña con nadie más.</p>
                </div>
                <form onSubmit={handleView3} className="space-y-5">
                  <InputPassword title='Contraseña' name='pass' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                  <InputPasswordConfirm title='Confirmar contraseña' name='passConf' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                  <ButtonBasic text="Enviar contraseña" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Recuperar

