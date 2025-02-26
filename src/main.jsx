import { RouterProvider, createBrowserRouter, Outlet } from  'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/homePage/Home'
import ErrorPage from './pages/errorPage/ErrorPage'
import Catalogo from './pages/catalogoPage/Catalogo'
import AppNavBar from './components/AppNavBar'
import AppFooter from './components/AppFooter'
import GameDetail, { loader as gameDetailsLoader } from './pages/GameDetail/GameDetail'
import PublisherPage, { loader as publisherDetailsLoader } from './pages/PublisherPage/PublisherPage'
import TagGamesPage, { loader as tagDetailsLoader} from './pages/TagGamesPage/TagGamesPage'
import PublishersPage from './pages/PublishersPage/PublishersPage'

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
        path: '/publishers',
        element: <PublishersPage />
      },
      {
        path: '/gameDetail/:id',
        element: <GameDetail />,
        loader: gameDetailsLoader
      },
      {
        path: '/publisher/:id',
        element: <PublisherPage />,
        loader: publisherDetailsLoader
      },
      {
        path: '/games/tag/:id',
        element: <TagGamesPage />,
        loader: tagDetailsLoader
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
