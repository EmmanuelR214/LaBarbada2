import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { useStore } from "../routes/context/StoreContext";

import { InputSearch } from "../components/Inputs";
import { MenuButton, ButtonBasic } from "../components/Buttons";
import { CardMenu } from "../components/Cards";

const Menu = () => {
  const {listMenu, category} = useStore()
  const [sidebarVisible, setSidebarVisible] = useState(true)
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (window.innerWidth < 1024) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && !sidebar.contains(event.target)) {
          setSidebarVisible(false);
        }
      }
    }
    
    if (sidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible]);
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  return (
    <main className="h-screen flex relative" >
      <section>
      <motion.aside
        id="sidebar"
        className={`w-60 bg-red-600 p-5 fixed z-10 h-full lg:relative ${
          sidebarVisible
            ? "lg:static lg:z-auto lg:w-auto overflow-y-auto max-h-screen"
            : "hidden"
        }`}
        initial={false}
        animate={{
          x: sidebarVisible ? 0 : -240,
          transition: { duration: 0.3, type: "tween" },
        }}
      >
        <style>
          {`
            #sidebar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <h2 className="text-2xl font-bold mt-16 mb-8">Categorías</h2>
        {category.map((item, index) => (
            <ButtonBasic
              key={index}
              text={item.nombreCategoria}
              icon={item.url_icono}
              color="bg-red-600"
              hovColor="hover:bg-zinc-800"
              textHover=""
              position="justifi-start"
            />
        ))}
      </motion.aside>
      </section>
      <section className="flex-1 p-5 overflow-y-auto space-y-4" >
      <h1 className="text-white text-5xl font-semibold mt-14 mb-8 text-center">Menu</h1>
      <InputSearch/>
        <div className="overflow-y-auto h-[64vh]" style={{ scrollbarWidth: "none" }} >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listMenu.map((platillos,index)=>(
            <CardMenu
              key={index}
              img={platillos.imagen_platillo}
              title={platillos.nombre_platillo}
              precio={platillos.precio}
            />
          ))}
          </div>
        </div>
      </section>
      <button
        className={`lg:hidden absolute top-5 left-5 z-20 ${
          sidebarVisible ? "hidden" : ""
        }`}
        onClick={toggleSidebar}
      >
        <Icon
          icon="iconamoon:menu-burger-horizontal-bold"
          className="text-2xl mt-24"
        />
      </button>
    </main>
  )
}

export default Menu