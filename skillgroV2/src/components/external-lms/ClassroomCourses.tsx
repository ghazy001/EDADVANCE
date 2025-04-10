import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import HeaderOne from "../../layouts/headers/HeaderOne.tsx";
import FooterOne from "../../layouts/footers/FooterOne.tsx";
import "./assets/ClassroomCourses.css";

interface Recommendation {
    videoId: string;
    title: string;
    embedUrl: string;
}

interface Course {
    id: string;
    name: string;
    section?: string;
    description: string;
    state: string;
    recommendations: Recommendation[];
}

interface CourseResponse {
    status: string;
    message: string;
    courses: Course[];
}

const ClassroomCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = async (): Promise<void> => {
        try {
            const response: AxiosResponse<CourseResponse> = await axios.get(
                'http://localhost:3000/course/classroom/courses',
                { withCredentials: true }
            );

            if (response.data.status === 'SUCCESS') {
                setCourses(response.data.courses);
            } else {
                setError(response.data.message || 'Failed to fetch courses');
            }
        } catch (err) {
            const error = err as AxiosError;
            console.error('Error fetching courses:', error);
            if (error.response?.status === 401) {
                setError('Not authenticated. Please log in with Google.');
            } else if (error.response?.status === 403) {
                setError('No Google access token found. Please re-authenticate with Google.');
            } else {
                setError('Error fetching courses. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                {error.includes('log in') || error.includes('re-authenticate') ? (
                    <a href="http://localhost:3000/auth/google" className="login-link">Log in with Google</a>
                ) : null}
            </div>
        );
    }

    return (
        <div className="classroom-page">
            <HeaderOne />
            <div className="courses-container">
                <h2 className="title">Your Google Classroom Courses</h2>
                {courses.length === 0 ? (
                    <p className="no-courses">No courses found.</p>
                ) : (
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <h3 className="course-name">{course.name}</h3>
                                <p className="course-section"><strong>Section:</strong> {course.section || 'N/A'}</p>
                                <p className="course-description"><strong>Description:</strong> {course.description}</p>
                                <p className={`course-state ${course.state === 'ACTIVE' ? 'active' : 'inactive'}`}>
                                    {course.state}
                                </p>

                                {/* Recommended Course Section */}
                                {course.recommendations && course.recommendations.length > 0 && (
                                    <div className="recommended-section">
                                        <h4>You might also like</h4>
                                        <div className="recommended-items">
                                            {course.recommendations.map((recommendation, index) => (
                                                <div key={index} className="recommended-item">
                                                    <iframe
                                                        width="200"
                                                        height="150"
                                                        src={recommendation.embedUrl}
                                                        title={recommendation.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                    <p className="recommended-title">{recommendation.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FooterOne />
        </div>
    );
};

export default ClassroomCourses;