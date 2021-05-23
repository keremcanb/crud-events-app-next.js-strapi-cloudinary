import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div className="flex justify-center gap-10">
    {page > 1 && (
      <Link href={`/events?page=${page - 1}`} passHref>
        <Button text="Previous" />
      </Link>
    )}
    {/* If not on last page */}
    {/* Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && <Button text="Next" href={`/events?page=${page + 1}`} />}
  </div>
);

export default Pagination;
