import axios from "./axios.js";

export const MenuRoute = () => axios.get('/menu')

export const PrecioRoute = precio => axios.post('/precio-platillo', precio)

export const DetalleXPrecio = precio => axios.post('/detalle-x-precio',precio)

export const InsertarCarritoRoute = carrito => axios.post('/shoppingcar', carrito)

export const UpdateShoppingCarRoute = car => axios.put('/update-shoppingcar', car)

export const DeleteCarRoute = id_car => axios.delete(`/delete-shoppingcar/${id_car}`)



// export const DetallePlatilloRoute = plato => axios.post('/descripcion-platillo', plato)

// export const fetchDetallePlatillo = async (platillo) => {
//   const response = await axios.post('/descripcion-platillo', platillo);
//   return response.data;
// }
