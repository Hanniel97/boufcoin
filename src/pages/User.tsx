import React, {useCallback, useEffect, useState} from 'react';
import { GrUpdate } from 'react-icons/gr';
import moment from 'moment'
import 'moment/locale/fr';
import Layout from './Layout';
import Breadcrumb from '../components/Breadcrumb';
import useStore from '../store/useStore';
import AddGerantModal from '../components/AddGerantModal';
import AddServeuseModal from '../components/AddServeuseModal';
import AddPrimeModal from '../components/AddPrimeModal';
import { apiUrl } from '../api/api';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon, } from '@heroicons/react/24/outline'

const User: React.FC = () => {
    const {user, employes, isAuthenticated, setEmploye, setLoading} = useStore();

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

    const getEmploye = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
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
                    // console.log('employe  liste',res)
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
    }, [isAuthenticated, setEmploye, setLoading, user])

    useEffect(() =>  {
        getEmploye()
    }, [getEmploye])

    const [showAddGerantModal, setAddGerantShowModal] = React.useState(false);
    const [showAddServeuseModal, setAddServeuseShowModal] = React.useState(false);
    const [showAddPrimeModal, setAddPrimeShowModal] = React.useState(false);
    const [password, setPassword] = useState<string>('');
    
    const activate = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'activate/' + id, {
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
                        getEmploye()
                        toast.success(res.message)
                    }else{
                        setLoading(false)
                        toast.error("Une erreur est survenue. Réessayer!")
                    }
                })
    
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    const desactive = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'desactivate/' + id, {
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
                        getEmploye()
                    }else{
                        setLoading(false)
                        toast.error("Une erreur est survenue. Réessayer!")
                    }
                })
    
            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }

    const updatePass = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            await fetch(apiUrl +'updatePassGerant', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token
                },
                // credentials: "include",
                body: JSON.stringify({
                    'id': id, 
                    'password': password          
                })
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                if(res.success === true){
                    getEmploye();
                    // setLoading(false);
                    setPassword("")
                    toast.success(res.message)
                }else{
                    setLoading(false);
                    toast.error("Une erreur est survenue. Réessayer!")
                }
            })
            .catch ((error) => {
                console.log(error)
                setLoading(false)
                toast.error("Erreur de connexion")
            }) 
        }
    }

    const handlePayment = async (id: string) => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl +'payerSalaire/' + id, {
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
                        getEmploye()
                        toast.success(res.message)
                    }else{
                        toast.error(res.message)
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

    const filteredItems = employes.filter((item) => {
        return (
            item.nom.toLowerCase().includes(filterText) ||
            item.role.toLowerCase().includes(filterText) ||
            item.salaire.toString().includes(filterText)
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
                    <Breadcrumb pageName="Employés" />

                    <div className="mb-8">
                        <div className="flex gap-2.5">
                            <button
                                onClick={() => {setAddGerantShowModal(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter un gérant
                            </button>

                            <button
                                onClick={() => {setAddServeuseShowModal(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Ajouter une serveuse
                            </button>

                            <button
                                onClick={() => {setAddPrimeShowModal(true)}}
                                className="flex justify-center rounded-md bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                type="button"
                            >
                                Prime sur vente
                            </button>
                        </div>
                    </div>

                    <div className="border border-stroke bg-white rounded-lg px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                        {/* Filtre */}
                        <div className="mb-2 text-left w-full md:w-96">
                            <input
                                id="search"
                                type="text"
                                placeholder="Rechercher par nom, rôle, salaire"
                                value={filterText}
                                onChange={handleFilterChange}
                                className="w-full rounded border-[1.5px] border-blue-gray-200 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="max-h-[calc(85vh-200px)] overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                            Nom
                                        </th>
                                        {/* <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Email
                                        </th> */}
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Téléphone
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Rôle
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Statut
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Salaire
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Salaire Net
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Nbr Ventes
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Prime/Mois
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Change mot de passe
                                        </th>
                                        <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                                            Dernier paiement
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
                                                    {item.nom}
                                                </h5>
                                                {
                                                    item.primeCriteria !== 0 ?
                                                    <p className="text-sm italic">Prime en cours</p>
                                                    :null
                                                }
                                                
                                            </td>
                                            {/* <td className="min-w-[100px] border-b border-[#eee] dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {item.email? item.email : "-"}
                                                </p>
                                            </td> */}
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">
                                                    {item.telephone}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">
                                                    {item.role === "manager"? "Gérant(e)" : "Serveur(se)"}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                    item.active === true ? 'bg-success text-success' : 'bg-danger text-danger'}`}
                                                >
                                                    {item.active === true? "Actif(ve)" : "Non-actif(ve)"}
                                                </p>

                                                {/* <p className="text-black dark:text-white">
                                                    {item.active === true? "Actif(ve)" : "Non-actif(ve)"}
                                                </p> */}
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-bold">
                                                    {formatNumber(item.salaire)}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-bold">
                                                    {formatNumber(item.salaireNet)}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">
                                                    {formatNumber(item.ventesEffectuees)}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-bold">
                                                    {formatNumber(item.primes)}
                                                </p>
                                            </td>
                                            
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="w-full xl:w-45 flex gap-1.5">
                                                    {/* <input
                                                        type="password"
                                                        required
                                                        placeholder="mot de passe"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                    <button
                                                        onClick={() => {updatePass(item._id)}}
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <GrUpdate size={20} color="#FFFFFF"/>
                                                    </button> */}

                                                    {
                                                        item.role === "manager"?
                                                            <>
                                                                <input
                                                                    type="password"
                                                                    required
                                                                    placeholder="mot de passe"
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                />
                                                                <button
                                                                    onClick={() => {updatePass(item._id)}}
                                                                    className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                                                                    type="button"
                                                                >
                                                                    <GrUpdate size={20} color="#FFFFFF"/>
                                                                </button>
                                                            </>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </div>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold">
                                                    {moment(item.dateDernierPaiement).format('LLL')}
                                                </p>
                                            </td>
                                            <td className="min-w-[100px] border-b border-[#eee] py-2 dark:border-strokedark">
                                                <div className="flex gap-2.5">
                                                    {
                                                        item.active === true?
                                                        <button
                                                            onClick={() => {desactive(item._id)}}
                                                            className="flex justify-center rounded-md bg-meta-7 py-2 px-2 font-medium text-white hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            Désactivé
                                                        </button>
                                                        :
                                                        <button
                                                            onClick={() => {activate(item._id)}}
                                                            className="flex justify-center rounded-md bg-meta-3 py-2 px-2 font-medium text-white hover:bg-opacity-90"
                                                            type="button"
                                                        >
                                                            Activé
                                                        </button>
                                                    }

                                                    {/* <button
                                                        // onClick={() => { setEditShowModal(true); setProductEdit(item) }}
                                                        className="flex justify-center items-center rounded-md bg-meta-6/80 py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        <BiSolidEdit size={20} color="#FFFFFF" />
                                                    </button> */}

                                                    <button
                                                        onClick={() => {handlePayment(item._id)}}
                                                        className="flex justify-center items-center rounded-md bg-meta-5 py-2 px-2 font-medium text-white hover:bg-opacity-90"
                                                        type="button"
                                                    >
                                                        Payer
                                                        {/* <FaMoneyBillWave size={20} color="#FFFFFF"/> */}
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

            {showAddServeuseModal && <AddServeuseModal showAddServeuseModal={showAddServeuseModal} setAddServeuseShowModal={setAddServeuseShowModal} getEmploye={getEmploye} />}
            {showAddGerantModal && <AddGerantModal showAddGerantModal={showAddGerantModal} setAddGerantShowModal={setAddGerantShowModal} getEmploye={getEmploye} />}
            {showAddPrimeModal && <AddPrimeModal showAddPrimeModal={showAddPrimeModal} setAddPrimeShowModal={setAddPrimeShowModal} getEmploye={getEmploye} />}
        </>
        
    )
}

export default User;