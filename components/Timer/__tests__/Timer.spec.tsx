import React from 'react';
import Timer from '..';
import { render, cleanup, act } from '@testing-library/react-native';
import {
  TimerContext,
  TimerContextProps,
  TimerContextProvider,
} from '../TimerContextProvider';
import { activeRound } from '../../../__mocks__/fixtures/Timer.fixture';

afterEach(() => cleanup());

function mountForSnap(value: TimerContextProps) {
  return render(
    <TimerContext.Provider value={value}>
      <Timer />
    </TimerContext.Provider>
  );
}

function mountForAction() {
  return render(
    <TimerContextProvider>
      <Timer />
    </TimerContextProvider>
  );
}

describe('Timer Component', () => {
  it('renders properly on mount', () => {
    const tree = render(<Timer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders properly when active', async () => {
    const tree = mountForSnap(activeRound).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can switch from inactive to active', async () => {
    jest.useFakeTimers();
    const tree = mountForAction().toJSON();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(tree).toMatchSnapshot();
  });
});
