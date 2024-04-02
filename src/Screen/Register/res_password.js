import { Text, SafeAreaView, View, StyleSheet, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../../Components/Header";
import { PasswordField } from "../../Components/TextInputField/passwordField";
import { validateConfirmPassword, validatePassword } from "../../Helper/validate";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { instance } from "../../Api/instance";
import { passwordStyles as styles } from "./styles";

export const RegisterPassword = ({ route, navigation }) => {
    const [hidePass, setHidePass] = useState(true)
    const [hideRePass, setHideRePass] = useState(true)
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [value, setValue] = useState({})

    const onClickEye = () => {
        setHidePass(!hidePass)
    }
    const onClickExit = () => {
        navigation.goBack()
    }
    const onClickEyeRePass = () => {
        setHideRePass(!hideRePass)
    }
    const isValidRegisterUser = password.length > 0 && rePassword.length > 0
        && validatePassword(password) === null
        && validateConfirmPassword(password, rePassword) === null

    useEffect(() => {
        if (route?.params?.data) {
            setValue(route?.params.data)
        }
    }, [route?.params?.data])

    const onClickRegister = async () => {
        value['password'] = password
        await instance.post('/driver/register', value)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem('refresh_token', res.data.refresh_token)
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    navigation.navigate('tabbar')
                } else if (res.data.err == 1) {
                    ToastAndroid.show('Tài khoản đã tồn tại !', ToastAndroid.LONG)
                    navigation.popToTop()
                } else {
                    ToastAndroid.show('Đăng ký không thành công !', ToastAndroid.LONG)
                    navigation.popToTop()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <SafeAreaView style={styles.component}>
            <Header
                onClickReturn={onClickExit}
                title='Đăng ký'
            />
            <View style={styles.body}>
                <PasswordField
                    password={password}
                    onChangeText={(text) => setPassword(text)}
                    label='Nhập mật khẩu'
                    hide={hidePass}
                    onClickEye={onClickEye}
                    validate={validatePassword(password) === null}
                />
                {validatePassword(password) !== null &&
                    <Text style={styles.error}>Vui lòng nhập ít nhất 8 ký tự</Text>
                }
                <PasswordField
                    password={rePassword}
                    onChangeText={(text) => setRePassword(text)}
                    label='Nhập lại mật khẩu'
                    hide={hideRePass}
                    onClickEye={onClickEyeRePass}
                    validate={validateConfirmPassword(password, rePassword) === null}
                />
                {validateConfirmPassword(password, rePassword) !== null &&
                    <Text style={styles.error}>Mật khẩu chưa trùng khớp</Text>
                }
            </View>
            <Text style={styles.t_condition}>Bằng cách nhấp vào Đăng ký, bạn đã đồng ý với <Text style={{ color: 'orange' }}>Điều khoản và Điều kiện</Text> của chúng tôi</Text>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickRegister}
                title={'Đăng ký'}
                validate={isValidRegisterUser}
            />
        </SafeAreaView>
    )
}

