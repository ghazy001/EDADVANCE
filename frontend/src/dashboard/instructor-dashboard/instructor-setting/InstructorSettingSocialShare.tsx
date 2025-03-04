const InstructorSettingSocialShare = () => {
   return (
      <div className="instructor__profile-form-wrap">
         <form onSubmit={(e) => e.preventDefault()} className="instructor__profile-form">
            <div className="form-grp">
               <label htmlFor="facebook">Facebook</label>
               <input id="facebook" type="url" placeholder="https://facebook.com/" />
            </div>
            <div className="form-grp">
               <label htmlFor="twitter">Twitter</label>
               <input id="twitter" type="url" placeholder="https://twitter.com/" />
            </div>
            <div className="form-grp">
               <label htmlFor="linkedin">Linkedin</label>
               <input id="linkedin" type="url" placeholder="https://linkedin.com/" />
            </div>
            <div className="form-grp">
               <label htmlFor="website">Website</label>
               <input id="website" type="url" placeholder="https://website.com/" />
            </div>
            <div className="form-grp">
               <label htmlFor="github">Github</label>
               <input id="github" type="url" placeholder="https://github.com/" />
            </div>
            <div className="submit-btn mt-25">
               <button type="submit" className="btn">Update Profile</button>
            </div>
         </form>
      </div>
   )
}

export default InstructorSettingSocialShare
