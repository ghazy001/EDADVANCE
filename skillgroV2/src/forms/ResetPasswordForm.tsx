import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import HeaderOne from '../layouts/headers/HeaderOne.tsx';
import FooterOne from '../layouts/footers/FooterOne.tsx';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message?: string;
}

const schema = yup
  .object({
    password: yup.string().required('Le mot de passe est requis'),
    confirmPassword: yup
      .string()
      .required('Confirmez le mot de passe')
      .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre'),
  })
  .required();

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/reset-password',
        {
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data || 'Mot de passe réinitialisé avec succès !', {
        position: 'top-center',
      });

      // Redirect based on role
      setTimeout(() => {
        if (user && (user.role === 'instructor' || user.role === 'admin')) {
          window.location.href = '/instructor-dashboard';
        } else {
          window.location.href = '/courses';
        }
      }, 2000);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || 'Erreur lors de la réinitialisation';
      toast.error(errorMessage, { position: 'top-center' });
    }
  };

  return (
    <>
      <HeaderOne />
      <div className="m-5"></div>
      <div className="container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-grp">
          <div className="form-grp">
            <label htmlFor="password">New Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder="Enter new password"
              {...register('password')}
            />
            <p className="form_error">{errors.password?.message}</p>
          </div>
          <div className="form-grp">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              {...register('confirmPassword')}
            />
            <p className="form_error">{errors.confirmPassword?.message}</p>
          </div>
          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
      </div>
      <div className="m-5"></div>
      <FooterOne />
    </>
  );
};

export default ResetPassword;