import { useState, useContext } from 'react';
import Image from 'next/image';
import { get } from 'axios';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { parseCookies } from '@/helpers/helpers';
import { Layout, ImageUpload } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const EditEventPage = ({ event: { name, performers, venue, address, date, time, description, image, id }, token }) => {
  const [values, setValues] = useState({ name, performers, venue, address, date, time, description });
  const [imagePreview, imagePreviewSet] = useState(image && image.formats.thumbnail.url);
  const { updateEvent } = useContext(EventsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateEvent(id, values, token);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const imageUploaded = async () => {
    const { data } = await get(`${API_URL}/events/${id}`);
    imagePreviewSet(data.image.formats.thumbnail.url);
  };

  return token ? (
    <Layout title="Edit Event">
      <h1 className="font-bold text-4xl mb-8">Edit Event: {values.name}</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="performers" className="block text-gray-700 text-sm font-bold mb-2">
              Performers
            </label>
            <input
              type="text"
              id="performers"
              value={values.performers}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="venue" className="block text-gray-700 text-sm font-bold mb-2">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              value={values.venue}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={values.address}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={values.time}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Event Description
          </label>
          <textarea
            type="text"
            id="description"
            value={values.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Update Event
          </button>
        </div>
      </form>
      {imagePreview ? (
        <>
          <Image src={imagePreview} height={100} width={170} />
          <h3 className="font-bold text-xl mb-8">Change Image</h3>
          <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
        </>
      ) : (
        <>
          <h3>Upload Image</h3>
          <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
        </>
      )}
    </Layout>
  ) : (
    <h1 className="font-bold text-4xl mb-8">Not authorized to view this page</h1>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const { data: event } = await get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}
