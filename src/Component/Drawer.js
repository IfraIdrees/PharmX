import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { Color, CommonStyles, Fonts, Images, Loader, Responsive, Screen, Storage, Utility } from '../Helper';
import React, { PureComponent } from 'react'

import { Actions } from 'react-native-router-flux';
import AppButton from './AppButton';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { removeData } from '../Helper/RealMdb';

export default class drawerContent extends PureComponent {

    onPressBookmarks = () => {
        Actions.drawerClose()
        Actions.jump(Screen.BookmarkScreen)
    }
    onPressPaperScreen = () => {
        Actions.drawerClose()
        Actions.jump(Screen.PaperScreen)
    }
    onPressLogout = () => {
        Loader.isLoading(true)
        Storage.logoutUser()
        removeData()
        setTimeout(() => {
            Actions.drawerClose();
            Utility.showToast('Log Out Complete')
            Loader.isLoading(false)
            Actions.replace('loginRoot')
        }, 2000);
    }
    onPressHome = () => {
        Actions.drawerClose()
        // if (Actions.currentScene !== Screen.BookmarkScreen) {
        //     Actions.replace(Screen.BookmarkScreen)
        // }
        Actions.replace(Screen.DashBoardScreen)
    }
    onPressContactUs = () => {
        Actions.drawerClose()
        Actions.jump(Screen.ContactUsScreen)
    }
    onPressFAQ = () => {
        Actions.drawerClose()
        Actions[Screen.FaqScreen]()
    }
    onPressProfile = () => {
        Actions.drawerClose()
        Actions.jump(Screen.ProfileScreen)
    }
    onPressWIP = () => {
        Actions.drawerClose()
        Actions.jump(Screen.NotificationScreen)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.darkskin,borderTopRightRadius:60}}>
                <View style={{
                    height: "100%", width: "100%", backgroundColor: Color.darkskin, borderTopRightRadius: 40, borderBottomRightRadius: 40,
                }}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.blackish, Color.blackish]}
                        style={styles.Containerbluebig}
                    >
                        <View style={{ width: '95%', marginTop: Responsive.heightPx(3), alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => Actions.drawerClose()} style={styles.closebox}>
                                <Image source={Images.Dclose} style={styles.closebox} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <View style={styles.container}>
                        <View style={styles.imagecontainer}>
                            <Image resizeMode="contain" source={Images.logo} style={styles.image} />
                        </View>

                        <View style={{ marginTop: Responsive.heightPx(3), alignSelf: "flex-start", }}>
                            <View style={{ flexDirection: "row" }}>
                                <LinearGradient
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}

                                    colors={[Color.darkbrown, Color.lightskin]}
                                    style={styles.Containerblue}
                                ></LinearGradient>
                                <TouchableOpacity onPress={this.onPressHome} style={styles.buttonboxh}>
                                    <Image resizeMode="contain" source={Images.Dhoome} style={styles.DIcon} />
                                    <Text style={styles.bottontext}>Home</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.onPressBookmarks} style={styles.buttonbox}>
                                <Image resizeMode="contain" source={Images.Dbookmark} style={styles.DIcon2} />
                                <Text style={styles.bottontext}>Bookmarks</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressPaperScreen} style={styles.buttonbox}>
                                <Image resizeMode="contain" source={Images.Dpaper} style={styles.DIcon2} />
                                <Text style={styles.bottontext}>Papers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressWIP} style={styles.buttonbox}>
                                <Image resizeMode="contain" source={Images.Dnotify} style={styles.DIcon2} />
                                <Text style={styles.bottontext}>My Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressProfile} style={styles.buttonbox}>
                                <Image resizeMode="contain" source={Images.Dprofile} style={styles.DIcon2} />
                                <Text style={styles.bottontext}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressLogout} style={styles.buttonbox}>
                                <Image resizeMode="contain" source={Images.Dlogout} style={styles.DIcon2} />
                                <Text style={styles.bottontext}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    // container: {
    //     // flex: 1,
    //     // backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "flex-start",
    //     marginTop: Responsive.heightPx(5),
    //     zIndex: 0
    // },
    // btnContainer: {
    //     width: Responsive.widthPx(50),
    //     ...CommonStyles.centerItem,
    //     borderRadius: 30,
    //     backgroundColor: Color.greenShade05,
    //     marginTop: Responsive.heightPx(5),
    // },

    // Text: {
    //     fontSize: Responsive.font(2),
    //     fontFamily: Fonts.semiBold,
    //     color: Color.white
    // },
    // close: {
    //     fontSize: Responsive.font(2),
    //     fontFamily: Fonts.bold,
    //     color: Color.black

    // },
    closebox:
    {
        //   ...CommonStyles.centerItem,
        position: "absolute",
        top: 0,
        width: Responsive.heightPx(4),
        height: Responsive.heightPx(4),
        borderRadius: Responsive.heightPx(2),
        backgroundColor: Color.darkbrown,
        tintColor:Color.darkskin
    },
    DIcon:
    {
        width: Responsive.heightPx(3),
        height: Responsive.heightPx(3),
        marginRight: Responsive.widthPx(3),
        marginLeft: Responsive.widthPx(5),
        tintColor:Color.mahron
    },
    DIcon2:
    {
        width: Responsive.heightPx(3),
        height: Responsive.heightPx(3),
        marginRight: Responsive.widthPx(3),
        marginLeft: Responsive.widthPx(8),
        tintColor:Color.mahron
    },
    buttonbox:
    {
        flexDirection: "row",
        width: Responsive.widthPx(40),
        height: Responsive.heightPx(6.5),
        marginVertical: Responsive.heightPx(0.75)
    },
    buttonboxh:
    {
        flexDirection: "row",
        width: Responsive.widthPx(40),
        height: Responsive.heightPx(6.5),
        marginTop: Responsive.heightPx(1)
    },
    line: {
        width: '100%',
        height: Responsive.heightPx(1),
        color: 'black'
    },
    image: {
        width: Responsive.heightPx(17),
        height: Responsive.heightPx(17),
        marginTop: Responsive.heightPx(3),
    },
    imagecontainer: {
        marginTop: Responsive.heightPx(-17),
        width: Responsive.heightPx(25),
        height: Responsive.heightPx(25),
        borderRadius: Responsive.heightPx(30),
        backgroundColor: Color.white,
        alignItems: 'center',
        ...CommonStyles.shadowlight
    },
    Containerblue: {
        width: Responsive.widthPx(3),
        height: Responsive.heightPx(5),
        ...CommonStyles.centerItem,
        //    borderRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    Containerbluebig: {
        width: "100%",
        height: Responsive.heightPx(20),
        // ...CommonStyles.centerItem,
        //    borderRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    bottontext:
    {
        textAlign: 'center',
        fontSize: Responsive.font(2.2)
    }
})