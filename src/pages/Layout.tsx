import React, {useState} from 'react';
import Navbar from '../components/Navigation/Navbar';
import Sidebar from '../components/Navigation/Sidebar';
// import Sidebar2 from '../components/Navigation/Sidebar2';
import { Loading } from '../components/Loader';
import useStore from '../store/useStore';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const {loading} = useStore()
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-[#1C1C1C] bg-[#F0F0F0]">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-8">
                            {children}

                            {loading && <Loading />}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
    
    // return (
    //     <div className="flex h-screen overflow-hidden">
    //         <Sidebar />
    //         <div className="flex-grow">
    //             <Navbar />
    //             <main className="p-4 bg-gray-100">{children}</main>
    //         </div>
    //     </div>
    // );
};

export default Layout;