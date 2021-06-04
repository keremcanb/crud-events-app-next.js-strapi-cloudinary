import { createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '@/config/index';

type ContextProps = {
  token: string;
  id: string;
  formInput: {};
  addEvent: (formInput: {}, token: string) => {};
  updateEvent: (id: number, formInput: {}, token: string) => {};
  deleteEvent: (id: number, token: string) => {};
};

const EventsContext = createContext<Partial<ContextProps>>({});

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const addEvent = async (formInput: {}, token: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/events`, formInput, {
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

  const updateEvent = async (id: number, formInput: {}, token: string) => {
    try {
      const { data } = await axios.put(`${API_URL}/events/${id}`, formInput, {
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

  const deleteEvent = async (id: number, token: string) => {
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

  return <EventsContext.Provider value={{ addEvent, updateEvent, deleteEvent }}>{children}</EventsContext.Provider>;
};

export default EventsContext;
