import React, { useState } from "react";
import { CustomSelect2, CustomSelectPlus } from "../../components/CompMenu";
import { ButtonIcon, ButtonCount, ButtonBasic } from "../../components/Buttons";

function FinalizarCompra() {
  const [selectedOptionDir, setSelectedOptionDir] = useState("");

  const handleChangeDir = (option) => {
    setSelectedOptionDir(option);
  };

  const [selectedOptionPago, setSelectedOptionPago] = useState("");

  const handleChangePago= (option) => {
    setSelectedOptionPago(option);
  };

  const opcionesPago = [
    { value: "opcion1", label: "huejutla, los cantores, rosario, casa azul, casa" },
    { value: "opcion2", label: "huejutla, los frailes, tres caminos,edificio de dos pisos, oficina" },
  ];
//{ value: "opcion1", label: "Visa terminación 0206" },
  const opcionesDir = [
    { value: "opcion1", label: "Visa terminación 0206" },
    { value: "opcion1", label: "Visa terminación 0109" },
    { value: "opcion1", label: "Visa terminación 0109" },
  ];

  const [selectedOptionResumen, setSelectedOptionResumen] = useState("");

  const handleChangeResumen = (option) => {
    setSelectedOptionResumen(option);
  };

  const opcionesResumen = [
    { value: "opcion1", label: "Frijoles charros (x1)" },
    { value: "opcion2", label: "Papas a la francesa (x1)" },
    { value: "opcion3", label: "Salsa tartara (x1)" },
    { value: "opcion4", label: "Guacamole (x1)" },
    { value: "opcion5", label: "Papa al horno (x1)"},
  ];

  return (
    <div className="flex h-screen">
      <div className="w-2/3 items-center m-10 ">
        {/**justify-center */}
        <h1 className="text-5xl mt-20 flex font-bold justify-center ">
          Finalizar Compra
        </h1>

        <div className="pt-3 ">
          <div className="w-full">
            <h1 className="my-2 font-semibold">Dirección</h1>
            <CustomSelect2
              options={opcionesPago}
              placeholder="Ciudad,colonia, calle, descripcion, tipo"
              onChange={handleChangePago}
              value={selectedOptionPago}
            />
          </div>

          <p className="my-4 font-semibold"> Metodo de pago </p>
          <div className="flex my-4 space-x-10">
            <label>
              <input type="radio" name="paymentMethod" />
              Tarjeta
            </label>
            <br />
            <label>
              <input type="radio" name="paymentMethod" />
              Efectivo
            </label>
          </div>
          <div className="w-full my-4">
            <CustomSelect2
              options={opcionesDir}
              placeholder="Visa terminación 0206"
              onChange={handleChangeDir}
              value={selectedOptionDir}
            />
          </div>

          <div className="w-full">
            <h1 className="my-2 font-semibold">Resumen de compra</h1>
            <CustomSelect2
              options={opcionesResumen}
              placeholder="Camarones para pelar (x2)"
              onChange={handleChangeResumen}
              value={selectedOptionResumen}
            />
          </div>
        </div>
      </div>

      <div className="w-1/3 flex col-auto items-center justify-center  ">
        <div className="bg-zinc-800 p-8 items-center rounded-xl  mt-20 mx-6">
          <h1 className="font-bold text-2xl">Detalles</h1>
          <p className="my-8">
            El Lorem Ipsum fue concebido como un texto de relleno, formateado de
            una cierta manera para permitir la presentación de elementos
            gráficos en documentos, sin necesidad de una copia formal.
          </p>
          <div className="flex space-x-16 mb-10">
            <p className=" font-semibold text-xl">Total a pagar</p>
            <p className="text-orange-500 font-semibold text-xl">$1400</p>
          </div>
          <ButtonBasic text="Confirmar pago" width="w-full" />
        </div>
      </div>
    </div>
  );
}

export default FinalizarCompra;
