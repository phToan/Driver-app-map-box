import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Header } from '../../../Components/Header';
import { PasswordField } from '../../../Components/TextInputField/passwordField';
import {
    validateConfirmPassword,
    validatePassword,
} from '../../../Helper/validate';
import { TextFont } from '../../../Components/Text';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import NotificationModal from '../../../Components/notificationModal';

const EditPassword = ({ route }) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordOld, setPasswordOld] = useState('');
    const [hideOldPass, setHideOldPass] = useState(true);
    const [hideNewPass, setHideNewPass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const onClickReturn = () => {
        navigation.goBack();
    };
    const onClickUpdate = () => {
        const data = {
            id: route.params.id,
            password: passwordOld,
            newPassword: password,
        };
        if (passwordOld === password) {
            setErrorMessage('Vui lòng tạo 1 mật khẩu mới trước khi cập nhật');
            setShowModal(true);
        } else {
            updateData(data);
        }
        setHideNewPass(true);
        setHideOldPass(true);
        setHideRePass(true);
    };
    const updateData = async (data) => {
        let result = 0;
        await axios
            .put(
                'https://delivery-server-s54c.onrender.com/driver/password',
                data
            )
            .then((res) => {
                if (res.data.err == 0) {
                    setErrorMessage('Cập nhật mật khẩu thành công');
                    setShowModal(true);
                    setIsSuccess(true);
                } else if (res.data.err == 2) {
                    setErrorMessage(
                        'Mật khẩu cũ chưa chính xác. Vui lòng nhập lại!'
                    );
                    setShowModal(true);
                } else {
                    setErrorMessage('Cập nhạt mật khẩu thất bại!');
                    setShowModal(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return result;
    };

    const onHideModal = () => {
        if (isSuccess) {
            setShowModal(false);
            navigation.goBack();
            setIsSuccess(false);
        } else {
            setShowModal(false);
        }
    };

    const handleOldPassword = (text) => {
        setPasswordOld(text);
    };
    const handlePassword = (text) => {
        setPassword(text);
    };
    const handleRePassword = (text) => {
        setRePassword(text);
    };

    const ValidUpdate =
        validatePassword(passwordOld) === null &&
        validatePassword(password) === null &&
        validateConfirmPassword(password, rePassword) === null &&
        rePassword.length > 0 &&
        password.length > 0 &&
        passwordOld.length > 0;

    return (
        <SafeAreaView style={styles.component}>
            <NotificationModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <Header onClickReturn={onClickReturn} title={'Đổi mật khẩu'} />
            <View style={styles.body}>
                <PasswordField
                    password={passwordOld}
                    onChangeText={handleOldPassword}
                    label="Nhập mật khẩu"
                    hide={hideOldPass}
                    onClickEye={() => {
                        setHideOldPass(!hideOldPass);
                    }}
                    validate={validatePassword(passwordOld) === null}
                />
                {validatePassword(passwordOld) !== null && (
                    <TextFont
                        title={'Vui lòng nhập ít nhất 8 ký tự'}
                        mt={5}
                        color={'red'}
                        ml={20}
                    />
                )}
                <PasswordField
                    password={password}
                    onChangeText={handlePassword}
                    label="Nhập mật khẩu mới"
                    hide={hideNewPass}
                    onClickEye={() => {
                        setHideNewPass(!hideNewPass);
                    }}
                    validate={validatePassword(password) === null}
                />
                {validatePassword(password) !== null && (
                    <TextFont
                        title={'Vui lòng nhập ít nhất 8 ký tự'}
                        mt={5}
                        color={'red'}
                        ml={20}
                    />
                )}
                <PasswordField
                    password={rePassword}
                    onChangeText={handleRePassword}
                    label="Nhập lại mật khẩu mới"
                    hide={hideRePass}
                    onClickEye={() => {
                        setHideRePass(!hideRePass);
                    }}
                    validate={
                        validateConfirmPassword(password, rePassword) === null
                    }
                />
                {validateConfirmPassword(password, rePassword) !== null && (
                    <TextFont
                        title={'Mật khẩu chưa trùng khớp'}
                        mt={5}
                        color={'red'}
                        ml={20}
                    />
                )}
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                validate={ValidUpdate}
                onPress={onClickUpdate}
                title="Cập nhật"
            />
        </SafeAreaView>
    );
};

export default EditPassword;

const styles = StyleSheet.create({
    component: {
        backgroundColor: 'white',
        flex: 1,
    },
    body: {
        flex: 8,
        padding: 15,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
});
