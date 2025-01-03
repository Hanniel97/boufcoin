import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import logo from '../assets/icon-512.png'
// import { NavLink } from 'react-router-dom';
// import { Disclosure, Button, DisclosurePanel } from "@headlessui/react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import ThemeChanger from './DarkSwitch';


// const DrawOutlineButton: React.FC<{ children: React.ReactNode }> = ({ children, ...rest }) => {
//     return (
//         <a
//             href="/login"
//             {...rest}
//             className="group relative inline-block px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-blue-300"
//         >
//             <span className="text-xl">{children}</span>

//             {/* TOP */}
//             <span className="absolute left-0 top-0 h-[2px] w-0 bg-blue-300 transition-all duration-100 group-hover:w-full" />

//             {/* RIGHT */}
//             <span className="absolute right-0 top-0 h-0 w-[2px] bg-blue-300 transition-all delay-100 duration-100 group-hover:h-full" />

//             {/* BOTTOM */}
//             <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-blue-300 transition-all delay-200 duration-100 group-hover:w-full" />

//             {/* LEFT */}
//             <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-blue-300 transition-all delay-300 duration-100 group-hover:h-full" />
//         </a>
//     );
// };

export default function Navbar() {
    // const navigation = [
    //     { to: "#hero", label: "Accueil" },
    //     { to: "#features", label: "Fonctionalités" },
    //     // { to: "#pricing", label: "Pricing" },
    //     { to: "#stat", label: "Statistiques" },
    //     // { to: "/", label: "Company" },
    // ];

    // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // const toggleNavbar = () => {
    //     setMobileDrawerOpen(!mobileDrawerOpen);
    // };

    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll<HTMLAnchorElement>('.menu-scroll');
            const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

            sections.forEach((section) => {
                const val = section.getAttribute('href');
                if (val) {
                    const refElement = document.querySelector<HTMLElement>(val);
                    if (refElement) {
                        const scrollTopMinus = scrollPos + 73;
                        if (
                            refElement.offsetTop <= scrollTopMinus &&
                            refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
                        ) {
                            section.classList.add('active');
                        } else {
                            section.classList.remove('active');
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector<HTMLElement>(href);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };



    // return (
    //     <nav className="bg-white border-gray-200 px-4 py-2.5">
    //         <div className="flex justify-between items-center mx-auto max-w-screen-xl">
    //             <a href="/" className="text-xl text-blue-500 font-semibold">Global Gestion</a>

    //             <div className="flex justify-center mt-4">
    //                 <a href="#features" className="mx-4 text-gray-700 hover:text-blue-500">Fonctionnalités</a>
    //                 <a href="#testimonials" className="mx-4 text-gray-700 hover:text-blue-500">Témoignages</a>
    //                 <a href="#pricing" className="mx-4 text-gray-700 hover:text-blue-500">Tarification</a>
    //             </div>

    //             <div className="flex items-center">
    //                 <a href="/login" className="text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2">Connexion</a>
    //                 <a href="/register" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">Commencer ici</a>
    //             </div>
    //         </div>

    //     </nav>
    // );

    return (
        <header className={`navbar top-0 left-0 z-50 w-full sticky border-stroke backdrop-blur-md transition duration-300 ease-in-out dark:border-stroke-dark dark:bg-black ${scrolling ? 'border-b border-blue-gray-400/20' : 'border-b border-transparent'}`}>
            <div className="container px-4 relative lg:text-sm mx-auto max-w-[1400px]">
                <div className="flex items-center justify-between">
                    <div className="block py-4 lg:py-0">
                        <a href="/" className="block max-w-[150px] md:max-w-[190px] sm:max-w-[190px]">
                            <div className="flex items-center flex-shrink-1">
                                <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
                                <span className="text-xl tracking-tight text-primary">BarManager Pro</span>
                            </div>
                        </a>
                    </div>
                    <button
                        type="button"
                        className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
                        aria-label="navbarOpen"
                        name="navbarOpen"
                        onClick={toggleNavbar}
                    >
                        <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
                        <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
                        <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
                    </button>
                    <div className={`menu-wrapper relative ${isNavbarOpen ? 'flex' : 'hidden'} justify-between lg:flex`}>
                        <button
                            type="button"
                            className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
                            name="navbarClose"
                            aria-label="navbarClose"
                            onClick={toggleNavbar}
                        >
                            <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
                            <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
                        </button>
                        <nav
                            className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent"
                        >
                            <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                                {/* <li className="menu-item">
                                    <a
                                        href="#home"
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        Accueil
                                    </a>
                                </li> */}
                                <li className="menu-item">
                                    <a
                                        href="#features"
                                        onClick={(e) => handleClick(e, '#features')}
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        Fonctionnalité
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href="#work-process"
                                        onClick={(e) => handleClick(e, '#work-process')}
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        Comment ça marche
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href="#stat"
                                        onClick={(e) => handleClick(e, '#stat')}
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        Statistiques
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href="#pricing"
                                        onClick={(e) => handleClick(e, '#pricing')}
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        Abonnement
                                    </a>
                                </li>
                                {/* <li className="menu-item">
                                    <a
                                        href="#support"
                                        onClick={(e) => handleClick(e, '#support')}
                                        className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                                    >
                                        A propos
                                    </a>
                                </li> */}
                            </ul>
                        </nav>
                    </div>

                    <div className="mr-[60px] flex items-center justify-end lg:mr-0">
                        <a href="/login"
                            className="hidden py-[10px] px-6 text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary sm:inline-block">
                            Connexion
                        </a>
                        <a href="/register"
                            className="hidden rounded-md bg-primary py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block">
                            Inscription
                        </a>
                    </div>
                </div>
            </div>
        </header>

        // <nav className={`navbar absolute top-0 left-0 z-50 w-full border-stroke bg-transparent dark:border-x-black dark:bg-black backdrop-blur-md transition duration-300 ease-in-out ${scrolling ? 'border-b border-blue-gray-400/20' : 'border-b border-transparent'} px-4 py-2.5 top-0 z-50 sticky`}>
        //     <div className="container px-4 relative lg:text-sm mx-auto max-w-[1400px]">
        //         <div className="flex justify-between items-center">
        //             <div className="flex items-center flex-shrink-0">
        //                 <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
        //                 <span className="text-3xl tracking-tight text-blue-500">BarManager Pro</span>
        //             </div>
        //             <ul className="hidden lg:flex ml-14 space-x-12 text-xl">
        //                 {navigation.map((item, index) => (
        //                     <li key={index}>
        //                         <a href={item.to}>{item.label}</a>
        //                     </li>
        //                 ))}
        //             </ul>
        //             <div className="hidden lg:flex justify-center space-x-12 items-center">
        //                 <DrawOutlineButton>
        //                     Connexion
        //                 </DrawOutlineButton>
        //                 <a
        //                     href="/register"
        //                     className="bg-blue-400 py-2 px-3 rounded-md text-white text-xl hover:bg-blue-600"
        //                 >
        //                     Inscription
        //                 </a>
        //             </div>
        //             <div className="lg:hidden md:flex flex-col justify-end">
        //                 <button type="button" onClick={toggleNavbar}>
        //                     {mobileDrawerOpen ? <X color="#000"/> : <Menu color="#000" />}
        //                 </button>
        //             </div>
        //         </div>

        //         {mobileDrawerOpen && (
        //             <div className="fixed right-0 z-20 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
        //                 <ul>
        //                     {navigation.map((item, index) => (
        //                         <li key={index} className="py-4">
        //                             <a href={item.to}>{item.label}</a>
        //                         </li>
        //                     ))}
        //                 </ul>
        //                 <div className="flex space-x-6">
        //                     <a href="/login" className="py-2 px-3 border rounded-md">
        //                         Connexion
        //                     </a>
        //                     <a
        //                         href="/register"
        //                         className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-400 to-blue-600"
        //                     >
        //                         Créer un compte
        //                     </a>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </nav>
    );
}