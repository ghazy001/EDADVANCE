import Marquee from "react-fast-marquee";
import { useState } from "react";
import { Link } from "react-router-dom";

const brand_data: string[] = [
   "/assets/img/brand/brand01.png",
   "/assets/img/brand/brand02.png",
   "/assets/img/brand/brand03.png",
   "/assets/img/brand/brand04.png",
   "/assets/img/brand/brand05.png",
   "/assets/img/brand/brand06.png",
   "/assets/img/brand/brand07.png",
   "/assets/img/brand/brand04.png",
   "/assets/img/brand/brand03.png",
   "/assets/img/brand/brand05.png"];

interface BrandOneProps {
   style?: boolean;
}
const BrandOne = ({ style }: BrandOneProps) => {
   const [isPaused, setIsPaused] = useState(false);

   return (
      <div className={`brand-area ${style ? "brand-area-two" : ""}`}>
         <div className="container-fluid">
            <Marquee className="marquee_mode" pauseOnHover={false} play={!isPaused}>
               {brand_data.map((item, i) => (
                  <div
                     key={i}
                     className="brand__item"
                     onMouseEnter={() => setIsPaused(true)}
                     onMouseLeave={() => setIsPaused(false)}
                  >
                     <Link to="#"><img src={item} alt="brand" /></Link>
                     <img src="/assets/img/icons/brand_star.svg" alt="star" />
                  </div>
               ))}
            </Marquee>
         </div>
      </div>
   );
}

export default BrandOne;
