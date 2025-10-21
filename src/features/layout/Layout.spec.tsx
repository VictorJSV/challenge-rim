import { render, screen } from '@testing-library/react';
import Layout from './Layout';

jest.mock('./components/Header/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));
jest.mock('./components/Footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe('Layout', () => {
  it('when rendered, then displays correctly', () => {
    render(
      <Layout>
        <div data-testid="child">Lorem</div>
      </Layout>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
