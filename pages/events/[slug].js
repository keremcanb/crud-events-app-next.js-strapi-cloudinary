import Link from 'next/link';
import Image from 'next/image';
import { get } from 'axios';
import { Layout } from '@/components/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

const EventPage = ({ event: { name, date, time, image, performers, description, venue, address } }) => (
  <Layout title={`Event ${name}`}>
    <div className={styles.event}>
      <span>
        {new Date(date).toLocaleDateString('tr-TR')} @ {time}
      </span>
      <h1>{name}</h1>
      {image && (
        <div className={styles.image}>
          <Image src={image.formats.medium.url} width={960} height={600} />
        </div>
      )}
      <p>{performers}</p>
      <h3>Description:</h3>
      <p>{description}</p>
      <h3>Venue: {venue}</h3>
      <p>{address}</p>
      <Link href="/events">
        <a className={styles.back}>{'<'}Go Back</a>
      </Link>
    </div>
  </Layout>
);

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  const { data: events } = await get(`${API_URL}/events?slug=${slug}`);
  return { props: { event: events[0] } };
}
