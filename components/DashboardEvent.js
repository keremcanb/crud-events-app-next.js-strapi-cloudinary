import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const DashboardEvent = ({ event: { slug, name, id, image }, handleDelete, token }) => (
  <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-around cursor-pointer | hover:bg-gray-200 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500 mb-5">
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
      <a>
        <FaPencilAlt /> Edit
      </a>
    </Link>
    <a href="#" onClick={() => handleDelete(id, token)}>
      <FaTimes /> Delete
    </a>
  </div>
);

export default DashboardEvent;
