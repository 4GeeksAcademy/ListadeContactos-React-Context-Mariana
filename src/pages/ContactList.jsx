// src/views/ContactList.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/appContext";
import ContactCard from "../components/ContactCard";

export default function ContactList() {
    const { store, actions } = useAppContext();

    useEffect(() => {
        actions.loadContacts();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Contact List</h2>
                <Link to="/add" className="btn btn-primary">
                    Add Contact
                </Link>
            </div>

            <div className="mt-4">
                {store.contacts.length === 0 ? (
                    <p>No contacts yet.</p>
                ) : (
                    store.contacts.map((contact, index) => (
                        <ContactCard
                            key={contact.id || index}
                            index={index}
                            contact={contact}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
