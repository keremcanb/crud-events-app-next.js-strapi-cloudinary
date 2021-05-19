import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const DashboardEvent = ({ event: { slug, name, id, image }, handleDelete, token }) => (
  <div className="grid grid-rows md:grid-cols-3 justify-center md:justify-between items-center gap-3 | mb-5 p-2 | bg-gray-100 dark:bg-gray-800 bg-opacity-95 border-opacity-60 | border-solid rounded-xl border-2 | hover:bg-gray-200 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500">
    <Link href={`/events/${slug}`}>
      <a>
        <Image src={image ? image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
      </a>
    </Link>
    <h3 className="text-center">
      <Link href={`/events/${slug}`}>
        <a>{name}</a>
      </Link>
    </h3>
    <div className="flex items-center justify-center ">
      <Link href={`/events/edit/${id}`}>
        <a>
          <FaPencilAlt className="mr-5 text-xl" />
        </a>
      </Link>
      <a href="#" onClick={() => handleDelete(id, token)}>
        <FaTimes className="text-red-600 text-xl" />
      </a>
    </div>
  </div>
);

export default DashboardEvent;
