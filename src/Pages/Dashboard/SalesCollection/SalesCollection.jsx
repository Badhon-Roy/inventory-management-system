import { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const SalesCollection = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { data, isLoading } = useQuery({
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
    return (
        <div>
            <h2>THis is sales collection {data?.length} </h2>
            <div>
                {
                    data?.length > 0 && <div className="mt-8">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="text-[18px] text-center">
                                    <tr>
                                        <th>
                                            <label>
                                                #
                                            </label>
                                        </th>
                                        <th className="text-left">Product</th>
                                        <th>Quantity</th>
                                        <th>Discount</th>
                                        <th>Selling Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
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
                                                            <div className="font-bold text-left text-xl">{item.product_name}</div>
                                                            <div className="text-sm">{item?._id
                                                            }</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item?.quantity}
                                                </td>
                                                <td>{item?.discount}%</td>
                                                <td>{item?.selling_price}</td>
                                                <th>
                                                    <Link to={`/dashboard/checkOut/${item._id}`}>
                                                        <button className="btn text-xl btn-ghost ">Sold to Customer</button></Link>
                                                </th>
                                            </tr>)
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SalesCollection;