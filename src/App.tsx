import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/login'
import { Signup } from './pages/signup'
import { Characters } from './pages/characters'
import { Campaigns } from './pages/campaigns'
import { Layout } from './pages/layout'
import { Character } from './pages/character'

const router = createHashRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path:"/login",
    element: <Login />
  }, {
    path: "/signup",
    element: <Signup />
  }, {
    path: "/character",
    element: <Character />
  }, {
    path: "/characters",
    element: <Characters />
  }, {
    path: "/campaigns",
    element: <Campaigns />
  }]
}])


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
