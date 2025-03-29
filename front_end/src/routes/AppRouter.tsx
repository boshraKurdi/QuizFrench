import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import SuspendPage from '@components/feedback/SuspendPage/SuspendPage';
import { useAppSelector } from '@hooks/app';
const Login = lazy(() => import('@pages/Login/Login'));
const HomePage = lazy(() => import('@pages/HomePage'));
const Home = lazy(() => import('@pages/Home/Home'));
const Register = lazy(() => import('@pages/Register/Register'));
const Courses = lazy(() => import('@pages/Courses/Courses'));
const CourseInfo = lazy(() => import('@pages/CourseInfo/CourseInfo'));
const QuizTest = lazy(() => import('@pages/QuizTest/QuizTest'));
const Level = lazy(() => import('@pages/Level/Level'));
const Lesson = lazy(() => import('@pages/Lesson/Lesson'));
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


    }, {
      path: '/courses',
      element: <SuspendPage> <Courses /></SuspendPage>

    }
      , {
      path: '/courses/:id/show',
      element: <SuspendPage> <CourseInfo /></SuspendPage>

    }
      , {
      path: '/courses/:id/show/quiz',
      element: <SuspendPage> <QuizTest /></SuspendPage>

    }, {
      path: '/courses/:id/level/:idLevel',
      element: <SuspendPage> <Level /></SuspendPage>

    }, {
      path: '/courses/:id/level/:idLevel/lesson/:idLesson',
      element: <SuspendPage> <Lesson /></SuspendPage>
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
