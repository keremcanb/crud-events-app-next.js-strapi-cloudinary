import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Spinner } from '@/components/index';
import { API_URL } from '../../config/index';

const ImageUpload = ({ eventId, imageUploaded, token }: { eventId?: string; imageUploaded?: any; token?: string }) => {
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
      const res = await axios.post(`${API_URL}/upload`, formData, {
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

  const handleChange = (e) => {
    imageSet(e.target.files[0]);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit} className="flex flex-col place-items-center lg:justify-around ">
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        <Button text="Upload Image" />
        {loading && <Spinner />}
      </form>
    </>
  );
};

export default ImageUpload;
