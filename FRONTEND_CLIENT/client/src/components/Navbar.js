import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-brown-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Pet Adoption</h1>
      <div>
        <Link className="px-4" to="/">Home</Link>
        <Link className="px-4" to="/about">About</Link>
        <Link className="px-4" to="/services">Services</Link>
      </div>
    </nav>
  );
};

export default Navbar;
