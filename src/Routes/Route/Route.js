import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../../Layout/DashboardLayout/DashboardLayout'
import Main from '../../Layout/Main/Main'
import Appointment from '../../Pages/Appointment/Appointment/Appointment'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import SignUp from '../../Pages/SignUp/SignUp'
import PrivateRoute from '../../PrivateRoute/PrivateRoute'
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard'
import MyAppointment from '../../Pages/Dashboard/MyAppointment/MyAppointment'

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
                <DashboardLayout />
            </PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <MyAppointment />
            }
        ]
    }
])

export default router