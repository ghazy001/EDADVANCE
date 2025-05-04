import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

interface DatatYpe {
   id: number;
   icon: string;
   title: string;
   total: string;
}

const category_data: DatatYpe[] = [
   {
      id: 1,
      icon: "flaticon-graphic-design",
      title: "Graphic Design",
      total: "(22)"
   },
   {
      id: 2,
      icon: "flaticon-investment",
      title: "Finance",
      total: "(41)"
   },
   {
      id: 3,
      icon: "flaticon-coding",
      title: "Development",
      total: "(29)"
   },
   {
      id: 4,
      icon: "flaticon-email",
      title: "Marketing",
      total: "(31)"
   },
   {
      id: 5,
      icon: "flaticon-fashion",
      title: "Life Style",
      total: "(23)"
   },
   {
      id: 6,
      icon: "flaticon-interaction",
      title: "Management",
      total: "(19)"
   },
   {
      id: 7,
      icon: "flaticon-web-design",
      title: "App Design",
      total: "(18)"
   },
];

// slider setting
const setting = {
   slidesPerView: 6,
   spaceBetween: 44,
   loop: true,
   // Navigation arrows
   navigation: {
      nextEl: '.categories-button-next',
      prevEl: '.categories-button-prev',
   },
   breakpoints: {
      '1500': {
         slidesPerView: 6,
      },
      '1200': {
         slidesPerView: 5,
      },
      '992': {
         slidesPerView: 4,
         spaceBetween: 30,
      },
      '768': {
         slidesPerView: 3,
         spaceBetween: 25,
      },
      '576': {
         slidesPerView: 2,
      },
      '0': {
         slidesPerView: 2,
         spaceBetween: 20,
      },
   },
};

const Categories = () => {
   return (
      <section className="categories-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-7">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">Trending Categories</span>
                     <h2 className="title">Top Category We Have</h2>
                     <p className="desc">when known printer took a galley of type scrambl edmake</p>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-12">
                  <div className="categories__wrap">
                     <Swiper {...setting} modules={[Navigation]} className="swiper categories-active">
                        {category_data.map((item) => (
                           <SwiperSlide key={item.id} className="swiper-slide">
                              <div className="categories__item">
                                 <Link to="/courses">
                                    <div className="icon">
                                       <i className={item.icon}></i>
                                    </div>
                                    <span className="name">{item.title}</span>
                                    <span className="courses">{item.total}</span>
                                 </Link>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>

                     <div className="categories__nav">
                        <button className="categories-button-prev">
                           <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 7L1 7M1 7L7 1M1 7L7 13" stroke="#161439" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </button>
                        <button className="categories-button-next">
                           <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7L15 7M15 7L9 1M15 7L9 13" stroke="#161439" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Categories
