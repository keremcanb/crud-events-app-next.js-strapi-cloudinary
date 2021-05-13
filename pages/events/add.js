import { useState, useContext } from 'react';
import Link from 'next/link';
import EventsContext from '@/context/EventsContext';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';

import styles from '@/styles/Form.module.css';

const AddEventPage = ({ token }) => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });
  const { name, performers, venue, address, date, time, description } = values;
  const { addEvent } = useContext(EventsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(values).some((element) => element === '');
    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }
    addEvent(values, token);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a className="btn-secondary">Go back</a>
      </Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" value={name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" value={performers} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" value={venue} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" value={time} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" id="description" value={description} onChange={handleChange} />
        </div>
        <input type="submit" value="Add Event" className="btn-secondary" />
      </form>
    </Layout>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  // Get token
  const { token } = parseCookies(req);
  return { props: { token } };
}
