import { useTranslation } from 'next-i18next';
import { Transition } from '@headlessui/react';

const Showcase = () => {
  const { t } = useTranslation('common');

  return (
    <div
      className="flex flex-col place-content-center | bg-no-repeat bg-center bg-black | h-72 w-full p-2 | text-white text-center | relative"
      style={{ backgroundImage: `url("/images/showcase.jpg")` }}
    >
      <span className="absolute top-0 left-0 w-full h-full bg-black opacity-70" />
      <div className="z-20">
        <h1 className="text-4xl">{t('welcome')}</h1>
        <h2 className="mt-5">{t('welcome-sub')}</h2>
      </div>
    </div>
  );
};

export default Showcase;
