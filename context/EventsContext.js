import { createContext } from 'react';
import { useRouter } from 'next/router';
import axios, { post, put } from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '@/config/index';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const router = useRouter();

  const addEvent = async (values, token) => {
    try {
      const { data } = await post(`${API_URL}/events`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${data.slug}`);
    } catch (err) {
      if ([403, 401].includes(err.response.status)) {
        toast.error(`You must login before adding events.`);
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const updateEvent = async (id, values, token) => {
    try {
      const { data } = await put(`${API_URL}/events/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${data.slug}`);
    } catch (err) {
      if ([403, 401].includes(err.response.status)) {
        toast.error(`Invalid permision, you cannot modify this event`);
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const deleteEvent = async (id, token) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast('Event deleted');
      router.push('/account/dashboard');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return <EventsContext.Provider value={{ addEvent, updateEvent, deleteEvent }}>{children}</EventsContext.Provider>;
};

export default EventsContext;
