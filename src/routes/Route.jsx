import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./Layout";
import NotFound from "./NotFound";
import Loader from "../components/Loader";
import ProtectedRoute from "./ProtectedRoute";
// import UserProfile from "../views/UserProfile";
// import Register from "../views/start/Register";
// import Menu from "../views/Menu";
// import Nosotros from "../views/Nosotros";
// import RegisterNum from "../views/start/RegisterNum";
// import Carrito from "../views/Carrito";
// import Recuperar from "../views/start/Recuperar";
// import DescripcionPlatillo from "../views/DescripcionPlatillo";
// import Payment from "../views/payment";
// import TerminosCondiciones from "../views/TerminosCondiciones";
// import TerminosCookies from "../views/TerminosCookies";

const Home = lazy(() => import("../views/start/Home"))
const UserProfileView = lazy(() => import("../views/UserProfile"))
const Login = lazy(() => import("../views/start/Login"))
const RegisterView = lazy(() => import("../views/start/Register"))
const Menu = lazy(() => import("../views/Menu"))
const NosotrosView = lazy(() => import("../views/Nosotros"))
const RegistroNum = lazy(() => import("../views/start/RegisterNum"))
const CarritoView = lazy(() => import("../views/Carrito"))
const RecuperarView = lazy(() => import("../views/start/Recuperar"))
const DescripcionPlatillo = lazy(() => import("../views/DescripcionPlatillo"))
const PaymentView = lazy(() => import("../views/payment"))
const SuccesPay = lazy(()=> import('../views/success'))
const TerminosCondicionesView = lazy(() => import("../views/TerminosCondiciones"))
const TerminosCookiesView = lazy(() => import("../views/TerminosCookies"))
const PoliticasPrivacidad = lazy(() => import('../views/politicasPrivacidad'))



export const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader/>} >
            <Home/>
          </Suspense>
        )
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader/>} >
            <Login/>
          </Suspense>
        )
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loader/>} >
            <RegisterView/>
          </Suspense>
        )
      },
      {
        path: '/register-data',
        element: (
          <Suspense fallback={<Loader/>} >
            <RegistroNum/>
          </Suspense>
        )
      },
      {
        path: '/recuperar',
        element: (
          <Suspense fallback={<Loader/>} >
            <RecuperarView/>
          </Suspense>
        )
      },
      {
        path: '/menu',
        element: (
          <Suspense fallback={<Loader/>} >
            <Menu/>
          </Suspense>
        )
      },
      {
        path: '/nosotros',
        element: (
          <Suspense fallback={<Loader/>} >
            <NosotrosView/>
          </Suspense>
        )
      },
      {
        path:'/platillo/:nombre_platillo',
        element: (
          <Suspense fallback={<Loader/>} >
            <DescripcionPlatillo/>
          </Suspense>
        )
      },
      {
        path: '/terminos-condiciones',
        element: (
          <Suspense fallback={<Loader/>} >
            <TerminosCondicionesView/>
          </Suspense>
        )
      },
      {
        path: '/terminos-Cookies',
        element: (
          <Suspense fallback={<Loader/>} >
            <TerminosCookiesView/>
          </Suspense>
        )
      },
      {
        path: '/politicas-de-privacidad',
        element: (
          <Suspense fallback={<Loader/>} >
            <PoliticasPrivacidad/>
          </Suspense>
        )
      },
      {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
          {
            path: '/profile',
            element: (
              <Suspense fallback={<Loader/>} >
                <UserProfileView/>
              </Suspense>
            )
          },
          {
            path: '/shoppingcar',
            element: (
              <Suspense fallback={<Loader/>} >
                <CarritoView/>
              </Suspense>
            )
          },
          {
            path: '/payment',
            element:(
              <Suspense fallback={<Loader/>} >
                <PaymentView/>
              </Suspense>
            )
          },
          {
            path: '/success-pay',
            element: (
              <Suspense fallback={<Loader/>} >
                <SuccesPay/>
              </Suspense>
            )
          }
        ]
      }
    ]
  }
])