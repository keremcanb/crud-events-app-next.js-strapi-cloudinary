import Link from 'next/link';
import Image from 'next/image';
import { get } from 'axios';
import { Layout } from '@/components/index';
import { API_URL } from '@/config/index';

const EventPage = ({ event: { name, date, time, image, performers, description, venue, address } }) => (
  <Layout title={`Event ${name}`}>
    <div className="grid grid-rows justify-center items-center gap-4 my-5">
      <h1>{name}</h1>
      <div className="text-center mb-3">
        <h2>
          Featuring {performers} @ {new Date(date).toLocaleDateString('tr-TR')} {time}
        </h2>
      </div>
      {image && (
        <div>
          <Image src={image.formats.medium.url} width={800} height={600} />
        </div>
      )}
      <div className="grid grid-rows md:grid-cols-2 justify-center items-center gap-4 my-5">
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
        <div>
          <h3>Venue: {venue}</h3>
          <p>{address}</p>
        </div>
      </div>
      <Link href="/events">
        <a className="block text-center">{'<'}Go Back</a>
      </Link>
    </div>
  </Layout>
);

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  const { data: events } = await get(`${API_URL}/events?slug=${slug}`);
  return { props: { event: events[0] } };
}
