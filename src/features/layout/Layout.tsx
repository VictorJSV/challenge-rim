import React, { PropsWithChildren } from 'react';
import './layout.scss';
import AddressCardIcon from '@src/shared/svgs/address-card.svg?react';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="c-layout">
    <header className="c-layout__header">
      <AddressCardIcon />
      <h1>Mi App</h1>
    </header>
    <main className="c-layout__main">{children}</main>
  </div>
);

export default Layout;
