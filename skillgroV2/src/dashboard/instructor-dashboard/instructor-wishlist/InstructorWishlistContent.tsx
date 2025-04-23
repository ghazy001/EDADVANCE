import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:3000"; // Change this to your API URL

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [eventFormData, setEventFormData] = useState({
        id: '',
        title: '',
        date: '',
        location: '',
        description: '',
        category: '',
    });

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${BASE_URL}/event/getAll`);
            const result = await response.json();
            if (response.ok) {
                setEvents(result);
            } else {
                toast.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Error fetching events');
        }
    };

    useEffect(() => {
        if (activeTab === 0) {
            fetchEvents();
        }
    }, [activeTab]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleInputChange = (e) => {
        setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/event/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventFormData),
            });
            const result = await res.json();

            if (res.ok) {
                toast.success('Event added successfully');
                setEventFormData({
                    id: '',
                    title: '',
                    date: '',
                    location: '',
                    description: '',
                    category: '',
                });
                fetchEvents(); // Refresh the event list
            } else {
                toast.error('Failed to add event');
            }
        } catch (err) {
            toast.error('Error adding event');
            console.error('Error:', err);
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/event/delete/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Event deleted successfully');
                fetchEvents(); // Refresh the event list
            } else {
                toast.error('Failed to delete event');
            }
        } catch (error) {
            toast.error('Error deleting event');
            console.error('Error:', error);
        }
    };

    const handleUpdateEvent = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/event/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventFormData),
            });
            if (res.ok) {
                toast.success('Event updated successfully');
                fetchEvents(); // Refresh the event list
            } else {
                toast.error('Failed to update event');
            }
        } catch (err) {
            toast.error('Error updating event');
            console.error('Error:', err);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabClick(0)}>View Events</button>
                <button onClick={() => handleTabClick(1)}>Add Event</button>
            </div>

            {activeTab === 0 && (
                <div>
                    <h2>Events List</h2>
                    <div>
                        {events.map((event) => (
                            <div key={event.id}>
                                <h3>{event.title}</h3>
                                <p>{event.date} - {event.location}</p>
                                <p>{event.description}</p>
                                <button onClick={() => handleUpdateEvent(event.id)}>Update</button>
                                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 1 && (
                <div>
                    <h2>Add New Event</h2>
                    <form onSubmit={handleAddEvent}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={eventFormData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={eventFormData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={eventFormData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={eventFormData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={eventFormData.category}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Add Event</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EventManagement;
