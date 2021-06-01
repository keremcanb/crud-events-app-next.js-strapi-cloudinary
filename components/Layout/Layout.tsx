import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header, Footer, Showcase, Fab } from '@/components/index';
import { ILayout } from '@/types/types';

const Layout = ({ children, title, keywords, description }: ILayout) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className="max-w-screen-lg mx-auto mt-10 mb-20 px-10 | font-open-sans bg-white dark:bg-gray-800">
        {children}
      </div>
      {/* <Fab /> */}
      <Footer />
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, events'
};
