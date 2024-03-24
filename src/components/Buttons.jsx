import { Icon } from "@iconify/react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const ButtonBasic = ({
  text,
  click,
  height,
  disabled,
  width,
  color = "bg-[#0796E3]",
  textColor = "text-white",
  border,
  borderColor,
  icon,
  hovColor = "hover:bg-[#0d7597]",
  textHover = "hover:text-black",
}) => {
  const btnWidth = width || "w-80";
  const btnHeight = height || "h-10";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      className={`${btnWidth} ${btnHeight} ${color} ${textColor} ${border} ${borderColor} ${disabledStyles} flex items-center justify-center font-bold rounded mb-2 ${hovColor} ${textHover}`}
      onClick={click}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon && (
        <span className={`mr-2 sm:${text ? "inline" : "hidden"}`}>
          <Icon icon={icon} width="1em" height="1em" />
        </span>
      )}
      {text && <span className={`hidden sm:inline`}>{text}</span>}
    </motion.button>
  );
};

export const ButtonHome = ({ text, icon, to }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        to={to}
        className=" flex justify-center items-center bg-yellow-400  hover:bg-yellow-500 font-bold py-2 px-4 -skew-x-12 sombra-inferior-derecha text-black"
      >
        <Icon icon={icon} className=" w-6 h-6" />
        {text}
      </Link>
    </motion.div>
  );
};

export const LinkButton = ({
  text,
  to,
  height,
  width,
  color = "bg-[#0796E3]",
  textColor = "text-white",
  border,
  borderColor,
  icon,
  hovColor = "hover:bg-blue-600",
  textHover = "hover:text-black",
}) => {
  const btnWidth = width || "w-80";
  const btnHeight = height || "h-10";
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        to={to}
        className={`${btnWidth} ${btnHeight} ${color} ${textColor} ${border} ${borderColor} flex items-center justify-center font-bold rounded mb-2 ${hovColor} ${textHover} sm:${btnWidth} sm:mb-0`}
      >
        {icon && (
          <span className={`mr-2 ${text ? "sm:inline" : "sm:hidden"}`}>
            <Icon icon={icon} width="1em" height="1em" />
          </span>
        )}
        {text}
      </Link>
    </motion.div>
  );
};

export const CheckButtton = ({ register, onCheckboxChange }) => {
  const [aceptaTodo, setAceptaTodo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const tickVariants = {
    pressed: (isChecked) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  const boxVariants = {
    hover: { scale: 1.05, strokeWidth: 60 },
    pressed: { scale: 0.95, strokeWidth: 35 },
    checked: { stroke: "#FF008C" },
    unchecked: { stroke: "#ddd", strokeWidth: 50 },
  };

  const handleAceept = () => {
    const newValue = !aceptaTodo;
    setAceptaTodo(newValue);
    onCheckboxChange(newValue);
  };

  return (
    
    <div className="form-group flex justify-center items-center" id="terminos-politica">
        <motion.input
            type="checkbox"
            id="aceptaTodo"
            {...register("aceptaTodo")}
            checked={aceptaTodo}
            onChange={handleAceept}
            className="form-checkbox h-5 w-5 text-blue-600"
            animate={{ scale: aceptaTodo ? 1.1 : 1 }} // Escala animada 
            transition={{ type: "spring", stiffness: 500, damping: 30 }} 
        />
        <label htmlFor="aceptaTodo" className="ml-2 text-gray-500 text-xs ">
            Acepto los{' '}
            <Link to="/TerminosCondiciones" className="text-blue-500 hover:text-blue-700">términos y condiciones</Link>
            {' '}y la{' '}
            <Link to="/TerminosCookies" className="text-blue-500 hover:text-blue-700">política de cookies</Link>
        </label>
    </div>
  );
};
