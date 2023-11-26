import { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

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
    const handleAdd = (item) => {
        const checkOutInfo = {
            product_id: item?._id,
            product_name: item?.product_name,
            product_image: item?.product_image,
            quantity: item?.quantity,
            product_location: item?.product_location,
            cost: item?.cost,
            profit_margin: item?.profit_margin || 0,
            discount: item?.discount || 0,
            description: item?.description,
            date: item?.date,
            shop_id: item?.shop_id,
            shop_name: item?.shop_name,
            sale_count: item?.sale_count,
            selling_price: item?.selling_price,
            name: item?.name,
            email: item?.email,
        }
        axiosSecure.post('/checkOut', checkOutInfo)
            .then(res => {
                console.log(res.data);
            })
    }




    return (
        <div>
          {
            data?.length > 0 ? <div>
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
                                                    <button onClick={() => handleAdd(item)} className="BTN">Add For Check-out</button>
                                                </th>
                                            </tr>)
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                }
            </div>
            </div> : <p className="text-4xl font-bold text-center my-16">You are not any product added</p>
          }
        </div>
    );
};

export default SalesCollection;