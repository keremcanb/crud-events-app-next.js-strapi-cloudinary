import { useState, useContext } from 'react';
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
  const { name, performers, venue, address, date, time, description, genre, featured } = values;
  const { addEvent } = useContext(EventsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addEvent(values, token);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  return token ? (
    <Layout title="Add New Event">
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows md:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="name">Event Name</label>
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
          <div>
            <label htmlFor="genre">Genre</label>
            <select id="genre" value={genre} onChange={handleChange}>
              <option value="Trance">Trance</option>
              <option value="House">House</option>
              <option value="Techno">Techno</option>
              <option value="Prog House">Prog House</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="featured">Featured</label>
            <select id="featured" value={featured} onChange={handleChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div> */}
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
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
