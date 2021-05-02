import { useState } from 'react';
import { post } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Form.module.css';
import { API_URL } from '../config/index';

const ImageUpload = ({ eventId, imageUploaded, token }) => {
  const [image, imageSet] = useState(null);

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
      const res = await post(`${API_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        imageUploaded();
      }
    } catch (err) {
      toast.error(err.response.message);
    }
  };

  const handleFileChange = (e) => {
    imageSet(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn-info" />
      </form>
    </div>
  );
};

export default ImageUpload;

// const res = await fetch(`${API_URL}/upload`, {
//   method: 'POST',
//   headers: {
//     Authorization: `Bearer ${token}`
//   },
//   body: formData
// });
// if (res.ok) {
//   imageUploaded();
// }
