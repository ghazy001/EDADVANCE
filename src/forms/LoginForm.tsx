import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import BtnArrow from "../svg/BtnArrow";
import { Link, useNavigate } from "react-router-dom";

// Interface pour les données du formulaire
interface FormData {
    email: string;
    password: string;
    otp?: string; // OTP est optionnel car utilisé seulement après signin
}

// Schéma de validation avec Yup
const schema = yup
    .object({
        email: yup.string().required("L'email est requis").email("L'email doit être valide"),
        password: yup.string().required("Le mot de passe est requis"),
        otp: yup.string().when("$isOtpStep", {
            is: true,
            then: (schema) => schema.required("L'OTP est requis"),
            otherwise: (schema) => schema.notRequired(),
        }),
    })
    .required();

const LoginForm = () => {
    const [isOtpStep, setIsOtpStep] = useState(false); // Basculer entre email/password et OTP
    const [userId, setUserId] = useState<string | null>(null); // Stocker l'ID utilisateur
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        context: { isOtpStep }, // Passer isOtpStep au contexte pour la validation conditionnelle
    });

    // Étape 1 : Soumettre email et mot de passe pour recevoir l'OTP
    const onSubmitSignin = async (data: FormData) => {
        try {
            console.log("Tentative de connexion avec:", data);
            const response = await axios.post("http://localhost:3000/user/signin", {
                email: data.email,
                password: data.password,
            }, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Réponse de signin:", response.data);
            const { status, message, data: responseData } = response.data;

            if (status === "PENDING") {
                setUserId(responseData.userId);
                setIsOtpStep(true);
                toast.success("OTP envoyé à votre email. Veuillez le saisir.", { position: "top-center" });
            } else {
                toast.error(message || "Erreur inattendue lors de la connexion", { position: "top-center" });
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError.response?.data?.message || "Erreur lors de la connexion", { position: "top-center" });
            console.error("Erreur signin:", axiosError.response?.data || axiosError.message);
        }
    };

    // Étape 2 : Vérifier l'OTP
    const onSubmitOtp = async (data: FormData) => {
        if (!userId || !data.otp) {
            toast.error("Veuillez d'abord demander un OTP et le saisir.", { position: "top-center" });
            return;
        }
        try {
            console.log("Vérification OTP pour userId:", userId, "avec OTP:", data.otp);
            const response = await axios.post(
                "http://localhost:3000/user/verifyOTP",
                { userId, otp: data.otp },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Réponse de verifyOTP:", response.data);
            const { status, message } = response.data;

            if (status === "VERIFIED") {
                toast.success("Connexion réussie ! Bienvenue.", { position: "top-center" });
                reset(); // Réinitialiser tous les champs
                setUserId(null);
                setIsOtpStep(false);
                navigate("/courses");
            } else {
                toast.error(message || "Erreur inattendue lors de la vérification", { position: "top-center" });
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError.response?.data?.message || "Erreur lors de la vérification de l'OTP", {
                position: "top-center",
            });
            console.error("Erreur verifyOTP:", axiosError.response?.data || axiosError.message);
        }
    };

    // Choisir la fonction de soumission selon l'étape
    const handleFormSubmit = (data: FormData) => {
        if (isOtpStep) {
            onSubmitOtp(data);
        } else {
            onSubmitSignin(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="account__form">
            {!isOtpStep ? (
                <>
                    <div className="form-grp">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            {...register("email")}
                            type="email"
                            placeholder="email"
                        />
                        <p className="form_error">{errors.email?.message}</p>
                    </div>
                    <div className="form-grp">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            {...register("password")}
                            type="password"
                            placeholder="password"
                        />
                        <p className="form_error">{errors.password?.message}</p>
                    </div>
                    <div className="account__check">
                        <div className="account__check-remember">
                            <input type="checkbox" className="form-check-input" id="terms-check" />
                            <label htmlFor="terms-check" className="form-check-label">Se souvenir de moi</label>
                        </div>
                        <div className="account__check-forgot">
                            <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="form-grp">
                    <label htmlFor="otp">Code OTP</label>
                    <input
                        id="otp"
                        {...register("otp")}
                        type="text"
                        placeholder="Entrez le code reçu par email"
                    />
                    <p className="form_error">{errors.otp?.message}</p>
                </div>
            )}
            <button type="submit" className="btn btn-two arrow-btn">
                {isOtpStep ? "Vérifier l'OTP" : "Se connecter"} <BtnArrow />
            </button>
        </form>
    );
};

export default LoginForm;