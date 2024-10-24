import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./routes/context/AuthContext"
import { StoreProvider } from "./routes/context/StoreContext"
import { route } from "./routes/Route"

function App() {
  return (
    <>
    <AuthProvider>
      <StoreProvider>
        <RouterProvider router={route} />
      </StoreProvider>
    </AuthProvider>
    </>
  )
}

export default App
