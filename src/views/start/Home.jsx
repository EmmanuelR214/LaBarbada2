import { useState, useEffect, useRef} from 'react'
//Recursos
import 'react-toastify/dist/ReactToastify.css'
import { ButtonHome } from "../../components/Buttons"
import { useAuth } from '../../routes/context/AuthContext'
import { motion, useInView } from "framer-motion";
import { RegisterNumModal } from '../../components/Modal';
import { PwaNotice } from '../../components/Cards';

const Home = () => {
  const { publicidad, user } = useAuth();
  const [currentPublicidad, setCurrentPublicidad] = useState({ imagen: '', posicion: '' });
  const [opacity, setOpacity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const refSection1 = useRef(null);
  const isInViewSection1 = useInView(refSection1, { triggerOnce: false });  // Ahora se dispara cada vez
  const refSection2 = useRef(null);
  const isInViewSection2 = useInView(refSection2, { triggerOnce: false });
  const refSection3 = useRef(null);
  const isInViewSection3 = useInView(refSection3, { triggerOnce: false });
  const refSection4 = useRef(null);
  const isInViewSection4 = useInView(refSection4, { triggerOnce: false });
  
  const prevTelefonoRef = useRef(null) 
  
  
  useEffect(() => {
    if(user && !user.telefono) {
      if(prevTelefonoRef.current !== user.telefono) {
        setShowModal(true)
      }
    }
    prevTelefonoRef.current = user ? user.telefono : null;
  },[user])
  
  useEffect(() => {
    if (publicidad.length > 0) {
      const updatePublicidad = () => {
        const randomIndex = Math.floor(Math.random() * publicidad.length);
        setCurrentPublicidad(publicidad[randomIndex]);
        setOpacity(0);
        setTimeout(() => setOpacity(1), 100);
      };
      updatePublicidad();
      const intervalId = setInterval(updatePublicidad, 10000);
      return () => clearInterval(intervalId);
    }
  }, [publicidad]);
  
  return (
    <main>
      <PwaNotice/>
      
      <section className="relative w-full h-screen">
        <motion.img
          key={currentPublicidad.imagen} 
          src={`https://labarbada.store/img/${currentPublicidad.imagen}`}
          alt="imagen home"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }} 
          transition={{ duration: 1 }} 
          loading="lazy"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-gray-900">
          <motion.h1
            className="lg:w-2/5 md:w-3/4 text-center text-4xl lg:text-6xl text-white font-bold mb-4 italic sombra-letras"
            key={currentPublicidad.posicion}
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            {currentPublicidad.posicion}
          </motion.h1>
          <ButtonHome icon="mdi:delivery-dining" text="PIDELOS A DOMICILIO" to="/menu" />
        </div>
      </section>
      
      <motion.section
        ref={refSection1}
        className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto"
        initial={{ opacity: 0, y: 50 }} // Desplazado hacia abajo
        animate={isInViewSection1 ? { opacity: 1, y: 0 } : {opacity: 0, y: 50 }} // Animar cuando sea visible
        transition={{ duration: 0.8, ease: 'easeOut' }} // Reducido el tiempo
      >
        <motion.div
          className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1"
          initial={{ opacity: 0, x: -100 }} // Desplazado hacia la izquierda
          animate={isInViewSection1 ? { opacity: 1, x: 0 } : {opacity: 0, x: -100 }} // Animar cuando sea visible
          transition={{ duration: 0.8, delay: 0.2 }} // Reducido el tiempo
        >
          <h2 className="text-md lg:text-4xl font-bold mb-4">Mariscos, cortes y enchiladas huastecas en La Barbada Restaurante</h2>
          <p className="text-[0.678rem] md:text-base mb-4">Donde se sirven los mariscos más frescos, los cortes de carne más tiernos y el bar más abastecido.</p>
          <p className="text-[0.678rem] md:text-base mb-4">¡Vengan a hacerse piratas de la buena comida!</p>
          <ButtonHome icon="material-symbols:restaurant-menu" text="EXPLORAR MENÚ" to="/menu" />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 order-2 md:order-2"
          initial={{ opacity: 0, x: 100 }} // Desplazado hacia la derecha
          animate={isInViewSection1 ? { opacity: 1, x: 0 } : {opacity: 0, x: 100 }} // Animar cuando sea visible
          transition={{ duration: 0.8, delay: 0.2 }} // Reducido el tiempo
        >
          <img src="/img/vista1.jpg" alt="" className="w-full h-auto" loading="lazy" />
        </motion.div>
      </motion.section>
      
      <motion.section
        ref={refSection2}
        className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto"
        initial={{ opacity: 0, y: 50 }} // Desplazado hacia abajo
        animate={isInViewSection2 ? { opacity: 1, y: 0 } : {opacity: 0, y: 50 }} // Animar cuando sea visible
        transition={{ duration: 0.8, ease: 'easeOut' }} // Reducido el tiempo
      >
        <motion.div
          className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-2"
          initial={{ opacity: 0, x: 100 }} // Desplazado desde la derecha
          animate={isInViewSection2 ? { opacity: 1, x: 0 } : {opacity: 0, x: -100 }} // Animar cuando sea visible
          transition={{ duration: 0.8, delay: 0.2 }} // Reducido el tiempo
        >
          <h2 className="text-md lg:text-4xl font-bold mb-4">Reservaciones en linea</h2>
          <p className="text-[0.678rem] md:text-base mb-4">Reserva tu mesa ahora en La Barbada Restaurante y prepárate para una experiencia culinaria inolvidable.</p>
          <p className="text-[0.678rem] md:text-base mb-4">¡No pierdas la oportunidad de convertirte en un capitán de la buena comida! hola mundo</p>
          <ButtonHome icon="ion:calendar-number" text="RESERVA AHORA" to="https://api.whatsapp.com/send?phone=7712451795" />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 order-2 md:order-1"
          initial={{ opacity: 0, x: -100 }} // Desplazado desde la izquierda
          animate={isInViewSection2 ? { opacity: 1, x: 0 } : {opacity: 0, x: 100 }} // Animar cuando sea visible
          transition={{ duration: 0.8, delay: 0.2 }} // Reducido el tiempo
        >
          <img src="/img/vista2.jpg" alt="Vista reservaciones" className="w-full h-auto" loading="lazy" />
        </motion.div>
      </motion.section>
      
      <motion.section
        ref={refSection3}
        className="flex flex-col bg-[#E20714] md:flex-row justify-center items-center min-h-[63vh] w-full px-4 md:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={isInViewSection3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Vuelve a los valores iniciales si no está en la vista
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Ubicación */}
        <motion.div
          className="w-full md:w-1/3 p-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }} // Animación de desplazamiento desde abajo
          animate={isInViewSection3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animar al entrar y al salir de vista
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} // Con pequeño delay
        >
          <h2 className="font-bold"> UBICACIÓN</h2>
          <img src="/img/timon.svg" alt="" className=" w-56 h-56" loading="lazy" />
          <p className="text-center">
            Estamos ubicados en Huejutla de Reyes, Hidalgo, Carretera México - Pachuca KM 214, a 100 metros de la clínica ISSSTE.
          </p>
          <ButtonHome icon="simple-icons:googlemaps" text="VER MAPA" to="/nosotros#ubicacion" />
        </motion.div>

        {/* Equipo */}
        <motion.div
          className="w-full md:w-1/3 p-4 flex flex-col items-center lg:border-l lg:border-r border-black"
          initial={{ opacity: 0, y: 50 }} // Desplazamiento desde abajo
          animate={isInViewSection3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Desaparece cuando sale de vista
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} // Con pequeño delay
        >
          <h2 className="font-bold">EQUIPO</h2>
          <img src="/img/pulpo.png" alt="" className="w-56 h-56" loading="lazy" />
          <p className="text-center">
            En La Barbada queremos ofrecerte la mejor experiencia, en un lugar cómodo, platillos exquisitos, y una atención digna de un capitán.
          </p>
          <ButtonHome icon="" text="CONOCENOS" to="/nosotros" />
        </motion.div>

        {/* Historia */}
        <motion.div
          className="w-full md:w-1/3 p-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }} // Desplazamiento desde abajo
          animate={isInViewSection3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Aparece al entrar en vista, desaparece al salir
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} // Con pequeño delay
        >
          <h2 className="font-bold">HISTORIA</h2>
          <img src="/img/barco.png" alt="" className="w-56 h-56" loading="lazy" />
          <p className="text-center">
            20 años de un exquisito viaje, cuando todo comenzó como un pequeño botanero familiar, hoy tenemos el gusto de celebrar contigo la rica cocina que hemos perfeccionado a través de los años.
          </p>
          <ButtonHome icon="" text="LEER MÁS..." to="/nosotros" />
        </motion.div>
      </motion.section>
      
      <motion.section
        ref={refSection4}
        className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto"
        initial={{ opacity: 0, y: 50 }} // Inicia fuera de la vista con opacidad 0
        animate={isInViewSection4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Regresa al estado inicial cuando sale de vista
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="w-full md:w-1/2 p-8 flex flex-col text-center justify-center items-center order-1 md:order-1"
          initial={{ opacity: 0, x: -100 }} // Texto entra desde la izquierda
          animate={isInViewSection4 ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Regresa a su estado original al salir de vista
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} // Animación rápida
        >
          <h2 className="text-md lg:text-4xl font-bold mb-4">Instalaciones</h2>
          <p className="text-[0.678rem] md:text-base mb-4">
            Ponemos a tus ordenes un área climatizada, con capacidad de 100 personas, terraza con un paisaje fotográfico, y un salón con capacidad de 300 personas.
          </p>
          <p className="text-[0.678rem] md:text-base mb-4">
            ¡Dale un vistazo al tour digital de las instalaciones!
          </p>
          <ButtonHome icon="fluent-mdl2:video-360-generic" text="VER 360" />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 order-2 md:order-2"
          initial={{ opacity: 0, x: 100 }} // Imagen entra desde la derecha
          animate={isInViewSection4 ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Regresa a su estado original al salir de vista
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} // Mismo delay para sincronizar con el texto
        >
          <img src="/img/vista1.jpg" alt="Vista de las instalaciones" className="w-full h-auto" loading="lazy" />
        </motion.div>
      </motion.section>
      
      
      {showModal && <RegisterNumModal isOpen={showModal} onClose={setShowModal}/>}
      
    </main>
  )
}

export default Home