import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(() => localStorage.getItem("theme") === "dark");
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    }, [isDarkTheme]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleTheme = () => setIsDarkTheme(prev => !prev);

    const isFavorite = bookId => favorites.some(book => book.id === bookId);

    const toggleFavorite = book => {
        setFavorites(prevFavorites => {
            const exists = prevFavorites.some(item => item.id === book.id);
            if (exists) {
                return prevFavorites.filter(item => item.id !== book.id);
            }
            return [book, ...prevFavorites];
        });
    };

    const value = useMemo(() => ({
        isDarkTheme,
        toggleTheme,
        favorites,
        isFavorite,
        toggleFavorite,
    }), [isDarkTheme, favorites]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    return useContext(AppContext);
}
