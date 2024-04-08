import { toast } from "react-toastify";
import { useAuth } from "../../routes/context/AuthContext";

export const handleGoogle = async() =>{
  const {loginGoogle} = useAuth()
  try {
    const credentialsGoogle = await loginGoogle()
    console.log(credentialsGoogle)
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      toast.warning('Se canceló la operación.');
    } else {
      console.log('Ocurrió un error:', error); 
      toast.warning('Se canceló la operación.');
    }
  }
}

export const handleFacebook = async() =>{
  const { loginFacebook} = useAuth()
  try {
    await loginFacebook()
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      toast.warning('Se canceló la operación.');
    } else {
      console.log('Ocurrió un error:', error);
      toast.warning('Se canceló la operación.');
    }
  }
}

export const handleApple = () =>{
  console.log('Login apple')
}