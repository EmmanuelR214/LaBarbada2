import React from 'react'

function TerminosCookies() {
  return (
    <div className='bg-[#101010] text-zinc-300'>
      <br /><br />
    <div className="container mx-auto p-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">POLÍTICA DE COOKIES</h1>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Cookies necesarias</h3>
      <p>Session-id: Almacena un identificador único de sesión que te permite mantener tu sesión de usuario mientras navegas por nuestra plataforma, añades productos al carrito y realizas transacciones.
        <br /><br /> Esta Cookie es de sesión y expira cuando se cierra el navegador.
        <br /> AMP_TOKEN: Contiene un token que puede utilizarse para recuperar un ID de cliente del servicio de ID de cliente de AMP. Otros valores posibles indican la opt-out, la solicitud de entrada o un error al recuperar un ID de cliente del servicio de ID de cliente de AMP. (Análisis). Duración de 30 segundos a 1 año.
      </p>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Cookies de preferencias</h3>
      <p>Preferencias_temas: Se utiliza para recordar la elección del tema o la apariencia preferida seleccionada por el usuario en la aplicación de e-commerce (por ejemplo, modo claro u oscuro, diseño de la página, colores, etc.). 
        <br /><br /> La duración es de 6 meses.
        <br /> Preferencias_notificaciones: Su finalidad es permitir que el sitio web o la aplicación almacenen las preferencias de notificación del usuario, como recibir actualizaciones de productos o pedidos. Esta cookie tiene una duración de 3 meses desde su configuración.
      </p>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Cookies estadísticas</h3>
      <p>Analytics-tracking: Recopilan información de forma anónima sobre cómo los usuarios interactúan con el sitio web un ejemplo muy claro es para determinar cuales son los productos mas vistos. 
        <br /><br /> AMCVS: Sirve como bandera que indica que la sesión ha sido inicializada. Su valor es siempre 1 y se interrumpe cuando la sesión ha terminado. Es de sesión y expira cuando se cierra el navegador.
      </p>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Cookies de marketing</h3>
      <p>Marketing_personalizado: Esta cookie tiene una duración de 6 meses, su finalidad es recopilar datos sobre las actividades de navegación del usuario, como las páginas visitadas, los productos vistos, las búsquedas realizadas, etc.
        <br /><br /> Interes_usuarios: Su finalidad es registrar los intereses específicos de los usuarios, como categorías de productos favoritos, tendencias de compra, interacciones con contenido promocional, entre otros, para crear perfiles de interés y poder ofrecer anuncios personalizados. Esta cookie tiene una duración de 9 meses.
      </p>
    </div>
  </div>
    </div>
  )
}

export default TerminosCookies