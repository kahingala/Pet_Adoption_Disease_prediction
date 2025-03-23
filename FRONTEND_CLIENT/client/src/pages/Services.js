import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <p>We offer pet adoption, health checkups, and pet supplies.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
