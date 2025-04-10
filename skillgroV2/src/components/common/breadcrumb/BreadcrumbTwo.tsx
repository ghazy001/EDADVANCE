import { Link } from "react-router-dom"

interface BreadcrumbProps {
   title: string;
   sub_title: string;
}
const BreadcrumbTwo = ({ title, sub_title }: BreadcrumbProps) => {
   return (
      <div className="breadcrumb__area breadcrumb__bg breadcrumb__bg-two" style={{ backgroundImage: `url(/assets/img/bg/breadcrumb_bg.jpg)` }}>
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="breadcrumb__content">
                     <nav className="breadcrumb">
                        <span property="itemListElement" typeof="ListItem">
                           <Link to="/">Home</Link>
                        </span>
                        <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                        <span property="itemListElement" typeof="ListItem">
                           <Link to="/">{sub_title}</Link>
                        </span>
                        <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                        <span property="itemListElement" typeof="ListItem">{title}</span>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         <div className="breadcrumb__shape-wrap">
            <img src="/assets/img/others/breadcrumb_shape01.svg" alt="img" className="alltuchtopdown" />
            <img src="/assets/img/others/breadcrumb_shape02.svg" alt="img" data-aos="fade-right" data-aos-delay="300" />
            <img src="/assets/img/others/breadcrumb_shape03.svg" alt="img" data-aos="fade-up" data-aos-delay="400" />
            <img src="/assets/img/others/breadcrumb_shape04.svg" alt="img" data-aos="fade-down-left" data-aos-delay="400" />
            <img src="/assets/img/others/breadcrumb_shape05.svg" alt="img" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </div>
   )
}

export default BreadcrumbTwo
