import { rest } from 'msw';
import { User } from '../services/userApiClient';
import { resetHandlers } from '@test/mock-server';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../main.routes';

function buildUser(): User {
  return {
    id: 1,
    firstName: 'Tom',
    lastName: 'Marien',
    email: 'tom.marien@euri.com',
    age: 45,
    homeAddress: {
      addressLine: 'Edith Cavelllaan 16',
      city: "Sint-Job-in-'t-Goor",
      zip: 'B2960',
    },
  };
}

it('should show the user', async () => {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'] })} />);
  const user = buildUser();

  resetHandlers(rest.get('http://localhost:8080/users/1', (_req, res, ctx) => res(ctx.json(user))));

  await waitFor(() => screen.getByTestId('data'));
  expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(user));
});

it('should throw error', async () => {
  resetHandlers(rest.get('http://localhost:8080/users/16452452', (_req, res, ctx) => res(ctx.status(404))));
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'] })} />);

  const alert = screen.queryAllByRole('alert', { name: 'Oops something went wrong!!' });

  await waitFor(() => expect(alert).toBeInTheDocument());
});
