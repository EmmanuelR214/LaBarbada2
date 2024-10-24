import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import { useAuth } from "../routes/context/AuthContext";
import { useStore } from "../routes/context/StoreContext";
import { MapViewGoogle } from "./MapView";
import axios from "axios";

import { ButtonBasic } from './Buttons';
import { InputDesign, CustomSelect2, InputPhone, VerificationInput} from './Inputs';
import { useForm } from "react-hook-form";


export const ModalVentas = ({ setCerrar, setCardDetails, total, isOpen }) => {
  const {user} = useAuth()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const {errorPayment} = useStore()
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  
  if(!isOpen) return null
  
  
  const handleCardNumber = (e) =>{
    let value = e.target.value.replace(/\D/g, '')
    if(value > 16) value = value.slice(0, 16)
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim()
    setValue('numeroTarjeta', formattedValue, {shouldValidate: true})
  }
  
  const getCurrentYearTwoDigits = () => {
    return new Date().getFullYear().toString().slice(-2)
  }
  const handleCardDate = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remueve cualquier caracter que no sea un número
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    // Validación del mes (solo si se han ingresado los dos primeros dígitos)
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        value = '12' + value.slice(2);
      }
    }
    // Validación del año (solo si se han ingresado los 4 dígitos completos)
    if (value.length === 4) {
      const year = value.slice(2, 4);
      const currentYear = getCurrentYearTwoDigits();
      if (parseInt(year, 10) < parseInt(currentYear, 10)) {
        value = value.slice(0, 2) + currentYear;
      }
    }
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = value.slice(0, 2) + '/' + value.slice(2)
    }
    setValue('fechaExpiracion', formattedValue, { shouldValidate: true })
  };
  
  const handleCardCVV = (e) =>{
    let value = e.target.value.replace(/\D/g, '')
    if(value > 3) value = value.slice(0, 3)
    setValue('cvv', value, {shouldValidate: true})
  }
  
  const onSumit = handleSubmit(async(values)=>{
    try {
      setLoading(true);
      const numeroTarjetaSinEspacios = values.numeroTarjeta.replace(/\s+/g, '')
      const cardDetails = {
        holder_name: values.nombre,
        card_number: numeroTarjetaSinEspacios,
        expiration_month: values.fechaExpiracion.slice(0, 2),
        expiration_year: values.fechaExpiracion.slice(3),
        cvv2: values.cvv,
      };
      setCardDetails(cardDetails);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  })
  
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg">
      <div className="bg-[#151515] w-[50rem] h-auto flex flex-col md:flex-row">
        <div className="bg-[#202020] w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-white">Solicitud de Pago</h2>
          <p className="text-sm"><strong>Cliente:</strong> {user.email}</p>
          <p className="mt-4 text-sm"><strong>Concepto:</strong> Compra en la Barbada</p>
          <p className="mt-4 text-xl font-bold text-green-600">Importe: ${total} MXN</p>
        </div>
        <div className="w-full md:w-2/3 p-6">
          <div>
            <div className="flex w-full h-auto justify-between">
            <h2 className="text-lg font-bold mb-4 text-white">Pago con tarjeta</h2>
            <button onClick={setCerrar}><Icon icon="mdi:cancel-bold" className="text-white hover:bg-red-600 rounded" /></button>
            </div>
            <div className="flex w-full h-auto justify-around space-x-2">
              <img src="img/tarjets-de-credito.png" alt="tarjetas de credito" className="h-16 md:h-24" />
              <img src="img/Openpay_tarjetas-de-debito.png" alt="tarjeta de debito" className="h-16 md:h-24" />
            </div>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSumit)} className="h-auto md:h-[23rem]">
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Nombre</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-600 rounded bg-[#303030] text-white"
                  placeholder="Como aparece en la tarjeta"
                  {...register('nombre', { required: 'Este campo es obligatorio', pattern: {value:  /^[A-Za-z\s]+$/i, message: 'El nombre no puede contener números ni caracteres especiales'} })}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Número de tarjeta</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-600 rounded bg-[#303030] text-white"
                  placeholder="XXXX XXXX XXXX XXXX"
                  {...register('numeroTarjeta', {
                    required: 'Este campo es obligatorio',
                    maxLength:{
                      value: 19,
                      message: 'El número de tarjeta debe ser de 16 digitos'
                    },
                  })}
                  onChange={handleCardNumber}
                />
                {errors.numeroTarjeta && <p className="text-red-500 text-sm">{errors.numeroTarjeta.message}</p>}
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block mb-1 font-semibold text-white">Fecha de expiración</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded bg-[#303030] text-white"
                    placeholder="MM/AA"
                    {...register('fechaExpiracion', {
                      required: 'Este campo es obligatorio',
                    })}
                    maxLength={5}
                    onChange={handleCardDate}
                  />
                  {errors.fechaExpiracion && <p className="text-red-500 text-sm">{errors.fechaExpiracion.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-semibold text-white">CVV</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded bg-[#303030] text-white"
                    placeholder="123"
                    {...register('cvv', {
                      required: 'Este campo es obligatorio',
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'CVV inválido'
                      }
                    })}
                    onChange={handleCardCVV}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-between items-center">
                <div className="w-full md:w-1/2 mb-2 md:mb-0 md:order-1">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto flex items-center justify-center hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      'Realizar Pago'
                    )}
                  </button>
                </div>
                <div className="w-full md:w-1/2 md:order-2">
                  <p className="text-red-500 text-sm">{errorPayment}</p>
                </div>
              </div>
            </form>
            <div className="flex flex-row w-full h-auto justify-between items-center border-t border-gray-700 pt-4">
              <div className="flex-1 flex items-center justify-center h-20 border-r md:border-r-0 border-gray-700">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Transacciones realizadas vía:</p>
                  <img src="img/LogotipoOpenpay-01.png" alt="logo OpenPay" className="h-8 inline-block" />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center space-x-2">
                <img src="img/secure.png" alt="logoSecure" className="h-6" />
                <p className="text-xs text-gray-400">Tus pagos se realizarán de forma segura con encriptación de 256 bits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

//-------------------LaBarbada copomex 95ec3969-6c38-4b7d-aac8-d69abdbde5ef

export const ModalUbicacion = ({ onClose, setFeach, apodo, isOpen }) => {
  const { register, formState: { errors }, watch, getValues } = useForm();
  const { InsertarDirreccion, cordenadas } = useAuth();
  const { lat, lng } = useStore();
  const [activeTab, setActiveTab] = useState('map');
  const [seleccionApodo, setSeleccionApodo] = useState('');
  const [seleccionColonia, setSeleccionColonia] = useState('');
  const id = localStorage.getItem('id');

  const [formDireccion, setFormDireccion] = useState({
    cp: '43000',
    estado: 'Hidalgo',
    municipio: 'Huejutla de Reyes',
    ciudad: 'Huejutla de Reyes',
    colonia: '',
    calle: '',
    descripcion: ''
  });
  const [colonias, setColonias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState([]);
  const [err2, setErr2] = useState([])
  const handleOptionApodo = (option) => setSeleccionApodo(option);
  
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  
  if(!isOpen) return null
  

  const coloniasOptions = colonias.map((colonia, index) => ({
    value: index,
    label: colonia,
  }));

  const obtenerValorDesc = () => {
    const valorDesc = getValues('desc');
    return valorDesc;
  };
  useEffect(() => {
    if (activeTab === 'form' && colonias.length === 0) {
      setLoading(true);
      axios.get(`https://api.copomex.com/query/info_cp/${formDireccion.cp}?token=447e1783-2dfe-44b3-9cf8-10806f3c24e9`)
        .then(response => {
          if (response.data[0].error) {
            setErr2(['Error al obtener las colonias']);
          } else {
            const coloniasList = response.data.map(item => item.response.asentamiento);
            setColonias(coloniasList);
            console.log(coloniasList);
          }
        })
        .catch(err => {
          setErr2(['Error de conexión con la API de Copomex']);
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [err]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDireccion({ ...formDireccion, [name]: value });
  };

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const mostrarAdvertencia = (mensaje) => {
        setErr([mensaje]);
      };
      if(!formDireccion.calle) {
        mostrarAdvertencia('Por favor agregue una calle')
        return
      }
      if(!seleccionColonia){
        mostrarAdvertencia('Por favor seleccione una colonia')
        return
      }
      if(!formDireccion.descripcion){
        mostrarAdvertencia('Por favor agregue una descripcion')
        return
      }
      
      if (!seleccionApodo) {
        mostrarAdvertencia('Por favor seleccione un apodo');
        return;
      }
      let coordenadas = `${seleccionColonia.label}, ${formDireccion.cp}, ${formDireccion.ciudad}, ${formDireccion.estado}, México.`
      // console.log(coordenadas, formDireccion.descripcion, id, seleccionApodo.value, 0, 0);
      const resultado = await InsertarDirreccion(coordenadas, formDireccion.descripcion, id, seleccionApodo.value, 0, 0);
      if (resultado) {
        setFeach(true);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const AgregarDireccion = async (e) => {
    e.preventDefault();
    try {
      const desc = obtenerValorDesc();
      const mostrarAdvertencia = (mensaje) => {
        setErr([mensaje]);
      };
      if (!cordenadas) {
        mostrarAdvertencia('Por favor seleccione una ubicación');
        return;
      }
      if (!desc) {
        mostrarAdvertencia('Por favor ingrese una descripción');
        return;
      }
      if (!seleccionApodo) {
        mostrarAdvertencia('Por favor seleccione un apodo');
        return;
      }
      // console.log(cordenadas, desc, id, seleccionApodo.value, lat, lng);
      const resultado = await InsertarDirreccion(
        cordenadas,
        desc,
        id,
        seleccionApodo.value,
        lat,
        lng
      );
      if (resultado) {
        setFeach(true);
        onClose();
      }
    } catch (error) {
      console.error('Error al agregar dirección:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black backdrop-filter backdrop-blur-lg">
      <div className="bg-[#202020] w-[95%] h-[95%] p-4 rounded-lg shadow-lg relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖️
        </button>
        <div className="flex justify-center space-x-4 border-b border-gray-700 pb-2 mb-2">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'map'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('map')}
          >
            Mapa
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'form'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('form')}
          >
            Formulario
          </button>
        </div>
        <div className="flex flex-col justify-between h-[93%] overflow-hidden rounded-lg">
          {activeTab === 'map' ? (
            <>
              <div className="flex flex-col lg:flex-row items-center w-full lg:space-x-4 space-y-2 lg:space-y-0">
                <div className="flex w-full lg:w-3/5 space-x-2">
                  <InputDesign
                    title="Descripción"
                    name="desc"
                    min="10"
                    max="100"
                    w="w-full"
                    err={errors}
                    method={register}
                    look={watch}
                    className="flex-grow max-w-lg"
                  />
                  <CustomSelect2
                    options={apodo.map((icono) => ({
                      value: icono.id_apodo,
                      label: icono.apodo_direccion,
                      icono: icono.url_icono,
                    }))}
                    opt={false}
                    icon={true}
                    w="w-auto sm:w-40"
                    styles="flex items-center justify-between"
                    placeholder="Apodo"
                    onChange={handleOptionApodo}
                    value={seleccionApodo}
                    className="flex-shrink-0"
                  />
                </div>
                <p className="text-sm w-full lg:w-[30%] lg:truncate sm:ml-2" title={cordenadas}>
                  {cordenadas}
                </p>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto lg:w-40 lg:ml-4"
                  onClick={AgregarDireccion}
                >
                  Agregar dirección
                </button>
              </div>
              {err.length > 0 && (
                <p className="text-red-500 text-sm mt-2 sm:mt-0">
                  {err.join(', ')}
                </p>
              )}
              <div className="flex-grow w-full rounded-lg overflow-hidden mt-2 bg-[#303030]">
                <MapViewGoogle className="w-full object-cover" />
              </div>
            </>
          ) : (
            loading ? (
              <p>Cargando colonias...</p>
            ) : err2.length > 0 ? (
              <p>{err2.join(', ')}</p>
            ) : (
            <form 
              className="text-white bg-[#202020] p-6 rounded-lg shadow-lg w-full mx-auto overflow-y-auto"
              style={{ maxHeight: '100%' }}
            >
              <h2 className="text-2xl font-semibold mb-4">Registrar Dirección</h2>
              <p className="mb-6 text-sm text-gray-400">Completa los siguientes campos para agregar una nueva dirección.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Estado:</label>
                  <input
                    type="text"
                    value={formDireccion.estado}
                    readOnly
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Ciudad:</label>
                  <input
                    type="text"
                    value={formDireccion.ciudad}
                    readOnly
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm">Colonia:</label>
                  <CustomSelect2
                    options={coloniasOptions}
                    placeholder="Seleccione una colonia"
                    onChange={(option) => setSeleccionColonia(option)}
                    value={seleccionColonia}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                  />
                </div>
                <div className="sm:col-span-1 flex">
                  <div className="w-2/3 pr-2">
                    <label className="block mb-2 text-sm">Calle:</label>
                    <input
                      type="text"
                      name="calle"
                      placeholder="Calle"
                      value={formDireccion.calle}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block mb-2 text-sm">Apodo:</label>
                    <CustomSelect2
                      options={apodo.map((icono) => ({
                        value: icono.id_apodo,
                        label: icono.apodo_direccion,
                        icono: icono.url_icono,
                      }))}
                      opt={false}
                      icon={true}
                      w="w-full"
                      styles="flex items-center justify-between"
                      placeholder="Apodo"
                      onChange={handleOptionApodo}
                      value={seleccionApodo}
                      className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                    />
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-2 text-sm">Descripción:</label>
                  <textarea
                    name="descripcion"
                    placeholder="Agregue una descripción de su domicilio"
                    value={formDireccion.descripcion}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-300"
                    rows="3"
                  />
                </div>
              </div>
              {err.length > 0 && (
                <p className="text-red-500 text-sm mt-2 sm:mt-0">
                  {err.join(', ')}
                </p>
              )}
              <button
                type="submit"
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                onClick={(e)=>onSubmit(e)}
              >
                Registrar Dirección
              </button>
            </form>
            )
          )}
        </div>
      </div>
    </div>
  );
};


export const ModalComponent = ({ isOpen, onClose, onClick, text, color, action, title }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="fixed inset-0 opacity-50"></div>
      <div className="bg-[#151515] text-white p-6 rounded-lg shadow-lg z-50 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{text}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button onClick={()=>onClick()} className={`${color} text-white py-2 px-4 rounded`}>
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export const RegisterNumModal = ({ isOpen, onClose }) => {
  const {signup, findOutNumber, confirmCode, searchPhone, isAuthenticade} = useAuth()
  const [singinNumber, setSinginNumber] = useState(false)
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  
  
  const sendCode = handleSubmit(async(value)=>{
    try {
      const search = await searchPhone(value.tel)
      if(search){
        setNumPhone(value.tel)
        await findOutNumber(value.tel)
        setSinginNumber(true)
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  const confCode = handleSubmit(async(value)=>{
    try {
      const codigo = await confirmCode(value.code)
      if(codigo){
        
        onClose(false)
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="fixed inset-0 opacity-50"></div>
      <div className="bg-[#151515] text-white p-6 rounded-lg shadow-lg z-50 max-w-sm mx-auto">
        <div className="text-center mb-4">
          {singinNumber ? (
            <>
              <h2 className="text-lg font-bold text-gray-200 mb-2">¡Introduce el código!</h2>
              <p className="text-gray-400 mb-4">Introduce el código de verificación que ha llegado a tu teléfono.</p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-200 mb-2">¡Hola! Regístrate ahora</h2>
              <p className="text-gray-400 mb-4">Introduce tu número de teléfono, te enviaremos un código de verificación.</p>
            </>
          )}
        </div>

        {singinNumber ? (
          <form onSubmit={confCode} className="space-y-5">
            <VerificationInput
              title='Código de verificación'
              name='code'
              min='6'
              max='6'
              pattern={/\D/}
              err={errors}
              method={register}
              val={setValue}
            />
            <ButtonBasic text="Verificar código" />
          </form>
        ) : (
          <form onSubmit={sendCode} className="space-y-5">
            <InputPhone
              title='Teléfono'
              name='tel'
              min='10'
              max='10'
              err={errors}
              method={register}
              look={watch}
              val={setValue}
              triger={trigger}
            />
            <div id="recaptcha"></div>
            <ButtonBasic text="Enviar código" />
          </form>
        )}
      </div>
    </div>
  );
};