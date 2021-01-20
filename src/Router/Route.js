import React, { PureComponent } from 'react'
import { BackHandler, StatusBar, View } from 'react-native'
import { Actions, Router, Scene, Stack, Tabs } from 'react-native-router-flux'
import AppTabView from '../Component/AppTabView'
import drawerContent from '../Component/Drawer'
import { Color, Emitter, Responsive, Screen } from '../Helper'
import {
  DashBoardScreen,
  LoginScreen,
  PaperScreen,
  QuestionsScreen,
  RegisterScreen,
  ContactUsScreen,
  RulesScreen,
  ForgotPasswordScreen,
  FaqScreen,
  ReviewScreen,
  ProfileScreen,
  SubscribePosterScreen,
  BookmarkScreen,
  PaperStatisticsScreen,
  UpdateDetailsScreen,
  NotificationScreen,
} from '../Screen'

import { styles } from './RouteStyle'

class Route extends PureComponent {
  onTabActive = (index) => {
    Emitter.emit('@changeTab', index)
  }

  backAction = () => {
    let screeName = Actions.currentScene
    console.log('screen name => ', screeName)
    if (screeName === Screen.DashBoardScreen) {
      BackHandler.exitApp()
    } else {
      return true
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.backAction)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction)
  }

  render() {
    return (
      // <View style={styles.container}>
      // <StatusBar barStyle="default" />
      <Router navigationBarStyle={styles.navBar}>
        <Stack hideNavBar>
          <Stack key={'loginRoot'} initial={!global.isLogin} type="reset">
            <Scene
              key={Screen.LoginScreen}
              component={LoginScreen}
              hideNavBar
              initial
            />
            <Scene key={Screen.RegisterScreen} component={RegisterScreen} hideNavBar />
            <Scene key={Screen.ForgotPasswordScreen} component={ForgotPasswordScreen} hideNavBar />
          </Stack>

          <Stack key="root" gesturesEnabled={false} initial={global.isLogin} type="reset">
            <Scene
              key="drawer"
              drawer={true}
              contentComponent={drawerContent}
              drawerWidth={Responsive.widthPx(75)}
              hideNavBar
              initial={global.isLogin}

            >
              <Stack hideNavBar>
                <Tabs
                  key={Screen.TabViewScreen}
                  tabBarPosition="bottom"
                  tabBarComponent={AppTabView}
                  hideNavBar
                  lazy
                  initial={global.isLogin}
                >
                  <Stack hideNavBar>
                    <Scene
                      key={Screen.DashBoardScreen}
                      component={DashBoardScreen}
                      hideNavBar
                      onEnter={() => this.onTabActive(0)}
                      initial={global.isLogin}
                    />
                    <Scene
                      key={Screen.BookmarkScreen}
                      component={BookmarkScreen}
                      hideNavBar
                      onEnter={() => this.onTabActive(1)}
                    />
                    <Scene
                      key={Screen.NotificationScreen}
                      component={NotificationScreen}
                      hideNavBar
                      onEnter={() => this.onTabActive(3)}
                    />
                    <Scene
                      key={Screen.ProfileScreen}
                      component={ProfileScreen}
                      hideNavBar
                      onEnter={() => this.onTabActive(4)}
                    />
                  </Stack>
                </Tabs>
                <Scene key={Screen.PaperScreen} component={PaperScreen} hideNavBar />
                <Scene key={Screen.RulesScreen} component={RulesScreen} hideNavBar />
                <Scene key={Screen.QuestionsScreen} component={QuestionsScreen} hideNavBar />
                <Scene key={Screen.ContactUsScreen} component={ContactUsScreen} hideNavBar />
                <Scene key={Screen.FaqScreen} component={FaqScreen} hideNavBar />
                <Scene key={Screen.SubscribePosterScreen} component={SubscribePosterScreen} hideNavBar />
                <Scene key={Screen.PaperStatisticsScreen} component={PaperStatisticsScreen} hideNavBar />
                <Scene key={Screen.UpdateDetailsScreen} component={UpdateDetailsScreen} hideNavBar />
              </Stack>
            </Scene>
          </Stack>
          <Stack key={Screen.ReviewScreen} gesturesEnabled={false} type="reset">
            <Scene key={Screen.ReviewScreen} component={ReviewScreen} hideNavBar initial />
          </Stack>
        </Stack>
      </Router >
      // </View >
    )
  }
}

export default Route
