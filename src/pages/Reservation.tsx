import React from 'react';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';

const Reservations: React.FC = () => {

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Réservations" />

                    <div className="mb-10">

                    </div>
                </>
            </Layout>
        </>
        
    )
}

export default Reservations;