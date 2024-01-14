import axios from 'axios';
import React, { useContext, useState, useEffect, useMemo } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const saveUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/users/showMe`);
            saveUser(data.user);
        } catch (error) {
            removeUser();
        }
        setIsLoading(false);
    };

    const logoutUser = async () => {
        try {
            await axios.delete('/api/auth/logout');
            removeUser();
        } catch (error) {
            console.log("There was an authorization error");
        }
    };

    useEffect(() => {
        // TODO: To be repimplemented when we add in authentication
        setIsLoading(false)
        // fetchUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                isLoading,
                saveUser,
                user,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
