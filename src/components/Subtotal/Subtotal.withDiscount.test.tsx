import { render, screen } from '@testing-library/react';
import Subtotal from './';
jest.mock('../../hooks/useDiscounts', () => ({
  useDiscounts: () => ({
    currentTier: { basePrice: 135, discount: 35 },
  }),
}));
describe('Subtotal', () => {
  describe('With Discount', () => {
    it('Should render after completing a discount tier', async () => {
      const view = render(<Subtotal />);

      view.rerender(<Subtotal />);
      const discountElement = await screen.findByText('Discount');
      expect(discountElement).toBeDefined();
    });
  });
});
