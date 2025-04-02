
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Easter egg comment for hackathon judges
  // <!-- 🚀 Built for Hackathon Challenge by Team StudySync -->

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed-navbar transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#" className="text-2xl font-bold gradient-text">StudySync</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <a onClick={() => scrollToSection('home')} className="nav-link cursor-pointer">Home</a>
          <a onClick={() => scrollToSection('features')} className="nav-link cursor-pointer">Features</a>
          <a onClick={() => scrollToSection('about')} className="nav-link cursor-pointer">About</a>
          <a onClick={() => scrollToSection('contact')} className="nav-link cursor-pointer">Contact</a>
        </nav>
        
        <div className="hidden md:block">
          <button className="btn-primary hover:animate-pulse-glow">Login / Signup</button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-lg z-50 animate-fade-in flex flex-col justify-center items-center">
          <button 
            className="absolute top-6 right-6 text-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={28} />
          </button>
          
          <nav className="flex flex-col items-center space-y-6 mb-10">
            <a onClick={() => scrollToSection('home')} className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors">Home</a>
            <a onClick={() => scrollToSection('features')} className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors">Features</a>
            <a onClick={() => scrollToSection('about')} className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors">About</a>
            <a onClick={() => scrollToSection('contact')} className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <button className="btn-primary text-lg w-64">Login / Signup</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
