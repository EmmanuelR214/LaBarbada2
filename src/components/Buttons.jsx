import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const ButtonBasic = ({ text, click, height, disabled, width, color='bg-[#095D78]', textColor='text-white', border, borderColor, icon, hovColor }) => {
  const btnWidth = width || 'w-80'
  const btnHeight = height || 'h-10'
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : ""
  return (
    <button
      className={`${btnWidth} ${btnHeight} ${color} ${textColor} ${border} ${borderColor} ${disabledStyles} flex items-center justify-center font-bold rounded mb-2 hover:${hovColor} sm:${btnWidth} sm:mb-0`}
      onClick={click}
      disabled={disabled}
    >
      {icon && (<span className={`mr-2 ${text ? 'sm:inline' : 'sm:hidden'}`} ><FontAwesomeIcon icon={icon} /></span>)}
      {text}
    </button>
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