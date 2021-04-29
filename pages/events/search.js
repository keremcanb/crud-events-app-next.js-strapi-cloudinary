import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import qs from 'qs';
import { API_URL } from '@/config/index';

const SearchPage = ({ events, term }) => (
  <Layout title={`Search Results For: ${term}`}>
    <Link href="/events">
      <a className="btn-secondary">Go back</a>
    </Link>
    <h1>
      Search results for{' '}
      <u>
        <i>{term}</i>
      </u>
    </h1>
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

  const res = await fetch(`${API_URL}/events?${query}`);

  const events = await res.json();

  return {
    props: {
      events,
      term
    }
  };
}
