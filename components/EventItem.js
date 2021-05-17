import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ event: { image, time, name, slug, date } }) => (
  <div className={styles.event}>
    <div className={styles.img}>
      <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
    </div>
    <div className={styles.info}>
      <h3>{name}</h3>
      <span>
        {new Date(date).toLocaleDateString('tr-TR')} @ {time}
      </span>
    </div>
    <div className={styles.link}>
      <Link href={`/events/${slug}`}>
        <button type="submit">Details</button>
      </Link>
    </div>
  </div>
);

export default EventItem;
