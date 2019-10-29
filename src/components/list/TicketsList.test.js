import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import TicketsList from './TicketsList';

describe('TicketsList Component', () => {
  it('renders empty state if items.length===0', () => {
    const TicketsListComponent = renderer.create(
      <MemoryRouter>
        <TicketsList />
      </MemoryRouter>
      ).toJSON();
    expect(TicketsListComponent).toMatchSnapshot();
  });
});
