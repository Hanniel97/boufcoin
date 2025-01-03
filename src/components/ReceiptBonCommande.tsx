import React, { forwardRef } from 'react';
import moment from 'moment/moment';
import logo from '../assets/icon-512.png'
import 'moment/locale/fr'
import { FactureState } from '../type/type';
// import useStore from '../store/useStore';
import { BonCommandeState } from '../pages/Ventes';

interface Props {
    vente: FactureState,
    bonCommande: BonCommandeState[]
}

const ReceiptBonCommande = forwardRef<HTMLDivElement, Props>(({vente, bonCommande}, ref) => {

    const table = vente.table.nom;
    const serveuse = vente.serveuse.nom;
    const date = vente.date;
    const numero = vente.numero;

    const sum = bonCommande.reduce((accumulator, object) => {
        return accumulator + object.prixVente*object.quantity;
    }, 0);

    return (
        <div ref={ref} id="ticket" className="p-4 text-xs font-mono w-80">
            <div className="text-center">
                <img src={logo} alt="Logo" className="mx-auto mb-4 w-12 h-auto" />
                <p className="text-[14px] font-extrabold text-black dark:text-white">Bouf'Coin</p>
                <p className="text-black dark:text-white">******************</p>
                <p className="text-[16px] font-extrabold text-black dark:text-white">COMMANDE - REPAS</p>
                <p className="text-black dark:text-white">******************************************</p>
            </div>

            <div className='flex justify-between my-1 text-black dark:text-white'>
                <p>{moment(date).format('L')} {moment(date).format('LTS')}</p>
                <p>Ticket N° {numero}</p>
            </div>
            <div className='flex justify-between text-black dark:text-white'>
                <p className="text-[14px]">Serv: {serveuse}</p>
                <p className="text-[14px]">{table}</p>
            </div>

            <div className="border-t border-zinc-700 border-b my-2 py-2 text-black dark:text-white">
                {bonCommande.map((item, index) => (
                    <div className="flex justify-between my-2">
                        <p className="flex text-[14px]" key={index}>
                            {item.nom}
                        </p>
                        <p className="flex text-[14px] " key={index}>
                            {item.quantity} x {item.prixVente}
                        </p>
                        <p className="flex text-[14px]" key={index}>
                            {item.prixVente*item.quantity}
                        </p>
                    </div>
                ))}
            </div>

            <div className='flex justify-between mb-2 text-black dark:text-white'>
                <p className="font-extrabold text-[18px]">Total</p>
                <p className="font-extrabold text-[18px]">{sum} FCFA</p>
            </div>
        </div>
    )
})

export default ReceiptBonCommande;
