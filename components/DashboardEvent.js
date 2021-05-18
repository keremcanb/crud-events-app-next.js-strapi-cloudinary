import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const DashboardEvent = ({ event: { slug, name, id, image }, handleDelete, token }) => (
  <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-95 border-opacity-60 | p-2 border-solid rounded-xl border-2 | flex justify-between | hover:bg-gray-200 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500 mb-5">
    <div className="flex ml-5 items-center">
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
    </div>
    <div className="flex mr-5 items-center">
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
