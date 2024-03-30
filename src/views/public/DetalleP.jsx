// import React from "react";
import React, { useState } from "react";
import { Tab, Select } from "../../components/CompMenu";

const DetalleP = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex h-screen">
      <div className=" p-6 w-1/2 flex col-auto items-center justify-center ">
        <div className="bg-zinc-800 p-8 rounded-2xl items-center flex">
          <img src="/img/Login.jpg" className="rounded-2xl w-[540px]" />
        </div>
      </div>
      <div className="bg-gray-500 w-1/2">
        <h1 className="text-3xl mt-24 flex font-bold justify-center">
          Detalle del producto
        </h1>
        <div>
          <div className="inline-block text-2xl font-bold">
            Camarones para pelar
          </div>
          <div className="inline-block text-2xl text-red-600 font-bold pl-2">
            $140
          </div>
        </div>

        <Tab></Tab>

        <div className="p-4">
        <Select 
        options={['Grande', 'Chico']}
        onChange={handleChange}
        placeholder = "Tamaño" 
        />
          <p className="mt-4">Selected Value: {selectedValue}</p>
        </div>

      </div>
    </div>
  );
};

export default DetalleP;
