import { useContext } from 'react';
import axios from 'axios';
import EventsContext from '@/context/EventsContext';
import { Layout, DashboardEvent } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';
import { API_URL } from '@/config/index';

export default function DashboardPage({ events, token }) {
  const { deleteEvent } = useContext(EventsContext);

  return token ? (
    <Layout title="User Dashboard">
      <div>
        <h1>My Events</h1>
        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} handleDelete={deleteEvent} token={token} />
        ))}
      </div>
    </Layout>
  ) : (
    <h1>Not authorized to view this page</h1>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const { data: events } = await axios.get(`${API_URL}/events/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return { props: { events, token } };
}
