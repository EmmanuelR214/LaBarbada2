import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Predictor() {
  const [data, setdata] = useState({
    platillo: '',
    primeraVenta: 0,
    ventaTiempo1: 0,
    segundaVenta: 0,
    ventaTiempo2: 0,
    tiempoDiferencial: 0
  });
  const [platilloPronostico, setplatilloPronostico] = useState(0)
  
  const pronosticoPlatillo = (e) => {
    let c, k, p
    e.preventDefault()
    console.log(data.ventaTiempo1, data.primeraVenta)
    console.log(data.ventaTiempo2, data.segundaVenta)
    console.log(data.tiempoDiferencial)
    
    c = Math.exp(data.ventaTiempo1) * data.primeraVenta
    k = Math.log(data.ventaTiempo2 / ((c < 0 || c>0) ? c : 1)) / data.segundaVenta
    p = ((c != 0) ? c : 1) * Math.exp(k * data.tiempoDiferencial)
    const sinDecimal = Math.trunc(p)
    setplatilloPronostico(p)
    // if(p >= 1){
    //   toast.success(`Prediccion de venta: ${sinDecimal}`)
    // }else{
    //   toast.warning(`Cuidado perdida potencial: ${p}`)
    // }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold text-center my-5">Prototipo</h1>
        <form className="w-full max-w-lg mx-auto" onSubmit={pronosticoPlatillo}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="platillo">
                Platillo:
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="platillo" onChange={handleChange} />
            </div>
          </div>
          <h1 className=" text-base font-bold my-5" >Condicion inical</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="ventaTiempo2">
                Platillos vendidos:
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"  name="primeraVenta" onChange={handleChange} />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="segundaVenta">
                Tiempo en que se vendieron (meses)
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"  name="ventaTiempo1" onChange={handleChange} />
            </div>
          </div>
          <h1 className=" text-base font-bold my-5" >Proximo venta (segundos datos)</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="ventaTiempo2">
                Platillos vendidos:
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"  name="ventaTiempo2" value={data.ventaTiempo2} onChange={handleChange} />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="segundaVenta">
                Tiempo en que se vendieron (meses):
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"  name="segundaVenta" value={data.segundaVenta} onChange={handleChange} />
            </div>
          </div>
          <h1 className=" text-base font-bold my-5" >Pronostico de venta</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
          <div className=" flex justify-center items-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <h1 className=' font-bold' >{platilloPronostico ? <>{platilloPronostico}</> : <>?</>}</h1>
          </div>            
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="ventaTiempo2">
                Meses a predecir 
              </label>
              <input className="appearance-none text-black  block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"  name="tiempoDiferencial" onChange={handleChange} />
            </div>
          </div>
          <div className="w-full px-3">
              <input type="submit" value="Productos a vender" className=' w-full h-12 bg-blue-500 mt-6 rounded-md hover:bg-blue-900 hover:scale-105 transition-all font-bold' />
            </div>
        </form>
      </div>
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold my-5">Tabla</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Datos</th>
              <th className="px-4 py-2">Platillos Vendidos</th>
              <th className="px-4 py-2">Tiempo en que se vendieron</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">ci</td>
              <td className="border px-4 py-2">{data.primeraVenta} ventas</td>
              <td className="border px-4 py-2">{data.ventaTiempo1} meses</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">k</td>
              <td className="border px-4 py-2">{data.ventaTiempo2} ventas</td>
              <td className="border px-4 py-2">{data.segundaVenta} meses</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">p1</td>
              <td className="border px-4 py-2">{platilloPronostico} ventas</td>
              <td className="border px-4 py-2">{data.tiempoDiferencial} meses</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Predictor
