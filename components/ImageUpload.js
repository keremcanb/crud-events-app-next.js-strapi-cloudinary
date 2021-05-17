import { useState } from 'react';
import Image from 'next/image';
import { post } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Form.module.css';
import { API_URL } from '../config/index';

const ImageUpload = ({ eventId, imageUploaded, token }) => {
  const [image, imageSet] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append image in state
    formData.append('files', image);
    // 3 actions to connect to event:
    // Events collection
    formData.append('ref', 'events');
    // Event id
    formData.append('refId', eventId);
    formData.append('field', 'image');

    try {
      setLoading(true);
      const res = await post(`${API_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        setLoading(false);
        imageUploaded();
      }
    } catch (err) {
      toast.error(err.response.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input
            type="file"
            onChange={(e) => {
              imageSet(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit
          </button>
        </div>
        <div>{loading && <Image src="/images/spinner.gif" alt="Loading" width={64} height={64} />}</div>
      </form>
    </div>
  );
};

export default ImageUpload;
