import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import NavBar from '../../Pages/Shared/NavBar/NavBar';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext)

    const [isAdmin] = useAdmin(user?.email)

    return (
        <div>
            <NavBar></NavBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-gray-100 p-20">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/dashboard">Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to="/dashboard/users">Users</Link></li>
                                <li><Link to="/dashboard/add-doctor">Add Doctor</Link></li>
                                <li><Link to="/dashboard/manege-doctors">Manage Doctors</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;