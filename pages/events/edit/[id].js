import { useState, useContext } from 'react';
import Image from 'next/image';
import { get } from 'axios';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { parseCookies } from '@/helpers/helpers';
import { Layout, ImageUpload, Button } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';

const EditEventPage = ({
  event: { name, performers, venue, address, date, time, description, image, id, genre, featured },
  token
}) => {
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
        <div className="grid grid-rows md:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="name">Name</label>
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
          <div className="relative">
            <label htmlFor="genre">Genre</label>
            <select id="genre" defaultValue={genre} onChange={handleChange}>
              <option value="Trance">Trance</option>
              <option value="House">House</option>
              <option value="Techno">Techno</option>
              <option value="Prog House">Prog House</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="featured">Featured</label>
            <select id="featured" defaultValue={featured} onChange={handleChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea type="text" id="description" value={values.description} onChange={handleChange} required rows="5" />
        </div>
        <Button text="Update Event" />
      </form>
      {imagePreview ? (
        <div className="grid grid-rows md:grid-cols-2 justify-center items-center gap-4 my-5">
          <div className="flex justify-center">
            <Image src={imagePreview} height={170} width={250} className="rounded" />
          </div>
          <div>
            <h3 className="text-center mt-0 mb-6">Change Image</h3>
            <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-center my-5">Upload Image</h3>
          <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
        </div>
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
