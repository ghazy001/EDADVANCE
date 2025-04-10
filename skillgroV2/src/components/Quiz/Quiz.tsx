import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Quiz, Question, Reponse } from "../../types";

const BASE_URL = "http://localhost:3000";

interface QuizComponentProps {
  quizId: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quizId }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref pour gérer le timer
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes

  // Fonction pour charger le quiz depuis l'API
  const getQuizById = async (quizId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/quizzes/${quizId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      if (result.status === "SUCCESS") {
        const questionsData = result.data.questions || [];
        if (!questionsData.length) {
          setError("No questions available for this quiz.");
          return;
        }

        const updatedQuestions = questionsData.map((q: Question) => ({
          ...q,
          selectedAnswer: q.selectedAnswer || "",
          reponses: q.reponses?.map((r, index) => ({
            ...r,
            answernum: String.fromCharCode(65 + index),
          })) || [],
        }));

        setQuiz({
          ...result.data,
          questions: updatedQuestions,
          titre: result.data.titre || "Quiz",
        });

        const totalPossibleScore = updatedQuestions.reduce(
          (sum: number, q: Question) => sum + (q.score || 0),
          0
        );
        setMaxScore(totalPossibleScore);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quizId || !quizId.match(/^[0-9a-fA-F]{24}$/)) {
      setError("No valid quiz ID found in URL");
      return;
    }
    getQuizById(quizId);
  }, [quizId]);

  useEffect(() => {
    if (isSubmitted) return; // Ne pas redémarrer le timer si le quiz est soumis
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          setIsSubmitted(true);
          submitAnswers(true); // Soumettre à la fin du temps
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!); // Nettoyer le timer
  }, [isSubmitted]);

  const selectAnswer = (question: Question, reponse: Reponse) => {
    if (!isSubmitted && quiz) {
      const updatedQuestions = quiz.questions.map((q) =>
        q._id === question._id ? { ...q, selectedAnswer: reponse.answernum } : q
      );
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const submitAnswers = async (isTimedOut: boolean = false) => {
    if (!quizId || !quiz) return;

    const userId = "1"; // Remplacer par l'ID réel de l'utilisateur
    const userAnswers: { [key: string]: string } = {};
    quiz.questions.forEach((q) => {
      if (q._id) userAnswers[q._id] = q.selectedAnswer || "";
    });

    try {
      const response = await fetch(`${BASE_URL}/quizzes/${quizId}/user/${userId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswers, isTimedOut }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      if (result.status === "SUCCESS") {
        setTotalScore(result.data.score || 0);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError("Error submitting quiz: " + (err as Error).message);
    }
  };

  const submitQuiz = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitted && quiz && areAllQuestionsAnswered()) {
      setIsSubmitted(true);
      submitAnswers(false);
    } else {
      setError("Please answer all questions before submitting.");
    }
  };

  const getFormattedTime = (): string => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const isAnswerCorrect = (question: Question): boolean =>
    !!question.selectedAnswer && question.selectedAnswer === question.correctAnswer;

  const areAllQuestionsAnswered = (): boolean =>
    quiz?.questions.every((q) => q.selectedAnswer !== "") || false;

  return (
    <main className="main-area fix">
      <section
        className="breadcrumb__area breadcrumb__bg"
        style={{ backgroundImage: "url(assets/img/bg/breadcrumb_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb__content">
                <h2>{quiz?.titre || "Loading..."}</h2>
                <nav className="breadcrumb">
                  <span property="itemListElement">
                    <a href="index.html">courses</a>
                  </span>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-angle-right"></i>
                  </span>
                  <span property="itemListElement">final Audit</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb__shape-wrap"></div>
      </section>

      <div className="container mt-5">
        {quiz?.description && <p>{quiz.description}</p>}

        {!isSubmitted && quiz && (
          <div className="text-center mb-4">
            <h4>
              Temps restant: <span className="badge bg-primary">{getFormattedTime()}</span>
            </h4>
          </div>
        )}

        {loading && <div className="text-center"><p>Chargement des questions...</p></div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {!loading && quiz && quiz.questions && quiz.questions.length > 0 ? (
          <form onSubmit={submitQuiz}>
            {quiz.questions.map((question, index) => (
              <div key={question._id || index} className="question-item mb-4">
                <h4>{`${index + 1}. ${question.contenu || "No content available"}`}</h4>
                <div className="form-group">
                  {question.reponses && question.reponses.length > 0 ? (
                    question.reponses.map((reponse) => (
                      <div key={reponse._id || reponse.answernum} className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id={`reponse-${question._id || index}-${reponse.answernum}`}
                          name={`question-${question._id || index}`}
                          value={reponse.answernum}
                          checked={question.selectedAnswer === reponse.answernum}
                          disabled={isSubmitted}
                          onChange={() => selectAnswer(question, reponse)}
                        />
                        <label className="form-check-label" htmlFor={`reponse-${question._id || index}-${reponse.answernum}`}>
                          {`${reponse.answernum}: ${reponse.texte || "No response text"}`}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>No responses available for this question.</p>
                  )}
                  {isSubmitted && question.selectedAnswer && (
                    <div className="mt-2">
                      <span className={`badge ${isAnswerCorrect(question) ? "bg-success" : "bg-danger"}`}>
                        {isAnswerCorrect(question) ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="btn btn-primary m-5"
              disabled={loading || isSubmitted || !areAllQuestionsAnswered()}
            >
              Submit Quiz
            </button>
          </form>
        ) : (
          !loading && !error && <p>Aucune question disponible pour ce quiz.</p>
        )}

        {isSubmitted && (
          <div className="mt-4">
            <h3>Note finale</h3>
            <p>Votre score: {totalScore} / {maxScore}</p>
            <p>
              {totalScore === maxScore
                ? "Félicitations, score parfait !"
                : "Merci pour votre participation"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default QuizComponent;
