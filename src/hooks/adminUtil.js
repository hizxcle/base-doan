import { adminContext } from '~/components/contexts/AdminContext';
import { useContext } from 'react';
export default function useAdminUtil() {
    const adUtil = useContext(adminContext);
    return adUtil;
}
