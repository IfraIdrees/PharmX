import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native'
import { Color, CommonStyles, Emitter, Images, Responsive, Screen } from '../Helper'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

const tabIconList = [
  { icon: Images.tab1, action: Screen.DashBoardScreen },
  { icon: Images.tab2, action: Screen.BookmarkScreen },
  { icon: Images.tab3, action: Screen.PaperScreen },
  { icon: Images.tab4, action: Screen.NotificationScreen },
  { icon: Images.tab5, action: Screen.ProfileScreen }
]

export default class AppTabView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  componentDidMount() {
    Emitter.addListener('@changeTab', (activeTab) => {
      this.setState({ activeTab })
    })
  }

  onPressTab = (item, activeTab) => {
    this.setState({ activeTab })
    // if (activeTab === 3) {
    //   Alert.alert('Pharmx', 'work in progress')
    // } else {
    Actions.jump(item.action)
    // }
  }

  render() {
    const { activeTab } = this.state
    return (
      <View style={styles.container}>
        {_.map(tabIconList, (item, index) => {
          const isChecked = activeTab === index
          if (index === 2) {
            return (
              <TouchableOpacity
                style={styles.tabBigIcon}
                onPress={() => this.onPressTab(item, index)}
              >
                <Image resizeMode="contain" style={styles.tabBigImg} source={item.icon} />
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity style={styles.tabIcon} onPress={() => this.onPressTab(item, index)}>
              <Image
                resizeMode="contain"
                style={[
                  styles.tabImg,
                  isChecked ? { tintColor: Color.blueShade00 } : { tintColor: Color.darkTabbar }
                ]}
                source={item.icon}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Responsive.widthPx(100),
    height: Responsive.heightPx(11),
    marginTop: Platform.OS === 'ios' ? Responsive.heightPx(0.20) : Responsive.heightPx(0.10),
    // marginBottom: Platform.OS === 'ios' ? Responsive.heightPx(2) : Responsive.heightPx(1),
    // ...CommonStyles.tabbarShadow
  },
  tabIcon: {
    width: Responsive.widthPx(10),
    aspectRatio: 1,
    ...CommonStyles.centerItem
  },
  tabImg: {
    height: '60%',
    aspectRatio: 1
  },
  tabBigImg: {
    width: Responsive.widthPx(15),
    height: Responsive.widthPx(15),
    // marginTop: 10
  },
  tabBigIcon: {
    width: Responsive.widthPx(15),
    height: Responsive.heightPx(15),
    aspectRatio: 1,
    ...CommonStyles.centerItem,
  }
})
