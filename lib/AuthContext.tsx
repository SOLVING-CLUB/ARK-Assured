import { createContext, useContext, useState, ReactNode } from "react";

type Role = "user" | "professional" | null;

type User = {
  name: string;
  email: string;
  phone: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  role: Role;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
