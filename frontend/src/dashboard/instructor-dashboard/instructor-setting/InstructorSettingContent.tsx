"use client"
import InstructorSettingProfile from "./InstructorSettingProfile"
import InstructorSettingPassword from "./InstructorSettingPassword"
import InstructorSettingSocialShare from "./InstructorSettingSocialShare"
import { useState } from "react"

const tab_title: string[] = ["Profile", "Password", "Social Share"];

const InstructorSettingContent = ({ style }: any) => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Settings</h4>
            </div>
            <div className="row">
               <div className="col-lg-12">
                  <div className="dashboard__nav-wrap">
                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {tab_title.map((tab, index) => (
                           <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                              <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="tab-content" id="myTabContent">
                     <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="itemOne-tab-pane" role="tabpanel" aria-labelledby="itemOne-tab" >
                        <InstructorSettingProfile style={style} />
                     </div>
                     <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="itemTwo-tab-pane" role="tabpanel" aria-labelledby="itemTwo-tab" >
                        <InstructorSettingPassword />
                     </div>
                     <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="itemThree-tab-pane" role="tabpanel" aria-labelledby="itemThree-tab" >
                        <InstructorSettingSocialShare />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorSettingContent
