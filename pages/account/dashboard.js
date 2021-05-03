import axios from 'axios';
import { parseCookies } from '@/helpers/helpers';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure')) {
      try {
        await axios.delete(`${API_URL}/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        router.reload();
      } catch (err) {
        toast.error(err.response.message);
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard Page</h1>
        <h3>My Events</h3>
        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const { data: events } = await axios.get(`${API_URL}/events/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return { props: { events, token } };
}

// const res = await fetch(`${API_URL}/events/${eventId}`, {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   }
// });
// const data = await res.json();

// if (!res.ok) {
//   toast.error(data.message);
// } else {
//   router.reload();
// }

// const res = await fetch(`${API_URL}/events/me`, {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
// const events = await res.json();
