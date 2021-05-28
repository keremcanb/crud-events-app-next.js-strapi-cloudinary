import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }: {
  page?: number
  total?: number
}) => (
  <div className="flex justify-center gap-10">
    {page > 1 && <Button text="Previous" link={`/events?page=${page - 1}`} />}
    {/* If not on last page. Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && <Button text="Next" link={`/events?page=${page + 1}`} />}
  </div>
);

export default Pagination;
