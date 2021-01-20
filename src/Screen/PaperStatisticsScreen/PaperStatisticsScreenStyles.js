import { StyleSheet } from 'react-native'
import { Color, CommonStyles, Fonts, Responsive } from '../../Helper'

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    progressBarBox: {
        width: Responsive.widthPx(90),
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    progress: {
        width: Responsive.widthPx(75),
        height: Responsive.heightPx(1.5)
    },
    questionNumberText: {
        fontSize: Responsive.font(2),
        fontFamily: Fonts.semiBold,
        color: Color.black
    },
    chatBox: {
        width: Responsive.widthPx(90),
        height: Responsive.heightPx(35)
    },
    blueBox: {
        width: Responsive.widthPx(100),
        paddingVertical: Responsive.heightPx(2),
        marginTop: Responsive.heightPx(2),
        alignItems: 'center',
        flex: 1,
    },
    flagBox: {
        height: Responsive.heightPx(5),
        position: 'absolute',
        right: -20,
        top: -10,
        aspectRatio: 1
    },
    paragraphText: {
        width: Responsive.widthPx(75),
        alignSelf: 'center',
        color: Color.white,
        fontFamily: Fonts.regular,
        fontSize: Responsive.font(1.8),
    },
    flagIcon: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatText: {
        position: 'absolute',
        width: Responsive.widthPx(75),
        alignSelf: 'center',
        fontSize: Responsive.font(2),
        fontFamily: Fonts.regular,
        color: Color.white
    },
    questionText: {
        fontSize: Responsive.font(2),
        fontFamily: Fonts.bold,
        color: Color.black,
        marginHorizontal: Responsive.widthPx(3),
        textAlign: 'center'
    },
    questionBox: {
        marginTop: 2,
        width: Responsive.widthPx(90),
        alignSelf: 'center',
        flex: 1
    },
    optionBox: {
        width: Responsive.widthPx(80),
        padding: Responsive.heightPx(1),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: Color.white,
        ...CommonStyles.shadow
    },
    optionText: {
        fontSize: Responsive.font(2),
        fontFamily: Fonts.semiBold,
        color: Color.blackShade35
    },
    checkedImg: {
        width: Responsive.widthPx(8),
        aspectRatio: 1,
        marginHorizontal: 15
    },
    modalText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.font(2),
        width: '80%',
        textAlign: 'center'
    },
    modalResultText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.font(2),
        textAlign: 'center',
        width: '20%',
    },
    modalInnerView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Responsive.heightPx(1)
    },
    submitImage: {
        height: Responsive.heightPx(15),
        width: Responsive.heightPx(15),
        marginVertical: Responsive.heightPx(2),
        // marginBottom: Responsive.heightPx(2),
    },
    flagImage: {
        height: Responsive.heightPx(5),
        width: Responsive.heightPx(5),
        marginLeft: Responsive.widthPx(4),
        alignSelf: 'center'
    },
    starImage: {
        height: Responsive.heightPx(5.5),
        width: Responsive.heightPx(5.5),
        marginBottom: Responsive.heightPx(1),
        alignSelf: 'center'
    },
    buttonImage: {
        height: Responsive.heightPx(3.5),
        width: Responsive.heightPx(3.5),
        marginBottom: Responsive.heightPx(1),
        alignSelf: 'center'
    },
    attemettext:
    {
        fontSize: Responsive.font(3.0),
        marginBottom: Responsive.heightPx(2),
    },
    flagtext:
    {
        textAlignVertical: 'center',
        fontSize: Responsive.font(2),
        marginLeft: Responsive.widthPx(3)
    },
    ratetext:
    {
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontSize: Responsive.font(2),
        marginLeft: Responsive.widthPx(3)
    },
    flagnumber:
    {
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontSize: Responsive.font(2.5),
        marginLeft: Responsive.widthPx(25),
        color: Color.primary,

    },
    submittext:
    {
        fontSize: Responsive.font(2.0),
        marginBottom: Responsive.heightPx(2)
    },
    middleBox: {
        // height: Responsive.heightPx(25),
        width: '90%',
        alignSelf: 'center',
        ...CommonStyles.shadow,
    },
    welcomeText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.semiBold,
        alignSelf: 'center',
        color: Color.black
    },
    roundBoxView: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: Responsive.heightPx(2)
    },
    rightBorder: {
        height: '85%',
        backgroundColor: Color.white,
        width: 0.5
    },
    centerBorder: {
        width: '90%',
        backgroundColor: Color.black,
        height: Responsive.heightPx(0.010),
        alignSelf: 'center',
        marginVertical: Responsive.heightPx(2)

    },
    roundView: {
        ...CommonStyles.centerItem,
        flex: 1,
    },
    innerBox: {
        flex: 1,
        ...CommonStyles.centerItem
    },
    roundImg: {
        width: Responsive.widthPx(10),
        aspectRatio: 0.5
    },
    middleText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.semiBold,
        color: Color.white
    },
    roundText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.regular,
        color: Color.white,
        marginTop: Responsive.heightPx(2),
    },
    buttonText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.regular,
        color: Color.white,
    },
    paperBox: {
        width: Responsive.widthPx(100),
        paddingHorizontal: Responsive.widthPx(5),
        marginTop: Responsive.heightPx(2),
        alignSelf: 'center',
        // backgroundColor: 'pink'
    },
    paperBox2: {
        width: Responsive.widthPx(16),
    },
    headingText: {
        fontSize: Responsive.font(2.2),
        fontFamily: Fonts.regular,
        color: Color.black,
    },

    itemImg: {
        width: Responsive.widthPx(25),
        height: Responsive.heightPx(8),
    },
    starImg: {
        marginTop: 10
    },
    itemInnerConatiner: {
        marginLeft: 15,
        flex: 1,
    },
    itemText: {
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.regular,
        color: Color.black
    },
    contactBox: {
        width: '100%',
        ...CommonStyles.centerItem,
        marginVertical: 20
    },
    contactImg: {
        width: Responsive.widthPx(60),
        height: Responsive.heightPx(15),
        marginBottom: 30
    },
    FlatListView: {
        flex: 1,
    },
    ImgContainer: {
        borderRadius: Responsive.heightPx(2),
        width: Responsive.widthPx(30),
        backgroundColor: Color.cardBackground,
        alignItems: 'center',
    },

    btnContainer: {
        width: Responsive.widthPx(35),
        height: Responsive.heightPx(10),
        ...CommonStyles.centerItem,
        borderRadius: 10
    },

})
