// src/store/contactsReducer.js

export const initialStore = () => ({
    contacts: []
});

export function contactsReducer(state, action) {
    switch (action.type) {
        case "SET_CONTACTS":
            return {
                ...state,
                contacts: action.payload
            };

        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };

        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter((c, i) => i !== action.payload)
            };

        case "EDIT_CONTACT":
            const updated = state.contacts.map((c, i) =>
                i === action.payload.index ? action.payload.newData : c
            );
            return { ...state, contacts: updated };

        default:
            return state;
    }
}
