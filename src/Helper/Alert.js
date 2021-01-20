import { Alert } from 'react-native'
import { commonConstant } from './Constant'
const Title = 'Pharmx';
export function showAlert(message, title = Title, buttonTitle = 'OK') {
    setTimeout(() => {
        Alert.alert(title, message, [{ text: buttonTitle }])
    }, 1000)
}

export function showAlertWithYes(message, firstButtonTitle, firstCallback) {
    setTimeout(() => {
        Alert.alert(
            Title,
            message,
            [
                {
                    text: firstButtonTitle,
                    onPress: () => {
                        firstCallback()
                    },
                },
            ],
            { cancelable: false },
        )
    }, 1000)
}

export function showAlertWithTwoCallback(
    message,
    title = Title,
    firstButtonTitle,
    secondButtonTitle,
    firstCallback,
    secondCallback,
) {
    setTimeout(() => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: firstButtonTitle,
                    onPress: () => {
                        firstCallback()
                    },
                },
                {
                    text: secondButtonTitle,
                    onPress: () => {
                        secondCallback()
                    },
                },
            ],
            { cancelable: false },
        )
    }, 1000)
}
