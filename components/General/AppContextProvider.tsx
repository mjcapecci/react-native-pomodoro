import * as React from 'react'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
  appVersion: string
  showNewVersionModal: boolean
  setShowNewVersionModal: (show: boolean) => void
}

const appState: State = {
  appVersion: '0.2',
  showNewVersionModal: false,
  setShowNewVersionModal: () => null,
}

const AppContext = React.createContext({ ...appState })

interface AppContextProviderProps {
  children: JSX.Element
}

export default function AppContextProvider({ children }: AppContextProviderProps): JSX.Element {
  const environment = Constants?.manifest?.extra?.environment

  React.useEffect(() => {
    if (environment === 'production' || environment === 'staging') {
      const fetchAppVersion = async (): Promise<string> => {
        const response = await fetch('https://mobile-apps-api.vercel.app/api/version')
        const data = await response.json()
        return data
      }

      const setLastCheckTime = async (): Promise<void> => {
        const lastCheckTime = Date.now()
        await AsyncStorage.setItem('lastCheckTime', lastCheckTime.toString())

        // check that the last version check took place more than 2 hours ago

        fetchAppVersion()
          .then((version) => {
            if (version !== appState.appVersion) {
              console.log('showing modal')
              appState.setShowNewVersionModal(true)
            }

            // update the last version check time
          })
          .catch((err) => console.log(err))
      }
    }
  }, [environment])

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}
