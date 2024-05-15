import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    ToastAndroid,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../Components/Header';
import { PasswordField } from '../../Components/TextInputField/passwordField';
import {
    validateConfirmPassword,
    validatePassword,
} from '../../Helper/validate';
import { ButtonConfirm } from '../../Components/ButtonConfirm';
import { instance } from '../../Api/instance';
import { passwordStyles as styles } from './styles';
import { NameScreen } from '../../Constants/nameScreen';
import ToastManager, { Toast } from 'toastify-react-native';
import LoadingModal from '../../Components/LoadingModal';

export const RegisterPassword = ({ route, navigation }) => {
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [value, setValue] = useState({});
    const [visible, setVisible] = useState(false);

    const onClickEye = () => {
        setHidePass(!hidePass);
    };
    const onClickExit = () => {
        navigation.goBack();
    };
    const onClickEyeRePass = () => {
        setHideRePass(!hideRePass);
    };
    const isValidRegisterUser =
        password.length > 0 &&
        rePassword.length > 0 &&
        validatePassword(password) === null &&
        validateConfirmPassword(password, rePassword) === null;

    useEffect(() => {
        if (route?.params?.data) {
            setValue(route?.params.data);
        }
    }, [route?.params?.data]);

    const onClickRegister = async () => {
        setVisible(true);
        value['password'] = password;
        await instance
            .post('/driver/register', value)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem(
                        'refresh_token',
                        res.data.refresh_token
                    );
                    await AsyncStorage.setItem(
                        'access_token',
                        res.data.access_token
                    );
                    setVisible(false);
                    navigation.navigate(NameScreen.BOTTOM_TAB);
                } else if (res.data.err == 1) {
                    setVisible(false);
                    Toast.warn('Tài khoản đã tồn tại !', 'bottom');
                } else {
                    setVisible(false);
                    Toast.warn('Đăng ký không thành công!', 'bottom');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.component}>
            <LoadingModal visible={visible} />
            <ToastManager
                animationOut={'slideOutRight'}
                animationIn={'slideInLeft'}
                width={'70%'}
                height={60}
                duration={2500}
                textStyle={{
                    fontSize: 14,
                    fontWeight: '500',
                }}
            />
            <Header onClickReturn={onClickExit} title="Đăng ký" />
            <View style={styles.body}>
                <PasswordField
                    password={password}
                    onChangeText={(text) => setPassword(text)}
                    label="Nhập mật khẩu"
                    hide={hidePass}
                    onClickEye={onClickEye}
                    validate={validatePassword(password) === null}
                />
                {validatePassword(password) !== null && (
                    <Text style={styles.error}>
                        Vui lòng nhập ít nhất 8 ký tự
                    </Text>
                )}
                <PasswordField
                    password={rePassword}
                    onChangeText={(text) => setRePassword(text)}
                    label="Nhập lại mật khẩu"
                    hide={hideRePass}
                    onClickEye={onClickEyeRePass}
                    validate={
                        validateConfirmPassword(password, rePassword) === null
                    }
                />
                {validateConfirmPassword(password, rePassword) !== null && (
                    <Text style={styles.error}>Mật khẩu chưa trùng khớp</Text>
                )}
            </View>
            <Text style={styles.t_condition}>
                Bằng cách nhấp vào Đăng ký, bạn đã đồng ý với{' '}
                <Text style={{ color: 'orange' }}>Điều khoản và Điều kiện</Text>{' '}
                của chúng tôi
            </Text>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickRegister}
                title={'Đăng ký'}
                validate={isValidRegisterUser}
            />
        </SafeAreaView>
    );
};
