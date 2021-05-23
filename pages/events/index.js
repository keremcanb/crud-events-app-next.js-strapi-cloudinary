import { get } from 'axios';
import { useRouter } from 'next/router';
import { Layout, EventList, Pagination, Filter } from '@/components/index';
import { API_URL, PER_PAGE } from '@/config/index';

const EventsPage = ({ events, page, total }) => {
  const router = useRouter();

  return (
    <Layout title="All Events">
      <h1>Events</h1>
      <Filter
        onSearch={(year, month) => {
          router.push(`/events/${year}/${month}`);
        }}
      />
      {events && events.length !== 0 ? <EventList items={events} /> : <h3>No events to show</h3>}
      <Pagination page={page} total={total} />
    </Layout>
  );
};

export default EventsPage;

// Get page from query and set to 1
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page: Convert string to number (+page), if page equal to 1 start from event 0, else get current page number, subtract 1 and multiply with per page number.
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const { data: total } = await get(`${API_URL}/events/count`);
  const { data: events } = await get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  return { props: { page: +page, total, events } };
}
