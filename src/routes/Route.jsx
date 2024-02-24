import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";

//paginas publicas
import { Home } from "../views/public/start/Home";
import { Login } from "../views/public/start/Login";
import { Register } from "../views/public/start/Register";
import { Recuperar } from "../views/public/start/Recuperar";
import { Prueba } from "../views/public/Prueba";
import UserProfile from "../views/public/interface/UserProfile";
//
import Reservation from "../views/public/interface/Reservation";
import Carrito from "../views/public/store/Carrito";
import Menu from "../views/public/store/Menu";

import ProtectedRoute from "./ProtectedRoute";
import Nosotros from "../views/public/interface/Nosotros";
import TerminosCondiciones from "../views/public/TerminosCondiciones";
import TerminosCookies from "../views/public/TerminosCookies";


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