import { Link } from "react-router-dom"
import { useAuth } from "../routes/context/AuthContext"
import { Icon } from '@iconify/react';

import { useState, useEffect } from "react";

const styleLink = 'font-bold inline-block hover:bg-red-600 hover:text-black hover:rounded-3xl px-2 py-1'

export const Logo = ({route}) =>{
  const ro = route || '/'
  return(
    <>
      <Link to={ro}>
        <img src="/img/logo.svg" alt="Barbada Logo" className="w-14" />
      </Link>
    </>
  )
}

export const Nav = () => {
  const { isAuthenticade, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const newIsResponsive = window.innerWidth <= 768;
      if (!newIsResponsive && open) {
        setOpen(false);
      }
      setIsResponsive(newIsResponsive);
    };
    
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const links = isAuthenticade
    ? [
        { to: "/home", text: "Inicio" },
        { to: "/menu", text: "Menú" },
        { to: "/reservations", text: "Reservaciones" },
        {
          to: "/shoppingcar",
          text: "",
          icon: "material-symbols:shopping-cart",
          hidden: isResponsive,
        },
        {
          to: "/profile",
          text: "",
          icon: "fa:user-circle-o",
          hidden: isResponsive,
        },
        {
          to: "/",
          text: "Salir",
          onClick: () => {
            logout();
            setOpen(!open);
          },
        },
      ]
    : [
        { to: "/home", text: "Inicio" },
        { to: "/menu", text: "Menú" },
        { to: "/reservations", text: "Reservaciones" },
        { to: "/weare", text: "Nosotros" },
        { to: "/login", text: "Iniciar sesión" },
      ];

  return (
    <div className="fixed top-0 left-0 w-full z-10 flex justify-center">
      <nav className="bg-[#000000] flex justify-between px-8 py-2 m-4 items-center w-[1363px] rounded-full ">
        <div className="flex justify-between items-center">
          <Logo/>
        </div>
        <div className="md:hidden flex items-center z-10">
          {/* Iconos en modo responsivo */}
          {isAuthenticade && (
            <>
              <Link
                to="/shoppingcar" className={`mr-4 ${isResponsive ? "block" : "hidden"}`}
              >
                <Icon
                  icon="material-symbols:shopping-cart" className="w-6 h-6"
                />
              </Link>
              <Link
                to="/profile" className={`${isResponsive ? "block" : "hidden"}`}
              >
                <Icon icon="fa:user-circle-o" className="w-6 h-6 mr-4" />
              </Link>
            </>
          )}
          <button onClick={() => setOpen(!open)}>
            <Icon
              icon={open ? "ep:close-bold" : "material-symbols:menu"} //<span class="icon-[material-symbols--menu]"></span>
              className="w-8 h-8 text-white"
            />
          </button>
        </div>
        <ul
          className={`md:flex flex-col md:flex-row md:items-center md:space-x-4 ${
            open
              ? "md:flex md:items-center absolute bg-[#000000e8] left-8 right-8 transform md:transform-none md:relative animate-menu-drop duration-300 ease-in-out rounded-lg md:w-auto  md:pl-0 pl-7 py-1"
              : "hidden"
          }`}
          style={{
            marginTop: open ? (isAuthenticade ? "300px" : "340px") : "0",
            padding: open ? "1rem" : "0",
          }}
        >
          {links.map((link, index) => (
            <li key={index} style={{ marginBottom: open ? "1rem" : "0" }}>
              {/* Agregar espacio vertical entre los enlaces cuando el menú está abierto */}
              {link.icon ? (
                !link.hidden && (
                  <Link to={link.to} className="inline-block relative">
                    <span className="inline-block hover:text-red-600">
                      <Icon icon={link.icon} className="w-6 h-6" />
                    </span>
                  </Link>
                )
              ) : (
                <Link
                  to={link.to}
                  className={`${styleLink} hover:font-bold`}
                  onClick={link.onClick}
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};


export const NavR = ({click}) =>{
  return(
    <nav className="bg-[#282828] text-white flex w-full p-1">
      <div className=" w-[43%] md:w-[47%] flex items-center">
        <Icon icon='openmoji:return'/>
        <button onClick={click} >volver</button>
      </div>
      <div className=" md:w-[53%] flex items-center">
        <Logo  />
      </div>
    </nav>
  )
}