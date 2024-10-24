import { Outlet, useLocation } from "react-router-dom";
import {Nav} from "../components/Nav";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  const location = useLocation()
  const mostrarNav =  !location.pathname.startsWith('/recuperar')
  return(
    <div className="flex flex-col min-h-screen">
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      { mostrarNav ? <Nav/> : null}
      <main className="flex-grow">
        <Outlet/>
      </main>
      { mostrarNav ? <Footer/> : null}
      </div>
  )
}

export default Layout