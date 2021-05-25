import { useState, useContext } from 'react';
import Switch from 'react-switch';
import EventsContext from '@/context/EventsContext';
import { ToastContainer } from 'react-toastify';
import { Layout, Button } from '@/components/index';
import { parseCookies } from '@/helpers/helpers';

const AddEventPage = ({ token }) => {
  const [values, setValues] = useState({
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
  const { name, performers, venue, address, date, time, description, genre } = values;
  const [checked, setChecked] = useState(false);
  const { addEvent } = useContext(EventsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addEvent({ ...values, featured: checked }, token);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleToggle = (checked) => {
    setChecked(checked);
  };

  return token ? (
    <Layout title="Add New Event">
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows lg:grid-cols-2 gap-4 mb-5">
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
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={time} onChange={handleChange} required />
          </div>
          <div className="relative">
            <label htmlFor="genre">Genre</label>
            <select id="genre" value={genre} onChange={handleChange}>
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
          <div>
            <label htmlFor="featured">Featured</label>
            <Switch onChange={handleToggle} checked={checked} className="mt-1" />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea type="text" id="description" value={description} onChange={handleChange} required rows="5" />
        </div>
        <Button text="Add Event" />
      </form>
    </Layout>
  ) : (
    <h1>Not authorized to view this page</h1>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return { props: { token } };
}
