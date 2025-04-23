import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import BtnArrow from '../svg/BtnArrow';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface FormData {
  email: string;
  password: string;
  otp?: string;
}

const schema = yup
    .object({
      email: yup.string().required("L'email est requis").email("L'email doit être valide"),
      password: yup.string().required('Le mot de passe est requis'),
      otp: yup.string().when('$isOtpStep', {
        is: true,
        then: (schema) => schema.required("L'OTP est requis"),
        otherwise: (schema) => schema.notRequired(),
      }),
    })
    .required();

const LoginForm = () => {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    context: { isOtpStep },
  });

  const onSubmitSignin = async (data: FormData) => {
    try {
      const response = await axios.post(
          'http://localhost:3000/user/signin',
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
      );
      const { status, message, data: responseData } = response.data;

      if (status === 'PENDING') {
        setUserId(responseData.userId);
        setEmail(data.email); // Store email for potential resend
        setIsOtpStep(true);
        toast.success('OTP envoyé à votre email. Veuillez le saisir.', { position: 'top-center' });
      } else {
        toast.error(message || 'Erreur inattendue lors de la connexion', { position: 'top-center' });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'Erreur lors de la connexion', {
        position: 'top-center',
      });
    }
  };

  const onSubmitOtp = async (data: FormData) => {
    if (!userId || !data.otp) {
      toast.error("Veuillez d'abord demander un OTP et le saisir.", { position: 'top-center' });
      return;
    }
    try {
      const response = await axios.post(
          'http://localhost:3000/user/verifyOTP',
          { userId, otp: data.otp },
          { withCredentials: true }
      );
      const { status, user } = response.data;

      if (status === 'VERIFIED') {
        setUser(user);
        toast.success('Connexion réussie ! Bienvenue.', { position: 'top-center' });
        reset();
        setUserId(null);
        setIsOtpStep(false);

        // Redirect based on role
        if (user.role === 'instructor' || user.role === 'admin') {
          navigate('/instructor-dashboard');
        } else {
          navigate('/courses');
        }
      } else {
        toast.error('Erreur inattendue lors de la vérification', { position: 'top-center' });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Erreur lors de la vérification de l'OTP", {
        position: 'top-center',
      });
    }
  };

  const handleResendOTP = async () => {
    if (!userId || !email) return;

    try {
      await axios.post(
          'http://localhost:3000/user/resendOTPVerificationCode',
          { userId, email },
          { withCredentials: true }
      );
      toast.success('Nouvel OTP envoyé à votre email', { position: 'top-center' });
    } catch (error) {
      toast.error("Erreur lors de l'envoi d'un nouvel OTP", { position: 'top-center' });
    }
  };

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
                    {...register('email')}
                    type="email"
                    placeholder="email"
                />
                <p className="form_error">{errors.email?.message}</p>
              </div>
              <div className="form-grp">
                <label htmlFor="password">Mot de passe</label>
                <input
                    id="password"
                    {...register('password')}
                    type="password"
                    placeholder="password"
                />
                <p className="form_error">{errors.password?.message}</p>
              </div>
              <div className="account__check">
                <div className="account__check-remember">
                  <input type="checkbox" className="form-check-input" id="terms-check" />
                  <label htmlFor="terms-check" className="form-check-label">
                    Se souvenir de moi
                  </label>
                </div>
                <div className="account__check-forgot">
                  <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
                </div>
              </div>
            </>
        ) : (
            <>
              <div className="form-grp">
                <label htmlFor="otp">Code OTP</label>
                <input
                    id="otp"
                    {...register('otp')}
                    type="text"
                    placeholder="Entrez le code reçu par email"
                />
                <p className="form_error">{errors.otp?.message}</p>
              </div>
              <div className="account__check">
                <div className="account__check-forgot">
                  <button
                      type="button"
                      onClick={handleResendOTP}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--tg-theme-primary)',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                  >
                    Renvoyer l'OTP
                  </button>
                </div>
              </div>
            </>
        )}
        <button
            type="submit"
            className="btn btn-two arrow-btn"
            disabled={isSubmitting}
        >
          {isSubmitting ? (
              'Traitement...'
          ) : isOtpStep ? (
              "Vérifier l'OTP"
          ) : (
              <>
                Se connecter <BtnArrow />
              </>
          )}
        </button>
      </form>
  );
};

export default LoginForm;