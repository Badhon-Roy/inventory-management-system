import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ProductManagement = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`)
            return res.data
        }
    })
    const { data: shopData, isLoading: shopDataLoading } = useQuery({
        queryKey: ['product_limit', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/shops?shop_owner_email=${user.email}`)
            return res.data;
        }
    })

    if (isLoading || shopDataLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    const limit = shopData?.product_limit;
    const limited = shopData?.map(item => item?.product_limit)
    console.log(limited[0]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        })

    }
    return (
        <div>
            {
                data?.length > 0 ? <div className="flex border rounded justify-between items-center">
                    <div className="flex items-center gap-2 ml-5">
                        <img className="w-[42px]" src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png" alt="" />
                        <h2 className="text-xl font-bold">Total {data?.length} product added</h2>
                    </div>
                    {
                        data?.length >= limit ? <Link to="/dashboard/subscriptionAndPayment">
                            <button className="BTN">Add Product</button>
                        </Link> : <Link to="/dashboard/addProduct">
                            <button className="BTN">Add Product</button>
                        </Link>
                    }
                </div> : <div>
                    <h2 className="text-center mb-2 text-xl font-bold">You do not have any product.</h2>
                    <div className="flex justify-center">
                        <Link to="/dashboard/addProduct">
                            <button className="BTN">Add Product</button>
                        </Link>
                    </div>
                </div>
            }
            {
                data?.length > 0 && <div className="mt-8">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            {/* head */}
                            <thead className="text-xl">
                                <tr>
                                    <th className="bg-gray-300">
                                        <label>
                                            #
                                        </label>
                                    </th>
                                    <th className="w-1/5 bg-red-300">Image</th>
                                    <th className="w-2/4 bg-green-300">Product Name</th>
                                    <th className="bg-purple-300">Quantity</th>
                                    <th className="bg-blue-300">Sale Count</th>
                                    <th className="bg-yellow-400">Update</th>
                                    <th className="bg-red-400">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) =>
                                        <tr key={item._id}>
                                            <th>
                                                <label>
                                                    {index + 1}
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="avatar">
                                                        <div className=" border border-black rounded-md w-24 h-16">
                                                            <img src={item.product_image} alt="Avatar Tailwind CSS Component" />
                                                            
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                    <div className="text-[15px] text-left">{item.product_name}</div>
                                            </td>
                                            <td>
                                                {item?.quantity}
                                            </td>
                                            <td>{item?.sale_count}</td>
                                            <th>
                                                <Link to={`/dashboard/updateProduct/${item._id}`}>
                                                    <button className="btn text-2xl btn-ghost btn-xs"><FaEdit></FaEdit></button></Link>
                                            </th>
                                            <th>
                                                <button onClick={() => handleDelete(item._id)} className="btn text-2xl text-red-600 btn-ghost btn-xs"><MdDeleteForever /></button>
                                            </th>
                                        </tr>)
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductManagement;