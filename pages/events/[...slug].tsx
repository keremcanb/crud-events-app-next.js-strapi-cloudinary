import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import Moment from 'react-moment';
import { Layout, EventList, Button, NotFound } from '@/components/index';
import { API_URL } from '@/config/index';

const FilteredEventsPage = ({ events }: { events?: [] }) => {
  const router = useRouter();
  // Get year and month from url array
  const filteredYear = router.query.slug[0];
  const filteredMonth = router.query.slug[1];
  // Convert string to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  // Wrong values entered in url check
  if (
    Number.isNaN(numYear) ||
    Number.isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className="mt-5">
        <h1>Invalid filter. Please adjust your values!</h1>
        <div className="center">
          <Button color="blue" link="/events" text="Go Back" />
        </div>
      </div>
    );
  }
  // Filtered events
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });
  // Faulty or does not exist check
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Layout>
        <NotFound />
        <Button color="blue" text="View All Events" link="/events" />
      </Layout>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Layout title={`Events for ${numMonth}/${numYear} - DJ Events`}>
      <h1>
        Events in <Moment format="MMMM">{date}</Moment> {numYear}
      </h1>
      <EventList items={filteredEvents} />
    </Layout>
  );
};

export default FilteredEventsPage;

export const getServerSideProps = async ({ locale }) => {
  const { data: events } = await axios.get(`${API_URL}/events`);
  return { props: { events, ...(await serverSideTranslations(locale, ['common'])) } };
};
