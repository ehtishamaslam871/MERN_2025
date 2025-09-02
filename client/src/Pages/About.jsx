
import "./About.css";

const About = () => {
  return (
    <section className="section-about">
      <div className="container grid grid-two-cols">
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            We are a passionate team dedicated to delivering top-quality services
            and innovative solutions. Our goal is to help you achieve your dreams
            by combining creativity, technology, and expertise.
          </p>
          <p>
            With years of experience in our field, we take pride in building
            long-lasting relationships with our clients and ensuring their
            satisfaction every step of the way.
          </p>
            <a href="/services">
          <button className="primary-btn">Learn More</button>
</a>
        </div>
        <div className="about-image">
          <img
            src="./images/ABOUT.png"
            alt="About us"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
