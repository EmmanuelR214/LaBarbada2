import { useState } from "react"
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
            <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} style={{ color: colorIcono || 'gray' }} />
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


export const InputDesign = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

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
            Nombre de usuario
          </motion.label>
          <input
            type="text"
            className="text-black rounded-lg p-2 pr-10 px-3
             w-full focus:outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
            <Icon icon="ph:eye" className="text-black text-2xl" />
          </div>
        </div>
      </div>

  );
};
