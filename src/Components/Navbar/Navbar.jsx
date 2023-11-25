import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo1-removebg-preview.png"
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
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
        <div className="bg-gray-400">
            <div className="navbar max-w-[1600px] mx-auto lg:px-16 md:px-8 py-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
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
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Home
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
                        {
                            user?.email && <li><NavLink
                                to="/dashboard"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                Dashboard
                            </NavLink></li>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <div>
                            <div className="dropdown dropdown-end rounded-none">
                                <label tabIndex={0} className="btn m-1">
                                    <div className="avatar online">
                                        <div className="w-8 rounded-full">
                                            <img src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <h2 className="md:block hidden">{user?.displayName}</h2>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="text-xl font-medium">{user?.displayName}</li>
                                    <li>{user?.email}</li>
                                    <div className="divider my-1"></div>
                                    <button onClick={handleLogOut} className="btn text-xl">Log Out</button>

                                </ul>
                            </div>
                        </div> : <a className="btn text-xl font-bold">
                            <NavLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                Login
                            </NavLink>
                        </a>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;