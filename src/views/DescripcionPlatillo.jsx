import React, { useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import { useNavigate  } from 'react-router-dom';

import { useStore } from '../routes/context/StoreContext'
import { useAuth } from '../routes/context/AuthContext';

import { toast } from "react-toastify"
import { CustomSelect, CustomSelectPlus } from '../components/Inputs';
import { ButtonBasic, ButtonCount } from '../components/Buttons';

const DescripcionPlatillo = () => {
  const platillo = localStorage.getItem('platillo')
  const { ObtenerPrecio, Detalle_x_Precio, InsertarCarrito } = useStore()
  const {isAuthenticade, user} = useAuth()
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
  
  //TODO: Calculos
  const precioSub = precioBd * count
  const precioTotal = (precioSub + precioExtraGuarnicion + precioExtraAcompañamiento).toFixed(2)
  
  
  
  const { data, isLoading, isError } = useQuery(['platillo', platillo], async () => {
    const response = await fetch(`http://localhost:3000/api/descripcion-platillo/${platillo}`)
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Error al cargar los detalles del platillo')
    }
    return responseData
  })
  
  useEffect(() => {
    const fetchData = async () => {
      if (data && data.length > 0) {
        const id = data[0].id_platillo;
        const tam = opcionTam.value;
        const pre = opcionPresent.value;
        if (tam !== undefined || pre !== undefined) {
          const p = await ObtenerPrecio(id, tam, pre)
          setPrecioBd(p[0].precio)
          setIDPlato(p[0].id_relacion)
        }
      }
    }
    fetchData()
  }, [data, opcionTam.value, opcionPresent.value])
  
  useEffect(() => {
    if (data && data.length > 0 && opcionPresent === "" && opcionTam === "") {
      obtenerDetalle()
    }
  }, [data, opcionPresent, opcionTam])
  
  //*Funciones de seleccion
  const handleCountChange = (newCount) => {
    setCount(newCount);
  }
  
  const handleTamChange = (option) => {
    setOpcionTam(option)
  }
  
  const handlePresentacionChange = (option) => {
    setOpcionPresent(option)
  }
  
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
  
  //*Funciones de los botones carrito y compra
  const handleCarrito = async() =>{
    try {
      if(isAuthenticade === false){
        toast.error('Necesitas Iniciar sesión para poder agregar al carrito')
        navigate('/Login')
      }else {
        const promesas = [];
        //console.log(user.id)
        if (selectedOptionExtra.length > 0) {
          for (const item of selectedOptionExtra) {
            promesas.push(InsertarCarrito(item.value, user.id, 1, item.precio));
          }
        }
        if (selectAcomp.length > 0) {
          for (const item of selectAcomp) {
            promesas.push(InsertarCarrito(item.value, user.id, 1, item.precio));
          }
        }
        promesas.push(InsertarCarrito(IDPlato, user.id, count, precioSub));
        
        await Promise.all(promesas);
        navigate('/shoppingcar');
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleVenta = async() =>{
    try {
      if(isAuthenticade === false){
        toast.error('Necesitas Iniciar sesión para poder hacer una compra')
        navigate('/Login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  const obtenerDetalle = async () => {
    try {
      const p = await Detalle_x_Precio(data[0].id_platillo, data[0].precio)
      setOpcionPresent({ value: p[0].presentacion, label: p[0].presentacion })
      setOpcionTam({ value: p[0].tamaño, label: p[0].tamaño })
    } catch (error) {
      console.log(error)
    }
  }
  
  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar los detalles del platillo</div>
  
  const tamaños = data[0].tamaños.split(',')
  const presentaciones = data[0].presentaciones.split(',')
  const guarniciones = data[1].filter(item => item.tipo === 'guarnicion')
  const acompañamientos = data[1].filter(item => item.tipo === 'acompañamiento')
  return (
    <main className="flex flex-col md:flex-row h-screen w-full" >
      <section className="w-full md:w-1/2 order-2 md:order-1 flex items-center justify-center" >
        <div className="bg-zinc-800 p-8 items-center flex rounded-xl h-full relative overflow-hidden">
        <img
          src={`https://labarbada.store/imagenes/${data[0].imagen_platillo}`}
          className="rounded-xl w-full h-full object-cover"
          alt="Producto"
        />
      </div>
      </section>
      <section className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-center items-center" >
      <h1 className="text-5xl mt-20 flex font-bold ">Detalle del producto</h1>
      <div className="mb-4">
        <div className="inline-block text-2xl font-bold mt-8">
          {data[0].nombre_platillo} -
        </div>
        <div className="inline-block text-2xl text-red-600 font-bold pl-2">
          ${precioTotal}
        </div>
      </div>
      <h1>Descripción</h1>
      <div className="w-2/3 h-0.5 bg-white mb-4 mt-2"></div>
      <div className="bg-zinc-800 rounded-xl w-5/6">
        <p className="p-4 ">
          {data[0].descripcion_platillo}
        </p>
      </div>
      <div className="flex space-x-28 w-2/3 pt-3 justify-center">
        <div className="w-full">
          <h1 className="my-2">Tamaño</h1>
          <CustomSelect
            options={tamaños.map(tamaño => ({ value: tamaño, label: tamaño }))}
            placeholder={opcionTam ? opcionTam.label : "Tamaño"}
            onChange={handleTamChange}
            value={opcionTam}
          />
        </div>
        <div className="w-full">
          <h1 className="my-2">Tipo</h1>
          <CustomSelect
            options={presentaciones.map(presentacion => ({ value: presentacion, label: presentacion }))}
            placeholder={opcionPresent ? opcionPresent.label : "Presentación"}
            onChange={handlePresentacionChange}
            value={opcionPresent}
          />
        </div>
      </div>
      <div className="w-full my-8 flex flex-col justify-center items-center">
        <h1 className="font-medium">agregale</h1>
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
      <div className="w-full my-8 flex flex-col justify-center items-center">
        <h1 className="font-medium">Acompañalo con</h1>
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
      <div className="my-2 flex space-x-28 items-center">
        <h1>Cantidad</h1>
        <ButtonCount count={count} setCount={handleCountChange} />
      </div>
      <div className="flex space-x-28 w-2/3 pt-6">
        <div className="w-full font-semibold">
          <ButtonBasic icon="mdi:bell" color="bg-red-600" hovColor='hover:bg-red-700' textHover='' text="Ordenar ahora" click={handleVenta}/>
        </div>
        <div className="w-full  font-semibold">
          <ButtonBasic icon="ic:round-shopping-cart" color="bg-yellow-400" hovColor='hover:bg-yellow-500' textHover='' text="Agregar carrito" click={handleCarrito}
          />
        </div>
      </div>
      </section>
    </main>
  );
};

export default DescripcionPlatillo;


/*

*/



/*
      <section>
        <h1>Detalle del platillo</h1>
        <p>${precioBd}</p>
        <CustomSelect
          options={tamaños.map(tamaño => ({ value: tamaño, label: tamaño }))}
          placeholder={opcionTam ? opcionTam.label : "Tamaño"}
          onChange={handleTamChange}
          value={opcionTam}
        />
        <CustomSelect
          options={presentaciones.map(presentacion => ({ value: presentacion, label: presentacion }))}
          placeholder={opcionPresent ? opcionPresent.label : "Presentación"}
          onChange={handlePresentacionChange}
          value={opcionPresent}
        />
        <CustomSelectPlus
          options={guarniciones.map(item => ({
            value: item.id_recomendacion,
            label: item.platillo_recomendado,
            extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`
          }))}
          placeholder="Selecciona una guarnición"
          onChange={handleChangeExtra}
          value={selectedOptionExtra}
        />
        <CustomSelectPlus
          options={acompañamientos.map(item => ({
            value: item.id_recomendacion,
            label: item.platillo_recomendado,
            extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`
          }))}
          placeholder="Selecciona un acompañamiento"
          onChange={handleChangeAcomp}
          value={selectAcomp}
        />
      </section>
*/
