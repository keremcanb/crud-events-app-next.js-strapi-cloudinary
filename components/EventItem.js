import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/index';

const EventItem = ({ image, name, slug }) => (
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
  </Card>
);

export default EventItem;
