import React, { PureComponent } from 'react'
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  Platform
} from 'react-native'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import { Color, Images, Loader, Responsive, addquestion, getquestions, Emitter, CommonStyles, Fonts, Screen, commonConstant, Utility } from '../../Helper'
import APICall from '../../Network/APICall'
import { styles } from './QuestionsScreenStyle'
import _, { attempt } from 'lodash'
import Carousel from 'react-native-snap-carousel'
import EndPoints from '../../Network/EndPoints'
import * as Progress from 'react-native-progress';
import AsyncImage from '../../Component/AsyncImage'
import { Col } from 'react-native-table-component'
import { Table, Row, Rows } from 'react-native-table-component';
import { getQuestionPaperById, getBookMarkQuestions } from '../../Helper/RealMdb'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import { showAlert, showAlertWithTwoCallback, showAlertWithYes } from '../../Helper/Alert'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
// const squote='&rsquo;'


export default class QuestionsScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuestionId: null,
      questionList: [],
      displaylist: [],
      selectedOption: null,
      currentIndex: 0,
      isLoader: true,
      isAttemtedPaper: false,
      resultModal: false,
      percentage: null,
      score: null,
      noOfFlag: null,
      allowsubmit: false,
      profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
      passcount: 0,
      paperInfo: this.props.paperInfo,
      paperId: this.props.paperID,
      title: "Questions"
    }
  }


  componentDidMount = async () => {
    if (this.props.selectedItem) {
      Loader.isLoading(true)
      const itemData = []
      itemData.push(this.props.selectedItem)
      this.setState({ questionList: itemData, isLoader: false }, () => {
        Loader.isLoading(false); this.fillarry()

      })

    } else {
      const { paperId } = this.state
      Loader.isLoading(true)
      const localData = await getQuestionPaperById(paperId)
      if (localData.length > 0 && localData[0].paperData.length > 0) {
        // console.log("TEST LocalData => " + localData.length)
        // console.log('localData[0].paperData.isAttemted => ', localData[0])
        // console.log('local data => ', localData)
        if (localData[0].isAttemted) {
          showAlertWithTwoCallback('Would you like to attempt this paper again?', 'PharmaX', 'Yes', 'No', this.onPressReattemt, this.onPressCancel)
        }
        this.setState({
          questionList: localData[0].paperData,
          currentIndex: 0,
          selectedQuestionId: localData[0].paperData[0].id,
          isLoader: false,
          isAttemtedPaper: localData[0].isAttemted
        })
        this.fillarry()
        Loader.isLoading(false)
      } else {
        const { paperId } = this.state
        APICall('get', null, EndPoints.questionList + paperId)
          .then((response) => {
            if (response.status === 200 && response.data && response) {
              // console.log("TEST RESPONSE => " + response.data)
              const obj = response.data.data
              const newObj = obj.map((item) => {
                const innerOption = item.questionOptions
                const innerObj = innerOption.map((innerItem) => {
                  innerItem.isSelected = false
                  return innerItem
                })
                item.isFlag = false
                item.questionOptions = innerObj
                return item
              })
              const { paperInfo } = this.state;
              // console.log("papaer Info paper Scree=> " + JSON.stringify(paperInfo))
              const questionPaper = {
                id: paperId,
                isAttemted: false,
                paperInfo: paperInfo,
                paperDetails: newObj
              }
              // console.log('add questionpaper in questionScreen => ', questionPaper)
              addquestion(questionPaper)
              this.setState({
                questionList: newObj,
                currentIndex: 0,
                selectedQuestionId: response.data.data[0].id,
                isLoader: false
              }, () => {
                Loader.isLoading(false)
                this.fillarry()
              })
            } else {
              Loader.isLoading(false)
              // console.log('error in data => ', response)
            }
          })
          .catch((err) => {
            // console.log('error => ', err)
            Loader.isLoading(false)
          })
      }
    }
  }

  onSelectOption = (selectedOptionItem) => {
    const { isAttemtedPaper } = this.state
    if (!(this.props.selectedItem))
      if (!isAttemtedPaper) {
        const realm = new Realm({ path: 'storeBookmarks.realm' })
        realm.write(() => {
          Loader.isLoading(true)
          const { questionList, selectedQuestionId } = this.state
          const obj = questionList
          const newObj = obj.map((item) => {
            if (item.id === selectedQuestionId) {
              const optionObj = item.questionOptions
              const newOption = optionObj.map((optionItem) => {
                if (optionItem.id === selectedOptionItem.id) {
                  optionItem.isSelected = true
                } else {
                  optionItem.isSelected = false
                }
                return optionItem
              })
              item.questionOptions = newOption
              return item
            } else {
              return item
            }
          })
          this.setState({ questionList: newObj }, () => {
            Loader.isLoading(false)
          })
        })
      } else {

      }
  }
  onPressReattemt = async () => {
    // console.log("RETRY")
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    await realm.write(() => {
      Loader.isLoading(true)
      const { questionList, selectedQuestionId, isAttemtedPaper, paperInfo } = this.state
      const obj = questionList
      const newObj = obj.map((item) => {
        const optionObj = item.questionOptions
        const newOption = optionObj.map((optionItem) => {
          optionItem.isSelected = false
          return optionItem
        })
        item.questionOptions = newOption
        return item
      })
      this.setState({ isAttemtedPaper: false, questionList: newObj }, () => {
        Loader.isLoading(false)
        // console.log('change data => ', this.state.questionList)
      })
    })


  }
  onPressCancel = () => {
    // console.log("RETRY NO")
  }
  renderProgressBar = () => {
    const { questionList, currentIndex, allowsubmit } = this.state
    let tickimage = Images.paperTick;
    let imgpath = (allowsubmit && currentIndex >= (questionList.length - 1)) ? tickimage : null
    let progressval = 0;
    if (currentIndex < questionList.length)
      progressval = currentIndex + 1;
    else
      progressval = questionList.length;

    return (
      <View style={styles.progressBarBox}>
        <View style={{
          width: Responsive.widthPx(80), marginLeft: Responsive.widthPx(6), alignSelf: 'center',
          flexDirection: 'row', alignItems: 'center'
        }}>
          <Progress.Bar progress={(currentIndex + 1) / questionList.length} width={Responsive.widthPx(74)} height={Responsive.heightPx(2)} color={Color.greenProgres} borderWidth={0} unfilledColor={Color.darkTabbar} />
          < Image style={styles.tickIcon} resizeMode="contain" source={imgpath} />
        </View>
        <Text style={styles.questionNumberText}>{progressval}/{questionList.length > 0 && questionList.length}</Text>
      </View>
    )
  }
  onflagpress = async (item) => {

    if (this.props.selectedItem) {
      let selectedQuestionId = item.id
      let qdata = getBookMarkQuestions()
      const realm = new Realm({ path: 'storeBookmarks.realm' })
      realm.write(() => {
        Loader.isLoading(true)
        const obj = qdata
        const newObj = obj.map((item) => {
          if (item.id === selectedQuestionId) {
            const optionObj = item.questionOptions
            if (item.isFlag) {
              item.isFlag = false
            } else {
              item.isFlag = true
            }
            return item
          } else {
            return item
          }
        })
        Utility.showToast("Bookmark Removed ")
        Loader.isLoading(false)
      })
    }
    else {
      const realm = new Realm({ path: 'storeBookmarks.realm' })
      realm.write(() => {
        Loader.isLoading(true)
        const { questionList, selectedQuestionId } = this.state
        const obj = questionList
        const newObj = obj.map((item) => {
          if (item.id === selectedQuestionId) {
            const optionObj = item.questionOptions
            if (item.isFlag) {
              item.isFlag = false
            } else {
              item.isFlag = true
            }
            return item
          } else {
            return item
          }
        })
        this.setState({ questionList: newObj }, () => {
          Loader.isLoading(false)
        })
      })
    }
    Emitter.emit('bookMarks')
  }

  onPressSubmit = () => {
    const { questionList } = this.state
    const obj = questionList
    let answerObj = []
    obj.map((item) => {
      const optionalObj = item.questionOptions
      const ansObj = _.filter(optionalObj, (optionItem) => optionItem.isSelected)
      if (ansObj.length > 0) answerObj.push(ansObj)
    })
    // console.log('answer length => ', answerObj.length)
    if (answerObj.length === questionList.length) {
      // console.log('done for checking')
      this.resultCalculte()
    } else {
      showAlert('please attend all questions')
    }
  }

  resultCalculte = async () => {
    const { questionList, paperId, paperInfo } = this.state
    let currectAnswer = []
    let inCurrentAnswer = []
    let bookmarkCollection = []
    Loader.isLoading(true)
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    realm.write(() => {
      realm.create('questionPaperDb', {
        id: paperId,
        isAttemted: true,
        paperInfo: paperInfo,
        paperData: questionList
      }, 'modified')
    })
    const obj = questionList
    obj.map((objItem) => {
      const answerKey = objItem.answer
      const options = objItem.questionOptions
      if (objItem.isFlag) {
        bookmarkCollection.push(objItem)
      }
      options.map((optionItem) => {
        if (optionItem.isSelected) {
          if (optionItem.optionKey === answerKey) {
            currectAnswer.push(objItem)
          } else {
            inCurrentAnswer.push(objItem)
          }
        }
      })
    })
    const { passcount } = this.state;
    let passmark = (questionList.length * 70) / 100
    // console.log("passmark => " + passmark)
    let pcount = (currectAnswer.length >= passmark) ? passcount + 1 : passcount
    commonConstant.PassCount = pcount;
    try {
      await AsyncStorage.setItem('@passcount', JSON.stringify(pcount))
    } catch (e) {
      // saving error
    }
    // console.log("Async Value pass => " + pcount)

    // console.log('Percentage => ', `${currectAnswer.length / questionList.length * 100}%`)
    // console.log('score => ', currectAnswer.length, '/', questionList.length)
    // console.log('Number of flagged questions =>', bookmarkCollection.length)
    this.setState({
      percentage: currectAnswer.length / questionList.length * 100,
      score: `${currectAnswer.length}/${questionList.length}`,
      noOfFlag: bookmarkCollection.length,
      //resultModal: true
    })
    Emitter.emit('profileUpdate');
    Loader.isLoading(false)
    let p = currectAnswer.length / questionList.length * 100;
    let s = `${currectAnswer.length}/${questionList.length}`;
    let f = bookmarkCollection.length;
    Actions[Screen.PaperStatisticsScreen]({ percentage: p, score: s, noOfFlag: f, paperid: paperId })

  }

  onBackClick = async () => {
    // console.log("back pressed==> ")
    const { isAttemtedPaper } = this.state
    if (!this.props.selectedItem && !isAttemtedPaper) {
      const realm = new Realm({ path: 'storeBookmarks.realm' })
      // console.log('component will unMount call')
      await showAlertWithTwoCallback('Do you want to save your answers', 'Pharmx', 'Yes', 'No', async () => {
        await this.setState({
          selectedQuestionId: null,
          questionList: [],
          selectedOption: null,
          currentIndex: 0,
          isAttemtedPaper: false,
        }, () => {
          Actions.pop()
        })
      }, async () => {
        await realm.write(() => {
          Loader.isLoading(true)
          const { questionList, selectedQuestionId } = this.state
          const obj = questionList
          const newObj = obj.map((item) => {
            const optionObj = item.questionOptions
            const newOption = optionObj.map((optionItem) => {
              optionItem.isSelected = false
              return optionItem
            })
            item.questionOptions = newOption
            return item
          })
          this.setState({ questionList: newObj }, () => {
            Loader.isLoading(false)
          })
        })
        await this.setState({
          selectedQuestionId: null,
          questionList: [],
          selectedOption: null,
          currentIndex: 0,
          isAttemtedPaper: false,
        }, () => {
          Actions.pop()
        })
      })
    } else {
      Actions.pop()
    }
  }

  renderBlueBox = (item) => {
    let result = item.paragraph
    result = decode(result)
    return (
      <View style={styles.blueBox}>
        <View>
          <TouchableOpacity style={styles.flagBox} onPress={() => {

            this.onflagpress(item)

          }}>
            <Image source={item.isFlag ? Images.selectedFlag : Images.flag} resizeMode="contain" style={styles.flagIcon} />
          </TouchableOpacity>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={['#56B5F5', '#0071BC']}
            style={{
              width: Responsive.widthPx(65),
              height: Responsive.heightPx(15),
              borderRadius: Responsive.heightPx(3),
              marginHorizontal: Responsive.widthPx(10),
              // marginTop: Responsive.heightPx(0.5),
              position: 'absolute',
              zIndex: -1,
              top: 0,
              right: 0,
              left: 0,
              opacity: 0.4
            }}
          />
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={['#56B5F5', '#0071BC']}
            style={{
              width: Responsive.widthPx(75),
              height: Responsive.heightPx(10),
              borderRadius: Responsive.heightPx(3),
              marginHorizontal: Responsive.widthPx(5),
              marginTop: Responsive.heightPx(1.5),
              alignSelf: 'center',
              position: 'absolute',
              zIndex: -1,
              top: 0,
              right: 0,
              left: 0,
              opacity: 0.6
            }}
          />
          <View style={{
            width: Responsive.widthPx(85),
            borderRadius: Responsive.heightPx(3),
            marginTop: Responsive.heightPx(3),
            ...CommonStyles.questionBox,
          }}>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={['#56B5F5', '#0071BC']}
              style={{
                paddingVertical: Responsive.heightPx(2),
                paddingHorizontal: Responsive.heightPx(2),
                borderRadius: Responsive.heightPx(3),
              }}>
              <HTML source={{ html: result }} baseFontStyle={styles.paragraphText} classesStyles={{ color: Color.white }} tagsStyles={{ li: { color: Color.white }, ul: { color: Color.white } }} />
            </LinearGradient>
          </View>
        </View>
        { item.noOfRows !== 0 && item.noOfColumns !== 0 && this.questionTableViewLibrary(item)}
        {/* {item.noOfRows !== 0 && item.noOfColumns !== 0 && this.questionTableView(item)} */}
        {
          item.questionImage && item.fullImagePath && (
            <View style={{ marginTop: Responsive.heightPx(2), marginBottom: 10, alignItems: 'center' }}>
              <AsyncImage style={styles.chatBox} source={{ uri: item.fullImagePath }} />
            </View>
          )
        }
      </View >
    )
  }

  renderQuestion = (item) => {
    let answer = item.answer
    let qname = item.questionName.replace(regex, '');
    qname = decode(qname)
    return (
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{qname}</Text>
        <FlatList
          data={item.questionOptions}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderOptionView(item, answer)}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  questionTableViewLibrary = (item) => {
    const arrayItem = item.ArrayData
    const ary = arrayItem
    const newArray = ary.map((aryItem) => {
      const inrAry = aryItem.row.map((rowItem) => {
        return rowItem.column
      })
      return inrAry

    })
    let change = false;
    console.log(newArray[0][0]);
    if (newArray[0][0] && newArray[0][0].includes('<header>')) {
      change = true;
      for (let i = 0; i < newArray.length; i++)
        if (newArray[0][i] && newArray[0][i].includes("<header>")) {
          newArray[0][i] = newArray[0][i].replace('<header>', '')
          newArray[0][i] = newArray[0][i].replace('<header>', '')
        }
    }
    else { change = false }

    return (
      <View style={{ marginTop: Responsive.heightPx(2), marginBottom: 10, flex: 1, width: '80%' }}>
        <Table>
          {
            newArray.map((rowData, index) => (

              < Row
                key={index}
                data={rowData}
                style={{ backgroundColor: Color.white }}
                textStyle={(change && index === 0) ? styles.tabeletextb : styles.tabeletext}
              />

            ))
          }
        </Table>
      </View>
    )
  }
  renderOptionView = (item, answer, index) => {
    const isChecked = item.isSelected
    index = index;
    let bgcolor = Color.white;
    let bgimg = Images.checkbox
    const isCorrect = ((JSON.stringify(item.optionKey) === answer) && isChecked)
    let opt = item.optionName.replace(regex, '')
    opt = decode(opt)
    if (this.props.selectedItem) {
      if (isChecked) {
        bgcolor = Color.blueShade00;
        bgimg = Images.selectionView;
      }
      if (isCorrect) {
        bgcolor = Color.greenShade05;
        bgimg = Images.correct;
      }
      if (item.optionKey === answer) {
        bgcolor = Color.greenShade05;
        bgimg = Images.correct;
      }
    }
    else {
      if (isChecked) {
        bgcolor = Color.blueShade00;
        bgimg = Images.selectionView;
      }
    }
    return (
      <TouchableOpacity
        style={[styles.optionBox, { backgroundColor: bgcolor }]}
        //key={index.toString()}
        onPress={() => this.onSelectOption(item)}

      >
        <Image
          source={bgimg}
          resizeMode="contain"
          style={styles.checkedImg}
        />
        <Text style={[styles.optionText, { flex: 1, }, (isChecked || isCorrect) && { color: Color.white }]}>
          {opt}
        </Text>
      </TouchableOpacity>
    )
  }

  submitBbuttonView = () => {
    return (
      <View style={{ alignSelf: 'center', marginTop: Responsive.heightPx(2), width: Responsive.widthPx(70) }}>
        <AppButton label="Submit" onPress={this.onPressSubmit} />
      </View>
    )
  }
  paperCompleteView = () => {
    const { questionList, allowsubmit } = this.state
    const obj = questionList
    let answerObj = []
    let attempttext = ""
    let submittext = ""
    obj.map((item) => {
      const optionalObj = item.questionOptions
      const ansObj = _.filter(optionalObj, (optionItem) => optionItem.isSelected)
      if (ansObj.length > 0) answerObj.push(ansObj)
    })
    if (answerObj.length === questionList.length) {
      attempttext = "All Questions Attempted"
      submittext = "Please submit the paper"
      this.setState({ allowsubmit: true })
    } else {
      attempttext = "All Questions Not Attempted"
      submittext = "Please Attempt All Questions"
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', }}>
        <Image source={Images.paper2} style={styles.submitImage} resizeMode="contain" />
        <Text style={styles.attemettext}>{attempttext}</Text>
        <Text style={styles.submittext}>{submittext}</Text>
        {allowsubmit ? <AppButton label="Submit Paper" onPress={() => this.resultCalculte()} /> : null}
      </View>
    )
  }
  renderQuestionPaper = ({ item, index }) => {
    const { questionList, currentIndex } = this.state
    if (index === questionList.length) {
      // console.log('index => ', currentIndex)
      if (currentIndex > (questionList.length - 1)) {
        this.setState({ title: 'Submit' })
      }
      return (
        this.paperCompleteView()
      )
    }
    else {
      this.setState({ title: 'Question' })
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: Responsive.heightPx(1) }}>
          {this.renderBlueBox(item)}
          {this.renderQuestion(item)}
          {/* {questionList.length - 1 === index && !this.props.selectedItem && this.submitBbuttonView()} */}
          {/* {this.submitBbuttonView()} */}
        </ScrollView>
      )
    }

  }

  onPressExit = () => {
    this.setState({ resultModal: false })
    Actions.replace(Screen.DashBoardScreen)
  }

  onPressReview = () => {
    // showAlertWithYes('work in progress', "ok", () => {
    this.setState({ resultModal: false })
    Actions.replace(Screen.PaperStatisticsScreen)
    //Actions.replace(Screen.ReviewScreen)
    //})
    // Actions.replace(Screen.ReviewScreen)
  }

  modalView = () => {
    const { resultModal, percentage, score, noOfFlag } = this.state
    return (
      <Modal visible={resultModal} transparent>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.blackShade26,
          }}>
          <View style={{
            width: Responsive.widthPx(80),
            backgroundColor: Color.white,
            padding: Responsive.widthPx(2),
            alignItems: 'center',
            borderRadius: Responsive.widthPx(2)
          }}>
            <Text style={{
              fontSize: Responsive.font(2),
              fontFamily: Fonts.semiBold,
              color: Color.black,
            }}>Result</Text>
            <View style={styles.modalInnerView}>
              <Text style={styles.modalText}>Score</Text>
              <Text style={styles.modalResultText}>{score}</Text>
            </View>
            <View style={styles.modalInnerView}>
              <Text style={styles.modalText}>Percentage</Text>
              <Text style={styles.modalResultText}>{percentage}%</Text>
            </View>
            <View style={styles.modalInnerView}>
              <Text style={styles.modalText}>Number of flagged questions</Text>
              <Text style={styles.modalResultText}>{noOfFlag}</Text>
            </View>
            <View style={[styles.modalInnerView, { justifyContent: 'space-around' }]}>
              <AppButton containerStyle={{ width: Responsive.widthPx(30), height: Responsive.heightPx(4) }} label="Review" onPress={this.onPressReview} />
              <AppButton containerStyle={{ width: Responsive.widthPx(30), height: Responsive.heightPx(4) }} label="Exit" onPress={this.onPressExit} />
            </View>
          </View>
        </View>
      </Modal >
    )
  }
  fillarry = () => {
    const { questionList } = this.state;
    // console.log("Question paper Length fillarry=> " + questionList.length)
    if (questionList.length != 1) {
      let temp = [];
      // console.log("Question paper Length=> " + questionList.length)
      if (questionList.length < 1)
        temp = questionList;
      else {
        for (let i = 0; i < questionList.length; i++) {
          temp.push(questionList[i]);
        }
        temp.push(questionList[1]);
      }
      this.setState({ displaylist: temp })
    } else
      this.setState({ displaylist: questionList })
  }
  render() {
    const { title, isLoader, resultModal, questionList, profileimg, displaylist, } = this.state
    const imgpath = profileimg !== null ? profileimg : null
    //console.log("TEST LENGHT => " + questionList.length)


    return (
      <AppContainer>
        <AppHeader title={title} isBack onBackPress={this.onBackClick} profileImage={imgpath} />
        {!this.props.selectedItem && this.renderProgressBar()}
        {resultModal && this.modalView()}
        {(!isLoader && questionList.length > 0) && (
          <Carousel
            extraData={this.state}
            data={displaylist}
            renderItem={this.renderQuestionPaper}
            sliderWidth={Responsive.widthPx(100)}
            itemWidth={Responsive.widthPx(100)}
            activeAnimationType={Platform.OS === "android" ? "spring" : "timing"}
            onBeforeSnapToItem={(item) => {
              if (item !== questionList.length) {
                this.setState({ currentIndex: item, selectedQuestionId: questionList[item].id })
              }
              else {
                this.setState({ currentIndex: item })
              }
            }}

          />
        )}
      </AppContainer>
    )
  }
}
