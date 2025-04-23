import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/features/courseSlice';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:3000'; // Ajuste l'URL en fonction de ton backend

const UseCourses = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state: any) => state.courses.courses); // Accède à l'état Redux pour vérifier si les cours sont déjà chargés

    useEffect(() => {
        const fetchCourses = async () => {
            // Si les cours sont déjà dans le store, ne fais pas de requête
            if (courses.length > 0) {
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/course/getAll`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des cours');
                }
                const data = await response.json();

                const mappedCourses = data.map((course: any) => ({
                    id: course._id,
                    title: course.title,
                    price: course.price,
                    desc: course.description,
                    category: course.category,
                    instructors: course.instructors,
                    rating: course.rating,
                    thumb: course.thumb || `${BASE_URL}/uploads/default.jpg`,
                    skill_level: course.skill_level,
                    price_type: course.price_type,
                    language: course.language,
                    popular: course.popular,
                }));

                dispatch(setCourses(mappedCourses));
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Une erreur est survenue lors de la récupération des cours');
            }
        };

        fetchCourses();
    }, [dispatch, courses.length]); // Ajouter `courses.length` dans les dépendances pour éviter les appels redondants

    return {};
};

export default UseCourses;
