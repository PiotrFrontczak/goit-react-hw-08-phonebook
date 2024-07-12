import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/slices/contactsSlice';
import ContactList from './ContactList';
import AddContactForm from './AddContactForm';
import styles from '../components/Contacts.module.scss';


const App = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.contacts);

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
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <AddContactForm />
      <ContactList />
    </div>
  );
};

export default App;