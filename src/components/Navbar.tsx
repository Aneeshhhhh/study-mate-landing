import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
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
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogin}
          >
            <LogIn className="h-4 w-4" />
            <span>Log In</span>
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleSignup}
          >
            <span>Sign Up</span>
          </Button>
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
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 w-full"
                onClick={handleLogin}
              >
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </Button>
              <Button 
                className="flex items-center justify-center gap-2 w-full"
                onClick={handleSignup}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
