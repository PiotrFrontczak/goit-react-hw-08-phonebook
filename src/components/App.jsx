import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../redux/slices/contactsSlice';
import ContactList from './ContactList';
import AddContactForm from './AddContactForm';

const App = () => {
  const dispatch = useDispatch();
  const { contacts, status, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Contacts state in App:', contacts);
  }, [contacts]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(contacts)) {
    console.error('Contacts is not an array:', contacts);
    return <div>Error: Contacts is not an array</div>;
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <AddContactForm />
      <ul>
        {contacts.filter(contact => contact).map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.phone}
            <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
