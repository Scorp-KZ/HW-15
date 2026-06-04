import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "./Favorites.css";

function Favorites() {
    const { favorites, toggleFavorite } = useAppContext();

    if (favorites.length === 0) {
        return (
            <div className="favorites favorites-empty">
                <h1>Избранное пустое</h1>
                <p>Добавьте книги в избранное из каталога или с главной страницы.</p>
                <Link to="/products" className="favorites-link">Перейти к книгам</Link>
            </div>
        );
    }

    return (
        <div className="favorites">
            <h1>Избранные книги</h1>
            <div className="favorites-grid">
                {favorites.map(book => (
                    <article key={book.id} className="favorite-card">
                        <img src={book.image} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{book.subtitle}</p>
                        <div className="favorite-actions">
                            <Link to={`/products/${book.id.toLowerCase()}`}>Подробнее</Link>
                            <button onClick={() => toggleFavorite(book)}>Удалить</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
