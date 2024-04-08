import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { useStore } from "../routes/context/StoreContext";

import { InputSearch } from "../components/Inputs";
import { MenuButton } from "../components/Buttons";

export const Prueba = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const {listMenu} = useStore()
  
  
  console.log(listMenu)
  
  
  
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

  const styleLink =
    "inline-block hover:bg-zinc-800 hover:rounded-lg p-2 text-white";

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
    <div className="min-h-screen flex relative">
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
      </motion.aside>

      <main className="flex-1 p-5 overflow-y-auto ">
        <h1 className="text-white text-5xl font-semibold mt-14 mb-8 text-center">
          Menu
        </h1>
        <div className="flex mb-6">
          {" "}
          <InputSearch></InputSearch>
          {/* InputSearch component */}
        </div>
        {/* AQUI VAN LAS TARJETAS */}
        <div className="overflow-y-auto h-[64vh]" style={{ scrollbarWidth: "none" }} >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="max-w-sm rounded-xl overflow-hidden bg-zinc-800 relative"
              >
                <img
                  className="w-full h-36 object-cover rounded-xl"
                  src="/img/Login.jpg"
                  alt={item.text}
                />
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="w-full">
                    <div className="font-bold text-xl mb-2"></div>
                    <p className="text-white text-lg">{item.text}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-orange-500 font-bold text-2xl">$140</p>
                      {/* <MenuButton /> */}
                      <MenuButton/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
    </div>
  );
}


/*  TELEFONO FIREBASE


// Firebase
import { auth } from "../utils/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber,  } from "firebase/auth";

// Componentes
import { useState } from "react";


  const [phone, setPhone] = useState('')
  const [user, setUser] = useState('')
  const [code, setCode] = useState('')
  
  const onSubmit  = async()=>{
    try {
      const numTel = `+52${phone}`
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        'size': 'invisible'
      })
      const confirmationNumberPhone =  await signInWithPhoneNumber(auth, numTel, recaptcha)
      setUser(confirmationNumberPhone)
      
      
      console.log(confirmationNumberPhone)
    } catch (error) {
      console.log('error al enviarr codigo; ', error)
    }
  }
  
  const verifyCode = async()=>{
    try {
      if (!user) {
        throw new Error("No hay ID de confirmación disponible. Envía el código primero.");
      }
      const verificationCode = code;
      const confirmationResult = await user.confirm(verificationCode);
      const signedInUser = confirmationResult.user;
      console.log("¡Código verificado con éxito!");
      console.log("Usuario autenticado:", signedInUser);

    } catch (error) {
      console.error("Error al verificar el código:", error);
    }
  }
  
  return (
    <section>
      <div id="recaptcha"></div>
      <input type="tel" className="text-black" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={onSubmit}>Enviar código</button>
      <input type="text" className="text-black" onChange={(e) => setCode(e.target.value)} />
      <button onClick={verifyCode}>Confirmar código</button>
    </section>
  )
*/

