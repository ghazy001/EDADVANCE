import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from "axios";
import HeaderOne from "../layouts/headers/HeaderOne.tsx";
import FooterOne from "../layouts/footers/FooterOne.tsx";

// Définir les champs du formulaire
interface FormData {
    email: string;
}

// Définir le type de la réponse d’erreur du backend
interface ErrorResponse {
    message?: string;
}

// Schéma de validation avec Yup
const schema = yup
    .object({
        email: yup.string().required("L'email est requis").email("L'email doit être valide"),
    })
    .required();

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (data: FormData) => {
        try {
            // Appeler la route correcte définie dans ton backend
            const response = await axios.post("http://localhost:3000/user/forgot-password", {
                email: data.email,
            });

            // Afficher une notification de succès
            toast.success(response.data || "Lien de réinitialisation envoyé !", {
                position: "top-center",
            });
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || "Erreur lors de l'envoi du lien";
            console.error("Erreur:", errorMessage);
            toast.error(errorMessage, { position: "top-center" });
        }
    };

    return (
        <>
            <HeaderOne />
            <div className="m-5"></div>
        <div className="container">
            <h2 className="title">Forgot Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form-grp">
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="form-control"
                />
                <p className="form_error">{errors.email?.message}</p>
                <button type="submit" className="btn">Send Reset Link</button>
            </form>
        </div>
            <div className="m-5"></div>
           <FooterOne/>
        </>
    );
};

export default ForgotPassword;