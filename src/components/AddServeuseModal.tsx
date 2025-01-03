import React, { useState } from "react";
import useStore from "../store/useStore";
import { apiUrl } from "../api/api";
import toast from "react-hot-toast";


interface Modal {
    showAddServeuseModal: boolean;
    setAddServeuseShowModal: Function,
    getEmploye: Function,
}

export default function AddServeuseModal({showAddServeuseModal, setAddServeuseShowModal, getEmploye} : Modal) {
    const {user, isAuthenticated} = useStore();

    const [nom, setNom] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [salaire, setSalaire] = useState<number>(0);
    // const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'addServeuse', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'nom': nom,
                    'salaire': salaire,       
                    'telephone': telephone, 
                    'password': '12345678'           
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    getEmploye();
                    setLoading(false);
                    setAddServeuseShowModal(false);
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
                                Ajouter un(e) serveur(se)
                            </h3>
                            <button
                                type="button"
                                className="justify-center rounded border border-stroke h-8 w-8 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={() => setAddServeuseShowModal(false)}
                            >
                                <span className="opacity-2 text-xl outline-none focus:outline-none">x</span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto rounded-sm">
                            <form onSubmit={handleSubmit}>
                                <div className="p-2 md:w-100 xl:w-100">
                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Nom <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            required
                                            type="text"
                                            onChange={(e) => setNom(e.target.value)}
                                            placeholder="Entrer un  nom"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Téléphone <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="tel"
                                            required
                                            onChange={(e) => setTelephone(e.target.value)}
                                            placeholder="Entrer le numéro"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Mot de passe <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Entrer votre mot de passe"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div> */}

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Salaire <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            onChange={(e) => setSalaire(parseInt(e.target.value))}
                                            placeholder="Entrer le salaire du mois"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/*footer*/}
                        <div className="flex gap-4.5 items-center justify-end p-4 rounded-b border-t border-blue-gray-50">
                            <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onClick={() => setAddServeuseShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="flex justify-center text-white rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                onClick={handleSubmit}
                            >
                                {loading ? "Chargement..." : "Ajouter"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}