import { useState, useMemo } from "react";
import { Search, Users, Star, Clock, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock data for study buddies
const mockBuddies = [
  {
    id: 1,
    name: "Aneesh Puranik",
    subjects: ["Python", "Machine Learning", "Data Science"],
    interests: ["AI Research", "Competitive Programming", "Hackathons"],
    studyStyle: "Focused, Regular Sessions",
    availability: "Weekdays, Evenings",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Aryan Tambe",
    subjects: ["React", "JavaScript", "TypeScript"],
    interests: ["Web Development", "UI/UX Design", "Open Source"],
    studyStyle: "Collaborative, Project-based",
    availability: "Weekends, Afternoons",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Om Kute",
    subjects: ["Java", "Spring Boot", "Web Development"],
    interests: ["Backend Development", "System Design", "Cloud Computing"],
    studyStyle: "Structured, Goal-oriented",
    availability: "Flexible",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    subjects: ["Python", "Data Science", "Web Development"],
    interests: ["Data Visualization", "Machine Learning", "Research"],
    studyStyle: "Analytical, Detail-oriented",
    availability: "Evenings, Weekends",
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "David Wilson",
    subjects: ["React", "JavaScript", "UI/UX Design"],
    interests: ["Frontend Development", "Accessibility", "Performance Optimization"],
    studyStyle: "Creative, Experiment-driven",
    availability: "Weekdays, Mornings",
    image: "https://i.pravatar.cc/150?img=5"
  }
];

const SearchBuddies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const subjects = ["Python", "React", "Java", "JavaScript", "TypeScript", "Machine Learning", "Data Science", "Web Development", "Spring Boot", "UI/UX Design", "Database Design"];
  
  const interests = ["AI Research", "Competitive Programming", "Hackathons", "Web Development", "UI/UX Design", "Open Source", "Backend Development", "System Design", "Cloud Computing", "Data Visualization", "Research", "Frontend Development", "Accessibility", "Performance Optimization"];

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Filter buddies based on search query, selected subjects, and interests
  const filteredBuddies = useMemo(() => {
    return mockBuddies.filter(buddy => {
      // Filter by search query (name, subjects, or interests)
      const matchesSearch = searchQuery === "" || 
        buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buddy.subjects.some(subject => 
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        buddy.interests.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Filter by selected subjects
      const matchesSubjects = selectedSubjects.length === 0 || 
        selectedSubjects.some(subject => buddy.subjects.includes(subject));
      
      // Filter by selected interests
      const matchesInterests = selectedInterests.length === 0 || 
        selectedInterests.some(interest => buddy.interests.includes(interest));
      
      return matchesSearch && matchesSubjects && matchesInterests;
    });
  }, [searchQuery, selectedSubjects, selectedInterests]);

  const handleConnect = (buddyId: number) => {
    // In a real app, this would navigate to a chat or connection page
    console.log(`Connecting with study buddy ${buddyId}`);
    // For now, just show an alert
    alert(`Connecting with study buddy ${buddyId}. This would open a chat in a real app.`);
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Your Study Buddy</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, subject, or interests..."
              className="pl-10 pr-4 py-2 rounded-lg border-gray-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Filter by Subjects</h3>
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
          
          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleInterest(interest)}
                  className="rounded-full"
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBuddies.length} of {mockBuddies.length} study buddies
          </p>
        </div>

        {/* Buddies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuddies.length > 0 ? (
            filteredBuddies.map((buddy) => (
              <Card key={buddy.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={buddy.image}
                      alt={buddy.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle>{buddy.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        {buddy.studyStyle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {buddy.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {buddy.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {buddy.availability}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleConnect(buddy.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No study buddies found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more study buddies.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubjects([]);
                  setSelectedInterests([]);
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

export default SearchBuddies; 