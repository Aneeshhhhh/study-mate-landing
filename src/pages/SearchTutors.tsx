import { useState, useMemo } from "react";
import { Search, Filter, Star, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock data for tutors
const mockTutors = [
  {
    id: 1,
    name: "Aneesh Puranik",
    subjects: ["Python", "Machine Learning", "Data Science"],
    rating: 4.9,
    experience: "5 years",
    hourlyRate: "$45",
    availability: "Weekdays, Evenings",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Aryan Tambe",
    subjects: ["React", "JavaScript", "TypeScript"],
    rating: 4.8,
    experience: "3 years",
    hourlyRate: "$40",
    availability: "Weekends, Afternoons",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Om Kute",
    subjects: ["Java", "Spring Boot", "Web Development"],
    rating: 4.7,
    experience: "4 years",
    hourlyRate: "$35",
    availability: "Flexible",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    subjects: ["Python", "Data Science", "Web Development"],
    rating: 4.6,
    experience: "2 years",
    hourlyRate: "$30",
    availability: "Evenings, Weekends",
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "David Wilson",
    subjects: ["React", "JavaScript", "UI/UX Design"],
    rating: 4.9,
    experience: "6 years",
    hourlyRate: "$50",
    availability: "Weekdays, Mornings",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    name: "Dr. Sarah Johnson",
    subjects: ["Python", "Machine Learning", "Data Science"],
    rating: 4.9,
    experience: "5 years",
    hourlyRate: "$45",
    availability: "Weekdays, Evenings",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 7,
    name: "Prof. Michael Chen",
    subjects: ["React", "JavaScript", "TypeScript"],
    rating: 4.8,
    experience: "3 years",
    hourlyRate: "$40",
    availability: "Weekends, Afternoons",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 8,
    name: "Lisa Blackwell",
    subjects: ["Java", "Spring Boot", "Web Development"],
    rating: 4.7,
    experience: "4 years",
    hourlyRate: "$35",
    availability: "Flexible",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 9,
    name: "James Taylor",
    subjects: ["Java", "Spring Boot", "Database Design"],
    rating: 4.5,
    experience: "3 years",
    hourlyRate: "$38",
    availability: "Flexible",
    image: "https://i.pravatar.cc/150?img=6"
  }
];

const SearchTutors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjects = ["Python", "React", "Java", "JavaScript", "TypeScript", "Machine Learning", "Data Science", "Web Development", "Spring Boot", "UI/UX Design", "Database Design"];

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  // Filter tutors based on search query and selected subjects
  const filteredTutors = useMemo(() => {
    return mockTutors.filter(tutor => {
      // Filter by search query (name or subjects)
      const matchesSearch = searchQuery === "" || 
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Filter by selected subjects
      const matchesSubjects = selectedSubjects.length === 0 || 
        selectedSubjects.some(subject => tutor.subjects.includes(subject));
      
      return matchesSearch && matchesSubjects;
    });
  }, [searchQuery, selectedSubjects]);

  const handleBookSession = (tutorId: number) => {
    // In a real app, this would navigate to a booking page or open a modal
    console.log(`Booking session with tutor ${tutorId}`);
    // For now, just show an alert
    alert(`Booking session with tutor ${tutorId}. This would open a booking form in a real app.`);
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Tutor</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, subject, or expertise..."
              className="pl-10 pr-4 py-2 rounded-lg border-gray-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSubject(subject)}
                className="rounded-full"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTutors.length} of {mockTutors.length} tutors
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle>{tutor.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {tutor.rating} ({tutor.experience} experience)
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {tutor.availability}
                    </div>
                    <div className="text-lg font-semibold">
                      {tutor.hourlyRate}/hour
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleBookSession(tutor.id)}
                  >
                    Book a Session
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No tutors found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more tutors.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubjects([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTutors; 