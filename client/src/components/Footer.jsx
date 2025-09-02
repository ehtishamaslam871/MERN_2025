
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
           We provide innovative IT services and solutions tailored to meet your unique needs.
          </p>
        </div>

        <div className="footer-section">
     
     
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: ehtishamaslam871@gmail.com</p>
          <p>Phone: +92 347 9290049</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShamaVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;