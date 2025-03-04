
const DashboardBreadcrumb = () => {
   return (
      <div className="breadcrumb__area breadcrumb__bg breadcrumb__bg-three" style={{ backgroundImage: `url(/assets/img/bg/breadcrumb_bg.jpg)` }}>
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

export default DashboardBreadcrumb
