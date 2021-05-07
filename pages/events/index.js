import { get } from 'axios';
import { Layout, EventItem, Pagination } from '@/components/index';
import { API_URL, PER_PAGE } from '@/config/index';

const EventsPage = ({ events, page, total }) => (
  <Layout>
    <h1>Events</h1>
    {events && events.length === 0 && <h3>No events to show</h3>}
    {events && events.map((event) => <EventItem key={event.name} event={event} />)}
    <Pagination page={page} total={total} />
  </Layout>
);

export default EventsPage;
// Get page from quey and set to 1
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page: Convert string to number (+page), if page equal to 1 start from event 0, else get current page number, subtract 1 and multiply with per page number.
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  // Fetch total count
  const { data: total } = await get(`${API_URL}/events/count`);
  // Fetch events
  const { data: events } = await get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  return { props: { page: +page, total, events } };
}
