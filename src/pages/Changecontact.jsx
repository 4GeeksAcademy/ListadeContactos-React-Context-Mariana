import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

const Changecontact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // ✅ asegúrate que esto exista
  const contact = store.contactToChange || {};

  const [name, setName] = useState(contact.name || "");
  const [address, setAddress] = useState(contact.address || "");
  const [phone, setPhone] = useState(contact.phone || "");
  const [email, setEmail] = useState(contact.email || "");

  // ✅ pon aquí TU SLUG REAL (ej: "agendaMariana" o "marianadavid")
  const AGENDA_SLUG = store.agendaSlug || "agendaMariana";
  const BASE_URL = store.baseURL || "https://playground.4geeks.com/contact";

  const putContacts = async (contact_id) => {
    const url = `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contact_id}`;

    const payload = { name, phone, email, address };

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // ✅ DEBUG: para ver por qué falla cuando falla
    const text = await response.text();
    console.log("PUT URL:", url);
    console.log("PUT STATUS:", response.status);
    console.log("PUT BODY:", text);

    return response.ok;
  };

  const onSave = async () => {
    if (!contact.id && contact.id !== 0) {
      alert("No encuentro el id del contacto a editar.");
      return;
    }

    const ok = await putContacts(contact.id);
    if (!ok) {
      alert("No se pudo guardar. Mira la consola (PUT STATUS / PUT BODY).");
      return;
    }

    // ✅ si tienes una acción para recargar contactos, úsala
    if (typeof store.loadContacts === "function") {
      await store.loadContacts();
    }
    // o si tienes dispatch actions:
    // dispatch({ type: "load_contacts" });

    navigate("/");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Change contact info</h1>

      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Edit name"
        value={name}
        className="form-control mb-3"
      />

      <label htmlFor="address">Address</label>
      <input
        id="address"
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="Edit address"
        value={address}
        className="form-control mb-3"
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        onChange={(e) => setPhone(e.target.value)}
        type="tel"
        placeholder="Edit phone"
        value={phone}
        className="form-control mb-3"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Edit email"
        value={email}
        className="form-control mb-4"
      />

      <button className="btn btn-primary text-white me-2" onClick={onSave}>
        Save contact
      </button>

      <Link to="/" className="btn btn-info">
        <i className="fa-solid fa-hand-point-left"></i> Back to contact list
      </Link>
    </div>
  );
};

export default Changecontact;
