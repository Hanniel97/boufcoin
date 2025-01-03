import React, {useEffect, useState, useCallback} from 'react';
// import moment from 'moment'
import 'moment/locale/fr';
// import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
// import { FaRegTrashAlt, FaTrash } from 'react-icons/fa';
// import { GrUpdate } from 'react-icons/gr';
import toast from 'react-hot-toast';

interface DataRecap {
    totalRecettes: number;
    totalMonnaieRestante: number;
    recapPaiements: {
        methode: string;
        montant: number;
    }[];
    recapConsignations: {
        bouteille: string; 
        quantite: number, 
        prixTotal: number;
    }[];
    recapProduits: {
        categorie: string;
        produits: {
            nom: string, 
            quantite: number, 
            revenuTotal: number
        }[],
        totalRevenu: number,
    }[]
}

const Rapport: React.FC = () => {
    const {user, isAuthenticated, setLoading} = useStore();

    const [date, setDate] = useState<Date | null>(new Date());
    const [data, setData] = useState<DataRecap>();

    const formatNumber = (number: Number | String | undefined) => {
        if (number !== undefined) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    };


    const getReport = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
        try {
            await fetch(apiUrl+'getReport?date='+date, {
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
                console.log('data',res)
                if(res.success === true){
                    setData(res.data)
                    setLoading(false)
                }else{
                    toast.error("Une erreur est survenue. Réessayer!")
                    setLoading(false)
                }
            })
        } catch (error) {
            console.error(error);
            toast.error("Erreur de connexion")
            setLoading(false)
        }
        }
    }, [date, isAuthenticated, setLoading, user]) 

    useEffect(() =>  {
        getReport()
    }, [getReport])

    const addRectteToCaisse = async () => {
        if(user && isAuthenticated){
            setLoading(true)
        try {
            await fetch(apiUrl+'setDailyRevenu?date='+date, {
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
                // console.log('data',res)
                if(res.success === true){
                    toast.success(res.message)
                    setLoading(false)
                }else{
                    toast.error(res.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            console.error(error);
            toast.error("Erreur de connexion")
            setLoading(false)
        }
        }
    }

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Rapport d'activité" />

                    <div className="flex flex-row">
                        <div className="mb-4 text-left md:w-80 lg:w-80 xl:w-80">
                            <label className="block text-sm font-bold mb-2 text-black dark:text-white" htmlFor="date">
                                Sélectionner la date :
                            </label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="rounded border-[1.5px] border-blue-gray-200 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                placeholderText="Sélectionnez une date"
                                popperClassName="bg-gray-800 text-white"
                            />
                        </div>

                        {data && data.totalRecettes > 0 && (
                            <button
                                onClick={() => {addRectteToCaisse()}}
                                disabled={data.totalRecettes < 0 ? true: false}
                                className="justify-center rounded-md mt-7 bg-primary py-2 px-4 h-11 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter la recette à la caisse
                            </button>
                        )}
                        
                    </div>
                    
                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Recettes de la journée</h2>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white xl:pl-11">
                                            Recette
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Reliquat
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="text-left">
                                        <td className="min-w-[100px] border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                            <h5 className="py-2 text-black font-bold dark:text-white">
                                                {formatNumber(data?.totalRecettes)} FCFA
                                            </h5>
                                            
                                        </td>
                                        <td className="min-w-[100px] border-[#eee] dark:border-strokedark">
                                            <p className="py-2 text-black font-bold dark:text-white">
                                                {formatNumber(data?.totalMonnaieRestante)} FCFA
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Méthode de paiement</h2>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        {data?.recapPaiements && data.recapPaiements.length > 0 && Object.keys(data.recapPaiements[0]).map((key, index) => (
                                            <th key={index} className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitaliser la première lettre */}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data?.recapPaiements && data.recapPaiements.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            {Object.values(item).map((value, idx) => (
                                                <td key={idx} className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                    <h5 className="py-2 font-bold text-black dark:text-white">
                                                        {value}
                                                    </h5>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Consignation de bouteilles</h2>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        {data?.recapConsignations && data.recapConsignations.length > 0 && Object.keys(data.recapConsignations[0]).map((key, index) => (
                                            <th key={index} className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitaliser la première lettre */}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data?.recapConsignations && data.recapConsignations.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            {Object.values(item).map((value, idx) => (
                                                <td key={idx} className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-bold py-2 text-black dark:text-white">
                                                        {formatNumber(value)}
                                                    </h5>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {data?.recapProduits && data.recapProduits.map((categorieData, index) => (
                        <div key={index} className="border border-stroke bg-white rounded-lg px-5 py-5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                            <div className="flex flex-row justify-between items-center">
                                <h2 className="text-xl font-semibold mb-2 text-black dark:text-white text-left">
                                    {categorieData.categorie} VENDUS
                                </h2>
                                <p className="text-md font-bold text-black dark:text-white mb-4">
                                    Total des Revenus: {formatNumber(categorieData.totalRevenu)} FCFA
                                </p>
                            </div>
                            
                            <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                                <table className="w-full table-auto">
                                    <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                        <tr className="bg-gray-200 text-left dark:bg-meta-4">
                                            <th className="min-w-[100px] py-4 font-medium text-black dark:text-white xl:pl-11">
                                                Nom
                                            </th>
                                            <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                Quantité Vendue
                                            </th>
                                            <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                Revenu Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categorieData.produits.map((item, idx) => (
                                            <tr key={idx} className="text-left">
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium py-2 text-black dark:text-white">
                                                        {item.nom}
                                                    </h5>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {formatNumber(item.quantite)}
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                    <p className="text-black font-bold dark:text-white">
                                                        {formatNumber(item.revenuTotal)}
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

export default Rapport;
