import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout, EventList, Pagination, Filter, NotFound } from '@/components/index';
import { API_URL, PER_PAGE } from '@/config/index';

const EventsPage = ({ events, page, total }: { events?: [], page?: number, total?: number }) => {
  const router = useRouter();

  const handleFilter = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <Layout title="All Events - DJ Events">
      <h1>All Events</h1>
      <Filter onSearch={handleFilter} />
      {events && events.length !== 0 ? <EventList items={events} /> : <NotFound />}
      <Pagination page={page} total={total} />
    </Layout>
  );
};

export default EventsPage;

// Get page from query and set to 1
export async function getServerSideProps({ query: { page = 1 } }: {
  query: { page?: number }
}) {
  // Calculate start page: Convert string to number (+page), if page equal to 1 start from event 0, else get current page number, subtract 1 and multiply with per page number.
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const { data: total } = await axios.get(`${API_URL}/events/count`);
  const { data: events } = await axios.get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  return { props: { page: +page, total, events } };
}
