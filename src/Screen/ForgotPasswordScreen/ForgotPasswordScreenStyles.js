import { Platform, StyleSheet } from 'react-native'
import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        //marginTop: Responsive.heightPx(-4.5),

    },
    innerView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: Responsive.heightPx(5),
        height: Responsive.heightPx(50)
    },
    logoContainer: {
        width: Responsive.widthPx(38),
        marginVertical: 35,
        aspectRatio: 1,
        backgroundColor: Color.white,
        borderRadius: 200,
        ...CommonStyles.shadow,
        ...CommonStyles.centerItem
    },
    logoImg: {
        width: '65%',
        height: '65%'
    },
    backImg: {
        width: '80%',
        height: '80%',
    },
    backImgcontainer:
    {
        paddingTop: Responsive.heightPx(5),
        marginLeft: Responsive.widthPx(5),
        height: Responsive.heightPx(10),
        width: Responsive.widthPx(5),
        justifyContent: 'center'
    },
    boxContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: Responsive.widthPx(85),
        backgroundColor: Color.white,
        borderRadius: 10,
        ...CommonStyles.shadow
    },
    inputContainer: {
        width: '100%'
    },
    labelText: {
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.semiBold,
        color: Color.primary
    },
    inputBox: {
        width: '100%',
        borderBottomColor: Color.grayShadeEA,
        borderBottomWidth: 3
    },
    inputBoxPass: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputView: {
        fontSize: Responsive.font(2),
        fontFamily: Fonts.regular,
        color: Color.black,
        padding: Platform.OS === 'android' ? 0 : 1,
    },
    mt25: {
        marginTop: 25
    },
    eyeContainer: {
        aspectRatio: 1,
        height: Responsive.heightPx(5.5),
        ...CommonStyles.centerItem
    },
    eyeImg: {
        height: '60%',
        aspectRatio: 1,
        tintColor: Color.primary,
        opacity: 0.7
    },
    forgotPassText: {
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.regular,
        color: Color.black,
        textDecorationLine: 'underline',
        textDecorationColor: Color.black
    },
    forgotPassView: {
        marginVertical: 25,
        alignSelf: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgContainer: {
        width: Responsive.widthPx(15),
        height: Responsive.widthPx(15),
        ...CommonStyles.centerItem
    },
    otherImg: {
        width: Responsive.widthPx(15),
        height: Responsive.widthPx(15)
    },
    bottomView: {
        marginVertical: Responsive.heightPx(4),
        alignItems: 'center'
    },
    notAccountText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.regular,
        color: Color.white
    },
    registerText: {
        fontSize: Responsive.font(2.5),
        fontFamily: Fonts.bold,
        color: Color.white,
        textDecorationLine: 'underline',
        textDecorationColor: Color.white
    },
    registerView: {
        marginTop: 5
    }
})
