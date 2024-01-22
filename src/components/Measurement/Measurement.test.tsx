import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Measurement } from './Measurement';
import App from '../../App';
import { UserInfoProvider } from '../UserInfoContext';

describe('Tests for Measurement page', () => {
  test('imperial system should be by default', () => {
    render(
      <MemoryRouter>
        <Measurement />
      </MemoryRouter>
    );
    
    expect(screen.getAllByTestId('label')[0]).toHaveTextContent(/imperial/i);
    expect(screen.getAllByTestId('label')[1]).toHaveTextContent(/metric/i);
    expect(screen.getAllByTestId('label')[0]).toHaveClass('measurement__unit-label--active');
    expect(screen.getAllByTestId('label')[1]).not.toHaveClass('measurement__unit-label--active');
  });

  test('measurement system can be changed', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Measurement />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const metric = screen.getAllByTestId('label')[1];

    fireEvent(
      metric,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    
    expect(screen.getAllByTestId('label')[0]).not.toHaveClass('measurement__unit-label--active');
    expect(screen.getAllByTestId('label')[1]).toHaveClass('measurement__unit-label--active');
  });

  test('continue button must be enabled after entering digits in the inputfields', () => {
    render(
      <MemoryRouter>
        <UserInfoProvider>
          <Measurement />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const inputHeight = screen.getByTestId('input-height') as HTMLInputElement;
    const inputWeight = screen.getByTestId('input-weight') as HTMLInputElement;
    const continueButton = screen.getByTestId('continue') as HTMLButtonElement;

    expect(continueButton).toBeDisabled();

    fireEvent.change(inputHeight, {target: {value: 1}});
    fireEvent.change(inputWeight, {target: {value: 1}});
    expect(continueButton).toBeEnabled();

    fireEvent.change(inputHeight, {target: {value: 1}});
    fireEvent.change(inputWeight, {target: {value: 'a'}});
    expect(continueButton).toBeDisabled();

    fireEvent.change(inputHeight, {target: {value: 'a'}});
    fireEvent.change(inputWeight, {target: {value: 1}});
    expect(continueButton).toBeDisabled();
  });

  test('continue button must route to next page', () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement']}>
        <UserInfoProvider>
          <App />
        </UserInfoProvider>
      </MemoryRouter>
    );

    const inputHeight = screen.getByTestId('input-height') as HTMLInputElement;
    const inputWeight = screen.getByTestId('input-weight') as HTMLInputElement;
    const continueButton = screen.getByTestId('continue') as HTMLButtonElement;

    fireEvent.change(inputHeight, {target: {value: 1}});
    fireEvent.change(inputWeight, {target: {value: 1.2}});
    expect(continueButton).toBeEnabled();

    fireEvent(
      continueButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(screen.getByTestId('behaviors')).toBeInTheDocument();
  });
});
