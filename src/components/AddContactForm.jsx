import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/slices/contactsSlice';
import styles from './Contacts.module.scss';

const AddContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

    dispatch(addContact({ name, phone: number }));
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

export default AddContactForm;