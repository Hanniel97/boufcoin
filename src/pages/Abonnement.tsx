import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout, } from '@stripe/react-stripe-js';
import React, {useCallback} from 'react';
import { useParams } from 'react-router-dom';
// import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_51Km1YeIckabNqUxzV1qacN6Ki3HbR34XOnP3WSQAEmChawa64DvJlX4okb4lYPD3td4Q9FcfEPbDQo68sYp2zioa009clLgRlq');

const Abonnement = () => {
    const { setLoading } = useStore();

    const { type } = useParams<{ type: string }>();

    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        setLoading(true)
        const res = await fetch(apiUrl + "create-checkout-session?type=" + type, {
            method: "POST",
        });
        const data = await res.json();

        // console.log("checkout data", data);

        if(data.success === true){
            setLoading(false);
            return data.clientSecret;
        }else{
            setLoading(false);
            toast.error("Une erreur est survenue lors de la création du paiement. Veuillez réessayer plus tard.");
            return null;
        }
        
    }, [setLoading, type]);

    const options = {fetchClientSecret};

    return (
        <>
            <Layout>
                <>
                    {/* <div className="mb-10"> */}
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={options}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    {/* </div> */}
                
                </>
            </Layout>
        </>
    );
};

export default Abonnement;