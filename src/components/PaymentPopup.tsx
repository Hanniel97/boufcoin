import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import { VenteState } from '../type/type';

interface Props {
    vente: VenteState,
    setReliquat: Function,
    setNewPayment: Function,
    onClose: Function,
}

type PaymentMethod = {
    nom: string;
    [key: string]: any;
};

type Payment = {
    methode: PaymentMethod;
    montant: number;
};

const PaymentPopup = ({vente, setReliquat, setNewPayment, onClose}: Props) => {
    const {reglements} = useStore();

    const [payments, setPayments] = useState<Payment[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(0);

    

const addPayment = () => {
    if (!paymentMethod || paymentAmount <= 0) {
        toast.error('Veuillez sélectionner une méthode de paiement et entrer un montant valide.');
        return;
    }
    const regle = reglements.find((item) => item.nom === paymentMethod);
    const newPayments: Payment[] = [...payments, { methode: regle!, montant: paymentAmount }];
    setPayments(newPayments);
    setPaymentMethod('');
    setPaymentAmount(0);
};

    const handleSubmit = () => {
        if (getTotalPaid() < vente.prixTotal) {
            toast.error('Le montant total n\'est pas encore réglé.');
        } else {
            if(getTotalPaid() > vente.prixTotal){
                setReliquat(getTotalPaid() - vente.prixTotal)
            }else{
                setReliquat(0)
            }
            setNewPayment(payments)
            onClose();

            // console.log('mon paiement', payments)
        }
    };

    const getTotalPaid = () => payments.reduce((sum, payment) => sum += payment.montant, 0);

    const removePayment = (index: number) => {
        const newPayments = payments.filter((_, i) => i !== index);
        setPayments(newPayments);
    };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-blue-gray-900/90 bg-opacity-75">
            <div className="border outline-none focus:outline-none border-gray-500 bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg xl:w-1/2 sm:w-1/2 px-5 py-5 sm:px-7.5 xl:pb-4 my-4">
                <h2 className="text-lg text-left font-bold mb-2 text-black dark:text-white">Règlement de la facture</h2>
                <form onSubmit={addPayment} className="mb-6 gap-4 text-left overflow-y-auto max-h-100">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                        <div className="flex-1 max-w-xl mr-3">
                            <label className="block text-black dark:text-white">
                                Moyen de règlement
                            </label>
                            <select
                                name="methode"
                                required
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Choisir une méthode de paiement</option>
                                {reglements.map(item => (
                                    <option key={item._id} value={item.nom}>
                                        {item.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="max-w-2xl">
                            <label className="block text-black dark:text-white">
                                Montant
                            </label>
                            <input
                                type="number"
                                name="montant"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                                min={0}
                                required
                                className="rounded border-[1.5px] w-36 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="flex items-end max-w-xl">
                            <button
                                type="button"
                                onClick={addPayment}
                                className="bg-primary text-black font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                <p className="dark:text-white text-white">
                                    Ajouter
                                </p>
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mb-4.5 rounded-lg bg-gray/70 p-3 dark:border-strokedark dark:bg-boxdark">
                    <h3 className="text-xl font-semibold mb-4 text-black dark:text-white text-left">Règlements ajoutés:</h3>

                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[100px] py-2 font-medium text-black dark:text-white xl:pl-11">
                                    Methode
                                </th>
                                <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                    Montant
                                </th>
                                <th className="min-w-[100px] py-2 font-medium text-black dark:text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((item, index) => (
                                <tr key={index} className="text-left">
                                    <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {item.methode.nom}
                                        </h5>
                                        {/* <p className="text-sm">${item.stock}</p> */}
                                    </td>
                                    <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {item.montant}
                                        </p>
                                    </td>
                                    <td className="min-w-[100px] border-b border-[#eee] py-1 dark:border-strokedark">
                                        <div className="flex gap-2.5">
                                            <button
                                                onClick={() => removePayment(index)}
                                                className="flex justify-center items-center rounded-md bg-meta-7 py-2 px-2 font-medium text-white hover:bg-opacity-90"
                                                type="button"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-left">
                    <p className="text-sm font-bold text-black dark:text-white">Total réglé: {getTotalPaid()} FCFA / {vente.prixTotal} FCFA</p>
                    {
                        getTotalPaid() > vente.prixTotal?
                        <p className="text-sm font-bold text-black dark:text-white">Reliquat: {getTotalPaid() - vente.prixTotal} FCFA</p>
                        : null
                    }
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
                        className="flex justify-center rounded bg-green-400 hover:bg-green-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={handleSubmit}
                    >
                        <p className="text-white dark:text-white">
                            Valider
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentPopup;