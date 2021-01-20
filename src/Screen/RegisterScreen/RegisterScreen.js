import { CommonStyles, Loader, Responsive, Storage, Utility } from '../../Helper'
import {
  Image,
  Keyboard,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { Component } from 'react'

import APICall from '../../Network/APICall'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import Color from '../../Helper/Color'
import EndPoints from '../../Network/EndPoints'
import Images from '../../Helper/Images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Screen from '../../Helper/Screen'
import { styles } from './RegisterScreenStyle'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPassVisible: false,
      isConfirmPassVisible: false
    }
  }


  onPressTogglePass = () => {
    this.setState({ isPassVisible: !this.state.isPassVisible })
  }

  onPressTogglePassConfimPwd = () => {
    this.setState({ isConfirmPassVisible: !this.state.isConfirmPassVisible })
  }

  onPressRegister = () => {
    const { name, email, confirmPassword, password } = this.state
    if (!name) {
      Utility.showToast('Enter Your Name')
      return
    }
    const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    if (!email || !reg.test(email)) {
      Utility.showToast('Enter Valid Email Address')
      return
    }
    if (!password) {
      Utility.showToast('Enter Password')
      return
    }
    if (password !== confirmPassword) {
      Utility.showToast('Confirm password not same')
      return
    }
    // if (!number) {
    //   Utility.showToast('Enter Valid Mobile Number')
    //   return
    // }
    const payload = {
      name,
      email,
      password,
      loggedTimeLatitude: '22.151236',
      loggedTimelongitude: '52.124568',
      // mobileNumber: number,
      // mobileCountryCode: '+91'
    }
    Loader.isLoading(true)
    APICall('post', payload, EndPoints.register)
      .then((response) => {
        if (response.status === 200 && response.data) {
          Utility.showToast("Registration complete")
          Loader.isLoading(false)
          Actions.replace(Screen.LoginScreen)
        } else {
          Loader.isLoading(false)
          Utility.showToast(response.data.message)
        }
      })
      .catch(() => Loader.isLoading(false))
  }

  renderTopLogoView = () => {
    return (
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logoImg} resizeMode="contain" />
      </View>
    )
  }

  renderBoxView = () => {
    const { name, email, password, confirmPassword, isConfirmPassVisible, isPassVisible } = this.state
    return (
      <View style={styles.boxContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>NAME</Text>
          <View style={[styles.inputBox, { paddingVertical: Responsive.heightPx(0.5) }]}>
            <TextInput
              style={styles.inputView}
              value={name}
              onChangeText={(name) => this.setState({ name })}
              onSubmitEditing={() => this.email.focus()}
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={[styles.inputContainer, styles.mt25]}>
          <Text style={styles.labelText}>EMAIL</Text>
          <View style={[styles.inputBox, { paddingVertical: Responsive.heightPx(0.5), }]}>
            <TextInput
              style={styles.inputView}
              ref={(ref) => (this.email = ref)}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
              onSubmitEditing={() => this.password.focus()}
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={[styles.inputContainer, styles.mt25]}>
          <Text style={styles.labelText}>PASSWORD</Text>
          <View style={[styles.inputBox, styles.inputBoxPass]}>
            <TextInput
              style={styles.inputView}
              value={password}
              secureTextEntry={!isPassVisible}
              ref={(ref) => (this.password = ref)}
              onSubmitEditing={() => this.confirmPassword.focus()}
              onChangeText={(password) => this.setState({ password })}
              returnKeyType="next"
            />
            <TouchableOpacity style={styles.eyeContainer} onPress={this.onPressTogglePass}>
              <Image
                style={styles.eyeImg}
                source={isPassVisible ? Images.visibility : Images.invisible}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputContainer, styles.mt25]}>
          <Text style={styles.labelText}>CONFIRM PASSWORD</Text>
          <View style={[styles.inputBox, styles.inputBoxPass]}>
            <TextInput
              style={styles.inputView}
              value={confirmPassword}
              secureTextEntry={!isConfirmPassVisible}
              ref={(ref) => (this.confirmPassword = ref)}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              returnKeyType="next"
            />
            <TouchableOpacity style={styles.eyeContainer} onPress={this.onPressTogglePassConfimPwd}>
              <Image
                style={styles.eyeImg}
                source={isConfirmPassVisible ? Images.visibility : Images.invisible}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={[styles.inputContainer, styles.mt25]}>
          <Text style={styles.labelText}>MOBILE NUMBER</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputView}
              ref={(ref) => (this.number = ref)}
              value={number}
              onChangeText={(number) => this.setState({ number })}
              keyboardType="phone-pad"
              onSubmitEditing={() => Keyboard.dismiss()}
              returnKeyType="done"
            />
          </View>
        </View> */}
        <View style={CommonStyles.btnView}>
          <AppButton
            label="Register"
            onPress={this.onPressRegister}
          />
        </View>
      </View>
    )
  }

  renderBottomView = () => {
    return (
      <View style={styles.bottomView}>
        <Text style={styles.notAccountText}>By tapping ‘Register’, you agree to our</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginBottom: Responsive.heightPx(2) }}>
          <Text style={styles.underline} onPress={() => Linking.openURL('https://pharmx.co.uk/privacy/')}>Privacy Policy</Text>
          <Text style={styles.notAccountText}> and </Text>
          <Text style={styles.underline} onPress={() => Linking.openURL('https://pharmx.co.uk/terms-of-service/')}>Terms</Text>
        </View>
        <Text style={[styles.alreadyText, { marginTop: Responsive.heightPx(2) }]}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.registerView}
          onPress={() => Actions.replace(Screen.LoginScreen)}
        >
          <Text style={styles.registerText}>Login here</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        // colors={[Color.darkbrown, Color.darkbrown]}
        colors={[Color.darkbrown, Color.blackish]}
        style={styles.container}
      >
        <SafeAreaView>
          <KeyboardAwareScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
          >
            <View style={styles.innerView}>
              {this.renderTopLogoView()}
              {this.renderBoxView()}
              {this.renderBottomView()}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}
