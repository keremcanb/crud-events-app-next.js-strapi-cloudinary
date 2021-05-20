import Image from 'next/image';

const Spinner = () => (
  <div className="mt-2">
    <Image src="/images/spinner.gif" alt="Loading" width={64} height={64} />
  </div>
);

export default Spinner;
