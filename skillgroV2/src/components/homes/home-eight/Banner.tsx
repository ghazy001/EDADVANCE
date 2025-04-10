import { Swiper, SwiperSlide } from "swiper/react"
import InjectableSvg from "../../../hooks/InjectableSvg";

const slider_data: string[] = [
    "/assets/img/brand/h8_brand01.png",
    "/assets/img/brand/h8_brand02.png",
    "/assets/img/brand/h8_brand03.png",
    "/assets/img/brand/h8_brand04.png",
    "/assets/img/brand/h8_brand05.png",
    "/assets/img/brand/h8_brand03.png",];

const setting = {
    slidesPerView: 5,
    spaceBetween: 30,
    observer: true,
    observeParents: true,
    loop: true,
    breakpoints: {
        '1500': {
            slidesPerView: 5,
        },
        '1200': {
            slidesPerView: 4,
        },
        '992': {
            slidesPerView: 4,
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
const Banner = () => {

    return (
        <section className="banner-area fix banner-bg-seven tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/h8_hero_bg.jpg)` }}>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className="banner__content-seven">
                            <h2 className="title">Take Your
                                <span className="title-shape-wrap">Cooking <InjectableSvg src="/assets/img/banner/h8_hero_title_shape.svg" alt="" className="injectable" /></span>
                                Skill To The Next Level
                            </h2>
                            <p>Free & Premium online courses from the world’s Join 17 million learners today.</p>
                            <div className="slider__search banner__search">
                                <form onSubmit={(e) => e.preventDefault()} className="slider__search-form">
                                    <input type="text" placeholder="Search Here . . ." />
                                    <button type="submit">Find Courses</button>
                                </form>
                            </div>
                            <div className="banner__brand-wrap">
                                <Swiper {...setting} className="swiper-container brand-swiper-active-two">
                                    {slider_data.map((item, i) => (
                                        <SwiperSlide key={i} className="swiper-slide">
                                            <div className="brand__item-two">
                                                <img src={item} alt="img" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-10">
                        <div className="banner__images-seven">
                            <img src="/assets/img/banner/h8_hero_img.png" alt="img" className="main-img" />
                            <div className="big_shape">
                                <InjectableSvg src="/assets/img/banner/h8_hero_img_shape02.svg" alt="" className="injectable tg-motion-effects1" />
                            </div>
                            <div className="shape" >
                                <img src="/assets/img/banner/h8_hero_img_shape.svg" alt="" className="rotateme" />
                            </div>
                            <div className="about__enrolled" data-aos="fade-right" data-aos-delay="200">
                                <p className="title"><span>36K+</span> Enrolled Students</p>
                                <img src="/assets/img/others/student_grp.png" alt="img" />
                            </div>
                            <div className="banner__all-recipe" data-aos="fade-left" data-aos-delay="200">
                                <h2 className="count">12K+</h2>
                                <span>All Recipes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
