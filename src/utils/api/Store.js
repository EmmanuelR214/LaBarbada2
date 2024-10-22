import { apiSaurce } from "./axios.js"

export const MenuRoute = () => apiSaurce.get('/menu')

export const TraerCarritoRoute = idUser => apiSaurce.get(`/get-shoppingCar/${idUser}`)

export const PrecioRoute = precio => apiSaurce.post('/precio-platillo', precio)

export const DetalleXPrecio = precio => apiSaurce.post('/detalle-x-precio',precio)

export const InsertarCarritoRoute = carrito => apiSaurce.post('shoppingcar', carrito)

export const UpdateShoppingCarRoute = car => apiSaurce.put('/update-shoppingcar', car)

export const DeleteCarRoute = id_car => apiSaurce.delete(`delete-shoppingcar/${id_car}`)

export const CrearVentaRoute = venta => apiSaurce.post('/venta', venta)

export const PagoTarjetaRoute = pago => apiSaurce.post('/pago-tarjeta', pago)



// export const DetallePlatilloRoute = plato => axios.post('/descripcion-platillo', plato)

// export const fetchDetallePlatillo = async (platillo) => {
//   const response = await axios.post('/descripcion-platillo', platillo);
//   return response.data;
// }