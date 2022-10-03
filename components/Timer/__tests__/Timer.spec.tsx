import React from 'react';
import Timer from '..';
import { render, cleanup } from '@testing-library/react-native';
import { TimerContext, TimerContextProps } from '../TimerContextProvider';
import {
  activeRound,
  disabledTimer,
  inactiveRound,
  invisibleState,
  visibleState,
} from '../../../__mocks__/fixtures/Timer.fixture';

afterEach(() => cleanup());

function mountForSnap(value: TimerContextProps) {
  return render(
    <TimerContext.Provider value={value}>
      <Timer />
    </TimerContext.Provider>
  );
}

describe('Timer Component', () => {
  describe('when the app is mounting', () => {
    it('should render the Timer component', () => {
      const { toJSON } = mountForSnap(activeRound);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('when the app is mounted', () => {
    describe('when the timer is disabled and is in a loading state', () => {
      it('should render the appropriate loading next round text', () => {
        const { toJSON } = mountForSnap(disabledTimer);
        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('when round is set to active', () => {
      it('should render the timer component with an active round', () => {
        const { toJSON } = mountForSnap(activeRound);
        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('when round is set to inactive', () => {
      it('should render the timer component with an inactive round', () => {
        const { toJSON } = mountForSnap(inactiveRound);
        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('when the app state is visible', () => {
      describe('when round is set to active', () => {
        it('should render the timer component with an active round', () => {
          const { toJSON } = mountForSnap(visibleState);
          expect(toJSON()).toMatchSnapshot();
        });
      });

      describe('when round is set to not visible', () => {
        it('should render the timer component with an inactive round', () => {
          const { toJSON } = mountForSnap(invisibleState);
          expect(toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});
