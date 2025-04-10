import { Link } from "react-router-dom"

interface HeaderOffCanvaProps {
   offcanvas: boolean;
   setOffcamvas: (offcanvas: boolean) => void;
}
const HeaderOffCanvas = ({ offcanvas, setOffcamvas }: HeaderOffCanvaProps) => {
   return (
      <>
         <div className={`offCanvas__info ${offcanvas ? "active" : ""}`}>
            <div className="offCanvas__close-icon menu-close">
               <button onClick={() => setOffcamvas(false)}><i className="far fa-window-close"></i></button>
            </div>
            <div className="offCanvas__logo mb-30">
               <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
            </div>
            <div className="offCanvas__side-info mb-30">
               <div className="contact-list mb-30">
                  <h4>Office Address</h4>
                  <p>123/A, Miranda City Likaoli <br /> Prikano, Dope</p>
               </div>
               <div className="contact-list mb-30">
                  <h4>Phone Number</h4>
                  <p>+0989 7876 9865 9</p>
                  <p>+(090) 8765 86543 85</p>
               </div>
               <div className="contact-list mb-30">
                  <h4>Email Address</h4>
                  <p>info@example.com</p>
                  <p>example.mail@hum.com</p>
               </div>
            </div>
            <div className="offCanvas__social-icon mt-30">
               <Link to="#"><i className="fab fa-facebook-f"></i></Link>
               <Link to="#"><i className="fab fa-twitter"></i></Link>
               <Link to="#"><i className="fab fa-google-plus-g"></i></Link>
               <Link to="#"><i className="fab fa-instagram"></i></Link>
            </div>
         </div>
         <div onClick={() => setOffcamvas(false)} className={`offCanvas__overly ${offcanvas ? "active" : ""}`}></div>
      </>
   )
}

export default HeaderOffCanvas
