import { useState } from "react";
import api from "../api";
import "../index.css";
import { type AuthResponse, type LoginForm } from "../types/types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<LoginForm>({
        identifier: "",
        password: "",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post<AuthResponse>(
                "/auth/login",
                loginForm
            );
            setLoginForm({ identifier: "", password: "" });
            const token = response.data.token;
            if (typeof token == "string" && token.length > 0) {
                sessionStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-6 bg-white shadow-md rounded-sm p-7 w-96">
                <div className="text-2xl text-gray-500">Login</div>
                <div className="text-sm text-gray-500">
                    If you're having trouble logging in, please contact the
                    database administrator to request access or reset your
                    password.
                </div>
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <Input
                        value={loginForm.identifier}
                        onChange={(e) =>
                            setLoginForm({
                                ...loginForm,
                                identifier: e.target.value,
                            })
                        }
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                    />
                    <Input
                        value={loginForm.password}
                        onChange={(e) =>
                            setLoginForm({
                                ...loginForm,
                                password: e.target.value,
                            })
                        }
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <Button name="Login" />
                </form>
            </div>
        </div>
    );
}
