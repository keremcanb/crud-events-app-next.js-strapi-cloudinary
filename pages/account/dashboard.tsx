import axios from 'axios';
import { Layout, EventList, NotFound } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';
import { API_URL } from '@/config/index';

const DashboardPage = ({ events, token }: { events?: []; token?: string }) => (
  <Layout title="User Dashboard - DJ Events">
    <h1>My Events</h1>
    {events && events.length !== 0 ? <EventList items={events} token={token} dashboard /> : <NotFound />}
  </Layout>
);

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const { data: events } = await axios.get(`${API_URL}/events/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return { props: { events, token } };
}
