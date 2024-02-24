import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

const ProtectedRoute = () => {
  
  const {loading, isAuthenticade} = useAuth()
  
  if(loading) return <h1>Loading...</h1>
  if(!loading && !isAuthenticade) return <Navigate to="/login" replace />
  
  return <Outlet/>
}

export default ProtectedRoute