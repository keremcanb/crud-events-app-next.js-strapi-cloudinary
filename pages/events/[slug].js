import Link from 'next/link';
import Image from 'next/image';
import { get } from 'axios';
import { Layout } from '@/components/index';
import { API_URL } from '@/config/index';

const EventPage = ({ event: { name, date, time, image, performers, description, venue, address } }) => (
  <Layout title={`Event ${name}`}>
    <div className="relative">
      <span>
        {new Date(date).toLocaleDateString('tr-TR')} @ {time}
      </span>
      <h1>{name}</h1>
      {image && (
        <div className="mb-px-20">
          <Image src={image.formats.medium.url} width={640} height={480} />
        </div>
      )}
      <p className="my-px-10">{performers}</p>
      <h3>Description:</h3>
      <p>{description}</p>
      <h3>Venue: {venue}</h3>
      <p>{address}</p>
      <Link href="/events">
        <a className="block">{'<'}Go Back</a>
      </Link>
    </div>
  </Layout>
);

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  const { data: events } = await get(`${API_URL}/events?slug=${slug}`);
  return { props: { event: events[0] } };
}
