import { get } from 'axios';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';

const EventsPage = ({ events, page, total }) => (
  <Layout>
    <h1>Events</h1>
    {events && events.length === 0 && <h3>No events to show</h3>}
    {events && events.map((event) => <EventItem key={event.name} event={event} />)}
    <Pagination page={page} total={total} />
  </Layout>
);

export default EventsPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const { data: total } = await get(`${API_URL}/events/count`);
  const { data: events } = await get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  return {
    props: {
      page: +page,
      total,
      events
    }
  };
}

// const getTotal = await fetch(`${API_URL}/events/count`);
// const total = await getTotal.json();

// const getEvents = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
// const events = await getEvents.json();
