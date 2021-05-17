import Link from 'next/link';
import Image from 'next/image';

const EventItem = ({ event: { image, time, name, slug, date } }) => (
  <Link href={`/events/${slug}`}>
    <div className="bg-gray-100  dark:bg-gray-800 bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-around cursor-pointer | hover:bg-gray-200 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500 mb-5">
      <div>
        <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
      </div>
      <div>
        <h3>{name}</h3>
        <span>
          {new Date(date).toLocaleDateString('tr-TR')} @ {time}
        </span>
      </div>
    </div>
  </Link>
);

export default EventItem;
