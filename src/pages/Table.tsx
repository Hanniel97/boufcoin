import React, { useCallback, useEffect, useState } from 'react';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { FaRegTrashAlt, } from 'react-icons/fa';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MethodeAddModal from '../components/MethodeAddModal';
import { GrUpdate } from 'react-icons/gr';

const Table: React.FC = () => {
    const {user, reglements, isAuthenticated, categories, setTable, tables, setLoading, setReglement, setCategorie} = useStore();

    const [showModalAddMethode, setShowModalAddMethode] = useState(false);
    const [nextTableNumber, setNextTableNumber] = useState(1);
    const [open, setOpen] = useState(false)
    const [itemId, setItemId] = useState("")
    const [nom, setNom] = useState<string>('');

    const getCategorie = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getCategorie', {
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
                    // console.log('cat info',res)
                    if(res.success === true){
                        setLoading(false)
                        setCategorie(res.data)
                    }else{
                        setLoading(false)
                    }
                })
    
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }, [isAuthenticated, setCategorie, setLoading, user])
    
    const getTable = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getTable', {
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
                    // console.log('table',res)
                    if(res.success === true){
                        setTable(res.data)
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
    }, [isAuthenticated, setLoading, setTable, user])

    const getReglement = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getReglement', {
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
                    // console.log('reglement',res)
                    if(res.success === true){
                        setReglement(res.data)
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
    }, [isAuthenticated, setLoading, setReglement, user])

    useEffect(() =>  {
        getCategorie();
        getTable();
        getReglement();
    }, [getCategorie, getReglement, getTable])

    useEffect(() => {
        if(tables.length > 0){
            const last = tables[tables.length -1]

            // console.log('last item', last)
            setNextTableNumber(last.numero + 1)
        }
    },[tables])

    const handleSubmit = async () => {
        // e.preventDefault();
        if(user && isAuthenticated){
            setLoading(true)
            const newTable = { nom: `TABLE N°${nextTableNumber}`, numero: nextTableNumber };
            try {
                await fetch(apiUrl + 'addTable', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    body: JSON.stringify({
                        'nom': newTable.nom,
                        'numero': newTable.numero
                    })
                })
                .then(response => response.json())
                .then(res => {
                    // console.log(res)
                    if(res.success === true){
                        setNextTableNumber(res.data.numero + 1);
                        toast.success(res.message)
                    }else{
                        setLoading(false);
                        toast.error(res.message);
                    }
                })
                getTable();
            } catch (error) {
                setLoading(false)
                console.error('Failed to add category', error);
                toast.error("Erreur de connexion")
            }
        }
    };

    const deleteTable = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'deleteTable/' + id, {
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
                    // console.log('table sup', res)
                    if(res.success === true){
                        setNextTableNumber(res.data.numero);
                        getTable()
                        setOpen(false)
                        // setNextTableNumber(1)
                        toast.success(res.message)
                    }else{
                        setLoading(false)
                        toast.error(res.message);
                    }
                })
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    // const deleteReglement = async (id: string) => {
    //     if(user && isAuthenticated){
    //         setLoading(true)
    //         try {
    //             await fetch(apiUrl +'deleteReglement/' + id, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     Authorization: 'Bearer ' + user.token
    //                 },
    //                 credentials: "include",
    //             })
    //             .then(response => response.json())
    //             .then(res => {
    //                 // console.log('table sup', res)
    //                 if(res.success === true){
    //                     // setNextTableNumber(res.data.numero);
    //                     getReglement()
    //                     // setOpen(false)
    //                     // setNextTableNumber(1)
    //                     toast.success(res.message)
    //                 }else{
    //                     setLoading(false)
    //                     toast.error(res.message);
    //                 }
    //             })
    
    //         } catch (error) {
    //             console.error(error);
    //             setLoading(false)
    //             toast.error("Erreur de connexion")
    //         }
    //     }
    // }

    // const deleteCategorie = async (id: string) => {
    //     if(user && isAuthenticated){
    //         setLoading(true)
    //         try {
    //             await fetch(apiUrl +'deleteCategorie/' + id, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     Authorization: 'Bearer ' + user.token
    //                 },
    //                 credentials: "include",
    //             })
    //             .then(response => response.json())
    //             .then(res => {
    //                 // console.log('table sup', res)
    //                 if(res.success === true){
    //                     // setNextTableNumber(res.data.numero);
    //                     getReglement()
    //                     // setOpen(false)
    //                     // setNextTableNumber(1)
    //                     toast.success(res.message)
    //                 }else{
    //                     setLoading(false)
    //                     toast.error(res.message);
    //                 }
    //             })
    
    //         } catch (error) {
    //             console.error(error);
    //             setLoading(false)
    //             toast.error("Erreur de connexion")
    //         }
    //     }
    // }

    const updateTable = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'updateTable/' + id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'nom': nom         
                })
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.success === true){
                    getTable();
                    setNom("")
                    toast.success(res.message)
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
    }
    
    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Tables & Méthodes" />

                    <div className="mb-10">
                        <div className="flex gap-2.5">
                            <button
                                onClick={() => {handleSubmit()}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter une table
                            </button>

                            <button
                                onClick={() => {setShowModalAddMethode(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter méthode de paiement
                            </button>
                        </div>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Liste des tables</h2>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Nom
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Numéro
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Changer le nom
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tables.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium py-2 text-black dark:text-white">
                                                    {item.nom}
                                                </h5>
                                                {/* <p className="text-sm">${item.stock}</p> */}
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {item.numero}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="w-full xl:w-45 flex gap-1.5">
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="nouveau nom"
                                                        onChange={(e) => setNom(e.target.value)}
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                    <button
                                                        onClick={() => {updateTable(item._id)}}
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <GrUpdate size={20} color="#FFFFFF"/>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        onClick={() => {setOpen(true); setItemId(item._id)}}
                                                        className="flex justify-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
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
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 mt-5">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Liste des catégories</h2>

                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Nom
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium py-2 text-black dark:text-white">
                                                    {item.nom}
                                                </h5>
                                                {/* <p className="text-sm">${item.stock}</p> */}
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        disabled
                                                        onClick={() => {setOpen(true); setItemId(item._id)}}
                                                        className="flex justify-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
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
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 mt-5">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Liste des méthodes de paiement</h2>

                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Nom
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reglements.map((item, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium py-2 text-black dark:text-white">
                                                    {item.nom}
                                                </h5>
                                                {/* <p className="text-sm">${item.stock}</p> */}
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        disabled
                                                        onClick={() => {setOpen(true); setItemId(item._id)}}
                                                        className="flex justify-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
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
                    </div>
                </>
            </Layout>

            {showModalAddMethode && <MethodeAddModal showModalAddMethode={showModalAddMethode} setShowModalAddMethode={setShowModalAddMethode} getReglement={getReglement} />}

            <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                                            Supprimer cette table
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-black dark:text-white">
                                                Etes-vous vraiment sûr cette table de votre liste ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {deleteTable(itemId)}}
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

export default Table;