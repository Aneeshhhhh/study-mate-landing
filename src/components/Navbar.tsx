import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed-navbar">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold gradient-text">
          StudySync
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="btn-secondary">
            Log In
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-primary focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md overflow-hidden z-50">
            <div className="px-6 py-4 flex flex-col space-y-3">
              <Link to="/" className="block nav-link">
                Home
              </Link>
              <a href="#features" className="block nav-link">
                Features
              </a>
              <a href="#about" className="block nav-link">
                About
              </a>
              <a href="#contact" className="block nav-link">
                Contact
              </a>
              <Link to="/login" className="block btn-secondary">
                Log In
              </Link>
              <Link to="/signup" className="block btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
