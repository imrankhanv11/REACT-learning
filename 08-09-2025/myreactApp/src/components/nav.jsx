import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">React App</Link>
                <div className="navbar-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/form" className="nav-link">Form</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;