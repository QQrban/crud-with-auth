import { useEffect, useState } from "react";
import axios from "axios";

export default function Ping() {
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        axios
            .get("http://localhost:8080/ping")
            .then(() => setStatus("Connected to backend!"))
            .catch(() => setStatus("Cannot connect to backend."));
    }, []);

    return (
        <div>
            <h2>Backend status:</h2>
            <p>{status}</p>
        </div>
    );
}
