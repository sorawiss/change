import { account } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";


interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    // error: string | null;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    // Get User
    async function getUser() {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            setUser(null);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    // Sign Up
    async function signUp(email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password)
            await signIn(email, password);
            return null;
        } catch (error) {
            console.log(error);
            return "Error signing up";
        }
    }


    // Sign In
    async function signIn(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password);
            await getUser();
            return null;
        } catch (error) {
            console.log(error);
            return "Error signing in";
        }
    }

    // Sign Out
    async function signOut() {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signUp,
            signOut,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}


// Custom Hook
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}