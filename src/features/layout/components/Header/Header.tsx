import './Header.scss';
import Logo from '@src/assets/svgs/logo.svg?react';
import IconPhone from '@src/assets/svgs/icon-phone.svg?react';

export const Header = () => (
  <div className="c-header">
    <Logo />
    <div className="c-header__information">
      <p className="c-header__text">¡Compra por este medio!</p>
      <div className="c-header__phone-container">
        <IconPhone />
        <span className="c-header__phone">(01) 411 6001</span>
      </div>
    </div>
  </div>
);
