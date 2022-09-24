import React from 'react';
import Timer from '..';
import renderer from 'react-test-renderer';

test('renders timer component', () => {
  const tree = renderer.create(<Timer test={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
