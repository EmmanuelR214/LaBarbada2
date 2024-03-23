import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from "../../../routes/context/AuthContext"
import { Icon } from "@iconify/react";

const Menu = () => {
  //  const { getMenu, listMenu } = useAuth();
  const navigate = useNavigate();

  /*  useEffect(() => {
    getMenu();
  }, []);
  */
  /*const busquedaCategoria = (categoria) =>{
    getMenu(categoria)
  }*/

  /*const verProducto = (item) =>{
    navigate(`/descripcion-platillo/${item.id}`, {state:{item}})
  }*/

  return (
    <div className="flex">
      <div className="w-30 h-screen p-10 bg-red-600">
        <h2 className="text-2xl  font-bold mt-16 mb-8 ">Categorías</h2>
        <ul>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Camarones
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Pescados
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Pulpos
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Pa empezar
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Caldos
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Aguachiles y
            ceviches
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Cocteles
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Pa picar
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Guarniciones
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" />{" "}
            Especialidades
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Panila
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Cortes
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Hamburguesas
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Tostadas
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Filetes
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2" /> Promociones
          </li>
        </ul>
      </div>
      {/*<input
          type="text"
          className="p-2 rounded w-full text-black mt-4"
          onChange={(e) => {
            console.log(e.target.value);
            //busquedaCategoria(e.target.value)
          }}
        />*/}
      <div className="w-70 p-4">
        <h1 className="font-bold text-4xl text-zinc-200 mt-20 mb-8">Menu</h1>

        <div className="flex flex-wrap ">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/vista1.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/vista1.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/vista1.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/vista1.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;