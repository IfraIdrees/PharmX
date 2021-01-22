import * as RNIap from 'react-native-iap'

import { Alert, ClippingRectangle, FlatList, Image, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Color, CommonStyles, Emitter, Images, Loader, Responsive, Screen, commonConstant } from '../../Helper'
import React, { PureComponent } from 'react'
import { getIsAttemtedQuestions, getquestionPaper } from '../../Helper/RealMdb'

import APICall from '../../Network/APICall'
import { Actions } from 'react-native-router-flux'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EndPoints from '../../Network/EndPoints'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import { setToken } from '../../Helper/NotificationServies'
import { styles } from './DashBoardScreenStyle'

const acesstoken = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiKxt22Dhle1c/Ita9bkgwxPwgFBjY/+07GS/s+cfJQ8p0WeknukNHJsATaBmAULUUzB8xGo4YDbdvdvB51ZQMZUxr2J/+cMRuvPGUnUK62rwfAeAfLXNiJYZ3QZythyy5jsBhgTWJq7CdWWLklNX1LpVIGGlm+1fUcwD4KEEYao1g5AVnAOzNbx4H9yDlwvJvp0L3t3fqwaPZneb+DK9E4w35LAqh+p+dy85hAHEDc/VlR8pHY22w9W5AzWH88dVKW+4OrckLiiaxbpPHReKRHxKAE6KpeC8SraBhkZ8G9ceBLlwTYbte6oBzQIhBFQ9ENKmg4xdSIY/f1ZHcRW/cwIDAQAB"

export default class DashBoardScreen extends PureComponent {
  constructor(props) {
    super(props)
    Loader.isLoading(false)
    this.state = {
      userData: null,
      AttemptPaperlist: [],
      AttemptPaperNum: 0,
      papernum: 0,
      test: "test",
      profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
    }
  }
  componentDidMount = async () => {
    setToken()

    this.getProfileCall()
    this.getIsAttemteddata()
    let validsub = null;

    if (Platform.OS === "ios") {
      const ios = await AsyncStorage.getItem('@subreceipt')
      // console.log("IOS => " + ios)
      if (ios != null) {
        const result = await RNIap.initConnection();

        console.log("IOS => " + result)
        console.log("IOS => " + JSON.stringify(ios))
        validsub = await RNIap.validateReceiptIos(ios, true)
        console.log("IOS => " + JSON.stringify(validsub))
        if (validsub.status != 0 && global.userData.isSubscribed) {

          global.userData.isSubscribed = false;
          this.updateProfile();
        }
      }
    }
    else {
      const value = await AsyncStorage.getItem('@subreceipt')
      let data = JSON.parse(JSON.parse(value))
      console.log('From storage => ' + value)
      if (value != null) {
        console.log('IS Sub pre  => ' + validsub)
        validsub = RNIap.validateReceiptAndroid(data.packageName, data.productId, data.purchaseToken, acesstoken, true)
        console.log("Test =>" + JSON.stringify(RNIap.validateReceiptAndroid(data.packageName, data.productId, data.purchaseToken, acesstoken, true)))
      }
    }
    if (!validsub && global.userData.isSubscribed) {
      global.userData.isSubscribed = false;
      this.updateProfile();
    }
    Emitter.addListener('profileUpdate', () => {
      this.getProfileCall()
      this.getIsAttemteddata()
    })
  }
  getIsAttemteddata = () => {
    let alist = [], ptlist = [], pplist = [];
    alist = getIsAttemtedQuestions();
    this.getProfileCall()
    Loader.isLoading(true)
    APICall('get', null, EndPoints.paperList)
      .then((response) => {
        if (response.status === 200 && response.data) {
          commonConstant.PaperObj = response.data;
          ptlist = response.data.data.trial;
          pplist = response.data.data.premium;
          console.log("pplist=>" + (ptlist.length + pplist.length))
          global.paperlistT = ptlist;
          global.paperlistP = pplist;
          let paernumber = ptlist.length + pplist.length;
          this.setState({ papernum: paernumber, AttemptPaperNum: alist.length, AttemptPaperlist: alist })
          commonConstant.AttemptPaperNum = alist.length;
          Loader.isLoading(false)
        } else {
          Utility.showToast(response.data.message)
          Loader.isLoading(false)
        }
      })
      .catch(() => Loader.isLoading(false))
  }
  getProfileCall = async () => {
    Loader.isLoading(true)
    APICall('get', null, EndPoints.getprofile)
      .then((response) => {
        if (response.status === 200 && response.data) {
          console.log('get profile details => ', response)
          Loader.isLoading(false)
          global.userData = response.data.data.userData
          global.userData.token = response.data.token
          console.log('global.userData => ', global.userData)
          let img = (response.data.data.userData.fullImagePath) ? response.data.data.userData.fullImagePath : Images.logo2
          this.setState({ userData: response.data.data, profileimg: img })
        } else {
          Loader.isLoading(false)
          Utility.showToast(response.data.message)
        }
      })
      .catch(() => Loader.isLoading(false))
    try {
      const jsonValue = await AsyncStorage.getItem('@passcount')
      console.log("passed profilescreen=>" + jsonValue)
      if (jsonValue != null) {
        commonConstant.PassCount = JSON.parse(jsonValue)
      };
    } catch (e) {
      console.log('error => ', e)
      // read error
    }
  }
  updateProfile = async () => {
    console.log('Profile Update');
    let isSubscribed = false;
    const payload = {
      isSubscribed
    }
    Loader.isLoading(true)
    await APICall('post', payload, EndPoints.updateprofile)
      .then((response) => {
        Loader.isLoading(false)
        if (response.status === 200 && response.data) {
          Utility.showToast("Update successful")
          Storage.setUserData({ ...response.data.data, token: response.data.token })
          Emitter.emit('profileUpdate')
          //Actions.pop()
        } else {
          Utility.showToast(response.data.message)
        }
      })
      .catch(() => Loader.isLoading(false))
    Loader.isLoading(false)
  }
  renderSearch = () => {
    return <AppSearch title="Home" />
  }

  onPressAttemptedPaper = (id) => {
    Actions[Screen.ReviewScreen]({ id: id });
  }

  renderMiddleBox = () => {
    const { userData, AttemptPaperNum, papernum } = this.state
    let numFill = 0;
    if (papernum <= 0) { numFill = 0 }
    else if (AttemptPaperNum <= 0) { numFill = 0 }
    else { numFill = (AttemptPaperNum / papernum) * 100; }
    console.log("Fill Details => P= " + papernum + " A= " + AttemptPaperNum + " fill= " + numFill)
    return (
      <View style={[styles.middleBox, { borderRadius: Responsive.heightPx(3) }]}>
      
        <Text style={styles.welcomeText}>Welcome {global.userData.name}</Text>
        <View style={styles.roundBoxView}>
          <View style={styles.roundView}>
            <AnimatedCircularProgress
              size={90}
              width={6}
              backgroundWidth={3}
              fill={numFill}
              tintColor={Color.mahron}
              backgroundColor={Color.grayShadeRGB}
              rotation={360}
              lineCap="round"
            >
              {() => (
                <View style={styles.innerBox}>
                  <Image resizeMode='contain' source={Images.paper_progress} style={styles.roundImg} />
                  <Text style={styles.roundText}>{AttemptPaperNum}/{papernum}</Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.middleText}>Your Progress</Text>
          </View>
          <View style={styles.rightBorder} />
          <View style={styles.roundView}>
            <AnimatedCircularProgress
              size={90}
              width={6}
              backgroundWidth={3}
              fill={100}
              tintColor={Color.mahron}
              backgroundColor={Color.grayShadeRGB}
              rotation={360}
              lineCap="round"
            >
              {() => (
                <View style={styles.innerBox}>
                  <Image resizeMode='contain' source={Images.next_paper_date} style={styles.roundImg} />
                  <Text style={styles.roundText1}>{userData && moment(userData.nextPaperReleasedDate).format("DD MMM")}</Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.middleText}>Next Paper</Text>
          </View>
        </View>
       
      </View>
    )
  }

  renderAttemptPaperList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.paperBox2} onPress={() => this.onPressAttemptedPaper(item.id)}>
        <View style={styles.rowContainer}>
          <View style={styles.ImgContainer}>
            <Image resizeMode="contain" source={Images.dashboard} style={styles.itemImg} />
          </View>
          <View style={styles.itemInnerConatiner}>
            {/* <Text style={styles.itemText} numberOfLines={2}>{item.key}</Text> */}
            <Text style={styles.itemText} numberOfLines={2}>{item.paperInfo.name}</Text>
            <Image resizeMode="contain" source={Images.star} style={styles.starImg} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderAttemptPaperFlatList = () => {
    return (
      <View style={styles.paperBox}>
        <Text style={styles.headingText}>Attempted Papers</Text>
        <View style={styles.FlatListView}>
          <FlatList
            horizontal={true}
            // data={[
            //   { key: 'Paper 1' },
            //   { key: 'Paper 2' },
            //   { key: 'Paper 3' },
            // ]}
            data={getIsAttemtedQuestions()}
            extraData={this.state}
            renderItem={this.renderAttemptPaperList}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            // style={styles.FlatListView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    )
  }

  renderContactUs = () => {
    return (
      <View style={styles.contactBox}>
        <Image resizeMode="contain" source={Images.contact} style={styles.contactImg} />
        <TouchableOpacity style={[{ borderRadius: 50, ...CommonStyles.shadowBtn }]} 
                onPress={() => {Actions[Screen.ContactUsScreen]()}}>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={[Color.darkskin, Color.darkskin]}
          style={styles.container}
        >
        <Text style={styles.labelStyle}>Contact Us</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      </View>
    )
  }
  render() {
    const { profileimg, AttemptPaperNum } = this.state;
    const imgpath = (profileimg !== null && isNaN(profileimg)) ? profileimg : null

    console.log("IMG PATH=> " + (profileimg !== null && isNaN(profileimg)))

    return (
       <AppContainer >
      
        <StatusBar backgroundColor={Color.darkskin} barStyle="dark-content" />
        <AppHeader title="Home" profileImage={imgpath} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: Responsive.heightPx(1) }}>
            {this.renderSearch()}
            {this.renderMiddleBox()}
            {AttemptPaperNum > 0 ? this.renderAttemptPaperFlatList() : null}
            {this.renderContactUs()}
          </View>
        </KeyboardAwareScrollView>
     
        </AppContainer>
    
    )
  }
}
