import { Swiper, SwiperSlide } from 'swiper/react';

const brand_data: string[] = [
   "/assets/img/brand/h7_brand01.png",
   "/assets/img/brand/h7_brand02.png",
   "/assets/img/brand/h7_brand03.png",
   "/assets/img/brand/h7_brand04.png",
   "/assets/img/brand/h7_brand05.png",
   "/assets/img/brand/h7_brand06.png",
   "/assets/img/brand/h7_brand04.png"];

const setting = {
   slidesPerView: 6,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1500': {
         slidesPerView: 6,
      },
      '1200': {
         slidesPerView: 6,
      },
      '992': {
         slidesPerView: 5,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 4,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 3,
      },
      '0': {
         slidesPerView: 2,
      },
   },
}
const BrandTwo = () => {
   return (
      <div className="brand-area-three section-pb-120">
         <div className="container">
            <Swiper {...setting} className="swiper-container brand-swiper-active">
               {brand_data.map((item, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                     <div className="brand__item-two">
                        <img src={item} alt="img" />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}

export default BrandTwo;
