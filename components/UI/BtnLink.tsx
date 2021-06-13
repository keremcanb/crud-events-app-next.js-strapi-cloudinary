import Link from 'next/link';
import { IBtnLink } from '@/types/types';

const BtnLink = ({ link, text, color }: IBtnLink) => (
  <div className="flex justify-center">
    <Link href={link}>
      <a className={`btn btn-${color}`}>{text}</a>
    </Link>
  </div>
);

export default BtnLink;
