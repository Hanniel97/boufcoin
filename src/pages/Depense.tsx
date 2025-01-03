import React, {useEffect, useState, useCallback} from 'react';
// import moment from 'moment'
import 'moment/locale/fr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, ArrowLeftIcon, ArrowRightIcon, } from '@heroicons/react/24/outline'
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import { FaRegTrashAlt } from 'react-icons/fa';
// import { GrUpdate } from 'react-icons/gr';
import toast from 'react-hot-toast';
import AddDepenseModal from '../components/AddDepenseModal';
import { BiSolidEdit } from 'react-icons/bi';
import { DepenseState } from '../type/type';
import EditDepenseModal from '../components/EditDepenseModal';

const Depense: React.FC = () => {
    const {user, depenses, isAuthenticated, setDepenses, setLoading} = useStore();

    const [open, setOpen] = useState(false)
    const [itemId, setItemId] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [depenseEdit, setDepenseEdit] = useState<DepenseState>();
    const [date, setDate] = useState<Date | null>(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value.toLowerCase());
    };

    const formatNumber = (number: Number | String | undefined) => {
        if (number !== undefined) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    };

    const getDepense = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getDepense?date='+date, {
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
                    // console.log('bar depense',res)
                    if(res.success === true){
                        setDepenses(res.data);
                        setLoading(false)
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
    }, [date, isAuthenticated, setDepenses, setLoading, user])

    useEffect(() =>  {
        getDepense()
    }, [getDepense])

    const deleteDepense = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'deleteDepense/' + id, {
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
                        getDepense()
                        setOpen(false)
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
    }

    const filteredItems = depenses.filter((item) => {
        return (
            item.employe.toLowerCase().includes(filterText) ||
            item.categorie.toLowerCase().includes(filterText) ||
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
                    <Breadcrumb pageName="Dépenses" />

                    <div className="mb-10">
                        <div className="flex flex-row gap-2.5">
                            <button
                                onClick={() => {setShowModal(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter une dépense
                            </button>

                            {/* <button
                                onClick={() => {setShowModalCat(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter une catégorie
                            </button> */}
                            
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                placeholderText="Sélectionnez une date"
                                popperClassName="bg-gray-800 text-white"
                            />
                            
                        </div>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        {/* Filtre */}
                        <div className="mb-4 text-left w-full md:w-96">
                            <input
                                id="search"
                                type="text"
                                placeholder="Rechercher par attribution, catégorie ou montant"
                                value={filterText}
                                onChange={handleFilterChange}
                                className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="text-left">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Attribué à
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Catégorie
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Montant
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
                                                <h5 className="font-medium py-2 text-black dark:text-white">
                                                    {item.employe}
                                                </h5>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">{item.categorie}</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black font-bold dark:text-white">{formatNumber(item.montant)} FCFA</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{item.description}</p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    <button
                                                        onClick={() => { setEditShowModal(true); setDepenseEdit(item) }}
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <BiSolidEdit size={20} color="#FFFFFF" />
                                                    </button>
                                                    <button
                                                        onClick={() => { setOpen(true); setItemId(item._id) }}
                                                        className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
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

            {showModal && <AddDepenseModal showModal={showModal} setShowModal={setShowModal} getDepense={getDepense} />}
            {showEditModal && depenseEdit && <EditDepenseModal showEditModal={showEditModal} setEditShowModal={setEditShowModal} getDepense={getDepense} depense={depenseEdit} setDepenseEdit={setDepenseEdit} />}

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
                                            Supprimer une dépense
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-black dark:text-white">
                                                Etes-vous vraiment sûr de vouloir supprimer cette dépense ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {deleteDepense(itemId)}}
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

export default Depense;