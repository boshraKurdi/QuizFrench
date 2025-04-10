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
const Profile = lazy(() => import('@pages/Profile/Profile'));
const QuizTest = lazy(() => import('@pages/QuizTest/QuizTest'));
const Level = lazy(() => import('@pages/Level/Level'));
const Unit = lazy(() => import('@pages/Unit/Unit'));
const Lesson = lazy(() => import('@pages/Lesson/Lesson'));
const QuizUnit = lazy(() => import('@pages/QuizUnit/QuizUnit'));
const QuizLesson = lazy(() => import('@pages/QuizLesson/QuizLesson'));
const Dashboard = lazy(() => import('@pages/Admin/Dashboard/Dashboard'));
const Main = lazy(() => import('@pages/Admin/Main/Main'));
QuizUnit
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
      path: '/profile',
      element: <SuspendPage> <Profile /></SuspendPage>

    }
      , {
      path: '/courses/:id/show',
      element: <SuspendPage> <CourseInfo /></SuspendPage>

    }
      , {
      path: '/courses/:id/show/quiz',
      element: <SuspendPage> <QuizTest /></SuspendPage>

    }, {
      path: '/courses/:id/levels/:idLevel',
      element: <SuspendPage> <Level /></SuspendPage>

    }, {
      path: '/courses/:id/levels/:idLevel/units/:idUnit',
      element: <SuspendPage> <Unit /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/quiz',
      element: <SuspendPage> <QuizUnit /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson',
      element: <SuspendPage> <Lesson /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson/quiz',
      element: <SuspendPage> <QuizLesson /></SuspendPage>
    }
      , {
      path: 'dashboard',
      element: <SuspendPage ><Dashboard /></SuspendPage>,
      children: [{
        index: true, element: <Main />,
      }
      ]

    }

    ]
  }])
    ;

  return <RouterProvider router={router} />

}

export default App
