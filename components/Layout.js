import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header, Footer, Showcase } from '@/components/index';

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className="max-w-screen-lg my-20 px-20 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, events'
};
