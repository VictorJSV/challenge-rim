import Logo from '@src/assets/svgs/logo.svg?react';
import LogoLong from '@src/assets/svgs/logo-long.svg?react';

export const Footer = () => (
  <div className="py-8 md:px-6 flex flex-col md:flex-row items-center gap-6 md:justify-between">
    <Logo fill='white' className='hidden md:block' />
    <LogoLong className='block md:hidden' />
    <hr className="border-gray-80 w-full md:hidden" />
    <p className="c-footer__text text-xs font-normal">© 2024 Rímac Seguros y Reaseguros.</p>
  </div>
);
