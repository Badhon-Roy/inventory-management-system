import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const CheckOut = () => {
    const axiosSecure = useAxiosSecure()
    const {id} = useParams()
    const {data , isLoading } = useQuery({
        queryKey : ['products'],
        queryFn : async ()=>{
            const res = await axiosSecure.get(`/products/${id}`)
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
            <h2>THis is check out {id} {data?.product_name} </h2>
        </div>
    );
};

export default CheckOut;