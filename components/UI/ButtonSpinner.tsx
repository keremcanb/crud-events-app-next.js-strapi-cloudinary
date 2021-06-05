import { useContext } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import AuthContext from '@/context/AuthContext';

const ButtonSpinner = ({ text, textLoading }: { text: string; textLoading: string }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <button
      type="submit"
      className="inline-flex place-items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      {isLoading ? (
        <>
          <ImSpinner8 className="animate-spin h-5 w-5 mr-3 text-white" />
          {textLoading}
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default ButtonSpinner;