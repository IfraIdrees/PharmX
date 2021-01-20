import { notifications } from "react-native-firebase-push-notifications"

const EndPoints = {
  login: 'user/auth/login',
  register: 'user/auth/register-user',
  paperList: 'paper/list',
  questionList: 'question/list/',
  forgotPassword: 'user/auth/forgot-password',
  getprofile: 'user/get-profile',
  updateprofile: 'user/update-profile',
  contactus: 'user/contact-us/add/contact-us',
  notificationToken: 'user/change-device-token-and-type',
  notificationdata: 'notification/get-notifications?page=1'
}

export default EndPoints
