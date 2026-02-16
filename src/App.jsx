import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./store/useAuth";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";

const App = () => {
    const { isAuthenticated, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated = {isAuthenticated}>
                                <Home/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/income"
                        element={
                            <ProtectedRoute isAuthenticated = {isAuthenticated}>
                                <Income/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/expense"
                        element={
                            <ProtectedRoute isAuthenticated = {isAuthenticated}>
                                <Expense/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export default App;

