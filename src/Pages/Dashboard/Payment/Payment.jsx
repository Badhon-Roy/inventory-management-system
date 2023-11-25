import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";


const Payment = () => {
    const { id } = useParams()
    

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY);
    return (
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm id={id}></CheckoutForm>
                </Elements>
            </div>
    );
};

export default Payment;