import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ event: { image, time, name, slug, date } }) => (
  <div className={styles.event}>
    <div className={styles.img}>
      <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
    </div>
    <div className={styles.info}>
      <span>
        {new Date(date).toLocaleDateString()} at {time}
      </span>
      <h3>{name}</h3>
    </div>
    <div className={styles.link}>
      <Link href={`/events/${slug}`}>
        <a className="btn">Details</a>
      </Link>
    </div>
  </div>
);

export default EventItem;
