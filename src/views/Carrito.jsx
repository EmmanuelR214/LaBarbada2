import { useQuery, useQueryClient } from 'react-query';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"

import { useAuth } from "../routes/context/AuthContext";
import { useStore } from "../routes/context/StoreContext";

import { ButtonBasic } from "../components/Buttons";
import { CardCar } from "../components/Cards";
import { ModalVentas } from '../components/Modal';
import { useState } from 'react';


const Carrito = () => {
  const { user } = useAuth()
  const {UpdateCar, DeleteShoppingCar} = useStore()
  const idUser = user.id
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState()
  const navigate = useNavigate()
  
  const { data, isLoading, isError, refetch } = useQuery(['carrito', idUser], async () => {
    const response = await fetch(`https://api-barbada.vercel.app/api/get-shoppingCar/${idUser}`)
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Error al cargar los detalles del carrito')
    }
    return responseData
  })
  
  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar el carrito</div>
  
  const sumaSubtotales = data[0].reduce((total, item) => {
    return total + parseFloat(item.subtotal)
  }, 0)
  
  const handleLess = async(id_carrito, cantidad, precioUnitario) =>{
    try {
      let cant = cantidad - 1
      if (cant < 1) {
        cant = 1
      }
      let total = cant * precioUnitario
      await UpdateCar(id_carrito, cant, total)
      queryClient.invalidateQueries(['carrito', idUser]);
      if (data[0] && refetch) {
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handlePluss = async(id_carrito, cantidad, precioUnitario) =>{
    try {
      let cant = cantidad + 1
      let total = cant * precioUnitario
      await UpdateCar(id_carrito, cant, total)
      queryClient.invalidateQueries(['carrito', idUser]);
      if (data[0] && refetch) {
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleDelete = async(id_carrito) =>{
    try {
      await DeleteShoppingCar(id_carrito)
      queryClient.invalidateQueries(['carrito', idUser]);
      if (data[0] && refetch) {
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center space-y-4">
      <h1 className="text-white text-5xl font-semibold mt-14 mb-8 text-center">Carrito</h1>
      <section className="w-11/12 h-[70vh] overflow-y-auto" style={{ scrollbarWidth: "none"}}>
        <div className="flex flex-col items-center space-y-5" >
          {data[0].map((item, index) => (
            <CardCar
              key={index}
              img={item.imagen_platillo}
              title={item.nombre_platillo}
              p={item.descripcion_platillo}
              count={item.cantidad}
              precio={item.subtotal}
              less={()=>handleLess(item.id_carrito, item.cantidad, item.precio_unitario )}
              plus={()=>handlePluss(item.id_carrito, item.cantidad, item.precio_unitario )}
              delet={()=>handleDelete(item.id_carrito)}
            />
          ))}
        </div>
      </section>
      <section className=" w-[68%] h-[30%] space-x-7 flex justify-end items-center">
        <h3 className=" text-4xl font-semibold" >${sumaSubtotales}</h3>
        <ButtonBasic width='w-[15%]' text='Confirmar' textHover="" hovColor="hover:bg-[#098BD1]" click={()=>{
          if(data[0].length > 0 ){
            setIsOpenModal(true)
          }else{
            toast.error('No hay nada en el carrito')
          }
        }} />
      </section>
      { isOpenModal &&      
        <ModalVentas onClose={()=>setIsOpenModal(false)} />
      }
    </main>
  )
}

export default Carrito

/*

*/

{/* <h1 className="text-4xl font-bold mt-24 mb-8 text-center">Carrito</h1>

      <div className="relative overflow-x-auto m-12">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-lg text-white bg-zinc-800">
            <tr>
              <th className="px-6 py-3">Platillo</th>
              <th className="py-1 text-center w-24">Cantidad</th>
              <th className="text-center w-24">Subtotal</th>
              <th className="px-6 py-3 w-96 text-red-600 text-center">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Camarones para pelar"
                />
                Camarones para pelar
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount />
              </td>
              <td className="text-center">$120</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>

            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Pulpo a la diabla"
                />
                Pulpo a la diabla
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount />
              </td>
              <td className="text-center">$130</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>

            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Torre de mariscos"
                />
                Torre de mariscos
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount />
              </td>
              <td className="text-center">$230</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonBasic text='Confirmar pedido' textColor="text-slate-800" color="bg-blue-500" hovColor="hover:bg-blue-400"  /> */}