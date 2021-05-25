import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import { Card } from '@/components/index';

const EventItem = ({ image, name, slug, date }) => (
  <Card>
    <Link href={`/events/${slug}`}>
      <a>
        <Image
          src={image ? image.formats.thumbnail.url : '/images/event-default.png'}
          width={170}
          height={100}
          className="rounded"
        />
      </a>
    </Link>
    <h2>
      <Link href={`/events/${slug}`}>
        <a>{name}</a>
      </Link>
    </h2>
    <h3>
      <Moment format="DD-MM-YYYY">{date}</Moment>
    </h3>
  </Card>
);

export default EventItem;
