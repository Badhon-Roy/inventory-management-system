import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SalesCollection = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isSearch, setIsSearch] = useState(false)
    const [searchProducts, setSearchProducts] = useState([])
    const { data, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`)
            return res.data
        }
    })
    const { data: checkOutData, isLoading: checkOutLoading } = useQuery({
        queryKey: ['checkOut'],
        queryFn: async () => {
            const res = await axiosSecure.get('/checkOut')
            return res.data
        }
    })

    const handleAdd = (item) => {
        const text = checkOutData?.find(product => product?.email === user?.email && product?.product_id === item?._id);
        const isAdded = !!text;
        if (isAdded) {
            Swal.fire({
                icon: "error",
                title: "Sorry...",
                text: "You are already check out!"
            });
        }
        else {
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
                    if (res.data.insertedId) {
                        console.log('check out', true);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item?.product_name} has been check out`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        navigate('/dashboard/checkOut')
                    }

                })
        }
    }

    if (isLoading || checkOutLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    const handleSearch = (e) => {
        console.log(e.target.value);
        setIsSearch(true)
        const searchResults = data.filter(
            (item) => item._id.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchProducts(searchResults);
    }
    console.log('is search', isSearch);


    return (
        <div>
            {
                data?.length > 0 ? <div>
                    <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-16"> All
                        <span className="text-color"> Sales Collection {data?.length} </span>
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-52 w-24"></span>
                    </h2>
                    <div className="flex justify-between">
                        <input onChange={handleSearch} type="text" placeholder="Search by product id" name="search" className="w-full border p-2" id="" />
                        <button className="BTN">Search</button>
                    </div>
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
                                        <tbody className="text-center">{
                                                isSearch ? <>{searchProducts?.map((item, index) =>
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
                                                            <td>$ {item?.selling_price}</td>
                                                            <th>
                                                                <button onClick={() => handleAdd(item)} className="BTN">Add For Check-out</button>
                                                            </th>
                                                        </tr>)
                                                }</> :
                                                    <> {
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
                                                                <td>$ {item?.selling_price}</td>
                                                                <th>
                                                                    <button onClick={() => handleAdd(item)} className="BTN">Add For Check-out</button>
                                                                </th>
                                                            </tr>)
                                                    }</>
                                            }

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div> : <p className="text-4xl font-bold text-center my-16">You are not any product added</p>
            }
            {
                isSearch && <div>
                    {
                        searchProducts?.length <= 0 && <p className="text-4xl font-bold text-center my-16">You have not added any products</p>
                    }
                </div>
            }
        </div>
    );
};

export default SalesCollection;