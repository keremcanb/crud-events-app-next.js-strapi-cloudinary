import Link from 'next/link';

// eslint-disable-next-line react/prop-types
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
