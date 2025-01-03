import React, {useCallback, useEffect, useState} from 'react';
// import moment from 'moment'
import 'moment/locale/fr';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import { FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { BiSolidEdit } from 'react-icons/bi';
import { TransactionState } from '../type/type';
import { ArrowLeftIcon, ArrowRightIcon, } from '@heroicons/react/24/outline'

const Caisse: React.FC = () => {
    const {user, transactions, isAuthenticated, setTransaction, setLoading} = useStore()

    const [open, setOpen] = useState(false)
    const [itemId, setItemId] = useState("")
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransactionId, setCurrentTransactionId] = useState("");
    const [type, setType] = useState("");
    const [montant, setMontant] = useState(0);
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [valeurCaisse, setValeurCaisse] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [filterText, setFilterText] = useState("");
    
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value.toLowerCase());
    };

    const handleEdit = (transaction: TransactionState) => {
        setType(transaction.type);
        setMontant(transaction.montant);
        setReference(transaction.reference);
        setDescription(transaction.description);
        setIsEditing(true);
        setCurrentTransactionId(transaction._id);
    };

    const formatNumber = (number: Number | String | undefined) => {
        if (number !== undefined) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    };

    const getTransaction = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getTransaction?&month='+selectedMonth, {
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
                    // console.log('bar transaction',res)
                    if(res.success === true){
                        setTransaction(res.data);
                        setLoading(false)
                    }else{
                        setLoading(false)
                    }
                })

            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error('Erreur de connexion.');
            }
        }
    }, [isAuthenticated, selectedMonth, setLoading, setTransaction, user])

    const getValeurCaisse = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl + 'getSolde', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log('valeur caisse', res)
                if(res.success === true){
                    setValeurCaisse(res.data);
                    setLoading(false)
                }else{
                    setLoading(false)
                    toast.error('Une erreur est survenue. Réessayer!');
                }
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
                toast.error('Erreur de connexion');
            })
        }
    }, [isAuthenticated, setLoading, user]);

    useEffect(() =>  {
        getTransaction();
        getValeurCaisse();
    }, [getTransaction, getValeurCaisse])

    const handleAddTransaction = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!user && !isAuthenticated){
            return false;
        }

        setLoading(true)
        if(isEditing){
            await fetch(apiUrl +'updateTransaction/' + currentTransactionId, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    '_id': currentTransactionId,
                    'type': type,       
                    'montant': montant,            
                    'reference': reference,            
                    'description': description,                     
                })
            })
           .then(response => response.json())
           .then(res => {
                // console.log(res)
                if(res.success === true){
                    toast.success(res.message)
                    setIsEditing(false);
                    getTransaction();
                    setLoading(false);
                    setType("");
                    setMontant(0);
                    setReference("");
                    setDescription("");
                    getValeurCaisse();
                    setCurrentTransactionId("");
                }else{
                    setLoading(false);
                    toast.error(res.message);
                }
            })
            .catch ((error) => {
                console.log(error)
                setLoading(false)
                toast.error("Erreur de connexion")
            }) 
        }else{
            await fetch(apiUrl +'addTransaction', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'type': type,       
                    'montant': montant,            
                    'reference': reference,            
                    'description': description,                     
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    toast.success(res.message)
                    setIsEditing(false);
                    getTransaction();
                    setLoading(false);
                    setType("");
                    setMontant(0);
                    setReference("");
                    setDescription("");
                    getValeurCaisse();
                    setCurrentTransactionId("");
                }else{
                    setLoading(false);
                    toast.error(res.message);
                }
            })
            .catch ((error) => {
                console.log(error)
                setLoading(false)
                toast.error("Erreur de connexion")
            }) 
        }

    };

    const deleteTransaction = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'deleteTransaction/' + id, {
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
                        getTransaction();
                        getValeurCaisse();
                        setOpen(false)
                    }else{
                        setLoading(false)
                        toast.error("Une erreur est survenue. Réessayer!")
                    }
                })
    
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error('Erreur de connexion');
            }
        }
    }

    const filteredItems = transactions.filter((item) => {
        return (
            item.type.toLowerCase().includes(filterText) ||
            item.reference.toLowerCase().includes(filterText) ||
            item.montant.toString().includes(filterText)
        );
    });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const total = filteredItems.length;
    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Transactions de Caisse" />

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
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Ajouter une transaction</h2>
                        <form onSubmit={handleAddTransaction} className="text-left">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Type de Transaction
                                    </label>
                                    <select
                                        name="type" 
                                        value={type} 
                                        required
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                        <option value="">Sélectionnez un type</option>
                                        <option value="entrée">ENTRÉE</option>
                                        <option value="sortie">SORTIE</option>
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Montant
                                    </label>
                                    <input
                                        type="number"
                                        name="montant"
                                        value={montant}
                                        required
                                        onChange={(e) => setMontant(parseInt(e.target.value))}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Référence
                                    </label>
                                    <input
                                        type="text"
                                        name="reference"
                                        value={reference}
                                        onChange={(e) => setReference(e.target.value)}
                                        required
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                // disabled={products.length > 0? false : true}
                                // onClick={() => {handleSubmit}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                            >
                                Ajouter transaction
                            </button>
                        </form>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 mt-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        <div className="flex justify-between self-end">
                            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Solde caisse: {valeurCaisse} FCFA</h2>

                            {/* Filtre */}
                            <div className="mb-4 text-left w-full md:w-96">
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Rechercher par type, référence ou montant"
                                    value={filterText}
                                    onChange={handleFilterChange}
                                    className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="text-left">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Type
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Référence
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Montant
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Date
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Description
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
                                                <h5 className={`font-medium py-2 ${item.type === "entrée"? "text-meta-3" : "text-meta-1"}`}>
                                                    {item.type === "entrée"? "ENTREE" : "SORTIE"}
                                                </h5>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">{item.reference}</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black font-bold dark:text-white">{formatNumber(item.montant)} FCFA</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">{new Date(item.date).toLocaleDateString()}</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{item.description}</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        onClick={() => handleEdit(item)} 
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                        disabled={item.reference === "Dépense"? true : false}
                                                    >
                                                        <BiSolidEdit size={20} color="#FFFFFF" />
                                                    </button>
                                                    <button
                                                        onClick={() => { setOpen(true); setItemId(item._id) }}
                                                        className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                        disabled={item.reference === "Dépense"? true : false}
                                                    >
                                                        <FaRegTrashAlt size={20} color="#FFFFFF" />
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
                            <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= filteredItems.length}><ArrowRightIcon strokeWidth={2} className="h-4 w-4" /></button>
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
                                            Supprimer une transaction
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-black dark:text-white">
                                                Etes-vous vraiment sûr de vouloir supprimer cette transaction de la caisse ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {deleteTransaction(itemId)}}
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

export default Caisse;