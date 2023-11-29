import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo1-removebg-preview.png"
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useManager from "../../Hook/useManager";
import useAdmin from "../../Hook/useAdmin";
import { RiLogoutCircleLine } from "react-icons/ri";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const [isManager] = useManager()
    const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch((error) => {
                console.log(error.massage);
            })
    }
    return (
        <div className="bg-gray-400 sticky top-0 z-10 ">
            <div className="navbar max-w-[1600px] mx-auto lg:px-16 md:px-8 py-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-red-600" : ""
                                }
                            >
                                Home
                            </NavLink></li>

                            {isManager || isAdmin ? (
                                <li>
                                    <NavLink
                                        to={isManager ? "/dashboard/productManagement" : isAdmin ? "/dashboard/manageShop" : ""}
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-red-600" : ""
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink
                                        to="/createStore"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-red-600" : ""
                                        }
                                    >
                                        Create Store
                                    </NavLink>
                                </li>
                            )}


                            <li><NavLink
                                to="/watchDemo"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-red-600" : ""
                                }
                            >
                                Watch Demo
                            </NavLink></li>
                        </ul>
                    </div>
                    <Link to="/" className="ml-4">
                        <img className="" src={logoImg} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 text-xl font-bold">
                        <li><NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-red-600" : ""
                            }
                        >
                            Home
                        </NavLink></li>

                        {isManager || isAdmin ? (
                            <li>
                                <NavLink
                                    to={isManager ? "/dashboard/productManagement" : isAdmin ? "/dashboard/manageShop" : ""}
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-600" : ""
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        ) : (
                            <li>
                                <NavLink
                                    to="/createStore"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-600" : ""
                                    }
                                >
                                    Create Store
                                </NavLink>
                            </li>
                        )}


                        <li><NavLink
                            to="/watchDemo"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-red-600" : ""
                            }
                        >
                            Watch Demo
                        </NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <div>
                            <div className="dropdown dropdown-end rounded-none">
                                <label tabIndex={0} className="btn m-1">
                                    <div className="avatar online">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <h2 className="md:block hidden">{user?.displayName}</h2>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52 mr-2">
                                    <li className="text-xl font-medium">{user?.displayName}</li>
                                    {
                                        isAdmin && <li className="text-xl font-bold text-color">Admin</li>
                                    }
                                    {
                                        isManager && <li className="text-xl font-bold text-color">Manager</li>
                                    }
                                    <li>{user?.email}</li>

                                    <div className="divider divider-warning my-1"></div>
                                    <div className="BTN">
                                        <button onClick={handleLogOut} className="flex items-center">
                                            <RiLogoutCircleLine className="mr-2 text-2xl" />
                                            Log Out
                                        </button>
                                    </div>

                                </ul>
                            </div>
                        </div> : <button className="BTN mr-4">
                            <NavLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-red-600" : ""
                                }
                            >
                                Login
                            </NavLink>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;