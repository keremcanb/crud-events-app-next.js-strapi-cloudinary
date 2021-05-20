import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/index';

const EventItem = ({ event: { image, name, slug } }) => (
  <Card>
    <Link href={`/events/${slug}`}>
      <a>
        <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
      </a>
    </Link>
    <h3>
      <Link href={`/events/${slug}`}>
        <a>{name}</a>
      </Link>
    </h3>
  </Card>
);

export default EventItem;
