import { Icon } from '@iconify/react';
import { motion } from "framer-motion";

import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  espacee,
  position = 'justify-center',
  hovColor = "hover:bg-[#0d7597]",
  textHover = "hover:text-black",
}) => {
  const btnWidth = width || "w-full";
  const btnHeight = height || "h-10";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:text-white" : "";

  return (
    <motion.button
      className={`${btnWidth} ${btnHeight} ${color} ${textColor} ${border} ${borderColor} ${disabledStyles} flex items-center ${position} font-bold rounded mb-2 ${hovColor} ${textHover}`}
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
      <span >{text}</span>
    </motion.button>
  )
}

export const ButtonHome = ({text, icon, to}) =>{
  return(
    <Link to={to} className=' flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 md:w-1/2 lg:w-1/4 -skew-x-12 sombra-inferior-derecha text-black' > 
      <Icon icon={icon} className=' w-6 h-6' />
      {text}
    </Link>
  )
}

export const CheckButtton = ({ register, onCheckboxChange  }) => {
  const [aceptaTodo, setAceptaTodo] = useState(false)
  
  const handleAceept = () => {
    const newValue = !aceptaTodo
    setAceptaTodo(newValue)
    onCheckboxChange(newValue)
};
  
  return (
      <div className="form-group flex justify-center items-center" id="terminos-politica">
          <input
              type="checkbox"
              id="aceptaTodo"
              {...register("aceptaTodo")}
              checked={aceptaTodo} 
              onChange={handleAceept}
              className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="aceptaTodo" className="ml-2 text-gray-500 text-xs ">
              Acepto los{' '}
              <Link to="/TerminosCondiciones" className="text-blue-500 hover:text-blue-700">términos y condiciones</Link>
              {' '}y la{' '}
              <Link to="/TerminosCookies" className="text-blue-500 hover:text-blue-700">política de cookies</Link>
          </label>
      </div>
  );
}

export const MenuButton = () => {
  const [click, setClick] = useState(false)
  
  const handleClick = () =>{
    setClick(!click)
  }
  
  return (
    <motion.button className={` text-white font-bold rounded-full focus:outline-none focus:shadow-outline ${click ? 'bg-red-600' : 'bg-orange-500'}`}
    onClick={handleClick}
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon icon={click ? "material-symbols:check-indeterminate-small-rounded":"ic:baseline-plus"} className="w-8 h-8" />
    </motion.button>
  )
}


export const ButtonCount = ({ count, setCount }) => {
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center p-2 ">
      <button
        type="button"
        className="px-2 py-2 text-white text-2xl bg-zinc-800 hover:bg-zinc-400 rounded-lg border "
        onClick={decrementCount}
      >
      <Icon icon="material-symbols:check-indeterminate-small-rounded" />
      </button>
      <span className="mx-2 text-lg font-medium">{count}</span>
      <button
        type="button"
        className="px-2 py-2 text-white text-2xl bg-zinc-800 hover:bg-zinc-400 rounded-lg border"
        onClick={incrementCount}
      >
      <Icon icon="ic:baseline-plus" />
      </button>
    </div>
  )
}

export const ButtonLink = ({ text, onClick, color, hoverColor }) =>{
  const buttonStyle = {
    color: color || '#fff',
  };
  
  const hoverStyle = {
    color: hoverColor || '#2133d6',
  };
  
  return(
      <button className='ButtonLink'
      style={buttonStyle} 
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverStyle.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = buttonStyle.color;
      }}
      >
        {text}
      </button>
  )
}