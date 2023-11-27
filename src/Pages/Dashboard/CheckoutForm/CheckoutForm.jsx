import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const CheckoutForm = ({ id }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('')
    const [shopId, setShopId] = useState('')
    const elements = useElements();
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/${id}`)
            return res.data
        }
    })
    const offerLimit = parseInt(data?.limit) || 1;

   

    const { data: shopData , isLoading : shopDataLoading } = useQuery({
        queryKey: ['product_limit', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/shops?shop_owner_email=${user.email}`)
            return res.data;
        }
    })
    useEffect(() => {
        if (shopData && shopData?.length > 0) {
            setShopId(shopData[0]._id);
        } else {
            console.log('No shop data available.');
        }
    }, [shopData]);



    useEffect(() => {
        const payInfo = {
            pay: data?.pay || 1
        }
        axiosSecure.post("/create-payment-intent", payInfo)
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, data?.pay])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log("confirmError", confirmError);
            setError(confirmError.message)
        }
        if (paymentIntent) {
            console.log("paymentIntent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log("transaction id", paymentIntent.id);
                setTransactionId(paymentIntent.id)
                const incrementInfo = {
                    product_limit: 100
                }
                axiosSecure.put(`/shops/${shopId}/increment?limit=${offerLimit}`, incrementInfo)
                    .then(res => {
                        console.log(res.data);
                    })
            }
        }
    };
    if (isLoading || shopDataLoading) {
        return <div className="flex justify-center items-center h-[20vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    return (
        <div>
            <h2 className="text-4xl text-center">Please pay ${data?.pay}</h2>
            <div className="px-16 my-16 bg-white p-8">

                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className="BTN my-4" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                    <p className="text-red-600">{error}</p>
                    {
                        transactionId && <p className="text-green-600">Your transaction Id : {transactionId}</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;