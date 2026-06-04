import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toggleFavorite, isFavorite } = useAppContext();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.dbooks.org/api/book/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(data => {
                setBook(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="pd-loading"><Loader /></div>;
    if (!book || book.error) return <p className="pd-loading">Книга не найдена</p>;

    const favoriteBook = {
        id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        image: book.image,
        authors: book.authors,
    };

    return (
        <div className="pd-container">
            <div className="pd-main">
                <div className="pd-image">
                    <img src={book.image} alt={book.title} />
                </div>

                <div className="pd-info">
                    <h1 className="pd-title">{book.title}</h1>
                    {book.subtitle && <h2 className="pd-subtitle">{book.subtitle}</h2>}
                    <p><strong>Авторы:</strong> {book.authors}</p>
                    <p><strong>Издатель:</strong> {book.publisher}</p>
                    <p><strong>Год:</strong> {book.year}</p>
                    <p><strong>Страниц:</strong> {book.pages}</p>

                    <div className="pd-buttons">
                        <button className="pd-btn pd-btn-favorite" onClick={() => toggleFavorite(favoriteBook)}>
                            {isFavorite(book.id) ? "★ Убрать из избранного" : "☆ Добавить в избранное"}
                        </button>
                        {book.url && (
                            <a className="pd-btn pd-btn-open" href={book.url} target="_blank" rel="noreferrer">
                                Открыть на сайте API
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="pd-desc">
                <h3>Описание</h3>
                <p>{book.description || "Описание для этой книги отсутствует."}</p>
            </div>

            <div className="pd-back-button">
                <button className="pd-btn-back" onClick={() => navigate(-1)}>Назад в список</button>
            </div>
        </div>
    );
}

export default ProductDetails;
