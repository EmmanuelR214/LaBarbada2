import React, { useState } from "react";
import { CustomSelect, CustomSelectPlus } from "../../components/CompMenu";
import { ButtonIcon, ButtonCount,ButtonBasic } from "../../components/Buttons";
const DetalleP = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const [selectedOptionTam, setSelectedOptionTam] = useState("");

  const handleChangeTam = (option) => {
    setSelectedOptionTam(option);
  };

  const opcionesTam = [
    { value: "opcion1", label: "Grande" },
    { value: "opcion2", label: "Chico" },
  ];

  const opcionesTipo = [
    { value: "opcion1", label: "Con cascara" },
    { value: "opcion2", label: "Sin cascara" },
  ];

  const [selectedOptionExtra, setSelectedOptionExtra] = useState("");

  const handleChangeExtra = (option) => {
    setSelectedOptionExtra(option);
  };

  const opcionesExtra = [
    { value: "opcion1", label: "Frijoles charros", extraText: "+$34" },
    { value: "opcion2", label: "Papas a la francesa", extraText: "+$64" },
    { value: "opcion3", label: "Salsa tartara", extraText: "+$39" },
    { value: "opcion4", label: "Guacamole", extraText: "+$67" },
    { value: "opcion5", label: "Papa al horno", extraText: "+$29" },
    { value: "opcion6", label: "Tortillas", extraText: "+$23" },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex pl-16 pr-8 col-auto items-center justify-center ">
        <div className="bg-zinc-800 p-8 items-center flex rounded-xl h-[70%] mt-20">
          <img
            src="/img/camarones.jpg"
            className="rounded-xl w-full h-full  "
            alt="Producto"
          />
        </div>
      </div>
      <div className="w-3/2">
        {/**justify-center */}
        <h1 className="text-5xl mt-20 flex font-bold ">Detalle del producto</h1>

        <div className="mb-4">
          <div className="inline-block text-2xl font-bold mt-8">
            Camarones para pelar -
          </div>
          <div className="inline-block text-2xl text-red-600 font-bold pl-2">
            $140
          </div>
        </div>

        <h1>Descripción</h1>

        <div className="w-2/3 h-0.5 bg-white mb-4 mt-2"></div>

        <div className="bg-zinc-800 rounded-xl w-5/6">
          <p className="p-4 ">
            Camarones rellenos de jaiba y queso, envueltos en tocino, bañados en
            crema de champiñon y salsa agridulce
          </p>
        </div>

        <div className="flex space-x-28 w-2/3 pt-3">
          <div className="w-full">
            <h1 className="my-2">Tamaño</h1>
            <CustomSelect
              options={opcionesTam}
              placeholder="Tamaño"
              onChange={handleChangeTam}
              value={selectedOptionTam}
            />
          </div>

          <div className="w-full">
            <h1 className="my-2">Tipo</h1>
            <CustomSelect
              options={opcionesTipo}
              placeholder="Tipo"
              onChange={handleChange}
              value={selectedOption}
            />
          </div>
        </div>

        <div className="w-full my-8">
          <h1 className="font-medium">Acompañalo con</h1>
          <CustomSelectPlus
            options={opcionesExtra}
            placeholder="Selecciona alguna opcion"
            onChange={handleChangeExtra}
            value={selectedOptionExtra}
          />
        </div>

        <div className="my-2 flex space-x-28 items-center">
          <h1>Cantidad</h1>
          <ButtonCount />
        </div>

        <div className="flex space-x-28 w-2/3 pt-6">
          <div className="w-full font-semibold">
            <ButtonIcon icon="mdi:bell" color="red-600" name="Ordenar ahora" />
          </div>

          <div className="w-full  font-semibold">
            <ButtonIcon
              icon="ic:round-shopping-cart"
              color="yellow-400"
              name="Agregar carrito"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DetalleP;
