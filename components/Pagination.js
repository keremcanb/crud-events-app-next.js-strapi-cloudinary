import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div className="center">
    {page > 1 && (
      <Link href={`/events?page=${page - 1}`}>
        <button
          type="submit"
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Previous
        </button>
      </Link>
    )}
    {/* If not on last page */}
    {/* Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && (
      <Link href={`/events?page=${page + 1}`}>
        <button
          type="submit"
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Next
        </button>
      </Link>
    )}
  </div>
);

export default Pagination;
