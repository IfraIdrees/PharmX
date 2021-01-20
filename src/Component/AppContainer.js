import { Color, Responsive } from '../Helper'
import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export default class AppContainer extends PureComponent {
  render() {
    return (
      // <View style={styles.container}>
      //   <SafeAreaView>
      <View style={styles.otherContainer}>{this.props.children}</View>
      //   </SafeAreaView>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkskin
  },
  otherContainer: {
    width: '100%',
    height: '100%',
     backgroundColor:Color.darkbrown
  }
})
