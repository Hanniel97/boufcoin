// // TableComponent.tsx
// import React from 'react';

// interface TableProps {
//     x: number;
//     y: number;
//     number: number;
//     status: string;
//     onClick: () => void;
// }

// const TableComponent: React.FC<TableProps> = ({ x, y, number, status, onClick }) => {
//     return (
//         <div
//             className={`absolute w-12 h-12 flex items-center justify-center text-white text-lg cursor-pointer ${
//                 status === 'occupée' ? 'bg-red-500' : 'bg-green-500'
//             }`}
//             style={{ left: x, top: y }}
//             onClick={onClick}
//         >
//             {number}
//         </div>
//     );
// };

// export default TableComponent;


// import React from 'react';

// interface TableProps {
//     number: number;
//     status: string;
//     onClick: () => void;
// }

// const TableComponent: React.FC<TableProps> = ({ number, status, onClick }) => {
//     return (
//         <div
//             className={`flex items-center justify-center w-full h-20 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
//                 status === 'occupée' ? 'bg-red-500' : 'bg-green-500'
//             }`}
//             onClick={onClick}
//         >
//             <span className="text-white text-lg font-bold">{number}</span>
//         </div>
//     );
// };

// export default TableComponent;


import React from 'react';
import { TableState } from '../type/type';

// interface Table {
//     _id: string;
//     numero: number;
//     status: 'libre' | 'occupée';
// }

interface TableListProps {
    tables: TableState[];
    onTableClick: (index: number) => void;
}

const TableComponent: React.FC<TableListProps> = ({ tables, onTableClick }) => {
    return (
        <div className="p-4">
            {/* <h1 className="text-2xl text-center my-4">Liste des Tables</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tables.map((table, index) => (
                    <div
                        key={table._id}
                        className={`p-4 rounded-lg shadow-lg text-center ${
                            table.status === 'occupée' ? 'bg-red-500' : 'bg-green-500'
                        } cursor-pointer`}
                        onClick={() => onTableClick(index)}
                    >
                        <h2 className="text-white text-lg font-bold">{table.nom}</h2>
                        <p className="text-white">{table.status === 'occupée' ? 'Occupée' : 'Libre'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableComponent;