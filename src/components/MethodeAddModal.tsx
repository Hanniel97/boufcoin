import React, {useState} from "react";
import { apiUrl } from "../api/api";
import useStore from "../store/useStore";
import toast from "react-hot-toast";

interface Modal {
    showModalAddMethode: boolean;
    setShowModalAddMethode: Function;
    getReglement: Function;
}

export default function MethodeAddModal({showModalAddMethode, setShowModalAddMethode, getReglement} : Modal) {
    const {user, isAuthenticated} = useStore();

    const [nom, setNom] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'addReglement', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'nom': nom,            
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    setLoading(false)
                    getReglement();
                    setShowModalAddMethode(false)
                    toast.success(res.message)
                }else{
                    setLoading(false)
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
                                Ajouter une méthode de paiement
                            </h3>
                            <button
                                type="button"
                                className="justify-center rounded border border-stroke h-8 w-8 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={() => setShowModalAddMethode(false)}
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
                                                Nom de la méthode <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="text"
                                            required
                                            onChange={(e) => setNom(e.target.value)}
                                            placeholder="Entrer le nom de la méthode"
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
                                onClick={() => setShowModalAddMethode(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                onClick={handleSubmit}
                            >
                                {loading ? "Chargement..." : "Ajouter"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}