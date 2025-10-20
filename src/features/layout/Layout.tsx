import React, { PropsWithChildren } from 'react';
import './Layout.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import Container from '@src/shared/components/Container/Container';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="c-layout">
    <header className="c-layout__header">
      <Container>
        <Header />
      </Container>
    </header>
    <main className="c-layout__main">{children}</main>
    <footer className="c-layout__footer">
      <Container>
        <Footer />
      </Container>
    </footer>
  </div>
);

export default Layout;
