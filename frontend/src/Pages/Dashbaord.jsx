import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: "", price: "" });
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventPrice, setEventPrice] = useState(null);

    const navigate = useNavigate();
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const { data } = await axios.get("https://momentous-backend.onrender.com/api/v1/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                setUser(data.user);
                setUpdatedUser({ name: data.user.name, password: "" });

                fetchEvents();
            } catch (err) {
                console.error("Failed to fetch user data:", err.response?.data || err.message);
                setError("Failed to fetch user data");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("https://momentous-backend.onrender.com/api/v1/event/all");
            setEvents(data.events || data);
        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError("Failed to load events");
        }
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            await axios.put(
                "https://momentous-backend.onrender.com/api/v1/auth/update",
                updatedUser,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            alert("Profile updated successfully!");
            setUser((prev) => ({ ...prev, name: updatedUser.name }));
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            await axios.post("https://momentous-backend.onrender.com/api/v1/auth/logout", {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/");
        } catch (err) {
            console.error("Logout failed!", err);
            setError("Logout failed!");
        }
    };

    const handleEventChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://momentous-backend.onrender.com/api/v1/event/create", newEvent, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            fetchEvents();
            setNewEvent({ name: "", price: "" });
        } catch (err) {
            console.error("Failed to create event:", err);
            setError("Failed to create event");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://momentous-backend.onrender.com/api/v1/event/delete/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            fetchEvents();
        } catch (err) {
            console.error("Failed to delete event:", err);
            setError("Failed to delete event");
        }
    };

    const handleSelectEvent = (e) => {
        const eventId = e.target.value;
        setSelectedEvent(eventId);
        const event = events.find((ev) => ev._id === eventId);
        setEventPrice(event ? event.price : null);
    };

    const handleBookEvent = () => {
        navigate(`/payment?eventId=${selectedEvent}`);
    };

    return (
        <div className="dashboard-container">
            {user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="dashboard-content">
                        <div className="profile-section">
                            <h3>Update Profile</h3>
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={handleChange}
                                    placeholder="Update Name"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={updatedUser.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                />
                                <button type="submit">Update</button>
                            </form>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>

                        {userRole === "admin" && (
                            <div className="events-section">
                                <h3>Event Management</h3>
                                <form onSubmit={handleCreateEvent}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newEvent.name}
                                        onChange={handleEventChange}
                                        placeholder="Event Name"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={newEvent.price}
                                        onChange={handleEventChange}
                                        placeholder="Event Price"
                                        required
                                    />
                                    <button type="submit">Create Event</button>
                                </form>

                                <h3>Existing Events</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((event) => (
                                            <tr key={event._id}>
                                                <td>{event.name}</td>
                                                <td>${event.price}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {userRole === "user" && (
                            <div className="book-event-section event-booking">
                                <h3>Book an Event</h3>
                                <select onChange={handleSelectEvent} value={selectedEvent} className="event-dropdown">
                                    <option value="">Select an Event</option>
                                    {events.map((event) => (
                                        <option key={event._id} value={event._id}>
                                            {event.name}
                                        </option>
                                    ))}
                                </select>
                                {eventPrice !== null && (
                                    <div className="event-price">
                                        <p>Price: ${eventPrice}</p>
                                        <button className="book-now-btn">Book Now</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
