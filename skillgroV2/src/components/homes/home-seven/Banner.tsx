import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import InjectableSvg from '../../../hooks/InjectableSvg';

interface DataType {
   id: number;
   title: string;
   desc: string;
   bg_img: string;
};

const banner_slider: DataType[] = [
   {
      id: 1,
      title: "Professional Courses",
      desc: "Free & Premium online courses from the world’s Join 17 million learners today.",
      bg_img: "/assets/img/slider/slider_bg01.webp",
   },
   {
      id: 2,
      title: "Professional Courses",
      desc: "Free & Premium online courses from the world’s Join 17 million learners today.",
      bg_img: "/assets/img/slider/slider_bg02.webp",
   },
   {
      id: 3,
      title: "Professional Courses",
      desc: "Free & Premium online courses from the world’s Join 17 million learners today.",
      bg_img: "/assets/img/slider/slider_bg03.webp",
   },
];

const setting = {
   spaceBetween: 0,
   effect: "fade",
   loop: true,
   autoplay: {
      delay: 5000,
   },
}

const Banner = () => {
   return (
      <section className="slider__area">
         <Swiper {...setting} modules={[EffectFade, Autoplay]} effect="fade" className="slider__active">
            {banner_slider.map((item) => (
               <SwiperSlide key={item.id} className="swiper-slide slider__single">
                  <div className="slider__bg" style={{ backgroundImage: `url(${item.bg_img})` }}>
                     <div className="container">
                        <div className="row">
                           <div className="col-xl-6 col-lg-7">
                              <div className="slider__content">
                                 <span className="sub-title">{item.title}</span>
                                 <h2 className="title">Find Business
                                    <span style={{marginLeft:"10px"}}>Courses <InjectableSvg src="/assets/img/slider/slider_title-shape.svg" alt="" className="injectable" /></span>
                                    & Develop Your Skills
                                 </h2>
                                 <p>{item.desc}</p>
                                 <div className="slider__search">
                                    <form onSubmit={(e) => e.preventDefault()} className="slider__search-form">
                                       <input type="text" placeholder="Search Here . . ." />
                                       <button type="submit">Find Courses</button>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   )
}

export default Banner
