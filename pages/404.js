import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Layout } from '@/components/index';

const NotFoundPage = () => (
  <Layout title="Page Not Found">
    <div className="text-center my-20">
      <h1 className="inline-flex">
        <FaExclamationTriangle /> 404
      </h1>
      <h4>Oops, looks like somebody got lost</h4>
      <Link href="/">Go Back Home</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
