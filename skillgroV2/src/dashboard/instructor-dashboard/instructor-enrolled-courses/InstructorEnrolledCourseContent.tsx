import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { selectCourses, setCourses } from "../../../redux/features/courseSlice";
import UseCourses from "../../../hooks/UseCourses";

const BASE_URL = "http://localhost:3000";
const courseTabs = ["All Courses", "Add Course", "Add Lesson", "Add Quiz"];

const InstructorEnrolledCourseContent = () => {
  UseCourses();
  const allCourses = useSelector(selectCourses);
  const dispatch = useDispatch();
  const [lessonThumb, setLessonThumb] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    instructors: "",
    skill_level: "Beginner",
    price_type: "Paid",
    language: "Arabic",
    programmingLanguage: "php",
  });
  const [lessonFormData, setLessonFormData] = useState({
    courseId: "",
    title: "",
    videoUrl: "",
    duration: "",
    order: "",
    isLocked: false,
  });
  const [quizFormData, setQuizFormData] = useState({
    cours: "",
    titre: "",
    description: "",
    questions: [{ contenu: "", score: "", correctAnswer: "", reponses: ["", "", "", ""] }],
  });
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    let result = [...allCourses];
    if (activeTab === 1) {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    setFilteredCourses(result);
  }, [activeTab, allCourses]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumb(e.target.files[0]);
    }
  };

  const handleLessonInputChange = (e) => {
    setLessonFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleLessonThumbChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLessonThumb(e.target.files[0]);
    }
  };

  const handleQuizInputChange = (e, questionIndex = null, responseIndex = null) => {
    const { name, value } = e.target;
    setQuizFormData((prev) => {
      if (questionIndex === null && responseIndex === null) {
        return { ...prev, [name]: value };
      } else if (responseIndex === null) {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          [name]: value,
        };
        return { ...prev, questions: updatedQuestions };
      } else {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[questionIndex].reponses[responseIndex] = value;
        return { ...prev, questions: updatedQuestions };
      }
    });
  };

  const addQuestion = () => {
    setQuizFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { contenu: "", score: "", correctAnswer: "", reponses: ["", "", "", ""] }],
    }));
  };

  const removeQuestion = (index) => {
    setQuizFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleCourseSubmit = async (e) => {
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
          skill_level: "Beginner",
          price_type: "Paid",
          language: "Arabic",
          programmingLanguage: "php",
        });
        setThumb(null);
        dispatch(setCourses([...allCourses, result]));
      } else {
        toast.error("Failed to create course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting course");
    }
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(lessonFormData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (lessonThumb) data.append("thumb", lessonThumb);

    try {
      const res = await fetch(`${BASE_URL}/course/addLesson`, {
        method: "POST",
        body: data,
        headers: {
          // Add authorization if required
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Lesson added successfully");
        setLessonFormData({
          courseId: "",
          title: "",
          videoUrl: "",
          duration: "",
          order: "",
          isLocked: false,
        });
        setLessonThumb(null);
      } else {
        toast.error("Failed to add lesson");
      }
    } catch (error) {
      console.error("Error submitting lesson:", error);
      toast.error("Error submitting lesson");
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!quizFormData.cours) {
      toast.error("Please select a course");
      return;
    }
    if (!/^[0-9a-fA-F]{24}$/.test(quizFormData.cours)) {
      toast.error("Invalid course ID format");
      return;
    }
    if (!quizFormData.titre) {
      toast.error("Quiz title is required");
      return;
    }
    for (const question of quizFormData.questions) {
      if (!question.contenu || !question.score || !question.correctAnswer) {
        toast.error("All question fields are required");
        return;
      }
      if (question.reponses.every((r) => r.trim() === "")) {
        toast.error("At least one response is required per question");
        return;
      }
    }

    try {
      // Step 1: Create the quiz
      const quizData = {
        titre: quizFormData.titre,
        description: quizFormData.description,
      };
      console.log("Creating quiz:", quizData, "for course:", quizFormData.cours);
      const quizRes = await fetch(`${BASE_URL}/quiz/add/${quizFormData.cours}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const quizText = await quizRes.text();
      console.log("Quiz response status:", quizRes.status, "Text:", quizText);
      let quizResult;
      try {
        quizResult = quizText ? JSON.parse(quizText) : {};
      } catch (error) {
        console.error("Failed to parse quiz response:", error);
        throw new Error("Invalid JSON response from quiz creation");
      }
      console.log("Quiz result:", quizResult);

      if (!quizRes.ok) {
        throw new Error(`Failed to create quiz: ${quizResult.message || quizText}`);
      }
      if (!quizResult.data?._id) {
        throw new Error("Quiz creation succeeded but no quiz ID returned");
      }

      // Step 2: Add questions and responses
      for (const question of quizFormData.questions) {
        const questionData = {
          contenu: question.contenu,
          score: parseInt(question.score),
          correctAnswer: question.correctAnswer,
        };
        console.log("Adding question to quiz:", quizResult.data._id, "with data:", questionData);
        const questionRes = await fetch(`${BASE_URL}/questions/addQuestions/${quizResult.data._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(questionData),
        });
        const questionText = await questionRes.text();
        console.log("Question response status:", questionRes.status, "Text:", questionText);
        let questionResult;
        try {
          questionResult = questionText ? JSON.parse(questionText) : {};
        } catch (error) {
          console.error("Failed to parse question response:", error);
          throw new Error("Invalid JSON response from question creation");
        }

        if (!questionRes.ok) {
          throw new Error(`Failed to add question: ${questionResult.message || questionText}`);
        }
        if (!questionResult.data?._id) {
          throw new Error("Question creation succeeded but no question ID returned");
        }

        // Step 3: Add responses for each question
        for (const texte of question.reponses.filter((r) => r.trim() !== "")) {
          const responseData = { texte };
          console.log("Adding response to question:", questionResult.data._id, "with data:", responseData);
          const responseRes = await fetch(`${BASE_URL}/responses/questions/${questionResult.data._id}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseData),
          });
          const responseText = await responseRes.text();
          console.log("Response response status:", responseRes.status, "Text:", responseText);
          if (!responseRes.ok) {
            throw new Error(`Failed to add response: ${responseText}`);
          }
        }
      }

      toast.success("Quiz created successfully");
      setQuizFormData({
        cours: "",
        titre: "",
        description: "",
        questions: [{ contenu: "", score: "", correctAnswer: "", reponses: ["", "", "", ""] }],
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error(`Error submitting quiz: ${error.message}`);
    }
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
                      <li
                          key={index}
                          onClick={() => handleTabClick(index)}
                          className="nav-item"
                          role="presentation"
                      >
                        <button
                            className={`nav-link ${activeTab === index ? "active" : ""}`}
                        >
                          {tab}
                        </button>
                      </li>
                  ))}
                </ul>
              </div>

              <div className="tab-content">
                {activeTab === 0 && (
                    <div className="row">
                      {filteredCourses.map((course) => (
                          <div key={course.id} className="col-xl-4 col-lg-6 col-md-6">
                            <div className="courses__item courses__item-two shine__animate-item">
                              <div className="courses__item-thumb courses__item-thumb-two">
                                <Link to={`/course-details/${course.id}`} className="shine__animate-link">
                                  <img
                                      src={
                                        course.thumb?.startsWith("http")
                                            ? course.thumb
                                            : `${BASE_URL}${course.thumb}`
                                      }
                                      alt={course.title}
                                      onError={(e) => (e.currentTarget.src = `${BASE_URL}/Uploads/default.jpg`)}
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
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}

                {activeTab === 1 && (
                    <form onSubmit={handleCourseSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Course Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price ($)</label>
                        <input
                            className="form-control"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            className="form-control"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Instructors</label>
                        <input
                            className="form-control"
                            type="text"
                            name="instructors"
                            value={formData.instructors}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Skill Level</label>
                        <select
                            className="form-control"
                            name="skill_level"
                            value={formData.skill_level}
                            onChange={handleInputChange}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price Type</label>
                        <select
                            className="form-control"
                            name="price_type"
                            value={formData.price_type}
                            onChange={handleInputChange}
                        >
                          <option value="Free">Free</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Language</label>
                        <select
                            className="form-control"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                        >
                          <option value="Arabic">Arabic</option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Programming Language</label>
                        <select
                            className="form-control"
                            name="programmingLanguage"
                            value={formData.programmingLanguage}
                            onChange={handleInputChange}
                        >
                          <option value="php">PHP</option>
                          <option value="javascript">JavaScript</option>
                          <option value="css">CSS</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Thumbnail Image</label>
                        <input type="file" onChange={handleThumbChange} />
                      </div>
                      <button type="submit" className="btn btn-primary">Create Course</button>
                    </form>
                )}

                {activeTab === 2 && (
                    <div>
                      <h3>Add New Lesson</h3>
                      <form onSubmit={handleLessonSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Select Course</label>
                          <select
                              className="form-select"
                              name="courseId"
                              value={lessonFormData.courseId}
                              onChange={handleLessonInputChange}
                              required
                          >
                            <option value="">Select a course</option>
                            {allCourses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.title}
                                </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Lesson Title</label>
                          <input
                              className="form-control"
                              type="text"
                              name="title"
                              value={lessonFormData.title}
                              onChange={handleLessonInputChange}
                              required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Video URL</label>
                          <input
                              className="form-control"
                              type="text"
                              name="videoUrl"
                              value={lessonFormData.videoUrl}
                              onChange={handleLessonInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Duration</label>
                          <input
                              className="form-control"
                              type="text"
                              name="duration"
                              value={lessonFormData.duration}
                              onChange={handleLessonInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Order</label>
                          <input
                              className="form-control"
                              type="number"
                              name="order"
                              value={lessonFormData.order}
                              onChange={handleLessonInputChange}
                              required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Is Locked</label>
                          <input
                              type="checkbox"
                              name="isLocked"
                              checked={lessonFormData.isLocked}
                              onChange={handleLessonInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Thumbnail Image</label>
                          <input
                              className="form-control"
                              type="file"
                              onChange={handleLessonThumbChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Lesson</button>
                      </form>
                    </div>
                )}

                {activeTab === 3 && (
                    <div>
                      <h3>Add New Quiz</h3>
                      <form onSubmit={handleQuizSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Select Course</label>
                          <select
                              className="form-select"
                              name="cours"
                              value={quizFormData.cours}
                              onChange={handleQuizInputChange}
                              required
                          >
                            <option value="">Select a course</option>
                            {allCourses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.title}
                                </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Quiz Title</label>
                          <input
                              className="form-control"
                              type="text"
                              name="titre"
                              value={quizFormData.titre}
                              onChange={handleQuizInputChange}
                              required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                              className="form-control"
                              name="description"
                              value={quizFormData.description}
                              onChange={handleQuizInputChange}
                          />
                        </div>

                        {quizFormData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="mb-4 border p-3">
                              <h5>Question {qIndex + 1}</h5>
                              <div className="mb-3">
                                <label className="form-label">Question Content</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="contenu"
                                    value={question.contenu}
                                    onChange={(e) => handleQuizInputChange(e, qIndex)}
                                    required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Score</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="score"
                                    value={question.score}
                                    onChange={(e) => handleQuizInputChange(e, qIndex)}
                                    required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Correct Answer</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="correctAnswer"
                                    value={question.correctAnswer}
                                    onChange={(e) => handleQuizInputChange(e, qIndex)}
                                    required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Responses</label>
                                {question.reponses.map((reponse, rIndex) => (
                                    <input
                                        key={rIndex}
                                        className="form-control mb-2"
                                        type="text"
                                        value={reponse}
                                        onChange={(e) => handleQuizInputChange(e, qIndex, rIndex)}
                                        placeholder={`Response ${rIndex + 1}`}
                                    />
                                ))}
                              </div>
                              <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeQuestion(qIndex)}
                                  disabled={quizFormData.questions.length === 1}
                              >
                                Remove Question
                              </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            onClick={addQuestion}
                        >
                          Add Question
                        </button>
                        <br />
                        <button type="submit" className="btn btn-primary">Add Quiz</button>
                      </form>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InstructorEnrolledCourseContent;