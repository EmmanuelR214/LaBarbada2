import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from "../../../routes/context/AuthContext"
import { Icon } from "@iconify/react";
import { InputSearch } from "../../components/Inputs";
import { motion } from "framer-motion";
import { MenuButton } from "../../components/Buttons";

const Menu = () => {
  //  const { getMenu, listMenu } = useAuth();

  const styleLink = "inline-block hover:bg-zinc-800 hover:rounded-lg p-2";
  //Para abir y cerrar el menu siderbar
  const [sidebarOpen, setSidebarOpen] = useState(true); // Inicia abierto en pantalla completa

  useEffect(() => {
    // Verifica el tamaño de la ventana para cambiar el estado del sidebar en responsivo
    const handleWindowResize = () => {
      if (window.innerWidth <= 640) { // Si es una pantalla pequeña
        setSidebarOpen(false); // Cierra el sidebar en modo responsivo
      } else {
        setSidebarOpen(true); // Abre el sidebar en modo de escritorio
      }
    };

    // Ejecuta la función de manejo del tamaño de la ventana cuando se carga y se redimensiona la ventana
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize(); // Se ejecuta una vez para establecer el estado inicial

    // Limpia el event listener al desmontar el componente
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const toggleSidebar = () => {
    // Cambia el estado del sidebar solo en modo responsivo
    if (window.innerWidth <= 640) {
      setSidebarOpen(!sidebarOpen);
    }
  };
  
  const menuItems = [
    { icon: "ph:shrimp", text: "Camarones" },
    { icon: "tabler:fish", text: "Pescados" },
    { icon: "streamline:octopus", text: "Pulpos" },
    { icon: "fluent:food-24-filled", text: "Pa empeza" },
    { icon: "mingcute:soup-pot-line", text: "Caldos" },
    { icon: "icon-park-outline:chili", text: "Aguachiles y ceviches" },
    { icon: "streamline:cocktail", text: "Cocteles" },
    { icon: "material-symbols:menu-book-outline", text: "Pa picar" },
    { icon: "bxs:bowl-rice", text: "Guarniciones" },
    { icon: "material-symbols:star-outline", text: "Especialidades" },
    { icon: "mdi:grill", text: "Parilla" },
    { icon: "ph:knife", text: "Cortes" },
    { icon: "ph:hamburger", text: "Hamburguesas" },
    { icon: "cil:dinner", text: "Tostadas" },
    { icon: "fluent:food-fish-20-filled", text: "Filetes" },
    { icon: "pepicons-pop:label-circle", text: "Promociones" },
    { icon: "lucide:cup-soda", text: "Bebidas" },
  ];
  
  
  return (
    <div flex>
      {/**BOTON QUE APARECE CUANDO SE DESPLIEGA */}
      <button

        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm  rounded-lg sm:hidden dark:hover:bg-gray-700 bg-red-600"
        onClick={toggleSidebar}
      >
        <span class="sr-only bg-amber-300">Open sidebar</span>
        <Icon icon="ci:hamburger-md" />
      </button>

      <motion.aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        {/**INICIA LA BARRA LATERAL  h-full py-4 overflow-y-auto p-5*/}
        <div class="h-full py-4 overflow-y-auto p-5  bg-red-600">
          <h2 className="text-3xl  font-bold mt-16 mb-8 ">Categorías</h2>

          <ul>
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                className={`flex items-center mb-1 ${styleLink}`}
              
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={item.icon} className="mr-2 size-6" />
                {item.text}
              </motion.li>
            ))}
          </ul>
        </div>

        {/***TERMINA LA BARRA LATERAL *** */}
      </motion.aside>
      {/*ES LA PARTE DONDE IRIAN LAS TARJETAS */}
      <div class="p-4 sm:ml-64 bg-orange-200 ">
        {/**INICIA 1 TARJETA */}
        <div className="flex flex-wrap">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800 relative">
            <img
              className="w-full h-36 object-cover rounded-xl"
              src="/img/Login.jpg"
            />
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="w-full">
                <div className="font-bold text-xl mb-2"></div>
                <p className="text-white text-lg">Camarones para pelar</p>
                <div className="flex items-center justify-between ">
                  <p className="text-orange-500 font-bold text-2xl ">$140</p>
                  <MenuButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**TERMINA 1 TARJETA */}


        
      </div>
      {/**FINAL DEL ESPACIO DE TRAJETAS  */}
    </div>
  );
};

export default Menu;

/*
  const menuItems=[
    { icon: "ph:shrimp", text: "Camarones" },
    { icon: "tabler:fish", text: "Pescados" },
    { icon: "streamline:octopus", text: "Pulpos" },
    { icon: "fluent:food-24-filled", text: "Pa empeza" },
    { icon: "mingcute:soup-pot-line", text: "Caldos" },
    { icon: "icon-park-outline:chili", text: "Aguachiles y ceviches" },
    { icon: "streamline:cocktail", text: "Cocteles" },
    { icon: "material-symbols:menu-book-outline", text: "Pa picar" },
    { icon: "bxs:bowl-rice", text: "Guarniciones" },
    { icon: "material-symbols:star-outline", text: "Especialidades" },
    { icon: "mdi:grill", text: "Parilla" },
    { icon: "ph:knife", text: "Cortes" },
    { icon: "ph:hamburger", text: "Hamburguesas" },
    { icon: "cil:dinner", text: "Tostadas" },
    { icon: "fluent:food-fish-20-filled", text: "Filetes" },
    { icon: "pepicons-pop:label-circle", text: "Promociones" },
    { icon: "lucide:cup-soda", text: "Bebidas" }
  ]; */

/*
          <div className="flex flex-wrap">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800 relative">
            <img
              className="w-full h-36 object-cover rounded-xl"
              src="/img/Login.jpg"
            />
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="w-full">
                <div className="font-bold text-xl mb-2"></div>
                <p className="text-white text-lg">Camarones para pelar</p>
                <div className="flex items-center justify-between ">
                  <p className="text-orange-500 font-bold text-2xl ">$140</p>
                  <MenuButton/>
                </div>
              </div>
            </div>
          </div>
        </div>
*/

////////////////////////////////////////////////////////

/*
<div className="flex">
<div className="p-5 w-72 bg-red-600">
  <h2 className="text-3xl  font-bold mt-16 mb-8 ">Categorías</h2>

  <ul>
    {menuItems.map((item, index) => (
      <motion.li
        key={index}
        className={`flex items-center mb-1 ${styleLink}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon icon={item.icon} className="mr-2 size-6" />
        {item.text}
      </motion.li>
    ))}
  </ul>
</div>*/
