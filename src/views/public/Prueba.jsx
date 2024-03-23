
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
      if (!user) {
        throw new Error("No hay ID de confirmación disponible. Envía el código primero.");
      }
      const verificationCode = code;
      const confirmationResult = await user.confirm(verificationCode);
      const signedInUser = confirmationResult.user;
      console.log("¡Código verificado con éxito!");
      console.log("Usuario autenticado:", signedInUser);

    } catch (error) {
      console.error("Error al verificar el código:", error);
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


