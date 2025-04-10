import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCourses } from '../redux/features/courseSlice';

const BASE_URL = 'http://localhost:3000'; // Adjust to your backend URL

const UseCourses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BASE_URL}/course/getAll`);
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
            }
        };
        fetchCourses();
    }, [dispatch]);

    return {};
};

export default UseCourses;