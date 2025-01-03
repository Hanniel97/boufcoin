// useCounter.ts
import { useEffect, useState } from 'react';

const useCounter = (target: number, duration: number) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const increment = Math.ceil(target / (duration / 1000)); // Nombre d'incréments par seconde
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount < target) {
                    return Math.min(prevCount + increment, target);
                }
                clearInterval(interval);
                return prevCount;
            });
        }, 1000); // Incrémente toutes les secondes

        return () => clearInterval(interval);
    }, [target, duration]);

    return count;
};

export default useCounter;