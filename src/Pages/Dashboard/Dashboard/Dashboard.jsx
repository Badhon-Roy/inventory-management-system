import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../../../Hook/useAdmin";
import useManager from "../../../Hook/useManager";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { MdOutlineCollections, MdProductionQuantityLimits } from "react-icons/md";
// import { IoBagCheckOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isManager] = useManager()
    return (
        <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
            <div>
                <div className="drawer md:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ml-5 py-16 px-4 bg-red-300">
                        {/* Page content here */}
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn text-2xl absolute left-3 top-1 btn-primary drawer-button lg:hidden"><GiHamburgerMenu></GiHamburgerMenu></label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu py-16 px-4 md:px-8 md:w-80  bg-base-200 text-base-content">
                            {
                                (() => {
                                    switch (true) {
                                        case isAdmin:
                                            return <>
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
                                            </>;
                                        case isManager:
                                            return <>
                                                <p className="text-4xl">Manager</p>
                                                <li><NavLink
                                                    to="/dashboard/productManagement"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                  <MdProductionQuantityLimits />  Product Management
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/salesCollection"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                   <MdOutlineCollections></MdOutlineCollections> Sales Collection
                                                </NavLink></li>
                                                {/* <li><NavLink
                                                    to="/dashboard/checkOut"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <IoBagCheckOutline />Check Out
                                                </NavLink></li> */}
                                                <li><NavLink
                                                    to="/dashboard/subscriptionAndPayment"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                   <FaMoneyBill /> Subscription & Payment
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/salesSummary"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                   <TbListDetails /> Sales Summery
                                                </NavLink></li>
                                            </>;
                                        default:
                                            return <div>
                                                <p className="text-4xl">user</p>
                                            </div>;
                                    }
                                })()
                            }
                            <div className="divider"></div>
                            <li className="text-xl"><NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                               <FaHome></FaHome> Home
                            </NavLink></li>
                        </ul>

                    </div>
                </div>
            </div>
            <Footer ></Footer>
        </div>
    );
};

export default Dashboard;