import React from 'react';
import renderer from 'react-test-renderer';
import Notes from './Notes';

describe('Notes Component', () => {
  const props = {
    action: undefined,
    notes: [],
    summary: false,
  };

  it('renders div with className "notes" component', () => {
    const NotesComponent = renderer.create(<Notes {...props}/>).toJSON();
    expect(NotesComponent).toMatchSnapshot();
  });
  // it('renders div with className "msgbox msgbox--inline" if summary prop is true', () => {
  //   const props = {
  //     summary: true,
  //   };
  //   const NotesComponent = shallow(<Notes {...props}/>).find('span');
  //   expect(NotesComponent).toHaveLength(1);
  // });
  it('renders div with className="msgbox msgbox--inline" if summary prop is true', () => {
    const props = {
      summary: true,
    };
    const NotesComponent = renderer.create(<Notes {...props}/>).toJSON();
    expect(NotesComponent).toMatchSnapshot();
  });
  it('renders notes array if notes exist', () => {
    const props = {
      notes: [1],
    };
    const NotesComponent = renderer.create(<Notes {...props}/>).toJSON();
    expect(NotesComponent).toMatchSnapshot();
  });
});
