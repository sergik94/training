import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Behaviors } from './Behaviors';
import App from '../../App';
import { UserInfoProvider } from '../UserInfoContext';

describe('Tests for Goal page', () => {
  test('should containe 6 "behavior-card"', () => {
    render(
      <MemoryRouter>
        <Behaviors />
      </MemoryRouter>
    );
  
    expect(screen.getAllByTestId('behavior-card').length).toBe(6);
  });

  test('card should be active by clicking and disactive after clicking one more', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Behaviors />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const firstCard = screen.getAllByTestId('behavior-card')[0];
    const secondCard = screen.getAllByTestId('behavior-card')[1];

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    
    expect(firstCard).toHaveClass('behaviors__card--active');

    fireEvent(
      secondCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    
    expect(secondCard).toHaveClass('behaviors__card--active');

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    
    expect(firstCard).not.toHaveClass('behaviors__card--active');
  });

  test('continue button must be disabled when cards are not selected', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Behaviors />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const continueButton = screen.getByTestId('continue') as HTMLButtonElement;

    expect(continueButton).toBeDisabled();
  });

  test('continue button must be ensabled by clicking one and more cards', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Behaviors />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const continueButton = screen.getByTestId('continue') as HTMLButtonElement;
    const firstCard = screen.getAllByTestId('behavior-card')[0];
    const secondCard = screen.getAllByTestId('behavior-card')[1];

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(continueButton).toBeEnabled();

    fireEvent(
      secondCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(continueButton).toBeEnabled();
  });

  test('continue button must route to next page', () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement/behaviors']}>
        <UserInfoProvider>
          <App />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const firstCard = screen.getAllByTestId('behavior-card')[0];
    const continueButton = screen.getByTestId('continue') as HTMLButtonElement;

    fireEvent(
      firstCard,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(continueButton).toBeEnabled();

    fireEvent(
      continueButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(screen.getByTestId('exercise')).toBeInTheDocument();
  });
});
