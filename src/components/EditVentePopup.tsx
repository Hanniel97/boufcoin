import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaMinus } from 'react-icons/fa';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import { ProduitState, VenteState } from '../type/type';

export const generateCommandId = () => {
    const codeChatset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let codeCommande = "";
    for(let i = 0, n = codeChatset.length; i < 6; ++i){
        codeCommande += codeChatset.charAt(Math.floor(Math.random() * n));
    }

    return codeCommande
}

interface Props {
    vente: VenteState,
    onClose: Function,
    getVente: Function,
}

interface Produit {
    _id: string;
    nom: string;
    prixVente: number;
}

interface Product {
    _id: string;
    nom: string;
    quantity: number;
    prixVente: number;
    product_id: string;
}

interface CumuleProduct {
    nom: string;
    quantity: number;
    prixVente: number;
    product_id: string;
    _id: string;
}

interface Consign {
    _id: string, 
    bouteille: string, 
    qte: number, 
    prixConsign: number
}

const EditVentePopup = ({vente, onClose, getVente }: Props) => {
    const { user, produits, isAuthenticated } = useStore();

    const [loading2, setLoading2] = useState(false);
    const [data, setData] = useState(produits)
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [prix, setPrix] = useState(0);
    const [products, setProducts] = useState([...vente.produits]);
    const [consignedItems, setConsignedItems] = useState<Consign[]>([]);

    const [isChecked, setIsChecked] = useState(false);
    const [bouteille, setBouteille] = useState('');
    const [qte, setQte] = useState(0);
    const [prixConsign, setPrixConsign] = useState(0);
    // const [consignedItems, setConsignedItems] = useState([...vente.consignation]);

    useEffect(() => {
        const sortedData = [...produits].sort((a, b) => {
            if (a.nom < b.nom) {
                return -1;
            }
            if (a.nom > b.nom) {
                return 1;
            }
                return 0;
          });
        setData(sortedData);

        // if(consignedItems.length > 0){
        //     setIsChecked(true)
        // }
    }, [produits]);

    useEffect(() => {
        if(product){
            const produit = produits.find((item) => item.nom === product)

            if(produit){
                setPrix(produit.prixVente*quantity)
            }
        }
    },[products, quantity, product, produits])

    useEffect(() => {
        if(bouteille && bouteille === "GRANDE"){
            const defaultValue = 500;
            setPrixConsign(defaultValue*qte)
        }else if(bouteille && bouteille === "PETITE"){
            const defaultValue = 300;
            setPrixConsign(defaultValue*qte)
        }
    },[bouteille, setPrixConsign, qte])

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

    const handleRemoveProduct = (id: string) => {
        const newProducts = products.filter((item) => item._id !== id)
        setProducts(newProducts)
    };

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    //     setBouteille('');
    //     setQte(0);
    //     setPrixConsign(0);
    //     // setConsignedItems([]);
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

    const cumule = (products: Product[]) => {
        const productMap: Record<string, CumuleProduct> = {};

        products.forEach(product => {
            const { nom, quantity, prixVente, product_id,} = product;

            if (productMap[nom]) {
                productMap[nom] = {
                    nom,
                    quantity: productMap[nom].quantity += quantity,
                    prixVente: productMap[nom].prixVente,
                    product_id,
                    _id: generateCommandId()
                };
            } else {
                productMap[nom] = {
                    nom,
                    quantity,
                    prixVente,
                    product_id,
                    _id: generateCommandId()
                };
            }
        });

        return Object.values(productMap);
    }

    // const getFactureById = async (id: string) => {
    //     await fetch(apiUrl + 'getFactureById/' + id, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer '+user.token
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         // console.log('pour le bon de commande', res)
    //         if(res.success === true){
    //             if(res.data.produits.some(item => item.product_id.cat_id.nom === 'REPAS')){
    //                 setPrintBonCommande(res.data)
    //                 setIsOpen(true)
    //             }
    //         }else{
    //             // dispatch({type: ISLOADING, payload: false})
    //         }
    //     })
    // }

    // const saveFacture2 = async(order) => {
    //     dispatch({type: ISLOADING, payload: true})
    //     await fetch(baseUrl +'createFacture', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer '+token
    //         },
    //         body: JSON.stringify({
    //             'commande_id': order._id,
    //             'table': order.table,
    //             'vendeur': order.vendeur,
    //             'serveuse': order.serveuse,
    //             'produits': order.produits,
    //             'reglement': order.reglement,
    //             'consignation': order.consignation,
    //             'prixTotal': order.prixTotal,
    //             'monnaie': order.monnaie,
    //             'statut': order.statut,
    //             // 'date': new Date(),
    //             'isProForma': order.statut === "attente"? true : false
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         // console.log(res)
    //         if(res.success === true){
    //             // toast.success(res.message);
    //             // console.log(res.data);
    //             // setFacture(res.data)
    //             // setIsFactureModalOpen(true)
    //             dispatch({type: ISLOADING, payload: false})
    //             getFactureById(res.data.commande_id)
    //         }else{
    //             toast.error("Une erreur est survenue")
    //             dispatch({type: ISLOADING, payload: false})
    //         }
    //     })
    //     .catch ((error) => {
    //         console.log(error)
    //         // setLoadong(false);
    //         toast.error("Erreur de connexion")
    //         dispatch({type: ISLOADING, payload: false})
    //     }) 
    // }

    const handleUpdate = async () => {
        if(user && isAuthenticated){
            const sum = products.reduce((accumulator, object) => {
                return accumulator + object.prixVente*object.quantity;
            }, 0);
    
            const newProductList = cumule(products);
    
            setLoading2(true);
            await fetch(apiUrl +'updateCommande/' + vente._id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+user.token
                },
                body: JSON.stringify({
                    'produits': newProductList,
                    'consignation': consignedItems,
                    'prixTotal': sum,
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    setLoading2(false)
                    toast.success(res.message)
                    getVente();
                    // saveFacture2(res.data)
                    onClose();
                }else{
                    setLoading2(false);
                    toast.error(res.message)
                }
            })
            .catch ((error) => {
                console.log(error)
                setLoading2(false);
                toast.error("Erreur de connexion")
            }) 
        }
    }

    const newData = data.reduce<Record<string, ProduitState[]>>((acc, item) => {
        if (!acc[item.categorie.nom]) {
            acc[item.categorie.nom] = [];
        }

        acc[item.categorie.nom].push(item);

        return acc;
    }, {});

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-blue-gray-900/90 bg-opacity-75">
            <div className="outline-none overflow-y-auto max-h-150 focus:outline-none border-stroke bg-white border shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg xl:w-1/2 sm:w-1/2 px-5 py-5 sm:px-7.5 xl:pb-4 my-4">
                <h2 className="text-lg text-left font-bold mb-4 text-black dark:text-white">Modifier la commande</h2>
            
                <form onSubmit={handleAddProduct} className="gap-4 text-left overflow-y-auto max-h-100">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                        <div className="flex-1 max-w-xl mr-3">
                            <label className="block text-black dark:text-white">
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
                            <label className="block text-black dark:text-white">
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
                            <label className="block text-black dark:text-white">
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
                        <h3 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Produits ajoutés</h3>

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                        Produit
                                    </th>
                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                        Quantité
                                    </th>
                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                        Prix
                                    </th>
                                    <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={index} className="text-left">
                                        <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {item.nom}
                                            </h5>
                                            {/* <p className="text-sm">${item.stock}</p> */}
                                        </td>
                                        <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {item.quantity}
                                            </p>
                                        </td>
                                        <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {item.prixVente*item.quantity} FCFA
                                            </p>
                                        </td>
                                        <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark">
                                            <div className="flex gap-2.5">
                                                <button
                                                    onClick={() => handleRemoveProduct(item._id)}
                                                    className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-gray-100 hover:bg-opacity-90"
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
                </form>


                <div className="text-left rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                    {/* <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="form-checkbox h-5 w-5 text-blue-600 " 
                                checked={isChecked} 
                                onChange={handleCheckboxChange}
                            />
                            <h3 className="text-xl ml-2 font-semibold text-black dark:text-white text-left">Consignation de bouteille</h3>
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
                                    <h3 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Produits ajoutés</h3>

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
                                                                className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-3 font-medium text-gray hover:bg-opacity-90"
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


                <div className="flex gap-4.5 items-center justify-end p-4 rounded-b">
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                        onClick={() => {onClose()}}
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                        onClick={() => {handleUpdate()}}
                    >
                        {loading2 ? "Chargement..." : "Modifier"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditVentePopup;