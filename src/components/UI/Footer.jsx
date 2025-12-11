import { NavLink } from "react-router-dom";
import logo from "../../images/websiteLogo.webp";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-left">
                    <NavLink to="/" className="footer-brand">
                        <img src={logo} alt="shop-logo" className="footer-logo" />
                        <span className="footer-brand-name">ShopEzzz</span>
                    </NavLink>
                    <p className="footer-text">
                        Your trusted destination for all products — quality, fast delivery, and secure shopping experience.
                    </p>

                    <div className="social-icons">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
                    </div>
                </div>

                <div className="footer-right">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/product">Products</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/cart">Cart</NavLink></li>
                        <li><NavLink to="/login">Login/Signup</NavLink></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Your Store — All Rights Reserved.
            </div>
        </footer >
    );
}