import { useState } from 'react';

const BASE_URL = 'http://localhost:3000';

const AddCourseForm = () => {
    const [formData, setFormData] = useState({
        title: '', price: '', description: '', category: '', instructors: '', skill_level: '', price_type: '', language: '', popular: ''
    });
    const [thumb, setThumb] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setThumb(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (thumb) data.append('thumb', thumb);

        try {
            const response = await fetch(`${BASE_URL}/course/add`, {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <input type="text" name="instructors" placeholder="Instructors" onChange={handleChange} required />
            <input type="text" name="skill_level" placeholder="Skill Level" onChange={handleChange} required />
            <input type="text" name="price_type" placeholder="Price Type" onChange={handleChange} required />
            <input type="text" name="language" placeholder="Language" onChange={handleChange} required />
            <input type="text" name="popular" placeholder="Popular (optional)" onChange={handleChange} />
            <input type="file" name="thumb" onChange={handleFileChange} accept="image/*" />
            <button type="submit">Add Course</button>
        </form>
    );
};

export default AddCourseForm;