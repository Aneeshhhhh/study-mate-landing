import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Users, Upload, Search, Bell, LogOut, MessageSquare,
  Calendar, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSignup } from "@/contexts/SignupContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { name } = useSignup();
  const [userName, setUserName] = useState("there");
  
  // In a real app, this would come from authentication state
  const isStudent = true;
  
  useEffect(() => {
    // Set the user's name from the signup context
    if (name) {
      setUserName(name);
    }
  }, [name]);
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate("/");
  };
  
  const handleUploadPDF = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.click();
    
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        toast({
          title: "PDF Uploaded",
          description: "We're analyzing your document...",
        });
        
        // Simulate PDF processing
        setTimeout(() => {
          toast({
            title: "Analysis Complete",
            description: "Summary and quiz generated!",
          });
        }, 2000);
      }
    };
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the appropriate search page based on the query
      if (searchQuery.toLowerCase().includes('tutor')) {
        navigate('/search-tutors');
      } else if (searchQuery.toLowerCase().includes('buddy') || searchQuery.toLowerCase().includes('study')) {
        navigate('/search-buddies');
      } else if (searchQuery.toLowerCase().includes('partner') || searchQuery.toLowerCase().includes('campus')) {
        navigate('/search-partners');
      } else {
        // Default to tutors search if no specific keyword is found
        navigate('/search-tutors');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-accent-light/10">
      {/* Navbar */}
      <nav className="glass fixed-navbar px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">StudySync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="nav-link flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </a>
            <a href="#" className="nav-link flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </a>
            <a href="#" className="nav-link flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-primary rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
            </button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto pt-24 pb-12 px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Ready to connect and learn today?</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for students, tutors, or subjects..."
            className="pl-10 pr-4 py-2 rounded-lg border-gray-300 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        {/* Student Dashboard */}
        {isStudent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Find a Tutor
                </CardTitle>
                <CardDescription>Get help with difficult subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Connect with expert tutors who specialize in your subjects.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate('/search-tutors')}
                >
                  Find Tutors
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Find a Study Buddy
                </CardTitle>
                <CardDescription>Study together and stay motivated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Find peers with similar interests and academic goals.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate('/search-buddies')}
                >
                  Match Now
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Find a Campus Partner
                </CardTitle>
                <CardDescription>Connect for activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Find partners for sports, clubs, and campus activities.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate('/search-partners')}
                >
                  Find Partners
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload PDF
                </CardTitle>
                <CardDescription>Get AI-powered study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Upload your lecture notes or syllabus for an AI summary and quiz.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUploadPDF} className="w-full bg-primary hover:bg-primary/90 text-white">
                  Upload Document
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          /* Tutor Dashboard */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Tutoring History</CardTitle>
                <CardDescription>Recent tutoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Alex Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap">Python</td>
                        <td className="px-6 py-4 whitespace-nowrap">June 12, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">45 min</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Maria Garcia</td>
                        <td className="px-6 py-4 whitespace-nowrap">React</td>
                        <td className="px-6 py-4 whitespace-nowrap">June 10, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">60 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Requests</CardTitle>
                <CardDescription>Pending tutoring requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">James Wilson</h4>
                      <p className="text-sm text-gray-600">Java programming help - 30 min</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Decline</Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">Accept</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
