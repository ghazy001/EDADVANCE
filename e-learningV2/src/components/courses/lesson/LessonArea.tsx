import { Link } from "react-router-dom";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import LessonVideo from "./LessonVideo";

const LessonArea = () => {

   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                  <div className="lesson__content">
                     <h2 className="title">Course Content</h2>
                     <LessonFaq />
                  </div>
               </div>
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                           <Link to="#"><i className="flaticon-arrow-right"></i></Link>
                           <span>The Complete Design Course: From Zero to Expert!</span>
                        </div>
                        <div className="lesson__video-wrap-top-right">
                           <Link to="#"><i className="fas fa-times"></i></Link>
                        </div>
                     </div>
                     <LessonVideo />
                     <div className="lesson__next-prev-button">
                        <button className="prev-button" title="Create a Simple React App"><i className="flaticon-arrow-right"></i></button>
                        <button className="next-button" title="React for the Rest of us"><i className="flaticon-arrow-right"></i></button>
                     </div>
                  </div>
                  <LessonNavTav />
               </div>
            </div>
         </div>
      </section>
   )
}

export default LessonArea;
