import { Link, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Icon } from '@iconify/react';
import { verificarCargoRoute } from '../utils/api/urlStore';
import { useStore } from '../routes/context/StoreContext';
import { toast } from 'react-toastify';

// Función para hacer la petición de verificación del pago electrónico
const fetchTransactionStatus = async (transactionId) => {
  try {
    const { data } = await verificarCargoRoute(transactionId);
    return data;
  } catch (error) {
    console.error('Error en fetchTransactionStatus:', error);
    throw error; // Lanza el error para que se capture en useQuery
  }
};

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get('id');
  const paymentMethod = queryParams.get('method'); // Obtener el método de pago de la URL
  const { crearVenta } = useStore();
  
  // Si el método de pago es "openpay", hacemos la verificación de la transacción
  const { data, status, error } = useQuery(
    ['transactionStatus', transactionId],
    () => fetchTransactionStatus(transactionId),
    {
      enabled: paymentMethod === 'openpay' && !!transactionId, // Solo ejecutar la query si el método es openpay y existe transactionId
      onSuccess: async (data) => {
        if (data && data.status === 'completed') {
          // Obtener los datos almacenados en localStorage
          const ventaData = JSON.parse(localStorage.getItem('ventaData'));
          if (ventaData) {
            try {
              // Crear la venta con los datos recuperados de localStorage 
              const ventaCreada = await crearVenta(
                ventaData.userId,
                ventaData.total,
                ventaData.direccion,
                ventaData.tipoPago,
                ventaData.total,
                0,
                ventaData.carrito,
                ventaData.email,
                ventaData.telefono
              );

              if (ventaCreada) {
                toast.success("¡Gracias por su compra!");
                console.log('venta realizada')
                localStorage.removeItem('ventaData');  // Eliminar datos del localStorage
              }
            } catch (error) {
              toast.error("Error al realizar la venta");
            }
          }
        } else {
          toast.error("Error en la transacción, por favor inténtalo de nuevo.");
          localStorage.removeItem('ventaData');  // Eliminar datos del localStorage en caso de error
        }
      },
    }
  );

  if (paymentMethod === 'openpay' && status === 'loading') {
    return <div className="text-white">Verificando transacción...</div>;
  }

  if (paymentMethod === 'openpay' && (status === 'error' || (data && data.status !== 'completed'))) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center flex flex-col justify-center items-center text-white">
          <Icon icon='ep:close-filled' className="text-red-500 text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">Transacción Fallida</h1>
          <p className="text-lg mb-6">Hubo un problema con tu pedido. Por favor, inténtalo de nuevo.</p>
          <Link to="/" className="bg-red-500 hover:bg-red-700 text-black py-2 px-4 rounded-md">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Manejo de caso para pagos en efectivo
  const message = paymentMethod === 'efectivo' 
    ? "Tu pedido ha sido recibido. Por favor, sigue las instrucciones para completar el pago en efectivo."
    : "Tu pedido ha sido recibido y lo estamos procesando. Pronto recibirás más información.";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center flex flex-col justify-center items-center text-white">
        <Icon icon='ep:success-filled' className="text-green-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-2">¡Gracias por tu pedido!</h1>
        <p className="text-lg mb-6">{message}</p>
        <Link to="/" className="bg-red-500 hover:bg-red-700 text-black py-2 px-4 rounded-md">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Success;
