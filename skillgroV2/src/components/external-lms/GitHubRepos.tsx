    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import HeaderOne from "../../layouts/headers/HeaderOne.tsx";
    import FooterOne from "../../layouts/footers/FooterOne.tsx";
    import "./assets/GitHubRepos.css";
    import {Link} from "react-router-dom";

    interface Repo {
        name: string;
        language: string | null;
    }

    interface Course {
        _id: string;
        title: string;
        programmingLanguage: string;
        description: string;
        rating: number;
        skill_level: string;
    }

    interface CoursesByRepo {
        [key: string]: Course[];
    }

    const GitHubRepos: React.FC = () => {
        const [repos, setRepos] = useState<Repo[]>([]);
        const [coursesByRepo, setCoursesByRepo] = useState<CoursesByRepo>({});
        const [error, setError] = useState<string | null>(null);
        const [githubToken, setGithubToken] = useState<string | null>(null);
        const [tokenInput, setTokenInput] = useState<string>("");

        // Fetch repos and courses once the token is provided
        useEffect(() => {
            if (githubToken) {
                fetchReposAndCourses();
            }
        }, [githubToken]);

        const fetchReposAndCourses = async () => {
            try {
                const repoResponse = await axios.get<{ status: string; data: Repo[] }>(
                    "http://localhost:3000/github/repos",
                    {
                        withCredentials: true,
                        headers: { "github-token": githubToken }, // Pass token in headers
                    }
                );
                const fetchedRepos = repoResponse.data.data;
                setRepos(fetchedRepos);

                const coursePromises = fetchedRepos.map((repo) =>
                    axios.get<{ status: string; data: Course[] }>(
                        `http://localhost:3000/github/courses-by-repo-language/${repo.name}`,
                        {
                            withCredentials: true,
                            headers: { "github-token": githubToken }, // Pass token in headers
                        }
                    )
                );

                const courseResponses = await Promise.all(coursePromises);
                const coursesData: CoursesByRepo = {};
                fetchedRepos.forEach((repo, index) => {
                    coursesData[repo.name] = courseResponses[index].data.data;
                });
                setCoursesByRepo(coursesData);
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch repositories or courses. Please check your GitHub token."
                );
            }
        };

        const handleTokenSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (tokenInput.trim()) {
                setGithubToken(tokenInput.trim());
                setError(null); // Clear any previous errors
            } else {
                setError("Please enter a valid GitHub token.");
            }
        };

        const getPersonalizedMessage = (language: string | null): string => {
            if (!language) {
                return "This repository doesn’t have a specified language, but here are some general courses:";
            }
            return `Because you are working with ${language}, here are the courses related to ${language}:`;
        };

        if (!githubToken) {
            return (
                <>
                    <HeaderOne />
                    <div className="container" style={{ padding: "20px" }}>
                        <h1 className="section-title">Enter Your GitHub Token</h1>
                        <p>Please provide your GitHub Personal Access Token to fetch your repositories and related courses.</p>
                        <form onSubmit={handleTokenSubmit}>
                            <input
                                type="text"
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                                placeholder="Enter your GitHub token"
                                    className="form-control "
                            />
                            <button type="submit" style={{ padding: "10px 20px" }} className="btn mt-3">
                                Submit
                            </button>




                            {/* Tutorial Section */}
                            <div className="token-tutorial mt-5" style={{ marginBottom: "20px" }}>
                                <h3>How to Get Your GitHub Personal Access Token</h3>
                                <ol style={{ lineHeight: "1.6" }}>
                                    <li>Log in to your GitHub account.</li>
                                    <li>
                                        Click your profile picture in the top-right corner and select{" "}
                                        <strong>
                                            <a href="https://github.com/settings/profile" target="_blank" rel="noopener noreferrer">
                                                Settings
                                            </a>
                                        </strong>.
                                    </li>
                                    <li>
                                        In the left sidebar, scroll down and click{" "}
                                        <strong>
                                            <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer">
                                                Developer settings
                                            </a>
                                        </strong>.
                                    </li>
                                    <li>
                                        Click{" "}
                                        <strong>
                                            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                                                Personal access tokens
                                            </a>
                                        </strong>, then select <strong>Tokens (classic)</strong>.
                                    </li>
                                    <li>Click <strong>Generate new token</strong> (or <strong>Generate new token (classic)</strong>).</li>
                                    <li>
                                        Give your token a name (e.g., "Repo Fetcher"), set an expiration (optional), and select the <strong>repo</strong> scope to access your repositories.
                                    </li>
                                    <li>Click <strong>Generate token</strong>, then copy the token (it starts with <code>ghp_</code>) and paste it below.</li>
                                </ol>
                                <p style={{ color: "#555" }}>
                                    <strong>Note:</strong> Keep your token safe! Don’t share it publicly, as it grants access to your GitHub account.
                                </p>

                            </div>


                            {/* Embedded YouTube Video */}
                            <div className="youtube-tutorial mt-5" style={{ marginTop: "20px", textAlign: "center" }}>
                                <h4>Watch the Tutorial Video</h4>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/J-CSiw5CFWE"
                                    title="GitHub Personal Access Token Tutorial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>








                        </form>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                    </div>
                    <FooterOne />
                </>
            );
        }

        if (error) return <div>{error}</div>;

        return (
            <>
                <HeaderOne />
                <div className="container" style={{ padding: "20px" }}>
                    <h1 className="section-title">My GitHub Repositories</h1>
                    {repos.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="repo-cards">
                            {repos.map((repo, index) => (
                                <div key={index} className="repo-card full-width">
                                    <div className="card-content">
                                        <div className="repo-info">
                                            <img
                                                src="https://github.com/favicon.ico"
                                                alt={repo.name}
                                                className="repo-image"
                                            />
                                            <h5 className="repo-name">{repo.name}</h5>
                                            <p className="repo-language">Language: {repo.language || "Not specified"}</p>
                                            {coursesByRepo[repo.name] !== undefined ? (
                                                <div>
                                                    <p className="personalized-message">{getPersonalizedMessage(repo.language)}</p>
                                                    {coursesByRepo[repo.name].length > 0 ? (
                                                        <ul className="course-list">
                                                            {coursesByRepo[repo.name].map((course, idx) => (
                                                                <li key={idx} className="course-item">

                                                                    <Link to={`/course-details/${course._id}`} className="course-link">
                                                                        <h6>{course.title}</h6>
                                                                    </Link>
                                                                    <p className="course-lang">{course.programmingLanguage}</p>
                                                                    <p className="course-description">{course.description}</p>
                                                                    <div className="course-footer">
                                                                        <span className="rating">Rating: {course.rating}</span>
                                                                        <span>
                                                                            {course.skill_level}
                                                                     </span>
                                                                    </div>


                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="no-courses-message">No courses found for {repo.language}.</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="loading-courses">Loading courses...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <FooterOne />
            </>
        );
    };

    export default GitHubRepos;