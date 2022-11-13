import { createBrowserRouter } from 'react-router-dom'
import Main from '../../Layout/Main/Main'
import Appointment from '../../Pages/Appointment/Appointment/Appointment'
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import SignUp from '../../Pages/SignUp/SignUp'
import PrivateRoute from '../../PrivateRoute/PrivateRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/appointment',
                element: <Appointment />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    },
    {
        path: "/dashboard",
        element:
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
    }
])

export default router