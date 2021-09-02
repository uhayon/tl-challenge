import { render, screen } from '@testing-library/react';
import Subtotal from './';

describe('Subtotal', () => {
  it('Should render successfully', () => {
    const { container } = render(<Subtotal />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  describe('Without Discount', () => {
    beforeAll(() => {
      jest.mock('../../hooks/useDiscounts', () => ({
        useDiscounts: () => ({
          currentTier: null,
        }),
      }));
      jest.resetAllMocks();
      jest.restoreAllMocks();
      jest.resetModuleRegistry();
      jest.resetModules();
    });
    it('Should not render', () => {
      render(<Subtotal />);
      const discountElement = screen.queryByText('Discount');
      expect(discountElement).toBeNull();
    });
  });
});
