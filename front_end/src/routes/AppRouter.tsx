import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import SuspendPage from '@components/feedback/SuspendPage/SuspendPage';
import { useAppSelector } from '@hooks/app';
const Login = lazy(() => import('@pages/Login/Login'));
const HomePage = lazy(() => import('@pages/HomePage'));
const Home = lazy(() => import('@pages/Home/Home'));
const Register = lazy(() => import('@pages/Register/Register'));
function App() {
  const { language } = useAppSelector(state => state.language)
  document.body.dataset.lang = language;

  const router = createBrowserRouter([{
    path: '/',
    element: <SuspendPage ><HomePage /></SuspendPage>,
    children: [{
      index: true, element: <Home />,
    }, {
      path: '/login',
      element: <SuspendPage> <Login /></SuspendPage>


    }, {
      path: '/register',
      element: <SuspendPage> <Register /></SuspendPage>


    }
      //   path: '/Binko/home',
      //   element: <SuspendPage> <Home /></SuspendPage>
      // }, {
      //   path: 'profile/:id',
      //   element: <SuspendPage><UpdateBook /></SuspendPage>
      // },
      // {
      //   path: 'booksSearch',
      //   element: <SuspendPage><BooksSearch /></SuspendPage>
    ]
  }

  ]
  );

  return <RouterProvider router={router} />

}

export default App
