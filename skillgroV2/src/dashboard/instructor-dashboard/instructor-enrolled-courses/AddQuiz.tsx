import { toast } from "react-toastify";
import {  useState } from "react";

// Définition des types
interface QuizFormProps {
    courseId: string; // Assuming courseId is a string
}

interface QuizData {
    titre: string;
    description: string;
    cours: string;
    questions: Array<{
        _id: string;
        contenu: string;
        score: number;
        correctAnswer: string;
        reponses: Array<{ texte: string }>;
    }>;
}

const BASE_URL = "http://localhost:3000"; // URL de base de l'API

// Formulaire de création de quiz
const QuizForm = ({ courseId }: QuizFormProps) => {
    // État initial du quiz
    const [quizData, setQuizData] = useState<QuizData>({
        titre: "",
        description: "",
        cours: courseId,
        questions: [
            {
                _id: "",
                contenu: "",
                score: 0,
                correctAnswer: "",
                reponses: [{ texte: "" }],
            },
        ],
    });

    // Gérer les changements des champs du quiz
    const handleQuizInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
        field?: keyof QuizData | keyof QuizData['questions'][0]
    ) => {
        const { name, value } = e.target;
        setQuizData((prevData) => {
            const newQuestions = [...prevData.questions];
            if (index !== undefined && field) {
                // Mise à jour des questions
                newQuestions[index][field] = value;
            } else {
                prevData[name as keyof QuizData] = value;
            }
            return { ...prevData, questions: newQuestions };
        });
    };

    // Gérer les changements des réponses d'une question
    const handleResponseChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionIndex: number,
        responseIndex: number
    ) => {
        const { value } = e.target;
        setQuizData((prevData) => {
            const updatedQuizData = { ...prevData };
            updatedQuizData.questions[questionIndex].reponses[responseIndex].texte = value;
            return updatedQuizData;
        });
    };

    // Ajouter une question
    const addQuestion = async () => {
        try {
            const res = await fetch(`${BASE_URL}/questions/addQuestions/${quizData.cours}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contenu: "",
                    score: 0,
                    correctAnswer: "",
                    reponses: [{ texte: "" }],
                }),
            });

            if (res.ok) {
                const newQuestion = await res.json();
                setQuizData((prevData) => ({
                    ...prevData,
                    questions: [...prevData.questions, newQuestion],
                }));
            } else {
                toast.error("Échec de l'ajout de la question");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l'ajout de la question");
        }
    };

    // Ajouter une réponse à une question
    const addResponse = async (questionIndex: number) => {
        try {
            const questionId = quizData.questions[questionIndex]._id;
            if (!questionId) {
                toast.error("Question ID is missing");
                return;
            }

            const res = await fetch(
                `${BASE_URL}/responses/questions/${questionId}/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ texte: "" }),
                }
            );

            if (res.ok) {
                const newResponse = await res.json();
                setQuizData((prevData) => {
                    const updatedQuizData = { ...prevData };
                    updatedQuizData.questions[questionIndex].reponses.push(newResponse);
                    return updatedQuizData;
                });
            } else {
                toast.error("Échec de l'ajout de la réponse");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l'ajout de la réponse");
        }
    };

    // Soumettre le formulaire de quiz
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const courseId = quizData.cours;

        if (!courseId) {
            toast.error("Course ID is missing");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/quiz/add/${courseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData),
            });

            if (res.ok) {
                const result = await res.json();
                toast.success("Quiz créé avec succès");
                // Réinitialiser le formulaire
                setQuizData({
                    titre: "",
                    description: "",
                    cours: courseId,
                    questions: [
                        {
                            _id: "",
                            contenu: "",
                            score: 0,
                            correctAnswer: "",
                            reponses: [{ texte: "" }],
                        },
                    ],
                });
            } else {
                toast.error("Échec de la création du quiz");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la création du quiz");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre</label>
                <input
                    type="text"
                    name="titre"
                    value={quizData.titre}
                    onChange={handleQuizInputChange}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={quizData.description}
                    onChange={handleQuizInputChange}
                />
            </div>

            {/* Render questions and responses */}
            {quizData.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <div>
                        <label>Contenu de la question</label>
                        <input
                            type="text"
                            value={question.contenu}
                            onChange={(e) =>
                                handleQuizInputChange(e, questionIndex, "contenu")
                            }
                        />
                    </div>
                    <div>
                        <label>Score</label>
                        <input
                            type="number"
                            value={question.score}
                            onChange={(e) =>
                                handleQuizInputChange(e, questionIndex, "score")
                            }
                        />
                    </div>
                    <div>
                        <label>Réponse correcte</label>
                        <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) =>
                                handleQuizInputChange(e, questionIndex, "correctAnswer")
                            }
                        />
                    </div>

                    {/* Render answers */}
                    {question.reponses.map((response, responseIndex) => (
                        <div key={responseIndex}>
                            <input
                                type="text"
                                value={response.texte}
                                onChange={(e) =>
                                    handleResponseChange(e, questionIndex, responseIndex)
                                }
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => addResponse(questionIndex)}>
                        Ajouter une réponse
                    </button>
                </div>
            ))}

            <button type="button" onClick={addQuestion}>
                Ajouter une question
            </button>
            <button type="submit">Créer le quiz</button>
        </form>
    );
};

export default QuizForm;
