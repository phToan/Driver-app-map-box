import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameScreen } from '../../Constants/nameScreen';
import { FieldInfo, FieldLabel } from './components/fieldInfo';
import { Header } from '../../Components/Header';
import { styles } from './styles';

const UserAccount = () => {
    const navigation = useNavigation();
    const [nameUser, setNameUser] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [id, setID] = useState('');

    const onClickReturn = () => {
        navigation.navigate(NameScreen.BOTTOM_TAB);
    };
    const onClickChangePass = () => {
        navigation.navigate(NameScreen.EDIT_PASSWORD_SCREEN, { id: id });
    };
    const onClickChangeInforUser = () => {
        navigation.navigate(NameScreen.EDIT_PROFILE_SCREEN, { data });
    };
    const getData = async () => {
        setNameUser(await AsyncStorage.getItem('name'));
        setDateOfBirth(await AsyncStorage.getItem('dob'));
        setPhone(await AsyncStorage.getItem('phone'));
        setGender(await AsyncStorage.getItem('gender'));
        setID(await AsyncStorage.getItem('id'));
    };

    useEffect(() => {
        getData();
    }, []);

    const data = {
        name: nameUser,
        dob: dateOfBirth,
        phone: phone,
        gender: gender,
        id: id,
    };

    return (
        <SafeAreaView>
            <Header onClickReturn={onClickReturn} title="Tài khoản của tôi" />
            <View style={styles.body}>
                <FieldLabel
                    labelStyle={styles.textItem}
                    onPress={onClickChangeInforUser}
                    label={'Thông tin cá nhân'}
                    id={1}
                />
                <FieldInfo info={nameUser} label={'Họ và tên'} />
                <FieldInfo info={dateOfBirth} label={'Ngày sinh'} />
                <FieldInfo info={phone} label={'Số điện thoại'} />
                <FieldLabel
                    labelStyle={styles.textItem}
                    onPress={onClickChangePass}
                    label={'Password'}
                    id={2}
                />
            </View>
        </SafeAreaView>
    );
};

export default UserAccount;
