import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_51Km1YeIckabNqUxzV1qacN6Ki3HbR34XOnP3WSQAEmChawa64DvJlX4okb4lYPD3td4Q9FcfEPbDQo68sYp2zioa009clLgRlq");
    }
    return stripePromise;
};

export default getStripe;