import { Platform, StyleSheet } from 'react-native'
import { Color } from '../Helper'

export const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Color.orange,
    elevation: 0,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    })
  },
  container: {
    flex: 1
  }
})
