import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the UserProfile interface for TypeScript
interface UserProfile {
  image: string;
  fullName: string;
  email: string;
  phone?: string;
}

// Default user profile (initial values)
const defaultUser: UserProfile = {
  image: "https://via.placeholder.com/150", // Default image
  fullName: "John Doe",
  email: "test@example.com",
  phone: "+123 456 7890",
};

// Create the context with default values
const userContext = createContext<{
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}>( {
  user: defaultUser,
  setUser: () => {}, // Placeholder function to avoid errors before provider is used
});

// The UserProvider component that provides the context value
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  useEffect(() => {
    // Try to load the user data from localStorage or any persistent storage
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    // Whenever the user state changes, save the updated user data to localStorage
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the UserContext
const useUser = () => useContext(userContext);

export default UserProvider;
export { useUser };