import { Alert, Image, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CommonStyles, Loader, Responsive, Storage, Utility } from '../../Helper'
import React, { Component } from 'react'

import APICall from '../../Network/APICall'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import Auth0 from 'react-native-auth0';
import Color from '../../Helper/Color'
import EndPoints from '../../Network/EndPoints'
import Images from '../../Helper/Images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Screen from '../../Helper/Screen'
import infoStrings from '../../Assets/strings'
import { setToken } from '../../Helper/NotificationServies'
import { showAlert } from '../../Helper/Alert'
import { styles } from './LoginScreenStyle'

const auth0 = new Auth0({ domain: infoStrings.auyhdomain, clientId: infoStrings.authclientId });

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isPassVisible: false,
      emailReceive: false,
      socialLoginResponse: null,
      socialLoginType: null,
    }
  }
  onPressfb = () => {
    // Alert.alert('Parmax', 'Work in progress')
    Loader.isLoading(true)
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        connection: 'facebook',
      })
      .then(
        credentials => {
          console.log('Auth0 Credential :==> \n', JSON.stringify(credentials));
          let idToken = credentials.accessToken;
          auth0.auth
            .userInfo({ token: idToken })
            .then(userData => {
              console.log('User Data From Auth0 :===> \n', JSON.stringify(userData));
              this.setState({ socialLoginResponse: userData, socialLoginType: 'facebook' }, () => {
                this.registerAfterSocialLogin()
              })
            })
            .catch(() => Loader.isLoading(false))
        }
      )
      .catch(error => {
        console.log('Auth0 Error :==> \n', error);
        Loader.isLoading(false)
      });

  };

  onPresstwitter = () => {
    Loader.isLoading(true)
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        connection: 'twitter',
      })
      .then(
        credentials => {
          console.log('Auth0 Credential :==> \n', JSON.stringify(credentials));
          let idToken = credentials.accessToken;
          auth0.auth
            .userInfo({ token: idToken, scope: 'email' })
            .then(userData => {
              console.log('User Data From Auth0 :===> \n', JSON.stringify(userData));
              this.setState({ socialLoginResponse: userData, socialLoginType: 'twitter' }, () => {
                this.registerAfterSocialLogin()
              })
            })
            .catch(() => Loader.isLoading(false))
        })
      .catch((error) => {
        Loader.isLoading(false)
        console.log('Auth0 Error :==> \n', JSON.stringify(error));

      })
  };

  registerAfterSocialLogin = () => {
    Loader.isLoading(false)
    const { socialLoginResponse, socialLoginType } = this.state
    if (socialLoginResponse.email !== '' && socialLoginResponse.email !== undefined && socialLoginResponse.email !== null) {
      const payload = {
        email: socialLoginResponse.email,
        socialId: socialLoginResponse.sub,
        loginType: socialLoginType,
        name: socialLoginResponse.name
      }
      this.loginApiCall(payload);
      // APICall('post', payload, EndPoints.login)
      //   .then((response) => {
      //     if (response.status === 200 && response.data) {
      //       Utility.showToast("Login successful")
      //       Loader.isLoading(false)
      //       Storage.setUserData({ ...response.data.data, token: response.data.token })
      //       Actions.replace('root')
      //     }
      //     else {
      //       Utility.showToast(response.data.message)
      //       Loader.isLoading(false)
      //     }
      //     Loader.isLoading(false)
      //   })
      //   .catch(() => Loader.isLoading(false))
    } else {
      Loader.isLoading(false)
      this.setState({ emailReceive: true })
      // Actions[Screen.RegisterScreen]({ socialRegister: true, socialData: res, scoialLoginType: loginType })
    }
  }


  onPressAfterEmail = () => {
    const { socialLoginType, socialLoginResponse, email } = this.state
    const payload = {
      email,
      socialId: socialLoginResponse.sub,
      loginType: socialLoginType,
      name: socialLoginResponse.name
    }
    this.loginApiCall(payload);
  }

  loginApiCall = (payload) => {
    console.log('payload => ', payload)
    APICall('post', payload, EndPoints.login)
      .then((response) => {
        if (response.status === 200 && response.data) {
          Loader.isLoading(false)
          Utility.showToast("Login successful")
          Storage.setUserData({ ...response.data.data, token: response.data.token })
          Actions.replace('root')
        }
        else {
          Utility.showToast(response.data.message)
          Loader.isLoading(false)
        }
      })
      .catch(() => Loader.isLoading(false))
    Loader.isLoading(false)
  }

  onPressTogglePass = () => {
    this.setState({ isPassVisible: !this.state.isPassVisible })
  }
  onPressForgotPassword = () => {
    Actions[Screen.ForgotPasswordScreen]()
  }



  onPressLogin = () => {
    const { email, password } = this.state
    const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    if (!email || !reg.test(email)) {
      Utility.showToast('Enter Valid Email Address')
      return
    }
    if (!password) {
      Utility.showToast('Enter Password')
      return
    }
    const payload = {
      email,
      password
    }
    Loader.isLoading(true)
    this.loginApiCall(payload)
    Loader.isLoading(false)
  }

  // onPressApple = () => {
  //   Loader.isLoading(true)
  //   auth0
  //     .webAuth
  //     .authorize({
  //       scope: 'openid profile email',
  //       // audience: 'https://dev-qxe8usi3.us.auth0.com/userinfo',
  //       connection: 'apple',
  //     })
  //     .then((credentials) => {
  //       console.log('apple login userToken => ', credentials.accessToken)
  //       auth0.auth.userInfo({ token: credentials.accessToken })
  //         .then((userData) => {
  //           console.log('user Data Fetch => ', JSON.stringify(userData))
  //           this.setState({ socialLoginResponse: userData, socialLoginType: 'apple' }, () => {
  //             this.registerAfterSocialLogin()
  //           })
  //           Loader.isLoading(false)
  //         })
  //         .catch((err) => {
  //           console.log('google login error => ', err)
  //           Loader.isLoading(false)
  //           Utility.showToast('Google Login Fail')
  //         })
  //     }
  //     ).catch(error => {
  //       console.log('google login token error => ', error)
  //       Loader.isLoading(false)
  //       Utility.showToast('Google Login Fail token')
  //     });
  // }

  onPressGoogle = () => {
    Loader.isLoading(true)
    auth0
      .webAuth
      .authorize({
        scope: 'openid profile email',
        // audience: 'https://dev-qxe8usi3.us.auth0.com/userinfo',
        connection: 'google-oauth2',
      })
      .then((credentials) => {
        console.log('google login userToken => ', credentials.accessToken)
        auth0.auth.userInfo({ token: credentials.accessToken })
          .then((userData) => {
            console.log('user Data Fetch => ', JSON.stringify(userData))
            this.setState({ socialLoginResponse: userData, socialLoginType: 'google' }, () => {
              this.registerAfterSocialLogin()
              Loader.isLoading(false);
            })
            Loader.isLoading(false)
          })
          .catch((err) => {
            console.log('google login error => ', err)
            Loader.isLoading(false)
            Utility.showToast('Google Login Fail')
          })
      }
      ).catch(error => {
        console.log('google login token error => ', error)
        Loader.isLoading(false)
        Utility.showToast('Google Login Fail token')
      });
  }

  renderTopLogoView = () => {
    return (
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logoImg} resizeMode="contain" />
      </View>
    )
  }

  emailBoxView = () => {
    const { email } = this.state
    return (
      <View style={styles.boxContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>EMAIL</Text>
          <View style={[styles.inputBox, { paddingVertical: Responsive.heightPx(0.5), }]}>
            <TextInput
              style={styles.inputView}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={CommonStyles.btnView}>
          <AppButton label="Login" onPress={this.onPressAfterEmail} />
        </View>
      </View>
    )
  }

  renderBoxView = () => {
    const { email, password, isPassVisible } = this.state
    return (
      <View style={styles.boxContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>EMAIL</Text>
          <View style={[styles.inputBox, { paddingVertical: Responsive.heightPx(0.5), }]}>
            <TextInput
              style={styles.inputView}
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
              onChangeText={(password) => this.setState({ password })}
              returnKeyType="done"
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
        <View style={CommonStyles.btnView}>
          <AppButton label="Login" onPress={this.onPressLogin} />
        </View>
        <TouchableOpacity style={styles.forgotPassView} onPress={this.onPressForgotPassword}>
          <Text style={styles.forgotPassText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.imgContainer} onPress={this.onPressfb}>
            <Image style={styles.otherImg} resizeMode="contain" source={Images.fb} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgContainer} onPress={this.onPresstwitter}>
            <Image style={styles.otherImg} resizeMode="contain" source={Images.twitter} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgContainer} onPress={this.onPressGoogle}>
            <Image style={styles.otherImg} resizeMode="contain" source={Images.google} />
          </TouchableOpacity>
          {/* {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.imgContainer} onPress={this.onPressApple}>
              <Image style={styles.otherImg} resizeMode="contain" source={Images.ios} />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    )
  }

  renderBottomView = () => {
    return (
      <View style={styles.bottomView}>
        <Text style={styles.notAccountText}>{"Don't have an account?"}</Text>
        <TouchableOpacity
          style={styles.registerView}
          onPress={() => Actions.push(Screen.RegisterScreen)}
        >
          <Text style={styles.registerText}>Register here</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { emailReceive } = this.state
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[Color.darkbrown, Color.blackish]}
        style={styles.container}
      >
        <StatusBar backgroundColor={Color.blueShade56} barStyle="light-content" />
        <SafeAreaView>
          <KeyboardAwareScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerView}>
              {this.renderTopLogoView()}
              {emailReceive ? this.emailBoxView() : this.renderBoxView()}
              {this.renderBottomView()}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}
