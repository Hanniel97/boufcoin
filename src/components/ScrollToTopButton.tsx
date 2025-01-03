import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Fonction pour afficher ou masquer le bouton selon la position de défilement
    const toggleVisibility = () => {
        if (window.scrollY) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Fonction pour faire défiler la page vers le haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        // Ajouter l'événement de défilement
        window.addEventListener('scroll', toggleVisibility);
        // Nettoyer l'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    type='button'
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '50px',
                        right: '50px',
                        padding: '10px 20px',
                        fontSize: '18px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    ↑
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;
