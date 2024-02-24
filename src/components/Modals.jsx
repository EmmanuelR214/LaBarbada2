import { useState, useRef } from "react"

//Context
import { useAuth } from "../routes/context/AuthContext";

export const ModalPhone = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('')
  const inputRefs = useRef([])
  
  const {confirmCode} = useAuth()
  
  
  const Verificar = async(e) => {
    e.preventDefault()
    console.log(code)
    
    if(code.length === 6){
      await confirmCode(code)
      onClose()
    }else{
      console.log('Ingrese 6 digitos')
    }
  }
  
  const handleChange = (index, event) => {
    const value = event.target.value
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode.join(''))

    if (index < inputRefs.current.length - 1 && value) {
      inputRefs.current[index + 1].focus()
    }
  }
  
  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !event.target.value) {
      inputRefs.current[index - 1].focus()
    }
  }
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className=" bg-zinc-800 p-8 rounded-md relative z-50">
            <h2 className="text-lg font-bold mb-4">Codigo de verificación</h2>
            <div className="flex justify-cente space-x-3">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength="1"
                  value={code[index] || ''}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className=" bg-gray-200 border border-gray-300 rounded-md px-3 py-2 w-12 text-center text-black "
                />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              {/* <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2">Cancelar</button> */}
              <button onClick={Verificar} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"> Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
