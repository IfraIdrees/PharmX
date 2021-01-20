import AsyncStorage from '@react-native-async-storage/async-storage'
import SInfo from 'react-native-sensitive-info'

const setUserData = async (userData) => {
  try {
    global.isLogin = true
    global.userData = userData
    await AsyncStorage.setItem('@userData', JSON.stringify(userData))
    //await SInfo.setItem('@userData', JSON.stringify(userData), {})
  } catch (e) {
    global.isLogin = false
    global.userData = null
    console.log(e)
  }
}

const getUserData = async () => {
  try {
    global.isLogin = false
    global.userData = null
    const value = await AsyncStorage.getItem('@userData')
    //    const value = await SInfo.getItem('@userData', {})
    if (value !== null && value !== undefined) {
      global.isLogin = true
      global.userData = JSON.parse(value)
    }
  } catch (e) {
    global.isLogin = false
    global.userData = null
    console.log(e)
  }
}

const logoutUser = async () => {
  try {
    global.isLogin = false
    global.userData = null
    await AsyncStorage.removeItem('@userData')
    await AsyncStorage.removeItem('@subreceipt')
    await AsyncStorage.removeItem('@passcount')

    //await SInfo.deleteItem('@userData', {})
  } catch (e) {
    console.log(e)
  }
}

const Storage = {
  setUserData,
  getUserData,
  logoutUser
}

export default Storage
