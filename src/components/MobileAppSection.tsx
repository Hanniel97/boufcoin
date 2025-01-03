// // MobileAppSection.tsx
// import React, {useEffect, useState} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/swiper-bundle.css'; // Importer les styles de Swiper
// // import Autoplay  from 'swiper';
// import adminDash from "../assets/3dashboard.jpg";
// import gerant from "../assets/1home.jpg";
// import serveur from "../assets/serveur.jpg";
// import 'swiper/swiper-bundle.css';

// const MobileAppSection: React.FC = () => {
//     const features = [
//         {
//             title: "Administrateurs",
//             description: "Surveillez les performances et gérez les utilisateurs facilement.",
//             imgSrc: adminDash,
//         },
//         {
//             title: "Gérants",
//             description: "Prenez des décisions éclairées avec des rapports en temps réel.",
//             imgSrc: gerant,
//         },
//         {
//             title: "Serveurs",
//             description: "Gérez les commandes et les paiements directement depuis votre mobile.",
//             imgSrc: serveur,
//         },
//     ];

//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Défilement automatique toutes les 5 secondes
//     useEffect(() => {
//         const interval = setInterval(() => {
//         handleNext();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [currentIndex]);

//     const handlePrevious = () => {
//         setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? features.length - 1 : prevIndex - 1
//         );
//     };

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) =>
//         prevIndex === features.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     const currentItem = features[currentIndex];

//     return (
//         <section className="py-16 bg-yellow-100">
//             <div className="container mx-auto max-w-screen-xl">
//                 <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
//                     Applications Mobiles
//                 </h2>
//                 <div className="flex items-center justify-center w-full h-full p-8 relative">
//                     <div className="flex max-w-5xl w-full overflow-hidden justify-between">
//                         {/* Section Texte */}
//                         <div className="w-1/2 p-8 flex flex-col justify-center">
//                             <h2 className="text-2xl font-bold mb-4">{currentItem.title}</h2>
//                             <p className="text-gray-600">{currentItem.description}</p>
//                         </div>
//                         {/* Section Image */}
//                         <div className="w-1/4">
//                             <img
//                                 src={currentItem.imgSrc}
//                                 alt={currentItem.title}
//                                 className="w-full h-full object-cover rounded-md"
//                             />
//                         </div>
//                     </div>
//                     {/* Boutons de navigation */}
//                     <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
//                         <button
//                             onClick={handlePrevious}
//                             className="bg-gray-700 text-white p-2 rounded-full"
//                         >
//                         &#8592;
//                         </button>
//                     </div>
//                     <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
//                         <button
//                             onClick={handleNext}
//                             className="bg-gray-700 text-white p-2 rounded-full"
//                         >
//                         &#8594;
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default MobileAppSection;


import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Controller } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import adminDash from "../assets/admin.png";
import gerant from "../assets/gerant.png";
import serveur from "../assets/serveur.png";

const MobileAppSection: React.FC = () => {
    // const features = [
    //     {
    //         title: "Administrateurs",
    //         description: "Surveillez les performances et gérez les utilisateurs facilement.",
    //         imgSrc: adminDash,
    //     },
    //     {
    //         title: "Gérants",
    //         description: "Prenez des décisions éclairées avec des rapports en temps réel.",
    //         imgSrc: gerant,
    //     },
    //     {
    //         title: "Serveurs",
    //         description: "Gérez les commandes et les paiements directement depuis votre mobile.",
    //         imgSrc: serveur,
    //     },
    // ];

    const features = [
        {
            title: "Administrateurs",
            description: (
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>Gérer les produits.</li>
                    <li>Gérer les ventes.</li>
                    <li>Gérez le stock.</li>
                    <li>Alertes niveau stock.</li>
                    <li>Gérer les dépenses</li>
                    <li>Gérer la caisse.</li>
                    <li>Gérer les employés.</li>
                    <li>Avoir le rapport d'activité journalier.</li>
                </ul>
            ),
            imgSrc: adminDash,
        },
        {
            title: "Gérants",
            description: (
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>Gérer le stock.</li>
                    <li>Gérer les ventes.</li>
                    <li>Alertes niveau stock.</li>
                    <li>Gérer les dépenses</li>
                    <li>Avoir le rapport d'activité journalier.</li>
                </ul>
            ),
            imgSrc: gerant,
        },
        {
            title: "Serveurs",
            description: (
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>Gérez les ventes.</li>
                    <li>Régler les commandes.</li>
                    {/* <li>Traitez les paiements facilement et rapidement via l'application.</li>
                    <li>Recevez des notifications sur les changements de menu ou les promotions spéciales.</li>
                    <li>Consultez les commentaires des clients pour améliorer le service.</li> */}
                </ul>
            ),
            imgSrc: serveur,
        },
    ];

    return (
        <section id="about" className="relative pt-[100px] pb-[100px] ">
            <div className="container lg:max-w-[1120px] justify-center items-center mx-auto px-6 lg:px-8">
                <div data-aos="fade-right" data-aos-delay="500" className="-mx-4 flex flex-wrap items-center justify-between">
                    <div className="w-full px-4 lg:w-1/2">
                        <div
                            className="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0 "
                            data-wow-delay=".2s"
                        >
                            <img src={adminDash} alt="about image" className="mx-auto max-w-full h-150" />
                            <div className="absolute top-0 right-5 -z-10 floating">
                                <svg
                                    width="72"
                                    height="50"
                                    viewBox="0 0 72 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_33_10)">
                                        <path
                                            d="M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 21.822 42.8298C21.6005 35.7375 17.0094 21.7229 0.441399 21.645C0.291298 21.6473 0.144104 21.6477 0 21.6462C0.148069 21.6447 0.2952 21.6443 0.441399 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z"
                                            fill="#7083F5"
                                        />
                                        <path
                                            d="M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z"
                                            fill="#7ED8FF"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_33_10">
                                            <rect width="71.2541" height="49.8779" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-gradient-to-tr from-blue-500 to-gray-200">
                                <div className="absolute left-10 -top-12 -z-10 rotate-45">
                                    {/* <svg
                                        width="65"
                                        height="36"
                                        viewBox="0 0 65 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                                            fill="#7083F5"
                                        />
                                    </svg> */}
                                    {/* <svg fill="none" viewBox="0 0 15 15" width="65"
                                        height="36">
                                        <path
                                            fill="#7083F5"
                                            fillRule="evenodd"
                                            d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 001.04 2.15C1 2.324 1 2.52 1 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 002.15 6.96C2.324 7 2.52 7 2.75 7H5.25c.229 0 .426 0 .6-.041A1.5 1.5 0 006.96 5.85C7 5.676 7 5.48 7 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 005.85 1.04C5.676 1 5.48 1 5.25 1H2.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 01-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 2.15C8 2.324 8 2.52 8 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 6.96C9.324 7 9.52 7 9.75 7H12.25c.229 0 .426 0 .6-.041A1.5 1.5 0 0013.96 5.85C14 5.676 14 5.48 14 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 1.04C12.676 1 12.48 1 12.25 1H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM2.75 8H5.25c.229 0 .426 0 .6.041A1.5 1.5 0 016.96 9.15C7 9.324 7 9.52 7 9.75V12.25c0 .229 0 .426-.041.6A1.5 1.5 0 015.85 13.96C5.676 14 5.48 14 5.25 14H2.75c-.229 0-.426 0-.6-.041A1.5 1.5 0 011.04 12.85C1 12.676 1 12.48 1 12.25V9.75c0-.229 0-.426.041-.6A1.5 1.5 0 012.15 8.04C2.324 8 2.52 8 2.75 8zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 00-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 00.37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 00.37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 00-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 9.15C8 9.324 8 9.52 8 9.75V12.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 13.96c.174.041.371.041.6.041H12.25c.229 0 .426 0 .6-.041a1.5 1.5 0 001.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 8.04C12.676 8 12.48 8 12.25 8H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 01-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37z"
                                            clipRule="evenodd"
                                        />
                                    </svg> */}
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <div className="wow fadeInUp lg:ml-auto lg:max-w-[510px]" data-wow-delay=".3s">
                            <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                                Track Audience Activities
                            </span>
                            <h2
                                className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                                Track Your Audience Activities
                            </h2>
                            <p className="mb-[30px] text-base leading-relaxed text-body">
                                Schedule your posts for times when your audience is most
                                active. Choose from our best-time predictions, or create
                                your own publishing schedule.
                            </p>
                            <div className="mb-[30px] flex items-center">
                                <div
                                    className="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                                    01
                                </div>
                                <div>
                                    <h5 className="text-xl font-medium text-black dark:text-white">
                                        Lorem ipsum dolor.
                                    </h5>
                                    <p className="text-base text-body">
                                        Ut ultricies lacus non fermentum ultrices.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                                    02
                                </div>
                                <div>
                                    <h5 className="text-xl font-medium text-black dark:text-white">
                                        Lorem ipsum dolor.
                                    </h5>
                                    <p className="text-base text-body">
                                        Ut ultricies lacus non fermentum ultrices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-left" data-aos-delay="700" className="py-[100px]">
                    <div className="-mx-4 flex flex-wrap items-center justify-between">
                        <div className="w-full px-4 lg:w-1/2">
                            <div className="wow fadeInUp lg:max-w-[510px]" data-wow-delay=".2s">
                                <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                                    Create Audience Reports
                                </span>
                                <h2
                                    className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                                    Know More About Your Audience.
                                </h2>
                                <p className="mb-[30px] text-base leading-relaxed text-body">
                                    Schedule your posts for times when your audience is most
                                    active. Choose from our best-time predictions, or create
                                    your own publishing schedule.
                                </p>
                                <a href="javascript:void(0)"
                                    className="inline-block rounded-md bg-primary py-[10px] px-8 text-base font-medium text-white hover:bg-opacity-90">
                                    Know More
                                </a>
                            </div>
                        </div>
                        <div className="order-first w-full px-4 lg:order-last lg:w-1/2">
                            <div className="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mr-0 lg:mb-0"
                                data-wow-delay=".3s">
                                <img src={gerant} alt="about image" className="mx-auto max-w-full h-150" />
                                <div className="absolute top-0 right-5 -z-10 floating-4">
                                    <svg width="72" height="50" viewBox="0 0 72 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_34_10)">
                                            <path
                                                d="M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 21.822 42.8298C21.6005 35.7375 17.0094 21.7229 0.441399 21.645C0.291298 21.6473 0.144104 21.6477 0 21.6462C0.148069 21.6447 0.2952 21.6443 0.441399 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z"
                                                fill="#FF9996" />
                                            <path
                                                d="M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z"
                                                fill="#FFCB78" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_34_10">
                                                <rect width="71.2541" height="49.8779" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-gradient-to-br from-orange-800/40 to-yellow-800/60">
                                    <div className="absolute left-10 -top-12 -z-10">
                                        {/* <svg width="65" height="36" viewBox="0 0 65 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                                                fill="#FF9996" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M55.4149 11.2025C53.339 10.9495 51.3475 11.7919 49.2904 13.555C45.9052 16.4566 40.0312 17.9 34.7367 13.5682C32.4686 11.7124 30.4916 11.419 28.8583 11.6913C27.1671 11.9731 25.7447 12.8747 24.6267 13.6201C22.8559 14.8006 20.9058 16.0412 18.66 16.3323C16.3417 16.6328 13.8663 15.9129 11.0464 13.563C8.68536 11.5955 6.66501 11.217 5.11309 11.4558C3.52519 11.7001 2.28797 12.6123 1.576 13.4538C1.25716 13.8306 0.69323 13.8776 0.316424 13.5587C-0.0603826 13.2399 -0.107377 12.676 0.211459 12.2992C1.138 11.2041 2.73865 10.0126 4.84128 9.68911C6.97988 9.36008 9.50271 9.94985 12.1907 12.1899C14.7333 14.3086 16.7266 14.7805 18.4302 14.5596C20.2061 14.3294 21.831 13.3356 23.6352 12.1328L24.1309 12.8765L23.6352 12.1328C24.7515 11.3886 26.4572 10.2793 28.5644 9.92812C30.7294 9.56729 33.2212 10.0187 35.8686 12.1847C40.3565 15.8566 45.2562 14.6586 48.1271 12.1979C50.3885 10.2596 52.8657 9.09105 55.6312 9.42817C58.3691 9.76193 61.1614 11.5461 64.1308 14.9723C64.4541 15.3453 64.4138 15.9097 64.0408 16.233C63.6678 16.5563 63.1033 16.516 62.7801 16.1429C59.9401 12.8661 57.5184 11.4589 55.4149 11.2025Z"
                                                fill="#FF9996" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z"
                                                fill="#FF9996" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M55.4149 29.962C53.339 29.709 51.3475 30.5514 49.2904 32.3146C45.9052 35.2161 40.0312 36.6595 34.7367 32.3277C32.4686 30.472 30.4916 30.1786 28.8583 30.4508C27.1671 30.7326 25.7447 31.6342 24.6267 32.3796C22.8559 33.5601 20.9058 34.8007 18.66 35.0918C16.3417 35.3923 13.8663 34.6725 11.0464 32.3226C8.68536 30.355 6.66501 29.9766 5.11309 30.2153C3.52519 30.4596 2.28797 31.3719 1.576 32.2133C1.25716 32.5901 0.69323 32.6371 0.316424 32.3182C-0.0603826 31.9994 -0.107377 31.4355 0.211459 31.0587C1.138 29.9637 2.73865 28.7721 4.84128 28.4486C6.97988 28.1196 9.50271 28.7094 12.1907 30.9494C14.7333 33.0682 16.7266 33.54 18.4302 33.3192C20.2061 33.0889 21.831 32.0951 23.6352 30.8923L24.1309 31.636L23.6352 30.8923C24.7515 30.1481 26.4572 29.0388 28.5644 28.6876C30.7294 28.3268 33.2212 28.7782 35.8686 30.9443C40.3565 34.6162 45.2562 33.4182 48.1271 30.9574C50.3885 29.0191 52.8657 27.8506 55.6312 28.1877C58.3691 28.5215 61.1614 30.3056 64.1308 33.7318C64.4541 34.1048 64.4138 34.6692 64.0408 34.9925C63.6678 35.3158 63.1033 35.2755 62.7801 34.9025C59.9401 31.6256 57.5184 30.2185 55.4149 29.962Z"
                                                fill="#FF9996" />
                                        </svg> */}
                                        {/* <svg
                                            fill="none"
                                            stroke="#FF9996"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            width="65" height="36"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                                            <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                                            <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                                            <path d="M8 11h4M8 15h3" />
                                        </svg> */}
                                    </div>
                                    <div className="absolute top-0 left-0 h-full w-full bg-texture"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="500" className="-mx-4 flex flex-wrap items-center justify-between">
                    <div className="w-full px-4 lg:w-1/2">
                        <div
                            className="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0 "
                            data-wow-delay=".2s"
                        >
                            <img src={serveur} alt="about" className="mx-auto max-w-full h-150" />
                            <div className="absolute top-0 right-5 -z-10 floating">
                                <svg
                                    width="72"
                                    height="50"
                                    viewBox="0 0 72 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_33_10)">
                                        <path
                                            d="M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 21.822 42.8298C21.6005 35.7375 17.0094 21.7229 0.441399 21.645C0.291298 21.6473 0.144104 21.6477 0 21.6462C0.148069 21.6447 0.2952 21.6443 0.441399 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z"
                                            fill="#7083F5"
                                        />
                                        <path
                                            d="M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z"
                                            fill="#7ED8FF"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_33_10">
                                            <rect width="71.2541" height="49.8779" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-gradient-to-tr from-blue-400 to-cyan-200">
                                <div className="absolute left-10 -top-12 -z-10 rotate-45 floating">
                                    {/* <svg
                                        width="65"
                                        height="36"
                                        viewBox="0 0 65 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                                            fill="#7083F5"
                                        />
                                    </svg> */}
                                    {/* <svg fill="none" viewBox="0 0 15 15" width="65"
                                        height="36">
                                        <path
                                            fill="#7083F5"
                                            fillRule="evenodd"
                                            d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 001.04 2.15C1 2.324 1 2.52 1 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 002.15 6.96C2.324 7 2.52 7 2.75 7H5.25c.229 0 .426 0 .6-.041A1.5 1.5 0 006.96 5.85C7 5.676 7 5.48 7 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 005.85 1.04C5.676 1 5.48 1 5.25 1H2.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 01-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 2.15C8 2.324 8 2.52 8 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 6.96C9.324 7 9.52 7 9.75 7H12.25c.229 0 .426 0 .6-.041A1.5 1.5 0 0013.96 5.85C14 5.676 14 5.48 14 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 1.04C12.676 1 12.48 1 12.25 1H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM2.75 8H5.25c.229 0 .426 0 .6.041A1.5 1.5 0 016.96 9.15C7 9.324 7 9.52 7 9.75V12.25c0 .229 0 .426-.041.6A1.5 1.5 0 015.85 13.96C5.676 14 5.48 14 5.25 14H2.75c-.229 0-.426 0-.6-.041A1.5 1.5 0 011.04 12.85C1 12.676 1 12.48 1 12.25V9.75c0-.229 0-.426.041-.6A1.5 1.5 0 012.15 8.04C2.324 8 2.52 8 2.75 8zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 00-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 00.37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 00.37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 00-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 9.15C8 9.324 8 9.52 8 9.75V12.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 13.96c.174.041.371.041.6.041H12.25c.229 0 .426 0 .6-.041a1.5 1.5 0 001.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 8.04C12.676 8 12.48 8 12.25 8H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 01-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37z"
                                            clipRule="evenodd"
                                        />
                                    </svg> */}
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <div className="wow fadeInUp lg:ml-auto lg:max-w-[510px]" data-wow-delay=".3s">
                            <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                                Track Audience Activities
                            </span>
                            <h2
                                className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                                Track Your Audience Activities
                            </h2>
                            <p className="mb-[30px] text-base leading-relaxed text-body">
                                Schedule your posts for times when your audience is most
                                active. Choose from our best-time predictions, or create
                                your own publishing schedule.
                            </p>
                            <div className="mb-[30px] flex items-center">
                                <div
                                    className="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                                    01
                                </div>
                                <div>
                                    <h5 className="text-xl font-medium text-black dark:text-white">
                                        Lorem ipsum dolor.
                                    </h5>
                                    <p className="text-base text-body">
                                        Ut ultricies lacus non fermentum ultrices.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                                    02
                                </div>
                                <div>
                                    <h5 className="text-xl font-medium text-black dark:text-white">
                                        Lorem ipsum dolor.
                                    </h5>
                                    <p className="text-base text-body">
                                        Ut ultricies lacus non fermentum ultrices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-28 left-0 -z-10 hidden md:block">
                    <svg width="632" height="1179" viewBox="0 0 632 1179" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.25" filter="url(#filter0_f_38_24)">
                            <circle cx="42.5" cy="589.5" r="329.5" fill="url(#paint0_linear_38_24)" />
                        </g>
                        <defs>
                            <filter id="filter0_f_38_24" x="-547" y="0" width="1179" height="1179" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_38_24" />
                            </filter>
                            <linearGradient id="paint0_linear_38_24" x1="-366.218" y1="919" x2="451.176" y2="349.901"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#8EA5FE" />
                                <stop offset="0.541667" stop-color="#BEB3FD" />
                                <stop offset="1" stop-color="#90D1FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="absolute right-0 top-20 -z-10">
                    <svg width="637" height="1277" viewBox="0 0 637 1277" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2" filter="url(#filter0_f_38_23)">
                            <circle cx="638.5" cy="638.5" r="388.5" fill="url(#paint0_linear_38_23)" />
                        </g>
                        <defs>
                            <filter id="filter0_f_38_23" x="0" y="0" width="1277" height="1277" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_38_23" />
                            </filter>
                            <linearGradient id="paint0_linear_38_23" x1="250" y1="250" x2="1168.59" y2="782.957"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FF8FE8" />
                                <stop offset="1" stop-color="#FFC960" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>

        // <section className="py-16 bg-yellow-100 px-4">
        //     <div className="container mx-auto max-w-screen-xl">
        //         <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
        //             Applications Mobiles
        //         </h2>
        //         <Swiper
        //             modules={[Autoplay, Controller]}
        //             spaceBetween={30}
        //             slidesPerView={1}
        //             autoplay={{
        //                 delay: 5000,
        //                 disableOnInteraction: false,
        //             }}
        //             // navigation
        //             loop
        //             className="flex items-center justify-center w-full h-full p-8"
        //         >
        //             {features.map((feature, index) => (
        //                 <SwiperSlide key={index}>
        //                     <div className="mr-auto flex max-w-5xl w-full text-left overflow-hidden justify-between">
        //                         {/* Section Texte */}
        //                         <div className="w-1/2 p-4 flex flex-col justify-center">
        //                             <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
        //                             <p className="text-gray-600">{feature.description}</p>
        //                         </div>
        //                         {/* Section Image */}
        //                         <div className="w-1/4">
        //                             <img
        //                                 src={feature.imgSrc}
        //                                 alt={feature.title}
        //                                 className="w-full h-full object-cover rounded-md"
        //                             />
        //                         </div>
        //                     </div>
        //                 </SwiperSlide>
        //             ))}
        //         </Swiper>
        //     </div>
        // </section>
    );
};

export default MobileAppSection;




// // MobileAppSection.tsx
// import React from 'react';
// import adminDash from "../assets/3dashboard.jpg"
// import gerant from "../assets/1home.jpg"
// import serveur from "../assets/serveur.jpg"

// const MobileAppSection: React.FC = () => {
//     const features = [
//         {
//             title: "Administrateurs",
//             description: "Surveillez les performances et gérez les utilisateurs facilement.",
//             imgSrc: adminDash, // Remplacez par l'image de votre choix
//         },
//         {
//             title: "Gérants",
//             description: "Prenez des décisions éclairées avec des rapports en temps réel.",
//             imgSrc: gerant, // Remplacez par l'image de votre choix
//         },
//         {
//             title: "Serveurs",
//             description: "Gérez les commandes et les paiements directement depuis votre mobile.",
//             imgSrc: serveur, // Remplacez par l'image de votre choix
//         },
//     ];

//     return (
//         <section className="py-16 bg-yellow-100">
//             <div className="container mx-auto max-w-screen-xl">
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Applications Mobiles</h2>
//                 {features.map((feature, index) => (
//                     <div className={`flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} mb-16`} key={feature.title}>
//                         <div data-aos="fade-left" className="lg:w-1/2 p-4">
//                             <h2 className="text-3xl font-bold text-black dark:text-white mb-4">{feature.title}</h2>
//                             <p className="text-black dark:text-gray-400">{feature.description}</p>
//                         </div>
//                         <div data-aos="fade-right" className="lg:w-1/2 p-4 flex justify-center">
//                             <img className="max-w-xs rounded-lg shadow-lg" src={feature.imgSrc} alt={feature.title} />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default MobileAppSection;