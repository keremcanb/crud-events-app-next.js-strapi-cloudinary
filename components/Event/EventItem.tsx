import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
import EventsContext from '@/context/EventsContext';
import { Button } from '@/components/index';
import { IEvent } from '@/types/types';

const EventItem = ({ slug, name, id, image, date, token, genre, dashboard }: IEvent) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteEvent } = useContext(EventsContext);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const handleDelete = () => {
    deleteEvent(id, token);
    onCloseModal();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal'
        }}
      >
        <h2 className="text-center">Delete {name}?</h2>
        <div className="flex justify-center items-center space-x-5 ">
          <Button text="Delete" color="red" onClick={handleDelete} />
          <Button text="Go Back" color="blue" onClick={onCloseModal} />
        </div>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-gray-100 dark:bg-gray-200 transition-colors duration-500 mb-5">
        <Link href={`/events/${slug}`}>
          <a>
            <Image
              src={image ? image.formats.medium.url : '/images/event-default.png'}
              width={300}
              height={200}
              className="hover:opacity-80 transition duration-1000"
            />
          </a>
        </Link>
        <div className="px-6 py-2">
          <h2 className="mb-2 font-bold">{name}</h2>
          <h3>
            <Moment format="DD-MM-YYYY">{date}</Moment>
          </h3>
        </div>
        {dashboard ? (
          <div className="flex justify-evenly items-center space-10 my-4">
            <Link href={`/events/edit/${id}`}>
              <a>
                <FaPencilAlt className="text-2xl text-blue-500 hover:text-blue-700" />
              </a>
            </Link>
            <a href="#" onClick={onOpenModal}>
              <FaTimes className="text-2xl text-red-500 hover:text-red-700" />
            </a>
          </div>
        ) : (
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {genre}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default EventItem;
