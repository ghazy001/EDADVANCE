import React from "react";
import { Link } from "react-router-dom";

interface DataType {
   id: number;
   title: string;
   class_name?: string;
   sidebar_details: {
      id: number;
      link: string;
      icon: string;
      title: string;
   }[];
};

const sidebar_data: DataType[] = [
   {
      id: 1,
      title: "Commencer Une Nouvelle Analyse",
      class_name: "mt-40",
      sidebar_details: [
         {
            id: 1,
            link: "/instructor-courses",
            icon: "skillgro-video-tutorial",
            title: "Par Etudiant",
         },
         {
            id: 2,
            link: "/instructor-courses",
            icon: "skillgro-video-tutorial",
            title: "Par Classe",
         }
        
      ],
   },
   {
      id: 2,
      title: "Anciennes Analyses",
      class_name: "mt-30",
      sidebar_details: [
         {
            id: 1,
            link: "/instructor-setting",
            icon: "skillgro-settings",
            title: "Settings",
         },
         {
            id: 2,
            link: "/",
            icon: "skillgro-logout",
            title: "Logout",
         },
      ],
   },
];

const InstructorAnalyseSidebar = () => {

   return (
      <div className="col-lg-3">
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li key={list.id}>
                              <Link to={list.link}>
                                 <i className={list.icon}></i>
                                 {list.title}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>
               </React.Fragment>
            ))}
         </div>
      </div>
   )
}

export default InstructorAnalyseSidebar