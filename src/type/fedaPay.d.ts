// src/fedaPay.d.ts
declare var FedaPay: {
    init: (selector: string, options: {
        public_key: string;
        transaction: {
            amount: number;
            description: string;
        };
        customer: {
            email: string;
            lastname: string;
            firstname: string;
        };
    }) => void;
};