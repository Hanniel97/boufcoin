import React, { useState } from 'react';
import logo from "../../assets/logo.png"
import { apiUrl } from '../../api/api';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Fonction pour basculer l'affichage du mot de passe
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const { setUser, setIsAuthenticated } = useStore()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoad(true)
        try {
            await fetch(apiUrl + 'login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                // credentials: "include",
                body: JSON.stringify({
                    'nom': nom,
                    'password': password,
                })
            })
                .then(response => response.json())
                .then(res => {
                    // console.log(' login response  ', res)
                    if (res.success === true) {
                        toast.success("Connecter")
                        setUser(res.user);
                        window.localStorage.setItem('userData', JSON.stringify(res.user));
                        setIsAuthenticated(true);
                        setLoad(false)
                        navigate('/dashboard')
                    } else {
                        toast.error(res.message)
                        setLoad(false)
                    }
                })
        } catch (error) {
            console.error(error);
            setLoad(false)
            toast.error("Erreur de connexion")
        }
    };

    const onNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNom(event.target.value)
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value)
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-radial-warm"></div>

            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg max-w-4xl p-5 backdrop-blur-lg">
                    <div className="hidden md:block w-1/2">
                        <img
                            className="rounded-lg"
                            src={logo}
                            alt="Login Cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-5">
                        <div className="text-center mb-5">
                            <h3 className="text-[#D97C2B] lg:text-3xl text-2xl font-extrabold max-md:text-center">Connexion</h3>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600 mt-1">Entrer votre nom et mot de passe</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="text-left my-2">
                                <label className="text-gray-800 text-sm font-medium mb-2" htmlFor="nom">Nom d'utilisateur</label>
                                <div className="relative flex items-center">
                                    <input name="nom" type="nom" id="nom" placeholder="john" value={nom} onChange={onNomChange} required className="w-full bg-transparent mt-1 block p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E85213] focus:border-[#E85213]" />
                                    <svg
                                        viewBox="0 0 448 512"
                                        fill="currentColor"
                                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                    >
                                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-left my-2">
                                <label className="text-gray-800 text-sm font-medium mb-2" htmlFor="password">
                                    Mot de passe
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        id="password"
                                        value={password}
                                        onChange={onPasswordChange}
                                        required
                                        className="w-full bg-transparent mt-1 block p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E85213] focus:border-[#E85213]"
                                    />
                                    {showPassword ? (
                                        <svg
                                            onClick={togglePasswordVisibility}
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 011.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 011.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" />
                                        </svg>)
                                        :
                                        (<svg
                                            onClick={togglePasswordVisibility}
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>)
                                    }
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={load}
                                className="w-full py-2 px-4 bg-[#E85213] hover:bg-[#D97C2B] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {load ? "Chargement..." : "Se connecter"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
