import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

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

const CommonTestimonial = () => {
   return (
      <Swiper {...setting} modules={[Pagination]} className="swiper-container testimonial-active-four">
         {testi_data.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
               <div className="testimonial__item-four">
                  <div className="rating">
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                  </div>
                  <p>{item.desc}</p>
                  <div className="testimonial__bottom-two">
                     <h4 className="title">{item.title}</h4>
                     <span>{item.designation}</span>
                  </div>
               </div>
            </SwiperSlide>
         ))}
         <div className="testimonial-pagination testimonial-pagination-two"></div>
      </Swiper>
   )
}

export default CommonTestimonial
