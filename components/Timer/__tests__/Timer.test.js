import React from 'react';
import Timer from '../index';
import { render, cleanup } from '@testing-library/react-native';

test('renders timer component...', () => {
  afterEach(cleanup);
  const screen = render(<Timer />);
  console.log(screen);
});

// test('renders timer component', () => {
//   const screen = render(<Timer test={true} />).toJSON();
//   console.log(screen);
//   expect(screen).toMatchSnapshot();
// });
