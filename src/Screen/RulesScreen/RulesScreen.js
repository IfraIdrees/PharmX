import React, { PureComponent } from 'react'
import { Image, View, Text, TouchableOpacity, FlatList, TextInput, Keyboard, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import { Color, Images, Loader, Responsive, getquestions, CommonStyles, Screen } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import { styles } from './RulesScreenStyle'

export default class RulesScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
        }
    }
    onPressSubmit = () => {
        Actions[Screen.QuestionsScreen]({ paperInfo: this.props.paperInfo, paperID: this.props.paperID })
    }
    renderImage = () => {
        return (
            <View style={{ flex: 0.2, width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: Responsive.heightPx(2) }}>
                <Image source={Images.note} style={{ height: Responsive.heightPx(12), aspectRatio: 1 }} resizeMode="contain" />
            </View>
        )
    }

    renderCardView = () => {
        return (
            <View style={{ flex: 0.8, width: '100%', alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: Responsive.heightPx(1.5) }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blueShade00, Color.blueShade56]}
                        style={styles.btnContainer}
                    >
                        <Text style={{ color: Color.white, fontSize: Responsive.font(2.0) }}>1</Text>
                    </LinearGradient>
                    <View style={{ width: "85%", marginLeft: Responsive.widthPx(5) }}>
                        <Text style={styles.flatlisttextView}>There are two style of questions within part 2 of the GPhC clinical paper.</Text>
                    </View >
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: Responsive.heightPx(1.5) }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blueShade00, Color.blueShade56]}
                        style={styles.btnContainer}
                    >
                        <Text style={{ color: Color.white, fontSize: Responsive.font(2.0) }}>2</Text>
                    </LinearGradient>
                    <View style={{ width: "85%", marginLeft: Responsive.widthPx(5) }}>
                        <Text style={styles.flatlisttextView}>In the exam, for questions 1-90 there are five options, <Text style={styles.flatlisttextViewb}>A</Text> , <Text style={styles.flatlisttextViewb}>B</Text>, <Text style={styles.flatlisttextViewb}>C</Text>, <Text style={styles.flatlisttextViewb}>D</Text> and <Text style={styles.flatlisttextViewb}>E</Text>.
                         For questions 91-120 there are eight options, <Text style={styles.flatlisttextViewb}>A</Text> , <Text style={styles.flatlisttextViewb}>B</Text>, <Text style={styles.flatlisttextViewb}>C</Text>, <Text style={styles.flatlisttextViewb}>D</Text> , <Text style={styles.flatlisttextViewb}>E</Text> , <Text style={styles.flatlisttextViewb}>F</Text> , <Text style={styles.flatlisttextViewb}>G</Text> and <Text style={styles.flatlisttextViewb}>H</Text>. Choose only one of the options as your answer for each question.</Text>
                    </View >
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: Responsive.heightPx(1.5) }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blueShade00, Color.blueShade56]}
                        style={styles.btnContainer}
                    >
                        <Text style={{ color: Color.white, fontSize: Responsive.font(2.0) }}>3</Text>
                    </LinearGradient>
                    <View style={{ width: "85%", marginLeft: Responsive.widthPx(5) }}>
                        <Text style={styles.flatlisttextView}>In the exam, where you see this icon,  <Image source={Images.book} />  you may find the resource pack provided useful.</Text>
                    </View >
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: Responsive.heightPx(1.5) }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blueShade00, Color.blueShade56]}
                        style={styles.btnContainer}
                    >
                        <Text style={{ color: Color.white, fontSize: Responsive.font(2.0) }}>{4}</Text>
                    </LinearGradient>
                    <View style={{ width: "85%", marginLeft: Responsive.widthPx(5) }}>
                        <Text style={styles.flatlisttextView}>No electronic devices, such as a calculator or mobile device can be used in part 2 of the registration assessment.</Text>
                    </View >
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: Responsive.heightPx(1.5) }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blueShade00, Color.blueShade56]}
                        style={styles.btnContainer}
                    >
                        <Text style={{ color: Color.white, fontSize: Responsive.font(2.0) }}>5</Text>
                    </LinearGradient>
                    <View style={{ width: "85%", marginLeft: Responsive.widthPx(5) }}>
                        <Text style={styles.flatlisttextViewbold}>More information on the registration assessment, including the answer sheets and how to complete these, is available in the pre-registration trainee pharmacist manual.</Text>
                    </View >
                </View>
            </View>
        )
    }
    // rendeReulesBoxView = () => {
    //     return (
    //         <FlatList
    //             data={this.state.data}
    //             extraData={this.state}
    //             keyExtractor={(item, index) => 'triel' + index.toString()}
    //             renderItem={this.renderCardView}
    //             scrollEnabled={true}
    //             style={{ flex: 0.5, width: '100%', alignSelf: 'center', marginTop: Responsive.heightPx(2) }}
    //             contentContainerStyle={{ paddingBottom: Responsive.heightPx(0.5) }}
    //             showsVerticalScrollIndicator={false}
    //         />
    //     )
    // }
    render() {
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer>
                <AppHeader title="Notes" isBack profileImage={imgpath} />
                <ScrollView style={{ flex: 1, marginTop: Responsive.heightPx(1) }}>
                    {this.renderImage()}
                    {this.renderCardView()}

                    <View style={{ flex: 0.1, alignSelf: 'center', width: Responsive.widthPx(70), marginVertical: Responsive.heightPx(2) }}>

                        <AppButton

                            label="Start"
                            onPress={this.onPressSubmit}
                        />
                    </View>

                </ScrollView>
            </AppContainer>
        )
    }

}


