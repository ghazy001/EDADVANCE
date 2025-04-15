import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import InjectableSvg from '../../../hooks/InjectableSvg';

interface DataType {
   id: number;
   desc: string;
   title: string;
   designation: string;
};

const testi_data: DataType[] = [
   {
      id: 1,
      desc: "“ Manage and streamline operations acrosers multiple locations wear sales channels, and employees toter improve efficiency stre sales channe amline “",
      title: "Brooklyn Simmons",
      designation: "Engineer",
   },
   {
      id: 2,
      desc: "“ Manage and streamline operations acrosers multiple locations wear sales channels, and employees toter improve efficiency stre sales channe amline “",
      title: "Brooklyn Simmons",
      designation: "Engineer",
   },
   {
      id: 3,
      desc: "“ Manage and streamline operations acrosers multiple locations wear sales channels, and employees toter improve efficiency stre sales channe amline “",
      title: "Brooklyn Simmons",
      designation: "Engineer",
   },
];

const setting = {
   slidesPerView: 1,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1500': {
         slidesPerView: 1,
      },
      '1200': {
         slidesPerView: 1,
      },
      '992': {
         slidesPerView: 1,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 1,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 1,
      },
      '0': {
         slidesPerView: 1,
      },
   },
   pagination: {
      el: '.testimonial-pagination',
      clickable: true,
   },
}

const Testimonial = () => {

   return (
      <section className="testimonial__area-three section-py-140 testimonial__bg-two" style={{ backgroundImage: `url(/assets/img/bg/h4_testimonial_bg.jpg)` }}>
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6 col-md-10">
                  <div className="testimonial__img">
                     <img src="/assets/img/others/testimonial_img.jpg" alt="img" />
                     <div className="shape">
                        <img src="/assets/img/others/testimonial_img_shape.svg" alt="shape" className="rotateme" />
                     </div>
                  </div>
               </div>

               <div className="col-lg-6">
                  <Swiper {...setting} modules={[Pagination]} className="swiper-container testimonial-active-three">
                     {testi_data.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-slide">
                           <div className="testimonial__item-three">
                              <div className="icon">
                                 <InjectableSvg src="/assets/img/icons/testi_icon.svg" alt="" className="injectable" />
                              </div>
                              <div className="rating">
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                              </div>
                              <p>{item.desc}</p>
                              <div className="testimonial__bottom">
                                 <h4 className="title">{item.title}</h4>
                                 <span>{item.designation}</span>
                              </div>
                           </div>
                        </SwiperSlide>
                     ))}
                     <div className="testimonial-pagination"></div>
                  </Swiper>
               </div>
            </div>
         </div>
         <div className="testimonial__shape">
            <img src="/assets/img/others/h4_testimonial_shape.svg" alt="shape" className="rotateme" />
         </div>
      </section>
   )
}

export default Testimonial
