import { Outlet, useLocation } from "react-router-dom";
import {Nav, NavR} from "../components/Nav";

const Layout = () => {
  const location = useLocation()
  
  const mostrarNav = !location.pathname.startsWith('/register-data') && !location.pathname.startsWith('/recuperar')
  
  return (
    <>
    { mostrarNav ? <Nav/> : null}
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default Layout