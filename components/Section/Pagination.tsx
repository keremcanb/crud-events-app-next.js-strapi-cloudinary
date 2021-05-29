import { Button } from '@/components/index';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, total }: { page?: number; total?: number }) => (
  <div className="flex justify-center gap-5">
    {page > 1 && <Button color="blue" text="Previous" link={`/events?page=${page - 1}`} />}
    {/* If not on last page. Take total and divide by per page */}
    {page < Math.ceil(total / PER_PAGE) && <Button color="blue" text="Next" link={`/events?page=${page + 1}`} />}
  </div>
);
// <div className="flex justify-center">
//   {page > 1 && (
//     <Link href={`/events?page=${page - 1}`}>
//       <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Prev</button>
//     </Link>
//   )}
//   {page < Math.ceil(total / PER_PAGE) && (
//     <Link href={`/events?page=${page + 1}`}>
//       <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Next</button>
//     </Link>
//   )}
// </div>

export default Pagination;
