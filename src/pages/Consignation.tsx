import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { FaRegTrashAlt, } from 'react-icons/fa';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { GrUpdate } from 'react-icons/gr';

const Consignation: React.FC = () => {
    const {user, consignations, isAuthenticated, setLoading, setConsignation} = useStore();

    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const [open, setOpen] = useState(false)
    const [itemId, setItemId] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const formatNumber = (number: Number | String) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const getConsignation = useCallback(async () => {
        if(isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getConsignation?month='+selectedMonth, {
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
                    // console.log('consignation',res)
                    if(res.success === true){
                        setConsignation(res.data)
                        setLoading(false)
                    }else{
                        setLoading(false)
                    }
                })
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
    }, [isAuthenticated, selectedMonth, setConsignation, setLoading, user.token]) 

    useEffect(() =>  {
        getConsignation()
    }, [getConsignation])

    const deleteConsignation = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'deleteConsignation/' + id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    // credentials: "include",
                })
                .then(response => response.json())
                .then(res => {
                    if(res.success === true){
                        toast.success(res.message)
                        getConsignation()
                    }else{
                        toast.error(res.message)
                        setLoading(false)
                    }
                })
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    const markConsignation = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'markConsignation/' + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    // credentials: "include",
                })
                .then(response => response.json())
                .then(res => {
                    // console.log('consignation',res)
                    if(res.success === true){
                        getConsignation()
                        toast.success(res.message)
                    }else{
                        toast.error(res.message)
                        setLoading(false)
                    }
                })
    
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    const newItem = consignations;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newItem.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalVentes = newItem.length;
    const totalPages = Math.ceil(totalVentes / itemsPerPage);

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Consignations" />

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

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="text-left">
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white xl:pl-11">
                                            Date vente
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Produits
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Bouteille
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Quantité
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Prix
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Statut
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium py-2 text-black dark:text-white">
                                                    {moment(item.commandeId.createdAt).format('LLL')}
                                                </h5>
                                                {/* <p className="text-sm">${item.stock}</p> */}
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                {
                                                    item.commandeId.produits.length > 0 ?
                                                    <details>
                                                        <summary className="cursor-pointer text-blue-500 hover:text-blue-700">Produits</summary>
                                                        <table className="min-w-full table-auto">
                                                            <thead>
                                                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">Nom</th>
                                                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">Quantité</th>
                                                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">Total</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {item.commandeId.produits.map((item, idx) => (
                                                                    <tr key={idx} className="bg-gray-100">
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11 font-semibold">{item.nom}</td>
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark font-bold">{formatNumber(item.quantity)}</td>
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark font-bold">{formatNumber(item.prixVente*item.quantity)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </details>
                                                    :
                                                    <p className="text-black dark:text-white">
                                                        -
                                                    </p>
                                                }
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">
                                                    {item.bouteille}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-bold">
                                                    {formatNumber(item.qte)}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black font-bold dark:text-white">
                                                    {formatNumber(item.prixConsign)} FCFA
                                                </p>
                                            </td>
                                            <th className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                    item.status === "completed" ? 'bg-success text-success' : item.status === "pending" ?  'bg-warning text-warning' : 'bg-danger text-danger'}`}
                                                >
                                                    {item.status === "completed" ? "Réglé" : item.status === "pending" ? "En attente" : "Non-actif(ve)"}
                                                </p>
                                            </th>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        onClick={() => {markConsignation(item._id)}}
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <GrUpdate size={20} color="#FFFFFF"/>
                                                    </button>
                                                    <button
                                                        disabled={item.status === "completed"? true: false}
                                                        onClick={() => {setOpen(true); setItemId(item._id)}}
                                                        className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <FaRegTrashAlt size={20} color="#FFFFFF"/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end w-auto py-2">
                            <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /></button>
                            <span className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Page {currentPage} sur {totalPages}</span>
                            <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= newItem.length}><ArrowRightIcon strokeWidth={2} className="h-4 w-4" /></button>
                        </div>
                    </div>
                </>
            </Layout>

            <Dialog open={open} onClose={setOpen} className="flex h-screen bg-blue-gray-900/50 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg outline-none focus:outline-none border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-black dark:text-white">
                                            Supprimer cette consignation
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-black dark:text-white">
                                                Etes-vous vraiment sûr de vouloir supprimer cette consignation ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {deleteConsignation(itemId)}}
                                    className="inline-flex w-full justify-center rounded-md bg-meta-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-meta-3/90 sm:ml-3 sm:w-auto"
                                >
                                    Valider
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Annuler
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Consignation;