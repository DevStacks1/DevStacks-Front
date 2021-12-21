import React from 'react';
import PrivateRoute from 'components/PrivateRoute';
import { render, screen } from '@testing-library/react';
import { UserContext } from 'context/userContext';

it('renders not authorized if the roles dont match', () => {
  render(
    <UserContext.Provider value={{ userData: { Role: 'LEADER' } }}>
      <PrivateRoute roleList={['ADMINISTRATOR']}>
        <div>Este es el children</div>
      </PrivateRoute>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('not-authorized')).toHaveTextContent(
    'No estás autorizado para ver este sitio.'
  );
});

it('renders the children if the user role is in the roleList', () => {
  render(
    <UserContext.Provider value={{ userData: { Role: 'ADMINISTRATOR' } }}>
      <PrivateRoute roleList={['ADMINISTRATOR']}>
        <div data-testid='children'>Este es el children</div>
      </PrivateRoute>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('children')).toBeInTheDocument();
});