import Link from 'next/link';
import Image from 'next/image';

const EventItem = ({ event: { image, name, slug } }) => (
  <Link href={`/events/${slug}`}>
    <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-3 | mb-5 p-4 | bg-gray-100 dark:bg-gray-800 bg-opacity-95 border-opacity-60 |  border-solid rounded-xl border-2 | cursor-pointer | hover:bg-gray-200 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500">
      <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
      <h3>{name}</h3>
    </div>
  </Link>
);

export default EventItem;
