import React from 'react'
import Timer from '..'
import { render, cleanup } from '@testing-library/react-native'
import { TimerContext, TimerContextProps } from '../TimerContextProviderV2'
import {
  activeRound,
  disabledTimer,
  inactiveRound,
  invisibleState,
  visibleState,
} from '../../../__mocks__/fixtures/Timer.fixture'
import { Provider } from 'react-native-paper'

afterEach(() => cleanup())

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mountForSnap(value: TimerContextProps) {
  return render(
    <Provider>
      <TimerContext.Provider value={value}>
        <Timer />
      </TimerContext.Provider>
    </Provider>,
  )
}

describe('Timer Component', () => {
  describe('when the app is mounting', () => {
    it('should render the Timer component', () => {
      const { toJSON } = mountForSnap(activeRound)
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('when the app is mounted', () => {
    describe('when round is set to active', () => {
      it('should render the timer component with an active round', () => {
        const { toJSON } = mountForSnap(activeRound)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('when round is set to inactive', () => {
      it('should render the timer component with an inactive round', () => {
        const { toJSON } = mountForSnap(inactiveRound)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('when the app state is visible', () => {
      describe('when round is set to active', () => {
        it('should render the timer component with an active round', () => {
          const { toJSON } = mountForSnap(visibleState)
          expect(toJSON()).toMatchSnapshot()
        })
      })

      describe('when round is set to not visible', () => {
        it('should render the timer component with an inactive round', () => {
          const { toJSON } = mountForSnap(invisibleState)
          expect(toJSON()).toMatchSnapshot()
        })
      })
    })
  })
})
