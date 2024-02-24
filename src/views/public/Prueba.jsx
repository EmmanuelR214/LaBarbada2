
// Firebase
import { auth } from "../../utils/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber,  } from "firebase/auth";

// Componentes
import { useState } from "react";

export const Prueba = () => {
  const [phone, setPhone] = useState('')
  const [user, setUser] = useState('')
  const [code, setCode] = useState('')
  
  const onSubmit  = async()=>{
    try {
      const numTel = `+52${phone}`
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        'size': 'invisible'
      })
      const confirmationNumberPhone =  await signInWithPhoneNumber(auth, numTel, recaptcha)
      setUser(confirmationNumberPhone)
      
      
      console.log(confirmationNumberPhone)
    } catch (error) {
      console.log('error al enviarr codigo; ', error)
    }
  }
  
  const verifyCode = async()=>{
    try {
      // 1. Asegúrate de tener el ID de confirmación a la mano
      if (!user) {
        throw new Error("No hay ID de confirmación disponible. Envía el código primero.");
      }
  
      // 2. Obtén el código ingresado por el usuario
      const verificationCode = code;
  
      // 3. Verifica el código con Firebase
      const confirmationResult = await user.confirm(verificationCode);
  
      // 4. Obtén el usuario autenticado
      const signedInUser = confirmationResult.user;
  
      // 5. Felicita al usuario y continúa con el proceso de registro
      console.log("¡Código verificado con éxito!");
      console.log("Usuario autenticado:", signedInUser);
  
      // Aquí puedes redirigir o mostrar un mensaje de éxito al usuario.
    } catch (error) {
      console.error("Error al verificar el código:", error);
  
      // Maneja el error de manera apropiada, mostrando un mensaje al usuario.
    }
  }
  
  return (
    <section>
      <div id="recaptcha"></div>
      <input type="tel" className="text-black" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={onSubmit}>Enviar código</button>
      <input type="text" className="text-black" onChange={(e) => setCode(e.target.value)} />
      <button onClick={verifyCode}>Confirmar código</button>
    </section>
  )
}
