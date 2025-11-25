// src/views/EditContact.jsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../store/appContext";

export default function EditContact() {
    const { id } = useParams(); // este "id" es el index del array
    const navigate = useNavigate();
    const { store, actions } = useAppContext();

    const index = Number(id);
    const contact = store.contacts[index];

    const [form, setForm] = useState(
        contact || {
            fullName: "",
            email: "",
            phone: "",
            address: ""
        }
    );

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contact || !contact.id) {
            console.error("No hay contacto o falta id para actualizar");
            return;
        }

        await actions.updateContact(contact.id, index, form);
        navigate("/");
    };

    if (!contact) {
        return (
            <div className="container mt-4">
                <p>Loading contact...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Edit Contact</h2>

            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    className="form-control mb-3"
                    name="fullName"
                    defaultValue={contact.fullName}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    name="email"
                    defaultValue={contact.email}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    name="phone"
                    defaultValue={contact.phone}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    name="address"
                    defaultValue={contact.address}
                    onChange={handleChange}
                />

                <button className="btn btn-success">Update</button>
            </form>
        </div>
    );
}
