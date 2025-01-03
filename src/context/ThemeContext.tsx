import { createContext, useContext, ReactNode, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps{
    theme: Theme;
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');

    function toggleTheme(){
        setTheme((prevTheme) => (prevTheme === 'light'? 'dark' : 'light'))
    }

    return <ThemeContext.Provider value={{theme, toggleTheme}} >
        {children}
    </ThemeContext.Provider>
}

function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("Erreur ")
    }
    return context;
}

export {ThemeProvider, useTheme}