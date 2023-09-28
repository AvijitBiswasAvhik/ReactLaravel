import {Navigate, createBrowserRouter} from 'react-router-dom';
import Dasboard from './views/dasboard';
import Surveys from './views/surveys';
import Login from './views/login';
import Signup from './views/signup';
import GuestLayout from './components/GuestLayout.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import SurveyView from './views/SurveyView';
import SurveyPublicView from './views/SurveyPublicView';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dasboard />
            },
            {
                path: 'surveys',
                element: <Surveys />
            },
            {
                path: 'surveys/create',
                element: <SurveyView />
            },
            {
                path: 'surveys/:id',
                element: <SurveyView />
            }
        ]
    },
   
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
            path: 'login',
            element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
    ]
    },
    {
        path: '/survey/public/:slug',
        element: <SurveyPublicView />,

    }
])

export default router;