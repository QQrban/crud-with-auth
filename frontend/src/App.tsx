import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { Modal } from "./components/Modal";
import type { ModalInfoType } from "./types/types";

function App() {
    const [modalInfo, setModalInfo] = useState<ModalInfoType>({
        type: "error",
        header: "",
        message: "",
    });
    const [openModal, setOpenModal] = useState<boolean>(false);
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
            {openModal && <Modal setOpenModal={setOpenModal} modalInfo={modalInfo} />}
            <div className="absolute top-3 left-3">
                <Logo />
            </div>
            <Routes>
                {token ? (
                    <Route path="/dashboard" element={<Dashboard />} />
                ) : (
                    <Route
                        path="/login"
                        element={
                            <Login
                                setOpenModal={setOpenModal}
                                setModalInfo={setModalInfo}
                            />
                        }
                    />
                )}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
