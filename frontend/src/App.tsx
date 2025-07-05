import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { useEffect } from "react";
import { Logo } from "./components/Logo";

function App() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div
            className="
		min-h-screen 
		flex 
		flex-col 
		items-center 
		justify-center 
		bg-gray-100
		"
        >
            <div className="absolute top-3 left-3">
                <Logo />
            </div>
            <Routes>
                {token ? (
                    <Route path="/dashboard" element={<Dashboard />} />
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
