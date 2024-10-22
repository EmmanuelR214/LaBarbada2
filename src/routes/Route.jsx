import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";

//paginas publicas
import { Home } from "../views/start/Home";
import { Login } from "../views/start/Login";
import { Register } from "../views/start/Register";
import  Recuperar  from "../views/start/Recuperar";
import { Prueba } from "../views/Prueba";
import Data from "../views/start/Data";
import UserProfile from "../views/UserProfile";
import Nosotros from "../views/Nosotros";
import TerminosCondiciones from "../views/TerminosCondiciones";
import TerminosCookies from "../views/TerminosCookies";


//Admin 
import Predictor from "../views/predictor";

//Store
import Reservation from "../views/Reservation";
import Carrito from "../views//Carrito";
import Menu from "../views//Menu";
import DescripcionPlatillo from "../views/DescripcionPlatillo";

import {ProtectedRoute} from "./ProtectedRoute";
import Finalizepurchase from "../views/payment";


export const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <NotFound/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/register-data',
        element: <Data/>
      },
      {
        path: '/recuperar',
        element: <Recuperar/>
      },
      {
        path: '/reservations',
        element: <Reservation/>
      },
      {
        path: '/menu',
        element: <Menu/>
      },
      {
        path: '/weare',
        element: <Nosotros/>
      },
      {
        path: '/TerminosCondiciones',
        element: <TerminosCondiciones/>
      },
      {
        path: '/TerminosCookies',
        element: <TerminosCookies/>
      },
      {
        path: '/platillo/:nombre_platillo',
        element: <DescripcionPlatillo/>
      },
      //*Estos no son
      {
        path: '/prueba',
        element: <Prueba/>
      },
      {
        path: '/predictor',
        element: <Predictor/>
      },
      {
        path:'/',
        element: <ProtectedRoute/>,
        children:[
          {
            index: true,
            element: <Home/>
          },
          {
            path:'/profile',
            element: <UserProfile/>
          },
          {
            path:'/shoppingcar',
            element: <Carrito/>
          },
          {
            path: '/payment',
            element: <Finalizepurchase/>
          }
        ]
      }
    ]
  }
])