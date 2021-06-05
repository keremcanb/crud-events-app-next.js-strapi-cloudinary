import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import qs from 'qs';
import { Layout, EventList, NotFound } from '@/components/index';
import { API_URL } from '@/config/index';

const SearchPage = ({ events, term }: { events?: []; term?: string }) => (
  <Layout title={`Search Results for: ${term} - DJ Events`}>
    <h1>Search results: {term}</h1>
    {events && events.length !== 0 ? <EventList items={events} /> : <NotFound />}
  </Layout>
);

export default SearchPage;

// Destructure term from query
export const getServerSideProps = async ({
  query: { term },
  locale
}: {
  query: { term?: string };
  locale?: string;
}) => {
  // Search for multiple fields with qs and Strapi contains filter
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
  // Query from qs
  const { data: events } = await axios.get(`${API_URL}/events?${query}`);
  return { props: { events, term, ...(await serverSideTranslations(locale, ['common'])) } };
};
