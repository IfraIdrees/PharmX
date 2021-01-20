import { notifications, NotificationMessage, Android } from 'react-native-firebase-push-notifications'
import APICall from '../Network/APICall'
import EndPoints from '../Network/EndPoints'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import Loader from "./Loader";

// export const getToken = async () => {
//     //get the messeging token
//     const token = await notifications.getToken()
//     //you can also call messages.getToken() (does the same thing)
//     return token
// }
export const setToken = async () => {
    Loader.isLoading(true)
    let notificationToken = null;

    let device = 'iOS'
    if (Platform.OS === 'android') {
        notificationToken = await notifications.getToken();
        device = 'Android'
        console.log("Response noification Token for=>" + device + " = " + notificationToken)
        let payload = {
            deviceType: device,
            deviceToken: notificationToken
        }
        tokenUpdate(payload)
    }
    if (Platform.OS === 'ios') {
        await PushNotification.configure({
            onRegister: function (tokenData) {
                console.log("Response noification iOS=>", tokenData.token)
                notificationToken = tokenData.token;
                device = "iOS"
                let payload = {
                    deviceType: device,
                    deviceToken: notificationToken
                }
                tokenUpdate(payload)
            },
            onNotification: function (notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            }
        });
    }
    Loader.isLoading(false)
}

const tokenUpdate = async (payload) => {

    await APICall('post', payload, EndPoints.notificationToken)
        .then((response) => {
            console.log("Response noification Resopnce=>" + JSON.stringify(response))
            if (response.status === 200 && response.data) {
                console.log("Response noification data=>" + response)
            }
            else {
            }
        })
        .catch(() => { })
}
export const getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    const notification = await notifications.getInitialNotification()
    console.log("getInitialNotification", notification)
    return notification
}

export const onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
    this.removeOnNotificationOpened = notifications.onNotificationOpened(
        notification => {
            console.log("onNotificationOpened", notification)
            //do something with the notification
        }
    )
}

export const onNotificationListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
    this.removeOnNotification = notifications.onNotification(notification => {
        //do something with the notification
        console.log("onNotification", notification)
    })
}

export const onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
    this.removeonTokenRefresh = messages.onTokenRefresh(token => {
        //do something with the new token
    })
}
export const setBadge = async number => {
    //only works on iOS and some Android Devices
    return await notifications.setBadge(number)
}

export const getBadge = async () => {
    //only works on iOS and some Android Devices
    return await notifications.getBadge()
}

export const hasPermission = async () => {
    //only works on iOS
    return await notifications.hasPermission()
    //or     return await messages.hasPermission()
}

export const requestPermission = async () => {
    //only works on iOS
    return await notifications.requestPermission()
    //or     return await messages.requestPermission()
}

export const localNotification = async () => {
    //required for Android
    const channel = new Android.Channel(
        "test-channel",
        "Test Channel",
        Android.Importance.Max
    ).setDescription("My apps test channel")

    // for android create the channel
    notifications.android().createChannel(channel)
    await notifications.displayNotification(
        new NotificationMessage()
            .setNotificationId("notification-id")
            .setTitle("Notification title")
            .setBody("Notification body")
            .setData({
                key1: "key1",
                key2: "key2",
            })
            .android.setChannelId("test-channel") //required for android
    )
}


export const componentWillUnmount = () => {
    //remove the listener on unmount
    if (this.removeOnNotificationOpened) {
        this.removeOnNotificationOpened()
    }
    if (this.removeOnNotification) {
        this.removeOnNotification()
    }

    if (this.removeonTokenRefresh) {
        this.removeonTokenRefresh()
    }
}