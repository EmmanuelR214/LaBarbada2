import { Link } from "react-router-dom"
import { useAuth } from "../routes/context/AuthContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';



const Nav = () => {
  
  const { isAuthenticade, logout, user} = useAuth()
  
  return (
    <nav className="bg-black p-2 flex justify-between items-center border-b-2 border-white" >
      <Link to='/' >
        <img src="/public/imagenes/logo.png" className="h-12 px-4 " alt="Barbada Logo" />
        <span className="hidden">Barbada</span>
      </Link>
      <ul className="flex space-x-2 items-center" >
        {
          isAuthenticade ? (
            <>
            <li>
              <Link to='/home' className="group text-white px-2 py-1 transition-all duration-300" > <span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Inicio</span> </Link>
            </li>
            <li>
              <Link to='/menu' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Menú</span></Link>
            </li>
            <li>
              <Link to='/reservations' className="group text-white px-2 py-1 transition-all duration-300"  ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Reservaciones</span></Link>
            </li>
            <li>
              <Link to='/shoppingcar' className="group text-white px-2 py-1 transition-all duration-300">
                <span className=" group-hover:text-red-500  px-2 py-1">
                  <FontAwesomeIcon icon={faShoppingCart} size="xl" />
                </span>
              </Link>
            </li>
            <li>
                <Link to='/profile' className="group text-white px-2 py-1 transition-all duration-300">
                <span className=" group-hover:text-red-500  px-2 py-1">
                    <FontAwesomeIcon icon={faUserCircle} size="xl" />
                </span>
                </Link>
            </li>
            <li>
              <Link to='/' onClick={() => { logout() }} className="group text-white px-2 py-1 transition-all duration-300">
                <span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Salir</span>
              </Link>
            </li>
                </>
              ) : (
                <>
                <li>
                  <Link to='/home' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Inicio</span></Link>
                </li>
                <li>
                  <Link to='/menu' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Menú</span></Link>
                </li>
                <li>
                  <Link to='/reservations' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Reservaciones</span></Link>
                </li>
                <li>
                  <Link to='/weare' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Nosotros</span></Link>
                </li>
                <li>
                  <Link to='/login' className="group text-white px-2 py-1 transition-all duration-300" ><span className="group-hover:font-bold group-hover:bg-white group-hover:text-red-500 rounded-full px-2 py-1">Iniciar sesión</span></Link>
                </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Nav