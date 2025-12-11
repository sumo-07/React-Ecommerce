import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedin } from "react-icons/fa";
import "../components/css/auth.css";


export const Signup = () => {
    return (
        <div className="container">
            <div className="auth-container">
                {/* Left Pannel */}
                <div className="auth-left">
                    <h2>Come join us!</h2>
                    <p>
                        We are so excited to have you here. If you haven't already, create an
                        account to get access to exclusive offers, rewards, and discounts.
                    </p>

                    <NavLink to="/login" className="auth-switch">
                        Already have an account? Sign in.
                    </NavLink>
                </div>

                {/* Right Pannel (form) */}
                <div className="auth-right">
                    <h1>Signup</h1>

                    <form>
                        <label htmlFor="fullname">Full Name</label>
                        <input id="fullname" type="text" placeholder="Enter your name" required />

                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="Enter your email" required />

                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" type="tel" placeholder="Enter your phone number" maxLength="10" pattern="\d{10}" required />

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Create a password" required />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input id="confirm-password" type="password" placeholder="Confirm password" required />

                        <button className="auth-btn">Signup</button>
                    </form>

                    <p className="or">or signup with</p>

                    <div className="social-icons">
                        <FaFacebookF />
                        <FaGoogle />
                        <FaLinkedin />
                    </div>
                </div>
            </div>
        </div>
    );
};
