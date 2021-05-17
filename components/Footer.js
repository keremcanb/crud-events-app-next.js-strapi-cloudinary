import Link from 'next/link';

const Footer = () => (
  <footer className="flex justify-center mb-10">
    <p>Copyright &copy; DJ Events 2021</p>
    <p>
      <Link href="/about">About this project</Link>
    </p>
  </footer>
);

export default Footer;
