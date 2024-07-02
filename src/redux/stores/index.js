import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../slices/contacts.slice";
import filterReducer from "../slices/filters.slice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;
