import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedin } from "react-icons/fa";
import "../components/css/auth.css";

export const Login = () => {
    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-left">
                    <h2>Welcome back!</h2>
                    <p>We're happy to see you again. Login to continue shopping.</p>

                    <NavLink to="/signup" className="auth-switch">
                        Don't have an account? Signup.
                    </NavLink>
                </div>

                <div className="auth-right">
                    <h1>Login</h1>

                    <form>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" required />

                        <button className="auth-btn">Login</button>
                    </form>
                    <p className="or">or login with</p>
                    <div className="auth-social-icons">
                        <FaFacebookF />
                        <FaGoogle />
                        <FaLinkedin />
                    </div>
                </div>
            </div>
        </div>
    );
};
