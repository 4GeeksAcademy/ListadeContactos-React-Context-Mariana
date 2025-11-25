// src/store/appContext.jsx

import { createContext, useContext, useReducer } from "react";
import { contactsReducer, initialStore } from "./contactsReducer";

const API_BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "contactos_mariana";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [store, dispatch] = useReducer(contactsReducer, initialStore());

    // 🔹 Normaliza el contacto que viene de la API al formato que usa tu UI
    const normalizeContact = (apiContact) => ({
        id: apiContact.id,
        fullName: apiContact.full_name,
        email: apiContact.email,
        phone: apiContact.phone,
        address: apiContact.address
    });

    // 🔹 Asegura que exista la agenda contactos_mariana
    const ensureAgendaExists = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`);
            if (resp.ok) return; // ya existe

            // si no existe, la creamos
            await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`, {
                method: "POST"
            });
        } catch (err) {
            console.error("Error asegurando agenda:", err);
        }
    };

    // 🔹 Leer contactos de la API
    const loadContacts = async () => {
        try {
            await ensureAgendaExists();

            const resp = await fetch(
                `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`
            );

            if (!resp.ok) {
                console.error("Error cargando contactos:", resp.status);
                return;
            }

            const data = await resp.json();
            const normalized = data.map(normalizeContact);

            dispatch({ type: "SET_CONTACTS", payload: normalized });
        } catch (err) {
            console.error("Error en loadContacts:", err);
        }
    };

    // 🔹 Crear contacto (API + contexto)
    const addContact = async (formData) => {
        try {
            const resp = await fetch(
                `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        full_name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address
                    })
                }
            );

            if (!resp.ok) {
                console.error("Error creando contacto:", resp.status);
                return;
            }

            const data = await resp.json();
            const normalized = normalizeContact(data);

            dispatch({ type: "ADD_CONTACT", payload: normalized });
        } catch (err) {
            console.error("Error en addContact:", err);
        }
    };

    // 🔹 Actualizar contacto
    const updateContact = async (id, index, formData) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    agenda_slug: AGENDA_SLUG
                })
            });

            if (!resp.ok) {
                console.error("Error actualizando contacto:", resp.status);
                return;
            }

            const data = await resp.json();
            const normalized = normalizeContact(data);

            dispatch({
                type: "EDIT_CONTACT",
                payload: { index, newData: normalized }
            });
        } catch (err) {
            console.error("Error en updateContact:", err);
        }
    };

    // 🔹 Eliminar contacto
    const deleteContact = async (id, index) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/contacts/${id}`, {
                method: "DELETE"
            });

            if (!resp.ok) {
                console.error("Error eliminando contacto:", resp.status);
                return;
            }

            dispatch({ type: "DELETE_CONTACT", payload: index });
        } catch (err) {
            console.error("Error en deleteContact:", err);
        }
    };

    return (
        <AppContext.Provider
            value={{
                store,
                dispatch,
                actions: {
                    loadContacts,
                    addContact,
                    updateContact,
                    deleteContact
                }
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
