import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DateTime } from 'luxon';
import {
  CustomSelect,
  CustomSelect2,
  InputDesign,
  InputMoney,
  MoneyInput,
} from "../components/Inputs";
import { ButtonBasic } from "../components/Buttons";
import {  ModalUbicacion, ModalVentas } from "../components/Modal";
import { useAuth } from "../routes/context/AuthContext";
import {MapView, MapViewGoogle} from "../components/MapView";
import { useStore } from "../routes/context/StoreContext";
import { ResumenPago } from "../components/Cards";
import { TextLink } from "../components/Text";

function Payment() {
  const [selectedOptionDir, setSelectedOptionDir] = useState("");
  const [selectedOptionResumen, setSelectedOptionResumen] = useState("");
  
  const [Input1, setInput1] = useState("");
  const [Input2, setInput2] = useState("");
  const [executeOnce, setExecuteOnce] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [precio, setPrecio] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [direcciones, setDirecciones] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [iconos, setIconos] = useState([]);

  const [errors2, setErrors2] = useState({});
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const id = localStorage.getItem("id");
  
  const [isPaymentAllowed, setIsPaymentAllowed] = useState(true);
  
  const [cardDetails, setCardDetails] = useState({
    holder_name: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv2: ''
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm();
  const { InsertarDirreccion, TraerDireccon, cordenadas, user } = useAuth();
  const { TraerCarrito, crearVenta, PagoTarjeta, lat, lng } = useStore();
  
  useEffect(() => {
    async function feachData() {
      let car = await TraerCarrito();
      setCarrito(car[0]);
    }
    feachData();
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      async function Data() {
        let direc = await TraerDireccon();
        setDirecciones(direc[0]);
        setIconos(direc[1]);
        setShouldFetch(false);
      }
      Data();
    }
  }, [shouldFetch]);
  
  useEffect(() => {
    const checkPaymentTime = () => {
      const currentTime = DateTime.now().setZone('America/Mexico_City'); // Hora actual en Ciudad de México
      const hour = currentTime.hour;
      const minute = currentTime.minute;
      const openingTime = { hour: 10, minute: 0 }; // 10:00 AM
      const closingTime = { hour: 21, minute: 30 }; // 9:30 PM
      // Comparar la hora actual con las horas permitidas
      if (
        (hour > openingTime.hour || (hour === openingTime.hour && minute >= openingTime.minute)) &&
        (hour < closingTime.hour || (hour === closingTime.hour && minute <= closingTime.minute))
      ) {
        setIsPaymentAllowed(true);
      } else {
        setIsPaymentAllowed(false);
      }
    };
    checkPaymentTime();
    // También puedes configurar este chequeo para que se ejecute cada cierto tiempo si es necesario:
    const interval = setInterval(checkPaymentTime, 60000); // Chequear cada minuto si es necesario
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);
  
  const handlePrecioChange = (value) => setPrecio(value);

  const handleOpcionDireccion = (value) => setSelectedOptionDir(value);

  const handlePaymentChange = (event) => setPaymentMethod(event.target.value);

  const handleChangeResumen = (option) => setSelectedOptionResumen(option);

  const sumaSubtotales = carrito.reduce((total, item) => {
    return total + parseFloat(item.subtotal);
  }, 0);
  
  const RealizarCompra = async (e) => {
    try {
      e.preventDefault();
      let metodoPafo = 0;
      if (!selectedOptionDir) {
        toast.warning("Por favor seleccione una ubicación");
        return;
      }
      if (!paymentMethod) {
        toast.warning("Por favor seleccione un metodo de pago");
        return;
      }
      if (paymentMethod === "efectivo") {
        metodoPafo = 1;
        if (!precio) {
          toast.warning("Por favor ingrese un monto");
          return;
        } else if (parseFloat(precio) < sumaSubtotales) {
          toast.warning("El monto es insuficiente");
          return;
        }
      }
      let cambio = parseFloat(precio) - sumaSubtotales;
      const pp = await crearVenta(
        user.id,
        sumaSubtotales,
        selectedOptionDir.value,
        metodoPafo,
        precio,
        cambio,
        carrito,
        user.email,
        user.telefono
      );
      if (pp) {
        toast.success("¡Gracias por su compra!");
        navigate("/success-pay");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RealizarPagoTarjeta = async () => {
    // Evitar que la función se ejecute si ya está en proceso
    if (isProcessing) return;
    // Marcar la función como en proceso
    setIsProcessing(true);
    try {
      localStorage.setItem('ventaData', JSON.stringify({
        userId: user.id,
        total: sumaSubtotales,
        direccion: selectedOptionDir.value,
        tipoPago: 2,
        carrito: carrito,
        email: user.email,
        telefono: user.telefono
      }));
      
      const pagoConTarjeta = await PagoTarjeta(
        cardDetails,
        sumaSubtotales,
        Input1,
        Input2,
        user.email
      );
      
      
      if (pagoConTarjeta) {
        const insertarVenta = await crearVenta(
          user.id,
          sumaSubtotales,
          selectedOptionDir.value,
          2,
          sumaSubtotales,
          0,
          carrito,
          user.email,
          user.telefono
        );
        console.log(insertarVenta);

        if (insertarVenta) {
          setShowModal2(false);
          toast.success("¡Gracias por su compra!");
          navigate("/success-pay");
        } else {
          toast.error("Error al realizar la venta");
        }
      } else {
        console.error("Error al realizar el pago"); 
        // toast.error("Error al realizar el pago");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de plataforma");
    } finally {
      // Permitir que la función se pueda ejecutar nuevamente si se necesita
      setIsProcessing(false);
    }
  }
  
  
  useEffect(() => {
    if (executeOnce && cardDetails.holder_name && cardDetails.card_number && cardDetails.expiration_month && cardDetails.expiration_year && cardDetails.cvv2) {
      RealizarPagoTarjeta();
      setExecuteOnce(false);
    }
  }, [executeOnce, cardDetails]);
  
  
  const Recuperar =(detalles)=>{
    const [firstName, ...rest] = detalles.holder_name.split(' ')
    setInput1(firstName)
    setInput2(rest.join(' '))
    setCardDetails(detalles)
    setExecuteOnce(true)
  }
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen pb-20">
      <div className="w-11/12 lg:w-2/3 flex flex-col items-center mx-4 lg:mx-10">
        <h1 className="text-3xl lg:text-5xl mt-10 lg:mt-20 font-bold text-center">
          Finalizar Compra
        </h1>

        <div className=" w-11/12">
          <div className="w-full">
            <h1 className="my-2 font-semibold">Dirección</h1>
            <CustomSelect2
              options={direcciones.map((option) => ({
                value: option.id_direccion,
                label: option.direccion,
                icono: option.url_icono,
              }))}
              placeholder="Ciudad, colonia, calle, descripción, tipo"
              onChange={handleOpcionDireccion}
              value={selectedOptionDir}
              opt={true}
              icon={true}
              styles="flex items-center justify-between"
              text="Agregar ubicación"
              click={() => setShowModal(true)}
            />
          </div>
          <p className="my-4 font-semibold">Método de pago</p>
          <div>
            <div className="flex flex-col lg:flex-row my-4 space-y-2 lg:space-y-0 lg:space-x-10">
              <label className="mb-2 lg:mb-0 flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="tarjeta"
                  checked={paymentMethod === "tarjeta"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                Tarjeta
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="efectivo"
                  checked={paymentMethod === "efectivo"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                Efectivo
              </label>
            </div>
            {paymentMethod === "efectivo" && (
              <div className="space-y-5">
                <h1>¿Con cuánto pagas?</h1>
                <MoneyInput value={precio} onChange={handlePrecioChange} />
              </div>
            )}
          </div>
          <div className="w-full">
            <h1 className="my-2 font-semibold">Resumen de compra</h1>
            <ResumenPago items={carrito} />
          </div>
        </div>
      </div>

      <div className="w-11/12 lg:w-1/3 flex items-center justify-center mt-10 lg:mt-20 mx-4 lg:mx-6">
      <div className="bg-zinc-800 p-8 items-center rounded-xl w-full max-w-md mx-auto">
        <h1 className="font-bold text-2xl text-center">Detalles</h1>
        <p className="my-8">
          Se te enviara la confirmación de la compra al correo electrónico, si se desea facturar comuniquese con el <a href="https://api.whatsapp.com/send?phone=771245179https://api.whatsapp.com/send?phone=7712451795" className="text-red-500 hover:text-red-600 cursor-pointer" >Restautante</a>
        </p>
        <div className="flex flex-col lg:flex-row lg:space-x-16 mb-10">
          <p className="font-semibold text-xl">Total a pagar</p>
          <p className="text-orange-500 font-semibold text-xl">
            ${sumaSubtotales}
          </p>
        </div>
        <div>
          {paymentMethod === "tarjeta" ? (
            <ButtonBasic
              text="Pagar con tarjeta"
              click={(e) => {
                e.preventDefault();
                if (!selectedOptionDir) {
                  toast.warning("Por favor seleccione una ubicación");
                  return;
                }
                setShowModal2(true);
              }}
              disabled={!isPaymentAllowed} // Deshabilitar botón según la hora
            />
          ) : (
            <ButtonBasic
              text="Confirmar pago"
              width="w-full"
              click={RealizarCompra}
              disabled={!isPaymentAllowed} // Deshabilitar botón según la hora
            />
          )}
          {!isPaymentAllowed && (
            <p className="text-red-600">Los pagos solo están permitidos entre las 10:00 AM y 9:30 PM</p>
          )}
        </div>
      </div>
    </div>
      {showModal && <ModalUbicacion onClose={()=>setShowModal(false)} setFeach={setShouldFetch} apodo={iconos} isOpen={showModal}/>}
      
      {showModal2 && <ModalVentas setCerrar={()=>setShowModal2(false)} setCardDetails={Recuperar} total={sumaSubtotales}  isOpen={showModal2} />}
    </div>
  );
}

export default Payment;
