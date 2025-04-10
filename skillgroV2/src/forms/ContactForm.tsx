import { toast } from 'react-toastify';
import BtnArrow from '../svg/BtnArrow';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

interface FormData {
   user_name: string;
   user_email: string;
   web: string;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      web: yup.string().required().label("Website"),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = () => {
      if (form.current) {
         emailjs.sendForm('eaglesthemes', 'template_lojvsvb', form.current, 'mtLgOuG25NnIwGeKm')
            .then((result) => {
               const notify = () => toast('Message sent successfully', { position: 'top-center' });
               notify();
               reset();
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });
      } else {
         console.error("Form reference is null");
      }
   };

   return (
      <form ref={form} onSubmit={handleSubmit(sendEmail)} id="contact-form">
         <div className="form-grp">
            <textarea {...register("message")} placeholder="Comment" required></textarea>
            <p className="form_error">{errors.message?.message}</p>
         </div>
         <div className="row">
            <div className="col-md-4">
               <div className="form-grp">
                  <input {...register("user_name")} type="text" placeholder="Name *" required />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-md-4">
               <div className="form-grp">
                  <input {...register("user_email")} type="email" placeholder="E-mail *" required />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-md-4">
               <div className="form-grp">
                  <input {...register("web")} type="url" placeholder="Website *" required />
                  <p className="form_error">{errors.web?.message}</p>
               </div>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Submit Now <BtnArrow /></button>
      </form>
   )
}

export default ContactForm
