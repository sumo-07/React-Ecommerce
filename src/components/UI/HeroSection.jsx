import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom"
import heroLogo from "../../images/heroSection.webp"
import "../css/HeroSection.css"
export const HeroSection = () => {
    return (
        <section className="container hero">
            {/* left side */}
            <div className="hero-content">
                <h1>
                    Discover Amazing Products, <br />
                    <span>Just for You.</span>
                </h1>
                <p>
                    Shop trending gadgets, fashion, electronics, decor and more — all in one place.
                    Hand-picked products, best prices, and fast delivery.
                </p>

                <Link to="/product" className="hero-btn">
                    Start Shopping {<FaArrowRight />}
                </Link>
            </div>

            {/* right side */}
            <div className="hero-image">
                <img src={heroLogo} alt="ecommerce shopping" />
            </div>
            
        </section>
    );
};
