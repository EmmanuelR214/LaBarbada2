import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../routes/context/AuthContext";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";


export const Logo = ({}) =>{
  return(
    <>
      <Link to='/' >
        <img src="/img/logo.png" alt="Barbada Logo" className="w-8" />
      </Link>
    </>
  )
}

export const Nav = () => {
  const navigate = useNavigate();
  const { isAuthenticade, logout, numeroProductos} = useAuth();
  const [open, setOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  // Obtén el número de productos del carrito y asegúrate de convertirlo a número  
  
  useEffect(() => {
    const handleResize = () => {
      const newIsResponsive = window.innerWidth <= 768;
      setIsResponsive(newIsResponsive);

      // Cierra el menú si el tamaño de la pantalla cambia de modo responsive a modo no responsive
      if (!newIsResponsive && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path, { replace: true });
    setOpen(false); // Cierra el menú después de navegar
    // window.location.reload();
  };

  const handleLogout = () => {
    logout();
    if (isResponsive) {
      setOpen(false); // Cierra el menú después de hacer logout
    }
  };

  const links = isAuthenticade
  ? [
      { to: "/", text: "Inicio", onClick: () => setOpen(false) },
      { to: "/menu", text: "Menú", onClick: () => setOpen(false) },
      { to: "/nosotros", text: "Nosotros", onClick: () => setOpen(false) },
      // Solo mostramos estos íconos en la navegación principal (no en el menú de hamburguesa)
      ...(!isResponsive || !open ? [
        {
          to: "/shoppingcar",
          text: "",
          icon: "material-symbols:shopping-cart",
          onClick: (e) => handleLinkClick(e, '/shoppingcar')
        },
        {
          to: "/profile",
          text: "",
          icon: "fa:user-circle-o",
          onClick: (e) => handleLinkClick(e, '/profile')
        }
      ] : []),
      {
        to: "/",
        text: "Salir",
        onClick: handleLogout,
      },
    ]
  : [
      { to: "/", text: "Inicio", onClick: () => setOpen(false) },
      { to: "/menu", text: "Menú", onClick: () => setOpen(false) },
      { to: "/nosotros", text: "Nosotros", onClick: () => setOpen(false) },
      { to: "/login", text: "Iniciar sesión", onClick: () => setOpen(false) },
    ];


  return (
    <div className="w-full text-white">
      <nav className="bg-black fixed left-0 w-full z-20 flex justify-between px-8 py-2 items-center rounded-3xl mt-4">
        <Logo />
        <div className="md:hidden flex items-center">
          {isAuthenticade && (
            <>
              <div className="relative">
                <Link
                  to="/shoppingcar"
                  className={`mr-4 ${isResponsive ? "block" : "block"} hover:text-red-600 active:text-yellow-500`}
                  onClick={(e) => handleLinkClick(e, '/shoppingcar')}
                >
                  <Icon icon="material-symbols:shopping-cart" className="w-6 h-6" />
                </Link>

                {/* Mostrar el badge en todas las resoluciones */}
                {numeroProductos > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                    {numeroProductos}
                  </span>
                )}
              </div>
              <Link
                to="/profile"
                className={`hover:text-red-600 active:text-yellow-500`}
                onClick={(e) => handleLinkClick(e, '/profile')}
              >
                <Icon icon="fa:user-circle-o" className="w-6 h-6 mr-4" />
              </Link>
            </>
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="sidebar"
            className="text-white"
          >
            <Icon
              icon={open ? "ep:close-bold" : "material-symbols:menu"}
              className="w-8 h-8"
            />
          </button>
        </div>
        <ul
          id="sidebar"
          className={`fixed top-0 right-0 h-full w-64 bg-[#151515] bg-opacity-95 shadow-md p-4 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <li className="mb-4 flex justify-end">
            <button onClick={() => setOpen(false)} className="text-white hover:text-red-500">
              <Icon icon="ep:close-bold" className="w-8 h-8" />
            </button>
          </li>
          {links.map((link, index) => (
            <li key={index} className="mb-4">
              {link.icon ? (
                <Link to={link.to} className="inline-block relative hover:text-red-600 active:text-yellow-500" onClick={link.onClick}>
                  <span className="inline-block">
                    <Icon icon={link.icon} className="w-6 h-6" />
                  </span>
                </Link>
              ) : (
                <Link
                  to={link.to}
                  className="block text-white px-4 py-2 hover:text-red-600 active:text-yellow-500"
                  onClick={link.onClick}
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul
          className={`hidden md:flex md:flex-row md:items-center md:space-x-4 ${
            open ? "md:hidden" : ""
          }`}
        >
          {links.map((link, index) => (
            <li key={index} className="hover:bg-red-600 hover:text-black rounded-3xl px-2 py-1">
              {link.icon ? (
                <Link to={link.to} className="inline-block relative hover:text-black active:text-yellow-500" onClick={link.onClick}>
                  <Icon icon={link.icon} className="w-6 h-6" />
                  {/* Mostrar el badge también en pantallas grandes */}
                  {link.icon === "material-symbols:shopping-cart" && numeroProductos > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                      {numeroProductos}
                    </span>
                  )}
                </Link>
              ) : (
                <Link
                  to={link.to}
                  className="hover:font-bold hover:blue-red-600 active:text-yellow-500"
                  onClick={link.onClick}
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {open && isResponsive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10 overflow-y-auto"></div>
      )}
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
        <Logo  />
    </nav>
  )
}
