import { useState, useMemo } from "react";
import { Search, Users, MapPin, Clock, Activity, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock data for campus partners
const mockPartners = [
  {
    id: 1,
    name: "Aneesh Puranik",
    activities: ["Hiking", "Cricket", "Photography"],
    interests: ["Outdoor Adventures", "Sports", "Nature"],
    availability: "Weekends, Afternoons",
    location: "Main Campus",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Aryan Tambe",
    activities: ["Football", "Basketball", "Swimming"],
    interests: ["Team Sports", "Fitness", "Competition"],
    availability: "Evenings, Weekends",
    location: "Sports Complex",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Om Kute",
    activities: ["Camping", "Rock Climbing", "Cycling"],
    interests: ["Adventure Sports", "Outdoor Activities", "Exploration"],
    availability: "Flexible",
    location: "Off-Campus",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    activities: ["Yoga", "Dancing", "Volleyball"],
    interests: ["Fitness", "Wellness", "Team Activities"],
    availability: "Mornings, Weekends",
    location: "Fitness Center",
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "David Wilson",
    activities: ["Tennis", "Golf", "Running"],
    interests: ["Individual Sports", "Outdoor Activities", "Fitness"],
    availability: "Weekdays, Mornings",
    location: "Sports Complex",
    image: "https://i.pravatar.cc/150?img=5"
  }
];

const SearchPartners = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const activities = ["Hiking", "Camping", "Cricket", "Football", "Basketball", "Swimming", "Rock Climbing", "Cycling", "Yoga", "Dancing", "Volleyball", "Tennis", "Golf", "Running", "Photography"];
  
  const interests = ["Outdoor Adventures", "Sports", "Nature", "Team Sports", "Fitness", "Competition", "Adventure Sports", "Outdoor Activities", "Exploration", "Wellness", "Team Activities", "Individual Sports"];

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Filter partners based on search query, selected activities, and interests
  const filteredPartners = useMemo(() => {
    return mockPartners.filter(partner => {
      // Filter by search query (name, activities, or interests)
      const matchesSearch = searchQuery === "" || 
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.activities.some(activity => 
          activity.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        partner.interests.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Filter by selected activities
      const matchesActivities = selectedActivities.length === 0 || 
        selectedActivities.some(activity => partner.activities.includes(activity));
      
      // Filter by selected interests
      const matchesInterests = selectedInterests.length === 0 || 
        selectedInterests.some(interest => partner.interests.includes(interest));
      
      return matchesSearch && matchesActivities && matchesInterests;
    });
  }, [searchQuery, selectedActivities, selectedInterests]);

  const handleConnect = (partnerId: number) => {
    // In a real app, this would navigate to a chat or connection page
    console.log(`Connecting with campus partner ${partnerId}`);
    // For now, just show an alert
    alert(`Connecting with campus partner ${partnerId}. This would open a chat in a real app.`);
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Your Campus Partner</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, activity, or interests..."
              className="pl-10 pr-4 py-2 rounded-lg border-gray-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Filter by Activities</h3>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <Button
                  key={activity}
                  variant={selectedActivities.includes(activity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleActivity(activity)}
                  className="rounded-full"
                >
                  {activity}
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
            Showing {filteredPartners.length} of {mockPartners.length} campus partners
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle>{partner.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        {partner.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.activities.map((activity) => (
                          <span
                            key={activity}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.interests.map((interest) => (
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
                      {partner.availability}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleConnect(partner.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Activity className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No campus partners found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more campus partners.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedActivities([]);
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

export default SearchPartners; 