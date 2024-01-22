import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Goal } from './Goal';
import App from '../../App';

describe('Tests for Goal page', () => {
  test('should containe 4 "goal-card"', () => {
    render(
      <MemoryRouter>
        <Goal />
      </MemoryRouter>
    );
  
    expect(screen.getAllByTestId('goal-card').length).toBe(4);
  });

  test('goes to next page by card clicking', () => {
    render(
      <MemoryRouter initialEntries={['/goal']}>
        <App />
      </MemoryRouter>
    );

    const firstCard = screen.getAllByTestId('goal-card')[1];

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(screen.getByTestId('measurement')).toBeInTheDocument();
  });
});
