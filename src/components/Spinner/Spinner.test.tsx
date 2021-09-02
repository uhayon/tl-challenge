import { render } from '@testing-library/react';
import Spinner from './';

describe('Spinner', () => {
  it('Should render successfully', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
