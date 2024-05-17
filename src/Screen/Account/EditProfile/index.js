import React, { useContext, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import DateTimePicker, {
//     DateTimePickerAndroid,
// } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import AppContext from '../../../Context';
import { GirlIcon, ManIcon } from '../../../assets/images';
import { instance } from '../../../Api/instance';
import { Header } from '../../../Components/Header';
import NotificationModal from '../../../Components/notificationModal';
import { InputField } from '../../../Components/TextInputField';
import { DobField } from '../../../Components/TextInputField/dobField';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import * as ImagePicker from 'expo-image-picker';
import { update, getDatabase, ref } from 'firebase/database';
import axios from 'axios';
import { renderDate, renderTime } from '../../../Helper/rederTime';
import LoadingModal from '../../../Components/LoadingModal';

const EditProfile = ({ route }) => {
    const { key, avatar, setAvatar } = useContext(AppContext);
    console.log('key: ', key);
    const navigation = useNavigation();
    const [nameUser, setNameUser] = useState(route?.params.data.name);
    const [dateOfBirth, setDateOfBirth] = useState(route.params.data.dob);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const database = getDatabase();
    const gender = route.params.data.gender;
    const [loading, setLoading] = useState(false);
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setDate(currentDate);
    //     setShow(setShow);
    //     setDateOfBirth(currentDate.toLocaleDateString('en-GB'));
    // };
    //     const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };
    // const showMode = (currentMode) => {
    //     DateTimePickerAndroid.open({
    //         value: date,
    //         onChange,
    //         mode: currentMode,
    //         is24Hour: true,
    //     });
    // };

    const onClickReturn = () => {
        navigation.goBack();
    };
    const onClickCalendar = () => {
        // Platform.OS === 'ios' ? setShow(true) : showMode('date');
        setShow(true);
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
        setLoading(true);
        await instance
            .put('/driver', data)
            .then((res) => {
                if (res.data.err == 0) {
                    setLoading(false);
                    setIsSuccess(true);
                    setErrorMessage('Cập nhật thông tin thành công');
                    setShowModal(true);
                } else {
                    setLoading(false);
                    setErrorMessage('Cập nhật thông tin thất bại');
                    setShowModal(true);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const onHideModal = () => {
        if (isSuccess) {
            setIsSuccess(false);
            setShowModal(false);
            navigation.goBack();
        } else {
            setShowModal(false);
        }
    };
    const changeName = (text) => {
        setNameUser(text);
    };
    const handleChangeImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setAvatar(result.assets[0].uri);
                uploadImageToCloudinary(result.assets[0].uri);
            }
        } catch (error) {
            console.log('err: ', error);
        }
    };

    const uploadImageToCloudinary = async (uri) => {
        const data = new FormData();
        data.append('file', {
            uri,
            type: 'image/jpg',
            name: 'driverAvatar1',
        });
        data.append('upload_preset', '_uploadAvatar');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/daemetv0m/image/upload',
                data
            );

            if (response.status === 200) {
                const dataRef = ref(database, `avatar/driver/${key}`);
                const updateData = {
                    avatar: response?.data?.secure_url,
                };
                update(dataRef, updateData)
                    .then(() => {
                        console.log('upload success');
                    })
                    .catch((e) => {
                        console.log('err: ', e);
                    });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleConfirm = (selectedDate) => {
        setShow(false);
        setDateOfBirth(renderDate(selectedDate));
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal visible={loading} />
            <NotificationModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <Header onClickReturn={onClickReturn} title={'Chỉnh sửa hồ sơ'} />

            <View style={styles.body}>
                <TouchableOpacity
                    style={styles._image}
                    onPress={handleChangeImage}
                >
                    <Image
                        source={avatar ? { uri: avatar } : imageSource}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
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
            <DatePicker
                modal
                open={show}
                date={new Date()}
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setShow(false)}
                mode="date"
                // theme="dark"
            />
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
