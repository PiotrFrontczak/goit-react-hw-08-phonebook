import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/slices/contactsSlice';
import styles from './Contacts.module.scss';

const AddContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={styles.input}
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Add Contact</button>
    </form>
  );
};

export default AddContactForm;
