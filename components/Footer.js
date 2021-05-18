import Link from 'next/link';

const Footer = () => (
  <footer className="text-center mt-50 mb-20">
    <p className="my-5">Copyright &copy; DJ Events 2021</p>
    <p className="my-5">
      <Link href="/about">About this project</Link>
    </p>
  </footer>
);

export default Footer;
