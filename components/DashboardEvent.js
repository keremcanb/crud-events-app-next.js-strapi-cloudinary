import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Card } from '@/components/index';

const DashboardEvent = ({ event: { slug, name, id, image }, handleDelete, token }) => (
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
    <div className="flex gap-10">
      <Link href={`/events/edit/${id}`}>
        <a>
          <FaPencilAlt className="text-xl" />
        </a>
      </Link>
      <a href="#" onClick={() => handleDelete(id, token)}>
        <FaTimes className="text-red-600 text-xl" />
      </a>
    </div>
  </Card>
);

export default DashboardEvent;
