import React, { forwardRef } from 'react';
import moment from 'moment/moment';
import logo from '../assets/icon-512.png'
import 'moment/locale/fr'
import { FactureState } from '../type/type';
// import useStore from '../store/useStore';

interface Props {
    vente: FactureState
}

const Receipt = forwardRef<HTMLDivElement, Props>(({vente}, ref) => {
    // const {user} = useStore()

    const table = vente.table.nom;
    const vendeur = vente.vendeur;
    const date = vente.date;
    const produits = vente.produits
    const consignation = vente.consignation.length > 0? vente.consignation : []
    const reglement = vente.reglement.length > 0? vente.reglement: [];
    const total = vente.prixTotal;
    const rendu = vente.monnaie;
    // const statut = vente.statut;
    const numero = vente.numero;
    const isProFormat = vente.isProForma

    const sum = consignation.reduce((accumulator, object) => {
        return accumulator + object.prixConsign;
    }, 0);

    return (
        <div ref={ref} id="ticket" className="p-4 text-xs font-mono w-80">
            <div className="text-center">
                <img src={logo} alt="Logo" className="mx-auto mb-4 w-14 h-auto" />
                <p className="text-[14px] font-extrabold text-black dark:text-white">Bouf'Coin</p>
                <p className="text-black dark:text-white">******************</p>
                {/* <p className="text-[10px] text-black dark:text-white">Test</p> */}
                <p className="text-[10px] text-black dark:text-white">Akassato, Abomey-Calavi, BENIN</p>
                <p className="text-[11px] text-black dark:text-white">Tel: +229 01 97 31 65 02</p>
                <p className="text-black dark:text-white">******************************************</p>
            </div>

            <div className='flex justify-between my-1 text-black dark:text-white'>
                <p>{moment(date).format('L')} {moment(date).format('LTS')}</p>
                <p>Ticket N° {numero}</p>
            </div>
            <div className='flex justify-between text-black dark:text-white'>
                <p>Caisse: {vendeur}</p>
                <p>{table}</p>
            </div>

            <div className="border-t border-zinc-700 border-b my-2 py-2 text-black dark:text-white">
                {produits.map((item, index) => (
                    <div className="flex justify-between">
                        <p className="flex w-40" key={index}>
                            {item.nom}
                        </p>
                        <p className="flex" key={index}>
                            {item.quantity} x {item.prixVente}
                        </p>
                        <p className="flex" key={index}>
                            {item.prixVente*item.quantity}
                        </p>
                    </div>
                ))}
            </div>
            <div className="border-b border-zinc-700 text-black dark:text-white">
                {!isProFormat?
                    <div>
                        <div className='flex justify-between mb-2'>
                            <p>Total en Franc CFA</p>
                            <p>{total}</p>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <p>PAYE</p>
                            <div className="">
                                {reglement.map((item, index) => (
                                    <div className="flex justify-between">
                                        <p className="flex w-40" key={index}>
                                            {item.methode.nom}
                                        </p>
                                        <p className="flex" key={index}>
                                            {item.montant}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <p>Monnaie Restante</p>
                            <p>{rendu}</p>
                        </div>
                    </div>
                    :
                    <div className='flex justify-between mb-2'>
                        <p className="font-extrabold text-[15px] ">Net à payer</p>
                        <p className="font-extrabold text-[15px] ">{total} FCFA</p>
                    </div>
                }
                
                
            </div>
            {consignation.length > 0?
                <div className="mb-2 border-b border-zinc-700 text-black dark:text-white">
                    <div className='flex justify-between '>
                        <p>Consign. B.</p>
                        <div className="">
                            {consignation.map((item, index) => (
                                <div className="flex justify-between">
                                    <p className="flex w-16" key={index}>
                                        {item.bouteille}
                                    </p>
                                    <p className="flex w-16" key={index}>
                                        {item.qte}
                                    </p>
                                    <p className="flex" key={index}>
                                        {item.prixConsign}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className=""></div>
                        <div className="border-t-2 border-zinc-700 w-10"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className=""></div>
                        <p>{sum}</p>
                    </div>
                    {/* <p className="font-extrabold text-center mt-2">NB: Veuillez ramener les bouteilles munie de ce ticket au plus tard dans 48h.</p> */}
                </div>
                :null
            }

            {!isProFormat?
                <div className="text-black dark:text-white">
                    <div className='flex justify-center mb-2 self-center'>
                        <p>MERCI DE VOTRE VISITE A BIENTÖT !</p>
                    </div>
                </div>
                :null
            } 
        </div>
    )
})

export default Receipt;
