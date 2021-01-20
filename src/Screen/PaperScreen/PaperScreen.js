import * as RNIap from 'react-native-iap'

import { Alert, FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Color, Images, Loader, Responsive, Screen, commonConstant } from '../../Helper'
import React, { PureComponent } from 'react'

import APICall from '../../Network/APICall'
import { Actions } from 'react-native-router-flux'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EndPoints from '../../Network/EndPoints'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import { showAlert } from '../../Helper/Alert'
import { styles } from './PaperScreenStyle'

const items = Platform.select({
  ios: [
    'pharmx_sub'
  ],
  android: [
    'com.pharmx.premium'
  ]
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;
export default class PaperScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      trialPaper: [],
      premiumPaper: [],
      isLoading: true,
      inAppProducts: [],
      profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
      isSubscibe: false,
      receipt: '',
    }
  }

  componentDidMount() {

    this.getPaperList()
    this.inAppPurchaseListner()
    this.checkSub()
    if (this.props.plist || this.props.tlist) {
      this.setState({ trialPaper: this.props.tlist, premiumPaper: this.props.plist })
    }
  }
  updateLists = (tlist, plist) => {
    console.log("LIST UPDATED")
    // if (plist > 0 || tlist > 0)
    this.setState({ trialPaper: tlist, premiumPaper: plist })
    console.log("LIST UPDATED")
  }
  checkSub = () => {
    if (global.userData.isSubscribed) {
      this.setState({ isSubscibe: true })
      console.log("is Sub inapp=> " + global.userData.isSubscribed)
    }
    else if (global.userData.email === "Info@pharmx.co.uk" || global.userData.email === "info@pharmx.co.uk") {
      this.setState({ isSubscibe: true })
    }
    else if (global.userData.email === "pharmax72@gmail.com") {
      this.setState({ isSubscibe: true })
    }
    console.log("is Sub inapp=> " + this.state.isSubscibe)
  }


  inAppPurchaseListner = async () => {
    Loader.isLoading(true)
    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      console.log('result await RNIap.initConnection()', result);
      if (result) {
        const products = await RNIap.getSubscriptions(items);
        console.log("getting_Subscriptions >>>", products)
        if (products)
          this.setState({ inAppProducts: products[0] })
        console.log("getting_Subscriptions >>>", products)
        const avelableSubscription = await RNIap.getAvailablePurchases();
        let isSub = false
        avelableSubscription.map((item) => {
          if (item.productId === 'pharmx_sub') {
            console.log("inAppPurchaseListner=> 2" + (item))
            if (Platform.OS === 'ios')
              isSub = true
          }
        })
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
          async (purchase) => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
              console.log("receipt => " + receipt)
              try {
                if (Platform.OS === 'ios') {
                  RNIap.finishTransactionIOS(purchase.transactionId);
                } else if (Platform.OS === 'android') {
                  console.log("ISANDROID");
                  // If consumable (can be purchased again)
                  // consumePurchaseAndroid(purchase.purchaseToken);
                  // If not consumable
                  const purchaseResult = await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
                  console.log("purchase result =>>", purchaseResult);

                  const ackResult = await RNIap.finishTransaction(purchase, false);
                  console.log("ISANDROID result =>>", ackResult);
                }
              } catch (ackErr) {
                console.warn('ackErr', ackErr);
              }
              let valid = await RNIap.validateReceiptIos(receipt, true)
              //console.log("IS Valid " + JSON.stringify(valid))
              // validateReceiptAndroid()
              console.log("receipt => " + receipt)
              this.setState({ receipt: receipt });
              this.setState({ isSubscibe: true })
              global.userData.isSubscibe = true;
              this.updateProfile();
              try {
                await AsyncStorage.setItem('@subreceipt', JSON.stringify(this.state.receipt))
                console.log("receipt storage => ")
              } catch (e) {
                // saving error
              }
            }
          },
        );
        purchaseErrorSubscription = RNIap.purchaseErrorListener(
          (error) => {
            console.log('purchaseErrorListener', error);
            // Alert.alert('purchase error', JSON.stringify(error));
          },
        );
      }
    } catch (err) {
      console.warn('catch error => ', err);
    }
    Loader.isLoading(false)
  }

  updateProfile = async () => {
    console.log('Profile Update');
    let isSubscribed = true;
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
  }

  getPaperList = () => {
    this.setState({
      trialPaper: commonConstant.PaperObj.data.trial,
      premiumPaper: commonConstant.PaperObj.data.premium,
      isLoading: false
    })
  }

  inAppPurachase = async () => {

    // https://medium.com/better-programming/react-native-in-app-purchase-subscription-bb7ad18ec5a0
    const { inAppProducts } = this.state
    console.log('prof => ', inAppProducts)
    Loader.isLoading(true)
    try {
      if (Platform.OS === 'android') {
        await RNIap.requestSubscription(inAppProducts.productId)
        Loader.isLoading(false)
      } else {
        await RNIap.requestSubscription(inAppProducts.productId, false)
        Loader.isLoading(false)
      }
    } catch (error) {
      console.log('inApp error => ', JSON.stringify(error))
      // showAlert(error)
      Loader.isLoading(false)
    }
  }

  onPressPemiumPaper = (item) => {
    if (this.state.isSubscibe) {
      console.log("PAPER ID=> " + item.id)
      Actions[Screen.RulesScreen]({ paperInfo: item, paperID: item.id })
    } else {
      Actions.push(Screen.SubscribePosterScreen);
    }
  }


  renderSearch = () => {
    return <AppSearch onPressSearch={(r1, r2) => this.updateLists(r1, r2)} />
  }
  // onSearchClick = () => {
  //   Alert.alert('Pharmx', 'work in progress')
  // }

  renderHeading = (title) => {
    return (
      <View style={[styles.container, { marginTop: Responsive.heightPx(2) }]}>
        <Image source={Images.paperside} resizeMode="contain" style={styles.paperSide} />
        <Text style={styles.headingTitle}>{title}</Text>
      </View>
    )
  }

  renderBottomView = () => {
    const { inAppProducts } = this.state
    let price = inAppProducts ? inAppProducts.localizedPrice : "£7.99"
    return (
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.subscribeText}>{'PharmX Premium'}</Text>
          <Text style={styles.subscribeSubText}>{"Access to all premium papers"}</Text>
          {/* <Text style={styles.subscribeSubText}>to unlock weekly papers</Text> */}
        </View>
        <TouchableOpacity onPress={this.inAppPurachase}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.0, 0.1, 1.0]}
            colors={[Color.greenShade5C, Color.greenShade05]}
            style={styles.btnContainer}
          >
            <Text style={styles.labelMainStyle}>{price}</Text>
            <Text style={styles.labelStyle}>Monthly</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }

  renderCardView = ({ item }) => {
    return (
      <View style={styles.cardView}>
        <View style={[styles.imgView, { alignItems: 'center', justifyContent: 'center', backgroundColor: Color.cardBackground, borderRadius: Responsive.widthPx(3) }]}>
          <Image source={Images.other} resizeMode="contain" style={{
            width: Responsive.widthPx(22),
            height: Responsive.heightPx(8)
          }} />
        </View>
        <View style={styles.itemInnerConatiner}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image resizeMode="contain" source={Images.star} style={styles.starImg} />
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => Actions[Screen.RulesScreen]({ paperInfo: item, paperID: item.id })}
          >
            <Image style={styles.rightIcon} resizeMode="contain" source={Images.right} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderLockCardView = ({ item }) => {
    //console.log('data L=> ', item.id)
    return (
      <View style={styles.cardView}>
        <View style={[styles.imgView, { alignItems: 'center', justifyContent: 'center', backgroundColor: Color.cardBackground, borderRadius: Responsive.widthPx(3) }]}>
          <Image source={Images.lock} resizeMode="contain" style={{
            width: Responsive.widthPx(22),
            height: Responsive.heightPx(8)
          }} />
        </View>
        <View style={styles.itemInnerConatiner}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image resizeMode="contain" source={Images.star} style={styles.starImg} />
          <TouchableOpacity style={styles.btnView} onPress={() => this.onPressPemiumPaper(item)}>
            <Image style={styles.rightIcon} resizeMode="contain" source={Images.right} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderTrialPaperFlatList = () => {
    const { trialPaper } = this.state
    return (
      <FlatList
        data={trialPaper}
        extraData={this.state}
        style={{ paddingBottom: Responsive.heightPx(0.5) }}
        ListHeaderComponent={() => this.renderHeading('Free Trial')}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={this.renderCardView}
        scrollEnabled={false}
      />
    )
  }

  renderPremiumPaperFlatList = () => {
    const { premiumPaper } = this.state
    return (
      <FlatList
        data={premiumPaper}
        extraData={this.state}
        ListHeaderComponent={() => this.renderHeading('Premium Papers')}
        keyExtractor={(item, index) => 'triel' + index.toString()}
        renderItem={this.renderLockCardView}
        scrollEnabled={false}
      />
    )
  }

  render() {
    const { isLoading, profileimg, isSubscibe } = this.state
    const imgpath = profileimg !== null ? profileimg : null
    console.log("is Sub render=> " + isSubscibe)
    return (
      <AppContainer>
        <AppHeader title="Papers" isBack profileImage={imgpath} />
        <View style={styles.mainContainer}>
          {!isLoading && (
            <ScrollView style={{ flex: isSubscibe ? 1 : 0.83 }}>
              {this.renderSearch()}
              {this.renderTrialPaperFlatList()}
              {this.renderPremiumPaperFlatList()}
            </ScrollView>
          )}
          {!isSubscibe &&
            <View style={{ flex: 0.17, justifyContent: 'center', backgroundColor: Color.transparent }}>
              {this.renderBottomView()}
            </View>
          }
        </View>
      </AppContainer >
    )
  }
}
