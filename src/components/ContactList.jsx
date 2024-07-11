import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../redux/slices/contactsSlice';
import styles from './Contacts.module.scss';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, status, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.listItem}>
          <span>{contact.name}: {contact.phone}</span>
          <button onClick={() => dispatch(deleteContact(contact.id))} className={styles.deleteButton}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
