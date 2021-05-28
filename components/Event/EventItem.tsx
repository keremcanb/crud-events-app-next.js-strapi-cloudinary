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

const EventItem = ({
  slug,
  name,
  id,
  image,
  date,
  token,
  dashboard
}: {
  slug?: string;
  id?: string;
  name?: string;
  image?: string;
  date?: string;
  token?: string;
  dashboard?: boolean;
}) => {
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
        <div className="flex gap-5 place-items-center">
          <Button text="Delete" onClick={handleDelete} />
          <Button text="Go Back" onClick={onCloseModal} />
        </div>
      </Modal>
      <ToastContainer position="top-center" autoClose={3000} />
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
          <h3 className="dark:text-blue-900">
            <Moment format="DD-MM-YYYY">{date}</Moment>
          </h3>
        )}
      </Card>
    </>
  );
};

export default EventItem;
