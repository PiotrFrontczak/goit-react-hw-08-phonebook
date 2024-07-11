import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts.slice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer
  }
});

export default store;
