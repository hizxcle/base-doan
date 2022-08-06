import { authContext } from '~/components/contexts/AuthContext';
import { useContext } from 'react';
export default function useAuth() {
    const auth = useContext(authContext);
    return auth;
}
