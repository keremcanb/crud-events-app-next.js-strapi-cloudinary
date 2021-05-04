import Link from 'next/link';
import { get } from 'axios';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

const Home = ({ events }) => (
  <Layout>
    <center>
      <h1>Upcoming Events</h1>
    </center>
    {events && events.length === 0 && <h3>No events to show</h3>}
    {events && events.map((event) => <EventItem key={event.name} event={event} />)}
    {events && events.length > 0 && (
      <Link href="/events">
        <center>
          <a className="btn-secondary">View All Events</a>
        </center>
      </Link>
    )}
  </Layout>
);

export default Home;

export async function getStaticProps() {
  // Sort and limit from Strapi
  const { data: events } = await get(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  return { props: { events }, revalidate: 10 };
}

// const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
// const events = await res.json();
