import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Layout } from '@/components/index';

const NotFoundPage = () => (
  <Layout title="Page Not Found">
    <div className="text-center my-20">
      <h1 className="inline-flex gap-5">
        <FaExclamationTriangle />
        404
      </h1>
      <h2>Page not Found</h2>
      <Link href="/">Go Back Home</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
