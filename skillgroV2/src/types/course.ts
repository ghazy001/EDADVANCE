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
