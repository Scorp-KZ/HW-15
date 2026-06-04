import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { useAppContext } from "../context/AppContext";
import "./Navbar.css";

function Navbar() {
    const { isDarkTheme, toggleTheme, favorites } = useAppContext();

    const getNavClass = ({ isActive }) => classNames("nav-link", { active: isActive });

    return (
        <nav className="navbar">
            <Link to="/" className="logo">КНИГИ</Link>
            <div className="nav-links">
                <NavLink to="/" className={getNavClass}>Главная</NavLink>
                <NavLink to="/products" className={getNavClass}>Книги</NavLink>
                <NavLink to="/favorites" className={getNavClass}>Избранное ({favorites.length})</NavLink>
                <NavLink to="/about" className={getNavClass}>О проекте</NavLink>
                <NavLink to="/contacts" className={getNavClass}>Контакты</NavLink>
                <NavLink to="/feikovaya" className={getNavClass}>стр-404</NavLink>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkTheme ? "☀️ Светлая" : "🌙 Темная"}
            </button>
        </nav>
    );
}

export default Navbar;
