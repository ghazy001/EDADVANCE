
const InstructorSettingPassword = () => {
   return (
      <div className="instructor__profile-form-wrap">
         <form onSubmit={(e) => e.preventDefault()} className="instructor__profile-form">
            <div className="form-grp">
               <label htmlFor="currentpassword">Current Password</label>
               <input id="currentpassword" type="password" placeholder="Current Password" />
            </div>
            <div className="form-grp">
               <label htmlFor="newpassword">New Password</label>
               <input id="newpassword" type="password" placeholder="New Password" />
            </div>
            <div className="form-grp">
               <label htmlFor="repassword">Re-Type New Password</label>
               <input id="repassword" type="password" placeholder="Re-Type New Password" />
            </div>
            <div className="submit-btn mt-25">
               <button type="submit" className="btn">Update Password</button>
            </div>
         </form>
      </div>
   )
}

export default InstructorSettingPassword
