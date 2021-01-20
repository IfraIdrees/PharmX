import React, { PureComponent } from 'react'
import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import { Color, Images, Loader, Responsive, getquestions, CommonStyles, commonConstant, Emitter, Screen } from '../../Helper'
import { getBookMarkQuestions } from '../../Helper/RealMdb'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import { styles } from './BookmarkScreenStyle'
import { decode } from 'html-entities';
import HTML from "react-native-render-html";

const regex = /(<([^>]+)>)/ig;
// const qmark = "&quot;"
// const apo = '&apos;'
// const andt = '&amp;'
// const lessthan = '&lt;'
// const greaterthan = '&gt;'
// const space = '&nbsp';
// const deg = '&deg;'

export default class BookmarkScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false, questionList: [],
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
        }

    }
    componentDidMount = () => {
        this.getQuestionList()
        Emitter.addListener('bookMarks', () => {
            this.getQuestionList()
        })
    }
    getQuestionList = () => {
        let qList = getBookMarkQuestions();
        console.log('qlist data => ', qList)
        this.setState({ questionList: qList })
    }

    renderHeading = () => {
        return (
            <AppHeader title="Bookmarks" />
        )
    }

    onPressMove = (item) => {
        let returnArrayData = {}
        if (item.ArrayData.length > 0) {
            const data = item.ArrayData
            const returnData = data.map((aryItem) => {
                const itemObj = aryItem.row
                const newColObj = itemObj.map((newObjItem) => {
                    return newObjItem.column
                })
                return newColObj
            })

            returnArrayData.ArrayData = returnData
        }
        console.log('return Data array=> ', JSON.stringify(item.ArrayData))
        console.log('return Data => ', returnArrayData)
        Actions[Screen.QuestionsScreen]({ selectedItem: item, tableArray: returnArrayData })
    }


    renderCardView = ({ item }) => {
        let questionName = item.questionName.replace(regex, '');
        questionName = decode(questionName)

        let paragraph = item.paragraph;
        paragraph = decode(paragraph)
        return (
            <View style={{ ...CommonStyles.shadow, width: '90%', alignSelf: 'center', marginTop: Responsive.heightPx(2), borderRadius: 10, flexDirection: 'row' }}>
                <View style={{
                    flex: 0.85,
                    marginVertical: Responsive.heightPx(2),
                    borderRadius: 20,
                    paddingHorizontal: Responsive.widthPx(1),
                    flexDirection: 'column',
                    marginLeft: Responsive.widthPx(2)
                }}>
                    <Text style={styles.itemText}>{questionName}</Text>
                    <HTML source={{ html: paragraph }} tagsStyles={{ p: styles.paragraph }} />
                </View>
                <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                        }}
                        onPress={() => this.onPressMove(item)}
                    >
                        <Image style={styles.rightIcon} resizeMode="contain" source={Images.right} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderQuestionsFlatList = () => {
        const { questionList } = this.state
        console.log("Bookmark screen => " + questionList.length)
        return (
            questionList.length > 0 ?
                <FlatList
                    data={questionList}
                    extraData={this.state}
                    //ListHeaderComponent={() => this.renderHeading('Bookmarks')}
                    keyExtractor={(item, index) => 'triel' + index.toString()}
                    renderItem={this.renderCardView}
                    scrollEnabled={true}
                    style={styles.FlatListView}
                    contentContainerStyle={{ paddingBottom: Responsive.heightPx(2) }}
                    showsVerticalScrollIndicator={false}
                />
                : <View style={styles.mainContainer1}>
                    <Text style={styles.headingTitle1}>No Bookmarks</Text>
                </View>
        )
    }
    render() {
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer>
                <AppHeader title="Bookmarks" profileImage={imgpath} />
                <View style={{ flex: 1 }}>
                    {this.renderQuestionsFlatList()}
                </View>
            </AppContainer>
        )
    }

}


