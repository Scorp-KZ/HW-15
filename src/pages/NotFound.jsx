import { Link } from "react-router-dom";
import { FaRegFrown } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="notfound-container">
            <FaRegFrown className="notfound-emoji" />
            <h1 className="notfound-code">404</h1>
            <h2>Такая страница не найдена</h2>
            <Link to="/" className="notfound-link">Вернуться на главную</Link>
        </div>
    );
}

export default NotFound;


