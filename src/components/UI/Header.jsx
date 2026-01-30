import { NavLink, useLocation } from "react-router-dom"
import logo from "../../images/websiteLogo.webp"
import { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
export const Header = () => {

    const [menuOpen, setMenuOpen]= useState(false);

    // to close the menu after path changes
    const location= useLocation();
    // console.log("location= ", location);

    useEffect(()=> {
        setMenuOpen(false);
    },[location.pathname]);

    return (
        <header className="section-navbar">
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to="/" className="brand-link">
                        <img src={logo} alt="shop-logo" width="80%" height="auto" />
                        <span className="brand-name">ShopEzzz</span>
                    </NavLink>
                    
                </div>

                {/* Hamburger menu */}
                <button className="hamburger" onClick={()=> setMenuOpen(!menuOpen)}>
                    {menuOpen ? <IoCloseOutline /> : <RxHamburgerMenu /> }
                </button>

                <nav className={`navbar ${menuOpen ? "active" : ""}`}>
                    <ul>
                        <li className="nav-item"> 
                            <NavLink to="/" className="nav-link">Home</NavLink> </li>
                        <li className="nav-item"> 
                            <NavLink to="/product" className="nav-link" >Products</NavLink> </li>
                        <li className="nav-item"> 
                            <NavLink to="/about" className="nav-link" >About</NavLink> </li>
                        <li className="nav-item"> 
                            <NavLink to="/contact" className="nav-link" >Contact</NavLink> </li>
                        <li className="nav-item"> 
                            <NavLink to="/cart" className="nav-link" >Cart</NavLink> </li>
                        <li className="nav-item"> 
                            <NavLink to="/login" className="nav-link" >Login/Signup</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}