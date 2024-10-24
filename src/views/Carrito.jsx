import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../routes/context/StoreContext";
import { CardCar } from "../components/Cards";
import { ButtonBasic } from "../components/Buttons";
import { ObtenerCarritoRoute } from "../utils/api/urlStore";
import Loader from "../components/Loader";
import { useAuth } from "../routes/context/AuthContext";

const Carrito = () => {
  const { UpdateCar, DeleteShoppingCar } = useStore();
  const {setNumeroProductos, numeroProductos} = useAuth()
  const [obtenerCarrito, setObtenerCarrito] = useState([]);
  const [sumaSubtotales, setSumaSubtotales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const car = await ObtenerCarritoRoute(id);
        if (car) {
          let objCar = car.data[0].length;
          setNumeroProductos(objCar);
          setObtenerCarrito(car.data[0]);
          const total = car.data[0].reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
          setSumaSubtotales(total);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarrito();
  }, [id, obtenerCarrito]);

  const handleLess = async (id_carrito, cantidad, precioUnitario) => {
    try {
      const cant = Math.max(1, cantidad - 1);
      const total = cant * precioUnitario;
      await UpdateCar(id_carrito, cant, total);
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error("Error updating cart item");
    }
  };

  const handleDelete = async (id_carrito) => {
    try {
      await DeleteShoppingCar(id_carrito);
      setObtenerCarrito((prev) => prev.filter((item) => item.id_carrito !== id_carrito));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handlePluss = async (id_carrito, cantidad, precioUnitario) => {
    try {
      const cant = cantidad + 1;
      const total = cant * precioUnitario;
      await UpdateCar(id_carrito, cant, total);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  
  const carritoOff = JSON.parse(localStorage.getItem('carritoOffline')) || [];
  const numeroPlatillosOffline = carritoOff.length;
  if (isLoading) return <Loader />;
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center space-y-4">
      <h1 className="text-white text-5xl font-semibold mt-14 mb-8 text-center">Carrito</h1>
      <section className="w-11/12 h-[70vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex flex-col items-center space-y-5">
          {!navigator.onLine && (
            <>
            <div className="text-center text-neutral-400">
              Existen {numeroProductos} en el carrito.
            </div>
            {
              carritoOff > 0 && (
                <div className="text-center text-neutral-400">
                Se agregaron {numeroPlatillosOffline} platillos en el carrito sin conexion a internet.
              </div>
              )
            }
            </>
          )}
          
          {obtenerCarrito.map((item, index) => (
            <CardCar
              key={index}
              img={item.imagen_platillo}
              title={item.nombre_platillo}
              p={item.descripcion_platillo}
              count={item.cantidad}
              precio={item.subtotal}
              less={() => handleLess(item.id_carrito, item.cantidad, item.precio_unitario)}
              plus={() => handlePluss(item.id_carrito, item.cantidad, item.precio_unitario)}
              delet={() => handleDelete(item.id_carrito)}
            />
          ))}
        </div>
      </section>
      <section className="w-11/12 sm:w-[68%] flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-7">
        <h3 className="text-4xl font-semibold">${sumaSubtotales.toFixed(2)}</h3>
        <ButtonBasic
          width="w-full sm:w-[15%]"  // En pantallas pequeñas, 100% ancho, en pantallas grandes 15%
          text="Confirmar"
          textHover=""
          hovColor="hover:bg-[#098BD1]"
          click={() => {
            if (obtenerCarrito.length > 0) {
              navigate('/payment');
            } else {
              toast.error('No hay nada en el carrito');
            }
          }}
        />
      </section>
    </main>
  );
};

export default Carrito;