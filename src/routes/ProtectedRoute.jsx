import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Loader from "../components/Loader"
import Cookies from "js-cookie"
const ProtectedRoute = () => {
  const {loading, isAuthenticade} = useAuth()
  
  
  if(loading) return <Loader/>
  if(!loading && !isAuthenticade) { Cookies.remove('token'); return <Navigate to="/login" replace />} 
  
  return (
    <Outlet/>
  )
}

export default ProtectedRoute