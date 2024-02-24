import { createContext, useContext, useEffect, useState } from "react";
//Api
import { getMenuRequest, getCategoriaRequest, getPlatilloRequest } from "../../utils/api/Store";;

export const StoreContext = createContext()

export const useStore = () =>{
  const context = useContext(StoreContext)
  if(!context)  throw new Error('Error de provedor con StoreContextPublic')
  return context
}

export const StoreProvider = ({children}) =>{
  //StoreContext 
  const [listMenu, setListMenu] = useState([])
  
  //-----StoreContext
  const getMenu = async(id) =>{
    try {
      if(typeof id === 'number') {
        const catId = {categoria: id}
        const res = await getCategoriaRequest(catId)
        setListMenu(res.data)
      } 
      else if(typeof id === 'string'){
        const catId = {nombre: id}
        const rest = await getPlatilloRequest(catId)
        setListMenu(rest.data)
      }
      else{
        const result = await getMenuRequest()
        setListMenu(result.data)
      }
    } catch (error) {
      console.log(error)
      setErrorAuth(error)
    }
  }
  
  return(
    <StoreContext.Provider value={{
      getMenu,
      listMenu
    }} >
      {children}
    </StoreContext.Provider>
  )
}