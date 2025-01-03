import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"
import 'aos/dist/aos.css'; // Importer les styles AOS
import AOS from 'aos';
// import { createBrowserHistory } from 'history'
import { ThemeProvider } from './context/ThemeContext';
// import { ThemeProvider } from "next-themes";
// import logo from './logo.svg';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
import './App.css';
import Login from './pages/Auth/Login';
// import LoginGerant from './pages/Auth/LoginGerant';
import Register from './pages/Auth/Register';
// import Main from './pages/Main';
// import StripeContainer from './components/StripeContainer';
import Dashboard from './pages/Dashboard';
import Ventes from './pages/Ventes';
import CommandeClient from './pages/CommandeClient';
import Reservations from './pages/Reservation';
import Produits from './pages/Produits';
import Aprovisionnement from './pages/Approvisionnement';
import User from './pages/User';
import Table from './pages/Table';
import Consignation from './pages/Consignation';
import Reliquat from './pages/Reliquat';
// import Profile from './pages/Profile';
import Rapport from './pages/Rapport';
import Depense from './pages/Depense';
// import FormuleAbonnement from './pages/FormuleAbonnement';
// import Abonnement from './pages/Abonnement';
// import Return from './pages/Return';
import Caisse from './pages/Caisse';
import RapportMensuel from './pages/RapportMensuel';
import RapportProduit from './pages/RapportProduit';
import Alertes from './pages/Alertes';
// import RestaurantLayout from './pages/RestaurantLayout';
// import Conditions from './components/Cgu';
import {Loader} from './components/Loader';
import useStore from './store/useStore';
// import Politique from './components/Politique';
// import About from './components/About';
// import Cookies from './components/Cookies';

// const stripePromise = loadStripe('pk_test_51Km1YeIckabNqUxzV1qacN6Ki3HbR34XOnP3WSQAEmChawa64DvJlX4okb4lYPD3td4Q9FcfEPbDQo68sYp2zioa009clLgRlq');

// const history = createBrowserHistory()

AOS.init();

function App() {
  const {appLoading, user, isAuthenticated, setUser, setIsAuthenticated} = useStore()

  useEffect(() => {
    const item = window.localStorage.getItem("userData");

    if(item){
      setUser(JSON.parse(item))
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
    }

  }, [setIsAuthenticated, setUser])

  // const [loading, setLoading] = useState<boolean>(false);

  // let stripePromise: Promise<Stripe | null>;
  // const getStripe = (): Promise<Stripe | null> => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe('pk_test_51Km1YeIckabNqUxzV1qacN6Ki3HbR34XOnP3WSQAEmChawa64DvJlX4okb4lYPD3td4Q9FcfEPbDQo68sYp2zioa009clLgRlq' || '');
  //   }
  //   return stripePromise;
  // };

  // const options = {
  //   clientSecret: clientSecret,
  // };
  
  return appLoading? (
    <Loader/>
  ) : (
    <ThemeProvider>
      {/* <Elements stripe={stripePromise} > */}
        <div className="App scroll-smooth focus:scroll-auto">
        <Router>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ventes" element={<Ventes />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/commandes" element={<CommandeClient />} />
                <Route path="/produits" element={<Produits />} />
                <Route path="/approvisionnement" element={<Aprovisionnement />} />
                <Route path="/employe" element={<User />} />
                <Route path="/table" element={<Table />} />
                <Route path="/consignations" element={<Consignation />} />
                <Route path="/reliquat" element={<Reliquat />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/rapport" element={<Rapport />} />
                <Route path="/depenses" element={<Depense />} />
                <Route path="/caisses" element={<Caisse />} />
                {/* <Route path="/formule" element={<FormuleAbonnement />} /> */}
                {/* <Route path="/abonnement/:type" element={<Abonnement />} /> */}
                {/* <Route path="/return" element={<Return />} /> */}
                <Route path="/rapportMensuel" element={<RapportMensuel />} />
                <Route path="/rapportProduit" element={<RapportProduit />} />
                <Route path="/alertes" element={<Alertes />} />
                {/* <Route path="/disposition" element={<RestaurantLayout />} /> */}
                <Route path="*" element={<Navigate to={user.role === "admin"? "/dashboard" : "/ventes"} replace />} /> {/* Redirection par défaut */}
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                {/* <Route path="/cgu" element={<Conditions />} /> */}
                {/* <Route path="/confidentialite" element={<Politique />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/cookies" element={<Cookies />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/login-gerant" element={<LoginGerant />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirection par défaut */}
              </>
            )}
          </Routes>
        </Router>
          <Toaster
            position="top-center"
            toastOptions={{ className: "react-hot-toast" }}
          />
        </div>
      {/* </Elements> */}
    </ThemeProvider>
  );
}

export default App;
