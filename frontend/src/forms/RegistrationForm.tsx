import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import BtnArrow from "../svg/BtnArrow";

// Interface pour les champs du formulaire avec le token reCAPTCHA
interface FormData {
    name: string;
    email: string;
    password: string;
    cpassword: string;
    recaptchaToken: string; // Token reCAPTCHA v3
}

// Schéma de validation avec Yup
const schema = yup
    .object({
        name: yup.string().required("Le nom est requis"),
        email: yup.string().required("L'email est requis").email("L'email doit être valide"),
        password: yup.string().required("Le mot de passe est requis"),
        cpassword: yup
            .string()
            .required("Confirmez le mot de passe")
            .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
        recaptchaToken: yup.string().required("Vérification anti-bot requise"),
    })
    .required();

const RegistrationForm = () => {
    const [, setRecaptchaLoaded] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    // Charger le script reCAPTCHA v3
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?render=ur_api_kei"; // Remplace par ton Site Key
        script.async = true;
        script.onload = () => {
            setRecaptchaLoaded(true);
            window.grecaptcha.ready(() => {
                // Exécuter reCAPTCHA dès que prêt
                window.grecaptcha
                    .execute("ur_api_kei", { action: "register" })
                    .then((token: string) => {
                        setValue("recaptchaToken", token, { shouldValidate: true });
                    });
            });
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: "user",
                recaptchaToken: data.recaptchaToken, // Envoyer le token reCAPTCHA
            };

            const response = await axios.post("http://localhost:3000/user/add", userData);
            console.log("Utilisateur ajouté:", response.data.message || response.data);

            toast.success("Inscription réussie !", { position: "top-center" });
            reset();

            // Régénérer un nouveau token après soumission réussie
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute("ur_api_kei", { action: "register" })
                        .then((token: string) => {
                            setValue("recaptchaToken", token, { shouldValidate: true });
                        });
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            console.error("Erreur lors de l'ajout:", axiosError.response?.data || axiosError.message);
            toast.error(axiosError.response?.data?.message || "Erreur lors de l'inscription", {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <h2 className="title">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="account__form">
                <div className="form-grp">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        {...register("name")}
                        id="name"
                        placeholder="Nom complet"
                    />
                    <p className="form_error">{errors.name?.message}</p>
                </div>
                <div className="form-grp">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        id="email"
                        placeholder="Email"
                    />
                    <p className="form_error">{errors.email?.message}</p>
                </div>
                <div className="form-grp">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        {...register("password")}
                        id="password"
                        placeholder="Mot de passe"
                    />
                    <p className="form_error">{errors.password?.message}</p>
                </div>
                <div className="form-grp">
                    <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        {...register("cpassword")}
                        id="confirm-password"
                        placeholder="Confirmer le mot de passe"
                    />
                    <p className="form_error">{errors.cpassword?.message}</p>
                </div>
                <input
                    type="hidden"
                    {...register("recaptchaToken")}
                />
                <p className="form_error">{errors.recaptchaToken?.message}</p>
                <button type="submit" className="btn btn-two arrow-btn">
                    S'inscrire <BtnArrow />
                </button>
            </form>
        </div>
    );
};

// Définir les types pour reCAPTCHA
declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export default RegistrationForm;