import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import { GrUpdate } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Reliquat: React.FC = () => {
    const { user, reliquats, isAuthenticated, setReliquat, setLoading } = useStore();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [filterText, setFilterText] = useState("");

    const formatNumber = (number: Number | String) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Gestion du changement de mois
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    // Gestion du filtre
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value.toLowerCase());
    };

    // Récupération des données de commande avec reliquat
    const getCommande = useCallback(async () => {
        if (user && isAuthenticated) {
            setLoading(true);
            try {
                const response = await fetch(apiUrl + 'getCommandeWithMonnaie?month=' + selectedMonth, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                });
                const res = await response.json();
                if (res.success) {
                    setReliquat(res.data);
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        }
    }, [isAuthenticated, selectedMonth, setLoading, setReliquat, user]);

    useEffect(() => {
        getCommande();
    }, [getCommande]);

    // Fonction pour rendre la monnaie
    const rendreMonnaie = async (id: string) => {
        if (user && isAuthenticated) {
            setLoading(true);
            try {
                const response = await fetch(apiUrl + 'rendreMonnaie/' + id, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                });
                const res = await response.json();
                if (res.success) {
                    getCommande();
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        }
    };

    // Filtrage des commandes
    const filteredItems = reliquats.filter((item) => {
        const produitNames = item.produits.map(p => p.nom).join(", ").toLowerCase();
        return (
            item.table.nom.toLowerCase().includes(filterText) ||
            item.serveuse.nom.toLowerCase().includes(filterText) ||
            produitNames.includes(filterText) ||
            item.prixTotal.toString().includes(filterText) ||
            item.monnaie.toString().includes(filterText)
        );
    });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalVentes = filteredItems.length;
    const totalPages = Math.ceil(totalVentes / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Layout>
            <Breadcrumb pageName="Reliquat" />

            <div className="mb-4 text-left w-full md:w-60 lg:w-60 xl:w-60">
                <label className="block text-sm font-bold mb-2 text-black dark:text-white" htmlFor="date">
                    Sélectionner la date :
                </label>
                <input
                    id="date"
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            {/* Filtre */}
            {/* <div className="mb-4 text-left w-full md:w-96">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                    Filtrer :
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Rechercher par table, serveur, produit ou montant"
                    value={filterText}
                    onChange={handleFilterChange}
                    className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div> */}

            <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex">
                    {/* Filtre */}
                    <div className="mb-2 text-left w-full md:w-96">
                        <input
                            id="search"
                            type="text"
                            placeholder="Rechercher par table, serveur, produit ou montant"
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
                                <th className="py-3 font-medium text-black dark:text-white xl:pl-11">Table</th>
                                <th className="py-3 font-medium text-black dark:text-white">Serveur(se)</th>
                                <th className="hidden lg:table-cell py-3 font-medium text-black dark:text-white">Produits</th>
                                <th className="py-3 font-medium text-black dark:text-white">Montant à payer</th>
                                <th className="py-3 font-medium text-black dark:text-white">Reliquat</th>
                                <th className="py-3 font-medium text-black dark:text-white">Date</th>
                                <th className="py-3 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="text-left">
                                    <td className="py-3 dark:border-strokedark border-b border-[#eee] xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">{item.table.nom}</h5>
                                    </td>
                                    <td className="py-3 dark:border-strokedark border-b border-[#eee]">
                                        <p className="text-black dark:text-white font-semibold">{item.serveuse.nom}</p>
                                    </td>
                                    <td className="dark:border-strokedark hidden lg:table-cell py-4 border-b border-[#eee]">
                                        <details>
                                            <summary className="cursor-pointer text-blue-500 hover:text-blue-700">Produits</summary>
                                            <table className="min-w-full table-auto">
                                                <thead>
                                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                        <th className="py-2 font-medium text-black dark:text-white">Nom</th>
                                                        <th className="py-2 font-medium text-black dark:text-white">Quantité</th>
                                                        <th className="py-2 font-medium text-black dark:text-white">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.produits.map((p, idx) => (
                                                        <tr key={idx}>
                                                            <td className="dark:border-strokedark py-2 border-b border-[#eee] font-semibold text-black dark:text-white">{p.nom}</td>
                                                            <td className="dark:border-strokedark py-2 border-b border-[#eee] font-semibold text-black dark:text-white">{formatNumber(p.quantity)}</td>
                                                            <td className="dark:border-strokedark font-bold py-2 border-b border-[#eee] text-black dark:text-white">{formatNumber(p.prixVente * p.quantity)} FCFA</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </details>
                                    </td>
                                    <td className="dark:border-strokedark font-bold py-3 border-b border-[#eee] text-black dark:text-white">{formatNumber(item.prixTotal)} FCFA</td>
                                    <td className="dark:border-strokedark font-bold py-3 border-b border-[#eee] text-black dark:text-white">{formatNumber(item.monnaie)} FCFA</td>
                                    <td className="dark:border-strokedark py-3 border-b border-[#eee] font-semibold text-black dark:text-white">{moment(item.date).format("DD/MM/YYYY HH:mm")}</td>
                                    <td className="dark:border-strokedark py-3 border-b border-[#eee]">
                                        <button
                                            type='button'
                                            onClick={() => rendreMonnaie(item._id)}
                                            className="flex justify-center items-center rounded-md bg-meta-6/80 p-2 font-medium text-gray-100 hover:bg-opacity-90"
                                            // className="px-2 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90"
                                        >
                                            <GrUpdate size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* <div className="flex justify-between items-center mt-4">
                    <button
                        type='button'
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`py-2 px-4 rounded-lg bg-primary text-white hover:bg-opacity-90 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span className="text-black dark:text-white">{currentPage} / {totalPages}</span>
                    <button
                        type='button'
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`py-2 px-4 rounded-lg bg-primary text-white hover:bg-opacity-90 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div> */}
                <div className="flex justify-end w-auto py-2">
                    <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /></button>
                    <span className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Page {currentPage} sur {totalPages}</span>
                    <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= filteredItems.length}><ArrowRightIcon strokeWidth={2} className="h-4 w-4" /></button>
                </div>
            </div>
        </Layout>
    );
};

export default Reliquat;