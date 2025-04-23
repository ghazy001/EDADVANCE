"use client";

import { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePicture: string | null;
    level: number;
}

const InstructorSettingProfile = ({ style }: { style?: any }) => {
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/user/current-user", {
                    method: "GET",
                    credentials: "include",
                });

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error("Server returned non-JSON response");
                }

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch user");
                }

                setUser(data);
                setName(data.name);
                setEmail(data.email);
            } catch (error: any) {
                setMessage({ type: "error", text: error.message || "Error fetching user data" });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`http://localhost:3000/user/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
                credentials: "include",
            });

            const contentType = response.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error("Server returned non-JSON response");
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setUser({
                ...user,
                name: data.updatedUser.name,
                email: data.updatedUser.email,
            });

            setMessage({ type: "success", text: "Profile updated successfully" });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Error updating profile" });
        } finally {
            setLoading(false);
        }
    };

    const handlePictureUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!user || !profilePicture) return;

        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("image", profilePicture);

        try {
            const response = await fetch(`http://localhost:3000/user/${user.id}/profile-picture`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            });

            const contentType = response.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error("Server returned non-JSON response");
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile picture");
            }

            setUser({ ...user, profilePicture: data.image });
            setProfilePicture(null);
            setPreview(null);
            setMessage({ type: "success", text: "Profile picture updated successfully" });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Error updating profile picture" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-lg-9">
            <div className="dashboard__content-wrap">
                <div className="dashboard__content-title">
                    <h4 className="title">Settings</h4>


                    {loading && <div className="alert alert-info">Loading...</div>}

                    {message && (
                        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {message.text}
                        </div>
                    )}

                    {user ? (
                        <form>
                            <div className="mb-4 d-flex align-items-center gap-4">
                                <img
                                    src={
                                        preview ||
                                        (user.profilePicture && user.profilePicture !== "default.jpg"
                                            ? `/uploads/${user.profilePicture}`
                                            : "/default.jpg")
                                    }
                                    alt="Profile"
                                    className="rounded-circle border"
                                    width={96}
                                    height={96}
                                    style={{ objectFit: "cover" }}
                                />

                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePictureChange}
                                        disabled={loading}
                                        className="form-control mb-2"
                                    />
                                    {profilePicture && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={handlePictureUpdate}
                                            disabled={loading}
                                        >
                                            Update Picture
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user.role}
                                    disabled
                                />
                            </div>

                            <button
                                className="btn btn-success"
                                onClick={handleProfileUpdate}
                                disabled={loading}
                            >
                                Update Profile
                            </button>
                        </form>
                    ) : (
                        !loading && <div className="alert alert-warning">No user data available.</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default InstructorSettingProfile;
