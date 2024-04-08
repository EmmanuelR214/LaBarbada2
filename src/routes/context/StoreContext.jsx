import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Api
import { DeleteCarRoute, DetalleXPrecio, InsertarCarritoRoute, MenuRoute, PrecioRoute, UpdateShoppingCarRoute } from "../../utils/api/Store";

export const StoreContext = createContext()

export const useStore = () =>{
  const context = useContext(StoreContext)
  if(!context)  throw new Error('Error de provedor con StoreContextPublic')
  return context
}

export const StoreProvider = ({children}) =>{
  
  
  const [listMenu, setListMenu] = useState([])
  const [category, setCategory] = useState([])
  const [succesStore, setSuccesStore] = useState([])
  const [errorStore, setErrorStore] = useState([])
  
  const ObtenerPrecio = async(id, tam, pres) =>{
    try {
      const data = {
        id: id,
        tam: tam,
        pre:pres
      }
      const p = await PrecioRoute(data)
      return p.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const Detalle_x_Precio = async(id, pres) =>{
    try {
      const data = {
        id: id,
        pre:pres
      }
      const p = await DetalleXPrecio(data)
      return p.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const InsertarCarrito =  async(id_platillo, id_usuario, cantidad, total) =>{
    try {
      const data = {
        id_platillo:id_platillo , 
        id_usuario: id_usuario , 
        cantidad: cantidad , 
        total: total
      }
      const p = await InsertarCarritoRoute(data)
      setSuccesStore(p.data)
      return p.data
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const UpdateCar = async(id_Car, cant, total) => {
    try {
      const data = {
        id_carrito: id_Car, 
        cantidad: cant, 
        subtotal: total
      }
      await UpdateShoppingCarRoute(data)
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
      setErrorStore(error.response.data)
    }
  }
  
  const DeleteShoppingCar = async id_car => {
    try {
      await DeleteCarRoute(id_car);
    } catch (error) {
      if (Array.isArray(error.response.data)) setErrorStore(error.response.data);
      setErrorStore(error.response.data);
    }
  };
  
  useEffect(()=>{
    if(errorStore.length > 0 || succesStore.length > 0 ){
      if(succesStore && Array.isArray(succesStore)){
        succesStore.forEach((succes) => toast.success(succes))
      }
      if (errorStore && Array.isArray(errorStore)) {
        errorStore.forEach((error) => toast.error(error));
      }
      const timer = setTimeout(()=>{
        setSuccesStore([])
        setErrorStore([])
      },3000)
      return () => clearTimeout(timer)
    }
  },[errorStore])
  
  useEffect(()=>{
    async function chackMenu  () {
      const platillos = await MenuRoute()
      setListMenu(platillos.data[0])
      setCategory(platillos.data[1])
    }
    chackMenu()
  },[])
  
  return(
    <StoreContext.Provider value={{
      listMenu,
      category,
      errorStore,
      ObtenerPrecio,
      Detalle_x_Precio,
      InsertarCarrito,
      UpdateCar,
      DeleteShoppingCar
    }} >
      {children}
    </StoreContext.Provider>
  )
}


/*
  // const descripcionPlatillo = async (platillo) => {
  //   try {
  //     const data = {
  //       plato: platillo
  //     }
  //     await queryClient.fetchQuery('descripcionPlatillo', () => fetchDetallePlatillo(data));
  //   } catch (error) {
  //     if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
  //     setErrorStore(error.response.data)
  //   }
  // }
  
  
  // const descripcionPlatillo = async(platillo) => {
  //   try {
  //     const data = {
  //       plato: platillo
  //     }
  //     const desc = await DetallePlatilloRoute(data)
  //     setDescPro(desc.data)
  //   } catch (error) {
  //     if(Array.isArray(error.response.data)) setErrorStore(error.response.data)
  //     setErrorStore(error.response.data)
  //   }
  // }
*/