"use client";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { selectCourses, setCourses } from "../../../../redux/features/courseSlice.ts";
import UseCourses from "../../../../hooks/UseCourses.ts";

const BASE_URL = "http://localhost:3000";
const courseTabs = ["All Courses", "Add New"];

const InstructorEnrolledCourseContent = () => {
  UseCourses();
  const allCourses = useSelector(selectCourses);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    instructors: "",
    skill_level: "",
    price_type: "",
    language: "",
  });
  const [thumb, setThumb] = useState<File | null>(null);

  useEffect(() => {
    let result = [...allCourses];
    if (activeTab === 1) {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    setFilteredCourses(result);
  }, [activeTab, allCourses]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumb(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (thumb) data.append("thumb", thumb);

    try {
      const res = await fetch(`${BASE_URL}/course/add`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        toast.success("Course created successfully");
        setFormData({
          title: "",
          price: "",
          description: "",
          category: "",
          instructors: "",
          skill_level: "",
          price_type: "",
          language: "",
        });
        setThumb(null);
        dispatch(setCourses([...allCourses, result]));
        setActiveTab(0);
      } else {
        toast.error("Failed to create course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting course");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the course permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/course/delete/${courseId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedCourses = allCourses.filter((course) => course.id !== courseId);
        dispatch(setCourses(updatedCourses));
        toast.success("Course deleted successfully!");
      } else {
        toast.error("Failed to delete course.");
      }
    } catch (error) {
      toast.error("Error deleting course.");
    }
  };

  const handleUpdateCourse = (courseId: string) => {
    console.log(`Updating course with ID: ${courseId}`);
  };

  return (
    <div className="col-lg-9">
      <div className="dashboard__content-wrap dashboard__content-wrap-two">
        <div className="dashboard__content-title">
          <h4 className="title">Available Courses</h4>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="dashboard__nav-wrap mb-40">
              <ul className="nav nav-tabs" role="tablist">
                {courseTabs.map((tab, index) => (
                  <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-content">
              {/* Courses Tab */}
              {activeTab === 0 && (
                <div className="row">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="col-xl-4 col-lg-6 col-md-6">
                      <div className="courses__item courses__item-two shine__animate-item">
                        <div className="courses__item-thumb courses__item-thumb-two">
                          <Link to={`/course-details/${course.id}`} className="shine__animate-link">
                            <img
                              src={course.thumb?.startsWith("http") ? course.thumb : `${BASE_URL}${course.thumb}`}
                              alt={course.title}
                              onError={(e) =>
                                (e.currentTarget.src = `${BASE_URL}/uploads/default.jpg`)
                              }
                            />
                          </Link>
                        </div>
                        <div className="courses__item-content courses__item-content-two">
                          <ul className="courses__item-meta list-wrap">
                            <li className="courses__item-tag">
                              <Link to="/courses">{course.category}</Link>
                            </li>
                            <li className="price">${course.price}.00</li>
                          </ul>
                          <h5 className="title">
                            <Link to={`/course-details/${course.id}`}>{course.title}</Link>
                          </h5>
                          <div className="courses__item-content-bottom">
                            <div className="author-two">
                              <Link to="#">{course.instructors}</Link>
                            </div>
                            <div className="avg-rating">
                              <i className="fas fa-star"></i> {course.rating}
                            </div>
                          </div>
                        </div>
                        <div className="courses__item-bottom-two">
                          <ul className="list-wrap d-flex justify-content-between w-100">
                            <li>
                              <button
                                onClick={() => handleUpdateCourse(course.id)}
                                className="btn btn-sm btn-primary"
                              >
                                Update
                              </button>
                            </li>
                            <li>
                              <img
                                src="/assets/img/icons/trash.png"
                                alt="Delete"
                                onClick={() => handleDeleteCourse(course.id)}
                                style={{
                                   cursor: "pointer",
                                   width: "40px",
                                   height: "40px",
                                   transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
                                   padding: "5px",
                                   borderRadius: "50%",
                                }}
                                onMouseOver={(e) => {
                                   e.currentTarget.style.transform = "scale(1.1)";
                                   e.currentTarget.style.backgroundColor = "#fbc90b";
                                }}
                                onMouseOut={(e) => {
                                   e.currentTarget.style.transform = "scale(1)";
                                   e.currentTarget.style.backgroundColor = "transparent";
                                }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Course Form */}
              {activeTab === 1 && (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    {[
                      { name: "title", type: "text" },
                      { name: "price", type: "number" },
                      { name: "description", type: "textarea" },
                      { name: "category", type: "text" },
                      { name: "instructors", type: "text" },
                      { name: "skill_level", type: "text" },
                      { name: "price_type", type: "text" },
                      { name: "language", type: "text" },
                    ].map(({ name, type }) => (
                      <div className="col-md-6 mb-3" key={name}>
                        <label className="form-label text-capitalize">{name}</label>
                        {type === "textarea" ? (
                          <textarea
                            className="form-control"
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input
                            className="form-control"
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        )}
                      </div>
                    ))}

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Thumbnail</label>
                      <input type="file" className="form-control" onChange={handleThumbChange} />
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Create Course
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorEnrolledCourseContent;
