import Link from 'next/link';

const BtnLink = ({ link, text, color }: { link: string; text: string; color: string }) => (
  <div className="flex justify-center">
    <Link href={link}>
      <a className={`btn btn-${color}`}>{text}</a>
    </Link>
  </div>
);

export default BtnLink;
