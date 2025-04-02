
import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`card-feature group hover:shadow-accent-light/50 transform transition-all duration-500 
      hover:translate-y-[-5px] hover:rotate-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Supercharge Your <span className="gradient-text">Study Life</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="AI-Powered Tutor Matching"
            description="Get matched with the perfect tutor based on your learning style and goals."
            icon={<GraduationCap size={32} className="text-primary" />}
            delay={100}
          />
          
          <FeatureCard 
            title="Find a Study Buddy"
            description="Connect with peers taking the same courses for regular study sessions."
            icon={<BookOpen size={32} className="text-secondary" />}
            delay={300}
          />
          
          <FeatureCard 
            title="Join a Campus Group"
            description="Discover and join study groups and academic clubs on your campus."
            icon={<Users size={32} className="text-accent" />}
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
