import { useState, useEffect} from 'react'
//Recursos
import 'react-toastify/dist/ReactToastify.css'
import { ButtonHome } from "../../components/Buttons"

export const Home = () => {
  const [image, setImage] = useState('')
  const [text, setText] = useState('')
  
  const getRandomImage = () => {
    const images = ['/img/fondo1.jpg', '/img/fondo2.jpg', '/img/fondo3.jpg', '/img/fondo4.jpg']
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }
  
  const getRandomText = () => {
    const texts = ['CAMARONES AL MOJO DE AJO', 'DEL MAR A LA PARRILLA SABORES UNICOS', 'BOCADOS QUE TE HACEN VOLVER POR MÁS', 'TU PRÓXIMO DESTINO CULINARIO ESTÁ AQUÍ']
    const randomIndex = Math.floor(Math.random() * texts.length)
    return texts[randomIndex]
  }
  
  useEffect(() => {
    const randomImage = getRandomImage()
    const randomText = getRandomText()
    setImage(randomImage)
    setText(randomText)
  }, [])
  
  return (
    <main>
      <section className="relative w-full h-screen" >
        <img src={image} alt="imagen home" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-gray-900" >
          <h1 className="lg:w-2/5 md:w-3/4 text-center text-4xl lg:text-6xl  text-white font-bold mb-4 italic sombra-letras" >{text}</h1>
          <ButtonHome icon='mdi:delivery-dining' text='PIDELOS A DOMICILIO' to='/menu' />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto">
        <div className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1">
          <h2 className="text-md lg:text-4xl font-bold mb-4">Mariscos, cortes y enchiladas huastecas en La Barbada Restaurante</h2>
          <p className="text-[0.678rem] md:text-base mb-4">Donde se sirven los mariscos más frescos, los cortes de carne más tiernos y el bar más abastecido.</p>
          <p className="text-[0.678rem] md:text-base mb-4">¡Vengan a hacerse piratas de la buena comida!</p>
          <ButtonHome icon='material-symbols:restaurant-menu' text='EXPLORAR MENÚ' to='/menu' />
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-2">
          <img src="/img/vista1.jpg" alt="" className="w-full h-auto" />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto">
        <div className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-2">
          <h2 className="text-md lg:text-4xl font-bold mb-4">Reservaciones en linea</h2>
          <p className="text-[0.678rem] md:text-base mb-4">Reserva tu mesa ahora en La Barbada Restaurante y prepárate para una experiencia culinaria inolvidable.</p>
          <p className="text-[0.678rem] md:text-base mb-4"> ¡No pierdas la oportunidad de convertirte en un capitán de la buena comida!</p>
          <ButtonHome icon='ion:calendar-number' text='RESERVA AHORA' to='/reservations' />
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <img src="/img/vista2.jpg" alt="" className="w-full h-auto" />
        </div>
      </section>
      <section className="flex flex-col bg-[#E20714] md:flex-row justify-center items-center min-h-[63vh] w-full px-4 md:px-0">
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
          <h2 className="font-bold">UBICACIÓN</h2>
          <img src="/img/timon.svg" alt="" className=" w-56 h-56" />
          <p className="text-center">Estamos ubicados en Huejutla de Reyes, Hidalgo, Carretera México - Pachuca KM 214, a 100 metros de la clínica ISSSTE.</p>
          <ButtonHome icon='simple-icons:googlemaps' text='VER MAPA' to='/weare#ubicacion' />
        </div>
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center lg:border-l lg:border-r border-black">
          <h2 className="font-bold">EQUIPO</h2>
          <img src="/img/pulpo.svg" alt="" className="w-56 h-56" />
          <p className="text-center">En La Barbada queremos ofrecerte la mejor experiencia, en un lugar cómodo, platillos exquisitos, y una atención digna de un capitán. Por ello, el staff de La Barbada colabora para brindarte una experiencia para recordar.</p>
          <ButtonHome icon='' text='CONOCENOS' />
        </div>
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
          <h2 className="font-bold">HISTORIA</h2>
          <img src="/img/barco.svg" alt="" className="w-56 h-56" />
          <p className="text-center">20 años de un exquisito viaje, cuando todo comenzó como un pequeño botanero familiar, hoy tenemos el gusto de celebrar contigo la rica cocina que hemos perfeccionado a través de los años.</p>
          <ButtonHome icon='' text='LEER MÁS...' />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto">
        <div className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1">
          <h2 className="text-md lg:text-4xl font-bold mb-4">Instalaciones</h2>
          <p className="text-[0.678rem] md:text-base mb-4">Ponemos a tus ordenes un área climatizada, con capacidad de 100 personas, terraza con un paisaje fotografico, y un salón con capacidad de 300 personas.</p>
          <p className="text-[0.678rem] md:text-base mb-4">¡Dale un vistazo al tour digital de las instalaciones!</p>
          <ButtonHome icon='fluent-mdl2:video-360-generic' text='VER 360' />
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-2">
          <img src="/img/vista1.jpg" alt="" className="w-full h-auto" />
        </div>
      </section>
    </main>
  )
}
