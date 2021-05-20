import Link from 'next/link';
import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div className="flex justify-center gap-2">
    {page > 1 && (
      <Link href={`/events?page=${page - 1}`}>
        <Button value="Previous" />
      </Link>
    )}
    {/* If not on last page */}
    {/* Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && (
      <Link href={`/events?page=${page + 1}`}>
        <Button value="Next" />
      </Link>
    )}
  </div>
);

export default Pagination;
