import { get } from 'axios';
import { Layout, EventList, Button } from '@/components/index';
import { API_URL } from '@/config/index';

const Home = ({ events }) => (
  <Layout>
    <h1>Upcoming Events</h1>
    {events && events.length !== 0 ? <EventList items={events} /> : <h3>No events to show</h3>}
    {events && events.length > 0 && <Button text="View All Events" link="/events" />}
  </Layout>
);

export default Home;

export async function getStaticProps() {
  const { data: events } = await get(`${API_URL}/events?_sort=date:ASC&_limit=2`);
  return { props: { events }, revalidate: 1 };
}
