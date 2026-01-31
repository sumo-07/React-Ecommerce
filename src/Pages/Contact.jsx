import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG } from "react-icons/fa";
import "../components/css/contact.css"
export const Contact = () => {
    return (
        <main className="container contact-page">

            {/* Left: Map + Socials */}
            <div className="contact-left">
                <h2>Find Us</h2>

                <div className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14004.690660434346!2d77.49147280247684!3d28.654548260439885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf277200cc24b%3A0xc54603b3a4862f14!2sWave%20City%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1764918666769!5m2!1sen!2sin"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <h3>Follow Us</h3>
                <div className="contact-socials">
                    <FaFacebookF />
                    <FaTwitter />
                    <FaInstagram />
                    <FaGooglePlusG />

                </div>
                <p className="copy" >&copy;{new Date().getFullYear()} ShopEzzz. Privacy Policy</p>
            </div>

            {/* Right: Form */}
            <div className="contact-right">
                <h2>Contact Form</h2>
                <form className="contact-form">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter your Name" required />

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter a valid email address" required />

                    <label htmlFor="message">Message</label>
                    <textarea rows="5" placeholder="Enter your message" required ></textarea>

                    <button type="submit" >Submit</button>

                </form>
            </div>
        </main>
    );
}