import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        currentUser: {
            id: 0,
            name: null,
            email: null,
            username: null,
        },
        hasAccount: true,
        isLoggedIn: false,
        loginUrl: 'http://localhost:8000/api/login',
        registerUrl: 'http://localhost:8000/api/register',
        profileUrl: 'http://localhost:8000/api/user/detail',
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}