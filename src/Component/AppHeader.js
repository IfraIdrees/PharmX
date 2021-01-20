import { Color, CommonStyles, Fonts, Images, Loader, Responsive, Screen, Storage, Utility } from '../Helper'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { PureComponent } from 'react'

import { Actions } from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class AppHeader extends PureComponent {

  componentDidMount = () => {

  }
  onPressMenuIcon = () => {
    const { isBack, onBackPress } = this.props
    if (isBack) {
      if (onBackPress) {
        onBackPress()
      }
      else {
        Actions.pop()
      }
    } else {
      Actions.drawerOpen()
    }
  }

  onPressIcon = () => {

  }
  loadimage = () => {
    const { profileImage } = this.props
    let profileimg = profileImage !== null ? { uri: profileImage } : Images.logo2
    // let imgpath = profileimg !== null ? { uri: profileimg } : null
    return (
      <Image style={styles.profileIcon} borderRadius={Responsive.widthPx(5)} source={profileimg} />
    )
  }
  render() {
    const { isBack, title } = this.props
    return (
      <View style={[styles.container, Platform.OS === 'ios' && { paddingTop: Responsive.heightPx(4) }]}>
        <TouchableOpacity style={styles.menuButton} onPress={this.onPressMenuIcon}>
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={isBack ? Images.left_arrow : Images.menu}
          />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text style={styles.headingText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => { Actions[Screen.ProfileScreen]() }}>
          {this.loadimage()}
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    height: Platform.OS === 'ios' ? Responsive.heightPx(10) : Responsive.heightPx(6),
    // ...CommonStyles.shadow,
  },
  menuButton: {
    height: '100%',
    aspectRatio: 1,
    ...CommonStyles.centerItem
  },
  profileButton: {
    height: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: Responsive.widthPx(26),
    ...CommonStyles.centerItem
  },
  menuIcon: {
    height: '50%',
    aspectRatio: 1
  },
  profileIcon: {
    height: Responsive.widthPx(10),
    width: Responsive.widthPx(10),

    // aspectRatio: 1
  },
  middleContainer: {
    flex: 1,
    ...CommonStyles.centerItem
  },
  headingText: {
    fontSize: Responsive.font(2.4),
    fontFamily: Fonts.regular,
    color: Color.darkbrown
  }
})
