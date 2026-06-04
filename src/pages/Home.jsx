import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import "./Home.css";

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { toggleFavorite, isFavorite } = useAppContext();

    useEffect(() => {
        fetch("https://www.dbooks.org/api/recent")
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(data => {
                setBooks(data.books.slice(0, 3));
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home">
            <section className="hero">
                <h1>Добро пожаловать в Alpha Book Store</h1>
                <p>
                    Это React-приложение для поиска IT-книг. Здесь можно смотреть каталог,
                    открывать подробную страницу книги, искать по названию и сохранять книги в избранное.
                </p>
                <p className="hero-subtext">
                    Проект использует маршруты, динамические страницы, запросы к API, Context и интерактивный интерфейс.
                </p>
                <Link to="/products" className="btn-primary">Смотреть все книги</Link>
            </section>

            <section className="featured">
                <h2>Новые книги</h2>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="error-featured">
                        <h3>Скоро здесь появятся отличные книги!</h3>
                        <p>Сейчас сервер недоступен. Попробуйте открыть страницу позже.</p>
                    </div>
                ) : (
                    <div className="card-grid">
                        {books.map(book => (
                            <div key={book.id} className="featured-card">
                                <img src={book.image} alt={book.title} />
                                <h3>{book.title}</h3>
                                <p>{book.subtitle}</p>
                                <div className="card-bottom">
                                    <button className="favorite-btn" onClick={() => toggleFavorite(book)}>
                                        {isFavorite(book.id) ? "★ В избранном" : "☆ В избранное"}
                                    </button>
                                    <Link to={`/products/${book.id.toLowerCase()}`} className="details-link">Подробнее</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="view-all">
                    <Link to="/products" className="btn-secondary">
                        Все книги <FaArrowRight className="icon" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
