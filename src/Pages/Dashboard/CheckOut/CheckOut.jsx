import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { jsPDF } from "jspdf";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const CheckOut = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/checkOut?email=${user?.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    const currentDate = new Date()
    const formateDate = currentDate.toLocaleString()
    const handleSales = (id) => {
        const selectedProduct = data?.find((product) => product._id === id);
        console.log(selectedProduct);
        const doc = new jsPDF();
        doc.setFontSize(12);
        const topMargin = 10;
        const leftMargin = 10;
        const pageSize = {
            width: 210,
            height: 297
        };
        const availableWidth = pageSize.width - leftMargin * 2;
        doc.text(`
    Shop Name         : ${selectedProduct?.shop_name}
    Product Name      : ${selectedProduct?.product_name}
    Product ID        : ${selectedProduct?.product_id}
    Product Location  : ${selectedProduct?.product_location}
    Description       : ${selectedProduct?.description}
    Product Discount  : ${selectedProduct?.discount}"%"
    Selling Price     : ${selectedProduct?.selling_price}
    ----------------
    Manager Name      : ${selectedProduct?.name}
    Manager Email     : ${selectedProduct?.email}
    Product Date      : ${selectedProduct?.date}
    Check Out Date    : ${formateDate}
    
`, 10, 10 + 60);
        if (selectedProduct?.product_image) {
            doc.addImage(selectedProduct?.product_image, 'JPEG', 50, 10, 50, 50);
        }
        doc.setLineWidth(0.5);
        doc.line(leftMargin, topMargin + 200, leftMargin + availableWidth, topMargin + 200);

        doc.save("a4.pdf");



        const salesInfo = {
            email : user?.email,
            product_name: selectedProduct?.product_name,
            sales_date: formateDate,
            selling_price : selectedProduct?.selling_price,
            cost : selectedProduct?.cost

        }
        axiosSecure.post('/sales', salesInfo)
            .then(res => {
                console.log(res.data);
            })
        const incrementInfo = {
            sale_count: selectedProduct?.sale_count + 1
        }
        const decrementInfo = {
            quantity: selectedProduct?.quantity - 1
        }
        axiosSecure.put(`/products/${selectedProduct?.product_id}/increment`, incrementInfo)
            .then(res => {
                console.log(res.data);
            })
        axiosSecure.put(`/products/${selectedProduct?.product_id}/decrement`, decrementInfo)
            .then(res => {
                console.log(res.data);
            })


        axiosSecure.delete(`/checkOut/${selectedProduct?._id}`)
            .then(res => {
                console.log('delete', res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                }
            })
    }
    return (
        <div>
            {
                data?.length > 0 ? <div>
                    <h2 className="md:text-4xl text-2xl text-center mb-8 underline">Total {data?.length} products is Check Out </h2>
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
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                    <th>Sale Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item , index) =>
                                        <tr key={item?._id}>
                                            <th>
                                                <label>
                                                    {index + 1}
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="rounded-md w-12 h-12">
                                                            <img src={item?.product_image} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item?.product_name}</div>
                                                        <div className="text-sm opacity-50">location: {item?.product_location}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {item?.quantity}
                                            </td>
                                            <td>{item?.cost}</td>
                                            <td>{item?.sale_count}</td>
                                            <th>
                                                <button onClick={() => handleSales(item?._id)} className="BTN">Get Paid</button>
                                            </th>
                                        </tr>


                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div> : <p className="text-4xl font-bold text-center my-16">You are not check out any product</p>
            }
        </div>
    );
};

export default CheckOut;