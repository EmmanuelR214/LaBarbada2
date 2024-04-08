import { useState } from "react"
import { ButtonBasic } from "../components/Buttons"
import { InputBasic } from "../components/Inputs"
import { useForm } from "react-hook-form"

const Reservation = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const [section1, setSection1] = useState(false)
  const [section2, setSection2] = useState(false)
  const [horaSeleccionada, setHoraSeleccionada] = useState('')
  
  const handleHoraChange = (event) => {
    setHoraSeleccionada(event.target.value)
  }
  
  const opcionesHora = [];
  for (let hora = 10; hora < 22; hora++) {
    const horaFormateada = hora < 10 ? `0${hora}:00` : `${hora}:00`
    opcionesHora.push(<option key={hora} value={horaFormateada}>{horaFormateada}</option>);
  }
  
  
  
  const sect1 = handleSubmit(async()=>{
    try {
      setSection1(true)
    } catch (error) {
      console.log(error)
    }
  })
  
  return (
    <main>
      <div className="flex justify-center items-center h-auto md:h-[3rem]" >
        <h1 className="text-md lg:text-4xl md:text-start font-bold" >Reservaciones</h1>
      </div>
      <section className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto">
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center order-2 md:order-1">
          {section1 ? (
            section2 ? (
              <>
                <h1>Section 3</h1>
                <ButtonBasic text='Siguiente' click={()=>console.log('Hola')} />
                <ButtonBasic text='Regresar' click={()=>setSection2(false)} />
              </>) : (
                <>
                <h1>Section 2</h1>
                <form action="">
                <select className=" text-black" id="horaSeleccionada" value={horaSeleccionada} onChange={handleHoraChange}>
                  {opcionesHora}
                </select>
                </form>
                <ButtonBasic text='Siguiente' click={()=>setSection2(true)} />
                <ButtonBasic text='Regresar' click={()=>setSection1(false)} />
              </>)
          ) : (
          <>
          <h1>Section1</h1>
          <form onSubmit={sect1}>
            <InputBasic titulo='Nombre' nombre='nickname' tipo='text' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Apellido paterno' nombre='app' tipo='text' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Apellido Materno' nombre='apm' tipo='text' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <InputBasic titulo='Teléfono' nombre='tel' tipo='tel' minimo='3' maximo='20'  err={errors} method={register} val={setValue} look={watch} triger={trigger} />
            <ButtonBasic text='Siguiente' />
          </form>
          </>)}
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <img src="/img/vista3.jpg" alt="" className="w-full h-auto" />
        </div>
      </section>
    </main>
  )
}

export default Reservation