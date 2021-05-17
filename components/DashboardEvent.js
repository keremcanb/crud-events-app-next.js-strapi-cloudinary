import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';

const DashboardEvent = ({ event: { slug, name, id, image }, handleDelete, token }) => (
  <div className={styles.event}>
    <Link href={`/events/${slug}`}>
      <a>
        <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={100} height={50} />
      </a>
    </Link>
    <h4 className="ml-5">
      <Link href={`/events/${slug}`}>
        <a>{name}</a>
      </Link>
    </h4>
    <Link href={`/events/edit/${id}`}>
      <a className={styles.edit}>
        <FaPencilAlt />
      </a>
    </Link>
    <a href="#" className={styles.delete} onClick={() => handleDelete(id, token)}>
      <FaTimes />
    </a>
  </div>
);

export default DashboardEvent;
