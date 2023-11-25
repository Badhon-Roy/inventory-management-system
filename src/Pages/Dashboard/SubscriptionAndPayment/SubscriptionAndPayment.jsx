import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const SubscriptionAndPayment = () => {
    const axiosSecure = useAxiosSecure()
    const handleLimit = (limit, pay) => {
        console.log(limit, 'pay', pay);
    }
    const { data, isLoading } = useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/offers')
            return res.data
        }
    })
    if (isLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    console.log(data);
    return (
        <div>
            <h2>This  is payment method {data?.length}</h2>
            {
                data?.map(offer =>
                    <div key={offer?.pay} className="border flex justify-evenly text-xl p-5 my-2">
                        <h2>Increase the product limit to {offer?.limit} .</h2>
                        <h2>Pay ${offer?.pay}</h2>
                        <Link to={`/dashboard/payment/${offer?._id}`}>
                            <button onClick={() => handleLimit(offer?.limit, offer?.pay)} className="btn btn-sm btn-primary">Pay</button>
                        </Link>

                    </div>

                )
            }
        </div>
    );
};

export default SubscriptionAndPayment;