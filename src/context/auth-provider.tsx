import axios from "axios";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

import type { AuthProviderProps, FormData, CookieValues } from "Types/context";

const AuthContext = createContext<{
    token?: string;
    isLoading: boolean;
    error: string;
    loggedOut: boolean;
    user: object;
    onLogin: (formData: FormData) => void;
    onLogout: () => void;
}>({
    token: "",
    isLoading: false,
    error: "",
    loggedOut: false,
    user: {},
    onLogin: () => {},
    onLogout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies<'token', CookieValues>(['token']);

    const [user, setUser] = useState<object>(() => {
        const userObj = localStorage.getItem("user");
        if (userObj) {
            return JSON.parse(userObj);
        }

        return {};
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [loggedOut, setLoggedOut] = useState(false);

    /* Set interceptor to make sure token is included in initial request if page is reloaded */
    const interceptor = axios.interceptors.request.use(config => {
        if (cookies.token) {
            config.headers.authorization = `Bearer ${cookies.token}`;
        }
        return config;
    });

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            setLoggedOut(true);
            handleLogout();
            /* Eject interceptor if authentication fails so that the old token isn't persisted */
            axios.interceptors.request.eject(interceptor);
        }
        return Promise.reject(error);
    });

    const handleLogin = (formData: FormData) => {
        setIsLoading(true);
        axios.post('/api/login', formData).then(res => {
            const today = new Date();
            setCookie('token', res.data.token, {
                expires: new Date(today.setHours(today.getHours() + 1)),
            });
            localStorage.setItem('user', JSON.stringify(formData));
            setUser(formData);
            setIsLoading(false);
            setError("");
        }).then(() => {
            navigate("/");
        }).catch(err => {
            console.log(err);
            setError(err.message);
            setIsLoading(false);
        });
    };

    const handleLogout = useCallback(() => {
        removeCookie('token');
        localStorage.removeItem('user');
    }, [removeCookie]);

    useEffect(() => {
        if (cookies.token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
            handleLogout();
        }
    }, [cookies.token, handleLogout]);

    const value = {
        token: cookies.token,
        isLoading,
        error,
        loggedOut,
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};