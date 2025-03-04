import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import faceIO, {FaceIO} from "@faceio/fiojs";
import { useNavigate } from "react-router-dom";
import HeaderOne from "../layouts/headers/HeaderOne.tsx";
import FooterOne from "../layouts/footers/FooterOne.tsx";

// Interface pour les props
interface FaceRegisterProps {
    setIsRegistering: (value: boolean) => void;
}

// Interface pour les erreurs FACEIO
interface FaceIOError {
    code: number;
    message?: string;
}

const FaceRegister: React.FC<FaceRegisterProps> = ({ setIsRegistering }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [faceioInstance, setFaceioInstance] = useState<FaceIO | null>(null); // Utilise FaceIO ici

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
            const fio = new faceIO("fioa17d4"); // Remplace par ton Public ID
            setFaceioInstance(fio);
        } catch (err: unknown) {
            console.error("FaceIO initialization failed:", err);
            setError("Failed to initialize facial recognition service.");
        }
    }, []);

    // Gérer l'inscription avec l'enrôlement facial
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!faceioInstance) {
            setError("Facial recognition service is not ready.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Enrôler le visage de l'utilisateur avec payload
            const enrollResponse = await faceioInstance.enroll({
                locale: "auto",
                payload: { email, name },
            });

            const facialId = enrollResponse.facialId;

            // Envoyer les données au backend
            await axios.post("http://localhost:3000/user/register-face", {
                facialId,
                name,
                email,
            });

            // Succès
            alert(`🎉 Registration successful! Welcome, ${name}!`);
            setIsRegistering(false);
            setName("");
            setEmail("");
            navigate("/courses");
        } catch (err: unknown) {
            console.error("Registration error:", err);

            let errorMessage = "Registration failed. Please try again.";
            if ((err as FaceIOError).code) {
                const faceError = err as FaceIOError;
                switch (faceError.code) {
                    case fioErrCode.PERMISSION_REFUSED:
                        errorMessage = "Camera access was denied.";
                        break;
                    case fioErrCode.NO_FACES_DETECTED:
                        errorMessage = "No face detected. Please position your face in the camera.";
                        break;
                    case fioErrCode.MANY_FACES:
                        errorMessage = "Multiple faces detected. Please ensure only one face is visible.";
                        break;
                    case fioErrCode.NETWORK_IO:
                        errorMessage = "Network error. Please check your connection.";
                        break;
                    case fioErrCode.TIMEOUT:
                        errorMessage = "Process timed out. Please try again.";
                        break;
                    case fioErrCode.FACE_DUPLICATION:
                        errorMessage = "This face is already registered.";
                        break;
                    case fioErrCode.TERMS_NOT_ACCEPTED:
                        errorMessage = "You must accept the terms to proceed.";
                        break;
                    default:
                        errorMessage = faceError.message || "An unexpected error occurred.";
                }
            } else if ((err as AxiosError).response) {
                const axiosError = err as AxiosError<{ message?: string }>;
                errorMessage = axiosError.response?.data?.message || "Server error during registration.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderOne />
            <div className="m-5"></div>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="card p-4 shadow" style={{ width: "400px" }}>
                    <h1 className="text-center mb-4">Face Authentication</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary w-100">
                            {loading ? "Registering..." : "Register with Face"}
                        </button>
                        {error && <p className="text-danger mt-2 text-center">{error}</p>}
                    </form>
                </div>
            </div>

            <div className="m-5"></div>
            <FooterOne/>
        </>
    );
};

export default FaceRegister;