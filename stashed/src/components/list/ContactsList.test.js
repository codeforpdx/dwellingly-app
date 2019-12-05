import React from 'react';
import renderer from 'react-test-renderer';
import ContactsList from './ContactsList';

describe('ContactsList Component', () => {
  it('renders empty div if no items exist', () => {
    const ContactsListComponent = renderer.create(<ContactsList />).toJSON();
    expect(ContactsListComponent).toMatchSnapshot();
  });
  it('renders contacts if items prop exists', () => {
    const props = {
      items: [{}],
    }
    const ContactsListComponent = renderer.create(<ContactsList {...props} />).toJSON();
    expect(ContactsListComponent).toMatchSnapshot();
  });
});
