import SvgAnimation from "../../../hooks/SvgAnimation";
import Count from "../../common/Count";
import InjectableSvg from "../../../hooks/InjectableSvg";

interface CounterProps {
   style: boolean;
}

const Counter = ({ style }: CounterProps) => {

   const svgIconRef = SvgAnimation('/assets/img/others/fact_shape02.svg');

   return (
      <section className={`fact__area-two ${style ? "section-pb-140" : ""}`}>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="fact__inner-wrap-two">
                     <div className="section__title white-title mb-30">
                        <h2 className="title">Thousands of
                           <span className="position-relative" style={{ marginLeft: "10px" }}>
                              <svg x="0px" y="0px" preserveAspectRatio="none" viewBox="0 0 209 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="currentcolor" />
                              </svg>
                              courses
                           </span>
                           authored by industry experts</h2>
                     </div>
                     <div className="fact__item-wrap">
                        <div className="fact__item">
                           <h2 className="count"><Count number={45} />K+</h2>
                           <p>Active Students</p>
                        </div>
                        <div className="fact__item">
                           <h2 className="count"><Count number={328} />+</h2>
                           <p>Best Instructors</p>
                        </div>
                     </div>
                     <div className="fact__img-wrap tg-svg" ref={svgIconRef}>
                        <img src="/assets/img/others/fact_img.png" alt="img" />
                        <div className="shape-one">
                           <InjectableSvg src="/assets/img/others/fact_shape01.svg" alt="img" className="injectable" />
                        </div>
                        <div className="shape-two">
                           <span className="svg-icon"></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Counter
