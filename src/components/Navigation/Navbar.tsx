import React from 'react';
import useStore from '../../store/useStore';
// import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
// import DropdownNotification from './DropdownNotification';
// import { useNavigate } from 'react-router-dom';
import Alerte from './Alertes';
import moment from 'moment';

const Navbar = (props: {sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void;}) => {
    // const navigate = useNavigate();
    
    const {user} = useStore();

    function generateGreetings(){
        let currentHour: number = parseInt(moment().format("HH"));
  
        if (currentHour >= 3 && currentHour < 12){
            return "Bonjour";
        } else if (currentHour >= 12 && currentHour < 15){
            return "Bonsoir";
        }   else if (currentHour >= 15 && currentHour < 20){
            return "Bonsoir";
        } else if (currentHour >= 20 || currentHour < 3){
            return "Bonsoir";
        } else {
            return "Bienvenue"
        }
    }

    return (
        <nav className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-[#D97C2B]/10 dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        type='button'
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                                    !props.sidebarOpen && '!w-full delay-300'
                                }`}
                                ></span>
                                <span
                                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                    !props.sidebarOpen && 'delay-400 !w-full'
                                }`}
                                ></span>
                                <span
                                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                    !props.sidebarOpen && '!w-full delay-500'
                                }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                    !props.sidebarOpen && '!h-0 !delay-[0]'
                                }`}
                                ></span>
                                <span
                                className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                    !props.sidebarOpen && '!h-0 !delay-200'
                                }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    <Link className="block flex-shrink-0 lg:hidden" to="/dashboard">
                            <h1 className="text-black dark:text-white">{generateGreetings() +' '+ user.nom}</h1>
                        {/* <img src={LogoIcon} alt="Logo" /> */}
                    </Link>
                </div>

                <div className="hidden sm:block text-black dark:text-white font-body">
                    <h1>{generateGreetings() +' '+ user.nom}</h1>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <DarkModeSwitcher />
                        
                        {/* <DropdownNotification /> */}

                        <Alerte />
                    </ul>

                    <Link
                        className="flex items-center gap-4"
                        to={user.role === "admin" ? "/profile" : "/ventes"}
                    >
                        <span className="hidden text-right lg:block">
                            <span className="block text-sm font-medium text-black dark:text-white">
                               {user.nom}
                            </span>
                            <span className="block text-xs text-black dark:text-white">{user.role === "admin"? "Admin": "Gérant"}</span>
                        </span>

                    </Link>
                </div>
            </div>
        </nav>



        // <nav className="bg-blue-600 text-white p-4 w-full">
        //     <div className="flex justify-between items-center">
        //         <h1 className="text-xl">Admin Dashboard</h1>
        //         <div className="flex justify-end">
        //             <span className="mr-4">John Doe</span>
        //             <button type='button' className="bg-white text-blue-600 px-2 py-1 rounded">Logout</button>
        //         </div>
        //     </div>
        // </nav>

        // <header className={`flex justify-between items-center bg-white p-4 shadow-md`}>
        //     <div className="flex flex-row justify-center items-center">
        //         <FaBars color='#000000' className="cursor-pointer mr-3" onClick={() => setCollapsed(collapsed)} />
        //         <div>
        //             <h1 className="text-xl font-semibold">Tableau de bord</h1>
        //         </div>
        //     </div>
            
        //     <div className="flex items-center space-x-4">
        //         <div>🔔</div>
        //         <div>{user.nom}</div>
        //         <img src="https://via.placeholder.com/40" alt="profile" className="rounded-full w-10 h-10" />
        //     </div>
        // </header>

    );
};

export default Navbar;