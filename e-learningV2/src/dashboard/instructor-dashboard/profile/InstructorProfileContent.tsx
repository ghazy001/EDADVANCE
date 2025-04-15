
const InstructorProfileContent = ({ style }: any) => {
   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">My Profile</h4>
            </div>
            <div className="row">
               <div className="col-lg-12">
                  <div className="profile__content-wrap">
                     <ul className="list-wrap">
                        <li><span>Registration Date</span> February 28, 2026 8:01 am</li>
                        <li><span>First Name</span> {style ? "Emily" : "John"} </li>
                        <li><span>Last Name</span>{style ? "Hannah" : "Doe"} </li>
                        <li><span>Username</span> instructor</li>
                        <li><span>Email</span> example@gmail.com</li>
                        <li><span>Phone Number</span> +1-202-555-0174</li>
                        <li><span>Skill/Occupation</span> Application Developer</li>
                        <li><span>Biography</span> I&apos;m the Front-End Developer for #ThemeGenix in New York, OR. I have a serious passion for UI effects, animations, and
                           creating intuitive, dynamic user experiences.</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorProfileContent
