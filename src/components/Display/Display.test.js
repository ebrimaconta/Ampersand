/* eslint-disable testing-library/no-unnecessary-act */
import Display from './Display';
import { screen, render, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { displayDataMock } from '../../mock/mock-data';

describe('<Display/>', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        feed: {
          results: displayDataMock,
        },
      }),
    });
  });

  it('should render only one result after searching', async () => {
    render(<Display />);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: '1' } });
    fireEvent.click(searchButton);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('should render two result after searching by semi colon', async () => {
    render(<Display />);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: '1-2' } });
    fireEvent.click(searchButton);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('should render search result when searching by title', async () => {
    render(<Display />);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Chronicles of Devon' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/Chronicles of Devon/i)).toHaveTextContent('Chronicles of Devon');
  });
});
