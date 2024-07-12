import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../redux/slices/contactsSlice';
import ContactList from './ContactList';
import AddContactForm from './AddContactForm';
import styles from '../components/Contacts.module.scss';
import PropTypes from 'prop-types';


const AddContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      alert("Contact with this name already exists.");
      return;
    }

    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[A-Za-z]+(\s[A-Za-z]+){0,2}$"
        required
        value={name}
        onChange={handleChange}
        className={styles.input}
      />
      <label>Phone number</label>
      <input
        type="tel"
        name="number"
        pattern="^\d{9}$"
        required
        value={number}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

AddContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

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