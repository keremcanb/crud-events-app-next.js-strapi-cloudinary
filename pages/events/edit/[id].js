import { useState, useContext } from 'react';
import Image from 'next/image';
import { get } from 'axios';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { parseCookies } from '@/helpers/helpers';
import { Layout, ImageUpload } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';

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
      <h1>Edit Event: {values.name}</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" value={values.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" value={values.performers} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" value={values.venue} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={values.address} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={values.time} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" id="description" value={values.description} onChange={handleChange} required />
        </div>
        <div className="flex justify-center mt-5">
          <button type="submit">Update Event</button>
        </div>
      </form>
      {imagePreview ? (
        <>
          <Image src={imagePreview} height={100} width={170} />
          <h3>Change Image</h3>
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
    <h1>Not authorized to view this page</h1>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const { data: event } = await get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}
