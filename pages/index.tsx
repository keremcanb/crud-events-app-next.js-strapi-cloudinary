import axios from 'axios';
import { Layout, EventList, Button, NotFound } from '@/components/index';
import { API_URL } from '@/config/index';

const Home = ({ events }) => (
  <Layout>
    <h1>Featured Events</h1>
    {events && events.length !== 0 ? <EventList items={events} /> : <NotFound />}
    {events && events.length > 0 && <Button text="View All Events" link="/events" />}
  </Layout>
);

export default Home;

export async function getStaticProps() {
  const { data: events } = await axios.get(`${API_URL}/events?_sort=date&featured=true`);
  return { props: { events }, revalidate: 1 };
}
