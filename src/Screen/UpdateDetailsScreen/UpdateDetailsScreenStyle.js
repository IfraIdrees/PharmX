import { Platform, StyleSheet } from 'react-native'
import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        width: Responsive.widthPx(100),
        height: Responsive.heightPx(100),
    },
    innerView: {
        alignItems: 'center'
    },
    logoContainer: {
        marginTop: Responsive.heightPx(5),
        height: Responsive.heightPx(18),
        width: '65%',
        alignSelf: 'center',

    },
    logoImg: {
        width: '100%',
        height: '100%'
    },
    boxContainer: {
        //  marginTop: Responsive.heightPx(30),
        height: Responsive.heightPx(50),
        width: '95%',
        alignSelf: 'center',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        ...CommonStyles.shadow
    },
    inputMContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        borderRadius: 10,
        ...CommonStyles.shadow
    },
    labelText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.semiBold,
        color: Color.black,


    },
    labelMText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.semiBold,
        color: Color.black,
        alignSelf: 'flex-start',
    },
    inputBox: {
        width: '75%',
        height: Responsive.heightPx(6.5),
        justifyContent: 'center'
    },
    QinputBox: {
        width: '90%',
        height: Responsive.heightPx(17),
    },
    inputBoxPass: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        fontSize: Responsive.font(2),
        fontFamily: Fonts.regular,
        color: Color.black,
        padding: Platform.OS === 'android' ? 0 : 1,
    },
    mt25: {
        marginTop: 25,
        marginBottom: 25
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
    },
    icons: {
        height: Responsive.heightPx(7),
        width: Responsive.widthPx(7),
        marginRight: Responsive.widthPx(3),
        marginLeft: Responsive.widthPx(3),
    }
    , eyeImg: {
        height: '60%',
        aspectRatio: 1,
        tintColor: Color.primary,
        opacity: 0.7
    },
    eyeContainer: {
        aspectRatio: 1,
        height: Responsive.heightPx(5.5),
        ...CommonStyles.centerItem
    },
})
