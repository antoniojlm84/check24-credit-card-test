import { useContext } from 'react';
import { AuthContext } from 'src/contexts/GoogleAuthContext';

export const useAuth = () => useContext(AuthContext);
