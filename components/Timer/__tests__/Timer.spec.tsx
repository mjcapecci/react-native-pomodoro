import React from 'react';
import Timer from '..';
import { render, cleanup } from '@testing-library/react-native';

afterEach(cleanup);

test('renders timer component', () => {
  const tree = render(<Timer test={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
