import { useState, useContext } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Switch from 'react-switch';
import { ToastContainer } from 'react-toastify';
import { parseCookies } from '@/helpers/helpers';
import { Layout, ImageUpload, Button, ArrowIcon } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';

const EditEventPage = ({
  event: { name, performers, venue, address, date, time, description, image, id, genre },
  token
}: {
  token?: string;
  event?: {
    name?: string;
    performers?: string;
    venue?: string;
    address?: string;
    date?: string;
    time?: string;
    description?: string;
    image?: any;
    id?: string;
    genre?: string;
  };
}) => {
  const [values, setValues] = useState({ name, performers, venue, address, date, time, description });
  const [imagePreview, imagePreviewSet] = useState(image && image.formats.thumbnail.url);
  const [isChecked, setIsChecked] = useState(false);
  const { updateEvent } = useContext(EventsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(id, { ...values, featured: isChecked }, token);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleToggle = (checked) => {
    setIsChecked(checked);
  };

  const imageUploaded = async () => {
    const { data } = await axios.get(`${API_URL}/events/${id}`);
    imagePreviewSet(data.image.formats.thumbnail.url);
  };

  return (
    <Layout title="Edit Event - DJ Events">
      <h1>Edit Event: {values.name}</h1>
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows md:grid-cols-2 gap-4 | mb-5">
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
            <input type="date" id="date" value={values.date} onChange={handleChange} required />
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
            <ArrowIcon />
          </div>
          <div>
            <label htmlFor="featured">Featured</label>
            <Switch onChange={handleToggle} checked={isChecked} className="mt-1" />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={values.description} onChange={handleChange} required />
        </div>
        <Button text="Update Event" />
      </form>
      {imagePreview ? (
        <div className="grid grid-rows lg:grid-cols-2 place-items-center gap-4 | my-5">
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
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }: { params: { id?: string }; req?: any }) {
  const { token } = parseCookies(req);
  const { data: event } = await axios.get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}
