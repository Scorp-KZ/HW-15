import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeQuery, setActiveQuery] = useState("");
    const { toggleFavorite, isFavorite } = useAppContext();

    useEffect(() => {
        setLoading(true);
        setError(false);

        const url = activeQuery.trim()
            ? `https://www.dbooks.org/api/search/${activeQuery.trim()}`
            : "https://www.dbooks.org/api/recent";

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(data => {
                setProducts(data.books || []);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [activeQuery]);

    const handleSearchSubmit = event => {
        event.preventDefault();
        setActiveQuery(searchValue);
    };

    const resetSearch = () => {
        setSearchValue("");
        setActiveQuery("");
    };

    if (error) {
        return (
            <div className="error-page">
                <h1>Сервер недоступен</h1>
                <p>Сейчас не удалось загрузить список книг. Попробуйте обновить страницу позже.</p>
                <Link to="/" className="btn-primary">Вернуться на главную</Link>
            </div>
        );
    }

    return (
        <div className="products">
            <h1>Каталог книг</h1>

            <form className="search-panel" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchValue}
                    onChange={event => setSearchValue(event.target.value)}
                    placeholder="Например: React, Python, JavaScript"
                />
                <button type="submit">Найти</button>
                <button type="button" onClick={resetSearch}>Сбросить</button>
            </form>

            {activeQuery && <p className="search-result-text">Результаты поиска по запросу: <strong>{activeQuery}</strong></p>}

            {loading ? (
                <Loader />
            ) : products.length === 0 ? (
                <p className="empty-list">Книги не найдены.</p>
            ) : (
                <ul className="book-list">
                    {products.map(book => (
                        <li key={book.id} className={classNames("book-card", { favorite: isFavorite(book.id) })}>
                            <Link to={`/products/${book.id.toLowerCase()}`} className="book-link">
                                <img src={book.image} alt={book.title} className="book-image" />
                                <div className="book-info">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-subtitle">{book.subtitle}</p>
                                    <p className="book-authors">{book.authors}</p>
                                </div>
                            </Link>
                            <button className="favorite-list-btn" onClick={() => toggleFavorite(book)}>
                                {isFavorite(book.id) ? "★" : "☆"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Products;
