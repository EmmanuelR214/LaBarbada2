import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";

//paginas publicas
import { Home } from "../views/public/start/Home";
import { Login } from "../views/public/start/Login";
import { Register } from "../views/public/start/Register";
import  Recuperar  from "../views/public/start/Recuperar";
import { Prueba } from "../views/public/Prueba";
import Data from "../views/public/start/Data";
import UserProfile from "../views/public/UserProfile";
import Nosotros from "../views/public/Nosotros";
import TerminosCondiciones from "../views/public/TerminosCondiciones";
import TerminosCookies from "../views/public/TerminosCookies";


//Admin 
import Predictor from "../views/admin/predictor";

//Store
import Reservation from "../views/public/Reservation";
import Carrito from "../views/public//Carrito";
import Menu from "../views/public//Menu";

import ProtectedRoute from "./ProtectedRoute";


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
          }
        ]
      }
    ]
  }
])