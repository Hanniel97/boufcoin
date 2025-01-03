// import { loadStripe } from '@stripe/stripe-js';
// import { useParams } from 'react-router-dom';
// import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
// import { apiUrl } from '../api/api';
// import useStore from '../store/useStore';
// import toast from 'react-hot-toast';

// const stripePromise = loadStripe('pk_test_51Km1YeIckabNqUxzV1qacN6Ki3HbR34XOnP3WSQAEmChawa64DvJlX4okb4lYPD3td4Q9FcfEPbDQo68sYp2zioa009clLgRlq');

interface Props {
    paymentUrl: string
}

const AbonnementFeda = ({ paymentUrl }: Props) => {
    // const { setLoading } = useStore();

    // const { type, url } = useParams<{ type: string, url: string }>();

    // console.log('url de paiement', url)

    return (
        <>
            <Layout>
                <>
                    <div>
                        <h2>Page de Paiement</h2>
                        <iframe src={paymentUrl} style={{ width: '100%', height: '600px' }} title="Paiement" />
                    </div>
                </>
            </Layout>
        </>
    );
};

export default AbonnementFeda;