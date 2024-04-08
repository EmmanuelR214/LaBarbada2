import { useState, useEffect } from "react"
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export const InputBasic = ({
  titulo,
  nombre,
  tipo,
  minimo,
  maximo,
  colorIcono,
  err,
  method,
  triger,
  val,
  look,
}) => {  
  const [isFocus, setIsFocus] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [errorMess, setErrorMess] = useState([])
  const [tipoInput, setTipoInput] = useState(tipo || 'text')  
  const handleChange = (e) =>{
    const newErrorMess = []
    const input = e.target.value
    const mayus = /[A-Z]/.test(input)
    const minus = /[a-z]/.test(input)
    const num = /\d/.test(input)
    const carac = /[!@#$%^&*]/.test(input)
    const p = input.toLowerCase()
    const name = look('nickname', '').toLowerCase()
    const correoParametro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
    
    if(nombre === 'correo'){
      if(!correoParametro) newErrorMess.push('Correo electronico no valido')
    }
    if(nombre === 'nickname'){
      const valName = input.replace(/[^a-zA-Z0-9Ññ]/g,'')
      val(nombre, valName)
    }
    else if(nombre === 'tel'){
      const valTel = input.replace(/[^0-9]/g, '').slice(0,10)
      if(input.length < 10) newErrorMess.push('El teléfonoo debe ser igual a 10 caracteres')
      val(nombre, valTel)
      setErrorMess(newErrorMess)
    }
    else if(nombre === 'pass'){
      const valPass = input.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
      val(nombre, valPass)
      if (!mayus) newErrorMess.push('Debe contener al menos una letra mayúscula.')
      if (!minus) newErrorMess.push('Debe contener al menos una letra minúscula.')
      if (!num) newErrorMess.push('Debe contener al menos un número.')
      if (!carac) newErrorMess.push('Debe contener al menos uno de los siguientes carácteres especiales: !, @, #, $, %, ^, &, *.')
      if ( name && p.includes(name)) newErrorMess.push('La contraseña no puede contener el nombre de usuario.')
      setErrorMess(newErrorMess)
    }
    else if(nombre === 'passConf'){
      const password = look('pass')
      if (password !== input) newErrorMess.push('Las contraseñas no coinciden.')
      setErrorMess(newErrorMess)
      val(nombre, input)
    }
    else{ 
      val(nombre, input)
    }
    
    triger(nombre)
  }
  
  return (
    <div className="relative mb-4 w-full">
      <div className="relative w-full">
        <input
          type={showPass ? 'text' : tipoInput}
          {...method(nombre, {
            required: `${titulo} es requerido`,
            minLength: {
              value: minimo,
              message: `${titulo} debe ser mayor a ${minimo} carácteres`,
            },
            maxLength: {
              value: maximo,
              message: `${titulo} debe de ser menor a ${maximo} carácteres`,
            },
          })}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={look(nombre) || ''}
          className={`px-3 w-full py-2 border rounded-md focus:outline-none text-gray-800 ${
            isFocus || look(nombre) ? 'border-blue-200' : 'border-gray-500'
          }`}
        />
        
        {tipo === 'password' && (
          <button
            type="button"
            onClick={() => {
              setShowPass(!showPass)
              setTipoInput((pType) => (pType === 'password' ? 'text' : 'password'))
            }}
            className="absolute top-1 right-3 focus:outline-none"
          >
          </button>
        )}
      </div>
      <label
        className={`absolute left-4 transition-all ${
          isFocus || look(nombre) ? 'text-white-500 -top-6 ' : 'top-2 text-gray-500 text-base'
        } pointer-events-none`}
      >
        {titulo}
      </label>
      {err[nombre] && <p className="text-red-500 text-xs">{err[nombre]?.message}</p>}
      <div className="w-full">
        {errorMess.map((message, index) => (
          <p key={index} className="text-red-500 text-xs">{message}</p>
        ))}
      </div>
    </div>
  )
}


export const InputTel = ({ title = 'Teléfono', name, min, max, icon = 'ph:phone', method, err, pattern = `/[0-9]/`, val  }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleFocus = () => {
    setIsFocused(true);
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const valTel = value.replace(/[0-9]/g, '').slice(0, 10);
    val(name, valTel);

    const newErrorMess = [];
    if (value.length !== 10) {
      newErrorMess.push('El teléfono debe ser igual a 10 caracteres');
    }
    if (value.length < min) {
      newErrorMess.push(`${title} debe ser mayor a ${min} caracteres`);
    }
    if (value.length > max) {
      newErrorMess.push(`${title} debe ser menor a ${max} caracteres`);
    }
    if (pattern && !pattern.test(value)) {
      newErrorMess.push(`El formato de ${title} es inválido`);
    }
    if (newErrorMess.length > 0) {
      err[name] = { message: newErrorMess.join('. ') };
    } else {
      delete err[name];
    }
  }

  return (
    <div className="relative w-full bg">
      <div className="relative">
        <motion.label
          className={`absolute left-3 ${
            isFocused ? " text-sm" : "text-gray-500"
            }`}
          animate={{ top: isFocused ? "-20px" : "20%" }}
          onClick={() => document.querySelector("input").focus()}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <label htmlFor="" className="pointer-events-none">{title}</label>
        </motion.label>
        <input
          type="text"
          {...method(name, {
            required: `${title} es requerido`,
            pattern: {
              value: pattern,
              message: `El formato de ${title} es inválido`,
            },
            minLength: {
              value: min,
              message: `${title} debe ser mayor a ${min} caracteres`,
            },
            maxLength: {
              value: max,
              message: `${title} debe ser menor a ${max} caracteres`,
            },
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
          className="text-black rounded-lg p-2 pr-10 px-3 w-full focus:outline-none "
        />
        <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
          <Icon icon={icon} className="text-black text-2xl" />
        </div>
      </div>
      {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
    </div>
  )
}


export const InputPassword = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };
  
  return (
    <div className="relative w-full">
      <div className="relative">
        <motion.label
          className={`absolute left-3 ${isFocused ? 'text-sm' : 'text-gray-500'} pointer-events-none`}
          animate={{ top: isFocused ? '-20px' : '20%' }}
          onClick={() => document.querySelector('input').focus()}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          Contraseña 
        </motion.label>
        <input
          type={showPass ? 'text' : 'password'}
          className="text-black rounded-lg p-3 pr-10 px-3 w-full focus:outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <motion.button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute inset-y-0 right-0 flex items-center p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon icon={showPass ? 'ph:eye' : 'mdi:eye-off-outline'} className="text-black text-2xl" />
        </motion.button>
      </div>
    </div>
  );
}

export const InputSearch = () => {
  return (
      <div className="relative w-full ">
        <div className="relative">
          <input
            type="text"
            className="text-white rounded-lg p-3 pr-10 pl-12 px-3
              w-full focus:outline-none bg-zinc-800 text-xl" placeholder="Buscar"
          />
          <div className="absolute inset-y-0 left-0 flex items-center p-2 ">
            <Icon icon="material-symbols:search" className="text-white text-3xl" />
          </div>
        </div>
      </div>
  );
}

export const CustomSelect = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="appearance-none border-red-600 border-2 rounded px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none pr-10 bg-white"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{value ? value.label : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-red-600 absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-white shadow-md mt-1 rounded border-red-600 border-2 text-black z-10"
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 rounded hover:bg-gray-200">
                  <button
                    className="w-full text-left focus:outline-none"
                    onClick={() => {
                      onChange(option);
                      toggleDropdown();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const CustomSelectPlus = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.findIndex((opt) => opt.value === option.value);
    if (selectedIndex > -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(selectedIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return selectedOptions.some((opt) => opt.value === option.value);
  };

  return (
    <div className="relative w-5/6">
      <div
        className="appearance-none px-3 py-2 w-full leading-tight focus:outline-none pr-10 border-b-2"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{selectedOptions.length > 0 ? selectedOptions.map((opt) => opt.label).join(', ') : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-white mb-2 bg-red-600 rounded-full absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-black shadow-md mt-1 border-b-2 text-white z-10 overflow-y-auto max-h-40" 
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'auto', overflow: '-webkit-overflow-scrolling' }} 
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 hover:bg-zinc-800 border-b-2">
                  <label htmlFor={`option-${index}`} className="cursor-pointer flex items-center">
                    <div>
                      <span>{option.label}</span>
                      <span className="text-red-600 text-sm font-medium block">{option.extraText}</span>
                    </div>
                    <input
                      type="checkbox"
                      id={`option-${index}`}
                      className={`ml-auto size-4 ${isSelected(option) ? 'bg-black' : ''}`}
                      checked={isSelected(option)}
                      onChange={() => handleOptionClick(option)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}