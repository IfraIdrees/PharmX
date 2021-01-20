import React, { Component } from 'react'
import { Alert, Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import AppHeader from '../../Component/AppHeader'
import Color from '../../Helper/Color'
import Images from '../../Helper/Images'
import Screen from '../../Helper/Screen'
import { styles } from './ProfileScreenStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Utility, Storage, Loader, Responsive, CommonStyles, Emitter, commonConstant } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import AppContainer from '../../Component/AppContainer'
import ToggleSwitch from 'toggle-switch-react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Constant from '../../Helper/Constant'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: true,
      imgdata: null,
      attemtedCount: (commonConstant.AttemptPaperNum) ? commonConstant.AttemptPaperNum : 0,
      passcount: (commonConstant.PassCount) ? commonConstant.PassCount : 0,
      paperinfo: props.paperinfo,
      // hasProfileImage: (global.userData.profileImage === null) ? false : true,
      profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null
    }
  }


  toggleSwitch = () => {
    const toset = this.state.isEnabled ? false : true;
    this.setState({ isEnabled: toset })
  }
  uploadImage = (file) => {
    const payload = new FormData()
    payload.append('images', file)
    Loader.isLoading(true)
    const header = { Authorization: 'Bearer ' + global.userData.token }
    APICall('post', payload, EndPoints.updateprofile, header)
      .then((response) => {
        Loader.isLoading(false)
        if (response.status === 200 && response.data) {
          Emitter.emit('profileUpdate')
          Utility.showToast(response.data.message)
        } else {
          Utility.showToast(response.data.message)
          console.log("user data=> ", response.data.message);
        }
      })
      .catch(() => Loader.isLoading(false))
    // Loader.isLoading(true)
    // APICall('get', null, EndPoints.getprofile)
    //   .then((response) => {
    //     if (response.status === 200 && response.data) {
    //       console.log('get profile details => ', response)
    //       Loader.isLoading(false)
    //       this.setState({ userData: response.data.data })
    //       global.userData = response.data.data.userData;
    //       // console.log("user data=> ", global.userData.fullImagePath);
    //     } else {
    //       Loader.isLoading(false)
    //       Utility.showToast(response.data.message)
    //     }
    //   })
    //   .catch(() => Loader.isLoading(false))
    // Loader.isLoading(true)
    // Actions.refresh();
  }
  onPressGallery = () => {
    let { hasProfileImage, profileimg } = this.state;
    ImagePicker.openPicker({
      width: Responsive.widthPx(35),
      height: Responsive.widthPx(35),
      cropperCircleOverlay: true,
      cropping: true
    }).then(image => {
      console.log(image);
      Loader.isLoading(true)
      console.log(image.path);
      const file = {
        uri: image.path,
        name: Date.parse(new Date()) + '.jpg',
        type: 'image/png',
      }
      console.log(file.uri);
      this.uploadImage(file)
      hasProfileImage = true;
      // profileimg.uri = image.path;
      this.setState({ profileimg: file.uri })
      Loader.isLoading(false)

    });
  }
  onPressCamera = () => {
    let { hasProfileImage, profileimg } = this.state;
    ImagePicker.openCamera({
      width: Responsive.widthPx(35),
      height: Responsive.widthPx(35),
      cropperCircleOverlay: true,
      cropping: true
    }).then(image => {
      console.log(image);
      Loader.isLoading(true)
      console.log(image.path);
      const file = {
        uri: image.path,
        name: Date.parse(new Date()) + '.jpg',
        type: 'image/png',
      }
      console.log(file.uri);
      this.uploadImage(file)
      hasProfileImage = true;
      // profileimg.uri = image.path;
      this.setState({ profileimg: file.uri })
      Loader.isLoading(false)

    });
  }
  onPressProfileEdit = () => {

    this.onPressGallery()
    // Alert.alert(
    //   'PharmaX',
    //   'Select Image',
    //   [
    //     {
    //       text: 'Gallery',
    //       onPress: () => this.onPressGallery()
    //     },
    //     {
    //       text: 'Camera',
    //       onPress: () => this.onPressCamera(),
    //     },
    //   ],
    //   { cancelable: false }
    // );

    // let { hasProfileImage, profileimg } = this.state;
    // const options = {
    //   title: 'Select Image',
    // }
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('image picker cancel')
    //   } else if (response.error) {
    //     console.log('image picker error => ', response.error)
    //   } else if (response.customButton) {
    //     console.log('image picker custom button => ', response.customButton)
    //   } else {
    //     // setIsLoading(true)
    //     const file = {
    //       uri: response.uri,
    //       name: response.fileName ? response.fileName : Date.parse(new Date()) + '.jpg',
    //       type: 'image/png',
    //     }
    //     this.uploadImage(file)
    //     // hasProfileImage = true;
    //     // profileimg.uri = response.uri;
    //     this.setState({ profileimg: file.uri })
    //   }
    // })
  }
  onPressEmailEdit = () => {
    Actions[Screen.UpdateDetailsScreen]({ isEmail: true });
  }
  onPressPasswordEdit = () => {
    Actions[Screen.UpdateDetailsScreen]({ isEmail: false });
  }

  renderTopLogoView = () => {

    const { profileimg } = this.state;
    let imgpath = profileimg !== null ? { uri: profileimg } : Images.logo2
    console.log("image details => " + JSON.stringify(imgpath))
    return (
      <View style={{ marginVertical: Responsive.heightPx(2), }}>
        <View>
          <View style={styles.logoContainer}>
            <Image source={imgpath} style={{
              width: Responsive.widthPx(35),
              height: Responsive.widthPx(35),
            }} borderRadius={Responsive.widthPx(52)} />
          </View>
          <TouchableOpacity style={styles.logoEditImgContainer} onPress={() => this.onPressProfileEdit()}>
            <Image source={Images.edit} style={styles.logoEditImg} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.nmaeText,]}>{global.userData.name}</Text>
      </View>

    )
  }
  renderStatsBoxView = () => {
    let type = global.userData.isSubscribed ? 'Premium' : 'Trial'
    const { attemtedCount, passcount } = this.state;

    return (
      <View style={{ paddingVertical: Responsive.heightPx(2) }}>
        {/* <View style={styles.centerBorder} /> */}
        <View style={styles.shadowProfile}>
          <View >
            <Text style={styles.inputView}>Attemped</Text>
            <Text style={styles.inputViewGreen}>{attemtedCount}</Text>
          </View>
          <View >
            <Text style={styles.inputView}>Passed</Text>
            <Text style={styles.inputViewGreen}>{passcount}</Text>
          </View>
          <View >
            <Text style={styles.inputView}>Type</Text>
            <Text style={styles.inputViewGreen}>{type}</Text>
          </View>
        </View>
        {/* <View style={styles.centerBorder} /> */}
      </View>
    )
  }

  renderBoxView = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.lableContaner}>
            <Image source={Images.contact_email} resizeMode="contain" style={styles.icons} />
            <Text style={styles.inputView2}>{global.userData.email}</Text>
            <TouchableOpacity style={styles.iconspenciltouch} onPress={() => this.onPressEmailEdit()}>
              <Image source={Images.pencil} resizeMode="contain" style={styles.iconspencil} />
            </TouchableOpacity>
          </View>
          <View style={styles.lableContaner}>
            <Image source={Images.profile_password} resizeMode="contain" style={styles.icons} />
            <Text style={styles.inputView2}>********</Text>
            <TouchableOpacity style={styles.iconspenciltouch} onPress={() => this.onPressPasswordEdit()}>
              <Image source={Images.pencil} resizeMode="contain" style={styles.iconspencil} />
            </TouchableOpacity>
          </View>
          <View style={styles.lableContaner}>
            <Image source={Images.profile_notification} resizeMode="contain" style={styles.icons} />
            <Text style={styles.inputView2}>Notifications</Text>
            <View style={styles.toggleswitch}>
              <ToggleSwitch
                isOn={this.state.isEnabled}
                onColor={Color.greenShade05}
                offColor="#707070"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="medium"
                onToggle={this.toggleSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {

    return (
      <AppContainer >
        <AppHeader title="Profile" isBack />
        <ScrollView style={{ flex: 1, }}>
          {this.renderTopLogoView()}
          {this.renderStatsBoxView()}
          {this.renderBoxView()}
        </ScrollView>
      </AppContainer>
    )
  }
}
