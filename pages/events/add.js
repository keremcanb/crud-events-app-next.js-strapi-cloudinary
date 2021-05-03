import { useState } from 'react';
import { post } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Form.module.css';
import { parseCookies } from '@/helpers/helpers';

const AddEventPage = ({ token }) => {
  const router = useRouter();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((element) => element === '');
    if (hasEmptyFields) {
      toast.error('Fill in all fields');
      return;
    }

    try {
      const { data } = await post(`${API_URL}/events`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${data.slug}`);
    } catch (err) {
      if ([403, 401].includes(err.response.status)) {
        toast.error(`You must login before adding events.`);
      } else {
        toast.error(err.response.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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
            <input type="text" name="name" value={name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" value={performers} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" value={venue} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" value={date} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" value={time} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" name="description" value={description} onChange={handleChange} />
        </div>
        <input type="submit" value="Add Event" className="btn-secondary" />
      </form>
    </Layout>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return { props: { token } };
}

// const res = await fetch(`${API_URL}/events`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   },
//   body: JSON.stringify(values)
// });
// const event = await res.json();

// if (res.ok) {
//   router.push(`/events/${event.slug}`);
// } else if (res.status === 403 || res.status === 401) {
//   toast.error('You must login before adding events.');
// } else {
//   toast.error(event.message);
// }
