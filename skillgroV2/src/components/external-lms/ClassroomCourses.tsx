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
        return <div className="text-center mt-5">Loading courses...</div>;
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
                {(error.includes('log in') || error.includes('re-authenticate')) && (
                    <a className="btn btn-primary mt-3" href="http://localhost:3000/auth/google">Log in with Google</a>
                )}
            </div>
        );
    }

    return (
        <div>
            <HeaderOne />
            <div className="container mt-5">
                <h2 className="mb-4 text-center">Your Google Classroom Courses</h2>
                {courses.length === 0 ? (
                    <p className="text-muted text-center">No courses found.</p>
                ) : (
                    <div className="row">
                        {courses.map((course) => (
                            <div key={course.id} className="col-md-6 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h3 className="card-title">{course.name}</h3>
                                        <p className="card-text">
                                            <strong>Section:</strong> {course.section || 'N/A'}<br />
                                            <strong>Description:</strong> {course.description}<br />
                                            <strong>State:</strong> {course.state}
                                        </p>

                                        {course.recommendations && course.recommendations.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="card-subtitle mb-2 text-muted">You might also like</h5>
                                                <div className="row">
                                                    {course.recommendations.map((recommendation, index) => (
                                                        <div key={index} className="col-6 mb-3">
                                                            <div className="embed-responsive embed-responsive-16by9 mb-2">
                                                                <iframe
                                                                    className="embed-responsive-item"
                                                                    width="100%"
                                                                    height="150"
                                                                    src={recommendation.embedUrl}
                                                                    title={recommendation.title}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                ></iframe>
                                                            </div>
                                                            <p className="small text-center">{recommendation.title}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
