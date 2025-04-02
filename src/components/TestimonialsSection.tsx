import { useEffect, useState, useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  affiliation: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I aced my finals thanks to StudySync!",
    name: "Aneesh Puranik",
    affiliation: "MIT '25",
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    quote: "Met my startup co-founder here!",
    name: "Aryan Tambe",
    affiliation: "Stanford '26",
    avatar: "https://i.pravatar.cc/100?img=3"
  }
];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`glass p-6 rounded-xl ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name}'s avatar`} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <p className="text-lg mb-4">{testimonial.quote}</p>
                  <p className="font-semibold">
                    – {testimonial.name}, <span className="text-secondary">{testimonial.affiliation}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile layout - horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-6 flex snap-x snap-mandatory gap-4 scrollbar-none">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`glass p-6 rounded-xl flex-shrink-0 w-[85%] snap-center ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-out`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name}'s avatar`} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <p className="text-base mb-3">{testimonial.quote}</p>
                  <p className="font-semibold text-sm">
                    – {testimonial.name}, <span className="text-secondary">{testimonial.affiliation}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
