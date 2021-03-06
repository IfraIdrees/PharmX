import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Color, CommonStyles, Fonts, Responsive } from '../Helper'
import React, { PureComponent } from 'react'

import LinearGradient from 'react-native-linear-gradient'

interface AppButtonProps {
  containerStyle?: Object;
  labelStyle?: Object;
  onPress?: Function;
  label?: String;
  disable?: Boolean;
}

export default class AppButton extends PureComponent<AppButtonProps> {

  render() {
    const { containerStyle, labelStyle, label, onPress, disable } = this.props
    return (
      <TouchableOpacity style={[{ borderRadius: 50, ...CommonStyles.shadowBtn }]} onPress={() => (onPress ? onPress() : {})} disabled={disable}>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          //locations={[0.0, 0.1, 1.0]}
          colors={[Color.darkbrown, Color.blackish]}
          style={[styles.container, containerStyle]}
        >
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

AppButton.defaultProps = {
  containerStyle: {},
  labelStyle: {},
  label: '',
  disable: false
}

const styles = StyleSheet.create({
  container: {
    width: Responsive.widthPx(70),
    height: Responsive.heightPx(6),
    alignSelf: 'center',
    borderRadius: 50,
    ...CommonStyles.centerItem,
    ...CommonStyles.shadowBtn
  },
  labelStyle: {
    fontSize: Responsive.font(2.2),
    color: Color.darkskin,
    fontFamily: Fonts.extraBold
  }
})
