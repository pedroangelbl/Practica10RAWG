import { RouterProvider, createBrowserRouter, Outlet } from  'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/homePage/Home'
import ErrorPage from './pages/errorPage/ErrorPage'
import Catalogo from './pages/catalogoPage/Catalogo'
import GameDetail from './pages/GameDetail/GameDetail'
import AppNavBar from './components/AppNavBar'
import AppFooter from './components/AppFooter'
import { loader as gameDetailsLoader } from './pages/GameDetail/GameDetail'

function AppLayout(){
  return(
    <>
      <AppNavBar />
      <Outlet />
      <AppFooter />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/catalogo',
        element: <Catalogo />
      },
      {
        path: '/gameDetail/:id',
        element: <GameDetail />,
        loader: gameDetailsLoader
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
