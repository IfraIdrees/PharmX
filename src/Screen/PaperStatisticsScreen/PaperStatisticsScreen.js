import React, { PureComponent } from 'react'
import { View, Image, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList, Alert, Modal } from 'react-native'
import AppContainer from '../../Component/AppContainer'
import AppHeader from '../../Component/AppHeader'
import { Color, Images, Loader, Responsive, addquestion, getquestions, Emitter, CommonStyles, Fonts, Screen, commonConstant } from '../../Helper'
import APICall from '../../Network/APICall'
import { styles } from './PaperStatisticsScreenStyles'
import _, { attempt } from 'lodash'
import Carousel from 'react-native-snap-carousel'
import EndPoints from '../../Network/EndPoints'
import * as Progress from 'react-native-progress';
import AsyncImage from '../../Component/AsyncImage'
import { Col } from 'react-native-table-component'
import { Table, Row, Rows } from 'react-native-table-component';
import { getQuestionPaperById } from '../../Helper/RealMdb'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import AppButton from '../../Component/AppButton'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { showAlert, showAlertWithTwoCallback, showAlertWithYes } from '../../Helper/Alert'

export default class PaperStatisticsScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            startData: [
                { selected: false },
                { selected: false },
                { selected: false },
                { selected: false },
                { selected: false },
            ],
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
            rateing: false
        }
    }
    componentDidMount = async () => { }
    onPressSubmit = () => { }

    submitBbuttonView = () => {
        return (
            <View style={{ alignSelf: 'center', marginTop: Responsive.heightPx(2), width: Responsive.widthPx(70) }}>
                <AppButton label="Submit" onPress={this.onPressSubmit} />
            </View>
        )
    }
    renderHeadImage = () => {
        return (
            <View style={{ flexDirection: "column", alignItems: 'center', alignSelf: 'center' }}>
                <Image source={Images.paper} style={styles.submitImage} resizeMode="contain" />
                <Text style={styles.attemettext}>Your Paper Stats</Text>
            </View>
        )
    }
    renderMiddleScreen = () => {
        return (
            <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={[Color.blueShade56, Color.blueShade00]}
                style={[styles.middleBox, { borderRadius: Responsive.heightPx(3) }]}
            >
                <View style={styles.roundBoxView}>
                    <View style={styles.roundView}>
                        <AnimatedCircularProgress
                            size={90}
                            width={7.5}
                            backgroundWidth={2.5}
                            fill={this.props.percentage}
                            tintColor={Color.white}
                            backgroundColor={Color.blueShade56}
                            rotation={360}
                            lineCap="round"
                        >
                            {() => (
                                <View style={styles.innerBox}>
                                    <Text style={styles.middleText}>{this.props.percentage}%</Text>
                                </View>
                            )}
                        </AnimatedCircularProgress>
                        <Text style={styles.roundText}>Percentage</Text>
                    </View>
                    <View style={styles.rightBorder} />
                    <View style={styles.roundView}>
                        <AnimatedCircularProgress
                            size={90}
                            width={7.5}
                            backgroundWidth={2.5}
                            fill={this.props.percentage}
                            tintColor={Color.white}
                            backgroundColor={Color.blueShade56}
                            rotation={360}
                            lineCap="round"
                        >
                            {() => (
                                <View style={styles.innerBox}>
                                    <Text style={styles.middleText}>{this.props.score}</Text>
                                </View>
                            )}
                        </AnimatedCircularProgress>
                        <Text style={styles.roundText}>Score</Text>
                    </View>
                </View>
            </LinearGradient>
        )
    }
    renderflag = () => {
        return (
            <View style={{ marginTop: Responsive.heightPx(2), flexDirection: "row", width: '85%', alignItems: 'center', alignSelf: 'center' }}>
                <Image source={Images.flag} style={styles.flagImage} resizeMode="contain" />
                <Text style={styles.flagtext}>Flaged Questions</Text>
                <Text style={styles.flagnumber}>{(this.props.noOfFlag < 10) ? "0" + this.props.noOfFlag : this.props.noOfFlag}</Text>
            </View>
        )
    }
    setRateing = (index, item) => {
        console.log('item => ', item.selected)
        console.log('data => ', this.state.startData, "Rateing=> ", this.state.rateing)
        const { startData, rateing } = this.state
        const obj = startData
        obj.map((item, itemIndex) => {
            if (index < itemIndex) {
                item.selected = false
            } else {
                item.selected = true
            }
            return item
        })
        this.setState({ startData: obj, rateing: !rateing }, () => {
            console.log('data => ', this.state.startData, "Rateing=> ", this.state.rateing)
        })
    }
    renderStar = ({ item, index }) => {
        console.log('renderStar item => ', item)
        // if (item.selected) {
        //     return (
        //         <TouchableOpacity style={styles.paperBox2} onPress={() => { setRateing(index) }}>
        //             <Image source={Images.a_rateStar} style={styles.starImage} resizeMode="contain" />
        //         </TouchableOpacity>
        //     )
        // }
        // else {
        const imageUrl = item.selected ? Images.a_rateStar : Images.i_rateStar
        return (
            <TouchableOpacity style={styles.paperBox2} onPress={() => this.setRateing(index, item)}>
                <Image source={imageUrl} style={styles.starImage} resizeMode="contain" />
            </TouchableOpacity>
        )
        // }
    }
    renderRatePapaer = () => {
        const { startData } = this.state
        return (
            <View style={{ marginTop: Responsive.heightPx(2), width: '85%', alignSelf: 'center', alignItems: "center" }}>
                <Text style={styles.ratetext}>Rate This Paper</Text>
                <FlatList
                    data={startData}
                    extraData={this.state}
                    horizontal={true}
                    // keyExtractor={ item + index}
                    renderItem={this.renderStar}
                    style={{ width: Responsive.widthPx(100), alignSelf: 'center', marginTop: Responsive.heightPx(2), marginLeft: Responsive.widthPx(20) }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    onPressReviewPaper = (id) => {
        Actions[Screen.ReviewScreen]({ id: id });
    }
    onPressExit = () => {
        Actions.replace(Screen.DashBoardScreen);
    }
    renderBottom = () => {
        return (
            <View style={{ marginTop: Responsive.heightPx(7.5), flexDirection: "row", width: '85%', justifyContent: 'space-evenly', alignSelf: 'center', alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.onPressReviewPaper(this.props.paperid)}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}

                        colors={[Color.greenShade5C, Color.greenShade05]}
                        style={styles.btnContainer}
                    >
                        <Image source={Images.reviewButton} style={styles.buttonImage} resizeMode="contain" />
                        <Text style={styles.buttonText}>Review Paper</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onPressExit()}>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        colors={[Color.blueShade56, Color.blueShade00]}
                        style={styles.btnContainer}
                    >
                        <Image source={Images.exit_paper} style={styles.buttonImage} resizeMode="contain" />
                        <Text style={styles.buttonText}>Exit Paper</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        )
    }
    render() {
        //console.log("PROPS  Percentage => " + this.props.percentage + " Score => " + this.props.score + " noOfFlags => " + this.props.noOfFlag);
        const { profileimg } = this.state;
        const imgpath = profileimg !== null ? profileimg : null
        return (
            <AppContainer>
                <AppHeader title="Statistics" isBack profileImage={imgpath} />
                <ScrollView>
                    {this.renderHeadImage()}
                    {this.renderMiddleScreen()}
                    {this.renderflag()}
                    <View style={styles.centerBorder} />
                    {this.renderRatePapaer()}
                    {this.renderBottom()}
                </ScrollView >
            </AppContainer>
        )
    }
}