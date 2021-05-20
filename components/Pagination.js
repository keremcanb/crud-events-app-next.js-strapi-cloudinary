import Link from 'next/link';
import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div className="flex justify-center">
    {page > 1 && (
      <Link href={`/events?page=${page - 1}`}>
        <button className="btn-blue mr-3" type="submit">
          Previous
        </button>
        {/* <Button value='Previous' /> */}
      </Link>
    )}
    {/* If not on last page */}
    {/* Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && (
      <Link href={`/events?page=${page + 1}`}>
        <button className="btn-blue" type="submit">
          Next
        </button>
        {/* <Button value='Next' /> */}
      </Link>
    )}
  </div>
);

export default Pagination;
