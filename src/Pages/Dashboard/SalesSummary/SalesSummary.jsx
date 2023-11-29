import { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SalesHistory from "./SalesHistory";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const SalesSummary = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    // const { data } = useQuery({
    //     queryKey: ['products', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/products?email=${user.email}`)
    //         return res.data
    //     }
    // })
    const { data: sales } = useQuery({
        queryKey: ['sales', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales?email=${user.email}`)
            return res.data
        }
    })


    const invest = (sales?.reduce((previousCost, item) => previousCost + item?.cost, 0));
    const totalInvest = (invest)?.toFixed(2)
    const totalSellingPrice = sales?.reduce((previousSellPrice, current) => previousSellPrice + current?.selling_price, 0)
    // const totalSale = data?.reduce((previousSale, current) => previousSale + current?.sale_count, 0)

    const totalProfit = (totalSellingPrice - totalInvest).toFixed(2);
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    const data = [
        {
            name: 'Total sale',
            uv: `${sales?.length}`,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Total Invest',
            uv: `${totalInvest}`,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Total Profit',
            uv: `${totalProfit}`,
            pv: 9800,
            amt: 2290,
        }
    ];
    return (
        <div>
            <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-8"><span className="text-color">Sales </span> Count
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
            </h2>
            <div className="grid lg:grid-cols-3  grid-cols-1 md:gap-10 gap-5">
                <div className="border bg-[#01cbd5] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total sale  <br />
                        {sales?.length}</h2>
                    <img className="w-[60px]" src="https://static-00.iconduck.com/assets.00/sale-badge-icon-256x256-slz0mqy5.png" alt="" />
                </div>
                <div className="border bg-[#ffe05c] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Invest <br /> ${totalInvest}</h2>
                    <img className="w-[60px]" src="https://cdn-icons-png.flaticon.com/512/2394/2394119.png" alt="" />
                </div>
                <div className="border bg-[#816ed9] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Profit <br />
                        ${totalProfit}</h2>
                    <img className="w-[70px]" src="https://cdn-icons-png.flaticon.com/512/4318/4318266.png" alt="" />
                </div>
            </div>
            <div className="flex justify-center my-8">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
            <SalesHistory sales={sales}></SalesHistory>

        </div>
    );
};

export default SalesSummary;