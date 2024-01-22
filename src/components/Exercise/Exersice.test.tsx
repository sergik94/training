import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Exercise } from './Exercise';
import { UserInfoProvider } from '../UserInfoContext';

describe('Tests for Exersice page', () => {
  test('should containe 4 "exercise-card"', () => {
    render(
      <MemoryRouter>
        <Exercise />
      </MemoryRouter>
    );
  
    expect(screen.getAllByTestId('exercise-card').length).toBe(4);
  });

  test('card should be active by clicking', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Exercise />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const firstCard = screen.getAllByTestId('exercise-card')[0];

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    
    expect(firstCard).toHaveClass('exercise__card--active');
  });
});
