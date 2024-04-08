import React from 'react'
import { ButtonLink } from './Buttons'
import {useNavigate} from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='footer-distributed'>
      <div className='footer-left' >
        <p>
        <ButtonLink
              text="Terminos y condiciones"
              onClick={()=>{navigate('/TerminosCondiciones')}}
              color=""
              hoverColor=""
        /> 
        </p>
        <p>
        <ButtonLink
              text="Politicas de cookies"
              onClick={()=>{navigate('/TerminosCookies')}}
              color=""
              hoverColor=""
        />
        </p>
        <br />
        <br />
        <p className="footer-company-name">Copyright © 2023 <strong>La Barbada</strong> Derechos reservados</p>
      </div>
      <div className='footer-center'>
        <div>
          <i className="fa fa-phone"></i>
          <p>77-12-14-48-70</p>
        </div>
          <i className="fa fa-envelope"></i>
          <p><a href="">labarbada@gmail.com</a></p>
      </div>
      <div className='footer-right'>
        <p className='footer-company-about' >
          <span>Nosotros</span>
          <strong></strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quas accusantium perferendis quis, ex ipsa soluta, mollitia totam dicta, quisquam autem. Deleniti, ullam eius quisquam amet eligendi culpa voluptatem perspiciatis.
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus fuga laboriosam incidunt saepe perferendis reprehenderit nisi quasi, eligendi facere veniam corporis pariatur eveniet ullam? Quam amet aliquam vero autem necessitatibus..
        </p>
        <div className='footer-icons' >
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
  )
}

export default Footer