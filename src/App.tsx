
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import CryptroDetailPage from './pages/Detail/indexcryptro'
import FavouritePage from './pages/Favourite/favouriteList'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<HomePage />
      ),
    },
    {
      path: "/favouritePage",
      element: (<FavouritePage />
      ),
    },
    {
      path: "/CryptroDetailPage/:id",
      element: (<CryptroDetailPage />
      ),
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
