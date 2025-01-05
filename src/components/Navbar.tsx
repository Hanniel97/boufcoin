import logo from '../assets/icon-512.png'
import React from 'react';

interface NavbarProps {
    cartItemCount: number; // Nombre d'articles dans le panier
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
    return (
        <nav className="bg-[#E85213] shadow-md navbar top-0 left-0 z-50 w-full sticky">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* <img 
                            src={logo}
                            alt="Logo du bar" 
                            className="h-10 w-10 mr-2" 
                        /> */}
                        <div className="h-12 w-12 rounded-2xl justify-center items-center content-center border-2 border-white dark:border-blue-gray-100/50 mr-2">
                            <img src={logo} alt="Logo" className={`cursor-pointer duration-500 rounded-2xl`} />
                        </div>
                        <span className="text-xl font-bold text-white">Bouf'Coin</span>
                    </div>
                    <div className="flex items-center">
                        <button className="relative">
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h18M3 3v18h18V3M3 21h18"
                                />
                            </svg> */}

                            <svg
                                width="30"
                                height="30"
                                fill="currentColor"
                                viewBox="0 0 576 512"
                            >
                                <path fill='#ffffff' d="M0 24C0 10.7 10.7 0 24 0h45.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5l-51.6-271c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zm128 440a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#FFB74D] text-white text-xs font-bold rounded-full px-1">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Menu, X } from "lucide-react";
// import logo from '../assets/icon-512.png'
// // import { NavLink } from 'react-router-dom';
// // import { Disclosure, Button, DisclosurePanel } from "@headlessui/react";
// // import { NavLink, useNavigate, useLocation } from "react-router-dom";
// // import ThemeChanger from './DarkSwitch';


// // const DrawOutlineButton: React.FC<{ children: React.ReactNode }> = ({ children, ...rest }) => {
// //     return (
// //         <a
// //             href="/login"
// //             {...rest}
// //             className="group relative inline-block px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-blue-300"
// //         >
// //             <span className="text-xl">{children}</span>

// //             {/* TOP */}
// //             <span className="absolute left-0 top-0 h-[2px] w-0 bg-blue-300 transition-all duration-100 group-hover:w-full" />

// //             {/* RIGHT */}
// //             <span className="absolute right-0 top-0 h-0 w-[2px] bg-blue-300 transition-all delay-100 duration-100 group-hover:h-full" />

// //             {/* BOTTOM */}
// //             <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-blue-300 transition-all delay-200 duration-100 group-hover:w-full" />

// //             {/* LEFT */}
// //             <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-blue-300 transition-all delay-300 duration-100 group-hover:h-full" />
// //         </a>
// //     );
// // };

// export default function Navbar() {
//     // const navigation = [
//     //     { to: "#hero", label: "Accueil" },
//     //     { to: "#features", label: "Fonctionalités" },
//     //     // { to: "#pricing", label: "Pricing" },
//     //     { to: "#stat", label: "Statistiques" },
//     //     // { to: "/", label: "Company" },
//     // ];

//     // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//     // const toggleNavbar = () => {
//     //     setMobileDrawerOpen(!mobileDrawerOpen);
//     // };

//     const [scrolling, setScrolling] = useState(false);

//     const handleScroll = () => {
//         if (window.scrollY > 0) {
//             setScrolling(true);
//         } else {
//             setScrolling(false);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const [isNavbarOpen, setIsNavbarOpen] = useState(false);

//     const toggleNavbar = () => {
//         setIsNavbarOpen(!isNavbarOpen);
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             const sections = document.querySelectorAll<HTMLAnchorElement>('.menu-scroll');
//             const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

//             sections.forEach((section) => {
//                 const val = section.getAttribute('href');
//                 if (val) {
//                     const refElement = document.querySelector<HTMLElement>(val);
//                     if (refElement) {
//                         const scrollTopMinus = scrollPos + 73;
//                         if (
//                             refElement.offsetTop <= scrollTopMinus &&
//                             refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
//                         ) {
//                             section.classList.add('active');
//                         } else {
//                             section.classList.remove('active');
//                         }
//                     }
//                 }
//             });
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//         e.preventDefault();
//         const targetElement = document.querySelector<HTMLElement>(href);
//         if (targetElement) {
//             targetElement.scrollIntoView({
//                 behavior: 'smooth',
//             });
//         }
//     };



//     // return (
//     //     <nav className="bg-white border-gray-200 px-4 py-2.5">
//     //         <div className="flex justify-between items-center mx-auto max-w-screen-xl">
//     //             <a href="/" className="text-xl text-blue-500 font-semibold">Global Gestion</a>

//     //             <div className="flex justify-center mt-4">
//     //                 <a href="#features" className="mx-4 text-gray-700 hover:text-blue-500">Fonctionnalités</a>
//     //                 <a href="#testimonials" className="mx-4 text-gray-700 hover:text-blue-500">Témoignages</a>
//     //                 <a href="#pricing" className="mx-4 text-gray-700 hover:text-blue-500">Tarification</a>
//     //             </div>

//     //             <div className="flex items-center">
//     //                 <a href="/login" className="text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2">Connexion</a>
//     //                 <a href="/register" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">Commencer ici</a>
//     //             </div>
//     //         </div>

//     //     </nav>
//     // );

//     return (
//         <header className={`navbar top-0 left-0 z-50 w-full py-2 sticky bg-[#E85213] border-stroke backdrop-blur-md transition duration-300 ease-in-out dark:border-stroke-dark dark:bg-black ${scrolling ? 'border-b border-blue-gray-400/20' : 'border-b border-transparent'}`}>
//             <div className="container px-4 relative lg:text-sm mx-auto max-w-[1400px]">
//                 <div className="flex items-center justify-between">
//                     <div className="block py-4 lg:py-0">
//                         <a href="/" className="block max-w-[150px] md:max-w-[190px] sm:max-w-[190px]">
//                             <div className="flex items-center flex-shrink-1">
//                                 {/* <img className="h-10 w-10 mr-2" src={logo} alt="Logo" /> */}
//                                 <div className="h-12 w-12 rounded-2xl justify-center items-center content-center border-2 border-white dark:border-blue-gray-100/50 mr-2">
//                                     <img src={logo} alt="Logo" className={`cursor-pointer duration-500 rounded-2xl`} />
//                                 </div>
//                                 <span className="text-xl tracking-tight text-white">Bouf'Coin</span>
//                             </div>
//                         </a>
//                     </div>
//                     <button
//                         type="button"
//                         className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
//                         aria-label="navbarOpen"
//                         name="navbarOpen"
//                         onClick={toggleNavbar}
//                     >
//                         <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
//                         <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
//                         <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
//                     </button>
//                     <div className={`menu-wrapper relative ${isNavbarOpen ? 'flex' : 'hidden'} justify-between lg:flex`}>
//                         <button
//                             type="button"
//                             className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
//                             name="navbarClose"
//                             aria-label="navbarClose"
//                             onClick={toggleNavbar}
//                         >
//                             <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
//                             <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
//                         </button>
//                         <nav
//                             className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent"
//                         >
//                             <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
//                                 {/* <li className="menu-item">
//                                     <a
//                                         href="#home"
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         Accueil
//                                     </a>
//                                 </li> */}
//                                 {/* <li className="menu-item">
//                                     <a
//                                         href="#features"
//                                         onClick={(e) => handleClick(e, '#features')}
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         Fonctionnalité
//                                     </a>
//                                 </li>
//                                 <li className="menu-item">
//                                     <a
//                                         href="#work-process"
//                                         onClick={(e) => handleClick(e, '#work-process')}
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         Comment ça marche
//                                     </a>
//                                 </li>
//                                 <li className="menu-item">
//                                     <a
//                                         href="#stat"
//                                         onClick={(e) => handleClick(e, '#stat')}
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         Statistiques
//                                     </a>
//                                 </li>
//                                 <li className="menu-item">
//                                     <a
//                                         href="#pricing"
//                                         onClick={(e) => handleClick(e, '#pricing')}
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         Abonnement
//                                     </a>
//                                 </li> */}
//                                 {/* <li className="menu-item">
//                                     <a
//                                         href="#support"
//                                         onClick={(e) => handleClick(e, '#support')}
//                                         className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
//                                     >
//                                         A propos
//                                     </a>
//                                 </li> */}
//                             </ul>
//                         </nav>
//                     </div>

//                     <div className="mr-[60px] flex items-center justify-end lg:mr-0">

//                         {/* <a href="/login"
//                             className="hidden py-[10px] px-6 text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary sm:inline-block">
//                             Connexion
//                         </a>
//                         <a href="/register"
//                             className="hidden rounded-md bg-primary py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block">
//                             Inscription
//                         </a> */}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }