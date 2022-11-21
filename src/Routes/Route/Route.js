import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../../Layout/DashboardLayout/DashboardLayout'
import Main from '../../Layout/Main/Main'
import Appointment from '../../Pages/Appointment/Appointment/Appointment'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import SignUp from '../../Pages/SignUp/SignUp'
import MyAppointment from '../../Pages/Dashboard/MyAppointment/MyAppointment'
import AllUsers from '../../Pages/Dashboard/AllUsers/AllUsers'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import AdminRoute from '../AdminRoute/AdminRoute'
import AddDoctor from '../../Pages/Dashboard/AddDoctor/AddDoctor'
import ManageDoctors from '../../Pages/Dashboard/ManageDoctors/ManageDoctors'
import Payment from '../../Pages/Dashboard/Payment/Payment'

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
            },
            {
                path: "/dashboard/users",
                element:
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
            },
            {
                path: '/dashboard/add-doctor',
                element:
                    <AdminRoute>
                        <AddDoctor />
                    </AdminRoute>
            },
            {
                path: '/dashboard/manege-doctors',
                element:
                    <AdminRoute>
                        <ManageDoctors />
                    </AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element:
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-gules.vercel.app/bookings/${params.id}`)
            }
        ]
    }
])

export default router