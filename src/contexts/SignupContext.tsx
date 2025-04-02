
import { createContext, useContext, useState, ReactNode } from "react";

export type Interest = "Java" | "React" | "Python" | "SpringBoot" | "JavaScript" | "TypeScript" | "MongoDB" | "PostgreSQL" | "AI" | "MachineLearning" | "WebDev" | "DataScience";
export type Role = "Student" | "Tutor";
export type StudentType = "TutorSeeker" | "StudyBuddy" | "CampusPartner";

interface SignupContextType {
  name: string;
  setName: (name: string) => void;
  age: number | null;
  setAge: (age: number | null) => void;
  gender: string;
  setGender: (gender: string) => void;
  degree: string;
  setDegree: (degree: string) => void;
  email: string;
  setEmail: (email: string) => void;
  interests: Interest[];
  toggleInterest: (interest: Interest) => void;
  role: Role | null;
  setRole: (role: Role) => void;
  studentType: StudentType | null;
  setStudentType: (type: StudentType | null) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

interface SignupProviderProps {
  children: ReactNode;
}

export const SignupProvider = ({ children }: SignupProviderProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [role, setRole] = useState<Role | null>(null);
  const [studentType, setStudentType] = useState<StudentType | null>(null);

  const toggleInterest = (interest: Interest) => {
    setInterests((prev) => 
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <SignupContext.Provider
      value={{
        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        degree,
        setDegree,
        email,
        setEmail,
        interests,
        toggleInterest,
        role,
        setRole,
        studentType,
        setStudentType,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};
