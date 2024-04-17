import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//Componentes
import { NavR } from '../../components/Nav';
import { InputEmail, VerificationInput, InputPassword, InputPasswordConfirm, InputBasic } from '../../components/Inputs';
import { ButtonBasic } from '../../components/Buttons';
import { useAuth } from '../../routes/context/AuthContext';

const Recuperar = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm()
  const { recoverPassword, sendCodeEmail, isAuthenticade } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const stepFromUrl = parseInt(queryParams.get('step')) || 1
  const [step, setStep] = useState(stepFromUrl)
  const [timeLeft, setTimeLeft] = useState(parseInt(localStorage.getItem('timeLeft')) || 180);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (isAuthenticade) navigate('/home')
  }, [isAuthenticade])

  useEffect(() => {
    const newUrl =` ${location.pathname}?step=${step}`
    navigate(newUrl, { replace: true })
  }, [step, navigate, location.pathname])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          localStorage.removeItem('codigo');
          localStorage.removeItem('timeLeft');
          clearInterval(timer); // Detener el temporizador cuando el tiempo alcanza 0
          return 0;
        } else {
          localStorage.setItem('timeLeft', String(prevTimeLeft - 1));
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem('codigo');
      localStorage.removeItem('timeLeft');
      console.log('Código eliminado del localStorage después de 3 minutos.');
    }, 3 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1))
  }

  const handleRestartTimer = () => {
    setTimeLeft(180); // Reiniciar el contador a su valor inicial
    localStorage.setItem('timeLeft', '180'); // Actualizar el valor en localStorage
    const timer = setInterval(() => { // Iniciar el temporizador nuevamente
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          localStorage.removeItem('codigo');
          localStorage.removeItem('timeLeft');
          clearInterval(timer); // Detener el temporizador cuando el tiempo alcanza 0
          return 0;
        } else {
          localStorage.setItem('timeLeft', String(prevTimeLeft - 1));
          return prevTimeLeft - 1;
        }
      });
    }, 1000);
  };

  const handleSendCode = handleSubmit(async (values) => {
    try {
      const codigo = await sendCodeEmail(values.correo)
      if (codigo) {
        localStorage.setItem('codigo', codigo.data[0])
        localStorage.setItem('correo', values.correo)
        handleNextStep()
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  const handleCompareCode = handleSubmit(async (values) => {
    try {
      const valor = localStorage.getItem('codigo')
      if (values.code === valor) {
        localStorage.removeItem('codigo')
        handleNextStep()
      }
      else if (valor === null) {
        toast.error('Codigo caducado')
      }
      else {
        toast.error('El código ingresado no coincide')
      }
    } catch (error) {
      console.log(error)
    }
  })

  const handleResendCode = async (e) => {
    try {
      e.preventDefault();
      const mail = localStorage.getItem('correo');
      const codigo = await sendCodeEmail(mail);
      localStorage.setItem('codigo', codigo.data[0]);
      handleRestartTimer(); // Reiniciar el contador al reenviar el código
      toast.success('Código enviado nuevamente');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecoverPasword = handleSubmit(async (values) => {
    try {
      const valor = localStorage.getItem('correo')
      const yes = await recoverPassword(valor, values.pass)
      if (yes) {
        localStorage.removeItem('correo')
      }
    } catch (error) {
      console.log(error)
    }
  })

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
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
                  <form onSubmit={handleSendCode} className="space-y-5">
                    <InputEmail title='Correo' name='correo' min='10' max='100' err={errors} method={register} look={watch} />
                    <ButtonBasic text="Enviar código" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-full md:w-96">
                <div className="bg-zinc-800 p-4 shadow-white rounded-md">
                  <div className="min-h-20 flex items-center justify-center mb-6">
                    <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
                  </div>
                  <div className="text-center" >
                    <h2 className="mb-1 text-magenta text-gray-200 font-bold">Introduce el código</h2>
                    <p className="text-gray-400 mb-4">Introduce el código de verificación que te ha llegado al correo.</p>
                  </div>
                  <form onSubmit={handleCompareCode} className="space-y-5">
                    <VerificationInput title='Código de verificación' name='code' min='6' max='6' pattern={/^(?=.[A-Z])(?=.[a-z])(?=.\d).$/} err={errors} method={register} val={setValue} />
                    <p className='text-center' >Volver a enviar el código: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
                    <ButtonBasic width='w-full' text='Enviar código nuevamente' click={handleResendCode} disabled={timeLeft > 0} />
                    <ButtonBasic text="Verificar código" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
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
                  <form onSubmit={handleRecoverPasword} className="space-y-5">
                    <InputPassword title='Contraseña' name='pass' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                    <InputPasswordConfirm title='Contraseña' name='passConf' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                    <ButtonBasic text="Enviar contraseña" />
                  </form>
                </div>
              </div>
            </div>
          </div>
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