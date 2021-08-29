import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App.tsx';
import Timer from '../components/Timer/index';

describe('<Timer />', () => {
  it('to match screenshot', () => {
    const tree = renderer
      .create(
        <App>
          <Timer />
        </App>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
