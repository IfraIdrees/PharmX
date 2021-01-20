import React, { PureComponent } from 'react'
import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import AppSearch from '../../Component/AppSearch'
import { Color, Images, Loader, Responsive, getquestions, CommonStyles, Emitter } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import { styles } from './FaqScreenStyles'

// class renderCardView extends PureComponent {
//     constructor(props) {
//         super(props)
//         this.state = { refresh: false, toshow: false }
//     }

//     renderCardView = ({ item }) => {
//         return (
//             <View style={{ ...CommonStyles.shadow, width: '90%', alignSelf: 'center', marginTop: Responsive.heightPx(2), borderRadius: 10, flexDirection: 'row' }}>
//                 <View style={{
//                     flex: 0.85,
//                     marginVertical: Responsive.heightPx(2),
//                     borderRadius: 20,
//                     paddingHorizontal: Responsive.widthPx(1),
//                     flexDirection: 'column',
//                     marginLeft: Responsive.widthPx(2)
//                 }}>
//                     <Text style={styles.itemText}>{item.questionName}</Text>
//                     <View style={styles.Line}></View>
//                     <View style={this.state.toshow ? { height: 0, overflow: 'hidden' } : {}} >
//                         <Text numberOfLines={5} style={styles.paragraph}>{item.paragraph}</Text>
//                     </View>
//                 </View>
//                 <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center', }}>
//                     <TouchableOpacity
//                         style={{
//                             alignItems: 'center',
//                         }}
//                         onPress={() => {
//                             console.log('FAQ toshow ' + this.state.toshow);
//                             this.setState({ toshow: !this.state.toshow });
//                             refreshList();
//                         }}
//                     >
//                         <Image style={styles.rightIcon} resizeMode="stretch" source={Images.right} />
//                     </TouchableOpacity>
//                 </View>
//             </View >
//         )
//     }

// }

export default class FaqScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
            refresh: false,
            faqQuestion: [
                {
                    questionName: "Which one of the following medicines should be temporary withheld in this patient?",
                    paragraph: "Question 8 and 9 relate to a 76-year-old female who is admitted into hospital after suffering from syncope. Her blood pressure on admission is 89/63 mmHg. She states she feels tired and confused. Her usual medication includes, dabigatran 150mg twice a day for the prevention of stroke. She also takes:",
                    visible: false
                },
                {
                    questionName: "Which one of the following medicines should be temporary withheld in this patient?",
                    paragraph: "Question 8 and 9 relate to a 76-year-old female who is admitted into hospital after suffering from syncope. Her blood pressure on admission is 89/63 mmHg. She states she feels tired and confused. Her usual medication includes, dabigatran 150mg twice a day for the prevention of stroke. She also takes:",
                    visible: false
                },
                {
                    questionName: "Which one of the following medicines should be temporary withheld in this patient?",
                    paragraph: "Question 8 and 9 relate to a 76-year-old female who is admitted into hospital after suffering from syncope. Her blood pressure on admission is 89/63 mmHg. She states she feels tired and confused. Her usual medication includes, dabigatran 150mg twice a day for the prevention of stroke. She also takes:",
                    visible: false
                },
                {
                    questionName: "Which one of the following medicines should be temporary withheld in this patient?",
                    paragraph: "Question 8 and 9 relate to a 76-year-old female who is admitted into hospital after suffering from syncope. Her blood pressure on admission is 89/63 mmHg. She states she feels tired and confused. Her usual medication includes, dabigatran 150mg twice a day for the prevention of stroke. She also takes:",
                    visible: false
                },
            ]
        }
    }

    clickItem = (item, index) => {
        let temp = this.state.faqQuestion;
        temp[index].visible = !temp[index].visible;
        this.setState(this.state.faqQuestion = temp)
        this.refreshList();
    }

    renderCardView = ({ item, index }) => {
        return (
            <View>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: Responsive.heightPx(2), borderRadius: 10, flexDirection: 'row' }}>
                    <View style={styles.viewbox}>
                        <Text style={styles.itemText}>{item.questionName}</Text>
                    </View>
                    <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                            }}
                            onPress={() => this.clickItem(item, index)}
                        >
                            <Image style={item.visible ? styles.rightIcons : styles.rightIcon} resizeMode="stretch" source={Images.right} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={this.state.faqQuestion[index].visible ? {} : { height: 0, overflow: 'hidden' }} >
                    <View style={styles.viewbox1}>
                        <Text numberOfLines={10} style={styles.paragraph}>{item.paragraph}</Text>
                    </View>
                </View>
            </View>
        )
    }

    refreshList = () => {
        this.setState({ refresh: !this.state.refresh });
    }
    renderFaqFlatList = () => {
        const { faqQuestion } = this.state
        return (
            <FlatList
                data={faqQuestion}
                extraData={this.state.refresh}
                keyExtractor={(item, index) => 'triel' + index.toString()}
                renderItem={this.renderCardView}
                scrollEnabled={true}
                style={styles.FlatListView}
                contentContainerStyle={{ paddingBottom: Responsive.heightPx(2) }}
                showsVerticalScrollIndicator={false}
            />
        )
    }
    render() {
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer>
                <AppHeader title="FAQ" profileImage={imgpath} />
                <View style={{ flex: 1 }}>
                    {this.renderFaqFlatList()}
                </View>
            </AppContainer>
        )
    }

}


