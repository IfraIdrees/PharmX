import React, { Component } from 'react'
import { Alert, FlatList, Image, Linking, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import AppHeader from '../../Component/AppHeader'
import Color from '../../Helper/Color'
import Images from '../../Helper/Images'
import Screen from '../../Helper/Screen'
import { styles } from './SubscribePosterScreenStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Utility, Storage, Loader, Responsive, CommonStyles } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import AppContainer from '../../Component/AppContainer'
import ToggleSwitch from 'toggle-switch-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as RNIap from 'react-native-iap'

const items = Platform.select({
  ios: [
    'com.pharmx.premium'
  ],
  android: [
    'pharmx_sub'
  ]
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;
export default class SubscribePosterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { key: "High quality exam questions", image: Images.stone },
        { key: "Exam questions added weekly", image: Images.calander },
        { key: "Learn on the go", image: Images.mobile },
        { key: "Up to date content", image: Images.up_to_date },
        { key: "Interactive", image: Images.interactive },
      ],
      inAppProducts: [],
      isSubscibe: false,
      receipt: '',
      profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
    }
  }

  componentDidMount = () => {
    this.inAppPurchaseListner()

  }
  inAppPurchaseListner = async () => {
    console.log("inAppPurchaseListner=> ")
    Loader.isLoading(true)
    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      console.log('result await RNIap.initConnection()', result);
      if (result) {
        console.log("inAppPurchaseListner=> 1")
        const products = await RNIap.getSubscriptions(items);
        this.setState({ inAppProducts: products[0] })
        console.log("getting_Subscriptions >>>", products)
        const avelableSubscription = await RNIap.getAvailablePurchases();
        let isSub = false
        avelableSubscription.map((item) => {

          if (item.productId === 'com.pharmx.premium') {
            console.log("inAppPurchaseListner=> 2")
            isSub = true
          }
          console.log("inAppPurchaseListner=> 2" + item)
        })
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
          // async (purchase: SubscriptionPurchase) => {
            
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

                  await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);

                }
                const ackResult = await RNIap.finishTransaction(purchase);
                console.log("ISANDROID result =>>", ackResult);
              } catch (ackErr) {
                console.warn('ackErr', ackErr);
              }
              // validateReceiptIos(receipt, true)
              // validateReceiptAndroid()
              console.log("receipt => " + receipt)
              try {
                await AsyncStorage.setItem('@subreceipt', JSON.stringify(receipt))
              } catch (e) {
                // saving error
              }
              this.setState({ receipt: receipt });
              this.setState({ isSubscibe: true })
              global.userData.isSubscibe = true;
              this.updateProfile();
              Actions.pop()
            }
          },
        );
        purchaseErrorSubscription = RNIap.purchaseErrorListener(
          (error) => {
            console.log('purchaseErrorListener', error);
            // Alert.alert('purchase error', JSON.stringify(error));
            Actions.pop()
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
  inAppPurachase = async () => {
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
  restorepurchase = () => {
    RNIap.getAvailablePurchases()
  }
  onPressSubscribe = () => {
    this.inAppPurachase()
  }

  renderTopView = () => {
    return (
      <View style={{ flex: 0.1, marginTop: Responsive.heightPx(3) }}>
        <Text style={styles.headText}>Premium Benefits</Text>
      </View>
    )
  }
  renderCardView = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.image} style={styles.icons} resizeMode="contain" />
        <Text style={[styles.flatlisttextView]} numberOfLines={1}>{item.key}</Text>
      </View>
    )
  }
  renderBoxView = () => {
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={(item, index) => 'triel' + index.toString()}
        renderItem={this.renderCardView}
        scrollEnabled={true}
        style={{ flex: 0.4, width: '88%', alignSelf: 'center', marginTop: Responsive.heightPx(3) }}
        contentContainerStyle={{ paddingBottom: Responsive.heightPx(0.5) }}
        showsVerticalScrollIndicator={false}
      />
    )
  }
  renderMiddleBoxView = () => {
    return (
      <View style={{ flex: 0.1, width: '90%', marginTop: Responsive.heightPx(3), marginBottom: Responsive.heightPx(4), alignItems: 'center', alignSelf: 'center' }}>
        <Text style={styles.inputView}>Learn | Implement | Result</Text>
      </View>
    )
  }
  renderBottomView = () => {
    const { inAppProducts } = this.state
    let price = inAppProducts ? inAppProducts.localizedPrice : "£7.99"
    return (
      <View style={{ flex: 0.5, width: '80%', marginVertical: Responsive.heightPx(2), alignSelf: 'center', alignItems: 'center', borderRadius: 10, marginTop: Responsive.heightPx(-2) }}>
        <TouchableOpacity onPress={this.onPressSubscribe}>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            // locations={[0.0, 0.1, 1.0]}
            colors={[Color.greenShade5C, Color.greenShade05]}
            style={styles.btnContainer}
          >
            <Text style={styles.buttonheadText}>Subscribe Now!</Text>
            <Text style={styles.buttonheadText}>{price}</Text>
            <Text style={styles.buttonText}>Monthly</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.underline, { marginTop: Responsive.heightPx(1), marginBottom: Responsive.heightPx(2) }]} onPress={() => this.restorepurchase()}>Restore Purchase</Text>
        <Text style={styles.linetext}>By tapping 'Subscribe', you agree to our</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginBottom: Responsive.heightPx(2) }}>
          <Text style={styles.underline} onPress={() => Linking.openURL('https://pharmx.co.uk/privacy/')}>Privacy Policy </Text>
          <Text style={styles.linetext}> and</Text>
          <Text style={styles.underline} onPress={() => Linking.openURL('https://pharmx.co.uk/terms-of-service/')}> Terms </Text>
        </View>
      </View >)
  }

  render() {
    const { profileimg } = this.state;
    const imgpath = profileimg !== null ? profileimg : null
    return (
      <AppContainer >
        <AppHeader title="Subscribe" isBack profileImage={imgpath} />
        <ScrollView style={{ flex: 1, }}>
          {this.renderTopView()}
          {this.renderBoxView()}
          {this.renderMiddleBoxView()}
          {this.renderBottomView()}
        </ScrollView>
      </AppContainer>
    )
  }
}
