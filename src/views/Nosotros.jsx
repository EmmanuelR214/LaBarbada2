import { Icon } from "@iconify/react"

const Nosotros = () => {
  return (
    <main>
        <h1 className="text-white text-5xl font-semibold mt-20 mb-8 text-center" >Nosotros</h1>
      <section className="flex flex-col items-center justify-center bg-[#020303] md:flex-row md:h-auto">
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center order-1 md:order-2">
          <div className="w-full md:w-11/12 p-8 flex flex-col justify-center order-1 md:order-1">
            <h2 className="text-md lg:text-4xl text-center md:text-start font-bold">Misión</h2>
            <p className="text-[0.678rem] md:text-base mb-4">Reserva tu mesa ahora en La Barbada Restaurante y prepárate para una experiencia culinaria inolvidable.</p>
            <p className="text-[0.678rem] md:text-base mb-4"> ¡No pierdas la oportunidad de convertirte en un capitán de la buena comida!</p>
          </div>
          <div className="w-full md:w-11/12 p-8 flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-md lg:text-4xl text-center md:text-start font-bold">Manifiesto</h2>
            <p className="text-[0.678rem] md:text-base mb-4">Somos por excelencia el primer restaurant integral mar y tierra en la zona, especializado traer los mejores productos para nuestros comensales, somos desde hace 20 años la punta de lanza en el concepto restaurantero de Huejutla.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-2">
          <img src="/img/vista3.jpg" alt="" className="w-full h-auto" />
        </div>
      </section>
      <section className="flex flex-col bg-[#E20714] md:flex-row h-auto md:h-[36rem]">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1 md:order-2">
          <h2 className="text-md lg:text-4xl font-bold mb-4">¡Conocenos!</h2>
          <p className="flex items-center text-[0.678rem] md:text-base mb-4"><Icon icon='simple-icons:googlemaps' />Carretera Mexico-Pachuca km 13 S/N, Col. El Mirador, Huejutla de Reyes, Mexico</p>
          <p className="flex items-center text-[0.678rem] md:text-base mb-4"><Icon icon='material-symbols:mail-outline' />labarbada@hotmail.com</p>
          <p className="flex items-center text-[0.678rem] md:text-base mb-4"><Icon icon='ic:baseline-phone' /> 771 245 1795</p>
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-1 h-full" id="ubicacion">
          <iframe 
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6258.698732951854!2d-98.40868063393691!3d21.13470048617204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d7268f725bb3c3%3A0xa30bea3f0de5ccb2!2sLa%20Barbada!5e0!3m2!1ses-419!2smx!4v1710253997367!5m2!1ses-419!2smx" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  )
}

export default Nosotros