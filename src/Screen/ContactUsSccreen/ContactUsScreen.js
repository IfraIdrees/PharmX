import React, { PureComponent } from 'react'
import { Image, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput, Keyboard, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import { Color, Images, Loader, Responsive, getquestions, CommonStyles, Utility } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import { styles } from './ContactUsScreenStyle'

export default class ContactUsScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            name: '', email: '', query: '',
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null
        }
    }

    onPressConatct = () => {
        const { name, email, query } = this.state
        if (!name) {
            Utility.showToast('Enter Your Name')
            return
        }
        const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
        if (!email || !reg.test(email)) {
            Utility.showToast('Enter Valid Email Address')
            return
        }
        if (!query) {
            Utility.showToast('Enter Your Query')
            return
        }
        const payload = {
            name, email, message: query
        }
        Loader.isLoading(true)
        APICall('post', payload, EndPoints.contactus)
            .then((response) => {
                console.log('response => ', response)
                Loader.isLoading(false)
                if (response.status === 200 && response.data) {
                    // Utility.showToast(response.data.message)
                    Utility.showToast("Sent")
                    Actions.reset('root')
                } else {
                    Utility.showToast(response.data.message)
                }
            })
            .catch(() => Loader.isLoading(false))
    }

    renderContactUsImage = () => {
        return (
            <View style={styles.logoContainer}>
                <Image source={Images.contact} resizeMode="contain" style={styles.logoImg} />
            </View>
        )
    }
    renderContactUsForm = () => {
        const { name, query, email } = this.state
        return (
            <View style={styles.boxContainer}>
                <View style={[styles.inputContainer, styles.mt25]}>
                    <Image source={Images.contact_user} resizeMode="contain" style={styles.icons} />
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.labelText}
                            value={name}
                            onChangeText={(name) => this.setState({ name })}
                            onSubmitEditing={() => this.email.focus()}
                            returnKeyType="next"
                            placeholder="Full Name"
                            placeholderTextColor='black'
                        />
                    </View>
                </View>
                <View style={[styles.inputContainer, styles.mt25]}>
                    <Image source={Images.contact_email} resizeMode="contain" style={styles.icons} />
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.labelText}
                            ref={(ref) => (this.email = ref)}
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            keyboardType="email-address"
                            onSubmitEditing={() => this.query.focus()}
                            returnKeyType="next"
                            placeholder="Email Address"
                            placeholderTextColor='black'
                        />
                    </View>
                </View>
                <View style={[styles.inputMContainer, styles.mt25]}>
                    <Image source={Images.contact_query} resizeMode="contain" style={styles.icons} />
                    <View style={styles.QinputBox}>
                        <TextInput
                            style={styles.qlabelText}
                            value={query}
                            ref={(ref) => (this.query = ref)}
                            onChangeText={(query) => this.setState({ query })}
                            //onSubmitEditing={() => {
                            //  Keyboard.dismiss()
                            // }}
                            //returnKeyType="done"
                            multiline
                            numberOfLines={5}
                            placeholder="Your Message"
                            placeholderTextColor='black'
                        />
                    </View>
                </View>

            </View>

        )

    }
    render() {
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer >
                <AppHeader title="Contact Us" isBack profileImage={imgpath} />
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        enableOnAndroid={true}>
                        <View style={{ flex: 2 }}>
                            {this.renderContactUsImage()}
                            {this.renderContactUsForm()}
                        </View>

                    </KeyboardAwareScrollView>
                </SafeAreaView>
                <View style={styles.btnCView}>
                    <AppButton
                        containerStyle={styles.btnView}
                        label="Send Query"
                        onPress={this.onPressConatct}
                    />
                </View>
            </AppContainer>
        )
    }

}


