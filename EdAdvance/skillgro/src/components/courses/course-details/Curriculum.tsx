import React, { useState } from "react";
import VideoPopup from "../../../modals/VideoPopup";
import { Link } from "react-router-dom";

interface DataType {
   id: number;
   title: string;
   show?: string;
   collapsed?: string;
   faq_details: {
      class_name?: string;
      lock: boolean;
      title: string;
      duration: string;
   }[]
}

const faq_data: DataType[] = [
   {
      id: 1,
      title: "Introduction",
      show: "show",
      faq_details: [
         {
            class_name: "open-item",
            lock: false,
            title: "Course Installation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Create a Simple React App",
            duration: "07:48"
         },
         {
            lock: true,
            title: "React for the Rest of us",
            duration: "10:48"
         },
      ]
   },
   {
      id: 2,
      title: "Capacitance and Inductance",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Course Installation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Create a Simple React App",
            duration: "07:48"
         },
         {
            lock: true,
            title: "React for the Rest of us",
            duration: "10:48"
         },
      ]
   },
   {
      id: 3,
      title: "Final Audit",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Course Installation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Create a Simple React App",
            duration: "07:48"
         },
         {
            lock: true,
            title: "React for the Rest of us",
            duration: "10:48"
         },
      ]
   },
];

const Curriculum = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="courses__curriculum-wrap">
            <h3 className="title">Course Curriculum</h3>
            <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
            <div className="accordion" id="accordionExample">
               {faq_data.map((item) => (
                  <div key={item.id} className="accordion-item">
                     <h2 className="accordion-header" id={`headingOne${item.id}`}>
                        <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} aria-labelledby={`headingOne${item.id}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                           <ul className="list-wrap">
                              {item.faq_details.map((list, i) => (
                                 <React.Fragment key={i}>
                                    {list.lock ? (
                                       <li className="course-item">
                                          <Link to="#" className="course-item-link">
                                             <span className="item-name">{list.title}</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">{list.duration}</span>
                                                <span className="item-meta course-item-status">
                                                   <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                </span>
                                             </div>
                                          </Link>
                                       </li>) : (
                                       <li className="course-item open-item">
                                          <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="course-item-link popup-video">
                                             <span className="item-name">Course Installation</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">03:03</span>
                                             </div>
                                          </a>
                                       </li>
                                    )}
                                 </React.Fragment>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
      </>
   )
}

export default Curriculum
