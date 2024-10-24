import { apiStore } from "./axios.js";

export const MenuRoute = () => apiStore.get('/menu')

export const CategoriasRoute = () => apiStore.get('categorias')

export const MenuCategoriaRoute = categ => apiStore.get(`/menu-categoria/${categ}`)

export const MenuNombreRoute = (params) => apiStore.get(`/menu-nombre`,{params})

export const DescripcionPlatilloRouter = desc => apiStore.get(`/descripcion-platillo/${desc}`)

export const ObtenerPrecioRoute = (id, tam, pre) => apiStore.get('precio-platillo', {params: {id, tam, pre}})

export const ObtenerDetallePorPrecioRoute = (id,pre) => apiStore.get('/detalle-precio', {params: {id,pre}})

export const InsertarCarritoRoute = carrito => apiStore.post('/shoppingcar', carrito)

export const ObtenerCarritoRoute = idUser => apiStore.get(`/get-shoppingCar/${idUser}`)

export const UpdateShoppingCarRoute = car => apiStore.put('/update-shoppingcar', car)

export const DeleteCarRoute = id_car => apiStore.delete(`delete-shoppingcar/${id_car}`)

export const PagoTarjetaRoute = pago => apiStore.post('/pago-tarjeta', pago)

export const verificarCargoRoute = transactionId => apiStore.get(`/verificar-transaccion/${transactionId}`)

export const CrearVentaRoute = venta => apiStore.post('/venta', venta)

export const SubscribeRoute = sub => apiStore.post('/subscribe', sub)