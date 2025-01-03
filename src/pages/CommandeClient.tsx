import React from 'react';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';

const CommandeClient: React.FC = () => {

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Commandes" />

                    <div className="mb-10">

                    </div>
                </>
            </Layout>
        </>
        
    )
}

export default CommandeClient;