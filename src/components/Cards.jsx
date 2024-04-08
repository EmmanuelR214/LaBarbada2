import React, { useState } from 'react'

import { ButtonBasic, MenuButton } from './Buttons'
import { motion } from "framer-motion";

import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useStore } from '../routes/context/StoreContext'

export const CardMenu = ({img, title, precio }) => {
  const [loanding, setLoanding] = useState(false)
  
  const {} = useStore()
  const navigate = useNavigate()
  
  
  const RedirectRoute = async() =>{
    try {
      setLoanding(true)
      // await descripcionPlatillo(title)
      localStorage.setItem('platillo', title)
      navigate(`/platillo/${title}`)
    } catch (error) {
      toast.error('No se pudo obtener el platillo')
    }
    finally{
      setLoanding(false)
    }
  }
  
  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-zinc-800 relative" >
      <button className='w-full' onClick={RedirectRoute} >
      {img && ( <img className="w-full h-36 object-cover rounded-xl" src={`/img/${img}`} alt="imagen"/> )}
      </button>
      <div className=' w-full flex'>
        <div className="px-6 py-4 flex flex-col text-lg w-3/5" >
          <h2>{title}</h2>
          <p className='text-orange-500 font-bold text-2xl'>${precio}</p>
        </div>
        <div className=' w-2/5 p-1 m-1 flex items-center justify-end'>
          <MenuButton/>
        </div>
      </div>
    </div>
  )
}

export const CardCar = ({title, img, p, precio, delet, plus, less, count}) =>{
  return(
    <div className='w-3/4 h-28 bg-[#282828] rounded-3xl flex items-center justify-around overflow-hidden'>
      <img src={`/img/${img}`} alt="" className='w-[10%] rounded-2xl bg-red-200' />
      <h2 className='w-[15%]'>{title}</h2>
      <div className="w-[25%] h-3/4 overflow-auto flex justify-center items-center" style={{ scrollbarWidth: "none"}}>
        <p className='text-xs'>{p}</p>
      </div>
      <div className='w-[14%] flex justify-center items-center space-x-2 h-2/5'>
        <ButtonBasic icon='material-symbols:check-indeterminate-small-rounded' color='bg-zinc-800' hovColor='hover:bg-zinc-400' border='border' width='w-2/5' height='h-full' click={less} />
        <p>{count}</p>
        <ButtonBasic icon='ic:baseline-plus' color='bg-zinc-800' hovColor='hover:bg-zinc-400' border='border' width='w-2/5' height='h-full' click={plus} />
      </div>
      <p className='w-[7%]'>${precio}</p>
      <div className='w-[16%] flex justify-center items-center'>
        <ButtonBasic text='Eliminar' icon='mdi:trash-outline' color='bg-red-500' hovColor='hover:bg-red-600' textHover='' width='w-4/5' click={delet} />
      </div>
    </div>
  )
}

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer border-b rounded-t-lg bg-gray-200"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium text-gray-700">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
            />
          </svg>
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          style={{ overflow: 'hidden' }}
          className="p-4 bg-white rounded-b-lg"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}