import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import faceIO, {FaceIO} from "@faceio/fiojs";
import { useNavigate } from "react-router-dom";
import HeaderOne from "../layouts/headers/HeaderOne.tsx";
import FooterOne from "../layouts/footers/FooterOne.tsx";

// Interface pour les erreurs FACEIO
interface FaceIOError {
    code: number;
    message?: string;
}

const FaceLogin: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [faceioInstance, setFaceioInstance] = useState<FaceIO | null>(null);

    const navigate = useNavigate();

    const fioErrCode = {
        PERMISSION_REFUSED: 1,
        NO_FACES_DETECTED: 2,
        UNRECOGNIZED_FACE: 3,
        MANY_FACES: 4,
        PAD_ATTACK: 5,
        FACE_MISMATCH: 6,
        NETWORK_IO: 7,
        WRONG_PIN_CODE: 8,
        PROCESSING_ERR: 9,
        UNAUTHORIZED: 10,
        TERMS_NOT_ACCEPTED: 11,
        UI_NOT_READY: 12,
        SESSION_EXPIRED: 13,
        TIMEOUT: 14,
        TOO_MANY_REQUESTS: 15,
        EMPTY_ORIGIN: 16,
        FORBIDDDEN_ORIGIN: 17,
        FORBIDDDEN_COUNTRY: 18,
        UNIQUE_PIN_REQUIRED: 19,
        SESSION_IN_PROGRESS: 20,
        FACE_DUPLICATION: 21,
        MINORS_NOT_ALLOWED: 22,
    };

    // Initialiser FaceIO au montage
    useEffect(() => {
        try {
            const fio = new faceIO("ur_api_kei"); // Remplace par ton Public ID
            setFaceioInstance(fio);
        } catch (err: unknown) {
            console.error("FaceIO initialization failed:", err);
            setError("Failed to initialize facial recognition service.");
        }
    }, []);

    // Gérer la connexion avec l'authentification faciale
    const handleLogin = async () => {
        if (!faceioInstance) {
            setError("Facial recognition service is not ready.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const authResponse = await faceioInstance.authenticate({
                locale: "auto",
            });

            const facialId = authResponse.facialId;
            console.log("Login facialId:", facialId); // Debug log

            const response = await axios.post("http://localhost:3000/user/face-login", {
                facialId,
            });

            alert(`🎉 Login successful! Welcome back, ${response.data.user.name}!`);
            navigate("/courses");
        } catch (err: unknown) {
            console.error("Login error:", err);
            let errorMessage = "Login failed. Please try again.";
            if ((err as FaceIOError).code) {
                const faceError = err as FaceIOError;
                switch (faceError.code) {
                    case fioErrCode.PERMISSION_REFUSED:
                        errorMessage = "Camera access was denied.";
                        break;
                    case fioErrCode.NO_FACES_DETECTED:
                        errorMessage = "No face detected.";
                        break;
                    case fioErrCode.UNRECOGNIZED_FACE:
                        errorMessage = "Face not recognized. Please register first.";
                        break;
                    case fioErrCode.MANY_FACES:
                        errorMessage = "Multiple faces detected.";
                        break;
                    case fioErrCode.NETWORK_IO:
                        errorMessage = "Network error.";
                        break;
                    case fioErrCode.TIMEOUT:
                        errorMessage = "Process timed out.";
                        break;
                    case fioErrCode.TERMS_NOT_ACCEPTED:
                        errorMessage = "You must accept the terms.";
                        break;
                    default:
                        errorMessage = faceError.message || "Unexpected error.";
                }
            } else if ((err as AxiosError).response) {
                const axiosError = err as AxiosError<{ message?: string }>;
                if (axiosError.response?.status === 404) {
                    errorMessage = "Face not recognized. Please register first.";
                } else {
                    errorMessage = axiosError.response?.data?.message || "Server error.";
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderOne />

            <div className="container d-flex flex-column align-items-center justify-content-center text-center vh-100">
            <h1>Login with Face</h1>
            <div >
            <img src="https://img.icons8.com/ios/100/000000/face-id.png" alt="img"/>
            </div>
            <button
                onClick={handleLogin}
                disabled={loading}
             className="btn m-5"
            >
                {loading ? "Logging in..." : "Login with Face"}
            </button>
            {error && (
                <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>{error}</p>
            )}
        </div>
            <FooterOne/>
        </>
    );
};

export default FaceLogin;