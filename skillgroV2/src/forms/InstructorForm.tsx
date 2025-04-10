import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';

interface FormData {
   name: string;
   email: string;
   phone: number;
   topic: string;
   message: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      phone: yup.number()
         .transform((originalValue, originalObject) => {
            // Convert empty string to NaN
            return originalObject && originalObject.phone === '' ? NaN : originalValue;
         })
         .typeError('Phone number is required')
         .required('Phone must be a number'),
      topic: yup.string().required().label("Topic"),
      message: yup.string().required().label("Message"),
   })
   .required();

const InstructorForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = () => {
      const notify = () => toast('Message Send successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="form-grp">
            <input type="text" {...register("name")} placeholder="Name" />
            <p className="form_error">{errors.name?.message}</p>
         </div>
         <div className="form-grp">
            <input type="email" {...register("email")} placeholder="E-mail" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <input type="text" {...register("topic")} placeholder="Topic" />
            <p className="form_error">{errors.topic?.message}</p>
         </div>
         <div className="form-grp">
            <input type="number" {...register("phone")} placeholder="Phone" />
            <p className="form_error">{errors.phone?.message}</p>
         </div>
         <div className="form-grp">
            <textarea {...register("message")} placeholder="Type Message"></textarea>
            <p className="form_error">{errors.message?.message}</p>
         </div>
         <button type="submit" className="btn arrow-btn">Send Message <BtnArrow /></button>
      </form>
   )
}

export default InstructorForm
