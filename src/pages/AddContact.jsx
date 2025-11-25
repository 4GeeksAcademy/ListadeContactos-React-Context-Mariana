// src/views/AddContact.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/appContext";

export default function AddContact() {
    const navigate = useNavigate();
    const { actions } = useAppContext();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.addContact(form);
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>Add Contact</h2>

            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    className="form-control mb-3"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success">Save</button>
            </form>
        </div>
    );
}
