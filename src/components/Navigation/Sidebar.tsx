import React, { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { apiUrl } from '../../api/api';
import toast from 'react-hot-toast';
import logo from '../../assets/icon-512.png'
// import SidebarLinkGroup from './SidebarLinkGroup';
// import useLocalStorage from '../../hooks/useLocalStorage';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, }: SidebarProps) => {
    const navigate = useNavigate();
    const { isAuthenticated, user, setUser, setIsAuthenticated, setLoading, setAlertes } = useStore();
    const location = useLocation();

    // console.log('user data', window.localStorage.getItem("userData"), 'bar data', window.localStorage.getItem("barData"))

    useEffect(() => {
        const item = window.localStorage.getItem("userData");

        if (item) {
            setUser(JSON.parse(item));
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [setIsAuthenticated, setUser])

    const links = [
        {
            to: "/dashboard", label: "Dashboard", icon: <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                    fill=""
                />
                <path
                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                    fill=""
                />
                <path
                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                    fill=""
                />
                <path
                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                    fill=""
                />
            </svg>
        },
        {
            to: "/ventes", label: "Ventes", icon: <svg
                viewBox="0 0 64 64"
                fill="currentColor"
                height="18"
                width="18"
            >
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={2}
                >
                    <path d="M25 1l38 38-24 24L1 25V1z" />
                    <path d="M23 17 A6 6 0 0 1 17 23 A6 6 0 0 1 11 17 A6 6 0 0 1 23 17 z" />
                </g>
            </svg>
        },
        // { to: "/disposition", label: "Représentation", icon: <svg
        //     fill="none"
        //     stroke="currentColor"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     strokeWidth={2}
        //     viewBox="0 0 24 24"
        //     height="18"
        //     width="18"
        //     >
        //         <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" />
        //     </svg> 
        // },
        // { to: "/reservations", label: "Réservation", icon: <svg fill="none" viewBox="0 0 15 15" height="18" width="18" >
        //     <path
        //         stroke="currentColor"
        //         d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
        //     />
        //     </svg> 
        // },
        // { to: "/consignations", label: "Consignations", icon: <svg
        //         viewBox="0 0 24 24"
        //         fill="currentColor"
        //         height="18"
        //         width="18"
        //     >
        //         <path d="M11.5 2c-.28 0-.5.22-.5.5V7c-.07 0-.15 0-.22.03-.96.24-1.57.97-2.02 1.86C8.3 9.76 8 10.84 8 12c.05 3 0 6.03 0 9 0 .55.45 1 1 1h6c.55 0 1-.45 1-1 .04-3 0-6 0-9 0-1.16-.26-2.24-.72-3.12-.45-.88-1.06-1.61-2.02-1.84C13.18 7 13.05 7 13 7V2.5c0-.28-.22-.5-.5-.5M12 8.85c.32 0 .63.05.78.15.07.03.42.26.72.81.28.56.5 1.36.5 2.19v8h-4v-8c0-.83.22-1.63.5-2.19.3-.55.65-.78.72-.81.14-.1.46-.15.78-.15z" />
        //     </svg> 
        // },
        {
            to: "/reliquat", label: "Reliquat", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M12 12a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1zm-.71-6.29a1 1 0 00.33.21.94.94 0 00.76 0 1 1 0 00.33-.21L15 7.46A1 1 0 1013.54 6l-.54.59V3a1 1 0 00-2 0v3.59L10.46 6A1 1 0 009 7.46zM19 15a1 1 0 10-1 1 1 1 0 001-1zm1-7h-3a1 1 0 000 2h3a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h3a1 1 0 000-2H4a3 3 0 00-3 3v8a3 3 0 003 3h16a3 3 0 003-3v-8a3 3 0 00-3-3zM5 15a1 1 0 101-1 1 1 0 00-1 1z" />
            </svg>
        },
    ]

    const linksGerant = [
        {
            to: "/ventes", label: "Ventes", icon: <svg
                viewBox="0 0 64 64"
                fill="currentColor"
                height="18"
                width="18"
            >
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={2}
                >
                    <path d="M25 1l38 38-24 24L1 25V1z" />
                    <path d="M23 17 A6 6 0 0 1 17 23 A6 6 0 0 1 11 17 A6 6 0 0 1 23 17 z" />
                </g>
            </svg>
        },
        // { to: "/commandes", label: "Commandes", icon: <svg
        //     fill="none"
        //     stroke="currentColor"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     strokeWidth={2}
        //     viewBox="0 0 24 24"
        //     height="18"
        //     width="18"
        //     >
        //         <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" />
        //     </svg> 
        // },
        // { to: "/reservations", label: "Réservation", icon: <svg fill="none" viewBox="0 0 15 15" height="18" width="18" >
        //     <path
        //         stroke="currentColor"
        //         d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
        //     />
        //     </svg> 
        // },
        {
            to: "/consignations", label: "Consignations", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M11.5 2c-.28 0-.5.22-.5.5V7c-.07 0-.15 0-.22.03-.96.24-1.57.97-2.02 1.86C8.3 9.76 8 10.84 8 12c.05 3 0 6.03 0 9 0 .55.45 1 1 1h6c.55 0 1-.45 1-1 .04-3 0-6 0-9 0-1.16-.26-2.24-.72-3.12-.45-.88-1.06-1.61-2.02-1.84C13.18 7 13.05 7 13 7V2.5c0-.28-.22-.5-.5-.5M12 8.85c.32 0 .63.05.78.15.07.03.42.26.72.81.28.56.5 1.36.5 2.19v8h-4v-8c0-.83.22-1.63.5-2.19.3-.55.65-.78.72-.81.14-.1.46-.15.78-.15z" />
            </svg>
        },
        {
            to: "/reliquat", label: "Reliquat", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M12 12a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1zm-.71-6.29a1 1 0 00.33.21.94.94 0 00.76 0 1 1 0 00.33-.21L15 7.46A1 1 0 1013.54 6l-.54.59V3a1 1 0 00-2 0v3.59L10.46 6A1 1 0 009 7.46zM19 15a1 1 0 10-1 1 1 1 0 001-1zm1-7h-3a1 1 0 000 2h3a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h3a1 1 0 000-2H4a3 3 0 00-3 3v8a3 3 0 003 3h16a3 3 0 003-3v-8a3 3 0 00-3-3zM5 15a1 1 0 101-1 1 1 0 00-1 1z" />
            </svg>
        },
    ]

    const links2 = [
        {
            to: "/produits", label: "Produits", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1.334-8a1.5 1.5 0 000-3H10.5v3h2.834zm0-5a3.5 3.5 0 010 7H10.5v3h-2V7h4.834z" />
            </svg>
        },
        {
            to: "/approvisionnement", label: "Provision", icon: <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M904 747H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM165.7 621.8l39.7 39.5c3.1 3.1 8.2 3.1 11.3 0l234.7-233.9 97.6 97.3a32.11 32.11 0 0045.2 0l264.2-263.2c3.1-3.1 3.1-8.2 0-11.3l-39.7-39.6a8.03 8.03 0 00-11.3 0l-235.7 235-97.7-97.3a32.11 32.11 0 00-45.2 0L165.7 610.5a7.94 7.94 0 000 11.3z" />
            </svg>
        },
        {
            to: "/rapport", label: "Rapport d'activité", icon: <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="18"
                width="18"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                <path d="M9 17v-5M12 17v-1M15 17v-3" />
            </svg>
        },
        {
            to: "/depenses", label: "Dépenses", icon: <svg fill="none" viewBox="0 0 15 15" height="18" width="18" >
                <path
                    fill="currentColor"
                    d="M4.5 7H4v1h.5V7zm6 1h.5V7h-.5v1zm-2 2H8v1h.5v-1zm2 1h.5v-1h-.5v1zm-6-7H4v1h.5V4zm2 1H7V4h-.5v1zm4-4.5l.354-.354L10.707 0H10.5v.5zm3 3h.5v-.207l-.146-.147-.354.354zM4.5 8h6V7h-6v1zm4 3h2v-1h-2v1zm-4-6h2V4h-2v1zm8 9h-10v1h10v-1zM2 13.5v-12H1v12h1zM2.5 1h8V0h-8v1zM13 3.5v10h1v-10h-1zM10.146.854l3 3 .708-.708-3-3-.708.708zM2.5 14a.5.5 0 01-.5-.5H1A1.5 1.5 0 002.5 15v-1zm10 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1z"
                />
            </svg>
        },
        {
            to: "/rapportMensuel", label: "Rapport Mensuel", icon: <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="18"
                width="18"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                <path d="M14 11h-2.5a1.5 1.5 0 000 3h1a1.5 1.5 0 010 3H10M12 17v1m0-8v1" />
            </svg>
        },
        {
            to: "/rapportProduit", label: "Rapport Produits", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z" />
            </svg>
        },
    ]

    const linksGerant2 = [
        {
            to: "/produits", label: "Produits", icon: <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1.334-8a1.5 1.5 0 000-3H10.5v3h2.834zm0-5a3.5 3.5 0 010 7H10.5v3h-2V7h4.834z" />
            </svg>
        },
        {
            to: "/approvisionnement", label: "Provision", icon: <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M904 747H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM165.7 621.8l39.7 39.5c3.1 3.1 8.2 3.1 11.3 0l234.7-233.9 97.6 97.3a32.11 32.11 0 0045.2 0l264.2-263.2c3.1-3.1 3.1-8.2 0-11.3l-39.7-39.6a8.03 8.03 0 00-11.3 0l-235.7 235-97.7-97.3a32.11 32.11 0 00-45.2 0L165.7 610.5a7.94 7.94 0 000 11.3z" />
            </svg>
        },
        {
            to: "/rapport", label: "Rapport d'activité", icon: <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="18"
                width="18"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                <path d="M9 17v-5M12 17v-1M15 17v-3" />
            </svg>
        },
        {
            to: "/depenses", label: "Dépenses", icon: <svg fill="none" viewBox="0 0 15 15" height="18" width="18" >
                <path
                    fill="currentColor"
                    d="M4.5 7H4v1h.5V7zm6 1h.5V7h-.5v1zm-2 2H8v1h.5v-1zm2 1h.5v-1h-.5v1zm-6-7H4v1h.5V4zm2 1H7V4h-.5v1zm4-4.5l.354-.354L10.707 0H10.5v.5zm3 3h.5v-.207l-.146-.147-.354.354zM4.5 8h6V7h-6v1zm4 3h2v-1h-2v1zm-4-6h2V4h-2v1zm8 9h-10v1h10v-1zM2 13.5v-12H1v12h1zM2.5 1h8V0h-8v1zM13 3.5v10h1v-10h-1zM10.146.854l3 3 .708-.708-3-3-.708.708zM2.5 14a.5.5 0 01-.5-.5H1A1.5 1.5 0 002.5 15v-1zm10 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1z"
                />
            </svg>
        },
        // { to: "/rapportMensuel", label: "Rapport Mensuel", icon: <svg
        //     fill="none"
        //     stroke="currentColor"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     strokeWidth={2}
        //     viewBox="0 0 24 24"
        //     height="18"
        //     width="18"
        //   >
        //     <path stroke="none" d="M0 0h24v24H0z" />
        //     <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        //     <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
        //     <path d="M14 11h-2.5a1.5 1.5 0 000 3h1a1.5 1.5 0 010 3H10M12 17v1m0-8v1" />
        //   </svg>
        // },
        // { to: "/rapportProduit", label: "Rapport Produits", icon: <svg
        //     viewBox="0 0 24 24"
        //     fill="currentColor"
        //     height="18"
        //     width="18"
        //   >
        //     <path d="M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z" />
        //   </svg>
        // },
    ]

    const links3 = [
        {
            to: "/employe", label: "Personnel", icon: <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path
                    fill="currentColor"
                    d="M4 1.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 014 1.5zM13 1.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0113 1.5zM4 4H1a1 1 0 00-1 1v5h1v6h1.25v-6h.5v6H4v-6h1V5a1 1 0 00-1-1zM15.234 8L16 7.445l-2.083-3.221a.5.5 0 00-.417-.225h-4a.497.497 0 00-.417.225L7 7.445 7.766 8l1.729-2.244.601 1.402-2.095 3.841h1.917l.333 5h1v-5h.5v5h1l.333-5h1.917l-2.095-3.842.601-1.402 1.729 2.244z"
                />
            </svg>
        },
        {
            to: "/caisses", label: "Caisse", icon: <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="18"
                width="18"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M15 11v.01M5.173 8.378a3 3 0 114.656-1.377" />
                <path d="M16 4v3.803A6.019 6.019 0 0118.658 11h1.341a1 1 0 011 1v2a1 1 0 01-1 1h-1.342c-.336.95-.907 1.8-1.658 2.473V19.5a1.5 1.5 0 01-3 0v-.583a6.04 6.04 0 01-1 .083h-4a6.04 6.04 0 01-1-.083v.583a1.5 1.5 0 01-3 0v-2L5 17.473A6 6 0 018.999 7h2.5l4.5-3H16z" />
            </svg>
        },
        {
            to: "/table", label: "Tables & Méthodes", icon: <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M64 256v-96h160v96H64zm0 64h160v96H64v-96zm224 96v-96h160v96H288zm160-160H288v-96h160v96zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
            </svg>
        },
        // { to: "/profile", label: "Profile", icon: <svg
        //         className="fill-current"
        //         viewBox="0 0 1024 1024"
        //         fill="currentColor"
        //         width="18"
        //         height="18"
        //     >
        //         <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
        //   </svg> 
        // },
    ]

    const linksGerant3 = [
        // { to: "/employe", label: "Employés", icon: <svg
        //         viewBox="0 0 16 16"
        //         fill="currentColor"
        //         height="18"
        //         width="18"
        //     >
        //         <path
        //             fill="currentColor"
        //             d="M4 1.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 014 1.5zM13 1.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0113 1.5zM4 4H1a1 1 0 00-1 1v5h1v6h1.25v-6h.5v6H4v-6h1V5a1 1 0 00-1-1zM15.234 8L16 7.445l-2.083-3.221a.5.5 0 00-.417-.225h-4a.497.497 0 00-.417.225L7 7.445 7.766 8l1.729-2.244.601 1.402-2.095 3.841h1.917l.333 5h1v-5h.5v5h1l.333-5h1.917l-2.095-3.842.601-1.402 1.729 2.244z"
        //         />
        //     </svg> 
        // },
        // { to: "/caisses", label: "Caisse", icon: <svg
        //         fill="none"
        //         stroke="currentColor"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth={2}
        //         viewBox="0 0 24 24"
        //         height="18"
        //         width="18"
        //     >
        //         <path stroke="none" d="M0 0h24v24H0z" />
        //         <path d="M15 11v.01M5.173 8.378a3 3 0 114.656-1.377" />
        //         <path d="M16 4v3.803A6.019 6.019 0 0118.658 11h1.341a1 1 0 011 1v2a1 1 0 01-1 1h-1.342c-.336.95-.907 1.8-1.658 2.473V19.5a1.5 1.5 0 01-3 0v-.583a6.04 6.04 0 01-1 .083h-4a6.04 6.04 0 01-1-.083v.583a1.5 1.5 0 01-3 0v-2L5 17.473A6 6 0 018.999 7h2.5l4.5-3H16z" />
        //     </svg>
        // },
        {
            to: "/table", label: "Tables & Méthodes", icon: <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="18"
                width="18"
            >
                <path d="M64 256v-96h160v96H64zm0 64h160v96H64v-96zm224 96v-96h160v96H288zm160-160H288v-96h160v96zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
            </svg>
        },
        // { to: "/profile", label: "Profile", icon: <svg
        //         className="fill-current"
        //         viewBox="0 0 1024 1024"
        //         fill="currentColor"
        //         width="18"
        //         height="18"
        //     >
        //         <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
        //   </svg> 
        // },
    ]

    // console.log('current user',user)

    const getAlerte = useCallback(async () => {
        if (user && isAuthenticated) {
            // setLoading(true)
            try {
                await fetch(apiUrl + 'getAlertes', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
                    },
                    // credentials: "include",
                })
                    .then(response => response.json())
                    .then(res => {
                        // console.log('bar produit',res)
                        if (res.success === true) {
                            setAlertes(res.data)
                            setLoading(false)
                        } else {
                            setLoading(false)
                        }
                    })

            } catch (error) {
                console.error(error);
                setLoading(false)
                toast.error("Erreur de connexion")
            }
        }
    }, [isAuthenticated, setAlertes, setLoading, user])

    useEffect(() => {
        getAlerte()
    }, [getAlerte, isAuthenticated, user])

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    const handleDeconnect = () => {
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('barData');
        setIsAuthenticated(false);
        navigate("../login");
    }

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-65 flex-col overflow-y-hidden bg-[#D97C2B]/90 duration-300 ease-linear dark:bg-[#D97C2B]/10 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/dashboard" className="flex gap-x-4 items-center ml-5">
                    <div className="h-12 w-12 rounded-2xl justify-center items-center content-center border-2 border-white dark:border-blue-gray-100/50">
                        <img src={logo} alt="Logo" className={`cursor-pointer duration-500 rounded-2xl`} />
                    </div>
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200`}
                    >
                        Bouf'Coin
                    </h1>
                </NavLink>

                <button
                    type="button"
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    {/* <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        // viewBox="0 0 20 18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill="#FFFFFF"
                        />
                    </svg> */}

                    <svg
                        width="22"
                        height="22"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path fill='#FFFFFF' d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="py-4 px-4 lg:px-6">
                    <div>
                        {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3> */}
                        <ul className="mb-2 flex flex-col gap-1.5">
                            {(user.role === "admin" ? links : linksGerant).map((item) => (
                                <li>
                                    <NavLink

                                        to={item.to}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#E85213] dark:hover:bg-[#E85213]/50
                                                ${location.pathname === item.to &&
                                            'bg-[#E85213]/90 dark:bg-[#E85213]/30'
                                            }`
                                        }

                                    >
                                        {item.icon}
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))
                            }
                        </ul>

                        <hr className="my-2 border-blue-gray-50 w-auto" />

                        <ul className="mb-2 flex flex-col gap-1.5">
                            {(user.role === "admin" ? links2 : linksGerant2).map((item) => (
                                <li>
                                    <NavLink
                                        to={item.to}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#E85213] dark:hover:bg-[#E85213]/50 ${location.pathname === item.to &&
                                            'bg-[#E85213]/90 dark:bg-[#E85213]/30'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))
                            }
                        </ul>

                        <hr className="my-2 border-blue-gray-50 w-auto" />

                        <ul className="mb-2 flex flex-col gap-1.5">
                            {(user.role === "admin" ? links3 : linksGerant3).map((item) => (
                                <li>
                                    <NavLink
                                        to={item.to}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#E85213] dark:hover:bg-[#E85213]/50 ${location.pathname === item.to &&
                                            'bg-[#E85213]/90 dark:bg-[#E85213]/30'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))
                            }
                        </ul>
                    </div>

                    {/* <div className="flex-1 flex items-end"> */}
                    <button
                        type='button'
                        onClick={() => { handleDeconnect() }}
                        className="group relative flex justify-center items-center rounded-md bg-meta-1 gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out text-gray-100 hover:bg-opacity-90"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="18"
                            width="18"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
                            <path d="M7 12h14l-3-3m0 6l3-3" />
                        </svg>
                        Déconnexion
                    </button>
                    {/* </div> */}
                </nav>
            </div>
        </aside>
    )
};

export default Sidebar;