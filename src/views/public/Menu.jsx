import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from "../../../routes/context/AuthContext"
import { Icon } from "@iconify/react";

const Menu = () => {
  //  const { getMenu, listMenu } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="w-30 h-screen p-10 bg-red-600">
        <h2 className="text-2xl  font-bold mt-16 mb-8 ">Categorías</h2>
        <ul>
          <li className="flex items-center mb-2">
            <Icon icon="ph:shrimp" className="mr-2 size-6" /> Camarones
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="tabler:fish" className="mr-2 size-6" /> Pescados
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="streamline:octopus" className="mr-2 size-6" /> Pulpos
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-24-filled" className="mr-2 size-6 " /> Pa
            empezar
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="mingcute:soup-pot-line" className="mr-2 size-6" /> Caldos
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="icon-park-outline:chili" className="mr-2 size-6" />{" "}
            Aguachiles y ceviches
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="streamline:cocktail" className="mr-2 size-6" /> Cocteles
          </li>
          <li className="flex items-center mb-2">
            <Icon
              icon="material-symbols:menu-book-outline"
              className="mr-2 size-6"
            />{" "}
            Pa picar
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="bxs:bowl-rice" className="mr-2 size-6" /> Guarniciones
          </li>
          <li className="flex items-center mb-2">
            <Icon
              icon="material-symbols:star-outline"
              className="mr-2 size-6"
            />{" "}
            Especialidades
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="mdi:grill" className="mr-2 size-6" /> Parrila
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="ph:knife" className="mr-2 size-6" /> Cortes
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="ph:hamburger" className="mr-2 size-6" /> Hamburguesas
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="cil:dinner" className="mr-2 size-6" /> Tostadas
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="fluent:food-fish-20-filled" className="mr-2 size-6" />{" "}
            Filetes
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="pepicons-pop:label-circle" className="mr-2 size-6" />{" "}
            Promociones
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="lucide:cup-soda" className="mr-2 size-6" />{" "}
            Bebidas
          </li>
        </ul>
      </div>

      <div className="w-70 p-4">
        <h1 className="font-bold text-4xl text-zinc-200 mt-20 mb-6 ">Menu</h1>

        <input
          type="text"
          className="p-2 rounded w-full text-black mt-4 mb-6"
          onChange={(e) => {
            console.log(e.target.value);
            //busquedaCategoria(e.target.value)
          }}
        />

        <div className="flex flex-wrap ">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/Login.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white text-lg">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/Login.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white text-lg">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/Login.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white text-lg">Camarones para pelar</p>
              <p className="text-orange-500 font-bold text-2xl ">$140</p>
              <button className=" hover:bg-orange-700 text-white font-bold  rounded-full focus:outline-none bg-orange-500 focus:shadow-outline">
                <Icon icon="ic:baseline-plus" className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-zinc-800">
            <img
              className="w-full h-36 object-cove rounded-xl"
              src="/img/Login.jpg"
              alt=""
            />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2"></div>
              <p className="text-white text-lg">Camarones para pelar</p>
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
