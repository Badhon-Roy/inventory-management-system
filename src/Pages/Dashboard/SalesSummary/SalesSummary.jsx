import { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const SalesSummary = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { data } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`)
            return res.data
        }
    })
    const { data: sales } = useQuery({
        queryKey: ['sales', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales?email=${user.email}`)
            return res.data
        }
    })


    const totalInvest = (data?.reduce((previousCost, item) => previousCost + item?.cost, 0));
    // const totalInvest = (invest).toFixed(2)
    const totalSellingPrice = data?.reduce((previousSellPrice, current) => previousSellPrice + current?.selling_price, 0)
    const totalSale = data?.reduce((previousSale, current) => previousSale + current?.sale_count, 0)

    const totalProfit = (totalSellingPrice - totalInvest).toFixed(2);
    return (
        <div>
            <h2>Sales history {sales?.length}</h2>
            <h3>All Product {data?.length}  of {user?.displayName}</h3>
            <h2>User is sales summery</h2>
            <div className="grid grid-cols-3 gap-10">
                <div className="border p-8 rounded-md">
                    <h2 className="text-xl font-bold">Total sale  <br />
                        {totalSale}</h2>
                </div>
                <div className="border p-8 rounded-md">
                    <h2 className="text-xl font-bold">Total Invest <br /> {totalInvest}</h2>
                </div>
                <div className="border p-8 rounded-md">
                    <h2 className="text-xl font-bold">Total Profit <br />
                        {totalProfit}</h2>
                </div>
            </div>
            <h2 className="text-4xl font-bold underline text-center my-8">Sales History</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Product Name</th>
                            <th>Selling date</th>
                            <th>Profit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales?.map((item, index) =>
                                <tr key={item?._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        {item?.product_name}
                                    </td>
                                    <td>{item?.sales_date}</td>
                                    <th>
                                        {(item?.selling_price - item?.cost)?.toFixed(2)}
                                    </th>
                                </tr>




                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default SalesSummary;