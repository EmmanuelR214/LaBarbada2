import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const SideBar = () => {
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

  const [scrollY, setScrollY] = useState(0);
  const scrollValue = useMotionValue(0);
  const progress = useTransform(scrollValue, [0, 100], ["0%", "100%"]);

  const handleScroll = () => {
    setScrollY(window.scrollY);
    scrollValue.set(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styleLink =
    "inline-block hover:bg-zinc-800 hover:rounded-lg p-2 text-white";

  return (
    <div>
      <motion.aside
        className="inset-y-0 left-0"
        style={{ top: scrollY }}
        initial={{ y: 0 }}
        animate={{ y: scrollY }}
      >
        {/**antes qui estaba un fixed lo removi para */}
        <div
          className="h-full py-4 overflow-y-auto p-5 fixed bg-red-600 opacity-50 inset-y-0 left-0 z-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <h2 className="text-3xl font-bold mt-16 mb-8">Categorías</h2>

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
        <motion.div
          className="h-screen bg-gray-500 w-1"
          style={{
            position: "fixed",
            top: 0,
            left: "72px",
            width: "4px",
            zIndex: 5,
          }}
          initial={{ height: "0%" }}
          animate={{ height: progress }}
        ></motion.div>
      </motion.aside>
    </div>
  );
};

