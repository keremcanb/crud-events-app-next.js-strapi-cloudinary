import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import EventsContext from '@/context/EventsContext';
import { Card } from '@/components/index';

const EventItem = ({ slug, name, id, image, date, token, dashboard }) => {
  const { deleteEvent } = useContext(EventsContext);

  return (
    <>
      <ToastContainer />
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
        {dashboard ? (
          <div className="flex gap-10">
            <Link href={`/events/edit/${id}`}>
              <a>
                <FaPencilAlt className="text-xl" />
              </a>
            </Link>
            <a href="#" onClick={() => deleteEvent(id, token)}>
              <FaTimes className="text-red-600 text-xl" />
            </a>
          </div>
        ) : (
          <h3>
            <Moment format="DD-MM-YYYY">{date}</Moment>
          </h3>
        )}
      </Card>
    </>
  );
};

export default EventItem;
