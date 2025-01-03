export const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};  

export const Loading = () => {
    return (
        <div className="flex h-screen bg-blue-gray-900/50 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};