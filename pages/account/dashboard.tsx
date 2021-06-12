import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout, EventList, NotFound } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';
import { API_URL } from '@/config/index';
import { Events } from '@/types/event';

const DashboardPage = ({ events, token }: { events: Events; token: string }) => {
  const { t } = useTranslation('common');

  return (
    <Layout title="My Dashboard - DJ Events">
      <h1 className="mb-10">{t('my')}</h1>
      {events && events.length !== 0 ? <EventList events={events} token={token} isDashboard /> : <NotFound />}
    </Layout>
  );
};

export default DashboardPage;

export const getServerSideProps = async ({ req, locale }) => {
  const { token } = parseCookies(req);
  const { data: events } = await axios.get(`${API_URL}/events/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return { props: { events, token, ...(await serverSideTranslations(locale, ['common'])) } };
};
