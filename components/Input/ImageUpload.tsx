import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ImSpinner8 } from 'react-icons/im';
import { API_URL } from '../../config/index';

const ImageUpload = ({ eventId, imageUploaded, token }: { eventId?: string; imageUploaded?: any; token?: string }) => {
  const [image, imageSet] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        toast.success('Image Uploaded');
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
      <ToastContainer position="top-center" autoClose={2000} />
      <form onSubmit={handleSubmit} className="flex flex-col place-items-center lg:justify-around ">
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        <button
          type="submit"
          className="inline-flex place-items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {loading ? (
            <>
              <ImSpinner8 className="animate-spin h-5 w-5 mr-3 text-white" />
              Uploading...
            </>
          ) : (
            <>Upload</>
          )}
        </button>
      </form>
    </>
  );
};

export default ImageUpload;
