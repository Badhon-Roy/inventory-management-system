import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const CheckOut = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
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
    const handleSales = ()=>{
        const salesInfo = {
            product_name : data?.product_name,
            sales_date : formateDate
        }
        axiosSecure.post('/sales' , salesInfo)
        .then(res =>{
            console.log(res.data);
        })
        const incrementInfo = {
            sale_count : data.sale_count + 1
        }
        const decrementInfo = {
            quantity : data.quantity - 1
        }
        axiosSecure.put(`/products/${id}/increment` , incrementInfo)
        .then(res =>{
            console.log(res.data);
        })
        axiosSecure.put(`/products/${id}/decrement` , decrementInfo)
        .then(res =>{
            console.log(res.data);
        })
    }
    return (
        <div>
            <h2>THis is check out {id} {data?.product_name} </h2>
            <div className="border flex items-center">
                <div>
                    <img className="w-[200px]" src={data?.product_image} alt="" />
                </div>
                <h2>{data?.product_name}</h2>
            </div>
            <button onClick={handleSales} className="btn btn-primary mt-3">Get Paid</button>
        </div>
    );
};

export default CheckOut;