import { GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT } from "../actions/types";

const initialState = {
  contacts: [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      phone: "555-555-5555",
    },
    {
      id: 2,
      name: "Karen Williams",
      email: "karen@gmail.com",
      phone: "444-444-4444",
    },
    {
      id: 3,
      name: "Henry Johnson",
      email: "henry@gmail.com",
      phone: "333-333-333",
    },
  ],
};

function contactReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return { ...state };
    case DELETE_CONTACT:
      const id = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== id),
      };
    case ADD_CONTACT:
      return { ...state, contacts: [action.payload, ...state.contacts] };
    default:
      return state;
  }
}

export default contactReducer;
