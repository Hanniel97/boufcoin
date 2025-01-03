import { useCallback, useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { apiUrl } from "../../api/api";
import toast from "react-hot-toast";

type DataState = {
    // logo: string;
    nom: string;
    quantite: number;
    revenu: string;
    benefice: number;
    stock: number;
};

const TableOne = () => {
    const {user, isAuthenticated, setLoading} = useStore()

    const [data, setData] = useState<DataState[]>([]);

    const formatNumber = (number: Number | String) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    
    const getStats = useCallback(async () => {
        if(user && isAuthenticated){
            setLoading(true)
            try {
                await fetch(apiUrl + `getTopTenProducts`, {
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
                    // console.log('statistique   ',res)
                    if(res.success === true){
                        setData(res.data)
                        console.log(res)
                        setLoading(false)
                    }
                })
                .catch(() => {
                    setLoading(false)
                    toast.error('Une erreur est survenue lors de la récupération des données')
                    console.error('Erreur de connexion')
                })

            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
    }, [isAuthenticated, setLoading, user]) 

    useEffect(() => {
        getStats()
    }, [getStats])

    
    return (
        <div className="rounded-sm border border-[#F2C94C]/40 dark:border-[#F2C94C]/40 dark:bg-boxdark bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Top 10 produits vendus
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 text-black dark:text-white">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Nom
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Qté. vendus
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Revenues
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Bénéfices
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Stock
                        </h5>
                    </div>
                </div>

                {data.map((item, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${
                        key === data.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                        }`}
                        key={key}
                    >
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white font-semibold">{item.nom}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white font-semibold">{formatNumber(item.quantite)}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3 font-bold">{formatNumber(item.revenu)} FCFA</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white font-bold">{formatNumber(item.benefice)} FCFA</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5 font-semibold">{formatNumber(item.stock)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
