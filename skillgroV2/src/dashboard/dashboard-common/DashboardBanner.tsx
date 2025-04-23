import { Link } from "react-router-dom";
import BtnArrow from "../../svg/BtnArrow";
import { useState, useEffect } from "react";

const DashboardBanner = ({ style }: any) => {
   const [user, setUser] = useState<{
      id?: string;
      name: string;
      role: string;
      profilePicture?: string;
   } | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [file, setFile] = useState<File | null>(null);
   const [uploadMessage, setUploadMessage] = useState<string | null>(null);
   const [isUploading, setIsUploading] = useState(false);
   const [isLoadingUser, setIsLoadingUser] = useState(true);

   useEffect(() => {
      const fetchCurrentUser = async () => {
         try {
            setIsLoadingUser(true);
            const response = await fetch("http://localhost:3000/user/current-user", {
               method: "GET",
               credentials: "include",
            });

            if (!response.ok) {
               throw new Error("Failed to fetch user");
            }

            const data = await response.json();
            setUser({
               id: data.id,
               name: data.name,
               role: data.role,
               profilePicture: data.profilePicture,
            });
            setError(null);
         } catch (err: any) {
            console.error("Error fetching user:", err);
            setError("Could not load user data.");
            setUser(null);
         } finally {
            setIsLoadingUser(false);
         }
      };

      fetchCurrentUser();
   }, []);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;

      const selectedFile = e.target.files[0];

      if (!["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)) {
         setUploadMessage("Please select a JPEG, PNG, or WebP image.");
         setFile(null);
         return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
         setUploadMessage("File size must be less than 5MB.");
         setFile(null);
         return;
      }

      setFile(selectedFile);
      setUploadMessage(null);
   };

   const handleUpload = async () => {
      if (!file || !user?.id) {
         setUploadMessage("Please select an image and ensure you're logged in.");
         return;
      }

      setIsUploading(true);
      setUploadMessage(null);

      try {
         const formData = new FormData();
         formData.append("image", file);

         const response = await fetch(`http://localhost:3000/user/${user.id}/profile-picture`, {
            method: "PUT",
            credentials: "include",
            body: formData,
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to upload image");
         }

         const data = await response.json();
         setUser((prev) => (prev ? { ...prev, profilePicture: data.image } : prev));
         setUploadMessage("Profile image updated successfully!");
         setFile(null);
      } catch (err: any) {
         console.error("Upload error:", err);
         setUploadMessage(err.message || "Failed to upload image.");
      } finally {
         setIsUploading(false);
      }
   };

   const getTitle = () => {
      if (!user) return "Loading...";
      switch (user.role) {
         case "instructor":
            return `Professor: ${user.name}`;
         case "user":
            return `Student: ${user.name}`;
         case "admin":
            return `Admin: ${user.name}`;
         default:
            return user.name;
      }
   };

   return (
       <div className="dashboard__top-wrap">
          <div
              className="dashboard__top-bg"
              style={{
                 backgroundImage: `url(/assets/img/bg/instructor_dashboard_bg.jpg)`,
              }}
          ></div>
          <div className="dashboard__instructor-info">
             <div className="dashboard__instructor-info-left">
                <div className="thumb" style={{ position: "relative", marginBottom: "10px" }}>
                   <img
                       src={
                          file
                              ? URL.createObjectURL(file)
                              : user?.profilePicture
                                  ? `http://localhost:3000/uploads/${user.profilePicture}`
                                  : "/assets/img/default-profile.png"
                       }
                       alt="Profile"
                       style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                       }}
                   />
                   <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <label htmlFor="profile-upload" style={{ display: "block", marginBottom: "5px" }}>
                <span style={{
                   display: "inline-block",
                   padding: "5px 10px",
                   backgroundColor: "#f0f0f0",
                   borderRadius: "4px",
                   cursor: "pointer",
                   fontSize: "12px"
                }}>
                  Choose Image
                </span>
                         <input
                             id="profile-upload"
                             type="file"
                             accept="image/jpeg, image/png, image/webp"
                             onChange={handleFileChange}
                             style={{ display: "none" }}
                             disabled={isUploading}
                         />
                      </label>
                      <button
                          onClick={handleUpload}
                          disabled={!file || !user?.id || isUploading}
                          style={{
                             padding: "5px 10px",
                             fontSize: "12px",
                             backgroundColor: !file || !user?.id || isUploading ? "#cccccc" : "#3f78e0",
                             color: "white",
                             border: "none",
                             borderRadius: "4px",
                             cursor: !file || !user?.id || isUploading ? "not-allowed" : "pointer",
                          }}
                      >
                         {isUploading ? "Uploading..." : "Upload"}
                      </button>
                   </div>
                </div>
                <div className="content">
                   <h4 className="title">{error ? "Error Loading User" : getTitle()}</h4>
                   <div className="review__wrap review__wrap-two">
                      <div className="rating">
                         <i className="fas fa-star"></i>
                         <i className="fas fa-star"></i>
                         <i className="fas fa-star"></i>
                         <i className="fas fa-star"></i>
                         <i className="fas fa-star"></i>
                      </div>
                      <span>(15 Reviews)</span>
                   </div>
                </div>
             </div>
             <div className="dashboard__instructor-info-right">
                {!isLoadingUser && (
                    <>
                       {uploadMessage && (
                           <p
                               style={{
                                  color: uploadMessage.includes("success") ? "green" : "red",
                                  marginTop: "10px",
                               }}
                           >
                              {uploadMessage}
                           </p>
                       )}
                       <Link to="#" className="btn btn-two arrow-btn" style={{ marginTop: "10px" }}>
                          Create a New Course <BtnArrow />
                       </Link>
                    </>
                )}
             </div>
          </div>
       </div>
   );
};

export default DashboardBanner;