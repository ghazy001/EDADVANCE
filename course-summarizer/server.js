const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { summarizeText } = require('../controller/summarizer');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Préparer le dossier d'upload
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configurer Multer pour les fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// 🧾 Résumer un fichier PDF
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Fichier reçu :', req.file);

    const buffer = await fs.promises.readFile(req.file.path);
    const pdfData = await pdfParse(buffer);

    if (!pdfData.text.trim()) {
      console.log('Aucun texte extrait du PDF');
      return res.status(400).json({ error: 'Aucun texte extrait du PDF.' });
    }

    console.log('Texte extrait du PDF:', pdfData.text);

    const summary = await summarizeText(pdfData.text);
    res.json({ summary });
  } catch (error) {
    console.log('Erreur lors du traitement du fichier PDF :', error);
    res.status(500).json({ error: 'Erreur lors du résumé du PDF.' });
  }
});

// ✍️ Résumer du texte brut
app.post('/summarize-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      console.log('Texte manquant pour résumé');
      return res.status(400).json({ error: 'Texte manquant pour résumé.' });
    }

    console.log('Texte à résumer :', text);

    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.log('Erreur lors du résumé du texte :', error);
    res.status(500).json({ error: 'Erreur lors du résumé du texte.' });
  }
});

// 🚀 Lancer le serveur
app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
localhost