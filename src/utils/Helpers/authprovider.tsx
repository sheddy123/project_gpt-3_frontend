import { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || 'false')
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
