import Link from 'next/link';
import { useRouter } from 'next/router';
import { get } from 'axios';
import Moment from 'react-moment';
import { Layout, EventList, Button } from '@/components/index';
import { API_URL } from '@/config/index';

const FilteredEventsPage = ({ events }) => {
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
      <>
        <div>
          <p>Invalid filter. Please adjust your values!</p>
        </div>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });
  // Faulty or does not exist check
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Layout>
        <h1>No events found for the chosen filter!</h1>
        <Link href="/events" passHref>
          <Button text="View All Events" />
        </Link>
      </Layout>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Layout title={`Events for ${numMonth}/${numYear}`}>
      <h1>
        Events in <Moment format="MMMM">{date}</Moment> {numYear}
      </h1>
      <EventList items={filteredEvents} />
    </Layout>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps() {
  const { data: events } = await get(`${API_URL}/events`);
  return { props: { events } };
}
