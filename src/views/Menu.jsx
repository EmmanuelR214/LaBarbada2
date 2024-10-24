import { useState, useEffect, useMemo } from "react"
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { InputSearch } from "../components/Inputs";
import { ButtonBasic } from "../components/Buttons";
import { CardMenu, CardMenuLoading } from "../components/Cards";
import { useStore } from "../routes/context/StoreContext";
import { useQueryClient } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const Menu = () => {
  const { listMenu, category, seleccion, setSeleccion, busqueda, setBusqueda, setNoResult, noResult } = useStore();
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 1024);
  const queryClient = useQueryClient();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [previousOffers, setPreviousOffers] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);  
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  
    const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      const sidebar = document.getElementById("sidebar");
      if (window.innerWidth < 1024 && sidebar && !sidebar.contains(event.target) && !event.target.closest('button')) {
        setSidebarVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible]);

  const handleCategoryClick = (categoriaId, event) => {
    event.stopPropagation()
    setSeleccion(categoriaId);
    setBusqueda('');
    console.log(categoriaId)
    queryClient.invalidateQueries(['platillos', seleccion, busqueda]);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setSidebarVisible(false);
      }, 200)
    }
  };

  const handleResetClick = () => {
    setSeleccion(null);
    setBusqueda('');
    setNoResult(false);
    queryClient.invalidateQueries('platillos');
  };

  const handleSearchChange = (e) => {
    setSeleccion(null);
    setBusqueda(e.target.value);
    queryClient.invalidateQueries(['platillos', seleccion, busqueda]);
  };
  
  const sortedListMenu = useMemo(() => {
    return [...listMenu].sort((a, b) => {
      if (a.estado === 'oferta' && b.estado !== 'oferta') return -1;
      if (a.estado !== 'oferta' && b.estado === 'oferta') return 1;
      if (a.estado === 'nuevo' && b.estado !== 'nuevo') return -1;
      if (a.estado !== 'nuevo' && b.estado === 'nuevo') return 1;
      return 0;
    });
  }, [listMenu]);
  
  useEffect(() => {
    if (isOffline) {
      const savedPlatillos = localStorage.getItem('savedPlatillos');
      if (savedPlatillos) {
        const parsedPlatillos = JSON.parse(savedPlatillos);
        setItems(parsedPlatillos);
        setHasMore(false); // No hay más elementos para cargar si estamos offline
      }
    } else {
      setItems(sortedListMenu.slice(0, 10)); // Inicialmente carga los primeros 10 elementos
      setHasMore(sortedListMenu.length > 10); // Determina si hay más elementos para cargar
    }
  }, [sortedListMenu, isOffline]);
  
  useEffect(() => {
    if (!isOffline) {
      const platillosToSave = sortedListMenu.slice(0, 10);
      localStorage.setItem('savedPlatillos', JSON.stringify(platillosToSave));
    }
  }, [sortedListMenu, isOffline]);
  
  const fetchMoreData = () => {
    if (items.length >= sortedListMenu.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(prevItems => prevItems.concat(sortedListMenu.slice(prevItems.length, prevItems.length + 10)));
    }, 1000);
  };
  
  return (
    <main className="h-screen flex relative">
      <section>
        <motion.aside
          id="sidebar"
          className={`w-60 bg-red-600 p-5 fixed z-10 h-full lg:relative ${
            sidebarVisible
              ? "lg:static lg:z-auto lg:w-auto overflow-y-auto max-h-screen"
              : "hidden"
          }`}
          initial={false}
          animate={{
            x: sidebarVisible ? 0 : -240,
            transition: { duration: 0.3, type: "tween" },
          }}
        >
          <style>
            {`
              #sidebar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <h2 className="text-2xl font-bold mt-16 mb-8">Categorías</h2>
          {category.map((item, index) => (
            <ButtonBasic
              key={index}
              text={item.nombreCategoria}
              icon={item.url_icono}
              color="bg-red-600"
              hovColor="hover:bg-zinc-800"
              textHover=""
              position="justifi-start"
              click={(e) => handleCategoryClick(item.id_categoria, e)}
            />
          ))}
        </motion.aside>
      </section>
      <section className="flex-1 p-5 overflow-y-auto space-y-4">
        <h1 className="text-white text-5xl font-semibold mt-14 mb-8 text-center">Menu</h1>
        <InputSearch change={handleSearchChange} />
        <div className="relative h-[71.5vh]" >
          <div id="scrollableDiv" className="overflow-y-auto h-full" style={{ scrollbarWidth: "none" }}>
            {noResult ? (
              <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
                <h3 className="text-3xl font-bold">No se encontraron platillos en esta categoría.</h3>
                <button onClick={handleResetClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Ver todos los platillos
                </button>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<CardMenuLoading/>}
                endMessage={
                  <p className="text-center mt-4">
                    <b>No hay más platillos para mostrar</b>
                    <button onClick={handleResetClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Ver todos los platillos
                    </button>
                  </p>
                }
                scrollableTarget="scrollableDiv"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {items.map((platillos, index) => (
                  <CardMenu
                    key={index}
                    id={platillos.id_relacion}
                    img={platillos.imagen_platillo}
                    title={platillos.nombre_platillo}
                    precio={platillos.precio}
                    etiqueta={platillos.estado}
                  />
                ))}
              </InfiniteScroll>
            )}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>
      <button
        className={`lg:hidden fixed top-5 left-5 z-20 ${sidebarVisible ? "hidden" : ""}`}
        onClick={toggleSidebar}
      >
        <Icon
          icon="iconamoon:menu-burger-horizontal-bold"
          className="text-2xl mt-24"
        />
      </button>
    </main>
  );
};

export default Menu