interface UserState {
    _id: string,
    nom: string,
    telephone: string,
    password: string,
    token: string,
    role: string,
    active: boolean,
    primeCriteria: number,
    primeAmount: number,
    salaire: number,
    salaireNet: number,
    primes: number,
    ventesEffectuees: number,
    dateDernierPaiement: Date,
};

// export interface BarState {
//     _id: string,
//     ownerId: string,
//     nom: string,
//     logo: string,
//     preferences: {
//         navbarbg: string,
//         navbartest: string,
//         sidebarbg: string,
//         sidebartext: string,
//         text: string,
//         icon:string,
//     },
//     description: string,
//     adresse: string,
//     reference: string,
//     createdAt: string,
//     updatedAt: string,
// }

export interface CategorieState {
    _id: string,
    nom: string,
    createdAt: string,
    updatedAt: string,
}

export interface ProduitState {
    _id: string,
    categorie: CategorieState,
    nom: string,
    stock: number,
    threshold: number,
    stockDate: Date,
    prixAchat: number,
    prixVente: number,
    promotions: [
        {
            quantity: number,
            discountedPrice: number
        }
    ],
    createdAt: Date,
    updatedAt: Date,
};

export interface StockState {
    _id: string,
    user_id: UserState,
    productId: ProduitState,
    quantite: number,
    prix: number,
    desciption: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface EmployeState {
    _id: string,
    nom: string,
    telephone: string,
    password: string,
    token: string,
    role: string,
    active: boolean,
    primeCriteria: number,
    primeAmount: number,
    salaire: number,
    salaireNet: number,
    primes: number,
    ventesEffectuees: number,
    dateDernierPaiement: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface TableState {
    _id: string,
    nom: string,
    numero: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface VenteState {
    _id: string,
    nom: string,
    telephone: string,
    type: string,
    table: {
        _id: string,
        numero: number,
        nom: string,
    },
    vendeur: string,
    date: Date,
    produits: [
        {   
            _id: string,
            product_id: string,
            nom: string, 
            quantity: number, 
            prixVente: number 
        }
    ],
    reglement: [
        {
            methode: {
                _id: string,
                nom: string
            },
            montant: number
        }
    ],
    prixTotal: number,
    monnaie: number,
    serveuse: {
        _id: string,
        nom: string,
    },
    status: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ReglementState {
    _id: string,
    nom: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ConsignationState {
    _id: string,
    commandeId: VenteState,
    bouteille: string,
    status: string,
    qte: number
    prixConsign: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface DepenseState {
    _id: string,
    montant: number,
    categorie: string,
    description: string,
    date: Date,
    employe: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface TransactionState {
    _id: string,
    type: string,
    montant: number,
    reference: string,
    description: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date
}

// export interface AbonnementState {
//     _id: string,
//     ownerId: UserState,
//     type: string,
//     startDate: string,
//     endDate: string,
//     status: string,
//     stripeSubscriptionId: string,
//     createdAt: string,
//     updatedAt: string,
// }

export interface AlerteState {
    _id: string,
    ownerId: UserState,
    productId: ProduitState,
    threshold: number,
    message: string,
    createdAt: Date,
    updatedAt: Date
}

export interface FactureState {
    numero: number,
    commande_id: string,
    barId: string,
    table: {
        _id: string,
        numero: number,
        nom: string,
    },
    date: Date,
    vendeur: string,
    serveuse: {
        _id: string,
        nom: string,
    },
    statut: string,
    isProForma: boolean,
    produits: {
        _id: string,
        product_id: ProduitState,
        nom: string,
        prixVente: number,
        quantity: number,
    }[],
    reglement: {
        methode: {
            _id: string,
            nom: string
        },
        montant: number
    }[],
    consignation: {
        _id: string,
        bouteille: string,
        qte: number,
        prixConsign: number
    }[],
    prixTotal: number,
    monnaie: number,
    createdAt: Date,
    updatedAt: Date,
}