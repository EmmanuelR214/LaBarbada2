import React, { useState } from "react";

export const Tab = () => {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState(0);

  // Función para cambiar la pestaña activa
  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <div>
        <button
          className={activeTab === 0 ? "active-tab mr-4" : "tab mr-4"}
          onClick={() => changeTab(0)}
        >
          Descripcion
        </button>
        <button
          className={activeTab === 1 ? "active-tab mr-4" : "tab mr-4"}
          onClick={() => changeTab(1)}
        >
          Se incluye
        </button>
      </div>

      <div className="bg-zinc-800 rounded-xl h-28 relative">
        {/* Barra que cambia de color */}
        <div className="h-2 bg-gray-200 absolute w-full">
          <div
            className={`h-full ${
              activeTab === 0 ? "bg-red-500" : "bg-gray-200"
            }`}
            style={{ width: `${(activeTab === 0 ? 50 : 0)}%` }} // Cambia el ancho de la barra roja según la pestaña activa
          ></div>
        </div>
        {activeTab === 0 && (
          <div>
            Camarones rellenos de jaiba y queso, envueltos en tocino, bañados en
            crema de champiñon y salsa agridulce
          </div>
        )}
        {activeTab === 1 && <div>Ingredientes</div>}
      </div>
    </div>
  );
};



export const Select = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleOptionChange}
      className="block w-full px-4 py-2 mt-2 text-black bg-white border-2 border-red-600 rounded-md shadow-sm focus:outline-none  sm:text-sm"
    >
      {placeholder && (
        <option value="" disabled hidden className="text-gray-400">
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;



