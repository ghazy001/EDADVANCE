import { Link } from "react-router-dom"
import InjectableSvg from "../../hooks/InjectableSvg"

const Social = () => {
   return (
      <>
         <li>
            <Link to="https://www.facebook.com/" target="_blank">
               <InjectableSvg src="/assets/img/icons/facebook.svg" alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link to="https://www.facebook.com/" target="_blank">
               <InjectableSvg src="/assets/img/icons/twitter.svg" alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link to="https://www.facebook.com/" target="_blank">
               <InjectableSvg src="/assets/img/icons/whatsapp.svg" alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link to="https://www.facebook.com/" target="_blank">
               <InjectableSvg src="/assets/img/icons/instagram.svg" alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link to="https://www.facebook.com/" target="_blank">
               <InjectableSvg src="/assets/img/icons/youtube.svg" alt="img" className="injectable" />
            </Link>
         </li>
      </>
   )
}

export default Social
