import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App.tsx';

describe('<App />', () => {
  it('to match screenshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
