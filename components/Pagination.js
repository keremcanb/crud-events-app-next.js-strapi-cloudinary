import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div>
    <center>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {/* If not on last page */}
      {/* Take total and divide by per page */}
      {page < Math.ceil(total / PER_PAGE) && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </center>
  </div>
);

export default Pagination;

// const lastPage = Math.ceil(total / PER_PAGE);
