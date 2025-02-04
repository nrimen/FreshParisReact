"use client";

const Footer = () => {
    return(
        <footer className="footer-section bg-gray-800 text-white py-4">
            <div className="footer-bottom flex flex-col items-center">
                <div className="contact-info">
                    <p>Contact us: <a href="mailto:contact@freshparis.com" className="text-blue-400">contact@freshparis.com</a></p>
                </div>
                <p className="mt-2">&copy; {new Date().getFullYear()} Fresh Paris. All rights reserved.</p>
            </div>
        </footer>
    )
};

export default Footer;
