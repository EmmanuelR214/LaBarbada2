import { Link } from "react-router-dom";
import { TextLink } from "./Text";


function Footer() {
  return (
<footer className="pie-pagina mt-auto">
  <div className="grupo-1">
    <div className="box">
      <figure>
        <a href="#">
          <img src="/logo.svg" alt="Logo de la barbada" />
        </a>
      </figure>
    </div>
    <div className="box">
      <h2>CONTACTO</h2>
      <p>Dirección:</p>
      <p>Carretera México-Pachuca km 13 S/N, Col. El Mirador Huejutla de Reyes, México CP 43000</p>
      <p>Teléfono: 771 245 1795</p> 
      <p>Correo: labarbada@hotmail.com</p>
    </div>
    <div className="box">
      <h2>SÍGUENOS</h2>
      <div className="red-social">
        <a href="https://www.facebook.com/labarbada" className="fa fa-facebook"></a>
        <a href="https://www.instagram.com/labarbadahuejutla/" className="fa fa-instagram"></a>
        <a href="https://api.whatsapp.com/send?phone=7712451795" className="fa fa-whatsapp"></a>
      </div>
      <h3>Horarios de atención</h3>
      <p>Todos los días de 10am a 10pm</p>
      <TextLink to='/terminos-condiciones' linkText='Terminos y condiciones' textColor="" hoverColor="hover:text-red-500" />
      <TextLink to='/politicas-de-privacidad' linkText='Aviso de privacidad' textColor="" hoverColor="hover:text-red-500" />
      <TextLink to='/terminos-Cookies' linkText='Términos de Cookies' textColor="" hoverColor="hover:text-red-500" />
    </div>
  </div>
  <div className="grupo-2">
    <small>&copy; 2024 <b>La Barbada</b> - Todos los Derechos Reservados.</small>
  </div>
</footer>

  )
}

export default Footer
