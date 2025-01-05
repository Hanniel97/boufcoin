import React, { useCallback, useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { apiUrl } from '../api/api';
import toast from 'react-hot-toast';
import { ProduitState, TableState } from '../type/type';
import { FaMinus } from 'react-icons/fa';

export const generateCommandId = () => {
    const codeChatset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let codeCommande = "";
    for (let i = 0, n = codeChatset.length; i < 6; ++i) {
        codeCommande += codeChatset.charAt(Math.floor(Math.random() * n));
    }

    return codeCommande
}

interface Produit {
    _id: string;
    nom: string;
    categorie: {
        nom: string
    };
    prixVente: number;
}

interface ProduitAdded {
    _id: string,
    product_id: string,
    nom: string,
    prixVente: number,
    quantity: number,
    categorie: string
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

const OrderPage: React.FC = () => {
    const { produits, setProduit } = useStore();

    const [nom, setNom] = useState<string>('');
    const [table, setTable] = useState<TableState>();
    const [telephone, setTelephone] = useState<string>('');
    const [products, setProducts] = useState<ProduitAdded[]>([]);
    const [data] = useState(produits)
    const [quantity, setQuantity] = useState(1);
    const [prix, setPrix] = useState(0);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState('');

    // const getProducts = useCallback(async () => {
    //     try {
    //         await fetch(apiUrl + 'getProduitForClient', {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 // Authorization: 'Bearer ' + user.token
    //             },
    //             // credentials: "include",
    //         })
    //             .then(response => response.json())
    //             .then(res => {
    //                 console.log('bar produit', res)
    //                 if (res.success === true) {
    //                     setProduit(res.data)
    //                     setLoading(false)
    //                 } else {
    //                     setLoading(false)
    //                 }
    //             })

    //     } catch (error) {
    //         console.error(error);
    //         setLoading(false)
    //         toast.error("Erreur de connexion")
    //     }
    // }, [setProduit])

    useEffect(() => {
        setLoading(true)
        try {
            fetch(apiUrl + 'getProduitForClient', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
            })
                .then(response => response.json())
                .then(res => {
                    // console.log('bar produit', res)
                    if (res.success === true) {
                        setProduit(res.data)
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                })

        } catch (error) {
            console.error(error);
            setLoading(false)
            toast.error("Erreur de connexion")
        }

        try {
            fetch(apiUrl + 'getTableOne', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
            })
                .then(response => response.json())
                .then(res => {
                    // console.log('table',res)
                    if (res.success === true) {
                        setTable(res.data)
                        setLoading(false)
                    } else {
                        toast.error("Une erreur est survenue. Réessayer!")
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.error(error);
            toast.error("Erreur de connexion")
            setLoading(false)
        }
    }, [setProduit])

    const onNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNom(event.target.value)
    }

    const onTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTelephone(event.target.value)
    }

    // const newData = data.reduce<Record<string, ProduitState[]>>((acc, item) => {
    //     if (!acc[item.categorie.nom]) {
    //         acc[item.categorie.nom] = [];
    //     }

    //     acc[item.categorie.nom].push(item);

    //     return acc;
    // }, {});

    useEffect(() => {
        if (product) {
            const produit: Produit | undefined = produits.find((item) => item.nom === product)
            if (produit) {
                setPrix(produit.prixVente * quantity)
            }
        }
    }, [products, quantity, product, produits])

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

    const cumule = (products: Product[]) => {
        const productMap: Record<string, CumuleProduct> = {};

        products.forEach(product => {
            const { nom, categorie, quantity, prixVente, product_id, } = product;

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
        setLoading(true);
        const sum = products.reduce((accumulator, object) => {
            return accumulator + object.prixVente * object.quantity;
        }, 0);

        const newProductList = cumule(products);
        await fetch(apiUrl + 'createCommande', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            },
            // credentials: "include",
            body: JSON.stringify({
                'nom': nom,
                'telephone': telephone,
                'produits': newProductList,
                'reglement': [],
                'prixTotal': sum,
                'monnaie': 0,
                'table': table
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(' commande', res)
                if (res.success === true) {
                    setLoading(false)
                    toast.success(res.message)
                    setProducts([]);
                } else {
                    setLoading(false);
                    toast.error(res.message)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error("Erreur de connexion")
                setLoading(false)
            })

    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold m-4">Commande de Repas</h1>

            <form onSubmit={handleAddProduct} className="space-y-4">

                <div className="text-left my-2">
                    <label className="text-gray-800 text-sm font-medium mb-2" htmlFor="nom">Votre nom ou pseudo</label>
                    <div className="relative flex items-center">
                        <input name="nom" type="nom" id="nom" placeholder="entrer un nom ou pseudo" value={nom} onChange={onNomChange} required className="w-full bg-transparent mt-1 block p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E85213] focus:border-[#E85213]" />
                        <svg
                            viewBox="0 0 448 512"
                            fill="currentColor"
                            className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        >
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
                        </svg>
                    </div>
                </div>

                <div className="text-left my-2">
                    <label className="text-gray-800 text-sm font-medium mb-2" htmlFor="telephone">Votre contact</label>
                    <div className="relative flex items-center">
                        <input name="telephone" type="telephone" id="telephone" placeholder="entrer un contact" value={telephone} onChange={onTelephoneChange} required className="w-full bg-transparent mt-1 block p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E85213] focus:border-[#E85213]" />
                        <svg
                            width="20"
                            height="120"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        >
                            <path d="M11 10c-1 1-1 2-2 2s-2-1-3-2-2-2-2-3 1-1 2-2-2-4-3-4-3 3-3 3c0 2 2.055 6.055 4 8s6 4 8 4c0 0 3-2 3-3s-3-4-4-3z" />
                        </svg>
                    </div>
                </div>

                <div className="mb-4.5 text-left flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 py-3 dark:border-strokedark dark:bg-boxdark">
                    <div className="flex-1 max-w-xl mr-3">
                        <label className="text-gray-800 text-sm font-medium mb-2">
                            Produit
                        </label>
                        <select
                            value={product}
                            required
                            onChange={(e) => setProduct(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Achat de: </option>
                            {produits.map((value, index) => (
                                <option key={value._id} value={value.nom}>
                                    {value.nom}
                                </option>
                            ))}
                            {/* {Object.keys(newData).map(item => (
                                <optgroup key={item} label={item}>
                                    {newData[item].map(cat => (
                                        <option key={cat._id} value={cat.nom}>
                                            {cat.nom}
                                        </option>
                                    ))}
                                </optgroup>
                            ))} */}
                        </select>
                    </div>

                    <div className="max-w-xl">
                        <label className="mb-1 block dark:text-white text-gray-800 text-sm font-medium">
                            Quantité
                        </label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min={1}
                            required
                            className="w-30 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div className="flex-1 max-w-xl">
                        <label className="mb-1 block dark:text-white text-gray-800 text-sm font-medium">
                            Prix
                        </label>
                        <input
                            type="number"
                            value={prix}
                            disabled={true}
                            className="w-30 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                <div className="mb-4.5 rounded-lg bg-gray/70 py-3 dark:border-strokedark dark:bg-boxdark">
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
                                <th className="w-[10px] py-4 font-medium text-black dark:text-white">
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
                                            {item.prixVente * item.quantity} FCFA
                                        </p>
                                    </td>
                                    <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                        <div className="flex gap-2.5">
                                            <button
                                                onClick={() => handleRemoveProduct(index)}
                                                className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-3 font-medium text-gray-100 hover:bg-opacity-90"
                                                type="button"
                                            >
                                                <FaMinus size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                    <div className="flex-1 flex items-end">
                        <button
                            type='button'
                            disabled={products.length > 0 ? false : true}
                            onClick={() => { handleSubmit() }}
                            className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                        >
                            {loading ? "Chargement..." : "Ajouter la commande"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OrderPage;