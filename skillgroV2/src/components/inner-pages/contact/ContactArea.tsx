import ContactForm from "../../../forms/ContactForm"
import InjectableSvg from "../../../hooks/InjectableSvg"

const ContactArea = () => {
   return (
      <section className="contact-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-4">
                  <div className="contact-info-wrap">
                     <ul className="list-wrap">
                        <li>
                           <div className="icon">
                              <InjectableSvg src="assets/img/icons/map.svg" alt="img" className="injectable" />
                           </div>
                           <div className="content">
                              <h4 className="title">Address</h4>
                              <p>Awamileaug Drive, Kensington <br /> London, UK</p>
                           </div>
                        </li>
                        <li>
                           <div className="icon">
                              <InjectableSvg src="assets/img/icons/contact_phone.svg" alt="img" className="injectable" />
                           </div>
                           <div className="content">
                              <h4 className="title">Phone</h4>
                              <a href="tel:0123456789">+1 (800) 123 456 789</a>
                              <a href="tel:0123456789">+1 (800) 123 456 789</a>
                           </div>
                        </li>
                        <li>
                           <div className="icon">
                              <InjectableSvg src="assets/img/icons/emial.svg" alt="img" className="injectable" />
                           </div>
                           <div className="content">
                              <h4 className="title">E-mail Address</h4>
                              <a href="mailto:info@gmail.com">info@gmail.com</a>
                              <a href="mailto:info@gmail.com">info@gmail.com</a>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="col-lg-8">
                  <div className="contact-form-wrap">
                     <h4 className="title">Send Us Message</h4>
                     <p>Your email address will not be published. Required fields are marked *</p>
                     <ContactForm />
                     <p className="ajax-response mb-0"></p>
                  </div>
               </div>
            </div>
            <div className="contact-map">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48409.69813174607!2d-74.05163325136718!3d40.68264649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBarclays%20Center!5e0!3m2!1sen!2sbd!4v1684309529719!5m2!1sen!2sbd" style={{ border: '0' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
         </div>
      </section>
   )
}

export default ContactArea
