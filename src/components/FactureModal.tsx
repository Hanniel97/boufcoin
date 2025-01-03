import React, { useRef } from 'react';
// import ReactModal from 'react-modal';
import { useReactToPrint } from 'react-to-print';
// import toast from 'react-hot-toast';
import { FactureState } from '../type/type';
import Receipt from './Receipt';

interface Props {
    vente: FactureState,
    isOpen: boolean,
    onRequestClose: Function,
}

export default function FactureModal({vente, isOpen, onRequestClose}: Props){
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current ?? null,
    });

    return(
        <>
            <div className="justify-center items-center flex bg-black/50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <Receipt ref={componentRef} vente={vente} />

                        <div className="flex gap-4.5 items-center justify-end p-4 rounded-b border-t border-blue-gray-50">
                            <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onClick={() => onRequestClose()}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                                onClick={() => {handlePrint(); onRequestClose()}}
                            >
                                Imprimer le Ticket
                            </button>
                        </div>
                        {/* <button
                            type="button"
                            onClick={() => {handlePrint(); onRequestClose()}}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Imprimer le Ticket
                        </button> */}
                    </div>
                </div>
            </div>
        </>
        // <ReactModal
        //     isOpen={isOpen}
        //     // onRequestClose={onRequestClose}
        //     contentLabel="Facture"
        //     className="modal"
        //     overlayClassName="overlay"
        // >
        //     <div className="w-80 place-content-center">
        //         <Receipt ref={componentRef} vente={vente} />
        //         <button
        //             type="button"
        //             onClick={() => {handlePrint(); onRequestClose()}}
        //             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        //         >
        //             Imprimer le Ticket
        //         </button>
                
        //     </div>
        // </ReactModal>
    )
}