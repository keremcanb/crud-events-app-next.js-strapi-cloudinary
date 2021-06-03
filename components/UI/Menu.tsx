import { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import AuthContext from '@/context/AuthContext';

const Menu = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation('common');

  return (
    <>
      <Link href="/events">
        <a>{t('menu-events')}</a>
      </Link>
      {user && (
        <>
          <Link href="/account/dashboard">
            <a>{t('menu-dashboard')}</a>
          </Link>
          <Link href="/events/add">
            <a>{t('menu-add')}</a>
          </Link>
        </>
      )}
    </>
  );
};

export default Menu;
