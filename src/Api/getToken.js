import { instance } from "./instance"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refresh_token')
    const data = {
        refresh_token: refreshToken
    }
    try {
        const response = await instance.post('/customer/refresh_token', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
    // .then(async (res) => {
    //     if (res.data.err == 0) {
    //         // await AsyncStorage.setItem('access_token', res.data.access_token)
    //     } else if (res.data.err == 2) {
    //         // setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
    //         // setShowModal(true)

    //     }
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
}