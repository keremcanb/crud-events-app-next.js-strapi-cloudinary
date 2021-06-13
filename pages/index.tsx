import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout, EventList, BtnLink, NotFound, ArrowIcon } from '@/components/index';
import { IEventsIndex } from '@/types/types';
import { API_URL } from '@/config/index';

const Home = ({ eventsASC, eventsDESC }: IEventsIndex) => {
  const [events, setEvents] = useState(eventsDESC);
  const { t } = useTranslation('common');

  const sortHandler = (e) => {
    const { value } = e.target;
    if (value === 'newest') {
      setEvents(eventsDESC);
    }
    if (value === 'oldest') {
      setEvents(eventsASC);
    }
  };

  return (
    <Layout>
      <h1>{t('featured')}</h1>
      <div className="w-40 mt-10 mb-5 mx-auto relative">
        <select name="sort" id="sort" aria-label="Sort news" onChange={sortHandler}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <ArrowIcon />
      </div>
      {events && events.length !== 0 ? <EventList events={events} /> : <NotFound />}
      {events && events.length > 0 && <BtnLink color="blue" text={t('view-all')} link="/events" />}
    </Layout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }) => {
  const { data: eventsASC } = await axios.get(`${API_URL}/events?_sort=date:ASC&featured=true`);
  const { data: eventsDESC } = await axios.get(`${API_URL}/events?_sort=date:DESC&featured=true`);
  // const { data: events } = await axios.get(`${API_URL}/events?_sort=date&featured=true`);
  return { props: { eventsASC, eventsDESC, ...(await serverSideTranslations(locale, ['common'])) }, revalidate: 1 };
};
