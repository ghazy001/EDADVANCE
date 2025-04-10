import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';

interface FormData {
   name: string;
   email: string;
   message: string;
   web: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
      web: yup.string().required().label("Website"),
   })
   .required();

const BlogForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = () => {
      const notify = () => toast('Comment sent successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <div className="comment-respond">
         <h4 className="comment-reply-title">Post a comment</h4>
         <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
            <p className="comment-notes">
               <span>Your email address will not be published. Required fields are marked *</span>
            </p>
            <div className="comment-field">
               <textarea placeholder="Comment" {...register("message")}></textarea>
               <p className="form_error">{errors.message?.message}</p>
            </div>
            <div className="row">
               <div className="col-lg-4">
                  <div className="comment-field">
                     <input type="text" {...register("name")} placeholder="Name" />
                     <p className="form_error">{errors.name?.message}</p>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="comment-field">
                     <input type="email" {...register("email")} placeholder="Email" />
                     <p className="form_error">{errors.email?.message}</p>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="comment-field">
                     <input type="url" {...register("web")} placeholder="Website" />
                     <p className="form_error">{errors.web?.message}</p>
                  </div>
               </div>
            </div>
            <div className="comment-field checkbox-grp">
               <input type="checkbox" id="checkbox_two" />
               <label htmlFor="checkbox_two">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <p className="form-submit"></p>
            <button className="btn btn-two arrow-btn">Post Comment <BtnArrow /></button>
         </form>
      </div>
   )
}

export default BlogForm
