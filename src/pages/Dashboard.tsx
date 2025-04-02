import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Users, Upload, Search, Bell, LogOut, MessageSquare,
  Calendar, User, X, ArrowLeft, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSignup } from "@/contexts/SignupContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { name, age, gender, degree, email, interests, role, studentType } = useSignup();
  const [userName, setUserName] = useState("there");
  const [messageText, setMessageText] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<{id: number, name: string, image: string} | null>(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  
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
          description: "Please wait for the ML model to start processing",
        });
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

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      toast({
        title: "Message sent",
        description: `Your message has been sent to ${selectedUser.name}.`,
      });
      setMessageText("");
      setSelectedUser(null);
      setShowMessageBox(false);
      setIsMessageOpen(false);
    }
  };

  const handleSelectUser = (user: {id: number, name: string, image: string}) => {
    setSelectedUser(user);
    setShowMessageBox(true);
  };

  const handleBackToSearch = () => {
    setSelectedUser(null);
    setShowMessageBox(false);
  };

  // Mock calendar events
  const calendarEvents = [
    { id: 1, title: "Study Session with Aneesh", date: "2023-06-15", time: "10:00 AM - 11:30 AM" },
    { id: 2, title: "Tutoring Session - Python", date: "2023-06-16", time: "2:00 PM - 3:00 PM" },
    { id: 3, title: "Campus Partner Meetup", date: "2023-06-18", time: "5:00 PM - 6:00 PM" },
    { id: 4, title: "Group Study - Data Science", date: "2023-06-20", time: "1:00 PM - 3:00 PM" },
  ];

  // Mock users for messaging
  const mockUsers = [
    { id: 1, name: "Aneesh Puranik", image: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Aryan Tambe", image: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Om Kute", image: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Emily Rodriguez", image: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "David Wilson", image: "https://i.pravatar.cc/150?img=5" },
  ];

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(messageSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-accent-light/10">
      {/* Navbar */}
      <nav className="glass fixed-navbar px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">StudySync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <DialogTrigger asChild>
                <a href="#" className="nav-link flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Your Schedule</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    {calendarEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date} | {event.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsCalendarOpen(false)}>Close</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isMessageOpen} onOpenChange={(open) => {
              setIsMessageOpen(open);
              if (!open) {
                // Reset state when dialog is closed
                setSelectedUser(null);
                setShowMessageBox(false);
                setMessageText("");
              }
            }}>
              <DialogTrigger asChild>
                <a href="#" className="nav-link flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {showMessageBox && selectedUser ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handleBackToSearch}
                          className="h-8 w-8"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span>Message to {selectedUser.name}</span>
                      </div>
                    ) : (
                      "Find a User to Message"
                    )}
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {!showMessageBox ? (
                    <>
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search for a user..."
                          className="pl-10 pr-4 py-2 rounded-lg border-gray-300 w-full"
                          value={messageSearchQuery}
                          onChange={(e) => setMessageSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <div 
                              key={user.id} 
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleSelectUser(user)}
                            >
                              <img 
                                src={user.image} 
                                alt={user.name} 
                                className="w-10 h-10 rounded-full"
                              />
                              <span className="font-medium">{user.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No users found. Try a different search term.
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 mb-4 p-3 border rounded-lg">
                        <img 
                          src={selectedUser?.image} 
                          alt={selectedUser?.name} 
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">{selectedUser?.name}</span>
                      </div>
                      <Textarea
                        placeholder="Type your message here..."
                        className="min-h-[150px] mb-4"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendMessage}>Send Message</Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <a href="#" className="nav-link flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Your Profile</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium">{name || "User"}</h3>
                        <p className="text-sm text-gray-500">{email || "No email provided"}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-medium">{age || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{gender || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Degree</p>
                        <p className="font-medium">{degree || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium">{role || "Not specified"}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Student Type</p>
                        <p className="font-medium">{studentType || "Not specified"}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Interests</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {interests && interests.length > 0 ? (
                            interests.map((interest, index) => (
                              <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                {interest}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No interests specified</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsProfileOpen(false)}>Close</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <a href="#" className="nav-link flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-gray-600 hover:text-primary focus:outline-none">
            <Menu size={24} />
          </button>
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
