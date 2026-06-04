import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import classNames from "classnames";
import { AppProvider, useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

function AppLayout() {
    const { isDarkTheme } = useAppContext();

    return (
        <div className={classNames("app-container", { "dark-theme": isDarkTheme })}>
            <Navbar />
            <main className="app-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <Router>
                <AppLayout />
            </Router>
        </AppProvider>
    );
}

export default App;
