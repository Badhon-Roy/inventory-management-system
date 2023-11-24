import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../../../Hook/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin() ;
    console.log(isAdmin);
    return (
        <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
            <div style={{ height: 'calc(100vh - 178px)' }}>
                <div className="drawer md:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ml-5 py-16 px-4 bg-red-300" style={{ height: 'calc(100vh - 178px)' }}>
                        {/* Page content here */}
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn text-2xl absolute left-3 top-1 btn-primary drawer-button lg:hidden"><GiHamburgerMenu></GiHamburgerMenu></label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul style={{ height: 'calc(100vh - 178px)' }} className="menu py-16 px-4 md:px-8 md:w-80  bg-base-200 text-base-content">

                            {
                                isAdmin ? <>
                                <p className="text-4xl">Admin</p>
                                    <li><NavLink
                                        to="/dashboard/manageShop"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Manage Shop
                                    </NavLink></li>
                                    <li><NavLink
                                        to="/dashboard/saleSummery"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Sale Summery
                                    </NavLink></li>
                                    <li><NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Home
                                    </NavLink></li>
                                </> :
                                    <>
                                    <p className="text-4xl">User</p>
                                        <li><NavLink
                                            to="/dashboard/allUsers"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            All User
                                        </NavLink></li>
                                        <li><NavLink
                                            to="/createStore"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Create Store
                                        </NavLink></li>
                                        <li><NavLink
                                            to="/watchDemo"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Watch Demo
                                        </NavLink></li>
                                    </>
                            }


                        </ul>

                    </div>
                </div>
            </div>
            <Footer ></Footer>
        </div>
    );
};

export default Dashboard;