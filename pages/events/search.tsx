import axios from 'axios';
import { Layout, EventList, NotFound } from '@/components/index';
import { API_URL } from '@/config/index';

const SearchPage = ({ events, term }: { events?: [], term?: string }) => (
  <Layout title={`Search Results for: ${term} - DJ Events`}>
    <h1>Search results: {term}</h1>
    {events && events.length !== 0 ? <EventList items={events} /> : <NotFound />}
  </Layout>
);

export default SearchPage;

export async function getServerSideProps({ query: { term } }: { query: { term?: string } }) {
  const qs = require('qs')
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
  const { data: events } = await axios.get(`${API_URL}/events?${query}`);
  return { props: { events, term } };
}
