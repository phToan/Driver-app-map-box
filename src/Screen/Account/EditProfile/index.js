import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AppContext from '../../../Context';
import { GirlIcon, ManIcon } from '../../../assets/images';
import { instance } from '../../../Api/instance';
import { Header } from '../../../Components/Header';
import NotificationModal from '../../../Components/notificationModal';
import { InputField } from '../../../Components/TextInputField';
import { DobField } from '../../../Components/TextInputField/dobField';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';

const EditProfile = ({ route }) => {
    const { setUpdate } = useContext(AppContext);
    const navigation = useNavigation();
    const [nameUser, setNameUser] = useState(route?.params.data.name);
    const [dateOfBirth, setDateOfBirth] = useState(route.params.data.dob);
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const gender = route.params.data.gender;
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setDateOfBirth(currentDate.toLocaleDateString('en-GB'));
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
        // <DateTimePicker
        //     testID="dateTimePicker"
        //     value={date}
        //     mode="date"
        //     is24Hour={true}
        //     // display="default"
        //     onChange={onChange}
        // />;
    };
    const onClickReturn = () => {
        navigation.goBack();
    };
    const onClickCalendar = () => {
        showMode('date');
    };
    const onClickUpdate = () => {
        if (nameUser !== '' && nameUser !== route.params.data.name) {
            data['name'] = nameUser;
        }
        if (dateOfBirth !== '' && dateOfBirth !== route.params.data.dob) {
            data['dob'] = dateOfBirth;
        }
        if (Object.keys(data).length > 1) {
            const res = updateData(data);
        } else {
            setErrorMessage(
                'Vui lòng thay đổi thông tin cá nhân trước khi cập nhật'
            );
            setShowModal(true);
        }
    };
    let imageSource;
    if (gender) {
        imageSource = ManIcon;
    } else {
        imageSource = GirlIcon;
    }
    const data = {
        id: route.params.data.id,
    };
    const updateData = async (data) => {
        await instance
            .put('/driver', data)
            .then((res) => {
                if (res.data.err == 0) {
                    setIsSuccess(true);
                    setErrorMessage('Cập nhật thông tin thành công');
                    setShowModal(true);
                } else {
                    setErrorMessage('Cập nhật thông tin thất bại');
                    setShowModal(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onHideModal = () => {
        if (isSuccess) {
            setUpdate(true);
            setIsSuccess(false);
            setTimeout(() => {
                setShowModal(false);
                navigation.goBack();
            }, 2000);
        } else {
            setShowModal(false);
        }
    };
    const changeName = (text) => {
        setNameUser(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NotificationModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <Header onClickReturn={onClickReturn} title={'Chỉnh sửa hồ sơ'} />

            <View style={styles.body}>
                <View style={styles._image}>
                    <Image source={imageSource} style={styles.avatar} />
                </View>
                <InputField
                    value={nameUser}
                    onChangeText={changeName}
                    disable={true}
                    label={'Họ Tên'}
                    validate={true}
                    isLabel={true}
                />
                <DobField dob={dateOfBirth} onClickCalendar={onClickCalendar} />
                <InputField
                    value={route.params.data.phone}
                    onChangeText={null}
                    disable={true}
                    label={'Số điện thoại'}
                    validate={true}
                    isLabel={true}
                />
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                validate={true}
                onPress={onClickUpdate}
                title="Cập nhật"
            />
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    _image: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    body: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        flex: 8,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
});
