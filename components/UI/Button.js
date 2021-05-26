import Link from 'next/link';

const Button = ({ link, onClick, text }) =>
  link ? (
    <div className="flex justify-center">
      <Link href={link}>
        <a className="py-2 px-4 my-5 | text-white font-semibold | bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md | focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {text}
        </a>
      </Link>
    </div>
  ) : (
    <div className="flex justify-center">
      <button
        className="py-2 px-4 my-5 | text-white font-semibold | bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md | focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );

export default Button;
