import DisplayBooks from './DisplayBooks';
import { displayDataMock } from '../../../mock/mock-data';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('<DisplayBooks/>', () => {
  const renderComponent = () => {
    const utils = render(<DisplayBooks books={displayDataMock} />);

    return {
      ...utils,
    };
  };
  it('should render', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('should render mock data', () => {
    renderComponent();
    expect(screen.getByText(/W.J. May/i)).toHaveTextContent('W.J. May');
    expect(screen.getByText(/Payment for Sin/i)).toHaveTextContent('Payment for Sin');
  });
});
