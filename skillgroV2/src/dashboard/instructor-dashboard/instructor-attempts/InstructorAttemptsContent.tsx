import { useEffect, useState } from "react";
import { Quiz } from "../../../types.ts";

interface QuizDisplay {
   id: string;
   title: string;
   qus: number;
   tm: number;
}

const InstructorQuizzesContent = () => {
   const [quizzes, setQuizzes] = useState<QuizDisplay[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
   const [formData, setFormData] = useState<Quiz | null>(null);

   const fetchQuizzes = async () => {
      try {
         const response = await fetch("http://localhost:3000/quiz/getAll");
         if (!response.ok) throw new Error("Failed to fetch quizzes");

         const result = await response.json();
         if (Array.isArray(result.data)) {
            const quizList = result.data.map((quiz: Quiz) => ({
               id: quiz._id.toString(),
               title: quiz.titre,
               qus: quiz.questions?.length || 0,
               tm: quiz.questions?.reduce((acc, q) => acc + (q.score || 0), 0) || 0,
            }));
            setQuizzes(quizList);
         } else throw new Error("Invalid data format");

         setLoading(false);
      } catch (err) {
         setError(err instanceof Error ? err.message : "An error occurred");
         setLoading(false);
      }
   };

   const handleDeleteQuiz = async (quizId: string) => {
      if (!confirm("Are you sure you want to delete this quiz?")) return;

      try {
         const response = await fetch(`http://localhost:3000/quiz/delete/${quizId}`, { method: "DELETE" });
         if (!response.ok) throw new Error("Failed to delete quiz");

         setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
         alert("Quiz deleted successfully!");
      } catch (err) {
         alert("Error deleting quiz: " + (err instanceof Error ? err.message : "An error occurred"));
      }
   };

   const handleEditQuiz = async (quizId: string) => {
      try {
         const response = await fetch(`http://localhost:3000/quiz/${quizId}`);
         if (!response.ok) throw new Error("Failed to fetch quiz for editing");

         const result = await response.json();
         if (!result.data) throw new Error("Quiz not found");

         const quizData = {
            ...result.data,
            questions: result.data.questions.map((q: any) => ({
               ...q,
               reponses: q.reponses || [],
            })),
            scores: result.data.scores || [],
         };

         setSelectedQuiz(quizData);
         setFormData(quizData);
         setIsModalOpen(true);
      } catch (err) {
         alert("Error fetching quiz for editing: " + (err instanceof Error ? err.message : "An error occurred"));
      }
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedQuiz(null);
      setFormData(null);
   };

   const handleFormChange = (
       e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
       field: string,
       index?: number,
       subField?: string,
       answerIndex?: number
   ) => {
      if (!formData) return;

      const value = e.target.value;
      setFormData((prev) => {
         if (!prev) return prev;

         if (field === "titre" || field === "description") {
            return { ...prev, [field]: value };
         } else if (field === "questions" && index !== undefined) {
            const updatedQuestions = [...prev.questions];
            if (subField === "contenu" || subField === "correctAnswer") {
               updatedQuestions[index] = { ...updatedQuestions[index], [subField]: value };
            } else if (subField === "score") {
               updatedQuestions[index] = { ...updatedQuestions[index], score: parseInt(value) || 0 };
            } else if (subField === "reponses" && answerIndex !== undefined) {
               const updatedReponses = [...updatedQuestions[index].reponses];
               updatedReponses[answerIndex] = { ...updatedReponses[answerIndex], texte: value };
               updatedQuestions[index] = { ...updatedQuestions[index], reponses: updatedReponses };
            }
            return { ...prev, questions: updatedQuestions };
         }
         return prev;
      });
   };

   const addNewQuestion = () => {
      setFormData((prev) => {
         if (!prev) return prev;
         return {
            ...prev,
            questions: [
               ...prev.questions,
               {
                  contenu: "",
                  score: 0,
                  correctAnswer: "",
                  reponses: [{ texte: "" }, { texte: "" }],
               },
            ],
         };
      });
   };

   const deleteQuestion = (index: number) => {
      setFormData((prev) => {
         if (!prev) return prev;
         const updatedQuestions = prev.questions.filter((_, i) => i !== index);
         return { ...prev, questions: updatedQuestions };
      });
   };

   const addNewResponse = (questionIndex: number) => {
      setFormData((prev) => {
         if (!prev) return prev;
         const updatedQuestions = [...prev.questions];
         updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            reponses: [...updatedQuestions[questionIndex].reponses, { texte: "" }],
         };
         return { ...prev, questions: updatedQuestions };
      });
   };

   const deleteResponse = (questionIndex: number, answerIndex: number) => {
      setFormData((prev) => {
         if (!prev) return prev;
         const updatedQuestions = [...prev.questions];
         const updatedReponses = updatedQuestions[questionIndex].reponses.filter((_, i) => i !== answerIndex);
         updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            reponses: updatedReponses,
         };
         return { ...prev, questions: updatedQuestions };
      });
   };

   const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedQuiz || !formData) return;

      try {
         // Validate form data
         if (!formData.titre) throw new Error("Quiz title is required");
         for (const q of formData.questions) {
            if (!q.contenu || !q.correctAnswer || q.score === undefined) {
               throw new Error("All questions must have content, score, and correct answer");
            }
            if (q.reponses.length < 2) {
               throw new Error("Each question must have at least two responses");
            }
            if (!q.reponses.some((r) => r.texte === q.correctAnswer)) {
               throw new Error("Correct answer must match one of the response texts");
            }
         }

         const updateData = {
            titre: formData.titre,
            description: formData.description || "",
            cours: typeof formData.cours === "object" ? formData.cours.id : formData.cours,
            questions: formData.questions.map((q) => ({
               _id: q._id,
               contenu: q.contenu,
               score: q.score || 0,
               correctAnswer: q.correctAnswer,
               reponses: q.reponses.map((r) => ({
                  _id: r._id,
                  texte: r.texte,
               })),
            })),
            scores: formData.scores || [],
         };

         console.log("Submitting quiz update:", updateData);
         const updateResponse = await fetch(`http://localhost:3000/quiz/update/${selectedQuiz._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
         });

         const updateResult = await updateResponse.json();
         if (!updateResponse.ok) throw new Error(updateResult.message || "Failed to update quiz");

         setQuizzes((prev) =>
             prev.map((q) =>
                 q.id === selectedQuiz._id
                     ? {
                        ...q,
                        title: formData.titre,
                        qus: formData.questions?.length || 0,
                        tm: formData.questions?.reduce((acc, q) => acc + (q.score || 0), 0) || 0,
                     }
                     : q
             )
         );

         alert("Quiz updated successfully!");
         handleModalClose();
      } catch (err) {
         console.error("Error updating quiz:", err);
         alert("Error updating quiz: " + (err instanceof Error ? err.message : "An error occurred"));
      }
   };

   useEffect(() => {
      fetchQuizzes();
   }, []);

   if (loading) return <p>Loading quizzes...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
       <div className="col-lg-9">
          <div className="dashboard__content-wrap">
             <div className="dashboard__content-title">
                <h4 className="title">My Quizzes</h4>
             </div>
             <div className="row">
                <div className="col-12">
                   <div className="dashboard__review-table">
                      <table className="table table-borderless">
                         <thead>
                         <tr>
                            <th>Quiz</th>
                            <th>N° Questions </th>
                            <th>Score</th>
                            <th></th>
                         </tr>
                         </thead>
                         <tbody>
                         {quizzes.map((item) => (
                             <tr key={item.id}>
                                <td>
                                   <div className="dashboard__quiz-info">
                                      <h6 className="title">{item.title}</h6>
                                   </div>
                                </td>
                                <td>
                                   <p className="color-black">{item.qus}</p>
                                </td>
                                <td>
                                   <p className="color-black">{item.tm}</p>
                                </td>
                                <td>
                                   <div className="dashboard__review-action">
                                      <button
                                          onClick={() => handleEditQuiz(item.id)}
                                          className="border-0 bg-transparent"
                                          title="Edit"
                                      >
                                         <i className="skillgro-edit"></i>
                                      </button>
                                      <button
                                          onClick={() => handleDeleteQuiz(item.id)}
                                          className="border-0 bg-transparent"
                                          title="Delete"
                                      >
                                         <i className="skillgro-bin"></i>
                                      </button>
                                   </div>
                                </td>
                             </tr>
                         ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>

          {/* Modal */}
          {isModalOpen && formData && (
              <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                 <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                       <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Quiz</h5>
                          <button type="button" className="close text-white" onClick={handleModalClose}>
                             <span>×</span>
                          </button>
                       </div>
                       <div className="modal-body">
                          <form onSubmit={handleFormSubmit}>
                             <div className="form-group mb-3">
                                <label className="fw-bold">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.titre}
                                    onChange={(e) => handleFormChange(e, "titre")}
                                />
                             </div>
                             <div className="form-group mb-3">
                                <label className="fw-bold">Description</label>
                                <textarea
                                    className="form-control"
                                    value={formData.description || ""}
                                    onChange={(e) => handleFormChange(e, "description")}
                                />
                             </div>
                             <div className="form-group mb-3">
                                <label className="fw-bold">Course ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={typeof formData.cours === "object" ? formData.cours.id : formData.cours || ""}
                                    disabled
                                />
                             </div>
                             <div className="form-group mb-3">
                                <label className="fw-bold">Questions</label>
                                {formData.questions.map((question, index) => (
                                    <div key={question._id || `new-${index}`} className="border rounded p-3 mb-3 position-relative">
                                       <h6>Question {index + 1}</h6>
                                       <button
                                           type="button"
                                           className="btn btn-danger btn-sm position-absolute"
                                           style={{ top: "10px", right: "10px" }}
                                           onClick={() => deleteQuestion(index)}
                                           disabled={formData.questions.length === 1}
                                       >
                                          Delete
                                       </button>
                                       <div className="mb-2">
                                          <label className="form-label">Content</label>
                                          <input
                                              className="form-control"
                                              value={question.contenu}
                                              onChange={(e) => handleFormChange(e, "questions", index, "contenu")}
                                          />
                                       </div>
                                       <div className="mb-2">
                                          <label className="form-label">Responses</label>
                                          {question.reponses.map((answer, i) => (
                                              <div key={answer._id || `new-${i}`} className="input-group mb-2">
                                                 <span className="input-group-text">{i + 1}</span>
                                                 <input
                                                     className="form-control"
                                                     value={answer.texte}
                                                     onChange={(e) => handleFormChange(e, "questions", index, "reponses", i)}
                                                 />
                                                 <button
                                                     type="button"
                                                     className="btn btn-outline-danger"
                                                     onClick={() => deleteResponse(index, i)}
                                                     disabled={question.reponses.length <= 2}
                                                 >
                                                    Delete
                                                 </button>
                                              </div>
                                          ))}
                                          <button
                                              type="button"
                                              className="btn btn-outline-primary mt-2"
                                              onClick={() => addNewResponse(index)}
                                          >
                                             Add Response
                                          </button>
                                       </div>
                                       <div className="mb-2">
                                          <label className="form-label">Correct Answer</label>
                                          <select
                                              className="form-control"
                                              value={question.correctAnswer}
                                              onChange={(e) => handleFormChange(e, "questions", index, "correctAnswer")}
                                          >
                                             <option value="">Select Correct Answer</option>
                                             {question.reponses.map((ans, i) => (
                                                 <option key={ans._id || `new-${i}`} value={ans.texte}>
                                                    {i + 1}: {ans.texte}
                                                 </option>
                                             ))}
                                          </select>
                                       </div>
                                       <div className="mb-2">
                                          <label className="form-label">Score</label>
                                          <input
                                              type="number"
                                              className="form-control"
                                              value={question.score || 0}
                                              onChange={(e) => handleFormChange(e, "questions", index, "score")}
                                          />
                                       </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-primary mb-3" onClick={addNewQuestion}>
                                   Add New Question
                                </button>
                             </div>
                             <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                   Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                   Save Changes
                                </button>
                             </div>
                          </form>
                       </div>
                    </div>
                 </div>
              </div>
          )}
       </div>
   );
};

export default InstructorQuizzesContent;