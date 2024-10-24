import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQuery } from "react-query"
import { DescripcionPlatilloRouter, ObtenerDetallePorPrecioRoute, ObtenerPrecioRoute } from "../utils/api/urlStore"
import { useStore } from "../routes/context/StoreContext"
import { useAuth } from "../routes/context/AuthContext"
import {  CustomSelectPlus } from "../components/Inputs"
import { ButtonBasic, ButtonCount, ButtonDetalle } from "../components/Buttons"
import Loader from "../components/Loader"
function DescripcionPlatillo() {
  const {isAuthenticade, user} = useAuth()
  const id = localStorage.getItem('id')
  const {InsertarCarrito} = useStore()
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const [precioExtraGuarnicion, setPrecioExtraGuarnicion] = useState(0)
  const [precioExtraAcompañamiento, setPrecioExtraAcompañamiento] = useState(0)
  const [precioBd, setPrecioBd] = useState(null)
  const [IDPlato, setIDPlato] = useState(null)
  const [opcionTam, setOpcionTam] = useState("")
  const [opcionPresent, setOpcionPresent] = useState("")
  const [selectedOptionExtra, setSelectedOptionExtra] = useState([])
  const [selectAcomp, setSelectAcomp] = useState([])
  
  const [tamaños, setTamaños] = useState([])
  const [presentaciones, setPresentaciones] = useState([])
  const [guarniciones, setGuarniciones] = useState([])
  const [acompañamientos, setAcompañamientos] = useState([])
  
  const platillo = localStorage.getItem('platillo')
  const precioSub = precioBd * count
  const precioTotal = (precioSub + precioExtraGuarnicion + precioExtraAcompañamiento).toFixed(2)
  
  const { data, isLoading } = useQuery(['platillo', platillo], async () => {
    const response = await DescripcionPlatilloRouter(platillo)
    const responseData = response.data
    if (!responseData) {
      throw new Error('Error al cargar los detalles del platillo')
    }
    return responseData
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && data.length > 0) {
          const id = data[0].id_platillo;
          const tam = opcionTam.value;
          const pre = opcionPresent.value;
          setTamaños(data[0].tamaños.split(','));
          setPresentaciones(data[0].presentaciones.split(','));
          setGuarniciones(data[1].filter(item => item.tipo === 'guarnicion'));
          setAcompañamientos(data[1].filter(item => item.tipo === 'acompañamiento'));
          if (tam !== undefined || pre !== undefined) {
            let p = await ObtenerPrecioRoute(id, tam, pre)
            p = p.data
            setPrecioBd(p[0].precio)
            setIDPlato(p[0].id_relacion)
          }
        }
      } catch (error) {
        console.log(error)
        toast.error('Error al cargar los detalles del platillo')
      }
    }
    fetchData()
  }, [data, opcionTam.value, opcionPresent.value])
  
  useEffect(() => {
    if (data && data.length > 0 && opcionPresent === "" && opcionTam === "") {
      obtenerDetalle()
    }
  }, [data, opcionPresent, opcionTam])
  
  const obtenerDetalle = async () => {
    try {
      let p = await ObtenerDetallePorPrecioRoute(data[0].id_platillo, data[0].precio)
      p = p.data
      setOpcionPresent({ value: p[0].presentacion, label: p[0].presentacion })
      setOpcionTam({ value: p[0].tamaño, label: p[0].tamaño })
    } catch (error) {
      console.log(error)
    }
  }
  
  
  //*Funciones de seleccion
  const handleCountChange = (newCount) => setCount(newCount)
  
  const handleTamChange = (option) => setOpcionTam(option)
  
  const handlePresentacionChange = (option) => setOpcionPresent(option)
  
  const calcularTotalPrecios = (option) => {
    const precios = option.map(item => parseFloat(item.precio))
    return precios.reduce((total, precio) => total + precio, 0)
  }
  
  const handleChangeExtra = (option) => {
    const total = calcularTotalPrecios(option)
    setPrecioExtraGuarnicion(total)
    setSelectedOptionExtra(option)
  }
  
  const handleChangeAcomp = (option) => {
    const total = calcularTotalPrecios(option)
    setPrecioExtraAcompañamiento(total)
    setSelectAcomp(option)
  }
  
  const handleVenta = async() =>{
    try {
      if(isAuthenticade){
        const addItemsToCart = async () => {
          for (const item of selectedOptionExtra) {
            try {
              const response = await InsertarCarrito(item.value, id, 1, item.precio);
              if (!response.includes('agregado')) {
                throw new Error('Error al agregar guarnición al carrito');
              }
            } catch (error) {
              console.error('Error al agregar guarnición:', error);
              toast.error('Error al agregar guarnición al carrito');
              throw error;  
            }
          }
          
          for (const item of selectAcomp) {
            try {
              const response = await InsertarCarrito(item.value, id, 1, item.precio);
              if (!response.includes('agregado')) {
                throw new Error('Error al agregar acompañamiento al carrito');
              }
            } catch (error) {
              console.error('Error al agregar acompañamiento:', error);
              toast.error('Error al agregar acompañamiento al carrito');
              throw error;  
            }
          }
          try {
            const response = await InsertarCarrito(IDPlato, id, count, precioSub);
            if (!response.includes('agregado')) {
              throw new Error('Error al agregar platillo al carrito');
            }
          } catch (error) {
            console.error('Error al agregar platillo:', error);
            toast.error('Error al agregar platillo al carrito');
            throw error; 
          }
        };
        await addItemsToCart();
        navigate('/payment');
      }else{
        toast.error('Necesitas Iniciar sesión para poder hacer una compra')
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleCarrito = async () => {
    try {
      if (!isAuthenticade) {
        toast.error('Necesitas iniciar sesión para poder agregar al carrito');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
      const addItemsToCart = async () => {
        for (const item of selectedOptionExtra) {
          try {
            const response = await InsertarCarrito(item.value, id, 1, item.precio);
            if (!response.includes('agregado')) {
              throw new Error('Error al agregar guarnición al carrito');
            }
          } catch (error) {
            console.error('Error al agregar guarnición:', error);
            toast.error('Error al agregar guarnición al carrito');
            throw error;  
          }
        }
        
        for (const item of selectAcomp) {
          try {
            const response = await InsertarCarrito(item.value, id, 1, item.precio);
            if (!response.includes('agregado')) {
              throw new Error('Error al agregar acompañamiento al carrito');
            }
          } catch (error) {
            console.error('Error al agregar acompañamiento:', error);
            toast.error('Error al agregar acompañamiento al carrito');
            throw error;  
          }
        }
        try {
          const response = await InsertarCarrito(IDPlato, id, count, precioSub);
          console.log(response)
          if (!response.includes('agregado')) {
            throw new Error('Error al agregar platillo al carrito');
          }
        } catch (error) {
          console.error('Error al agregar platillo:', error);
          toast.error('Error al agregar platillo al carrito');
          throw error; 
        }
      };

      await addItemsToCart();
      toast.success('Producto(s) agregado(s) al carrito');
      navigate('/shoppingcar');
    } catch (error) {
      console.error('Error al manejar el carrito:', error);
      toast.error('Error al agregar al carrito');
    }
  };
  
  if (isLoading) return <Loader/>
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        <section className="w-full md:w-1/2 order-1 md:order-1 flex items-center justify-center">
          <div className="bg-zinc-800 p-8 items-center flex rounded-xl h-full relative overflow-hidden">
            <img
              src={`https://labarbada.store/img/${data[0].imagen_platillo}`}
              className="rounded-xl w-full h-full object-cover"
              alt="Producto"
            />
          </div>
        </section>
        <section className="w-full md:w-1/2 order-2 md:order-2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
          <h1 className="text-5xl mt-20 mb-6 font-bold text-white">Detalle del producto</h1>
          <div className="mb-4 flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-white">{data[0].nombre_platillo} -</div>
            <div className="text-2xl text-red-600 font-bold">${precioTotal}</div>
          </div>
          <h1 className="text-white mb-2">Descripción</h1>
          <div className="w-full h-0.5 bg-white mb-4"></div>
          <div className="bg-zinc-800 rounded-xl w-full mb-6">
            <p className="p-4 text-white">{data[0].descripcion_platillo}</p>
          </div>
          <div className={`flex w-full mb-6 ${tamaños.includes('ninguno') || presentaciones.includes('Unica') ? 'space-x-0' : 'space-x-4'}`}>
            {!tamaños.includes('ninguno') && (
              <div className={`w-${presentaciones.includes('Unica') ? 'full' : '1/2'} pr-2`}>
                <h1 className="my-2 text-white">Tamaño</h1>
                <div className="flex flex-wrap gap-2">
                  {tamaños.map((tamano, index) => (
                    <ButtonDetalle
                      key={index}
                      text={tamano}
                      onClick={() => handleTamChange({ value: tamano, label: tamano })}
                    />
                  ))}
                </div>
              </div>
            )}
            {!presentaciones.includes('Unica') && (
              <div className={`w-${tamaños.includes('ninguno') ? 'full' : '1/2'} pl-2`}>
                <h1 className="my-2 text-white">Tipo</h1>
                <div className="flex flex-wrap gap-2">
                  {presentaciones.map((presentacion, index) => (
                    <ButtonDetalle
                      key={index}
                      text={presentacion}
                      onClick={() => handlePresentacionChange({ value: presentacion, label: presentacion })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="font-medium text-white mb-2">Acompáñalo con</h1>
            <CustomSelectPlus
              options={acompañamientos.map(item => ({
                value: item.id_platillo_recomendado,
                label: item.platillo_recomendado,
                precio: item.precio_platillo_recomendado,
                extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`
              }))}
              placeholder="Selecciona un acompañamiento"
              onChange={handleChangeAcomp}
              value={selectAcomp}
            />
          </div>
          <div className="w-full mb-6">
            <h1 className="font-medium text-white mb-2">Guarniciones</h1>
            <CustomSelectPlus
              options={guarniciones.map(item => ({
                value: item.id_platillo_recomendado,
                label: item.platillo_recomendado,
                precio: item.precio_platillo_recomendado,
                extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`
              }))}
              placeholder="Selecciona una guarnición"
              onChange={handleChangeExtra}
              value={selectedOptionExtra}
            />
          </div>
          <div className="my-2 flex items-center space-x-4">
            <h1 className="text-white">Cantidad</h1>
            <ButtonCount count={count} setCount={handleCountChange} />
          </div>
          <div className="flex w-full mt-6">
            <div className="w-1/2 pr-2">
              <ButtonBasic
                icon="mdi:bell"
                color="bg-red-600"
                width='w-2/3'
                hovColor="hover:bg-red-700"
                textHover=""
                text="Ordenar ahora"
                click={handleVenta}
              />
            </div>
            <div className="w-1/2 pl-2">
              <ButtonBasic
                icon="ic:round-shopping-cart"
                color="bg-yellow-400"
                hovColor="hover:bg-yellow-500"
                textHover=""
                width='w-2/3'
                text="Agregar carrito"
                click={handleCarrito}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DescripcionPlatillo


