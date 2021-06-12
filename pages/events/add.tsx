import { useState, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Switch from 'react-switch';
import EventsContext from '@/context/EventsContext';
import { ToastContainer } from 'react-toastify';
import { Layout, BtnSpinner, ArrowIcon } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';

const AddEventPage = ({ token }: { token: string }) => {
  const [formInput, setFormInput] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
    genre: '',
    featured: false
  });
  const { name, performers, venue, address, date, time, description, genre } = formInput;
  const [isChecked, setIsChecked] = useState(false);
  const { addEvent } = useContext(EventsContext);
  const { t } = useTranslation('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ ...formInput, featured: isChecked }, token);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleToggle = (checked) => {
    setIsChecked(checked);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout title="Add New Event - DJ Events">
        <h1>{t('add')}</h1>
        <div className="max-w-5xl p-5 rounded overflow-hidden shadow-lg dark:bg-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-rows md:grid-cols-2 gap-4 | mb-5">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="performers">Performers</label>
                <input type="text" id="performers" value={performers} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="venue">Venue</label>
                <input type="text" id="venue" value={venue} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={address} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 md:grid-rows gap-4">
                <div>
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" value={date} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" value={time} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-rows gap-4">
                <div className="relative">
                  <label htmlFor="genre">Genre</label>
                  <select id="genre" value={genre} onChange={handleChange}>
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
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={handleChange} required rows={5} />
            </div>
            <BtnSpinner text="Add" textLoading="Adding Event..." />
          </form>
        </div>
      </Layout>
    </>
  );
};

export default AddEventPage;

export const getServerSideProps = async ({ req, locale }) => {
  const { token } = parseCookies(req);
  return { props: { token, ...(await serverSideTranslations(locale, ['common'])) } };
};
