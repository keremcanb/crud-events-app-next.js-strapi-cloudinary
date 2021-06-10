import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }) => (
  <div className="flex justify-center space-x-5">
    {page > 1 && <Button color="blue" text="Previous" link={`/events?page=${page - 1}`} />}
    {/* If not on last page. Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && <Button color="blue" text="Next" link={`/events?page=${page + 1}`} />}
  </div>
);

export default Pagination;
