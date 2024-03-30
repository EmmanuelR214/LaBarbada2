//ESTO ES UNA COPIA SEGURA ANTES DE QUE DESMADRE TODO 
/*
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from "../../../routes/context/AuthContext"
import { Icon } from "@iconify/react";
import { InputSearch } from "../../components/Inputs";
import { motion } from "framer-motion";
import { MenuButton } from "../../components/Buttons";

const Menu = () => {
  //  const { getMenu, listMenu } = useAuth();
  const navigate = useNavigate();

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
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

  const styleLink = "inline-block hover:bg-zinc-800 hover:rounded-lg p-2";

  return (
    <div className="flex">
      {/**aqui empieza el *///}
      /*<div className="p-5 w-72 bg-red-600">
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
      </div>

      {/**esto es lo demas que no esta en el slider *///}
      /*<div className="w-full p-4 bg-green-300">
        <h1 className="font-bold text-5xl text-zinc-200 mt-20 mb-6 justify-center flex">Menu</h1>
        <InputSearch />

        <div className=" flex ">
          {/*********TARJETA DE PRUEBA 1************** *///}
        /*  <div className="flex flex-wrap">
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

          {/*************TARJETA DE PRUEBA 2**************** *///}
         /* <div className="flex flex-wrap">
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
          {/********************************* *///}
       /* </div>
      </div>
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


import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from "../../../routes/context/AuthContext"
import { Icon } from "@iconify/react";
import { InputSearch } from "../../components/Inputs";
import { motion } from "framer-motion";
import { MenuButton } from "../../components/Buttons";

const Menu = () => {
  const styleLink = "inline-block hover:bg-zinc-800 hover:rounded-lg p-2";
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 640) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 640) { // En estado responsivo
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest("#default-sidebar")) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);
  
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
    { icon: "lucide:cup-soda", text: "Bebidas" }
  ];
  
  
  return (
    <div flex>
      {/**BOTON QUE APARECE CUANDO SE DESPLIEGA className="flex"*/}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden dark:hover:bg-gray-700 bg-red-600"
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
        {/**INICIA LA BARRA LATERAL  h-full py-4 overflow-y-auto p-5**/}
        <div className="h-full py-4 overflow-y-auto p-5 bg-red-600" style={{scrollbarWidth: 'none', '-ms-overflow-style': 'none', '&::-webkit-scrollbar': {display: 'none'}}}>
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

        {/***TERMINA LA BARRA LATERAL */}
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



