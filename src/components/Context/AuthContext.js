import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    // const baseUrl = "http://api.enj-asm.tech/api";
    const baseUrl = "http://localhost:8000/api";
    const [auth, setAuth] = useState({
        currentUser: {
            id: 0,
            name: null,
            email: null,
            username: null,
            token: null,
        },
        hasAccount: true,
        isLoggedIn: false,
        loginUrl: `${baseUrl}/login`,
        registerUrl: `${baseUrl}/register`,
        profileUrl: `${baseUrl}/user/detail`,
        logoutUrl: `${baseUrl}/logout`,
        getHistoryUrl: `${baseUrl}/code/history`,
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}