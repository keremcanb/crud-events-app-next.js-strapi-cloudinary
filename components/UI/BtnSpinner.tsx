import { useContext } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import AuthContext from '@/context/AuthContext';
import EventsContext from '@/context/EventsContext';
import { IBtnSpinner } from '@/types/types';

const BtnSpinner = ({ text, textLoading }: IBtnSpinner) => {
  const { isLoading: authLoading } = useContext(AuthContext);
  const { isLoading: eventsLoading } = useContext(EventsContext);

  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="inline-flex place-items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {authLoading || eventsLoading ? (
          <>
            <ImSpinner8 className="animate-spin h-5 w-5 mr-3 text-white" />
            {textLoading}
          </>
        ) : (
          <>{text}</>
        )}
      </button>
    </div>
  );
};

export default BtnSpinner;
