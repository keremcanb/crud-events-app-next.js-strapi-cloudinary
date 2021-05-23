import Link from 'next/link';
import { useRouter } from 'next/router';
import { get } from 'axios';
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

  return (
    <Layout>
      <h1>Filtered Events</h1>
      <EventList items={filteredEvents} />
    </Layout>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps() {
  const { data: events } = await get(`${API_URL}/events`);
  return { props: { events } };
}
