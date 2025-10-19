import { render, screen } from '@testing-library/react';
import Steps from './Steps';

describe('Steps component', () => {
  describe('when rendered multiple Steps.Item', () => {
    beforeEach(() => {
      render(
        <Steps id="stepTest">
          <Steps.Item title="Step 1" />
          <Steps.Item title="Step 2" isSelected />
          <Steps.Item title="Step 3" />
        </Steps>
      );
    });

    it('then render all items correctly', () => {
      const step = screen.getByLabelText('Paso 1: Step 2 de 3');
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByLabelText('Paso 0: Step 1 de 3')).toBeInTheDocument();
      expect(step).toBeInTheDocument();
      expect(screen.getByLabelText('Paso 2: Step 3 de 3')).toBeInTheDocument();
      expect(step.className).toContain('c-steps__item--is-selected');
    });
  });

  describe('when rendered single Steps.Item', () => {
    beforeEach(() => {
      render(
        <Steps id="stepTest">
          <Steps.Item title="Only Step" />
        </Steps>
      );
    });

    it('then renders only one step item', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByLabelText('Paso 0: Only Step de 1')).toBeInTheDocument();
    });
  });

  describe('when rendered with no children', () => {
    beforeEach(() => {
      render(<Steps id="stepTest" />);
    });

    it('then renders an empty list', () => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
