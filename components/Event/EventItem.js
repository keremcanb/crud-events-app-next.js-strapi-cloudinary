import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import EventsContext from '@/context/EventsContext';
import { Card } from '@/components/index';
import { Modal } from 'react-responsive-modal';
import Button from '../UI/Button';

const EventItem = ({ slug, name, id, image, date, token, dashboard }) => {
  const [open, setOpen] = useState(false);
  const { deleteEvent } = useContext(EventsContext);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleDelete = () => {
    deleteEvent(id, token);
    onCloseModal();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal'
        }}
      >
        <h2 className="text-center">Delete Event?</h2>
        <div className="flex gap-5 justify-center items-center">
          <button
            text="Delete"
            onClick={handleDelete}
            className="py-2 px-4 my-5 | bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 | focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Delete
          </button>
          <Button text="Go Back" onClick={onCloseModal} />
        </div>
      </Modal>
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
            <a href="#" onClick={onOpenModal}>
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
