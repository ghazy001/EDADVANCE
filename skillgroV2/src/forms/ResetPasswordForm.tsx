import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import HeaderOne from "../layouts/headers/HeaderOne.tsx";
import FooterOne from "../layouts/footers/FooterOne.tsx";

// Définir les champs du formulaire
interface FormData {
    password: string;
    confirmPassword: string;
}

// Définir le type de la réponse d’erreur du backend
interface ErrorResponse {
    message?: string;
}

// Schéma de validation avec Yup
const schema = yup
    .object({
        password: yup.string().required("Le mot de passe est requis"),
        confirmPassword: yup
            .string()
            .required("Confirmez le mot de passe")
            .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
    })
    .required();

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>(); // Typage explicite du token
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post("http://localhost:3000/user/reset-password", {
                token,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });

            // Afficher une notification de succès
            toast.success(response.data.message || "Mot de passe réinitialisé avec succès !", {
                position: "top-center",
            });

            // Rediriger vers la page de login après 2 secondes
            setTimeout(() => navigate('/courses'), 2000);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || "Erreur lors de la réinitialisation";
            console.error("Erreur:", errorMessage);

            // Afficher une notification d’erreur
            toast.error(errorMessage, { position: "top-center" });
        }
    };

    return (
        <>
            <HeaderOne />
            <div className="m-5"></div>
        <div className="container"  >
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form-grp">
                <div className="form-grp">
                    <label htmlFor="password"  >New Password</label>
                    <input
                        className="form-control"

                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        {...register("password")}
                    />
                    <p className="form_error">{errors.password?.message}</p>
                </div>
                <div className="form-grp">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm new password"
                        {...register("confirmPassword")}

                        className="form-control"
                    />
                    <p className="form_error">{errors.confirmPassword?.message}</p>
                </div>
                <button type="submit"  className="btn">Reset Password</button>
            </form>
        </div>
            <div className="m-5"></div>
           <FooterOne/>
        </>
    );
};

export default ResetPassword;