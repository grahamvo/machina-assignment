import { Routes, Route, Navigate } from "react-router";

import { useAuth } from "Context/auth-provider";

import ProtectedRoute from "./ProtectedRoute";

import Home from 'Pages/Home';
import SignIn from "Pages/SignIn";

function AppRoutes() {
    const { token } = useAuth();
    return (
        <Routes>
            <Route index element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            {!token && <Route path="sign-in" element={<SignIn />} />}
            <Route path="*" element={<Navigate to={token ? "/" : "sign-in"} replace />} />
        </Routes>
    );
}

export default AppRoutes;