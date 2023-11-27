import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const SubscriptionAndPayment = () => {
    const axiosSecure = useAxiosSecure()
    const { data = [], isLoading } = useQuery({
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
    if (!Array.isArray(data)) {
        return <div>Error: Data is not in the expected format</div>;
    }
    console.log(data);
    return (
        <div>
             <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-16"> All
                <span className="text-color"> Subscription {data?.length} </span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-44 w-24"></span>
            </h2>
            {
                data?.map(offer =>
                    <div key={offer?.pay} className="border flex items-center justify-evenly text-xl gap-3 p-6 my-2 bg-gradient-to-r from-[#f4935b] to-pink-400 rounded-lg">
                        <h2 className="lg:text-4xl md:text-3xl font-bold md:w-auto w-2/4">Increase the product limit to {offer?.limit}</h2>
                        <h2 className="rounded-full lg:px-8 lg:py-9 px-4 py-5 border-4 md:border-8 border-white text-white font-bold text-2xl">${offer?.pay}</h2>
                        <Link to={`/dashboard/payment/${offer?._id}`}>
                            <button className="BTN">Pay</button>
                        </Link>

                    </div>

                )
            }
        </div>
    );
};

export default SubscriptionAndPayment;