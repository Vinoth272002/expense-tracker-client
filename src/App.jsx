import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Root/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/signup" element={<SignUp/>}></Route>
                    <Route
                        path="/dashboard"
                        elment={
                            <ProtectedRoute>
                                <Home/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/income"
                        elment={
                            <ProtectedRoute>
                                <Income/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/expense"
                        elment={
                            <ProtectedRoute>
                                <Expense/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App;

// Check if token exists in localStorage
const isAuthenticated = !!localStorage.getItem("token");

const Root = () => {
    // Redirect to dashboard if authenticated, otherwise to login
    return isAuthenticated ? (<Navigate to="/dashboard"/>) : (<Navigate to="/login"/>);
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
}