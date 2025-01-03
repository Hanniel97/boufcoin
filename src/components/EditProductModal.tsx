import React, { useState } from "react";
import SelectCategory from "./SelectCategory";
import useStore from "../store/useStore";
import { apiUrl } from "../api/api";
import { ProduitState } from "../type/type";
import toast from "react-hot-toast";

interface Modal {
    showEditModal: boolean;
    setEditShowModal: Function,
    getProducts: Function,
    product: ProduitState,
    setProductEdit: Function
}

export default function EditProductModal({showEditModal, setEditShowModal, getProducts, product, setProductEdit} : Modal) {
    const {user, isAuthenticated, setLoading} = useStore();

    const [nom, setNom] = useState<string>(product.nom);
    const [catId, setCatId] = useState<string>(product.categorie._id);
    const [prixAchat, setPrixAchat] = useState(product.prixAchat.toString());
    const [prixVente, setPrixVente] = useState(product.prixVente.toString());
    const [stock, setStock] = useState(product.stock.toString());
    const [seuil, setSeuil] = useState(product.threshold.toString());
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'updateProduit/'+product._id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'nom': nom,            
                    'categorie': catId,            
                    // 'stock': stock,            
                    'threshold': seuil,         
                    'prixAchat': prixAchat,       
                    'prixVente': prixVente,  
                    'user_id': user._id     
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    getProducts();
                    setLoading(false);
                    setProductEdit()
                    setEditShowModal(!showEditModal);
                    toast.success(res.message)
                }else{
                    setLoading(false);
                    toast.error(res.message)
                }
            })
            .catch ((error) => {
                console.log(error)
                setLoading(false)
                toast.error("Erreur de connexion")
            }) 
        }
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        {/*header*/}
                        <div className="flex items-start justify-between p-4 border-b border-blue-gray-50 rounded-t">
                            <h3 className="text-xl font-medium text-black dark:text-white">
                                Modifer le produit
                            </h3>
                            <button
                                type="button"
                                className="justify-center rounded border border-stroke h-8 w-8 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={() => {setEditShowModal(!showEditModal); setProductEdit()}}
                            >
                                <span className="opacity-2 text-xl outline-none focus:outline-none">x</span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto rounded-sm">
                            <form onSubmit={handleSubmit}>
                                <div className="p-2">
                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Nom du produit <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="text"
                                            required
                                            placeholder="Entrer le nom du produit"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <SelectCategory catId={catId} setCatId={setCatId} />

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <div className="flex">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Prix d'achat <span className="text-meta-1">*</span>
                                                </label>
                                            </div>
                                            
                                            <input
                                                type="number"
                                                required
                                                placeholder="Entrer le prix d'achat"
                                                value={prixAchat}
                                                onChange={(e) => setPrixAchat(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <div className="flex">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Prix de vente <span className="text-meta-1">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                placeholder="Entrer le prix de vente"
                                                value={prixVente}
                                                onChange={(e) => setPrixVente(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <div className="flex">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Stock <span className="text-meta-1">*</span>
                                                </label>
                                            </div>
                                            
                                            <input
                                                type="number"
                                                required
                                                placeholder="Entrer valeur du stock"
                                                value={stock}
                                                disabled
                                                onChange={(e) => setStock(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <div className="flex">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Seuil d'alerte <span className="text-meta-1">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                placeholder="Définir le seuil d'alerte"
                                                value={seuil}
                                                onChange={(e) => setSeuil(e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/*footer*/}
                        <div className="flex gap-4.5 items-center justify-end p-4 rounded-b border-t border-blue-gray-50">
                            <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onClick={() => {setEditShowModal(!showEditModal); setProductEdit()}}
                            >
                                Annuler
                            </button>
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}