import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import App from '../../App';

describe('Tests for Header', () => {
  test('should containe "Mentor" word', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  
    expect(screen.getByText(/Mentor/i)).toBeInTheDocument();
  });

  test('stay at Goal page with clicking back button', () => {
    render(
      <MemoryRouter initialEntries={['/goal']}>
        <App />
      </MemoryRouter>
    );

    fireEvent(
      screen.getByTestId('back'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(screen.getByTestId('goal')).toBeInTheDocument();
  });

  test('goes to Goal page with clicking back button being at Measurement page', () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement']}>
        <App />
      </MemoryRouter>
    );

    fireEvent(
      screen.getByTestId('back'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(screen.getByTestId('goal')).toBeInTheDocument();
  });

  test('goes to Measurement page with clicking back button being at Behaviors page', () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement/behaviors']}>
        <App />
      </MemoryRouter>
    );

    fireEvent(
      screen.getByTestId('back'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(screen.getByTestId('measurement')).toBeInTheDocument();
  });

  test('goes to Behaviors page with clicking back button being at Exercise page', () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement/behaviors/exercise']}>
        <App />
      </MemoryRouter>
    );

    fireEvent(
      screen.getByTestId('back'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(screen.getByTestId('behaviors')).toBeInTheDocument();
  });
});
