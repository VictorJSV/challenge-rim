import Logo from '@src/assets/svgs/logo.svg?react';
import LogoLong from '@src/assets/svgs/logo-long.svg?react';
import './Footer.scss';

export const Footer = () => (
  <div className="c-footer">
    <Logo fill='white' className='c-footer__logo' />
    <LogoLong className='c-footer__logo-long' />
    <hr className="c-footer__divider" />
    <p className="c-footer__text">© 2024 Rímac Seguros y Reaseguros.</p>
  </div>
);
