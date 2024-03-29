import { useState, useContext } from 'react';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import Switch from 'react-switch';
import { ToastContainer } from 'react-toastify';
import { parseCookies } from '@/helpers/helpers';
import { Layout, ImageUpload, BtnSpinner, ArrowIcon } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';
import { IEdit } from '@/types/types';

const EditEventPage = ({
  event: { name, performers, venue, address, date, time, description, image: img, id, genre, featured },
  token
}: IEdit) => {
  const [formInput, setFormInput] = useState({
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
    genre,
    featured
  });
  const [image, setImage] = useState(img && img.formats.thumbnail.url);
  const [isChecked, setIsChecked] = useState(false);
  const { updateEvent } = useContext(EventsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(id, { ...formInput, featured: isChecked }, token);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleToggle = (checked) => {
    setIsChecked(checked);
  };

  const handleImagePreview = async () => {
    const { data } = await axios.get(`${API_URL}/events/${id}`);
    setImage(data.image.formats.thumbnail.url);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout title="Edit Event - DJ Events">
        <h1>Edit: {formInput.name}</h1>
        <div className="max-w-5xl p-5 rounded overflow-hidden shadow-lg dark:bg-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-rows md:grid-cols-2 gap-4 | mb-5">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={formInput.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="performers">Performers</label>
                <input type="text" id="performers" value={formInput.performers} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="venue">Venue</label>
                <input type="text" id="venue" value={formInput.venue} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={formInput.address} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 md:grid-rows gap-4">
                <div>
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" value={formInput.date} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" value={formInput.time} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-rows gap-4">
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
                  <Switch id="featured" value="featured" onChange={handleToggle} checked={isChecked} className="mt-1" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" value={formInput.description} onChange={handleChange} required />
            </div>
            <BtnSpinner text="Update Event" textLoading="Updating Event..." />
          </form>
          {image ? (
            <div className="grid grid-rows lg:grid-cols-2 place-items-center gap-4 | my-5">
              <div className="flex justify-center">
                <Image src={image} height={170} width={250} className="rounded" />
              </div>
              <div>
                <h3 className="text-center mt-0 mb-6">Change Image</h3>
                <ImageUpload eventId={id} imagePreview={handleImagePreview} token={token} />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-center my-5">Upload Image</h3>
              <ImageUpload eventId={id} imagePreview={handleImagePreview} token={token} />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default EditEventPage;

export const getServerSideProps = async ({ params: { id }, req, locale }) => {
  const { token } = parseCookies(req);
  const { data: event } = await axios.get(`${API_URL}/events/${id}`);
  return { props: { event, token, ...(await serverSideTranslations(locale, ['common'])) } };
};
