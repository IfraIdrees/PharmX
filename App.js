/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react'
import { Text, LogBox, View } from 'react-native'
import { Loader, Storage } from './src/Helper'
import AppLoader from './src/Component/AppLoader'
import Route from './src/Router/Route'
import SplashScreen from 'react-native-splash-screen'
import { SnackProvider } from 'react-native-snackbar-reddit'
import { createDb } from './src/Helper/RealMdb'
LogBox.ignoreAllLogs()
console.reportErrorsAsExceptions = false
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    createDb();
    Storage.getUserData()
    setTimeout(() => {
      this.setState({ isLoaded: true })
      SplashScreen.hide()
    }, 1000)
  }

  render() {
    const { isLoaded } = this.state
    return (
      <>
        <AppLoader ref={(e) => Loader.setLoader(e)} />
        <View style={{ flex: 1 }}>
          <SnackProvider>{isLoaded && <Route />}</SnackProvider>
        </View>
      </>
    )
  }
}

export default App
