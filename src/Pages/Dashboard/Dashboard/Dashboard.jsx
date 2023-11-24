import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";


const Dashboard = () => {
    return (
        <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
            <div className="flex gap-10">
                <div className="bg-red-400 p-4 w-1/4" style={{height: 'calc(100vh - 178px)'}}>
                    <ul>
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
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;