import React,{ useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../routes/context/AuthContext";
import { ModalComponent, ModalUbicacion } from "../components/Modal";
import { EliminarCuentaRoute, TraerDatosUsuarioRoute } from "../utils/api/urlUser";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import { LocationMap } from "../components/MapView";
import { Link } from "react-router-dom";
import { TablaComponentes2 } from "../components/Tables";
import { EliminarDireccionRoute } from "../utils/api/urlUser";

function UserProfile() {
  const { user, ActualizarRoute, logout, TraerDireccon} = useAuth();
  const [correoUser, setCorreoUser] = useState(null);
  const [locationsViews, setLocationsViews] = useState([]);
  const [comprasUsuario, setComprasUsuario] = useState([]);
  const [direccionesUser, setDireccionesUser] = useState([]);
  const [telUser, setTelUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false)
  const [idDireccion, setIdDireccion] = React.useState(null);
  const id = localStorage.getItem('id')
  
  
  const [direcciones, setDirecciones] = useState([]);
  const [iconos, setIconos] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [err, setErr] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      if (shouldFetch) {
        try {
          if (!navigator.onLine) {
            // Si no hay conexión a Internet, asignar arreglos vacíos
            setLocationsViews([]);
            setComprasUsuario([]);
            setDireccionesUser([]);
            return;
          }
  
          // Obtener datos del servidor
          const res = await TraerDatosUsuarioRoute(id);
          const data = res.data;
  
          const formattedLocations = data[0]?.map((direccion) => ({
            lat: parseFloat(direccion.latitud),
            lng: parseFloat(direccion.longitud),
            apodo: direccion.apodo,
          })) || [];
  
          setLocationsViews(formattedLocations);
          setComprasUsuario(data[1] || []);
          setDireccionesUser(data[0] || []);
  
          // Guardar los datos en localStorage
          localStorage.setItem(
            'userData',
            JSON.stringify({
              locationsViews: formattedLocations,
              comprasUsuario: data[1] || [],
              direccionesUser: data[0] || [],
            })
          );
        } catch (error) {
          console.error("Error al traer los datos del usuario:", error);
          // En caso de error, establecer valores vacíos para evitar que la vista falle
          setLocationsViews([]);
          setComprasUsuario([]);
          setDireccionesUser([]);
        }
      }
    }
  
    fetchData();
  }, [isModalOpen3, shouldFetch]);
  
  
  useEffect(() => {
    if (shouldFetch) {
      async function Data() {
        try {
          if (!navigator.onLine) {
            // Si no hay conexión a Internet, asignar valores vacíos
            setDirecciones([]);
            setIconos([]);
            setShouldFetch(false);
            return;
          }
  
          // Si hay conexión a Internet, obtener datos del servidor
          const direc = await TraerDireccon();
          setDirecciones(direc?.[0] || []);
          setIconos(direc?.[1] || []);
  
          // Guardar los datos en el localStorage
          localStorage.setItem('direcciones', JSON.stringify(direc[0] || []));
          localStorage.setItem('iconos', JSON.stringify(direc[1] || []));
  
          setShouldFetch(false);
        } catch (error) {
          console.error("Error al obtener direcciones e iconos:", error);
          // En caso de error, establecer valores vacíos para evitar que la vista falle
          setDirecciones([]);
          setIconos([]);
        }
      }
      Data();
    }
  }, [shouldFetch]);
  
  
  
  
  
  useEffect(() => {
    if (!user) {
      // Si user no está definido, no hacer nada.
      return;
    }
  
    if (navigator.onLine) {
      setCorreoUser(user.email || 'Correo no disponible');
      setTelUser(user.telefono || 'Teléfono no disponible');
    } else {
      setCorreoUser('Correo no disponible');
      setTelUser('Teléfono no disponible');
    }
  }, [user]);
  

  const Actualizar = async () => {
    try {
      console.log(correoUser, telUser);
      await ActualizarRoute(correoUser, telUser, user.id)
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const Eliminar = async () => {
    try {
      if(user.id){
        const ll = await EliminarCuentaRoute(user.id)
        console.log(ll)
        logout()
      }
    } catch (error) {
      console.log('error ',error)
      toast.error('Error al eliminar la cuenta')
    }
  }
  
  
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };
  const handleInputChangeCorreo = (e) => {
    setCorreoUser(e.target.value);
  };

  const handleInputChangeTel = (e) => {
    setTelUser(e.target.value);
  };
  
  const EliminarDireccion = async() => {
    try {
      const result = await EliminarDireccionRoute(idDireccion)
      toast.success(`${result.data}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha de Venta",
        accessor: "fecha_venta",
        className: "text-center",
        Cell: ({ value }) => {
          const date = new Date(value);
          return <div className="text-left">{date.toLocaleDateString()}</div>;
        },
      },
      {
        Header: "Platillo",
        accessor: "platillo",
        className: "text-center",
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
        className: "text-center",
      },
      {
        Header: "Total",
        accessor: "total",
        className: "text-center",
      },
    ],
    []
  );
  
  const columns2 = React.useMemo(
    () => [
      {
        Header: "Direccion",
        accessor: "direccion",
        className: "text-center",
      },
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      { 
        Header: "Apodo", 
        accessor: "apodo", 
        className: "text-center" 
      },
      {
        Header: "Eliminar",
        accessor: "eliminar",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button 
              className="bg-red-600 p-2 rounded-md" 
              onClick={() => { 
                setIsModalOpen3(true); 
                setIdDireccion(row.original.id_direccion); 
              }}
            >
              <Icon icon="fa-regular:trash-alt" className="text-2xl" />
            </button>
          </div>
        ),
        className: "text-center",
      }
    ],
    []
  );
  
  const transformedData2 = direccionesUser ? direccionesUser.map((item) => ({
    id_direccion: item.id_direccion, // Incluimos el ID en los datos transformados
    direccion: item.direccion,
    descripcion: item.descripcion,
    apodo: item.apodo,
  })) : [];
  
  const transformedData = comprasUsuario ? comprasUsuario.map((item) => ({
    fecha_venta: item.fecha_venta,
    platillo: item.producto,
    cantidad: item.cantidad,
    total: item.total_compra,
  })) : [];
  
  return (
    <>
    <div className="pt-32 md:pt-24 p-4 md:p-10 min-h-screen">
    {!navigator.onLine && (
      <div className="bg-yellow-500 p-4 rounded-md text-center trans">
        No hay conexión a Internet. Algunos datos pueden no estar disponibles.
      </div>
    )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Icon icon="fa:user-circle" className="w-8 h-8 mr-2" />
            <h2 className="text-xl md:text-2xl font-bold">Perfil de Usuario</h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Teléfono</label>
            <input type="text" id="phone" onChange={handleInputChangeTel} value={telUser || ''} className="w-full p-2 bg-[#202020] rounded-lg mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Correo Electrónico</label>
            <input type="text" id="email" onChange={handleInputChangeCorreo} value={correoUser || ''} className="w-full p-2 bg-[#202020] rounded-lg mt-1" />
          </div>
          <div className="flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
            <Link to='/recuperar' className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg w-full md:w-auto text-center">Cambiar Contraseña</Link>
            <button onClick={()=>{
              if(!navigator.onLine){
                setErr('No hay conexion a Internet. Algunos datos pueden no estar disponibles.')
                return
              }
              openModal
              }} className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg w-full md:w-auto">Eliminar Cuenta</button>
            <button onClick={() => {
              if(!navigator.onLine){
                setErr('No hay conexion a Internet. Algunos datos pueden no estar disponibles.')
                return
              }
              setIsModalOpen2(true)
              }} className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg w-full md:w-auto">Actualizar datos</button>
          </div>
          {err && <div className="text-red-500 p-4 rounded-md text-center">{err}</div>}
        </div>
        <div className="relative bg-gray-700 rounded-3xl shadow-lg flex items-center justify-center h-80 md:h-auto">
          <LocationMap locations={locationsViews} />
        </div>
      </div>
      <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Compras</h2>
        <TablaComponentes2 columns={columns} data={transformedData} />
      </div>
      <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Direcciones</h2>
        <button onClick={()=>{setIsModalOpen4(true), setShouldFetch(true)}} className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg w-full md:w-auto">Agregar Dirección</button>
        <TablaComponentes2 columns={columns2} data={transformedData2} />
      </div>
    </div>
      < ModalComponent isOpen={isModalOpen} onClose={closeModal} onClick={()=>{Eliminar(), closeModal()}} text='perdera el acceso de esta cuenta, ¿estas seguro de eliminarla? despues de eliminarla nos quedaremos con tu informacion 3 meses, estos datos estaran protegidos' title='¿Estás seguro de eliminar?' color={'bg-red-500 hover:bg-red-600'} action='Eliminar'/>
      < ModalComponent isOpen={isModalOpen2} onClose={closeModal} onClick={()=>{Actualizar(), closeModal()}} text={`¿estas seguro de actualizar tus datos? teléfono: ${telUser} corrreo: ${correoUser}`} color={'bg-blue-500 hover:bg-blue-600'} action='Actualizar' title='¿Estás seguro de editar?' />
      < ModalComponent isOpen={isModalOpen3} onClose={closeModal} onClick={()=>{EliminarDireccion(), closeModal()}} text={`Esta dirección se eliminara y no se podra utilizar para futuras compras`} color={'bg-red-500 hover:bg-red-600'} action='Eliminar' title='¿Estás seguro de eliminar?' />
      {isModalOpen4 && <ModalUbicacion onClose={()=>setIsModalOpen4(false)} setFeach={setShouldFetch} apodo={iconos} isOpen={isModalOpen4}/>}
    </>
  );
}

export default UserProfile;


/*
function UserProfile() {
  const { user, ActualizarRoute, logout, TraerDireccon} = useAuth();
  const [correoUser, setCorreoUser] = useState(null);
  const [locationsViews, setLocationsViews] = useState([]);
  const [comprasUsuario, setComprasUsuario] = useState([]);
  const [direccionesUser, setDireccionesUser] = useState([]);
  const [telUser, setTelUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false)
  const [idDireccion, setIdDireccion] = React.useState(null);
  const id = localStorage.getItem('id')
  
  
  const [direcciones, setDirecciones] = useState([]);
  const [iconos, setIconos] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      if (shouldFetch) {
        try {
          if (!navigator.onLine) {
            // Si no hay conexión a internet, obtener datos de localStorage
            const storedData = JSON.parse(localStorage.getItem('userData'));
            if (storedData) {
              setLocationsViews(storedData.locationsViews);
              setComprasUsuario(storedData.comprasUsuario);
              setDireccionesUser(storedData.direccionesUser);
            }
            return;
          }

          // Obtener datos del servidor
          const res = await TraerDatosUsuarioRoute(id);
          const data = res.data;
          const direcciones = data[0];
          const formattedLocations = direcciones.map((direccion) => ({
            lat: parseFloat(direccion.latitud),
            lng: parseFloat(direccion.longitud),
            apodo: direccion.apodo,
          }));

          setLocationsViews(formattedLocations);
          setComprasUsuario(data[1]);
          setDireccionesUser(data[0]);

          // Guardar los datos en localStorage
          localStorage.setItem(
            'userData',
            JSON.stringify({
              locationsViews: formattedLocations,
              comprasUsuario: data[1],
              direccionesUser: data[0],
            })
          );
        } catch (error) {
          console.error("Error al traer los datos del usuario:", error);
          setLocationsViews([]);
          setComprasUsuario([]);
          setDireccionesUser([]);
        }
      }
    }

    fetchData();
  }, [isModalOpen3, shouldFetch]);
  
  useEffect(() => {
    if (shouldFetch) {
      async function Data() {
        try {
          if (!navigator.onLine) {
            // Si no hay conexión a Internet, obtener datos del localStorage
            const storedDirecciones = localStorage.getItem('direcciones');
            const storedIconos = localStorage.getItem('iconos');
  
            if (storedDirecciones && storedIconos) {
              setDirecciones(JSON.parse(storedDirecciones));
              setIconos(JSON.parse(storedIconos));
            }
            setShouldFetch(false);
            return;
          }
  
          // Si hay conexión a Internet, obtener datos del servidor
          const direc = await TraerDireccon();
          setDirecciones(direc[0]);
          setIconos(direc[1]);
  
          // Guardar los datos en el localStorage
          localStorage.setItem('direcciones', JSON.stringify(direc[0]));
          localStorage.setItem('iconos', JSON.stringify(direc[1]));
  
          setShouldFetch(false);
        } catch (error) {
          console.error("Error al obtener direcciones e iconos:", error);
        }
      }
      Data();
    }
  }, [shouldFetch]);
  
  
  
  
  useEffect(() => {
    setCorreoUser(user.email);
    setTelUser(user.telefono);
  }, [user]);

  const Actualizar = async () => {
    try {
      console.log(correoUser, telUser);
      await ActualizarRoute(correoUser, telUser, user.id)
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const Eliminar = async () => {
    try {
      if(user.id){
        const ll = await EliminarCuentaRoute(user.id)
        console.log(ll)
        logout()
      }
    } catch (error) {
      console.log('error ',error)
      toast.error('Error al eliminar la cuenta')
    }
  }
  
  
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };
  const handleInputChangeCorreo = (e) => {
    setCorreoUser(e.target.value);
  };

  const handleInputChangeTel = (e) => {
    setTelUser(e.target.value);
  };
  
  const EliminarDireccion = async() => {
    try {
      const result = await EliminarDireccionRoute(idDireccion)
      toast.success(`${result.data}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha de Venta",
        accessor: "fecha_venta",
        className: "text-center",
        Cell: ({ value }) => {
          const date = new Date(value);
          return <div className="text-left">{date.toLocaleDateString()}</div>;
        },
      },
      {
        Header: "Platillo",
        accessor: "platillo",
        className: "text-center",
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
        className: "text-center",
      },
      {
        Header: "Total",
        accessor: "total",
        className: "text-center",
      },
    ],
    []
  );
  
  const columns2 = React.useMemo(
    () => [
      {
        Header: "Direccion",
        accessor: "direccion",
        className: "text-center",
      },
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      { 
        Header: "Apodo", 
        accessor: "apodo", 
        className: "text-center" 
      },
      {
        Header: "Eliminar",
        accessor: "eliminar",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button 
              className="bg-red-600 p-2 rounded-md" 
              onClick={() => { 
                setIsModalOpen3(true); 
                setIdDireccion(row.original.id_direccion); 
              }}
            >
              <Icon icon="fa-regular:trash-alt" className="text-2xl" />
            </button>
          </div>
        ),
        className: "text-center",
      }
    ],
    []
  );
  
  const transformedData2 = direccionesUser ? direccionesUser.map((item) => ({
    id_direccion: item.id_direccion, // Incluimos el ID en los datos transformados
    direccion: item.direccion,
    descripcion: item.descripcion,
    apodo: item.apodo,
  })) : [];
  
  const transformedData = comprasUsuario ? comprasUsuario.map((item) => ({
    fecha_venta: item.fecha_venta,
    platillo: item.producto,
    cantidad: item.cantidad,
    total: item.total_compra,
  })) : [];
  
  return (
    <>
    <div className="pt-32 md:pt-24 p-4 md:p-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Icon icon="fa:user-circle" className="w-8 h-8 mr-2" />
            <h2 className="text-xl md:text-2xl font-bold">Perfil de Usuario</h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Teléfono</label>
            <input type="text" id="phone" onChange={handleInputChangeTel} value={telUser || ''} className="w-full p-2 bg-[#202020] rounded-lg mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Correo Electrónico</label>
            <input type="text" id="email" onChange={handleInputChangeCorreo} value={correoUser || ''} className="w-full p-2 bg-[#202020] rounded-lg mt-1" />
          </div>
          <div className="flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
            <Link to='/recuperar' className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg w-full md:w-auto text-center">Cambiar Contraseña</Link>
            <button onClick={openModal} className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg w-full md:w-auto">Eliminar Cuenta</button>
            <button onClick={() => setIsModalOpen2(true)} className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg w-full md:w-auto">Actualizar datos</button>
          </div>
        </div>
        <div className="relative bg-gray-700 rounded-3xl shadow-lg flex items-center justify-center h-80 md:h-auto">
          <LocationMap locations={locationsViews} />
        </div>
      </div>
      <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Compras</h2>
        <TablaComponentes2 columns={columns} data={transformedData} />
      </div>
      <div className="bg-[#151515] p-4 md:p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Direcciones</h2>
        <button onClick={()=>{setIsModalOpen4(true), setShouldFetch(true)}} className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg w-full md:w-auto">Agregar Dirección</button>
        <TablaComponentes2 columns={columns2} data={transformedData2} />
      </div>
    </div>
      < ModalComponent isOpen={isModalOpen} onClose={closeModal} onClick={()=>{Eliminar(), closeModal()}} text='perdera el acceso de esta cuenta, ¿estas seguro de eliminarla? despues de eliminarla nos quedaremos con tu informacion 3 meses, estos datos estaran protegidos' title='¿Estás seguro de eliminar?' color={'bg-red-500 hover:bg-red-600'} action='Eliminar'/>
      < ModalComponent isOpen={isModalOpen2} onClose={closeModal} onClick={()=>{Actualizar(), closeModal()}} text={`¿estas seguro de actualizar tus datos? teléfono: ${telUser} corrreo: ${correoUser}`} color={'bg-blue-500 hover:bg-blue-600'} action='Actualizar' title='¿Estás seguro de editar?' />
      < ModalComponent isOpen={isModalOpen3} onClose={closeModal} onClick={()=>{EliminarDireccion(), closeModal()}} text={`Esta dirección se eliminara y no se podra utilizar para futuras compras`} color={'bg-red-500 hover:bg-red-600'} action='Eliminar' title='¿Estás seguro de eliminar?' />
      {isModalOpen4 && <ModalUbicacion onClose={()=>setIsModalOpen4(false)} setFeach={setShouldFetch} apodo={iconos} isOpen={isModalOpen4}/>}
    </>
  );
}

*/




/*
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      <div className="w-2/3 h-2/3 flex flex-col justify-center">
        <div className="w-full flex py-5 items-center justify-center">
          <h2 className="flex items-center px-10 py-2 text-4xl font-bold">
            Datos personales
          </h2>
        </div>
        <div className="flex p-2 items-center justify-center">
          <div className="w-7/12 flex justify-between items-center">
            <div className="px-5 h-auto w-6/12 py-5 flex flex-col justify-between">
              <label htmlFor="phone" className="text-sm my-2">
                Número telefónico
              </label>
              <div className="flex bg-gray-700 items-center rounded-md overflow-hidden">
                <input
                  type="text"
                  id="phone"
                  onChange={handleInputChangeTel}
                  value={telUser || ''}
                  className="py-2 px-4 w-full bg-transparent text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-2 items-center justify-center">
          <div className="px-5 h-auto w-7/12 flex flex-col justify-between">
            <label htmlFor="email" className="text-sm my-2">
              Correo electrónico
            </label>
            <div className="flex bg-gray-700 items-center rounded-md overflow-hidden">
              <input
                type="text"
                id="email"
                onChange={handleInputChangeCorreo}
                value={correoUser || ''}
                className="py-2 px-4 w-full bg-transparent text-white"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2">
          <div className="w-7/12 px-5">
            <h4 className="text-white text-sm my-2">Actuaizar cuenta</h4>
            <button onClick={Actualizar} className="bg-blue-500 text-white px-16 py-2 rounded-md">
              Actuaizar cuenta
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center p-2">
          <div className="w-7/12 px-5">
            <h4 className="text-white text-sm my-2">Eliminar cuenta</h4>
            <button onClick={openModal} className="bg-red-500 text-white px-16 py-2 rounded-md">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      < ModalComponent isOpen={isModalOpen} onClose={closeModal} onClick={()=>{Eliminar(), closeModal()}} text='perdera el acceso de esta cuenta, ¿estas seguro de eliminarla? despues de eliminarla nos quedaremos con tu informacion 3 meses, estos datos estaran protegidos' />
    </div>

*/