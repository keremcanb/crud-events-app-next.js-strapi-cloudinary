import { BtnLink } from '@/components/index';
import { PER_PAGE } from '@/config/index';
import { IPagination } from '@/types/types';

const Pagination = ({ page, total }: IPagination) => (
  <div className="flex justify-center space-x-5">
    {page > 1 && <BtnLink color="blue" text="Previous" link={`/events?page=${page - 1}`} />}
    {/* If not on last page. Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && <BtnLink color="blue" text="Next" link={`/events?page=${page + 1}`} />}
  </div>
);

export default Pagination;
