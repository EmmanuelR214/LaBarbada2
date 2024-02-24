import { RouterProvider } from "react-router-dom"
import { route } from "./routes/Route"
import { AuthProvider } from "./routes/context/AuthContext"
import { StoreProvider } from "./routes/context/StoreContext"

function App() {
  return (
    <StoreProvider>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
    </StoreProvider>
  )
}

export default App
