import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Event.module.css';

const EventPage = ({ event: { name, date, time, image, performers, description, venue, address } }) => (
  <Layout title={`Event ${name}`}>
    <div className={styles.event}>
      <span>
        {new Date(date).toLocaleDateString('tr-TR')} at {time}
      </span>
      <h1>{name}</h1>
      <ToastContainer />
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
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      event: events[0]
    }
  };
}

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       event: events[0]
//     },
//     revalidate: 1
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((event) => ({
//     params: { slug: event.slug }
//   }));

//   return {
//     paths,
//     fallback: false
//   };
// }
