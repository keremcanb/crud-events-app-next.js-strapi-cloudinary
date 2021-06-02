import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout, EventList, Button, NotFound } from '@/components/index';
import { API_URL } from '@/config/index';

const Home = ({ events }: { events: [] }) => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <h1>{t('h1')}</h1>
      {events && events.length !== 0 ? <EventList items={events} /> : <NotFound />}
      {events && events.length > 0 && <Button color="blue" text="View All Events" link="/events" />}
    </Layout>
  );
};

export default Home;

export async function getStaticProps({ locale }) {
  const { data: events } = await axios.get(`${API_URL}/events?_sort=date&featured=true`);
  return { props: { events, ...(await serverSideTranslations(locale, ['common'])) }, revalidate: 1 };
}
