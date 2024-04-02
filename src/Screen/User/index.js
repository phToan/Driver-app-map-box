import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBottomTab from '../../Components/HeaderBottomTab';
import { GirlIcon, ManIcon } from '../../assets/images';
import { TextFont } from '../../Components/Text';
import { OptionItem } from './components/optionItem';
import { NameScreen } from '../../Constants/nameScreen';

const Others = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setID] = useState('');
    const [gender, setGender] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setName(await AsyncStorage.getItem('name'));
            setPhone(await AsyncStorage.getItem('phone'));
            setID(await AsyncStorage.getItem('id'));
        };
        getData();
    });
    if (gender) {
        imageSource = ManIcon;
    } else {
        imageSource = GirlIcon;
    }
    const onClickUserAccount = () => {
        navigation.navigate(NameScreen.ACCOUNT_SCREEN);
    };
    const onClickLogOut = () => {
        navigation.popToTop();
    };
    return (
        <View style={styles.container}>
            <HeaderBottomTab />
            <TouchableOpacity
                style={styles.header}
                onPress={onClickUserAccount}
            >
                <View style={styles._header_item}>
                    <Image source={imageSource} style={styles.avatar} />
                </View>
                <View style={styles.labelInfo}>
                    <TextFont fs={16} fw={'bold'} title={name} />
                    <TextFont mt={5} title={phone} fs={14} />
                </View>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <OptionItem
                    content={'Tự động nhận đơn'}
                    onPress={() => {}}
                    secondText={'Tắt'}
                    id={1}
                />
                <OptionItem
                    content={'Cập nhật giấy tờ'}
                    onPress={() => {}}
                    id={2}
                />
                <OptionItem content={'Trợ giúp'} onPress={() => {}} id={3} />
                <OptionItem content={'Cài đặt'} onPress={() => {}} id={4} />

                <View style={styles.logout}>
                    <OptionItem
                        content={'Đăng xuất'}
                        onPress={onClickLogOut}
                        id={5}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Others;

const styles = StyleSheet.create({
    container: { flex: 1 },
    labelInfo: {
        marginHorizontal: 10,
    },
    avatar: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        borderRadius: 70 / 2,
    },
    _header_item: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
        marginHorizontal: 5,
    },
    header: {
        backgroundColor: '#fff1d6',
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logout: {
        marginTop: 20,
    },
});