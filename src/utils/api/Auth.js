import axios from "./axios";
//todo: get
export const verifTokenRequet = () => axios.get('/verify')

export const alertRoute = () => axios.get('/alertloging')

//todo: post
export const searchNumberPhoneRoute = tel =>axios.post('/searchPhone',tel)

export const registerRoute = user => axios.post(`/register`, user)

export const loginRoute = user => axios.post(`/login`, user)

export const loginFacegooRoute = user => axios.post('/facegoo',user)

export const sendCodeRoute = email => axios.post('/sendCodeEmail', email)

export const recoverPassRoute = user => axios.post('/recoverPass', user)