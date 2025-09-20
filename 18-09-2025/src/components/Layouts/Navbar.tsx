import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-2">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">React App 18-09</Link>

                    <div className="navbar-nav d-flex flex-row">
                        <Link to="/" className="nav-link px-3">Home</Link>
                        <Link to="/about" className="nav-link px-3">About</Link>
                        <Link to="/contact" className="nav-link px-3">Contact</Link>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;