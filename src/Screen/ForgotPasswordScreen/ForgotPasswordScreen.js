import React, { Component } from 'react'
import {
    Image,
    Keyboard,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import Color from '../../Helper/Color'
import Images from '../../Helper/Images'
import Screen from '../../Helper/Screen'
import { styles } from './ForgotPasswordScreenStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Utility, Loader, Responsive, CommonStyles } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }



    onPressSubmit = () => {
        const { email } = this.state
        const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
        if (!email || !reg.test(email)) {
            Utility.showToast('Enter Valid Email Address')
            return
        }
        const payload = { email, }
        Loader.isLoading(true)
        APICall('post', payload, EndPoints.forgotPassword)
            .then((response) => {
                Loader.isLoading(false)
                if (response.status === 200 && response.data) {
                    Utility.showToast("Please check your email and reset your password")
                    // Utility.showToast(response.data.message)
                    Actions.replace(Screen.LoginScreen)
                } else {
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
                </View>
                <View style={[styles.inputContainer, styles.mt25]}>
                    <Text style={styles.labelText}>EMAIL</Text>
                    <View style={[styles.inputBox, { paddingVertical: Responsive.heightPx(0.5), }]}>
                        <TextInput
                            style={styles.inputView}
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            keyboardType="email-address"
                            returnKeyType="done"
                        />
                    </View>
                </View>
                <View style={CommonStyles.btnView}>
                    <AppButton
                        label="Submit"
                        onPress={this.onPressSubmit}
                    />
                </View>
            </View >
        )
    }


    render() {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={[Color.blueShade56, Color.blueShade00]}
                style={styles.container}
            >
                <View style={styles.backImgcontainer}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <Image source={Images.left_arrow_white} style={styles.backImg} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.innerContainer}
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    extraScrollHeight={150}
                >
                    <View style={styles.innerView}>
                        {this.renderTopLogoView()}
                        {this.renderBoxView()}
                    </View>
                </KeyboardAwareScrollView>

            </LinearGradient >
        )
    }
}
