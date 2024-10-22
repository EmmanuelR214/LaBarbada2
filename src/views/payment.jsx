import React, { useEffect, useState } from "react";
import '../styles/tarjeta.css'
import { CustomSelect, CustomSelect2, InputDesign, InputMoney} from "../components/Inputs";
import { ButtonBasic } from "../components/Buttons";
import { Modal } from "../components/Modal";
import { useAuth } from "../routes/context/AuthContext";
import MapView from "../components/MapView";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../routes/context/StoreContext";

function FinalizarCompra() {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger, getValues } = useForm()
  const {TraerDireccon, InsertarDirreccion, cordenadas,setErrorAuth,  user, crearVenta, TraerCarrito} = useAuth()
  const {Pago} = useStore()
  
  const [selectedOptionDir, setSelectedOptionDir] = useState("");
  const [seleccionApodo, setSeleccionApodo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('');
  const [precio, setPrecio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [iconos, setIconos] = useState([]);
  const [errors2, setErrors2] = useState({});
  const navigate = useNavigate()
  
  useEffect(() => {
    const feachData = async () => {
      try {
        let kk = await TraerCarrito()
        setCarrito(kk[0])
        
        let pp = await TraerDireccon()
        setDirecciones(pp[0])
        setIconos(pp[1])
      } catch (error) {
        console.log(error)
      }
    }
    feachData()
  },[])
  const obtenerValorDesc = () => {
    const valorDesc = getValues('desc');
    return valorDesc
  }
  
  const [cardDetails, setCardDetails] = useState({
    holder_name: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv2: ''
  })
  
  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    console.log(cardDetails)
  }
  
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleInputChange1 = (event) => {
    setInput1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInput2(event.target.value);
  };
  
  const handlePrecioChange = (value) => {
    setPrecio(value);
  };
  
  const handleOptionApodo = (option) => {
    setSeleccionApodo(option)
  }
  
  const handleOpcionDireccion = (value) => {
    setSelectedOptionDir(value)
  }
  
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  
  const [selectedOptionResumen, setSelectedOptionResumen] = useState("");
  
  const handleChangeResumen = (option) => {
    setSelectedOptionResumen(option);
  };
  
  const sumaSubtotales = carrito.reduce((total, item) => {
    return total + parseFloat(item.subtotal)
  }, 0)
  
  
  const AgregarDireccion = async() =>{
    try {
      let desc = obtenerValorDesc()
      if(!cordenadas){
        toast.warning("Por favor seleccione una ubicación")
        return
      }
      if(!desc) {
        toast.warning("Por favor ingrese una descripción")
        return
      }
      if(!seleccionApodo){
        toast.warning("Por favor seleccione una apodo")
        return
      }
      console.log(user.id)
      let juan = await InsertarDirreccion(cordenadas, desc, user.id, seleccionApodo.value)
      console.log(juan)
      if(juan){
        setShowModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const RealizarCompra = async(e) =>{
    try {
      e.preventDefault()
      let metodoPafo = 0
      if(!selectedOptionDir){
        toast.warning("Por favor seleccione una ubicación")
        return
      }
      if(!paymentMethod){
        toast.warning("Por favor seleccione un metodo de pago")
        return
      }
      if(paymentMethod === 'efectivo'){
        metodoPafo = 1
        if(!precio){
          toast.warning("Por favor ingrese un monto")
          return
        }
        else if(parseFloat(precio) < sumaSubtotales){
          toast.warning("El monto es insuficiente")
          return
        }
      }
      
      console.log(carrito) //*datos del carrito por separado
      let cambio = parseFloat(precio) - sumaSubtotales
      console.log(user.id) //*id del usuario
      console.log(metodoPafo) //*metodo de pago
      console.log(selectedOptionDir.value) //*id de la direccion
      console.log(precio) //*Cantidad con la que pagara el cliente
      console.log(sumaSubtotales) //*total de la compra
      console.log(cambio) //* cambio a devolver al cliente
      const pp = await crearVenta(
        user.id,
        sumaSubtotales, 
        selectedOptionDir.value,
        metodoPafo,
        precio,
        cambio,
        carrito
      );
      if(pp){
        toast.success('¡Gracias por su compra!')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const PagoTarjeta = async(e) => {
    e.preventDefault();
    if(!selectedOptionDir){
      toast.warning("Por favor seleccione una ubicación")
      return
    }
    if (validate()) {
      try {
        console.log(cardDetails, sumaSubtotales, input1, input2, user.email);
        const ll = await Pago(cardDetails, sumaSubtotales, input1, input2, user.email);
        console.log(ll)
        if(ll){
          console.log(carrito) //*datos del carrito por separado
          let cambio = parseFloat(precio) - sumaSubtotales
          console.log(user.id) //*id del usuario
          console.log(selectedOptionDir.value) //*id de la direccion
          console.log(precio) //*Cantidad con la que pagara el cliente
          console.log(sumaSubtotales) //*total de la compra
          console.log(cambio) //* cambio a devolver al cliente
          const pp = await crearVenta(
            user.id,
            sumaSubtotales, 
            selectedOptionDir.value,
            2,
            sumaSubtotales,
            0,
            carrito
          );
          if(pp){
            toast.success('¡Gracias por su compra!')
            navigate('/')
          }else{
            toast.error('Error al realizar la venta')
          }
        }
        else{
          toast.error('Error al realizar el pago')
        }
      } catch (error) {
        console.log(error);
        toast.error('Error de plataforma')
      }
    }
  }
  
  const validate = () => {
    let tempErrors = {};
    tempErrors.holder_name = cardDetails.holder_name ? "" : "Nombre del titular es requerido.";
    tempErrors.card_number = cardDetails.card_number ? "" : "Número de tarjeta es requerido.";
    tempErrors.expiration_month = cardDetails.expiration_month ? "" : "Mes de expiración es requerido.";
    tempErrors.expiration_year = cardDetails.expiration_year ? "" : "Año de expiración es requerido.";
    tempErrors.cvv2 = cardDetails.cvv2 ? "" : "CVV es requerido.";
    
    if (cardDetails.card_number && !/^\d{16}$/.test(cardDetails.card_number)) {
      tempErrors.card_number = "Número de tarjeta debe ser de 16 dígitos.";
    }

    if (cardDetails.expiration_month && !/^(0[1-9]|1[0-2])$/.test(cardDetails.expiration_month)) {
      tempErrors.expiration_month = "Mes de expiración no es válido.";
    }

    if (cardDetails.expiration_year && !/^\d{2}$/.test(cardDetails.expiration_year)) {
      tempErrors.expiration_year = "Año de expiración no es válido.";
    }

    if (cardDetails.cvv2 && !/^\d{3,4}$/.test(cardDetails.cvv2)) {
      tempErrors.cvv2 = "CVV no es válido.";
    }

    setErrors2(tempErrors);

    return Object.keys(tempErrors).every(x => tempErrors[x] === "");
  };
  return (
    <div className="flex h-screen">
      <div className="w-2/3 items-center m-10 ">
        <h1 className="text-5xl mt-20 flex font-bold justify-center ">
          Finalizar Compra
        </h1>

        <div className="pt-3 ">
          <div className="w-full">
            <h1 className="my-2 font-semibold">Dirección</h1>
            <CustomSelect2
              options={direcciones.map(option => ({ value: option.id_direccion, label: option.direccion, icono: option.url_icono }))}
              placeholder="Ciudad,colonia, calle, descripcion, tipo"
              onChange={handleOpcionDireccion}
              value={selectedOptionDir}
              opt={true}
              icon={true}
              styles='flex items-center justify-between'
              text='Agregar ubicación'
              click={() => setShowModal(true)}
            />
          </div>
          <p className="my-4 font-semibold"> Metodo de pago </p>
          <div>
            <div className="flex my-4 space-x-10">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="tarjeta"
                  checked={paymentMethod === 'tarjeta'}
                  onChange={handlePaymentChange}
                />
                Tarjeta
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="efectivo"
                  checked={paymentMethod === 'efectivo'}
                  onChange={handlePaymentChange}
                />
                Efectivo
              </label>
            </div>
            {paymentMethod === 'efectivo' && (
              <div className="space-y-5">
                <h1>¿Con cuánto pagas?</h1>
                <InputMoney value={precio} onChange={handlePrecioChange} w="w-1/3"/>
              </div>
            )}
            {/* {paymentMethod && paymentMethod === 'tarjeta' ? (
              <ButtonBasic text='Pagar con tarjeta' click={()=>setShowModal2(true)} />
            ) : paymentMethod && paymentMethod === 'efectivo' ? (
              <div className="space-y-5">
                <h1>¿Con cuánto pagas?</h1>
                <InputMoney value={precio} onChange={handlePrecioChange} w="w-1/3"/>
              </div>
            ) : null} */}
          </div>
          <div className="w-full">
            <h1 className="my-2 font-semibold">Resumen de compra</h1>
            <CustomSelect2
              options={carrito.map(option => ({value: option.id_relacion, label: option.nombre_platillo, cantidad: option.cantidad, subtotal: option.subtotal}))}
              placeholder="Resumen del pedido"
              onChange={handleChangeResumen}
              value={selectedOptionResumen}
              desc={true}
              w="w-full"
              styles='flex items-center justify-between'
            />
          </div>
        </div>
      </div>

      <div className="w-1/3 flex col-auto items-center justify-center  ">
        <div className="bg-zinc-800 p-8 items-center rounded-xl  mt-20 mx-6">
          <h1 className="font-bold text-2xl">Detalles</h1>
          <p className="my-8">
            El Lorem Ipsum fue concebido como un texto de relleno, formateado de
            una cierta manera para permitir la presentación de elementos
            gráficos en documentos, sin necesidad de una copia formal.
          </p>
          <div className="flex space-x-16 mb-10">
            <p className=" font-semibold text-xl">Total a pagar</p>
            <p className="text-orange-500 font-semibold text-xl">${sumaSubtotales}</p>
          </div>
          {paymentMethod === 'tarjeta' ? (
            <ButtonBasic text='Pagar con tarjeta' click={() => setShowModal2(true)} />
          ) : (
            <ButtonBasic text="Confirmar pago" width="w-full" click={RealizarCompra} />
          )}        
          </div>
      </div>
      {
      showModal &&
      <Modal title='Ubicación' click1={() => setShowModal(false)}>
        <MapView/>
        <div className='flex flex-col justify-end h-[18%]'>
          <div className='flex justify-between items-end space-x-4 h-full'>
            <InputDesign title='Descripción' name='desc' min='10' max='100' w="w-1/2" err={errors} method={register} look={watch} />
            <CustomSelect2 
              options={iconos.map((icono) => ({ value: icono.id_apodo, label: icono.apodo_direccion, icono: icono.url_icono }))} opt={false} icon={true} w="w-24" styles='flex items-center justify-between' placeholder='Apodo' onChange={handleOptionApodo} value={seleccionApodo}/>
            <ButtonBasic width='w-1/5' text='Agregar ubicación' click={()=>{AgregarDireccion()}} />
          </div>
        </div>
      </Modal>
      }
      {
      showModal2 &&
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="bg-[#101010] p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Registrar Tarjeta</h2>
          <button onClick={() => setShowModal2(false)} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <form onSubmit={PagoTarjeta} className="space-y-4 text-black ">
          <input
            type="text"
            value={input1}
            onChange={handleInputChange1}
            placeholder="Primer nombre"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={input2}
            onChange={handleInputChange2}
            placeholder="Primer apellido"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            className={`w-full p-2 border ${errors.holder_name ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="text"
            name="holder_name"
            value={cardDetails.holder_name}
            onChange={handleChange}
            placeholder="Nombre de la tarjeta"
          />
          {errors.holder_name && <div className="text-red-500 text-sm">{errors.holder_name}</div>}
          <input
            className={`w-full p-2 border ${errors.card_number ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="text"
            name="card_number"
            value={cardDetails.card_number}
            onChange={handleChange}
            placeholder="Número de la tarjeta"
          />
          {errors.card_number && <div className="text-red-500 text-sm">{errors.card_number}</div>}
          <input
            className={`w-full p-2 border ${errors.expiration_month ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="text"
            name="expiration_month"
            value={cardDetails.expiration_month}
            onChange={handleChange}
            placeholder="Mes de expiración"
          />
          {errors.expiration_month && <div className="text-red-500 text-sm">{errors.expiration_month}</div>}
          <input
            className={`w-full p-2 border ${errors.expiration_year ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="text"
            name="expiration_year"
            value={cardDetails.expiration_year}
            onChange={handleChange}
            placeholder="Año de expiración"
          />
          {errors.expiration_year && <div className="text-red-500 text-sm">{errors.expiration_year}</div>}
          <input
            className={`w-full p-2 border ${errors.cvv2 ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="text"
            name="cvv2"
            value={cardDetails.cvv2}
            onChange={handleChange}
            placeholder="CVV"
          />
          {errors.cvv2 && <div className="text-red-500 text-sm">{errors.cvv2}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Pay
          </button>
        </form>
        <div className="flex justify-center mt-4 space-x-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="w-12 h-auto"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Carnet.png" alt="Carnet" className="w-12 h-auto"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="w-12 h-auto"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="w-12 h-auto"/>
        </div>
      </div>
    </div>
      }
    </div>
  );
}

export default FinalizarCompra;



/*
        <Modal title='Pago con tarjeta' click1={() => setShowModal2(false)}>
          <form onSubmit={PagoTarjeta}>
            <input 
              type="text" 
              value={input1} 
              onChange={handleInputChange1}
              placeholder="Primer nombre" 
              className="text-black"
            /> 
            <input 
              type="text" 
              value={input2} 
              onChange={handleInputChange2}
              placeholder="Primer apellido" 
              className="text-black"
            /> 
            <input
              className="text-black"
              type="text"
              name="holder_name"
              value={cardDetails.holder_name}
              onChange={handleChange}
              placeholder="Nombre de la tarjeta"
            />
            <input
              className="text-black"
              type="text"
              name="card_number"
              value={cardDetails.card_number}
              onChange={handleChange}
              placeholder="Número de la tarjeta"
            />
            <input
              className="text-black"
              type="text"
              name="expiration_month"
              value={cardDetails.expiration_month}
              onChange={handleChange}
              placeholder="Mes de expiración"
            />
            <input
              className="text-black"
              type="text"
              name="expiration_year"
              value={cardDetails.expiration_year}
              onChange={handleChange}
              placeholder="Año de expiración"
            />
            <input
              className="text-black"
              type="text"
              name="cvv2"
              value={cardDetails.cvv2}
              onChange={handleChange}
              placeholder="CVV"
            />
            <button type="submit">Pay</button>
          </form> 
          </Modal>
*/

