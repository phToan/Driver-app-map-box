import {
    View,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';

// Khi bạn muốn hiển thị một thông báo

import React, { useState } from 'react';
import { Entypo, FontAwesome } from '../../assets/icon';
import NotificationModal from '../../Components/notificationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameScreen } from '../../Constants/nameScreen';
import { Background, GoogleIcon } from '../../assets/images';
import { validatePassword, validatePhone } from '../../Helper/validate';
import { ButtonConfirm } from '../../Components/ButtonConfirm';
import { getData } from '../../Api/api_query';
import { instance } from '../../Api/instance';
import { styles } from './styles';
import LoadingModal from '../../Components/LoadingModal';

const Login = ({ navigation }) => {
    const [hidePass, setHidePass] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('0335539676');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);

    const onHideModal = () => {
        setShowModal(false);
    };
    const data = {
        phone: phoneNumber,
        password: password,
    };

    const onClickLogin = async () => {
        setLoading(true);
        await instance
            .post('/driver/login', data)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem(
                        'access_token',
                        res.data.access_token
                    );
                    await AsyncStorage.setItem(
                        'refresh_token',
                        res.data.refresh_token
                    );
                    setLoading(false);
                    // console.log('djdkd');
                    navigation.navigate(NameScreen.BOTTOM_TAB);
                    // setPassword('')
                    setHidePass(true);
                    getData();
                } else {
                    setLoading(false);
                    setErrorMessage(
                        'Đăng nhập thất bại. Số điện thoại hoặc mật khẩu không chính xác'
                    );
                    setShowModal(true);
                    setPassword('');
                    setHidePass(true);
                }
            })
            .catch((err) => {
                console.log(err + '222');
                setLoading(false);
                Toast.warn('Đăng nhập không thành công', 'bottom');
            });
    };
    const onClickEye = () => {
        console.log('display password');
        setHidePass(!hidePass);
    };

    const onClickRegister = () => {
        navigation.navigate(NameScreen.REGISTER_SCREEN);
    };

    const isValidLogin =
        phoneNumber.length > 0 &&
        password.length > 0 &&
        validatePassword(password) === null &&
        validatePhone(phoneNumber) === null;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
            <LoadingModal visible={loading} />
            <NotificationModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <ScrollView>
                <View style={styles.header}>
                    <Image
                        source={Background}
                        style={{
                            resizeMode: 'stretch',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.text_title}>ĐĂNG NHẬP</Text>
                    <View
                        style={[
                            styles._input,
                            {
                                borderColor:
                                    validatePhone(phoneNumber) === null
                                        ? 'black'
                                        : 'red',
                            },
                        ]}
                    >
                        <View style={styles.e_icon}>
                            <FontAwesome
                                name="user"
                                color="lightslategray"
                                size={30}
                            />
                        </View>
                        <TextInput
                            keyboardType="numeric"
                            style={styles.TextInput}
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor={'black'}
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                            }}
                        />
                    </View>
                    {validatePhone(phoneNumber) !== null && (
                        <Text style={styles.textMessage}>
                            Số điện thoại chưa hợp lệ
                        </Text>
                    )}
                    <View
                        style={[
                            styles._input,
                            {
                                borderColor:
                                    validatePassword(password) === null
                                        ? 'black'
                                        : 'red',
                            },
                        ]}
                    >
                        <View style={styles.e_icon}>
                            <FontAwesome
                                name="lock"
                                color="lightslategray"
                                size={30}
                            />
                        </View>
                        <TextInput
                            style={styles.TextInput}
                            secureTextEntry={hidePass ? true : false}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor={'black'}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                        />
                        <View style={styles.e_icon}>
                            <TouchableOpacity onPress={onClickEye}>
                                <FontAwesome
                                    name={hidePass ? 'eye-slash' : 'eye'}
                                    color="lightslategray"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {validatePassword(password) !== null && (
                        <Text style={styles.textMessage}>
                            Mật khẩu phải có tối thiểu 8 ký tự
                        </Text>
                    )}
                    <TouchableOpacity>
                        <Text style={styles.t_forget_pass}>
                            Quên mật khẩu ?
                        </Text>
                    </TouchableOpacity>
                    <ButtonConfirm
                        footerStyle={null}
                        title={'Đăng nhập'}
                        onPress={onClickLogin}
                        validate={isValidLogin}
                    />
                </View>
                <Text style={styles.or}>Hoặc</Text>
                <View style={styles.b_other_login}>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <Entypo
                            name="facebook-with-circle"
                            size={47}
                            color={'blue'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={GoogleIcon} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.t_question}>
                    Bạn đã có tài khoản chưa ?
                </Text>
                <TouchableOpacity
                    style={styles.register}
                    onPress={onClickRegister}
                >
                    <Text style={styles.t_register}>Đăng ký</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
