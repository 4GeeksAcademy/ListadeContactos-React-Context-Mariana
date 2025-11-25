// src/components/ContactCard.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../store/appContext";

export default function ContactCard({ contact, index }) {
    const { actions } = useAppContext();

    const handleDelete = async () => {
        if (!contact.id) {
            console.error("Contacto sin id, no se puede borrar en la API");
            return;
        }
        await actions.deleteContact(contact.id, index);
    };

    return (
        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <h5>{contact.fullName}</h5>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.address}</p>
                </div>

                <div className="d-flex flex-column">
                    <Link
                        to={`/edit/${index}`}
                        className="btn btn-warning mb-2"
                    >
                        Edit
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
