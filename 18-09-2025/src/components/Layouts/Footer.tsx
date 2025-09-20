function Footer() {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5 className="mb-1">React App</h5>
                        <p className="mb-0">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                    </div>

                    <div className="col-md-6 text-md-end">
                        <a href="/" className="text-light text-decoration-none me-3">Home</a>
                        <a href="/about" className="text-light text-decoration-none me-3">About</a>
                        <a href="/contact" className="text-light text-decoration-none me-3">Contact</a>
                        <a href="/terms" className="text-light text-decoration-none me-3">Terms</a>
                        <a href="/privacy" className="text-light text-decoration-none">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
