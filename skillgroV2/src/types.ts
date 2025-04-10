export interface Reponse {
  _id?: number;
  texte: string;
  isCorrect: boolean;
  answernum: string; // "A", "B", "C", or "D"
  questionId?: number;
}

export interface Question {
  _id: string;
  contenu: string;
  score: number;
  correctAnswer: string;
  quiz: string;
  reponses: Reponse[]; // Remove | string[] to enforce populated objects
  selectedAnswer?: string;
}

export interface Quiz {
  _id: string;
  
  titre: string;
  description?: string;
  questions: Question[];
  scores: string[];
  course: string;
}
  
export interface Course {
  _id: string;                     // MongoDB / frontend ID
  idCours?: number;               // Backend Java ID (optionnel)
  
  title?: string;                 // Nom en anglais (frontend)
  titre?: string;                 // Nom en français (backend)
  
  description: string;

  image?: string;                 // Image côté backend
  thumb?: string;                 // Image côté frontend (thumb = thumbnail)

  contenu?: string[];             // PDFs, etc. (backend)

  price?: number;
  category?: string;
  instructors?: string;
  rating?: number;
  skill_level?: string;
  price_type?: string;
  language?: string;
  popular?: string;
  createdAt?: string | Date;      // Accept both string or Date for flexibility
}

  
  export interface ScoreQuiz {
    idScoreQuiz?: number;
    quiz: Quiz;
    user: { id: number; nom: string }; // Simplified user
    score: number;
    isTimedOut: boolean;
  }