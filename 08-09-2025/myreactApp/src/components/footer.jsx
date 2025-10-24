function Footer() {
    return (
        <footer className="bg-dark text-light text-center py-3 mt-auto">
            <div className="container">
                <p className="mb-1">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
                <div>
                    <a href="/" className="text-light me-3">Home</a>
                    <a href="/about" className="text-light me-3">About</a>
                    <a href="/contact" className="text-light me-3">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
