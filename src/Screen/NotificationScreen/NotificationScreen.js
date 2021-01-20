import React, { Component } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import AppHeader from '../../Component/AppHeader'
import { styles } from './NotificationScreenStyles'
import { Utility, Loader, Responsive } from '../../Helper'
import APICall from '../../Network/APICall'
import EndPoints from '../../Network/EndPoints'
import AppContainer from '../../Component/AppContainer'
import moment from 'moment';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notificationsList: null,
            profileimg: global.userData.fullImagePath !== null ? global.userData.fullImagePath : null,
        }
    }

    componentDidMount = () => {
        Loader.isLoading(true)
        APICall('get', null, EndPoints.notificationdata)
            .then((response) => {

                if (response.status === 200 && response.data) {
                    Loader.isLoading(false)
                    this.setState({ notificationsList: response.data.data.notifications })
                    // console.log("List => " + JSON.stringify(this.state.notificationsList))
                } else {
                    Loader.isLoading(false)
                    Utility.showToast(response.data.message)
                }
            })
            .catch(() => Loader.isLoading(false))

    }
    renderListitem(item) {
        const logo = {
            uri: item.item.notificationTypeDetails.fullIconPath,
        };
        let notedata = item.item.notificationData
        let isgeneral = item.item.isGeneralNotification
        console.log("IS General=> " + isgeneral)
        var now = moment.utc();
        now = moment.utc(now).toDate();
        now = moment(now).local();
        var end = moment.utc(item.item.createdAt);
        end = moment(end).local()
        console.log("NOW =>" + moment(now).format('YYYY-MM-DD HH:mm:ss') + " ENd=> " + moment(end).format('YYYY-MM-DD HH:mm:ss'));

        var duration = moment.duration(now.diff(end));
        var seconds = duration.asSeconds();
        var minutes = seconds >= 60 ? duration.asMinutes() : 0;
        var hours = minutes >= 60 ? duration.asHours() : 0
        var days = hours >= 24 ? duration.asDays() : 0
        var timetoshow = null;
        if (days != 0) {
            if (parseInt(days) === 1)
                timetoshow = parseInt(days) + " day ago"
            else
                timetoshow = parseInt(days) + " days ago"
        } else if (hours != 0) {
            if (parseInt(hours) === 1)
                timetoshow = parseInt(hours) + " hour ago"
            else
                timetoshow = parseInt(hours) + " hours ago"

        } else if (minutes != 0) {
            if (parseInt(hours) === 1)
                timetoshow = parseInt(minutes) + " minute ago"
            else
                timetoshow = parseInt(minutes) + " minutes ago"
        }
        else {
            timetoshow = "just now"
        }
        return (
            <View style={styles.item}>
                <Image source={logo} resizeMode='contain' style={styles.logo} />
                <View style={{ flex: 1, flexDirection: 'column', marginBottom: Responsive.heightPx(1.25) }}>
                    {!isgeneral ? <Text style={styles.title}>{(notedata.title)}</Text> : null}
                    <Text numberOfLines={2} style={[styles.description, { height: isgeneral ? '100%' : '50%', marginTop: (Platform.OS === 'ios' && isgeneral) ? Responsive.heightPx(3) : Responsive.heightPx(0.5) }]}>{(notedata.description)}</Text>
                </View>
                <Text style={styles.time}>{(timetoshow)}</Text>
            </View>
        )
    }
    renderNotifications = () => {
        const { notificationsList } = this.state;

        return (

            <FlatList
                data={notificationsList}
                extraData={this.state}
                renderItem={this.renderListitem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />

        )
    }

    render() {
        const { profileimg } = this.state;
        const imgpath = (profileimg !== null && isNaN(profileimg)) ? profileimg : null
        return (
            <AppContainer >
                <AppHeader title="Notifications" profileImage={imgpath} isBack />
                <View style={{ flex: 1, width: "85%", alignSelf: 'center', marginTop: Responsive.heightPx(2) }}>
                    {this.renderNotifications()}
                </View>
            </AppContainer>
        )
    }
}