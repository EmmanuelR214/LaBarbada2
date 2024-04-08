import { Outlet, useLocation } from "react-router-dom";
import {Nav} from "../components/Nav";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation()
  
  const mostrarNav = !location.pathname.startsWith('/register-data') && !location.pathname.startsWith('/recuperar')
  
  return (
    <>
    <ToastContainer pauseOnHover={false} autoClose={2000} />
    { mostrarNav ? <Nav/> : null}
    <main>
      <Outlet/>
    </main>
    { mostrarNav ? <Footer/> : null}
    </>
  )
}

export default Layout