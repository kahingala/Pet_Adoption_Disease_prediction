import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p>We are dedicated to finding loving homes for pets.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
