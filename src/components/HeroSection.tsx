import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center pt-20 pb-10 px-4 md:px-8 lg:px-12"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className={`max-w-xl ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 typewriter">
            Never Study Alone Again
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AI-matched tutors • Accountability partners • Campus friends.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup" className="btn-primary animate-pulse-glow">
              Login/Signup
            </Link>
            <button 
              onClick={scrollToAbout}
              className="btn-secondary hover:scale-[1.02]"
            >
              How It Works <ChevronRight className="inline ml-1" size={18} />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-in-out delay-300 hidden md:block`}>
          <div className="w-full h-96 bg-gradient-to-br from-secondary/20 via-accent-light/30 to-primary/20 rounded-2xl p-4 relative overflow-hidden animate-float">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-secondary/30 rounded-full"></div>
            <div className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent/30 rounded-full"></div>
            
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2EC4B6" d="M40.8,-57.1C55.6,-44.7,72,-35.7,75.5,-23.1C79.1,-10.5,69.8,5.6,60.4,18C50.9,30.5,41.3,39.4,30.5,53.6C19.8,67.9,7.6,87.5,-1.9,90.1C-11.4,92.6,-18.1,78,-30,67.7C-41.9,57.4,-59,51.5,-66.3,40.4C-73.6,29.3,-71.1,13.1,-68.1,-1.8C-65.2,-16.7,-61.8,-30.1,-52.9,-42.9C-44,-55.6,-29.5,-67.7,-14.7,-69.6C0.2,-71.5,15.3,-63.1,28.5,-55.7Q18,13.4,40.8,-57.1Z" transform="translate(100 100)" />
            </svg>
            
            {/* Students SVG placeholder - in a real project this would be replaced with actual SVG or 3D graphics */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl">👩‍🎓</span>
                </div>
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl">👨‍🎓</span>
                </div>
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl">👩‍💻</span>
                </div>
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile only SVG */}
        <div className="md:hidden animate-float">
          <div className="w-full h-64 bg-gradient-to-br from-secondary/20 via-accent-light/30 to-primary/20 rounded-2xl flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <span className="text-3xl">👩‍🎓</span>
              </div>
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <span className="text-3xl">👨‍🎓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
