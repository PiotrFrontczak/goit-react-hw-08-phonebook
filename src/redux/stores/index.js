import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../redux/slices/contacts.slice";
import filterReducer from "../redux/slices/filter.slice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;
