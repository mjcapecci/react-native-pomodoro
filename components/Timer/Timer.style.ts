import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  timeHeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  timeHeader: {
    fontSize: 84,
    color: '#fff',
    marginBottom: 5,
    fontVariant: ['tabular-nums'],
    borderLeftWidth: 4,
    borderRightWidth: 4,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
    margin: 3,
  },
  actionButton: {
    marginTop: 60,
    background: 'none',
  },
  skipButton: {
    marginTop: 30,
    background: 'none',
  },
  hideSkip: {
    display: 'none',
  },
  loadingCaption: {
    color: '#fff',
    marginBottom: 25,
    fontSize: 24,
  },
})
