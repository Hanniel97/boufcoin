import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Layout from './Layout';
// import { GrUpdate } from 'react-icons/gr';
import Breadcrumb from '../components/Breadcrumb';
import useStore from '../store/useStore';
import { apiUrl } from '../api/api';
import toast from 'react-hot-toast';
import { ProduitState, VenteState, FactureState } from '../type/type';
import { FaEdit, FaMinus, FaMoneyBillWave, FaPrint, FaRegTrashAlt } from 'react-icons/fa';
import EditVentePopup from '../components/EditVentePopup';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import FactureModal from '../components/FactureModal';
import BonCommandeModal from '../components/BonCommandeModal';
import PaymentPopup from '../components/PaymentPopup';

export const generateCommandId = () => {
    const codeChatset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let codeCommande = "";
    for(let i = 0, n = codeChatset.length; i < 6; ++i){
        codeCommande += codeChatset.charAt(Math.floor(Math.random() * n));
    }

    return codeCommande
}

interface ProduitAdded {
    _id: string,
    product_id: string, 
    nom: string,
    prixVente: number,
    quantity: number,
    categorie: string
}

interface Produit {
    _id: string;
    nom: string;
    categorie: {
        nom: string
    };
    prixVente: number;
}

interface Product {
    _id: string;
    nom: string;
    quantity: number;
    prixVente: number;
    product_id: string;
    categorie: string
}

interface CumuleProduct {
    nom: string;
    quantity: number;
    prixVente: number;
    product_id: string;
    _id: string;
    categorie: string
}

interface Consign {
    _id: string, 
    bouteille: string, 
    qte: number, 
    prixConsign: number
}

export interface BonCommandeState {
    categorie : string, 
    nom: string, 
    prixVente: number,
    product_id: string,
    quantity: number,
    _id: string,
}

const Ventes: React.FC = () => {
    const {user, produits, tables, serveuses, ventes, isAuthenticated, setProduit, setServeuse, setTable, setLoading, setVente, setReglement} = useStore()
    
    const [table, setTab] = useState('');
    const [serveuse, setServ] = useState("");
    const [prix, setPrix] = useState(0);
    const [products, setProducts] = useState<ProduitAdded[]>([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [reliquat, setReliquat] = useState(0);
    const [newPayment, setNewPayment] = useState([]);
    const [itemIdForDelete, setItemIdForDelete] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [isFactureModalOpen, setIsFactureModalOpen] = useState(false);
    const [isBonCommandeModalOpen, setIsBonCommandeModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [bouteille, setBouteille] = useState('');
    const [qte, setQte] = useState(0);
    const [prixConsign, setPrixConsign] = useState(0);
    const [consignedItems, setConsignedItems] = useState<Consign[]>([]);
    const [commandeForPaiement, setCommandeForPaiement] = useState<VenteState>();
    const [data] = useState(produits)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenForEdit, setIsPopupOpenForEdit] = useState(false);
    const [facture, setFacture] = useState<FactureState>();
    const [bonCommande, setBonCommande] = useState<BonCommandeState[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filterType, setFilterType] = useState('day');
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const formatNumber = (number: Number | String) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const openPopupForEdit = () => {
        setIsPopupOpenForEdit(true);
    };

    const closePopupForEdit = () => {
        setIsPopupOpenForEdit(false);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const handleShowPayment = (order: VenteState) => {
        setCommandeForPaiement(order)
        openPopup()
    }

    const getProducts = useCallback(async () => {
        if(user && isAuthenticated){
            // setLoading(true)
            try {
                await fetch(apiUrl +'getProduit', {
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
                    // console.log('bar produit',res)
                    if(res.success === true){
                        setProduit(res.data)
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
    }, [isAuthenticated, setLoading, setProduit, user])

    // useEffect(() => {
    //     if(user && isAuthenticated){
    //         const getProducts = async () => {
    //             setLoading(true)
    //             try {
    //                 await fetch(apiUrl +'getProduit?barId=' + bar._id, {
    //                     method: 'GET',
    //                     headers: {
    //                         Accept: 'application/json',
    //                         'Content-Type': 'application/json',
    //                         Authorization: 'Bearer ' + user.token
    //                     },
    //                     // credentials: "include",
    //                 })
    //                 .then(response => response.json())
    //                 .then(res => {
    //                     // console.log('bar produit',res)
    //                     if(res.success === true){
    //                         setProduit(res.data)
    //                         setLoading(false)
    //                     }else{
    //                         setLoading(false)
    //                     }
    //                 })
        
    //             } catch (error) {
    //                 console.error(error);
    //                 setLoading(false)
    //             }
    //         }
    //         getProducts();
    //     }
        
    // }, [bar._id, isAuthenticated, setLoading, setProduit, user, user.token])

    const getTable = useCallback(async () => {
        if(user && isAuthenticated){
            // setLoading(true)
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
            // setLoading(true)
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
                        // toast.error("Une erreur est survenue. Réessayer!")
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

    const getServeuse = useCallback(async () => {
        if(user && isAuthenticated){
            // setLoading(true)
            try {
                await fetch(apiUrl +'getServeuse', {
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
                    // console.log('serveuse',res)
                    if(res.success === true){
                        setServeuse(res.data)
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
    },[isAuthenticated, setLoading, setServeuse, user])

    const getCommande = useCallback(async () => {
        if(user && isAuthenticated){
            // setLoading(true)
            try {
                await fetch(apiUrl +'getCommande?month=' + selectedMonth, {
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
                    // console.log('vente',res)
                    if(res.success === true){
                        setVente(res.data)
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
    }, [isAuthenticated, selectedMonth, setLoading, setVente, user])

    useEffect(() =>  {
        setLoading(true)
        getProducts();
        getServeuse();
        getTable();
        getCommande();
        getReglement();
    }, [getCommande, getProducts, getReglement, getServeuse, getTable, setLoading])

    const reload = () => {
        setLoading(true)
        getProducts();
        getServeuse();
        getTable();
        getCommande();
        getReglement();
    }

    const newData = data.reduce<Record<string, ProduitState[]>>((acc, item) => {
        if (!acc[item.categorie.nom]) {
            acc[item.categorie.nom] = [];
        }

        acc[item.categorie.nom].push(item);

        return acc;
    }, {});

    useEffect(() => {
        if(product){
            const produit: Produit | undefined = produits.find((item) => item.nom === product)
            if(produit){
                setPrix(produit.prixVente*quantity)
            }
        }
    },[products, quantity, product, produits])

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (product && quantity > 0) {
            const produit: Produit | undefined = produits.find((item) => item.nom === product)

            if (produit) {
                setProducts([
                    ...products,
                    {
                        _id: generateCommandId(),
                        product_id: produit._id,
                        categorie: produit.categorie.nom,
                        nom: produit.nom,
                        prixVente: produit.prixVente,
                        quantity: quantity,
                    },
                ]);
                setProduct('');
                setQuantity(1);
                setPrix(0);
            } else {
                console.error('Produit non trouvé');
            }
            setProduct('');
            setQuantity(1);
            setPrix(0)
        }
    };

    const handleRemoveProduct = (index: number) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    //     setBouteille('');
    //     setQte(0);
    //     setPrixConsign(0);
    //     setConsignedItems([]);
    // };

    const handleAddItem = () => {
        if (bouteille && qte && prixConsign) {
            const newItem: Consign = {_id: generateCommandId(), bouteille, qte: qte, prixConsign: prixConsign };
            if(consignedItems){
                setConsignedItems(prevItems => [...prevItems, newItem]);
                setBouteille('');
                setQte(0);
                setPrixConsign(0);
            }
        }
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = consignedItems.filter((_, i) => i !== index);
        setConsignedItems(updatedItems);
    };

    useEffect(() => {
        if(bouteille && bouteille === "GRANDE"){
            const defaultValue = 500;
            setPrixConsign(defaultValue*qte)
        }else if(bouteille && bouteille === "PETITE"){
            const defaultValue = 300;
            setPrixConsign(defaultValue*qte)
        }
    },[bouteille, setPrixConsign, qte])

    const cumule = (products: Product[]) => {
        const productMap: Record<string, CumuleProduct> = {};

        products.forEach(product => {
            const { nom, categorie, quantity, prixVente, product_id,} = product;

            if (productMap[nom]) {
                productMap[nom] = {
                    nom,
                    categorie,
                    quantity: productMap[nom].quantity += quantity,
                    prixVente: productMap[nom].prixVente,
                    product_id,
                    _id: generateCommandId()
                };
            } else {
                productMap[nom] = {
                    nom,
                    categorie,
                    quantity,
                    prixVente,
                    product_id,
                    _id: generateCommandId()
                };
            }
        });

        return Object.values(productMap);
    }

    const handleSubmit = async () => {
        if(isAuthenticated){
            setLoading(true);
            const tbl = tables.find((item) => item.nom === table)
            const serv = serveuses.find((item) => item.nom === serveuse)
            const sum = products.reduce((accumulator, object) => {
                return accumulator + object.prixVente*object.quantity;
            }, 0);

            const newProductList = cumule(products);
            await fetch(apiUrl +'addCommande', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'table': tbl,
                    'vendeur': user.nom,
                    'serveuse': serv,
                    'produits': newProductList,
                    'reglement': [],
                    'consignation': consignedItems,
                    'prixTotal': sum,
                    'monnaie': reliquat,
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(' commande', res)
                if(res.success === true){
                    setLoading(false)
                    toast.success(res.message)
                    getCommande();
                    getTable();
                    setTab('');
                    setProducts([]);
                    setServ('');
                    setBouteille('');
                    setQte(0);
                    setPrixConsign(0);
                    setConsignedItems([])
                    setIsChecked(false)
                    setFacture(res.facture)
                    setIsFactureModalOpen(true)
                    setBonCommande(res.produitsRepas)
                    setIsBonCommandeModalOpen(true)
                }else{
                    setLoading(false);
                    toast.error(res.message)
                    setLoading(false)
                }
            })
            .catch ((error) => {
                console.log(error)
                toast.error("Erreur de connexion")
                setLoading(false)
            }) 
        }
    };

    const getFacture = useCallback(async (id: string) => {
        if(isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'getFactureById?commandId=' + id, {
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
                    // console.log('facture',res)
                    if(res.success === true){
                        setFacture(res.data)
                        setLoading(false)
                        setIsFactureModalOpen(true)
                        setBonCommande(res.produitsRepas)
                        setIsBonCommandeModalOpen(true)
                    }
                })
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
    }, [isAuthenticated, setLoading, user.token])

    const handleShowEditOrder = (order: VenteState) => {
        if(order){
            setCommandeForPaiement(order)
            openPopupForEdit()
        }
    }

    const handleDeleteOrder = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl + 'deleteCommande/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
            })
            .then(response => response.json())
            .then(res => {
                // console.log('commandes >>>>>>>>',res)
                if(res.success === true){
                    setOpen(false)
                    toast.success("Commande annulée")
                    getCommande();
                    getTable();
                }else{
                    toast.error("Erreur lors de l'annulation de la commande. Réessaayer !")
                    setLoading(false)
                }
            })
            .catch ((error) => {
                console.log(error)
                toast.error("Erreur de connexion")
                setLoading(false)
            }) 
        }
    };

    const handlePaymentSubmit = useCallback(async () => {
        if (commandeForPaiement && isAuthenticated) {
            setLoading(true);
            try {
                const response = await fetch(apiUrl + 'payercommande/' + commandeForPaiement._id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token,
                    },
                    body: JSON.stringify({
                        reglement: newPayment,
                        monnaie: reliquat,
                    }),
                });
                const res = await response.json();
                if (res.success) {
                    toast.success(res.message);
                    getCommande();
                    setReliquat(0);
                    setNewPayment([]);
                } else {
                    toast.error("Une erreur est survenue");
                }
            } catch (error) {
                console.log(error);
                toast.error("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        }
    }, [commandeForPaiement, isAuthenticated, setLoading, user.token, newPayment, reliquat, getCommande]);

    useEffect(() => {
        if(newPayment.length > 0){
            handlePaymentSubmit()
        }else{

        }
    }, [reliquat, newPayment, handlePaymentSubmit])

    // const filteredVentes = ventes.filter(item => {
    //     const itemDate = new Date(item.date);
    //     const today = new Date();
        
    //     if (filterType === 'day') {
    //         return itemDate.toDateString() === today.toDateString();
    //     } else if (filterType === 'month') {
    //         return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear(); 
    //     }
    //     return true;
    // });

    const filteredVentes = ventes.filter(item => {
        const itemDate = new Date(item.date);
        const selectedDate = new Date(selectedMonth + "-01"); // Crée une date avec le premier jour du mois sélectionné
        const today = new Date();
    
        // Vérifie si le mois sélectionné est le mois actuel
        const isCurrentMonth = selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear();
    
        if (isCurrentMonth) {
            if (filterType === 'day') {
                // Filtrer par jour si le type de filtre est 'day'
                return itemDate.toDateString() === today.toDateString();
            } else {
                // Si le mois est actuel, retourner toutes les ventes du mois
                return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
            }
        } else {
            // Si le mois choisi n'est pas le mois actuel, afficher toutes les ventes
            return true;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVentes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalVentes = filteredVentes.length;
    const totalPages = Math.ceil(totalVentes / itemsPerPage);

    return(
        <>
            <Layout>
                <>
                    <Breadcrumb pageName="Ventes" />

                    <div className="mb-10">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center mb-4 text-left w-full md:w-60 lg:w-60 xl:w-60">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                    Mois :
                                </label> */}
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
                                type='button'
                                onClick={() => reload()}
                                className="justify-center items-center rounded-md p-2 font-medium text-gray hover:bg-opacity-90"
                                // className="px-2 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90"
                            >
                                {/* <GrUpdate size={16} /> */}
                                <h2 className="italic text-black dark:text-white text-left">Actualiser</h2>
                            </button>
                        </div>

                        <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Ajouter une nouvelle commande</h2>
                            <section>
                                <form onSubmit={handleAddProduct} className="text-left">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Serveur(se)
                                            </label>
                                            <select
                                                value={serveuse}
                                                required
                                                disabled={products.length > 0 ? true : false}
                                                onChange={(e) => setServ(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="">Sélectionner une serveuse</option>
                                                {serveuses.map(item => (
                                                    <option key={item._id} value={item.nom}>
                                                        {item.nom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                TABLE N°
                                            </label>
                                            <select
                                                value={table}
                                                required
                                                disabled={products.length > 0 ? true : false}
                                                onChange={(e) => setTab(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="">Sélectionner une table</option>
                                                {tables.map(item => (
                                                    <option key={item._id} value={item.nom}>
                                                        {item.nom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                        <div className="flex-1 max-w-xl mr-3">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Produit
                                            </label>
                                            <select
                                                value={product}
                                                required
                                                onChange={(e) => setProduct(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="">Achat de: </option>
                                                {Object.keys(newData).map(item => (
                                                    <optgroup key={item} label={item}>
                                                        {newData[item].map(cat => (
                                                            <option key={cat._id} value={cat.nom}>
                                                                {cat.nom}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="max-w-xl">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Quantité
                                            </label>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                min={1}
                                                required
                                                className="w-24 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="flex-1 max-w-xl">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Prix
                                            </label>
                                            <input
                                                type="number"
                                                value={prix}
                                                disabled={true}
                                                className="w-24 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="flex items-end max-w-xl">
                                            <button
                                                type="submit"
                                                className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <p className="dark:text-white text-white">
                                                    Ajouter le produit
                                                </p>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                        <h3 className="text-xl font-semibol mb-4 text-black dark:text-white text-left">Produits ajoutés</h3>

                                        <table className="w-full table-auto">
                                            <thead>
                                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                        Produit
                                                    </th>
                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                        Quantité
                                                    </th>
                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                        Prix
                                                    </th>
                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {products.map((item, index) => (
                                                    <tr key={index} className="text-left">
                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                            <h5 className="font-medium py-2 text-black dark:text-white">
                                                                {item.nom}
                                                            </h5>
                                                            {/* <p className="text-sm">${item.stock}</p> */}
                                                        </td>
                                                        <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                            <p className="text-black dark:text-white">
                                                                {item.quantity}
                                                            </p>
                                                        </td>
                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                            <p className="text-black dark:text-white">
                                                                {item.prixVente*item.quantity} FCFA
                                                            </p>
                                                        </td>
                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                            <div className="flex gap-2.5">
                                                                <button
                                                                    onClick={() => handleRemoveProduct(index)}
                                                                    className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-3 font-medium text-gray-100 hover:bg-opacity-90"
                                                                    type="button"
                                                                >
                                                                    <FaMinus size={20}/>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                        {/* <div className="mb-4">
                                            <label className="inline-flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    className="form-checkbox h-5 w-5 text-blue-600 " 
                                                    checked={isChecked} 
                                                    onChange={handleCheckboxChange}
                                                />
                                                <h3 className="text-xl ml-2 font-semibol text-black dark:text-white text-left">Consignation de bouteille</h3>
                                            </label>
                                        </div> */}
                                        
                                        {isChecked && (
                                            <div>
                                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                                    <div className="flex-1 max-w-xl mr-3">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Bouteilles
                                                        </label>
                                                        <select
                                                            value={bouteille}
                                                            required
                                                            onChange={(e) => setBouteille(e.target.value)}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option value="">Bouteille</option>
                                                            <option value="GRANDE">GRANDE</option>
                                                            <option value="PETITE">PETITE</option>
                                                        </select>
                                                    </div>

                                                    <div className="max-w-xl">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Quantité
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={qte}
                                                            onChange={(e) => setQte(parseInt(e.target.value))}
                                                            min={1}
                                                            required
                                                            className="w-24 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>

                                                    <div className="flex-1 max-w-xl">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Prix
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={prixConsign}
                                                            disabled={true}
                                                            className="w-24 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>

                                                    <div className="flex items-end max-w-xl">
                                                        <button
                                                            type="button"
                                                            onClick={() => {handleAddItem()}}
                                                            className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            <p className="dark:text-white text-white">
                                                                Ajouter
                                                            </p>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {consignedItems.length > 0 && (
                                                    <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                                        <h3 className="text-xl font-semibol mb-4 text-black dark:text-white text-left">Produits ajoutés</h3>
                
                                                        <table className="w-full table-auto">
                                                            <thead>
                                                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                                        Bouteille
                                                                    </th>
                                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                                        Quantité
                                                                    </th>
                                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                                        Prix
                                                                    </th>
                                                                    <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                
                                                            <tbody>
                                                                {consignedItems.map((item, index) => (
                                                                    <tr key={index} className="text-left">
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                                            <h5 className="font-medium py-2 text-black dark:text-white">
                                                                                {item.bouteille}
                                                                            </h5>
                                                                            {/* <p className="text-sm">${item.stock}</p> */}
                                                                        </td>
                                                                        <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                                            <p className="text-black dark:text-white">
                                                                                {item.qte}
                                                                            </p>
                                                                        </td>
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                                            <p className="text-black dark:text-white">
                                                                                {item.prixConsign} FCFA
                                                                            </p>
                                                                        </td>
                                                                        <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                                            <div className="flex gap-2.5">
                                                                                <button
                                                                                    onClick={() => handleDeleteItem(index)} 
                                                                                    className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-3 font-medium text-gray-100 hover:bg-opacity-90"
                                                                                    type="button"
                                                                                >
                                                                                    <FaMinus size={20}/>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                                        <div className="flex-1 flex items-end">
                                            <button
                                                type='button'
                                                disabled={products.length > 0? false : true}
                                                onClick={() => {handleSubmit()}}
                                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                            >
                                                Ajouter la commande
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>

                        <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-4">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-semibol mb-4 text-black dark:text-white text-left">Liste des ventes</h2>

                                <span>
                                    <p className=" dark:text-white">
                                        Total des ventes: {totalVentes} {filterType === 'day' ? 'pour aujourd\'hui' : 'pour ce mois'}
                                    </p>
                                </span>

                                <div className="flex gap-2 mb-4">
                                    <button
                                        type='button'
                                        onClick={() => setFilterType('day')}
                                        className={`py-1 px-4 rounded border border-blue-700/30 ${filterType === 'day' ? 'bg-blue-500 text-white' : 'text-black'}`}
                                    >
                                        <p className=" dark:text-white">Jour</p>
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setFilterType('month')}
                                        className={`py-1 px-4 rounded border border-blue-700/30 ${filterType === 'month' ? 'bg-blue-500 text-white' : 'text-black'}`}
                                    >
                                        <p className=" dark:text-white">Mois</p>
                                    </button>
                                </div>
                            </div>
                            

                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                <table className="w-full table-auto">
                                    <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                                Table
                                            </th>
                                            <th className="min-w-[100px] hidden sm:table-cell py-4 font-medium text-black dark:text-white">
                                                Serveur(se)
                                            </th>
                                            <th className="min-w-[100px] hidden lg:table-cell py-4 font-medium text-black dark:text-white">
                                                Règlement
                                            </th>
                                            <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                                Statut
                                            </th>
                                            <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                                Montant
                                            </th>
                                            <th className="min-w-[100px] hidden sm:hidden lg:table-cell py-2 font-medium text-black dark:text-white">
                                                Produits
                                            </th>
                                            <th className="w-[110px] hidden sm:table-cell py-2 font-medium text-black dark:text-white">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index} className="text-left">
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium py-2 text-black dark:text-white">
                                                        {item.table.nom}
                                                    </h5>
                                                </td>
                                                <td className="min-w-[100px] hidden sm:table-cell border-b border-[#eee] py-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white font-semibold">
                                                        {item.serveuse.nom}
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] hidden lg:table-cell border-b border-[#eee] py-2 dark:border-strokedark">
                                                    {
                                                        item.reglement.length > 0 ? 
                                                        <details>
                                                            <summary className="cursor-pointer text-blue-500 hover:text-blue-700">Méthode</summary>
                                                            <table className="min-w-full table-auto">
                                                                <thead>
                                                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">Méthode</th>
                                                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">Montant</th>
                                                                    </tr>
                                                                </thead>

                                                                {/* {console.log(order.products)} */}

                                                                <tbody>
                                                                    {item.reglement.map((item, idx) => (
                                                                        <tr key={idx} className="bg-gray-100">
                                                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11 font-bold">{item.methode.nom}</td>
                                                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark font-bold">{formatNumber(item.montant)}</td>
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
                                                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                        item.status === "completed" ? 'bg-success text-success' : item.status === "pending" ?  'bg-warning text-warning' : 'bg-danger text-danger'}`}
                                                    >
                                                        {item.status === "completed" ? "Réglé" : item.status === "pending" ? "En attente" : ""}
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                    <p className="text-black font-bold dark:text-white">
                                                        {formatNumber(item.prixTotal)} FCFA
                                                    </p>
                                                </td>
                                                <td className="min-w-[100px] hidden sm:hidden lg:table-cell border-b border-[#eee] py-2 dark:border-strokedark">
                                                    {
                                                        item.produits.length > 0 ?
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
                                                                    {item.produits.map((item, idx) => (
                                                                        <tr key={idx} className="bg-gray-100">
                                                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark xl:pl-11 font-bold">{item.nom}</td>
                                                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark font-semibold">{formatNumber(item.quantity)}</td>
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
                                                <td className="w-[110px] border-b hidden sm:table-cell border-[#eee] py-2 dark:border-strokedark">
                                                    <div className="flex gap-2.5">
                                                        <button
                                                            disabled={item.status === "completed"? true : false}
                                                            onClick={() => {handleShowEditOrder(item)}}
                                                            className="flex justify-center items-center rounded-md bg-meta-8 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            <FaEdit size={20} color="#FFFFFF"/>
                                                        </button>

                                                        <button
                                                            disabled={item.status === "completed"? true : false}
                                                            onClick={() =>{handleOpen(); setItemIdForDelete(item._id)}}
                                                            className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            <FaRegTrashAlt size={20} color="#FFFFFF"/>
                                                        </button>

                                                        <button
                                                            onClick={() =>  getFacture(item._id)}
                                                            className="flex justify-center items-center rounded-md bg-meta-3 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            <FaPrint size={20} color="#FFFFFF"/>
                                                        </button>

                                                        <button
                                                            onClick={() => {handleShowPayment(item)}}
                                                            className="flex justify-center items-center rounded-md bg-meta-5 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            <FaMoneyBillWave size={20} color="#FFFFFF"/>
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
                                <button className="text-black dark:text-white relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white outline outline-2 outline-offset-2" type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= filteredVentes.length}><ArrowRightIcon strokeWidth={2} className="h-4 w-4" /></button>
                            </div>
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
                                        <DialogTitle as="h3" className="text-base font-semibold leading- text-black dark:text-white">
                                            Supprimer cette commande
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-black dark:text-white">
                                                Etes-vous vraiment sûr de vouloir supprimer cette commande ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {handleDeleteOrder(itemIdForDelete)}}
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

            {commandeForPaiement && isPopupOpenForEdit && (
                <EditVentePopup
                    vente={commandeForPaiement}
                    onClose={closePopupForEdit}
                    getVente={getCommande}
                />
            )}

            {commandeForPaiement && isPopupOpen && (
                <PaymentPopup
                    vente={commandeForPaiement}
                    setReliquat={setReliquat}
                    setNewPayment={setNewPayment}
                    onClose={closePopup}
                />
            )}

            {facture && isFactureModalOpen && (
                <FactureModal
                    isOpen={isFactureModalOpen}
                    vente={facture}
                    onRequestClose={() => {
                        setIsFactureModalOpen(false);
                    }}
                />
            )}

            {facture && bonCommande.length > 0 && isBonCommandeModalOpen && (
                <BonCommandeModal
                    isOpen={isBonCommandeModalOpen}
                    vente={facture}
                    bonCommande={bonCommande}
                    onRequestClose={() => {
                        setIsBonCommandeModalOpen(false);
                    }}
                />
            )}
        </>
        
    )
}

export default Ventes;