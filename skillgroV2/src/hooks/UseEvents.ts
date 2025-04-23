// src/hooks/UseEvents.ts

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEvents } from '../redux/features/eventSlice'; // Importer l'action du slice

const BASE_URL = "http://localhost:3000";

const UseEvents = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Test de la réponse avec des données fictives (Mock)
                const response = await fetch(`${BASE_URL}/event/getAll`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Vérification du succès de la réponse
                if (!response.ok) {
                    throw new Error('Échec de la récupération des événements');
                }

                // Réponse avec données fictives pour tester
                const data = await response.json(); // Remplacer par un mock si nécessaire

                // Vérification des données reçues
                if (Array.isArray(data)) {
                    const mappedEvents = data.map((event: any) => ({
                        id: event._id,
                        title: event.title,
                        date: event.date,
                        location: event.location,
                        description: event.description,
                        image: event.image || `${BASE_URL}/uploads/default.jpg`,
                    }));

                    dispatch(setEvents(mappedEvents));
                } else {
                    throw new Error('Les données reçues ne sont pas dans un format attendu');
                }
            } catch (error) {
                console.error("Erreur lors du chargement des événements :", error);
            }
        };

        fetchEvents();
    }, [dispatch]);

    return {};
};

export default UseEvents;
