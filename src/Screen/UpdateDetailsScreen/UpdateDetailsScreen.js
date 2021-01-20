import React, { Component } from 'react'
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import AppHeader from '../../Component/AppHeader'
import Color from '../../Helper/Color'
import Images from '../../Helper/Images'
import Screen from '../../Helper/Screen'
import { styles } from './UpdateDetailsScreenStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Utility, Storage, Loader, Responsive, CommonStyles } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import AppContainer from '../../Component/AppContainer'
import ToggleSwitch from 'toggle-switch-react-native'

export default class UpdateDetailsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmail: this.props.isEmail,
            updateText: "",
            confirmtext: "",
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
            isPassVisible: false,
            isCPassVisible: false
        }
    }

    onPressUpdate = () => {
        const { updateText, confirmtext, isEmail } = this.state

        const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
        if (isEmail) {
            //    Alert.alert('Pharmx', 'work in progress');
            if (!updateText || !reg.test(updateText)) {
                Utility.showToast('Enter Valid Email Address')
                return
            }
            else {
                let email = updateText;
                const payload = {
                    email
                }
                Loader.isLoading(true)
                APICall('post', payload, EndPoints.updateprofile)
                    .then((response) => {
                        Loader.isLoading(false)
                        if (response.status === 200 && response.data) {
                            Utility.showToast("Update successful")
                            Storage.setUserData({ ...response.data.data, token: response.data.token })
                            Emitter.emit('profileUpdate')
                            global.userData.email = updateText;
                            Actions.pop()
                        } else {
                            Utility.showToast(response.data.message)
                        }
                    })
                    .catch(() => Loader.isLoading(false))
            }

        }
        else {
            if (!updateText) {
                Utility.showToast('Enter Password')
                return
            }
            else if (!confirmtext) {
                Utility.showToast('Enter Confirm Password')
                return
            }
            else if (updateText !== confirmtext) {
                Utility.showToast('Both Passwords Are not the same')
                return
            }
            else if (updateText === confirmtext) {
                let password = updateText;
                const payload = {
                    password
                }
                Loader.isLoading(true)
                APICall('post', payload, EndPoints.updateprofile)
                    .then((response) => {
                        Loader.isLoading(false)
                        if (response.status === 200 && response.data) {
                            Utility.showToast("Update successful")
                            Storage.setUserData({ ...response.data.data, token: response.data.token })
                            Emitter.emit('profileUpdate')
                            Actions.pop()
                        } else {
                            Utility.showToast(response.data.message)
                        }
                    })
                    .catch(() => Loader.isLoading(false))
            }
        }

    }
    onPressTogglePass = () => {
        this.setState({ isPassVisible: !this.state.isPassVisible })
    }
    onPressTogglePassC = () => {
        this.setState({ isCPassVisible: !this.state.isCPassVisible })
    }
    renderConfirmPwd = () => {
        const { confirmtext, isCPassVisible } = this.state;
        return (
            <View style={[styles.inputContainer, styles.mt25]}>
                <Image source={Images.profile_password} resizeMode="contain" style={styles.icons} />
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.labelText}
                        value={confirmtext}
                        onChangeText={(confirmtext) => this.setState({ confirmtext })}
                        returnKeyType="done"
                        placeholder={"Confirm Password"}
                        placeholderTextColor='black'
                        keyboardType={'default'}
                        secureTextEntry={!isCPassVisible}
                    />
                </View>
                <TouchableOpacity style={styles.eyeContainer} onPress={this.onPressTogglePassC}>
                    <Image
                        style={styles.eyeImg}
                        source={isCPassVisible ? Images.visibility : Images.invisible}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        )
    }
    showEye = () => {
        const { isPassVisible } = this.state;
        return (
            <TouchableOpacity style={styles.eyeContainer} onPress={this.onPressTogglePass}>
                <Image
                    style={styles.eyeImg}
                    source={isPassVisible ? Images.visibility : Images.invisible}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
    }
    renderUpdateView = () => {
        const { updateText, isEmail, isPassVisible } = this.state;
        let img = isEmail ? Images.contact_email : Images.profile_password
        let placeholderText = isEmail ? "New Email" : "New Password"
        let keyboardType = isEmail ? 'email' : 'default';
        return (
            <View style={styles.boxContainer} >
                <View style={[styles.inputContainer, styles.mt25]}>
                    <Image source={img} resizeMode="contain" style={styles.icons} />
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.labelText}
                            value={updateText}
                            secureTextEntry={!isEmail && !isPassVisible}
                            onChangeText={(updateText) => this.setState({ updateText })}
                            returnKeyType="done"
                            placeholder={placeholderText}
                            placeholderTextColor='black'
                        />

                    </View>
                    {!isEmail ? this.showEye() : null}
                </View>
                {!isEmail ? this.renderConfirmPwd() : null}

                <View style={{ alignSelf: 'center' }} >
                    <AppButton label="Update" onPress={() => this.onPressUpdate()} />
                </View>
            </View >

        )

    }


    render() {
        let title = this.state.isEmail ? "Update Email" : "Update Password"
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer >
                <AppHeader title={title} isBack profileImage={imgpath} />
                <View style={{ flex: 1, }}>
                    {this.renderUpdateView()}
                </View>
            </AppContainer >
        )
    }


}