import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface DataRecap {
    categorie: string
    totalQuantiteVendue: number,
    totalRecette: number,
    totalBenefice: number,
    totalStock: number,
    produits: {
        nomProduit: string,
        quantiteVendue: number,
        totalRecette: number,
        totalBenefice: number,
        stockActuel: number,
    }[],
}

const RapportProduit: React.FC = () => {
    const {user, isAuthenticated, setLoading} = useStore();

    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [data, setData] = useState<DataRecap[]>([]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const formatNumber = (number: Number | String | undefined) => {
        if (number !== undefined) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    };

    const getCommande = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getReportProduct?month='+selectedMonth, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    // credentials: "include",
                })
                .then(response => response.json())
                .then(res => {
                    console.log('rapport produit',res)
                    if(res.success === true){
                        setData(res.data)
                        setLoading(false)
                    }else{
                        setLoading(false)
                        toast.error("Une erreur est survenue. Réessayer!")
                    }
                })

            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }, [isAuthenticated, selectedMonth, setLoading, user])

    useEffect(() =>  {
        getCommande()
    }, [getCommande])

    const getRapportPdf = async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getReportProductPdf?month='+selectedMonth, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    // credentials: "include",
                })
                .then(response => {
                    if (response.ok) {
                        console.log(response)
                        return response.blob();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.setAttribute('download', `Rapport_Produit_${moment(selectedMonth).format('LL')}.pdf`);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                    console.error('There was an error downloading the report:', error);
                });
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Rapport produits" />

                    <div className="flex flex-row gap-2.5">
                        <div className="mb-4 text-left w-full md:w-60 lg:w-60 xl:w-60">
                            <label className="block text-sm font-bold mb-2 text-black dark:text-white" htmlFor="date">
                                Sélectionner la date :
                            </label>
                            <input
                                id="date"
                                type="month"
                                placeholder="Choisissez le mois"
                                value={selectedMonth} 
                                onChange={handleMonthChange}
                                className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button
                            onClick={() => {getRapportPdf()}}
                            className="flex justify-center rounded-md mt-7 bg-primary py-2 px-6 h-11 font-medium text-gray-100 hover:bg-opacity-90"
                            type="button"
                        >
                            Rapport PDF
                        </button>
                    </div>

                    {data && data.map((item, index) => (
                        <div key={index} className="border border-stroke bg-white rounded-lg px-5 py-5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                            <div className="flex flex-row justify-between items-center">
                                <h2 className="text-xl font-semibold mb-2 text-black dark:text-white text-left">
                                    {item.categorie}
                                </h2>
                                <p className="text-md font-medium text-black dark:text-white mb-4">
                                    {/* Total des Revenus: {categorieData.totalRevenu} FCFA */}
                                </p>
                            </div>

                            <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                                <table className="w-full table-auto">
                                    <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                        <tr className="text-left">
                                            <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                Nom 
                                            </th>
                                            <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                                Qte Vendue
                                            </th>
                                            <th className="min-w-[100px] hidden sm:hidden lg:table-cell py-2 font-medium text-black dark:text-white">
                                                Recette
                                            </th>
                                            <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                Bénéfices
                                            </th>
                                            <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                Stock actuel
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {item.produits.map((item, index) => (
                                            <tr key={index} className="text-left">
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium py-2 text-black dark:text-white">
                                                        {item.nomProduit}
                                                    </h5>
                                                    {/* <p className="text-sm">${item.stock}</p> */}
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                    <p className="text-black dark:text-white font-semibold">
                                                        {item.quantiteVendue}
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                    <p className="text-black font-bold dark:text-white">
                                                        {formatNumber(item.totalRecette)} FCFA
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                    <p className="text-meta-3 font-bold">
                                                        {formatNumber(item.totalBenefice)} FCFA
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                    <p className="text-black dark:text-white font-semibold">
                                                        {formatNumber(item.stockActuel)}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </>
            </Layout>
        </>
    )
}

export default RapportProduit;