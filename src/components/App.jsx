import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addContact, deleteContact } from '../redux/slices/contacts.slice';
import { setFilter } from '../redux/slices/filters.slice';
import styles from "./Contacts.module.scss";

const AddContactForm = ({ contacts }) => {
  const dispatch = useDispatch();
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

const ContactList = ({ contacts, filter }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find contact"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <li key={contact.id} className={styles.listItem}>
              {contact.name} - {contact.number}
              <button onClick={() => dispatch(deleteContact(contact.id))} className={styles.deleteButton}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
};

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phone Book</h1>
      <AddContactForm contacts={contacts} />
      <ContactList contacts={contacts} filter={filter} />
    </div>
  );
};

export default App;
