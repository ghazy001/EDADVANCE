"use client";
import { Link } from "react-router-dom";

const InstructorSettingProfile = ({ style }: any) => {
   return (
      <>
         {style ? (
            <div
               className="instructor__cover-bg"
               style={{ backgroundImage: `url(/assets/img/bg/student_bg.jpg)` }}
            >
               <div className="instructor__cover-info">
                  <div className="instructor__cover-info-left">
                     <div className="thumb">
                        <img src="/assets/img/courses/details_instructors01.jpg" alt="img" />
                     </div>
                     <button title="Upload Photo">
                        <i className="fas fa-camera"></i>
                     </button>
                  </div>
                  <div className="instructor__cover-info-right">
                     <Link to="#" className="btn btn-two arrow-btn">
                        Edit Cover Photo
                     </Link>
                  </div>
               </div>
            </div>
         ) : (
            <div
               className="instructor__cover-bg"
               style={{ backgroundImage: `url(/assets/img/bg/instructor_dashboard_bg.jpg)` }}
            >
               <div className="instructor__cover-info">
                  <div className="instructor__cover-info-left">
                     <div className="thumb">
                        <img src="/assets/img/courses/details_instructors02.jpg" alt="img" />
                     </div>
                     <button title="Upload Photo">
                        <i className="fas fa-camera"></i>
                     </button>
                  </div>
                  <div className="instructor__cover-info-right">
                     <Link to="#" className="btn btn-two arrow-btn">
                        Edit Cover Photo
                     </Link>
                  </div>
               </div>
            </div>
         )}

         <div className="instructor__profile-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="instructor__profile-form">
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="firstname">First Name</label>
                        <input id="firstname" type="text" defaultValue="John" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="lastname">Last Name</label>
                        <input id="lastname" type="text" defaultValue="Due" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="username">User Name</label>
                        <input id="username" type="text" defaultValue="johndue" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input id="phonenumber" type="tel" defaultValue="+1-202-555-0174" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="skill">Skill/Occupation</label>
                        <input id="skill" type="text" defaultValue="Full Stack Developer" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp select-grp">
                        <label htmlFor="displayname">Display Name Publicly As</label>
                        <select id="displayname" name="displayname">
                           <option value="Emily Hannah">Emily Hannah</option>
                           <option value="John">John</option>
                           <option value="Due">Due</option>
                           <option value="Due John">Due John</option>
                           <option value="johndue">johndue</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div className="form-grp">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                     id="bio"
                     defaultValue="I'm the Front-End Developer for #ThemeGenix in New York, OR. I am passionate about UI effects, animations, and creating intuitive, dynamic user experiences."
                  />
               </div>
               <div className="submit-btn mt-25">
                  <button type="submit" className="btn">
                     Update Info
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default InstructorSettingProfile;
