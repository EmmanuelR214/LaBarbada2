import { useEffect, useState } from "react"

//contexto
import { useAuth } from "../../../routes/context/AuthContext"

//Recursos
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const Home = () => {
  
  const {successAuth} = useAuth()
  
  useEffect(()=>{
    if(successAuth) successAuth.forEach((success) => toast.success(success))
  },[successAuth])
  
  return (
    <section>
      <ToastContainer/>
      <div>Home</div>
    </section>
  )
}
