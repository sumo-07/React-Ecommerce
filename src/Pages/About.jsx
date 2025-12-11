import aboutPeople from "../images/about-people.webp"
import aboutLogo from "../images/aboutEcommerce.webp"
import "../components/css/about.css"
export const About = () => {
    return (
        <main className="about-page">

            <div className="light-bg">


                {/* Section 1 */}
                <section className="container about-section">
                    <div className="about-text">
                        <h1>About Us</h1>
                        <p>
                            At <strong>ShopEase</strong>, we believe that shopping should be seamless, enjoyable,
                            and accessible to everyone. We are committed to offering high-quality products,
                            transparent pricing, and a delightful shopping experience.
                        </p>
                    </div>

                    <div className="about-image">
                        <img src={aboutPeople} alt="Team Group" />
                    </div>
                </section>

            </div>

            {/* Section 2 */}
            <section className="container about-section reverse">
                <div className="about-image">
                    <img src={aboutLogo} alt="Office Environment" />
                </div>

                <div className="about-text">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to make online shopping better — not just bigger. We focus on customer
                        happiness, fast delivery, and trust. With secure payments, easy returns, and verified sellers,
                        we ensure that every order feels effortless.
                    </p>
                </div>
            </section>

        </main>
    );
}