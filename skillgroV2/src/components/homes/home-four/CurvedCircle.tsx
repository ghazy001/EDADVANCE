import { useEffect } from "react";

const Circle = () => {
   
   useEffect(() => {
      const text = document.querySelector('.circle');
      if (text) {
         text.innerHTML = text.textContent!.replace(/\S/g, "<span>$&</span>");
         const elements = document.querySelectorAll('.circle span');
         elements.forEach((element, i) => {
            (element as HTMLElement).style.transform = `rotate(${i * 13}deg)`;
         });
      }
   }, []);

   return (
      <div className="content">
         <h6 className="circle rotateme">YoGa . Expert . Coach . Since 1996 .</h6>
      </div>
   );
};

export default Circle;





