import React, { useCallback, useEffect, useState } from "react";
import useStore from "../store/useStore";
import { apiUrl } from "../api/api";
import { DepenseState } from "../type/type";
import toast from "react-hot-toast";

interface Modal {
    showEditModal: boolean;
    setEditShowModal: Function,
    getDepense: Function,
    depense: DepenseState,
    setDepenseEdit: Function
}

export default function EditDepenseModal({showEditModal, setEditShowModal, getDepense, depense, setDepenseEdit} : Modal) {
    const {user, employes, isAuthenticated, setEmploye} = useStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(depense.categorie);
    const [selectedOption2, setSelectedOption2] = useState<string>(depense.employe);
    const [isOptionSelected] = useState<boolean>(false);
    const [isOptionSelected2] = useState<boolean>(false);

    const [categorie, setCategorie] = useState(depense.categorie);
    const [montant, setMontant] = useState(depense.montant.toString());
    const [employe, setEmploy] = useState(depense.employe);
    const [description, setDescription] = useState(depense.description);

    const getEmploye = useCallback(async () => {
        if(user && isAuthenticated){
            try {
                await fetch(apiUrl +'getEmploye', {
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
                    // console.log('employe',res)
                    if(res.success === true){
                        setEmploye(res.data)
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
    }, [isAuthenticated, setEmploye, user])

    useEffect(() =>  {
        getEmploye()
    }, [getEmploye])
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'updateDepense/'+depense._id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'categorie': categorie,       
                    'montant': montant,   
                    'statut': categorie === "EMPLOYES" ? 'dette' : 'réglé',         
                    'description': description,            
                    'employe': employe,     
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    getDepense();
                    setLoading(false);
                    setDepenseEdit()
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
                                Modifier une dépense
                            </h3>
                            <button
                                type="button"
                                className="justify-center rounded border border-stroke h-8 w-8 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={() => setEditShowModal(false)}
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
                                                Catégorie <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => {
                                                    setCategorie(e.target.value)
                                                    setSelectedOption(e.target.value);
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                                    isOptionSelected ? 'text-black dark:text-white' : 'dark:text-bodydark text-black'
                                                }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Choisissez la catégorie
                                                </option>
                                                <option value="APPROVISIONNEMENT" className="text-body dark:text-bodydark">
                                                    APPROVISIONNEMENT
                                                </option>
                                                <option value="ENTRETIEN" className="text-body dark:text-bodydark">
                                                    ENTRETIEN
                                                </option>
                                                <option value="EMPLOYES" className="text-body dark:text-bodydark">
                                                    EMPLOYES
                                                </option>
                                                <option value="FOURNITURES" className="text-body dark:text-bodydark">
                                                    FOURNITURES
                                                </option>
                                                <option value="REPARATIONS" className="text-body dark:text-bodydark">
                                                    REPARATIONS
                                                </option>
                                                <option value="AUTRES" className="text-body dark:text-bodydark">
                                                    AUTRES
                                                </option>
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

                                    {categorie === "EMPLOYES" && <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Employé <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption2}
                                                onChange={(e) => {
                                                    setEmploy(e.target.value)
                                                    setSelectedOption2(e.target.value);
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                                    isOptionSelected2 ? 'text-black dark:text-white' : 'dark:text-bodydark text-black'
                                                }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Ajouter un employé
                                                </option>
                                                {
                                                    employes.map((item) => (
                                                        <option value={item.nom} id={item._id} className="text-body dark:text-bodydark">
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
                                    </div>}

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Montant <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="number"
                                            required
                                            min={1}
                                            value={montant}
                                            onChange={(e) => setMontant(e.target.value)}
                                            placeholder="Entrer le montant"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <div className="flex">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Description <span className="text-meta-1">*</span>
                                            </label>
                                        </div>
                                        
                                        <input
                                            type="text"
                                            required
                                            min={0}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Ajouter une description"
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
                                onClick={() => setEditShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="flex justify-center rounded text-white bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                onClick={handleSubmit}
                            >
                                {loading ? "Chargement..." : "Modifier"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}