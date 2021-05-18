import { useState } from 'react';
import Image from 'next/image';
import { post } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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
        <input
          type="file"
          onChange={(e) => {
            imageSet(e.target.files[0]);
          }}
        />
        <button className="btn-blue mt-5" type="submit">
          Submit
        </button>
        {loading && <Image src="/images/spinner.gif" alt="Loading" width={64} height={64} />}
      </form>
    </div>
  );
};

export default ImageUpload;
