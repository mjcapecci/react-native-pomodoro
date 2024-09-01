import * as React from 'react'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { removeAllShownNotifications } from '../Notifications/notificationManager'
import { AppState } from 'react-native'

interface State {
  appVersion: string
  showNewVersionModal: boolean
  setShowNewVersionModal: (show: boolean) => void
}

const initialAppState: State = {
  appVersion: '1.0', // update here whenever a new version is released
  showNewVersionModal: false,
  setShowNewVersionModal: () => null,
}

interface AppVersionResponse {
  version: string
  updates: string[]
}

const AppContext = React.createContext({ ...initialAppState })

interface AppContextProviderProps {
  children: JSX.Element
}

function AppContextProvider({ children }: AppContextProviderProps): JSX.Element {
  const [lastVersionCheckTime, setLastVersionCheckTime] = React.useState<number>(0)
  const [showNewVersionModal, setShowNewVersionModal] = React.useState<boolean>(false)

  const environment = Constants?.expoConfig?.extra?.environment

  const shouldFetchAppVersion =
    lastVersionCheckTime !== 0 &&
    Date.now() - lastVersionCheckTime > 7200000 &&
    (environment === 'production' || environment === 'staging')

  React.useEffect(() => {
    async function updateLastVersionCheckTime(): Promise<void> {
      const lastCheckTime = (await AsyncStorage.getItem('lastCheckTime')) ?? ''
      setLastVersionCheckTime(parseInt(lastCheckTime) ?? 0)
    }
    updateLastVersionCheckTime().catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    const fetchAppVersion = async (): Promise<AppVersionResponse> => {
      const response = await fetch('https://mobile-apps-api.vercel.app/api/version')
      const data = await response.json()
      return data
    }

    if (shouldFetchAppVersion) {
      fetchAppVersion()
        .then((data) => {
          if (data.version !== initialAppState.appVersion) {
            setShowNewVersionModal(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [environment, lastVersionCheckTime, shouldFetchAppVersion])

  // when the app becomes active, use our notification manager to remove any notifatcions

  const handleAppStateChange = async (nextAppState: string): Promise<void> => {
    if (nextAppState === 'active') {
      await removeAllShownNotifications()
    }
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState) => await handleAppStateChange(nextAppState),
    )

    return () => {
      subscription.remove()
    }
  }, [handleAppStateChange])

  return (
    <AppContext.Provider
      value={{
        appVersion: initialAppState.appVersion,
        showNewVersionModal,
        setShowNewVersionModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
