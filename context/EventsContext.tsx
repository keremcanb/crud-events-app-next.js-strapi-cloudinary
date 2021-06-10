import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '@/config/index';

const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addEvent = async (formInput, token) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_URL}/events`, formInput, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLoading(false);
      router.push(`/events/${data.slug}`);
    } catch (err) {
      setIsLoading(false);
      if ([403, 401].includes(err.response.status)) {
        toast.error(`You must login before adding events.`);
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const updateEvent = async (id, formInput, token) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(`${API_URL}/events/${id}`, formInput, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLoading(false);
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
      toast.success('Event deleted');
      router.push('/account/dashboard');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <EventsContext.Provider value={{ addEvent, updateEvent, deleteEvent, isLoading }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
