import { useContext, useDebugValue } from 'react';
import AuthContext from '../Helpers/authprovider';

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.message ? 'Successfully logged in.' : 'Logged Out'
  );
  return useContext(AuthContext);
};

export default useAuth;
