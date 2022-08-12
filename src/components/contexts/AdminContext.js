import { createContext, memo, useState } from 'react';
export const adminContext = createContext();
function AdminContextProvider({ children }) {
    const [selectedUser, setSelectedUser] = useState('');
    const adUtil = {
        selectedUserId: selectedUser,
        setSelectedUserId(id) {
            setSelectedUser(id);
        },
    };
    return (
        <adminContext.Provider value={adUtil}>{children}</adminContext.Provider>
    );
}
export default memo(AdminContextProvider);
