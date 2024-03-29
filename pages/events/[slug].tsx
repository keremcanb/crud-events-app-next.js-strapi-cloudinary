import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '@/components/index';
import { API_URL } from '@/config/index';
import { IEvent } from '@/types/event';

const EventPage = ({
  event: { name, date, time, image, performers, description, venue, address, genre }
}: {
  event: IEvent;
}) => (
  <Layout title={`${name} - DJ Events`}>
    <div className="grid grid-rows justify-center items-center gap-4 | my-5">
      <h1>{name}</h1>
      <div className="text-center mb-3">
        <h2 className="mb-3">
          Featuring: {performers} @ {new Date(date).toLocaleDateString('tr-TR')} {time}
        </h2>
        <h2>Genre: {genre}</h2>
      </div>
      {image && (
        <div>
          <Image src={image.formats.medium.url} width={800} height={600} className="rounded" />
        </div>
      )}
      <div className="grid grid-rows md:grid-cols-2 justify-center items-center gap-4">
        <div>
          <h3 className="font-bold">Description:</h3>
          <p>{description}</p>
        </div>
        <div>
          <h3 className="font-bold">Venue:</h3>
          <p>
            {venue}, {address}
          </p>
        </div>
      </div>
      <Link href="/events">
        <a className="block text-center">{'<'}Go Back</a>
      </Link>
    </div>
  </Layout>
);

export default EventPage;

export const getServerSideProps = async ({ query: { slug }, locale }) => {
  const { data: events } = await axios.get(`${API_URL}/events?slug=${slug}`);
  return { props: { event: events[0], ...(await serverSideTranslations(locale, ['common'])) } };
};
