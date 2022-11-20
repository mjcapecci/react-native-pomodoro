import * as React from 'react'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
  appVersion: string
  showNewVersionModal: boolean
  setShowNewVersionModal: (show: boolean) => void
}

const appState: State = {
  appVersion: '0.1', // update here whenever a new version is released
  showNewVersionModal: false,
  setShowNewVersionModal: () => null,
}

interface AppVersionResponse {
  version: string
  updates: string[]
}

const AppContext = React.createContext({ ...appState })

interface AppContextProviderProps {
  children: JSX.Element
}

export default function AppContextProvider({ children }: AppContextProviderProps): JSX.Element {
  const [lastVersionCheckTime, setLastVersionCheckTime] = React.useState<number>(0)

  React.useEffect(() => {
    async function updateLastVersionCheckTime(): Promise<void> {
      const lastCheckTime = (await AsyncStorage.getItem('lastCheckTime')) ?? ''
      setLastVersionCheckTime(parseInt(lastCheckTime) ?? 0)
    }
    updateLastVersionCheckTime().catch((err) => console.log(err))
  }, [])

  const environment = Constants?.manifest?.extra?.environment

  React.useEffect(() => {
    const fetchAppVersion = async (): Promise<AppVersionResponse> => {
      const response = await fetch('https://mobile-apps-api.vercel.app/api/version')
      const data = await response.json()
      return data
    }

    const shouldFetchAppVersion =
      lastVersionCheckTime !== 0 &&
      Date.now() - lastVersionCheckTime > 7200000 &&
      (environment === 'production' || environment === 'staging')

    if (shouldFetchAppVersion) {
      fetchAppVersion()
        .then((data) => {
          if (data.version !== appState.appVersion) {
            appState.setShowNewVersionModal(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [environment, lastVersionCheckTime])

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}
