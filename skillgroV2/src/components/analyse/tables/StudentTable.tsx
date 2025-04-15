import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = ({ onRowClick }: { onRowClick: (student: any) => void }) => {
  const [students, setStudents] = useState<any[]>([]); // État pour stocker les étudiants
  const [loading, setLoading] = useState<boolean>(true); // État pour indiquer le chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

  useEffect(() => {
    // Requête GET pour récupérer les étudiants depuis l'API Express
    axios
      .get('http://localhost:3000/studentsDetails') // Remplacez par l'URL de votre API
      .then((response) => {
        setStudents(response.data); // Mise à jour de l'état des étudiants
        setLoading(false); // Désactive le mode de chargement
      })
      .catch((err) => {
        setError('Erreur de chargement des étudiants'); // Gérer l'erreur
        setLoading(false); // Désactive le mode de chargement
      });
  }, []); // Le tableau vide [] assure que la requête est effectuée une seule fois au chargement du composant

  if (loading) {
    return <div>Chargement...</div>; // Afficher un message de chargement
  }

  if (error) {
    return <div>{error}</div>; // Afficher une erreur si la requête échoue
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} onClick={() => onRowClick(student)} style={{ cursor: 'pointer' }}>
              <td>{student.id}</td>
              <td>{student.nom}</td>
              <td>{student.prenom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
