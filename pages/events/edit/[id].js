import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { put, get } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import { parseCookies } from '@/helpers/helpers';
import { Layout, Modal, ImageUpload } from '@/components/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const EditEventPage = ({ event: { name, performers, venue, address, date, time, description, image, id }, token }) => {
  const [values, setValues] = useState({ name, performers, venue, address, date, time, description });
  const [imagePreview, imagePreviewSet] = useState(image && image.formats.thumbnail.url);
  const [showModal, showModalSet] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(values).some((element) => element === '');
    if (hasEmptyFields) {
      toast.error('Fill in all fields');
      return;
    }
    // Update event
    try {
      const { data } = await put(`${API_URL}/events/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${data.slug}`);
    } catch (error) {
      if ([403, 401].includes(error.response.status)) {
        toast.error(`Invalid permision, you cannot modify this event`);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const imageUploaded = async () => {
    const { data } = await get(`${API_URL}/events/${id}`);
    imagePreviewSet(data.image.formats.thumbnail.url);
    showModalSet(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">
        <a className="btn-secondary">Go back</a>
      </Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" value={values.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" value={values.performers} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" value={values.venue} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={values.address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" value={values.time} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" id="description" value={values.description} onChange={handleChange} />
        </div>
        <input type="submit" value="Update Event" className="btn-info" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? <Image src={imagePreview} height={100} width={170} /> : <div> No Image Uploaded </div>}
      <div>
        <button className="btn" onClick={() => showModalSet(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => showModalSet(false)}>
        <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const { data: event } = await get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}
