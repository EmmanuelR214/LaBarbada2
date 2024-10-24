import { apiUser } from "./axios";

export const verifTokenRequet = (token) => apiUser.get(`/verify?token=${token}`)

export const loginRoute = user => apiUser.post(`/login`, user)

export const loginFacegooRoute = user => apiUser.post('/facegoo',user)

export const alertRoute = (alert) => apiUser.get(`/alert?alert=${alert}`)

export const searchNumberRouter = number => apiUser.post('/searchPhone', number)

export const sendCodeRoute = email => apiUser.post('/sendCodeEmail', email)

export const recoverPassRoute = user => apiUser.post('/recoverPass', user)

export const registerRoute = user => apiUser.post('/register', user)

export const DireccionRoute = idUser => apiUser.get(`/direcciones/${idUser}`)

export const InsertarDireccionRoute = direc => apiUser.post('/insertarDireccion', direc)

export const ActualizarDatosUserRoute = act => apiUser.post('/actualizar-datos-usuario', act)

export const EliminarCuentaRoute = id => apiUser.get(`/delete-user/${id}`)

export const TraerDatosUsuarioRoute = id => apiUser.get(`/data-user/${id}`)

export const EliminarDireccionRoute = id => apiUser.get(`/eliminar-direccion/${id}`)


//?
export const TraerPublicidadRoute = () => apiUser.get('/publicidad')