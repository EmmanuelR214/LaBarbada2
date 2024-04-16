import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useStore } from "../../routes/context/StoreContext";
import { useNavigate } from 'react-router-dom';
import { MenuButton, ButtonBasic } from "../../components/Buttons";
import { TablaComponentes } from "../../components/TablaComponentes ";
import { InputSearch } from "../../components/Inputs";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const listMenu = [
    { id_platillo: 1, nombre_platillo: "Hamburguesa", precio: 8.99, estado: "Disponible", imagen_platillo: "camarones.jpg", descripcion: "jesus alejandro" },
    { id_platillo: 2, nombre_platillo: "Pizza", precio: 10.50, estado: "Agotado", imagen_platillo: "Login.jpg", descripcion: "lorem ipsum" },
    { id_platillo: 3, nombre_platillo: "Ensalada César", precio: 6.75, estado: "Disponible", imagen_platillo: "camarones.jpg", descripcion: "dolor sit amet" },
    { id_platillo: 4, nombre_platillo: "Sushi", precio: 12.25, estado: "Disponible", imagen_platillo: "Login.jpg", descripcion: "consectetur adipiscing elit" },
    // Puedes agregar más filas de datos aquí según sea necesario
  ];
  
  const columns = React.useMemo(
    () => [
      { Header: 'Imagen', accessor: 'imagen_platillo', Cell: ({ value }) => <img src={`/img/${value}`} alt="Platillo" className="h-16 mx-auto" /> },
      { Header: 'Nombre Platillo', accessor: 'nombre_platillo', className: 'text-center' },
      { Header: 'Precio', accessor: 'precio', className: 'text-center' },
      { Header: 'Estado', accessor: 'estado', className: 'text-center' },
      { Header: 'Descripción', accessor: 'descripcion', Cell: ({ value }) => <div className="flex justify-center"><ButtonBasic text='ver mas' color="bg-yellow-400  hover:bg-yellow-500" width="w-20" /></div> },
      {
        Header: 'Editar/eliminar', accessor: 'editar_eliminar', Cell: () => (
          <div className="flex justify-center">
            <button><Icon icon="fe:edit" className="text-3xl mr-10"/> </button>
            <button><Icon icon="material-symbols:delete" className="text-3xl text-red-600"/></button>
          </div>
        ), className: 'text-center'
      },
    ],
    []
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Verificar el ancho de la ventana al cargar la página
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className={`fixed left-0 top-0 w-64 h-full bg-zinc-800 p-4 z-50 sidebar-menu transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <a href="#" className="flex items-center pb-4 border-b border-b-white">
          <img src="/img/logo.svg" alt="" className="w-14 h-8 object-cover" />
          <span className="text-lg font-bold text-white ml-3">Administrador</span>
        </a>
        <ul className="mt-4 bg">
          <li className="mb-1">
            <a href="#" className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md">
              <Icon icon="fluent:food-16-filled" className="text-xl" />
              <span className="text-lg">Platillos</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md">
              <Icon icon="flowbite:clipboard-list-outline" className="text-xl" />
              <span className="text-lg">Reportes</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md">
              <Icon icon="ri:image-add-fill" className="text-xl" />
              <span className="text-lg">Publicidad</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md">
              <Icon icon="mdi:star-plus" className="text-xl" />
              <span className="text-lg">Guarniciones</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${sidebarOpen ? "block" : "hidden"}`} onClick={closeSidebar}></div>

      <main className={` min-h-screen transition-all main ${sidebarOpen ? "pl-64" : ""}`}>
        <div className="py-2 px-6 flex items-center shadow-md shadow-white/15 sticky top-0 left-0 z-30 w-full">
          <button type="button" className="text-lg text-white" onClick={toggleSidebar}>
            <Icon icon="iconamoon:menu-burger-horizontal-light" className="text-2xl" />
          </button>
          <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
              <a href="#" className="text-white hover:text-gray-600 font-medium">Administrador</a>
            </li>
            <li className="text-white -600 mr-2 font-medium">/</li>
            <li className="text-white  mr-2 font-medium">Platillos</li>
          </ul>
          
        </div>
        <div className="p-6">
          <h1 className="text-white font-bold text-4xl text-center p-6">Platillos</h1>

          <div className="flex items-center space-x-4 mb-10">
            <ButtonBasic text='Crear un nuevo platillo' click={() => navigate('/new-product')} width="w-auto p-2 " />
            <ButtonBasic text='Buscar' width="w-24 p-2" color="bg-yellow-400 hover:bg-yellow-500" click={() => navigate('/new-product')} />
            <InputSearch 
              textColor="text-black" 
              iconColor="text-black" 
              placeholderColor="text-black" 
              bgColor="bg-white" 
              placeholderText="Buscar"
              width="w-1/3"
            />
          </div>
                  
          <TablaComponentes columns={columns} data={listMenu} />
        </div>
      </main>
    </>
  );
};

export default DashboardAdmin;





// start: Sidebar
/*
  const sidebarToggle = document.querySelector('.sidebar-toggle')
  const sidebarOverlay = document.querySelector('.sidebar-overlay')
  const sidebarMenu = document.querySelector('.sidebar-menu')
  const main = document.querySelector('.main')
  if(window.innerWidth < 768) {
      main.classList.toggle('active')
      sidebarOverlay.classList.toggle('hidden')
      sidebarMenu.classList.toggle('-translate-x-full')
  }
  sidebarToggle.addEventListener('click', function (e) {
      e.preventDefault()
      main.classList.toggle('active')
      sidebarOverlay.classList.toggle('hidden')
      sidebarMenu.classList.toggle('-translate-x-full')
  })
  sidebarOverlay.addEventListener('click', function (e) {
      e.preventDefault()
      main.classList.add('active')
      sidebarOverlay.classList.add('hidden')
      sidebarMenu.classList.add('-translate-x-full')
  })
  document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
      item.addEventListener('click', function (e) {
          e.preventDefault()
          const parent = item.closest('.group')
          if (parent.classList.contains('selected')) {
              parent.classList.remove('selected')
          } else {
              document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
                  i.closest('.group').classList.remove('selected')
              })
              parent.classList.add('selected')
          }
      })
  })
  // end: Sidebar
*/
