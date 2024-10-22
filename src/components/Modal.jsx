import React,{useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion";

import { ButtonBasic } from './Buttons';
import { InputDesign } from './Inputs';

import '../styles/tarjeta.css'

export const ModalVentas = ({ children, onClose }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { scale: 1, zIndex: 50 },
    hidden: { scale: 0, zIndex: -1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Fondo del modal */}
      <motion.div
        variants={backdropVariants}
        className=" w-full h-screen flex justify-center items-center fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 px-4 md:px-8 transition duration-300 ease-in-out"
      >
        {/* Modal */}
        <motion.div
          variants={modalVariants}
          className=" w-2/4 h-2/5 space-y-4 bg-white rounded-3xl flex flex-col justify-center items-center"
        >
          <img src="/img/warning.png" alt="" className=' w-2/5 h-auto' />
          <p className='text-black font-bold' >¡Hola! Estamos trabajando para poder traer esta función.</p>
          <ButtonBasic click={onClose} text='Cerrar' color='bg-red-400' hovColor='hover:bg-red-500' width='w-1/2'   />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


export const Modal = ({ title, children, click1 }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg">
      <div className="modal bg-gray-800 w-3/5 h-[64%] rounded-lg flex flex-col">
        <div className=" bg-gray-600 rounded-t-lg p-3 text-center mb-2 flex justify-between items-center">
          <h1 className="text-white font-semibold text-2xl">{title}</h1>
          <ButtonBasic width='w-[2%]' height='h-[80%]' text='x' color='bg-transparent' hovColor='hover:bg-red-500' click={click1} />
        </div>
        <div className="p-4 rounded-md flex-grow">{children}</div>
      </div>
    </div>
  );
};