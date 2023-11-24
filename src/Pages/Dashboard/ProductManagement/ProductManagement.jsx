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
    if (isLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

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
                data.length > 0 ? <div className="flex border justify-between items-center">
                    <h2 className="text-xl font-bold ml-6">Total {data?.length} product added</h2>
                    <Link to="/dashboard/addProduct">
                        <button className="btn rounded-none btn-primary">Add Product</button>
                    </Link>
                </div> : <div>
                    <h2 className="text-center mb-2 text-xl font-bold">You do not have any product.</h2>
                    <div className="flex justify-center">

                        <Link to="/dashboard/addProduct">
                            <button className="btn rounded-none btn-primary">Add Product</button>
                        </Link>
                    </div>
                </div>
            }
            {
                data?.length > 0 && <div className="mt-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            #
                                        </label>
                                    </th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Sale Count</th>
                                    <th>Update</th>
                                    <th>Delete</th>
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
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-16 h-16">
                                                            <img src={item.product_image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item.product_name}</div>
                                                        <div className="text-sm opacity-50">{item?.product_location
                                                        }</div>
                                                    </div>
                                                </div>
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