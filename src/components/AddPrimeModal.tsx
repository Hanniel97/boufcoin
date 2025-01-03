import React, { useState } from "react";
import useStore from "../store/useStore";
import { apiUrl } from "../api/api";
import toast from "react-hot-toast";


interface Modal {
    showAddPrimeModal: boolean;
    setAddPrimeShowModal: Function,
    getEmploye: Function,
}

export default function AddPrimeModal({showAddPrimeModal, setAddPrimeShowModal, getEmploye} : Modal) {
    const {user, employes, isAuthenticated} = useStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };
    const [primeCriteria, setPrimeCriteria] = useState(0);
    const [primeAmount, setPrimeAmount] = useState(0);
    const [employeId, setEmployeId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'addPrime', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'id': employeId,
                    'primeCriteria': primeCriteria,       
                    'primeAmount': primeAmount,            
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    getEmploye();
                    setLoading(false);
                    setAddPrimeShowModal(false);
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
                                Ajouter prime sur salaire
                            </h3>
                            <button
                                type="button"
                                className="justify-center rounded border border-stroke h-8 w-8 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={() => setAddPrimeShowModal(false)}
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
                                                Employé <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => {
                                                    setEmployeId(e.target.value)
                                                    setSelectedOption(e.target.value);
                                                    changeTextColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                                    isOptionSelected ? 'text-black dark:text-white' : 'dark:text-bodydark text-black'
                                                }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Ajouter un employé
                                                </option>
                                                {
                                                    employes.map((item) => (
                                                        <option value={item._id} id={item._id} className="text-body dark:text-bodydark">
                                                            {item.nom}
                                                        </option>
                                                    ))
                                                }
                                                
                                            </select>

                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Vente à effectuée <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="number"
                                            required
                                            min={1}
                                            onChange={(e) => setPrimeCriteria(parseInt(e.target.value))}
                                            placeholder="Entrer le nombre de vente a effectué"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Prime en FCFA <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            onChange={(e) => setPrimeAmount(parseInt(e.target.value))}
                                            placeholder="Entrer le montant de la prime"
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
                                onClick={() => setAddPrimeShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="flex justify-center rounded text-white bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
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