import { create, } from 'zustand';
import {
    UserState, CategorieState, ProduitState, StockState, EmployeState, TableState, VenteState, ReglementState,
    ConsignationState, DepenseState, TransactionState, AlerteState
} from '../type/type';
// import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
    appLoading: boolean,
    loading: boolean,
    user: UserState,
    isAuthenticated: boolean,
    collapsed: boolean,
    categories: CategorieState[],
    clientSecret: string,
    produits: ProduitState[],
    stock: StockState[],
    employes: EmployeState[],
    tables: TableState[];
    serveuses: EmployeState[],
    ventes: VenteState[],
    reglements: ReglementState[],
    consignations: ConsignationState[],
    reliquats: VenteState[],
    depenses: DepenseState[],
    transactions: TransactionState[],
    alertes: AlerteState[],
    setAppLoading: (appLoading: boolean) => void;
    setLoading: (loading: boolean) => void;
    setUser: (newUser: UserState) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
    setCategorie: (categories: CategorieState[]) => void;
    setClientSecret: (clientSecret: string) => void;
    setProduit: (produits: ProduitState[]) => void;
    setStock: (stock: StockState[]) => void;
    setEmploye: (employes: EmployeState[]) => void;
    setTable: (tables: TableState[]) => void;
    setServeuse: (serveuse: EmployeState[]) => void;
    setVente: (ventes: VenteState[]) => void;
    setReglement: (reglements: ReglementState[]) => void;
    setConsignation: (consignations: ConsignationState[]) => void;
    setReliquat: (reliquats: VenteState[]) => void;
    setDepenses: (depenses: DepenseState[]) => void;
    setTransaction: (transactions: TransactionState[]) => void;
    setAlertes: (alertes: AlerteState[]) => void;
}

const useStore = create<Store>((set) => ({
    appLoading: false,
    loading: false,
    user: {
        _id: '',
        email: '',
        nom: '',
        telephone: '',
        password: '',
        token: '',
        role: '',
        ownerId: '',
        barId: '',
        active: false,
        primeCriteria: 0,
        primeAmount: 0,
        salaire: 0,
        salaireNet: 0,
        primes: 0,
        ventesEffectuees: 0,
        dateDernierPaiement: new Date(),
    },
    bar: {
        _id: "",
        ownerId: "",
        nom: "",
        logo: "",
        preferences: {
            navbarbg: "#ffffff",
            navbartest: "#263238",
            sidebarbg: "#ffffff",
            sidebartext: "#263238",
            text: "#000000",
            icon: "#455a64",
        },
        description: "",
        adresse: "",
        createdAt: "",
        updatedAt: "",
        reference: ''
    },
    isAuthenticated: false,
    collapsed: false,
    categories: [],
    clientSecret: "",
    produits: [],
    stock: [],
    employes: [],
    tables: [],
    serveuses: [],
    ventes: [],
    reglements: [],
    consignations: [],
    reliquats: [],
    depenses: [],
    transactions: [],
    abonnement: {
        _id: '',
        ownerId: {
            _id: '',
            email: '',
            nom: '',
            telephone: '',
            password: '',
            token: '',
            role: '',
            ownerId: '',
            barId: '',
            active: false,
            primeCriteria: 0,
            primeAmount: 0,
            salaire: 0,
            salaireNet: 0,
            primes: 0,
            ventesEffectuees: 0,
            dateDernierPaiement: new Date(),
        },
        barId: {
            _id: '',
            ownerId: '',
            nom: '',
            logo: '',
            preferences: {
                navbarbg: '',
                navbartest: '',
                sidebarbg: '',
                sidebartext: '',
                text: '',
                icon: ''
            },
            description: '',
            adresse: '',
            createdAt: '',
            updatedAt: '',
            reference: ''
        },
        type: "",
        startDate: "",
        endDate: "",
        status: "",
        stripeSubscriptionId: "",
        createdAt: "",
        updatedAt: ""
    },
    alertes: [],
    setAppLoading: (appLoading) => set({ appLoading: appLoading }),
    setLoading: (loading) => set({ loading: loading }),
    setUser: (newUser) => set({ user: newUser }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated: isAuthenticated }),
    setCollapsed: (collapsed) => set({ collapsed: !collapsed }),
    setCategorie: (categories) => set({ categories: categories }),
    setClientSecret: (clientSecret) => set({ clientSecret: clientSecret }),
    setProduit: (produits) => set({ produits: produits }),
    setStock: (stock) => set({ stock: stock }),
    setEmploye: (employes) => set({ employes: employes }),
    setTable: (tables) => set({ tables: tables }),
    setServeuse: (serveuses) => set({ serveuses: serveuses }),
    setVente: (ventes) => set({ ventes: ventes }),
    setReglement: (reglements) => set({ reglements: reglements }),
    setConsignation: (consignations) => set({ consignations: consignations }),
    setReliquat: (reliquats) => set({ reliquats: reliquats }),
    setDepenses: (depenses) => set({ depenses: depenses }),
    setTransaction: (transactions) => set({ transactions: transactions }),
    setAlertes: (alertes) => set({ alertes: alertes }),
}))

export default useStore;