import { get } from 'axios';
import qs from 'qs';
import { Layout, EventItem } from '@/components/index';
import { API_URL } from '@/config/index';

const SearchPage = ({ events, term }) => (
  <Layout title={`Search Results For: ${term}`}>
    <h1>Search results: {term}</h1>
    {events && events.length === 0 && <h3>No events to show</h3>}
    {events && events.map((event) => <EventItem key={event.name} event={event} />)}
  </Layout>
);

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  });
  const { data: events } = await get(`${API_URL}/events?${query}`);
  return { props: { events, term } };
}
