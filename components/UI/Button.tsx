/* eslint-disable react/prop-types */
import Link from 'next/link';

const Button = ({ link, text, color, onClick }: { link?: string; text?: string; color?: string; onClick?: any }) =>
  link ? (
    <div className="flex justify-center">
      <Link href={link}>
        <a className={`btn btn-${color}`}>{text}</a>
      </Link>
    </div>
  ) : (
    <div className="flex justify-center">
      <button className={`btn btn-${color}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );

export default Button;
