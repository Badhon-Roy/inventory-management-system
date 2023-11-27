import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../../../Hook/useAdmin";
import useManager from "../../../Hook/useManager";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { MdOutlineCollections, MdProductionQuantityLimits } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isManager] = useManager()
    const {logOut} = useContext(AuthContext)
    const {user} = useContext(AuthContext)
    const [shopLogo , setShopLogo] = useState('')
    const axiosSecure = useAxiosSecure();
    const { data: shopData  } = useQuery({
        queryKey: ['product_limit', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/shops?shop_owner_email=${user.email}`)
            return res.data;
        }
    })
    useEffect(() => {
        if (shopData && shopData?.length > 0) {
            setShopLogo(shopData[0].shop_logo);
        } else {
            console.log('No shop data available.');
        }
    }, [shopData]);


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
        <div>
            <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
                <div className="drawer md:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ml-5 py-16 px-4">
                        {/* Page content here */}
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn text-2xl absolute left-3 top-1 btn-primary drawer-button lg:hidden"><GiHamburgerMenu></GiHamburgerMenu></label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu py-16 px-4 md:px-8 h-full md:w-80  bg-base-200 text-base-content">
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
                                                    to="/dashboard/AdminSaleSummery"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    Sale Summery
                                                </NavLink></li>
                                            </>;
                                        case isManager:
                                            return <>
                                            {
                                               shopData && shopData?.length > 0 ?
                                               <div className="flex justify-center">
                                                <img className="w-[80px]" src={shopLogo} alt="" />
                                               </div> : <p>No Logo</p>
                                            }
                                                
                                                <li><NavLink
                                                    to="/dashboard/productManagement"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <MdProductionQuantityLimits  className="text-xl"/>  Product Management
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/salesCollection"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <MdOutlineCollections className="text-xl"></MdOutlineCollections> Sales Collection
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/checkOut"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <IoBagCheckOutline className="text-xl" />Check Out
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/subscriptionAndPayment"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <FaMoneyBill className="text-xl" /> Subscription & Payment
                                                </NavLink></li>
                                                <li><NavLink
                                                    to="/dashboard/salesSummary"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "active" : ""
                                                    }
                                                >
                                                    <TbListDetails  className="text-xl"/> Sales Summery
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
                            <div className="BTN">
                                        <button onClick={handleLogOut} className="flex items-center">
                                            Log Out
                                            <AiOutlineLogout className="ml-2 text-2xl" />
                                        </button>
                                    </div>
                        </ul>

                    </div>
                </div>
            </div>
            <Footer ></Footer>
        </div>
    );
};

export default Dashboard;