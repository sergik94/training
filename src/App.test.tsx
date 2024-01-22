import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe("Tests for App Router", () => {
  test("Should render page header and Goal page on default route", () => {
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("goal")).toBeInTheDocument();
  });

  test("Should render page header and Measurement page for measurement route", () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement']}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("measurement")).toBeInTheDocument();
  });

  test("Should render page header and Behaviors page for behaviors route", () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement/behaviors']}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("behaviors")).toBeInTheDocument();
  });

  test("Should render page header and Exercise page for exercise route", () => {
    render(
      <MemoryRouter initialEntries={['/goal/measurement/behaviors/exercise']}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("exercise")).toBeInTheDocument();
  });
});
