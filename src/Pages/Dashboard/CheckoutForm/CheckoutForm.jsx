import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const CheckoutForm = ({ id }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const [isClick, setIsClick] = useState(false)
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
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
        select: (data) => {
            return data?.find(user => user.role === 'admin');
        },
    });

    const offerLimit = parseInt(data?.limit) || 0;
    const offerPay = parseInt(data?.pay) || 0;



    const { data: shopData, isLoading: shopDataLoading } = useQuery({
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
            setError(confirmError.message)
        }
        if (paymentIntent) {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)
                Promise.all([
                    axiosSecure.put(`/shops/${shopId}/increment?limit=${offerLimit}`),
                    axiosSecure.put(`/users/${users?.email}/increment?income=${offerPay}`)

                ])
                    .then(([shopRes, userRes]) => {
                        const isShopSuccess = shopRes.data.modifiedCount > 0;
                        const isUserSuccess = userRes.data.modifiedCount > 0;
                        if (isShopSuccess && isUserSuccess) {
                            setIsClick(true)
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Payment successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

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
            <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-16"> Please
                <span className="text-color"> Pay  ${data?.pay} </span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-36 w-24"></span>
            </h2>
            <div className="md:p-16 bg-white">

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
                    <button className="BTN my-4" type="submit" disabled={!stripe || !clientSecret || isClick}>
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